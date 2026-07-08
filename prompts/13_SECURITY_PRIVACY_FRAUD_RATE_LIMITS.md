# prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md

# My Gujarat Property — Prompt 13: Security, Privacy, Fraud And Rate Limits

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 9 (contact reveal) & 15 (audit/security/fraud)**, `design-prompts/DESIGN_ADDONS_MASTER.md`, deltas `report-batch-09/15.md`, and `docs/14` "Design Add-Ons". Locked: append-only audit w/ masked IP, contact-reveal logs meta-audited + abuse flag, named threat types + auto-block, maker-checker self-approval disabled, reason-required+logged enforcement.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
```

This phase implements and hardens the security, privacy, fraud prevention and rate-limit foundation for **My Gujarat Property**:

* full auth guard audit
* route protection
* admin/public separation
* RLS final pass foundation
* database policy review
* hidden contact protection
* private document protection
* private media protection
* private message/lead/billing/provider data protection
* service role server-only enforcement
* provider secret masking
* input validation hardening
* output sanitization
* security headers
* CSP foundation
* CORS hardening
* CSRF protection foundation
* XSS prevention
* SSRF prevention
* upload abuse prevention
* payment webhook security review
* provider webhook security review
* rate limits
* spam prevention
* scraping prevention
* fraud reporting
* suspicious activity logs
* device/session security foundation
* login attempt protection
* OTP abuse/cost protection
* admin session hardening
* audit log hardening
* log redaction
* data retention foundation
* soft delete/restore/hard delete rules
* backup/restore verification foundation
* incident response foundation
* security checklist updates
* no fake security
* no fake RLS pass
* no fake fraud protection
* no fake rate limit
* no fake PASS

Do not weaken RLS.

Do not bypass backend permissions.

Do not expose service role keys.

Do not expose provider secrets.

Do not leak hidden contact.

Do not mark security as complete without checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
Prompt Number: 13
Phase: Security, Privacy, Fraud And Rate Limits
Type: Implementation Prompt
Matching Verification Prompt: prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
Previous Verification Prompt: prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
```

---

## 2. Phase Purpose

The purpose of this phase is to harden the entire My Gujarat Property platform before performance/deployment/final production phases.

This phase should implement or strengthen:

* authentication guards
* authorization checks
* role boundaries
* admin separation
* direct URL bypass prevention
* server-side permission checks
* RLS coverage
* RLS policy consistency
* hidden contact protection
* private data masking
* sensitive data classification
* audit logging
* security headers
* CSP foundation
* CORS rules
* CSRF protection foundation
* input validation
* XSS prevention
* SSRF prevention
* file upload security
* payment/provider webhook security
* rate limiting
* spam prevention
* scraping prevention
* suspicious activity detection foundation
* fraud report foundation
* abuse moderation hooks
* provider secret scanning
* service role key scanning
* secure error handling
* log redaction
* privacy consent protection
* data retention rules
* soft delete/hard delete rules
* backup/restore readiness foundation
* incident response documentation
* security docs updates
* checks/tests
* handoff to manual verification prompt

This phase should not replace previous features. It should harden them.

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

Also inspect existing security, auth, middleware, RLS, provider, upload, payment, API route and validation code before editing.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
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
src/components/
components/
supabase/migrations/
supabase/policies/
.env.example
```

Search for:

* service role usage
* provider secrets
* public API routes
* missing auth guards
* missing role guards
* client-side-only permission checks
* direct URL bypass risk
* raw SQL
* unsafe HTML
* dangerouslySetInnerHTML
* file upload endpoints
* payment webhooks
* provider webhooks
* notification delivery
* hidden contact fields
* private media/document URLs
* admin routes
* dashboard routes
* API routes without auth
* RLS disabled tables
* permissive policies
* public buckets/private files
* fake rate limits
* fake security flags
* fake fraud checks
* log leaks
* stack trace leaks

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement or harden:

### 5.1 Auth And Route Security

* middleware route protection
* server-side auth helpers
* role guard helpers
* admin-only guards
* dashboard role guards
* API route auth guards
* direct URL denial
* disabled/suspended account denial
* session expiry foundation
* admin session timeout foundation
* login attempt tracking foundation

### 5.2 RLS Hardening

* RLS table inventory
* RLS enabled checks
* policy review
* public-safe views
* private table isolation
* user ownership policies
* admin/staff permission policies
* service role server-only usage
* RLS docs updates

### 5.3 Privacy Hardening

* hidden contact masking
* private document masking
* private media signed URL checks
* private lead/message/billing/notification data isolation
* data classification
* log redaction
* consent record protection
* privacy request foundation
* retention/deletion foundation

### 5.4 Fraud / Abuse / Rate Limits

* rate-limit helper
* login/OTP rate limits
* inquiry/contact rate limits
* message rate limits
* proposal rate limits
* upload rate limits
* ad impression/click rate limits
* notification delivery rate limits
* provider test send rate limits
* search/scraping rate limits
* support/grievance spam limits
* suspicious activity logs
* fraud report foundation
* block/report foundation hardening

### 5.5 Web / App Security

* CSP foundation
* security headers
* CORS hardening
* CSRF protection foundation
* safe cookies
* XSS prevention
* SSRF prevention
* open redirect prevention
* safe error handling
* dependency/security audit notes

### 5.6 Provider / Payment / Upload Security

* webhook signature verification review
* webhook idempotency review
* provider secret masking
* upload file validation
* SVG/PDF/video safety
* R2/private media safety
* Razorpay webhook safety
* external provider setup status

### 5.7 Docs

Update all memory docs.

---

## 6. Out Of Scope For This Phase

Do not fully implement:

* full SOC2/ISO compliance
* full automated penetration testing
* full SIEM integration
* final WAF configuration
* full device fingerprinting vendor integration
* full fraud ML model
* full malware scanning vendor if missing
* final legal privacy compliance signoff
* final disaster recovery drill if infrastructure missing
* final bug bounty program
* final external security audit
* final production load/security test

This phase may create foundations and setup-required states.

---

## 7. Hard Security Rules

Claude must enforce:

```txt id="hard-security-rules"
No service role in client.
No provider secrets in client.
No hidden contact leak.
No public admin.
No direct URL bypass.
No frontend-only authorization.
No RLS disabled on private tables.
No public private media/docs.
No fake payment webhook security.
No fake provider webhook security.
No fake rate limits.
No fake fraud protection.
No raw stack traces to users.
No unsafe CMS HTML.
No open redirects.
No fake security PASS.
```

Forbidden:

* disabling RLS to make feature work
* broad public select on private tables
* permissive policies without justification
* trusting client role
* trusting client price/payment status
* trusting client media category/object key
* storing secrets in DB/plain UI
* logging OTP/payment/provider secrets
* showing hidden contact in public JSON
* marking untested security as PASS

---

## 8. Security Inventory Required

Create or update a security inventory in `SECURITY_RLS_CHECKLIST.md`.

Inventory must include:

* route groups
* API routes
* database tables
* storage buckets
* provider secrets
* webhook endpoints
* sensitive fields
* public views
* admin modules
* rate-limited endpoints
* audit logs
* known gaps

Security inventory should be concise but complete.

---

## 9. Route Protection Inventory

Inspect and classify routes:

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

For each route group, verify:

* access level
* auth requirement
* role requirement
* permission requirement
* noindex/no-store need
* rate limit need
* RLS dependency
* sensitive output risk

Do not leave private route unclassified.

---

## 10. Auth Guard Requirements

Auth guard must cover:

* dashboards
* profile/settings
* leads/CRM/messages/proposals/site visits
* billing
* media upload
* notifications
* saved items
* ads builder dashboard
* admin routes
* private API routes
* signed URL routes
* provider settings
* private CMS preview

Rules:

* guest denied private routes.
* auth must be server-side.
* client-only redirect is not security.
* private data must not render before redirect.
* safe login redirect/original intent preserved.
* disabled/suspended users denied where applicable.

---

## 11. Role Guard Requirements

Role guard must enforce:

* Owner routes for Owner only
* Broker routes for Broker only
* Builder routes for Builder only
* Admin/staff routes separate
* Super Admin/Admin/Staff permissions separate
* Public users cannot access admin
* Admin/staff cannot use public mobile OTP admin login
* Owner/Broker cannot post projects
* Builder cannot post properties
* Owner/Broker cannot create builder ads
* Wrong user cannot view another user's private data

Rules:

* server-side role check.
* direct URL bypass denied.
* UI hiding not enough.
* role from trusted server/session/profile only.
* role change pending does not grant new role.

---

## 12. Admin Security Requirements

Admin security must enforce:

* separate admin login
* no public registration
* no mobile OTP admin login
* invite-only staff/admin
* admin routes noindex/no-store
* staff disabled/suspended denied
* staff permissions server-side
* no self-grant permissions
* provider settings permission-restricted
* refund/payment/provider/security actions high-risk
* audit admin actions
* no provider secrets visible
* no public admin links

If admin hardening is partial, document exact gaps.

---

## 13. Direct URL Bypass Hardening

Check and fix direct URL bypass for:

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

Rules:

* wrong user denied.
* wrong role denied.
* private data not rendered before redirect.
* API/action denied.
* RLS denies backend queries.
* no metadata leak.

---

## 14. API Route Security Requirements

Every API route must be classified:

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

For each API route:

* validate method
* validate input
* authenticate if needed
* authorize if needed
* rate limit if needed
* use safe errors
* avoid secrets in response
* avoid private data leak
* avoid raw stack traces
* enforce idempotency for webhooks/events
* no fake success

---

## 15. RLS Final Pass Requirements

Perform RLS final pass for tables created across prompts.

Private table categories:

* profiles
* roles/permissions
* properties/projects/requirements drafts/pending/private
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

Rules:

* RLS enabled on private tables.
* public can read only public-safe views/rows.
* users can read own rows only.
* owners/builders/brokers can read own entity rows only.
* admins/staff permission-scoped.
* no broad `using (true)` on private tables.
* no public `select *` on private tables.
* no client service role.

---

## 16. Public View Requirements

Public views must expose only safe fields.

Public views can include:

* published property/project listing data
* public media variants
* public profile info
* public active ads
* published CMS/blog/legal pages
* active public locations

Public views must exclude:

* hidden contact
* exact private address where not public
* private docs
* private media originals
* draft/pending/rejected/deleted data
* admin notes
* private lead/message/proposal/site visit data
* payment/billing/provider data
* private user identity fields
* raw owner email/phone unless public-approved

---

## 17. Sensitive Field Classification

Create/update sensitive field classification in `SECURITY_RLS_CHECKLIST.md`.

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
* password/session tokens
* provider secrets
* service role key
* payment identifiers
* GSTIN
* billing address
* private documents
* exact address if hidden
* private media originals
* private notes
* admin notes
* message body
* support/grievance content
* IP/user agent if stored
* fraud signals
* audit logs

---

## 18. Hidden Contact Protection

Verify and harden hidden contact across:

* public search cards
* public detail pages
* public profiles
* SEO metadata
* schema
* sitemap
* notifications
* provider payloads
* lead responses
* message/proposal/site visit payloads
* media filenames/alt/caption
* PDF metadata
* ad creatives
* logs/errors
* public APIs

Rules:

* hidden contact not stored in public HTML.
* hidden contact not returned to unauthorized API clients.
* hidden contact not leaked through JSON props.
* hidden contact not in schema/sitemap.
* hidden contact not in notification previews.
* reveal only through authorized contact reveal flow.
* contact reveal audited if implemented.

---

## 19. Private Document Protection

Private documents include:

* verification docs
* RERA proof docs
* ownership proof
* company documents
* payment proof
* support attachments
* fraud evidence
* admin documents
* private media originals

Rules:

* private bucket only.
* signed URL only.
* auth/permission check.
* short TTL.
* access audit where sensitive.
* not in sitemap.
* no public CDN.
* no open access.
* no provider secret leak.
* no wrong user access.

---

## 20. Private Message / Lead Protection

Protect:

* leads
* contact requests
* contact reveals
* proposals
* message threads
* site visits
* notes
* follow-ups
* attachments
* notification events

Rules:

* participant-only.
* wrong user denied.
* admin/staff permission-scoped.
* public denied.
* private pages noindex/no-store.
* hidden contact protected.
* direct URL bypass denied.
* RLS policies match app permissions.

---

## 21. Billing / Payment Privacy Protection

Protect:

* subscriptions
* payment orders
* payment attempts
* payments
* invoices
* invoice line items
* GST profiles
* refunds
* credit notes
* payment webhook events
* billing audit logs

Rules:

* own-user only.
* admin/staff permission-scoped.
* public denied.
* provider secrets masked.
* webhook payload protected.
* no fake payment success.
* no client callback activation.
* no wrong user invoice access.
* private pages noindex/no-store.

---

## 22. Provider Secret Protection

Provider secrets include:

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

Rules:

* server-only.
* no client bundle exposure.
* no UI reveal.
* no logs.
* no audit logs.
* no final response.
* no docs except placeholder names.
* `.env.example` placeholders only.
* leaked secret requires bug, rotation note and FAIL.

---

## 23. Service Role Rules

Service role key must:

* never be used in client components.
* never be imported into browser code.
* never be exposed in API response.
* only be used in trusted server-only code.
* be isolated in clearly named server-only module.
* not be used to bypass RLS unless necessary and documented.
* require explicit permission checks before privileged operations.
* be absent from edge/client bundles if unsafe.

Search and fix any unsafe service role usage.

---

## 24. Input Validation Hardening

All user input must be validated server-side.

Important inputs:

* auth fields
* profile fields
* role changes
* property/project/requirement fields
* location fields
* inquiry/contact/message/proposal fields
* payment/coupon/GST fields
* media upload metadata
* CMS/blog/legal content
* ad campaign fields
* notification templates
* provider configs
* redirect URLs
* search params
* support/grievance forms

Rules:

* use schemas/allowlists.
* reject invalid types.
* sanitize strings.
* validate IDs exist and belong to user.
* validate enum values.
* validate numeric ranges.
* validate URLs.
* validate dates.
* avoid trusting client role/status.

---

## 25. Output Sanitization / XSS Prevention

Harden output rendering.

Risk areas:

* CMS/blog/legal body
* user notes
* messages
* ad titles/creative captions
* property/project titles/descriptions
* location names
* support/grievance text
* notification templates
* admin notes
* profile descriptions
* rich text fields

Rules:

* escape by default.
* sanitize rich HTML server-side.
* avoid unsafe `dangerouslySetInnerHTML`.
* if used, require sanitizer and safe allowlist.
* block script/event handlers.
* block unsafe iframes.
* block javascript/data URLs.
* avoid rendering raw provider/webhook payload.

---

## 26. CSRF Protection Foundation

For state-changing actions:

* server actions/auth checks required.
* API mutations require auth and method checks.
* same-site cookies configured.
* CSRF token or framework equivalent documented for high-risk APIs.
* admin/provider/payment actions protected.
* webhook endpoints excluded from CSRF but signature/idempotency protected.
* public forms rate-limited and validated.

If CSRF protection relies on framework defaults, document exact behavior.

---

## 27. CORS Requirements

CORS should be strict.

Rules:

* no wildcard CORS for authenticated/private APIs.
* public APIs only allow needed methods.
* credentials not allowed for untrusted origins.
* provider webhooks do not rely on CORS for security.
* admin/provider APIs not callable cross-origin with credentials.
* local dev config separated from production.

If CORS is broad due to provider needs, document and restrict by route.

---

## 28. Security Headers Requirements

Add or verify security headers:

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

Rules:

* CSP should be compatible with Next.js and providers.
* start with report-only if strict CSP may break app.
* do not allow unsafe-inline broadly without reason.
* iframe providers allowlisted only for approved embeds.
* uploads/media domains allowlisted.
* payment provider scripts allowlisted only where needed.
* admin pages protected against framing.

---

## 29. CSP Foundation

CSP should consider:

* own domain
* Supabase
* Cloudflare R2/CDN
* Razorpay checkout
* Maps provider if configured
* image/media CDN
* analytics if configured
* safe iframe providers
* no arbitrary script domains
* no user-provided script
* no unsafe iframe

If strict CSP not fully implemented:

* add documented foundation
* mark `CSP_PARTIAL`
* do not claim full CSP PASS

---

## 30. SSRF Prevention

Risk areas:

* virtual tour URL
* external image URL if allowed
* CMS embeds
* webhook callbacks
* provider test URLs
* redirect destination checks
* map/geocode APIs
* PDF/image processing external URLs

Rules:

* do not fetch arbitrary user-provided URLs server-side.
* allowlist providers.
* block localhost/private IP ranges if server fetch exists.
* block file:// and internal metadata endpoints.
* validate URL scheme.
* avoid proxying arbitrary URLs.
* document if no server-side external fetch exists.

---

## 31. Open Redirect Prevention

Risk areas:

* auth redirect/original action
* ad click tracking
* notification deep links
* redirect manager
* support links
* payment return URL
* provider callback return

Rules:

* internal relative routes preferred.
* allowlist external destinations if needed.
* block `javascript:`, `data:`, protocol-relative unsafe links.
* prevent redirect loops.
* never redirect to private URL without auth.
* no open redirect.

---

## 32. Rate Limit Foundation

Implement or strengthen rate limit helper.

Rate limit dimensions:

* IP hash
* profile ID
* session ID
* phone number hash for OTP
* email hash
* route/action key
* entity ID
* provider channel
* user role
* time window

Rate limit storage options:

* database table
* Redis/Upstash if configured
* in-memory dev-only fallback
* provider/WAF setup-required

Rules:

* production should not rely only on in-memory if multi-instance.
* if durable rate limit store missing, mark setup-required/partial.
* no fake rate limit.
* safe error `RATE_LIMITED`.

---

## 33. Rate-Limited Actions

Add/foundation rate limits for:

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
cms_comment_if_any
search_requests
public_detail_scraping
admin_login_attempt
admin_provider_change
```

Each action should have:

* sensible limit
* window
* actor dimension
* safe error
* audit/suspicious event if high-risk
* docs status

If exact limits are not final, make configurable.

---

## 34. OTP Abuse Protection

Public mobile OTP must have:

* per phone limit
* per IP limit
* per session limit
* verify attempt limit
* cooldown
* resend delay
* provider cost guard
* dev/test mode clearly labelled
* production no fake OTP
* logs redacted
* no OTP in client logs
* no OTP in final response

Admin login must not use public OTP.

If OTP provider not configured, status setup-required.

---

## 35. Login Attempt Protection

Login protection should include:

* failed login attempt tracking
* temporary lock/cooldown
* admin login stricter limits
* suspicious login event foundation
* safe error messages
* no account enumeration where possible
* session invalidation foundation
* device/session log foundation if implemented
* provider setup-required for alerts

---

## 36. Scraping Protection Foundation

Protect public pages/APIs:

* search result API
* property/project detail APIs
* public profiles
* public media APIs
* public ads APIs
* location autocomplete

Foundation may include:

* rate limits
* pagination limits
* bot/crawler controls
* Turnstile/Captcha setup-required for abuse
* robots rules
* no hidden contact in public payload
* no unbounded public queries
* suspicious activity logs

Do not block legitimate search engine crawling of public-safe pages without reason.

---

## 37. Spam Protection Foundation

Protect:

* inquiries
* contact requests
* messages
* proposals
* site visits
* support/grievance forms
* missing location requests
* ad campaign submissions
* reviews/comments if any later

Foundation may include:

* rate limits
* duplicate prevention
* block/report
* content length/URL limits
* suspicious keyword flag
* attachment restrictions
* cooldowns
* admin review queue
* provider/captcha setup-required

Do not fake spam protection.

---

## 38. Fraud Report Foundation

Fraud reporting should support or verify:

* report listing
* report project
* report profile
* report message
* report ad
* report payment issue
* report fake RERA/ownership
* report spam/scam

Report statuses:

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

Rules:

* user can submit report.
* reports private.
* reported party does not see reporter identity unless policy.
* admin/staff permission-scoped.
* no fake report success if not stored.
* abuse reports rate-limited.
* audit actions.

---

## 39. Suspicious Activity Logs

Suspicious events may include:

* repeated OTP requests
* repeated failed login
* direct URL denied repeatedly
* scraping rate threshold
* repeated contact requests
* message spam
* proposal spam
* upload abuse
* payment webhook invalid signature
* provider webhook invalid signature
* ad click spam
* admin permission denial
* provider secret access attempt

Store:

* actor profile ID optional
* IP hash optional
* action key
* entity ID optional
* severity
* reason
* created_at
* resolved_at

Rules:

* privacy-safe.
* no raw secrets.
* no hidden contact.
* permission-scoped.
* no fake events.

---

## 40. Account Status Hardening

Account statuses may include:

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

Rules:

* suspended/banned users cannot perform sensitive actions.
* disabled staff cannot access admin.
* deleted users cannot login/use private data.
* under_review may have limited access.
* status checks server-side.
* status changes audited.
* no client-only status enforcement.

---

## 41. Block / Report User Hardening

If user block/report exists:

* blocker can block direct messages/contact attempts.
* blocked user cannot message/contact where applicable.
* report creates private record.
* admin can review.
* block/report status private.
* abuse of report rate-limited.
* wrong user denied.
* no fake block/report.

If not implemented, update feature registry as partial/setup-required.

---

## 42. Audit Log Hardening

Audit logs should cover high-risk actions:

* auth/admin login
* role changes
* admin permission changes
* staff invite/disable
* RLS/security setting changes
* listing/project/requirement approval
* contact reveal
* private doc access
* payment webhook/payment/refund/credit note
* invoice issue
* provider changes/tests
* ad approval/pause/suspend
* legal/CMS publish
* redirects
* media signed URL for sensitive docs
* user suspension/deletion
* data export/delete request
* security incident updates

Audit logs must:

* be tamper-resistant as practical.
* be permission-scoped.
* avoid secrets.
* redact sensitive fields.
* include actor/action/entity/timestamp.
* not be user-editable.

---

## 43. Log Redaction Requirements

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

Use redaction helpers for:

* phone
* email
* token
* secret
* authorization header
* cookie
* signed URL
* payment identifiers where needed

---

## 44. Error Handling Hardening

User-facing errors must be safe:

* no stack traces
* no SQL errors
* no provider secrets
* no policy internals
* no hidden contact
* no raw webhook errors
* no file paths
* no environment variable names with values
* no DB connection details

Use typed errors and generic fallback.

Admin errors can include more context but still no secrets.

---

## 45. Webhook Security Review

Review webhooks:

* Razorpay payment webhook
* provider delivery callbacks
* SMS/WhatsApp/email callbacks
* media/provider callbacks if any
* future analytics hooks

For each webhook:

* signature verification if supported
* idempotency
* event allowlist
* amount/currency validation for payment
* safe raw body handling
* safe logs
* no secret in response
* rate limit/foundation
* retry-safe processing
* no fake success

If webhook security incomplete, mark setup-required/partial or fix.

---

## 46. Payment Security Review

Review Prompt 09 payment security:

* no client callback activation
* webhook signature verified
* webhook idempotency
* amount/currency validation
* invoice unique sequence
* refund permission
* admin manual grant audited
* client price not trusted
* wrong user billing denied
* payment secrets server-only
* private billing noindex/no-store

Fix critical gaps if found.

---

## 47. Upload Security Review

Review Prompt 10 upload security:

* file type validation
* MIME/magic bytes where possible
* size limits
* SVG safety
* PDF/video safety
* private bucket/signing
* wrong user media denied
* hidden contact metadata protected
* service role/server-only
* upload rate limits
* orphan cleanup status
* malware scan setup-required if missing

Fix critical gaps if found.

---

## 48. Notification / Provider Security Review

Review Prompt 12:

* notification recipient correctness
* unread count real
* hidden contact not in notification
* provider secrets masked
* fake delivery prevented
* provider logs private
* provider webhook idempotency/signature status
* ad click open redirect blocked
* public ads active/approved only
* sponsored label
* provider test send rate-limited

Fix critical gaps if found.

---

## 49. CMS / SEO Security Review

Review Prompt 11:

* CMS sanitizer
* draft pages private
* legal placeholder not final
* no hidden contact metadata/schema/sitemap
* open redirect blocked
* sitemap excludes private routes
* robots private routes
* search params validated
* no fake SEO counts/reviews
* admin CMS/legal permission checks

Fix critical gaps if found.

---

## 50. Data Retention Foundation

Data retention should be documented for:

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

Rules:

* legal/financial records may have retention requirements.
* user deletion may anonymize where retention required.
* hard delete only after retention/permission.
* audit logs generally not normally deleted.
* private media cleanup respects retention.
* docs updated.

---

## 51. Soft Delete / Restore / Hard Delete Rules

Soft delete should be default for:

* properties/projects/requirements
* campaigns
* media metadata
* CMS/blog/legal content
* notifications if archived/deleted
* support/fraud records
* user-generated messages if policy allows deletion/hiding

Hard delete:

* Super Admin only where allowed.
* after retention.
* backup/rollback considered.
* audit event required.
* private files cleanup considered.
* RLS still enforced.

Do not implement destructive deletion without docs and rollback notes.

---

## 52. Privacy Request Foundation

Privacy request types:

```txt id="privacy-request-types"
data_export
data_correction
data_delete
consent_withdrawal
marketing_unsubscribe
account_deactivation
account_deletion
```

Rules:

* user can request own data action if implemented.
* request private/RLS protected.
* admin/staff permission-scoped.
* no fake completed request.
* retention/legal hold respected.
* status visible to requester.
* actions audited.

If not implemented, mark setup-required/foundation.

---

## 53. Consent Hardening

Review consent records:

* terms accepted
* privacy accepted
* cookie preference
* contact sharing consent
* payment/trial consent
* marketing opt-in/out
* notification preferences
* WhatsApp/SMS/email opt-in

Rules:

* policy version stored where implemented.
* required consent explicit.
* marketing not prechecked.
* records private.
* no fake consent.
* consent changes audited if needed.

---

## 54. Backup / Restore Readiness Foundation

Review backup/restore docs and code impact.

This phase should update docs for:

* DB backup before destructive migration
* storage/R2 backup/lifecycle
* invoice/payment data protection
* media object retention
* audit log retention
* rollback procedure
* restore test status
* RPO/RTO placeholder
* production backup setup-required if not configured

Do not claim backups tested unless actually tested.

---

## 55. Incident Response Foundation

Create/update incident response notes in docs.

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

For each, document:

* detection
* immediate containment
* user impact assessment
* secret rotation
* rollback
* data restore
* communication placeholder
* post-incident review

Do not claim full incident system if not implemented.

---

## 56. Security Headers / Middleware Implementation

If using Next.js, add/update security headers in:

* `next.config.*`
* middleware
* route handlers
* hosting config if present

Rules:

* avoid breaking provider scripts.
* payment checkout allowed only where needed.
* map/embed providers allowlisted only if configured.
* media/CDN domains allowlisted.
* admin pages no frame.
* start CSP report-only if strict enforcement could break app.
* document partial status.

---

## 57. Rate Limit Storage Table

If DB-based rate limit foundation is used, possible table:

```txt id="rate-limit-table"
rate_limit_events
```

Fields:

* id
* actor_type
* actor_hash
* profile_id
* action_key
* route
* entity_type
* entity_id
* window_start
* count
* limit_value
* blocked_until
* created_at
* updated_at

Rules:

* RLS/admin-only.
* public cannot read.
* privacy-safe hashes.
* no raw secrets.
* cleanup/retention documented.
* production scale reviewed.

---

## 58. Fraud / Abuse Tables

Possible tables:

```txt id="fraud-abuse-tables"
fraud_reports
suspicious_activity_events
blocked_profiles
blocked_contact_pairs
abuse_rate_limit_events
security_incidents
security_incident_events
```

Only create if needed.

Rules:

* private/RLS.
* reporter identity protected.
* admin/staff permission-scoped.
* no fake reports/events.
* audit actions.
* retention documented.

---

## 59. Security Incident Status Values

Incident statuses:

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

Severity values:

```txt id="security-severity-values"
low
medium
high
critical
```

Rules:

* incident system can be foundation only.
* no fake incidents.
* access permission-scoped.
* sensitive details protected.
* incident docs updated.

---

## 60. RLS / Security Migration Rule

If DB changes are needed, create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_security_privacy_fraud_rate_limits.sql
```

Migration must include:

* purpose
* phase: Prompt 13
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* rate-limit tables if any
* fraud/abuse/security incident tables if any
* audit/log redaction fields if any
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 61. Suggested Indexes

Add/verify indexes for:

### Rate Limits

* actor_hash
* profile_id
* action_key
* window_start
* blocked_until
* created_at

### Suspicious Activity

* profile_id
* action_key
* severity
* created_at
* resolved_at

### Fraud Reports

* reporter_profile_id
* target_type
* target_id
* status
* created_at

### Security Incidents

* severity
* status
* created_at
* resolved_at

### Audit Logs

* actor_profile_id
* action
* entity_type
* entity_id
* created_at

---

## 62. Security Helper Requirements

Implement or verify helpers:

```txt id="security-helpers"
requireAuth
requireRole
requireAdminPermission
requireEntityOwner
requireParticipant
requireNotSuspended
assertSafeRedirect
sanitizeHtml
sanitizeText
redactSensitive
maskPhone
maskEmail
validateSearchParams
validateWebhookSignature
checkRateLimit
recordSuspiciousActivity
recordAuditEvent
getSafePublicProfile
getSafePublicListing
getSignedPrivateMediaUrl
```

Each helper should be server-safe where needed.

Do not rely on client-only helpers for security.

---

## 63. Safe Public Payload Helpers

Create/verify safe payload helpers for:

* property cards/detail
* project cards/detail
* requirement public/scoped views
* profile public view
* ads public view
* notifications
* media public view
* SEO metadata/schema
* CMS/blog/legal content

Rules:

* remove hidden contact.
* remove private notes/docs.
* remove admin fields.
* remove provider/payment secrets.
* remove private exact address if hidden.
* include only public-safe media.
* ensure consistent masking.

---

## 64. Admin Sensitive View Controls

For sensitive admin data:

* hidden contact
* private docs
* provider logs
* payment data
* fraud reports
* support/grievance details
* audit logs
* security incidents

Require:

* explicit permission
* audit view action if high-risk
* masking by default
* reveal reason where needed
* no bulk export without permission
* no provider secrets ever

---

## 65. Export Security

If exports exist or are planned:

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

If exports not implemented, document not-started/setup-required.

---

## 66. Search / Public API Limits

Public endpoints should have:

* pagination limit
* maximum page size
* maximum query length
* filter allowlist
* sort allowlist
* rate limits/foundation
* safe public fields
* no hidden contact
* no private/pending data
* no unbounded joins
* safe errors

---

## 67. Admin / Staff Permission Review

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

Rules:

* server-side permission checks.
* disabled staff denied.
* no staff self-grant.
* Super Admin high-risk actions protected.
* maker-checker remains for high-risk where implemented.
* admin action audited.

---

## 68. No Fake Security Status

Do not mark as done unless real:

* RLS checked
* headers checked
* rate limit active
* fraud check active
* webhook verified
* CSP active/report-only
* malware scan active
* provider active
* backup tested
* incident response tested
* secret scan clean

If only foundation exists, mark `PARTIAL` or `SETUP_REQUIRED`.

---

## 69. Test / Check Commands

Run available:

```txt id="checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

* security tests
* route guard tests
* RLS tests
* rate-limit tests
* hidden contact leak tests
* webhook signature tests
* upload validation tests
* redirect safety tests
* CMS sanitizer tests
* provider secret scan
* dependency audit

Examples:

```txt id="optional-security-checks"
npm audit
pnpm audit
npm run test:security
npm run test:rls
npm run test:e2e
```

If scripts missing, document `NOT_CONFIGURED`.

Do not claim tests passed if not run.

---

## 70. Manual Smoke Checks If App Runs

If app can run, check:

* guest denied dashboard/admin/private routes
* owner cannot access broker/builder/admin private pages
* broker cannot access builder/admin private pages
* builder cannot access owner/broker/admin private pages
* staff without permission denied provider/billing/security pages
* disabled staff denied admin
* wrong user denied lead/message/billing/media/notification
* hidden contact not in public HTML/API/schema/sitemap
* service role not in client
* provider secrets not in UI
* invalid webhook rejected
* invalid upload rejected
* open redirect blocked
* rate-limited action blocks after threshold if configured
* CMS unsafe HTML blocked/sanitized
* private pages noindex/no-store
* build passes

Record results.

Full verification in matching manual prompt.

---

## 71. Provider Status Updates

Update `API_PROVIDER_STATUS.md` for security-related providers:

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

Use accurate statuses:

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

Do not mark active without real test/config.

---

## 72. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

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

Use accurate statuses.

---

## 73. Changelog Update

Update `CHANGELOG.md`.

Include:

* date
* Prompt 13
* summary
* changed files
* new routes/API routes
* migration files if any
* RLS/security changes
* rate-limit/fraud changes
* provider/security status changes
* tests/checks run
* docs updated
* known issues
* rollback notes
* manual verification pending

---

## 74. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* service role client exposure
* provider secret leak
* hidden contact leak
* public admin access
* direct URL bypass
* wrong-user private data access
* RLS missing
* public select on private table
* frontend-only authorization
* private media public
* private document public
* payment webhook bypass
* provider webhook no signature/idempotency
* upload validation missing
* unsafe SVG
* CMS unsafe HTML
* open redirect
* CSRF risk
* CORS too broad
* missing security headers
* CSP missing
* fake rate limit
* fake fraud protection
* OTP abuse risk
* scraping unbounded
* log secret leak
* raw stack trace leak
* audit missing high-risk action
* backup/rollback missing
* migration missing
* build failure

---

## 75. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 13 implementation status
* manual verification pending:

  * `prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`
* security areas changed
* RLS checks pending
* route/API checks pending
* rate-limit tests pending
* provider secret scan pending
* responsive/private page checks pending
* known bugs

Do not mark manual verification PASS from implementation prompt alone.

---

## 76. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md`.

This is the main document for this phase.

Include:

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

---

## 77. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md`.

Include security/performance tradeoffs:

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

## 78. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

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

If RLS/security middleware changes exist, rollback notes are mandatory.

---

## 79. Brain Update

Update `brain.md`.

Include:

* Prompt 13 implementation summary
* changed files
* routes/API/security areas changed
* migration files if any
* RLS status
* hidden contact status
* service role/provider secret status
* rate-limit/fraud status
* security headers/CSP status
* webhook/upload/payment/provider security status
* privacy/retention/incident response status
* provider setup-required states
* bugs/blockers
* tests/checks run
* next prompt:

  * `prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`
* exact resume instruction

---

## 80. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
middleware.ts
next.config.ts
src/app/api/**/*
src/app/admin/**/*
src/app/dashboard/**/*
src/lib/auth/*
src/lib/admin/*
src/lib/permissions/*
src/lib/security/*
src/lib/rate-limit/*
src/lib/fraud/*
src/lib/abuse/*
src/lib/audit/*
src/lib/privacy/*
src/lib/validation/*
src/lib/validators/*
src/lib/supabase/*
src/lib/providers/*
src/lib/payments/*
src/lib/uploads/*
src/lib/media/*
src/lib/notifications/*
src/lib/ads/*
src/lib/search/*
src/components/security/*
src/types/security.ts
src/types/fraud.ts
src/types/rate-limit.ts
supabase/migrations/*_security_privacy_fraud_rate_limits.sql
.env.example
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

## 81. Expected Output From This Phase

At the end of Prompt 13 implementation, project should have:

* route protection inventory
* API route classification
* auth/role/admin guard hardening
* direct URL bypass hardening
* RLS final pass foundation
* sensitive field classification
* hidden contact hardening
* private media/document protection hardening
* provider secret/service role scan and fixes
* input validation hardening
* XSS/CMS sanitizer hardening
* security headers/CSP foundation
* CORS/CSRF/SSRF/open redirect hardening
* rate limit helper/foundation
* rate-limited critical actions
* fraud report/suspicious activity foundation
* spam/scraping protection foundation
* audit log/log redaction hardening
* privacy/retention/delete foundation
* backup/incident response docs
* no fake security claims
* docs updated
* checks run
* manual verification pending

---

## 82. Forbidden Outcomes

This phase must not leave:

* service role in client
* provider secrets in client/UI/logs
* hidden contact leak
* public admin access
* direct URL bypass
* frontend-only authorization
* broad public private table access
* RLS disabled on private tables
* private media/docs public
* payment webhook bypass
* provider webhook unsafe
* unsafe upload validation
* unsafe CMS HTML
* open redirect
* fake rate limit
* fake fraud protection
* fake security status
* raw stack traces to users
* logs leaking secrets/OTP/tokens
* private pages indexed
* DB changes without migration
* docs outdated
* manual verification skipped

---

## 83. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* CSP report-only/foundation only
* durable rate limit store setup-required
* fraud detection foundation partial
* captcha/WAF setup-required
* malware scan setup-required
* backup restore test setup-required
* incident response docs foundation only
* RLS runtime tests pending
* provider webhook testing pending
* penetration test external audit pending
* responsive/browser/security checks pending

### `FAIL`

Use if:

* build fails
* service role in client
* provider secret exposed
* hidden contact leak
* public admin access
* direct URL bypass leaks private data
* wrong-user private data access
* RLS missing on private table
* private media/doc public
* payment webhook bypass
* unsafe provider webhook mutates data
* unsafe CMS HTML executes
* open redirect exists
* raw secrets in logs
* DB changes missing migration

### `BLOCKED`

Use if:

* previous phase verification failed and security depends on it
* Supabase/RLS unavailable blocks final pass
* architecture conflict requires owner decision
* provider secret management unresolved
* rate limit store unavailable and required for production decision
* package/build baseline broken
* cannot inspect required files

### `SETUP_REQUIRED`

Use for:

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

Setup-required is acceptable only when no active critical leak/bypass remains.

---

## 84. Final Response Required Format

Return final response in this structure:

```txt id="prompt-13-final-response-format"
Summary:
- what security/privacy/fraud/rate-limit hardening was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Route/API security:
- route inventory:
- API classification:
- auth guards:
- role guards:
- admin guards:
- direct URL bypass:

RLS/database:
- RLS inventory:
- private tables:
- public views:
- policy changes:
- indexes:

Privacy/data protection:
- hidden contact:
- private documents:
- private media:
- private leads/messages:
- billing/payment privacy:
- notification/provider privacy:
- sensitive field classification:

Secrets/service role:
- service role:
- provider secrets:
- env/example:
- masking/log redaction:

Validation/web security:
- input validation:
- output sanitization:
- CMS HTML:
- CSP:
- security headers:
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
- fraud reports:
- suspicious activity:

Audit/retention/incident:
- audit logs:
- log redaction:
- data retention:
- soft/hard delete:
- privacy requests:
- backup/restore:
- incident response:

Provider/setup-required:
- rate limit store:
- captcha/WAF:
- malware scan:
- error monitoring:
- backup:
- cron/jobs:
- CSP reporting:
- external audit:

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
- middleware/headers:
- rate limits:
- providers/secrets:
- logs/audit:

Manual verification:
- pending prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md

Next step:
- run prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
```

Do not say only “done”.

---

## 85. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
```

Do not start Prompt 14 until Prompt 13 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 86. Common Bugs To Watch For

Create/track bugs for:

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

## 87. Quality Bar

This phase is successful when future phases can rely on:

* route guards are server-side
* role boundaries are enforced
* admin is private and separate
* direct URL bypasses are blocked
* RLS protects private data
* hidden contact is protected everywhere
* private documents/media remain private
* provider secrets are server-only
* service role is server-only
* inputs are validated
* rich content is sanitized
* security headers/CSP foundation exists
* webhooks are signature/idempotency hardened where applicable
* critical actions have rate-limit foundation
* spam/scraping/fraud foundations exist
* logs redact sensitive data
* audit logs cover high-risk actions
* retention/incident/backup docs are updated
* no fake security status exists
* manual verification is ready

---

## 88. Final Rule For Prompt 13

Harden security honestly.

Verify routes honestly.

Verify RLS honestly.

Verify hidden contact honestly.

Verify provider secrets honestly.

Verify service role honestly.

Verify validation honestly.

Verify webhooks honestly.

Verify rate limits honestly.

Verify fraud foundation honestly.

Verify logs honestly.

Do not weaken security.

Do not bypass RLS.

Do not expose secrets.

Do not leak hidden contact.

Do not allow direct URL bypass.

Do not rely on frontend-only authorization.

Do not fake rate limits.

Do not fake fraud protection.

Do not fake security headers.

Do not fake webhook verification.

Do not fake backup/incident readiness.

Do not skip migrations for DB changes.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
