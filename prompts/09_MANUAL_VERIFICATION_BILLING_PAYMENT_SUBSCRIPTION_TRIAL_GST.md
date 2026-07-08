# prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md

# My Gujarat Property — Prompt 09 Manual Verification: Billing, Payment, Subscription, Trial And GST

> **DESIGN-MATCH CHECK (mandatory):** Verify built screens match `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 10 & 12** and all `docs/09` "Design Add-Ons". Confirm: metered plan resources (reveal quota, featured slots, ad-spend wallet auto-pause, team seats, proposals/mo), GST jurisdiction (CGST+SGST/IGST), coupon-on-invoice, honest payment states (success only after verified callback).

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
```

This prompt verifies the **Billing, Payment, Subscription, Trial and GST** phase.

Do not skip this verification.

Do not start Prompt 10 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real payment security, webhook, subscription, invoice, GST, RLS, private cache, provider secret and docs checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
Prompt Number: 09 Verification
Phase: Billing, Payment, Subscription, Trial And GST
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
Previous Prompt: prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
Next Implementation Prompt: prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that billing and payment behavior is secure, honest, role-scoped and provider-safe.

This verification checks:

* pricing page
* role-wise plans
* plan features
* plan limits
* subscriptions
* subscription lifecycle
* posting gates
* usage counters
* checkout order creation
* payment attempts
* Razorpay provider setup
* Razorpay webhook endpoint
* webhook signature verification
* webhook idempotency
* client callback safety
* payment records
* reconciliation foundation
* invoices
* invoice numbering
* GST profile
* GST breakdown
* trials
* coupons
* add-ons
* refunds
* credit notes
* cancellation/downgrade/grace foundation
* billing dashboards
* admin billing controls
* billing permissions
* billing audit logs
* RLS policies
* wrong-user billing denial
* provider secret masking
* private noindex/no-store
* no fake payment
* no fake active plan
* no fake invoice
* no fake GST
* no fake refund
* responsive billing UI
* docs updates
* Prompt 10 readiness

This phase does not verify final production Razorpay go-live, GST filing, accounting integrations, bank reconciliation integrations, automated refund settlement, media billing enforcement, ads billing lifecycle, or final production payment signoff. Those are later or external operational checks.

---

## 3. Required Docs To Read First

Before verification, read:

```txt id="required-docs"
CLAUDE.md
brain.md
FEATURE_REGISTRY.md
CHANGELOG.md
BUGS_AND_FIXES.md
MANUAL_VERIFICATION.md
API_PROVIDER_STATUS.md
DEPLOYMENT_ROLLBACK.md
SECURITY_RLS_CHECKLIST.md
PERFORMANCE_CHECKLIST.md
prompts/00_PROMPT_USAGE_RULES.md
prompts/01_PROJECT_SETUP_BASELINE.md
prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md
prompts/02_AUTH_ROLES_RLS_FOUNDATION.md
prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md
prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md
prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md
docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md
docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md
docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md
docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md
docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect all changed implementation files from Prompt 09.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* pricing and plan display
* plan catalog
* role-wise subscription logic
* subscription status lifecycle
* posting gates
* usage counters
* Razorpay checkout foundation
* webhook signature verification
* webhook idempotency
* payment records
* invoices and GST foundation
* trials and coupons
* add-ons
* refunds and credit notes
* cancellation/downgrade/grace foundation
* user billing dashboard
* admin billing dashboard
* admin permissions
* audit logs
* billing RLS
* provider secret safety
* private cache/noindex
* docs/checklist updates

This verification does not cover:

* final production Razorpay activation
* real bank settlement
* automated GST filing
* external accounting export
* final legal/tax signoff
* media upload billing enforcement if media not implemented
* ad promotion billing if ads not implemented
* external email/SMS/WhatsApp invoice delivery if providers missing
* final production payment test with real money unless explicitly configured and approved

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 09 changed files
3. inspect SQL migration
4. inspect billing tables and RLS
5. inspect plan catalog and pricing page
6. inspect subscription model
7. inspect plan gate helper
8. inspect posting gate integration
9. inspect checkout order creation
10. inspect Razorpay provider setup
11. inspect webhook endpoint
12. inspect webhook signature verification
13. inspect webhook idempotency
14. inspect client callback behavior
15. inspect invoice generation
16. inspect invoice numbering
17. inspect GST profile and invoice tax fields
18. inspect trial/coupon/add-on rules
19. inspect refund/credit note foundation
20. inspect billing dashboard pages
21. inspect admin billing pages and permissions
22. search for fake payment/subscription/invoice/GST/refund
23. search for provider secret leaks
24. verify private noindex/cache
25. run available automated checks
26. run manual smoke checks where possible
27. test responsive widths
28. update required docs
29. create bugs for failures
30. decide verification result
31. update `brain.md`
32. prepare Prompt 10 readiness note

Do not skip docs updates.

---

## 6. Required File Inspection

Inspect likely changed files:

```txt id="file-inspection"
src/app/pricing/page.*
app/pricing/page.*
src/app/dashboard/billing/
app/dashboard/billing/
src/app/dashboard/owner/billing/
app/dashboard/owner/billing/
src/app/dashboard/broker/billing/
app/dashboard/broker/billing/
src/app/dashboard/builder/billing/
app/dashboard/builder/billing/
src/app/admin/billing/
app/admin/billing/
src/app/admin/payments/
app/admin/payments/
src/app/admin/plans/
app/admin/plans/
src/app/admin/coupons/
app/admin/coupons/
src/app/admin/trials/
app/admin/trials/
src/app/api/razorpay/
app/api/razorpay/
src/app/api/webhooks/
app/api/webhooks/
src/components/billing/
components/billing/
src/components/pricing/
components/pricing/
src/lib/billing/
lib/billing/
src/lib/payments/
lib/payments/
src/lib/razorpay/
lib/razorpay/
src/lib/actions/billing.*
lib/actions/billing.*
src/lib/actions/payments.*
lib/actions/payments.*
src/lib/permissions/
lib/permissions/
src/lib/supabase/
lib/supabase/
src/types/billing.*
types/billing.*
src/types/payments.*
types/payments.*
supabase/migrations/
```

Also inspect docs:

```txt id="docs-to-check"
FEATURE_REGISTRY.md
CHANGELOG.md
BUGS_AND_FIXES.md
MANUAL_VERIFICATION.md
API_PROVIDER_STATUS.md
DEPLOYMENT_ROLLBACK.md
SECURITY_RLS_CHECKLIST.md
PERFORMANCE_CHECKLIST.md
brain.md
```

Record exact changed files.

---

## 7. Migration Verification

If Prompt 09 changed database schema, verify migration exists.

Expected pattern:

```txt id="expected-migration"
supabase/migrations/*_billing_payment_subscription_trial_gst.sql
```

Verify migration includes:

* purpose
* phase: Prompt 09
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* invoice sequence/function if any
* webhook idempotency constraints
* unique constraints
* destructive changes yes/no
* backup required yes/no
* rollback notes

If DB changed without migration:

* create critical bug
* mark verification `FAIL`
* do not start Prompt 10

If migration exists without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL` depending data/payment risk

If DB not changed because Supabase/env unavailable:

* mark DB/RLS runtime checks `SETUP_REQUIRED`
* do not claim RLS PASS

---

## 8. Expected Table Verification

If schema exists, check for implemented or reused tables.

Possible tables:

```txt id="expected-billing-tables"
plans
plan_features
plan_limits
subscriptions
subscription_events
usage_counters
payment_orders
payment_attempts
payments
payment_webhook_events
invoices
invoice_line_items
gst_profiles
coupons
coupon_redemptions
trials
trial_redemptions
add_ons
add_on_purchases
refunds
credit_notes
billing_audit_logs
```

Minimum safe foundation should include:

* plan/catalog storage or safe config
* subscription records
* payment order/attempt records if checkout implemented
* webhook event records if webhook implemented
* invoice records if invoice implemented
* RLS enabled on private tables
* indexes for profile/status/provider references
* unique/idempotency constraints where needed

If implementation claims billing complete but storage/RLS is missing:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 9. Pricing Page Verification

Verify pricing page:

* loads safely
* shows role-wise plans
* distinguishes Owner/Broker/Builder plans
* shows real configured plans or setup-required state
* shows features/limits honestly
* shows GST/tax note
* shows login required for checkout when guest
* shows checkout disabled/setup-required if provider missing
* does not show fake final prices unless product owner provided them
* does not show fake discounts
* does not show fake active plan
* mobile responsive
* no dead CTA
* no `href="#"`

If pricing page shows fake active discount/plan as real:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 10. Plan Catalog Verification

Verify plan catalog:

* role field exists:

  * owner
  * broker
  * builder
* plan code/name exists
* price/currency INR exists
* billing cycle exists
* active/inactive status exists
* feature list exists
* limits exist
* display order exists
* public visibility intentional
* admin/internal fields not public
* no inactive/internal plan public unless intended
* no fake unlimited claim unless enforced

If features are shown as included but not enforced and not documented partial:

* create bug
* mark `PARTIAL`

---

## 11. Role-Wise Plan Verification

Verify:

### Owner

* Owner plans control property/requirement posting.
* Owner cannot buy/use builder project plan as Owner without role change/approval.
* Owner does not get project posting.

### Broker

* Broker plans control property/requirement posting and CRM/lead limits if implemented.
* Broker cannot buy/use builder project plan without role change/approval.
* Broker does not get project posting.

### Builder

* Builder plans control project posting and builder-specific limits.
* Builder does not get normal property posting.
* Builder does not get owner/broker requirement posting unless product explicitly later approves.

If role plan allows forbidden role features:

* create bug
* mark `FAIL` if it creates access bypass

---

## 12. Subscription Model Verification

Verify subscription records include:

* profile/user link
* role
* plan ID
* status
* billing cycle
* start date
* current period start/end
* trial/grace fields if used
* cancelled/expired fields
* provider reference if payment-backed
* created/updated timestamps

Subscription statuses:

```txt id="subscription-statuses"
none
trialing
active
past_due
grace
cancelled
expired
paused
downgraded
payment_failed
pending_activation
admin_granted
```

Check:

* expired/cancelled not treated active
* pending_activation not treated active
* only verified payment/approved trial/admin grant activates
* admin_granted audited
* one current active/trial/grace subscription per profile/role unless explicitly documented

If inactive subscription grants access:

* create bug
* mark `FAIL`

---

## 13. Subscription Lifecycle Verification

Verify lifecycle transitions:

```txt id="subscription-lifecycle-checks"
none → trialing
none → pending_activation
pending_activation → active
trialing → active
trialing → expired
active → past_due
past_due → grace
grace → active
grace → expired
active → cancelled
active → downgraded
active → paused
cancelled → expired
```

Rules:

* transitions validated server-side
* invalid transitions denied
* payment_failed does not activate plan
* trial expiry behavior documented
* grace expiry behavior documented
* subscription events recorded if implemented
* no fake lifecycle status

If arbitrary client can set subscription active:

* create critical bug
* mark `FAIL`

---

## 14. Plan Gate Helper Verification

Verify plan gate helper:

* server-side
* role-aware
* feature-aware
* checks subscription status
* checks trial/grace/admin_granted if allowed
* checks usage counter
* checks account status where applicable
* returns safe typed denial reason
* does not trust client plan state
* does not fake pass when billing setup missing
* works for owner/broker/builder

If plan gate only exists in UI and backend allows bypass:

* create critical bug
* mark `FAIL`

---

## 15. Posting Gate Verification

Verify posting gates for:

* property create/submit
* project create/submit
* requirement create/submit

Expected:

* guest denied
* wrong role denied from previous prompts
* no active/trial/grace subscription triggers pricing/setup-required
* active plan with limit allows action
* exceeded limit denies action
* usage counters update server-side
* no fake remaining quota
* no client-only gate
* direct API/action bypass denied

If posting gate is claimed active but can be bypassed by server action:

* create critical bug
* mark `FAIL`

If posting gate intentionally remains partial until billing provider configured:

* document exact status
* ensure no fake pass claim

---

## 16. Usage Counter Verification

Verify usage counters:

* profile/subscription scoped
* feature key scoped
* period scoped if applicable
* updated server-side
* not client-manipulable
* race-condition safe where possible
* reset behavior documented
* active listing counts real
* contact unlock usage real if integrated
* no fake remaining quota

If user can manipulate usage counter from client:

* create bug
* mark `FAIL`

---

## 17. Checkout Order Verification

Verify checkout order creation:

* requires auth
* validates role
* validates plan active
* validates plan belongs to user role
* validates price server-side
* validates currency INR
* applies coupon server-side
* creates payment order/attempt
* does not activate subscription
* handles provider missing as setup-required
* returns only safe client fields
* does not expose key secret/webhook secret

If checkout trusts client price:

* create critical bug
* mark `FAIL`

---

## 18. Razorpay Provider Setup Verification

If Razorpay implemented, verify env usage:

```txt id="razorpay-env"
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
```

Check:

* key secret server-only
* webhook secret server-only
* public/client only receives key ID if needed
* missing keys show `RAZORPAY_SETUP_REQUIRED`
* test/live mode documented
* no fake production payment
* provider status in `API_PROVIDER_STATUS.md` honest
* provider errors safe

If key secret exposed to client:

* create critical bug
* mark `FAIL`

---

## 19. Client Callback Verification

Verify Razorpay/client callback behavior:

* records checkout attempt only if needed
* does not activate subscription
* does not mark invoice paid
* does not generate invoice
* does not mark payment verified
* shows pending/processing state until webhook verification
* handles failure/cancel safely
* duplicate callback idempotent/safe

If client callback activates plan:

* create critical bug
* mark `FAIL`

---

## 20. Webhook Endpoint Verification

Verify webhook endpoint:

* route exists if payment provider implemented
* receives raw body if required by Razorpay signature verification
* verifies signature using webhook secret
* validates event type
* validates local order/payment references
* validates amount
* validates currency INR
* stores webhook event record
* enforces idempotency
* updates payment/order in transaction where possible
* activates subscription/add-on only after verified event
* generates invoice only after verified event
* handles duplicate webhook safely
* returns safe status
* does not leak secrets/errors

If webhook accepts unverified payload:

* create critical bug
* mark `FAIL`

---

## 21. Webhook Signature Verification

Verify:

* invalid signature rejected
* missing signature rejected
* wrong secret rejected
* raw body used correctly
* verification failure does not mutate payment/subscription
* failure logged safely
* no secret printed

If signature verification is missing:

* create critical bug
* mark `FAIL`

---

## 22. Webhook Idempotency Verification

Verify idempotency for:

* provider event ID
* local order/payment
* invoice generation
* subscription activation
* coupon redemption if applicable
* add-on activation if applicable

Test/inspect duplicate webhook behavior:

* no duplicate invoice
* no duplicate subscription event
* no duplicate add-on purchase
* no double usage/coupon redemption
* second event returns safe duplicate status

If duplicate webhook duplicates invoice/subscription:

* create critical bug
* mark `FAIL`

---

## 23. Webhook Event Type Verification

Verify supported events are documented.

Possible events:

```txt id="razorpay-webhook-events"
payment.authorized
payment.captured
payment.failed
order.paid
refund.created
refund.processed
refund.failed
subscription.activated
subscription.charged
subscription.cancelled
subscription.completed
subscription.halted
```

Check:

* unsupported events safely ignored/logged
* no fake handling claim
* one-time order flow events match actual implementation
* subscription provider events deferred if not implemented
* event handling does not expose secrets

If unsupported event is treated as success incorrectly:

* create bug
* mark `FAIL`

---

## 24. Payment Record Verification

Verify payment records include:

* profile/user
* subscription/order reference
* provider order ID
* provider payment ID
* amount
* currency
* status
* verified timestamp
* webhook event ID
* invoice reference
* reconciliation status
* created/updated timestamps

Payment statuses:

```txt id="payment-statuses"
pending
authorized
captured
failed
refunded
partially_refunded
disputed
chargeback
cancelled
verified
reconciled
```

Rules:

* verified only after trusted webhook/provider check
* failed does not activate subscription
* mismatch does not activate subscription
* wrong user cannot read payment
* raw provider payload protected

---

## 25. Payment Reconciliation Verification

Verify reconciliation foundation:

* provider payment ID matched
* provider order ID matched
* local order matched
* amount matched
* currency matched
* invoice linked
* webhook linked
* mismatch status exists
* manual review status exists
* admin permission required for manual reconciliation
* reconciliation audited
* no fake matched status

Reconciliation statuses:

```txt id="reconciliation-statuses"
pending
matched
amount_mismatch
currency_mismatch
missing_webhook
manual_review
resolved
```

If mismatched payment activates subscription:

* create critical bug
* mark `FAIL`

---

## 26. Invoice Generation Verification

Verify invoices:

* generated only after verified payment or authorized admin/manual event
* linked to subscription/payment/profile
* line items exist
* amount/tax/total match payment
* status valid
* invoice snapshot stores billing details where needed
* no fake invoice
* no invoice from failed payment
* wrong user cannot read invoice
* cancelled/refunded handled via status/credit note
* invoice PDF setup-required if not implemented

Invoice statuses:

```txt id="invoice-statuses"
draft
issued
paid
cancelled
refunded
partially_refunded
credit_note_issued
void
```

If invoice generated from unverified client callback:

* create critical bug
* mark `FAIL`

---

## 27. Invoice Numbering Verification

Verify invoice number format if implemented:

```txt id="invoice-format"
MGP-26-27-0001
```

Check:

* financial year calculated correctly
* sequential
* unique constraint exists
* concurrency-safe function/transaction where possible
* no reuse after cancel
* no duplicate invoice number
* cancelled invoice remains record
* credit note sequence separate if implemented
* rollback notes include sequence/function

If duplicate invoice number possible:

* create critical bug
* mark `FAIL`

---

## 28. GST Profile Verification

Verify GST profile:

* user can manage own GST/billing profile
* wrong user denied
* GSTIN optional unless B2B invoice requested
* GSTIN basic format validation exists
* billing legal name
* billing address
* state/city/PIN
* B2B/B2C flag
* invoice email if used
* no fake GST verification
* no public GSTIN exposure
* GST profile private/noindex/no-store

If GSTIN exposed publicly:

* create bug
* mark `FAIL`

---

## 29. GST Invoice Breakdown Verification

Verify GST invoice fields/foundation:

* taxable amount
* GST rate
* tax amount
* CGST/SGST/IGST split foundation
* total amount
* place of supply
* buyer state
* seller/platform state/config placeholder
* B2B/B2C flag
* reverse charge flag if needed later
* GST note/disclaimer

Rules:

* no fake GST filing
* no fake GST verification
* no legal tax advice
* tax logic configurable/documented
* invoice totals match payment

If GST math is shown but not computed consistently:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 30. Trial Verification

Verify trial foundation:

* eligibility check server-side
* one trial per profile/role unless admin override
* start/end date
* trial status
* feature limits
* trial expiry behavior
* no auto-charge unless explicitly implemented and consented
* no fake trial active
* trial grant audited if admin
* trial abuse controls documented

Trial statuses:

```txt id="trial-statuses"
eligible
active
used
expired
revoked
not_eligible
```

If user can repeatedly start trial without limit:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 31. Coupon Verification

Verify coupons:

* code validated server-side
* discount type valid:

  * percentage
  * fixed_amount
* expiry enforced
* active status enforced
* applies to selected plan/role
* usage limit enforced
* per-user limit enforced
* coupon redemption recorded
* discount shown before checkout
* discount amount verified server-side
* no fake discount
* coupon rules not exposed publicly beyond safe display

If coupon discount can be manipulated client-side:

* create critical bug
* mark `FAIL`

---

## 32. Add-On Verification

Verify add-ons:

* add-on catalog exists if implemented
* add-on tied to subscription or one-time purchase as configured
* payment webhook verified before activation
* add-on usage/expiry tracked
* no fake ad credit
* no fake boost
* no fake extra quota
* add-on feature not enabled if payment/setup missing
* media/ads add-ons setup-required if those modules missing

If add-on activates from client callback:

* create bug
* mark `FAIL`

---

## 33. Refund Verification

Verify refund foundation:

* refund request requires auth/ownership or admin permission
* refund links to payment
* refund amount valid
* refund reason captured
* refund status valid
* provider refund setup-required if missing
* admin permission/maker-checker for refund approval
* no fake refund processed
* subscription/access impact documented
* action audited
* wrong user cannot view refund

Refund statuses:

```txt id="refund-statuses"
requested
approved
processing
processed
failed
rejected
cancelled
```

If UI says refund processed without provider/admin event:

* create bug
* mark `FAIL`

---

## 34. Credit Note Verification

Verify credit note foundation:

* linked to invoice
* linked to refund/adjustment
* unique credit note number if implemented
* reason
* amount
* tax reversal fields
* issue date
* status
* no fake credit note
* generated only after approved refund/adjustment
* user sees own credit note only
* admin action audited
* PDF/email setup-required if not implemented

If fake credit note download appears:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 35. Cancellation / Downgrade Verification

Verify cancellation/downgrade foundation:

* user can request cancellation if implemented
* cancel at period end or immediate behavior documented
* downgrade at renewal behavior documented
* plan limit recalculation documented
* user warning shown
* no silent data deletion
* existing listings behavior documented
* cancellation audited
* refund separate from cancellation
* no fake cancellation success

If cancellation is not implemented, UI must show setup-required/manual support flow.

---

## 36. Grace Period Verification

Verify grace foundation:

* grace_start_at
* grace_end_at
* grace reason/status
* limited access behavior documented
* expiry behavior documented
* no fake grace
* no unlimited grace
* no premium feature bypass after grace

If grace exists but no enforcement/documentation:

* create bug
* mark `PARTIAL`

---

## 37. Billing Dashboard Verification

Verify user billing dashboard:

* requires auth
* user sees own data only
* current plan real
* subscription status real
* billing cycle real
* renewal/expiry date real
* usage counters real/setup-required
* invoice list real
* payment history real
* trial/coupon/add-on status real
* upgrade/cancel/refund actions safe
* setup-required if provider missing
* no fake plan/payment/invoice
* no provider secrets
* no hidden/private data of others
* private noindex/no-store
* mobile responsive

If wrong user can view invoice/payment:

* create critical bug
* mark `FAIL`

---

## 38. Owner/Broker/Builder Billing Integration Verification

Verify role dashboards:

### Owner

* owner plan visible
* property/requirement limits real
* upgrade CTA safe
* no builder project limits shown as allowed

### Broker

* broker plan visible
* property/requirement/lead/CRM limits real/setup
* public profile status real/setup
* upgrade CTA safe
* no builder project plan as allowed

### Builder

* builder plan visible
* project limits real
* lead/matching requirement limits real/setup
* ads/agents limits setup if later
* upgrade CTA safe
* no property posting limits as allowed action

If dashboard shows fake quota/active plan:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 39. Admin Billing Verification

Verify admin billing pages:

* permission-scoped
* subscriptions table real or no-data
* payments table real or no-data
* invoice table real or no-data
* plans table real or setup
* coupons table real or setup
* trials table real or setup
* refunds table real or setup
* reconciliation queue real or setup
* filters/search/pagination
* sensitive data masked
* no fake revenue
* no fake payment count
* no fake provider active
* no provider secrets
* actions audited if implemented

If staff without permission can manage billing/payment:

* create critical bug
* mark `FAIL`

---

## 40. Admin Billing Permission Verification

Verify permissions:

```txt id="billing-permissions"
billing.read
billing.update
payments.read
payments.reconcile
payments.refund
invoices.read
invoices.create_manual
coupons.manage
trials.manage
plans.manage
subscriptions.manage
refunds.manage
credit_notes.manage
exports.billing
view_sensitive_payment
```

Check:

* permission checks server-side
* UI hiding not enough
* refund/manual grant high-risk actions audited/maker-checker if implemented
* staff without permission denied by direct URL/action
* sensitive payment data requires view_sensitive_payment

If direct API/action bypasses admin permission:

* create critical bug
* mark `FAIL`

---

## 41. Billing Audit Verification

Verify audit events for:

* plan created/updated
* subscription created/updated/cancelled
* trial granted/revoked
* coupon created/updated/redeemed
* checkout order created
* payment attempt created
* webhook received
* webhook verified/failed
* subscription activated
* invoice issued
* refund requested/approved/processed
* credit note issued
* manual subscription grant/revoke
* admin billing export
* sensitive billing view

Audit logs must not store:

* card details
* secrets
* webhook secret
* unredacted sensitive provider payload
* service role
* private documents

If audit logs store secrets:

* create critical bug
* mark `FAIL`

If audit foundation missing but documented partial, result can be `PARTIAL`.

---

## 42. RLS Enabled Verification

Verify RLS enabled for private billing tables:

```txt id="rls-tables"
subscriptions
subscription_events
usage_counters
payment_orders
payment_attempts
payments
payment_webhook_events
invoices
invoice_line_items
gst_profiles
coupon_redemptions
trials
trial_redemptions
add_on_purchases
refunds
credit_notes
billing_audit_logs
```

Plan/coupon/add-on public visibility must be intentional and safe.

If RLS missing on private billing table:

* create critical bug
* mark `FAIL`

If database unavailable:

* mark RLS runtime verification `SETUP_REQUIRED`
* do not mark RLS PASS

---

## 43. RLS Policy Verification

Verify RLS behavior:

* public cannot read private billing tables
* user can read own subscription
* user cannot read another user's subscription
* user can read own payments
* user cannot read another user's payments
* user can read own invoices
* user cannot read another user's invoices
* user can manage own GST profile
* user cannot manage another user's GST profile
* admin/staff access permission-scoped
* webhook/server update path secure
* public pricing reads only public plan fields
* raw webhook/payment payloads protected

If wrong user can view billing data:

* create critical bug
* mark `FAIL`

---

## 44. RLS Test Suggestions

If Supabase test environment is available, run equivalent tests:

```txt id="rls-test-scenarios"
1. Anonymous select subscriptions → denied.
2. User A select User A subscription → allowed.
3. User A select User B subscription → denied.
4. User A select User A invoices → allowed.
5. User A select User B invoices → denied.
6. User A select User A payments → allowed or safe projection.
7. User A select User B payments → denied.
8. User A update own payment status → denied.
9. User A activate own subscription directly → denied.
10. Staff without billing.read select billing admin data → denied.
11. Staff with billing.read select permitted billing data → allowed.
12. Staff without refunds.manage approve refund → denied.
13. Public select public active plans → allowed if intended.
14. Public select internal inactive plans/admin fields → denied.
15. Public select payment_webhook_events → denied.
```

Record exact results.

Do not mark RLS PASS without tests.

---

## 45. Direct URL Bypass Verification

Test or inspect direct URLs:

```txt id="direct-url-checks"
/pricing
/dashboard/billing
/dashboard/owner/billing
/dashboard/broker/billing
/dashboard/builder/billing
/dashboard/billing/invoices/[id]
/dashboard/billing/payments/[id]
/admin/billing
/admin/payments
/admin/plans
/admin/coupons
/admin/trials
/admin/refunds
/api/razorpay/create-order
/api/webhooks/razorpay
```

Expected:

* pricing public safe
* user billing requires auth
* wrong user denied invoice/payment
* admin billing permission-scoped
* webhook accepts provider calls but verifies signature
* no private data rendered before redirect
* private pages noindex/no-store

If direct URL reveals another user's billing data:

* create critical bug
* mark `FAIL`

---

## 46. Private Noindex Verification

Verify private billing pages are noindex:

* dashboard billing
* invoice detail/download pages
* payment history
* GST profile
* refund/cancellation pages
* admin billing pages
* admin payment pages
* admin invoice pages

Check:

* not in sitemap
* no private billing data in metadata/schema
* no public share links exposing invoice/payment
* no indexable admin billing pages

If private billing page is indexable with private data:

* create critical bug
* mark `FAIL`

---

## 47. Private Cache Verification

Verify private billing data is not publicly cached.

Check:

* user billing dashboard no-store/private
* admin billing no-store/private
* invoice pages/download require auth
* payment pages no public cache
* webhook responses do not cache private data
* no static generation of invoice/payment data
* no shared cache between users

If billing data can be cached publicly:

* create critical bug
* mark `FAIL`

---

## 48. Service Role / Secret Verification

Search code and client bundles for:

```txt id="secret-patterns"
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
SUPABASE_SERVICE_ROLE_KEY
SERVICE_ROLE
R2_SECRET_ACCESS_KEY
OTP_API_KEY
SMS_API_KEY
WHATSAPP_BUSINESS_TOKEN
SENDGRID_API_KEY
RESEND_API_KEY
GST_SECRET
```

Verify:

* secrets server-only
* no provider secret in client component
* no real secret in `.env.example`
* no secret in UI
* no secret in logs/errors
* no secret in audit logs
* no secret in webhook response
* no secret in final docs

If real secret exposure found:

* do not print secret
* create critical bug
* mark `FAIL`
* recommend secret rotation

---

## 49. Client Price Trust Verification

Verify server is source of truth.

Check:

* client cannot submit arbitrary price
* client cannot change plan amount
* coupon discount recalculated server-side
* order amount generated server-side
* webhook amount validated against local expected amount
* invoice line item generated from server-side plan/order
* role/plan eligibility checked server-side

If client price is trusted:

* create critical bug
* mark `FAIL`

---

## 50. Fake Payment / Billing Data Verification

Search for fake data patterns:

```txt id="fake-billing-patterns"
fake payment
mock payment
demo invoice
sample invoice
paymentSuccess: true
subscription active
verified: true
paid: true
invoice number sample
MGP-26-27-0001
dummy razorpay
test payment successful
refund processed
gst verified
```

Context matters: test fixtures are allowed only in tests/dev and must not be displayed as production data.

Verify no fake:

* payment success
* active subscription
* invoice
* GST verification
* refund
* credit note
* coupon redemption
* trial active
* usage quota
* provider active
* revenue chart

If fake billing data appears real:

* create bug
* mark `FAIL`

---

## 51. Payment Provider Setup-Required Verification

If Razorpay keys missing, verify:

* checkout disabled or setup-required
* clear setup-required message
* no fake checkout
* no fake payment success
* no active subscription from missing provider
* API provider status updated
* admin provider page masked/setup-required
* tests document provider missing

If missing provider still shows payment success:

* create critical bug
* mark `FAIL`

---

## 52. Invoice PDF / Email Verification

If invoice PDF/email implemented:

* invoice requires auth/ownership
* PDF values match invoice record
* no fake PDF
* no wrong-user download
* email provider configured before sending
* no fake email sent
* email payload no secrets
* invoice email status real

If not implemented:

* view/download button disabled/setup-required
* no fake PDF link
* API provider status updated

If fake invoice download appears:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 53. Posting Gate Smoke Verification

Test or inspect gates.

Scenarios:

```txt id="posting-gate-tests"
Guest creates property → denied/login
Owner without active plan creates/submits property → pricing/setup-required or denied if gate active
Owner with active allowed plan creates/submits property → allowed
Owner exceeding property limit → denied
Broker without active plan creates/submits property → pricing/setup-required or denied if gate active
Broker exceeding requirement limit → denied
Builder without active plan creates/submits project → pricing/setup-required or denied if gate active
Builder exceeding project limit → denied
Builder tries property → denied by role
Owner/Broker tries project → denied by role
```

If posting gates are not fully active, document `PARTIAL`.

If claimed active gate can be bypassed:

* create critical bug
* mark `FAIL`

---

## 54. Contact Unlock Gate Verification

If contact unlock billing integrated with Prompt 08, verify:

* contact reveal requires auth
* active subscription/contact quota checked
* usage counter updated server-side
* no fake paid unlock
* no fake quota
* no hidden contact if gate fails
* wrong user denied
* provider/payment setup-required if needed

If not integrated, document `PARTIAL` and ensure contact remains hidden.

---

## 55. Public Plan Data Verification

Verify public pricing data excludes:

* internal plan cost
* admin notes
* internal margins
* provider IDs
* coupon internal rules
* inactive internal plans
* hidden fields
* fake discounts

Public pricing may show only safe active plan fields.

If internal plan fields public:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 56. Admin Manual Grant Verification

If admin can grant subscription/trial:

* permission required
* reason required
* audited
* maker-checker if high-risk and implemented
* no self-grant by unauthorized staff
* expiry/limits set
* user sees correct status
* no fake payment associated unless clearly admin_granted
* invoice not generated unless manual invoice event approved

If staff without permission can grant subscription:

* create critical bug
* mark `FAIL`

---

## 57. Admin Refund / Credit Note Verification

If refund/credit note actions are implemented:

* permission required
* refund linked to real payment
* reason required
* maker-checker where implemented
* provider status checked
* no fake processed status
* credit note linked to invoice/refund
* audit log created
* user sees own refund/credit note only

If refund appears processed without provider/admin event:

* create bug
* mark `FAIL`

---

## 58. Responsive Verification

Test at:

```txt id="responsive-widths"
320px
360px
390px
430px
768px
1024px
1366px
```

Check:

* pricing cards fit
* role plan tabs fit
* checkout CTA usable
* coupon input usable
* trial CTA usable
* billing dashboard cards fit
* invoice/payment tables become cards
* GST form fits
* admin billing tables become cards
* refund/cancel forms fit
* no horizontal scroll
* action menus usable
* modals fit screen

If not all widths tested, mark responsive check `PARTIAL`.

Do not mark responsive PASS without testing.

---

## 59. Accessibility Verification

Check billing UI:

* semantic headings
* form labels
* price/feature cards accessible
* buttons have labels
* status badges not color-only
* invoice/payment tables accessible
* GST form errors readable
* focus visible
* keyboard navigation
* modal focus behavior
* destructive confirmations clear
* large mobile tap targets

If severe accessibility blocker exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 60. Performance Verification

Verify:

* pricing page efficient/cached if public-safe
* billing dashboards no-store/private
* payment/invoice/admin lists paginated
* no unbounded payment queries
* webhook processing does not run expensive tasks synchronously unless safe
* indexes exist
* no heavy provider SDK loaded except checkout page
* no fake charts/heavy analytics
* build passes

If admin billing loads all payments unbounded:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 61. Build / Lint / Typecheck Verification

Run available checks.

Examples:

```txt id="npm-checks"
npm run lint
npm run typecheck
npm run build
npm test
```

```txt id="pnpm-checks"
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

If scripts missing:

* record `NOT_CONFIGURED`

If checks fail:

* fix safe issues if in scope
* create bug if unresolved
* mark `FAIL` or `PARTIAL`

Build failure blocks PASS.

---

## 62. Webhook Test Suggestions

If safe local/staging provider testing is possible, test:

```txt id="webhook-test-scenarios"
1. Valid Razorpay webhook with captured payment → payment verified.
2. Invalid signature webhook → rejected/no mutation.
3. Duplicate valid webhook → no duplicate invoice/subscription.
4. Amount mismatch webhook → manual_review/no activation.
5. Currency mismatch webhook → manual_review/no activation.
6. Unknown order webhook → ignored/manual_review/no activation.
7. Failed payment webhook → no subscription activation.
8. Client callback without webhook → no active subscription.
```

If real provider keys/webhook secret missing:

* mark Razorpay runtime tests `SETUP_REQUIRED`
* do not mark webhook PASS

---

## 63. Manual Smoke Test Matrix

If app can run and safe test environment exists, test:

```txt id="manual-smoke-matrix"
Pricing:
- /pricing loads
- role-wise plans visible
- features/limits honest
- guest checkout requires login

User billing:
- user billing dashboard requires auth
- user sees own subscription/payment/invoice only
- wrong user invoice URL denied
- GST profile own-user only
- invoice download setup/works safely

Checkout:
- missing provider keys show setup-required
- create order validates role/plan/price
- client callback does not activate subscription
- invalid webhook rejected
- duplicate webhook idempotent
- verified webhook activates subscription only in test/configured environment

Gates:
- no-plan posting denied/setup
- active plan posting allowed within limits
- over-limit posting denied

Admin:
- billing admin permission-scoped
- payment/refund actions permission-scoped
- provider secrets masked
- no fake revenue/payment
```

If safe test environment is unavailable:

* inspect code
* mark runtime payment tests `SETUP_REQUIRED`
* do not fake runtime PASS

---

## 64. Documentation Update Verification

Verify these docs were updated:

```txt id="docs-update-required"
FEATURE_REGISTRY.md
CHANGELOG.md
BUGS_AND_FIXES.md
MANUAL_VERIFICATION.md
API_PROVIDER_STATUS.md
DEPLOYMENT_ROLLBACK.md
SECURITY_RLS_CHECKLIST.md
PERFORMANCE_CHECKLIST.md
brain.md
```

If docs missing updates:

* update them
* mark verification `PARTIAL` until fixed

---

## 65. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

* pricing page
* plan catalog
* role-wise plans
* plan features/limits
* subscription table
* subscription lifecycle
* current subscription lookup
* plan gate helper
* posting gate integration
* usage counters
* checkout order creation
* payment attempts
* Razorpay provider status
* Razorpay webhook endpoint
* webhook signature verification
* webhook idempotency
* payment records
* invoice records
* sequential invoice numbering
* GST profile
* GST invoice breakdown
* trial foundation
* coupon foundation
* add-on foundation
* refund foundation
* credit note foundation
* cancellation/downgrade foundation
* billing dashboard
* admin billing foundation
* reconciliation foundation
* billing audit logs
* RLS billing policies
* private noindex/cache
* no fake payment/invoice checks

Future features must not be marked done.

---

## 66. Changelog Verification

Check `CHANGELOG.md` includes Prompt 09 entry with:

* date
* summary
* changed files
* new routes
* migration files if any
* RLS/security changes
* provider status changes
* tests/checks run
* docs updated
* verification status
* known issues
* rollback notes

If missing, update changelog.

---

## 67. Bugs And Fixes Verification

If issues are found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

* `BUG-BILLING-FAKE-PAYMENT-SUCCESS`
* `BUG-BILLING-CLIENT-CALLBACK-ACTIVATES`
* `BUG-BILLING-WEBHOOK-NO-SIGNATURE`
* `BUG-BILLING-WEBHOOK-DUPLICATE-INVOICE`
* `BUG-BILLING-FAKE-ACTIVE-PLAN`
* `BUG-BILLING-FAKE-INVOICE`
* `BUG-BILLING-FAKE-GST`
* `BUG-BILLING-FAKE-REFUND`
* `BUG-BILLING-WRONG-USER-ACCESS`
* `BUG-BILLING-PUBLIC-ACCESS`
* `BUG-BILLING-PROVIDER-SECRET-LEAK`
* `BUG-BILLING-SERVICE-ROLE-CLIENT`
* `BUG-BILLING-CLIENT-PRICE-TRUSTED`
* `BUG-BILLING-COUPON-BYPASS`
* `BUG-BILLING-TRIAL-ABUSE`
* `BUG-BILLING-USAGE-LIMIT-BYPASS`
* `BUG-BILLING-POSTING-GATE-BYPASS`
* `BUG-BILLING-ADMIN-PERMISSION-BYPASS`
* `BUG-BILLING-PRIVATE-PAGE-INDEXABLE`
* `BUG-BILLING-PRIVATE-CACHE`
* `BUG-BILLING-RLS-MISSING`
* `BUG-BILLING-MIGRATION-MISSING`
* `BUG-BILLING-BUILD-FAIL`

Use existing bug ID convention if available.

---

## 68. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 09 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* routes/features checked
* plan/subscription tests
* posting gate tests
* checkout/webhook tests
* invoice/GST tests
* trial/coupon/add-on tests
* refund/cancellation tests
* admin billing tests
* RLS tests
* secret checks
* responsive widths
* commands run
* expected
* actual
* issues found
* result
* next step

Use exact status.

No vague “works”.

---

## 69. Security Checklist Verification

Update/verify `SECURITY_RLS_CHECKLIST.md`.

Include Prompt 09 results for:

* billing RLS
* payment RLS
* invoice RLS
* GST profile protection
* webhook signature verification
* webhook idempotency
* provider secret masking
* service role server-only
* client callback not activating subscription
* server-side price validation
* plan gate server-side
* posting gate bypass tests
* coupon/trial abuse controls
* admin billing permission checks
* private noindex/cache
* known issues

If webhook signature missing, result cannot be PASS.

---

## 70. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

Include Prompt 09 results for:

* billing list pagination
* invoice list pagination
* payment list pagination
* admin billing filters/indexes
* no unbounded payment queries
* webhook processing performance
* idempotency constraints
* pricing cache strategy
* private no-store pages
* no heavy provider SDK except checkout
* build status
* future load test notes

---

## 71. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

Include:

* Prompt 09 route/component changes
* migration path if any
* payment tables
* invoice sequence/function
* RLS policies
* webhook endpoint
* provider env vars
* rollback notes
* payment/data risk
* webhook rollback risk
* invoice sequence rollback risk
* cache/session risk
* post-deploy billing smoke checks
* verification status

If DB/RLS/webhook changes exist without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 72. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md`.

Relevant statuses:

* Razorpay
* Razorpay Webhook
* Email invoice provider
* PDF invoice generation
* Supabase Database/RLS
* GST validation provider
* Cron/expiry jobs

Rules:

* no provider active without real test
* missing provider setup-required/not-started
* test mode clearly marked
* webhook not marked tested unless tested
* no fake payment provider success
* no secrets shown

---

## 73. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 09 implementation summary
* Prompt 09 verification result
* changed files
* routes checked
* migrations/tables/RLS
* plan/subscription status
* posting gate status
* Razorpay/webhook status
* invoice/GST status
* trial/coupon/add-on status
* refund/cancellation status
* secret check result
* fake payment check result
* responsive result
* setup-required providers
* bugs/blockers
* commands run
* next prompt:

  * `prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md`
* instruction not to proceed if Prompt 09 failed/blocked

---

## 74. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* pricing page safe
* plan catalog role-wise and honest
* subscriptions role-scoped
* subscription activation requires verified webhook/trial/admin grant
* client callback alone cannot activate subscription
* webhook signature verification exists and is tested/confirmed
* webhook idempotency exists
* duplicate webhook does not duplicate invoice/subscription
* server-side price validation exists
* invoice generated only after verified payment/admin event
* invoice numbering unique
* GST profile private
* wrong user billing access denied
* private billing pages noindex/no-store
* provider secrets not exposed
* plan/posting gates server-side if claimed active
* admin billing permission-scoped
* no fake payment/plan/invoice/GST/refund data
* RLS enabled/tested or honestly setup-required with no unsafe claim
* responsive checks completed
* docs updated
* no blocking bugs

### PARTIAL

Use `PARTIAL` if:

* plan/subscription foundation exists but Razorpay setup-required
* webhook endpoint exists but runtime provider test unavailable
* invoice PDF setup-required
* email invoice delivery setup-required
* refund provider setup-required
* add-ons partial
* trial/coupon foundation partial
* usage counters partial
* posting gate partially integrated
* RLS runtime tests unavailable but policies/migration reviewed
* responsive/browser checks incomplete
* no fake payment/invoice/GST and no secret/billing leak exists

Prompt 10 can start only if user/Super Admin accepts partial and no critical payment/security/privacy issue exists.

### FAIL

Use `FAIL` if:

* build fails
* fake payment success shown
* subscription activates from client callback only
* webhook signature missing
* invalid webhook mutates billing data
* duplicate webhook duplicates invoice/subscription
* provider secret exposed
* service role client exposure
* wrong user can view billing/invoice/payment
* client-side price trusted
* plan/posting gate bypass exists while claimed active
* fake active plan/invoice/GST/refund appears real
* private billing page public/indexable/cached
* RLS missing on private billing tables
* DB changes missing migration

Do not start Prompt 10.

### BLOCKED

Use `BLOCKED` if:

* Prompt 04 entity foundation failed and posting gates depend on it
* Prompt 06 dashboards failed and billing UI depends on it
* Prompt 07 admin foundation failed and admin billing depends on it
* Supabase/RLS unavailable blocks safe billing verification
* raw body webhook handling impossible without framework setup
* cannot inspect required files
* package/build baseline broken
* architecture conflict needs owner decision

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* Razorpay keys missing
* Razorpay webhook secret missing
* email provider missing
* PDF generation missing
* GST validation provider missing
* cron/expiry jobs missing
* Supabase env missing
* safe payment test environment missing

Setup-required is acceptable only when no fake billing/payment functionality appears and all sensitive data remains protected.

---

## 75. Prompt 10 Readiness Checklist

Prompt 10 can start only if:

* Prompt 09 implementation completed
* Prompt 09 verification completed
* no critical payment/security/privacy bug open
* no fake payment success
* no client-callback subscription activation
* no webhook signature bypass
* no duplicate webhook invoice/subscription bug
* no provider secret leak
* no wrong-user billing access
* no fake invoice/GST/refund
* private billing pages noindex/cache safe
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md`

If Prompt 10 file is missing, stop and ask/generate it.

---

## 76. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 09 Verification — Billing, Payment, Subscription, Trial And GST

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Routes/Features Checked:
- pricing:
- user billing dashboard:
- owner/broker/builder billing:
- admin billing:
- checkout:
- webhook:
- invoices:
- GST profile:
- trials/coupons/add-ons:
- refunds/cancellations:

Plan/Subscription Checks:
- role-wise plans:
- subscription lifecycle:
- usage counters:
- posting gates:
- contact unlock gate:

Payment/Webhook Checks:
- checkout order:
- client callback:
- webhook signature:
- webhook idempotency:
- invalid webhook:
- duplicate webhook:
- amount/currency validation:
- reconciliation:

Invoice/GST Checks:
- invoice creation:
- invoice numbering:
- GST profile:
- GST breakdown:
- invoice PDF/email:

Admin Billing Checks:
- permissions:
- manual grants:
- refunds:
- credit notes:
- provider settings:
- audit logs:

Security Checks:
- wrong user billing access:
- provider secrets:
- service role:
- client price trust:
- fake payment:
- fake plan:
- fake invoice:
- fake GST:
- private noindex/cache:

Database/RLS Checks:
- migrations:
- tables:
- indexes:
- RLS policies:
- RLS test result:

Responsive Widths Tested:
- 320px:
- 360px:
- 390px:
- 430px:
- 768px:
- 1024px:
- 1366px:

Commands Run:
- command: result

Expected:
- Billing/payment/subscription/GST foundation is secure and ready for Prompt 10.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 10:
- Yes/No

Next Step:
- prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md or fix blockers first.
```

---

## 77. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 09 Billing/Payment/Subscription/Trial/GST verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Routes/features checked:
- pricing:
- user billing:
- admin billing:
- checkout:
- webhook:
- invoices:
- GST:
- trials/coupons/add-ons:
- refunds/cancellations:

Plans/subscriptions:
- plan catalog:
- role-wise plans:
- subscription lifecycle:
- usage counters:
- posting gates:
- contact unlock gate:

Payments/webhooks:
- checkout order:
- client callback:
- webhook signature:
- webhook idempotency:
- invalid webhook:
- duplicate webhook:
- amount/currency validation:
- reconciliation:

Invoices/GST:
- invoice creation:
- invoice numbering:
- GST profile:
- GST breakdown:
- PDF/email:

Admin billing:
- permissions:
- manual grants:
- refunds/credit notes:
- provider settings:
- audit logs:

Security/privacy:
- wrong user billing access:
- provider secrets:
- service role:
- client price trust:
- fake payment/plan/invoice/GST/refund:
- private noindex/cache:

Database/RLS:
- migrations:
- tables:
- indexes:
- RLS policies:
- RLS test result:

Responsive:
- widths tested:
- pricing mobile:
- billing dashboard:
- admin billing:
- horizontal scroll:

Provider/setup-required:
- Razorpay:
- Razorpay webhook:
- email:
- PDF:
- GST validation:
- cron/jobs:
- Supabase/test payment environment:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 10:
- Yes/No
- reason

Next step:
- prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
```

Do not write vague “verified”.

---

## 78. If Verification Fails

If verification fails:

1. do not start Prompt 10
2. create/update bug entries
3. update `MANUAL_VERIFICATION.md`
4. update `SECURITY_RLS_CHECKLIST.md`
5. update `PERFORMANCE_CHECKLIST.md`
6. update `DEPLOYMENT_ROLLBACK.md`
7. update `API_PROVIDER_STATUS.md` if provider/payment issue found
8. update `brain.md`
9. state exact blocker
10. fix if safe and in scope
11. rerun verification
12. only then proceed

Critical payment/security/privacy failures block progress.

---

## 79. If Verification Is Partial

If verification is partial:

* document exact partial items
* list setup-required providers
* list untested webhook/payment checks
* list RLS runtime gaps
* list invoice/PDF/email gaps
* list posting gate gaps
* list responsive/browser gaps
* confirm no fake payment success
* confirm client callback does not activate subscription
* confirm no provider secret leak
* confirm no wrong-user billing access
* confirm no fake invoice/GST/refund
* confirm private pages noindex/cache safe
* update docs
* ask/require owner acceptance before Prompt 10 if risk is significant

Acceptable partial examples:

* Razorpay keys missing but checkout disabled/setup-required
* webhook runtime test unavailable but signature code reviewed
* invoice PDF setup-required
* email invoice delivery setup-required
* refund provider setup-required
* GST validation provider not implemented
* cron/expiry job setup-required
* posting gate partially integrated but documented

Not acceptable partial without fix:

* fake payment success
* subscription activation from client callback
* missing webhook signature verification
* provider secret leak
* wrong-user billing access
* fake invoice/GST/refund
* private billing page public cached/indexable
* build fail

---

## 80. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `DEPLOYMENT_ROLLBACK.md`
* update `API_PROVIDER_STATUS.md` if relevant
* update `brain.md`
* final response should say Prompt 10 can start

Do not start Prompt 10 automatically unless user asked to continue.

---

## 81. What Not To Do In This Verification

Do not:

* use real money unless explicitly configured and approved
* fake payment success to test UI
* mark subscription active manually unless admin-grant flow is authorized/audited
* bypass webhook verification
* disable webhook signature checks
* expose Razorpay secrets
* trust client price
* create fake invoices
* create fake GST verification
* create fake refunds
* add fake active plans
* bypass RLS
* expose wrong-user billing data
* index private billing pages
* cache private billing data publicly
* start Prompt 10 after FAIL/BLOCKED

---

## 82. Quality Bar

This verification is successful when future phases can trust that:

* pricing is honest
* plan roles are correct
* subscription state is secure
* posting gates are server-side where claimed active
* payment success requires verified webhook
* client callback cannot activate plan
* webhook signature verification exists
* webhook idempotency prevents duplicate invoices/subscriptions
* invoices are generated only after verified/admin events
* invoice numbers are unique
* GST profile and billing data are private
* admin billing is permission-scoped
* provider secrets are protected
* private billing pages are noindex/no-store
* no fake payment/plan/invoice/GST/refund exists
* docs reflect reality
* Prompt 10 media storage can safely build on plan/media limits

---

## 83. Final Rule For Prompt 09 Verification

Verify billing honestly.

Verify payments honestly.

Verify webhook signature honestly.

Verify webhook idempotency honestly.

Verify subscription activation honestly.

Verify posting gates honestly.

Verify invoices honestly.

Verify GST honestly.

Verify trials/coupons/add-ons honestly.

Verify refunds honestly.

Verify admin billing permissions honestly.

Verify provider secrets honestly.

Verify RLS honestly.

Do not fake payment success.

Do not activate subscription from client callback.

Do not skip webhook signature verification.

Do not duplicate invoice on duplicate webhook.

Do not trust client price.

Do not expose provider secrets.

Do not expose wrong-user billing data.

Do not fake active plan.

Do not fake invoice.

Do not fake GST.

Do not fake refund.

Do not index private billing pages.

Do not cache private billing data publicly.

Do not mark PASS without payment/security/RLS checks.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
