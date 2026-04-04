# ADR 001: Use Architecture Decision Records

## Status

Accepted

## Context

As this project evolves, architectural and tooling decisions need to be recorded
in a way that future contributors (and future AI assistants) can understand not
just what was decided, but why — and what alternatives were considered.

## Decision

We use Architecture Decision Records (ADRs) stored in `docs/adr/`. Each ADR is a
short Markdown file named `NNN-short-title.md` and covers:

- **Context**: the situation that required a decision
- **Decision**: what we decided to do
- **Consequences**: the trade-offs and follow-up actions

## Consequences

- Decision rationale is preserved alongside the code that implements it.
- ADRs are immutable once accepted; superseded decisions get a new ADR that
  references the old one.
- The `docs/adr/` directory is the authoritative index — no separate registry
  is maintained.
