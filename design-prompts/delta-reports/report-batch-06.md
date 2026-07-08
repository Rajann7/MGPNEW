# Batch 6 — Owner Dashboard (Standalone)

Source: `Batch_6_Owner_Dashboard_Standalone_.txt` (TEMPLATE lines 1–1672; JS resources are dc-runtime + lucide only).

## Screens/components present in design (full inventory)

Anchor nav: 1 Overview · 2 Properties · 3 Requirements · 4 Leads · 5 Lead Detail · 6–7 Messages · 8–9 Site Visits · 10–12 Saved · 13 Analytics · 14–17 Billing · 18 Verification · 19–20 Profile · 21–22 Support · 23–24 Account. All 24 prompt screens are present.

### Navigation orders (exact)
- **Desktop sidebar** (240px, collapsible via chevron in footer): Overview (active) → My Properties [teal count badge 4] → My Requirements → Leads [red count badge 3] → Messages → Site Visits → Saved → Analytics → Billing → Settings. Footer: avatar RP "Rajesh Patel / Owner" + collapse button.
- **Mobile drawer** (300px, from hamburger): header avatar + "Rajesh Patel / Owner · Ahmedabad" + close X; items: Overview → My Properties [4] → My Requirements → Leads [3] → Messages → Site Visits → Saved → **Recently Viewed** → (divider) → Analytics → Billing → **Verification** → Settings → **Support**; footer: **Log out** (red). Note: drawer has MORE items than desktop sidebar (Recently Viewed, Verification, Support, Log out).
- **Mobile bottom nav** (5, exact order): **Home · Search · Post (raised center teal FAB, 48px, -22px offset) · Leads · Profile**.
- **Desktop top bar**: breadcrumb (Dashboard > Overview) · global search (max 320px) · notification bell with red dot · avatar chip.

### Screen-by-screen
1. **Overview**: greeting "Good morning, Rajesh" + subtitle; quick actions View Leads (secondary) + Post Property (primary); 4 stat cards — Active Listings 4 ("1 pending review"), **New Leads This Week 7 as the single gradient StatCardGradient** ("3 not yet contacted" + trend icon), Site Visits Scheduled **"—" honest empty** ("No visits scheduled yet"), Plan Usage "4 / 5 listings" with **amber 80% usage meter bar**; Recent leads table (LEAD/PROPERTY/STATUS/RECEIVED, chips New amber / Contacted green / Closed gray) + "View all". 1B: shimmer skeleton variant of stat row. 1C: mobile 390px root screen (no back button; logo + "Dashboard" + hamburger + bell), 2x2 stat grid, lead cards, bottom nav. 1D: drawer open over dimmed page.
2. **My Properties**: tabs with counts **All (4) / Live (2) / Pending (1) / Rejected (0) / Paused (1) / Expired (0)**; property rows: thumb, title + status chip, meta line "₹85 L · Satellite, Ahmedabad · **37 leads** · **expires in 41 days**"; status-contextual actions — Live: View/Edit/Pause/Delete; Pending: View/Edit/Delete (no Pause), meta "under review, typically 24 hrs"; Paused (dimmed row): **Resume**/Edit/Delete, meta "**hidden from search while paused**". 2B: delete confirmation dialog — "Delete this listing? — '3 BHK…' **and its 37 leads** will be permanently removed. This cannot be undone." Cancel / Delete listing (red). 2C: mobile contextual header (back + title + plus), tab pills, cards with **overflow (⋮) menu open: View / Edit / Pause / Delete(red)**. 2D: empty state "You haven't posted a property yet — Posting is free and takes about 5 minutes." + Post Property CTA.
3. **My Requirements**: header + Post Requirement; cards: "Looking to buy: 3 BHK apartment" [Active] — "₹60L–₹90L · Satellite / Bopal · move in 3–6 months · **5 proposals received**" with actions **View proposals** / Edit / **Close**; closed card "Looking to rent: 2 BHK near SG Highway" [Closed] "closed 12 Jun · 8 proposals received" with **Reopen** action. 3B mobile card + empty state ("Tell brokers and builders what you're looking for — they'll send proposals to you.").
4. **Leads list — the worked table→card pair**: tabs All (12) / New (3) / Contacted (6) / Visited (2) / Closed (1); desktop table NAME/PROPERTY/STATUS/DATE with avatar initials + chevron row affordance; **LOADING (skeleton), EMPTY ("No leads yet — Buyers can't enquire until they find you." + "Share your listing" CTA), ERROR ("Couldn't load leads. Check your connection." + Retry)** all shown; 4B same dataset as mobile cards with back header + filter icon.
5. **Lead Detail**: 5A desktop **right drawer 480px** — header "Lead — Meera Purohit / via 3 BHK… · 20 min ago" + close; contact block "**Buyer · Ahmedabad · number revealed to you**" + phone +91 98988 45210 + **Call / Message buttons**; STATUS segmented chips New/Contacted/Visited/Closed; RELATED PROPERTY mini card; NOTES & TIMELINE ("Lead received — Enquired via listing page · today 9:42 AM") + note input; footer **Schedule Site Visit** + **Mark Contacted**. 5B mobile full page with back button + overflow menu.
6. **Messages thread list** (mobile): avatar, name, time, preview ("You:" prefix for own last message), **unread count badge (2)**; inline empty state "No messages yet — Chats with buyers appear here once they message you."
7. **Thread detail** (mobile): header back + avatar + name + **property context subtitle** + phone icon; **safety banner "Never share OTP or payment details in chat."**; "Today" day divider; bubbles with timestamps and **✓✓ read receipts on own message**; sticky input: paperclip attachment + "Type a message…" + send. Caption: desktop renders as **two-pane (list left · thread right)** in the shell.
8. **Site Visits list** (desktop panel): tabs Upcoming (2) / Past (5) + **Calendar toggle button**; visit cards with date block (05 / JUL), "Meera Purohit · 11:00 AM", property line, status "**Awaiting your response**" with Accept / Reschedule / Reject; confirmed card (08 JUL, "Confirmed") with Details.
9. **Site Visit detail** (mobile): date block, "Saturday, 11:00 AM / Requested by Meera Purohit", status chip, property card, **map block + full address + Directions button**; sticky Reject / Reschedule / Accept. 9B **Reject confirmation dialog**: "Reject this visit request? — Meera will be notified that Sat 5 Jul 11:00 AM doesn't work. **Consider rescheduling instead.**" buttons "**Reschedule instead**" / "Reject visit".
10. **Saved properties**: grid cards with filled-heart remove-save icon, price, title, locality, **PROJECT type badge** on project card (price range "₹62 L – ₹1.4 Cr"); empty "Properties you save will appear here — Tap the heart on any listing to save it." + Browse properties.
11. **Saved searches**: rows with bell-ring icon, "**3 BHK in Rajkot [4 new]**" match badge, meta "Buy · ₹40L–₹80L · **alerts daily**", per-row **edit (pencil) + alert-bell toggle** icons; empty state.
12. **Recently viewed**: horizontal strip of mini cards; note "Empty: 'Listings you view will appear here.' + Browse CTA — **section hidden until first view**."
13. **Analytics**: 13A populated — "Views — last 14 days" chart with total 1,284 + axis dates, caption "**data from live tracking, not simulated**"; Lead sources bars (Search results 24 / Saved search alerts 9 / Shared links 4). 13B "Not enough data yet — Charts appear once your listing has been live for 7 days. **Views are being counted — nothing is lost.**" 13C provider banner "**Analytics: Setup Required** — Tracking provider not connected — no charts are shown until it is. **Never fake-active.**" + Set up button.
14. **Billing/Subscription**: **trial countdown banner "Trial: 9 days left on your Basic trial." + Upgrade**; plan card "Basic plan — ₹499/month · next billing 28 Jul 2026" + Active chip; usage meters **Listings used 4/5 AND Featured slots 1/1**; buttons Upgrade to Premium / Manage.
15. **Invoices**: table INVOICE/DATE/AMOUNT with per-row **view (eye) + download** icons; mobile card ("INV-2026-0142 · 28 Jun 2026 · ₹499 · Paid" + View/Download); empty "No invoices yet — they appear after your first payment."
16. **Invoice detail**: printable layout — brand + "MGP Technologies Pvt. Ltd.", "TAX INVOICE INV-2026-0142", BILLED TO with **GSTIN: 24ABCDE1234F1Z5 "(shown only if provided)"**, status Paid, line items with **GST (18%) ₹76.12 breakdown, Total ₹499.00**; actions **Print + Download PDF**.
17. **Pricing/Upgrade**: 3 plan cards — Free ₹0 (1 active listing, standard placement, ✗ featured, ✗ analytics, **Downgrade** button) / Basic ₹499 **CURRENT PLAN ribbon** (5 listings, 1 featured slot, listing analytics, ✗ priority support, "Current plan" disabled) / Premium ₹1,499 (20 listings, 5 featured slots, full analytics + exports, priority support, Upgrade).
18. **Verification Status**: 18A timeline **Submitted → Under Review → Approved** (check states); upload widget "Aadhaar, PAN or Driving Licence · JPG/PDF, max 5 MB" + Choose file; uploaded file row "aadhaar-front.jpg · 1.8 MB · uploaded 1 Jul" + "Under review" chip. 18B rejected: "Verification rejected — Reviewed 30 Jun 2026" + boxed "**Reason from the review team**" (blurred Aadhaar explanation) + **Re-submit document** CTA.
19. **Profile edit**: avatar with camera badge "Tap to upload & crop · JPG/PNG, max 2 MB"; Full name; **Mobile number locked with lock icon — "Locked — contact support to change your verified number."**; Email; City select (Ahmedabad/Surat/Vadodara/Rajkot); Bio; Cancel / Save changes.
20. **Notifications Center**: Mark all read; grouped **TODAY / EARLIER**; items icon + text + timestamp + **explicit deep-link annotation ("opens Lead Detail", "opens My Properties", "opens Billing")**; empty "You're all caught up".
21. **Support/Help**: "Frequently asked" accordion (one expanded: "Why is my listing still pending?" with 24-hr review answer); "Raise a ticket" form with **category dropdown (Listing issue / Billing & payments / Account & verification / Something else)** + Submit ticket; "Your tickets" list with **#4821 In progress / #4710 Resolved** status chips.
22. **Settings**: Notification preferences with **per-channel labels (New lead alerts — Push + SMS; Site visit reminders — Push; Marketing emails — Email)** toggles; Privacy: "**Show my name on listings** — Off shows 'Owner' instead of your name"; Appearance: Light / Dark / System segmented; Language: English dropdown + "**ગુજરાતી — COMING SOON**" disabled; Danger zone: delete-account explanation (**30-day grace period**) + "Delete account…" opening **type-to-confirm ("DELETE") + OTP re-verification** dialog.
23. **Role Change Request**: "Request role change: Owner → Broker"; warning callout (verification required, different limits/pricing, "existing listings stay live during review; your current plan may change after approval"); "Why do you want to switch?" reason field; Submit request; **pending state card "Request under review — Submitted 2 Jul · typically reviewed within 2 business days" + Withdraw button**.
24. **Data Export/Delete**: explanation (listings, leads, messages, invoices); **STEP 1 — CONFIRM IDENTITY: masked mobile +91 98250 •••45 + Send OTP**; Request Export / Request Deletion buttons with confirm dialogs; notes: "Export arrives as a download link via email within 48 hours; deletion has a **30-day grace period during which you can cancel**."

## ADD-ON features/screens in the design NOT in the docs/prompts (deltas)

1. **Sidebar count badges** — My Properties (teal 4) and Leads (red 3) unread-style badges in both sidebar and drawer.
2. **Drawer ≠ sidebar composition rule**: drawer adds Recently Viewed, Verification, Support and a red Log out row; annotation says drawer holds the FULL module list while bottom nav keeps 5 core destinations.
3. **Raised center "Post" FAB** in bottom nav (48px teal circle floating above the bar) — prompt just said bottom-nav Post item.
4. **Personalized greeting ("Good morning, Rajesh")** + secondary insight lines on stat cards ("1 pending review", "3 not yet contacted").
5. **Listing expiry countdown** ("expires in 41 days") and **per-listing lead count** ("37 leads") on property cards.
6. **Status-contextual row actions**: Pending rows lose Pause; Paused rows get Resume + "hidden from search while paused" microcopy — behavior matrix not in prompt.
7. **Delete dialog impact detail**: names the listing AND warns its 37 leads are removed.
8. **Requirement proposals integration**: "5 proposals received" meta + View proposals action + Close/**Reopen** lifecycle on requirements.
9. **Leads empty state growth loop**: "Share your listing" CTA (not just informational empty state).
10. **Lead reveal-status microcopy** "number revealed to you" + **Mark Contacted** one-tap status shortcut in lead detail footer.
11. **Chat read receipts (✓✓), "You:" prefix, unread count badge and day dividers** in Messages — beyond prompt's list.
12. **Reject-visit dialog that actively counter-offers** "Reschedule instead" as primary alternative.
13. **Directions button + map block** on site-visit detail.
14. **Saved search per-row alert-bell mute toggle** + alert frequency label ("alerts daily") + "4 new" match badge.
15. **Recently Viewed section auto-hidden until first view** rule.
16. **Analytics honesty annotations**: "data from live tracking, not simulated", "Views are being counted — nothing is lost", "Never fake-active" Setup-Required banner with Set up CTA.
17. **Featured slots usage meter (1/1)** on billing page — second meter beyond listings-used.
18. **GST 18% line-item breakdown** with derived base amount ₹422.88 on invoice; company legal name "MGP Technologies Pvt. Ltd."
19. **Downgrade button on Free plan** in pricing comparison.
20. **Verification rejected reason presented as quoted reviewer message** with review date.
21. **Per-channel notification matrix** (Push + SMS / Push / Email per event type) rather than simple channel toggles.
22. **"Show my name on listings" privacy toggle** (Off shows "Owner") — new privacy feature.
23. **Account deletion double-guard**: type-to-confirm "DELETE" + OTP re-verification + 30-day grace period.
24. **Role-change Withdraw button** in pending state; note that plan may change after approval.
25. **Data export SLA (48 hours, email link) + deletion cancel window (30 days)** and OTP identity-confirm step with masked number.
26. **Notification deep-link targets documented per item** ("opens Lead Detail" etc.).
27. **Support ticket IDs + status chips** (#4821 In progress, #4710 Resolved) with categories.

## Items in the prompt that are MISSING from the design

- **Site Visits calendar view** (prompt: "calendar toggle (desktop)") — only the toggle button exists; no calendar layout is rendered.
- **Messages desktop two-pane** described in a caption only, not rendered.
- **Recently Viewed grid/empty state** only described in a text note (strip is rendered, empty state is not).
- Desktop shell is rendered only on Screen 1; screens 2–24 are panels "sidebar omitted for clarity" — breadcrumb/top bar not repeated per screen.
- Saved searches "delete" action not visible (edit + bell only).
- Screen 2 mobile lacks Rejected/Expired tabs (only All/Live/Pending/Paused shown).
- Ticket form field details (subject/description inputs) mostly implied; only category dropdown + submit shown.

## Notable UX patterns

- Reference "table → mobile card" pair delivered on Leads (4A/4B) with same dataset, as prompt required, including loading/empty/error trio.
- Honest-data language baked into UI copy (— for no data, "Never fake-active", live-tracking captions).
- Right-side drawer (480px) for lead detail on desktop vs full page on mobile.
- Consistent EntityStatusBadge chip grammar: dot + label; amber=New/Pending, green=Live/Contacted/Confirmed/Active, gray=Closed/Sold/Expired, red=destructive.
- Destructive confirmations everywhere (delete listing, reject visit, delete account, export/delete requests).
- Overflow (⋮) menus replace desktop button rows on mobile cards.
