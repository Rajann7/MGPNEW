# prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md

# My Gujarat Property — Prompt 09: Billing, Payment, Subscription, Trial And GST

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 10 (billing/payment) & 12 (admin billing)**, `design-prompts/DESIGN_ADDONS_MASTER.md`, deltas `report-batch-10/12.md`, and `docs/09` "Design Add-Ons". Locked: metered plan resources (reveal quota, featured slots, ad-spend wallet w/ auto-pause, team seats, proposals/mo), GST jurisdiction (CGST+SGST/IGST), coupon-on-invoice, honest payment states.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
```

This phase implements the commercial foundation for **My Gujarat Property**:

* subscription plans
* role-wise plan rules
* subscription gates
* posting limits
* contact unlock limits
* add-ons
* coupons
* trials
* billing dashboard
* Razorpay checkout foundation
* webhook-only payment success
* payment reconciliation
* invoices
* GST fields
* GST invoice numbering
* refunds
* credit notes
* cancellation
* grace period
* downgrade rules
* admin billing controls
* payment audit logs
* provider setup-required states
* RLS-protected billing data
* no fake payment
* no fake active plan
* no fake invoice
* no fake webhook
* no fake GST
* no fake PASS

Do not mark payment successful from client callback alone.

Do not fake active subscription.

Do not fake invoices.

Do not fake GST.

Do not fake Razorpay webhook verification.

Do not expose payment secrets.

Do not expose billing data to wrong user.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
Prompt Number: 09
Phase: Billing, Payment, Subscription, Trial And GST
Type: Implementation Prompt
Matching Verification Prompt: prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
Previous Verification Prompt: prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
```

---

## 2. Phase Purpose

The purpose of this phase is to implement the safe billing and subscription foundation for My Gujarat Property.

This phase should implement:

* plan catalog
* role-wise plans
* plan limits
* plan feature flags
* subscription records
* subscription status lifecycle
* posting gates
* plan usage tracking
* trial foundation
* coupon foundation
* add-on foundation
* checkout order creation
* Razorpay provider foundation
* verified webhook handling
* payment records
* payment attempt records
* invoice generation
* GST fields
* sequential invoice numbering
* invoice PDF placeholder/foundation
* refund/credit note foundation
* cancellation/downgrade rules
* grace period/expiry behavior
* billing dashboard pages
* admin billing management foundation
* audit logs
* RLS policies
* provider setup-required states
* docs updates
* checks/tests
* handoff to manual verification prompt

This phase must never display fake payment success or activate a plan without verified payment, approved free trial or authorized admin action.

---

## 3. Required Docs To Read First

Before editing, read:

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

Also inspect existing billing, payment, subscription, plan, invoice, Razorpay and posting gate code before editing.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
src/app/pricing/
app/pricing/
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
src/lib/actions/billing*
lib/actions/billing*
src/lib/actions/payments*
lib/actions/payments*
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

Search for existing:

* pricing page
* plan tables
* subscriptions
* payments
* invoices
* GST fields
* Razorpay client
* Razorpay webhook
* checkout order creation
* fake payment success
* fake active subscription
* fake invoices
* posting gates
* add-ons
* coupons
* trials
* billing admin pages
* provider secrets
* service role in client
* webhook signature verification
* webhook idempotency
* payment reconciliation
* RLS policies

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement:

### 5.1 Plan Catalog

* role-wise plan catalog
* plan features
* plan limits
* plan prices
* plan billing cycle
* plan visibility
* active/inactive status
* plan display on pricing page
* admin plan management foundation

### 5.2 Subscription System

* subscription table
* current subscription lookup
* subscription lifecycle
* subscription status
* plan usage
* role-specific subscription gates
* grace period
* downgrade/upgrade foundation
* cancellation foundation

### 5.3 Posting Gates

* plan check before posting property/project/requirement
* plan check before media/contact/add-on features where applicable
* owner/broker/builder role rules
* setup-required or pricing redirect when no plan
* no fake pass

### 5.4 Razorpay Payment Foundation

* checkout order creation
* payment attempt records
* client checkout integration if provider configured
* webhook endpoint
* signature verification
* idempotency
* verified webhook-only success
* payment records
* provider setup-required if keys missing

### 5.5 Invoices And GST

* invoice records
* sequential invoice numbering
* GST fields
* buyer billing profile
* B2B/B2C handling
* invoice issue date
* invoice PDF placeholder/foundation
* email invoice setup-required if email provider missing

### 5.6 Trial / Coupon / Add-On Foundation

* free trial rules
* coupon rules
* add-ons
* plan limits
* usage tracking
* abuse controls
* admin controls

### 5.7 Refund / Credit Note Foundation

* refund request/record foundation
* credit note record foundation
* admin permission/maker-checker foundation
* no fake refund
* no fake credit note

### 5.8 Admin Billing Foundation

* admin billing pages
* payment records
* subscription records
* invoice records
* coupon/trial/add-on management foundation
* reconciliation placeholders
* provider status display
* permission checks
* audit logs

### 5.9 Docs

Update all memory docs.

---

## 6. Out Of Scope For This Phase

Do not fully implement:

* final production Razorpay go-live unless real keys and webhook configured
* real invoice PDF generation if PDF tooling not present
* real invoice email delivery unless provider configured
* automated GST filing
* accounting export integration
* bank reconciliation integration
* full refund automation
* wallet system
* escrow
* brokerage settlement
* payout system
* ad billing lifecycle beyond placeholder
* AI pricing/recommendations
* WhatsApp/SMS billing notifications unless provider configured
* full subscription proration complexity unless safe
* legal tax advice

This phase may create foundations and setup-required states.

---

## 7. Hard Payment Rules

Claude must enforce:

```txt id="hard-payment-rules"
Payment success only after verified webhook.
Client callback alone is not payment success.
Razorpay signature must be verified.
Webhook events must be idempotent.
Subscription activation must be tied to verified payment, approved free trial, or authorized admin action.
Invoice number generated only after verified payment or approved manual invoice event.
No fake payment success.
No fake active plan.
No fake invoice.
No fake refund.
No fake GST.
```

Forbidden:

* activating plan from client payment callback only
* marking payment paid without webhook
* skipping webhook signature verification
* storing Razorpay secret in client
* showing fake invoice
* fake payment history
* fake plan active
* fake refund/credit note
* duplicate invoice number
* duplicate webhook processing
* public access to billing data

---

## 8. Suggested Database Tables

Use existing tables if present.

Possible tables:

```txt id="billing-tables"
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

Use only needed tables.

Do not duplicate existing equivalents.

If a subset is implemented, document accurate status.

---

## 9. Plan Model Requirements

Plans should support:

* role:

  * owner
  * broker
  * builder
* plan name
* plan code
* billing cycle:

  * monthly
  * quarterly
  * yearly
  * one_time
  * trial
* price
* currency INR
* GST inclusive/exclusive flag
* active status
* display order
* feature list
* limits
* created/updated timestamps

Plans may include:

* free starter/trial
* owner basic/pro
* broker basic/pro/agency
* builder basic/pro/premium
* add-ons

Do not invent final business prices if not provided. Use configurable placeholders or setup-required/admin-configurable values.

---

## 10. Plan Feature Examples

Plan features may include:

```txt id="plan-features"
property_posts_limit
project_posts_limit
requirement_posts_limit
active_listing_limit
images_per_listing_limit
video_allowed
brochure_allowed
floor_plan_allowed
contact_unlock_limit
lead_view_limit
agent_limit
featured_listing_allowed
boost_allowed
ads_allowed
support_priority
analytics_access
public_profile_allowed
rera_display_allowed
```

Rules:

* features must be real-enforced if marked active
* do not show feature as active if enforcement missing
* use setup-required or partial if not enforced yet
* no fake “unlimited” unless supported safely

---

## 11. Role-Wise Plan Rules

### Owner Plans

Owner plans may control:

* property posting
* requirement posting
* active listing limit
* image limits later
* contact unlock limit later
* lead access rules
* billing history

Owner cannot buy builder project plan as Owner without role change/approval.

### Broker Plans

Broker plans may control:

* property posting
* requirement posting
* active listing limit
* lead/CRM limits
* contact unlock limit
* public profile
* team/agent features later if product allows

Broker cannot buy builder project plan unless role approved.

### Builder Plans

Builder plans may control:

* project posting
* project active limit
* unit inventory access
* brochure/floor plan/video availability later
* project leads
* matching requirements
* ads/promotions eligibility later
* agents/team limit later

Builder cannot use owner/broker property post features unless product role changes.

---

## 12. Subscription Status Values

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

Rules:

* only one current active/trial/grace subscription per profile per role unless business allows otherwise
* expired/cancelled not active
* pending activation not active until verified webhook/admin grant
* grace access limited/documented
* trialing access based on trial rules
* admin_granted must be audited

---

## 13. Payment Order Status Values

Payment order statuses:

```txt id="payment-order-statuses"
created
checkout_started
payment_authorized
payment_captured
payment_failed
webhook_verified
reconciled
expired
cancelled
```

Rules:

* `payment_captured` from client alone is not enough for subscription activation
* webhook verified event required for activation
* provider response stored safely
* secrets not stored
* raw payload stored only server-side if safe and redacted where needed

---

## 14. Payment Status Values

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

* captured/verified only from trusted webhook/provider check
* failed payments do not activate plan
* disputed/chargeback may suspend/grace later
* refunds update records but do not fake success

---

## 15. Invoice Status Values

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

Rules:

* invoice issued after verified payment or approved manual invoice event
* invoice number sequential
* invoice line items match payment/subscription/add-ons
* invoice cannot be edited silently after issue
* credit note used for corrections/refunds
* no fake invoice PDF

---

## 16. GST Requirements

GST foundation should support:

* GSTIN optional for buyer
* buyer legal name
* billing address
* state code
* place of supply
* B2B/B2C flag
* GST rate
* CGST/SGST/IGST split foundation
* tax amount
* taxable amount
* total amount
* invoice number
* invoice date
* reverse charge flag if needed later
* GST disclaimer/notes

Rules:

* do not provide legal tax advice
* tax logic configurable
* GST number validation basic format only unless provider exists
* no fake GST verification
* no fake GST filing
* no duplicate invoice number

---

## 17. Invoice Numbering Rules

Invoice format example:

```txt id="invoice-format"
MGP-26-27-0001
```

Rules:

* financial year based
* sequential
* generated after verified payment/manual approved invoice
* unique
* concurrency-safe
* no reuse after cancel
* cancelled invoice remains record
* credit note separate sequence if implemented
* migration/function may be needed
* rollback notes required

---

## 18. Trial Rules

Trial foundation should support:

* trial eligibility
* role-specific trial
* one trial per profile/role unless admin override
* trial start/end date
* trial status
* trial feature limits
* no auto-charge unless explicitly disclosed
* no saved card charge without consent
* trial expiry behavior
* abuse prevention
* admin trial grant/revoke foundation

Trial statuses:

```txt id="trial-statuses"
eligible
active
used
expired
revoked
not_eligible
```

Rules:

* no fake trial active
* trial grant audited
* trial expiry does not silently charge
* trial limits enforced if claimed

---

## 19. Coupon Rules

Coupon foundation should support:

* code
* discount type:

  * percentage
  * fixed_amount
* max discount
* applies to role/plan
* expiry
* usage limit
* per-user limit
* active status
* redemption record
* admin create/update foundation

Rules:

* coupon validation server-side
* expired/inactive denied
* per-user limits enforced
* no fake discount
* coupon use recorded
* coupon cannot reduce below safe minimum unless allowed

---

## 20. Add-On Rules

Add-ons may include:

```txt id="add-ons"
extra_property_post
extra_project_post
extra_requirement_post
extra_contact_unlock
featured_listing
boost_listing
extra_agent
extra_image_pack
brochure_access
video_access
ad_credit
priority_support
```

Rules:

* add-ons tied to active subscription or one-time purchase as configured
* add-on payment webhook verified before activation
* no fake ad credit
* no fake boost
* no fake extra quota
* add-on expiry if applicable
* add-on usage tracked

Some add-ons may be placeholders until media/ads phases.

---

## 21. Usage Counter Requirements

Usage counters may track:

* property posts used
* project posts used
* requirement posts used
* active listings
* contact unlocks used
* lead views used
* image usage later
* video/brochure usage later
* agent seats used later
* ad credits used later

Rules:

* counters real only
* updated server-side
* cannot be client-manipulated
* period reset logic if needed
* race-condition safe where possible
* no fake remaining quota

---

## 22. Posting Gate Requirements

Before creating or publishing:

* property
* project
* requirement

Check:

* user role
* active/trial/grace subscription
* plan feature
* plan limit
* usage counter
* account status
* verification status if required
* billing setup-required status

Rules:

* Owner/Broker property posting gated by their plans
* Owner/Broker requirement posting gated by their plans
* Builder project posting gated by builder plans
* Builder property posting still denied
* Owner/Broker project posting still denied
* guest denied/login required
* if no active plan, show pricing/setup-required
* no fake gate pass

If business wants posting before billing fully active, document temporary behavior and feature status.

---

## 23. Contact Unlock Gate Requirements

Contact unlock may later require plan/contact quota.

This phase should:

* add foundation for contact unlock limit
* integrate with contact reveal from Prompt 08 if safe
* do not reveal contact unless authorized
* do not fake paid unlock
* do not fake quota
* if billing not fully configured, keep reveal setup-required or plan-gated placeholder

---

## 24. Pricing Page Requirements

Pricing page should:

* show role-wise plans
* show pricing from DB/config
* show features/limits honestly
* show setup-required if plans not configured
* show login required for checkout
* show selected role
* link to register/login if guest
* start checkout only if provider configured
* show no fake discounts
* show GST/tax note
* show refund/cancellation policy link if exists
* mobile responsive

Do not hardcode fake final prices unless product owner has provided them.

---

## 25. Checkout Flow Requirements

Checkout flow:

1. user selects plan/add-on
2. server validates role and eligibility
3. server creates payment order
4. payment attempt record created
5. client opens Razorpay checkout only if configured
6. client callback records attempt status only
7. webhook verifies payment signature/event
8. webhook updates payment/order
9. subscription/add-on activated only after verified webhook
10. invoice generated after verified payment
11. dashboard updates subscription

Rules:

* no subscription activation on client callback alone
* webhook idempotent
* order amount verified
* plan ID/price verified server-side
* user/profile ownership verified
* provider setup-required if keys missing
* safe errors

---

## 26. Razorpay Provider Requirements

If Razorpay implemented:

Environment variables:

```txt id="razorpay-env"
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
```

Rules:

* `RAZORPAY_KEY_SECRET` server-only
* `RAZORPAY_WEBHOOK_SECRET` server-only
* only `RAZORPAY_KEY_ID` may be public/client if needed
* webhook signature verified
* payment/order amount verified
* currency INR verified
* event ID idempotent
* raw payload handled safely
* provider errors safe
* test/live mode clearly documented
* no production fake/test payment

If keys missing:

* show `RAZORPAY_SETUP_REQUIRED`
* disable real checkout
* update `API_PROVIDER_STATUS.md`

---

## 27. Webhook Requirements

Webhook must:

* receive raw body where signature verification requires it
* verify Razorpay signature
* validate event type
* check idempotency by event ID
* validate order/payment references
* validate amount/currency
* update payment record
* activate subscription/add-on only after verified event
* generate invoice if payment verified
* record webhook event
* handle retries safely
* return appropriate response
* never expose secret
* log safe metadata only

Webhook failure should not activate payment.

---

## 28. Webhook Event Types

Handle or prepare:

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

If using one-time orders only, subscription webhook events may be setup/deferred.

Document supported events.

Do not pretend unsupported event is handled.

---

## 29. Idempotency Requirements

Idempotency required for:

* webhook events
* payment success handling
* invoice generation
* subscription activation
* coupon redemption
* trial activation
* add-on activation
* refund processing

Rules:

* duplicate webhook should not duplicate invoice
* duplicate webhook should not duplicate subscription event
* duplicate client callback should not activate plan
* duplicate checkout should create separate attempt only if intended
* idempotency key stored

---

## 30. Payment Reconciliation Requirements

Reconciliation foundation may include:

* provider payment ID
* provider order ID
* local payment order ID
* amount
* currency
* status
* captured timestamp
* webhook event ID
* invoice ID
* reconciliation status
* mismatch reason

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

Rules:

* mismatched amount does not activate plan
* manual review admin permission required
* reconciliation actions audited
* no fake reconciliation

---

## 31. Refund Foundation

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

Rules:

* refund requires payment exists
* refund admin permission required
* high-risk refund maker-checker recommended
* provider refund only if configured
* no fake refund processed
* credit note generated if required
* subscription/access effect documented
* audit refund actions

If refund provider not implemented, show setup-required/manual review.

---

## 32. Credit Note Foundation

Credit note fields may include:

* credit note number
* invoice ID
* refund ID
* reason
* amount
* tax reversal
* issue date
* status

Rules:

* unique sequence
* linked to invoice
* not fake
* generated only after approved refund/adjustment
* audit generated credit note
* PDF/email setup-required if not implemented

---

## 33. Cancellation And Downgrade Rules

Implement foundation for:

* user cancellation request
* cancel at period end
* immediate cancel if allowed
* downgrade at renewal
* plan change
* grace period
* expiry
* access reduction

Rules:

* no silent deletion of data
* existing listings may pause/hide based on business rule
* user warned before downgrade
* plan limits recalculated
* cancellation audited
* refund rules separate
* no fake cancellation success

If full cancellation not implemented, show setup-required and admin/manual process.

---

## 34. Grace Period Rules

Grace period may apply to failed renewal/payment.

Fields:

* grace_start_at
* grace_end_at
* grace_reason
* grace_status

Rules:

* limited access during grace
* no new premium actions if not allowed
* grace expiry updates subscription
* notification/email provider later
* no fake grace

---

## 35. Billing Dashboard Requirements

Public user billing dashboard should show:

* current plan
* subscription status
* billing cycle
* renewal/expiry date
* usage counters
* plan limits
* invoices
* payment history
* trial status
* coupons/add-ons if relevant
* upgrade/change/cancel actions
* setup-required states
* support/refund policy links

Rules:

* own billing data only
* no fake plan
* no fake payment history
* no fake invoice
* no hidden contact leak
* no provider secrets
* private noindex/no public cache
* mobile responsive

---

## 36. Role Dashboard Billing Integration

Owner dashboard:

* owner plan
* property/requirement limits
* contact unlock limit if applicable
* upgrade CTA

Broker dashboard:

* broker plan
* property/requirement/lead/CRM limits
* public profile status
* upgrade CTA

Builder dashboard:

* builder plan
* project limits
* leads/matching requirements limits
* ads eligibility placeholder
* agents/team limits later
* upgrade CTA

All usage must be real or setup-required.

---

## 37. Admin Billing Requirements

Admin billing pages may include:

* subscriptions list
* payment orders
* payment attempts
* payments
* invoices
* coupon management
* trial management
* add-on management
* refund/credit note foundation
* reconciliation queue
* manual subscription grant/revoke foundation
* audit logs
* provider status

Rules:

* permission-scoped
* sensitive payment data masked
* payment/refund actions maker-checker where needed
* no fake revenue/payment
* no fake provider active
* no secrets shown
* no unrestricted export

---

## 38. Admin Permission Requirements

Admin billing permissions may include:

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

Rules:

* server-side checks required
* UI hiding not enough
* Super Admin can manage all
* Admin/staff need explicit permission
* refund/manual plan grant high-risk actions audited/maker-checker

---

## 39. Audit Requirements

Audit billing events:

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

Do not log:

* card details
* secrets
* webhook secret
* raw unredacted provider payload with sensitive data
* private documents
* full payment sensitive data

---

## 40. RLS Requirements

RLS must protect billing tables.

Rules:

* user can read own subscriptions/payments/invoices only
* user cannot read another user's billing data
* public denied
* admin/staff access permission-scoped
* provider/webhook server action can update via secure server path
* service role server-only
* coupon public read only if intended and safe
* plan public read if pricing needs it
* internal plan cost/admin fields protected
* payment raw payload protected

Frontend hiding is not security.

---

## 41. Public Plan Data Rules

Public pricing may show:

* active public plan name
* role
* price
* features
* limits
* billing cycle
* GST note
* terms/refund link

Public pricing must not show:

* internal plan cost
* admin notes
* internal margins
* provider IDs
* coupon secret rules
* hidden inactive plans unless intended
* fake discounts

---

## 42. RLS Table Expectations

Enable RLS for private tables:

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

Plan/coupon/add-on public visibility must be intentional.

If private billing table lacks RLS:

* do not mark complete
* create bug
* mark result `FAIL`

---

## 43. SQL Migration Rule

If DB changes are needed, create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_billing_payment_subscription_trial_gst.sql
```

Migration must include:

* purpose
* phase: Prompt 09
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* invoice sequence/function if any
* webhook idempotency constraints
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 44. Suggested Indexes

Add/verify indexes for:

### Plans

* role
* active status
* display order
* plan code

### Subscriptions

* profile ID
* role
* plan ID
* status
* current period end
* created_at

### Usage Counters

* profile ID
* subscription ID
* feature key
* billing period

### Payment Orders / Attempts

* profile ID
* provider order ID
* status
* created_at

### Payments

* profile ID
* provider payment ID
* provider order ID
* status
* created_at

### Webhook Events

* provider event ID unique
* event type
* processed_at
* created_at

### Invoices

* profile ID
* invoice number unique
* financial year
* status
* issued_at

### Coupons / Redemptions

* coupon code
* active
* expires_at
* profile ID
* plan ID

### Refunds / Credit Notes

* payment ID
* invoice ID
* status
* created_at

---

## 45. Server Action / API Requirements

Implement safe server actions/API routes for:

```txt id="server-actions"
get_public_plans
get_current_subscription
get_usage_summary
validate_plan_gate
create_checkout_order
record_checkout_started
handle_razorpay_webhook
apply_coupon
start_trial
cancel_subscription
request_refund
download_invoice
update_gst_profile
admin_create_plan
admin_update_plan
admin_create_coupon
admin_update_coupon
admin_grant_trial
admin_revoke_trial
admin_grant_subscription
admin_revoke_subscription
admin_reconcile_payment
admin_approve_refund
admin_issue_credit_note
```

Only implement what is safe and in scope.

Each action must:

* require auth where needed
* validate role/profile
* validate plan/price server-side
* check permissions
* use server-only secrets
* enforce RLS
* use idempotency where needed
* return safe typed errors
* audit high-risk changes
* never fake payment success

---

## 46. Error Handling Rules

Use safe errors:

```txt id="safe-errors"
AUTH_REQUIRED
ROLE_NOT_ALLOWED
FORBIDDEN
PLAN_NOT_FOUND
PLAN_NOT_ACTIVE
SUBSCRIPTION_REQUIRED
SUBSCRIPTION_NOT_FOUND
SUBSCRIPTION_NOT_ACTIVE
LIMIT_EXCEEDED
TRIAL_NOT_ELIGIBLE
COUPON_INVALID
COUPON_EXPIRED
COUPON_LIMIT_EXCEEDED
PAYMENT_PROVIDER_SETUP_REQUIRED
PAYMENT_ORDER_FAILED
PAYMENT_NOT_VERIFIED
WEBHOOK_SIGNATURE_INVALID
WEBHOOK_DUPLICATE
WEBHOOK_UNSUPPORTED_EVENT
INVOICE_GENERATION_FAILED
GST_PROFILE_INVALID
REFUND_NOT_SUPPORTED
SETUP_REQUIRED
UNKNOWN_ERROR
```

Do not expose:

* SQL errors
* stack traces
* Razorpay key secret
* webhook secret
* service role
* raw provider secrets
* private payment data
* another user's billing data

---

## 47. Input Validation Rules

Validate:

* plan ID
* role
* billing cycle
* coupon code
* GSTIN format
* billing legal name
* billing address
* state code
* payment order ID
* provider payment ID
* webhook signature
* amount/currency
* invoice request ownership
* refund amount/reason
* subscription status transition
* admin permission
* usage counter operation

Invalid input must not mutate billing data.

---

## 48. Subscription Gate Integration Points

Integrate plan gate with:

* property create/submit
* project create/submit
* requirement create/submit
* media upload later
* brochure/video/floor plan later
* contact reveal/contact unlock from Prompt 08
* lead view/contact unlock if plan-limited
* ads/promotions later
* agents/team later

If full integration is partial:

* document exact partial status
* no fake gate pass
* no premium feature enabled unless plan check works

---

## 49. Posting Gate UI Requirements

When no plan/limit exceeded:

Show:

* reason
* current plan status
* required plan/feature
* usage/limit if real
* pricing CTA
* support link
* setup-required if billing not configured

Do not show:

* fake plan
* fake remaining quota
* fake upgrade success
* fake payment success

---

## 50. Trial UI Requirements

Trial UI should show:

* eligibility
* trial duration
* trial feature limits
* expiry date
* no auto-charge note
* start trial CTA if eligible
* trial already used state
* trial expired state

Rules:

* trial state real only
* no fake trial active
* no hidden terms
* no auto-charge unless explicitly consented and implemented

---

## 51. Coupon UI Requirements

Coupon UI should:

* accept code
* validate server-side
* show discount
* show invalid/expired state
* show applied discount before checkout
* record redemption only after payment/trial rules as configured
* not reveal internal coupon rules
* not fake discount

---

## 52. Invoice UI Requirements

Invoice list should show:

* invoice number
* date
* plan/add-on
* amount
* tax
* total
* status
* download/view link if implemented
* setup-required if PDF not implemented

Invoice detail should show:

* seller/platform legal details placeholder/config
* buyer billing profile
* line items
* GST breakdown
* payment reference
* invoice status
* legal notes/disclaimer

Do not show fake PDF/download if not implemented.

---

## 53. GST Profile UI Requirements

GST profile form may include:

* billing legal name
* GSTIN
* billing address
* state
* city
* PIN code
* business type B2B/B2C
* email for invoice

Rules:

* GSTIN optional unless B2B invoice requested
* validate basic GSTIN format
* no fake GST verification
* user can edit own billing profile
* invoice may snapshot billing profile at issue time
* wrong user denied

---

## 54. Refund / Cancellation UI Requirements

Refund/cancellation UI may show:

* cancellation request
* refund policy link
* refund request form if implemented
* refund status
* credit note status
* support link

Rules:

* no fake refund
* no fake cancellation
* no fake credit note
* admin/manual review setup if provider not implemented
* user sees own requests only

---

## 55. Admin Billing UI Requirements

Admin billing UI should include:

* subscriptions table
* payments table
* invoices table
* plans table
* coupons table
* trials table
* refunds table
* reconciliation queue
* provider setup status
* filters/search/pagination
* permission-disabled actions
* audit timeline

Rules:

* no fake revenue
* no fake payment count
* payment secrets masked
* sensitive data permission required
* admin actions audited
* refunds/manual grants maker-checker where implemented
* no unbounded export

---

## 56. Private Cache / Noindex Rules

Billing pages are private.

Rules:

* user billing dashboard noindex
* admin billing pages noindex
* billing pages not in sitemap
* private billing data no-store/no public cache
* invoice download requires auth/ownership/permission
* payment data not statically generated
* no metadata with private payment info

---

## 57. Security Deep Requirements

Must protect:

* payment order data
* payment attempts
* payment IDs
* invoice data
* GSTIN
* billing address
* coupon redemption data
* subscription status
* webhook raw payload
* refunds/credit notes
* provider secrets
* service role

Must not:

* expose wrong user's billing
* expose provider secrets
* expose webhook secret
* activate subscription without verified webhook
* create invoice without verified payment/admin event
* process duplicate webhook twice
* use client-side price as source of truth
* trust client-side plan limits

---

## 58. Webhook Security Deep Requirements

Webhook must:

* use raw body for signature verification where required
* reject invalid signature
* reject amount mismatch
* reject currency mismatch
* reject unknown local order
* ignore duplicate event safely
* handle retry safely
* never expose internal errors to provider response beyond safe status
* store safe event record
* process in transaction where possible
* avoid race conditions
* audit success/failure

If raw body handling is not possible in current framework without configuration, document setup-required/blocker.

---

## 59. RLS / SQL Testing Expectations

Implementation should support testing:

* public cannot read subscriptions
* user can read own subscription
* user cannot read another user's subscription
* user can read own invoice
* user cannot read another user's invoice
* user cannot mark payment paid
* client cannot activate subscription directly
* admin without payment permission cannot refund
* staff without plan permission cannot edit plan
* webhook can process securely server-side
* coupon redemption belongs to profile
* invoice number unique
* duplicate webhook does not duplicate invoice
* plan gates deny when no subscription

---

## 60. Tests / Checks To Run

Run available:

```txt id="checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

* billing unit tests
* webhook signature tests
* payment idempotency tests
* invoice sequence tests
* subscription gate tests
* coupon/trial tests
* RLS tests
* admin permission tests
* route guard tests

If script missing, document `NOT_CONFIGURED`.

Do not claim tests passed if not run.

---

## 61. Manual Smoke Checks If App Runs

If app can run, check:

* pricing page loads
* plans show role-wise and honest setup states
* guest checkout requires login
* logged-in user can open checkout only if Razorpay configured
* missing Razorpay keys show setup-required
* client callback does not activate plan
* fake payment cannot activate plan
* webhook invalid signature rejected
* duplicate webhook ignored/idempotent
* verified webhook activates subscription in test mode only if configured
* invoice generated only after verified payment
* invoice number unique
* user sees own billing only
* wrong user cannot view invoice/payment
* posting gate blocks when no active plan if gate enabled
* coupon validation works or setup state
* trial eligibility works or setup state
* admin billing pages permission-scoped
* no provider secrets shown
* mobile billing UI works

Record results.

Full verification in matching manual prompt.

---

## 62. API Provider Status Updates

Update `API_PROVIDER_STATUS.md` if relevant.

Potential statuses:

* Razorpay: `NOT_STARTED`, `SETUP_REQUIRED`, `TEST_MODE`, `ACTIVE`
* Razorpay Webhook: `SETUP_REQUIRED`, `TESTED`, `ACTIVE`
* Email invoice provider: `SETUP_REQUIRED`
* PDF invoice generation: `NOT_STARTED`/`PARTIAL`
* Supabase Database/RLS: updated if migrations applied
* GST validation provider: `NOT_STARTED` unless real
* Cron/expiry jobs: `SETUP_REQUIRED`

Do not mark provider active without real test.

---

## 63. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

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

Use accurate statuses.

---

## 64. Changelog Update

Update `CHANGELOG.md`.

Include:

* date
* Prompt 09
* summary
* changed files
* new routes
* migration files if any
* RLS/security changes
* provider status changes
* tests/checks run
* docs updated
* known issues
* rollback notes
* manual verification pending

---

## 65. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* fake payment success
* subscription activates without webhook
* webhook signature not verified
* duplicate webhook duplicates invoice
* invoice number duplicate
* fake active plan
* fake invoice
* fake GST verification
* wrong user billing access
* public billing access
* provider secret leak
* service role client exposure
* client price trusted
* coupon bypass
* trial abuse
* usage limit bypass
* posting gate bypass
* refund fake processed
* admin billing permission bypass
* RLS missing
* migration missing
* private page indexable
* private cache risk
* build/typecheck failure

---

## 66. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 09 implementation status
* manual verification pending:

  * `prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`
* billing routes/features needing verification
* webhook tests pending
* RLS tests pending
* provider setup-required states
* responsive checks pending
* known bugs

Do not mark manual verification PASS from implementation prompt alone.

---

## 67. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md`.

Include:

* billing RLS
* payment RLS
* invoice RLS
* GST profile protection
* webhook signature verification
* webhook idempotency
* provider secret masking
* service role server-only
* client callback not activating subscription
* plan gate server-side
* posting gate bypass tests
* admin billing permission checks
* private noindex/cache
* known issues

---

## 68. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md`.

Include:

* billing list pagination
* invoice list pagination
* payment list pagination
* admin billing filters/indexes
* no unbounded payment queries
* webhook processing performance
* idempotency constraints
* pricing cache strategy
* private no-store pages
* no heavy provider SDK loaded except checkout page
* build status
* future load test notes

---

## 69. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

Include:

* billing route/component changes
* migration path if any
* payment tables
* invoice sequence/function
* RLS policies
* webhook endpoint
* provider env vars
* rollback notes
* data/payment risk
* webhook rollback risk
* cache/session risk
* post-deploy billing smoke checks

If migration exists, rollback notes are mandatory.

---

## 70. Brain Update

Update `brain.md`.

Include:

* Prompt 09 implementation summary
* changed files
* routes added/changed
* migration files if any
* billing tables/RLS status
* Razorpay/webhook status
* invoice/GST status
* trial/coupon/add-on status
* posting gate status
* provider setup-required states
* bugs/blockers
* tests/checks run
* next prompt:

  * `prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`
* exact resume instruction

---

## 71. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
src/app/pricing/page.tsx
src/app/dashboard/billing/*
src/app/dashboard/owner/billing/*
src/app/dashboard/broker/billing/*
src/app/dashboard/builder/billing/*
src/app/admin/billing/*
src/app/admin/payments/*
src/app/admin/plans/*
src/app/admin/coupons/*
src/app/admin/trials/*
src/app/api/razorpay/create-order/route.ts
src/app/api/webhooks/razorpay/route.ts
src/components/billing/*
src/components/pricing/*
src/lib/billing/*
src/lib/payments/*
src/lib/razorpay/*
src/lib/actions/billing.ts
src/lib/actions/payments.ts
src/lib/permissions/billing-permissions.ts
src/types/billing.ts
src/types/payments.ts
supabase/migrations/*_billing_payment_subscription_trial_gst.sql
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

Actual paths may differ.

Only change needed files.

---

## 72. Expected Output From This Phase

At the end of Prompt 09 implementation, project should have:

* role-wise plan catalog foundation
* pricing page
* subscription records
* subscription lifecycle foundation
* plan gate helper
* posting gate integration foundation
* usage counters
* Razorpay checkout foundation
* webhook endpoint with signature verification
* webhook idempotency
* payment records
* invoice records
* GST profile
* sequential invoice numbering foundation
* trial foundation
* coupon foundation
* add-on foundation
* refund/credit note foundation
* billing dashboard
* admin billing foundation
* RLS policies
* provider setup-required states
* no fake payment/invoice/GST
* docs updated
* checks run
* manual verification pending

---

## 73. Forbidden Outcomes

This phase must not leave:

* fake payment success
* subscription activation from client callback only
* webhook without signature verification
* duplicate webhook duplicating invoice/subscription
* fake active plan
* fake invoice
* fake GST verification
* fake refund
* fake credit note
* wrong user billing access
* public billing access
* provider secret in client
* service role in client
* client-side price trusted
* plan gate bypass
* posting gate bypass if claimed active
* admin billing permission bypass
* private billing page indexable
* private billing data public cached
* DB changes without migration
* RLS missing on private billing tables
* docs outdated
* manual verification skipped

---

## 74. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* plan/subscription foundation exists but Razorpay setup-required
* webhook endpoint exists but not production-tested
* invoice PDF setup-required
* email invoice delivery setup-required
* refund provider setup-required
* add-ons partial
* trial/coupon foundation partial
* usage counters partial
* posting gate partially integrated
* RLS runtime tests pending
* responsive/browser checks pending

### `FAIL`

Use if:

* build fails
* fake payment success shown
* subscription activates without verified webhook/admin grant/trial
* webhook signature not verified
* duplicate webhook creates duplicate invoice
* provider secret exposed
* wrong user can view billing
* client-side price trusted
* plan/posting gate bypass exists while claimed active
* RLS missing on private billing tables
* DB changes missing migration
* private billing page public/indexable/cached

### `BLOCKED`

Use if:

* Prompt 04 entity foundation failed and posting gates depend on it
* Prompt 06 dashboards failed and billing UI depends on it
* Prompt 07 admin foundation failed and admin billing depends on it
* Supabase/RLS unavailable blocks safe billing
* raw body webhook handling impossible without framework setup
* package/build baseline broken
* architecture conflict needs owner decision

### `SETUP_REQUIRED`

Use for:

* Razorpay keys missing
* Razorpay webhook secret missing
* email provider missing
* PDF generation missing
* GST validation provider missing
* cron/expiry jobs missing
* Supabase env missing

Setup-required is acceptable only if no fake payment/billing functionality appears.

---

## 75. Final Response Required Format

Return final response in this structure:

```txt id="prompt-09-final-response-format"
Summary:
- what billing/payment/subscription/trial/GST foundation was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Plans/subscriptions:
- plan catalog:
- role-wise plans:
- subscription lifecycle:
- usage counters:
- posting gates:

Checkout/payment:
- checkout order:
- payment attempts:
- Razorpay setup:
- webhook endpoint:
- webhook signature:
- idempotency:
- reconciliation:

Invoices/GST:
- invoices:
- invoice numbering:
- GST profile:
- GST breakdown:
- invoice PDF/email:

Trials/coupons/add-ons:
- trials:
- coupons:
- add-ons:

Refunds/cancellations:
- refunds:
- credit notes:
- cancellation/downgrade:
- grace period:

Dashboards/admin:
- user billing dashboard:
- owner/broker/builder integration:
- admin billing:
- permissions/audit:

RLS/security:
- tables:
- policies:
- wrong user billing denial:
- provider secrets:
- private noindex/cache:
- fake payment prevention:

Provider/setup-required:
- Razorpay:
- Razorpay webhook:
- email:
- PDF:
- GST validation:
- cron/jobs:

Docs updated:
- path list

Tests/checks run:
- command: result

Bugs/issues found:
- bug IDs or none

Rollback notes:
- code:
- database:
- RLS:
- webhook/provider:
- invoice sequence:

Manual verification:
- pending prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md

Next step:
- run prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
```

Do not say only “done”.

---

## 76. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
```

Do not start Prompt 10 until Prompt 09 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 77. Common Bugs To Watch For

Create/track bugs for:

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

## 78. Quality Bar

This phase is successful when future phases can rely on:

* pricing plans are honest
* subscriptions are role-scoped
* posting gates are server-side
* payment success requires verified webhook
* webhook idempotency exists
* invoices are generated only after verified payment/admin event
* invoice numbering is unique
* GST data is protected
* user billing data is own-user-only
* admin billing is permission-scoped
* no provider secrets leak
* no fake payment/invoice/refund/GST exists
* private billing pages are noindex/no-store
* docs accurately updated
* manual verification is ready

---

## 79. Final Rule For Prompt 09

Implement billing safely.

Payment success only after verified webhook.

Never activate subscription from client callback alone.

Verify Razorpay webhook signature.

Use webhook idempotency.

Use server-side price validation.

Generate invoices only after verified payment or authorized admin event.

Protect GST and billing data.

Protect provider secrets.

Use RLS.

Use private noindex/no-store.

Show setup-required when provider keys are missing.

Do not fake payment.

Do not fake active plan.

Do not fake invoice.

Do not fake GST.

Do not fake refund.

Do not trust client price.

Do not skip migrations for DB changes.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
