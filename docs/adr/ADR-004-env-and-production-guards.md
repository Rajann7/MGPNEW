# ADR-004: Centralized env validation and hard production guards

Status: Accepted · Date: 2026-07-12 · Phase: P03

## Context
`process.env` was read ad hoc across 14 files; dev-mock OTP guards were duplicated inline in three places in `src/lib/auth/actions.ts`; nothing prevented future seed/debug/mock code from shipping.

## Decision
- `src/config/env.ts`: single Zod-validated env accessor (server + client schemas). Required core fails fast; providers are optional and surface as **Setup Required** — never mocked as working.
- `src/config/guards.ts`: `assertNotProduction` (seed/reset), `assertMockOtpAllowed`, `assertMockProviderAllowed`, `assertDebugRoutesAllowed` — every dev-only capability must pass through one of these.
- `src/server/index.ts` composition root selects provider adapters; a missing provider resolves to an honest `not-configured` adapter that reports `setup_required` and throws on use.
- Existing inline OTP guards in `src/lib/auth/actions.ts` are **retained unchanged** in P03 (they already fail safely with `OTP_PROVIDER_SETUP_REQUIRED`); the flow migrates onto the guarded OTP port in P05.

## Consequences
- New code MUST consume env via `getServerEnv()`/`getClientEnv()` and providers via the container.
- Unit tests pin the guard behavior; a future seed script without `assertNotProduction` fails review against this ADR.
- There are currently no seed/reset commands or debug routes in the repo (verified in P02 audit); the guards exist so any future ones are blocked by construction.
