# Batch 15 — Admin: Audit/Security/Reports/Fraud/Exports

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 15 of 17 — Admin Audit Logs, Security Monitoring, Business Reports, Fraud/Report Queues, and the final shared admin utility screens (exports, bulk actions, maker-checker approvals).

MANDATORY CONSISTENCY — reuse the Admin Shell and all design tokens from Batch 1, matching Batches 11–14's admin visual language exactly. Specifically re-apply:
- App-like contextual header WITH BACK BUTTON on mobile admin sub-pages.
- Every list has loading, empty, and error states.
- Audit logs are visually append-only (no edit/delete affordances anywhere near log rows — annotate this explicitly).
- Bulk/destructive actions always show a preview-of-affected-records step before confirming.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **Audit Logs Viewer** — table→card, columns: actor, action, target-record link, timestamp, filters (actor/module/date-range), search; row-click opens a detail panel showing before/after diff where applicable (e.g. permission change diff). Explicitly show NO edit/delete icons anywhere on this screen.
2. **Security Events Dashboard** — cards/charts for failed-login attempts, rate-limit-hits, suspicious-IP flags, over a time range selector; table of recent security events below.
3. **Reports/Fraud Queue** — table→card, report type (spam/fraud/duplicate/inappropriate), reported-entity link, reporter, submitted date, priority chip.
4. **Report Detail** — evidence panel (screenshots/description), reported-entity preview, related-history panel ("This user has 3 prior reports"), action buttons (Warn User / Suspend / Remove Listing / Dismiss), reason required for any action taken.
5. **Duplicate Lead Review Screen** — side-by-side lead comparison, same merge/keep pattern as the duplicate-listing merge screen from Batch 11 (reuse identical layout for consistency).
6. **Contact Reveal Logs View** — table of reveal events (who revealed whose number, when, from which listing) — used for abuse investigation, permission-gated.
7. **Message Report Review Screen** — flagged message content viewer, thread context, action buttons.
8. **Site Visit Dispute Review** — both parties' submitted outcomes shown side-by-side, resolution action + notes.
9. **Reports/Analytics Dashboard (business metrics)** — real metrics only: new listings this week, active users trend, city-wise distribution — chart placeholders + date-range filter, "Export CSV" button; empty/setup-required state if analytics pipeline not wired.
10. **Exports Management Screen** — request-export form (data type, date range, format), exports-in-progress list (status: Queued/Processing/Ready/Failed), download-link row (time-limited, annotate "link expires in 24h").
11. **Bulk Action Confirmation Modal** — used across admin (e.g. bulk-approve 12 listings) — shows a scrollable preview list of affected records before the final confirm button, cancel always available.
12. **Maker-Checker Pending Approvals Queue** — table of actions awaiting second-approver sign-off (e.g. a large manual refund), maker's name + action summary, checker Approve/Reject buttons (checker cannot be the same person as maker — show this rule as an inline note).

This is the most safety-critical batch — favor extra clarity and restraint over cleverness. Every screen here should look boring-in-a-good-way: scannable, high-contrast status indicators, zero ambiguity about what an action will do before it's confirmed.
