# Verification — T03-17 · Save Search prompt

**Design source:** Batch 3 "Save Search prompt". **Route/component:** `/search` · `src/components/search/SaveSearchButton.tsx` (mounted in `SearchResultsClient` toolbar). **Date:** 2026-07-04.

## Structure
Results toolbar: `[N results in City]  [Save search]  [Sort]`. Signed-in → popover (name input prefilled from query + "Email me new matches" toggle + Save). Guest → auth modal. Matches Batch 3 intent.

## Old UI removed
None (net-new control). OLD_UI_REMNANTS = 0.

## Functionality
- Reads current `/search` URL params (`useSearchParams`) → full `query_params` object (not a sample subset).
- `saveSearch(title, queryParams, alertEnabled)` (existing, auth-required, RLS-scoped to profile) → `saved_searches`. No new backend.
- Guest → `openAuth()` (login intent), never a fake save. Alert copy is honest ("only when email provider configured").

## Runtime evidence (guest — actually executed)
| Check | Route | Viewport | Result |
|---|---|---|---|
| Save-search button renders | `/search?tab=buy&city=ahmedabad` | desktop | PASS (button present, label "Save search") |
| Guest click → auth modal | `/search` | desktop | PASS (dialog opened, OTP/login modal; **no fake "Search saved" state**) |
| No horizontal overflow | `/search` | 320px | PASS (scrollW 320 = innerWidth; button icon-only via `hidden sm:inline`) |
| Build/lint/type | — | — | PASS (`eslint`/`tsc` clean; `npm run build` 40/40, `/search` compiles) |

## Gates
- **VISUAL: PASS** — control renders on the real public route; matches design placement (toolbar). Runtime-verified (guest).
- **FUNCTIONAL: PARTIAL/UNVERIFIED-AUTH** — guest path fully verified (auth modal, no fake save). **Signed-in save persistence UNVERIFIED-AUTH** (needs a logged-in session; OTP automation blocked). Requirement: login → Save search → confirm row in `saved_searches` + appears in dashboard "Saved searches" after refresh.
- **RESPONSIVE: PASS** — no overflow at 320px; popover width-capped `max-w-[calc(100vw-2rem)]`, right-aligned.
- **REGRESSION: PASS** — build 40/40, lint/type clean; `/search` still renders results; no change to search query behavior.

## FINAL
`VISUAL: PASS · FUNCTIONAL: UNVERIFIED-AUTH (guest path PASS) · RESPONSIVE: PASS · REGRESSION: PASS`
→ **FINAL: NOT COMPLETE** — only the signed-in persistence gate remains (auth runtime unavailable). Implementation DONE; guest behavior fully verified.
