# Batch 5 — Posting Wizards (Standalone)

Source: `Batch_5_Posting_Wizards_Standalone_.txt` (TEMPLATE section lines 1–915; JS resources are only dc-runtime + lucide — all content is static HTML in the template).

## Screens/components present in design (full inventory)

Sticky anchor nav (top): `5A Property (9 steps)` · `5B Project (10 steps)` · `5C Requirement (7 steps)` · `5D Unit Inventory`

Global rule banner: every wizard step uses SAME progress indicator, SAME sticky footer (Back ghost · Save Draft secondary · Continue primary), SAME back behavior. Shell shown once per wizard (desktop + mobile); only form panel changes.

### 5A Post Property Wizard — Owner/Broker, 9 steps
Step names (exact order): 1 Basics (Basic Details) → 2 Type & Purpose → 3 Price & Area → 4 Location → 5 Amenities → 6 Media Upload → 7 Contact Details → 8 Preview → 9 Submitted.

- Desktop shell (step 3 shown): mini dashboard sidebar (Overview / Post Property / My Listings / Leads), breadcrumb Dashboard > Post Property, horizontal stepped progress with check-circles for done steps, ring-highlighted current step, and a "+3" overflow indicator for steps beyond 6; validation state: red top summary ("2 fields need attention — Expected price, Carpet area") + red field borders + field-level microcopy ("Enter numbers only, e.g. 8500000", "This field is required"); sticky footer Back / Save Draft / Continue.
- Mobile shell (step 6 shown): 56px contextual header with back button, centered title "Post Property", right "Save Draft" text button; "Step 6 of 9" label + slim progress bar (67%); sticky bottom bar Back (flex 1) / Continue (flex 2) with top shadow; note "content scrolls; sticky bar never covers it".
- Step panels:
  - S1 Basic Details: listing title (helper "Shown in search results — keep it specific"), description textarea with "Min 30 characters · 132/2000" counter.
  - S2 Type & Purpose: Sale/Rent segmented pill; Residential/Commercial/Plot-Land icon cards; sub-type chips (Apartment, Independent house, Villa/Bungalow, Penthouse).
  - S3 Price & Area (in shell): Expected price*, "Price negotiable?" toggle ("Yes, open to offers"), Carpet area* with unit selector suffix (sq ft dropdown), Additional charges field (helper "Maintenance, parking, society deposit…").
  - S4 Location: locality autosuggest with bold match highlighting and cross-city suggestions ("Sate|llite, Ahmedabad" / "Satellite Road, Rajkot"), map placeholder with draggable pin ("drag pin to exact location"), "Use current location (mobile)" button, address line input.
  - S5 Amenities: categorized icon-chip multiselect — BASIC (Parking, Lift, Power backup), SAFETY (24x7 security, CCTV, Fire safety), LIFESTYLE (Garden, Gym, Kids play area).
  - S6 Media (in mobile shell): tap/drag upload zone ("JPG/PNG · max 10 MB each · min 3 photos required"), 3-col gallery grid with Cover badge on first photo, grip drag-reorder handles, per-file uploading state with % progress (62%), amber nudge banner: "1 more photo needed — listings with 5+ photos get 2x more views. Long-press to reorder; first photo is the cover (tap scissors to crop)."
  - S7 Contact Details: +91 phone confirmation with inline green "Verified" check inside the field, "Preferred contact time" chips (Anytime / 9 AM–1 PM / 5–9 PM), green privacy note "Your number stays hidden until you approve a reveal request."
  - S8 Preview: dashed teal frame with header strip "PREVIEW — not yet live" (eye icon); per-block links Edit photos / Edit price / Edit basics / Edit location jumping back to steps; renders with exact Batch 4 Property Detail layout.
  - S9 Submitted: check circle, "Submitted for review", "Typically approved within 24 hours. We'll notify you on WhatsApp and in-app.", amber Pending status chip, buttons "View listing" + "Go to My Listings".
- Draft saved — re-entry card: thumbnail + "Draft · 6 of 9 steps done · saved 2 hrs ago" + mini progress bar + Continue button; "Appears at top of My Listings — Continue where you left off."
- Edit-after-approval: amber warning card "Editing will require re-approval — This listing is live. Saving changes sends it back to review; it stays hidden until approved again." with Cancel / Edit anyway confirm buttons.

### 5B Post Project Wizard — Builder, 10 steps
Step names: 1 Project Basics → 2 Type & RERA → 3 Location → 4 Wings/Towers/Units → 5 Amenities → 6 Timelines & Progress → 7 Media → 8 Contact → 9 Preview → 10 Submitted. (Same shells as 5A; mobile title "Post Project", "Step X of 10".)

- S1: Project name*, Developer field disabled/prefilled ("Prefilled from your verified builder profile"), description.
- S2: Residential/Commercial/Mixed-use chips; RERA number input (monospace) with live format validation — green check "Format valid — PR/GJ/CITY/YYYY/NNNN"; "RERA registration pending" honest toggle ("no fake number"); amber GATE note: "project cannot go live without RERA verification or an explicit admin-flagged exception."
- S3 Location: same widget as 5A + "Nearby landmarks" chip input (e.g. "VR Mall — 1.2 km").
- S4 Wings/Towers/Units: repeatable rows (WING NAME / FLOORS / UNITS-PER-FLOOR / remove x), "+ Add wing", auto-computed footer "2 wings · 112 units total — feeds the Unit Inventory grid (5D)".
- S5 Amenities: project-scale set — clubhouse, pool, gym, jogging track, banquet hall, indoor games, EV charging, solar.
- S6 Timelines & Progress: Launch date + Possession date* calendar pickers; current construction % slider with draggable knob (64%).
- S7 Media: brochure PDF card ("4.2 MB · stored as PDF, never converted to image") with remove; floor-plan image dropzone (same widget as 5A); Project video URL (optional); 360° tour link (kuula.co / matterport.com) with note "If empty, public page shows the honest 'Setup Required' tab state — never a broken embed."
- S8 Contact: identical to 5A step 7.
- S9 Preview: Batch 4 Project Detail in PREVIEW frame with per-block Edit links.
- S10 Submitted: "Project submitted for review", "Our team will verify your RERA registration before approval — typically 1–2 business days", combined status chip "Pending · RERA check".

### 5C Post Requirement Wizard — 7 steps
Step names: 1 Looking For → 2 Location Preference → 3 Budget Range → 4 Specifications → 5 Timeline → 6 Contact Preference → 7 Preview + Submit. (Same shells; "Step X of 7".)

- S1: Buy / Rent / Project segmented pill; type cards Apartment / House-Villa / Plot / Commercial.
- S2: locality search + removable chips (Satellite, Bodakdev); note "Up to 5 localities across cities."
- S3 Budget: Min/Max inputs + "Loan pre-approved" checkbox.
- S4 Specifications: BHK chips (2/3/4+), Min/Max area, must-have checkboxes ("Covered parking (must-have)", Lift).
- S5 Timeline: radio cards Immediate / 1–3 months (selected) / 3–6 months / Flexible.
- S6 Contact preference: same as 5A step 7 plus "How should brokers reach you?" radio (in-app proposals only / calls OK).
- S7: success — "Requirement posted", "REQ-2841 is live for matching." + privacy note "Visible to verified Brokers & Builders only — never public, never to guests."

### 5D Unit Inventory Management — Builder
- Desktop grid: header "Tower A · Floors 1–14 · 56 units" + Tower A / Tower B segmented toggle; columns checkbox / UNIT / TYPE / AREA / PRICE / STATUS; selected rows highlighted teal; EntityStatusBadge chips Available (green) / Booked (amber) / Sold (gray); dark bulk action bar: "2 units selected" + buttons Mark Booked / Mark Sold / Update price….
- Mobile: header with back + Filter icon button; stacked accordion cards (checkbox, "A-701 · 3 BHK", "1,540 sq ft · Rs 89 L", status chip, chevron expand); dark bottom bulk bar "1 selected" + Status… / Edit buttons.
- Unit edit: mobile bottom sheet (grab handle, "Edit unit A-701", Price input + Status select Available/Booked/Sold, Cancel / Save changes); desktop = centered modal, same fields.

## ADD-ON features/screens in the design NOT in the docs/prompts (deltas)

1. "+3" step-overflow indicator in desktop stepped header (compresses 9 steps to 6 visible + overflow).
2. Photo-count growth nudge: "listings with 5+ photos get 2x more views" persuasive banner (prompt only required min-photo helper).
3. Long-press-to-reorder + tap-scissors-to-crop mobile interactions spelled out in media microcopy.
4. Description live character counter with minimum ("Min 30 characters · 132/2000").
5. Cross-city autosuggest with bold match highlighting ("sate" → Satellite Ahmedabad AND Satellite Road Rajkot).
6. WhatsApp + in-app notification promise on property submit success (channel-specific).
7. "View listing" + "Go to My Listings" post-submit actions (prompt only asked confirmation + Pending badge).
8. Edit-after-approval as a confirm dialog with Cancel / "Edit anyway" buttons (prompt asked only for a banner).
9. Draft re-entry card with mini progress bar + "6 of 9 steps done · saved 2 hrs ago" granularity and placement (top of My Listings).
10. RERA Gujarat format mask + live green "Format valid — PR/GJ/CITY/YYYY/NNNN" validation (prompt asked generic format validation).
11. "Pending · RERA check" combined status badge on project submit.
12. Auto-computed unit total from wings ("2 wings · 112 units total — feeds the Unit Inventory grid (5D)") — explicit data link wizard→5D.
13. EV charging + solar in project amenity set (beyond prompt list).
14. 360° tour honest-fallback annotation ("Setup Required tab, never a broken embed").
15. "Loan pre-approved" checkbox in requirement budget step — new field not in prompt.
16. "Up to 5 localities across cities" cap on requirement locations.
17. "How should brokers reach you?" (in-app proposals only / calls OK) radio — new privacy control.
18. Requirement ID assignment ("REQ-2841 is live for matching") — immediate go-live with an ID (see conflict below).
19. Tower A/B segmented filter + mobile Filter icon in unit inventory.
20. "Update price…" bulk action in unit inventory bulk bar (prompt asked bulk status only).
21. Preferred contact time chips (Anytime / 9 AM–1 PM / 5–9 PM) — concrete slot values.
22. Inline "Verified" check inside the phone field on contact steps.

## Items in the prompt that are MISSING from the design

- "Show EVERY step desktop+mobile" not literally fulfilled: shells shown once per wizard; several steps are dashed reference placeholders only (5A S3/S6 in shells; 5B S3, S5, S8, S9; 5C S6). Deliberate compression per global-rule banner; no per-step mobile renders.
- 5A S2 sub-type cards for Commercial and Plot not shown (only residential sub-type chips).
- Crop UI widget never rendered (mentioned in microcopy only).
- 5B S7 "project video upload" — design has URL field only.
- 5D unit detail is minimal (price/status only) — no per-unit extra fields.
- No skeleton/loading or error states for the 5D grid.
- Conflict with CLAUDE.md §17: 5C step 7 says the requirement "is live for matching" immediately, but master rules require team approval before display. No Pending state for requirements shown.

## Notable UX patterns

- One shared wizard shell (desktop sidebar + breadcrumb + stepped header; mobile back-header + Step X of N bar) reused byte-identically across 5A/5B/5C — only the panel swaps.
- Sticky footer hierarchy: Back (ghost, left) · Save Draft (secondary outline) · Continue (primary teal); mobile 1:2 flex ratio Back/Continue.
- Validation = top summary banner + red 1.5px field borders + per-field red microcopy.
- Selected chips/cards = teal fill #E7F2EF + teal border; brand #0F6B5C.
- Honest-state design language throughout ("no fake number", "Setup Required tab", "PREVIEW — not yet live").
- Dark (#18181b) bulk-action bars for multi-select on desktop and mobile.
- Bottom sheet with grab handle for mobile edits; centered modal on desktop.
