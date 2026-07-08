# prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md

# My Gujarat Property — Prompt 13 Manual Verification: Security, Privacy, Fraud And Rate Limits

> **DESIGN-MATCH CHECK (mandatory):** Verify built screens match `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 9 & 15** and all `docs/14` "Design Add-Ons". Confirm: append-only audit w/ masked IP, contact-reveal logs meta-audited + abuse flag, named threat types + auto-block, maker-checker self-approval disabled, reason-required+logged enforcement.

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
```

This prompt verifies the **Security, Privacy, Fraud And Rate Limits** phase.

Do not skip this verification.

Do not start Prompt 14 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real route/API guard checks, RLS checks, hidden contact checks, provider secret checks, service role checks, rate-limit checks, fraud/spam/scraping checks, webhook checks, upload/payment/provider security checks, private noindex/cache checks, docs updates and build checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
Prompt Number: 13 Verification
Phase: Security, Privacy, Fraud And Rate Limits
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
Previous Prompt: prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
Next Implementation Prompt: prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that the whole platform is hardened against private data leaks, role bypasses, direct URL bypasses, RLS mistakes, provider secret leaks, hidden contact leaks, fake security claims, spam, fraud, scraping, unsafe webhooks and unsafe public/private boundaries.

This verification checks:

* route protection inventory
* API route classification
* authentication guards
* role guards
* admin/staff permission guards
* direct URL bypass denial
* disabled/suspended/deleted account denial
* admin separation
* public/admin login separation
* RLS final pass
* private table protection
* public-safe views
* sensitive field classification
* hidden contact protection
* private media protection
* private document protection
* lead/message/proposal/site visit privacy
* billing/payment/GST privacy
* notification/provider/ad privacy
* CMS/blog/legal draft privacy
* provider secret masking
* service role server-only usage
* environment variable safety
* input validation
* output sanitization
* CMS/rich text XSS prevention
* security headers
* CSP foundation
* CORS hardening
* CSRF foundation
* SSRF prevention
* open redirect prevention
* rate-limit foundation
* OTP/login abuse protection
* inquiry/contact/message/proposal/site visit rate limits
* upload/media rate limits
* payment/billing rate limits
* ad/notification/provider rate limits
* search/scraping limits
* spam prevention
* fraud report foundation
* suspicious activity logging
* block/report hardening
* audit log hardening
* log redaction
* webhook security
* payment security review
* upload security review
* provider security review
* SEO/CMS security review
* private noindex/no-store
* retention/deletion/privacy request foundation
* backup/restore readiness docs
* incident response docs
* docs updates
* Prompt 14 readiness

This phase does not verify final external penetration test, final WAF production setup, final SOC2/ISO compliance, full SIEM integration, final external security audit, full malware scanning vendor, final disaster recovery drill, or final production load/security test. Those are later or operational checks.

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
prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
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

Also inspect all changed implementation files from Prompt 13.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* platform-wide route/API protection
* role and admin/staff authorization
* RLS and database privacy
* service role/provider secret safety
* hidden contact protection
* private media/doc/message/lead/billing/provider data protection
* rate-limit foundation
* fraud/spam/scraping foundation
* payment/provider/upload webhook security
* web security headers/CSP/CORS/CSRF/SSRF/open redirect
* input/output validation
* audit/log redaction
* retention/deletion/privacy request foundation
* backup/restore readiness documentation
* incident response documentation
* docs/checklist updates

This verification does not cover:

* final external penetration test
* final WAF/CDN production policy
* final legal privacy compliance signoff
* full SIEM deployment
* full SOC2/ISO compliance
* final disaster recovery drill
* full malware scanning provider if not configured
* final load/security test at production scale
* bug bounty program
* external audit certificate

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 13 changed files
3. inspect middleware/security headers/config
4. inspect route protection inventory
5. inspect API route classification
6. inspect auth/role/admin guard helpers
7. inspect direct URL bypass hardening
8. inspect disabled/suspended account checks
9. inspect RLS migration and policy changes
10. inspect public-safe views
11. inspect sensitive field classification
12. inspect hidden contact protection
13. inspect provider secret/service role usage
14. inspect input validation and output sanitization
15. inspect CMS sanitizer and XSS prevention
16. inspect CORS/CSRF/CSP/headers
17. inspect SSRF/open redirect protection
18. inspect rate-limit helper and coverage
19. inspect OTP/login/inquiry/message/upload/payment/ad/provider limits
20. inspect fraud report and suspicious activity foundation
21. inspect audit/log redaction
22. inspect payment/upload/provider webhook security review
23. inspect private noindex/no-store
24. inspect backup/restore and incident docs
25. run available automated checks
26. run manual smoke checks where possible
27. run secret and hidden contact searches
28. update required docs
29. create bugs for failures
30. decide final verification result
31. update `brain.md`
32. prepare Prompt 14 readiness note

Do not skip docs updates.

---

## 6. Required File Inspection

Inspect likely changed files:

```txt id="file-inspection"
middleware.*
src/middleware.*
next.config.*
src/app/
app/
src/app/api/
app/api/
src/app/admin/
app/admin/
src/app/dashboard/
app/dashboard/
src/lib/auth/
lib/auth/
src/lib/admin/
lib/admin/
src/lib/permissions/
lib/permissions/
src/lib/security/
lib/security/
src/lib/rate-limit/
lib/rate-limit/
src/lib/fraud/
lib/fraud/
src/lib/abuse/
lib/abuse/
src/lib/audit/
lib/audit/
src/lib/privacy/
lib/privacy/
src/lib/validation/
lib/validation/
src/lib/validators/
lib/validators/
src/lib/supabase/
lib/supabase/
src/lib/providers/
lib/providers/
src/lib/payments/
lib/payments/
src/lib/uploads/
lib/uploads/
src/lib/media/
lib/media/
src/lib/notifications/
lib/notifications/
src/lib/ads/
lib/ads/
src/lib/search/
lib/search/
src/components/security/
components/security/
src/types/security.*
types/security.*
src/types/fraud.*
types/fraud.*
src/types/rate-limit.*
types/rate-limit.*
supabase/migrations/
supabase/policies/
.env.example
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

If Prompt 13 changed database schema, verify migration exists.

Expected pattern:

```txt id="expected-migration"
supabase/migrations/*_security_privacy_fraud_rate_limits.sql
```

Verify migration includes:

* purpose
* phase: Prompt 13
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* rate-limit tables if any
* fraud/abuse/security incident tables if any
* audit/log redaction fields if any
* public-safe views if any
* destructive changes yes/no
* backup required yes/no
* rollback notes

If DB changed without migration:

* create critical bug
* mark verification `FAIL`
* do not start Prompt 14

If migration exists without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL` depending security/data risk

If DB not changed because Supabase/env unavailable:

* mark DB/RLS runtime checks `SETUP_REQUIRED`
* do not claim RLS PASS

---

## 8. Route Protection Inventory Verification

Verify `SECURITY_RLS_CHECKLIST.md` includes route inventory.

Route groups:

```txt id="route-groups"
public
auth
dashboard_owner
dashboard_broker
dashboard_builder
admin
staff
api_public
api_authenticated
api_admin
api_webhook
api_provider
api_upload
api_payment
private_preview
```

For each group, verify:

* access level
* auth requirement
* role requirement
* permission requirement
* noindex/no-store need
* rate limit need
* RLS dependency
* sensitive output risk
* current status
* known gaps

If route inventory is missing or incomplete:

* update docs
* mark verification `PARTIAL`

If private routes are unprotected:

* create critical bug
* mark `FAIL`

---

## 9. API Route Classification Verification

Verify all API routes are classified:

```txt id="api-route-types"
public_read_only
authenticated_user
role_scoped
admin_permission
webhook_verified
provider_callback
upload_signed
payment_webhook
internal_only
```

For each API route, verify:

* method validation
* input validation
* auth requirement
* authorization requirement
* rate-limit requirement
* safe error handling
* no secrets in response
* no private data leak
* no raw stack traces
* webhook signature/idempotency if applicable
* no fake success

If sensitive API route has no classification or guard:

* create bug
* mark `FAIL` if private data can leak

---

## 10. Auth Guard Verification

Verify auth guards cover:

* owner dashboard
* broker dashboard
* builder dashboard
* profile/settings
* leads/CRM/proposals/messages/site visits
* billing
* media upload
* notifications
* saved items
* builder ads
* admin routes
* private API routes
* signed URL routes
* private CMS preview
* provider settings

Check:

* guest denied private pages
* server-side redirect/denial
* private data not rendered before redirect
* original intent preserved safely
* disabled/suspended/deleted users denied where applicable
* safe error page/state
* no client-only protection

If private data renders before auth check:

* create critical bug
* mark `FAIL`

---

## 11. Role Guard Verification

Verify role guards enforce:

* Owner routes Owner only
* Broker routes Broker only
* Builder routes Builder only
* Admin/staff routes separate
* Owner/Broker cannot post projects
* Builder cannot post properties
* Owner/Broker cannot create builder ads
* wrong role denied dashboard direct URL
* pending role change does not grant new role
* role from trusted server/profile only
* client cannot change role to bypass

If role check is frontend-only:

* create critical bug
* mark `FAIL`

---

## 12. Admin Security Verification

Verify admin security:

* separate admin login
* no public admin registration
* no mobile OTP admin login
* invite-only staff/admin
* admin routes noindex/no-store
* disabled/suspended staff denied
* staff permissions server-side
* no self-grant permission
* provider/payment/security actions permission-restricted
* admin actions audited
* no provider secrets visible
* no public admin links
* public users denied direct URL

If public user can access admin route:

* create critical bug
* mark `FAIL`

---

## 13. Direct URL Bypass Verification

Test or inspect direct URL denial for:

```txt id="direct-url-risk-areas"
dashboard owner pages
dashboard broker pages
dashboard builder pages
admin pages
lead detail
message thread
proposal detail
site visit detail
billing invoice/payment detail
media signed URL
private document preview
notification detail
ad campaign detail
provider logs
CMS draft preview
missing location request detail
```

Expected:

* guest denied
* wrong role denied
* wrong owner/user denied
* private data not rendered before redirect
* API/action denied
* RLS denies backend query
* metadata does not leak private title/contact
* private pages noindex/no-store

If direct URL bypass leaks private data:

* create critical bug
* mark `FAIL`

---

## 14. Disabled / Suspended / Deleted Account Verification

Verify account statuses:

```txt id="account-statuses"
active
pending
suspended
banned
disabled
deleted
under_review
verification_required
```

Check:

* suspended/banned users cannot perform sensitive actions
* disabled staff cannot access admin
* deleted users cannot login/use private data
* under_review access limited if implemented
* status checks server-side
* admin status changes audited
* UI shows safe state
* API routes enforce status

If suspended user can message/pay/post/upload/advertise:

* create bug
* mark `FAIL` or `PARTIAL` depending scope

---

## 15. RLS Inventory Verification

Verify `SECURITY_RLS_CHECKLIST.md` includes RLS inventory for private tables.

Categories:

* profiles
* roles/permissions
* properties/projects/requirements drafts/private states
* leads/CRM/proposals/messages/site visits
* admin/staff tables
* billing/payments/invoices/GST
* media private metadata
* notifications/preferences
* ads campaign private data
* provider configs/logs
* CMS drafts/legal versions/consents
* support/grievance/privacy requests
* audit logs
* fraud/rate-limit/security incident tables

If private table inventory is incomplete:

* update docs
* mark `PARTIAL`

If private table lacks RLS:

* create critical bug
* mark `FAIL`

---

## 16. RLS Enabled Verification

Verify RLS enabled on every private table.

Check for:

* no private table without RLS
* no broad public `select *`
* no `using (true)` on private tables unless public-safe view/table by design
* insert/update/delete policies scoped
* admin/staff policies permission-scoped
* service role not used by client to bypass
* public tables/views expose only safe fields

If RLS disabled on private table:

* create critical bug
* mark `FAIL`

If database unavailable:

* mark RLS runtime verification `SETUP_REQUIRED`
* do not mark RLS PASS

---

## 17. RLS Policy Verification

Verify policies align with app permissions:

* user can read/update own profile safe fields
* owner can manage own properties/requirements
* broker can manage own properties/requirements
* builder can manage own projects
* wrong user denied other private entities
* participant can read own leads/messages/proposals/site visits
* non-participant denied
* user can read own billing/invoices/GST
* wrong user denied billing
* user can read own notifications/preferences
* builder can read own ad campaigns
* public can read only active public ads
* provider configs/logs private
* CMS drafts private
* published CMS/blog/legal safe public
* admin/staff permission-scoped

If RLS allows wrong-user private access:

* create critical bug
* mark `FAIL`

---

## 18. Public View Verification

Verify public views/API helpers expose only safe fields.

Public views can include:

* published property/project listing data
* public media variants
* public profile info
* active public ads
* published CMS/blog/legal pages
* active public locations

Public views must exclude:

* hidden contact
* private exact address where hidden
* private docs
* private media originals
* draft/pending/rejected/deleted data
* admin notes
* private lead/message/proposal/site visit data
* payment/billing/provider data
* raw owner email/phone unless public-approved

If public view exposes private field:

* create critical bug
* mark `FAIL`

---

## 19. Sensitive Field Classification Verification

Verify `SECURITY_RLS_CHECKLIST.md` includes data classification.

Categories:

```txt id="data-classification"
public
public_safe
authenticated_private
owner_private
participant_private
admin_private
staff_permissioned
sensitive
secret
legal_hold
delete_eligible
```

Sensitive fields include:

* phone/mobile
* email
* WhatsApp
* hidden contact
* OTP
* auth/session tokens
* provider secrets
* service role key
* payment identifiers
* GSTIN
* billing address
* private documents
* exact private address
* private media originals
* private notes
* admin notes
* message body
* support/grievance content
* IP/user agent if stored
* fraud signals
* audit logs

If classification missing:

* update docs
* mark `PARTIAL`

If sensitive fields are public:

* create critical bug
* mark `FAIL`

---

## 20. Hidden Contact Deep Verification

Search and inspect for hidden contact leaks across:

* public search cards
* public detail pages
* public profiles
* SEO metadata
* schema
* sitemap
* notifications
* provider payloads
* lead APIs
* message/proposal/site visit payloads
* media filenames/alt/caption
* PDF metadata
* ad creatives
* logs/errors
* public APIs
* static build output if available

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

* hidden contact not in public HTML
* hidden contact not in public JSON props
* hidden contact not in schema/sitemap
* hidden contact not in notification previews
* hidden contact not in provider payloads unless authorized
* reveal only through authorized contact reveal flow
* reveal audited if implemented

If hidden contact leaks publicly:

* create critical bug
* mark `FAIL`

---

## 21. Private Document Verification

Verify private documents:

* verification docs
* RERA proof docs
* ownership proof
* company documents
* payment proof
* support attachments
* fraud evidence
* admin documents
* private media originals

Check:

* private bucket/storage
* signed URL only
* auth/permission check
* short TTL
* sensitive access audit if implemented
* not in sitemap
* not public CDN
* wrong user denied
* provider secrets not exposed
* no direct object URL public

If private document is public:

* create critical bug
* mark `FAIL`

---

## 22. Private Media Verification

Verify Prompt 10 media security still holds:

* private originals not public
* draft/pending/rejected media private
* message attachments private
* admin/verification docs private
* signed URLs permission-checked
* wrong user denied
* hidden contact not in metadata/object key
* public pages show only ready public media
* upload secrets server-only
* SVG/PDF/video safety status honest

If private media is public:

* create critical bug
* mark `FAIL`

---

## 23. Lead / Message / Proposal / Site Visit Privacy Verification

Verify Prompt 08 privacy:

* lead participant-only
* contact request private
* contact reveal authorized only
* messages participant-only
* proposals participant-only
* site visits participant-only
* notes/followups private
* wrong user denied
* admin/staff permission-scoped
* private pages noindex/no-store
* hidden contact protected
* direct URL denied

If wrong user can read lead/message/proposal/site visit:

* create critical bug
* mark `FAIL`

---

## 24. Billing / Payment Privacy Verification

Verify Prompt 09 privacy:

* subscriptions own-user only
* payments own-user only
* invoices own-user only
* GST profile own-user only
* refunds/credit notes own-user only
* provider webhook events private
* admin/staff permission-scoped
* payment secrets server-only
* client callback does not activate subscription
* webhook signature/idempotency present
* private billing pages noindex/no-store

If wrong user can read invoice/payment:

* create critical bug
* mark `FAIL`

---

## 25. Notification / Ads / Provider Privacy Verification

Verify Prompt 12 privacy:

* notifications recipient-only
* notification preferences own-user only
* ad campaign private data builder/admin only
* public active ads safe view only
* provider configs/logs private
* provider secrets masked
* wrong user denied
* hidden contact not in notification/ad/provider payload
* public ads sponsored and eligible only
* private pages noindex/no-store

If provider logs are public:

* create critical bug
* mark `FAIL`

---

## 26. CMS / SEO Privacy Verification

Verify Prompt 11 privacy/security:

* CMS drafts private
* blog drafts/scheduled private
* legal drafts private
* published pages safe
* CMS HTML sanitized
* sitemap excludes private pages
* metadata/schema exclude hidden contact
* open redirects blocked
* search params validated
* public search approved-only
* fake counts/reviews absent

If unsafe CMS HTML executes:

* create critical bug
* mark `FAIL`

---

## 27. Service Role Verification

Search for service role usage:

```txt id="service-role-search"
SUPABASE_SERVICE_ROLE_KEY
SERVICE_ROLE
serviceRole
createServiceRoleClient
adminClient
supabaseAdmin
```

Verify:

* no service role in client component
* no service role in browser bundle
* no service role in API response
* service role isolated in server-only module
* privileged use has explicit permission checks
* not used to bypass RLS for user actions without validation
* no service role value in logs/docs/.env.example
* no import from server-only module into client component

If service role exposed to client:

* create critical bug
* mark `FAIL`
* recommend key rotation

---

## 28. Provider Secret Verification

Search for provider secrets:

```txt id="secret-patterns"
SUPABASE_SERVICE_ROLE_KEY
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
R2_SECRET_ACCESS_KEY
CLOUDFLARE_API_TOKEN
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
OTP_API_KEY
JWT_SECRET
SESSION_SECRET
ENCRYPTION_KEY
```

Check:

* no real secret in client
* no real secret in UI
* no real secret in logs
* no real secret in audit logs
* no real secret in docs/final response
* `.env.example` placeholders only
* admin provider UI masked only
* provider status APIs do not return secrets

If real secret exposure found:

* do not print secret
* create critical bug
* mark `FAIL`
* recommend secret rotation

---

## 29. Environment File Verification

Verify `.env.example`:

* contains placeholder names only
* no real credentials
* no copied production secrets
* groups variables by provider
* marks setup-required providers
* explains server-only vs public variables
* public variables use safe `NEXT_PUBLIC_` only when intended
* secrets not prefixed public
* obsolete secrets removed or documented

If real secret in `.env.example`:

* create critical bug
* mark `FAIL`

---

## 30. Input Validation Verification

Verify server-side validation for:

* auth fields
* profile fields
* role changes
* property/project/requirement fields
* location fields
* inquiry/contact/message/proposal fields
* site visit fields
* payment/coupon/GST fields
* media upload metadata
* CMS/blog/legal content
* ad campaign fields
* notification templates
* provider configs
* redirect URLs
* search params
* support/grievance forms

Check:

* schemas/allowlists used
* invalid types rejected
* IDs ownership validated
* enum values validated
* URLs validated
* dates validated
* numeric ranges validated
* client role/status not trusted
* safe errors returned

If critical mutation lacks server validation:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 31. Output Sanitization / XSS Verification

Inspect risky rendering:

* CMS/blog/legal body
* user notes
* messages
* ad titles/captions
* property/project descriptions
* location names
* support/grievance text
* notification templates
* admin notes
* profile descriptions
* rich text fields

Check:

* escaped by default
* sanitizer used if HTML allowed
* no unsafe `dangerouslySetInnerHTML`
* script/event handlers blocked
* unsafe iframes blocked
* javascript/data URLs blocked
* provider/webhook payload not rendered raw

If public XSS vector exists:

* create critical bug
* mark `FAIL`

---

## 32. CMS Sanitizer Verification

Verify CMS sanitizer specifically:

* server-side sanitizer
* allowlist tags/attributes
* no scripts
* no event handlers
* no unsafe iframe
* no external script embeds
* no javascript/data URLs
* media references safe
* draft preview auth-protected/noindex
* sanitizer status documented

If sanitizer missing but rich HTML public:

* create critical bug
* mark `FAIL`

---

## 33. Security Headers Verification

Verify security headers:

```txt id="security-headers"
Content-Security-Policy
X-Frame-Options or frame-ancestors
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Strict-Transport-Security
Cross-Origin-Opener-Policy
Cross-Origin-Resource-Policy
Cross-Origin-Embedder-Policy where safe
```

Check:

* headers configured in framework/hosting
* admin pages protected from framing
* MIME sniffing disabled
* referrer policy safe
* permissions policy restricts unnecessary APIs
* HSTS production status documented
* provider scripts/domains allowlisted only as needed
* missing headers documented partial

If no security headers foundation exists:

* create bug
* mark `PARTIAL`

If critical framing/admin exposure risk exists:

* mark `FAIL`

---

## 34. CSP Verification

Verify CSP foundation:

* own domain allowed
* Supabase allowed where needed
* R2/CDN image/media allowed
* Razorpay checkout allowed where needed
* maps provider allowed only if configured
* analytics only if configured
* iframe providers allowlisted
* no arbitrary script domains
* no user-provided script
* no unsafe iframe
* report-only status documented if used
* no broad unsafe-inline unless documented and minimized

If CSP missing entirely:

* create bug
* mark `PARTIAL`

If unsafe CSP enables known XSS vector:

* mark `FAIL`

---

## 35. CORS Verification

Verify CORS:

* no wildcard CORS for authenticated/private APIs
* credentials not allowed for untrusted origins
* public APIs allow only needed methods
* admin/provider APIs not cross-origin with credentials
* webhook endpoints do not rely on CORS for security
* local dev vs prod separated
* provider exceptions documented

If private API allows wildcard credential CORS:

* create critical bug
* mark `FAIL`

---

## 36. CSRF Verification

Verify CSRF foundation:

* state-changing server actions require auth
* mutation API routes validate method/auth
* same-site cookies configured
* high-risk admin/provider/payment actions protected
* webhook endpoints exempt but signature/idempotency protected
* public forms rate-limited/validated
* framework default documented if relied upon

If authenticated mutation can be CSRFed with no protection and high risk:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 37. SSRF Verification

Inspect server-side external fetch risk:

* virtual tour URLs
* CMS embeds
* external image URLs
* provider test URLs
* webhook callbacks
* redirect manager
* map/geocode APIs
* PDF/image processing external URLs

Check:

* arbitrary user URLs not fetched server-side
* provider allowlist used
* localhost/private IP ranges blocked if fetch exists
* file/internal metadata endpoints blocked
* scheme validated
* no arbitrary URL proxy
* status documented if no fetch exists

If arbitrary server-side URL fetch exists:

* create critical bug
* mark `FAIL`

---

## 38. Open Redirect Verification

Verify redirect safety in:

* auth redirect/original action
* ad click tracking
* notification deep links
* redirect manager
* support links
* payment return URL
* provider callback return

Check:

* internal relative routes preferred
* external destinations allowlisted
* javascript/data/protocol-relative unsafe links blocked
* redirect loops prevented
* private route auth checked
* no arbitrary redirect param

If open redirect exists:

* create critical bug
* mark `FAIL`

---

## 39. Rate Limit Helper Verification

Verify rate-limit foundation:

* helper exists or setup-required documented
* actor dimension:

  * IP hash
  * profile ID
  * session ID
  * phone/email hash
  * route/action key
  * entity ID
* storage:

  * DB/Redis/durable store or setup-required
  * in-memory dev-only if used
* safe `RATE_LIMITED` error
* privacy-safe hashes
* cleanup/retention documented
* no fake rate-limit status

If implementation claims rate limit active but no real enforcement:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 40. Rate-Limited Action Coverage Verification

Verify coverage for:

```txt id="rate-limited-actions"
login_attempt
mobile_otp_send
otp_verify
registration
role_change_request
property_create
project_create
requirement_create
inquiry_create
contact_request
contact_reveal_request
message_send
proposal_send
site_visit_request
saved_search_create
media_upload_session
signed_download_url
billing_checkout_order
coupon_apply
refund_request
ad_campaign_create
ad_impression_track
ad_click_track
notification_delivery_queue
provider_test_send
support_grievance_submit
missing_location_request
search_requests
public_detail_scraping
admin_login_attempt
admin_provider_change
```

For each implemented sensitive action, verify:

* limit exists or setup-required documented
* actor dimension clear
* window clear/configurable
* safe error
* suspicious event if high-risk
* no fake enforcement

If no rate-limit foundation for public abuse endpoints:

* create bug
* mark `PARTIAL`

If provider/payment/OTP endpoint unlimited in production:

* mark `FAIL` or `PARTIAL` depending exposure

---

## 41. OTP Abuse Verification

Verify OTP protection:

* per phone limit
* per IP/session limit
* verify attempt limit
* cooldown
* resend delay
* provider cost guard
* dev/test mode labelled
* production no fake OTP
* logs redacted
* no OTP in client logs
* no OTP in final response
* admin login does not use public OTP

If OTP can be spammed without limit and provider active:

* create critical bug
* mark `FAIL`

---

## 42. Login Attempt Verification

Verify login protection:

* failed login attempt tracking
* temporary lock/cooldown foundation
* admin login stricter limits
* suspicious login event foundation
* safe error messages
* account enumeration minimized where possible
* session invalidation foundation if implemented
* alerts setup-required if provider missing

If admin login has no brute force protection foundation:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 43. Scraping Protection Verification

Verify public scraping protections for:

* search result API
* property/project detail APIs
* public profiles
* public media APIs
* public ads APIs
* location autocomplete

Check:

* pagination limits
* maximum page size
* query length limits
* public-safe fields only
* no hidden contact
* no private/pending data
* rate-limit/foundation
* no unbounded joins
* robots safe
* suspicious activity logs if implemented

If public API allows unbounded dump of listings/profiles:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 44. Spam Protection Verification

Verify spam protection for:

* inquiries
* contact requests
* messages
* proposals
* site visits
* support/grievance forms
* missing location requests
* ad campaign submissions
* reports/fraud

Check:

* rate limits/foundation
* duplicate prevention
* content length limits
* URL/link limits if applicable
* block/report integration
* cooldowns
* suspicious keyword flag if implemented
* attachment restrictions
* captcha/setup-required if needed
* no fake spam protection

If message/contact forms can be spammed without any limit/foundation:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 45. Fraud Report Verification

Verify fraud report foundation:

Fraud report targets:

* listing
* project
* profile
* message
* ad
* payment issue
* fake RERA/ownership
* spam/scam

Statuses:

```txt id="fraud-report-statuses"
submitted
under_review
need_more_info
action_taken
rejected
closed
spam
escalated
```

Check:

* report stored if UI claims submitted
* report private
* reporter identity protected
* reported party cannot see reporter identity
* admin/staff permission-scoped
* report submissions rate-limited
* action audited
* no fake report success

If report success shown without storage/setup state:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 46. Suspicious Activity Verification

Verify suspicious event foundation for:

* repeated OTP requests
* repeated failed login
* direct URL denied repeatedly
* scraping threshold
* repeated contact requests
* message spam
* proposal spam
* upload abuse
* payment webhook invalid signature
* provider webhook invalid signature
* ad click spam
* admin permission denial
* provider secret access attempt

Check:

* privacy-safe event record
* severity
* reason
* actor hash/profile ID
* no secrets
* no hidden contact
* permission-scoped
* no fake events
* retention documented

If suspicious activity UI shows fake events:

* create bug
* mark `PARTIAL`

---

## 47. Block / Report User Verification

If block/report exists, verify:

* user can block message/contact where applicable
* blocked user cannot message/contact where applicable
* report creates private record
* admin can review
* wrong user denied
* block/report rate-limited
* no fake block/report
* no hidden contact leak
* status private

If feature not implemented, verify status is partial/setup-required.

---

## 48. Audit Log Verification

Verify audit logs cover high-risk actions:

* admin login
* role changes
* staff invite/disable
* permission changes
* listing/project/requirement approval
* contact reveal
* private doc access
* payment webhook/payment/refund/credit note
* invoice issue
* provider change/test
* ad approval/pause/suspend
* legal/CMS publish
* redirect change
* sensitive media signed URL
* user suspension/deletion
* data export/delete request
* security incident update

Audit logs must:

* include actor/action/entity/timestamp
* be permission-scoped
* not be user-editable
* avoid secrets
* redact sensitive fields
* have indexes
* be retained as documented

If high-risk action lacks audit:

* create bug
* mark `PARTIAL` or `FAIL` depending risk

---

## 49. Log Redaction Verification

Search logs/helpers for leakage.

Logs must not include:

* OTP
* passwords
* session tokens
* auth tokens
* provider secrets
* webhook secrets
* service role keys
* payment secrets
* full hidden contact where not needed
* private document URLs
* signed URL tokens
* raw private message bodies unless policy
* raw provider payloads with secrets
* GSTIN if not needed
* full IP if privacy policy avoids it

Verify redaction helpers:

* phone masking
* email masking
* token redaction
* secret redaction
* authorization header redaction
* cookie redaction
* signed URL redaction

If logs expose secrets:

* create critical bug
* mark `FAIL`

---

## 50. Error Handling Verification

Verify user-facing errors:

* no stack traces
* no SQL errors
* no provider secrets
* no policy internals
* no hidden contact
* no raw webhook errors
* no file paths
* no env variable values
* no DB connection details

Check:

* typed errors used
* generic fallback
* admin errors still secret-safe
* API errors safe
* build/prod mode safe

If raw stack trace appears to public user:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 51. Webhook Security Verification

Verify all webhooks/callbacks:

* Razorpay payment webhook
* email delivery callback
* SMS delivery callback
* WhatsApp callback
* provider callbacks
* media callbacks if any

Check:

* signature verification if provider supports
* verify token if applicable
* idempotency by event ID
* event allowlist
* safe raw body handling
* amount/currency validation for payment
* duplicate event safe
* unsupported event safe
* safe logs
* no secret in response
* no fake success

If unverified webhook mutates data:

* create critical bug
* mark `FAIL`

---

## 52. Payment Security Review Verification

Verify payment security still holds:

* no client callback subscription/ad/payment activation
* Razorpay webhook signature verified
* webhook idempotency
* amount/currency validation
* invoice sequence unique
* refund permission-scoped
* admin manual grant audited
* client price not trusted
* wrong user billing denied
* secrets server-only
* private pages noindex/no-store

If payment webhook bypass exists:

* create critical bug
* mark `FAIL`

---

## 53. Upload Security Review Verification

Verify upload security still holds:

* file type validation
* MIME/magic validation where possible
* size limits
* SVG safe/rejected/sanitized
* PDF/video safe/setup-required
* private bucket/signed URL
* wrong user media denied
* hidden contact metadata protected
* service role/server-only
* upload rate limits/foundation
* orphan cleanup status
* malware scan setup-required if missing

If unsafe SVG publicly rendered:

* create critical bug
* mark `FAIL`

---

## 54. Provider Security Review Verification

Verify provider security:

* provider secrets masked
* provider logs private
* no fake delivery
* provider webhooks idempotent/signature status
* provider test send rate-limited
* provider status honest
* setup-required states accurate
* no provider secret in client/UI/logs
* no service role client exposure
* admin permission-scoped

If provider secret leak exists:

* create critical bug
* mark `FAIL`

---

## 55. Notification Security Review Verification

Verify:

* recipient correctness
* unread count real
* wrong user denied
* hidden contact not in notification
* template variables allowlisted
* deep links internal and permission-checked
* provider payloads secret-safe
* notification preferences private
* external delivery setup-required if missing

If wrong user can read notification:

* create critical bug
* mark `FAIL`

---

## 56. Ads Security Review Verification

Verify:

* builder-only project ads
* own published project only
* owner/broker denied project ads
* public ads active/approved/eligible only
* Sponsored label visible
* payment/RERA gates honest
* ad click open redirect blocked
* metrics real/no-data
* private campaign data not public
* provider/creative secrets safe
* public ads no hidden contact

If public pending/rejected ad appears:

* create critical bug
* mark `FAIL`

---

## 57. CMS / SEO Security Review Verification

Verify:

* CMS sanitizer
* draft pages private/noindex
* legal placeholders not final
* sitemap excludes private pages
* robots blocks private routes
* metadata/schema excludes hidden contact
* no fake SEO counts/reviews
* open redirects blocked
* search params validated
* public search approved-only

If private URL in sitemap:

* create critical bug
* mark `FAIL`

---

## 58. Private Noindex / No-Store Verification

Verify private pages are noindex/no-store:

* dashboards
* admin
* leads/messages/proposals/site visits
* billing
* media/private docs
* notifications/preferences
* ads campaign management
* provider logs/settings
* CMS drafts/previews
* support/grievance/privacy requests
* audit/security/fraud pages

Check:

* not in sitemap
* no private metadata/schema
* no public cache
* no private content rendered in HTML before redirect

If private page is indexable/cacheable with private data:

* create critical bug
* mark `FAIL`

---

## 59. Data Retention Verification

Verify docs/code foundation for retention:

* users/profiles
* listings/projects/requirements
* leads/messages/proposals/site visits
* billing/payments/invoices/GST
* media/docs
* notifications
* provider logs
* audit logs
* support/grievance/fraud reports
* consent records
* suspicious activity logs

Check:

* legal/financial retention noted
* user deletion/anonymization foundation
* audit logs retained
* private media cleanup respects retention
* cron/cleanup setup-required if missing
* docs updated
* no fake retention automation

If destructive deletion exists without retention/rollback docs:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 60. Soft Delete / Hard Delete Verification

Verify:

* soft delete default for user-generated/admin-reviewable content
* hard delete Super Admin only where allowed
* retention respected
* audit event required
* backup/rollback considered
* private file cleanup considered
* RLS still enforced on deleted/private rows
* public pages hide deleted rows
* hard delete not exposed to normal users/staff without permission

If normal user can hard delete critical records without retention/audit:

* create bug
* mark `FAIL`

---

## 61. Privacy Request Verification

Verify privacy request foundation:

```txt id="privacy-request-types"
data_export
data_correction
data_delete
consent_withdrawal
marketing_unsubscribe
account_deactivation
account_deletion
```

Check:

* request private/RLS protected
* user can request own action if implemented
* wrong user denied
* admin/staff permission-scoped
* no fake completed request
* retention/legal hold respected
* status visible to requester
* action audited

If not implemented, status setup-required/foundation is acceptable.

If privacy request data public:

* create critical bug
* mark `FAIL`

---

## 62. Consent Hardening Verification

Verify consent:

* terms accepted
* privacy accepted
* cookie preference
* contact sharing consent
* payment/trial consent
* marketing opt-in/out
* notification preferences
* WhatsApp/SMS/email opt-in

Check:

* policy version stored if implemented
* required consent explicit
* marketing not prechecked
* records private
* wrong user denied
* no fake consent
* consent changes audited if needed

If consent records public:

* create critical bug
* mark `FAIL`

---

## 63. Backup / Restore Readiness Verification

Verify `DEPLOYMENT_ROLLBACK.md` and related docs include:

* DB backup before destructive migration
* storage/R2 backup/lifecycle
* invoice/payment data protection
* media object retention
* audit log retention
* rollback procedure
* restore test status
* RPO/RTO placeholder
* production backup setup-required if not configured

Do not mark backup tested unless actually tested.

If rollback/backup notes missing after security/RLS changes:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 64. Incident Response Verification

Verify incident response docs include:

Incident types:

* hidden contact leak
* provider secret leak
* service role leak
* payment webhook bypass
* private media leak
* wrong-user data access
* public admin exposure
* RLS misconfiguration
* spam/scraping attack
* provider delivery abuse
* ad fraud spike
* data deletion mistake

For each, docs should include:

* detection
* immediate containment
* user impact assessment
* secret rotation
* rollback
* data restore
* communication placeholder
* post-incident review

If incident docs missing:

* update docs
* mark `PARTIAL`

---

## 65. Security Incident Foundation Verification

If security incident table/UI exists, verify statuses:

```txt id="security-incident-statuses"
reported
triaged
investigating
contained
mitigated
resolved
false_positive
reopened
closed
```

Severity:

```txt id="security-severity-values"
low
medium
high
critical
```

Check:

* permission-scoped
* sensitive details protected
* no fake incidents
* audit updates
* no public access

If incident system not implemented, documented foundation is acceptable.

---

## 66. Export Security Verification

If exports exist or are planned, verify:

* permission required
* scope limited
* sensitive fields excluded/masked unless explicit permission
* export action audited
* export file private/signed URL
* expiry/cleanup
* no public export URL
* rate limited
* no provider secrets
* no hidden contact unless authorized

If exports are not implemented, status not-started/setup-required.

If public export URL exposes private data:

* create critical bug
* mark `FAIL`

---

## 67. Admin Sensitive View Verification

For sensitive admin data, verify:

* explicit permission
* masked by default
* reveal reason if implemented
* access audited if high-risk
* no bulk export without permission
* no provider secrets ever
* no hidden contact reveal without policy
* staff without permission denied

Sensitive areas:

* hidden contact
* private docs
* provider logs
* payment data
* fraud reports
* support/grievance details
* audit logs
* security incidents

If staff without permission can view sensitive data:

* create critical bug
* mark `FAIL`

---

## 68. Public API Limits Verification

Verify public APIs have:

* pagination limit
* maximum page size
* maximum query length
* filter allowlist
* sort allowlist
* rate limit/foundation
* safe public fields
* no hidden contact
* no private/pending data
* no unbounded joins
* safe errors

If public API can dump private/user data:

* create critical bug
* mark `FAIL`

---

## 69. Admin / Staff Permission Review

Review admin permissions across modules:

* users
* staff
* properties
* projects
* requirements
* verification
* support
* reports/fraud
* billing/payments
* ads/promotions
* notifications
* providers
* CMS/blog/legal
* SEO/locations
* audit/security
* exports/system

Check:

* server-side permission checks
* disabled staff denied
* no self-grant
* Super Admin high-risk protected
* maker-checker high-risk where implemented
* actions audited
* no frontend-only permissions

If staff can self-grant permissions:

* create critical bug
* mark `FAIL`

---

## 70. Fake Security Status Verification

Search for fake security claims:

```txt id="fake-security-patterns"
rate limit active
fraud protection active
RLS passed
security passed
backup tested
webhook verified
malware scan passed
CSP enabled
provider active
fake rate limit
mock security
demo fraud
TODO security
```

Check:

* statuses backed by code/tests/config
* setup-required/partial where not fully implemented
* no fake PASS in docs
* provider statuses honest
* backup tested only if tested
* malware scan active only if provider exists

If fake security status appears:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 71. Automated Checks To Run

Run available:

```txt id="npm-checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

```txt id="optional-security-checks"
npm audit
pnpm audit
npm run test:security
npm run test:rls
npm run test:e2e
npm run test:auth
npm run test:permissions
npm run test:webhooks
```

If scripts missing:

* record `NOT_CONFIGURED`

If checks fail:

* fix safe issues if in scope
* create bug if unresolved
* mark `FAIL` or `PARTIAL`

Build failure blocks PASS.

---

## 72. Secret Scan Suggestions

Run/search:

```txt id="secret-scan-suggestions"
grep -R "SUPABASE_SERVICE_ROLE_KEY" .
grep -R "RAZORPAY_KEY_SECRET" .
grep -R "R2_SECRET_ACCESS_KEY" .
grep -R "CLOUDFLARE_API_TOKEN" .
grep -R "WHATSAPP_BUSINESS_TOKEN" .
grep -R "SENDGRID_API_KEY" .
grep -R "RESEND_API_KEY" .
grep -R "SMTP_PASSWORD" .
grep -R "OTP_API_KEY" .
grep -R "SERVICE_ROLE" .
```

Use equivalent project-safe search.

Do not print real secret values.

If found:

* classify context
* confirm if placeholder or real
* fix if unsafe
* create bug
* recommend rotation if real exposed

---

## 73. Hidden Contact Scan Suggestions

Run/search public output/code for:

```txt id="hidden-contact-scan-suggestions"
contact_phone
contact_email
owner_phone
broker_phone
builder_phone
hidden_contact
contact_visibility
mobile
whatsapp
tel:
mailto:
wa.me
```

Verify public surfaces exclude hidden contact.

Public surfaces:

* search cards
* detail pages
* SEO metadata
* schema
* sitemap
* notifications
* ads
* media metadata
* public API payloads

If hidden contact appears in public:

* create critical bug
* mark `FAIL`

---

## 74. RLS Test Suggestions

If Supabase test environment is available, run representative tests:

```txt id="rls-test-scenarios"
1. Anonymous select private profiles fields → denied.
2. Anonymous select public listing view → safe fields only.
3. Owner A select Owner B draft property → denied.
4. Broker A select Broker B property private fields → denied.
5. Builder A select Builder B project draft → denied.
6. User A select User B lead → denied.
7. User A select non-participant message thread → denied.
8. User A select User B invoice → denied.
9. User A select User B notification → denied.
10. Builder A select Builder B ad campaign → denied.
11. Anonymous select provider_configurations → denied.
12. Anonymous select audit logs → denied.
13. Staff without billing permission select payment data → denied.
14. Staff without provider permission select provider logs → denied.
15. Staff without legal permission publish legal page → denied.
16. Public select private media metadata → denied.
17. Public select CMS drafts → denied.
18. Public select consent records → denied.
```

Record exact results.

Do not mark RLS PASS without tests.

---

## 75. Manual Smoke Test Matrix

If app can run, test:

```txt id="manual-smoke-matrix"
Auth/role:
- guest denied dashboard
- guest denied admin
- owner denied broker/builder/admin private pages
- broker denied builder/admin private pages
- builder denied owner/broker/admin private pages
- staff without permission denied provider/security/billing pages
- disabled staff denied admin

Private data:
- wrong user denied lead/message/proposal/site visit
- wrong user denied invoice/payment/GST
- wrong user denied notification
- wrong user denied ad campaign
- wrong user denied private media/doc signed URL

Public privacy:
- public search has no hidden contact
- public detail has no hidden contact
- metadata/schema/sitemap has no hidden contact
- private/admin/dashboard pages absent from sitemap

Secrets:
- provider secrets not in UI
- service role not in client
- .env.example placeholders only

Security:
- invalid webhook rejected
- invalid upload rejected
- open redirect blocked
- unsafe CMS HTML blocked
- rate limit blocks after threshold if configured
- private pages noindex/no-store
```

If safe runtime unavailable:

* inspect code
* mark runtime tests `SETUP_REQUIRED` or `PARTIAL`
* do not fake runtime PASS

---

## 76. Responsive / UI Security State Verification

Security pages/UI states should work on:

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

* forbidden/unauthorized pages readable
* rate limit errors readable
* security settings pages fit if any
* privacy request pages fit if any
* fraud report pages fit
* admin audit/security tables become cards
* provider secret masked fields fit
* no horizontal scroll
* action confirmations fit
* mobile tap targets large

If UI not fully checked, mark responsive `PARTIAL`.

---

## 77. Documentation Update Verification

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

## 78. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

* route protection inventory
* API route classification
* auth guard hardening
* role guard hardening
* admin separation hardening
* disabled/suspended user checks
* RLS final pass
* public-safe views
* hidden contact protection
* private document protection
* private media protection
* sensitive field classification
* provider secret masking
* service role server-only
* input validation hardening
* output sanitization
* CMS sanitizer hardening
* security headers
* CSP foundation
* CORS hardening
* CSRF foundation
* SSRF prevention
* open redirect prevention
* rate limit helper
* OTP/login rate limits
* inquiry/message/upload/ad/notification rate limits
* scraping prevention
* spam prevention
* fraud reports
* suspicious activity logs
* block/report hardening
* audit log hardening
* log redaction
* data retention foundation
* soft/hard delete rules
* privacy request foundation
* backup/restore readiness
* incident response foundation
* no fake security checks

Future features must not be marked done.

---

## 79. Changelog Verification

Check `CHANGELOG.md` includes Prompt 13 entry with:

* date
* summary
* changed files
* new routes/API routes
* migration files if any
* RLS/security changes
* rate-limit/fraud changes
* provider/security status changes
* checks/tests run
* docs updated
* verification status
* known issues
* rollback notes

If missing, update changelog.

---

## 80. Bugs And Fixes Verification

If issues are found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

* `BUG-SEC-SERVICE-ROLE-CLIENT`
* `BUG-SEC-PROVIDER-SECRET-LEAK`
* `BUG-SEC-HIDDEN-CONTACT-LEAK`
* `BUG-SEC-PUBLIC-ADMIN`
* `BUG-SEC-DIRECT-URL-BYPASS`
* `BUG-SEC-WRONG-USER-ACCESS`
* `BUG-SEC-FRONTEND-ONLY-AUTHZ`
* `BUG-SEC-RLS-MISSING`
* `BUG-SEC-PUBLIC-PRIVATE-TABLE`
* `BUG-SEC-PRIVATE-MEDIA-PUBLIC`
* `BUG-SEC-PRIVATE-DOC-PUBLIC`
* `BUG-SEC-PAYMENT-WEBHOOK-BYPASS`
* `BUG-SEC-PROVIDER-WEBHOOK-UNSAFE`
* `BUG-SEC-UPLOAD-VALIDATION-MISSING`
* `BUG-SEC-SVG-UNSAFE`
* `BUG-SEC-CMS-XSS`
* `BUG-SEC-OPEN-REDIRECT`
* `BUG-SEC-CSRF-RISK`
* `BUG-SEC-CORS-BROAD`
* `BUG-SEC-HEADERS-MISSING`
* `BUG-SEC-CSP-MISSING`
* `BUG-SEC-FAKE-RATE-LIMIT`
* `BUG-SEC-FAKE-FRAUD-PROTECTION`
* `BUG-SEC-OTP-ABUSE`
* `BUG-SEC-SCRAPING-UNBOUNDED`
* `BUG-SEC-LOG-SECRET-LEAK`
* `BUG-SEC-RAW-STACKTRACE`
* `BUG-SEC-AUDIT-MISSING`
* `BUG-SEC-BACKUP-ROLLBACK-MISSING`
* `BUG-SEC-MIGRATION-MISSING`
* `BUG-SEC-BUILD-FAIL`

Use existing bug ID convention if available.

---

## 81. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 13 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* route/API checks
* RLS checks
* hidden contact checks
* service role/provider secret checks
* auth/role/admin checks
* rate-limit checks
* fraud/spam/scraping checks
* webhook checks
* upload/payment/provider checks
* CMS/SEO security checks
* security headers/CSP/CORS/CSRF checks
* audit/log redaction checks
* backup/incident docs checks
* responsive widths
* commands run
* expected
* actual
* issues found
* result
* next step

Use exact status.

No vague “secure”.

---

## 82. Security Checklist Verification

`SECURITY_RLS_CHECKLIST.md` is the main document for this phase.

Verify it includes:

* route protection inventory
* API route classification
* RLS table inventory
* public view inventory
* sensitive field classification
* hidden contact checks
* private media/doc checks
* service role checks
* provider secret checks
* webhook security
* upload security
* payment security
* notification/provider security
* CMS/SEO security
* rate limit coverage
* fraud/spam/scraping coverage
* security headers/CSP/CORS/CSRF
* audit/log redaction
* retention/deletion
* backup/restore
* incident response
* known issues

If missing, update it before final response.

---

## 83. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

Include:

* rate limit store performance
* public API pagination limits
* RLS query indexes
* audit log indexes
* fraud event indexes
* suspicious activity retention
* search scraping limits
* upload limit performance
* webhook processing performance
* notification provider queue limits
* security header impact
* CSP report-only status
* build status
* future load/security test notes

---

## 84. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

Include:

* security route/middleware changes
* API auth guard changes
* RLS policy changes
* rate-limit migration changes
* fraud/security incident tables
* security headers/CSP rollback
* provider secret/env changes
* webhook changes
* audit/log changes
* rollback risks
* post-deploy security smoke checks
* verification status

If RLS/security middleware/header changes exist without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 85. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md`.

Relevant statuses:

* Supabase Auth
* Supabase Database/RLS
* Supabase Storage or R2
* Razorpay webhook
* OTP provider
* Email provider
* SMS provider
* WhatsApp provider
* Cloudflare R2/CDN
* Turnstile/Captcha
* WAF/CDN protection
* error monitoring
* analytics/GSC
* cron/jobs
* malware scanner
* backup provider

Rules:

* no provider active without real test/config
* setup-required states accurate
* test/sandbox labelled
* webhook/security status honest
* no provider secrets shown
* no fake security provider success

---

## 86. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 13 implementation summary
* Prompt 13 verification result
* changed files
* routes/API/security areas checked
* migrations/tables/RLS
* route guard status
* API classification status
* RLS status
* hidden contact status
* provider secret/service role result
* rate-limit/fraud status
* webhook security status
* upload/payment/provider/CMS security status
* CSP/headers/CORS/CSRF status
* privacy/retention/incident response status
* setup-required providers
* bugs/blockers
* commands run
* next prompt:

  * `prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`
* instruction not to proceed if Prompt 13 failed/blocked

---

## 87. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* route inventory completed
* API route classification completed
* private routes guarded server-side
* role/admin boundaries enforced
* disabled/suspended users handled
* direct URL bypass does not leak private data
* RLS enabled/reviewed/tested for private tables
* public views expose only safe fields
* hidden contact absent from public surfaces
* private media/docs protected
* wrong-user private data denied
* service role server-only
* provider secrets not exposed
* input validation present for critical mutations
* CMS/rich content sanitized
* open redirect blocked
* webhook security reviewed and critical webhooks safe
* upload/payment/provider security reviewed
* rate-limit foundation exists and critical endpoints covered or honestly setup-required without active abuse exposure
* fraud/spam/scraping foundation exists
* logs redact secrets/OTP/tokens
* audit logs cover high-risk actions or gaps documented
* private pages noindex/no-store
* retention/backup/incident docs updated
* docs updated
* no critical security/privacy bugs open

### PARTIAL

Use `PARTIAL` if:

* CSP is report-only/foundation
* durable rate limit store setup-required
* fraud detection foundation partial
* captcha/WAF setup-required
* malware scan setup-required
* backup restore test setup-required
* incident response docs foundation only
* RLS runtime tests unavailable but policies reviewed
* provider webhook runtime testing pending
* external security audit pending
* responsive/browser checks incomplete
* no active critical leak/bypass/secret exposure exists

Prompt 14 can start only if user/Super Admin accepts partial and no critical security/privacy issue exists.

### FAIL

Use `FAIL` if:

* build fails
* service role in client
* provider secret exposed
* hidden contact leak
* public admin access
* direct URL bypass leaks private data
* wrong-user private data access
* RLS missing on private table
* public select on private table
* frontend-only authorization on private mutation
* private media/doc public
* payment webhook bypass
* unsafe provider webhook mutates data
* unsafe CMS HTML executes
* open redirect exists
* raw secrets/OTP/tokens in logs
* private pages indexed with data
* DB changes missing migration

Do not start Prompt 14.

### BLOCKED

Use `BLOCKED` if:

* previous phase verification failed and security depends on it
* Supabase/RLS unavailable blocks final pass
* architecture conflict requires owner decision
* provider secret management unresolved
* route/API inventory impossible due to missing structure
* rate limit store unavailable and production decision depends on it
* cannot inspect required files
* package/build baseline broken

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* durable rate limit store missing
* captcha/WAF provider missing
* malware scanner missing
* error monitoring missing
* backup provider/setup missing
* cron cleanup/retention jobs missing
* CSP reporting endpoint missing
* external security audit missing
* production env/security headers not deployed
* Supabase env missing
* test users/admin roles unavailable

Setup-required is acceptable only when no active critical leak/bypass remains.

---

## 88. Prompt 14 Readiness Checklist

Prompt 14 can start only if:

* Prompt 13 implementation completed
* Prompt 13 verification completed
* no critical security/privacy bug open
* no service role client exposure
* no provider secret leak
* no hidden contact leak
* no public admin access
* no direct URL private data leak
* no wrong-user private data access
* no private table missing RLS
* no private media/doc public
* no payment webhook bypass
* no unsafe provider webhook mutation
* no unsafe CMS HTML execution
* no open redirect
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`

If Prompt 14 file is missing, stop and ask/generate it.

---

## 89. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 13 Verification — Security, Privacy, Fraud And Rate Limits

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Route/API Checks:
- route inventory:
- API classification:
- auth guards:
- role guards:
- admin guards:
- direct URL bypass:
- disabled/suspended users:

RLS/Database Checks:
- private table inventory:
- public views:
- policies reviewed:
- RLS tests:
- migration:
- indexes:

Privacy Checks:
- hidden contact:
- private documents:
- private media:
- leads/messages:
- billing/payment:
- notifications/providers:
- CMS/SEO:
- sensitive field classification:

Secrets/Service Role Checks:
- service role:
- provider secrets:
- env/example:
- masking:
- logs:

Validation/Web Security Checks:
- input validation:
- output sanitization:
- CMS sanitizer:
- security headers:
- CSP:
- CORS:
- CSRF:
- SSRF:
- open redirect:

Fraud/Rate Limit Checks:
- rate limit helper:
- OTP/login:
- inquiry/contact/message:
- upload/media:
- payment/billing:
- ads/notifications/providers:
- scraping/search:
- spam:
- fraud reports:
- suspicious activity:

Webhook/Provider Checks:
- payment webhook:
- provider webhooks:
- idempotency:
- safe logs:
- setup-required:

Audit/Retention/Incident Checks:
- audit logs:
- log redaction:
- retention:
- soft/hard delete:
- privacy requests:
- backup/restore:
- incident response:

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
- Security/privacy/fraud/rate-limit foundation is safe and ready for Prompt 14.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 14:
- Yes/No

Next Step:
- prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md or fix blockers first.
```

---

## 90. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 13 Security/Privacy/Fraud/Rate Limits verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Route/API security:
- route inventory:
- API classification:
- auth guards:
- role guards:
- admin guards:
- direct URL bypass:
- disabled/suspended users:

RLS/database:
- migrations:
- private tables:
- public views:
- policies:
- indexes:
- RLS test result:

Privacy/data protection:
- hidden contact:
- private documents:
- private media:
- leads/messages/proposals/site visits:
- billing/payment/GST:
- notifications/ads/providers:
- CMS/SEO:
- sensitive field classification:

Secrets/service role:
- service role:
- provider secrets:
- .env.example:
- masking/log redaction:
- rotation needed:

Validation/web security:
- input validation:
- output sanitization:
- CMS HTML:
- security headers:
- CSP:
- CORS:
- CSRF:
- SSRF:
- open redirect:

Fraud/rate limits:
- rate limit helper:
- OTP/login:
- inquiry/contact/message:
- upload/media:
- payment/billing:
- ads/notifications/providers:
- scraping/search:
- spam:
- fraud reports:
- suspicious activity:

Webhook/security reviews:
- payment webhook:
- provider webhooks:
- upload security:
- provider security:
- notification security:
- ad security:
- CMS/SEO security:

Audit/retention/incident:
- audit logs:
- log redaction:
- retention:
- soft/hard delete:
- privacy requests:
- backup/restore:
- incident response:

Responsive:
- widths tested:
- security states:
- admin security pages:
- privacy/fraud pages:
- horizontal scroll:

Provider/setup-required:
- rate limit store:
- captcha/WAF:
- malware scan:
- error monitoring:
- backup:
- cron/jobs:
- CSP reporting:
- external audit:
- Supabase/test roles:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 14:
- Yes/No
- reason

Next step:
- prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
```

Do not write vague “secure”.

---

## 91. If Verification Fails

If verification fails:

1. do not start Prompt 14
2. create/update bug entries
3. update `MANUAL_VERIFICATION.md`
4. update `SECURITY_RLS_CHECKLIST.md`
5. update `PERFORMANCE_CHECKLIST.md`
6. update `DEPLOYMENT_ROLLBACK.md`
7. update `API_PROVIDER_STATUS.md` if provider/security issue found
8. update `brain.md`
9. state exact blocker
10. fix if safe and in scope
11. rerun verification
12. only then proceed

Critical security/privacy failures block progress.

---

## 92. If Verification Is Partial

If verification is partial:

* document exact partial items
* list setup-required providers/infrastructure
* list RLS runtime gaps
* list rate-limit/fraud gaps
* list CSP/header gaps
* list backup/incident gaps
* list external audit gaps
* confirm no service role client exposure
* confirm no provider secret leak
* confirm no hidden contact leak
* confirm no public admin
* confirm no direct URL private data leak
* confirm no wrong-user private data access
* confirm no private table missing RLS
* confirm no private media/doc public
* confirm no payment webhook bypass
* confirm no unsafe CMS HTML/open redirect
* update docs
* ask/require owner acceptance before Prompt 14 if risk is significant

Acceptable partial examples:

* durable rate limit store setup-required but helper/foundation exists
* CSP report-only
* WAF/captcha setup-required
* malware scan setup-required
* external security audit not done
* backup restore test not done
* incident response docs foundation only
* RLS runtime tests unavailable but policies reviewed

Not acceptable partial without fix:

* provider secret leak
* service role client exposure
* hidden contact leak
* public admin access
* wrong-user private data access
* direct URL private data leak
* private media/doc public
* RLS missing on private table
* payment webhook bypass
* unsafe CMS HTML
* open redirect
* build fail

---

## 93. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `DEPLOYMENT_ROLLBACK.md`
* update `API_PROVIDER_STATUS.md` if relevant
* update `brain.md`
* final response should say Prompt 14 can start

Do not start Prompt 14 automatically unless user asked to continue.

---

## 94. What Not To Do In This Verification

Do not:

* disable RLS to make tests pass
* bypass backend permissions
* ignore direct URL bypass
* ignore provider secret leaks
* ignore service role exposure
* ignore hidden contact leaks
* mark rate limits active if fake
* mark fraud protection active if fake
* mark webhook verified if untested/unimplemented
* mark backup tested if not tested
* mark CSP complete if only placeholder
* expose secrets in final response
* paste raw private logs
* start Prompt 14 after FAIL/BLOCKED

---

## 95. Quality Bar

This verification is successful when future phases can trust that:

* route guards are server-side
* role/admin boundaries are enforced
* direct URL bypasses are blocked
* private data is RLS-protected
* hidden contact is protected everywhere
* private media/docs remain private
* provider secrets are server-only
* service role is server-only
* critical inputs are validated
* rich content is sanitized
* web security headers/CSP foundation exists
* open redirects are blocked
* critical webhooks are verified/idempotent or honestly setup-required
* critical abuse endpoints have rate-limit foundation
* spam/scraping/fraud foundations exist
* logs redact sensitive data
* audit logs cover high-risk actions or gaps are documented
* backup/incident docs are updated
* no fake security status exists
* Prompt 14 can focus on performance/caching/deployment/launch readiness

---

## 96. Final Rule For Prompt 13 Verification

Verify security honestly.

Verify routes honestly.

Verify API guards honestly.

Verify RLS honestly.

Verify hidden contact honestly.

Verify private data honestly.

Verify provider secrets honestly.

Verify service role honestly.

Verify validation honestly.

Verify webhooks honestly.

Verify rate limits honestly.

Verify fraud foundation honestly.

Verify logs/audit honestly.

Verify backup/incident docs honestly.

Do not weaken RLS.

Do not expose secrets.

Do not leak hidden contact.

Do not allow public admin.

Do not allow direct URL bypass.

Do not rely on frontend-only authorization.

Do not fake rate limits.

Do not fake fraud protection.

Do not fake webhook verification.

Do not fake backup readiness.

Do not mark PASS without security/privacy/RLS checks.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
