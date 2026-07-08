# Batch 12 — Admin: Billing/Payment/Plans/Coupons/Trials/Invoices

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 12 of 17 — Admin Billing & Payment Management.

MANDATORY CONSISTENCY — reuse the Admin Shell (3F graphite sidebar/topbar, permission-scoped nav) and all design tokens from Batch 1, matching Batch 11's admin visual language exactly. Specifically re-apply:
- App-like contextual header WITH BACK BUTTON on mobile admin sub-pages.
- Every queue/list has loading, empty, and error states.
- Manual/override actions (manual activation, refund approval, credit note) always show a required "reason" field and an inline "This action will be logged" note.
- Sensitive payment data shown as safe redacted/summarized payloads, never raw gateway JSON or secrets.
- No fake payment success shown anywhere in admin either — reconciliation views must reflect real gateway state labels (Captured/Failed/Pending/Refunded).

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **Subscriptions List** — table→card, columns: user, plan, status (Active/Trial/Expired/Cancelled), renewal date, filter bar.
2. **Subscription Detail** — usage breakdown, trial info, plan-change history timeline, manual-extend action (reason required).
3. **Payments List** — table→card, columns: user, amount, method, gateway status chip (Captured/Failed/Pending/Refunded), date, search/filter.
4. **Payment Detail** — safe summary payload (masked card/UPI ref, order id, gateway transaction id), reconcile button, linked invoice link.
5. **Webhook Events Log** — table of incoming webhook events (event type, received-at, processing-status), detail view showing safe summarized payload (not raw secrets), retry-processing action for failed events.
6. **Refund Request Queue** — table→card, user, amount, reason, submitted date.
7. **Refund Detail/Approve screen** — full context, approve/reject buttons (reason required), refund-amount field (full/partial), confirmation dialog before processing.
8. **Credit Note Create/View** — form to issue a credit note (user, amount, reason) + list of issued credit notes.
9. **Manual Activation Form** — user search, plan selector, reason (required), duration, prominent warning banner ("This bypasses payment verification — use only for approved exceptions"), audit-log note.
10. **Invoice List (Admin)** — table→card, all-users view, filters (date range, status, GST/non-GST), export button.
11. **Invoice Detail/Correction screen** — editable invoice fields (for legitimate corrections only), correction-reason required, version history shown (original vs corrected).
12. **Plans Admin List** — table of plans per role (Owner/Broker/Builder), status (active/archived), edit/duplicate/archive actions.
13. **Plan Create/Edit Form** — name, role, price, billing cycle, feature limits (listings count, ad credits, etc. as numeric inputs), active toggle, preview-card side panel showing how it'll render on the public pricing page.
14. **Coupon Admin List** — table of coupons, code, discount type/value, usage count/limit, expiry, status.
15. **Coupon Create/Edit Form** — code input, discount config, applicable plans multi-select, validity dates, usage limit.
16. **Trial Admin — Campaign List** — table of trial campaigns (name, role, duration, active users count).
17. **Trial Grant/Revoke Form** — user search, grant-trial action / revoke-trial action, reason field, confirmation dialog for revoke.

Keep the visual grammar for status chips (Captured=green, Failed=red, Pending=amber, Refunded=neutral-blue) perfectly consistent across every screen in this batch — this is a finance-adjacent module where color-coding clarity matters most.
