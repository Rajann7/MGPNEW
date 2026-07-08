# Batch 7 — Broker Dashboard (Standalone)

Source: `Batch_7_Broker_Dashboard_Standalone_.txt` (TEMPLATE lines 1–1045; JS resources are dc-runtime + lucide only).

## Screens/components present in design (full inventory)

Anchor nav: 1 Overview · 2–4 Listings · 5 Req Feed · 6–8 Proposals · 9 CRM List · 10 Kanban · 11 Lead Detail · 12–14 Reused · 15 Analytics · 16–18 Billing/Verif · 19–22 Profile+. All 22 prompt screens covered (several as explicit "reused from Batch 6" reference cards).

### Navigation orders (exact)
- **Desktop sidebar** (broker set): Overview (active) → My Properties [badge 14] → My Requirements → **Requirement Feed [badge 6]** → **Proposals** → **Leads / CRM [badge 5]** → Messages → Site Visits → Analytics → Billing → Settings. Footer: "Nilesh Mehta / Broker · Mehta Estates".
- **Mobile**: annotated as identical to Batch 6 1C/1D — bottom nav **Home · Search · Post · Leads · Profile** + hamburger drawer with the broker nav list above; skeleton stat row = Batch 6 1B (not repeated).

### Screen-by-screen
1. **Overview**: greeting "Good morning, Nilesh" + **"6 new requirements match your service areas."** insight line; quick actions **Requirement Feed** (secondary) + Post Property (primary); stat cards: Active Listings 14 ("2 featured"), New Leads This Week 19 gradient card ("5 not yet contacted"), Proposals Sent 8 "this month" ("2 shortlisted"), Site Visits 3 "upcoming" ("**next: Sat 11 AM**"); **Recent activity feed** with deep-link annotations: "New matching requirement… opens Requirement Feed", "**Your proposal was viewed by Rajesh P.** … opens Proposal Detail", "Site visit confirmed… opens Site Visit Detail".
2. **My Properties (delta only)**: property row with **amber "⚡ FEATURED" chip** overlaid on thumbnail; meta "₹68 L · Kalawad Road, Rajkot · 21 leads · **featured until 18 Jul**"; note: tabs, overflow, delete confirm, loading/empty/error identical to Batch 6 S2.
3. **Post Property wizard entry**: "Post a new property — 5-step wizard (Batch 5) · ~5 minutes · **11 of 25 listings used**" + Start; **Continue Draft card**: "Draft: 2 BHK Flat, Mavdi — Step 3 of 5 · photos pending · saved 2 hrs ago" + Continue Draft + **Discard… (opens standard confirmation dialog)**.
4. **My Requirements**: reused from Batch 6 S3; delta note: **brokers can post requirements on behalf of clients — card adds a small "For client" tag when set**.
5. **Requirement Feed**: filter pills — removable **Rajkot ×** city chip, Budget ▾, Type ▾, Buy/Rent ▾; feed cards: avatar + "Buy: 3 BHK apartment" + **match indicator "🎯 Matches 3 of your listings"**, spec chips (3 BHK / Apartment / Semi-furnished ok), meta "posted 35 min ago by Owner", **Send Proposal** button; second card with **Hide** action; third card in **"Proposal sent" state** (check chip, "you proposed 'Shop, Yogi Chowk' yesterday", **View proposal** action). 5B empty: "No matching requirements right now — New requirements in your service areas appear here automatically. **Widen your areas to see more.**" + **Edit service areas** CTA. Mobile note: full-width cards, filters open standard bottom sheet.
6. **Proposals sent list**: status tabs **Sent (8) / Viewed (4) / Shortlisted (2) / Accepted (1) / Rejected (1)**; cards "3 BHK, Silver Heights → Rajesh P.'s requirement — Sent 2 Jul · **₹68 L vs budget ₹60–90L**" [Viewed]; shortlisted card with **star icon chip**; rejected card with **owner's rejection reason: 'location too far from schools'**; empty state → "Open Requirement Feed" CTA.
7. **Proposal detail**: header "Proposal to Rajesh P. — Sent 2 Jul 2026, 10:14 AM" + "Viewed by owner" chip; sections THEIR REQUIREMENT / YOUR PROPOSED LISTING / YOUR MESSAGE (Gujarati-flavored sample "Namaste Rajesh bhai…"); **STATUS TIMELINE: Sent (2 Jul 10:14) → Viewed by owner (2 Jul 4:52 PM) → Awaiting response (shortlist/accept/reject by owner)**; actions **Withdraw…** + **Message owner**.
8. **Send Proposal modal** (desktop): "To: Rajesh P. — Buy: 3 BHK apartment, ₹60L–₹90L, Rajkot"; **listing selector with match hints ("matches budget + area")** across 2 candidate listings; message textarea; Cancel / **"Sending…" spinner button — "Submit button disables immediately on tap — prevents duplicate proposals."** Mobile = same content in bottom-sheet shell.
9. **Leads/CRM list**: filters Status ▾ / Source ▾ / Date range ▾ + **Kanban view toggle**; **bulk actions bar (2 selected): Change status / Export CSV / Delete… / Clear selection**; table NAME / PROPERTY / **SOURCE (Listing page, Proposal, Saved search)** / STATUS / LAST ACTIVITY; mobile note: Batch 6 4B card pattern, **bulk select via long-press**.
10. **Leads/CRM Kanban** (desktop 1280px+): 5 columns with counts — **New (2) → Contacted (1) → Site Visit (1) → Negotiation (1) → Closed / Lost (2)**; cards: name + property + last-activity icon line ("Enquired 20 min ago", "Called yesterday", "Visit: Sat 5 Jul, 11 AM", "Counter-offer discussed Tue"); shown states: **card mid-drag with "Drop here" drop-target highlight**, **hover quick-details card (masked phone +91 98988 •••10 + Open / Note buttons)**, **overflow "MOVE TO STAGE" menu (Contacted / Site Visit / Negotiation) + "Open detail"**; Closed/Lost column mixes **CLOSED ✓** and **LOST** cards ("budget mismatch" reason). Mobile fallback annotated: below 768px Kanban toggle hidden, list view + stage filter; **status changes via Move-to-stage menu, never drag**.
11. **Lead Detail (CRM drawer)**: header "Amit Shah — Shop, Yogi Chowk · **via proposal** · Contacted" + **status dropdown**; **Follow-up reminder scheduler: quick chips "Tomorrow 10 AM / In 3 days / Next week" + "Pick date…" + confirmation "Reminder set: Sat 5 Jul, 10:00 AM — push + email"**; **LINKED section**: related listing card ("Your listing") + **linked proposal card ("Proposal — shortlisted · Sent yesterday to Kartik T.'s requirement")**; NOTES & TIMELINE with user note + system entry ("Lead received via proposal"); add-note input; footer Call / Schedule Visit / Message.
12. **Messages**: reused Batch 6 S6–7 verbatim (reference card), incl. safety banner + sticky input. No broker deltas.
13. **Site Visits**: reused Batch 6 S8–9; broker deltas noted: **sees requester + which listing per visit; multi-listing calendar color-codes by property**.
14. **Saved Items/Searches**: reused Batch 6 S10–11.
15. **Analytics**: 15A **conversion funnel "Last 90 days · all listings": Leads received 112 → Contacted 84 (75%) → Site visits 31 (28%) → Closed 6 (5.4%)**; 15B **listing performance ranking table** (# / LISTING / VIEWS / LEADS / VISITS) with featured ⚡ marker and **"—" where no data ("never zero-filled or fabricated")**; empty/Setup-Required states follow Batch 6 13B/13C.
16. **Billing**: **Broker Pro — ₹1,999/month · next billing 15 Jul 2026** + Active chip; **three usage meters: Listings 14/25, Proposals this month 8/30, Featured slots 2/3**; plan feature list (CRM + Kanban, Requirement Feed, Full analytics); Manage plan.
17. **Invoices**: reused Batch 6 S15–16 (reference card).
18. **Verification — broker docs**: "Brokers verify identity + business"; rows: **Identity (Aadhaar) — Approved 12 Jun** [Approved chip]; **RERA agent registration (optional) — "Boosts trust badge on your listings"** + Upload; **GST certificate (optional) — "Needed for GSTIN on invoices"** + Upload. Timeline/rejected states follow Batch 6 S18.
19. **Profile edit — broker fields**: avatar + "Nilesh Mehta — Broker · verified ✓"; **Agency name; Service areas multi-city chips (Rajkot × / Morbi × / Jamnagar × / + Add city…) with note "Requirement Feed is scoped to these cities."**; Years of experience; locked mobile (+91 98790 •••32); Bio; Cancel / Save changes.
20. **Notifications Center**: reused; broker adds two types: **"New matching requirement" and "Proposal status changed"**.
21. **Support/Help**: reused; broker FAQ set covers **proposal limits and featured-slot billing**.
22. **Settings**: reused; broker adds **"Requirement Feed alerts" toggle group (instant / daily digest / off)**.

## ADD-ON features/screens in the design NOT in the docs/prompts (deltas)

1. **Nav count badges** on My Properties (14), Requirement Feed (6), Leads/CRM (5).
2. **Overview insight subtitle** "6 new requirements match your service areas." + "Requirement Feed" quick-action button (prompt only asked stat cards + activity feed).
3. **Stat card secondary insights**: "2 featured", "5 not yet contacted", "2 shortlisted", "next: Sat 11 AM".
4. **Activity feed deep-link targets** annotated per item (opens Requirement Feed / Proposal Detail / Site Visit Detail) and a **"proposal was viewed by" event type**.
5. **"featured until 18 Jul" expiry** on the FEATURED chip row.
6. **Wizard entry usage counter** "11 of 25 listings used" + **Discard draft action with confirmation** (prompt asked only entry card + Continue Draft).
7. **"For client" tag** — brokers posting requirements on behalf of clients (new concept, not in prompt or docs).
8. **Requirement Feed match engine surface**: "Matches 3 of your listings" per-card match indicator; **Hide card action**; **already-proposed state with View proposal**; "Widen your areas" + **Edit service areas** CTA in empty state.
9. **Proposal price-vs-budget comparison line** ("₹68 L vs budget ₹60–90L") on sent-proposal cards.
10. **Owner rejection reason surfaced verbatim** on rejected proposals ("location too far from schools").
11. **Proposal Withdraw… action** and **Message owner** action on proposal detail (not in prompt).
12. **Send-proposal listing selector with automatic match hints** ("matches budget + area").
13. **CRM bulk Export CSV** action (prompt said "bulk actions bar" generically; CSV export is specific/new).
14. **Lead SOURCE dimension** with values Listing page / Proposal / Saved search.
15. **Kanban hover quick-card with masked phone number** (privacy-aware +91 98988 •••10) + Note quick-action.
16. **CLOSED ✓ vs LOST distinction with loss reason** ("budget mismatch") inside the final column.
17. **Follow-up reminder quick-presets + delivery channels** ("push + email") in lead detail.
18. **LINKED entity block** connecting lead ↔ your listing ↔ proposal status.
19. **Proposals-per-month quota meter (8/30)** on billing — proposal limits as a metered plan resource.
20. **Optional RERA agent registration + GST certificate uploads** with benefit copy (trust badge boost; GSTIN on invoices) — prompt only said "agency license if applicable".
21. **Service-areas → Requirement Feed scoping rule** stated on profile edit.
22. **Broker-specific notification types** (New matching requirement, Proposal status changed) and **Requirement Feed alert frequency setting (instant / daily digest / off)**.
23. **Multi-listing calendar color-coding by property** for broker site visits.

## Items in the prompt that are MISSING from the design

- Screens 12, 13, 14, 17, 20, 21, 22 are **reference/annotation cards only** — no rendered UI in this file (deliberate reuse of Batch 6, but nothing to visually verify broker variants).
- **Mobile renders are almost entirely absent** — mobile behavior is conveyed via annotation notes (feed cards, bottom-sheet filters, long-press bulk select, Kanban fallback); prompt asked "show desktop then mobile for each screen".
- **Site Visits calendar** still never rendered (color-coding only described).
- CRM list **error/loading/empty states not rendered** (referenced to Batch 6 S4).
- Verification **status timeline for broker docs** not rendered (referenced).
- **CONTRADICTION with Batch 5**: wizard entry card says "**5-step wizard**" and draft "Step 3 of 5", but Batch 5 defines the Post Property wizard as **9 steps** — inconsistency to resolve before implementation.

## Notable UX patterns

- Explicit reuse-by-reference cards (copy icon + "Identical to Batch 6 · Sx") keep the batch delta-focused — implementation should treat Batch 6 as the source for shared modules.
- Kanban is desktop-only by design; touch devices always get list + Move-to-stage menu (no drag on mobile) — accessibility/interaction-safety conscious.
- Duplicate-submit protection concretely specified (instant disable + "Sending…" spinner) on Send Proposal.
- Privacy masking of phone numbers in hover cards until reveal rules allow.
- Matching/relevance surfaces everywhere (match chips, budget-vs-price, scoped feed) form a coherent broker matching loop: Feed → Proposal → Lead → CRM stages.
