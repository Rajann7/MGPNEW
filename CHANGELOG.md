# CHANGELOG.md

# My Gujarat Property — Changelog

This file tracks every completed change, update, implementation phase, documentation update, migration, verification result, rollback and important project decision for **My Gujarat Property**.

Claude must update this file after every phase and every major change.

No completed work should be undocumented.

No fake completion is allowed.

## 2026-07-14 — Phase 2 full manual verification + CRITICAL project-wizard fix
Drove the full Phase 2 matrix live (guest + builder + owner). Found and fixed one critical defect; verified the rest.
- **BUG-2026-07-14-01 (CRITICAL) — Project wizard was dead at Step 1.** `projects.project_type/category/purpose` were still NOT NULL (the Batch 5 draft-relaxation was applied to properties but never to projects), and `ProjectDraftSchema` required them, so the Step-1 draft save always failed ("Something went wrong") — Builders could not post any project. Fixed via migration `20260714120000_project_draft_classification_nullable.sql` (applied to live DB) + lenient `ProjectDraftSchema` / re-required `ProjectSubmitSchema` + `buildPayload` empty→undefined + action `?? null`. Live-retested: wizard now advances, draft persists with null project_type, RERA truth + validation correct.
- **Verified live (PASS):** guest privacy (no phone/email leak in server HTML for property/project/requirement); SEO (search+requirement noindex, details/profiles index+canonical+JSON-LD, sitemap excludes requirements, robots blocks private); tombstone + private-profile 404; wrong-role → Access Denied (not login dump); responsive no-page-overflow at 320/390/430/768/1024/1280 (property/search/project/home/compare); all three wizards advance step 1→2 with complete canonical option sets + autosave; property draft-resume card; Unit Inventory bulk mutation; Claim + Report submit + dup/rate-limit guards; gallery real images.
- Gates: `tsc --noEmit` PASS, eslint PASS, `npm run build` PASS.

## 2026-07-13 (session 2) — Phase 2 pending items closed (gallery real-images + search enum completeness)
Cleared the six remaining Phase 2 pending items.
- **Search "Type" lists rebuilt from canonical enums (BUG-2026-07-13-03).** `src/lib/search/config.ts` now generates `PROPERTY_TYPES` per tab from `PROPERTY_TYPES_BY_CATEGORY` / `PROJECT_TYPES` / `REQUIREMENT_CATEGORIES` (complete real set, not a hand-typed sample — CLAUDE.md "DESIGN LISTS ARE SAMPLES"). Values are canonical, so every option maps to a live column filter. Wired the previously-dead Requirements "Type" filter → now filters `category` in `public-search.ts`. Live: Buy tab shows all 9 residential types; `?type=flat_apartment` narrows 2→1 (Tenament excluded).
- **Public detail gallery wired to real images.** New `getPublicListingImages()` in `public-search.ts` resolves `media-public` Storage rows → public URLs via the existing `media_public_read` RLS (guest-safe, images only, cover first). `DetailGallery` + `FullscreenGallery` render real `<img>` (draggable=false) with the honest placeholder retained for no-media listings; property + project pages pass images. Dev fixture: 4 real stock photos seeded for property `a61d686c…` (path-tagged `dev-fixture-*`). Live-verified across mobile carousel / fullscreen overlay / desktop grid; guest RLS read OK; contact still masked; no console errors.
- Audits (all LIVE-driven as testbuilder via real OTP widget): project detail (tabs/RERA/stepper/honest fallbacks); Unit Inventory (bulk A-101 Available→Booked persisted, reverted); Claim (submit + dup guard); Report rate-limit (submit + duplicate-report block). Test claim/report rows deleted after. **All six pending items = live-verified PASS.**
- Gates: `tsc --noEmit` PASS, eslint (changed files) PASS, `npm run build` PASS. No migration needed.

## 2026-07-13 — Phase 2 audit — search type filters fixed + public experience verified
Functional/security/responsive sweep of the whole public experience. Route sweep (all public routes as guest): 200s, no crashes/error-boundaries, **no contact-number or secret leaks**, correct 404s, owner-profile privacy-404 intentional. Verified live: property detail (contact masked, reveal gives honest self/login notes, self-enquiry server-blocked), owner public profile (privacy-gated + positive render), Compare (add→tray→localStorage persistence→/compare render, noindex), 9-step Post-Property wizard (draft-resume card with real Gujarati draft "7 of 9 steps", step rail, sticky Back/Save Draft/Continue, honest maps-Phase-11 fallback), Requirement Detail (4 audience states).
- **Defect fixed (High):** property + project **type filters were completely dead** (UI vocabulary ≠ canonical enum). Added `normalizePropertyType()` + `PROJECT_TYPE_FILTER` in `src/lib/actions/public-search.ts`. Retested: `type=flat`→1, `type=plot`→0, `residential-project`→2. See BUG-2026-07-13-02.
- Gates: typecheck PASS, lint PASS, production build PASS.
- **Phase 2 status: PARTIAL (advanced)** — public browse/search/detail/compare/requirement/wizard-shell verified + 2 real bugs fixed; deep 1:1 audit of project-detail internals, unit inventory (E), claim (M), fullscreen gallery (O, no-media fixture) still pending.

## 2026-07-13 — Phase 2 (Public Experience) — B4-S03 Requirement Detail: BUILT + verified (gap-close)
Discovery showed Phase 2 is ~90% already implemented in prior sessions (home, search, property/project detail, all 3 wizards, unit inventory, compare, gallery, report, claim, broker/builder/owner public profiles). The one genuine missing screen — the public **Requirement Detail (B4-S03)** — was built and live-verified.
- New route `src/app/requirement/[slug]/page.tsx`; server action `getRequirementDetail` in `src/lib/actions/requirements.ts`; client `src/components/proposals/RequirementProposePanel.tsx`; `RequirementResultCard` now links to it (Search→Detail).
- **Locked audience rule enforced** (CLAUDE.md §3A conflict #1 + `requirements_verified_pro_read` RLS): full view (description, exact localities, masked requester, Send Proposal) only for verified brokers/builders + owner-of-record; everyone else gets a locked login teaser (city-only, no description/requester). `robots: noindex,nofollow`; already excluded from sitemap.
- Live-verified all 4 audience states: guest teaser, verified-broker full view + working proposal submit + duplicate-block ("already have an active proposal"), owner-of-record self-notice (no self-proposal). No console errors; no overflow at 360/1280.
- Gates: typecheck PASS, lint PASS (0 errors), production build PASS (`/requirement/[slug]` registered).
- Dev fixtures (flagged, dev-only): one published requirement owned by test owner; test **broker set verification_status=verified** to exercise the eligible audience.
- **Phase 2 status: IN_PROGRESS** — B4-S03 done; the ~15 pre-existing screens still need per-screen 1:1 design + wiring audit against the 5 authority files before a Phase 2 PASS.

## 2026-07-13 — Phase 1 (Shared Foundations) manual verification: PASS
Independently verified the Phase 1 shared-foundations implementation against the running app, live DB and all five authority files. Evidence: migration `20260713150000_phase1_shared_foundations.sql` applied (22 locations, 13 provider_configs with honest statuses, notification_deliveries + background_jobs); anon RLS denies `provider_configs`/`background_jobs`/`notification_deliveries`/`profiles`; two-user cross-RLS shows no leak (leads/notifications/threads/contact_requests filter per participant, `profiles` select returns caller's own row only, service-only tables deny authenticated users); all 5 shells (Public/Owner/Broker/Builder/Admin) render live with correct locked nav and no horizontal overflow across 320–1440; overlay foundation (login sheet + admin drawer) enforces scroll-lock/Escape/focus-restoration; open-redirect blocked on both proxy and `isSafeRedirectUrl`.
- **Defect found & fixed:** admin mobile drawer (pure-CSS Server Component) had no Escape-close/scroll-lock/focus-restore. Added `src/components/layout/AdminDrawerBehavior.tsx` (client enhancer) and mounted it in `src/components/layout/AdminMobileDrawer.tsx`. Retested live — Escape closes, body scroll locks while open, focus restores to the trigger.
- Gates after fix: typecheck PASS, lint PASS (0 errors), production build PASS.

## 2026-07-08 — Design migration T01 (Batch 1) FINAL: COMPLETE (authenticated shells verified)
Closed the T01 UNVERIFIED-AUTH gap by logging in live (owner mobile-OTP + super-admin) and re-rendering the authenticated design-system shells. Two locked-design defects found & fixed:
- **3E dashboard mobile bottom nav** rebuilt to the locked 5-item bar **Home · Search · Post (raised center FAB) · Leads · Profile** (was a 4-item slice of the sidebar). Files: `src/components/dashboard/DashboardMobileTabBar.tsx`, `src/components/dashboard/navConfig.ts`.
- **3F admin mobile** — removed the design-forbidden bottom nav from `AdminShell`; added a contextual-header hamburger + slide-in drawer (`src/components/layout/AdminMobileDrawer.tsx`, `AdminTopbar.tsx`, `AdminShell.tsx`); removed dead `getAdminMobileTabs` from `src/lib/admin/navConfig.ts` and its prop from 17 `src/app/admin/**` pages.
Gates: VISUAL/FUNCTIONAL/RESPONSIVE/REGRESSION = PASS (tsc/eslint/build all exit 0). Evidence: `docs/design-migration/verification/T01_VERIFY.md`.

---

## 1. Purpose

This changelog exists to keep a clear, honest and chronological record of:

* documentation changes
* code changes
* UI changes
* backend changes
* database changes
* SQL migration changes
* RLS policy changes
* storage/bucket policy changes
* provider/API configuration changes
* billing/payment changes
* security changes
* performance changes
* deployment changes
* rollback changes
* manual verification results
* bug fixes
* blocked/partial work
* pending issues
* user-approved decisions
* conflict resolutions
* feature flag changes
* setup-required provider states

This file helps two Claude accounts continue the project without depending on chat history.

---

## 2. Mandatory Update Rule

Claude must update `CHANGELOG.md` when any of these happen:

1. New documentation file is created.
2. Existing documentation file is updated.
3. Any app code is created or changed.
4. Any route is created, removed, renamed or changed.
5. Any UI component is created or changed.
6. Any dashboard module is created or changed.
7. Any admin/staff module is created or changed.
8. Any database table is created or changed.
9. Any column is created, renamed, changed or removed.
10. Any enum is created or changed.
11. Any index is created or changed.
12. Any trigger/function is created or changed.
13. Any RLS policy is created or changed.
14. Any SQL migration is created or changed.
15. Any seed/setup file is created or changed.
16. Any storage bucket policy is created or changed.
17. Any provider/API status changes.
18. Any `.env.example` value is added, changed or removed.
19. Any feature is enabled, disabled or moved behind a feature flag.
20. Any incomplete feature is marked `SETUP_REQUIRED`, `PARTIAL`, `BLOCKED` or `DEFERRED_TRACKED`.
21. Any test is run.
22. Any test cannot be run.
23. Any manual verification is completed or blocked.
24. Any bug is fixed.
25. Any workaround is added or removed.
26. Any rollback happens.
27. Any deployment happens.
28. Any production-readiness status changes.
29. Any user-approved high-risk change happens.
30. Any conflict between docs/code/rules is found and resolved.

---

## 3. Strict No-Fake-Done Rule

Do not write that something is done unless it is actually done.

Claude must not write vague changelog entries like:

* “updated everything”
* “fixed all issues”
* “completed website”
* “all good”
* “done”
* “tested”
* “working”
* “passed”

unless the entry includes exact details.

Every changelog entry must say:

* what changed
* where it changed
* which files changed
* whether SQL/migration changed
* whether tests were run
* whether manual verification was done
* what the verification result is
* what is still pending
* what is blocked
* whether any security/RLS impact exists
* whether rollback is required or available

---

## PHASE ENTRIES

---

### [2026-07-04] Design Migration — T01 full 50-target audit (2nd fix: 1024 header overflow)

Fresh target-by-target audit of all 50 T01 design-system/shared targets against Batch 1, with a live DOM overflow/clip detector across the responsive matrix (320/360/390/768/1024/1280/1440 on `/`; 390/1280 on `/search`; per-`select` clip check). **Found + fixed a real defect:** the corrected Inter font (wider than the prior system fallback) tipped `PublicHeaderClient` over at exactly **1024px** (nav+search+auth overflow, search box collapsed) → nav breakpoint `lg`→`xl` (design desktop = 1280). Re-verified: 1024 clean, 1280/1440 nav-shown no overflow; all search selects/dropdowns `clip:false` (no text clipping); only intentional header placeholder `truncate` remains. `eslint`/`build` 40/40. Authenticated shells (dashboard 3C/3D/3E, admin 3F, auth-only overlays, wizard shells) = UNVERIFIED-AUTH (inherit same global tokens; OTP login automation blocked). T01 gates VISUAL/FUNCTIONAL/RESPONSIVE/REGRESSION = PASS (public+build); FINAL: NOT COMPLETE (authenticated-shell live checks outstanding). Evidence: `docs/design-migration/verification/T01_VERIFY.md`.

### [2026-07-04] Design Migration — T01 / Batch 1 (Design System) fresh rebuild

Fresh token audit against the actual Batch 1 source (decoded): brand `#0F6B5C` / hover `#0C5648` / soft `#E7F2EF`, radius 10/16/full, zinc neutrals, and semantics all already match. **Only gap = font.** Fixed: `src/app/layout.tsx` loads **Inter** (400/500/600/700) into `--font-geist-sans` (was Geist); `src/app/globals.css` `body` now uses `var(--font-geist-sans)` first (a hardcoded system stack had been overriding the loaded font entirely). **Fresh runtime evidence:** computed body+h1 font = Inter on `/` and `/search`; Inter in `document.fonts`; no overflow at 320px; `eslint`/`tsc` clean; `npm run build` 40/40. **BUG-20260704-UI-002 (font) CLOSED.** Auth-consumer live re-render = UNVERIFIED-AUTH (global root token, provably applied). T01 gates VISUAL/FUNCTIONAL/RESPONSIVE/REGRESSION = PASS (public+build scope); FINAL: NOT COMPLETE (one UNVERIFIED-AUTH check). Tooling note: a corrupted Turbopack dev cache (from `rm -rf .next/dev` on a live server) was cleared + dev restarted; prod build unaffected. Tracking synced (contract, manifest, verification, brain, BUGS). **Next batch = T02 (Auth) — not started (session scoped to T01).**

---

### [2026-07-04] Design Migration — tracking-consistency repair + T03-17 Save Search prompt

**Tracking repair (no code reverted):** added exact `docs/design-migration/TARGET_REGISTRY.md` (405 one-record-per-target rows: RS=207/RV=55/UI_STATE=48/MODAL=35/WZ=10/DSR=50); replaced SCREEN_MANIFEST approximate totals with exact + linked the registry; removed stale T07-11 references from Batch-7 GAP summary / OPEN GAPS / Next; set T07-11 gates to VISUAL/FUNCTIONAL/RESPONSIVE = UNVERIFIED-AUTH, REGRESSION = PASS, FINAL = NOT COMPLETE (T07-11 code preserved); completed CHROME_MATRIX for Batch 17 (resolved "audit pending"). Recomputed implementation order strictly from T01.

**First incomplete canonical target (strict order) = T03-17 · Save Search prompt** — implemented `src/components/search/SaveSearchButton.tsx` mounted in the `/search` results toolbar; reuses existing `saveSearch()` → `saved_searches` (RLS-scoped); guest → auth modal (login intent, **no fake save**); signed-in → name + honest email-alert toggle. **Guest runtime VERIFIED** (button renders on public `/search`; click → auth modal; 320px no overflow). `eslint`/`tsc`/`build` PASS (40/40). Signed-in save persistence = UNVERIFIED-AUTH (OTP automation blocked) → FINAL: NOT COMPLETE. Contract + verification in `docs/design-migration/`. **Next target = T04-16 claim-profile modal.**

---

### [2026-07-04] Design Migration — Phase-1 inventory CLOSED + T07-11 Broker/Builder CRM Kanban implemented

**Authoritative process:** `MGP_FULL_DESIGN_MIGRATION_MASTER.md` (legacy phase prompts no longer the visual authority). New tracking under `docs/design-migration/`.

**Phase-1 inventory (CLOSED):** decoded all 17 MGP DESIGN bundles into a non-destructive workspace; deterministically extracted **405 design targets** (h2/h3/frame-caption labels) across every batch; classified each (RS/RV/ST/MD/WZ/SC/DSR/RO/INH) and mapped to real routes/components. `DESIGN_SOURCE_INDEX.md`, `BASELINE_STATUS.md`, full target-level `SCREEN_MANIFEST.md`, `CHROME_MATRIX.md` created. **`TOTAL_UNMAPPED_TARGETS = 0`.** Roll-up: batches 1–9 largely implemented (public surfaces runtime-verified this session); open GAPs enumerated (Kanban, ad-wallet/seats, notif-matrix, account-deletion, admin 11–15, PWA 17, etc.).

**First GAP target implemented — T07-11 Broker CRM Kanban** (also builder leads): new `src/components/leads/LeadKanbanBoard.tsx` — desktop-only (`lg+`) pipeline board over the full real `CrmStage` enum; native HTML5 drag/drop → optimistic move → existing receiver-only `updateLeadStage` (persists + logs) → `router.refresh()`; **revert + error banner on failure**; mobile keeps `LeadListClient` (design: Kanban desktop-only). Wired into `/dashboard/broker/leads` + `/dashboard/builder/leads`.

**Checks:** `eslint`/`tsc` clean · `npm run build` PASS (40/40) · guest `/dashboard/{broker,builder}/leads` → 307 (guards intact). **Authenticated runtime (live drag persistence/RLS) = UNVERIFIED-AUTH** (OTP login automation unavailable) → per master §16 target is **FINAL: NOT COMPLETE** (implementation done + code/build/guard-verified; live-auth evidence pending). Contract + verification recorded in `docs/design-migration/`. No fake PASS.

---

### [2026-07-04] Prompt 06 — Owner/Broker/Builder Dashboards — Status `PARTIAL` (core DONE, named design add-ons pending)

Verified the dashboard layer against Batches 6/7/8 design add-ons. **Core is built & safe** (42 role-gated pages; `DashboardShellV2` shell + bottom nav + drawer + stat cards + list cards + verification panel; honest placeholders for provider-gated modules; eslint/tsc clean, build 40/40). **Honestly NOT done (design-match gap):** (1) Broker CRM **Kanban** board (leads page is a list, not the desktop Kanban); (2) Builder **ad-wallet** meter (ads is a "Coming Soon" placeholder); (3) **seats** meter, (4) per-channel **notification matrix**, (5) **account-deletion double-guard**, (6) **"For client"** broker requirements. These are large modules on already-verified dashboards (Prompts 07–09 depend on them) → to be ported **incrementally, one at a time, verified** per CLAUDE.md §38. No fake PASS. Docs: brain + CHANGELOG + MANUAL_VERIFICATION updated. **Result: PARTIAL** — Prompt 07 should not start until these land or the owner accepts PARTIAL.

---

### [2026-07-04] Prompt 05 Re-corroboration — Public Search / Detail / Profiles / SEO — Status `PASS` (already implemented & verified 2026-07-01)

Prompt 05 was already fully implemented and verified PASS on 2026-07-01 (search + filters/sort/pagination, property/project detail, broker/builder profiles, sitemap/robots, SEO metadata/canonical/noindex, public-safe views, no hidden-contact/fake-data). Re-checked this session against the design add-ons: **compare tray**, **unavailable-listing variant** (real 404+noindex, no soft-404), **auth-gated masked contact reveal**, **gallery per-photo caption** (honest placeholder), **requirement scoped/masked** (card-only, no public detail page) — all present. `eslint`+`tsc` clean; build green (40/40 this session). Verified against the Batch 3/4 design add-ons. **Fix applied:** closed the transliteration/typo-search gap — added `expandSearchTerms()` in `src/lib/search/config.ts` (Gujarat city alias/typo map) and wired it into `src/lib/actions/public-search.ts` for both property + project `q` queries via a sanitized PostgREST `.or()` ilike across title/name + city + locality. Live-probed: `q=amdavad` now matches Ahmedabad listings (was 0), nonsense/`baroda` still return 0 (no fake results). `eslint`/`tsc`/`build` PASS (40/40). Changed files: `src/lib/search/config.ts`, `src/lib/actions/public-search.ts`. All other Prompt-05 add-ons already present (compare tray, unavailable variant, masked contact, gallery caption, requirement scoped). Docs: MANUAL_VERIFICATION + CHANGELOG + brain + BUGS updated. **Result PASS · Prompt 06 can start.**

---

### [2026-07-04] Prompt 04 Design-Match — Post Property wizard 6 → 9 steps — Status `DONE` (increment 1 of wizard port)

**Context:** Prompt 04's core (schema/RLS/actions/validators/permissions/statuses/public-safe views/dashboard mgmt) was already built & verified (Prompts 01–08 depend on it). The locked rules **Requirements-need-approval (Pending)** and **On-Hold 4th unit status** were already satisfied in code. Remaining work = the design-match wizard port. User approved "port wizards one at a time, verified" — this is **increment 1: Post Property**.

**Changed:** `src/components/forms/PropertyForm.tsx` — rebuilt from 6 steps to the design's **9 steps** (Basics · Type & Purpose · Price & Area · Location · Amenities · Media · Contact · Preview · Submitted, per `docs/06` + MGP DESIGN Batch 5 · 5A). Added the **"Preview — not yet live" frame** with per-block **Edit** links (jump back to the relevant step), plus `map_visibility` and `address_line` inputs (both already in the payload/schema, previously uncollected). **Backend contract preserved exactly** — `buildPayload()`, `createPropertyDraft`/`updatePropertyDraft`/`submitPropertyForApproval` unchanged, so downstream Prompts 05–09 are unaffected. Sticky footer stays Back · Save Draft · Continue → Submit.

**Checks:** `eslint` PASS · `tsc --noEmit` PASS · `npm run build` PASS (40/40 pages; `owner|broker/properties/new` compile).

**Not done this increment (tracked):** Project wizard 5 → 10 (RERA gate + live format mask), Requirement 4 → 7 steps, and detail add-ons (override base price, featured-slot chip, unavailable-listing variant). Live interactive preview of the wizard is auth-gated (protected route; split-OTP login not harness-automatable) — verified via build instead.

### [2026-07-04] Prompt 04 Verification (re-run) — RESULT `PASS`

Ran `prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md` in full. Reconciled that **all three wizards are now at design step counts** — Property **9** (rebuilt this session), Project **10** (Type & RERA gate + live `PR/GJ/CITY/YYYY/NNNNN` mask + honest no-fake-RERA copy), Requirement **7** — and **On-Hold** unit status + **requirements Pending-before-public** hold. Verified: 9 migrations; RLS enabled on all 6 entity tables; role-gated inserts (builder-only project; owner/broker property+requirement; guest denied); can't self-approve/publish; public views exclude contact/admin-notes/full-address; route guards → 307 for guests. `eslint`/`tsc`/`build` PASS (40/40). Runtime RLS was live-probed in the prior same-day PASS entry (guest=0 requirement rows, verified-broker=1, anon insert denied). No new bugs. Docs updated: MANUAL_VERIFICATION, FEATURE_REGISTRY, CHANGELOG, brain. **Prompt 05 can start.**

---

### [2026-07-04] Prompt 05 — Search page true 1:1 (Batch 3 Screen 2) + STRICT 1:1 rule

**Category:** SEARCH / PUBLIC_UI / DESIGN · **Status:** DONE
- Search screen no longer uses the global mega-menu header or site footer (design 2A/2B has neither). New SearchShellHeader: desktop condensed header, mobile contextual back-header. Secondary filter bar (scope pills + chips + More filters + List/Map toggle) directly below. 280px sidebar + results.
- Added STRICT 1:1 SCREEN RULE to CLAUDE.md §3A (per-screen top-to-bottom; only the design screen's chrome; partial = FAIL).
- Files: src/app/search/page.tsx, SearchResultsClient.tsx, SearchShellHeader.tsx (new), CLAUDE.md.
- Live: desktop 1280 + mobile 390 → no mega-menu, no footer, no overflow, condensed/contextual header + filter bar + sidebar. lint CLEAN · tsc 0 · build 40/40.

---

### [2026-07-04] Prompt 05 — Search map view + missing-location capture (Batch 3 §4/§5)

**Category:** SEARCH / PUBLIC_UI / DB · **Status:** DONE
- Map/List toggle + honest "Map is not available yet" fallback split (no fake map/pins; real map = Prompt 10/12). Back-to-list recovery.
- Missing-location "Request this location" modal (desktop dialog + mobile sheet) → REAL capture: NEW table location_requests (migration 20260704140000, applied) + requestLocation action (email/mobile validation). RLS: public INSERT, no public SELECT.
- Files: SearchResultsClient.tsx, SearchEmptyState.tsx, RequestLocationModal.tsx (new), lib/actions/location-request.ts (new), migration.
- Live-verified: desktop map split honest fallback (2 real cards); empty → modal → submit → DB row persisted; anon read DENIED; 390px no overflow. lint CLEAN · tsc 0 · build 40/40.
- Next: prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md

---

### [2026-07-04] Prompt 05 — Compare tray + gallery captions (design add-ons)

**Category:** SEARCH / PUBLIC_UI · **Status:** DONE
- NEW compare feature: CompareProvider (localStorage, cap 4) + CompareButton (on result cards, stopPropagation) + sticky CompareTray + /compare side-by-side table (public-safe summary fields only, noindex). Mounted in PublicLayout.
- DetailGallery: honest per-photo caption bar ("1 / N · caption coming soon") — no fabricated photos/captions (real media = Prompt 10).
- Requirement search gated to verified brokers/builders (app-layer + RLS).
- Files: src/components/compare/*, src/app/compare/page.tsx, PublicLayout.tsx, Property/ProjectResultCard.tsx, DetailGallery.tsx, public-search.ts.
- Live-verified: add 2 → tray "Compare 2" (no card nav) → /compare 2-col table, no overflow. lint CLEAN · tsc 0 · build 40/40.
- Next: prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md

---

### [2026-07-04] Prompt 05 — Requirement search audience gate hardened (design pass)

**Category:** SEARCH / RLS / SECURITY · **Status:** DONE (foundation) / PARTIAL (full Batch 3/4 design-port)
- searchPublicListings now gates `public_requirements_view` to authenticated **verified broker/builder** only (app-layer defense-in-depth over the security_invoker RLS from migration 20260704120000). Guests/owners/unverified get 0 requirement results.
- Verified live: guest /search → 2 real property cards, 0 requirement cards, no overflow, SEO title present. lint/tsc/build PASS (39/39).
- Prompt-05 search/detail/profile/sitemap/robots foundation (built + PASS 2026-07-01) intact. Remaining design add-ons PARTIAL: compare tray, gallery per-photo caption, masked-until-proposal reveal UI.
- Changed: src/lib/actions/public-search.ts. Docs: brain.md, SECURITY_RLS_CHECKLIST.md, CHANGELOG.md.
- Next: prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md

---

### [2026-07-04] Design Sync — "for header sidebar mobile" wireframe: Header + Footer + Home (all devices) — Status `PASS` (build + live browser preview verified)

**Category:** `PUBLIC_UI` / `HOMEPAGE` / `HEADER` / `FOOTER`
**Source design:** `C:\Users\RAJAN\Documents\MGP DESIGN\for header sidebar mobile\export-src.html`
**User decisions (AskUserQuestion):** match this design's header exactly (nav + mega + bell + dark Login/Register); keep locked brand token `#0F6B5C`; full home rebuild.

#### Summary
Rebuilt the public header, footer and home sections to match the finished "for header sidebar mobile" wireframe, responsive across all widths, keeping all backend wiring (auth modal, CitySelector, real `/search` routing, real featured data). Header gained a primary nav (Buy · Rent · Projects · Cities · For Owners & Brokers) with a `lg+` mega menu, a notification bell shown only to signed-in users (no dead bell for guests), and a single dark `Login / Register` button. Footer restyled to graphite `#1C1C1E` (Explore/Company/Legal). Home: hero copy → "Find your place in Gujarat." on a clean surface; category tiles now carry descriptions; featured projects use the dark card variant; role band is dark-green `#0E3B2E` with per-role CTAs; how-it-works is 3 numbered cards; trust is a split panel with a 2×2 feature grid. No fake data/badges introduced. `CLAUDE.md §40` annotated with the approved design override.

#### Changed Files
- `src/components/layout/PublicHeaderClient.tsx` — rebuilt (nav + mega menu + bell + dark auth; nav `lg+`, city/search/auth `md+`, mobile header `<md`).
- `src/components/layout/PublicFooter.tsx` — restyled to `#1C1C1E`, Explore/Company/Legal columns.
- `src/components/public/HomeHeroSearch.tsx` — headline/subtitle/background to design.
- `src/components/public/HomeCategoryTiles.tsx` — 5 tiles with descriptions.
- `src/components/public/HomeFeaturedProjects.tsx` — dark project cards.
- `src/components/public/HomeRoleCards.tsx` — dark-green role band + design copy.
- `src/components/public/HomeHowItWorks.tsx` — 3 numbered cards.
- `src/components/public/HomeTrust.tsx` — split trust panel (2×2 features).
- `CLAUDE.md` — §40 design-override note.

#### Follow-up (same day, user request)
- **Mobile header:** city selector moved **under the brand name** as a green "All Gujarat / Ahmedabad ⌄" trigger (matches the provided image). Added a `variant="inline"` to `src/components/public/CitySelector.tsx` (pill unchanged elsewhere).
- **Mobile drawer:** replaced with the canonical **MGP DESIGN Batch 1 · 3B** left-side drawer (not the "for header sidebar mobile" variant): Menu + close; Buy (active) · Rent · Projects · Cities with icons; "Are you an Owner, Broker or Builder?" promo + "Post property free"; Login/Register (guest) or Dashboard/Notifications/Profile/Logout (signed-in); About · Terms · Privacy · RERA Info footer links (real routes).
- Verified in live preview at 390 & 320: header city-under-brand renders, drawer matches design, no horizontal overflow, no console errors.

#### Verification
- `npm run typecheck` → clean (only transient `.next/dev/types/routes.d.ts` noise while the dev server regenerates it; no `src/` errors). `eslint` (changed files) → clean. Homepage SSR `GET /` → 200, all sections present, no server errors in dev log.

#### Prompt 03 formal manual verification [2026-07-04] — RESULT: PARTIAL
Ran `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md` in full. Clean `npm run build` + lint + typecheck all PASS. Route smoke: `/`,`/search`,`/pricing`,`/support`,`/legal/*` → 200; `/dashboard`,`/admin` → 307 (protected); `/admin/login` → 200 (noindex, unlinked). Live responsive 320/360/390/430/768/1024/1366 → no horizontal scroll at any width; mega menu (lg+), mobile drawer, city-under-brand all verified; no console errors; auth modal opens with Terms+Privacy consent (real OTP, no fake login). **Found & fixed** BUG-20260704-UI-001 (fake unconditional "Verified" badge on featured property cards). **Open (low):** BUG-20260704-UI-002 (global font Geist vs locked Inter). Logged-in role header = code-verified PARTIAL (split-OTP widget not automatable by the harness; guest state fully live-verified). No critical/security/blocking issue → **Prompt 04 can start.** Docs updated: MANUAL_VERIFICATION, BUGS_AND_FIXES, SECURITY_RLS_CHECKLIST, PERFORMANCE_CHECKLIST, DEPLOYMENT_ROLLBACK, FEATURE_REGISTRY, brain.md.
- **Live browser preview (user authorized freeing port 3000):** desktop 1366 → full header with primary nav; **mega menu opens on hover** (4 columns: Property types · Popular localities · Popular cities · green Quick-links card); no horizontal overflow (scrollW 1351 ≤ 1366). Mobile 390 → app header (hamburger · brand · city pill · dark Login), **drawer opens** with nav + Login/Register (scroll-locked backdrop); footer graphite `#1C1C1E` w/ Explore/Company/Legal. **320px → no horizontal overflow, brand name truncates (no wrap).** No console errors. Screenshots captured at 1366/390/320.

---

### [2026-07-04] Prompt 03 — Public UI: Home, Header, Footer, Hero (Batch 3 true-port) — Status `DONE` (manual verification pending)

**Category:** `PUBLIC_UI` / `HOMEPAGE` / `HEADER` / `FOOTER` / `SEO`
**Prompt:** `prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md` — Batch 3 (home/search) + Batch 1 tokens.

#### Summary
Rebuilt the homepage 1:1 from the finished Batch 3 design markup (REPLACE, not restyle): teal→grey hero with tabbed search card + transliteration-tolerant city autosuggest, "Browse by category" tiles, Featured properties/projects (REAL data + honest empty/placeholder states), teal "List with us" role band, "How it works" 3-step, "Why My Gujarat Property" trust, and the dark Batch 3 footer. Existing 3-zone role-aware header + CitySelector PRESERVED (Prompt 03 §5). No fake data — featured cards are real public-view rows; RERA/Verified chips only when genuinely set; missing media = "photo coming soon"; no listings = honest empty state. Search routes to `/search` with real params.

#### Changed / New Files
- `src/app/page.tsx` — compose new homepage; fetch real featured data + profile.
- `src/components/public/HomeHeroSearch.tsx` — rewritten to Batch 3 hero (real routing + autosuggest).
- `src/components/public/HomeCategoryTiles.tsx` (NEW), `HomeFeaturedProperties.tsx` (NEW), `HomeFeaturedProjects.tsx` (NEW), `HomeTrust.tsx` (NEW).
- `src/components/public/HomeRoleCards.tsx` — rewritten to teal role band (auth-aware CTAs).
- `src/components/public/HomeHowItWorks.tsx` — rewritten to 3-step design.
- `src/components/layout/PublicFooter.tsx` — rewritten to dark Batch 3 footer (all links real routes).
- `src/lib/home/featured.ts` (NEW) — bounded real featured-data query (server-only).
- Removed orphan `src/components/public/HomeDisclaimer.tsx` (disclaimer now in footer per design).

#### SQL / Migration Files
- None (UI-only phase).

#### Security / Privacy Impact
- No public admin link; no `href="#"`; no hidden contact (public views exclude contact); no service-role/secret in client. Role-band CTAs open auth popup (guest) or route to own dashboard (no cross-role posting).

#### Provider / API Impact
- None new. Media (property/project photos) = SETUP_REQUIRED (R2, Prompt 10) → honest "photo/render coming soon" placeholders. Location = static city list (full hierarchy Prompt 11).

#### Tests / Checks
- `npm run lint` PASS · `npx tsc --noEmit` PASS · `npm run build` PASS (39/39; `/` dynamic ƒ).
- Live: homepage renders all sections with real data; guest header = Login/Register, logged-in = Dashboard+avatar (Login/Register hidden); hero Search → `/search?purpose=buy&q=2bhk`; footer dark #18181b; role band teal #0F6B5C; no console errors; no `href="#"`; no admin link. Responsive: 1280px no overflow (1265<1280); 320px no overflow, brand does not wrap.

#### Verification Result: `DONE` (manual verification pending)

#### Docs Updated
- `CHANGELOG.md`, `MANUAL_VERIFICATION.md`, `FEATURE_REGISTRY.md`, `brain.md`, `API_PROVIDER_STATUS.md`, `DEPLOYMENT_ROLLBACK.md`, `SECURITY_RLS_CHECKLIST.md`, `PERFORMANCE_CHECKLIST.md`.

#### Pending / Deferred
- Recently-viewed strip (logged-in only) omitted this phase — data wiring deferred to Prompt 05 (design says logged-out sees it removed, so no empty shell; honest to omit until real history is wired).
- Header mega-menu (Batch 1 category dropdowns) not added — existing 3-zone header preserved per §5; mega-menu tracked as a Batch-1 add-on.

#### Next Phase
- `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`

---

### [2026-07-04] Prompt 02 — Batch 2 auth screens 12–16 ported (design-match fix) — `DONE` / Verification `PASS`

**Category:** `AUTH` / `ADMIN_STAFF` / `PUBLIC_UI` / `ROUTING`
**Prompt:** design-1:1 alignment of Batch 2 (closes BUG-20260704-AUTH-DESIGN-001)

#### Summary
Ported the remaining finished-design Batch 2 auth screens (12 suspended, 13 personalized success, 14–15 graphite staff portal + attempt-counter/lockout, 16 staff invite acceptance) 1:1 from the design markup, keeping backend wiring. Two bugs found + fixed during the port (proxy blocked `/admin/invite`; invite-accept seeded 0 permissions). Full Prompt 02 re-verified live → PASS.

#### Changed / New Files
- `src/app/admin/login/page.tsx` — rebuilt to graphite "MGP Staff Portal" (screens 14–15): eye toggle, Forgot password? + Continue with Google (honest SETUP_REQUIRED), attempt counter + Account-locked state, `noindex`, invited banner.
- `src/components/auth/AuthModal.tsx`, `MobileOtpForm.tsx`, `RegisterRoleForm.tsx`, `src/lib/auth/actions.ts` — personalized success "You're in, {firstName}" (firstName now returned by login/register actions).
- `src/components/auth/SuspendedState.tsx` (NEW) + `src/app/unauthorized/page.tsx` — screen-12 suspended terminal.
- `src/lib/actions/staff-invite.ts` (NEW), `src/lib/admin/role-presets.ts` (NEW), `src/app/admin/invite/{page,layout}.tsx` (NEW) — screen-16 token invite acceptance (create active staff + seeded permissions, single-use).
- `src/proxy.ts` — allow `/admin/invite` pre-auth (token re-validated server-side).

#### SQL / Migration Files
- None (uses existing `staff_invites`, `staff_profiles`, `staff_permissions` from `20260630120000`).

#### Security / Privacy Impact
- `/admin/invite` reachable without a session by design; authorization = valid, unexpired, single-use token re-checked in `acceptStaffInvite`. No other `/admin/*` loosened. No secrets/tokens exposed (token only in URL, stored hashed). Forgot-password/Google are honest SETUP_REQUIRED (no fake success).

#### Tests / Checks
- `npm run lint` PASS · `npx tsc --noEmit` PASS · `npm run build` PASS (39/39).
- Live: staff portal graphite + attempt-counter→lockout; suspended; "You're in, Test"→/dashboard/owner; invite screen-16 with real data → accept → active verification_manager + seeded perms → staff sign-in. 320px no overflow on all new screens. Test data/scripts cleaned.

#### Verification Result: `PASS`

#### Docs Updated
- `MANUAL_VERIFICATION.md`, `BUGS_AND_FIXES.md` (DESIGN-001 RESOLVED + 002/003), `brain.md`, `CHANGELOG.md`.

#### Next Phase
- `prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`

---

### [2026-06-30] Prompt 04 — Property, Project, Requirement System

**Prompt:** `prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`
**Status:** `PASS` — Implementation done, all checks pass, migration applied, live browser verified

#### Summary

Implemented full entity posting system for My Gujarat Property. Property posting (Owner/Broker), project posting (Builder), requirement posting (Owner/Broker). Multi-step forms with intermediate draft saves, approval workflow, RLS enforcement, dashboard list pages, EntityStatusBadge UI component.

#### Changed Files

- `src/types/index.ts` — entity type definitions appended
- `src/lib/validators/property.ts` (NEW) — Zod schemas for property
- `src/lib/validators/project.ts` (NEW) — Zod schemas for project
- `src/lib/validators/requirement.ts` (NEW) — Zod schemas for requirement
- `src/lib/permissions/entity-permissions.ts` (NEW) — permission helpers
- `src/lib/actions/properties.ts` (NEW) — server actions for property CRUD
- `src/lib/actions/projects.ts` (NEW) — server actions for project CRUD
- `src/lib/actions/requirements.ts` (NEW) — server actions for requirement CRUD
- `src/components/ui/EntityStatusBadge.tsx` (NEW) — status badge component
- `src/components/forms/PropertyForm.tsx` (NEW) — 6-step property form
- `src/components/forms/ProjectForm.tsx` (NEW) — 5-step project form
- `src/components/forms/RequirementForm.tsx` (NEW) — 4-step requirement form
- `src/app/globals.css` — added `.form-input` and `.form-select`
- `src/app/dashboard/owner/page.tsx` — active module links added
- `src/app/dashboard/broker/page.tsx` — active module links added
- `src/app/dashboard/builder/page.tsx` — active module links added
- 10x new dashboard pages (owner/broker properties + requirements, builder projects)

#### SQL / Migration Files

- `supabase/migrations/20260630130000_property_project_requirement_system.sql` (NEW)
  - Tables: `properties`, `projects`, `project_units`, `requirements`, `entity_status_events`, `entity_moderation_notes`
  - RLS on all 6 tables
  - 3 public-safe views
  - Helper DB functions + auto-slug triggers
  - 30+ performance indexes

#### Tests / Checks Run

- `npm run lint` → PASS (2 warnings, 0 errors)
- `npx tsc --noEmit` → PASS
- `npm run build` → PASS (15 dashboard routes)

#### Security / RLS Impact

- Builder is blocked from inserting into `properties` table at DB RLS level (not just frontend)
- Owner/Broker blocked from `projects` table at DB RLS level
- `entity_moderation_notes` table has `using (false)` — completely private
- Public views strip contact, admin notes, private fields, exact map coordinates

#### Pending / Blocked

- Media upload: `SETUP_REQUIRED` (Cloudflare R2 not connected)
- Edit pages for individual properties/projects/requirements: `NOT_STARTED`
- Migration not yet applied to Supabase — must run before live browser test

#### Docs Updated

- `brain.md`, `CHANGELOG.md` (this entry), `FEATURE_REGISTRY.md`, `MANUAL_VERIFICATION.md`

---

### [2026-06-30] Prompt 01 — Project Setup Baseline

**Prompt:** `prompts/01_PROJECT_SETUP_BASELINE.md`
**Status:** `PASS` — All checks pass, bugs resolved/documented, provider policy confirmed by owner

#### Summary

Created the full Next.js 16 (App Router) baseline for My Gujarat Property from scratch. The project folder previously contained only documentation files. A fresh Next.js 16 scaffold was created and all baseline conventions, configs, folders, helpers, types and environment placeholders were established.

#### Framework / Version Note

`create-next-app` scaffolded Next.js 16.2.9 (latest stable at time of setup), React 19.2.4, TypeScript 5, Tailwind CSS v4. The docs reference "Next.js 15" but 16 is the current production release of the same framework line. No architecture change — App Router, Server Actions, React 19, and all documented patterns are fully compatible.

#### Changed Files

- `package.json` — renamed to `my-gujarat-property`, added `typecheck` and `format` scripts, added `@supabase/supabase-js` and `@supabase/ssr` dependencies
- `next.config.ts` — added baseline security headers, image remotePatterns placeholder, admin noindex header
- `src/app/layout.tsx` — updated metadata: real title template, real description, metadataBase, robots
- `src/app/page.tsx` — replaced scaffold placeholder with clean MGP holding page (no fake data, no dead links)
- `src/lib/supabase/client.ts` — browser client (anon key only, safe for Client Components)
- `src/lib/supabase/server.ts` — server client (cookie-based session, safe for Server Components/Actions)
- `src/lib/supabase/service.ts` — admin/service client (service role, server-side only, throws if key missing)
- `src/types/index.ts` — baseline types: FeatureStatus, ProviderStatus, PublicRole, InternalRole, UserRole, ApprovalStatus, VerificationStatus, ActionResult
- `src/config/index.ts` — APP_CONFIG, SETUP_REQUIRED_MESSAGE, BREAKPOINTS, ROLE_LABELS
- `src/lib/feature-flags/index.ts` — baseline env-driven feature flags (Turnstile, Maps, WhatsApp)
- `.env.example` — full placeholder list for all providers (no real secrets)
- `README.md` — setup guide, provider setup-required list, security rules
- `supabase/migrations/.gitkeep` — migration folder created
- `supabase/README.md` — migration naming convention and rules
- `src/components/ui/.gitkeep`, `layout/`, `public/`, `dashboard/`, `admin/`, `forms/` — baseline structure
- `src/lib/validators/`, `utils/`, `security/`, `permissions/`, `feature-flags/` — baseline structure
- `scripts/.gitkeep` — scripts folder

#### SQL / Migration Files

- None (no schema changes in Prompt 01 — schema starts in Prompt 02)
- `supabase/migrations/` folder created with README convention

#### Package Manager

- npm (package-lock.json present)

#### Tests / Checks Run

- `npm run lint` → PASS (no errors)
- `npm run typecheck` → PASS (no errors)
- `npm run build` → PASS (compiled successfully, 2 static routes: `/` and `/_not-found`)

#### Provider Status Changes

All providers remain `SETUP_REQUIRED` — no provider was connected in this phase.

#### Security / RLS Impact

- No RLS changes (no database yet)
- Service role key is server-side only by design (throws if missing, never imported in client)
- `.env.example` contains no real secrets
- Security headers added to `next.config.ts`

#### Known Issues / Warnings

- npm reports 2 moderate severity vulnerabilities — inherited from scaffold, not introduced by this phase. To address: `npm audit fix --force` (breaking change risk — deferred to later phase).
- `format` script references `prettier` which is not installed yet — not blocking (build/lint/typecheck all pass).

#### Rollback Notes

To revert: delete `src/`, `public/`, `node_modules/`, `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `.gitignore`, `.env.example`, `supabase/`, `scripts/`, `README.md`. Root docs (`brain.md`, `FEATURE_REGISTRY.md`, etc.) are unchanged and safe.

#### Docs Updated

- `CHANGELOG.md` (this entry)
- `brain.md`
- `FEATURE_REGISTRY.md`
- `BUGS_AND_FIXES.md`
- `MANUAL_VERIFICATION.md`
- `API_PROVIDER_STATUS.md`
- `DEPLOYMENT_ROLLBACK.md`
- `SECURITY_RLS_CHECKLIST.md`
- `PERFORMANCE_CHECKLIST.md`

#### Fixes Applied (2026-06-30 update)

- BUG-20260630-SETUP-001: npm audit `postcss` vulns — `BLOCKED` (upstream Next.js, not fixable without breaking downgrade)
- BUG-20260630-SETUP-002: `RESOLVED` — installed `prettier`, added `.prettierrc` + `.prettierignore`
- Provider policy confirmed: OTP/SMS/Email/WhatsApp/Razorpay/R2/Maps/Turnstile/Analytics all `DEV_ONLY` by owner decision — real credentials added post-launch
- `npm run format` — PASS
- All 4 checks now pass: lint / typecheck / build / format

#### Manual Verification

`PASS` — all baseline requirements confirmed.

#### Verification Run [2026-06-30]

Ran `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md` (file was missing — created and run same session).

22 checks passed:
- lint / typecheck / build / format → all PASS
- .env.example scan → no secrets, all 31 keys present
- source file secret scan → clean
- service role client leak scan → clean
- fake data scan → clean
- dead link scan → clean
- admin public link scan → clean
- scaffold text removed → confirmed
- security headers → confirmed
- Supabase client boundaries → correct
- all 10 root docs present → confirmed
- migration folder → confirmed
- verification file → created and confirmed

BUG-20260630-SETUP-003 (missing verification file) → RESOLVED

#### Verification Result: `PASS`

#### Next Step

`prompts/02_AUTH_ROLES_RLS_FOUNDATION.md`

---

### Prompt 02 — Auth, Roles And RLS Foundation [2026-06-30]

#### Status: `PASS` — Implementation complete. Full verification including live browser preview done 2026-06-30.

#### Summary

Implemented full authentication, roles, profile schema, RLS, route guards, admin/staff auth separation and setup-required provider states.

#### Changed App Files

- `.env.local` — created with Supabase credentials + OTP_PROVIDER=dev_mock
- `src/types/index.ts` — extended with auth types (Profile, StaffProfile, AccountStatus, etc.)
- `src/lib/validators/auth.ts` — Zod v4 schemas (mobile, OTP, registration, admin login)
- `src/lib/auth/session.ts` — server-side session helpers (getCurrentUser, getCurrentProfile, requireAuth, requireRole, requireStaff, etc.)
- `src/lib/auth/actions.ts` — server actions (checkMobileExists, requestOtp, verifyOtpAndLogin, verifyOtpAndRegister, adminLogin, logout)
- `src/lib/permissions/index.ts` — permission helpers (canAccessOwnerDashboard, canPostProperty, canAccessAdmin, etc.)
- `src/proxy.ts` — Next.js 16 proxy (route guard for auth-required, admin-only, auth-page redirect)
- `src/app/auth/callback/route.ts` — Supabase OAuth callback handler
- `src/app/login/page.tsx` — public login page with AuthModal (Suspense-wrapped)
- `src/app/unauthorized/page.tsx` — unauthorized/error state page
- `src/app/dashboard/page.tsx` — role-based redirect hub
- `src/app/dashboard/owner/page.tsx` — Owner dashboard placeholder (real role check, no fake stats)
- `src/app/dashboard/broker/page.tsx` — Broker dashboard placeholder
- `src/app/dashboard/builder/page.tsx` — Builder dashboard placeholder
- `src/app/profile/page.tsx` — Profile page (masked contact fields)
- `src/app/admin/login/page.tsx` — Admin/staff login (email+password, Suspense-wrapped)
- `src/app/admin/login/layout.tsx` — Admin login layout (noindex metadata)
- `src/app/admin/page.tsx` — Admin dashboard placeholder (real staff check)
- `src/components/auth/AuthModal.tsx` — modal/bottom-sheet wrapper for auth flow
- `src/components/auth/MobileOtpForm.tsx` — mobile entry + OTP verification form
- `src/components/auth/RegisterRoleForm.tsx` — registration form (name, email, role, consents)
- `src/components/auth/RoleSelector.tsx` — Owner/Broker/Builder role picker
- `src/components/auth/LogoutButton.tsx` — logout action button
- `src/components/auth/SetupRequiredState.tsx` — setup-required UI state
- `src/components/auth/UnauthorizedState.tsx` — unauthorized UI state

#### SQL Migration Files

- `supabase/migrations/20260630120000_auth_roles_rls_foundation.sql`

#### Migration Applied

Migration applied to Supabase project `cekpewpegltqpbmlofmc` via Management API [2026-06-30].

Tables created: `profiles`, `owner_profiles`, `broker_profiles`, `builder_profiles`, `staff_profiles`, `staff_permissions`, `staff_invites`, `role_change_requests`, `user_consents`, `auth_audit_events`

Views created: `public_profiles_view`, `public_broker_profiles_view`, `public_builder_profiles_view`

RLS enabled: all 10 tables

RLS policies: 16 policies applied

#### RLS/Security Changes

- RLS enabled on all 10 new tables
- 16 RLS policies applied (own-read, own-update, public-safe read where needed)
- Staff tables: public denied, users denied, only self-read by staff
- Admin/audit tables: all denied except service role inserts
- Public-safe views: exclude mobile, email, account details

#### Provider Status Changes

- OTP provider: `DEV_ONLY` (dev_mock mode for development)
- Supabase Auth: `CONFIGURED_NOT_TESTED` (credentials in .env.local)
- Admin email/Google auth: `SETUP_REQUIRED`
- All other providers: remain `DEV_ONLY`

#### Notable Decisions

- Next.js 16: `middleware.ts` renamed to `proxy.ts` with `proxy` export (Next.js 16 convention)
- Zod v4 used (`.issues` instead of `.errors`, `message` instead of `errorMap`)
- OTP_PROVIDER=dev_mock allows dev testing without real SMS (mock OTP=123456, dev only)
- Registration creates profile atomically via `create_user_profile()` DB function
- No fake dashboard stats — all shown as "—" with "Coming soon" / "No data yet"

#### Tests Run

- `npm run lint` → PASS
- `npm run typecheck` → PASS
- `npm run build` → PASS (14 routes, clean)
- Migration applied to Supabase → PASS (tables + RLS verified)

#### Known Issues

- BUG-20260630-AUTH-001: OTP provider not configured — login/register shows SETUP_REQUIRED (expected, DEV_ONLY)
- BUG-20260630-AUTH-002: Admin login requires staff account to exist in DB — no staff account yet (expected, invite-only model)
- Rate limiting: NOT_STARTED (deferred to Prompt 13)

#### Manual Verification

**PASS** — Full verification run completed 2026-06-30 via `prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md`.

- Live Supabase RLS SQL tests (anon role denial on 5 private tables): PASS
- 10 tables + 16 policies + 3 public-safe views confirmed in live DB
- Route guards, admin separation, security scans, open redirect: all PASS
- Bug found and fixed: BUG-20260630-AUTH-004 (`service.ts` missing `import "server-only"`)
- **Live browser preview (npm run dev):** 13 routes/flows verified in Chrome — all PASS
  - Homepage, login modal, admin login, 5 guest-redirect routes, /profile redirect, /unauthorized page
  - Mobile 360px + 390px responsive: no overflow, no wrapping, clean layout
- Acceptable pending: OTP SETUP_REQUIRED, rate limiting deferred to Prompt 13

---

## 4. Changelog Status Values

Use only these status values:

| Status               | Meaning                                                            |
| -------------------- | ------------------------------------------------------------------ |
| `DONE`               | Change is completed and documented                                 |
| `PARTIAL`            | Change is partly completed or partly verified                      |
| `BLOCKED`            | Change could not continue due to missing dependency/decision/error |
| `SETUP_REQUIRED`     | Change requires real API/provider/env setup                        |
| `FAILED_QA`          | Change failed verification and must be fixed                       |
| `ROLLED_BACK`        | Change was reverted/rolled back                                    |
| `NEEDS_REVIEW`       | Change needs human/security/legal/design review                    |
| `DOCUMENTATION_ONLY` | Only docs changed, no app code changed                             |
| `MIGRATION_ONLY`     | Only database/migration changed                                    |
| `CONFIG_ONLY`        | Only config/env/provider settings changed                          |
| `HOTFIX`             | Urgent production/stability/security fix                           |
| `SECURITY_FIX`       | Security issue fixed                                               |
| `PERFORMANCE_FIX`    | Speed/query/cache/performance improvement                          |
| `DEFERRED_TRACKED`   | Requirement intentionally deferred but tracked                     |

---

## 5. Verification Result Values

Use only these values:

| Verification             | Meaning                                              |
| ------------------------ | ---------------------------------------------------- |
| `PASS`                   | Verification passed completely                       |
| `PARTIAL`                | Verification partially passed; pending issues remain |
| `BLOCKED`                | Verification could not run or dependency missing     |
| `FAIL`                   | Verification failed                                  |
| `NOT_RUN`                | Verification not run yet                             |
| `NOT_REQUIRED`           | Verification not required for this docs-only change  |
| `NEEDS_MANUAL_CHECK`     | Manual verification is required before PASS          |
| `NEEDS_PROVIDER_CHECK`   | Real provider/API check is required                  |
| `NEEDS_SECURITY_CHECK`   | Security/RLS/privacy check is required               |
| `NEEDS_RESPONSIVE_CHECK` | Mobile/tablet/desktop layout check is required       |

---

## 6. Required Changelog Entry Format

Every new entry must use this exact structure:

```md
## YYYY-MM-DD — Change Title

### Status
DONE / PARTIAL / BLOCKED / SETUP_REQUIRED / FAILED_QA / ROLLED_BACK / NEEDS_REVIEW / DOCUMENTATION_ONLY / MIGRATION_ONLY / CONFIG_ONLY / HOTFIX / SECURITY_FIX / PERFORMANCE_FIX / DEFERRED_TRACKED

### Phase
- Phase name:
- Prompt file:
- Verification prompt file:
- Related docs read:

### Summary
- What changed:
- Why changed:
- User request / requirement source:

### Changed Files
- `path/to/file`

### SQL / Migration Files
- `path/to/migration.sql`
- or `None`

### Database / RLS Impact
- Tables changed:
- Columns changed:
- Enums changed:
- Indexes changed:
- Triggers/functions changed:
- RLS policies changed:
- Public-safe views changed:
- Storage bucket policies changed:
- Impact:
- If none: `None`

### Security / Privacy Impact
- Contact privacy impact:
- Service role key impact:
- Role/RBAC impact:
- Admin/staff access impact:
- User private data impact:
- Upload/media privacy impact:
- Payment/provider security impact:
- If none: `None`

### Provider / API Impact
- OTP:
- WhatsApp:
- Maps:
- Razorpay:
- Email:
- SMS:
- Cloudflare R2/CDN:
- Analytics:
- Error tracking:
- If none: `None`

### UI / UX / Responsive Impact
- Public UI:
- Dashboard UI:
- Admin UI:
- Mobile:
- Tablet:
- Desktop:
- Loading/empty/error states:
- If none: `None`

### Tests Run
- `command`
- Result:
- If not run, exact reason:

### Manual Verification
- Result:
- Notes:
- If not run, exact reason:

### Docs Updated
- `brain.md`
- `FEATURE_REGISTRY.md`
- `CHANGELOG.md`
- `MANUAL_VERIFICATION.md`
- other docs:

### Feature Registry Updates
- Feature IDs updated:
- Status changes:

### Bugs / Fixes Updated
- `BUGS_AND_FIXES.md` updated: Yes/No
- Bug IDs:

### Rollback Notes
- Rollback required: Yes/No
- Rollback path:
- Backup required:
- Risk:

### Pending Issues
- Issue:
- Owner:
- Required next action:

### Next Phase
- Next prompt:
- Next verification prompt:
```

---

## 7. Short Entry Format For Documentation-Only Changes

For documentation-only generation, this shorter format is allowed:

```md
## YYYY-MM-DD — Documentation File Created: `file-name.md`

### Status
DOCUMENTATION_ONLY

### Summary
- Created:
- Purpose:
- Scope covered:

### Changed Files
- `file-name.md`

### SQL / Migration Files
- None

### Tests Run
- Not run; documentation-only change.

### Manual Verification
- NEEDS_MANUAL_CHECK

### Docs Updated
- `CHANGELOG.md`
- any related docs:

### Pending Issues
- None / details

### Next
- Next file:
```

---

## 8. Categories For Changelog Entries

Use these category labels when writing entries:

### Documentation

* `DOCS`
* `PROMPTS`
* `WORKFLOW`
* `MEMORY`
* `REGISTRY`
* `MANUAL_VERIFICATION`

### Core

* `CORE`
* `ARCHITECTURE`
* `ROUTING`
* `CONFIG`
* `ENV`
* `FEATURE_FLAGS`

### Auth And Roles

* `AUTH`
* `RBAC`
* `PUBLIC_USERS`
* `ADMIN_STAFF`
* `SESSION`
* `PERMISSIONS`

### Listings And CRM

* `PROPERTY`
* `PROJECT`
* `REQUIREMENT`
* `PROPOSAL`
* `LEADS`
* `CRM`
* `SITE_VISIT`
* `MESSAGING`

### Dashboard And Admin

* `OWNER_DASHBOARD`
* `BROKER_DASHBOARD`
* `BUILDER_DASHBOARD`
* `ADMIN`
* `SUPER_ADMIN`
* `STAFF`
* `SUPPORT`

### Payments And Ads

* `BILLING`
* `SUBSCRIPTION`
* `TRIAL`
* `RAZORPAY`
* `GST`
* `INVOICE`
* `ADS`
* `PROMOTION`

### Media And Providers

* `MEDIA`
* `UPLOAD`
* `STORAGE`
* `CLOUDFLARE_R2`
* `CDN`
* `OTP`
* `WHATSAPP`
* `EMAIL`
* `SMS`
* `MAPS`
* `ANALYTICS`

### SEO, Legal And Privacy

* `SEO`
* `CMS`
* `BLOG`
* `LEGAL`
* `PRIVACY`
* `CONSENT`
* `COOKIE`
* `FRAUD`
* `REPORT`

### Security And Performance

* `SECURITY`
* `RLS`
* `AUDIT`
* `SOFT_DELETE`
* `RATE_LIMIT`
* `PERFORMANCE`
* `CACHE`
* `BACKGROUND_JOBS`
* `SCALING`

### QA And Deployment

* `QA`
* `RESPONSIVE`
* `ACCESSIBILITY`
* `BUILD`
* `DEPLOYMENT`
* `BACKUP`
* `ROLLBACK`
* `PRODUCTION_READY`

---

## 9. Files That Must Be Mentioned In Changelog When Changed

Whenever changed, these files must be explicitly listed in the changelog entry.

### Root Documentation

* `CLAUDE.md`
* `brain.md`
* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`
* `BUGS_AND_FIXES.md`
* `MANUAL_VERIFICATION.md`
* `API_PROVIDER_STATUS.md`
* `DEPLOYMENT_ROLLBACK.md`
* `SECURITY_RLS_CHECKLIST.md`
* `PERFORMANCE_CHECKLIST.md`

### Detailed Documentation

* `docs/01_PROJECT_MASTER_AND_SCOPE.md`
* `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`
* `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`
* `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`
* `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`
* `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`
* `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`
* `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`
* `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`
* `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
* `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`
* `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
* `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`
* `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
* `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`
* `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md`

### Prompt Files

* `prompts/00_PROMPT_USAGE_RULES.md`
* all phase prompt files
* all manual verification prompt files

### Application Areas

After implementation begins, also mention exact paths for:

* app routes
* dashboard routes
* admin routes
* API routes
* server actions
* components
* database migrations
* SQL files
* seed files
* provider config files
* storage policy files
* middleware files
* validation schemas
* type files
* test files

---

## 10. SQL / Migration Changelog Rules

Whenever database changes happen, changelog entry must include exact SQL/migration files.

Database changes include:

* table create/update/delete
* column add/update/delete
* enum add/update/delete
* index add/update/delete
* trigger add/update/delete
* function add/update/delete
* RLS policy add/update/delete
* public-safe view add/update/delete
* seed/setup data add/update/delete
* storage bucket policy add/update/delete

Migration entry must mention:

* migration file path
* migration purpose
* tables changed
* RLS changed
* rollback notes
* whether migration is idempotent
* whether destructive action exists
* whether backup is required
* whether `DEPLOYMENT_ROLLBACK.md` was updated

Example:

```md
### SQL / Migration Files
- `supabase/migrations/20260701090000_phase_02_auth_roles_rls.sql`

### Database / RLS Impact
- Tables changed: `profiles`, `roles`, `user_roles`
- RLS policies changed: Yes
- Public-safe views changed: None
- Destructive action: No
- Idempotent: Yes
- Rollback notes updated in: `DEPLOYMENT_ROLLBACK.md`
```

---

## 11. RLS And Security Changelog Rules

Any change involving auth, roles, permissions, admin, contact privacy, private documents, payments, provider secrets or RLS must mention security impact.

Security changelog must include:

* server-side authorization status
* RLS policy status
* allowed access tests
* denied access tests
* wrong-owner tests
* guest/unauthenticated tests
* admin/staff scoped tests
* service role exposure check
* hidden phone exposure check
* private file exposure check
* safe error handling
* rate limit impact
* audit log impact

If these were not tested, the changelog must say:

```md
Security/RLS verification not fully run. Marked PARTIAL/BLOCKED because: <exact reason>.
```

Never mark a security-sensitive feature `PASS` without allowed and denied access tests.

---

## 12. Provider / API Changelog Rules

Provider/API related changes must also update `API_PROVIDER_STATUS.md`.

Provider changes include:

* OTP provider
* WhatsApp free/API mode
* Google Maps embed/API mode
* Razorpay payment provider
* Email provider
* SMS provider
* Cloudflare R2
* Cloudflare CDN
* Analytics
* Error tracking
* Cron/background jobs

Changelog entry must say:

* provider name
* mode
* status
* env variables changed
* `.env.example` updated or not
* real provider test result
* fallback/setup-required state
* whether fake success is blocked

If provider not configured:

```md
Provider status: SETUP_REQUIRED
Fake success blocked: Yes
Fallback shown: Yes
```

---

## 13. UI / UX Changelog Rules

Any UI change must mention responsive impact.

UI changelog must include:

* public UI changed or not
* dashboard UI changed or not
* admin UI changed or not
* mobile impact
* tablet impact
* desktop impact
* no horizontal scroll check
* no overlap check
* text wrap check
* loading state
* empty state
* error state
* disabled state
* unauthorized state
* setup-required state if relevant

If responsive verification was not done, mark:

```md
Manual responsive verification: NOT_RUN
Reason:
Result: PARTIAL or BLOCKED
```

Never mark UI phase `PASS` if mobile/tablet/desktop layout is broken.

---

## 14. Billing / Payment Changelog Rules

Any billing/payment change must mention:

* plan impact
* subscription impact
* posting limit impact
* checkout impact
* Razorpay order/callback/webhook impact
* GST/invoice impact
* failed payment impact
* pending payment impact
* duplicate payment impact
* refund impact
* manual activation audit impact
* invoice sequence impact
* test/live mode impact

Payment-related features cannot be marked `PASS` unless:

* fake success is blocked
* payment state machine works
* webhook signature verification is implemented/tested or marked `SETUP_REQUIRED`
* plan activation only happens after verified payment or audited manual action
* failed/pending states do not activate plan
* invoice is not generated on failed payment

---

## 15. Media / Upload Changelog Rules

Any media/upload change must mention:

* file type validation
* file size validation
* public/private bucket rule
* image optimization
* WebP/AVIF variants
* original file storage
* PDF handling
* private document access
* signed URL behavior
* upload failure handling
* orphan cleanup impact
* CDN/cache purge impact
* SVG/HEIC/EXIF/malware scan handling where relevant

Private verification documents must never be marked public.

If Cloudflare R2/CDN is not configured, mark `SETUP_REQUIRED`.

---

## 16. SEO / CMS / Legal Changelog Rules

Any SEO/CMS/legal change must mention:

* title/meta/canonical impact
* noindex/sitemap impact
* real-data requirement
* fake city/fake count prevention
* structured data impact
* legal page impact
* consent impact
* footer link impact
* public content review
* lawyer review requirement if legal text changed

Legal content must be marked `NEEDS_REVIEW` until lawyer/human approval.

---

## 17. Performance Changelog Rules

Any performance-related change must mention:

* query changes
* indexes
* pagination/lazy loading
* caching
* revalidateTag/revalidatePath
* image optimization
* bundle impact
* provider/API performance
* background job impact
* load/stress test status
* Core Web Vitals impact
* 1 lakh live user scalability impact if relevant

Performance changes must not weaken:

* security
* RLS
* role permissions
* contact privacy
* manual verification
* documentation
* rollback safety

---

## 18. Deployment And Rollback Changelog Rules

Deployment/rollback changelog entries must include:

* deployment environment
* version/build number
* changed files
* migrations
* backups taken
* rollback path
* feature flags changed
* smoke test result
* production provider mode
* pending risks
* incident status if any

Rollback entries must include:

* rollback reason
* rollback scope
* files reverted
* migrations reverted/restored
* backup used
* user data impact
* verification after rollback
* follow-up action

---

## 19. Manual Verification Changelog Rules

Manual verification must not say only “done”.

Manual verification changelog entry must include:

* exact prompt file used
* tested routes/pages
* tested roles
* tested login states
* tested devices/screen sizes
* tested UI behavior
* tested RLS/access cases
* tested provider states
* failed cases
* screenshots/docs/logs if produced
* final result

Allowed final result:

* `PASS`
* `PARTIAL`
* `BLOCKED`
* `FAIL`

If errors are found:

1. Fix errors first.
2. Re-run verification.
3. Only then mark `PASS`.

If errors remain, mark `PARTIAL`, `BLOCKED` or `FAIL`.

---

## 20. Current Changelog

## 2026-06-29 — Documentation File Created: `CLAUDE.md`

### Status

DOCUMENTATION_ONLY

### Categories

* `DOCS`
* `WORKFLOW`
* `MEMORY`
* `SECURITY`
* `QA`

### Summary

* Created root master rules file for Claude Code.
* Captured short global rules for My Gujarat Property.
* Defined no-fake rules, token-light workflow, required docs, phase workflow, final response format, documentation update rules, Feature Registry rules, brain memory rules, SQL/migration rules, RLS rules, auth rules, role rules, UI rules, interaction safety rules, property/project/requirement rules, admin rules, billing/payment rules, provider rules, media rules, notification rules, SEO rules, legal rules, performance rules, deployment/rollback rules, production readiness rules and manual verification rules.
* Purpose: provide the short master rule file Claude must read before every task.

### Changed Files

* `CLAUDE.md`

### SQL / Migration Files

* None

### Database / RLS Impact

* None; documentation-only change.
* RLS requirements documented but not implemented yet.

### Security / Privacy Impact

* Security rules documented.
* No code/security implementation yet.
* No secrets added.

### Provider / API Impact

* Provider rules documented.
* No provider configured.

### UI / UX / Responsive Impact

* UI/responsive rules documented.
* No UI implemented.

### Tests Run

* Not run; documentation-only change.

### Manual Verification

* Result: NEEDS_MANUAL_CHECK
* Notes: User should copy file into project root and confirm content is preserved.

### Docs Updated

* `CLAUDE.md`
* `CHANGELOG.md`

### Feature Registry Updates

* `DOC-001` status should be `DONE`.

### Bugs / Fixes Updated

* `BUGS_AND_FIXES.md` not created yet.

### Rollback Notes

* Rollback required: No
* Rollback path: remove/revert `CLAUDE.md` documentation if needed.

### Pending Issues

* Remaining documentation pack must still be generated.
* No website implementation started yet.

### Next

* Next file generated after this was `brain.md`.

---

## 2026-06-29 — Documentation File Created: `brain.md`

### Status

DOCUMENTATION_ONLY

### Categories

* `DOCS`
* `MEMORY`
* `WORKFLOW`
* `REGISTRY`

### Summary

* Created project memory and resume guide file.
* Captured current project snapshot, generated/pending files, core product memory, master decisions, role memory, public website memory, auth flow memory, property/project/requirement memory, leads CRM memory, messaging memory, profiles, verification, ads, billing, free trial, notifications, location, search, SEO/CMS/legal, media, UI/UX, interaction safety, admin/staff, security/fraud, performance, deployment, provider status, production readiness, Claude workflow, file inventory, implementation status, SQL/migration memory, provider memory, UI memory, security memory, manual verification memory, conflicts, workarounds, safe defaults and resume guide.
* Purpose: allow another Claude account to continue without chat history.

### Changed Files

* `brain.md`

### SQL / Migration Files

* None

### Database / RLS Impact

* None; documentation-only change.
* Database/RLS memory sections created.

### Security / Privacy Impact

* Security memory documented.
* No secrets added.
* No implementation yet.

### Provider / API Impact

* Provider memory documented.
* All real providers remain `SETUP_REQUIRED` or `NOT_STARTED`.

### UI / UX / Responsive Impact

* UI memory documented.
* No UI implemented.

### Tests Run

* Not run; documentation-only change.

### Manual Verification

* Result: NEEDS_MANUAL_CHECK
* Notes: User should copy file into project root and keep it updated after every phase.

### Docs Updated

* `brain.md`
* `CHANGELOG.md`

### Feature Registry Updates

* `DOC-002` status should be `DONE`.

### Bugs / Fixes Updated

* `BUGS_AND_FIXES.md` not created yet.

### Rollback Notes

* Rollback required: No
* Rollback path: remove/revert `brain.md` documentation if needed.

### Pending Issues

* `brain.md` must be updated after every future phase.
* No app implementation started yet.

### Next

* Next file generated after this was `FEATURE_REGISTRY.md`.

---

## 2026-06-29 — Documentation File Created: `FEATURE_REGISTRY.md`

### Status

DOCUMENTATION_ONLY

### Categories

* `DOCS`
* `REGISTRY`
* `FEATURE_FLAGS`
* `QA`
* `SECURITY`
* `RLS`

### Summary

* Created master feature registry.
* Added status values and QA status values.
* Added registry structure for tracking every feature, route, module, database object, provider dependency, status, QA result, manual verification, security/RLS status, notes and last updated phase.
* Added feature groups covering core platform, documentation, authentication, roles, public website, dashboards, property, project, requirement, proposals, leads CRM, messaging, profiles, agents, verification, admin/staff, billing, subscription, Razorpay, GST, trials, ads, notifications, search, location, SEO, CMS, legal pages, media, upload, storage, UI/UX, security, privacy, consent, fraud, audit, soft delete, providers, APIs, performance, deployment, rollback, analytics, reports, support, feedback, advanced features, PWA, localization, reviews and production QA.
* Purpose: prevent any feature from silently disappearing between docs, prompts, code and verification.

### Changed Files

* `FEATURE_REGISTRY.md`

### SQL / Migration Files

* None

### Database / RLS Impact

* None; documentation-only change.
* Expected DB objects and RLS/security status placeholders documented.
* No migration created yet.

### Security / Privacy Impact

* Security and RLS tracking categories documented.
* No implementation yet.

### Provider / API Impact

* Provider dependency tracking documented.
* Providers remain `SETUP_REQUIRED` where real API setup is needed.

### UI / UX / Responsive Impact

* UI/responsive features tracked in registry.
* No UI implemented.

### Tests Run

* Not run; documentation-only change.

### Manual Verification

* Result: NEEDS_MANUAL_CHECK
* Notes: Registry is large and must be reviewed for completeness while future detailed docs are generated.

### Docs Updated

* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`

### Feature Registry Updates

* `DOC-003` status should be `DONE` after this file is accepted.
* Other features remain `NOT_STARTED`, `SETUP_REQUIRED`, `DEFERRED_TRACKED`, `NEEDS_REVIEW` or related initial statuses.

### Bugs / Fixes Updated

* `BUGS_AND_FIXES.md` not created yet.

### Rollback Notes

* Rollback required: No
* Rollback path: remove/revert `FEATURE_REGISTRY.md` documentation if needed.

### Pending Issues

* Registry must be updated after every future implementation phase.
* Current registry is documentation baseline only; app code not implemented.

### Next

* Next file: `CHANGELOG.md`.

---

## 2026-06-29 — Documentation File Created: `CHANGELOG.md`

### Status

DOCUMENTATION_ONLY

### Categories

* `DOCS`
* `WORKFLOW`
* `QA`
* `DEPLOYMENT`
* `ROLLBACK`
* `SECURITY`

### Summary

* Created changelog tracking file.
* Added mandatory update rules.
* Added no-fake-done rule.
* Added entry status values.
* Added verification result values.
* Added required changelog entry format.
* Added short documentation-only entry format.
* Added category labels.
* Added rules for SQL/migrations, RLS/security, providers/APIs, UI/UX, billing/payment, media/upload, SEO/CMS/legal, performance, deployment/rollback and manual verification.
* Added current initial entries for `CLAUDE.md`, `brain.md`, `FEATURE_REGISTRY.md` and `CHANGELOG.md`.
* Purpose: ensure every completed change/update is tracked honestly with changed files, SQL files, tests, verification, docs, pending issues and next phase.

### Changed Files

* `CHANGELOG.md`

### SQL / Migration Files

* None

### Database / RLS Impact

* None; documentation-only change.

### Security / Privacy Impact

* Security changelog rules documented.
* No secrets added.
* No implementation yet.

### Provider / API Impact

* Provider/API changelog rules documented.
* No provider configured.

### UI / UX / Responsive Impact

* UI/responsive changelog rules documented.
* No UI implemented.

### Tests Run

* Not run; documentation-only change.

### Manual Verification

* Result: NEEDS_MANUAL_CHECK
* Notes: User should copy file into project root and keep entries updated after every phase.

### Docs Updated

* `CHANGELOG.md`

### Feature Registry Updates

* `DOC-004` should be marked `DONE` after this file is accepted.

### Bugs / Fixes Updated

* `BUGS_AND_FIXES.md` not created yet.

### Rollback Notes

* Rollback required: No
* Rollback path: remove/revert `CHANGELOG.md` documentation if needed.

### Pending Issues

* Remaining root docs still need generation:

  * `BUGS_AND_FIXES.md`
  * `MANUAL_VERIFICATION.md`
  * `API_PROVIDER_STATUS.md`
  * `DEPLOYMENT_ROLLBACK.md`
  * `SECURITY_RLS_CHECKLIST.md`
  * `PERFORMANCE_CHECKLIST.md`
* Detailed docs and prompt files still pending.
* No website implementation started yet.

### Next

* Next file: `BUGS_AND_FIXES.md`.

---

## 2026-07-01 — Premium Dashboard UI Design System (Cross-Cutting UI Phase)

### Summary

Stood up a shared, reusable UI component library (`src/components/ui/`, `src/components/dashboard/`) implementing the white-first, Apple-style, mobile-first design system already defined in `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md` and CLAUDE.md §40. Re-skinned all existing Owner/Broker/Builder dashboard home pages, all 5 property/project/requirement list pages, and all 3 multi-step forms (Property/Project/Requirement) onto the new component library. No backend, DB, RLS, or route changes. No new dashboards added (Admin/Staff dashboards not yet built — will inherit this library when built).

### Changed Files

New shared components:
* `src/lib/cn.ts` — className composition helper
* `src/components/ui/Button.tsx`, `Card.tsx`, `Alert.tsx`, `EmptyState.tsx`, `Skeleton.tsx`, `FormField.tsx` (+ `SummaryRow`), `Stepper.tsx`, `SuccessScreen.tsx`
* `src/components/dashboard/DashboardShell.tsx`, `StatGrid.tsx`, `ActionCard.tsx`, `AccountStatusCard.tsx`, `EntityListCard.tsx`, `DashboardPageHeader.tsx`

Re-skinned (logic untouched, markup replaced with shared components):
* `src/app/dashboard/owner/page.tsx`, `broker/page.tsx`, `builder/page.tsx`
* `src/app/dashboard/owner/properties/page.tsx`, `broker/properties/page.tsx`
* `src/app/dashboard/owner/requirements/page.tsx`, `broker/requirements/page.tsx`
* `src/app/dashboard/builder/projects/page.tsx`
* `src/components/forms/PropertyForm.tsx`, `ProjectForm.tsx`, `RequirementForm.tsx` — removed 3x duplicated local `FormField`/`Row`/stepper implementations, now import shared versions

Tokens:
* `src/app/globals.css` — added `--radius-full`, `--focus-ring` tokens (additive, no existing token changed)

Dependencies added: `clsx`, `lucide-react` (icon set, replaces hand-rolled inline SVGs).

### SQL / Migration Files
* None — pure UI-layer change, no DB/RLS impact.

### Tests Run
* `npm run lint` → PASS (0 errors, 0 warnings)
* `npx tsc --noEmit` → PASS (0 errors)
* `npm run build` → PASS (29 routes compiled)
* Live browser preview (Owner test session): dashboard home, My Properties list (2 real records), My Requirements empty state, Post Property form step 1, role-block screen (owner→builder route) — all verified at 390px, 1366px. No console errors, no horizontal scroll, no overlap.
* Fixed a pluralization bug found during live check ("2 propertys" → "2 properties") via new `itemLabelPlural` prop on `DashboardPageHeader`.

### Verification Status
PASS — UI re-skin only, no regression to role gates, RLS, or data flows (all confirmed unchanged in live preview).

### Known Issues / Deferred
* Admin/Staff dashboards not yet built — will consume this same library when implemented.
* Public site header/footer untouched (governed separately by CLAUDE.md §40).
* Broker/Builder dashboards visually re-skinned but not individually browser-walked end-to-end in this pass (Owner flow used as representative; same shared components).

### Docs Updated
* `CHANGELOG.md` (this entry)
* `FEATURE_REGISTRY.md`
* `brain.md`
* `MANUAL_VERIFICATION.md`

### Rollback Notes
* Rollback required: No (additive component library + non-destructive markup swap)
* Rollback path: revert the listed files via git; no DB/migration rollback needed.

---

## 2026-07-01 — Sidebar Dashboard Redesign + Dark Mode

### Summary

Rebuilt the dashboard shell (sidebar + topbar + stat cards + status chips) to match a real design-kit spec supplied by the user (Figma dev-mode CSS), re-themed in MGP's brand teal. Added class-based (`.dark`) dark mode support per explicit user request, overriding the prior "white-first only" restriction. Applied to all Owner/Broker/Builder dashboard routes (home, list, new-form, edit-stub pages).

### Changed Files
* `src/app/globals.css` — added `@custom-variant dark`, `.dark` token overrides, dark form-input/select styles
* `src/app/layout.tsx` — added `next/script` (beforeInteractive) to set `.dark` class pre-paint from `localStorage`, removed hardcoded `bg-white text-zinc-900` on `<body>`
* `src/components/ui/ThemeToggle.tsx`, `Card.tsx` (now token-based, was hardcoded `bg-white`/`border-zinc-*`)
* `src/components/ui/EntityStatusBadge.tsx` — restyled to pill-chip pattern (10% fill / 20% border / solid text) matching the reference spec
* `src/components/dashboard/DashboardSidebar.tsx`, `DashboardTopbar.tsx`, `DashboardShellV2.tsx`, `DashboardMobileTabBar.tsx`, `StatCardGradient.tsx`, `navConfig.ts` — new sidebar shell system
* All Owner/Broker/Builder dashboard page files (home, properties/requirements/projects list, `new`, `[id]/edit`) — swapped to `DashboardShellV2`

### Tests Run
* `npm run lint` → PASS, `npx tsc --noEmit` → PASS, `npm run build` → PASS (29 routes)
* Live browser: sidebar+topbar render correctly at 1366px, dark mode toggle confirmed working (cards/sidebar/topbar all token-based), mobile 390px confirmed sidebar collapses to floating bottom tab bar with no horizontal scroll, My Properties list confirmed with real data + new pill-chip status badges

### Verification Result
PASS

### Known Limitations
* Chart/analytics blocks from the reference spec are out of scope — no analytics backend exists yet
* Global search in the topbar is a visual placeholder only (no backend), per "no fake feature" rule
* Deep-nested content (form field labels, list-card body text) not fully dark-mode audited — shell and top-level cards are dark-aware; a full nested-component dark-mode pass is deferred

### Docs Updated
* `CHANGELOG.md` (this entry), `FEATURE_REGISTRY.md`, `brain.md`, `MANUAL_VERIFICATION.md`

---

## 2026-07-01 — Dev-Mock OTP Login: Real Session Creation + Mobile Format Fix

### Summary

Fixed two related auth bugs while wiring up real mobile-OTP login for dev test accounts (per user request to test via the real login UI instead of cookie-injection hacks):

1. **`verifyOtpAndLogin` never created a session.** It validated the OTP and returned a success response, but no Supabase session/cookie was ever established — login silently failed to authenticate anything. Fixed by adding `establishDevSession()` (dev-only, hard-gated to `NODE_ENV !== "production" && OTP_PROVIDER === "dev_mock"`), which mints a real session via a service-role password reset + `signInWithPassword`, so `@supabase/ssr` writes real session cookies. Wired into both `verifyOtpAndLogin` and `verifyOtpAndRegister`.
2. **`profiles.mobile` format mismatch (pre-existing data bug).** Some rows stored `"+919000000001"`, others `"9000000001"`, while `normalizeMobile()` always strips `+91` before querying — so lookups silently failed for most existing profiles. Fixed the query in `checkMobileExists` and `verifyOtpAndLogin` to match both formats via `.or()`.

Also gave the three role test accounts (Owner/Broker/Builder) working mobile numbers so they can log in through the real `/login` mobile-OTP UI with the fixed dev code `123456`, not just the email/password fallback.

### Changed Files
* `src/lib/auth/actions.ts` — `checkMobileExists` and `verifyOtpAndLogin` mobile lookups now tolerant of both storage formats; new `establishDevSession()` helper; wired into `verifyOtpAndLogin` and `verifyOtpAndRegister`

### Data Changes (dev Supabase project only, no migration — direct REST updates)
* 3 profile rows (`testowner@mgptest.dev`, `testbroker@mgptest.dev`, `testbuilder@mgptest.dev`) had `mobile` updated to `9000000011`/`9000000012`/`9000000013` (raw-digit format, matching `normalizeMobile()` output)

### Tests Run
* `npm run lint` → PASS, `npx tsc --noEmit` → PASS, `npm run build` → PASS
* Live browser: full `/login` UI flow (mobile → dev-mock OTP shown in UI → verify with `123456`) for both Owner (`9000000011`) and Broker (`9000000012`) — both landed on the correct role dashboard with a session that survived a hard page reload

### Security Notes
* `establishDevSession()` is unreachable in production — double-gated (checked both at call site before invocation, and again inside the helper itself) on `NODE_ENV !== "production"` and `OTP_PROVIDER === "dev_mock"`, matching CLAUDE.md §22 ("No production dev OTP")
* The dev-only password minted per login is deterministic but scoped to `IS_DEV`/`dev_mock` only — never applied outside that gate, and real users never see or use it (it's plumbing for cookie issuance only)

### Verification Result
PASS

### Docs Updated
* `CHANGELOG.md` (this entry), `SECURITY_RLS_CHECKLIST.md`, `brain.md`, `MANUAL_VERIFICATION.md`

---

## 2026-07-01 — Prompt 05: Public Search, Detail Pages, Profiles And SEO

### Summary
Implemented the public discovery layer: `/search` (real query-param filters/sort/pagination over public-safe views), `/property/[slug]` and `/project/[slug]` detail pages, `/broker/[slug]` and `/builder/[slug]` public profile pages, `sitemap.ts`, and `robots.ts`. A prior session had already built the public-safe data layer (`src/lib/actions/public-search.ts`) but no routes consumed it yet — this phase built the UI/routes and wired them up.

### Bug Found And Fixed (blocking)
`public_properties_view` (created in Prompt 04) never selected `description`, but the Prompt-05 data layer selected it — every property-by-slug query silently returned `null` (PostgREST 42703), so every real published property showed as "not available." Fixed with migration `supabase/migrations/20260701140000_public_search_detail_profile_seo.sql` (additive `CREATE OR REPLACE VIEW`, appends `description` at the end of the column list — Postgres does not allow reordering existing view columns). Logged as `BUG-20260701-SEARCH-001`.

### Changed/New Files
- `src/app/search/page.tsx` (rewritten — real data, streamed via Suspense)
- `src/app/property/[slug]/page.tsx`, `src/app/property/[slug]/not-found.tsx`
- `src/app/project/[slug]/page.tsx`, `src/app/project/[slug]/not-found.tsx`
- `src/app/broker/[slug]/page.tsx`, `src/app/broker/[slug]/not-found.tsx`
- `src/app/builder/[slug]/page.tsx`, `src/app/builder/[slug]/not-found.tsx`
- `src/app/sitemap.ts`, `src/app/robots.ts`
- `src/components/search/SearchFilterBar.tsx`, `PropertyResultCard.tsx`, `ProjectResultCard.tsx`, `RequirementResultCard.tsx`, `SearchPagination.tsx`
- `src/components/detail/Breadcrumbs.tsx`, `DetailGallery.tsx`, `DetailCTABar.tsx`, `UnavailableEntityState.tsx`, `SeoJsonLd.tsx`
- `src/components/profile/PublicProfileHeader.tsx`
- `src/lib/search/format.ts` (price/area/label formatting helpers)
- `src/lib/seo/index.ts` (canonical URL, noindex/indexable, safe description, BreadcrumbList JSON-LD)
- `src/lib/actions/public-search.ts` — added `getPublicBrokerLinkByProfileId`, `getPublicBuilderLinkByProfileId` (uploader profile linking)

### SQL / Migration Files
- `supabase/migrations/20260701140000_public_search_detail_profile_seo.sql` — applied to live Supabase project (owner-approved). Adds `description` column to `public_properties_view` only. No RLS change, no data change, non-destructive.

### Design Decisions
- Requirements are **scoped-public**: shown as a read-only card in search results only (no dedicated `/requirement/[slug]` detail page yet) — avoids any risk of leaking buyer/renter identity or private budget details before a real requirement-detail privacy model is designed. Documented as a Prompt 05 conflict-note/decision in `brain.md`.
- Broker/builder profile pages are built and functional but currently unreachable via real data — no admin/dashboard flow yet sets `broker_profiles.public_slug` / `is_published` (or `builder_profiles` equivalents). Flagged as a known gap, not a bug — those tables and views already existed from Prompt 02, publishing UI is future dashboard/admin work.
- Media/gallery shows a neutral "photos not added yet" placeholder — Cloudflare R2/CDN not connected (Prompt 10), no fake images ever rendered.
- Uploader profile links (owner→broker on property cards/detail, project→builder) only render when the linked broker/builder profile is actually published — otherwise falls back to a plain role label, never a broken link.

### Tests Run
- `npm run lint` → PASS (0 errors)
- `npx tsc --noEmit` → PASS (0 errors)
- `npm run build` → PASS (38 routes, including new `/sitemap.xml`, `/robots.txt`)
- Live browser (`npm run dev`): `/search` empty state (no fake results) → PASS; `/search?entity=property` param sync → PASS; mobile (375px) filter bottom sheet with sticky Apply → PASS; `/property/does-not-exist` → clean `UnavailableEntityState`, noindex → PASS; a real published test property (temporarily approved with owner sign-off, then kept published per owner's decision) rendered full detail page + appeared correctly in `/search?city=Ahmedabad` + appeared in `/sitemap.xml` + `/robots.txt` correctly disallows dashboard/admin/profile/login/api → PASS

### Known Pre-Existing Issue (not introduced by this phase)
React 19 dev console warning "Encountered a script tag while rendering React component" appears on every page (including the homepage, unrelated to this phase) — traced to the pre-existing `next/script` theme-init script in `src/app/layout.tsx` (Prompt 04 dark-mode phase). The new `SeoJsonLd` component uses a plain `<script type="application/ld+json">` tag per Next.js's own documented JSON-LD pattern, which is correct and unrelated to this warning. Not fixed in this phase (out of scope) — flagged for whoever picks up the dark-mode/theme-init code next.

### Verification Result
`DONE` — implementation complete and live-verified for property detail + search + sitemap/robots. Project detail page is build-verified only (no published test project exists yet to browser-check). Manual verification prompt (`prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`) still to be run formally.

### Docs Updated
`CHANGELOG.md` (this entry), `FEATURE_REGISTRY.md`, `BUGS_AND_FIXES.md`, `MANUAL_VERIFICATION.md`, `API_PROVIDER_STATUS.md`, `DEPLOYMENT_ROLLBACK.md`, `SECURITY_RLS_CHECKLIST.md`, `PERFORMANCE_CHECKLIST.md`, `brain.md`

### Next Phase
`prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md` (or `05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md` first, per phase workflow)

---

## 2026-07-01 — Search Screen UI Port From Old Project (User-Requested, Final Old-Project Port)

### Summary
Ported the `/search` results screen design (tabs, sticky search bar, desktop filter sidebar, mobile filter bottom sheet, filter chips, sort dropdown, empty state, result card visual language) from the old reference project `C:\Users\RAJAN\my-gujarat-property`, rewired to this project's real Supabase schema. Per explicit user instruction, this is the **last** UI element ported from that old project — see `feedback_old_project_porting_boundary` in Claude's memory.

### Adaptation
Old project's single `Purpose` enum mixed entity+category+purpose (flat schema). Added `TAB_SCOPE` map (`src/lib/search/config.ts`) translating each tab to this project's real `{entity, category, purpose}` scope. URL uses a new `tab` param (not `purpose`, reserved for the backend's own enum) to avoid collision. Backend (`src/lib/actions/public-search.ts`) extended for multi-select BHK/type and furnishing filter (mapped to real `furnishing_status` enum values, not the old project's). PG gender/sharing filters dropped (no backing field yet — avoids a dead filter). Sort options limited to the 6 the backend actually implements (dropped "Relevance"/area-ascending, which aren't implemented).

### Bug Found And Fixed
`SearchEmptyState`'s "Clear filters" link used the old `purpose` param name instead of `tab` — fixed and live-verified.

### Changed Files
`src/lib/search/config.ts`, `src/lib/actions/public-search.ts`, `src/app/search/page.tsx`, `src/components/search/{SearchResultsClient,SearchTabs,QuickFilters,FilterChips,MobileFilterSheet,SortDropdown,SearchEmptyState,PropertyResultCard,ProjectResultCard,RequirementResultCard,SearchPagination}.tsx`. Deleted `src/components/search/SearchFilterBar.tsx` (superseded).

### Tests Run
`npm run lint` → PASS, `npx tsc --noEmit` → PASS, `npm run build` → PASS. Live browser (375px + 1366px): tab switching, desktop sidebar filters, mobile filter sheet BHK/apply flow, sort dropdown, clear-filters recovery link — all verified working end-to-end with real published test data.

### Docs Updated
`CHANGELOG.md` (this entry), `brain.md`, Claude memory (`feedback_old_project_porting_boundary.md`, `MEMORY.md`)

### Next Step
Continue Prompt 05 manual verification or Prompt 06 dashboards. No further old-project design porting.

---

## 2026-07-01 — Prompt 05 Manual Verification: Public Search, Detail Pages, Profiles And SEO

### Summary
Ran the full `prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md` checklist. Live-verified `/search`, property/project detail pages, broker/builder profiles, sitemap, robots, hidden-contact safety, SEO metadata/canonical/noindex/schema, unpublished-entity denial, SQL-injection/XSS resistance, and responsive layout at 320/768/1024/1366px. Found and fixed 3 bugs (all cosmetic/SEO, none security-relevant). Created dev-only test data (1 project, 1 broker profile, 1 builder profile — all clearly named "DEV TEST ...", owner-approved) to close the previously-flagged live-verification gap for project/broker/builder routes.

### Bugs Found And Fixed
- `BUG-20260701-SEO-002` — page titles duplicated "My Gujarat Property" (layout title-template collision). Fixed on `/search`, `/property/[slug]`, `/project/[slug]`, `/broker/[slug]`, `/builder/[slug]`.
- `BUG-20260701-UI-004` — builder profile RERA disclaimer used `w-max`, causing horizontal overflow at 320px. Fixed.
- `BUG-20260701-UI-005` — desktop search sidebar showed duplicate BHK chips under the "Type" heading (`QuickFilters` rendered both rows regardless of which handler was wired). Fixed with new `showBhk`/`showTypes` props.

### Changed Files
`src/app/search/page.tsx`, `src/app/property/[slug]/page.tsx`, `src/app/project/[slug]/page.tsx`, `src/app/broker/[slug]/page.tsx`, `src/app/builder/[slug]/page.tsx`, `src/app/builder/[slug]/page.tsx` (disclaimer class), `src/components/search/QuickFilters.tsx`, `src/components/search/SearchResultsClient.tsx`

### Dev-Only Test Data Created (owner-approved, kept per owner's decision)
- 1 project: "DEV TEST Skyline Residency" (`dev-test-skyline-residency-1b51612e`)
- 1 broker profile renamed/published: "DEV TEST Realty" (`dev-test-realty`)
- 1 builder profile created/published: "DEV TEST Builders" (`dev-test-builders`)

### Tests Run
`npm run lint` → PASS, `npx tsc --noEmit` → PASS, `npm run build` → PASS (31 routes). Live browser: full route matrix, hidden-contact deep grep + DB column inspection, SQL-injection/XSS probes, responsive at 320/768/1024/1366px.

### Verification Result
`PASS`

### Docs Updated
`CHANGELOG.md` (this entry), `FEATURE_REGISTRY.md`, `BUGS_AND_FIXES.md`, `MANUAL_VERIFICATION.md`, `API_PROVIDER_STATUS.md`, `DEPLOYMENT_ROLLBACK.md`, `SECURITY_RLS_CHECKLIST.md`, `PERFORMANCE_CHECKLIST.md`, `brain.md`

### Known Issues
None blocking. Rate limiting on `/search` still deferred to Prompt 13 (unchanged, previously documented).

### Rollback Notes
All fixes are additive code-only changes (string/class/prop edits) — trivially revertible via git, no DB migration involved in this pass.

### Next Phase
`prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md`

---

## 2026-07-01 — Prompt 06: Owner, Broker And Builder Dashboards

### Summary
Completed the role-aware dashboard layer for Owner/Broker/Builder, building on the existing `DashboardShellV2` shell (sidebar/topbar/mobile-tab-bar) and `navConfig.ts` from earlier UI phases. Extended navigation to the full role-specific module lists (Overview, entity management, Leads/CRM, Saved Items, Proposals, Notifications, Billing, Verification, Public Profile, Profile, Support), wired real dashboard-overview counts from existing `getMyProperties`/`getMyRequirements`/`getMyProjects` server actions (replacing hardcoded `"—"` stats), fixed a genuinely dead notification-bell button by giving it a real (honest-empty-state) dropdown, and created 20 new dashboard sub-pages so every nav item is either functional or a clearly-labeled coming-soon/setup-required placeholder — no dead links.

### Changed/New Files
- `src/components/dashboard/navConfig.ts` — rewritten with full owner/broker/builder nav lists (10–12 items each), enabled the previously `disabled: true` Profile link
- `src/components/dashboard/DashboardSidebar.tsx` — nav list made independently scrollable (`overflow-y-auto flex-1`) to fit the longer nav
- `src/components/dashboard/DashboardTopbar.tsx` — swapped the dead `<Bell>` button for `<NotificationBell />`
- `src/components/dashboard/NotificationBell.tsx` (new) — functional dropdown, honest "No notifications yet" (no `notifications` table exists — full delivery is Prompt 12)
- `src/components/dashboard/DashboardPlaceholderPanel.tsx` (new) — shared coming-soon/setup-required/no-data panel reused across 15 placeholder pages
- `src/components/dashboard/VerificationStatusPanel.tsx` (new) — shows the account's real `verification_status`, never a fake badge
- `src/app/dashboard/owner/{leads,saved,notifications,billing,verification}/page.tsx` (5 new)
- `src/app/dashboard/broker/{leads,proposals,saved,notifications,billing,verification,public-profile}/page.tsx` (7 new)
- `src/app/dashboard/builder/{leads,requirements,ads,agents,notifications,billing,verification,public-profile}/page.tsx` (8 new)
- `src/app/dashboard/owner/page.tsx`, `broker/page.tsx`, `builder/page.tsx` — wired real `getMyProperties(1,1)`/`getMyRequirements(1,1)`/`getMyProjects(1,1)` counts into the overview stat cards; added Public Profile / Proposals action cards; "Profile Settings" card now `active` (was incorrectly `coming_soon` even though `/profile` already worked)
- `src/app/profile/page.tsx` — rewritten to use `DashboardShellV2` (was a bare unstyled page) so Settings/Profile is visually consistent with the rest of the dashboard

### Bugs Found And Fixed (during implementation, live-verified)
- Dead notification bell (`<button>` with no `onClick`) — violated "no dead buttons." Fixed with `NotificationBell`.
- `navConfig.ts`'s "Profile" nav item was `disabled: true` even though `/profile` was a fully working page — a real dead-nav-item bug. Fixed (now enabled, `active` when on `/profile`).
- Notification dropdown overflowed off the left edge of the viewport at 320–390px (`w-72` anchored `right-0` near a bell button that isn't at the topbar's outer edge). Fixed with a responsive `fixed inset-x-4 top-16` mobile layout that switches to the original anchored `absolute right-0` dropdown at `sm:` and up.

### Data/Analytics Honesty
- Properties/Requirements/Projects counts on all 3 overview pages are now real (`total` from existing paginated `getMy*` actions, fetched with `limit=1` to keep it cheap).
- Leads/Proposals/Units/Views remain `"—"` with an honest note ("Coming soon" / "Not tracked yet") — no backing table exists, so no fake number is shown.
- Verification status/badge is always the literal DB `verification_status` value — never hardcoded to "verified".
- Billing pages are `SETUP_REQUIRED` (link to public `/pricing`, no fake plan/invoice/Razorpay state).

### Security / Role Access (live-verified)
- Guest → any `/dashboard/*` → redirected to `/login?redirectTo=...` (intent preserved)
- Owner → `/dashboard/broker`, `/dashboard/builder` → `/unauthorized?reason=wrong_role` (no data rendered before redirect)
- Broker → `/dashboard/owner` → same denial
- All checks are server-side (`requireRole()` in each page component) — not client-only hiding
- No `/admin` link appears anywhere in dashboard nav/shell
- All `/dashboard/*` routes render dynamically (`ƒ` in build output) — not statically cached, satisfying the private no-store requirement implicitly

### Tests Run
`npm run lint` → PASS, `npx tsc --noEmit` → PASS, `npm run build` → PASS (58 routes). Live browser: full role-redirect matrix (guest/owner/broker/builder cross-role denial), real count verification (Owner showed real "Properties: 2", Broker/Builder showed real "0"), notification bell dropdown at desktop and 320px, sidebar scroll at 1024px with 12 nav items, mobile bottom-tab-bar at 390px, broker/builder "Public Profile" nav correctly showing each test account's own (unpublished) status.

---

## 2026-07-01 — Prompt 06 Verification: Owner, Broker And Builder Dashboards

### Summary
Ran the formal `prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md` checklist as a separate pass from the implementation (which had already done extensive live testing). Re-ran automated checks fresh, logged into all 3 test accounts live via the real mobile-OTP UI, re-tested the full cross-role/guest/admin denial matrix via raw `fetch(..., {redirect:'manual'})`, and closed the one real gap from the implementation pass — the full 7-width responsive matrix (320/360/390/430/768/1024/1366) is now all confirmed clean, not just 4 of 7.

### Verification Performed
- `npm run lint` / `npx tsc --noEmit` / `npm run build` → all PASS, all `/dashboard/**` routes confirmed dynamic (`ƒ`) in build output
- Guest denied `/dashboard`, `/dashboard/owner`, `/dashboard/broker`, `/dashboard/builder`, `/admin` — `opaqueredirect` at fetch level, homepage+login-modal on direct nav, no dashboard content pre-rendered
- Owner (9000000011), Broker (9000000012), Builder (9000000013) each logged in via real mobile-OTP UI (dev OTP `123456`) — each dashboard loaded with real own-account data only, each denied the other two role dashboards and `/admin`
- Code inspection: zero `href="#"` in dashboard files, zero service-role/provider-secret patterns, `PublicFooter`/`PublicLayout` never imported under `src/app/dashboard`, every dashboard page calls `requireRole()` (strict single-role, not `requireAnyRole`)
- Responsive: 320/360/390/430/768/1024/1366px all re-tested this pass, zero horizontal scroll at any width

### Result
`PASS`. See `MANUAL_VERIFICATION.md` "Prompt 06 Verification" entry for the full checklist. No blocking issues. Prompt 07 (`prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`) can start.

### Known Issues / Deferred (documented, not blocking)
- Property/project/requirement **edit forms** remain stub placeholders (pre-existing gap from Prompt 04, not introduced here) — they show the entity ID only, fetch no data, so there's no wrong-user leak risk, but they don't yet let a user actually edit.
- No dashboard-list pagination UI, search, or filter controls yet (lists still show first page of 20 via existing `getMy*` actions) — deferred, tracked.
- Leads/CRM, Proposals, Saved Items, Ads/Promotions, Agents/Team, Notifications, Billing, Matching Requirements are all real, honest placeholders — full functionality is Prompt 08 (leads/CRM), 09 (billing), 12 (notifications/ads), or a dedicated future phase (saved items, agents/team).

### Docs Updated
`CHANGELOG.md` (this entry), `FEATURE_REGISTRY.md`, `BUGS_AND_FIXES.md`, `MANUAL_VERIFICATION.md`, `API_PROVIDER_STATUS.md`, `DEPLOYMENT_ROLLBACK.md`, `SECURITY_RLS_CHECKLIST.md`, `PERFORMANCE_CHECKLIST.md`, `brain.md`

### Next Phase
`prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md`

---

## 21. Current Documentation Generation Progress

| File No. | File                                                      | Status  |
| -------: | --------------------------------------------------------- | ------- |
|        1 | `CLAUDE.md`                                               | Created |
|        2 | `brain.md`                                                | Created |
|        3 | `FEATURE_REGISTRY.md`                                     | Created |
|        4 | `CHANGELOG.md`                                            | Created |
|        5 | `BUGS_AND_FIXES.md`                                       | Pending |
|        6 | `MANUAL_VERIFICATION.md`                                  | Pending |
|        7 | `API_PROVIDER_STATUS.md`                                  | Pending |
|        8 | `DEPLOYMENT_ROLLBACK.md`                                  | Pending |
|        9 | `SECURITY_RLS_CHECKLIST.md`                               | Pending |
|       10 | `PERFORMANCE_CHECKLIST.md`                                | Pending |
|       11 | `docs/01_PROJECT_MASTER_AND_SCOPE.md`                     | Pending |
|       12 | `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`        | Pending |
|       13 | `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`         | Pending |
|       14 | `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`        | Pending |
|       15 | `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`          | Pending |
|       16 | `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`     | Pending |
|       17 | `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`     | Pending |
|       18 | `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`              | Pending |
|       19 | `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`       | Pending |
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`    | Pending |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Pending |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Pending |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Pending |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Pending |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 22. Prompt Pack Generation Progress

Prompt files are not generated yet.

Prompt pack will start after detailed docs are completed.

Prompt files must be changelogged when created.

Every prompt changelog entry must mention:

* prompt file path
* phase goal
* docs Claude must read
* expected output files
* expected SQL/migration files
* tests required
* verification requirements
* next prompt file
* manual verification file

---

## 23. Current Website Implementation Status

No website implementation has started yet.

| Area                     | Status         |
| ------------------------ | -------------- |
| Code setup               | NOT_STARTED    |
| Database setup           | NOT_STARTED    |
| SQL migrations           | NOT_STARTED    |
| Supabase Auth            | NOT_STARTED    |
| RLS                      | NOT_STARTED    |
| Public UI                | NOT_STARTED    |
| Dashboards               | NOT_STARTED    |
| Admin panel              | NOT_STARTED    |
| Property module          | NOT_STARTED    |
| Project module           | NOT_STARTED    |
| Requirement module       | NOT_STARTED    |
| Leads CRM                | NOT_STARTED    |
| Billing/payment          | SETUP_REQUIRED |
| Media/storage            | SETUP_REQUIRED |
| Provider integrations    | SETUP_REQUIRED |
| SEO/CMS/legal pages      | NOT_STARTED    |
| Security/rate limits     | NOT_STARTED    |
| Performance/load testing | NOT_STARTED    |
| Deployment/rollback      | NOT_STARTED    |
| Manual verification      | NOT_STARTED    |
| Production readiness     | NOT_STARTED    |

---

## 24. Changelog Maintenance Checklist

Before ending any future implementation phase, Claude must check:

* [ ] Did I add a changelog entry?
* [ ] Did I mention changed files exactly?
* [ ] Did I mention SQL/migration files exactly?
* [ ] Did I mention database/RLS impact?
* [ ] Did I mention security/privacy impact?
* [ ] Did I mention provider/API impact?
* [ ] Did I mention UI/responsive impact?
* [ ] Did I mention tests run?
* [ ] Did I mention exact reason if tests were not run?
* [ ] Did I mention manual verification result?
* [ ] Did I mention docs updated?
* [ ] Did I mention Feature Registry updates?
* [ ] Did I mention Bugs/Fixes updates if relevant?
* [ ] Did I mention rollback notes?
* [ ] Did I mention pending issues honestly?
* [ ] Did I mention next phase?
* [ ] Did I avoid fake completion?
* [ ] Did I avoid exposing secrets?
* [ ] Did I preserve existing working features?
* [ ] Did I avoid weakening security/RLS?
* [ ] Did I avoid skipping unclear requirements?

If any item is missing, do not mark the phase `PASS`.

---

## 25. Final Rule

Every phase must leave the project easier for the next Claude account to continue.

The changelog must be accurate, concise, chronological and honest.

If something is incomplete, blocked, untested, provider-dependent, unsafe or deferred, say it clearly.

Never hide pending work.

Never mark fake `DONE`.

---

### [2026-06-30] Prompt 03 — Public UI: Home, Header, Footer, Hero + Old Project UI Port

**Status:** `DONE`
**Categories:** `PUBLIC_UI` `ROUTING` `RESPONSIVE` `CORE`

#### Summary

Built the full public UI foundation (Prompt 03) including sticky role-aware header, hero search section, homepage sections, and public footer. Additionally ported the exact Hero Search Section and Header City Selector UI from the old project (`C:\Users\RAJAN\my-gujarat-property`) without redesign, keeping identical design, layout, spacing and responsive behavior.

#### Changed Files

- `src/app/globals.css` — added brand/ink/border/surface CSS design tokens in `:root` and `@theme inline` for Tailwind v4 color/radius/shadow utilities. Dark mode remains disabled.
- `src/app/page.tsx` — replaced minimal placeholder with full homepage (server component, ProfileLayout wrapper, hero + role cards + how it works + disclaimer sections)
- `src/components/layout/PublicLayout.tsx` — wrapper for public pages; now wraps with `CityProvider` for shared city context
- `src/components/layout/PublicHeader.tsx` — thin server wrapper passing profile to client header
- `src/components/layout/PublicHeaderClient.tsx` — sticky role-aware client header (brand, city selector, desktop nav, mobile drawer, profile dropdown, auth modal trigger, logout)
- `src/components/layout/PublicFooter.tsx` — 3-column footer (brand, explore, help/legal links), no dead links, no admin links
- `src/components/public/CitySelector.tsx` — REPLACED with old project's header CitySelector: city search input, all Gujarat cities list, outside-click/Escape close, `useCity` context, inline SVG icons, responsive (city name hidden below 380px)
- `src/components/public/HomeHeroSearch.tsx` — REPLACED with old project's SearchHero: purpose tabs (Buy/Rent/Commercial/Land/Projects/PG/Requirements), location input, property type select, budget select, BHK select, search button, quick city chips, trust badges. Exact design/layout/responsive behavior preserved.
- `src/components/public/HomeRoleCards.tsx` — 3 role cards (Owner, Broker, Builder) with SVG icons
- `src/components/public/HomeHowItWorks.tsx` — 4-step how it works section
- `src/components/public/HomeDisclaimer.tsx` — platform disclaimer section
- `src/components/auth/AuthTrigger.tsx` — auth-aware link (guest → login redirect, logged-in → destination)
- `src/components/location/CityProvider.tsx` — NEW: shared city context provider using static GUJARAT_CITIES (20 cities). No DB yet. Persists selection in localStorage. Provides `useCity()` hook to all descendants.
- `src/lib/utils/cn.ts` — NEW: simple classname concat utility (`cn()`)
- `src/lib/search/config.ts` — NEW: search configuration (SEARCH_TABS, PROPERTY_TYPES, BUDGET_PRESETS, BUDGET_LABEL, showsBhk, Purpose type, BHK_OPTIONS, parsePurpose) ported from old project
- `src/app/search/page.tsx` — search results placeholder (noindex, filter chips, clear link, no fake results)
- `src/app/support/page.tsx` — support page with real email
- `src/app/pricing/page.tsx` — pricing placeholder (noindex, SETUP_REQUIRED state)
- `src/app/legal/terms/page.tsx` — terms placeholder (noindex, 3 sections, lawyer-review notice)
- `src/app/legal/privacy/page.tsx` — privacy placeholder (noindex, 3 sections, lawyer-review notice)
- `.claude/launch.json` — dev server config for preview tool

#### SQL / Migration Files

- None (no database changes in this phase)

#### Database / RLS Impact

- None

#### Security / Privacy Impact

- No contact info leaked in public UI
- No admin/staff links in public footer
- No service role key in any new client component
- CityProvider uses only localStorage (no network, no user data)

#### Provider / API Impact

- Maps: `SETUP_REQUIRED` — city selector uses static list, no Google Maps API called
- All other providers: unchanged

#### UI / UX / Responsive Impact

- Public homepage, header, footer, hero, search, legal, support, pricing pages added
- Mobile 390px: hero stacks, tabs scroll horizontally, trust badges wrap, city selector compact
- Desktop 1280px: single-line hero, inline search fields, full nav, profile dropdown
- Old project hero design preserved exactly: gradient headline, trust pill, search card with tabs/filters/chips, trust badges

#### Tests Run

- `npm run lint` → PASS (0 errors)
- `npm run typecheck` → PASS (0 errors)
- `npm run build` → PASS (13 routes compiled cleanly)

#### Manual Verification

- Live browser (port 3000, `npm run dev`): PASS
- Desktop 1280px: hero renders, tabs work, city selector opens with search input, city chips highlight, trust badges show
- Mobile 390px: hero stacks, tabs scroll, city selector shows pin+name, hamburger opens drawer
- No horizontal scroll observed
- No dead buttons
- No fake data

#### Docs Updated

- `CHANGELOG.md` (this entry)
- `brain.md` (to be updated next)

#### Pending Issues

- CitySelector city list is static — DB-backed city list deferred to later phase
- Search results page shows placeholder — real search deferred to property listing phase
- Pricing page shows SETUP_REQUIRED — billing phase pending
- Legal pages marked noindex — final legal content requires lawyer review before production

#### Docs Updated

- `brain.md` — Prompt 03 resume guide updated with final PASS status
- `FEATURE_REGISTRY.md` — F03-001 through F03-029 all marked DONE/PASS
- `BUGS_AND_FIXES.md` — BUG-20260630-UI-001, 002, 003 logged and RESOLVED
- `MANUAL_VERIFICATION.md` — Prompt 03 verification entry added (PASS)
- `API_PROVIDER_STATUS.md` — Prompt 03 provider status entry added
- `DEPLOYMENT_ROLLBACK.md` — Prompt 03 rollback notes added
- `SECURITY_RLS_CHECKLIST.md` — Phase 03 security checks added (PASS)
- `PERFORMANCE_CHECKLIST.md` — Phase 03 performance checks added (PARTIAL — CWV deferred)

#### Verification Result

**PASS** — All automated checks (lint, typecheck, build) and live browser preview (all 7 widths: 320/360/390/430/768/1024/1366px) complete. No regressions. All docs updated.

#### Next Phase

- `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md` (for formal QA)
- Then: `prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`

---

## 2026-07-01 — Prompt 07: Admin, Staff And Super Admin System

### Summary
Implemented the internal admin/staff/Super Admin operating system on top of the existing Prompt 02 foundation (`staff_profiles`, `staff_permissions`, `staff_invites`, `adminLogin()`, `requireStaff()`/`requireStaffPermission()`, and the existing `/admin/login` + placeholder `/admin` page). Built a real permission-aware `AdminShell` (sidebar/topbar/mobile nav), staff management (invite/disable/enable/permission editor), moderation queues for properties/projects/requirements with real approve/reject/request-changes actions, user management (list/filter/detail/suspend/ban/restore/internal notes), a real admin audit log, and honest `SETUP_REQUIRED`/`coming_soon` placeholders for billing, providers, support/reports/fraud, CMS/SEO, settings/feature-flags, and system health.

### Changed/New Files
- `supabase/migrations/20260701150000_admin_staff_super_admin_system.sql` (new) — 6 new `staff_permissions` columns (`can_manage_provider/security/payment/staff/feature_flags/system`) + 4 new tables (`admin_audit_logs`, `admin_action_requests`, `admin_action_approvals`, `admin_internal_notes`), all RLS-enabled deny-all-direct-client
- `src/lib/admin/audit.ts` (new) — `logAdminAction()` shared audit-write helper
- `src/lib/admin/navConfig.ts` (new) — permission-aware admin nav builder
- `src/lib/admin/providerStatus.ts` (new) — env-var-presence-only provider status list (never prints values)
- `src/lib/actions/admin/staff.ts`, `moderation.ts`, `users.ts`, `audit.ts`, `verification.ts` (new) — all admin server actions, each gated by `requireStaffPermission()`/`requireStaff()`, all writes via service-role client + `logAdminAction()`
- `src/lib/permissions/index.ts` — added `canManageStaffPermissions`, `canManageProvider/Security/Payment/FeatureFlags/System`, `canViewAuditLog`
- `src/lib/auth/session.ts` — extended `requireStaffPermission()`'s Super Admin full-permission object with the 6 new fields; added `getStaffPermissionsByModule()`
- `src/types/index.ts` — extended `StaffPermission`, added `PermissionModule`, `StaffInvite`, `AdminAuditLog`, `AdminActionRequest`, `ModerationQueueItem`
- `src/components/layout/AdminShell.tsx`, `AdminSidebar.tsx`, `AdminTopbar.tsx` (new)
- `src/components/admin/ModerationQueueClient.tsx`, `StaffManagementClient.tsx`, `StaffPermissionEditor.tsx`, `UserListClient.tsx`, `UserDetailClient.tsx` (new)
- `src/app/admin/page.tsx` (rewritten — real counts, permission-aware nav, replaces old "Coming Soon" grid)
- `src/app/admin/staff/page.tsx`, `staff/[id]/page.tsx`, `staff/invites/page.tsx` (redirect), `moderation/page.tsx`, `moderation/{properties,projects,requirements}/page.tsx`, `users/page.tsx`, `users/[id]/page.tsx`, `verification/page.tsx`, `audit/page.tsx`, `support/page.tsx`, `billing/page.tsx`, `providers/page.tsx`, `settings/page.tsx`, `cms/page.tsx` (all new)
- `scripts/seed-super-admin.mjs` (new, dev-only) — creates a test Super Admin account for manual verification

### Bugs Found And Fixed (during implementation, live-verified)
- `StaffManagementClient`'s invite/staff list didn't reflect new data after `router.refresh()` — a client component's local `useState` doesn't reset from new props by default. Fixed using React's documented "adjusting state during render" pattern (comparing against a `prevInitial*` ref-state, not a `useEffect`, per `react-hooks/set-state-in-effect` lint rule) — live-verified the invite list now updates immediately after creating an invite, without a full page reload.

### Security / Role Access (live-verified)
- Guest → `/admin` → `opaqueredirect` at fetch level; direct nav → homepage, no admin content rendered
- Real logged-in Owner (mobile-OTP) → `/admin`, `/admin/staff`, `/admin/users`, `/admin/audit`, `/admin/providers` → all `opaqueredirect`; direct nav to `/admin` → clean "Admin Access Denied" page, no data pre-rendered
- Real Super Admin (email/password via `/admin/login`) → full dashboard access, all nav items enabled
- No `/admin` link anywhere in public header/footer/dashboard (pre-existing, re-confirmed)
- `grep href="#"` across all new admin files → zero matches
- `grep` for service-role/provider-secret env names across admin files → zero matches (providers page shows env-var-name + presence boolean only, never the value)
- All new `/admin/**` routes compile dynamic (`ƒ`) in `npm run build` — no static caching of private admin data

### Data/Audit Honesty
- Admin dashboard overview shows real pending-moderation counts (0 properties/projects/requirements before test, 1 after test data was submitted), real registered-user count (6), real active-staff count (1/1) — never fake
- Staff invite honestly reports `SETUP_REQUIRED` for the missing email provider instead of faking "email sent"
- Verification page shows real `profiles.verification_status` counts only, no fake badge
- Provider status page never marks a provider "Active" without a real test — shows "CONFIGURED (untested)" or "SETUP_REQUIRED" only
- Audit log is real and append-only: live-verified "invite_staff" and "request_entity_changes" entries appear with correct actor role, module, target, and timestamp after real actions

### Live Verification Performed
- Seeded one test Super Admin account (`testsuperadmin@mgptest.dev`, dev-only, approved by project owner) via `scripts/seed-super-admin.mjs`
- Full cross-role denial matrix: guest and real logged-in Owner, both denied all tested `/admin/**` routes
- Real Super Admin login via `/admin/login` (email/password, no OTP)
- Real staff invite created and persisted (`teststaffinvite@mgptest.dev`, Support Manager role) — confirmed in DB and UI after refresh
- Real property moderation: temporarily moved one existing test property (`HOUSE FOR SALE IN RAJOKOT`) to `pending` approval status, used the live "Request Changes" action with a reason — confirmed DB updated to `need_changes`/`need_changes` and an `admin_audit_logs` row was created
- Responsive: 320px, 375px, 1366px all confirmed clean, no horizontal scroll, mobile tab bar functional
- `npm run lint` / `npx tsc --noEmit` / `npm run build` → all PASS

### Tests Run
`npm run lint` → PASS, `npx tsc --noEmit` → PASS, `npm run build` → PASS (all `/admin/**` routes dynamic). Live browser verification as above.

### Known Issues / Deferred
- Maker-checker foundation (`admin_action_requests`/`admin_action_approvals` tables) exists per spec but has no UI wired to it yet — explicitly documented as `PARTIAL`, not claimed complete
- 360/390/430/768px not individually re-screenshotted this pass (320/375/1366 covered; same breakpoints already verified safe in Prompt 05/06)
- Project/requirement moderation approve/reject not runtime-tested this pass (no pending test data existed for those types) — code-reviewed, shares the exact same action functions as the live-tested property flow
- User suspend/ban/restore not runtime-tested this pass (would restrict a real test account) — code-reviewed only

### Rollback Notes
- **Code:** all new files; revert via git if needed, no existing working code was removed (only `/admin/page.tsx` was rewritten — old version is in git history)
- **Database:** additive only (new columns default `false`, new tables). Rollback SQL commented at the bottom of the migration file if ever needed
- **RLS:** all 4 new tables ship with RLS enabled + deny-all-direct-client from creation — no window where they were unprotected

### Manual Verification
Pending formal run of `prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md` as its own separate pass (this implementation pass already covered most of its checklist live, per `MANUAL_VERIFICATION.md`).

---

## 2026-07-01 — Prompt 07 Verification: Admin, Staff And Super Admin System

### Summary
Ran the formal `prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md` checklist as a separate pass. Closed every gap the implementation pass had left open: seeded a second, deliberately zero-permission staff account and live-tested permission-aware nav/denial at three escalating permission levels, tested disabled-staff login denial, ran 4 direct RLS probes against the live database via the anon-key client (bypassing the app entirely), and completed the full 7-width responsive matrix.

### Verification Performed
- `npm run lint` / `npx tsc --noEmit` / `npm run build` → all PASS, all `/admin/**` routes confirmed dynamic (`ƒ`)
- Seeded `testlimitedstaff@mgptest.dev` (functional role `support_manager`, zero permissions granted) — confirmed denied even the `/admin` dashboard itself (`Permission Denied`, since the overview requires `properties.can_read`)
- Granted `users.can_read` only → confirmed `/admin/users` accessible with real data, every other module still denied at both the nav level (disabled, not a link) and the fetch level (`opaqueredirect`/redirect)
- Granted `properties.can_read` (no approve/reject) → confirmed the moderation queue is viewable but Approve/Reject/Request-Changes buttons do not render
- Disabled the same test account → confirmed login correctly rejected: "Your staff account is not active. Please contact a Super Admin."
- **Direct RLS probes (anon-key client, no app code path):**
  1. Anonymous select on all 9 admin/staff/private tables → 0 rows every time
  2. Authenticated Super Admin, unfiltered `select * from staff_profiles` → only 1 row returned (own row) — RLS scopes even an unfiltered query
  3. Authenticated Super Admin, direct `update staff_permissions` on own row → 0 rows affected — no staff-write policy exists, self-grant impossible even at the DB layer
  4. Authenticated Super Admin, direct select on `admin_audit_logs` → 0 rows — even Super Admin cannot read audit logs except through the service-role-backed `listAuditLogs()` action
- Responsive: 360px, 390px, 430px, 768px, 1024px all re-tested this pass (320/1366 already covered) — all 7 required widths now clean, no horizontal scroll
- `grep` sweep across all of `src/` (not just `src/app/admin`) for `href="#"`, provider secrets, and public admin links → zero matches
- Confirmed `robots.ts` disallows `/admin` and `sitemap.ts` explicitly excludes admin/dashboard routes

### Result
`PASS`. See `MANUAL_VERIFICATION.md` "Prompt 07 Verification" entry for the full checklist. No blocking issues. Prompt 08 (`prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`) can start.

---

## 2026-07-01 — Prompt 08: Leads, CRM, Requirements, Proposals And Messages

### Summary
Implemented the full communication and conversion foundation: real inquiry/lead creation with duplicate prevention, CRM stages with a real timeline, a contact request/reveal flow gated by each listing's `contact_visibility` setting, proposals with requirement-matching for builders and an open-requirements browse for brokers, 2-party message threads with real unread counts, site visit request/respond/reschedule/cancel, saved items/searches/recently-viewed, and real DB-backed in-app notifications (replacing the Prompt 06 "always empty" honest placeholder with actual events).

### Changed/New Files
- `supabase/migrations/20260701160000_leads_crm_requirements_proposals_messages.sql` (new) — 15 new tables, all RLS-enabled
- `src/types/index.ts` — added `Lead`, `LeadNote`, `LeadFollowup`, `CrmEvent`, `ContactRequest`, `Proposal`, `MessageThread`, `Message`, `SiteVisit`, `SavedItem`, `SavedSearch`, `RecentlyViewedItem`, `AppNotification`, `UserReport`, `UserBlock` + supporting enums
- `src/lib/actions/{leads,contact,proposals,messages,site-visits,saved,notifications,blocks}.ts` (new) — all server actions
- `src/lib/crm/events.ts`, `src/lib/notifications/create.ts` (new) — shared timeline/notification writers
- `src/lib/permissions/communication-permissions.ts` (new) — participant checks + status-transition validators
- `src/lib/dashboard/navForRole.ts` (new) — resolves nav/mobile-tabs/label by role for the new shared cross-role pages
- `src/components/leads/{CrmStageBadge,LeadListClient,LeadDetailClient}.tsx`, `src/components/proposals/{ProposalListClient,RequirementProposeClient}.tsx`, `src/components/messages/ThreadListClient.tsx`, `src/components/saved/SavedItemsClient.tsx`, `src/components/notifications/NotificationListClient.tsx` (all new)
- `src/components/detail/DetailCTABar.tsx` (rewritten) — was a dead-button auth-gate-only placeholder (Prompt 05/07 note: "full leads/contact-reveal backend is Prompt 08"); now creates a real lead on click and toggles real save state
- `src/app/property/[slug]/page.tsx`, `src/app/project/[slug]/page.tsx` — wired `isItemSaved`/`trackRecentlyViewed`/`DetailCTABar` props
- `src/app/dashboard/{owner,broker,builder}/leads/page.tsx` (rewritten) — real receiver-side + requester-side lead lists, replacing the Prompt 06 "Coming Soon" placeholder
- `src/app/dashboard/broker/proposals/page.tsx`, `src/app/dashboard/builder/requirements/page.tsx` (rewritten) — real proposals/matching, replacing placeholders
- `src/app/dashboard/{owner,broker}/saved/page.tsx` (rewritten) — real saved items, replacing placeholders
- `src/app/dashboard/{owner,broker,builder}/notifications/page.tsx` (rewritten) — real notification list, replacing the honest empty-state placeholder
- `src/app/dashboard/leads/[id]/page.tsx`, `src/app/dashboard/messages/page.tsx` (new) — shared cross-role lead detail hub (contact/timeline/notes/followups/messages/site-visit) and thread list
- `src/app/dashboard/{owner,broker,builder}/page.tsx` — wired real lead/proposal counts into overview stat cards (were hardcoded `"—"`/"Coming soon")
- `src/components/dashboard/NotificationBell.tsx` (rewritten) — real unread badge + real notification list + mark-read, replacing the Prompt 06 "always empty, no table exists yet" honest placeholder now that `notifications` exists
- `src/components/dashboard/navConfig.ts` — added "Messages" nav item to all 3 roles

### Data/Privacy Honesty
- Contact reveal is real and gated: `properties.contact_visibility` (`show_after_login`/`show_after_approval`/`hidden`/`show_to_verified_users`/`public`) drives auto-approval vs. manual receiver-approval vs. permanent denial. Projects have no `contact_visibility` column — per existing product rule (docs/06), project contact auto-reveals to any logged-in user.
- Reveal is one-directional by design: the requester can see the receiver's contact once authorized; the receiver never automatically sees the requester's contact (matches how real estate inquiry forms work — requester opts in by inquiring, receiver's contact is the thing being requested).
- No fake lead/message/proposal/site-visit/notification data anywhere — every list is a real DB query, every empty state says so honestly.
- Unread message/notification counts are computed live from `created_at > last_read_at` comparisons — never hardcoded.

### Security / RLS (live-verified)
- All 15 new tables RLS-enabled; anonymous reads return 0 rows on every one (confirmed via direct anon-key probe, bypassing the app)
- Wrong user (Builder, not a lead participant) → `/dashboard/leads/[id]` → RLS denies the underlying `leads` select (0 rows) before the app layer even runs its own participant check → resolves to a real Next.js 404, not an error page that would confirm the lead's existence
- Service role confined to `"use server"` action files and `server-only`-guarded lib files only

### Live Verification Performed
- Real Broker → real Owner property → "Contact / Request Number" → real lead created, navigated to `/dashboard/leads/[id]`
- Real contact reveal auto-approved (property's `contact_visibility='show_after_login'`) — real mobile number (`9000000011`) shown only to the requester
- Real message sent Broker→Owner, appeared on both sides after `router.refresh()`
- Real CRM stage change by Owner (receiver): `new`→`contacted`, badge updated, `stage_changed` timeline event created
- Real save/unsave toggle on property detail page, persisted across reload
- Real notification badge showed "2" (unread) for Owner after Broker's inquiry + message — matches exactly 2 real events
- Real dashboard stat cards: Owner "Leads: 1 / Total received", replacing the old "—/Coming soon"
- Responsive: 320px, 375px, 768px, 1366px all confirmed clean, no horizontal scroll

### Tests Run
`npm run lint` → PASS, `npx tsc --noEmit` → PASS, `npm run build` → PASS (all `/dashboard/leads/[id]` and `/dashboard/messages` routes dynamic).

### Known Issues / Deferred
- Lead notes/follow-ups/site-visit-request/proposal-send were code-reviewed but not all runtime-submitted this pass (notes/follow-ups UI is present and functional per code review; proposal-send requires an open requirement, none existed in test data this pass)
- Saved searches and recently-viewed have real server actions but no dashboard UI wired to them yet — foundation only, honestly not surfaced
- Message attachments not implemented — no media storage exists yet (Prompt 10/12), honestly absent rather than faked
- Admin oversight of leads/messages/reports not built this pass — out of scope, deferred

### Rollback Notes
- **Code:** all new files, plus `DetailCTABar.tsx` rewritten (prior dead-button version recoverable from git history) and `NotificationBell.tsx` rewritten (prior "always empty" version recoverable from git history)
- **Database:** additive only (15 new tables, no existing table altered). Rollback SQL commented at the bottom of the migration file
- **RLS:** all 15 new tables shipped with RLS enabled from the same migration that created them — no window where they existed unprotected
- **Privacy/cache:** all new `/dashboard/**` routes confirmed dynamic in `npm run build` output — no static caching of private lead/message/proposal data

### Manual Verification
Pending formal run of `prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md` as its own separate pass.

---

## [2026-07-02] Inquiry Flow Port — Property/Project Enquiry + Admin Leads Queue

### Summary
Ported the previous project's inquiry behavior (user-requested, approved exception to the porting boundary). Property/project detail "Send Enquiry" now opens an enquiry form modal (name, profile/alternate contact number choice, interest type, optional message, consent notice). After sending, the detail page shows the inquiry status (stage badge + "View" link to the lead) and a second inquiry on the same listing is blocked. Only Owner accounts can send inquiries — Broker and Builder are restricted (UI note + server enforcement). New `/admin/leads` queue lists all platform inquiries with stage tabs.

### Changed Files
- `supabase/migrations/20260702090000_leads_inquiry_form_fields.sql` (new — applied to live dev DB with owner approval)
- `src/lib/leads/inquiry-config.ts` (new — INTEREST_TYPES, CRM_STAGE_FILTERS, maskMobile)
- `src/lib/actions/leads.ts` — `createInquiry` enquiry-form fields + `ROLE_RESTRICTED` + `DUPLICATE_INQUIRY` + `SETUP_REQUIRED` mapping; new `getMyInquiryForTarget`
- `src/components/detail/DetailCTABar.tsx` — rewritten: enquiry modal + status chip + owner-only restriction (save button unchanged)
- `src/app/property/[slug]/page.tsx`, `src/app/project/[slug]/page.tsx` — viewer + existing-inquiry props
- `src/lib/actions/admin/leads.ts` (new), `src/app/admin/leads/page.tsx` (new), `src/lib/admin/navConfig.ts` (Leads nav item, module key `leads`)
- `src/types/index.ts` — `Lead` interface +6 snapshot fields

### Security / Privacy
- Owner-only rule enforced inside `createInquiry` (server), not just UI. Requirement-target path exempt — broker proposals reuse `createInquiry` and are unchanged.
- Phone snapshots (`profile_phone`/`lead_phone`) are participant/staff-only via existing leads RLS; enquiry form shows the profile number masked (`+91 90••••011`) and a consent line; profile mobile is never overwritten.
- `/admin/leads` shows no contact data; gated by `requireStaffPermission("leads","can_read")`.

### Verification
`npm run lint` PASS · `npm run typecheck` PASS · `npm run build` PASS · live browser verification PASS (see MANUAL_VERIFICATION.md 2026-07-02 entry).

### Notes / Deferred
- Dev test lead `dd0e4086` (Test Owner → DEV TEST Skyline Residency, created during the 2026-07-01 dev pass) was deleted to enable a fresh-send live test.
- Inquiry rate-limit/cooldown beyond the permanent per-target uniqueness (CRM-004) remains `NOT_STARTED`.
- Old project's phone-reveal/WhatsApp buttons were intentionally NOT ported — mgpweb keeps its own contact-request flow (`src/lib/actions/contact.ts`); user asked for the inquiry-button behavior only.

---

## [2026-07-02] Guest Inquiry → In-Place Login Popup (property + project)

### Summary
Fixed guest inquiry behavior to match the previous project: clicking "Send Enquiry" (or Save) as a guest on a property/project detail page now opens the login/register popup IN PLACE — no full-page redirect to /login and no landing on the dashboard. After logging in via the popup, the user stays on the same detail page (router.refresh) and can immediately send the inquiry. No role redirects to dashboard on inquiry.

### Changed Files
- `src/components/auth/AuthModalProvider.tsx` (new) — app-wide `useAuthModal().openAuth(next?)` context (mirrors old project), renders existing AuthModal
- `src/components/layout/PublicLayout.tsx` — wraps public pages in AuthModalProvider
- `src/components/layout/PublicHeaderClient.tsx` — uses shared provider instead of its own local AuthModal state (removes duplicate modal)
- `src/components/detail/DetailCTABar.tsx` — guest enquiry + save buttons call `openAuth(currentPath)` instead of `AuthTrigger` page redirect

### Behavior
- Header Login/Register → `openAuth()` (no `next`) → dashboard after auth (CLAUDE.md §13 intent).
- Detail-page inquiry/save → `openAuth(currentPath)` → returns to the same page after auth.
- `AuthTrigger` component retained but no longer used by DetailCTABar.

### Verification
`npm run lint` PASS · `npm run typecheck` PASS · `npm run build` PASS. Live (DOM-verified; screenshot tool timed out but eval confirmed page responsive):
- Guest on property detail → Send Enquiry → login popup opens in place, URL unchanged (no redirect) — PASS
- Popup login (9000000011) → stays on property page, header shows Test Owner, popup closed, no dashboard redirect — PASS
- Guest on project detail → Send Enquiry → login popup opens in place, URL unchanged — PASS
- Owner/Broker/Builder: no dashboard redirect on inquiry (owner → form, broker/builder → restricted note) — PASS

---

## [2026-07-02] Property/Project Detail Pages — Old-Project 2-Column Layout (visual port)

### Summary
Rebuilt `/property/[slug]` and `/project/[slug]` to reproduce the previous project's detail-page layout 1:1 (user-approved full visual port). mgpweb's design tokens (`--surface`, `--ink`, `--border`, `--brand`, `rounded-card`, `shadow-soft`) are identical to the old project's, so the visual matches. Kept mgpweb's real data + the working inquiry-popup/owner-only/status logic (DetailCTABar).

### New layout (both pages)
- `min-h-screen bg-surface-subtle` wrapper, `max-w-5xl`, breadcrumb, gallery
- 2-column grid `lg:grid-cols-[1fr_320px]` — main content + sticky contact sidebar (`lg:sticky lg:top-20`)
- Price/title/location block with purpose/type chips; Quick facts grid; Description/About; Amenities chips; Location + map placeholder ("Map view isn't enabled yet"); marketplace disclaimer
- "Contact" card (DetailCTABar) + "Listed by" seller card (DetailSellerCard) in sidebar (desktop) / inline (mobile)
- Project extras: RERA alert, unit-configurations table (renders only real rows), virtual-tour link
- Similar properties/projects grid (real, bounded, same city; hidden when empty)

### Changed / New Files
- `src/components/detail/DetailQuickFacts.tsx` (new) — facts grid (old QuickFacts visual)
- `src/components/detail/DetailSellerCard.tsx` (new) — "Listed by" card (old SellerCard visual)
- `src/lib/actions/public-search.ts` — `getSimilarProperties` + `getSimilarProjects` (real, bounded)
- `src/app/property/[slug]/page.tsx`, `src/app/project/[slug]/page.tsx` — rebuilt with 2-col layout
- Reuses existing `PropertyResultCard`/`ProjectResultCard`, `DetailGallery`, `DetailCTABar`, `Alert`

### No-fake honesty
- Media still placeholder (R2 not wired) — no fake photos. Map placeholder (no provider). Facts/description/amenities/similar/unit-config sections hide when there is no real data. No dead buttons (report/phone-reveal not added — not wired).

### Verification
`npm run lint` PASS · `npm run typecheck` PASS · `npm run build` PASS. Live (DOM + preview_inspect + screenshot):
- Project page: 2-col grid `648px 320px`, sticky sidebar `position:sticky; top:80px`, RERA alert, 8 quick-fact cards, "Listed by DEV TEST Builders", contact card — PASS
- Property page: same layout; sparse test listing correctly hides empty sections — PASS
- Inquiry popup still opens in place inside the new layout — PASS
- Responsive 375px: single column, no horizontal scroll, contact visible — PASS; desktop 1280px 2-col — PASS

## 2026-07-02 — Prompt 08 Verification (Formal Pass): Leads, CRM, Requirements, Proposals, Messages

- Ran formal manual-verification pass per `prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`.
- Automated: `npm run lint` PASS · `npm run typecheck` PASS · `npm run build` PASS (all communication routes dynamic `ƒ`, none static-cached).
- Code-verified: migration `20260701160000` (15 RLS-enabled tables, participant-scoped policies, rollback notes); all server actions (`leads/contact/messages/proposals/site-visits/saved/notifications/blocks/admin.leads`) enforce auth + participant/role checks; duplicate prevention (unique constraint + 23505 handling); real counts + real unread counts (no fakes); contact reveal authorization-gated; admin leads list masks phone/email; notification payloads carry no contact.
- Route protection verified: `src/proxy.ts` guards `/dashboard` + `/admin`; per-page `requireRole`/`requireAuth`/`requireStaff`. Live: guest → `/dashboard/messages` redirects to `/login?redirectTo=…` (intent preserved).
- Privacy: `robots:{index:false}` + `force-dynamic` on comm pages; sitemap excludes dashboard/admin; no service-role in client; secret greps clean.
- Result: **PASS** (core) with documented PARTIAL/SETUP_REQUIRED foundation items (message attachments, external notification delivery, rate limiting; proposal/block-report runtime code-verified only). No blocking issues.
- Verification detail: `MANUAL_VERIFICATION.md` "Prompt 08 Verification — … (Formal Pass)". **Prompt 09 (`prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`) can start.**

## 2026-07-02 — Prompt 09: Billing, Payment, Subscription, Trial And GST (Implementation)

**Summary:** Real commercial foundation — role-wise plan catalog, subscriptions + lifecycle, usage counters, Razorpay order + verified-webhook-only payments, sequential GST invoices, trials, coupons, add-ons + refund/credit-note foundation, posting gates, admin billing, all RLS-protected. No fake payment/invoice/GST/subscription anywhere.

**Migration:** `supabase/migrations/20260702100000_billing_payment_subscription_trial_gst.sql` — 19 tables + `mgp_next_invoice_number()` + seed plans. Additive, non-destructive, RLS on all. NOT yet applied to remote (owner apply pending).

**Changed / new files:**
- lib: `src/lib/razorpay/client.ts`, `src/lib/billing/{gst,subscription,gates,format}.ts`
- actions: `src/lib/actions/{billing,payments}.ts`, `src/lib/actions/admin/billing.ts`
- gates wired: `src/lib/actions/{properties,projects,requirements}.ts` (submit-for-approval)
- routes: `src/app/api/webhooks/razorpay/route.ts`
- UI: `src/app/pricing/page.tsx` (rebuilt), `src/components/pricing/PricingPlans.tsx`, `src/components/billing/{BillingDashboard,GstProfileForm}.tsx`, `src/app/dashboard/{owner,broker,builder}/billing/page.tsx`, `src/app/dashboard/billing/gst/page.tsx`, `src/app/admin/billing/page.tsx`
- types: `src/types/index.ts` (billing types)
- env: `.env.local` (Razorpay test keys + `BILLING_GATES_ENFORCED`)

**Security:** activation webhook-only; HMAC raw-body signature verify + idempotency; server-side price; RLS on all tables (no client write on money tables); coupons not public-readable; secrets server-only; admin masks payment ids; noindex + force-dynamic.

**Provider status:** Razorpay TEST_MODE (keys set); Webhook SETUP_REQUIRED (secret empty → endpoint 503, verified live); PDF/email/GST-validation/cron NOT_STARTED/SETUP_REQUIRED.

**Checks:** `npm run lint` PASS · `npm run typecheck` PASS · `npm run build` PASS (billing routes dynamic `ƒ`). Runtime: webhook → 503 setup-required (verified); pricing → honest "Plans Coming Soon" when schema absent (verified). `npm test` NOT_CONFIGURED (no test script).

**Status:** `DONE` (implementation) — manual verification pending `prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`. Runtime billing flow pending migration apply + webhook secret.

---

## [2026-07-02] Detail Pages — Reverted redesign to minimal single-column (user request)

### Summary
Per user request ("undu kardo pehle jaisa"), fully undid the 2-column old-project detail-page port from earlier today. `/property/[slug]` and `/project/[slug]` are back to a simple single-column layout: breadcrumb → gallery → title/type/price block → DetailCTABar → description (project keeps builder link + RERA alert). No git/backup existed, so this is a clean minimal reconstruction (user chose "Poora undo").

### Changed / Removed Files
- `src/app/property/[slug]/page.tsx`, `src/app/project/[slug]/page.tsx` — rewritten minimal single-column
- Deleted `src/components/detail/DetailQuickFacts.tsx`, `src/components/detail/DetailSellerCard.tsx` (this-session additions, now unused)
- `src/lib/actions/public-search.ts` — removed `getSimilarProperties` / `getSimilarProjects`

### Kept (not part of the revert)
- AuthModalProvider + DetailCTABar in-place login popup (guest inquiry → popup, owner-only, status, duplicate block) — unchanged, still working.

### Verification
`npm run lint` PASS · `npm run typecheck` PASS · `npm run build` PASS (both /property/[slug] and /project/[slug] compile). Live browser preview: BLOCKED this session — the preview server would not register with the preview tools and was unreachable via curl (another chat holds this folder's dev server). Change is removal-only; DetailCTABar inquiry-popup logic is untouched and was live-verified earlier today.

## 2026-07-04 — Finished design integrated into docs/prompts (design = source of truth)

User delivered the complete finished 17-batch wireframe design (`C:\Users\RAJAN\Documents\MGP DESIGN`). Analysis + doc realignment done (no app code changed this entry):
- Extracted all 17 bundled design files; analyzed vs docs → 17 delta reports in `design-prompts/delta-reports/` + consolidated `design-prompts/DESIGN_ADDONS_MASTER.md`.
- CLAUDE.md §3A added (Design Source Of Truth, 2 new global rules, 5 locked conflict resolutions).
- "Design Add-Ons" sections added to docs 04–14 + 16; DESIGN SOURCE banners added to phase prompts 03–14 (+ verification prompts).
- FEATURE_REGISTRY.md: Design Add-On Features table (~24 features). brain.md resume entry added.
- Pending: regenerate `Calude Prompt.pdf`; then implement (replace screens 1:1 + build add-ons).

## 2026-07-04 — Prompt 01 Re-Baseline (verification pass)

Re-ran the Project Setup Baseline against the current codebase (Prompts 01–09 already built).
- **Checks:** `npm run lint` PASS (0 errors), `npm run typecheck` PASS (tsc --noEmit, exit 0), `npm run build` PASS (all routes compile; private/dashboard/admin routes `ƒ` dynamic; Proxy middleware present).
- **Baseline inspection:** npm (single lockfile), Next 16.2.9 / React 19.2.4 / TS 5 / Tailwind 4 / Supabase SSR / zod / lucide-react. `.env.example` placeholders only (no secrets). 7 migrations. Routes extensive.
- **Doc fix (BUG-20260704-DOCS-001):** reconciled stale "current status" summaries in `FEATURE_REGISTRY.md` §5, `API_PROVIDER_STATUS.md` §8, `brain.md` §2 to match the real phase-log state. No app code changed.
- **Result:** implementation PASS for baseline checks; formal sign-off pending `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md`.

## 2026-07-04 — Prompt 01 Manual Verification: PASS
Baseline verified: lint/typecheck/build/format all pass; Supabase client/server/service boundaries correct (service role server-only, verified across 26 importers); no secrets in src or .env.example; security headers present; no fake data / dead links / public admin link; providers honest. Result PASS — cleared to continue.

## 2026-07-04 — Prompt 02 (design alignment): Auth UI aligned to finished Batch 2 wireframes

Backend/RLS foundation was already built & PASS; this pass aligns the auth UI 1:1 to the finished design.
- **Brand token locked to design:** `--brand` #0f7b6c → **#0F6B5C** (hover #0C5648, soft #E7F2EF) in `globals.css` (app-wide, single source).
- **New** `src/components/auth/OtpInput.tsx` — 6-box OTP: first box auto-focused, auto-advance, backspace-back, paste-fill, **auto-submit on 6th digit**.
- **MobileOtpForm** rebuilt: consent checkbox gating Continue (disabled until 10 digits + consent), masked number "+91 9XXXX XX210" + "Change" link, 6-box OTP, **resend cooldown** ("Resend OTP in 0:NN"), **remaining-attempt counter** ("N attempts left") → honest "Too many attempts / try again in 15 minutes" full-stop, brand tokens.
- **RegisterRoleForm** rebuilt: role chip ("Registering as <Role> · Change number"), email helper ("Used for receipts and account recovery"), 6-box OTP + cooldown, brand tokens.
- **RoleSelector** rebranded to brand teal + design copy ("Who are you? This decides your dashboard…").
- Consent/legal links repointed to `/legal/terms` `/legal/privacy` (real routes).
- Checks: lint PASS, typecheck PASS, build PASS. Live: /login modal renders, consent gates Continue (verified both states), Continue = rgb(15,107,92)=#0F6B5C, no console errors.
- Note: remaining-attempt counter + resend cooldown are the design's visible UI states; real server-side OTP rate-limit/lockout remains the deferred Prompt 13 item (BUG-20260630-AUTH-003).

## 2026-07-04 — Prompt 02 TRUE PORT: Auth modal rebuilt from actual Batch 2 design markup

Corrected the earlier restyle → this is a true 1:1 port of the finished Batch 2 auth wireframes (read from design-extract, exact inline-style values: brand #0F6B5C, Inter weights, #E7F2EF focus rings, exact copy/spacing). Current markup replaced; backend wiring (checkMobileExists/requestOtp/verifyOtpAndLogin/verifyOtpAndRegister, RegistrationData) kept.
- `AuthModal.tsx` — desktop centered modal (max-w-400/460, r16, shadow 0 12px 32px, backdrop rgba(24,24,27,.45)) / mobile bottom sheet (r20, drag handle, shadow 0 -8px 32px); header = brand logo square + close.
- `MobileOtpForm.tsx` — "Login or register" entry (exact copy + "Continue stays disabled until consent is ticked + 10 digits entered."), consent-gated Continue; "Welcome back" OTP step w/ masked "+91 9XXXX XX210 · Change", 6-box auto-submit, "First box auto-focused · auto-advance · auto-submit on 6th digit" helper, resend cooldown "Resend OTP in 0:NN · link disabled during cooldown", red attempt-counter banner ("N attempts left"), honest "Too many attempts / 15 minutes" full-stop, and "SMS OTP temporarily unavailable" provider-down state — all ported from the design.
- `RegisterRoleForm.tsx` — design flow role → form → OTP: "Who are you?" role cards → "Create your account" (role chip "Registering as <Role> · Change", email helper "Used for receipts and account recovery.", locked mobile "Prefilled from the previous step.", mandatory consent) → "Verify your number" 6-box.
- `RoleSelector.tsx` — exact role cards (selected = 1.5px #0F6B5C + #E7F2EF bg + white icon square + filled radio; hover lift on others), lucide icons.
- `OtpInput.tsx` — boxes restyled to design (h52/54, font 600 20px, #d4d4d8 border, #0F6B5C + #E7F2EF focus ring, #DC2626 error); overflow-safe flex width for 320–375px.
- Checks: lint PASS, typecheck PASS, build PASS. Live /login (desktop + 375px mobile): renders exact design (screen 1 entry + screen 8 role selector verified via screenshot), brand teal, no console errors, no horizontal overflow at 375px.

## 2026-07-09 — T04-01 property detail page ported to Batch 4 design (d-prop/d-report/d-gallery)

Replaced the property detail screen's markup/layout to match Batch 4 (`d-prop` + `d-report`/`d-gallery`) 1:1, keeping all existing data-fetching/server actions.
- **KeyFacts** (`DetailSections.tsx`) rewritten from a bordered label/value grid to a chip/pill row under the address line — real fields only.
- **AmenitiesSection** rewritten to a 3-column icon+label grid; icon lookup covers common real-estate amenity strings with a default fallback icon (no amenity ever dropped) — amenities collection itself is not yet wired in `PropertyForm.tsx` step 5, so the free-form list stays empty until that ships.
- **LocationSection** now shows a map placeholder tile side-by-side with the honest "Setup Required" address card (Maps provider not configured).
- **DetailHeader**/`DetailShell` gained `showCityPill` prop (default `true`, preserves other detail screens); property detail passes `false` to match the design's condensed desktop header (brand + search + auth only, no city pill).
- **DetailCTABar** rewritten: desktop sidebar contact card (avatar/initials, verified badge only if real, role pill, honest "Setup Required" note in place of a phone-reveal action — no real reveal-contact server action exists yet — and Enquire Now) + mobile sticky Call/Enquire bar. Added `poster: PosterInfo` prop (name/roleLabel/verified — name/verified are `null`/`false`, never faked, since the public property view doesn't join poster display/verification data yet).
- **New `DetailOverflowMenu.tsx`** ("⋮" near price): Share, Save/Unsave, Report listing — replaces the previously-standalone `ShareButton` + inline Save icon (removed `ShareButton.tsx`, now dead). Report reuses the existing `ReportModal` in a new **controlled mode** (`open`/`onOpenChange` props) instead of duplicating the report UI.
- `page.tsx` restructured into an `lg:grid` two-column layout (content + sticky sidebar contact card) matching the design; mobile keeps single column + sticky bottom bar.
- `DetailGallery.tsx` / `FullscreenGallery.tsx` (grid layout, "View all N photos", keyboard nav, thumbnail strip, mobile swipe+dots) were already present/matching from a prior pass — left as-is, verified.
- `UnavailableEntityState.tsx` left generic (no moderation-reason leak, per CLAUDE.md §38) — the design's "Similar in locality" block was **not** added; deferred (see Pending Issues).
- Checks: `npm run lint` PASS, `npx tsc --noEmit` PASS, `npm run build` PASS (all routes compile). Live-verified in-browser at 1366/768/390/320px: no horizontal scroll, sidebar contact card + mobile sticky bar render, overflow menu (Share/Save/Report) opens and Report modal respects the existing login gate, unavailable-slug state renders generically with no leaked reason.
- **Deferred (SETUP_REQUIRED / PARTIAL):** real contact-reveal server action (Call/Reveal number show an honest "Setup Required" note instead of a fake number); poster display-name/verification enrichment on `public_properties_view`; amenities collection in the post-property wizard; "Similar in locality" block on the unavailable-property state (kept as the existing generic "Back to Search" CTA — deriving locality without leaking removed-listing data needs a dedicated lightweight lookup, not built this pass).

## 2026-07-10 — Batch 5 posting-wizard continuation: media, unit inventory, wizard-footer parity

Picked up an already-substantial in-progress Batch 5 build (backend `units.ts` + migration
`20260710120000_batch5_wizard_drafts_units_quota.sql` + shared `WizardFooter`/`useWizardAutosave` all existed
but were partly unwired/untested). This pass:
- **Fixed real bugs found while continuing the build:** `PropertyForm.tsx` imported `WizardFooter` but rendered
  a duplicate inline footer instead; `useWizardAutosave.ts` mutated a ref synchronously during render (moved to
  `useEffect`); `units.ts`'s `requireOwnProject()` had no return-type annotation and failed `tsc --noEmit`
  (error union widened to `string | undefined`, fixed with an explicit discriminated-union return type).
- **Builder Project edit was a stub** ("Edit form coming in next phase", no `ProjectForm` rendered) while
  Property/Requirement edit already had real CRUD — rebuilt `dashboard/builder/projects/[id]/edit/page.tsx` to
  match the working pattern (`getMyProjectById` + `canEditProject` lock states + `ProjectForm mode="edit"`).
- **Built the missing Design 5D Unit Inventory screen** — backend (`saveProjectWings`, idempotent
  `generateWingUnits`, bounded `listProjectUnits`, `updateProjectUnit` with stale-version guard,
  `bulkUpdateUnitStatus`/`bulkUpdateUnitPrice` with honest per-row skip reasons) was 100% ready with zero UI.
  New route `dashboard/builder/projects/[id]/units` + `UnitInventoryClient.tsx`: wing editor (add/remove/Save
  + per-wing Generate Units, locked once generated), desktop table + mobile accordion cards, select-all + sticky
  bulk-action bar, unit edit modal/sheet with optimistic-concurrency version passed through. Linked from the My
  Projects list (`EntityListCard` gained an `extraActions` slot).
- **Ported ProjectForm and RequirementForm onto the shared `WizardFooter`/`useWizardAutosave`** — all three
  posting wizards (Property/Project/Requirement) now share one footer component and one debounced-autosave hook
  instead of three hand-rolled copies.
- **Implemented real media upload — Supabase Storage, not Cloudflare R2** (user-approved deviation from
  CLAUDE.md's default; R2 isn't connected yet, Supabase Storage is live). New migration
  `20260710150000_media_supabase_storage.sql`: generic polymorphic `media` table (property/project/project_unit
  owners) with entity-ownership RLS (not just "uploader = me" — re-verifies real listing ownership), two Storage
  buckets (`media-public` public-read for photos/video, `media-private` for brochure PDFs — never a public URL,
  per CLAUDE.md §21), folder-scoped `storage.objects` RLS keyed to the uploader's own auth uid. New
  `src/lib/actions/media.ts` (upload-target issuance, register/list/delete/reorder/set-cover, signed URLs for
  private files) and `src/components/forms/wizard/MediaUploadStep.tsx` (drag-free tap-to-upload, live progress,
  cover selection, up/down reorder, brochure PDF slot) reused identically in the Property and Project wizards,
  replacing both "Setup Required" placeholders.
- Checks: `npx tsc --noEmit` PASS, `npx eslint .` PASS (0 errors; 1 pre-existing unrelated warning in
  `public-search.ts`), `npm run build` PASS (40 routes, incl. the new Unit Inventory route).
- **Not done this pass:** migration apply to the production DB was attempted but blocked by this session's
  credential-leakage sandbox guard (couldn't source the DB password/access token into a shell command) — user
  needs to run `supabase link --project-ref cekpewpegltqpbmlofmc && supabase db push` manually. No live browser
  verification was possible (all touched routes are `requireRole()`-gated, mobile-OTP login isn't automatable
  in this session) — verified via build/lint/typecheck only, per CLAUDE.md §31.

## 2026-07-13 — Phase 1 (Five-file master plan): Audit Reconciliation & Shared Foundations

- Design-registry reconciliation: re-extracted all 14 `newdesign` bundles (JS-bundled HTML → decoded); every File-2 screen group maps to a numbered frame in the actual HTML; no unregistered screens; one filename-case note (`batch 4 - Detail Pages` lowercase b); Batch 1–3 HTML intentionally absent (already implemented).
- Route audit: 85 routes classified; removed dead legacy `src/components/dashboard/DashboardShell.tsx` (0 consumers; V2 is the only dashboard shell).
- New shared error foundation: `src/components/ui/ErrorState.tsx` (InlineErrorBanner + ErrorStateCard, Batch 1 pattern), global `src/app/error.tsx` boundary.
- Fake-zero elimination on Overviews: owner/broker/builder stat cards + admin moderation total now render "—" + "Couldn't load" on query failure (never zero); Owner Recent Leads failure shows an inline error, not the empty state.
- New shared overlay hook `src/components/ui/useOverlay.ts` (Escape, scroll lock, focus trap, focus restoration) wired into ConfirmDialog, ReportModal, MobileFilterSheet.
- Session refresh + return-intent confirmed in `src/proxy.ts` (Next 16 middleware convention; preserves query string in redirectTo, same-origin only); role checks stay in server guards.
- Migration `20260713150000_phase1_shared_foundations.sql` (applied): canonical `locations` hierarchy (+ India→Gujarat→20 cities seed with Gujarati names/aliases), `provider_configs` registry (13 providers, safe status, env-ref only — never secrets), `notification_deliveries`, `background_jobs` + DLQ states. All RLS-enabled.
- Dev fixture: QA Gujarati long-content draft property (`qa-gujarati-long-content-fixture`, draft = never public).
- Verified live: middleware redirect + OTP login + return intent → owner dashboard; wrong-role denial; filter-sheet Escape/scroll-lock; lint ✓ typecheck ✓ production build ✓; no console errors.
