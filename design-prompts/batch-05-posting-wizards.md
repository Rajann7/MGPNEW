# Batch 5 — Property/Project/Requirement Posting Wizards

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 5 of 17 — Posting Wizards.

MANDATORY CONSISTENCY — reuse the EXACT design system, tokens, and shell patterns already established in Batch 1. Do not invent new colors, radii, shadows, fonts, icon styles, or navigation shells. Specifically re-apply:
- Dashboard shell (sidebar desktop / bottom-nav+drawer mobile) surrounding the wizard.
- App-like contextual header WITH BACK BUTTON on every mobile wizard step (title = "Post Property" etc., right action = "Save Draft").
- Form wizard pattern from Batch 1 Section 6 EXACTLY: desktop horizontal stepped progress + sticky footer (Back/Save Draft/Continue); mobile "Step X of N" progress bar + STICKY BOTTOM ACTION BAR that never covers content.
- Upload widget pattern (drag/drop, progress bar, reorder, crop) reused identically across all media steps.
- Validation error state (field-level red border + message + top error summary) shown at least once per wizard.
- No fake data, no dead buttons.
- Mobile-first: 390px → 768px → 1280px+, no horizontal scroll.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen/step.

## SCREENS TO DESIGN

### 5A. Post Property Wizard (Owner/Broker) — 9 steps, show EVERY step desktop+mobile
1. Basic details (title, description).
2. Property type & purpose (Sale/Rent, Residential/Commercial/Plot, sub-type cards).
3. Price & area (price input with "negotiable" toggle, area with unit selector, additional charges).
4. Location (city/locality autosuggest, map pin placement, address line, "use current location" button on mobile).
5. Amenities (multi-select icon-chip grid, categorized: Basic/Safety/Lifestyle).
6. Media upload (cover image selection, drag-reorder gallery grid, upload progress state, min-photo-required helper text).
7. Contact details (phone confirmation, preferred contact time, visibility note: "Your number stays hidden until you approve a reveal").
8. Preview (renders exactly like the public Property Detail page from Batch 4, with "Edit this section" links per block, marked "PREVIEW — not yet live").
9. Submit for approval — confirmation screen ("Submitted for review, typically approved within 24 hours") + status badge (Pending).

Also show: **Draft saved state** (list re-entry point — "Continue where you left off" card), and **Edit-after-approval flow** (banner: "Editing this listing will require re-approval before it goes live again").

### 5B. Post Project Wizard (Builder) — 10 steps, show EVERY step desktop+mobile
1. Project basics (name, description, developer name prefilled).
2. Type/purpose & RERA (RERA number input with format validation, "RERA pending" honest toggle state if not yet registered — gate note: cannot publish live without RERA or explicit flagged exception).
3. Location (map pin, address, nearby landmarks).
4. Wings/Towers/Units configuration (repeatable wing rows: name, floors, units-per-floor, add/remove wing button).
5. Amenities (same pattern as property wizard, larger project-scale set: clubhouse, pool, gym, etc.).
6. Timelines/Construction progress (launch date, possession date, current construction % slider).
7. Media (brochure PDF upload — annotate "stored as PDF, never converted to image", floor plan images, project video URL/upload, 360° tour link field — all with Setup-Required-friendly optional states).
8. Contact details.
9. Preview (renders like Project Detail page from Batch 4, marked PREVIEW).
10. Submit for approval — confirmation + Pending status + note "RERA will be verified by our team before approval".

### 5C. Post Requirement Wizard (Owner/Broker) — 7 steps, show EVERY step desktop+mobile
1. Looking for (Buy/Rent/Project, property type cards).
2. Location preference (multi-city/locality selector, chip-based).
3. Budget range.
4. Specifications (BHK, area range, must-have amenities checklist).
5. Timeline (immediate/1-3 months/3-6 months/flexible — radio cards).
6. Contact preference.
7. Preview + submit — confirmation screen, note on visibility scope ("Visible to verified Brokers & Builders only, not public").

### 5D. Unit Inventory Management (Builder — supplementary to project wizard)
- Wing/floor/unit grid table (desktop) → stacked accordion cards (mobile), each unit row: unit no., type, area, price, status (Available/Booked/Sold) as EntityStatusBadge chip, bulk-select checkboxes, bulk-status-update bottom action bar.
- Unit detail/edit modal (desktop) / bottom sheet (mobile).

Annotate globally on this batch: every wizard step must show the SAME progress indicator style, SAME sticky footer button positions, and SAME back-navigation behavior — no step should look like a different product.
