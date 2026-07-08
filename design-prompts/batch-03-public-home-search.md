# Batch 3 — Public Home + Search Results

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 3 of 17 — Public Home + Search Results.

MANDATORY CONSISTENCY — reuse the EXACT design system, tokens, and shell patterns already established in Batch 1 (Design System + Shared UI Patterns). Do not invent new colors, radii, shadows, fonts, icon styles, or navigation shells. Specifically re-apply, without exception, on every screen you generate in this batch:
- The same brand teal accent, zinc neutrals, Inter font, 16px card / 10px control radius, soft shadows.
- Public header (3-zone desktop + hamburger mobile, mega-menu) on every public page.
- App-like contextual header WITH BACK BUTTON on every mobile inner page — no exceptions.
- Every list screen must show its loading (skeleton), empty (actionable, non-dead-end), and error states.
- Every modal has a desktop + mobile bottom-sheet version.
- No fake data, no fake counts, no dead buttons, no "#" links.
- Mobile-first: design at 390px first, then 768px, then 1280px+, no horizontal scroll, sticky bars never cover content.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **Homepage** — full page, desktop + mobile:
   - Sticky header (mega-menu closed state here; already shown open in Batch 1).
   - Hero with large search card: tabs (Buy/Rent/Projects), location input with autosuggest dropdown OPEN (showing city/locality suggestions with icons), property-type dropdown, budget range slider/select, big "Search" button; popular-city chips row below.
   - Category tiles: Residential, Commercial, Plots, Projects, PG/Co-living — icon tile grid.
   - Featured Properties section — property card carousel/grid (image, price, title, location, spec chips: BHK/sqft/furnishing, save-heart icon, "Posted by Owner/Broker" tag).
   - Featured Projects section — project card variant (price range, RERA-verified badge, builder name, "X units available").
   - Role CTA band — 3 columns (Owner/Broker/Builder) each with icon, 1-line pitch, "Post Property/Project for Free" style CTA button.
   - "How it works" — 3-step visual (Search → Connect → Close), icons + short copy.
   - Trust/Why-us section — qualitative trust points (verified listings review process, direct owner contact, local Gujarat expertise) — NO fake numbers/stats.
   - Recently viewed / recommended strip (only shown if logged-in — annotate logged-out variant hides this section instead of showing empty).
   - Rich footer — brand blurb, Explore column, Company column, Legal column (links to all policy pages), app-store badges placeholder, disclaimer line ("MGP is an online listing/lead marketplace, not the owner of listed properties").

2. **Search Results page** — desktop + mobile:
   - Header + secondary filter bar (desktop: inline horizontal filter pills + "More filters" button; mobile: compact filter bar with "Filters" button opening bottom sheet + sort button).
   - Left filter sidebar (desktop only, 280px) — property type, BHK, budget range slider, furnishing, amenities checkboxes, posted-by (owner/broker/builder) toggle, "Apply"/"Clear all".
   - Results grid — property + project cards mixed, with a small type-indicator chip distinguishing "Project" cards.
   - Sort dropdown (Relevance, Price low-high, high-low, Newest).
   - Pagination control at bottom.
   - Result count shown honestly (e.g., "128 results in Rajkot" — real, not inflated).

3. **Search — Filter bottom sheet (mobile, OPEN state)** — full filter set stacked, sticky footer with "Clear" + "Show 128 results" buttons.

4. **Search — Empty state** — "No properties match your filters" illustration + 2 actions: "Clear filters" and "Request this location" (opens the missing-location request form modal, show that modal too, briefly).

5. **Search — Map toggle view** — list/map split view (desktop) and full-map-with-bottom-sheet-list (mobile); ALSO show the "Map view unavailable — showing list view" setup-required fallback banner variant (since Google Maps provider may not be configured).

6. **Search — Loading state** — skeleton grid of property cards while results load.

7. **Save Search prompt** — small inline card/toast after applying filters: "Save this search to get notified of new matches" with Save button (shown only for logged-in users; annotate logged-out variant triggers auth popup instead).
