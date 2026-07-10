# BATCH_06_FULL_DESIGN_FUNCTIONALITY_VERIFICATION_SPEC.md

# My Gujarat Property

## Design Batch 6

## Complete Owner Dashboard, Listings, Requirements, Leads, Messages, Site Visits, Saved, Analytics, Billing, Verification, Profile, Notifications, Support, Settings, Role Change and Account Data Specification

---

# 1. DOCUMENT PURPOSE

This document is the complete design, functionality, data, route, permission, validation, state, privacy, security, RLS, transaction-safety, responsive and live-verification specification for:

**My Gujarat Property · Design Batch 6 — Owner Dashboard**

Batch 6 is not one Dashboard Home screen.

It is the complete authenticated Owner operating system.

It includes:

1. Owner Overview
2. Overview skeleton state
3. Owner mobile Dashboard
4. Owner mobile navigation drawer
5. My Properties
6. Property delete confirmation
7. My Properties mobile state
8. My Properties empty state
9. My Requirements
10. My Requirements mobile/empty states
11. Leads desktop table
12. Leads mobile cards
13. Lead Detail desktop drawer
14. Lead Detail mobile page
15. Messages Thread List
16. Message Thread Detail
17. Site Visits List
18. Site Visit Reject confirmation
19. Site Visit Detail
20. Saved Properties
21. Saved Searches
22. Recently Viewed
23. Analytics populated state
24. Analytics insufficient-data state
25. Analytics Setup Required state
26. Billing/Subscription
27. Invoice List
28. Printable Invoice Detail
29. Pricing/Upgrade
30. Verification Upload/Timeline
31. Verification Rejected/Resubmit
32. Profile Edit
33. Notifications Center
34. Support/Help
35. Settings
36. Role Change Request
37. Role Change Pending State
38. Data Export
39. Account Deletion Request.

The Batch 6 deterministic design inventory represents these as route screens, responsive variants, UI states, dialogs, drawers and inherited design targets.

Nothing may be skipped.

---

# 2. DESIGN AUTHORITY

Use the actual design source:

`Batch 6 - Owner Dashboard (Standalone).html`

The Batch 6 source controls:

* Owner Dashboard visual shell,
* exact Sidebar composition,
* top bar,
* mobile root Header,
* mobile drawer,
* mobile bottom navigation,
* contextual mobile Headers,
* page composition,
* section order,
* cards,
* tables,
* mobile transformations,
* status pills,
* dialogs,
* drawers,
* empty states,
* loading states,
* error states,
* Setup Required states,
* action hierarchy.

Batch 1 remains the foundation for:

* tokens,
* typography,
* colors,
* spacing,
* radius,
* icons,
* Dashboard shell dimensions,
* mobile navigation,
* overlays,
* state patterns.

Later specialised batches remain functional authorities for their deeper flows:

* Batch 5 for Posting Wizard, Draft Resume and Edit/Reapproval.
* Batch 9 for deep Lead, Message and Site Visit operational behavior.
* Batch 10 for complete Billing and Payment truth.
* Batch 11 for Admin review of Role Change, Verification and Support.
* Batch 17 for final Theme and Localization capabilities.

---

# 3. MIGRATION PRINCIPLE

The final Owner Dashboard must:

**preserve correct product capability and backend behavior while replacing conflicting presentation.**

Preserve when correct:

* Supabase Auth
* Server Actions
* database tables
* correct RLS
* ownership rules
* Lead records
* Message records
* Site Visit records
* Saved records
* Notification records
* Billing records
* Subscription records
* Invoice records
* moderation lifecycles
* real counts.

Replace when conflicting:

* old Dashboard visual blocks
* incomplete cards
* generic full-page Lead Detail
* missing right Drawer
* generic Messages card list
* public Support page used as Dashboard Support
* status-only Verification page
* read-only Profile page
* disabled Owner modules
* decorative Search control
* inconsistent mobile Headers
* generic Billing page presentation.

---

# 4. COMPLETE BATCH 6 SCREEN GROUP INVENTORY

The exact source contains the following major screen groups.

## Screen Group 1

Overview / Dashboard Home.

Variants:

* 1A Desktop full shell
* 1B Stat-row skeleton loading
* 1C Mobile root Dashboard
* 1D Mobile Sidebar drawer open.

## Screen Group 2

My Properties.

Variants:

* 2A Desktop panel
* 2B Delete confirmation
* 2C Mobile contextual Header and open overflow menu
* 2D Empty state.

## Screen Group 3

My Requirements.

Variants:

* 3A Desktop
* 3B Mobile card and empty state.

## Screen Group 4

Leads List.

Variants:

* 4A Desktop Table
* 4B same data transformed to Mobile Cards.

## Screen Group 5

Lead Detail.

Variants:

* 5A Desktop 480px right Drawer
* 5B Mobile full page.

## Screens 6 and 7

Messages:

* Thread List
* Thread Detail.

## Screens 8 and 9

Site Visits:

* List
* Reject confirmation
* Mobile Detail.

## Screens 10–12

Saved content:

* Saved Properties
* Saved Searches
* Recently Viewed.

## Screens 13A–13C

Analytics:

* populated
* insufficient data
* Provider Setup Required.

## Screens 14–17

Billing:

* Subscription
* Invoices
* Invoice Detail
* Pricing/Upgrade.

## Screens 18A–18B

Verification:

* Under Review
* Rejected and Resubmit.

## Screens 19–20

* Profile Edit
* Notifications Center.

## Screens 21–22

* Support
* Settings.

## Screens 23–24

* Role Change Request/Pending
* Data Export/Delete Request.

Every source target must map to implementation or documented inherited reusable implementation.

No unmapped target is allowed.

---

# 5. OWNER ROLE AUTHORIZATION

Only authenticated active Owner accounts may access Owner Dashboard routes.

Required:

* server route guard,
* active Account check,
* correct Role check,
* RLS,
* Server Action ownership checks.

A Broker must not access Owner-only routes by URL.

A Builder must not access Owner-only routes by URL.

A Guest must be redirected to authentication while preserving the intended return URL.

---

# 6. OWNER DASHBOARD ROUTE ARCHITECTURE

Recommended canonical route mapping:

* `/dashboard/owner`
* `/dashboard/owner/properties`
* `/dashboard/owner/properties/new`
* `/dashboard/owner/properties/[id]/edit`
* `/dashboard/owner/requirements`
* `/dashboard/owner/requirements/new`
* `/dashboard/owner/requirements/[id]/edit`
* `/dashboard/owner/requirements/[id]/proposals`
* `/dashboard/owner/leads`
* `/dashboard/leads/[id]`
* `/dashboard/messages`
* `/dashboard/messages/[threadId]`
* `/dashboard/owner/site-visits`
* `/dashboard/owner/site-visits/[id]`
* `/dashboard/owner/saved`
* `/dashboard/owner/analytics`
* `/dashboard/owner/billing`
* `/dashboard/owner/billing/invoices/[id]`
* `/dashboard/owner/verification`
* `/profile` or one canonical Owner Profile route
* `/dashboard/owner/notifications`
* one canonical authenticated Support route
* `/dashboard/owner/settings`
* `/dashboard/owner/settings/role-change`
* `/dashboard/owner/settings/data`.

Equivalent existing routes may remain only when:

* no duplicate experience is created,
* exact Batch 6 design is rendered,
* Role access stays correct.

---

# 7. OWNER DESKTOP SHELL

Batch 1 canonical Dashboard shell applies.

Required:

* 240px expanded Sidebar
* 64px collapsed Sidebar rail
* desktop Topbar
* main content region
* correct content max width
* real Notification control
* real Avatar menu.

---

# 8. CURRENT SIDEBAR DIMENSION MISMATCH

Current repository Sidebar uses approximately:

* 220px expanded
* 76px collapsed.

This conflicts with the canonical Batch 1 shell.

Correct to:

* 240px
* 64px

unless the actual final Batch 1 source is intentionally revised.

---

# 9. OWNER DESKTOP SIDEBAR ORDER

Do not invent extra desktop Sidebar modules merely because they exist in the mobile drawer.

Use the exact Batch 6 desktop Sidebar composition.

Source sequence includes:

* Overview
* My Properties
* My Requirements
* Leads
* Messages
* Site Visits
* Saved
* Analytics
* Billing
* Settings.

The bottom User card remains separate.

---

# 10. MOBILE DRAWER ORDER

The mobile Drawer is a fuller module list.

Exact source order:

* Overview
* My Properties
* My Requirements
* Leads
* Messages
* Site Visits
* Saved
* Recently Viewed
* Analytics
* Billing
* Verification
* Settings
* Support
* Log out.

Do not change this order casually.

---

# 11. OWNER MOBILE BOTTOM NAVIGATION

Exact locked five items:

1. Home
2. Search
3. Post
4. Leads
5. Profile.

The central Post action follows Batch 1's raised FAB presentation.

No sixth tab.

No Messages tab.

No Billing tab.

No Settings tab.

Those belong in the Drawer.

---

# 12. ROOT MOBILE DASHBOARD HEADER

The Owner root Dashboard must not have a Back button.

Source title:

`Dashboard`

Actions:

* hamburger menu
* Notification Bell.

---

# 13. CURRENT MOBILE TITLE MISMATCH

Current Owner root passes:

`Overview`

as the shell title.

The mobile Header therefore risks showing:

`Overview`

instead of the source:

`Dashboard`.

Correct the root mobile Header while preserving desktop breadcrumb:

Dashboard → Overview.

---

# 14. OWNER MOBILE DRAWER USER BLOCK

Exact concept:

* Avatar/initials
* User name
* `Owner · Ahmedabad`

Use real User City.

Do not show a hard-coded City.

---

# 15. CURRENT MOBILE DRAWER CITY GAP

Current Owner Dashboard does not supply User City to the Drawer.

Connect it to the canonical Profile/Location record.

---

# 16. DASHBOARD TOPBAR SEARCH

Source shows:

`Search…`

This visible control must work.

Current repository renders it as a decorative non-input span.

This is a dead visible control and must be corrected.

---

# 17. DASHBOARD SEARCH BEHAVIOR

Implement a real scoped Dashboard Search or equivalent exact source behavior.

It may search authorised Owner data such as:

* Properties
* Requirements
* Leads
* Messages
* Site Visits
* Support Tickets.

Requirements:

* only authorised records,
* debounce,
* keyboard navigation,
* empty state,
* loading state,
* safe result links,
* no private data leak.

Do not leave it decorative.

---

# 18. DASHBOARD COUNT BADGES

Sidebar and Drawer badges must use real counts.

Examples:

* My Properties
* Leads.

Counts must remain correct on every Owner page.

---

# 19. CURRENT BADGE CONSISTENCY GAP

Current Dashboard Overview passes Property and Lead counts into navigation.

Several Owner subpages create Owner nav without counts.

This can cause badges to disappear while navigating.

Centralise shell count loading or provide consistent real shell data on every Owner route.

---

# 20. MOBILE SUBPAGE HEADER RULE

Every applicable Owner Dashboard inner screen uses the contextual mobile Header pattern.

Required:

* Back button
* page title
* optional compact primary action.

Do not fall back to an inappropriate desktop-style Topbar on mobile.

---

# 21. MOBILE SAFE AREA

All bottom navigation, Message input and sticky actions must respect safe-area insets.

---

# 22. NO GLOBAL FOOTER

Owner Dashboard screens do not use the public site Footer unless a specific design screen explicitly shows it.

---

# 23. SCREEN 1A — OWNER OVERVIEW DESKTOP

Exact source structure:

* full Owner Dashboard shell
* breadcrumb Dashboard / Overview
* Search control
* Notification control
* User avatar
* Greeting
* supporting copy
* View Leads
* Post Property
* four stat cards
* Recent Leads panel.

---

# 24. GREETING

Source example:

`Good morning, Rajesh`

Use:

* actual first name,
* actual User timezone or approved India timezone rule.

---

# 25. CURRENT GREETING TIMEZONE RISK

Current code uses:

`new Date().getHours()`

inside server rendering.

Server timezone may not equal User timezone.

Use:

* Profile timezone where available,
* otherwise approved product timezone, currently India context.

Do not greet `Good morning` during User evening because server runs UTC.

---

# 26. GREETING SUPPORTING COPY

Source:

`Here's what's happening with your listings.`

Do not add fake claims.

---

# 27. OVERVIEW QUICK ACTIONS

Required:

* View Leads
* Post Property.

Post Property displays only when Role and Account state allow it.

---

# 28. STAT 1 — ACTIVE LISTINGS

Source:

`Active Listings`

Reference value:

`4`

Helper:

`1 pending review`

Use real values.

---

# 29. ACTIVE LISTING DEFINITION

Active Listings must count the actual active/public Listing state.

Do not count:

* Draft
* Pending
* Rejected
* Paused
* Expired
* Deleted.

---

# 30. CURRENT ACTIVE LISTING COUNT BUG

Current Overview derives `Active Listings` from total non-deleted Properties.

That includes states other than Active/Published.

Replace with a dedicated correct aggregate query.

---

# 31. PENDING REVIEW HELPER

The supporting note must show real Pending Review count.

Do not replace it with generic:

`Total listed`.

---

# 32. STAT 2 — NEW LEADS THIS WEEK

Source:

`New Leads This Week`

Reference:

`7`

Helper:

`3 not yet contacted`.

Use real data.

---

# 33. NEW LEAD PERIOD

Define clearly:

* rolling seven days,
* or current calendar week.

Use one canonical rule consistently.

---

# 34. NOT-YET-CONTACTED DEFINITION

Count Lead CRM state that truly represents not-contacted Leads.

Do not use all nonterminal Leads.

---

# 35. CURRENT LEAD HELPER COUNT ISSUE

Current Overview uses broad open Lead count as:

`not yet contacted`.

That can include:

* Interested
* Follow-up
* Site Visit
* Negotiation.

Use correct CRM stage criteria.

---

# 36. STAT 3 — SITE VISITS SCHEDULED

Source:

`Site Visits Scheduled`

Empty value:

`—`

Helper:

`No visits scheduled yet`.

Use actual future Visits.

---

# 37. UPCOMING VISIT DEFINITION

Count future confirmed/scheduled Visits according to canonical status model.

Do not count:

* Requested without confirmed time
* Rejected
* Cancelled
* Completed
* No-show.

---

# 38. STAT 4 — PLAN USAGE

Source:

`Plan Usage`

Reference:

`4 / 5 listings`.

Use real Plan entitlement and real meter semantics.

---

# 39. PLAN USAGE SEMANTICS

If Plan says:

`5 active listings`

then usage must reflect actual active Listings.

Do not use a generic daily post counter.

---

# 40. CURRENT PLAN USAGE RISK

Current implementation reads the generic:

`property_posts_limit`

usage counter.

The current counter implementation is based on period rows and does not necessarily equal current active Listings.

Align with Batch 10 usage-meter semantics.

---

# 41. OVERVIEW STAT LOADING STATE

Screen 1B is mandatory.

Render four skeleton cards.

Skeleton must match:

* dimensions
* radius
* content structure
* spacing.

Do not show zeros while data is loading.

---

# 42. OVERVIEW PARTIAL FAILURE

If one stat query fails:

do not replace all data with fabricated zero.

Use:

* partial honest state,
* retry or error marker.

---

# 43. RECENT LEADS PANEL

Exact columns:

* LEAD
* PROPERTY
* STATUS
* RECEIVED.

Source reference rows include:

* Meera Purohit
* Amit Shah
* Kiran Desai.

These are fixtures only.

Production must use real Leads.

---

# 44. RECENT LEAD STATUS PILLS

Use canonical mapped statuses:

* New
* Contacted
* Visited
* Closed.

Deeper CRM stages may map to these Owner buckets.

---

# 45. RECENT LEAD TIME

Use real relative time such as:

* 20 min ago
* Yesterday
* Mon.

Do not show a source sample.

---

# 46. RECENT LEADS DENSITY

Maintain source density.

A short Recent Leads preview should not become an unbounded feed.

Use:

* bounded query,
* View all action.

---

# 47. VIEW ALL

`View all`

opens full Owner Leads list.

---

# 48. OVERVIEW MOBILE — SCREEN 1C

Exact source components:

* Dashboard Header
* greeting
* compact stat cards
* Recent Leads
* View all
* exact five-item bottom navigation.

---

# 49. MOBILE OVERVIEW DENSITY

Prioritise:

* New Leads
* Active Listings
* Site Visits
* Plan Usage.

Do not squeeze desktop layouts unchanged onto 390px.

---

# 50. SCREEN 1D — MOBILE DRAWER

Requirements:

* slide-in Drawer
* background Scrim
* body scroll lock
* outside tap closes
* Escape closes where keyboard exists
* focus trap
* close button
* correct module order
* real badges
* Log out.

---

# 51. OVERVIEW PERFORMANCE

Load independent Dashboard data in parallel.

Avoid:

* sequential independent network requests,
* unbounded Lead data,
* full Property list just to count totals.

Use aggregate count queries.

---

# 52. OVERVIEW FINAL CHECKLIST

* [ ] exact shell
* [ ] 240px Sidebar
* [ ] 64px rail
* [ ] functional Search
* [ ] correct mobile title
* [ ] mobile Drawer User City
* [ ] consistent real nav badges
* [ ] timezone-correct greeting
* [ ] Active Listings correct
* [ ] Pending Review helper correct
* [ ] New Leads this week correct
* [ ] Not Contacted count correct
* [ ] Site Visits correct
* [ ] Plan usage semantic correct
* [ ] skeleton state
* [ ] Recent Leads bounded
* [ ] real relative time
* [ ] desktop layout
* [ ] 390px layout
* [ ] exact bottom navigation.

---

# 53. SCREEN GROUP 2 — MY PROPERTIES

The My Properties module is the Owner's complete Listing management surface.

---

# 54. MY PROPERTIES HEADER

Required:

* My Properties
* real count
* Post Property action.

---

# 55. PROPERTY STATUS TABS

Exact:

* All
* Live
* Pending
* Rejected
* Paused
* Expired.

Counts are real.

---

# 56. PROPERTY STATUS FILTERING

Filtering must happen through:

* server query
* or scalable indexed API query.

Do not fetch an arbitrary first 100 records and treat those as the complete dataset.

---

# 57. CURRENT PROPERTIES PAGINATION GAP

Current page requests the first 100 Properties and derives:

* tab counts,
* filtering

from those rows.

For accounts with more than 100 records this produces incorrect counts and incomplete tabs.

Implement:

* server-side status filtering,
* separate count aggregation,
* pagination/cursor.

---

# 58. DRAFT VISIBILITY

Draft Listings may appear under All according to final product rule.

If shown:

display real `Draft` status.

Connect to Batch 5 Draft Resume.

---

# 59. BATCH 5 DRAFT RESUME CARD

A saved Property Draft must be discoverable from the Owner Listing management context.

Required:

* Draft title
* progress
* saved time
* Continue.

Do not make Draft recovery dependent only on clicking Post Property again.

---

# 60. PROPERTY DESKTOP ROW

Source row structure includes:

* thumbnail
* title
* status
* Price
* Location
* Lead count
* state-specific helper
* actions.

---

# 61. PROPERTY THUMBNAIL

Use:

* actual Cover Media when available,
* honest no-image placeholder when absent.

Never use fake stock Property photos.

---

# 62. PROPERTY PRICE FORMAT

Use appropriate Indian compact presentation:

* ₹85 L
* ₹1.2 Cr
* ₹32,000/mo

according to value and purpose.

---

# 63. PROPERTY LOCATION

Use safe public-style Location:

* Locality
* City.

Do not show private exact address in List rows.

---

# 64. LEAD COUNT

Display real Lead count scoped to the Property.

Example source:

`37 leads`.

---

# 65. LIVE PROPERTY HELPER

Example:

`expires in 41 days`.

Compute from real expiry date.

---

# 66. PENDING HELPER

Source concept:

`under review, typically 24 hrs`.

Only display an operational SLA if approved.

Do not hard-code unverified promises.

---

# 67. PAUSED HELPER

Source:

`hidden from search while paused`.

This must match real Public Search visibility.

---

# 68. LIVE PROPERTY ACTIONS

Source:

* View
* Edit
* Pause
* Delete.

---

# 69. PENDING PROPERTY ACTIONS

Source:

* View
* Edit
* Delete.

Actual edit availability must follow moderation rules.

If edits are locked while Under Review:

do not render a dead Edit action.

Use exact allowed state.

---

# 70. PRIVATE PENDING VIEW

Pending `View` must open:

* owner-only Preview/detail,

not a broken public Detail route.

---

# 71. PAUSED PROPERTY ACTIONS

Required:

* Resume
* Edit
* Delete.

Resume must restore correct visibility only if:

* Listing is still eligible,
* not expired,
* account/Plan allows it.

---

# 72. EXPIRED PROPERTY ACTION

Support:

* Relist

according to Batch 5 and current product workflow.

Relist returns to review where required.

---

# 73. PROPERTY EDIT REAPPROVAL

Editing an approved Live Listing must use Batch 5 reapproval behavior.

Do not silently mutate live public data.

---

# 74. DELETE CONFIRMATION — SCREEN 2B

Source presentation:

`Delete this listing?`

Exact context includes:

* Listing title
* related Lead count
* destructive warning
* Cancel
* Delete listing.

---

# 75. DELETE DATA-RETENTION TRUTH

The UI copy and backend behavior must be truthful.

If product policy uses soft deletion and retains related Lead/audit history:

do not falsely claim database records are physically erased immediately.

The user-facing Listing may be permanently removed from the User's active management view while regulated/audit records are retained according to policy.

---

# 76. CURRENT DELETE RECONCILIATION

Current backend performs soft delete.

Current dialog copy states Listing and Leads will be permanently removed.

Reconcile this:

* Listing removed from public/search/dashboard according to policy
* related Lead history retained or archived according to legal/CRM policy
* no broken referential relationships.

---

# 77. DELETE OWNERSHIP

Only Listing owner can initiate deletion.

RLS plus Server Action check.

---

# 78. DELETE UNDER REVIEW

Define explicitly whether Under Review can be withdrawn/deleted.

Do not simply hide action inconsistently.

---

# 79. MOBILE MY PROPERTIES — SCREEN 2C

Required:

* contextual Header
* Back
* My Properties title
* compact Post action
* horizontal status chips/tabs
* cards
* overflow action menu
* bottom navigation.

---

# 80. MOBILE OVERFLOW MENU

Actions correspond exactly to the current entity state.

Outside tap closes.

Nested action click must not open the underlying card accidentally.

---

# 81. EMPTY STATE — SCREEN 2D

Exact:

`You haven't posted a property yet`

`Posting is free and takes about 5 minutes.`

`Post Property`

Only retain time claim if approved and representative.

---

# 82. PROPERTIES LOADING

Provide:

* list skeleton
* tab/count skeleton where applicable.

Do not show Empty before loading completes.

---

# 83. PROPERTIES ERROR

Show:

* safe error
* Retry.

Do not expose Supabase error codes.

---

# 84. PROPERTY ACTION TRANSACTION SAFETY

Pause/Resume/Delete/Relist must:

* verify ownership
* verify current state
* perform conditional transition
* prevent stale double actions
* update relevant timestamps
* create event/audit where required
* trigger targeted revalidation.

---

# 85. PROPERTIES FINAL CHECKLIST

* [ ] real total
* [ ] server pagination
* [ ] status counts across complete dataset
* [ ] status query
* [ ] Draft Resume
* [ ] actual thumbnails
* [ ] honest placeholder
* [ ] real compact Price
* [ ] safe Location
* [ ] real Leads count
* [ ] expiry helper
* [ ] Pending helper
* [ ] Pause
* [ ] Resume
* [ ] Edit/Reapproval
* [ ] private Pending View
* [ ] Relist
* [ ] Delete confirmation
* [ ] honest retention copy
* [ ] mobile overflow menu
* [ ] empty
* [ ] loading
* [ ] filtered empty
* [ ] error
* [ ] Retry.

---

# 86. SCREEN GROUP 3 — MY REQUIREMENTS

The Owner Requirement module manages posted buying/renting requirements and received Proposals.

---

# 87. REQUIREMENTS HEADER

Required:

* My Requirements
* Post Requirement.

---

# 88. ACTIVE REQUIREMENT CARD

Source example:

`Looking to buy: 3 BHK apartment`

Status:

`Active`

Metadata:

* Budget
* preferred Localities
* timeline
* Proposal count.

Actions:

* View proposals
* Edit
* Close.

---

# 89. CLOSED REQUIREMENT CARD

Source:

Status:

`Closed`

Metadata includes:

* Price range
* closed date
* Proposal count.

Action:

`Reopen`

---

# 90. CURRENT REQUIREMENT STATUS LABEL MISMATCH

Current shared card maps the backend Paused state to the generic label:

`Paused`.

For Requirements, Batch 6 source uses:

`Closed`.

Use entity-aware presentation or a dedicated canonical Requirement state.

---

# 91. CLOSED TIMESTAMP

Do not derive closed date from generic:

`updated_at`.

Store/use a real:

* closed_at
* or status transition event timestamp.

---

# 92. CLOSE REQUIREMENT

Closing must:

* verify ownership
* validate active state
* stop new matching/proposals according to policy
* retain existing Proposal history
* notify where relevant.

---

# 93. REOPEN REQUIREMENT

Reopen must check:

* expiry
* account state
* Plan entitlement
* moderation/reapproval requirement
* duplicate active Requirement rules.

Do not blindly change Paused → Published.

---

# 94. PROPOSAL COUNT

Use real count.

No fabricated values.

---

# 95. VIEW PROPOSALS

Open the actual Proposal list for that Requirement.

Preserve:

* sent/viewed/shortlisted/accepted/rejected/withdrawn states
* Batch 7/9 Proposal functionality.

---

# 96. REQUIREMENT LOCATION SUMMARY

Use selected preferred Localities.

Do not display only one City if the Requirement contains multiple Localities.

---

# 97. REQUIREMENT TIMELINE LABEL

Convert enum to human text:

* Immediate
* Within 1 month
* 1–3 months
* 3–6 months
* Flexible.

---

# 98. REQUIREMENT PAGINATION

Current page requests up to 100 rows.

Implement scalable pagination/cursor.

---

# 99. REQUIREMENT MOBILE CARD

Screen 3B requires:

* concise title
* Budget
* Location
* Proposal count
* status.

Do not render desktop action row squeezed into mobile.

---

# 100. REQUIREMENT EMPTY STATE

Exact:

`No requirements posted`

`Tell brokers and builders what you're looking for — they'll send proposals to you.`

`Post Requirement`

---

# 101. REQUIREMENTS FINAL CHECKLIST

* [ ] active state
* [ ] closed state
* [ ] correct labels
* [ ] real closed timestamp
* [ ] Proposal count
* [ ] View proposals
* [ ] Edit
* [ ] Close
* [ ] Reopen
* [ ] multi-Locality summary
* [ ] timeline label
* [ ] Plan/expiry validation
* [ ] pagination
* [ ] mobile card
* [ ] empty
* [ ] error
* [ ] Retry.

---

# 102. SCREEN GROUP 4 — OWNER LEADS LIST

The Owner Leads module shows inbound inquiries for Owner Properties.

---

# 103. LEAD FILTERS

Exact source:

* All
* New
* Contacted
* Visited
* Closed.

Counts must be real across the complete dataset.

---

# 104. CRM STAGE MAPPING

The deeper CRM may contain:

* New
* Contacted
* Interested
* Follow-up
* Site Visit
* Proposal
* Negotiation
* Converted
* Lost
* Closed.

Owner List can map these into the four source buckets.

The mapping must be canonical and documented.

---

# 105. LEADS DESKTOP TABLE

Exact columns:

* NAME
* PROPERTY
* STATUS
* DATE.

Rows are clickable.

---

# 106. LEAD MOBILE CARD

Same data transforms to Cards.

Do not create a different dataset for mobile.

---

# 107. LEAD PAGINATION

Current Owner Leads page requests up to 100 rows and derives filter counts from those rows.

Replace with:

* server stage filters
* complete count aggregates
* pagination/cursor.

---

# 108. CURRENT LEAD ENRICHMENT N+1

Current Lead enrichment performs per Lead:

* target summary query
* Profile name query.

This creates an N+1 pattern.

Replace with batched:

* target-type grouped entity query
* Profile ID batch query.

---

# 109. LEAD LIST LOADING STATE

Source includes explicit Loading state.

Use table/card skeleton.

---

# 110. LEAD EMPTY STATE

Exact:

`No leads yet`

`Buyers can't enquire until they find you.`

Source action concept:

`Share your listing`

Wire to a real Share flow.

---

# 111. SHARE LISTING ACTION

If multiple Listings exist:

allow selection or route appropriately.

Do not show a Share button with no target.

---

# 112. LEAD ERROR STATE

Exact:

`Couldn't load leads. Check your connection.`

Action:

`Retry`

---

# 113. CURRENT LEAD ERROR GAP

Current page displays an error Alert but does not provide source-required Retry control.

Add a functional Retry.

---

# 114. LEAD ROW NAVIGATION

Desktop:

opens 480px right Drawer.

Mobile:

opens full-page Lead Detail.

Do not use the same full generic Dashboard page presentation on desktop.

---

# 115. ROUTE INTERCEPTION

Recommended implementation:

use one canonical Lead Detail route/data loader with responsive presentation:

* desktop intercepted route/drawer
* mobile page.

Avoid duplicating Lead business logic.

---

# 116. LEAD LIST FINAL CHECKLIST

* [ ] real counts
* [ ] scalable filters
* [ ] pagination
* [ ] N+1 removed
* [ ] table desktop
* [ ] cards mobile
* [ ] loading
* [ ] empty
* [ ] real Share action
* [ ] error
* [ ] Retry
* [ ] desktop Drawer
* [ ] mobile full Detail.

---

# 117. SCREEN GROUP 5 — LEAD DETAIL

Batch 6 defines two presentations:

* Desktop Drawer
* Mobile full page.

Batch 9 adds deeper Lead functionality.

Both must be combined.

---

# 118. DESKTOP LEAD DRAWER

Exact width:

480px.

Required:

* Scrim if source uses it
* close control
* focus handling
* background scroll behavior
* direct URL fallback.

---

# 119. CURRENT LEAD DETAIL PRESENTATION MISMATCH

Current shared Lead Detail route renders generic stacked full-page Cards inside Dashboard shell.

This does not match Batch 6 Desktop Drawer.

Rebuild presentation without deleting correct backend behavior.

---

# 120. LEAD DETAIL HEADER

Source:

`Lead — Meera Purohit`

Context:

`via 3 BHK, Shrinand Residency · 20 min ago`

Use real:

* counterpart name
* source Listing
* received time.

---

# 121. CONTACT CARD

Source includes:

* avatar
* buyer name
* Buyer
* City
* number reveal state
* phone
* Call
* Message.

---

# 122. CONTACT PRIVACY

Only show full phone when actual contact policy permits it.

If not revealed:

show the correct Contact Reveal state.

Never send hidden number in Client payload.

---

# 123. SOURCE CONTACT TEXT

The source example says:

`number revealed to you`

Use this only when actual Reveal state is approved.

---

# 124. CALL ACTION

When mobile exists:

real `tel:` action.

When mobile is unavailable:

do not render dead Call action.

---

# 125. MESSAGE ACTION

Open/create the actual Message Thread.

Do not merely scroll to a generic card.

---

# 126. OWNER LEAD STATUS CONTROL

Batch 6 compact statuses:

* New
* Contacted
* Visited
* Closed.

Use real CRM mapping.

---

# 127. DEEPER BATCH 9 STATUS RULES

Preserve:

* reason required for Lost/Closed where defined
* timeline event
* duplicate Lead handling
* follow-up reminder
* Notes
* Documents
* Related Property
* complete Lead timeline.

---

# 128. RELATED PROPERTY

Source card includes:

* Price
* Property title
* Location.

Click opens safe relevant Detail/Preview according to entity availability.

---

# 129. NOTES AND TIMELINE

Source includes:

* Lead received
* enquiry source
* timestamp.

Preserve Batch 9 complete Lead timeline.

---

# 130. SCHEDULE SITE VISIT

Action opens actual Site Visit request/scheduling flow.

---

# 131. MARK CONTACTED

Must perform real stage transition.

Prevent double transition side effects.

---

# 132. MOBILE LEAD DETAIL

Required:

* Back button
* Lead title
* Profile block
* phone/reveal state
* Call
* Message
* status selector
* Related Property
* Site Visit action.

---

# 133. MOBILE INNER-PAGE HEADER

Lead Detail is an inner Dashboard page.

Use the Batch 1 contextual mobile Header.

---

# 134. CURRENT LEAD DETAIL BACK-HEADER GAP

Current shared Lead Detail shell does not pass the contextual mobile Back Header configuration.

Correct this.

---

# 135. LEAD DETAIL FETCH SECURITY

Only:

* requester
* receiver
* authorised internal staff

may access according to Role.

---

# 136. SERVICE-ROLE USE

Service client use must follow an explicit prior authorization check.

Prefer participant-scoped query/action abstractions where practical.

Never expose service credentials.

---

# 137. LEAD DETAIL FINAL CHECKLIST

* [ ] desktop 480px Drawer
* [ ] mobile page
* [ ] Back
* [ ] real Lead source
* [ ] real relative time
* [ ] correct Contact Reveal state
* [ ] phone only when authorised
* [ ] Call
* [ ] Message
* [ ] status transitions
* [ ] reason-gated terminal state
* [ ] Related Property
* [ ] Notes
* [ ] Timeline
* [ ] Follow-up
* [ ] Schedule Visit
* [ ] Duplicate Lead handling
* [ ] direct URL protection.

---

# 138. SCREENS 6 AND 7 — MESSAGES

Batch 6 requires:

* Thread List
* Thread Detail.

---

# 139. MOBILE THREAD LIST

Exact structure:

* Messages title
* avatar
* counterpart name
* time
* last-message preview
* unread badge.

---

# 140. THREAD EMPTY STATE

Exact:

`No messages yet`

`Chats with buyers appear here once they message you.`

---

# 141. CURRENT THREAD LIST GAP

Current Thread List shows:

* name
* preview
* unread badge

but lacks the exact source composition such as:

* visible message time
* dedicated Thread navigation.

---

# 142. DEDICATED THREAD DETAIL ROUTE

Create/use a real Thread Detail route.

Example:

`/dashboard/messages/[threadId]`

Current Thread List routes Lead-linked conversations to:

Lead Detail.

That is not the Batch 6 Message Thread Detail experience.

---

# 143. DESKTOP MESSAGES

Source rule:

Desktop uses two-pane layout:

* Thread List left
* active Thread right.

---

# 144. MOBILE MESSAGES

Mobile:

* Thread List route
* tap Thread
* full Thread Detail
* Back to Messages.

---

# 145. THREAD DETAIL HEADER

Exact source includes:

* avatar
* counterpart name
* related Property.

---

# 146. SAFETY BANNER

Exact:

`Never share OTP or payment details in chat.`

Keep visible according to source.

---

# 147. MESSAGE DAY SEPARATOR

Source:

`Today`

Use actual date grouping.

---

# 148. MESSAGE BUBBLES

Support:

* incoming
* outgoing
* timestamps
* actual delivery/read state.

---

# 149. READ RECEIPT TRUTH

Do not show `✓✓` unless backend state supports actual read semantics.

---

# 150. STICKY MESSAGE INPUT

Exact:

`Type a message…`

Mobile input remains above:

* software keyboard
* safe area.

---

# 151. SEND ACTION

Must support:

* duplicate-submit prevention
* safe optimistic UI
* failure/retry state
* empty-body block
* length validation.

---

# 152. CURRENT THREAD LIST N+1

Current `listThreads` performs per Thread queries for:

* unread count
* latest Message
* counterpart Profile name.

Replace with batched query, view or efficient RPC.

---

# 153. THREAD PAGINATION

Do not load unlimited Threads.

Use pagination/cursor.

---

# 154. MESSAGE PAGINATION

Older Messages load progressively.

Current action already supports page/limit foundation.

Wire UI correctly.

---

# 155. THREAD SEARCH AND ARCHIVE

Preserve Batch 9 requirements:

* search
* participant-specific archive.

Do not remove them merely because Batch 6 sample is compact.

---

# 156. ATTACHMENTS

Enable only with safe Media Provider pipeline.

If provider unavailable:

show honest unavailable state.

Do not fake uploaded attachment.

---

# 157. MESSAGE REPORT/BLOCK

Preserve Batch 9 report and safety functionality.

---

# 158. MESSAGES FINAL CHECKLIST

* [ ] mobile Thread List
* [ ] desktop two-pane
* [ ] dedicated Thread Detail
* [ ] time
* [ ] preview
* [ ] unread
* [ ] empty
* [ ] search
* [ ] archive
* [ ] safety banner
* [ ] real bubbles
* [ ] day grouping
* [ ] real read state
* [ ] sticky input
* [ ] keyboard safe
* [ ] pagination
* [ ] N+1 removed
* [ ] report
* [ ] block
* [ ] attachments provider honesty.

---

# 159. SCREENS 8 AND 9 — SITE VISITS

Site Visits must be a complete Owner Dashboard module.

It cannot remain disabled in navigation.

---

# 160. CURRENT SITE VISIT NAV GAP

Current Owner nav marks Site Visits as disabled.

The expected Owner route is not implemented at the audited canonical path.

Build the real module.

---

# 161. SITE VISIT LIST HEADER

Exact:

`Site Visits`

Tabs:

* Upcoming
* Past
* Calendar.

---

# 162. UPCOMING COUNT

Use real count.

---

# 163. VISIT LIST ROW

Source shows:

* day
* month
* requester name
* time
* Property
* Locality/City
* status
* actions.

---

# 164. REQUESTED VISIT STATE

Source:

`Awaiting your response`

Actions:

* Accept
* Reschedule
* Reject.

---

# 165. CONFIRMED VISIT STATE

Source:

`Confirmed`

Action:

`Details`.

---

# 166. REJECT CONFIRMATION — SCREEN 9B

Exact structure:

`Reject this visit request?`

Context includes:

* requester
* requested Date
* requested Time.

Actions:

* Reschedule instead
* Reject visit.

---

# 167. REJECTION REASON

Preserve Batch 9 reason requirements.

If Reject requires structured reason:

collect it in the confirmation workflow.

Do not make a destructive workflow lose required business data.

---

# 168. CURRENT SITE VISIT REQUEST GAP

Current `requestSiteVisit` does not collect requested Date/Time.

It creates a generic requested Visit.

Batch 6/9 require actual scheduling information.

Correct the model and request form.

---

# 169. CURRENT REJECT REASON GAP

Current `respondSiteVisit` supports:

* accept
* reject

but does not persist rejection reason.

Add required reason handling.

---

# 170. RESCHEDULE FLOW

Required:

* new Date
* new Time
* timezone
* reason/note where required
* participant Notification
* status timeline.

---

# 171. ACCEPT FLOW

Accept must validate:

* requested slot
* current Visit status
* host ownership
* future Date/Time.

---

# 172. VISIT DETAIL MOBILE

Exact source:

* Site Visit contextual Header
* Date block
* Saturday, 11:00 AM
* requester
* status
* related Property
* map
* exact meeting address according to permission
* Directions
* Reject
* Reschedule
* Accept.

---

# 173. MAP PROVIDER

If Maps Provider is unavailable:

show:

* address
* safe external native-map intent where approved
* honest fallback.

Do not show a fake Map box pretending to work.

---

# 174. DIRECTIONS

Use approved Native Map Intent rule or configured Maps behavior.

Do not keep conflicting map behavior.

---

# 175. VISIT ADDRESS PRIVACY

Exact Property address is visible only to actual Visit participants when allowed.

Never expose it publicly.

---

# 176. SITE VISIT LIST QUERY

Current list query is unbounded.

Implement:

* pagination/cursor
* status filter
* date filter
* indexed ordering.

---

# 177. VISIT LIST ENRICHMENT

Return needed display data efficiently:

* participant name
* Property/Project summary
* scheduled time
* safe address.

Avoid per-row N+1.

---

# 178. SITE VISIT WORKFLOW ATOMICITY

Visit status update, Lead activity update, CRM event and Notification must be:

* transactional,
* or durably recoverable/idempotent.

Current separate multi-step writes require reconciliation.

---

# 179. SITE VISIT DEEP FUNCTIONALITY

Preserve Batch 9:

* request
* Accept
* Reject
* Reschedule
* reminder
* completion
* no-show
* feedback
* dispute.

---

# 180. SITE VISIT FINAL CHECKLIST

* [ ] active nav link
* [ ] Owner route
* [ ] Upcoming
* [ ] Past
* [ ] Calendar
* [ ] real counts
* [ ] requested Date/Time
* [ ] Accept
* [ ] Reschedule
* [ ] Reject
* [ ] reason where required
* [ ] confirmation
* [ ] participant Notification
* [ ] Lead timeline
* [ ] mobile Detail
* [ ] map/fallback
* [ ] Directions
* [ ] private address
* [ ] pagination
* [ ] N+1 removed
* [ ] reminders
* [ ] completion
* [ ] no-show
* [ ] feedback
* [ ] dispute.

---

# 181. SCREENS 10–12 — SAVED CONTENT

Owner Saved experience includes three distinct systems:

1. Saved Properties/Projects
2. Saved Searches
3. Recently Viewed.

All must be visible according to Batch 6.

---

# 182. CURRENT SAVED UI GAP

Current Owner Saved page only renders Saved Items.

Although backend actions exist for:

* Saved Searches
* Recently Viewed,

the Batch 6 Owner UI does not currently present them completely.

Wire all three systems.

---

# 183. SCREEN 10 — SAVED PROPERTIES

Source shows Property and Project Cards.

Examples include:

* Property Price
* Property title
* Location
* Project label
* Price range
* Project title
* City.

Use real saved records.

---

# 184. SAVED ITEM AVAILABILITY

If entity was removed:

show honest:

`No longer available`

and allow Unsave.

Do not link to broken Detail.

---

# 185. SAVED EMPTY STATE

Exact:

`Properties you save will appear here`

`Tap the heart on any listing to save it.`

`Browse properties`

---

# 186. SAVED GRID RESPONSIVENESS

Desktop:

responsive Card grid.

Mobile:

single-column or exact source mobile composition.

---

# 187. SCREEN 11 — SAVED SEARCHES

Source examples include:

* search title
* purpose
* Budget
* alert cadence
* new-match count.

---

# 188. SAVED SEARCH NEW MATCH COUNT

Example source:

`4 new`

must come from actual matching query/event state.

Never hard-code.

---

# 189. ALERT CADENCE

Source examples:

* alerts daily
* no new matches.

Persist actual alert preference.

---

# 190. SAVED SEARCH ACTIONS

Support:

* open Search
* edit alert preference where product allows
* delete Saved Search.

---

# 191. SAVED SEARCH EMPTY STATE

Exact:

`No saved searches`

`Save a search from results to get notified of new matches.`

---

# 192. SCREEN 12 — RECENTLY VIEWED

Source uses a horizontal Listing strip.

Examples are fixtures only.

Use real recent views.

---

# 193. RECENTLY VIEWED EMPTY RULE

Source:

`Listings you view will appear here.`

with Browse CTA.

The section may remain hidden until first View according to source.

---

# 194. RECENT VIEW LIMIT

Current backend keeps up to 30 signed-in recent records.

Use bounded display/pagination.

---

# 195. RECENT VIEW CLEAR HISTORY

Preserve useful existing Clear History capability where compatible.

Require confirmation if product policy needs it.

---

# 196. RECENT VIEW RLS

Users can access/delete only their own history.

---

# 197. SAVED DATA PERFORMANCE

Current Saved Item entity loading is batched by target type, which is useful.

Preserve batching.

Add pagination for large collections.

---

# 198. SAVED FINAL CHECKLIST

* [ ] Saved Property cards
* [ ] Saved Project cards
* [ ] real Price
* [ ] real Location
* [ ] unavailable state
* [ ] Unsave
* [ ] Browse CTA
* [ ] Saved Searches UI
* [ ] real query summary
* [ ] real new-match count
* [ ] alert preference
* [ ] delete
* [ ] Recently Viewed
* [ ] real tracking
* [ ] empty/hide logic
* [ ] Clear History
* [ ] pagination
* [ ] RLS.

---

# 199. SCREEN GROUP 13 — OWNER ANALYTICS

Three mandatory states:

1. Populated
2. Not Enough Data
3. Provider Setup Required.

---

# 200. CURRENT ANALYTICS GAP

Owner Analytics is currently disabled in Owner navigation and the expected canonical Owner route is not available in the audited implementation.

Build it.

---

# 201. ANALYTICS POPULATED STATE

Exact source:

`Views — last 14 days`

Filter context:

`All listings`

Helper:

`data from live tracking, not simulated`

Reference total:

`1,284`

This value is fixture only.

---

# 202. VIEWS CHART

Show real daily data over the last 14 days.

Do not use generated random chart values.

---

# 203. LISTING FILTER

Support:

* All Listings
* selected Owner Listing.

Only query owned Listings.

---

# 204. TIMEZONE

Aggregate dates using canonical User/platform timezone.

Avoid date-boundary mismatch between UTC and India.

---

# 205. LEAD SOURCES

Exact source categories:

* Search results
* Saved search alerts
* Shared links.

Use actual Lead Source attribution.

---

# 206. SOURCE ATTRIBUTION

Ensure inquiry creation preserves actual source.

Do not infer every Lead as Search Result.

---

# 207. NOT ENOUGH DATA STATE — SCREEN 13B

Exact:

`Not enough data yet`

`Charts appear once your listing has been live for 7 days. Views are being counted — nothing is lost.`

Use this only if tracking is genuinely active.

---

# 208. INSUFFICIENT-DATA LOGIC

State should depend on:

* first eligible live date
* data volume/period rule.

Do not show Provider Setup Required when Provider is active but data is young.

---

# 209. PROVIDER SETUP REQUIRED — SCREEN 13C

Exact:

`Analytics: Setup Required`

`Tracking provider not connected — no charts are shown until it is. Never fake-active.`

Action:

`Set up`

The Set Up action should be available only where the Owner has permission or route to Support/appropriate information.

An Owner must not receive Admin Provider Secret access.

---

# 210. ANALYTICS PROVIDER HONESTY

Current provider documentation indicates Analytics remains provider-gated/deferred.

Do not render Charts using fake data before the real pipeline works.

---

# 211. ANALYTICS EVENT PRIVACY

Respect Batch 17 consent and privacy rules.

Do not activate non-essential marketing tracking before consent.

Operational Listing analytics must have documented lawful/product basis.

---

# 212. ANALYTICS DATA MODEL

Recommended minimum:

* entity type
* entity ID
* event type
* source
* timestamp
* anonymous/session-safe identifier as allowed
* consent category where required.

Aggregate into efficient daily summaries.

---

# 213. ANALYTICS RLS

Owner sees analytics only for entities they own.

---

# 214. ANALYTICS PERFORMANCE

Do not scan raw events on every Dashboard load.

Use:

* indexed queries
* materialized/aggregate tables
* scheduled aggregation where needed.

---

# 215. ANALYTICS FINAL CHECKLIST

* [ ] Owner route
* [ ] active nav
* [ ] last 14 days
* [ ] real views
* [ ] Listing filter
* [ ] source attribution
* [ ] Search Results source
* [ ] Saved Alert source
* [ ] Shared Link source
* [ ] insufficient-data state
* [ ] Provider Setup Required
* [ ] no fake chart
* [ ] privacy/consent
* [ ] RLS
* [ ] performant aggregation.

---

# 216. SCREENS 14–17 — OWNER BILLING

Batch 6 shows the Owner-facing Billing presentation.

Batch 10 controls complete Payment and Subscription truth.

Do not implement conflicting Billing logic twice.

---

# 217. SCREEN 14 — BILLING/SUBSCRIPTION

Exact source elements:

* Trial banner
* days remaining
* Upgrade
* current Plan
* monthly Price
* next billing Date
* Active badge
* Listings used
* Featured Slots
* Upgrade to Premium
* Manage.

---

# 218. TRIAL BANNER

Source example:

`Trial: 9 days left on your Basic trial.`

Compute real remaining days.

---

# 219. TRIAL EXPIRY

Use actual Trial start/end.

Do not reset countdown on refresh.

---

# 220. CURRENT PLAN

Show:

* Plan name
* amount/cycle
* status
* renewal/expiry date.

Use actual Billing records.

---

# 221. USAGE METER — LISTINGS

Must follow actual Plan semantics.

If limit means Active Listings:

count real active Listings.

---

# 222. USAGE METER — FEATURED SLOTS

Source example:

`1 / 1`

Use real monthly/current-cycle entitlement and consumption.

---

# 223. CURRENT BILLING USAGE ISSUE

Current Billing implementation displays generic usage counters.

Batch 10 audit identified that counters must use feature-specific semantics.

Correct before Batch 6 acceptance.

---

# 224. BILLING ACTIONS

Required:

* Upgrade
* Manage
* cancel/change actions according to Batch 10.

---

# 225. NO DIRECT PAYMENT SHORTCUT

Pricing/Upgrade actions must follow Batch 10:

Plan selection
→ Auth if needed
→ Checkout Summary
→ Razorpay
→ Verifying
→ trusted Success/Failed/Pending.

---

# 226. SCREEN 15 — INVOICES

Desktop Table:

* INVOICE
* DATE
* AMOUNT.

Source mobile:

same row transformed into Card.

Actions:

* View
* Download.

---

# 227. INVOICE EMPTY STATE

Exact concept:

`No invoices yet — they appear after your first payment.`

Only after verified payment/invoice issuance.

---

# 228. INVOICE PAGINATION

Current billing action has bounded list behavior but must support real pagination for full history.

---

# 229. SCREEN 16 — INVOICE DETAIL

Printable Invoice.

Source includes:

* company identity
* TAX INVOICE
* Invoice Number
* Billed To
* GSTIN only when provided
* Date
* Paid status
* line items
* Qty
* taxable amount
* GST
* Total
* Print
* Download PDF.

---

# 230. INVOICE IMMUTABILITY

Invoice displays immutable issue-time snapshot.

Changing Profile later must not rewrite old Invoice.

---

# 231. CURRENT INVOICE PDF GAP

Current Billing UI explicitly says PDF Download is implemented later.

Batch 6 acceptance requires real:

* View
* Print
* PDF Download.

---

# 232. PDF HONESTY

Do not render Download PDF action before a real PDF is generated or safely generated on demand.

---

# 233. SCREEN 17 — PRICING/UPGRADE

Exact in-Dashboard Plan comparison cards:

* Free
* Basic current Plan
* Premium.

Use role-correct real Plan data.

---

# 234. PLAN CARD FEATURES

Source examples include:

* active Listing limits
* featured slots
* Analytics
* exports
* Priority Support.

Only display capabilities actually provided by Plan configuration.

---

# 235. CURRENT PLAN BADGE

Correctly identify current governing Plan.

Do not hard-code Basic.

---

# 236. BILLING CURRENT UI RECONCILIATION

Current Billing page combines:

* current Plan
* usage
* Invoices
* Payments

inside a generic stacked dashboard.

Rebuild presentation to exact Batch 6 screens while preserving Batch 10 financial logic.

---

# 237. BILLING FINAL CHECKLIST

* [ ] Trial banner
* [ ] real days remaining
* [ ] Plan name
* [ ] amount/cycle
* [ ] renewal date
* [ ] status
* [ ] Listing meter correct
* [ ] Featured Slot meter correct
* [ ] Upgrade
* [ ] Manage
* [ ] Invoice desktop table
* [ ] Invoice mobile Card
* [ ] View
* [ ] PDF
* [ ] Print
* [ ] immutable snapshot
* [ ] Pricing comparison
* [ ] correct current Plan
* [ ] Batch 10 checkout flow
* [ ] no fake Payment state.

---

# 238. SCREEN GROUP 18 — OWNER VERIFICATION

Two mandatory states:

* Upload and Under Review
* Rejected and Resubmit.

---

# 239. CURRENT VERIFICATION GAP

Current Owner Verification page only displays database status.

The current panel explicitly says submission workflow is not available yet.

This is not Batch 6 complete.

---

# 240. VERIFICATION TIMELINE

Exact steps:

* Submitted
* Under Review
* Approved.

Use actual status-event history.

---

# 241. IDENTITY DOCUMENT UPLOAD

Exact:

`Upload identity document`

Allowed document types:

* Aadhaar
* PAN
* Driving Licence.

Source file UI:

* JPG/PDF
* max 5 MB.

---

# 242. PRIVATE DOCUMENT STORAGE

Verification documents are private.

Requirements:

* private storage
* signed short-lived access
* reviewer permission
* access logging.

Never expose public CDN URL.

---

# 243. FILE VALIDATION

Validate:

* MIME
* extension
* size
* actual file structure
* corruption
* malware/unsafe content where configured.

---

# 244. VERIFICATION SUBMIT

Required sequence:

1. authenticated Owner
2. active Account
3. document upload succeeds
4. request record created
5. consent/policy version stored
6. status Submitted/Pending
7. status event created
8. Admin Verification queue receives item
9. in-app Notification lifecycle.

---

# 245. UNDER REVIEW STATE

Source example:

* filename
* file size
* uploaded date
* Under Review.

Use real metadata.

---

# 246. REJECTED STATE — SCREEN 18B

Exact structure:

`Verification rejected`

Reviewed Date

`Reason from the review team`

reason card

`Re-submit document`.

---

# 247. REJECTION REASON

Must come from actual Admin review.

Do not fabricate a reason.

---

# 248. RESUBMIT

Resubmit:

* preserves history
* creates new Document version/submission attempt
* returns to Pending/Under Review
* does not erase prior review events.

---

# 249. VERIFIED BADGE

Only actual Approved verification grants Verified status/badge.

File upload does not.

Under Review does not.

---

# 250. VERIFICATION PROVIDER HONESTY

If private Media storage is unavailable:

show Setup Required.

Do not show Upload success without stored file.

---

# 251. VERIFICATION FINAL CHECKLIST

* [ ] real request
* [ ] private upload
* [ ] JPG/PDF
* [ ] max 5 MB
* [ ] allowed document types
* [ ] consent
* [ ] timeline
* [ ] Submitted
* [ ] Under Review
* [ ] Approved
* [ ] rejected Date
* [ ] real reason
* [ ] Resubmit
* [ ] history
* [ ] Admin queue connection
* [ ] Notification
* [ ] verified badge truth
* [ ] RLS
* [ ] private access logs.

---

# 252. SCREEN 19 — PROFILE EDIT

Batch 6 requires a complete Profile Edit experience.

---

# 253. CURRENT PROFILE GAP

Current `/profile` route is primarily read-only.

It explicitly shows:

`Profile editing will be available in a later phase.`

Batch 6 acceptance requires actual Profile editing.

---

# 254. PROFILE PHOTO

Exact:

`Profile photo`

`Tap to upload & crop · JPG/PNG, max 2 MB`

---

# 255. AVATAR UPLOAD

Required:

* JPG/PNG
* max 2 MB
* progress
* crop
* preview
* retry
* change
* remove according to policy.

---

# 256. PROFILE FIELDS

Exact source:

* Full Name
* Mobile Number
* Email
* City
* Bio.

---

# 257. VERIFIED MOBILE LOCK

Exact:

`Locked — contact support to change your verified number.`

The field must not be editable through general Profile Update.

---

# 258. MOBILE CHANGE WORKFLOW

A verified mobile change requires a separate secure workflow such as:

* Support/approval
* old-number verification where possible
* new-number OTP
* Audit.

Do not permit a simple Profile update mutation.

---

# 259. EMAIL

Allow edit according to product policy.

If verification is required:

show actual verification status.

Do not falsely mark it verified.

---

# 260. CITY

Use canonical Location data.

Do not maintain a tiny hard-coded list as final authority.

---

# 261. BIO

Validate length.

Encode output safely.

---

# 262. PROFILE SAVE

Actions:

* Cancel
* Save Changes.

Save only permitted Profile fields.

---

# 263. PROFILE PRIVILEGE-ESCALATION PROTECTION

A Profile update endpoint/RLS policy must never allow Owner to alter:

* public_role
* account_status
* verification_status
* Staff role
* permissions
* Plan state.

Explicitly audit Profile RLS/update column safety.

---

# 264. PROFILE CONCURRENCY

Avoid silently overwriting newer Profile edits where multi-session conflict matters.

---

# 265. PROFILE FINAL CHECKLIST

* [ ] editable Profile
* [ ] avatar upload
* [ ] crop
* [ ] 2 MB validation
* [ ] Full Name
* [ ] locked verified mobile
* [ ] Email
* [ ] City
* [ ] Bio
* [ ] Cancel
* [ ] Save
* [ ] own-Profile only
* [ ] no role mutation
* [ ] no verification mutation
* [ ] Provider failure state.

---

# 266. SCREEN 20 — NOTIFICATIONS CENTER

This is a real DB-backed Notification Center.

---

# 267. NOTIFICATION HEADER

Required:

* Notifications
* Mark all read.

---

# 268. NOTIFICATION GROUPING

Exact:

* TODAY
* EARLIER.

Group using canonical timezone.

---

# 269. SOURCE NOTIFICATION TYPES

Examples:

* New Lead
* Listing Approved
* Trial Expiry.

Use real events.

---

# 270. DEEP LINKS

Every Notification type must map to an authorised correct route.

Examples:

* Lead → Lead Detail
* Property approved → My Properties/private/public Detail as appropriate
* Trial expiry → Billing
* Site Visit → Site Visit Detail
* Message → Message Thread Detail
* Verification → Verification
* Support Ticket → Ticket Detail.

---

# 271. CURRENT NOTIFICATION DEEP-LINK BUG

Current Notification Client handles only limited target types.

It currently treats both:

* Lead
* Message Thread

as navigation to a Lead Detail path using `target_id`.

A Thread ID is not a Lead ID.

Fix the complete route mapping.

---

# 272. DELETED TARGET FALLBACK

If Notification target no longer exists:

* mark read normally
* route to safe module fallback
* do not throw 404 loop.

---

# 273. MARK READ

Clicking unread Notification:

* authorises target
* marks read
* navigates.

---

# 274. MARK ALL READ

Must update all User Notifications idempotently.

---

# 275. EMPTY STATE

Source:

`You're all caught up`

when no notifications remain to show according to source state.

Do not show fake items.

---

# 276. NOTIFICATION PAGINATION

Current page loads a fixed maximum.

Implement cursor/load-more for long history.

---

# 277. EXTERNAL DELIVERY SEPARATION

In-app Notification record does not mean:

* Push delivered
* SMS delivered
* WhatsApp delivered
* Email delivered.

External channels use separate Delivery Logs.

---

# 278. NOTIFICATIONS FINAL CHECKLIST

* [ ] real Notification list
* [ ] Today
* [ ] Earlier
* [ ] relative time
* [ ] unread styling
* [ ] Mark read
* [ ] Mark all read
* [ ] correct deep links
* [ ] Thread deep link fixed
* [ ] deleted-target fallback
* [ ] empty
* [ ] pagination
* [ ] external delivery honesty.

---

# 279. SCREEN 21 — SUPPORT / HELP

Batch 6 Support is an authenticated operational screen.

The current public static Support page is not a substitute.

---

# 280. CURRENT SUPPORT GAP

Current `/support` page contains static:

* Email Support
* Grievance
* response-time content.

It does not implement the Batch 6:

* FAQ
* Ticket form
* Ticket list
* Ticket status.

Build the full system.

---

# 281. SUPPORT SHELL

When accessed by Owner:

render correct Owner Dashboard context.

Do not unexpectedly switch to public Header/Footer.

---

# 282. FREQUENTLY ASKED

Source examples:

* Why is my listing still pending?
* How do I change my registered mobile number?
* When do featured slots renew?

Use real approved FAQ content.

---

# 283. FAQ ACCORDION

Questions expand/collapse.

Keyboard accessible.

No dead headings.

---

# 284. RAISE A TICKET

Source categories:

* Listing issue
* Billing & payments
* Account & verification
* Something else.

---

# 285. TICKET FORM

Collect appropriate:

* category
* subject
* description
* related entity when useful
* attachment where provider allows.

Use source visual pattern.

---

# 286. TICKET SUBMIT

Required:

* Auth
* Account state check
* validation
* rate limit
* duplicate protection where appropriate
* record creation
* initial status
* Notification/admin queue.

---

# 287. YOUR TICKETS

Source examples:

* ticket reference number
* subject
* opened Date
* category
* status.

---

# 288. TICKET STATUS

At minimum:

* Open
* In Progress
* Resolved

plus approved lifecycle such as Waiting for User/Closed where required.

---

# 289. TICKET HUMAN-READABLE ID

Use a stable reference such as:

`#4821`

or approved format.

Do not expose raw UUID.

---

# 290. TICKET DETAIL

Preserve Batch 11/16 threaded Support capability:

* messages
* status history
* attachments
* staff replies
* read-only closed Thread where applicable.

---

# 291. SUPPORT SLA HONESTY

Do not show operational response-time promises unless approved.

---

# 292. SUPPORT SECURITY

Owner can see only own Tickets.

Staff access is permission-based and audited.

---

# 293. SUPPORT FINAL CHECKLIST

* [ ] Owner shell
* [ ] FAQs
* [ ] Accordion
* [ ] categories
* [ ] Ticket form
* [ ] validation
* [ ] rate limit
* [ ] human ID
* [ ] Ticket list
* [ ] Open
* [ ] In Progress
* [ ] Resolved
* [ ] Detail Thread
* [ ] attachments honesty
* [ ] Admin queue
* [ ] RLS.

---

# 294. SCREEN 22 — SETTINGS

Settings is a real persisted screen.

It cannot remain a disabled Sidebar item.

---

# 295. CURRENT SETTINGS GAP

Current Owner nav marks Settings disabled.

Expected Owner Settings route is missing at the audited canonical path.

Build it.

---

# 296. NOTIFICATION PREFERENCES

Exact source:

### New Lead Alerts

`Push + SMS`

### Site Visit Reminders

`Push`

### Marketing Emails

`Email`

---

# 297. PREFERENCE STORAGE

Store preference per:

* event type
* channel
* User.

---

# 298. PROVIDER AVAILABILITY

A User preference does not prove Provider delivery.

If SMS/Push/Email provider is unavailable:

preference may remain stored, but delivery status must remain honest.

---

# 299. PRIVACY SETTING

Exact:

`Show my name on listings`

Helper:

`Off shows "Owner" instead of your name`

This setting must affect applicable public Listing presentation.

---

# 300. NAME PRIVACY CONSISTENCY

Ensure:

* Search Cards
* Detail Page
* Public Owner Profile
* structured metadata

all respect the same privacy setting.

Do not hide visually while leaking name in initial HTML/schema/API.

---

# 301. APPEARANCE SETTING

Options:

* Light
* Dark
* System.

Use token swaps only.

Do not redesign pages for Dark mode.

---

# 302. APPEARANCE PERSISTENCE

Persist:

* local immediate preference
* optional account sync.

Avoid theme flash on initial render.

---

# 303. LANGUAGE SETTING

Batch 6 source:

* English
* ગુજરાતી — Coming Soon.

Batch 17 later defines advanced Localization capability.

Resolve as:

* until Gujarati localization is complete: honest Coming Soon
* once global Localization feature is enabled: control becomes functional.

Do not permanently hard-code Coming Soon after feature activation.

---

# 304. DANGER ZONE

Exact source copy concept:

Account deletion removes User-facing account data after a:

30-day grace period.

Action:

`Delete account…`

---

# 305. DELETE ACCOUNT ENTRY FLOW

Source requires:

* type-to-confirm `DELETE`
* OTP re-verification.

This is stricter than ordinary confirmation.

---

# 306. SETTINGS FINAL CHECKLIST

* [ ] active route
* [ ] New Lead preferences
* [ ] Site Visit reminder preferences
* [ ] Marketing Email preference
* [ ] provider honesty
* [ ] Show Name privacy
* [ ] no metadata leakage
* [ ] Light
* [ ] Dark
* [ ] System
* [ ] preference persistence
* [ ] English
* [ ] Gujarati state
* [ ] Danger Zone
* [ ] DELETE confirmation
* [ ] OTP re-verification.

---

# 307. SCREEN 23 — ROLE CHANGE REQUEST

Role Change is request-based.

Never directly change Role from a Profile form.

---

# 308. CURRENT ROLE CHANGE GAP

Expected Owner Role Change screen is not available at the audited canonical route.

The previous migration manifest also identifies this as a Gap.

Build it end-to-end.

---

# 309. ROLE CHANGE SOURCE FLOW

Exact example:

`Request role change: Owner → Broker`

---

# 310. ROLE CHANGE WARNING

Source explains:

* Broker requires verification
* Listing limits differ
* Pricing differs
* existing Listings stay live during review
* current Plan may change after Approval.

Display approved accurate warning before Submit.

---

# 311. DURING REVIEW

Submitting a Role Change request must not instantly:

* change Role
* change Dashboard
* remove Listings
* change Plan.

Existing compatible Owner Listings remain available during review according to source.

---

# 312. REASON FIELD

Exact:

`Why do you want to switch?`

Validate and persist.

---

# 313. ROLE CHANGE SUBMIT

Create one real request record with:

* requester Profile
* from Role
* requested Role
* reason
* status
* created Date
* review metadata.

---

# 314. ONE ACTIVE REQUEST

Prevent duplicate simultaneous Role Change requests.

---

# 315. PENDING STATE

Exact:

`Request under review`

Context:

`Submitted 2 Jul`

review expectation text only if approved.

Action:

`Withdraw`

---

# 316. WITHDRAW

Allowed only before final decision according to state rules.

Must be idempotent.

---

# 317. ADMIN CONNECTION

Role Change request goes to Batch 11 Role Change queue.

Admin can:

* review
* approve
* reject
* request additional verification according to policy.

---

# 318. ROLE CHANGE APPROVAL TRANSACTION

Approval must safely coordinate:

* Profile Role transition
* Dashboard access
* relevant verification requirements
* Subscription migration/scheduling
* Plan compatibility
* Feature limits
* Team access
* compatible Listing ownership
* incompatible module access
* Notification
* Audit Log.

---

# 319. OWNER → BROKER DATA COMPATIBILITY

Owner and Broker both support:

* Property posting
* Requirement posting.

Compatible records should not be needlessly deleted.

Subscription and verification requirements still need explicit migration policy.

---

# 320. ROLE CHANGE PLAN MIGRATION

Do not silently activate a paid Broker Plan.

Possible outcomes must be explicit:

* retain current entitlement until period end
* map to compatible Plan
* schedule change
* require Checkout
* Admin grant

according to Billing policy.

---

# 321. ROLE CHANGE VERIFICATION

Approval must not bypass Broker verification requirements.

---

# 322. ROLE CHANGE AUDIT

Record:

* request
* withdrawal
* reviewer
* approval/rejection
* reason
* resulting migration actions.

---

# 323. ROLE CHANGE FINAL CHECKLIST

* [ ] Owner → Broker request
* [ ] warning
* [ ] reason
* [ ] one active request
* [ ] Submit
* [ ] Pending state
* [ ] submitted Date
* [ ] Withdraw
* [ ] Admin queue
* [ ] verification
* [ ] Subscription migration
* [ ] compatible Listing preservation
* [ ] Role transition transaction
* [ ] Notification
* [ ] Audit.

---

# 324. SCREEN 24 — DATA EXPORT / DELETE REQUEST

This screen handles two independent privacy/account operations:

1. Data Export
2. Account Deletion.

---

# 325. CURRENT ACCOUNT DATA GAP

Expected Account Data screen is not available at the audited canonical route.

The previous migration manifest identifies:

* Data Export
* Delete Request double guard

as gaps.

Build both.

---

# 326. SOURCE INTRODUCTION

Exact concept:

User can request:

* a copy of account-linked data
* account deletion.

Source specifically mentions:

* Listings
* Leads
* Messages
* Invoices.

The complete export should include other portable User-owned data where legally/product appropriate.

---

# 327. STEP 1 — CONFIRM IDENTITY

Exact source:

masked registered mobile

example:

`+91 98250 •••45`

Action:

`Send OTP`

---

# 328. OTP SECURITY

Use real OTP Provider or approved secure reauthentication mechanism.

Do not use fake OTP in production.

---

# 329. OTP RATE LIMITING

Protect against:

* repeated sends
* brute force
* cost abuse.

---

# 330. DATA EXPORT ACTION

`Request Export`

opens source confirmation pattern.

After confirmation and identity verification:

create Export request.

---

# 331. EXPORT DATA SCOPE

Potential export includes, as applicable:

* Profile
* Property records
* Requirement records
* own Lead records
* Message participation data according to privacy rules
* Site Visits
* Saved Items
* Saved Searches
* Notification settings
* Account settings
* Consent history
* Subscription history
* Invoices
* Payment-safe summaries
* Support Tickets.

Do not expose data belonging exclusively to another User.

---

# 332. EXPORT JOB STATE MODEL

Use:

* Requested
* Processing
* Ready
* Failed
* Expired.

---

# 333. EXPORT GENERATION

For large data:

use durable job/queue processing.

Do not hold one web request open for a huge export.

---

# 334. EXPORT DOWNLOAD

Use:

* private generated archive
* short-lived signed Download URL
* expiry
* access logging.

---

# 335. EXPORT EMAIL DELIVERY

Source says Download Link arrives via Email within 48 hours.

Only claim Email delivery when Email Provider works.

Otherwise show honest in-app Ready state and Provider status.

---

# 336. EXPORT SLA

Only display 48-hour target if operationally approved.

---

# 337. EXPORT RATE LIMIT

Limit repeated Export creation.

One active job per User where appropriate.

---

# 338. REQUEST DELETION

`Request Deletion`

uses confirmation.

For final destructive request:

require:

* identity re-verification
* type `DELETE`
* explicit consequence acknowledgement.

---

# 339. DELETION GRACE PERIOD

Exact source:

30-day grace period.

During grace period:

User can cancel deletion.

---

# 340. DELETION STATE MODEL

Recommended:

* Requested
* Grace Period
* Cancelled
* Scheduled
* Processing
* Completed
* Blocked/Legal Hold where applicable.

---

# 341. DELETE ACCOUNT ACCESS DURING GRACE

Define clearly:

* whether login remains available only to cancel
* whether Posting is blocked
* whether public Listings are hidden immediately or on execution.

Use one documented policy.

---

# 342. FINANCIAL RECORD RETENTION

Do not promise physical deletion of legally required:

* Invoice
* Payment
* tax
* Audit records.

Use:

* legal retention
* pseudonymisation/anonymisation where allowed.

User-facing copy must be legally truthful.

---

# 343. MESSAGE RETENTION

Deletion must preserve Conversation integrity and other participants' lawful access.

Apply:

* anonymisation
* retention policy

rather than blindly deleting another User's Conversation history.

---

# 344. LISTING DELETION

At execution:

* remove/hide public Listings
* update Search index
* handle media lifecycle
* preserve required audit/financial evidence.

---

# 345. DELETION JOB TRANSACTION SAFETY

Use durable orchestrated deletion.

Do not partially delete half an account and mark the request Completed.

---

# 346. DELETE CANCELLATION

During grace period:

User can cancel.

Cancellation must:

* update request state
* restore account operation according to policy
* create Audit event
* notify User.

---

# 347. ACCOUNT DATA FINAL CHECKLIST

* [ ] masked mobile
* [ ] Send OTP
* [ ] real OTP
* [ ] rate limit
* [ ] Request Export
* [ ] confirmation
* [ ] Export record
* [ ] secure job
* [ ] Processing state
* [ ] Ready state
* [ ] private Download
* [ ] URL expiry
* [ ] access log
* [ ] honest Email delivery
* [ ] Request Deletion
* [ ] confirmation
* [ ] type DELETE
* [ ] OTP reverify
* [ ] 30-day grace
* [ ] cancellation
* [ ] legal retention handling
* [ ] Message privacy
* [ ] Listing cleanup
* [ ] durable execution
* [ ] final Notification/Audit.

---

# 348. OWNER NAVIGATION RECONCILIATION

Current Owner nav contains disabled modules.

Batch 6 completion requires live navigation for:

* Site Visits
* Analytics
* Settings.

Mobile Drawer additionally requires:

* Recently Viewed.

Do not ship these as permanent:

`Coming Soon`

when their Batch 6 screens are required.

---

# 349. DESKTOP NAV PRESENTATION RECONCILIATION

Current desktop Owner nav includes additional entries such as:

* Verification
* Profile
* Support

inside the Sidebar.

Follow the exact Batch 6 desktop source.

Access to required modules can remain available through the exact source-specified locations such as:

* Drawer
* Avatar/Profile controls
* contextual routes.

Do not visually add global Sidebar rows that the source does not show.

---

# 350. SHELL DATA ARCHITECTURE

Build a shared Owner shell loader for lightweight global data:

* Property badge count
* Lead badge count
* unread Notification count
* User name
* Role
* User City.

Avoid independently inconsistent values across pages.

---

# 351. SHELL PERFORMANCE

Shell loader must remain bounded.

Do not fetch entire Properties or Leads to calculate badges.

Use count queries.

---

# 352. MOBILE DRAWER ACCESSIBILITY

Required:

* `role=dialog`
* `aria-modal`
* focus trap
* return focus to hamburger
* Escape close
* outside click close
* body scroll lock.

---

# 353. TOPBAR NOTIFICATION BELL

Must use real unread count.

Click:

* desktop dropdown according to Batch 1
* mobile bottom sheet/full Notification pattern.

---

# 354. TOPBAR AVATAR MENU

Actions must be real.

No dead:

* Profile
* Settings
* Logout

items.

---

# 355. OWNER DASHBOARD DATA PRIVACY

Initial Client payload must not include:

* hidden contact numbers
* private verification documents
* other User private email/mobile
* provider secrets
* full Payment gateway payload.

---

# 356. OWNER RLS MATRIX

Owner must be able to access only:

* own Properties
* own Requirements
* Leads where participant/receiver/requester as permitted
* own Message Threads
* Site Visits where participant
* own Saved content
* analytics for owned Listings
* own Subscription
* own Invoices
* own Verification submissions
* own Notifications
* own Support Tickets
* own Settings
* own Role Change request
* own Account Data requests.

---

# 357. DIRECT URL TESTS

Owner A must not access:

* Owner B Property edit
* Owner B Requirement
* Owner B Lead
* unrelated Message Thread
* unrelated Site Visit
* Owner B Invoice
* Owner B Verification Document
* Owner B Ticket
* Owner B Export archive.

---

# 358. SERVER ACTION AUTHORIZATION

Every mutation must independently verify:

* Authentication
* Role where applicable
* entity ownership/participation
* current state
* input validation.

A hidden button is not authorization.

---

# 359. SERVICE CLIENT USE

Where Service Role is used:

perform explicit authorization first.

Avoid service-role reads from Client.

---

# 360. PAGINATION AUDIT

The following Owner modules require scalable pagination or bounded feeds:

* My Properties
* My Requirements
* Leads
* Messages
* Site Visits
* Saved Items
* Saved Searches
* Recently Viewed
* Invoices
* Notifications
* Support Tickets.

---

# 361. CURRENT FIRST-100 DATA ISSUE

Do not treat:

`get(..., 1, 100)`

as complete Account data for:

* tab counts
* totals
* filtering.

---

# 362. COUNT QUERY RULE

Use database count/aggregate queries.

Do not download rows merely to count them.

---

# 363. N+1 AUDIT

Known current areas requiring correction include:

* Lead enrichment
* Message Thread enrichment.

Audit all Owner modules for similar patterns.

---

# 364. TRANSACTION SAFETY AUDIT

Multi-write workflows requiring atomic or durable behavior include:

* Lead stage + timeline
* Site Visit status + Lead status + Notification
* Subscription change
* Role Change approval
* Verification submission
* Account deletion orchestration
* Export job creation/delivery.

---

# 365. IDEMPOTENCY

Protect:

* Mark all Notifications Read
* Lead status update
* Site Visit response
* Support Ticket Submit
* Role Change Submit
* Role Change Withdraw
* Data Export Request
* Account Deletion Request
* Cancel Deletion.

---

# 366. LOADING STATE REQUIREMENTS

Every primary list/page requires source-consistent Loading state.

At minimum:

* Overview stats
* Recent Leads
* Properties
* Requirements
* Leads
* Messages
* Visits
* Saved content
* Analytics
* Billing
* Verification
* Notifications
* Tickets.

---

# 367. EMPTY STATE REQUIREMENTS

Implement exact relevant empty states for:

* No Properties
* No Requirements
* No Leads
* No Messages
* No Site Visits
* No Saved Properties
* No Saved Searches
* No Recent Views
* insufficient Analytics
* No Invoices
* No Notifications
* No Tickets.

---

# 368. ERROR STATE REQUIREMENTS

Every data screen must handle:

* connection error
* authorization error
* setup required
* provider unavailable
* entity unavailable
* generic safe server error.

No raw stack traces.

---

# 369. RETRY CONTROLS

Retry must be real.

Do not render a Retry button that only hides the error.

---

# 370. RESPONSIVE MATRIX

Verify at:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1280px
* 1366px
* ultra-wide.

---

# 371. 390PX PRIORITY

Batch 6 mobile source is centred around 390px behavior.

Verify first at:

390px.

Then smaller and larger widths.

---

# 372. TABLE → CARD RULE

Mandatory transformations include:

* Leads
* Invoices

and any additional data tables.

Do not horizontally squeeze desktop Tables into mobile.

---

# 373. DRAWER → PAGE RULE

Lead Detail:

Desktop Drawer
→ Mobile full page.

---

# 374. MODAL → BOTTOM SHEET RULE

Applicable actions on mobile use:

* bottom sheet

where Batch 1/Batch 6 pattern requires it.

---

# 375. CONTEXTUAL HEADER RULE

Owner inner pages use the mobile Back Header.

The root Owner Dashboard does not.

---

# 376. KEYBOARD TEST

Test mobile:

* Message input
* Ticket form
* Profile Bio
* Role Change reason
* OTP
* confirmation fields.

No keyboard-covered controls.

---

# 377. STICKY OVERLAP TEST

Ensure:

* bottom nav
* Message composer
* modal/sheet actions
* mobile safe area

do not overlap content.

---

# 378. TEXT WRAPPING TEST

Use long values for:

* Owner name
* Property title
* Requirement title
* Lead name
* Notification text
* Ticket subject
* Role Change reason.

No clipping or accidental horizontal scroll.

---

# 379. TOUCH TARGETS

Interactive mobile controls at least approximately 44×44px where applicable.

---

# 380. NO DEAD UI

Every visible control must work.

This includes:

* Dashboard Search
* View Leads
* Post Property
* View all
* Sidebar links
* Drawer links
* Property View
* Edit
* Pause
* Resume
* Delete
* Relist
* Requirement View Proposals
* Close
* Reopen
* Lead filters
* Retry
* Share Listing
* Lead Call
* Message
* Status
* Schedule Visit
* Message send
* Visit Accept
* Reschedule
* Reject
* Directions
* Browse Properties
* Saved Search links
* Upgrade
* Manage
* View Invoice
* Download PDF
* Print
* Verification Choose File
* Resubmit
* Profile Crop
* Save Changes
* Mark All Read
* Notification deep links
* FAQ accordion
* Submit Ticket
* Settings toggles
* Theme controls
* Privacy control
* Role Change Submit
* Withdraw
* Send OTP
* Request Export
* Request Deletion
* Cancel Deletion.

No `href="#"`.

No permanent disabled module for a required Batch 6 screen.

---

# 381. DEVELOPMENT FIXTURE — OWNER

Create stable Development-only Owner fixture matching source context.

Example:

* Rajesh Patel
* Owner
* Ahmedabad.

Do not hard-code fixture identity in components.

---

# 382. PROPERTY FIXTURES

Development fixtures may include:

* Live Property
* Pending Property
* Paused Property
* Expired Property
* Draft Property.

Use database fixtures only.

---

# 383. REQUIREMENT FIXTURES

Include:

* Active Requirement
* Closed Requirement
* real Proposal counts.

---

# 384. LEAD FIXTURES

Include Lead states:

* New
* Contacted
* Visited
* Closed.

---

# 385. SITE VISIT FIXTURES

Include:

* Requested
* Confirmed/Scheduled
* Past Completed.

---

# 386. BILLING FIXTURES

Use only:

* real test-mode Subscription
* real test-mode Invoice

where financial state is safely isolated.

Never fake Payment success.

---

# 387. FULL OWNER OVERVIEW LIVE TEST

Login as Owner
→ open `/dashboard/owner`
→ verify mobile/desktop shell
→ verify real Property badge
→ verify real Lead badge
→ verify correct greeting timezone
→ verify Active Listing count excludes Draft/Pending/Paused
→ verify Pending helper
→ create Lead
→ verify New Leads count changes
→ move Lead Contacted
→ verify not-contacted helper changes
→ schedule Visit
→ verify Visit stat
→ verify Plan usage semantics
→ open View Leads
→ open Post Property
→ return
→ test Search
→ open Notification Bell
→ test mobile Drawer
→ verify User City
→ test all Drawer links.

---

# 388. MY PROPERTIES LIVE TEST

Create:

* Draft
* Live
* Pending
* Paused
* Expired.

Open My Properties.

Verify:

* total
* each tab count
* pagination
* Live actions
* Pending actions
* Pause
* Resume
* Relist
* Delete confirmation
* Draft Resume
* mobile overflow menu
* private Pending View.

---

# 389. PROPERTY LARGE-DATA TEST

Create more than 100 test Listings.

Verify:

* total remains correct
* tab counts correct
* page 2 accessible
* filter does not lose records.

---

# 390. REQUIREMENT LIVE TEST

Create Requirement
→ approve/live
→ receive Proposals
→ verify count
→ View Proposals
→ Close
→ verify `Closed` label
→ verify real closed Date
→ verify new Proposal blocking according to policy
→ Reopen
→ verify entitlement/expiry checks.

---

# 391. LEADS LIVE TEST

Create multiple real inquiry Leads.

Verify:

* All count
* New count
* Contacted count
* Visited count
* Closed count
* desktop Table
* mobile Cards
* Loading
* Empty fixture environment
* forced error
* Retry
* row open Drawer on desktop
* row open full page mobile.

---

# 392. LEAD DETAIL LIVE TEST

Open real Lead.

Verify:

* Drawer width
* counterpart
* source Property
* relative time
* hidden phone state
* Reveal workflow
* Call only after allowed
* Message opens real Thread
* Mark Contacted
* Timeline
* Note
* Follow-up
* Schedule Visit
* mobile Back.

---

# 393. MESSAGES LIVE TEST

Create two real Threads.

Verify:

* list time
* preview
* unread count
* mark read
* dedicated Thread Detail
* safety banner
* send
* failure/retry
* read status
* mobile keyboard
* desktop two-pane
* search/archive
* participant denial.

---

# 394. SITE VISIT LIVE TEST

Create Lead
→ request Visit with Date/Time
→ Owner sees Upcoming list
→ Reject dialog
→ choose Reschedule instead
→ propose new time
→ Notification arrives
→ create second request
→ Accept
→ open mobile Detail
→ Directions
→ complete
→ Past tab.

---

# 395. SAVED CONTENT LIVE TEST

Save:

* Property
* Project.

Save Search.

Visit several Listings.

Verify:

* Saved grid
* unavailable state
* new match count
* alert preference
* Recently Viewed order
* Clear History
* empty behavior.

---

# 396. ANALYTICS LIVE TEST

With Provider/real tracking active:

open Listing views
→ verify actual event count
→ verify 14-day grouping
→ verify source attribution
→ filter Listing
→ verify Owner cannot query another Owner's analytics.

Without Provider:

verify Setup Required.

With active Provider but Listing age below threshold:

verify Not Enough Data.

---

# 397. BILLING LIVE TEST

Use real test-mode Billing records.

Verify:

* Trial remaining
* current Plan
* renewal Date
* Listings meter
* Featured Slot meter
* Invoice list
* mobile Invoice Card
* Invoice Detail
* Print
* PDF
* Pricing comparison
* Upgrade through Batch 10 Checkout flow.

---

# 398. VERIFICATION LIVE TEST

Upload valid Development test document
→ verify private storage
→ Submit
→ timeline Submitted
→ Admin Under Review
→ Owner sees Under Review
→ Admin Reject with reason
→ Owner sees exact reason
→ Resubmit new document version
→ Admin Approve
→ Verified status only now.

---

# 399. PROFILE LIVE TEST

Edit:

* Full Name
* Email
* City
* Bio
* Avatar.

Attempt to change:

* Role
* Verification
* Account Status
* verified Mobile

through direct request.

Expected:

Denied.

---

# 400. NOTIFICATION DEEP-LINK TEST

Create each supported Notification type.

Verify target routes.

Special regression:

Message Thread Notification with Thread ID must open the Thread, not `/dashboard/leads/<thread-id>`.

---

# 401. SUPPORT LIVE TEST

Open Owner Support
→ expand FAQ
→ choose category
→ create Ticket
→ verify human reference
→ Owner ticket list
→ Admin Support queue
→ Staff reply
→ Owner Notification
→ Thread update
→ resolve
→ read-only/closed behavior.

---

# 402. SETTINGS LIVE TEST

Toggle:

* Lead Push
* Lead SMS
* Visit Push
* Marketing Email
* Show Name
* Theme.

Reload on:

* mobile
* desktop.

Verify persistence.

Check public Listing with Show Name off.

Verify no name leak in:

* UI
* HTML
* API
* schema metadata.

---

# 403. ROLE CHANGE LIVE TEST

Owner requests Broker Role.

Verify:

* warning
* reason required
* one request
* no immediate Role change
* current Dashboard remains Owner
* compatible Listings remain live during review
* Pending screen
* Withdraw.

Repeat:

Admin approves valid request.

Verify:

* Role
* Subscription policy
* verification requirement
* Dashboard route
* Audit
* Notification.

---

# 404. DATA EXPORT LIVE TEST

Send OTP
→ verify Rate Limit
→ wrong OTP
→ correct OTP
→ Request Export twice.

Expected:

one valid active job according to policy.

Process job.

Verify:

* correct User data
* no foreign User private data
* signed Download URL
* expiry
* access log.

---

# 405. ACCOUNT DELETE LIVE TEST

Open Delete Account
→ confirmation
→ type wrong text
→ blocked
→ type DELETE
→ wrong OTP
→ blocked
→ correct OTP
→ request enters 30-day grace
→ public behavior according to policy
→ cancel during grace
→ account restored according to policy.

Then separate test:

allow grace to complete in controlled test environment
→ run deletion orchestration
→ verify public Listing removal
→ legal financial retention
→ Message integrity
→ final status.

---

# 406. RLS CROSS-ACCOUNT TEST

Use Owner A and Owner B.

Attempt cross-account:

* Listing edit
* Requirement edit
* Lead Detail
* Message Thread
* Site Visit
* Saved records
* Analytics
* Invoice
* Verification doc
* Ticket
* Role Change
* Export archive.

Every unauthorised attempt must fail server-side.

---

# 407. CURRENT REPOSITORY RECONCILIATION — OVERVIEW

Preserve:

* Owner authentication
* parallel data foundation
* real Lead counts
* real Site Visit data
* real Billing data
* skeleton component
* Recent Leads foundation
* mobile Drawer
* exact five-item bottom navigation.

Correct:

* Sidebar dimensions
* desktop Sidebar composition
* mobile root title
* User City in Drawer
* decorative Search
* inconsistent nav badges
* Active Listing total bug
* Pending Review helper
* not-contacted count semantics
* Plan usage semantics
* relative Lead time/source density.

---

# 408. CURRENT REPOSITORY RECONCILIATION — PROPERTIES

Preserve:

* Property actions
* real status foundation
* real Lead count
* Pause/Resume
* Soft Delete
* Relist
* mobile overflow
* confirmation component.

Correct:

* first-100 limitation
* complete counts
* Draft Resume placement
* private Pending View
* deletion copy/data policy
* exact source visual match.

---

# 409. CURRENT REPOSITORY RECONCILIATION — REQUIREMENTS

Preserve:

* real Requirements
* real Proposal counts
* View Proposals
* Edit
* Close/Reopen action foundation.

Correct:

* first-100 limitation
* Paused vs Closed presentation
* generic updated_at used as closed date
* Reopen validation
* multi-Locality summary.

---

# 410. CURRENT REPOSITORY RECONCILIATION — LEADS

Preserve:

* real Leads
* CRM stages
* tabs
* desktop/mobile shared dataset
* participant checks.

Correct:

* first-100 filtering/counts
* N+1 Lead enrichment
* Retry action
* exact Empty action
* desktop Drawer
* mobile full-page presentation.

---

# 411. CURRENT REPOSITORY RECONCILIATION — MESSAGES

Preserve:

* real Thread records
* participant checks
* real Messages
* unread foundation
* pagination action
* Notification creation.

Correct:

* Thread-list N+1
* missing time presentation
* dedicated Thread route
* desktop two-pane
* mobile Thread Detail
* safety banner presentation
* correct Notification deep link
* deeper Batch 9 capabilities.

---

# 412. CURRENT REPOSITORY RECONCILIATION — SITE VISITS

Preserve:

* real Site Visit table
* participant checks
* transition helper
* Accept/Reject foundation
* Reschedule
* Cancel
* complete/no-show
* CRM events
* in-app Notifications.

Correct:

* disabled nav
* missing Owner route
* missing requested Date/Time
* missing rejection reason
* unbounded list
* missing display enrichment
* exact List
* Reject dialog
* mobile Detail
* map/directions fallback
* multi-write atomicity.

---

# 413. CURRENT REPOSITORY RECONCILIATION — SAVED

Preserve:

* Saved Item backend
* Saved Search backend
* Recently Viewed backend
* batched entity enrichment
* Clear History foundation.

Correct:

* Saved page only showing one system
* exact Saved cards
* Saved Searches UI
* real new-match counts
* Recently Viewed strip/empty behavior
* pagination.

---

# 414. CURRENT REPOSITORY RECONCILIATION — ANALYTICS

Current required Owner Analytics navigation is disabled.

Build:

* route
* populated real state
* insufficient-data state
* Provider Setup Required state.

Never fake analytics.

---

# 415. CURRENT REPOSITORY RECONCILIATION — BILLING

Preserve:

* Subscription backend
* Trial backend
* Payment truth
* Invoice records
* Usage foundation
* Razorpay verification architecture.

Correct:

* generic presentation
* feature meter semantics
* Invoice table→card
* Invoice Detail
* PDF/Print
* in-Dashboard Plan comparison
* complete Batch 10 Checkout flow.

---

# 416. CURRENT REPOSITORY RECONCILIATION — VERIFICATION

Current:

status-only panel

* submission unavailable.

Required:

full Upload/Timeline/Reject/Resubmit flow.

---

# 417. CURRENT REPOSITORY RECONCILIATION — PROFILE

Current:

read-only profile

* Coming Soon Edit.

Required:

complete editable Batch 6 Profile.

---

# 418. CURRENT REPOSITORY RECONCILIATION — NOTIFICATIONS

Preserve:

* DB notifications
* unread state
* Mark Read
* Mark All Read.

Correct:

* Today/Earlier grouping
* pagination
* exact presentation
* complete deep-link map
* Message Thread routing bug.

---

# 419. CURRENT REPOSITORY RECONCILIATION — SUPPORT

Current public static Support page is insufficient.

Build:

* Owner Dashboard Support
* FAQ
* Ticket creation
* Ticket list
* Ticket states
* Detail Thread
* Admin queue integration.

---

# 420. CURRENT REPOSITORY RECONCILIATION — SETTINGS

Current Owner Settings navigation is disabled.

Build complete Settings.

---

# 421. CURRENT REPOSITORY RECONCILIATION — ROLE CHANGE

Current expected route is missing.

Build:

* request
* Pending
* Withdraw
* Admin queue
* approval migration.

---

# 422. CURRENT REPOSITORY RECONCILIATION — DATA EXPORT/DELETE

Current expected route is missing.

Build:

* OTP identity confirmation
* Export job
* secure Download
* Delete request
* DELETE confirmation
* 30-day grace
* cancellation
* deletion orchestration.

---

# 423. COMPLETION BLOCKERS

Batch 6 must not be marked complete while any of the following remain:

* Sidebar dimensions conflict with Batch 1
* mobile root Header says Overview instead of Dashboard
* mobile Drawer lacks real City
* visible Search is decorative
* nav badges disappear across subpages
* Site Visits disabled
* Analytics disabled
* Settings disabled
* Recently Viewed disabled
* required module uses `href="#"`,
* Active Listings counts all Properties
* Pending Review helper missing
* Not Contacted count uses broad Open Leads
* Plan Usage uses incorrect generic usage semantics
* Properties count/filter limited to first 100
* Requirements limited to first 100
* Leads limited to first 100
* Lead enrichment N+1
* Lead error has no Retry
* desktop Lead Detail is not 480px Drawer
* mobile Lead Detail lacks contextual Back
* Message Thread list links to Lead Detail instead of Thread Detail
* Messages desktop two-pane missing
* Messages Thread Detail source UI missing
* Thread list N+1 remains
* Site Visit request lacks Date/Time
* Site Visit Reject lacks required reason handling
* Site Visit List unbounded
* Site Visit Detail missing
* Saved page omits Saved Searches
* Saved page omits Recently Viewed
* Analytics route missing
* Analytics fake values used
* Billing meter semantics incorrect
* Invoice PDF unavailable
* Invoice Detail missing
* Owner Pricing comparison missing
* Verification is status-only
* Verification upload unavailable
* Verification rejection reason/resubmit missing
* Profile Edit is Coming Soon
* avatar crop/upload missing
* Notification deep links incomplete
* Message Thread Notification routes using Thread ID as Lead ID
* Support is static public page only
* Ticket system missing
* Settings route missing
* Settings toggles not persisted
* Privacy setting leaks name
* Role Change request missing
* Role Change Pending state missing
* Withdraw missing
* Account Data route missing
* Export request missing
* secure Export job missing
* Account Delete double guard missing
* OTP re-verification missing
* 30-day grace/cancel missing
* lists are unbounded or fake-complete
* cross-user RLS denial not verified
* provider-backed feature shows fake success
* mobile tables do not transform
* sticky elements overlap
* keyboard hides Message input
* visible control is dead
* authenticated desktop/tablet/mobile browser verification is not completed.

---

# 424. FINAL ACCEPTANCE STATEMENT

**Design Batch 6 — Owner Dashboard is complete only when the entire Owner operating experience works as one connected, exact, secure and responsive system.**

Completion requires:

* exact Owner desktop shell
* exact 240px/64px Sidebar behavior
* exact desktop module order
* exact mobile Drawer
* correct User City
* exact five-item mobile bottom navigation
* correct mobile root Header
* contextual Headers on inner screens
* functional Dashboard Search
* consistent real badges
* timezone-correct greeting
* accurate Active Listing count
* accurate Pending count
* accurate Lead counts
* accurate Site Visit count
* correct Plan Usage semantics
* skeleton Overview
* real Recent Leads
* scalable Properties
* complete status Tabs
* Draft Resume
* Live/Pending/Paused/Expired actions
* private Pending Preview
* Edit/Reapproval
* safe Delete flow
* scalable Requirements
* Active/Closed states
* real Proposal counts
* Close/Reopen
* scalable Leads
* desktop Lead Table
* mobile Lead Cards
* Loading/Empty/Error/Retry
* 480px desktop Lead Drawer
* mobile Lead full page
* privacy-safe contact handling
* Call
* Message
* Status transitions
* Notes
* Timeline
* Follow-up
* Site Visit scheduling
* dedicated Messages Thread List
* dedicated Thread Detail
* desktop two-pane Messages
* mobile sticky composer
* safety banner
* real unread/read states
* no Thread N+1
* active Site Visit module
* Upcoming/Past/Calendar
* requested Date/Time
* Accept
* Reschedule
* Reject confirmation
* rejection reason where required
* mobile Visit Detail
* map fallback
* Directions
* private address
* Saved Properties
* Saved Projects
* Saved Searches
* real match counts
* alert preferences
* Recently Viewed
* real Analytics
* 14-day Chart
* Lead Source breakdown
* insufficient-data state
* Provider Setup Required
* real Subscription
* Trial countdown
* correct Listings meter
* correct Featured Slots meter
* Invoices table→card
* printable Invoice Detail
* real PDF
* Plan comparison
* Batch 10 Checkout truth
* Verification upload
* private documents
* Verification timeline
* real rejection reason
* Resubmit
* editable Profile
* avatar upload/crop
* verified mobile lock
* Notification grouping
* correct deep links
* Notification pagination
* FAQ
* Support Ticket create/list/detail
* real Ticket statuses
* Notification preferences
* privacy preference
* Appearance preference
* localization state
* Danger Zone
* Role Change request
* Pending state
* Withdraw
* Admin review integration
* Subscription migration handling
* Data Export
* OTP re-verification
* secure asynchronous Export
* private signed Download
* Account Deletion request
* type `DELETE`
* 30-day grace
* cancellation
* legal-retention-aware deletion
* complete RLS
* pagination
* N+1 removal
* transaction safety
* idempotency
* loading states
* empty states
* error states
* Provider honesty
* exact desktop rendering
* exact tablet behavior
* exact 390px mobile behavior
* no horizontal overflow
* no dead control
* no wrong deep link
* no privacy leak
* complete authenticated live regression.

Required implementation sequence:

**Owner Shell Reconciliation → Overview Data Corrections → My Properties Pagination/Actions/Draft Resume → My Requirements State Corrections → Leads Pagination and N+1 Removal → Lead Drawer/Mobile Detail → Dedicated Messages Architecture → Site Visits Module → Saved Searches and Recently Viewed Wiring → Analytics → Owner Billing Presentation on Batch 10 Logic → Verification Upload Workflow → Profile Edit → Notification Routing/Grouping → Dashboard Support Tickets → Settings → Role Change → Data Export → Account Deletion → RLS/Transaction Audit → complete authenticated responsive regression.**

No Batch 6 screen passes merely because a page route renders.

**Exact Design + Real Data + Correct Counts + Complete Actions + Privacy + RLS + State Integrity + Transaction Safety + Responsive Behavior + No Dead UI + Provider Honesty + Live Multi-Device Verification must all pass.**
