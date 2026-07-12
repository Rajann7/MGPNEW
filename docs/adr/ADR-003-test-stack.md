# ADR-003: Test stack — Vitest + Playwright

Status: Accepted · Date: 2026-07-12 · Phase: P03

## Context
Repo had zero tests/CI (GAP-001/RSK-002). Canon (Files 40/42/45) requires unit, integration, E2E, RLS and responsive verification with evidence.

## Decision
- **Vitest** for unit (`tests/unit`) and integration (`tests/integration`) — native TS/ESM, fast, path-alias support.
- **Playwright** for E2E (`tests/e2e`) — multi-viewport projects (mobile 390 + desktop 1280 now; full width matrix in P14), `reuseExistingServer` so the always-running dev server (MGP-CONST-131) is reused.
- RLS suites (File 40) land in P03-schema/P05+ using authenticated clients; fixtures come from `tests/fixtures/actors.ts` (synthetic identities only: +91555… numbers, `@test.mgp.invalid` emails).

## Consequences
- `npm run check` = format:check + lint + typecheck + unit + integration (deterministic, CI-ready).
- Playwright browsers are installed on demand (`npx playwright install chromium`); not vendored into the repo.
