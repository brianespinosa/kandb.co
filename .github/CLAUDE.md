# .github — Claude Code Guidance

## Workflows

### `claude.yml`
Runs the Claude Code GitHub Action, enabling Claude to handle issues and PRs via `@claude` mentions.

### `claude-code-review.yml`
Runs automated Claude code review on pull requests.

### CI (TODO)
A `ci.yml` workflow should be added once the toolchain is more complete (Biome, Vitest, Playwright). Use `career` as the reference implementation for workflow structure.

## Dependabot

Config: `.github/dependabot.yml`

Monitors `github-actions` and `npm` dependencies daily, targeting `main`. Commit messages use `chore` prefix via the `commit-message` config.

## Settings

`settings.yml` extends `brianespinosa/settings:nextjs.yml` via the [probot/settings](https://github.com/apps/settings) GitHub App.
