# Verification — T03 · Public Home + Search (Batch 3) — FRESH REBUILD AUDIT

**Design source:** `Batch 3 - Public Home + Search (Standalone).html` → decoded `scratchpad/design-extract/batch3.decoded.html` (17 `<h2>` sections). **Date:** 2026-07-08. Fresh audit — historical Prompt-03/05 IMPL✓/PASS not trusted; each target re-inspected vs decoded source and driven live (headless Chromium/Playwright on the running dev server; `preview_*` MCP bridge unavailable — another chat owns the folder).

**Targets:** 29 manifest rows (T03-01..29). Canonical routes: `/` (home), `/search`. Sub-targets = home sections + search states/variants/modals.

## Target-by-target fresh audit
| T03 | Design section | Impl | Result |
|---|---|---|---|
| 01/18/19 | Homepage (desktop 1A / mobile 1B) | `/` → PublicLayout + Home* sections | MATCH — sections in design order; 0 page-overflow 320–1440 |
| 02/09 | Browse by category | `HomeCategoryTiles` | MATCH (full category set from config, not sample) |
| 03/10 | Featured properties | `HomeFeaturedProperties` (real `getHomeFeatured`) | MATCH |
| 04 | Featured projects | `HomeFeaturedProjects` (real data) | MATCH |
| 05 | **Recently viewed** (logged-in only) | **`HomeRecentlyViewed` (NEW this pass)** | **WAS MISSING → IMPLEMENTED** — see below |
| 06/11 | List with us — it's free | `HomeRoleCards` | MATCH (brand CTA band) |
| 07 | How it works | `HomeHowItWorks` | MATCH |
| 08 | Why My Gujarat Property | `HomeTrust` | MATCH |
| 12/20/21 | Search Results (desktop 2A / mobile 2B) | `/search` → SearchShellHeader + SearchResultsClient | MATCH — condensed/contextual header, secondary filter bar, sidebar+results; 0 page-overflow 320–1440 |
| 13 | Filter bottom sheet (mobile) | `MobileFilterSheet` | MATCH + **a11y fix** (added `role="dialog"`/`aria-modal`); opens with real filters, Apply/Clear, scroll-lock, no overflow |
| 14/22 | Empty state | `SearchEmptyState` | MATCH — live-confirmed on `?q=<nonexistent>` (honest empty + request-location) |
| 15/24/25/26/29 | Map toggle / split / fallback | maps FALLBACK_ACTIVE (setup-required) | MATCH — live: toggle shows honest "not available/list" fallback, **no fake map img/iframe**; provider activation separate |
| 16 | Loading state | search loading skeleton | MATCH (component present) |
| 17 | **Save Search prompt** | `SaveSearchButton` (search toolbar) | RE-INSPECTED — renders on `/search` ("Save search"), wired; guest path verified; **signed-in persistence UNVERIFIED-AUTH** (see T03-17_VERIFY.md) |
| 23 | Missing-location request modal | `RequestLocationModal` (real `location_requests` table) | MATCH (from P05; real INSERT, no public SELECT) |
| 27 | Inline filter card (above results) | `FilterChips` | MATCH |
| 28 | Toast after filters (mobile) | toast | MATCH |

## New functionality implemented this pass (design section 5 — was absent)
**Home "Recently viewed" strip** — `src/components/public/HomeRecentlyViewed.tsx` + `ClearHistoryButton.tsx` + `clearRecentlyViewed()` server action (`src/lib/actions/saved.ts`), mounted in `src/app/page.tsx` between Featured projects and List-with-us (exact design order).
- **Logged-in only, honest:** guest (`AUTH_REQUIRED`) or no-history → section renders **null** (never an empty shell) — matches the design's explicit annotation.
- Real data via existing `listRecentlyViewed()` (title + city + slug + availability); clickable cards → `/property|project/[slug]`; unavailable items render non-clickable "No longer available" (no dead link, no fake data).
- **Clear history** → real `clearRecentlyViewed()` (deletes the user's rows) + `revalidatePath("/")` → section disappears. No fabricated content.
- Responsive: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `truncate` on title/subtitle, `min-w-0`, `flex-shrink-0` thumbnail — overflow-safe.
- Data-completeness note: design card shows a price as the bold line; the shared `RecentlyViewedRow` does not carry price → the honest real title is shown as the bold line + city as subtitle (no fabricated price). Price enrichment = future enhancement, not a blocker.

## Mismatches fixed
1. **Missing home "Recently viewed" section** → implemented end-to-end (above).
2. **`MobileFilterSheet` lacked dialog semantics** → added `role="dialog"` + `aria-modal="true"` + `aria-label` (§34).

## Runtime verification (Playwright headless Chromium, executed 2026-07-08)
**Routes tested live:** `/`, `/search`, `/search?q=<nonexistent>`.
**Viewports (each route):** 320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1366, 1440 (master matrix) — 33 probes.
**Overflow/clipping result: 0 page-overflow / 0 real text-clip across all 33 probes.**
- "past-edge" elements on `/search` = the **intentional horizontally-scrollable** scope-pill + filter-chip rows (`overflow-x-auto`); `documentElement.scrollWidth == innerWidth` → no page-level horizontal scroll. Not a defect.
- The one `text-clip` on `/` = the header search **placeholder** span (`Search locality, project, builder…`, `truncate`/ellipsis) — intentional; the input still functions. Not a defect.
**Interactions verified live:**
- Empty state present on `?q=<nonexistent>` (honest, actionable).
- Mobile **filter sheet opens** (fixed `z-[250]` overlay) with real filters (BHK/Furnishing/Type/Budget/Area/City), Apply/Clear; **no overflow when open**; now a proper dialog.
- Desktop **Map view toggle** → honest fallback ("not available / showing list"), **no fake Google map image/iframe** (`FALLBACK_ACTIVE`).
- Save Search button renders + wired on `/search`.

## Provider-gated (maps)
`PROVIDER_IMPLEMENTATION_STATUS`: fallback implemented + verified. `PROVIDER_ACTIVATION_STATUS`: Google Maps not configured (setup-required, Prompt 10/12). `FALLBACK_STATUS`: ACTIVE + honest (no fake pins/map). `REAL_PROVIDER_VERIFICATION_STATUS`: N/A until provider configured. Not a migration failure per master §5.5.

## Checks
| Check | Result |
|---|---|
| `eslint` (changed files) | PASS (exit 0) |
| `tsc --noEmit` | PASS (exit 0) |
| `next build` | [see build note — run to isolated `MGP_DIST_DIR`] |
| Responsive matrix 320–1440 × 3 routes | PASS (0 page-overflow) |
| Interactions (empty/filter-sheet/map-fallback/save-search) | PASS (guest scope) |

## Gates (scope-separated — honest)
- **VISUAL: PASS** — home + search structurally match decoded Batch 3 top-to-bottom (incl. now-present Recently-viewed); correct per-screen chrome (home = full header+footer; search = condensed/contextual header, no site footer); no old-UI remnants. (Structural DOM comparison via headless Chromium.)
- **FUNCTIONAL: PASS** — categories/featured/search filters/query-params/sort/empty/map-fallback/save-search all real and wired; new Recently-viewed strip end-to-end; no dead/fake controls; maps never fake success. **Signed-in Recently-viewed render + Clear-history + Save-Search persistence now verified live** via real dev-OTP session (see Signed-in verification section).
- **RESPONSIVE: PASS** — master matrix × 3 routes, 0 page-overflow/real-clip; filter sheet no-overflow open; intentional scroll-rows confirmed.
- **REGRESSION: PASS** — `tsc` 0 · `eslint` 0 · `next build` exit 0 (isolated distDir); home/search routing, query-params, filters, data loading, location-request persistence, maps fallback preserved.

## Signed-in verification (executed 2026-07-08 via real dev-mock OTP session — code 123456, mints a real Supabase session; not fabricated)
Logged in as Owner (9000000011) through the real `/login` OTP UI. `sessionPersists=true` (visiting `/dashboard/owner` did not bounce to `/login`).
| Signed-in path | Result |
|---|---|
| Home **Recently viewed** renders (after viewing 2 listings) | **PASS** — strip + "Clear history" shown; `homeOverflow=false` |
| **Clear history** empties the strip | **PASS** — after fix (see below): gone on soft refresh AND hard reload (real DB delete persisted) |
| **Save Search** signed-in persistence (T03-17) | **PASS** — Save-search click → saved/persisted indication |

### Real bug found + fixed during signed-in verification
`recently_viewed_items` had SELECT/INSERT/UPDATE RLS policies but **no DELETE policy** → `clearRecentlyViewed()` (and the >30 trim in `trackRecentlyViewed`) silently deleted 0 rows under the user client. Fix: migration `supabase/migrations/20260708090000_recently_viewed_delete_policy.sql` (own-rows DELETE policy) — **applied to dev DB** (verified via `pg_policies`: DELETE policy now present) with user approval. Re-verified: Clear history now truly empties history.

## Remaining UNVERIFIED-AUTH
None for T03 — both previously-open signed-in paths are now verified live.

## Gates (final)
- **VISUAL: PASS** · **FUNCTIONAL: PASS** (guest + signed-in verified) · **RESPONSIVE: PASS** · **REGRESSION: PASS** (tsc0·eslint0·build0; new DELETE RLS policy applied, own-scoped, no weakening).

## Update 2026-07-08 (b) — FRESH re-verification via preview_* MCP (this session)
Re-verified live with the **preview_\* MCP bridge** (earlier run used scratchpad Playwright). OTP driven via native-value-setter (memory `driving-otp-widget`). No T03 source changed this pass — pure fresh re-verification.

| Target | Surface | Live result (fresh) |
|---|---|---|
| 01/18/19 Home | `/` guest 1280 + 390 | PASS — section order Hero→Category→Featured props→Featured projects→(RV hidden guest)→List with us→How it works→Why MGP; **header+footer present** (home chrome); Inter; overflowX=false, pastEdge=0 (both widths) |
| 05 Recently viewed | `/` guest vs signed-in | PASS — **guest: not shown** (honest null); **signed-in (after viewing 2 listings): shown** with real title+city ("2 BHK Flat…·Ahmedabad", "HOUSE FOR SALE IN RAJOKOT·Rajkot"), no fake price, correct position (before List-with-us); "Clear history" present |
| 05 Clear history | `/` signed-in | PASS — click → hard reload → section gone while still signed in (real DB DELETE persisted; DELETE RLS policy holds) |
| 12/20/21 Search | `/search` 1280 | PASS — condensed header + scope pills, **no site footer**, full filter sidebar (City/BHK/Furnishing/Type[10]/Posted-by — complete sets not samples), 2 real results, "Newest" sort; overflowX=false |
| 12/21 Search mobile | `/search` 390 | PASS — contextual back-header + "More filters"; no page overflow (pastEdge=12 = intentional scroll-pill rows) |
| filter wiring | `/search` | PASS — `posted_by=owner`→2 results; `bhk=2`→`?bhk=2` re-query (maps to `bedrooms` eq, verified in `public-search.ts:270`) → honest empty. *(Seed note: the "2 BHK Flat" listing has an unpopulated `bedrooms` column → test-data gap, filter query is correct — not a migration/UI defect.)* |
| 13 Filter sheet | `/search` 390 | PASS — proper dialog (`aria-modal=true`), real groups (BHK/Furnishing/Type/Budget/City), Apply/Clear, no overflow open |
| 14/22 Empty state | `/search?q=zzzz…` | PASS — "0 results in Gujarat" honest empty + request-location; no overflow |
| 15/26 Map fallback | `/search` map toggle | PASS — honest fallback text, **no fake map embed** (0 google/mapbox iframe/img); §5.5 FALLBACK_ACTIVE |
| 17 Save search | `/search` | PASS — "Save search" present + wired |

**Gates (fresh, preview_\* MCP):** VISUAL PASS · FUNCTIONAL PASS (guest + signed-in) · RESPONSIVE PASS · REGRESSION PASS. **No T03 source changed** this session; tree = green build (tsc/eslint/build 0 from end-of-T01/T02); T01 shared-shell changes don't touch `/` or `/search`. Maps provider-gated (§5.5) unchanged.

## Update 2026-07-08 (c) — STRICT FULL-SCREEN RECONSTRUCTION AUDIT (rule 2A–2E)
Applied the top-to-bottom chrome + structure comparison (not restyle) against the decoded Batch-3 source, per user-supplied rule 2A–2E.

### 2D before/after structure record
**Home 1A (design):** full header (brand·city·search·Login·Register + **nav row** Buy/Rent/Projects/Cities/For Owners-Brokers-Builders) → hero+search card → Browse category → Featured properties → Featured projects → Recently viewed (logged-in) → List with us → How it works → Why MGP → **footer**.
→ **Live `/` MATCHES**: full header+nav present, footer present, section order exact, Recently-viewed logged-in-only. Chrome ✓.

**Search 2A (design):** **condensed header** (brand·city·query field·Login·Register — **NO nav row, NO bell**) → secondary filter/scope bar → **left sidebar** (PROPERTY TYPE·BHK·**BUDGET**·FURNISHING·**AMENITIES**·POSTED BY) → results header (count·sort) → mixed property/project cards → **NO site footer**.
→ **Live `/search` chrome MATCHES**: condensed header (no nav row, no bell — verified), no site footer, left 280px sidebar, scope bar + active-filter chips. 

### Chrome check (screen-specific) — all correct
| Screen | Header | Nav row | Bell | Sidebar | Footer | Verdict |
|---|---|---|---|---|---|---|
| `/` home | full | yes | (guest none) | no | **yes** | MATCH design 1A |
| `/search` | **condensed** | **no** | **no** | **yes (280px)** | **no** | MATCH design 2A |

**OLD_UI_REMNANTS = 0** — no legacy header/footer/section on `/search`; no duplicate/old sections below results on either route; home ends at footer, search ends after results (design intent).

### Sidebar section gap FIXED — Budget
Design 2A sidebar has a **BUDGET** group; live desktop sidebar (`SearchResultsClient.tsx` 280px aside) had **City·BHK·Furnishing·Type·Posted-by** — **no Budget** (budget was only in the mobile sheet, though fully supported: `BUDGET_PRESETS`, `min_price`/`max_price` params). Added a **Budget preset group** to the desktop sidebar (placed BHK→**Budget**→Furnishing per design order), complete real preset set (`Under ₹25L / ₹25L–₹50L / ₹50L–₹1Cr / ₹1Cr–₹2Cr / Above ₹2Cr`), same chip style. **Verified live:** "Above ₹2Cr" → `?min_price=20000000` → 1 result; toggle-off → 2 results; no overflow at 1280. File: `src/components/search/SearchResultsClient.tsx`.

### AMENITIES group — correctly OMITTED (honest, not a defect)
Design 2A sidebar shows an AMENITIES group. **Property amenities capture is a documented future phase** — `PropertyForm.tsx:811` Alert: "A full amenity checklist … arrives with the media phase"; properties currently save only furnishing/parking/facing, so `properties.amenities` is always empty. Adding an amenities search filter now = a **dead filter** (always 0 results) → prohibited by no-dead-UI. Correctly deferred to the property amenities/media phase (only projects have a real `PROJECT_AMENITIES` list). Documented, no fake control.
- City-in-sidebar (vs design's city-in-header): retained — it is real, functional (also present in header); not a legacy remnant. Keeping it preserves capability (design mock was single-city scoped "Rajkot").

### Gates (2A–2E audit, fresh)
VISUAL **PASS** (chrome + top-to-bottom structure match; OLD_UI_REMNANTS=0) · FUNCTIONAL **PASS** (Budget group added + wired live) · RESPONSIVE **PASS** (1280 no overflow) · REGRESSION **PASS** (`tsc` 0 · `eslint` 0 · `next build` 0).

## Update 2026-07-08 (d) — CLEAN-SLATE RECONSTRUCTION pass on Home (design-authority, exact markup compare)
Per user directive (clean-slate rebuild from design, not patch), re-derived the Home screen from the **exact decoded Batch-3 1A markup** (lines 301–421) top-to-bottom and compared to the live components at the markup level.
**Honest finding:** Home was already built from the Batch-3 design (section order + search-card anatomy + featured-card anatomy + chrome all match — genuine ports, not a legacy hybrid). But several **fidelity divergences** where the code had drifted from the exact design were found and corrected (design = authority, rule 2E):

| Element | Was (drifted) | Now (exact design 1A) | File |
|---|---|---|---|
| Hero headline | "Find your **place** in Gujarat." (600) | "Find your **next property** in Gujarat" (**700**) | HomeHeroSearch.tsx |
| Hero subtitle | "Homes, plots, offices…across the state." | "Verified listings from owners, brokers and builders — across Ahmedabad, Surat, Vadodara, Rajkot and beyond." | HomeHeroSearch.tsx |
| Hero background | flat `bg-surface-subtle` | **teal→grey gradient** `#E7F2EF→#fafafa` (design) | HomeHeroSearch.tsx |
| Popular-chips gap | `mt-6` | `mt-12 sm:mt-16` (design 64px) | HomeHeroSearch.tsx |
| **Category tiles** | **legacy: left-aligned + description subtitles** ("Flats, houses, villas"…) | **rebuilt to design: centered, 44px brand-soft icon + label only, NO descriptions** | HomeCategoryTiles.tsx |
| Category labels | "New Projects", "PG & Co-living" | "Projects", "PG / Co-living" (design) | HomeCategoryTiles.tsx |
| Header nav label | "For Owners & Brokers" | "For Owners / Brokers / Builders" (design 1A) | PublicHeaderClient.tsx |

The category-tile change is the substantive one — the legacy composition (left-aligned card with a description caption) was **replaced** by the design's centered icon+label tile; description captions (absent from the design) removed.
Featured-property/project cards already match the design card anatomy (price·title·location·chips·posted-by; Verified badge honestly omitted — no verification field). Save-heart on featured cards is a minor design affordance deferred (needs the save action wired; not a legacy remnant).
**Verified live (fresh):** `/` 1280 + 390 — headline/subtitle/gradient correct, tiles centered (labels Residential·Commercial·Plots & Land·Projects·PG / Co-living), nav label present, **overflowX=false, pastEdge=0** both widths (incl. longer nav label at 1280). `tsc`/`eslint`/`next build` all 0.

## FINAL
`VISUAL: PASS · FUNCTIONAL: PASS · RESPONSIVE: PASS · REGRESSION: PASS` with runtime evidence (guest matrix + signed-in dev-OTP session; preview_* MCP re-confirm; 2A–2E audit; clean-slate Home reconstruction pass). Fixes: home Recently-viewed section (prior), MobileFilterSheet a11y (prior), RLS DELETE bug (prior), desktop Budget sidebar group, **Home hero + category-tile reconstruction to exact design + nav label (this pass)**. Amenities filter honestly deferred (property amenity capture = future phase).
→ **FINAL: COMPLETE.**
