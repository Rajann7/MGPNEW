# prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md

# My Gujarat Property — Prompt 12: Ads, Promotion, Notifications And Providers

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 8 (create-ad wizard) & 13 (ads/notifications/providers)**, `design-prompts/DESIGN_ADDONS_MASTER.md`, deltas `report-batch-08/13.md`, and `docs/10` "Design Add-Ons". Locked: 7-step ad wizard w/ per-size creatives, "AD" labelling, camelCase `{{tokUserName}}` tokens, defaults-new-users-only, provider graceful-degradation states, OTP+SMS one card, write-only secrets.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md
prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md
```

This phase implements and hardens the ads, promotion, notification and provider foundation for **My Gujarat Property**:

* builder project ads
* promotion campaigns
* sponsored homepage slots
* city/location targeted ads
* RERA/payment/published-project gates
* ad creative upload foundation
* ad approval workflow
* ad scheduling
* ad pause/resume/edit/delete
* ad moderation
* ad payment/subscription integration foundation
* impressions/click tracking foundation
* fraud/rate-limit foundation
* notification center
* unread notification badges
* notification dropdown
* notification preferences
* notification templates
* notification events
* email/SMS/WhatsApp/push provider modes
* provider setup-required states
* provider retry/idempotency/DLQ foundation
* provider webhooks/status callbacks foundation
* admin provider/status controls
* Super Admin provider settings
* RLS/security
* no fake ads
* no fake impressions/clicks
* no fake notifications
* no fake provider success
* no fake WhatsApp/SMS/email delivery
* no fake PASS

Do not fake ad approval.

Do not fake ad payment.

Do not fake impressions/clicks.

Do not fake unread notification count.

Do not fake provider delivery.

Do not expose provider secrets.

Do not expose hidden contact in notifications or ads.

Do not show ads without published project/payment/approval/RERA rules.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
Prompt Number: 12
Phase: Ads, Promotion, Notifications And Providers
Type: Implementation Prompt
Matching Verification Prompt: prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
Previous Verification Prompt: prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md
```

---

## 2. Phase Purpose

The purpose of this phase is to implement a safe and honest foundation for paid promotions, notification delivery, provider configuration and provider status management.

This phase should implement:

* ads/promotion data model
* builder project ad campaign creation
* published project requirement for ads
* RERA rule foundation for project ads
* payment/subscription/ad credit gate foundation
* ad creative/banner media integration
* desktop/tablet/mobile banner variants
* city/district/locality targeting
* all Gujarat targeting
* nearby fallback foundation
* campaign scheduling
* campaign statuses
* ad approval workflow
* admin ad moderation
* ad preview
* ad edit/update/delete/pause/resume
* sponsored label
* ad placement rules
* homepage ad slot foundation
* search/detail/profile ad placement foundation if safe
* impression/click event foundation
* fraud detection foundation
* frequency cap foundation
* rotation/priority foundation
* notification database foundation
* notification templates
* notification center
* notification unread count
* notification dropdown/bottom sheet
* notification preferences
* mark read/mark all read
* notification deep links
* provider modes for WhatsApp, SMS, email, push
* provider setup-required handling
* provider health/status dashboard foundation
* provider retry/idempotency/DLQ foundation
* provider webhook/callback foundation
* provider audit logs
* RLS policies
* docs updates
* checks/tests
* handoff to manual verification prompt

This phase must not claim external provider delivery unless provider keys and successful delivery tests exist.

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
prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md
prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md
prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md
prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
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

Also inspect existing ads, promotion, notifications, provider, email, SMS, WhatsApp, push, webhook and provider-status code before editing.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
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
src/lib/actions/ads*
lib/actions/ads*
src/lib/actions/promotions*
lib/actions/promotions*
src/lib/actions/notifications*
lib/actions/notifications*
src/lib/actions/providers*
lib/actions/providers*
src/lib/validators/ads*
lib/validators/ads*
src/lib/validators/notifications*
lib/validators/notifications*
src/lib/validators/providers*
lib/validators/providers*
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

Search for existing:

* ad campaign tables
* ad placements
* ad creatives
* promoted project logic
* sponsored label
* notification table
* unread notification count
* notification bell
* notification preferences
* email provider code
* SMS provider code
* WhatsApp provider code
* push provider code
* provider status table
* provider secrets in client
* fake notifications
* fake unread count
* fake ad impressions
* fake clicks
* fake provider delivery
* provider webhooks
* retries/DLQ
* RLS policies

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement:

### 5.1 Builder Ads / Promotions

* builder ad dashboard
* create campaign for own published project
* project selection
* campaign title
* campaign objective
* placement selection
* location/city targeting
* start/end date
* budget/ad credit placeholder or billing integration
* creative upload/media selection
* desktop/tablet/mobile banner variants
* preview
* submit for approval
* pause/resume
* edit/update
* soft delete/cancel
* status/timeline
* ad metrics foundation

### 5.2 Admin Ads Moderation

* ad review queue
* approve
* reject
* request changes
* pause/suspend
* placement priority
* RERA/payment/publication checks
* audit logs
* sensitive permission checks
* no fake approval

### 5.3 Ad Serving Foundation

* homepage ad slot
* sponsored label
* city/IP/selected city targeting foundation
* nearby fallback foundation
* active/approved/paid/not expired rule
* rotation foundation
* frequency cap foundation
* impression/click events
* fraud filtering foundation
* public-safe ad payload
* no private data leak

### 5.4 Notification Foundation

* notification events
* notification templates
* notification center
* notification dropdown
* unread count
* mark read
* mark all read
* notification preferences
* deep links
* digest/quiet hours foundation
* role-specific notifications
* no fake unread count

### 5.5 Provider Foundation

* provider registry
* provider modes
* provider setup-required states
* provider status dashboard
* email provider abstraction
* SMS provider abstraction
* WhatsApp provider abstraction
* push provider abstraction
* provider logs
* retries
* idempotency
* dead letter queue foundation
* provider webhooks/callbacks
* secret masking
* Super Admin provider settings foundation

### 5.6 Docs

Update all memory docs.

---

## 6. Out Of Scope For This Phase

Do not fully implement:

* final production ad billing settlement if billing not ready
* full programmatic ad auction
* AI targeting
* AI ad creative generation
* external ad network integration
* full WhatsApp Business production approval
* full SMS DLT production setup
* final email domain authentication unless provider configured
* final web push production rollout
* final A/B testing
* final marketing automation
* final campaign analytics dashboards at scale
* final fraud ML detection
* final notification digest cron if cron unavailable
* final mobile native push

This phase may create foundations and setup-required states.

---

## 7. Hard Ads And Provider Rules

Claude must enforce:

```txt id="hard-ads-provider-rules"
No fake ads.
No fake ad approval.
No fake payment.
No fake impressions.
No fake clicks.
No fake CTR.
No fake provider delivery.
No fake SMS/WhatsApp/email sent.
No provider secrets in client.
No service role in client.
No hidden contact in notification/ad payloads.
No ads for unpublished projects.
No ads without approval.
No ads without payment/ad credit if payment gate is active.
No RERA-required ad without valid RERA status if applicable.
No public ad without Sponsored label.
```

Forbidden:

* showing pending/rejected/expired ad publicly
* showing ad without sponsored label
* fake impression/click numbers
* fake notification unread count
* fake provider “active” status
* sending notifications with hidden phone/email
* client-side provider secrets
* admin provider secret reveal
* fake webhook success
* fake retry success
* fake DLQ empty status

---

## 8. Suggested Database Tables

Use existing tables if present.

Possible tables:

```txt id="ads-provider-tables"
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

Only create needed tables.

Do not duplicate existing equivalents.

If a subset is implemented, document accurate status.

---

## 9. Ad Campaign Status Values

Campaign statuses:

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

Rules:

* only approved/scheduled/active campaigns can be served.
* active requires valid dates.
* active requires payment/ad credit if gate active.
* rejected/need_changes not public.
* paused/suspended/deleted not public.
* expired not public.
* status transitions server-validated.
* actions audited.

---

## 10. Creative Status Values

Ad creative statuses:

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

Rules:

* creative must be real uploaded media or safe setup state.
* creative must pass media validation.
* creative must be approved with campaign.
* no fake banner upload.
* no unsafe image/video/script.
* hidden contact in banner text should be flagged/reviewed.
* public creative uses public-safe media from Prompt 10.

---

## 11. Ad Placement Values

Ad placements may include:

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

Rules:

* homepage placements are priority for this phase.
* other placements may be foundation/setup-required.
* all public ads must show Sponsored label.
* placement availability must be configured.
* no broken placements.
* no fake ad slot fill.
* no hidden contact.

---

## 12. Builder Ad Requirements

Builder dashboard ads must allow builder to:

* view own campaigns
* create campaign
* select own published project
* upload/select banner creatives
* choose placement if available
* target all Gujarat or selected cities/districts/localities
* set start/end dates
* choose budget/ad credit if available
* submit for review
* see approval status
* edit draft/need_changes campaigns
* pause/resume active campaigns if allowed
* cancel/delete campaign
* view real metrics or setup/no-data states

Rules:

* builder can advertise only own project.
* project must be published/approved.
* project must not be deleted/paused.
* RERA status required if applicable.
* payment/ad credit required if billing gate active.
* no fake campaign active status.
* no fake metrics.

---

## 13. Owner/Broker Ads Boundary

Owners and brokers should not get builder project ad creation unless product later allows.

Rules:

* Owner cannot create builder project ads.
* Broker cannot create builder project ads.
* Broker/Owner promotion features remain setup-required unless product approves.
* Owner/Broker dashboards should not show active project ad creation CTA.
* If future listing boost foundation exists, mark it setup-required/not active.

If Owner/Broker can create project ad:

* create bug in verification later.

---

## 14. Project Eligibility For Ads

Project ad eligibility requires:

* project belongs to builder
* project approved/published
* project not deleted
* project not paused/private
* project has public-safe media or creative
* RERA status valid if RERA required/applicable
* payment/ad credit/subscription gate satisfied if active
* project location active/canonical
* project detail page public-safe

Rules:

* no ad for draft/pending/rejected project.
* no ad for hidden/unpublished project.
* no fake RERA valid status.
* no fake payment/ad credit.

---

## 15. RERA Disclosure Requirements

For project ads:

* show RERA status where applicable.
* do not fake RERA registration.
* do not imply legal guarantee.
* if RERA is not applicable, show clear safe label only if field exists.
* if RERA status pending/unknown and required, ad cannot be approved.
* RERA proof docs remain private.
* public ad cannot expose private RERA document URL.

Ad disclaimer example:

```txt id="ad-rera-disclaimer"
Sponsored project. Please verify project details, RERA status and ownership documents independently before any transaction.
```

---

## 16. Ad Targeting Requirements

Targeting options:

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

Rules:

* selected location IDs must be active/canonical.
* targeting stored safely.
* no targeting by sensitive personal data.
* IP-based city fallback setup-required if provider unavailable.
* selected city preference can be used if stored.
* nearby fallback should use real location hierarchy, not fake distances.
* do not fake geolocation.

---

## 17. Ad Scheduling Requirements

Campaign dates:

* start_at
* end_at
* timezone India/IST
* schedule status
* daily budget placeholder if applicable
* lifetime budget placeholder if applicable

Rules:

* start must be before end.
* expired campaigns not served.
* scheduled campaigns not served before start.
* paused campaigns not served.
* time comparison uses server time.
* no fake active status.

---

## 18. Ad Payment / Credit Gate Requirements

Integration with Prompt 09:

* ad credits
* add-on purchase
* plan ads_allowed flag
* subscription status
* payment webhook verified
* credits available
* credit debit on activation or impression/click if implemented

Rules:

* do not fake payment.
* do not mark paid from client callback.
* if ad billing not fully implemented, campaign should be payment_pending/setup-required before active.
* active public ad requires payment/ad credit when gate is active.
* admin manual grant must be audited.

---

## 19. Ad Creative Requirements

Creative media requirements:

* desktop banner
* tablet banner
* mobile banner
* optional square/card creative
* media asset IDs from Prompt 10
* safe file type
* safe dimensions/configurable
* public-safe image
* no unsafe SVG
* no hidden contact in creative metadata
* no misleading legal/RERA claims
* no fake upload success

Rules:

* use media system for upload.
* if media provider missing, show setup-required.
* creative preview must use real media.
* public ad payload should use CDN/public-safe variants only.
* original/private file not public.

---

## 20. Ad Review Workflow

Admin review actions:

* approve
* reject with reason
* request changes with reason
* pause/suspend
* resume if allowed
* set placement priority if permission
* view campaign timeline
* view public preview
* view payment/RERA/project status

Rules:

* permission required.
* status transition server-validated.
* action audited.
* rejection/request changes require reason.
* approval cannot bypass project/payment/RERA gates unless Super Admin override audited.
* no fake approval.
* no hidden contact leak.

---

## 21. Ad Serving Rules

Serve only ads where:

* campaign status active
* campaign approved
* current time within schedule
* project published/public
* payment/ad credit valid if active
* placement matches
* target location matches
* creative ready/public-safe
* RERA gate satisfied if required
* campaign not paused/suspended/deleted
* frequency cap not exceeded if implemented
* fraud block not active

Public ad response must include:

* ad ID/campaign ID
* creative URL
* target URL
* Sponsored label flag
* safe title
* safe project/builder name
* safe location
* RERA/disclaimer if applicable

Public ad response must not include:

* private payment data
* private targeting internals
* builder contact phone/email unless public-approved
* hidden contact
* provider secrets
* admin notes
* private media URL

---

## 22. Sponsored Label Requirements

Every public ad must show:

```txt id="sponsored-label"
Sponsored
```

Rules:

* label visible on mobile and desktop.
* label not hidden in small screens.
* label not color-only.
* ad should not look like organic result without label.
* schema/metadata should not misrepresent sponsored content as organic.

If an ad appears without sponsored label, verification must fail or partial depending severity.

---

## 23. Impression Tracking Foundation

Impression events may include:

* ad_campaign_id
* placement
* page_type
* target_location_id
* session hash
* viewer profile ID optional
* IP hash optional
* user agent hash optional
* occurred_at
* fraud_status
* counted boolean

Rules:

* count only real rendered impressions if implemented.
* avoid counting server-side fetch as impression unless documented.
* avoid duplicate immediate counts.
* no fake impressions.
* no hidden contact.
* privacy-safe hashing if storing IP/UA.
* if tracking not implemented, metrics show setup/no-data.

---

## 24. Click Tracking Foundation

Click events may include:

* ad_campaign_id
* placement
* target URL
* session hash
* viewer profile ID optional
* IP hash optional
* user agent hash optional
* occurred_at
* fraud_status
* counted boolean

Rules:

* click redirect must not be open redirect.
* target URL must be internal/safe.
* no fake clicks.
* duplicate rapid clicks filtered if implemented.
* click tracking must not expose private target data.
* target should be public project detail/profile page.

---

## 25. Ad Metrics Requirements

Metrics can show:

* impressions
* clicks
* CTR
* spend/credits if real
* active days
* status
* placement
* target city

Rules:

* metrics must be real or no-data/setup-required.
* no fake impressions.
* no fake clicks.
* no fake CTR.
* no fake spend.
* use daily aggregation only if real.
* if aggregation job missing, show raw totals or setup-required.

---

## 26. Ad Fraud / Abuse Foundation

Ad fraud foundation may include:

* duplicate impression filtering
* duplicate click filtering
* bot-like user agent flag
* IP/session rate limits
* self-click detection foundation
* suspicious spike flag
* manual review
* fraud_status field

Fraud statuses:

```txt id="ad-fraud-statuses"
valid
suspected_duplicate
suspected_bot
suspected_self_click
rate_limited
manual_review
invalid
```

Rules:

* no fake fraud protection claim.
* no fake filtered count.
* if fraud detection partial, document status.
* do not store raw IP unnecessarily.
* use hashed IP/session where possible.

---

## 27. Frequency Cap Foundation

Frequency cap can include:

* per session
* per user
* per placement
* per campaign
* per day

Rules:

* if implemented, server/client logic must be real.
* no fake frequency cap.
* no private tracking beyond policy.
* preference/privacy/cookie rules respected.
* if not implemented, document setup-required/partial.

---

## 28. Ad Rotation / Priority Foundation

Ad selection can use:

* active campaigns
* placement match
* target match
* priority
* weighted rotation
* recent shown avoidance
* budget/ad credit availability
* fraud/frequency cap

Rules:

* no fake rotation.
* no sponsored result mixed without label.
* no private campaign data in public response.
* priority changes admin-permission-scoped.
* if rotation partial, document.

---

## 29. Notification Event Types

Notification events may include:

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

Rules:

* event must be real.
* no fake notifications.
* no hidden contact in payload.
* recipient must be correct.
* deep link must be permission-checked.
* external delivery only if provider configured/tested.

---

## 30. Notification Status Values

Notification statuses:

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

Rules:

* in-app notification can be created without external provider.
* external delivery status must be real.
* no fake delivered/read.
* unread count based on DB read_at/status.
* mark read updates DB.
* provider setup-required if not configured.

---

## 31. Notification Center Requirements

Notification center should support:

* list notifications
* unread filter
* notification categories
* mark one read
* mark all read
* archive if implemented
* deep link
* empty state
* loading/error states
* pagination
* preferences link
* mobile bottom sheet/dropdown

Rules:

* user sees own notifications only.
* admin/staff system notifications permission-scoped.
* no fake notifications.
* no hidden contact in title/body.
* no broken deep links.
* no private data in public cache.
* no fake unread badge.

---

## 32. Notification Bell Requirements

Notification bell must show:

* real unread count
* latest notification dropdown
* mark read action
* mark all read action if implemented
* empty state
* mobile bottom sheet
* loading state
* safe deep links

Rules:

* count from DB only.
* no hardcoded badge.
* no fake “99+”.
* no public/guest notification count unless local safe state.
* no hidden contact in preview.

---

## 33. Notification Preferences Requirements

Preferences can include:

* in-app
* email
* SMS
* WhatsApp
* push
* digest
* quiet hours
* category opt-in/out
* marketing opt-in/out
* transactional required notifications

Rules:

* user can manage own preferences.
* transactional/security notifications may be required.
* marketing opt-in not prechecked.
* external provider setup-required if missing.
* preferences private/RLS protected.
* no fake preference save.
* quiet hours/digest foundation documented.

---

## 34. Notification Templates

Templates should include:

* template key
* channel
* role
* title
* body
* variables
* status
* language
* version
* created_at
* updated_at

Rules:

* templates sanitized.
* variables allowlisted.
* no hidden contact variable unless explicitly authorized and safe.
* no provider secrets.
* no raw HTML unsafe.
* no fake delivery.
* version changes audited.

---

## 35. Notification Deep Links

Deep links should:

* point to allowed internal routes
* be permission-checked at destination
* avoid open redirect
* not contain private tokens
* not expose hidden contact
* work across roles
* degrade safely if target deleted/unavailable

Examples:

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

---

## 36. Provider Modes

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

Provider categories:

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

Rules:

* provider status must be honest.
* no active status without test/config.
* provider secrets masked.
* only Super Admin/permissioned staff can change provider settings.
* provider changes audited.
* test/sandbox labelled clearly.
* production must not use fake/test provider as active.

---

## 37. Email Provider Foundation

Possible providers:

* Resend
* SendGrid
* SMTP

This phase can implement abstraction/foundation.

Email notifications may include:

* invoice issued
* payment verified
* lead notification
* message notification
* ad approval
* support reply
* security alert

Rules:

* no fake email sent.
* provider setup-required if keys missing.
* sender/from address configured.
* unsubscribe for marketing/digest.
* transactional emails follow policy.
* delivery logs real only.
* no hidden contact unless authorized.
* no secrets in email payload/logs.

---

## 38. SMS Provider Foundation

Possible providers:

* MSG91
* Fast2SMS
* Textlocal
* Twilio

SMS notifications may include:

* OTP in auth phase if implemented later/earlier
* security alert
* urgent transactional notification
* payment status
* site visit reminder later

Rules:

* no fake SMS sent.
* DLT/template compliance setup-required if required.
* user opt-in/transactional rules respected.
* no hidden contact in SMS.
* no provider secret in client.
* delivery status real only.
* rate limit and cost controls documented.

---

## 39. WhatsApp Provider Foundation

Possible provider:

* WhatsApp Business Cloud API
* wa.me fallback for manual link only if product approves

WhatsApp notifications may include:

* lead alert
* message alert
* site visit reminder
* ad status
* payment/invoice alert

Rules:

* no fake WhatsApp sent.
* WhatsApp API token server-only.
* templates approved/setup-required.
* user opt-in where required.
* wa.me is not API delivery.
* do not mark WhatsApp API active if only wa.me fallback exists.
* no hidden contact unless authorized.
* delivery logs real only.

---

## 40. Push Provider Foundation

Push may include:

* browser push/PWA
* service worker registration
* subscription table
* permission prompt
* push delivery provider/setup

Rules:

* no fake push sent.
* prompt only after user action or product-approved timing.
* subscription private/RLS protected.
* provider setup-required if missing.
* notification preferences respected.
* no private data in push payload if lockscreen exposure risk.
* no hidden contact.

If PWA/push not implemented, mark `NOT_STARTED` or `SETUP_REQUIRED`.

---

## 41. OTP Provider Boundary

OTP/public mobile auth may already exist or be setup-required.

This phase can update provider status only.

Rules:

* do not rewrite auth unless needed.
* no fake OTP sent in production.
* dev OTP/test mode clearly labelled.
* OTP provider secrets server-only.
* OTP cost/rate limits documented.
* public mobile OTP is for public users only, not admin login.

---

## 42. Payment Provider Boundary

Payment/Razorpay is Prompt 09.

This phase can reference provider status.

Rules:

* do not mark payment active unless Prompt 09 verified.
* do not fake payment provider health.
* provider status dashboard can display Razorpay setup/test/active based on API_PROVIDER_STATUS.
* no payment secret exposure.
* webhooks remain verified/idempotent.

---

## 43. Maps Provider Boundary

Maps/geocoding may be setup-required.

Rules:

* no fake map provider active.
* no fake geolocation/IP city.
* map API key restrictions documented.
* exact private address not exposed.
* city targeting can use selected city/location data without map provider.
* nearby fallback setup-required if geocoding missing.

---

## 44. Media/CDN Provider Boundary

Media/R2/CDN is Prompt 10.

Ads creatives should use media system.

Rules:

* no fake media CDN.
* no private creative media public.
* media provider setup-required disables creative upload.
* public ad creative must be ready/public-safe.
* provider secrets remain server-only.

---

## 45. Captcha / Anti-Abuse Provider Foundation

Captcha/Turnstile may be needed for:

* contact spam
* ad fraud
* support/grievance spam
* signup/login abuse
* provider abuse

Rules:

* no fake captcha protection.
* setup-required if keys missing.
* secret server-only.
* public site key only if configured.
* do not block accessibility unnecessarily.
* rate limiting still needed.

---

## 46. Provider Registry Requirements

Provider registry can include:

* provider category
* provider name
* mode/status
* environment
* last_tested_at
* last_success_at
* last_failure_at
* masked config
* setup notes
* owner/admin
* created_at
* updated_at

Rules:

* do not store plaintext secrets in DB unless encrypted/sealed and explicitly designed.
* prefer environment variables for secrets.
* UI shows masked config only.
* provider health checks real or setup-required.
* changes audited.

---

## 47. Provider Delivery Logs

Delivery logs may include:

* provider
* channel
* notification ID
* recipient profile
* status
* attempt count
* provider message ID
* error code safe
* created_at
* sent_at
* delivered_at
* failed_at

Rules:

* no secrets.
* no hidden contact unless authorized and masked.
* no raw sensitive payload if unnecessary.
* user can see limited own notification status if appropriate.
* admin access permission-scoped.
* no fake delivered status.

---

## 48. Retry / DLQ Foundation

Retries should support:

* retry count
* next retry time
* exponential backoff foundation
* max attempts
* final failure
* dead letter queue
* manual retry by admin
* provider-specific retry rules

Statuses:

```txt id="delivery-retry-statuses"
pending
retrying
max_attempts_reached
dead_letter
manual_retry_scheduled
resolved
```

Rules:

* no fake retry success.
* retry jobs may be setup-required if cron missing.
* DLQ must not leak secrets/private data.
* admin permission required for manual retry.
* retry idempotency required.

---

## 49. Provider Webhook / Callback Foundation

Provider webhooks may include:

* SMS delivery callback
* WhatsApp message status
* email delivery/bounce
* push delivery callback if provider supports
* payment webhook from Prompt 09
* media webhook if provider exists

Rules:

* verify provider webhook signature if provider supports.
* idempotency by provider event ID.
* safe event type handling.
* no fake callback.
* unsupported callback logged/skipped safely.
* no secrets in response/logs.
* update delivery status only after verified callback if required.

---

## 50. Notification Privacy Rules

Notifications must not expose:

* hidden phone/email
* private lead contact
* private message content unless safe preview allowed
* private billing data beyond own-user
* private docs/media links
* admin notes
* provider secrets
* other user's data
* exact private address unless intended

Notification preview should be conservative.

Examples:

* “You received a new inquiry” instead of showing hidden phone.
* “Your project ad needs changes” without private admin notes unless recipient authorized.
* “Payment verified” without full sensitive payment data.

---

## 51. Notification Role Rules

Owner notifications:

* property submitted/approved/rejected/need changes
* requirement submitted/approved/rejected/need changes
* lead received
* message received
* site visit update
* billing/payment/invoice
* verification status
* support reply
* system/security alerts

Broker notifications:

* property/requirement moderation
* lead/CRM/proposal/message
* site visit update
* billing/payment/invoice
* verification status
* support reply
* system/security alerts

Builder notifications:

* project moderation
* project lead
* matching requirement/proposal/message
* site visit update
* ad campaign status
* billing/payment/invoice
* verification/RERA status
* support reply
* system/security alerts

Admin/staff notifications:

* moderation queue assignment
* verification review
* support ticket
* ad review
* payment/reconciliation alert
* provider failure
* security alert
* system health

Rules:

* recipient must match event.
* wrong role must not receive private notification.
* admin notifications permission-scoped.
* no fake notifications.

---

## 52. Notification Template Safety

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

Rules:

* sensitive variables require explicit permission and policy.
* template rendering sanitized.
* no raw HTML/script.
* no fake personalization.

---

## 53. Notification Digest / Quiet Hours Foundation

Digest may include:

* daily digest
* weekly digest
* category digest
* role-specific digest
* quiet hours start/end
* timezone Asia/Kolkata

Rules:

* if cron/job missing, mark setup-required.
* no fake digest sent.
* digest content must not include hidden contact/private data.
* digest respects preferences.
* quiet hours do not block security-critical alerts unless product chooses.

---

## 54. Provider Rate Limit And Cost Controls

Provider usage should have foundations for:

* per user rate limits
* per event type rate limits
* daily provider quota
* provider cost logging
* notification deduplication
* retry limits
* circuit breaker if provider degraded
* abuse prevention

Rules:

* no unlimited provider send loops.
* provider failure should not crash app.
* user-facing action should not wait on slow provider if queued.
* no fake cost.
* no fake provider quota.

---

## 55. Provider Secret Rules

Provider secrets include:

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
```

Rules:

* secrets server-only.
* not in client bundle.
* not in public provider status.
* not in notification/ad payload.
* not in logs.
* not in docs/final output.
* `.env.example` contains placeholders only.
* if leaked, recommend rotation and mark FAIL.

---

## 56. RLS Requirements

RLS must protect:

* ad campaigns
* ad creatives
* ad targets
* ad metrics/events if private
* ad approval events
* notification events
* notifications
* notification preferences
* notification deliveries
* provider configs/status/logs
* provider webhook events
* provider dead letters
* provider audit logs

Public can read only:

* currently active public-safe ads through safe view/API
* public-safe ad creative URL
* sponsored label metadata
* public provider status only if intentionally exposed and non-sensitive

Public cannot read:

* builder campaign management data
* private metrics
* ad payment/credit data
* notification records
* provider logs
* provider secrets
* admin review notes
* webhook events
* DLQ records

---

## 57. Public Ads View Requirements

Public ads view/API must return only:

* active campaign
* approved campaign
* within schedule
* valid payment/ad credit if gate active
* published project
* ready public creative
* target match
* sponsored label required
* safe project title
* safe builder name
* safe location
* safe target URL
* disclaimer/RERA status if applicable

Public ads view/API must not return:

* draft/submitted/rejected/paused/expired/suspended campaigns
* private campaign notes
* payment data
* private targeting internals
* hidden contact
* private media
* admin review notes
* fraud internals
* provider secrets

---

## 58. RLS Table Expectations

Enable RLS for:

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

If using existing tables, verify equivalent protections.

If private ad/notification/provider table lacks RLS:

* do not mark complete
* create bug
* mark result `FAIL`

---

## 59. SQL Migration Rule

If DB changes are needed, create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_ads_promotion_notifications_providers.sql
```

Migration must include:

* purpose
* phase: Prompt 12
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* functions/triggers if any
* event idempotency constraints
* active ad public view if implemented
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 60. Suggested Indexes

Add/verify indexes for:

### Ad Campaigns

* builder_profile_id
* project_id
* status
* start_at
* end_at
* created_at
* placement
* payment_status if present

### Ad Targets

* campaign_id
* target_type
* location_id
* city_id
* district_id

### Ad Events

* campaign_id
* event_type
* placement
* occurred_at
* session_hash
* fraud_status

### Notifications

* recipient_profile_id
* read_at
* status
* category
* created_at

### Notification Deliveries

* notification_id
* provider
* channel
* status
* attempt_count
* created_at

### Provider Logs

* provider_key
* channel
* status
* created_at
* event_id unique if applicable

### Provider Webhook Events

* provider
* provider_event_id unique
* event_type
* processed_at
* created_at

---

## 61. Server Action / API Requirements

Implement safe server actions/API routes for:

```txt id="server-actions"
create_ad_campaign
update_ad_campaign
submit_ad_campaign
pause_ad_campaign
resume_ad_campaign
delete_ad_campaign
get_builder_ad_campaigns
get_public_ads_for_placement
record_ad_impression
record_ad_click
admin_list_ad_campaigns
admin_review_ad_campaign
admin_pause_ad_campaign
admin_update_ad_priority
create_notification
create_notification_event
list_notifications
mark_notification_read
mark_all_notifications_read
archive_notification
update_notification_preferences
admin_manage_notification_template
send_notification_delivery
queue_notification_delivery
process_notification_delivery
retry_notification_delivery
get_provider_status
admin_update_provider_mode
admin_test_provider
handle_provider_webhook
process_provider_dead_letter
```

Only implement what is safe and in scope.

Each action must:

* require auth where needed
* validate role/entity ownership
* validate project eligibility
* validate ad status transition
* validate provider mode
* validate notification recipient
* enforce RLS
* use server-only secrets
* avoid fake success
* return safe typed errors
* audit high-risk/admin/provider changes

---

## 62. Error Handling Rules

Use safe errors:

```txt id="safe-errors"
AUTH_REQUIRED
ROLE_NOT_ALLOWED
FORBIDDEN
PROJECT_NOT_FOUND
PROJECT_NOT_PUBLISHED
PROJECT_NOT_OWNED
RERA_REQUIRED
RERA_NOT_VALID
AD_PROVIDER_SETUP_REQUIRED
AD_PAYMENT_REQUIRED
AD_CREDIT_REQUIRED
AD_CAMPAIGN_NOT_FOUND
AD_CREATIVE_NOT_READY
AD_INVALID_TARGET
AD_INVALID_STATUS_TRANSITION
AD_APPROVAL_REQUIRED
AD_NOT_ACTIVE
AD_EXPIRED
NOTIFICATION_NOT_FOUND
NOTIFICATION_FORBIDDEN
NOTIFICATION_PROVIDER_SETUP_REQUIRED
PROVIDER_NOT_CONFIGURED
PROVIDER_DISABLED
PROVIDER_SECRET_MISSING
PROVIDER_DELIVERY_FAILED
PROVIDER_WEBHOOK_INVALID
PROVIDER_WEBHOOK_DUPLICATE
RATE_LIMITED
OPEN_REDIRECT_BLOCKED
SETUP_REQUIRED
UNKNOWN_ERROR
```

Do not expose:

* SQL errors
* stack traces
* provider secrets
* hidden contact
* private campaign data
* private notification payload
* service role key
* webhook secret

---

## 63. Input Validation Rules

Validate:

* project ID
* campaign ID
* creative ID
* media ID
* placement
* target type
* location IDs
* start/end date
* budget/credit amount
* status transition
* review reason
* notification type
* notification recipient
* notification deep link
* template variables
* provider key
* provider mode
* provider webhook event
* provider callback signature
* click redirect target

Invalid input must not create public ad or notification.

---

## 64. Admin Permission Requirements

Suggested permissions:

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

Rules:

* server-side permission checks.
* UI hiding not enough.
* provider manage/test limited to Super Admin or explicit permission.
* secret reveal never allowed.
* ad approval audited.
* provider change audited.
* notification template change audited.

---

## 65. Admin Ads UI Requirements

Admin ads UI should show:

* campaigns list
* status filters
* builder/project info
* placement
* targeting summary
* payment/credit status
* RERA/project status
* creative preview
* campaign timeline
* review actions
* reject/request changes reason
* pause/suspend action
* metrics if real
* no fake metrics
* no provider secrets

Rules:

* permission-scoped.
* no private project docs.
* no hidden contact.
* no fake approval.
* no fake payment.

---

## 66. Builder Ads UI Requirements

Builder ads UI should show:

* campaign list
* create campaign
* select own published project
* campaign status
* creative upload/select
* location targeting
* schedule
* payment/ad credit/setup state
* submit/revise actions
* pause/resume/cancel actions
* review feedback
* real metrics/no-data
* support link

Rules:

* no wrong builder campaigns.
* no draft project ad.
* no fake active campaign.
* no fake impressions/clicks.
* no dead buttons.
* mobile-safe.

---

## 67. Public Ad UI Requirements

Public ad UI should:

* render only active approved ads
* show Sponsored label
* show creative safely
* link to public project/detail page
* show safe title/location
* show RERA/disclaimer if applicable
* record impression only if implemented
* record click only through safe internal route if implemented
* hide if no eligible ads
* avoid layout shift
* not show fake placeholder ad as paid ad

If no eligible ads, show no ad or safe empty slot; do not show fake ad.

---

## 68. Notification UI Requirements

Notification UI should include:

* bell icon
* real unread count
* latest dropdown
* notification center page
* category filters
* mark read
* mark all read
* preference link
* empty state
* loading/error state
* mobile bottom sheet
* deep links
* safe role-based messages

Rules:

* count real only.
* no fake unread count.
* no hidden contact in preview.
* no broken deep links.
* no public cache.

---

## 69. Provider Admin UI Requirements

Provider admin UI should show:

* provider category
* provider name
* mode/status
* setup-required fields without exposing secrets
* masked configuration
* last tested status
* last success/failure
* delivery logs
* webhook status
* retry/DLQ status
* test provider button if implemented
* setup guide notes
* audit timeline

Rules:

* Super Admin/permission only.
* no raw secret reveal.
* no fake active status.
* no fake test success.
* no fake delivery logs.
* no public access.

---

## 70. Provider Setup Required UX

When provider missing:

* show setup-required status
* disable external delivery
* still allow in-app notification if DB-ready
* do not show fake sent status
* do not block core user action unnecessarily if notification can be queued/skipped
* update API_PROVIDER_STATUS
* update docs

Examples:

* Email missing → notification delivery email setup-required, in-app still created.
* WhatsApp missing → no WhatsApp sent, no fake wa.me API delivery.
* SMS missing → no SMS sent.
* Push missing → push disabled/setup-required.
* Cron missing → digest/retry setup-required.

---

## 71. In-App Notifications Versus External Delivery

In-app notifications:

* DB-backed
* recipient private
* can be created if notification tables/RLS ready
* unread count real
* no provider required

External delivery:

* email/SMS/WhatsApp/push
* requires provider configured
* requires user preference/consent
* requires template
* requires delivery log
* status real only
* setup-required if not configured

Do not confuse in-app notification with provider delivery.

---

## 72. Notification Source Integration

Integrate notification event creation with existing phases where safe:

* Prompt 04 moderation statuses
* Prompt 08 leads/messages/proposals/site visits
* Prompt 09 payments/invoices/subscriptions
* Prompt 10 media processing failures
* Prompt 12 ad statuses
* Prompt 07 admin assignments/provider alerts

Rules:

* do not break existing flows.
* if integration partial, document exact event types done.
* no fake events.
* no duplicate spam.
* idempotency/dedup where possible.

---

## 73. Idempotency Requirements

Idempotency required for:

* ad impression events
* ad click events
* notification event creation
* external notification delivery
* provider webhook callbacks
* retry attempts
* ad status transitions
* provider status checks

Rules:

* duplicate event does not duplicate notification spam.
* duplicate provider callback does not change status incorrectly.
* duplicate click/impression filtered or counted according to rules.
* idempotency key stored where needed.

---

## 74. Rate Limit Requirements

Add or prepare rate limits for:

* ad campaign creation
* creative upload session creation
* ad impression/click tracking
* notification delivery queueing
* provider test sends
* provider webhook processing
* support/provider admin actions
* mark-read spam if needed

Rules:

* no unbounded event writes.
* provider test send limited.
* click/impression endpoint abuse controlled.
* rate limit status documented.
* no fake rate limit claim.

---

## 75. Security / Privacy Deep Requirements

Must protect:

* ad campaign private data
* targeting internals
* payment/ad credit data
* notification payloads
* provider configs
* provider logs
* provider secrets
* webhook payloads
* DLQ records
* hidden contact
* user preferences
* admin notes
* IP/user agent data

Must not:

* expose provider secrets
* expose hidden contact in notification/ad payloads
* expose private campaign data publicly
* expose private notification to wrong user
* expose raw IP publicly
* allow open redirect in ad clicks/deep links
* allow fake provider active status
* allow public pending/rejected ads

---

## 76. Public SEO Boundary

Ads/notification/provider private pages should not be indexed.

Noindex/no-store:

* builder ads dashboard
* ad campaign detail/manage
* admin ads
* admin providers
* notification center
* notification preferences
* provider logs
* provider webhooks
* provider setup pages

Public ad creatives may appear on public pages but:

* should not create separate indexable private ad pages.
* should not be in sitemap unless public creative is part of public page.
* must not expose campaign private metadata.

---

## 77. Public Search / SEO Ad Boundary

If ads appear in search:

* label Sponsored
* do not alter organic canonical/metadata with ad private data
* do not include ad click tracker URLs in sitemap
* do not fake organic ranking
* do not include pending/rejected ads
* no private targeting data in source
* no hidden contact

If search ad placement is not ready, keep it setup-required.

---

## 78. API Provider Status Updates

Update `API_PROVIDER_STATUS.md` for:

* Email provider
* SMS provider
* WhatsApp provider
* Push provider
* OTP provider status reference
* Razorpay/payment status reference
* Google Maps/geocoding
* Cloudflare R2/CDN reference
* Turnstile/Captcha
* Analytics/GSC
* Error monitoring
* Cron/retry jobs
* Supabase Database/RLS

Statuses must be accurate:

```txt id="provider-status-values"
NOT_STARTED
SETUP_REQUIRED
CONFIGURED
TEST_MODE
ACTIVE
PARTIAL
DEGRADED
FAILED
BLOCKED
```

Do not mark active without real test.

---

## 79. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

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

Use accurate statuses.

---

## 80. Changelog Update

Update `CHANGELOG.md`.

Include:

* date
* Prompt 12
* summary
* changed files
* new routes/API routes
* migration files if any
* RLS/security changes
* ads/notification/provider changes
* provider status changes
* tests/checks run
* docs updated
* known issues
* rollback notes
* manual verification pending

---

## 81. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* fake ad active
* fake ad payment
* fake ad approval
* fake impression count
* fake click count
* ad without sponsored label
* pending/rejected ad public
* unpublished project ad public
* RERA gate bypass
* builder wrong project ad
* owner/broker project ad creation
* ad click open redirect
* ad metrics fake
* notification fake unread
* notification wrong recipient
* notification hidden contact leak
* notification deep link private bypass
* fake email sent
* fake SMS sent
* fake WhatsApp sent
* provider secret leak
* service role client exposure
* provider status fake active
* provider webhook no signature/idempotency
* retry/DLQ fake
* RLS missing
* migration missing
* private notification indexable
* build failure
* mobile notification broken

---

## 82. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 12 implementation status
* manual verification pending:

  * `prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`
* ads routes/features needing verification
* notifications routes/features needing verification
* provider setup-required states
* provider test status
* RLS tests pending
* responsive checks pending
* known bugs

Do not mark manual verification PASS from implementation prompt alone.

---

## 83. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md`.

Include:

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

---

## 84. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md`.

Include:

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

## 85. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

Include:

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

If DB/provider/webhook/public ad serving changes exist, rollback notes are mandatory.

---

## 86. Brain Update

Update `brain.md`.

Include:

* Prompt 12 implementation summary
* changed files
* routes/API routes added/changed
* migration files if any
* ads status
* notification status
* provider status
* public ad serving status
* RLS status
* provider setup-required states
* fake ad/notification/provider checks
* bugs/blockers
* tests/checks run
* next prompt:

  * `prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`
* exact resume instruction

---

## 87. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
src/app/dashboard/builder/ads/*
src/app/dashboard/builder/promotions/*
src/app/dashboard/notifications/*
src/app/admin/ads/*
src/app/admin/promotions/*
src/app/admin/notifications/*
src/app/admin/providers/*
src/app/admin/provider-status/*
src/app/api/ads/*
src/app/api/notifications/*
src/app/api/providers/*
src/app/api/webhooks/providers/*
src/components/ads/*
src/components/promotions/*
src/components/notifications/*
src/components/providers/*
src/components/layout/NotificationBell.tsx
src/lib/ads/*
src/lib/promotions/*
src/lib/notifications/*
src/lib/providers/*
src/lib/email/*
src/lib/sms/*
src/lib/whatsapp/*
src/lib/push/*
src/lib/actions/ads.ts
src/lib/actions/promotions.ts
src/lib/actions/notifications.ts
src/lib/actions/providers.ts
src/lib/validators/ads.ts
src/lib/validators/notifications.ts
src/lib/validators/providers.ts
src/lib/permissions/provider-permissions.ts
src/types/ads.ts
src/types/notifications.ts
src/types/providers.ts
supabase/migrations/*_ads_promotion_notifications_providers.sql
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

## 88. Expected Output From This Phase

At the end of Prompt 12 implementation, project should have:

* builder ads/promotions foundation
* ad campaign table/model
* ad creative table/model
* ad targeting table/model
* ad lifecycle statuses
* ad approval workflow
* admin ad moderation foundation
* public active ads view/API
* sponsored label requirement
* city/location targeting foundation
* impression/click event foundation
* fraud/frequency foundation
* notification event table/model
* notification center
* notification bell with real unread count
* notification preferences
* notification templates
* provider registry
* provider status dashboard foundation
* provider setup-required handling
* email/SMS/WhatsApp/push abstractions/foundations
* provider delivery logs
* retry/DLQ foundation
* provider webhook foundation
* provider secret masking
* RLS policies
* no fake ads/notifications/provider delivery
* docs updated
* checks run
* manual verification pending

---

## 89. Forbidden Outcomes

This phase must not leave:

* fake active ad
* fake ad payment
* fake ad approval
* fake impressions
* fake clicks
* fake CTR
* ad without Sponsored label
* pending/rejected/expired ad public
* unpublished project ad public
* RERA-required ad without valid RERA status
* owner/broker project ad creation
* wrong builder project ad creation
* open redirect in ad click
* fake unread notification count
* notification to wrong recipient
* hidden contact in notification/ad payload
* fake email/SMS/WhatsApp/push sent
* provider active without setup/test
* provider secret exposed
* service role in client
* fake provider webhook success
* retry/DLQ fake success
* private provider logs public
* RLS missing
* DB changes without migration
* docs outdated
* manual verification skipped

---

## 90. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* ads campaign foundation exists but payment/ad credit gate setup-required
* public ad serving disabled/setup-required until payment/RERA/provider verified
* impression/click tracking foundation exists but aggregation partial
* fraud/frequency cap partial
* notification center works but external providers setup-required
* provider registry exists but no external delivery tested
* retry/DLQ foundation partial
* provider webhooks setup-required
* push not started
* digest/quiet hours setup-required
* RLS runtime tests pending
* responsive/browser checks pending

### `FAIL`

Use if:

* build fails
* fake active ad/payment/approval
* ad appears without Sponsored label
* pending/rejected/unpublished project ad public
* hidden contact leaks in ad/notification
* fake impressions/clicks/unread count
* notification wrong recipient
* fake provider delivery
* provider secret exposed
* service role client exposure
* public can read private campaigns/notifications/provider logs
* ad click open redirect
* RLS missing on private tables
* DB changes missing migration

### `BLOCKED`

Use if:

* Prompt 04 project foundation failed
* Prompt 06 builder dashboard failed
* Prompt 07 admin system failed
* Prompt 09 billing/payment gate required but failed
* Prompt 10 media creative upload failed
* Prompt 11 location targeting/SEO foundation failed
* Supabase/RLS unavailable blocks safe implementation
* provider architecture unresolved
* package/build baseline broken
* architecture conflict needs owner decision

### `SETUP_REQUIRED`

Use for:

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

Setup-required is acceptable only when no fake ads/notifications/provider delivery appears and privacy is protected.

---

## 91. Final Response Required Format

Return final response in this structure:

```txt id="prompt-12-final-response-format"
Summary:
- what ads/promotions/notifications/providers foundation was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Ads/promotions:
- builder campaign dashboard:
- campaign model:
- creative model:
- project eligibility:
- RERA gate:
- payment/ad credit gate:
- targeting:
- scheduling:
- approval workflow:
- public serving:
- sponsored label:

Metrics/fraud:
- impressions:
- clicks:
- CTR:
- aggregation:
- fraud filtering:
- frequency cap:

Notifications:
- notification events:
- notification table:
- notification bell:
- notification center:
- unread count:
- mark read/all read:
- preferences:
- templates:
- deep links:

Providers:
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
- secret masking:

Admin:
- ads moderation:
- notification templates:
- provider settings/status:
- permissions/audit:

RLS/security:
- private tables:
- public active ads view:
- wrong user denial:
- hidden contact protection:
- provider secrets:
- service role:
- open redirect:
- private noindex/cache:

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
- webhooks:

Docs updated:
- path list

Tests/checks run:
- command: result

Bugs/issues found:
- bug IDs or none

Rollback notes:
- code:
- database:
- public ad serving:
- provider delivery:
- webhooks:
- RLS:
- cache/revalidation:

Manual verification:
- pending prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md

Next step:
- run prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
```

Do not say only “done”.

---

## 92. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
```

Do not start Prompt 13 until Prompt 12 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 93. Common Bugs To Watch For

Create/track bugs for:

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

## 94. Quality Bar

This phase is successful when future phases can rely on:

* ads are builder/project-scoped
* ads require published project
* RERA/payment/approval gates are safe and honest
* public ads show Sponsored label
* public ads never show private/pending/rejected campaigns
* metrics are real or no-data
* notifications are DB-backed and recipient-scoped
* unread count is real
* notification preferences are private
* external providers show honest setup-required/test/active states
* provider secrets are protected
* provider delivery logs/retries are honest
* no fake ads/notifications/provider delivery exists
* RLS protects private tables
* docs reflect reality
* manual verification is ready

---

## 95. Final Rule For Prompt 12

Implement ads safely.

Implement notifications honestly.

Implement providers honestly.

Use real DB-backed notifications.

Use real provider status.

Use setup-required where provider keys are missing.

Protect provider secrets.

Protect hidden contact.

Use RLS.

Use Sponsored label.

Use project/RERA/payment/approval gates.

Do not fake ads.

Do not fake ad approval.

Do not fake ad payment.

Do not fake impressions.

Do not fake clicks.

Do not fake unread counts.

Do not fake email delivery.

Do not fake SMS delivery.

Do not fake WhatsApp delivery.

Do not fake push delivery.

Do not mark provider active without test/config.

Do not expose provider secrets.

Do not expose service role.

Do not allow wrong recipient notifications.

Do not allow open redirects.

Do not skip migrations for DB changes.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
