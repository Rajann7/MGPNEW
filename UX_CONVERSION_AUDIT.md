# My Gujarat Property — UX & Conversion Audit

_Last updated: 2026-07-14 · Owner: Rajan · Status: discovery complete (94 items), fixing not started._

This document has **two layers**:

- **Layer A — Code / UI Consistency Audit (items 1–54):** what is technically broken, inconsistent, dead, or duplicated in the current build. Found via real `grep`/`read` across `src/`.
- **Layer B — Conversion / Information-Architecture Prescription (items 55–94):** from the user's journey POV — for each screen, what to show, what to remove, in what order, like e-commerce conversion design.

They overlap on purpose (e.g. conversion **#60 card photo** = code **#1**). Cross-references are noted inline. Numbers are stable so you can say _"start from #NN"_.

**Recommended starting point:** Search + Detail conversion (60–72) — highest impact on leads — implemented via the shared-component fixes (#1, #3, #6, #7).

**Design token lock (do not drift):** brand `#0F6B5C`, hover `#0C5648`, soft `#E7F2EF`; Inter 400/500/600; radius 16/10/full; spacing 4-8-12-16-24-32-48. Dashboard bottom-nav order LOCKED: Home · Search · Post(FAB) · Leads · Profile.

---

# LAYER A — CODE / UI CONSISTENCY AUDIT (1–54)

## 🔴 CRITICAL — conversion impact (1–5)

| # | Issue | Where | Fix |
|---|-------|-------|-----|
| 1 | Search cards show generic icon, **no real listing photo** | `PropertyResultCard` / `ProjectResultCard` / `RequirementResultCard` | Load real listing photo; honest "No photo" placeholder if none |
| 2 | **Compare tray disappears** on detail page — was "hidden" as a fake fix, not real | `CompareTray` on detail | Fix z-index/layout, float above sticky bar; do NOT hide |
| 3 | **6 different card designs** for same entity | search / home / recently-viewed / saved / dashboard-owner / dashboard-broker | Build ONE reusable `PropertyCard`, use everywhere |
| 4 | **Status badge inconsistent** — same word, different colour/name in 5 places (Published vs Live, Submitted vs Pending, lead New amber vs blue, Contacted green vs cyan) | across dashboards/admin | Single `statusConfig` map, all import from it |
| 5 | **Duplicate CTA bug** — "Create banner ad" button shows twice on empty ads list | builder/ads empty state | Remove one |

## 🟡 HIGH — trust + navigation (6–12)

| # | Issue | Fix |
|---|-------|-----|
| 6 | Verified badge only on detail sidebar, **not on search cards** | Add to search card |
| 7 | "Posted X days ago" freshness **only on homepage** | Add to search card + detail |
| 8 | Home has **4+ competing primary CTAs** (hero search + 3 role cards + header "Post free") | One primary; rest secondary/outline |
| 9 | **3 different header designs** (home mega-menu / search own header / detail third) | One base framework, per-screen variants allowed |
| 10 | **No guest mobile bottom nav** (only logged-in dashboard) | Add Home · Search · Saved · Login |
| 11 | Owner vs Broker/Builder "my listings" cards differ | Unify — owner's status-dot + pause/resume for all |
| 12 | **12 of 17 empty states have no recovery CTA** (Saved, Leads, Proposals, Notifications, Messages, Requirement-matches) | Add a relevant next-step button to each |

## 🟡 MEDIUM — filter / search UX (13–18)

| # | Issue | Fix |
|---|-------|-----|
| 13 | Two non-synced filter UIs run together on desktop (sidebar + More-filters sheet) | One filter system |
| 14 | Area (sq ft) filter **missing from desktop sidebar** (only mobile sheet) | Add to desktop sidebar |
| 15 | `FilterChips.tsx` is **dead code**; duplicate inline logic used instead | Remove dead code, single implementation |
| 16 | Budget filter chip **price-format bug** — ₹1.5 Cr shows "₹150L" | 1-line: use `formatINR` |
| 17 | Pagination lacks **total pages / results count** | Add "245 results" count |
| 18 | **No grid/list view toggle** in search (grid only) | Add list view for dense comparison |

## 🟢 LOWER — polish (19–26)

| # | Issue | Fix |
|---|-------|-----|
| 19 | Gallery images lack `loading="lazy"` | Add lazy loading |
| 20 | Raw `<img>` everywhere, **no `next/image`** (bypasses CDN resize/optimization) | Migrate to `next/image` (large task — plan separately) |
| 21 | Compare table only Price/Location/Type; rest lumped into "Details" | Per-spec rows: BHK / Area / Furnishing |
| 22 | Saved Items list flat — no sort/folder/group | Add basic sort (date/price) |
| 23 | **Zero onboarding/tooltips** — Compare & Reveal-number silently discovered | First-time tooltip for those 2 |
| 24 | Mobile detail **poster/trust card sinks to bottom** (desktop sticky sidebar) | Raise on mobile / show a mini-card up top |
| 25 | Detail page has **no embedded map** (intentionally removed; only external link) | CONFIRM: intentional or restore map |
| 26 | `QuickFilters.tsx` **stale comment** ("below search box" but actually sidebar only) | Fix comment |

## 🔴 CRITICAL — forms & modals (27–31)

| # | Issue | Fix |
|---|-------|-----|
| 27 | Error-summary banner **only in PropertyForm** | Add to ProjectForm + RequirementForm |
| 28 | Server-error handling: PropertyForm handles **8 codes** w/ actionable copy; Project/Requirement only 1 (`ROLE_NOT_ALLOWED`), rest generic | Parity — handle all codes with actionable copy |
| 29 | Draft-conflict detection **only in PropertyForm** (Project/Requirement silently overwrite across tabs) | Add conflict detection to all |
| 30 | **No Toast/Snackbar anywhere** — success = full-page redirect or inline banner only | Build one shared Toast; use for all mutations |
| 31 | Modal a11y scattered — only 4 modals use shared `useOverlay`; `RequestLocationModal` no Escape/scroll-lock, admin approve/reject dialog missing Escape/scroll-lock/focus-trap | Route all modals through `useOverlay` |

## 🟡 HIGH — visual consistency (32–36)

| # | Issue | Fix |
|---|-------|-----|
| 32 | **~30 hand-rolled buttons** not using shared `Button` → 4 radius values (`rounded-lg`/`xl`/`full`/`[10px]`) | Collapse into `Button` |
| 33 | Back icon uses **2 glyphs** — `ArrowLeft` vs `ChevronLeft` — same meaning, even in posting-wizard family | Pick one |
| 34 | **Loading: 4 patterns, no rule** (skeleton 3 places, spinner in billing, plain text 1 place, Button spinner); most dashboard lists show nothing then pop | One loading standard (skeleton) |
| 35 | **Success feedback: 4 treatments** (SuccessScreen / inline banner / in-modal swap / nothing-card-just-moves) | Standardize (Toast + SuccessScreen for form completion) |
| 36 | **Page-title `h1`: 5 scales** — dashboard-sub `text-xl`, dashboard-home uses `h2` (no h1!), admin `text-sm`, public `text-2xl/3xl`, detail `text-lg/xl` | One page-title scale + always real `h1` |

## 🟡 MEDIUM — admin & data formatting (37–38)

| # | Issue | Fix |
|---|-------|-----|
| 37 | **No real admin `<table>`** — `UserListClient` CSS-grid pseudo-table (wraps badly on mobile) vs `ModerationQueueClient` card-per-item; both reinvent instead of reusing `EntityListCard`/`OwnerEntityCard` | Reuse shared list components |
| 38 | **Date format: 3 shapes** for same `created_at` — `LeadsTable` relative, others bare `toLocaleDateString()` (locale-dependent), others en-IN "14 Jul 2026" | One `formatDate` util everywhere |

## ♿ ACCESSIBILITY (39–46) — verified via grep

| # | Issue | Detail |
|---|-------|--------|
| 39 | **Shared `FormField` (~160 uses) label is disassociated** | `<label>` has no `htmlFor` and doesn't wrap the input (input is a sibling div) → SR won't announce, clicking label won't focus. Also error `role=alert` not linked via `aria-describedby`, no `aria-invalid`, `required` is visual-only (no `aria-required`). **Systemic — one fix covers all forms.** |
| 40 | **Focus states almost absent** — `focus-visible`/`focus:ring` in only 4 files / 12 spots whole app | Keyboard users see no focus on most buttons/links/cards |
| 41 | **8 `<img>` without `alt`** | Add alt / `alt=""` for decorative |
| 42 | **Overlays lacking `role=dialog`/`aria-modal`/focus-trap** — only 4 modals use `useOverlay`; AuthModal, RequestLocationModal, admin reason-dialog, TeamClient, UnitInventoryClient, ClaimProfileCard, FullscreenGallery don't (extends #31) | Route through `useOverlay` |
| 43 | **No `prefers-reduced-motion`** anywhere (72 files animate/transition) | Add reduced-motion guard in globals |
| 44 | **~143 uses of `text-zinc-400/300/gray-400`** low-contrast text — likely below WCAG AA 4.5:1 on white | Darken helper/placeholder text |
| 45 | **Search/header inputs (8) rely on placeholder as only label** | Add visible or `sr-only` `<label>` |
| 46 | **`h1` in only 32 of 97 pages** — many routes have no h1 (a11y landmark + SEO H1 rule; extends #36) | Ensure one h1 per page |

## ⚡ PERCEIVED PERFORMANCE (47–50)

| # | Issue | Detail |
|---|-------|--------|
| 47 | **Zero route-level `loading.tsx`** in `app/` | Navigations show blank/frozen page until server component resolves; add instant skeletons on route change |
| 48 | **`useOptimistic`: 0 usages** despite CLAUDE.md §26 mandating optimistic save/shortlist w/ rollback | Every shortlist/save waits a full round-trip |
| 49 | **Shared `Skeleton` used only in dashboard analytics + search** | detail/admin/leads/forms lists render nothing while loading (ties #34) |
| 50 | **12 `<img>` without width/height → CLS** | Core Web Vitals CLS≤0.1 at risk (ties #20) |

## 🌗 DARK MODE (51–53)

| # | Issue | Detail |
|---|-------|--------|
| 51 | **Dark mode applied globally but styled partially** | `.dark` on `<html>` via `localStorage` `mgp-theme`, but only dashboard/ui/leads (~18 files) have `dark:` styles. search/detail/admin/forms/compare/public/header/billing have **zero `dark:` + 55 hardcoded `bg-white`** → toggling dark then visiting any public/search/detail/admin page = **broken half-dark screen** |
| 52 | **Theme toggle only in dashboard AvatarMenu** | Guests/public can't toggle, yet a previously-set `.dark` persists site-wide |
| 53 | **`components/ui/ThemeToggle.tsx` is DEAD CODE** | Imported nowhere; AvatarMenu re-implements toggle inline |

## 🧩 FRAMEWORK CONSISTENCY (54)

| # | Issue | Detail |
|---|-------|--------|
| 54 | **`useFormStatus`: 0 usages** despite §26 requiring React 19 `useFormStatus` | All forms hand-roll pending state |

**Remaining possible code passes (not yet audited):** RLS/security surface, SEO metadata completeness, mobile-responsive per-breakpoint sweep (320→1366), i18n/Gujarati fallback.

---

# LAYER B — CONVERSION / INFORMATION-ARCHITECTURE PRESCRIPTION (55–94)

## The lens (applies to every screen)

1. **One primary action per screen.** Everything else secondary/outline.
2. **Each screen answers the ONE question the user has at that step.** Defer the rest.
3. **Trust signals at the moment of doubt** (photo, Verified, RERA, freshness, response-time) — not at page bottom.
4. **Two separate funnels — never mix:** Demand (find → enquire) vs Supply (post a listing).
5. **Mobile-first, thumb-reachable sticky primary CTA** (80% of owners on mobile).
6. **Reduce choices → make the next step obvious.** Progressive disclosure.

---

## 🏠 HOME — currently "show everything" band-after-band

**User wants:** either _search now_ (buyer) or _post now_ (owner). Two intents only.
**Current order:** Hero → Banner → Category → Featured Properties → Featured Projects → Recently Viewed → Role Cards → How It Works → Trust (9 bands — too long).

| # | Recommendation |
|---|----------------|
| 55 | **Hero = one job: search.** City + search box + 2–3 popular chips (Buy/Rent/Projects). No second CTA inside hero. |
| 56 | **Move RoleCards (Post) out of the middle** — it's supply funnel. Make it a thin strip under hero ("Owner? List free →") or leave it to the header "Post free". |
| 57 | **Don't put BannerCarousel right under hero.** First scroll should be real inventory (Featured); move the ad into a slot _between_ Featured sections. |
| 58 | **Pull Trust up** — right after Featured, not at the bottom. Trust works while the user is deciding. |
| 59 | **Recently Viewed only when data exists** (returning user). For a fresh guest, that slot = "Popular in [city]". |

**Recommended home order:** Hero-search → Category tiles → Featured (properties+projects unified rail) → Trust strip → How it works → (owner strip) → Banner slot. **Cut 9 bands → 5–6.**

---

## 🔍 SEARCH RESULTS — the buyer's "shopping" screen, currently weakest

**User wants:** quickly compare and shortlist → needs **photo, price, location, trust, freshness at a glance.**

| # | Recommendation |
|---|----------------|
| 60 | **Real photo on every card** (= code #1) — the #1 conversion lever. Real-estate card without a photo is dead. |
| 61 | **Trust cluster in one spot:** Verified (#6) + RERA (if project) + "Posted X days ago" (#7), near the price. |
| 62 | **Map + list split** (ties #25). Location is everything — desktop right-side map, mobile "Map" toggle. Currently no map at all = big gap. |
| 63 | **One filter system + results count** (#13, #17). Always show "245 properties in Satellite" — count = confidence. |
| 64 | **Default sort = "Recommended", not "Newest".** Surface top 2–3 sorts (Newest, Price low→high, Verified first) as chips, not hidden in a dropdown. |
| 65 | **One clear card action** — whole card → View + a secondary "Save ♡". Move "Compare" to a checkbox/hover, not a competing primary. |

**Remove:** dual filter UI, generic-icon cards. **Add:** map, count, trust cluster, photo.

---

## 🏢 LISTING DETAIL — the "money page" where the lead is created

**User wants, in order:** "Does it fit my need? Is it genuine? **How do I contact now?**"

| # | Recommendation |
|---|----------------|
| 66 | **Mobile: move contact/trust card up** (= code #24 — biggest mobile conversion miss). Mobile order: Gallery → Price+title → **mini contact/trust card (Verified + Call/Enquire) here** → KeyFacts → Amenities → Location → Similar. |
| 67 | **Keep the mobile sticky bottom "Call + Enquire" bar** (already present — keep). Desktop right sticky sidebar: price → Verified/RERA → "Posted X days ago" → Owner/Broker card (name, response time) → Call/Enquire/WhatsApp → Report (small). |
| 68 | **Trust at the point of doubt:** Verified + "RERA: [no.]" + "Contact hidden — login to reveal" right under the gallery, next to price (currently buried in sidebar). |
| 69 | **Restore embedded map or a mini static map + "Open in Maps"** (confirm #25). A bare external link makes the user leave the site → drop-off. |
| 70 | **Gallery photo count + "View all" overlay** ("1/24"). More photos = more trust. Lazy-load (#19) to stay fast. |
| 71 | **Similar listings only when genuinely similar** (same city + budget band), max 3–4. Otherwise it reads as "we have nothing else". |
| 72 | **Bring the compare tray back on detail** (= code #2) — float above the sticky bar; don't hide it. |

**Remove:** overflow-menu clutter, buried trust. **Add:** map, top contact card (mobile), photo count.

---

## 💬 CONTACT / LEAD REVEAL — the actual conversion event

**User wants:** the number/enquiry with minimum friction. Every extra step = drop.

| # | Recommendation |
|---|----------------|
| 73 | **One login wall on "Reveal number", return to the same spot** (intent preserved). After login, reveal on the same property — don't dump the user back to the list. |
| 74 | **Enquiry form ≤ 2–3 fields** — name + number (auto if logged in) + optional message. Every extra field ≈ 10% drop. |
| 75 | **Trust micro-copy at contact:** "Your number is shared only with the owner, spam-protected." |
| 76 | **Success = clear next step (Toast/inline, ties #30), not a redirect:** "Enquiry sent ✓ — owners usually reply within 2 hours. See more like this ↓". |
| 77 | **First-time tooltip on Reveal & Compare** (= code #23) — otherwise users never discover these. |

---

## 📤 POST LISTING (Owner/Broker/Builder) — supply-side conversion

**Owner wants:** "list fast, it's free, how long will it take." The 9-step wizard intimidates.

| # | Recommendation |
|---|----------------|
| 78 | **Show progress + expectation up front:** "~4 min, and you can save & finish later." |
| 79 | **Easiest step first** (city + type + Buy/Rent) to build momentum; heavy steps (photos/legal) in the middle, never first. |
| 80 | **"Why we ask" micro-copy per step** — "Listings with photos get 5x more enquiries." Motivate, don't just demand. |
| 81 | **Visible save-as-draft on every step + honest error summary in all forms** (= code #27–29). Owner's work must never be lost. |
| 82 | **Submit success explains what happens next:** "In review (usually X hours) → then live." |

---

## 🔐 AUTH / GATING — when to block, when not to

| # | Recommendation |
|---|----------------|
| 83 | **Guest can browse/search/detail freely — login wall only on reveal-number, enquire, save.** Show value, then gate; don't hide value behind the gate. |
| 84 | **Intent-aware login** (ties #73) — the action that triggered login is what completes. Header-login → home; action-login → that action. |
| 85 | **Register: simple 3-card role choice + a "keep browsing as guest" escape.** Forced signup scares guests away. |

---

## 📊 DASHBOARD — retention / repeat conversion

| # | Recommendation |
|---|----------------|
| 86 | **Owner dashboard home leads with "what happened on your listing" (leads/views), not stats.** Order: new leads → listing status → then stats. |
| 87 | **Each listing card: status-dot + pause/resume in one place, same for all roles** (= code #11). |
| 88 | **Recovery CTA on every empty state** (= code #12) — "No leads yet → share / boost your listing". |
| 89 | **Immediate result on lead action (Toast + optimistic, ties #48):** "Contacted ✓". Currently the card just silently moves. |

---

## 🧭 GLOBAL trust + navigation (every screen)

| # | Recommendation |
|---|----------------|
| 90 | **One header framework, per-screen variant** (= code #9) — brand + city + search + login always in the same place. |
| 91 | **Guest mobile bottom nav** (= code #10): Home · Search · Saved · Login, thumb-reachable. |
| 92 | **One status vocabulary site-wide** (= code #4): "Live / Under review / Paused / Expired" — same word, same colour, everywhere. |
| 93 | **One reusable `PropertyCard`** (= code #3) — same "thing" everywhere → recognition = trust. |
| 94 | **Footer/legal + "how verification works" reachable on every page** — marketplace trust essential. |

---

## How to use this document

- **Layer A (1–54)** = what's broken in code. **Layer B (55–94)** = what should exist per screen.
- Many map 1:1 (e.g. #60 ↔ #1, #66 ↔ #24, #72 ↔ #2) — fixing the shared components knocks out both layers at once.
- **Suggested build order (highest ROI first):**
  1. **Shared primitives** — one `PropertyCard` (#3/#93), one `statusConfig` (#4/#92), one Toast (#30), fix `FormField` a11y (#39). These unlock many others.
  2. **Search conversion** — photo + trust cluster + count + map (#60–64).
  3. **Detail conversion** — mobile contact card up, trust at top, map, compare tray (#66–72).
  4. **Lead/contact flow** — friction cut + intent-aware login + success feedback (#73–77).
  5. **Post flow + dashboard + empty states** (#78–89).
  6. **Global nav/header + guest bottom nav** (#90–91).
  7. **Polish** — dark-mode completion or scope-down (#51–53), perceived-perf loading.tsx (#47), lower-priority items.

_Nothing here is implemented yet. This is the discovery/plan. Confirm a starting number to begin._
