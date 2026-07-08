# prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md

# My Gujarat Property — Prompt 15: Final Production API Testing And Signoff

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
```

This is the final implementation/readiness prompt before the final manual verification signoff.

This phase prepares the final production/staging API testing, provider testing, launch signoff evidence and Super Admin handoff package for **My Gujarat Property**.

This phase focuses on:

* final API/provider test plan
* production/staging readiness checklist
* real provider status validation
* Supabase Auth/DB/RLS checks
* OTP provider checks
* Razorpay payment/webhook checks
* Cloudflare R2/CDN/media checks
* email provider checks
* SMS provider checks
* WhatsApp provider checks
* maps/geocoding provider checks
* analytics/GSC status checks
* captcha/WAF status checks
* cron/job status checks
* notification provider checks
* ad/promotion checks
* hidden contact final checks
* RLS final readiness
* private cache/noindex final checks
* fake data/mock/test mode cleanup
* seed/demo data cleanup
* environment variable validation
* staging/prod separation
* final smoke test matrix
* final launch freeze package
* rollback readiness confirmation
* final known limitations list
* final Super Admin signoff package
* docs updates
* handoff to final manual verification prompt

Do not fake provider success.

Do not fake API test success.

Do not fake live payment success.

Do not fake OTP delivery.

Do not fake email/SMS/WhatsApp delivery.

Do not fake media/CDN success.

Do not fake analytics/monitoring.

Do not fake Super Admin signoff.

Do not fake production readiness.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
Prompt Number: 15
Phase: Final Production API Testing And Signoff
Type: Implementation / Final Readiness Prompt
Matching Verification Prompt: prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
Previous Verification Prompt: prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
```

---

## 2. Phase Purpose

The purpose of this phase is to prepare the final production-readiness package and verify that all provider/API integrations are either:

* actually configured and tested,
* honestly marked `SETUP_REQUIRED`,
* honestly marked `PARTIAL`,
* honestly marked `BLOCKED`, or
* intentionally disabled behind safe feature flags.

This phase should create/update:

* final API test checklist
* final provider test checklist
* final production/staging env checklist
* final smoke test matrix
* final launch freeze checklist
* final rollback checklist
* final fake data cleanup checklist
* final RLS/security checklist handoff
* final provider status table
* final known limitations list
* final Super Admin signoff package
* final manual verification handoff

This phase does not itself approve launch unless final manual verification also passes and Super Admin explicitly signs off.

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
prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
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
docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md
```

Also inspect current implementation, provider configs, environment validation, API routes, webhooks and deployment docs.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code/docs, inspect:

```txt id="inspect-required"
package.json
.env.example
next.config.*
middleware.*
src/middleware.*
src/app/
app/
src/app/api/
app/api/
src/app/api/health/
app/api/health/
src/app/api/webhooks/
app/api/webhooks/
src/app/admin/
app/admin/
src/app/dashboard/
app/dashboard/
src/lib/env/
lib/env/
src/lib/config/
lib/config/
src/lib/providers/
lib/providers/
src/lib/payments/
lib/payments/
src/lib/otp/
lib/otp/
src/lib/email/
lib/email/
src/lib/sms/
lib/sms/
src/lib/whatsapp/
lib/whatsapp/
src/lib/media/
lib/media/
src/lib/uploads/
lib/uploads/
src/lib/notifications/
lib/notifications/
src/lib/ads/
lib/ads/
src/lib/analytics/
lib/analytics/
src/lib/maps/
lib/maps/
src/lib/monitoring/
lib/monitoring/
src/lib/security/
lib/security/
src/lib/supabase/
lib/supabase/
src/lib/deployment/
lib/deployment/
src/lib/feature-flags/
lib/feature-flags/
src/lib/maintenance/
lib/maintenance/
src/lib/actions/
lib/actions/
supabase/migrations/
supabase/seed*
public/
```

Search for:

* fake provider success
* mock provider active
* fake OTP sent
* fake email/SMS/WhatsApp sent
* fake payment success
* fake Razorpay webhook success
* fake media/CDN success
* fake monitoring/analytics
* fake map/geocoding
* fake ad metrics
* fake notification delivery
* demo data in production paths
* hardcoded counts
* test data visible publicly
* test payment mode in production
* development OTP bypass
* provider secrets in client
* service role in client
* private routes in sitemap
* private cache issues
* hidden contact leaks
* TODO launch blockers
* `SETUP_REQUIRED` items
* `BLOCKED` items
* unresolved critical bugs

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement or update:

### 5.1 Final Test Plan

* provider/API test checklist
* route smoke test checklist
* role smoke test checklist
* RLS smoke test checklist
* public/private cache smoke test checklist
* fake data cleanup checklist
* launch freeze checklist
* rollback checklist
* signoff package

### 5.2 Provider Readiness

* Supabase Auth/Database/RLS
* Supabase Storage or Cloudflare R2/CDN
* Razorpay
* OTP
* Email
* SMS
* WhatsApp
* Push
* Maps/geocoding
* Analytics/GSC
* Error monitoring
* Captcha/WAF
* Cron/jobs
* Malware scanning
* Backup provider
* Hosting/deployment

### 5.3 Final Safety Gates

* build/lint/type/test gate
* provider active/setup-required gate
* fake/mock/test mode cleanup
* production env validation
* secrets/client exposure scan
* hidden contact final scan
* RLS final status
* private sitemap/cache scan
* rollback readiness
* Super Admin signoff package

### 5.4 Docs

Update all memory docs.

---

## 6. Out Of Scope For This Phase

Do not:

* perform final manual verification pass from this prompt alone
* mark production launch approved without final manual verification
* mark Super Admin signoff without explicit Super Admin/project owner action
* fake provider delivery
* fake live payment
* fake OTP/SMS/WhatsApp/email success
* fake analytics/monitoring
* fake legal signoff
* fake external security audit
* perform destructive DB changes unless explicitly needed and documented
* rewrite major architecture
* remove working features to pass final tests without approval

This phase prepares final signoff. Matching manual verification performs final signoff review.

---

## 7. Hard Final Signoff Rules

Claude must enforce:

```txt id="hard-final-signoff-rules"
No fake production readiness.
No fake provider active status.
No fake payment success.
No fake OTP delivery.
No fake SMS delivery.
No fake WhatsApp delivery.
No fake email delivery.
No fake media/CDN success.
No fake monitoring.
No fake RLS pass.
No fake security pass.
No fake rollback tested status.
No fake Super Admin signoff.
No test/demo/mock mode in production.
No hidden contact leak.
No private route in sitemap.
No private data in public cache.
No service role in client.
No provider secret in client.
No final PASS without manual verification.
```

Forbidden:

* marking `ACTIVE` without real tested provider
* marking `PASS` from a skipped test
* using dev OTP bypass in production
* showing test payment success as real
* sending fake invoice/payment status
* hiding unresolved critical bugs
* ignoring setup-required provider items
* ignoring rollback gaps
* ignoring private data leaks
* ignoring failed build/typecheck/lint

---

## 8. Final Status Values

Use these final status values:

```txt id="final-status-values"
NOT_READY
READY_FOR_FINAL_VERIFICATION
READY_FOR_SUPER_ADMIN_REVIEW
PARTIAL_ACCEPTANCE_REQUIRED
BLOCKED
SETUP_REQUIRED
PRODUCTION_READY_AFTER_SIGNOFF
```

Rules:

* This implementation prompt can use `READY_FOR_FINAL_VERIFICATION` if all preparation/docs/checklists are ready.
* This prompt cannot use final `PRODUCTION_READY_AFTER_SIGNOFF` unless final manual verification and Super Admin signoff are already complete and documented.
* If provider/live checks are pending, use `SETUP_REQUIRED` or `PARTIAL_ACCEPTANCE_REQUIRED`.
* If critical issues exist, use `BLOCKED` or `NOT_READY`.

---

## 9. Final Provider Status Rules

Provider statuses must be accurate:

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
DISABLED
```

Definitions:

* `NOT_STARTED`: no implementation/config yet.
* `SETUP_REQUIRED`: implementation/foundation exists but keys/config/testing missing.
* `CONFIGURED`: env/config present but live test not completed.
* `TEST_MODE`: sandbox/test provider working, not production.
* `ACTIVE`: production/live provider configured and tested successfully.
* `PARTIAL`: some provider functions work, others pending.
* `DEGRADED`: provider works with known issues.
* `FAILED`: provider test failed.
* `BLOCKED`: provider cannot proceed due to blocker.
* `DISABLED`: intentionally off behind feature flag.

Do not mark `ACTIVE` without real successful provider test.

---

## 10. Supabase Auth Final Test Plan

Verify or prepare final test steps for Supabase Auth:

* public mobile OTP login/register
* non-registered mobile prompts register
* registration roles Owner/Broker/Builder
* full name/email/phone captured
* OTP confirm
* redirect to original action/home
* login/register hidden after login
* logout works
* suspended/disabled/deleted users handled
* admin login separate
* public mobile OTP not used for admin
* session expiry behavior documented
* provider status updated

Expected final status:

* `ACTIVE` only if production auth/OTP flow tested.
* `TEST_MODE` if only dev/test OTP tested.
* `SETUP_REQUIRED` if OTP provider missing.
* `PARTIAL` if Supabase Auth works but OTP delivery pending.

No fake OTP success.

---

## 11. Supabase Database / RLS Final Test Plan

Prepare final test plan for Supabase DB/RLS:

* migrations applied
* schema current
* RLS enabled on private tables
* public-safe views only expose safe fields
* wrong-user private access denied
* participant-only data protected
* admin/staff permission-scoped
* service role server-only
* policies reviewed after final migrations
* indexes reviewed
* backup/restore status documented
* provider status updated

Final RLS must include:

* profiles
* properties/projects/requirements private states
* leads/messages/proposals/site visits
* billing/payments/invoices/GST
* media private metadata
* notifications/preferences
* ads/private campaigns
* provider configs/logs
* CMS drafts/legal versions/consents
* support/grievance/privacy requests
* audit/fraud/security tables

No fake RLS pass.

---

## 12. Supabase Storage / R2 / CDN Final Test Plan

Prepare final media/storage test plan:

* public image upload
* private document upload
* media variants created or setup-required
* public media loads from public-safe URL
* private media requires signed URL
* wrong user denied private media
* CDN URL works if configured
* cache headers safe
* image variants correct
* ad creatives public-safe
* project video if enabled
* PDF brochure access rules
* orphan cleanup status
* malware scan status
* provider status updated

Expected:

* `ACTIVE` only if storage/CDN tested.
* `SETUP_REQUIRED` if R2/CDN keys missing.
* `PARTIAL` if local/Supabase storage works but CDN not tested.

No fake CDN success.

---

## 13. Razorpay Payment Final Test Plan

Prepare final Razorpay test plan:

* env vars present
* public key client-only
* secret key server-only
* webhook secret server-only
* checkout order creation
* coupon/plan calculation server-side
* no client price trust
* payment callback does not activate subscription
* webhook signature verification
* webhook idempotency
* amount/currency verification
* payment success activates subscription only after verified webhook
* invoice created after verified payment
* invoice number sequence correct
* payment failed/pending states correct
* refund/credit note foundation status
* provider status updated

Expected:

* `ACTIVE` only if live/sandbox test according to environment successfully completed and documented.
* `TEST_MODE` for Razorpay test mode.
* `SETUP_REQUIRED` if keys/webhook missing.
* `BLOCKED` if payment webhook unsafe.

No fake payment success.

---

## 14. GST / Invoice Final Test Plan

Prepare GST/invoice test plan:

* GST profile optional
* B2B/B2C distinction
* Gujarat CGST/SGST and outside Gujarat IGST logic if implemented
* setup-required where tax settings incomplete
* invoice generated only after verified payment
* invoice number immutable
* FY sequence format:

  * `MGP-26-27-0001`
* no duplicate invoice numbers
* invoice list own-user only
* invoice PDF/email status honest
* refund/credit note status honest
* admin billing permission-scoped

No fake invoices.

---

## 15. OTP Provider Final Test Plan

Prepare OTP provider final test plan:

* provider configured or setup-required
* phone OTP send real in selected environment
* OTP verify works
* resend delay
* per phone/IP/session limits
* verify attempt limits
* cost guard
* logs redacted
* dev/test OTP disabled in production
* admin not using public OTP
* provider status updated

Expected:

* `ACTIVE` only after real OTP provider test.
* `TEST_MODE` only for sandbox/test.
* `SETUP_REQUIRED` if missing.
* `FAILED` if delivery failed.

No fake OTP delivery.

---

## 16. Email Provider Final Test Plan

Prepare email provider final test plan:

* provider selected/configured
* sender/from domain configured
* test email sent in safe environment
* transactional template works
* invoice email setup if enabled
* support reply email setup if enabled
* delivery log real
* bounce/failure handling setup status
* unsubscribe/marketing rules if marketing email enabled
* no hidden contact leak
* no secrets in logs
* provider status updated

Expected:

* `ACTIVE` only after real provider test.
* `SETUP_REQUIRED` if provider missing.
* `PARTIAL` if in-app notifications work but email external delivery pending.

No fake email sent.

---

## 17. SMS Provider Final Test Plan

Prepare SMS provider final test plan:

* provider selected/configured
* DLT/template compliance status documented if required
* test SMS sent in safe environment
* delivery log real
* rate/cost control
* opt-in/transactional rules
* OTP/SMS distinction
* no hidden contact leak
* no secrets in logs/client
* provider status updated

Expected:

* `ACTIVE` only after real SMS test.
* `SETUP_REQUIRED` if missing.
* `FAILED` if test failed.

No fake SMS sent.

---

## 18. WhatsApp Provider Final Test Plan

Prepare WhatsApp provider final test plan:

* WhatsApp Business Cloud API configured or setup-required
* API token server-only
* verify token server-only
* templates approved/setup-required
* user opt-in where needed
* test WhatsApp message sent in safe environment if enabled
* webhook/callback status
* delivery log real
* wa.me fallback not marked API delivery
* no hidden contact leak
* no secrets in logs/client
* provider status updated

Expected:

* `ACTIVE` only after real WhatsApp API test.
* `SETUP_REQUIRED` if missing.
* `PARTIAL` if wa.me manual fallback only.
* `TEST_MODE` if sandbox/test only.

No fake WhatsApp sent.

---

## 19. Push / PWA Provider Final Test Plan

Prepare push/PWA test plan if implemented:

* service worker status
* push subscription private/RLS
* VAPID keys server/client separated correctly
* permission prompt safe
* push test sent if enabled
* no private lockscreen payload
* preferences respected
* offline/PWA status if implemented
* provider status updated

Expected:

* `NOT_STARTED` or `SETUP_REQUIRED` if not implemented.
* `ACTIVE` only after actual push delivery test.

No fake push success.

---

## 20. Maps / Geocoding Final Test Plan

Prepare maps/geocoding test plan:

* provider configured or setup-required
* public map embed/API status
* city/location selection does not require fake map
* map pin privacy
* exact private address not exposed
* geocoding key restricted
* IP city fallback status
* nearby fallback status
* provider status updated

Expected:

* `ACTIVE` only after configured/tested map/geocoding.
* `SETUP_REQUIRED` if key missing.
* `PARTIAL` if only static/embed working.

No fake location/geocoding.

---

## 21. Analytics / GSC Final Test Plan

Prepare analytics/GSC final plan:

* provider configured or setup-required
* public page tracking only if consent/compliance allows
* no private dashboards/admin sensitive tracking
* hidden contact not sent
* GSC/sitemap submission status
* analytics events safe
* cookie preferences respected
* provider status updated

Expected:

* `ACTIVE` only after configured/tested.
* `SETUP_REQUIRED` if missing.
* `DISABLED` if intentionally off.

No fake analytics traffic.

---

## 22. Error Monitoring Final Test Plan

Prepare error monitoring final plan:

* provider configured or setup-required
* client/server error capture if enabled
* release/version tag
* source map policy
* PII redaction
* no hidden contact
* no provider secrets
* webhook/payment/provider errors captured safely
* provider status updated

Expected:

* `ACTIVE` only if configured/tested.
* `SETUP_REQUIRED` if missing.

No fake monitoring active.

---

## 23. Captcha / WAF / Abuse Protection Final Test Plan

Prepare final plan for:

* Turnstile/Captcha provider
* WAF/CDN rate protection
* OTP abuse
* login abuse
* inquiry spam
* contact request spam
* upload abuse
* provider test send abuse
* ad click/impression abuse
* scraping controls

Expected:

* `ACTIVE` only if configured/tested.
* `SETUP_REQUIRED` if provider missing.
* `PARTIAL` if app-level rate limits exist but WAF/captcha missing.

No fake bot protection.

---

## 24. Cron / Jobs Final Test Plan

Prepare cron/job test plan:

* expired ads job
* subscription/trial expiry job
* notification digest/retry job
* provider retry/DLQ job
* media orphan cleanup job
* private signed URL cleanup if any
* sitemap generation/revalidation job if any
* backup job status
* retention cleanup job
* status in API_PROVIDER_STATUS

Expected:

* `ACTIVE` only after job configured/tested.
* `SETUP_REQUIRED` if missing.
* `PARTIAL` if manual/admin action required.

No fake cron success.

---

## 25. Malware Scan Final Test Plan

Prepare malware scan test plan:

* provider configured or setup-required
* uploaded files scan status
* SVG/PDF/video safety fallback
* quarantined file behavior
* admin review
* private file protection
* provider status updated

Expected:

* `SETUP_REQUIRED` if scanner missing.
* Do not mark file scanning active without provider/test.

No fake malware scan pass.

---

## 26. Backup Provider Final Test Plan

Prepare backup/restore plan:

* DB backup status
* storage/R2 backup/lifecycle status
* backup schedule
* restore test status
* RPO/RTO placeholder
* invoice/payment/audit retention
* pre-deploy backup checklist
* destructive migration backup requirement
* provider status updated

Expected:

* `ACTIVE` only if backups configured and restore tested or clearly defined according to environment policy.
* `SETUP_REQUIRED` if missing.
* `PARTIAL` if backup configured but restore not tested.

No fake backup tested status.

---

## 27. Hosting / Deployment Final Test Plan

Prepare hosting/deployment test plan:

* deployment target identified
* staging URL
* production URL
* build command
* env vars configured
* domain configured
* HTTPS
* redirects
* headers
* CDN/cache rules
* branch/version
* deployment rollback method
* deployment owner
* provider status updated

Expected:

* `READY_FOR_FINAL_VERIFICATION` only if hosting/deploy readiness docs are complete.
* `SETUP_REQUIRED` if hosting/production env missing.

No fake deployment.

---

## 28. Environment Variable Final Validation

Verify `.env.example` and env validator cover:

* Supabase public URL/anon key
* Supabase service role server-only
* site URL
* app env
* Razorpay keys/webhook secret
* R2/CDN keys
* OTP provider keys
* email provider keys
* SMS provider keys
* WhatsApp provider keys
* maps keys
* analytics keys
* captcha keys
* monitoring DSN
* cron secrets
* backup provider vars

Rules:

* real secrets not in repo/docs.
* public keys only where intended.
* server secrets not prefixed public.
* missing required production env blocks production readiness.
* optional missing provider marks setup-required.

---

## 29. Feature Flag Final Validation

Verify feature flags for risky features:

```txt id="feature-flags"
ENABLE_PUBLIC_ADS
ENABLE_AD_CLICK_TRACKING
ENABLE_EXTERNAL_EMAIL
ENABLE_EXTERNAL_SMS
ENABLE_EXTERNAL_WHATSAPP
ENABLE_PUSH_NOTIFICATIONS
ENABLE_PAYMENT_CHECKOUT
ENABLE_MEDIA_UPLOADS
ENABLE_PROJECT_VIDEO
ENABLE_PUBLIC_CMS_BLOG
ENABLE_LOCATION_REQUESTS
ENABLE_SUPPORT_FORMS
ENABLE_PROVIDER_TEST_SEND
ENABLE_RATE_LIMIT_STRICT_MODE
ENABLE_MAINTENANCE_MODE
```

Rules:

* incomplete providers disabled.
* payment checkout disabled unless payment verified.
* public ads disabled unless gates verified.
* provider test sends admin-only.
* client cannot enable security-sensitive flags.
* flags documented.
* production defaults safe.

---

## 30. Fake / Mock / Demo Data Cleanup

Search and prepare cleanup for:

```txt id="fake-mock-demo-patterns"
mock
fake
demo
sample
dummy
test user
test property
test project
test payment
test invoice
test notification
test ad
test provider
lorem ipsum
placeholder count
hardcoded count
fake analytics
fake views
fake leads
fake RERA
fake verified
fake review
```

Rules:

* dev/test fixtures allowed only in test/dev paths.
* production UI must not show fake data as real.
* fake counts forbidden.
* fake payment success forbidden.
* fake provider delivery forbidden.
* fake verified/RERA forbidden.
* seed/demo data guarded from production.
* placeholder legal/provider statuses honest.

If fake/demo data appears production-visible, create bug and block final readiness.

---

## 31. Test Mode Cleanup

Verify production has no active:

* dev OTP bypass
* Razorpay test mode labelled as live
* mock payment success
* mock email provider active
* mock SMS active
* mock WhatsApp active
* mock push active
* mock CDN active
* mock analytics active
* fake notifications
* fake ads
* fake lead/view analytics
* test admin credentials
* seed users exposed
* debug routes public
* debug logs verbose

Rules:

* test/sandbox can exist in staging if clearly labelled.
* production must not silently use test mode.
* if provider remains test mode, final status cannot be production-ready.

---

## 32. Final Route Smoke Test Plan

Prepare route smoke checklist.

Public routes:

```txt id="public-smoke-routes"
/ 
/search
/properties/[slug]
/projects/[slug]
/profiles/[slug]
/blog
/blog/[slug]
/about
/contact
/faq
/help
/safety
/privacy
/terms
/cookie-policy
/refund
/cancellation
/disclaimer
/grievance
/sitemap.xml
/robots.txt
```

Private routes:

```txt id="private-smoke-routes"
/dashboard
/dashboard/owner
/dashboard/broker
/dashboard/builder
/dashboard/profile
/dashboard/notifications
/dashboard/billing
/dashboard/messages
/dashboard/site-visits
/dashboard/saved
/dashboard/builder/ads
/admin
/admin/users
/admin/properties
/admin/projects
/admin/requirements
/admin/ads
/admin/providers
/admin/cms
/admin/security
```

Rules:

* use actual project routes.
* guest denied private.
* wrong role denied.
* public routes no hidden contact.
* private routes no public cache.
* sitemap/robots safe.

---

## 33. Final API Smoke Test Plan

Prepare final API checklist:

* public search API
* public detail API/view
* auth status
* OTP send/verify
* media upload session
* public media load
* signed private media denied for wrong user
* payment order creation
* Razorpay webhook test
* invoice creation after webhook
* notification unread count
* mark notification read
* public ad placement
* ad click redirect safe
* contact request
* inquiry create
* message send
* proposal send
* site visit request
* admin moderation action
* provider status API
* health endpoint
* sitemap/robots

Rules:

* do not call real paid/provider APIs without safe test config.
* record skipped/setup-required checks honestly.
* no fake pass.

---

## 34. Final Role Test Matrix

Prepare final role matrix:

### Guest

* can view home/search/detail/public profile/CMS/legal
* cannot view hidden contact
* inquiry triggers auth popup
* cannot access dashboard/admin/private APIs

### Owner

* can access owner dashboard
* can post property/requirement if plan/gate allows
* cannot post project
* can manage own listings/requirements
* can see own leads/messages/billing/notifications
* cannot see other user's private data

### Broker

* can access broker dashboard
* can post property/requirement if plan/gate allows
* cannot post project
* can manage own CRM/leads/messages/proposals
* cannot see other user's private data

### Builder

* can access builder dashboard
* can post only projects if plan/gate allows
* can manage project leads/requirements/proposals
* can create ads only for own published projects if enabled
* cannot post property
* cannot see other builder private data

### Admin/Staff

* separate login
* permission-scoped access
* no public mobile OTP admin login
* no self-grant
* sensitive actions audited

### Super Admin

* provider/security/payment/system controls
* high-risk actions audited
* final signoff authority

---

## 35. Final RLS Test Matrix

Prepare RLS final matrix:

* guest cannot read private tables
* owner cannot read other owner private listings
* broker cannot read other broker private data
* builder cannot read other builder private projects/campaigns
* user cannot read another user's leads
* non-participant cannot read message thread
* user cannot read another user's invoice
* user cannot read another user's notification
* public cannot read provider logs
* public cannot read private media metadata
* public cannot read CMS drafts
* staff without permission denied restricted tables
* admin permission works only where allowed
* service role server-only

Do not mark RLS final PASS without actual test or documented setup-required.

---

## 36. Hidden Contact Final Test Plan

Prepare final hidden contact scan:

Public surfaces:

* search cards
* property detail
* project detail
* profile pages
* SEO metadata
* Open Graph metadata
* schema
* sitemap
* robots
* public API JSON
* ads
* notifications preview
* provider payloads
* media metadata
* blog/CMS/legal content
* public static HTML

Search terms:

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

Expected:

* no hidden contact public.
* contact reveal only authorized.
* hidden contact not in SEO/schema/sitemap.
* hidden contact not in logs/provider payloads.

---

## 37. Private Sitemap / Robots Final Test Plan

Prepare final sitemap/robots checks:

* sitemap includes public indexable URLs only
* no dashboard/admin/auth/private URLs
* no leads/messages/billing/notifications/provider URLs
* no private media URLs
* no draft/pending/rejected/deleted listings
* no hidden contact
* robots blocks private routes
* robots links correct sitemap
* sitemap lastmod real or omitted
* sitemap generation bounded
* empty/thin pages noindex

If private URL appears in sitemap, final readiness blocked.

---

## 38. Private Cache Final Test Plan

Prepare final cache checks:

* dashboard no-store
* admin no-store
* billing no-store
* messages/leads no-store
* notifications no-store
* provider logs no-store
* signed private media no-store
* CMS drafts no-store
* public pages safe cache only
* no personalized data in public cache
* ad cache short/safe
* sitemap/cache invalidation safe

If private data publicly cached, final readiness blocked.

---

## 39. Security Header Final Test Plan

Prepare final header checks:

* CSP or CSP report-only status
* X-Frame-Options / frame-ancestors
* X-Content-Type-Options
* Referrer-Policy
* Permissions-Policy
* HSTS production status
* COOP/CORP where safe
* admin framing protection
* payment/maps/media domains allowlisted where configured
* no unsafe broad CSP without reason

Do not fake header PASS if not checked.

---

## 40. Build / Type / Lint / Test Gate

Run available:

```txt id="required-checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available:

```txt id="optional-final-checks"
npm run test:e2e
npm run test:security
npm run test:rls
npm run test:performance
npm run analyze
npm run lighthouse
npm audit
pnpm audit
```

Rules:

* build failure blocks final readiness.
* typecheck failure blocks final readiness unless script not configured.
* lint blocking errors block final readiness.
* tests failed must be documented with severity.
* missing scripts are `NOT_CONFIGURED`, not PASS.
* do not fake command results.

---

## 41. Manual Browser / Device Test Plan

Prepare final browser matrix:

```txt id="browser-matrix"
Chrome desktop
Chrome mobile
Safari iOS
Firefox
Edge
Android Chrome
iPhone Safari
Tablet width
```

Responsive widths:

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

* no horizontal scroll
* header/footer usable
* search filters usable
* detail gallery usable
* login popup usable
* dashboards usable
* admin usable
* upload UI usable if enabled
* payment checkout usable if enabled
* notification dropdown/bottom sheet usable
* provider/setup-required states readable

Untested devices must be marked honestly.

---

## 42. Final User Journey Test Plan

Prepare final end-to-end user journeys.

### Guest

* open home
* select city/search
* view property/project detail
* contact hidden
* click inquiry
* auth popup opens
* register/login
* return to original action

### Owner

* register/login
* open owner dashboard
* post property draft
* submit for approval
* post requirement
* view leads/messages/notifications
* billing gate behavior
* logout

### Broker

* register/login
* open broker dashboard
* post property/requirement
* CRM lead flow
* proposal/message/site visit flow
* billing gate behavior
* logout

### Builder

* register/login
* open builder dashboard
* post project
* view project leads/matching requirements
* create ad campaign if enabled
* billing/ad gate behavior
* logout

### Admin/Staff

* separate login
* moderation queue
* approve/reject property/project/requirement
* review ad
* manage CMS/legal/provider status by permission
* verify audit log

### Super Admin

* provider status review
* feature flags
* billing plans
* security checklist
* launch signoff review

---

## 43. Final Payment Journey Test Plan

Prepare payment journey test:

* open pricing
* choose plan by role
* trial start if enabled
* coupon apply if enabled
* order create
* Razorpay checkout
* payment success/fail/pending states
* webhook verified
* subscription activated only after webhook
* invoice issued
* invoice visible in dashboard
* payment history visible
* wrong user invoice denied
* plan gate unlocks posting only after verified payment
* refund/credit note status documented

Do not use live payment unless safe approved test amount/environment.

---

## 44. Final Media Journey Test Plan

Prepare media journey test:

* upload property images
* reorder/crop/cover if implemented
* submit listing
* public detail shows variants
* upload project images/video if enabled
* upload brochure PDF if role allows
* private docs require permission
* wrong user denied
* public search uses thumbnail
* gallery works mobile
* deleted media removed
* CDN/cache status correct

No fake upload/processing.

---

## 45. Final Lead / CRM / Message Journey Test Plan

Prepare lead journey test:

* guest inquiry triggers auth
* logged-in inquiry creates lead
* duplicate inquiry prevented
* owner/broker/builder receives notification
* CRM stage changes
* notes/followups private
* proposal sent/viewed/accepted/rejected
* message thread participant-only
* site visit requested/scheduled/rescheduled/cancelled
* hidden contact reveal only through authorized flow
* wrong user denied

---

## 46. Final Ads / Notification Journey Test Plan

Prepare ads/notification journey test:

* builder selects own published project
* campaign created draft/submitted
* admin reviews
* approval blocked if project/payment/RERA gate fails
* approved/active campaign appears public with Sponsored label
* pending/rejected/expired campaign not public
* impression/click metrics real or no-data
* notification created for ad status
* unread count updates
* mark read works
* external provider delivery setup/real status honest

---

## 47. Final CMS / SEO / Legal Journey Test Plan

Prepare CMS/SEO/legal test:

* published CMS/legal page loads
* draft page not public
* legal placeholder not marked final
* blog published page loads if enabled
* sitemap includes published public pages only
* canonical correct
* noindex empty/thin pages
* schema no fake reviews/counts/contact
* footer legal links work
* redirect manager safe
* open redirect blocked

---

## 48. Final Support / Grievance / Privacy Journey Test Plan

Prepare support/privacy test:

* support/help pages load
* grievance page status accurate
* takedown/copyright status accurate
* privacy request foundation status accurate
* support form stores request or setup-required
* no fake submission success
* request private/RLS protected
* admin/staff permission-scoped
* notifications/provider status honest

---

## 49. Final Security Regression Test Plan

Prepare final regression check:

* public admin denied
* wrong role denied
* wrong user denied private data
* hidden contact not public
* service role not client
* provider secrets not client/UI/logs
* payment webhook safe
* provider webhook safe
* upload validation safe
* CMS sanitizer safe
* open redirect blocked
* private pages noindex/no-store
* private sitemap absent
* RLS intact
* audit logs high-risk actions

---

## 50. Final Performance Regression Test Plan

Prepare final performance regression check:

* home fast enough foundation
* search paginated
* detail page no N+1 severe issue
* dashboard lists paginated
* admin queues paginated
* notification count efficient
* ad serving efficient
* images optimized
* public cache safe
* private no-store safe
* build bundle reviewed or setup-required
* load test status honest

No fake Core Web Vitals.

---

## 51. Final Rollback Drill Plan

Prepare rollback drill checklist:

* identify deployed version
* code rollback command/process
* DB rollback process
* migration rollback notes
* feature flag rollback
* provider flag rollback
* cache/CDN purge
* R2/media rollback considerations
* payment webhook event preservation
* pending jobs/retries handling
* sitemap/SEO rollback
* admin/provider/security rollback
* monitoring after rollback
* owner approval required

If rollback not actually tested, mark `NOT_TESTED`.

No fake rollback test.

---

## 52. Final Backup Drill Plan

Prepare backup drill checklist:

* latest DB backup
* latest storage backup/lifecycle
* invoice/payment/audit retention
* restore test status
* pre-launch backup required
* destructive migration backup required
* RPO/RTO documented
* backup owner
* setup-required items

If restore not tested, mark `RESTORE_TEST_REQUIRED`.

---

## 53. Final Launch Freeze Package

Prepare launch freeze package including:

* version/branch/commit
* environment
* provider status summary
* feature flag summary
* migration summary
* build/test summary
* security/RLS summary
* performance/cache summary
* known issues
* setup-required items
* rollback readiness
* smoke checklist
* final manual verification pending
* Super Admin signoff pending

Prompt 15 implementation prepares package. Matching verification confirms it.

---

## 54. Final Known Limitations List

Create/update final known limitations:

* provider setup-required items
* partial features
* disabled features
* test-mode providers
* missing load tests
* missing external audit
* missing legal review
* missing backup restore test
* missing monitoring provider
* missing malware scanner
* browser/device checks not run
* final production credentials pending
* launch blockers

Known limitations must be honest and visible in docs.

---

## 55. Final Launch Blockers

Blockers include:

* build fails
* critical security bug
* hidden contact leak
* public admin
* service role client leak
* provider secret leak
* private URL in sitemap
* private data public-cached
* RLS missing private table
* wrong-user data access
* payment webhook unsafe
* provider fake active status
* fake payment/OTP/SMS/WhatsApp/email
* test mode active as production
* rollback missing
* backup missing for destructive migration
* legal placeholder final
* fake verified/RERA/payment/leads/views
* Super Admin signoff missing for actual production launch

This phase should identify and document blockers. Do not hide them.

---

## 56. Final Signoff Roles

Signoff roles:

### Claude Code

* prepares implementation/readiness package
* runs available checks
* updates docs
* lists issues/setup-required
* does not fake signoff

### Project Owner

* accepts partial/setup-required risks
* confirms business decisions
* provides provider credentials
* approves launch readiness path

### Super Admin

* reviews final checklist
* approves launch
* confirms provider/payment/security/legal readiness
* owns production signoff

### Staff/Admin

* execute assigned verification/moderation/support/billing checks

No Super Admin signoff can be invented.

---

## 57. Super Admin Signoff Package

Prepare Super Admin signoff package in docs.

Include:

* launch version
* environment
* provider status table
* payment status
* OTP status
* media/CDN status
* notification status
* maps/analytics status
* RLS/security summary
* hidden contact summary
* performance/cache summary
* rollback summary
* backup summary
* known limitations
* open bugs
* final manual verification link
* approval fields:

  * name
  * role
  * date/time IST
  * decision
  * notes

Do not pre-fill approval as approved.

---

## 58. Docs Update Requirements

Update:

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

Also update or create if project already has:

```txt id="optional-final-docs"
FINAL_LAUNCH_CHECKLIST.md
FINAL_PROVIDER_TEST_MATRIX.md
FINAL_SIGNOFF_PACKAGE.md
FINAL_KNOWN_LIMITATIONS.md
```

Only create optional docs if it fits existing project docs structure and does not duplicate root docs unnecessarily.

Root docs remain the source of truth.

---

## 59. `API_PROVIDER_STATUS.md` Final Update

This is a main document for this phase.

Update final provider matrix:

```txt id="provider-matrix"
Provider/Service:
Purpose:
Environment:
Status:
Mode:
Required For Launch:
Keys Present:
Last Tested:
Test Result:
Webhook Tested:
Rate Limits:
Known Issues:
Setup Required:
Owner:
Next Step:
```

Include at least:

* Supabase Auth
* Supabase Database/RLS
* Supabase Storage/R2/CDN
* Razorpay
* OTP
* Email
* SMS
* WhatsApp
* Push
* Maps/geocoding
* Analytics/GSC
* Error monitoring
* Captcha/WAF
* Cron/jobs
* Malware scan
* Backup
* Hosting/deployment
* CDN/cache purge

No fake active status.

---

## 60. `MANUAL_VERIFICATION.md` Final Update

For implementation prompt, record:

* Prompt 15 implementation status
* manual verification pending:

  * `prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`
* provider/API tests prepared
* production/staging readiness checklist prepared
* smoke tests prepared
* final known limitations prepared
* final blockers prepared
* Super Admin signoff pending
* final manual verification required

Do not mark final PASS from implementation prompt alone.

---

## 61. `SECURITY_RLS_CHECKLIST.md` Final Update

Update with:

* final RLS test matrix
* final hidden contact scan checklist
* final service role/secret scan checklist
* final private sitemap/cache checklist
* final role/direct URL checklist
* final provider/payment/upload webhook checklist
* final fake data/test mode cleanup checklist
* final security blockers
* final setup-required items
* final signoff pending

---

## 62. `PERFORMANCE_CHECKLIST.md` Final Update

Update with:

* final Core Web Vitals measurement status
* final public route performance checklist
* final private route performance checklist
* final cache/no-store checklist
* final query/index checklist
* final media/CDN checklist
* final build gate checklist
* final browser/device checklist
* final load test status
* final performance blockers
* final setup-required items

---

## 63. `DEPLOYMENT_ROLLBACK.md` Final Update

Update with:

* final deployment checklist
* final pre-launch backup checklist
* final migration checklist
* final provider/env checklist
* final feature flag checklist
* final maintenance mode checklist
* final smoke test checklist
* final rollback checklist
* final cache/CDN purge checklist
* final payment webhook rollback notes
* final monitoring checklist
* final launch freeze checklist
* final Super Admin signoff pending

---

## 64. `FEATURE_REGISTRY.md` Final Update

Update feature statuses accurately:

* final provider test matrix
* final API smoke test matrix
* final role test matrix
* final RLS test matrix
* final hidden contact scan
* final fake data cleanup
* final test mode cleanup
* final deployment checklist
* final rollback checklist
* final launch freeze package
* final Super Admin signoff package
* final manual verification prompt
* production signoff

Do not mark production signoff `DONE` until actual final verification and Super Admin approval.

---

## 65. `CHANGELOG.md` Final Update

Add Prompt 15 entry:

* date
* summary
* changed files
* final test docs/checklists created/updated
* provider status updates
* launch readiness status
* commands run
* docs updated
* known limitations
* blockers
* manual verification pending
* rollback notes

---

## 66. `BUGS_AND_FIXES.md` Final Update

Create/update bugs for final blockers.

Possible bug IDs:

* `BUG-FINAL-BUILD-FAIL`
* `BUG-FINAL-TYPECHECK-FAIL`
* `BUG-FINAL-LINT-FAIL`
* `BUG-FINAL-PROVIDER-FAKE-ACTIVE`
* `BUG-FINAL-PAYMENT-FAKE-SUCCESS`
* `BUG-FINAL-OTP-FAKE-SUCCESS`
* `BUG-FINAL-SMS-FAKE-SUCCESS`
* `BUG-FINAL-WHATSAPP-FAKE-SUCCESS`
* `BUG-FINAL-EMAIL-FAKE-SUCCESS`
* `BUG-FINAL-MEDIA-FAKE-CDN`
* `BUG-FINAL-HIDDEN-CONTACT`
* `BUG-FINAL-PRIVATE-SITEMAP`
* `BUG-FINAL-PRIVATE-CACHE`
* `BUG-FINAL-RLS-MISSING`
* `BUG-FINAL-SERVICE-ROLE-CLIENT`
* `BUG-FINAL-SECRET-LEAK`
* `BUG-FINAL-TESTMODE-PRODUCTION`
* `BUG-FINAL-DEMO-DATA-PUBLIC`
* `BUG-FINAL-ROLLBACK-MISSING`
* `BUG-FINAL-BACKUP-MISSING`
* `BUG-FINAL-SIGNOFF-MISSING`
* `BUG-FINAL-LEGAL-PLACEHOLDER`
* `BUG-FINAL-SMOKE-FAIL`

Use existing bug ID convention if available.

---

## 67. `brain.md` Final Update

Update `brain.md`.

Include:

* Prompt 15 implementation summary
* changed files
* final provider/API readiness status
* final test matrix status
* final smoke checklist status
* final fake data cleanup status
* final RLS/security status
* final hidden contact status
* final cache/private sitemap status
* final build/check status
* final deployment/rollback status
* final known limitations
* final blockers
* final Super Admin signoff status:

  * pending unless explicit
* next prompt:

  * `prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`
* exact resume instruction

---

## 68. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
.env.example
package.json
src/lib/env/*
src/lib/config/*
src/lib/providers/*
src/lib/deployment/*
src/lib/feature-flags/*
src/lib/maintenance/*
src/app/api/health/*
src/app/api/webhooks/*
FEATURE_REGISTRY.md
CHANGELOG.md
BUGS_AND_FIXES.md
MANUAL_VERIFICATION.md
API_PROVIDER_STATUS.md
DEPLOYMENT_ROLLBACK.md
SECURITY_RLS_CHECKLIST.md
PERFORMANCE_CHECKLIST.md
brain.md
FINAL_LAUNCH_CHECKLIST.md
FINAL_PROVIDER_TEST_MATRIX.md
FINAL_SIGNOFF_PACKAGE.md
FINAL_KNOWN_LIMITATIONS.md
```

Actual paths may differ.

Only change needed files.

---

## 69. SQL Migration Rule

This phase should avoid DB changes unless necessary.

If DB changes are needed, create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_final_production_api_testing_and_signoff.sql
```

Migration must include:

* purpose
* phase: Prompt 15
* tables/views/indexes created/changed
* RLS policies created/changed
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

No destructive DB change unless approved and backed up.

---

## 70. Commands / Checks To Run

Run available:

```txt id="required-checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

```txt id="optional-final-checks"
npm run test:e2e
npm run test:security
npm run test:rls
npm run test:performance
npm run analyze
npm run lighthouse
npm audit
pnpm audit
```

If scripts missing, document `NOT_CONFIGURED`.

If commands fail, fix safe issues if in scope or mark `BLOCKED`/`NOT_READY`.

Do not fake command results.

---

## 71. Final Manual Smoke Checks If App Runs

If app can run, perform or prepare exact final smoke checks.

Minimum:

* home loads
* search loads
* property detail loads
* project detail loads
* login/register popup works
* public hidden contact absent
* owner dashboard loads
* broker dashboard loads
* builder dashboard loads
* admin login loads
* admin dashboard loads
* wrong role denied
* private direct URL denied
* media public images load
* private signed URL denied to wrong user
* payment checkout status correct
* notifications load
* provider status accurate
* public ad status correct
* sitemap/robots safe
* no private page in sitemap
* no private public cache
* build passes

Document exact results.

Full verification happens in matching manual prompt.

---

## 72. Production Readiness Decision Rules

Use these rules.

### `READY_FOR_FINAL_VERIFICATION`

Use when:

* Prompt 15 readiness package created/updated
* final checklists prepared
* provider statuses honest
* build/checks run or documented
* no known critical blocker from implementation pass
* final manual verification pending
* Super Admin signoff pending

### `READY_FOR_SUPER_ADMIN_REVIEW`

Use only if:

* final manual verification already passed
* all critical checks passed
* no launch blockers
* provider statuses acceptable
* known limitations documented
* Super Admin approval still pending

Usually not used by implementation prompt alone.

### `PRODUCTION_READY_AFTER_SIGNOFF`

Use only if:

* final manual verification passed
* Super Admin explicitly approved
* launch blockers closed
* provider statuses accepted
* rollback/backup accepted
* final signoff documented

Do not invent this status.

### `PARTIAL_ACCEPTANCE_REQUIRED`

Use if:

* some providers setup-required
* some non-critical checks unavailable
* load test missing
* external audit missing
* monitoring provider missing
* browser matrix incomplete
* legal review pending
* user/Super Admin must accept risk before launch

### `SETUP_REQUIRED`

Use if:

* required credentials missing
* production env missing
* provider setup missing
* hosting missing
* staging missing
* test data/admin users unavailable
* final provider tests cannot run

### `BLOCKED`

Use if:

* build fails
* critical security/privacy issue exists
* hidden contact leak
* fake provider/payment/OTP success
* RLS missing
* private cache/sitemap issue
* rollback missing
* provider secret leak
* service role client exposure
* payment webhook unsafe
* Super Admin signoff impossible due to blockers

### `NOT_READY`

Use if:

* readiness package incomplete
* major docs missing
* test matrix missing
* launch blockers not classified

---

## 73. Final Response Required Format

Return final response in this structure:

```txt id="prompt-15-final-response-format"
Summary:
- what final production API testing/signoff readiness package was prepared

Changed files:
- path list

SQL migrations:
- path list or none

Final provider/API status:
- Supabase Auth:
- Supabase Database/RLS:
- Storage/R2/CDN:
- Razorpay:
- OTP:
- Email:
- SMS:
- WhatsApp:
- Push:
- Maps/geocoding:
- Analytics/GSC:
- Error monitoring:
- Captcha/WAF:
- Cron/jobs:
- Malware scan:
- Backup:
- Hosting/deployment:

Final test matrices prepared:
- route smoke:
- API smoke:
- role matrix:
- RLS matrix:
- hidden contact:
- sitemap/robots:
- private cache:
- provider tests:
- payment tests:
- media tests:
- notification tests:
- ads tests:
- CMS/legal/SEO:
- support/grievance/privacy:
- browser/device:
- performance:
- security regression:

Fake/demo/test cleanup:
- mock/fake data:
- test mode:
- dev OTP:
- fake provider success:
- fake payment:
- seed/demo data:

Launch readiness:
- env validation:
- feature flags:
- maintenance mode:
- deployment checklist:
- rollback checklist:
- backup checklist:
- launch freeze:
- Super Admin package:
- known limitations:
- blockers:

Security retained:
- RLS:
- hidden contact:
- service role:
- provider secrets:
- private sitemap:
- private cache:
- payment webhook:
- provider webhooks:

Commands/checks run:
- command: result

Docs updated:
- path list

Issues found:
- bug IDs or none

Final readiness status:
- NOT_READY / READY_FOR_FINAL_VERIFICATION / READY_FOR_SUPER_ADMIN_REVIEW / PARTIAL_ACCEPTANCE_REQUIRED / BLOCKED / SETUP_REQUIRED / PRODUCTION_READY_AFTER_SIGNOFF
- reason:

Manual verification:
- pending prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md

Next step:
- run prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
```

Do not say only “done”.

Do not claim production ready unless final verification and explicit Super Admin signoff are complete.

---

## 74. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
```

This is the final manual verification prompt.

No further prompt phase should start after Prompt 15 verification.

---

## 75. Common Bugs To Watch For

Create/track bugs for:

* `BUG-FINAL-BUILD-FAIL`
* `BUG-FINAL-TYPECHECK-FAIL`
* `BUG-FINAL-LINT-FAIL`
* `BUG-FINAL-PROVIDER-FAKE-ACTIVE`
* `BUG-FINAL-PAYMENT-FAKE-SUCCESS`
* `BUG-FINAL-OTP-FAKE-SUCCESS`
* `BUG-FINAL-SMS-FAKE-SUCCESS`
* `BUG-FINAL-WHATSAPP-FAKE-SUCCESS`
* `BUG-FINAL-EMAIL-FAKE-SUCCESS`
* `BUG-FINAL-MEDIA-FAKE-CDN`
* `BUG-FINAL-HIDDEN-CONTACT`
* `BUG-FINAL-PRIVATE-SITEMAP`
* `BUG-FINAL-PRIVATE-CACHE`
* `BUG-FINAL-RLS-MISSING`
* `BUG-FINAL-SERVICE-ROLE-CLIENT`
* `BUG-FINAL-SECRET-LEAK`
* `BUG-FINAL-TESTMODE-PRODUCTION`
* `BUG-FINAL-DEMO-DATA-PUBLIC`
* `BUG-FINAL-ROLLBACK-MISSING`
* `BUG-FINAL-BACKUP-MISSING`
* `BUG-FINAL-SIGNOFF-MISSING`
* `BUG-FINAL-LEGAL-PLACEHOLDER`
* `BUG-FINAL-SMOKE-FAIL`
* `BUG-FINAL-WEBHOOK-UNSAFE`
* `BUG-FINAL-PROVIDER-SETUP-MISSING`
* `BUG-FINAL-SUPER-ADMIN-PENDING`

Use existing bug ID convention if available.

---

## 76. Quality Bar

This phase is successful when final manual verification can proceed with:

* complete provider/API test matrix
* honest provider statuses
* no fake active providers
* no fake payment/OTP/SMS/WhatsApp/email/media success
* final route smoke checklist
* final API smoke checklist
* final role matrix
* final RLS matrix
* final hidden contact checklist
* final fake data cleanup checklist
* final private sitemap/cache checklist
* final deployment checklist
* final rollback checklist
* final launch freeze checklist
* final Super Admin signoff package
* known limitations documented
* blockers documented
* docs updated
* manual verification ready

---

## 77. Final Rule For Prompt 15

Prepare final production testing honestly.

Prepare final provider testing honestly.

Prepare final signoff package honestly.

Use real statuses.

Use setup-required where credentials/providers/tests are missing.

Do not fake provider success.

Do not fake payment success.

Do not fake OTP delivery.

Do not fake SMS delivery.

Do not fake WhatsApp delivery.

Do not fake email delivery.

Do not fake media/CDN success.

Do not fake monitoring.

Do not fake build success.

Do not fake RLS/security pass.

Do not fake rollback readiness.

Do not fake Super Admin signoff.

Do not mark production ready without final manual verification and explicit Super Admin approval.

Do not hide blockers.

Do not skip docs.

Do not skip checks.

Do not skip final manual verification.

No fake PASS.
