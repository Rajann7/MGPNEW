# prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md

# My Gujarat Property — Prompt 02 Manual Verification: Auth, Roles And RLS Foundation

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/02_AUTH_ROLES_RLS_FOUNDATION.md
```

This prompt verifies the **Auth, Roles, Profiles, Staff/Admin Separation and RLS Foundation** phase.

Do not skip this verification.

Do not start Prompt 03 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real auth/security/RLS checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md
Prompt Number: 02 Verification
Phase: Auth, Roles And RLS Foundation
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/02_AUTH_ROLES_RLS_FOUNDATION.md
Previous Prompt: prompts/02_AUTH_ROLES_RLS_FOUNDATION.md
Next Implementation Prompt: prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that the authentication and role-security foundation is safe enough for future marketplace features.

This verification checks:

* public auth foundation
* mobile OTP login/register behavior
* OTP provider setup-required behavior
* Owner/Broker/Builder role registration
* profile creation
* role profile creation
* account status handling
* logout/session behavior
* route guards
* wrong-role access denial
* admin/staff separate auth route
* no public admin registration
* no admin mobile OTP login
* invite-only staff foundation
* staff permissions foundation
* RLS enabled on private tables
* RLS policies for own/private data
* public-safe views exclude private data
* service role safety
* provider secret safety
* hidden contact baseline
* consent baseline
* auth audit events
* rate limit baseline
* migrations
* docs updated
* bugs logged
* checks run
* Prompt 03 readiness

This phase does not verify full product workflows like property posting, payment, media upload or dashboards. It verifies the security base those future workflows will depend on.

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
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect all changed implementation files from Prompt 02.

Do not paste entire docs into the final response.

Use file paths and concise verification notes.

---

## 4. Verification Scope

This verification covers:

* auth foundation
* public role foundation
* profile creation foundation
* admin/staff auth separation foundation
* staff permission foundation
* route guard foundation
* RLS foundation
* provider setup-required states
* consent/audit/rate-limit baseline
* docs/checklist updates

This verification does not require full implementation of:

* full property posting
* full project posting
* full requirement posting
* complete dashboards
* complete admin modules
* full CRM
* billing/payment
* media upload
* ads/promotions
* notification delivery
* public search/SEO
* CMS/legal full implementation
* analytics/PWA

Those features must remain `NOT_STARTED`, `PARTIAL`, `DOCUMENTED_BASELINE` or `SETUP_REQUIRED` until their phases.

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 02 changed files
3. inspect migrations
4. inspect auth helpers/server actions/API routes
5. inspect route guards/middleware
6. inspect auth UI components
7. inspect admin/staff routes
8. inspect RLS policies
9. inspect public-safe views
10. search for secret exposure
11. run available automated checks
12. run manual auth smoke checks where possible
13. run RLS/direct URL checks where possible
14. update required docs
15. create bugs for failures
16. decide final verification status
17. update `brain.md`
18. prepare Prompt 03 readiness note

Do not skip docs updates.

---

## 6. Required File And Route Inspection

Inspect files and folders related to auth and RLS.

Possible locations:

```txt id="auth-file-inspection"
src/app/login/
src/app/register/
src/app/auth/
src/app/dashboard/
src/app/dashboard/owner/
src/app/dashboard/broker/
src/app/dashboard/builder/
src/app/admin/
src/app/admin/login/
app/login/
app/register/
app/auth/
app/dashboard/
app/admin/
src/components/auth/
components/auth/
src/lib/auth/
lib/auth/
src/lib/permissions/
lib/permissions/
src/lib/supabase/
lib/supabase/
src/middleware.ts
middleware.ts
src/types/
types/
supabase/migrations/
```

Also inspect:

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
.env.example
```

Record exact files changed by Prompt 02.

---

## 7. Migration Verification

Check whether Prompt 02 created a SQL migration.

Expected migration if DB schema was changed:

```txt id="expected-migration"
supabase/migrations/*_auth_roles_rls_foundation.sql
```

Verify migration includes comments for:

* purpose
* phase
* tables created/changed
* RLS policies created/changed
* indexes created
* destructive changes yes/no
* backup required yes/no
* rollback notes

If DB was changed without migration:

* create critical bug
* mark verification `FAIL`
* do not start Prompt 03

If no DB changes were made because Supabase is not configured:

* mark DB/RLS portions `SETUP_REQUIRED` or `PARTIAL`
* ensure docs reflect this honestly

---

## 8. Database Table Verification

If migration/schema exists, verify expected tables or equivalent exist.

Expected/possible tables:

```txt id="auth-expected-tables"
profiles
owner_profiles
broker_profiles
builder_profiles
staff_profiles
staff_permissions
staff_invites
role_change_requests
user_consents
auth_audit_events
```

Not all optional tables must exist if documented as deferred, but core profile/role/staff/RLS foundation must be honest.

Minimum expected for a usable Prompt 02 foundation:

* `profiles`
* role information or role profile tables
* staff/admin separation table or documented setup-required
* user consent table or documented baseline
* RLS policies or setup-required if DB unavailable

If tables are missing but implementation claims they exist:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 9. Profiles Table Verification

Verify `profiles` or equivalent supports:

* auth user link
* public role
* full/display name
* email/mobile private fields
* account status
* verification status placeholder
* created/updated timestamps

Check:

* mobile/email are not exposed publicly
* user can access own profile
* wrong user cannot access profile
* role cannot be directly changed by user unless approved flow exists
* account status can block access later
* verification status is not used to fake verified badge

If profile data is public by default:

* create critical bug
* mark `FAIL`

---

## 10. Public Role Profile Verification

Verify role profile foundation:

### Owner

* owner user has owner profile or equivalent
* owner can access owner route
* owner cannot access broker/builder dashboard as allowed user
* owner cannot access admin

### Broker

* broker user has broker profile or equivalent
* broker can access broker route
* broker cannot access owner/builder dashboard as allowed user
* broker cannot access project posting as allowed feature
* broker cannot access admin

### Builder

* builder user has builder profile or equivalent
* builder can access builder route
* builder cannot access owner/broker dashboard as allowed user
* builder cannot access normal property posting as allowed feature
* builder cannot access admin

If role guards are client-only:

* create bug
* mark `FAIL` or `PARTIAL` depending exposure

---

## 11. Account Status Verification

Verify account status handling foundation.

Expected statuses:

```txt id="account-statuses"
active
pending
suspended
banned
deleted
```

Check:

* active user allowed role-scoped access
* suspended/banned states are represented or documented
* server helper checks status or status check is documented as pending
* no banned/suspended user can be treated as normal if implemented
* no fake account status shown

If statuses are only UI labels with no server handling:

* mark `PARTIAL`
* create bug/task if required for current access control

---

## 12. Verification Status Placeholder Check

Expected profile verification statuses:

```txt id="verification-statuses"
not_started
pending
under_review
need_changes
verified
rejected
expired
revoked
```

Verify:

* no verified badge is shown unless real `verified`
* no fake verified user
* verification workflow clearly deferred
* badge disclaimer deferred to verification phase
* status is not hardcoded to verified

If fake verified badge/status appears:

* create critical bug
* mark `FAIL`

---

## 13. Public Auth UI Verification

Check auth UI foundation.

Verify:

* guest can see login/register entry where designed
* login/register opens popup/page/bottom sheet
* mobile number input exists if public OTP flow implemented
* registration form has:

  * full name
  * email where configured
  * mobile number
  * Owner/Broker/Builder role selector
  * terms/privacy consent baseline
* loading state exists
* validation error state exists
* setup-required state exists if OTP missing
* no raw provider errors
* no fake OTP sent message if provider missing
* no admin registration option

If public auth button is dead:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 14. OTP Provider Verification

Check OTP behavior.

If OTP provider is configured and intended active:

* verify OTP request uses real provider/Supabase phone OTP
* verify OTP response is safe
* verify OTP not logged
* verify OTP verify step works
* verify failed OTP does not login
* verify resend cooldown/rate limit if implemented
* verify mobile marked verified only after real verification

If OTP provider is not configured:

* UI must show setup-required
* `API_PROVIDER_STATUS.md` must mark OTP as `SETUP_REQUIRED`
* no fake OTP sent
* no fake login success
* no production mock OTP

If fake OTP success exists:

* create critical bug
* mark `FAIL`

---

## 15. Existing User Login Flow Verification

If login is implemented, verify:

1. existing mobile/account recognized
2. OTP sent only if provider configured
3. OTP verification required
4. profile fetched
5. account status checked
6. role loaded
7. login/register links hidden after login
8. user redirected to intended route or role dashboard
9. safe error shown on failure

If provider missing:

* verify setup-required state instead of fake login

If login bypass exists:

* create critical bug
* mark `FAIL`

---

## 16. Registration Flow Verification

If registration is implemented, test or inspect:

1. mobile not registered shows registration
2. full name required
3. email validation if email collected
4. mobile validation
5. role selection required
6. invalid role rejected
7. Terms/Privacy consent captured or documented
8. OTP verification required
9. auth user created only after valid flow
10. `profiles` record created
11. correct role profile created
12. audit event created if implemented
13. redirect works after success
14. no fake registration success

If profile creation can fail after auth creation:

* verify error handling/repair path documented
* create bug if inconsistent state likely

---

## 17. Logout Verification

Verify logout:

* ends session
* hides private UI
* redirects to public-safe page
* clears private dashboard state
* does not leave private data visible
* login/register visible again where intended
* no error/raw secret shown

If logout broken:

* create bug
* mark `PARTIAL` or `FAIL` depending severity

---

## 18. Route Guard Verification

Verify route guards for:

```txt id="route-guard-checks"
guest → /dashboard denied
guest → /dashboard/owner denied
guest → /dashboard/broker denied
guest → /dashboard/builder denied
guest → /admin denied
owner → /dashboard/owner allowed
owner → /dashboard/broker denied
owner → /dashboard/builder denied
owner → /admin denied
broker → /dashboard/broker allowed
broker → /dashboard/owner denied
broker → /dashboard/builder denied
broker → /admin denied
builder → /dashboard/builder allowed
builder → /dashboard/owner denied
builder → /dashboard/broker denied
builder → /admin denied
```

If route guard cannot be manually tested because auth provider missing:

* inspect server/middleware logic
* mark runtime verification `SETUP_REQUIRED`
* do not mark full PASS

Client-only guard is not enough.

---

## 19. Direct URL Bypass Verification

Direct URL checks must verify:

* typing private dashboard URL as guest redirects/denies
* wrong role URL denies server-side
* admin URL denies public users
* staff module URL denies staff without permission where implemented
* private data is not rendered before redirect
* unauthorized response does not include private payload
* no public admin registration route

If direct URL bypass works:

* create critical bug
* mark `FAIL`

---

## 20. Admin / Staff Auth Separation Verification

Verify admin/staff auth foundation.

Check:

* admin/staff login route separate
* no mobile OTP admin login
* no public admin registration
* no admin link in public header/footer
* admin/staff route noindex if route exists
* staff account/invite foundation exists or setup-required documented
* disabled/suspended staff handling represented or documented
* public roles cannot access staff/admin
* provider missing shows setup-required

If public user can self-register as admin/staff:

* create critical bug
* mark `FAIL`

---

## 21. Staff Invite Foundation Verification

If staff invites are implemented, verify:

* invites are created only by authorized internal user
* invite token stored hashed
* invite status tracked
* expired/revoked invite not accepted
* invite acceptance creates staff account/profile only
* public user cannot list invites
* email provider setup-required if invite email missing
* no fake invite sent

If staff invite foundation is documented but not implemented:

* mark `NOT_STARTED` or `PARTIAL`
* do not fail if out of scope and admin route remains safe

---

## 22. Staff Permission Verification

Verify staff permissions foundation.

If implemented, check:

* staff permissions table exists
* public denied
* normal users denied
* staff can only access own/scoped permissions if allowed
* Super Admin/admin management planned or implemented safely
* provider/settings/sensitive actions not public
* no staff can self-grant permission

If not implemented fully:

* ensure status is `PARTIAL` or `NOT_STARTED`
* full admin modules come later
* admin route must still be safe

---

## 23. Public-Safe View Verification

If public-safe views were created, verify they exclude:

* mobile number
* email
* private address
* identity docs
* verification docs
* billing fields
* staff/admin fields
* internal notes
* audit events
* account security fields

Possible views:

```txt id="public-safe-views"
public_profiles_view
public_broker_profiles_view
public_builder_profiles_view
```

If public pages query private `profiles` directly and expose fields:

* create critical bug
* mark `FAIL`

---

## 24. RLS Enabled Verification

For every private table created in Prompt 02, verify RLS is enabled.

Tables to check:

```txt id="rls-tables-to-check"
profiles
owner_profiles
broker_profiles
builder_profiles
staff_profiles
staff_permissions
staff_invites
role_change_requests
user_consents
auth_audit_events
```

If RLS is missing on a private table:

* create critical bug
* mark `FAIL`

If database unavailable:

* mark RLS runtime test `SETUP_REQUIRED`
* do not mark RLS PASS

---

## 25. RLS Policy Verification

Verify policies match expected access.

### Profiles

* user can read own profile
* user can update safe own profile fields
* public cannot read private profile table
* wrong user denied
* staff/admin access permission-scoped or server-only

### Role Profiles

* owner/broker/builder can read own role profile
* wrong user denied
* public-safe view only for public data
* public cannot read private role profile fields

### Staff Profiles

* public denied
* normal users denied
* staff own read if intended
* admin management permission-scoped

### Staff Permissions

* public denied
* normal users denied
* staff cannot self-grant
* admin/Super Admin only for management later

### Consents

* user can create/read own consents
* wrong user denied
* public denied

### Audit Events

* public denied
* normal users denied unless safe policy exists
* server/staff permission only

If policy behavior cannot be verified with tests, mark `PARTIAL` or `SETUP_REQUIRED`.

---

## 26. RLS SQL Test Suggestions

If Supabase SQL test environment is available, use equivalent checks.

Suggested test scenarios:

```txt id="rls-test-scenarios"
1. As anonymous: select from profiles → denied or no private rows.
2. As user A: select own profile → allowed.
3. As user A: select user B profile → denied.
4. As user A: update own full_name → allowed if safe.
5. As user A: update own public_role directly → denied unless approved flow exists.
6. As owner: select own owner_profile → allowed.
7. As owner: select broker_profile of another user → denied unless public-safe view.
8. As public: select staff_profiles → denied.
9. As public: select staff_permissions → denied.
10. As user A: select user B consents → denied.
11. As public: select auth_audit_events → denied.
```

Record exact results.

Do not mark RLS PASS without actual results.

---

## 27. Service Role Safety Verification

Search for `SUPABASE_SERVICE_ROLE_KEY`.

Verify:

* not used in client components
* not exposed through `NEXT_PUBLIC_`
* not exported to browser
* not logged
* only used in trusted server code if needed
* `.env.example` contains placeholder only
* docs say server-only

If service role appears in client/public code:

* create critical bug
* mark `FAIL`
* recommend secret rotation if real key was exposed

---

## 28. Provider Secret Safety Verification

Search for auth/provider secrets.

Patterns:

```txt id="provider-secret-patterns"
OTP_API_KEY
SMS_API_KEY
GOOGLE_CLIENT_SECRET
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
R2_SECRET_ACCESS_KEY
TURNSTILE_SECRET_KEY
SENDGRID_API_KEY
RESEND_API_KEY
WHATSAPP_BUSINESS_TOKEN
SUPABASE_SERVICE_ROLE_KEY
```

Verify:

* no real values committed
* no secrets in client code
* no secrets in logs
* no secrets in public config
* `.env.example` placeholders only

If secret exposure found:

* do not print secret
* create critical bug
* mark `FAIL`

---

## 29. `.env.example` Verification

Check `.env.example` has placeholders for Prompt 02 needs.

Expected:

```txt id="auth-env-check"
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OTP_PROVIDER=
OTP_API_KEY=
SMS_PROVIDER=
SMS_API_KEY=
ADMIN_AUTH_PROVIDER=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_REDIRECT_URL=
```

Rules:

* no real secrets
* server-only variables not exposed as `NEXT_PUBLIC_`
* public variables only when safe
* provider missing status documented

If env placeholders missing, update or create bug.

---

## 30. API Provider Status Verification

Inspect `API_PROVIDER_STATUS.md`.

Verify statuses for:

* Supabase Auth
* Supabase Database
* Supabase RLS
* OTP Provider
* SMS Provider
* Admin Auth Provider
* Google OAuth if used/planned
* Email provider for invites
* Rate limit provider if used
* Audit/logging provider if used

Rules:

* `ACTIVE` only if tested
* `CONFIGURED_NOT_TESTED` only if env exists but not verified
* `SETUP_REQUIRED` if missing
* no secrets shown
* public user setup-required message safe

If provider status is fake:

* update doc
* create bug
* mark `PARTIAL` or `FAIL`

---

## 31. Input Validation Verification

Verify server-side validation for:

* mobile number
* OTP format
* full name
* email
* role value
* consent accepted
* redirect/return URL
* admin email
* staff invite token if implemented

Invalid input should not create user/profile.

Invalid role must be rejected.

If validation is only client-side:

* create bug
* mark `PARTIAL` or `FAIL` depending risk

---

## 32. Redirect Safety Verification

Verify auth redirects are safe.

Check:

* original intent supports internal routes only
* external redirect URL blocked
* login redirect does not create open redirect
* wrong role cannot force redirect to unauthorized dashboard
* admin login callback safe
* setup-required route safe
* redirect loop absent

If open redirect exists:

* create critical bug
* mark `FAIL`

---

## 33. Consent Baseline Verification

Verify consent baseline.

Check:

* Terms/Privacy acceptance required or documented for registration
* consent recorded in `user_consents` if implemented
* policy version stored if implemented
* marketing opt-in optional
* OTP/data notice present or documented
* contact sharing consent deferred to inquiry/contact reveal phase
* no prechecked marketing opt-in where policy disallows
* legal links not dead

If consent not implemented, status should be `PARTIAL` or `NOT_STARTED`, not fake complete.

---

## 34. Audit Event Verification

If `auth_audit_events` implemented, verify events for:

* registration
* login
* OTP requested
* OTP verified
* profile created
* role selected
* admin access denied
* staff login where applicable

Verify audit event does not store:

* OTP
* secrets
* raw provider tokens
* hidden contact beyond safe masked value
* private document data

If audit not implemented, mark `PARTIAL` or `NOT_STARTED`.

Do not fail if intentionally deferred unless docs claim complete.

---

## 35. Rate Limit Verification

Check whether rate limiting exists or is documented.

Actions needing rate limits:

* OTP request
* OTP verify
* login attempts
* registration attempts
* admin login attempts
* staff invite accept

If rate limits implemented:

* verify safe error
* verify no fake success
* verify docs updated

If not implemented:

* status must be `PARTIAL` or `NOT_STARTED`
* security checklist must mention pending rate limits
* full auth security cannot be PASS if public OTP is live without rate limit/provider-level protection

---

## 36. Hidden Contact Baseline Verification

Even though full contact reveal is later, verify baseline does not leak contact.

Check:

* public profile view excludes mobile/email
* search/public card if any does not show mobile/email by default
* metadata/schema does not include mobile/email
* auth errors do not reveal full private user info
* logs do not print hidden contact unnecessarily
* public API does not return profile mobile/email

If hidden contact leaks:

* create critical bug
* mark `FAIL`

---

## 37. Dashboard Placeholder Verification

If role dashboards were created as placeholders, verify:

* owner dashboard has no fake stats
* broker dashboard has no fake stats
* builder dashboard has no fake stats
* module cards clearly say coming later/setup-required/no data
* user role displayed from real profile only
* logout/profile controls work if implemented
* no public footer if dashboard shell implemented
* no admin links in public role dashboard

Fake dashboard data is a bug.

---

## 38. Admin Placeholder Verification

If admin placeholder exists, verify:

* route is protected
* no public admin registration
* no public footer
* no public header link
* no fake stats
* no provider secrets
* no fake Super Admin user
* noindex metadata where possible
* setup-required if admin auth provider missing

If public admin access exists:

* create critical bug
* mark `FAIL`

---

## 39. UI Responsive Verification

For auth UI and route guard states, check at least:

```txt id="auth-responsive-widths"
320px
360px
390px
430px
```

Verify:

* auth popup/bottom sheet usable
* role selector visible
* mobile input not overflowing
* buttons tappable
* error/setup-required message visible
* no horizontal scroll
* no overlap
* logout/profile menu usable if present
* unauthorized state readable

Full responsive checks happen later, but auth must not be mobile-broken.

---

## 40. Accessibility Verification

Basic auth accessibility check:

* input labels exist
* role selector labels visible
* buttons have clear text
* icon buttons have labels if any
* error text readable
* focus not trapped incorrectly
* popup can close
* keyboard can tab through form
* setup-required state readable

If severe accessibility issue blocks auth use, create bug.

---

## 41. Build / Lint / Typecheck Verification

Run available checks.

Use detected package manager.

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
* do not claim pass

If checks fail:

* fix safe issues if in scope
* create bug
* mark verification `FAIL` or `PARTIAL`

Build failure usually blocks PASS.

---

## 42. Migration Apply/Test Verification

If local Supabase/migration tooling is available:

* apply migration in safe local/staging environment
* verify schema exists
* verify RLS enabled
* verify indexes created
* verify rollback notes
* run RLS tests if possible

If migration cannot be applied due to missing Supabase config:

* record `SETUP_REQUIRED`
* do not mark DB/RLS runtime PASS
* Prompt 03 may proceed only if owner accepts partial and no code depends on missing DB

---

## 43. Documentation Update Verification

Verify the following docs were updated after Prompt 02:

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

If security/RLS changed but `SECURITY_RLS_CHECKLIST.md` was not updated:

* update it
* mark verification `PARTIAL` until fixed

If migration/deployment risk changed but rollback docs missing:

* update it
* mark `PARTIAL`

---

## 44. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate statuses for:

* public mobile OTP login
* public registration
* role selector
* owner profile foundation
* broker profile foundation
* builder profile foundation
* account status
* verification status placeholder
* logout/session
* role guards
* dashboard route guards
* admin/staff separate login
* no public admin registration
* staff invite-only foundation
* staff permissions foundation
* RLS profile policies
* public-safe profile views
* consent baseline
* auth audit events
* rate limit baseline
* setup-required provider states
* auth UI mobile baseline

Future features must not be marked done.

---

## 45. Changelog Verification

Check `CHANGELOG.md` includes Prompt 02 entry with:

* date
* summary
* changed files
* migrations
* RLS/security changes
* auth/provider changes
* docs updated
* tests/checks run
* verification status
* known issues
* rollback notes

If missing, update changelog.

---

## 46. Bugs And Fixes Verification

If any issue was found, ensure `BUGS_AND_FIXES.md` has entries.

Possible bug IDs:

* `BUG-AUTH-OTP-FAKE-SUCCESS`
* `BUG-AUTH-OTP-PROVIDER-MISSING`
* `BUG-AUTH-REGISTER-PROFILE-MISSING`
* `BUG-AUTH-ROLE-PROFILE-MISSING`
* `BUG-AUTH-WRONG-ROLE-ACCESS`
* `BUG-AUTH-GUEST-DASHBOARD-ACCESS`
* `BUG-AUTH-PUBLIC-ADMIN-ACCESS`
* `BUG-AUTH-PUBLIC-ADMIN-REGISTER`
* `BUG-AUTH-ADMIN-MOBILE-OTP`
* `BUG-RLS-PROFILES-PUBLIC-LEAK`
* `BUG-RLS-HIDDEN-CONTACT-LEAK`
* `BUG-RLS-STAFF-PUBLIC-LEAK`
* `BUG-RLS-WRONG-USER-PROFILE`
* `BUG-SECURITY-SERVICE-ROLE-CLIENT`
* `BUG-SECURITY-PROVIDER-SECRET-LEAK`
* `BUG-AUTH-REDIRECT-LOOP`
* `BUG-AUTH-OPEN-REDIRECT`
* `BUG-AUTH-RAW-PROVIDER-ERROR`
* `BUG-AUTH-RATE-LIMIT-MISSING`
* `BUG-AUTH-BUILD-FAIL`

Use existing project convention if available.

---

## 47. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 02 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* auth routes tested
* roles tested
* admin/staff routes tested
* RLS tables/policies tested
* commands run
* expected
* actual
* issues found
* result
* next step

Use exact status.

No vague “works”.

---

## 48. Security Checklist Verification

Update/verify `SECURITY_RLS_CHECKLIST.md`.

It must include Prompt 02 results for:

* service role safety
* provider secret safety
* public auth
* admin/staff separation
* route guards
* RLS policies
* public-safe views
* hidden contact baseline
* consent baseline
* audit events
* rate limits
* direct URL checks
* unresolved security issues
* final Prompt 02 security status

If RLS was not runtime-tested, status cannot be full PASS.

---

## 49. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

It must include:

* profile lookup indexes
* role lookup indexes
* auth helper performance
* middleware impact
* no unbounded staff/profile list
* build/lint/typecheck status
* rate limit status
* caching note for private auth/dashboard pages:

  * no public cache
  * no-store for private pages later/current if implemented

---

## 50. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

It must include:

* Prompt 02 migration list
* backup requirement
* rollback notes for auth schema
* rollback notes for RLS policies
* rollback notes for route guards/middleware
* provider setup rollback notes
* cache/session risk notes
* deployment risk level
* verification status

If migration exists without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 51. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md`.

Provider statuses must include:

```txt id="prompt-02-provider-statuses"
Supabase Auth
Supabase Database
Supabase RLS
OTP Provider
SMS Provider
Admin Auth Provider
Google OAuth
Email Provider
Rate Limit Provider
Audit/Event Logging
```

Do not mark `ACTIVE` without real testing.

If provider missing:

* `SETUP_REQUIRED`
* UI should not fake success

---

## 52. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 02 implementation summary
* Prompt 02 verification result
* changed files
* migration files
* auth provider status
* RLS status
* route guard status
* bugs/blockers
* setup-required providers
* tests/checks run
* next prompt:

  * `prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`
* instruction:

  * do not start Prompt 03 if Prompt 02 failed/blocked

---

## 53. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* auth foundation implemented
* registration/login behavior verified or provider setup-required handled honestly
* role selector verified
* profile creation verified or DB setup-required documented and accepted
* route guards verified
* admin/staff route separation verified
* no public admin registration
* no admin mobile OTP
* RLS policies implemented and tested for created tables
* public-safe views exclude private data
* service role not client-exposed
* provider secrets safe
* hidden contact not leaked
* docs updated
* bugs resolved or none blocking
* manual verification recorded

If OTP provider is setup-required, PASS may be possible only for the safe setup-required foundation, not for live OTP delivery.

Clearly state provider delivery is `SETUP_REQUIRED`.

### PARTIAL

Use `PARTIAL` if:

* auth UI exists but OTP provider missing
* Supabase env missing prevents runtime DB/RLS tests
* RLS policies written but not applied/tested
* rate limits pending
* audit events pending
* staff permissions foundation partial
* tests not configured
* non-critical route placeholders incomplete
* manual browser test incomplete

Prompt 03 can start only if user/Super Admin accepts partial and no critical security leak exists.

### FAIL

Use `FAIL` if:

* service role exposed to client
* private profiles public
* hidden contact leaks
* public admin access works
* public admin registration exists
* admin mobile OTP login allowed
* wrong role dashboard access works
* RLS missing on private tables
* build fails
* fake OTP success exists
* fake provider active status remains
* open redirect exists
* real secret exposed

Do not start Prompt 03.

### BLOCKED

Use `BLOCKED` if:

* cannot inspect required files
* Supabase/auth architecture conflict prevents safe implementation
* package install/build impossible
* required Prompt 02 files missing
* missing access prevents all meaningful verification
* project owner decision required

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* Supabase env missing
* OTP provider missing
* SMS provider missing
* admin auth provider missing
* email provider missing for staff invites
* RLS runtime test environment missing

Setup-required can coexist with `PARTIAL`.

---

## 54. Prompt 03 Readiness Checklist

Prompt 03 can start only if:

* Prompt 02 implementation completed
* Prompt 02 verification completed
* no critical auth/RLS/security bug open
* no public admin access
* no service role client exposure
* no private profile leak
* provider statuses honest
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`

If Prompt 03 file missing, stop and ask to add/generate it.

---

## 55. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 02 Verification — Auth, Roles And RLS Foundation

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Routes Checked:
- ...

Roles Tested:
- Guest:
- Owner:
- Broker:
- Builder:
- Admin/Staff:

Commands Run:
- command: result

Database/RLS Checks:
- ...

Provider Status:
- Supabase Auth:
- Supabase Database:
- OTP/SMS:
- Admin Auth:

Security Checks:
- service role client exposure:
- provider secret exposure:
- hidden contact leak:
- public admin access:
- wrong role access:
- direct URL bypass:

Expected:
- Auth/Roles/RLS foundation is safe and ready for Prompt 03.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 03:
- Yes/No

Next Step:
- prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md or fix blockers first.
```

---

## 56. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 02 Auth, Roles And RLS Foundation verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Routes checked:
- route list

Roles tested:
- guest:
- owner:
- broker:
- builder:
- admin/staff:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Database/RLS:
- migrations:
- tables:
- policies:
- RLS test result:
- public-safe views:

Auth/provider status:
- Supabase:
- OTP/SMS:
- admin auth:
- email/invite:

Security baseline:
- service role exposure:
- provider secret exposure:
- hidden contact leak:
- public admin access:
- wrong role access:
- open redirect:

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 03:
- Yes/No
- reason

Next step:
- prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
```

Do not write vague “verified”.

---

## 57. If Verification Fails

If verification fails:

1. do not start Prompt 03
2. create/update bug entries
3. update `MANUAL_VERIFICATION.md`
4. update `SECURITY_RLS_CHECKLIST.md`
5. update `brain.md`
6. state exact blocker
7. fix if safe and in scope
8. rerun verification
9. only then proceed

Critical failures must block progress.

---

## 58. If Verification Is Partial

If verification is partial:

* document exactly what is partial
* list setup-required providers
* list untested RLS checks
* list pending rate limit/audit items
* confirm no critical leak exists
* update docs
* ask/require owner acceptance before Prompt 03 if security-relevant

Acceptable partial examples:

* OTP provider missing but setup-required UI safe
* Supabase env missing for runtime tests but migrations exist
* rate limiting documented but not implemented
* staff invites deferred
* audit table deferred

Not acceptable partial without fix:

* service role client exposure
* public admin access
* private profile leak
* wrong role access allowed
* fake OTP success
* build fail

---

## 59. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `brain.md`
* final response should say Prompt 03 can start

Do not start Prompt 03 automatically unless user asked to continue.

---

## 60. What Not To Do In This Verification

Do not:

* implement full property/project/requirement system
* implement full dashboards
* implement full payment
* implement full media upload
* implement full admin modules
* add fake users
* add fake verified badges
* add fake provider status
* bypass OTP
* disable RLS
* loosen policies without approval
* expose service role
* print secrets
* ignore build failures
* ignore direct URL bypass
* ignore wrong role access
* start Prompt 03 after FAIL/BLOCKED

---

## 61. Quality Bar

This verification is successful when future phases can trust that:

* public auth foundation is safe
* role identity is reliable
* profiles are private by default
* public-safe views do not leak contact
* Owner/Broker/Builder route access is protected
* admin/staff is separate from public auth
* public admin registration is impossible
* RLS protects private tables
* service role is server-only
* provider status is honest
* docs accurately show what is implemented and what is setup-required
* no fake PASS was given

---

## 62. Final Rule For Prompt 02 Verification

Verify auth honestly.

Verify roles honestly.

Verify RLS honestly.

Verify route guards honestly.

Verify admin separation honestly.

Verify provider status honestly.

Do not fake OTP.

Do not fake login.

Do not fake verified status.

Do not fake provider active status.

Do not expose service role.

Do not expose secrets.

Do not leak hidden contact.

Do not allow public admin.

Do not allow wrong-role access.

Do not mark RLS PASS without tests.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
