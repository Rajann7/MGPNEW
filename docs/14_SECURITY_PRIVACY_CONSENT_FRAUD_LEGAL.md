# docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md

# My Gujarat Property — Security, Privacy, Consent, Fraud, Legal And Compliance System

This document defines the complete **Security, Privacy, Consent, Fraud Prevention, Legal, Abuse Handling and Compliance System** for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — build to match)

> Source of truth: finished design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batches 9, 11, 15). Replicate 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`.

* **Contact privacy**: numbers masked until an explicit reveal action; reveal is metered (monthly quota, doc 07/09), consented, and logged. **Contact-reveal logs are permission-gated AND access to them is itself audit-logged**; an abuse-pattern flag fires on anomalies (e.g. one user reveals 19 buyers across 6 listings in 2 days).
* **Audit log is append-only** in the UI (no edit/delete affordances, lock pill); entries show a before/after diff; **IP addresses are masked** in display (103.240.xx.xx); non-human actors ("system", "System (pattern)") are modeled.
* **Security monitoring**: named threat types (OTP flooding, credential stuffing across N accounts via device fingerprint, admin new-device login) with **auto-block outcomes** surfaced; sparkline + narrative captions.
* **Maker-checker (four-eyes)** on high-risk actions (e.g. large manual refunds, bulk suspend): the checker must be a different admin; **self-approval is hard-disabled in the UI**.
* Every enforcement action (fraud, message-report, dispute, suspend/ban, bulk) is **reason-required + audit-logged**, with a preview-before-destroy step for bulk actions. Message-report modeling uses realistic OTP-phishing scam examples. Report detail carries related-history verdict outcomes (upheld/dismissed).
* Consent: cookie preference manager (Essential always-on/disabled, Analytics, Marketing) + first-visit analytics consent ("no tracking until you choose"). Rate limits surfaced to users where relevant (guest support 3/hour).

Claude must read this file before implementing security controls, RLS policies, privacy handling, hidden contact protection, consent capture, legal notices, fraud/reporting flows, rate limits, audit logs, private documents, data retention, data export/delete requests, cookie preferences, support/grievance workflows, verification disclaimers, RERA disclaimers, payment legal flows, provider security, admin security or production security signoff.

No hidden contact leak is allowed.

No private document leak is allowed.

No service role key can reach the client.

No frontend-only security is allowed.

No fake legal guarantee is allowed.

No fake verification/RERA/payment/security PASS is allowed.

---

## 1. Purpose

This file defines:

* security principles
* privacy principles
* consent rules
* contact privacy
* hidden contact protection
* RLS expectations
* server-side authorization
* private document handling
* sensitive data classification
* audit logging
* security event logging
* rate limiting
* abuse prevention
* fraud detection
* report/takedown flow
* verification disclaimers
* RERA disclaimers
* payment/legal disclaimers
* legal policies
* data retention
* data export requests
* data deletion requests
* cookie consent
* marketing consent
* contact sharing consent
* support/grievance handling
* admin/staff security
* provider secret safety
* incident response
* production security gates
* manual verification checklist

This file is the master security, privacy, consent, fraud and legal reference.

---

## 2. Core Security Principles

The platform must follow these principles:

1. Security is server-side first.
2. RLS must be enabled for sensitive tables.
3. Frontend hiding is not security.
4. Direct URL bypass must be blocked.
5. Service role key must never be sent to client.
6. Private data must not be in public API payloads.
7. Hidden contact must never be in public HTML.
8. Hidden contact must never be in public metadata/schema.
9. Private documents must never be public.
10. Provider secrets must never be exposed.
11. Payment success must be verified server-side.
12. Webhooks must verify signatures where provider supports it.
13. Admin/staff access must be permission-scoped.
14. Sensitive admin actions must be audited.
15. Logs must redact secrets/private data.
16. Rate limits must protect abuse-sensitive actions.
17. Uploads must validate file type, size and access.
18. Public SEO must use public-safe views only.
19. Fraud/report workflows must protect reporters.
20. Legal disclaimers must be clear and truthful.
21. Production cannot pass without security/RLS/manual verification.
22. No fake security PASS.

---

## 3. Core Privacy Principles

Privacy rules:

1. Collect only necessary data.
2. Explain why data is collected.
3. Store consent where required.
4. Respect contact visibility choices.
5. Keep private documents private.
6. Use public-safe views for public pages.
7. Do not leak private data through SEO.
8. Do not leak private data through notifications.
9. Do not leak private data through logs.
10. Do not leak private data through media metadata.
11. Restrict staff access to sensitive data.
12. Log private document access.
13. Provide data export/delete request workflows where implemented.
14. Retain data according to policy/legal/business needs.
15. Allow opt-in/out for marketing communications.
16. Respect cookie/analytics preferences.
17. Do not sell user data.
18. Do not expose user conversations/messages publicly.
19. Do not expose billing/invoice data publicly.
20. Do not expose verification/RERA proof publicly.

---

## 4. Data Classification

All data must be classified.

## 4.1 Public Data

Public data may be visible on public pages.

Examples:

* approved property title
* approved project name
* public-safe location
* approved listing images
* public description
* public price/rent if visible
* public amenities
* public profile display name
* approved broker/builder profile fields
* approved RERA number/status if real
* sponsored label
* published CMS/blog/legal content

Public data must still be safe and truthful.

---

## 4.2 Private User Data

Private user data includes:

* mobile number
* email
* private address
* exact flat/unit number
* account status
* login history
* saved items/searches
* billing details
* GSTIN
* invoices
* support tickets
* private profile fields
* notification preferences
* legal consents
* private messages
* leads/CRM data
* site visits
* proposals
* contact reveal history

Private user data must not appear publicly.

---

## 4.3 Sensitive Data

Sensitive data includes:

* verification documents
* identity documents
* business proof
* ownership proof
* RERA proof files
* private support attachments
* report/fraud evidence
* message attachments
* payment provider references
* webhook event payload summaries
* audit logs
* security events
* staff permissions
* provider settings
* feature flags
* private invoice PDFs
* legal dispute files

Sensitive data needs stronger permission and audit where applicable.

---

## 4.4 Secret Data

Secret data includes:

* Supabase service role key
* database password
* provider API keys
* webhook secrets
* Razorpay secret
* SMS/OTP provider secrets
* email provider API keys
* WhatsApp tokens
* R2 secret keys
* CDN purge tokens
* Turnstile secret
* signing secrets
* session secrets
* encryption keys

Secret data must never be:

* committed to git
* shown in browser
* returned from API
* logged
* stored raw in DB
* displayed raw in admin UI
* included in screenshots/docs shared publicly

---

## 5. Data Handling Matrix

| Data Type              | Public Page |          Logged-in Owner |            Staff/Admin | Storage            |
| ---------------------- | ----------: | -----------------------: | ---------------------: | ------------------ |
| Approved listing title |         Yes |                      Yes |                    Yes | DB                 |
| Hidden phone           |          No | Conditional after reveal |      Permission-scoped | DB private         |
| Private email          |          No |                 Own only |      Permission-scoped | DB private         |
| Verification docs      |          No |              Own limited | Private doc permission | Private storage    |
| RERA proof file        |          No |      Builder own limited | Private doc permission | Private storage    |
| Invoice PDF            |          No |                 Own only |     Billing permission | Private storage    |
| Leads                  |          No |     Participant/receiver |      Permission-scoped | DB private         |
| Messages               |          No |         Participant only |      Permission-scoped | DB private         |
| Audit logs             |          No |                       No |       Audit permission | DB protected       |
| Provider secrets       |          No |                       No |      Raw hidden always | Env/secret manager |

---

## 6. Hidden Contact Protection

Hidden contact protection is critical.

Hidden contact includes:

* phone number
* WhatsApp number
* email
* alternate contact
* exact private address if hidden
* owner/broker/builder private contact

Hidden contact must not appear in:

* public HTML
* public API response
* page source
* meta tags
* schema markup
* sitemap
* robots
* image alt/caption
* image/PDF metadata
* public notifications
* public search index
* public cached payload
* share preview
* logs
* error messages
* unauthenticated payload
* guest detail page
* search card
* SEO city/locality pages

Contact reveal must be server-controlled.

---

## 7. Contact Reveal Security

Contact reveal flow must:

1. require authentication
2. check account status
3. check role/permission
4. check target entity status
5. check contact visibility rule
6. check subscription/verification gate if applicable
7. check rate limits
8. prevent duplicate spam
9. record consent
10. create/reuse lead
11. log contact reveal event
12. return only authorized contact fields
13. notify receiver where configured
14. never cache revealed contact publicly

Contact reveal failure must not leak contact.

---

## 8. Inquiry Contact Sharing Consent

Before or during inquiry/contact reveal, user must understand:

* their profile/contact may be shared with listing/project owner
* receiver may contact them
* communication may be tracked for platform safety
* platform does not guarantee transaction outcome
* user should avoid sharing sensitive documents casually

Consent should be captured where required.

Consent records should include:

* consent type
* policy version
* user/profile ID
* entity/action
* timestamp
* IP hash where safe
* user agent hash where safe

---

## 9. RLS Requirements

RLS must protect all sensitive tables.

RLS must apply to:

* profiles
* owner profiles
* broker profiles
* builder profiles
* staff profiles
* staff permissions
* properties
* projects
* requirements
* media assets
* verification documents
* leads
* lead events
* proposals
* messages
* message attachments
* site visits
* saved items
* saved searches
* notifications
* billing profiles
* subscriptions
* payments
* invoices
* ads
* support tickets
* reports
* audit logs
* security events
* provider settings
* feature flags
* legal consents
* cookie preferences

Public-safe views must be used for public pages.

---

## 10. RLS Principles

RLS policies must enforce:

1. users can read/update own profile only
2. public can read only approved public-safe records
3. owner can manage own properties/requirements
4. broker can manage own properties/requirements
5. builder can manage own projects/ads
6. builder agents can access assigned records only
7. users can access own leads/messages/site visits only where participant
8. notification recipient can access own notifications
9. billing records are own-only
10. invoice PDFs are own-only
11. private documents are permission-scoped
12. staff access is permission-scoped
13. admin sensitive access requires explicit permission
14. service role only in trusted server code
15. direct table read must not expose private data

---

## 11. Public-Safe Views

Public pages must use public-safe views.

Public-safe views may include:

* `public_properties_view`
* `public_projects_view`
* `public_profiles_view`
* `public_broker_profiles_view`
* `public_builder_profiles_view`
* `public_property_media_view`
* `public_project_media_view`
* `public_ads_view`
* `public_seo_pages_view`

Public-safe views must exclude:

* hidden contact
* private email
* private address
* private documents
* draft/pending/rejected/deleted data
* payment data
* leads/messages
* admin notes
* audit logs
* internal fraud flags
* provider config
* raw user metadata

---

## 12. Server-Side Authorization

Every sensitive action must be server-authorized.

Sensitive actions include:

* create property
* create project
* create requirement
* edit listing/project/requirement
* submit approval
* approve/reject
* upload media
* view private document
* reveal contact
* submit inquiry
* send proposal
* send message
* request site visit
* save item
* checkout/payment
* view invoice
* refund/manual activation
* manage ads
* access admin route
* manage provider settings
* change feature flags
* export data
* bulk action
* suspend/ban user
* role change approval

Client checks are UX only.

Server checks are mandatory.

---

## 13. Direct URL Bypass Protection

Direct URL bypass tests must include:

* guest to dashboard
* owner to broker dashboard
* broker to builder dashboard
* builder to owner property posting
* owner/broker to project posting
* wrong owner property edit
* wrong builder project edit
* wrong user invoice
* wrong user message thread
* wrong user support ticket
* wrong user saved items
* wrong user notification
* public to admin
* staff without permission to admin module
* staff without private-doc permission to docs
* invalid signed URL
* private media URL
* pending/rejected listing public URL

Unauthorized access must be denied.

---

## 14. Authentication Security

Auth security rules:

* public auth uses mobile OTP
* admin/staff auth separate
* admin/staff invite-only
* no public admin registration
* OTP provider setup-required if missing
* OTP not logged
* OTP rate-limited
* OTP expiry enforced
* account status checked after login
* suspended/banned account blocked
* session securely handled
* HTTPS in production
* secure cookies
* admin/staff session timeout
* suspicious login tracking where implemented
* logout clears private state

---

## 15. Admin / Staff Security

Admin/staff security rules:

* separate login
* no public create account
* noindex routes
* permission-scoped modules
* sensitive permissions explicit
* private document access logged
* staff cannot change own permissions
* disabled staff cannot login
* high-risk actions audited
* maker-checker for critical actions where implemented
* provider secrets masked
* payment/manual actions permission-gated
* exports permission-gated
* bulk actions permission-gated

Admin UI hiding is not enough.

Server permissions required.

---

## 16. Service Role Safety

Service role key rules:

* server-only
* never in client bundle
* never in browser console
* never returned from API
* never logged
* never committed
* never exposed in admin UI
* never used from client components
* only trusted server code
* only for operations that require elevated access
* always validate caller before using elevated access

Service role leak is critical incident.

---

## 17. Provider Secret Safety

Provider secrets include:

* Razorpay secret
* webhook secrets
* SMS/OTP keys
* email API keys
* WhatsApp tokens
* Maps server keys
* R2 secret keys
* CDN API tokens
* Turnstile secret
* analytics tokens
* error tracking DSN if sensitive

Rules:

* store in env/secret manager
* show only configured/hidden status
* never show raw value
* never log raw value
* never send to client
* update `.env.example` with empty placeholders only
* rotate if leaked
* provider admin permission required

---

## 18. Upload Security

Upload security rules:

* server validates MIME
* server validates extension
* server validates magic bytes where possible
* file size limits
* file count limits
* role/ownership check
* plan limits
* public/private bucket decision
* private docs signed URLs
* EXIF/GPS stripping where possible
* SVG sanitize or block
* malware scan setup-required/implemented
* executable files blocked
* unsafe PDFs blocked/quarantined
* no fake upload success
* upload rate limit

Private file leak is critical.

---

## 19. Media Metadata Privacy

Media must not leak:

* hidden contact
* exact private location
* GPS EXIF
* private file names
* user phone/email in filename
* private document type to public
* private storage key
* signed URL
* internal moderation notes

Public media metadata must be sanitized.

---

## 20. Logging And Redaction

Logs must not include:

* OTP
* passwords
* session tokens
* access tokens
* refresh tokens
* service role key
* API secrets
* webhook secrets
* hidden contact
* private documents
* signed URLs
* full billing address
* raw private message bodies in general logs
* raw payment payload with sensitive info
* full provider error with secrets
* private invoice URL

Safe logs may include:

* internal IDs
* event type
* safe status
* safe error code
* redacted contact
* hashed IP/device
* timestamp
* provider name
* attempt count

---

## 21. Audit Logs

Audit logs are required for sensitive actions.

Audit must record:

* actor type
* actor ID
* actor role
* action
* target type
* target ID
* old safe value
* new safe value
* reason
* timestamp
* IP/device hash where safe
* module
* severity
* environment

Audit logs must be append-only.

Normal staff must not edit/delete audit logs.

---

## 22. Actions Requiring Audit

Audit required for:

* registration
* login security events
* role change request
* role change approval/rejection
* staff invite
* staff permission change
* user suspension/ban
* property/project/requirement approval
* verification approval/rejection/revocation
* private document access
* contact reveal
* payment webhook processing
* manual payment activation
* refund/credit note
* invoice correction
* provider setting change
* feature flag change
* ad approval/rejection
* legal/CMS publish
* SEO/noindex/redirect change
* location hierarchy change
* export
* bulk action
* report/fraud resolution
* hard delete
* maintenance mode
* deployment/rollback signoff

---

## 23. Security Events

Security events should track:

* failed login attempts
* OTP abuse
* rate limit hits
* suspicious login
* suspicious contact reveal
* hidden contact access attempt
* private document access denied
* invalid webhook signature
* payment mismatch
* duplicate payment webhook
* upload blocked
* malware/suspicious file
* report abuse spike
* scraping signal
* message spam
* proposal spam
* staff permission violation
* provider failure
* RLS denial spike
* admin suspicious action

Security events should be reviewed by Security Manager/Super Admin.

---

## 24. Rate Limiting

Rate limits required for:

* OTP send
* OTP verify
* login attempts
* registration attempts
* contact reveal
* inquiry submit
* proposal send
* message send
* site visit request
* support ticket create
* report abuse
* file upload
* signed URL generation
* checkout/order creation
* coupon apply
* webhook processing safeguards
* provider test buttons
* admin login
* staff invite accept
* exports
* bulk actions
* search scraping
* ad event tracking
* notification send

Rate limit failure must show safe error.

---

## 25. Abuse Prevention

Abuse prevention must cover:

* OTP spam
* fake accounts
* duplicate listings
* fake listings
* fake projects
* fake RERA claims
* hidden contact scraping
* contact reveal abuse
* inquiry spam
* message spam
* proposal spam
* site visit spam
* support spam
* report abuse spam
* payment fraud
* ad click fraud
* scraping/bot traffic
* upload abuse
* SEO spam
* fake profile claims
* duplicate/fraudulent verification

Abuse handling must be documented and audited.

---

## 26. Fraud Detection Signals

Fraud signals may include:

* many accounts from same IP/device hash
* repeated OTP requests
* repeated contact reveals
* repeated inquiries with same message
* same listing duplicated
* suspicious price
* misleading title
* fake RERA number
* fake verified claim
* stolen images
* multiple reports
* mismatched payment/webhook
* invalid GSTIN
* suspicious ad click rate
* repeated message spam
* abusive support tickets
* high failed login attempts
* private doc access attempts
* role change abuse

Fraud labels must be real and reviewable.

No fake fraud status.

---

## 27. Report / Abuse Workflow

Users can report:

* property
* project
* requirement
* profile
* message
* ad
* support abuse
* payment issue
* verification/RERA issue
* fraud/scam

Report flow:

1. user opens report form
2. selects category
3. enters description
4. uploads evidence if allowed
5. submits report
6. rate limit checked
7. report record created
8. notification/task created for staff
9. staff reviews
10. staff resolves/dismisses/escalates
11. action audited
12. reporter privacy protected

Guest reports may be allowed with anti-abuse controls.

---

## 28. Report Categories

Report categories:

* fake listing
* wrong price
* wrong contact
* duplicate listing
* sold/rented but active
* fraud/scam
* spam
* inappropriate content
* fake RERA
* fake verification
* ownership dispute
* misleading ad
* abusive message
* payment issue
* privacy issue
* copyright/takedown
* legal issue
* other

---

## 29. Fraud / Report Admin Review

Admin/staff review must show:

* report target
* reporter info permission-scoped
* report category
* description
* evidence attachments
* related user history
* related listing/project
* prior reports
* duplicate signals
* contact reveal history where permitted
* moderation timeline
* internal notes
* action buttons
* audit log

Actions:

* dismiss
* mark valid
* request changes
* pause listing
* block listing
* suspend user
* revoke verification
* escalate
* close report
* create support/legal task

Reporter private identity must be protected.

---

## 30. User Blocking / Suspension / Ban

User account actions:

* warning
* temporary restriction
* contact reveal restriction
* listing posting restriction
* messaging restriction
* suspension
* ban
* deletion/soft delete
* appeal/support route

Rules:

* reason required
* permission required
* audit required
* user notified where appropriate
* active listings/projects affected safely
* billing impact documented
* appeal/support path where policy says
* no silent permanent deletion without retention/legal process

---

## 31. Content Moderation Safety

Moderation applies to:

* properties
* projects
* requirements
* profiles
* ads
* messages
* support attachments
* blog/CMS comments if ever enabled
* media
* reports

Moderation checks:

* spam
* fraud
* fake claim
* wrong category
* prohibited content
* personal data leak
* hidden contact in public fields
* fake RERA
* fake verification
* abusive language
* discriminatory content
* illegal content
* unsafe files
* misleading ads

Moderation decisions require audit.

---

## 32. Legal Consent Types

Consent types may include:

* Terms acceptance
* Privacy Policy acceptance
* OTP/data notice
* Contact sharing consent
* Cookie consent
* Marketing opt-in
* WhatsApp communication opt-in where needed
* Email communication preference
* SMS communication preference
* Listing policy acceptance
* Ad policy acceptance
* Payment/refund policy acceptance
* Verification document privacy consent
* RERA/project disclaimer acknowledgment
* Site visit safety notice
* Support data processing consent
* Data export/delete request confirmation

Consent must be versioned.

---

## 33. Consent Capture Rules

Consent records should include:

* profile ID
* consent type
* policy version
* accepted/rejected value
* timestamp
* IP hash
* user agent hash
* source
* related entity/action if relevant

Rules:

* required consent blocks action if missing
* optional consent can be declined
* consent text must be clear
* legal links must work
* version changes may require re-consent
* do not pre-check marketing consent where not allowed
* log consent safely

---

## 34. Cookie Consent

Cookie categories:

* necessary
* preferences
* analytics
* marketing

Cookie UI should support:

* accept necessary
* accept all
* reject non-essential
* manage preferences
* update preferences later

Rules:

* necessary cookies can support auth/session/security
* analytics only after consent where policy requires
* marketing cookies only after consent
* cookie preference stored
* no fake consent
* cookie policy linked
* admin/test pages no public tracking unless intended

---

## 35. Marketing Consent

Marketing communication includes:

* promotional emails
* promotional SMS
* promotional WhatsApp
* ad campaign notifications
* newsletters
* offers/coupons

Rules:

* opt-in required where applicable
* unsubscribe/opt-out available
* user preferences respected
* transactional/security messages separated
* no fake opt-in
* no sending marketing to unsubscribed users
* delivery logs real

---

## 36. Transactional Communication

Transactional messages may include:

* OTP
* account security
* inquiry notification
* listing approval
* payment receipt
* invoice
* support ticket update
* verification update
* site visit update
* subscription expiry

Rules:

* privacy-safe content
* provider status real
* no hidden sensitive data in unsafe channel
* delivery logs real
* user preferences applied where legally/product appropriate
* no fake delivery

---

## 37. Data Export Requests

Users may request export of their data.

Export may include:

* profile data
* listings/projects/requirements
* leads involving user
* saved items/searches
* billing/invoices
* consents
* support tickets
* messages where policy allows and respects other participants
* verification metadata, not necessarily private docs without secure process

Rules:

* authenticate user
* verify ownership
* rate limit
* create export request
* process securely
* private signed download
* expiry
* audit
* notify user
* redact third-party/private data where needed
* no public export URL

---

## 38. Data Deletion Requests

Users may request data deletion.

Deletion must consider:

* legal retention
* invoices/accounting retention
* fraud/security retention
* active disputes
* support/legal holds
* payment records
* audit logs
* public listings
* messages with other participants
* verification documents
* backups
* obligations under policy/law

Deletion flow:

1. user submits request
2. identity verified
3. impact explained
4. pending deletion status
5. admin/legal review if needed
6. data deleted/anonymized where allowed
7. retained data documented
8. user notified
9. audit logged

Do not hard delete everything blindly.

---

## 39. Data Retention

Retention categories:

* account/profile data
* listing/project/requirement data
* leads/messages
* support tickets
* verification documents
* billing/invoices
* audit logs
* security events
* provider logs
* media files
* deleted records
* backups

Rules:

* retention policy documented
* soft delete first
* hard delete after retention/legal approval
* invoices retained as required
* audit/security logs retained
* private docs deleted/retained according to policy
* backups expire according to backup policy
* legal holds override deletion

---

## 40. Legal Holds

Legal hold may apply when:

* dispute active
* fraud investigation
* law enforcement request
* payment dispute
* verification dispute
* support escalation
* legal/takedown notice
* regulatory requirement

Legal hold means:

* data not deleted until hold released
* access restricted
* audit logged
* user notified where appropriate/legal
* admin/legal permission required

---

## 41. Platform Legal Disclaimer

Platform must clearly disclose:

* My Gujarat Property is a marketplace platform.
* Listings/projects are submitted by users/builders/brokers.
* Platform does not guarantee ownership/title.
* Platform does not provide legal advice.
* Platform does not provide investment advice.
* Users must verify property documents independently.
* Verification badge is not legal guarantee.
* RERA information must be independently verified.
* Ads are sponsored/promoted where labeled.
* Payment for platform services does not guarantee property transaction.
* Platform may remove/moderate suspicious content.
* Users are responsible for legal due diligence.

No fake guarantees.

---

## 42. Verification Disclaimer

Verification badge means:

* platform reviewed submitted information according to internal process
* badge may be revoked
* badge may expire/recheck
* badge is not legal guarantee
* badge does not guarantee title/ownership
* badge does not guarantee transaction safety
* users must independently verify

Do not use wording like:

* “100% verified”
* “guaranteed safe”
* “legally approved”
* “ownership guaranteed”

---

## 43. RERA Disclaimer

RERA display rules:

* RERA number/status shown only if provided/reviewed.
* RERA proof document private unless policy says otherwise.
* RERA badge/status is not legal advice.
* Users should verify RERA on official channels.
* Expired/revoked/invalid status must be handled.
* RERA required before project ads where applicable.
* No fake RERA.

RERA disclaimer must appear on relevant project/ad pages.

---

## 44. Payment Legal Rules

Payment pages must disclose:

* plan details
* price
* GST/tax note
* billing cycle
* trial terms
* coupon terms
* cancellation policy
* refund policy
* invoice details
* provider/payment processing
* no guarantee of property transaction
* support contact for payment issue

Payment success:

* must be verified server-side
* invoice after verified payment
* no fake active plan

---

## 45. Ads Legal Rules

Ads/promotions must disclose:

* sponsored/promoted label
* ad policy
* approval requirement
* payment requirement
* RERA requirements where applicable
* no guaranteed leads/sales unless explicitly contracted
* ad performance metrics are informational
* fraud/click filtering may apply
* refund/cancellation policy

No misleading ad claims.

---

## 46. Site Visit Safety Rules

Site visit UI must include safety notice:

* verify property/project independently
* meet safely
* inform someone before visit
* avoid carrying large cash
* do not pay token without documents
* platform does not guarantee deal
* report suspicious behavior
* check RERA/legal/title documents independently

User may need to acknowledge notice before scheduling.

---

## 47. Messaging Safety Rules

Messaging rules:

* participants only
* report/block option
* rate limits
* spam detection
* unsafe attachments blocked
* private messages not public
* admin review only with permission/report/legal basis
* no hidden contact automatically revealed
* no fake delivered/read status
* abusive messages reportable

---

## 48. Support / Grievance Legal Rules

Support/grievance system must:

* provide support ticket path
* provide legal/grievance contact page
* categorize issues
* allow fraud/privacy/legal reports
* protect reporter privacy
* allow escalation
* record response history
* keep attachments private
* handle takedown/copyright/legal requests where implemented

Final grievance/legal officer details must be provided by business owner before production.

---

## 49. Takedown / Copyright / Legal Requests

Takedown request flow:

1. requester submits complaint
2. category selected
3. evidence uploaded
4. legal/support team reviews
5. target content may be paused during review
6. decision recorded
7. parties notified where appropriate
8. audit logged
9. content restored/removed/modified

Rules:

* evidence private
* legal hold if needed
* no automatic public exposure
* staff permission required
* reason required

---

## 50. DPDP-Ready Privacy Practices

India DPDP-ready practices should include:

* clear notice
* purpose limitation
* consent records where needed
* data minimization
* access correction request path
* deletion request path
* grievance contact
* security safeguards
* breach/incident response
* processor/provider awareness
* retention policy
* user rights workflow
* children/minors policy where relevant

This document is not legal advice.

Final legal review required for production policy wording.

---

## 51. Children / Minor Use Policy

If platform is not intended for minors:

* terms should define eligibility
* minors should not register without lawful guardian consent where applicable
* property transactions are adult/legal capacity activities
* support should handle accidental minor data deletion where needed

Implementation should avoid targeting children.

---

## 52. Data Processor / Provider Sharing

Provider sharing may include:

* OTP/SMS provider
* email provider
* WhatsApp provider
* payment provider
* storage provider
* CDN provider
* maps provider
* analytics provider
* error tracking provider
* support tools where future

Privacy policy must disclose provider categories.

Provider data sent must be minimized.

No provider gets unnecessary private data.

---

## 53. Payment Security

Payment security rules:

* server creates payment order
* server calculates amount
* client amount ignored
* webhook signature verified
* duplicate webhook idempotent
* payment status real
* failed/pending payment inactive
* invoice after verified payment
* manual activation audited
* refund permission required
* payment provider secrets server-only
* raw payment payload redacted
* billing data RLS-protected

---

## 54. Invoice / GST Privacy

Invoice/GST data includes:

* billing name
* GSTIN
* address
* invoice PDF
* payment references

Rules:

* user sees own invoice
* staff permission required
* invoice PDF private/signed
* no public invoice URL
* no invoice data in SEO
* no invoice data in logs
* GSTIN validation
* invoice correction/credit note audited

---

## 55. SEO Privacy

SEO must never expose:

* hidden contact
* private email
* private address
* exact unit number if hidden
* draft listings
* pending listings
* rejected listings
* private requirements
* leads/messages
* invoices
* private docs
* admin notes
* private verification proof
* support/report data

Sitemap must include only public-safe pages.

Schema must not include fake reviews/ratings/private contacts.

---

## 56. Notification Privacy

Notifications must:

* go to correct recipient
* include only safe content
* deep link permission-checked
* respect preferences
* avoid sensitive info in SMS/WhatsApp/push where unsafe
* not show hidden contact to wrong user
* not show private docs
* not show raw payment secrets
* not fake delivery

External delivery depends on provider status.

---

## 57. Admin Export Security

Exports are high-risk.

Export rules:

* permission required
* sensitive permission required for sensitive fields
* export audited
* private signed URL
* expiry
* background job for large export
* no raw secrets
* no hidden contact unless permitted
* no private docs unless explicit permission
* legal/privacy policy respected

---

## 58. Bulk Action Security

Bulk actions require:

* module permission
* `can_bulk_action`
* preview affected records
* confirmation
* reason where relevant
* audit log
* skip unauthorized records
* rate limit
* rollback notes where risky

High-risk bulk actions may require maker-checker.

---

## 59. Maker-Checker Security

Maker-checker recommended for:

* provider settings
* feature flags
* staff permissions
* manual payment activation
* refunds above threshold
* pricing changes
* legal page major updates
* mass user/listing actions
* security policy changes
* production maintenance
* launch signoff

Rules:

* maker cannot approve own request
* checker permission required
* audit both actions
* pending state until approved
* rejection reason required

---

## 60. Incident Response

Incident types:

* hidden contact leak
* private document leak
* service role leak
* provider secret leak
* payment verification bypass
* RLS bypass
* unauthorized admin access
* mass spam/fraud
* data breach
* malware upload
* SEO private data exposure
* production outage
* suspicious staff activity

Incident response steps:

1. identify issue
2. contain exposure
3. disable feature/flag if needed
4. rotate secrets if leaked
5. block/patch access
6. audit affected data
7. notify internal stakeholders
8. notify users/regulators where legally required
9. document incident
10. fix root cause
11. add tests
12. update docs
13. monitor after fix

---

## 61. Emergency Kill Switches

Feature flags/kill switches should exist for:

* contact reveal
* inquiry submit
* messaging
* uploads
* private document access
* payment checkout
* ads display
* provider sends
* public search indexing where needed
* map provider
* WhatsApp API
* OTP send
* new registrations
* admin exports
* bulk actions

Kill switches must be backend-enforced.

---

## 62. Security Headers

Production should use security headers:

* Content-Security-Policy
* X-Frame-Options or frame-ancestors
* X-Content-Type-Options
* Referrer-Policy
* Permissions-Policy
* Strict-Transport-Security
* Cross-Origin policies where appropriate

CSP must allow needed providers safely.

Do not allow unsafe broad scripts without reason.

---

## 63. CSP Rules

CSP should protect against:

* XSS
* unsafe inline scripts
* unauthorized iframes
* unauthorized image/script/font sources
* clickjacking

Provider allowlists may include:

* payment provider
* maps provider
* media CDN
* analytics/error tracking
* 360 tour providers
* fonts

Rules:

* keep CSP strict but functional
* document allowed domains
* avoid `unsafe-inline` where possible
* test payment/maps/gallery flows
* block unknown iframe providers

---

## 64. XSS Protection

XSS prevention required for:

* CMS/blog rich text
* listing descriptions
* project descriptions
* requirement descriptions
* profile bios
* messages
* support replies
* admin notes
* ad text
* URL/embed fields

Rules:

* sanitize rich text
* escape user content
* validate URLs
* allowlist iframe providers
* no unsafe HTML injection
* no inline event handlers
* no raw markdown/HTML rendering without sanitizer

---

## 65. CSRF Protection

CSRF protection required for state-changing actions.

Actions:

* profile update
* listing create/update/delete
* contact reveal
* message send
* payment order creation
* admin actions
* support ticket update
* provider settings
* feature flags
* exports
* bulk actions

Use framework/Supabase/session protections and server validation.

---

## 66. SSRF Protection

SSRF protection required for:

* image URL fetch if ever allowed
* 360/iframe URL validation
* map/provider URLs
* webhook callbacks
* external link previews
* PDF/media fetch if future

Rules:

* validate URL
* allowlist providers
* block internal IPs
* block file/local protocols
* use safe fetch
* avoid server fetching arbitrary user URLs

---

## 67. Open Redirect Protection

Redirects must be safe.

Rules:

* redirect manager validates internal paths
* external redirects allowed only with explicit approval
* no user-controlled redirect without validation
* auth redirect to original action must be internal/safe
* payment callback redirect safe
* no open redirect vulnerability

---

## 68. Bot / Scraping Protection

Protection may include:

* rate limits
* Turnstile setup-required/active
* suspicious behavior detection
* robots rules
* throttling contact reveal
* throttling search
* IP/device hash signals
* user agent signals
* hidden contact not in public data
* no scraping-friendly private API

Turnstile missing does not mean protected.

Show setup-required internally.

---

## 69. DND / Communication Compliance

SMS/WhatsApp/email communications may require:

* consent
* transactional/marketing separation
* template compliance
* unsubscribe/opt-out
* provider policies
* DLT/template compliance for India SMS where applicable
* quiet hours where implemented

Provider setup-required until compliant.

No fake communication compliance.

---

## 70. Legal Policy Pages Required

Required public pages:

* Terms & Conditions
* Privacy Policy
* Cookie Policy
* Refund Policy
* Cancellation Policy
* Payment Policy
* Listing Policy
* Advertising Policy
* Verification Policy
* RERA Disclaimer
* Safety Guidelines
* Contact Sharing Policy
* Data Export/Delete Policy
* User Content Policy
* Grievance/Support Policy
* Disclaimer

Legal pages must link from footer and relevant flows.

---

## 71. Legal Copy Review

Legal copy must be:

* reviewed before production
* aligned with real product behavior
* versioned
* updated when features change
* linked in registration/payment/listing/ads flows
* free from fake guarantees

If final legal copy is not ready:

* status is `PARTIAL` or `LEGAL_REVIEW_REQUIRED`
* production signoff blocked if critical

---

## 72. Privacy By Feature Matrix

| Feature       | Privacy Requirement            |
| ------------- | ------------------------------ |
| Auth          | OTP not logged, consent notice |
| Profile       | private fields hidden          |
| Property      | hidden contact protected       |
| Project       | RERA proof private             |
| Requirement   | contact/privacy scoped         |
| Leads         | participant only               |
| Messages      | participant only               |
| Site Visits   | private schedule/location      |
| Saved Items   | user-owned                     |
| Billing       | own-only                       |
| Invoices      | own-only/signed URL            |
| Verification  | private docs                   |
| Ads           | public-safe sponsored data     |
| Notifications | recipient-only                 |
| Support       | ticket participant/staff only  |
| Admin         | permission-scoped              |
| SEO           | public-safe only               |

---

## 73. Security Testing Checklist

Security testing must include:

* RLS allow/deny tests
* guest/public access tests
* wrong role tests
* wrong owner tests
* staff permission tests
* private document tests
* signed URL expiry tests
* hidden contact tests
* public HTML/API metadata tests
* direct URL bypass tests
* payment webhook signature tests
* duplicate webhook tests
* provider secret exposure tests
* upload validation tests
* XSS tests
* open redirect tests
* rate limit tests
* support/report privacy tests
* admin noindex tests
* sitemap privacy tests
* audit log tests

---

## 74. Manual Verification Checklist

Manual verification must check:

### Hidden Contact

* guest cannot see phone/email
* contact not in HTML
* contact not in API
* contact not in meta/schema
* contact not in sitemap
* reveal requires auth
* reveal logs event
* duplicate reveal handled
* rate limit works

### RLS / Authorization

* guest denied private pages
* owner sees own only
* broker sees own/scoped only
* builder sees own/scoped only
* wrong owner denied
* wrong builder denied
* staff permission enforced
* direct URL bypass blocked

### Private Documents

* verification docs private
* RERA proof private
* support/report attachments private
* invoice PDF own-only
* message attachments participant-only
* signed URL expires
* access logged
* wrong user denied

### Payment Security

* client callback does not activate plan
* invalid webhook rejected
* duplicate webhook idempotent
* failed payment inactive
* pending payment inactive
* invoice only after verified payment
* manual activation audited

### Admin Security

* public user cannot access admin
* staff without permission denied
* provider secrets masked
* exports permission-gated
* bulk actions permission-gated
* audit logs append-only
* disabled staff denied

### Consent / Legal

* Terms consent captured
* Privacy consent captured
* OTP/data notice shown
* contact sharing consent shown
* cookie preference works
* marketing opt-in optional
* legal links work
* disclaimers visible

### Fraud / Abuse

* report form works
* duplicate reports handled
* inquiry spam rate-limited
* contact reveal abuse rate-limited
* message/proposal spam protected
* upload abuse blocked
* fraud admin review permission works

### SEO Privacy

* private pages noindex
* admin/dashboard noindex
* sitemap public-safe only
* no hidden contact in schema
* no fake review/rating schema
* empty/thin pages noindex

### Responsive

* security/legal/consent UI works at:

  * 320px
  * 360px
  * 390px
  * 430px
  * 768px
  * 1024px
  * 1366px

---

## 75. Feature Registry Items Required

`FEATURE_REGISTRY.md` must track:

* RLS security policies
* public-safe views
* hidden contact protection
* contact reveal logs
* consent records
* Terms consent
* Privacy consent
* cookie consent
* marketing opt-in
* contact sharing consent
* private document protection
* signed URL access
* private document access logs
* audit logs
* security events
* rate limits
* abuse prevention
* fraud detection
* report abuse flow
* fraud/admin review
* user suspend/ban
* legal pages
* verification disclaimer
* RERA disclaimer
* payment legal notices
* site visit safety notice
* support/grievance flow
* data export request
* data deletion request
* retention policy
* legal hold
* provider secret safety
* service role safety
* CSP/security headers
* XSS sanitization
* open redirect protection
* upload security
* admin export security
* maker-checker
* incident response
* emergency kill switches
* security manual verification

Each item must have real status.

---

## 76. Common Bugs To Track

Create critical bug if:

* hidden contact leaks
* private document public
* service role key exposed
* provider secret exposed
* RLS disabled/missing on sensitive table
* direct URL bypass works
* frontend-only security used
* wrong user sees invoice
* wrong user sees message
* wrong user sees lead
* invalid webhook activates payment
* failed payment activates plan
* contact reveal works for guest
* admin accessible publicly
* staff sees module without permission
* private data in sitemap
* private data in SEO metadata
* fake verified badge
* fake RERA badge
* raw SQL/provider error shown
* OTP logged
* unsafe SVG/script accepted
* private signed URL logged
* export works without permission
* audit missing for sensitive action
* legal page makes fake guarantee
* marketing sent without consent
* cookie preference ignored

---

## 77. Current Security/Privacy/Legal Status

As of this documentation generation stage:

| Area                         | Status                   |
| ---------------------------- | ------------------------ |
| RLS policies                 | `NOT_STARTED`            |
| Public-safe views            | `NOT_STARTED`            |
| Hidden contact protection    | `NOT_STARTED`            |
| Contact reveal logging       | `NOT_STARTED`            |
| Consent records              | `NOT_STARTED`            |
| Terms/Privacy consent        | `NOT_STARTED`            |
| Cookie consent               | `NOT_STARTED`            |
| Marketing opt-in             | `NOT_STARTED`            |
| Contact sharing consent      | `NOT_STARTED`            |
| Private document protection  | `NOT_STARTED`            |
| Signed URLs                  | `NOT_STARTED`            |
| Private document access logs | `NOT_STARTED`            |
| Audit logs                   | `NOT_STARTED`            |
| Security events              | `NOT_STARTED`            |
| Rate limits                  | `NOT_STARTED`            |
| Abuse prevention             | `NOT_STARTED`            |
| Fraud detection              | `NOT_STARTED`            |
| Report abuse flow            | `NOT_STARTED`            |
| User suspend/ban             | `NOT_STARTED`            |
| Legal pages                  | `NOT_STARTED`            |
| Verification disclaimer      | `NOT_STARTED`            |
| RERA disclaimer              | `NOT_STARTED`            |
| Payment legal notices        | `NOT_STARTED`            |
| Site visit safety notice     | `NOT_STARTED`            |
| Support/grievance flow       | `NOT_STARTED`            |
| Data export request          | `NOT_STARTED`            |
| Data deletion request        | `NOT_STARTED`            |
| Retention policy             | `NOT_STARTED`            |
| Legal hold                   | `NOT_STARTED`            |
| Provider secret safety       | `DOCUMENTED_REQUIREMENT` |
| Service role safety          | `DOCUMENTED_REQUIREMENT` |
| CSP/security headers         | `NOT_STARTED`            |
| XSS sanitization             | `NOT_STARTED`            |
| Open redirect protection     | `NOT_STARTED`            |
| Upload security              | `NOT_STARTED`            |
| Admin export security        | `NOT_STARTED`            |
| Maker-checker                | `NOT_STARTED`            |
| Incident response            | `DOCUMENTED_BASELINE`    |
| Emergency kill switches      | `NOT_STARTED`            |
| Manual verification          | `NOT_STARTED`            |

---

## 78. Documentation Generation Progress

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
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`    | Created |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Created |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Created |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Created |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Created |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 79. Related Documents

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
* `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`
* `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
* `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`
* `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
* `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`
* `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`
* `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md`
* implementation prompts
* manual verification prompts
* SQL migrations
* RLS policies

---

## 80. Final Security/Privacy/Legal Rule

Security must be real.

Privacy must be real.

Consent must be recorded where required.

RLS must protect sensitive data.

Public pages must use public-safe data only.

Hidden contact must never leak.

Private documents must never be public.

Service role must never reach the client.

Provider secrets must never be exposed.

Payment verification must be server-side.

Legal disclaimers must be clear and truthful.

Verification/RERA badges must not imply legal guarantee.

Fraud/report workflows must protect users and reporters.

Audit logs must exist for sensitive actions.

Rate limits must protect abuse-sensitive flows.

Data export/delete/retention must respect legal and privacy rules.

No fake legal guarantee.

No fake security.

No fake privacy.

No fake consent.

No fake verification.

No fake payment.

No fake PASS.
