# prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md

# My Gujarat Property — Prompt 07: Admin, Staff And Super Admin System

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 11–15 (all admin)**, `design-prompts/DESIGN_ADDONS_MASTER.md`, deltas `report-batch-11..15.md`, and `docs/08` "Design Add-Ons". Locked: graphite admin shell, no bottom nav; uniform Approve/Request-Changes/Reject + reason + "will be logged"; per-viewer watermarked docs; maker-checker self-approval disabled; append-only audit w/ masked IP.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md
```

This phase implements the internal management foundation for:

* Super Admin
* Admin
* Staff
* Staff roles
* Staff permissions
* Admin/staff invite-only access
* Moderation queues
* User management
* Property/project/requirement approval
* Verification review foundation
* Support/report/fraud review foundation
* Billing/provider/settings placeholders
* Audit logs
* Sensitive data access controls
* Maker-checker foundation
* System health placeholders
* Admin-safe UI

This phase must keep admin/staff completely separate from public users.

Do not create public admin registration.

Do not allow mobile OTP admin login.

Do not expose provider secrets.

Do not disable RLS.

Do not fake admin actions.

Do not fake verification.

Do not fake payment/refund.

Do not fake provider status.

Do not fake audit logs.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
Prompt Number: 07
Phase: Admin, Staff And Super Admin System
Type: Implementation Prompt
Matching Verification Prompt: prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
Previous Verification Prompt: prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md
```

---

## 2. Phase Purpose

The purpose of this phase is to implement the secure internal admin foundation for platform operations.

This phase should implement:

* separate admin/staff internal shell
* protected admin routes
* noindex admin routes
* Super Admin access
* Admin access
* Staff access
* staff role and permission model
* staff invite foundation
* staff status controls
* moderation queue foundation
* property approval/rejection/need-changes actions
* project approval/rejection/need-changes actions
* requirement approval/rejection/need-changes actions
* user management foundation
* user suspension/ban/restore foundation
* verification review foundation
* support ticket/report/fraud review placeholders
* billing/payment admin placeholders
* provider/settings placeholders
* audit log foundation
* maker-checker foundation for high-risk actions
* internal notes/timeline foundation
* private document/sensitive data permission controls
* responsive internal UI
* docs updates
* checks/tests
* handoff to manual verification prompt

This phase makes the operational backend safe and ready for later modules.

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

Also inspect existing admin/staff/auth/RLS/entity code before editing.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
src/app/admin/
app/admin/
src/app/admin/login/
app/admin/login/
src/app/admin/dashboard/
app/admin/dashboard/
src/app/admin/users/
app/admin/users/
src/app/admin/properties/
app/admin/properties/
src/app/admin/projects/
app/admin/projects/
src/app/admin/requirements/
app/admin/requirements/
src/app/admin/staff/
app/admin/staff/
src/app/admin/verification/
app/admin/verification/
src/app/admin/support/
app/admin/support/
src/app/admin/reports/
app/admin/reports/
src/app/admin/billing/
app/admin/billing/
src/app/admin/providers/
app/admin/providers/
src/app/admin/settings/
app/admin/settings/
src/app/admin/audit/
app/admin/audit/
src/components/admin/
components/admin/
src/components/layout/AdminShell.*
components/layout/AdminShell.*
src/lib/admin/
lib/admin/
src/lib/auth/
lib/auth/
src/lib/permissions/
lib/permissions/
src/lib/actions/admin*
lib/actions/admin*
src/lib/supabase/
lib/supabase/
src/types/admin.*
types/admin.*
supabase/migrations/
```

Search for existing:

* admin login
* staff tables
* staff profiles
* staff permissions
* staff invites
* admin shell
* moderation queue
* approval actions
* audit logs
* provider settings
* sensitive data controls
* public admin link
* public admin registration
* mobile OTP admin login
* service role in client
* fake admin data
* fake staff users
* fake provider active status
* fake verification/payment actions
* RLS bypass

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement:

### 5.1 Admin Auth And Shell

* admin/staff login route
* protected admin shell
* noindex metadata
* separate internal layout
* staff profile loading
* permission-aware nav
* logout
* internal unauthorized/setup-required states
* admin mobile responsive UI

### 5.2 Internal Roles

* Super Admin
* Admin
* Staff
* staff functional roles
* staff statuses
* permission checks

### 5.3 Staff Management Foundation

* staff list
* invite staff foundation
* disable/enable staff foundation
* staff role assignment
* staff permission assignment
* staff detail page/drawer
* no public self-registration
* email/provider setup-required if invite email missing

### 5.4 Moderation System

* property moderation queue
* project moderation queue
* requirement moderation queue
* approve
* reject
* request changes
* internal notes
* public preview
* audit events
* RLS-safe updates

### 5.5 User Management Foundation

* user list
* user detail
* status change foundation
* suspend/ban/restore foundation
* role/profile view
* safe sensitive data controls
* no hidden contact leak beyond authorized internal view

### 5.6 Verification / Support / Reports / Fraud Foundation

* verification queue placeholder/foundation
* support ticket placeholder/foundation
* report/fraud queue placeholder/foundation
* sensitive docs permission placeholder
* actions setup-required if module not implemented

### 5.7 Billing / Provider / Settings Placeholders

* billing/payment admin placeholder
* plan/coupon/trial placeholder
* provider settings placeholder
* feature flags placeholder
* system health placeholder
* no fake provider active
* no fake payment/refund

### 5.8 Audit / Maker-Checker

* admin audit log foundation
* high-risk action approval foundation
* immutable/tamper-resistant audit policy foundation
* internal timeline

### 5.9 Docs Updates

Update all memory docs.

---

## 6. Out Of Scope For This Phase

Do not fully implement:

* public user dashboards
* public search/detail
* full lead/CRM module
* full messaging
* full billing/Razorpay settlement/refunds
* full media upload/R2/CDN processing
* full ads/promotions lifecycle
* full notification delivery
* full CMS/blog editor
* full legal/grievance workflow
* full support ticket system
* full verification document upload/review workflow
* full provider secret manager
* full system monitoring/observability
* full analytics dashboards

This phase can create safe placeholders/foundations for these modules.

---

## 7. Hard Admin Separation Rules

Claude must enforce:

```txt id="hard-admin-separation-rules"
Public users cannot access admin routes.
Owner/Broker/Builder cannot become staff/admin from public UI.
Admin/staff cannot register from public frontend.
Admin/staff login is separate.
Admin/staff login is not mobile OTP.
Admin/staff routes are noindex.
Admin/staff links are hidden from public UI.
Admin/staff permissions are server-side.
```

Forbidden:

* public admin register route
* admin mobile OTP login
* admin link in public header/footer
* public dashboard admin link
* public user role escalation to admin
* staff self-grant permission
* client-only admin protection
* exposed provider secrets
* fake staff users
* fake Super Admin

---

## 8. Internal User Types

Internal roles:

```txt id="internal-user-types"
super_admin
admin
staff
```

Functional staff roles:

```txt id="functional-staff-roles"
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

Staff statuses:

```txt id="staff-statuses"
invited
active
disabled
suspended
deleted
```

Rules:

* Super Admin can manage everything.
* Admin can manage operations but not sensitive provider/security/system actions unless explicitly permitted.
* Staff can only access modules assigned.
* Staff cannot self-grant permissions.
* Disabled/suspended staff cannot access admin.
* Deleted staff remains audit-retained, not normal hard delete.

---

## 9. Permission Model Requirements

Use a granular permission model.

Permission dimensions:

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

Permission modules:

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

Rules:

* permission checks must be server-side
* UI hiding is not enough
* high-risk modules require explicit permission
* provider/security/system actions should be Super Admin only unless explicitly granted
* export/sensitive/private-doc access requires explicit permission
* public users have no internal permissions

---

## 10. Suggested Database Tables

Use existing tables if present.

Possible tables for this phase:

```txt id="suggested-admin-tables"
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

If Prompt 02 already created staff tables, extend safely and do not duplicate.

If Prompt 04 created moderation/status tables, reuse safely.

---

## 11. Staff Profiles Fields

Suggested `staff_profiles` fields:

* `id`
* `auth_user_id`
* `email`
* `full_name`
* `internal_role`
* `functional_role`
* `staff_status`
* `last_login_at`
* `created_by_staff_id`
* `disabled_by_staff_id`
* `disabled_reason`
* `created_at`
* `updated_at`
* `disabled_at`
* `deleted_at`

Rules:

* staff email unique
* no public read
* staff reads own safe profile
* staff list permission-scoped
* disabled staff denied
* all status changes audited

---

## 12. Staff Permissions Fields

Suggested `staff_permissions` fields:

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
* `can_manage_provider`
* `can_manage_security`
* `can_manage_payment`
* `can_manage_staff`
* `can_manage_feature_flags`
* `can_manage_system`
* `created_by_staff_id`
* `created_at`
* `updated_at`

Rules:

* staff cannot edit own permissions
* Admin cannot grant permissions higher than own scope
* Super Admin can manage all
* permission changes audited

---

## 13. Staff Invite Fields

Suggested `staff_invites` fields:

* `id`
* `email`
* `internal_role`
* `functional_role`
* `permission_template`
* `invite_token_hash`
* `status`
* `invited_by_staff_id`
* `accepted_by_staff_id`
* `expires_at`
* `accepted_at`
* `revoked_at`
* `created_at`
* `updated_at`

Rules:

* token hashed
* invite link not public-listable
* expired/revoked invite denied
* invite email provider setup-required if email not configured
* no fake invite sent
* audit all invite actions

---

## 14. Admin Audit Logs Fields

Suggested `admin_audit_logs` fields:

* `id`
* `actor_staff_profile_id`
* `actor_internal_role`
* `action`
* `module`
* `target_type`
* `target_id`
* `target_profile_id`
* `before_snapshot_safe`
* `after_snapshot_safe`
* `metadata_safe`
* `ip_hash`
* `user_agent_hash`
* `request_id`
* `created_at`

Rules:

* append-only/tamper-resistant as much as possible
* no OTP/secrets/provider tokens
* no private docs in raw form
* sensitive fields redacted/masked
* audit logs not deletable by normal admin
* Super Admin-only or audit_manager read access
* export requires explicit permission

---

## 15. Maker-Checker Foundation

High-risk actions should support maker-checker or be prepared for it.

High-risk actions include:

* staff permission changes
* provider settings changes
* payment refund
* manual subscription activation
* user ban
* hard delete
* bulk actions
* private document export
* provider secret rotation
* feature flag production change
* maintenance mode
* security setting change

Suggested tables:

```txt id="maker-checker-tables"
admin_action_requests
admin_action_approvals
```

Suggested statuses:

```txt id="maker-checker-statuses"
draft
pending_approval
approved
rejected
cancelled
executed
expired
```

Rules:

* requester and approver should not be same for critical actions
* Super Admin override may be allowed but audited
* full workflow can be partial if documented
* do not fake approval

---

## 16. Admin Shell Requirements

Admin shell must include:

* internal logo/brand
* noindex metadata
* internal sidebar
* permission-aware navigation
* admin topbar
* staff profile menu
* logout
* environment/status indicator if available
* setup-required provider notices for internal users
* audit-safe breadcrumbs
* loading state
* unauthorized state
* forbidden state
* setup-required state
* responsive drawer/mobile nav
* no public footer
* no public homepage links except safe “View site” link if needed

Admin shell must not show:

* public login/register
* mobile OTP login
* public user nav
* provider secrets
* fake metrics
* fake alerts
* hidden contact to unauthorized staff

---

## 17. Admin Route Structure

Use existing conventions.

Possible routes:

```txt id="admin-routes"
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

Not all modules need full implementation in this phase.

Visible routes must be implemented, safe placeholder, disabled, or hidden by permission.

No dead admin nav.

No `href="#"`.

---

## 18. Admin Login Requirements

Admin login must be separate.

Rules:

* route: `/admin/login` or equivalent
* no public mobile OTP
* no public create account
* email/password or OAuth if configured
* setup-required if provider missing
* noindex
* rate limiting placeholder/foundation
* login attempt tracking placeholder/foundation
* safe error messages
* disabled/suspended staff denied
* public Owner/Broker/Builder denied

If admin auth provider missing:

* show `ADMIN_AUTH_SETUP_REQUIRED`
* update `API_PROVIDER_STATUS.md`
* do not fake login

---

## 19. Admin Dashboard Overview

Admin dashboard overview may show:

* real moderation queue counts
* real user count if safe/limited
* real pending property/project/requirement count
* setup-required provider summary
* system health placeholder
* recent audit events if real
* support/report placeholders
* security alerts placeholder only if real/setup

Do not show fake:

* revenue
* payments
* leads
* growth charts
* active users
* provider uptime
* security alerts
* audit events

If data not implemented, show `NO_DATA`, `SETUP_REQUIRED`, `NOT_STARTED` or `COMING_SOON`.

---

## 20. Moderation Queue Requirements

Implement moderation queues for:

* properties
* projects
* requirements

Queue should show:

* title/name
* entity type
* submitted by safe user/profile
* submitted date
* city/location safe label
* approval status
* current status
* quick preview
* actions allowed by permission
* internal notes count if real
* no hidden contact unless staff has sensitive permission

Actions:

* approve
* reject with reason
* request changes with reason
* assign reviewer if implemented
* add internal note
* view public-safe preview
* view private details only with permission

Rules:

* normal public users cannot approve
* entity owner cannot self-approve
* staff permission required
* action audited
* status updated correctly
* public page updates only after approval/publish
* rejection/need-change reason visible to owner in safe dashboard later
* no fake approval

---

## 21. Property Moderation Rules

For properties:

* approve only submitted/under_review/need_changes resubmitted states
* reject requires reason
* request changes requires reason
* approval sets appropriate approved/published status based workflow
* rejected not public
* pending not public
* paused stays non-public/unavailable
* hidden contact stays hidden
* public-safe view updates only after publish/approval

Staff needs `properties.approve` or equivalent.

---

## 22. Project Moderation Rules

For projects:

* builder owns project
* project type cannot be PG/hostel/room
* RERA data reviewed only if present and within verification capability
* no fake RERA approval
* approve/reject/request changes require permission
* approval does not mean legal guarantee
* promotion/ads RERA gate later
* public-safe project view excludes private proof docs

Staff needs `projects.approve` or equivalent.

---

## 23. Requirement Moderation Rules

For requirements:

* owner/broker created requirements
* hidden contact protected
* budget/location/preferences safe
* public/scoped visibility respected
* approve/reject/request changes require permission
* matching/leads later
* no buyer/renter private contact leak

Staff needs `requirements.approve` or equivalent.

---

## 24. User Management Requirements

User management foundation may include:

* list users
* filter by role/status
* search by safe fields
* user detail
* account status
* public role
* verification status
* entity counts real only
* suspend/ban/restore foundation
* role change requests placeholder/foundation
* internal notes
* audit timeline
* sensitive fields masked unless permission
* no public password/OTP/secrets

Actions:

* suspend user
* ban user
* restore user
* add internal note
* view user entities
* view verification state
* role change review placeholder

Rules:

* high-risk actions audited
* user cannot be hard deleted normally
* hard delete only Super Admin/retention later
* private documents access requires explicit permission
* hidden contact access requires sensitive permission

---

## 25. Staff Management Requirements

Staff management foundation may include:

* list staff
* invite staff
* view staff detail
* update functional role
* update permissions
* disable staff
* enable staff
* revoke invite
* audit staff actions

Rules:

* Super Admin can manage all
* Admin can manage staff only if permission
* staff cannot manage own permission
* staff cannot disable Super Admin
* disabled/suspended staff denied
* no public registration
* invite email setup-required if provider missing
* no fake invite sent

---

## 26. Verification Review Foundation

Verification workflow may be placeholder/foundation.

Admin verification module may show:

* pending broker verification
* pending builder verification
* pending RERA verification
* user verification status
* document upload setup-required if media not ready
* review action placeholder

Rules:

* no fake verification approval
* no fake badge
* no public private docs
* sensitive docs only with permission
* verification is not legal guarantee
* status updates audited
* full workflow may be completed later if safe

---

## 27. Support Module Foundation

Support module may show:

* support tickets if table exists
* setup-required if ticket system missing
* support categories placeholder
* assign/escalate placeholder
* internal reply placeholder

Rules:

* no fake tickets
* no fake replies
* no fake SLA
* support attachments private
* sensitive access permission required
* actions audited

Full support system may be later.

---

## 28. Reports / Fraud Module Foundation

Reports/fraud module may show:

* reported listing/project/profile queue if table exists
* setup-required placeholder if missing
* categories:

  * spam
  * fraud
  * wrong info
  * duplicate
  * illegal content
  * contact abuse
  * payment abuse
  * harassment
* action placeholders:

  * review
  * dismiss
  * escalate
  * suspend
  * hide entity

Rules:

* no fake reports
* sensitive user data protected
* action audited
* high-risk actions maker-checker where needed

---

## 29. Billing / Payment Admin Placeholder

Full billing is Prompt 09.

Admin billing area may include:

* billing module placeholder
* payment module placeholder
* plan/coupon/trial placeholder
* refund action setup-required
* reconciliation setup-required

Rules:

* no fake payments
* no fake invoices
* no fake refunds
* no fake revenue
* no fake active subscriptions
* no Razorpay success without verified webhook
* provider status honest
* sensitive payment actions require permission/maker-checker

---

## 30. Provider Settings Placeholder

Provider/settings area may include:

* provider status list
* setup-required states
* masked env names
* health check placeholder
* no raw secrets
* Super Admin-only access
* provider config docs link

Rules:

* never display secret values
* never allow staff without permission
* never mark active without test
* provider changes audited
* high-risk provider actions maker-checker
* no public access

Providers may include:

* Supabase
* OTP/SMS
* Email
* WhatsApp
* Razorpay
* Cloudflare R2/CDN
* Google Maps
* Turnstile
* Analytics
* Error tracking
* Cron/jobs
* Push notifications

---

## 31. Feature Flags / Settings Placeholder

Feature flags/settings may include:

* feature status list
* maintenance mode placeholder
* module enable/disable placeholder
* provider mode placeholder

Rules:

* Super Admin only unless permission
* production changes audited
* high-risk changes maker-checker
* no fake enabled status
* no broken public UI after flag change

Full implementation can be later.

---

## 32. CMS / Blog / Legal / SEO / Location Placeholders

Admin may include placeholder modules for:

* CMS
* blog
* legal pages
* SEO settings
* redirect manager
* locations
* missing location requests

Rules:

* no fake published content
* no fake legal approval
* no fake sitemap status
* no mass SEO pages
* no unapproved location data as real
* module may be disabled/coming later

Full implementation in later prompt.

---

## 33. Audit Log Requirements

Audit logs should capture internal actions:

* staff login
* staff logout if available
* access denied
* staff invite
* staff permission change
* user suspend/ban/restore
* property approve/reject/need changes
* project approve/reject/need changes
* requirement approve/reject/need changes
* verification status change
* provider/settings access attempt
* billing/payment placeholder action attempt
* export action
* sensitive data view
* feature flag change
* support/report action

Audit log must not store:

* secrets
* OTP
* provider tokens
* full private docs
* raw passwords
* unredacted payment sensitive data
* hidden contact unless necessary and masked

---

## 34. Internal Notes / Timeline

Admin detail pages may include internal notes/timeline.

Rules:

* internal notes private
* permission required
* user/public cannot see internal notes
* notes audited
* no secrets in notes
* no abusive/unprofessional notes
* no fake notes
* note deletion restricted or not allowed; soft-hide if needed

---

## 35. Sensitive Data Rules

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

Rules:

* default mask
* view sensitive permission required
* view action audited
* exports require explicit export permission
* no sensitive data in public UI
* no sensitive data in client logs
* no sensitive data in raw errors

---

## 36. Export Rules

Export foundation may be placeholder.

If implemented:

* export permission required
* sensitive export permission separate
* export audited
* row limit/pagination
* no provider secrets
* no private docs unless explicitly allowed
* file storage private
* expiration if downloadable
* Super Admin or export_manager only

If not implemented:

* show setup-required/coming-soon
* no fake export success

---

## 37. Bulk Action Rules

Bulk actions may be placeholder.

If implemented:

* permission required
* confirmation required
* high-risk bulk actions maker-checker
* action audited per batch
* dry-run/summary recommended
* no bulk hard delete
* no unreviewed mass publish
* rate/limit batch size

If not implemented:

* hidden or disabled with reason

---

## 38. Admin Search / Filters

Admin tables should support safe search/filter where implemented.

Filters:

* status
* role
* entity type
* approval status
* city
* assigned staff
* date
* provider status
* verification status
* report category

Rules:

* no unbounded reads
* pagination required
* no unsafe raw SQL
* no broad sensitive export through search
* filters must be real or disabled

---

## 39. Admin Table / Detail UI

Admin UI should include:

* table/list pages
* detail drawer/page
* filters
* search
* pagination
* status badges
* action buttons
* internal notes
* audit timeline
* public preview
* safe empty state
* loading/error states
* permission-disabled actions

On mobile:

* tables become cards
* filters become drawer
* actions accessible
* no horizontal scroll

---

## 40. Public Preview Rules

Admin can preview public-safe entity page.

Rules:

* preview uses public-safe data by default
* private/internal data clearly separated
* hidden contact not visible in public preview unless staff chooses sensitive view with permission
* preview of draft/unpublished must be internal-only/noindex
* public preview cannot publish by itself

---

## 41. Approval Action Requirements

Approval actions must:

* require staff auth
* require permission
* validate target entity
* validate status transition
* require reason for rejection/need changes
* record actor
* update entity status
* update approval status
* update timestamps
* update public visibility if approved/published
* create audit log
* return safe result
* not expose secrets/private docs

Actions:

```txt id="approval-actions"
approve_property
reject_property
request_property_changes
approve_project
reject_project
request_project_changes
approve_requirement
reject_requirement
request_requirement_changes
```

---

## 42. User Status Action Requirements

User actions must:

* require staff auth
* require permission
* validate target user
* prevent unsafe Super Admin lockout
* require reason for suspension/ban
* audit action
* optionally use maker-checker for ban/hard delete
* not expose private info to unauthorized staff

Actions:

```txt id="user-status-actions"
suspend_user
ban_user
restore_user
add_user_internal_note
review_role_change_request
```

---

## 43. Staff Action Requirements

Staff actions must:

* require Super Admin or manage_staff permission
* prevent self-permission escalation
* prevent disabling only Super Admin
* require reason for disable/suspend
* audit action
* maker-checker for high-risk permission changes if implemented

Actions:

```txt id="staff-actions"
invite_staff
revoke_staff_invite
update_staff_role
update_staff_permissions
disable_staff
enable_staff
view_staff_audit
```

---

## 44. RLS / Security Requirements

For all admin/staff tables:

* RLS enabled
* public denied
* public users denied
* staff access permission-scoped
* Super Admin access allowed
* sensitive data masked/permission-scoped
* private docs not public
* audit logs protected
* service role only server-side
* provider secrets never client-side
* direct URL bypass denied
* admin routes noindex

Do not disable RLS.

---

## 45. Direct URL Bypass Requirements

Direct URL tests must be possible for:

```txt id="direct-url-tests"
guest → /admin
owner → /admin
broker → /admin
builder → /admin
staff without permission → /admin/providers
staff without permission → /admin/staff
staff without permission → /admin/billing
staff without permission → /admin/audit
disabled staff → /admin
admin without sensitive permission → private documents
staff without approve permission → moderation approve action
```

Expected:

* denied/redirected
* private data not rendered before redirect
* safe forbidden message
* audited access denial where possible

---

## 46. Admin Noindex Rules

Admin/internal routes must be noindex.

Verify or implement:

* metadata robots noindex/nofollow where appropriate
* auth/admin pages excluded from sitemap
* robots disallow where appropriate
* no public links to admin
* no private/admin metadata in public schema

Noindex is not security; route guard still required.

---

## 47. Private Cache Rules

Admin pages are private.

Must not:

* statically generate private admin data
* publicly cache admin pages
* cache sensitive staff/provider/audit data
* share cached data between staff users
* include admin URLs in public sitemap

Use no-store or equivalent for admin/private pages where applicable.

---

## 48. Error Handling Rules

Admin errors must be safe.

Use safe errors:

```txt id="safe-admin-errors"
ADMIN_AUTH_REQUIRED
STAFF_NOT_FOUND
STAFF_DISABLED
PERMISSION_DENIED
FORBIDDEN
ENTITY_NOT_FOUND
INVALID_STATUS_TRANSITION
REASON_REQUIRED
SENSITIVE_PERMISSION_REQUIRED
SETUP_REQUIRED
PROVIDER_SETUP_REQUIRED
ACTION_REQUIRES_APPROVAL
UNKNOWN_ERROR
```

Do not show:

* SQL errors
* stack traces
* provider secrets
* service role errors
* OTP
* raw payment/provider payloads
* private docs
* hidden contact to unauthorized staff

---

## 49. Admin UI States Required

Every admin page/module must have:

* loading
* empty
* error
* forbidden
* unauthorized
* setup-required
* permission-disabled
* no-data
* confirmation
* success
* audit/log note where relevant

No blank pages.

---

## 50. Responsive Admin UI Requirements

Check at least:

```txt id="responsive-widths"
320px
360px
390px
430px
768px
1024px
1366px
```

Admin UI must have:

* no horizontal scroll
* sidebar collapses/drawer
* admin tables become cards on mobile
* filters usable on mobile
* action menus usable
* permission-disabled states visible
* modals fit screen
* long notes/details readable
* sensitive data reveal controls usable
* destructive confirmations readable

---

## 51. Accessibility Requirements

Admin UI must have:

* semantic headings
* nav labels
* table/card labels
* button text
* aria labels for icons
* focus visible
* keyboard navigation
* status badges not color-only
* confirmation dialogs accessible
* form labels
* error text readable
* large mobile tap targets

---

## 52. Performance Requirements

Admin implementation must:

* use pagination
* avoid unbounded reads
* avoid loading all users/entities
* avoid N+1 queries
* avoid heavy dashboards with fake charts
* avoid loading provider SDKs unnecessarily
* use indexes for admin filters
* keep admin logs paginated
* rate/limit exports
* no expensive count queries without need

---

## 53. SQL Migration Rule

If DB changes are needed, create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_admin_staff_super_admin_system.sql
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

No DB change without migration.

---

## 54. Suggested Indexes

Add/verify indexes for:

### Staff

* `staff_profiles.auth_user_id`
* `staff_profiles.email`
* `staff_profiles.internal_role`
* `staff_profiles.functional_role`
* `staff_profiles.staff_status`

### Permissions

* `staff_permissions.staff_profile_id`
* `staff_permissions.module`

### Invites

* `staff_invites.email`
* `staff_invites.status`
* `staff_invites.expires_at`

### Audit

* `admin_audit_logs.actor_staff_profile_id`
* `admin_audit_logs.module`
* `admin_audit_logs.action`
* `admin_audit_logs.target_type`
* `admin_audit_logs.target_id`
* `admin_audit_logs.created_at`

### Moderation

* entity status/approval indexes from Prompt 04
* submitted date
* city
* assigned reviewer if implemented

---

## 55. Tests / Checks To Run

Run available:

```txt id="checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

* admin route guard tests
* permission helper tests
* moderation action tests
* RLS tests
* audit log tests
* direct URL tests
* responsive smoke checks

If script missing, document `NOT_CONFIGURED`.

Do not claim tests passed if not run.

---

## 56. Manual Smoke Checks If App Runs

If app can run, check:

* guest denied `/admin`
* owner denied `/admin`
* broker denied `/admin`
* builder denied `/admin`
* staff login route separate
* no public register in admin
* no mobile OTP admin login
* staff without permission denied restricted modules
* Super Admin/Admin allowed permitted modules
* disabled staff denied
* moderation queue loads
* approve/reject/request changes works or safe placeholder
* audit logs created if actions run
* provider settings masked/setup-required
* no provider secrets shown
* no public footer in admin
* admin route noindex
* no fake metrics/actions
* mobile admin nav works

Record results.

Full verification in matching manual prompt.

---

## 57. API Provider Status Updates

Update `API_PROVIDER_STATUS.md` if relevant.

Potential statuses:

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

Do not mark provider active without real test.

---

## 58. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

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

Use accurate statuses.

---

## 59. Changelog Update

Update `CHANGELOG.md`.

Include:

* date
* Prompt 07
* summary
* changed files
* new admin routes
* migration files if any
* RLS/security changes
* provider status changes
* docs updated
* tests/checks run
* known issues
* rollback notes
* manual verification pending

---

## 60. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* public user can access admin
* public admin registration exists
* admin mobile OTP allowed
* staff can self-grant permission
* disabled staff access
* provider secret shown
* service role client exposure
* approval action without permission
* fake approval
* fake verification
* fake payment/refund
* fake provider active
* audit missing
* audit stores secrets
* private doc leak
* hidden contact leak to unauthorized staff
* admin page public cached
* admin route indexable
* dead admin nav
* missing migration
* RLS missing
* build failure

---

## 61. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 07 implementation status
* manual verification pending:

  * `prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`
* admin routes needing verification
* staff permission tests pending
* moderation tests pending
* provider/secret checks pending
* responsive checks pending
* setup-required providers
* known bugs

Do not mark manual verification PASS from implementation prompt alone.

---

## 62. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md`.

Include:

* admin route auth
* no public admin registration
* no mobile OTP admin login
* noindex admin routes
* staff permission checks
* direct URL admin denial
* provider secret masking
* service role server-only
* sensitive data permission controls
* private document protection
* audit log protection
* maker-checker high-risk action status
* admin private cache/no-store
* RLS for admin tables
* known issues

---

## 63. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md`.

Include:

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

---

## 64. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

Include:

* admin route changes
* admin component changes
* migration path if any
* RLS policy changes
* permission model changes
* rollback notes
* cache/session risk
* provider setup-required notes
* audit/maker-checker risk
* post-deploy admin smoke checks

If migration exists, rollback notes are mandatory.

---

## 65. Brain Update

Update `brain.md`.

Include:

* Prompt 07 implementation summary
* changed files
* admin routes
* permission model status
* moderation status
* audit status
* provider/secret status
* migration files if any
* bugs/blockers
* tests/checks run
* next prompt:

  * `prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`
* exact resume instruction

---

## 66. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
src/app/admin/login/page.tsx
src/app/admin/layout.tsx
src/app/admin/page.tsx
src/app/admin/dashboard/page.tsx
src/app/admin/users/page.tsx
src/app/admin/users/[id]/page.tsx
src/app/admin/staff/page.tsx
src/app/admin/staff/invites/page.tsx
src/app/admin/moderation/page.tsx
src/app/admin/moderation/properties/page.tsx
src/app/admin/moderation/projects/page.tsx
src/app/admin/moderation/requirements/page.tsx
src/app/admin/verification/page.tsx
src/app/admin/support/page.tsx
src/app/admin/reports/page.tsx
src/app/admin/fraud/page.tsx
src/app/admin/billing/page.tsx
src/app/admin/payments/page.tsx
src/app/admin/providers/page.tsx
src/app/admin/settings/page.tsx
src/app/admin/feature-flags/page.tsx
src/app/admin/audit/page.tsx
src/app/admin/system-health/page.tsx
src/components/admin/*
src/components/layout/AdminShell.tsx
src/components/layout/AdminSidebar.tsx
src/components/layout/AdminTopbar.tsx
src/lib/admin/*
src/lib/permissions/admin-permissions.ts
src/lib/actions/admin/*
src/types/admin.ts
supabase/migrations/*_admin_staff_super_admin_system.sql
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

## 67. Expected Output From This Phase

At the end of Prompt 07 implementation, project should have:

* protected admin shell
* separate admin login
* no public admin registration
* no mobile OTP admin login
* Super Admin/Admin/Staff foundation
* staff permission model
* permission-aware admin nav
* staff management foundation
* moderation queues
* entity approve/reject/request changes foundation
* user management foundation
* verification/support/report placeholders
* billing/provider/settings placeholders
* audit log foundation
* maker-checker foundation
* sensitive data permission controls
* private admin cache safety
* responsive admin UI
* docs updated
* checks run
* manual verification pending

---

## 68. Forbidden Outcomes

This phase must not leave:

* public admin access
* public admin registration
* admin mobile OTP login
* admin link in public UI
* staff self-grant permission
* disabled staff access
* provider secrets visible
* service role in client
* approval without permission
* fake approval
* fake verification
* fake payment/refund
* fake provider active
* fake audit logs
* private docs public
* hidden contact leak to unauthorized staff
* admin pages public cached
* admin pages indexable
* dead admin nav
* `href="#"`
* DB changes without migration
* RLS disabled/missing on admin tables
* docs outdated
* manual verification skipped

---

## 69. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* admin shell works but some modules are placeholders
* billing/provider/support/CMS modules setup-required
* maker-checker foundation partial
* audit foundation partial
* staff invite email provider setup-required
* RLS runtime tests pending
* responsive/browser checks pending
* non-critical admin filters/export deferred

### `FAIL`

Use if:

* build fails
* public user can access admin
* public admin registration exists
* admin mobile OTP allowed
* provider secret exposed
* service role client exposure
* staff can self-grant permission
* wrong staff permission grants access
* approval action without permission
* hidden contact/private docs leak
* admin page public cached/indexable
* DB changes missing migration
* RLS missing on admin private tables

### `BLOCKED`

Use if:

* Prompt 02 admin auth foundation failed
* auth/session unavailable blocks admin implementation
* Supabase/RLS unavailable blocks secure admin tables
* package/build baseline broken
* architecture conflict needs owner decision
* cannot inspect required files

### `SETUP_REQUIRED`

Use for:

* admin auth provider missing
* email provider missing for staff invites
* Supabase env missing
* payment/Razorpay missing
* media/R2 missing
* notification provider missing
* support provider missing
* monitoring/analytics missing

Setup-required is acceptable only if UI is honest and no fake functionality appears.

---

## 70. Final Response Required Format

Return final response in this structure:

```txt id="prompt-07-final-response-format"
Summary:
- what admin/staff/Super Admin foundation was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Admin routes:
- login:
- dashboard:
- users:
- staff:
- moderation:
- verification:
- support/reports:
- billing/providers/settings:
- audit/system:

Auth and access:
- public users:
- owner/broker/builder:
- staff:
- admin:
- super admin:
- disabled staff:
- noindex:

Permissions:
- modules:
- actions:
- sensitive permissions:
- maker-checker:

Moderation:
- properties:
- projects:
- requirements:
- approval/reject/change actions:

Security/privacy:
- provider secrets:
- service role:
- hidden contact:
- private docs:
- audit logs:
- private cache:

Placeholders/setup-required:
- billing:
- providers:
- support:
- reports/fraud:
- CMS/blog/legal/SEO/location:
- system health:

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
- permissions:
- cache/session:

Manual verification:
- pending prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md

Next step:
- run prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
```

Do not say only “done”.

---

## 71. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
```

Do not start Prompt 08 until Prompt 07 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 72. Common Bugs To Watch For

Create/track bugs for:

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

## 73. Quality Bar

This phase is successful when future phases can rely on:

* admin routes are private
* public users cannot access admin
* admin/staff login is separate
* staff access is permission-scoped
* Super Admin/Admin/Staff foundation exists
* moderation queues are safe
* entity approve/reject/request changes actions are permission-protected
* staff management foundation is safe
* sensitive data is protected
* provider secrets are masked
* audit logs exist or are honestly partial
* maker-checker foundation exists or is honestly partial
* admin UI is responsive
* no fake admin/payment/provider/verification data exists
* docs reflect reality
* manual verification is ready

---

## 74. Final Rule For Prompt 07

Implement admin/staff/Super Admin safely.

Keep admin separate from public users.

No public admin registration.

No mobile OTP admin login.

No public admin links.

Use server-side permission checks.

Use RLS.

Protect provider secrets.

Protect private documents.

Protect hidden contact.

Audit internal actions.

Use maker-checker for high-risk actions where implemented.

Show setup-required for missing providers/modules.

Do not fake approval.

Do not fake verification.

Do not fake payment/refund.

Do not fake provider status.

Do not fake audit logs.

Do not expose secrets.

Do not cache admin data publicly.

Do not index admin routes.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
