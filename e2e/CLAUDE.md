# e2e/CLAUDE.md

## Running Tests

Tests require a deployed Vercel URL — they do not run against `next dev`.
Set environment variables before running:

- `PLAYWRIGHT_BASE_URL` — the target URL (e.g., a Vercel preview deployment URL)
- `VERCEL_BYPASS_SECRET` — Vercel protection bypass token

## Selector Strategy

Prefer `getByRole` and other accessible locators. Never use `data-testid` or other test-only attributes.

## Test Files

- `home.spec.ts` — home page loads, title matches `/kandb/i`, SVG logo is visible; axe accessibility scan passes
