# Contract — T03-17 · Save Search prompt

**STATUS: IMPLEMENTED — FINAL: NOT COMPLETE (signed-in persistence UNVERIFIED-AUTH; guest path runtime-verified)** · Built 2026-07-04 · Evidence: verification/T03-17_VERIFY.md · Design: Batch 3 "Save Search prompt".
**Route:** `/search` (public). **Class:** MODAL_OR_DRAWER / control on the Search screen.

## Design source (4.1)
Batch 3 shows a "Save Search" prompt on the results screen (post-login auto-save of the current query; guest → login intent).

## Visual structure (4.2)
Inline control in the results toolbar (next to Sort): "Save search" button (bookmark icon). Signed-in → opens a small popover: title input (prefilled from query) + "Email me new matches" toggle + Save. Guest → opens the auth modal (login intent). Success → "Saved ✓" state.

## Legacy UI to remove (4.3)
None (net-new control; no legacy save-search UI exists).

## Existing functionality to preserve (4.4)
- `saveSearch(title, queryParams, alertEnabled)` (`src/lib/actions/saved.ts`) → `saved_searches` (auth-required; RLS scoped to profile). Saved searches already listed in owner/broker dashboards.
- Auth modal (`useAuthModal`) for guest login intent.

## New functionality (4.5)
- Read the current `/search` URL params → build `query_params` object + default title → persist a saved search; honest states (guest→auth, pending, saved✓, error). No fake success.

## Data completeness (4.6)
Persists the full current query param set (not a design sample subset).

## Interaction matrix (4.7)
| Element | Action | Expected | Data | Backend | Persist | Permission | Error | Status |
|---|---|---|---|---|---|---|---|---|
| Save search btn (guest) | click | opens auth modal (login intent) | — | — | — | guest | — | wired |
| Save search btn (auth) | click | opens title/alert popover | URL params | — | — | any signed-in | — | wired |
| Save (popover) | submit | persists saved_search, shows Saved ✓ | params+title+alert | `saveSearch` | yes (saved_searches) | owner (RLS) | error msg, no fake success | wired |
| Alert toggle | toggle | sets alert_enabled | — | — | — | — | — | wired |

## Responsive (4.8)
Button in toolbar at all widths; popover is width-capped and right-aligned (no page overflow on mobile).

## Verification plan
- **Guest runtime: VERIFIABLE** — renders on public `/search`; clicking → auth modal (no phone/email expos; no fake save).
- **Signed-in save persistence: UNVERIFIED-AUTH** — needs a logged-in session (OTP automation blocked). Requirement: login → Save search → check row in `saved_searches` + appears in dashboard Saved Searches after refresh.
- Build/lint/type: performable now.
