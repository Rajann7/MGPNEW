# BATCH_DOCUMENT_05_DESIGN_BATCH_08_BUILDER_DASHBOARD_FULL_SPEC.md

# My Gujarat Property

## Batch Document 05

## Design Batch 8 — Complete Builder Dashboard

---

# 1. DOCUMENT PURPOSE

This document is the complete design, functionaoackend integration, permission, security, RLS, persistence, provider-safety and live-verification specification for:

**My Gujarat Property · Design Batch 8 — Builder Dashboard**

Design Batch 8 defines the complete operating dashboard for the Builder role.

The complete Batch 8 scope contains exactly these 27 screen groups:

1. Builder Overview
2. My Projects
3. Project Wizard Entry / Edit / Re-approval Warning
4. Unit Inventory
5. Unit Edit
6. Project Leads
7. Project Lead Detail
8. Matching Requirements Feed
9. Proposals
10. Messages
11. Site Visits
12. Agents / Team List
13. Invite Agent
14. Agent Permissions
15. Ad Campaign List
16. Create Ad Campaign
17. Ad Campaign Detail
18. Ad Analytics Setup Required
19. Project Analytics
20. Builder Billing + Ad Wallet
21. Invoices
22. RERA / Verification
23. Company Microsite Edit
24. Construction Progress Update
25. Notifications Center
26. Support / Help
27. Settings

Every screen must be implemented.

No screen may be:

* skipped,
* replaced with Coming Soon,
* combined with an unrelated screen,
* represented by a dead button,
* represented only by placeholder cards,
* represented only by hard-coded sample data.

The actual Batch 8 HTML design file inside:

`/newdesign/`

must be read directly before implementation.

The Batch 8 design source is the exact visual authority.

Do not implement from:

* the current Builder dashboard,
* the previous dashboard design,
* generic SaaS dashboard templates,
* Owner dashboard with labels changed,
* Broker dashboard with Projects substituted for Properties,
* memory,
* assumptions.

---

# 2. ABSOLUTE CURRENT BUILDER DASHBOARD DELETION RULE

The current Builder dashboard presentation layer must be completely removed wherever it conflicts with Batch 8.

This includes all conflicting current:

* dashboard overview layout,
* generic stat-card grid,
* generic action-card grid,
* account-status card layout,
* old Builder sidebar,
* old Builder mobile drawer,
* old Project list,
* old Lead list,
* old Unit Inventory,
* incomplete Ads screen,
* incomplete Agent/Team screen,
* old Billing presentation,
* old Verification presentation,
* old Public Profile editing screen,
* old Analytics layout,
* hidden legacy dashboard wrappers,
* conflicting inherited CSS.

Do not place Batch 8 sections underneath the current generic Builder home.

Do not create:

`Old Dashboard Shell + New Batch 8 Content`

The final Browser output must contain only:

**Batch 1 shared dashboard foundation + exact Batch 8 Builder screen design.**

---

# 3. BACKEND PRESERVATION RULE

Removing current dashboard UI does not mean blindly deleting secure backend infrastructure.

Existing backend functionality may be preserved where it correctly supports Batch 8.

Potentially reusable systems include:

* Supabase Auth,
* Builder role guard,
* Project CRUD,
* Project moderation,
* Project RLS,
* Lead system,
* Proposal system,
* Message threads,
* Site Visit records,
* Notification records,
* Billing plans,
* Invoices,
* Verification records,
* support tickets.

However:

If current backend behavior is incomplete or conflicts with Batch 8, repair or extend it.

Do not simplify the design because backend support is currently missing.

Examples:

If Unit Inventory does not exist:

build it.

If Agents/Team permissions do not exist:

build them.

If Ads are currently Coming Soon:

build the actual Batch 8 Campaign system.

If project analytics have no real provider data:

show the exact honest Setup Required or insufficient-data state rather than fake analytics.

---

# 4. DESIGN AUTHORITY RULE

Batch 8 is the authority for:

* desktop layout,
* mobile layout,
* tablet behavior,
* screen hierarchy,
* navigation,
* card order,
* information density,
* status colors,
* tables,
* cards,
* accordion behavior,
* modal behavior,
* mobile bottom sheets,
* sticky controls,
* filters,
* tabs,
* charts,
* empty states,
* Setup Required states,
* forms,
* permissions matrix,
* timeline design,
* media upload design,
* campaign status design,
* wallet design.

Nothing should be visually redesigned independently.

Do not:

* add a header if exact screen does not show one,
* remove a sidebar where design includes one,
* add unrelated cards,
* change icon family,
* change navigation order,
* change spacing,
* change font sizes,
* change button hierarchy,
* replace mobile accordion with a horizontal table,
* replace mobile sheets with desktop modals,
* add fake graphs.

---

# 5. BATCH 8 DESIGN FOUNDATION

All Batch 8 screens must inherit the approved shared system:

Brand:

`#0F6B5C`

Hover:

`#0C5648`

Brand Soft:

`#E7F2EF`

Success:

`#16A34A`

Pending / Warning:

`#D97706`

Error:

`#DC2626`

Info:

`#2563EB`

Neutral:

Zinc palette.

Typography:

Inter.

Primary weights:

* 400
* 500
* 600

Icons:

Lucide outline icons.

Do not mix Material, Font Awesome, emoji or filled icons.

---

# 6. BUILDER ROLE SECURITY

All Batch 8 Builder routes must require:

* authenticated user,
* Builder public role,
* valid account state,
* correct verification/plan gates where applicable.

A Builder must be able to access only:

* own Projects,
* own Project Units,
* Leads received for own Projects,
* Team members attached to own Builder organisation,
* Site Visits linked to own Projects,
* Ads owned by the Builder organisation,
* Builder billing,
* Builder verification,
* Builder company microsite.

Changing:

* Project ID,
* Unit ID,
* Lead ID,
* Agent ID,
* Campaign ID,
* Invoice ID

must never expose or mutate another Builder's data.

---

# 7. REQUIRED IMPLEMENTATION ORDER

Implement Batch 8 in this order:

1. Builder shell + Overview
2. My Projects
3. Project create/edit entry and reapproval flow
4. Unit Inventory
5. Unit Edit
6. Project Leads
7. Lead Detail
8. Matching Requirements
9. Proposals
10. Messages
11. Site Visits
12. Team List
13. Invite Agent
14. Permission Editor
15. Campaign List
16. Create Campaign
17. Campaign Detail
18. Ad Analytics
19. Project Analytics
20. Billing + Wallet
21. Invoices
22. Verification / RERA
23. Microsite Edit
24. Construction Progress
25. Notifications
26. Support
27. Settings
28. Full connected regression verification.

Each implementation group must be tested before continuing.

---

# 8. SHARED BUILDER DASHBOARD SHELL

Batch 8 uses the same dashboard structural grammar established by the approved dashboard foundation.

Desktop:

* Builder sidebar,
* dashboard top bar,
* main content,
* notification control,
* profile identity.

Mobile:

* root screen has no back button,
* inner screens use contextual back header,
* full drawer,
* exact five-item dashboard bottom navigation.

---

# 9. EXACT MOBILE BOTTOM NAVIGATION

Every Builder dashboard mobile screen must use:

1. Home
2. Search
3. Post
4. Leads
5. Profile

Builder Post action opens:

**Post Project**

not Post Property.

Do not change the five-item order.

Do not add Units as sixth item.

Do not add Ads as sixth item.

Those modules remain available through the full Builder drawer/navigation.

---

# 10. BUILDER NAVIGATION ARCHITECTURE

The complete Batch 8 Builder dashboard architecture includes access to:

* Overview
* My Projects
* Unit Inventory
* Project Leads
* Matching Requirements
* Proposals
* Messages
* Site Visits
* Agents / Team
* Ads / Campaigns
* Analytics
* Billing
* Verification / RERA
* Company Profile / Microsite
* Notifications
* Support
* Settings

Use the exact visual order from the Batch 8 design source.

Do not retain incomplete current navigation if it omits required Batch 8 modules.

---

# 11. REFERENCE BUILDER DATA

Create persistent development/reference data through real database records for visual and functional verification.

Reference Builder:

`Sankalp Developers`

Initials:

`SD`

Primary city:

`Surat`

Reference Project:

`Sankalp Grand Vista`

Reference area:

`Vesu, Surat`

Reference structure:

* Tower A
* Tower B
* multiple floors
* real Unit records.

Use actual data paths.

Do not hard-code reference strings in production dashboard components.

Do not automatically delete reference records after verification.

---

# 12. SCREEN 1 — BUILDER OVERVIEW

The Builder Overview must be rebuilt according to Batch 8.

The current generic dashboard home is not the final design.

The Overview must present Builder-relevant operational information.

---

# 13. SCREEN 1 OVERVIEW DATA

The Builder Overview must use real metrics such as those defined in the Batch source, including the relevant combination of:

* active Projects,
* available Units,
* new Leads,
* upcoming Site Visits,
* Requirement matches,
* campaign/ad status,
* project activity.

The exact visible labels and order must come directly from the Batch 8 source.

Do not keep generic:

* Projects,
* Units — Not tracked yet,
* Leads,
* Proposals

merely because current code already displays those values.

---

# 14. UNIT METRIC MUST BE REAL

The current application must not display:

`Units — Not tracked yet`

after Batch 8 completion.

Unit Inventory is a major Batch 8 module.

Overview Unit metrics must derive from real Unit records.

Possible display metrics according to the source context include:

* total Units,
* available Units,
* booked Units,
* sold Units.

Use exact Batch 8 visible metric.

---

# 15. PROJECT OVERVIEW ACTIVITY

Recent Builder activity must be driven by real events.

Examples of valid activity sources:

* new Project Lead,
* new matching Requirement,
* Site Visit request,
* campaign approval,
* Project moderation status,
* Unit status update,
* agent assignment.

Every activity item must route to its correct target.

No hard-coded activity list.

---

# 16. OVERVIEW QUICK ACTIONS

Any visible Batch 8 quick action must work.

Possible design actions include:

* Add Project,
* Manage Inventory,
* View Leads,
* Create Campaign,
* Update Construction Progress.

Use exactly the actions shown in the source screen.

Do not add generic ActionCardGrid entries not present in the Batch design.

---

# 17. OVERVIEW LOADING

Use skeletons matching final cards and recent activity.

Do not:

* flash zero,
* show sample data before loading,
* use plain Loading text.

---

# 18. OVERVIEW MOBILE

Mobile Builder Overview must use:

* compact Builder dashboard layout,
* Builder-specific metrics,
* relevant activity,
* exact mobile spacing,
* exact bottom nav.

Root mobile screen:

no back button.

---

# 19. SCREEN 2 — MY PROJECTS

Screen 2 is the complete Builder Project management list.

Required states:

* populated,
* loading,
* empty,
* error,
* Project status variations,
* mobile Project cards.

---

# 20. PROJECT STATUS TABS

The Project list must support real status filtering according to Batch 8 and Project lifecycle.

Relevant states may include:

* All
* Live
* Pending
* Draft
* Needs Changes
* Paused
* Rejected
* Expired

Use exact Batch source labels.

Tab counts must come from exact database counts.

Do not calculate from the current page's 20 rows.

---

# 21. PROJECT LIST ROW/CARD DATA

Each Project item must show actual Batch-required data, such as:

* Project name,
* city/locality,
* Project type,
* Project status,
* unit availability,
* Lead count,
* possession data,
* moderation status.

Use exact visible arrangement from source.

---

# 22. PROJECT ACTIONS

Actions must be status-aware.

Required action categories include:

* View
* Edit
* Manage Units
* Pause
* Resume
* Submit
* Resubmit
* Delete/Archive according to product rules.

Do not show an action the backend rejects.

---

# 23. PROJECT VIEW

Project View must open the correct:

* public Project page for live Project,

or

* authorized Builder status/preview view for non-public Project.

Do not expose pending Project publicly.

---

# 24. PROJECT EDIT

Edit opens the real Batch 5 Project Wizard in edit mode.

Required:

* preload current data,
* restore media,
* restore tower/wing configuration,
* preserve Project ownership,
* preserve moderation state.

---

# 25. PROJECT LIST MOBILE

Mobile uses Project cards.

Do not compress desktop table into horizontal scroll unless the exact source explicitly shows it.

Each card must preserve:

* Project identity,
* key status,
* important operational data,
* overflow actions.

---

# 26. PROJECT LIST EMPTY STATE

Use the exact Batch 8 empty-state design.

Action must open:

`Post Project`

Batch 5 Project Wizard.

---

# 27. PROJECT PAGINATION

Use scalable pagination.

Do not assume Builder always has fewer than 100 Projects.

Counts remain exact independent of page.

---

# 28. SCREEN 3 — PROJECT WIZARD ENTRY + EDIT REAPPROVAL FLOW

Screen 3 connects Batch 8 Builder management to Batch 5 Project Wizard.

Batch 8 does not replace the canonical Batch 5 Project Wizard.

It defines:

* Project creation entry,
* Draft continuation,
* Live Project Edit warning,
* reapproval behavior.

---

# 29. CREATE PROJECT ENTRY

Create action opens:

**Batch 5B Project Wizard**

with:

10 canonical steps.

Do not create a second separate Project form.

---

# 30. PROJECT DRAFT RESUME

Draft card must show real:

* Project name,
* current wizard step,
* save timestamp,
* completion status.

Continue must restore:

* Project fields,
* Unit structure,
* amenities,
* media,
* brochure,
* dates,
* contact data.

---

# 31. PROJECT REAPPROVAL RULE

Batch 8 explicitly requires:

Editing critical live Project data sends changes for review.

Critical examples:

* price,
* RERA information,
* Unit counts.

The approved existing Project remains live with old approved data until the new edit is approved.

This behavior is intentionally different from the Batch 5 Property edit rule.

---

# 32. PROJECT VERSIONING REQUIREMENT

To support:

`live old data remains public while edit is under review`

the backend must not overwrite public live Project fields immediately.

Use a safe architecture such as:

* Project revision table,
* pending edit snapshot,
* versioned Project state,
* approved/current record plus pending revision.

Do not:

update live row directly
→ then mark pending.

That would expose unapproved changes publicly.

---

# 33. PROJECT EDIT REVIEW WORKFLOW

Required flow:

Live Project
→ Builder chooses Edit
→ warning explains reapproval
→ Builder edits draft revision
→ saves revision
→ submits revision
→ moderation receives edit request
→ public page still shows approved old data
→ admin approves revision
→ revision becomes current public Project
→ old version preserved in audit/history as required.

---

# 34. PROJECT RLS EDIT CONSISTENCY

Ensure UI permissions and backend permissions agree for:

* Draft,
* Needs Changes,
* Rejected,
* Live with pending revision,
* Paused.

No button may lead to guaranteed RLS failure.

---

# 35. SCREEN 4 — FLAGSHIP UNIT INVENTORY

Unit Inventory is a flagship Batch 8 screen.

It must not be treated as a basic generic table.

Desktop and mobile have intentionally different layouts.

Desktop:

* sticky data table,
* Project context,
* Tower/Wing navigation,
* bulk selection,
* filters/actions.

Mobile:

* true hierarchy accordion,
* Wing/Tower → Floor → Units.

---

# 36. UNIT INVENTORY DATA MODEL

Unit Inventory must use real structured records.

Required relationships:

Builder
→ Project
→ Tower/Wing
→ Floor
→ Unit.

Each Unit should support the required fields from the actual Batch/product architecture, including applicable:

* Unit code/name,
* type,
* BHK/configuration,
* carpet area,
* price,
* floor,
* status.

Do not store entire Inventory only as one JSON blob if individual Unit operations are required.

---

# 37. UNIT STATUS SET

Batch 8 core design uses status management such as:

* Available
* Booked
* Sold

If the approved wider product model also supports:

* Hold
* Not Released

only expose those where final product authority requires them.

Do not invent extra statuses from old projects if they conflict with final Batch behavior.

---

# 38. DESKTOP INVENTORY PROJECT CONTEXT

Inventory must identify:

* Project,
* Tower/Wing,
* floors,
* total Units,
* filter/scope.

Reference project context should use:

`Sankalp Grand Vista`

with actual database records.

---

# 39. DESKTOP STICKY TABLE

The desktop Inventory table must preserve usability with large datasets.

Required:

* sticky header where shown,
* stable columns,
* row selection,
* status badges,
* bulk actions,
* horizontal containment without breaking entire page.

Do not render hundreds of Units with no pagination/virtualization strategy if data volume is large.

---

# 40. UNIT FILTERS

Use real filtering where present in source.

Potential filter dimensions include:

* Tower/Wing,
* Floor,
* Configuration,
* Status.

Use the exact source controls.

---

# 41. BULK SELECTION

Desktop Unit rows support bulk selection.

When selection exists:

show exact bulk action bar.

Selection count must be real.

Do not show:

`2 selected`

if three records are selected.

---

# 42. BULK STATUS UPDATE

Bulk actions must update only selected Units.

Required:

* Builder ownership check,
* same Project scope validation,
* allowed transition validation,
* transaction/batch safety,
* UI refresh,
* failure handling.

A malicious request containing Unit IDs from another Builder must fail.

---

# 43. BULK PRICE UPDATE

If Batch 8 Unit Inventory includes price bulk action, it must:

* show selected count,
* accept canonical numeric value,
* validate,
* update only authorized selected Units,
* persist.

Do not update only displayed text.

---

# 44. UNIT INVENTORY MOBILE HIERARCHY

Mobile must use true accordion grouping.

Structure:

Project
→ Wing/Tower
→ Floor
→ Unit cards.

Example:

Tower A
→ Floor 7
→ A-701
→ A-702
→ A-703
→ A-704.

Do not render desktop table at 390px.

---

# 45. MOBILE ACCORDION FUNCTIONALITY

Each hierarchy level must:

* expand,
* collapse,
* preserve usable scroll position,
* show correct count/status summary.

Do not allow one unit click to accidentally collapse parent accordion.

---

# 46. MOBILE UNIT CARD

Each Unit card must show exact Batch-required fields.

Core information includes:

* Unit identifier,
* configuration,
* area,
* price,
* status.

Actions must open Unit Edit or status menu according to design.

---

# 47. INVENTORY CONSISTENCY

Unit Inventory must remain consistent with:

* Batch 5 Project structure,
* Batch 4 Project public configurations,
* Builder Project Analytics.

If Unit status changes:

public Project availability should update according to product rules.

Do not maintain three disconnected Unit totals.

---

# 48. STRUCTURE REGENERATION SAFETY

When Project tower/floor structure changes:

never blindly regenerate and duplicate Units.

Required:

* idempotent generation,
* change preview,
* protect Booked/Sold Units,
* confirmation for destructive structural edits,
* transactional consistency.

---

# 49. SCREEN 5 — UNIT EDIT

Unit Edit has:

Desktop:

centered modal.

Mobile:

bottom sheet.

Same data and functionality.

---

# 50. UNIT EDIT FIELDS

Use exact Batch 8 visible fields.

At minimum the screen must support fields required by the design such as:

* Unit price,
* status.

If design includes other Unit fields, implement them exactly.

Do not add unrelated fields.

---

# 51. UNIT EDIT SAVE

Save Changes must:

* validate Builder ownership,
* validate numeric price,
* validate status,
* persist,
* create audit/activity entry where required,
* refresh Inventory.

No fake success toast.

---

# 52. DESKTOP UNIT MODAL

Must:

* center correctly,
* not clip inside dashboard overflow containers,
* use correct z-index,
* close on defined actions,
* support Escape,
* prevent duplicate Save.

---

# 53. MOBILE UNIT BOTTOM SHEET

Must:

* anchor bottom,
* use drag handle,
* respect safe area,
* lock background appropriately,
* remain usable with keyboard.

Do not use desktop centered modal on mobile.

---

# 54. SCREEN 6 — PROJECT LEADS LIST

Project Leads extends the Broker CRM pattern.

Batch 8 Lead List includes Builder-specific columns:

* Project
* Agent

in addition to CRM Lead data.

---

# 55. PROJECT LEADS TABLE

Use real Lead records.

Desktop must show exact Batch 8 columns.

Core data includes:

* Lead identity,
* Project,
* Agent assignment,
* status/stage,
* source,
* activity/date according to source.

---

# 56. PROJECT FILTER

Builder must be able to scope Leads by Project where Batch design provides it.

Query actual Project ID.

Do not filter by matching Project title text.

---

# 57. AGENT FILTER

Filter by actual assigned Agent relationship.

Options must include:

* assigned Agents,
* unassigned state where applicable.

---

# 58. LEAD SOURCE

Builder lead sources may include actual sources such as:

* Project enquiry,
* Contact,
* Brochure download,
* Site Visit request,
* Message,
* Ad Campaign.

Use structured source data.

Do not infer from notes.

---

# 59. LEAD ASSIGNMENT DISPLAY

Agent column must show:

* assigned Agent identity,

or

* Unassigned

according to real relationship.

Do not show fake Agent avatars.

---

# 60. PROJECT LEADS MOBILE

Mobile cards must preserve:

* Lead name,
* Project,
* Agent,
* status,
* activity.

Use exact Batch responsive card arrangement.

Do not hide Agent assignment without another accessible path.

---

# 61. LEAD LIST LOADING / EMPTY / ERROR

Required:

* skeleton,
* actionable empty state,
* recoverable error,
* Retry.

No fake Lead rows.

---

# 62. LEAD LIST PERFORMANCE

Avoid N+1 queries for:

* Project name,
* Agent identity,
* last activity,
* unread count.

Use:

* joins,
* batched maps,
* DB view/RPC.

---

# 63. SCREEN 7 — PROJECT LEAD DETAIL

Lead Detail extends Batch 7 CRM Lead Detail and Batch 6 Lead Detail.

Builder-specific addition:

**Assigned Agent block.**

---

# 64. LEAD DETAIL CONTENT

The exact screen must include:

* Lead identity,
* source,
* Project context,
* status/stage,
* authorized contact state,
* Call,
* Message,
* timeline,
* notes,
* Site Visit action,
* Assigned Agent.

---

# 65. ASSIGNED AGENT BLOCK

Assigned Agent block must show real:

* Agent avatar/initial,
* Agent name,
* assignment state.

Actions according to design may include:

* Assign,
* Reassign,
* Unassign.

Implement only exact visible actions from Batch source.

---

# 66. ASSIGN AGENT SECURITY

Builder may assign only:

* active Team member belonging to their own Builder Team.

Do not allow arbitrary profile ID assignment.

Server must verify:

* Builder owns Lead context,
* Agent belongs to Builder organisation,
* Agent active status,
* permission eligibility.

---

# 67. AGENT ASSIGNMENT EFFECT

After assignment:

* Lead record/relation updated,
* assignment activity event created,
* Agent receives notification,
* assigned Agent sees Lead according to permission model.

No fake notification.

---

# 68. LEAD TIMELINE

Timeline may include real events such as:

* Lead received,
* Agent assigned,
* status changed,
* Note added,
* Site Visit requested,
* Proposal event,
* Message event.

Do not fabricate timeline entries.

---

# 69. SCREEN 8 — MATCHING REQUIREMENTS FEED

Screen 8 allows Builder to see Requirements matched to real Project criteria.

The matching explanation must be concrete.

Never use vague:

`95% Match`

without explainable basis.

---

# 70. REQUIREMENT MATCHING INPUT

Matching should use actual structured criteria such as:

* Project city,
* locality,
* category,
* configuration,
* price range,
* Requirement intent,
* mandatory specifications.

---

# 71. EXPLAINABLE MATCH TEXT

Valid match explanations should describe real criteria.

Examples:

* Same city and Project category
* Budget overlaps with 3 BHK configuration
* Preferred locality matches Project locality
* Possession timeline fits Requirement

Do not display:

`AI Match 95%`

unless a real, explainable approved scoring system exists.

---

# 72. MATCHING REQUIREMENT CARD

Each card must show actual:

* Requirement title,
* budget,
* locations,
* relevant specifications,
* timeline,
* match explanation,
* Proposal status.

---

# 73. SEND PROPOSAL FROM BUILDER FEED

Send Proposal must use the real Proposal system.

Builder Proposal may attach:

* Project,
* appropriate Project configuration

according to final design/product flow.

Do not attach a Property listing if Builder flow requires a Project.

---

# 74. PROPOSAL DUPLICATE PROTECTION

Prevent duplicate active Proposal against the same Requirement.

Use:

* client submit protection,
* server validation,
* database/idempotency protection where practical.

---

# 75. MATCHING FEED EMPTY STATE

Use exact Batch 8 empty state.

It must explain why no matching Requirements exist and provide the relevant action where shown.

Do not show fake Requirements.

---

# 76. SCREEN 9 — PROPOSALS

Batch 8 reuses the Proposal pattern from Batch 7 with Builder Project context.

Required:

* sent Proposal list,
* status tabs,
* Proposal Detail,
* Requirement summary,
* proposed Project/configuration,
* message,
* timeline,
* Withdraw,
* Message requester.

---

# 77. BUILDER PROPOSAL CONTEXT

The Proposal must retain actual:

* Requirement ID,
* Builder ID,
* Project ID,
* optional configuration/unit context,
* recipient,
* message,
* offered price if applicable,
* status.

Do not store proposed Project only inside free text.

---

# 78. PROPOSAL STATUS COUNTS

Counts such as:

* Sent,
* Viewed,
* Shortlisted,
* Accepted,
* Rejected

must be exact.

Do not derive from one page of records.

---

# 79. PROPOSAL TIMELINE

Use persisted status events.

Do not infer viewed timestamp from current status.

---

# 80. SCREEN 10 — MESSAGES

Batch 8 reuses the shared Messages architecture.

Required:

* Thread List,
* unread count,
* Thread Detail,
* Project context,
* safety banner,
* sticky input,
* real messages,
* participant authorization.

---

# 81. BUILDER MESSAGE CONTEXT

Threads may be associated with:

* Project Lead,
* Requirement Proposal,
* Site Visit.

Show correct contextual entity.

Do not display wrong Project in chat header.

---

# 82. MESSAGE PERFORMANCE

Avoid N+1 for:

* last message,
* Agent/Lead identity,
* unread count,
* Project context.

---

# 83. MESSAGE REALTIME HONESTY

If realtime is active:

use real subscription.

If not:

use honest refresh/polling/revalidation.

Do not fake instant delivery.

---

# 84. SCREEN 11 — SITE VISIT DETAIL WITH ASSIGN-TO-AGENT DELTA

Builder Site Visit flow reuses shared Site Visit behavior.

Batch 8 adds:

**Assign to Agent.**

---

# 85. SITE VISIT CORE ACTIONS

Required shared behavior:

* Accept,
* Reschedule,
* Reject,
* Details,
* Directions,
* date/time.

No money/token/escrow behavior should be introduced into normal Site Visit coordination.

---

# 86. ASSIGN VISIT TO AGENT

Builder may assign Site Visit coordination to a Team Agent.

Server must verify:

* Builder owns/controls Project,
* Visit belongs to that Project,
* Agent belongs to Builder Team,
* Agent has relevant permission.

---

# 87. SITE VISIT ASSIGNMENT NOTIFICATION

After assignment:

* relation persists,
* Agent notified through real notification system,
* Agent can access assigned Visit,
* Builder retains oversight according to permissions.

---

# 88. SITE VISIT REASSIGN

If exact Batch screen allows reassign:

* preserve history,
* notify new Agent,
* revoke previous assignment access where required.

Do not silently overwrite without audit.

---

# 89. SCREEN 12 — AGENTS / TEAM LIST

Screen 12 is the Builder Team management list.

It must not be omitted.

Required states:

* populated,
* pending invitation,
* active,
* inactive/removed according to design,
* empty,
* loading,
* error.

---

# 90. TEAM MEMBER DATA

Each Agent record must contain real:

* identity,
* phone/email according to safe role model,
* invitation/active state,
* permissions,
* assignment counts where shown.

Do not hard-code Team members.

---

# 91. TEAM LIST ACTIONS

Visible actions may include exact source operations such as:

* View,
* Edit Permissions,
* Remove/Deactivate,
* Invite Agent.

Use exact source design.

---

# 92. TEAM EMPTY STATE

Provide the exact action:

Invite Agent.

No fake Agents.

---

# 93. AGENT ACCESS MODEL

Agent must be represented through a secure organisation/team relationship.

Do not implement Team permission using only a text role label.

Required:

Builder organisation
→ Agent membership
→ permission set
→ active/inactive/invited status.

---

# 94. SCREEN 13 — INVITE AGENT

Invite Agent must exist as:

* desktop modal,
* mobile bottom sheet

according to Batch 8 design.

---

# 95. AGENT INVITE DATA

Use exact Batch fields.

Possible required identity data from design must be implemented exactly.

The invitation architecture must use real invitation state.

---

# 96. INVITE FLOW

Required:

Builder
→ opens Invite Agent
→ enters required details
→ submit
→ server validates Builder Team entitlement
→ creates invitation
→ sends real invitation if provider configured
→ pending invite shown in Team list.

No fake Sent state.

---

# 97. INVITE PROVIDER HONESTY

If SMS/Email invite provider is missing:

* persist invitation,
* show honest pending/manual/setup state,
* do not claim message delivered.

Record missing provider in external setup documentation.

---

# 98. INVITE DUPLICATE PROTECTION

Prevent duplicate active invitation for same Team membership identity.

Handle:

* already active Agent,
* pending invitation,
* expired invitation,
* revoked invitation.

---

# 99. AGENT SEAT PLAN GATE

If Builder plan controls Team seats:

check server-side before invitation.

Do not allow seat-limit bypass through direct API call.

---

# 100. INVITE LINK SECURITY

If invitation link/token is used:

* random high entropy,
* expiry,
* single-use semantics,
* correct organisation binding,
* no role escalation.

---

# 101. SCREEN 14 — AGENT PERMISSIONS EDITOR

This is a real permissions editor.

Do not replace with one:

`Admin / User`

dropdown.

---

# 102. PERMISSION MODEL

Use the exact Batch 8 permission categories.

Permissions must map to real server-enforced capabilities.

Relevant functional scopes may include:

* View assigned Leads,
* update Lead stage,
* add Lead notes,
* manage assigned Site Visits,
* Message Lead/requester,
* view Project data.

Use exact Batch visible permission labels.

---

# 103. PERMISSION CHECKBOXES / TOGGLES

Each visible permission control must:

* reflect actual saved permission,
* persist changes,
* enforce backend behavior.

Do not make permission toggles cosmetic.

---

# 104. PERMISSION SERVER ENFORCEMENT

An Agent without a permission must fail when calling the protected server action directly.

Frontend hiding is not enough.

---

# 105. PERMISSION CHANGE AUDIT

Record:

* who changed permission,
* Agent,
* previous state,
* new state,
* timestamp.

---

# 106. REMOVE AGENT IMPACT

Removing/deactivating Agent must handle assigned:

* Leads,
* Visits,
* tasks.

Do not orphan assignments silently.

Use safe:

* reassignment requirement,
* unassign workflow,
* controlled inactive state.

---

# 107. SCREEN 15 — AD CAMPAIGN LIST

Builder Ads is a full Batch 8 module.

It must not remain:

`Coming Soon`.

Screen 15 shows Campaign list and statuses.

---

# 108. CAMPAIGN STATUS MODEL

Support real campaign lifecycle aligned with the approved advertising system.

Relevant statuses may include:

* Draft
* Pending Review
* Approved
* Active
* Paused
* Rejected
* Expired
* Completed

Use exact Batch 8 visible status subset.

---

# 109. CAMPAIGN LIST DATA

Each Campaign item must show actual Batch-required fields, such as:

* Campaign name,
* promoted Project,
* target city,
* schedule,
* status,
* spend/budget,
* performance where real.

Use exact source arrangement.

---

# 110. CAMPAIGN ACTIONS

Status-aware actions may include:

* View,
* Edit,
* Pause,
* Resume,
* Create Campaign,
* Duplicate where design permits.

Do not show invalid action.

---

# 111. PENDING REVIEW

A Builder cannot approve own Campaign.

Submit Campaign
→ Pending Review
→ Admin reviews
→ Approved/Rejected
→ Active when schedule/payment conditions pass.

No fake self-approval.

---

# 112. CAMPAIGN LIST EMPTY STATE

Use exact Batch 8 empty state.

CTA:

Create Campaign.

---

# 113. SCREEN 16 — CREATE AD CAMPAIGN WIZARD

Create Ad Campaign is a functional wizard.

Follow exact Batch 8 steps and layout.

Do not create one generic text form.

---

# 114. CAMPAIGN PROMOTED ENTITY

Builder Campaign must select an eligible owned target according to design.

Examples may include:

* Project.

If design includes another Builder ad target, implement it exactly.

Server validates ownership.

---

# 115. AD CREATIVE

Use exact Batch 8 creative fields.

Where banner media is uploaded:

* validate file type,
* validate size,
* validate required dimensions/aspect ratios,
* upload real media,
* show preview.

Do not show uploaded before persistence.

---

# 116. CAMPAIGN TARGETING

Use exact targeting controls shown in source.

Potential supported design targeting includes:

* city,
* placement,
* schedule.

Do not add hidden ad-tech targeting not shown in Batch 8.

---

# 117. CAMPAIGN SCHEDULE

Validate:

* start date,
* end date,
* start <= end,
* future scheduling rules,
* timezone.

Expired schedule cannot become Active.

---

# 118. CAMPAIGN BUDGET / WALLET

If campaign uses wallet/credits:

* server-side balance authority,
* reserve/debit behavior defined,
* prevent overspend,
* no client-authoritative wallet value.

---

# 119. CAMPAIGN DRAFT

Save Draft must persist actual Campaign state.

Resume must restore:

* selected Project,
* creative,
* targeting,
* schedule,
* budget.

---

# 120. CAMPAIGN SUBMISSION

Submit must:

1. authenticate Builder,
2. verify Campaign ownership,
3. validate Project ownership,
4. validate creative,
5. validate schedule,
6. validate wallet/payment requirement,
7. create pending-review state,
8. notify moderation queue.

Do not show Active immediately unless the approved business flow explicitly allows it after all review/payment/schedule requirements.

---

# 121. CAMPAIGN DUPLICATE SUBMIT PROTECTION

Prevent double Campaign creation.

Use:

* immediate button disable,
* server idempotency,
* transaction protection where needed.

---

# 122. SCREEN 17 — CAMPAIGN DETAIL

Campaign Detail shows:

* campaign information,
* promoted Project,
* targeting,
* schedule,
* status,
* creative,
* performance.

Performance must be honest.

---

# 123. CAMPAIGN PERFORMANCE

Display only actual tracked values.

Potential metrics:

* impressions,
* clicks,
* CTR,
* Leads.

Use exact source metrics.

Do not create random numbers.

---

# 124. CTR CALCULATION

When displayed:

CTR = clicks / impressions × 100.

Handle zero impressions safely.

Do not divide by zero.

---

# 125. LEAD ATTRIBUTION

Campaign Leads must be linked using real attribution.

Do not count all Project Leads as Campaign Leads.

Use:

* Campaign source tag,
* UTM,
* ad click/impression relationship,
* campaign attribution data.

---

# 126. CAMPAIGN DATE RANGE

Performance must match Campaign date scope or selected filter.

Do not mix lifetime and current-range metrics without correct label.

---

# 127. CAMPAIGN PAUSE

Pause action must:

* persist status,
* stop eligible serving,
* preserve historical metrics.

Do not erase Campaign.

---

# 128. SCREEN 18 — AD ANALYTICS SETUP REQUIRED

Batch 8 explicitly defines an honest Setup Required state.

If analytics/ad tracking provider is not configured:

show:

**Setup Required**

according to exact design.

Do not display:

* fake impressions,
* fake clicks,
* fake CTR,
* fake Leads.

---

# 129. AD ANALYTICS PROVIDER STATE

Distinguish:

### Provider not connected

Setup Required.

### Provider connected but no data

Honest no-data/zero state.

### Campaign not active

Correct inactive status.

Do not use one generic empty chart.

---

# 130. SETUP ACTION

Any Setup action shown must route only to an area the Builder is permitted to use.

If provider setup is Super Admin-only:

Builder should not receive a dead system-settings link.

Show the correct support/admin-required explanation according to design/product architecture.

---

# 131. SCREEN 19 — PROJECT ANALYTICS

Project Analytics must use real Project data.

No fake chart.

---

# 132. PROJECT ANALYTICS SCOPE

Analytics should support the exact Batch 8 Project performance categories shown.

Relevant real metrics may include:

* Project views,
* Leads,
* unit interest,
* Site Visits,
* brochure downloads.

Use only metrics visible in source.

---

# 133. PROJECT FILTER

If Analytics allows Project selection:

query real Builder-owned Projects.

Do not allow another Builder's Project ID.

---

# 134. ANALYTICS PERIOD

Use exact Batch source period controls.

Examples may include:

* date range,
* last 30 days,
* Project selection.

Do not fabricate period labels.

---

# 135. PROJECT VIEWS

Count real Project detail-view events.

Do not include:

* Builder preview,
* admin moderation preview,
* draft preview,

unless analytics definition explicitly includes them.

---

# 136. PROJECT LEADS

Use actual Leads linked to selected Project.

---

# 137. UNIT INTEREST

If Batch 8 displays Unit/configuration interest:

derive from actual:

* enquiry configuration,
* Proposal context,
* Lead interest metadata.

Do not infer only from available Unit count.

---

# 138. SITE VISIT METRIC

Use real Project-linked Site Visit records.

---

# 139. BROCHURE DOWNLOAD METRIC

Count real Brochure download events if tracked.

If download event tracking is not implemented:

display honest unavailable data or Setup Required state.

Do not use brochure file view count fabricated in client.

---

# 140. ANALYTICS INSUFFICIENT DATA

If provider exists but data volume is insufficient:

show honest insufficient-data state.

Do not show Setup Required.

---

# 141. ANALYTICS PROVIDER MISSING

If required tracking is not configured:

show Setup Required.

No fake lines/bars.

---

# 142. ANALYTICS PERFORMANCE

Aggregate server-side.

Do not fetch millions of raw events into Browser.

Use:

* aggregate query,
* RPC,
* analytics provider aggregation.

---

# 143. SCREEN 20 — BUILDER BILLING + AD WALLET

Screen 20 is Builder-specific Billing.

It combines:

* Builder subscription,
* usage,
* Ad Wallet.

---

# 144. BUILDER PLAN

Display actual:

* Plan name,
* price,
* billing date,
* status,
* usage limits.

Do not hard-code a reference plan globally.

---

# 145. PROJECT USAGE

Use actual:

* Projects used,
* Project limit.

Do not calculate from only current page.

---

# 146. OTHER PLAN USAGE

Where Batch 8 shows entitlement usage, use actual limits.

Potential Builder plan entitlements include:

* Projects,
* Ads,
* Team seats,
* analytics access.

Use exact design metrics.

---

# 147. AD WALLET

Ad Wallet must show actual:

* current balance,
* transaction/recharge capability according to design,
* spend.

Client display is not balance authority.

---

# 148. WALLET LEDGER

Every wallet mutation must create an immutable ledger record.

Examples:

* top-up,
* campaign reserve,
* campaign charge,
* refund/reversal,
* manual credit.

Do not rely only on one mutable `balance` column.

---

# 149. WALLET CONCURRENCY

Prevent race-condition overspend.

Do not:

read balance
→ compare
→ update

without locking/atomic DB operation.

Use transaction or RPC.

---

# 150. WALLET RECHARGE

If payment gateway configured:

* create payment order,
* verify payment,
* webhook confirmation,
* credit wallet idempotently.

Do not credit wallet from client success callback alone.

---

# 151. PAYMENT PROVIDER MISSING

If payment provider not configured:

use honest:

* Pending,
* Manual Payment,
* Setup Required

according to approved architecture.

Never show fake wallet credit.

---

# 152. BILLING MANAGE PLAN

Manage Plan must work.

Do not leave dead.

---

# 153. SCREEN 21 — INVOICES

Screen 21 uses shared Invoice architecture with Builder context.

Required:

* desktop table,
* mobile cards,
* View,
* Download,
* printable Invoice Detail,
* empty state.

---

# 154. BUILDER INVOICE TYPES

Invoices may relate to actual paid financial events such as:

* subscription,
* wallet recharge,
* Campaign payment

according to billing system.

Do not create invoice for failed payment.

---

# 155. INVOICE OWNERSHIP

Builder can access only own organisation/account invoices.

No ID enumeration leak.

---

# 156. INVOICE PDF

Download must produce/open actual invoice document.

If PDF provider/generation is unavailable:

show honest state.

No blank PDF.

---

# 157. GST DATA

Show GSTIN only when actual approved billing profile data exists.

Do not use verification document upload alone as invoice GSTIN authority.

---

# 158. SCREEN 22 — BUILDER RERA / VERIFICATION

Screen 22 is Builder-specific verification.

It includes real RERA proof flow.

---

# 159. BUILDER VERIFICATION COMPONENTS

Support required Batch 8 verification categories, including:

* company/business verification,
* RERA proof.

Use exact source fields and status layout.

---

# 160. RERA DOCUMENT UPLOAD

Required:

* private file storage,
* authentication,
* Builder ownership,
* file validation,
* review workflow,
* real status.

Do not place RERA proof in public Project media bucket.

---

# 161. RERA NUMBER VS RERA PROOF

A typed RERA number is not proof of verification.

Separate:

* number entered,
* proof uploaded,
* review pending,
* verified,
* rejected.

---

# 162. VERIFICATION BADGES

Public Builder/RERA badge appears only after real approved verification.

Do not activate badge after upload.

---

# 163. VERIFICATION REJECTION

Rejected state must show:

* actual review reason,
* review timestamp,
* Re-submit action.

Do not hard-code rejection reason.

---

# 164. VERIFICATION RESUBMIT

Replacement document submission must:

* create new review state,
* preserve previous audit history,
* notify review queue.

---

# 165. SCREEN 23 — COMPANY MICROSITE EDIT

Screen 23 edits Builder's public company microsite.

It must connect to Batch 4 Builder public page.

---

# 166. MICROSITE FIELDS

Use exact Batch 8 visible fields.

Relevant company data includes the source-defined set such as:

* company identity,
* About,
* company summary,
* location/HQ,
* founded year,
* public business content,
* cover/logo where shown.

Do not add arbitrary fields from old designs.

---

# 167. MICROSITE PREVIEW CONSISTENCY

The edit screen and public Builder microsite must use the same canonical data.

Do not create one set of fields for dashboard and another static public profile.

---

# 168. COMPANY LOGO / COVER

Where exact source supports media:

* real upload,
* file validation,
* crop where shown,
* persistent storage,
* public-safe rendering.

Do not fake upload.

---

# 169. ABOUT TEXT

Use safe text limits.

Sanitize.

Do not render arbitrary unsafe HTML.

---

# 170. SAVE CHANGES

Must:

* verify Builder,
* validate fields,
* persist,
* invalidate public profile cache,
* show success only after DB write.

---

# 171. PUBLIC PREVIEW

If exact Batch screen includes Preview/View Microsite:

action must open real public Builder profile.

Use new tab only where design/workflow requires preserving unsaved editing context.

Do not open every internal route in new tab.

---

# 172. SCREEN 24 — CONSTRUCTION PROGRESS UPDATE

Construction Progress is a dedicated Builder workflow.

It must not be reduced to one percentage input only if Batch 8 shows full progress update behavior.

---

# 173. PROGRESS UPDATE DATA

Use exact Batch fields such as:

* selected Project,
* construction stage,
* progress percentage,
* update date,
* progress note,
* photos.

Implement only exact visible fields from source.

---

# 174. PROJECT OWNERSHIP

Builder may update only own Project.

Server verifies Project ownership.

---

# 175. PROGRESS PERCENTAGE

Validate range:

0–100.

Do not allow:

* negative,
* > 100,
* NaN.

---

# 176. CONSTRUCTION STATUS CONSISTENCY

Progress percentage and Project construction status must remain coherent.

Do not automatically mark Project Completed merely because client submits 100 unless approved business rule defines that transition.

---

# 177. PROGRESS PHOTO UPLOAD

Where Batch source shows progress photos:

* upload real images,
* validate,
* persist order/date association,
* retry failure.

Do not fake progress-photo timeline.

---

# 178. PROGRESS HISTORY

Public Project page should show approved/public-safe progress according to product rules.

Preserve previous updates.

Do not overwrite history with only latest percentage.

---

# 179. PROGRESS UPDATE NOTIFICATIONS

If product flow notifies interested users:

only send through real notification system.

Do not fake external push/WhatsApp/email delivery.

---

# 180. SCREEN 25 — NOTIFICATIONS CENTER

Batch 8 Notification Center uses shared notification architecture with Builder-specific event types.

---

# 181. BUILDER NOTIFICATION TYPES

Relevant Batch 8 Builder events include real notifications such as:

* new Project Lead,
* Requirement match,
* Site Visit event,
* Agent assignment/team event,
* Campaign status event,
* Project moderation status,
* Verification status.

Use exact Batch source notification types.

---

# 182. TYPED NOTIFICATION ROUTES

Each notification must open correct target.

Examples:

New Project Lead
→ exact Lead Detail.

Campaign Approved
→ Campaign Detail.

Project Needs Changes
→ exact Project edit/status flow.

RERA verification rejected
→ Verification screen.

---

# 183. MARK ALL READ

Must persist.

Update badges after refresh.

---

# 184. NOTIFICATION PAGINATION

Use bounded pagination for long history.

---

# 185. NOTIFICATION DUPLICATE PROTECTION

Do not create duplicate notifications for one event/status transition.

---

# 186. SCREEN 26 — SUPPORT / HELP

Builder Support uses shared Support structure with Builder-relevant content.

Required:

* FAQ,
* ticket creation,
* ticket list,
* ticket status.

---

# 187. BUILDER FAQ CONTENT

The exact Batch 8 Builder FAQ items must be preserved.

Builder support themes may include:

* Project review,
* RERA,
* Inventory,
* Ads,
* Billing

only where exact design includes them.

Do not use Owner-only FAQ copy unchanged.

---

# 188. SUPPORT TICKET

Must persist real ticket.

Include:

* Builder identity,
* category,
* subject/details,
* status,
* timestamps.

---

# 189. SUPPORT TICKET ROUTING

Ticket cards must open actual Ticket detail/conversation where product architecture provides it.

No dead card.

---

# 190. SCREEN 27 — BUILDER SETTINGS

Builder Settings uses shared settings foundation with Builder-specific preferences.

Required screen sections must match Batch 8 source.

---

# 191. NOTIFICATION PREFERENCES

Preferences must persist actual values.

Do not confuse:

enabled preference

with

provider delivery success.

---

# 192. REQUIREMENT MATCH ALERTS

If Batch 8 Settings includes matching Requirement alerts:

support exact visible frequency choices.

For scheduled digest:

a real scheduled job is required.

Do not fake digest availability.

---

# 193. LEAD ASSIGNMENT NOTIFICATIONS

Where settings expose Lead/Agent alert preference:

persist and enforce it.

---

# 194. CAMPAIGN NOTIFICATIONS

Where exact settings include Campaign status alerts:

connect to real campaign status events.

---

# 195. APPEARANCE

If shared settings include:

* Light,
* Dark,
* System

make them real.

Do not create visually broken dark mode.

---

# 196. LANGUAGE

Use exact current language state.

Do not make Coming Soon localization appear fully active.

---

# 197. DANGER ZONE

If Batch 8 includes Builder account deletion/danger zone through shared Settings:

use the same secure process:

* explicit confirmation,
* OTP,
* grace period,
* organisation/project impact explanation.

Do not instantly delete Builder organisation and orphan Projects/Units.

---

# 198. BUILDER TEAM OWNERSHIP MODEL

Batch 8 Agents require a clear organisation model.

Required relationships:

Builder organisation/profile
→ Team memberships
→ Agent profile
→ permissions
→ assignment state.

Do not use outdated Agency role architecture unless explicitly required.

Builder Team is part of Builder dashboard behavior.

---

# 199. AGENT ROLE SCOPE

An Agent connected to Builder Team must not automatically gain:

* Builder billing access,
* Ads wallet access,
* Campaign creation,
* Builder verification management,
* Team invitation rights

unless Batch 8 permissions explicitly grant such actions.

---

# 200. LEAD ASSIGNMENT DATA MODEL

Use explicit assignment record or protected Lead assignment fields.

Support:

* assigned Agent,
* assigned by,
* assignment time,
* reassignment history.

---

# 201. VISIT ASSIGNMENT DATA MODEL

Site Visit Agent assignment must similarly preserve:

* assigned Agent,
* assignment timestamp,
* reassignment history.

---

# 202. CURRENT REPOSITORY RECONCILIATION — OVERVIEW

The current Builder Overview uses a generic dashboard with:

* Projects,
* Units placeholder,
* Leads,
* Proposals,
* generic Action Cards,
* Account Status card.

This is not Batch 8 complete.

Required:

* remove generic Overview presentation,
* implement exact Batch 8 metrics,
* make Units real,
* implement exact activity/operations layout.

---

# 203. CURRENT REPOSITORY RECONCILIATION — ADS

Current Builder Ads must not remain:

`Coming Soon`

after Batch 8.

Required:

* Campaign List,
* Create Campaign,
* Campaign Detail,
* honest Analytics Setup state,
* wallet integration,
* moderation state.

---

# 204. CURRENT REPOSITORY RECONCILIATION — UNIT INVENTORY

If current Project structure uses only:

* Unit configuration JSON,
* total Unit fields,

that is insufficient for Batch 8 operational Unit Inventory.

Implement Unit-level records.

The source needs:

* individual Unit status,
* Unit edit,
* bulk actions,
* Tower/Floor hierarchy.

---

# 205. CURRENT REPOSITORY RECONCILIATION — TEAM

If current Team/Agents routes exist only as placeholders or old Agency structures:

do not reuse incompatible role semantics.

Implement Builder Team relationships according to Batch 8.

---

# 206. CURRENT REPOSITORY RECONCILIATION — PROJECT REAPPROVAL

Current direct Project update behavior must be inspected.

Batch 8 requires:

critical live edits stay pending separately while existing approved data remains public.

Do not overwrite live public row before approval.

---

# 207. CURRENT REPOSITORY RECONCILIATION — MATCHING REQUIREMENTS

Current matching helper logic must be checked for:

* Builder role,
* Project city,
* Project category.

Extend as needed to support exact Batch 8 concrete match explanation.

Do not show vague score.

---

# 208. CURRENT REPOSITORY RECONCILIATION — LEAD AGENT ASSIGNMENT

If Project Lead currently has no Agent relationship:

add secure assignment architecture.

---

# 209. CURRENT REPOSITORY RECONCILIATION — ANALYTICS

Do not claim Batch 8 Analytics complete if:

* views are fake,
* brochure downloads untracked,
* campaign metrics random,
* Unit interest not real.

Use honest Setup Required/No Data.

---

# 210. PROJECT DATA VERSIONING REQUIREMENT

Because reapproval keeps old Project public, design a safe version model.

Recommended architecture categories:

Project master identity

* approved/current public version
* pending revision.

Critical moderation-sensitive fields should not leak from pending revision.

---

# 211. PROJECT PUBLIC QUERY RULE

Public Project query must read:

**approved active public version only.**

Builder edit screen reads:

* current approved data,
* pending revision where present.

Admin moderation reads:

* diff/current vs pending revision.

---

# 212. PROJECT EDIT CONCURRENCY

Prevent:

* multiple conflicting pending revisions,
* stale save overwriting newer revision,
* approval of outdated revision after a newer version.

Use version/revision number.

---

# 213. UNIT DATABASE INTEGRITY

Add appropriate constraints where applicable:

* Unit belongs to Project,
* Wing belongs to Project,
* Floor hierarchy valid,
* Unit code unique within Project scope,
* price non-negative,
* allowed status enum.

---

# 214. UNIT BULK ACTION TRANSACTION SAFETY

Bulk status update must not produce misleading partial success.

Use transaction/RPC where appropriate.

If partial failure is allowed:

show exact failed/succeeded records.

---

# 215. AGENT PERMISSION RLS

Agent access must be enforced server-side.

Examples:

Agent without Lead permission
→ cannot query assigned Lead endpoint.

Agent without Visit permission
→ cannot update Visit.

Do not rely on sidebar hiding.

---

# 216. AD CAMPAIGN SECURITY

Builder can modify only own Campaigns.

Cannot:

* approve own Campaign,
* change platform placement settings,
* see unrelated Campaign analytics,
* alter another Builder's wallet.

---

# 217. AD WALLET SECURITY

Never trust client balance.

Every debit/credit is server-controlled and recorded.

---

# 218. PAYMENT WEBHOOK SAFETY

Wallet/subscription crediting must be:

* signature verified,
* amount verified,
* currency verified,
* idempotent,
* duplicate-event safe.

---

# 219. LEAD DATA PRIVACY

Project Lead contact fields must follow the approved contact/reveal model.

Do not automatically expose private phone to:

* unrelated Team Agents,
* Agents without assignment,
* other Builders.

---

# 220. REQUIREMENT PRIVACY

Builder Matching Requirements Feed must not expose private requester contact information before allowed Proposal/relationship flow.

---

# 221. VERIFICATION DOCUMENT PRIVACY

RERA/company proof must never be public storage.

Only:

* Builder,
* authorized verification staff

according to access rules.

---

# 222. CAMPAIGN CREATIVE STORAGE

Ad creative may be public-serving media after approval.

Draft/pending creative access should still follow appropriate ownership and moderation access.

---

# 223. REFERENCE PROJECT DATA

Create persistent real reference Project:

`Sankalp Grand Vista`

Builder:

`Sankalp Developers`

Location:

`Vesu, Surat`

Use real:

* Project row,
* tower rows,
* Unit rows,
* Leads,
* Site Visits,
* Campaign.

---

# 224. REFERENCE UNIT DATA

Create sufficient real Unit records across:

* Tower A,
* Tower B,
* multiple floors.

Include status variety:

* Available,
* Booked,
* Sold.

Use Unit IDs/codes consistent with Batch reference patterns.

---

# 225. REFERENCE LEAD DATA

Create actual Project Leads for:

* Project enquiry,
* Brochure download,
* Site Visit Request,
* Campaign Lead

where required to verify source filtering.

---

# 226. REFERENCE TEAM DATA

Create actual Team members:

* active Agent,
* invited Agent,
* permission variations.

Use real memberships.

---

# 227. REFERENCE CAMPAIGN DATA

Create safe development campaign records covering:

* Draft,
* Pending Review,
* Active,
* Rejected/Completed as needed.

Do not create fake live paid production Campaign.

---

# 228. REFERENCE WALLET DATA

Wallet test data must remain isolated from live financial balances.

Use test-mode ledger records.

---

# 229. REFERENCE DATA NON-DELETION

Do not automatically delete reference records after visual verification.

User explicitly requires temporary reference data to remain.

Keep:

* Project,
* Units,
* Leads,
* Team,
* Site Visits,
* Campaign fixture data.

Financial test fixtures must remain safely separated from production.

---

# 230. RESPONSIVE VERIFICATION MATRIX

Test:

* 360px mobile,
* 390px reference mobile,
* larger mobile,
* tablet portrait,
* tablet landscape,
* laptop,
* 1280px desktop,
* wide desktop.

---

# 231. OVERVIEW RESPONSIVE CHECK

Verify:

* metrics,
* activity,
* quick actions,
* mobile hierarchy,
* drawer,
* bottom nav.

---

# 232. PROJECT LIST RESPONSIVE CHECK

Verify:

* filters/tabs,
* Project cards,
* action overflow,
* status badges,
* long Project title wrapping.

---

# 233. UNIT INVENTORY RESPONSIVE CHECK

Desktop:

* sticky table,
* columns,
* bulk bar,
* Tower navigation.

Tablet:

* intentional responsive behavior.

Mobile:

* Tower/Wing accordion,
* Floor accordion,
* Unit cards,
* no desktop table.

---

# 234. PROJECT LEAD RESPONSIVE CHECK

Desktop:

* Project column,
* Agent column,
* filters,
* table.

Mobile:

* cards,
* Project,
* Agent,
* stage,
* actions.

---

# 235. TEAM RESPONSIVE CHECK

Verify:

* Agent identity,
* invitation state,
* permission action,
* mobile card layout,
* Invite bottom sheet.

---

# 236. ADS RESPONSIVE CHECK

Verify:

* Campaign List,
* status badge,
* creative preview,
* Create Wizard,
* Detail metrics,
* Setup Required.

---

# 237. BILLING RESPONSIVE CHECK

Verify:

* plan card,
* usage,
* wallet,
* actions,
* invoice cards.

---

# 238. TEXT WRAPPING CHECK

Inspect:

* Project names,
* Tower names,
* Unit codes,
* Lead names,
* Agent names,
* Requirement titles,
* Campaign names,
* RERA number,
* wallet labels,
* notification copy.

Fix:

* clipping,
* accidental wrapping,
* badge collision,
* button text overflow.

Do not randomly shrink font size.

---

# 239. OVERLAY VERIFICATION

Test every:

* Unit modal,
* Unit bottom sheet,
* Invite Agent modal/sheet,
* Campaign wizard overlay where applicable,
* confirmation dialog,
* dropdown,
* drawer.

Verify:

* z-index,
* outside click,
* internal click,
* Escape,
* background scroll,
* mobile keyboard,
* safe area.

---

# 240. LOADING STATE REQUIREMENT

Required for:

* Overview,
* Projects,
* Unit Inventory,
* Leads,
* Requirements,
* Proposals,
* Messages,
* Site Visits,
* Team,
* Campaigns,
* Analytics,
* Billing,
* Invoices,
* Verification,
* Notifications,
* Support.

Use design-consistent skeletons.

---

# 241. EMPTY STATE REQUIREMENT

Required for:

* No Projects,
* No Units,
* No Leads,
* No Requirement Matches,
* No Proposals,
* No Messages,
* No Visits,
* No Team,
* No Campaigns,
* No Invoices,
* No Notifications.

Actions must be real.

---

# 242. ERROR STATE REQUIREMENT

Support recoverable errors for every server-backed screen.

Examples:

* Inventory load failure,
* Agent invite failure,
* Campaign submission failure,
* Analytics load failure,
* wallet recharge failure,
* RERA upload failure.

Do not expose raw DB/provider errors.

---

# 243. NO DEAD UI RULE

Every visible Batch 8 control must work.

This includes:

* Add Project,
* Project View,
* Edit,
* Manage Units,
* Pause,
* Resume,
* Delete,
* Continue Draft,
* Edit live Project,
* submit revision,
* Unit filters,
* Tower tabs,
* Unit selection,
* bulk actions,
* Unit Edit,
* Lead filters,
* Lead row,
* Assign Agent,
* Reassign,
* Requirement Proposal,
* Proposal actions,
* Message,
* Site Visit actions,
* Assign Visit,
* Invite Agent,
* permission controls,
* Campaign filters,
* Create Campaign,
* Campaign Edit,
* Pause/Resume,
* Campaign Detail,
* Analytics setup action,
* Project Analytics filters,
* Manage Plan,
* Wallet actions,
* Invoice View,
* Download,
* RERA upload,
* Resubmit,
* Microsite Save,
* Construction update,
* Notifications,
* Mark all read,
* FAQ,
* Support Ticket,
* Settings toggles.

No `href="#"`.

No empty click handler.

---

# 244. PERFORMANCE REQUIREMENTS

Avoid N+1 in:

* Unit Inventory hierarchy,
* Project Leads,
* Agent identity enrichment,
* Requirement match explanation,
* Proposal lists,
* Message threads,
* Site Visit list,
* Campaign metrics,
* Project Analytics.

Use:

* database joins,
* batched queries,
* aggregate RPCs,
* views.

---

# 245. PAGINATION REQUIREMENTS

Use pagination/cursors for:

* Projects,
* Units when volume large,
* Leads,
* Requirements,
* Proposals,
* Messages,
* Site Visits,
* Team if needed,
* Campaigns,
* Notifications,
* Invoices.

Do not use fixed first 100 as complete dataset.

---

# 246. PROVIDER DEPENDENCY FILE

Any missing provider required for Batch 8 must be added to:

`MISSING_API_PROVIDER_EXTERNAL_SETUP_REQUIREMENTS.md`

Potential Batch 8 dependencies include:

* analytics tracking,
* ad tracking,
* email,
* SMS,
* push,
* realtime,
* payment gateway,
* media/CDN,
* PDF generation,
* scheduled notification/digest jobs.

Do not hide missing provider requirements.

---

# 247. SCREEN 1 FINAL CHECKLIST — OVERVIEW

* [ ] old generic Builder Overview removed
* [ ] exact Batch 8 Builder shell
* [ ] exact sidebar
* [ ] exact mobile drawer
* [ ] real Projects metric
* [ ] real Units metric
* [ ] real Leads metric
* [ ] real operational activity
* [ ] exact quick actions
* [ ] loading skeleton
* [ ] mobile Overview
* [ ] exact five-item bottom nav
* [ ] no fake counts

---

# 248. SCREENS 2–3 FINAL CHECKLIST — PROJECT MANAGEMENT

* [ ] Project list exact design
* [ ] status filters
* [ ] exact counts
* [ ] Project cards/rows
* [ ] View
* [ ] Edit
* [ ] Manage Units
* [ ] Pause
* [ ] Resume
* [ ] Delete/archive behavior
* [ ] loading
* [ ] empty
* [ ] error
* [ ] pagination
* [ ] Batch 5 Wizard entry
* [ ] Draft Resume
* [ ] real draft progress
* [ ] live Edit warning
* [ ] pending revision
* [ ] approved old data remains public
* [ ] moderation approval replaces public version
* [ ] RLS verified

---

# 249. SCREENS 4–5 FINAL CHECKLIST — UNIT INVENTORY

* [ ] Project context
* [ ] Tower/Wing navigation
* [ ] real Unit rows
* [ ] sticky desktop table
* [ ] filters
* [ ] Available status
* [ ] Booked status
* [ ] Sold status
* [ ] selection
* [ ] bulk bar
* [ ] bulk status
* [ ] bulk price if shown
* [ ] safe transactions
* [ ] mobile Tower accordion
* [ ] mobile Floor accordion
* [ ] Unit cards
* [ ] desktop Unit modal
* [ ] mobile Unit sheet
* [ ] Save persistence
* [ ] inventory/public Project consistency

---

# 250. SCREENS 6–7 FINAL CHECKLIST — PROJECT LEADS

* [ ] Project Leads list
* [ ] Project column
* [ ] Agent column
* [ ] Lead status
* [ ] Lead source
* [ ] Project filter
* [ ] Agent filter
* [ ] mobile cards
* [ ] loading
* [ ] empty
* [ ] error
* [ ] no N+1
* [ ] Lead Detail
* [ ] Project context
* [ ] Assigned Agent block
* [ ] Assign
* [ ] Reassign where shown
* [ ] Team validation
* [ ] assignment notification
* [ ] timeline
* [ ] Call
* [ ] Message
* [ ] Site Visit

---

# 251. SCREENS 8–11 FINAL CHECKLIST — REQUIREMENTS, PROPOSALS, MESSAGES, VISITS

* [ ] Matching Requirements
* [ ] concrete criteria
* [ ] no vague fake percentage
* [ ] exact Requirement cards
* [ ] Send Proposal
* [ ] duplicate prevention
* [ ] Project-linked Proposal
* [ ] Proposal list
* [ ] Proposal Detail
* [ ] timeline
* [ ] Withdraw
* [ ] Message
* [ ] Thread list
* [ ] Thread Detail
* [ ] Project context
* [ ] unread/read state
* [ ] Site Visit detail
* [ ] Accept
* [ ] Reschedule
* [ ] Reject
* [ ] Directions
* [ ] Assign to Agent
* [ ] reassignment history

---

# 252. SCREENS 12–14 FINAL CHECKLIST — TEAM

* [ ] Team List
* [ ] active Agent
* [ ] pending invite
* [ ] empty state
* [ ] Invite Agent
* [ ] desktop modal
* [ ] mobile sheet
* [ ] duplicate invite protection
* [ ] seat limit
* [ ] provider honesty
* [ ] Team relationship
* [ ] Permission Editor
* [ ] exact permission groups
* [ ] persistent permissions
* [ ] backend enforcement
* [ ] audit
* [ ] Agent removal impact

---

# 253. SCREENS 15–18 FINAL CHECKLIST — ADS

* [ ] Campaign List
* [ ] all source-defined statuses
* [ ] real Project target
* [ ] target city
* [ ] schedule
* [ ] status-aware actions
* [ ] empty state
* [ ] Create Campaign
* [ ] exact Wizard steps
* [ ] creative upload
* [ ] preview
* [ ] targeting
* [ ] schedule validation
* [ ] wallet/budget validation
* [ ] Save Draft
* [ ] Submit for review
* [ ] duplicate protection
* [ ] Admin moderation
* [ ] Campaign Detail
* [ ] real impressions
* [ ] real clicks
* [ ] real CTR
* [ ] real Leads
* [ ] real attribution
* [ ] Pause
* [ ] Analytics Setup Required
* [ ] no fake charts

---

# 254. SCREEN 19 FINAL CHECKLIST — PROJECT ANALYTICS

* [ ] Project filter
* [ ] real views
* [ ] real Leads
* [ ] real Unit interest if shown
* [ ] real Site Visits
* [ ] real Brochure downloads if shown
* [ ] correct date period
* [ ] insufficient-data state
* [ ] Setup Required state
* [ ] no fake numbers
* [ ] efficient aggregation

---

# 255. SCREENS 20–22 FINAL CHECKLIST — BILLING / INVOICE / RERA

* [ ] real Builder plan
* [ ] Project usage
* [ ] other entitlement usage
* [ ] Manage Plan
* [ ] Ad Wallet
* [ ] real balance
* [ ] immutable ledger
* [ ] safe debit
* [ ] payment verification
* [ ] no fake recharge
* [ ] Invoice desktop
* [ ] Invoice mobile
* [ ] View
* [ ] real Download
* [ ] GST conditional
* [ ] Builder verification
* [ ] RERA proof upload
* [ ] private storage
* [ ] pending review
* [ ] approved state
* [ ] rejected reason
* [ ] resubmit
* [ ] badge only after approval

---

# 256. SCREENS 23–24 FINAL CHECKLIST — MICROSITE / PROGRESS

* [ ] Company Microsite Edit
* [ ] exact fields
* [ ] Builder identity
* [ ] About
* [ ] logo/cover where shown
* [ ] public data sync
* [ ] Save
* [ ] Preview/View profile
* [ ] Construction Progress screen
* [ ] Project selector
* [ ] stage
* [ ] percentage
* [ ] date
* [ ] note
* [ ] media where shown
* [ ] progress history
* [ ] no overwrite-only history
* [ ] public update consistency

---

# 257. SCREENS 25–27 FINAL CHECKLIST — NOTIFICATIONS / SUPPORT / SETTINGS

* [ ] Notifications Center
* [ ] real Builder event types
* [ ] Project Lead route
* [ ] Requirement route
* [ ] Campaign route
* [ ] Project moderation route
* [ ] Verification route
* [ ] Mark All Read
* [ ] pagination
* [ ] Support FAQ
* [ ] Builder-specific content
* [ ] Ticket creation
* [ ] Ticket persistence
* [ ] Ticket detail route
* [ ] Settings
* [ ] notification preferences
* [ ] match alerts where shown
* [ ] Lead assignment alerts where shown
* [ ] Campaign alerts where shown
* [ ] theme where shared
* [ ] language state
* [ ] danger zone where shared
* [ ] provider honesty

---

# 258. FULL CONNECTED BUILDER TEST FLOW

Execute the complete connected production flow:

Builder login
→ Dashboard Overview
→ verify real Project and Unit metrics
→ open My Projects
→ create Project draft through Batch 5
→ save and exit
→ resume draft
→ submit Project
→ verify pending status
→ approve using authorized moderation fixture
→ open live Project
→ edit critical price/RERA/Unit count
→ submit revision
→ verify old Project still public
→ approve revision
→ verify new version public
→ open Unit Inventory
→ navigate Tower
→ navigate Floor
→ edit Unit
→ bulk change status
→ refresh and verify persistence
→ open Project Leads
→ assign Agent
→ verify Agent relationship
→ Matching Requirements
→ send Proposal
→ verify Proposal list/detail
→ Message requester
→ create Site Visit
→ assign Visit to Agent
→ open Team
→ invite Agent
→ edit permissions
→ verify backend permission denial for disabled permission
→ open Campaigns
→ create Draft
→ upload creative
→ set targeting/schedule
→ submit for review
→ approve using Admin fixture
→ verify Campaign Detail
→ verify honest Analytics state
→ Project Analytics
→ Billing
→ Ad Wallet test flow
→ Invoice
→ RERA verification upload
→ Company Microsite edit
→ open public Builder profile
→ Construction Progress update
→ Notifications
→ Support ticket
→ Settings
→ full mobile regression.

Any broken connection means Batch 8 is incomplete.

---

# 259. LIVE VERIFICATION STANDARD

After each implementation screen group:

1. run build,
2. run TypeScript check,
3. run lint where configured,
4. run the actual application,
5. login as Builder test profile,
6. open real route,
7. interact with each control,
8. inspect real Supabase writes,
9. reload,
10. verify persistence,
11. test 390px mobile,
12. test tablet,
13. test desktop,
14. inspect Browser console,
15. inspect failed network requests,
16. inspect RLS failures.

Static code review is not enough.

---

# 260. MANUAL VISUAL VERIFICATION STANDARD

For every screen:

open Batch 8 source beside implementation.

Compare:

* shell,
* width,
* sidebar,
* content order,
* font size,
* font weight,
* line height,
* spacing,
* radius,
* border,
* shadow,
* icon size,
* status color,
* table columns,
* card height,
* mobile transformation,
* modal,
* bottom sheet,
* sticky controls.

A similar-looking screen is not PASS.

The target is exact Batch design.

---

# 261. FUNCTIONAL VERIFICATION STANDARD

Every visible action must be manually clicked.

Verify:

* result,
* database state,
* page transition,
* status update,
* refresh persistence.

No visible control may remain untested.

---

# 262. COMPLETION BLOCKERS

Batch 8 must not be marked complete while any of these remain:

* old Builder dashboard still visible,
* generic current stat grid remains,
* Unit metric still shows Not Tracked Yet,
* Ads remain Coming Soon,
* Unit Inventory is only a JSON configuration list,
* no Unit-level records,
* mobile uses desktop Unit table,
* live Project edit overwrites public approved data before reapproval,
* Project revision architecture missing,
* Lead Agent assignment fake,
* Agent assignment not server validated,
* Agent permissions cosmetic only,
* Team invitation fake,
* Team seat limit frontend-only,
* Matching Requirement shows vague fake percentage,
* Proposal not linked to Project,
* Message participant security missing,
* Site Visit Agent assignment not persistent,
* Campaign self-approves,
* Campaign analytics fake,
* Ad attribution fake,
* Project analytics fake,
* wallet balance client-authoritative,
* wallet ledger missing,
* wallet recharge credited before verified payment,
* RERA badge appears after upload only,
* Verification proof public,
* Company Microsite editor not connected to public profile,
* construction progress overwrites all history,
* Notifications dead,
* Support ticket fake,
* Settings not persistent,
* missing loading state,
* missing empty state,
* missing error state,
* dead button,
* `href="#"`,
* modal clipped,
* sheet broken on mobile,
* sticky UI covers content,
* text clipping,
* unwanted wrapping,
* horizontal page overflow,
* console errors,
* RLS errors,
* no actual live project verification.

---

# 263. FINAL ACCEPTANCE STATEMENT

**Design Batch 8 — Complete Builder Dashboard is complete only when the previous conflicting Builder dashboard UI has been removed and all 27 Batch 8 screen groups are implemented according to the exact Batch 8 design source.**

Completion requires:

* exact Builder Overview,
* exact desktop shell,
* exact mobile shell,
* exact navigation,
* real Project metrics,
* real Unit metrics,
* complete My Projects,
* Batch 5 Project Wizard integration,
* Project Draft resume,
* live Project revision and reapproval,
* old approved data remaining live during revision review,
* complete individual Unit Inventory,
* desktop sticky inventory table,
* mobile Tower/Floor accordion,
* Unit Edit modal/sheet,
* Unit bulk operations,
* Project Leads,
* Agent assignment,
* Lead Detail assignment block,
* concrete Matching Requirement criteria,
* Project-linked Proposal system,
* Messages,
* Site Visits,
* Visit assignment to Agent,
* Team List,
* Invite Agent,
* Agent Permission Editor,
* real backend permission enforcement,
* Campaign List,
* Create Campaign Wizard,
* campaign moderation,
* Campaign Detail,
* honest Ad Analytics,
* real Project Analytics,
* Builder plan usage,
* secure Ad Wallet,
* immutable wallet ledger,
* Invoices,
* private RERA verification,
* Company Microsite editing,
* Construction Progress updates,
* Notifications Center,
* Builder Support,
* Settings,
* no fake data,
* no fake provider success,
* no dead controls,
* no old UI remnants,
* no unauthorized cross-Builder access,
* no N+1 architecture,
* responsive desktop/tablet/mobile verification,
* complete live browser verification.

Required implementation sequence:

**Screen 1 Overview → verify → Screens 2–3 Project Management → verify → Screens 4–5 Unit Inventory → verify → Screens 6–7 Project Leads → verify → Screens 8–11 Requirements/Proposals/Messages/Visits → verify → Screens 12–14 Team → verify → Screens 15–18 Ads → verify → Screen 19 Project Analytics → verify → Screens 20–22 Billing/Invoices/RERA → verify → Screens 23–24 Microsite/Progress → verify → Screens 25–27 Notifications/Support/Settings → verify → complete connected Builder regression test.**

No screen passes merely because it renders.

**Exact Design + Real Functionality + Real Database Data + Project Versioning + Unit Integrity + Team Permissions + Ad Integrity + Wallet Safety + Security + RLS + Responsive Behavior + Live Verification must all pass.**
