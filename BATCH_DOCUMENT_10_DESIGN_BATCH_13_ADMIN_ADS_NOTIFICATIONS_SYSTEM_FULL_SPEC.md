# BATCH_DOCUMENT_10_DESIGN_BATCH_13_ADMIN_ADS_NOTIFICATIONS_SYSTEM_FULL_SPEC.md

# My Gujarat Property

## Batch Document 10

## Design Batch 13 — Complete Admin Ads, Notifications, Provider Management, Feature Flags, Maintenance Mode and System Health

---

# 1. DOCUMENT PURPOSE

This document is the complete design, implementation, backend, database, moderation, fraud-review, notification-delivery, provider-management, secret-safety, feature-flag, maintenance-mode, background-job, system-health, audit, permission, responsive behavior and live-verification specification for:

**My Gujarat Property · Design Batch 13 — Admin: Ads / Notifications / System**

Batch 13 defines the internal administration system for:

* Ad Campaign moderation,
* Active Ad management,
* Ad fraud/click review,
* Notification Templates,
* multilingual Notification content,
* Delivery Logs,
* default Notification preferences,
* external Provider status,
* Provider detail and connection tests,
* Feature Flags,
* Maintenance Mode,
* scheduled Maintenance,
* public Maintenance page,
* System Health,
* Background Job queue monitoring,
* Dead-Letter Queue management.

Batch 13 contains exactly these 16 screen groups:

1. Ads Approval Queue
2. Ad Campaign Review Detail
3. Active / Expired / Rejected Ads
4. Ad Fraud / Click Pattern Review
5. Notification Templates List
6. Notification Template Editor
7. Notification Delivery Logs
8. Notification Default Preferences Matrix
9. Provider Status Dashboard
10. Provider Detail / Test Connection
11. Feature Flags List
12. Feature Flag Toggle Confirmation + Audit
13. Maintenance Mode Control
14. Public Maintenance Page
15. System Health Dashboard
16. Dead-Letter Queue

Every screen and every required state must be implemented.

Nothing may be skipped.

No Batch 13 module may remain:

* Coming Soon,
* placeholder-only,
* fake-data-only,
* UI-only,
* unconnected to real backend state,
* represented by generic Settings cards,
* represented by raw environment-variable presence alone.

The actual Batch 13 design source must be read directly from:

`/newdesign/`

Use the real:

`Batch 13 - Admin Ads Notifications System (Standalone).html`

Do not implement from:

* current placeholder Settings screen,
* generic provider dashboards,
* generic notification template systems,
* old Ad Admin UI,
* memory,
* assumptions.

---

# 2. ABSOLUTE CURRENT UI REPLACEMENT RULE

Where current Admin Ads, Provider or Settings screens conflict with Batch 13, remove and replace the conflicting presentation architecture.

The current system must not remain:

### Providers

A simple list saying:

* ENV exists,
* Configured Untested,
* Setup Required.

### Settings

A placeholder saying:

* Feature Flags Coming Soon,
* System Health Coming Soon.

### Ads

Missing or incomplete moderation pages.

### Notifications

Missing Admin Template/Delivery/Default management.

Batch 13 requires the full 16-screen operating system.

---

# 3. NO FAKE STATUS RULE

Batch 13 repeatedly establishes one critical product principle:

**Never fake a status.**

This applies to:

* Ad performance,
* Notification delivery,
* Provider status,
* Analytics,
* System Health,
* Background Jobs,
* Backups,
* Maintenance scheduling.

Examples:

If Analytics tracking is not configured:

show:

`Setup Required`

not:

fake views, impressions or clicks.

If WhatsApp provider is missing:

show:

`Skipped — provider not set up`

not:

Sent.

If Provider credentials exist but have not been tested:

show:

Configured / Untested

not:

Active.

If a real Provider test fails:

show:

Error

not:

Configured.

---

# 4. BATCH 13 SCREEN GROUPING

The exact source groups Batch 13 as:

## Screens 1–4

Ads Admin.

## Screens 5–8

Notifications Admin.

## Screens 9–10

Provider Status and Provider Detail.

## Screens 11–12

Feature Flags.

## Screens 13–14

Maintenance Mode.

## Screens 15–16

System Health and Dead-Letter Queue.

All groups are mandatory.

---

# 5. REQUIRED IMPLEMENTATION ORDER

Implement Batch 13 in this order:

1. Admin permissions and navigation reconciliation
2. Screen 1 Ads Queue
3. Screen 2 Ad Review Detail
4. Screen 3 Active / Expired Ads
5. Screen 4 Ad Fraud Review
6. Screen 5 Notification Templates
7. Screen 6 Template Editor
8. Screen 7 Delivery Logs
9. Screen 8 Default Matrix
10. Screen 9 Provider Status
11. Screen 10 Provider Detail / Test
12. Screen 11 Feature Flags
13. Screen 12 Flag Toggle Confirmation
14. Screen 13 Maintenance Control
15. Screen 14 Public Maintenance Page
16. Screen 15 System Health
17. Screen 16 Dead-Letter Queue
18. Full cross-module regression verification.

Do not implement everything in one uncontrolled change.

---

# 6. ADMIN SHELL

Batch 13 uses the approved Batch 1 Admin shell.

Required:

* graphite Admin sidebar,
* Admin contextual topbar,
* permission-aware navigation,
* desktop-first management screens,
* mobile Admin drawer,
* no public-role mobile bottom navigation.

Do not add:

Home · Search · Post · Leads · Profile

inside Admin.

---

# 7. BATCH 13 PERMISSION GROUPS

At minimum distinguish permissions for:

* Ads View,
* Ads Review,
* Ads Pause/Resume,
* Ad Fraud Review,
* Notification Templates View,
* Notification Templates Edit,
* Notification Templates Publish,
* Notification Logs View,
* Notification Defaults Edit,
* Provider View,
* Provider Manage,
* Provider Test,
* Secret Rotation,
* Feature Flags View,
* Feature Flags Manage,
* Maintenance Manage,
* System Health View,
* Dead-Letter Retry,
* Dead-Letter Dismiss.

Do not use one blanket:

`Admin = everything`

for ordinary Staff.

Super Admin retains full access.

---

# 8. HIGH-RISK SYSTEM ACTION RULE

These actions require explicit permission and audit:

* Approve Ad,
* Reject Ad,
* Pause Ad,
* Mark Clicks as Fraud,
* Dismiss Fraud Alert,
* Publish Notification Template,
* Change Notification Defaults,
* Replace Provider Credentials,
* Test Provider Connection,
* Toggle Feature Flag,
* Enable Maintenance Mode,
* Schedule Maintenance,
* Cancel Maintenance,
* Retry Dead-Letter Job,
* Dismiss Dead-Letter Job.

For high-impact actions:

reason/audit note is required where the Batch source explicitly requires it.

---

# 9. AUDIT REQUIREMENT

Every critical Batch 13 action must create an immutable Audit event.

At minimum:

* actor Staff,
* Staff role,
* action,
* target type,
* target ID/key,
* safe before state,
* safe after state,
* reason/audit note,
* timestamp.

Never put:

* API keys,
* tokens,
* raw IP addresses,
* raw device fingerprints,
* raw stack traces

inside general UI audit metadata.

---

# 10. SCREENS 1–4 — ADS ADMIN

The Ads Admin group includes:

1. Pending Campaign Queue
2. Campaign Review Detail
3. Active/Expired/Rejected Ads
4. Fraud/Click Review

These screens connect directly to the Builder Campaign system from Batch 8.

Do not create a second unrelated Ad Campaign model.

---

# 11. SCREEN 1 — ADS APPROVAL QUEUE

Reference heading:

`Pending ad campaigns`

Count:

`3 waiting`

Search:

`Search builder or project…`

Desktop columns:

* CREATIVE
* CAMPAIGN
* BUILDER
* PROJECT
* SUBMITTED

Action:

`Review`

---

# 12. ADS QUEUE REFERENCE ROW 1

Campaign:

`Monsoon Offer — Grand Vista`

Builder:

`Sankalp Developers`

Project:

`Sankalp Grand Vista`

Submitted:

`Today, 10:12 AM`

Action:

`Review`

---

# 13. ADS QUEUE REFERENCE ROW 2

Campaign:

`Launch — Avadh Greens Phase 2`

Builder:

`Avadh Buildcon`

Project:

`Avadh Greens`

Submitted:

`Yesterday, 6:40 PM`

Action:

`Review`

---

# 14. ADS QUEUE REFERENCE ROW 3

Campaign:

`Festive Booking — Skyline`

Builder:

`Shivalik Group`

Project:

`Shivalik Skyline`

Submitted:

`30 Jun, 3:05 PM`

Action:

`Review`

---

# 15. ADS QUEUE DATA AUTHORITY

Queue rows must come from actual Campaign records with moderation state:

* Pending Review,
* Under Review where product state supports it.

Do not include:

* Draft,
* Active,
* Expired,
* Rejected

in Pending Queue.

---

# 16. ADS QUEUE SEARCH

Search supports:

* Builder company name,
* Project name,
* Campaign name where final server search supports it.

Use server-side paginated search.

Do not search only loaded first page.

---

# 17. ADS QUEUE COUNT

`3 waiting`

must be an exact database count.

Do not derive only from currently loaded page rows.

---

# 18. ADS QUEUE SORT ORDER

Operational review queue should prioritise oldest submissions unless the exact source interaction specifies a different sort.

Display submitted age/date honestly.

---

# 19. CREATIVE COLUMN

Creative thumbnail must come from actual Campaign creative media.

Do not use generic coloured placeholders if actual creative exists.

If creative is missing/corrupt:

show safe broken-media state.

Do not fabricate image.

---

# 20. MOBILE ADS QUEUE

The source explicitly defines a card transformation.

Reference card:

`Monsoon Offer — Grand Vista`

`Sankalp Developers · today 10:12 AM`

Action:

`Review`

Use the same Campaign record as desktop.

---

# 21. ADS QUEUE EMPTY STATE

Exact:

`Queue is clear`

Supporting copy:

`No campaigns waiting for review. New submissions appear here instantly.`

Action:

`View active ads`

---

# 22. VIEW ACTIVE ADS

Must open Screen 3 Active Ads.

No dead action.

---

# 23. ADS QUEUE ERROR STATE

Exact:

`Couldn't load the ads queue.`

Action:

`Retry`

Retry the actual server query.

---

# 24. ADS QUEUE LOADING

Use:

* table shimmer desktop,
* card skeleton mobile.

Do not flash sample Campaigns.

---

# 25. ADS QUEUE PAGINATION

Use scalable pagination/cursor.

---

# 26. CAMPAIGN REVIEW LOCKING

Two reviewers must not make conflicting Campaign decisions from stale screens.

Before final decision:

verify:

* Campaign is still pending,
* current revision matches reviewed revision.

Use status/version checks.

---

# 27. SCREEN 2 — AD CAMPAIGN REVIEW DETAIL

Reference Campaign:

`Monsoon Offer — Grand Vista`

Metadata:

`Campaign #AD-0038 · Sankalp Developers · submitted today 10:12 AM`

Actions:

* Reject…
* Approve

---

# 28. CAMPAIGN DISPLAY ID

Use a real safe Campaign reference.

Reference format:

`AD-0038`

Do not expose raw UUID as primary UI.

---

# 29. REVIEW HEADER DATA

Use actual:

* Campaign name,
* Campaign reference,
* Builder,
* submission time,
* moderation status.

---

# 30. CREATIVES — ALL REQUIRED SIZES

Exact section:

`CREATIVES — ALL SIZES`

Required creative slots:

### Desktop

`1440×250`

### Tablet

`768×240`

### Mobile

`390×312`

All three must be displayed.

---

# 31. CREATIVE DIMENSION VALIDATION

On Campaign upload/submission:

validate exact required dimensions or approved aspect/processing behavior.

The Admin Review must not discover that a Campaign has one Desktop image stretched across all devices.

---

# 32. NO CLIENT STRETCHING

Do not render:

1440×250

inside Mobile placement by CSS distortion.

The Campaign system requires device-specific creative assets.

---

# 33. CREATIVE STORAGE RELATIONSHIP

Each Campaign creative must preserve:

* Campaign ID,
* placement/device class,
* media reference,
* actual width,
* actual height,
* MIME type,
* file size,
* upload status.

---

# 34. CREATIVE REVIEW

Reviewer must be able to inspect each image clearly.

Support full-size preview where the design/workflow requires it.

Do not make tiny thumbnails the only review method.

---

# 35. TARGETING SUMMARY

Exact section:

`TARGETING SUMMARY`

Fields:

### Cities

`Surat, Ahmedabad`

### Localities

`Vesu, Pal, Shela`

### Audience

`Buyers · ₹50L+ budget`

### Schedule

`5 Jul – 4 Aug 2026`

Use actual Campaign targeting data.

---

# 36. TARGETING CITY DATA

Use canonical Location IDs.

Do not store only comma-separated display text as authority.

---

# 37. LOCALITY DATA

Preserve actual locality targeting relations.

---

# 38. AUDIENCE SUMMARY

The Admin screen displays a safe human-readable summary of actual targeting rules.

Do not invent a summary disconnected from stored targeting configuration.

---

# 39. CAMPAIGN SCHEDULE

Display actual:

* start,
* end,
* timezone.

Validate Campaign period before approval.

Expired-before-approval Campaign should not become Active silently.

---

# 40. RERA LINKAGE CHECK

Exact section:

`RERA LINKAGE CHECK`

Reference:

`Sankalp Grand Vista — RERA verified`

Registration:

`PR/GJ/SURAT/2024/1182 · verified 12 Mar 2026`

Action:

`View project record`

---

# 41. RERA LINKAGE SOURCE

Campaign must be linked to the actual Project record.

Admin Review must load:

* Project,
* RERA number,
* RERA verification state,
* verification date.

Do not let Campaign submitter type free-text RERA confirmation.

---

# 42. AD APPROVAL RERA GATE

If final Advertising policy requires verified RERA for Project ads:

enforce server-side.

A disabled UI button alone is not sufficient.

---

# 43. VIEW PROJECT RECORD

Must open the exact Admin Project record/moderation context.

Do not open a generic search page.

---

# 44. APPROVE CAMPAIGN

Required flow:

1. Staff permission.
2. Campaign still Pending.
3. Creative validation passes.
4. Targeting valid.
5. Schedule valid.
6. linked Project ownership valid.
7. RERA policy passes.
8. Campaign becomes Approved or Active depending schedule/payment rules.
9. Builder Notification.
10. Audit.

---

# 45. APPROVED VS ACTIVE

Approval does not necessarily mean immediate Active.

If Campaign start date is in future:

status may be:

Approved / Scheduled.

At Campaign start:

scheduler activates.

Do not activate future Campaign immediately.

---

# 46. REJECT CAMPAIGN

Action:

`Reject…`

opens confirmation/reason flow.

Reference:

`Reject this campaign?`

Copy:

`Sankalp Developers will see your reason and can resubmit.`

---

# 47. REJECTION REASONS

Exact source options:

* Misleading pricing claim in creative
* Creative quality below guidelines
* Targeting violates policy
* Other (explain below)

Use structured reason codes.

---

# 48. OTHER REJECTION REASON

When:

`Other`

is selected:

require explanation.

---

# 49. REJECTION USER VISIBILITY

Reason is shown to Builder.

Do not put private fraud/security investigation notes into the public rejection reason.

Use a separate internal Note if needed.

---

# 50. CAMPAIGN RESUBMISSION

Rejected Campaign may be corrected and resubmitted according to product workflow.

Preserve:

* previous review,
* reason,
* revision number,
* current revision.

---

# 51. AD REVIEW AUDIT

Record:

* reviewer,
* Campaign,
* revision,
* decision,
* reason,
* timestamp.

---

# 52. SCREEN 3 — ACTIVE / EXPIRED / REJECTED ADS

Tabs:

* Active (2)
* Expired
* Rejected

Columns:

* CAMPAIGN
* SCHEDULE
* STATUS
* PERFORMANCE

---

# 53. ACTIVE AD ROW 1

Campaign:

`City Pride Towers — Launch`

Schedule:

`15 Jun – 15 Jul`

Status:

`Active`

Performance:

`12,480 impr · 214 clicks`

Action:

`Pause`

---

# 54. ACTIVE AD ROW 2

Campaign:

`Avadh Greens — Festive`

Schedule:

`1 Jul – 31 Jul`

Status:

`Active`

Performance:

`—`

Supporting state:

`Analytics not tracked`

Action:

`Pause`

---

# 55. PERFORMANCE HONESTY RULE

The source explicitly states:

Performance columns show:

`—`

when tracking is not wired.

Never fabricate numbers.

---

# 56. PERFORMANCE DATA

Where tracking exists:

performance must come from real events or analytics provider.

Examples:

* Impressions,
* Clicks.

Do not derive arbitrary values from page views without defined attribution.

---

# 57. PERFORMANCE ATTRIBUTION

Ad Campaign metrics must belong to the selected Campaign.

Do not count all Project traffic as Campaign performance.

---

# 58. ANALYTICS NOT TRACKED STATE

Exact concept:

`—`

`Analytics not tracked`

Use when Campaign tracking data is unavailable.

Do not display zero unless tracking is configured and actual result is zero.

---

# 59. ACTIVE TAB COUNT

`Active (2)`

must be exact database count.

---

# 60. EXPIRED TAB

Campaign moves to Expired automatically after end date according to scheduled lifecycle.

Do not depend on Builder manually expiring it.

---

# 61. REJECTED TAB

Shows rejected Campaigns with actual rejection status/history.

---

# 62. PAUSE CAMPAIGN

Pause must:

* verify Staff permission,
* persist status,
* prevent serving,
* preserve metrics,
* notify Builder if policy requires,
* audit.

---

# 63. PAUSE REASON

For Admin-initiated pause:

capture reason where operational policy requires.

Do not silently pause paid Builder Campaign without traceability.

---

# 64. RESUME CAMPAIGN

Where allowed:

resume only if:

* schedule still valid,
* Campaign remains eligible,
* moderation approval remains valid.

Do not resume expired Campaign.

---

# 65. SCREEN 4 — AD FRAUD / CLICK REVIEW

Heading:

`Flagged click patterns`

Count:

`2 to review`

Columns:

* CAMPAIGN
* PATTERN SUMMARY
* CLICKS FLAGGED

Actions:

* Mark as fraud
* Dismiss

---

# 66. FRAUD REFERENCE ROW 1

Campaign:

`City Pride Towers — Launch`

Pattern:

`86 clicks in 4 min from one IP range (49.36.xx.xx), same device fingerprint`

Flagged:

`86`

---

# 67. FRAUD REFERENCE ROW 2

Campaign:

`Avadh Greens — Festive`

Pattern:

`Repeated clicks with no dwell time from 3 devices, overnight window`

Flagged:

`31`

---

# 68. PII-SAFE FRAUD DISPLAY

The source explicitly states:

IPs and device data are shown as:

**truncated patterns only.**

Do not render raw:

* full IP,
* full device fingerprint,
* advertising identifiers

in normal Fraud Review UI.

---

# 69. RESTRICTED RAW DATA

If raw identifiers are retained for legitimate fraud investigation:

they remain in:

restricted access logs/audit/security system.

Not the normal Batch 13 Fraud Review screen.

---

# 70. FRAUD DETECTION DATA

Pattern Summary must be derived from real fraud detection data.

Do not hard-code fraud language.

---

# 71. MARK AS FRAUD

The source states:

`Mark as fraud` opens a confirmation.

Required confirmation must explain:

* Campaign,
* flagged click count,
* billing impact,
* action effect.

---

# 72. FRAUD BILLING EFFECT

Source rule:

fraudulent clicks are excluded from Builder billing.

This requires actual billing/accounting adjustment logic.

Do not only change UI status.

---

# 73. FRAUD EXCLUSION IDEMPOTENCY

Flagged click IDs/events must not be excluded twice.

Use event-level state or atomic Campaign fraud adjustment.

---

# 74. FRAUD METRICS EFFECT

After fraud confirmation:

* billable click count adjusts,
* Campaign performance may retain gross vs valid distinction where appropriate,
* Builder Billing uses valid billable metrics.

Do not erase all click history.

---

# 75. FRAUD DISMISS

Dismiss marks alert reviewed/non-fraud.

It must not delete raw historical detection event.

---

# 76. FRAUD REVIEW AUDIT

Record:

* reviewer,
* Campaign,
* alert,
* decision,
* safe reason/note,
* timestamp.

---

# 77. ADS ADMIN CURRENT REPOSITORY RECONCILIATION

The current inspected repository does not expose a substantive complete Batch 13 Ads Admin system.

Batch 8 Builder Campaign system and Batch 13 Admin Campaign system must use the same Campaign records.

Required:

* moderation queue,
* creative review,
* targeting summary,
* RERA linkage,
* approve/reject,
* active list,
* performance honesty,
* fraud review,
* pause behavior.

---

# 78. SCREENS 5–8 — NOTIFICATIONS ADMIN

The Notification Admin system includes:

5. Templates List
6. Template Editor
7. Delivery Logs
8. Default Preferences Matrix

These must connect to actual Notification event dispatch.

Do not create a CMS-only template editor disconnected from delivery.

---

# 79. SCREEN 5 — NOTIFICATION TEMPLATES LIST

Columns:

* EVENT
* CHANNELS
* STATUS

Action:

`Edit`

---

# 80. TEMPLATE ROW 1

Display Name:

`New lead received`

Event Key:

`lead.created`

Channels:

* In-app
* Email
* WhatsApp

Status:

`Live`

Action:

`Edit`

---

# 81. TEMPLATE ROW 2

Display Name:

`Site visit reminder`

Event Key:

`visit.reminder_24h`

Channels:

* In-app
* SMS

Status:

`Draft`

Action:

`Edit`

---

# 82. TEMPLATE ROW 3

Display Name:

`Listing approved`

Event Key:

`listing.approved`

Channels:

* In-app
* Email

Status:

`Live`

Action:

`Edit`

---

# 83. NOTIFICATION EVENT REGISTRY

Use a canonical Event Registry.

Do not use arbitrary free-text event keys.

Examples:

* `lead.created`
* `visit.reminder_24h`
* `listing.approved`
* `proposal.viewed`
* `saved_search.match`

according to final feature set.

---

# 84. EVENT DISPLAY NAME VS EVENT KEY

Store separately:

### Display Name

`New lead received`

### Stable Event Key

`lead.created`

Do not derive stable key every time from editable display name.

---

# 85. TEMPLATE CHANNEL RELATIONSHIP

Each Event may have channel-specific Templates.

Examples:

lead.created:

* In-app,
* Email,
* WhatsApp.

A channel Badge in list should reflect actual configured channel Templates.

---

# 86. TEMPLATE STATUS

Support:

* Draft
* Live

according to source.

Publishing is explicit.

Do not make saved draft immediately live.

---

# 87. TEMPLATE LIST PAGINATION

Use pagination/search if Event catalog grows.

---

# 88. TEMPLATE LIST MOBILE

Transform rows into cards if needed.

Preserve:

* Display Name,
* Event Key,
* Channels,
* Status,
* Edit.

---

# 89. SCREEN 6 — NOTIFICATION TEMPLATE EDITOR

Reference heading:

`New lead received — Email`

Language tabs:

* English
* ગુજરાતી
* हिन्दी

---

# 90. TEMPLATE LANGUAGE MODEL

A channel Template may contain multiple translations.

At minimum:

* English,
* Gujarati,
* Hindi state.

The source reference shows Hindi tab and Gujarati missing translation state.

Implement exact language availability according to current localization roadmap.

---

# 91. MISSING TRANSLATION FALLBACK

Exact source:

`Gujarati translation missing — English is sent as fallback.`

This fallback must be real.

If Gujarati Template is missing:

send English.

Do not:

* send blank content,
* fail the Notification,
* fake Gujarati translation.

---

# 92. LANGUAGE FALLBACK LOGGING

Delivery can record:

* requested locale,
* fallback locale used

where useful for localization tracking.

Do not mark fallback as delivery failure.

---

# 93. TEMPLATE SUBJECT

Field:

`Subject`

Required for channels that use subjects, such as Email.

Do not force Subject for SMS/In-app if not required.

---

# 94. TEMPLATE BODY

Field:

`Body`

Persist safely.

---

# 95. TOKEN INSERTION

Exact token chips:

* `{{ tokUserName }}`
* `{{ tokLeadName }}`
* `{{ tokPropertyTitle }}`
* `{{ tokCity }}`

Implement controlled tokens.

---

# 96. TOKEN REGISTRY

Tokens must come from an allow-listed registry.

Do not evaluate arbitrary code expressions inside Template.

---

# 97. EVENT-SPECIFIC TOKENS

Only tokens valid for the selected Event should be available.

Example:

`lead.created`

may expose:

* User Name,
* Lead Name,
* Property Title,
* City.

Do not expose sensitive tokens unnecessarily.

---

# 98. MISSING TOKEN DATA

If required runtime token data is missing:

use safe fallback/error handling.

Do not send:

`Hello {{ tokUserName }}`

to user.

---

# 99. TEMPLATE INJECTION SAFETY

Escape user data according to channel.

For Email HTML:

sanitise output.

For SMS/WhatsApp:

plain text rules.

Do not allow stored Template to inject unsafe scripts.

---

# 100. SAVE DRAFT

Action:

`Save draft`

must:

* validate,
* persist draft,
* not affect current Live Template.

---

# 101. PUBLISH

Action:

`Publish`

must:

* validate Template,
* validate required fields,
* validate tokens,
* create new Live version,
* preserve previous Template version/history,
* Audit.

---

# 102. TEMPLATE VERSIONING

Do not overwrite Live Template in place before Publish.

Recommended:

* Draft version,
* Live version,
* Published timestamp,
* Publisher.

---

# 103. LIVE PREVIEW

Exact section:

`LIVE PREVIEW — SAMPLE DATA`

Reference Subject:

`New lead for 3 BHK, Silver Heights`

Body:

`Hi Rameshbhai,`

`Meera Purohit just enquired about 3 BHK, Silver Heights. Open your dashboard to view the lead and respond quickly — leads answered within an hour convert best.`

CTA:

`View lead`

---

# 104. SAMPLE PREVIEW DATA

Preview uses safe sample values.

The source states:

`Preview substitutes real sample values — updates as you type.`

This means:

* typing updates Preview,
* token placeholders replaced with sample values,
* no real user's private data is required for preview.

---

# 105. PREVIEW CTA

CTA rendering must match the channel Template.

For Email:

Button Preview.

For SMS:

no fake HTML button.

---

# 106. TEMPLATE PUBLISH AUDIT

Record:

* Event,
* Channel,
* Locale,
* version,
* publisher,
* timestamp.

---

# 107. SCREEN 7 — DELIVERY LOGS

Controls:

* All channels
* Failed only
* Last 24 h

Columns:

* RECIPIENT
* EVENT
* CHANNEL
* STATUS
* TIME

---

# 108. DELIVERY LOG ROW 1

Recipient:

`Rameshbhai P.`

Event:

`lead.created`

Channel:

`Email`

Status:

`Sent`

Time:

`Today 9:42 AM`

---

# 109. DELIVERY LOG ROW 2

Recipient:

`Hetal J.`

Event:

`visit.reminder_24h`

Channel:

`SMS`

Status:

`Failed — carrier error`

Time:

`Today 8:00 AM`

---

# 110. DELIVERY LOG ROW 3

Recipient:

`Kartik T.`

Event:

`proposal.viewed`

Channel:

`WhatsApp`

Status:

`Skipped — provider not set up`

Time:

`Yesterday 6:15 PM`

---

# 111. DELIVERY STATUS MODEL

At minimum distinguish:

* Sent
* Failed
* Skipped

according to source.

Additional internal states may include:

* Queued,
* Processing,
* Delivered

where provider supports it.

Do not label:

Queued = Sent.

---

# 112. PROVIDER MISSING BEHAVIOR

When provider is missing:

record:

`Skipped — provider not set up`

This is a real Delivery Log event.

Do not silently drop the Notification.

---

# 113. DELIVERY FAILURE REASON

Display safe failure summary.

Examples:

`carrier error`

Do not expose:

* raw API response containing secrets,
* full provider debug payload.

---

# 114. DELIVERY RETRY

If the final design provides Retry elsewhere or through DLQ:

connect failures appropriately.

Do not add dead Retry buttons to Delivery Log if not shown in source.

---

# 115. DELIVERY FILTER — ALL CHANNELS

Filter actual channel.

---

# 116. FAILED ONLY

Shows:

* failed deliveries.

Do not include skipped provider-not-configured unless product filter intentionally includes them.

Define clearly.

---

# 117. LAST 24 HOURS

Use actual delivery attempt timestamp.

---

# 118. RECIPIENT PRIVACY

Display safe recipient name.

Do not show full phone/email unless Staff permission/design explicitly requires it.

---

# 119. DELIVERY LOG PAGINATION

Use pagination/cursor.

---

# 120. DELIVERY LOG PERFORMANCE

Do not query every Notification and then separately query:

* Profile,
* Template,
* Provider

one-by-one.

Avoid N+1.

---

# 121. SCREEN 8 — NOTIFICATION DEFAULTS MATRIX

Exact section:

`Notification defaults — event × channel matrix (applies to new users)`

Columns:

* EVENT
* IN-APP
* EMAIL
* SMS
* WHATSAPP

Rows:

* New lead
* Visit reminder
* Saved-search match

Action:

`Save defaults`

---

# 122. DEFAULT MATRIX PURPOSE

These Defaults apply only to newly registered users.

The source explicitly states:

`Changes apply to newly registered users only — existing users keep their own preferences.`

This is mandatory.

---

# 123. DO NOT OVERWRITE EXISTING PREFERENCES

Saving Defaults must not bulk-change existing users.

---

# 124. USER ONBOARDING PREFERENCE SEEDING

When a new user/profile preference record is created:

seed current Defaults.

After that:

user-owned preferences are independent.

---

# 125. EVENT × CHANNEL RELATIONSHIP

Each matrix cell maps to:

Event
× Channel
→ default enabled/disabled.

Use structured data.

Do not store one giant unvalidated JSON blob if granular management/audit is required.

---

# 126. DEFAULT SAVE AUDIT

Record:

* actor,
* changed cells,
* old/default values,
* new values,
* timestamp.

---

# 127. CHANNEL AVAILABILITY

A default may be enabled while provider is unavailable.

In that case:

delivery still logs:

Skipped — provider not set up.

Do not automatically rewrite user preference because provider is temporarily unavailable.

---

# 128. IN-APP CHANNEL

In-app should work independently of external Provider configuration where the internal Notification system is available.

---

# 129. WHATSAPP PROVIDER MODE

WhatsApp delivery must respect configured provider mode.

If not configured:

skip and log.

Do not pretend successful external delivery.

---

# 130. CURRENT NOTIFICATION ADMIN RECONCILIATION

The current inspected repository does not provide the full Batch 13 Notification Admin system.

Batch 13 requires:

* Template List,
* multilingual Template Editor,
* token registry,
* draft/live versioning,
* Live Preview,
* Delivery Logs,
* failed/skipped honesty,
* Event × Channel Defaults.

---

# 131. NOTIFICATION DATABASE REQUIREMENTS

At minimum support:

* Event Registry,
* channel Templates,
* Template versions,
* localized Template content,
* Delivery records,
* Delivery status,
* safe failure summary,
* locale/fallback metadata,
* default preference matrix.

---

# 132. NOTIFICATION DISPATCH PIPELINE

Required flow:

Event occurs
→ Notification dispatcher resolves recipient
→ user preference checked
→ default/user setting evaluated
→ Template selected
→ locale selected
→ fallback applied
→ Provider availability checked
→ Delivery queued/sent/skipped
→ Delivery Log persisted.

---

# 133. DUPLICATE NOTIFICATION PROTECTION

For lifecycle events:

prevent duplicate delivery for same:

* event identity,
* recipient,
* channel.

Use idempotency.

---

# 134. SCREENS 9–10 — PROVIDERS

The source calls Provider Status Dashboard:

**the clearest expression of “never fake a status.”**

Provider states must receive equal-quality UI:

* Active,
* Error,
* Setup Required.

Do not visually treat Setup Required as an afterthought.

---

# 135. SCREEN 9 — PROVIDER STATUS GRID

Required provider cards include:

1. OTP / SMS Auth
2. Payments
3. Email
4. WhatsApp
5. Maps
6. Media Storage / CDN
7. Analytics
8. Error Tracking

Use exact source card design.

---

# 136. OTP / SMS AUTH PROVIDER

Reference:

Provider:

`MSG91`

Status:

`Active`

Masked credential:

`auth_key: ••••••••••7c2e`

Test:

`Tested 2 hrs ago — OK`

Action:

`Manage`

---

# 137. PAYMENTS PROVIDER

Reference:

`Razorpay`

Status:

`Active`

Masked:

`key_id: rzp_live_••••••42af`

Test:

`Tested today 6:00 AM — OK`

Action:

`Manage`

---

# 138. EMAIL PROVIDER ERROR

Reference:

`Resend`

Status:

`Error`

Message:

`Last 14 sends failed — API key rejected (401). Sends are paused and queued.`

Supporting:

`Failing since 9:20 AM`

Action:

`Fix now`

---

# 139. EMAIL FAILURE PAUSE BEHAVIOR

The source indicates:

Sends are paused and queued.

This requires real behavior.

When Provider is known unhealthy:

* stop repeated immediate sends,
* queue pending deliveries,
* route failures/DLQ according to retry policy.

Do not continue hammering invalid credentials.

---

# 140. WHATSAPP SETUP REQUIRED

Reference:

Provider:

`Meta Cloud API`

Status:

`Setup Required`

Copy:

`Not configured. WhatsApp notifications are skipped (logged as such) until connected.`

Action:

`Set up WhatsApp →`

---

# 141. MAPS SETUP REQUIRED

Reference:

`Google Maps Platform`

Status:

`Setup Required`

Copy:

`Search map view falls back to list with a banner until an API key is added.`

Action:

`Add API key →`

---

# 142. MAP FALLBACK MUST BE REAL

If Maps provider unavailable:

public Search must actually:

* show list mode,
* show approved banner/helper,
* avoid broken Map frame.

Do not only display Provider card.

---

# 143. MEDIA STORAGE / CDN

Reference:

`Cloudflare R2`

Status:

`Active`

Safe metadata:

`bucket: mgp-media · token: ••••9f1b`

Test:

`Tested yesterday — OK`

Action:

`Manage`

---

# 144. ANALYTICS SETUP REQUIRED

Reference:

`PostHog`

Status:

`Setup Required`

Copy:

`All analytics surfaces show "Setup Required" — never simulated numbers.`

Action:

`Connect analytics →`

---

# 145. ANALYTICS HONESTY CROSS-MODULE RULE

This must be enforced across:

* Owner Analytics,
* Broker Analytics,
* Builder Project Analytics,
* Ad Analytics,
* Admin Business Metrics.

No provider:

no fake graphs.

---

# 146. ERROR TRACKING

Reference:

`Sentry`

Status:

`Active`

Masked DSN:

`https://••••@o4.ingest.sentry.io/…`

Test:

`Tested 3 days ago — OK`

Action:

`Manage`

---

# 147. PROVIDER STATUS MODEL

Do not derive status only from:

`Boolean(process.env.KEY)`.

Required distinction:

### Setup Required

required credential/config missing.

### Configured / Untested

credential present, no successful test yet.

### Active

recent real connection test passed.

### Error

real connection test or delivery health indicates failure.

---

# 148. CURRENT PROVIDER RECONCILIATION

The current inspected Provider screen checks only whether environment variables are present and displays:

`CONFIGURED (untested)`

or:

`SETUP_REQUIRED`.

This honest foundation is useful but incomplete.

Batch 13 requires:

* full Provider cards,
* masked credential metadata,
* real health-test history,
* Active state only after actual test,
* Error state,
* Setup Required state,
* Manage/Fix/Setup actions,
* Provider detail,
* secret rotation,
* Test Connection.

---

# 149. PROVIDER HEALTH RECORD

Persist:

* Provider key/type,
* configuration state,
* last test time,
* last successful test,
* last failure,
* safe failure code,
* current operational state.

Do not rely only on current server process memory.

---

# 150. SECRET STORAGE RULE

Secrets must never be stored in normal publicly readable database tables.

Use:

* environment secret management,
* approved encrypted secret store,
* provider secret vault architecture.

---

# 151. MASKED SECRET DISPLAY

Only safe masked representation is shown.

Never return full secret to Browser.

Server should return:

* credential exists,
* safe prefix where allowed,
* safe suffix,
* last rotated time.

---

# 152. SCREEN 10 — PROVIDER DETAIL / TEST

The source shows two provider-detail examples:

* Razorpay success,
* Resend error.

---

# 153. RAZORPAY DETAIL

Reference:

Heading:

`Razorpay`

Type:

`Payments provider`

Fields:

### Key ID

`rzp_live_••••••42af`

### Key Secret

`••••••••••••••••`

Copy:

`Secrets are write-only — replace to rotate; values are never displayed.`

Actions:

* Replace keys
* Test Connection

---

# 154. WRITE-ONLY SECRET RULE

A saved Provider Secret is never displayed again.

Even Super Admin should not receive the original Secret through UI.

Rotation flow:

replace with a new Secret.

---

# 155. REPLACE KEYS FLOW

Required:

1. permission check,
2. current Provider identified,
3. new credentials accepted securely,
4. validation,
5. encrypted/secret storage update,
6. test or pending-test state,
7. Audit without Secret,
8. old Secret invalidation strategy according to Provider.

---

# 156. SECRET INPUT AUTOFILL SAFETY

Do not populate a Secret input with stored Secret.

Use empty replacement field.

---

# 157. TEST CONNECTION

A Provider test must perform a safe, non-destructive operation.

Do not test by creating a real charge or sending a real production user message without explicit safe test target.

---

# 158. RAZORPAY TEST REFERENCE

Reference result:

`Connection OK — test order created & voided. Today 6:00 AM.`

Implement a safe provider-specific test appropriate to actual Provider API and environment.

In Production:

avoid real unwanted charge.

---

# 159. RESEND DETAIL

Reference:

Provider:

`Resend`

Type:

`Email provider`

Masked Key:

`re_••••••••••31dd`

Actions:

* Replace key
* Test Connection

Result:

`Test failed — 401 Unauthorized. Key may be revoked. Last successful test: 28 Jun, 11:14 PM.`

---

# 160. TEST FAILURE STATE

Persist:

* test result,
* safe error classification,
* tested at,
* last successful test.

Do not expose complete provider response.

---

# 161. PROVIDER TEST RATE LIMIT

Prevent Staff from triggering unlimited test calls.

Use:

* debounce/UI disable,
* server rate limit,
* audit.

---

# 162. PROVIDER TEST AUDIT

Record:

* Provider,
* actor,
* result,
* safe error code,
* timestamp.

No Secret.

---

# 163. PROVIDER CROSS-SYSTEM CONSEQUENCES

Provider status must drive actual application behavior.

Examples:

### Email Error

Delivery queue paused/retried.

### WhatsApp Missing

Delivery skipped + logged.

### Maps Missing

List fallback.

### Analytics Missing

Setup Required analytics surfaces.

Do not let Provider Dashboard become decorative.

---

# 164. SCREENS 11–12 — FEATURE FLAGS

Feature Flags control rollout safely.

They must not remain Coming Soon.

---

# 165. SCREEN 11 — FEATURE FLAGS LIST

Columns:

* FLAG
* ROLLOUT
* ENABLED

---

# 166. FLAG 1

Key:

`map_search_view`

Description:

`Map toggle on search results`

Rollout:

`All users`

---

# 167. FLAG 2

Key:

`broker_kanban_crm`

Description:

`Kanban board in Broker CRM`

Rollout:

`Brokers · 25% rollout`

---

# 168. FLAG 3

Key:

`gujarati_ui`

Description:

`Gujarati language interface`

Rollout:

`Internal only`

---

# 169. FEATURE FLAG DATA MODEL

Each Flag needs:

* stable key,
* description,
* enabled state,
* rollout strategy,
* role scope where applicable,
* percentage where applicable,
* internal-only state,
* updated by,
* updated at.

---

# 170. FLAG KEY IMMUTABILITY

Do not casually rename stable Flag key after it is used in code.

Display description may change.

---

# 171. ROLLOUT STRATEGIES

Support source-defined rollout types:

### All Users

100%.

### Role + Percentage

Example:

Brokers · 25%.

### Internal Only

Staff/internal test identities.

---

# 172. PERCENTAGE ROLLOUT STABILITY

A 25% rollout must be stable per user.

Do not use:

`Math.random()`

on every page load.

Use deterministic assignment/hash/bucket.

---

# 173. ROLLOUT ROLE SCOPE

`broker_kanban_crm`

must affect Broker users only.

Do not include Owner/Builder in the 25% denominator.

---

# 174. INTERNAL-ONLY ROLLOUT

`gujarati_ui`

Internal Only means only approved internal test identities.

Do not expose to all users because Flag is technically enabled.

---

# 175. FEATURE FLAG CLIENT TRUST

Frontend may read evaluated Flag result.

Do not expose privileged Flag-management mutation to Client.

---

# 176. FLAG EVALUATION SOURCE

Use a centralized evaluation function.

Do not scatter:

`if (process.env.X)`

through components for managed Flags.

---

# 177. SCREEN 12 — FLAG TOGGLE CONFIRMATION

Reference:

`Disable map_search_view?`

Copy:

`This will affect all users immediately. The search map toggle disappears and open map views fall back to list.`

Field:

`Audit note *`

Actions:

* Cancel
* Disable flag

---

# 178. FLAG IMPACT COPY

Confirmation should be specific to Flag impact.

Do not use generic:

`Are you sure?`

for every Flag.

---

# 179. AUDIT NOTE REQUIRED

The source explicitly requires:

`Audit note *`

Server-side mandatory.

---

# 180. FLAG TOGGLE EXAMPLE AUDIT

Reference:

`admin@mgp.in disabled map_search_view`

Note:

`Maps quota exceeded, disabling until billing sorted`

Timestamp:

`3 Jul, 11:02 AM`

This must come from real Audit record.

---

# 181. FLAG TOGGLE TRANSACTION

Required:

* permission,
* current Flag state check,
* change state,
* audit note,
* Audit record,
* cache/config invalidation.

---

# 182. FLAG DISABLE APPLICATION EFFECT

Example:

`map_search_view` disabled:

* Search Map toggle disappears,
* already-open Map views fall back to List.

This must be real.

---

# 183. FEATURE FLAG STALE CACHE

Flag changes requiring immediate effect must invalidate relevant cache or use appropriate dynamic evaluation.

Do not show Admin:

Disabled

while users continue receiving stale enabled UI indefinitely.

---

# 184. FEATURE FLAG AUDIT HISTORY

Preserve:

* old state,
* new state,
* rollout config,
* actor,
* note,
* timestamp.

---

# 185. CURRENT FEATURE FLAG RECONCILIATION

The current inspected Admin Settings screen explicitly says:

`Feature Flags — Coming Soon`.

Batch 13 requires full Screens 11–12.

Remove the placeholder after implementation.

---

# 186. SCREENS 13–14 — MAINTENANCE MODE

Maintenance Mode affects:

* public site,
* dashboards,
* all non-Admin users.

Admins remain able to access Admin tools.

---

# 187. SCREEN 13 — MAINTENANCE CONTROL

Reference state:

`Maintenance mode is OFF`

Copy:

`Turning it on takes the public site and all dashboards offline for everyone except admins. Requires confirmation + audit note.`

---

# 188. MAINTENANCE MODE SCOPE

When Active:

block:

* public pages,
* authenticated public-role dashboards,
* normal API actions that should not operate during Maintenance.

Allow:

* authorised Admin access,
* health-check endpoints as required,
* provider Webhooks where blocking them would cause financial/data loss,
* essential internal background processing according to policy.

Do not blindly return Maintenance page for payment Webhooks.

---

# 189. MAINTENANCE MIDDLEWARE

Implement centrally.

Do not add page-by-page:

`if maintenance`

checks only.

Use:

* middleware,
* central request gate,
* server action gates

according to architecture.

---

# 190. FINANCIAL WEBHOOK EXCEPTION

Payment and Provider Webhooks must continue processing unless the architecture has an explicit safe buffering mechanism.

Do not cause Payment loss because public Maintenance is active.

---

# 191. PUBLIC MESSAGE

Reference:

`We're upgrading My Gujarat Property. Back within the hour — your listings and leads are safe.`

This message is editable in Maintenance Control.

---

# 192. MAINTENANCE MESSAGE SAFETY

Sanitize.

Do not allow arbitrary unsafe HTML.

---

# 193. START MAINTENANCE NOW

Turning Maintenance ON must:

1. require System permission,
2. show confirmation,
3. require Audit Note,
4. persist Maintenance state,
5. persist Public Message,
6. record expected end if supplied,
7. audit,
8. invalidate relevant caches.

---

# 194. START CONFIRMATION

Confirmation must clearly state impact.

Do not enable site-wide Maintenance with one accidental toggle.

---

# 195. SCHEDULE A WINDOW

Exact option:

`Schedule a window instead of starting now`

Reference schedule:

`Sun 6 Jul, 2:00 AM`

Duration:

`1 hour`

Action:

`Save schedule`

---

# 196. MAINTENANCE SCHEDULE DATA

Store:

* start time,
* timezone,
* duration/end time,
* public message,
* created by Staff,
* state.

---

# 197. TIMEZONE

Admin reference uses IST.

Store canonical timestamp and render clearly.

---

# 198. MAINTENANCE SCHEDULER

A real scheduler/background job must:

* activate at scheduled start,
* deactivate at expected end where policy allows automatic ending,
* handle server restarts.

Do not use Browser timer.

---

# 199. OVERLAPPING WINDOWS

Prevent or reconcile overlapping Maintenance schedules.

---

# 200. CANCEL SCHEDULE

Provide safe cancellation where the operational flow requires it.

Audit cancellation.

---

# 201. EXTEND MAINTENANCE

If active Maintenance takes longer:

allow authorised adjustment of expected end/message according to system workflow.

Audit.

---

# 202. SCREEN 14 — PUBLIC MAINTENANCE PAGE

Heading:

`We'll be back shortly`

Body:

`We're upgrading My Gujarat Property. Back within the hour — your listings and leads are safe.`

Schedule:

`Scheduled maintenance · expected back by 3:00 AM IST`

Support:

`Urgent issue? Email`

`support@mygujaratproperty.in`

---

# 203. MAINTENANCE PAGE DESIGN

Use exact Batch 13 public Maintenance design.

Do not render:

* full public Header,
* property search,
* stale dashboard shell.

The page should be simple and focused.

---

# 204. MAINTENANCE PAGE STATUS CODE

Use appropriate HTTP behavior for Maintenance responses where technically applicable, commonly:

503 Service Unavailable

with retry metadata where appropriate.

Do not break Admin routes.

---

# 205. SEARCH ENGINE BEHAVIOR

Maintenance Page must not be permanently indexed as site content.

Use appropriate response/header/meta behavior.

---

# 206. SUPPORT EMAIL

Use configured support address.

Do not hard-code a broken email address if actual platform configuration differs.

The Batch reference value is:

`support@mygujaratproperty.in`

Use configured authority.

---

# 207. MAINTENANCE DATA SAFETY COPY

The source reassures:

`your listings and leads are safe`

Only preserve this copy because Maintenance is a service outage, not a destructive migration.

Do not display reassurance if data integrity incident status is unknown.

---

# 208. ADMIN ACCESS DURING MAINTENANCE

Authorised Admin users remain able to:

* inspect System Health,
* change Maintenance state,
* review DLQ.

Public-role dashboard sessions receive Maintenance page.

---

# 209. CURRENT MAINTENANCE RECONCILIATION

The current Settings screen explicitly says Maintenance controls are planned for later.

Batch 13 requires:

* actual global state,
* immediate toggle,
* confirmation,
* Audit Note,
* schedule,
* duration,
* public page,
* scheduler.

---

# 210. SCREENS 15–16 — SYSTEM HEALTH AND DLQ

These screens must show real operational data.

Do not create fake uptime percentages or backup sizes.

---

# 211. SCREEN 15 — SYSTEM HEALTH DASHBOARD

Reference metric cards:

1. Uptime (30 d)
2. Job Queue
3. Dead-Letter Queue
4. Last Backup

---

# 212. UPTIME CARD

Reference:

`Uptime (30 d)`

`99.94%`

Supporting:

`1 incident · 26 min total`

This data must come from real monitoring/incident records.

---

# 213. UPTIME PROVIDER

If uptime monitoring is not configured:

show:

Setup Required

or honest unavailable state.

Do not hard-code:

99.94%.

---

# 214. INCIDENT DATA

Display actual:

* incident count,
* downtime duration.

---

# 215. JOB QUEUE CARD

Reference:

`Job queue`

`14`

`pending`

Supporting:

`Median wait 2.1 s · healthy`

---

# 216. JOB QUEUE METRICS

Use actual background-job queue data:

* pending count,
* median wait.

Do not use database row count from unrelated notifications.

---

# 217. JOB QUEUE HEALTH

`healthy`

must be based on defined threshold.

Do not always show green.

---

# 218. DEAD-LETTER QUEUE CARD

Reference:

`Dead-letter queue`

`3`

`failed jobs`

Supporting:

`Review below ↓`

Count must match Screen 16 queue.

---

# 219. LAST BACKUP CARD

Reference:

`Last backup`

`Today, 3:00 AM`

Supporting:

`Verified · 4.2 GB · daily`

---

# 220. BACKUP STATUS AUTHORITY

Only show:

`Verified`

when backup verification/check actually passed.

Do not infer Verified because backup job completed.

---

# 221. BACKUP SIZE

Use actual backup metadata.

No fake:

4.2 GB.

---

# 222. BACKUP FREQUENCY

Display actual configured schedule.

Reference:

daily.

---

# 223. SYSTEM HEALTH REFRESH

Use reasonable refresh strategy.

Do not poll expensive health checks continuously from Browser.

---

# 224. SYSTEM HEALTH PARTIAL FAILURE

If Backup provider status fails but Job Queue loads:

render available cards plus honest error on failed metric.

Do not blank complete dashboard.

---

# 225. SYSTEM HEALTH PERMISSIONS

System Health data is restricted to authorised Staff.

Do not expose internal queue/backup data publicly.

---

# 226. SCREEN 16 — DEAD-LETTER QUEUE

Columns:

* JOB
* ERROR SUMMARY
* FAILED

Actions:

* Retry
* Dismiss…

---

# 227. DLQ ROW 1 — EMAIL

Job:

`send_email`

Reference:

`#job_88412 · 3 retries`

Error Summary:

`Email provider returned 401 — key rejected. No user data lost; will send on retry.`

Failed:

`Today 9:21 AM`

Actions:

* Retry
* Dismiss…

---

# 228. DLQ ROW 2 — PDF

Job:

`generate_invoice_pdf`

Reference:

`#job_88395 · 3 retries`

Error:

`PDF render timed out (30 s). Invoice remains viewable in-app; download blocked.`

Failed:

`Today 7:44 AM`

Actions:

* Retry
* Dismiss…

---

# 229. DLQ ROW 3 — RERA SYNC

Job:

`sync_rera_registry`

Reference:

`#job_88102 · 5 retries`

Error:

`GujRERA portal unreachable — nightly sync skipped. Existing verifications unaffected.`

Failed:

`Yesterday 11:30 PM`

Actions:

* Retry
* Dismiss…

---

# 230. DLQ SAFE ERROR SUMMARY

The source explicitly says:

Raw stack traces live in Sentry and are never displayed here.

UI displays a safe operational summary.

---

# 231. RAW STACK TRACE PROHIBITION

Do not return raw:

* stack trace,
* environment path,
* SQL query,
* Secret,
* token,
* full user payload

to Browser.

---

# 232. SENTRY LINK

If Error Tracking provider is configured:

each Job may link to the corresponding Error event according to permission.

The Batch screen does not render raw trace.

---

# 233. JOB DISPLAY ID

Use safe human-readable Job reference.

Example:

`#job_88412`

---

# 234. RETRY COUNT

Display actual attempts:

`3 retries`

`5 retries`

---

# 235. DLQ RETRY

`Retry`

must:

1. require permission,
2. verify Job retryability,
3. prevent concurrent duplicate retry,
4. enqueue/re-execute safely,
5. increment attempt state,
6. update DLQ state,
7. audit.

---

# 236. JOB IDEMPOTENCY

Every retryable job that causes side effects must have idempotency.

Critical examples:

* send Email,
* generate Invoice PDF,
* sync RERA data.

A Job retry must not:

* send duplicate Email unintentionally,
* generate duplicate Invoice record,
* apply Verification result twice.

---

# 237. SEND EMAIL RETRY

For a failed Email:

retry the same Delivery intent.

Do not create a new unrelated Notification event.

---

# 238. PDF RETRY

Retry should regenerate PDF artifact.

Do not create a new Invoice number.

---

# 239. RERA SYNC RETRY

Retry sync.

Do not overwrite approved verification with stale or partial data without proper reconciliation.

---

# 240. DISMISS ACTION

The source states:

`Dismiss` requires confirmation and an Audit Note.

---

# 241. DISMISS CONFIRMATION

Must show:

* Job,
* failure summary,
* effect of Dismiss.

---

# 242. AUDIT NOTE REQUIRED

Server-side mandatory.

---

# 243. DISMISS DOES NOT DELETE HISTORY

Dismiss removes/resolves it from active DLQ review.

Preserve:

* Job record,
* failure history,
* retry count,
* dismissal actor,
* audit note.

---

# 244. DISMISS RESTRICTIONS

Do not allow dismissing critical unresolved financial jobs casually.

For example:

captured Payment awaiting Invoice generation

should require higher-level resolution/reconciliation path.

---

# 245. DLQ PAGINATION

Use pagination.

---

# 246. DLQ FILTER FOUNDATION

Architecture should support:

* Job Type,
* Date,
* Retry Count,
* Status

for scalability.

Do not add conflicting visible controls if absent from exact source.

---

# 247. CURRENT SYSTEM HEALTH RECONCILIATION

The current inspected Settings page explicitly states:

`System Health — Coming Soon`

and:

no fake uptime or health metric.

Preserve the honesty principle, but implement the complete Batch 13 real System Health/DLQ system.

Remove placeholder once functional.

---

# 248. ADS DATABASE REQUIREMENTS

Batch 13 Ads Admin requires structured data for:

* Campaign,
* Campaign revision,
* Project linkage,
* Builder ownership,
* targeting cities,
* targeting localities,
* audience configuration,
* schedule,
* creative variants,
* moderation state,
* moderation reason,
* performance metrics,
* fraud alerts,
* billing-valid clicks.

---

# 249. CAMPAIGN CREATIVE REQUIREMENTS

Use a structured Campaign Creative relation.

Required placement keys:

* desktop_banner,
* tablet_banner,
* mobile_banner.

Store actual dimensions.

---

# 250. CAMPAIGN MODERATION EVENTS

Persist:

* Submitted,
* Approved,
* Rejected,
* Resubmitted,
* Paused,
* Resumed,
* Expired.

---

# 251. FRAUD ALERT DATA MODEL

Support:

* Campaign,
* detection type,
* safe summary,
* flagged click count,
* raw restricted evidence reference,
* status,
* reviewer,
* decision,
* reviewed at.

---

# 252. BILLABLE CLICK MODEL

Do not calculate Builder Campaign Billing solely from gross click count.

Support exclusion state for confirmed fraud.

---

# 253. NOTIFICATION TEMPLATE DATA MODEL

Support:

* Event Key,
* Display Name,
* Channel,
* Locale,
* Subject,
* Body,
* status,
* version,
* published at,
* published by.

---

# 254. DELIVERY LOG DATA MODEL

Support:

* event identity,
* recipient,
* event key,
* channel,
* Template version,
* locale,
* fallback locale,
* status,
* safe failure reason,
* Provider,
* queued/sent/failed/skipped timestamps.

---

# 255. NOTIFICATION DEFAULT DATA MODEL

Support:

Event Key
× Channel
→ default enabled.

Version/audit changes.

---

# 256. PROVIDER CONFIG DATA MODEL

Do not store plaintext Secrets in a normal Provider table.

Safe metadata can include:

* Provider key,
* display name,
* provider type,
* configuration state,
* masked identifier,
* last test result,
* last tested at,
* last success at,
* safe error code.

---

# 257. FEATURE FLAG DATA MODEL

Support:

* key,
* description,
* enabled,
* rollout type,
* percentage,
* role scope,
* internal-only,
* updated by,
* timestamps.

---

# 258. MAINTENANCE DATA MODEL

Support:

* current state,
* public message,
* immediate/scheduled,
* scheduled start,
* expected end,
* actual start,
* actual end,
* created/activated by,
* audit note.

---

# 259. SYSTEM HEALTH DATA SOURCES

Define explicit sources for:

* uptime,
* incidents,
* queue metrics,
* DLQ,
* backup metadata.

Do not build metrics from unrelated tables.

---

# 260. BACKGROUND JOB MODEL

Support:

* Job Type,
* Queue,
* payload reference,
* status,
* attempts,
* max attempts,
* scheduled time,
* started time,
* finished time,
* safe error summary,
* restricted error reference,
* idempotency key.

---

# 261. DEAD-LETTER MODEL

A Job enters DLQ only after configured retry policy/exhaustion or explicit non-retryable failure.

Do not mark first transient failure as dead-letter immediately unless policy says so.

---

# 262. CURRENT REPOSITORY RECONCILIATION — PROVIDERS

Current Provider page:

* checks ENV presence,
* does not perform real provider health tests,
* does not have detail/rotation/test screens.

Batch 13 requires Screens 9–10 full implementation.

---

# 263. CURRENT REPOSITORY RECONCILIATION — FEATURE FLAGS

Current Settings page:

Feature Flags Coming Soon.

Implement Screens 11–12.

---

# 264. CURRENT REPOSITORY RECONCILIATION — MAINTENANCE

Current Settings placeholder mentions Maintenance later.

Implement Screens 13–14.

---

# 265. CURRENT REPOSITORY RECONCILIATION — SYSTEM HEALTH

Current Settings:

System Health Coming Soon.

Implement Screens 15–16.

---

# 266. CURRENT REPOSITORY RECONCILIATION — ADMIN NAVIGATION

Current Admin navigation includes:

* Providers,
* Settings.

Batch 13 additionally needs clear access to:

* Ads Admin,
* Notification Admin,
* System controls

according to the exact design route architecture.

Do not bury required screens behind dead placeholders.

---

# 267. CURRENT REPOSITORY RECONCILIATION — PLACEHOLDER ROUTES

The inspected Admin navigation configuration still marks provider/settings-related areas among placeholder-oriented route planning.

Batch 13 completion requires removing placeholder assumptions for these implemented modules.

---

# 268. PROVIDER STATUS VS ENV PRESENCE

Maintain the useful honesty distinction:

ENV present
≠ Active.

Final rule:

### Missing config

Setup Required.

### Config exists, no successful test

Configured / Untested.

### Real test passed

Active.

### Real test failed or live health failure

Error.

---

# 269. PROVIDER SECRET ROTATION AUDIT

Audit:

* Provider,
* actor,
* rotation action,
* timestamp.

Never audit actual Secret.

---

# 270. ANALYTICS SETUP CROSS-BATCH RULE

When Analytics is Setup Required:

Batch 6/7/8/13 analytic surfaces must show:

* Setup Required,
* `—`,
* insufficient data where tracking exists but not enough data.

Never random metrics.

---

# 271. MAP PROVIDER CROSS-BATCH RULE

When Maps is unavailable:

* Search falls back to List,
* map-specific validation shows honest fallback,
* location text remains functional.

No broken embedded Map.

---

# 272. WHATSAPP CROSS-BATCH RULE

When WhatsApp provider is missing:

external Notification delivery:

Skipped and logged.

User-facing native WhatsApp actions may still use approved free intent mode where product architecture separately allows it.

Do not confuse:

Notification Provider mode

with

user-click native WhatsApp intent.

---

# 273. EMAIL PROVIDER CROSS-BATCH RULE

When Email Provider is Error:

* new Email delivery should follow pause/queue policy,
* Delivery Logs show honest state,
* DLQ handles exhausted failures.

Do not keep marking Emails Sent.

---

# 274. MAINTENANCE CROSS-BATCH RULE

Maintenance Mode must apply consistently across:

* public Homepage,
* Search,
* Detail Pages,
* Auth,
* Owner Dashboard,
* Broker Dashboard,
* Builder Dashboard.

Admins remain available.

---

# 275. SYSTEM JOB PRIORITY

Critical jobs such as:

* payment reconciliation,
* Invoice generation,
* refund processing

must not be dismissible like low-risk notification jobs without stricter governance.

Implement risk-aware Job policy.

---

# 276. RESPONSIVE VERIFICATION MATRIX

Test:

* 360px,
* 390px,
* tablet portrait,
* tablet landscape,
* laptop,
* 1280px desktop,
* wide desktop.

---

# 277. ADS QUEUE RESPONSIVE CHECK

Desktop:

table.

Mobile:

source-defined cards.

Verify:

* Campaign name,
* Builder,
* submitted time,
* Review action.

---

# 278. AD REVIEW RESPONSIVE CHECK

Verify:

* all three creatives,
* Targeting Summary,
* RERA Check,
* Approve,
* Reject.

Mobile media previews must remain usable.

---

# 279. ACTIVE ADS RESPONSIVE CHECK

Table to cards where required.

Performance `—` state must remain visible.

---

# 280. FRAUD REVIEW RESPONSIVE CHECK

Long safe Pattern Summary must wrap correctly.

No raw identifier overflow.

---

# 281. NOTIFICATION TEMPLATE RESPONSIVE CHECK

Verify:

* Event,
* Channels,
* Status,
* Edit.

---

# 282. TEMPLATE EDITOR RESPONSIVE CHECK

Verify:

* language tabs,
* missing translation warning,
* Subject,
* Body,
* token chips,
* Save Draft,
* Publish,
* Live Preview.

Keyboard must not hide actions.

---

# 283. DELIVERY LOG RESPONSIVE CHECK

Table to cards.

Preserve:

* Recipient,
* Event,
* Channel,
* Status,
* Time.

---

# 284. DEFAULT MATRIX RESPONSIVE CHECK

Desktop matrix must remain clear.

On mobile:

use intentional responsive representation.

Do not render unreadable micro-checkbox table.

---

# 285. PROVIDER GRID RESPONSIVE CHECK

Provider cards stack cleanly.

Masked IDs do not overflow.

Status, Message and Action remain clear.

---

# 286. PROVIDER DETAIL RESPONSIVE CHECK

Secret fields remain masked.

Replace/Test actions remain usable.

---

# 287. FEATURE FLAG RESPONSIVE CHECK

Flag Key, description and Rollout remain readable.

Toggle must not collide with text.

---

# 288. MAINTENANCE RESPONSIVE CHECK

Verify:

* OFF/ON state,
* message field,
* schedule controls,
* duration,
* confirmation.

---

# 289. PUBLIC MAINTENANCE PAGE RESPONSIVE CHECK

Test:

* mobile,
* tablet,
* desktop.

No dashboard shell.

---

# 290. SYSTEM HEALTH RESPONSIVE CHECK

Metric cards wrap intentionally.

No fake horizontal page scroll.

---

# 291. DLQ RESPONSIVE CHECK

Long safe Error Summary must remain readable.

Actions remain accessible.

---

# 292. TEXT WRAPPING VERIFICATION

Explicitly inspect:

* Campaign names,
* Builder names,
* Project names,
* fraud summaries,
* Event keys,
* Template subjects,
* Delivery failure states,
* Provider errors,
* masked IDs,
* Feature Flag keys,
* Maintenance message,
* Job error summaries.

Fix:

* clipping,
* status overlap,
* accidental action wrapping,
* hidden ellipsis.

Do not randomly shrink typography.

---

# 293. LOADING STATES

Required for:

* Ads Queue,
* Ad Review,
* Active Ads,
* Fraud Review,
* Template List,
* Template Editor,
* Delivery Logs,
* Defaults,
* Provider Grid,
* Provider Detail,
* Feature Flags,
* Maintenance Control,
* System Health,
* DLQ.

Use screen-specific skeletons.

---

# 294. EMPTY STATES

Required:

* Ads Queue clear,
* No Active Ads,
* No Fraud Alerts,
* No Templates,
* No Delivery Logs,
* No DLQ Jobs.

Use positive/honest states.

---

# 295. ERROR STATES

Required:

* Ads Queue error,
* creative load failure,
* Campaign decision failure,
* Fraud action failure,
* Template save/publish failure,
* Delivery Log load failure,
* Defaults save failure,
* Provider test failure,
* key rotation failure,
* Flag toggle failure,
* Maintenance scheduling failure,
* Health metric source failure,
* DLQ Retry failure,
* DLQ Dismiss failure.

Do not expose raw internal errors.

---

# 296. NO DEAD UI RULE

Every visible Batch 13 control must work.

Includes:

* Ads Search,
* Review,
* View Active Ads,
* Queue Retry,
* Creative Preview,
* View Project Record,
* Approve,
* Reject,
* Reject reason options,
* Ad Tabs,
* Pause,
* Resume where applicable,
* Mark as Fraud,
* Fraud Dismiss,
* Template Edit,
* Language tabs,
* Token chips,
* Save Draft,
* Publish,
* Delivery filters,
* Defaults checkboxes/toggles,
* Save Defaults,
* Manage Provider,
* Fix Now,
* Set Up WhatsApp,
* Add API Key,
* Connect Analytics,
* Replace Keys,
* Test Connection,
* Feature Flag Toggle,
* Audit Note,
* Enable/Disable Flag,
* Maintenance Immediate Mode,
* Public Message,
* Schedule Window,
* Save Schedule,
* Maintenance End/Cancel controls where workflow provides,
* DLQ Retry,
* DLQ Dismiss,
* Sentry Job link where configured.

No:

`href="#"`

and no empty handlers.

---

# 297. SCREEN 1 FINAL CHECKLIST — ADS QUEUE

* [ ] Pending Campaign heading
* [ ] exact waiting count
* [ ] Search Builder
* [ ] Search Project
* [ ] Creative column
* [ ] Campaign
* [ ] Builder
* [ ] Project
* [ ] Submitted
* [ ] Review
* [ ] exact desktop table
* [ ] exact mobile card transform
* [ ] Queue Is Clear state
* [ ] View Active Ads
* [ ] Loading skeleton
* [ ] Couldn't Load error
* [ ] Retry
* [ ] pagination
* [ ] stale-review protection

---

# 298. SCREEN 2 FINAL CHECKLIST — AD REVIEW

* [ ] Campaign name
* [ ] Campaign Display ID
* [ ] Builder
* [ ] submitted time
* [ ] Reject
* [ ] Approve
* [ ] Desktop 1440×250 Creative
* [ ] Tablet 768×240 Creative
* [ ] Mobile 390×312 Creative
* [ ] real dimension validation
* [ ] Targeting Cities
* [ ] Localities
* [ ] Audience
* [ ] Schedule
* [ ] RERA Linkage
* [ ] RERA number
* [ ] Verification date
* [ ] View Project Record
* [ ] server approval gate
* [ ] Rejection confirmation
* [ ] misleading claim reason
* [ ] creative quality reason
* [ ] targeting violation reason
* [ ] Other reason
* [ ] resubmission support
* [ ] Notification
* [ ] Audit

---

# 299. SCREEN 3 FINAL CHECKLIST — ACTIVE ADS

* [ ] Active tab count
* [ ] Expired tab
* [ ] Rejected tab
* [ ] Campaign
* [ ] Schedule
* [ ] Status
* [ ] Performance
* [ ] real impressions
* [ ] real clicks
* [ ] `—` when unavailable
* [ ] Analytics Not Tracked state
* [ ] Pause
* [ ] Resume where valid
* [ ] lifecycle expiry scheduler
* [ ] no fake metrics

---

# 300. SCREEN 4 FINAL CHECKLIST — FRAUD REVIEW

* [ ] Flagged Patterns heading
* [ ] exact count
* [ ] Campaign
* [ ] safe Pattern Summary
* [ ] Flagged Click count
* [ ] IP truncation
* [ ] device identity truncation
* [ ] no raw PII
* [ ] Mark as Fraud
* [ ] confirmation
* [ ] billing exclusion
* [ ] metric integrity
* [ ] idempotent exclusion
* [ ] Dismiss
* [ ] history preserved
* [ ] Audit

---

# 301. SCREEN 5 FINAL CHECKLIST — TEMPLATES

* [ ] Event column
* [ ] Channels
* [ ] Status
* [ ] New Lead
* [ ] lead.created
* [ ] In-app
* [ ] Email
* [ ] WhatsApp
* [ ] Live
* [ ] Visit Reminder
* [ ] visit.reminder_24h
* [ ] SMS
* [ ] Draft
* [ ] Listing Approved
* [ ] listing.approved
* [ ] Edit action
* [ ] stable Event Registry

---

# 302. SCREEN 6 FINAL CHECKLIST — TEMPLATE EDITOR

* [ ] Event + Channel title
* [ ] English
* [ ] Gujarati
* [ ] Hindi
* [ ] missing Gujarati warning
* [ ] English fallback
* [ ] Subject
* [ ] Body
* [ ] User Name token
* [ ] Lead Name token
* [ ] Property Title token
* [ ] City token
* [ ] allow-listed token registry
* [ ] Save Draft
* [ ] Publish
* [ ] Template versioning
* [ ] Live Preview
* [ ] sample-value substitution
* [ ] updates while typing
* [ ] CTA Preview
* [ ] no real private data required
* [ ] Audit

---

# 303. SCREEN 7 FINAL CHECKLIST — DELIVERY LOGS

* [ ] All Channels
* [ ] Failed Only
* [ ] Last 24 h
* [ ] Recipient
* [ ] Event
* [ ] Channel
* [ ] Status
* [ ] Time
* [ ] Sent
* [ ] Failed — Carrier Error
* [ ] Skipped — Provider Not Set Up
* [ ] honest Provider state
* [ ] safe Recipient display
* [ ] safe failure summary
* [ ] pagination
* [ ] no N+1

---

# 304. SCREEN 8 FINAL CHECKLIST — DEFAULT MATRIX

* [ ] Event column
* [ ] In-app
* [ ] Email
* [ ] SMS
* [ ] WhatsApp
* [ ] New Lead
* [ ] Visit Reminder
* [ ] Saved Search Match
* [ ] Save Defaults
* [ ] applies to new users only
* [ ] existing preferences untouched
* [ ] onboarding preference seeding
* [ ] Audit

---

# 305. SCREEN 9 FINAL CHECKLIST — PROVIDER GRID

* [ ] OTP/SMS Auth
* [ ] MSG91
* [ ] Active state
* [ ] masked Auth Key
* [ ] last Test OK
* [ ] Payments
* [ ] Razorpay
* [ ] masked Key ID
* [ ] Email
* [ ] Resend
* [ ] Error state
* [ ] send failure count
* [ ] sends paused/queued
* [ ] WhatsApp Setup Required
* [ ] skip logging
* [ ] Maps Setup Required
* [ ] List fallback
* [ ] R2 Active
* [ ] masked token
* [ ] Analytics Setup Required
* [ ] no simulated numbers
* [ ] Sentry Active
* [ ] masked DSN
* [ ] Manage/Fix/Setup actions
* [ ] real health state

---

# 306. SCREEN 10 FINAL CHECKLIST — PROVIDER DETAIL

* [ ] Provider identity
* [ ] Provider type
* [ ] masked Key ID
* [ ] completely masked Secret
* [ ] write-only Secret
* [ ] Replace Keys
* [ ] Test Connection
* [ ] real safe test
* [ ] successful Test result
* [ ] failed Test result
* [ ] safe error code
* [ ] Last Successful Test
* [ ] no Secret returned to Client
* [ ] rate limit
* [ ] Audit

---

# 307. SCREEN 11 FINAL CHECKLIST — FEATURE FLAGS

* [ ] Flag Key
* [ ] Description
* [ ] Rollout
* [ ] Enabled
* [ ] map_search_view
* [ ] All Users
* [ ] broker_kanban_crm
* [ ] Broker-only 25% rollout
* [ ] stable deterministic bucketing
* [ ] gujarati_ui
* [ ] Internal Only
* [ ] centralized evaluation
* [ ] no Math.random rollout

---

# 308. SCREEN 12 FINAL CHECKLIST — FLAG CONFIRMATION

* [ ] dynamic Flag title
* [ ] exact impact explanation
* [ ] required Audit Note
* [ ] Cancel
* [ ] Disable/Enable action
* [ ] server permission
* [ ] state revalidation
* [ ] cache invalidation
* [ ] real Audit entry
* [ ] actor
* [ ] note
* [ ] timestamp
* [ ] user-facing Flag effect

---

# 309. SCREEN 13 FINAL CHECKLIST — MAINTENANCE CONTROL

* [ ] OFF/ON state
* [ ] system-impact copy
* [ ] Admin exception
* [ ] public message
* [ ] immediate enable confirmation
* [ ] required Audit Note
* [ ] Schedule Window option
* [ ] start date/time
* [ ] IST rendering
* [ ] duration
* [ ] Save Schedule
* [ ] scheduler
* [ ] persistent state
* [ ] overlap validation
* [ ] cancel schedule
* [ ] extension/update behavior
* [ ] Webhook exception safety
* [ ] Audit

---

# 310. SCREEN 14 FINAL CHECKLIST — PUBLIC MAINTENANCE PAGE

* [ ] We'll Be Back Shortly heading
* [ ] public Maintenance message
* [ ] scheduled maintenance copy
* [ ] expected-back time
* [ ] IST label
* [ ] Urgent Issue email
* [ ] configured Support email
* [ ] no public Header/search/dashboard
* [ ] mobile responsive
* [ ] Admin routes still available
* [ ] appropriate maintenance response behavior
* [ ] no permanent indexing

---

# 311. SCREEN 15 FINAL CHECKLIST — SYSTEM HEALTH

* [ ] Uptime 30-day metric
* [ ] real percentage
* [ ] incident count
* [ ] downtime duration
* [ ] Job Queue pending count
* [ ] median wait
* [ ] health state
* [ ] DLQ count
* [ ] count matches Screen 16
* [ ] Last Backup time
* [ ] verified status only after verification
* [ ] backup size
* [ ] backup frequency
* [ ] Setup Required when monitoring absent
* [ ] partial failure handling
* [ ] no fake metrics

---

# 312. SCREEN 16 FINAL CHECKLIST — DEAD-LETTER QUEUE

* [ ] Job column
* [ ] safe Error Summary
* [ ] Failed time
* [ ] send_email job
* [ ] Retry count
* [ ] provider 401 safe summary
* [ ] generate_invoice_pdf
* [ ] timeout summary
* [ ] Invoice remains viewable state
* [ ] sync_rera_registry
* [ ] Portal unavailable safe summary
* [ ] existing Verification unaffected message
* [ ] Retry
* [ ] retry permission
* [ ] idempotency
* [ ] no duplicate side effect
* [ ] Dismiss
* [ ] confirmation
* [ ] mandatory Audit Note
* [ ] history preserved
* [ ] raw stack trace hidden
* [ ] Sentry link where configured
* [ ] pagination

---

# 313. FULL CONNECTED BATCH 13 REGRESSION FLOW

Execute the complete real flow:

Login as Ads Moderator
→ open Ads Queue
→ verify exact Pending count
→ Search Builder
→ Search Project
→ open Campaign Review
→ verify Desktop Creative 1440×250
→ verify Tablet Creative 768×240
→ verify Mobile Creative 390×312
→ inspect Targeting Cities
→ inspect Localities
→ inspect Audience
→ inspect Schedule
→ inspect linked Project RERA status
→ Reject fixture with structured reason
→ verify Builder Notification
→ resubmit Campaign fixture
→ Approve
→ verify scheduled/active lifecycle
→ open Active Ads
→ verify real performance fixture
→ verify second Campaign displays `— / Analytics not tracked`
→ Pause Campaign
→ verify serving state
→ open Fraud Review
→ verify full IP absent from Browser payload
→ Mark fixture as Fraud
→ confirm
→ verify flagged clicks excluded once from Billing
→ Dismiss second alert
→ open Notification Templates
→ edit lead.created Email
→ switch Gujarati
→ verify missing translation warning
→ verify English fallback
→ insert token
→ edit Body
→ inspect Live Preview
→ Save Draft
→ verify Live version unchanged
→ Publish
→ verify new Live Template version
→ trigger test Notification fixture
→ open Delivery Logs
→ verify Sent Email
→ verify Failed SMS
→ verify Skipped WhatsApp Provider Missing
→ open Default Matrix
→ change one new-user Default
→ save
→ verify existing user preference unchanged
→ register/create test new user fixture
→ verify new Default seeded
→ open Provider Grid
→ verify missing Provider shows Setup Required
→ verify configured but untested Provider is not Active
→ run Test Connection for test provider
→ verify Active only after success
→ use invalid Email test key fixture
→ verify Error state
→ verify sends paused/queued behavior
→ rotate test credential
→ verify Secret cannot be read back
→ open Feature Flags
→ toggle map_search_view
→ confirmation
→ enter Audit Note
→ disable
→ verify public Search Map toggle disappears and falls back to List
→ verify Audit entry
→ enable according to test policy
→ open Maintenance Control
→ schedule test Maintenance window
→ verify scheduler state
→ activate isolated Maintenance test state
→ verify public site Maintenance page
→ verify public dashboards blocked
→ verify Admin remains accessible
→ verify payment Webhook endpoint remains operational
→ end Maintenance
→ open System Health
→ verify real monitoring data or honest Setup Required states
→ open DLQ
→ Retry idempotent Email fixture
→ verify one Delivery effect
→ Retry PDF fixture
→ verify no duplicate Invoice
→ Dismiss safe test Job
→ verify confirmation and Audit Note
→ inspect Audit trail
→ run mobile Admin regression
→ tablet regression
→ desktop regression.

Any broken connection means Batch 13 is incomplete.

---

# 314. ADS MODERATION CONCURRENCY TEST

Open same Pending Campaign in two Staff sessions.

Session A:

Approve.

Session B:

Reject stale screen.

Expected:

Session B action fails with safe stale-state response.

No conflicting Campaign status.

---

# 315. AD FRAUD DOUBLE-ACTION TEST

Submit:

Mark as Fraud

twice rapidly.

Expected:

* one confirmed Fraud decision,
* one billing exclusion,
* one Audit decision.

---

# 316. NOTIFICATION FALLBACK TEST

Set test user's locale to Gujarati.

Remove Gujarati Template for test Event.

Trigger Event.

Expected:

* English content selected,
* Delivery succeeds according to provider,
* fallback metadata recorded,
* no blank message.

---

# 317. MISSING PROVIDER DELIVERY TEST

Disable isolated WhatsApp test Provider.

Trigger WhatsApp-eligible event.

Expected:

* no provider API call,
* Delivery Log record,
* Status: Skipped,
* reason: provider not set up.

---

# 318. FEATURE FLAG STABILITY TEST

Set:

Broker rollout = 25%.

Repeatedly load same user.

Expected:

same assignment every time.

Do not change randomly per refresh.

---

# 319. MAINTENANCE ACCESS TEST

During Maintenance:

### Guest

Maintenance Page.

### Owner

Maintenance Page.

### Broker

Maintenance Page.

### Builder

Maintenance Page.

### Admin

Admin available.

### Payment Webhook

Processes according to secure webhook policy.

---

# 320. DLQ IDEMPOTENCY TEST

Retry:

same failed Job twice.

Expected:

no duplicate side effect.

Examples:

* no duplicate Email,
* no duplicate Invoice,
* no duplicate RERA Verification mutation.

---

# 321. PERMISSION REGRESSION MATRIX

Test:

## Ads View Only

Can view Campaign Queue/List.

Cannot approve/reject/pause/fraud decision.

## Notification Editor

Can edit/save Draft.

Cannot Publish unless Publish permission.

## Provider View

Can see safe Provider state.

Cannot Replace Secret/Test if not granted.

## Feature Flag View

Can read Flags.

Cannot toggle.

## System Health View

Can read Health/DLQ safe summaries.

Cannot Retry/Dismiss.

## Super Admin

Full access.

---

# 322. SECRET LEAK REGRESSION TEST

Inspect:

* rendered HTML,
* Server Component payload,
* API responses,
* Browser network,
* Client logs.

Verify no full:

* Razorpay Secret,
* Resend API key,
* MSG91 Auth key,
* WhatsApp token,
* R2 token,
* Sentry sensitive DSN credentials

are exposed.

---

# 323. PII LEAK REGRESSION TEST

Inspect Fraud Review network payload.

Verify no unrestricted raw:

* full IP,
* full device fingerprint.

Only safe truncated summary in normal UI response.

---

# 324. RAW STACK TRACE REGRESSION TEST

Create a failed test Job.

Open DLQ.

Verify:

* safe summary visible,
* raw stack trace absent from Browser response.

---

# 325. LIVE VERIFICATION STANDARD

After every Batch 13 implementation section:

1. run Build,
2. run TypeScript check,
3. run Lint where configured,
4. run actual application,
5. login as each relevant Staff role,
6. test route access,
7. test server-action permissions,
8. inspect database writes,
9. inspect Audit records,
10. test Provider Test Mode/safe environment,
11. inspect Notification deliveries,
12. inspect skipped Deliveries,
13. inspect Job Queue,
14. inspect DLQ,
15. refresh Browser,
16. verify persistence,
17. test 390px mobile,
18. test tablet,
19. test desktop,
20. inspect Browser console,
21. inspect failed Network requests,
22. inspect sensitive payload exposure,
23. inspect raw error leakage.

Static code review is not PASS.

---

# 326. MANUAL VISUAL VERIFICATION

Open the actual Batch 13 source beside implementation.

Compare every screen for:

* Admin layout,
* card width,
* table density,
* Campaign rows,
* Creative labels,
* creative proportions,
* Targeting layout,
* RERA card,
* status badges,
* Performance `—` state,
* Fraud Pattern cards,
* Notification channel chips,
* Editor language tabs,
* token chips,
* Live Preview,
* Delivery failure state,
* Defaults matrix,
* Provider card states,
* masked identifiers,
* Error card styling,
* Setup Required styling,
* Feature Flag rows,
* Rollout labels,
* confirmation dialog,
* Maintenance form,
* public Maintenance page,
* System Health cards,
* DLQ safe summaries.

`Almost the same` is not PASS.

---

# 327. COMPLETION BLOCKERS

Batch 13 must not be marked complete while any of these remain:

* Ads Admin missing,
* Ads Queue uses fake Campaigns,
* Campaign Review missing one required creative size,
* one creative stretched across all devices,
* Targeting Summary disconnected from real Campaign data,
* Campaign approval ignores RERA policy,
* rejection reason optional,
* Active Ad performance fabricated,
* Analytics unavailable but zero/fake metrics shown,
* Pause action UI-only,
* Fraud Review exposes raw full IP,
* Fraud Review exposes raw fingerprint,
* Mark as Fraud doesn't affect billable clicks,
* fraudulent click exclusion can run twice,
* Notification Template Admin missing,
* Event keys free-form/uncontrolled,
* Draft save immediately changes Live Template,
* missing translation sends blank content,
* no English fallback,
* tokens execute arbitrary expressions,
* Preview uses real private user data unnecessarily,
* Delivery Logs missing,
* missing Provider delivery silently disappears,
* WhatsApp missing shown as Sent,
* Notification Defaults overwrite existing user preferences,
* Provider status based only on ENV existence,
* Configured credentials shown as Active without test,
* full Secret returned to Client,
* saved Secret displayed in input,
* Provider Replace action dead,
* Provider Test action fake,
* Provider Error doesn't affect delivery behavior,
* Maps missing still renders broken Map,
* Analytics missing still renders fake charts,
* Feature Flags remain Coming Soon,
* percentage rollout uses Math.random per request,
* Flag change has no Audit Note,
* Flag Admin shows disabled but user UI ignores change,
* Maintenance remains placeholder,
* Maintenance toggle has no confirmation,
* Maintenance has no Audit Note,
* scheduled Maintenance uses Browser timer,
* Maintenance blocks financial Webhooks,
* public Maintenance page still shows normal Header/Search,
* System Health remains Coming Soon,
* fake 99.94% uptime,
* fake backup size,
* backup marked Verified without verification,
* DLQ missing,
* DLQ exposes raw stack traces,
* Retry is non-idempotent,
* Retry duplicates Email,
* Retry duplicates Invoice,
* Dismiss requires no reason,
* Dismiss deletes historical Job record,
* dead button,
* `href="#"`,
* mobile Admin bottom nav appears,
* text clipping,
* masked identifier overflow,
* console errors,
* permission bypass,
* Secret leakage,
* PII leakage,
* no live multi-role verification.

---

# 328. FINAL ACCEPTANCE STATEMENT

**Design Batch 13 — Admin Ads, Notifications & System is complete only when all 16 Batch 13 screen groups are implemented according to the exact source design and every system status is backed by real operational data.**

Completion requires:

* complete Ads Queue,
* real Campaign count,
* Search Builder/Project,
* desktop Table,
* mobile Cards,
* Queue Clear state,
* Queue Error + Retry,
* Campaign Review Detail,
* exact Desktop 1440×250 creative,
* exact Tablet 768×240 creative,
* exact Mobile 390×312 creative,
* real Targeting Summary,
* real Cities,
* real Localities,
* real Audience summary,
* real Schedule,
* Project RERA linkage,
* View Project Record,
* Approve,
* Reject,
* structured rejection reasons,
* resubmission,
* Active Ads,
* Expired Ads,
* Rejected Ads,
* honest real Performance,
* `—` when Analytics unavailable,
* Pause,
* Fraud Pattern Review,
* truncated PII-safe patterns,
* Mark as Fraud confirmation,
* fraud billing exclusion,
* Dismiss,
* complete Notification Template List,
* stable Event Registry,
* channel relationships,
* Draft/Live states,
* multilingual Template Editor,
* English,
* Gujarati,
* Hindi state,
* English fallback,
* Subject,
* Body,
* controlled tokens,
* Save Draft,
* Publish,
* Template versioning,
* Live Preview,
* real sample substitution,
* Delivery Logs,
* Sent state,
* Failed state,
* Skipped Provider Missing state,
* channel/date filters,
* Notification Defaults Matrix,
* new-user-only Defaults,
* existing-user preference preservation,
* complete Provider Status Grid,
* MSG91,
* Razorpay,
* Resend,
* Meta WhatsApp,
* Google Maps,
* Cloudflare R2,
* PostHog,
* Sentry,
* Active states backed by real tests,
* Error states,
* Setup Required states,
* masked credentials,
* Provider Detail,
* write-only Secrets,
* credential rotation,
* real Test Connection,
* Feature Flag List,
* All Users rollout,
* Role Percentage rollout,
* Internal-only rollout,
* deterministic assignment,
* Toggle confirmation,
* mandatory Audit Note,
* real application effect,
* Maintenance Mode Control,
* immediate activation confirmation,
* Public Message,
* scheduled window,
* Duration,
* scheduler,
* public Maintenance page,
* expected-back time,
* Admin access exception,
* Webhook safety,
* real System Health,
* Uptime data or honest Setup Required,
* real incident data,
* real Job Queue count,
* real median wait,
* real DLQ count,
* verified Backup metadata,
* Dead-Letter Queue,
* safe Error Summaries,
* Retry,
* idempotency,
* Dismiss confirmation,
* mandatory Audit Note,
* raw stack trace exclusion,
* Sentry linking where configured,
* complete permissions,
* complete audit,
* no fake numbers,
* no fake Provider success,
* no Secret leak,
* no PII leak,
* no dead controls,
* complete desktop verification,
* complete tablet verification,
* complete mobile Admin verification,
* complete multi-role live regression.

Required implementation sequence:

**Screens 1–4 Ads Admin → verify → Screens 5–8 Notification Admin → verify → Screens 9–10 Providers → verify → Screens 11–12 Feature Flags → verify → Screens 13–14 Maintenance → verify → Screens 15–16 System Health/DLQ → verify → complete connected system regression test.**

No system screen passes merely because it renders.

**Exact Design + Honest Operational State + Ad Moderation Integrity + Notification Delivery Integrity + Provider Secret Safety + Feature-Flag Stability + Maintenance Safety + Background Job Idempotency + System Observability + Permission Enforcement + Auditability + Responsive Behavior + Live Verification must all pass.**
