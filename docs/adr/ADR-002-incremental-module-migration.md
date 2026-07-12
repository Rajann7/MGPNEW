# ADR-002: Incremental module migration (no big-bang refactor)

Status: Accepted · Date: 2026-07-12 · Phase: P03

## Context
Canonical folder layout adds `src/modules` and `src/server`. Existing domain logic lives in `src/lib/actions/*` and `src/lib/*`, is working, and is verified only manually (no test suite predates P03).

## Decision
Create `src/modules` (convention documented in its README) and `src/server` (ports + composition root) now, but migrate existing code module-by-module in each owning phase (P05 auth, P06 property, P07 project, P08 leads, P11 billing). Phase 3 does not mass-move files.

## Consequences
- Zero behavioral risk in P03; conforming architecture preserved (Phase 3 rule 1).
- Until its owning phase migrates it, `src/lib/actions/*` remains the live path and `src/server` ports are the only allowed pattern for NEW provider code.
- Duplicated patterns are temporary and tracked via this ADR.
