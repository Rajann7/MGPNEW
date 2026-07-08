# Batch 4 — Property/Project/Requirement Detail Pages + Public Profiles

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 4 of 17 — Detail Pages + Public Profiles.

MANDATORY CONSISTENCY — reuse the EXACT design system, tokens, and shell patterns already established in Batch 1. Do not invent new colors, radii, shadows, fonts, icon styles, or navigation shells. Specifically re-apply:
- Public header (3-zone desktop + hamburger mobile) on every page.
- App-like contextual header WITH BACK BUTTON on every mobile detail page (title = property/project name, right action = share/save icon).
- Breadcrumb on desktop detail pages (Home > City > Locality > Property Title).
- Mobile sticky CTA bar per Batch 1 Section 7 ("Call" + "Enquire Now") — must not cover content, safe-area aware.
- Contact number stays hidden/masked until reveal action is explicitly taken (never leak raw number in initial render).
- No fake data, no fake view counts, no fake verified/RERA badges unless explicitly marked "sample verified" for wireframe purposes.
- Every modal has desktop + mobile bottom-sheet versions.
- Mobile-first: 390px → 768px → 1280px+, no horizontal scroll.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **Property Detail Page** — desktop + mobile:
   - Image gallery (grid on desktop with "View all X photos" opening fullscreen viewer; swipeable carousel on mobile with dot indicators).
   - Title, price, location, posted-date, spec chips row (BHK/sqft/floor/furnishing/facing).
   - "Posted by" card — avatar, name, role badge (Owner/Broker), verified badge if applicable, member-since.
   - Contact reveal section — masked phone number with "Reveal Number" / "Enquire Now" button (triggers auth if logged out — reference Batch 2 auth popup).
   - Description section (expandable "Read more" on mobile).
   - Amenities grid (icon + label chips).
   - Location map embed block (with "Setup Required" fallback state shown too — static map/address-only fallback).
   - Similar properties carousel at bottom.
   - Report listing link (subtle, in overflow menu).
   - Sticky mobile CTA bar (Call + Enquire Now).
   - Unavailable/sold/rented/expired state variant — full replacement content: "This property is no longer available" + similar-listings suggestions, no soft-404.

2. **Project Detail Page** — desktop + mobile:
   - Hero banner with builder logo overlay, project name, RERA-verified badge (or "RERA: Setup Required" honest state), price range, possession date.
   - Tabs: Overview / Floor Plans / Amenities / Location / Gallery / Video / 360° Tour (each tab content briefly sketched; video/360 sections show a "Setup Required" placeholder state if provider not configured).
   - Unit inventory summary widget (X BHK available, starting price) linking toward detail.
   - Brochure download card (PDF icon, file size, "View" + "Download" buttons — annotate: PDF is never converted to image).
   - Builder profile mini-card linking to builder microsite.
   - Construction progress timeline widget (milestone dots with photos/percentage).
   - Enquire Now sticky CTA (mobile) + inline form card (desktop sidebar).
   - Similar projects carousel.

3. **Requirement Detail Page** (scoped visibility — Owner/Broker/Builder only, NOT public guest) — desktop + mobile:
   - Requirement summary card (looking-for type, budget, location preference, timeline).
   - Posted-by info (masked/limited exposure).
   - "Send Proposal" primary CTA (for Broker/Builder viewers) — opens proposal form (briefly reference, full form lives in Batch 9).
   - Guest/unauthorized teaser state — blurred/locked preview + "Login to view full requirement" CTA.

4. **Broker Public Profile Page** (`/broker/[slug]`) — desktop + mobile:
   - Cover + avatar, name, agency name, verified badge, service areas chips, years active.
   - Stats row (Active listings — REAL count, not fake).
   - Listings grid (property cards).
   - Contact/Enquire button (auth-gated reveal).
   - Reviews/ratings section — show "Coming soon" or "Setup Required" state if not yet built (do not fake ratings).
   - Report profile link.

5. **Builder Public Profile / Microsite** (`/builder/[slug]`) — desktop + mobile:
   - Company header (logo, name, RERA registration info, founded year, HQ city).
   - Active Projects grid + Completed Projects grid (tabs).
   - About/company description section.
   - Contact card.

6. **Owner Public-Safe Profile** — minimal card view (name, role badge, active listings count) — annotate: no phone/email exposed publicly, minimal-by-default.

7. **Claim Profile flow** — empty/claim CTA state ("Is this your business? Claim this profile") + claim request form modal (proof upload field, submit).

8. **Report Content Modal** (used for property/project/profile/ad/message reports) — desktop modal + mobile bottom sheet — reason dropdown (spam/fraud/incorrect-info/inappropriate/other), description textarea, submit button, rate-limited-for-guest note.

9. **Fullscreen Image Gallery Viewer** (OPEN state) — large image, thumbnail strip below (desktop) or swipe+dots (mobile), counter "3/12", close X, keyboard-nav hint.

10. **Property/Project Comparison Page** — side-by-side comparison table (2–3 items), sticky column headers, spec rows, "Remove" per column, "Add another to compare" empty column state.
