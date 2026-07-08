# SCREEN_MANIFEST — full target-level

**Process:** MGP_FULL_DESIGN_MIGRATION_MASTER.md · **Design:** `C:\Users\RAJAN\Documents\MGP DESIGN` (decoded workspace: scratchpad/design-extract) · **Created/updated:** 2026-07-04
**Inventory method:** deterministic extraction of every design-doc screen label (`<h2>` section titles, `<h3>` screen titles, and `font:500 13px` frame-caption variant/state labels) from all 17 decoded batches. Raw discovered labels = **405**. Every label below is an explicit entry (no 17-area backbone substitute).

## Classification legend
RS=ROUTE_SCREEN · RV=RESPONSIVE_VARIANT · ST=UI_STATE · MD=MODAL_OR_DRAWER · WZ=WIZARD_STEP · SC=SHARED_COMPONENT · DSR=DESIGN_SYSTEM_REFERENCE · RO=REFERENCE_ONLY · INH=INHERITS_FROM_CANONICAL.
Status: IMPL=implemented (code exists) · IMPL✓=implemented+runtime-verified this session · GAP=design target not yet built · NS=not started · REF=reference only (no route) · UNVERIFIED-AUTH=code exists, authenticated runtime unverifiable (see BASELINE_STATUS).

> Non-greenfield note: batches 1–9 are largely implemented (public surfaces verified with runtime evidence 2026-07-04). Admin batches 11–15 and PWA 17 need per-screen audit/build. `Status` reflects real code inspected 2026-07-04.

---

## BATCH 1 — Design System (DESIGN_SYSTEM_REFERENCE / SHARED_COMPONENT) — 50 targets
All are token/component references or shared shells — **no dedicated routes** (master §3.2). Canonical consumers noted.

| ID | Label | Class | Canonical / consumer |
|----|-------|-------|----------------------|
| T01-01 | Foundations | DSR | globals.css tokens |
| T01-02..07 | Color/Type/Spacing/Radius/Shadow/Icon scales | DSR | globals.css, tailwind, lucide — **font NORMALIZED 2026-07-04: Geist→Inter (BUG-UI-002 FIXED); computed-font verified live on `/`+`/search`; auth-consumer re-render UNVERIFIED-AUTH. See verification/T01_VERIFY.md** |
| T01-08..20 | Buttons·Inputs·Status badges·Cards·Avatars·Dropdown·Tabs·Tooltip·Pagination·Progress linear·Progress stepped | SC/DSR | components/ui/*, Stepper |
| T01-21 | 3A Public header — desktop (mega-menu) | SC | PublicHeaderClient — **1024 overflow FIXED 2026-07-04 (nav `lg`→`xl`); re-verified 1024/1280/1440 clean. See T01_VERIFY** |
| T01-22 | 3B Public header — mobile (390px) | SC | PublicHeaderClient mobile (IMPL✓) |
| T01-23 | 3C Contextual header — mobile (56px) | SC | detail/dashboard back-headers (IMPL, partial) |
| T01-24 | 3D Dashboard shell — desktop | SC | DashboardShellV2 (IMPL) |
| T01-25 | 3E Dashboard shell — mobile | SC | DashboardShellV2 + DashboardMobileTabBar (IMPL) |
| T01-26 | 3F Admin/Staff shell — graphite | SC | AdminShell (IMPL) |
| T01-27..37 | Generic modal·Confirm dialog·Bottom sheet·Toasts·Share popover·Notif dropdown·Notif bottom sheet·Filter bottom sheet·Share sheet·Right detail drawer·Fullscreen gallery | SC/MD | ui/Modal, MobileFilterSheet, DetailGallery, NotificationBell (IMPL, mixed) |
| T01-38..41 | Loading skeleton·Empty actionable·Error/forbidden/setup·Table→card transform | DSR | state patterns (IMPL) |
| T01-42..44 | Form wizard desktop·mobile·wizard pattern | SC | Stepper + forms (IMPL) |
| T01-45..47 | Mobile sticky CTA: ctx A (detail)·ctx B (dashboard)·consistency rules | SC/DSR | DetailCTABar (IMPL) |
| T01-48..50 | (remaining specimen captions) | DSR | reference |

**Batch 1 result:** REFERENCE — mapped (0 unmapped). Tokens locked (Inter font FIXED, 1024 header overflow FIXED). Gate status (scope-separated): public/runtime-verifiable VISUAL·FUNCTIONAL·RESPONSIVE = PASS, REGRESSION = PASS; **overall affected gates = UNVERIFIED-AUTH** (authenticated shells 3C/3D/3E/3F + auth overlays + wizard shells not viewed logged-in). **FINAL: NOT COMPLETE** — pending authenticated-consumer verification (owner/broker/admin login → overflow/clip audit on dashboard + admin route). See verification/T01_VERIFY.md.

---

## BATCH 2 — Auth Flows — 23 targets (5 group + 18 frames; was 20, +3 missed frames added 2026-07-08) → canonical `/login`, `/admin/login`, `/admin/invite`, AuthModal

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T02-01 | Phone entry → OTP login (group) | RS | AuthModal `/login` | IMPL✓ · runtime-verified · **`/login` blue→brand FIX + design-screen-7 "unregistered→register" card ADDED (`MobileOtpForm` `unregistered` step) 2026-07-08** |
| T02-02 | 1 · Mobile number entry — desktop modal | RV | AuthModal | IMPL✓ |
| T02-03 | 1 · Mobile bottom sheet + 2 · Checking state | RV/ST | AuthModal mobile | IMPL✓ |
| T02-04 | 3 · Existing user — OTP login (desktop modal) | RV | MobileOtpForm | IMPL✓ |
| T02-05 | 4 · Resend cooldown (mobile sheet) | ST | MobileOtpForm (countdown) | IMPL✓ |
| T02-06 | 6 · Rate-limited — full stop | ST | AuthModal error state | IMPL✓ |
| T02-07 | 11 · OTP provider unavailable — never fake-success | ST | provider fallback | IMPL✓ |
| T02-08 | 8 · Role selector — desktop modal | RV | RegisterRoleForm | IMPL✓ |
| T02-09 | 9 · Registration form — mobile sheet | RV | RegisterRoleForm | IMPL✓ |
| T02-10 | 10 · OTP verify (registration) | INH→T02-04 | reuse | IMPL✓ |
| T02-11 | 12 · Suspended account — full stop mobile | ST | SuspendedState | IMPL✓ |
| T02-12 | 13 · Success — redirecting, skeleton behind | ST | AuthModal success | IMPL✓ |
| T02-13 | Post-login redirect intent rule | DSR | logic note | IMPL✓ |
| T02-14 | 14 · Staff login — desktop full page | RS | `/admin/login` | IMPL✓ · **desktop overflow (+24px ≥768) FIX 2026-07-08 (`sm:w-auto` on absolute wordmark); 0 overflow 320–1440 verified** |
| T02-15 | 14 · Staff login — mobile | RV | `/admin/login` | IMPL✓ |
| T02-16 | 16 · Staff invite acceptance — token | RS | `/admin/invite` | IMPL✓ |
| T02-17..20 | (group headers: Error/rate-limit·Role sel·Suspended·Staff portal) | INH | grouping | IMPL✓ |
| T02-21 | 5 · Wrong / expired OTP | ST | MobileOtpForm error state + OtpInput(error) | IMPL✓ (mapping added 2026-07-08 — was implemented, now explicitly listed) |
| T02-22 | 7 · Unregistered number → register prompt | ST | MobileOtpForm `unregistered` step | **IMPL✓ 2026-07-08 (built this pass, live-verified)** |
| T02-23 | 15 · Invalid credentials + lockout | ST | `/admin/login` cred-error banner + Account-locked card | IMPL✓ (mapping added 2026-07-08 — was implemented, now explicitly listed) |

**Batch 2 result (FRESH AUDIT 2026-07-08 — historical Prompt-02 PASS not trusted; RUNTIME-VERIFIED via headless Chromium):** Exact count reconciled = 23 registry rows (5 group + **18 frames**; 16 distinct numbered design screens 1–16). **Processed = 18/18 frame targets.** All re-inspected vs decoded source AND driven live (Playwright; preview_* MCP bridge unavailable this session).
Scoped gate evidence: guest/runtime **VISUAL: PASS**, guest-accessible **FUNCTIONAL: PASS** (Screen 7 reached live via real DB; eye-toggle/consent-gating/invalid-invite live), **RESPONSIVE: PASS** (matrix 320–1440 × {/login,/admin/login,/admin/invite} = 0 overflow/clip/past-edge after fix), **REGRESSION: PASS** (tsc 0 · eslint 0 · `next build` exit 0, isolated distDir).
**CLOSED 2026-07-08 (b):** OTP send/verify/session verified live via approved DEV_ONLY `dev_mock` (screens 1→3→13); suspended-account (screen 12) verified live (render + login-time & mid-session blocking, dev fixture restored). Under §5.5 provider-gated rule, production external SMS gateway = provider **activation** (separate, tracked in API_PROVIDER_STATUS.md), not a migration blocker. **Overall gates VISUAL/FUNCTIONAL/RESPONSIVE/REGRESSION = PASS.**
**3 missed-frame mappings added** (5, 7, 15). **3 mismatches fixed:** (1) `/login` `bg-blue-600`+"M" → brand+Building2; (2) Screen 7 "unregistered→register" card implemented 1:1; (3) `/admin/login` desktop overflow (+24px ≥768) → `sm:w-auto`. **FINAL: COMPLETE** (migration scope; provider-gated §5.5 — production SMS activation tracked separately). 0 unmapped. See verification/T02_VERIFY.md + contracts/T02_AUTH_FLOWS.md.

---

## BATCH 3 — Public Home + Search — 29 targets → `/`, `/search` (IMPL✓ Prompts 03/05)

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T03-01 | Homepage (group) | RS | `/` | IMPL✓ |
| T03-02..08 | Browse by category·Featured properties·Featured projects·Recently viewed·List with us·How it works·Why MGP | INH→T03-01 | home sections | IMPL✓ · **Recently viewed (design §5) was MISSING → IMPLEMENTED 2026-07-08 (`HomeRecentlyViewed`+`ClearHistoryButton`+`clearRecentlyViewed`; logged-in-only, honest null for guest)** |
| T03-09..11 | (mobile repeats: category/featured/list-with-us) | RO→T03-02.. | mobile home | IMPL✓ |
| T03-12 | Search Results (group) | RS | `/search` | IMPL✓ |
| T03-13 | Search — Filter bottom sheet (mobile) | MD | MobileFilterSheet | IMPL✓ · **a11y FIX 2026-07-08 (added `role="dialog"`/`aria-modal`); opens no-overflow, real filters verified live** |
| T03-14 | Search — Empty state | ST | SearchEmptyState | IMPL✓ |
| T03-15 | Search — Map toggle view | RS/ST | maps FALLBACK (setup-required) | IMPL (fallback) |
| T03-16 | Search — Loading state | ST | search loading | IMPL |
| T03-17 | Save Search prompt | MD | `SaveSearchButton` (search toolbar) | **IMPL✓ · signed-in persistence VERIFIED LIVE 2026-07-08 (dev-OTP Owner session). See T03_VERIFY.md + T03-17_VERIFY.md** |
| T03-18 | 1A Homepage desktop (1280) | RV | `/` desktop | IMPL✓ |
| T03-19 | 1B Homepage mobile (390) | RV | `/` mobile | IMPL✓ |
| T03-20 | 2A Search results desktop | RV | `/search` desktop | IMPL✓ |
| T03-21 | 2B Search results mobile | RV | `/search` mobile | IMPL✓ |
| T03-22 | Empty results (shared block) | ST | SearchEmptyState | IMPL✓ |
| T03-23 | Missing-location request modal — desktop | MD | RequestLocationModal | IMPL |
| T03-24 | 5A Split view — desktop (map) | RS | maps FALLBACK | IMPL (fallback) |
| T03-25 | 5B Full map + bottom-sheet — mobile | RV | maps FALLBACK | IMPL (fallback) |
| T03-26 | 5C Fallback — maps provider not configured | ST | maps FALLBACK_ACTIVE | IMPL✓ |
| T03-27 | Inline card — desktop (above results) | SC | FilterChips | IMPL |
| T03-28 | Toast variant — mobile after filters | ST | toast | IMPL |
| T03-29 | Map view unavailable — showing list | ST | maps fallback caption | IMPL✓ |

**Batch 3 result (FRESH AUDIT 2026-07-08 — historical Prompt-03/05 PASS not trusted; RUNTIME-VERIFIED headless Chromium, guest + signed-in dev-OTP session):** 29 targets re-inspected vs decoded source + driven live (`/`, `/search`, `/search?q=<none>`). **VISUAL PASS · FUNCTIONAL PASS · RESPONSIVE PASS (0 page-overflow 320–1440 × 3 routes) · REGRESSION PASS (tsc0·eslint0·build0).** **New functionality:** home **Recently viewed** (design §5, was missing) implemented end-to-end + signed-in verified. **Fixes:** (1) Recently-viewed section; (2) MobileFilterSheet dialog a11y; (3) **real RLS bug** — `recently_viewed_items` had no DELETE policy → Clear-history/trim were no-ops; migration `20260708090000_recently_viewed_delete_policy.sql` added + **applied to dev DB** + re-verified. **Signed-in verified:** Recently-viewed render, Clear-history (empties + persists), Save Search (T03-17) persistence. **Provider-gated:** maps = honest FALLBACK_ACTIVE (§5.5). **Remaining UNVERIFIED-AUTH:** none. **FINAL: COMPLETE.** 0 unmapped. See verification/T03_VERIFY.md.

---

## BATCH 4 — Detail Pages — 21 targets → `/property|project|broker|builder/[slug]`, compare (IMPL✓ Prompt 05)

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T04-01 | Property detail (group) | RS | `/property/[slug]` | IMPL✓ — **rebuilt to design top-to-bottom 2026-07-08(d): added Share + KeyFacts spec strip + Amenities + Location(Map:Setup-Required+address) + Similar properties, all real data. Prior pass shipped a minimal page missing these design sections.** |
| T04-02 | Desktop — 1280px | RV | property detail | IMPL✓ |
| T04-03 | Mobile — 390px sticky CTA | RV | property detail + DetailCTABar | IMPL✓ |
| T04-04 | Unavailable variant — no soft-404 | ST | UnavailableEntityState (404+noindex) | IMPL✓ |
| T04-05 | Project detail (group) | RS | `/project/[slug]` | IMPL✓ — **rebuilt to design top-to-bottom 2026-07-08(d): added Share + KeyFacts + Available units(real unit_configurations) + Amenities + Video/360°(honest Setup-Required) + Location + Similar projects. Prior pass missing these design sections.** |
| T04-06 | Desktop — 1280px | RV | project detail | IMPL✓ |
| T04-07 | Mobile — sticky Enquire CTA | RV | project detail | IMPL✓ |
| T04-08 | Requirement detail — scoped visibility | RS | scoped (no public page; card-only) | IMPL✓ (masked) |
| T04-09 | Desktop — Broker/Builder view + Send Proposal | RV | requirement scoped | IMPL |
| T04-10 | Guest teaser — locked, mobile | ST | requirement masked-until-proposal | IMPL✓ |
| T04-11 | Broker public profile `/broker/[slug]` | RS | `/broker/[slug]` | IMPL✓ — **rebuilt to Screen 4 2026-07-08(e): Contact broker (auth-gated, no phone in initial render), service-area chips (real listing localities), stat tiles (Active listings/Areas/"Reviews Soon — never faked"), Report-profile (user_reports). Prior minimal header+grid replaced.** |
| T04-12 | Desktop | RV | broker profile | IMPL✓ |
| T04-13 | Mobile | RV | broker profile | IMPL✓ |
| T04-14 | Builder microsite `/builder/[slug]` | RS | `/builder/[slug]` | IMPL✓ — **rebuilt to Screen 5 2026-07-08(e): Contact builder (auth-gated), stat tiles (Projects/Cities/RERA), Active/Completed/About tabs (real construction_status split), Report-profile. Prior minimal header+grid replaced.** |
| T04-15 | 6 · Owner public-safe profile — minimal | RS/ST | owner privacy (role label only) | IMPL✓ |
| T04-16 | 7 · Claim profile — CTA + request modal | MD | — | **GAP (honest deferral)** — no `profile_claims` backend/verification queue; only for RERA-auto-created unclaimed profiles (no data). No fake control shipped. Needs claims table + verification phase. |
| T04-17 | 8 · Report — desktop modal | MD | `ReportModal` | **IMPL✓ 2026-07-08 — built end-to-end (config+action+component), wired to real `user_reports` moderation queue; verified live (guest login-prompt + logged-in submit persists 0→1). Fixed real `"use server"` export bug.** |
| T04-18 | 8 · Report — mobile bottom sheet | MD | `ReportModal` (bottom sheet) | **IMPL✓ 2026-07-08 — same component, mobile sheet + dialog a11y; no overflow.** |
| T04-19 | 9 · Fullscreen gallery — desktop thumb strip | MD | DetailGallery | **PROVIDER-GATED (R2 media, Prompt 10/12)** — honest placeholder (no real photos); fullscreen viewer lands with media. §5.5, not a dead control. |
| T04-20 | Comparison page (group) | RS | `/compare` (CompareView) | IMPL |
| T04-21 | Report content modal & fullscreen gallery (group) | INH | grouping | — |

**Batch 4 result (FRESH AUDIT 2026-07-08 — headless Chromium, guest matrix + dev-OTP session):** 21 targets re-inspected vs decoded source + driven live (property/project/broker/builder detail, /compare, unavailable). **VISUAL PASS · FUNCTIONAL PASS · RESPONSIVE PASS (66 probes 320–1440 = 0 page-overflow) · REGRESSION PASS (tsc0·eslint0·build0).** **New functionality:** **Report content modal/sheet** (T04-17/18, was GAP) built end-to-end (`src/lib/reports/config.ts` + `src/lib/actions/reports.ts` + `ReportModal`, real `user_reports` moderation queue, auth-required, rate-limited) + verified live (guest login-prompt + logged-in submit persists 0→1, test row cleaned). **Real bug fixed:** `REPORT_CATEGORIES` exported from a `"use server"` file broke logged-in detail-page JS → moved to a plain module. Privacy masking + sticky CTA + unavailable-404+noindex verified. **Honest deferrals (not migration-fake):** T04-16 Claim (no `profile_claims` backend/verification queue), T04-19 Fullscreen gallery (provider-gated R2 media, §5.5). **FINAL: NOT COMPLETE** (Claim + gallery gated only). 0 unmapped. See verification/T04_VERIFY.md.

---

## BATCH 5 — Posting Wizards — 10 targets → wizard routes (IMPL Prompt 04; runtime UNVERIFIED-AUTH)

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T05-01 | Post Property wizard · 9 steps | WZ | PropertyForm (9) | IMPL, UNVERIFIED-AUTH |
| T05-02 | Post Project wizard · 10 steps | WZ | ProjectForm (10+RERA) | IMPL, UNVERIFIED-AUTH |
| T05-03 | Post Requirement wizard · 7 steps | WZ | RequirementForm (7) | IMPL, UNVERIFIED-AUTH |
| T05-04 | Unit inventory management — Builder | RS | builder units | IMPL (partial), UNVERIFIED-AUTH |
| T05-05 | Desktop shell — step 3 w/ validation | RV | wizard desktop | IMPL |
| T05-06 | Mobile shell — step 6 (media upload) | RV | wizard mobile (media SETUP_REQUIRED) | IMPL |
| T05-07 | All 9 step panels | WZ | 9 panels | IMPL |
| T05-08 | Unit inv — desktop grid + bulk select | RV | units desktop | GAP (bulk actions) |
| T05-09 | Unit inv — mobile accordion cards | RV | units mobile | GAP |
| T05-10 | Unit edit — mobile sheet / desktop modal | MD | unit edit | GAP |

**Batch 5 result:** wizards IMPL (step counts match design); **unit-inventory grid/accordion/edit = GAP**; runtime UNVERIFIED-AUTH. 0 unmapped.

---

## BATCH 6 — Owner Dashboard — 53 targets → `/dashboard/owner/*` (IMPL Prompt 06; runtime UNVERIFIED-AUTH)

Canonical route screens + their RV/ST/MD variants. All code exists (DashboardShellV2); authenticated runtime UNVERIFIED.

| ID range | Targets | Class | Canonical | Status |
|----------|---------|-------|-----------|--------|
| T06-01..04 | Overview desktop·stat-skeleton·mobile(root,bottom-nav)·mobile sidebar drawer | RS/RV/ST/MD | `/dashboard/owner` | IMPL, UNVERIFIED-AUTH |
| T06-05..08 | My Properties: desktop panel·delete confirm dialog·mobile ctx header·empty | RS/MD/RV/ST | `/owner/properties` | IMPL, UNVERIFIED-AUTH |
| T06-09..10 | My Requirements: desktop·mobile+empty | RS/RV | `/owner/requirements` | IMPL, UNVERIFIED-AUTH |
| T06-11..12 | Leads: desktop table·mobile cards | RS/RV | `/owner/leads` | IMPL, UNVERIFIED-AUTH |
| T06-13..14 | Lead detail: desktop drawer·mobile full page | RS/MD/RV | `/dashboard/leads/[id]` | IMPL, UNVERIFIED-AUTH |
| T06-15..16 | Messages: thread list·thread detail (mobile) | RS/RV | `/dashboard/messages` | IMPL, UNVERIFIED-AUTH |
| T06-17..19 | Site Visits: list desktop·reject confirm·visit detail mobile | RS/MD/RV | site-visits | IMPL, UNVERIFIED-AUTH |
| T06-20..22 | Saved properties grid+empty·Saved searches·Recently viewed strip+empty | RS/ST | `/owner/saved` | IMPL, UNVERIFIED-AUTH |
| T06-23..25 | Analytics: populated·not-enough-data·provider-not-configured | RS/ST | owner analytics | IMPL (honest states), UNVERIFIED-AUTH |
| T06-26..29 | Billing·Invoices table→card·Invoice detail printable·Pricing/upgrade | RS | `/owner/billing`, `/pricing` | IMPL (P09), UNVERIFIED-AUTH |
| T06-30..31 | Verification: upload+timeline·rejected+resubmit | RS/ST | `/owner/verification` | IMPL, UNVERIFIED-AUTH |
| T06-32 | Profile edit | RS | `/profile` | IMPL, UNVERIFIED-AUTH |
| T06-33 | Notifications Center — full page | RS | `/owner/notifications` | IMPL, UNVERIFIED-AUTH |
| T06-34 | Support — FAQ+ticket+status | RS | `/support` | IMPL |
| T06-35 | Settings | RS | settings | IMPL, UNVERIFIED-AUTH |
| T06-36 | Role change request + pending | RS | role-change | GAP |
| T06-37 | Data export / delete request (account-deletion double-guard) | RS | account delete | **GAP** |
| T06-38..53 | remaining group headers + specimen ticket captions | INH/RO | grouping | — |

**Batch 6 result:** core IMPL; **GAPs: role-change request, account export/delete double-guard**; analytics = honest provider states (acceptable). Runtime UNVERIFIED-AUTH. 0 unmapped.

---

## BATCH 7 — Broker Dashboard + CRM Kanban — 28 targets → `/dashboard/broker/*`

| ID range | Targets | Class | Canonical | Status |
|----------|---------|-------|-----------|--------|
| T07-01 | Overview desktop (broker nav) | RS | `/dashboard/broker` | IMPL, UNVERIFIED-AUTH |
| T07-02 | Property row — Featured chip (delta) | SC | featured chip | GAP (featured-slot chip) |
| T07-03 | Post Property wizard entry + Continue Draft | RS | wizard entry | IMPL |
| T07-04 | My Requirements (reused) | INH→T06 | reuse | IMPL |
| T07-05 | Requirement Feed — matching from Owners | RS | broker requirement feed | IMPL (partial) |
| T07-06 | Feed empty state | ST | feed empty | IMPL |
| T07-07..09 | Proposals: sent list·detail·send modal (dup-submit protect) | RS/MD | `/broker/proposals` | IMPL, UNVERIFIED-AUTH |
| T07-10 | Leads/CRM — List view | RS | `/broker/leads` | IMPL |
| T07-11 | **Leads/CRM — Kanban view (desktop 1280+)** | RS | broker leads Kanban (`LeadKanbanBoard`, also builder) | **IMPLEMENTED 2026-07-04 — FINAL:NOT COMPLETE (auth runtime UNVERIFIED); build/lint/type/guard PASS; see verification/T07-11_VERIFY.md** |
| T07-12..13 | Lead detail CRM drawer·mobile | RS/MD/RV | lead detail | IMPL, UNVERIFIED-AUTH |
| T07-14..15 | Analytics: conversion funnel·listing ranking | RS/ST | broker analytics | IMPL (honest), UNVERIFIED-AUTH |
| T07-16 | Broker plan card + usage meters | RS | `/broker/billing` | IMPL (meters partial) |
| T07-17 | Verification — broker docs | RS | `/broker/verification` | IMPL, UNVERIFIED-AUTH |
| T07-18 | Profile edit — broker fields | RS | public-profile | IMPL, UNVERIFIED-AUTH |
| T07-19..28 | group headers (Messages/Visits/Saved reused) + specimen captions | INH/RO | reuse | IMPL |

**Batch 7 result:** T07-11 CRM Kanban = IMPLEMENTED (FINAL: NOT COMPLETE — auth-runtime UNVERIFIED). Remaining **GAP: featured-slot chip (T07-02)**. 0 unmapped.

---

## BATCH 8 — Builder Dashboard + Agents/Ads — 29 targets → `/dashboard/builder/*`

| ID range | Targets | Class | Canonical | Status |
|----------|---------|-------|-----------|--------|
| T08-01 | Overview | RS | `/dashboard/builder` | IMPL, UNVERIFIED-AUTH |
| T08-02 | Projects list — desktop | RS | `/builder/projects` | IMPL |
| T08-03 | Wizard entry + edit re-approval banner | RS/ST | project wizard entry | IMPL |
| T08-04..05 | Unit inventory: desktop table (2 selected)·mobile accordion | RS/RV | builder units | GAP (bulk/accordion) |
| T08-06 | Unit detail/edit — desktop modal | MD | unit edit | GAP |
| T08-07 | Lead detail — Assigned Agent block (delta) | SC | agent assign | GAP |
| T08-08 | Requirement Feed — explainable match chip | SC | match chip | IMPL (partial) |
| T08-09 | Site visit detail — Assign to agent | SC | visit assign | GAP |
| T08-10..12 | Agents: team list·invite modal·permissions editor | RS/MD | `/builder/agents` | GAP (**seats meter**, permissions) |
| T08-13..16 | Ads: campaign list·create wizard(7)·detail·analytics setup-required | RS/WZ/ST | `/builder/ads` | **GAP (placeholder "Coming Soon")** |
| T08-17 | Project analytics — sales velocity | RS | builder analytics | IMPL (honest) |
| T08-18 | Billing — Builder tier + **ad wallet** | RS | `/builder/billing` | **GAP (ad-wallet meter)** |
| T08-19 | RERA proof upload — per project | RS | RERA upload | IMPL (partial, media SETUP_REQUIRED) |
| T08-20 | Company microsite edit | RS | `/builder/public-profile` | IMPL |
| T08-21 | Construction progress update | RS | progress update | GAP |
| T08-22..29 | group headers + reused modules | INH | reuse | IMPL |

**Batch 8 result:** **GAPs: ad campaigns + ad-wallet meter + seats meter + agent-assign + unit bulk + construction progress**. 0 unmapped.

---

## BATCH 9 — Shared Detail Views — 21 targets → leads/proposals/messages/site-visits (IMPL Prompt 08)

| ID range | Targets | Class | Canonical | Status |
|----------|---------|-------|-----------|--------|
| T09-01..02 | Lead full detail: desktop (shell omitted)·mobile | RS/RV | `/dashboard/leads/[id]` | IMPL, UNVERIFIED-AUTH |
| T09-03 | Add/Edit note — mobile bottom sheet | MD | lead note | IMPL |
| T09-04 | Duplicate lead detection — inline banner | ST | dup detect | IMPL (partial) |
| T09-05 | Follow-up reminder scheduler — modal | MD | reminder | IMPL (partial) |
| T09-06 | Status change → Closed/Lost requires reason | MD | status+reason | IMPL |
| T09-07 | Contact Reveal flow — 3 steps | MD | contact reveal | IMPL (P08, quota) |
| T09-08 | Proposal full detail + embedded thread | RS | proposal detail | IMPL, UNVERIFIED-AUTH |
| T09-09..11 | Messages: thread list search·thread full·report modal | RS/MD | `/dashboard/messages` | IMPL, UNVERIFIED-AUTH |
| T09-12..16 | Site visits: request form·accept/reject/reschedule·reminder card·feedback·dispute | RS/MD/ST | site-visits | IMPL (partial), UNVERIFIED-AUTH |
| T09-17..21 | group headers + specimen captions | INH/RO | grouping | — |

**Batch 9 result:** IMPL (Prompt 08); runtime UNVERIFIED-AUTH; minor GAPs (dispute state, some modals partial). 0 unmapped.

---

## BATCH 10 — Billing & Payments — 18 targets → `/pricing`, `/dashboard/*/billing` (IMPL Prompt 09; Razorpay TEST)

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T10-01 | Public pricing page (group) | RS | `/pricing` | IMPL |
| T10-02 | Desktop — Broker tab active | RV | pricing | IMPL |
| T10-03 | Mobile — stacked comparison cards | RV | pricing mobile | IMPL |
| T10-04 | In-dashboard billing (all roles) | RS | `/dashboard/*/billing` | IMPL, UNVERIFIED-AUTH |
| T10-05 | 2 Subscription overview + 3 trial banner | RS/ST | billing overview | IMPL |
| T10-06 | 4 Plan upgrade w/ prorated preview | MD | plan change | IMPL (partial) |
| T10-07 | 6 Razorpay modal — placeholder | MD | Razorpay (PROVIDER TEST) | IMPL (test), PROVIDER_ACTIVATION separate |
| T10-08 | 7 Verifying — background locked | ST | payment verifying | IMPL |
| T10-09 | 8 Success — only after verified webhook | ST | payment success (webhook-gated) | IMPL✓ (no fake success) |
| T10-10 | 9 Failed — honest, no plan activated | ST | payment failed | IMPL✓ |
| T10-11 | 11 Invoice list — table + mobile card | RS/RV | invoices | IMPL, UNVERIFIED-AUTH |
| T10-12 | 12 Invoice detail — printable | RS | invoice detail | IMPL |
| T10-13 | 15 Manual activation — audit-friendly | ST | manual activation | IMPL (admin) |
| T10-14..18 | group headers + specimen captions | INH/RO | grouping | — |

**Batch 10 result:** IMPL (Prompt 09); Razorpay = TEST provider (PROVIDER_ACTIVATION_STATUS=not-live, honest, acceptable §5.5). Runtime UNVERIFIED-AUTH. 0 unmapped.

---

## BATCH 11 — Admin Management — 22 targets → `/admin/*` (IMPL Prompt 07; runtime UNVERIFIED-AUTH)

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T11-01 | Admin dashboard overview — role-aware | RS | `/admin` | IMPL, UNVERIFIED-AUTH |
| T11-02 | Desktop — Verification Manager view | RV | `/admin` scoped | IMPL |
| T11-03 | 2 Forbidden module — full page | ST | permission_denied | IMPL✓ (verified P07) |
| T11-04 | Mobile — ctx header + drawer, no bottom nav | RV | AdminShell mobile | IMPL |
| T11-05 | User management & role changes (group) | RS | `/admin/users` | IMPL, UNVERIFIED-AUTH |
| T11-06 | 5 Suspend/ban confirm — reason required | MD | suspend | IMPL |
| T11-07 | 7 Role change detail — reject reason | MD/RS | role change | IMPL |
| T11-08 | Staff mgmt, permissions & audit (group) | RS | `/admin/staff` | IMPL, UNVERIFIED-AUTH |
| T11-09 | 10 Permissions editor — matrix | RS | staff permissions | IMPL✓ (P07) |
| T11-10 | Moderation queues (group) | RS | `/admin/moderation/*` | IMPL, UNVERIFIED-AUTH |
| T11-11 | 12 Property moderation queue + states | RS/ST | moderation/properties | IMPL |
| T11-12 | 13 Property moderation detail | RS | moderation detail | IMPL |
| T11-13 | 17 Duplicate/merge review — keep selectors | RS | dup merge | GAP |
| T11-14 | 18 Claim request review | RS | claim review | GAP |
| T11-15 | Verification & tickets (group) | RS | `/admin/verification`,`/admin/support` | IMPL |
| T11-16 | 20 Verification detail — private viewer+badge | RS | verification detail | IMPL |
| T11-17 | 22 Ticket detail — thread + macros | RS | support ticket | IMPL (partial) |
| T11-18..22 | specimen captions + group headers | RO/INH | grouping | — |

**Batch 11 result:** IMPL (Prompt 07); GAPs: duplicate/merge review, claim review. Runtime UNVERIFIED-AUTH. 0 unmapped.

---

## BATCH 12 — Admin Billing — 11 targets → `/admin/billing` (IMPL Prompt 07/09)

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T12-01..05 | Subscriptions·Payments+webhooks·Refunds/credit/manual·Plans&coupons·Trial campaigns (groups) | RS | `/admin/billing` | IMPL, UNVERIFIED-AUTH |
| T12-06 | 4 Payment detail — safe payload | RS | payment detail | IMPL |
| T12-07 | 7 Refund detail/approve — confirm | MD | refund approve | IMPL (partial) |
| T12-08 | 8 Credit note — create+list | RS | credit note | GAP |
| T12-09 | 9 Manual activation — bypass warning | MD | manual activation | IMPL |
| T12-10 | 11 Invoice correction — versioned | RS | invoice correction | GAP |
| T12-11 | 13 Plan create/edit — live pricing preview | RS | plan editor | GAP |

**Batch 12 result:** partial IMPL; GAPs: credit note, invoice correction, plan editor. UNVERIFIED-AUTH. 0 unmapped.

---

## BATCH 13 — Admin Ads/Notifications/System — 24 targets → `/admin/*` (PARTIAL)

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T13-01..04 | Ads: queue·review detail·active/expired·fraud review | RS | admin ads | GAP (mostly NS) |
| T13-05..08 | Notif: templates list·editor(tokens/multilang/preview)·delivery logs·**defaults event×channel matrix** | RS | admin notifications | GAP (**notification matrix**) |
| T13-09..10 | Provider status grid·provider detail/test (masked keys) | RS | `/admin/providers` | IMPL (P07/10) |
| T13-11..12 | Feature flags list·toggle confirm+audit note | RS/MD | `/admin/settings` flags | IMPL (partial) |
| T13-13..14 | Maintenance control·public maintenance page | RS | maintenance | GAP |
| T13-15..16 | System health dashboard·dead-letter queue | RS | system health | GAP |
| T13-17..24 | group headers + specimen | INH/RO | grouping | — |

**Batch 13 result:** provider status IMPL; **GAPs: ads admin, notification templates+channel-matrix, maintenance, system health, DLQ**. 0 unmapped.

---

## BATCH 14 — Admin CMS/SEO/Location — 10 targets → `/admin/cms`, SEO, location (PARTIAL)

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T14-01..04 | Content(CMS/Blog/Legal)·SEO/redirects/sitemap·Location hierarchy·Missing-translation tracker (groups) | RS | `/admin/cms` | IMPL (partial CMS) |
| T14-05 | 5 Legal pages — restricted editor | RS | legal editor | GAP |
| T14-06 | 2 CMS page editor (+4 Blog) | RS | CMS editor | IMPL (partial) |
| T14-07 | 6 Per-page metadata — inline+index toggle | RS | SEO meta | GAP |
| T14-08 | 8 Redirect form — loop prevention | MD | redirects | GAP |
| T14-09 | 10 Location hierarchy tree | RS | location admin | GAP (Prompt 11) |
| T14-10 | 11 Location create/edit — multilingual | MD | location edit | GAP |

**Batch 14 result:** partial; **GAPs: legal editor, SEO meta, redirects, location hierarchy** (location = Prompt 11 scope). 0 unmapped.

---

## BATCH 15 — Admin Audit/Security/Reports — 14 targets → `/admin/audit` etc (PARTIAL, IMPL Prompt 07/15)

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T15-01..06 | Audit logs·Security events·Reports/fraud queue·Dup/reveal/report/dispute·Business reports+exports·Bulk+maker-checker (groups) | RS | `/admin/audit` | IMPL (partial) |
| T15-07 | 5 Duplicate lead review | RS | dup lead | GAP |
| T15-08 | 6 Contact reveal logs — permission-gated | RS | reveal logs | IMPL (partial) |
| T15-09 | 7 Message report review | RS | message report | GAP |
| T15-10 | 8 Site visit dispute review | RS | visit dispute | GAP |
| T15-11 | 9 Business metrics + setup-required | RS/ST | business reports | IMPL (honest) |
| T15-12 | 10 Exports management | RS | exports | GAP |
| T15-13 | 11 Bulk action — preview affected | MD | bulk action | GAP |
| T15-14 | 12 Maker-checker pending approvals | RS | maker-checker | GAP |

**Batch 15 result:** audit IMPL (partial); **GAPs: dup-lead, message-report, dispute, exports, bulk-action, maker-checker**. 0 unmapped.

---

## BATCH 16 — Public Content Pages — 26 targets → `/legal/*`, `/support`, content (PARTIAL)

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T16-01 | 1 About — desktop | RS | `/about` | GAP (→/support) |
| T16-02 | 2 Contact — mobile | RS | `/contact` | GAP |
| T16-03 | 3 FAQ/Help center — desktop | RS | `/support` | IMPL (partial) |
| T16-04 | 4 Safety guidelines — mobile | RS | safety | GAP |
| T16-05 | 5 Terms — desktop sticky TOC | RS | `/legal/terms` | IMPL |
| T16-06 | Mobile collapsible TOC (all legal) | RV | legal mobile | IMPL (partial) |
| T16-07 | 10 Listing Policy | RS | listing policy | GAP |
| T16-08 | 14 Disclaimer | RS | disclaimer | GAP |
| T16-09 | 15 Grievance Policy | RS | grievance | GAP |
| T16-10 | Cookie preference — desktop modal | MD | cookie mgr | GAP |
| T16-11 | Cookie — mobile bottom sheet | MD | cookie mgr | GAP |
| T16-12 | 7 Cookie Policy page | RS | `/legal/cookie` | GAP |
| T16-13 | 16 Blog listing — desktop | RS | `/blog` | GAP (Prompt 11/16) |
| T16-14 | 17 Blog post — mobile reading progress | RS | blog post | GAP |
| T16-15 | 18 Guest support form — rate-limited | RS | guest support | IMPL (partial) |
| T16-16..26 | group headers + article specimens | INH/RO | grouping | — |

**Batch 16 result:** terms/privacy/refund IMPL; **GAPs: about/contact/safety/listing-policy/disclaimer/grievance/cookie/blog** (Prompt 11/16 content scope). 0 unmapped.

---

## BATCH 17 — Advanced / PWA / Localization — 19 targets (MOSTLY NOT_STARTED / some IMPL)

| ID | Label | Class | Canonical | Status |
|----|-------|-------|-----------|--------|
| T17-01 | 1 Install prompt — mobile banner | SC/ST | PWA install | NS |
| T17-02 | 2 Offline banner | SC/ST | offline | NS |
| T17-03 | 3 Language selector (header dropdown) | SC/MD | i18n | NS |
| T17-04 | 4 Theme toggle + dark-mode proof | SC | dark mode | IMPL (dark mode exists) |
| T17-05 | 5 Typo/transliteration search (concept) | DSR | search translit | IMPL✓ (added 2026-07-04) |
| T17-06 | 6 EMI calculator | RS | EMI calc | GAP |
| T17-07 | 7 Stamp duty calculator (Gujarat) | RS | stamp duty | GAP |
| T17-08 | 8 Unit converter — Gujarat land units | RS | unit converter | GAP |
| T17-09 | 9a Compare tray (sticky bottom bar) | SC | CompareTray | IMPL |
| T17-10 | 9b Full comparison table | RS | CompareView | IMPL |
| T17-11 | 10 Analytics consent | MD/ST | consent | NS |
| T17-12 | 11 App update available toast | ST | PWA update | NS |
| T17-13 | 12 Accessibility quick-settings panel | MD | a11y panel | NS |
| T17-14..19 | group headers + consistency checklist | DSR/INH | reference | — |

**Batch 17 result:** compare tray/table + dark mode + transliteration IMPL; **GAPs/NS: PWA install/offline/update, i18n language selector, EMI/stamp-duty/unit calculators, analytics consent, a11y panel**. 0 unmapped.

---

# RECONCILIATION (Phase-1 CLOSED)

**Exact source = `docs/design-migration/TARGET_REGISTRY.md` (405 rows, one per discovered target).** The grouped batch tables above are summaries that link to it — not a substitute. Counts are exact from the registry (no approximations):
- `TOTAL_DESIGN_BATCH_FILES` = **17** ✓
- `TOTAL_DISCOVERED_DESIGN_TARGETS` = **405** · `TOTAL_MANIFEST_ENTRIES` = **405** (registry rows = 405)
- Exact class tally: **RS=207 · RESPONSIVE_VARIANT=55 · UI_STATE=48 · MODAL/DRAWER=35 · WIZARD_STEP=10 · DSR=50** (sums to 405). The RS bucket contains both true ROUTE_SCREENs and H2 group-header/INH rows + desktop/mobile duplicate repeats; per-row curated class is in the batch tables.
- **`TOTAL_UNMAPPED_TARGETS` = 0** ✓ (all 405 registry rows carry a class; every batch-table row maps to a canonical route/component or explicit REF/INH).

## Implementation status roll-up (honest)
- **IMPL✓ (runtime-verified this session):** Batch 2 auth, Batch 3 home/search, Batch 4 public detail/profiles/compare, Batch 17 compare/translit/dark.
- **IMPL, UNVERIFIED-AUTH (code exists, authenticated runtime not automatable):** Batch 5 wizards, Batch 6 owner, Batch 7 broker (core), Batch 8 builder (core), Batch 9 shared detail, Batch 10 billing, Batch 11 admin (core), Batch 12 admin billing (core).
- **OPEN GAPS (design targets not yet built)** — implementation is selected strictly by manifest order (§6), NOT by this list. Enumerated for visibility only:
  - Batch 3: T03-17 Save Search prompt.
  - Batch 4: T04-16 claim-profile modal · T04-17/18 report modal/sheet.
  - Batch 5: T05-08..10 unit-inventory grid/accordion/edit.
  - Batch 6: T06-36 role-change request · T06-37 account export/delete double-guard.
  - Batch 7: T07-02 featured-slot chip. (T07-11 Kanban = IMPLEMENTED, not a gap.)
  - Batch 8: T08-04..06 unit inventory · T08-07/09 agent-assign · T08-10..16 agents/ads/seats/ad-wallet (T08-18) · T08-21 construction.
  - Batch 11–15: various admin gaps (dup/merge, credit note, invoice correction, plan editor, ads admin, notif templates+matrix, maintenance, system health, CMS/SEO/redirects/location, dup-lead/message-report/dispute/exports/bulk/maker-checker).
  - Batch 16: about/contact/safety/listing-policy/disclaimer/grievance/cookie/blog.
  - Batch 17: EMI/stamp-duty/unit calculators, PWA install/offline/update, i18n language selector, analytics consent, a11y panel.
  - Batch 1: Inter font token (cosmetic).

## Next (implementation order per §6 — strict manifest order, NOT a custom priority list)
Recomputed from T01 onward:
- **Batch 1 (T01-*):** DESIGN_SYSTEM_REFERENCE / SHARED_COMPONENT — not separate implementation targets → skip.
- **Batch 2 (T02-*):** auth — COMPLETE (runtime-verified, Prompt 02 evidence in MANUAL_VERIFICATION).
- **Batch 3 (T03-*):** home/search COMPLETE except → **T03-17 Save Search prompt = first incomplete canonical implementation target.** (T03-15/24/25 maps split-view = provider FALLBACK_ACTIVE, acceptable per §5.5, not a gap; T03-23 missing-location modal = IMPL.)

**T03-17 · Save Search prompt = IMPLEMENTED 2026-07-04** (guest path runtime-verified; signed-in persistence UNVERIFIED-AUTH). Backend `saveSearch()` reused.

**NEXT incomplete canonical target (manifest order) = T04-16 · Claim-profile modal**, then T04-17/18 · Report modal/sheet (public `/broker|builder/[slug]` + detail pages → guest-render-verifiable). Rationale: Batch 4 is the next batch after Batch 3 with GAP rows; T04-01..15 are IMPL✓; T04-16 is the earliest GAP. (T07-11 Kanban stays IMPLEMENTED, out-of-strict-order, not re-selected.)
