# prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md

# My Gujarat Property — Prompt 07 Manual Verification: Admin, Staff And Super Admin System

> **DESIGN-MATCH CHECK (mandatory):** Verify built screens match `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 11–15** and all `docs/08` "Design Add-Ons". Confirm: graphite shell + no bottom nav, uniform Approve/Request-Changes/Reject + reason + "will be logged", per-viewer watermarked docs, maker-checker self-approval disabled, append-only audit w/ masked IP.

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
```

This prompt verifies the **Admin, Staff and Super Admin System** phase.

Do not skip this verification.

Do not start Prompt 08 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real admin access, staff permission, moderation, secret masking, RLS, noindex, audit, responsive and docs checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
Prompt Number: 07 Verification
Phase: Admin, Staff And Super Admin System
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
Previous Prompt: prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
Next Implementation Prompt: prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that the internal management system is secure, private, permission-scoped and operationally safe.

This verification checks:

* separate admin login
* no public admin registration
* no mobile OTP admin login
* admin route protection
* admin noindex
* private admin cache safety
* Super Admin access
* Admin access
* Staff access
* staff statuses
* staff permissions
* staff invite foundation
* permission-aware navigation
* moderation queues
* property approval/rejection/request-changes
* project approval/rejection/request-changes
* requirement approval/rejection/request-changes
* user management foundation
* staff management foundation
* verification review foundation
* support/report/fraud placeholders
* billing/payment placeholders
* provider/settings placeholders
* provider secret masking
* audit log foundation
* maker-checker foundation
* sensitive data protection
* private document protection
* direct URL denial
* RLS for admin/staff tables
* no fake admin data/actions
* responsive admin UI
* docs updates
* Prompt 08 readiness

This phase does not verify full CRM, billing, payment, media, ads, notifications, CMS, support tickets or final production signoff. Those are later prompts.

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

Also inspect all changed implementation files from Prompt 07.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* internal admin/staff access
* admin shell/layout
* admin login route
* staff invite and permission foundation
* staff management foundation
* user management foundation
* entity moderation foundation
* approval actions
* internal audit foundation
* maker-checker foundation
* provider/settings placeholders
* billing/payment placeholders
* support/report/fraud placeholders
* sensitive data access rules
* direct URL protection
* private cache/noindex rules
* admin RLS/security
* responsive admin UI
* docs/checklist updates

This verification does not cover full implementation of:

* complete lead/CRM system
* complete messaging/proposals/site visits
* complete billing/payment/Razorpay settlement/refunds
* complete media storage/R2/CDN processing
* complete ads/promotions lifecycle
* complete notifications delivery
* complete support ticket system
* complete CMS/blog/legal editor
* complete provider health monitor
* complete system observability
* final production signoff

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 07 changed files
3. inspect admin routes
4. inspect admin login
5. inspect admin shell/layout
6. inspect auth and route guards
7. inspect staff profile/permission logic
8. inspect permission-aware navigation
9. inspect moderation queues/actions
10. inspect user/staff management actions
11. inspect audit log implementation
12. inspect maker-checker implementation/foundation
13. inspect sensitive data controls
14. inspect provider/settings/billing placeholders
15. inspect RLS policies/migrations
16. inspect noindex/private cache behavior
17. search for provider secrets/service role leaks
18. search for public admin links/registration/mobile OTP
19. search for fake admin/payment/provider/verification data
20. run available automated checks
21. run manual smoke checks where possible
22. test responsive widths
23. update required docs
24. create bugs for failures
25. decide final verification result
26. update `brain.md`
27. prepare Prompt 08 readiness note

Do not skip docs updates.

---

## 6. Required File Inspection

Inspect likely changed files:

```txt id="file-inspection"
src/app/admin/login/page.*
app/admin/login/page.*
src/app/admin/layout.*
app/admin/layout.*
src/app/admin/page.*
app/admin/page.*
src/app/admin/dashboard/page.*
app/admin/dashboard/page.*
src/app/admin/users/
app/admin/users/
src/app/admin/staff/
app/admin/staff/
src/app/admin/moderation/
app/admin/moderation/
src/app/admin/moderation/properties/
app/admin/moderation/properties/
src/app/admin/moderation/projects/
app/admin/moderation/projects/
src/app/admin/moderation/requirements/
app/admin/moderation/requirements/
src/app/admin/verification/
app/admin/verification/
src/app/admin/support/
app/admin/support/
src/app/admin/reports/
app/admin/reports/
src/app/admin/fraud/
app/admin/fraud/
src/app/admin/billing/
app/admin/billing/
src/app/admin/payments/
app/admin/payments/
src/app/admin/providers/
app/admin/providers/
src/app/admin/settings/
app/admin/settings/
src/app/admin/feature-flags/
app/admin/feature-flags/
src/app/admin/audit/
app/admin/audit/
src/app/admin/system-health/
app/admin/system-health/
src/components/admin/
components/admin/
src/components/layout/AdminShell.*
components/layout/AdminShell.*
src/components/layout/AdminSidebar.*
components/layout/AdminSidebar.*
src/components/layout/AdminTopbar.*
components/layout/AdminTopbar.*
src/lib/admin/
lib/admin/
src/lib/permissions/
lib/permissions/
src/lib/actions/admin/
lib/actions/admin/
src/lib/auth/
lib/auth/
src/types/admin.*
types/admin.*
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
```

Record exact changed files from Prompt 07.

---

## 7. Admin Route Verification

Check internal routes.

Possible routes:

```txt id="admin-route-checks"
/admin/login
/admin
/admin/dashboard
/admin/users
/admin/users/[id]
/admin/staff
/admin/staff/invites
/admin/staff/[id]
/admin/moderation
/admin/moderation/properties
/admin/moderation/projects
/admin/moderation/requirements
/admin/properties
/admin/projects
/admin/requirements
/admin/verification
/admin/support
/admin/reports
/admin/fraud
/admin/billing
/admin/payments
/admin/plans
/admin/coupons
/admin/trials
/admin/ads
/admin/notifications
/admin/providers
/admin/settings
/admin/feature-flags
/admin/cms
/admin/blog
/admin/legal
/admin/seo
/admin/locations
/admin/audit
/admin/system-health
/admin/security
```

Rules:

* visible nav route must work or show safe placeholder
* no visible route should be dead
* no `href="#"`
* all admin routes protected
* all admin routes noindex
* all admin pages private/no public cache
* permission-limited routes deny unauthorized staff

If visible admin nav links to missing route:

* create bug
* mark `PARTIAL` or `FAIL` depending severity

---

## 8. Admin Login Verification

Verify `/admin/login` or equivalent:

* separate from public login
* no public registration button
* no mobile OTP login
* email/OAuth/setup-required only
* safe error messages
* no raw provider error
* no fake login success
* disabled staff denied
* suspended staff denied
* public Owner/Broker/Builder denied
* noindex
* not linked from public header/footer
* rate limit/login attempt foundation documented

If admin login allows mobile OTP:

* create critical bug
* mark `FAIL`

If public admin registration exists:

* create critical bug
* mark `FAIL`

---

## 9. Public Admin Link Verification

Search public UI/dashboard for:

```txt id="public-admin-link-search"
Admin
Staff
Super Admin
/admin
/admin/login
Provider Settings
Internal
Audit Logs
System Settings
```

Check:

* public header has no admin link
* public footer has no admin link
* Owner/Broker/Builder dashboard has no admin link
* public sitemap has no admin links
* public search/detail/profile pages have no admin link

If public admin link is visible:

* create critical bug
* mark `FAIL`

---

## 10. Public User Admin Access Verification

Test or inspect:

```txt id="public-user-admin-denial"
guest → /admin
guest → /admin/dashboard
owner → /admin
broker → /admin
builder → /admin
owner → /admin/users
broker → /admin/moderation
builder → /admin/providers
```

Expected:

* denied/redirected
* no private admin data rendered before redirect
* safe unauthorized/forbidden state
* no admin shell visible to public users
* no public user role escalation

If any public user can access admin:

* create critical bug
* mark `FAIL`

---

## 11. Internal Staff Status Verification

Verify staff statuses:

```txt id="staff-statuses"
invited
active
disabled
suspended
deleted
```

Check:

* active staff can access allowed modules
* disabled staff denied
* suspended staff denied
* invited-only staff cannot access before acceptance
* deleted staff denied
* status changes audited if implemented
* no fake staff status

If disabled/suspended staff can access admin:

* create critical bug
* mark `FAIL`

---

## 12. Super Admin Verification

Verify Super Admin:

* can access all modules
* can manage staff where implemented
* can manage permissions where implemented
* can access audit logs
* can access provider/settings placeholders
* can perform high-level actions where implemented
* cannot expose secrets in UI
* high-risk actions audited
* maker-checker override if implemented is audited
* cannot accidentally lock out last Super Admin

If Super Admin can view provider secrets in raw form:

* create critical bug
* mark `FAIL`

---

## 13. Admin Verification

Verify Admin role:

* can access permitted operational modules
* cannot access provider secrets unless permission explicitly grants
* cannot manage security/system/provider settings unless granted
* cannot self-grant permissions
* cannot disable Super Admin
* cannot perform high-risk action without permission/maker-checker if implemented
* actions audited

If Admin has unrestricted Super Admin access by default:

* create bug
* mark `PARTIAL` or `FAIL` depending risk

---

## 14. Staff Permission Verification

Verify staff permission model.

Check permission actions:

```txt id="permission-actions"
read
create
update
approve
reject
delete
export
bulk_action
view_sensitive
manage_provider
manage_security
manage_payment
manage_staff
manage_feature_flags
manage_system
```

Check permission modules:

```txt id="permission-modules"
users
staff
properties
projects
requirements
verification
support
reports
fraud
billing
payments
plans
coupons
trials
ads
notifications
providers
settings
feature_flags
cms
blog
legal
seo
locations
audit_logs
system_health
security
exports
```

Verify:

* permission checks server-side
* UI hiding is not only protection
* staff without permission denied
* staff cannot self-grant permission
* staff cannot access provider/settings/audit without permission
* export/sensitive access requires explicit permission
* permission changes audited

If staff can self-grant permission:

* create critical bug
* mark `FAIL`

---

## 15. Permission-Aware Navigation Verification

Verify admin nav:

* Super Admin sees all applicable modules
* Admin sees permitted modules
* Staff sees assigned modules
* forbidden modules hidden or disabled
* direct URL still denied
* disabled nav has reason if shown
* no dead nav
* no `href="#"`
* no provider/settings link for unauthorized staff

If nav hides module but direct URL allows access:

* create critical bug
* mark `FAIL`

---

## 16. Staff Invite Verification

If staff invite foundation implemented, verify:

* only authorized staff/Super Admin can invite
* invite token stored hashed
* invite status tracked
* expired invite denied
* revoked invite denied
* accepted invite creates staff profile safely
* invite action audited
* no fake invite sent
* email provider setup-required if email not configured
* public users cannot list invites
* staff invite route not public

If not implemented, ensure module shows `SETUP_REQUIRED`, `NOT_STARTED` or `COMING_SOON`.

---

## 17. Staff Management Verification

Verify staff management foundation:

* staff list permission-scoped
* staff detail page protected
* update role permission-scoped
* update permissions permission-scoped
* disable/enable staff permission-scoped
* staff cannot disable self if unsafe
* staff cannot disable only Super Admin
* staff cannot edit own permissions
* actions audited
* sensitive staff data masked where needed

If public users can view staff list:

* create critical bug
* mark `FAIL`

---

## 18. Admin Shell Verification

Verify admin shell includes:

* internal layout
* internal sidebar/nav
* admin topbar
* staff profile menu
* logout
* environment/status indicator if implemented
* breadcrumbs/section labels
* permission-aware nav
* loading state
* forbidden state
* setup-required state
* no public footer
* no public user nav
* no public login/register
* no provider secrets
* no fake metrics

If public footer appears in admin shell and exposes public navigation/admin confusion:

* create bug
* mark `PARTIAL` or `FAIL` depending risk

---

## 19. Admin Dashboard Overview Verification

Verify admin dashboard overview shows only real data or safe states.

Allowed real data:

* pending moderation count
* real user count if safe/limited
* real staff count
* real provider setup-required statuses
* recent audit events if real
* system health setup/placeholder

Forbidden fake data:

* fake revenue
* fake payment count
* fake active users
* fake provider uptime
* fake security alerts
* fake audit events
* fake moderation count
* fake support tickets

If fake admin overview data appears real:

* create bug
* mark `FAIL`

---

## 20. Moderation Queue Verification

Verify moderation queues for:

* properties
* projects
* requirements

Each queue should:

* require admin/staff auth
* require permission
* be paginated/limited
* show real submitted/pending items only
* show safe submitter/profile info
* show status/approval status
* show submitted date
* show safe location
* support preview/detail
* support approve/reject/request changes if implemented
* not show hidden contact unless permission
* not show provider secrets
* not show fake rows

If moderation queue includes fake rows:

* create bug
* mark `FAIL`

---

## 21. Property Moderation Action Verification

Verify property approval actions:

* require staff auth
* require property approve/reject permission
* validate target property exists
* validate status transition
* reject requires reason
* request changes requires reason
* approve updates status/approval/visibility correctly
* rejected not public
* pending not public
* owner cannot self-approve
* action audited
* public-safe view updates only after publish/approval
* hidden contact remains protected

If staff without permission can approve property:

* create critical bug
* mark `FAIL`

---

## 22. Project Moderation Action Verification

Verify project approval actions:

* require staff auth
* require project approve/reject permission
* validate project exists
* validate status transition
* reject requires reason
* request changes requires reason
* approval does not fake RERA verification
* approval does not claim legal guarantee
* private RERA proof docs not public
* public-safe project view updates only after approval
* action audited

If fake RERA approval appears:

* create critical bug
* mark `FAIL`

---

## 23. Requirement Moderation Action Verification

Verify requirement approval actions:

* require staff auth
* require requirement approve/reject permission
* validate requirement exists
* validate status transition
* reject requires reason
* request changes requires reason
* hidden contact protected
* buyer/renter private contact not public
* scoped/public visibility respected
* action audited

If requirement contact leaks:

* create critical bug
* mark `FAIL`

---

## 24. Approval Workflow Security Verification

For all moderation actions, verify:

* public users cannot call action
* entity owner cannot self-approve
* staff without permission denied
* disabled staff denied
* invalid status transition denied
* reason required for reject/need changes
* actor recorded
* timestamp recorded
* audit log created if implemented
* safe error returned
* no raw SQL/provider error

If approval action is just client-side button without server permission:

* create critical bug
* mark `FAIL`

---

## 25. User Management Verification

Verify user management foundation:

* user list protected
* user search/filter safe
* pagination exists
* user detail protected
* sensitive fields masked unless permission
* account status actions permission-scoped
* suspend/ban/restore require reason
* role change request placeholder/foundation safe
* internal notes protected
* user entity links safe
* no private docs exposed without permission
* actions audited

If any staff can view all sensitive user data without permission:

* create bug
* mark `FAIL` or `PARTIAL` depending scope

---

## 26. User Status Action Verification

If implemented, verify:

* suspend user requires permission
* ban user requires permission
* restore user requires permission
* reason required for suspend/ban
* target user validated
* Super Admin lockout prevented
* high-risk actions maker-checker if implemented
* action audited
* affected user access changes server-side
* safe errors

If normal staff can ban users without permission:

* create critical bug
* mark `FAIL`

---

## 27. Verification Review Module Verification

Verify verification module:

* protected by permission
* pending verification queue real or setup state
* sensitive docs hidden unless permission
* no fake document approval
* no fake verified badge
* no fake RERA verification
* no legal guarantee claim
* actions audited if implemented
* media/upload missing shown setup-required
* status updates real only

If verification badge can be faked by admin UI without proper status/audit:

* create bug
* mark `FAIL`

---

## 28. Support Module Verification

Verify support module:

* protected by permission
* shows real tickets only if table exists
* otherwise setup/coming soon
* no fake tickets
* no fake replies
* no fake SLA
* attachments private
* internal notes private
* actions audited if implemented
* sensitive data protected

If fake support ticket success exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 29. Reports / Fraud Module Verification

Verify reports/fraud module:

* protected by permission
* shows real reports only if table exists
* otherwise setup/coming soon
* no fake reports
* report categories safe
* action placeholders safe
* sensitive user data protected
* high-risk actions audited/maker-checker if implemented
* hidden contact not exposed to unauthorized staff

If fake fraud report queue appears real:

* create bug
* mark `FAIL`

---

## 30. Billing / Payment Admin Placeholder Verification

Full billing is Prompt 09.

Verify billing/payment admin area:

* protected by permission
* placeholder/setup-required if billing not implemented
* no fake revenue
* no fake payment count
* no fake invoice
* no fake refund
* no fake Razorpay success
* no fake active subscription
* no real payment actions without provider/webhook
* sensitive payment actions require permission/maker-checker
* provider status honest

If fake payment/refund appears:

* create critical bug
* mark `FAIL`

---

## 31. Provider Settings Verification

Verify provider/settings area:

* Super Admin or permitted staff only
* provider secret values masked
* no raw secret displayed
* no provider token in client payload
* no fake provider active status
* setup-required statuses honest
* provider changes disabled/setup-required unless implemented
* high-risk provider changes audited/maker-checker if implemented
* public users denied
* normal staff denied without permission

If provider secret is visible:

* create critical bug
* mark `FAIL`

---

## 32. Feature Flags / Settings Verification

Verify feature flags/settings placeholder/foundation:

* Super Admin/permission only
* no public access
* no fake enabled status
* production changes audited if implemented
* maker-checker for high-risk changes if implemented
* disabled/setup-required where not implemented
* no broken public UI after flag placeholder

If staff without permission can alter feature flags:

* create bug
* mark `FAIL`

---

## 33. CMS / Blog / Legal / SEO / Location Placeholder Verification

Verify placeholders:

* CMS protected
* blog protected
* legal protected
* SEO protected
* location admin protected
* missing location requests protected
* no fake published content
* no fake legal approval
* no fake sitemap status
* no fake location data
* modules clearly setup/coming later if not implemented

Full implementation is later.

---

## 34. Audit Log Verification

If audit logs implemented, verify logs for:

* staff login/access denied
* staff invite
* staff permission change
* user status change
* property approve/reject/request changes
* project approve/reject/request changes
* requirement approve/reject/request changes
* sensitive data view
* provider/settings access
* export attempt
* feature flag/settings change

Audit logs must:

* be protected
* be append-only/tamper-resistant as possible
* be paginated
* be permission-scoped
* redact secrets
* not store OTP/password/provider tokens
* not store full private docs
* not expose hidden contact to unauthorized staff

If audit logs store secrets:

* create critical bug
* mark `FAIL`

If audit foundation missing, mark `PARTIAL` if documented.

---

## 35. Maker-Checker Verification

If maker-checker foundation implemented, verify:

* high-risk action can create request
* requester and approver separation where required
* statuses safe:

  * draft
  * pending_approval
  * approved
  * rejected
  * cancelled
  * executed
  * expired
* execution audited
* rejection reason captured
* Super Admin override audited
* same staff cannot approve own critical request unless allowed/audited

If maker-checker not implemented, ensure high-risk actions are either disabled, Super Admin-only, or documented as `PARTIAL`.

Do not fake maker-checker approval.

---

## 36. Internal Notes / Timeline Verification

If internal notes/timeline implemented:

* private to admin/staff with permission
* public users cannot see notes
* notes audited if sensitive
* no provider secrets in notes
* no private docs stored raw
* deletion restricted or soft-hidden
* no fake internal notes
* safe professional content guidance

If internal notes appear in public dashboard/detail page:

* create critical bug
* mark `FAIL`

---

## 37. Sensitive Data Access Verification

Sensitive data includes:

* phone/email
* private address
* verification docs
* RERA proof docs
* identity docs
* billing/payment info
* support attachments
* fraud reports
* internal notes
* audit logs
* provider config
* service role keys
* admin/staff permissions

Verify:

* sensitive data masked by default
* `view_sensitive` permission required
* sensitive view action audited
* export permission required
* private docs not public
* unauthorized staff denied
* no sensitive data in raw errors/logs

If sensitive data broadly visible to all staff:

* create bug
* mark `FAIL` or `PARTIAL` depending severity

---

## 38. Export / Bulk Action Verification

If export/bulk actions implemented:

* permission required
* sensitive export separate
* export audited
* batch size limited
* confirmation required
* high-risk bulk action maker-checker if implemented
* no fake export success
* no private docs unless explicit permission
* no provider secrets
* no unbounded export

If not implemented:

* hidden or setup/coming soon

If export works without permission:

* create critical bug
* mark `FAIL`

---

## 39. Admin Search / Filter Verification

Verify admin tables:

* pagination
* safe search
* safe filters
* no unbounded reads
* no unsafe raw SQL
* no sensitive export through normal search
* filters are real or disabled
* mobile filter usable
* status/role/date filters safe

If admin user list loads all users unbounded:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 40. Admin Noindex Verification

Verify admin/internal routes:

* noindex/nofollow metadata where appropriate
* excluded from sitemap
* not linked from public UI
* robots disallow where appropriate
* no private/admin metadata in public schema

Noindex is not security. Route guards must still work.

If admin routes are indexable and public route-accessible:

* create critical bug
* mark `FAIL`

If admin routes are protected but noindex missing:

* create bug
* mark `PARTIAL`

---

## 41. Private Cache Verification

Admin pages are private.

Verify:

* no static generation of admin private data
* no public caching of admin pages
* no cached staff data shared between users
* no provider/audit/user data in public cache
* `no-store` or equivalent where needed
* admin URLs not in public sitemap

If admin private data can be publicly cached:

* create critical bug
* mark `FAIL`

---

## 42. Service Role / Secret Verification

Search admin code and client bundles for:

```txt id="secret-patterns"
SUPABASE_SERVICE_ROLE_KEY
SERVICE_ROLE
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
R2_SECRET_ACCESS_KEY
R2_SECRET
OTP_API_KEY
SMS_API_KEY
WHATSAPP_BUSINESS_TOKEN
GOOGLE_CLIENT_SECRET
SENDGRID_API_KEY
RESEND_API_KEY
TURNSTILE_SECRET_KEY
```

Verify:

* service role not in client
* provider secrets not in UI
* no real secrets in `.env.example`
* no secrets in logs
* no raw secrets in audit logs
* no secrets in provider settings response
* no secrets printed in docs/final output

If real secret exposure found:

* do not print secret
* create critical bug
* mark `FAIL`
* recommend secret rotation

---

## 43. RLS Verification For Admin Tables

If admin/staff tables exist, verify RLS enabled.

Check:

```txt id="admin-tables-rls"
staff_profiles
staff_permissions
staff_invites
admin_audit_logs
admin_action_requests
admin_action_approvals
entity_moderation_notes
entity_status_events
admin_internal_notes
admin_saved_views
admin_exports
```

Expected:

* public denied
* public users denied
* staff access permission-scoped
* Super Admin access allowed
* sensitive data permission-scoped
* audit logs protected
* staff cannot self-grant
* disabled staff denied by server logic
* service role server-only

If RLS missing on private admin table:

* create critical bug
* mark `FAIL`

If database unavailable:

* mark RLS runtime check `SETUP_REQUIRED`
* do not mark RLS PASS

---

## 44. RLS Test Suggestions

If Supabase test environment is available, run equivalent scenarios:

```txt id="rls-test-scenarios"
1. Anonymous select staff_profiles → denied.
2. Public owner select staff_profiles → denied.
3. Staff select own staff_profile → allowed if policy permits.
4. Staff select all staff_profiles without permission → denied.
5. Staff select staff_permissions of others without permission → denied.
6. Staff update own permission → denied.
7. Super Admin update staff permission → allowed.
8. Staff without property approval permission approve property → denied.
9. Staff with property approval permission approve property → allowed.
10. Public select admin_audit_logs → denied.
11. Staff without audit permission select audit logs → denied.
12. Audit manager/Super Admin select audit logs → allowed.
13. Staff without provider permission select provider settings → denied or masked.
```

Record exact results.

Do not mark RLS PASS without tests.

---

## 45. Migration Verification

If Prompt 07 changed DB, verify migration exists:

```txt id="migration-name"
supabase/migrations/*_admin_staff_super_admin_system.sql
```

Migration must include:

* purpose
* phase: Prompt 07
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* functions/triggers if any
* destructive changes yes/no
* backup required yes/no
* rollback notes

If DB changed without migration:

* create critical bug
* mark `FAIL`

If migration has no rollback notes:

* create bug
* mark `PARTIAL` or `FAIL` depending risk

---

## 46. Responsive Admin UI Verification

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

* admin login fits
* admin sidebar collapses/drawer
* no horizontal scroll
* admin tables become cards
* filters usable
* actions usable
* modals fit screen
* detail drawers fit
* permission disabled states visible
* sensitive reveal controls usable
* destructive confirmations readable
* topbar not overlapping
* long notes/details readable

If not fully tested, mark responsive verification `PARTIAL`.

Do not mark responsive PASS without checks.

---

## 47. Accessibility Verification

Check admin UI:

* semantic headings
* nav labels
* button text
* icon aria labels
* focus visible
* keyboard navigation
* table/card labels
* status badges not color-only
* confirmation dialogs accessible
* form labels
* error text readable
* large mobile tap targets
* sensitive reveal controls understandable

If severe accessibility blocker exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 48. Performance Verification

Verify admin implementation:

* paginated user/entity/staff lists
* paginated audit logs
* limited moderation queues
* indexes for filters
* no unbounded reads
* no N+1 heavy queries
* no heavy fake charts
* provider SDKs not loaded unnecessarily
* no maps/payment/media scripts unless needed
* export/bulk limits if implemented
* private no-store cache strategy

If admin loads all users/entities without pagination:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 49. Build / Lint / Typecheck Verification

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

## 50. Manual Smoke Test Matrix

If app can run and test accounts exist, test:

```txt id="manual-smoke-matrix"
Guest:
- /admin denied
- /admin/login accessible as login page only
- no admin registration

Owner:
- /admin denied
- /admin/dashboard denied
- no admin link in public/dashboard UI

Broker:
- /admin denied
- /admin/dashboard denied
- no admin link in public/dashboard UI

Builder:
- /admin denied
- /admin/dashboard denied
- no admin link in public/dashboard UI

Staff:
- /admin allowed only if active
- permitted modules accessible
- forbidden modules denied
- disabled staff denied

Admin:
- operational modules accessible
- provider/security/system denied unless permission

Super Admin:
- all modules accessible
- provider/settings masked
- staff management available
```

If test accounts unavailable:

* inspect code
* mark runtime tests `SETUP_REQUIRED` or `PARTIAL`
* do not fake runtime PASS

---

## 51. Moderation Action Smoke Test

If test entities exist, test:

```txt id="moderation-smoke-tests"
Property:
- pending property appears in queue
- approve works with permission
- reject requires reason
- need changes requires reason
- public visibility updates safely
- action audited

Project:
- pending project appears in queue
- approve works with permission
- reject requires reason
- need changes requires reason
- no fake RERA verification
- action audited

Requirement:
- pending requirement appears in queue
- approve works with permission
- reject requires reason
- need changes requires reason
- hidden contact protected
- action audited
```

If no test entities exist, inspect logic and mark runtime moderation test `PARTIAL`.

---

## 52. Documentation Update Verification

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

## 53. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

* admin login route
* admin noindex
* admin shell
* Super Admin role
* Admin role
* Staff role
* staff permissions
* staff invite foundation
* staff management
* staff status controls
* permission-aware nav
* property moderation queue
* project moderation queue
* requirement moderation queue
* approve/reject/request changes actions
* user management foundation
* user status actions
* verification review foundation
* support module placeholder
* reports/fraud module placeholder
* billing/payment admin placeholder
* provider settings placeholder
* feature flags/settings placeholder
* CMS/blog/legal/SEO/location placeholders
* audit logs
* internal notes/timeline
* maker-checker foundation
* sensitive data permission controls
* export/bulk action placeholders
* admin RLS policies
* private cache/no-store admin rules
* responsive admin UI

Future features must not be marked done.

---

## 54. Changelog Verification

Check `CHANGELOG.md` includes Prompt 07 entry with:

* date
* summary
* changed files
* new admin routes
* migration files if any
* RLS/security changes
* provider status changes
* docs updated
* tests/checks run
* verification status
* known issues
* rollback notes

If missing, update changelog.

---

## 55. Bugs And Fixes Verification

If issues are found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

* `BUG-ADMIN-PUBLIC-ACCESS`
* `BUG-ADMIN-PUBLIC-REGISTER`
* `BUG-ADMIN-MOBILE-OTP`
* `BUG-ADMIN-PUBLIC-LINK`
* `BUG-ADMIN-INDEXABLE`
* `BUG-ADMIN-PUBLIC-CACHE`
* `BUG-ADMIN-DISABLED-STAFF-ACCESS`
* `BUG-ADMIN-STAFF-SELF-GRANT`
* `BUG-ADMIN-PERMISSION-BYPASS`
* `BUG-ADMIN-APPROVAL-NO-PERMISSION`
* `BUG-ADMIN-FAKE-APPROVAL`
* `BUG-ADMIN-FAKE-VERIFICATION`
* `BUG-ADMIN-FAKE-PAYMENT`
* `BUG-ADMIN-FAKE-PROVIDER-ACTIVE`
* `BUG-ADMIN-FAKE-AUDIT`
* `BUG-ADMIN-PROVIDER-SECRET-LEAK`
* `BUG-ADMIN-SERVICE-ROLE-CLIENT`
* `BUG-ADMIN-PRIVATE-DOC-LEAK`
* `BUG-ADMIN-HIDDEN-CONTACT-LEAK`
* `BUG-ADMIN-AUDIT-SECRET-STORED`
* `BUG-ADMIN-DEAD-NAV`
* `BUG-ADMIN-HREF-HASH`
* `BUG-ADMIN-RLS-MISSING`
* `BUG-ADMIN-MIGRATION-MISSING`
* `BUG-ADMIN-BUILD-FAIL`

Use existing bug ID convention if available.

---

## 56. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 07 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* admin routes checked
* roles tested
* permission tests
* moderation tests
* provider/secret tests
* audit tests
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

## 57. Security Checklist Verification

Update/verify `SECURITY_RLS_CHECKLIST.md`.

Include Prompt 07 results for:

* admin route auth
* no public admin registration
* no mobile OTP admin login
* noindex admin routes
* no public admin links
* staff permission checks
* direct URL admin denial
* provider secret masking
* service role server-only
* sensitive data permission controls
* private document protection
* hidden contact access controls
* audit log protection
* maker-checker status
* admin private cache/no-store
* RLS for admin tables
* known issues

If public admin access or secret leak exists, result cannot be PASS.

---

## 58. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

Include Prompt 07 results for:

* admin pagination
* admin filter indexes
* moderation queue limits
* audit log pagination
* no unbounded users/entities
* no heavy fake charts
* provider SDKs not loaded unnecessarily
* private admin cache strategy
* build status
* future load test notes
* known performance issues

---

## 59. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

Include:

* Prompt 07 route changes
* admin component changes
* migration path if any
* RLS policy changes
* permission model changes
* rollback notes
* cache/session risk
* provider setup-required notes
* audit/maker-checker risk
* post-deploy admin smoke checks
* verification status

If DB/RLS/permission changes exist without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 60. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md`.

Relevant statuses:

* Admin Auth Provider
* Email Provider for staff invites
* Supabase Database/RLS
* Provider settings/health checks
* Payment/Razorpay
* Media/R2
* Notification provider
* Support email/provider
* Error tracking
* Analytics/system monitoring

Rules:

* no provider active without test
* missing provider setup-required/not-started
* admin UI does not fake provider success
* secrets not shown

---

## 61. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 07 implementation summary
* Prompt 07 verification result
* admin route list
* staff permission result
* moderation result
* audit result
* provider/secret result
* RLS result
* setup-required modules/providers
* migration files if any
* bugs/blockers
* commands run
* next prompt:

  * `prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`
* instruction not to proceed if Prompt 07 failed/blocked

---

## 62. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* public users denied admin
* public admin registration absent
* admin mobile OTP absent
* admin routes noindex
* admin pages private/no-store where needed
* Super Admin access correct
* Admin access scoped
* Staff access permission-scoped
* disabled/suspended staff denied
* staff cannot self-grant permissions
* permission-aware nav works
* direct URL permission bypass denied
* moderation queues safe
* approval/reject/request changes permission-protected
* provider secrets masked
* service role not client-exposed
* sensitive data protected
* private docs protected
* hidden contact not leaked to unauthorized staff
* audit logs safe or honestly partial with no fake logs
* maker-checker foundation safe or honestly partial
* no fake approval/verification/payment/provider/audit data
* RLS enabled/tested or honestly setup-required with no unsafe claim
* responsive checks completed
* docs updated
* no blocking bugs

### PARTIAL

Use `PARTIAL` if:

* admin shell and guards work but some modules are placeholders
* staff invite email provider setup-required
* billing/provider/support/CMS modules setup-required
* maker-checker foundation partial
* audit logs partial
* RLS runtime tests unavailable but policies/migration reviewed
* responsive/browser checks incomplete
* non-critical filters/export/bulk actions deferred
* no fake functionality appears

Prompt 08 can start only if user/Super Admin accepts partial and no critical admin/security/privacy issue exists.

### FAIL

Use `FAIL` if:

* build fails
* public user can access admin
* public admin registration exists
* admin mobile OTP exists
* provider secret exposed
* service role client exposure
* staff self-grant possible
* disabled staff access possible
* staff permission bypass exists
* approval action works without permission
* private docs leak
* hidden contact leaks to unauthorized staff
* fake approval/verification/payment/provider/audit appears
* admin page publicly cached/indexable with private data
* RLS missing on private admin tables
* DB changes missing migration

Do not start Prompt 08.

### BLOCKED

Use `BLOCKED` if:

* Prompt 02 admin auth foundation failed
* auth/session unavailable blocks admin verification
* Supabase/RLS unavailable blocks secure admin verification
* cannot inspect required files
* package/build baseline broken
* architecture conflict needs owner decision
* required Prompt 07 files missing

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* admin auth provider missing
* email provider missing for staff invites
* Supabase env missing
* payment/Razorpay missing
* media/R2 missing
* notification provider missing
* support provider missing
* monitoring/analytics missing

Setup-required is acceptable only when UI is honest and does not fake functionality.

---

## 63. Prompt 08 Readiness Checklist

Prompt 08 can start only if:

* Prompt 07 implementation completed
* Prompt 07 verification completed
* no critical admin access bug open
* no public admin access
* no public admin registration
* no mobile OTP admin login
* no provider secret leak
* no service role client exposure
* no staff permission bypass
* no unauthorized approval action
* no private doc/hidden contact leak
* no fake admin/payment/provider/verification data
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`

If Prompt 08 file is missing, stop and ask/generate it.

---

## 64. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 07 Verification — Admin, Staff And Super Admin System

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Routes Checked:
- /admin/login:
- /admin:
- /admin/dashboard:
- /admin/users:
- /admin/staff:
- /admin/moderation:
- /admin/verification:
- /admin/support:
- /admin/reports:
- /admin/billing:
- /admin/providers:
- /admin/settings:
- /admin/audit:

Access Checks:
- Guest:
- Owner:
- Broker:
- Builder:
- Staff:
- Admin:
- Super Admin:
- Disabled staff:

Admin Auth Checks:
- separate login:
- no public registration:
- no mobile OTP:
- noindex:
- private cache:

Permission Checks:
- permission-aware nav:
- staff self-grant:
- provider/settings access:
- audit access:
- sensitive data:
- export/bulk:

Moderation Checks:
- property:
- project:
- requirement:
- approve:
- reject:
- request changes:
- audit:

Security Checks:
- provider secrets:
- service role:
- hidden contact:
- private docs:
- fake admin data:
- fake approval:
- fake verification:
- fake payment/refund:
- fake provider active:
- fake audit:

Database/RLS Checks:
- migrations:
- tables:
- indexes:
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
- Admin/Staff/Super Admin system is secure and ready for Prompt 08.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 08:
- Yes/No

Next Step:
- prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md or fix blockers first.
```

---

## 65. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 07 Admin/Staff/Super Admin verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Routes checked:
- admin login:
- admin dashboard:
- users:
- staff:
- moderation:
- verification/support/reports:
- billing/providers/settings:
- audit/system:

Access:
- guest:
- owner:
- broker:
- builder:
- staff:
- admin:
- super admin:
- disabled staff:
- direct URL bypass:

Auth/separation:
- public admin registration:
- admin mobile OTP:
- public admin links:
- noindex:
- private cache:

Permissions:
- permission-aware nav:
- staff self-grant:
- module permissions:
- sensitive permissions:
- export/bulk:
- maker-checker:

Moderation:
- property:
- project:
- requirement:
- approval/reject/change actions:
- audit logs:

Security/privacy:
- provider secrets:
- service role:
- hidden contact:
- private docs:
- sensitive data:
- fake admin data:
- fake payment/provider/verification/audit:

Database/RLS:
- migrations:
- tables:
- indexes:
- RLS policies:
- RLS test result:

Responsive:
- widths tested:
- admin mobile nav:
- tables/cards:
- horizontal scroll:

Provider/setup-required:
- admin auth:
- staff invite email:
- billing/payment:
- media/R2:
- notifications:
- support:
- monitoring/analytics:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 08:
- Yes/No
- reason

Next step:
- prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
```

Do not write vague “verified”.

---

## 66. If Verification Fails

If verification fails:

1. do not start Prompt 08
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

Critical admin/security/privacy failures block progress.

---

## 67. If Verification Is Partial

If verification is partial:

* document exact partial items
* list setup-required providers
* list placeholder modules
* list untested runtime checks
* list responsive/browser gaps
* list audit/maker-checker gaps
* confirm no public admin access
* confirm no public admin registration
* confirm no mobile OTP admin login
* confirm no secret exposure
* confirm no permission bypass
* confirm no private doc/hidden contact leak
* confirm no fake admin/payment/provider/verification data
* update docs
* ask/require owner acceptance before Prompt 08 if risk is significant

Acceptable partial examples:

* staff invite email setup-required
* billing/payment admin placeholder only
* provider health checks placeholder only
* support/report modules placeholder only
* audit foundation partial but no fake audit
* maker-checker foundation partial but high-risk actions disabled
* some browser checks not done

Not acceptable partial without fix:

* public admin access
* public admin registration
* mobile OTP admin login
* provider secret leak
* staff self-grant
* approval without permission
* private doc leak
* hidden contact leak
* fake payment/provider/verification
* build fail

---

## 68. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `DEPLOYMENT_ROLLBACK.md`
* update `API_PROVIDER_STATUS.md` if relevant
* update `brain.md`
* final response should say Prompt 08 can start

Do not start Prompt 08 automatically unless user asked to continue.

---

## 69. What Not To Do In This Verification

Do not:

* implement full lead/CRM system
* implement full billing/payment
* implement full media upload/R2
* implement full ads/promotions
* implement full notifications
* implement full CMS/blog/legal
* add fake staff users
* add fake provider status
* add fake payments/refunds
* add fake verification approval
* add fake audit logs
* bypass permission checks
* disable RLS
* expose provider secrets
* print secrets
* ignore admin public access
* ignore staff permission bypass
* ignore noindex/cache risk
* start Prompt 08 after FAIL/BLOCKED

---

## 70. Quality Bar

This verification is successful when future phases can trust that:

* admin access is private
* public users cannot access admin
* public admin registration does not exist
* admin mobile OTP does not exist
* Super Admin/Admin/Staff are separated
* staff permissions are server-enforced
* moderation actions are permission-protected
* provider secrets are masked
* sensitive data is protected
* audit logs are safe or honestly partial
* maker-checker is safe or honestly partial
* admin pages are noindex and privately cached
* RLS protects internal tables
* admin UI works on mobile
* docs reflect reality
* Prompt 08 can build leads/CRM safely using admin foundations

---

## 71. Final Rule For Prompt 07 Verification

Verify admin access honestly.

Verify staff permissions honestly.

Verify Super Admin/Admin/Staff separation honestly.

Verify moderation actions honestly.

Verify provider secrets honestly.

Verify audit logs honestly.

Verify maker-checker honestly.

Verify noindex/private cache honestly.

Verify RLS honestly.

Do not allow public admin access.

Do not allow public admin registration.

Do not allow admin mobile OTP.

Do not allow staff self-grant.

Do not allow approval without permission.

Do not expose provider secrets.

Do not expose service role.

Do not expose private docs.

Do not leak hidden contact to unauthorized staff.

Do not fake approval.

Do not fake verification.

Do not fake payment/refund.

Do not fake provider active status.

Do not fake audit logs.

Do not mark PASS without security and responsive checks.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
