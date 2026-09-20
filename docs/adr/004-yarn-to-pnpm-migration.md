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
- `@napi-rs/wasm-runtime` is no longer present anywhere in the resolved dependency tree at all (knip's current `oxc` dependency chain does not pull it in), so the extension has no target.

### CI caching stays explicit

`docs/adr/002-github-actions-yarn-cache.md` documented why `actions/setup-node`'s built-in `cache` option is unsuitable (corepack-ordering problems, and `v6` restricting automatic caching to npm only). Both reasons apply equally to pnpm, so `.github/actions/setup/action.yml` keeps the same explicit-cache pattern, substituted for pnpm: `pnpm store path` in place of `yarn config get cacheFolder`, keyed on `pnpm-lock.yaml` instead of `yarn.lock`.

## Consequences

- `yarn.lock`, `.yarnrc.yml`, and `.yarn/` are removed; `pnpm-lock.yaml` is the new lockfile
- All `yarn` invocations in `package.json` scripts, `.github/workflows/ci.yml`, `.github/actions/setup/action.yml`, and `lefthook.yml` are now `pnpm`
- `.github/dependabot.yml`'s npm ecosystem entry gets a `cooldown.default-days: 7` so Dependabot never proposes a version newer than `minimumReleaseAge` allows, which would otherwise break `pnpm install --frozen-lockfile` in CI
- `pnpm install --frozen-lockfile` completes with zero warnings and zero peer errors
- If a future dependency reintroduces a genuine missing-peer or build-script need, add it back to `pnpm-workspace.yaml` rather than assuming the Yarn-era config still applies: pnpm's resolution model is different enough that entries do not always carry over unchanged (see above)
