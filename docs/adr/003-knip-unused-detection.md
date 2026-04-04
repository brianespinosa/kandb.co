# ADR-003: knip for Unused Dependency, File, and Export Detection

## Status

Accepted

## Context

The project had no automated tooling to detect unused dependencies, files, or exports. Unused deps accumulate silently over time — they inflate install size, add noise to audits, and carry hidden maintenance cost. Detecting them via manual review is unreliable.

Three broad approaches were considered:

1. **No tooling** — Rely on code review to catch unused deps. Unreliable; `@testing-library/user-event` was already present with no imports.
2. **depcheck** — Detects unused npm dependencies, but does not detect unused files or exports, and lacks framework-aware plugins for Next.js and Vitest.
3. **knip** — Detects unused dependencies, devDependencies, files, and exports. Ships with built-in plugins for Next.js, Vitest, Playwright, and Biome — the project's full toolchain — which eliminates false positives from framework conventions without requiring custom configuration.

## Decision

Use **knip** as the tool for detecting unused code and dependencies.

- Added as a devDependency (`knip@6.3.0`)
- Runs as a CI job parallel to `biome`, `typecheck`, and `test`
- Uses `--reporter github-actions` for inline PR annotations
- Not added to lefthook pre-commit: the per-commit latency cost is not justified when the primary value (PR annotations) is CI-specific

### Intentional exceptions (`knip.ignoreBinaries`)

Some packages are legitimately present but undetectable by static import analysis. These are tracked in `knip.config.ts`:

| Entry | Reason |
|---|---|
| `sort-package-json` | Invoked via `npx` in the lefthook `sort-package-json` pre-commit hook. Not installed as a project dependency — `npx` fetches it on demand. |

**When adding a new exception:** document the reason as an inline comment in `knip.config.ts` and keep this ADR's table updated.

## Consequences

- Unused dependencies, files, and exports are caught automatically on every PR
- First run surfaced and removed `@testing-library/user-event` and untracked `coverage/` files (also added `/coverage/` to `.gitignore`)
- The `ignoreBinaries` list must be maintained; stale entries should be removed when the underlying reason no longer applies
