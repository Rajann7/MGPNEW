## Batch 8 — Builder/Developer Dashboard

Static commented-HTML mock. All 27 prompt screens represented. Reused screens (6,9,10,21,25,26,27) shown as annotated reference cards pointing to Batch 6/7; builder-specific deltas fully drawn.

### Screens/components present (full inventory)
1. **Overview**: sidebar nav (Overview, My Projects [3], Unit Inventory, Leads [9], Site Visits, Agents/Team, Ads/Promotions, Analytics, Settings) — Builder adds **Unit Inventory, Agents, Ads**; Post Project CTA; stat cards Active Projects/Total Leads/Units Sold-Booked/Active Ads; skeleton variant ref; bell w/ unread dot; footer "Sankalp Developers · Builder · RERA ✓".
2–3. **My Projects list + wizard entry**: status tabs All(3)/Live(2)/Pending(1)/Completed(0); project cards w/ RERA badge + "46 units remaining" + "31 leads this month", Inventory/Edit/Delist; Pending-review card ("~48 hrs"); empty state; **Draft card "Step 2 of 6"** + Continue Draft; **Edit re-approval banner** ("editing price/RERA/unit counts sends back for review; stays live with previous data").
4–5. **Unit Inventory (flagship)**: desktop table sticky header (UNIT/FLOOR/WING/TYPE/CARPET/PRICE/STATUS), "132 units · 46 available", Wing filter + Status/Type filters, **bulk bar (Mark Booked/Sold/On Hold/Adjust price/Clear)**, badges Available/Booked/Sold/On Hold; **mobile true accordion** by Wing→Floor (52px touch unit rows, per-status counts, sticky bulk bar); **Unit edit modal** (Type, Carpet, segmented Status, Price + **"Override base price" checkbox** w/ base-price context).
6–11. **Leads/Feed/Proposals/Messages/Site Visits**: (6 Leads, 9 Proposals, 10 Messages = ref cards to Batch 6/7 w/ extra Project+Agent columns); **7 Lead detail "Assigned Agent" block** (agent + Reassign dropdown, "Unassigned" fallback); **8 Requirement Feed "explainable match" chip** ("Matches: Budget · Location · 2 BHK", explicit "never a vague 95% match"); **11 Site visit "Assign to agent" dropdown**.
12–14. **Agents/Team**: desktop table (AGENT/ROLE/PERMISSIONS/STATUS) Active/Invited/Suspended chips, Invite CTA, "invite emails expire 7 days", empty state; **13 Invite modal** (Email, Role, module checkboxes Leads/Site Visits/Listings-Inventory/Ads/Messages); **14 Permissions editor** (per-module toggles w/ descriptions incl. "spends money", "unsaved changes" save bar, "changes apply immediately").
15–18. **Ads/Promotions**: **15 list** tabs Draft/Pending/Active/Expired/Rejected w/ thumbnails, "spent ₹12,400 of ₹12,500", Duplicate; **16 Create Ad wizard step 2 of 7** (Project→Creatives→Targeting→Schedule→Preview→Payment→Submit), **3 creative slots w/ aspect ratios** (Desktop 1200×300, Tablet 800×320, Mobile 390×200), **Step 5 in-context preview** ("banner appears between result rows" w/ "AD" label); **17 Campaign detail** perf **"—" "starts after approval"** + Spend, Edit/Pause/Cancel; **18 Ad analytics "Setup Required"** ("Never simulated").
19–21. **Analytics/Billing/Invoices**: **19** sales-velocity bar chart + Views/Lead→visit 22%/**Visit→booking "—" "needs 10+ visits"**; **20 Billing** "Builder Plus ₹4,999/mo", usage bars Projects 3/10 + Agent seats 3/5, **Ad-spend wallet ₹2,600 + Add funds** ("campaigns pause automatically at ₹0 — never negative"); **21 Invoices** ref card ("ad-spend top-ups as separate line items").
22–24. **RERA/Microsite/Construction**: **22 RERA proof upload** (reg number, certificate PDF "Under review", status timeline); **23 Company microsite edit** (logo crop, name, Founded/HQ, About, website+Instagram, Preview/Save); **24 Construction progress form** (Milestone select, **Completion % slider 72%**, Site photos, Publish — "appears on public Project Detail timeline Batch 4").
25–27. **Reused ref cards**: **25 Notifications** (+ builder types Ad approved/rejected, RERA expiring, Agent accepted invite, Unit marked booked by agent); **26 Support/Help**; **27 Settings** (+ Team notifications + danger zone deletes company account + all agent access).

### ADD-ON features NOT in the prompt (deltas)
- **Ad "AD" labelling mandated in-context** ("Ads are always labelled 'AD' to users") — transparency requirement.
- **Ad-spend wallet auto-pause rule**: "campaigns pause automatically at ₹0 — never negative".
- **Permission toggles carry risk descriptions** ("Create & manage campaigns (spends money)") + **"changes apply immediately"**.
- **Invite emails expire in 7 days / resend from overflow**.
- **Unit price "Override base price" checkbox** w/ base-price context ("override shows on listing").
- **On Hold as a 4th unit status** (blue) beyond Sold/Booked; bulk options Mark Booked/Sold/On Hold/Adjust price.
- **Analytics honesty gates with thresholds**: "Visit→booking — needs 10+ visits", "from inventory status changes", Jul* in-progress marker.
- **Requirement match chip anti-pattern note**: "never a vague '95% match' score".
- **Edit re-approval keeps project live with previous data** until approved.
- **Construction update feeds Batch 4 timeline**; milestone options enumerated.
- **Settings danger zone** deletes company + all agent access; **Team notifications** routing.
- **Notification types enumerated** for builder (Ad approved/rejected, RERA expiring, Agent accepted invite, Unit booked by agent).
- **Ad list "Duplicate" action** on expired campaigns.

### Items in prompt MISSING/thin in design
- Reused screens not fully redrawn (Project Leads 6, Proposals 9, Messages 10, Invoices 21, Notifications 25, Support 26, Settings 27) — annotated reference cards only.
- Ad wizard steps 1,3,4,6,7 shown as progress labels + text note (only step 2 creatives + step 5 preview fully drawn).
- RERA rejected-state with reason + resubmit referenced via timeline note only.
- Loading/empty/error states for most lists deferred by reference.
- Overview skeleton variant + mobile shell referenced, not redrawn.

### Notable tokens/patterns
Same token set as Batch 4. Extra status colors: On Hold blue `#1E40AF/#EFF6FF`, Sold neutral gray, selected-row tint `#F7FBFA`, bulk-bar `#E7F2EF/#C4E0D9`. Patterns: sticky table header + sticky bulk action bar; genuine mobile accordion (Wing→Floor→52px rows); segmented status control; permission toggles w/ save bar; wizard progress dots w/ labelled path; honest "—" metrics w/ threshold captions; % slider w/ draggable handle; modal↔bottom-sheet parity; danger actions via confirmation dialogs.
