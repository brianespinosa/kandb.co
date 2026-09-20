# ADR-004: Migrate from Yarn to pnpm

## Status

Accepted

## Context

The project used Yarn Berry (4.13.0, `nodeLinker: node-modules`) as its package manager. Across the author's other repos (`@sm-incubator`, `@bje`), pnpm is the standard, and both tools being in use for personal/open-source repos increased maintenance surface for no benefit. Consolidating on one package manager was tracked in issue #300.

pnpm's isolated linker is also stricter than Yarn's `node-modules` linker: it does not hoist transitive dependencies into the top-level `node_modules`, so code that imports a package it does not declare (a "phantom dependency") fails immediately instead of working by accident.

## Decision

Migrate to pnpm, pinned via `"packageManager": "pnpm@12.4.2"` in `package.json`. As of pnpm 11, `.npmrc` is authentication-only; all workspace settings live in `pnpm-workspace.yaml`:

- `savePrefix: ''`, `strictPeerDependencies: true`, `autoInstallPeers: false`, `engineStrict: true`, `strictDepBuilds: true`, `minimumReleaseAge: 7200`: the baseline required for every pnpm repo (see the `file-pnpm-workspace.md` rule)
- `overrides` replaces `resolutions`, using `parent>child` selectors instead of Yarn's `parent/child`
- `allowBuilds` replaces the need for a `logFilters`-style opt-in: pnpm blocks all dependency build/postinstall scripts by default under `strictDepBuilds` and requires each to be explicitly approved

### Yarn `packageExtensions` dropped entirely

The four `packageExtensions` entries carried by `.yarnrc.yml` (`@axe-core/playwright`, `@vercel/express`, `vercel`, `@napi-rs/wasm-runtime`) were all verified unnecessary under pnpm by removing each individually and reinstalling:

- `@axe-core/playwright`'s required `playwright-core` peer is already satisfied by the `playwright-core` pulled in transitively via `@playwright/test`.
- `@vercel/express` and `vercel`'s `typescript` peer is already satisfied by the `typescript` devDependency.
- `@napi-rs/wasm-runtime` is still present in the resolved tree via knip's `oxc` chain, but its `@emnapi/core` and `@emnapi/runtime` peers are already satisfied: `@oxc-resolver/binding-wasm32-wasi` declares both as real, non-peer dependencies, and pnpm resolves peers across the whole graph rather than per branch. A repo whose graph contains no such supplier does need an explicit exception for this package.

### The `vitest/vite` security override was dropped

PR #246 added a Yarn resolution `vitest/vite: ">=8.0.16 <9"` for Dependabot
alerts #58 and #59 (CVE-2026-53571, CVE-2026-53632, vulnerable range
`>=8.0.0 <=8.0.15`). Under Yarn's node-modules linker the workspace carried two
vite copies: the direct pin and a nested copy reached through vitest, which had
drifted into the vulnerable range. The resolution scoped the fix to the nested
copy only.

pnpm resolves a single shared vite instance at the direct pin, 7.3.6, which is
outside both vulnerable ranges. Three candidate pnpm expressions were tested
and all rejected:

- `vitest>vite` as an override fails the install outright with
  `ERR_PNPM_PEER_DEP_ISSUES`. vite is a peer of vitest, so the override adds a
  constraint against the single shared instance instead of forking a copy.
- An unqualified `vite` override force-resolves to the highest matching
  version, silently upgrading to 8.3.0 and defeating the exact pin.
- `packageExtensions` is inert here. It only fills in fields a manifest does
  not already declare, and vitest already declares `peerDependencies.vite`.

The override is therefore dropped rather than translated. What stands in for it
is Dependabot's scanning of `pnpm-lock.yaml`: if a future bump reintroduces a
second vite instance in a vulnerable range, it raises an alert the same way it
raised #58 and #59. There is no override standing guard in the meantime.

### CI installs pnpm with `pnpm/action-setup`

`docs/adr/002-github-actions-yarn-cache.md` documented why
`actions/setup-node`'s built-in `cache` option was unsuitable for Yarn. That
reasoning does not carry over. `cache: pnpm` works on `actions/setup-node@v6`
provided pnpm is already on `PATH` when the cache key is resolved.

`.github/actions/setup/action.yml` therefore runs `pnpm/action-setup` first,
with no `version` input so the version comes from `packageManager` in
`package.json` and cannot drift from the pin, then `actions/setup-node` with
`cache: pnpm`. This drops the hand-maintained `actions/cache` step and the
dependency on Corepack, which Node stops bundling at version 25.

## Consequences

- `yarn.lock`, `.yarnrc.yml`, and `.yarn/` are removed; `pnpm-lock.yaml` is the new lockfile
- All `yarn` invocations in `package.json` scripts, `.github/workflows/ci.yml`, `.github/actions/setup/action.yml`, and `lefthook.yml` are now `pnpm`
- `.github/dependabot.yml`'s npm ecosystem entry gets a `cooldown.default-days: 7` so Dependabot never proposes a version newer than `minimumReleaseAge` allows, which would otherwise break `pnpm install --frozen-lockfile` in CI
- `pnpm install --frozen-lockfile` completes with zero warnings and zero peer errors
- If a future dependency reintroduces a genuine missing-peer or build-script need, add it back to `pnpm-workspace.yaml` rather than assuming the Yarn-era config still applies: pnpm's resolution model is different enough that entries do not always carry over unchanged (see above)
