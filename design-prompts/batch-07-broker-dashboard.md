# Batch 7 — Broker/Agent Dashboard (All Modules)

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 7 of 17 — Broker/Agent Dashboard.

MANDATORY CONSISTENCY — reuse the EXACT design system, tokens, and shell patterns already established in Batch 1 and matched in Batch 6 (Owner Dashboard). Specifically re-apply on EVERY screen in this batch:
- Same dashboard shell (sidebar desktop / bottom-nav+drawer mobile), same nav order and styling as Owner dashboard — only the nav item set differs (Broker gets extra CRM/Proposals items).
- App-like contextual header WITH BACK BUTTON on every mobile sub-page.
- Every list/table has loading, empty (actionable), and error states; table → card responsive transform.
- Every destructive action has a confirmation dialog.
- No fake counts/analytics — honest "Setup Required" or "—" states where data sources are missing.
- Mobile-first: 390px → 768px → 1280px+, no horizontal scroll.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **Overview/Dashboard Home** — stat cards (Active Listings, New Leads, Proposals Sent, Site Visits) + skeleton variant; recent activity feed.
2. **My Properties list** — same pattern as Owner but with a "featured/boosted" indicator chip if applicable.
3. **Post Property Wizard entry point card** — reference Batch 5 wizard (do not redesign, just show the dashboard entry card + "Continue Draft" state).
4. **My Requirements list**.
5. **Requirement Feed (scoped, matching requirements from Owners)** — filterable feed cards (budget/location/type match), "Send Proposal" button per card, empty state ("No matching requirements right now").
6. **Proposals — Sent list** — status tabs (Sent/Viewed/Shortlisted/Accepted/Rejected), proposal cards, empty state.
7. **Proposal Detail page** — requirement summary + proposed property/project + message + status timeline.
8. **Send Proposal form (modal/bottom sheet)** — property/project selector, message textarea, submit with duplicate-submit protection (loading+disabled button state shown).
9. **Leads/CRM — List View** — table→card, filters (status, source, date range), bulk actions bar.
10. **Leads/CRM — Kanban View (desktop)** — columns: New → Contacted → Site Visit → Negotiation → Closed/Lost, draggable cards (show drag-hover state), card shows name/property/last-activity; mobile fallback note: Kanban collapses to the List View pattern from #9 (annotate this explicitly — do not force a broken drag Kanban on mobile).
11. **Lead Detail drawer (desktop) / full page (mobile)** — notes timeline, add-note input, follow-up reminder scheduler, status dropdown, related property/proposal links.
12. **Messages — thread list + thread detail** — same chat pattern as Owner batch, reused identically.
13. **Site Visits — list/calendar + detail** — same pattern as Owner batch.
14. **Saved Items / Saved Searches** — same pattern as Owner batch.
15. **Analytics Dashboard** — broader metrics (conversion rate lead→visit→close, listing performance ranking) with honest empty/setup-required states.
16. **Billing/Subscription page** — plan card with Broker-tier features (e.g. CRM access, proposal limits), usage meters.
17. **Invoices list**.
18. **Verification Status page** — broker-specific docs (agency license if applicable).
19. **Profile Edit page** — agency name, service areas (multi-city chip select), years of experience, bio, profile photo.
20. **Notifications Center (full page)**.
21. **Support/Help page**.
22. **Settings page**.

Show the Kanban board (#10) at desktop 1280px+ in full detail since it's the most complex/unique screen in this batch — include a card-detail-on-hover state and a "Move to stage" quick-action on card overflow menu.
