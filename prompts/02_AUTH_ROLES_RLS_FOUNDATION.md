# prompts/02_AUTH_ROLES_RLS_FOUNDATION.md

# My Gujarat Property — Prompt 02: Auth, Roles And RLS Foundation

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompt"
prompts/01_PROJECT_SETUP_BASELINE.md
prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md
```

This phase implements the safe foundation for **authentication, public roles, admin/staff separation, profile records, permissions, route guards, RLS policies and privacy-safe access**.

Do not skip RLS.

Do not implement frontend-only security.

Do not expose service role key.

Do not create public admin registration.

Do not fake OTP success.

Do not fake role verification.

Do not fake RLS PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/02_AUTH_ROLES_RLS_FOUNDATION.md
Prompt Number: 02
Phase: Auth, Roles And RLS Foundation
Type: Implementation Prompt
Matching Verification Prompt: prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md
Previous Verification Prompt: prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md
```

---

## 2. Phase Purpose

The purpose of this phase is to implement the project’s authentication and role-security foundation.

This includes:

* public auth flow foundation
* mobile OTP login/register architecture
* Owner/Broker/Builder role selection
* user profile creation
* public role permissions baseline
* separate admin/staff auth architecture
* invite-only staff model
* staff permission model baseline
* route protection
* middleware/server guards
* RLS tables and policies
* public-safe data access rules
* profile privacy foundation
* account status handling
* role change request foundation
* consent baseline
* security audit baseline
* auth provider setup-required states
* docs updates
* migrations
* tests/checks
* final handoff to matching manual verification prompt

This phase creates the security base for all future features.

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

Also read any existing auth, Supabase, middleware, profile or permission code.

Do not paste full docs into final response.

---

## 4. Required Current Code Inspection

Before changing files, inspect:

```txt id="inspect-files"
package.json
.env.example
src/app/
app/
src/middleware.ts
middleware.ts
src/lib/
lib/
src/lib/supabase/
lib/supabase/
src/lib/auth/
src/lib/permissions/
src/components/
src/components/auth/
components/auth/
supabase/
supabase/migrations/
types/
src/types/
FEATURE_REGISTRY.md
API_PROVIDER_STATUS.md
SECURITY_RLS_CHECKLIST.md
MANUAL_VERIFICATION.md
brain.md
```

Search for existing:

* Supabase client helpers
* auth forms
* login/register routes
* OTP code
* profile tables
* role fields
* admin login
* middleware
* route guards
* RLS migrations
* service role usage
* provider status helpers
* fake auth/demo users
* fake role bypass

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement:

### 5.1 Public User Auth Foundation

* public mobile OTP login/register UI foundation
* OTP provider setup-required handling
* auth popup/bottom sheet integration foundation
* login/register intent preservation
* account lookup by mobile
* registration flow fields:

  * full name
  * email
  * mobile number
  * role:

    * Owner
    * Broker
    * Builder
* role-specific profile creation
* post-login redirect/continue action
* logout
* session state
* hide login/register after login

### 5.2 Public Roles

Implement public role baseline:

* Owner
* Broker/Agent
* Builder/Developer

Each role should have:

* profile record
* role permissions baseline
* dashboard route foundation
* protected route guards
* account status
* verification status placeholder
* plan/subscription gate placeholder

### 5.3 Admin/Staff Auth Foundation

Implement internal auth foundation:

* separate admin/staff login route
* email/Google auth architecture if supported
* no mobile OTP admin login
* no public admin registration
* invite-only staff model baseline
* staff account table/profile
* staff roles/permissions baseline
* admin route guards
* admin noindex metadata where possible
* staff disabled/suspended checks

### 5.4 RLS Foundation

Implement database foundation with RLS:

* public profiles/private profiles separation
* own-profile read/update policies
* role profile tables
* staff profiles and permissions tables
* public-safe views if needed
* RLS enabled for private tables
* admin/staff permission foundation
* service role only trusted server-side
* direct access protection

### 5.5 Docs And Verification Foundation

Update:

* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`
* `BUGS_AND_FIXES.md`
* `MANUAL_VERIFICATION.md`
* `API_PROVIDER_STATUS.md`
* `SECURITY_RLS_CHECKLIST.md`
* `PERFORMANCE_CHECKLIST.md`
* `DEPLOYMENT_ROLLBACK.md`
* `brain.md`

---

## 6. Out Of Scope For This Phase

Do not implement full:

* property posting
* project posting
* requirement posting
* lead/CRM system
* messages
* site visits
* billing/payment
* Razorpay checkout
* media upload/R2/CDN
* ads/promotions
* notification delivery
* Google Maps
* WhatsApp API
* CMS/blog/legal full system
* advanced analytics
* full admin modules
* full dashboard modules
* complete verification workflow
* complete subscription system

This phase only creates auth, roles, profile and RLS foundation.

Later prompts expand the modules.

---

## 7. Hard Security Rules

Claude must follow:

1. Never expose `SUPABASE_SERVICE_ROLE_KEY` to client.
2. Never disable RLS to make code work.
3. Never create frontend-only route protection.
4. Never rely only on hidden buttons.
5. Never create public admin registration.
6. Never allow mobile OTP admin login.
7. Never fake OTP sent.
8. Never fake login success.
9. Never fake role/verification status.
10. Never mark RLS PASS without policies/tests.
11. Never return hidden contact publicly.
12. Never expose provider secrets.
13. Never store OTP in logs.
14. Never show raw auth/provider errors to users.
15. Never allow wrong user profile access.
16. Never allow wrong role dashboard access.
17. Never allow public access to admin route.
18. Never use test/demo user as production real user.

---

## 8. Public Auth UX Rules

Public auth should use popup/bottom sheet behavior.

Auth popup opens when:

* guest clicks login/register
* guest clicks contact/inquiry
* guest clicks save
* guest clicks post property
* guest clicks post requirement
* guest clicks dashboard protected route
* guest tries protected action

Flow:

1. user enters mobile number
2. system checks whether account exists
3. if account exists:

   * send OTP
   * verify OTP
   * login
4. if mobile not registered:

   * show registration form
   * collect full name/email/mobile/role
   * send OTP
   * verify OTP
   * create auth user/profile
   * create role profile
   * login
5. continue original intent
6. hide login/register links

If OTP provider is not configured:

* show `OTP_PROVIDER_SETUP_REQUIRED`
* do not fake OTP sent
* allow dev-only safe mock only if clearly dev-only and never production
* update `API_PROVIDER_STATUS.md`

---

## 9. Registration Fields

Public registration must include:

| Field                   |                          Required | Notes                                              |
| ----------------------- | --------------------------------: | -------------------------------------------------- |
| Full Name               |                               Yes | real user display name                             |
| Email                   | Yes/Optional based product config | must validate if collected                         |
| Mobile Number           |                               Yes | Indian mobile by default; future NRI support later |
| Role                    |                               Yes | Owner/Broker/Builder                               |
| Terms Consent           |                               Yes | link Terms/Privacy                                 |
| Contact Sharing Consent |                        Contextual | before inquiry/contact reveal                      |
| Marketing Opt-In        |                          Optional | not prechecked where policy says                   |

Role values:

```txt id="public-role-values"
owner
broker
builder
```

Display labels:

```txt id="public-role-labels"
Owner
Broker / Agent
Builder / Developer
```

---

## 10. Role Rules

## 10.1 Owner

Owner can:

* access owner dashboard foundation
* post property later
* post requirement later
* manage own profile
* view own leads later
* view own billing later
* use saved items later

Owner cannot:

* post projects
* access broker dashboard
* access builder dashboard
* access admin/staff area

---

## 10.2 Broker / Agent

Broker can:

* access broker dashboard foundation
* post property later
* post requirement later
* manage broker profile
* use CRM later
* view own billing later
* request verification later

Broker cannot:

* post projects
* access owner dashboard as owner unless role changed/approved
* access builder dashboard
* access admin/staff area

---

## 10.3 Builder / Developer

Builder can:

* access builder dashboard foundation
* post projects later
* manage builder company profile
* manage agents later
* use project leads later
* use ads later
* view own billing later
* request builder/RERA verification later

Builder cannot:

* post property as normal property poster
* post owner/broker property listings
* access owner dashboard
* access broker dashboard
* access admin/staff area

---

## 11. Role Change Foundation

Implement only foundation if feasible.

Role change rules:

* user can request role change later
* role change may require admin approval
* role change can affect dashboard access
* role change can affect posting permissions
* warning required before request
* direct role mutation by user is not allowed
* audit required
* staff/admin approval later

In this phase:

* create schema/status foundation if needed
* or document `NOT_STARTED`
* do not build full workflow unless already in project

Suggested statuses:

```txt id="role-change-statuses"
pending
approved
rejected
cancelled
```

---

## 12. Account Status Rules

Account status should support:

```txt id="account-status-values"
active
pending
suspended
banned
deleted
```

Rules:

* suspended user cannot perform protected actions
* banned user cannot login/use platform
* deleted user handled safely
* active user can use role-scoped features
* status checked server-side
* future admin actions update status with audit

---

## 13. Verification Status Placeholder

Profiles may have verification status:

```txt id="verification-status-values"
not_started
pending
under_review
need_changes
verified
rejected
expired
revoked
```

Rules:

* do not show verified badge unless real status is `verified`
* do not fake verification
* verification workflow implemented later
* badge disclaimer later
* foundation only in this phase

---

## 14. Public Profile Privacy Foundation

Public profile data must be separate from private data.

Private profile fields:

* mobile
* email
* private address
* billing details
* identity docs
* verification docs
* internal notes
* account status details where sensitive

Public profile fields may include:

* display name
* role
* city
* public avatar
* broker agency name later
* builder company name later
* public bio later
* verification badge if real later

This phase must avoid private data exposure.

---

## 15. Admin / Staff Login Rules

Admin/staff auth is separate.

Rules:

* separate route, for example `/admin/login`
* no public register button
* no mobile OTP login
* email/Google only if configured/supported
* invite-only staff
* noindex
* not linked from public header/footer
* staff disabled check
* admin route guard server-side
* staff permission checked server-side

If provider not configured:

* show `ADMIN_AUTH_SETUP_REQUIRED`
* do not fake staff login
* document setup-required

---

## 16. Internal Role Types

Internal roles may include:

```txt id="internal-role-types"
super_admin
admin
staff
```

Staff functional roles may include:

```txt id="staff-functional-roles"
verification_manager
support_manager
content_manager
seo_manager
ads_manager
billing_manager
payment_manager
city_manager
user_manager
notification_manager
system_manager
security_manager
reports_manager
audit_manager
```

Prompt 02 should create foundation only.

Full admin/staff modules come later in Prompt 07.

---

## 17. Staff Permission Model Foundation

Permission model should support:

* module
* can_read
* can_create
* can_update
* can_approve
* can_reject
* can_delete
* can_export
* can_bulk_action
* can_view_sensitive
* can_manage_provider
* can_manage_security
* can_manage_payment
* can_manage_staff

Use a flexible permissions table if implementing.

Rules:

* Super Admin has highest permission.
* Staff permissions are scoped.
* Staff cannot self-grant permission.
* Provider secrets masked.
* Permission checks server-side.
* Full UI/admin management later.

---

## 18. Suggested Database Tables

Create/align tables only if needed and safe.

Suggested tables for this phase:

```txt id="suggested-auth-tables"
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

If current schema already exists, do not duplicate.

If using Supabase Auth, link `profiles.id` to `auth.users.id`.

---

## 19. Suggested Enums / Check Values

Use enums/check constraints if project convention supports.

Suggested values:

```txt id="suggested-values"
public_role: owner, broker, builder
internal_role: super_admin, admin, staff
account_status: active, pending, suspended, banned, deleted
verification_status: not_started, pending, under_review, need_changes, verified, rejected, expired, revoked
staff_invite_status: pending, accepted, expired, revoked
role_change_status: pending, approved, rejected, cancelled
consent_type: terms, privacy, otp_data_notice, contact_sharing, marketing
```

Do not overcomplicate if current schema uses text checks.

---

## 20. Suggested `profiles` Fields

Suggested `profiles` fields:

* `id`
* `auth_user_id`
* `public_role`
* `full_name`
* `display_name`
* `email`
* `mobile`
* `mobile_verified`
* `email_verified`
* `account_status`
* `verification_status`
* `avatar_media_id`
* `city_id`
* `language_preference`
* `created_at`
* `updated_at`
* `deleted_at`

Rules:

* mobile/email private by default
* public-safe view excludes private fields
* own profile readable by owner
* staff access permission-scoped later

---

## 21. Suggested `owner_profiles` Fields

Suggested fields:

* `id`
* `profile_id`
* `public_display_name`
* `privacy_level`
* `created_at`
* `updated_at`

Owner public profile should be privacy-protected by default.

Full owner dashboard/profile later.

---

## 22. Suggested `broker_profiles` Fields

Suggested fields:

* `id`
* `profile_id`
* `agency_name`
* `license_number`
* `business_city_id`
* `verification_status`
* `public_slug`
* `created_at`
* `updated_at`

Rules:

* license/private docs later
* public slug unique if implemented
* public broker profile later

---

## 23. Suggested `builder_profiles` Fields

Suggested fields:

* `id`
* `profile_id`
* `company_name`
* `company_type`
* `rera_registered`
* `business_city_id`
* `verification_status`
* `public_slug`
* `created_at`
* `updated_at`

Rules:

* RERA proof private later
* public builder microsite later
* company verification later

---

## 24. Suggested `staff_profiles` Fields

Suggested fields:

* `id`
* `auth_user_id`
* `email`
* `full_name`
* `internal_role`
* `staff_status`
* `last_login_at`
* `created_by_staff_id`
* `created_at`
* `updated_at`
* `disabled_at`

Staff statuses:

```txt id="staff-status-values"
invited
active
disabled
suspended
deleted
```

Rules:

* no public registration
* invite-only
* staff email unique
* disabled staff denied

---

## 25. Suggested `staff_permissions` Fields

Suggested fields:

* `id`
* `staff_profile_id`
* `module`
* `can_read`
* `can_create`
* `can_update`
* `can_approve`
* `can_reject`
* `can_delete`
* `can_export`
* `can_bulk_action`
* `can_view_sensitive`
* `created_at`
* `updated_at`

Full permission management later.

Foundation must not expose staff permissions publicly.

---

## 26. Suggested `staff_invites` Fields

Suggested fields:

* `id`
* `email`
* `internal_role`
* `invited_by_staff_id`
* `invite_token_hash`
* `status`
* `expires_at`
* `accepted_at`
* `created_at`
* `updated_at`

Rules:

* token hashed
* no public invite list
* invite email provider setup-required if not configured
* full invite UI later

---

## 27. Suggested `user_consents` Fields

Suggested fields:

* `id`
* `profile_id`
* `consent_type`
* `policy_version`
* `accepted`
* `source`
* `ip_hash`
* `user_agent_hash`
* `created_at`

Consent baseline:

* Terms
* Privacy
* OTP/data notice
* marketing opt-in optional
* contact sharing later

Do not overbuild legal UI here if not in scope.

---

## 28. Suggested `auth_audit_events` Fields

Suggested fields:

* `id`
* `profile_id`
* `staff_profile_id`
* `event_type`
* `target_type`
* `target_id`
* `metadata_safe`
* `ip_hash`
* `user_agent_hash`
* `created_at`

Events:

* login
* logout
* register
* otp_requested
* otp_verified
* role_selected
* profile_created
* staff_login
* admin_access_denied
* account_blocked
* role_change_requested

No OTP or secrets in logs.

---

## 29. Migration Requirements

If DB changes are needed, create migration:

```txt id="migration-path"
supabase/migrations/YYYYMMDDHHMMSS_auth_roles_rls_foundation.sql
```

Migration comments must include:

* purpose
* phase: Prompt 02 Auth Roles RLS Foundation
* tables created/changed
* RLS policies created/changed
* indexes created
* destructive changes yes/no
* backup required yes/no
* rollback notes

Do not modify DB without migration.

---

## 30. RLS Policy Requirements

RLS must be enabled on all private tables created.

Minimum policy expectations:

### `profiles`

* user can read own profile
* user can update safe own profile fields
* public cannot read private profile fields
* staff/admin access permission-scoped or server/service role only
* public-safe profile view for public fields if needed

### `owner_profiles`

* owner can read/update own owner profile
* public read only public-safe view if created
* wrong user denied

### `broker_profiles`

* broker can read/update own broker profile
* public read only public-safe broker profile if published/allowed
* wrong user denied

### `builder_profiles`

* builder can read/update own builder profile
* public read only public-safe builder profile if published/allowed
* wrong user denied

### `staff_profiles`

* staff can read own staff profile
* Super Admin/admin permission needed for staff list
* public denied
* normal users denied

### `staff_permissions`

* public denied
* normal users denied
* staff reads own permissions if needed
* Super Admin/admin permission needed for management

### `staff_invites`

* public denied
* invited acceptance handled securely server-side
* staff/admin permission required

### `user_consents`

* user can read own consents
* user can create own consent
* admin/legal permission later
* public denied

### `auth_audit_events`

* user may not read raw audit events unless safe policy says
* staff/admin permission later
* service role/server insert
* public denied

If RLS cannot be fully implemented due to missing Supabase setup, mark `SETUP_REQUIRED` or `PARTIAL` and document.

---

## 31. Index Requirements

Add indexes for:

* `profiles.auth_user_id`
* `profiles.public_role`
* `profiles.account_status`
* `profiles.mobile`
* `profiles.email`
* `owner_profiles.profile_id`
* `broker_profiles.profile_id`
* `broker_profiles.public_slug`
* `builder_profiles.profile_id`
* `builder_profiles.public_slug`
* `staff_profiles.auth_user_id`
* `staff_profiles.email`
* `staff_profiles.internal_role`
* `staff_permissions.staff_profile_id`
* `staff_invites.email`
* `staff_invites.status`
* `user_consents.profile_id`
* `auth_audit_events.profile_id`
* `auth_audit_events.event_type`
* `auth_audit_events.created_at`

Avoid unique constraints that conflict with existing data without checking.

---

## 32. Public-Safe Views

If public profile data is needed, create public-safe views.

Possible views:

```txt id="public-safe-auth-views"
public_profiles_view
public_broker_profiles_view
public_builder_profiles_view
```

These views must exclude:

* mobile
* email
* private address
* internal account status details
* private docs
* verification docs
* billing info
* staff/admin info
* internal notes
* audit data

Do not expose hidden contact.

---

## 33. Auth Provider Handling

Supabase Auth is expected foundation.

OTP provider may be:

* Supabase phone OTP
* external SMS provider
* setup-required
* dev-only mock if explicitly local/dev and safe

Rules:

* production cannot use mock OTP
* OTP provider missing must show setup-required
* no fake OTP sent
* OTP errors safe
* OTP attempts rate-limited where possible
* OTP not logged
* mobile verified only after actual verification

If provider not configured, implement UI/status foundation and mark setup-required.

---

## 34. Admin Auth Provider Handling

Admin/staff login may use:

* Supabase email/password
* Supabase OAuth Google
* future SSO
* setup-required

Rules:

* admin/staff login separate route
* no public create account
* staff account must exist/invite accepted
* public users cannot become staff from public UI
* no mobile OTP admin login
* admin login route noindex
* provider missing shows setup-required

---

## 35. Route Guard Requirements

Implement route guards for:

### Public routes

* homepage allowed
* search allowed later
* public listing/project pages later
* login/register popup accessible
* pricing/legal/support public later

### Auth required routes

* dashboard
* post property later
* post requirement later
* profile settings
* saved items later
* notifications later
* billing later

### Role-specific routes

* owner dashboard only owner
* broker dashboard only broker
* builder dashboard only builder

### Internal routes

* admin/staff only
* public roles denied
* guest denied
* noindex

Route guard must be server-side or middleware-backed where needed.

Client-only redirect is not enough.

---

## 36. Suggested Route Structure

Create only if needed and in scope.

Possible routes:

```txt id="auth-route-structure"
/login
/register
/auth/callback
/dashboard
/dashboard/owner
/dashboard/broker
/dashboard/builder
/profile
/admin/login
/admin
/unauthorized
/setup-required
```

If existing route structure differs, align safely.

Do not create full dashboard modules yet.

Dashboards may show foundation placeholder with real role/access checks and setup/coming-soon states.

No fake dashboard stats.

---

## 37. Auth Components

Possible components:

```txt id="auth-components"
AuthPopup
MobileOtpForm
RegisterRoleForm
RoleSelector
AuthProviderStatusNotice
LogoutButton
ProtectedActionButton
UnauthorizedState
SetupRequiredState
```

Rules:

* mobile-friendly
* loading state
* error state
* setup-required state
* no fake OTP
* preserve intent
* no admin registration
* disabled reason visible

---

## 38. Session Helpers

Implement safe helpers if needed:

```txt id="session-helper-examples"
getCurrentUser()
getCurrentProfile()
requireAuth()
requireRole(role)
requireAnyRole(roles)
requireStaff()
requireStaffPermission(module, action)
isPublicRole(role)
isInternalRole(role)
```

Rules:

* server-side checks for sensitive actions
* safe errors
* no service role in client
* no hidden contact leak
* consistent status handling

---

## 39. Permission Helpers

Implement or plan helpers:

```txt id="permission-helper-examples"
canAccessOwnerDashboard(profile)
canAccessBrokerDashboard(profile)
canAccessBuilderDashboard(profile)
canAccessAdmin(staff)
canManageStaff(staff)
canViewSensitiveDocs(staff)
```

Full permission implementation can be expanded later.

Foundation should prevent public/wrong role access now.

---

## 40. Middleware Rules

If using middleware:

* avoid redirect loops
* keep public routes accessible
* protect dashboard/admin routes
* role checks may require server-side validation if middleware cannot read DB safely
* admin route must not be public
* login route should redirect authenticated users appropriately
* setup-required route public-safe
* no service role in middleware client-side context unless server-only and safe

Middleware is not a replacement for RLS.

---

## 41. Account Creation Flow

When registration succeeds:

1. create auth user or verify OTP via provider
2. create `profiles` record
3. create matching role profile:

   * `owner_profiles`
   * `broker_profiles`
   * `builder_profiles`
4. record Terms/Privacy consent if captured
5. record audit event
6. redirect to intended route/dashboard
7. show success only after DB success

If DB profile creation fails:

* do not show full success
* handle rollback/retry safely
* log safe error
* create bug if inconsistent profile created

---

## 42. Existing User Login Flow

When mobile exists:

1. send OTP
2. verify OTP
3. fetch profile
4. check account status
5. fetch role profile
6. set session
7. redirect to intended route
8. show dashboard/action

If profile missing:

* repair if safe
* or show support/setup error
* record bug
* do not fake profile

---

## 43. Logout Flow

Logout must:

* end session
* clear auth UI state
* redirect to public-safe page
* remove private dashboard data from client state
* keep selected city if stored public preference
* not clear unrelated user preferences unless intended

---

## 44. Unauthorized UX

Unauthorized page/state should handle:

* guest needs login
* wrong role
* suspended account
* banned account
* staff permission missing
* admin route denied
* provider setup-required

Messages must be safe and not reveal private data.

Examples:

```txt id="unauthorized-messages"
Login required.
This dashboard is not available for your role.
Your account is currently restricted. Contact support.
You do not have permission to access this admin module.
Authentication provider setup required.
```

---

## 45. UI Requirements For This Phase

UI must include:

* loading state
* empty/setup-required state
* safe error state
* mobile responsive auth popup/screen
* clear role selector
* disabled reason if OTP missing
* logout button where applicable
* no dead buttons
* no fake success
* no public admin link

Check baseline at:

* 320px
* 360px
* 390px
* 430px

Full responsive audit later, but auth UI must not be unusable.

---

## 46. Legal/Consent Requirements

Registration/auth must include or prepare:

* Terms acceptance
* Privacy acceptance
* OTP/data notice
* marketing opt-in optional
* contact sharing consent later during inquiry/contact reveal

If legal pages not implemented yet:

* link to placeholder/setup-required legal routes only if routes exist
* otherwise display policy text and mark CMS/legal route `NOT_STARTED`
* do not use dead links
* update docs

No fake legal guarantee.

---

## 47. Audit Requirements

Record safe audit events for:

* registration
* login
* logout where applicable
* OTP requested
* OTP verified
* profile created
* role selected
* admin login attempt
* admin access denied
* account blocked

Do not log:

* OTP code
* secrets
* provider tokens
* full raw errors with sensitive data
* hidden contact beyond safe masked format

If audit event table not implemented, document `PARTIAL`.

---

## 48. Rate Limit Requirements

Add or prepare rate limiting for:

* OTP request
* OTP verify
* login attempts
* registration attempts
* admin login attempts
* staff invite acceptance

If rate limiting infra not implemented yet:

* document as `PARTIAL` or `NOT_STARTED`
* add safe provider-level reliance note if applicable
* create feature registry item
* do not mark auth security full PASS

---

## 49. Provider Setup-Required UX

If OTP/admin provider missing:

Show safe setup-required state.

Example:

```txt id="otp-setup-required-message"
OTP service is not configured yet. Please contact the site administrator.
```

Internal admin/provider page may show:

```txt id="provider-internal-message"
OTP_PROVIDER_SETUP_REQUIRED: Configure OTP provider environment variables and test delivery before production.
```

Public users should not see raw env names unless internal/admin context.

---

## 50. API / Server Action Rules

Any auth/profile server action must:

* validate input
* check provider status
* check rate limits if available
* use server-side Supabase client
* use service role only if needed and server-only
* handle errors safely
* create/update DB only after validation
* return typed safe result
* not return secrets
* not return private data unnecessarily

---

## 51. Input Validation Rules

Validate:

* full name length
* email format
* mobile format
* role value
* OTP length/format
* consent accepted where required
* admin email format
* staff invite token format
* redirect/return URL safety

Invalid input returns safe validation error.

Do not trust client validation only.

---

## 52. Redirect Safety Rules

Auth redirect/intent must be safe.

Rules:

* allow internal paths only
* block external redirect URLs unless explicitly approved
* prevent open redirect
* preserve protected action intent safely
* after login redirect based on role
* wrong role redirect to own dashboard or unauthorized

---

## 53. Dashboard Placeholder Rules

This phase may create basic dashboard landing pages.

Allowed:

* role-specific dashboard shell placeholder
* real profile info
* real account status
* setup-required/coming-soon module cards
* logout/profile controls

Not allowed:

* fake stats
* fake leads
* fake properties
* fake projects
* fake payments
* fake notifications
* fake analytics

If module not implemented, show:

* “Coming in later phase”
* “Setup required”
* “No data yet”

---

## 54. Admin Placeholder Rules

This phase may create basic admin landing/login.

Allowed:

* admin login route
* setup-required state
* staff auth guard
* simple admin shell placeholder after real staff auth
* noindex metadata

Not allowed:

* public admin registration
* fake admin login
* fake staff user
* fake provider status
* fake admin stats
* provider secrets visible

---

## 55. `.env.example` Updates

Update `.env.example` if needed.

Ensure placeholders for auth:

```txt id="auth-env-placeholders"
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

Only placeholders.

No real secrets.

---

## 56. API Provider Status Updates

Update `API_PROVIDER_STATUS.md` for:

* Supabase Auth
* Supabase Database
* Supabase RLS
* OTP provider
* SMS provider
* Admin email/Google provider
* Email provider if invites planned
* Rate limit provider if used

Statuses must be honest:

* `ACTIVE`
* `CONFIGURED_NOT_TESTED`
* `SETUP_REQUIRED`
* `NOT_STARTED`
* `PARTIAL`
* `FAILED`
* `DISABLED`

Do not mark `ACTIVE` without real test.

---

## 57. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

* public mobile OTP login
* public registration
* role selector
* profile creation
* owner profile foundation
* broker profile foundation
* builder profile foundation
* account status
* verification status placeholder
* role guards
* dashboard route guards
* admin/staff separate login
* staff invite-only foundation
* staff permissions foundation
* RLS profiles
* RLS role profiles
* RLS staff profiles
* public-safe profile views
* consent baseline
* auth audit events
* rate limit baseline
* setup-required provider states
* logout
* auth UI mobile baseline

Each item must have accurate status.

---

## 58. Changelog Update

Add `CHANGELOG.md` entry.

Include:

* date
* Prompt 02
* summary
* changed auth files
* changed UI files
* changed migration files
* RLS changes
* provider status changes
* docs updated
* tests run
* known issues
* rollback notes
* manual verification pending

---

## 59. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* OTP provider missing
* Supabase env missing
* RLS policy failed
* service role exposure
* wrong role dashboard access
* public admin route accessible
* profile creation fails
* role profile missing
* build/typecheck failure
* redirect loop
* dead auth button
* fake auth status
* rate limit missing
* admin login not protected
* `.env.example` secret issue

Use existing bug ID convention.

---

## 60. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 02 implementation status
* manual verification pending:

  * `prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md`
* checks run
* known setup-required providers
* routes/features needing verification
* RLS policies needing verification

Do not mark manual verification PASS from implementation prompt alone.

---

## 61. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md`.

Include:

* auth flow status
* service role client exposure check
* public/private profile access
* role guards
* admin route protection
* staff permission baseline
* RLS policies created
* public-safe views
* OTP setup-required status
* rate limit status
* direct URL tests pending verification
* known risks
* no fake RLS PASS

---

## 62. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md`.

Include:

* auth/profile query indexes
* profile lookup efficiency
* no unbounded staff/user lists
* session helper performance
* middleware impact notes
* rate limit impact
* no heavy dashboard data
* build/lint/typecheck status

---

## 63. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

Include:

* migrations created
* backup requirement for production
* rollback notes for auth schema
* rollback notes for RLS policies
* rollback notes for route guard changes
* feature flags/setup-required states
* provider config required
* deployment risk level

If migration added, document rollback carefully.

---

## 64. Brain Update

Update `brain.md` with:

* Prompt 02 implementation status
* changed files
* migration files
* auth/provider setup-required status
* RLS status
* routes added/changed
* tests run
* bugs found
* next prompt:

  * `prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md`
* exact resume instruction

Example:

```txt id="brain-next-step"
Next step: Run prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md before starting Prompt 03.
```

---

## 65. Required Tests / Checks

Run available:

```txt id="test-commands"
npm run lint
npm run typecheck
npm run build
npm test
```

or equivalent package manager commands.

Additionally, if possible:

* run migration validation
* run local Supabase tests if available
* run RLS policy tests if available
* run route guard tests if available

If command missing, document `NOT_CONFIGURED`.

If command fails, fix if safe or document bug.

Do not claim checks passed if not run.

---

## 66. Auth Manual Smoke Checks To Perform If Possible

If app can run locally, test manually:

* guest sees login/register
* guest can open auth popup
* OTP missing shows setup-required
* registration form shows Owner/Broker/Builder
* invalid role rejected
* authenticated user hides login/register
* logout works
* owner route denied to broker/builder
* broker route denied to owner/builder
* builder route denied to owner/broker
* guest denied dashboard
* public denied admin
* admin login separate
* admin registration absent
* no public admin link

Record results in docs.

Full verification happens in matching manual prompt.

---

## 67. RLS Manual Smoke Checks To Perform If Possible

If Supabase/database is available, verify:

* RLS enabled on new private tables
* user can read own profile
* user cannot read another private profile
* user can update own safe fields
* user cannot update role directly if not allowed
* public cannot read private profile table
* public-safe view excludes email/mobile
* staff table not public
* staff permissions not public
* user consent own-only
* audit events not public
* wrong role denied route/server action

If DB unavailable, mark `SETUP_REQUIRED`.

Do not mark RLS PASS without actual checks.

---

## 68. Rollback Guidance

Provide rollback notes for:

* migration rollback
* route guard rollback
* auth component rollback
* provider setup rollback
* env placeholder rollback
* docs rollback

If migration created:

* document whether dropping tables is destructive
* recommend backup before production
* avoid destructive rollback if data exists
* feature flag/disable routes if needed

---

## 69. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
.env.example
src/lib/supabase/*
src/lib/auth/*
src/lib/permissions/*
src/components/auth/*
src/app/login/*
src/app/register/*
src/app/auth/*
src/app/dashboard/*
src/app/admin/login/*
src/app/admin/*
src/middleware.ts
supabase/migrations/*_auth_roles_rls_foundation.sql
types/*
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

Only change files that are needed.

Do not create duplicate routes/components if existing equivalents exist.

---

## 70. Expected Output From This Phase

At the end of this phase, project should have:

* public auth foundation
* role selection foundation
* profile schema/foundation
* route guard foundation
* admin/staff auth separation foundation
* staff permission foundation
* RLS foundation
* setup-required provider states
* docs updated
* migrations created if DB changed
* checks run
* manual verification pending

---

## 71. Forbidden Outcomes

This phase must not leave:

* public admin registration
* admin login via public mobile OTP
* service role in client
* RLS disabled
* private profiles public
* email/mobile in public view
* fake OTP success
* fake verified badge
* fake dashboard stats
* fake provider active
* wrong role dashboard access
* direct admin access for public
* migration without rollback notes
* docs not updated
* tests/checks unreported

---

## 72. Phase Completion Status Rules

### `DONE`

Use only for implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification has also been completed in same run and documented.

### `PARTIAL`

Use if:

* provider missing but UI/setup-required done
* DB/RLS unavailable but schema planned
* some checks not configured
* non-critical route guards pending
* manual verification pending

### `BLOCKED`

Use if:

* Supabase setup required before any safe implementation
* package/build broken from baseline
* architecture conflict prevents safe auth implementation
* missing required prompt/docs
* package install impossible

### `SETUP_REQUIRED`

Use if:

* OTP provider missing
* Supabase env missing
* admin auth provider missing
* email provider missing for invites

---

## 73. Final Response Required Format

Return final response in this structure:

```txt id="prompt-02-final-response-format"
Summary:
- what Auth/Roles/RLS foundation was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Auth features:
- public auth:
- role registration:
- logout/session:
- admin/staff auth:

RLS/Security:
- tables/policies:
- public-safe views:
- service role safety:
- route guards:

Provider status:
- Supabase:
- OTP/SMS:
- admin auth:
- email/invite:

Docs updated:
- path list

Tests/checks run:
- command: result

Bugs/issues found:
- bug IDs or none

Setup-required:
- provider/config list

Rollback notes:
- code:
- database:
- provider/config:

Manual verification:
- pending prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md

Next step:
- run prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md
```

Do not say only “done”.

---

## 74. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md
```

Do not start Prompt 03 until Prompt 02 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 75. Common Auth/RLS Bugs To Watch For

Create/track bugs for:

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

Use project date-based bug IDs if existing convention exists.

---

## 76. Quality Bar

This phase is successful when future phases can safely rely on:

* authenticated public users
* correct public role
* own private profile access
* public-safe profile data
* role-specific dashboards/routes
* admin/staff separation
* staff permission foundation
* RLS foundation
* provider setup-required states
* route guard foundation
* no public admin registration
* no service role client exposure
* no fake OTP/payment/provider state

---

## 77. Final Rule For Prompt 02

Implement auth and role security foundation safely.

Use server-side checks.

Use RLS.

Use migrations.

Separate public users from admin/staff.

Protect private profile data.

Keep hidden contact private.

Show setup-required when OTP/admin providers are missing.

Do not fake OTP.

Do not fake login.

Do not fake verification.

Do not fake provider status.

Do not expose secrets.

Do not disable RLS.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
