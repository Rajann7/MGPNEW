# prompts/00_PROMPT_USAGE_RULES.md

# My Gujarat Property — Prompt Usage Rules For Claude Code

This file defines how to use all prompt files for **My Gujarat Property** implementation in Claude Code.

This is the master prompt-pack usage guide.

Claude must read this file before using any implementation prompt or manual verification prompt.

Do not skip this file.

Do not skip verification prompts.

Do not mark a phase complete without updating required docs.

Do not mark PASS without real verification.

---

## 1. Purpose

This file explains:

* how to use the prompt pack
* prompt execution order
* implementation prompt rules
* manual verification prompt rules
* required docs to read
* token-light workflow
* Claude Code session workflow
* two-account continuity rules
* final response format
* docs update requirements
* SQL migration requirements
* setup-required handling
* feature registry updates
* changelog updates
* bugs/fixes updates
* manual verification updates
* provider status updates
* security/RLS checklist updates
* performance checklist updates
* deployment/rollback updates
* no fake PASS rules

This file is not optional.

---

## 2. Prompt Pack Structure

The full project pack has:

```txt id="pack-count"
26 detailed documentation files
31 prompt files
57 total files
```

The prompt pack starts at file 27.

Prompt files are split into:

1. usage rules
2. implementation prompts
3. manual verification prompts
4. final production signoff prompts

Each implementation prompt has a matching manual verification prompt.

Implementation without verification is incomplete.

---

## 3. Full Prompt Pack Order

Use prompts in this exact order unless Super Admin explicitly changes the phase order.

| File No. | Prompt File                                                                   | Purpose                                           |
| -------: | ----------------------------------------------------------------------------- | ------------------------------------------------- |
|       27 | `prompts/00_PROMPT_USAGE_RULES.md`                                            | prompt usage rules                                |
|       28 | `prompts/01_PROJECT_SETUP_BASELINE.md`                                        | project setup baseline                            |
|       29 | `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md`                    | verify setup baseline                             |
|       30 | `prompts/02_AUTH_ROLES_RLS_FOUNDATION.md`                                     | auth, roles, RLS foundation                       |
|       31 | `prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md`                 | verify auth/roles/RLS                             |
|       32 | `prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`                             | public UI, home, header, footer, hero             |
|       33 | `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`         | verify public UI                                  |
|       34 | `prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`                           | property/project/requirement system               |
|       35 | `prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`       | verify listing/project/requirement                |
|       36 | `prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`                              | search, detail pages, profiles, SEO               |
|       37 | `prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`          | verify search/detail/profile/SEO                  |
|       38 | `prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md`                               | public role dashboards                            |
|       39 | `prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md`           | verify dashboards                                 |
|       40 | `prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`                                | admin/staff/super admin                           |
|       41 | `prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`            | verify admin/staff                                |
|       42 | `prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`                     | leads, CRM, proposals, messages                   |
|       43 | `prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md` | verify leads/CRM/messages                         |
|       44 | `prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`                        | billing, payment, subscription, GST               |
|       45 | `prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`    | verify billing/payment                            |
|       46 | `prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md`                                  | media, storage, R2, CDN                           |
|       47 | `prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md`              | verify media/storage                              |
|       48 | `prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md`                                 | location, search, SEO, CMS, legal                 |
|       49 | `prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md`             | verify location/search/SEO/CMS/legal              |
|       50 | `prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`                         | ads, promotions, notifications, providers         |
|       51 | `prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`     | verify ads/notifications/providers                |
|       52 | `prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`                            | security, privacy, fraud, rate limits             |
|       53 | `prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`        | verify security/privacy/fraud                     |
|       54 | `prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`                         | performance, caching, deployment                  |
|       55 | `prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`     | verify performance/deployment                     |
|       56 | `prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`                      | final production API/provider testing and signoff |
|       57 | `prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`  | final manual production signoff                   |

---

## 4. Mandatory Pairing Rule

Every implementation prompt must be followed by its manual verification prompt.

Example:

```txt id="prompt-pair-example"
Run prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
Then run prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
```

Never move to the next implementation phase until:

* implementation prompt completed
* related docs updated
* tests run
* manual verification prompt completed
* issues fixed or documented
* phase status is PASS/PARTIAL/BLOCKED with exact notes
* user/Super Admin approves moving forward if not PASS

---

## 5. Required Root Docs

Claude must keep these root docs updated:

```txt id="root-docs"
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
```

These files are project memory.

Do not rely on chat memory only.

Two Claude accounts may work on the project, so docs must preserve continuity.

---

## 6. Required Detailed Docs

Claude must read the relevant detailed docs for each phase.

Detailed docs:

```txt id="detailed-docs"
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

Read only the relevant detailed docs plus root docs to stay token-light.

Do not paste all docs into every prompt.

---

## 7. Token-Light Rule

Use token-light workflow.

Claude should:

* read relevant docs by file path
* avoid pasting full docs repeatedly
* inspect current code before changing
* avoid reprinting large files unless necessary
* summarize changed files, not full contents
* use exact file paths
* use targeted diffs
* use `/compact` when context gets long
* use `/clear` only when switching unrelated tasks
* update `brain.md` before ending big sessions
* keep final response structured and concise

Token-light does not mean low quality.

Security, RLS, performance, migrations and verification cannot be skipped for token savings.

---

## 8. Claude Code Session Start Rule

At the start of any Claude Code session, Claude must:

1. read `CLAUDE.md`
2. read `brain.md`
3. read this file if using prompts
4. read current prompt file
5. read matching detailed docs
6. inspect project structure
7. inspect relevant existing code
8. inspect existing routes/components/tables
9. check for duplicate/conflicting implementations
10. create a short implementation plan before edits

Do not start coding blindly.

---

## 9. Existing Code Preservation Rule

Before changing anything, Claude must inspect:

* existing routes
* existing components
* existing database schema
* existing RLS policies
* existing server actions/API routes
* existing UI patterns
* existing docs
* existing provider status
* existing migrations

Claude must not:

* remove working features without approval
* duplicate routes/components
* silently rewrite architecture
* break existing header/city selector
* break working homepage
* remove security
* disable RLS
* bypass approval workflows
* introduce fake data

Preserve working approved behavior.

---

## 10. User-Specified Preservation Rule

The project has an existing guest and owner homepage header/city selector that is considered ready.

Rules:

* preserve existing design unless explicit instruction says otherwise
* old homepage hero copy only goes into Hero Search Section below existing header
* do not replace existing header/city selector unnecessarily
* do not add AI/API/maps/WhatsApp/OTP/payment/Cloudflare until relevant phase
* do not remove working public UI
* do not make major redesign without approval

---

## 11. Implementation Prompt Rule

When running an implementation prompt, Claude must:

1. read required docs
2. inspect current code
3. list files likely to change
4. identify needed SQL migrations
5. identify RLS/security impact
6. identify provider dependencies
7. identify setup-required items
8. implement smallest safe complete phase
9. update docs
10. run checks/tests
11. provide final implementation summary

Implementation must be complete for the phase scope unless blocked.

If blocked, mark exact blocker and continue safe partial work where possible.

---

## 12. Manual Verification Prompt Rule

When running a manual verification prompt, Claude must:

1. read matching implementation prompt
2. read relevant docs
3. inspect implementation
4. run automated checks if available
5. provide manual testing steps
6. verify role access
7. verify responsive widths
8. verify RLS/direct URL behavior where possible
9. verify provider setup-required states
10. verify hidden contact/private data safety
11. record PASS/PARTIAL/FAIL/BLOCKED
12. update `MANUAL_VERIFICATION.md`
13. update `BUGS_AND_FIXES.md` if issues found
14. update `FEATURE_REGISTRY.md`
15. update `brain.md`

Manual verification cannot be vague.

---

## 13. Phase Status Rule

Allowed phase statuses:

| Status           | Meaning                                                |
| ---------------- | ------------------------------------------------------ |
| `NOT_STARTED`    | not started                                            |
| `IN_PROGRESS`    | actively being implemented                             |
| `DONE`           | implementation done but not necessarily fully verified |
| `PASS`           | implementation and verification passed                 |
| `PARTIAL`        | partly complete or partly verified                     |
| `FAIL`           | verification failed                                    |
| `BLOCKED`        | blocked by dependency or issue                         |
| `SETUP_REQUIRED` | external provider/config required                      |
| `ROLLED_BACK`    | change rolled back                                     |

Use exact status.

Do not use vague words like:

* done
* almost done
* should work
* probably works
* seems fine
* ready maybe

---

## 14. PASS Rule

A phase can be marked `PASS` only if:

* implementation is complete for scope
* `npm run lint` passed
* `npm run typecheck` passed
* `npm run build` passed
* **`npm run dev` was started and live browser preview was checked for all changed routes/flows**
* related SQL migrations are applied/tested
* RLS/security rules pass
* direct URL checks pass for sensitive pages
* responsive UI checked where relevant (in browser devtools)
* provider dependencies tested or clearly setup-required
* no fake data
* no hidden contact leak
* no private document leak
* manual verification completed
* docs updated
* pending issues documented
* rollback notes exist where relevant

`npm run dev` live browser check is required for PASS. Build passing alone is not sufficient.

If any major area is untested, status is `PARTIAL`, `BLOCKED`, `SETUP_REQUIRED` or `NOT_TESTED`.

---

## 15. No Fake Completion Rule

Claude must never say complete/PASS if:

* `npm run dev` was not started and browser was not checked
* live browser preview was not completed for changed routes
* provider is missing
* payment webhook not verified
* OTP not configured
* media storage not configured
* RLS not tested
* hidden contact not checked
* admin permissions not checked
* mobile responsive not checked
* direct URL not checked
* SQL migration not created
* docs not updated
* build/test not run
* fake data is still visible
* demo/test mode used as production real

Use honest status.

---

## 16. Setup-Required Rule

If a provider/config is missing, Claude must:

* mark feature `SETUP_REQUIRED`
* keep feature safely disabled or fallback
* show clear UI state
* update `API_PROVIDER_STATUS.md`
* update `FEATURE_REGISTRY.md`
* update `MANUAL_VERIFICATION.md`
* avoid fake success
* avoid mock production behavior
* document exact env/config needed

Examples:

* OTP provider missing
* Razorpay missing
* R2 missing
* email provider missing
* WhatsApp API missing
* maps provider missing
* Turnstile missing
* cron/jobs missing
* PDF generator missing
* analytics missing

---

## 17. SQL Migration Rule

Any database change requires SQL migration.

Migration must be stored in:

```txt id="migration-folder"
supabase/migrations/
```

Recommended naming:

```txt id="migration-naming"
YYYYMMDDHHMMSS_descriptive_name.sql
```

Migration file must include comments for:

* purpose
* phase
* affected tables
* affected RLS policies
* affected indexes
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB schema drift without migration.

---

## 18. RLS Rule

For every table with private/sensitive data:

* RLS enabled
* policies defined
* public-safe view if public data needed
* wrong-user access denied
* guest access denied unless public-safe
* staff permissions enforced
* service role only trusted server-side
* direct URL/API bypass tested

RLS must never be disabled to “fix” a feature.

RLS policy relaxation requires explicit approval and documentation.

---

## 19. Public-Safe View Rule

Public pages must not query private tables directly in a way that can leak fields.

Use public-safe views or scoped queries that exclude:

* hidden phone
* hidden email
* private address
* private docs
* leads
* messages
* invoices
* payment data
* audit logs
* admin notes
* moderation notes
* verification proof
* provider settings

---

## 20. Hidden Contact Rule

Hidden contact must never appear in:

* public HTML
* public API payload
* metadata
* schema
* sitemap
* share text
* SEO pages
* search cards
* listing cards
* public profiles
* public notifications
* logs
* media metadata
* cached payload

Contact reveal must be authenticated, authorized, logged and rate-limited.

---

## 21. Provider Rule

Provider-backed features must check provider status.

Providers include:

* Supabase
* OTP/SMS
* email
* WhatsApp
* Razorpay
* Google Maps
* Cloudflare R2
* Cloudflare CDN
* Turnstile
* analytics
* error tracking
* cron/background jobs
* PDF generation
* media processing
* push notifications

Provider missing means setup-required or disabled.

Do not fake provider success.

---

## 22. Payment Rule

Payment features must follow:

* server-side amount calculation
* server-side order creation
* Razorpay webhook signature verification
* idempotent webhook processing
* no client-only activation
* failed payment inactive
* pending payment inactive
* invoice after verified payment only
* manual activation permission-gated and audited
* refunds/credit notes permission-gated and audited

No fake payment.

No fake invoice.

---

## 23. Media Rule

Media features must follow:

* storage provider real/setup-required
* upload validation server-side
* public/private bucket separation
* private docs signed URL only
* project one video max
* optimized images where configured
* no fake upload success
* no private document public URL
* no private media in CDN
* no unsafe SVG
* no executable upload

---

## 24. Admin Rule

Admin/staff features must follow:

* separate login
* invite-only staff
* no public registration
* noindex
* permission-scoped modules
* server-side permission checks
* private document permission
* export permission
* audit logs
* provider secrets masked
* direct URL denied

Public users must never access admin.

---

## 25. UI Rule

Every UI feature must have:

* loading state
* empty state
* error state
* unauthorized/forbidden state if private
* setup-required state if provider-backed
* disabled reason
* mobile responsive layout
* no horizontal scroll
* no overlap
* no dead buttons
* no dead links
* no fake counts
* no hidden contact leak

Required responsive widths:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

---

## 26. Legal And Consent Rule

Flows must include required legal/consent notices:

* Terms acceptance
* Privacy Policy acceptance
* OTP/data notice
* contact sharing consent
* cookie preference
* marketing opt-in
* listing policy acceptance
* ad policy acceptance
* payment/refund/cancellation links
* verification disclaimer
* RERA disclaimer
* site visit safety notice
* support/grievance links

No fake guarantee.

No legal advice claim.

No investment return guarantee.

---

## 27. Feature Registry Update Rule

After each phase, update:

```txt id="feature-registry-file"
FEATURE_REGISTRY.md
```

Every feature touched must have:

* feature ID/name
* module
* status
* owner/scope
* docs reference
* implementation files
* SQL migration files
* verification status
* provider dependencies
* setup-required notes
* known bugs
* next steps

No feature should silently disappear.

---

## 28. Changelog Update Rule

After every meaningful change, update:

```txt id="changelog-file"
CHANGELOG.md
```

Changelog entry must include:

* date
* phase/prompt
* summary
* changed files
* migrations
* provider changes
* RLS/security changes
* verification status
* known issues
* rollback notes where relevant

---

## 29. Bugs And Fixes Update Rule

If bug is found, update:

```txt id="bugs-file"
BUGS_AND_FIXES.md
```

Bug entry must include:

* bug ID
* date
* severity
* module
* description
* reproduction
* expected
* actual
* root cause if known
* fix status
* changed files
* verification status
* follow-up

Critical bugs include:

* hidden contact leak
* private document leak
* RLS bypass
* admin public access
* fake payment success
* provider secret leak
* service role leak
* public private data cache
* production fake provider status

---

## 30. Manual Verification Update Rule

After verification, update:

```txt id="manual-verification-file"
MANUAL_VERIFICATION.md
```

Entry must include:

* phase
* environment
* tester
* date
* roles tested
* routes tested
* devices/widths tested
* test steps
* expected
* actual
* result
* issues found
* pending items
* final status

No vague verification.

---

## 31. API Provider Status Update Rule

If provider status changes, update:

```txt id="api-provider-status-file"
API_PROVIDER_STATUS.md
```

Provider record must include:

* provider name
* feature/module
* env vars needed
* current mode
* current status
* test/live status
* last tested
* safe error
* fallback
* setup-required notes
* production readiness

Never show real secrets.

---

## 32. Security Checklist Update Rule

If security/RLS/privacy changes, update:

```txt id="security-checklist-file"
SECURITY_RLS_CHECKLIST.md
```

Update for:

* RLS policies
* auth rules
* role permissions
* contact privacy
* private documents
* admin/staff permissions
* provider secrets
* payment security
* uploads
* audit logs
* rate limits
* direct URL tests
* security test results

---

## 33. Performance Checklist Update Rule

If performance/caching/index changes, update:

```txt id="performance-checklist-file"
PERFORMANCE_CHECKLIST.md
```

Update for:

* indexes
* pagination
* search performance
* media optimization
* cache strategy
* no-store private data
* provider timeouts
* background jobs
* build/performance checks
* load test status
* Core Web Vitals notes

---

## 34. Deployment Rollback Update Rule

If deployment, migration, provider or risky feature changes, update:

```txt id="deployment-rollback-file"
DEPLOYMENT_ROLLBACK.md
```

Update for:

* backup requirement
* migration
* rollback strategy
* feature flag
* provider rollback
* cache purge
* verification
* deployment status
* incident notes if any

---

## 35. Brain Update Rule

Before ending a major Claude Code session, update:

```txt id="brain-file"
brain.md
```

`brain.md` must include:

* current phase
* completed work
* changed files
* migrations
* current blockers
* setup-required providers
* bugs found
* verification status
* next prompt to run
* exact resume instructions

This supports two Claude accounts and long-context continuity.

---

## 36. Final Response Format After Implementation

Claude final response after implementation must include:

```txt id="implementation-final-format"
Summary:
- what was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Docs updated:
- path list

Tests/checks run:
- command and result

Manual verification:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Provider status:
- relevant providers

Security/RLS:
- what changed and status

Known issues:
- exact issues or none

Rollback notes:
- exact notes if relevant

Next step:
- next prompt/manual verification
```

Do not say simply “done”.

---

## 37. Final Response Format After Manual Verification

Claude final response after manual verification must include:

```txt id="verification-final-format"
Verification Summary:
- phase verified

Environment:
- local/staging/production

Roles tested:
- guest/owner/broker/builder/admin/staff as applicable

Routes tested:
- route list

Devices/widths tested:
- width list

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Issues found:
- bug IDs or none

Docs updated:
- path list

Retest needed:
- yes/no and why

Next step:
- next implementation prompt or fix
```

Do not mark PASS if not fully tested.

---

## 38. Prompt Execution Command Format

When asking Claude Code to run a prompt, use:

```txt id="run-prompt-format"
Read and follow prompts/XX_PROMPT_NAME.md.

Before editing:
- read CLAUDE.md
- read brain.md
- read prompts/00_PROMPT_USAGE_RULES.md
- read the required docs listed in the prompt
- inspect current code and database files

Implement only this phase.
Do not skip docs updates.
Do not fake PASS.
Return final summary using the required format.
```

For manual verification:

```txt id="run-verification-prompt-format"
Read and follow prompts/XX_MANUAL_VERIFICATION_NAME.md.

Verify the matching implementation phase.
Update MANUAL_VERIFICATION.md, FEATURE_REGISTRY.md, BUGS_AND_FIXES.md if issues are found, and brain.md.
Do not mark PASS unless fully verified.
Return final verification summary using the required format.
```

---

## 39. Phase Progression Rule

Progression is:

```txt id="phase-progression"
Implementation Prompt
→ Fix build/test issues
→ Update docs
→ Manual Verification Prompt
→ Fix discovered bugs
→ Retest
→ Mark phase PASS/PARTIAL/BLOCKED
→ Move to next implementation prompt
```

Do not run all implementation prompts first and verify later.

Verification is part of every phase.

---

## 40. Incomplete Feature Rule

If feature cannot be fully implemented now:

* implement safe foundation if possible
* mark status `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`
* add disabled/setup-required UI state
* update `FEATURE_REGISTRY.md`
* update `BUGS_AND_FIXES.md` if bug
* update `MANUAL_VERIFICATION.md`
* update `brain.md`
* do not show public fake feature
* do not mark PASS

---

## 41. Feature Flag Rule

Use feature flags for:

* incomplete provider-backed features
* risky UI rewrites
* payment checkout
* contact reveal
* media upload
* ads display
* notifications external send
* maps
* analytics
* advanced features
* PWA service worker
* admin exports
* bulk actions

Feature flags must be backend-enforced for sensitive features.

Frontend-only flags are not enough for security.

---

## 42. Environment Rule

Handle environments honestly:

* local
* preview
* staging
* production

Rules:

* production must not use mock OTP
* production must not use test payment as real
* production must not use fake provider status
* production must not expose demo data as real
* staging may use test providers
* `.env.example` placeholders only
* secrets never committed

---

## 43. Testing Command Rule

Claude must run ALL of the following for every verification phase:

**Step 1 — Automated checks:**

* `npm run lint`
* `npm run typecheck` (or `npx tsc --noEmit`)
* `npm run build`
* unit tests if configured
* integration tests if configured
* SQL/RLS tests via Supabase Management API where applicable

**Step 2 — Live dev server (mandatory, every phase):**

* Run `npm run dev` to start the local dev server
* Open the app in browser (localhost:3000 or configured port)
* Visually verify every changed route, page, component and flow
* Do NOT mark a phase PASS using build success alone
* Live browser preview is a required verification step, not optional

**Step 3 — Record results:**

* Record each command with its exact result
* Record each browser check with pass/fail/blocked
* If a command is unavailable or fails, document exact command, exact result, and mark verification accordingly
* Do not fake success

---

## 44. Responsive Verification Rule

For UI phases, run `npm run dev` and verify in browser devtools responsive mode at:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

Check:

* no horizontal scroll
* no overlap
* header readable
* forms usable
* modals/bottom sheets usable
* tables become cards
* sticky CTAs not covering content
* no dead links/buttons
* loading/empty/error states

If browser check was not run, mark `PARTIAL` or `BLOCKED` — not `PASS`.

---

## 45. Security Verification Rule

For security-sensitive phases, verify:

* guest denied private data
* wrong owner denied
* wrong broker denied
* wrong builder denied
* staff permission enforced
* hidden contact absent
* private docs protected
* direct URL denied
* RLS policies active
* service role not client
* provider secrets hidden
* logs redacted

Security-sensitive phase cannot PASS without these checks.

---

## 46. Payment Verification Rule

Payment phase cannot PASS unless:

* Razorpay configured in expected environment
* order creation server-side
* webhook signature verified
* valid webhook activates subscription
* invalid webhook rejected
* duplicate webhook idempotent
* failed/pending payment inactive
* invoice generated after verified payment
* invoice own-only
* logs safe
* manual activation audited

If Razorpay not configured, status is `SETUP_REQUIRED`.

---

## 47. Media Verification Rule

Media phase cannot PASS unless:

* storage configured or setup-required honestly shown
* upload validates file type/size
* public/private buckets separated
* private docs protected
* signed URLs work/expire
* wrong user denied
* project one-video max enforced
* public media optimized or setup-required tracked
* no fake upload success
* media RLS checked

---

## 48. Admin Verification Rule

Admin phase cannot PASS unless:

* public users denied
* owner/broker/builder denied
* admin/staff login separate
* staff invite-only
* permissions enforced server-side
* staff direct URL denied
* private doc permission enforced
* provider secrets masked
* audit logs created
* admin noindex
* responsive admin checked

---

## 49. SEO Verification Rule

SEO phase cannot PASS unless:

* public-safe pages only
* hidden contact absent from metadata/schema
* private pages noindex
* sitemap excludes private/noindex pages
* canonical works
* no fake reviews/ratings
* empty/thin pages noindex
* redirects safe
* legal/footer links work

---

## 50. Performance Verification Rule

Performance phase cannot PASS unless:

* public search paginated
* admin tables paginated
* common filters indexed
* private pages no-store
* media optimized/lazy
* no unbounded reads
* build passes
* major public pages acceptable
* caching does not leak private data
* provider timeouts safe
* deployment/rollback docs updated

Load test may be `NEEDS_LOAD_TEST` if not performed.

---

## 51. Production Signoff Rule

Final production signoff requires:

* all critical phases PASS or approved exception
* RLS final pass
* hidden contact pass
* private docs pass
* admin/staff pass
* payment/webhook pass if payment enabled
* providers live-ready or disabled/setup-required
* backup ready
* rollback ready
* monitoring ready
* legal pages ready
* no fake/demo data
* Super Admin approval

No production launch without signoff.

---

## 52. Common Mistakes To Avoid

Do not:

* skip manual verification prompts
* implement prompt out of order without reason
* mark PASS without tests
* leave docs outdated
* create DB tables without migration
* disable RLS to fix access
* expose service role
* show hidden contact publicly
* use fake counts
* use fake provider status
* activate payment from client callback
* put private docs in public bucket
* show admin links publicly
* leave dead buttons
* leave `href="#"`
* add AI features without approval
* use mock providers in production
* ignore mobile widths
* ignore direct URL bypass
* ignore rollback notes

---

## 53. Prompt Pack Completion Tracking

Prompt pack progress:

| File No. | File                                                                          | Status  |
| -------: | ----------------------------------------------------------------------------- | ------- |
|       27 | `prompts/00_PROMPT_USAGE_RULES.md`                                            | Created |
|       28 | `prompts/01_PROJECT_SETUP_BASELINE.md`                                        | Pending |
|       29 | `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md`                    | Pending |
|       30 | `prompts/02_AUTH_ROLES_RLS_FOUNDATION.md`                                     | Pending |
|       31 | `prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md`                 | Pending |
|       32 | `prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`                             | Pending |
|       33 | `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`         | Pending |
|       34 | `prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`                           | Pending |
|       35 | `prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`       | Pending |
|       36 | `prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`                              | Pending |
|       37 | `prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`          | Pending |
|       38 | `prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md`                               | Pending |
|       39 | `prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md`           | Pending |
|       40 | `prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`                                | Pending |
|       41 | `prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`            | Pending |
|       42 | `prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`                     | Pending |
|       43 | `prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md` | Pending |
|       44 | `prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`                        | Pending |
|       45 | `prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`    | Pending |
|       46 | `prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md`                                  | Pending |
|       47 | `prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md`              | Pending |
|       48 | `prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md`                                 | Pending |
|       49 | `prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md`             | Pending |
|       50 | `prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`                         | Pending |
|       51 | `prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`     | Pending |
|       52 | `prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`                            | Pending |
|       53 | `prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`        | Pending |
|       54 | `prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`                         | Pending |
|       55 | `prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`     | Pending |
|       56 | `prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`                      | Pending |
|       57 | `prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`  | Pending |

---

## 54. Related Documentation

This prompt usage file must stay aligned with:

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
* all `docs/*.md`
* all `prompts/*.md`
* SQL migrations
* RLS policies
* implementation code

---

## 55. Final Prompt Usage Rule

Use prompts in order.

Read relevant docs first.

Inspect current code first.

Preserve working features.

Implement only the current phase.

Create SQL migrations for DB changes.

Enforce RLS/security server-side.

Update docs after changes.

Run tests/checks.

Run the matching manual verification prompt.

Do not mark PASS without real verification.

Do not fake provider status.

Do not fake payment.

Do not fake analytics.

Do not fake upload.

Do not leak hidden contact.

Do not leak private documents.

Do not expose service role or provider secrets.

Do not skip responsive checks.

Do not skip rollback notes.

Do not skip `brain.md`.

No fake completion.

No fake PASS.

## Mandatory Role-Based Home Design Clarification

In addition to all saved docs and prompts, treat role-based home design as mandatory.

Create/design separate role-specific landing/home/dashboard experiences for:

* Guest/Public Home
* Owner Home
* Broker/Agent Home
* Builder/Developer Home

Do not use one generic dashboard/home for all roles.

Each role home must have its own layout, cards, CTAs, modules, quick actions, navigation priorities, real-data/no-data stats, notifications, billing/status blocks, support links, and mobile-first responsive design.

Guest/Public Home must focus on search, city selector, public property/project discovery, login/register popup triggers, SEO sections, public-safe content, and hidden contact protection.

Owner Home must focus on post property, post requirement, own listings, own requirements, leads, inquiries, messages, notifications, billing, profile, verification, and support.

Broker/Agent Home must focus on post property, post requirement, CRM, leads, proposals, messages, site visits, saved searches, billing, verification, public profile, and support.

Builder/Developer Home must focus on post project only, project inventory, project leads, matching buying requirements, proposals, messages, site visits, ads/promotions, RERA/payment status, billing, profile, verification, and support.

All role homes must be mobile-first, responsive, no horizontal scroll, no fake counts, no fake analytics, no fake leads, no fake payment, no fake provider data, and no private/hidden contact leaks.

Implement and verify this requirement during:

* prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
* prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
* prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
* prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
