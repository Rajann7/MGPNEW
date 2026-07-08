# Batch 6 — Owner Dashboard (All Modules)

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 6 of 17 — Owner Dashboard. NOTE: ~80% of real users are Owners on mobile — give mobile screens equal design rigor to desktop, do not treat mobile as an afterthought.

MANDATORY CONSISTENCY — reuse the EXACT design system, tokens, and shell patterns already established in Batch 1. Specifically re-apply on EVERY screen in this batch:
- Dashboard shell: sidebar (desktop, collapsible) / bottom-nav (Home, Search, Post, Leads, Profile) + drawer (mobile).
- App-like contextual header WITH BACK BUTTON on every mobile sub-page.
- Breadcrumb + global search + notification bell + profile dropdown on desktop top bar.
- Every list/table has loading (skeleton), empty (actionable), and error states.
- Table → card responsive transform for every data table.
- Every destructive action (delete listing, cancel) has a confirmation dialog.
- No fake counts/analytics — if a metric has no real data source yet, show it as "Setup Required" or "—" honestly, never a fabricated number.
- Mobile-first: 390px → 768px → 1280px+, no horizontal scroll, sticky elements never overlap.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **Overview/Dashboard Home** — stat cards row (Active Listings, New Leads This Week, Site Visits Scheduled, Plan Usage) with StatCardGradient style + a skeleton-loading variant of the same row; recent-leads table (desktop) / cards (mobile); quick-action buttons ("Post Property", "View Leads").
2. **My Properties list** — status filter tabs (All/Live/Pending/Rejected/Paused/Expired), property cards with status badge, view/edit/pause/delete row actions (overflow menu on mobile), empty state ("You haven't posted a property yet" + Post Property CTA).
3. **My Requirements list** — same list pattern, requirement cards, empty state.
4. **Leads/Inquiries list** — table→card, columns: name, property, date, status (New/Contacted/Visited/Closed), tap-through to detail.
5. **Lead Detail (drawer desktop / full page mobile)** — contact info (reveal-status aware), related property card, notes/timeline, status-update control, "Schedule Site Visit" action.
6. **Messages — thread list** — avatar, last message preview, unread indicator, empty state ("No messages yet").
7. **Message Thread Detail** — chat-style bubbles, input bar (mobile: sticky above keyboard), attachment icon, safety notice banner ("Never share OTP or payment details in chat").
8. **Site Visits — list/calendar view** — upcoming/past tabs, visit cards (date, time, property, requester), calendar toggle (desktop).
9. **Site Visit Detail** — accept/reject/reschedule buttons, confirmation dialog on reject, map/address block.
10. **Saved Properties/Projects** — grid of saved cards with remove-save icon, empty state ("Properties you save will appear here" + Browse CTA).
11. **Saved Searches** — list of saved filter-sets with "New matches" badge, edit/delete actions, empty state.
12. **Recently Viewed** — horizontal scroll strip / grid, empty state.
13. **Analytics Dashboard** — views-over-time chart, lead-source breakdown — show BOTH a populated state (with a note that data is real, not simulated) AND a "Not enough data yet" empty state; if analytics provider isn't configured, show "Setup Required" banner variant.
14. **Billing/Subscription page** — current plan card, usage meters (listings used/limit), "Upgrade" CTA, next-billing-date, trial-countdown banner variant.
15. **Invoices list** — table→card, download/view actions, empty state.
16. **Invoice Detail/Download view** — clean printable-style invoice layout with GSTIN field shown conditionally.
17. **Pricing/Upgrade page (in-dashboard)** — plan comparison cards (Free/Basic/Premium), feature checklist per plan, current-plan indicator.
18. **Verification Status page** — document upload widget (Aadhar/PAN/etc. placeholders), status timeline (Submitted → Under Review → Approved/Rejected/Need Changes), rejected-state with reason shown + re-submit CTA.
19. **Profile Edit page** — avatar upload/crop, name, mobile (locked, "Contact support to change"), email, city, bio.
20. **Notifications Center (full page)** — grouped by date, mark-all-read, per-item icon+text+timestamp, empty state, click-through behavior noted.
21. **Support/Help page** — FAQ accordion + "Raise a ticket" form + ticket-status list.
22. **Settings page** — notification preferences (toggles per channel), privacy settings, theme toggle (light/dark/system), language selector (future, show disabled/coming-soon state), delete-account section (danger zone styling, confirmation flow).
23. **Role Change Request form** — warning callout explaining implications, reason field, submit → pending-review state.
24. **Data Export/Delete Request page** — explanation text, identity-confirm step, "Request Export" / "Request Deletion" buttons with confirmation dialogs.

Show at least ONE fully worked "table → mobile card" transform pair (e.g. Leads list) so the pattern is unambiguous for developers implementing every other table in this batch.
