# prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md

# My Gujarat Property — Prompt 08: Leads, CRM, Requirements, Proposals And Messages

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 7 (broker CRM) & 9 (shared detail views)**, `design-prompts/DESIGN_ADDONS_MASTER.md`, deltas `report-batch-07/09.md`, and `docs/07` "Design Add-Ons". Locked: contact-reveal monthly quota, Call/Copy/WhatsApp, Kanban desktop-only + Move-to-stage, follow-up reminders, duplicate-lead merge, named reject/lost taxonomies, chat safety banner.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
```

This phase implements the communication and conversion foundation for **My Gujarat Property**:

* inquiries
* contact requests
* contact reveal foundation
* lead creation
* lead ownership
* lead duplicate prevention
* CRM stages
* follow-ups
* notes
* proposals
* requirement matching foundation
* messaging threads
* message attachments placeholder
* site visit foundation
* saved items
* saved searches
* recently viewed foundation
* lead-related notifications foundation
* privacy-safe communication
* RLS-protected lead data
* no hidden contact leak
* no fake leads
* no fake messages
* no fake proposal status
* no fake contact reveal
* no fake site visit
* no fake PASS

Do not expose phone/email publicly.

Do not reveal hidden contact without a real authorized flow.

Do not fake inquiry success.

Do not fake lead counts.

Do not fake unread messages.

Do not fake notifications.

Do not fake proposal acceptance.

Do not fake site visit completion.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
Prompt Number: 08
Phase: Leads, CRM, Requirements, Proposals And Messages
Type: Implementation Prompt
Matching Verification Prompt: prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
Previous Verification Prompt: prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
```

---

## 2. Phase Purpose

The purpose of this phase is to implement the foundation for communication between interested users and listing/project/requirement owners.

This phase should implement:

* inquiry flow
* lead creation
* lead ownership and participants
* lead source tracking
* duplicate lead prevention
* lead status and CRM stages
* lead detail timeline
* lead notes
* lead follow-ups
* contact request foundation
* contact reveal authorization foundation
* proposals for requirements
* proposal statuses
* basic requirement matching foundation
* message threads
* message participants
* message sending foundation
* unread count foundation
* message attachment placeholder
* block/report foundation
* site visit request foundation
* saved items
* saved searches
* recently viewed items
* notification events foundation
* dashboard integrations for owner/broker/builder
* admin oversight foundation
* privacy-safe RLS policies
* docs updates
* tests/checks
* handoff to manual verification prompt

This phase must never expose hidden contact through public UI, public API, SEO metadata, notifications, logs or messages.

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
prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md
docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md
docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md
docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md
docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect existing lead, inquiry, CRM, message, saved item, notification and requirement code before editing.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
src/app/dashboard/owner/leads/
app/dashboard/owner/leads/
src/app/dashboard/broker/leads/
app/dashboard/broker/leads/
src/app/dashboard/broker/crm/
app/dashboard/broker/crm/
src/app/dashboard/broker/proposals/
app/dashboard/broker/proposals/
src/app/dashboard/builder/leads/
app/dashboard/builder/leads/
src/app/dashboard/builder/requirements/
app/dashboard/builder/requirements/
src/app/dashboard/messages/
app/dashboard/messages/
src/app/dashboard/site-visits/
app/dashboard/site-visits/
src/app/dashboard/saved/
app/dashboard/saved/
src/app/admin/leads/
app/admin/leads/
src/components/leads/
components/leads/
src/components/crm/
components/crm/
src/components/proposals/
components/proposals/
src/components/messages/
components/messages/
src/components/site-visits/
components/site-visits/
src/components/saved/
components/saved/
src/lib/actions/leads*
lib/actions/leads*
src/lib/actions/messages*
lib/actions/messages*
src/lib/actions/proposals*
lib/actions/proposals*
src/lib/actions/site-visits*
lib/actions/site-visits*
src/lib/actions/saved*
lib/actions/saved*
src/lib/leads/
lib/leads/
src/lib/crm/
lib/crm/
src/lib/messages/
lib/messages/
src/lib/proposals/
lib/proposals/
src/lib/notifications/
lib/notifications/
src/lib/permissions/
lib/permissions/
src/lib/supabase/
lib/supabase/
src/types/leads.*
types/leads.*
src/types/messages.*
types/messages.*
supabase/migrations/
```

Search for existing:

* inquiry tables
* lead tables
* CRM tables
* proposal tables
* message tables
* site visit tables
* saved item tables
* notification tables
* contact reveal code
* hidden contact exposure
* duplicate lead prevention
* fake leads
* fake unread counts
* fake messages
* fake proposals
* fake site visits
* direct URL bypass
* RLS policies
* service role in client

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement:

### 5.1 Inquiry And Lead Foundation

* inquiry/contact request action
* lead creation from property/project/requirement/detail CTA
* lead source tracking
* lead participants
* lead owner/uploader access
* lead requester access
* duplicate prevention
* lead timeline
* lead statuses
* CRM stages
* follow-up dates
* lead notes
* lead tags if safe
* dashboard lead pages

### 5.2 Contact Reveal Foundation

* contact request table
* contact reveal status
* reveal approval/authorization foundation
* contact sharing consent
* hidden contact protection
* no direct phone/email reveal unless authorized and implemented
* audit/contact reveal events
* rate limit placeholder

### 5.3 Proposals And Requirement Matching

* proposal table
* proposal creation for matching requirement/property/project flows
* proposal statuses
* proposal timeline/events
* requirement match score foundation
* transparent/simple matching logic
* builder access to matching buying requirements
* broker proposals to requirements
* no fake matching score

### 5.4 Messaging Foundation

* message threads
* participants
* messages
* unread counts from real DB
* message statuses
* attachments placeholder
* block/report foundation
* safe private messaging UI
* no fake messages

### 5.5 Site Visits

* site visit request table
* scheduling foundation
* statuses
* reschedule/cancel foundation
* reminders placeholder
* safety notice
* no fake site visit completion

### 5.6 Saved Items / Saved Searches / Recently Viewed

* saved properties/projects/requirements
* saved searches
* recently viewed foundation
* login sync foundation
* no fake saved items
* no fake recently viewed
* RLS own-user only

### 5.7 Notifications Foundation

* create notification events for lead/message/proposal/site visit actions if notification table exists
* no fake unread count
* provider delivery later
* notification center integration if safe

### 5.8 Docs

Update all memory docs.

---

## 6. Out Of Scope For This Phase

Do not fully implement:

* billing/payment/Razorpay
* media storage/R2/CDN upload
* WhatsApp Business API
* SMS/email delivery
* full notification delivery providers
* advanced analytics
* AI lead scoring
* AI recommendations
* AI chat
* full admin dispute/fraud resolution
* full calendar provider integration
* full PWA push
* full CRM automation
* full proposal payment/booking
* full legal agreement/e-signature
* full brokerage/payment settlement

This phase may create safe placeholders/foundations for these later modules.

---

## 7. Hard Privacy Rules

Claude must enforce:

```txt id="hard-privacy-rules"
Hidden contact must not leak.
Phone/email must not appear in public UI.
Phone/email must not appear in public API responses.
Phone/email must not appear in metadata/schema/sitemap.
Phone/email must not appear in unauthenticated contact CTA.
Phone/email must not appear in notifications to unauthorized users.
Phone/email must not appear in logs/errors.
Contact reveal must require auth and authorization.
Contact sharing consent must be recorded where applicable.
```

Forbidden:

* public phone reveal
* public email reveal
* fake contact reveal
* fake inquiry success
* fake lead count
* fake message unread count
* fake proposal acceptance
* fake site visit
* contact in client payload before authorized
* frontend-only contact hiding

---

## 8. Main Entities To Implement Or Reuse

Possible tables:

```txt id="lead-system-tables"
leads
lead_participants
lead_events
lead_notes
lead_followups
contact_requests
contact_reveals
proposals
proposal_events
message_threads
message_participants
messages
message_attachments
site_visits
saved_items
saved_searches
recently_viewed_items
notification_events
user_blocks
user_reports
```

Use existing tables if present.

Do not duplicate tables.

If a subset is implemented, document status accurately.

---

## 9. Lead Sources

Lead sources should include:

```txt id="lead-sources"
property_detail_contact
property_detail_inquiry
project_detail_contact
project_detail_inquiry
requirement_detail_proposal
requirement_match
search_card_contact
profile_contact
dashboard_manual
admin_manual
support_escalation
```

Rules:

* source must be real
* no fake source
* no hidden contact leak in source metadata
* source links to safe entity reference
* source entity must be public-safe or user-owned

---

## 10. Lead Status Values

Lead status values:

```txt id="lead-status-values"
new
open
contact_requested
contact_shared
contact_denied
contacted
interested
follow_up
site_visit_requested
site_visit_scheduled
proposal_sent
negotiation
converted
lost
closed
spam
blocked
archived
```

CRM stage values:

```txt id="crm-stage-values"
new
contacted
interested
follow_up
site_visit
proposal
negotiation
converted
lost
closed
```

Rules:

* stage changes audited/timeline tracked
* user can only update leads they own/participate in
* wrong user denied
* public denied
* admin oversight permission-scoped
* no fake converted status

---

## 11. Lead Ownership Rules

Lead ownership depends on source.

### Property Lead

* requester is interested user
* receiver is property owner/broker
* property owner/broker can view lead
* requester can view own inquiry status
* wrong user denied

### Project Lead

* requester is interested user
* receiver is builder/project owner
* builder can view project lead
* requester can view own inquiry status
* wrong user denied

### Requirement Proposal Lead

* requirement owner/broker owns requirement
* proposing broker/builder may participate based on allowed flow
* builder may see matching buying requirements later if role-scoped
* contact hidden until authorized

### Admin

* admin/staff can view according to permission
* sensitive data masked unless permission

---

## 12. Duplicate Lead Prevention

Prevent duplicate leads for:

* same requester
* same target entity
* same lead source group
* same active status window

Duplicate rule examples:

```txt id="duplicate-lead-rules"
same requester + property_id + active lead → reuse existing lead
same requester + project_id + active lead → reuse existing lead
same proposer + requirement_id + active proposal → update/reuse existing proposal
same requester repeated contact click → update event, not duplicate lead
```

Rules:

* do not create many duplicate leads on double click
* idempotency key recommended
* duplicate attempt creates event if useful
* user sees existing inquiry status
* no fake duplicate count

---

## 13. Inquiry Flow Requirements

Public detail/contact CTA flow:

1. guest clicks inquiry/contact
2. auth popup opens
3. after login, intent resumes
4. user confirms inquiry/contact request
5. consent captured if contact sharing required
6. lead/contact request created
7. target owner/broker/builder notified through DB event if notification foundation exists
8. requester sees inquiry status
9. hidden contact remains hidden unless reveal authorized

Rules:

* no fake inquiry success
* no phone/email reveal before authorization
* no lead creation for unauthenticated user unless guest lead flow explicitly approved
* no hidden contact in response payload
* safe error on failure

---

## 14. Contact Request And Reveal Requirements

Possible contact request statuses:

```txt id="contact-request-statuses"
requested
pending_owner_response
approved
rejected
expired
cancelled
blocked
```

Possible contact reveal statuses:

```txt id="contact-reveal-statuses"
not_revealed
pending
revealed_to_requester
revealed_to_owner
revealed_to_both
denied
expired
revoked
```

Rules:

* default not revealed
* contact reveal requires auth
* reveal requires authorization or product-approved rule
* reveal event audited
* reveal may be one-sided or both-sided based on product rule
* reveal result shown only to authorized participant
* phone/email never in public-safe views
* contact reveal can be rate-limited
* contact reveal may require plan/verification later
* no fake reveal

If reveal rules are not fully implemented, show setup-required/pending state and keep contact hidden.

---

## 15. Consent Requirements

Capture consent for:

* terms/privacy already done in auth phase
* contact sharing before reveal
* message communication consent where applicable
* marketing opt-in optional
* WhatsApp/SMS/email communication later provider-specific

Suggested consent event fields:

* profile_id
* consent_type
* target_type
* target_id
* accepted
* policy_version
* created_at

Rules:

* do not precheck marketing opt-in
* transactional communication can follow platform terms
* contact sharing consent must be explicit where required
* consent records private
* no fake consent

---

## 16. Lead Timeline / Events

Lead events may include:

```txt id="lead-event-types"
lead_created
contact_requested
contact_approved
contact_rejected
message_sent
proposal_sent
proposal_viewed
proposal_accepted
proposal_rejected
site_visit_requested
site_visit_scheduled
site_visit_rescheduled
site_visit_cancelled
site_visit_completed
stage_changed
note_added
followup_created
followup_completed
lead_closed
lead_reopened
lead_archived
```

Rules:

* events real only
* no fake timeline entries
* sensitive data masked
* participants see only allowed events
* admin/staff permission-scoped
* immutable where possible

---

## 17. Lead Notes

Lead notes can be:

* private user note
* team/internal note
* admin note
* system note

Rules:

* note visibility must be explicit
* public user cannot read admin notes
* requester cannot read receiver private notes
* receiver cannot read requester private notes unless shared
* notes cannot contain secrets/OTP
* notes sanitized
* note actions audited if needed

---

## 18. Follow-Up Foundation

Follow-ups may include:

* due date/time
* title
* note
* status
* assigned user
* reminder placeholder

Follow-up statuses:

```txt id="followup-statuses"
pending
completed
missed
cancelled
rescheduled
```

Rules:

* follow-ups private to lead owner/participant
* notifications/reminders provider later
* no fake reminders
* no fake completed follow-up
* no wrong-user access

---

## 19. CRM Kanban Foundation

If implemented, CRM board should:

* show real leads only
* group by stage
* allow drag/drop only if safe and server-validated
* update stage server-side
* log stage event
* no fake leads
* no fake counts
* no hidden contact leak
* paginate/limit columns if large

If not implemented, list/table CRM is acceptable.

---

## 20. Proposal System Requirements

Proposals connect a user/entity to a requirement or lead.

Possible proposal target types:

```txt id="proposal-target-types"
requirement
property
project
lead
```

Proposal statuses:

```txt id="proposal-statuses"
draft
sent
viewed
shortlisted
accepted
rejected
negotiation
withdrawn
expired
archived
```

Proposal fields may include:

* proposal title
* proposer profile
* recipient profile
* related requirement
* related property/project
* message
* price/rent offer
* terms summary
* availability
* validity date
* status
* created_at
* updated_at

Rules:

* no fake accepted status
* recipient can view proposal only if participant
* proposer can edit draft/withdraw own proposal
* accepted/rejected events real
* hidden contact stays hidden unless reveal authorized
* proposal cannot be public SEO page

---

## 21. Requirement Matching Foundation

Matching can be simple and transparent.

Allowed matching factors:

* city/location
* purpose
* category
* type
* budget range
* area range
* BHK/preferences
* possession timeline

Matching score rules:

* if implemented, show simple score only if computed from real fields
* do not call AI
* do not fake match score
* show why matched in simple text if possible
* builder may see matching buying requirements only if role-scoped and public/scoped rules allow
* contact hidden

If matching is not implemented, show setup/coming later.

---

## 22. Builder Requirement Access Rules

Builder may need to see buying requirements that match projects.

Rules:

* builder can see only approved/scoped matching requirements if allowed
* requirement contact hidden
* builder can send proposal/contact request
* no buyer phone/email reveal
* no private requirement notes
* no wrong-builder unrestricted access to private requirements
* RLS/scoped view required

If requirement visibility is uncertain, keep builder access setup-required/partial and protect privacy.

---

## 23. Messaging System Requirements

Messaging foundation may include:

* message threads
* participants
* messages
* unread counts
* thread types
* message statuses
* archive/block/report foundation

Thread types:

```txt id="message-thread-types"
lead
proposal
requirement
site_visit
support_placeholder
```

Message statuses:

```txt id="message-statuses"
sent
delivered
read
failed
deleted
hidden_by_moderation
```

Rules:

* only participants can view thread
* sender/recipient must be participants
* public denied
* wrong user denied
* messages sanitized
* no hidden contact auto-included
* no fake unread count
* no fake delivered/read unless tracked
* admin access permission-scoped

---

## 24. Message Attachments Placeholder

Full media upload comes later.

If attachments appear:

* show setup-required if media not ready
* no fake attachment upload
* no private file public URL
* file type/size validation if implemented
* RLS ownership
* malware scan placeholder if needed
* no contact leak through attachment metadata

If not implemented, hide or disable attachment button.

---

## 25. Message Privacy Rules

Messages must not expose:

* private contact unless user typed it voluntarily and policy allows
* hidden listing contact from DB
* admin notes
* provider secrets
* private docs
* other threads
* wrong participants

Optional moderation:

* warn if phone/email typed in message before reveal
* flag contact-sharing attempts if product requires controlled reveal
* do not silently publish hidden contact

---

## 26. Blocking And Reporting Foundation

Implement or prepare:

* block user
* report message/thread/user/listing
* report categories
* admin review later
* status tracking

Report categories:

```txt id="report-categories"
spam
fraud
abuse
wrong_information
duplicate
illegal_content
contact_abuse
payment_abuse
harassment
other
```

Rules:

* no fake report success
* report requires auth
* report private
* reported user not exposed unnecessarily
* admin/fraud module later
* block affects messaging/contact attempts if implemented

---

## 27. Site Visit Foundation

Site visit statuses:

```txt id="site-visit-statuses"
requested
accepted
scheduled
rescheduled
cancelled
completed
no_show
rejected
expired
```

Site visit fields may include:

* lead_id
* property_id/project_id
* requester_profile_id
* host_profile_id
* scheduled_at
* meeting_location_type
* meeting_note
* status
* cancel_reason
* feedback placeholder
* created_at
* updated_at

Rules:

* site visit requires lead/participant relationship
* wrong user denied
* no fake scheduled/completed state
* reminders provider later
* calendar integration later
* safe meeting notice shown
* contact hidden unless authorized

---

## 28. Site Visit Safety Notice

Show safety copy:

```txt id="site-visit-safety-copy"
For site visits, meet in safe/public conditions when possible, verify property details independently, and do not make payments outside trusted verified processes.
```

Do not provide legal guarantee.

Do not fake platform verification.

---

## 29. Saved Items Requirements

Saved item types:

```txt id="saved-item-types"
property
project
requirement
broker_profile
builder_profile
search
```

Rules:

* requires auth for DB save
* guest save triggers auth or local temporary state if implemented
* user can view own saved items only
* wrong user denied
* duplicate save prevented
* unsave works
* no fake saved items
* saved item points to public-safe entity
* deleted/unavailable saved item shows unavailable safely

---

## 30. Saved Searches Requirements

Saved search should store:

* user profile
* query params
* title/name
* alert preference
* created_at
* updated_at

Rules:

* user can manage own saved searches only
* alerts/notifications provider later
* no fake alerts
* invalid query params sanitized
* no private data in saved search
* no unbounded alert jobs in this phase

---

## 31. Recently Viewed Requirements

Recently viewed foundation:

* user-owned if logged in
* local guest recent optional if already exists
* DB sync only after login if implemented
* deduplication
* max limit
* private to user
* no fake recent items
* no public exposure

If not implemented, show placeholder.

---

## 32. Notification Event Foundation

If notification table/foundation exists, create notification events for:

* new lead
* contact request
* contact reveal approved/rejected
* new message
* proposal sent
* proposal viewed/accepted/rejected
* site visit requested
* site visit scheduled/rescheduled/cancelled
* follow-up due placeholder
* saved search alert placeholder later

Rules:

* notification record must be real
* unread count real only
* no fake notification
* no hidden contact in notification payload
* provider delivery later
* notification deep link safe and permission-checked

---

## 33. Dashboard Integration Requirements

### Owner Dashboard

Add/fix:

* leads page
* inquiry status page/foundation
* saved items
* messages
* site visits
* follow-ups if applicable
* no fake leads

### Broker Dashboard

Add/fix:

* leads/CRM
* proposals
* messages
* follow-ups
* site visits
* saved items
* requirement leads
* no fake pipeline

### Builder Dashboard

Add/fix:

* project leads
* matching requirements
* proposals
* messages
* site visits
* ads leads placeholder if ads not implemented
* no fake leads/matches

All dashboards must show own/participant data only.

---

## 34. Admin Oversight Requirements

Admin/staff may need oversight for abuse/support.

This phase may add admin placeholder pages or integrate with Prompt 07.

Admin oversight:

* lead list permission-scoped
* report/fraud queue placeholder
* message moderation placeholder
* contact reveal audit/log view placeholder
* no hidden contact to unauthorized staff
* no private messages visible unless permission and policy allow
* actions audited

If full admin oversight not implemented, document `PARTIAL`.

---

## 35. RLS Requirements

RLS must protect all lead/communication tables.

General rules:

* public denied
* participants can read own leads/threads/proposals/site visits
* entity owner/uploader can read related leads
* requester can read own inquiry status
* sender/recipient can read own messages
* wrong user denied
* admin/staff permission-scoped
* service role server-only
* no hidden contact public
* no private notes to wrong participant
* no admin notes to public users

Frontend hiding is not security.

---

## 36. RLS Table Expectations

If tables are created, enable RLS for:

```txt id="rls-tables"
leads
lead_participants
lead_events
lead_notes
lead_followups
contact_requests
contact_reveals
proposals
proposal_events
message_threads
message_participants
messages
message_attachments
site_visits
saved_items
saved_searches
recently_viewed_items
notification_events
user_blocks
user_reports
```

If any private communication table lacks RLS:

* do not mark complete
* create bug
* mark implementation result `PARTIAL` or `FAIL`

---

## 37. SQL Migration Rule

If DB changes are needed, create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_leads_crm_requirements_proposals_messages.sql
```

Migration must include:

* purpose
* phase: Prompt 08
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

## 38. Suggested Indexes

Add/verify indexes for:

### Leads

* requester_profile_id
* receiver_profile_id
* target_type
* target_id
* status
* crm_stage
* source
* created_at
* updated_at

### Lead Participants

* lead_id
* profile_id
* participant_role

### Contact Requests / Reveals

* lead_id
* requester_profile_id
* receiver_profile_id
* status
* created_at

### Proposals

* proposer_profile_id
* recipient_profile_id
* requirement_id
* property_id
* project_id
* status
* created_at

### Messages

* thread_id
* sender_profile_id
* created_at
* status

### Message Participants

* thread_id
* profile_id
* last_read_at

### Site Visits

* lead_id
* requester_profile_id
* host_profile_id
* scheduled_at
* status

### Saved/Recent

* profile_id
* item_type
* item_id
* created_at

### Notifications

* recipient_profile_id
* notification_type
* read_at
* created_at

---

## 39. Server Action / API Requirements

Implement safe server actions/API routes for:

```txt id="server-actions"
create_inquiry
create_or_get_lead
request_contact_reveal
approve_contact_reveal
reject_contact_reveal
update_lead_stage
add_lead_note
create_followup
complete_followup
send_proposal
update_proposal_status
create_message_thread
send_message
mark_thread_read
archive_thread
block_user
report_user_or_message
request_site_visit
respond_site_visit
reschedule_site_visit
cancel_site_visit
save_item
unsave_item
save_search
delete_saved_search
track_recently_viewed
```

Only implement what is in scope and safe.

Each action must:

* require auth
* validate input
* verify participant/ownership/role
* enforce RLS
* prevent duplicates where needed
* sanitize text
* protect hidden contact
* create audit/event where needed
* return safe typed errors
* not expose secrets/private data

---

## 40. Error Handling Rules

Use safe errors:

```txt id="safe-errors"
AUTH_REQUIRED
ROLE_NOT_ALLOWED
FORBIDDEN
ENTITY_NOT_FOUND
LEAD_NOT_FOUND
THREAD_NOT_FOUND
NOT_PARTICIPANT
CONTACT_REVEAL_NOT_AUTHORIZED
CONTACT_ALREADY_REQUESTED
DUPLICATE_LEAD
VALIDATION_ERROR
RATE_LIMITED
SETUP_REQUIRED
MESSAGING_SETUP_REQUIRED
MEDIA_PROVIDER_SETUP_REQUIRED
NOTIFICATION_PROVIDER_SETUP_REQUIRED
INVALID_STATUS_TRANSITION
UNKNOWN_ERROR
```

Do not expose:

* SQL errors
* stack traces
* service role
* provider secrets
* hidden contact
* private notes
* private profile data
* message content to non-participants

---

## 41. Input Validation Rules

Validate:

* target entity type
* target entity ID
* lead ID
* thread ID
* participant IDs
* message body length
* message content safety
* proposal fields
* budget/price values
* site visit date/time
* follow-up date/time
* saved search query params
* report category
* block target
* status transitions
* role permission

Invalid data must not be saved.

---

## 42. Status Transition Rules

Lead status transitions should be validated.

Example:

```txt id="lead-status-transitions"
new → open
open → contact_requested
contact_requested → contact_shared
contact_requested → contact_denied
open → contacted
contacted → interested
interested → follow_up
follow_up → site_visit_requested
site_visit_requested → site_visit_scheduled
site_visit_scheduled → negotiation
negotiation → converted
negotiation → lost
any active → closed
any active → spam
any active → blocked
closed → archived
```

Proposal transitions:

```txt id="proposal-status-transitions"
draft → sent
sent → viewed
sent → shortlisted
viewed → shortlisted
shortlisted → negotiation
negotiation → accepted
negotiation → rejected
sent → withdrawn
sent → expired
accepted → archived
rejected → archived
```

Site visit transitions:

```txt id="site-visit-status-transitions"
requested → accepted
accepted → scheduled
scheduled → rescheduled
scheduled → completed
scheduled → no_show
requested → rejected
scheduled → cancelled
rescheduled → completed
any active → expired
```

Do not allow arbitrary status change by unauthorized user.

---

## 43. Rate Limit / Abuse Rules

Add or prepare rate limiting for:

* inquiry creation
* contact request
* message sending
* proposal sending
* site visit request
* report creation
* save/unsave spam
* follow-up creation

If rate limiting not implemented:

* document `PARTIAL`
* update security checklist
* no fake protection claim

Add duplicate prevention and safe debounce for double-click actions.

---

## 44. Notification Provider Boundary

This phase may create DB notification events.

Do not implement external delivery unless already safe.

Provider delivery later:

* email
* SMS
* WhatsApp
* push
* digest

Rules:

* DB notification event can be created
* external provider missing → `SETUP_REQUIRED`
* no fake SMS/WhatsApp/email sent
* no hidden contact in notification payload
* unread count real only

---

## 45. Message Delivery Boundary

In-app messages can be DB-backed.

Do not fake:

* delivered
* read
* online
* typing
* realtime

If realtime not implemented:

* use refresh/polling or static list
* mark realtime `NOT_STARTED`/`PARTIAL`
* no fake typing indicator
* no fake online status

---

## 46. Contact Reveal And Billing Boundary

Contact reveal may later require:

* active plan
* contact unlock limit
* verification status
* payment
* owner approval
* admin rules

This phase should:

* protect contact by default
* create reveal status foundation
* not enforce fake paid unlock
* not fake plan
* not fake payment
* mark billing gate setup-required if needed

---

## 47. UI Requirements

Lead/CRM UI must include:

* dashboard lead lists
* status/stage badges
* filters
* search
* pagination
* detail view/drawer
* timeline
* notes
* follow-up
* contact request status
* proposal list/detail
* message thread UI
* site visit request UI
* saved items UI
* empty states
* loading states
* error states
* unauthorized states
* setup-required states
* mobile responsive cards

No dead buttons.

No `href="#"`.

---

## 48. Lead List UI

Lead list should show:

* lead title/target
* source
* target entity
* participant safe names
* status
* CRM stage
* last activity
* created date
* next follow-up if real
* action menu

Do not show:

* hidden phone/email
* fake lead score
* fake urgency
* fake conversion probability
* fake unread message count

---

## 49. Lead Detail UI

Lead detail should show:

* target entity summary
* participant safe names
* status/stage
* timeline
* notes based on visibility
* follow-ups
* proposal section
* message thread
* site visit section
* contact reveal status
* allowed actions

Do not show:

* hidden contact unless authorized
* admin notes to public users
* private notes to wrong participant
* fake timeline events
* fake proposal state

---

## 50. CRM Board/List UI

If board implemented:

* columns real stages
* lead cards real
* drag/drop server-validated
* mobile alternative list
* no fake counts
* no hidden contact
* no wrong-user leads

If list only:

* stage filter
* status filter
* safe actions
* pagination

---

## 51. Proposal UI

Proposal UI should support:

* create/send proposal if role/flow allows
* view sent/received proposals
* status badge
* related requirement/property/project link
* message/terms summary
* withdraw/reject/accept where allowed
* timeline/events if implemented

Rules:

* no fake accepted status
* no fake viewed status unless tracked
* no contact reveal through proposal
* recipient-only actions protected

---

## 52. Messaging UI

Messaging UI should support:

* thread list
* message list
* compose box
* send button
* read/unread state if real
* empty state
* attachment disabled/setup-required if not implemented
* block/report action

Rules:

* only participants
* no wrong-thread access
* no fake unread count
* no fake delivery/read
* no hidden contact injected
* sanitize messages

---

## 53. Site Visit UI

Site visit UI should support:

* request visit
* choose date/time if implemented
* accept/reject/reschedule/cancel actions
* status display
* safety notice
* reminder placeholder
* no fake completion

Rules:

* participant-only
* valid lead/entity required
* no hidden contact leak
* no calendar provider fake

---

## 54. Saved Items UI

Saved items UI should show:

* saved properties
* saved projects
* saved requirements if allowed
* saved profiles if allowed
* unavailable item state
* unsave action
* no fake saved items
* own data only
* pagination/limits

---

## 55. Saved Search UI

Saved search UI should show:

* saved search title
* query summary
* alert preference
* edit/delete
* run search link
* no fake alert
* no provider delivery fake
* own data only

---

## 56. Recently Viewed UI

Recently viewed UI should show:

* real recently viewed items
* deduplicated
* limited list
* unavailable item state
* own data only
* no fake recent items

If not implemented, show placeholder.

---

## 57. Admin UI Integration

If adding admin oversight:

* lead list permission-scoped
* message/report oversight permission-scoped
* contact reveal audit permission-scoped
* no full message snooping unless explicit policy/permission
* sensitive data masked
* no fake queues
* no provider secrets

If not implemented, document placeholder.

---

## 58. Responsive Requirements

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

Required:

* lead lists become cards
* CRM board mobile fallback
* message thread usable
* proposal forms usable
* site visit forms usable
* saved item cards fit
* filters in drawer/bottom sheet
* no horizontal scroll
* sticky message composer not covering content
* CTAs tappable
* action menus usable

---

## 59. Accessibility Requirements

UI must include:

* semantic headings
* labels for inputs
* aria labels for icon buttons
* focus visible
* keyboard navigation
* status not color-only
* message composer accessible
* thread list accessible
* modal/drawer focus behavior safe
* error text readable
* large mobile tap targets
* confirmation dialogs for destructive actions

---

## 60. Performance Requirements

Implementation must:

* paginate lead/message/proposal lists
* limit message fetch per thread
* avoid loading all messages
* avoid N+1 profile queries
* avoid unbounded saved/recent lists
* index notification/unread queries
* avoid realtime overuse
* avoid provider SDKs unless needed
* keep private pages no-store
* cache only public-safe data

---

## 61. Security / Privacy Deep Requirements

Must protect:

* hidden contact
* message threads
* lead details
* private notes
* follow-ups
* proposal terms
* site visit schedule
* saved items
* saved searches
* report/fraud data
* notification payloads
* private profile data

Must not:

* expose wrong user data
* expose contact through notifications
* expose contact through messages automatically
* expose contact through logs/errors
* expose hidden contact in timeline
* expose admin notes to users
* expose private notes to other participant
* expose service role/provider secrets

---

## 62. Public SEO Boundary

Lead/CRM/messages/proposals/site visits pages are private.

Rules:

* noindex
* not in sitemap
* not public cache
* not public search
* no metadata with private content
* no share links exposing private thread/lead unless auth-guarded

---

## 63. SQL / RLS Testing Expectations

Implementation should support testing:

* guest cannot create lead without auth flow
* owner/broker/builder can only see participant leads
* wrong user cannot see lead
* wrong user cannot see message thread
* wrong user cannot send message
* wrong user cannot update proposal
* wrong user cannot view site visit
* wrong user cannot view saved items
* public cannot read communication tables
* staff/admin access permission-scoped
* hidden contact not in public views/payloads

---

## 64. Tests / Checks To Run

Run available:

```txt id="checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

* RLS tests
* server action tests
* lead duplicate tests
* message participant tests
* proposal status tests
* site visit status tests
* saved item tests
* route guard tests
* responsive smoke checks

If script missing, document `NOT_CONFIGURED`.

Do not claim tests passed if not run.

---

## 65. Manual Smoke Checks If App Runs

If app can run, check:

* guest contact CTA opens auth/setup-required
* logged-in user can create inquiry
* duplicate inquiry does not create duplicate active lead
* receiver sees lead
* wrong user cannot see lead
* contact remains hidden
* lead stage update works for allowed participant
* note visibility works
* proposal can be sent if allowed
* wrong user cannot view proposal
* message thread participants only
* wrong user cannot read thread
* site visit request participant-only
* saved item save/unsave own only
* unread counts are real or hidden/no-data
* dashboard modules no fake data
* private pages noindex/no public cache

Record results.

Full verification in matching manual prompt.

---

## 66. API Provider Status Updates

Update `API_PROVIDER_STATUS.md` if relevant.

Potential statuses:

* Notification provider: `NOT_STARTED`/`SETUP_REQUIRED`
* Email provider: `NOT_STARTED`/`SETUP_REQUIRED`
* SMS provider: `NOT_STARTED`/`SETUP_REQUIRED`
* WhatsApp provider: `NOT_STARTED`/`SETUP_REQUIRED`
* Media/R2 for message attachments: `SETUP_REQUIRED`
* Calendar/reminder provider: `NOT_STARTED`
* Realtime provider: `NOT_STARTED`/`PARTIAL`
* Supabase Database/RLS: updated if migrations applied

Do not mark provider active without real test.

---

## 67. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

* inquiry flow
* lead creation
* duplicate lead prevention
* lead participants
* lead statuses
* CRM stages
* lead timeline/events
* lead notes
* follow-ups
* contact request foundation
* contact reveal foundation
* contact sharing consent
* proposals
* proposal statuses
* proposal timeline/events
* requirement matching foundation
* builder matching requirement access
* message threads
* message participants
* message sending
* unread count foundation
* message attachments placeholder
* block/report foundation
* site visit foundation
* site visit statuses
* saved items
* saved searches
* recently viewed
* notification events foundation
* owner lead dashboard
* broker CRM dashboard
* builder project lead/matching dashboard
* admin oversight placeholder
* RLS communication tables
* hidden contact protection
* no fake leads/messages/proposals checks
* responsive communication UI

Use accurate statuses.

---

## 68. Changelog Update

Update `CHANGELOG.md`.

Include:

* date
* Prompt 08
* summary
* changed files
* new routes
* migration files if any
* RLS/security changes
* provider status changes
* docs updated
* tests/checks run
* known issues
* rollback notes
* manual verification pending

---

## 69. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* hidden contact leak
* public lead access
* wrong user lead access
* wrong user message access
* duplicate lead creation
* fake inquiry success
* fake contact reveal
* fake lead count
* fake unread count
* fake message delivered/read
* fake proposal accepted
* fake site visit completed
* proposal wrong participant access
* site visit wrong participant access
* saved item wrong user access
* notification leaks contact
* admin notes visible to public user
* private notes visible to wrong participant
* RLS missing
* migration missing
* no rollback notes
* build/typecheck failure
* mobile message UI broken
* private page indexable

---

## 70. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 08 implementation status
* manual verification pending:

  * `prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`
* routes/features needing verification
* RLS tests pending
* contact privacy checks pending
* responsive checks pending
* setup-required providers
* known bugs

Do not mark manual verification PASS from implementation prompt alone.

---

## 71. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md`.

Include:

* lead RLS
* message RLS
* proposal RLS
* site visit RLS
* saved item RLS
* hidden contact protection
* contact reveal authorization
* notification payload privacy
* private notes/admin notes privacy
* wrong participant denial
* no public index/cache
* service role client exposure check
* provider secret check
* rate limit/abuse status
* known issues

---

## 72. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md`.

Include:

* lead list pagination
* message thread pagination
* proposal list pagination
* saved/recent limit
* notification index
* no unbounded reads
* no N+1 participant/profile queries
* private no-store pages
* no heavy provider SDKs
* build status
* future load test notes

---

## 73. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

Include:

* route/component changes
* migration path if any
* communication tables
* RLS policies
* indexes
* rollback notes
* data privacy risk
* private cache/session risk
* provider setup-required notes
* post-deploy smoke checks

If migration exists, rollback notes are mandatory.

---

## 74. Brain Update

Update `brain.md`.

Include:

* Prompt 08 implementation summary
* changed files
* routes added/changed
* migration files if any
* lead/contact/message/proposal/site visit status
* hidden contact status
* RLS status
* provider setup-required status
* bugs/blockers
* tests/checks run
* next prompt:

  * `prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`
* exact resume instruction

---

## 75. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
src/app/dashboard/owner/leads/*
src/app/dashboard/broker/leads/*
src/app/dashboard/broker/crm/*
src/app/dashboard/broker/proposals/*
src/app/dashboard/builder/leads/*
src/app/dashboard/builder/requirements/*
src/app/dashboard/messages/*
src/app/dashboard/site-visits/*
src/app/dashboard/saved/*
src/app/admin/leads/*
src/components/leads/*
src/components/crm/*
src/components/proposals/*
src/components/messages/*
src/components/site-visits/*
src/components/saved/*
src/lib/actions/leads.ts
src/lib/actions/messages.ts
src/lib/actions/proposals.ts
src/lib/actions/site-visits.ts
src/lib/actions/saved.ts
src/lib/leads/*
src/lib/crm/*
src/lib/messages/*
src/lib/proposals/*
src/lib/notifications/*
src/lib/permissions/communication-permissions.ts
src/types/leads.ts
src/types/messages.ts
src/types/proposals.ts
src/types/site-visits.ts
supabase/migrations/*_leads_crm_requirements_proposals_messages.sql
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

## 76. Expected Output From This Phase

At the end of Prompt 08 implementation, project should have:

* inquiry/lead foundation
* duplicate lead prevention
* lead participant model
* CRM statuses/stages
* lead notes/follow-ups
* contact request/reveal foundation
* proposals foundation
* requirement matching foundation
* messaging foundation
* site visit foundation
* saved items/searches/recently viewed foundation
* notification event foundation
* dashboard integrations
* RLS policies
* hidden contact protection
* no fake communication data
* docs updated
* checks run
* manual verification pending

---

## 77. Forbidden Outcomes

This phase must not leave:

* hidden contact leak
* public lead access
* wrong user lead access
* wrong user message access
* wrong participant proposal access
* fake inquiry success
* fake contact reveal
* fake lead count
* fake unread count
* fake message delivery/read
* fake proposal acceptance
* fake site visit completion
* fake notifications
* private notes visible to wrong user
* admin notes visible to public user
* communication pages indexable
* private communication data public cached
* service role in client
* provider secrets exposed
* DB changes without migration
* RLS missing on private tables
* docs outdated
* manual verification skipped

---

## 78. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* messaging foundation works but realtime not implemented
* contact reveal foundation exists but actual reveal remains setup-required
* proposal foundation partial
* site visit foundation partial
* saved/recent items partial
* notification provider delivery setup-required
* message attachments setup-required
* RLS runtime tests pending
* responsive/browser checks pending
* admin oversight placeholder only

### `FAIL`

Use if:

* build fails
* hidden contact leaks
* public can read leads/messages
* wrong user can read lead/thread/proposal/site visit
* fake inquiry/contact reveal/message/proposal/site visit appears real
* unread count fake
* notification leaks contact
* private pages indexable/public cached
* service role/provider secret exposed
* DB changes missing migration
* RLS missing on private tables

### `BLOCKED`

Use if:

* Prompt 04 entity foundation failed
* Prompt 06 dashboards failed
* Prompt 07 admin foundation failed and admin oversight required
* Supabase/RLS unavailable blocks safe communication implementation
* auth/session unavailable
* package/build baseline broken
* architecture conflict needs owner decision

### `SETUP_REQUIRED`

Use for:

* notification provider missing
* email/SMS/WhatsApp provider missing
* media/R2 missing for attachments
* realtime provider missing
* calendar/reminder provider missing
* Supabase env missing

Setup-required is acceptable only if no fake functionality appears and privacy is protected.

---

## 79. Final Response Required Format

Return final response in this structure:

```txt id="prompt-08-final-response-format"
Summary:
- what leads/CRM/proposals/messages foundation was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Lead/CRM:
- inquiry flow:
- lead creation:
- duplicate prevention:
- participants:
- stages/statuses:
- notes/follow-ups:

Contact privacy:
- contact request:
- contact reveal:
- consent:
- hidden contact protection:

Proposals/matching:
- proposals:
- proposal statuses:
- requirement matching:
- builder matching access:

Messages:
- threads:
- participants:
- sending:
- unread:
- attachments:

Site visits:
- request/schedule:
- statuses:
- safety notice:

Saved/recent:
- saved items:
- saved searches:
- recently viewed:

Notifications:
- DB events:
- provider delivery:

Dashboard/admin integration:
- owner:
- broker:
- builder:
- admin:

RLS/security:
- tables:
- policies:
- wrong participant denial:
- private cache/noindex:
- service role/provider secrets:

Provider/setup-required:
- notifications:
- email/SMS/WhatsApp:
- media/R2:
- realtime:
- calendar/reminders:

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
- privacy/cache:

Manual verification:
- pending prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md

Next step:
- run prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
```

Do not say only “done”.

---

## 80. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
```

Do not start Prompt 09 until Prompt 08 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 81. Common Bugs To Watch For

Create/track bugs for:

* `BUG-LEADS-HIDDEN-CONTACT-LEAK`
* `BUG-LEADS-PUBLIC-ACCESS`
* `BUG-LEADS-WRONG-USER-ACCESS`
* `BUG-LEADS-DUPLICATE-CREATE`
* `BUG-LEADS-FAKE-INQUIRY`
* `BUG-CONTACT-FAKE-REVEAL`
* `BUG-CONTACT-UNAUTHORIZED-REVEAL`
* `BUG-MESSAGES-WRONG-THREAD-ACCESS`
* `BUG-MESSAGES-FAKE-UNREAD`
* `BUG-MESSAGES-FAKE-DELIVERED`
* `BUG-MESSAGES-HIDDEN-CONTACT-LEAK`
* `BUG-PROPOSAL-WRONG-PARTICIPANT`
* `BUG-PROPOSAL-FAKE-ACCEPTED`
* `BUG-SITEVISIT-WRONG-PARTICIPANT`
* `BUG-SITEVISIT-FAKE-COMPLETED`
* `BUG-SAVED-WRONG-USER-ACCESS`
* `BUG-NOTIFICATION-CONTACT-LEAK`
* `BUG-COMM-PRIVATE-PAGE-INDEXABLE`
* `BUG-COMM-PRIVATE-CACHE`
* `BUG-COMM-RLS-MISSING`
* `BUG-COMM-MIGRATION-MISSING`
* `BUG-COMM-BUILD-FAIL`

Use existing bug ID convention if available.

---

## 82. Quality Bar

This phase is successful when future phases can rely on:

* lead creation is real
* duplicate prevention works
* participants are protected
* contact remains hidden
* reveal requires authorization
* CRM stages are real
* proposals are participant-scoped
* messages are participant-scoped
* site visits are participant-scoped
* saved items are own-user only
* notification events do not leak contact
* RLS protects communication tables
* no fake communication data exists
* dashboards show real/no-data states
* docs accurately updated
* manual verification is ready

---

## 83. Final Rule For Prompt 08

Implement communication safely.

Protect hidden contact.

Use participant-based access.

Use RLS.

Require auth.

Prevent duplicates.

Use real lead/message/proposal/site visit statuses only.

Do not fake inquiry success.

Do not fake contact reveal.

Do not fake lead counts.

Do not fake messages.

Do not fake unread counts.

Do not fake proposal acceptance.

Do not fake site visit completion.

Do not leak contact in notifications.

Do not expose private notes.

Do not expose admin notes.

Do not index private communication pages.

Do not cache private communication data publicly.

Do not expose service role or provider secrets.

Do not skip migrations for DB changes.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
