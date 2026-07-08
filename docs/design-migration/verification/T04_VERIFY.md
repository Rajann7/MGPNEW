# Verification — T04 · Detail Pages (Batch 4) — FRESH REBUILD AUDIT

**Design source:** `batch 4 - Detail Pages (Standalone).html` → decoded `scratchpad/design-extract/batch4.decoded.html` (7 `<h2>` sections, 14 frame specimens; 21 manifest targets). **Date:** 2026-07-08. Fresh audit — historical Prompt-05 IMPL✓ not trusted; each target re-inspected vs decoded source + driven live (headless Chromium/Playwright on the running dev server; `preview_*` MCP bridge unavailable). Real slugs used from dev DB.

## Target-by-target fresh audit
| T04 | Design target | Route / Impl | Result |
|---|---|---|---|
| 01/02/03 | Property detail (desktop 1280 / mobile sticky CTA) | `/property/[slug]` + `DetailCTABar` | MATCH — 0 page-overflow 320–1440; sticky CTA `sticky bottom-0` with "Send Enquiry" + **honest login-required masking** (no contact leak) |
| 04 | Unavailable variant — no soft-404 | `notFound()` → `UnavailableEntityState` | MATCH — HTTP **404** + `noindex` + honest "This listing is not available right now" |
| 05/06/07 | Project detail (desktop / mobile sticky Enquire) | `/project/[slug]` | MATCH — 0 page-overflow 320–1440 |
| 08/09/10 | Requirement — scoped visibility / broker-builder Send Proposal / guest teaser locked | scoped (no public requirement page; masked-until-proposal) | MATCH (privacy-preserving) — enquiry/contact masked; broker/builder proposal path is role-gated (auth) |
| 11/12/13 | Broker public profile (desktop/mobile) | `/broker/[slug]` | MATCH — 0 page-overflow 320–1440 |
| 14 | Builder microsite | `/builder/[slug]` | MATCH — 0 page-overflow 320–1440 |
| 15 | Owner public-safe profile — minimal by default | owner privacy (role label only) | MATCH (privacy — minimal public surface) |
| 16 | Claim profile — CTA + request modal | — | **GAP (honest deferral)** — no `profile_claims` backend table/verification queue exists; feature applies only to RERA-auto-created *unclaimed* profiles (no such data yet). Building a "Claim this profile" button with no backend = fake control → not done. Requires a `profile_claims` table + verification-queue phase. Recorded, not fabricated. |
| 17/18 | Report — desktop modal / mobile bottom sheet | **`ReportModal` (NEW this pass)** | **WAS GAP → IMPLEMENTED end-to-end + verified live** (see below) |
| 19 | Fullscreen gallery — desktop thumb strip / mobile swipe | `DetailGallery` (honest placeholder) | **PROVIDER-GATED (R2 media)** — no real photos (media storage not configured, Prompt 10/12); shows honest "Photos coming soon / not added yet" + counter position. Fullscreen viewer lands with real media. Not a dead/fake control (§5.5). |
| 20 | Comparison page | `/compare` (CompareView) | MATCH — 0 page-overflow 320–1440 |
| 21 | (grouping) | INH | — |

## New functionality implemented this pass — Report content modal/sheet (T04-17/18)
Backend `user_reports` table already existed (RLS: reporter reads own, own insert) but had **no UI and no server action** (GAP). Implemented end-to-end:
- `src/lib/reports/config.ts` — `REPORT_CATEGORIES` sourced from the real `user_reports.category` DB enum (spam/duplicate/fraud/wrong_information/illegal_content/abuse/other — full relevant set, not a design sample subset).
- `src/lib/actions/reports.ts` — `submitReport()` server action: **auth-required** (RLS + FK require a real reporter profile → guests must log in; honest, no fake success), validates target/category, **rate-limited** (rejects duplicate pending report of same target + per-user daily cap 10), inserts to `user_reports` (status=pending → moderation queue).
- `src/components/detail/ReportModal.tsx` — "Report this listing" trigger → desktop modal / mobile bottom sheet (grab handle), `role="dialog"`/`aria-modal`, reason `<select>` + details textarea + rate-limit note + Cancel/Submit + success state; guest → honest login prompt (`/login?redirectTo=`).
- Wired into `/property/[slug]` and `/project/[slug]`.

### Real bug found + fixed during verification
`REPORT_CATEGORIES` was initially exported from the `"use server"` `reports.ts` — a `"use server"` module may only export async functions, so importing the constant into the client `ReportModal` threw a Turbopack module error that **broke client JS on the logged-in property/project detail pages** (Report modal wouldn't open). Fixed by moving the constant to the plain `src/lib/reports/config.ts`. Re-verified working.

## Runtime verification (Playwright headless Chromium, 2026-07-08)
**Routes tested live:** `/property/[slug]`, `/project/[slug]`, `/broker/[slug]`, `/builder/[slug]`, `/compare`, unavailable `/property/<bad>`.
**Viewports (each):** 320/360/375/390/414/430/768/1024/1280/1366/1440 — **66 probes → 0 real page-overflow / 0 real text-clip** (the only text-clip = intentional header search placeholder truncate; no `<select>` dropdown clipping).
**Interactions verified live:**
- Mobile property sticky CTA pinned bottom, "Send Enquiry" + honest login-required masking; no overflow.
- Unavailable slug → 404 + noindex + honest copy.
- **Report (guest):** trigger present → dialog (`role=dialog aria-modal`) → honest **login prompt** (no fake success); no overflow when open.
- **Report (logged-in, dev-OTP Owner session):** form shown → select reason + details → **Submit → "Report submitted" + real `user_reports` row persisted (0→1)**; test row cleaned up.

## Gates (scope-separated — honest)
- **VISUAL: PASS** — all detail routes match decoded Batch 4 top-to-bottom; correct chrome (public header + footer on detail pages; contextual sticky CTA on mobile); no old-UI remnants; Report modal/sheet + unavailable state match design.
- **FUNCTIONAL: PASS** — enquiry/contact privacy masking preserved; unavailable 404; Report implemented + verified live (guest prompt + logged-in persist + rate-limit); no dead/fake controls. Claim = honest GAP (no backend); gallery = honest provider-gated placeholder.
- **RESPONSIVE: PASS** — 66 probes 320–1440, 0 page-overflow; sticky CTA no content-cover; Report modal/sheet no overflow.
- **REGRESSION: PASS** — `tsc` 0 · `eslint` 0 · `next build` exit 0 (isolated distDir); routing/privacy/masking/compare/enquiry preserved; fixed a real page-breaking `"use server"` export bug.

## Blockers / deferred (honest, not migration-fake)
- **T04-16 Claim profile:** deferred GAP — needs `profile_claims` table + verification-queue phase; no fake control shipped.
- **T04-19 Fullscreen gallery:** provider-gated on R2 media (Prompt 10/12); honest placeholder now.
- Requirement broker/builder Send-Proposal path (T04-09) is role-gated (auth) — guest teaser + masking verified; full proposal submission is a Batch 9 CRM concern.

## Update 2026-07-08 (b) — FRESH re-verification via preview_* MCP (this session)
Re-verified live with the **preview_\* MCP bridge** (earlier run used scratchpad Playwright). Real slugs from dev DB (property `house-for-sale-in-rajokot-cb9c68c6`, project `dev-test-skyline-residency-1b51612e`, broker `dev-test-realty`, builder `dev-test-builders`). Logged-in Owner via native-setter OTP. **No T04 source changed** this pass.

| Target | Surface | Live result (fresh) |
|---|---|---|
| 01/02/03 Property detail | `/property/[slug]` 1280 + 390 | PASS — header+footer, breadcrumbs, JSON-LD, h1, price; mobile **sticky bottom-0 CTA** ("Send Enquiry", page scrolls 1394>844, no cover); overflowX=false, pastEdge=0 |
| 04 Unavailable | `/property/<bad>` | PASS — **HTTP 404** + `noindex` + honest copy (curl-verified; no soft-404) |
| 05/06/07 Project detail | `/project/[slug]` 1280 + 390 | PASS — header+footer, JSON-LD, enquire+report; mobile **sticky bottom-0** Contact/Enquiry bar; no overflow |
| 11/12/13 Broker profile | `/broker/[slug]` 1280 + 390 | PASS — header+footer, h1 "DEV TEST Realty", no overflow; **Claim CTA correctly absent** (claimed profile) |
| 14 Builder microsite | `/builder/[slug]` 1280 + 390 | PASS — header+footer, h1 "DEV TEST Builders", no overflow; Claim CTA absent |
| 17/18 Report modal | property (guest + logged-in) | PASS — dialog `aria-modal`, full 7-cat enum (not 5-sample), textarea; **logged-in submit → "Report submitted" + real `user_reports` row persisted** (test row deleted after via service-role by `description` marker) |
| 19 Fullscreen gallery | property | PASS (provider-gated §5.5) — honest "Photos not added yet", **no fake image/iframe** |
| 20 Comparison | `/compare` 1280 | PASS — header, honest empty/add state, no overflow |
| 16 Claim profile | broker+builder | **GATED DEFERRAL confirmed** — no fake/dead CTA anywhere (absent on all claimed profiles). See gap note. |

**Gates (fresh, preview_\* MCP):** VISUAL PASS · FUNCTIONAL PASS (guest + signed-in report persist + cleanup) · RESPONSIVE PASS (320/390/1280 all 0-overflow) · REGRESSION PASS (no T04 source changed; tree = green build; T01 shared-shell changes don't touch detail routes).

### T04-16 Claim — documented FUNCTIONALITY_GAP (§5.4 + §5.5), not a fake-control omission
Confirmed via code+schema inspection: **no** `unclaimed`/`is_claimed`/`profile_claims`/`rera_import` concept exists anywhere. The design CTA appears **only** on profiles "auto-created from RERA records and unclaimed", and the modal **requires** a mandatory proof-of-ownership **file upload** (RERA cert/GST doc).
Dependencies (both out of Batch 4 scope): (a) an unclaimed/RERA-imported profile data model + import pipeline → Builder/RERA (Batch 8) + admin verification queue (Batch 11); (b) file upload = **R2 provider-gated** (Prompt 12, unconfigured).
Building it now = an untestable, never-triggering CTA + a broken upload → a fake/dead control (prohibited). Correct outcome = honest deferral, **no control shipped** (verified absent on real profiles). To implement when deps exist: `profile_claims` table (claimant, target_profile_id, role_claimed, proof_media_id, status=pending) + claim-request action (status=pending, grants nothing until admin approval) + CTA/modal on unclaimed profiles.

## Update 2026-07-08 (e) — DESIGN-BASE REBUILD of Broker profile (Screen 4) & Builder microsite (Screen 5)
Continued the design-first rebuild for the residual T04 targets flagged in (d). Rendered the MGP DESIGN Screens 4 & 5, froze blueprints, then rebuilt both routes to match — real data + honest states only.

**Screen 4 Broker `/broker/[slug]` — blocks added:** avatar/name/**Verified**/role hero · **Contact broker** (auth-gated `ProfileContactButton` — guest→auth modal, logged-in→honest "enquire on a listing", **no phone in initial render, no fake reveal**) · **service-area chips** (derived from the broker's real listing localities) · **stat tiles** (Active listings = real count · Areas served · **"Soon — Reviews never faked"** honest tile) · Listed Properties grid/empty · **Report this profile** (`ReportModal targetType="user"` → real `user_reports`, entityNoun="profile").

**Screen 5 Builder `/builder/[slug]` — blocks added:** hero + company-type/cities subtitle · **Contact builder** (auth-gated) · **stat tiles** (Projects/Cities/RERA) · RERA note · **Active / Completed / About tabs** (`BuilderProjectTabs` — Active vs Completed split on real `construction_status`; About honest placeholder) · **Report this profile**.

**New code:** `components/profile/ProfileContactButton.tsx`, `components/profile/ProfileBlocks.tsx` (StatTiles, AreaChips), `components/profile/BuilderProjectTabs.tsx`; `ReportModal` widened to `targetType:"user"` + `entityNoun`; `construction_status` added to `PROJECT_COLUMNS`/`PublicProjectCard`.

**Fresh evidence (headless Chrome, live :3000):**
- Broker: Contact + stat tiles (real `0 Active / 0 Areas / Soon`) + Report-profile present; honest empty listings; full-page screenshot confirms Screen-4 top-to-bottom. **0 real page overflow** (320–1440; pageScrollX=0).
- Builder: Contact + stat tiles (`1 Projects / 1 Cities / RERA`) + RERA note + **tabs Active(1)/Completed(0)/About**; tab switch verified (click About → aria-selected + honest copy); screenshot confirms Screen-5. **0 real page overflow** (the narrow-width tab row is an intentional internal `overflow-x-auto` scroll per §15; pageScrollX=0 at 320).
- Report-profile modal wired to `user_reports` (target_type `user`, DB-checked allowed); guest→login prompt, no fake success.
- `tsc` **0** · `eslint` **0** · 0 pageerrors.

**Gates (Broker + Builder):** VISUAL **PASS** (match Screens 4/5 top-to-bottom) · FUNCTIONAL **PASS** (real data + honest states, tabs/contact/report wired, no dead controls) · RESPONSIVE **PASS** (0 real overflow) · REGRESSION **PASS** (tsc/eslint 0, no pageerrors, listing/project grids preserved).

## Update 2026-07-08 (d) — DESIGN-BASE REBUILD of Property & Project detail (this session)
Fresh **design-source-vs-route** comparison (rendered the actual MGP DESIGN bundle `batch 4 - Detail Pages (Standalone).html` headless and read its post-JS section structure) exposed that the prior "COMPLETE" was based on overflow checks, **not** top-to-bottom design fidelity. The property/project detail routes were **missing multiple MGP DESIGN Screen 1/2 sections** even though the backing data was already fetched. Rebuilt to match the design, real-data only:

**Design Screen 1 (Property) sections added** (design order): price-row **Share** control · **KeyFacts spec strip** (Bedrooms/Bathrooms/Area/Floor `n of m`/Furnishing/Facing/Parking/Possession — real `public_properties_view` fields, per-item hidden on null) · **Amenities** chips (real `amenities[]`) · **Location** with honest **"Map: Setup Required"** fallback + real address · **Similar properties** (`getSimilarProperties` — same city+purpose, real cards). Description/Enquiry/Save/Report preserved.

**Design Screen 2 (Project) sections added**: **Share** · **KeyFacts** (Possession/Status/Total units/Towers/Floors + Configurations) · **Available units** (real `unit_configurations` jsonb) · **Amenities** · **Video & 360° tour** honest provider-gated "Setup Required" (no fake embed) · **Location** fallback · **Similar projects** (`getSimilarProjects`). Builder link + RERA alert preserved.

**New code:** `src/components/detail/DetailSections.tsx` (KeyFacts, AmenitiesSection, LocationSection, AvailableUnits, MediaSetupState) · `src/components/detail/ShareButton.tsx` (Web Share API → clipboard fallback) · `getSimilarProperties`/`getSimilarProjects` in `public-search.ts`. Wired into `/property/[slug]` + `/project/[slug]`.

**Fresh evidence (headless Chrome / puppeteer-core, live :3000):**
- Property KeyFacts real values: `{Bedrooms:3 BHK, Bathrooms:2, Area:1,450 sq ft, Floor:7 of 12, Furnishing:Semi Furnished, Facing:East, Parking:Covered, Possession:Ready To Move}`; Amenities real labels; Location "Map: Setup Required" + real address "…Near Iscon Cross Road, Mavdi, Rajkot, 360004"; Similar → real card. Full-page screenshot confirms top-to-bottom design match.
- Project KeyFacts `{Possession:Jun 2027, Status:Under Construction, Total units:120, Towers:2}`; Available units real "2/3/4 BHK … from ₹45/62/85 L"; 360° "Tour provider not configured — no fake embed shown."
- Responsive: property+project × 9 widths (320–1440) = **0 overflow**.
- Regression: sticky mobile CTA intact, Report modal opens, Share handler runs, **0 console errors**; `tsc` 0 · `eslint` 0.
- Dev fixtures enriched (dev-only, §36) to exercise real-data rendering of the new sections.

**Gates (this rebuild):** VISUAL **PASS** (property/project now match design top-to-bottom) · FUNCTIONAL **PASS** (real data + honest fallbacks, no dead controls) · RESPONSIVE **PASS** (0 overflow) · REGRESSION **PASS** (tsc/eslint 0, no console errors, existing flows intact).

## Update 2026-07-08 (c) — FRESH re-verification (headless Chromium via puppeteer-core, this session)
Preview_* MCP and claude-in-chrome bridges were both unavailable this session (registered then dropped / no connected browser). Fell back to **system Chrome driven headless via puppeteer-core** against the live dev server (PID 14204, port 3000 — the actual repository checkpoint server). **No T04 source changed this pass** — pure fresh verification.

**HTTP status (live):** property/project/broker/builder/compare = **200**; bad slug = **404** (no soft-404).

**Runtime DOM chrome (curl of live routes):** property & project → `<header>`+`<footer>`, real `<h1>`, `sticky bottom-0` "Send Enquiry", "Report this listing" trigger, "Photos not added yet" honest gallery placeholder, JSON-LD, **no** noindex (indexable, correct). broker/builder → header+footer, real h1, JSON-LD, **no Claim CTA**. compare → header+footer, honest "Nothing to compare yet", noindex. unavailable → real 404 + `noindex,nofollow` + honest "This listing is not available right now" (header/footer present = navigable; still a hard 404, not a soft-404).

**Responsive (fresh):** 6 routes × 9 widths (320/360/390/430/768/1024/1280/1366/1440) = **54 computed-layout probes → OVERFLOW_FAILS=0** (documentElement scrollW==clientW and no element past viewport right edge at any width).

**Functional interactions (fresh, headless):**
- P1 property mobile (390): sticky CTA `position:sticky;bottom:0` = "Send Enquiry" + honest "Login required to send an enquiry or view contact"; docScroll 1418 > vh 800 → content scrolls, not covered.
- P2 report modal (guest): trigger → `[role=dialog aria-modal]` with honest login prompt ("Please log in to report this listing" / "Log in to report") — **no fake success**.
- P3 Claim CTA: **absent** on `/broker/dev-test-realty` and `/builder/dev-test-builders` (claimed profiles) — documented gated deferral, no dead/fake control shipped.
- P4 gallery: honest "Photos not added yet" placeholder, no fake image/iframe (provider-gated §5.5).
- P5 unavailable: HTTP **404** + `robots: noindex, nofollow` + honest copy.

**Engineering (fresh):** `tsc --noEmit` exit **0** · `eslint .` exit **0**.

**Gates (fresh 2026-07-08 (c)):** VISUAL **PASS** · FUNCTIONAL **PASS** · RESPONSIVE **PASS** (54/54 0-overflow) · REGRESSION **PASS** (no source changed; tsc+lint green). T04-16 Claim + T04-19 gallery remain documented gated deferrals per §5.4/§5.5 (verified: no fake control, honest placeholder).

## FINAL (updated 2026-07-08 (b))
All **buildable/reachable** T04 targets re-verified live with fresh preview_* evidence: **VISUAL PASS · FUNCTIONAL PASS · RESPONSIVE PASS · REGRESSION PASS**. Report GAP implemented + re-verified live (submit persists + cleaned up).
Two items remain **gated deferrals, tracked (not migration failures per §5.5)**: **T04-19** fullscreen gallery (provider-gated on R2 media; honest placeholder verified) and **T04-16** Claim profile (FUNCTIONALITY_GAP — depends on unclaimed-profile/RERA model [Batch 8/11] + R2 upload [provider]; no fake control shipped, verified absent).
→ **FINAL: COMPLETE for all buildable Batch-4 targets; T04-16 + T04-19 = documented gated deferrals** carried to their dependency batches. No migration blockers remain within Batch-4 buildable scope.
