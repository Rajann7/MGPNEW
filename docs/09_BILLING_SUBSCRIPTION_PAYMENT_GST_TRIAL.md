# docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md

# My Gujarat Property — Billing, Subscription, Payment, GST, Trial, Coupon And Invoice System

This document defines the complete **Billing, Subscription, Payment, GST, Trial, Coupon, Invoice and Plan Limit System** for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — build to match)

> Source of truth: finished design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batches 10, 12). Replicate 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`.

**Plan-metered resources (NEW — plans must define limits for all of these)**
* **Contact-reveal quota** (e.g. 20/month) — reveals are metered per plan (enforced with doc 07).
* **Featured slots** (Owner 1, Broker up to 3, Builder tier) — shown as usage meters + "⚡ FEATURED until <date>" chips.
* **Ad-spend wallet** (rupee balance, "Add funds") with rule "campaigns pause automatically at ₹0 — never negative".
* **Team/Agent seats** (Owner team seats, Builder agent seats e.g. 3/5).
* **Proposals-per-month** quota (Broker, e.g. 8/30).
Subscription overview shows live usage meters for each + stored method ("•••• 4482") + renewal date + trial countdown banner.

**GST engine**
* GSTIN state code drives tax: **Gujarat (24) → CGST 9% + SGST 9%; inter-state → IGST**. B2B/B2C toggle. GSTIN validated on state code. Sequential invoice numbers; seller entity + GSTIN on invoice; "computer-generated invoice" label. **Coupons carry through to the formal invoice** line items.

**Payment flow (honesty-critical)**
* Linear flow: Checkout → Razorpay (SDK placeholder) → Verifying (background locked, duplicate-submit blocked) → Success (ONLY after verified callback, shows Payment ID) → or Failed (honest, no plan activated, auto-refund promise 5–7 days, "still on <plan>"). Duplicate-payment detected state ("started 2 min ago" → Check Status). Prorated upgrade shows concrete math ("pay ₹1,250 today for remaining 15 days"). A dev-only "TEST MODE" ribbon is scoped to staff builds, never production.

**Refunds & admin billing (Batch 12)**
* Refund request has partial/full selector + reason taxonomy (Feature not used / Charged by mistake / Service issue / Other) + tracker ID (REF-114) + "~3 business days" SLA. Refund approval requires reason on approve AND reject + a second confirmation before the gateway refund fires.
* **Manual activation** bypasses payment → surfaces "Activated by support" on the user's billing page + audit log entry (reason required). Webhook log shows retry counter ("Failed ×2") + "signature verified · secrets redacted". Payment detail shows masked/safe summary only (never raw gateway JSON). Invoice correction is versioned (v2, both retained, totals auto-recompute). Coupon over-limit renders honestly (312/300). Plan editor reuses the public pricing card as a live preview; plan form includes featured-slots/mo + team-seats limits.

Claude must read this file before implementing pricing, plans, subscriptions, posting gates, role-specific limits, Razorpay checkout, payment orders, payment webhooks, invoices, GST, trials, coupons, refunds, credit notes, billing dashboard, payment admin, subscription admin, payment RLS policies or billing-related SQL migrations.

No fake payment success is allowed.

No subscription can activate from client callback only.

No failed or pending payment can activate a plan.

No invoice can be generated before verified payment.

No fake invoice number is allowed.

No fake active plan is allowed.

---

## 1. Purpose

This file defines:

* role-specific plans
* subscription system
* active plan gates
* posting limits
* property/project/requirement limits
* media limits
* lead/contact unlock limits
* ads/promotions billing
* add-ons
* trials
* coupons
* Razorpay payment flow
* payment order creation
* payment verification
* webhook verification
* idempotency
* payment reconciliation
* invoice generation
* sequential invoice numbering
* GST handling
* B2B/B2C billing
* billing dashboard
* payment history
* invoice PDF
* refunds
* credit notes
* cancellation
* grace period
* downgrade behavior
* admin billing module
* payment admin module
* plan admin module
* RLS and security
* provider setup-required behavior
* audit logs
* manual verification rules

This file is the master billing and payment reference.

---

## 2. Core Billing Principles

Billing must follow these principles:

1. Plans must be role-specific.
2. Active plan may be required before posting property/project/requirement.
3. Plan limits must be enforced server-side.
4. Client-side plan UI is not enough.
5. Payment amount must be calculated server-side.
6. Client amount must never be trusted.
7. Payment provider must be real or setup-required.
8. Payment success must be verified server-side.
9. Razorpay webhook signature verification is mandatory.
10. Client checkout success callback alone cannot activate plan.
11. Failed payment cannot activate plan.
12. Pending payment cannot activate plan.
13. Invoice must be generated only after verified successful payment.
14. Sequential invoice number must not be wasted on failed payment.
15. Manual activation must be permission-gated and audited.
16. Refunds and credit notes must be permission-gated and audited.
17. GST rules must be clear.
18. Trial rules must be clear.
19. Free trial must not auto-charge unless explicitly disclosed and implemented legally.
20. No fake subscription, payment, invoice, GST or plan status is allowed.

---

## 3. Billing Status Values

Use these billing statuses.

## 3.1 Plan Status

| Status       | Meaning                                       |
| ------------ | --------------------------------------------- |
| `draft`      | plan created but not public/active            |
| `active`     | plan available                                |
| `inactive`   | plan disabled                                 |
| `archived`   | old plan retained for history                 |
| `hidden`     | not public but usable internally              |
| `deprecated` | no new purchases, existing users may continue |

---

## 3.2 Subscription Status

| Status            | Meaning                                |
| ----------------- | -------------------------------------- |
| `inactive`        | no active subscription                 |
| `trialing`        | active trial                           |
| `active`          | paid/valid subscription                |
| `pending_payment` | payment started but not verified       |
| `past_due`        | payment failed or renewal overdue      |
| `grace`           | temporary grace access                 |
| `expired`         | subscription expired                   |
| `cancelled`       | user/admin cancelled                   |
| `downgraded`      | moved to lower/free plan               |
| `blocked`         | blocked due to fraud/payment/security  |
| `refunded`        | payment refunded; access adjusted      |
| `manual_active`   | manually activated by admin with audit |

---

## 3.3 Payment Status

| Status               | Meaning                                        |
| -------------------- | ---------------------------------------------- |
| `created`            | payment order created                          |
| `pending`            | payment pending                                |
| `authorized`         | payment authorized but not final if applicable |
| `captured`           | payment captured                               |
| `verified_success`   | provider success verified server-side          |
| `failed`             | payment failed                                 |
| `cancelled`          | user cancelled checkout                        |
| `expired`            | order expired                                  |
| `refunded`           | refunded                                       |
| `partially_refunded` | partial refund                                 |
| `disputed`           | payment dispute                                |
| `reconciled`         | manually/provider reconciled                   |
| `blocked`            | blocked due to fraud/security                  |
| `error`              | processing error                               |

---

## 3.4 Webhook Processing Status

| Status             | Meaning                  |
| ------------------ | ------------------------ |
| `received`         | webhook received         |
| `signature_failed` | signature invalid        |
| `duplicate`        | duplicate event received |
| `processed`        | event processed          |
| `ignored`          | safely ignored           |
| `failed`           | processing failed        |
| `retry_pending`    | retry required           |
| `dead_letter`      | failed repeatedly        |

---

## 3.5 Invoice Status

| Status               | Meaning                                    |
| -------------------- | ------------------------------------------ |
| `draft_internal`     | internal draft before final number if used |
| `issued`             | final invoice issued                       |
| `paid`               | paid invoice                               |
| `cancelled`          | cancelled where allowed                    |
| `refunded`           | fully refunded                             |
| `partially_refunded` | partial refund                             |
| `credit_note_issued` | credit note exists                         |
| `void`               | voided only if legally allowed and audited |

Invoice must not be generated for failed/pending payment.

---

## 4. User Roles And Billing Needs

## 4.1 Owner Billing Needs

Owner may need plans for:

* posting properties
* posting requirements
* active listing count
* image upload limits
* contact/inquiry limits where applicable
* lead access limits where applicable
* analytics access
* verification add-on where applicable
* featured/boost listing where applicable
* support priority

Owner should not have project posting plans.

---

## 4.2 Broker / Agent Billing Needs

Broker may need plans for:

* posting properties
* posting requirements
* active listing count
* proposal sending limits
* requirement feed access
* lead/CRM limits
* contact unlock limits
* image upload limits
* brochure PDF where allowed
* analytics
* verification
* featured/boost listing
* support priority

Broker should not have project posting plans.

---

## 4.3 Builder / Developer Billing Needs

Builder may need plans for:

* posting projects
* active project count
* unit inventory limit
* project images
* one video availability
* brochure PDF
* floor plan uploads
* agent/team seats
* project leads
* matching buying requirements
* analytics
* ads/promotions
* banner campaigns
* featured/sponsored placement
* RERA/project proof review
* support priority

Builder should not have normal property posting plans unless future scope changes.

---

## 5. Plan Types

Supported plan types may include:

| Plan Type        | Meaning                                |
| ---------------- | -------------------------------------- |
| `free`           | limited access, if enabled             |
| `trial`          | time-limited trial                     |
| `monthly`        | monthly subscription                   |
| `quarterly`      | quarterly subscription                 |
| `half_yearly`    | six-month subscription                 |
| `yearly`         | annual subscription                    |
| `one_time`       | one-time purchase                      |
| `addon`          | extra feature/limit                    |
| `credit_pack`    | lead/contact/ad credits if implemented |
| `promotion_pack` | ad/featured campaign                   |
| `manual_custom`  | admin-created custom plan              |

Plan design must be controlled by Super Admin/admin with permission.

---

## 6. Role-Specific Plan Matrix

## 6.1 Owner Plan Matrix

Owner plan can control:

| Feature                 | Limit Type                  |
| ----------------------- | --------------------------- |
| active properties       | count                       |
| property drafts         | count                       |
| property images         | count/storage               |
| property brochure       | enabled/disabled if allowed |
| requirements            | count                       |
| contact reveal received | included/limited            |
| leads visible           | included/limited            |
| analytics               | basic/advanced              |
| featured listing        | included/add-on             |
| support priority        | level                       |
| verification            | included/add-on             |

Owner plan must not include:

* project posting
* builder agents
* builder ads unless future approved
* project unit inventory

---

## 6.2 Broker Plan Matrix

Broker plan can control:

| Feature                 | Limit Type               |
| ----------------------- | ------------------------ |
| active properties       | count                    |
| property drafts         | count                    |
| property images         | count/storage            |
| brochure PDF            | enabled/disabled         |
| active requirements     | count                    |
| proposal sending        | count/month or unlimited |
| requirement feed access | enabled/limited          |
| leads/CRM               | count/stage features     |
| contact unlocks         | count                    |
| analytics               | basic/advanced           |
| featured listing        | add-on/included          |
| verification badge      | included/add-on          |
| support priority        | level                    |

Broker plan must not include:

* project posting
* builder project unit inventory
* builder agent seats
* project ads unless explicitly approved later

---

## 6.3 Builder Plan Matrix

Builder plan can control:

| Feature                  | Limit Type                   |
| ------------------------ | ---------------------------- |
| active projects          | count                        |
| project drafts           | count                        |
| project images           | count/storage                |
| project video            | enabled, one max per project |
| brochure PDF             | enabled                      |
| floor plans              | count/storage                |
| unit inventory           | unit count/project count     |
| wings/towers             | count if needed              |
| agent seats              | count                        |
| project leads            | count/access                 |
| matching requirements    | enabled/limited              |
| project analytics        | basic/advanced               |
| ads/promotions           | enabled/add-on               |
| banner campaigns         | count/duration               |
| city targeting           | all Gujarat/selected cities  |
| featured placement       | add-on                       |
| verification/RERA review | included/add-on              |
| support priority         | level                        |

Builder plan must not include:

* normal property posting as default
* PG/hostel/room project posting

---

## 7. Plan Limit Types

Supported limit types:

* count limit
* monthly quota
* yearly quota
* active item limit
* total item limit
* storage size limit
* file count limit
* role feature enable/disable
* city targeting count
* agent seat count
* lead unlock count
* contact reveal count
* ad impression/click package where implemented
* campaign duration
* priority support level
* analytics level
* verification review included/paid
* approval speed/SLA if legally/product-approved

Limits must be stored in structured format.

Do not hardcode all limits only in UI.

Server must enforce limits.

---

## 8. Posting Gate Rules

Posting gates may apply to:

* post property
* post project
* post requirement
* upload media
* upload brochure
* upload video
* upload floor plan
* submit for approval
* activate/publish
* create ad/promotion
* add builder agent
* send proposal
* unlock lead/contact
* access analytics
* access requirement feed

Gate order:

1. authenticated?
2. role allowed?
3. account active?
4. profile complete if required?
5. verification required?
6. active plan/trial?
7. plan limit available?
8. provider available?
9. entity valid?
10. action permitted?

Server action must reject if gate fails.

UI should show clear reason.

---

## 9. Subscription-Required UI

When a user lacks required plan, show:

* required plan message
* current plan status
* plan benefits
* upgrade/subscribe button
* pricing link
* plan comparison
* trial option where available
* coupon field where applicable
* support link
* no fake access

Examples:

* Owner tries to post property without plan → pricing popup/page.
* Broker exceeds active listing limit → upgrade/add-on prompt.
* Builder tries to post project without active plan → builder plan page.
* Builder tries to upload video without video feature → upgrade/add-on prompt.
* User tries to access advanced analytics → upgrade prompt.

Direct URL/API must also block.

---

## 10. Trial System

Trials may be used for:

* new owner
* new broker
* new builder
* promotional campaigns
* admin-granted trial
* role-specific trial

Trial fields:

* trial plan
* start date
* end date
* role
* limits
* granted_by
* status
* auto-convert flag
* disclosure accepted
* created_at
* updated_at

Trial rules:

1. trial must be real.
2. trial start/end stored.
3. trial limits enforced.
4. trial expiry handled by cron/job or request check.
5. trial cannot silently auto-charge unless legally disclosed and implemented.
6. trial cannot fake active paid plan.
7. trial abuse prevention required.
8. admin-granted trial audited.
9. user dashboard shows trial expiry.
10. notification sent before expiry if provider configured.

Trial statuses:

* `not_started`
* `active`
* `expired`
* `cancelled`
* `converted`
* `blocked`

---

## 11. Coupon System

Coupons may support:

* percent discount
* fixed amount discount
* role-specific coupon
* plan-specific coupon
* one-time use
* limited usage
* per-user usage
* date range
* minimum amount
* maximum discount
* referral/marketing campaign where implemented
* admin-created coupon
* private coupon
* public coupon

Coupon fields:

* code
* discount type
* discount value
* max discount
* valid from
* valid until
* usage limit
* per user limit
* allowed roles
* allowed plans
* status
* created by
* created_at
* updated_at

Coupon rules:

1. validate server-side
2. do not trust client discount
3. check expiry
4. check usage count
5. check role/plan eligibility
6. check per-user usage
7. record redemption only after payment success or safe reserved/released system
8. prevent race condition abuse
9. show clear invalid/expired message
10. coupon changes audited

No fake discount.

---

## 12. Add-On System

Add-ons may include:

* extra property listing
* extra project listing
* extra requirement
* extra image pack
* video upload feature
* brochure upload feature
* floor plan pack
* lead/contact unlock pack
* proposal pack
* builder agent seat
* featured listing
* boost listing
* sponsored placement
* banner ad campaign
* city targeting add-on
* analytics upgrade
* support priority add-on

Add-on rules:

* tied to role
* tied to plan where needed
* paid or admin-granted
* expiry where needed
* usage tracked
* server-enforced
* audited if admin granted
* payment verified before activation
* no fake add-on active state

---

## 13. Pricing Page Rules

Pricing page must show:

* role selector:

  * Owner
  * Broker
  * Builder
* plan cards
* features
* limits
* price
* billing cycle
* GST note
* trial note if available
* coupon support if applicable
* subscribe/upgrade CTA
* setup-required state if payment provider missing
* legal/payment/refund links
* plan disclaimers

Pricing page must not show:

* fake discount
* fake popular badge unless configured
* fake user count
* fake savings
* fake payment provider ready state
* features not actually enforced
* hidden conditions

---

## 14. Checkout Flow Overview

Checkout flow:

1. User chooses plan/add-on.
2. Server validates user role.
3. Server validates plan status.
4. Server validates price and GST.
5. Server applies coupon server-side if any.
6. Server creates internal checkout/payment record.
7. Server creates Razorpay order if provider configured.
8. Client opens Razorpay checkout using public key/order ID.
9. User completes/fails/cancels payment.
10. Client callback records pending/success attempt but does not activate subscription.
11. Razorpay webhook verifies payment.
12. Server processes webhook idempotently.
13. Subscription/add-on/ad activated after verified success.
14. Invoice generated after verified success.
15. Notification/email queued if provider configured.
16. Billing dashboard updated.

If Razorpay missing:

* checkout disabled/setup-required
* no fake order
* no fake success

---

## 15. Server-Side Payment Order Rules

Server must create order.

Server must validate:

* user authenticated
* role matches plan
* account active
* selected plan exists
* plan active
* amount from database
* currency INR
* coupon valid
* GST calculation
* total payable
* duplicate pending checkout if applicable
* rate limit
* provider configured

Server must store:

* internal payment record
* provider order ID
* amount
* tax
* coupon
* user
* plan/add-on/ad reference
* status `created` or `pending`

Client must not decide amount.

---

## 16. Razorpay Integration Rules

Razorpay integration must include:

* key ID public on client only
* key secret server-only
* webhook secret server-only
* order creation server-side
* checkout client-side
* webhook route handler
* signature verification
* idempotency
* safe logging
* provider status tracking
* test/live mode separation
* `.env.example` variables
* setup-required state if missing

Environment variables may include:

```txt id="razorpay-env-example"
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
RAZORPAY_MODE=test
```

Never expose `RAZORPAY_KEY_SECRET`.

---

## 17. Webhook Verification Rules

Webhook must:

1. read raw body safely
2. verify signature using webhook secret
3. reject invalid signature
4. store webhook event with unique provider event ID
5. process idempotently
6. update payment status
7. activate subscription/add-on/ad only on verified success
8. generate invoice after verified success
9. queue notification/email if configured
10. handle duplicate event safely
11. log safe errors
12. retry or mark failed if processing fails

Webhook must not:

* trust unverified payload
* expose raw secret
* log full sensitive payload
* activate plan on invalid signature
* process duplicate twice
* waste invoice number on duplicate/failed event

---

## 18. Client Checkout Callback Rules

Client checkout callback may:

* show “payment processing”
* send payment ID/order ID/signature to server for verification if used
* update UI to pending
* ask user to wait/check billing
* show failure/cancel state
* redirect to billing page

Client callback must not:

* activate subscription by itself
* generate invoice
* mark payment final without server verification
* show final success if webhook/server verification pending
* trust client amount

User-facing safe status:

* “Payment received, verifying.”
* “Payment pending verification.”
* “Payment failed/cancelled.”
* “Your plan is active” only after verified server success.

---

## 19. Payment Idempotency

Idempotency is mandatory.

Use unique constraints/checks for:

* provider order ID
* provider payment ID
* provider webhook event ID
* internal checkout ID
* invoice generated for payment ID
* subscription activation event

Duplicate webhook behavior:

* detect duplicate
* do not activate twice
* do not generate duplicate invoice
* do not send duplicate final notification if preventable
* log duplicate safely

---

## 20. Payment Reconciliation

Reconciliation is needed when:

* webhook delayed
* webhook failed
* client callback received but webhook missing
* payment provider says success but app pending
* duplicate event
* refund mismatch
* invoice mismatch
* subscription activation failed

Reconciliation may be:

* automatic job
* admin manual action
* provider API check
* payment admin review

Rules:

* permission required for manual reconciliation
* provider API credentials server-only
* reconciliation audited
* no fake status
* user dashboard shows pending until verified
* final correction logged

---

## 21. Invoice Numbering Rules

Invoice number format example:

```txt id="invoice-number-example"
MGP-26-27-0001
```

Meaning:

* `MGP` = My Gujarat Property
* `26-27` = financial year
* `0001` = sequential number

Rules:

1. invoice generated only after verified payment
2. sequence must be atomic/concurrency-safe
3. failed/pending payment cannot consume final invoice number
4. duplicate webhook cannot generate duplicate invoice
5. invoice number unique
6. invoice financial year based on India financial year
7. invoice data immutable after issued except legal correction/credit note rules
8. invoice PDF generated after invoice issued
9. invoice email sent only if email provider configured
10. invoice creation audited

If invoice generation fails after payment success:

* payment remains success
* subscription may activate if policy allows
* invoice job retried
* billing admin alert created
* user sees invoice pending/generated soon state
* no fake invoice PDF

---

## 22. Financial Year Rules

Indian financial year typically runs:

* April 1 to March 31

Invoice financial year labels:

* April 1, 2026 to March 31, 2027 → `26-27`
* April 1, 2027 to March 31, 2028 → `27-28`

Implementation must calculate based on IST/business timezone.

---

## 23. Invoice Fields

Invoice should include:

* invoice ID
* invoice number
* issue date
* financial year
* user/customer ID
* billing name
* billing address
* email
* mobile
* GSTIN if provided
* place of supply
* plan/add-on/ad description
* HSN/SAC code if required and confirmed
* taxable amount
* discount
* CGST
* SGST
* IGST
* total tax
* total amount
* payment ID
* payment method if available
* provider order/payment reference
* company/platform legal details
* terms/refund notes
* PDF media ID
* status

Legal/tax fields may need accountant/legal review.

---

## 24. GST Rules

GST system must support:

* GST optional at registration/billing
* GSTIN field
* B2B invoice
* B2C invoice
* place of supply
* CGST/SGST for intra-state where applicable
* IGST for inter-state where applicable
* taxable amount
* total tax
* GST invoice PDF
* GST notes
* credit note support

Rules:

1. GST calculation must be server-side.
2. GSTIN format validation required if provided.
3. Invalid GSTIN must not be accepted as valid.
4. User can update billing details before invoice generation.
5. Issued invoice changes require correction/credit note process.
6. GST settings must be admin-controlled.
7. Tax config changes audited.
8. Final tax/legal accuracy may require accountant review.

---

## 25. B2B / B2C Billing

B2B customer:

* has GSTIN
* company/business name
* business billing address
* place of supply
* GST invoice

B2C customer:

* no GSTIN
* individual billing name
* address/state
* consumer invoice

Rules:

* user must confirm billing details before payment or invoice
* invoice uses billing details at payment time
* post-issue changes require correction policy
* no fake GSTIN
* billing details private and RLS-protected

---

## 26. Billing Details UI

Billing details form should include:

* billing name
* company name optional
* GSTIN optional
* email
* mobile
* address
* city
* state
* pin code
* place of supply
* B2B/B2C selector or auto-detect from GSTIN
* save for future
* validation errors
* privacy notice

Rules:

* user can manage own billing details
* admin can view/edit only with permission
* billing details not public
* billing details not in SEO/cache/logs

---

## 27. Invoice PDF Rules

Invoice PDF:

* generated after invoice issued
* stored securely
* user can download own invoice
* admin can download with permission
* email sent if provider configured
* regeneration audited if allowed
* PDF provider setup-required if missing
* no fake PDF link
* no public invoice URL
* signed URL/private access where needed

Invoice PDF must not be accessible by other users.

---

## 28. Billing Dashboard

User billing dashboard must show:

* current plan
* subscription status
* plan expiry
* grace period
* trial status
* usage limits
* add-ons
* payment history
* invoices
* coupons used
* renewal/upgrade/downgrade options
* failed/pending payments
* refund status
* support link
* legal/refund/cancellation links

Rules:

* user sees own billing only
* no fake active plan
* pending payment shown pending
* failed payment shown failed
* invoice PDF only if generated
* setup-required if payment/PDF/email provider missing
* usage numbers real only

---

## 29. Usage Tracking

Usage may track:

* active properties
* active projects
* active requirements
* drafts
* image count
* storage used
* video used
* brochure uploaded
* floor plans uploaded
* proposals sent
* leads/contact unlocks
* agents added
* ad campaigns active
* featured/boost usage
* analytics access
* support priority

Rules:

* usage checked server-side
* usage updated after successful action
* usage decreases where appropriate on pause/delete/expiry depending plan rule
* no fake usage
* race conditions handled
* usage shown in dashboard

---

## 30. Grace Period

Grace period may apply after plan expiry/payment failure.

Grace behavior:

* user retains limited access temporarily
* posting may be disabled
* existing listings may remain active or limited according to plan
* warning shown
* renewal CTA shown
* notification sent if provider configured
* grace expiry job updates status
* no fake active plan

Grace rules must be clear per role/plan.

---

## 31. Expiry And Downgrade

When subscription expires:

Possible actions:

* disable new posting
* hide/pause extra active listings beyond free limit
* disable premium media/video
* disable new proposals/contact unlocks
* disable ads
* downgrade analytics
* retain dashboard access
* show renewal CTA
* notify user

Rules:

* do not delete user data automatically
* public listing behavior must be clear
* extra listings may be paused/limited, not silently deleted
* billing dashboard explains impact
* admin can review
* changes audited if admin-triggered

---

## 32. Cancellation

Cancellation may be:

* user-requested
* admin-requested
* payment failure
* fraud/security
* plan discontinued

Cancellation rules:

* show cancellation policy
* confirm impact
* no hidden auto-renew if not disclosed
* immediate or period-end cancellation based on plan
* no fake refund
* cancellation logged
* subscription status updated
* user notified

---

## 33. Refunds

Refunds must be controlled.

Refund rules:

* refund policy must be visible
* refund action permission-gated
* Razorpay refund if provider supports/configured
* manual refund recorded with audit
* refund status tracked
* subscription/add-on/ad access adjusted
* invoice status updated
* credit note generated where required
* user notified
* no fake refund success

Refund statuses:

* `requested`
* `under_review`
* `approved`
* `rejected`
* `processing`
* `processed`
* `failed`
* `cancelled`

---

## 34. Credit Notes

Credit note may be required for refund/correction.

Credit note fields:

* credit note number
* linked invoice
* reason
* amount
* tax reversal
* issue date
* PDF
* status
* created by
* audit log

Rules:

* permission required
* linked to issued invoice
* legal/accounting review may be needed
* no duplicate credit note
* no fake credit note PDF
* invoice status updated accordingly

---

## 35. Manual Activation

Manual activation is risky.

Allowed only for:

* bank transfer/offline payment if future approved
* payment reconciliation issue
* compensation/support case
* admin-granted trial/plan
* approved exception

Rules:

1. permission required: `can_manual_activate`
2. reason required
3. supporting reference required where applicable
4. Super Admin or maker-checker recommended
5. audit log required
6. user notified
7. invoice rule must be clear
8. no fake Razorpay success
9. manual activation label/status retained
10. abuse monitored

Manual activation must not pretend it came from verified Razorpay payment.

---

## 36. Offline Payment

Offline payment is not default unless approved.

If implemented:

* bank/UPI details controlled by admin
* proof upload
* admin verification
* manual activation after review
* invoice after approval/payment confirmation
* audit trail
* fraud checks
* no fake online payment success

Until implemented, offline payment should be disabled or setup-required.

---

## 37. Ads And Promotion Billing

Ads/promotions may require:

* campaign plan
* selected project
* banner upload
* target city/all Gujarat
* duration
* payment
* approval
* active date
* expiry date

Ad activation requires:

1. builder role
2. approved/published project
3. RERA compliance where applicable
4. ad creative approved
5. payment verified or approved manual exception
6. campaign active date
7. not expired
8. feature/provider ready

Ad must not show if:

* unpaid
* pending payment
* failed payment
* unapproved
* expired
* paused
* project unpublished
* RERA invalid where required
* builder unauthorized

No fake impressions/clicks.

---

## 38. Featured / Boost Billing

Featured/boost may apply to:

* property
* project
* profile
* ad campaign

Rules:

* payment verified before activation
* feature duration clear
* start/end date stored
* sponsored/featured label shown
* ranking rules documented
* no fake boost
* no expired boost active
* no unpaid boost active
* public display transparent

---

## 39. Admin Billing Module

Admin billing module must support:

* subscriptions list
* user billing details
* current plan
* usage
* trial status
* expiry/grace
* invoices
* payment history
* add-ons
* manual actions if permitted
* internal notes
* audit timeline
* filters/search
* export if permitted

Admin billing actions:

* view subscription
* grant trial if permitted
* adjust plan if permitted
* cancel subscription if permitted
* extend grace if permitted
* manual activation if permitted
* add internal note
* export report if permitted

All sensitive actions audited.

---

## 40. Payment Admin Module

Payment admin must support:

* payment list
* provider order ID
* provider payment ID
* amount
* tax
* status
* verification status
* webhook status
* customer/user
* plan/add-on/ad
* coupon
* invoice link
* refund status
* safe provider payload summary
* reconciliation tools
* internal notes
* audit timeline

Payment admin actions:

* view payment
* reconcile payment
* retry webhook processing where safe
* mark duplicate
* initiate refund if permitted
* manual activation if permitted
* create support ticket
* export if permitted

Payment admin must not expose raw secrets.

---

## 41. Plan Admin Module

Plan admin must support:

* role-specific plans
* plan name
* slug
* description
* price
* billing cycle
* GST settings
* limits
* features
* public/private visibility
* trial settings
* add-ons
* active/inactive
* preview pricing page
* history/revisions
* maker-checker for high-risk changes where implemented

Rules:

* plan changes audited
* active subscriber impact shown
* old plans preserved for existing subscriptions where needed
* no silent limit changes harming users without policy
* pricing changes require permission

---

## 42. Coupon Admin Module

Coupon admin must support:

* create coupon
* edit coupon
* activate/deactivate
* usage count
* allowed roles
* allowed plans
* date range
* discount type/value
* per-user limit
* total usage limit
* audit log
* redemption report

Rules:

* coupon changes audited
* invalid/expired coupon not accepted
* race conditions handled
* no fake discount

---

## 43. Trial Admin Module

Trial admin must support:

* create trial campaign
* grant trial to user
* revoke trial
* extend trial
* view trial usage
* expiry tracking
* conversion tracking
* abuse detection

Rules:

* grant/revoke/extend audited
* trial limits enforced
* trial expiry real
* no auto-charge without explicit disclosure and implementation

---

## 44. Billing Notifications

Notifications may be created for:

* plan purchased
* subscription activated
* payment pending
* payment failed
* payment verified
* invoice generated
* invoice email failed
* plan expiring soon
* plan expired
* grace started
* grace ending
* trial started
* trial expiring
* trial expired
* coupon applied
* refund requested
* refund processed
* credit note issued
* ad campaign activated
* ad campaign expiring
* manual activation by admin

External delivery depends on provider status.

No fake delivery.

---

## 45. Email/SMS/WhatsApp Billing Messages

External messages may include:

* payment receipt
* invoice email
* plan expiry reminder
* failed payment reminder
* refund status
* trial expiry
* ad campaign status

Rules:

* provider must be configured
* opt-in/preferences respected where applicable
* legal transactional messages handled correctly
* delivery logs real only
* no fake sent
* no raw payment/private data in unsafe channel
* unsubscribe applies to marketing, not necessary transactional messages where law permits

---

## 46. Billing Security Rules

Security requirements:

* server-side price calculation
* server-side plan validation
* server-side coupon validation
* server-side payment order creation
* webhook signature verification
* idempotency
* RLS for user billing
* admin permission checks
* no provider secrets client-side
* no raw payment payload public
* no fake success
* no client-only subscription activation
* invoice access user-scoped
* refund permission
* manual activation audit
* rate limits for payment order/coupon apply
* safe errors
* log redaction

---

## 47. Billing RLS Rules

RLS must enforce:

* user can view own subscriptions
* user can view own payments
* user can view own invoices
* user can view own billing details
* user can update own billing details before invoice rules allow
* user cannot view another user’s billing
* staff/admin can view billing only with permission
* payment manager can view payment module
* billing manager can view billing module
* refund/manual activation restricted
* webhook events server/admin only
* invoice PDF user/admin scoped
* plan public view only shows active public plans
* provider settings restricted
* audit logs protected

---

## 48. Billing Direct URL Bypass Tests

Test direct access for:

* another user’s billing dashboard
* another user’s invoice PDF
* another user’s payment history
* checkout for wrong role plan
* checkout with manipulated amount
* coupon apply with wrong role
* admin payment route without permission
* refund action without permission
* manual activation without permission
* provider webhook route with invalid signature
* duplicate webhook
* failed payment plan activation attempt
* pending payment plan activation attempt

Unauthorized must be denied.

---

## 49. Billing Error Handling

Use safe errors:

* `SUBSCRIPTION_REQUIRED`
* `PLAN_NOT_FOUND`
* `PLAN_INACTIVE`
* `PLAN_ROLE_MISMATCH`
* `PLAN_LIMIT_REACHED`
* `COUPON_INVALID`
* `COUPON_EXPIRED`
* `COUPON_NOT_ELIGIBLE`
* `PAYMENT_PROVIDER_SETUP_REQUIRED`
* `PAYMENT_ORDER_FAILED`
* `PAYMENT_PENDING_VERIFICATION`
* `PAYMENT_VERIFICATION_FAILED`
* `WEBHOOK_SIGNATURE_INVALID`
* `PAYMENT_FAILED`
* `INVOICE_PENDING`
* `INVOICE_GENERATION_FAILED`
* `REFUND_NOT_ALLOWED`
* `FORBIDDEN`
* `RATE_LIMITED`

Do not expose raw Razorpay/SQL errors.

---

## 50. Rate Limits

Rate limits required for:

* checkout/order creation
* coupon apply
* payment verification endpoint
* webhook processing safeguards
* invoice PDF download
* refund request
* billing details update
* manual admin payment actions
* provider test buttons
* ad campaign creation
* lead/contact unlock purchase

Rate limit failure must be safe.

---

## 51. Logging Rules

Do not log:

* Razorpay key secret
* webhook secret
* raw payment signature
* full raw provider payload with sensitive data
* full card/bank data
* OTP
* service role key
* full hidden contact
* private invoice URL
* private billing address in public logs

Safe logs:

* payment ID
* order ID
* status
* amount
* safe error code
* webhook event ID
* user/profile ID internal
* timestamp
* retry count

---

## 52. Refund / Cancellation Policy Pages

Legal/CMS must include:

* Refund Policy
* Cancellation Policy
* Payment Policy
* Terms & Conditions
* Privacy Policy
* GST/tax note where needed
* Trial policy
* Ads/payment policy where needed

Billing UI should link to relevant policies before payment.

Final policy wording may require legal review.

---

## 53. Database Tables

Suggested tables:

* `plans`
* `plan_features`
* `plan_limits`
* `subscriptions`
* `subscription_events`
* `trial_grants`
* `addons`
* `addon_purchases`
* `coupons`
* `coupon_redemptions`
* `billing_profiles`
* `payments`
* `payment_attempts`
* `payment_webhook_events`
* `payment_reconciliation_events`
* `invoices`
* `invoice_sequences`
* `invoice_items`
* `invoice_pdfs`
* `refunds`
* `credit_notes`
* `credit_note_items`
* `usage_counters`
* `billing_notifications`
* `payment_admin_actions`
* `audit_logs`
* `provider_settings`

Actual schema may vary, but all behavior must exist.

---

## 54. Suggested Table Fields

## 54.1 `plans`

Fields:

* `id`
* `role`
* `name`
* `slug`
* `description`
* `plan_type`
* `billing_cycle`
* `price`
* `currency`
* `is_public`
* `status`
* `features`
* `limits`
* `gst_applicable`
* `trial_available`
* `created_at`
* `updated_at`
* `deleted_at`

---

## 54.2 `subscriptions`

Fields:

* `id`
* `profile_id`
* `plan_id`
* `status`
* `source`
* `started_at`
* `current_period_start`
* `current_period_end`
* `trial_start`
* `trial_end`
* `grace_until`
* `cancelled_at`
* `cancel_reason`
* `created_at`
* `updated_at`

---

## 54.3 `payments`

Fields:

* `id`
* `profile_id`
* `subscription_id`
* `plan_id`
* `addon_id`
* `ad_campaign_id`
* `provider`
* `provider_order_id`
* `provider_payment_id`
* `amount`
* `discount_amount`
* `taxable_amount`
* `tax_amount`
* `total_amount`
* `currency`
* `status`
* `verification_status`
* `coupon_id`
* `billing_profile_snapshot`
* `safe_provider_summary`
* `created_at`
* `updated_at`

---

## 54.4 `payment_webhook_events`

Fields:

* `id`
* `provider`
* `provider_event_id`
* `event_type`
* `signature_verified`
* `payment_id`
* `provider_order_id`
* `provider_payment_id`
* `processing_status`
* `payload_hash`
* `safe_error_code`
* `processed_at`
* `created_at`

---

## 54.5 `invoices`

Fields:

* `id`
* `profile_id`
* `payment_id`
* `subscription_id`
* `invoice_number`
* `financial_year`
* `billing_name`
* `billing_email`
* `billing_mobile`
* `billing_address`
* `gstin`
* `place_of_supply`
* `customer_type`
* `taxable_amount`
* `discount_amount`
* `cgst_amount`
* `sgst_amount`
* `igst_amount`
* `total_tax_amount`
* `total_amount`
* `status`
* `issued_at`
* `pdf_media_id`
* `created_at`

---

## 54.6 `invoice_sequences`

Fields:

* `id`
* `financial_year`
* `last_number`
* `prefix`
* `created_at`
* `updated_at`

Sequence update must be concurrency-safe.

---

## 54.7 `billing_profiles`

Fields:

* `id`
* `profile_id`
* `billing_name`
* `company_name`
* `gstin`
* `email`
* `mobile`
* `address_line`
* `city`
* `state`
* `pin_code`
* `place_of_supply`
* `customer_type`
* `is_default`
* `created_at`
* `updated_at`

---

## 54.8 `coupons`

Fields:

* `id`
* `code`
* `discount_type`
* `discount_value`
* `max_discount_amount`
* `valid_from`
* `valid_until`
* `usage_limit`
* `per_user_limit`
* `allowed_roles`
* `allowed_plan_ids`
* `status`
* `created_by_staff_id`
* `created_at`
* `updated_at`

---

## 54.9 `coupon_redemptions`

Fields:

* `id`
* `coupon_id`
* `profile_id`
* `payment_id`
* `status`
* `discount_amount`
* `redeemed_at`
* `created_at`

---

## 54.10 `refunds`

Fields:

* `id`
* `payment_id`
* `invoice_id`
* `profile_id`
* `amount`
* `reason`
* `status`
* `provider_refund_id`
* `requested_by_profile_id`
* `approved_by_staff_id`
* `processed_at`
* `created_at`
* `updated_at`

---

## 54.11 `credit_notes`

Fields:

* `id`
* `invoice_id`
* `credit_note_number`
* `reason`
* `taxable_amount`
* `tax_amount`
* `total_amount`
* `status`
* `issued_at`
* `pdf_media_id`
* `created_by_staff_id`
* `created_at`

---

## 54.12 `usage_counters`

Fields:

* `id`
* `profile_id`
* `subscription_id`
* `usage_key`
* `used_count`
* `limit_count`
* `period_start`
* `period_end`
* `updated_at`

---

## 55. Index Expectations

Indexes required for:

* plans by role/status
* subscriptions by profile/status
* subscriptions by expiry/grace
* payments by profile/status
* payments by provider_order_id
* payments by provider_payment_id
* webhook events by provider_event_id unique
* invoices by profile
* invoices by invoice_number unique
* invoice sequences by financial_year unique
* coupons by code unique
* coupon redemptions by coupon/profile/payment
* refunds by payment/status
* billing profiles by profile
* usage counters by profile/subscription/key
* admin payment filters by date/status/provider
* admin subscription filters by role/status/expiry

---

## 56. Migration Expectations

Billing implementation requires SQL migrations for:

* plans
* subscriptions
* payments
* webhook events
* invoices
* invoice sequences
* billing profiles
* coupons
* coupon redemptions
* trials
* add-ons
* refunds
* credit notes
* usage counters
* RLS policies
* indexes
* audit logs
* public pricing views

Migration must include:

* header
* purpose
* phase
* tables changed
* RLS changed yes/no
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 57. Payment Webhook Route Requirements

Webhook route must:

* use raw body
* verify signature
* reject invalid signature
* store event
* process idempotently
* update payment
* update subscription/add-on/ad
* generate invoice
* enqueue notification
* return appropriate status
* not expose sensitive errors

Webhook route must use Node runtime if raw body/crypto/provider SDK requires it.

Do not run webhook on unsupported Edge runtime if it breaks signature verification.

---

## 58. Caching Rules

Do not publicly cache:

* billing dashboard
* checkout
* payment records
* invoices
* payment admin
* subscription admin
* refund data
* webhook event data
* billing profile
* coupon redemption
* user-specific plan usage

Public pricing page may be cached if public-safe.

Revalidate pricing after plan changes.

Revalidate user billing after payment/subscription changes.

---

## 59. Performance Rules

Billing performance requirements:

* payment admin tables paginated
* invoice list paginated
* subscription list paginated
* webhook processing fast
* heavy invoice PDF generation async if needed
* provider calls timeout-safe
* no unbounded payment queries
* indexed provider IDs
* indexed invoice numbers
* indexed subscription expiry jobs
* coupon validation efficient
* no slow provider call blocking public pages

---

## 60. Provider Status Rules

Billing depends on providers:

| Provider          | Usage                           | Status Before Config |
| ----------------- | ------------------------------- | -------------------- |
| Razorpay          | payments                        | `SETUP_REQUIRED`     |
| Email provider    | invoice/receipt email           | `SETUP_REQUIRED`     |
| SMS provider      | billing alerts if used          | `SETUP_REQUIRED`     |
| WhatsApp provider | billing alerts if used          | `SETUP_REQUIRED`     |
| PDF provider      | invoice PDF if external         | `SETUP_REQUIRED`     |
| Storage provider  | invoice PDF storage             | `SETUP_REQUIRED`     |
| Cron/job provider | expiry/reminders/reconciliation | `SETUP_REQUIRED`     |

If provider missing, UI must show setup-required or fallback.

No fake provider success.

---

## 61. Manual Verification Checklist

Manual verification must check:

### Plans

* owner plans visible correctly
* broker plans visible correctly
* builder plans visible correctly
* wrong role cannot buy wrong plan
* inactive plan not purchasable
* plan limits displayed honestly
* no fake popular/discount claims

### Posting Gates

* owner without plan blocked if required
* broker without plan blocked if required
* builder without plan blocked from project if required
* limit reached blocks action
* direct URL/API cannot bypass gate
* server-side enforcement works

### Coupons

* valid coupon applies
* expired coupon rejected
* wrong role coupon rejected
* usage limit enforced
* client cannot manipulate discount

### Payment

* Razorpay setup-required if missing
* order created server-side
* client amount not trusted
* cancelled payment stays inactive
* failed payment stays inactive
* pending payment stays pending
* webhook success activates subscription
* invalid webhook signature rejected
* duplicate webhook not double-activating
* no invoice before verified payment

### Invoice / GST

* invoice generated after verified payment
* invoice number sequential
* failed payment no invoice
* GSTIN validation
* B2B invoice fields
* B2C invoice fields
* CGST/SGST/IGST logic checked or marked needs accountant review
* invoice PDF access own only
* wrong user denied invoice

### Billing Dashboard

* current plan real
* usage real
* invoices real
* failed/pending visible
* trial expiry visible
* add-ons visible
* setup-required states clear

### Admin

* payment admin permission works
* billing admin permission works
* refund permission works
* manual activation permission works
* audit log created
* raw secrets hidden
* export permission enforced

### Security/RLS

* user cannot view another user’s billing
* staff without permission denied
* webhook invalid signature blocked
* service role not client
* raw provider errors hidden
* logs redacted

### Responsive

* pricing page mobile
* checkout page mobile
* billing dashboard mobile
* admin payment table mobile
* invoice list mobile

Widths:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

---

## 62. Feature Registry Items Required

`FEATURE_REGISTRY.md` must track:

* role-specific plans
* owner plan limits
* broker plan limits
* builder plan limits
* pricing page
* subscription-required gate
* posting limit enforcement
* media/add-on limits
* trial system
* coupon system
* checkout flow
* Razorpay order creation
* Razorpay checkout
* Razorpay webhook
* payment idempotency
* payment reconciliation
* subscription activation
* invoice generation
* invoice number sequence
* GST billing
* B2B billing
* B2C billing
* invoice PDF
* billing dashboard
* payment history
* refunds
* credit notes
* cancellation
* grace period
* expiry/downgrade
* billing notifications
* admin billing module
* admin payment module
* plan admin
* coupon admin
* trial admin
* payment RLS policies
* invoice RLS policies
* billing manual verification

Each item must have real status.

---

## 63. Common Bugs To Track

Create bug if:

* plan activates from client callback only
* failed payment activates plan
* pending payment activates plan
* invalid webhook signature accepted
* duplicate webhook generates duplicate invoice
* failed payment generates invoice
* invoice number skipped for failed payment
* user sees another user invoice
* user sees another user payment
* wrong role buys wrong plan
* posting gate bypassed
* plan limit checked only in UI
* coupon discount manipulated client-side
* expired coupon accepted
* GSTIN invalid but accepted
* raw Razorpay secret exposed
* raw webhook payload exposed publicly
* payment admin visible without permission
* refund works without permission
* manual activation lacks audit
* invoice PDF public
* pricing page shows unavailable feature as active
* fake active plan shown
* fake payment success shown
* fake invoice PDF shown
* test payment mode used in production
* provider setup-required hidden as success

---

## 64. Current Billing/Payment Status

As of this documentation generation stage:

| Area                        | Status           |
| --------------------------- | ---------------- |
| Role-specific plans         | `NOT_STARTED`    |
| Owner plan limits           | `NOT_STARTED`    |
| Broker plan limits          | `NOT_STARTED`    |
| Builder plan limits         | `NOT_STARTED`    |
| Pricing page                | `NOT_STARTED`    |
| Subscription gate           | `NOT_STARTED`    |
| Posting limit enforcement   | `NOT_STARTED`    |
| Trial system                | `NOT_STARTED`    |
| Coupon system               | `NOT_STARTED`    |
| Add-ons                     | `NOT_STARTED`    |
| Razorpay provider           | `SETUP_REQUIRED` |
| Payment order creation      | `NOT_STARTED`    |
| Checkout UI                 | `NOT_STARTED`    |
| Razorpay webhook            | `SETUP_REQUIRED` |
| Webhook verification        | `NOT_STARTED`    |
| Payment idempotency         | `NOT_STARTED`    |
| Payment reconciliation      | `NOT_STARTED`    |
| Subscription activation     | `NOT_STARTED`    |
| Invoice generation          | `NOT_STARTED`    |
| Invoice sequence            | `NOT_STARTED`    |
| GST billing                 | `NOT_STARTED`    |
| B2B/B2C billing             | `NOT_STARTED`    |
| Invoice PDF                 | `SETUP_REQUIRED` |
| Billing dashboard           | `NOT_STARTED`    |
| Refunds                     | `NOT_STARTED`    |
| Credit notes                | `NOT_STARTED`    |
| Grace/expiry/downgrade      | `NOT_STARTED`    |
| Admin billing               | `NOT_STARTED`    |
| Admin payment               | `NOT_STARTED`    |
| Payment RLS                 | `NOT_STARTED`    |
| Billing manual verification | `NOT_STARTED`    |

---

## 65. Documentation Generation Progress

| File No. | File                                                      | Status  |
| -------: | --------------------------------------------------------- | ------- |
|        1 | `CLAUDE.md`                                               | Created |
|        2 | `brain.md`                                                | Created |
|        3 | `FEATURE_REGISTRY.md`                                     | Created |
|        4 | `CHANGELOG.md`                                            | Created |
|        5 | `BUGS_AND_FIXES.md`                                       | Created |
|        6 | `MANUAL_VERIFICATION.md`                                  | Created |
|        7 | `API_PROVIDER_STATUS.md`                                  | Created |
|        8 | `DEPLOYMENT_ROLLBACK.md`                                  | Created |
|        9 | `SECURITY_RLS_CHECKLIST.md`                               | Created |
|       10 | `PERFORMANCE_CHECKLIST.md`                                | Created |
|       11 | `docs/01_PROJECT_MASTER_AND_SCOPE.md`                     | Created |
|       12 | `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`        | Created |
|       13 | `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`         | Created |
|       14 | `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`        | Created |
|       15 | `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`          | Created |
|       16 | `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`     | Created |
|       17 | `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`     | Created |
|       18 | `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`              | Created |
|       19 | `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`       | Created |
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`    | Pending |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Pending |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Pending |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Pending |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Pending |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 66. Related Documents

This file must stay aligned with:

* `CLAUDE.md`
* `brain.md`
* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`
* `BUGS_AND_FIXES.md`
* `MANUAL_VERIFICATION.md`
* `API_PROVIDER_STATUS.md`
* `DEPLOYMENT_ROLLBACK.md`
* `SECURITY_RLS_CHECKLIST.md`
* `PERFORMANCE_CHECKLIST.md`
* `docs/01_PROJECT_MASTER_AND_SCOPE.md`
* `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`
* `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`
* `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`
* `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`
* `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`
* `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`
* `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`
* `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
* `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
* `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
* `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`
* implementation prompts
* manual verification prompts
* SQL migrations
* RLS policies

---

## 67. Final Billing Rule

Billing must be real.

Plans must be role-specific.

Plan limits must be enforced server-side.

Payment amount must be server-calculated.

Razorpay payment must be verified server-side.

Webhook signature verification is mandatory.

Client callback cannot activate subscription.

Failed payment cannot activate plan.

Pending payment cannot activate plan.

Invoice must be generated only after verified payment.

GST and invoice data must be private and accurate.

Refunds, credit notes and manual activation require permission and audit.

Provider missing means setup-required.

No fake active plan.

No fake payment success.

No fake invoice.

No fake GST.

No fake PASS.
