# Batch 8 — Builder/Developer Dashboard (All Modules)

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 8 of 17 — Builder/Developer Dashboard.

MANDATORY CONSISTENCY — reuse the EXACT design system, tokens, and shell patterns already established in Batch 1 and matched in Batches 6–7. Specifically re-apply on EVERY screen in this batch:
- Same dashboard shell (sidebar desktop / bottom-nav+drawer mobile), same nav order/styling — Builder gets additional nav items (Agents, Ads/Promotions, Unit Inventory).
- App-like contextual header WITH BACK BUTTON on every mobile sub-page.
- Every list/table has loading, empty (actionable), and error states; table → card responsive transform.
- Every destructive action has a confirmation dialog.
- No fake counts/analytics/ad-impressions — honest "Setup Required" or "—" states where data sources are missing.
- Mobile-first: 390px → 768px → 1280px+, no horizontal scroll.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **Overview/Dashboard Home** — stat cards (Active Projects, Total Leads, Units Sold/Booked, Active Ads) + skeleton variant; RERA compliance reminder banner if applicable.
2. **My Projects list** — status filter tabs, project cards with RERA badge + units-remaining chip, empty state ("Post your first project" CTA).
3. **Post Project Wizard entry point card** — reference Batch 5 wizard, show "Continue Draft" + edit-reapproval banner states.
4. **Unit Inventory Management page** — wing/floor/unit grid (desktop table, sticky header row) → accordion cards (mobile), bulk-select + bulk-status-update sticky action bar, filter by status/wing/type.
5. **Unit Detail/Edit modal (desktop) / bottom sheet (mobile)** — unit fields, status dropdown, price override, save.
6. **Project Leads list** — table→card, filters, same pattern as Broker Leads list.
7. **Lead Detail drawer/page** — same pattern as prior batches, plus "Assigned Agent" field (if agents assigned).
8. **Matching Requirements Feed** — scoped feed of Owner/Broker requirements matching project specs, "explainable match" chip (e.g. "Matches: Budget, Location, 2BHK"), empty state.
9. **Proposals (sent/received)** — tabs, same card pattern as Broker Proposals.
10. **Messages — thread list + detail** — same chat pattern reused identically.
11. **Site Visits — list/calendar + detail** — same pattern, plus "Assign to agent" dropdown on detail.
12. **Agents/Team list** — table→card, agent name/role/permissions summary/status (active/invited/suspended) chips, invite button.
13. **Invite Agent form (modal)** — email, role, permission checkboxes (module-level toggles), send-invite button.
14. **Agent Permissions Editor** — module-by-module toggle list (Leads/Listings/Ads/Messages) per agent, save bar.
15. **Ads/Promotions list** — status tabs (Draft/Pending/Active/Expired/Rejected), campaign cards (banner thumbnail, project linked, date range, spend).
16. **Create Ad Campaign Wizard** (multi-step, reuse Batch 1 Section 6 wizard pattern exactly) — steps: Project select → Banner upload (desktop/tablet/mobile creative slots shown separately with correct aspect ratios) → Targeting (city/locality/audience) → Schedule (date range) → Preview (how it'll look in-context on a sample page) → Payment (reference Batch 10 billing) → Submit for approval.
17. **Ad Campaign Detail/Edit page** — performance summary block (impressions/clicks — REAL only, "Setup Required" if analytics not wired), edit/pause/cancel actions.
18. **Ad Performance/Analytics page** — chart placeholder with honest empty/setup-required state, never fabricated numbers.
19. **Project Analytics Dashboard** — views, lead conversion, unit-sales velocity — honest states.
20. **Billing/Subscription page** — Builder-tier plan card, ad-spend wallet balance if applicable.
21. **Invoices list**.
22. **Verification/RERA Proof Upload page** — RERA certificate upload, status timeline, rejected-state with reason + resubmit.
23. **Profile/Microsite Edit page** — company logo upload/crop, company name, description, founded year, HQ address, social links.
24. **Construction Progress Update form** — milestone selector, percentage slider, photo upload, publish-update button (this feeds the Project Detail timeline from Batch 4).
25. **Notifications Center (full page)**.
26. **Support/Help page**.
27. **Settings page**.

Give the Unit Inventory Management page (#4) the most design attention in this batch — it's the most complex data-dense screen for this role; ensure the mobile accordion version is genuinely usable at 390px, not just a shrunk table.
