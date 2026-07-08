# Batch 3 — Public Home + Search

Source: Batch_3_Public_Home_Search_Standalone_.txt (TEMPLATE static-HTML canvas; JS = lucide v0.462 bundle + dc-runtime).

## Screens/components present in design (full inventory)

Anchor nav: 1 Homepage · 2 Search Results · 3 Filter Sheet · 4 Empty State · 5 Map View · 6 Loading · 7 Save Search

Screen 1 — Homepage
- 1A desktop 1280px (logged-out): sticky 3-zone header + nav row (Buy/Rent/Projects/Cities/For Owners-Brokers-Builders, mega-menu closed per note); hero "Find your next property in Gujarat" + subline; hero search card with Buy/Rent/Projects tabs, location input with AUTOSUGGEST OPEN (query "raj" showing grouped CITIES + LOCALITIES results incl. typo-tolerant "Raj kot", "Raj path Club Road", "Raj kot - Kalawad Road/University Road"), property-type select (Apartment), budget select (40 L - 1 Cr), Search button; Popular city chips (Ahmedabad Surat Vadodara Rajkot Gandhinagar Bhavnagar)
- Category tiles: Residential / Commercial / Plots & Land / Projects / PG-Co-living
- Featured properties (View all): 4 cards — 85 L 3BHK Shrinand Residency Satellite (Verified), 32,000/mo 2BHK Iscon Platinum Bopal (Broker), 1.6 Cr 4BHK Bungalow Kalali Vadodara (Verified), 48 L Commercial Shop Yogi Chowk Varachha Surat — spec chips BHK/sqft/furnishing + Posted-by tags
- Featured projects (View all): 3 RERA Verified cards with price range, builder avatar+name, "X units available" (46/112/28)
- Recently viewed strip — logged-in only (annotation: logged-out removes section entirely, never an empty shell) + "Clear history" action; 3 mini-cards
- Role CTA band "List with us — it's free": Owner (no brokerage) / Broker (listings+leads one dashboard) / Builder (RERA projects) each with Post-for-Free CTA
- How it works: 1 Search · 2 Connect · 3 Close
- Why My Gujarat Property trust section: Verified listings (review process), Direct owner contact, Local Gujarat expertise — no fake numbers
- Rich footer: brand blurb, app-store + play-store badge placeholders, EXPLORE (Buy in Ahmedabad / Rent in Surat / Projects in Vadodara / Plots in Rajkot / PG), COMPANY (About/Contact/Careers/Plans & Pricing/Help Center), LEGAL (Terms/Privacy/Refund & Cancellation/Listing Guidelines/RERA Information/Grievance Redressal), marketplace disclaimer line, copyright
- 1B mobile 390px: compact header + stacked hero search card, horizontal carousels, condensed role band, condensed footer with disclaimer

Screen 2 — Search Results
- 2A desktop: header (city=Rajkot, query "3 BHK apartment in Rajkot"); inline filter pills (3 BHK / 40L-80L / Furnishing / Posted by / More filters) + Map view toggle; 280px filter sidebar (PROPERTY TYPE, BHK 1/2/3/4+, BUDGET slider 40L-80L, FURNISHING, AMENITIES: Covered parking/Lift/Security/Garden, POSTED BY All/Owner/Broker/Builder, Clear all + Apply); honest count "128 results in Rajkot · 3 BHK · 40L-80L"; sort dropdown OPEN (Relevance / Price low-high / high-low / Newest first); mixed grid 5 property + 1 project card with PROJECT type chip; pagination 1 2 3 … 11
- 2B mobile: contextual header with back ("3 BHK in Rajkot"), compact filter bar: "Filters 2" (applied-count badge) + Sort + applied chips (3 BHK, 40L-80L); result count; cards; pagination

Screen 3 — Filter bottom sheet (open): full stacked filter set (adds PG/Co-living type), sticky footer Clear + "Show 128 results" live count

Screen 4 — Empty state: "No properties match your filters" with honest context copy (3 BHK in Jasdan 40L-80L), two actions: Clear filters + Request this location; Missing-location request modal (desktop): Location field + "Notify me at (email or mobile)" + Cancel/Submit request; note: mobile = same content in standard bottom sheet

Screen 5 — Map toggle view
- 5A desktop split: list column (3 mini cards) + interactive map with price-pin markers (68L/74L/52L/61L), "List view" toggle
- 5B mobile: full map + price pins + draggable bottom-sheet list ("128 results · drag up for list")
- 5C fallback: "Map view unavailable — showing list view. Maps provider is not configured. Results are unaffected." + Dismiss; annotation: Map-view toggle stays visible but DISABLED with tooltip "Map is not available yet" — never fake-active

Screen 6 — Loading: skeleton card grid with Batch-1 shimmer; annotation "card shape matches loaded card exactly — no layout shift"

Screen 7 — Save Search prompt: desktop inline card above results ("Save this search? Get notified when new 3 BHK listings in Rajkot (40L-80L) go live" + Not now/Save search) + mobile toast variant; logged-in only; annotation: logged-out tap opens Batch-2 auth popup and THE SEARCH IS SAVED AUTOMATICALLY AFTER SUCCESSFUL LOGIN

## ADD-ON features in the design NOT in the prompt (deltas)
1. Typo/transliteration-tolerant autosuggest — the open autosuggest for query "raj" matches "Raj kot", "Raj path Club Road" etc., grouped under CITIES and LOCALITIES headers; prompt asked for autosuggest but not fuzzy/typo matching demonstration. Homepage hero.
2. "Clear history" action on the Recently-viewed strip (prompt only asked for the strip + logged-out annotation). Homepage.
3. Sixth popular-city chip Bhavnagar (prompt examples stopped at Gandhinagar). Hero.
4. Applied-filter-count badge on mobile "Filters 2" button + applied filter chips inline in the mobile filter bar. Screen 2B.
5. Map fallback interaction detail: banner is dismissible (Dismiss button) AND the Map-view toggle remains visible-but-disabled with tooltip "Map is not available yet". Prompt asked only for the fallback banner. Screen 5C.
6. Post-login auto-save behavior for Save Search — "the search is saved automatically after successful login" (intent-preservation rule applied to saved searches). Screen 7.
7. Missing-location request modal fields specified: Location + "Notify me at (email or mobile)" — a notify-me capture flow, richer than the prompt's "form modal, briefly". Screen 4.
8. Footer extras: app-store/play-store badges rendered, Grievance Redressal + Listing Guidelines + RERA Information + Plans & Pricing + Help Center + Careers links (prompt asked generically for columns + badges placeholder; the specific legal set matches CLAUDE.md legal pages). Homepage footer.
9. Price-pin map markers showing actual listing prices on both desktop and mobile maps. Screen 5.
10. Hero subline naming coverage cities ("across Ahmedabad, Surat, Vadodara, Rajkot and beyond").

## Items in the prompt MISSING from the design
- Save-heart icon on property cards and category-tile icons cannot be confirmed from text extraction (icon-level). Budget "range slider" renders as a two-value control (40 L / 80 L) — likely slider, unverifiable statically.
- Everything else (all 7 screens, both breakpoints, all states) is present.

## Design tokens / notes
- Inherits Batch 1 tokens; mega-menu intentionally closed here (open state lives in Batch 1 3A)
- PROJECT chip distinguishes project cards in mixed results
- Honest-count language throughout (128 results); pagination to page 11
- Sample data: Rajkot-centric search (Kalawad Road, University Road, 150 Feet Ring Road, Mavdi, Nana Mava Road), Jasdan for empty state
