# prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md

# My Gujarat Property — Prompt 15 Manual Verification: Final Production API Testing And Signoff

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
```

This is the final manual verification prompt for the complete My Gujarat Property project prompt pack.

Do not skip this verification.

Do not mark final production readiness without real verification.

Do not mark Super Admin signoff without explicit Super Admin/project owner approval.

Do not fake provider/API test success.

Do not fake payment success.

Do not fake OTP delivery.

Do not fake email/SMS/WhatsApp delivery.

Do not fake media/CDN success.

Do not fake RLS/security pass.

Do not fake launch readiness.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
Prompt Number: 15 Verification
Phase: Final Production API Testing And Signoff
Type: Final Manual Verification Prompt
Matching Implementation Prompt: prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
Previous Prompt: prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
Next Prompt: None
```

This is the final prompt in the 57-file pack.

There is no next implementation phase after this prompt.

---

## 2. Final Verification Purpose

The purpose of this final verification is to decide whether the My Gujarat Property platform is:

* not ready,
* ready for final Super Admin review,
* partially acceptable with documented risks,
* blocked,
* setup-required, or
* production-ready only after explicit Super Admin signoff.

This verification checks:

* all implementation phases completed
* all manual verification phases completed or accepted
* final provider/API status
* final Supabase Auth status
* final Supabase Database/RLS status
* final storage/R2/CDN status
* final Razorpay/payment/webhook status
* final GST/invoice status
* final OTP provider status
* final email/SMS/WhatsApp/push provider status
* final maps/geocoding status
* final analytics/GSC status
* final captcha/WAF status
* final cron/jobs status
* final malware scan status
* final backup/restore status
* final hosting/deployment status
* final route smoke tests
* final API smoke tests
* final role matrix
* final RLS test matrix
* final hidden contact scan
* final private sitemap/robots scan
* final private cache/no-store checks
* final fake/mock/demo/test-mode cleanup
* final security regression
* final performance regression
* final payment journey
* final media journey
* final lead/CRM/message journey
* final ads/notification journey
* final CMS/SEO/legal journey
* final support/grievance/privacy journey
* final build/lint/type/test gates
* final browser/device matrix
* final rollback drill plan
* final backup drill plan
* final launch freeze package
* final known limitations
* final blockers
* final Super Admin signoff package

This final verification must be honest.

---

## 3. Required Docs To Read First

Before final verification, read:

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
prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
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

Also inspect optional final docs if they exist:

```txt id="optional-final-docs"
FINAL_LAUNCH_CHECKLIST.md
FINAL_PROVIDER_TEST_MATRIX.md
FINAL_SIGNOFF_PACKAGE.md
FINAL_KNOWN_LIMITATIONS.md
```

Do not paste full docs into final response.

---

## 4. Final Verification Scope

This final verification covers:

* final project readiness
* final provider/API status
* final route/API smoke checks
* final role permission checks
* final RLS checks
* final hidden contact checks
* final private cache/sitemap checks
* final payment/OTP/media/notification/provider checks
* final fake/test/demo cleanup checks
* final build/test gates
* final security/performance regression checks
* final deployment/rollback/backup readiness
* final launch freeze review
* final Super Admin signoff readiness

This final verification does not automatically:

* purchase provider services
* obtain legal approval
* approve production launch without owner/Super Admin
* perform real live payments unless safe and approved
* perform external security audit
* perform full 1 lakh-user load test
* configure missing provider credentials

Missing items must be marked honestly.

---

## 5. Final Verification Method

Use this process:

1. read all required docs
2. inspect Prompt 15 implementation changes
3. inspect final provider status matrix
4. inspect final API test matrix
5. inspect final role matrix
6. inspect final RLS matrix
7. inspect final hidden contact checklist
8. inspect final private sitemap/cache checklist
9. inspect final fake/demo/test cleanup checklist
10. inspect build/deployment/rollback docs
11. inspect final signoff package
12. run build/lint/type/test commands where available
13. run provider/API tests only where safe/configured
14. run route smoke tests where app can run
15. run security regression checks
16. run performance regression checks where possible
17. run browser/responsive checks where possible
18. update all root docs
19. create/update bugs for blockers
20. decide final result
21. update `brain.md`
22. produce final verification response

Do not skip any category.

If a test cannot run, mark it `SETUP_REQUIRED`, `NOT_CONFIGURED`, `NOT_AVAILABLE`, or `BLOCKED`.

Do not mark skipped tests PASS.

---

## 6. Required File Inspection

Inspect:

```txt id="file-inspection"
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

Inspect docs:

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
FINAL_LAUNCH_CHECKLIST.md
FINAL_PROVIDER_TEST_MATRIX.md
FINAL_SIGNOFF_PACKAGE.md
FINAL_KNOWN_LIMITATIONS.md
```

Record exact changed and checked files.

---

## 7. Final Provider Status Verification

Verify `API_PROVIDER_STATUS.md` contains final matrix for:

```txt id="provider-list"
Supabase Auth
Supabase Database/RLS
Supabase Storage
Cloudflare R2
CDN/cache purge
Razorpay
OTP provider
Email provider
SMS provider
WhatsApp provider
Push/PWA provider
Google Maps/geocoding
Analytics/GSC
Error monitoring
Captcha/WAF
Cron/jobs
Malware scanner
Backup provider
Hosting/deployment
```

Each provider row must include:

```txt id="provider-row-fields"
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

Allowed statuses:

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

Rules:

* `ACTIVE` requires real successful provider test.
* `TEST_MODE` must not be confused with production active.
* `SETUP_REQUIRED` must list missing credential/config/test.
* `DISABLED` must be behind safe feature flag.
* no provider secrets in docs.
* no fake active status.

If provider status is missing or fake:

* create/update bug
* mark final result `PARTIAL_ACCEPTANCE_REQUIRED`, `SETUP_REQUIRED`, `BLOCKED`, or `NOT_READY` depending severity

---

## 8. Supabase Auth Final Verification

Verify:

* Supabase Auth configured
* public mobile OTP login/register flow status
* non-registered mobile register prompt
* Owner/Broker/Builder registration roles
* full name/email/phone capture
* OTP confirm
* redirect to original action/home
* login/register hidden after login
* logout works
* disabled/suspended/deleted users handled
* admin login separate
* public mobile OTP not used for admin login
* session expiry status documented
* provider status honest

Result values:

```txt id="auth-result-values"
PASS
PARTIAL
SETUP_REQUIRED
FAILED
BLOCKED
NOT_TESTED
```

If production OTP delivery is not tested, do not mark full auth production PASS.

---

## 9. Supabase Database / RLS Final Verification

Verify:

* all migrations applied or documented
* schema current
* RLS enabled on private tables
* RLS policies reviewed
* public-safe views expose safe fields only
* wrong-user access denied
* participant-only data protected
* admin/staff permission scoped
* service role server-only
* indexes reviewed
* backup/restore status documented
* provider status honest

Private table categories:

```txt id="private-table-categories"
profiles
roles_permissions
properties_projects_requirements_private_states
leads_crm_proposals_messages_site_visits
billing_payments_invoices_gst
media_private_metadata
notifications_preferences
ads_private_campaigns
provider_configs_logs
cms_drafts_legal_versions_consents
support_grievance_privacy_requests
audit_fraud_security_tables
```

If RLS is missing on any private table:

* create critical bug
* final result cannot be production ready

---

## 10. RLS Final Test Matrix

Run or prepare final RLS tests:

```txt id="rls-final-matrix"
1. Guest cannot read private profiles fields.
2. Guest can read only public-safe listing view.
3. Owner A cannot read Owner B draft property.
4. Broker A cannot read Broker B private CRM data.
5. Builder A cannot read Builder B draft project.
6. User A cannot read User B lead.
7. Non-participant cannot read message thread.
8. User A cannot read User B invoice.
9. User A cannot read User B notification.
10. Builder A cannot read Builder B ad campaign.
11. Public cannot read provider logs/config.
12. Public cannot read private media metadata.
13. Public cannot read CMS drafts.
14. Public cannot read consent records.
15. Staff without billing permission cannot read payment data.
16. Staff without provider permission cannot read provider logs.
17. Staff without legal permission cannot publish legal page.
18. Admin permissions work only where allowed.
19. Service role is not used in client.
20. Public active ads view returns only safe active ads.
```

For each, record:

* expected
* actual
* result
* evidence/source
* issue ID if failed

Do not mark RLS final PASS without actual evidence or accepted setup-required status.

---

## 11. Storage / R2 / CDN Final Verification

Verify:

* public image upload works or setup-required
* private document upload works or setup-required
* media variants created or setup-required
* public media loads from public-safe URL
* private media requires signed URL
* wrong user denied private media
* CDN URL works if configured
* cache headers safe
* image variants correct
* ad creatives public-safe
* project video if enabled
* brochure PDF access rules
* orphan cleanup status
* malware scan status
* no fake CDN success

If private media is public:

* create critical bug
* final result `BLOCKED`

If R2/CDN keys missing:

* mark provider `SETUP_REQUIRED` or `PARTIAL`

---

## 12. Razorpay Final Verification

Verify:

* Razorpay keys status honest
* public key client-only
* secret key server-only
* webhook secret server-only
* checkout order creation works or setup-required
* server-side price/plan calculation
* client price not trusted
* payment callback does not activate subscription
* webhook signature verification
* webhook idempotency
* amount/currency verification
* payment success activates subscription only after verified webhook
* invoice created only after verified payment
* invoice sequence correct
* failed/pending states correct
* refund/credit note status honest
* admin billing permission-scoped
* no fake payment success

If payment success can be faked from client:

* create critical bug
* final result `BLOCKED`

If live/test payment not performed:

* mark `TEST_MODE`, `SETUP_REQUIRED`, `PARTIAL`, or `NOT_TESTED` honestly

---

## 13. GST / Invoice Final Verification

Verify:

* GST profile optional
* B2B/B2C status
* CGST/SGST/IGST logic if implemented
* setup-required if tax rules incomplete
* invoice generated only after verified payment
* invoice number immutable
* FY sequence format:

  * `MGP-26-27-0001`
* duplicate invoice prevention
* own-user invoice access
* wrong user invoice denied
* invoice PDF/email status honest
* refund/credit note status honest
* no fake invoice

If duplicate invoice numbers possible:

* create bug
* final result cannot be clean PASS

---

## 14. OTP Provider Final Verification

Verify:

* OTP provider configured or setup-required
* real OTP send test in selected environment if allowed
* OTP verify works
* resend delay
* per phone/IP/session limits
* verify attempt limits
* cost guard
* logs redacted
* dev/test OTP disabled in production
* admin not using public OTP
* provider status updated
* no fake OTP delivery

If production uses dev OTP bypass:

* create critical bug
* final result `BLOCKED`

---

## 15. Email Provider Final Verification

Verify:

* provider configured or setup-required
* sender/from configured
* test email sent if enabled
* transactional template works if enabled
* invoice email status
* support reply email status
* delivery logs real
* bounce/failure handling status
* unsubscribe/marketing rules if marketing enabled
* no hidden contact leak
* no secrets in logs/client
* provider status updated
* no fake email sent

If external email missing:

* in-app notification may still pass
* email provider marked `SETUP_REQUIRED`

---

## 16. SMS Provider Final Verification

Verify:

* provider configured or setup-required
* DLT/template status documented if required
* test SMS sent if enabled
* delivery logs real
* rate/cost control
* opt-in/transactional rules
* OTP/SMS distinction
* no hidden contact leak
* no secrets in logs/client
* provider status updated
* no fake SMS sent

If UI/log says SMS sent without provider test:

* create bug
* final result cannot be clean PASS

---

## 17. WhatsApp Provider Final Verification

Verify:

* WhatsApp Business Cloud API configured or setup-required
* API token server-only
* verify token server-only
* templates approved/setup-required
* user opt-in where needed
* test WhatsApp sent if enabled
* webhook/callback status
* delivery log real
* wa.me fallback not marked API delivery
* no hidden contact leak
* no secrets in logs/client
* provider status updated
* no fake WhatsApp sent

If only wa.me fallback exists:

* mark WhatsApp API as `PARTIAL`, `SETUP_REQUIRED`, or `DISABLED`, not `ACTIVE`

---

## 18. Push / PWA Final Verification

If push/PWA implemented, verify:

* service worker status
* push subscription private/RLS
* VAPID keys separated
* permission prompt safe
* push test sent if enabled
* no private lockscreen payload
* preferences respected
* offline/PWA status honest
* provider status updated
* no fake push success

If not implemented:

* mark `NOT_STARTED`, `DISABLED`, or `SETUP_REQUIRED`

---

## 19. Maps / Geocoding Final Verification

Verify:

* provider configured or setup-required
* public map/embed status
* geocoding status
* IP city fallback status
* nearby fallback status
* exact private address protected
* map API key restricted
* no fake geolocation
* provider status updated

If maps/geocoding not configured:

* mark `SETUP_REQUIRED` or `PARTIAL`
* do not fake map/geocoding active

---

## 20. Analytics / GSC Final Verification

Verify:

* analytics provider status
* GSC status
* sitemap submission status
* public page tracking only where allowed
* cookie consent respected
* hidden contact not in events
* private admin/dashboard data not tracked with sensitive fields
* no fake traffic metrics
* provider status updated

If analytics not configured:

* mark `SETUP_REQUIRED`, `DISABLED`, or `NOT_STARTED`

---

## 21. Error Monitoring Final Verification

Verify:

* provider configured or setup-required
* client/server error capture if enabled
* release/version tag
* source map policy
* PII redaction
* no hidden contact
* no provider secrets
* webhook/payment/provider errors captured safely if enabled
* no fake monitoring active

If monitoring not configured:

* mark `SETUP_REQUIRED` or `NOT_STARTED`

---

## 22. Captcha / WAF / Abuse Protection Final Verification

Verify:

* Captcha/Turnstile status
* WAF/CDN protection status
* OTP/login abuse protection
* inquiry/contact/message spam limits
* upload abuse limits
* provider test send limits
* ad click/impression limits
* scraping controls
* suspicious activity logs
* no fake bot protection

If WAF/captcha missing but app-level rate limits exist:

* mark `PARTIAL` or `SETUP_REQUIRED`

If critical public abuse endpoint is unlimited:

* create bug
* final result may be `PARTIAL_ACCEPTANCE_REQUIRED` or `BLOCKED`

---

## 23. Cron / Jobs Final Verification

Verify jobs status:

* expired ads
* subscription/trial expiry
* notification digest/retry
* provider retry/DLQ
* media orphan cleanup
* sitemap generation/revalidation
* retention cleanup
* backup job
* status documented
* no fake cron success

If cron not configured:

* mark `SETUP_REQUIRED` or `PARTIAL`

If business-critical expiry depends on cron and cron missing:

* final result cannot be clean PASS

---

## 24. Malware Scan Final Verification

Verify:

* scanner provider status
* uploaded file scan status
* SVG/PDF/video fallback
* quarantine behavior if implemented
* admin review if implemented
* private file protection
* no fake malware scan pass

If scanner missing:

* mark `SETUP_REQUIRED`
* verify file validation and SVG/PDF safety fallback still exist

---

## 25. Backup / Restore Final Verification

Verify:

* DB backup status
* storage/R2 backup/lifecycle status
* backup schedule
* restore test status
* RPO/RTO documented
* pre-launch backup requirement
* destructive migration backup requirement
* invoice/payment/audit retention
* backup owner
* setup-required items

If restore not tested:

* mark `RESTORE_TEST_REQUIRED` or `PARTIAL`
* do not mark backup fully tested

If backup missing for production launch:

* final result may require `PARTIAL_ACCEPTANCE_REQUIRED`, `SETUP_REQUIRED`, or `BLOCKED`

---

## 26. Hosting / Deployment Final Verification

Verify:

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
* no fake deployment

If hosting/production env missing:

* final result `SETUP_REQUIRED`

---

## 27. Environment Variable Final Verification

Verify `.env.example` and env validation cover:

* Supabase URL/anon key
* Supabase service role server-only
* site URL
* app environment
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

* no real secrets in repo/docs.
* server secrets not prefixed public.
* missing required production env blocks readiness.
* optional missing providers setup-required.
* public vars safe.

If real secret found:

* do not print it
* create critical bug
* recommend rotation
* final result `BLOCKED`

---

## 28. Feature Flag Final Verification

Verify feature flags:

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

Check:

* incomplete providers disabled
* payment checkout disabled unless payment verified
* public ads disabled unless gates verified
* provider test sends admin-only
* security-sensitive flags server-side
* production defaults safe
* flags documented

If unsafe flag lets client enable provider/payment/security behavior:

* create critical bug
* final result `BLOCKED`

---

## 29. Fake / Mock / Demo Data Final Verification

Search for:

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

Verify:

* dev/test fixtures only in dev/test paths
* production UI has no fake data as real
* no fake counts
* no fake payment success
* no fake provider delivery
* no fake verified/RERA
* no fake leads/views/analytics
* seed/demo data guarded
* legal/provider placeholders honest

If fake/demo data appears production-visible:

* create critical bug
* final result `BLOCKED` or `NOT_READY`

---

## 30. Test Mode Cleanup Verification

Verify production does not have active:

* dev OTP bypass
* Razorpay test mode labelled as live
* mock payment success
* mock email active
* mock SMS active
* mock WhatsApp active
* mock push active
* mock CDN active
* mock analytics active
* fake notifications
* fake ads
* fake lead/view analytics
* test admin credentials
* public debug routes
* verbose debug logs
* seed users exposed

If test mode remains active in production without label/flag:

* create critical bug
* final result `BLOCKED`

---

## 31. Final Route Smoke Verification

Smoke public routes if app can run.

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

Check:

* loads
* no raw error
* no private data
* no hidden contact
* metadata safe
* mobile safe
* public cache safe

Use actual route names.

Smoke private routes:

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

Check:

* guest denied
* wrong role denied
* authorized user allowed
* private no-store
* no metadata leak
* no public cache

If app cannot run:

* mark route smoke `SETUP_REQUIRED` or `BLOCKED`

---

## 32. Final API Smoke Verification

Smoke APIs/actions where safe:

```txt id="api-smoke-checks"
public search API
public detail API/view
auth status
OTP send/verify
media upload session
public media load
signed private media wrong-user denial
payment order creation
Razorpay webhook test
invoice creation after webhook
notification unread count
mark notification read
public ad placement
ad click redirect safe
contact request
inquiry create
message send
proposal send
site visit request
admin moderation action
provider status API
health endpoint
sitemap/robots
```

Rules:

* do not call live paid provider APIs unless safe/approved.
* record skipped/setup-required checks.
* no fake pass.
* no real user data leak.
* no real payment unless explicitly approved.

---

## 33. Final Role Matrix Verification

Verify role behavior:

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
* can manage project leads/matching requirements/proposals
* can create ads only for own published projects if enabled
* cannot post property
* cannot see other builder private data

### Admin/Staff

* separate login
* permission-scoped
* no public mobile OTP admin login
* no self-grant
* sensitive actions audited

### Super Admin

* provider/security/payment/system controls
* high-risk actions audited
* final signoff authority

If wrong role can access forbidden feature:

* create critical bug
* final result cannot be production ready

---

## 34. Hidden Contact Final Verification

Search public surfaces for hidden contact.

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

* no hidden contact public
* contact reveal only authorized
* hidden contact not in SEO/schema/sitemap
* hidden contact not in public logs/provider payloads

If hidden contact leaks:

* create critical bug
* final result `BLOCKED`

---

## 35. Private Sitemap / Robots Final Verification

Verify sitemap:

* public indexable URLs only
* no dashboard/admin/auth/private URLs
* no leads/messages/billing/notifications/provider URLs
* no private media URLs
* no draft/pending/rejected/deleted listings
* no hidden contact
* lastmod real or omitted
* bounded generation
* empty/thin pages noindex

Verify robots:

* blocks private routes
* sitemap link correct
* no accidental block of important public pages
* no security reliance only on robots

If private URL appears in sitemap:

* create critical bug
* final result `BLOCKED`

---

## 36. Private Cache Final Verification

Verify:

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
* private data not in CDN cache

If private data is publicly cached:

* create critical bug
* final result `BLOCKED`

---

## 37. Security Header Final Verification

Verify headers:

* CSP or CSP report-only status
* X-Frame-Options or frame-ancestors
* X-Content-Type-Options
* Referrer-Policy
* Permissions-Policy
* HSTS production status
* COOP/CORP where safe
* admin framing protection
* payment/maps/media domains allowlisted where configured
* no unsafe broad CSP without reason

If headers cannot be checked:

* mark `SETUP_REQUIRED` or `PARTIAL`

If admin can be framed or security headers dangerously absent:

* create bug
* result may be `PARTIAL_ACCEPTANCE_REQUIRED` or `BLOCKED`

---

## 38. Build / Type / Lint / Test Final Verification

Run:

```txt id="required-checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, run:

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
* failing tests must be documented with severity.
* missing scripts are `NOT_CONFIGURED`, not PASS.
* do not fake command results.

If build fails:

* create `BUG-FINAL-BUILD-FAIL`
* final result `BLOCKED`

---

## 39. Browser / Device Final Verification

Test or record status for:

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

## 40. Final Guest Journey Verification

Verify:

* open home
* select city/search
* view property detail
* view project detail
* view public profile
* contact hidden
* click inquiry
* auth popup opens
* login/register flow starts
* return to original action after login if implemented
* no hidden contact in HTML/API
* no private route access

If guest can see hidden contact without authorized reveal:

* create critical bug
* final result `BLOCKED`

---

## 41. Final Owner Journey Verification

Verify:

* owner register/login
* owner dashboard loads
* owner can post property if plan/gate allows
* owner can post requirement if plan/gate allows
* owner cannot post project
* submit for approval
* edit own drafts
* view own leads/messages/notifications
* billing gate behavior correct
* logout works
* wrong owner data denied

If owner can post project:

* create bug
* final result cannot be clean PASS

---

## 42. Final Broker Journey Verification

Verify:

* broker register/login
* broker dashboard loads
* broker can post property/requirement if plan/gate allows
* broker cannot post project
* CRM lead flow
* proposal flow
* message flow
* site visit flow
* billing gate behavior
* notifications
* logout
* wrong broker data denied

If broker can access another broker private CRM:

* create critical bug
* final result `BLOCKED`

---

## 43. Final Builder Journey Verification

Verify:

* builder register/login
* builder dashboard loads
* builder can post only projects if plan/gate allows
* builder cannot post property
* project approval flow
* project leads/matching requirements
* proposal/message/site visit flow
* create ad campaign if enabled
* ad gate/payment/RERA status correct
* notifications
* billing
* logout
* wrong builder data denied

If builder can post property or access other builder private project/campaign:

* create bug
* final result cannot be production ready

---

## 44. Final Admin / Staff Journey Verification

Verify:

* admin/staff separate login
* no mobile OTP public admin login
* permission-scoped modules
* moderation queue
* approve/reject/request changes
* review ad
* manage CMS/legal/provider by permission
* no self-grant
* provider secrets masked
* audit logs high-risk actions
* disabled staff denied
* public users denied admin

If public admin access exists:

* create critical bug
* final result `BLOCKED`

---

## 45. Final Super Admin Journey Verification

Verify Super Admin can review:

* provider status
* feature flags
* billing plans
* staff permissions
* security checklist
* performance checklist
* deployment rollback
* launch freeze package
* known limitations
* blockers
* final manual verification result
* signoff package

Do not pre-fill signoff approval.

Super Admin signoff must be explicit.

---

## 46. Final Payment Journey Verification

Verify:

* pricing page
* role-specific plans
* active plan gate
* trial start if enabled
* coupon apply if enabled
* checkout order creation
* Razorpay checkout test/safe status
* payment success/fail/pending states
* verified webhook activates subscription
* invoice generated after webhook
* invoice visible in dashboard
* wrong user invoice denied
* posting unlock after verified payment
* refund/credit note status honest
* no fake payment

If payment success occurs without verified webhook:

* create critical bug
* final result `BLOCKED`

---

## 47. Final Media Journey Verification

Verify:

* upload property images
* reorder/crop/cover if implemented
* submit listing
* public detail shows optimized variants
* upload project images/video if enabled
* upload brochure PDF if role allows
* private docs require permission
* wrong user denied
* public search uses thumbnail
* gallery works mobile
* deleted media removed or cache expires safely
* CDN/cache status correct
* no fake processing

If private media public:

* create critical bug
* final result `BLOCKED`

---

## 48. Final Lead / CRM / Message Journey Verification

Verify:

* guest inquiry triggers auth
* logged-in inquiry creates real lead
* duplicate inquiry prevented
* recipient notified
* CRM stage changes
* notes/followups private
* proposal sent/viewed/accepted/rejected
* message thread participant-only
* site visit requested/scheduled/rescheduled/cancelled
* hidden contact reveal authorized only
* wrong user denied

If wrong user can access lead/message/proposal/site visit:

* create critical bug
* final result `BLOCKED`

---

## 49. Final Ads / Notification Journey Verification

Verify:

* builder selects own published project
* campaign created draft/submitted
* admin reviews
* approval blocked if project/payment/RERA gate fails
* approved/active campaign appears public with Sponsored label
* pending/rejected/expired campaign not public
* impressions/click metrics real or no-data
* notification created for ad status
* unread count real
* mark read works
* external provider delivery setup/real status honest
* no fake notifications/provider delivery

If public ad appears without Sponsored label:

* create bug
* final result cannot be clean PASS

If fake notification unread count exists:

* create bug
* final result cannot be clean PASS

---

## 50. Final CMS / SEO / Legal Journey Verification

Verify:

* published CMS/legal page loads
* draft page not public
* legal placeholder not marked final
* blog published page loads if enabled
* sitemap public only
* canonical correct
* noindex empty/thin pages
* schema no fake reviews/counts/contact
* footer legal links work
* redirect manager safe
* open redirect blocked
* privacy/terms/cookie/refund/cancellation/disclaimer/grievance pages status honest

If legal placeholder marked final:

* create bug
* final result cannot be clean PASS

---

## 51. Final Support / Grievance / Privacy Journey Verification

Verify:

* support/help pages load
* grievance page status accurate
* takedown/copyright status accurate
* privacy request foundation status accurate
* support form stores request or setup-required
* no fake submission success
* request private/RLS protected
* admin/staff permission-scoped
* notifications/provider status honest

If support/grievance form shows success without storing or setup-required:

* create bug
* final result `PARTIAL_ACCEPTANCE_REQUIRED` or `BLOCKED`

---

## 52. Final Security Regression Verification

Verify:

* public admin denied
* wrong role denied
* wrong user private data denied
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
* rate limits/fraud foundation status honest

If any critical security issue exists:

* final result `BLOCKED`

---

## 53. Final Performance Regression Verification

Verify:

* home performance foundation
* search paginated
* detail pages no severe N+1
* dashboard lists paginated
* admin queues paginated
* notification count efficient
* ad serving efficient
* images optimized
* public cache safe
* private no-store safe
* bundle status reviewed
* load test status honest
* no fake Core Web Vitals

If performance runtime tests unavailable:

* mark `PARTIAL_ACCEPTANCE_REQUIRED` or `SETUP_REQUIRED`
* do not fake numbers

---

## 54. Final Rollback Drill Verification

Verify rollback checklist:

* deployed version identified
* code rollback process
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

If rollback not tested:

* mark `NOT_TESTED`
* do not fake rollback tested

If rollback plan missing:

* create bug
* final result `BLOCKED` or `PARTIAL_ACCEPTANCE_REQUIRED`

---

## 55. Final Backup Drill Verification

Verify:

* latest DB backup status
* latest storage backup/lifecycle status
* invoice/payment/audit retention
* restore test status
* pre-launch backup requirement
* destructive migration backup requirement
* RPO/RTO documented
* backup owner
* setup-required items

If restore not tested:

* mark `RESTORE_TEST_REQUIRED`

If backup plan missing before production:

* final result cannot be clean PASS

---

## 56. Final Launch Freeze Package Verification

Verify launch freeze package includes:

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
* final manual verification result
* Super Admin signoff pending/approved

If launch freeze package missing:

* update docs
* final result `NOT_READY`

---

## 57. Final Known Limitations Verification

Verify known limitations include:

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

Known limitations must be honest.

If known limitations are hidden:

* create bug
* final result cannot be clean PASS

---

## 58. Final Launch Blocker Verification

Classify blockers.

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

Document each blocker with bug ID, severity and next step.

---

## 59. Final Signoff Package Verification

Verify final signoff package includes:

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
* final manual verification result
* approval fields:

  * name
  * role
  * date/time IST
  * decision
  * notes

Do not pre-fill approval as approved unless explicit Super Admin signoff exists.

---

## 60. Super Admin Signoff Verification

Super Admin signoff requires explicit approval.

Valid signoff evidence may include:

* signed final checklist
* written project owner/Super Admin approval
* admin UI signoff record if implemented
* documented decision in `FINAL_SIGNOFF_PACKAGE.md` or `MANUAL_VERIFICATION.md`

Signoff must include:

* approver name
* role
* date/time IST
* decision
* accepted limitations
* launch decision
* notes

No assistant or Claude Code can invent this.

If Super Admin signoff missing:

* production can be `READY_FOR_SUPER_ADMIN_REVIEW`
* not `PRODUCTION_READY_AFTER_SIGNOFF`

---

## 61. Documentation Update Verification

Verify docs updated:

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

Optional final docs if used:

```txt id="optional-final-docs"
FINAL_LAUNCH_CHECKLIST.md
FINAL_PROVIDER_TEST_MATRIX.md
FINAL_SIGNOFF_PACKAGE.md
FINAL_KNOWN_LIMITATIONS.md
```

If docs are not updated:

* update them
* final result cannot be clean PASS

---

## 62. `API_PROVIDER_STATUS.md` Final Verification

Verify provider matrix final status is accurate.

No provider can be `ACTIVE` unless:

* keys/config present
* real test performed
* result documented
* webhook tested where applicable
* mode/environment clear
* known issues documented
* no secrets exposed

If not tested:

* use `CONFIGURED`, `TEST_MODE`, `SETUP_REQUIRED`, `PARTIAL`, or `NOT_STARTED`.

---

## 63. `SECURITY_RLS_CHECKLIST.md` Final Verification

Verify final checklist includes:

* final RLS matrix
* hidden contact scan
* service role scan
* provider secret scan
* private sitemap/cache scan
* role/direct URL check
* payment/provider/upload webhook check
* fake/test mode cleanup
* final security blockers
* final setup-required items
* final signoff pending/complete

If any critical security item missing:

* update docs
* final result cannot be clean PASS

---

## 64. `PERFORMANCE_CHECKLIST.md` Final Verification

Verify final checklist includes:

* Core Web Vitals measurement/status
* public route performance
* private route performance
* cache/no-store checks
* query/index checks
* media/CDN checks
* build gate checks
* browser/device checks
* load test status
* final performance blockers
* setup-required items

Do not claim measured Core Web Vitals if not measured.

---

## 65. `DEPLOYMENT_ROLLBACK.md` Final Verification

Verify final deployment/rollback checklist includes:

* final deployment checklist
* pre-launch backup checklist
* migration checklist
* provider/env checklist
* feature flag checklist
* maintenance mode checklist
* smoke test checklist
* rollback checklist
* cache/CDN purge checklist
* payment webhook rollback notes
* monitoring checklist
* launch freeze checklist
* Super Admin signoff pending/complete

If rollback/backup missing:

* final result cannot be production ready

---

## 66. `FEATURE_REGISTRY.md` Final Verification

Verify accurate statuses for:

* final provider test matrix
* final API smoke matrix
* final role matrix
* final RLS matrix
* final hidden contact scan
* final fake data cleanup
* final test mode cleanup
* final deployment checklist
* final rollback checklist
* final launch freeze package
* final Super Admin signoff package
* final manual verification
* production signoff

Production signoff must not be marked DONE unless explicit final approval exists.

---

## 67. `CHANGELOG.md` Final Verification

Verify Prompt 15 final entry includes:

* date
* summary
* changed files
* final verification result
* provider status updates
* commands run
* docs updated
* known limitations
* blockers
* final readiness status
* Super Admin signoff status
* rollback notes

---

## 68. `BUGS_AND_FIXES.md` Final Verification

Create/update bugs for final issues.

Possible final bug IDs:

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

Do not hide final blockers.

---

## 69. `MANUAL_VERIFICATION.md` Final Entry

Add final entry:

```txt id="manual-verification-entry-format"
## Prompt 15 Final Verification — Production API Testing And Signoff

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Final Provider/API Status:
- Supabase Auth:
- Supabase Database/RLS:
- Storage/R2/CDN:
- Razorpay:
- GST/Invoice:
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

Commands Run:
- command: result

Route Smoke:
- public routes:
- private routes:
- admin routes:
- sitemap/robots:

API Smoke:
- search:
- auth/OTP:
- media:
- payment/webhook:
- notification:
- ads:
- provider status:
- health:

Role Matrix:
- guest:
- owner:
- broker:
- builder:
- admin/staff:
- super admin:

RLS Matrix:
- tests run:
- result:
- setup-required items:

Hidden Contact:
- scan scope:
- result:

Private Sitemap/Cache:
- sitemap:
- robots:
- private no-store:
- signed URLs:

Fake/Test/Demo Cleanup:
- fake data:
- test mode:
- demo seed:
- mock providers:

User Journeys:
- guest:
- owner:
- broker:
- builder:
- admin/staff:
- super admin:
- payment:
- media:
- lead/CRM/message:
- ads/notifications:
- CMS/SEO/legal:
- support/privacy:

Security Regression:
- result:

Performance Regression:
- result:

Browser/Device:
- tested:
- not tested:

Rollback/Backup:
- rollback:
- backup:
- restore test:

Launch Freeze:
- checklist:
- known limitations:
- blockers:

Super Admin Signoff:
- status: PENDING/APPROVED/REJECTED/NOT_AVAILABLE
- approver:
- date/time IST:
- notes:

Expected:
- Final production readiness decision is honest and fully documented.

Actual:
- ...

Issues Found:
- ...

Final Result:
- NOT_READY / READY_FOR_FINAL_VERIFICATION / READY_FOR_SUPER_ADMIN_REVIEW / PARTIAL_ACCEPTANCE_REQUIRED / BLOCKED / SETUP_REQUIRED / PRODUCTION_READY_AFTER_SIGNOFF

Launch Allowed:
- Yes/No

Reason:
- ...

Next Step:
- Fix blockers / complete setup-required / obtain Super Admin signoff / deploy with accepted limitations.
```

---

## 70. `brain.md` Final Update

Update `brain.md` with final summary:

* Prompt 15 final verification result
* provider/API final status
* route smoke status
* API smoke status
* role matrix status
* RLS matrix status
* hidden contact status
* private sitemap/cache status
* fake/test/demo cleanup status
* build/check status
* deployment/rollback status
* backup/restore status
* known limitations
* launch blockers
* Super Admin signoff status
* final decision
* next action

Since this is the final prompt, resume instruction should say:

```txt id="final-resume-instruction"
All 57 documentation and prompt files are generated. Prompt 15 final manual verification is the final gate. Do not proceed to production launch unless final result allows it and Super Admin signoff is explicit.
```

---

## 71. Final Result Decision Rules

Use these exact final decisions.

### `PRODUCTION_READY_AFTER_SIGNOFF`

Use only if all are true:

* final manual verification completed
* build passes
* no critical/high launch blockers
* provider statuses acceptable for launch
* payment/OTP/media/security/RLS status acceptable
* no hidden contact leak
* no provider secret/service role leak
* no private sitemap/cache issue
* no fake data/test mode production issue
* rollback checklist ready
* backup requirement accepted
* known limitations documented
* Super Admin explicitly approved
* approval recorded with name, role, date/time IST and notes

Do not use this without explicit Super Admin signoff.

### `READY_FOR_SUPER_ADMIN_REVIEW`

Use if:

* final manual verification mostly passes
* no critical blockers
* known limitations documented
* setup-required/partial items acceptable for review
* Super Admin approval still pending

This is the highest status allowed without explicit signoff.

### `PARTIAL_ACCEPTANCE_REQUIRED`

Use if:

* some providers setup-required
* some non-critical tests unavailable
* load test missing
* monitoring missing
* external audit missing
* browser matrix incomplete
* legal review pending
* backup restore test pending
* user/Super Admin must accept risk before launch
* no critical blocker exists

### `SETUP_REQUIRED`

Use if:

* production credentials missing
* provider setup missing
* hosting missing
* staging missing
* test users/admin unavailable
* Supabase env missing
* payment/OTP/media required providers not configured
* final tests cannot run due to missing setup

### `BLOCKED`

Use if:

* build fails
* critical security bug exists
* hidden contact leak
* public admin
* service role client leak
* provider secret leak
* private URL in sitemap
* private data public-cached
* RLS missing private table
* wrong-user data access
* payment webhook unsafe
* fake provider/payment/OTP/SMS/WhatsApp/email success
* test mode active as production
* rollback missing for risky deployment
* backup missing before destructive migration
* legal placeholder marked final
* critical route broken
* Super Admin rejects signoff

### `NOT_READY`

Use if:

* final readiness package incomplete
* provider matrix missing
* API smoke matrix missing
* role/RLS matrix missing
* launch freeze missing
* docs not updated
* blockers not classified

### `READY_FOR_FINAL_VERIFICATION`

Usually not used inside this final manual prompt unless verification could not be completed but Prompt 15 implementation package exists and needs rerun.

---

## 72. Launch Allowed Rules

Launch allowed only if:

* result is `PRODUCTION_READY_AFTER_SIGNOFF`
* Super Admin signoff is explicit
* launch freeze package accepted
* rollback/backup accepted
* no critical blocker open

Launch not allowed if result is:

* `NOT_READY`
* `READY_FOR_FINAL_VERIFICATION`
* `READY_FOR_SUPER_ADMIN_REVIEW`
* `PARTIAL_ACCEPTANCE_REQUIRED` without explicit risk acceptance
* `BLOCKED`
* `SETUP_REQUIRED`

For `PARTIAL_ACCEPTANCE_REQUIRED`, launch can proceed only if Super Admin explicitly accepts listed risks and there are no critical blockers.

---

## 73. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Final Verification Summary:
- Prompt 15 Final Production API Testing And Signoff result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Provider/API status:
- Supabase Auth:
- Supabase Database/RLS:
- Storage/R2/CDN:
- Razorpay:
- GST/Invoice:
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

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Route smoke:
- public routes:
- private routes:
- admin routes:
- sitemap/robots:

API smoke:
- public search/detail:
- auth/OTP:
- media:
- payment/webhook:
- notifications:
- ads:
- provider status:
- health:

Role matrix:
- guest:
- owner:
- broker:
- builder:
- admin/staff:
- super admin:

RLS/security:
- RLS matrix:
- hidden contact:
- service role:
- provider secrets:
- private docs/media:
- payment webhook:
- provider webhooks:
- upload security:
- CMS sanitizer:
- open redirect:
- audit logs:

Privacy/cache/SEO:
- private sitemap:
- robots:
- private no-store:
- signed URL cache:
- public cache:
- metadata/schema:
- fake counts/reviews:

Fake/demo/test cleanup:
- fake/mock data:
- demo/seed data:
- test mode:
- dev OTP:
- fake provider success:
- fake payment:
- fake analytics/metrics:

User journeys:
- guest:
- owner:
- broker:
- builder:
- admin/staff:
- super admin:
- payment:
- media:
- lead/CRM/message:
- ads/notifications:
- CMS/SEO/legal:
- support/grievance/privacy:

Performance:
- public pages:
- search/detail:
- dashboards/admin:
- media/CDN:
- cache:
- load test:
- Core Web Vitals:

Browser/device:
- tested:
- not tested:
- responsive widths:

Deployment/rollback:
- deployment checklist:
- env validation:
- feature flags:
- maintenance mode:
- rollback:
- backup:
- restore test:
- launch freeze:

Known limitations:
- list

Issues/blockers:
- bug IDs or none

Docs updated:
- file list

Super Admin signoff:
- PENDING/APPROVED/REJECTED/NOT_AVAILABLE
- approver:
- date/time IST:
- notes:

Final Result:
- NOT_READY / READY_FOR_FINAL_VERIFICATION / READY_FOR_SUPER_ADMIN_REVIEW / PARTIAL_ACCEPTANCE_REQUIRED / BLOCKED / SETUP_REQUIRED / PRODUCTION_READY_AFTER_SIGNOFF

Launch Allowed:
- Yes/No

Reason:
- concise reason

Next step:
- fix blockers / complete setup-required items / obtain Super Admin signoff / deploy with accepted limitations
```

Do not write vague “final verified”.

Do not claim launch allowed unless rules are satisfied.

---

## 74. If Final Verification Fails

If final verification fails:

1. do not approve launch
2. create/update bug entries
3. update `MANUAL_VERIFICATION.md`
4. update `BUGS_AND_FIXES.md`
5. update `API_PROVIDER_STATUS.md`
6. update `SECURITY_RLS_CHECKLIST.md`
7. update `PERFORMANCE_CHECKLIST.md`
8. update `DEPLOYMENT_ROLLBACK.md`
9. update `FEATURE_REGISTRY.md`
10. update `CHANGELOG.md`
11. update `brain.md`
12. state exact blockers
13. recommend next fixes
14. rerun final verification after fixes

Do not soften critical blockers.

---

## 75. If Final Verification Is Partial

If final verification is partial:

* list every partial item
* list setup-required items
* list disabled features
* list test-mode providers
* list unavailable tests
* list accepted risks needed
* confirm no critical blockers
* confirm no hidden contact leak
* confirm no service role/provider secret leak
* confirm no private sitemap/cache issue
* confirm no fake provider/payment success
* update docs
* require Super Admin/project owner acceptance before launch

Partial launch is only possible with explicit risk acceptance.

---

## 76. If Final Verification Passes But Signoff Pending

If all checks pass but Super Admin signoff is missing:

* result should be `READY_FOR_SUPER_ADMIN_REVIEW`
* launch allowed: `No`
* next step:

  * obtain explicit Super Admin signoff
* docs must show signoff pending

Do not mark production ready.

---

## 77. If Super Admin Approves

If Super Admin explicitly approves after final verification:

* record approver name
* record role
* record date/time IST
* record decision
* record accepted limitations
* update `MANUAL_VERIFICATION.md`
* update `FINAL_SIGNOFF_PACKAGE.md` if exists
* update `brain.md`
* final result may be `PRODUCTION_READY_AFTER_SIGNOFF`
* launch allowed may be `Yes` only if no critical blockers remain

Do not invent approval.

---

## 78. What Not To Do In Final Verification

Do not:

* fake provider success
* fake live payment
* fake OTP delivery
* fake email/SMS/WhatsApp
* fake media/CDN success
* fake monitoring
* fake RLS pass
* fake security pass
* fake Core Web Vitals
* fake load test
* fake backup restore test
* fake rollback test
* fake legal review
* fake Super Admin signoff
* hide setup-required items
* hide blockers
* mark skipped checks PASS
* expose secrets in final response
* approve launch with critical blocker
* approve launch without explicit signoff

---

## 79. Final Quality Bar

The final verification is successful when:

* all provider/API statuses are honest
* all critical route/API/role/RLS checks are complete or honestly blocked/setup-required
* hidden contact is protected
* provider secrets/service role are protected
* private sitemap/cache issues are absent
* payment success cannot be faked
* OTP/provider delivery cannot be faked
* media/private docs are protected
* public data has no fake counts/verified/RERA/payment/leads/views
* build/checks are honest
* deployment/rollback/backup readiness is documented
* known limitations are documented
* launch blockers are documented
* Super Admin signoff status is explicit
* final result is based on evidence, not optimism

---

## 80. Final Rule For Prompt 15 Verification

Verify final production readiness honestly.

Verify providers honestly.

Verify APIs honestly.

Verify payment honestly.

Verify OTP honestly.

Verify media honestly.

Verify RLS honestly.

Verify hidden contact honestly.

Verify private cache honestly.

Verify fake data cleanup honestly.

Verify build/test results honestly.

Verify rollback honestly.

Verify backup honestly.

Verify Super Admin signoff honestly.

Do not fake anything.

Do not hide blockers.

Do not mark production ready without explicit Super Admin signoff.

Do not approve launch with critical blockers.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.

---

## 81. End Of Prompt Pack

This is the final file in the prompt pack.

After completing this verification:

* do not proceed to another prompt phase
* keep docs updated
* fix blockers if any
* rerun final verification after fixes
* obtain Super Admin signoff before production launch
* preserve all 57 generated files as the project execution prompt pack

Final generated file count:

```txt id="final-file-count"
Total Files: 57
Documentation Files: 26
Prompt Files: 31
Final File: prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
```
