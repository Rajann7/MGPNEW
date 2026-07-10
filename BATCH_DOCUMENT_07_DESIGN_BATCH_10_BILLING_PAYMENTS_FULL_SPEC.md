# BATCH_DOCUMENT_07_DESIGN_BATCH_10_BILLING_PAYMENTS_FULL_SPEC.md

# My Gujarat Property

## Batch Document 07

## Design Batch 10 — Complete Billing, Subscription, Checkout, Payment Verification, Invoices, Refunds, GST and Manual Activation

---

# 1. DOCUMENT PURPOSE

This document is the complete design, implementation, backend, database, payment-security, subscription-lifecycle, tax, refund, invoice, responsive behavior and live-verification specification for:

**My Gujarat Property · Design Batch 10 — Billing & Payments**

Batch 10 defines the complete user-facing billing and payment experience across:

* Owner,
* Broker,
* Builder,
* Guest pricing visitors,
* authenticated subscribers,
* trial users,
* paid users,
* users upgrading plans,
* users downgrading plans,
* users requesting refunds,
* B2B users,
* B2C users,
* support-activated subscription users.

Batch 10 contains exactly these 15 screen groups:

1. Public Pricing
2. Subscription Overview
3. Trial Banner
4. Change Plan / Upgrade with Prorated Preview
5. Checkout / Order Summary
6. Razorpay Checkout
7. Payment Verification / Processing
8. Verified Payment Success
9. Payment Failure
10. Duplicate / Pending Payment Detection
11. Invoice List
12. Printable Invoice Detail
13. Refund Request and Refund Status Tracker
14. GST / Billing Details
15. Manual Subscription Activation State

Every Batch 10 screen must be implemented.

No screen may be:

* skipped,
* replaced with generic Billing cards,
* represented by placeholder text,
* represented by a fake Success state,
* represented by a dead button,
* represented by an unverified payment callback,
* represented by sample invoice data in production.

The exact Batch 10 design source must be read directly from:

`/newdesign/`

Use the actual Batch 10 HTML source file.

Do not implement from:

* old Billing UI,
* current direct Pricing-to-Razorpay flow,
* memory,
* generic subscription templates,
* generic Razorpay tutorials,
* assumptions.

---

# 2. ABSOLUTE CURRENT BILLING UI REPLACEMENT RULE

Where the current Billing/Pricing/Payment UI conflicts with Batch 10, completely remove and replace the conflicting UI.

Do not keep:

* old Pricing card layout,
* current direct card-to-Razorpay flow,
* old generic Billing dashboard,
* old invoice rows,
* old payment result banners,
* generic payment success toast,
* current incomplete refund form,
* legacy GST form.

The final user journey must follow the Batch 10 architecture.

Secure backend components may be preserved only where they satisfy the final Batch 10 behavior.

---

# 3. CRITICAL PAYMENT AUTHORITY RULE

The most important Batch 10 rule is:

**A user interface event can never activate a paid plan.**

Not:

* button click,
* Checkout open,
* Razorpay modal success handler,
* frontend callback,
* redirect query parameter,
* client signature response,
* browser local state.

The paid Subscription becomes Active only after the trusted payment flow verifies the payment according to the configured gateway's final payment semantics.

The user-facing Success screen is reachable only after trusted verification.

---

# 4. LINEAR PAYMENT FLOW LOCK

The source design defines a strict linear sequence:

**Checkout → Razorpay → Verifying → Success**

or:

**Checkout → Razorpay → Verifying / Failure → Failed**

The UI must never jump directly:

Pricing
→ Razorpay
→ Dashboard with Active Plan.

The required flow is:

Plan Selection
→ Auth if required
→ Checkout Summary
→ Confirm Pay
→ Razorpay SDK
→ Verification Screen
→ server checks trusted payment state
→ Success or Failure/Pending.

---

# 5. BATCH 10 SCREEN INVENTORY

The complete implementation scope is:

## Screen 1

Public Pricing Page

Includes:

* Role tabs,
* desktop plans,
* feature comparison,
* FAQ,
* mobile stacked plans,
* Guest auth-return behavior.

## Screen 2

Subscription Overview.

## Screen 3

Trial Countdown Banner.

## Screen 4

Change Plan / Upgrade with Prorated Preview.

## Screen 5

Checkout Summary.

## Screen 6

Actual Razorpay SDK Checkout.

## Screen 7

Verifying Payment state.

## Screen 8

Verified Success state.

## Screen 9

Honest Failure state.

## Screen 10

Duplicate / Existing Pending Payment state.

## Screen 11

Invoice List.

## Screen 12

Printable Invoice Detail.

## Screen 13

Refund Request and Status Tracking.

## Screen 14

GST and Billing Details.

## Screen 15

Manual Support Activation.

Nothing may be omitted.

---

# 6. IMPLEMENTATION ORDER

Implement Batch 10 in this exact order:

1. Screen 1 — Public Pricing
2. Screens 2–3 — Subscription Overview and Trial Banner
3. Screen 4 — Change Plan / Proration
4. Screen 5 — Checkout
5. Screen 6 — Razorpay SDK integration
6. Screen 7 — Verification state
7. Screen 8 — Verified Success
8. Screen 9 — Honest Failure
9. Screen 10 — Pending/Duplicate Payment
10. Screen 11 — Invoice List
11. Screen 12 — Invoice Detail
12. Screen 13 — Refunds
13. Screen 14 — GST/Billing Details
14. Screen 15 — Manual Activation
15. Full connected financial regression verification.

Do not implement the entire payment system as one unverified change.

---

# 7. DESIGN FOUNDATION

Batch 10 uses the approved Design System.

Use:

Primary:

`#0F6B5C`

Primary Hover:

`#0C5648`

Primary Soft:

`#E7F2EF`

Success:

`#16A34A`

Pending:

`#D97706`

Destructive:

`#DC2626`

Info:

`#2563EB`

Neutral:

Zinc palette.

Typography:

Inter.

Icons:

Lucide outline.

Do not:

* recolor payment UI independently,
* use random finance-themed blue,
* use fake Razorpay-looking UI outside the actual provider flow,
* mix icon families.

---

# 8. USER ROLE SCOPE

Batch 10 Billing applies to:

* Owner,
* Broker,
* Builder.

The shared Billing shell structure is identical.

Only actual:

* Plans,
* prices,
* feature limits,
* usage meters,
* Add-ons

change by role.

Do not create three disconnected Billing systems.

Use one architecture driven by role-aware plan data.

---

# 9. SCREEN 1 — PUBLIC PRICING PAGE

Reference heading:

`Simple pricing for every role`

Supporting text:

`Prices in ₹, GST extra. Cancel anytime.`

Role tabs:

* Owner
* Broker
* Builder

The source reference shows:

Broker tab active.

In production:

active tab must follow:

* current logged-in role where appropriate,
* user's explicit tab choice,
* safe default.

---

# 10. ROLE TAB BEHAVIOR

Switching tabs changes:

* Plan cards,
* feature comparison values,
* appropriate role pricing.

It must not:

* reload unrelated page state unnecessarily,
* mix Plans from different roles,
* allow authenticated Owner to purchase Broker Plan directly unless approved Role Change flow allows it.

---

# 11. PUBLIC PLAN DATA AUTHORITY

The Plan database/catalog is the data authority.

Do not hard-code all production plan data inside React components.

The Batch source reference values remain the visual fixture.

Production card values come from:

* active Plan record,
* public Plan record,
* role scope,
* features,
* limits,
* price.

---

# 12. BROKER FREE PLAN REFERENCE

Reference:

`Free`

Price:

`₹0`

Description:

`For trying the platform`

Features:

* 2 active listings
* Basic lead inbox
* No featured slots

Action:

`Start free`

---

# 13. BASIC PLAN REFERENCE

Badge:

`MOST POPULAR`

Plan:

`Basic`

Price:

`₹999`

Cycle:

`/month`

Description:

`For active brokers`

Features:

* 25 active listings
* Lead management + notes
* 2 featured slots/month

Action:

`Choose Basic`

---

# 14. PREMIUM PLAN REFERENCE

Plan:

`Premium`

Price:

`₹2,499`

Cycle:

`/month`

Description:

`For agencies at scale`

Features:

* Unlimited listings
* Team seats up to 5
* 10 featured slots + analytics

Action:

`Choose Premium`

---

# 15. MOST POPULAR BADGE

The Most Popular badge must come from approved Plan presentation configuration or final Plan catalog.

Do not automatically mark:

* middle-priced Plan,
* second Plan

as Most Popular unless configured.

---

# 16. FEATURE COMPARISON TABLE

Reference columns:

* FEATURE
* FREE
* BASIC
* PREMIUM

Rows:

### Active listings

Free:

`2`

Basic:

`25`

Premium:

`Unlimited`

### Featured slots

Free:

`—`

Basic:

`2/mo`

Premium:

`10/mo`

### Team seats

Free:

`—`

Basic:

`—`

Premium:

`5`

---

# 17. COMPARISON DATA CONSISTENCY

Plan card feature values and comparison-table values must come from the same Plan catalog.

Do not create:

Card:

25 listings

Comparison:

20 listings.

One source of truth.

---

# 18. UNLIMITED VALUE

Represent Unlimited explicitly.

Do not convert it to:

`999999`.

Backend entitlement system should model Unlimited safely, for example:

* null with unlimited meaning,
* explicit unlimited flag,

according to final schema.

UI must display:

`Unlimited`.

---

# 19. FEATURE NOT AVAILABLE

Display:

`—`

for feature not included.

Do not display:

`0/mo`

if the source semantics are feature unavailable.

---

# 20. PUBLIC PRICING FAQ

Section:

`Frequently asked questions`

Reference questions:

### Can I change plans mid-cycle?

Answer:

`Yes — upgrades apply immediately with prorated billing; downgrades apply from the next cycle.`

### Is GST included?

Must have approved real answer consistent with Plan tax configuration.

### What happens to my listings if I downgrade?

Must have approved real answer consistent with actual downgrade enforcement.

---

# 21. FAQ FUNCTIONALITY

FAQ rows must:

* expand,
* collapse,
* support keyboard interaction,
* use approved product copy.

Do not show FAQ answers that contradict Billing behavior.

---

# 22. GST FAQ CONSISTENCY

The Pricing header says:

`GST extra`

Therefore Checkout and Invoice must consistently calculate tax according to Plan/tax configuration.

Do not say GST extra in Pricing but use a GST-inclusive amount without clear explanation.

---

# 23. DOWNGRADE FAQ CONSISTENCY

If downgrade reduces listing limits:

define actual behavior.

The system must not silently delete listings.

Possible approved behavior:

* downgrade effective next cycle,
* excess listings stay stored,
* public active count limited according to product policy,
* user prompted to choose active listings.

The FAQ must match actual code.

---

# 24. GUEST PLAN CTA

Source rule:

**Guest CTAs open Batch 2 Auth sheet and then return to Checkout.**

This is a strict redirect-intent requirement.

Required flow:

Guest chooses Premium
→ Batch 2 Auth opens
→ login/register
→ return to Checkout
→ same role
→ same Plan
→ same optional Add-ons/Coupon context if already selected.

---

# 25. GUEST REDIRECT INTENT

Do not return only to:

`/pricing`

after login.

Preserve selected purchase intent.

Recommended protected intent includes safe identifiers:

* selected Plan ID,
* selected role,
* approved Add-ons,
* Coupon code if appropriate.

Revalidate all server-side after Auth.

Never trust price from redirect query.

---

# 26. AUTH RETURN SECURITY

After login:

* reload Plan from database,
* verify Plan active,
* verify user's role,
* recalculate price,
* revalidate Coupon,
* recalculate tax.

Do not trust pre-auth client totals.

---

# 27. AUTHENTICATED WRONG-ROLE PLAN

If a logged-in Owner selects Broker Plan:

do not silently buy Broker Plan.

Use approved behavior:

* explain role mismatch,
* direct to Role Change if appropriate.

---

# 28. SCREEN 1 MOBILE PRICING

Reference heading:

`Pricing`

Tabs:

* Owner
* Broker
* Builder

Cards stack vertically.

Reference order:

### Basic

Badge:

`MOST POPULAR`

`₹999 /mo`

* 25 active listings
* 2 featured slots/month

Action:

`Choose Basic`

### Free

`₹0`

`2 active listings`

Action:

`Start free`

### Premium

`₹2,499 /mo`

`Unlimited listings · 5 seats`

Action:

`Choose Premium`

---

# 29. MOBILE COMPARISON TRANSFORMATION

The source uses stacked comparison cards on mobile.

Do not force the desktop comparison table into a tiny horizontal page-wide overflow unless the source explicitly shows it.

---

# 30. SCREEN 1 LOADING STATE

Plan catalog load must have:

* skeleton,
* honest Setup Required if Billing schema/provider missing.

Do not show sample Plan amounts while loading.

---

# 31. SCREEN 1 CURRENT REPOSITORY RECONCILIATION

The current Pricing implementation directly creates a payment order and opens Razorpay when a Plan card is selected.

This must be changed.

Final behavior:

Pricing CTA
→ Auth-return if required
→ Batch 10 Checkout Summary
→ Pay button
→ Razorpay.

Do not create a Razorpay order immediately merely because the user clicked the initial Plan card.

---

# 32. CURRENT GUEST INTENT RECONCILIATION

Current behavior returning Guest to generic Pricing loses exact selected Checkout intent.

Batch 10 requires selected Plan continuation.

Repair redirect-intent flow.

---

# 33. SCREEN 2 — SUBSCRIPTION OVERVIEW

The Billing shell structure is identical across:

* Owner,
* Broker,
* Builder.

Reference Broker Plan:

`Basic plan`

Status:

`Active`

Price:

`₹999/month`

Renewal:

`Renews 28 July 2026`

Payment method summary:

`Card ending 4482`

Actions:

* Upgrade Plan
* Cancel

---

# 34. CURRENT PLAN DATA

Use actual:

* Plan name,
* Subscription status,
* billing cycle,
* price,
* renewal/end date,
* payment method summary.

Do not hard-code Basic.

---

# 35. PAYMENT METHOD SUMMARY

Store/display only safe payment method metadata.

Example:

`Card ending 4482`

Do not store or expose:

* full card number,
* CVV,
* sensitive payment credentials.

If only payment method type is known:

display honest method summary.

Do not invent last four digits.

---

# 36. SUBSCRIPTION STATUS DISPLAY

Possible internal states may include:

* Trialing
* Active
* Grace
* Past Due
* Cancelled at Period End
* Expired
* Admin Granted

Map them to honest user-facing labels.

Do not display Active when payment failed.

---

# 37. RENEWAL DATE

Renewal date comes from actual Subscription period.

Do not compute:

today + 30 days

every render.

Use stored period anchor/end.

---

# 38. USAGE METERS

Reference:

### Active listings

`18 / 25`

### Featured slots

`2 / 2 used`

### Ad credits

`₹340 / ₹500`

### Team seats

`1 / 1`

All must use actual entitlement semantics.

---

# 39. DIFFERENT USAGE SEMANTICS

Do not use one generic usage counter model for every meter.

These have different meanings:

### Active Listings

Current active entity count.

### Featured Slots

Current/monthly entitlement usage.

### Ad Credits

Monetary/credit balance or period allowance.

### Team Seats

Current active membership count.

Each must use the correct source.

---

# 40. ACTIVE LISTING METER

Do not use:

daily increment counter

for current Active Listing count.

Count actual active eligible listings according to role.

---

# 41. FEATURED SLOT PERIOD

If Plan says:

`2 featured slots/month`

usage must reset according to Billing period/month policy.

Do not reset daily.

---

# 42. AD CREDIT METER

Reference:

`₹340 / ₹500`

Clarify whether this means:

* remaining out of allowance,

or

* used out of allowance.

The UI wording and progress direction must be consistent.

Use actual credit ledger/allowance.

---

# 43. TEAM SEAT METER

Count actual active Team memberships.

Pending Invites may or may not consume seats according to approved product rules.

Implement consistently.

---

# 44. SCREEN 3 — TRIAL BANNER

Reference:

`Your free trial ends in 4 days.`

Action:

`Upgrade now`

Remaining days must be real.

---

# 45. TRIAL COUNTDOWN

Calculate from actual Trial end timestamp.

Handle:

* 4 days,
* 1 day,
* today,
* expired.

Do not hard-code four.

---

# 46. TRIAL SOURCE OF TRUTH

Trial and Subscription state must remain coherent.

Do not show:

Trial Active

while Subscription is already successfully paid and Active.

---

# 47. TRIAL EXPIRY

At Trial expiry:

* Billing gate changes according to product policy,
* user sees honest expired state,
* no automatic paid activation without a verified payment mandate/process.

---

# 48. UPGRADE NOW

Opens the Plan Change/Upgrade flow.

Preserve current Plan and remaining period.

---

# 49. CANCEL SUBSCRIPTION

Reference note:

Cancel opens the standard destructive confirmation dialog.

Required confirmation should explain:

* Subscription continues until period end,
* renewal stops,
* effective date,
* impact on limits after downgrade/free transition.

Do not immediately delete Subscription or user content.

---

# 50. CANCEL IDEMPOTENCY

Repeated Cancel request must not create inconsistent duplicate cancellation events.

---

# 51. CANCEL AFTER PERIOD END

The system needs scheduled lifecycle handling to change Subscription status at period end.

Do not set:

`cancel_at_period_end`

without a reliable expiry lifecycle processor.

---

# 52. SCREEN 4 — CHANGE PLAN

Reference heading:

`Change plan`

Current Plan:

`Basic (current)`

Price:

`₹999/mo`

Upgrade target:

`Premium`

Features:

`Unlimited listings · 5 seats · 10 featured`

Price:

`₹2,499/mo`

---

# 53. PLAN CHANGE ELIGIBILITY

Server validates:

* current Subscription,
* target Plan,
* same role,
* active/public availability,
* legal transition.

Do not trust target Plan only from client.

---

# 54. PRORATED PREVIEW

Reference:

`Prorated: you'll pay ₹1,250 today for the remaining 15 days; full ₹2,499 from 28 July.`

This preview must be real.

Do not hard-code:

* ₹1,250,
* 15 days,
* 28 July.

---

# 55. PRORATION CALCULATION

Proration must use a clearly defined algorithm.

At minimum:

* current Plan,
* target Plan,
* remaining period,
* billing anchor,
* unused current Plan value where policy applies,
* target Plan incremental value,
* currency-safe rounding.

---

# 56. PRORATION SERVER AUTHORITY

The server calculates Proration.

The client may render preview but cannot submit a custom amount.

---

# 57. PRORATION SNAPSHOT

When Checkout Order is created:

store the calculated Proration snapshot.

Do not recalculate historical Invoice later using current dates.

---

# 58. UPGRADE EFFECTIVE TIME

Source FAQ says:

Upgrade applies immediately with prorated billing.

Therefore:

upgrade only becomes effective after verified payment.

Not when the user opens Checkout.

---

# 59. DOWNGRADE EFFECTIVE TIME

Source FAQ says:

Downgrades apply from next cycle.

Implement:

* scheduled Plan change,
* effective date,
* user-visible pending change.

Do not immediately strip entitlements if the user has paid for current period.

---

# 60. CONTINUE TO PAYMENT

Action:

`Continue to Payment`

must open Screen 5 Checkout Summary.

Do not open Razorpay directly.

---

# 61. SCREEN 4 CURRENT REPOSITORY GAP

Current payment-order creation uses full Plan price.

Batch 10 requires:

* real proration,
* Plan change preview,
* period anchor behavior,
* upgrade/downgrade distinction.

Implement before Batch 10 PASS.

---

# 62. SCREEN 5 — CHECKOUT / ORDER SUMMARY

Reference heading:

`Order summary`

Reference line item:

`Premium plan · prorated 15 days`

Amount:

`₹1,250.00`

Add-on:

`Featured slot add-on × 2`

Amount:

`₹400.00`

Coupon:

`−₹165`

Action:

`Remove`

---

# 63. CHECKOUT LINE ITEM MODEL

Checkout must use structured Order Line Items.

Do not store only one:

`amount_payable`

value and reconstruct fake line items later.

Each Order should snapshot:

* description,
* item type,
* quantity,
* unit amount,
* discount allocation if applicable,
* taxable amount,
* tax rate,
* line total.

---

# 64. PRORATED PLAN LINE ITEM

The Invoice and Checkout must preserve the exact prorated Plan period.

Reference:

`Premium plan · prorated 15 days`

Invoice reference later:

`Premium plan — prorated 13 Jul – 27 Jul`

Store actual service period.

---

# 65. ADD-ON LINE ITEM

Reference:

`Featured slot add-on × 2`

Use real Add-on catalog.

Validate:

* active Add-on,
* role eligibility,
* quantity limits,
* price from server.

---

# 66. ADD-ON ACTIVATION

After verified payment:

* grant actual Add-on benefit,
* create entitlement/credit ledger,
* preserve quantity.

Do not charge Add-on without granting it.

---

# 67. ADD-ON IDEMPOTENCY

Webhook retry must not grant Add-on quantity twice.

---

# 68. COUPON

Reference discount:

`−₹165`

Action:

`Remove`

The discount must come from server-side validated Coupon.

---

# 69. INVALID COUPON STATE

Exact source example:

`Code EXPIRED20 is no longer valid`

The message appears inline.

The Coupon field border becomes red.

Implement exact error placement.

---

# 70. COUPON VALIDATION

Validate server-side:

* active,
* expiry,
* role,
* Plan,
* minimum amount,
* overall usage limit,
* per-user limit.

---

# 71. COUPON CONCURRENCY

Do not rely only on:

read `used_count`
→ compare
→ later pay.

Use a safe Coupon reservation or verified-payment redemption model.

Prevent usage-limit race conditions.

---

# 72. COUPON REDEMPTION TIMING

A Coupon should not permanently consume usage merely because a user opened Checkout and abandoned payment.

Use an approved model:

* temporary reservation with expiry,

or

* consume on verified payment.

Ensure overall Coupon usage remains concurrency-safe.

---

# 73. ORDER SUMMARY TAX REFERENCE

Reference:

Subtotal:

`₹1,485.00`

CGST 9%:

`₹133.65`

SGST 9%:

`₹133.65`

Total:

`₹1,752.30`

Action:

`Pay ₹1,752.30`

---

# 74. TAX CALCULATION

Use currency-safe arithmetic.

Do not calculate taxes using formatted text.

Store values in safe decimal/minor-unit form according to financial architecture.

---

# 75. CGST + SGST RULE

The reference Buyer GSTIN begins with Gujarat state code:

`24`

For valid same-state supply according to configured seller/buyer place of supply:

show:

* CGST
* SGST.

---

# 76. IGST RULE

For interstate supply where applicable:

use IGST.

Do not always show CGST+SGST merely because the platform is based in Gujarat.

Tax calculation must follow configured tax rules.

---

# 77. GSTIN DISPLAY

Reference:

`(GSTIN 24ABCDE1234F1Z5)`

Show actual validated GSTIN.

Do not invent.

---

# 78. PAY BUTTON

Reference:

`Pay ₹1,752.30`

Amount must match server-created Checkout amount.

---

# 79. PAY DUPLICATE-SUBMIT PROTECTION

Source rule:

`Button disables on first tap — duplicate-submit protected`

Required:

### Client

* immediate disabled,
* spinner.

### Server

* idempotent Checkout Order reuse or pending-order detection.

Client disable alone is insufficient.

---

# 80. CHECKOUT ORDER IDEMPOTENCY

A repeated Pay call for the same:

* user,
* target Plan change,
* same cart,
* short active pending window

must not create unlimited Payment Orders.

Use deterministic Checkout session/cart identity or a pending-order rule.

---

# 81. ORDER EXPIRY

Pending Checkout Orders must expire.

Do not leave every abandoned order in permanent Pending state.

---

# 82. SCREEN 6 — RAZORPAY SDK

The Batch source explicitly states:

The shown Razorpay frame is a representative placeholder.

The actual payment UI must be rendered by the Razorpay SDK.

Do not recreate a fake Razorpay payment form.

---

# 83. RAZORPAY REFERENCE FRAME

Reference:

`My Gujarat Property`

Amount:

`₹1,752.30`

Methods shown illustratively:

* UPI
* Card
* Netbanking

Action illustration:

`Verify & Pay`

Actual available methods are controlled by the gateway account/configuration.

---

# 84. RAZORPAY SDK RULE

Use the actual official SDK integration.

Do not collect raw:

* UPI PIN,
* CVV,
* Card number

inside MGP application fields.

---

# 85. PAYMENT ORDER AMOUNT

The Razorpay order amount must exactly match the trusted MGP Payment Order amount.

Server verifies:

* amount,
* currency,
* provider order ID,
* user/order relationship.

---

# 86. PAYMENT PROVIDER SETUP REQUIRED

If Razorpay is not configured:

do not open a fake Checkout.

Show honest:

`Payment Setup Required`

or approved temporary payment behavior.

Record provider configuration in the separate external setup document.

---

# 87. PROVIDER SCRIPT FAILURE

If Razorpay SDK fails to load:

show recoverable error.

Do not mark Payment Failed unless no actual provider transaction occurred.

Allow safe retry.

---

# 88. MODAL DISMISS

If user closes Razorpay:

mark attempt appropriately.

Do not show Payment Failed unless provider/Order state supports it.

The user may be allowed to resume/check status.

---

# 89. SCREEN 7 — VERIFYING PAYMENT

Reference heading:

`Verifying your payment…`

Reference copy:

`Confirming with your bank. This can take up to a minute — please don't close this window or press back.`

Source rule:

`All actions disabled — no duplicate submission possible`

---

# 90. VERIFICATION SCREEN ROUTE

After successful Razorpay client callback:

navigate to a dedicated Verification screen/state.

Do not immediately redirect to normal Dashboard and assume payment succeeded.

---

# 91. BACKGROUND LOCKED STATE

During verification:

* payment actions disabled,
* second payment cannot start,
* no Plan activation button,
* no misleading Success icon.

---

# 92. SAFE STATUS POLLING

The Verification screen may poll a secure owned status endpoint/action.

The result must be derived from trusted server records.

Possible states:

* pending,
* verified + activated,
* failed,
* expired,
* reconciliation review.

---

# 93. STATUS POLLING SECURITY

The user can check only their own Payment Order.

Do not expose payment status by arbitrary Order ID.

---

# 94. POLLING LIMIT

Use bounded backoff.

Do not hammer the database every 100ms.

---

# 95. VERIFICATION TIMEOUT UX

If trusted confirmation takes longer:

do not mark Failed automatically.

Offer honest state such as:

`Payment still pending`

and:

`Check Status`.

---

# 96. BROWSER REFRESH DURING VERIFICATION

Refresh must recover state from server.

Do not lose Payment Order because state existed only in React memory.

---

# 97. BROWSER BACK BEHAVIOR

Prevent accidental duplicate payment, but do not trap user in an inaccessible page.

Use safe warning/disabled actions according to design.

---

# 98. SCREEN 7 CURRENT FLOW RECONCILIATION

Current client callback behavior routes to Dashboard with a submitted flag.

Batch 10 requires the dedicated Verification state.

Repair flow.

---

# 99. SCREEN 8 — VERIFIED SUCCESS

Reference:

`Payment confirmed`

Amount:

`₹1,752.30 received`

Reference:

`Payment ID pay_NxK4…8Ql verified via gateway callback.`

Message:

`Premium plan is now active.`

Period:

`Active until 28 Jul 2026`

Actions:

* View Invoice
* Go to Dashboard

---

# 100. SUCCESS ENTRY CONDITION

The Success screen may render only when the server verifies:

* Payment record trusted,
* amount matched,
* currency matched,
* Payment state final/approved according to configured gateway semantics,
* Subscription activation completed.

---

# 101. PAYMENT ID MASKING

Display safe masked Payment reference.

Do not expose unnecessary full provider IDs publicly.

---

# 102. SUCCESS AMOUNT

Use actual verified Payment amount.

Not client-submitted total.

---

# 103. PLAN ACTIVATION CONFIRMATION

The Plan name/status comes from actual activated Subscription.

Do not display:

`Premium plan is now active`

if Subscription activation failed after Payment capture.

---

# 104. ACTIVATION FAILURE AFTER PAYMENT

This is a critical financial recovery state.

Possible situation:

* Payment captured,
* Subscription activation failed.

Do not show generic Payment Failed.

Do not ask user to Pay again.

Show honest:

Payment received, activation processing/support review.

Create retry/reconciliation workflow.

---

# 105. INVOICE AVAILABILITY

The source Success screen includes:

`View Invoice`

Therefore:

only show functional View Invoice when Invoice exists.

If payment is valid and Subscription active but Invoice generation is still recovering:

show honest Invoice Processing state rather than a dead button.

---

# 106. SUBSCRIPTION AND INVOICE TRANSACTION SAFETY

Current sequential behavior can create:

* Active Subscription,
* but Invoice generation failure.

Batch 10 requires safe transactional/recoverable orchestration.

Use:

* transaction/RPC where appropriate,

or

* durable activation state machine with retry.

Never lose the Invoice obligation.

---

# 107. SUCCESS REFRESH

Refreshing Success page must show the same trusted state.

Do not depend on one-time client memory.

---

# 108. SCREEN 9 — PAYMENT FAILED

Reference heading:

`Payment didn't go through`

Source bank-decline example:

`Your bank declined the transaction. Any amount deducted will be auto-refunded within 5–7 business days.`

State:

`No plan was activated. You're still on Basic.`

Actions:

* Contact Support
* Retry Payment

---

# 109. HONEST FAILURE REASON

Show bank-decline copy only when provider status actually indicates the appropriate failure/decline class.

Do not show the same reason for:

* network error,
* verification delay,
* reconciliation mismatch,
* user modal dismissal.

---

# 110. NO PLAN ACTIVATION

Failure screen must verify current Subscription remains unchanged.

Reference:

`You're still on Basic`

Use actual Plan.

---

# 111. RETRY PAYMENT

Retry must:

* check existing Payment Order state,
* avoid charging twice,
* create/resume valid Checkout according to state.

---

# 112. SUPPORT CONTEXT

Contact Support should include:

* Payment Order reference,
* current Payment status,
* safe user context.

Do not ask user to manually retype everything.

---

# 113. AMOUNT DEDUCTED BUT STATUS UNKNOWN

Do not instruct immediate retry when Payment may still be pending.

Use Screen 10/Check Status logic.

---

# 114. REFUND TIMELINE COPY

The source reference states:

5–7 business days for bank-decline auto-refund scenario.

The implementation and support content must remain aligned with actual gateway/bank settlement behavior.

---

# 115. SCREEN 10 — DUPLICATE PAYMENT DETECTED

Reference:

`It looks like you already have a pending payment for this plan (started 2 min ago).`

Action:

`Check Status`

---

# 116. PENDING PAYMENT DETECTION

Before creating a new Payment Order:

check for an existing relevant non-terminal order.

Match by safe business identity such as:

* Profile,
* role,
* Plan/cart,
* purpose,
* pending status,
* active time window.

---

# 117. PAYMENT ORDER STATES

Relevant non-terminal states may include:

* Created
* Checkout Started
* Payment Authorized/Pending Verification
* pending reconciliation.

Do not blindly create a new Order.

---

# 118. CHECK STATUS

Must open the existing Verification/Status flow.

Do not create another Order.

---

# 119. PENDING AGE

Reference:

`started 2 min ago`

Calculate real relative time.

---

# 120. STALE PENDING ORDER

If Order exceeded defined expiry:

mark Expired safely and allow new Checkout.

---

# 121. PAYMENT IDEMPOTENCY KEY

Do not generate a totally unrelated random idempotency key on every repeated identical Pay request without a higher-level pending-order guard.

Use a meaningful Checkout-session idempotency model.

---

# 122. WEBHOOK — TRUST BOUNDARY

The verified webhook is a trusted payment-status source.

Required:

* raw body signature verification,
* event type validation,
* payload validation,
* order lookup,
* amount comparison,
* currency comparison,
* Payment upsert/idempotency,
* activation orchestration.

---

# 123. AUTHORIZED VS CAPTURED PAYMENT

Batch 10 Success requires verified final payment.

Do not activate Subscription merely because an event is:

`payment.authorized`

unless the configured gateway/account capture model and final product policy explicitly treat that state as settled and trustworthy.

For standard captured-payment activation flow:

activate only on the correct captured/paid final state.

---

# 124. CURRENT WEBHOOK CRITICAL RECONCILIATION

The current webhook handler includes:

`payment.authorized`

among activation-trigger event types.

This must be reviewed and corrected to match Batch 10's verified Success rule.

Do not mark a Payment as Captured merely because:

* event type is Authorized,
* amount matches.

---

# 125. WEBHOOK EVENT PAYLOAD SHAPE

Validate each configured Razorpay event using its actual documented payload structure.

Do not assume every event type exposes identical nested fields.

---

# 126. WEBHOOK EVENT IDEMPOTENCY

Use stable provider event identity.

If provider event ID is unavailable:

do not use a timestamp-based ID that guarantees every duplicate delivery looks unique.

Use a deterministic safe fallback strategy or place event in manual review rather than double-processing.

---

# 127. PAYMENT IDEMPOTENCY

Provider Payment ID must be unique where available.

Webhook retry must not:

* create duplicate Payment,
* activate Subscription twice,
* issue duplicate Invoice,
* consume Coupon twice,
* grant Add-ons twice.

---

# 128. RECONCILIATION MISMATCH

If amount/currency mismatch:

* do not activate Plan,
* flag review,
* record safe audit,
* show honest user state.

Do not call it ordinary bank decline.

---

# 129. WEBHOOK PROCESSING FAILURE

If payment is captured but activation fails:

do not return a permanent fake success path with no recovery.

Create:

* retryable activation state,
* Admin/Billing alert,
* dead-letter/reconciliation workflow.

Later Batch 12 Admin Billing must be able to inspect/retry.

---

# 130. SCREEN 11 — INVOICE LIST

Desktop columns:

* INVOICE #
* DATE
* AMOUNT
* STATUS

Reference rows:

### MGP-2026-0847

`3 Jul 2026`

`₹1,752.30`

Status:

`Paid`

### MGP-2026-0731

`3 Jun 2026`

`₹1,178.82`

Status:

`Paid`

### MGP-2026-0698

`18 May 2026`

`₹400.00`

Status:

`Refund pending`

---

# 131. MOBILE INVOICE CARD

Reference:

`MGP-2026-0847`

Status:

`Paid`

Metadata:

`3 Jul 2026 · ₹1,752.30`

The mobile card is the responsive transformation of the same Invoice row.

Do not use separate sample data.

---

# 132. INVOICE STATUS MAPPING

User-facing Invoice status may include:

* Paid
* Refund Pending
* Refunded
* Partially Refunded
* Credit Note Issued
* Void

according to actual Billing record.

Do not mark Invoice Paid when Refund is pending without the appropriate display treatment.

---

# 133. INVOICE CREATION CONDITION

Create paid Invoice only after verified Payment.

Do not create Invoice at:

* Payment Order creation,
* Razorpay modal open,
* client callback.

---

# 134. INVOICE PAGINATION

Current fixed first-50 Invoice behavior is not final scalable behavior.

Implement pagination/cursor.

---

# 135. INVOICE OWNERSHIP

User may read only own Invoice.

Changing Invoice ID must not expose another user's Invoice.

---

# 136. INVOICE SORT ORDER

Newest first.

Use actual issue date/created date according to product logic.

---

# 137. SCREEN 12 — PRINTABLE INVOICE DETAIL

Reference company:

`My Gujarat Property Pvt Ltd`

Reference seller GST:

`GSTIN 24AAACM9910P1ZS · Ahmedabad`

Reference Invoice:

`MGP-2026-0847`

Date:

`3 July 2026`

---

# 138. BILLED TO

Reference:

`Bhatt Estate Consultants (Kunal Bhatt)`

GST:

`GSTIN 24ABCDE1234F1Z5`

Address:

`402 Shalin Complex, CG Road, Ahmedabad 380009`

Use actual Invoice snapshot.

---

# 139. INVOICE SNAPSHOT RULE

Invoice Billing details must be immutable historical snapshot values.

If user changes GST details later:

old Invoice must not change.

---

# 140. INVOICE LINE ITEMS

Reference:

### Premium plan — prorated 13 Jul – 27 Jul

`₹1,250.00`

### Featured slot add-on × 2

`₹400.00`

### Coupon BROKER10

`−₹165.00`

### CGST 9%

`₹133.65`

### SGST 9%

`₹133.65`

### Total paid

`₹1,752.30`

---

# 141. LINE ITEM SNAPSHOT REQUIREMENT

The Checkout Order must persist enough structured detail to reproduce the Invoice exactly.

Do not generate only:

one generic Plan line item

with the final total.

---

# 142. CURRENT INVOICE RECONCILIATION

Current Invoice generator creates one Plan line item based on Order payable amount.

Batch 10 requires structured preservation of:

* prorated Plan,
* Add-ons,
* Coupon discount,
* taxes.

Repair Invoice generation.

---

# 143. SEQUENTIAL NUMBERING

Source note:

`Sequential numbering`

Invoice numbering must use concurrency-safe server/database sequencing.

Do not use:

count + 1

in application code.

---

# 144. FINANCIAL YEAR

Invoice numbering must respect approved financial-year numbering scheme.

Do not change historical Invoice numbers.

---

# 145. PAYMENT REFERENCE

Reference:

`payment ref pay_NxK4…8Ql`

Display safe masked reference.

---

# 146. COMPUTER-GENERATED INVOICE NOTE

Render according to exact source layout.

Do not add unnecessary signature placeholder if the source does not include it.

---

# 147. DOWNLOAD PDF

Must generate or retrieve a real PDF.

The downloaded document must match the Invoice data.

No blank PDF.

---

# 148. EMAIL INVOICE

Action:

`Email Invoice`

must:

* use actual Invoice email,
* use configured email provider,
* attach/link the correct Invoice,
* record send outcome.

If email provider is missing:

show honest Setup Required.

Do not show false Sent toast.

---

# 149. PRINT CSS

Invoice Detail must be printable.

Hide:

* dashboard sidebar,
* navigation,
* unrelated buttons.

Verify:

* A4-friendly layout,
* no clipped line items,
* no broken page split.

---

# 150. SCREEN 13 — REFUND REQUEST

Reference heading:

`Request a refund`

Selected Invoice:

`MGP-2026-0698 · ₹400.00 · Featured slots`

---

# 151. REFUND ELIGIBILITY

Server validates:

* Invoice/Payment belongs to user,
* Payment was captured/verified,
* refundable amount remains,
* Refund policy eligibility,
* no conflicting active Refund request.

---

# 152. REFUND REASONS

Exact source options:

* Feature not used
* Charged by mistake
* Service issue
* Other

Persist structured reason code plus optional details.

---

# 153. OTHER REFUND REASON

If Other selected:

require details.

---

# 154. REFUND AMOUNT

Options:

* Full ₹400
* Partial

---

# 155. FULL REFUND

Full amount equals current refundable balance, not blindly original Payment amount if a partial Refund already occurred.

---

# 156. PARTIAL REFUND

Partial requires:

* amount field,
* amount > 0,
* amount <= refundable remaining amount,
* currency-safe validation.

---

# 157. CURRENT REFUND RECONCILIATION

Current Refund action records:

* full payment amount,
* free-text reason.

Batch 10 requires:

* Invoice selection/context,
* structured reason,
* Full/Partial,
* partial amount validation,
* duplicate active request protection,
* status tracker.

---

# 158. SUBMIT REFUND REQUEST

Action:

`Submit refund request`

must:

* disable on submit,
* validate server-side,
* create Refund request,
* audit,
* show real tracker state.

---

# 159. REFUND STATUS TRACKER

Reference:

`Refund status — REF-114`

Stages:

1. Requested
2. Under review
3. Approved
4. Refunded

---

# 160. REFUND DISPLAY ID

Use real safe Refund display reference.

Do not expose only UUID.

---

# 161. REFUND STATUS TIMESTAMPS

Where exact final screen displays time/date:

use persisted status events.

Do not derive all stage times from one `updated_at`.

---

# 162. REJECTED REFUND BRANCH

Source rule:

Rejected branch replaces:

`Approved`

with a red Rejected state and Reason Note.

Show actual rejection reason.

---

# 163. REFUND REVIEW COPY

Reference:

`Typically resolved in 3 business days.`

Only preserve this product promise if operations can support it.

---

# 164. REFUND PROVIDER EXECUTION

User Refund request and actual provider Refund are separate states.

Requested
≠ Refunded.

Admin approval
≠ provider settlement complete.

Track real state.

---

# 165. PROVIDER REFUND IDEMPOTENCY

Do not submit the same Refund to gateway twice.

Use provider Refund ID and idempotency.

---

# 166. REFUND INVOICE EFFECT

After actual Refund:

update financial status according to accounting model.

For partial Refund:

* Invoice status/Refund relationship,
* Credit Note where required by accounting workflow.

Later Admin Billing Batch manages Credit Notes.

---

# 167. SCREEN 14 — GST / BILLING DETAILS

Heading:

`Billing details`

Account types:

* Business (B2B)
* Individual (B2C)

---

# 168. BUSINESS B2B MODE

Fields:

### Business name *

### GSTIN

### Billing address *

Action:

`Save billing details`

---

# 169. INDIVIDUAL B2C MODE

Do not require Business name/GSTIN if B2C mode does not need them.

Use exact source responsive behavior.

---

# 170. BUSINESS NAME VALIDATION

For B2B:

Business Name is required server-side.

Current generic optional storage is insufficient.

---

# 171. GSTIN VALIDATION

Validate:

* 15-character format,
* uppercase normalization,
* state code,
* approved checksum validation if implemented.

At minimum implement exact product validation requirements.

Do not accept obviously invalid GSTIN.

---

# 172. REFERENCE GST VALIDITY COPY

Reference:

`Valid format · Gujarat (24) — CGST+SGST will apply`

The validation message must be data-driven.

Do not display Gujarat if GSTIN state prefix is not 24.

---

# 173. BILLING ADDRESS

B2B Billing Address is required.

Do not allow only whitespace.

---

# 174. PLACE OF SUPPLY

Tax calculation must derive from reliable structured state/place-of-supply data.

Do not parse state only from arbitrary address string.

---

# 175. SAVE BILLING DETAILS

Must:

* authenticate,
* validate,
* persist,
* show success after persistence,
* not alter historical Invoices.

---

# 176. BILLING DETAILS EFFECT ON FUTURE INVOICES

New Billing Details apply to future Invoice snapshots.

Old Invoices remain unchanged.

---

# 177. CHECKOUT GST PREVIEW

Checkout tax preview must use current saved Billing Details.

If user edits Billing Details before Pay:

recalculate Checkout safely server-side.

---

# 178. SCREEN 15 — MANUAL ACTIVATION

Reference Plan:

`Basic plan`

State:

`Active until 15 Aug 2026`

Reference:

`Activated by support on 28 June 2026 (ticket #4471).`

Message:

`No payment was collected for this period — recorded in the audit log.`

---

# 179. MANUAL ACTIVATION HONESTY

Source rule:

**Never hidden or shown as a paid subscription.**

A support/admin-granted period must visibly remain distinct from paid activation.

---

# 180. MANUAL ACTIVATION SOURCE

Subscription must store source such as:

`admin_grant`

and staff actor reference.

Do not create a fake Payment row.

---

# 181. MANUAL ACTIVATION NO FAKE INVOICE

If no payment was collected:

do not issue a Paid Invoice.

---

# 182. SUPPORT TICKET LINK

Reference:

`ticket #4471`

Manual activation should link to real support/admin reason context when available.

---

# 183. MANUAL ACTIVATION AUDIT

Record:

* staff actor,
* user,
* role,
* Plan,
* start date,
* end date,
* reason,
* linked Ticket,
* timestamp.

---

# 184. MANUAL ACTIVATION EXPIRY

At the granted period end:

Subscription must transition according to product policy.

Do not remain Active forever.

---

# 185. MANUAL ACTIVATION USER DISPLAY

The user-facing state must clearly show:

* Activated by Support,
* no payment was collected,
* end date.

Do not use:

`Payment confirmed`.

---

# 186. DEV-ONLY TEST MODE ANNOTATION

Source instruction:

If a Razorpay test key is active in a development build:

show internal:

`TEST MODE`

ribbon on Staff builds only.

---

# 187. TEST MODE MUST NOT APPEAR IN USER PRODUCTION UI

Do not show test ribbon:

* public Pricing,
* normal Owner Billing,
* Broker Billing,
* Builder Billing

in production.

---

# 188. TEST PAYMENT IS NOT REAL PAYMENT

Do not mix Razorpay Test Mode Payments into production financial records.

Use environment isolation.

---

# 189. CURRENT REPOSITORY RECONCILIATION — PRICING FLOW

Current behavior:

Plan CTA
→ create Payment Order
→ open Razorpay.

Batch 10 requires:

Plan CTA
→ Auth-return intent
→ Checkout Summary
→ Pay
→ Razorpay.

Rebuild flow.

---

# 190. CURRENT REPOSITORY RECONCILIATION — SELECTED PLAN INTENT

Current Guest login redirect returns to generic Pricing.

Batch 10 requires the selected Plan Checkout to resume.

Implement signed/safe return intent.

---

# 191. CURRENT REPOSITORY RECONCILIATION — PRORATION

Current Checkout Order logic uses full Plan price.

Implement:

* Proration preview,
* snapshot,
* current period anchor,
* immediate upgrade semantics,
* next-cycle downgrade semantics.

---

# 192. CURRENT REPOSITORY RECONCILIATION — ADD-ONS

Current Payment Order types may contain Add-on concepts, but Batch 10 Checkout needs real mixed line-item support.

Implement:

* Add-on selection,
* Add-on quantity,
* Add-on payment,
* verified grant,
* Invoice line item.

---

# 193. CURRENT REPOSITORY RECONCILIATION — ORDER BREAKDOWN

Current payment Order stores aggregate:

* gross,
* discount,
* payable.

Batch 10 Invoice needs full line-item breakdown.

Add immutable Order Line Item snapshots.

---

# 194. CURRENT REPOSITORY RECONCILIATION — DUPLICATE PAYMENT

Current Order creation can create a fresh Order on repeated call.

Implement Pending Payment detection and Checkout-session idempotency.

---

# 195. CURRENT REPOSITORY RECONCILIATION — WEBHOOK AUTHORIZED EVENT

Review and remove unsafe activation on non-final payment status.

Success is after verified final gateway state only.

---

# 196. CURRENT REPOSITORY RECONCILIATION — EVENT ID FALLBACK

Do not use timestamp-based fallback event identity for financially significant webhook idempotency.

Use stable identity strategy.

---

# 197. CURRENT REPOSITORY RECONCILIATION — ACTIVATION TRANSACTION

Current activation sequence performs:

Subscription update/create
→ Invoice generation
→ Audit

through separate operations.

Batch 10 requires transaction-safe or durable recovery architecture.

---

# 198. CURRENT REPOSITORY RECONCILIATION — INVOICE LINE ITEMS

Current single Plan line item cannot reproduce:

* prorated Plan,
* Add-on,
* Coupon,
* taxes.

Implement full breakdown.

---

# 199. CURRENT REPOSITORY RECONCILIATION — REFUNDS

Current Refund foundation creates a full-value request only.

Batch 10 requires:

* Full/Partial,
* structured reasons,
* tracker,
* rejected reason,
* refundable balance.

---

# 200. CURRENT REPOSITORY RECONCILIATION — B2B VALIDATION

Current GST profile update must enforce the Batch 10 required B2B fields.

At minimum:

* Business Name,
* Billing Address,
* valid GSTIN where B2B GST invoice requires it.

---

# 201. CURRENT REPOSITORY RECONCILIATION — USAGE COUNTERS

Current generic usage architecture must not use daily counters for monthly/cycle-based entitlement displays.

Batch 10 usage meters need feature-specific semantics.

Fix:

* period alignment,
* atomic increment,
* current-count metrics,
* monetary credit ledger.

---

# 202. ATOMIC USAGE UPDATE

Avoid:

read `used_count`
→ add one in application
→ write.

Use transaction/RPC where concurrency matters.

---

# 203. PAYMENT ORDER DATA MODEL REQUIREMENTS

A Payment Order should support:

* Profile,
* role,
* purpose,
* Plan,
* Add-ons,
* Coupon,
* gross amount,
* discount,
* taxable amount,
* tax breakdown,
* total payable,
* currency,
* provider,
* provider Order ID,
* status,
* Checkout session ID,
* idempotency identity,
* created timestamp,
* expiry.

---

# 204. ORDER LINE ITEMS

Add structured line items for:

* subscription/proration,
* Add-ons,
* discount/Coupon representation,
* other approved billable items.

---

# 205. PAYMENT DATA MODEL REQUIREMENTS

Payment must support:

* local Payment ID,
* Payment Order ID,
* provider,
* provider Payment ID,
* provider Order ID,
* amount,
* currency,
* trusted status,
* method-safe summary,
* reconciliation status,
* captured timestamp,
* webhook relationship.

---

# 206. PAYMENT STATUS HONESTY

Do not convert every provider callback into:

`captured`.

Preserve honest status.

---

# 207. SUBSCRIPTION DATA MODEL REQUIREMENTS

Subscription must support:

* role,
* Plan,
* status,
* source,
* period start,
* period end,
* Trial end,
* cancellation at period end,
* pending Plan change,
* activation Payment ID,
* manual grant staff ID.

---

# 208. SCHEDULED DOWNGRADE MODEL

Store:

* pending target Plan,
* effective date,
* requested time.

Do not overwrite current Plan immediately.

---

# 209. PAYMENT METHOD STORAGE

Store only provider-safe method summary.

For example:

* Card ending 4482,
* UPI,
* Netbanking.

Do not store sensitive credentials.

---

# 210. INVOICE DATA MODEL REQUIREMENTS

Invoice must snapshot:

* Invoice number,
* Buyer legal name,
* Buyer GSTIN,
* Buyer Billing Address,
* state/place of supply,
* B2B/B2C,
* taxable amount,
* CGST,
* SGST,
* IGST,
* total,
* currency,
* issue time,
* Payment reference.

---

# 211. INVOICE LINE ITEM REQUIREMENTS

Each line must store:

* description,
* service period where applicable,
* quantity,
* unit amount,
* taxable amount,
* tax rate,
* total.

---

# 212. REFUND DATA MODEL REQUIREMENTS

Refund record must support:

* Display reference,
* Payment ID,
* Invoice ID where relevant,
* Profile,
* Requested amount,
* Approved amount,
* Reason code,
* Reason details,
* Status,
* provider Refund ID,
* rejection reason,
* requested time,
* reviewed time,
* refunded time.

---

# 213. REFUND STATUS EVENTS

For accurate tracker, preserve status history.

Do not depend only on current Refund row status.

---

# 214. BILLING AUDIT REQUIREMENTS

Audit financial lifecycle events including:

* Checkout created,
* Payment callback recorded,
* webhook verified,
* mismatch detected,
* Subscription activated,
* Plan changed,
* cancel requested,
* Coupon consumed,
* Add-on granted,
* Invoice issued,
* Refund requested,
* Refund approved/rejected,
* Manual activation.

---

# 215. AUDIT DATA SAFETY

Do not store:

* card number,
* CVV,
* payment secret,
* full sensitive gateway payload

in generic audit metadata.

---

# 216. REFERENCE DATA REQUIREMENT

Create persistent development/reference data through real database models for Batch 10 verification.

Do not hard-code UI.

Financial test fixtures must remain isolated from production.

---

# 217. REFERENCE PLAN DATA

Create test role Plans supporting the reference Pricing visual:

Broker:

* Free
* Basic
* Premium.

Use reference amounts/features in development fixture where appropriate.

---

# 218. REFERENCE SUBSCRIPTION

Create test Broker Billing state:

Plan:

Basic.

Status:

Active.

Renewal:

reference-compatible future fixture date.

Usage:

* Active Listings,
* Featured Slots,
* Ad Credits,
* Team Seats.

---

# 219. REFERENCE TRIAL

Create a fixture Trial with dynamic remaining days for testing the 4-day state.

Do not freeze production code to:

4.

---

# 220. REFERENCE CHECKOUT

Use test-mode financial fixture/order supporting:

* Prorated Plan line,
* Featured Add-on ×2,
* Coupon,
* CGST,
* SGST.

---

# 221. REFERENCE SUCCESS PAYMENT

Use Razorpay Test Mode or isolated test financial record.

Never create fake real production Payment.

---

# 222. REFERENCE FAILED PAYMENT

Use test failure fixture.

Do not alter real Subscription.

---

# 223. REFERENCE PENDING PAYMENT

Create a recent pending test Order to verify Screen 10.

---

# 224. REFERENCE INVOICES

Create test Invoice rows representing:

* Paid,
* Refund Pending.

Use real Invoice relationships.

---

# 225. REFERENCE REFUND

Create Refund fixture with tracker states.

Include rejected branch fixture separately where needed.

---

# 226. REFERENCE MANUAL ACTIVATION

Create support-granted test Subscription:

* source admin grant,
* expiry,
* actor,
* linked Test Ticket,
* audit record.

Do not create fake Payment.

---

# 227. REFERENCE DATA NON-DELETION

User explicitly requires design/reference data to remain after verification.

Do not automatically delete fixture records.

However:

strictly isolate:

* Test Mode Payments,
* fake Invoice fixtures,
* reference Refunds

from production financial reports.

---

# 228. SECURITY — PRICING

Public users may read only:

* active,
* public Plan catalog.

Do not expose internal draft Plan data.

---

# 229. SECURITY — CHECKOUT

User may purchase only eligible Plan for their own role.

Server owns price.

---

# 230. SECURITY — PAYMENT STATUS

A user may query only own Payment Order status.

---

# 231. SECURITY — INVOICE

A user may access only own Invoice.

---

# 232. SECURITY — REFUND

A user may request Refund only for own eligible Payment/Invoice.

---

# 233. SECURITY — GST PROFILE

A user may update only own Billing details.

---

# 234. SECURITY — MANUAL ACTIVATION

Public users cannot invoke manual activation.

Only authorised Billing/Support staff through the correct audited Admin flow.

---

# 235. RLS VERIFICATION — PLANS

Test:

* public active Plans visible,
* internal hidden Plans not public.

---

# 236. RLS VERIFICATION — PAYMENT ORDERS

Test:

* own order readable where needed,
* another user's order denied.

---

# 237. RLS VERIFICATION — PAYMENTS

Own Payment only.

---

# 238. RLS VERIFICATION — INVOICES

Own Invoice only.

---

# 239. RLS VERIFICATION — REFUNDS

Own request create/read.

Staff review through separate permission scope.

---

# 240. RLS VERIFICATION — GST

Own profile only.

---

# 241. PAYMENT FAILURE RECOVERY MATRIX

Test at minimum:

### Provider not configured

No Checkout.

### SDK load failure

Recoverable.

### Modal dismissed

No Success.

### Client callback signature invalid

No activation.

### Payment Authorized only

No premature Success where capture required.

### Captured and matched

Activation process.

### Amount mismatch

No activation; review state.

### Currency mismatch

No activation.

### Duplicate webhook

No duplicate activation/Invoice.

### Payment captured but Invoice generation fails

Recovery state, no lost Invoice obligation.

### Subscription activation retry

Idempotent.

---

# 242. COUPON TEST MATRIX

Test:

* valid Coupon,
* expired,
* disabled,
* wrong role,
* wrong Plan,
* below minimum,
* per-user limit reached,
* global usage limit reached,
* concurrent final redemption,
* Remove Coupon.

---

# 243. PRORATION TEST MATRIX

Test:

* upgrade beginning of cycle,
* middle of cycle,
* final day,
* already Premium,
* current Trial,
* cancelled-at-period-end,
* pending Payment,
* target Plan inactive.

---

# 244. DOWNGRADE TEST MATRIX

Test:

* user below lower Plan limit,
* user above listing limit,
* user above Team seat limit,
* current Featured usage exceeds new limit.

No data deletion.

---

# 245. TAX TEST MATRIX

Test:

* B2C,
* Gujarat B2B,
* interstate B2B,
* GSTIN absent,
* invalid GSTIN,
* GSTIN state prefix mismatch,
* Billing Details changed after old Invoice.

---

# 246. REFUND TEST MATRIX

Test:

* Full Refund,
* Partial Refund,
* amount over refundable balance,
* duplicate active request,
* already fully Refunded,
* rejected Refund,
* approved provider Refund,
* provider Refund failure/retry.

---

# 247. RESPONSIVE VERIFICATION MATRIX

Test:

* 360px,
* 390px,
* larger mobile,
* tablet portrait,
* tablet landscape,
* laptop,
* 1280px desktop,
* wide desktop.

---

# 248. PRICING RESPONSIVE CHECK

Desktop:

* three Plan cards,
* comparison table,
* FAQ.

Mobile:

* role tabs,
* stacked cards,
* no clipped price,
* no horizontal page overflow.

---

# 249. BILLING OVERVIEW RESPONSIVE CHECK

Verify:

* Trial banner,
* Plan card,
* usage meters,
* actions.

No wrapping:

`Upgrade Plan`

into broken two lines unless source does so.

---

# 250. CHECKOUT RESPONSIVE CHECK

Verify:

* line items,
* Coupon,
* Tax,
* total,
* Pay button.

No amount clipping.

---

# 251. VERIFYING RESPONSIVE CHECK

Spinner/state centered correctly.

No Back/Pay controls accidentally visible.

---

# 252. SUCCESS/FAILED RESPONSIVE CHECK

Verify action stack and text wrapping.

---

# 253. INVOICE LIST RESPONSIVE CHECK

Desktop:

table.

Mobile:

cards.

Same dataset.

---

# 254. INVOICE DETAIL RESPONSIVE CHECK

Mobile:

readable line items.

Print:

A4.

---

# 255. REFUND RESPONSIVE CHECK

Desktop and mobile:

* reason controls,
* amount options,
* tracker.

No timeline clipping.

---

# 256. GST FORM RESPONSIVE CHECK

Verify:

* B2B/B2C controls,
* labels,
* validation copy,
* address field,
* Save.

---

# 257. MANUAL ACTIVATION RESPONSIVE CHECK

Honest state remains visible and readable.

Do not hide Support activation explanation on mobile.

---

# 258. LOADING STATES

Required for:

* Plan catalog,
* Billing Overview,
* Plan Change preview,
* Checkout creation,
* Payment status,
* Invoice List,
* Invoice Detail,
* Refund tracker,
* GST Profile.

Use design-consistent skeletons.

---

# 259. EMPTY STATES

Required:

* no Subscription,
* no Invoices,
* no Refund history,
* no Billing Profile.

Use actionable text.

---

# 260. ERROR STATES

Required:

* Plan load failure,
* Proration failure,
* Coupon failure,
* Checkout failure,
* SDK failure,
* Payment verification delayed,
* Payment failure,
* Invoice load failure,
* PDF failure,
* Email provider failure,
* Refund request failure,
* GST save failure.

Do not expose raw gateway/database error.

---

# 261. NO DEAD UI RULE

Every visible Batch 10 action must work.

Includes:

* Login
* Register
* Role tabs
* Start Free
* Choose Basic
* Choose Premium
* FAQ accordions
* Upgrade Now
* Upgrade Plan
* Cancel
* Continue to Payment
* Remove Coupon
* Pay
* Razorpay checkout
* Check Status
* View Invoice
* Go to Dashboard
* Contact Support
* Retry Payment
* Invoice row/card
* Download PDF
* Email Invoice
* Refund Reason
* Full/Partial selection
* Submit Refund
* B2B/B2C
* Save Billing Details.

No:

`href="#"`.

No empty click handler.

---

# 262. SCREEN 1 FINAL CHECKLIST — PRICING

* [ ] exact public Pricing layout
* [ ] Owner tab
* [ ] Broker tab
* [ ] Builder tab
* [ ] real Plan sets
* [ ] Free card
* [ ] Basic card
* [ ] Most Popular badge
* [ ] Premium card
* [ ] comparison table
* [ ] exact feature rows
* [ ] FAQ
* [ ] mid-cycle answer aligned
* [ ] GST answer aligned
* [ ] downgrade answer aligned
* [ ] Guest Auth sheet
* [ ] selected Plan return intent
* [ ] server role revalidation
* [ ] mobile stacked cards
* [ ] loading/error states

---

# 263. SCREENS 2–3 FINAL CHECKLIST — SUBSCRIPTION/TRIAL

* [ ] role-aware shared Billing shell
* [ ] current Plan
* [ ] Active status
* [ ] actual price/cycle
* [ ] renewal date
* [ ] safe payment method summary
* [ ] Upgrade Plan
* [ ] Cancel confirmation
* [ ] cancel-at-period-end
* [ ] lifecycle processor
* [ ] active Listings meter
* [ ] Featured Slot meter
* [ ] Ad Credit meter
* [ ] Team Seat meter
* [ ] correct period semantics
* [ ] Trial banner
* [ ] real days remaining
* [ ] Upgrade Now

---

# 264. SCREEN 4 FINAL CHECKLIST — PLAN CHANGE

* [ ] Current Plan
* [ ] target Plan
* [ ] target features
* [ ] real target price
* [ ] server Proration
* [ ] remaining days
* [ ] amount today
* [ ] next full amount
* [ ] renewal anchor
* [ ] immediate Upgrade after payment
* [ ] next-cycle Downgrade
* [ ] pending change model
* [ ] Continue to Payment

---

# 265. SCREEN 5 FINAL CHECKLIST — CHECKOUT

* [ ] Order Summary
* [ ] prorated Plan line
* [ ] service period snapshot
* [ ] Add-on line
* [ ] quantity
* [ ] Coupon
* [ ] Remove
* [ ] invalid Coupon inline state
* [ ] subtotal
* [ ] CGST
* [ ] SGST
* [ ] IGST where required
* [ ] total
* [ ] Pay button amount
* [ ] server price authority
* [ ] structured line items
* [ ] duplicate-submit protection
* [ ] Checkout order expiry

---

# 266. SCREENS 6–10 FINAL CHECKLIST — PAYMENT FLOW

* [ ] actual Razorpay SDK
* [ ] no fake payment fields
* [ ] correct amount
* [ ] Checkout started state
* [ ] client callback does not activate
* [ ] Verification screen
* [ ] background locked
* [ ] safe status polling
* [ ] page refresh recovery
* [ ] verified Success only
* [ ] trusted Payment amount
* [ ] masked Payment ID
* [ ] actual active Plan
* [ ] actual period end
* [ ] functional Invoice
* [ ] Dashboard action
* [ ] honest Failed screen
* [ ] no Plan activation on failure
* [ ] Support context
* [ ] Retry safely
* [ ] pending Payment detection
* [ ] real pending age
* [ ] Check Status
* [ ] no duplicate Checkout Order
* [ ] webhook signature verification
* [ ] final payment-state verification
* [ ] amount reconciliation
* [ ] currency reconciliation
* [ ] stable event idempotency
* [ ] activation retry/recovery

---

# 267. SCREENS 11–12 FINAL CHECKLIST — INVOICES

* [ ] desktop table
* [ ] Invoice number
* [ ] date
* [ ] amount
* [ ] status
* [ ] Paid
* [ ] Refund Pending
* [ ] mobile cards
* [ ] same dataset
* [ ] pagination
* [ ] Invoice Detail
* [ ] Seller name
* [ ] Seller GSTIN
* [ ] Buyer legal name
* [ ] Buyer GSTIN
* [ ] Billing Address snapshot
* [ ] Plan line item
* [ ] Add-on line item
* [ ] Coupon line
* [ ] CGST
* [ ] SGST
* [ ] IGST where required
* [ ] total paid
* [ ] sequential number
* [ ] safe Payment reference
* [ ] Download PDF
* [ ] Email Invoice
* [ ] print layout
* [ ] ownership security

---

# 268. SCREEN 13 FINAL CHECKLIST — REFUND

* [ ] eligible Invoice
* [ ] refundable balance
* [ ] Feature Not Used
* [ ] Charged by Mistake
* [ ] Service Issue
* [ ] Other
* [ ] Full Refund
* [ ] Partial Refund
* [ ] amount validation
* [ ] duplicate request protection
* [ ] Submit
* [ ] Refund display ID
* [ ] Requested
* [ ] Under Review
* [ ] Approved
* [ ] Refunded
* [ ] Rejected branch
* [ ] rejection reason
* [ ] actual provider state
* [ ] Refund idempotency
* [ ] financial status update

---

# 269. SCREEN 14 FINAL CHECKLIST — GST

* [ ] Billing Details
* [ ] B2B
* [ ] B2C
* [ ] Business Name
* [ ] server required validation
* [ ] GSTIN
* [ ] format validation
* [ ] state code detection
* [ ] Gujarat 24 copy
* [ ] CGST+SGST logic
* [ ] IGST logic
* [ ] Billing Address
* [ ] structured place of supply
* [ ] Save
* [ ] existing profile load
* [ ] future Invoice application
* [ ] historical Invoice immutability

---

# 270. SCREEN 15 FINAL CHECKLIST — MANUAL ACTIVATION

* [ ] Plan name
* [ ] active-until date
* [ ] Activated by Support
* [ ] activation date
* [ ] linked Ticket
* [ ] no Payment collected copy
* [ ] audit record
* [ ] source admin grant
* [ ] staff actor
* [ ] expiry behavior
* [ ] no fake Payment
* [ ] no paid Invoice
* [ ] never shown as paid activation

---

# 271. FULL CONNECTED BATCH 10 TEST FLOW

Perform this complete test:

Open Public Pricing as Guest
→ switch Owner/Broker/Builder tabs
→ choose Broker Premium
→ verify Batch 2 Auth flow
→ Login
→ verify selected Premium Plan intent restored
→ open Checkout Summary
→ verify server Proration
→ add Featured Slot Add-on ×2
→ apply valid Coupon
→ Remove Coupon
→ apply expired Coupon
→ verify inline error
→ apply valid Coupon again
→ verify taxes
→ click Pay twice rapidly
→ verify only one active Checkout attempt
→ open Razorpay Test Mode
→ complete successful Test Payment
→ verify Processing screen
→ verify client callback alone does not activate
→ process trusted webhook
→ verify Subscription active
→ verify Success screen
→ verify Invoice exists
→ View Invoice
→ Download PDF
→ Email Invoice in configured test provider
→ open Billing Overview
→ verify real Plan/usage
→ test Trial fixture
→ open Upgrade flow mid-cycle
→ verify real Proration
→ create pending Checkout
→ attempt same Plan payment again
→ verify Duplicate Payment screen
→ Check Status
→ test failed Payment fixture
→ verify existing Plan remains active
→ request Refund
→ test Full Refund request
→ test Partial Refund fixture
→ progress tracker
→ test Rejected branch
→ edit B2B Billing Details
→ generate future test Invoice
→ verify new Invoice snapshot uses updated Billing details
→ verify old Invoice unchanged
→ create Manual Support Activation fixture
→ verify honest user display
→ verify no fake Payment/Invoice
→ test mobile all screens
→ test tablet
→ test desktop
→ inspect DB financial consistency.

Any failed financial connection means Batch 10 is incomplete.

---

# 272. LIVE VERIFICATION STANDARD

After each Batch 10 phase:

1. run Build,
2. run TypeScript check,
3. run Lint where configured,
4. run the actual application,
5. test Guest state,
6. test Owner,
7. test Broker,
8. test Builder,
9. use payment provider Test Mode only in isolated environment,
10. inspect Payment Orders,
11. inspect Payments,
12. inspect Subscription,
13. inspect Invoice,
14. inspect Invoice Line Items,
15. inspect Refunds,
16. inspect Billing Audit,
17. refresh Browser,
18. verify persistence,
19. test 390px mobile,
20. test tablet,
21. test desktop,
22. inspect Browser console,
23. inspect network failures,
24. inspect webhook processing result.

Static code review is not sufficient.

---

# 273. FINANCIAL RECONCILIATION TEST

For every successful test Payment:

Payment Order total
= Provider Order amount
= Provider Payment amount
= trusted Payment record amount
= Invoice total.

Any mismatch is a failure.

---

# 274. TAX RECONCILIATION TEST

For each Invoice:

Taxable subtotal

* CGST
* SGST
* IGST
  = Total Invoice amount.

Only valid applicable taxes should be non-zero.

---

# 275. LINE ITEM RECONCILIATION

For source-style Checkout:

Plan Proration

* Add-ons
  − Coupon
  = taxable subtotal before taxes according to configured pricing model.

Then:

Tax
→ final total.

Do not create arithmetic mismatch.

---

# 276. PAYMENT DUPLICATE TEST

Simulate:

* double-click,
* slow network,
* Browser retry,
* webhook duplicate,
* callback retry.

Verify:

* one financial Payment,
* one Subscription activation,
* one Invoice,
* one Add-on grant,
* one Coupon redemption.

---

# 277. MANUAL VISUAL VERIFICATION

Compare every Batch 10 implementation screen against the actual Batch 10 design source.

Inspect:

* Pricing card widths,
* tab placement,
* Most Popular badge,
* Plan price typography,
* feature spacing,
* comparison table,
* FAQ,
* Trial banner,
* usage meters,
* Change Plan card,
* Proration box,
* Checkout item spacing,
* tax rows,
* total hierarchy,
* Processing layout,
* Success icon/state,
* Failure hierarchy,
* Pending Payment card,
* Invoice table,
* Invoice card mobile transformation,
* Invoice Detail typography,
* Refund tracker,
* GST form,
* Manual Activation notice.

`Almost same` is not PASS.

---

# 278. COMPLETION BLOCKERS

Batch 10 must not be marked complete while any of these remain:

* Pricing card click directly opens Razorpay,
* Guest login loses selected Plan,
* no Checkout Summary screen,
* no real Proration,
* Upgrade charged full amount incorrectly,
* Downgrade applied immediately contrary to policy,
* Add-on displayed but not granted,
* Coupon usage race possible,
* Coupon discount client-authoritative,
* no structured Order Line Items,
* Pay button creates duplicate Orders,
* no Pending Payment detection,
* no Verification screen,
* client callback activates Subscription,
* `payment.authorized` causes premature paid activation where capture is required,
* amount mismatch can activate Plan,
* currency mismatch can activate Plan,
* weak webhook duplicate protection,
* Success screen reachable by query parameter,
* Subscription active but Invoice failure has no recovery,
* View Invoice dead,
* Invoice has only generic Plan line,
* Coupon missing from Invoice,
* Add-on missing from Invoice,
* Proration period missing from Invoice,
* Invoice pagination absent,
* PDF fake,
* Email Invoice fake,
* Refund only supports full amount,
* Refund reason not structured,
* no Refund tracker,
* no Rejected Refund reason,
* B2B Business Name optional server-side,
* B2B address optional server-side,
* tax state logic hard-coded,
* old Invoice changes after GST Profile edit,
* manual activation shown as paid,
* manual activation creates fake Payment,
* manual activation creates fake Paid Invoice,
* usage meter uses wrong daily period,
* usage increment race condition,
* Test Mode data mixed into production,
* test ribbon shown to production users,
* dead button,
* `href="#"`,
* fake success toast,
* console errors,
* unhandled webhook failures,
* no live Test Mode verification.

---

# 279. FINAL ACCEPTANCE STATEMENT

**Design Batch 10 — Billing & Payments is complete only when all 15 Batch 10 screen groups are implemented exactly according to the actual Batch 10 source design and every financial state is backed by real trusted data.**

Completion requires:

* exact Public Pricing,
* Owner/Broker/Builder role tabs,
* correct Plan sets,
* desktop Plan cards,
* mobile stacked cards,
* comparison table,
* Pricing FAQ,
* Guest Auth-return intent,
* exact selected Plan Checkout continuation,
* Subscription Overview,
* real Subscription state,
* real usage meters,
* Trial countdown,
* Cancel confirmation,
* Change Plan,
* real Proration,
* immediate paid Upgrade after verification,
* next-cycle Downgrade,
* structured Checkout Summary,
* Plan Proration line,
* Add-on line,
* Coupon handling,
* invalid Coupon state,
* correct taxes,
* actual Razorpay SDK,
* no fake provider form,
* dedicated Verification screen,
* safe status polling,
* verified Success only,
* honest Failure,
* existing Plan preserved on failure,
* Duplicate Payment detection,
* Check Status,
* stable webhook idempotency,
* amount reconciliation,
* currency reconciliation,
* safe activation workflow,
* activation recovery,
* desktop Invoice table,
* mobile Invoice cards,
* complete printable Invoice Detail,
* immutable Billing snapshot,
* structured Invoice Line Items,
* sequential Invoice numbering,
* real PDF,
* honest Email delivery,
* Full Refund,
* Partial Refund,
* Refund Tracker,
* Rejected Refund branch,
* B2B/B2C Billing Details,
* GST validation,
* CGST/SGST/IGST behavior,
* Manual Support Activation,
* Support Ticket link,
* Audit record,
* no fake Payment,
* no fake Invoice,
* no fake Success,
* no duplicate charge,
* no duplicate Subscription activation,
* no duplicate Invoice,
* no duplicate Add-on grant,
* no duplicate Coupon redemption,
* exact responsive behavior,
* complete financial reconciliation,
* complete live Test Mode verification.

Required implementation sequence:

**Screen 1 Pricing → verify → Screens 2–3 Subscription/Trial → verify → Screen 4 Plan Change → verify → Screen 5 Checkout → verify → Screen 6 Razorpay → verify → Screen 7 Processing → verify → Screen 8 Success → verify → Screen 9 Failure → verify → Screen 10 Duplicate Payment → verify → Screen 11 Invoice List → verify → Screen 12 Invoice Detail → verify → Screen 13 Refunds → verify → Screen 14 GST Details → verify → Screen 15 Manual Activation → verify → complete connected financial regression test.**

No screen passes merely because it renders.

**Exact Design + Trusted Payment Verification + Correct Proration + Financial Reconciliation + Invoice Integrity + Refund Integrity + GST Integrity + Idempotency + Security + RLS + Responsive Behavior + Live Verification must all pass.**
