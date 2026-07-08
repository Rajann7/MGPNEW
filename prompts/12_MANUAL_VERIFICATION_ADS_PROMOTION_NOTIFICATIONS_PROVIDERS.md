# prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md

# My Gujarat Property — Prompt 12 Manual Verification: Ads, Promotion, Notifications And Providers

> **DESIGN-MATCH CHECK (mandatory):** Verify built screens match `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 8 & 13** and all `docs/10` "Design Add-Ons". Confirm: 7-step ad wizard w/ per-size creatives, "AD" labelling, camelCase `{{tokUserName}}` tokens, defaults-new-users-only, provider graceful-degradation states, OTP+SMS one card, write-only secrets.

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
```

This prompt verifies the **Ads, Promotion, Notifications And Providers** phase.

Do not skip this verification.

Do not start Prompt 13 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real ads, notification, provider, RLS, privacy, sponsored label, fake-data, provider-secret, responsive and docs checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
Prompt Number: 12 Verification
Phase: Ads, Promotion, Notifications And Providers
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
Previous Prompt: prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
Next Implementation Prompt: prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that ads, promotions, notifications and providers are implemented honestly, safely, privately and without fake delivery or fake metrics.

This verification checks:

* builder ad dashboard
* builder-only campaign creation
* campaign model
* ad creative model
* ad placement model
* ad targeting model
* ad scheduling
* campaign status lifecycle
* own published project eligibility
* RERA gate
* payment/ad credit gate
* creative media integration
* admin ad moderation
* ad approval workflow
* public active ad serving
* Sponsored label requirement
* city/location targeting
* nearby/IP fallback setup status
* impression event tracking
* click event tracking
* ad metrics foundation
* fraud filtering foundation
* frequency cap foundation
* notification events
* notification records
* notification center
* notification bell
* real unread count
* mark read
* mark all read
* notification preferences
* notification templates
* notification deep links
* recipient privacy
* provider registry
* provider modes
* provider setup-required states
* email provider foundation
* SMS provider foundation
* WhatsApp provider foundation
* push provider foundation
* OTP/payment/maps/media provider status references
* provider delivery logs
* retry/DLQ foundation
* provider webhook/callback foundation
* provider secret masking
* provider admin permissions
* RLS policies
* public/private table protection
* hidden contact protection
* open redirect protection
* private noindex/no-store
* responsive ads/notification/provider UI
* docs updates
* Prompt 13 readiness

This phase does not verify full production WhatsApp/SMS/email approval, final ad billing settlement, final fraud ML detection, final notification digest cron, final native push rollout, external ad network integration, or final marketing automation. Those are later or operational checks.

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
prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md
prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md
prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md
prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
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
docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md
docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect all changed implementation files from Prompt 12.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* ads/promotion campaign foundation
* builder dashboard ad management
* admin ad moderation
* public ad serving
* ad targeting
* ad payment/RERA/project gates
* ad creative media integration
* ad metrics/fraud/frequency foundation
* notification center
* notification preferences
* notification templates
* provider abstractions
* provider registry/status
* provider delivery logs
* provider retry/DLQ
* provider webhooks/callbacks
* provider secrets and permission checks
* RLS/private data protection
* docs/checklist updates

This verification does not cover:

* final external provider production onboarding
* full production WhatsApp template approval
* SMS DLT approval
* final email SPF/DKIM/DMARC validation unless configured
* final native mobile push
* full ad auction algorithm
* ad billing settlement beyond foundation
* AI ad targeting
* AI creative generation
* final marketing automation
* final high-volume notification load test
* final fraud ML scoring

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 12 changed files
3. inspect DB migration
4. inspect ad campaign tables
5. inspect notification tables
6. inspect provider tables/configs
7. inspect RLS policies
8. inspect builder ad dashboard routes
9. inspect admin ad moderation routes
10. inspect public ad serving view/API
11. inspect Sponsored label UI
12. inspect project/RERA/payment gates
13. inspect creative/media integration
14. inspect ad targeting/scheduling/eligibility
15. inspect impression/click tracking
16. inspect ad metrics/fraud/frequency handling
17. inspect notification event creation
18. inspect notification bell/center/unread count
19. inspect notification preferences/templates/deep links
20. inspect provider registry/status admin UI
21. inspect provider delivery/retry/DLQ/webhook foundation
22. search for fake ads/metrics/notifications/provider delivery
23. search for hidden contact in ad/notification/provider payloads
24. search for provider secret leaks/service role exposure
25. verify private noindex/no-store
26. run available automated checks
27. run manual smoke checks where possible
28. test responsive widths
29. update required docs
30. create bugs for failures
31. decide final verification result
32. update `brain.md`
33. prepare Prompt 13 readiness note

Do not skip docs updates.

---

## 6. Required File Inspection

Inspect likely changed files:

```txt id="file-inspection"
src/app/dashboard/builder/ads/
app/dashboard/builder/ads/
src/app/dashboard/builder/promotions/
app/dashboard/builder/promotions/
src/app/dashboard/notifications/
app/dashboard/notifications/
src/app/admin/ads/
app/admin/ads/
src/app/admin/promotions/
app/admin/promotions/
src/app/admin/notifications/
app/admin/notifications/
src/app/admin/providers/
app/admin/providers/
src/app/admin/provider-status/
app/admin/provider-status/
src/app/api/ads/
app/api/ads/
src/app/api/notifications/
app/api/notifications/
src/app/api/providers/
app/api/providers/
src/app/api/webhooks/providers/
app/api/webhooks/providers/
src/components/ads/
components/ads/
src/components/promotions/
components/promotions/
src/components/notifications/
components/notifications/
src/components/providers/
components/providers/
src/components/layout/NotificationBell.*
components/layout/NotificationBell.*
src/lib/ads/
lib/ads/
src/lib/promotions/
lib/promotions/
src/lib/notifications/
lib/notifications/
src/lib/providers/
lib/providers/
src/lib/email/
lib/email/
src/lib/sms/
lib/sms/
src/lib/whatsapp/
lib/whatsapp/
src/lib/push/
lib/push/
src/lib/actions/ads.*
lib/actions/ads.*
src/lib/actions/promotions.*
lib/actions/promotions.*
src/lib/actions/notifications.*
lib/actions/notifications.*
src/lib/actions/providers.*
lib/actions/providers.*
src/lib/validators/ads.*
lib/validators/ads.*
src/lib/validators/notifications.*
lib/validators/notifications.*
src/lib/validators/providers.*
lib/validators/providers.*
src/lib/permissions/
lib/permissions/
src/types/ads.*
types/ads.*
src/types/notifications.*
types/notifications.*
src/types/providers.*
types/providers.*
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

If Prompt 12 changed database schema, verify migration exists.

Expected pattern:

```txt id="expected-migration"
supabase/migrations/*_ads_promotion_notifications_providers.sql
```

Verify migration includes:

* purpose
* phase: Prompt 12
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* event idempotency constraints
* public active ads view if implemented
* provider webhook event unique constraints
* destructive changes yes/no
* backup required yes/no
* rollback notes

If DB changed without migration:

* create critical bug
* mark verification `FAIL`
* do not start Prompt 13

If migration exists without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL` depending data/provider/public ad risk

If DB not changed because Supabase/env unavailable:

* mark DB/RLS runtime checks `SETUP_REQUIRED`
* do not claim RLS PASS

---

## 8. Expected Table Verification

If schema exists, check for implemented or reused tables.

Possible tables:

```txt id="expected-tables"
ad_campaigns
ad_creatives
ad_placements
ad_targets
ad_events
ad_metrics_daily
ad_approval_events
ad_fraud_events
promotion_credits
notification_events
notifications
notification_templates
notification_preferences
notification_deliveries
notification_delivery_attempts
notification_digests
provider_registry
provider_configurations
provider_status_checks
provider_delivery_logs
provider_webhook_events
provider_dead_letters
provider_audit_logs
```

Minimum safe foundation should include:

* ad campaign storage if ads UI exists
* campaign owner/builder profile reference
* project reference
* campaign status field
* approval status/events if moderation exists
* notification record table if notification UI exists
* notification recipient/read status
* provider status/config/log foundation if provider UI exists
* RLS on private tables
* public active ads view/API if public ads are served

If implementation claims feature complete but no storage/RLS model exists:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 9. Builder Ads Dashboard Verification

Verify builder ads dashboard:

* requires auth
* builder role required
* builder sees own campaigns only
* wrong builder campaigns hidden/denied
* owner/broker denied project ads
* staff/admin separation follows admin routes
* create campaign route works or setup-required
* campaign list uses real data/no-data
* no fake campaigns
* no fake metrics
* mobile responsive
* no dead buttons

If owner/broker can create project ad:

* create critical bug
* mark `FAIL`

If builder can view another builder's campaign:

* create critical bug
* mark `FAIL`

---

## 10. Builder Campaign Creation Verification

Verify campaign creation:

* builder authenticated
* builder selects own project only
* selected project must be published/approved
* draft/pending/rejected/paused/deleted projects denied
* project location active/canonical
* RERA status validated if required
* payment/ad credit gate checked if active
* creative upload/media selection real/setup-required
* target locations validated
* schedule validated
* campaign created as draft/submitted, not active directly
* no fake approval
* no fake payment

If campaign becomes active without review/payment/gates:

* create bug
* mark `FAIL`

---

## 11. Project Eligibility Verification

Verify project eligibility for ads:

* project belongs to builder
* project is approved/published
* project not deleted
* project not paused/private
* project has public-safe detail page
* media/creative ready if required
* RERA status valid if required/applicable
* payment/ad credit/subscription gate satisfied if active
* project location valid
* project detail does not leak hidden contact

If unpublished project ad appears public:

* create critical bug
* mark `FAIL`

---

## 12. Owner/Broker Ads Boundary Verification

Verify:

* Owner dashboard does not show active project ad creation CTA.
* Broker dashboard does not show active project ad creation CTA.
* Owner/Broker direct URL to builder ads denied.
* Owner/Broker cannot create ad campaign through server action.
* Future listing boost placeholders are clearly setup-required if present.
* No fake owner/broker promotion is active.

If Owner/Broker can create builder project ad:

* create critical bug
* mark `FAIL`

---

## 13. Campaign Status Verification

Verify campaign statuses:

```txt id="ad-campaign-statuses"
draft
submitted
under_review
need_changes
approved
scheduled
active
paused
rejected
expired
cancelled
deleted
suspended
payment_pending
payment_failed
credit_exhausted
```

Check:

* status transitions server-validated
* active requires approved + schedule + payment/ad credit if gate active
* rejected/need_changes not public
* paused/suspended/deleted not public
* expired not public
* deleted soft-deleted or hidden
* actions audited where implemented
* no arbitrary client status mutation

If public can force campaign active:

* create critical bug
* mark `FAIL`

---

## 14. Creative Status Verification

Verify creative statuses:

```txt id="ad-creative-statuses"
draft
uploaded
validating
ready
submitted
approved
rejected
need_changes
deleted
setup_required
```

Check:

* creative uses real media asset or setup-required
* creative validation status real
* creative approved before public serving
* desktop/tablet/mobile variants real or setup-required
* unsafe SVG denied/sanitized by Prompt 10 rules
* no fake banner upload
* no hidden contact in media metadata/object key
* public creative uses public-safe CDN/media variant only
* private/original media not public

If ad creative appears public with private media URL:

* create critical bug
* mark `FAIL`

---

## 15. Ad Placement Verification

Verify placements:

```txt id="ad-placements"
home_hero_banner
home_city_banner
home_project_strip
search_top_sponsored
search_inline_sponsored
project_detail_sponsored
property_detail_sponsored
builder_profile_sponsored
blog_sidebar_sponsored
notification_promo_later
```

Check:

* placement names allowlisted
* unsupported placements setup-required
* homepage placement works only with eligible ads
* other placements not fake-filled
* no broken placement UI
* sponsored label visible in every placement
* no hidden contact
* no organic/sponsored confusion

If public ad is rendered without Sponsored label:

* create bug
* mark `FAIL` or `PARTIAL` depending exposure

---

## 16. RERA Gate Verification

Verify RERA gate for project ads:

* RERA required/applicable logic documented
* valid RERA status required when applicable
* pending/unknown invalid if required
* no fake RERA valid flag
* RERA proof docs private
* ad disclaimer shown
* ad does not imply legal guarantee
* admin cannot bypass without Super Admin override/audit if implemented
* public ad safe

If RERA-required project ad approves with invalid RERA:

* create bug
* mark `FAIL` or `PARTIAL`

If public ad shows fake RERA approval:

* create critical bug
* mark `FAIL`

---

## 17. Payment / Ad Credit Gate Verification

Verify Prompt 09 integration:

* plan ads_allowed flag if used
* ad credit/subscription gate if active
* verified payment required for paid ad/credit
* payment_pending campaigns not public
* payment_failed campaigns not public
* client callback does not mark ad paid
* admin manual credit grant audited if implemented
* no fake payment/ad credit
* setup-required if billing integration incomplete

If paid ad becomes public without verified payment/ad credit while gate claimed active:

* create critical bug
* mark `FAIL`

---

## 18. Ad Targeting Verification

Verify targeting options:

```txt id="ad-targeting-options"
all_gujarat
selected_districts
selected_talukas
selected_cities
selected_localities
project_location_nearby
selected_user_city
ip_city_fallback
```

Check:

* target type allowlisted
* location IDs active/canonical
* wrong/invalid locations denied
* all Gujarat supported safely if selected
* selected city preference works if available
* IP city fallback setup-required if provider missing
* nearby fallback setup-required if geocoding missing
* no fake geolocation
* no targeting by sensitive personal data
* private targeting internals not public

If ad targeting accepts arbitrary unsafe location/data:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 19. Ad Scheduling Verification

Verify:

* start_at required or safely defaulted
* end_at required or safely defaulted
* IST/timezone handled
* start before end
* scheduled campaigns not served early
* expired campaigns not served
* paused campaigns not served
* time comparisons server-side
* no fake active status

If expired campaign still public:

* create bug
* mark `FAIL`

---

## 20. Admin Ads Moderation Verification

Verify admin ads module:

* permission-scoped
* guest/public denied
* staff without ads permission denied
* campaign list real/no-data
* creative preview real
* project eligibility visible
* payment/ad credit status visible if available
* RERA status visible if available
* approve/reject/request changes actions
* rejection/request changes require reason
* status transition server-validated
* actions audited
* no fake approval
* no hidden contact
* no provider secrets

If staff without permission can approve ads:

* create critical bug
* mark `FAIL`

---

## 21. Public Ad Serving Verification

Verify public ad serving view/API returns only ads where:

* campaign active
* campaign approved
* within schedule
* project published/public
* creative ready/public-safe
* target matches
* payment/ad credit valid if gate active
* RERA valid if required
* not paused/suspended/deleted/expired
* fraud block not active
* frequency cap honored if implemented

Public response may include only:

* safe campaign/ad ID
* creative URL
* target URL
* Sponsored label flag
* safe title
* safe project/builder name
* safe location
* safe disclaimer/RERA status

Public response must not include:

* payment data
* private targeting internals
* hidden contact
* admin notes
* fraud internals
* provider secrets
* private media URL

If public API returns draft/rejected/private campaign:

* create critical bug
* mark `FAIL`

---

## 22. Sponsored Label Verification

Every public ad must show:

```txt id="sponsored-label"
Sponsored
```

Check:

* label visible on desktop
* label visible on mobile
* label not hidden by small viewport
* label not color-only
* label shown in homepage/search/detail/profile placements where ads exist
* label not removable by campaign data
* ad not styled exactly as organic without label
* metadata/schema does not represent ad as organic result

If public ad appears without Sponsored label:

* create bug
* mark `FAIL` if production/public, `PARTIAL` if placeholder-only and not served

---

## 23. Ad Click Tracking Verification

Verify click tracking:

* click target internal/safe
* no open redirect
* campaign exists
* campaign active/public-safe if counting
* event stored if tracking implemented
* duplicate rapid clicks filtered if implemented
* fraud status stored if implemented
* click does not expose private campaign data
* no fake clicks
* if tracking not implemented, metrics show setup/no-data

If ad click endpoint allows arbitrary external redirect:

* create critical bug
* mark `FAIL`

---

## 24. Ad Impression Tracking Verification

Verify impression tracking:

* event counted only when ad rendered if implemented
* no server fetch-only fake impression unless documented
* duplicate immediate impressions filtered if implemented
* session/IP/user-agent privacy-safe hashing if stored
* no raw IP public
* fraud status stored if implemented
* no fake impressions
* if tracking not implemented, metrics show setup/no-data
* no unbounded event spam without rate limit/foundation

If UI shows fake impression totals:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 25. Ad Metrics Verification

Verify metrics:

* impressions real or no-data
* clicks real or no-data
* CTR computed from real impressions/clicks only
* spend/credits real or setup-required
* aggregation job real or setup-required
* daily metrics real if shown
* no fake chart data
* no fake conversion rate
* no fake revenue
* no fake “top performing”
* builder sees own metrics only
* admin sees permission-scoped metrics

If metrics are hardcoded/demo in production UI:

* create bug
* mark `FAIL`

---

## 26. Ad Fraud Foundation Verification

Verify fraud foundation:

```txt id="ad-fraud-statuses"
valid
suspected_duplicate
suspected_bot
suspected_self_click
rate_limited
manual_review
invalid
```

Check:

* fraud status field exists if fraud claimed
* duplicate click/impression filtering real or documented partial
* self-click detection foundation real or documented partial
* bot-like user agent flag real or documented partial
* manual review possible or setup-required
* no fake fraud protection claim
* raw IP not exposed
* rate limits documented

If fraud dashboard shows fake filtered events:

* create bug
* mark `PARTIAL`

---

## 27. Frequency Cap Verification

If frequency cap implemented, verify:

* per session/user/placement/campaign cap real
* state persisted or session-managed honestly
* no fake cap
* privacy/cookie preferences respected
* public ad still labelled
* fallback safe if cap storage unavailable

If not implemented:

* feature status should be `NOT_STARTED`, `PARTIAL` or `SETUP_REQUIRED`
* no claim that frequency cap is active

---

## 28. Ad Rotation / Priority Verification

Verify rotation/priority:

* selects eligible active campaigns only
* placement match
* target match
* priority permission-scoped
* rotation not fake
* no rejected/pending/expired ads
* no private campaign data in public response
* no sponsored ad mixed as organic without label
* no fake priority outcome

If rotation sometimes serves ineligible campaign:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 29. Notification Event Verification

Verify notification events are created from real actions.

Event examples:

```txt id="notification-event-types"
lead_created
contact_request_received
contact_request_approved
contact_request_rejected
new_message
proposal_sent
proposal_viewed
proposal_accepted
proposal_rejected
site_visit_requested
site_visit_scheduled
site_visit_rescheduled
site_visit_cancelled
property_submitted
property_approved
property_rejected
property_need_changes
project_submitted
project_approved
project_rejected
project_need_changes
requirement_submitted
requirement_approved
requirement_rejected
requirement_need_changes
payment_success_verified
payment_failed
invoice_issued
subscription_expiring
subscription_expired
trial_started
trial_expiring
trial_expired
media_processing_failed
ad_submitted
ad_approved
ad_rejected
ad_need_changes
ad_active
ad_paused
ad_expired
support_reply
verification_status_changed
system_announcement
security_alert
```

Check:

* event comes from real source
* recipient is correct
* event is deduplicated where needed
* no fake events
* no hidden contact in payload
* deep link permission-safe
* external delivery only if provider configured/tested

If fake notification event appears as real:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 30. Notification Status Verification

Verify statuses:

```txt id="notification-statuses"
created
queued
sent_in_app
delivered
read
archived
failed
cancelled
expired
```

Delivery statuses:

```txt id="notification-delivery-statuses"
pending
queued
sent
delivered
failed
bounced
blocked
skipped
retrying
dead_letter
setup_required
```

Check:

* in-app status real
* external delivery status real only
* read status based on DB
* delivered not set unless provider confirms or channel logic supports it
* failed/skipped/setup-required honest
* no fake delivered/read
* no fake notification count

If unread count is hardcoded:

* create bug
* mark `FAIL`

---

## 31. Notification Center Verification

Verify notification center:

* requires auth
* user sees own notifications only
* wrong user denied
* list paginated
* unread filter works if implemented
* mark read works
* mark all read works
* archive works if implemented
* deep links safe
* empty state real
* no fake notifications
* no hidden contact in title/body
* no public cache
* mobile responsive

If user can view another user's notifications:

* create critical bug
* mark `FAIL`

---

## 32. Notification Bell Verification

Verify notification bell:

* real unread count from DB
* latest dropdown uses real notifications
* mark read action updates DB
* mark all read action updates DB if implemented
* empty state
* mobile bottom sheet
* loading state
* no fake “99+”
* no hardcoded unread count
* no hidden contact in preview
* no notification shown to guest unless safe local state

If bell count is fake/hardcoded:

* create bug
* mark `FAIL`

---

## 33. Notification Preferences Verification

Verify preferences:

* user can view own preferences
* user can update own preferences
* wrong user denied
* in-app/email/SMS/WhatsApp/push channels accurate
* marketing opt-in not prechecked
* transactional/security required notifications documented
* quiet hours/digest setup status honest
* external provider setup-required if missing
* preferences RLS protected
* no fake save
* no hidden contact

If preferences are public or wrong-user accessible:

* create critical bug
* mark `FAIL`

---

## 34. Notification Template Verification

Verify templates:

* template key allowlisted
* channel defined
* role/category safe
* title/body sanitized
* variables allowlisted
* forbidden variables blocked by default
* no hidden contact variable unless explicitly authorized and safe
* no provider secrets
* no raw unsafe HTML/script
* version/audit if implemented
* admin permission required for changes

Template variable allowlist examples:

```txt id="template-variables"
user_name
role
entity_type
entity_title
project_title
property_title
requirement_title
status
reason_safe
invoice_number
campaign_title
ad_status
support_ticket_id
deep_link
```

Forbidden by default:

```txt id="forbidden-template-variables"
phone
email
whatsapp
hidden_contact
raw_message_body
private_admin_note
provider_secret
service_role_key
payment_secret
private_document_url
```

If template can inject provider secret/hidden contact:

* create critical bug
* mark `FAIL`

---

## 35. Notification Deep Link Verification

Verify notification deep links:

* internal routes only
* no open redirect
* permission checked at destination
* no private token in URL
* no hidden contact in URL
* works for owner/broker/builder/admin roles
* safe unavailable/deleted target state
* no public cache

Example routes:

```txt id="notification-deep-links"
dashboard/owner/leads/{id}
dashboard/broker/crm/{id}
dashboard/builder/leads/{id}
dashboard/messages/{thread_id}
dashboard/site-visits/{id}
dashboard/billing/invoices/{id}
dashboard/builder/ads/{campaign_id}
admin/moderation/properties/{id}
admin/ads/{campaign_id}
```

If deep link allows wrong-user private access:

* create critical bug
* mark `FAIL`

---

## 36. Notification Privacy Verification

Verify notifications do not expose:

* hidden phone/email
* private contact
* private message body unless safe preview policy exists
* private billing data beyond own user
* private media/document URLs
* admin notes
* provider secrets
* another user's data
* exact private address unless intended

Check notification previews, DB payloads, delivery logs, email/SMS/WhatsApp templates, push payloads.

If hidden contact leaks through notification:

* create critical bug
* mark `FAIL`

---

## 37. Role-Based Notification Verification

Verify role-specific notifications.

### Owner

* property moderation notifications
* requirement moderation notifications
* lead/message/site visit notifications
* billing/payment/invoice notifications
* verification/support/security notifications

### Broker

* property/requirement moderation notifications
* lead/CRM/proposal/message notifications
* site visit notifications
* billing/payment/invoice notifications
* verification/support/security notifications

### Builder

* project moderation notifications
* project lead/matching requirement/proposal/message notifications
* site visit notifications
* ad campaign notifications
* billing/payment/invoice notifications
* verification/RERA/support/security notifications

### Admin/Staff

* moderation assignment
* verification review
* support ticket
* ad review
* payment/reconciliation
* provider failure
* security alert
* system health

Check:

* recipients correct
* wrong role not notified with private data
* admin notifications permission-scoped
* no fake role notifications

---

## 38. Provider Registry Verification

Verify provider registry:

* provider category
* provider name
* mode/status
* environment
* last tested fields if implemented
* last success/failure fields if implemented
* masked config
* setup notes
* audit fields
* no plaintext secrets
* no fake active status
* Super Admin/permission control

Provider modes:

```txt id="provider-modes"
not_started
setup_required
disabled
test_mode
sandbox
active
failed
degraded
paused
blocked
```

If provider active without config/test evidence:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 39. Provider Categories Verification

Verify provider categories:

```txt id="provider-categories"
email
sms
whatsapp
push
otp
payment
maps
media_storage
cdn
analytics
captcha
error_monitoring
search
cron_jobs
```

Check:

* statuses honest
* references to Prompt 09 payment accurate
* references to Prompt 10 media/CDN accurate
* references to Prompt 11 maps/analytics accurate
* missing providers setup-required/not-started
* no fake external delivery
* no secret exposure

---

## 40. Email Provider Verification

If email provider implemented:

* provider configured/tested or setup-required
* secret server-only
* sender configured
* delivery log real
* bounce/failure handling setup or documented
* unsubscribe for marketing/digest if applicable
* transactional email policy respected
* no fake email sent
* no hidden contact unless authorized
* no provider secret in email/logs

If provider not configured:

* email delivery status setup-required/skipped
* in-app notification still possible
* API_PROVIDER_STATUS updated

If UI/log says email sent without provider/test:

* create bug
* mark `FAIL`

---

## 41. SMS Provider Verification

If SMS provider implemented:

* provider configured/tested or setup-required
* secret server-only
* DLT/template setup status documented if required
* delivery log real
* cost/rate controls documented
* no fake SMS sent
* no hidden contact in SMS
* no provider secret in client/logs
* transactional/marketing consent respected

If provider missing:

* SMS delivery setup-required/skipped
* no fake sent status

If UI/log says SMS sent without provider/test:

* create bug
* mark `FAIL`

---

## 42. WhatsApp Provider Verification

If WhatsApp provider implemented:

* API token server-only
* templates configured/approved or setup-required
* user opt-in handled where required
* wa.me fallback not marked API delivery
* delivery status real
* webhook/callback setup if implemented
* no fake WhatsApp sent
* no hidden contact unless authorized
* no provider secret in client/logs

If only wa.me exists:

* WhatsApp API status must not be `ACTIVE`
* mark as manual link/fallback if product allows

If UI/log says WhatsApp sent without API/provider:

* create bug
* mark `FAIL`

---

## 43. Push Provider Verification

If push implemented:

* subscription table/private
* browser permission prompt safe
* VAPID/private key server-only
* user preferences respected
* no private sensitive payload on lockscreen unless safe
* delivery logs real/setup
* no fake push sent
* service worker safe
* no hidden contact

If push not implemented:

* status `NOT_STARTED` or `SETUP_REQUIRED`
* no fake push UI

If push payload leaks private message/contact:

* create critical bug
* mark `FAIL`

---

## 44. OTP Provider Boundary Verification

Verify Prompt 12 did not break auth/OTP.

Check:

* public OTP provider status honest
* no fake OTP production success
* dev/test OTP labelled if present
* provider secrets server-only
* admin login still separate Google/email
* public mobile OTP not used for admin login
* rate/cost controls documented if OTP provider active

If OTP provider status falsely active:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 45. Payment Provider Boundary Verification

Verify payment provider references:

* Razorpay status matches Prompt 09/API_PROVIDER_STATUS
* no payment secret exposure
* ad payment/ad credit gate does not bypass webhook-only success
* payment provider not marked active unless Prompt 09 verified
* no fake payment provider health
* public ad not paid by fake payment

If ad gate uses client callback as payment success:

* create critical bug
* mark `FAIL`

---

## 46. Maps / Geolocation Provider Boundary Verification

Verify maps/geolocation/IP city:

* Google Maps/geocoding status honest
* no fake geolocation
* no fake IP city targeting
* selected city targeting works without map provider if data exists
* exact private address not exposed
* map API keys restricted/setup-required
* nearby fallback setup-required if geocoding missing

If IP city fallback fakes city without provider/data:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 47. Media/CDN Provider Boundary Verification

Verify ad creatives use Prompt 10 media system:

* media provider status honest
* creative upload disabled/setup-required if media/R2 missing
* public ad creative uses ready public media
* private original not public
* no fake CDN
* no private creative media public
* no provider secret exposure

If ad creative uses private media URL:

* create critical bug
* mark `FAIL`

---

## 48. Captcha / Anti-Abuse Provider Verification

If captcha/Turnstile integrated:

* public site key only if configured
* secret server-only
* setup-required if missing
* no fake captcha protection
* accessibility considered
* rate limiting still documented
* provider status honest

If not implemented:

* status setup-required/not-started
* no fake bot protection claim

---

## 49. Provider Delivery Logs Verification

Verify delivery logs:

* provider
* channel
* notification ID
* recipient
* status
* attempt count
* provider message ID if real
* safe error code
* timestamps
* no secrets
* no hidden contact unless authorized and masked
* admin access permission-scoped
* user access limited if exposed
* no fake delivered status

If logs store secrets/raw private data:

* create critical bug
* mark `FAIL`

---

## 50. Retry / DLQ Verification

Verify retry/DLQ foundation:

```txt id="delivery-retry-statuses"
pending
retrying
max_attempts_reached
dead_letter
manual_retry_scheduled
resolved
```

Check:

* retry count tracked
* max attempts tracked
* next retry time if implemented
* cron/worker status honest
* manual retry permission-scoped
* retry idempotency
* DLQ records private
* no secrets/private data leak
* no fake retry success
* no fake empty DLQ if records unknown

If retry/DLQ UI shows fake success:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 51. Provider Webhook / Callback Verification

If provider webhook/callback endpoints exist:

* provider signature verified if provider supports it
* event ID idempotency
* event type allowlisted
* delivery status updated only after valid callback
* duplicate callback safe
* unsupported callback safely logged/skipped
* no secret in response/log
* raw payload protected
* RLS/server-only update path safe
* no fake callback success

If webhook endpoint accepts unverified callbacks and mutates records:

* create critical bug
* mark `FAIL`

---

## 52. Provider Status Admin UI Verification

Verify admin provider/status UI:

* Super Admin/permission required
* provider statuses real/setup-required
* masked config only
* no secrets revealed
* test provider button real or setup-required
* delivery logs real/no-data
* webhook status real/setup
* retry/DLQ status real/setup
* audit timeline if implemented
* no fake active/test success
* no public access

If provider secret is visible in UI:

* create critical bug
* mark `FAIL`

---

## 53. Provider Secret Deep Check

Search code/client/docs/logs for:

```txt id="provider-secret-patterns"
WHATSAPP_BUSINESS_TOKEN
WHATSAPP_VERIFY_TOKEN
SMS_API_KEY
MSG91_AUTH_KEY
FAST2SMS_API_KEY
TWILIO_AUTH_TOKEN
SENDGRID_API_KEY
RESEND_API_KEY
SMTP_PASSWORD
FCM_SERVER_KEY
VAPID_PRIVATE_KEY
TURNSTILE_SECRET_KEY
GOOGLE_MAPS_SERVER_KEY
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
R2_SECRET_ACCESS_KEY
SUPABASE_SERVICE_ROLE_KEY
SERVICE_ROLE
```

Verify:

* no real secret in client component
* no real secret in provider admin UI
* no real secret in notification/ad payload
* no real secret in delivery logs
* no real secret in webhook response
* no real secret in `.env.example`
* no real secret in docs/final response
* no service role on client

If real secret exposure found:

* do not print secret
* create critical bug
* mark `FAIL`
* recommend secret rotation

---

## 54. Hidden Contact Deep Check

Search ads/notifications/provider payloads for:

```txt id="hidden-contact-search"
phone
mobile
email
whatsapp
contact_phone
contact_email
owner_phone
broker_phone
builder_phone
hidden_contact
contact_visibility
tel:
mailto:
wa.me
```

Check:

* no hidden contact in public ad payload
* no hidden contact in ad creative metadata
* no hidden contact in notification title/body
* no hidden contact in external provider payload
* no hidden contact in provider logs
* no hidden contact in template variables
* no hidden contact in deep links
* no hidden contact in public ad schema/metadata

If hidden contact leaks:

* create critical bug
* mark `FAIL`

---

## 55. Fake Ads / Metrics Verification

Search for fake ad data:

```txt id="fake-ads-patterns"
fake ad
mock ad
demo campaign
sample campaign
impressions: 1200
clicks: 100
ctr
active: true
approved: true
sponsored demo
dummy banner
ad payment success
```

Verify:

* fake/demo fixtures dev-only or tests-only
* no fake campaigns in production UI
* no fake public ads
* no fake active status
* no fake approval
* no fake payment
* no fake impressions/clicks/CTR
* no fake fraud filter
* no fake revenue/spend

If fake ad data appears real:

* create bug
* mark `FAIL`

---

## 56. Fake Notifications Verification

Search for fake notification data:

```txt id="fake-notification-patterns"
mock notification
demo notification
fake unread
unreadCount: 5
notifications: [
sample notification
message received
payment successful
delivered: true
read: false
```

Verify:

* demo notifications dev-only/tests-only
* unread count from DB only
* notification list real/no-data
* no fake provider delivery
* no fake read/delivered
* no fake security alert
* no fake payment success notification

If fake unread count appears in production UI:

* create bug
* mark `FAIL`

---

## 57. Fake Provider Delivery Verification

Search for fake provider success:

```txt id="fake-provider-patterns"
email sent successfully
sms sent successfully
whatsapp sent successfully
push sent successfully
mock provider
fake provider
provider active
delivery success
messageId: demo
test delivered
```

Check:

* provider delivery success only when provider called/tested
* setup-required if missing
* no fake active status
* no fake delivery logs
* no fake webhook callback
* no fake retry/DLQ success

If provider delivery is faked as real:

* create bug
* mark `FAIL`

---

## 58. RLS Enabled Verification

Verify RLS enabled for:

```txt id="rls-tables"
ad_campaigns
ad_creatives
ad_placements
ad_targets
ad_events
ad_metrics_daily
ad_approval_events
ad_fraud_events
promotion_credits
notification_events
notifications
notification_templates
notification_preferences
notification_deliveries
notification_delivery_attempts
notification_digests
provider_registry
provider_configurations
provider_status_checks
provider_delivery_logs
provider_webhook_events
provider_dead_letters
provider_audit_logs
```

Expected:

* builder can read/manage own campaigns only
* public reads only active public ads through safe view/API
* user reads own notifications only
* user reads own preferences only
* admin/staff access permission-scoped
* provider config/logs private
* public cannot read provider secrets/logs/webhook events
* public cannot read private ad metrics/payment data

If private ads/notifications/provider table lacks RLS:

* create critical bug
* mark `FAIL`

If database unavailable:

* mark RLS runtime verification `SETUP_REQUIRED`
* do not mark RLS PASS

---

## 59. RLS Policy Verification

Verify RLS behavior:

* anonymous cannot read private ad campaigns
* anonymous can read public active ads only via safe view/API
* builder can read own ad campaigns
* builder cannot read another builder's campaigns
* owner/broker cannot create project ad campaign
* public cannot read notification records
* user can read own notifications
* user cannot read another user's notifications
* user can read/manage own preferences
* public cannot read provider configurations/logs
* staff without provider permission denied
* admin with permission can view provider status/logs if allowed
* webhook/server update path secure

If wrong user can read notifications/campaigns/provider logs:

* create critical bug
* mark `FAIL`

---

## 60. RLS Test Suggestions

If Supabase test environment is available, run equivalent tests:

```txt id="rls-test-scenarios"
1. Anonymous select ad_campaigns → denied.
2. Anonymous select public_active_ads_view → allowed only active approved eligible ads.
3. Builder A select Builder A campaigns → allowed.
4. Builder A select Builder B campaigns → denied.
5. Owner create project ad campaign → denied.
6. Broker create project ad campaign → denied.
7. Builder A create ad for Builder B project → denied.
8. Anonymous select notifications → denied.
9. User A select User A notifications → allowed.
10. User A select User B notifications → denied.
11. User A update User B notification read_at → denied.
12. User A select User A notification_preferences → allowed.
13. Anonymous select provider_configurations → denied.
14. Staff without providers.read select provider logs → denied.
15. Staff with providers.read select masked provider status → allowed if policy supports.
16. Public select provider_webhook_events → denied.
17. Public select provider_dead_letters → denied.
18. Admin without ads.approve approve ad → denied.
```

Record exact results.

Do not mark RLS PASS without tests.

---

## 61. Public Active Ads View Verification

If public active ads view/API exists, verify it returns only:

* active status
* approved campaign
* valid schedule
* published project
* ready public creative
* valid target
* valid payment/ad credit if active
* valid RERA if required
* sponsored label flag
* safe title/location/target URL

It must exclude:

* draft/submitted/under_review/need_changes/rejected/paused/expired/cancelled/deleted/suspended
* payment_pending/payment_failed/credit_exhausted
* unpublished project
* private creative media
* hidden contact
* private targeting internals
* admin review notes
* provider secrets

If public view includes pending/rejected/expired ad:

* create critical bug
* mark `FAIL`

---

## 62. Direct URL Bypass Verification

Test or inspect:

```txt id="direct-url-checks"
/dashboard/builder/ads
/dashboard/builder/ads/new
/dashboard/builder/ads/[campaign_id]
/dashboard/notifications
/dashboard/notifications/preferences
/admin/ads
/admin/promotions
/admin/notifications
/admin/providers
/admin/provider-status
/api/ads/*
/api/notifications/*
/api/providers/*
/api/webhooks/providers/*
```

Expected:

* guest denied where private
* owner/broker denied builder ads
* wrong builder campaign denied
* public user denied admin/provider routes
* staff without permission denied
* notification wrong user denied
* provider webhooks validate signature/idempotency if supported
* private data not rendered before redirect
* private pages noindex/no-store

If direct URL bypass exposes private data:

* create critical bug
* mark `FAIL`

---

## 63. Private Noindex Verification

Verify noindex/no-store for:

* builder ads dashboard
* ad campaign management
* notification center
* notification preferences
* admin ads
* admin providers
* provider logs
* provider setup pages
* provider webhooks
* provider DLQ pages

Check:

* not in sitemap
* no private data in metadata/schema
* no public cache
* no shareable private links
* public ad slots are not private ad pages

If private notification/provider page is indexable:

* create bug
* mark `FAIL`

---

## 64. Open Redirect Verification

Verify no open redirect in:

* ad click tracking
* notification deep links
* provider callback redirects if any
* support links
* campaign target URL

Check:

* target routes internal or allowlisted
* `javascript:` blocked
* `data:` blocked
* arbitrary external URL blocked unless explicitly approved
* redirect loops prevented
* private route target permission-checked

If open redirect exists:

* create critical bug
* mark `FAIL`

---

## 65. Admin Permission Verification

Verify permissions:

```txt id="admin-permissions"
ads.read
ads.review
ads.approve
ads.reject
ads.pause
ads.priority
ads.metrics.read
ads.export
notifications.read
notifications.manage
notification_templates.manage
providers.read
providers.manage
providers.test
providers.logs.read
providers.dead_letters.manage
system_notifications.send
view_sensitive_provider
```

Check:

* server-side checks
* UI hiding not enough
* staff without permission denied by direct URL/action
* provider manage/test restricted
* ad approval audited
* provider setting changes audited
* notification template changes audited
* no secret reveal even with permission

If permission bypass exists:

* create critical bug
* mark `FAIL`

---

## 66. Audit Log Verification

Verify audit logs for:

* ad campaign submit/update
* ad approve/reject/request changes
* ad pause/suspend/resume
* ad priority change
* manual ad credit/payment override if implemented
* provider mode/config change
* provider test
* notification template change
* system notification send
* provider retry/manual DLQ action
* sensitive provider log view

Audit logs must not store:

* provider secrets
* service role key
* hidden contact
* private message content unless policy allows and masked
* raw unredacted webhook payload with secrets
* raw IP if avoidable

If high-risk admin action lacks audit and is implemented:

* create bug
* mark `PARTIAL` or `FAIL` depending severity

---

## 67. Rate Limit Verification

Verify rate-limit/foundation for:

* ad campaign creation
* creative upload sessions
* ad impression tracking
* ad click tracking
* notification creation/delivery queueing
* provider test sends
* provider webhook processing
* manual retry/DLQ actions
* mark read spam if needed

Check:

* no unbounded event writes
* provider test send limited
* click/impression endpoint protected
* provider failure does not create infinite retry loop
* rate-limit status documented

If public impression/click endpoint can be spammed unbounded with no mitigation/foundation:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 68. Provider Setup Required Verification

When provider missing, verify:

* external delivery disabled/setup-required
* in-app notification can still work if DB-ready
* no fake sent/delivered status
* user action still succeeds if notification is non-critical
* provider status updated
* admin setup guide/status shown
* no provider secret shown
* no fake provider active

Provider missing examples:

* Email missing → email delivery setup-required, no fake email sent.
* SMS missing → SMS delivery setup-required, no fake SMS sent.
* WhatsApp missing → WhatsApp setup-required, no fake WhatsApp sent.
* Push missing → push setup-required/not-started.
* Cron missing → digest/retry setup-required.
* Maps missing → IP/nearby targeting setup-required.

---

## 69. In-App Vs External Notification Verification

Verify distinction:

### In-app

* DB-backed
* recipient-scoped
* unread count real
* no external provider needed
* status sent_in_app/read based on DB

### External

* email/SMS/WhatsApp/push
* provider configured/tested
* user preference/consent respected
* delivery logs real
* setup-required if missing
* no fake delivered

If UI shows “WhatsApp sent” when only in-app notification exists:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 70. Provider Webhook Security Verification

For each provider webhook/callback endpoint:

* signature verification if provider supports it
* verify token if applicable
* event ID idempotency
* event type allowlist
* safe error response
* no secret in response
* no raw stack trace
* duplicate callback safe
* unsupported event safe
* delivery status update correct
* no public data leak

If provider webhook lacks idempotency/signature where needed:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 71. Public SEO Boundary Verification

Verify ads/notifications/providers private pages are excluded:

* builder ads dashboard not in sitemap
* admin ads not in sitemap
* provider pages not in sitemap
* notification center not in sitemap
* notification preferences not in sitemap
* ad click tracker not in sitemap
* provider webhooks not in sitemap
* private ad campaign details not indexed

Public ad creative can appear inside public page, but no private campaign metadata.

If private ad/provider/notification URL appears in sitemap:

* create critical bug
* mark `FAIL`

---

## 72. UI Verification — Ads

Verify ads UI:

* builder campaign list real/no-data
* create form validates required fields
* project dropdown only own published projects
* creative upload/select real/setup-required
* target location selector works/setup-required
* schedule fields validate
* submit for review works
* review feedback shown
* pause/resume/cancel safe
* metrics real/no-data
* no fake active campaign
* no dead buttons
* mobile usable

If builder UI shows fake metrics as real:

* create bug
* mark `FAIL`

---

## 73. UI Verification — Public Ads

Verify public ads:

* Sponsored label visible
* ad creative real/public-safe
* click target safe
* no private/pending/rejected ads
* no layout shift
* no fake placeholder paid ad
* hide empty ad slot or safe empty state
* RERA/disclaimer shown if applicable
* mobile responsive
* accessible label

If no eligible ads, there should be no fake paid ad.

---

## 74. UI Verification — Notifications

Verify notification UI:

* bell icon visible where appropriate
* real unread count
* dropdown latest real
* notification center list real
* filters work if implemented
* mark read works
* mark all read works
* preferences link works
* empty state real
* error/loading states safe
* mobile bottom sheet works
* no hidden contact
* no broken deep links

If wrong user's notification appears:

* create critical bug
* mark `FAIL`

---

## 75. UI Verification — Providers

Verify provider UI:

* permission-scoped
* provider status honest
* setup-required states clear
* masked config only
* no secret reveal
* test provider action real/setup-required
* delivery logs real/no-data
* retry/DLQ real/setup-required
* webhook status real/setup-required
* audit/status timeline if implemented
* mobile/admin responsive
* no fake green status

If provider status shows active without setup/test:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 76. Responsive Verification

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

* builder campaign list becomes cards
* campaign create form fits
* creative preview fits
* location targeting selector fits
* date/schedule inputs usable
* admin ad table becomes cards
* public Sponsored label visible
* notification dropdown/bottom sheet fits
* notification center usable
* preferences form fits
* provider admin table/cards fit
* delivery logs readable
* no horizontal scroll
* tap targets large
* action menus usable

If not all widths tested, mark responsive check `PARTIAL`.

Do not mark responsive PASS without testing.

---

## 77. Accessibility Verification

Check:

* Sponsored label readable and not color-only
* campaign form labels
* ad creative alt text
* notification bell aria label
* unread count accessible
* notification list semantic
* mark read buttons labelled
* provider status badges not color-only
* admin action buttons labelled
* modals/drawers focus-safe
* errors readable
* keyboard navigation
* large mobile tap targets

If severe accessibility blocker exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 78. Performance Verification

Verify:

* public ad query limited/indexed
* ad targeting indexes exist
* impression/click event writes rate-limited/foundation
* notification list paginated
* unread count query indexed
* provider logs paginated
* DLQ list paginated
* no unbounded campaign/admin queries
* no heavy provider SDK in client unnecessarily
* public ad images optimized/lazy
* notification bell does not N+1
* build passes

If notification bell performs unbounded query on every page:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 79. Build / Lint / Typecheck Verification

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

## 80. Automated Test Suggestions

If test framework exists, add/run tests for:

* builder can create campaign for own published project
* builder cannot create ad for another builder project
* owner/broker cannot create project ad
* active ad view excludes pending/rejected/paused/expired campaigns
* sponsored label component renders
* invalid ad click redirect blocked
* notification recipient is correct
* wrong user cannot read notification
* unread count updates after mark read
* provider setup-required prevents fake send
* provider secrets not returned from status API
* provider webhook idempotency
* RLS tests for ad/notification/provider tables

Document results.

---

## 81. Manual Smoke Test Matrix

If app can run, test:

```txt id="manual-smoke-matrix"
Builder ads:
- builder opens ads dashboard
- builder creates draft campaign for own published project
- builder cannot choose unpublished project
- builder cannot choose another builder's project
- owner/broker denied builder ads
- submit for review creates submitted/under_review status
- campaign not public before approval

Admin ads:
- staff without ads.approve denied
- admin reviews campaign
- reject/request changes requires reason
- approve only when project/RERA/payment gates pass
- action audited if implemented

Public ads:
- active approved campaign appears in correct placement
- Sponsored label visible
- pending/rejected/expired/paused campaign not shown
- click target safe
- impression/click metrics real or no-data

Notifications:
- real event creates notification
- recipient sees own notification
- wrong user denied
- unread count real
- mark read updates count
- no hidden contact in notification

Providers:
- missing provider shows setup-required
- fake email/SMS/WhatsApp not sent
- provider secrets masked
- provider logs/DLQ private
```

If safe test environment unavailable:

* inspect code
* mark runtime tests `SETUP_REQUIRED` or `PARTIAL`
* do not fake runtime PASS

---

## 82. Documentation Update Verification

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

## 83. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

* builder ad dashboard
* ad campaign model
* ad creative model
* ad placement model
* ad targeting model
* ad schedule/status lifecycle
* project eligibility gate
* RERA ad gate
* payment/ad credit gate
* ad creative media integration
* ad approval workflow
* admin ad moderation
* public ad serving view/API
* sponsored label
* city targeting
* nearby/IP fallback foundation
* impression tracking
* click tracking
* ad metrics foundation
* ad fraud foundation
* frequency cap foundation
* notification events
* notification table
* notification center
* notification bell
* unread count
* mark read/all read
* notification preferences
* notification templates
* deep links
* email provider foundation
* SMS provider foundation
* WhatsApp provider foundation
* push provider foundation
* provider registry
* provider status dashboard
* provider delivery logs
* provider retry/DLQ
* provider webhook foundation
* provider secret masking
* RLS ads/notifications/providers
* no fake ads/notifications/provider checks
* responsive ads/notification UI

Future features must not be marked done.

---

## 84. Changelog Verification

Check `CHANGELOG.md` includes Prompt 12 entry with:

* date
* summary
* changed files
* new routes/API routes
* migration files if any
* RLS/security changes
* ads/notification/provider changes
* provider status changes
* tests/checks run
* docs updated
* verification status
* known issues
* rollback notes

If missing, update changelog.

---

## 85. Bugs And Fixes Verification

If issues are found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

* `BUG-ADS-FAKE-ACTIVE`
* `BUG-ADS-FAKE-PAYMENT`
* `BUG-ADS-FAKE-APPROVAL`
* `BUG-ADS-FAKE-IMPRESSION`
* `BUG-ADS-FAKE-CLICK`
* `BUG-ADS-NO-SPONSORED-LABEL`
* `BUG-ADS-PENDING-PUBLIC`
* `BUG-ADS-UNPUBLISHED-PROJECT`
* `BUG-ADS-RERA-GATE-BYPASS`
* `BUG-ADS-WRONG-BUILDER-PROJECT`
* `BUG-ADS-OWNER-BROKER-PROJECT-AD`
* `BUG-ADS-OPEN-REDIRECT`
* `BUG-NOTIFICATION-FAKE-UNREAD`
* `BUG-NOTIFICATION-WRONG-RECIPIENT`
* `BUG-NOTIFICATION-HIDDEN-CONTACT`
* `BUG-NOTIFICATION-DEEP-LINK-BYPASS`
* `BUG-PROVIDER-FAKE-EMAIL`
* `BUG-PROVIDER-FAKE-SMS`
* `BUG-PROVIDER-FAKE-WHATSAPP`
* `BUG-PROVIDER-FAKE-PUSH`
* `BUG-PROVIDER-SECRET-LEAK`
* `BUG-PROVIDER-SERVICE-ROLE-CLIENT`
* `BUG-PROVIDER-FAKE-ACTIVE`
* `BUG-PROVIDER-WEBHOOK-NO-IDEMPOTENCY`
* `BUG-PROVIDER-RETRY-DLQ-FAKE`
* `BUG-ADS-NOTIFICATIONS-RLS-MISSING`
* `BUG-ADS-NOTIFICATIONS-MIGRATION-MISSING`
* `BUG-ADS-NOTIFICATIONS-BUILD-FAIL`
* `BUG-NOTIFICATION-MOBILE-BROKEN`

Use existing bug ID convention if available.

---

## 86. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 12 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* routes/features checked
* ads tests
* public ad serving tests
* sponsored label checks
* notification tests
* provider tests
* secret checks
* RLS tests
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

## 87. Security Checklist Verification

Update/verify `SECURITY_RLS_CHECKLIST.md`.

Include Prompt 12 results for:

* ads RLS
* notification RLS
* provider RLS
* public active ads view safety
* sponsored label rule
* hidden contact notification/ad protection
* provider secret masking
* service role server-only
* provider webhook verification/idempotency status
* ad click open redirect protection
* notification deep link permissions
* provider log/DLQ privacy
* private noindex/no-store
* rate limit/fraud status
* known issues

If hidden contact/provider secret/private RLS issue exists, result cannot be PASS.

---

## 88. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

Include Prompt 12 results for:

* public ad query limits
* ad targeting indexes
* ad event write limits
* impression/click aggregation status
* notification pagination
* unread count query/index
* provider delivery queue strategy
* retry/DLQ job status
* no unbounded provider logs
* no heavy provider SDK client loads
* public ad image lazy/size handling
* build status
* future load test notes

---

## 89. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

Include:

* Prompt 12 route/component changes
* ads route/component changes
* notification route/component changes
* provider route/component changes
* migration path if any
* public ad serving switch/flag
* RLS policies
* provider env vars
* webhook/callback endpoints
* rollback notes
* cache/revalidation risk
* provider delivery risk
* ad event data risk
* post-deploy smoke checks
* verification status

If public ad serving/provider/webhook changes exist without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 90. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md`.

Relevant statuses:

* Email provider
* SMS provider
* WhatsApp provider
* Push provider
* OTP provider
* Razorpay/payment
* Google Maps/geocoding
* Cloudflare R2/CDN
* Turnstile/Captcha
* Analytics/GSC
* Error monitoring
* Cron/retry jobs
* Supabase Database/RLS

Rules:

* no provider active without real test
* setup-required states accurate
* test/sandbox labelled
* no fake SMS/WhatsApp/email/push delivery
* no provider secrets shown
* linked provider statuses match prior prompts

---

## 91. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 12 implementation summary
* Prompt 12 verification result
* changed files
* routes/API routes checked
* migrations/tables/RLS
* builder ads status
* public ad serving status
* ad metrics/fraud/frequency status
* notification center/unread status
* provider status
* external delivery setup-required status
* provider secret check result
* hidden contact check result
* fake ads/notifications/provider result
* responsive result
* bugs/blockers
* commands run
* next prompt:

  * `prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`
* instruction not to proceed if Prompt 12 failed/blocked

---

## 92. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* builder ads are builder-only
* builder can advertise only own published project
* owner/broker cannot create project ads
* ad statuses server-validated
* public ads only active/approved/scheduled/eligible
* payment/ad credit gate honest or setup-required with public serving disabled
* RERA gate honest
* creative media real/public-safe
* Sponsored label visible on every public ad
* no pending/rejected/expired/unpublished ads public
* impression/click metrics real or no-data
* no fake ad metrics
* notification center DB-backed
* unread count real
* user sees own notifications only
* wrong recipient denied
* notification payload has no hidden contact
* provider statuses honest
* no fake external delivery
* provider secrets not exposed
* provider logs/DLQ private
* ad click/deep link open redirect blocked
* RLS enabled/tested or honestly setup-required with no unsafe claim
* private pages noindex/no-store
* responsive checks completed
* docs updated
* no blocking bugs

### PARTIAL

Use `PARTIAL` if:

* ad campaign foundation exists but public serving disabled/setup-required
* payment/ad credit gate setup-required
* RERA validation partial but ads not public without safe approval
* impression/click tracking foundation exists but aggregation partial
* fraud/frequency cap partial
* notification center works but external providers setup-required
* provider registry exists but external delivery untested
* retry/DLQ foundation partial
* provider webhooks setup-required
* push not started
* digest/quiet hours setup-required
* RLS runtime tests unavailable but policies/migration reviewed
* responsive/browser checks incomplete
* no fake ads/notifications/provider delivery and no privacy/secret leak exists

Prompt 13 can start only if user/Super Admin accepts partial and no critical ads/notification/provider/security issue exists.

### FAIL

Use `FAIL` if:

* build fails
* fake active ad/payment/approval
* public ad without Sponsored label
* pending/rejected/expired ad public
* unpublished project ad public
* owner/broker can create project ad
* builder can advertise another builder's project
* RERA gate bypass with public ad when required
* hidden contact leaks in ad/notification/provider payload
* fake impressions/clicks/unread count
* wrong user notification access
* notification wrong recipient
* fake provider delivery
* provider secret exposed
* service role client exposure
* provider logs/DLQ public
* ad click open redirect
* RLS missing on private tables
* DB changes missing migration

Do not start Prompt 13.

### BLOCKED

Use `BLOCKED` if:

* Prompt 04 project foundation failed
* Prompt 06 builder dashboard failed
* Prompt 07 admin system failed
* Prompt 09 billing/payment gate required but failed
* Prompt 10 media creative upload failed
* Prompt 11 location targeting/SEO foundation failed
* Supabase/RLS unavailable blocks safe verification
* provider architecture unresolved
* cannot inspect required files
* package/build baseline broken
* architecture conflict needs owner decision

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* email provider missing
* SMS provider missing
* WhatsApp provider missing
* push provider missing
* cron/retry worker missing
* Razorpay/payment ad credit missing
* media/R2 missing for ad creatives
* map/geolocation provider missing for IP/nearby targeting
* captcha/rate-limit provider missing
* provider webhook secrets missing
* Supabase env missing
* test users/projects/admin permissions unavailable

Setup-required is acceptable only when no fake ads/notifications/provider delivery appears and privacy is protected.

---

## 93. Prompt 13 Readiness Checklist

Prompt 13 can start only if:

* Prompt 12 implementation completed
* Prompt 12 verification completed
* no critical ads/notification/provider/security bug open
* no fake active ads
* no fake ad metrics
* no fake provider delivery
* no provider secret leak
* no service role client exposure
* no wrong-recipient notification access
* no hidden contact in notification/ad/provider payload
* no public pending/rejected/unpublished ad
* public ads have Sponsored label
* ad click open redirect blocked
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`

If Prompt 13 file is missing, stop and ask/generate it.

---

## 94. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 12 Verification — Ads, Promotion, Notifications And Providers

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Routes/API Checked:
- builder ads:
- admin ads:
- public ads:
- ad click/impression:
- notifications:
- notification preferences:
- admin notifications:
- providers:
- provider webhooks:

Ads Checks:
- builder-only access:
- own published project:
- campaign statuses:
- creative media:
- placement:
- targeting:
- schedule:
- RERA gate:
- payment/ad credit gate:
- approval workflow:
- public serving:
- Sponsored label:

Metrics/Fraud Checks:
- impressions:
- clicks:
- CTR:
- aggregation:
- fraud filtering:
- frequency cap:
- fake metrics:

Notification Checks:
- events:
- recipient:
- notification center:
- bell/unread:
- mark read/all read:
- preferences:
- templates:
- deep links:
- hidden contact:

Provider Checks:
- provider registry:
- email:
- SMS:
- WhatsApp:
- push:
- OTP/payment/maps/media references:
- provider status:
- delivery logs:
- retry/DLQ:
- webhooks/callbacks:
- setup-required:
- secret masking:

Admin/Permission Checks:
- ads moderation:
- notification templates:
- provider settings:
- provider logs:
- system notifications:
- audit logs:

Security Checks:
- public active ads view:
- private campaigns:
- private notifications:
- provider configs/logs:
- service role:
- provider secrets:
- open redirects:
- private noindex/cache:

Database/RLS Checks:
- migrations:
- tables:
- indexes:
- public views:
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
- Ads/notifications/providers foundation is safe and ready for Prompt 13.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 13:
- Yes/No

Next Step:
- prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md or fix blockers first.
```

---

## 95. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 12 Ads/Promotions/Notifications/Providers verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Routes/API checked:
- builder ads:
- admin ads:
- public ads:
- ad metrics/clicks:
- notifications:
- notification preferences:
- providers:
- provider webhooks:

Ads/promotions:
- builder-only:
- own published project:
- campaign lifecycle:
- creative media:
- placements:
- targeting:
- schedule:
- RERA gate:
- payment/ad credit gate:
- approval workflow:
- public serving:
- Sponsored label:

Metrics/fraud:
- impressions:
- clicks:
- CTR:
- aggregation:
- fraud filtering:
- frequency cap:
- fake metrics check:

Notifications:
- events:
- recipient correctness:
- notification center:
- bell/unread count:
- mark read/all read:
- preferences:
- templates:
- deep links:
- hidden contact:

Providers:
- registry:
- email:
- SMS:
- WhatsApp:
- push:
- OTP/payment/maps/media references:
- provider status:
- delivery logs:
- retry/DLQ:
- webhooks/callbacks:
- secret masking:

Admin/permissions:
- ads moderation:
- notification templates:
- provider settings/status:
- provider logs:
- system notifications:
- audit logs:

Security/privacy:
- public active ads view:
- private campaigns:
- private notifications:
- provider configs/logs:
- wrong user access:
- hidden contact:
- provider secrets:
- service role:
- open redirect:
- private noindex/cache:

Database/RLS:
- migrations:
- tables:
- indexes:
- public views:
- RLS policies:
- RLS test result:

Responsive:
- widths tested:
- builder ads:
- public ads:
- notification UI:
- provider admin:
- horizontal scroll:

Provider/setup-required:
- email:
- SMS:
- WhatsApp:
- push:
- cron/retry:
- payment/ad credits:
- media/R2:
- maps/geolocation:
- captcha:
- provider webhooks:
- Supabase/test data:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 13:
- Yes/No
- reason

Next step:
- prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
```

Do not write vague “verified”.

---

## 96. If Verification Fails

If verification fails:

1. do not start Prompt 13
2. create/update bug entries
3. update `MANUAL_VERIFICATION.md`
4. update `SECURITY_RLS_CHECKLIST.md`
5. update `PERFORMANCE_CHECKLIST.md`
6. update `DEPLOYMENT_ROLLBACK.md`
7. update `API_PROVIDER_STATUS.md` if provider/ad/notification issue found
8. update `brain.md`
9. state exact blocker
10. fix if safe and in scope
11. rerun verification
12. only then proceed

Critical ads/notification/provider/security failures block progress.

---

## 97. If Verification Is Partial

If verification is partial:

* document exact partial items
* list setup-required providers
* list public ad serving status
* list payment/ad credit/RERA gate gaps
* list provider delivery gaps
* list retry/DLQ/webhook gaps
* list RLS runtime gaps
* list responsive/browser gaps
* confirm no fake active ads
* confirm no fake ad metrics
* confirm no fake provider delivery
* confirm no provider secret leak
* confirm no hidden contact leak
* confirm no wrong-recipient notifications
* confirm no public pending/rejected/unpublished ads
* confirm Sponsored label exists where public ads render
* update docs
* ask/require owner acceptance before Prompt 13 if risk is significant

Acceptable partial examples:

* public ad serving disabled until payment/ad credit verified
* external providers setup-required but in-app notifications work
* impression/click aggregation partial
* fraud/frequency cap partial
* retry/DLQ cron setup-required
* provider webhooks setup-required
* push not started
* RLS runtime tests unavailable but policies reviewed
* responsive checks incomplete

Not acceptable partial without fix:

* fake active ad
* ad without Sponsored label
* fake provider delivery
* provider secret leak
* wrong-recipient notification access
* hidden contact in notification/ad/provider payload
* pending/rejected/unpublished ad public
* open redirect
* private provider logs public
* build fail

---

## 98. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `DEPLOYMENT_ROLLBACK.md`
* update `API_PROVIDER_STATUS.md` if relevant
* update `brain.md`
* final response should say Prompt 13 can start

Do not start Prompt 13 automatically unless user asked to continue.

---

## 99. What Not To Do In This Verification

Do not:

* create fake ads to test public slots
* fake ad approval
* fake ad payment
* fake impressions/clicks
* fake provider delivery
* fake unread counts
* mark provider active without config/test
* expose provider secrets
* expose service role
* make provider logs public
* ignore wrong-recipient notification
* ignore hidden contact in notification/ad payload
* allow ad click open redirect
* ignore missing Sponsored label
* bypass RLS
* start Prompt 13 after FAIL/BLOCKED

---

## 100. Quality Bar

This verification is successful when future phases can trust that:

* ads are builder/project-scoped
* public ads are active, approved and eligible only
* Sponsored label is always visible
* project/RERA/payment/ad credit gates are honest
* metrics are real or no-data
* notifications are recipient-scoped
* unread count is real
* external providers are honest setup/test/active states
* no fake provider delivery exists
* provider secrets are protected
* provider logs and DLQ are private
* RLS protects ad/notification/provider data
* docs reflect reality
* Prompt 13 can build security/privacy/fraud/rate-limit hardening on safe ads/provider foundations

---

## 101. Final Rule For Prompt 12 Verification

Verify ads honestly.

Verify Sponsored labels honestly.

Verify project/RERA/payment gates honestly.

Verify ad metrics honestly.

Verify notifications honestly.

Verify unread counts honestly.

Verify providers honestly.

Verify delivery logs honestly.

Verify retry/DLQ honestly.

Verify provider webhooks honestly.

Verify provider secrets honestly.

Verify RLS honestly.

Do not fake active ads.

Do not fake ad approval.

Do not fake ad payment.

Do not fake impressions.

Do not fake clicks.

Do not fake unread count.

Do not fake email/SMS/WhatsApp/push delivery.

Do not mark provider active without setup/test.

Do not expose provider secrets.

Do not expose service role.

Do not allow wrong-recipient notifications.

Do not leak hidden contact.

Do not allow open redirects.

Do not mark PASS without ads/notification/provider/security/RLS checks.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
