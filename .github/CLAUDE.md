# .github — Claude Code Guidance

## Workflows

### `claude.yml`
Runs the Claude Code GitHub Action, enabling Claude to handle issues and PRs via `@claude` mentions.

### `claude-code-review.yml`
Runs automated Claude code review on pull requests.

### `ci.yml`
Runs Biome lint/format checks on every push and PR targeting `main`. Additional jobs (`knip`, `test`, `build`, `e2e`, `lighthouse`) will be added as their respective tooling is introduced. Use `career` as the reference implementation for workflow structure.

## Dependabot

Config: `.github/dependabot.yml`

Monitors `github-actions` and `npm` dependencies daily, targeting `main`. Commit messages use `chore` prefix via the `commit-message` config.

## Settings

`settings.yml` extends `brianespinosa/settings:nextjs.yml` via the [probot/settings](https://github.com/apps/settings) GitHub App.
