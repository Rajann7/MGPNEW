# ADR-001: Retain Next.js 16 (deviation from "Next.js 15" in Phase 3 prompt)

Status: Accepted · Date: 2026-07-12 · Phase: P03

## Context
The Phase 3 prompt names Next.js 15 App Router + React 19. The repository already runs Next.js 16.2.9 (App Router, Turbopack) with React 19.2.4, builds cleanly, and all existing features target it.

## Decision
Keep Next.js 16. Downgrading to 15 would be a destructive, functionality-changing migration with no canonical benefit; 16 satisfies every App Router requirement the canon depends on.

## Consequences
- Version pinned in package-lock; upgrades only through an approved phase.
- RSK-008 (new-framework behavior) stays open; framework behaviors verified per phase rather than assumed.
