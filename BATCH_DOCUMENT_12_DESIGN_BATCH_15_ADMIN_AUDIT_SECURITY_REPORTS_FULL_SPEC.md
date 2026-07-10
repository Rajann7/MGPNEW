# BATCH_DOCUMENT_12_DESIGN_BATCH_15_ADMIN_AUDIT_SECURITY_REPORTS_FULL_SPEC.md

# My Gujarat Property

## Batch Document 12

## Design Batch 15 — Complete Admin Audit, Security, Reports, Abuse Reviews, Disputes, Business Reports, Exports, Bulk Actions and Maker-Checker

---

# 1. DOCUMENT PURPOSE

This document is the complete design, implementation, backend, database, audit-integrity, security-monitoring, abuse-review, fraud-reporting, duplicate-lead merge, contact-reveal investigation, message-report review, site-visit dispute resolution, business-reporting, export-management, bulk-operation and maker-checker governance specification for:

**My Gujarat Property · Design Batch 15 — Admin: Audit / Security / Reports**

Batch 15 defines the complete internal control, investigation and operational-governance system for authorised:

* Super Admin,
* Audit Manager,
* Security Manager,
* Reports Manager,
* Fraud Manager,
* User Manager,
* Support Manager,
* other Staff with explicitly granted permissions.

Batch 15 contains exactly these 12 screen groups:

1. Audit Logs Viewer
2. Security Events Dashboard
3. Reports / Fraud Queue
4. Report Detail and Enforcement Actions
5. Duplicate Lead Review
6. Contact Reveal Logs
7. Message Report Review
8. Site Visit Dispute Review
9. Business Metrics
10. Export Management
11. Bulk Action Preview and Confirmation
12. Maker-Checker Pending Approval Queue

Every screen and every state must be implemented.

Nothing may be skipped.

No Batch 15 screen may remain:

* Coming Soon,
* placeholder-only,
* sample-data-only,
* frontend-only,
* disconnected from real audit/security/report records,
* implemented without Staff permission enforcement,
* implemented without appropriate audit history.

The exact Batch 15 design source must be read directly from:

`/newdesign/`

Use the real:

`Batch 15 - Admin Audit Security Reports (Standalone).html`

Do not implement from:

* current basic Audit list only,
* current Reports/Fraud placeholder,
* generic SIEM dashboards,
* generic admin analytics templates,
* memory,
* assumptions.

---

# 2. ABSOLUTE CURRENT UI REPLACEMENT RULE

Where current Audit, Reports, Fraud or Security screens conflict with Batch 15, completely replace the conflicting presentation architecture.

Do not keep:

* current basic Audit rows as the final Audit Viewer,
* current Reports/Fraud Coming Soon panel,
* generic Security cards,
* fake Business Metrics,
* local-only Export buttons,
* destructive Bulk action without Preview,
* self-approvable high-risk actions.

The final system must use:

**Batch 1 Admin shell + exact Batch 15 screen behavior.**

Existing secure backend foundations may be preserved and extended.

---

# 3. CONTROL SYSTEM PRINCIPLE

Batch 15 is a governance and investigation layer.

Its primary rules are:

1. Audit history is append-only.
2. Sensitive investigation screens are permission-gated.
3. Access to especially sensitive logs is itself audited.
4. Report decisions require reasons.
5. Security data must be real and privacy-safe.
6. Business database metrics may display without an external analytics provider.
7. Behavioral analytics must show Setup Required when the provider is unavailable.
8. Bulk actions preview affected records before execution.
9. High-risk actions may require maker-checker approval.
10. Maker and checker must be different Staff members.

These rules are mandatory.

---

# 4. BATCH 15 SCREEN GROUPING

The source groups Batch 15 as:

## Screens 1–2

Audit and Security.

## Screens 3–4

Reports / Fraud Queue and Report Detail.

## Screens 5–8

Specialized Reviews.

## Screens 9–10

Business Reports and Export Management.

## Screens 11–12

Bulk Actions and Maker-Checker.

All 12 groups are required.

---

# 5. IMPLEMENTATION ORDER

Implement Batch 15 in this order:

1. Audit permissions and append-only integrity
2. Screen 1 Audit Viewer
3. Security event model and ingestion
4. Screen 2 Security Dashboard
5. Screen 3 Report Queue
6. Screen 4 Report Detail and enforcement actions
7. Screen 5 Duplicate Lead Review
8. Screen 6 Contact Reveal Logs
9. Screen 7 Message Report Review
10. Screen 8 Site Visit Dispute Review
11. Screen 9 Business Metrics
12. Screen 10 Export Management
13. Screen 11 Bulk Action Preview
14. Screen 12 Maker-Checker Queue
15. complete permission and governance regression.

Do not implement all high-risk actions in one unverified phase.

---

# 6. ADMIN SHELL

Batch 15 uses the approved Batch 1 Admin shell.

Required:

* graphite desktop sidebar,
* contextual Admin header,
* permission-aware navigation,
* desktop-first investigation workflows,
* mobile Admin drawer,
* no public-role bottom navigation.

Do not use Owner/Broker/Builder dashboard shell inside these screens.

---

# 7. PERMISSION MODULES

The existing permission architecture already identifies relevant modules such as:

* audit_logs,
* security,
* reports,
* fraud,
* exports.

Batch 15 must use them correctly.

At minimum separate:

* Audit Log View,
* Security Dashboard View,
* Security Action Manage,
* Reports View,
* Report Decision,
* Fraud Review,
* Duplicate Merge,
* Abuse Investigation / Contact Reveal View,
* Message Report Review,
* Site Visit Dispute Resolution,
* Business Reports View,
* Export Request,
* Sensitive Export,
* Bulk Action,
* Maker-Checker Review.

Do not grant all investigation access because Staff can view one Admin module.

---

# 8. SUPER ADMIN RULE

Super Admin has full access.

However:

Super Admin must still obey maker-checker separation when the high-risk workflow explicitly requires four-eyes approval.

A Super Admin who created a maker-checker request must not approve that same request unless the governance policy explicitly creates an emergency override with separate logging.

The default Batch 15 rule is:

**checker ≠ maker.**

---

# 9. AUDIT LOG INTEGRITY RULE

The source explicitly defines Audit Logs as:

**append-only**

and:

**entries can never be edited or deleted.**

No Audit screen may have:

* Edit,
* Delete,
* Archive,
* overflow actions,
* row hover action menus.

Rows may only open a read-only detail panel.

---

# 10. DATABASE APPEND-ONLY ENFORCEMENT

Append-only behavior must be enforced at the database/security layer.

Do not rely only on:

`no Delete button in UI`.

Protect against:

* UPDATE,
* DELETE

through:

* privileges,
* RLS,
* triggers where appropriate,
* restricted service functions.

---

# 11. AUDIT RETENTION

Audit entries remain available according to approved retention policy.

Do not purge because normal user content is deleted.

Where personal-data minimization requires masking, preserve lawful operational trace without exposing unnecessary sensitive content.

---

# 12. SAFE SNAPSHOT RULE

Audit before/after snapshots must contain only safe operational fields.

Do not store:

* passwords,
* OTP values,
* full API keys,
* payment secrets,
* complete private documents,
* full sensitive provider payloads.

---

# 13. SCREEN 1 — AUDIT LOG VIEWER

Reference heading:

Audit Logs Viewer.

Core source rule:

`append-only`

and deliberately:

**NO edit/delete affordances anywhere on this screen.**

---

# 14. AUDIT FILTER CONTROLS

Exact source controls:

### Search

`Search actor or target…`

### Actor

`Actor: All`

### Module

Reference active value:

`Module: Users`

### Date

`Last 7 days`

All must be functional.

---

# 15. AUDIT SEARCH

Search must support real matching against approved searchable data such as:

* Staff actor email/name,
* action target reference,
* safe target display ID.

Do not search raw JSON snapshots indiscriminately.

---

# 16. ACTOR FILTER

Load actual Staff actors and System actor.

Possible values include:

* individual Staff,
* System,
* All.

---

# 17. MODULE FILTER

Use actual audit modules.

Examples:

* Users,
* Staff,
* Moderation,
* Billing,
* Security,
* Reports,
* Settings.

Do not hard-code only Users.

---

# 18. DATE FILTER

Reference:

`Last 7 days`

Support actual server-side date filtering.

Do not fetch all logs and filter Client-side.

---

# 19. APPEND-ONLY NOTICE

Exact concept:

`Append-only — entries can never be edited or deleted`

This notice must remain visible.

---

# 20. AUDIT TABLE COLUMNS

Exact columns:

* ACTOR
* ACTION
* TARGET
* WHEN

---

# 21. AUDIT REFERENCE ROW 1

Actor:

`priya@mgp.in`

Action:

`Changed role permissions for support agent`

Target:

`agent: kunal@mgp.in`

When:

`Today 11:32 AM`

---

# 22. AUDIT REFERENCE ROW 2

Actor:

`kunal@mgp.in`

Action:

`Approved listing after review`

Target:

`listing #L-8841`

When:

`Today 10:07 AM`

---

# 23. AUDIT REFERENCE ROW 3

Actor:

`system`

Action:

`Auto-suspended user after 3 fraud reports`

Target:

`user #U-3302`

When:

`Yesterday 8:51 PM`

---

# 24. SYSTEM ACTOR

Automatic platform actions must use an explicit System actor concept.

Do not assign an arbitrary Staff user to automatic enforcement.

---

# 25. AUDIT DISPLAY IDS

Targets use human-readable references such as:

* #L-8841,
* #U-3302.

Do not expose raw UUID as primary display text.

---

# 26. AUDIT DETAIL PANEL

Clicking a row opens:

**read-only**

Audit detail.

Reference:

`Log entry #AL-99120 — read-only`

---

# 27. AUDIT DETAIL HEADER

Reference:

`priya@mgp.in · Changed role permissions · Today 11:32 AM · IP 103.240.xx.xx`

Use actual:

* actor,
* normalized action label,
* timestamp,
* masked IP where legally and operationally appropriate.

---

# 28. IP MASKING

The source shows truncated IP:

`103.240.xx.xx`

Do not show full IP in the normal Audit Viewer.

If raw IP retention is needed for Security investigation:

restrict it to the appropriate sensitive security system.

---

# 29. BEFORE / AFTER DIFF

Exact sections:

`BEFORE`

and:

`AFTER`

Reference:

Before:

* `listings.approve: true`
* `payments.refund: true`
* `users.suspend: false`

After:

* `listings.approve: true`
* `payments.refund: false`
* `users.suspend: false`

---

# 30. DIFF HIGHLIGHTING

Show changes clearly.

Do not dump unreadable JSON.

The Viewer should identify:

* unchanged values,
* removed/disabled values,
* added/enabled values.

---

# 31. AUDIT DETAIL IMMUTABILITY

The detail panel has no editing control.

No copy-edit-save behavior.

---

# 32. AUDIT MOBILE CARD

Reference mobile transform:

Actor:

`priya@mgp.in`

Time:

`11:32 AM`

Action:

`Changed role permissions for support agent`

Target:

`agent: kunal@mgp.in →`

Uses contextual mobile Admin header with Back.

---

# 33. AUDIT LOADING STATE

Use source-consistent shimmer/skeleton.

---

# 34. AUDIT EMPTY STATE

Exact:

`No log entries match these filters.`

Action:

`Clear filters`

---

# 35. AUDIT ERROR STATE

Exact:

`Couldn't load audit logs.`

Action:

`Retry`

---

# 36. AUDIT PAGINATION

The current Audit action already has a paginated foundation.

Preserve pagination and extend it with:

* Search,
* Actor,
* Module,
* Date.

Do not remove pagination.

---

# 37. CURRENT AUDIT RECONCILIATION

The current implementation already has:

* Admin Audit data type,
* safe before/after snapshots,
* paginated list action,
* protected Audit route.

However, current UI is only a simple list.

Batch 15 requires adding:

* Search,
* Actor filter,
* Module filter,
* Date filter,
* exact table/card transforms,
* read-only detail panel,
* before/after diff,
* masked IP context,
* loading,
* filter-empty,
* error/retry.

---

# 38. CURRENT AUDIT PERMISSION RECONCILIATION

The current Audit route allows Super Admin/Audit Manager.

Preserve secure access.

If final permission matrix additionally permits delegated Audit View access:

implement according to approved permission architecture.

Do not accidentally broaden access.

---

# 39. SCREEN 2 — SECURITY EVENTS DASHBOARD

Exact heading:

`Security Events Dashboard`

Time range controls:

* Last 24 h
* 7 days
* 30 days

All metrics must use actual Security Event data.

---

# 40. SECURITY METRIC 1 — FAILED LOGINS

Reference:

`Failed logins`

Value:

`42`

Context:

`Spike 2–3 PM — mostly one IP range`

Production value and summary must be real.

---

# 41. FAILED LOGIN EVENT SOURCE

Use actual:

* Auth security logs,
* authentication failure events,
* approved aggregate security telemetry.

Do not count normal form-validation errors as failed login attempts.

---

# 42. SPIKE DETECTION

A spike summary must be generated from real event distribution.

Do not always show:

`Spike 2–3 PM`.

---

# 43. SECURITY METRIC 2 — RATE LIMIT HITS

Reference:

`Rate-limit hits`

Value:

`118`

Context:

`Normal range — mostly search API`

Use real rate-limit events.

---

# 44. RATE-LIMIT CATEGORY SUMMARY

Aggregate by route/API category.

Do not expose full sensitive URL parameters.

---

# 45. SECURITY METRIC 3 — SUSPICIOUS IPS FLAGGED

Reference:

`Suspicious IPs flagged`

Value:

`3`

Supporting:

`2 auto-blocked after OTP flooding; 1 pending review below.`

Use real Security Event/Block records.

---

# 46. PRIVACY-SAFE SECURITY DISPLAY

Normal Dashboard uses:

* truncated IP,
* generalized device context.

Do not show complete raw device fingerprint.

---

# 47. RECENT SECURITY EVENTS TABLE

Columns:

* TYPE
* DETAIL
* SEVERITY
* WHEN

---

# 48. SECURITY EVENT — OTP FLOODING

Reference Type:

`OTP flooding`

Detail:

`61 OTP requests in 10 min from 152.58.xx.xx — auto-blocked 24 h`

Severity:

`High`

When:

`2:14 PM`

---

# 49. OTP FLOOD PROTECTION

Auto-block behavior must be backed by actual rate-limiting/security rules.

Do not display Auto-blocked if nothing was blocked.

---

# 50. BLOCK EXPIRY

For 24-hour Auto Block:

store exact expiry.

Scheduled/unblock-on-access logic must restore correctly.

---

# 51. SECURITY EVENT — CREDENTIAL STUFFING

Reference:

`Credential stuffing`

Detail:

`Failed logins across 14 accounts from one device fingerprint`

Severity:

`Medium`

When:

`2:02 PM`

Use safe fingerprint summary.

---

# 52. DEVICE FINGERPRINT PRIVACY

Do not expose raw fingerprint string.

---

# 53. SECURITY EVENT — ADMIN NEW DEVICE

Reference:

`Admin login — new device`

Detail:

`priya@mgp.in signed in from a new device (Ahmedabad) — verified via OTP`

Severity:

`Info`

When:

`9:12 AM`

---

# 54. NEW DEVICE EVENT

Only display Verified via OTP if that step actually occurred.

---

# 55. SECURITY SEVERITY

Use consistent levels:

* High
* Medium
* Info

and other approved levels if needed.

Do not label every event High.

---

# 56. SECURITY EVENT DATA MODEL

Support:

* Event type,
* severity,
* actor/User/Staff relationship where applicable,
* safe detail summary,
* masked network context,
* device-risk reference,
* occurred at,
* automatic action,
* review status.

---

# 57. RAW SECURITY EVIDENCE

Where Security team needs full evidence:

store in restricted security data.

Normal Batch 15 UI displays privacy-safe summaries.

---

# 58. SECURITY DASHBOARD EMPTY STATE

If no Security Events:

show honest positive empty state.

Do not display zeros inside fake alert language.

---

# 59. SECURITY PROVIDER DEPENDENCY

If parts of Security telemetry require an external Provider not configured:

show honest Setup Required for those metrics.

Database-native Auth failures may still display if available.

---

# 60. SECURITY CURRENT REPOSITORY RECONCILIATION

The current permission model contains Security roles/modules, but no complete Batch 15 Security Dashboard route was found in the inspected Admin implementation.

Build:

* Security Event storage,
* aggregation,
* range controls,
* Recent Event table,
* real Auto Block integration,
* privacy-safe display.

---

# 61. SCREENS 3–4 — REPORTS / FRAUD

The current public application already has a user-report submission foundation.

Preserve and extend it.

Batch 15 requires the complete Admin investigation side.

---

# 62. SCREEN 3 — REPORTS / FRAUD QUEUE

Exact columns:

* TYPE
* REPORTED ENTITY
* REPORTER
* SUBMITTED
* PRIORITY

Action:

`Review`

---

# 63. REPORT QUEUE ROW 1

Type:

`Fraud`

Entity:

`Listing #L-7723`

Reporter:

`Meera P. (buyer)`

Submitted:

`Today 8:30 AM`

Priority:

`High`

Action:

`Review`

---

# 64. REPORT QUEUE ROW 2

Type:

`Spam`

Entity:

`User #U-9914`

Reporter:

`System (pattern)`

Submitted:

`Yesterday`

Priority:

`Medium`

---

# 65. REPORT QUEUE ROW 3

Type:

`Duplicate`

Entity:

`Lead #2471 / #1234`

Reporter:

`Rameshbhai P. (owner)`

Submitted:

`30 Jun`

Priority:

`Low`

---

# 66. REPORT TYPES

Support report classes required across the platform.

At minimum source-related types include:

* Fraud,
* Spam,
* Duplicate.

The wider system may also support:

* Wrong information,
* Illegal content,
* Contact abuse,
* Payment abuse,
* Harassment.

Use a controlled registry.

---

# 67. SYSTEM-GENERATED REPORTS

The source allows:

`System (pattern)`

Reports may come from:

* user submission,
* security pattern detector,
* fraud detector,
* moderation signal.

Store reporter source separately.

---

# 68. REPORT PRIORITY

Support:

* High
* Medium
* Low

Priority may be:

* system-derived,
* manually escalated.

Do not infer only from report category text in Client.

---

# 69. REPORT QUEUE STATUS

Default queue should contain actionable unresolved Reports.

Do not mix:

* Dismissed,
* Resolved,
* Closed

into the active queue without filter.

---

# 70. REPORT QUEUE PAGINATION

Use pagination.

---

# 71. REPORT QUEUE SORT

Use priority and age according to operational policy.

High-priority unresolved fraud should not be buried behind low-priority items.

---

# 72. REPORT QUEUE MOBILE

Transform rows to cards.

Preserve:

* Type,
* entity,
* reporter,
* submitted time,
* Priority,
* Review.

---

# 73. CURRENT USER REPORT FOUNDATION

The current public report action already supports:

* Auth requirement,
* controlled report categories,
* target validation,
* duplicate pending-report protection,
* per-user daily cap,
* pending queue status.

Preserve these protections.

---

# 74. CURRENT REPORT TARGET GAP

The current public report foundation supports:

* property,
* project,
* requirement,
* user.

Batch 15 additionally includes specialized:

* Lead duplicate review,
* Message report,
* Site Visit dispute.

Implement dedicated models/actions for those specialized workflows instead of forcing everything into the current generic target set.

---

# 75. CURRENT ADMIN REPORT GAP

Current Admin Support/Reports implementation is still a placeholder.

Batch 15 requires full Screens 3–8.

Remove the placeholder after implementation.

---

# 76. SCREEN 4 — REPORT DETAIL

Reference heading:

`Report #R-0455 — Fraud`

Badge:

`High priority`

Context:

`Listing #L-7723 · reported by Meera P. · today 8:30 AM`

---

# 77. REPORT DISPLAY ID

Use safe display reference:

`R-0455`

Do not use UUID as primary user-facing identifier.

---

# 78. EVIDENCE SECTION

Exact heading:

`EVIDENCE`

Reference text:

`The owner asked me to transfer ₹50,000 as a 'token' before even visiting. Number on the listing doesn't match the person who called.`

Evidence attachments:

* screenshot 1
* screenshot 2

---

# 79. EVIDENCE STORAGE

Attachments must use safe private/restricted storage when Reports contain private evidence.

Do not use public permanent URLs.

---

# 80. EVIDENCE VIEW PERMISSION

Only authorised Report/Fraud reviewers may view.

Access should be auditable for sensitive evidence where appropriate.

---

# 81. ATTACHMENT SAFETY

Validate:

* MIME type,
* file size,
* malware/security processing according to infrastructure,
* safe rendering.

Do not render arbitrary HTML upload inline.

---

# 82. REPORTED LISTING PREVIEW

Reference:

`₹35 L · 2 BHK, Mavdi`

Metadata:

`Posted by user #U-8802 · live 12 days · 6 leads`

Action:

`Open →`

---

# 83. LISTING PREVIEW AUTHORITY

Use actual Listing data.

Do not use stale copied report text as the Listing authority.

---

# 84. OPEN LISTING

Must open:

* exact Admin Listing review/detail,
* or secure public rendering context.

Do not open unrelated Search.

---

# 85. RELATED HISTORY

Exact:

`This user has 3 prior reports`

Breakdown:

`2 fraud (1 upheld, listing removed) · 1 spam (dismissed). Account created 4 months ago.`

Action:

`View full history →`

---

# 86. RELATED HISTORY QUERY

Use real report history.

Avoid N+1.

---

# 87. UPHELD REPORT

An upheld Report means a final Staff/system decision.

Do not count Pending Reports as upheld.

---

# 88. ACCOUNT AGE

Calculate from actual account creation date.

---

# 89. TAKE ACTION SECTION

Exact heading:

`TAKE ACTION — reason required for all`

Field:

`Reason *`

Actions:

* Warn user
* Suspend user…
* Remove listing…
* Dismiss report

Every action requires Reason.

---

# 90. REASON SERVER VALIDATION

Reason must be required server-side for all four actions.

No Client-only required attribute.

---

# 91. WARN USER

Required:

* Report status update,
* Warning record/event,
* User Notification,
* Audit,
* reason.

Do not suspend or remove content accidentally.

---

# 92. SUSPEND USER

Uses the complete Batch 11 Suspension architecture.

Do not implement a second simplified suspension action.

Required effects include:

* account state,
* visibility handling,
* posting restrictions,
* notification,
* audit.

---

# 93. REMOVE LISTING

Do not hard-delete.

Use moderation/enforcement status:

* removed,
* hidden,
* rejected/archived

according to final entity status model.

Preserve evidence and audit.

---

# 94. DISMISS REPORT

Dismiss:

* resolves Report as non-actionable,
* preserves Report history,
* stores reason,
* Audit.

Do not delete.

---

# 95. ACTION TRANSACTION SAFETY

Report decision plus enforcement plus Audit must be atomic or durably recoverable.

Do not leave:

Report Upheld
but User action failed

without a recovery state.

---

# 96. REPORT DECISION CONCURRENCY

Two Staff sessions cannot resolve the same Report differently from stale state.

Use:

* status condition,
* version check,
* transaction.

---

# 97. REPORT NOTIFICATION HONESTY

User Notification should identify action appropriately.

Do not expose private reporter identity if policy protects them.

---

# 98. SCREENS 5–8 — SPECIALIZED REVIEWS

These specialized review screens are not generic Report Detail variants only.

Each has domain-specific data and actions.

---

# 99. SCREEN 5 — DUPLICATE LEAD REVIEW

Source rule:

Uses the same conceptual merge pattern as Duplicate Listing Review from Batch 11.

However:

Lead merge has its own exact behavior.

---

# 100. DUPLICATE LEAD REFERENCE — KEEP RECORD

Label:

`KEEP — older, richer record`

Lead:

`Lead #1234 · Meera P.`

Contact:

`+91 98988 45210`

Created:

`14 Jun`

Context:

`2 BHK, Iscon Platinum enquiry`

History:

`2 notes · 1 site visit · status: Contacted`

---

# 101. DUPLICATE LEAD REFERENCE — MERGE-IN RECORD

Label:

`MERGE IN — newer`

Lead:

`Lead #2471 · Meera Purohit`

Contact:

`+91 98988 45210 (same number)`

Created:

`today`

Context:

`3 BHK, Silver Heights enquiry`

History:

`2 notes · 1 scheduled visit · status: New`

---

# 102. DUPLICATE DETECTION BASIS

Duplicate Lead detection may use:

* same normalized mobile,
* same email,
* matching identity,
* manual Report.

Do not merge automatically solely because names are similar.

---

# 103. CONTACT DISPLAY

This review contains contact PII.

Only Staff with appropriate Fraud/Reports sensitive-data permission may access it.

Do not show full phone to unrelated Staff.

---

# 104. KEEP RECORD RULE

Reference canonical record:

older/richer Lead #1234.

The reviewer must understand which Lead remains canonical.

---

# 105. MERGE BEHAVIOR

Source:

`Merging combines both timelines and notes under #1234; #2471 closes with a pointer.`

Required:

* merge CRM timeline,
* merge Notes,
* preserve Site Visit references,
* preserve Message/Proposal relationships where applicable,
* close duplicate Lead,
* store canonical Lead pointer.

---

# 106. DIFFERENT PROPERTY CONTEXT

The reference Leads belong to different enquiries:

* 2 BHK Iscon Platinum,
* 3 BHK Silver Heights.

Do not overwrite target context blindly.

Preserve timeline/source context.

The canonical Lead may need multiple related enquiry/source events or merged-source references.

---

# 107. LEAD STATUS MERGE

Do not blindly use New or Contacted.

Define deterministic merge policy.

For reference:

canonical Contacted should not regress to New.

---

# 108. SITE VISIT RELATIONSHIPS

Preserve:

* completed Site Visit,
* scheduled Site Visit.

Do not delete one.

---

# 109. NOTE MERGE

Preserve Notes with:

* original author,
* timestamp,
* source Lead reference where useful.

---

# 110. DUPLICATE LEAD MERGE IRREVERSIBILITY

Exact source:

`Cannot be undone.`

Unlike Batch 11 Duplicate Listing Merge, Batch 15 Lead Merge is irreversible in the UI.

This distinction is critical.

Do not copy the 30-day reversible Listing merge rule onto Lead merge.

---

# 111. MERGE CONFIRMATION

Action:

`Merge into #1234…`

Ellipsis indicates a confirmation.

Confirmation must show:

* canonical Lead,
* duplicate Lead,
* relationship effects,
* irreversible warning.

---

# 112. MERGE TRANSACTION SAFETY

Use transaction/RPC or durable orchestration.

Do not partially merge Notes while leaving duplicate Lead active.

---

# 113. MERGE IDEMPOTENCY

Repeated submit must not duplicate:

* Notes,
* Timeline events,
* Site Visit links.

---

# 114. NOT DUPLICATES ACTION

Action:

`Not duplicates`

must:

* resolve duplicate alert/Report,
* preserve history,
* record reviewer,
* Audit.

---

# 115. DUPLICATE LEAD AUDIT

Record:

* canonical Lead,
* merged Lead,
* actor,
* merge reason/source,
* timestamp.

---

# 116. SCREEN 6 — CONTACT REVEAL LOGS

Exact heading concept:

`Contact reveal logs — permission-gated`

Warning:

`Restricted view — access requires the "abuse investigation" permission and is itself audit-logged.`

This is a strict dual-control privacy rule.

---

# 117. REVEAL LOG VIEW PERMISSION

Do not grant Reveal Log access to every:

* Support Manager,
* Verification Manager,
* normal Admin.

Require:

`abuse investigation`

or final equivalent sensitive-investigation permission.

---

# 118. ACCESS ITSELF MUST BE AUDITED

Opening the Contact Reveal Log screen or querying sensitive records creates an Audit event.

Not only individual action.

The audit should record:

* Staff actor,
* access scope,
* filters/date range where appropriate,
* timestamp.

Do not record the revealed phone values inside generic Audit metadata.

---

# 119. REVEAL LOG COLUMNS

Exact:

* REVEALED BY
* NUMBER OF
* FROM LISTING
* WHEN

---

# 120. REVEAL LOG REFERENCE ROW 1

Revealed By:

`Rameshbhai P. (owner)`

Number Of:

`Meera P. (buyer)`

From Listing:

`3 BHK, Silver Heights #L-8841`

When:

`Today 9:45 AM`

---

# 121. REVEAL LOG REFERENCE ROW 2

Revealed By:

`User #U-9914`

State:

`flagged`

Number Of:

`19 different buyers`

Source:

`Across 6 listings in 2 days`

When:

`28–30 Jun`

---

# 122. CONTACT REVEAL EVENT DATA

The current contact-reveal system already stores Contact Request relationships and reveal timing.

Batch 15 requires an Admin investigation projection/event log supporting:

* revealer,
* person whose contact was revealed,
* target Listing/Lead context,
* timestamp,
* anomaly aggregation.

---

# 123. CURRENT CONTACT REVEAL FOUNDATION

Existing application behavior includes:

* request,
* auto/manual approval,
* approved/rejected states,
* revealed timestamp,
* CRM events.

Preserve this.

Add:

* dedicated Reveal Event records if current Contact Request granularity is insufficient,
* anomaly aggregation,
* restricted Admin view,
* audited access.

---

# 124. REVEAL EVENT IMMUTABILITY

Historical contact-reveal events must not be deleted because a Lead is later closed.

---

# 125. ANOMALY DETECTION

Reference:

`19 different buyers across 6 listings in 2 days`

This must come from real aggregation.

Do not hard-code.

---

# 126. FLAGGED CONTACT ABUSE

Flagging a Reveal pattern should create:

* Security/Fraud alert,
* review state.

Do not automatically ban solely from a display threshold unless approved rule exists.

---

# 127. REVEAL LOG FILTER FOUNDATION

Architecture should support:

* date,
* user,
* Listing,
* flagged only.

Do not add conflicting visible controls beyond source design unless needed elsewhere.

---

# 128. PII DATA MINIMIZATION

The screen source does not require showing the actual phone number column.

Do not add full phone numbers unnecessarily.

---

# 129. SCREEN 7 — MESSAGE REPORT REVIEW

Exact heading concept:

`Message report review — flagged content in thread context`

The reviewer must see enough context to understand the flagged message.

---

# 130. THREAD CONTEXT

Reference messages:

`Is the flat available from August?`

Reply:

`Yes. To lock it, send ₹25,000 to this UPI now — no visit needed.`

Flagged:

`Share your OTP so I can generate the booking receipt.`

The flagged content is clearly marked.

---

# 131. THREAD CONTEXT WINDOW

Show:

* flagged Message,
* surrounding previous and subsequent Messages needed for context.

Do not expose an entire lifetime Message history unnecessarily if a bounded context is sufficient.

---

# 132. MESSAGE PRIVACY

Only authorised Message Report reviewers can access reported Thread context.

Normal Admin Staff must not browse private Messages.

---

# 133. MESSAGE REPORT ACCESS AUDIT

Because private Message content is sensitive:

log Staff review access.

---

# 134. MESSAGE REPORT REFERENCE

Report:

`Reported by Meera P. — "Asking for advance payment".`

Sender:

`user #U-8802`

History:

`2 prior message reports`

Use actual Report and Sender data.

---

# 135. REPORTER PRIVACY

Do not unnecessarily expose reporter identity to the reported sender in user-facing Notification.

Admin Review may see it according to policy.

---

# 136. PRIOR MESSAGE REPORT COUNT

Use actual resolved/pending history according to defined display semantics.

---

# 137. MESSAGE REPORT ACTIONS

Field:

`Reason *`

Actions:

* Warn sender
* Suspend sender…
* Dismiss report

All require Reason.

---

# 138. WARN SENDER

Required:

* Message Report status update,
* Warning event,
* Notification,
* Audit.

---

# 139. SUSPEND SENDER

Use Batch 11 Suspension architecture.

Do not create a separate message-only pseudo-suspension unless final product supports it.

---

# 140. DISMISS MESSAGE REPORT

Preserve:

* Report,
* context reference,
* reviewer,
* reason.

---

# 141. MESSAGE REPORT DATA MODEL

Current messaging actions support:

* Thread,
* Message,
* participant access,
* send/read behavior.

Batch 15 requires new report-review structures such as:

* Message Report,
* flagged Message ID,
* reporter,
* category/reason,
* status,
* reviewer,
* resolution.

---

# 142. CURRENT MESSAGE GAP

The current inspected Message actions do not provide the Batch 15 Admin Message Report workflow.

Implement:

* report submission where required,
* Admin queue/review,
* context projection,
* access audit,
* enforcement actions.

---

# 143. MESSAGE DELETION POLICY

Do not erase reported Message evidence immediately when action is taken.

Preserve evidence according to retention/legal policy.

Public/user display restrictions may be separate.

---

# 144. SCREEN 8 — SITE VISIT DISPUTE REVIEW

Exact heading concept:

`Site visit dispute review — both outcomes side-by-side`

Reference:

`Visit #V-1188 · 28 Jun, 5:00 PM · 2 BHK, Mavdi`

Badge:

`Disputed`

---

# 145. DISPUTE SIDE A — OWNER

Heading:

`OWNER (Rameshbhai P.) REPORTED`

Outcome:

`Visit completed`

Statement:

`She came at 5:15 with her husband, stayed 20 minutes.`

Submitted:

`28 Jun 6:02 PM`

---

# 146. DISPUTE SIDE B — VISITOR

Heading:

`VISITOR (Sunita B.) REPORTED`

Outcome:

`Visit didn't happen`

Statement:

`Nobody was at the property; owner's phone was off.`

Submitted:

`28 Jun 7:40 PM`

---

# 147. SIDE-BY-SIDE EVIDENCE RULE

Do not privilege one party visually before resolution.

Display both reported outcomes symmetrically.

---

# 148. DISPUTE TRIGGER

A dispute occurs when participant-reported outcomes conflict.

Example:

Host says Completed.

Visitor says Not Happened.

---

# 149. CURRENT SITE VISIT FOUNDATION

Current Site Visit actions already support:

* request,
* accept/reject,
* reschedule,
* cancel,
* host mark Completed/No Show.

Batch 15 requires additional participant outcome/dispute architecture.

---

# 150. PARTICIPANT OUTCOME MODEL

Support separate outcome submissions:

* Host outcome,
* Visitor outcome.

Do not overwrite one shared Site Visit status immediately when the first participant responds if dispute resolution requires both claims.

---

# 151. DISPUTE STATE

When outcomes conflict:

Site Visit enters:

`Disputed`

while preserving both submissions.

---

# 152. DISPUTE RESOLUTION FIELD

Exact:

`Resolution notes *`

Mandatory server-side.

---

# 153. DISPUTE DECISION CONTROLS

Exact options:

* Mark completed
* Mark not happened

Action:

`Resolve…`

---

# 154. RESOLVE CONFIRMATION

Ellipsis indicates confirmation before final resolution.

Show:

* Visit,
* selected outcome,
* Resolution Notes,
* effect on metrics/CRM where relevant.

---

# 155. RESOLUTION EFFECTS

Resolution must update:

* canonical Visit outcome,
* dispute status,
* CRM event,
* relevant Lead timeline,
* participant Notification,
* Audit.

---

# 156. SITE VISIT METRIC INTEGRITY

Business/CRM metrics must use resolved outcome.

Do not count Disputed Visit as Completed until resolved.

---

# 157. RESOLUTION CONCURRENCY

Two Staff reviewers cannot resolve differently.

Use status/version condition.

---

# 158. DISPUTE EVIDENCE

If participants can attach evidence:

store privately and permission-gate.

Do not make attachment support fake if not implemented.

---

# 159. DISPUTE AUDIT

Record:

* reviewer,
* original claims,
* selected canonical outcome,
* Resolution Note,
* timestamp.

---

# 160. SCREENS 9–10 — BUSINESS REPORTS AND EXPORTS

Screen 9 distinguishes two data classes:

### Database-native operational metrics

Can display without Analytics provider.

### Behavioral Analytics

Requires Analytics provider.

This distinction is mandatory.

---

# 161. SCREEN 9 — BUSINESS METRICS

Exact heading:

`Platform overview`

Time control:

`This week`

Action:

`Export CSV`

---

# 162. METRIC — NEW LISTINGS

Reference:

`New listings`

`86`

Comparison:

`↑ vs 71 last week`

Use real Listing submissions/publication definition consistently.

---

# 163. NEW LISTING METRIC SEMANTICS

Define whether New Listings means:

* created,
* submitted,
* approved,
* published.

Use one definition across current/previous week.

Do not compare different status scopes.

---

# 164. METRIC — ACTIVE USERS

Reference:

`Active users (7 d)`

`4,212`

Comparison:

`↑ vs 3,980`

Use actual activity definition.

---

# 165. ACTIVE USER DEFINITION

Document and implement what qualifies as Active User.

Examples:

* authenticated session/activity event,
* meaningful platform action.

Do not count every Profile row as active.

If reliable activity data is unavailable:

show Setup Required/Unavailable rather than fabricate.

---

# 166. METRIC — LEADS CREATED

Reference:

`Leads created`

`512`

Comparison:

`↓ vs 545`

Use real Lead records.

---

# 167. CITY-WISE NEW LISTINGS

Exact section:

`CITY-WISE NEW LISTINGS`

Reference:

* Ahmedabad — 32
* Surat — 22
* Rajkot — 18
* Vadodara — 14

Production values must be real.

---

# 168. CITY AGGREGATION

Use canonical Location relationship where possible.

Avoid grouping:

Ahmedabad
and
Ahemdabad

as separate cities because of free-text errors.

Batch 14 canonical Location architecture should feed this report.

---

# 169. DATABASE-NATIVE METRIC RULE

Exact source:

`Counts come from the platform database directly — no analytics provider needed for these.`

Therefore:

* Listing count,
* Lead count,
* City aggregation

must not depend on PostHog.

---

# 170. BEHAVIORAL ANALYTICS SETUP REQUIRED

Exact:

`Behavioral analytics — Setup Required`

Copy:

`Funnels, session trends and conversion charts need the analytics provider connected. Nothing is simulated in the meantime.`

Action:

`Connect analytics →`

---

# 171. NO FAKE FUNNELS

Without Analytics provider:

do not display:

* fake Conversion Funnel,
* fake Session Trend,
* fake CTR,
* fake Time on Page.

---

# 172. CONNECT ANALYTICS

Opens Batch 13 Provider setup for Analytics.

No dead action.

---

# 173. BUSINESS REPORT CSV

`Export CSV`

exports actual current report data.

It must respect:

* time period,
* current metric/report scope.

Do not export unrelated entire database.

---

# 174. BUSINESS REPORT QUERY PERFORMANCE

Use aggregate queries/views.

Do not load all Listings and count in JavaScript.

---

# 175. BUSINESS METRIC CACHE

For large aggregates:

use safe caching/materialized reporting where needed.

Display freshness timestamp if data is not real-time.

---

# 176. SCREEN 10 — EXPORT MANAGEMENT

Exact sections:

`Request an export`

and:

`Your exports`

---

# 177. EXPORT DATA TYPE

Exact options:

* Listings
* Leads
* Users
* Payments
* Audit logs

---

# 178. DATA TYPE PERMISSION

Different export types require separate permission sensitivity.

Examples:

### Listings

standard operational export.

### Users

may contain PII and requires sensitive export permission.

### Payments

financial permission.

### Audit Logs

Audit Manager/Super Admin and explicit Export permission.

Do not authorize based only on access to Export page.

---

# 179. EXPORT DATE RANGE

Fields:

* From
* To

Reference:

`1 Jun`

to:

`30 Jun`

Validate:

* start <= end,
* allowed maximum range per data type.

---

# 180. EXPORT FORMAT

Exact options:

* CSV
* XLSX
* JSON

---

# 181. REQUEST EXPORT

Action:

`Request export`

creates a real Export Job.

Do not generate huge files synchronously in Browser.

---

# 182. EXPORT JOB STATES

Source examples require:

* Ready
* Processing
* Failed

Support real lifecycle:

* Queued
* Processing
* Ready
* Failed
* Expired

---

# 183. EXPORT REFERENCE 1 — READY

`Listings · 1–30 Jun · CSV`

State:

`Ready · 2.1 MB · link expires in 24 h`

Badge:

`Ready`

Action:

`Download`

---

# 184. EXPORT FILE SIZE

Use actual generated file size.

Do not estimate fake 2.1 MB.

---

# 185. EXPORT LINK EXPIRY

Reference:

`link expires in 24 h`

Use short-lived signed/private download access.

Do not expose a permanent public file URL.

---

# 186. EXPORT DOWNLOAD AUTHORIZATION

Even with a signed link:

verify appropriate ownership/Staff permission model.

Do not allow sharing a permanent URL.

---

# 187. EXPORT REFERENCE 2 — PROCESSING

`Leads · 1–30 Jun · XLSX`

State:

`Processing — ~2 min remaining`

Badge:

`Processing`

---

# 188. ETA HONESTY

Only show ETA if the system can estimate it meaningfully.

Otherwise display:

Processing.

Do not fake countdown.

---

# 189. EXPORT REFERENCE 3 — FAILED

`Audit logs · 1 Jan–30 Jun · JSON`

State:

`Failed — range too large. Try 3 months max.`

Badge:

`Failed`

Action:

`Retry`

---

# 190. RANGE LIMIT VALIDATION

For Audit Log example:

maximum range is 3 months.

Prefer validating before job execution.

If server/job still rejects:

show safe actionable error.

---

# 191. RETRY EXPORT

Retry:

* revalidates current permission,
* revalidates parameters,
* creates/resumes a safe Job,
* avoids uncontrolled duplicate generation.

---

# 192. EXPORT DATA SNAPSHOT

Define whether Export uses:

* request-time snapshot,
* query-at-processing-time.

For auditability, store query/filter parameters and generation time.

---

# 193. EXPORT AUDIT

Record:

* requester Staff,
* data type,
* date range,
* format,
* record count,
* result,
* download action where sensitive.

---

# 194. SENSITIVE DOWNLOAD AUDIT

Downloads of:

* Users,
* Payments,
* Audit Logs

should be auditable according to policy.

---

# 195. EXPORT FILE STORAGE

Use private storage.

Automatic cleanup after expiry/retention window.

Do not store sensitive Export files permanently without policy.

---

# 196. XLSX GENERATION

Use actual XLSX generation.

Do not rename CSV file to `.xlsx`.

---

# 197. JSON EXPORT

Use valid machine-readable JSON.

For large datasets:

stream/chunk safely.

---

# 198. CSV SAFETY

Escape:

* commas,
* quotes,
* line breaks.

Protect against spreadsheet formula injection for untrusted text fields where relevant.

---

# 199. EXPORT PAGINATION/BATCHING

Export jobs must process large datasets in batches.

Do not perform unbounded single-query reads.

---

# 200. EXPORT MANAGEMENT CURRENT GAP

No complete Batch 15 Export Management route was found in the inspected current Admin implementation.

Build:

* request form,
* typed jobs,
* format support,
* range validation,
* status tracking,
* private download,
* Retry,
* expiry.

---

# 201. SCREENS 11–12 — BULK AND MAKER-CHECKER

These are governance controls for high-impact Admin actions.

Do not treat them as optional polish.

---

# 202. SCREEN 11 — BULK ACTION PREVIEW

Exact source:

`Bulk action — preview of affected records first`

Example:

`Approve 12 listings?`

---

# 203. BULK PREVIEW COPY

Reference:

`Review the affected records below. All 12 go live immediately and owners are notified.`

The impact text must match actual Bulk action.

---

# 204. AFFECTED RECORD LIST

Reference:

* `#L-8841 · 3 BHK, Silver Heights, Rajkot`
* `#L-8843 · 2 BHK, Iscon Platinum, Ahmedabad`
* `#L-8847 · Shop, Yogi Chowk, Surat`
* `#L-8850 · Plot, Kalawad Road, Rajkot`

and:

`…and 8 more (scroll)`

---

# 205. BULK PREVIEW DATA

The preview list must be generated from actual selected record IDs.

Do not trust arbitrary Client-provided display labels.

Server must re-fetch affected records.

---

# 206. PREVIEW BEFORE EXECUTION

Required sequence:

select records
→ request Bulk Preview
→ server validates eligibility
→ display affected records and count
→ Staff confirms
→ server revalidates state
→ execute.

Do not execute before Preview.

---

# 207. BULK ACTION COUNT

`12`

must be exact eligible-record count.

If 15 selected but 3 no longer eligible:

Preview must explain eligible/excluded records.

---

# 208. BULK ACTION ELIGIBILITY

For Bulk Approve:

each Listing must be:

* Pending/Under Review as allowed,
* same current revision reviewed,
* not already approved/rejected,
* satisfy required moderation gates.

Do not bypass RERA or other entity-specific gates.

---

# 209. BULK APPROVE NOTIFICATION

Reference says Owners are notified.

Create real Notification for affected users.

Prevent duplicate Notification on retry.

---

# 210. BULK ACTION AUDIT

Record:

* action type,
* Staff actor,
* affected IDs or safe batch reference,
* count,
* reason where required,
* timestamp.

For large batches:

store a batch relation rather than giant unsafe JSON.

---

# 211. BULK ACTION TRANSACTION STRATEGY

For manageable batch size:

use transaction/RPC.

For larger asynchronous batches:

use durable job with per-record status and resumability.

Do not produce half-complete state without visibility.

---

# 212. BULK ACTION IDEMPOTENCY

Retry must not re-notify or re-apply already completed records.

---

# 213. BULK ACTION UI

Exact actions:

* Cancel
* Approve all 12

Primary action wording must include actual count.

---

# 214. BULK SCROLL AREA

Long affected-record list should scroll within the designed panel.

Do not expand modal beyond viewport.

---

# 215. SCREEN 12 — MAKER-CHECKER QUEUE

Exact heading:

`Maker-checker pending approvals`

Source rule:

`Four-eyes rule: the checker must be a different admin than the maker — your own submissions show Approve/Reject disabled.`

This is mandatory.

---

# 216. MAKER-CHECKER CONCEPT

For configured high-risk action:

Maker creates Request.

Checker reviews.

Only after Checker approval does execution proceed.

Sequence:

Maker submits
→ Pending Approval
→ different Staff reviews
→ Approve or Reject
→ action executes or is cancelled/rejected.

---

# 217. MAKER-CHECKER TABLE COLUMNS

Exact:

* MAKER
* ACTION
* WAITING

---

# 218. MAKER-CHECKER REFERENCE ROW 1

Maker:

`kunal@mgp.in`

Action:

`Manual refund ₹24,999 — Broker plan, user #U-7141`

Reason:

`Charged twice due to gateway retry`

Waiting:

`2 h`

Actions:

* Approve…
* Reject…

---

# 219. MAKER-CHECKER REFUND INTEGRATION

High-risk Manual Refund must connect to Batch 12 Refund/Payment system.

Approval must not create a disconnected refund note.

After checker approval:

* revalidate Payment,
* revalidate refundable balance,
* execute approved Refund orchestration.

---

# 220. MAKER-CHECKER REFERENCE ROW 2

Maker:

`You (priya@mgp.in)`

Action:

`Bulk-suspend 4 accounts flagged for OTP flooding`

Reason:

`Security event SE-2214`

Waiting:

`20 min`

Own actions:

Approve disabled.

Helper:

`You made this — another admin must check it`

---

# 221. OWN REQUEST ACTIONS DISABLED

Frontend:

Approving/rejecting controls disabled.

Server:

must independently reject self-check attempts.

UI-only disabled state is not sufficient.

---

# 222. CHECKER MUST DIFFER FROM MAKER

Server rule:

`checker_staff_id != requested_by_staff_id`

mandatory.

---

# 223. MAKER-CHECKER APPROVE

Action:

`Approve…`

opens confirmation showing:

* Maker,
* action,
* target/affected records,
* reason,
* impact.

After confirmation:

* status transition,
* execution,
* Audit.

---

# 224. MAKER-CHECKER REJECT

`Reject…`

requires rejection reason.

The Maker should be notified.

---

# 225. STALE REQUEST REVALIDATION

Before Checker approval:

revalidate current target state.

Example:

Refund already processed through another route
→ pending maker-checker Request cannot execute again.

---

# 226. REQUEST EXPIRY

High-risk requests may expire after defined window.

Use status:

Expired.

Do not leave stale approval requests indefinitely actionable.

---

# 227. MAKER-CHECKER STATUS MODEL

The current domain types already include:

* Draft
* Pending Approval
* Approved
* Rejected
* Cancelled
* Executed
* Expired

Preserve and implement actual workflows.

---

# 228. APPROVED VS EXECUTED

Approval and Execution are different states.

If Checker approves but execution fails:

do not mark Executed.

Use:

Approved
→ execution processing
→ Executed

or recovery state.

---

# 229. EXECUTION FAILURE

For failed execution:

* preserve Approval,
* log failure,
* make retry/reconciliation available according to action type.

Do not ask another Checker to approve the exact same already-approved intent unless policy requires a new Request.

---

# 230. MAKER-CHECKER ACTION TYPES

Use the system for configured high-risk actions such as:

* large/manual Refund,
* Bulk Suspension,
* high-value Credit Note,
* sensitive financial override,
* mass Moderation action,
* provider/system high-risk action where policy requires.

Do not send every trivial Admin action through maker-checker.

---

# 231. MAKER-CHECKER AUDIT

Record:

* Maker,
* Request created,
* Checker,
* decision,
* rejection reason if any,
* execution result,
* timestamps.

---

# 232. CURRENT MAKER-CHECKER FOUNDATION

The current domain model already defines an Admin Action Request foundation with:

* action type,
* module,
* target,
* requested Staff,
* safe payload,
* reason,
* statuses.

Batch 15 requires turning this foundation into:

* real request creation,
* pending queue,
* self-check prevention,
* approval/rejection,
* execution orchestration,
* audit.

---

# 233. SECURITY EVENT TO MAKER-CHECKER INTEGRATION

Reference bulk-suspension Request links to:

`Security event SE-2214`

Preserve source context.

Do not store only free-text reason with no Security Event relation.

---

# 234. REPORT ENFORCEMENT TO MAKER-CHECKER

Where policy requires high-risk enforcement:

Report Detail action may create a maker-checker Request instead of immediate execution.

The UI must clearly show:

Submitted for approval

rather than pretending Suspension happened.

---

# 235. DATABASE REQUIREMENTS — AUDIT

Existing Audit model supports:

* actor,
* role,
* action,
* module,
* target,
* safe before/after snapshots,
* safe metadata.

Extend as needed for:

* display reference,
* masked network context relation,
* search support.

Do not weaken append-only behavior.

---

# 236. DATABASE REQUIREMENTS — SECURITY EVENTS

Support:

* display ID,
* event type,
* severity,
* actor type,
* User/Staff relation,
* masked network summary,
* restricted evidence reference,
* count/aggregation fields where appropriate,
* automatic action,
* review status,
* occurred at.

---

# 237. DATABASE REQUIREMENTS — IP BLOCKS

Support:

* normalized restricted IP/network identity,
* masked display,
* reason,
* source Security Event,
* starts at,
* expires at,
* status,
* created by System/Staff.

---

# 238. DATABASE REQUIREMENTS — REPORTS

Generic Report should support:

* display ID,
* source type,
* reporter Profile where applicable,
* system detector source where applicable,
* category,
* target type,
* target ID,
* priority,
* status,
* description,
* reviewer,
* decision,
* decision reason,
* timestamps.

---

# 239. REPORT ATTACHMENTS

Support:

* Report ID,
* private Media reference,
* attachment type,
* uploaded at.

---

# 240. DATABASE REQUIREMENTS — DUPLICATE LEAD MERGE

Support:

* canonical Lead,
* duplicate Lead,
* merge status,
* merged by,
* merged at,
* source alert/report.

The duplicate Lead must store canonical pointer or a merge relation must resolve it.

---

# 241. DATABASE REQUIREMENTS — REVEAL EVENTS

If Contact Request history is insufficient, add immutable Reveal Event structure supporting:

* Lead,
* requester,
* receiver,
* Listing/Project context,
* reveal decision source,
* revealed at,
* anomaly flag relation.

---

# 242. DATABASE REQUIREMENTS — MESSAGE REPORTS

Support:

* display ID,
* Thread ID,
* flagged Message ID,
* reporter,
* category,
* description,
* status,
* reviewed by,
* decision,
* reason,
* timestamps.

---

# 243. DATABASE REQUIREMENTS — VISIT OUTCOMES

Support separate participant submissions:

* Site Visit ID,
* participant Profile,
* participant role,
* reported outcome,
* statement,
* submitted at.

---

# 244. DATABASE REQUIREMENTS — VISIT DISPUTE

Support:

* Site Visit,
* dispute state,
* resolved outcome,
* Resolution Note,
* reviewer,
* resolved at.

---

# 245. DATABASE REQUIREMENTS — EXPORT JOBS

Support:

* display ID,
* requested by Staff,
* data type,
* format,
* date range,
* filters,
* status,
* progress,
* file reference,
* size,
* expires at,
* safe error,
* record count,
* created/finished timestamps.

---

# 246. EXPORT FILE ACCESS LOG

For sensitive exports:

record:

* Staff downloader,
* Export Job,
* time.

---

# 247. DATABASE REQUIREMENTS — BULK ACTION BATCH

Support:

* action type,
* requested/confirmed by Staff,
* affected-record relation or stable snapshot,
* eligible count,
* status,
* execution progress,
* audit reference.

---

# 248. DATABASE REQUIREMENTS — MAKER-CHECKER

Existing Admin Action Request foundation should additionally support:

* checker Staff ID,
* decision reason,
* decided at,
* executed at,
* execution error safe summary,
* related source entity.

---

# 249. REPORT ACTION REASON STORAGE

Reasons must be structured/safe.

Separate:

* User-visible enforcement reason,
* Internal-only investigation Note

where necessary.

Do not leak internal fraud analysis to public users.

---

# 250. AUDIT AND SECURITY TIMEZONE

Batch references are human-readable local times.

Store timestamps consistently.

Render Admin times in approved Admin timezone, typically IST.

Avoid ambiguous dates.

---

# 251. SEARCH AND FILTER PERFORMANCE

Use indexed server-side queries for:

* Audit Search,
* Report Queue,
* Export Jobs.

Do not fetch full tables into Client.

---

# 252. N+1 PREVENTION

Avoid N+1 in:

* Audit actor/target enrichment,
* Report reporter/entity display,
* related report history,
* duplicate Lead relationships,
* Contact Reveal listing context,
* Message report sender history,
* Site Visit participant names,
* City report aggregation,
* Export Job user/requester display,
* Maker/Checker names.

Use batch joins/views/RPC.

---

# 253. SENSITIVE SCREEN ACCESS AUDITING

At minimum audit access to:

* Contact Reveal Logs,
* Message Report private Thread context,
* restricted Report evidence where policy requires.

Do not audit every ordinary public Page view as a Staff investigation event.

---

# 254. SECURITY DATA RETENTION

Define retention for:

* full raw security evidence,
* masked operational summaries.

Do not retain excessive raw device/IP data without policy.

---

# 255. LOADING STATES

Required for:

* Audit Logs,
* Audit Detail,
* Security Dashboard,
* Report Queue,
* Report Detail,
* Duplicate Lead Review,
* Reveal Logs,
* Message Report,
* Visit Dispute,
* Business Metrics,
* Export Jobs,
* Bulk Preview,
* Maker-Checker Queue.

Use screen-shaped skeletons.

---

# 256. EMPTY STATES

Required:

### Audit

No log entries match filters.

### Security

No recent security events.

### Reports

No pending reports.

### Duplicate Leads

No duplicate Lead reviews.

### Reveal Logs

No matching Reveal Events.

### Message Reports

No pending Message Reports.

### Visit Disputes

No unresolved disputes.

### Exports

No exports yet.

### Maker-Checker

No pending approvals.

Use positive/honest copy.

---

# 257. ERROR STATES

Required:

* Audit load failure,
* Security aggregate failure,
* Report queue failure,
* evidence load failure,
* enforcement action failure,
* Lead merge failure,
* Reveal Log load failure,
* Message context load failure,
* Visit dispute resolution failure,
* Business Report failure,
* Export Job failure,
* Bulk Preview stale-state error,
* Maker-Checker execution failure.

Do not expose raw stack traces or SQL errors.

---

# 258. RESPONSIVE VERIFICATION MATRIX

Test:

* 360px,
* 390px,
* tablet portrait,
* tablet landscape,
* laptop,
* 1280px desktop,
* wide desktop.

---

# 259. AUDIT RESPONSIVE CHECK

Desktop:

table.

Mobile:

source-defined cards with contextual Back header.

Read-only detail diff must remain readable.

---

# 260. SECURITY DASHBOARD RESPONSIVE CHECK

Metric cards stack intentionally.

Security Event table transforms to cards where needed.

Long safe Detail summaries wrap correctly.

---

# 261. REPORT QUEUE RESPONSIVE CHECK

Desktop table to mobile cards.

Preserve:

* Type,
* Entity,
* Reporter,
* Submitted,
* Priority.

---

# 262. REPORT DETAIL RESPONSIVE CHECK

Verify:

* evidence,
* screenshots,
* Listing Preview,
* Related History,
* Reason,
* all four actions.

No action overlap.

---

# 263. DUPLICATE LEAD RESPONSIVE CHECK

The two Lead records must remain clearly comparable.

On mobile:

stack as:

Keep Record
then
Merge-In Record

with clear labels.

Do not lose which one is canonical.

---

# 264. REVEAL LOG RESPONSIVE CHECK

Long Listing titles and anomaly summaries must wrap.

Restricted-view warning remains visible.

---

# 265. MESSAGE REPORT RESPONSIVE CHECK

Thread context remains readable.

Flagged Message stays visually distinct.

---

# 266. VISIT DISPUTE RESPONSIVE CHECK

Desktop side-by-side.

Mobile stacked:

Owner Report
then Visitor Report.

Keep visual neutrality.

---

# 267. BUSINESS REPORT RESPONSIVE CHECK

Metric cards and City table/list remain readable.

Setup Required panel remains visible.

---

# 268. EXPORT RESPONSIVE CHECK

Request controls stack safely.

Export cards preserve:

* Data Type,
* Range,
* Format,
* Status,
* action.

---

# 269. BULK PREVIEW RESPONSIVE CHECK

Affected-record list scrolls within viewport.

Confirmation action remains visible.

---

# 270. MAKER-CHECKER RESPONSIVE CHECK

Rows/cards preserve:

* Maker,
* Action,
* Reason,
* Waiting time,
* Approve/Reject availability.

Own Request disabled state must be clear.

---

# 271. TEXT WRAPPING VERIFICATION

Explicitly inspect:

* actor email,
* long Audit Action,
* target display,
* Security Detail,
* Report evidence,
* Related History,
* Lead context,
* contact-abuse summaries,
* Thread Messages,
* Resolution Notes,
* Export failure reasons,
* maker-checker action descriptions.

Fix:

* clipping,
* overlapping badges,
* hidden action labels,
* broken ID wrap.

Do not randomly shrink typography.

---

# 272. NO DEAD UI RULE

Every visible Batch 15 action must work.

Includes:

* Audit Search,
* Actor Filter,
* Module Filter,
* Date Filter,
* Audit row,
* Clear Filters,
* Audit Retry,
* Security time range,
* Report Review,
* evidence attachment view,
* Open Listing,
* View Full History,
* Warn User,
* Suspend User,
* Remove Listing,
* Dismiss Report,
* Not Duplicates,
* Merge Lead,
* Contact Reveal Log access,
* Message Warn,
* Message Suspend,
* Message Dismiss,
* Mark Completed,
* Mark Not Happened,
* Resolve Dispute,
* Business Export CSV,
* Connect Analytics,
* Data Type selector,
* From/To,
* CSV/XLSX/JSON,
* Request Export,
* Download,
* Retry Export,
* Bulk Cancel,
* Bulk Confirm,
* Maker-Checker Approve,
* Maker-Checker Reject.

No:

`href="#"`.

No empty click handlers.

---

# 273. SCREEN 1 FINAL CHECKLIST — AUDIT

* [ ] append-only notice
* [ ] no edit action
* [ ] no delete action
* [ ] no overflow menu
* [ ] Search Actor/Target
* [ ] Actor Filter
* [ ] Module Filter
* [ ] Last 7 Days Filter
* [ ] Actor column
* [ ] Action column
* [ ] Target column
* [ ] When column
* [ ] System actor
* [ ] human display IDs
* [ ] row opens Detail
* [ ] Read-Only label
* [ ] masked IP
* [ ] Before section
* [ ] After section
* [ ] clear Diff rendering
* [ ] mobile card transform
* [ ] loading state
* [ ] exact filtered Empty state
* [ ] Clear Filters
* [ ] exact Error state
* [ ] Retry
* [ ] pagination
* [ ] database append-only enforcement

---

# 274. SCREEN 2 FINAL CHECKLIST — SECURITY

* [ ] Security Dashboard
* [ ] Last 24 Hours
* [ ] 7 Days
* [ ] 30 Days
* [ ] Failed Login count
* [ ] real Spike summary
* [ ] Rate Limit count
* [ ] real route/category summary
* [ ] Suspicious IP count
* [ ] auto-block count
* [ ] pending review count
* [ ] Recent Security Events
* [ ] Type
* [ ] Detail
* [ ] Severity
* [ ] When
* [ ] OTP Flooding
* [ ] masked IP
* [ ] real Auto Block
* [ ] Credential Stuffing
* [ ] safe device summary
* [ ] Admin New Device
* [ ] OTP verification honesty
* [ ] no fake security metrics
* [ ] restricted raw evidence
* [ ] responsive behavior

---

# 275. SCREEN 3 FINAL CHECKLIST — REPORT QUEUE

* [ ] Type
* [ ] Reported Entity
* [ ] Reporter
* [ ] Submitted
* [ ] Priority
* [ ] Fraud row
* [ ] Spam row
* [ ] Duplicate Lead row
* [ ] User Reporter
* [ ] System Reporter
* [ ] High Priority
* [ ] Medium Priority
* [ ] Low Priority
* [ ] Review action
* [ ] unresolved queue semantics
* [ ] pagination
* [ ] mobile cards
* [ ] current public report foundation preserved

---

# 276. SCREEN 4 FINAL CHECKLIST — REPORT DETAIL

* [ ] Report Display ID
* [ ] category
* [ ] High Priority badge
* [ ] reported entity
* [ ] reporter
* [ ] submitted time
* [ ] Evidence text
* [ ] private screenshots
* [ ] secure evidence access
* [ ] Listing Preview
* [ ] price
* [ ] property title
* [ ] poster reference
* [ ] live age
* [ ] Lead count
* [ ] Open action
* [ ] Related History
* [ ] prior Report count
* [ ] upheld count
* [ ] dismissed count
* [ ] Account age
* [ ] View Full History
* [ ] mandatory Reason
* [ ] Warn User
* [ ] Suspend User
* [ ] Remove Listing
* [ ] Dismiss Report
* [ ] all actions audited
* [ ] Notification
* [ ] stale decision protection

---

# 277. SCREEN 5 FINAL CHECKLIST — DUPLICATE LEAD

* [ ] Keep Older/Richer label
* [ ] canonical Lead reference
* [ ] user name
* [ ] contact
* [ ] created date
* [ ] enquiry context
* [ ] Note count
* [ ] Site Visit count
* [ ] status
* [ ] Merge-In label
* [ ] newer Lead reference
* [ ] same-number indicator
* [ ] scheduled Visit context
* [ ] Not Duplicates
* [ ] Merge Into canonical
* [ ] confirmation
* [ ] Timeline merge
* [ ] Note merge
* [ ] Visit preservation
* [ ] Lead source context preservation
* [ ] canonical pointer
* [ ] duplicate closure
* [ ] irreversible warning
* [ ] transactional merge
* [ ] idempotency
* [ ] Audit

---

# 278. SCREEN 6 FINAL CHECKLIST — REVEAL LOGS

* [ ] restricted warning
* [ ] Abuse Investigation permission
* [ ] view access audited
* [ ] Revealed By
* [ ] Number Of
* [ ] From Listing
* [ ] When
* [ ] normal Reveal row
* [ ] flagged anomaly row
* [ ] real different-buyer count
* [ ] real Listing count
* [ ] real time window
* [ ] no unnecessary full phone display
* [ ] masked/safe investigation context
* [ ] immutable Reveal history
* [ ] anomaly detection integration

---

# 279. SCREEN 7 FINAL CHECKLIST — MESSAGE REPORT

* [ ] Thread Context
* [ ] surrounding Messages
* [ ] Flagged Message highlight
* [ ] Report detail
* [ ] Reporter
* [ ] category
* [ ] Sender reference
* [ ] prior Message Report count
* [ ] sensitive access permission
* [ ] Thread Review access audited
* [ ] mandatory Reason
* [ ] Warn Sender
* [ ] Suspend Sender
* [ ] Dismiss Report
* [ ] evidence retention
* [ ] Notification
* [ ] Audit

---

# 280. SCREEN 8 FINAL CHECKLIST — VISIT DISPUTE

* [ ] Visit Display ID
* [ ] date/time
* [ ] Property context
* [ ] Disputed badge
* [ ] Owner Report panel
* [ ] Owner outcome
* [ ] Owner statement
* [ ] Owner submitted time
* [ ] Visitor Report panel
* [ ] Visitor outcome
* [ ] Visitor statement
* [ ] Visitor submitted time
* [ ] neutral side-by-side treatment
* [ ] Resolution Notes required
* [ ] Mark Completed
* [ ] Mark Not Happened
* [ ] Resolve confirmation
* [ ] canonical Visit outcome
* [ ] CRM event
* [ ] Lead timeline update
* [ ] participant Notifications
* [ ] Audit
* [ ] concurrency protection

---

# 281. SCREEN 9 FINAL CHECKLIST — BUSINESS REPORTS

* [ ] Platform Overview
* [ ] This Week
* [ ] Export CSV
* [ ] New Listings
* [ ] comparison period
* [ ] Active Users 7d
* [ ] documented Active User definition
* [ ] Leads Created
* [ ] comparison
* [ ] City-wise New Listings
* [ ] Ahmedabad
* [ ] Surat
* [ ] Rajkot
* [ ] Vadodara
* [ ] real DB aggregates
* [ ] canonical City grouping
* [ ] no Analytics Provider required for DB counts
* [ ] Behavioral Analytics Setup Required
* [ ] no fake Funnels
* [ ] no fake Session Trends
* [ ] Connect Analytics
* [ ] Provider route integration

---

# 282. SCREEN 10 FINAL CHECKLIST — EXPORTS

* [ ] Request Export section
* [ ] Listings type
* [ ] Leads type
* [ ] Users type
* [ ] Payments type
* [ ] Audit Logs type
* [ ] per-type permission checks
* [ ] From date
* [ ] To date
* [ ] range validation
* [ ] CSV
* [ ] XLSX
* [ ] JSON
* [ ] Request Export
* [ ] async Job
* [ ] Your Exports
* [ ] Ready state
* [ ] actual file size
* [ ] 24-hour link expiry
* [ ] Download
* [ ] private storage
* [ ] signed access
* [ ] Processing state
* [ ] honest ETA only
* [ ] Failed state
* [ ] safe Error
* [ ] Retry
* [ ] Audit Log max-range policy
* [ ] batching
* [ ] formula-injection protection
* [ ] sensitive download audit

---

# 283. SCREEN 11 FINAL CHECKLIST — BULK ACTION

* [ ] Bulk Preview
* [ ] affected count
* [ ] impact explanation
* [ ] real affected-record list
* [ ] Listing Display IDs
* [ ] title/location context
* [ ] scroll for long list
* [ ] server re-fetch of selected IDs
* [ ] eligibility validation
* [ ] excluded/stale record handling
* [ ] Cancel
* [ ] Approve All count
* [ ] final revalidation
* [ ] transaction/durable job
* [ ] Notifications
* [ ] idempotency
* [ ] Audit

---

# 284. SCREEN 12 FINAL CHECKLIST — MAKER-CHECKER

* [ ] pending approval queue
* [ ] Four-Eyes explanation
* [ ] Maker column
* [ ] Action column
* [ ] Waiting column
* [ ] Manual Refund request
* [ ] amount
* [ ] Plan/User context
* [ ] reason
* [ ] waiting time
* [ ] Approve
* [ ] Reject
* [ ] approval confirmation
* [ ] rejection reason
* [ ] self-made Request row
* [ ] `You` indicator
* [ ] self Approve disabled
* [ ] self Reject disabled according to source
* [ ] helper explanation
* [ ] server checker ≠ maker
* [ ] stale-target revalidation
* [ ] Approved vs Executed distinction
* [ ] execution failure recovery
* [ ] request expiry
* [ ] Maker Notification
* [ ] complete Audit

---

# 285. FULL CONNECTED BATCH 15 REGRESSION FLOW

Execute this complete real test:

Login as Audit Manager
→ open Audit Viewer
→ search Staff actor
→ filter Actor
→ filter Users module
→ filter Last 7 Days
→ open Log Detail
→ verify Read-Only state
→ verify Before/After Diff
→ inspect Browser payload
→ verify full IP not exposed
→ attempt direct Audit update/delete through normal application role
→ verify denied
→ open Security Dashboard as Security Manager
→ switch 24h / 7d / 30d
→ verify real Failed Login counts
→ trigger isolated test Rate Limit event
→ verify count update
→ trigger isolated OTP flood fixture
→ verify masked IP
→ verify actual temporary block state
→ open Reports Queue
→ submit a real test Listing Report from public user fixture
→ verify queue row
→ open Report Detail
→ inspect private evidence
→ verify Listing Preview
→ verify Related History
→ attempt Warn without Reason
→ verify blocked
→ Warn with Reason
→ verify Notification and Audit
→ create second test Report
→ Suspend User using full Batch 11 flow
→ verify coordinated account effects
→ create Duplicate Lead fixture
→ open Duplicate Review
→ verify canonical and Merge-In records
→ select Merge
→ verify confirmation and irreversible warning
→ confirm
→ verify Notes, Timeline and Visits preserved once
→ verify duplicate Lead pointer
→ open Contact Reveal Logs as normal Reports Manager without Abuse Investigation permission
→ verify Forbidden
→ grant test Abuse Investigation permission
→ open Reveal Logs
→ verify access Audit created
→ inspect flagged anomaly aggregation
→ verify actual phone not unnecessarily exposed
→ create Message Report fixture
→ open Admin Message Report
→ verify bounded Thread Context
→ verify flagged Message
→ verify access Audit
→ Warn Sender with Reason
→ verify Notification
→ create Site Visit conflicting outcome fixture
→ verify Visit becomes Disputed
→ open Dispute Review
→ compare both statements
→ attempt Resolve without Notes
→ verify blocked
→ choose canonical outcome
→ Resolve
→ verify Site Visit, CRM and Lead timeline
→ open Business Reports
→ verify database-native Listing/Lead counts
→ verify Analytics Setup Required when provider unavailable
→ connect isolated Analytics test provider if available
→ verify Behavioral Analytics only after real data
→ request Listings CSV Export
→ verify Processing
→ verify Ready
→ Download through private expiring access
→ verify Download Audit
→ request oversized Audit JSON Export
→ verify range validation/failure
→ retry with valid range
→ verify Ready
→ create Bulk Approve fixture with 12 Pending Listings
→ open Preview
→ verify exact eligible count and affected records
→ make one record stale in second session
→ confirm Bulk Action
→ verify stale/eligible handling according to policy
→ verify Notifications and Audit
→ create maker-checker Manual Refund Request as Kunal fixture
→ login as Priya checker
→ Approve
→ verify Batch 12 Refund orchestration executes once
→ create Bulk Suspend maker request as Priya
→ remain logged in as Priya
→ verify own Approve/Reject disabled
→ attempt server-side self-approval
→ verify denied
→ login as second authorised Checker
→ review and decide
→ inspect complete Audit trail
→ run mobile Admin regression
→ tablet regression
→ desktop regression.

Any broken governance connection means Batch 15 is incomplete.

---

# 286. AUDIT IMMUTABILITY TEST

Attempt using normal application/admin paths:

* UPDATE Audit row,
* DELETE Audit row.

Expected:

Denied.

Then verify:

Audit Viewer still displays unchanged record.

---

# 287. REPORT CONCURRENCY TEST

Open one pending Report in two Staff sessions.

Session A:

Dismisses with Reason.

Session B:

Attempts Suspend action from stale screen.

Expected:

stale-state conflict.

No second conflicting decision.

---

# 288. DUPLICATE LEAD IDEMPOTENCY TEST

Trigger Merge twice rapidly.

Expected:

* one canonical Lead,
* one closed duplicate,
* Notes not duplicated,
* Site Visits not duplicated,
* one Audit merge event.

---

# 289. REVEAL LOG ACCESS TEST

Staff without Abuse Investigation permission:

Denied.

Staff with permission:

Allowed.

Opening restricted view:

creates access Audit.

---

# 290. MESSAGE PRIVACY TEST

Staff without Message Report permission attempts direct Thread Report URL.

Expected:

Forbidden.

No Message content in Network response.

---

# 291. SITE VISIT DISPUTE TEST

Host reports Completed.

Visitor reports Not Happened.

Expected:

* Disputed state,
* both claims preserved,
* Business metric does not count as resolved Completed,
* Admin resolution required.

---

# 292. DATABASE METRIC HONESTY TEST

Disable Analytics Provider.

Expected:

DB-native metrics still show:

* Listings,
* Leads,
* City counts.

Behavioral section:

Setup Required.

No fake charts.

---

# 293. EXPORT SECURITY TEST

View-only Reports Staff requests Payment Export.

Expected:

Denied unless Payment/Export permission exists.

Audit Manager requests Audit Export with valid range.

Expected:

allowed.

---

# 294. EXPORT LINK EXPIRY TEST

Generate test Export.

After expiry simulation:

Download denied.

Create/request regeneration according to policy.

---

# 295. BULK STALE-STATE TEST

Preview 12 Pending Listings.

Before Confirm:

approve one separately.

Confirm original batch.

Expected:

system revalidates and does not corrupt/duplicate state.

UI shows actual result count.

---

# 296. MAKER-CHECKER SELF-APPROVAL TEST

Maker creates request.

Same Staff attempts:

* UI Approve,
* direct server action Approve.

Both denied.

Second Staff with correct permission can review.

---

# 297. MAKER-CHECKER DOUBLE-APPROVAL TEST

Two different Checkers attempt approval simultaneously.

Expected:

only first valid decision transitions Request.

Second receives safe stale-state result.

Action executes once.

---

# 298. PERMISSION REGRESSION MATRIX

Test:

## Audit Manager

Can:

* Audit Viewer,
* Audit export where granted.

Cannot:

* Reveal Logs without Abuse Investigation permission,
* perform Security actions unless granted.

## Security Manager

Can:

* Security Dashboard,
* security investigations/actions.

Cannot:

* Payment Export unless granted.

## Reports Manager

Can:

* Report Queue,
* Report Detail,
* specialized Reviews according to permission.

Cannot:

* Audit Logs unless granted.

## Abuse Investigator

Can:

* Contact Reveal Logs,
* relevant sensitive investigation context.

Access is audited.

## Export Manager

Can request allowed Export types.

Sensitive types still require module permission.

## Bulk Operator

Can create eligible Bulk Preview/Request.

## Checker

Can approve Requests made by others.

Cannot approve own.

## Super Admin

Broad access while still respecting default four-eyes separation.

---

# 299. CURRENT REPOSITORY RECONCILIATION — AUDIT

Preserve:

* existing Admin Audit model,
* safe snapshots,
* pagination,
* Audit route permission.

Add:

* exact Batch 15 Viewer UI,
* Search,
* Filters,
* Diff Detail,
* masked network context,
* mobile cards,
* exact states.

---

# 300. CURRENT REPOSITORY RECONCILIATION — REPORTS

Preserve public Report submission protections:

* Auth required,
* target validation,
* category validation,
* duplicate pending prevention,
* daily cap.

Build complete Admin queue and decision system.

---

# 301. CURRENT REPOSITORY RECONCILIATION — CONTACT REVEAL

Preserve current:

* contact request,
* auto/manual approval,
* reveal state,
* CRM events,
* Notification.

Add:

* immutable Admin investigation view,
* anomaly aggregation,
* abuse-investigation permission,
* access auditing.

---

# 302. CURRENT REPOSITORY RECONCILIATION — MESSAGES

Current Messaging has real:

* Threads,
* Messages,
* participants,
* access checks,
* pagination for Message reads.

Add:

* Message Report entity,
* report submission,
* Admin bounded context review,
* private access Audit,
* decisions.

---

# 303. CURRENT REPOSITORY RECONCILIATION — SITE VISITS

Current Site Visits support:

* requested,
* accepted/rejected,
* scheduled/rescheduled,
* cancelled,
* host outcome.

Add:

* participant outcome submissions,
* conflicting outcome detection,
* Disputed state,
* Admin resolution.

---

# 304. CURRENT REPOSITORY RECONCILIATION — MAKER-CHECKER

The current domain model already has Admin Action Request types and status foundation.

Complete the workflow:

* Create,
* Pending Approval,
* Queue,
* Checker separation,
* Approve,
* Reject,
* Execute,
* Expire,
* Audit.

---

# 305. CURRENT REPOSITORY RECONCILIATION — PLACEHOLDER ADMIN REPORTS

Current Admin Support/Reports route indicates Reports/Fraud as Coming Soon.

Batch 15 completion requires removing this placeholder and implementing Screens 3–8.

---

# 306. LIVE VERIFICATION STANDARD

After every Batch 15 implementation group:

1. run Build,
2. run TypeScript check,
3. run Lint where configured,
4. start actual application,
5. login as Audit Manager,
6. login as Security Manager,
7. login as Reports Manager,
8. login as Abuse Investigator,
9. login as Export-authorised Staff,
10. login as Bulk Operator,
11. login as Checker,
12. login as Super Admin,
13. test route permission,
14. test server action permission,
15. inspect database mutations,
16. inspect Audit rows,
17. inspect sensitive access audits,
18. inspect Report decisions,
19. inspect merge results,
20. inspect dispute resolution,
21. inspect Export Jobs,
22. inspect private Export storage,
23. inspect maker-checker requests,
24. refresh Browser,
25. verify persistence,
26. test 390px mobile,
27. test tablet,
28. test desktop,
29. inspect Browser console,
30. inspect Network payload for sensitive leakage,
31. inspect raw stack/error leakage.

Static code review is not PASS.

---

# 307. MANUAL VISUAL VERIFICATION

Compare every implementation screen beside the exact Batch 15 source.

Inspect:

* Audit table density,
* append-only notice,
* filter layout,
* read-only Detail panel,
* Before/After Diff,
* masked IP,
* Security metric cards,
* Security Event severity,
* Report Queue priorities,
* Evidence section,
* Listing Preview,
* Related History,
* Take Action hierarchy,
* Duplicate Lead labels,
* Contact Reveal warning,
* Thread Context,
* Flagged Message treatment,
* Visit Dispute side-by-side layout,
* Business Metric cards,
* City list,
* Setup Required block,
* Export request controls,
* Export status cards/rows,
* Bulk Preview scroll area,
* Maker-Checker self-disabled state.

`Almost the same` is not PASS.

---

# 308. COMPLETION BLOCKERS

Batch 15 must not be marked complete while any of these remain:

* Audit Viewer is only a simple unfiltered row list,
* Audit entries can be updated/deleted,
* Audit screen has Edit/Delete/overflow action,
* no read-only Before/After Diff,
* full raw IP exposed,
* Security Dashboard missing,
* Security metrics hard-coded,
* suspicious IP raw data exposed unnecessarily,
* Auto-block displayed without real enforcement,
* Reports/Fraud remains Coming Soon,
* Report Queue not connected to public Reports,
* Report actions work without Reason,
* Report decision deletes history,
* Suspension action bypasses Batch 11 full Suspension flow,
* Remove Listing hard-deletes data,
* Duplicate Lead review missing,
* Lead merge loses Notes,
* Lead merge loses Site Visits,
* duplicate Lead remains active with no canonical pointer,
* Lead merge incorrectly made reversible contrary to Batch 15 source,
* Contact Reveal Logs accessible without Abuse Investigation permission,
* opening Reveal Logs is not audited,
* full phone values unnecessarily displayed,
* anomaly counts fake,
* Message Report workflow missing,
* Admin can browse arbitrary Message Threads without report permission,
* Message Report access is not audited,
* Site Visit dispute model missing,
* one participant outcome overwrites the other,
* Disputed Visit counted as completed before resolution,
* Resolution Notes optional,
* Business metrics fake,
* DB-native metrics incorrectly blocked because Analytics provider is missing,
* behavioral charts simulated,
* Export Management missing,
* Export generated only Client-side,
* sensitive Export files public,
* Export download link never expires,
* XLSX is fake renamed CSV,
* no date-range validation,
* no Export Retry,
* Bulk action executes before Preview,
* affected-record list fake,
* Bulk action does not revalidate stale records,
* Bulk retry duplicates Notifications,
* Maker-Checker Queue missing,
* maker can approve own Request,
* self-approval only disabled in UI but server allows it,
* approved Request marked Executed before real execution,
* high-risk execution can run twice,
* no permission enforcement,
* no audit,
* dead button,
* `href="#"`,
* table not transformed for mobile,
* sensitive PII in Browser payload,
* raw stack traces exposed,
* console errors,
* no live multi-role verification.

---

# 309. FINAL ACCEPTANCE STATEMENT

**Design Batch 15 — Admin Audit / Security / Reports is complete only when all 12 Batch 15 screen groups are implemented according to the exact source design and every investigation, decision, export, bulk action and high-risk approval is backed by real persistent data, correct permissions and immutable audit history.**

Completion requires:

* append-only Audit Log Viewer,
* Search Actor or Target,
* Actor Filter,
* Module Filter,
* Last 7 Days control,
* Actor/Action/Target/When table,
* System actor support,
* read-only Audit Detail,
* masked IP context,
* Before/After Diff,
* no edit/delete action,
* mobile Audit cards,
* Loading,
* Empty,
* Clear Filters,
* Error,
* Retry,
* Security Dashboard,
* 24h/7d/30d ranges,
* real Failed Login count,
* real Rate-Limit count,
* real Suspicious IP count,
* OTP Flood detection,
* real temporary Auto Block,
* Credential Stuffing event,
* New Admin Device event,
* privacy-safe security data,
* Reports/Fraud Queue,
* real Report priorities,
* user and System reporters,
* Report Detail,
* private Evidence,
* secure screenshots,
* Listing Preview,
* Related History,
* user Report history,
* mandatory Reason for all actions,
* Warn User,
* Suspend User,
* Remove Listing,
* Dismiss Report,
* Duplicate Lead Review,
* older richer canonical record,
* newer merge-in record,
* Timeline merge,
* Notes merge,
* Site Visit preservation,
* canonical pointer,
* irreversible merge warning,
* Not Duplicates,
* Contact Reveal Logs,
* Abuse Investigation permission,
* view-access auditing,
* real anomaly aggregation,
* Message Report Review,
* bounded Thread Context,
* Flagged Message,
* private access Audit,
* Sender history,
* Warn/Suspend/Dismiss,
* Site Visit Dispute Review,
* Owner outcome,
* Visitor outcome,
* side-by-side neutrality,
* Resolution Notes,
* Mark Completed,
* Mark Not Happened,
* Resolve confirmation,
* canonical Visit outcome,
* Business Metrics,
* real database-native Listing counts,
* real Active User metric with defined source,
* real Lead counts,
* real City-wise aggregation,
* Behavioral Analytics Setup Required when unavailable,
* no simulated Funnels,
* Export Management,
* Listings Export,
* Leads Export,
* Users Export,
* Payments Export,
* Audit Logs Export,
* Date Range,
* CSV,
* XLSX,
* JSON,
* async Export Jobs,
* Processing state,
* Ready state,
* expiring private Download,
* Failed state,
* Retry,
* range limits,
* download Audit,
* Bulk Action Preview,
* exact affected count,
* real affected-record list,
* stale-state revalidation,
* Notifications,
* idempotent execution,
* Maker-Checker Queue,
* Four-Eyes rule,
* maker identity,
* high-risk action context,
* reason,
* waiting time,
* Approve,
* Reject,
* self-actions disabled,
* server-enforced checker ≠ maker,
* stale target revalidation,
* Approved vs Executed separation,
* execution recovery,
* complete permissions,
* complete auditability,
* no fake data,
* no sensitive-data leaks,
* no dead controls,
* complete desktop verification,
* complete tablet verification,
* complete mobile Admin verification,
* complete multi-role governance regression.

Required implementation sequence:

**Screen 1 Audit → verify → Screen 2 Security → verify → Screens 3–4 Reports/Fraud → verify → Screen 5 Duplicate Leads → verify → Screen 6 Reveal Logs → verify → Screen 7 Message Reports → verify → Screen 8 Visit Disputes → verify → Screen 9 Business Reports → verify → Screen 10 Exports → verify → Screen 11 Bulk Preview → verify → Screen 12 Maker-Checker → verify → complete connected governance regression test.**

No Batch 15 screen passes merely because it renders.

**Exact Design + Audit Immutability + Security Data Honesty + Investigation Privacy + Report Decision Integrity + Merge Integrity + Dispute Integrity + Real Business Metrics + Export Security + Bulk Preview Safety + Four-Eyes Governance + Permission Enforcement + Auditability + Responsive Behavior + Live Multi-Role Verification must all pass.**
