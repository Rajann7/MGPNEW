# docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md

# My Gujarat Property — Admin, Super Admin, Staff Modules, Permissions And Operations System

This document defines the complete **Super Admin, Admin and Staff operations system** for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — build to match)

> Source of truth: finished design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batches 11–15). Replicate 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`.

**Shell & global admin patterns**
* Admin shell = graphite/neutral palette, **desktop-primary, drawer on mobile, NO bottom nav**. Permission-scoped nav: unavailable modules shown disabled with a lock + tooltip; the overview also gates individual cards ("Requires Support Manager permission").
* Uniform action hierarchy on every queue: **Approve (brand) · Request Changes (warning) · Reject (danger)**; reason mandatory for reject/needs-changes; inline "This action will be logged."; confirmation dialog for destructive/gateway actions. Positive empty state = "All caught up"; every queue has error + Retry. Record IDs are linkable (#L-, #V-, #C-, #T-).

**Moderation & verification**
* Moderation detail includes a checklist (Property: Photos clear / Price reasonable / No contact info in description / Location pin matches / Not duplicate; Project adds a RERA Verify row that blocks approval until verified or exception-flagged; Requirement = lighter 2-point). Missing-Location approve mini-form feeds the Location hierarchy (doc 11).
* **Private docs (verification, claim) use a per-viewer watermarked viewer** (watermark = reviewing staff initials, e.g. "MGP ADMIN · KR"), **never downloadable**. Verification detail previews the resulting badge ("On approval: Verified").
* Duplicate/merge review = field-level keep selectors; "keeps older live, archives newer; logged + reversible 30 days".

**Users, staff, roles**
* User detail tabs (Listings / Leads / Reports / Payments / Activity Log); masked contact unless User-Manager permission. Suspend/ban requires reason + Temporary/Permanent + explicit side-effect copy ("listings hidden, leads paused, login possible but posting blocked"). Keep **staff "suspended"** status (active/invited/suspended). Staff invite has role-template presets + module permission checkboxes; permissions editor is a VIEW/EDIT/APPROVE matrix that can only restrict below Super Admin. Support ticket detail shows requester's plan inline + named macros.

**Ads / notifications / providers / system (Batch 13)**
* Ad review: creatives at all sizes + RERA-linkage check; structured radio reject-reason. Ad fraud "Mark as fraud" **excludes clicks from builder billing**; raw IDs kept in restricted audit log; UI shows PII-safe pattern summaries only.
* Provider grid shows honest Active / Setup Required / Error with graceful-degradation semantics per provider (WhatsApp "skipped, logged"; Maps "falls back to list + banner"; Email "sends paused and queued"), live error state w/ failure count. Secrets **write-only**; Test Connection names the test. **OTP and SMS share one provider card.** Notification template tokens use **camelCase `{{tokUserName}}`**; defaults changes apply to **new users only**; delivery has a distinct "Skipped — provider not set up" state.
* Feature-flag toggle previews the audit entry inline. Maintenance has a schedule-a-window sub-flow + a branded public maintenance page. Dead-letter dismiss requires confirm + audit note; raw traces only in Sentry.

**Audit / security / reports (Batch 15)**
* Audit log is visibly **append-only** (no edit/delete affordances, lock pill), detail shows before/after diff, **IP masked** (103.240.xx.xx). Security dashboard: named threat types (OTP flooding, credential stuffing) + auto-block outcomes. **Contact-reveal logs are permission-gated AND access is itself audit-logged**; abuse-pattern flag (e.g. 19 buyers/6 listings/2 days). **Maker-checker**: self-approval is hard-disabled in the UI (checker ≠ maker). Bulk actions preview affected records before confirm. Business metrics come from the DB directly with a separate "Setup Required" behavioral-analytics card ("Nothing is simulated"). Exports: type/date/format, 24h-expiry download, failure remediation ("Try 3 months max").

Claude must read this file before implementing admin login, staff login, Super Admin dashboard, admin/staff dashboards, staff permissions, moderation queues, user management, verification review, reports, support tickets, billing admin, payment admin, ads approval, provider settings, feature flags, CMS/legal/SEO admin, locations admin, audit logs, system health, security operations or admin RLS policies.

No public admin registration is allowed.

No staff permission bypass is allowed.

No sensitive provider secret leak is allowed.

No admin action can fake approval/payment/verification/provider status.

No normal staff can access modules without permission.

---

## 1. Purpose

This file defines:

* Super Admin scope
* Admin scope
* staff role system
* staff invite-only onboarding
* internal login rules
* internal route protection
* module permissions
* sensitive permissions
* private document permissions
* approval workflows
* moderation queues
* user management
* role change review
* property moderation
* project moderation
* requirement moderation
* verification review
* support ticket operations
* reports/fraud operations
* billing/subscription admin
* payment/refund/admin actions
* plan/trial/coupon management
* ads/promotions approval
* notification admin
* provider status/settings
* feature flags
* maintenance mode
* CMS/legal/blog/SEO admin
* location hierarchy admin
* audit logs
* security events
* exports
* bulk actions
* maker-checker
* admin dashboard UI
* admin mobile UX
* admin RLS/security
* manual verification rules

This file is the master internal operations reference.

---

## 2. Core Internal Admin Principles

The internal admin system must follow these principles:

1. Admin/staff login is separate from public login.
2. Public users cannot create admin/staff accounts.
3. Staff accounts are invite-only.
4. Admin/staff routes must be noindex.
5. Admin/staff routes must not be in sitemap.
6. Staff permissions must be granular.
7. Staff UI hiding is not enough.
8. Server actions/API routes must enforce permissions.
9. RLS or secure backend checks must protect internal data.
10. Sensitive actions must be audited.
11. High-risk actions need confirmation.
12. High-risk actions may require maker-checker.
13. Provider secrets must never be shown raw.
14. Payment actions must not bypass verified webhook rules.
15. Verification badges must be real.
16. RERA badges must be real.
17. Ads must not show unless approved/paid/active/not expired.
18. Private documents require explicit permission.
19. Exports require explicit permission.
20. Bulk actions require explicit permission.
21. Staff cannot bypass permissions through direct URL.
22. Admin tables must be paginated.
23. Admin UI must be mobile usable.
24. No fake operational status is allowed.
25. No critical admin action can be undocumented.

---

## 3. Internal User Types

Internal user types:

| Internal User   | Meaning                                     |
| --------------- | ------------------------------------------- |
| Super Admin     | highest platform owner/operator access      |
| Admin           | operational admin with assigned permissions |
| Staff           | scoped internal team member                 |
| Disabled Staff  | internal account disabled; no access        |
| Suspended Staff | internal account temporarily blocked        |
| Invited Staff   | invited but not accepted                    |
| Audit Reviewer  | staff/admin with audit permissions          |
| System Operator | staff/admin with safe system health access  |

Public marketplace roles are not internal roles.

Public roles:

* Owner
* Broker/Agent
* Builder/Developer

Public roles must not access internal admin panel.

---

## 4. Internal Login Rules

Admin/staff login must be separate.

Recommended route:

```txt id="admin-login-route"
/admin/login
```

Allowed login methods:

* email/password where configured
* Google login where configured
* magic link where configured and secure
* 2FA where implemented/setup-required

Not allowed:

* public mobile OTP login
* public registration
* public “create admin account”
* public role selector with admin/staff
* hidden admin creation through query param
* client-side role override

Admin/staff login must include:

* safe errors
* rate limiting
* session timeout
* noindex
* robots disallow
* suspicious login event tracking where implemented
* disabled/suspended account block
* audit/security event log
* separate internal dashboard redirect

---

## 5. Staff Invite-Only System

Staff creation flow:

1. Super Admin/Admin with permission creates invite.
2. Invite includes email, role and permission set.
3. Invite token generated securely.
4. Invite token stored hashed.
5. Invite expiry set.
6. Email sent if email provider configured.
7. If email provider missing, invite marked setup-required/manual.
8. Staff accepts invite.
9. Internal account created/linked.
10. Staff profile created.
11. Permissions assigned.
12. Invite marked accepted.
13. Audit log written.

Rules:

* invite token one-time use
* invite token hashed
* expired invite denied
* accepted invite cannot be reused
* staff cannot self-register
* public user cannot accept staff invite unless internal account flow validates email/invite
* staff role/permission assignment audited
* disabled staff cannot login
* invite resend audited

---

## 6. Super Admin Scope

Super Admin has full platform control.

Super Admin can manage:

* staff accounts
* staff permissions
* admins
* users
* roles
* properties
* projects
* requirements
* leads/CRM oversight
* verification
* reports/fraud
* support
* billing
* payments
* refunds/credit notes where implemented
* plans
* trials
* coupons
* invoices
* GST settings
* ads/promotions
* notifications
* provider settings
* provider status
* feature flags
* system settings
* maintenance mode
* CMS pages
* legal pages
* blog
* SEO
* redirects
* location hierarchy
* missing location requests
* audit logs
* security events
* exports
* reports
* system health
* deployment/rollback signoff

Super Admin must still follow:

* audit rules
* safe confirmation
* backup/rollback rules
* payment verification rules
* no secret leak rules
* no direct DB destructive action without approval/backup
* no fake provider/payment/verification status

---

## 7. Admin Scope

Admin is an internal operator with assigned permissions.

Admin may manage:

* users
* moderation queues
* verification
* support
* reports
* billing
* payments
* ads
* content
* SEO
* locations
* notifications
* provider status read-only
* system health read-only

Admin cannot by default:

* create Super Admin
* manage provider secrets
* manage feature flags
* change staff permissions
* change core security settings
* disable RLS
* hard delete sensitive data
* process refunds without permission
* manually activate payments without permission/audit
* access private docs without permission
* export sensitive data without permission
* override maker-checker where required

Admin permissions must be explicit.

---

## 8. Staff Role Types

Staff roles supported:

* Verification Manager
* Support Manager
* Content Manager
* SEO Manager
* Ads Manager
* Billing Manager
* Payment Manager
* City Manager
* User Manager
* Notification Manager
* System Manager
* Security Manager
* Reports Manager
* Audit Manager

Each staff role must have module-scoped permissions.

Staff role name alone is not enough.

Permission flags must decide actual access.

---

## 9. Permission Model

Permission dimensions:

| Permission                   | Meaning                                                            |
| ---------------------------- | ------------------------------------------------------------------ |
| `can_read`                   | view module data                                                   |
| `can_create`                 | create records                                                     |
| `can_update`                 | update records                                                     |
| `can_delete`                 | soft delete records                                                |
| `can_restore`                | restore soft-deleted records                                       |
| `can_hard_delete`            | hard delete after retention/legal approval                         |
| `can_approve`                | approve submissions                                                |
| `can_reject`                 | reject submissions                                                 |
| `can_request_changes`        | ask user to change submission                                      |
| `can_assign`                 | assign records to staff/agents                                     |
| `can_export`                 | export data                                                        |
| `can_bulk_action`            | perform bulk actions                                               |
| `can_view_sensitive`         | view sensitive private fields                                      |
| `can_view_private_documents` | view private docs                                                  |
| `can_manage_payments`        | payment management                                                 |
| `can_refund`                 | refund/credit note actions                                         |
| `can_manual_activate`        | manual payment/subscription activation                             |
| `can_manage_providers`       | provider settings/status                                           |
| `can_manage_feature_flags`   | feature flag management                                            |
| `can_manage_staff`           | staff account management                                           |
| `can_manage_permissions`     | permission management                                              |
| `can_view_audit_logs`        | audit log access                                                   |
| `can_manage_security`        | security/rate/fraud controls                                       |
| `can_publish`                | publish CMS/blog/legal/SEO                                         |
| `can_manage_legal`           | edit legal pages                                                   |
| `can_manage_seo`             | SEO/redirect/canonical controls                                    |
| `can_manage_system`          | system settings/maintenance                                        |
| `can_manage_location`        | location hierarchy management                                      |
| `can_impersonate`            | not recommended; only safe read-only support mode if ever approved |

Impersonation is not allowed by default.

If future support impersonation is added, it must be:

* read-only by default
* clearly bannered
* audited
* time-limited
* permission-gated
* no payment/provider/secret access
* user privacy compliant

---

## 10. Module Permission Matrix

## 10.1 User Management Module

| Permission         | Required For                |
| ------------------ | --------------------------- |
| can_read           | view user list/profile      |
| can_update         | edit safe user fields       |
| can_view_sensitive | view private email/mobile   |
| can_approve        | approve role change         |
| can_reject         | reject role change          |
| can_delete         | soft delete/deactivate user |
| can_restore        | restore user                |
| can_export         | export users                |
| can_bulk_action    | bulk user actions           |

High-risk:

* suspend user
* ban user
* change role
* delete user
* export user data
* view private contact
* view private documents

High-risk actions must be audited.

---

## 10.2 Property Moderation Module

| Permission          | Required For                            |
| ------------------- | --------------------------------------- |
| can_read            | view property queue                     |
| can_update          | edit moderation fields                  |
| can_approve         | approve property                        |
| can_reject          | reject property                         |
| can_request_changes | request user changes                    |
| can_view_sensitive  | view private contact/address            |
| can_delete          | soft delete/block property              |
| can_export          | export property data                    |
| can_bulk_action     | bulk approve/reject/pause where allowed |

---

## 10.3 Project Moderation Module

| Permission                 | Required For                |
| -------------------------- | --------------------------- |
| can_read                   | view project queue          |
| can_update                 | edit moderation fields      |
| can_approve                | approve project             |
| can_reject                 | reject project              |
| can_request_changes        | request changes             |
| can_view_sensitive         | view private builder fields |
| can_view_private_documents | view RERA/proof docs        |
| can_delete                 | soft delete/block project   |
| can_export                 | export project data         |
| can_bulk_action            | bulk actions                |

---

## 10.4 Requirement Moderation Module

| Permission          | Required For                     |
| ------------------- | -------------------------------- |
| can_read            | view requirement queue           |
| can_update          | edit moderation fields           |
| can_approve         | approve requirement              |
| can_reject          | reject requirement               |
| can_request_changes | request changes                  |
| can_view_sensitive  | view private requirement contact |
| can_delete          | soft delete/block requirement    |
| can_export          | export requirements              |
| can_bulk_action     | bulk actions                     |

---

## 10.5 Verification Module

| Permission                 | Required For                       |
| -------------------------- | ---------------------------------- |
| can_read                   | view verification requests         |
| can_update                 | add notes/update status            |
| can_approve                | approve verification               |
| can_reject                 | reject verification                |
| can_request_changes        | ask for more docs                  |
| can_view_private_documents | view verification docs             |
| can_view_sensitive         | view identity/business data        |
| can_delete                 | remove/revoke verification request |
| can_export                 | export verification reports        |

Private document access must be logged.

---

## 10.6 Support Module

| Permission                 | Required For             |
| -------------------------- | ------------------------ |
| can_read                   | view support tickets     |
| can_create                 | create internal ticket   |
| can_update                 | reply/update status      |
| can_assign                 | assign ticket            |
| can_view_sensitive         | view private ticket data |
| can_view_private_documents | view ticket attachments  |
| can_delete                 | close/delete ticket      |
| can_export                 | export support report    |

---

## 10.7 Reports / Fraud Module

| Permission                 | Required For              |
| -------------------------- | ------------------------- |
| can_read                   | view reports              |
| can_update                 | investigate/update report |
| can_assign                 | assign report             |
| can_approve                | resolve/confirm report    |
| can_reject                 | dismiss report            |
| can_view_sensitive         | view private fraud data   |
| can_view_private_documents | view evidence attachments |
| can_manage_security        | block/suspend/flag users  |
| can_export                 | export fraud reports      |

---

## 10.8 Billing Module

| Permission          | Required For                      |
| ------------------- | --------------------------------- |
| can_read            | view billing/subscription records |
| can_update          | update billing support notes      |
| can_view_sensitive  | view GST/billing private fields   |
| can_manage_payments | manage billing state              |
| can_manual_activate | manual subscription activation    |
| can_export          | export billing reports            |

Manual activation requires audit and should not bypass verified payment rules except approved manual operations.

---

## 10.9 Payment Module

| Permission          | Required For              |
| ------------------- | ------------------------- |
| can_read            | view payment records      |
| can_update          | reconcile payment         |
| can_manage_payments | payment admin actions     |
| can_refund          | refund/credit note        |
| can_manual_activate | manual activation         |
| can_view_sensitive  | view safe payment details |
| can_export          | export payment report     |

Payment module must never show raw provider secrets.

---

## 10.10 Plans / Trials / Coupons Module

| Permission  | Required For                             |
| ----------- | ---------------------------------------- |
| can_read    | view plans/trials/coupons                |
| can_create  | create plan/coupon/trial                 |
| can_update  | update plan/coupon/trial                 |
| can_delete  | deactivate                               |
| can_approve | approve pricing changes if maker-checker |
| can_export  | export plan/trial usage                  |

Plan changes affect revenue and require audit.

---

## 10.11 Ads / Promotions Module

| Permission          | Required For                 |
| ------------------- | ---------------------------- |
| can_read            | view ad queue                |
| can_update          | update ad status             |
| can_approve         | approve ad                   |
| can_reject          | reject ad                    |
| can_request_changes | request changes              |
| can_view_sensitive  | view billing/ad private info |
| can_delete          | pause/block ad               |
| can_export          | export ad performance        |
| can_bulk_action     | bulk ad actions              |

---

## 10.12 Notification Module

| Permission           | Required For                      |
| -------------------- | --------------------------------- |
| can_read             | view notifications/logs/templates |
| can_create           | create template/campaign          |
| can_update           | update template/preferences       |
| can_delete           | disable template                  |
| can_view_sensitive   | view safe recipient data          |
| can_manage_providers | test provider channel             |
| can_export           | export notification logs          |

No fake sent/delivered status.

---

## 10.13 Provider Module

| Permission           | Required For                  |
| -------------------- | ----------------------------- |
| can_read             | view provider status          |
| can_manage_providers | update/test provider config   |
| can_view_sensitive   | view masked config metadata   |
| can_update           | update non-secret settings    |
| can_export           | export provider health report |

Only Super Admin or specifically permitted staff may manage providers.

Raw secrets must never be shown.

---

## 10.14 CMS / Blog / Legal Module

| Permission       | Required For           |
| ---------------- | ---------------------- |
| can_read         | view pages/posts       |
| can_create       | create page/post       |
| can_update       | edit page/post         |
| can_publish      | publish                |
| can_delete       | unpublish/delete       |
| can_manage_legal | legal page edits       |
| can_manage_seo   | meta/canonical/noindex |
| can_export       | export content         |

Legal page changes must be audited.

---

## 10.15 SEO / Redirects Module

| Permission     | Required For                       |
| -------------- | ---------------------------------- |
| can_read       | view SEO settings                  |
| can_update     | edit metadata                      |
| can_manage_seo | canonical/noindex/redirect/sitemap |
| can_publish    | publish SEO changes                |
| can_delete     | disable redirect/page              |
| can_export     | export SEO report                  |

SEO must not expose private data.

---

## 10.16 Location Module

| Permission          | Required For             |
| ------------------- | ------------------------ |
| can_read            | view location hierarchy  |
| can_create          | create location          |
| can_update          | update location          |
| can_approve         | approve missing location |
| can_reject          | reject missing location  |
| can_manage_location | hierarchy management     |
| can_export          | export location report   |
| can_bulk_action     | bulk import/update       |

Location changes affect search/SEO and must be audited.

---

## 10.17 Audit Module

| Permission          | Required For            |
| ------------------- | ----------------------- |
| can_read            | view audit logs         |
| can_view_audit_logs | audit access            |
| can_export          | export audit logs       |
| can_manage_security | flag suspicious actions |

Audit logs must not be edited/deleted by normal staff.

---

## 10.18 Security Module

| Permission          | Required For                      |
| ------------------- | --------------------------------- |
| can_read            | view security events              |
| can_manage_security | manage security flags/rate limits |
| can_update          | resolve security event            |
| can_export          | export security reports           |
| can_bulk_action     | bulk security action              |

Security actions require audit.

---

## 10.19 Feature Flags Module

| Permission               | Required For        |
| ------------------------ | ------------------- |
| can_read                 | view feature flags  |
| can_manage_feature_flags | create/update flags |
| can_update               | enable/disable flag |
| can_export               | export flag report  |

Feature flags affecting security/payment/providers require Super Admin-level approval.

---

## 10.20 System Health / Maintenance Module

| Permission        | Required For                |
| ----------------- | --------------------------- |
| can_read          | view health dashboard       |
| can_manage_system | update maintenance/settings |
| can_update        | run safe health checks      |
| can_export        | export system health report |

Maintenance mode changes require audit.

---

## 11. Staff Role Recommended Defaults

These are recommended default permission profiles. Final permissions must still be stored explicitly.

## 11.1 Verification Manager

Default modules:

* verification
* property/project proof review
* user verification status
* RERA review
* internal notes

Allowed:

* read verification queue
* request changes
* approve/reject if granted
* view private documents if granted
* add review notes

Not allowed by default:

* provider settings
* payments/refunds
* staff permissions
* feature flags
* hard delete
* exports unless granted

---

## 11.2 Support Manager

Default modules:

* support tickets
* user help
* basic user profile view
* reported issue escalation

Allowed:

* view assigned tickets
* reply
* assign/escalate
* view attachments if granted
* use macros
* reopen/close tickets

Not allowed by default:

* private verification docs
* provider secrets
* payment manual actions
* staff permissions
* hard delete

---

## 11.3 Content Manager

Default modules:

* property/project/requirement moderation
* CMS/blog content
* content quality review

Allowed:

* view moderation queues
* request changes
* approve/reject if granted
* edit content drafts if granted
* manage blog drafts

Not allowed by default:

* payment settings
* provider settings
* private documents unless granted
* staff permissions

---

## 11.4 SEO Manager

Default modules:

* SEO metadata
* redirects
* sitemap/noindex
* city/locality SEO pages
* blog SEO

Allowed:

* edit SEO fields
* manage redirects
* manage noindex/canonical
* inspect public-safe pages

Not allowed:

* private contact access
* payment data
* provider secrets
* audit/security unless granted

---

## 11.5 Ads Manager

Default modules:

* ads queue
* campaign review
* ad creative review
* ad performance

Allowed:

* approve/reject ads if granted
* request changes
* view ad metrics
* pause ads if permitted

Not allowed:

* fake paid status
* activate unpaid ad
* payment overrides unless payment permission exists

---

## 11.6 Billing Manager

Default modules:

* billing support
* subscriptions
* invoices
* plan usage

Allowed:

* view billing records
* resolve billing tickets
* export billing if granted
* add internal notes

Not allowed by default:

* refunds
* manual activation
* provider secrets
* staff permissions

---

## 11.7 Payment Manager

Default modules:

* payments
* reconciliation
* refunds/credit notes if granted
* webhook failure review

Allowed:

* view payment status
* reconcile
* process refund if granted
* review failed webhooks
* manual activation only if explicitly granted

Not allowed:

* raw Razorpay secret
* fake payment success
* bypass webhook without audit/approved manual process

---

## 11.8 City Manager

Default modules:

* locations
* missing location requests
* city/locality metadata

Allowed:

* create/update location
* approve missing location
* manage hierarchy
* review duplicates

Not allowed:

* user private data
* payment/provider data
* security settings

---

## 11.9 User Manager

Default modules:

* users
* profile review
* role change requests
* suspension/ban if granted

Allowed:

* view users
* update safe status if permitted
* review role change
* suspend/ban if granted
* view sensitive contact only if granted

Not allowed:

* provider secrets
* payment manual activation
* private documents unless granted

---

## 11.10 Notification Manager

Default modules:

* notification templates
* notification logs
* provider delivery overview

Allowed:

* manage templates
* view delivery logs
* test channels if provider permission granted
* manage preferences defaults where safe

Not allowed:

* raw provider secrets
* fake delivery status
* payment/provider config unless granted

---

## 11.11 System Manager

Default modules:

* system health
* provider status read-only
* maintenance monitoring

Allowed:

* view health
* run safe checks
* view setup-required states
* view deployment status

Not allowed by default:

* provider secret update
* feature flags
* payment overrides
* destructive DB changes

---

## 11.12 Security Manager

Default modules:

* security events
* rate limits
* fraud reports
* suspicious activity

Allowed:

* review security events
* block/suspend if granted
* manage rate-limit policies if granted
* escalate incidents
* view audit where granted

Not allowed:

* delete audit logs
* view provider secrets
* hard delete without approval

---

## 11.13 Reports Manager

Default modules:

* reports dashboards
* analytics reports
* business reports

Allowed:

* view reports
* export allowed reports
* filter/summarize metrics

Not allowed:

* export sensitive data unless granted
* view hidden contacts without sensitive permission
* fake analytics

---

## 11.14 Audit Manager

Default modules:

* audit logs
* high-risk action review

Allowed:

* view audit logs
* export audit if granted
* flag suspicious actions
* review maker-checker trails

Not allowed:

* edit/delete audit logs
* bypass audit
* change permissions unless granted

---

## 12. Internal Dashboard Shell

Admin/staff dashboard shell must include:

* internal top bar
* sidebar navigation
* role/permission-aware menu
* search
* notification/system alerts
* profile menu
* logout
* environment badge
* provider/setup-required status indicator
* breadcrumbs
* module title
* filters
* table/card content area
* detail drawer/page
* audit/status timeline
* mobile navigation
* noindex metadata

Dashboard shell must not:

* show modules user lacks permission for
* rely only on hidden UI
* expose secrets
* expose private docs without permission
* use public website footer
* have dead links
* use fake data
* show fake provider health

---

## 13. Admin Mobile UX Rules

Admin pages must work on mobile.

Mobile rules:

* sidebar collapses into drawer
* tables become cards
* filters become bottom sheet
* row actions become dropdown/bottom sheet
* detail panel becomes full page/bottom sheet
* large tap targets
* no horizontal scroll
* no overlapping sticky buttons
* no tiny table columns
* search/filter easy to use
* action confirmations clear
* public/private data labels readable
* audit timeline scrollable
* private doc preview controlled

Required widths:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

---

## 14. Admin Dashboard Overview

Super Admin dashboard may show:

* pending property approvals
* pending project approvals
* pending requirement approvals
* pending verification requests
* open support tickets
* open reports/fraud issues
* payment failures
* webhook failures
* provider setup-required/failed
* active users
* new registrations
* active subscriptions
* expired plans
* active ads
* pending ads
* unread admin alerts
* system health
* security events
* recent audit logs
* launch/deployment status

Rules:

* data real only
* counts real only
* no fake charts
* role-scoped for staff/admin
* fast and paginated/lazy
* setup-required states shown honestly

---

## 15. Admin Tables And Queues

Every admin table/queue must support:

* pagination
* search
* filters
* sort
* status chips
* assignment
* row detail
* bulk select only if permission
* export only if permission
* loading state
* empty state
* error state
* unauthorized state
* audit timeline
* action confirmation
* mobile card layout

Admin tables must not:

* load all rows unbounded
* show private fields without permission
* show fake counts
* expose provider secrets
* expose hidden contacts to unauthorized staff
* show raw payment/webhook payload unnecessarily

---

## 16. Moderation Queue Common Pattern

Applies to:

* properties
* projects
* requirements
* ads
* verification
* reports
* missing locations
* CMS/legal publish where review exists

Queue item should show:

* title/name
* submitter
* role
* entity type
* status
* submitted date
* assigned staff
* priority
* city/location
* preview thumbnail
* flags/warnings
* duplicate indicator
* report count
* verification status
* plan/subscription status where relevant
* action buttons based on permission

Detail view should show:

* full submitted data
* public preview
* private fields only if permitted
* media/docs preview
* timeline
* internal notes
* previous versions
* change diff where relevant
* related user history
* related reports
* approve/reject/request changes
* reason box
* assignment/escalation
* audit logs

---

## 17. Approval Action Rules

Approval actions:

* approve
* reject
* request changes
* assign
* escalate
* revoke approval
* pause/block
* restore

Rules:

* reason required for reject/request changes
* reason required for revoke/block
* approve requires permission
* reject requires permission
* request changes requires permission
* sensitive/private doc review requires permission
* action audited
* user notified where configured
* public cache revalidated
* no fake approval
* approval cannot bypass role/plan/RERA/payment rules where applicable

---

## 18. Property Moderation Module

Property moderation must support:

* pending property queue
* need-changes queue
* rejected history
* published list
* paused/expired/deleted lists
* duplicate warnings
* report flags
* media preview
* location review
* contact visibility review
* legal/spam checks
* public preview
* approval timeline
* uploader profile
* owner/broker role check
* subscription/plan status
* verification status

Staff can:

* approve
* reject
* request changes
* pause/block
* add internal notes
* assign/escalate
* view change history
* view reports
* preview public page

Staff must not:

* publish private contact accidentally
* expose hidden contact
* approve fake/unsafe data knowingly
* edit user content without audit
* approve without permission

---

## 19. Project Moderation Module

Project moderation must support:

* pending project queue
* RERA check
* project media review
* brochure/floor plan review
* one video max check
* 360/iframe URL safety check
* unit inventory review
* builder profile review
* project contact rule review
* RERA disclaimer check
* ads eligibility warning
* public preview
* reports/duplicate warnings
* approval timeline

Specific checks:

* builder owns project
* owner/broker cannot submit project
* PG/hostel/room not project
* RERA real if claimed
* RERA proof private
* project contact not leaked to guest
* media safe
* unit inventory not fake
* RERA required before ads where applicable

---

## 20. Requirement Moderation Module

Requirement moderation must support:

* pending requirement queue
* user role check
* contact privacy check
* budget/location validation
* spam/duplicate check
* proposal visibility rules
* public/scoped preview
* approval timeline
* need-changes/reject reasons
* expiry settings

Specific checks:

* owner/broker can submit
* builder denied by default
* private contact protected
* requirement feed visibility scoped
* no fake matching
* no spam/illegal content

---

## 21. User Management Module

User management must support:

* user list
* search by name/email/mobile safe
* filter by role
* filter by status
* filter by verification status
* filter by plan/subscription
* profile detail
* public preview
* listings/projects/requirements overview
* leads/support/reports overview where permitted
* role change requests
* suspend/ban
* restore/activate
* soft delete request
* notes
* audit timeline

Sensitive fields:

* mobile
* email
* private address
* documents
* payment/billing
* private notes
* lead data

Sensitive fields require permission.

---

## 22. Role Change Review Module

Role change request review must show:

* current role
* requested role
* user reason
* account status
* current listings/projects/requirements
* subscription/plan impact
* verification impact
* billing impact
* warnings
* admin notes
* approve/reject/request changes

Role change approval must:

* update profile role safely
* create role-specific profile if needed
* remove/disable old role dashboard access
* preserve existing records safely
* not delete data silently
* notify user
* audit action

---

## 23. Staff Management Module

Staff management must support:

* staff list
* invite staff
* resend invite
* revoke invite
* assign role
* assign permissions
* disable staff
* suspend staff
* restore staff
* view login history where implemented
* view action history
* view assigned workload
* view audit timeline

Rules:

* only Super Admin or permitted admin can manage staff
* staff cannot modify own permissions
* permission changes audited
* disabled staff cannot login
* no public staff registration
* invites expire
* provider missing email handled setup-required/manual

---

## 24. Verification Module

Verification module must support:

* user verification requests
* broker verification
* builder verification
* business verification
* property authority proof
* project/RERA proof
* role change proof
* co-owner/authority conflict
* document review
* call/review notes
* approve/reject/need changes
* expiry/recheck
* revoke verification
* badge status
* public disclaimer

Private documents:

* private bucket
* signed URL
* access permission
* access log
* no public link
* no raw URL in logs

Verified badge is not legal guarantee.

---

## 25. Support Ticket Module

Support module must support:

* ticket list
* categories
* priority
* status
* assignment
* SLA where implemented
* replies
* attachments
* internal notes
* macros
* escalation
* reopen
* satisfaction feedback
* user timeline
* related listing/payment/report links
* notifications

Statuses:

* open
* assigned
* waiting_user
* waiting_internal
* resolved
* closed
* reopened
* escalated

Support attachments may be private.

---

## 26. Reports And Fraud Module

Reports/fraud module must support:

* reported property
* reported project
* reported requirement
* reported profile
* reported message
* reported ad
* fraud signal review
* duplicate listing review
* suspicious contact reveal
* OTP abuse
* payment mismatch
* fake verification/RERA claim
* spam messages
* scraping behavior
* repeated abusive reports

Actions:

* investigate
* mark valid
* dismiss
* request changes
* pause/block listing
* suspend user
* revoke verification
* escalate
* close report
* add internal note

Reporter privacy must be protected.

---

## 27. Leads / CRM Admin Module

Admin lead view is for oversight, not normal public CRM.

It may include:

* lead list
* reported leads
* duplicate leads
* suspicious leads
* contact reveal logs
* lead source stats
* assignment review
* dispute review
* message report links
* site visit dispute links

Rules:

* staff permission required
* private lead/message access requires sensitive permission
* export permission required
* no fake lead count
* no unauthorized staff access
* audit sensitive viewing if needed

---

## 28. Billing Admin Module

Billing admin must support:

* subscriptions list
* user plan status
* plan usage
* expiry/grace status
* trial status
* invoices
* billing notes
* billing support links
* coupon usage
* failed payment follow-up
* manual actions if permitted

Rules:

* billing data private
* user-scoped
* staff permission required
* manual activation audited
* no fake active plan
* failed/pending payment cannot activate plan without approved manual exception
* invoice sequence protected

---

## 29. Payment Admin Module

Payment admin must support:

* payment list
* provider order ID
* payment ID
* status
* verification status
* webhook status
* reconciliation status
* refund/credit note status
* safe payload summary
* user/subscription/invoice links
* retry/reconcile where safe
* manual action audit

Rules:

* raw secrets hidden
* raw webhook payload redacted or permission-protected
* webhook signature verification status shown
* duplicate webhook handled
* failed payment inactive
* refund permission required
* manual activation permission required
* every payment manual action audited

---

## 30. Plans / Trials / Coupons Admin Module

Plans module must support:

* role-specific plans
* limits
* add-ons
* pricing
* billing cycle
* GST applicable flag
* active/inactive
* publish state
* history
* usage impact
* trial grants
* coupons

Rules:

* plan changes audited
* pricing changes may require maker-checker
* active users impact warning
* no fake plan features
* role-specific posting gates align with plan
* coupon abuse protection
* trial no auto-charge unless clearly disclosed

---

## 31. Invoice / GST Admin Module

Invoice admin must support:

* invoice list
* invoice number
* financial year
* payment link
* user billing details
* GSTIN
* B2B/B2C classification
* CGST/SGST/IGST
* PDF generation/download where configured
* correction/credit note where implemented
* email status where provider configured

Rules:

* invoice generated only after verified payment
* failed payment cannot consume invoice number
* sequential invoice number protected
* correction requires audit
* refund/credit note permission required
* invoice PDF private/scoped as needed

---

## 32. Ads / Promotions Admin Module

Ads module must support:

* pending ad queue
* approved ads
* rejected ads
* active ads
* paused ads
* expired ads
* payment status
* target city/all Gujarat setting
* desktop/tablet/mobile banner preview
* project link
* RERA compliance
* sponsored label check
* impressions/clicks real only
* fraud click review
* approval timeline

Rules:

* ad shown only if approved/paid/active/not expired
* project must be approved/published
* builder must own project
* RERA requirement checked where applicable
* media safe
* approval/reject reason audited
* no fake impressions/clicks

---

## 33. Notification Admin Module

Notification admin must support:

* notification templates
* in-app notification logs
* external delivery logs
* email/SMS/WhatsApp/push provider status
* retry failed delivery where safe
* notification preferences
* quiet hours/digest settings
* deep link validation
* test notification if provider configured
* setup-required state if provider missing

Rules:

* no fake delivery
* user preferences respected
* raw provider errors hidden
* provider test rate-limited
* template changes audited
* deep links safe

---

## 34. Provider Settings Module

Provider settings module covers:

* Supabase
* OTP
* SMS
* email
* WhatsApp
* Razorpay
* Google Maps
* Cloudflare R2
* Cloudflare CDN
* Turnstile
* analytics
* error tracking
* cron/jobs
* media processing
* file scan
* PDF generation
* GeoIP
* Search Console
* web push

Provider module must show:

* provider name
* area
* mode
* status
* last test
* safe error code
* setup-required items
* enabled/disabled flag
* environment
* docs/setup notes
* test button if permitted

Provider module must not show:

* raw API keys
* secrets
* webhook secrets
* service role key
* private `.env` values
* raw provider payloads

Provider status must be real.

---

## 35. Feature Flags Module

Feature flags control:

* incomplete modules
* provider-backed features
* risky changes
* ads
* Turnstile
* maps API
* WhatsApp API
* media processing
* caching changes
* advanced analytics
* maintenance-related features
* experimental UI

Rules:

* backend enforcement for sensitive flags
* flag changes audited
* risky flag changes may require maker-checker
* flags documented in Feature Registry
* disabled feature shows safe disabled/setup-required state
* no frontend-only sensitive gating

---

## 36. Maintenance Mode Module

Maintenance mode must support:

* enable/disable
* message
* start/end time
* allowed internal bypass
* affected routes
* public-safe maintenance page
* dashboard/admin behavior
* provider/deployment reason
* audit log

Rules:

* Super Admin/system permission required
* audit change
* do not expose internal errors
* noindex where needed
* payment/checkout disabled safely during maintenance if affected

---

## 37. CMS Admin Module

CMS admin must support:

* pages
* drafts
* publish/unpublish
* content editor
* slug
* meta title
* meta description
* canonical
* noindex
* preview
* revision history where implemented
* author/reviewer
* legal links
* status

CMS pages include:

* About
* Contact
* FAQ
* Help
* Safety
* Terms
* Privacy
* Cookie
* Refund
* Cancellation
* Listing Policy
* Advertising Policy
* Verification Policy
* Payment Policy
* Disclaimer
* Grievance

Rules:

* published public only
* drafts private
* legal edits audited
* rich text sanitized
* no fake/legal guarantee claims

---

## 38. Blog Admin Module

Blog admin must support:

* posts
* categories
* tags
* slug
* title
* excerpt
* featured image
* content
* SEO fields
* status
* publish schedule
* author
* preview
* revision where implemented

Rules:

* published public only
* drafts private
* no fake advice
* no hidden contact/private data
* no fake stats
* images safe
* SEO safe

---

## 39. SEO Admin Module

SEO admin must support:

* page title/meta
* canonical
* noindex
* sitemap inclusion
* robots rules
* city/locality/type pages
* schema settings
* redirects
* sold/rented/expired handling
* GSC setup status
* broken link checks where implemented
* slug conflict checks

Rules:

* no private data in SEO
* no fake reviews/ratings/schema
* no empty/thin index pages
* admin/staff/dashboard noindex
* redirects safe, no open redirect
* changes audited

---

## 40. Location Admin Module

Location admin must support:

* country
* state
* district
* taluka
* city/village
* area
* locality
* society/building
* landmark
* pin code
* map coordinates
* missing location requests
* duplicate location detection
* active/inactive status
* SEO slug
* Gujarati/Hindi/English/transliteration
* bulk import where permitted
* parent-child validation

Rules:

* all hierarchy changes audited
* missing location approval permission required
* public search affected
* SEO pages updated/revalidated
* no duplicate confusing location names without parent context

---

## 41. Audit Logs Module

Audit log module must show:

* actor
* actor role
* action
* target type
* target ID
* old safe value
* new safe value
* reason
* timestamp
* IP/device hash where safe
* environment
* module
* severity

Audit required for:

* user role change
* user suspension/ban
* staff invite/permission change
* approval/rejection
* verification approval/revocation
* private doc access
* contact reveal
* payment manual actions
* refunds/credit notes
* provider settings
* feature flags
* plan/pricing changes
* ad approval
* CMS/legal publish
* location changes
* export
* bulk action
* security settings
* maintenance mode
* deployment/rollback signoff

Audit logs must be append-only.

No secrets.

---

## 42. Security Events Module

Security module must show:

* failed login attempts
* suspicious login
* OTP abuse
* rate limit hits
* contact reveal abuse
* scraping signals
* payment mismatch
* provider failures
* hidden contact access attempts
* private document access attempts
* RLS/security errors where safe
* admin/staff suspicious actions
* report/fraud escalations

Actions:

* investigate
* mark resolved
* block/suspend
* escalate
* add internal note
* adjust rate limits where permitted
* notify Super Admin

Security events must not expose secrets.

---

## 43. Reports Dashboard Module

Reports dashboard may include:

* user growth
* listing growth
* project growth
* requirement growth
* lead volume
* inquiry source
* contact reveal count
* subscription revenue
* payment status
* ad performance
* support volume
* fraud/report trends
* verification throughput
* location demand
* provider health
* search trends
* SEO page performance where configured

Rules:

* real data only
* no fake analytics
* role/permission-scoped
* date filters
* exports permission-gated
* private data masked unless permission
* heavy reports paginated/background aggregated

---

## 44. System Health Module

System health may show:

* app status
* database status
* migration status
* RLS status summary
* provider statuses
* payment webhook status
* queue/job status
* cron status
* storage status
* CDN status
* error rate
* slow routes
* slow queries
* deployment version
* last backup
* last restore test
* maintenance mode
* feature flag summary

Rules:

* setup-required states shown honestly
* no fake healthy status
* raw secrets hidden
* production warnings clear
* system actions permission-gated

---

## 45. Exports

Exports may include:

* users
* properties
* projects
* requirements
* leads
* payments
* invoices
* ads
* reports
* audit logs
* support tickets
* locations
* SEO data

Export rules:

1. export permission required
2. sensitive export requires sensitive permission
3. private docs export requires private document permission
4. exports audited
5. large exports background/batched
6. export files private/signed URL
7. export expiry
8. no hidden contacts unless permitted
9. no raw secrets
10. legal/privacy rules respected

---

## 46. Bulk Actions

Bulk actions may include:

* assign
* approve
* reject
* request changes
* pause
* resume
* archive
* close
* export
* notify
* mark duplicate
* update status
* tag
* delete/soft delete

Bulk action rules:

* `can_bulk_action` required
* module permission required
* confirmation required
* reason required where relevant
* preview affected records
* skip unauthorized records
* audit summary
* detailed log
* rollback notes where risky
* no bulk hard delete without approval

---

## 47. Maker-Checker System

Maker-checker means one person creates a high-risk change and another approves.

Recommended for:

* pricing changes
* plan limit changes
* provider mode changes
* payment manual activation
* refunds/credit notes above threshold
* staff permission changes
* feature flag enabling for production
* legal page major changes
* mass user actions
* mass listing actions
* security setting changes
* RLS/security changes where admin-controlled
* maintenance mode production
* production launch signoff

Maker-checker rules:

* maker cannot approve own high-risk action
* checker must have permission
* both actions audited
* pending change not active until approved
* rejection requires reason
* expiry/cancel support where needed

---

## 48. Internal Notes And Timelines

Admin/staff modules should support:

* internal notes
* user-visible notes where required
* timeline events
* status history
* assignment history
* approval history
* payment history
* provider status history
* verification history
* support message history
* report resolution history

Rules:

* internal notes private
* notes permission-scoped
* notes audited where sensitive
* no secrets in notes
* no private docs in note body
* no abusive staff notes

---

## 49. SLA And Workload Management

Admin system may support:

* queue assignment
* priority
* SLA due date
* overdue indicator
* staff workload
* escalation
* auto-assignment where future
* queue filters
* daily review dashboard

Use for:

* verification
* support
* reports
* moderation
* payment issues
* provider failures
* legal/security issues

SLA metrics must be real.

---

## 50. Admin Notifications

Internal notifications may include:

* new property pending
* new project pending
* new requirement pending
* verification submitted
* support ticket created
* report submitted
* payment failed/webhook failed
* provider failed
* ad pending approval
* missing location request
* security event
* staff assigned task
* SLA overdue
* maker-checker pending
* production/deployment alert

Rules:

* DB-backed
* no fake unread count
* external delivery provider-dependent
* role/permission scoped
* deep links protected

---

## 51. Admin Search

Admin global search may search:

* users
* properties
* projects
* requirements
* leads
* payments
* invoices
* support tickets
* reports
* ads
* locations
* CMS pages
* audit logs where permitted

Rules:

* permission-scoped results
* sensitive fields masked
* no hidden contact unless permission
* no unbounded query
* indexes needed
* result categories
* safe empty state

---

## 52. Admin Detail Drawer / Detail Page Pattern

For admin tables, clicking row should open:

* drawer on desktop/tablet or detail page
* bottom sheet/full page on mobile

Detail should include:

* summary
* status
* owner/user
* public preview
* private fields only with permission
* media/docs if permitted
* timeline
* notes
* actions
* audit
* related records
* reports
* assigned staff
* history

No row should be dead if intended clickable.

---

## 53. Private Document Access In Admin

Private documents include:

* verification docs
* RERA proof
* ownership/authority proof
* report evidence
* support attachments
* private invoice PDFs where restricted
* legal dispute files

Access rules:

* `can_view_private_documents` required
* signed URL
* expires
* access logged
* watermark where implemented
* no public bucket
* no raw storage key in UI
* no copyable permanent URL
* no logs with full private URL
* no unauthorized preview

Private doc leak is critical.

---

## 54. Provider Secret Display Rule

Provider UI may show:

* provider name
* configured yes/no
* mode
* masked key prefix/suffix if safe
* last tested
* safe error
* setup-required instructions
* environment variable name
* docs link/path

Provider UI must not show:

* raw key
* raw secret
* webhook secret
* service role key
* private `.env`
* full token
* raw provider payload with secrets

Use masked display:

```txt id="masked-secret-example"
RAZORPAY_KEY_SECRET = configured / hidden
RAZORPAY_WEBHOOK_SECRET = configured / hidden
```

Never print actual values.

---

## 55. Admin RLS And Security Rules

Admin system security must enforce:

* internal auth
* active staff profile
* permission check
* module check
* action check
* sensitive data check
* private document check
* export check
* bulk action check
* RLS policies where applicable
* service role only in trusted server code
* audit logs
* direct URL blocking
* no public cache
* no SEO indexing
* safe errors

Admin permission checks must exist both:

* in UI/menu
* on server action/API route

UI-only permission hiding is not enough.

---

## 56. Direct URL Bypass Tests

Test unauthorized direct URL access for:

* `/admin`
* `/admin/users`
* `/admin/staff`
* `/admin/roles-permissions`
* `/admin/properties`
* `/admin/projects`
* `/admin/requirements`
* `/admin/verification`
* `/admin/reports`
* `/admin/support`
* `/admin/billing`
* `/admin/payments`
* `/admin/plans`
* `/admin/ads`
* `/admin/notifications`
* `/admin/providers`
* `/admin/locations`
* `/admin/seo`
* `/admin/cms`
* `/admin/blog`
* `/admin/legal`
* `/admin/audit`
* `/admin/security`
* `/admin/system-health`
* `/admin/feature-flags`
* `/admin/maintenance`

Actors:

* guest
* owner
* broker
* builder
* staff without permission
* disabled staff
* admin without module permission
* Super Admin

Unauthorized must be denied.

---

## 57. Admin Noindex Rules

Admin/staff/internal routes must:

* include noindex
* be excluded from sitemap
* be disallowed in robots where applicable
* not expose sensitive metadata
* not appear in public navigation
* not leak route content to crawlers

Dashboard/private public user routes should also be noindex.

---

## 58. Admin Caching Rules

Do not publicly cache:

* admin pages
* staff pages
* admin API responses
* private docs
* payment data
* audit logs
* provider status with sensitive details
* user private data
* lead/message/support data
* export files
* feature flags if sensitive

Use private/no-store where needed.

---

## 59. Admin Performance Rules

Admin performance requirements:

* all tables paginated
* filters indexed
* search indexed
* detail lazy-loaded
* media/docs loaded on demand
* audit logs paginated
* exports batched/background
* dashboard widgets lazy
* no unbounded reads
* no N+1 queries
* mobile card layout
* provider checks not blocking whole dashboard
* heavy reports background aggregated

---

## 60. Admin Error Handling

Admin errors must be safe but useful.

Show:

* unauthorized
* forbidden
* not found
* validation error
* setup-required
* provider unavailable
* payment verification required
* export too large
* rate limited
* server error with safe code

Do not show:

* SQL stack trace
* raw provider error with secrets
* raw payment payload
* private document URL
* service role information
* internal file path
* RLS policy internals to unauthorized user

---

## 61. Admin Audit Requirements By Action

Audit required for:

| Action                                  | Audit Required |
| --------------------------------------- | -------------: |
| Staff invite/create/update/disable      |            Yes |
| Permission change                       |            Yes |
| User suspend/ban/restore                |            Yes |
| Role change approval/rejection          |            Yes |
| Property approve/reject/need changes    |            Yes |
| Project approve/reject/need changes     |            Yes |
| Requirement approve/reject/need changes |            Yes |
| Verification approve/reject/revoke      |            Yes |
| Private document access                 |            Yes |
| Payment manual activation               |            Yes |
| Refund/credit note                      |            Yes |
| Plan/price/coupon/trial change          |            Yes |
| Ad approve/reject/pause                 |            Yes |
| Provider setting change                 |            Yes |
| Feature flag change                     |            Yes |
| Maintenance mode change                 |            Yes |
| CMS/legal publish                       |            Yes |
| SEO redirect/canonical/noindex change   |            Yes |
| Location hierarchy change               |            Yes |
| Export                                  |            Yes |
| Bulk action                             |            Yes |
| Report/fraud action                     |            Yes |
| Hard delete                             |            Yes |

---

## 62. Recommended Database Tables

Admin/internal system may use:

* `staff_profiles`
* `staff_invites`
* `staff_permissions`
* `admin_sessions`
* `admin_login_events`
* `admin_assignments`
* `moderation_tasks`
* `approval_events`
* `verification_requests`
* `verification_documents`
* `support_tickets`
* `support_messages`
* `reports`
* `fraud_events`
* `payment_admin_actions`
* `refunds`
* `credit_notes`
* `plans`
* `subscriptions`
* `payments`
* `invoices`
* `ads`
* `notification_templates`
* `notification_delivery_logs`
* `provider_settings`
* `provider_health_checks`
* `feature_flags`
* `system_settings`
* `maintenance_events`
* `cms_pages`
* `blog_posts`
* `seo_pages`
* `redirects`
* `locations`
* `missing_location_requests`
* `audit_logs`
* `security_events`
* `rate_limit_events`
* `exports`
* `bulk_action_jobs`
* `background_jobs`

Actual schema may vary, but behavior must exist.

---

## 63. Index Expectations

Indexes required for:

* staff by auth user
* staff by email/status
* permissions by staff/module
* moderation queue status/assigned/date
* properties approval status
* projects approval status
* requirements approval status
* verification status/assigned/date
* support status/priority/assigned
* reports status/target/assigned
* payments provider/status/date
* webhook events provider event ID
* invoices invoice number/user
* ads status/date/city
* provider status
* audit actor/target/date
* security events severity/date
* locations hierarchy parent IDs
* CMS/blog slug/status
* exports owner/status/date
* bulk jobs status/date

No admin queue should load without pagination.

---

## 64. Migration Expectations

Admin implementation requires migrations for:

* staff profiles
* staff invites
* staff permissions
* audit logs
* moderation tasks/events
* admin assignments
* support/report extensions
* provider settings/status
* feature flags
* system settings
* exports/bulk jobs
* security events
* RLS policies
* indexes

Migration must include:

* header
* purpose
* phase
* tables changed
* RLS changed yes/no
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 65. Admin Manual Verification Checklist

Manual verification must check:

### Login / Route Protection

* public user cannot access `/admin`
* guest cannot access `/admin`
* owner/broker/builder denied
* admin/staff login separate
* admin/staff route noindex
* disabled staff denied
* session timeout tracked/implemented/setup-required

### Staff Permissions

* staff sees only assigned modules
* direct URL denied for unassigned module
* read permission works
* write permission works
* approve/reject permission works
* export permission works
* private doc permission works
* sensitive data permission works
* bulk action permission works

### Super Admin

* Super Admin sees all intended modules
* high-risk action confirmation
* audit logs created
* provider secrets masked
* feature flags controlled

### Moderation

* property approve/reject/need changes
* project approve/reject/need changes
* requirement approve/reject/need changes
* reasons required
* user notifications created/setup-required
* public cache revalidates
* rejected not public

### Verification

* private docs require permission
* signed URL/private access
* access logged
* approve/reject/revoke works
* verified badge real only

### Payment/Billing

* payment records visible only with permission
* manual activation permission/audit
* refund permission/audit
* failed payment not activated
* invoice sequence safe

### Ads

* approve/reject/request changes
* only approved/paid/active/not expired ads public
* RERA check where applicable
* impressions/clicks real

### Provider/Feature/System

* provider status real/setup-required
* raw secrets hidden
* provider test permission/rate limit
* feature flag changes audited
* maintenance mode audited

### CMS/SEO/Location

* drafts private
* publish permission
* SEO no private data
* redirects safe
* missing location approval
* sitemap/noindex rules

### Audit/Security

* audit logs append-only
* normal staff cannot edit/delete audit logs
* security events scoped
* exports audited
* bulk actions audited

### Responsive

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

---

## 66. Feature Registry Items Required

`FEATURE_REGISTRY.md` must track:

* admin/staff separate login
* staff invite-only system
* staff permission system
* Super Admin dashboard
* Admin dashboard
* staff dashboard shell
* user management
* role change review
* staff management
* property moderation
* project moderation
* requirement moderation
* verification review
* private document review
* support ticket admin
* reports/fraud admin
* leads/CRM admin view
* billing admin
* payment admin
* plans/trials/coupons admin
* invoices/GST admin
* ads approval admin
* notification admin
* provider status/settings admin
* feature flags
* maintenance mode
* CMS admin
* blog admin
* legal admin
* SEO/redirect admin
* location admin
* audit logs
* security events
* reports dashboard
* system health
* exports
* bulk actions
* maker-checker
* admin noindex
* admin direct URL protection
* admin responsive layout
* admin RLS/security policies
* admin manual verification

Each item must have real status.

---

## 67. Common Bugs To Track

Create bug if:

* public user can access admin
* public user can create staff/admin account
* admin route indexed
* staff sees module without permission
* direct URL bypass works
* staff without private-doc permission sees docs
* provider secret appears
* service role appears
* payment manual activation bypasses audit
* failed payment activated as success
* fake provider status shown
* fake verified badge approved
* fake RERA badge shown
* ad appears without approval/payment/active state
* private contact shown to unauthorized staff
* export works without permission
* bulk action works without permission
* audit log missing for sensitive action
* normal staff can edit/delete audit log
* legal page published without permission
* SEO leaks private data
* admin table unpaginated
* mobile admin table overflows
* raw SQL/provider/payment error shown
* private document URL public
* disabled staff can login
* staff can change own permissions
* maker can approve own maker-checker request

---

## 68. Current Admin/Internal Status

As of this documentation generation stage:

| Area                       | Status           |
| -------------------------- | ---------------- |
| Admin/staff login          | `NOT_STARTED`    |
| Super Admin setup          | `NOT_STARTED`    |
| Staff invite-only system   | `NOT_STARTED`    |
| Staff permissions          | `NOT_STARTED`    |
| Admin dashboard shell      | `NOT_STARTED`    |
| Staff dashboard shell      | `NOT_STARTED`    |
| User management            | `NOT_STARTED`    |
| Role change review         | `NOT_STARTED`    |
| Staff management           | `NOT_STARTED`    |
| Property moderation        | `NOT_STARTED`    |
| Project moderation         | `NOT_STARTED`    |
| Requirement moderation     | `NOT_STARTED`    |
| Verification review        | `NOT_STARTED`    |
| Private document review    | `SETUP_REQUIRED` |
| Support admin              | `NOT_STARTED`    |
| Reports/fraud admin        | `NOT_STARTED`    |
| Lead/CRM admin             | `NOT_STARTED`    |
| Billing admin              | `SETUP_REQUIRED` |
| Payment admin              | `SETUP_REQUIRED` |
| Plans/trials/coupons admin | `NOT_STARTED`    |
| Invoice/GST admin          | `NOT_STARTED`    |
| Ads approval admin         | `NOT_STARTED`    |
| Notification admin         | `SETUP_REQUIRED` |
| Provider status/settings   | `SETUP_REQUIRED` |
| Feature flags              | `NOT_STARTED`    |
| Maintenance mode           | `NOT_STARTED`    |
| CMS/blog/legal admin       | `NOT_STARTED`    |
| SEO/redirect admin         | `NOT_STARTED`    |
| Location admin             | `NOT_STARTED`    |
| Audit logs                 | `NOT_STARTED`    |
| Security events            | `NOT_STARTED`    |
| Reports dashboard          | `NOT_STARTED`    |
| System health              | `SETUP_REQUIRED` |
| Exports                    | `NOT_STARTED`    |
| Bulk actions               | `NOT_STARTED`    |
| Maker-checker              | `NOT_STARTED`    |
| Admin RLS/security         | `NOT_STARTED`    |
| Manual verification        | `NOT_STARTED`    |

---

## 69. Documentation Generation Progress

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
|       19 | `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`       | Pending |
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`    | Pending |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Pending |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Pending |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Pending |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Pending |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 70. Related Documents

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
* `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`
* `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
* `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`
* `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
* `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`
* `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
* implementation prompts
* manual verification prompts
* SQL migrations
* RLS policies

---

## 71. Final Admin/Internal Rule

Admin and staff systems are internal-only.

Public users must never create or access admin/staff accounts.

Super Admin has broad control but actions must be audited.

Admin and staff access must be permission-scoped.

Private documents require explicit permission and access logs.

Provider secrets must never be exposed.

Payment/admin actions must never fake success.

Verification and RERA badges must be real.

Ads must not show unless approved, paid, active and not expired.

Staff cannot bypass permissions through direct URL.

No fake admin status.

No fake provider status.

No fake payment status.

No fake verification.

No fake analytics.

No fake PASS.
