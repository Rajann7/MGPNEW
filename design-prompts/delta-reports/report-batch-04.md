## Batch 4 — Detail Pages + Public Profiles

Source = static commented-HTML mock (Tailwind-CDN, top anchor nav). All 10 prompt screens present. Anchor nav: `1 Property · 2 Project · 3 Requirement · 4 Broker · 5 Builder · 6 Owner + Claim · 8 Report · 9 Gallery · 10 Compare`.

### Screens/components present in design (full inventory)
1. **Property Detail** (desktop + mobile + unavailable variant): condensed header, breadcrumb (Home>Ahmedabad>Satellite>title), desktop gallery grid + "View all 12 photos", mobile swipeable carousel "1/12" + dots; price ₹85 L, Verified "(sample)" badge, ⋮ overflow; spec chips (3 BHK/1,450 sq ft/7th of 12 floors/Semi-furnished/East facing); Description (mobile "Read more"); 6-item Amenities grid; Location = map embed + **"Map: Setup Required"** address-only fallback; Similar properties carousel; sidebar "Posted by" card (Rajesh Patel/Owner/Since 2023, verified), **masked "+91 98XXX XXX45"** → "Reveal number" + "Enquire Now" + auth-return note; overflow Share/Save/Report; mobile sticky CTA Call + Enquire Now; **Unavailable variant** (sold 30 June 2026 + Similar in Satellite + "Browse all 3 BHK", explicit no soft-404).
2. **Project Detail**: hero w/ logo, "Sankalp Grand Vista", **"RERA Verified (sample)"**, ₹62 L–₹1.4 Cr, Possession Dec 2027; tabs Overview/Floor Plans/Amenities/Location/Gallery/Video/360° Tour; Available units (2/3/4 BHK cards); **construction progress timeline** (Foundation→Structure→Finishing 64%→Handover Dec 27); **Video + 360° "Setup Required"** cards; Similar projects carousel; sidebar enquiry form (name/+91/interest select incl. Site visit); brochure "PDF · 4.2 MB — never converted to image" View+Download; builder mini-card; mobile sticky Call+Enquire.
3. **Requirement Detail** (scoped): desktop Broker/Builder view, REQ-2841, Active, spec grid (TYPE/BUDGET/LOCATION/TIMELINE), masked poster "M****a P." "identity masked until proposal accepted", **Send Proposal**; mobile **guest teaser** (blurred + lock + "Login to view full requirement").
4. **Broker Profile** (/broker/[slug]): cover+avatar w/ verified, "Kunal Bhatt / Broker / Bhatt Estate Consultants · 8 years active", Contact broker; service-area chips; stats "14 Active listings (real count)", **"Reviews: Coming soon / never faked"**; listings grid; "Report profile — in ⋮ overflow".
5. **Builder Microsite** (/builder/[slug]): logo, RERA reg "PR/GJ/SURAT/2019/0847", Founded 2009·HQ Surat·12 projects; tabs **Active projects (3)/Completed (9)/About**; grid; About.
6. **Owner Public-Safe Profile**: minimal card (Owner/2 active listings/Member since 2023) + amber notice "No phone/email exposed publicly".
7. **Claim Profile**: "Is this your business?"/unclaimed + Claim modal (role select, RERA/GST proof upload max 10 MB, "reviewed within 2 business days").
8. **Report Modal** (desktop + mobile bottom sheet): reason select (Spam/Fraud/Incorrect/Inappropriate/Other), details, "3 reports/day" note.
9. **Fullscreen Gallery**: counter "3/12 · Living room", **keyboard-nav hint (← → · Esc)**, close X, prev/next, thumbnail strip; mobile swipe+dots note.
10. **Comparison Page**: 2 filled + 1 "Add another to compare" empty column, per-column Remove; rows Price/sq ft, Carpet area, Floor, Furnishing, Facing, Status (Verified vs **Pending**), Enquire.

### ADD-ON features in design NOT in the prompt (deltas)
- **Comparison exposes verification Status as a spec row** (Verified vs Pending badge) — moderation state surfaced in compare table.
- **Requirement masking staged with explicit trigger**: "identity masked **until proposal accepted**".
- **Claim modal adds "Your role at the company" select** (Director/Partner, Authorized signatory, Marketing head).
- **Claim SLA copy**: "Reviewed by Verification team within 2 business days."
- **Project enquiry intent dropdown includes "Site visit"** (links Batch 9 site-visit flow).
- **Unavailable variant gives concrete sold reason/date** + scoped "Browse all 3 BHK in Satellite" CTA.
- **Gallery counter has per-photo room caption** ("3/12 · Living room").
- **In-UI honesty labels baked into copy**: "(sample)" badges, "(real count)", "never faked", "never converted to image".
- **Owner privacy notice is a visible amber banner element**, not just annotation.

### Items in prompt MISSING/thin in design
- Project tab bodies not individually sketched (only Setup-Required cards + units + timeline).
- Mobile fullscreen gallery only described in caption note.
- Similar projects carousel on Project mobile not drawn.
- Report modal from ad/message context not shown (only property demonstrated).
- 3-filled comparison state not shown.

### Notable tokens/patterns
Brand `#0F6B5C` (hover `#0C5648`), soft `#E7F2EF`/border `#C4E0D9`; setup-required blue `#EFF6FF/#BFDBFE/#1E3A8A`; privacy amber `#FFFBEB/#FDE68A/#B45309`; danger `#DC2626/#FEF2F2`; pending `#D97706`. Inter, radii 10/12/16/24. Shells: condensed header + breadcrumb (desktop); 56px contextual header w/ 44px back/share/save (mobile); sticky bottom CTA safe-area padding. Honesty patterns: masked phone/poster, blur+lock teaser, modal↔bottom-sheet parity w/ grab handle, gallery keyboard hints.
