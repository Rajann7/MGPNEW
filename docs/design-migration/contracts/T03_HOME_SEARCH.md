# Screen Contract — T03 · Public Home + Search (Batch 3)

**Design source:** `Batch 3 - Public Home + Search (Standalone).html` → `scratchpad/design-extract/batch3.decoded.html` (17 `<h2>` sections; 29 manifest targets). **Status:** fresh-audited + RUNTIME-VERIFIED 2026-07-08 (headless Chromium; guest matrix + signed-in dev-OTP session) and **RE-VERIFIED 2026-07-08 (b) via preview_\* MCP** (home guest+signed-in Recently-viewed+Clear-history live; search filters/empty/map-fallback/filter-sheet/save-search live; 320/390/1280 clean; no T03 source changed). VISUAL/FUNCTIONAL/RESPONSIVE/REGRESSION **all PASS**. Real RLS DELETE-policy bug fixed + applied (prior pass). Seed note: one test listing has null `bedrooms` (bhk filter query is correct — data gap, not a defect). **FINAL: COMPLETE.**

## Canonical targets & routes/components
| Target | Route / Component |
|---|---|
| Home (1A desktop / 1B mobile) | `/` → `PublicLayout` + `HomeHeroSearch`, `HomeCategoryTiles`, `HomeFeaturedProperties`, `HomeFeaturedProjects`, **`HomeRecentlyViewed`**, `HomeRoleCards`, `HomeHowItWorks`, `HomeTrust` |
| Search (2A desktop / 2B mobile) | `/search` → `SearchShellHeader` + `SearchResultsClient` (+ `FilterChips`, `SortDropdown`, `SearchPagination`, result cards) |
| Filter sheet (mobile) | `MobileFilterSheet` (role="dialog") |
| Empty / request-location | `SearchEmptyState` + `RequestLocationModal` (`location_requests` table) |
| Map toggle/split/fallback | maps `FALLBACK_ACTIVE` (setup-required) |
| Save Search | `SaveSearchButton` (see T03-17_VERIFY.md) |

## Exact home structure (top→bottom, design order)
Hero search → Browse by category → Featured properties → Featured projects → **Recently viewed (logged-in only)** → List with us (brand CTA band) → How it works → Why MGP → footer.

## Legacy UI removed / fixes
- Home: none legacy; **added missing Recently-viewed section**.
- `MobileFilterSheet`: added `role="dialog"`/`aria-modal`/`aria-label`.
- (Search page chrome already rebuilt STRICT 1:1 to Batch 3 Screen 2 in Prompt 05 — condensed/contextual header, no site footer.)

## Functionality preserved (do NOT change)
Real search: query params (`q`, scope/purpose, `posted_by`, BHK, furnishing, type, budget, area, city, sort, page), server queries, pagination, `getHomeFeatured`, location-request INSERT (RLS: no public SELECT), maps honest fallback, compare tray, save-search, recently-viewed tracking on detail pages.

## New functionality (this pass)
Home **Recently viewed** strip — logged-in only (guest/no-history → null, never empty shell); real `listRecentlyViewed`; clickable → `/property|project/[slug]`; unavailable → non-clickable "No longer available"; **Clear history** → `clearRecentlyViewed()` + `revalidatePath("/")`. No fabricated price (title+city real data).

## Data completeness
Category/type/city/furnishing/BHK/budget lists sourced from `src/lib/search/config` + `GUJARAT_CITIES` (complete sets, not design samples).

## Full-screen reconstruction audit (rule 2A–2E, 2026-07-08 (c))
Chrome verified screen-specific: home `/` = full header+nav+**footer** (design 1A); search `/search` = **condensed header (no nav row/no bell) + 280px sidebar + NO footer** (design 2A). OLD_UI_REMNANTS=0. **Fix:** added the design-2A **Budget** filter group to the desktop search sidebar (was mobile-sheet-only; `SearchResultsClient.tsx`) — complete real `BUDGET_PRESETS`, wired to `min_price`/`max_price`, verified live. **Amenities** filter honestly omitted (property amenity capture deferred to media phase → would be a dead filter; `PropertyForm.tsx:811`). City retained in sidebar (real functionality, also in header).

## Responsive contract
Home sections stack mobile→desktop; search = condensed header (desktop) / contextual back-header (mobile) + horizontally-scrollable scope-pill & chip rows (intentional `overflow-x-auto`, no page overflow); filter → bottom sheet (mobile) / centered dialog (lg). Verified 0 page-overflow 320–1440.
