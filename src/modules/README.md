# src/modules — domain module convention (Phase 3)

Domain logic migrates here incrementally (ADR-002). Target layout per module:

```
src/modules/<domain>/
  actions.ts      # "use server" entry points (thin; validate + delegate)
  service.ts      # domain logic; depends on ports from src/server, never on process.env
  repository.ts   # data access via Supabase clients
  validators.ts   # zod schemas
  types.ts
```

Rules:
- Server-only code imports "server-only".
- No module reads process.env directly — env comes validated from `src/config/env.ts` via the composition root (`src/server`).
- No module imports another module's repository; cross-domain calls go through the other module's service.
- Existing code under `src/lib/actions/*` keeps working and moves here phase by phase (owning phase does the move; no big-bang refactor).
