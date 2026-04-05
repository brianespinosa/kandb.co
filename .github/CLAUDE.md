# .github — Claude Code Guidance

## Composite Action

Config: `.github/actions/setup/action.yml`

Shared setup used by all CI jobs after checkout: Node (from `.nvmrc`), corepack enable, `yarn install --immutable`.

Note: `actions/checkout` must remain in each job directly — local composite actions can only be resolved after the repo is checked out.

## CI Workflow

Config: `.github/workflows/ci.yml`

Runs on push and pull request to `main`. Jobs:

- **biome**, **knip**, **typecheck**, and **test** run in parallel on all events.
- **build** runs after all four pass — runs `vercel build`, then deploys to production (on `main`) or preview (on PRs). Exposes `url` as a job output.
- **e2e** runs on `pull_request` only, after `build`. Runs Playwright tests against the Vercel preview URL. Uploads `playwright-report/` as a CI artifact.

Concurrency cancels in-progress runs on PRs when new commits are pushed. Runs on `main` are never cancelled.

## Dependabot Auto-merge

Config: `.github/workflows/dependabot-auto-merge.yml`

Triggers on `pull_request_target`. Squash-merges Dependabot PRs automatically.

## Dependabot

Config: `.github/dependabot.yml`

Monitors `github-actions` and `npm` dependencies daily, targeting `main`. Commit messages use `chore` prefix via the `commit-message` config.

## Settings

`settings.yml` extends `brianespinosa/settings:nextjs.yml` via the [probot/settings](https://github.com/apps/settings) GitHub App.
