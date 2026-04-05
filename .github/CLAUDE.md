# .github — Claude Code Guidance

## Workflows

### `claude.yml`
Runs the Claude Code GitHub Action, enabling Claude to handle issues and PRs via `@claude` mentions.

### `claude-code-review.yml`
Runs automated Claude code review on pull requests.

### `ci.yml`
Runs checks on every push and PR targeting `main`. Active jobs: `biome`, `knip`, `typecheck`, `test`, `build`, `e2e`. The `build` job deploys to Vercel and outputs the preview URL; `e2e` depends on `build` and runs only on PRs. A `lighthouse` job may be added in the future. Use `career` as the reference implementation for workflow structure.

## Dependabot

Config: `.github/dependabot.yml`

Monitors `github-actions` and `npm` dependencies daily, targeting `main`. Commit messages use `chore` prefix via the `commit-message` config.

## Settings

`settings.yml` extends `brianespinosa/settings:nextjs.yml` via the [probot/settings](https://github.com/apps/settings) GitHub App.
