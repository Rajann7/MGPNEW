# docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md

# My Gujarat Property — Leads, CRM, Proposals, Site Visits, Messages And Communication System

This document defines the complete **Leads, CRM, Proposals, Site Visits, Messages, Saved Items and Communication System** for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — build to match)

> Source of truth: finished design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batches 6, 7, 9). Replicate 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`.

**Contact reveal (NEW: plan-limited quota)**
* Revealing a contact consumes a **monthly reveal quota** ("Uses 1 of your 20 monthly reveals") — a metered, plan-limited resource (quota per plan defined in doc 09; enforce server-side + RLS).
* Reveal is a 3-step flow: masked → consent notice ("Revealing will notify the lead") → revealed with **Call / Copy / WhatsApp** (copy only via explicit button, never auto-copy).

**Lead / CRM**
* Lead detail tabs: Timeline / Notes / Related Property / Documents; timeline logs every touchpoint (inquiry → number revealed → message → visit scheduled → status change). Notes support pin. "Mark Contacted" one-tap shortcut.
* **Follow-up reminder scheduler**: quick presets (Tomorrow / In 3 days / Next week) + Pick date; delivery channels shown ("push + email").
* **Duplicate-lead detection** banner (View / Merge / Dismiss); merge semantics = "both timelines combine, newer lead closes; logged + reversible 30 days".
* Named **Closed/Lost reason taxonomy** (deal done / budget mismatch / chose another property / unresponsive / Other) — required when moving to Closed/Lost.
* **CRM Kanban is desktop-only** (New → Contacted → Site Visit → Negotiation → Closed/Lost); on mobile/touch use list + "Move to stage" menu — never drag. Kanban hover quick-card shows masked phone. CLOSED ✓ vs LOST carry a loss reason.
* Lead **SOURCE** dimension (Listing page / Proposal / Saved search). CRM bulk actions include **Export CSV**. **LINKED** block connects lead ↔ your listing ↔ proposal.
* Documents tab shows provenance ("Shared in chat") + independent "Attach document".

**Proposals**
* Status timeline (Sent → Viewed → Shortlisted → Accepted/Rejected); price-vs-budget line ("₹68 L vs budget ₹60–90L"); owner's rejection reason surfaced verbatim; Withdraw + Message owner actions; send-proposal listing selector with match hints; duplicate-submit protection (instant disable + "Sending…"). Requirement Feed shows explainable match chips ("Matches 3 of your listings"), Hide, already-proposed state, "Widen your areas".

**Messaging**
* Persistent non-dismissible safety banner ("Never share OTP or payment details in chat"); ✓✓ read receipts, "You:" prefix, unread count badge, day dividers; attachment (image thumb + PDF chip); Report thread (reason taxonomy; "other person isn't notified; reviewed within 24h; thread stays visible"). Desktop = two-pane list+thread.

**Site visits**
* Accept / Reject / Reschedule; reject requires a reason (Unavailable / No longer interested / Other) and the reject dialog counter-offers "Reschedule instead". Detail shows map + address + Directions. Reminder notification card carries inline Confirm/Cancel. Post-visit feedback (Interested / Not interested / Follow-up). Disputed visits = frozen support-only state. Broker multi-listing calendar color-codes by property.

Claude must read this file before implementing inquiry flows, contact reveal, lead creation, requirement proposals, matching, CRM stages, messaging threads, site visits, saved searches, recently viewed items, notifications, follow-ups, lead assignment, dashboard CRM modules, admin lead views, RLS policies or communication-related SQL migrations.

No fake lead is allowed.

No fake message is allowed.

No fake proposal status is allowed.

No fake site visit is allowed.

No hidden contact leak is allowed.

No unauthorized user can access another user’s leads/messages/proposals/site visits.

---

## 1. Purpose

This file defines:

* lead creation
* inquiry flow
* contact reveal flow
* lead source tracking
* CRM stages
* lead notes
* lead follow-ups
* lead assignment
* duplicate lead prevention
* requirements matching
* proposal system
* proposal statuses
* proposal privacy
* messaging threads
* message attachments
* unread counts
* site visit scheduling
* site visit reminders
* site visit feedback
* saved properties/projects
* saved searches
* recently viewed items
* notification triggers
* admin/staff lead oversight
* fraud/report handling
* role permissions
* RLS/security expectations
* dashboard UI rules
* performance rules
* manual verification rules

This document is the master communication and CRM flow reference.

---

## 2. Core Principles

The communication system must follow these principles:

1. Leads must be created from real user actions only.
2. Lead counts must be real.
3. Contact reveal must not happen for guests.
4. Hidden contact must never leak before authorization.
5. Inquiry success must only show after DB write succeeds.
6. Duplicate inquiry/contact reveal must be handled safely.
7. CRM data belongs to relevant participants only.
8. Messages belong to thread participants only.
9. Proposal status must be real.
10. Site visit status must be real.
11. Notifications must be DB-backed and real.
12. External notification delivery depends on provider status.
13. Dashboard analytics must not be fake.
14. Admin/staff access must be permission-scoped.
15. Every sensitive action must be server-authorized.
16. RLS must protect private communication data.
17. Rate limits must protect inquiry/message/contact reveal.
18. Reports/blocking must protect users from abuse.
19. No frontend-only privacy is allowed.
20. Manual verification is required before PASS.

---

## 3. Main Communication Entities

The system includes these main entities:

| Entity          | Purpose                                                                                |
| --------------- | -------------------------------------------------------------------------------------- |
| Lead            | A tracked business/user interest generated from inquiry/contact/proposal/site visit/ad |
| Lead Event      | Timeline record for a lead                                                             |
| CRM Stage       | Current relationship stage of a lead                                                   |
| Proposal        | A response to a requirement                                                            |
| Message Thread  | Conversation between allowed participants                                              |
| Message         | Individual communication in a thread                                                   |
| Site Visit      | Scheduled property/project visit                                                       |
| Saved Item      | User-saved property/project/profile/requirement                                        |
| Saved Search    | User-saved search query and alert preference                                           |
| Recently Viewed | User/guest recent view history                                                         |
| Notification    | DB-backed alert for a user/staff                                                       |
| Report/Block    | Safety/fraud workflow for abusive communication                                        |

---

## 4. Lead Sources

Leads may be generated from:

* property inquiry
* property contact reveal
* property phone click after reveal
* property WhatsApp click after reveal
* project inquiry
* project contact reveal
* project phone click after reveal
* project WhatsApp click after reveal
* requirement proposal
* requirement match
* broker proposal
* builder proposal to requirement where allowed
* site visit request
* ad inquiry
* ad click converted to inquiry where tracked
* public profile inquiry
* support/contact flow where relevant
* saved search alert interaction
* saved item owner action where future approved
* admin/manual lead entry where permitted and audited

No lead should be created from fake/demo actions in production.

---

## 5. Lead Source Values

Allowed lead source values should include:

| Source                    | Meaning                                    |
| ------------------------- | ------------------------------------------ |
| `property_inquiry`        | User submitted inquiry on property         |
| `property_contact_reveal` | User revealed property contact             |
| `property_call_click`     | User clicked call after reveal             |
| `property_whatsapp_click` | User clicked WhatsApp after reveal         |
| `project_inquiry`         | User submitted inquiry on project          |
| `project_contact_reveal`  | User revealed project contact              |
| `project_call_click`      | User clicked project call after reveal     |
| `project_whatsapp_click`  | User clicked project WhatsApp after reveal |
| `requirement_proposal`    | Proposal sent for requirement              |
| `requirement_match`       | Lead generated through matching            |
| `site_visit_request`      | Site visit requested                       |
| `ad_inquiry`              | Inquiry from ad/promotion                  |
| `ad_click`                | Ad click event if converted/tracked        |
| `profile_inquiry`         | Inquiry from public profile                |
| `manual_admin`            | Admin/staff created lead                   |
| `support_related`         | Support-created lead if needed             |

Implementation may adjust enum names but must preserve meaning.

---

## 6. Lead Ownership And Participants

A lead must identify:

* sender/interested user
* receiver/listing owner or builder or broker
* related property/project/requirement/proposal/ad
* assigned agent/staff where applicable
* lead source
* lead status/stage
* contact reveal status
* duplicate group if duplicate
* consent status

Participant types:

| Participant    | Meaning                                                |
| -------------- | ------------------------------------------------------ |
| Sender         | User who initiated inquiry/contact/proposal/site visit |
| Receiver       | Owner/broker/builder who receives lead                 |
| Assigned Agent | Builder/broker team member assigned to handle lead     |
| Staff/Admin    | Internal user with permission to view/manage           |
| Super Admin    | Full internal access with audit                        |

Rules:

* Sender can view own inquiry/lead status where exposed.
* Receiver can manage received leads.
* Assigned agent can view only assigned leads.
* Staff can view only permission-scoped leads.
* Wrong user cannot access lead.
* Guest cannot access private lead details.

---

## 7. Lead Status Values

Lead status values:

| Status      | Meaning                            |
| ----------- | ---------------------------------- |
| `new`       | newly created lead                 |
| `open`      | active lead                        |
| `duplicate` | duplicate of existing lead         |
| `blocked`   | blocked due to abuse/fraud/privacy |
| `archived`  | archived by user/team              |
| `closed`    | closed normally                    |
| `deleted`   | soft deleted                       |

---

## 8. CRM Stage Values

CRM stages:

| Stage          | Meaning                           |
| -------------- | --------------------------------- |
| `new`          | new lead, not contacted           |
| `contacted`    | first contact made                |
| `interested`   | user showed interest              |
| `follow_up`    | follow-up planned                 |
| `site_visit`   | site visit scheduled or completed |
| `negotiation`  | discussion/negotiation stage      |
| `converted`    | converted successfully            |
| `lost`         | lost                              |
| `closed`       | closed                            |
| `not_relevant` | not relevant/wrong lead           |
| `spam`         | spam/fraud lead                   |

Stages must be real and changed by authorized action only.

No fake CRM progress.

---

## 9. Lead Creation Flow

Standard lead creation flow:

1. User performs lead-generating action.
2. Server checks login/auth.
3. Server checks role/account status.
4. Server checks target entity status.
5. Server checks contact/inquiry permission.
6. Server checks duplicate rules.
7. Server checks rate limits.
8. Server validates input.
9. Server creates or reuses lead.
10. Server logs lead event.
11. Server creates notification.
12. External notification queued if provider configured.
13. UI shows success/duplicate/existing state.
14. Dashboard updates with real data.

Failure cases:

* guest → auth popup
* wrong role → role restriction
* inactive/suspended account → blocked
* target not public/available → unavailable
* duplicate → existing lead state
* rate limited → safe rate-limit error
* provider missing → in-app lead still created if DB succeeds; external delivery setup-required
* DB failure → no fake success

---

## 10. Inquiry Flow

Inquiry applies to:

* property
* project
* profile
* requirement/proposal where allowed
* ad/project promotion

Inquiry fields may include:

* message
* name if profile incomplete
* phone/email confirmation
* preferred contact method
* preferred date/time
* budget/interest note
* consent checkbox
* related entity ID
* source page/UTM where safe

Inquiry rules:

1. Guest must login/register first.
2. User must consent to contact sharing where required.
3. Message must be validated.
4. Duplicate inquiry must be prevented or merged.
5. Inquiry creates lead.
6. Inquiry creates lead event.
7. Inquiry triggers notification.
8. Inquiry success shown only after DB success.
9. Hidden contact is not automatically revealed unless action is contact reveal.
10. No fake inquiry.

---

## 11. Contact Reveal Flow

Contact reveal is high privacy risk.

Contact reveal flow:

1. Guest clicks contact/call/WhatsApp → auth popup.
2. Logged-in user clicks reveal/contact.
3. Server checks account status.
4. Server checks target entity status.
5. Server checks role and permission.
6. Server checks contact visibility rule.
7. Server checks rate limit.
8. Server checks duplicate reveal.
9. Server logs consent/reveal.
10. Server creates/reuses lead.
11. Server returns allowed contact fields only.
12. UI displays contact.
13. Notification created for receiver where configured.

Contact reveal must not:

* expose contact in public HTML
* expose contact in public API before authorization
* expose contact in metadata/schema/share text
* reveal to guest
* bypass rate limits
* skip lead/consent log
* fake success if DB fails

Hidden contact leak is critical.

---

## 12. Contact Reveal Status Values

| Status                  | Meaning                               |
| ----------------------- | ------------------------------------- |
| `not_revealed`          | contact not yet revealed              |
| `revealed`              | contact revealed to this user         |
| `request_sent`          | contact request sent but not revealed |
| `blocked`               | reveal blocked                        |
| `rate_limited`          | reveal blocked due to rate limit      |
| `subscription_required` | plan required                         |
| `verification_required` | verification required                 |
| `auth_required`         | login/register required               |
| `unavailable`           | target/contact unavailable            |

---

## 13. Duplicate Lead Prevention

Duplicate prevention must avoid spam and repeated lead inflation.

Duplicate signals:

* same sender
* same receiver
* same entity
* same source
* same day/window
* same mobile/email
* same message similarity
* repeated contact reveal
* repeated proposal
* repeated site visit request

Duplicate behavior:

* reuse existing open lead where appropriate
* add new lead event instead of new lead
* show “Already contacted” or “Inquiry already sent”
* do not increase lead count falsely
* allow genuine repeat after time window if product rules allow
* log duplicate event
* track abuse if excessive

Duplicate prevention must be server-side.

---

## 14. Lead Event Timeline

Every important lead action should create lead event.

Lead event types:

* `lead_created`
* `inquiry_submitted`
* `contact_revealed`
* `call_clicked`
* `whatsapp_clicked`
* `message_sent`
* `proposal_sent`
* `proposal_viewed`
* `proposal_accepted`
* `proposal_rejected`
* `stage_changed`
* `note_added`
* `follow_up_set`
* `site_visit_requested`
* `site_visit_accepted`
* `site_visit_rejected`
* `site_visit_rescheduled`
* `site_visit_cancelled`
* `site_visit_completed`
* `lead_assigned`
* `lead_archived`
* `lead_closed`
* `lead_lost`
* `report_created`
* `blocked`
* `admin_updated`

Rules:

* timeline visible only to allowed participants/admin.
* internal notes not visible to public users unless intended.
* sensitive actions audited.
* no fake timeline entries.

---

## 15. Lead Notes

Lead notes allow CRM tracking.

Note types:

* private user note
* team note
* internal staff note
* follow-up note
* call note
* site visit note
* loss reason
* conversion note

Rules:

* notes are private/scoped
* notes require authentication
* builder agents see only assigned lead notes
* staff notes internal only
* notes cannot leak to public detail page
* notes validate content
* attachments private if used
* note delete/edit audited where needed

---

## 16. Follow-Up System

Follow-up fields:

* follow-up date
* follow-up time
* follow-up note
* assigned person
* reminder status
* completed status
* missed status
* next action

Follow-up rules:

* user/team can set follow-up on own/scoped lead
* reminder notification created
* external reminder depends on provider
* overdue follow-ups visible in dashboard
* follow-up does not create fake lead activity
* follow-up changes logged

---

## 17. Lead Assignment

Lead assignment applies especially to:

* builder teams
* broker teams where implemented
* staff/admin support
* CRM managers

Assignment rules:

* only authorized user can assign
* builder can assign own project leads to own agents
* broker team assignment if team feature exists
* assigned agent sees assigned leads only
* unassigned agent cannot access lead
* assignment changes audited
* notification created for assigned user
* reassignment logged in lead event

---

## 18. CRM Dashboard Views

CRM dashboard should support:

* list view
* Kanban view where implemented
* lead detail drawer/page
* filters
* search
* sort
* stage change
* notes
* follow-ups
* site visits
* messages
* assignment
* duplicate indicator
* source indicator
* contact reveal status
* timeline
* export if permitted
* mobile cards

Rules:

* real data only
* no fake pipeline
* no fake conversion
* pagination required
* role-scoped
* no private leak
* mobile-friendly

---

## 19. CRM Filters

CRM filters may include:

* lead stage
* lead status
* source
* property/project/requirement
* city/locality
* date range
* assigned agent
* follow-up due
* unread messages
* contact revealed
* proposal status
* site visit status
* duplicate status
* lost reason
* converted status

Rules:

* filters indexed where needed
* no unbounded reads
* mobile filters bottom sheet
* clear filters option
* result count real only

---

## 20. Proposal System Overview

Proposal is a structured response to a requirement.

Proposal may be used by:

* broker responding to requirement
* builder responding to matching requirement where allowed
* owner limited/future cases only if product rules allow

Proposal connects:

* requirement
* sender
* receiver
* property/project suggested
* message
* offer/details
* status
* thread/messages
* lead/CRM

No proposal can be sent to unauthorized requirement.

No duplicate spam proposals.

---

## 21. Proposal Permissions

| Action                          |           Owner |          Broker |           Builder | Guest |         Staff/Admin |
| ------------------------------- | --------------: | --------------: | ----------------: | ----: | ------------------: |
| Create requirement              |             Yes |             Yes |     No by default |    No |        If permitted |
| View own requirement proposals  |             Yes |             Yes |       Conditional |    No |        If permitted |
| Send proposal to requirement    |  Limited/future |             Yes | Yes where allowed |    No |  Admin-managed only |
| Withdraw own proposal           |     Conditional |             Yes |               Yes |    No |        If permitted |
| Accept/reject received proposal | Yes if receiver | Yes if receiver |       Conditional |    No |        If permitted |
| View unrelated proposal         |              No |              No |                No |    No | No unless permitted |

Proposal rules depend on requirement visibility.

---

## 22. Proposal Status Values

Proposal statuses:

| Status        | Meaning                     |
| ------------- | --------------------------- |
| `draft`       | proposal saved but not sent |
| `sent`        | sent to requirement owner   |
| `viewed`      | receiver viewed             |
| `shortlisted` | receiver shortlisted        |
| `accepted`    | receiver accepted           |
| `rejected`    | receiver rejected           |
| `negotiation` | active discussion           |
| `withdrawn`   | sender withdrew             |
| `expired`     | expired automatically       |
| `blocked`     | blocked due to abuse/fraud  |
| `archived`    | archived                    |

Status must be real.

No fake viewed/accepted status.

---

## 23. Proposal Fields

Proposal fields may include:

* requirement ID
* sender profile ID
* receiver profile ID
* related property ID
* related project ID
* proposal title
* message
* offer amount
* price/rent range
* possession/availability note
* suggested location
* property/project summary
* attachments where safe
* contact preference
* expiry date
* status
* viewed_at
* responded_at
* created_at
* updated_at

Rules:

* validate fields
* sender must own suggested property/project where required
* proposal cannot expose hidden contact unless allowed
* proposal should create or link lead
* proposal may open message thread

---

## 24. Proposal Flow

Proposal flow:

1. Sender views allowed requirement.
2. Sender clicks send proposal.
3. Server checks login/role.
4. Server checks requirement visibility.
5. Server checks duplicate proposal.
6. Server validates proposal data.
7. Server checks sender ownership of attached listing/project if relevant.
8. Proposal created with `sent`.
9. Lead created/reused.
10. Message thread created/reused where enabled.
11. Notification sent to receiver.
12. Sender sees proposal status.
13. Receiver can view/shortlist/accept/reject/negotiate.
14. Status changes logged.

No fake proposal state.

---

## 25. Proposal Matching Rules

Requirement matching may suggest:

* property to requirement
* project to requirement
* broker to requirement
* builder project to requirement

Matching must be explainable.

Match factors may include:

* location
* budget
* purpose
* property/project type
* BHK/unit type
* area
* possession timeline
* amenities
* user role
* availability
* RERA/verification status where relevant
* contact preference

Rules:

* no AI recommendation in current scope
* no fake match score
* match explanation shown if score shown
* private unauthorized data not used in public output
* matching can be basic/rule-based
* if matching not implemented, show setup/not-started state

---

## 26. Messaging System Overview

Messaging supports communication between allowed participants.

Message threads can be connected to:

* lead
* proposal
* requirement
* property inquiry
* project inquiry
* site visit
* support ticket where separate support system overlaps

Messaging must support:

* participant-only access
* unread count
* message list
* message send
* attachments where safe
* report/block
* archive
* retry/failure
* notifications
* mobile UI
* admin/staff access only where permitted

No unauthorized read/write.

---

## 27. Message Thread Types

Thread types:

| Type              | Meaning                                           |
| ----------------- | ------------------------------------------------- |
| `lead`            | conversation about a lead                         |
| `proposal`        | conversation about proposal/requirement           |
| `site_visit`      | conversation about site visit                     |
| `support`         | support conversation if using same message system |
| `admin_review`    | internal moderation discussion if separate        |
| `profile_inquiry` | conversation from profile inquiry                 |

---

## 28. Message Status Values

Message statuses:

| Status      | Meaning                                          |
| ----------- | ------------------------------------------------ |
| `sent`      | message saved/sent                               |
| `delivered` | delivered in app or external provider where real |
| `read`      | read by recipient                                |
| `failed`    | send failed                                      |
| `deleted`   | soft deleted                                     |
| `blocked`   | blocked by moderation/report                     |

Rules:

* in-app sent means DB saved
* external delivered only if provider confirms
* read only if recipient actually reads/marks read
* no fake delivered/read

---

## 29. Messaging Rules

Messaging must:

* require login
* verify thread participant
* verify account status
* validate message content
* rate-limit spam
* allow only safe attachments
* create notification
* update unread count
* handle blocked users
* support archive
* preserve timeline
* avoid raw HTML injection
* support safe errors

Messaging must not:

* reveal hidden contact automatically
* allow guest messages
* allow wrong user access
* show private docs publicly
* log message body in public logs
* fake read/delivery
* use provider success if missing

---

## 30. Message Attachments

Attachments may include:

* image
* PDF
* document
* site visit proof
* proposal attachment
* support/report evidence

Rules:

* validate type/MIME/size
* private bucket by default for private conversations
* signed URL
* participant-only access
* malware/file scan setup-required or implemented
* no public CDN for private attachments
* attachment metadata private
* upload failure not fake success

---

## 31. Unread Count Rules

Unread counts must be real.

Unread applies to:

* notifications
* message threads
* lead updates where counted
* proposal responses where counted

Rules:

* unread count scoped to recipient
* updated when user reads/marks read
* no fake unread badge
* no global public caching
* indexed query
* mobile badge updates safely
* mark all read server-authorized

---

## 32. Block And Report In Messaging

Users should be able to:

* report message/thread
* block abusive user where implemented
* archive thread
* mute thread where implemented

Rules:

* report creates report record
* block prevents new messages where implemented
* blocked state visible to participants as safe message
* admin/staff review permission-scoped
* evidence attachments private
* no retaliation/private reporter leak

---

## 33. Site Visit System Overview

Site visit helps schedule property/project visits.

Site visit can be linked to:

* property lead
* project lead
* proposal
* requirement match
* broker/builder/owner relationship

Site visit must support:

* request
* accept
* reject
* reschedule
* cancel with reason
* reminder
* feedback
* no-show
* completion
* safe meeting notice
* calendar view
* notifications
* CRM stage update

No fake site visit.

---

## 34. Site Visit Status Values

Statuses:

| Status                 | Meaning                              |
| ---------------------- | ------------------------------------ |
| `requested`            | visit requested                      |
| `accepted`             | receiver accepted                    |
| `rejected`             | receiver rejected                    |
| `reschedule_requested` | reschedule requested                 |
| `rescheduled`          | rescheduled                          |
| `cancelled`            | cancelled                            |
| `completed`            | completed                            |
| `no_show`              | participant did not show             |
| `expired`              | visit time passed without completion |
| `blocked`              | blocked due to abuse/fraud           |

---

## 35. Site Visit Fields

Fields may include:

* lead ID
* property/project ID
* requester ID
* receiver ID
* assigned agent ID
* requested date/time
* confirmed date/time
* meeting location
* meeting mode
* status
* cancel reason
* reject reason
* reschedule reason
* feedback
* rating where implemented and real
* safety acknowledgement
* reminder status
* created_at
* updated_at

Rules:

* use IST timezone
* validate future date/time
* prevent duplicate visit spam
* respect participant availability where implemented
* safe meeting notice shown
* no private exact address leak unless allowed
* status changes logged

---

## 36. Site Visit Flow

Standard flow:

1. User requests site visit from property/project/lead/proposal.
2. Server checks login/role.
3. Server checks target status.
4. Server checks duplicate open site visit.
5. Server validates requested time.
6. Site visit created with `requested`.
7. Lead stage updates to `site_visit` if appropriate.
8. Notification sent to receiver.
9. Receiver accepts/rejects/reschedules.
10. Notifications sent.
11. Reminder created if provider/cron available.
12. Visit completed/no-show/cancelled.
13. Feedback collected if implemented.
14. CRM timeline updated.

No fake reminders if provider/cron missing.

---

## 37. Site Visit Safe Meeting Notice

Site visit UI must show safety notice:

* verify property/project independently
* do not make payment without proper documents
* meet in safe/public place when possible
* inform someone before visit
* platform does not guarantee deal/legal ownership
* report suspicious behavior
* do due diligence for RERA/legal/title
* avoid sharing sensitive documents casually

Safety notice should be concise but visible.

---

## 38. Calendar And Reminder Rules

Calendar/reminder may include:

* dashboard calendar
* list of upcoming visits
* reminders
* notification bell
* email/SMS/WhatsApp reminders where provider configured
* reschedule alerts
* cancellation alerts

Provider dependencies:

* external reminders require notification providers
* calendar integration setup-required unless implemented
* cron/background jobs setup-required until configured

No fake reminder sent.

---

## 39. Saved Items

Users may save:

* property
* project
* broker profile
* builder profile
* requirement where allowed
* proposal where allowed
* search

Guest saved behavior:

* local-only saved state where implemented
* prompt login to sync
* no account save without login

Logged-in behavior:

* save to DB
* unsave
* list saved items
* unavailable/deleted item handling
* no private data leak
* notifications/alerts optional

Rules:

* user sees own saved items only
* saved item card uses public-safe data
* deleted/unpublished items hidden or marked unavailable
* no fake saved count

---

## 40. Saved Searches

Saved search stores:

* query params
* location
* purpose
* type
* budget
* filters
* alert frequency
* notification preferences
* created_at
* last_notified_at

Rules:

* logged-in user only for DB saved search
* guest local-only where implemented
* alerts require real matching data
* external alerts depend on provider
* no fake alert sent
* saved search results use public-safe data
* user can edit/delete/pause alerts

---

## 41. Recently Viewed

Recently viewed may support:

* guest local storage
* logged-in DB sync
* property/project/profile views
* limit recent items
* clear history
* privacy setting

Rules:

* no private data
* no hidden contact
* deleted/unpublished items hidden/unavailable
* user sees own history only
* guest local data not automatically uploaded without consent/clear UX if sensitive

---

## 42. Notification Triggers

Notifications may be created for:

### Lead Notifications

* new inquiry received
* contact revealed
* lead assigned
* lead stage changed
* follow-up due
* duplicate lead detected
* lead closed/converted/lost

### Proposal Notifications

* proposal sent
* proposal viewed
* proposal shortlisted
* proposal accepted
* proposal rejected
* proposal withdrawn
* proposal expired
* proposal message received

### Message Notifications

* new message
* attachment received
* message failed
* thread archived/muted where relevant
* report/block update

### Site Visit Notifications

* visit requested
* visit accepted
* visit rejected
* visit rescheduled
* visit cancelled
* visit reminder
* visit completed
* no-show marked
* feedback requested

### Saved Search Notifications

* new matching property/project
* price/status change where implemented
* saved search alert paused/failed

External delivery:

* email/SMS/WhatsApp/push only if provider configured
* in-app notification DB-backed
* no fake delivered status

---

## 43. Role-Specific Lead/CRM Behavior

## 43.1 Owner

Owner can:

* receive property inquiries
* receive requirement proposals
* see own leads
* manage lead stage
* add notes
* schedule site visits
* message lead participants
* view own saved items/searches
* view own notifications

Owner cannot:

* see broker/builder leads unrelated
* access another owner’s leads
* see hidden contact unless reveal/permission allows
* fake proposal/site visit status

---

## 43.2 Broker

Broker can:

* receive property inquiries
* receive requirement proposals
* send proposals
* view requirement feed where allowed
* manage CRM leads
* add notes/follow-ups
* schedule site visits
* message participants
* track proposal statuses
* view own saved items/searches
* view notifications

Broker cannot:

* access unrelated private requirements
* access another broker’s CRM
* fake match/proposal status
* bypass duplicate proposal prevention

---

## 43.3 Builder

Builder can:

* receive project leads
* view matching buying requirements where allowed
* send proposals where allowed
* assign leads to agents
* manage project CRM
* schedule project site visits
* message participants
* manage agents’ lead access
* view project/ad lead analytics
* view notifications

Builder cannot:

* access unrelated builder leads
* let agent see unassigned data
* fake project lead count
* fake project inquiry status
* reveal hidden requirement contact without authorization

---

## 43.4 Builder Agent

Builder agent can:

* view assigned project leads
* update assigned lead stage if permitted
* message assigned lead participants if permitted
* schedule site visits if permitted
* add notes if permitted

Builder agent cannot:

* view unassigned leads
* manage billing
* manage provider settings
* manage all projects unless assigned
* access admin/staff modules
* change own permissions
* fake lead/site visit data

---

## 44. Admin / Staff Lead Oversight

Admin/staff may view/manage leads only with permission.

Admin/staff lead modules may include:

* lead overview
* reported leads
* duplicate leads
* fraud/spam leads
* escalated leads
* support-related leads
* project/property inquiry audit
* contact reveal logs
* proposal disputes
* message reports
* site visit disputes

Staff access must be permission-scoped.

Sensitive data access requires permission.

Private messages/docs require stronger permission and audit.

---

## 45. Admin Actions

Allowed admin/staff actions if permitted:

* view lead
* assign lead
* mark duplicate
* block lead
* archive lead
* investigate report
* view contact reveal log
* view message report
* resolve dispute
* add internal note
* export leads
* audit CRM action
* ban/suspend abusive user
* restore/close ticket-linked lead

Admin actions must be audited.

No normal staff hard delete without permission.

---

## 46. Privacy Rules

Private communication data includes:

* lead details
* messages
* proposal messages
* contact reveal logs
* private phone/email
* private notes
* internal notes
* site visit schedule/location
* support/report attachments
* private documents
* agent assignment
* CRM status where private

Privacy rules:

* public pages must not expose private communication data
* participants only
* staff permission required
* no public cache
* no SEO indexing
* no sitemap
* no metadata leak
* no logs with hidden contact/message body/private URLs
* signed URLs for private attachments

---

## 47. RLS Rules

RLS must enforce:

* user reads own sent/received leads
* receiver reads received leads
* assigned agent reads assigned leads only
* sender reads own proposal
* receiver reads proposal to own requirement
* message participant reads thread/messages
* non-participant denied
* site visit participants read own visits
* saved items user own only
* saved searches user own only
* notifications recipient own only
* admin/staff permission-scoped access
* private attachments protected
* contact reveal logs scoped
* audit logs protected

Wrong user access must be denied even if URL/API called directly.

---

## 48. Direct URL Bypass Tests

Test direct URL access for:

* lead detail
* CRM lead detail
* proposal detail
* message thread
* message attachment
* site visit detail
* saved items
* saved searches
* notification center
* admin lead view
* contact reveal log

Actors to test:

* guest
* unrelated owner
* unrelated broker
* unrelated builder
* unassigned builder agent
* staff without permission
* staff with permission
* Super Admin

Unauthorized must be denied.

---

## 49. Database Table Expectations

Suggested tables:

* `leads`
* `lead_events`
* `lead_notes`
* `lead_assignments`
* `lead_follow_ups`
* `contact_reveals`
* `proposals`
* `proposal_events`
* `message_threads`
* `message_participants`
* `messages`
* `message_attachments`
* `site_visits`
* `site_visit_events`
* `saved_items`
* `saved_searches`
* `recently_viewed`
* `notifications`
* `notification_preferences`
* `notification_delivery_logs`
* `reports`
* `blocked_users`
* `audit_logs`
* `rate_limit_events`

Actual schema may vary, but behavior must exist.

---

## 50. Suggested Table Fields

## 50.1 `leads`

Fields:

* `id`
* `source`
* `sender_profile_id`
* `receiver_profile_id`
* `assigned_agent_profile_id`
* `assigned_staff_id`
* `related_entity_type`
* `related_entity_id`
* `property_id`
* `project_id`
* `requirement_id`
* `proposal_id`
* `ad_id`
* `status`
* `stage`
* `contact_revealed`
* `consent_logged`
* `duplicate_group_id`
* `last_activity_at`
* `created_at`
* `updated_at`
* `deleted_at`

---

## 50.2 `lead_events`

Fields:

* `id`
* `lead_id`
* `event_type`
* `actor_profile_id`
* `actor_staff_id`
* `old_value_safe`
* `new_value_safe`
* `note`
* `metadata_safe`
* `created_at`

---

## 50.3 `lead_notes`

Fields:

* `id`
* `lead_id`
* `note`
* `visibility`
* `created_by_profile_id`
* `created_by_staff_id`
* `created_at`
* `updated_at`
* `deleted_at`

Visibility values:

* `private_to_owner`
* `team`
* `internal_staff`
* `participant_visible`

---

## 50.4 `lead_follow_ups`

Fields:

* `id`
* `lead_id`
* `assigned_to_profile_id`
* `due_at`
* `note`
* `status`
* `completed_at`
* `created_at`
* `updated_at`

---

## 50.5 `contact_reveals`

Fields:

* `id`
* `lead_id`
* `revealer_profile_id`
* `receiver_profile_id`
* `entity_type`
* `entity_id`
* `contact_type`
* `consent_version`
* `revealed_at`
* `ip_hash`
* `user_agent_hash`
* `created_at`

No full hidden contact should be logged unnecessarily.

---

## 50.6 `proposals`

Fields:

* `id`
* `requirement_id`
* `sender_profile_id`
* `receiver_profile_id`
* `related_entity_type`
* `related_entity_id`
* `property_id`
* `project_id`
* `title`
* `message`
* `offer_amount`
* `status`
* `viewed_at`
* `responded_at`
* `expires_at`
* `created_at`
* `updated_at`
* `deleted_at`

---

## 50.7 `proposal_events`

Fields:

* `id`
* `proposal_id`
* `event_type`
* `actor_profile_id`
* `actor_staff_id`
* `old_status`
* `new_status`
* `note`
* `created_at`

---

## 50.8 `message_threads`

Fields:

* `id`
* `thread_type`
* `related_entity_type`
* `related_entity_id`
* `lead_id`
* `proposal_id`
* `site_visit_id`
* `support_ticket_id`
* `last_message_at`
* `status`
* `created_at`
* `updated_at`

---

## 50.9 `message_participants`

Fields:

* `id`
* `thread_id`
* `profile_id`
* `staff_id`
* `participant_role`
* `last_read_at`
* `muted_at`
* `archived_at`
* `created_at`

---

## 50.10 `messages`

Fields:

* `id`
* `thread_id`
* `sender_profile_id`
* `sender_staff_id`
* `body`
* `status`
* `created_at`
* `updated_at`
* `deleted_at`

---

## 50.11 `message_attachments`

Fields:

* `id`
* `message_id`
* `media_asset_id`
* `created_at`

---

## 50.12 `site_visits`

Fields:

* `id`
* `lead_id`
* `property_id`
* `project_id`
* `proposal_id`
* `requested_by_profile_id`
* `receiver_profile_id`
* `assigned_agent_profile_id`
* `scheduled_at`
* `timezone`
* `meeting_location_safe`
* `status`
* `reject_reason`
* `cancel_reason`
* `reschedule_reason`
* `feedback`
* `safety_notice_accepted_at`
* `created_at`
* `updated_at`
* `deleted_at`

---

## 50.13 `saved_items`

Fields:

* `id`
* `profile_id`
* `entity_type`
* `entity_id`
* `created_at`

---

## 50.14 `saved_searches`

Fields:

* `id`
* `profile_id`
* `name`
* `query_params`
* `alert_enabled`
* `alert_frequency`
* `last_alert_at`
* `created_at`
* `updated_at`
* `deleted_at`

---

## 50.15 `recently_viewed`

Fields:

* `id`
* `profile_id`
* `session_hash`
* `entity_type`
* `entity_id`
* `viewed_at`

---

## 51. Index Expectations

Indexes required for:

* leads by receiver
* leads by sender
* leads by assigned agent
* leads by related entity
* leads by status/stage
* leads by last activity
* lead events by lead/date
* proposals by requirement
* proposals by sender
* proposals by receiver
* proposals by status
* message participants by profile/thread
* messages by thread/date
* site visits by participant/status/date
* saved items by profile/entity
* saved searches by profile
* notifications by recipient/read/date
* contact reveals by revealer/entity
* reports by target/status
* follow-ups by assigned/due/status

No CRM list can be unpaginated.

---

## 52. Migration Expectations

Implementation requires migrations for:

* lead tables
* lead events/notes/follow-ups
* contact reveal logs
* proposal tables
* message tables
* site visit tables
* saved items/searches
* notification links if needed
* indexes
* RLS policies
* public/private views if needed
* audit logs
* rate limit events

Migration must include:

* migration header
* purpose
* phase
* tables changed
* RLS changed
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 53. Security And Abuse Protection

Required protections:

* login required for lead actions
* rate limit inquiries
* rate limit contact reveals
* rate limit messages
* rate limit proposals
* rate limit site visit requests
* block duplicate spam
* report abusive messages
* block abusive users where implemented
* safe error messages
* no raw SQL/provider errors
* no hidden contact in logs
* no message body in public logs
* no private attachment public URL
* no external delivery fake success

---

## 54. Rate Limit Areas

Rate limits required for:

* inquiry submit
* contact reveal
* call click tracking
* WhatsApp click tracking
* proposal send
* message send
* attachment upload
* site visit request
* reschedule request
* report submission
* saved search alert creation
* follow-up reminder creation where abuse possible
* admin bulk actions

Rate limit failure must show safe message and not create fake success.

---

## 55. Dashboard UI Requirements

Lead/CRM UI must include:

* overview cards
* real counts
* lead list
* lead detail drawer/page
* filters/search
* stage dropdown
* notes
* follow-up
* messages
* proposals
* site visits
* duplicate indicator
* contact reveal status
* timeline
* assignment
* export only if permitted
* loading state
* empty state
* error state
* unauthorized state
* mobile card layout

No dead CRM module.

No fake pipeline.

---

## 56. Mobile UX Requirements

Mobile CRM/messaging/site visits must:

* work at 320px
* use cards instead of tables
* use bottom sheets for filters/actions
* keep message input usable
* keep sticky send button safe
* prevent keyboard overlap where possible
* avoid horizontal scroll
* show readable stage/status pills
* support swipe/scroll without accidental card click
* show loading/empty/error states
* preserve scroll position where useful
* keep tap targets large

---

## 57. Performance Rules

Performance requirements:

* lead lists paginated
* CRM Kanban limited per column
* messages paginated
* site visits paginated
* notifications latest limited
* unread count indexed
* filters indexed
* attachments lazy-loaded
* no N+1 timeline queries
* no full message thread load on dashboard summary
* no heavy analytics live on every page load
* external provider sends queued/background where possible
* realtime subscriptions scoped if used
* polling frequency reasonable if used

---

## 58. Notification Provider Rules

In-app notifications are DB-backed.

External delivery providers:

* email
* SMS
* WhatsApp
* push

Rules:

* provider missing → setup-required/fallback
* notification record can exist even if external provider missing
* external delivery logs real only
* no fake delivered status
* retries controlled
* provider errors safe
* preferences respected
* quiet hours/digest respected where implemented

---

## 59. Admin Manual Review Rules

Admin/staff can review:

* reported leads
* reported messages
* spam proposals
* duplicate leads
* site visit disputes
* abusive contact reveal behavior
* suspicious CRM activity

Review actions:

* warn user
* block user
* mark spam
* archive lead
* resolve report
* escalate
* suspend account
* revoke verification where relevant
* audit action

Staff permission required.

---

## 60. SEO Rules

Private CRM/communication pages:

* noindex
* not in sitemap
* not cache public
* no metadata with private content

Public pages must not include:

* lead count
* proposal count
* message count
* private status
* contact reveal logs
* site visit details
* hidden contact

Saved search public alert pages should not expose private query if user-specific.

---

## 61. Feature Registry Items Required

`FEATURE_REGISTRY.md` must track:

* property inquiry lead creation
* project inquiry lead creation
* contact reveal flow
* contact reveal logging
* duplicate lead prevention
* lead list
* lead detail
* lead timeline
* lead notes
* follow-ups
* CRM stages
* CRM Kanban/list
* lead assignment
* requirement proposals
* proposal statuses
* proposal notifications
* matching rules
* message threads
* message send
* message attachments
* unread count
* report/block message
* site visit request
* site visit accept/reject
* site visit reschedule/cancel
* site visit reminders
* site visit feedback
* saved items
* saved searches
* recently viewed
* notification triggers
* admin lead review
* RLS policies
* rate limits
* manual verification

Each item must have real status.

---

## 62. Common Bugs To Track

Create bug if:

* fake lead count shown
* lead created for guest without auth where not allowed
* inquiry success shown but DB failed
* duplicate inquiry creates many leads
* hidden contact leaks before reveal
* contact reveal not logged
* contact reveal no rate limit
* wrong user views lead
* wrong user views proposal
* wrong user views message thread
* unassigned agent views lead
* proposal status faked
* message read status faked
* external notification fake delivered
* site visit fake reminder shown
* site visit duplicate spam allowed
* private attachment public
* message body logged publicly
* CRM list unpaginated
* Kanban loads all leads
* admin/staff without permission views private communication
* direct URL bypass works
* dashboard shows fake CRM data
* notification unread count fake
* saved item shows hidden/private data

---

## 63. Manual Verification Checklist

Manual verification must check:

### Leads

* guest inquiry opens auth popup
* logged-in inquiry creates lead
* duplicate inquiry handled
* receiver sees lead
* wrong user cannot see lead
* lead timeline created
* lead stage updates
* lead notes scoped
* follow-up works
* rate limit works or tracked

### Contact Reveal

* guest cannot reveal
* logged-in allowed user can reveal when rules allow
* hidden contact not in public HTML/API
* reveal logs created
* duplicate reveal handled
* rate limit handled
* lead created/reused
* notification created

### Proposals

* allowed role can send proposal
* duplicate proposal blocked/handled
* receiver sees proposal
* wrong user denied
* status changes real
* proposal notification created
* expired/withdrawn behavior safe

### Messages

* thread participants can send/read
* non-participant denied
* unread count real
* attachments private
* report/block works or tracked
* no fake delivered/read
* mobile message UI usable

### Site Visits

* request works
* duplicate open request handled
* receiver accepts/rejects/reschedules
* cancellation reason required where needed
* reminder setup-required/real
* feedback/no-show/completed status works
* safe meeting notice shown
* wrong user denied

### Saved Items/Searches

* save/unsave works
* user sees own saved items
* deleted/unpublished item handled
* saved search saves query
* alert provider setup-required/real
* guest local behavior safe

### Admin

* lead review permission works
* staff without permission denied
* reported message/lead review works
* audit logs for sensitive actions
* export permission enforced

### Responsive

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

### Security/RLS

* guest denied private data
* wrong owner/broker/builder denied
* unassigned agent denied
* private attachments denied
* contact reveal protected
* no private data in SEO/cache/logs

---

## 64. Current Leads/CRM/Communication Status

As of this documentation generation stage:

| Area                            | Status                |
| ------------------------------- | --------------------- |
| Lead creation                   | `NOT_STARTED`         |
| Inquiry flow                    | `NOT_STARTED`         |
| Contact reveal flow             | `NOT_STARTED`         |
| Contact reveal logging          | `NOT_STARTED`         |
| Duplicate lead prevention       | `NOT_STARTED`         |
| CRM stages                      | `DOCUMENTED_BASELINE` |
| Lead notes                      | `NOT_STARTED`         |
| Follow-ups                      | `NOT_STARTED`         |
| Lead assignment                 | `NOT_STARTED`         |
| Proposal system                 | `NOT_STARTED`         |
| Requirement matching            | `NOT_STARTED`         |
| Messaging threads               | `NOT_STARTED`         |
| Message attachments             | `SETUP_REQUIRED`      |
| Unread counts                   | `NOT_STARTED`         |
| Site visits                     | `NOT_STARTED`         |
| Site visit reminders            | `SETUP_REQUIRED`      |
| Saved items                     | `NOT_STARTED`         |
| Saved searches                  | `NOT_STARTED`         |
| Recently viewed                 | `NOT_STARTED`         |
| Notifications                   | `NOT_STARTED`         |
| External notification providers | `SETUP_REQUIRED`      |
| Admin lead review               | `NOT_STARTED`         |
| RLS/security                    | `NOT_STARTED`         |
| Rate limits                     | `NOT_STARTED`         |
| Manual verification             | `NOT_STARTED`         |

---

## 65. Documentation Generation Progress

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
|       18 | `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`              | Pending |
|       19 | `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`       | Pending |
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`    | Pending |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Pending |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Pending |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Pending |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Pending |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 66. Related Documents

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
* `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`
* `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`
* `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
* `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
* `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
* implementation prompts
* manual verification prompts
* SQL migrations
* RLS policies

---

## 67. Final Leads/CRM/Communication Rule

Leads must come from real user actions.

CRM stages must be real.

Proposal statuses must be real.

Messages must be participant-only.

Site visits must be real and safely tracked.

Saved items/searches must be user-scoped.

Notifications must be DB-backed and honest.

External delivery must be real or setup-required.

Hidden contact must never leak.

Private attachments must never be public.

Wrong users must never access leads, proposals, messages or site visits.

No fake lead.

No fake message.

No fake proposal.

No fake site visit.

No fake notification.

No fake PASS.
