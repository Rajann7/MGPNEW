# Report — Batch 12 (Admin: Billing/Payment/Plans/Coupons/Trials/Invoices)

Source: `Batch_12_Admin_Billing_Standalone_.txt` (app source pre-extracted to `work/b12.js`; complete visible-text render in `work/txt12.txt`).
Compared against: `C:\mgpweb\design-prompts\batch-12-admin-billing.md`.

## Batch 12 — Admin Billing & Payments

### Screens/components present in design (full inventory)

Design groups 17 screens into 6 sections (section order = sidebar sub-nav order for the Billing module):
1. Subscriptions (1–2)
2. Payments & Webhooks (3–5)
3. Refunds & Manual (6–9)
4. Invoices (10–11)
5. Plans & Coupons (12–15)
6. Trials (16–17)

Global GATEWAY STATUS GRAMMAR chip set, identical on every screen: Captured (green) / Failed (red) / Pending (amber) / Refunded (neutral-blue).

Screen inventory:
- 1 Subscriptions list: filters (Status, Plan, Role) + search; columns user/plan/status/renewal; statuses Active, Trial ("4d left"), Cancelled ("ended 15 Jun"), Expired; loading = shimmer rows, empty = "No subscriptions match these filters" + clear-filters CTA, error = inline banner + Retry.
- 2 Subscription detail + manual extend: card •••• 4482, usage (Listings 31/unlimited, Featured slots 7/10), PLAN HISTORY timeline (Upgraded Basic→Premium "prorated ₹1,752.30 · pay_NxK4…8Ql", Renewed, Trial started "campaign Broker Launch"), MANUAL EXTEND (+7/+14/+30 days), logged.
- 3 Payments list: filters (Status, Method, Date) + search (user, payment id); columns user/amount/method/gateway status/date; example Captured, Refunded, Failed, Pending rows.
- 4 Payment detail: safe summary payload — masked Payment ID (pay_NxK4•••••8Ql), Order ID (order_Nx91•••••2Ah), UPI ref (617843••••21), Invoice link (MGP-2026-0847); "raw gateway JSON and secrets never rendered"; Reconcile with gateway button.
- 5 Webhook events log + retry: events (payment.captured Processed, refund.processed "Failed ×2" + Retry, subscription.charged Queued); EVENT DETAIL — SAFE SUMMARY (entity rfnd_Ky2•••7Bc, "signature: verified ✓ · payload secrets: redacted").
- 6 Refund request queue (user, amount, reason, date).
- 7 Refund detail/approve: REF-114 context, invoice link, Pending chip, applicant quote, Full ₹400 vs Partial selector, decision reason required (approve AND reject), "Approving opens a confirmation dialog before the gateway refund is initiated"; Approve refund… / Reject.
- 8 Credit note create + issued list: Issue credit note form (logged) + table (CN-0041, CN-0040 …).
- 9 Manual activation: prominent warning "This bypasses payment verification — use only for approved exceptions. The user's billing page will show 'Activated by support' (Batch 10 §15)"; Plan selector, Duration (30/90 days), reason; "logged in the audit trail"; Activate manually…
- 10 Invoice list (admin, all users): filters (date range, Status, GST only) + Export CSV; columns invoice#/user/amount/status (Paid/Pending).
- 11 Invoice correction — versioned: "Correct MGP-2026-0846 · v2 draft", GSTIN v1 original vs corrected, "Both versions retained; correction logged. Totals recompute automatically"; Save corrected version.
- 12 Plans list (Plan/Role/Price/Status; Basic, Premium, "Starter 2024" Archived).
- 13 Plan create/edit + live public-pricing preview: name, Role (Broker/Owner/Builder), price, billing cycle (Monthly/Quarterly/Yearly), FEATURE LIMITS (Listings, Featured slots/mo, Ad credits ₹, Team seats), active toggle "visible on public pricing page"; PUBLIC PRICING PREVIEW renders the Batch 10 public pricing card ("MOST POPULAR", brand teal, "Choose Basic").
- 14 Coupon list (CODE/DISCOUNT/USAGE/EXPIRY/STATUS; BROKER10 Active, EXPIRED20 "312/300" Expired).
- 15 Coupon create/edit: code, discount (% / flat), applicable plans multi-select, valid from/to, usage limit.
- 16 Trial campaign list (CAMPAIGN/ROLE/DURATION/ACTIVE USERS; Monsoon Broker Trial 14d/86, Owner Onboarding 7d/241).
- 17 Trial grant/revoke: campaign selector, Grant trial / Revoke trial…, revoke confirmation ("Revoke Meena's trial? …reverts to Free plan. She'll be notified with your reason"), logged.

### ADD-ON features/screens in design NOT in the prompt (deltas)

- Coupon "usage over limit" overflow state rendered honestly: EXPIRED20 shows "312 / 300" (usage exceeded cap) — a real edge case not implied by the prompt.
- Webhook retry shows real failure counter "Failed ×2" and states (Processed / Failed / Queued) rather than a single processing-status; explicit "signature: verified ✓ · payload secrets: redacted" line in the safe summary.
- Manual activation ties into the user-facing side: billing page will display "Activated by support (Batch 10 §15)" — cross-batch honesty linkage the prompt didn't call for.
- Refund flow requires reason on BOTH approve and reject (prompt only said "reason required" generally), and explicitly states a second confirmation dialog fires before the gateway refund initiates.
- Subscription detail includes live usage meters (Listings 31/unlimited, Featured slots 7/10) and stored payment method "card •••• 4482" — richer than the prompt's "usage breakdown".
- Plan-history timeline entries carry prorated amounts + payment IDs + attributed trial campaign ("campaign Broker Launch") — audit-grade detail.
- Plan create form includes "Team seats" and "Featured slots/mo" limits beyond the prompt's "listings count, ad credits" examples.
- Public pricing preview explicitly reuses the Batch 10 public card component (brand teal) inside the admin form — deliberate component reuse.
- Invoice correction is explicitly versioned ("v2 draft", both versions retained, totals auto-recompute) — the prompt said "version history shown" but design specifies retention + auto-recompute policy.
- Loading/empty/error states spelled out per-screen (shimmer rows; "No subscriptions match these filters" + clear-filters CTA; inline banner + Retry).

### Items in prompt MISSING from design

- Plans list "edit/duplicate/archive actions" — prompt (screen 12) names duplicate & archive as row actions; design shows an Archived status ("Starter 2024") but does not render explicit duplicate/archive action buttons in the extracted text.
- Coupon "applicable plans" is present, but the prompt's implied multi-plan-per-coupon breadth is only lightly shown (Basic/Premium/Owner plans/Builder plans checklist).
- No standalone "Trial Grant" success/empty state beyond the revoke confirmation.
- Otherwise all 17 prompt screens are present.

### Notable UX patterns

- Single gateway-status chip grammar (Captured/Failed/Pending/Refunded) applied uniformly — the batch's finance-clarity backbone.
- All secrets/IDs safe-summarized and masked (pay_…•••, order_…•••, UPI ref •••, rfnd_…•••); "raw gateway JSON and secrets never rendered in admin."
- Every manual/override action (extend, refund, credit note, manual activation, invoice correction, trial revoke) shows required reason + "This action will be logged." + confirmation dialog for destructive/gateway actions.
- Cross-batch consistency links: public pricing card (Batch 10), "Activated by support" billing badge (Batch 10 §15).
- Consistent per-screen loading (shimmer) / empty (filter-aware) / error (banner+Retry) states.
