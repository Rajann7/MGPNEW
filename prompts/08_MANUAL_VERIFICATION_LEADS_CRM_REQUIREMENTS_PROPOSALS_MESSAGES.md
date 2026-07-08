# prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md

# My Gujarat Property — Prompt 08 Manual Verification: Leads, CRM, Requirements, Proposals And Messages

> **DESIGN-MATCH CHECK (mandatory):** Verify built screens match `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 7 & 9** and all `docs/07` "Design Add-Ons". Confirm: contact-reveal monthly quota, Call/Copy/WhatsApp, Kanban desktop-only + Move-to-stage, follow-up reminders, duplicate-lead merge, chat safety banner, named reject/lost taxonomies.

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
```

This prompt verifies the **Leads, CRM, Requirements, Proposals And Messages** phase.

Do not skip this verification.

Do not start Prompt 09 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real privacy, participant, RLS, duplicate, status, dashboard, notification, responsive and docs checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
Prompt Number: 08 Verification
Phase: Leads, CRM, Requirements, Proposals And Messages
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
Previous Prompt: prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
Next Implementation Prompt: prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that communication and conversion features are private, participant-scoped, RLS-protected and honest.

This verification checks:

* inquiry flow
* lead creation
* duplicate lead prevention
* lead participants
* lead ownership
* lead source tracking
* CRM stages
* lead statuses
* lead timeline/events
* lead notes
* follow-ups
* contact request foundation
* contact reveal foundation
* contact sharing consent
* proposal system
* proposal statuses
* requirement matching foundation
* builder matching requirement access
* message threads
* message participants
* message sending
* unread count foundation
* message attachments placeholder
* user block/report foundation
* site visit foundation
* site visit statuses
* saved items
* saved searches
* recently viewed items
* notification event foundation
* owner/broker/builder dashboard integrations
* admin oversight placeholders
* hidden contact protection
* wrong participant denial
* private notes protection
* admin notes protection
* private page noindex
* private cache/no-store
* RLS policies
* no fake leads/messages/proposals/site visits
* responsive communication UI
* docs updates
* Prompt 09 readiness

This phase does not verify payment, subscription, media upload, ads, external notifications, WhatsApp/SMS/email delivery, final billing, or production provider setup. Those are later prompts.

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
prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
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

Also inspect all changed implementation files from Prompt 08.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* inquiry and lead creation
* duplicate lead prevention
* participant model
* CRM stages and statuses
* contact request and reveal foundation
* proposal foundation
* requirement matching foundation
* message thread foundation
* site visit foundation
* saved items/searches/recent views
* notification event foundation
* dashboard integration
* admin oversight placeholder/foundation
* RLS and privacy
* private communication noindex/cache rules
* docs/checklist updates

This verification does not cover full implementation of:

* billing/payment/Razorpay
* subscription plans
* GST invoices
* media storage/R2/CDN uploads
* WhatsApp/SMS/email delivery
* external notification delivery
* advanced analytics
* AI lead scoring
* AI recommendations
* full calendar provider integration
* full support/fraud investigation
* full e-sign/legal agreements
* final production provider testing

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 08 changed files
3. inspect SQL migration
4. inspect tables and RLS policies
5. inspect inquiry/contact actions
6. inspect lead creation and duplicate logic
7. inspect lead participants and ownership checks
8. inspect contact request/reveal logic
9. inspect consent logic
10. inspect CRM status/stage transitions
11. inspect proposals and requirement matching
12. inspect message thread participant checks
13. inspect site visit participant checks
14. inspect saved items/searches/recent views
15. inspect notification events
16. inspect dashboard integrations
17. inspect admin oversight placeholders
18. search for hidden contact leaks
19. search for fake leads/messages/proposals/site visits
20. check private noindex/cache behavior
21. run available automated checks
22. run manual smoke checks where possible
23. test responsive widths
24. update required docs
25. create bugs for failures
26. decide final verification result
27. update `brain.md`
28. prepare Prompt 09 readiness note

Do not skip docs updates.

---

## 6. Required File Inspection

Inspect likely changed files:

```txt id="file-inspection"
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
src/lib/actions/leads.*
lib/actions/leads.*
src/lib/actions/messages.*
lib/actions/messages.*
src/lib/actions/proposals.*
lib/actions/proposals.*
src/lib/actions/site-visits.*
lib/actions/site-visits.*
src/lib/actions/saved.*
lib/actions/saved.*
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
src/types/proposals.*
types/proposals.*
src/types/site-visits.*
types/site-visits.*
supabase/migrations/
```

Also inspect docs:

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

Record exact changed files.

---

## 7. Migration Verification

If Prompt 08 changed database schema, verify migration exists.

Expected pattern:

```txt id="expected-migration"
supabase/migrations/*_leads_crm_requirements_proposals_messages.sql
```

Verify migration includes:

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

If DB changed without migration:

* create critical bug
* mark verification `FAIL`
* do not start Prompt 09

If migration exists without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL` depending data risk

If DB not changed because environment missing:

* mark DB/RLS runtime checks `SETUP_REQUIRED`
* do not claim RLS PASS

---

## 8. Expected Table Verification

If schema exists, check for implemented or reused tables.

Possible tables:

```txt id="expected-tables"
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

Minimum safe foundation should include:

* lead or inquiry storage
* participant/ownership model
* contact request/reveal status foundation or documented setup-required
* message/proposal/site visit/saved item tables if feature implemented
* RLS enabled
* indexes for ownership/participant queries
* soft/private status where needed
* timestamps

If implementation claims feature complete but table/model missing:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 9. Inquiry Flow Verification

Test or inspect inquiry/contact CTA flow.

Expected flow:

1. guest clicks inquiry/contact
2. auth popup/page opens
3. intent preserved where implemented
4. logged-in user confirms inquiry
5. lead/contact request created
6. duplicate active lead not created
7. receiver can see lead
8. requester can see inquiry status
9. hidden contact remains hidden
10. notification event created only if real DB notification foundation exists

Check:

* no fake inquiry success
* no lead creation for unauthenticated user unless intentionally supported and safe
* no phone/email in response
* no raw SQL/provider error
* safe setup-required if missing dependency

If inquiry button shows success without DB action:

* create bug
* mark `FAIL`

---

## 10. Lead Creation Verification

Verify lead creation:

* requires auth
* validates target entity
* target entity is approved/published or user-owned/scoped
* requester profile exists
* receiver/uploader profile identified safely
* source tracked
* status initialized correctly
* participants created correctly
* timeline event created if implemented
* duplicate prevention applied
* no hidden contact stored in public payload
* safe response returned

If wrong target/private entity can create public lead:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 11. Duplicate Lead Prevention Verification

Test/inspect duplicate prevention.

Scenarios:

```txt id="duplicate-tests"
same requester + same property + active lead
same requester + same project + active lead
same requester + repeated contact click
same proposer + same requirement + active proposal
double-click inquiry button
browser refresh/resubmit
```

Expected:

* existing lead reused
* duplicate event recorded if useful
* no duplicate active lead spam
* idempotency key if implemented
* safe user message
* no fake count

If duplicate active leads are created on double click:

* create bug
* mark `PARTIAL` or `FAIL` depending severity

---

## 12. Lead Participant Verification

Verify participant model:

* requester can view own lead/inquiry status
* receiver can view lead
* entity owner/uploader can view related lead
* broker/owner sees own property/requirement leads only
* builder sees own project leads only
* wrong user cannot view lead
* wrong user cannot update lead
* admin/staff access permission-scoped
* public denied

If any wrong user can view lead details:

* create critical bug
* mark `FAIL`

---

## 13. Lead Source Verification

Verify lead sources are real.

Valid examples:

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

Check:

* source is allowlisted
* source target is safe
* no hidden contact in source metadata
* no fake source events
* source links to safe entity reference

If source allows arbitrary unsafe values:

* create bug
* mark `PARTIAL`

---

## 14. Lead Status And CRM Stage Verification

Verify statuses:

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

Verify CRM stages:

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

Check:

* stage changes require participant permission
* stage changes server-validated
* invalid transitions denied
* events/timeline updated if implemented
* no fake converted/lost status
* wrong user denied
* public denied

If arbitrary stage mutation allowed by wrong user:

* create critical bug
* mark `FAIL`

---

## 15. Lead Timeline / Event Verification

Verify lead events are real.

Possible events:

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

Check:

* no fake events
* event actor recorded
* participants see only allowed events
* sensitive data masked
* admin notes not visible to public users
* hidden contact not in event payload

If fake timeline entries appear:

* create bug
* mark `FAIL`

---

## 16. Lead Notes Verification

Verify lead notes:

* note visibility explicit
* private user note visible only to creator/allowed party
* receiver private note not visible to requester
* requester private note not visible to receiver unless shared
* admin note not visible to public users
* notes sanitized
* wrong user denied
* no secrets/OTP/provider tokens
* no hidden contact leak unless user manually typed and policy allows/flags

If private/admin note leaks to wrong participant:

* create critical bug
* mark `FAIL`

---

## 17. Follow-Up Verification

If follow-ups implemented, verify:

* participant/owner access only
* due date validation
* assigned user belongs to participant/team where applicable
* statuses safe:

  * pending
  * completed
  * missed
  * cancelled
  * rescheduled
* no fake reminders
* no fake completed follow-up
* notification/reminder provider setup-required if external delivery missing
* wrong user denied

If follow-ups not implemented, ensure placeholder is honest.

---

## 18. Contact Request Verification

Verify contact request statuses:

```txt id="contact-request-statuses"
requested
pending_owner_response
approved
rejected
expired
cancelled
blocked
```

Check:

* contact request requires auth
* target entity valid
* requester is participant
* receiver is owner/uploader/builder/broker as applicable
* duplicate active request prevented
* status transition safe
* hidden contact remains hidden unless reveal authorized
* notification event safe
* wrong user denied

If contact request response returns phone/email before approval:

* create critical bug
* mark `FAIL`

---

## 19. Contact Reveal Verification

Verify contact reveal statuses:

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

Check:

* default not revealed
* reveal requires auth
* reveal requires authorization
* reveal is participant-scoped
* reveal event audited/logged if implemented
* phone/email shown only to authorized participant
* phone/email never in public-safe views
* phone/email never in public metadata/schema/sitemap
* phone/email never in notification payload
* no fake reveal
* rate limit/abuse placeholder documented

If reveal is not fully implemented:

* status should stay setup-required/pending
* contact must stay hidden

If unauthorized reveal works:

* create critical bug
* mark `FAIL`

---

## 20. Contact Consent Verification

Verify consent capture if implemented:

* contact sharing consent explicit where required
* consent record private
* consent includes target/entity context
* policy version stored if available
* marketing opt-in not prechecked
* no fake consent
* user can proceed only after required consent
* consent not exposed publicly

If contact sharing happens without required consent:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 21. Hidden Contact Deep Verification

Search for hidden contact leaks in:

* public search cards
* public detail pages
* lead actions
* lead responses
* lead timeline
* contact requests
* contact reveal responses
* proposals
* messages
* site visits
* notifications
* metadata/schema/sitemap
* logs/errors
* client props
* JSON payloads
* admin/staff pages without permission

Search fields/terms:

```txt id="hidden-contact-search"
phone
mobile
email
whatsapp
contact_phone
contact_email
owner_phone
broker_phone
builder_phone
hidden_contact
contact_visibility
```

If hidden contact leaks to unauthorized/public user:

* create critical bug
* mark `FAIL`

---

## 22. Proposal System Verification

Verify proposals:

* proposer must be authenticated
* proposer/recipient relationship valid
* proposal target valid
* requirement/property/project linkage safe
* participant-only access
* draft/sent/viewed/shortlisted/accepted/rejected/negotiation/withdrawn/expired/archived statuses safe
* status transitions server-validated
* recipient-only accept/reject where applicable
* proposer-only withdraw where applicable
* no fake accepted/viewed status
* hidden contact not revealed through proposal
* wrong participant denied
* public denied

If wrong participant can view proposal:

* create critical bug
* mark `FAIL`

---

## 23. Proposal Status Verification

Check proposal statuses:

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

Verify transitions:

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

Rules:

* no arbitrary status change
* no fake viewed
* no fake accepted
* no auto-conversion without participant action
* events real only
* wrong user denied

---

## 24. Requirement Matching Verification

If matching implemented, verify matching factors are real:

* city/location
* purpose
* category
* type
* budget range
* area range
* BHK/preferences
* possession timeline

Check:

* no AI
* no fake score
* no fake match count
* transparent simple explanation if score shown
* builder access role-scoped
* contact hidden
* private requirement data not leaked
* wrong builder/user denied

If matching not implemented, verify setup/coming-later state.

If fake match score appears:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 25. Builder Matching Requirement Access Verification

Verify builder requirement access:

* builder sees only allowed/scoped matching requirements
* contact hidden
* buyer/renter private identity protected
* proposal/contact request requires auth and authorization
* no unrestricted private requirement access
* no hidden contact in payload
* RLS/scoped query used

If builder can browse all private requirements with contact:

* create critical bug
* mark `FAIL`

---

## 26. Messaging Thread Verification

Verify message threads:

* thread requires valid context
* participants created correctly
* only participants can view
* wrong user denied
* public denied
* admin/staff access permission-scoped
* thread type allowlisted:

  * lead
  * proposal
  * requirement
  * site_visit
  * support_placeholder
* archived/blocked states respected
* no fake thread data

If wrong user can open thread URL:

* create critical bug
* mark `FAIL`

---

## 27. Message Sending Verification

Verify message sending:

* sender authenticated
* sender is participant
* thread exists
* message body validated
* message sanitized
* empty/too-long message rejected
* status initialized honestly
* no fake delivered/read status
* unread count updated if implemented
* notification event safe if implemented
* hidden contact not auto-injected
* wrong user denied

If non-participant can send message:

* create critical bug
* mark `FAIL`

---

## 28. Message Status / Unread Verification

Verify message statuses:

```txt id="message-statuses"
sent
delivered
read
failed
deleted
hidden_by_moderation
```

Rules:

* delivered/read only if tracked
* no fake read receipts
* unread counts real only
* mark-read updates participant record
* unread count private to recipient
* no fake notification badge
* wrong user cannot mark read for another

If unread count is hardcoded/fake:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 29. Message Attachment Verification

If attachments implemented:

* media provider configured or setup-required
* file type/size validation
* private storage/RLS
* participant-only access
* no public URL for private attachment
* no fake upload success
* no hidden contact in metadata/filename
* no unsupported file types
* malware scan placeholder if applicable

If attachments not implemented:

* button hidden or disabled with reason

If fake attachment upload succeeds:

* create bug
* mark `FAIL`

---

## 30. Message Privacy Verification

Verify messages do not expose:

* DB hidden contact automatically
* other threads
* private notes
* admin notes
* provider secrets
* private documents
* wrong user profile data
* moderation data

If user manually types phone/email in message:

* policy should either allow as user-entered content, warn, or flag
* platform hidden contact field still must not leak automatically

If hidden contact is injected into message automatically:

* create critical bug
* mark `FAIL`

---

## 31. Blocking / Reporting Verification

If block/report implemented:

* requires auth
* target valid
* report category allowlisted
* report private
* report status tracked
* no fake report success if DB missing
* reported user not exposed unnecessarily
* block prevents future messages/contact attempts where implemented
* admin/fraud queue placeholder safe
* wrong user denied

If not implemented:

* show setup/coming-later state

---

## 32. Site Visit Verification

Verify site visit foundation:

* requires authenticated participant
* related lead/entity valid
* requester/host participant relationship valid
* schedule date/time validated
* statuses safe:

  * requested
  * accepted
  * scheduled
  * rescheduled
  * cancelled
  * completed
  * no_show
  * rejected
  * expired
* wrong user denied
* no fake scheduled/completed state
* reminders provider setup-required if missing
* calendar provider not faked
* safety notice shown
* hidden contact protected

If wrong participant can view/update site visit:

* create critical bug
* mark `FAIL`

---

## 33. Site Visit Status Verification

Verify transitions:

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

Rules:

* valid actor required
* invalid transitions denied
* cancel reason captured where needed
* completion real only
* no fake no-show/completed
* timeline/notification real only

---

## 34. Saved Items Verification

Verify saved items:

* require auth for DB save
* guest save triggers auth/local temp if implemented
* user can view own saved items only
* wrong user denied
* duplicate save prevented
* unsave works
* saved entity public-safe or unavailable state
* deleted/unavailable item handled safely
* no fake saved items
* pagination/limit exists

If user can view another user’s saved items:

* create critical bug
* mark `FAIL`

---

## 35. Saved Searches Verification

Verify saved searches:

* user can create own saved search
* query params sanitized
* user can view/update/delete own saved search only
* wrong user denied
* alert preference does not fake delivery
* no fake alerts
* saved search run link safe
* no private data stored

If saved search alert sends fake notification/provider success:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 36. Recently Viewed Verification

Verify recently viewed:

* logged-in DB data private to user
* guest local state optional and not server-private
* deduplication
* max limit
* unavailable item state
* no fake recent items
* wrong user denied

If not implemented, placeholder acceptable if documented.

---

## 37. Notification Event Verification

If notification events implemented, verify events for:

* new lead
* contact request
* contact reveal approved/rejected
* new message
* proposal sent
* proposal viewed/accepted/rejected
* site visit requested/scheduled/rescheduled/cancelled
* follow-up due placeholder
* saved search alert placeholder later

Check:

* events real only
* recipient correct
* unread count real only
* deep link permission-checked
* no hidden contact in notification payload
* no external provider fake
* notification provider status honest

If notification leaks contact:

* create critical bug
* mark `FAIL`

---

## 38. Dashboard Integration Verification

Verify dashboard modules.

### Owner

* leads page uses real own leads
* inquiry status visible only for own inquiries
* messages participant-only
* site visits participant-only
* saved items own only
* no fake leads/messages

### Broker

* leads/CRM real own/participant leads
* proposals participant-scoped
* messages participant-only
* follow-ups own/assigned only
* site visits participant-only
* saved items own only
* no fake CRM pipeline

### Builder

* project leads own projects only
* matching requirements scoped
* proposals participant-scoped
* messages participant-only
* site visits participant-only
* no fake matches/leads

If dashboard shows wrong-user lead/message/proposal:

* create critical bug
* mark `FAIL`

---

## 39. Admin Oversight Verification

If admin oversight implemented or placeholder exists:

* permission-scoped lead list
* permission-scoped report/fraud queue
* contact reveal audit permission-scoped
* message moderation permission-scoped
* sensitive data masked
* no full message snooping without policy/permission
* no fake queues
* no provider secrets
* admin actions audited if implemented

If not implemented, document `PARTIAL`.

---

## 40. RLS Enabled Verification

For every private communication table created/changed, verify RLS enabled.

Check:

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

If RLS missing on private communication table:

* create critical bug
* mark `FAIL`

If DB unavailable:

* mark RLS runtime verification `SETUP_REQUIRED`
* do not mark RLS PASS

---

## 41. RLS Policy Verification

Verify RLS behavior.

Expected:

* public cannot read leads
* public cannot read messages
* public cannot read proposals
* public cannot read site visits
* requester can read own lead
* receiver can read related lead
* participant can read own message thread
* non-participant cannot read thread
* proposer/recipient can read proposal
* wrong user cannot read proposal
* site visit participants can read visit
* wrong user cannot read visit
* saved items own-user only
* notification events recipient-only
* admin/staff permission-scoped
* hidden contact protected

If wrong participant access succeeds:

* create critical bug
* mark `FAIL`

---

## 42. RLS Test Suggestions

If Supabase test environment is available, run equivalent tests:

```txt id="rls-test-scenarios"
1. Anonymous select leads → denied.
2. Public authenticated wrong user select lead → denied.
3. Lead requester select own lead → allowed.
4. Lead receiver select related lead → allowed.
5. Wrong user update lead stage → denied.
6. Public select messages → denied.
7. Thread participant select thread/messages → allowed.
8. Non-participant select thread/messages → denied.
9. Non-participant send message → denied.
10. Proposal proposer select proposal → allowed.
11. Proposal recipient select proposal → allowed.
12. Wrong user select proposal → denied.
13. Site visit participant select visit → allowed.
14. Wrong user select visit → denied.
15. User select own saved_items → allowed.
16. User select another user's saved_items → denied.
17. Public select contact_reveals → denied.
18. Unauthorized user select revealed contact → denied.
19. Notification recipient select notification → allowed.
20. Wrong user select notification → denied.
```

Record exact results.

Do not mark RLS PASS without tests.

---

## 43. Direct URL Bypass Verification

Test or inspect direct URLs:

```txt id="direct-url-checks"
/dashboard/owner/leads
/dashboard/broker/leads
/dashboard/broker/crm
/dashboard/broker/proposals
/dashboard/builder/leads
/dashboard/builder/requirements
/dashboard/messages/[thread_id]
/dashboard/site-visits/[id]
/dashboard/saved
/admin/leads
```

Expected:

* guest denied
* wrong role denied
* wrong participant denied
* wrong user data not rendered before redirect
* safe unauthorized state
* private data noindex/no-cache

If direct URL bypass reveals communication data:

* create critical bug
* mark `FAIL`

---

## 44. Private Noindex Verification

Verify communication pages are private/noindex:

* lead pages
* CRM pages
* proposal pages
* message pages
* site visit pages
* saved items pages
* saved search pages
* admin communication oversight pages

Check:

* noindex metadata where appropriate
* not in sitemap
* no public share URLs exposing private data
* no private content in metadata/schema
* robots/sitemap safe

If private lead/message page is indexable:

* create bug
* mark `FAIL` if data exposed

---

## 45. Private Cache Verification

Verify private communication pages:

* not statically generated with private data
* not publicly cached
* no shared cache between users
* no private messages/leads in public cache
* no signed/private attachment cache leak
* no notification payload public cache
* `no-store` or equivalent where needed

If private lead/message data can be cached publicly:

* create critical bug
* mark `FAIL`

---

## 46. Service Role / Secret Verification

Search communication code for:

```txt id="secret-patterns"
SUPABASE_SERVICE_ROLE_KEY
SERVICE_ROLE
RAZORPAY_KEY_SECRET
R2_SECRET_ACCESS_KEY
OTP_API_KEY
SMS_API_KEY
WHATSAPP_BUSINESS_TOKEN
GOOGLE_CLIENT_SECRET
SENDGRID_API_KEY
RESEND_API_KEY
```

Verify:

* no service role in client components
* no provider secrets in UI
* no secrets in notification payloads
* no secrets in logs/errors
* no secrets in docs beyond placeholders
* no provider tokens in messages/admin notes

If real secret exposure found:

* do not print secret
* create critical bug
* mark `FAIL`
* recommend secret rotation

---

## 47. Fake Data Verification

Search for fake communication data.

Not allowed as real:

* fake leads
* fake inquiry success
* fake contact reveal
* fake phone/email reveal
* fake CRM pipeline
* fake lead count
* fake unread count
* fake message delivered/read
* fake proposal accepted
* fake proposal viewed
* fake site visit scheduled/completed
* fake saved items
* fake notifications
* fake admin oversight queue

If dev/test fixtures exist:

* must be dev-only
* must not be used as production dashboard data
* must not be used to mark PASS

If fake communication data appears real:

* create bug
* mark `FAIL`

---

## 48. Rate Limit / Abuse Verification

Verify abuse protections or placeholders:

* inquiry creation rate limit/setup
* contact request rate limit/setup
* message sending rate limit/setup
* proposal sending rate limit/setup
* site visit request rate limit/setup
* report creation rate limit/setup
* duplicate prevention
* double-submit protection
* disabled/blocked user restrictions if implemented

If rate limiting not implemented:

* document `PARTIAL`
* update security checklist
* do not claim full abuse protection

If double-click creates spam leads/messages:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 49. UI Verification — Lead List

Verify lead list UI:

* shows real own/participant leads only
* no hidden phone/email
* status/stage badges correct
* filters/search if implemented
* pagination/limits
* safe empty state
* loading/error states
* no fake counts
* no fake lead score
* no fake urgency
* action menu safe
* mobile card layout works

If list shows wrong-user lead:

* create critical bug
* mark `FAIL`

---

## 50. UI Verification — Lead Detail

Verify lead detail UI:

* target entity summary safe
* participants safe
* status/stage real
* timeline real
* notes visibility correct
* follow-up real/setup state
* proposal section real/setup state
* message thread participant-only
* site visit section real/setup state
* contact reveal status safe
* allowed actions only
* no hidden contact unless authorized
* no fake timeline/proposal/message

---

## 51. UI Verification — CRM Board/List

If CRM board implemented:

* columns are real stages
* cards are real leads
* drag/drop server-validated
* no fake counts
* no hidden contact
* wrong-user lead absent
* mobile fallback exists

If list implemented:

* filters work
* stage update safe
* pagination/limit exists
* no fake pipeline

If CRM is placeholder:

* state is honest and no fake cards appear

---

## 52. UI Verification — Proposal Pages

Verify proposal UI:

* create/send allowed only for permitted participant/role
* view sent/received proposals only for participants
* status badges real
* related entity links safe
* accept/reject/withdraw actions permission-scoped
* no fake accepted/viewed
* hidden contact protected
* proposal terms private

---

## 53. UI Verification — Message Threads

Verify messaging UI:

* thread list participant-only
* message list participant-only
* compose box validates input
* send button works or setup state
* attachment button disabled/setup if media missing
* unread status real
* block/report action safe
* no fake online/typing if not implemented
* no horizontal scroll
* mobile composer usable

---

## 54. UI Verification — Site Visits

Verify site visit UI:

* request form participant-only
* valid entity/lead required
* date/time validation
* accept/reject/reschedule/cancel actions safe
* status display real
* safety notice visible
* reminder/calendar provider setup-required if missing
* no fake completed/no-show state

---

## 55. UI Verification — Saved Items/Searches/Recent

Verify:

* saved items own-user only
* save/unsave works or setup state
* saved searches own-user only
* saved search alert setup state honest
* recently viewed own/local only
* unavailable items safe
* no fake saved/recent data
* pagination/limit exists

---

## 56. Notification UI Verification

If notifications integrated:

* unread count real only
* notification list real only
* no fake notification
* deep links permission-checked
* notification payload no hidden contact
* mark read real if implemented
* provider delivery setup-required if external missing

If notification count is fake/hardcoded:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 57. Responsive Verification

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

* lead lists become cards
* CRM board has mobile fallback
* message thread fits
* sticky composer not covering content
* proposal form fits
* site visit form fits
* saved item cards fit
* filters in drawer/bottom sheet usable
* no horizontal scroll
* action menus usable
* CTAs tappable
* modals/drawers fit

If not all widths tested, mark responsive check `PARTIAL`.

Do not mark responsive PASS without testing.

---

## 58. Accessibility Verification

Check:

* semantic headings
* input labels
* message composer label
* status not color-only
* buttons have text/aria labels
* focus visible
* keyboard navigation
* modal/drawer focus behavior
* thread list accessible
* error text readable
* large mobile tap targets
* destructive confirmations clear

If severe accessibility blocker exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 59. Performance Verification

Verify:

* lead list paginated
* CRM list/board limited
* message thread fetch limited
* proposal list paginated
* site visit list limited
* saved/recent max limit
* notification query indexed
* no unbounded message fetch
* no N+1 participant/profile queries
* no heavy provider SDK loaded
* private pages no-store
* build passes

If messages load all records unbounded:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 60. Build / Lint / Typecheck Verification

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

## 61. Manual Smoke Test Matrix

If app can run and test users/entities exist, test:

```txt id="manual-smoke-matrix"
Guest:
- contact CTA opens auth/setup
- cannot access dashboard leads/messages/proposals/site visits

Requester:
- create inquiry
- repeated inquiry reuses existing lead
- view own inquiry status
- cannot view unrelated lead/thread/proposal/site visit
- contact hidden until authorized

Receiver Owner/Broker:
- sees property/requirement lead if participant
- cannot see unrelated lead
- can update allowed CRM stage
- can add allowed note
- cannot access admin notes

Builder:
- sees own project leads
- sees scoped matching requirements if implemented
- cannot see unrestricted private requirements
- contact hidden

Messages:
- participant can send/read
- non-participant denied
- unread count real/zero

Proposals:
- proposer can send/withdraw
- recipient can view/accept/reject
- wrong user denied

Site Visits:
- participant can request/respond
- wrong user denied

Saved Items:
- user can save/unsave own
- wrong user denied
```

If test users unavailable:

* inspect code
* mark runtime tests `SETUP_REQUIRED` or `PARTIAL`
* do not fake runtime PASS

---

## 62. Documentation Update Verification

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

## 63. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

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

Future features must not be marked done.

---

## 64. Changelog Verification

Check `CHANGELOG.md` includes Prompt 08 entry with:

* date
* summary
* changed files
* new routes
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

## 65. Bugs And Fixes Verification

If issues are found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

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

## 66. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 08 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* routes/features checked
* inquiry tests
* duplicate tests
* contact privacy tests
* proposal tests
* message tests
* site visit tests
* saved item tests
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

## 67. Security Checklist Verification

Update/verify `SECURITY_RLS_CHECKLIST.md`.

Include Prompt 08 results for:

* lead RLS
* message RLS
* proposal RLS
* site visit RLS
* saved item RLS
* notification event RLS
* hidden contact protection
* contact reveal authorization
* contact sharing consent
* notification payload privacy
* private note privacy
* admin note privacy
* wrong participant denial
* direct URL denial
* private noindex/cache
* service role client exposure check
* provider secret check
* rate limit/abuse status
* known issues

If hidden contact/wrong participant leak exists, result cannot be PASS.

---

## 68. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

Include Prompt 08 results for:

* lead list pagination
* CRM board/list limits
* message thread pagination
* proposal list pagination
* site visit list limits
* saved/recent limits
* notification indexes
* no unbounded reads
* no N+1 participant/profile queries
* private no-store pages
* no heavy provider SDKs
* build status
* future load test notes

---

## 69. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

Include:

* Prompt 08 route/component changes
* migration path if any
* communication tables
* RLS policies
* indexes
* rollback notes
* data privacy risk
* private cache/session risk
* provider setup-required notes
* notification delivery not active unless tested
* post-deploy communication smoke checks

If DB/RLS changes exist without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 70. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md`.

Relevant statuses:

* Notification provider
* Email provider
* SMS provider
* WhatsApp provider
* Media/R2 for attachments
* Calendar/reminder provider
* Realtime provider
* Supabase Database/RLS

Rules:

* no provider active without real test
* missing provider setup-required/not-started
* DB notification events are not external delivery
* no fake SMS/WhatsApp/email sent
* no hidden contact in provider payload

---

## 71. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 08 implementation summary
* Prompt 08 verification result
* changed files
* routes checked
* migrations/tables/RLS
* lead/contact/message/proposal/site visit status
* hidden contact result
* wrong participant result
* fake data result
* responsive result
* setup-required providers
* bugs/blockers
* commands run
* next prompt:

  * `prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`
* instruction not to proceed if Prompt 08 failed/blocked

---

## 72. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* inquiry flow works or safely setup-required without fake success
* duplicate lead prevention works
* lead participants protected
* wrong user cannot view lead
* hidden contact does not leak
* contact reveal requires authorization
* proposals are participant-scoped
* messages are participant-scoped
* wrong user cannot view/send messages
* site visits are participant-scoped
* saved items/searches own-user only
* notification events do not leak contact
* public/private communication pages noindex and not in sitemap
* private communication pages not publicly cached
* RLS enabled/tested or honestly setup-required with no unsafe claim
* no fake leads/messages/proposals/site visits/unread counts
* responsive checks completed
* docs updated
* no blocking bugs

### PARTIAL

Use `PARTIAL` if:

* contact reveal foundation exists but reveal action setup-required
* messaging foundation exists but realtime not implemented
* proposals foundation partial
* matching foundation partial
* site visits foundation partial
* saved/recent items partial
* message attachments setup-required
* external notification provider setup-required
* rate limiting partial
* RLS runtime tests unavailable but policies/migration reviewed
* responsive/browser checks incomplete
* admin oversight placeholder only
* no fake functionality and no privacy leak exists

Prompt 09 can start only if user/Super Admin accepts partial and no critical privacy/security issue exists.

### FAIL

Use `FAIL` if:

* build fails
* hidden contact leaks
* public can read leads/messages/proposals/site visits
* wrong user can read lead
* wrong user can read message thread
* wrong participant can view proposal
* wrong user can view saved items
* fake inquiry/contact reveal/message/proposal/site visit appears real
* unread count fake
* notification leaks contact
* private communication page indexable/public cached
* service role/provider secret exposed
* DB changes missing migration
* RLS missing on private communication tables

Do not start Prompt 09.

### BLOCKED

Use `BLOCKED` if:

* Prompt 04 entity foundation failed
* Prompt 06 dashboards failed
* Prompt 07 admin foundation failed where needed
* auth/session unavailable
* Supabase/RLS unavailable blocks safe communication verification
* cannot inspect required files
* package/build baseline broken
* architecture conflict needs owner decision

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* notification provider missing
* email/SMS/WhatsApp provider missing
* media/R2 missing for attachments
* realtime provider missing
* calendar/reminder provider missing
* Supabase env missing
* test users/test entities missing

Setup-required is acceptable only when no fake functionality appears and privacy is protected.

---

## 73. Prompt 09 Readiness Checklist

Prompt 09 can start only if:

* Prompt 08 implementation completed
* Prompt 08 verification completed
* no critical communication privacy bug open
* no hidden contact leak
* no public lead/message/proposal/site visit access
* no wrong participant access
* no fake lead/message/proposal/site visit data
* no fake contact reveal
* private pages noindex/private cache safe
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`

If Prompt 09 file is missing, stop and ask/generate it.

---

## 74. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 08 Verification — Leads, CRM, Requirements, Proposals And Messages

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Routes/Features Checked:
- inquiry/contact:
- owner leads:
- broker leads/CRM:
- builder leads/requirements:
- messages:
- proposals:
- site visits:
- saved items/searches/recent:
- admin oversight:

Lead/CRM Checks:
- lead creation:
- duplicate prevention:
- participant access:
- status/stage transitions:
- notes/follow-ups:
- fake data:

Contact Privacy Checks:
- hidden contact:
- contact request:
- contact reveal:
- consent:
- notification payload privacy:

Proposal/Matching Checks:
- proposal participant access:
- proposal statuses:
- requirement matching:
- builder requirement access:

Message Checks:
- thread access:
- send message:
- unread count:
- attachments:
- block/report:

Site Visit Checks:
- request:
- schedule/reschedule/cancel:
- participant access:
- safety notice:

Saved/Recent Checks:
- saved items:
- saved searches:
- recently viewed:

Database/RLS Checks:
- migrations:
- tables:
- indexes:
- RLS policies:
- RLS test result:

Security/Public Safety:
- public access:
- wrong user access:
- hidden contact leak:
- private notes:
- admin notes:
- fake communication data:
- service role/provider secrets:
- private noindex/cache:

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
- Leads/CRM/proposals/messages foundation is private, participant-scoped and ready for Prompt 09.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 09:
- Yes/No

Next Step:
- prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md or fix blockers first.
```

---

## 75. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 08 Leads/CRM/Proposals/Messages verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Routes/features checked:
- inquiry/contact:
- owner leads:
- broker leads/CRM:
- builder leads/requirements:
- messages:
- proposals:
- site visits:
- saved/recent:
- admin oversight:

Lead/CRM:
- lead creation:
- duplicate prevention:
- participant access:
- status/stage transitions:
- notes/follow-ups:

Contact privacy:
- hidden contact:
- contact request:
- contact reveal:
- consent:
- notification payload privacy:

Proposals/matching:
- proposal access:
- proposal statuses:
- requirement matching:
- builder matching access:

Messages:
- thread access:
- sending:
- unread count:
- attachments:
- block/report:

Site visits:
- participant access:
- status transitions:
- safety notice:

Saved/recent:
- saved items:
- saved searches:
- recently viewed:

Security/privacy:
- public access:
- wrong user access:
- private notes:
- admin notes:
- fake communication data:
- service role/provider secrets:
- private noindex/cache:

Database/RLS:
- migrations:
- tables:
- indexes:
- RLS policies:
- RLS test result:

Responsive:
- widths tested:
- CRM mobile:
- message UI:
- horizontal scroll:

Provider/setup-required:
- notifications:
- email/SMS/WhatsApp:
- media/R2:
- realtime:
- calendar/reminders:
- Supabase/test users:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 09:
- Yes/No
- reason

Next step:
- prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
```

Do not write vague “verified”.

---

## 76. If Verification Fails

If verification fails:

1. do not start Prompt 09
2. create/update bug entries
3. update `MANUAL_VERIFICATION.md`
4. update `SECURITY_RLS_CHECKLIST.md`
5. update `PERFORMANCE_CHECKLIST.md`
6. update `DEPLOYMENT_ROLLBACK.md`
7. update `API_PROVIDER_STATUS.md` if provider/privacy issue found
8. update `brain.md`
9. state exact blocker
10. fix if safe and in scope
11. rerun verification
12. only then proceed

Critical privacy/security/participant failures block progress.

---

## 77. If Verification Is Partial

If verification is partial:

* document exact partial items
* list setup-required providers
* list placeholder modules
* list untested runtime/RLS checks
* list responsive/browser gaps
* list rate-limit gaps
* confirm no hidden contact leak
* confirm no public communication data leak
* confirm no wrong participant access
* confirm no fake communication data as real
* confirm private pages noindex/cache safe
* update docs
* ask/require owner acceptance before Prompt 09 if risk is significant

Acceptable partial examples:

* realtime messaging not implemented
* contact reveal action setup-required but contact hidden
* message attachments setup-required
* notification provider delivery setup-required
* site visit reminders setup-required
* rate limiting partial
* admin oversight placeholder only
* RLS runtime tests unavailable but policies reviewed

Not acceptable partial without fix:

* hidden contact leak
* public lead/message access
* wrong participant access
* fake contact reveal
* fake unread counts
* fake proposal acceptance
* private page public cached/indexable
* build fail

---

## 78. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `DEPLOYMENT_ROLLBACK.md`
* update `API_PROVIDER_STATUS.md` if relevant
* update `brain.md`
* final response should say Prompt 09 can start

Do not start Prompt 09 automatically unless user asked to continue.

---

## 79. What Not To Do In This Verification

Do not:

* implement payment/subscription
* implement media storage/R2
* implement external SMS/email/WhatsApp delivery
* implement AI lead scoring
* add fake leads
* add fake messages
* add fake unread counts
* add fake proposal accepted/viewed states
* add fake site visit completion
* reveal hidden contact for testing
* bypass RLS
* disable participant checks
* index private communication pages
* cache private communication pages publicly
* expose service role
* expose provider secrets
* ignore wrong participant access
* start Prompt 09 after FAIL/BLOCKED

---

## 80. Quality Bar

This verification is successful when future phases can trust that:

* inquiries create real leads
* duplicate lead prevention works
* leads are participant-scoped
* contact stays hidden unless authorized
* contact reveal foundation is safe
* proposals are participant-scoped
* messages are participant-scoped
* site visits are participant-scoped
* saved items/searches are own-user-only
* notification events do not leak contact
* private communication pages are noindex/no public cache
* RLS protects private communication tables
* dashboards show real/no-data states
* no fake communication data exists
* docs reflect reality
* Prompt 09 billing can safely build on lead/contact/subscription gates

---

## 81. Final Rule For Prompt 08 Verification

Verify leads honestly.

Verify contact privacy honestly.

Verify contact reveal honestly.

Verify duplicate prevention honestly.

Verify participant access honestly.

Verify proposals honestly.

Verify messages honestly.

Verify site visits honestly.

Verify saved items honestly.

Verify notifications honestly.

Verify RLS honestly.

Do not expose hidden contact.

Do not allow public lead/message/proposal/site visit access.

Do not allow wrong participant access.

Do not fake inquiry success.

Do not fake contact reveal.

Do not fake leads.

Do not fake messages.

Do not fake unread counts.

Do not fake proposal accepted/viewed states.

Do not fake site visit completion.

Do not leak contact in notifications.

Do not index private pages.

Do not cache private communication data publicly.

Do not mark PASS without privacy and RLS checks.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
