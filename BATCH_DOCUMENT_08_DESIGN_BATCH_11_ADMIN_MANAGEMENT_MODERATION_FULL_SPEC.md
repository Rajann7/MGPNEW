# BATCH_DOCUMENT_08_DESIGN_BATCH_11_ADMIN_MANAGEMENT_MODERATION_FULL_SPEC.md

# My Gujarat Property

## Batch Document 08

## Design Batch 11 — Complete Admin Management, Users, Staff, Permissions, Moderation, Claims, Verification and Support

---

# 1. DOCUMENT PURPOSE

This document is the complete design, implementation, functionality, permission, security, privacy, audit, moderation, support, responsive behavior, database, RLS and live-verification specification for:

**My Gujarat Property · Design Batch 11 — Admin Management & Moderation**

Batch 11 defines the complete Admin and Internal Staff management experience for:

* Super Admin,
* Verification Manager,
* Support Manager,
* Content Manager,
* Billing Manager,
* User Manager,
* Moderation-authorised staff,
* custom-permission staff.

Batch 11 contains exactly these 22 screen groups:

1. Permission-Aware Admin Overview
2. Forbidden Module Full Page
3. User Management List
4. User Detail
5. Suspend / Ban User
6. Role Change Request Queue
7. Role Change Request Detail
8. Staff List
9. Staff Invite
10. Staff Permissions Editor
11. Staff Activity / Audit History
12. Property Moderation Queue
13. Property Moderation Detail
14. Project Moderation Variant with RERA Gate
15. Requirement Moderation Variant
16. Missing Location Queue and Approval
17. Duplicate Listing Merge Review
18. Public Profile Claim Request Review
19. Verification Request Queue
20. Verification Request Detail
21. Support Ticket Queue
22. Support Ticket Detail, Thread and Macros

Every screen and every state must be implemented.

Nothing may be skipped.

The actual Batch 11 design source must be read directly from:

`/newdesign/`

Use the real Batch 11 standalone HTML source file.

Do not implement from:

* the current generic Admin dashboard,
* memory,
* generic admin templates,
* previous Admin UI,
* placeholder routes,
* assumptions.

---

# 2. ABSOLUTE ADMIN UI REBUILD RULE

Where the current Admin interface conflicts with Batch 11, completely remove and replace the conflicting presentation architecture.

Do not keep a mixture of:

* old Admin Overview cards,
* old generic counters,
* Batch 11 permission-aware cards,
* current placeholder panels,
* incomplete Verification list,
* incomplete Support placeholder,
* legacy User table,
* Batch 11 user-management design.

The final browser output must use:

**Batch 1 Admin Foundation + exact Batch 11 design for each applicable screen.**

Existing secure backend foundations may be retained only when they support the final Batch behavior correctly.

---

# 3. NO PLACEHOLDER RULE FOR BATCH 11 MODULES

After Batch 11 is complete, these Batch 11 modules must not remain Setup Required or Coming Soon:

* User Management,
* Role Change Review,
* Staff Management,
* Permissions,
* Staff Activity,
* Property Moderation,
* Project Moderation,
* Requirement Moderation,
* Missing Location Queue,
* Duplicate Merge Review,
* Claim Review,
* Verification Queue,
* Verification Detail,
* Support Ticket Queue,
* Support Ticket Detail.

Missing external providers may remain honestly Setup Required only for the external delivery part.

Example:

Staff invitation record can work while Email provider is not configured.

But:

the Staff Invite module itself cannot remain a placeholder.

---

# 4. BATCH 11 SCREEN INVENTORY

The exact implementation scope is:

## Screens 1–2

Admin Overview and Forbidden Module.

## Screens 3–7

User Management and Role Change.

## Screens 8–11

Staff Management, Permission Matrix and Staff Activity.

## Screens 12–18

Moderation Queues and Reviews.

## Screens 19–22

Verification and Support.

All 22 screen groups are mandatory.

---

# 5. IMPLEMENTATION ORDER

Implement Batch 11 in this order:

1. Admin shell permission reconciliation
2. Screen 1 Admin Overview
3. Screen 2 Forbidden Module
4. Screen 3 User List
5. Screen 4 User Detail
6. Screen 5 Suspend/Ban
7. Screen 6 Role Change Queue
8. Screen 7 Role Change Detail
9. Screen 8 Staff List
10. Screen 9 Staff Invite
11. Screen 10 Permission Matrix
12. Screen 11 Staff Activity
13. Screen 12 Property Queue
14. Screen 13 Property Detail
15. Screen 14 Project Moderation
16. Screen 15 Requirement Moderation
17. Screen 16 Missing Locations
18. Screen 17 Duplicate Merge
19. Screen 18 Claim Review
20. Screen 19 Verification Queue
21. Screen 20 Verification Detail
22. Screen 21 Support Queue
23. Screen 22 Ticket Detail
24. Full cross-role Admin permission regression.

Do not implement everything in one large unverified change.

---

# 6. ADMIN DESIGN FOUNDATION

Batch 11 uses the Batch 1 Admin foundation.

Admin interface uses:

* graphite Admin shell,
* fixed desktop sidebar,
* contextual top bar,
* permission-aware navigation,
* mobile contextual header,
* mobile drawer,
* no Admin bottom navigation.

The Admin UI is intentionally visually distinct from public role dashboards.

Do not use Owner/Broker/Builder dashboard navigation inside Admin routes.

---

# 7. ADMIN MOBILE RULE

Admin is desktop-primary.

However, emergency mobile access must remain functional.

Mobile Admin uses:

* contextual header,
* hamburger/menu action,
* drawer,
* no bottom navigation.

Do not add:

Home · Search · Post · Leads · Profile

to Admin screens.

That navigation is for public role dashboards only.

---

# 8. ADMIN PERMISSION MODEL

Every Admin route and every Admin action must have two layers:

### UI Permission Layer

Show:

* accessible module normally,
* inaccessible module locked/disabled where Batch design requires.

### Server Permission Layer

A direct URL or server-action request must independently verify permission.

Frontend disabled state is not security.

---

# 9. PERMISSION DIMENSIONS

Batch 11 visible permission matrix uses:

* View
* Edit
* Approve

The current internal permission architecture may contain more granular flags.

The final user-facing Permission Editor must match the Batch 11 design.

Map visible permissions coherently.

Example conceptual mapping:

### View

read/list/detail access.

### Edit

non-final record modifications and operational actions.

### Approve

moderation decision authority where appropriate.

For moderation modules, the visible Approve/decision capability must coherently cover the final moderation decisions allowed by the Batch design:

* Approve,
* Request Changes,
* Reject,

unless a later explicit design creates separate decision permissions.

Do not create a hidden permission mismatch where:

* UI shows Reject,
* but server rejects it because a hidden `can_reject` permission was never mapped.

---

# 10. SUPER ADMIN RULE

The source explicitly states:

**Super Admin always sees everything.**

The Permission Matrix can only restrict roles below Super Admin.

Do not allow:

* disabling Super Admin core access,
* hiding a module from Super Admin because a permission row is missing,
* self-removal of final Super Admin access.

---

# 11. ADMIN AUDIT RULE

All significant Admin actions must be logged.

At minimum log:

* actor Staff ID,
* Staff role,
* action,
* module,
* target type,
* target ID,
* safe before state,
* safe after state,
* reason,
* timestamp.

Do not place secrets or raw private documents in audit metadata.

---

# 12. AUDIT TIME DISPLAY

The Batch reference uses:

`IST`

Example:

`Today 11:42 IST`

Admin activity time must use the approved Admin display timezone.

Do not show ambiguous UTC time.

---

# 13. SCREEN 1 — ADMIN DASHBOARD OVERVIEW

Screen 1 is:

**Admin dashboard overview — role-aware**

Reference staff view:

`Kavita R. · Verification Mgr`

The Overview is not the same for every Staff member.

Queue cards are permission-aware.

---

# 14. ROLE-AWARE OVERVIEW RULE

The source explicitly states:

**Queue cards show only modules this Staff member can access; locked modules are visible but disabled with a tooltip.**

This means:

* accessible cards show real count/details,
* locked cards remain visible where design shows them,
* locked cards do not leak sensitive count/data,
* locked cards are disabled,
* tooltip explains missing permission.

---

# 15. OVERVIEW REFERENCE PROFILE

Reference:

Initials:

`KR`

Staff:

`Kavita R.`

Role:

`Verification Mgr`

Use actual Staff profile data.

Do not hard-code Kavita.

---

# 16. SCREEN 1 SIDEBAR REFERENCE

Visible navigation example:

* Overview
* Moderation — 12
* Verification — 5
* Users
* Staff & Roles — no access
* Billing — no access

Counts and access states must be real.

Do not hard-code:

12 or 5.

---

# 17. PROPERTY MODERATION CARD

Reference:

`Property Moderation`

Count:

`12`

Supporting text:

`oldest pending 26 hrs`

Required data:

* exact accessible pending Property count,
* age of oldest pending accessible record.

---

# 18. OLDEST PENDING AGE

Calculate from actual submission timestamp.

Do not use created timestamp if moderation submission happened later.

Display appropriate:

* minutes,
* hours,
* days.

---

# 19. VERIFICATION REQUESTS CARD

Reference:

`Verification Requests`

Count:

`5`

Supporting breakdown:

`2 brokers · 3 owners`

Use actual role breakdown.

If Builder requests exist:

display according to exact final dynamic design behavior.

Do not hard-code only Owner/Broker.

---

# 20. CLAIM REQUEST CARD

Reference:

`Claim Requests`

Count:

`2`

Supporting text:

`both builder profiles`

Use real Claim Request count and safe contextual summary.

---

# 21. PROJECT MODERATION CARD

Reference:

`Project Moderation`

Count:

`3`

Supporting text:

`1 awaiting RERA check`

Use actual Project moderation data.

---

# 22. MISSING LOCATION CARD

Reference:

`Missing Locations`

Count:

`4`

Supporting text:

`3 in new GIDC areas`

Use actual queue data.

Do not invent GIDC counts.

---

# 23. LOCKED SUPPORT CARD

Reference:

`Support Tickets`

Count:

`—`

Supporting text:

`Requires Support Manager permission`

This is important.

For a Staff user without Support permission:

do not fetch or reveal Support queue count.

Show:

`—`

and locked explanation.

---

# 24. ACCESSIBLE CARD CLICK

Accessible queue card must open correct module.

Examples:

Property Moderation
→ Property queue.

Verification Requests
→ Verification queue.

Claim Requests
→ Claim queue/review.

Missing Locations
→ Missing Location queue.

No dead cards.

---

# 25. LOCKED CARD INTERACTION

Locked card:

* disabled,
* not clickable into protected module,
* displays tooltip/helper,
* does not reveal sensitive data.

---

# 26. OVERVIEW DATA FETCHING

Do not run all Admin module queries indiscriminately before permission checks.

For example:

Verification Manager Overview should not require:

* Staff permission,
* Billing permission,
* Support permission

just to render.

Build permission-aware aggregation.

---

# 27. OVERVIEW FAILURE ISOLATION

One inaccessible or failed queue must not break the complete Overview.

Use isolated query handling.

Example:

Property queue loads
Verification loads
Claims fail

Then Claims card shows recoverable safe error state without blanking entire Admin Overview.

---

# 28. OVERVIEW MOBILE

Reference mobile:

Title:

`Admin Overview`

Drawer contains relevant Admin modules.

Reference visible mobile items:

* Moderation — 12
* Verification — 5

Rule:

**No bottom nav.**

---

# 29. SCREEN 1 CURRENT REPOSITORY RECONCILIATION

The current Admin Overview uses generic:

* Pending Properties,
* Pending Projects,
* Pending Requirements,
* Total Moderation Queue,
* Registered Users,
* Active Staff.

Batch 11 requires a permission-aware queue dashboard.

Replace the current generic Overview presentation.

The current Overview also calls shared counts broadly.

Final Overview must:

* query only permitted modules,
* avoid exposing locked module counts,
* include Claims,
* include Missing Locations,
* include Verification role breakdown,
* include oldest pending age,
* include RERA-awaiting count.

---

# 30. SCREEN 2 — FORBIDDEN MODULE FULL PAGE

Reference:

`You don't have permission to access Billing`

Supporting text:

`This module requires the Billing Manager permission. Ask a Super Admin if you need access.`

Action:

`Back to my dashboard`

---

# 31. DIRECT URL PERMISSION FAILURE

When Staff enters a protected Admin URL directly:

do not:

* render protected data,
* redirect silently to Dashboard without explanation,
* show generic 404.

Show the Batch 11 Forbidden module screen.

---

# 32. FORBIDDEN COPY

The screen must dynamically identify:

* target module,
* required permission/role where appropriate.

Example:

Billing.

Do not hard-code Billing on every forbidden route.

---

# 33. FORBIDDEN ACTION

`Back to my dashboard`

routes to the Staff Admin Overview.

---

# 34. FORBIDDEN SECURITY

The Forbidden page must render without querying protected module records.

Do not load data and then decide to hide it.

---

# 35. SCREENS 3–7 — USER MANAGEMENT AND ROLE CHANGES

This section includes:

* User List,
* User Detail,
* Suspend/Ban,
* Role Change Queue,
* Role Change Detail.

---

# 36. SCREEN 3 — USER MANAGEMENT LIST

Reference controls:

Search:

`Search name, phone, email…`

Filters:

* Role: All
* Status: Active
* City
* Joined

Table columns:

* USER
* ROLE
* CONTACT
* CITY
* STATUS

---

# 37. USER LIST REFERENCE ROW 1

Initials:

`RP`

Name:

`Rajesh Patel`

Role:

`Owner`

Contact:

`98XXX XXX45`

City:

`Ahmedabad`

Status:

`Active`

---

# 38. USER LIST REFERENCE ROW 2

Initials:

`KB`

Name:

`Kunal Bhatt`

Role:

`Broker`

Contact:

`98XXX XXX02`

City:

`Ahmedabad`

Status:

`Active`

---

# 39. USER LIST REFERENCE ROW 3

Initials:

`VD`

Name:

`Vipul Desai`

Role:

`Broker`

Contact:

`97XXX XXX88`

City:

`Surat`

Status:

`Suspended`

---

# 40. CONTACT MASKING RULE

The source explicitly states:

**Full contact details visible only to Staff with User Manager permission.**

The Verification Manager example sees masked contact.

This is not a frontend-only masking rule.

Server-side user list response must project:

* masked phone,
* masked email where appropriate,

for Staff without sensitive contact permission.

Do not send full mobile/email to Browser and mask only in React.

---

# 41. SENSITIVE CONTACT PERMISSION

Define a clear permission capability.

It may map to:

* User Manager role,
* `can_view_sensitive`,
* approved equivalent.

The rule must remain consistent across:

* User List,
* User Detail,
* Search result,
* Exports,
* Activity references.

---

# 42. CURRENT USER LIST PRIVACY GAP

The current User list server action selects:

* email,
* mobile

for any Staff with user read access.

The current client may display email/mobile directly.

Batch 11 requires this to be fixed.

Required architecture:

### Non-sensitive Staff

receive masked display projection.

### Authorised User Manager

receive permitted full contact details.

---

# 43. USER SEARCH

Search supports:

* Name,
* Phone,
* Email.

Search must be server-side and paginated.

Do not search only currently loaded records.

---

# 44. SEARCH PRIVACY

A Staff user may be permitted to search by phone/email while still receiving masked result display.

Do not return complete PII merely because search matched.

---

# 45. SEARCH INPUT SAFETY

Escape/handle special filter characters safely.

Do not build unsafe raw filter strings from untrusted search text.

---

# 46. ROLE FILTER

Options include:

* All
* Owner
* Broker
* Builder

Use actual Public Role model.

Do not reintroduce deprecated roles.

---

# 47. STATUS FILTER

Use final account statuses.

Examples:

* Active
* Pending
* Suspended
* Banned
* Deleted where authorised.

The source example shows Active selected.

---

# 48. CITY FILTER

User List must support real City filter.

Current User list foundation lacks the source-required City filter.

Add structured City filtering using canonical location data.

---

# 49. JOINED FILTER

Support joined-date filtering.

Examples may include:

* date range,
* source-defined options.

Use the actual Batch control implementation.

Do not only display Joined date without filter.

---

# 50. USER LIST PAGINATION

Use paginated server queries.

Counts must be exact.

Do not load all users.

---

# 51. MOBILE USER LIST

Below the desktop table breakpoint:

use mobile cards from the same dataset.

Each card preserves:

* User,
* Role,
* masked/full Contact according to permission,
* City,
* Status.

Do not create a separate mobile data source.

---

# 52. USER LIST LOADING STATE

Use:

* table skeleton desktop,
* card skeleton mobile.

Do not flash empty list.

---

# 53. USER LIST EMPTY STATE

Use contextual empty copy.

Examples:

No users match these filters.

Action:

Clear filters where appropriate.

---

# 54. USER LIST ERROR

Show safe recoverable error and Retry.

Do not expose database errors.

---

# 55. SCREEN 4 — USER DETAIL

Reference:

Initials:

`KB`

Name:

`Kunal Bhatt`

Role:

`Broker`

Badge:

`Verified`

Metadata:

`Joined Mar 2018 · Ahmedabad · 14 active listings`

Primary action:

`Suspend / Ban`

---

# 56. USER DETAIL TABS

Exact source tabs:

* Listings (14)
* Leads
* Reports (1)
* Payments
* Activity Log

All tabs must work.

Do not render tab labels that lead to empty dead panels.

---

# 57. LISTINGS TAB

Shows actual Listings owned/created by user according to role model.

Reference:

### 4 BHK · Bodakdev · ₹1.1 Cr

Status:

`Approved`

### 3 BHK rent · Satellite · ₹45,000/mo

Status:

`Pending`

Counts must be real.

---

# 58. LISTINGS COUNT

Reference:

`Listings (14)`

Do not count:

* deleted records,
* unrelated client records

unless final user-management definition intentionally includes them.

Use exact count semantics.

---

# 59. LEADS TAB

Show Leads connected to user according to role context.

Apply privacy controls.

Do not expose another party's private phone unnecessarily.

---

# 60. REPORTS TAB

Reference:

`Reports (1)`

Show actual reports against/about the user or their content according to Admin permission.

Do not count dismissed unrelated reports.

---

# 61. PAYMENTS TAB

Payments tab requires Billing/Payment permission.

If User Manager can see profile but not Payment data:

do not expose financial records.

Use module-level permission gating inside User Detail.

Possible presentation:

locked subtab with permission explanation.

---

# 62. ACTIVITY LOG TAB

Show safe user-account activity relevant to Admin management.

Do not expose:

* raw authentication secrets,
* raw IP beyond approved security permission,
* provider secrets.

---

# 63. USER DETAIL PII

User Detail must follow the same sensitive-data permission rule as User List.

Current `select *` Profile retrieval is not sufficient as a privacy boundary.

Return a safe projection based on Staff permission.

---

# 64. USER DETAIL ROLE-AWARE ENTITY COUNTS

Owner:

Property/Requirement context.

Broker:

Property/Requirement/Proposal/CRM context as relevant.

Builder:

Project context.

Do not force one role's entity labels onto another role.

---

# 65. SCREEN 5 — SUSPEND / BAN CONFIRMATION

Reference heading:

`Suspend Kunal Bhatt?`

Reference body:

`All 14 listings will be hidden immediately, active leads paused, and the user notified. Login stays possible but posting is blocked.`

Options:

* Temporary (30 days)
* Permanent ban

Field:

`Reason *`

Helper:

`(shared with user)`

Notice:

`This action will be logged.`

Actions:

* Cancel
* Suspend user

---

# 66. SUSPEND IS MULTI-SYSTEM ACTION

Temporary Suspension must do more than update:

`account_status = suspended`.

Required effects:

* Account status Suspended,
* posting blocked,
* all applicable public listings hidden according to policy,
* active Lead workflow paused according to product semantics,
* user notification created,
* temporary expiry stored,
* audit record created.

---

# 67. CURRENT SUSPEND GAP

Current foundation updates only Profile account status and Admin Note/Audit.

Batch 11 requires the complete coordinated effect.

Repair implementation.

---

# 68. SUSPEND TRANSACTION SAFETY

The operation touches multiple systems.

Use:

* transaction/RPC,

or

* durable idempotent suspension orchestration.

Do not leave state:

User Suspended
but Listings still publicly searchable.

---

# 69. LISTING HIDE SEMANTICS

When user is Suspended:

do not destroy Listing data.

Record suspension-based visibility separately where needed.

On reinstatement:

restore only Listings that were previously eligible to be public.

Do not publish:

* Draft,
* Rejected,
* Expired

Listings accidentally.

---

# 70. ACTIVE LEAD PAUSE

The source says:

`active leads paused`

Define operational meaning.

Possible implementation:

* prevent new Lead actions/assignment,
* preserve Lead history,
* preserve Messages according to policy,
* mark account-side CRM interaction paused.

Do not delete Leads.

---

# 71. USER NOTIFICATION

Suspension creates real user Notification containing safe reason.

If external SMS/Email provider unavailable:

in-app Notification must still work.

Do not claim external delivery when unavailable.

---

# 72. TEMPORARY SUSPENSION

Reference:

`Temporary (30 days)`

Store actual suspension expiry.

A reliable scheduled process must restore/transition the account after 30 days according to policy.

Do not rely on someone manually remembering.

---

# 73. TEMPORARY RESTORE SAFETY

At expiry:

* verify account has not been permanently banned,
* verify no newer suspension action superseded it,
* restore account state appropriately,
* restore eligible visibility,
* record audit event,
* notify user.

---

# 74. PERMANENT BAN

Permanent Ban must be distinct from Temporary Suspension.

Store:

* banned status,
* reason,
* actor,
* date.

Do not auto-restore.

---

# 75. BAN LOGIN POLICY

The exact product authentication policy must be coherent with Batch copy.

If login remains possible for suspended users but not permanently banned users:

implement those states separately.

Do not use one ambiguous state for both.

---

# 76. REASON REQUIRED

Reason is mandatory server-side.

Do not rely on modal required attribute only.

---

# 77. REASON SHARED WITH USER

Because the design explicitly says reason is shared with the user:

ensure Admin does not place secret internal commentary in this field.

Internal Staff-only Note must use a separate internal field/system.

---

# 78. SUSPEND IDEMPOTENCY

Repeated Suspend request must not:

* duplicate user Notifications,
* reset expiry incorrectly,
* duplicate visibility effects.

---

# 79. RESTORE ACTION

User management should support authorised reinstatement.

Restore must:

* require reason,
* preserve audit,
* reverse only suspension-related restrictions.

---

# 80. SCREEN 6 — ROLE CHANGE REQUEST QUEUE

Table columns:

* USER
* CHANGE
* DATE

Reference:

### Meena Trivedi

Owner
→ Broker

Date:

`2 Jul`

### Haresh Joshi

Broker
→ Builder

Date:

`30 Jun`

---

# 81. ROLE CHANGE QUEUE DATA

Use actual pending Role Change Requests.

Do not infer requests from Profile edits.

Each record needs:

* current role,
* requested role,
* reason,
* submitted date,
* status.

---

# 82. ROLE CHANGE QUEUE PAGINATION

Use pagination.

Do not load unlimited request history.

---

# 83. ROLE CHANGE QUEUE STATUS

Default queue should show Pending requests.

History may exist separately according to final Admin flow.

Do not mix Approved/Rejected into Pending queue without clear filter.

---

# 84. ROLE CHANGE DUPLICATE PROTECTION

A user cannot have multiple active pending Role Change requests simultaneously unless product explicitly permits it.

---

# 85. SCREEN 7 — ROLE CHANGE DETAIL

Reference:

Initials:

`MT`

Name:

`Meena Trivedi`

Context:

`Owner since 2024 · 1 active listing · Vadodara`

Reason:

`I've started an agency (Trivedi Realty) and now handle client properties. GST registered last month.`

Field:

`Note / rejection reason`

Helper:

`(required to reject)`

Notice:

`This action will be logged.`

Actions:

* Approve
* Reject

---

# 86. ROLE CHANGE APPROVAL

Approval must:

* verify Staff permission,
* verify Request still pending,
* verify current Profile role still matches request origin,
* apply target Public Role,
* handle dashboard landing,
* handle profile fields,
* handle verification requirements,
* handle subscription migration,
* preserve existing Listings according to product rules,
* create audit.

---

# 87. ROLE CHANGE MUST USE FINAL ROLE MODEL

Do not recreate legacy roles such as:

* Agency,
* Buyer,
* Tenant,
* Real Estate Group

unless explicitly approved in the final role model.

Public registration roles remain based on the approved role catalog.

---

# 88. ROLE CHANGE OWNER TO BROKER

When Owner becomes Broker:

* existing owned Listings remain correctly owned,
* Broker dashboard access enabled,
* Broker verification requirements applied,
* subscription migration handled.

Do not duplicate Listings.

---

# 89. ROLE CHANGE BROKER TO BUILDER

This is a major capability change.

Do not automatically reinterpret Broker Listings as Projects.

Preserve existing Property records according to final policy.

Enable Builder Project capabilities only after role transition and required verification.

---

# 90. SUBSCRIPTION MIGRATION

Role approval must coordinate with Billing.

Do not:

* double-charge,
* silently delete active paid period,
* give unlimited target-role access accidentally.

Possible state:

role approved
→ target-role Plan migration pending.

The exact migration policy must be implemented and user-notified.

---

# 91. VERIFICATION MIGRATION

Changing role may require new documents.

Example:

Broker → Builder may require:

* company verification,
* RERA evidence.

Do not reuse unrelated Verification approval automatically.

---

# 92. ROLE CHANGE REJECTION

Reject requires reason server-side.

Reason becomes visible to user according to Role Change user flow.

---

# 93. ROLE CHANGE APPROVE IDEMPOTENCY

Double Approve must not:

* switch role twice,
* create duplicate subscription migration,
* duplicate Notification.

---

# 94. ROLE CHANGE AUDIT

Record:

* actor,
* original role,
* target role,
* request ID,
* reason,
* result,
* timestamp.

---

# 95. SCREENS 8–11 — STAFF MANAGEMENT

Includes:

* Staff List,
* Staff Invite,
* Permission Matrix,
* Staff Activity.

---

# 96. SCREEN 8 — STAFF LIST

Reference heading:

`Internal staff · 6`

Action:

`Invite staff`

Columns:

* STAFF
* PERMISSIONS
* STATUS

---

# 97. STAFF REFERENCE ROW 1

Initials:

`PN`

Name:

`Priya Nair`

Email:

`priya.n@mygujaratproperty.com`

Permission:

`Super Admin · all modules`

Status:

`Active`

---

# 98. STAFF REFERENCE ROW 2

Initials:

`KR`

Name:

`Kavita Rao`

Email:

`kavita.r@mygujaratproperty.com`

Permissions:

* Verification
* Moderation

Status:

`Active`

---

# 99. STAFF REFERENCE ROW 3

Initials:

`SJ`

Name:

`Sameer Jain`

Email:

`sameer.j@mygujaratproperty.com`

Permission:

`Support`

Status:

`Invited`

---

# 100. STAFF LIST COUNT

`Internal staff · 6`

Count must come from real:

* active,
* invited

Staff records according to final display definition.

---

# 101. STAFF STATUS

Support actual states:

* Invited
* Active
* Disabled
* Suspended

according to Staff model.

Do not show Active for unaccepted Invite.

---

# 102. STAFF LIST PAGINATION

Use pagination.

---

# 103. STAFF LIST MOBILE

Transform table rows to mobile cards.

Preserve:

* Staff identity,
* permission summary,
* status.

---

# 104. SCREEN 9 — STAFF INVITE FORM

Fields:

### Work email *

### Role template

Options:

* Verification Manager
* Support Manager
* Content Manager
* Billing Manager
* Custom…

Section:

`Module permissions`

Visible module options:

* Verification
* Moderation
* Users
* Support
* Billing
* System

Action:

`Send invite`

---

# 105. ROLE TEMPLATE FUNCTIONALITY

Role Template must prefill permission selections.

Examples:

Verification Manager
→ Verification + relevant Moderation access.

Support Manager
→ Support.

Content Manager
→ approved Content/CMS access.

Billing Manager
→ Billing.

Custom
→ manual permission selection.

Do not only save template label.

---

# 106. TEMPLATE IS STARTING CONFIGURATION

If Staff permission model permits editing after template selection:

the final saved permissions must reflect actual selected matrix.

Template name must not override custom edits unexpectedly.

---

# 107. WORK EMAIL VALIDATION

Validate:

* required,
* normalised lowercase,
* valid format,
* not existing Staff,
* no active duplicate Invite.

---

# 108. INVITATION SECURITY

Invite token must be:

* high entropy,
* hashed in database,
* expiry-bound,
* organisation/system scoped,
* single-use.

Never store raw token permanently.

---

# 109. INVITATION EXPIRY

Expired Invite cannot be accepted.

Support:

* Reinvite,
* Revoke

according to Staff management workflow.

---

# 110. INVITE EMAIL PROVIDER HONESTY

If Email provider is configured:

actually send.

If not configured:

* create Invitation safely if approved,
* show Setup Required/manual link behavior,
* never claim Email Sent.

---

# 111. CURRENT STAFF INVITE RECONCILIATION

Current foundation securely creates:

* hashed token,
* expiring Invite.

This is useful.

However, current implementation does not complete actual Email delivery even when environment indicates provider configuration.

Batch 11 requires real provider delivery or honest Setup Required state.

---

# 112. STAFF INVITE PERMISSION

Only appropriately authorised Staff may Invite Staff.

Do not unintentionally make all Staff Invite operations Super-Admin-only if Batch permission system grants Staff management rights to another authorised role.

Conversely:

do not allow ordinary Staff to invite privileged accounts.

---

# 113. SUPER ADMIN INVITE

Only Super Admin may invite another Super Admin unless a later explicit governance model changes this.

---

# 114. SCREEN 10 — PERMISSIONS EDITOR

Reference:

`Kavita Rao — permissions`

Notice:

`Changes apply on save · logged`

Columns:

* MODULE
* VIEW
* EDIT
* APPROVE

Reference module rows:

* Verification
* Moderation
* Users
* Billing

Action:

`Save changes`

---

# 115. PERMISSION MATRIX STATE

Each checkbox/toggle must show actual current permission.

Do not use a static template after Staff permissions have changed.

---

# 116. VIEW PERMISSION

Controls module list/detail read access.

---

# 117. EDIT PERMISSION

Controls operational modifications that are not final approval decisions.

---

# 118. APPROVE PERMISSION

Controls final decision capability where relevant.

For moderation/verification:

the implementation must align with the visible Batch decision model.

---

# 119. PERMISSION DEPENDENCY RULES

Prevent nonsensical combinations.

Example:

Approve = true
while View = false

should be either:

* automatically corrected,
* disallowed.

Define clear permission dependency behavior.

---

# 120. SUPER ADMIN MATRIX

The source explicitly states:

`Super Admin always sees everything shown here — the matrix can only restrict below that.`

For Super Admin:

* show immutable full access,
* do not allow accidentally removing core privileges.

---

# 121. SELF-PERMISSION ESCALATION

Staff cannot grant themselves additional access.

Server enforcement required.

---

# 122. GRANTER ESCALATION

Non-Super Admin cannot grant permission they do not possess, unless final governance design explicitly defines a delegated permission administrator.

---

# 123. PERMISSION SAVE ATOMICITY

Saving multiple Module rows should not leave partial random permission state.

Use transaction/batch RPC where appropriate.

---

# 124. PERMISSION AUDIT

Record safe diff:

* Staff target,
* module,
* old flags,
* new flags,
* actor,
* timestamp.

---

# 125. CURRENT PERMISSION MODEL RECONCILIATION

Current backend contains richer flags such as:

* read,
* create,
* update,
* approve,
* reject,
* delete,
* export,
* bulk,
* sensitive-data access,
* provider/security/payment/staff controls.

Do not expose a large unrelated permission matrix if Batch 11 shows only:

* View,
* Edit,
* Approve.

Map Batch 11 visible controls to the backend coherently.

Advanced specialist permissions may be handled in later relevant Admin screens, not randomly added here.

---

# 126. SCREEN 11 — STAFF ACTIVITY / AUDIT HISTORY

Reference activity entries:

### Approved listing

`#L-8842`

`(3 BHK, Satellite)`

`Today 11:42 IST · checklist 5/5 passed`

### Requested changes on

`#L-8839`

`Today 11:18 IST · "Phone number visible in photo 4"`

### Rejected verification

`#V-2210`

`Yesterday 17:05 IST · "Aadhaar name mismatch"`

### Approved claim

`#C-114`

`(Sankalp Developers)`

`Yesterday 15:30 IST`

---

# 127. STAFF ACTIVITY DATA

Use real Audit records.

Do not create a separate hard-coded activity stream.

---

# 128. ACTIVITY TARGET DISPLAY IDS

Use safe human-readable target references.

Examples:

* Listing display ID,
* Verification display ID,
* Claim display ID.

Do not expose raw UUID as primary UI.

---

# 129. CHECKLIST SUMMARY

Reference:

`checklist 5/5 passed`

This requires moderation Checklist state to be persisted or captured in audit.

Do not fabricate the count.

---

# 130. REASON EXCERPT

Example:

`Phone number visible in photo 4`

comes from actual Request Changes reason.

---

# 131. ACTIVITY FILTERING

Staff Activity screen should support the selected Staff member's actions.

Do not mix all Staff actions when viewing one Staff profile.

---

# 132. ACTIVITY PAGINATION

Use pagination/cursor.

Audit logs can become large.

---

# 133. AUDIT IMMUTABILITY

Staff Activity reads audit history.

Do not add edit/delete actions for historical audit events.

---

# 134. SCREENS 12–18 — MODERATION

The source establishes one shared moderation decision hierarchy.

Exact hierarchy:

1. Approve — Brand primary
2. Request Changes — Warning outline
3. Reject — Danger outline

Use this hierarchy consistently.

---

# 135. MODERATION REASON RULE

Reason required for:

* Reject,
* Request Changes / Need Changes.

Reason not required for normal Approve unless special exception requires it.

Server-side validation required.

---

# 136. MODERATION AUDIT RULE

Every action must be logged.

---

# 137. MODERATION NOTIFICATION RULE

After moderation decision:

notify the submitting user.

Examples:

Approved
→ Listing/Project/Requirement approved.

Request Changes
→ include actionable reason.

Rejected
→ include rejection reason.

No fake external delivery.

---

# 138. SCREEN 12 — PROPERTY MODERATION QUEUE

Reference heading:

`Pending review · 12`

Tabs:

* Pending
* Needs changes

---

# 139. PROPERTY QUEUE REFERENCE ROW 1

`3 BHK Apartment, Shrinand Residency — ₹85 L`

Submitted by:

`Rajesh Patel (Owner)`

Age:

`submitted 26 hrs ago`

Action:

`Review`

---

# 140. PROPERTY QUEUE REFERENCE ROW 2

`Plot 220 sq yd, Sanand GIDC — ₹38 L`

Submitted by:

`Kunal Bhatt (Broker)`

Age:

`22 hrs ago`

Action:

`Review`

---

# 141. QUEUE SORT ORDER

Oldest pending first.

This supports SLA management.

Do not sort newest first by default if Batch design prioritises oldest pending.

---

# 142. PENDING TAB

Show actual:

* pending,
* under-review

states according to moderation lifecycle.

Do not accidentally include Draft.

---

# 143. NEEDS CHANGES TAB

Show records currently awaiting user correction or resubmission according to product behavior.

---

# 144. POSITIVE EMPTY STATE

Reference:

`All caught up`

`Zero pending. Positive empty state.`

Do not show alarming empty copy.

---

# 145. QUEUE ERROR STATE

Reference:

`Couldn't load the queue.`

Action:

`Retry`

Retry actual query.

---

# 146. QUEUE PAGINATION

Use pagination.

Do not fetch unlimited moderation queue.

---

# 147. QUEUE LOCK / ASSIGNMENT

If multiple moderators can review simultaneously:

implement safe review ownership/locking or conflict detection.

Avoid:

Moderator A approves
while Moderator B rejects stale screen.

At minimum use status/version checks.

---

# 148. SCREEN 13 — PROPERTY MODERATION DETAIL

The source identifies this as:

**highest-frequency workflow**

It must be efficient and exact.

---

# 149. LISTING PUBLIC PREVIEW

Reference heading:

`LISTING PREVIEW — public rendering`

Reference content:

`6 photos`

`₹85 L`

`3 BHK Apartment, Shrinand Residency`

`Satellite, Ahmedabad · 1,450 sq ft · 7th floor`

Description:

`Spacious east-facing flat with covered parking…`

Action:

`full preview`

---

# 150. PUBLIC RENDERING RULE

The moderation preview must use the same rendering grammar/data mapping as the real public Listing page.

Do not create a simplified Admin-only fake preview that can hide:

* bad image order,
* contact leakage,
* formatting problems.

---

# 151. FULL PREVIEW

Open a safe moderation preview of the exact Listing.

It must not make Pending Listing publicly discoverable.

Use authenticated Staff preview route.

---

# 152. SUBMISSION METADATA

Reference:

`Submitted by Rajesh Patel (Owner) · 26 hrs ago · 1st submission`

Use actual:

* submitter,
* role,
* submission age,
* submission/revision number.

---

# 153. SUBMISSION NUMBER

Support:

* 1st submission,
* resubmission,
* edit reapproval revision

according to entity version history.

Do not always show first submission.

---

# 154. PROPERTY MODERATION CHECKLIST

Exact reference checklist:

1. Photos clear & relevant
2. Price reasonable for locality
3. No contact info in description
4. Location pin matches address
5. Not a duplicate

All items must be represented.

---

# 155. CHECKLIST INTERACTION

Checklist controls must be functional.

Track reviewer selections.

Do not render decorative check icons with no state.

---

# 156. APPROVE CHECKLIST GATE

Approval should require the mandatory checklist to be completed/passed according to moderation policy.

The audit example:

`checklist 5/5 passed`

must reflect actual review data.

---

# 157. PRICE REASONABLENESS

If no valuation provider/data exists:

do not fabricate automated market-price verdict.

Reviewer can manually evaluate using available context.

If comparable data later exists:

show honest source.

---

# 158. CONTACT INFO CHECK

The reviewer must be able to inspect:

* Description,
* media images

for contact leakage.

Automatic detection may assist but cannot be faked.

---

# 159. LOCATION PIN CHECK

If Maps provider is unavailable:

show available address/location data and honest Setup Required for map-specific validation.

Do not show fake map.

---

# 160. DUPLICATE CHECK

Connect to actual duplicate detection/review system.

Do not always default:

Not a duplicate = checked.

---

# 161. NOTES / REASON

Reference:

`Notes / reason`

Helper:

`(required for Reject / Request Changes)`

The same field supports:

* optional internal/decision context for approval if product permits,
* mandatory user-facing reason for negative decisions.

Clearly distinguish user-visible reason from internal-only Note if both are supported.

---

# 162. PROPERTY APPROVE

Required:

* decision permission,
* checklist gate,
* current moderation status check,
* publish state transition,
* reviewed-by Staff,
* approved timestamp,
* status event,
* notification,
* audit.

---

# 163. REQUEST CHANGES

Required:

* reason,
* state transition,
* user-visible correction reason,
* notification,
* audit.

---

# 164. REJECT

Required:

* reason,
* rejection state,
* hidden visibility,
* user Notification,
* audit.

---

# 165. STALE REVIEW PROTECTION

Before applying action:

verify record status/version still matches reviewed revision.

Do not approve a stale version after user resubmitted newer data.

---

# 166. SCREEN 14 — PROJECT MODERATION VARIANT

Project moderation uses the same queue/detail pattern as Property.

Additional RERA row.

Reference number:

`PR/GJ/SURAT/2019/0847`

Action:

`Verify`

State:

`Unverified`

---

# 167. PROJECT RERA APPROVAL GATE

Source rule:

**Project approval blocked until RERA verified or exception flagged.**

This is mandatory.

Do not approve Project simply because generic moderation checklist passes.

---

# 168. CURRENT PROJECT APPROVAL GAP

The current generic moderation approval action does not enforce the Batch 11 RERA gate.

Repair server-side approval logic.

Do not rely only on disabled button.

---

# 169. RERA VERIFICATION STATE

Support actual state such as:

* Unverified
* Under Review
* Verified
* Exception Approved

according to final model.

---

# 170. RERA VERIFY ACTION

`Verify`

opens the approved RERA verification context.

Use:

* uploaded proof,
* registration details,
* provider/manual verification

according to available configuration.

Do not fake verified result.

---

# 171. RERA EXCEPTION

Because the source allows:

`or exception flagged`

an exception requires:

* specialised permission,
* reason,
* actor,
* timestamp,
* audit.

Do not create a silent boolean.

---

# 172. PROJECT REVISION MODERATION

Batch 8 requires critical Project live edits to remain pending while old approved version stays public.

Project Moderation must review:

* current public version,
* pending revision,
* diff.

Do not approve Project edits by overwriting the public row before review.

---

# 173. PROJECT MODERATION APPROVE

On approval:

promote approved revision atomically.

Public query must switch to the new version.

---

# 174. SCREEN 15 — REQUIREMENT MODERATION VARIANT

Requirement moderation uses a lighter checklist.

Exact reference checks:

1. Genuine requirement (not spam)
2. No contact info in text

Same decision hierarchy:

* Approve
* Request Changes
* Reject

---

# 175. REQUIREMENT SPAM REVIEW

Use real content.

Do not auto-approve because Requirement is short.

---

# 176. CONTACT INFO IN REQUIREMENT

Ensure requester cannot bypass contact-sharing policy by placing mobile/email in free text.

---

# 177. REQUIREMENT MODERATION PERFORMANCE

Because this is a lighter workflow:

do not force the full five-point Property checklist.

Match source design.

---

# 178. SCREEN 16 — MISSING LOCATION QUEUE

Reference request:

`"Shela Extension" — Ahmedabad`

Supporting text:

`requested by 3 users · latest 1 Jul`

Action:

`Review`

---

# 179. LOCATION REQUEST AGGREGATION

Group equivalent requests safely.

Example:

* Shela Extension
* shela extension
* Shela Ext.

may require normalization/manual review.

Do not create three duplicate Location records blindly.

---

# 180. REQUEST COUNT

`requested by 3 users`

must be real.

---

# 181. LATEST REQUEST DATE

`latest 1 Jul`

must come from actual request records.

---

# 182. ADD TO LOCATION HIERARCHY FORM

Reference heading:

`ADD TO LOCATION HIERARCHY`

Reference parent selection:

`Parent: Ahmedabad West`

`Parent: Ahmedabad`

Actions:

* Approve & add location
* Reject

---

# 183. LOCATION HIERARCHY VALIDATION

Before adding:

* verify parent exists,
* verify hierarchy type is valid,
* prevent cycle,
* prevent duplicate sibling,
* normalise name.

---

# 184. LOCATION APPROVAL RESULT

Approved Location enters canonical hierarchy.

It becomes available to the public location selection flow according to final publication status.

---

# 185. LOCATION REQUEST LINKAGE

After approval:

mark related Missing Location requests resolved and linked to canonical Location.

Do not leave duplicate pending requests.

---

# 186. LOCATION REJECTION

Reject must persist decision.

Use reason where moderation policy requires.

Do not delete request history.

---

# 187. LOCATION AUDIT

Record:

* name,
* parent,
* actor,
* source request group,
* result.

---

# 188. SCREEN 17 — DUPLICATE / MERGE REVIEW

The source defines:

**field-level keep selectors**

This is not a one-button blind merge.

Reference columns:

* FIELD
* #L-8842 (older)
* #L-8901 (newer)

---

# 189. PRICE FIELD

Reference:

Older:

`₹85 L`

Newer:

`₹87 L`

Reviewer chooses which value to keep.

---

# 190. PHOTOS FIELD

Reference:

Older:

`6 photos`

Newer:

`9 photos`

Helper:

`keep both available`

The merge system must support media selection/combination.

---

# 191. DESCRIPTION FIELD

Reference:

Older:

`Longer, verified`

Newer:

`Short`

Reviewer chooses final Description.

---

# 192. FIELD-LEVEL MERGE PLAN

Before Merge, create a structured merge plan.

Example:

* Price from older,
* Description from older,
* selected Photos from both.

Do not perform uncontrolled object spread.

---

# 193. CANONICAL LISTING RULE

Source:

`Merging keeps #L-8842 live and archives #L-8901.`

The older Listing remains canonical.

The newer Listing becomes archived duplicate.

---

# 194. MERGE RELATIONSHIP INTEGRITY

Preserve or map related:

* Leads,
* Saved Items,
* analytics references,
* share links,
* moderation history

according to product architecture.

Do not orphan relationships.

---

# 195. DUPLICATE ROUTING

If users open the archived duplicate through an old permitted route:

redirect or explain canonical Listing according to product policy.

Do not show two competing live Listings.

---

# 196. MERGE REVERSIBILITY

Source:

`Logged + reversible for 30 days.`

This is mandatory.

Store:

* merge snapshot,
* original values,
* selected values,
* canonical Listing,
* archived Listing,
* actor,
* merge timestamp,
* reversal expiry.

---

# 197. UNMERGE / REVERSAL

During 30-day reversal window:

authorised Staff can restore the pre-merge state.

The reversal must be transaction-safe.

---

# 198. AFTER REVERSAL WINDOW

After 30 days:

normal one-click reversal is no longer available.

Audit history remains.

Do not delete merge audit.

---

# 199. MERGE CONFIRMATION

Action:

`Merge listings…`

must open confirmation summarising:

* canonical Listing,
* archived duplicate,
* selected field choices,
* reversal window.

---

# 200. MERGE TRANSACTION

Use transaction/RPC or durable merge orchestration.

Do not leave:

canonical fields updated
but duplicate still Live.

---

# 201. SCREEN 18 — CLAIM REQUEST REVIEW

Reference:

`Claim: "Sankalp Developers"`

Requester:

`Nirav Sankalp (Director)`

Date:

`30 Jun`

Document:

`RERA certificate.pdf — private viewer`

Watermark:

`MGP ADMIN · KR`

Actions:

* Approve claim
* Reject

---

# 202. CLAIM REQUEST PURPOSE

Claim flow connects a verified claimant to an existing public business/Builder profile.

Do not create a duplicate Builder profile on approval.

---

# 203. CLAIM IDENTITY VALIDATION

Review should evaluate actual evidence linking claimant to claimed profile/company.

Examples:

* company document,
* RERA evidence,
* authorised representative evidence.

Do not approve based only on matching name.

---

# 204. PRIVATE DOCUMENT VIEWER

Source rules:

* private viewer,
* watermarked per viewer,
* never downloadable,
* action logged.

Implement a protected viewing flow.

---

# 205. DOCUMENT WATERMARK

Watermark includes current Staff viewer identity.

Reference:

`MGP ADMIN · KR`

Generate per viewer/session.

Do not use one static watermark for all Staff.

---

# 206. PRIVATE DOCUMENT ACCESS

Requirements:

* Staff permission,
* Claim Review relationship,
* short-lived protected access,
* view event audit.

Do not expose public Storage URL.

---

# 207. NO DOWNLOAD CONTROL

Do not provide a Download button for Claim evidence.

Use protected viewer behavior.

Do not claim technological impossibility of screenshots; implement the source-required non-downloadable application flow.

---

# 208. DOCUMENT VIEW AUDIT

Log:

* viewer,
* document,
* Claim,
* timestamp.

---

# 209. CLAIM APPROVAL

Approval must:

* verify pending status,
* attach claimant/Profile to claimed organisation/profile according to role model,
* preserve original public profile identity,
* mark Claim approved,
* notify claimant,
* audit.

---

# 210. CLAIM REJECTION

Require reason according to moderation policy.

Notify claimant safely.

---

# 211. CLAIM CONCURRENCY

Prevent two conflicting Claim Requests from both becoming owner of the same profile without conflict resolution.

---

# 212. SCREENS 19–20 — VERIFICATION MANAGEMENT

The current Verification placeholder/foundation is insufficient for Batch 11.

Batch 11 requires:

* queue,
* document metadata,
* private viewer,
* decision workflow,
* badge preview,
* reason-required negative decisions.

---

# 213. SCREEN 19 — VERIFICATION REQUEST QUEUE

Columns:

* APPLICANT
* DOCUMENT
* DATE

Reference row 1:

`Kunal Bhatt`

Role:

`Broker`

Documents:

`Aadhaar + GST cert`

Date:

`2 Jul`

Reference row 2:

`Meena Trivedi`

Role:

`Owner`

Documents:

`Aadhaar + sale deed`

Date:

`1 Jul`

---

# 214. VERIFICATION QUEUE DATA

Queue must be based on real Verification Request records.

Do not derive the full workflow only from:

`profiles.verification_status`.

A Request needs:

* applicant,
* role,
* submission,
* document set,
* review status,
* review history.

---

# 215. CURRENT VERIFICATION GAP

Current Verification foundation only lists Profiles with Pending/Under Review status and explicitly has no document review/approval workflow.

Batch 11 requires the complete document-based Verification system.

---

# 216. VERIFICATION QUEUE SORT

Use oldest pending first where operationally appropriate.

Preserve exact source layout.

---

# 217. DOCUMENT SUMMARY

`Aadhaar + GST cert`

must derive from actual submitted document types.

Do not use hard-coded string.

---

# 218. VERIFICATION PAGINATION

Use pagination.

---

# 219. SCREEN 20 — VERIFICATION DETAIL

Reference:

Initials:

`KB`

Applicant:

`Kunal Bhatt — broker verification`

Reference ID:

`#V-2214`

Metadata:

`submitted 2 Jul`

Documents:

* aadhaar.pdf
* gst-cert.pdf

Watermark:

`MGP · KR`

---

# 220. VERIFICATION PRIVATE VIEWER

Verification identity documents are sensitive.

Required:

* private Storage,
* no public URL,
* authorised Staff access,
* per-viewer watermark,
* access audit.

---

# 221. BADGE PREVIEW

Reference:

`On approval, profile shows:`

Badge:

`Verified`

This is a Preview only.

Do not set public Verified status before Approval.

---

# 222. VERIFICATION DECISION REASON

Field:

`Reason`

Helper:

`(required for Reject / Need Changes)`

Actions:

* Approve
* Need Changes
* Reject

---

# 223. VERIFICATION APPROVE

Must:

* verify Staff decision permission,
* verify Request pending/current,
* verify required documents reviewed,
* set Request approved,
* update Profile Verification status,
* create public badge state,
* notification,
* audit.

---

# 224. NEED CHANGES

Must:

* require reason,
* persist reason,
* set Request state,
* notify applicant,
* allow re-upload/resubmit,
* preserve previous evidence history.

---

# 225. REJECT

Must:

* require reason,
* persist rejection,
* update Profile status coherently,
* notify applicant,
* preserve review audit.

---

# 226. MULTIPLE DOCUMENT TYPES

A Verification Request may contain:

* Aadhaar,
* GST Certificate,
* Sale Deed,
* RERA documents,
* approved role-specific documents.

Do not force one file field.

---

# 227. DOCUMENT-LEVEL REVIEW

Where appropriate, track each document's review state.

Example:

Aadhaar approved
GST cert needs changes.

The overall Verification Request state should reflect required document results.

---

# 228. ROLE-SPECIFIC VERIFICATION

Owner, Broker and Builder have different evidence requirements.

Do not use one identical required document set.

---

# 229. VERIFICATION BADGE REVOCATION

If Verification is later revoked/expired:

public badge must update.

Audit history remains.

---

# 230. SCREENS 21–22 — SUPPORT

Batch 11 requires a real Support system.

Current Setup Required placeholder must be removed.

---

# 231. SCREEN 21 — SUPPORT TICKET QUEUE

Columns:

* TICKET
* PRIORITY
* STATUS
* ASSIGNED

---

# 232. SUPPORT ROW 1

Title:

`Payment deducted twice`

Reference:

`#T-901 · Kunal Bhatt · 40 min ago`

Priority:

`High`

Status:

`Open`

Assigned:

`SJ`

---

# 233. SUPPORT ROW 2

Title:

`Can't edit listing photos`

Reference:

`#T-899 · Rajesh Patel · 3 hrs ago`

Priority:

`Normal`

Status:

`Replied`

Assigned:

`SJ`

---

# 234. SUPPORT TICKET DATA MODEL

Ticket requires:

* display reference,
* requester,
* role,
* category,
* subject,
* priority,
* status,
* assigned Staff,
* created time,
* updated time.

---

# 235. TICKET PRIORITY

Support:

* High,
* Normal,

and other approved priority levels if final product defines them.

Do not infer priority only from subject text unless an approved rule exists.

---

# 236. TICKET STATUS

At minimum support states needed by source:

* Open
* Replied

and lifecycle states such as:

* In Progress
* Waiting on User
* Escalated
* Resolved

according to final support architecture.

---

# 237. TICKET ASSIGNMENT

Assigned Staff must have Support permission.

Do not assign to arbitrary Staff without access.

---

# 238. SUPPORT QUEUE PERMISSION

Only authorised Support Staff may access Ticket queue and private messages.

Locked Support card for other Staff must not reveal count.

---

# 239. SUPPORT QUEUE PAGINATION

Use pagination.

---

# 240. SUPPORT QUEUE MOBILE

Transform table rows to cards.

Preserve:

* Ticket title,
* requester,
* age,
* priority,
* status,
* assigned Staff.

---

# 241. SCREEN 22 — TICKET DETAIL

Reference heading:

`#T-901 · Payment deducted twice`

Context:

`Kunal Bhatt · Broker · Basic plan`

Actions:

* Escalate
* Resolve

---

# 242. BILLING CONTEXT IN SUPPORT

Reference Ticket is Payment-related.

Support detail may show safe Billing context only when Staff permission/policy allows it.

Do not expose full Payment secrets.

Safe summary may include:

* current Plan,
* safe Payment reference,
* Payment status.

---

# 243. TICKET MESSAGE 1

Reference user message:

`I was charged ₹1,752 twice for the Premium upgrade today. UPI ref 6178… and 6180…`

Author:

`Kunal · 12:04`

Use actual Ticket conversation data.

---

# 244. TICKET MESSAGE 2

Reference support reply:

`Sorry about that! I can see the duplicate charge — the second payment is already queued for auto-refund (5–7 business days). I'll follow up with the reference number shortly.`

Author:

`Sameer (Support) · 12:11`

This reply may only be sent when actual Billing state supports it.

Do not tell users a Refund is queued if no Refund exists.

---

# 245. SUPPORT THREAD

Support Ticket Detail requires a real message thread.

Support replies must persist.

Do not use static text cards.

---

# 246. SUPPORT THREAD AUTHORSHIP

Display:

* User,
* Support Staff,
* timestamps.

---

# 247. SUPPORT REPLY COMPOSER

Because macros insert canned response into reply, the screen requires a real Reply composer.

Macro does not auto-send.

Staff can:

* select macro,
* edit text,
* send.

---

# 248. SUPPORT MACRO 1

`Macro: Refund timeline`

Inserts approved Refund timeline response.

---

# 249. SUPPORT MACRO 2

`Macro: Ask for payment ref`

Inserts request for safe Payment reference.

---

# 250. SUPPORT MACRO 3

`Macro: Escalation notice`

Inserts approved Escalation explanation.

---

# 251. MACRO INSERT RULE

Selecting a macro:

* inserts text into composer,
* does not immediately send,
* allows editing.

---

# 252. MACRO CONTENT MANAGEMENT

Macro content should come from controlled Support configuration/data.

Do not scatter hard-coded canned replies across components.

---

# 253. ESCALATE ACTION

`Escalate`

must:

* set Escalated status,
* assign or route to appropriate specialist queue,
* preserve current assignee/history,
* log action,
* optionally notify internal specialist.

Example:

Payment issue
→ Billing/Payment Manager queue.

---

# 254. RESOLVE ACTION

`Resolve`

must:

* update Ticket status,
* record resolver,
* timestamp,
* optionally require Resolution Note according to final policy,
* notify user.

---

# 255. TICKET REOPEN

If user replies after Resolution and product policy allows:

reopen automatically or through defined state.

Do not silently discard reply.

---

# 256. SUPPORT ATTACHMENTS

If User support flow permits attachments:

Ticket Detail must display authorised attachments safely.

Do not use public unrestricted URLs for private evidence.

---

# 257. SUPPORT SEARCH / FILTER FOUNDATION

Even if not explicitly shown in the source crop, the queue must remain scalable.

At minimum server architecture should support:

* status,
* priority,
* assignee

where later Admin flow requires it.

Do not add conflicting visible UI beyond the Batch design.

---

# 258. CURRENT SUPPORT GAP

Current Admin Support route is only a Setup Required placeholder.

Batch 11 requires:

* Ticket table,
* assignment,
* priority,
* status,
* thread,
* reply,
* macros,
* Escalate,
* Resolve.

Build the full system.

---

# 259. ADMIN NOTIFICATION INTEGRATION

Batch 11 actions that affect public users must create real Notifications.

Includes:

* Suspension,
* Ban where user notification policy allows,
* Role Change approval/rejection,
* Moderation approval,
* Request Changes,
* Rejection,
* Claim decision,
* Verification decision,
* Support reply,
* Ticket resolution.

---

# 260. EXTERNAL DELIVERY HONESTY

If Email/SMS/Push provider unavailable:

do not claim delivery.

The Admin action itself may still succeed with in-app Notification.

---

# 261. ADMIN ACTION DUPLICATE PROTECTION

Every decision action must protect against repeated submissions.

Examples:

* Approve clicked twice,
* Reject double click,
* Claim Approve retry,
* Verification Approve retry,
* Role Change Approve retry,
* Merge retry.

Use:

* client disabled state,
* server status check,
* idempotency/transaction where required.

---

# 262. ADMIN STALE DATA PROTECTION

Before final decision:

verify the record version/status has not changed since screen load.

Use:

* revision number,
* updated timestamp,
* status condition.

Do not approve stale revision.

---

# 263. ADMIN REASON TEXT SAFETY

Reason text can be user-visible.

Validate:

* length,
* safe content,
* no unsafe HTML.

---

# 264. ADMIN INTERNAL NOTE SEPARATION

Separate:

### User-visible Decision Reason

from:

### Internal Staff Note

Do not accidentally expose internal fraud/security comments to public user.

---

# 265. CURRENT REPOSITORY RECONCILIATION — ADMIN SHELL

Current Admin Shell already has useful:

* desktop sidebar,
* mobile drawer,
* no bottom nav.

Preserve compatible shell behavior.

Re-style/adjust only as needed to exactly match Batch 1 + Batch 11.

Do not rebuild secure working behavior unnecessarily.

---

# 266. CURRENT REPOSITORY RECONCILIATION — OVERVIEW

Current Overview is generic and not fully permission-aware.

Replace with Batch 11 queue-card system.

---

# 267. CURRENT REPOSITORY RECONCILIATION — LOCKED NAV

Current Admin navigation has a useful disabled-module foundation.

Ensure final implementation also provides:

* correct tooltip,
* correct locked counts behavior,
* direct-route Forbidden page.

---

# 268. CURRENT REPOSITORY RECONCILIATION — USER PII

Current User list/detail actions expose full Profile email/mobile too broadly.

Fix with server-side permission-aware projection.

This is a release blocker.

---

# 269. CURRENT REPOSITORY RECONCILIATION — USER FILTERS

Current User List lacks complete Batch 11 fields/filters.

Add:

* City filter,
* Joined filter,
* Contact column with masking,
* City column.

---

# 270. CURRENT REPOSITORY RECONCILIATION — SUSPENSION

Current Suspend/Ban action only changes Profile account status.

Batch 11 requires coordinated:

* Listing visibility,
* active Lead pause,
* user Notification,
* temporary expiry,
* restoration behavior.

---

# 271. CURRENT REPOSITORY RECONCILIATION — MODERATION

Current generic moderation action foundation is useful.

Preserve:

* permission checks,
* mandatory reasons,
* status events,
* audit.

Extend with:

* exact queue/detail UI,
* Checklist state,
* public Preview,
* RERA approval gate,
* Revision protection,
* Notifications.

---

# 272. CURRENT REPOSITORY RECONCILIATION — MODERATION PERMISSIONS

Current Request Changes may rely on the same internal reject permission.

Ensure this maps coherently to the Batch 11 visible:

View / Edit / Approve

permission model.

No hidden-action mismatch.

---

# 273. CURRENT REPOSITORY RECONCILIATION — MODERATION COUNTS

Current moderation count function can query Property, Project and Requirement counts from one Property-read entry point.

Final dashboard aggregation must be module-permission aware.

A Staff user must not gain counts for modules they cannot access.

---

# 274. CURRENT REPOSITORY RECONCILIATION — STAFF INVITE

Preserve secure:

* hashed Invite token,
* expiry,
* duplicate Staff checks.

Complete:

* role template,
* module permission selection,
* real Email delivery or honest Setup Required.

---

# 275. CURRENT REPOSITORY RECONCILIATION — STAFF PERMISSIONS

Current permission schema is richer than Batch 11 visible matrix.

Map exact source matrix without adding confusing hidden UI.

---

# 276. CURRENT REPOSITORY RECONCILIATION — VERIFICATION

Current Verification page explicitly states document review is Setup Required.

Batch 11 requires complete:

* Verification Request records,
* document viewer,
* badge preview,
* Approve,
* Need Changes,
* Reject.

Remove placeholder.

---

# 277. CURRENT REPOSITORY RECONCILIATION — SUPPORT

Current Support Admin route is a placeholder.

Replace with Batch 11 Screens 21–22.

---

# 278. CURRENT REPOSITORY RECONCILIATION — MISSING MODULES

Explicitly verify and implement where absent:

* Role Change Queue,
* Role Change Detail,
* Missing Location Queue,
* Duplicate Merge,
* Claim Review.

Do not mark Batch 11 complete because other moderation screens exist.

---

# 279. USER SUSPENSION DATA MODEL REQUIREMENTS

Support:

* status,
* suspension type,
* reason,
* suspended by,
* suspended at,
* expires at,
* restored at,
* restore actor/reason.

Do not encode all behavior only in a Note string.

---

# 280. ROLE CHANGE DATA MODEL REQUIREMENTS

Support:

* Profile,
* from role,
* target role,
* reason,
* status,
* submitted at,
* reviewed at,
* reviewer,
* rejection reason,
* migration status where needed.

---

# 281. MODERATION CHECKLIST DATA MODEL

Support:

* entity type,
* entity ID/revision ID,
* reviewer,
* checklist item key,
* result,
* timestamp.

Or store an immutable structured review snapshot.

---

# 282. RERA EXCEPTION DATA MODEL

Support:

* Project/revision,
* exception reason,
* granted by,
* granted at.

---

# 283. MISSING LOCATION REQUEST DATA MODEL

Support:

* requested text,
* normalized text,
* city/parent context,
* requester,
* status,
* canonical Location ID,
* timestamps.

---

# 284. DUPLICATE MERGE DATA MODEL

Support:

* canonical entity,
* duplicate entity,
* merge plan,
* before snapshots,
* merge result,
* actor,
* merged at,
* reversible until,
* reversed at,
* reverse actor.

---

# 285. CLAIM REQUEST DATA MODEL

Support:

* claimant Profile,
* target Profile/company entity,
* relationship statement,
* evidence Documents,
* status,
* reviewer,
* reason,
* timestamps.

---

# 286. VERIFICATION REQUEST DATA MODEL

Support:

* applicant,
* role context,
* request type,
* status,
* document relations,
* submitted at,
* reviewer,
* reviewed at,
* reason.

---

# 287. VERIFICATION DOCUMENT DATA MODEL

Support:

* request ID,
* document type,
* private media reference,
* version,
* status,
* reviewer.

---

# 288. SUPPORT TICKET DATA MODEL

Support:

* display ID,
* requester,
* category,
* subject,
* priority,
* status,
* assignee,
* created/updated/resolved timestamps.

---

# 289. SUPPORT MESSAGE DATA MODEL

Support:

* Ticket ID,
* sender type,
* sender Profile/Staff,
* body,
* attachment relation where allowed,
* timestamp.

---

# 290. SUPPORT MACRO DATA MODEL

Support:

* name,
* category,
* body,
* active state,
* display order.

Batch 14 CMS may later manage related content where appropriate.

---

# 291. PRIVATE DOCUMENT SECURITY RULE

Sensitive documents in:

* Claims,
* Verification

must use private storage.

Never expose through:

* public bucket URL,
* predictable permanent URL.

---

# 292. PRIVATE VIEWER ACCESS TOKEN

Use:

* short-lived access,
* server authorisation,
* current Staff viewer identity.

---

# 293. WATERMARK RULE

Watermark should identify viewer.

Examples:

`MGP ADMIN · KR`

`MGP · KR`

Use exact visual pattern from respective design screen.

---

# 294. DOCUMENT VIEW AUDIT

Every private document view should create a safe access audit record.

---

# 295. SENSITIVE DOCUMENT CACHE

Prevent inappropriate public caching.

Use private response headers and protected access.

---

# 296. EXPORT RESTRICTION

Do not expose verification/claim documents through generic user exports unless legal product policy explicitly requires a secure user-owned copy.

---

# 297. RESPONSIVE VERIFICATION MATRIX

Test at minimum:

* 360px,
* 390px reference mobile,
* tablet portrait,
* tablet landscape,
* laptop,
* 1280px desktop,
* wide desktop.

---

# 298. ADMIN OVERVIEW RESPONSIVE CHECK

Verify:

* Queue cards,
* disabled cards,
* tooltip access,
* contextual mobile header,
* drawer,
* no bottom navigation.

---

# 299. USER LIST RESPONSIVE CHECK

Desktop:

table.

Mobile:

cards.

Preserve:

* User,
* Role,
* masked Contact,
* City,
* Status.

---

# 300. USER DETAIL RESPONSIVE CHECK

Verify:

* profile header,
* badges,
* tabs,
* Suspend/Ban action,
* long metadata.

No horizontal page overflow.

---

# 301. SUSPEND MODAL RESPONSIVE CHECK

Desktop:

dialog.

Mobile:

approved bottom sheet/dialog pattern according to shared overlay foundation.

Verify:

* option selection,
* reason field,
* action hierarchy.

---

# 302. STAFF LIST RESPONSIVE CHECK

Desktop table.

Mobile cards.

---

# 303. STAFF INVITE RESPONSIVE CHECK

Verify:

* Work Email,
* Template,
* permission controls,
* Send Invite.

Keyboard must not hide action.

---

# 304. PERMISSION MATRIX RESPONSIVE CHECK

Desktop matrix must remain clear.

On mobile:

use safe responsive presentation while preserving:

* Module,
* View,
* Edit,
* Approve.

Do not produce unreadable tiny table.

---

# 305. MODERATION QUEUE RESPONSIVE CHECK

Desktop queue rows.

Mobile cards with:

* title,
* submitter,
* age,
* status,
* Review.

Same dataset.

---

# 306. MODERATION DETAIL RESPONSIVE CHECK

Verify:

* public preview,
* media,
* metadata,
* checklist,
* Notes/Reason,
* action hierarchy.

No sticky action overlap.

---

# 307. DUPLICATE MERGE RESPONSIVE CHECK

Field comparison must remain understandable.

On narrow screens:

preserve older/newer comparison clearly.

Do not collapse values into ambiguous text.

---

# 308. PRIVATE VIEWER RESPONSIVE CHECK

Claim and Verification documents must remain viewable safely on mobile/tablet.

No Download button.

Watermark remains visible.

---

# 309. SUPPORT QUEUE RESPONSIVE CHECK

Desktop table to mobile cards.

---

# 310. TICKET DETAIL RESPONSIVE CHECK

Verify:

* context,
* thread,
* Macros,
* Reply composer,
* Escalate,
* Resolve.

Keyboard safe.

---

# 311. TEXT WRAPPING VERIFICATION

Inspect:

* long User names,
* Role Change reason,
* Staff emails,
* permission module labels,
* Listing titles,
* Moderation reasons,
* RERA numbers,
* Missing Location names,
* Claim company names,
* document names,
* Support Ticket subjects,
* Macro labels.

Fix:

* clipping,
* overlapping badge,
* unwanted two-line buttons,
* hidden status text.

Do not randomly reduce typography.

---

# 312. LOADING STATES

Required for:

* Overview,
* User List,
* User Detail,
* Role Change Queue,
* Staff List,
* Staff Detail/Permissions,
* Activity History,
* Moderation Queues,
* Moderation Detail,
* Missing Locations,
* Duplicate Review,
* Claim Review,
* Verification Queue,
* Verification Detail,
* Support Queue,
* Ticket Detail.

Use screen-shaped skeletons.

---

# 313. EMPTY STATES

Required:

* no User filter matches,
* no Role Change requests,
* no Staff Invite records where applicable,
* zero moderation pending,
* no Missing Locations,
* no duplicate review cases,
* no Claim requests,
* no Verification requests,
* no Support Tickets.

Use positive/actionable state where source defines.

---

# 314. ERROR STATES

Support safe errors for:

* Overview queue card,
* User load,
* permission save,
* Invite failure,
* moderation queue,
* moderation action,
* private document viewer,
* merge failure,
* verification decision,
* Support reply.

Do not expose raw SQL/storage errors.

---

# 315. OVERLAY VERIFICATION

Test:

* Suspend/Ban dialog,
* Role Change reject reason,
* Staff Invite modal/page behavior,
* moderation reason dialog where used,
* merge confirmation,
* Claim reject,
* Verification negative decision,
* Resolve/Escalate confirmation where defined.

Check:

* Escape,
* outside click,
* focus,
* body scroll,
* duplicate submit,
* mobile keyboard.

---

# 316. NO DEAD UI RULE

Every visible Batch 11 action must work.

This includes:

* Queue cards,
* locked tooltips,
* Back to Dashboard,
* User Search,
* Role filter,
* Status filter,
* City filter,
* Joined filter,
* User row,
* User tabs,
* Suspend/Ban,
* Temporary Suspension,
* Permanent Ban,
* Role Change Approve,
* Role Change Reject,
* Invite Staff,
* Role Templates,
* Module Permissions,
* Send Invite,
* Permission Matrix,
* Save Changes,
* Activity target links,
* Moderation tabs,
* Review,
* Retry,
* Full Preview,
* Checklist,
* Approve,
* Request Changes,
* Reject,
* RERA Verify,
* Missing Location Review,
* Approve & Add Location,
* Location Reject,
* Merge Listings,
* Claim Approve,
* Claim Reject,
* private document viewer,
* Verification row,
* Verification documents,
* Need Changes,
* Ticket row,
* Escalate,
* Resolve,
* Support Macro,
* Reply Send.

No:

`href="#"`.

No empty click handlers.

---

# 317. ADMIN ROUTE SECURITY TESTS

Test:

### Verification Manager

Can access:

* allowed Verification,
* granted Moderation modules.

Cannot access:

* Billing,
* Staff Roles if not granted,
* Support if not granted.

### Support Manager

Can access:

* Support.

Cannot access:

* Verification documents unless granted.

### Billing Manager

Can access Billing in later Batch.

Cannot inspect private Identity documents unless granted.

### Super Admin

Full access.

---

# 318. USER PII SECURITY TEST

Sign in as Verification Manager.

Open User List.

Verify:

* phone masked,
* email masked/hidden according to design,
* network payload contains no full phone/email.

Then sign in as User Manager.

Verify authorised full contact view.

---

# 319. SUSPENSION CONNECTED TEST

Suspend test Broker for 30 days.

Verify:

* account status,
* posting blocked,
* eligible Listings hidden,
* active Lead operations paused according to policy,
* Notification created,
* expiry stored,
* audit created.

Restore.

Verify correct eligible state returns.

---

# 320. ROLE CHANGE CONNECTED TEST

Owner
→ request Broker role
→ Admin Queue
→ Detail
→ Approve
→ role changes
→ correct Dashboard access
→ subscription migration state
→ verification requirements
→ existing Listing preserved.

Test Rejection separately.

---

# 321. STAFF PERMISSION CONNECTED TEST

Invite test Staff
→ accept Invite in Development flow
→ assign Verification View/Edit/Approve
→ login as Staff
→ verify exact route/action access
→ remove Approve
→ verify Approve action denied server-side.

---

# 322. PROPERTY MODERATION CONNECTED TEST

Create Pending Property
→ queue appears
→ open Review
→ Preview
→ Checklist
→ Request Changes without reason fails
→ add reason
→ submit
→ user notified
→ user resubmits
→ queue reappears
→ approve
→ public Listing live
→ audit checklist summary.

---

# 323. PROJECT RERA GATE TEST

Create pending Project with Unverified RERA.

Attempt Approve:

must fail.

Verify RERA or create authorised exception with reason.

Approve.

Verify public Project appears only after valid decision.

---

# 324. REQUIREMENT MODERATION TEST

Pending Requirement
→ two-point checklist
→ Approve.

Test contact info violation:

→ Request Changes with reason.

---

# 325. MISSING LOCATION TEST

Three users request equivalent missing Location.

Verify:

* one aggregated queue item,
* request count 3,
* latest date real.

Approve under correct parent.

Verify:

* canonical Location created once,
* requests resolved,
* location selectable in application.

---

# 326. DUPLICATE MERGE TEST

Create older/newer duplicate Listings.

Select:

* Price older,
* Photos both,
* Description older.

Merge.

Verify:

* older Live,
* newer Archived,
* selected fields correct,
* Leads/references safe,
* audit exists,
* reversible-until date.

Reverse during test window.

Verify original states restore.

---

# 327. CLAIM REVIEW TEST

Create Claim fixture with private RERA proof.

Login as authorised reviewer.

Verify:

* document private,
* watermark contains reviewer,
* no Download action,
* view audit created.

Approve test Claim.

Verify ownership relationship changes correctly.

---

# 328. VERIFICATION TEST

Submit Broker Verification with Aadhaar + GST Certificate.

Admin queue shows exact Document summary.

Open detail.

Verify:

* private files,
* watermark,
* badge Preview only.

Need Changes:

reason required.

Resubmit.

Approve.

Verify public Profile receives actual Verified state.

---

# 329. SUPPORT TEST

User submits Payment Support Ticket.

Support Manager:

→ queue
→ open Ticket
→ use Ask Payment Ref Macro
→ edit response
→ send
→ user sees response
→ Escalate to Billing
→ verify routing
→ Resolve
→ user notified.

No fake billing statements.

---

# 330. REFERENCE DATA REQUIREMENT

Create persistent development/reference data through real tables for visual verification.

Do not hard-code Batch sample data in UI.

Do not automatically delete reference data after verification.

---

# 331. REFERENCE STAFF DATA

Create reference Staff fixtures:

### Priya Nair

Role:

Super Admin.

Status:

Active.

### Kavita Rao

Role:

Verification Manager.

Permissions:

Verification + Moderation.

Status:

Active.

### Sameer Jain

Role:

Support Manager.

Status fixture:

Invited or Active depending tested screen.

---

# 332. REFERENCE USER DATA

Create:

### Rajesh Patel

Owner
Ahmedabad
Active.

### Kunal Bhatt

Broker
Ahmedabad
Verified.

### Vipul Desai

Broker
Surat
Suspended fixture.

---

# 333. REFERENCE ROLE REQUESTS

Create:

### Meena Trivedi

Owner → Broker.

Reason matching Batch reference scenario.

### Haresh Joshi

Broker → Builder.

---

# 334. REFERENCE MODERATION DATA

Create Pending fixtures:

* Shrinand Residency Property,
* Sanand GIDC Plot,
* Project with RERA check pending,
* Requirement with lightweight checklist.

---

# 335. REFERENCE LOCATION REQUEST

Create grouped requests for:

`Shela Extension`

Ahmedabad context.

Use three request records.

---

# 336. REFERENCE DUPLICATES

Create:

Older Listing:

`#L-8842`-style display reference.

Newer duplicate:

`#L-8901`-style display reference.

Use actual real records.

---

# 337. REFERENCE CLAIM

Create Claim fixture:

Company:

`Sankalp Developers`

Claimant:

`Nirav Sankalp`

Relationship:

Director.

Private RERA Certificate fixture.

---

# 338. REFERENCE VERIFICATION

Create:

Kunal Bhatt Broker Verification:

* Aadhaar fixture,
* GST Certificate fixture.

Meena Trivedi Owner Verification:

* Aadhaar,
* Sale Deed.

All files remain private.

---

# 339. REFERENCE SUPPORT TICKETS

Create:

### Payment deducted twice

High priority
Open
Assigned Sameer fixture.

### Can't edit listing photos

Normal
Replied
Assigned Sameer fixture.

Use actual Ticket records and messages.

---

# 340. REFERENCE DATA NON-DELETION

User explicitly requires reference data to remain after verification.

Do not automatically delete:

* Staff fixtures,
* Role Change fixtures,
* Moderation fixtures,
* Location requests,
* Claims,
* Verification fixtures,
* Support Tickets.

Sensitive test documents must remain private.

---

# 341. SCREEN 1 FINAL CHECKLIST

* [ ] Graphite Admin shell
* [ ] role-aware Overview
* [ ] Kavita-style fixture through DB
* [ ] Property Moderation card
* [ ] exact count
* [ ] oldest pending age
* [ ] Verification count
* [ ] role breakdown
* [ ] Claim count
* [ ] Project count
* [ ] RERA-awaiting count
* [ ] Missing Location count
* [ ] Support locked state
* [ ] no sensitive locked count leak
* [ ] tooltip
* [ ] accessible card routing
* [ ] mobile header
* [ ] mobile drawer
* [ ] no bottom nav

---

# 342. SCREEN 2 FINAL CHECKLIST

* [ ] direct URL permission denial
* [ ] full Forbidden page
* [ ] dynamic Module name
* [ ] permission explanation
* [ ] Back to Dashboard
* [ ] no protected data query before denial

---

# 343. SCREEN 3 FINAL CHECKLIST

* [ ] Search name
* [ ] Search phone
* [ ] Search email
* [ ] Role filter
* [ ] Status filter
* [ ] City filter
* [ ] Joined filter
* [ ] User column
* [ ] Role column
* [ ] Contact column
* [ ] City column
* [ ] Status column
* [ ] masked contact
* [ ] server-side PII projection
* [ ] authorised User Manager full contact
* [ ] pagination
* [ ] loading
* [ ] empty
* [ ] error
* [ ] mobile cards

---

# 344. SCREENS 4–5 FINAL CHECKLIST

* [ ] User header
* [ ] Role
* [ ] Verified badge
* [ ] joined metadata
* [ ] City
* [ ] Active Listing count
* [ ] Listings tab
* [ ] Leads tab
* [ ] Reports count
* [ ] Payments permission gate
* [ ] Activity Log
* [ ] PII masking in detail
* [ ] Suspend/Ban dialog
* [ ] Temporary 30 days
* [ ] Permanent Ban
* [ ] mandatory reason
* [ ] reason shared with user
* [ ] Listings hidden
* [ ] Leads paused
* [ ] posting blocked
* [ ] Notification
* [ ] expiry scheduler
* [ ] audit
* [ ] safe restore

---

# 345. SCREENS 6–7 FINAL CHECKLIST

* [ ] Role Change queue
* [ ] current Role
* [ ] target Role
* [ ] request date
* [ ] pagination
* [ ] Detail header
* [ ] role history
* [ ] active Listing context
* [ ] City
* [ ] user reason
* [ ] rejection reason
* [ ] Approve
* [ ] Reject
* [ ] server permission
* [ ] role transition
* [ ] subscription migration
* [ ] verification requirement
* [ ] Notification
* [ ] audit
* [ ] duplicate action protection

---

# 346. SCREENS 8–11 FINAL CHECKLIST

* [ ] Staff List
* [ ] staff count
* [ ] active rows
* [ ] invited row
* [ ] permission summary
* [ ] Invite Staff
* [ ] Work Email
* [ ] Verification Manager template
* [ ] Support Manager template
* [ ] Content Manager template
* [ ] Billing Manager template
* [ ] Custom template
* [ ] Module permissions
* [ ] secure Invite token
* [ ] expiry
* [ ] duplicate Invite protection
* [ ] actual Email or honest Setup Required
* [ ] Permission Editor
* [ ] View
* [ ] Edit
* [ ] Approve
* [ ] dependency validation
* [ ] Super Admin immutable full access
* [ ] no self-escalation
* [ ] Save Changes
* [ ] audit
* [ ] Staff Activity
* [ ] exact target links
* [ ] reason excerpts
* [ ] checklist summary
* [ ] pagination

---

# 347. SCREEN 12 FINAL CHECKLIST

* [ ] Pending Review count
* [ ] Pending tab
* [ ] Needs Changes tab
* [ ] oldest-first order
* [ ] listing title
* [ ] price
* [ ] submitter
* [ ] role
* [ ] submitted age
* [ ] Review
* [ ] All Caught Up
* [ ] Zero Pending
* [ ] Error
* [ ] Retry
* [ ] pagination
* [ ] concurrency/stale protection

---

# 348. SCREEN 13 FINAL CHECKLIST

* [ ] public rendering Preview
* [ ] six-photo style fixture
* [ ] price
* [ ] title
* [ ] location
* [ ] area
* [ ] floor
* [ ] description
* [ ] Full Preview
* [ ] secure pending Preview
* [ ] submitter
* [ ] role
* [ ] submission age
* [ ] submission number
* [ ] five checklist items
* [ ] checklist persistence
* [ ] 5/5 audit capability
* [ ] Notes/Reason
* [ ] Approve
* [ ] Request Changes
* [ ] Reject
* [ ] mandatory negative reason
* [ ] Notification
* [ ] audit
* [ ] stale revision protection

---

# 349. SCREENS 14–15 FINAL CHECKLIST

* [ ] Project moderation variant
* [ ] RERA number
* [ ] Verify action
* [ ] Unverified state
* [ ] approval blocked
* [ ] RERA verification
* [ ] exception flag
* [ ] exception reason/permission/audit
* [ ] Project revision diff
* [ ] old approved version remains public until approval
* [ ] Requirement variant
* [ ] genuine Requirement check
* [ ] no contact info check
* [ ] same action hierarchy
* [ ] reason rules

---

# 350. SCREEN 16 FINAL CHECKLIST

* [ ] Missing Location queue
* [ ] request name
* [ ] City context
* [ ] request count
* [ ] latest date
* [ ] Review
* [ ] Add to Location Hierarchy
* [ ] parent selection
* [ ] hierarchy validation
* [ ] duplicate check
* [ ] Approve & Add
* [ ] Reject
* [ ] request resolution
* [ ] canonical Location linkage
* [ ] audit

---

# 351. SCREEN 17 FINAL CHECKLIST

* [ ] Duplicate Review
* [ ] older Listing
* [ ] newer Listing
* [ ] Price comparison
* [ ] Photos comparison
* [ ] keep both Photos option
* [ ] Description comparison
* [ ] field-level selectors
* [ ] canonical older stays Live
* [ ] newer Archived
* [ ] safe relationship handling
* [ ] Merge confirmation
* [ ] merge transaction
* [ ] merge audit
* [ ] reversible for 30 days
* [ ] actual reversal
* [ ] audit preserved

---

# 352. SCREEN 18 FINAL CHECKLIST

* [ ] Claim target name
* [ ] claimant name
* [ ] claimant relationship
* [ ] submitted date
* [ ] private RERA Certificate
* [ ] protected viewer
* [ ] per-viewer watermark
* [ ] no Download control
* [ ] view audit
* [ ] Approve Claim
* [ ] Reject
* [ ] reason
* [ ] ownership conflict protection
* [ ] user Notification
* [ ] audit

---

# 353. SCREENS 19–20 FINAL CHECKLIST

* [ ] Verification queue
* [ ] Applicant
* [ ] Role
* [ ] Document summary
* [ ] Date
* [ ] pagination
* [ ] Verification display ID
* [ ] submitted date
* [ ] private Aadhaar
* [ ] private GST Certificate
* [ ] watermark
* [ ] document view audit
* [ ] Badge Preview
* [ ] public Badge not active before approval
* [ ] Reason field
* [ ] Approve
* [ ] Need Changes
* [ ] Reject
* [ ] mandatory negative reason
* [ ] resubmission history
* [ ] profile Verification update
* [ ] Notification
* [ ] audit

---

# 354. SCREENS 21–22 FINAL CHECKLIST

* [ ] Support Ticket Queue
* [ ] Ticket column
* [ ] Priority
* [ ] Status
* [ ] Assigned
* [ ] payment duplicate fixture
* [ ] photo issue fixture
* [ ] real assignee
* [ ] pagination
* [ ] mobile cards
* [ ] Ticket Detail
* [ ] display ID
* [ ] subject
* [ ] requester
* [ ] role
* [ ] safe Plan context
* [ ] Escalate
* [ ] Resolve
* [ ] User messages
* [ ] Staff replies
* [ ] timestamps
* [ ] Reply composer
* [ ] Refund Timeline Macro
* [ ] Ask Payment Ref Macro
* [ ] Escalation Notice Macro
* [ ] macro inserts only
* [ ] manual edit before Send
* [ ] real Send
* [ ] real Billing-state honesty
* [ ] ticket Notification
* [ ] audit

---

# 355. FULL CONNECTED BATCH 11 REGRESSION FLOW

Execute this complete real test:

Login as Verification Manager
→ open Admin Overview
→ verify only permitted real queue counts
→ inspect locked Support card
→ hover/tap permission helper
→ directly open Billing URL
→ verify Forbidden page
→ return Dashboard
→ open Users
→ verify Contact masked in network response
→ search User
→ filter Role
→ filter Status
→ filter City
→ filter Joined date
→ open User Detail
→ inspect Tabs
→ verify Payment tab permission behavior
→ Suspend test user for 30 days
→ verify Listing visibility hidden
→ verify posting blocked
→ verify Lead pause behavior
→ verify Notification
→ restore fixture
→ open Role Change Queue
→ approve test Owner → Broker request
→ verify role, migration and Notification
→ reject another request with reason
→ login as Staff Manager/Super Admin
→ open Staff List
→ create Staff Invite
→ apply Verification Manager template
→ verify secure Invite state
→ open Permission Editor
→ change View/Edit/Approve
→ save
→ login as target Staff
→ verify server enforcement
→ return as moderator
→ open Property Queue
→ open Detail
→ use Full Preview
→ complete Checklist
→ Request Changes
→ verify reason and user Notification
→ resubmit fixture
→ Approve
→ verify public Listing
→ open Project Moderation
→ attempt approval while RERA Unverified
→ verify blocked
→ verify/exception RERA
→ approve
→ open Requirement moderation
→ complete two-point checklist
→ open Missing Locations
→ approve grouped Shela Extension request
→ verify canonical Location created once
→ open Duplicate Review
→ select field values
→ Merge
→ verify canonical/archived records
→ reverse within test window
→ open Claim Review
→ view watermarked document
→ verify view audit
→ approve Claim fixture
→ open Verification Queue
→ review private documents
→ Need Changes without reason should fail
→ submit reason
→ resubmit fixture
→ Approve
→ verify public Verified badge
→ login as Support Manager
→ open Support Queue
→ open duplicate Payment Ticket
→ use Macro
→ edit reply
→ Send
→ Escalate
→ Resolve
→ verify User Notification
→ inspect Staff Activity and audit records.

Any broken connection means Batch 11 is incomplete.

---

# 356. LIVE VERIFICATION STANDARD

After every Batch 11 implementation group:

1. run Build,
2. run TypeScript check,
3. run Lint where configured,
4. run actual application,
5. login as Super Admin,
6. login as Verification Manager,
7. login as Support Manager,
8. login as limited custom Staff,
9. test route permission,
10. test server action permission,
11. inspect database mutation,
12. refresh,
13. verify persistence,
14. test 390px mobile,
15. test tablet,
16. test desktop,
17. inspect Browser console,
18. inspect failed network requests,
19. inspect Supabase/RLS failures,
20. inspect Audit record.

Static code review is not PASS.

---

# 357. PERMISSION REGRESSION MATRIX

For each Admin module test:

### No View

* Navigation locked/disabled where designed.
* Direct route Forbidden.
* API/server action denied.

### View only

* List/detail readable.
* Edit controls unavailable.
* decision controls unavailable.

### View + Edit

* operational changes allowed.
* final approval action unavailable where Approve permission required.

### View + Edit + Approve

* final decision actions available according to module.

### Super Admin

* full access.

---

# 358. PRIVACY REGRESSION MATRIX

Test:

### Verification Manager

* User mobile masked.
* Claim documents only if Claim permission granted.
* Verification docs accessible.
* Billing data denied.

### Support Manager

* Ticket participant data only as required.
* Verification Aadhaar denied.
* Billing detail limited according to support/Billing cross-permission.

### User Manager

* approved contact visibility.

---

# 359. MODERATION CONSISTENCY RULE

Across:

* Property,
* Project,
* Requirement

use one visible decision hierarchy:

**Approve → Request Changes → Reject**

Do not reorder buttons per screen randomly.

---

# 360. STATUS COLOR CONSISTENCY

Use approved system:

Success:

* Approved,
* Active.

Warning:

* Pending,
* Need Changes.

Danger:

* Rejected,
* Suspended,
* Banned.

Neutral:

* Archived,
* Disabled.

Do not invent inconsistent colors.

---

# 361. ADMIN TABLE-TO-CARD RULE

Where Batch 11 uses desktop tables:

mobile uses cards based on the same records.

Applies to:

* Users,
* Role Changes,
* Staff,
* Verification,
* Support.

No separate hard-coded arrays.

---

# 362. ADMIN SEARCH PERFORMANCE

Use indexed/paginated server search.

Do not fetch full databases into Client.

---

# 363. N+1 PREVENTION

Avoid N+1 in:

* User entity counts,
* Moderation submitter names,
* Verification document summaries,
* Staff permission summaries,
* Support requester/assignee data,
* Activity target names.

Use:

* joins,
* batch lookups,
* views,
* RPCs.

---

# 364. TRANSACTION REQUIREMENTS

Use transaction or durable idempotent orchestration for:

* Suspension,
* Temporary Restore,
* Role Change Approval,
* Project Revision Approval,
* Missing Location approval/group resolution,
* Duplicate Merge,
* Merge Reversal,
* Claim Approval,
* Verification Approval.

---

# 365. PROVIDER DEPENDENCY REQUIREMENTS

Potential Batch 11 dependencies include:

* Staff Invite Email,
* User Notification Email/SMS,
* private document storage/CDN,
* PDF private viewer infrastructure,
* scheduled Temporary Suspension expiry,
* ticket reply Email notifications.

Any missing provider/infrastructure must be recorded in:

`MISSING_API_PROVIDER_EXTERNAL_SETUP_REQUIREMENTS.md`

Do not hide missing external setup.

---

# 366. COMPLETION BLOCKERS

Batch 11 must not be marked complete while any of these remain:

* generic Admin Overview still used,
* inaccessible module counts leaked,
* locked card clickable,
* direct protected route shows data,
* no Forbidden page,
* User list sends full mobile/email to non-authorised Staff,
* City filter missing,
* Joined filter missing,
* User Detail returns unrestricted full Profile to normal Staff,
* Suspend only changes `account_status`,
* Listings remain public after Suspension,
* Lead pause behavior missing,
* no temporary Suspension expiry,
* no user Notification,
* Role Change Queue missing,
* Role Change approval changes role but ignores subscription migration,
* Staff Invite Email falsely marked sent,
* role templates cosmetic only,
* permission matrix doesn't enforce server actions,
* hidden `can_reject` mismatch makes Batch decision buttons fail,
* Super Admin can accidentally lose core access,
* Staff Activity static/fake,
* moderation Checklist decorative only,
* no Checklist persistence,
* Project approval works with Unverified RERA,
* RERA exception has no reason/audit,
* Requirement moderation uses wrong full Property checklist,
* Missing Location queue missing,
* Location approval creates duplicates,
* Duplicate Merge is blind overwrite,
* merge not reversible for 30 days,
* Claim document public,
* Claim document downloadable,
* no per-viewer watermark,
* no document-view audit,
* Verification remains Setup Required placeholder,
* Verification has no document relation,
* Badge Preview activates public badge prematurely,
* Need Changes/Reject allowed without reason,
* Support remains Setup Required placeholder,
* no Support thread,
* Macros auto-send,
* Escalate dead,
* Resolve dead,
* Support replies make false Billing claims,
* no pagination,
* N+1 query patterns,
* dead button,
* `href="#"`,
* mobile Admin bottom nav appears,
* table unreadable on mobile,
* modal clipped,
* text clipping,
* console errors,
* permission bypass,
* no live multi-role verification.

---

# 367. FINAL ACCEPTANCE STATEMENT

**Design Batch 11 — Admin Management & Moderation is complete only when all 22 Batch 11 screen groups are implemented according to the exact Batch 11 source design and every Admin action is backed by real permissions, real data, real audit history and server-side enforcement.**

Completion requires:

* Graphite Admin shell,
* permission-aware Overview,
* real queue counts,
* locked module cards,
* no sensitive locked count leakage,
* Forbidden Module full page,
* User List with Search,
* Role filter,
* Status filter,
* City filter,
* Joined filter,
* server-side Contact masking,
* permission-aware User Detail,
* Listings tab,
* Leads tab,
* Reports tab,
* protected Payments tab,
* Activity Log,
* complete Temporary Suspension,
* complete Permanent Ban,
* Listing hiding,
* Lead pause behavior,
* posting block,
* user Notification,
* temporary expiry and restoration,
* Role Change Queue,
* Role Change Detail,
* secure Approve/Reject,
* subscription migration,
* verification migration,
* Staff List,
* Staff Invite,
* secure Invite token,
* Role Templates,
* Module Permissions,
* Email provider honesty,
* Permission Matrix,
* View/Edit/Approve enforcement,
* immutable Super Admin full access,
* Staff Activity,
* real Audit history,
* Property Moderation Queue,
* positive Empty state,
* Retry error state,
* Public Listing Preview,
* full five-point Checklist,
* exact action hierarchy,
* mandatory negative reasons,
* Project RERA approval gate,
* authorised RERA exception,
* Requirement lightweight Checklist,
* Missing Location Queue,
* hierarchy approval,
* duplicate prevention,
* field-level Duplicate Merge,
* media selection,
* canonical Listing preservation,
* newer Listing archive,
* 30-day Merge reversal,
* Claim Review,
* private Document viewer,
* per-viewer Watermark,
* no Download control,
* Document view audit,
* Verification Request Queue,
* private Verification Detail,
* document summaries,
* Badge Preview,
* Approve,
* Need Changes,
* Reject,
* reason enforcement,
* public Verification update only after Approval,
* Support Ticket Queue,
* priority,
* status,
* assignment,
* Ticket Thread,
* Reply composer,
* Support Macros,
* Escalate,
* Resolve,
* real Billing-context honesty,
* complete Notifications,
* complete audit,
* no fake data,
* no placeholder for Batch 11 modules,
* no permission bypass,
* no privacy leak,
* no dead controls,
* no N+1 list architecture,
* complete desktop verification,
* complete tablet verification,
* complete emergency mobile Admin verification,
* complete multi-role live verification.

Required implementation sequence:

**Screens 1–2 Admin Access Foundation → verify → Screens 3–5 User Management → verify → Screens 6–7 Role Changes → verify → Screens 8–11 Staff & Permissions → verify → Screens 12–15 Core Moderation → verify → Screens 16–18 Location/Duplicate/Claims → verify → Screens 19–20 Verification → verify → Screens 21–22 Support → verify → full multi-role Admin regression test.**

No Admin screen passes merely because it renders.

**Exact Design + Permission Integrity + Privacy + Moderation Integrity + Auditability + Sensitive Document Security + User Safety + Support Integrity + Database Persistence + RLS + Responsive Behavior + Live Multi-Role Verification must all pass.**
