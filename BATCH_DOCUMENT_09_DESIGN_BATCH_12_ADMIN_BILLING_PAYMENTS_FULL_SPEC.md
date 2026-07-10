# BATCH_DOCUMENT_09_DESIGN_BATCH_12_ADMIN_BILLING_PAYMENTS_FULL_SPEC.md

# My Gujarat Property

## Batch Document 09

## Design Batch 12 — Complete Admin Billing, Payments, Webhooks, Refunds, Credit Notes, Invoices, Plans, Coupons and Trial Management

---

# 1. DOCUMENT PURPOSE

This document is the complete design, implementation, backend, database, financial-security, permission, audit, payment reconciliation, refund, invoice, plan-management, coupon-management, trial-management, responsive behavior and live-verification specification for:

**My Gujarat Property · Design Batch 12 — Admin Billing & Payments**

Batch 12 defines the complete internal Billing Administration system for authorised:

* Super Admin,
* Billing Manager,
* Payment Manager,
* other Staff with explicitly granted Billing permissions.

Batch 12 contains exactly these 17 screen groups:

1. Subscriptions List
2. Subscription Detail + Manual Extend
3. Payments List
4. Payment Detail — Safe Summary
5. Webhook Events Log + Retry
6. Refund Request Queue
7. Refund Detail + Approve / Reject
8. Credit Note Create + Issued List
9. Manual Subscription Activation
10. Admin Invoice List + Export
11. Invoice Correction — Versioned
12. Plans List
13. Plan Create / Edit + Live Public Pricing Preview
14. Coupon List
15. Coupon Create / Edit
16. Trial Campaign List
17. Trial Grant / Revoke

Every Batch 12 screen must be implemented.

Nothing may be skipped.

No screen may be:

* represented by a generic overview card,
* represented only by database rows with no management action,
* left as Coming Soon,
* left as Setup Required when no external provider is required,
* implemented using fake financial data,
* implemented using unsafe raw payment payload display,
* implemented without audit history,
* implemented without server-side permission checks.

The actual Batch 12 design source must be read directly from:

`/newdesign/`

Use the actual Batch 12 standalone HTML source.

Do not implement from:

* current Admin Billing Overview,
* memory,
* generic finance dashboard templates,
* generic Razorpay dashboard copies,
* old Billing documentation that conflicts with final design,
* assumptions.

---

# 2. ABSOLUTE ADMIN BILLING REBUILD RULE

The current Admin Billing presentation must be replaced where it conflicts with Batch 12.

The current combined screen containing only:

* Provider Status,
* Billing Counts,
* Plans summary,
* Recent Payments

is not the complete Batch 12 Admin Billing system.

Batch 12 requires separate, functional workflows for all 17 screens.

Do not keep:

`Current Admin Billing Overview + a few added buttons`

and call Batch 12 complete.

Build the complete Batch 12 navigation and screen architecture.

---

# 3. FINANCIAL DATA HONESTY RULE

Every financial screen must show actual database and trusted provider state.

Never fabricate:

* payment success,
* captured amount,
* refund success,
* gateway reconciliation,
* webhook processing result,
* Invoice status,
* Subscription status,
* Coupon usage,
* Trial active-user count.

Where data does not exist:

show:

* `—`,
* empty state,
* Pending,
* Setup Required,

according to actual situation.

---

# 4. GATEWAY STATUS GRAMMAR LOCK

The Batch 12 source explicitly defines one gateway-status grammar to be used identically across all applicable screens:

* Captured
* Failed
* Pending
* Refunded

This vocabulary must be consistent across:

* Payments List,
* Payment Detail,
* related Invoice/Refund context,
* Admin support/payment references where applicable.

Do not display different labels for the same gateway state such as:

* Success,
* Completed,
* Paid,
* Done

when the screen is specifically showing **Gateway Status**.

Invoice Status and Subscription Status remain separate concepts.

---

# 5. THREE DIFFERENT STATUS SYSTEMS MUST NOT BE MIXED

Batch 12 includes multiple distinct status domains.

## Gateway Payment Status

* Captured
* Failed
* Pending
* Refunded

## Invoice Status

Examples:

* Paid
* Pending
* Refunded
* Partially Refunded
* Credit Note Issued

according to final financial record.

## Subscription Status

Examples:

* Active
* Trial
* Cancelled
* Expired
* Admin Granted

according to Subscription lifecycle.

Do not use one generic `status` badge mapper blindly across all three domains.

---

# 6. BATCH 12 SCREEN GROUPING

The design groups screens as follows:

## Screens 1–2

Subscriptions.

## Screens 3–5

Payments and Webhook Events.

## Screens 6–9

Refunds, Credit Notes and Manual Activation.

## Screens 10–11

Invoices.

## Screens 12–15

Plans and Coupons Administration.

## Screens 16–17

Trial Campaigns.

All groups are required.

---

# 7. REQUIRED IMPLEMENTATION ORDER

Implement Batch 12 in this order:

1. Admin Billing permissions and routes
2. Screen 1 Subscriptions List
3. Screen 2 Subscription Detail + Manual Extend
4. Screen 3 Payments List
5. Screen 4 Payment Detail
6. Screen 5 Webhook Log + Retry
7. Screen 6 Refund Queue
8. Screen 7 Refund Detail and Decision
9. Screen 8 Credit Notes
10. Screen 9 Manual Activation
11. Screen 10 Invoice List + Export
12. Screen 11 Versioned Invoice Correction
13. Screen 12 Plans List
14. Screen 13 Plan Create/Edit
15. Screen 14 Coupon List
16. Screen 15 Coupon Create/Edit
17. Screen 16 Trial Campaign List
18. Screen 17 Trial Grant/Revoke
19. Complete Billing financial regression verification.

Do not implement all financial actions together without phase verification.

---

# 8. ADMIN SHELL

Batch 12 uses the Batch 1 Admin shell.

Required:

* graphite desktop sidebar,
* Admin contextual topbar,
* permission-aware navigation,
* mobile Admin drawer,
* no public-role bottom navigation.

Do not build a separate Billing-only shell.

---

# 9. ADMIN BILLING PERMISSION MODEL

At minimum distinguish capabilities for:

* View Billing,
* Manage Subscription,
* View Payments,
* Reconcile Payments,
* Retry Webhooks,
* Review Refunds,
* Process Refunds,
* Issue Credit Notes,
* Manual Activation,
* Export Invoices,
* Correct Invoices,
* Manage Plans,
* Manage Coupons,
* Manage Trials.

These may map to:

* Billing Manager,
* Payment Manager,
* Super Admin,
* explicit permission flags.

Do not allow a Staff user with only Billing View access to perform high-risk actions.

---

# 10. HIGH-RISK ACTION RULE

All manual or override actions must:

* require correct permission,
* require reason where Batch source specifies or where financial governance requires,
* create Audit record,
* protect against duplicate execution,
* use transaction/idempotency safeguards.

High-risk actions include:

* Manual Extend,
* Webhook Retry,
* Refund Approve,
* Refund Reject,
* Credit Note Issue,
* Manual Activation,
* Invoice Correction,
* Trial Grant,
* Trial Revoke.

---

# 11. STAFF ACTION AUDIT

Every financial Staff action must record at minimum:

* Staff actor ID,
* Staff role,
* action,
* target type,
* target ID,
* reason,
* safe before state,
* safe after state,
* timestamp.

Never record:

* raw secret keys,
* full gateway payload,
* full UPI reference when masking is required,
* payment signatures,
* card credentials.

---

# 12. SAFE FINANCIAL IDENTIFIER RULE

Provider identifiers shown in Admin UI must be masked according to design.

Examples:

`pay_NxK4•••••8Ql`

`order_Nx91•••••2Ah`

`617843••••21`

Do not expose complete provider identifiers unless an explicitly authorised deeper operational screen requires them.

Batch 12 visual screen uses masked references.

---

# 13. SCREEN 1 — SUBSCRIPTIONS LIST

Heading:

`Subscriptions`

Controls:

* Search user…
* Status: Active
* Plan
* Role

Desktop columns:

* USER
* PLAN
* STATUS
* RENEWAL

---

# 14. SUBSCRIPTION REFERENCE ROW 1

User:

`Kunal Bhatt`

Role:

`Broker`

Plan:

`Premium · ₹2,499/mo`

Status:

`Active`

Renewal:

`28 Jul 2026`

---

# 15. SUBSCRIPTION REFERENCE ROW 2

User:

`Meena Trivedi`

Role:

`Owner`

Plan:

`Basic · trial`

Status:

`Trial · 4d left`

Renewal/end:

`7 Jul 2026`

---

# 16. SUBSCRIPTION REFERENCE ROW 3

User:

`Vipul Desai`

Role:

`Broker`

Plan:

`Basic · ₹999/mo`

Status:

`Cancelled`

Period state:

`ended 15 Jun`

---

# 17. SUBSCRIPTION REFERENCE ROW 4

User:

`Sankalp Developers`

Role:

`Builder`

Plan:

`Builder Pro · ₹7,999/mo`

Status:

`Expired`

Date:

`1 Jul 2026`

---

# 18. SUBSCRIPTION LIST DATA

Each row must be composed from real:

* Profile,
* Public Role,
* Plan,
* Subscription,
* period dates.

Do not store the complete display string:

`Premium · ₹2,499/mo`

as one duplicated Subscription field.

---

# 19. SUBSCRIPTION SEARCH

Search:

`Search user…`

must work server-side.

Search may match safe approved identifiers such as:

* full name,
* display name,
* authorised account reference.

Do not download all Subscriptions into Client.

---

# 20. SUBSCRIPTION STATUS FILTER

Filter real Subscription states.

User-facing options should map cleanly to lifecycle states such as:

* Active
* Trial
* Cancelled
* Expired
* Admin Granted
* Past Due / Grace where final design exposes them.

Use exact visible Batch controls.

---

# 21. PLAN FILTER

Load actual Plan options.

Use Plan ID for query.

Do not filter by display name string.

---

# 22. ROLE FILTER

Options:

* Owner
* Broker
* Builder

Use final Public Role model only.

---

# 23. SUBSCRIPTION RENEWAL DISPLAY

The RENEWAL column must be context-aware.

Examples:

Active:

`28 Jul 2026`

Trial:

Trial end date.

Cancelled:

`ended 15 Jun`

Expired:

expiry date.

Do not label an expired date as Renewal.

---

# 24. SUBSCRIPTION LIST PAGINATION

Use scalable pagination or cursor.

Do not load all Subscriptions.

---

# 25. SUBSCRIPTION LIST LOADING STATE

The source explicitly requires:

**shimmer rows**

Use table-shaped skeleton rows.

Do not show plain:

`Loading…`

---

# 26. SUBSCRIPTION LIST EMPTY STATE

Exact behavior:

`No subscriptions match these filters`

Action:

Clear Filters.

Clear Filters must reset actual filter state and reload data.

---

# 27. SUBSCRIPTION LIST ERROR STATE

Exact behavior:

inline error banner.

Action:

`Retry`

Retry real query.

---

# 28. MOBILE SUBSCRIPTIONS

Transform desktop rows to mobile cards based on the same dataset.

Preserve:

* User,
* Role,
* Plan,
* Status,
* renewal/end date.

Do not create a second mobile fixture array.

---

# 29. SCREEN 2 — SUBSCRIPTION DETAIL

Reference user:

Initials:

`KB`

Heading:

`Kunal Bhatt — Premium`

Metadata:

`Since Mar 2024 · renews 28 Jul 2026 · card •••• 4482`

Status:

`Active`

---

# 30. SUBSCRIPTION DETAIL HEADER

Use actual:

* User,
* current Plan,
* Subscription start relationship,
* renewal date,
* safe payment method summary,
* Subscription status.

Do not invent card last four digits.

---

# 31. PAYMENT METHOD PRIVACY

Store/display only safe provider method summary.

Never store:

* full card number,
* CVV,
* UPI PIN.

---

# 32. SUBSCRIPTION USAGE — LISTINGS

Reference:

`Listings`

`31 / unlimited`

Use the real Plan limit.

If Unlimited:

display:

`unlimited`

not arbitrary huge number.

---

# 33. SUBSCRIPTION USAGE — FEATURED SLOTS

Reference:

`Featured slots`

`7 / 10`

Use real usage within the correct entitlement period.

Do not use a daily usage counter for monthly slots.

---

# 34. PLAN HISTORY

Reference heading:

`PLAN HISTORY`

The timeline contains real Subscription lifecycle history.

---

# 35. PLAN HISTORY — UPGRADE EVENT

Reference:

`Upgraded Basic → Premium`

Metadata:

`3 Jul 2026 · prorated ₹1,752.30 · pay_NxK4…8Ql`

Use actual:

* previous Plan,
* target Plan,
* event date,
* verified amount,
* masked Payment ID.

---

# 36. PLAN HISTORY — RENEWAL EVENT

Reference:

`Renewed Basic`

Metadata:

`3 Jun 2026 · ₹1,178.82`

Use actual Subscription event and Payment relationship.

---

# 37. PLAN HISTORY — TRIAL START

Reference:

`Trial started (14 days)`

Metadata:

`Mar 2024 · campaign "Broker Launch"`

This requires the Trial record to preserve Campaign relationship.

Do not reconstruct Campaign source from free text.

---

# 38. PLAN HISTORY DATA MODEL

Subscription event history should support metadata such as:

* old Plan,
* new Plan,
* amount,
* Payment reference,
* Trial Campaign,
* actor type,
* date.

Do not create fake history by diffing only current Subscription row.

---

# 39. MANUAL EXTEND

Reference section:

`MANUAL EXTEND`

Quick choices:

* +7 days
* +14 days
* +30 days

Notice:

`This action will be logged.`

Action:

`Extend subscription`

---

# 40. MANUAL EXTEND FLOW

Required:

1. Staff selects duration.
2. System calculates current period end.
3. Confirmation identifies user, Plan and new expiry date.
4. Staff supplies/retains approved reason according to governance.
5. Server verifies permission.
6. Period extends once.
7. Subscription Event created.
8. Billing Audit created.
9. User notified where appropriate.

---

# 41. MANUAL EXTEND DATE RULE

Extension should normally add to the later of:

* current period end,
* current time,

according to approved business policy.

Do not accidentally shorten an expired Subscription.

---

# 42. MANUAL EXTEND IDEMPOTENCY

Double submit must not add 14 days twice.

Use:

* disabled action,
* operation identity/idempotency,
* server state check.

---

# 43. MANUAL EXTEND SCOPE

Manual Extend is not the same as:

Manual Activation.

Extend applies to an existing Subscription period.

Manual Activation creates/grants a Subscription period without verified payment.

Keep both workflows separate.

---

# 44. MANUAL EXTEND AUDIT

Audit must include:

* old period end,
* added days,
* new period end,
* actor,
* reason.

---

# 45. CURRENT SUBSCRIPTION ADMIN RECONCILIATION

The inspected current Admin Billing implementation provides counts and a combined Overview, but not the complete Batch 12 Subscription List/Detail/Manual Extend workflow.

Build Screens 1–2 as dedicated operational screens.

---

# 46. SCREENS 3–5 — PAYMENTS AND WEBHOOKS

This section includes:

* Payments List,
* Payment Detail,
* Webhook Event Log.

These screens must preserve the Batch 12 Gateway Status grammar exactly.

---

# 47. SCREEN 3 — PAYMENTS LIST

Controls:

* Search user, payment id…
* Status
* Method
* Date

Columns:

* USER
* AMOUNT
* METHOD
* GATEWAY STATUS
* DATE

---

# 48. PAYMENT REFERENCE ROW 1

User:

`Kunal Bhatt`

Amount:

`₹1,752.30`

Method:

`UPI`

Gateway Status:

`Captured`

Date:

`3 Jul 12:04`

---

# 49. PAYMENT REFERENCE ROW 2

User:

`Kunal Bhatt`

Amount:

`₹1,752.30`

Method:

`UPI`

Gateway Status:

`Refunded`

Date:

`3 Jul 12:06`

---

# 50. PAYMENT REFERENCE ROW 3

User:

`Meena Trivedi`

Amount:

`₹589.41`

Method:

`Card`

Gateway Status:

`Failed`

Date:

`2 Jul 18:22`

---

# 51. PAYMENT REFERENCE ROW 4

User:

`Sankalp Developers`

Amount:

`₹9,438.82`

Method:

`Netbanking`

Gateway Status:

`Pending`

Date:

`2 Jul 09:47`

---

# 52. PAYMENT LIST SEARCH

Search by:

* User,
* masked-safe Payment reference/full internal match where Staff permission allows.

The server may match a complete Payment ID but should still return masked display.

---

# 53. PAYMENT STATUS FILTER

Use one of:

* Captured
* Failed
* Pending
* Refunded

for Batch 12 Gateway Status UI.

Internal provider statuses may need mapping.

Example:

* `captured` → Captured
* `failed` → Failed
* `pending` / `authorized` awaiting final state → Pending
* `refunded` → Refunded

Do not map:

`authorized`

to Captured.

---

# 54. PAYMENT METHOD FILTER

Options come from actual methods such as:

* UPI,
* Card,
* Netbanking.

Do not show unavailable method options without real data unless the source design uses a fixed filter list.

---

# 55. PAYMENT DATE FILTER

Use actual transaction/payment timestamp.

Do not filter by Subscription creation date.

---

# 56. PAYMENT LIST PAGINATION

Use paginated server query.

---

# 57. PAYMENT LIST MOBILE

Transform rows into cards.

Preserve:

* User,
* Amount,
* Method,
* Gateway Status,
* Date.

---

# 58. SCREEN 4 — PAYMENT DETAIL

Reference heading:

`₹1,752.30 — Kunal Bhatt`

Metadata:

`3 Jul 2026 12:04 IST · UPI`

Status:

`Captured`

---

# 59. PAYMENT DETAIL SAFE SUMMARY

Exact safe fields:

### Payment ID

`pay_NxK4•••••8Ql`

### Order ID

`order_Nx91•••••2Ah`

### UPI ref

`617843••••21`

### Invoice

`MGP-2026-0847`

---

# 60. RAW GATEWAY PAYLOAD PROHIBITION

The source explicitly states:

**raw gateway JSON and secrets are never rendered in Admin.**

Do not render:

* complete webhook JSON,
* signature header,
* gateway secret,
* Payment signature,
* raw bank payload,
* full VPA if privacy policy masks it.

---

# 61. SAFE PAYMENT SUMMARY PROJECTION

Create an explicit Admin-safe Payment detail projection.

Do not pass the complete provider object to the Client and hide it with CSS.

---

# 62. INVOICE LINK

Invoice reference:

`MGP-2026-0847`

must open the exact Admin Invoice Detail.

---

# 63. RECONCILE WITH GATEWAY

Action:

`Reconcile with gateway`

This is a real operational action.

---

# 64. RECONCILIATION FLOW

Required:

1. Staff has Payment reconciliation permission.
2. Server loads local Payment/Order.
3. Server queries configured gateway securely.
4. Compares:

   * provider Payment ID,
   * Order ID,
   * amount,
   * currency,
   * gateway status.
5. Stores reconciliation result.
6. Creates Billing Audit.
7. Does not blindly activate Subscription on mismatch.

---

# 65. RECONCILIATION PROVIDER SECRET

Gateway API credentials remain server-only.

Never return keys to Browser.

---

# 66. RECONCILIATION RESULTS

Support honest states such as:

* Matched,
* Amount Mismatch,
* Currency Mismatch,
* Provider Pending,
* Provider Failed,
* Manual Review.

Map the screen's Gateway Status separately.

---

# 67. RECONCILIATION DUPLICATE PROTECTION

Repeated reconciliation may re-check provider state but must not:

* duplicate Subscription activation,
* duplicate Invoice,
* duplicate Refund.

---

# 68. PAYMENT DETAIL AUDIT

Manual Reconcile action must be logged.

---

# 69. SCREEN 5 — WEBHOOK EVENTS LOG

Heading context:

Webhook events.

Columns:

* EVENT
* RECEIVED
* PROCESSING

---

# 70. WEBHOOK ROW 1

Event:

`payment.captured`

Received:

`12:04:31`

Processing:

`Processed`

---

# 71. WEBHOOK ROW 2

Event:

`refund.processed`

Received:

`12:06:02`

Processing:

`Failed ×2`

Action:

`Retry`

---

# 72. WEBHOOK ROW 3

Event:

`subscription.charged`

Received:

`09:47:15`

Processing:

`Queued`

---

# 73. WEBHOOK EVENT PROCESSING STATES

Admin UI needs operational processing state such as:

* Processed
* Failed ×N
* Queued
* Processing
* Ignored
* Manual Review

according to actual system.

Do not confuse Processing status with Gateway Status grammar.

---

# 74. WEBHOOK RETRY COUNT

Reference:

`Failed ×2`

Persist actual processing-attempt count.

The current Webhook foundation needs explicit retry-attempt tracking if not already present.

Do not derive failure count from Browser clicks only.

---

# 75. WEBHOOK RETRY ACTION

`Retry`

must:

* require high-risk permission,
* confirm event is retryable,
* increment attempt safely,
* run idempotent event processing,
* update result,
* log Staff action.

---

# 76. WEBHOOK RETRY SAFETY

Retry must not:

* process invalid signature as trusted,
* duplicate Payment,
* duplicate Subscription activation,
* duplicate Invoice,
* duplicate Coupon Redemption,
* duplicate Add-on grant,
* duplicate Refund.

---

# 77. WEBHOOK SAFE EVENT DETAIL

Reference:

`EVENT DETAIL — SAFE SUMMARY`

Example:

`event: refund.processed · entity: rfnd_Ky2•••7Bc`

`amount: ₹1,752.30 · payment: pay_NxK4•••8Ql`

`signature: verified ✓ · payload secrets: redacted`

---

# 78. SIGNATURE DISPLAY

Show:

Verified / Invalid

as a boolean result.

Never show the signature value.

---

# 79. PAYLOAD REDACTION

Do not store or display unnecessary secrets.

If a raw encrypted/compliance log is retained operationally:

it must not be surfaced through Batch 12 UI.

---

# 80. WEBHOOK EVENT PAGINATION

Use pagination/cursor.

Webhook logs can be large.

---

# 81. WEBHOOK FILTER FOUNDATION

Architecture should support server-side filtering by:

* Event Type,
* Processing State,
* Date

where needed for operational scale.

Do not add conflicting visible controls beyond exact Batch design.

---

# 82. CURRENT WEBHOOK RECONCILIATION — AUTHORIZED EVENT

The current inspected Webhook handler includes:

* `payment.captured`
* `order.paid`
* `payment.authorized`

in handled activation-type events.

Batch 10 and Batch 12 financial integrity require this to be corrected.

A Payment must not become Captured/activate a paid Subscription merely because it is Authorized where the configured capture model requires final capture.

---

# 83. CURRENT WEBHOOK EVENT-ID FALLBACK RISK

The current inspected handler can fall back to:

timestamp-based no-ID identity.

This is unsafe for strong duplicate-event financial idempotency because repeated delivery may become a different ID.

Batch 12 requires stable event identity strategy.

---

# 84. CURRENT WEBHOOK PAYLOAD SHAPE RULE

Different provider event types may have different payload structures.

Do not process:

`payment.captured`

and:

`order.paid`

using one assumed identical nested payment shape unless validated against the provider's actual event structure.

---

# 85. CURRENT WEBHOOK RETRY GAP

The current inspected Admin Billing UI does not provide Batch 12 Webhook Log/Retry management.

Build:

* event list,
* safe detail,
* retry count,
* idempotent Retry.

---

# 86. SCREENS 6–9 — REFUNDS, CREDIT NOTES AND MANUAL ACTIVATION

All override actions in this group must be reasoned and audited.

---

# 87. SCREEN 6 — REFUND REQUEST QUEUE

Columns:

* USER
* AMOUNT
* REASON
* DATE

---

# 88. REFUND REFERENCE ROW 1

User:

`Kunal Bhatt`

Amount:

`₹400`

Reason:

`Feature not used`

Date:

`2 Jul`

---

# 89. REFUND REFERENCE ROW 2

User:

`Meena Trivedi`

Amount:

`₹589.41`

Reason:

`Charged by mistake`

Date:

`30 Jun`

---

# 90. REFUND QUEUE DATA

Use real Refund Requests.

Do not mix:

* processed Refunds,
* rejected Refunds

into Pending Queue without explicit filter.

---

# 91. REFUND REASON DISPLAY

Display structured reason label.

Examples:

* Feature not used
* Charged by mistake
* Service issue
* Other

Do not expose long private support text in table summary.

---

# 92. REFUND QUEUE SORT

Use oldest-first or source-defined operational priority.

The final behavior should support SLA management.

---

# 93. REFUND QUEUE PAGINATION

Use pagination.

---

# 94. REFUND QUEUE MOBILE

Use cards from the same dataset.

---

# 95. SCREEN 7 — REFUND DETAIL

Reference:

`REF-114 — Kunal Bhatt · ₹400.00`

Context:

`Invoice MGP-2026-0698 · Featured slots · paid 18 May`

Status:

`Pending`

User reason:

`"Bought 2 featured slots but the listing was rejected before I could use them."`

---

# 96. REFUND DISPLAY ID

Use safe human-readable Refund reference.

Do not display only UUID.

---

# 97. REFUND INVOICE CONTEXT

Link to actual:

* Invoice,
* purchased item/Add-on,
* Payment.

Do not show unrelated Invoice.

---

# 98. REFUND ELIGIBILITY REVIEW

Before Staff decision, show actual safe eligibility context where available:

* original amount,
* already refunded amount,
* remaining refundable amount,
* item/service,
* purchase date,
* usage state where relevant.

Do not auto-approve based solely on user reason.

---

# 99. FULL / PARTIAL REFUND

Exact controls:

* Full ₹400
* Partial

---

# 100. FULL REFUND AMOUNT

Full Refund means:

current refundable balance.

Not blindly original Payment amount if previous partial Refund exists.

---

# 101. PARTIAL REFUND

When selected:

require amount.

Validate:

* > 0,
* <= remaining refundable balance,
* currency-safe precision.

---

# 102. DECISION REASON

Exact field:

`Decision reason *`

The source explicitly states:

required for:

* Approve,
* Reject.

Server-side requirement mandatory.

---

# 103. APPROVE REFUND

Action:

`Approve refund…`

The ellipsis matters functionally:

Approval opens a confirmation dialog before gateway Refund begins.

Do not immediately send gateway Refund on first click.

---

# 104. REFUND APPROVAL CONFIRMATION

The confirmation must show:

* Refund reference,
* user,
* amount,
* Invoice,
* decision reason,
* irreversible/provider effect warning.

---

# 105. REFUND APPROVAL FLOW

Required sequence:

Pending Refund
→ Staff Approves decision
→ confirmation
→ server revalidates Refund
→ gateway Refund request initiated
→ Refund status Processing
→ provider confirmation/Webhook
→ Processed/Refunded.

Do not jump:

Pending
→ Refunded

before provider confirmation.

---

# 106. REFUND GATEWAY FAILURE

If gateway call fails:

status must remain honest:

* Approved awaiting retry,
* Processing Failed,
* Failed

according to final state model.

Do not show Refunded.

---

# 107. REFUND REJECT

Reject:

* requires reason,
* persists Rejected status,
* user notified,
* Audit logged.

No gateway action.

---

# 108. REFUND IDEMPOTENCY

Repeated Approve/Retry must not create duplicate provider Refund.

Use:

* provider Refund ID,
* local idempotency identity,
* state guard.

---

# 109. REFUND STATUS EVENTS

Store lifecycle events for:

* Requested,
* Approved,
* Processing,
* Processed,
* Failed,
* Rejected.

Needed for user tracker and Admin audit.

---

# 110. CURRENT REFUND SCHEMA RECONCILIATION

The current schema provides Refund foundation but Batch 12 needs richer decision workflow.

Ensure model supports:

* Display reference,
* structured reason,
* decision reason,
* partial/full decision,
* approved amount,
* provider status,
* attempt history,
* rejection reason,
* lifecycle events.

---

# 111. SCREEN 8 — CREDIT NOTES

Screen includes:

* Create Credit Note,
* Issued Credit Notes list.

Heading/action:

`Issue credit note`

Notice:

`This action will be logged.`

---

# 112. CREDIT NOTE LIST COLUMNS

* NOTE #
* USER
* AMOUNT
* DATE

---

# 113. CREDIT NOTE REFERENCE ROW 1

Number:

`CN-0041`

User:

`Vipul Desai`

Amount:

`₹120`

Date:

`28 Jun`

---

# 114. CREDIT NOTE REFERENCE ROW 2

Number:

`CN-0040`

User:

`Sankalp Developers`

Amount:

`₹1,000`

Date:

`21 Jun`

---

# 115. CREDIT NOTE PURPOSE

A Credit Note must be linked to a legitimate financial correction/refund/accounting event.

Do not allow free creation of arbitrary account credit unrelated to:

* Invoice,
* Refund,
* correction basis.

---

# 116. CREDIT NOTE CREATE FORM

The source compactly shows the create action, but implementation needs the minimum required structured data:

* related Invoice,
* related Refund where applicable,
* amount,
* tax reversal,
* reason.

Do not add unrelated fields beyond accounting requirements.

---

# 117. CREDIT NOTE NUMBER

Use concurrency-safe sequential numbering.

Do not use:

count + 1.

---

# 118. TAX REVERSAL

Credit Note should preserve:

* taxable reversal,
* CGST/SGST/IGST reversal where required,

according to Invoice tax structure.

Do not use a single arbitrary amount when tax accounting requires breakdown.

---

# 119. CREDIT NOTE ISSUE FLOW

Required:

1. Select eligible Invoice.
2. Validate remaining correctable/refundable amount.
3. Enter amount and reason.
4. Preview financial effect.
5. Confirm.
6. Issue number.
7. Persist immutable Credit Note.
8. Update Invoice financial relationship/status.
9. Audit.

---

# 120. CREDIT NOTE IMMUTABILITY

Issued Credit Note should not be silently edited.

Use:

* cancellation/reversal workflow

according to accounting policy if correction required.

---

# 121. CREDIT NOTE USER VISIBILITY

User Billing should display the Credit Note where product/accounting workflow requires.

---

# 122. CREDIT NOTE PAGINATION

Use pagination for issued list.

---

# 123. SCREEN 9 — MANUAL ACTIVATION

Warning:

`This bypasses payment verification`

Supporting copy:

`use only for approved exceptions. The user's billing page will show "Activated by support" (Batch 10 §15).`

---

# 124. MANUAL ACTIVATION PLAN OPTIONS

Reference:

* Plan: Basic (Broker)
* Plan: Premium (Broker)

Use actual eligible Plans.

Do not hard-code only these two globally.

---

# 125. MANUAL ACTIVATION DURATION

Reference options:

* Duration: 30 days
* Duration: 90 days

Use exact Batch visible behavior.

---

# 126. MANUAL ACTIVATION AUDIT NOTICE

Reference:

`This action will be logged in the audit trail.`

Audit is mandatory.

---

# 127. MANUAL ACTIVATION ACTION

Reference:

`Activate manually…`

Must open confirmation before final action.

---

# 128. MANUAL ACTIVATION REQUIRED REASON

Even though the compact source highlights the bypass warning, manual financial override requires a reason.

Persist:

* reason,
* Staff actor,
* target user,
* Plan,
* duration,
* start/end date.

---

# 129. MANUAL ACTIVATION SOURCE

Subscription source must be:

`admin_grant`

or final equivalent.

Do not use:

`payment`.

---

# 130. MANUAL ACTIVATION PAYMENT RULE

Do not create:

* fake Payment,
* fake Captured transaction,
* fake provider reference.

---

# 131. MANUAL ACTIVATION INVOICE RULE

No payment collected means:

do not create a fake Paid Invoice.

The user's Batch 10 Billing screen must honestly display:

`Activated by support`.

---

# 132. MANUAL ACTIVATION CURRENT SUBSCRIPTION CONFLICT

Before activation:

check existing Subscription.

Do not accidentally overwrite:

* active paid Plan,
* Trial,
* scheduled downgrade

without explicit conflict handling.

---

# 133. MANUAL ACTIVATION PERIOD

Store exact:

* period start,
* period end,
* granted by Staff.

---

# 134. MANUAL ACTIVATION EXPIRY

A lifecycle processor must expire/revert the granted period according to product policy.

Do not leave Admin Granted active forever.

---

# 135. MANUAL ACTIVATION DUPLICATE PROTECTION

Double click/retry must not extend twice.

---

# 136. SCREENS 10–11 — ADMIN INVOICES

Batch 12 Invoice Administration covers:

* all-user Invoice list,
* export,
* versioned correction.

---

# 137. SCREEN 10 — INVOICE LIST

Reference filters:

Date:

`1–3 Jul`

Control:

`Status`

Toggle/filter:

`GST only`

Action:

`Export CSV`

Columns:

* INVOICE #
* USER
* AMOUNT
* STATUS

---

# 138. INVOICE REFERENCE ROW 1

Invoice:

`MGP-2026-0847`

User:

`Kunal Bhatt`

Amount:

`₹1,752.30`

Status:

`Paid`

---

# 139. INVOICE REFERENCE ROW 2

Invoice:

`MGP-2026-0846`

User:

`Sankalp Developers`

Amount:

`₹9,438.82`

Status:

`Pending`

---

# 140. ALL-USERS ADMIN SCOPE

Unlike user Billing screens, Admin Invoice List may view all authorised Invoice records.

Server permission required.

---

# 141. DATE RANGE FILTER

Filter by:

* issue date,
* or clearly defined Invoice date.

Use consistent semantics.

---

# 142. STATUS FILTER

Use actual Invoice status.

Do not reuse Gateway Status grammar.

---

# 143. GST ONLY FILTER

`GST only`

must filter actual GST/B2B relevant Invoice records according to approved definition.

Possible basis:

* B2B GST Invoice,
* buyer GSTIN present.

Define consistently.

Do not filter by amount.

---

# 144. EXPORT CSV

Export only records matching the active filters.

Do not export all Invoices silently when UI shows a date range/filter.

---

# 145. CSV SECURITY

Require export permission.

Audit export with:

* Staff actor,
* filters,
* record count,
* timestamp.

---

# 146. CSV CONTENT

Include approved safe accounting fields.

Examples:

* Invoice Number,
* Date,
* User safe identifier/name,
* taxable amount,
* CGST,
* SGST,
* IGST,
* total,
* status,
* GSTIN where Staff export permission allows.

Use correct CSV escaping.

---

# 147. LARGE EXPORT

For large data volumes:

use safe server export job according to final Export architecture.

Do not load millions of records into Browser memory.

---

# 148. INVOICE LIST PAGINATION

Use pagination/cursor.

---

# 149. INVOICE LIST MOBILE

Transform table rows to cards.

---

# 150. SCREEN 11 — INVOICE CORRECTION

Reference:

`Correct MGP-2026-0846`

State:

`v2 draft`

Fields/sections:

* GSTIN (v1 — original)
* GSTIN (corrected)

Source rule:

`Both versions retained; correction logged. Legitimate corrections only — totals recompute automatically.`

Action:

`Save corrected version`

---

# 151. INVOICE CORRECTION IS VERSIONED

Do not update an issued Invoice row in place.

Required:

Original Invoice Version
→ Correction Draft v2
→ approved/saved corrected version.

Retain v1.

---

# 152. INVOICE VERSION MODEL

Support at minimum:

* original Invoice identity,
* Invoice version number,
* parent/original relation,
* corrected fields,
* correction reason,
* Staff actor,
* created time,
* current active version marker.

---

# 153. ORIGINAL VERSION IMMUTABILITY

`v1 — original`

must remain available for audit.

Do not overwrite GSTIN.

---

# 154. CORRECTION LEGITIMACY

Invoice Correction is not a free arbitrary editing tool.

Allow only legitimate correctable fields according to accounting policy.

Examples may include:

* Buyer GSTIN,
* Buyer legal name,
* Billing address,
* place-of-supply data

where legally permissible.

Do not use Invoice Correction to secretly change a Payment amount.

---

# 155. CORRECTION REASON

Require Staff reason.

Store Audit.

---

# 156. TOTAL RECOMPUTATION

The source explicitly says:

`totals recompute automatically`

If corrected tax jurisdiction/GST data changes tax calculation:

recompute using trusted financial rules.

Do not allow Staff to type arbitrary total.

---

# 157. TOTAL CONSISTENCY

Corrected version must still satisfy:

Taxable Amount

* CGST
* SGST
* IGST
  = Total.

---

# 158. PAYMENT AMOUNT CONSTRAINT

Invoice Correction must not create a corrected total inconsistent with the underlying actual financial transaction without an approved:

* Credit Note,
* Debit Note/additional charge process,

according to accounting policy.

Do not silently rewrite history.

---

# 159. CORRECTION VERSION DISPLAY

Users/Admin should be able to identify:

* original version,
* current corrected version.

---

# 160. CORRECTION AUDIT

Record:

* Invoice,
* v1 values,
* v2 values,
* reason,
* Staff,
* timestamp.

---

# 161. CURRENT INVOICE ARCHITECTURE RECONCILIATION

Current Invoice generation stores immutable snapshot-style Buyer data, which is useful.

However, Batch 12 requires:

* Admin all-user Invoice list,
* filterable export,
* versioned Correction architecture.

Build these features.

---

# 162. CURRENT INVOICE LINE-ITEM RECONCILIATION

Batch 10 requires rich Invoice line items.

Batch 12 corrections/exports must work with the final Batch 10 Invoice model.

Do not build Admin corrections around an obsolete one-line generic Invoice structure.

---

# 163. SCREENS 12–15 — PLANS AND COUPONS

These screens control the same catalog used by Batch 10 Public Pricing and Checkout.

This creates a strict source-of-truth requirement.

---

# 164. SCREEN 12 — PLANS LIST

Columns:

* PLAN
* ROLE
* PRICE
* STATUS

---

# 165. PLAN REFERENCE ROW 1

Plan:

`Basic`

Role:

`Broker`

Price:

`₹999/mo`

Status:

`Active`

---

# 166. PLAN REFERENCE ROW 2

Plan:

`Premium`

Role:

`Broker`

Price:

`₹2,499/mo`

Status:

`Active`

---

# 167. PLAN REFERENCE ROW 3

Plan:

`Starter 2024`

Role:

`Owner`

Price:

`₹499/mo`

Status:

`Archived`

---

# 168. PLAN STATUS MODEL

At minimum:

* Active
* Archived

The public Pricing page must display only:

* active,
* public Plans.

Archived Plan remains available for historical Subscriptions/Invoices.

Do not delete a Plan referenced by financial history.

---

# 169. PLAN ARCHIVE RULE

Archiving a Plan:

* prevents new purchases,
* preserves existing Subscription/Invoice relationships,
* follows renewal/migration policy for existing subscribers.

Do not cascade-delete historical data.

---

# 170. PLAN LIST PAGINATION

Use pagination if catalog grows.

---

# 171. PLAN LIST MOBILE

Use cards based on same Plan records.

---

# 172. SCREEN 13 — PLAN CREATE / EDIT

Fields:

### Plan name *

### Role

Options:

* Broker
* Owner
* Builder

### Price (₹/cycle)

### Billing cycle

Options:

* Monthly
* Quarterly
* Yearly

---

# 173. PLAN FEATURE LIMITS

Exact source fields:

* Listings
* Featured slots/mo
* Ad credits (₹)
* Team seats

---

# 174. PLAN ACTIVE CONTROL

Reference:

`Plan active — visible on public pricing page`

This control must map to actual public availability.

The final data model may distinguish:

* Active,
* Public.

The UI semantics must remain clear.

---

# 175. SAVE PLAN

Action:

`Save plan`

must validate and persist.

---

# 176. PLAN VALIDATION

Required:

* Name non-empty,
* Public Role valid,
* price non-negative,
* Billing Cycle valid,
* limits non-negative,
* currency INR according to current platform,
* unique Plan Code/identity handled safely.

---

# 177. PLAN CODE

If Plan Code is generated from Plan name:

do not unexpectedly change immutable Plan identity when name changes.

Use stable Plan code.

---

# 178. PLAN PRICE EDIT IMPACT

Editing Plan price changes future purchasing behavior.

Do not retroactively rewrite historical:

* Payment,
* Invoice,
* Subscription event amounts.

---

# 179. PLAN LIMIT EDIT IMPACT

Define effective timing for active subscribers.

Potential policy:

* immediately,
* next cycle,
* grandfathered.

The system must implement one consistent rule.

Do not change entitlements unpredictably.

---

# 180. LIVE PUBLIC PRICING PREVIEW

Reference section:

`PUBLIC PRICING PREVIEW`

Badge:

`MOST POPULAR`

Plan:

`Basic`

Price:

`₹999`

Cycle:

`/month`

Features:

* 25 active listings
* 2 featured slots/month
* ₹500 ad credits

Action preview:

`Choose Basic`

---

# 181. PREVIEW EXACT COMPONENT REUSE

The source states:

`Renders with the Batch 10 public pricing card — brand teal, since this is what users see.`

The Admin Preview must use the same public Pricing Card rendering component or exact shared component logic.

Do not create a separate approximate Admin preview.

---

# 182. PREVIEW IS NOT A LIVE PURCHASE ACTION

Inside Admin editor:

`Choose Basic`

is Preview content.

It must not open Checkout from Admin.

---

# 183. MOST POPULAR CONFIGURATION

If Plan can be marked Most Popular:

persist approved presentation configuration.

Do not infer automatically from price position.

---

# 184. PLAN EDIT DRAFT SAFETY

Avoid public Pricing changing with each unsaved field keystroke.

Preview may update live locally, but public catalog changes only after Save.

---

# 185. PLAN SAVE AUDIT

Record:

* before,
* after,
* actor,
* timestamp.

For price/limit changes, Audit must be clear.

---

# 186. PLAN PERMISSION

Only authorised Billing/Plan Manager or Super Admin may change Plan catalog.

---

# 187. CURRENT PLAN UI RECONCILIATION

The inspected current Admin Billing page explicitly describes Plan create/edit as a later sub-phase.

Batch 12 requires it now.

Replace read-only Plans summary with:

* Screen 12 List,
* Screen 13 Create/Edit,
* live Preview.

---

# 188. SCREEN 14 — COUPON LIST

Columns:

* CODE
* DISCOUNT
* USAGE
* EXPIRY
* STATUS

---

# 189. COUPON REFERENCE ROW 1

Code:

`BROKER10`

Discount:

`10% off`

Usage:

`184 / 500`

Expiry:

`31 Aug`

Status:

`Active`

---

# 190. COUPON REFERENCE ROW 2

Code:

`EXPIRED20`

Discount:

`₹200 flat`

Usage:

`312 / 300`

Expiry:

`1 Jun`

Status:

`Expired`

---

# 191. COUPON STATUS

Determine from:

* active flag,
* date validity,
* usage limit.

Expired visual state must be honest.

Do not display Active if the end date passed.

---

# 192. USAGE DISPLAY

`184 / 500`

uses actual successful Coupon redemption count according to final redemption policy.

Do not count:

* Coupon validation,
* abandoned Checkout,

as successful Redemption unless the reservation model intentionally defines separate reserved usage.

---

# 193. COUPON OVER-LIMIT DATA

Reference fixture shows:

`312 / 300`

for expired Coupon.

The system must handle historical states without breaking.

However, new redemption logic must prevent usage-limit concurrency overshoot.

---

# 194. SCREEN 15 — COUPON CREATE / EDIT

Fields:

### Code *

### Discount

Type control:

`%`

Applicable Plans:

* Basic (Broker)
* Premium (Broker)
* Owner Plans
* Builder Plans

Dates:

* Valid from — 15 Jul
* Valid to — 30 Sep

Usage limit

Action:

`Save coupon`

---

# 195. COUPON CODE VALIDATION

Required:

* trim,
* uppercase normalization,
* safe allowed characters,
* unique code.

Do not allow duplicate code differing only by case.

---

# 196. DISCOUNT TYPE

Support actual:

* Percentage,
* Fixed Amount

according to current Coupon domain.

Do not use a percentage-only backend.

---

# 197. PERCENTAGE VALIDATION

Percentage must be within approved range.

Do not allow negative or impossible values.

---

# 198. FIXED DISCOUNT VALIDATION

Fixed amount:

* non-negative,
* currency-safe,
* capped by Checkout subtotal.

---

# 199. APPLICABLE PLANS — MULTI-SELECT REQUIREMENT

Batch 12 source shows multiple applicable Plan selections.

The current inspected Coupon schema supports only one:

`applies_plan_id`

plus role.

This is insufficient for exact Batch 12 multi-plan behavior.

Implement a proper relationship such as:

* `coupon_applicable_plans`,
* or equivalent many-to-many model.

Do not store a comma-separated Plan list.

---

# 200. OWNER/BUILDER PLAN GROUP SELECTION

The design includes:

* Owner plans,
* Builder plans

as applicability groups.

Implement a clear mapping.

Possible behavior:

select all active Plans under that role at save time

or

store role applicability rules.

Choose one consistent schema behavior.

Do not create hidden ambiguity.

---

# 201. VALID FROM

The current inspected Coupon foundation has expiry but no explicit visible start date in the type/schema reviewed.

Batch 12 requires:

`Valid from`

Add real start timestamp/date support.

Coupon must not validate before start.

---

# 202. VALID TO

Persist expiry/end.

Validate:

end >= start.

---

# 203. USAGE LIMIT

Server-side enforcement required.

Do not trust `used_count` read then increment in a race-prone flow.

---

# 204. PER-USER LIMIT

The current Coupon system already includes per-user limit foundation.

Preserve it.

Admin editor may use approved default/advanced setting according to final exact design.

Do not remove security because compact Batch screen does not show every advanced field.

---

# 205. COUPON REDEMPTION CONCURRENCY

Prevent parallel successful Checkouts from using the final remaining slot twice.

Use:

* transaction,
* atomic function,
* safe reservation/commit model.

---

# 206. COUPON EDIT IMPACT

Editing Coupon must not retroactively change historical Checkout/Invoice discount snapshots.

---

# 207. COUPON DEACTIVATION

Disabled/expired Coupon:

* cannot apply to new Checkout,
* historical redemptions remain.

---

# 208. COUPON SAVE AUDIT

Record before/after.

---

# 209. CURRENT COUPON RECONCILIATION

Current foundation has:

* server-side Coupon validation,
* role filtering,
* single Plan filtering,
* expiry,
* usage limit,
* per-user limit.

Batch 12 requires extension for:

* valid-from date,
* multi-Plan applicability,
* complete Admin List,
* complete Admin Create/Edit,
* concurrency-safe final Redemption.

---

# 210. SCREENS 16–17 — TRIAL CAMPAIGNS

Batch 12 uses Campaign-based Trial administration.

A Trial Campaign is not merely an individual Trial row.

---

# 211. SCREEN 16 — TRIAL CAMPAIGN LIST

Columns:

* CAMPAIGN
* ROLE
* DURATION
* ACTIVE USERS

---

# 212. TRIAL CAMPAIGN REFERENCE ROW 1

Campaign:

`Monsoon Broker Trial`

Role:

`Broker`

Duration:

`14 days`

Active Users:

`86`

---

# 213. TRIAL CAMPAIGN REFERENCE ROW 2

Campaign:

`Owner Onboarding`

Role:

`Owner`

Duration:

`7 days`

Active Users:

`241`

---

# 214. TRIAL CAMPAIGN DATA MODEL

The current inspected Trial schema stores individual user Trial rows but does not itself represent the complete Campaign catalog relationship required by Batch 12.

Implement:

Trial Campaign
→ Role
→ Plan/entitlement target
→ Duration
→ Active status
→ eligibility rules where approved.

Individual Trial records should reference the Campaign.

---

# 215. ACTIVE USER COUNT

`86`

and:

`241`

must be actual count of currently active Trial participants under each Campaign.

Do not count:

* expired,
* revoked,
* not eligible.

---

# 216. TRIAL CAMPAIGN STATUS

Campaign should support at minimum:

* Active,
* Paused/Inactive,
* Archived

according to final product design.

Do not allow new Trial grants from inactive Campaign.

---

# 217. TRIAL CAMPAIGN ROLE

Use final roles:

* Owner,
* Broker,
* Builder.

---

# 218. TRIAL CAMPAIGN DURATION

Store duration structurally.

Do not parse:

`14 days`

from Campaign name.

---

# 219. TRIAL CAMPAIGN LIST PAGINATION

Use pagination if needed.

---

# 220. SCREEN 17 — TRIAL GRANT / REVOKE

Reference Campaign choices/context:

* Owner Onboarding · 7d
* Monsoon Broker · 14d

Notice:

`This action will be logged.`

Actions:

* Grant trial
* Revoke trial…

---

# 221. GRANT TRIAL

Required:

1. Staff selects eligible user.
2. Staff selects active Campaign.
3. Server validates user role.
4. Server validates Trial eligibility.
5. Server ensures no conflicting active paid Subscription.
6. Trial created/activated.
7. Subscription trialing state synchronized.
8. Trial Campaign active-user count updates.
9. User Notification.
10. Audit.

---

# 222. TRIAL ROLE MATCH

Owner Campaign cannot be granted to Broker.

Server-side validation.

---

# 223. TRIAL DUPLICATE RULE

A user should not receive repeated Trials endlessly unless explicit Staff override policy allows it.

Use eligibility/history.

---

# 224. PAID SUBSCRIPTION CONFLICT

Do not replace an active paid Plan with a free Trial accidentally.

Show conflict.

---

# 225. TRIAL START / END

Store exact:

* start,
* end,
* Campaign,
* granting Staff.

---

# 226. REVOKE TRIAL CONFIRMATION

Reference:

`Revoke Meena's trial?`

Body:

`Her Basic-trial features stop immediately and she reverts to the Free plan. She'll be notified with your reason.`

Actions:

* Cancel
* Revoke trial

---

# 227. REVOKE REASON

The source explicitly says:

`with your reason`

Therefore Revoke requires reason.

Server-side.

---

# 228. REVOKE EFFECT

On Revoke:

* Trial status Revoked,
* trialing Subscription transitions appropriately,
* Trial entitlements stop immediately,
* user reverts to correct Free Plan/default state,
* user Notification includes safe reason,
* audit created.

---

# 229. FREE PLAN FALLBACK

Do not hard-code one global Free Plan.

Resolve the correct role-specific Free/default Plan.

---

# 230. TRIAL REVOKE IDEMPOTENCY

Double Revoke must not create duplicate Notifications or state corruption.

---

# 231. TRIAL EXPIRY SCHEDULER

Active Trials need reliable expiry processing.

At `ends_at`:

* Trial becomes Expired/Used according to policy,
* Trial Subscription ends,
* user falls back appropriately,
* user notified according to notification policy.

---

# 232. CURRENT TRIAL RECONCILIATION

Current foundation has individual Trial rows.

Batch 12 requires:

* Trial Campaign catalog,
* Campaign list,
* Campaign active-user count,
* Campaign relationship on Trial history,
* Grant flow,
* Revoke flow,
* reason and Notification.

---

# 233. ADMIN BILLING NAVIGATION

Batch 12 Admin Billing must make all operational groups discoverable.

Suggested internal sections consistent with design grouping:

* Subscriptions
* Payments
* Webhooks
* Refunds
* Credit Notes
* Manual Activation
* Invoices
* Plans
* Coupons
* Trials

Use the exact Batch 12 final navigation/tab architecture from source implementation.

Do not overcrowd global Admin sidebar if Batch design uses internal section navigation.

---

# 234. PAYMENT AND BILLING PERMISSION SEPARATION

A Staff member may need:

Billing View
but not:

Payment Reconcile.

Similarly:

Plan Manager
may not:

Approve Refunds.

Implement permissions by action, not only one blanket Admin page gate.

---

# 235. HIGH-RISK MANUAL OVERRIDE CONFIRMATION

Manual financial actions require deliberate confirmation.

Examples:

* Manual Extend
* Refund Approve
* Credit Note Issue
* Manual Activation
* Invoice Correction Save
* Trial Revoke

Do not execute destructive/high-risk changes on first lightweight tap where the source uses ellipsis/confirmation semantics.

---

# 236. PAYMENT STATE RECONCILIATION MODEL

Batch 12 requires local Payment state and provider state to be reconcilable.

Store:

* local status,
* provider status where safely cached,
* reconciliation status,
* last reconciled at,
* reconciliation source/actor.

---

# 237. PAYMENT DETAIL SAFE METHOD SUMMARY

For Card:

safe last four if provider supplies and policy allows.

For UPI:

masked safe reference.

For Netbanking:

safe bank/method summary if available.

Do not invent data.

---

# 238. REFUND PROVIDER RELATIONSHIP

Refund record must preserve:

* local Refund ID,
* Payment,
* provider Refund ID,
* requested amount,
* approved amount,
* provider status,
* timestamps.

---

# 239. REFUND PARTIAL TOTAL SAFETY

For a Payment:

sum of Processed Refund amounts must never exceed captured refundable amount.

Enforce transactionally.

---

# 240. CREDIT NOTE RELATIONSHIP

Credit Note should link:

* Invoice,
* Refund where applicable,
* User,
* amount,
* tax reversal.

---

# 241. MANUAL ACTIVATION GOVERNANCE

Because Manual Activation bypasses Payment verification:

restrict permission more tightly than normal Subscription View.

Do not allow generic Billing Read/Edit Staff to perform it automatically.

---

# 242. MANUAL EXTEND GOVERNANCE

Manual Extend should similarly require explicit Subscription-management permission.

---

# 243. PLAN EDIT GOVERNANCE

Plan price and limit changes affect commercial product behavior.

Require:

* Plan management permission,
* Audit.

For especially high-impact changes, later Maker-Checker Batch may apply.

Do not bypass that architecture.

---

# 244. COUPON GOVERNANCE

Coupon creation can create financial discounts.

Require:

* Coupon management permission,
* Audit,
* validation.

---

# 245. TRIAL GOVERNANCE

Trial grant/revoke changes entitlements.

Require:

* Trial management permission,
* Audit.

---

# 246. CURRENT ADMIN BILLING PAGE RECONCILIATION

The inspected current Admin Billing page currently includes:

* Provider Status,
* Counts,
* Plans read-only table,
* Recent Payments.

It must be expanded/restructured to the complete 17-screen Batch 12 architecture.

The Provider Status section may remain available in the appropriate Provider/System area, but it cannot substitute for Batch 12 screens.

---

# 247. CURRENT ADMIN BILLING ACTION GAP

The inspected current Admin Billing action provides only aggregated Overview data.

Batch 12 requires dedicated action/query layers for:

* Subscription search/filter/detail,
* Manual Extend,
* Payment search/detail,
* Reconcile,
* Webhook list/detail/retry,
* Refund queue/detail/decision,
* Credit Note issue/list,
* Manual Activation,
* Invoice filtering/export/correction,
* Plan CRUD,
* Coupon CRUD,
* Trial Campaign management,
* Trial Grant/Revoke.

---

# 248. CURRENT PAYMENT ORDER RECONCILIATION

Current Checkout Order creation uses a random idempotency key per call.

Batch 10 and Batch 12 require:

* pending-order detection,
* meaningful Checkout session identity,
* duplicate-payment prevention.

Admin Payment screens must be able to identify duplicate/pending attempts honestly.

---

# 249. CURRENT COUPON RACE RECONCILIATION

Current validation reads:

* `used_count`,
* then checks usage.

This alone is insufficient for concurrency-safe final redemption.

Implement atomic final Redemption.

---

# 250. CURRENT INVOICE ACTIVATION RECOVERY

Current activation flow can:

1. activate Subscription,
2. then attempt Invoice creation.

Batch 12 operational system must provide durable recovery if:

Payment captured
→ Subscription Active
→ Invoice insert failed.

Do not lose Invoice obligation.

---

# 251. CURRENT INVOICE IDENTITY FOUNDATION

The existing concurrency-safe Invoice number RPC is useful.

Preserve compatible behavior.

Extend for:

* versioned Invoice Correction,
* Credit Note numbering.

---

# 252. CURRENT PAYMENT STATUS DISPLAY MAPPING

The existing Payment domain includes statuses beyond Batch 12 Gateway grammar.

Map them safely.

Example:

Internal:

* authorized
* disputed
* chargeback
* reconciled

should not be incorrectly displayed as Captured.

Use secondary operational/reconciliation state where needed.

---

# 253. RAW SERVICE-ROLE DATA RULE

Admin server actions may use service-role access internally after permission check.

Never expose service key.

Every Admin action must:

1. authenticate Staff,
2. check permission,
3. then use privileged server path.

---

# 254. AUDIT LOG SEPARATION

Maintain:

### General Admin Audit

for cross-system Staff actions.

### Billing Audit

for financial actions.

Where appropriate, high-risk financial action may create both or one canonical linked Audit stream according to architecture.

Do not lose traceability.

---

# 255. DATABASE REQUIREMENTS — TRIAL CAMPAIGNS

Add Campaign structure supporting:

* ID,
* Name,
* Role,
* Plan target,
* Duration days,
* status,
* start/end availability where needed,
* created by Staff,
* timestamps.

Individual Trial records link Campaign ID.

---

# 256. DATABASE REQUIREMENTS — INVOICE VERSIONS

Add Invoice version architecture supporting:

* base Invoice ID,
* version number,
* snapshot fields,
* correction reason,
* created by Staff,
* created at,
* active/current version.

Do not destroy original Invoice.

---

# 257. DATABASE REQUIREMENTS — COUPON APPLICABLE PLANS

Support many-to-many Coupon-to-Plan relationships.

Do not keep single-Plan-only architecture if Batch 12 UI allows multiple Plans.

---

# 258. DATABASE REQUIREMENTS — WEBHOOK RETRY

Webhook Event needs:

* attempt count,
* last attempt at,
* last error code safe summary,
* processing state,
* retryable flag where useful.

Do not store raw secret error payload.

---

# 259. DATABASE REQUIREMENTS — REFUND DECISION

Refund should support:

* request reason code,
* request details,
* decision reason,
* requested amount,
* approved amount,
* decision actor,
* decision timestamp,
* provider Refund ID,
* provider state.

---

# 260. DATABASE REQUIREMENTS — CREDIT NOTE VERSIONING/AUDIT

Credit Note needs:

* concurrency-safe number,
* Invoice ID,
* Refund ID where applicable,
* amount,
* tax reversal,
* reason,
* status,
* issued by Staff,
* issued time.

---

# 261. DATABASE REQUIREMENTS — MANUAL EXTEND EVENT

Subscription Event must preserve:

* extension days,
* previous end,
* new end,
* actor,
* reason.

---

# 262. DATABASE REQUIREMENTS — PLAN HISTORY

Plan changes should preserve history/audit.

Do not rely only on current Plan row when investigating historical Pricing behavior.

---

# 263. FINANCIAL CALCULATION RULE

Use currency-safe arithmetic.

Do not use formatted strings for calculations.

For INR:

use reliable decimal/minor-unit handling.

---

# 264. TIMEZONE RULE

Admin Batch reference uses IST.

Display:

* Payments,
* Webhooks,
* Subscription events,
* Refund decisions

in approved Admin timezone.

Store timestamps consistently in UTC/timestamptz.

---

# 265. EXPORT TIMEZONE

CSV export date/time should clearly identify timezone.

Do not create ambiguous timestamps.

---

# 266. RESPONSIVE VERIFICATION MATRIX

Test:

* 360px,
* 390px,
* tablet portrait,
* tablet landscape,
* laptop,
* 1280px desktop,
* wide desktop.

---

# 267. SUBSCRIPTIONS RESPONSIVE CHECK

Desktop:

table.

Mobile:

cards.

Verify:

* long Plan names,
* Trial status,
* Cancelled ended date,
* Builder company names.

---

# 268. SUBSCRIPTION DETAIL RESPONSIVE CHECK

Verify:

* header metadata,
* usage blocks,
* Plan History,
* Manual Extend controls.

No clipping.

---

# 269. PAYMENTS RESPONSIVE CHECK

Desktop:

table.

Mobile:

cards.

Ensure masked IDs remain readable.

---

# 270. PAYMENT DETAIL RESPONSIVE CHECK

Safe-summary fields must wrap correctly.

Do not overflow long masked IDs.

---

# 271. WEBHOOK LOG RESPONSIVE CHECK

Verify:

* Event,
* Received,
* Processing,
* Retry.

Safe Summary readable on mobile.

---

# 272. REFUND RESPONSIVE CHECK

Verify:

* Refund queue cards,
* Full/Partial selection,
* Decision reason,
* Approve/Reject hierarchy,
* confirmation.

---

# 273. CREDIT NOTE RESPONSIVE CHECK

Verify:

* issue action,
* issued list,
* Note number,
* amount.

---

# 274. MANUAL ACTIVATION RESPONSIVE CHECK

Bypass warning must remain prominent on mobile.

Do not hide warning above collapsed scroll area.

---

# 275. INVOICE RESPONSIVE CHECK

Desktop table to mobile cards.

Export controls remain usable.

---

# 276. INVOICE CORRECTION RESPONSIVE CHECK

Original and corrected values must remain clearly distinguishable.

Do not collapse both fields into ambiguous single input.

---

# 277. PLAN EDITOR RESPONSIVE CHECK

Verify:

* Form fields,
* Feature Limits,
* Active control,
* Public Pricing Preview.

On mobile:

Preview stacks safely.

---

# 278. COUPON RESPONSIVE CHECK

Verify:

* Code,
* Discount type,
* Plan selections,
* Valid dates,
* Usage limit.

---

# 279. TRIAL RESPONSIVE CHECK

Trial Campaign list to cards.

Grant/Revoke confirmation usable on mobile.

---

# 280. TEXT WRAPPING VERIFICATION

Explicitly inspect:

* User names,
* company names,
* Plan names,
* Trial status labels,
* Payment IDs,
* Order IDs,
* Webhook Event names,
* Refund reasons,
* Credit Note numbers,
* Manual Activation warning,
* Invoice numbers,
* Coupon codes,
* Trial Campaign names.

Fix:

* clipping,
* overlapping badges,
* accidental two-line action labels,
* unreadable ID truncation.

Do not randomly shrink typography.

---

# 281. LOADING STATES

Required for:

* Subscription List,
* Subscription Detail,
* Payment List,
* Payment Detail,
* Webhook Events,
* Refund Queue,
* Refund Detail,
* Credit Notes,
* Invoice List,
* Invoice Correction,
* Plans,
* Coupons,
* Trials.

Use screen-specific skeletons.

---

# 282. EMPTY STATES

Required:

* No Subscriptions match filters,
* No Payments,
* No Webhook Events,
* No Refund Requests,
* No Credit Notes,
* No Invoices,
* No Plans,
* No Coupons,
* No Trial Campaigns.

Use honest actionable copy.

---

# 283. ERROR STATES

Required:

* Subscription query error,
* Manual Extend failure,
* Payment query error,
* Gateway reconciliation error,
* Webhook Retry failure,
* Refund decision failure,
* gateway Refund initiation failure,
* Credit Note issue failure,
* Manual Activation failure,
* CSV Export failure,
* Invoice correction failure,
* Plan save failure,
* Coupon save failure,
* Trial Grant/Revoke failure.

Do not expose raw provider/database errors.

---

# 284. NO DEAD UI RULE

Every visible Batch 12 action must work.

This includes:

* Subscription search,
* Subscription filters,
* Subscription row,
* Manual Extend duration,
* Extend Subscription,
* Payment search,
* Payment filters,
* Payment row,
* Invoice link,
* Reconcile With Gateway,
* Webhook Retry,
* Refund row,
* Full/Partial selection,
* Approve Refund,
* Reject Refund,
* Issue Credit Note,
* Manual Activation Plan,
* Manual Activation Duration,
* Activate Manually,
* Invoice date filter,
* Invoice Status filter,
* GST Only,
* Export CSV,
* Invoice row,
* Save Corrected Version,
* Plan row,
* Plan Create/Edit,
* Role control,
* Billing Cycle,
* Feature Limits,
* Active toggle,
* Save Plan,
* Preview,
* Coupon row,
* Coupon Create/Edit,
* Applicable Plans,
* Dates,
* Usage Limit,
* Save Coupon,
* Trial Campaign row,
* Grant Trial,
* Revoke Trial.

No:

`href="#"`.

No empty click handlers.

---

# 285. SCREEN 1 FINAL CHECKLIST — SUBSCRIPTIONS

* [ ] Subscriptions List
* [ ] Search User
* [ ] Status filter
* [ ] Plan filter
* [ ] Role filter
* [ ] User column
* [ ] Plan column
* [ ] Status column
* [ ] Renewal column
* [ ] Active state
* [ ] Trial days-left state
* [ ] Cancelled ended date
* [ ] Expired state
* [ ] pagination
* [ ] shimmer rows
* [ ] exact empty state
* [ ] Clear Filters
* [ ] inline Error
* [ ] Retry
* [ ] mobile cards

---

# 286. SCREEN 2 FINAL CHECKLIST — SUBSCRIPTION DETAIL

* [ ] User identity
* [ ] current Plan
* [ ] active status
* [ ] since date
* [ ] renewal date
* [ ] safe Payment Method
* [ ] Listing usage
* [ ] Unlimited display
* [ ] Featured Slot usage
* [ ] Plan History
* [ ] Upgrade event
* [ ] Payment reference masked
* [ ] Renewal event
* [ ] Trial Campaign event
* [ ] +7 days
* [ ] +14 days
* [ ] +30 days
* [ ] reason
* [ ] confirmation
* [ ] Extend Subscription
* [ ] event log
* [ ] Billing Audit
* [ ] idempotency

---

# 287. SCREEN 3 FINAL CHECKLIST — PAYMENTS LIST

* [ ] Search User
* [ ] Search Payment ID
* [ ] Status filter
* [ ] Method filter
* [ ] Date filter
* [ ] User
* [ ] Amount
* [ ] Method
* [ ] Gateway Status
* [ ] Date
* [ ] Captured
* [ ] Failed
* [ ] Pending
* [ ] Refunded
* [ ] exact status mapping
* [ ] pagination
* [ ] mobile cards

---

# 288. SCREEN 4 FINAL CHECKLIST — PAYMENT DETAIL

* [ ] amount
* [ ] user
* [ ] timestamp
* [ ] IST display
* [ ] method
* [ ] Gateway Status
* [ ] masked Payment ID
* [ ] masked Order ID
* [ ] masked UPI reference
* [ ] Invoice link
* [ ] safe projection
* [ ] no raw JSON
* [ ] no secrets
* [ ] Reconcile With Gateway
* [ ] server-only credentials
* [ ] reconciliation result
* [ ] audit

---

# 289. SCREEN 5 FINAL CHECKLIST — WEBHOOKS

* [ ] Webhook Event list
* [ ] Event column
* [ ] Received
* [ ] Processing
* [ ] Processed
* [ ] Failed ×N
* [ ] Queued
* [ ] Retry
* [ ] retry permission
* [ ] attempt count
* [ ] safe event detail
* [ ] masked entity ID
* [ ] amount
* [ ] masked Payment ID
* [ ] Signature Verified state
* [ ] secrets redacted
* [ ] stable event idempotency
* [ ] no duplicate activation
* [ ] no duplicate Invoice
* [ ] pagination

---

# 290. SCREEN 6 FINAL CHECKLIST — REFUND QUEUE

* [ ] User
* [ ] Amount
* [ ] Reason
* [ ] Date
* [ ] structured reason labels
* [ ] Pending queue
* [ ] pagination
* [ ] mobile cards
* [ ] loading
* [ ] empty
* [ ] error

---

# 291. SCREEN 7 FINAL CHECKLIST — REFUND DETAIL

* [ ] Refund display ID
* [ ] User
* [ ] Amount
* [ ] Invoice context
* [ ] purchased item
* [ ] paid date
* [ ] Pending status
* [ ] User reason detail
* [ ] Full Refund
* [ ] Partial Refund
* [ ] amount validation
* [ ] remaining refundable balance
* [ ] Decision Reason required
* [ ] Approve Refund
* [ ] confirmation dialog
* [ ] Reject
* [ ] gateway process only after confirmation
* [ ] Processing state
* [ ] provider confirmation
* [ ] failure handling
* [ ] user Notification
* [ ] audit
* [ ] idempotency

---

# 292. SCREEN 8 FINAL CHECKLIST — CREDIT NOTES

* [ ] Issue Credit Note action
* [ ] Invoice selection
* [ ] amount
* [ ] tax reversal
* [ ] reason
* [ ] confirmation
* [ ] sequential Credit Note number
* [ ] Note Number column
* [ ] User
* [ ] Amount
* [ ] Date
* [ ] issued list
* [ ] Invoice relationship
* [ ] Refund relationship where applicable
* [ ] immutable issued state
* [ ] audit

---

# 293. SCREEN 9 FINAL CHECKLIST — MANUAL ACTIVATION

* [ ] bypass warning
* [ ] approved-exception copy
* [ ] Plan selector
* [ ] Basic Broker reference state
* [ ] Premium Broker reference state
* [ ] role validation
* [ ] 30-day duration
* [ ] 90-day duration
* [ ] reason
* [ ] audit notice
* [ ] confirmation
* [ ] Activate Manually
* [ ] `admin_grant` source
* [ ] Staff actor
* [ ] no fake Payment
* [ ] no fake Invoice
* [ ] user Billing shows Activated by Support
* [ ] expiry lifecycle
* [ ] duplicate protection

---

# 294. SCREEN 10 FINAL CHECKLIST — ADMIN INVOICES

* [ ] all-user Invoice list
* [ ] date range
* [ ] Status filter
* [ ] GST Only
* [ ] Export CSV
* [ ] Invoice Number
* [ ] User
* [ ] Amount
* [ ] Status
* [ ] Paid
* [ ] Pending
* [ ] pagination
* [ ] mobile cards
* [ ] filtered export
* [ ] export permission
* [ ] export audit
* [ ] CSV escaping

---

# 295. SCREEN 11 FINAL CHECKLIST — INVOICE CORRECTION

* [ ] Invoice identity
* [ ] v2 Draft
* [ ] v1 Original section
* [ ] corrected value section
* [ ] GSTIN original
* [ ] GSTIN corrected
* [ ] both versions retained
* [ ] correction reason
* [ ] legitimate fields only
* [ ] automatic tax recomputation
* [ ] arithmetic consistency
* [ ] original immutable
* [ ] Save Corrected Version
* [ ] Staff actor
* [ ] audit
* [ ] no Payment history rewrite

---

# 296. SCREEN 12 FINAL CHECKLIST — PLANS LIST

* [ ] Plan column
* [ ] Role
* [ ] Price
* [ ] Status
* [ ] Broker Basic
* [ ] Broker Premium
* [ ] Archived historical Plan
* [ ] Active status
* [ ] Archived status
* [ ] no destructive deletion
* [ ] historical relationship preserved
* [ ] mobile cards

---

# 297. SCREEN 13 FINAL CHECKLIST — PLAN EDITOR

* [ ] Plan Name
* [ ] Role
* [ ] Broker
* [ ] Owner
* [ ] Builder
* [ ] Price per cycle
* [ ] Monthly
* [ ] Quarterly
* [ ] Yearly
* [ ] Listings limit
* [ ] Featured Slots/month
* [ ] Ad Credits
* [ ] Team Seats
* [ ] Active/public control
* [ ] Save Plan
* [ ] validation
* [ ] stable Plan Code
* [ ] price-history safety
* [ ] limit-effective policy
* [ ] Public Pricing Preview
* [ ] Most Popular badge state
* [ ] real Batch 10 Pricing Card reuse
* [ ] preview action non-functional as Checkout
* [ ] audit

---

# 298. SCREEN 14 FINAL CHECKLIST — COUPON LIST

* [ ] Code
* [ ] Discount
* [ ] Usage
* [ ] Expiry
* [ ] Status
* [ ] Percentage Coupon
* [ ] Flat Coupon
* [ ] real successful usage
* [ ] Active
* [ ] Expired
* [ ] pagination
* [ ] mobile cards

---

# 299. SCREEN 15 FINAL CHECKLIST — COUPON EDITOR

* [ ] Code
* [ ] uppercase normalization
* [ ] uniqueness
* [ ] Discount
* [ ] Percentage
* [ ] Fixed Amount
* [ ] Applicable Plans
* [ ] Basic Broker
* [ ] Premium Broker
* [ ] Owner Plan group
* [ ] Builder Plan group
* [ ] multi-Plan relationship
* [ ] Valid From
* [ ] Valid To
* [ ] date validation
* [ ] Usage Limit
* [ ] server validation
* [ ] atomic Redemption
* [ ] historical Checkout snapshot preserved
* [ ] Save Coupon
* [ ] audit

---

# 300. SCREEN 16 FINAL CHECKLIST — TRIAL CAMPAIGNS

* [ ] Trial Campaign list
* [ ] Campaign
* [ ] Role
* [ ] Duration
* [ ] Active Users
* [ ] Monsoon Broker Trial fixture
* [ ] Broker
* [ ] 14 days
* [ ] real active-user count
* [ ] Owner Onboarding fixture
* [ ] Owner
* [ ] 7 days
* [ ] real active-user count
* [ ] Campaign data model
* [ ] Trial-to-Campaign relation
* [ ] pagination/mobile behavior

---

# 301. SCREEN 17 FINAL CHECKLIST — TRIAL GRANT/REVOKE

* [ ] Campaign selection
* [ ] User selection
* [ ] role match
* [ ] Trial eligibility
* [ ] paid Subscription conflict
* [ ] Grant Trial
* [ ] Staff actor
* [ ] Trial start
* [ ] Trial end
* [ ] Subscription sync
* [ ] Notification
* [ ] audit
* [ ] Revoke Trial
* [ ] confirmation
* [ ] user name
* [ ] feature-stop explanation
* [ ] Free Plan fallback
* [ ] reason
* [ ] immediate entitlement stop
* [ ] Trial Revoked status
* [ ] Notification
* [ ] audit
* [ ] duplicate protection
* [ ] expiry scheduler

---

# 302. FULL CONNECTED BATCH 12 REGRESSION FLOW

Execute the following complete real test:

Login as Billing Manager
→ open Subscriptions
→ search Kunal Bhatt fixture
→ filter Active
→ filter Premium Plan
→ filter Broker Role
→ open Subscription Detail
→ verify safe Payment method
→ verify Usage
→ verify Plan History
→ manually extend +7 days
→ confirm
→ refresh
→ verify period end exactly +7 days once
→ inspect Subscription Event
→ inspect Audit
→ open Payments
→ filter Captured
→ filter UPI
→ open Payment Detail
→ verify masked IDs
→ verify raw payload absent from Browser payload
→ Reconcile With Gateway in Test environment
→ verify result
→ open Webhook Events
→ inspect Processed event
→ inspect failed fixture
→ Retry failed event
→ verify attempt count increments
→ retry same event again
→ verify no duplicate Payment/Subscription/Invoice
→ open Refund Queue
→ open REF-114 fixture
→ select Partial Refund
→ attempt amount above refundable balance
→ verify rejected
→ select valid amount
→ add Decision Reason
→ Approve
→ verify confirmation dialog
→ confirm gateway Test Refund
→ verify Processing then Processed/Refunded after provider confirmation
→ verify user Refund status
→ open Credit Notes
→ issue Credit Note for eligible Invoice fixture
→ verify number and tax reversal
→ open Manual Activation
→ choose test user
→ choose Premium Broker fixture
→ choose 30 days
→ enter reason
→ confirm
→ verify Subscription source admin grant
→ verify no Payment row created
→ verify no Paid Invoice created
→ verify user Billing says Activated by Support
→ open Invoices
→ filter Date
→ filter Status
→ enable GST Only
→ Export CSV
→ verify exported rows equal filters
→ open Invoice Correction
→ create v2 GST correction fixture
→ verify v1 unchanged
→ verify totals recomputed
→ inspect Audit
→ open Plans
→ create/edit Test Plan
→ change limits
→ verify Public Pricing Preview exactly uses Batch 10 card
→ Save
→ verify public Pricing catalog reflects saved state only
→ archive Test Plan
→ verify historical Subscription references remain
→ open Coupons
→ create percentage Coupon for multiple Plans
→ verify Valid From prevents early use
→ verify Valid To expiry
→ simulate final usage-limit concurrency
→ verify no over-redemption
→ open Trial Campaigns
→ verify real active-user counts
→ Grant Trial to eligible test Owner
→ verify Trial and Subscription state
→ Revoke Trial with reason
→ verify immediate Free fallback
→ verify Notification
→ verify Audit
→ complete mobile Admin Billing regression
→ complete tablet regression
→ complete desktop regression.

Any broken financial connection means Batch 12 is incomplete.

---

# 303. GATEWAY WEBHOOK DUPLICATE TEST

Simulate duplicate delivery of one provider event.

Verify exactly:

* one Webhook identity,
* one Payment,
* one Subscription activation,
* one Invoice,
* one Coupon Redemption,
* one Add-on grant,
* one Refund processing effect.

---

# 304. WEBHOOK RETRY TEST

Use one failed retryable fixture event.

Retry once.

Verify:

* attempt count increments,
* processing result updates,
* no duplicate financial mutation.

Retry again after successful process.

Verify:

idempotent no duplicate effect.

---

# 305. MANUAL EXTEND DUPLICATE TEST

Rapidly submit Extend twice.

Expected:

only one authorised extension operation.

No double addition.

---

# 306. REFUND CONCURRENCY TEST

Create two Staff sessions attempting to approve the same Refund.

Expected:

only one gateway Refund initiation.

Second decision sees updated state/conflict.

---

# 307. CREDIT NOTE CONCURRENCY TEST

Attempt duplicate Issue action.

Expected:

no duplicate Note number,
no duplicate accounting reversal.

---

# 308. COUPON CONCURRENCY TEST

Set one remaining usage.

Run two concurrent successful Checkout attempts.

Expected:

only one final Coupon Redemption receives the final allowed usage.

---

# 309. TRIAL DUPLICATE TEST

Attempt Grant Trial twice.

Expected:

no duplicated active Trial period.

---

# 310. PERMISSION REGRESSION TEST

Test:

## Billing View Only

Can read allowed Billing screens.

Cannot:

* Extend,
* Reconcile,
* Retry,
* Approve Refund,
* Issue Credit Note,
* Manual Activate,
* Correct Invoice,
* Manage Plans,
* Manage Coupons,
* Manage Trials.

## Payment Manager

Can perform configured Payment/Webhook operations.

Cannot manage Plan catalog unless granted.

## Billing Manager

Can manage Billing actions according to permission set.

## Super Admin

Full access.

---

# 311. LIVE VERIFICATION STANDARD

After every implementation phase:

1. run Build,
2. run TypeScript check,
3. run Lint where configured,
4. start actual application,
5. login as Billing Manager fixture,
6. login as Payment Manager fixture,
7. login as Billing View-only fixture,
8. login as Super Admin,
9. test route permission,
10. test server action permission,
11. inspect real database writes,
12. inspect Audit records,
13. use gateway Test Mode only,
14. inspect Webhook rows,
15. inspect Payment rows,
16. inspect Subscription rows,
17. inspect Invoice rows,
18. inspect Refund rows,
19. inspect Credit Notes,
20. inspect Trial records,
21. refresh Browser,
22. verify persistence,
23. test mobile,
24. test tablet,
25. test desktop,
26. inspect Browser console,
27. inspect failed network requests,
28. inspect server logs for safe error handling.

Static review is not PASS.

---

# 312. FINANCIAL RECONCILIATION STANDARD

For captured payments:

Local Payment Order amount
= Provider Order amount
= Provider Payment amount
= Payment record amount.

For related Invoice:

Invoice total must reconcile with the trusted financial transaction according to tax and Credit Note/Refund relationships.

Any unexplained mismatch is a blocker.

---

# 313. AUDIT RECONCILIATION STANDARD

For every high-risk Staff action:

UI action
→ database mutation
→ financial lifecycle event where applicable
→ Audit record.

If mutation exists but no Audit:

FAIL.

---

# 314. MANUAL VISUAL VERIFICATION

Compare every screen side-by-side with the actual Batch 12 design source.

Check:

* graphite shell,
* section titles,
* filter layout,
* table widths,
* row density,
* badges,
* amount typography,
* masked IDs,
* status vocabulary,
* warning boxes,
* Refund action hierarchy,
* Invoice correction v1/v2 layout,
* Plan Preview card,
* Coupon controls,
* Trial revoke confirmation.

`Almost the same` is not PASS.

---

# 315. COMPLETION BLOCKERS

Batch 12 must not be marked complete while any of these remain:

* Admin Billing remains one combined Overview page,
* Subscription List missing,
* Subscription Detail missing,
* Manual Extend missing,
* Manual Extend has no audit,
* Subscription List filters local-only,
* Payment Gateway Status vocabulary inconsistent,
* Payment Detail exposes raw JSON,
* Payment Detail exposes full sensitive provider IDs,
* Reconcile With Gateway dead,
* Webhook Event Log missing,
* Webhook Retry missing,
* Retry duplicates Payment,
* Retry duplicates Subscription activation,
* Retry duplicates Invoice,
* Webhook failure count fake,
* timestamp-based Webhook event identity causes duplicate processing,
* `payment.authorized` prematurely activates captured Subscription where final capture required,
* Refund Queue missing,
* Refund Approve immediately marks Refunded before provider result,
* Refund Decision Reason optional,
* Partial Refund validation missing,
* duplicate Refund initiation possible,
* Credit Note creation missing,
* Credit Note number generated using count + 1,
* tax reversal ignored,
* Manual Activation creates fake Payment,
* Manual Activation creates fake Paid Invoice,
* Manual Activation does not show Activated by Support to user,
* Admin Invoice List missing,
* filtered CSV export missing,
* export ignores active filters,
* Invoice Correction updates original Invoice in place,
* v1 original not retained,
* totals typed manually instead of recomputed,
* Plan List read-only only,
* Plan Editor missing,
* Plan Preview does not reuse Batch 10 Pricing Card,
* Plan history rewritten after price change,
* Coupon Admin missing,
* Coupon still limited to one Plan while UI permits multiple applicable Plans,
* Coupon Valid From missing,
* Coupon Redemption race possible,
* Trial Campaign model missing,
* Trial active-user count fake,
* Trial Grant missing,
* Trial Revoke reason optional,
* revoked Trial does not revert user correctly,
* Trial expiry scheduler missing,
* permissions frontend-only,
* manual actions without audit,
* dead button,
* `href="#"`,
* table not transformed for mobile,
* masked IDs overflow,
* status badge inconsistent,
* console errors,
* unsafe raw provider errors exposed,
* no gateway Test Mode verification,
* no financial reconciliation test.

---

# 316. FINAL ACCEPTANCE STATEMENT

**Design Batch 12 — Admin Billing & Payments is complete only when all 17 Batch 12 screen groups are implemented according to the exact Batch 12 source design and every financial action is backed by trusted data, correct permissions, idempotent processing and immutable audit history.**

Completion requires:

* exact Subscriptions List,
* Search User,
* Status Filter,
* Plan Filter,
* Role Filter,
* Active Subscription state,
* Trial days-left state,
* Cancelled state,
* Expired state,
* shimmer loading,
* exact empty state,
* Retry error state,
* Subscription Detail,
* real usage,
* real Plan History,
* Manual Extend,
* +7,
* +14,
* +30 days,
* audited extension,
* Payments List,
* consistent Captured/Failed/Pending/Refunded Gateway grammar,
* Payment search,
* Method Filter,
* Date Filter,
* safe Payment Detail,
* masked Payment ID,
* masked Order ID,
* masked UPI reference,
* Invoice link,
* no raw provider JSON,
* Reconcile With Gateway,
* Webhook Event Log,
* Processed state,
* Failed attempt count,
* Queued state,
* idempotent Retry,
* safe Webhook Summary,
* signature verification state,
* secrets redacted,
* Refund Queue,
* Refund Detail,
* Full Refund,
* Partial Refund,
* mandatory Decision Reason,
* Approve confirmation,
* real gateway Refund processing,
* Reject workflow,
* Credit Note creation,
* Credit Note list,
* sequential Note numbering,
* tax reversal,
* Manual Activation,
* bypass warning,
* Plan selection,
* Duration selection,
* reason,
* confirmation,
* honest Admin Grant Subscription,
* no fake Payment,
* no fake Invoice,
* Admin Invoice List,
* Date filter,
* Status filter,
* GST Only filter,
* filtered CSV export,
* Versioned Invoice Correction,
* v1 Original retention,
* v2 Draft,
* automatic total recalculation,
* Plans List,
* Active Plans,
* Archived historical Plans,
* Plan Create/Edit,
* Role,
* Price,
* Billing Cycle,
* Listings Limit,
* Featured Slots Limit,
* Ad Credits,
* Team Seats,
* Active/Public state,
* exact Batch 10 Public Pricing Preview,
* Coupon List,
* Coupon Usage,
* Expiry,
* Active/Expired state,
* Coupon Create/Edit,
* Percentage and Flat discount,
* multi-Plan applicability,
* Valid From,
* Valid To,
* Usage Limit,
* concurrency-safe Redemption,
* Trial Campaign List,
* Campaign Role,
* Duration,
* real Active User count,
* Trial Grant,
* eligibility validation,
* Trial Revoke,
* mandatory reason,
* immediate entitlement transition,
* correct Free Plan fallback,
* User Notification,
* complete financial audit,
* no fake data,
* no unsafe override,
* no duplicate payment effect,
* no duplicate refund,
* no duplicate invoice,
* no duplicate credit note,
* no duplicate Trial grant,
* complete responsive behavior,
* complete permission regression,
* complete gateway Test Mode verification,
* complete live financial reconciliation.

Required implementation sequence:

**Screen 1 Subscriptions List → verify → Screen 2 Subscription Detail/Extend → verify → Screen 3 Payments → verify → Screen 4 Payment Detail → verify → Screen 5 Webhooks → verify → Screen 6 Refund Queue → verify → Screen 7 Refund Detail → verify → Screen 8 Credit Notes → verify → Screen 9 Manual Activation → verify → Screen 10 Invoice List → verify → Screen 11 Invoice Correction → verify → Screen 12 Plans → verify → Screen 13 Plan Editor → verify → Screen 14 Coupons → verify → Screen 15 Coupon Editor → verify → Screen 16 Trial Campaigns → verify → Screen 17 Grant/Revoke Trial → verify → full connected Admin Billing regression test.**

No financial screen passes merely because it renders.

**Exact Design + Financial Integrity + Trusted Gateway State + Reconciliation Safety + Refund Integrity + Invoice Immutability + Plan Integrity + Coupon Concurrency Safety + Trial Integrity + Permission Enforcement + Auditability + Responsive Behavior + Live Test-Mode Verification must all pass.**
