# Complete Screen & Experience Registry

Source of truth for the full UX/navigation audit. Generated from a real filesystem scan of `src/app` (Phase 0, 2026-07-14) — 98 route files (`page.tsx`/`route.ts`/`layout.tsx`) found. Non-route experiences (modals, drawers, wizard steps, tabs-as-screens) are added incrementally as each module is audited in later batches — they are NOT yet enumerated here.

Status values: `DISCOVERED` · `AUDITED` · `FIX_REQUIRED` · `IMPLEMENTING` · `IMPLEMENTED` · `VERIFICATION_FAILED` · `VERIFIED` · `BLOCKED_WITH_REASON` · `NOT_APPLICABLE`

Do not mark `VERIFIED` without an actual browser-driven verification pass recorded in [IMPLEMENTATION_PROGRESS.md](IMPLEMENTATION_PROGRESS.md).

## Legend
- **Role**: Guest / Owner / Broker / Builder / Staff(any internal role) / All-authenticated
- **Type**: public · auth-form · dashboard-home · list · detail · create · edit · settings · admin-list · admin-detail · legal · system

## A. Public / Marketing (guest-reachable, no auth)

| ID | Route | Type | Notes | Status |
|---|---|---|---|---|
| PUB-01 | `/` | public | Home hero + search | DISCOVERED |
| PUB-02 | `/search` | list | Public search results | DISCOVERED |
| PUB-03 | `/property/[slug]` | detail | Property detail | DISCOVERED |
| PUB-04 | `/project/[slug]` | detail | Project detail | DISCOVERED |
| PUB-05 | `/requirement/[slug]` | detail | Requirement detail | DISCOVERED |
| PUB-06 | `/owner/[id]` | detail | Public owner profile | DISCOVERED |
| PUB-07 | `/broker/[slug]` | detail | Public broker profile | DISCOVERED |
| PUB-08 | `/builder/[slug]` | detail | Public builder profile | DISCOVERED |
| PUB-09 | `/compare` | list | Property compare tray | DISCOVERED |
| PUB-10 | `/pricing` | public | Plans/pricing | DISCOVERED |
| PUB-11 | `/support` | public | Support/help | DISCOVERED |
| PUB-12 | `/legal/terms` | legal | Terms | DISCOVERED |
| PUB-13 | `/legal/privacy` | legal | Privacy | DISCOVERED |
| PUB-14 | `/legal/refund` | legal | Refund policy | DISCOVERED |
| PUB-15 | `/login` | auth-form | Mobile OTP login/register modal-route | DISCOVERED |
| PUB-16 | `/unauthorized` | system | Unauthorized fallback | DISCOVERED |
| PUB-17 | `/team/invite` | auth-form | Team/agent invite acceptance | DISCOVERED |
| PUB-18 | `/auth/callback` (route.ts) | system | Supabase auth callback | DISCOVERED |

**Gap check (CLAUDE.md §24 required legal pages):** only Terms/Privacy/Refund exist. Missing: Cookie Policy, Cancellation Policy, Listing Policy, Advertising Policy, Verification Policy, Payment Policy, Disclaimer, Grievance/Support Policy. → flag as issue in [UX_ISSUE_REGISTER.md](UX_ISSUE_REGISTER.md) (ISS-0001).

## B. Authenticated Shared

| ID | Route | Role | Type | Status |
|---|---|---|---|---|
| SHR-01 | `/dashboard` | All-authenticated | system (role redirect) | DISCOVERED |
| SHR-02 | `/dashboard/messages` | All-authenticated | list | DISCOVERED (nav-fix applied/build-verified only, not live-clicked-through) |
| SHR-03 | `/dashboard/leads/[id]` | All-authenticated | detail | VERIFIED (Batch 1B — ISS-0007 fixed: mobile Back header added; content/CRM-stage/contact-hidden state confirmed live as Owner) |
| SHR-04 | `/dashboard/billing/gst` | All-authenticated | settings | VERIFIED (Batch 1B — real form, ISS-0009 Back-header fix confirmed live) |
| SHR-05 | `/profile` | All-authenticated | settings | DISCOVERED (ISS-0009 nav-fix applied/build-verified only, not live-clicked-through) |

## C. Owner Dashboard (`/dashboard/owner/**`) — 16 routes

Batch 1B (2026-07-14) live-audited this role. Routes not marked VERIFIED below were not live-clicked-through this batch — continuation should start there (see [IMPLEMENTATION_PROGRESS.md](IMPLEMENTATION_PROGRESS.md)).

| ID | Route | Type | Status |
|---|---|---|---|
| OWN-01 | `/dashboard/owner` | dashboard-home | VERIFIED (login redirect, refresh, cross-role guard, greeting/stat-card layout all confirmed live) |
| OWN-02 | `/dashboard/owner/properties` | list | VERIFIED (status tabs, View→detail, ISS-0005 self-listing CTA fix confirmed live at 375px+1440px) |
| OWN-03 | `/dashboard/owner/properties/new` | create | VERIFIED (draft-resume Continue/Start New flow fully tested; see ISS-0006 methodology correction) |
| OWN-04 | `/dashboard/owner/properties/[id]/edit` | edit | DISCOVERED (not live-tested this batch) |
| OWN-05 | `/dashboard/owner/requirements` | list | VERIFIED (overflow menu → View proposals/Edit/Close, back nav confirmed live) |
| OWN-06 | `/dashboard/owner/requirements/new` | create | DISCOVERED (mobileBackHref fix applied + build-verified only; form fields not live-submitted) |
| OWN-07 | `/dashboard/owner/requirements/[id]/edit` | edit | DISCOVERED (mobileBackHref fix applied + build-verified only; not live-clicked-through) |
| OWN-08 | `/dashboard/owner/requirements/[id]/proposals` | list | VERIFIED (proposal card, Sent status, Mark Viewed/Shortlist actions, Back nav confirmed live) |
| OWN-09 | `/dashboard/owner/leads` | list | VERIFIED (stage tabs, card→detail navigation confirmed live) |
| OWN-10 | `/dashboard/owner/site-visits` | list | VERIFIED (Upcoming/Past tabs, Accept/Reject/Reschedule/Cancel actions visible, honest cancellation reason shown) |
| OWN-11 | `/dashboard/owner/saved` | list | VERIFIED (empty state honest copy, ISS-0009 Back-header fix confirmed live) |
| OWN-12 | `/dashboard/owner/recently-viewed` | list | VERIFIED (list content, Clear history control, ISS-0011 Back-header fix confirmed live) |
| OWN-13 | `/dashboard/owner/analytics` | dashboard | VERIFIED (real usage stats, honest "Views & impressions — Not tracked yet" state, no fake analytics) |
| OWN-14 | `/dashboard/owner/billing` | settings | VERIFIED (real plan/usage data, honest trial messaging, Billing/GST link confirmed live) |
| OWN-15 | `/dashboard/owner/notifications` | list | VERIFIED (Mark all read, ISS-0012 dead-click fix for site_visit/proposal types confirmed live) |
| OWN-16 | `/dashboard/owner/settings` | settings | VERIFIED (language selector real handler, honest Email/SMS/WhatsApp Setup-Required states, Back-header confirmed live) |
| OWN-17 | `/dashboard/owner/verification` | settings | VERIFIED (honest "Not Started" + Setup Required copy, Back-header confirmed live) |

## D. Broker Dashboard (`/dashboard/broker/**`) — 17 routes

| ID | Route | Type | Status |
|---|---|---|---|
| BRK-01 | `/dashboard/broker` | dashboard-home | AUDITED (home layout aligned to owner pattern this session) |
| BRK-02 | `/dashboard/broker/properties` | list | DISCOVERED |
| BRK-03 | `/dashboard/broker/properties/new` | create | DISCOVERED |
| BRK-04 | `/dashboard/broker/properties/[id]/edit` | edit | DISCOVERED |
| BRK-05 | `/dashboard/broker/requirements` | list | DISCOVERED |
| BRK-06 | `/dashboard/broker/requirements/new` | create | DISCOVERED |
| BRK-07 | `/dashboard/broker/requirements/[id]/edit` | edit | DISCOVERED |
| BRK-08 | `/dashboard/broker/leads` | list | DISCOVERED |
| BRK-09 | `/dashboard/broker/proposals` | list | DISCOVERED |
| BRK-10 | `/dashboard/broker/site-visits` | list | DISCOVERED |
| BRK-11 | `/dashboard/broker/saved` | list | DISCOVERED |
| BRK-12 | `/dashboard/broker/recently-viewed` | list | DISCOVERED |
| BRK-13 | `/dashboard/broker/analytics` | dashboard | DISCOVERED |
| BRK-14 | `/dashboard/broker/billing` | settings | DISCOVERED |
| BRK-15 | `/dashboard/broker/notifications` | list | DISCOVERED |
| BRK-16 | `/dashboard/broker/settings` | settings | DISCOVERED |
| BRK-17 | `/dashboard/broker/verification` | settings | DISCOVERED |
| BRK-18 | `/dashboard/broker/public-profile` | settings | DISCOVERED |

## E. Builder Dashboard (`/dashboard/builder/**`) — 19 routes

| ID | Route | Type | Status |
|---|---|---|---|
| BLD-01 | `/dashboard/builder` | dashboard-home | AUDITED (home layout aligned to owner pattern this session) |
| BLD-02 | `/dashboard/builder/projects` | list | DISCOVERED |
| BLD-03 | `/dashboard/builder/projects/new` | create | DISCOVERED |
| BLD-04 | `/dashboard/builder/projects/[id]/edit` | edit | DISCOVERED |
| BLD-05 | `/dashboard/builder/projects/[id]/units` | list | DISCOVERED |
| BLD-06 | `/dashboard/builder/projects/[id]/construction` | detail | DISCOVERED |
| BLD-07 | `/dashboard/builder/requirements` | list | DISCOVERED |
| BLD-08 | `/dashboard/builder/leads` | list | DISCOVERED |
| BLD-09 | `/dashboard/builder/agents` | list | DISCOVERED |
| BLD-10 | `/dashboard/builder/ads` | list | DISCOVERED |
| BLD-11 | `/dashboard/builder/ads/new` | create | DISCOVERED |
| BLD-12 | `/dashboard/builder/ads/[id]/edit` | edit | DISCOVERED |
| BLD-13 | `/dashboard/builder/site-visits` | list | DISCOVERED |
| BLD-14 | `/dashboard/builder/analytics` | dashboard | DISCOVERED |
| BLD-15 | `/dashboard/builder/billing` | settings | DISCOVERED |
| BLD-16 | `/dashboard/builder/notifications` | list | DISCOVERED |
| BLD-17 | `/dashboard/builder/settings` | settings | DISCOVERED |
| BLD-18 | `/dashboard/builder/verification` | settings | DISCOVERED |
| BLD-19 | `/dashboard/builder/public-profile` | settings | DISCOVERED |

## F. Admin / Staff (`/admin/**`) — 20 routes

| ID | Route | Type | Status |
|---|---|---|---|
| ADM-01 | `/admin` | dashboard-home | DISCOVERED |
| ADM-02 | `/admin/login` | auth-form | DISCOVERED |
| ADM-03 | `/admin/invite` | auth-form | DISCOVERED |
| ADM-04 | `/admin/moderation` | admin-list | DISCOVERED |
| ADM-05 | `/admin/moderation/properties` | admin-list | DISCOVERED |
| ADM-06 | `/admin/moderation/projects` | admin-list | DISCOVERED |
| ADM-07 | `/admin/moderation/requirements` | admin-list | DISCOVERED |
| ADM-08 | `/admin/moderation/banner-ads` | admin-list | DISCOVERED |
| ADM-09 | `/admin/users` | admin-list | DISCOVERED |
| ADM-10 | `/admin/users/[id]` | admin-detail | DISCOVERED |
| ADM-11 | `/admin/staff` | admin-list | DISCOVERED |
| ADM-12 | `/admin/staff/[id]` | admin-detail | DISCOVERED |
| ADM-13 | `/admin/staff/invites` | admin-list | DISCOVERED |
| ADM-14 | `/admin/leads` | admin-list | DISCOVERED |
| ADM-15 | `/admin/verification` | admin-list | DISCOVERED |
| ADM-16 | `/admin/billing` | admin-list | DISCOVERED |
| ADM-17 | `/admin/cms` | admin-list | DISCOVERED |
| ADM-18 | `/admin/providers` | admin-list | DISCOVERED |
| ADM-19 | `/admin/settings` | admin-list | DISCOVERED |
| ADM-20 | `/admin/support` | admin-list | DISCOVERED |
| ADM-21 | `/admin/audit` | admin-list | DISCOVERED |

## G. System / API

| ID | Route | Type | Status |
|---|---|---|---|
| SYS-01 | `/api/webhooks/razorpay` (route.ts) | system | DISCOVERED |

## Totals (Phase 0)

- **Route files discovered:** 98
- **Registered above:** 98 (18 public/shared+system, 17 owner, 18 broker, 19 builder, 21 admin, 5 shared-authenticated)
- **Non-route experiences (modals/drawers/wizard steps/tabs):** not yet enumerated — first pass found only 7 dedicated modal/drawer/sheet components (`AuthModal`, `ReportModal`, `AdminMobileDrawer`, `MobileFilterSheet`, `RequestLocationModal`, + 2 behavior wrappers), meaning most "modal-like" UI in this codebase is likely built ad hoc per screen rather than through a shared primitive — **this itself is a candidate P1/P2 structural finding**, to be confirmed per-module in later batches.
- **No `src/middleware.ts` exists** — route protection is enforced per-page via `requireRole()` (confirmed pattern in owner/broker/builder dashboard pages). Not a defect by itself, but means every one of the 98 routes must be individually checked for a guard, rather than trusting one central gate.
