## Batch 10 — Billing & Payments

### Screens/components present in design (full inventory — 15 screens across 6 groups)
- **Screen 1 — Public pricing:** role tabs (Owner/Broker/Builder), 3 plans (Free ₹0 / Basic ₹999 "MOST POPULAR" / Premium ₹2,499), feature comparison table → mobile stacked cards, FAQ accordion (plan-change/GST/downgrade), guest CTAs open auth sheet then return to checkout (redirect-intent).
- **Screens 2–4 — In-dashboard billing:** subscription overview (Basic Active, renews 28 Jul, card ending 4482, usage meters: listings 18/25, featured 2/2, ad credits ₹340/₹500, team seats 1/1); trial banner ("free trial ends in 4 days"); plan change with prorated preview ("pay ₹1,250 today for remaining 15 days").
- **Screens 5–10 — Payment flow (linear):** Checkout/order summary (line items, coupon w/ invalid state "EXPIRED20", GST CGST 9% + SGST 9%, total ₹1,752.30); Razorpay placeholder modal (UPI/Card/Netbanking + disclaimer); Verifying (background locked); Success (only after verified callback, Payment ID `pay_NxK4…8Ql`); Failed (honest, no plan activated, auto-refund note); Duplicate-payment detected ("Check Status").
- **Screens 11–12 — Invoices:** invoice list table→card (# / date / amount / status incl. "Refund pending"); printable invoice detail (seller GSTIN, billed-to B2B GSTIN, line items, coupon, CGST/SGST, Download PDF / Email Invoice, sequential numbering).
- **Screens 13–15 — Refund / GST / Manual:** refund request (invoice, reason taxonomy, Full/Partial amount) + status tracker (Requested→Under review→Approved→Refunded, rejected branch); GST billing-details settings (B2B/B2C toggle, GSTIN validation "Gujarat (24) — CGST+SGST will apply"); manual activation honest audit state ("Activated by support… ticket #4471… recorded in audit log").

### ADD-ON features/screens in the design NOT in the docs/prompts (deltas)
1. **Ad-credits usage meter** (`₹340 / ₹500`) and **team-seats meter** on the subscription overview — prompt only named "listings used/limit, ad credits, etc." generically; design makes ad-credits a rupee balance and adds seats as a distinct metered resource.
2. **GST-jurisdiction intelligence** — GSTIN field validates state code and states "Gujarat (24) — CGST+SGST will apply," implying **intra-state vs inter-state (CGST+SGST vs IGST) tax logic** driven by GSTIN. Prompt didn't specify jurisdiction handling.
3. **Prorated math shown as concrete preview** in two places (upgrade screen + checkout) with exact remaining-days amounts — beyond the prompt's "prorated-cost preview note."
4. **Coupon on the invoice itself** (`Coupon BROKER10 −₹165`) — coupon persists into the formal invoice line items, not just checkout.
5. **Refund partial/full amount selector** + specific reason taxonomy (Feature not used / Charged by mistake / Service issue / Other) + tracker ID (REF-114) + "resolved in ~3 business days" SLA.
6. **Failed-payment auto-refund promise** — "Any amount deducted will be auto-refunded within 5–7 business days" + explicit "You're still on Basic" (states current plan unchanged).
7. **Duplicate-payment detail** — "started 2 min ago" recency context beyond generic banner.
8. **"TEST MODE" dev-only ribbon annotation** — explicitly scoped to staff builds only, never production (implements CLAUDE.md rule #23/production-readiness).
9. **Invoice provenance details** — seller entity "My Gujarat Property Pvt Ltd", seller GSTIN `24AAACM9910P1ZS`, payment ref on invoice, "computer-generated invoice" label.
10. **Refund-pending as an invoice status** in the list (lifecycle link invoice↔refund).

### Items in the prompt MISSING from design
- None material — all 15 screens present. (Trial banner shown persistent; prompt wanted "dismissible-per-session" — dismiss control not captured in text, minor.)

### Notable UX patterns
success unreachable except after verified gateway callback (stated repeatedly); every pay button duplicate-submit protected; verifying-state locks background; honest failed/manual states with audit language; GST fully modeled (CGST/SGST split, GSTIN B2B/B2C). Strongly aligned with CLAUDE.md no-fake-payment and audit rules.
