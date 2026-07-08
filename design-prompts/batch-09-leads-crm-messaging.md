# Batch 9 — Leads/CRM/Proposals/Messaging/Site Visits (Deep Detail Views)

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 9 of 17 — deeper/shared detail views for Leads, CRM, Proposals, Messaging and Site Visits that apply ACROSS Owner/Broker/Builder dashboards (Batches 6–8 showed these modules at list-level; this batch goes one layer deeper into the shared detail patterns and cross-cutting flows).

MANDATORY CONSISTENCY — reuse the EXACT design system, tokens, and shell patterns already established in Batch 1 and matched in Batches 6–8. Specifically re-apply:
- Dashboard shell (sidebar desktop / bottom-nav+drawer mobile).
- App-like contextual header WITH BACK BUTTON on every mobile sub-page.
- Every destructive action has a confirmation dialog; duplicate-submit protection (loading+disabled state) on every submit button.
- No fake data; contact numbers stay masked until reveal permitted.
- Mobile-first: 390px → 768px → 1280px+, no horizontal scroll.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **Lead full detail page (expanded, standalone, not just a drawer)** — header with lead name/status badge, contact-reveal-status indicator, tabs: Timeline / Notes / Related Property / Documents; timeline shows every touchpoint (inquiry submitted → number revealed → message sent → site visit scheduled → status changed) as a vertical activity log with icons and timestamps.
2. **Add/Edit Note modal (bottom sheet mobile)** — textarea, "pin this note" toggle, save button.
3. **Follow-up Reminder Scheduler modal** — date/time picker, reminder-channel checkboxes (in-app/notification), save; shows an "upcoming reminder" chip pattern that would appear on the lead card.
4. **Lead Status Change confirmation** — dropdown showing full pipeline stages, confirmation dialog when moving to "Closed/Lost" asking for a reason (required field).
5. **Duplicate Lead Detection banner** — inline warning on a lead detail page: "This may be a duplicate of Lead #1234" with "View" / "Merge" / "Dismiss" actions.
6. **Contact Reveal flow (step-by-step)** — show as a sequence: (a) masked number + "Reveal Number" button → (b) consent/notice modal ("Revealing this number will notify the lead") → (c) revealed state with number + "Call" / "Copy" (copy only via explicit button, never auto-copy) / "WhatsApp" icons.
7. **Proposal full detail page (expanded)** — requirement recap card, proposed listing recap card, message thread embedded, status timeline (Sent → Viewed → Shortlisted → Accepted/Rejected), withdraw-proposal action with confirmation.
8. **Messages — Thread List with search/filter** — search bar, unread filter toggle, archived tab, swipe-to-archive gesture indicator (mobile).
9. **Message Thread Detail — full featured** — chat bubbles, timestamp separators, attachment preview (image thumbnail + PDF chip), typing-indicator placeholder, safety notice banner (persistent, non-dismissible: "Never share OTP or advance payment details in chat"), report-thread action in overflow menu, sticky input bar with attach + send buttons (mobile: positioned correctly above on-screen keyboard/safe-area).
10. **Message Report Review inline flow** — report modal from within a thread (reason + description + submit).
11. **Site Visit Scheduler — Request form (from lead/proposal context)** — date/time picker, notes field, "Request Site Visit" submit with duplicate-submit protection.
12. **Site Visit — Accept/Reject/Reschedule flow** — three button states shown, reschedule opens a date/time picker inline, reject requires a reason (short dropdown: unavailable/no longer interested/other).
13. **Site Visit Reminder notification card pattern** — how it appears in the notification center/bell (icon + "Site visit tomorrow at 4 PM for [Property]" + Confirm/Cancel quick actions inline in the notification itself).
14. **Site Visit Completion/Feedback form** — post-visit prompt: "How did it go?" quick-select (Interested/Not interested/Follow-up needed) + optional notes, appears as a card/modal.
15. **Site Visit Dispute state (rare/edge case)** — flagged visit shown with a warning badge + "Contact support" link, used when both parties report conflicting outcomes.

Ensure this batch demonstrates FULL consistency with the list-level screens already shown in Batches 6–8 — same card styles, same badge colors, same button placement — since these are drill-down views of those exact same modules, not a new product.
