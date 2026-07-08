# Batch 10 — Billing/Payment/Pricing (Public + All Dashboards)

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 10 of 17 — Billing, Payment and Pricing flows across public site and all three role dashboards.

MANDATORY CONSISTENCY — reuse the EXACT design system, tokens, and shell patterns already established in Batch 1. Specifically re-apply:
- Public header/footer on the public pricing page; dashboard shell on in-dashboard billing pages.
- App-like contextual header WITH BACK BUTTON on every mobile sub-page.
- Duplicate-submit protection (loading+disabled state) on EVERY payment button — this is critical for this batch.
- No fake payment success — every success state must be shown as resulting from real gateway verification; show the pending/failed states with equal design care, never skip to a fake "Success!" without the verification step visible.
- No test-payment-mode indicators shown as if production (if a "test mode" banner is needed for dev, mark it clearly as a dev-only annotation, not part of the real UI).
- Mobile-first: 390px → 768px → 1280px+, no horizontal scroll.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **Public Pricing Page** — role selector tabs (Owner/Broker/Builder), plan cards per role (Free/Basic/Premium or similar), feature comparison table (desktop) → stacked comparison cards (mobile), "Most Popular" highlight badge on one plan, FAQ accordion below, CTA buttons leading to login/register if guest.
2. **In-Dashboard Billing/Subscription Overview** (reused shell across Owner/Broker/Builder — show once, annotate it's identical structure for all three roles) — current plan card, usage meters (progress bars: listings used/limit, ad credits, etc.), renewal date, "Upgrade Plan" / "Cancel Subscription" buttons.
3. **Trial Countdown Banner variant** — persistent but dismissible-per-session banner: "Your free trial ends in 4 days — Upgrade now" with CTA.
4. **Plan Upgrade/Change flow** — plan comparison selector, prorated-cost preview note, "Continue to Payment" button.
5. **Checkout / Order Summary page** — plan/add-on summary, GST breakdown line items (if GSTIN provided), optional coupon code input field with apply/invalid states, total, "Pay Now" button.
6. **Razorpay Payment Modal (representative wireframe)** — show a simplified representative overlay (payment method tabs: Card/UPI/Netbanking), since actual gateway UI is provider-controlled — annotate clearly "actual payment UI is rendered by Razorpay SDK, this is a placeholder frame."
7. **Payment Processing/Pending state** — spinner + "Verifying your payment..." full-screen or modal state, do not allow duplicate submission during this state (annotate disabled background).
8. **Payment Success state** — confirmation screen ONLY reachable after verified webhook/callback per the annotation — checkmark, plan-active confirmation, "View Invoice" / "Go to Dashboard" buttons.
9. **Payment Failed state** — clear error message (non-technical), "Retry Payment" / "Contact Support" buttons, note that no plan was activated.
10. **Duplicate Payment Detected state** — informational banner if a duplicate charge attempt is detected: "It looks like you already have a pending payment for this plan" with "Check Status" action.
11. **Invoice List (dashboard, all 3 roles — identical structure, show once)** — table→card, columns: invoice #, date, amount, status, download icon.
12. **Invoice Detail / Printable View** — formal invoice layout: business details, GSTIN (if applicable), sequential invoice number, line items, tax breakdown, "Download PDF" / "Email Invoice" buttons.
13. **Refund Request flow (if enabled)** — request form (reason dropdown, amount if partial), submitted-state confirmation, status tracker (Requested → Under Review → Approved/Rejected → Refunded).
14. **GST/Billing Details Settings** — form for GSTIN, billing address, business name (B2B) vs individual (B2C) toggle.
15. **Free Plan / Manual Activation Banner** — honest state shown when a plan was manually activated by admin (audit-friendly note, not hidden): "Activated by support on [date]".

Show payment states as a clear linear sequence (Checkout → Processing → Success/Failed) so the flow reads unambiguously left-to-right or top-to-bottom.
