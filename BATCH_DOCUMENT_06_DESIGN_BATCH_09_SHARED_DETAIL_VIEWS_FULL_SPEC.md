# BATCH_DOCUMENT_06_DESIGN_BATCH_09_SHARED_DETAIL_VIEWS_FULL_SPEC.md

# My Gujarat Property

## Batch Document 06

## Design Batch 9 — Shared Detail Views, Lead Actions, Contact Reveal, Proposal Detail, Messaging and Complete Site Visit Lifecycle

---

# 1. DOCUMENT PURPOSE

This document is the complete design, functionality, data, backend integration, persistence, privacy, security, RLS, responsive behavior, provider-safety and live-verification specification for:

**My Gujarat Property · Design Batch 9 — Shared Detail Views**

Batch 9 defines the detailed shared interaction layer used across:

* Owner,
* Broker,
* Builder,
* authorised dashboard users,
* CRM workflows,
* Proposal workflows,
* Messaging,
* Site Visit workflows.

Batch 9 contains exactly these 15 screen groups:

1. Lead Full Detail
2. Add / Edit Lead Note
3. Follow-up Reminder Scheduler
4. Lead Status Change to Closed / Lost
5. Duplicate Lead Detection and Merge
6. Contact Reveal — Three-Step Flow
7. Proposal Full Detail with Embedded Conversation
8. Messages Thread List
9. Full-Featured Message Thread
10. Report Conversation Flow
11. Site Visit Request Form
12. Site Visit Accept / Reject / Reschedule
13. Site Visit Reminder Notification
14. Post-Visit Feedback
15. Site Visit Dispute State

Every screen and state must be implemented.

No Batch 9 screen may be:

* skipped,
* replaced by generic cards,
* left as Coming Soon,
* represented only by placeholder UI,
* visually implemented without backend functionality,
* merged into another screen in a way that destroys the source design.

The actual Batch 9 design file must be read directly from:

`/newdesign/`

Use the real file:

`Batch 9 - Shared Detail Views (Standalone) (1).html`

or the exact Batch 9 file present in the final `/newdesign/` directory.

Do not implement from:

* memory,
* old Lead Detail UI,
* current generic stacked dashboard cards,
* old Message screens,
* generic CRM design,
* generic chat templates,
* assumptions.

---

# 2. ABSOLUTE CURRENT UI REPLACEMENT RULE

Where current Lead Detail, Message Detail, Proposal Detail or Site Visit screens conflict with Batch 9, remove and replace the conflicting presentation architecture.

Do not build Batch 9 by keeping:

* current generic stacked Lead cards,
* current inline CRM stage select,
* current inline Notes form,
* current inline Follow-up form,
* current embedded basic Messages card,
* current basic Site Visit card,
* old thread list without search,
* old thread links that simply redirect to Lead Detail,
* old generic Proposal page,
* old visit accept/reject buttons without required date/reason flows.

The final UI must use the Batch 9 design.

Secure backend functionality may be reused where correct.

The final rule is:

**Remove conflicting old UI; preserve, repair or rebuild compatible secure backend functionality.**

---

# 3. BATCH 9 SCREEN INVENTORY

The implementation scope is:

## Screen 1

Lead Full Detail

Includes:

* Desktop standalone Lead page
* Mobile full Lead page
* Timeline tab
* Notes tab
* Related Property tab
* Documents tab
* Call
* Schedule Visit
* Message

## Screen 2

Add / Edit Note

Includes:

* mobile bottom sheet,
* Pin Note toggle,
* Save Note,
* edit existing Note.

## Screen 3

Follow-up Reminder Scheduler

Includes:

* date,
* time,
* quick date options,
* reminder channel selection,
* saved reminder chip.

## Screen 4

Status Change to Closed / Lost

Includes:

* Pipeline dropdown,
* mandatory terminal reason,
* Closed outcome,
* Lost reasons,
* Other reason.

## Screen 5

Duplicate Lead Detection

Includes:

* inline duplicate warning,
* View Duplicate Lead,
* Merge,
* Dismiss,
* merge confirmation,
* combined timelines,
* newer Lead closure.

## Screen 6

Contact Reveal

Three states:

* Masked,
* Consent Notice,
* Revealed.

Includes:

* Reveal Number,
* reveal quota,
* notification to Lead,
* Call,
* Copy,
* WhatsApp.

## Screen 7

Proposal Full Detail

Includes:

* Requirement recap,
* Proposed Listing,
* status timeline,
* embedded conversation,
* Withdraw Proposal.

## Screen 8

Message Thread List

Includes:

* Search,
* All,
* Unread,
* Archived,
* unread counts,
* swipe-left Archive.

## Screen 9

Message Thread Detail

Includes:

* View Lead,
* Archive,
* Report Thread,
* persistent Safety Banner,
* text messages,
* PDF attachment,
* image attachment,
* typing indicator,
* sticky safe-area input,
* send.

## Screen 10

Report Conversation

Includes:

* desktop modal,
* mobile bottom sheet,
* exact report reasons,
* details,
* duplicate-submit protection.

## Screen 11

Site Visit Request

Includes:

* Lead context,
* date,
* time,
* visitor notes,
* duplicate-submit protection.

## Screen 12

Site Visit Response

Includes:

* Accept,
* Reschedule,
* Reject,
* proposed new slot,
* required rejection reason.

## Screen 13

Site Visit Reminder Notification

Includes:

* Visit reminder,
* Confirm,
* Cancel.

## Screen 14

Post-Visit Feedback

Includes:

* Interested,
* Not Interested,
* Follow-up,
* optional Note,
* Save Feedback.

## Screen 15

Dispute State

Includes:

* Disputed badge,
* conflicting reports explanation,
* timeline freeze,
* no self-service resolution,
* Contact Support.

Nothing may be omitted.

---

# 4. IMPLEMENTATION ORDER

Implement Batch 9 in this order:

1. Screen 1 — Lead Full Detail
2. Screen 2 — Add/Edit Note
3. Screen 3 — Follow-up Reminder
4. Screen 4 — Closed/Lost Status Flow
5. Screen 5 — Duplicate Detection/Merge
6. Screen 6 — Contact Reveal
7. Screen 7 — Proposal Full Detail
8. Screen 8 — Thread List
9. Screen 9 — Message Thread Detail
10. Screen 10 — Report Conversation
11. Screen 11 — Site Visit Request
12. Screen 12 — Accept/Reject/Reschedule
13. Screen 13 — Reminder Notification
14. Screen 14 — Post-Visit Feedback
15. Screen 15 — Dispute
16. Full cross-module connected regression verification.

Do not implement all screens in one uncontrolled change.

---

# 5. SHARED ROLE CONTEXT

Batch 9 is shared across authorised Lead participants.

Relevant users may include:

* Owner,
* Broker,
* Builder,

according to Lead, Proposal, Thread and Site Visit relationships.

Every page/action must derive authority from:

* authenticated user,
* Lead participant relationship,
* Proposal participant relationship,
* Thread participant relationship,
* Site Visit participant relationship,
* role-specific action ownership.

A user must not gain access by changing:

* Lead ID,
* Proposal ID,
* Thread ID,
* Site Visit ID,
* document ID.

---

# 6. SHARED DESIGN SYSTEM

Batch 9 uses the approved Batch 1 system.

Use:

Brand:

`#0F6B5C`

Brand Soft:

`#E7F2EF`

Success:

`#16A34A`

Pending / warning:

`#D97706`

Destructive:

`#DC2626`

Info:

`#2563EB`

Neutral:

Zinc family.

Typography:

Inter.

Icons:

Lucide outline.

Do not introduce:

* emoji icons,
* filled icon family,
* random blue CRM styling,
* unrelated generic Material components.

---

# 7. RESPONSIVE FOUNDATION

Batch 9 explicitly includes desktop and mobile differences.

Mobile reference:

390px.

Desktop content:

dashboard shell or standalone dashboard page, depending on source screen.

Rules:

* Lead Full Detail mobile is full page.
* Note on mobile is bottom sheet.
* Report mobile is bottom sheet.
* Proposal mobile stacks full-width.
* Message screens are mobile-first.
* Message input respects keyboard and safe area.
* Sticky actions must not cover content.

---

# 8. SCREEN 1 — LEAD FULL DETAIL

Screen 1 is:

**Lead full detail page — standalone**

This is intentionally different from the smaller Batch 6/7 Lead drawer.

Batch 6/7:

quick Lead drawer.

Batch 9:

full standalone detailed Lead workspace.

Do not confuse them.

Both may exist:

* quick drawer from list,
* full detailed route from Open Full Detail.

---

# 9. SCREEN 1 DESKTOP ROUTE

The Lead Full Detail should have a stable route such as the existing Lead route architecture.

It must render inside the correct role dashboard shell.

The source describes:

`1A · Desktop — page inside dashboard shell`

The shell may be omitted from the visual design reference for clarity, but the final dashboard screen must use the correct role shell.

---

# 10. SCREEN 1 DESKTOP HEADER

Reference Lead:

Initials:

`MP`

Name:

`Meera Purohit`

Status:

`New`

Contact state:

`Number revealed`

Metadata:

`Lead #2471 · via listing page · 3 BHK, Silver Heights · received today 9:42 AM`

Actions:

* Call
* Schedule Visit
* Message

All values must be real.

---

# 11. LEAD DISPLAY ID

Reference:

`Lead #2471`

Production Lead display ID must be generated from actual system data.

Do not display:

`2471`

for every Lead.

If raw UUID is the database primary key:

create a safe display reference system.

Do not expose predictable information in a way that enables unauthorised ID enumeration.

---

# 12. LEAD SOURCE

Reference:

`via listing page`

The Lead source must come from structured Lead source data.

Examples may include:

* listing page,
* Proposal,
* saved search,
* shared link,
* Project enquiry,
* campaign.

Do not infer source from Note content.

---

# 13. LEAD PROPERTY CONTEXT

Reference:

`3 BHK, Silver Heights`

The property context must come from the actual Lead target.

If target becomes unavailable:

show honest state.

Do not crash.

Do not silently attach another Property.

---

# 14. LEAD RECEIVED TIME

Reference:

`received today 9:42 AM`

Time must use the current user timezone.

Do not display raw UTC.

Use correct relative/absolute formatting.

---

# 15. LEAD HEADER STATUS

Reference:

`New`

Status badge must correspond to actual CRM stage/state.

Do not display `New` based only on creation time.

---

# 16. CONTACT STATE CHIP

Reference:

`Number revealed`

Only show this when Batch 9 professional-side contact reveal state is actually completed.

Do not use the wrong-direction listing contact-request state.

This distinction is critical.

---

# 17. LEAD FULL DETAIL TABS

Exact tabs:

* Timeline
* Notes (2)
* Related Property
* Documents (1)

Mobile abbreviated labels:

* Timeline
* Notes
* Property
* Docs

Counts must be real.

Do not hard-code:

`Notes (2)`

or:

`Documents (1)`.

---

# 18. TAB BEHAVIOR

Tabs must:

* select visually,
* change panel content,
* preserve Lead context,
* be keyboard accessible,
* not lose unsaved data unexpectedly.

The URL may preserve active tab where appropriate.

Browser back should remain sensible.

---

# 19. TIMELINE TAB

The source states:

**Timeline is a complete activity log of every touchpoint.**

The timeline is not only raw CRM stage changes.

It must include all relevant Lead events.

Reference timeline:

### Site visit scheduled

`Sat 5 Jul, 11:00 AM`

`You accepted her request · today, 10:20 AM`

### Message sent

`"Yes, it's available. Saturday 11 AM works…"`

`today, 9:47 AM`

### Number revealed to you

`Meera was notified of the reveal · today, 9:45 AM`

### Inquiry submitted

`"Is the flat still available? Can we visit this Saturday?"`

`via 3 BHK, Silver Heights listing · today, 9:42 AM`

---

# 20. TIMELINE EVENT MODEL

The Lead timeline should support events such as:

* Lead created,
* Inquiry submitted,
* Contact revealed,
* Message sent,
* Note added,
* Follow-up set,
* Follow-up completed,
* stage changed,
* Site Visit requested,
* Site Visit accepted,
* Site Visit rescheduled,
* Site Visit cancelled,
* Site Visit completed,
* feedback saved,
* duplicate merged,
* Proposal event where relevant.

---

# 21. TIMELINE DATA SAFETY

Timeline metadata must be safe.

Do not expose:

* raw internal errors,
* secret provider payload,
* private admin note,
* payment secret,
* full phone before reveal.

Use `metadata_safe` or equivalent safe projection.

---

# 22. TIMELINE ORDER

Display newest/relevant ordering exactly according to design.

Persist timestamps.

Do not fabricate event order from current state.

---

# 23. TIMELINE PAGINATION

Long Lead history must be paginated or incrementally loaded.

Do not fetch an unlimited lifetime activity log.

---

# 24. NOTES TAB

Reference Note 1:

Badge:

`PINNED`

Text:

`Prefers east-facing. Husband works near Satellite — weekday evening visits ok.`

Metadata:

`You · today 9:50 AM`

Action:

`Edit`

Reference Note 2:

`Budget flexible up to ₹95L for higher floor.`

Metadata:

`You · today 10:05 AM`

Action:

`Edit`

---

# 25. NOTES TAB FUNCTIONALITY

Notes must support:

* real records,
* author,
* timestamp,
* Pin state,
* Edit,
* safe text,
* visibility behavior.

Pinned Notes appear first.

Within the same pinned/non-pinned group:

use appropriate chronology.

---

# 26. NOTE VISIBILITY

Batch 9 Notes are CRM notes.

Define visibility clearly.

The current code supports concepts such as:

* private,
* shared.

The final UI and backend must agree.

Do not accidentally share a private CRM Note with the Lead.

If the design intends professional-only Notes:

enforce private visibility.

---

# 27. DOCUMENTS TAB

Reference document:

`floor-plan-A-1204.pdf`

Metadata:

`Shared in chat · 840 KB`

Action:

Download icon.

Additional action:

`Attach document`

---

# 28. DOCUMENTS DATA SOURCE

Documents tab should aggregate Lead-related documents that the user is authorised to access.

Reference source:

shared in chat.

Potential sources:

* Message attachment,
* manually attached Lead document

only according to approved product flow.

---

# 29. DOCUMENT SECURITY

Lead documents must not use unrestricted public URLs where private.

Required:

* participant authorization,
* signed/protected access where appropriate,
* file type validation,
* size validation.

Do not expose another Lead's documents by changing attachment ID.

---

# 30. ATTACH DOCUMENT

`Attach document` must work.

Requirements:

* open file picker,
* validate allowed files,
* upload real file,
* create attachment relation,
* display upload progress,
* failure/retry state,
* persistence after refresh.

Do not show the button if attachment functionality is not implemented.

---

# 31. DOWNLOAD DOCUMENT

Download action must open/download real file.

Do not return blank placeholder.

---

# 32. RELATED PROPERTY TAB

Related Property must show the actual Lead target.

Use:

* current safe Property summary,
* current status,
* current price where authorised,
* correct route.

If the Lead relates to a Project:

adapt context according to final shared detail behavior.

Do not assume every Lead target is a Property if Batch shared system supports Projects.

---

# 33. SCREEN 1 MOBILE LEAD DETAIL

Reference:

Header:

`Lead #2471`

Profile:

`MP`

`Meera Purohit`

Badges:

* New
* Revealed

Tabs:

* Timeline
* Notes
* Property
* Docs

Timeline entries:

### Site visit scheduled

`Sat 5 Jul, 11 AM · today 10:20 AM`

### Message sent

`today 9:47 AM`

### Number revealed

`today 9:45 AM`

### Inquiry submitted

`via listing · today 9:42 AM`

Bottom actions:

* Call
* Message

---

# 34. MOBILE LEAD FULL PAGE RULE

Mobile Lead Detail is a real full page.

Do not show:

* squeezed desktop drawer,
* modal occupying 80% width,
* generic card stack with no Batch tabs.

Use the exact mobile hierarchy.

---

# 35. MOBILE HEADER

Mobile inner screen requires:

* back button,
* Lead display ID,
* More action control where shown.

Back must return to correct previous CRM context.

---

# 36. MOBILE BOTTOM ACTIONS

Call and Message must remain accessible without covering page content.

Add correct bottom padding.

Respect:

* safe area,
* mobile browser bar,
* orientation changes.

---

# 37. CALL ACTION

Call is allowed only after authorised reveal state.

Before reveal:

do not put full number into:

* DOM,
* hydration payload,
* hidden button,
* tel href.

---

# 38. MESSAGE ACTION

Message must open the exact Thread Detail for this Lead.

Do not create a new thread every time.

Use idempotent create-or-get relationship.

---

# 39. SCREEN 1 CURRENT IMPLEMENTATION RECONCILIATION

The current Lead Detail architecture uses generic stacked Cards for:

* Lead,
* Contact,
* Site Visit,
* Messages,
* Follow-ups,
* Notes,
* Timeline.

This is not Batch 9 design.

Required changes:

* rebuild as standalone detailed Lead page,
* add exact Tabs,
* create complete Timeline presentation,
* move Note creation to Batch 9 sheet/modal,
* move Reminder creation to Scheduler modal,
* use separate Message Thread route,
* use separate Site Visit workflow,
* add Documents tab,
* add Related Property tab,
* use exact mobile layout.

---

# 40. SCREEN 2 — ADD / EDIT NOTE

Mobile:

bottom sheet.

The same business behavior should have an appropriate desktop modal/popover according to source/shared overlay architecture.

Reference heading:

`Add note`

Control:

`Pin this note`

Helper:

`Pinned notes stay at the top of the lead`

Action:

`Save note`

---

# 41. NOTE TEXT FIELD

Use the exact placeholder/content behavior from design.

Reference placeholder example:

`e.g. Prefers east-facing, weekday evening visits…`

Requirements:

* non-empty,
* trim whitespace,
* safe maximum,
* server validation.

---

# 42. PIN NOTE

Pin is a real boolean field.

Do not implement only visual sorting.

Required:

* persist Pin,
* pinned Notes sort first,
* unpin possible through Edit.

---

# 43. ADD NOTE

Save must:

1. authenticate,
2. validate Lead participation/authorisation,
3. validate Note,
4. persist Note,
5. persist pin state,
6. log CRM event where appropriate,
7. refresh Notes count/list.

---

# 44. EDIT NOTE

The source heading says:

`Add/Edit note`

Therefore Edit must exist.

Only authorised Note editor may update.

At minimum:

* Note author,
* or authorised role according to product rule.

Do not allow one participant to edit another participant's private Note.

---

# 45. EDIT NOTE HISTORY

For CRM trust, consider preserving:

* updated timestamp,
* edit history/audit where product architecture requires it.

Do not silently attribute edited Note to another user.

---

# 46. NOTE CURRENT BACKEND GAP

Current Note action supports create but current discovered structure does not provide:

* pin state,
* Edit action,
* pinned sorting.

Batch 9 requires those.

Extend schema/actions/UI.

---

# 47. SCREEN 3 — FOLLOW-UP REMINDER SCHEDULER

Reference heading:

`Set follow-up reminder`

Fields:

### Date

`Sat, 5 Jul`

### Time

`10:00 AM`

Quick actions:

* Tomorrow
* In 3 days
* Next week

Section:

`Remind me via`

Options:

* In-app reminder
* Push notification

Actions:

* Cancel
* Save reminder

---

# 48. FOLLOW-UP SCHEDULER RULE

Do not use the current generic:

* Follow-up title input,
* raw datetime-local field,
* Add button

as final Batch 9 UI.

Use the exact Scheduler interaction.

---

# 49. DATE VALIDATION

The server must validate:

* parseable date,
* valid timezone,
* future time.

Do not accept arbitrary unvalidated `dueAt`.

---

# 50. TIMEZONE

Quick selections use the current user's local timezone.

Example:

Tomorrow
→ next calendar day.

Do not add exactly 24 hours if DST/timezone logic would cause errors in supported regions.

For MGP primary use:

correct Asia/Kolkata behavior where user/profile timezone is India.

---

# 51. QUICK ACTION — TOMORROW

Sets the next calendar date while preserving/defaulting the intended time according to UX.

---

# 52. QUICK ACTION — IN 3 DAYS

Correctly handles:

* month end,
* year end.

---

# 53. QUICK ACTION — NEXT WEEK

Define consistently.

Do not create random seven-day vs next-Monday ambiguity.

Use the product behavior and label consistently.

---

# 54. REMINDER CHANNELS

Options:

* In-app reminder
* Push notification

The selection must persist.

---

# 55. IN-APP REMINDER

In-app reminder requires:

* scheduled processing,
* Notification record at due time,
* idempotent delivery.

Do not create Notification immediately and pretend it is scheduled.

---

# 56. PUSH NOTIFICATION

Push only works when Push provider is configured and user permission/token exists.

If unavailable:

* keep honest provider state,
* do not report push delivered.

Record missing Push provider requirements in the separate Provider setup file.

---

# 57. REMINDER SAVED CHIP

Reference result:

`MP`

`Meera Purohit`

`Follow up Sat 10 AM`

The Lead card must show the real next pending Follow-up.

Do not hard-code.

---

# 58. MULTIPLE REMINDERS

Define behavior if multiple pending Follow-ups exist.

The card should show the nearest relevant pending Follow-up according to product rule.

Do not randomly select record order.

---

# 59. FOLLOW-UP COMPLETION

Existing complete behavior may be reused.

When Follow-up completes:

* persist,
* create timeline event,
* update next reminder chip.

---

# 60. FOLLOW-UP CURRENT BACKEND RECONCILIATION

Current Follow-up action must be improved to:

* validate date,
* reject past date,
* support reminder channel selection,
* support scheduled delivery,
* use Scheduler design.

---

# 61. SCREEN 4 — STATUS CHANGE TO CLOSED / LOST

Reference Pipeline dropdown:

* New
* Contacted
* Site Visit
* Negotiation
* Closed / Lost

When selecting terminal status:

`Move to Closed / Lost?`

Explanation:

`This removes Meera from your active pipeline. A reason is required.`

---

# 62. REQUIRED CLOSED / LOST REASONS

Exact options:

* Closed — deal done
* Lost — budget mismatch
* Lost — chose another property
* Lost — unresponsive
* Other…

Actions:

* Cancel
* Confirm

---

# 63. TERMINAL STATUS MODEL

The backend must preserve outcome distinction.

Do not map every option to one generic:

`closed`.

At minimum store:

* terminal outcome,
* reason code,
* optional Other text,
* changed time,
* changed by.

---

# 64. CLOSED — DEAL DONE

Maps to successful conversion/closed outcome according to final CRM model.

Do not label successful transaction as Lost.

---

# 65. LOST — BUDGET MISMATCH

Persist structured reason.

---

# 66. LOST — CHOSE ANOTHER PROPERTY

Persist structured reason.

---

# 67. LOST — UNRESPONSIVE

Persist structured reason.

---

# 68. OTHER REASON

When `Other…` selected:

require safe free-text reason.

Do not allow empty Other.

---

# 69. STATUS TRANSITION AUTHORITY

Only authorised receiver/CRM professional may change pipeline stage.

Lead requester cannot move themselves to Closed.

---

# 70. TERMINAL REASON REQUIRED SERVER-SIDE

Do not enforce only in modal.

Direct server call:

Closed/Lost without reason

must fail.

---

# 71. ACTIVE PIPELINE REMOVAL

After terminal transition:

* remove Lead from Active/Kanban active columns,
* preserve in history,
* preserve Messages,
* preserve Site Visits,
* preserve Proposal relationships.

Do not hard-delete Lead.

---

# 72. TIMELINE EVENT

Terminal change creates real timeline event containing safe reason metadata.

---

# 73. CURRENT STATUS ACTION RECONCILIATION

Current stage update accepts stage strings directly.

Batch 9 requires:

* terminal confirmation,
* mandatory reason,
* structured outcome metadata.

Repair server API.

---

# 74. SCREEN 5 — DUPLICATE LEAD DETECTION

Reference inline banner:

`This may be a duplicate of Lead #1234`

Supporting text:

`Same phone number · "Meera P." enquired on 2 BHK, Iscon Platinum on 14 Jun.`

Actions:

* View #1234
* Merge…
* Dismiss

---

# 75. DUPLICATE DETECTION CRITERIA

The reference uses:

same phone number.

Other approved safe criteria may supplement matching, such as:

* normalised phone,
* same requester identity.

Do not use unreliable name-only match as automatic merge authority.

---

# 76. PHONE NORMALISATION

Duplicate detection must normalise:

* +91 format,
* spaces,
* dashes,
* leading country code.

Do not compare only raw formatted strings.

---

# 77. DUPLICATE WARNING

A possible duplicate is a warning, not automatic merge.

Do not silently merge Leads.

---

# 78. VIEW DUPLICATE

`View #1234`

opens the candidate Lead in correct authorised context.

A user cannot view a candidate Lead they are not authorised to access.

---

# 79. DISMISS DUPLICATE

Dismiss must persist for the current user/Lead pair.

Do not show the same dismissed banner on every refresh.

---

# 80. MERGE CONFIRMATION

The source states:

`Merge opens a confirmation dialog explaining both timelines combine and the newer lead closes.`

Required confirmation must clearly identify:

* primary Lead,
* duplicate Lead,
* merge effect.

---

# 81. MERGE RULE

After Merge:

* one Lead remains primary,
* newer duplicate closes/archives according to design,
* both timeline histories become visible in combined Lead history,
* Notes remain attributed,
* Messages remain accessible,
* Site Visits remain linked/visible,
* Proposal links preserved,
* Follow-ups reconciled.

Do not destroy historical relationships.

---

# 82. MERGE ARCHITECTURE

Recommended model:

* duplicate_of_lead_id,
* merged_into_lead_id,
* merge event,
* safe canonical Lead relation.

Do not physically rewrite every foreign key blindly without transaction design.

---

# 83. MERGE TRANSACTION

Merge is multi-record and must be transactionally safe.

Do not leave:

* duplicate marked merged,
* but timeline not connected,
* or Messages orphaned.

---

# 84. MERGE AUDIT

Record:

* actor,
* source Lead,
* destination Lead,
* timestamp.

---

# 85. DUPLICATE DETECTION PERFORMANCE

Do not scan all Lead rows in client.

Use indexed normalised phone or appropriate lookup.

---

# 86. SCREEN 6 — CONTACT REVEAL FLOW

Batch 9 Contact Reveal is exactly three steps.

Critical rule:

**Numbers remain masked until explicit Reveal.**

**Copy happens only when the Copy button is tapped.**

---

# 87. CONTACT REVEAL DIRECTION

Batch 9 Screen 6 appears in professional Lead context:

the professional reveals the Lead's contact number.

This is distinct from the public Listing contact flow where a requester may request an Owner's number.

Do not reuse opposite-direction semantics incorrectly.

The final model must distinguish:

### Listing contact reveal

Requester wants listing-side contact.

### CRM Lead contact reveal

Receiver/professional wants Lead/requester contact.

These are different operations.

---

# 88. STEP A — MASKED

Reference:

`MP`

`Meera Purohit`

`+91 98••• •••10`

Action:

`Reveal Number`

The full number must not be present before reveal.

---

# 89. MASKING RULE

Mask server-side.

Do not send:

`+91 98988 45210`

to Browser and render masked text with CSS.

---

# 90. REVEAL ACTION

Tapping Reveal opens the consent notice.

It must not immediately copy.

It must not silently reveal on hover.

---

# 91. STEP B — CONSENT NOTICE

Reference:

`Reveal Meera's number?`

Explanation:

`Revealing this number will notify Meera that you can now see it. Uses 1 of your 20 monthly reveals.`

Actions:

* Cancel
* Reveal

---

# 92. REVEAL QUOTA

Reference:

`1 of your 20 monthly reveals`

This must use real plan/quota data.

Required:

* Plan limit,
* current period usage,
* atomic usage increment,
* no double charge on retry,
* already-revealed number does not consume again.

---

# 93. QUOTA CONCURRENCY

Do not:

read usage
→ compare
→ increment

without concurrency safety.

Use transaction/RPC or unique usage event.

---

# 94. REVEAL IDEMPOTENCY

Repeated request for same already-revealed Lead must:

* return same revealed state,
* not consume quota again,
* not generate duplicate notification.

---

# 95. REVEAL NOTIFICATION

The design explicitly says:

the Lead is notified that professional can see their number.

Create real Notification.

Do not fake it.

---

# 96. CONTACT CONSENT AND PRIVACY

The Lead phone must come from the authorised Lead contact snapshot/consent model.

Do not automatically expose unrelated profile mobile.

Where Lead submitted:

* profile number,
* alternate number,

reveal the actual authorised Lead contact snapshot.

---

# 97. STEP C — REVEALED

Reference:

`MP`

`Meera Purohit`

`+91 98988 45210`

Actions:

* Call
* Copy
* WhatsApp

---

# 98. CALL

Use:

`tel:` action

only after reveal.

---

# 99. COPY

Copy occurs only after explicit Copy button tap.

Required:

* Clipboard API,
* fallback where needed,
* success feedback.

Never auto-copy when reveal completes.

---

# 100. WHATSAPP

WhatsApp action must use the approved provider mode.

If free native flow:

use correct `wa.me` intent where product configuration says so.

If API mode:

use configured WhatsApp provider.

Do not expose a broken button.

---

# 101. WHATSAPP NUMBER SAFETY

Build WhatsApp URL from the authorised revealed number only.

Do not expose full number before reveal through a hidden WhatsApp href.

---

# 102. CONTACT REVEAL CURRENT REPOSITORY RECONCILIATION

Current contact-request infrastructure handles requester-to-listing-side contact reveal.

Batch 9 requires professional-side Lead contact reveal with:

* masked Lead phone,
* explicit consent notice,
* monthly reveal quota,
* quota accounting,
* Lead notification,
* Call,
* Copy,
* WhatsApp.

Do not treat the current opposite-direction action as sufficient.

---

# 103. SCREEN 7 — PROPOSAL FULL DETAIL

Reference:

`Proposal #P-0192`

Status:

`Shortlisted`

Context:

`To Kartik Trivedi's requirement · sent 1 Jul, 3:40 PM`

Action:

`Withdraw proposal…`

---

# 104. PROPOSAL DISPLAY ID

Use actual safe display ID.

Do not hard-code:

`P-0192`.

---

# 105. REQUIREMENT RECAP

Reference heading:

`REQUIREMENT RECAP`

Content:

`Buy: commercial shop, Yogi Chowk area`

`₹40L–₹60L · ground floor preferred · possession ready`

`Posted by Kartik T. · 28 Jun`

Use actual Requirement data.

---

# 106. REQUESTER SAFE IDENTITY

Display only safe identity according to Proposal relationship and privacy rules.

Do not expose private contact data through Requirement recap.

---

# 107. PROPOSED LISTING

Reference heading:

`PROPOSED LISTING`

Reference:

`₹48 L`

`Shop, Yogi Chowk · 420 sq ft · ground floor`

This must be an actual Proposal-linked listing.

---

# 108. PROPOSAL LISTING RELATIONSHIP

The Proposal must persist:

* Property ID,

or

* Project ID,

according to Proposal type.

Do not store proposed listing only inside message text.

---

# 109. PROPOSAL STATUS SECTION

Reference:

`STATUS`

Stages:

* Sent · 1 Jul
* Viewed · 1 Jul
* Shortlisted · 2 Jul
* Accepted / Rejected

---

# 110. STATUS TIMESTAMP PERSISTENCE

Current status alone is insufficient.

Persist or derive from immutable CRM Proposal events:

* Sent time,
* Viewed time,
* Shortlisted time,
* Accepted/Rejected time.

Do not fabricate timestamps from `updated_at`.

---

# 111. PROPOSAL VIEWED EVENT

Viewing Proposal by recipient should create the Viewed transition once.

Do not repeatedly generate duplicate Viewed events on every render.

---

# 112. EMBEDDED CONVERSATION

Heading:

`Conversation with Kartik`

Reference messages:

Sender:

`Namaste Kartik bhai — this ground-floor shop at Yogi Chowk fits your budget. Main-road facing.`

`1 Jul, 3:40 PM ✓✓`

Recipient:

`Looks good. Is the shutter width at least 12 ft?`

`2 Jul, 9:15 AM`

The conversation must use the real Message Thread connected to the Proposal/Lead.

---

# 113. PROPOSAL THREAD RELATIONSHIP

Use one consistent conversation anchor.

Proposal must connect to:

* Lead,
* Message Thread.

Avoid creating:

* one Lead thread,
* another Proposal thread,
* duplicate conversations between same Proposal participants

without defined reason.

---

# 114. READ RECEIPT

`✓✓`

must correspond to actual read state.

Do not show read receipt from sender-side timestamp only.

---

# 115. WITHDRAW PROPOSAL

Reference confirmation:

`Kartik will be notified; this can't be undone`

Withdraw must:

* verify proposer,
* verify state allows withdrawal,
* show confirmation,
* persist Withdrawn,
* create status event,
* notify recipient,
* keep history.

Do not delete Proposal.

---

# 116. WITHDRAW IDEMPOTENCY

Repeated click/request must not create multiple notifications or corrupt status.

---

# 117. PROPOSAL MOBILE

The source explicitly says:

Mobile:

same content stacked full-width under contextual header with back button.

Do not use horizontal desktop panels on mobile.

---

# 118. CURRENT PROPOSAL RECONCILIATION

Current Proposal foundation includes states but Batch 9 requires full detail behavior:

* actual proposed listing relationship,
* Requirement recap,
* status timestamps,
* embedded thread,
* safe Withdraw confirmation.

Ensure Send Proposal actions from Batch 7/8 populate the fields needed here.

---

# 119. SCREEN 8 — MESSAGE THREAD LIST

Mobile-first screen.

Heading:

`Messages`

Search placeholder:

`Search name or property…`

Filters:

* All
* Unread — count `2`
* Archived

---

# 120. MESSAGE SEARCH

Search must query/filter real:

* participant safe name,
* related Property/Project title.

Do not search only loaded first-page rows if server pagination is used.

---

# 121. SEARCH PERFORMANCE

Use:

* indexed query,
* server filter,
* bounded result.

Do not download every thread to Browser to search.

---

# 122. ALL FILTER

Shows non-archived threads according to product definition.

---

# 123. UNREAD FILTER

Shows Threads with actual unread messages for current participant.

Count must be real.

---

# 124. ARCHIVED FILTER

Shows Threads archived by the current user.

Archive must be participant-specific.

One participant archiving must not archive it for the other participant.

---

# 125. THREAD CARD 1

Reference:

Initial:

`MP`

Name:

`Meera Purohit`

Time:

`9:51 AM`

Preview:

`Is covered parking included?`

Unread badge:

`1`

Use actual data.

---

# 126. THREAD CARD 2

Reference:

`KT`

`Kartik Trivedi`

`Yesterday`

Preview:

`You: Shutter width is 14 ft, confirmed.`

Sender prefix:

`You:`

must reflect actual sender.

---

# 127. SWIPE-LEFT ARCHIVE

Source:

`↑ swipe-left reveals Archive action`

On mobile:

* horizontal swipe reveals Archive,
* normal tap opens Thread,
* accidental slight movement does not archive,
* Archive action persists.

---

# 128. ARCHIVE CONFIRMATION

Use exact source behavior.

If design does not require confirmation for Archive:

do not add destructive confirmation unnecessarily.

Archive is reversible through Archived tab.

---

# 129. THREAD LIST PAGINATION

Do not return all Threads forever.

Use pagination/cursor.

---

# 130. THREAD LIST N+1 BLOCKER

Current thread list architecture performs per-thread lookups for:

* unread count,
* last Message,
* counterpart profile.

Batch 9 implementation must remove this N+1 architecture.

Use:

* database view,
* RPC,
* batched queries,
* aggregate join.

---

# 131. SCREEN 9 — FULL-FEATURED MESSAGE THREAD

Mobile reference header:

`MP`

`Meera Purohit`

Context:

`3 BHK, Silver Heights`

Overflow actions:

* View Lead
* Archive
* Report Thread

---

# 132. THREAD DETAIL ROUTE

Messages require a dedicated Thread Detail route.

Do not make every Thread card navigate to Lead Detail as the final behavior.

Required relationship:

Messages list
→ Thread Detail.

Thread Detail may link:

→ View Lead.

---

# 133. VIEW LEAD

Must open exact linked Lead.

No hard-coded ID.

If Thread has no Lead:

handle honestly.

---

# 134. ARCHIVE FROM THREAD

Archive the Thread for current participant.

After Archive:

* return appropriately,
* Thread remains accessible in Archived,
* other participant unaffected.

---

# 135. REPORT THREAD

Opens Screen 10 Report Conversation.

---

# 136. SAFETY BANNER

Exact text:

`Never share OTP or advance payment details in chat.`

The source explicitly says:

**Safety banner is persistent — no dismiss control.**

Do not add X/Close.

---

# 137. MESSAGE DATE DIVIDERS

Reference:

* Yesterday
* Today

Group actual Messages by local date.

Do not group using raw UTC boundary.

---

# 138. TEXT MESSAGE

Reference:

`Can you share the floor plan?`

`4:12 PM`

Render actual Message.

---

# 139. PDF ATTACHMENT

Reference:

`floor-plan-A-1204.pdf`

`840 KB`

Timestamp/read state:

`4:15 PM ✓✓`

The attachment must be real.

---

# 140. PDF ATTACHMENT DATA MODEL

Messages need attachment support.

At minimum store:

* Message ID,
* media/file ID,
* file name,
* MIME type,
* size,
* attachment type.

Do not encode attachment as plain Message body.

---

# 141. PDF ATTACHMENT SECURITY

Only authorised Thread participants may access private attachment.

Use secure URL generation where appropriate.

---

# 142. IMAGE ATTACHMENT

Reference:

`Our current kitchen — want similar layout`

with image thumbnail.

Message Thread must support:

* image attachment,
* preview,
* opening full media where appropriate.

---

# 143. IMAGE UPLOAD

Validate:

* MIME,
* size,
* upload result.

Do not show thumbnail until actual file is persisted.

---

# 144. TYPING INDICATOR

The design includes three-dot typing indicator.

Do not fake permanent typing.

A real typing state requires:

* realtime presence/event,
* expiring state,
* sender/recipient context.

If realtime provider is unavailable:

do not show fake typing indicator.

Record setup dependency if needed.

---

# 145. MESSAGE INPUT

Placeholder:

`Type a message…`

Controls:

* Attachment
* Send

Input bar must sit above:

* mobile keyboard,
* safe area.

---

# 146. SEND MESSAGE

Required:

* non-empty text or attachment,
* participant check,
* blocked Thread check,
* duplicate-submit prevention,
* real persistence,
* notification,
* update Thread last message.

---

# 147. OPTIMISTIC MESSAGE STATE

If using optimistic UI:

* rollback or failure state required,
* do not display permanent Sent if server insert failed.

---

# 148. MESSAGE STATUS

Supported state may include:

* Sent,
* Delivered,
* Read,
* Failed.

Do not display Read without actual read state.

---

# 149. MESSAGE PAGINATION

Large Threads need reverse/incremental pagination.

Do not fetch lifetime first 50 and silently make older Messages unreachable.

---

# 150. MESSAGE REALTIME

If realtime active:

* subscribe only to authorised Thread,
* unsubscribe on route exit.

If unavailable:

* honest polling/refresh.

No fake typing/read updates.

---

# 151. CURRENT MESSAGE RECONCILIATION

Current message foundation must be expanded for Batch 9:

* dedicated Thread route,
* search,
* All/Unread/Archived filters,
* per-participant Archive,
* swipe action,
* contextual Lead/Property header,
* safety banner,
* attachment model,
* image/PDF attachments,
* typing state,
* Report Thread,
* N+1 elimination.

---

# 152. SCREEN 10 — REPORT CONVERSATION

Desktop:

centered modal.

Mobile:

bottom sheet.

Reference heading:

`Report this conversation`

---

# 153. REPORT REASONS

Exact visible options:

* Asking for advance payment
* Spam or promotion
* Abusive language
* Suspected fraud
* Other

Do not replace with listing-specific categories.

Map to safe backend enums.

Example mapping:

* advance payment → payment_abuse
* spam/promotion → spam
* abusive language → abuse or harassment
* suspected fraud → fraud
* other → other

---

# 154. DETAILS

Label:

`Details`

Reference placeholder:

`What happened? (optional but helps our review)`

Safe maximum required.

Sanitize.

---

# 155. REPORT PRIVACY COPY

Exact behavior:

`The other person isn't notified. Our team reviews reports within 24 hours; the thread stays visible to you.`

Implementation must match:

* do not notify reported participant,
* do not automatically hide Thread from reporter,
* create moderation record.

If 24-hour review promise is retained, operational process must support that product promise.

---

# 156. THREAD REPORT TARGET

Batch 9 requires target type:

`thread`

The current generic report action must support:

* Thread report target validation.

Do not restrict report target only to listing/profile entities.

---

# 157. REPORT TARGET VALIDATION

Server must verify:

* Thread exists,
* reporter is a Thread participant.

Do not allow reporting arbitrary Thread ID.

---

# 158. REPORT MODERATION QUEUE

Successful report creates real pending report row.

Admin reporting flow in later Batch must be able to view it in conversation context.

---

# 159. DUPLICATE REPORT PROTECTION

The source explicitly requires:

Submit disables with spinner on tap.

Use:

### Client

immediate disable.

### Server

duplicate pending report prevention/idempotency.

---

# 160. THREAD REPORT RATE LIMIT

Apply safe rate limiting.

Do not allow one user to create unlimited reports.

---

# 161. REPORT SUCCESS

Only show success after persistence.

Do not archive Thread automatically.

---

# 162. CURRENT REPORT RECONCILIATION

Current generic reporting architecture must be extended because discovered report action excludes Thread target.

Batch 9 requires:

* Thread target,
* Batch 9 exact reason mapping,
* participant validation,
* moderation queue context,
* duplicate protection.

---

# 163. SCREENS 11–15 — COMPLETE SITE VISIT LIFECYCLE

Batch 9 defines Site Visits as a complete lifecycle:

1. Request
2. Respond
3. Reminder
4. Feedback
5. Dispute

Do not implement only:

Request
→ Accept/Reject.

---

# 164. SITE VISIT LIFECYCLE MODEL

The Site Visit system must support sufficient states for:

* Requested,
* Accepted/Scheduled,
* Reschedule proposed/Rescheduled,
* Cancelled,
* Rejected,
* Completed,
* No Show,
* Disputed,
* Resolved outcome where later support/admin flow requires it.

The exact public labels must follow design.

---

# 165. SCREEN 11 — SITE VISIT REQUEST FORM

Reference context:

`Scheduling with Meera Purohit · 3 BHK, Silver Heights`

Fields:

### Date

`Sat, 5 Jul`

### Time

`11:00 AM`

### Notes for visitor

Placeholder:

`e.g. Meet at the society gate; ask for tower B`

Submitting state:

`Requesting…`

Source note:

`Button disables on tap — duplicate-submit protected.`

---

# 166. SITE VISIT REQUEST DIRECTION

The form is opened from Lead context.

Authorisation must validate the requesting participant.

Do not permit unrelated profile to schedule.

---

# 167. DATE REQUIRED

The Site Visit Request must persist actual requested date/time.

Current behavior that creates a requested Visit with no scheduled date/time is insufficient for Batch 9.

---

# 168. REQUEST DATE VALIDATION

Server must validate:

* parseable,
* future,
* timezone correct,
* reasonable scheduling horizon where product rules define it.

---

# 169. REQUEST NOTES

Persist safe Note:

maximum length.

Do not expose internal CRM Notes as visitor Note.

---

# 170. REQUEST DUPLICATE PROTECTION

Prevent double-click duplicate Visit.

Use:

* disabled submitting button,
* server duplicate/idempotency rule.

Define duplicate window for same:

* Lead,
* proposed time,
* active Visit state.

---

# 171. REQUEST SUCCESS

After success:

* Site Visit exists,
* Host Notification exists,
* Lead/CRM timeline event exists,
* appropriate Lead stage/status updated.

No partial success.

---

# 172. REQUEST TRANSACTION SAFETY

Current multi-write flow:

Visit insert

* Lead status
* CRM event
* Notification

must be made resilient.

Do not report success if required core state is inconsistent.

Use transaction/RPC or idempotent orchestration.

---

# 173. SCREEN 12 — ACCEPT / REJECT / RESCHEDULE

Primary actions:

* Accept
* Reschedule
* Reject

---

# 174. ACCEPT

Accept must:

* verify Host/authorised party,
* persist accepted/scheduled state,
* preserve requested time,
* notify requester,
* log CRM event.

---

# 175. RESCHEDULE

Reference section:

`Reschedule — propose a new slot`

Fields:

`Sun, 6 Jul`

`5:30 PM`

Action:

`Send new time`

---

# 176. RESCHEDULE SEMANTICS

Reschedule is a proposal of a new time.

The state model must clarify whether the other participant must confirm.

Do not silently overwrite a confirmed schedule if design expects proposal/response.

At minimum preserve:

* old time,
* proposed new time,
* proposer,
* timestamp.

---

# 177. RESCHEDULE VALIDATION

New slot must be:

* valid,
* future,
* different where appropriate.

---

# 178. RESCHEDULE NOTIFICATION

Notify the other participant.

---

# 179. REJECT

Reference section:

`Reject — reason required`

Options:

* Unavailable at that time
* No longer interested
* Other

Action:

`Confirm reject`

---

# 180. REJECT REASON SERVER REQUIREMENT

Reject reason is mandatory.

Do not allow:

respondSiteVisit(id, "reject")

without reason as final API.

---

# 181. OTHER REJECT REASON

If Other selected:

require free text.

---

# 182. REJECT LEAD STATUS CONSISTENCY

Do not incorrectly reset Lead to:

`site_visit_requested`

after rejection.

The current discovered implementation requires reconciliation here.

Use coherent Lead status/stage after rejected Visit.

Possible state should reflect:

* Lead remains active at prior stage,
* or Visit rejected event while Lead stays in CRM.

Do not imply Visit still requested after rejection.

---

# 183. REJECT NOTIFICATION TYPE

Use a specific correct Notification type.

Do not reuse:

`site_visit_requested`

for rejected state.

Add appropriate notification/event type.

---

# 184. SCREEN 13 — REMINDER NOTIFICATION CARD

Reference:

`Site visit tomorrow at 4 PM for 3 BHK, Silver Heights`

`With Hetal Joshi · Kalawad Road`

Actions:

* Confirm
* Cancel…

Unread indicator shown.

---

# 185. REMINDER GENERATION

Reminder must be generated by actual scheduled processing.

Do not hard-code notification card.

---

# 186. REMINDER TIMING

Use Visit timezone.

Generate at the defined reminder interval.

The source uses:

tomorrow reminder context.

Implement approved schedule.

---

# 187. CONFIRM FROM REMINDER

Confirm action must:

* persist confirmation state where model requires it,
* mark reminder action appropriately,
* avoid duplicate notification.

---

# 188. CANCEL FROM REMINDER

`Cancel…`

opens the correct cancellation flow.

Do not immediately cancel without required reason if product flow requires reason.

---

# 189. REMINDER PROVIDER

The reminder card is in bell/Notification Center.

In-app must work independently of external Push.

External Push provider, if missing, must not be faked.

---

# 190. SCREEN 14 — POST-VISIT FEEDBACK

Reference:

`How did the visit go?`

Context:

`Sat 5 Jul · Meera Purohit · 3 BHK, Silver Heights`

Options:

* Interested
* Not interested
* Follow-up

Optional Note:

`Optional notes — e.g. liked the layout, wants price talk`

Action:

`Save feedback`

---

# 191. FEEDBACK ELIGIBILITY

Feedback appears only after a Visit is eligible for post-Visit outcome.

Do not show before Visit time.

Do not allow arbitrary user to submit.

---

# 192. FEEDBACK OUTCOME

Persist structured outcome:

* interested,
* not_interested,
* follow_up.

Do not store only free text.

---

# 193. FEEDBACK NOTE

Optional.

Safe length.

Private CRM visibility according to final product rules.

---

# 194. FEEDBACK EFFECT ON CRM

Define intentional CRM effect.

Examples:

Interested
→ may move to Negotiation or Interested stage according to product rule.

Not Interested
→ may prompt Lost reason, but should not silently close without clear product behavior.

Follow-up
→ may create/suggest Follow-up.

Do not make hidden automatic transitions that contradict UI.

---

# 195. FEEDBACK TIMELINE EVENT

Saving feedback creates real timeline event.

---

# 196. ONE OR MULTIPLE FEEDBACK RECORDS

Define update behavior.

A participant should not create unlimited conflicting feedback rows by repeated clicks.

Use:

* one current feedback per participant per Visit,
* update with audit/history where needed.

---

# 197. SCREEN 15 — DISPUTE STATE

Reference date tile:

`28`

`JUN`

Visit:

`Visit — Sunita Bhatt`

Badge:

`Disputed`

Property/time:

`2 BHK, Mavdi · 5:00 PM`

---

# 198. CONFLICTING REPORTS CARD

Reference heading:

`Conflicting reports`

Reference body:

`You marked this visit "completed"; Sunita reported "visit didn't happen". The visit is frozen from both timelines while our team reviews.`

Action:

`Contact support about this visit`

---

# 199. DISPUTE CREATION

A dispute can arise when participant Visit outcome reports conflict.

Example:

Host:

Completed.

Requester:

Visit did not happen.

The system must create:

* Dispute record,
* Disputed state,
* moderation/support review task.

---

# 200. DISPUTE FREEZE

The source explicitly states:

**The Visit is frozen from both timelines while our team reviews.**

This means:

* no self-service outcome changes,
* no repeated feedback overwrite,
* no cancellation,
* no completion toggle,
* no reschedule.

Server enforcement required.

---

# 201. NO SELF-SERVE RESOLUTION

The source explicitly says:

`Rare state — no self-serve resolution actions; support resolves and both parties are notified.`

Do not add:

* Resolve button,
* Mark Completed again,
* Delete dispute.

---

# 202. CONTACT SUPPORT

Action opens Support with:

* Visit ID prelinked,
* dispute context,
* category appropriate to Site Visit dispute.

Do not open generic blank support form if context can be preserved.

---

# 203. DISPUTE STAFF FLOW DEPENDENCY

Later Admin/Support Batch must be able to:

* inspect both reports,
* inspect timeline,
* resolve,
* record reason,
* notify both participants.

Batch 9 user screen must reflect final result after resolution.

---

# 204. SITE VISIT CURRENT DATA MODEL RECONCILIATION

Current discovered Site Visit type lacks explicit fields for:

* requested date/time separation,
* reject reason,
* feedback,
* participant outcome reports,
* dispute state.

Extend schema safely.

---

# 205. SITE VISIT CURRENT ACTION RECONCILIATION

Current request action creates Site Visit without required requested date/time.

Batch 9 requires:

* Date,
* Time,
* Notes.

Repair action signature and validation.

---

# 206. CURRENT RESCHEDULE RECONCILIATION

Current Reschedule accepts raw date string.

Batch 9 requires:

* server date parsing,
* future check,
* timezone,
* clear proposed slot semantics.

---

# 207. CURRENT REJECT RECONCILIATION

Current reject action does not require reason.

Batch 9 requires mandatory reason.

Repair API and UI.

---

# 208. CURRENT REMINDER GAP

Current Notification system must be extended for real Site Visit reminder events.

Add scheduled processing.

---

# 209. CURRENT FEEDBACK GAP

Implement:

* Site Visit feedback records,
* outcome,
* Note,
* timeline integration.

---

# 210. CURRENT DISPUTE GAP

Implement:

* conflicting participant outcome model,
* dispute creation,
* freeze enforcement,
* Support/Admin review dependency,
* resolution notification.

---

# 211. LEAD TIMELINE CROSS-ENTITY AGGREGATION

Lead Full Timeline should not only query:

`crm_events where entity_type = lead`.

Batch 9 expects all touchpoints.

The current event query must be expanded or architecture unified.

Need include relevant events from:

* Lead,
* Contact Reveal,
* Messages,
* Proposal,
* Site Visit,
* Feedback,
* Merge.

---

# 212. UNIFIED TIMELINE ARCHITECTURE

Recommended approaches:

### Option A

Write all participant-visible events to one unified Lead event stream.

### Option B

Query related entity events and merge server-side.

Whichever is used:

* avoid N+1,
* stable ordering,
* safe metadata,
* pagination.

---

# 213. MESSAGE EVENT VOLUME

Do not add every Message body into CRM timeline if that makes timeline unbounded and noisy unless design/product requires it.

Batch 9 timeline example shows key Message touchpoint.

Use an intentional timeline event policy.

---

# 214. NOTES COUNT

Tab count must use actual visible Notes count for current user.

If private/shared visibility rules apply:

do not count inaccessible Notes.

---

# 215. DOCUMENTS COUNT

Count authorised documents only.

Do not show Documents count for inaccessible attachment.

---

# 216. CONTACT REVEAL EVENT

Timeline entry:

`Number revealed to you`

must be generated only after real Reveal.

Supporting copy:

`Meera was notified of the reveal`

must correspond to actual Notification creation.

---

# 217. PROPOSAL THREAD INTEGRITY

Proposal Detail embedded thread and Message Thread Detail must display the same underlying Messages.

Do not duplicate conversation content in:

* Proposal message table,
* Message thread table

without clear source.

---

# 218. MESSAGE ATTACHMENT INTEGRITY

Attachment metadata must remain consistent across:

* Thread Detail,
* Lead Documents tab,
* download action.

One uploaded PDF should not appear as three unrelated files.

---

# 219. ARCHIVE DATA MODEL

Message Thread archive must be participant-specific.

Recommended fields/table:

* thread_id,
* profile_id,
* archived_at.

Do not use one global `archived` boolean on Thread if both users can independently archive.

---

# 220. THREAD SEARCH DATA MODEL

For efficient Search:

return/search safe fields:

* counterpart display name,
* related entity title.

Do not expose private contact fields in search index.

---

# 221. TYPING STATE EXPIRY

Typing events must expire quickly.

Do not persist a permanent:

`is_typing = true`

state.

---

# 222. REPORT THREAD SNAPSHOT

For moderation review, Report should preserve enough safe context.

Do not allow reported user to delete all context and make Report unusable.

Use immutable/safe Message references or moderation snapshot according to product architecture.

---

# 223. MESSAGE MODERATION VISIBILITY

A reported Thread remains visible to reporter according to Batch 9 copy.

Moderation action later may:

* hide specific Message,
* restrict account,
* block Thread

according to admin rules.

Do not automatically hide on report submission.

---

# 224. REFERENCE DATA REQUIREMENT

Create persistent design/reference records through real database tables.

Do not hard-code sample UI.

Do not automatically delete reference data after verification.

---

# 225. REFERENCE LEAD

Create real Lead:

Display example:

`Lead #2471`

Requester:

`Meera Purohit`

Initials:

`MP`

Source:

listing page.

Target:

`3 BHK, Silver Heights`

State:

New.

Received time:

appropriate fixture timestamp.

---

# 226. REFERENCE TIMELINE DATA

Create actual events corresponding to source reference:

* Inquiry submitted,
* Number revealed,
* Message sent,
* Site Visit scheduled.

Do not create display-only static array.

---

# 227. REFERENCE NOTES

Create actual Notes:

Pinned:

`Prefers east-facing. Husband works near Satellite — weekday evening visits ok.`

Second:

`Budget flexible up to ₹95L for higher floor.`

Use real Note rows.

---

# 228. REFERENCE DOCUMENT

Create actual protected reference PDF metadata:

`floor-plan-A-1204.pdf`

Size:

actual file metadata close to reference where fixture file supports it.

Do not fake 840 KB if actual file differs.

---

# 229. DUPLICATE REFERENCE LEAD

Create an authorised candidate Lead:

Display:

`Lead #1234`

Identity:

`Meera P.`

Target:

`2 BHK, Iscon Platinum`

Use same normalised reference phone to exercise duplicate detection.

---

# 230. REFERENCE PROPOSAL

Create real Proposal:

Display:

`P-0192`

Status:

Shortlisted.

Requirement:

`Buy: commercial shop, Yogi Chowk area`

Budget:

₹40L–₹60L.

Property:

`Shop, Yogi Chowk`

Price:

₹48 L.

Area:

420 sq ft.

Floor:

ground floor.

---

# 231. REFERENCE PROPOSAL MESSAGES

Create real Message records for:

`Namaste Kartik bhai — this ground-floor shop at Yogi Chowk fits your budget. Main-road facing.`

and:

`Looks good. Is the shutter width at least 12 ft?`

Use actual Thread relation.

---

# 232. REFERENCE MESSAGE THREAD

Create:

Meera Thread.

Last Message:

`Is covered parking included?`

Unread count:

real unread Message state.

Create:

Kartik Thread.

Preview:

`You: Shutter width is 14 ft, confirmed.`

---

# 233. REFERENCE MESSAGE ATTACHMENTS

Create actual:

* PDF attachment,
* image attachment

through real attachment infrastructure.

---

# 234. REFERENCE SITE VISITS

Create valid test Visit scenarios:

1. Requested Visit
2. Reschedule scenario
3. Reminder scenario
4. Completed Visit awaiting Feedback
5. Disputed Visit.

Do not contaminate real production analytics.

---

# 235. REFERENCE DISPUTE

Create actual test dispute:

Host outcome:

Completed.

Requester outcome:

Visit did not happen.

Final state:

Disputed.

Use real support/moderation fixture context.

---

# 236. REFERENCE DATA NON-DELETION

The user explicitly requires reference data to remain after verification.

Do not automatically clean:

* Leads,
* Notes,
* Follow-ups,
* Messages,
* attachments,
* Proposals,
* Site Visits,
* Dispute fixtures.

Keep fixture financial/provider effects separated from production.

---

# 237. SECURITY — LEAD PARTICIPANT ACCESS

Lead Full Detail may be viewed only by authorised Lead participants and valid role/team assignees where later Team permission model applies.

No ID enumeration.

---

# 238. SECURITY — NOTE ACCESS

Do not expose private Note to unauthorised participant.

---

# 239. SECURITY — DOCUMENT ACCESS

Documents require Lead/Thread authorisation.

---

# 240. SECURITY — CONTACT PHONE

Full Lead phone is not returned before Reveal.

---

# 241. SECURITY — PROPOSAL ACCESS

Only Proposal participants and authorised assigned Team users may access Proposal Detail.

---

# 242. SECURITY — THREAD ACCESS

Only Thread participants and authorised moderation staff through separate Admin flow.

---

# 243. SECURITY — SITE VISIT ACCESS

Only Visit participants, authorised assigned Agent, and authorised staff.

---

# 244. RLS VERIFICATION — LEAD

Test:

* participant read,
* non-participant deny,
* receiver status update,
* requester denied status update.

---

# 245. RLS VERIFICATION — NOTES

Test:

* own Note create,
* own Note edit,
* unauthorised Note edit denied,
* private visibility.

---

# 246. RLS VERIFICATION — FOLLOW-UP

Follow-up belongs to authorised profile and Lead.

Test cross-user update denial.

---

# 247. RLS VERIFICATION — CONTACT REVEAL

Professional reveal only for Lead they are authorised to handle.

Quota cannot be bypassed through direct call.

---

# 248. RLS VERIFICATION — PROPOSAL

Participant access only.

Withdraw only proposer.

Status transitions according to role.

---

# 249. RLS VERIFICATION — MESSAGES

Participant only.

Archived state per participant.

Attachment access participant only.

---

# 250. RLS VERIFICATION — SITE VISITS

Test:

* Requester action,
* Host response,
* Participant reschedule,
* Feedback participant,
* Dispute freeze,
* unauthorised mutation denied.

---

# 251. TRANSACTION REQUIREMENTS

Critical multi-write flows must be transactionally safe or idempotently recoverable.

Includes:

* Contact Reveal + quota + Notification + timeline,
* Lead Merge,
* Proposal Withdraw + event + Notification,
* Site Visit Request + Lead update + event + Notification,
* Visit Accept/Reject/Reschedule,
* Feedback + CRM stage/event where applicable,
* Dispute creation + freeze + moderation task.

---

# 252. CONTACT REVEAL TRANSACTION

Required atomic intent:

1. verify quota,
2. reserve/increment usage,
3. reveal state,
4. timeline event,
5. Notification.

A failed reveal must not consume quota without recoverable state.

---

# 253. LEAD MERGE TRANSACTION

Merge must not leave partial state.

---

# 254. SITE VISIT DISPUTE TRANSACTION

Conflict detection and Freeze must remain coherent.

---

# 255. N+1 PREVENTION

Explicitly remove N+1 from:

* Lead list enrichment,
* Thread list unread counts,
* Thread last Message lookup,
* counterpart Profile lookup,
* Proposal Detail enrichment,
* Lead Documents,
* Timeline related records,
* Site Visit list enrichment.

---

# 256. PAGINATION

Use scalable pagination for:

* Timeline,
* Notes if high count,
* Documents,
* Message Threads,
* Messages,
* Site Visit history.

---

# 257. LOADING STATES

Every Batch 9 data screen requires correct loading behavior.

At minimum:

* Lead Detail shell,
* Tabs,
* Timeline,
* Notes,
* Documents,
* Contact Reveal,
* Proposal Detail,
* Thread List,
* Thread Detail,
* Site Visit actions.

Do not flash sample records.

---

# 258. EMPTY STATES

Support meaningful empty states for:

* no Timeline activity beyond Lead creation,
* no Notes,
* no Documents,
* no Messages,
* no Archived Threads,
* no Site Visits.

Use screen-specific text.

---

# 259. ERROR STATES

Support:

* Lead load failure,
* Note save failure,
* Reminder save failure,
* Contact reveal quota failure,
* Contact reveal server failure,
* Proposal load failure,
* Thread load failure,
* attachment upload failure,
* Report failure,
* Visit Request failure,
* Reschedule failure,
* Feedback failure,
* Dispute state load failure.

Do not expose raw errors.

---

# 260. MOBILE KEYBOARD VERIFICATION

Test:

* Note sheet,
* Reminder form,
* Thread input,
* Report sheet,
* Site Visit Note,
* Feedback Note.

Keyboard must not hide:

* active field,
* Save/Submit,
* Message input.

---

# 261. SAFE-AREA VERIFICATION

Mobile Thread input and Lead bottom action bar must respect safe area.

No overlap.

---

# 262. OVERLAY VERIFICATION

Test:

* Note bottom sheet,
* Reminder modal,
* Closed/Lost modal,
* Merge confirmation,
* Reveal consent,
* Withdraw confirmation,
* Report modal,
* Report sheet,
* Site Visit reject/reschedule panels.

Check:

* correct z-index,
* focus,
* Escape,
* outside click,
* body scroll,
* repeated open/close.

---

# 263. TEXT WRAPPING VERIFICATION

Explicitly inspect:

* Meera Purohit,
* Lead metadata,
* long Property title,
* Note text,
* Duplicate warning,
* Contact consent copy,
* Requirement title,
* Proposal Listing title,
* Message preview,
* Report reason,
* Safety banner,
* Site Visit notification,
* Dispute explanation.

Fix:

* clipping,
* accidental two-line button text,
* overlapping badge,
* hidden ellipsis.

Do not solve by randomly shrinking typography.

---

# 264. SCREEN 1 FINAL VERIFICATION CHECKLIST

* [ ] standalone desktop Lead page
* [ ] dashboard shell correct
* [ ] mobile full page
* [ ] Lead display ID
* [ ] initials
* [ ] name
* [ ] status
* [ ] Number Revealed state
* [ ] real source
* [ ] target Property
* [ ] received time
* [ ] Call
* [ ] Schedule Visit
* [ ] Message
* [ ] Timeline tab
* [ ] Notes count
* [ ] Property tab
* [ ] Documents count
* [ ] complete Timeline
* [ ] Notes
* [ ] Pinned Note
* [ ] Edit Note
* [ ] Documents
* [ ] download
* [ ] Attach Document
* [ ] Related Property
* [ ] mobile tabs
* [ ] mobile bottom actions
* [ ] responsive verification

---

# 265. SCREEN 2 FINAL CHECKLIST

* [ ] Add Note bottom sheet
* [ ] Edit Note flow
* [ ] text field
* [ ] Pin toggle
* [ ] helper copy
* [ ] Save Note
* [ ] persistent Note
* [ ] persistent Pin
* [ ] pinned sorting
* [ ] authorisation
* [ ] live refresh

---

# 266. SCREEN 3 FINAL CHECKLIST

* [ ] Scheduler modal
* [ ] Date
* [ ] Time
* [ ] Tomorrow
* [ ] In 3 days
* [ ] Next week
* [ ] In-app Reminder
* [ ] Push option
* [ ] provider honesty
* [ ] future-date validation
* [ ] timezone handling
* [ ] Cancel
* [ ] Save Reminder
* [ ] Lead card reminder chip
* [ ] scheduled delivery
* [ ] completion behavior

---

# 267. SCREEN 4 FINAL CHECKLIST

* [ ] Pipeline dropdown
* [ ] New
* [ ] Contacted
* [ ] Site Visit
* [ ] Negotiation
* [ ] Closed/Lost
* [ ] terminal confirmation
* [ ] reason required
* [ ] Closed deal done
* [ ] Lost budget
* [ ] Lost another Property
* [ ] Lost unresponsive
* [ ] Other
* [ ] server validation
* [ ] terminal timeline event
* [ ] active pipeline removal
* [ ] history preserved

---

# 268. SCREEN 5 FINAL CHECKLIST

* [ ] duplicate inline banner
* [ ] same phone detection
* [ ] normalised phone
* [ ] candidate safe identity
* [ ] View duplicate
* [ ] Merge
* [ ] Dismiss
* [ ] Dismiss persistence
* [ ] Merge confirmation
* [ ] timeline combination
* [ ] newer Lead closes
* [ ] Messages preserved
* [ ] Site Visits preserved
* [ ] Proposal links preserved
* [ ] transactional safety
* [ ] audit record

---

# 269. SCREEN 6 FINAL CHECKLIST

* [ ] Masked state
* [ ] server-side mask
* [ ] Reveal Number
* [ ] consent notice
* [ ] Lead name in copy
* [ ] monthly quota
* [ ] real plan limit
* [ ] atomic usage
* [ ] idempotency
* [ ] Lead notification
* [ ] Revealed state
* [ ] Call
* [ ] Copy on tap only
* [ ] WhatsApp
* [ ] no hidden full number before reveal
* [ ] alternate Lead phone handling
* [ ] timeline event

---

# 270. SCREEN 7 FINAL CHECKLIST

* [ ] Proposal display ID
* [ ] status badge
* [ ] recipient context
* [ ] sent timestamp
* [ ] Requirement recap
* [ ] budget
* [ ] preferences
* [ ] requester safe name
* [ ] proposed Listing
* [ ] price
* [ ] area/floor
* [ ] Sent timestamp
* [ ] Viewed timestamp
* [ ] Shortlisted timestamp
* [ ] terminal placeholder/state
* [ ] embedded Thread
* [ ] read state
* [ ] Withdraw confirmation
* [ ] notification
* [ ] mobile stacked layout

---

# 271. SCREEN 8 FINAL CHECKLIST

* [ ] Messages heading
* [ ] Search
* [ ] Search name
* [ ] Search Property
* [ ] All
* [ ] Unread
* [ ] real unread count
* [ ] Archived
* [ ] thread cards
* [ ] last message time
* [ ] sender prefix
* [ ] unread badge
* [ ] swipe-left Archive
* [ ] participant-specific Archive
* [ ] pagination
* [ ] N+1 removed

---

# 272. SCREEN 9 FINAL CHECKLIST

* [ ] dedicated Thread route
* [ ] profile header
* [ ] Property context
* [ ] View Lead
* [ ] Archive
* [ ] Report Thread
* [ ] persistent Safety Banner
* [ ] date dividers
* [ ] text Messages
* [ ] PDF attachment
* [ ] image attachment
* [ ] attachment upload
* [ ] secure attachment access
* [ ] actual read receipt
* [ ] typing indicator only if real
* [ ] paperclip
* [ ] Send
* [ ] keyboard safe area
* [ ] Message pagination
* [ ] participant auth

---

# 273. SCREEN 10 FINAL CHECKLIST

* [ ] desktop Report modal
* [ ] mobile bottom sheet
* [ ] advance payment reason
* [ ] spam/promotion
* [ ] abusive language
* [ ] suspected fraud
* [ ] Other
* [ ] Details
* [ ] privacy copy
* [ ] Thread remains visible
* [ ] Thread target type
* [ ] participant validation
* [ ] moderation queue
* [ ] client duplicate protection
* [ ] server duplicate protection
* [ ] rate limit
* [ ] honest success

---

# 274. SCREEN 11 FINAL CHECKLIST

* [ ] Lead context
* [ ] participant name
* [ ] Property context
* [ ] Date
* [ ] Time
* [ ] Notes for visitor
* [ ] future-date validation
* [ ] timezone
* [ ] Requesting state
* [ ] duplicate-submit protection
* [ ] real Visit
* [ ] Lead update
* [ ] CRM event
* [ ] Notification
* [ ] transaction safety

---

# 275. SCREEN 12 FINAL CHECKLIST

* [ ] Accept
* [ ] Reschedule
* [ ] Reject
* [ ] Reschedule panel
* [ ] new Date
* [ ] new Time
* [ ] Send New Time
* [ ] old slot preserved in history
* [ ] reject panel
* [ ] reason required
* [ ] Unavailable reason
* [ ] No Longer Interested
* [ ] Other
* [ ] Confirm Reject
* [ ] specific Notification type
* [ ] Lead state consistency
* [ ] CRM event

---

# 276. SCREEN 13 FINAL CHECKLIST

* [ ] real scheduled reminder
* [ ] correct Visit
* [ ] correct Property
* [ ] correct participant
* [ ] Confirm
* [ ] Cancel
* [ ] unread state
* [ ] scheduled processor
* [ ] no fake Push
* [ ] Notification click-through

---

# 277. SCREEN 14 FINAL CHECKLIST

* [ ] Feedback card
* [ ] correct Visit context
* [ ] Interested
* [ ] Not Interested
* [ ] Follow-up
* [ ] optional Note
* [ ] Save Feedback
* [ ] structured outcome
* [ ] authorisation
* [ ] one controlled response per participant
* [ ] timeline event
* [ ] intentional CRM stage behavior

---

# 278. SCREEN 15 FINAL CHECKLIST

* [ ] Disputed badge
* [ ] Visit context
* [ ] conflicting reports
* [ ] Host outcome
* [ ] requester conflicting outcome
* [ ] Dispute record
* [ ] Visit Freeze
* [ ] no self-service action
* [ ] Contact Support
* [ ] Visit context passed to Support
* [ ] staff review dependency
* [ ] both parties notified after resolution

---

# 279. CURRENT REPOSITORY CRITICAL RECONCILIATION SUMMARY

Before Batch 9 may pass, explicitly repair the following current-state mismatches where present:

## Lead Full Detail

Current generic stacked Card screen must become the exact Batch 9 standalone detail workspace.

## Notes

Current create-only Note flow must gain:

* Pin,
* Edit,
* pinned ordering.

## Follow-ups

Current raw title + datetime form must become the Batch 9 Scheduler and add server-side time validation and channels.

## Closed/Lost

Current direct stage update must require structured terminal reason.

## Duplicate Leads

Implement detection, Dismiss and Merge.

## Contact Reveal

Current requester-to-owner reveal system is not enough for professional-to-Lead reveal.

Add:

* correct direction,
* quota,
* atomic usage,
* Lead notification,
* Call/Copy/WhatsApp.

## Proposal

Ensure Proposal Detail has:

* proposed listing relation,
* real status timestamps,
* embedded Thread.

## Messages

Current simple Thread list and basic Lead-embedded Messages must become:

* dedicated Thread routes,
* Search,
* Filters,
* Archive,
* attachments,
* typing,
* Report.

## Thread Reports

Current report target allow-list must support Thread.

## Site Visit Request

Current request flow must accept real date/time.

## Site Visit Rejection

Reason must be required.

## Site Visit Lead Status

Rejected Visit must not incorrectly remain represented as requested.

## Reminders

Implement scheduled reminder flow.

## Feedback

Implement post-Visit feedback.

## Dispute

Implement conflict detection, Freeze and staff resolution flow.

---

# 280. FULL CONNECTED BATCH 9 TEST FLOW

Execute this complete real flow:

Open CRM Lead
→ Open Full Detail
→ verify Timeline
→ open Notes
→ add Note
→ Pin Note
→ edit Note
→ reload and verify
→ set Follow-up
→ choose Tomorrow
→ select in-app reminder
→ save
→ verify card chip
→ change stage toward terminal
→ select Lost — budget mismatch
→ verify reason persisted
→ create duplicate Lead fixture
→ verify duplicate banner
→ Dismiss and reload
→ verify persistence
→ reset fixture
→ Merge
→ verify combined history
→ verify newer Lead closes
→ open professional Contact Reveal
→ verify masked number
→ Reveal
→ verify consent copy and quota
→ confirm
→ verify quota increment once
→ verify Lead Notification
→ Copy only by explicit button
→ WhatsApp action
→ open Proposal Detail
→ inspect Requirement recap
→ inspect proposed Listing
→ inspect status timeline
→ send/view embedded conversation
→ withdraw test Proposal fixture
→ open Messages list
→ Search by participant
→ Search by Property
→ Unread filter
→ Archive via swipe
→ Archived tab
→ open Thread
→ View Lead
→ send text Message
→ upload PDF
→ upload image
→ verify attachment persistence
→ Report Thread
→ submit once
→ attempt duplicate
→ verify moderation record
→ open Site Visit Request
→ choose Date and Time
→ submit once
→ attempt duplicate
→ Host Accept test
→ Reschedule test
→ Reject with no reason should fail
→ reject with reason
→ create scheduled Visit
→ verify Reminder Notification
→ Confirm/Cancel action
→ complete Visit
→ save Interested feedback
→ create conflicting participant outcome fixture
→ verify Disputed state
→ verify actions frozen
→ Contact Support
→ verify Visit context attached.

Any failed connection means Batch 9 is incomplete.

---

# 281. LIVE PROJECT VERIFICATION STANDARD

After every Batch 9 implementation section:

1. run Build,
2. run TypeScript check,
3. run Lint where configured,
4. start actual application,
5. login as correct role fixture,
6. open actual route,
7. test actual actions,
8. inspect database write,
9. refresh,
10. confirm persistence,
11. test 390px mobile,
12. test tablet,
13. test desktop,
14. inspect Browser console,
15. inspect failed Network requests,
16. inspect Supabase/RLS errors.

Code review alone is not PASS.

---

# 282. MANUAL VISUAL VERIFICATION

For every Batch 9 screen:

open Batch 9 source and implementation side-by-side.

Compare:

* width,
* card dimensions,
* header placement,
* avatar size,
* badge sizing,
* tab spacing,
* Timeline icon treatment,
* line spacing,
* Notes card,
* document card,
* bottom-sheet height,
* modal radius,
* Contact Reveal card,
* Message bubble radius,
* attachment chip,
* typing indicator,
* safety banner,
* Site Visit cards,
* feedback controls,
* dispute warning.

No `almost the same` result is acceptable.

---

# 283. COMPLETION BLOCKERS

Batch 9 must not be marked complete while any of these remain:

* current generic Lead card stack still used as final Full Detail,
* Timeline incomplete,
* Notes not editable,
* Pin state missing,
* Reminder Scheduler missing,
* Follow-up date not validated server-side,
* Closed/Lost reason not required,
* duplicate detection missing,
* Merge visual-only,
* contact phone full value sent before reveal,
* wrong-direction Contact Reveal reused,
* Reveal quota fake,
* reveal usage non-atomic,
* Copy automatic,
* WhatsApp href exposes phone before Reveal,
* Proposal not linked to proposed Listing,
* Proposal status times fake,
* Proposal conversation duplicated/static,
* Thread cards still navigate only to Lead Detail,
* no dedicated Thread route,
* Search local-only over first page,
* Archive global instead of per participant,
* no attachment support,
* fake typing indicator,
* fake read receipt,
* safety banner dismissible,
* Report Thread missing,
* report action rejects Thread targets,
* Site Visit Request lacks date/time persistence,
* duplicate Site Visit Request possible,
* Reject reason optional,
* rejected Visit incorrectly leaves Lead as requested,
* no Reminder scheduler,
* no post-Visit Feedback,
* no Dispute state,
* Disputed Visit still editable,
* support link lacks Visit context,
* thread list N+1 remains,
* Lead enrichment N+1 remains,
* no pagination,
* dead button,
* `href="#"`,
* modal clipping,
* bottom-sheet keyboard issue,
* sticky input hidden,
* mobile horizontal overflow,
* text clipping,
* badge overlap,
* console errors,
* RLS errors,
* no live verification.

---

# 284. FINAL ACCEPTANCE STATEMENT

**Design Batch 9 — Shared Detail Views is complete only when all 15 Batch 9 screen groups and their exact desktop/mobile states are implemented according to the actual Batch 9 source design and connected to real production data and workflows.**

Completion requires:

* exact standalone Lead Detail,
* complete touchpoint Timeline,
* real Notes tab,
* Pin Notes,
* Edit Notes,
* Related Property,
* Documents tab,
* real document attachments,
* Add/Edit Note sheet,
* Follow-up Scheduler,
* real scheduled Reminder,
* Closed/Lost required reasons,
* Duplicate Lead detection,
* persistent Dismiss,
* transaction-safe Merge,
* three-step Contact Reveal,
* masked server response,
* monthly Reveal quota,
* atomic quota usage,
* Lead notification,
* explicit Call,
* explicit Copy,
* WhatsApp action,
* Proposal Full Detail,
* Requirement recap,
* proposed Listing relation,
* real Proposal status timestamps,
* embedded real conversation,
* Proposal Withdraw confirmation,
* searchable Thread list,
* All/Unread/Archived filters,
* per-participant Archive,
* swipe Archive,
* dedicated full Message Thread,
* View Lead,
* persistent Safety Banner,
* PDF attachment,
* image attachment,
* honest typing state,
* safe-area input,
* Thread Report flow,
* exact reasons,
* moderation queue,
* Site Visit Request with Date/Time,
* duplicate-submit protection,
* Accept,
* Reschedule,
* mandatory Reject reason,
* Site Visit Reminder,
* Confirm/Cancel reminder actions,
* Post-Visit Feedback,
* structured feedback outcome,
* Dispute detection,
* timeline Freeze,
* no self-service dispute resolution,
* Support escalation,
* participant notifications,
* no fake data,
* no dead actions,
* no privacy leak,
* no RLS bypass,
* no N+1 list architecture,
* desktop verification,
* tablet verification,
* mobile verification,
* live project verification.

Required implementation sequence:

**Screen 1 Lead Full Detail → verify → Screen 2 Notes → verify → Screen 3 Reminder → verify → Screen 4 Status Reason → verify → Screen 5 Duplicate/Merge → verify → Screen 6 Contact Reveal → verify → Screen 7 Proposal Detail → verify → Screen 8 Thread List → verify → Screen 9 Thread Detail → verify → Screen 10 Report → verify → Screen 11 Visit Request → verify → Screen 12 Visit Response → verify → Screen 13 Reminder Notification → verify → Screen 14 Feedback → verify → Screen 15 Dispute → verify → full connected regression test.**

No screen passes merely because it renders.

**Exact Design + Real Data + Correct Contact Direction + Privacy + Persistence + CRM Integrity + Message Integrity + Site Visit Lifecycle Integrity + Security + RLS + Responsive Behavior + Live Verification must all pass.**
