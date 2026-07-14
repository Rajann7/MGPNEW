# Product & Route Architecture (Phase 0 Discovery)

Generated 2026-07-14 from a real repo scan (not assumed). See [CLAUDE.md](../../CLAUDE.md) §1–3A for the authoritative product/design rules this audit must respect.

## Stack
- Next.js **16.2.9**, App Router, TypeScript, Tailwind
- Supabase (Auth + Postgres + RLS)
- No `src/middleware.ts` — every protected route gates itself via `requireRole()` (confirmed in `src/lib/auth/session.ts` usage across dashboard pages). Central implication: audit must check **each** route individually for a guard rather than trusting one chokepoint.
- No test script in `package.json` (`lint`, `typecheck`, `format` exist; no `test`). §33/§41 "run relevant tests" → currently **N/A, no test infra** — flag, do not fake a PASS.

## Roles (per CLAUDE.md §1/§14, confirmed live via test accounts)
- **Guest** — public browsing, no auth
- **Owner** — `/dashboard/owner/**`
- **Broker/Agent** — `/dashboard/broker/**`
- **Builder/Developer** — `/dashboard/builder/**`
- **Staff/Internal roles** (Super Admin, Admin, Verification/Support/Content/SEO/Ads/Billing/Payment/City/User/Notification/System/Security/Reports/Audit Manager) — `/admin/**`, separate `/admin/login`, email/password only, no mobile OTP (confirmed).

## Route groups (see full inventory: [COMPLETE_SCREEN_REGISTRY.md](COMPLETE_SCREEN_REGISTRY.md))
1. **Public/marketing** — `/`, `/search`, `/property|project|requirement/[slug]`, `/owner|broker|builder/[id|slug]`, `/compare`, `/pricing`, `/support`, `/legal/*`
2. **Auth** — `/login` (guest, modal-driven mobile OTP — confirmed via live login this session), `/admin/login` (staff, email/password), `/auth/callback`, `/team/invite`
3. **Owner/Broker/Builder dashboards** — parallel structure under `/dashboard/{role}/**`, each with: home, properties or projects, requirements, leads, proposals (broker/builder), site-visits, saved, recently-viewed, analytics, billing, notifications, settings, verification, public-profile (broker/builder only)
4. **Shared authenticated** — `/dashboard` (redirect dispatcher), `/dashboard/messages`, `/dashboard/leads/[id]`, `/dashboard/billing/gst`, `/profile`
5. **Admin/staff** — `/admin/**`, graphite shell, no bottom nav (per CLAUDE.md §3A rule 4)

## Application shells (existing, confirmed via code this session)
- `DashboardShellV2` (`src/components/dashboard/DashboardShellV2.tsx`) — used by **all three** public-role dashboards (owner/broker/builder) and `/profile`. Provides: sidebar (desktop), mobile bottom nav (5-slot, locked order Home·Search·Post·Leads·Profile per CLAUDE.md §3A rule 4), breadcrumb, contextual title, user menu.
- Admin shell — separate, graphite palette, drawer-based mobile nav (`AdminMobileDrawer`, `AdminDrawerBehavior`), **no bottom nav** (confirmed rule).
- Public shell — header defined in CLAUDE.md §40 (mega-menu + `AuthModal`), footer on marketing pages only.

## Known-good, already-locked decisions (carry forward, do not re-litigate — see [UX_DECISION_LOG.md](UX_DECISION_LOG.md))
- Bottom-nav order: Home · Search · Post (raised FAB) · Leads · Profile — locked (CLAUDE.md §3A).
- Admin shell has no bottom nav.
- Every mobile inner screen needs a contextual header with Back.
- Honesty states (Setup Required, "—" for no-data, "This action will be logged.") are mandatory visible UI, not just backend rules.
- Owner/Broker/Builder dashboard home pages were just unified this session (greeting header + gradient stat cards + Recent Leads table, actions grid below) — see git history 2026-07-14.

## Confirmed structural gaps found in Phase 0 (feed into [UX_ISSUE_REGISTER.md](UX_ISSUE_REGISTER.md))
1. **Legal pages incomplete** — CLAUDE.md §24 requires 11 policy pages; only 3 exist (Terms, Privacy, Refund). Missing 8.
2. **No shared modal/drawer primitive** — only 5 real modal/drawer/sheet components exist for a 98-route app; most overlay UI is likely bespoke per screen. Needs confirmation per-module (Batch 3 target).
3. **No test infrastructure** — cannot honestly report a `test` PASS in any batch until this is addressed or explicitly marked N/A.
4. **No central middleware** — auth/role gating is fully decentralized; higher risk of a missed guard on any one of 98 routes. Batch 1 should include a systematic per-route guard check.
