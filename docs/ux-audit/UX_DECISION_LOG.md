# UX Decision Log

Global decisions, carried forward consistently across all modules. Do not re-decide these per-screen.

| Decision | Rule | Source |
|---|---|---|
| Mobile bottom nav order | Home · Search · Post (raised center FAB) · Leads · Profile — locked, identical across owner/broker/builder | CLAUDE.md §3A |
| Admin/staff shell | Graphite palette, drawer nav on mobile, **no bottom nav** | CLAUDE.md §3A |
| Mobile inner screens | Always have a contextual header with a Back button | CLAUDE.md §3A |
| Honesty states | No-data → "—" + honest caption; missing provider → "Setup Required" card with stated fallback; never-fake copy visible in UI | CLAUDE.md §3A |
| Admin/staff mutating actions | Approve/Request Changes/Reject hierarchy; reason mandatory for reject/needs-changes; "This action will be logged." note; confirmation dialog for destructive/gateway actions | CLAUDE.md §3A |
| Dashboard home layout (owner/broker/builder) | Greeting header (Good {time}, {name}) + 2 quick-action buttons (View Leads / role-specific Post CTA) + Suspense-loaded gradient stat cards (role-relevant metrics, icon per card) + Recent Leads table (desktop table / mobile cards, honest empty + error states) + existing ActionCardGrid + AccountStatusCard below, unchanged | Decided & implemented this session (2026-07-14) — extends "design wins" principle: since no wireframe batch defines broker/builder dashboard-home separately from owner's, owner's already-built pattern is the canonical one all three follow |
| Auth/role guarding | Per-page `requireRole()`, no central middleware | Existing architecture — audit will verify every route individually rather than assuming one gate covers all |
