# BATCH_DOCUMENT_04_DESIGN_BATCH_07_BROKER_DASHBOARD_FULL_SPEC.md

# My Gujarat Property

## Batch Document 04

## Design Batch 7 — Complete Broker Dashboard

---

# 1. DOCUMENT PURPOSE

This document is the complete implementation, design, functionality, responsive behavior, backend integration, database, permission, security, privacy, persistence, production-readiness and live-verification specification for:

**My Gujarat Property · Design Batch 7 — Broker Dashboard**

Batch 7 defines the complete Broker dashboard experience.

It includes:

1. Broker Overview / Dashboard Home
2. My Properties — Broker-specific Featured delta
3. Post Property Entry + Continue Draft
4. My Requirements — Broker `For client` delta
5. Requirement Feed
6. Sent Proposals List
7. Proposal Detail
8. Send Proposal Flow
9. Leads / CRM List View
10. Leads / CRM Kanban View
11. CRM Lead Detail
12. Messages
13. Site Visits
14. Saved Items and Saved Searches
15. Analytics — Conversion Funnel and Listing Ranking
16. Broker Billing Plan and Usage
17. Invoices and Invoice Detail
18. Broker Verification
19. Broker Profile Edit
20. Notifications Center
21. Support / Help
22. Settings

The Batch also defines:

* desktop shell,
* Broker navigation,
* mobile dashboard behavior,
* mobile drawer,
* dashboard counts,
* status badges,
* filter pills,
* requirement matching,
* service-area scoping,
* match indicators,
* Send Proposal state,
* proposal lifecycle,
* duplicate proposal protection,
* CRM filters,
* bulk CRM actions,
* CSV export,
* Kanban drag/drop,
* touch-device fallback,
* follow-up reminders,
* linked Proposal and Listing records,
* CRM timeline,
* conversion analytics,
* listing-performance analytics,
* Broker plan limits,
* Broker verification documents,
* service areas,
* Requirement Feed alert preferences.

Nothing shown or instructed in Design Batch 7 may be skipped.

The exact design source must be read directly from:

`/newdesign/`

Use the actual Batch 7 HTML file inside that directory.

Do not implement from:

* old Broker dashboard,
* Owner dashboard with renamed labels,
* memory,
* current incomplete implementation,
* generic CRM templates,
* generic Kanban templates,
* assumptions.

---

# 2. ABSOLUTE BROKER DASHBOARD REBUILD RULE

The current Broker dashboard visual architecture must be completely removed or replaced where it conflicts with Batch 7.

The final design must not contain a mixture of:

* current generic Broker stat cards,
* current generic Action Card grid,
* previous dashboard header,
* previous sidebar,
* current incomplete Broker navigation,
* old lead management UI,
* old proposals UI,
* old requirement listing UI,
* old analytics UI,
* old billing UI,
* old verification UI,
* legacy mobile dashboard navigation.

The final Browser output must show the Batch 7 architecture only.

Do not place new Batch 7 sections below the current generic dashboard home.

Do not keep:

* generic Properties / Requirements / Leads / Proposals stat grid if Batch 7 shows different metrics,
* generic action card dashboard home,
* legacy Account Status card if not present in the Batch 7 target screen,
* missing Broker-specific feed/proposal/CRM navigation.

The correct rule is:

**Delete the conflicting current Broker dashboard presentation layer and rebuild from the Batch 7 design source.**

---

# 3. BACKEND PRESERVATION RULE

UI deletion does not mean blindly deleting secure production backend functionality.

Compatible backend systems may be preserved, extended or repaired, including:

* Supabase Auth,
* profile data,
* Broker role checks,
* Property CRUD,
* Requirement CRUD,
* Lead records,
* Proposal records,
* CRM events,
* follow-ups,
* messages,
* site visits,
* saved items,
* notifications,
* billing,
* subscriptions,
* invoices,
* verification,
* support tickets,
* RLS,
* server actions.

Existing functionality may be retained only when it correctly supports the final Batch 7 behavior.

If current backend behavior conflicts with Batch 7:

repair the backend.

Do not alter the design to hide backend limitations.

---

# 4. DESIGN AUTHORITY

Batch 7 is authoritative for:

* Broker sidebar structure,
* Overview cards,
* Overview activity feed,
* Broker Property row delta,
* Post Property entry card,
* Requirement Feed,
* Proposal screens,
* CRM List,
* CRM Kanban,
* Lead Detail additions,
* Broker Analytics,
* Broker Billing,
* Broker Verification,
* Broker Profile,
* Broker notification additions,
* Broker support FAQ additions,
* Broker Requirement Feed settings.

For screens explicitly marked as reused from Batch 6:

reuse the **exact Batch 6 pattern and behavior**, not the old implementation.

The reuse statement means:

* same structure,
* same responsive transformation,
* same state handling,
* same interaction behavior,

with only the Broker-specific data/context changes defined in Batch 7.

---

# 5. BATCH 7 SCREEN INVENTORY

The exact Batch 7 implementation scope is:

## Screen 1

Broker Overview / Dashboard Home

## Screen 2

My Properties — Featured delta

## Screen 3

Post Property Wizard Entry + Continue Draft

## Screen 4

My Requirements — `For client` delta

## Screen 5

Requirement Feed

* 5A Populated Feed
* 5B Empty State
* mobile card stack
* filter bottom sheet

## Screen 6

Sent Proposals List

## Screen 7

Proposal Detail

## Screen 8

Send Proposal

* desktop modal
* mobile bottom sheet
* duplicate-submit protection

## Screen 9

CRM List View

* filters,
* bulk selection,
* Change Status,
* Export CSV,
* Delete,
* mobile long-press selection.

## Screen 10

CRM Kanban

* 5 stages,
* drag/drop,
* hover detail,
* drop target,
* Move to Stage menu,
* touch fallback.

## Screen 11

CRM Lead Detail

* desktop drawer,
* mobile full page,
* follow-up scheduler,
* linked records,
* timeline.

## Screens 12–14

Reused from Batch 6:

* Messages,
* Site Visits,
* Saved Items / Saved Searches.

## Screen 15

Broker Analytics

* Conversion Funnel
* Listing Performance Ranking

## Screen 16

Broker Plan + Usage

## Screen 17

Invoices + Invoice Detail

## Screen 18

Broker Verification

## Screen 19

Broker Profile Edit

## Screen 20

Notifications Center

## Screen 21

Support / Help

## Screen 22

Settings

All must be implemented.

---

# 6. IMPLEMENTATION ORDER

Implement Batch 7 in this exact sequence:

1. Screen 1 — Broker Overview and shared shell
2. Screen 2 — My Properties Broker delta
3. Screen 3 — Post Property entry/draft
4. Screen 4 — My Requirements Broker delta
5. Screen 5 — Requirement Feed
6. Screen 6 — Proposals Sent List
7. Screen 7 — Proposal Detail
8. Screen 8 — Send Proposal
9. Screen 9 — CRM List
10. Screen 10 — CRM Kanban
11. Screen 11 — CRM Lead Detail
12. Screen 12 — Messages
13. Screen 13 — Site Visits
14. Screen 14 — Saved
15. Screen 15 — Analytics
16. Screen 16 — Billing
17. Screen 17 — Invoices
18. Screen 18 — Verification
19. Screen 19 — Profile
20. Screen 20 — Notifications
21. Screen 21 — Support
22. Screen 22 — Settings
23. Complete connected Broker regression test.

Do not implement all screens as one giant unverified change.

---

# 7. BROKER ROLE SCOPE

All Broker dashboard routes must require:

* authenticated user,
* Broker role,
* valid account state according to the relevant action,
* ownership/participation authorization.

Examples:

Broker may manage only:

* their own Properties,
* their own Requirements,
* their own sent Proposals,
* their own CRM Leads,
* message threads where they are a participant,
* Site Visits where they are a valid participant/host,
* their own saved data,
* their own billing,
* their own verification,
* their own profile.

Changing an ID in:

* URL,
* request body,
* hidden field,
* client state

must not allow access to another Broker's data.

---

# 8. SHARED BROKER DESKTOP SHELL

Screen 1A is the Broker desktop shell authority.

The shell follows the Batch 6 dashboard grammar but uses the Broker-specific navigation.

It includes:

* Broker sidebar,
* dashboard top bar,
* dashboard main content,
* search,
* profile identity,
* notification access.

Do not use the current generic Broker dashboard layout.

---

# 9. BROKER SIDEBAR NAVIGATION

The Batch 7 Overview source shows the Broker navigation architecture.

Core navigation includes:

* Overview
* My Properties
* My Requirements
* Requirement Feed
* Proposals
* Leads / CRM
* Messages
* Site Visits
* Analytics
* Billing
* Settings

Other module routes such as:

* Verification,
* Profile,
* Support

must remain accessible according to the complete dashboard navigation architecture and Batch screens.

Do not add unrelated sidebar items that are absent from the final design simply because current code has them.

For example:

Notifications Center may be accessed through the notification control rather than requiring a sidebar item if the source design does so.

Public Profile may be accessed from the profile/settings area rather than forcing an extra primary sidebar item if not shown in Batch 7.

The final visible navigation must match Batch 7 exactly.

---

# 10. MOBILE BROKER DASHBOARD RULE

Mobile Broker dashboard behavior follows Batch 6 Owner mobile shell architecture with Broker navigation/data.

Exact bottom navigation remains:

1. Home
2. Search
3. Post
4. Leads
5. Profile

This cannot change.

The full Broker module list remains in the mobile drawer.

Do not add:

* Requirement Feed,
* Proposals,
* Messages

as extra bottom-nav items.

They belong in the full navigation/drawer.

---

# 11. MOBILE DRAWER

Mobile drawer must use the Batch 6 drawer interaction pattern with Broker navigation.

Requirements:

* slides correctly,
* dimmed overlay,
* background scroll handling,
* outside tap closes,
* internal tap does not accidentally close,
* active item state,
* real count badges,
* logout works,
* no dead links.

Broker-specific modules must include the Batch 7 architecture, particularly:

* Requirement Feed,
* Proposals,
* Leads / CRM.

---

# 12. REFERENCE BROKER PROFILE

For accurate Batch 7 verification, create a persistent Broker reference profile.

Reference:

`Nilesh Mehta`

Initials:

`NM`

Role:

`Broker`

Agency:

`Mehta Estates`

Service areas:

* Rajkot
* Morbi
* Jamnagar

Reference bio:

`Helping families find homes across Rajkot and Saurashtra since 2014. Residential + commercial.`

Use real database records.

Do not hard-code the profile into production components.

Do not delete reference data automatically after verification.

---

# 13. SCREEN 1 — BROKER OVERVIEW

Screen 1A defines the full desktop Broker dashboard Overview.

The mobile version reuses Batch 6 Overview mobile structure using Broker data and Broker drawer.

---

# 14. SCREEN 1A — DESKTOP OVERVIEW

Sidebar reference data includes:

* My Properties — 14
* Requirement Feed — 6
* Leads / CRM — 5

These numbers are reference fixture values.

Production counts must be real.

Profile:

`NM`

`Nilesh Mehta`

`Broker · Mehta Estates`

Main heading:

`Good morning, Nilesh`

Subtext:

`6 new requirements match your service areas.`

Action:

`Post Property`

---

# 15. GREETING

Greeting must use:

* actual Broker first name,
* correct user-local timezone.

Do not use server runtime timezone blindly.

Do not hard-code `Nilesh`.

---

# 16. MATCHING REQUIREMENT OVERVIEW MESSAGE

Reference:

`6 new requirements match your service areas.`

This message must come from the same real Requirement Feed matching system used by Screen 5.

Do not:

* calculate from all public requirements,
* use a hard-coded number,
* show requirements outside Broker service areas.

The count must represent actual new matches according to the Feed's match/read logic.

---

# 17. OVERVIEW STAT CARDS

Reference stat cards:

### Active Listings

Secondary:

`2 featured`

### New Leads This Week

`19`

Secondary:

`5 not yet contacted`

### Proposals Sent

`8`

Secondary:

`this month`

### Site Visits

`2 shortlisted`

Reference context also includes:

`3 upcoming`

`next: Sat 11 AM`

All values must be real.

---

# 18. ACTIVE LISTINGS METRIC

Use actual active Broker listing count.

Do not include:

* draft,
* rejected,
* paused,
* expired,
* deleted.

Featured count must use actual active featured/boost state.

Do not infer Featured from listing popularity.

---

# 19. LEADS THIS WEEK

Use actual lead timestamps and statuses.

Secondary count:

`not yet contacted`

must be based on real CRM stage/state.

Do not infer it only because the lead is recent.

---

# 20. PROPOSALS SENT THIS MONTH

Use real Proposal data.

Count according to actual creation date within the active reporting month.

Do not count:

* drafts if proposal drafts exist,
* deleted/archived records outside product definition.

---

# 21. SITE VISIT OVERVIEW

Site Visit metrics must use actual visit states.

Reference concepts:

* shortlisted/qualified context,
* upcoming count,
* next appointment time.

Do not create fake scheduled visits.

If no visits exist:

use honest zero/empty state according to Batch system.

---

# 22. RECENT ACTIVITY FEED

Heading:

`Recent activity`

Action:

`View all`

Reference events:

### New Matching Requirement

`New matching requirement: 3 BHK buy, Satellite, ₹60–90L`

`35 min ago · opens Requirement Feed`

### Proposal Viewed

`Your proposal was viewed by Rajesh P. (3 BHK requirement)`

`2 hrs ago · opens Proposal Detail`

### Site Visit Confirmed

`Site visit confirmed: Meera P. · Sat 5 Jul, 11:00 AM`

`Yesterday · opens Site Visit Detail`

---

# 23. ACTIVITY FEED FUNCTIONALITY

Activity feed must be driven by real:

* Requirement match events,
* Proposal status events,
* Site Visit events,
* notifications/CRM events.

Each item must have a typed click-through target.

Do not route every event to the dashboard home.

---

# 24. OVERVIEW SKELETON

The Overview stat skeleton follows Batch 6 Screen 1B.

Use the same visual dimensions.

Do not flash zeros or reference fixture values while loading.

---

# 25. MOBILE OVERVIEW

Reuse Batch 6 Screen 1C structure.

Replace Owner data with Broker-relevant data.

Keep:

* root dashboard header,
* no back button,
* compact stats,
* recent activity/leads according to Batch 7 mobile target,
* exact five-item bottom navigation,
* Broker drawer.

Do not create a separate visually inconsistent mobile Broker shell.

---

# 26. SCREEN 2 — MY PROPERTIES BROKER DELTA

Screen 2 reuses Batch 6 My Properties structure.

Broker-specific delta:

**Featured chip/state.**

Reference property:

`FEATURED`

`3 BHK Apartment, Silver Heights`

Status:

`Live`

Details:

`₹68 L · Kalawad Road, Rajkot · 21 leads · featured until 18 Jul`

Actions:

* View
* Edit
* Delete

---

# 27. FEATURED STATE

Featured status must come from real promotion/boost data.

Required data:

* active promotion,
* start date,
* expiry date,
* target listing.

Do not show Featured based on:

* manual boolean without payment/approval state,
* high lead count,
* reference fixture only.

---

# 28. FEATURED EXPIRY

Reference:

`featured until 18 Jul`

Use actual end date.

If expired:

remove active Featured chip according to product state.

Do not continue showing expired promotion.

---

# 29. BROKER PROPERTY ACTIONS

Screen 2 uses the Batch 6 property management behavior.

Required:

* View
* Edit
* Pause/Resume where state requires
* Delete with confirmation
* status filters
* loading
* empty
* error
* pagination
* mobile overflow.

Do not implement only the one Featured sample row.

---

# 30. MY PROPERTIES COUNT ACCURACY

Do not calculate:

* total,
* Live,
* Pending,
* Rejected,
* Paused,
* Expired

from one fetched page.

Use real aggregate counts.

---

# 31. SCREEN 3 — POST PROPERTY ENTRY CARD

Screen 3 is not a new Property Wizard design.

The actual Property Wizard remains Batch 5 authority.

Batch 7 defines the Broker entry and draft-resume surface.

Reference:

`Post a new property`

Reference supporting line:

wizard duration/usage summary.

Reference usage:

`11 of 25 listings used`

Action:

`Start`

Draft:

`Draft: 2 BHK Flat, Mavdi`

Reference draft progress:

`Step 3 ... photos pending · saved 2 hrs ago`

Actions:

* Continue Draft
* Discard…

---

# 32. CROSS-BATCH WIZARD STEP AUTHORITY

The canonical Property Wizard step structure comes from Design Batch 5.

Batch 5 defines the actual final Property Wizard step count and flow.

Therefore:

* use the exact Batch 5 canonical step registry,
* do not create a separate 5-step Broker wizard,
* do not duplicate wizard logic,
* bind draft progress to the canonical Batch 5 steps.

The Batch 7 entry-card layout must remain exact, but its progress text must be generated from the real canonical wizard state.

If the canonical Batch 5 Property Wizard has 9 steps:

show real progress such as:

`Step 3 of 9`

rather than hard-coding an inconsistent total.

---

# 33. LISTING USAGE

Reference:

`11 of 25 listings used`

Use actual:

* subscription plan limit,
* usage state.

Do not calculate usage from current paginated property rows.

---

# 34. START ACTION

`Start` opens:

Batch 5 Broker-compatible Post Property Wizard.

Server must verify:

* Broker role,
* account state,
* billing/listing limit.

If limit reached:

show correct billing/upgrade behavior.

Do not create a draft before the user meaningfully starts if that causes abandoned duplicate drafts.

---

# 35. CONTINUE DRAFT

Must:

* open the correct draft,
* restore wizard step,
* restore values,
* restore media,
* preserve last save state.

No fake draft progress.

---

# 36. DISCARD DRAFT

`Discard…`

must open standard confirmation dialog.

Required:

* confirm target draft,
* ownership check,
* safe deletion/archival,
* media handling according to storage policy.

Do not immediately delete on first click.

---

# 37. SCREEN 4 — MY REQUIREMENTS BROKER DELTA

Screen 4 reuses Batch 6 My Requirements.

Broker-specific behavior:

Broker may post a Requirement on behalf of a client.

The card adds:

`For client`

tag when applicable.

---

# 38. FOR CLIENT DATA MODEL

`For client` must be an actual structured Requirement attribute.

Do not detect it by title text.

Store according to the final model, such as:

* requester context,
* posted_for_client boolean,
* privacy-safe client reference where allowed.

Do not store unnecessary private client identity publicly.

---

# 39. BROKER REQUIREMENT ACTIONS

Use the Batch 6 Requirement pattern:

* View Proposals
* Edit
* Close
* Reopen
* status handling
* empty state.

Broker ownership and client context must be enforced server-side.

---

# 40. SCREEN 5 — REQUIREMENT FEED

Requirement Feed is a major Broker-only Batch 7 module.

It displays matching open Requirements from Owners within Broker service areas.

The Feed is not a generic list of every public Requirement.

---

# 41. REQUIREMENT FEED SERVICE-AREA SCOPE

Batch 7 explicitly states:

**Feed is scoped to the Broker's service areas.**

Reference Profile service areas:

* Rajkot
* Morbi
* Jamnagar

The Feed query must use these actual service-area settings.

Current behavior that returns all open public requirements is insufficient.

Required fix:

* load Broker service areas,
* match Requirement city/locality scope,
* apply authorized visibility rules,
* exclude deleted/inactive Requirements,
* return bounded/paginated results.

---

# 42. FEED FILTERS

Reference controls:

* Rajkot
* Budget
* Type
* Buy / Rent

These controls must work.

---

## 42.1 CITY FILTER

Must filter within Broker service-area scope.

A Broker must not use the filter UI to bypass server-side Feed scope.

---

## 42.2 BUDGET FILTER

Apply actual budget overlap/matching logic.

Do not compare formatted display strings.

Use canonical numeric values.

---

## 42.3 TYPE FILTER

Filter by actual Requirement/property category/type.

---

## 42.4 BUY/RENT FILTER

Map actual Requirement intent values.

Do not rely on title parsing.

---

# 43. REQUIREMENT FEED CARD 1

Reference identity:

`RP`

Heading:

`Buy: 3 BHK apartment`

Match indicator:

`Matches 3 of your listings`

Budget/location:

`₹60L–₹90L · Kalawad Road / University Road, Rajkot · move-in 3–6 months`

Chips:

* 3 BHK
* Apartment
* Semi-furnished ok

Metadata:

`posted 35 min ago by Owner`

Action:

`Send Proposal`

---

# 44. REAL MATCH COUNT

`Matches 3 of your listings`

must be calculated from actual Broker listings.

Matching should evaluate relevant structured fields, such as:

* service area/location,
* purpose,
* property type,
* BHK,
* budget overlap,
* mandatory specifications.

Do not fake match count.

---

# 45. TRANSPARENT MATCHING

Match reason must remain understandable.

Do not use opaque AI claims without explainable criteria.

Where possible:

show actual match indicators based on structured data.

Examples:

* budget matches,
* area matches,
* BHK matches.

---

# 46. REQUIREMENT FEED CARD 2

Reference:

`SB`

`Rent: 2 BHK near 150 Feet Ring Road`

`₹18k–₹25k/mo · family · immediate move-in`

Chips:

* 2 BHK
* Furnished preferred

Metadata:

`posted 4 hrs ago by Owner`

Action:

`Hide`

---

# 47. HIDE REQUIREMENT

`Hide` must persist a Broker-specific preference.

It must not:

* close Requirement globally,
* modify Owner's Requirement,
* remove it for other Brokers.

Use Broker-specific hidden Feed state.

The Broker should be able to restore/manage hidden Requirements if product flow provides that later.

---

# 48. REQUIREMENT FEED CARD 3 — PROPOSAL SENT

Reference:

`KT`

`Buy: commercial shop, Yogi Chowk area`

Badge:

`Proposal sent`

Details:

`₹40L–₹60L · you proposed "Shop, Yogi Chowk" yesterday`

Action:

`View proposal`

The Feed must detect actual existing active Proposal.

Do not allow duplicate Send Proposal UI when an active proposal already exists.

---

# 49. VIEW PROPOSAL

Open the exact Proposal Detail for the Requirement and Broker.

Do not use the first Proposal record found.

Use correct participant authorization.

---

# 50. SCREEN 5B — REQUIREMENT FEED EMPTY STATE

Reference:

`No matching requirements right now`

`New requirements in your service areas appear here automatically. Widen your areas to see more.`

Action:

`Edit service areas`

This action must open Broker Profile service-area editing.

Do not route to generic account settings.

---

# 51. REQUIREMENT FEED MOBILE

Mobile behavior:

* contextual header with back,
* full-width stacked Requirement cards,
* filters open the standard filter bottom sheet,
* same real dataset,
* same proposal states.

Do not squeeze desktop filter row into mobile.

---

# 52. REQUIREMENT FEED PAGINATION

Use scalable pagination/cursor loading.

Do not load every matching Requirement forever.

New-match count must remain accurate independent of current page.

---

# 53. REQUIREMENT FEED READ/NEW STATE

The Overview says:

`6 new requirements`

Therefore the system needs a real definition of `new`.

Possible architecture:

* last Feed viewed timestamp,
* per-Broker requirement seen state.

Do not use total Feed count as new count.

Persist seen state.

---

# 54. SCREENS 6–8 — PROPOSALS

Batch 7 Proposal system contains:

* Sent List,
* Proposal Detail,
* Send Proposal.

All three must work together.

---

# 55. SCREEN 6 — SENT PROPOSALS LIST

Status tabs:

* Sent (8)
* Viewed (4)
* Shortlisted (2)
* Accepted (1)
* Rejected (1)

Counts must be real.

Do not derive counts from one page.

---

# 56. PROPOSAL LIST ITEM 1

Reference:

`3 BHK, Silver Heights → Rajesh P.'s requirement`

Metadata:

`Sent 2 Jul · ₹68 L vs budget ₹60–90L`

Status:

`Viewed`

Required relationships:

* Proposal,
* proposed listing,
* Requirement,
* recipient safe identity.

---

# 57. PROPOSAL LIST ITEM 2

Reference:

`Shop, Yogi Chowk → Kartik T.'s requirement`

Metadata:

`Sent yesterday · ₹48 L vs budget ₹40–60L`

Status:

`Shortlisted`

---

# 58. PROPOSAL LIST ITEM 3

Reference:

`2 BHK, Mavdi → Sunita B.'s requirement`

Metadata:

`Sent 28 Jun · reason: "location too far from schools"`

Status:

`Rejected`

Rejection reason must come from actual Proposal status history/recipient feedback if provided.

Do not invent a reason.

---

# 59. PROPOSAL EMPTY STATE

Reference:

`No proposals yet`

`Browse the Requirement Feed and propose a matching listing.`

Action:

`Open Requirement Feed`

Must route correctly.

---

# 60. PROPOSAL DATA MODEL REQUIREMENT

Batch 7 Proposal design requires an explicit relationship between:

* Proposal,
* Requirement,
* proposed Property listing.

The Send Proposal flow allows:

`Choose listing to propose`.

Therefore the Proposal model must persist the selected listing ID.

Current behavior that stores a Proposal against only the Requirement without a proposed-listing relationship is insufficient.

Required:

* `proposed_property_id` or equivalent safe polymorphic proposal target model,
* Broker ownership validation,
* active/public eligible listing validation.

Do not store only listing title inside free text.

---

# 61. PROPOSAL LIST ENRICHMENT

Proposal list must efficiently return:

* Proposal status,
* sent time,
* Requirement summary,
* recipient safe name,
* proposed listing summary,
* listing price,
* Requirement budget.

Avoid N+1 queries.

Do not make separate sequential calls for every list item.

---

# 62. SCREEN 7 — PROPOSAL DETAIL

Reference heading:

`Proposal to Rajesh P.`

Timestamp:

`Sent 2 Jul 2026, 10:14 AM`

State:

`Viewed by owner`

---

# 63. THEIR REQUIREMENT SECTION

Reference:

`THEIR REQUIREMENT`

`Buy: 3 BHK apartment`

`₹60L–₹90L · Kalawad / University Road, Rajkot · move-in 3–6 months`

Use real Requirement public/participant-safe data.

---

# 64. YOUR PROPOSED LISTING SECTION

Reference:

`YOUR PROPOSED LISTING`

`₹68 L`

`3 BHK, Silver Heights · Kalawad Road`

Use the actual linked Property.

---

# 65. YOUR MESSAGE SECTION

Reference:

`YOUR MESSAGE`

`Namaste Rajesh bhai — this 3 BHK on Kalawad Road fits your budget and preferred area. East-facing, society with covered parking. Happy to arrange a visit this weekend.`

Render actual Proposal message.

Sanitize safely.

---

# 66. PROPOSAL STATUS TIMELINE

Reference:

`STATUS TIMELINE`

### Sent

`2 Jul, 10:14 AM`

### Viewed

`2 Jul, 4:52 PM`

### Awaiting response

`Shortlist / accept / reject by owner`

Timeline must use real status events.

Do not infer Viewed time from current status only.

Persist status transition events/timestamps.

---

# 67. WITHDRAW PROPOSAL

Action:

`Withdraw…`

Must:

* open confirmation,
* verify proposer,
* verify current status allows withdrawal,
* persist withdrawn state,
* notify recipient where appropriate,
* update Feed/List states.

Do not delete Proposal history.

---

# 68. MESSAGE OWNER

Action:

`Message owner`

Must open/create the correct lead-linked message thread.

Proposal/Requirement context must be preserved.

Do not create duplicate unrelated threads.

---

# 69. SCREEN 8 — SEND PROPOSAL

Desktop:

centered modal.

Mobile:

standard bottom sheet.

Content must be identical in function.

---

# 70. SEND PROPOSAL HEADER

Reference:

`Send proposal`

Recipient:

`To: Rajesh P.`

Requirement summary:

`Buy: 3 BHK apartment, ₹60L–₹90L, Rajkot`

Use actual safe recipient identity and Requirement data.

---

# 71. CHOOSE LISTING TO PROPOSE

Reference options:

### Option 1

`₹68 L · 3 BHK, Silver Heights`

`Kalawad Road · matches budget + area`

### Option 2

`₹74 L · 3 BHK, Aakash Elegance`

`University Road · matches budget + area`

Only show eligible Broker-owned listings.

Validate server-side:

* ownership,
* state,
* matching eligibility,
* not deleted.

---

# 72. PROPOSAL MATCH EXPLANATION

Labels such as:

`matches budget + area`

must be based on actual structured matching.

Do not hard-code positive match text for every listing.

---

# 73. PROPOSAL MESSAGE

Reference message textarea uses the example Proposal message.

Requirements:

* safe max length,
* preserve text,
* validation,
* actual persistence.

Do not use reference text as default for every production Proposal unless the user explicitly chooses a template.

A useful prefilled suggestion may be supported only if product rules define it and user can edit it.

---

# 74. DUPLICATE SUBMIT PROTECTION

The Batch source explicitly requires:

Submit disables immediately with spinner.

Required layers:

### Client

* immediate disabled state,
* one submission attempt at a time.

### Server

* duplicate active Proposal guard,
* idempotency/concurrency safety.

Do not rely on button disabling alone.

Two parallel requests must not create two active Proposals.

---

# 75. PROPOSAL ACTIVE-DUPLICATE RULE

A Broker must not create multiple active proposals for the same Requirement if product rule permits only one.

Terminal statuses such as:

* withdrawn,
* rejected,
* expired,
* archived

may permit a new Proposal according to final business rules.

Enforce atomically where possible.

---

# 76. PROPOSAL LEAD ANCHOR

Proposal submission must create or reuse the required Lead relationship.

Do not allow:

Proposal successfully created
but Lead/thread anchor silently failed.

The flow must be transactionally safe or compensating/idempotent.

Required consistency:

* Proposal,
* Lead,
* CRM timeline,
* Messaging anchor,
* notification.

---

# 77. PROPOSAL SEND SUCCESS

After success:

* Proposal exists,
* linked listing exists,
* Lead anchor exists,
* notification created,
* CRM event created,
* Requirement Feed card changes to Proposal Sent,
* Sent Proposal list updates.

No partial fake success.

---

# 78. SCREEN 9 — CRM LIST VIEW

Heading:

`Leads / CRM`

Filters:

* Status
* Source
* Date range

View action:

`Kanban view`

---

# 79. CRM TABLE COLUMNS

Desktop columns:

* selection
* NAME
* PROPERTY
* SOURCE
* STATUS
* LAST ACTIVITY

Reference rows:

### Meera Purohit

Property:

`3 BHK, Silver Heights`

Source:

`Listing page`

Status:

`New`

Last Activity:

`20 min ago`

### Amit Shah

Property:

`Shop, Yogi Chowk`

Source:

`Proposal`

Status:

`Contacted`

Last Activity:

`Yesterday`

### Hetal Joshi

Property:

`3 BHK, Aakash Elegance`

Source:

`Saved search`

Status:

`Site Visit`

Last Activity:

`Mon`

---

# 80. CRM SOURCE DATA

Source labels must be structured.

Examples:

* Listing page
* Proposal
* Saved search
* Shared link
* other approved sources.

Do not derive source by parsing notes.

---

# 81. STATUS FILTER

Must filter actual CRM stage.

Do not only filter current client page.

---

# 82. SOURCE FILTER

Must query actual lead source.

---

# 83. DATE RANGE FILTER

Must filter by a clearly defined date field.

For example:

* Lead created date,
* or last activity date.

The UI label and query semantics must agree.

---

# 84. CRM BULK SELECTION

Reference active state:

`2 selected`

Actions:

* Change status
* Export CSV
* Delete…
* Clear selection

Selected IDs must be Broker-authorized Lead records.

Do not trust arbitrary client-provided IDs.

---

# 85. BULK CHANGE STATUS

Must:

* validate selected leads,
* validate allowed target stage,
* update safely,
* create timeline events,
* handle partial failure honestly.

Use transaction/batch RPC where appropriate.

---

# 86. EXPORT CSV

Must generate a real CSV export.

Include only authorized Broker CRM data.

Potential safe fields include:

* lead safe identity,
* linked listing,
* source,
* stage,
* created date,
* last activity.

Contact fields may only be included when Broker is authorized to receive them.

No cross-account export.

Use correct CSV escaping.

---

# 87. BULK DELETE

`Delete…`

must open confirmation.

The exact backend semantics must be clearly defined.

Because Lead records may anchor:

* messages,
* site visits,
* proposals,
* CRM events,

do not blindly hard-delete relational history.

Use approved:

* archive,
* soft-delete,
* CRM removal

behavior if that is the product model.

The UI copy must match real semantics.

---

# 88. CLEAR SELECTION

Must clear all selected rows without changing Lead data.

---

# 89. CRM MOBILE VIEW

Desktop rows transform to the Batch 6 mobile Lead card pattern.

Use the same real dataset.

Do not create a separate mobile array.

---

# 90. MOBILE BULK SELECT

The Batch source defines:

**bulk select via long-press.**

Required:

* long-press enters selection mode,
* selected state visible,
* normal tap behavior remains usable,
* selection count shown,
* bulk actions accessible.

Avoid accidental Lead opening when a long-press selection is intended.

---

# 91. CRM LOADING/EMPTY/ERROR

Use the Batch 6 Lead states:

* loading skeleton,
* No Leads empty state,
* recoverable error,
* Retry.

Do not omit states because CRM has more features.

---

# 92. SCREEN 10 — CRM KANBAN

Kanban is available for desktop large-screen CRM use.

Reference heading:

`Leads / CRM — Kanban view`

The Batch source demonstrates five stages.

---

# 93. KANBAN STAGES

Exact stage columns:

1. New
2. Contacted
3. Site Visit
4. Negotiation
5. Closed / Lost

Do not replace these with arbitrary CRM stages.

---

# 94. NEW COLUMN

Reference count:

`2`

Cards:

### Meera Purohit

`3 BHK, Silver Heights`

`Enquired 20 min ago`

### Jignesh Vora

`2 BHK rent, Mavdi`

`Enquired 3 hrs ago`

Counts must be real.

---

# 95. MOVE TO STAGE MENU

Reference menu:

* Contacted
* Site Visit
* Negotiation
* Open detail

The available transition actions must be appropriate to the current Lead stage.

Do not show invalid transitions that backend rejects.

---

# 96. CONTACTED DROP TARGET

The design shows:

* dragged card,
* lifted visual state,
* highlighted drop target,
* `Drop here`.

Implement actual drag/drop for pointer desktop use.

Do not change stage only visually before server persistence.

Use optimistic UI only with rollback on failure.

---

# 97. SITE VISIT COLUMN HOVER DETAIL

Reference card:

`Hetal Joshi`

`3 BHK, Aakash Elegance`

`Visit: Sat 5 Jul, 11 AM`

Masked phone:

`+91 98988 •••10`

Quick actions:

* Open
* Note

These values must be real.

Phone masking/visibility must respect contact authorization.

---

# 98. QUICK OPEN

`Open`

opens CRM Lead Detail.

---

# 99. QUICK NOTE

`Note`

must invoke the existing CRM note capability or correct note interaction.

Note persistence must be real.

Do not create a fake local note.

Use:

* author,
* timestamp,
* visibility rules,
* content.

---

# 100. NEGOTIATION COLUMN

Reference:

`Kartik Trivedi`

`Counter-offer discussed Tue`

The last-activity text must be real.

---

# 101. CLOSED / LOST COLUMN

Reference contains:

### Kiran Desai

Status:

`CLOSED ✓`

Property:

`2 BHK, Iscon Platinum`

### Sunita Bhatt

Status:

`LOST`

Property/reason:

`2 BHK, Mavdi · budget mismatch`

The system must distinguish:

* successful Closed,
* Lost.

Do not merge them into one ambiguous terminal value without outcome metadata.

---

# 102. LOST REASON

Reason such as:

`budget mismatch`

must come from actual closure outcome/reason data.

Do not invent a reason.

---

# 103. KANBAN RESPONSIVE RULE

The source calls Kanban:

`desktop 1280px+`

Therefore:

* large desktop can use full Kanban,
* smaller layouts must not force an unusable 5-column drag interface.

For mobile below 768px:

* Kanban toggle hidden,
* CRM renders List View,
* stage filter available,
* stage changes use Move to Stage menu,
* no drag.

For intermediate tablet/smaller desktop widths:

use the source-consistent safe behavior.

Do not force touch users into drag-only interaction.

---

# 104. KANBAN HORIZONTAL OVERFLOW

Desktop design uses a wide multi-column board.

If viewport cannot contain the full board:

* preserve usable horizontal behavior where appropriate,
* do not cause page-level destructive overflow,
* preserve column widths.

---

# 105. KANBAN ACCESSIBILITY

Drag/drop cannot be the only way to change stage.

The Move to Stage menu must remain available.

Keyboard and assistive users need a non-drag method.

---

# 106. KANBAN PERSISTENCE

Every stage move must:

* verify Broker authorization,
* validate allowed transition,
* persist,
* create CRM event,
* update list counts,
* update analytics where appropriate.

---

# 107. SCREEN 11 — CRM LEAD DETAIL

Screen 11 extends Batch 6 Lead Detail.

Desktop:

right-side CRM drawer.

Mobile:

full page.

Broker-specific additions:

* follow-up reminder scheduler,
* Proposal link,
* linked records.

---

# 108. LEAD DETAIL HEADER

Reference:

`Amit Shah`

Context:

`Shop, Yogi Chowk · via proposal · Contacted`

Status:

`Contacted`

Use real Lead data.

---

# 109. FOLLOW-UP REMINDER

Heading:

`Follow-up reminder`

Quick options:

* Tomorrow 10 AM
* In 3 days
* Next week
* Pick date…

Reference set state:

`Reminder set: Sat 5 Jul, 10:00 AM — push + email`

---

# 110. FOLLOW-UP DATE CALCULATION

Quick actions must use Broker-local timezone.

Examples:

### Tomorrow 10 AM

Next calendar day at 10 AM local time.

### In 3 Days

Calculate correctly across month/year boundaries.

### Next Week

Use clearly defined product behavior.

### Pick Date

Use actual date/time picker.

---

# 111. FOLLOW-UP VALIDATION

Follow-up must:

* be a valid date,
* be future,
* belong to authorized Lead,
* persist.

Do not accept arbitrary invalid date strings.

---

# 112. FOLLOW-UP DELIVERY

Reminder state and provider delivery are separate.

If Push/Email providers are configured:

send according to real provider success.

If not:

store follow-up reminder and show honest provider state.

Do not display:

`push + email`

as delivered capability when those providers are not configured.

Record missing provider setup separately.

---

# 113. LINKED RECORDS

Reference:

`LINKED`

### Listing

`Shop, Yogi Chowk · ₹48 L`

`Your listing`

### Proposal

`Proposal — shortlisted`

`Sent yesterday to Kartik T.'s requirement`

Both must be actual linked records.

---

# 114. LINKED LISTING ACTION

Must open correct listing management/detail context.

---

# 115. LINKED PROPOSAL ACTION

Must open exact Proposal Detail.

No ID mismatch.

---

# 116. CRM NOTES & TIMELINE

Reference:

`NOTES & TIMELINE`

Note:

`Called — interested, wants ground-floor unit`

`Note by you · yesterday, 5:10 PM`

System event:

`Lead received via proposal`

`System · yesterday, 11:02 AM`

Timeline must be real.

---

# 117. TIMELINE DATA

Combine actual:

* Lead creation,
* Proposal event,
* status change,
* Note,
* Follow-up,
* Site Visit,
* message-related events where defined.

Order chronologically.

Use bounded pagination for long timelines.

---

# 118. LEAD DETAIL ACTIONS

Reference:

* Call
* Schedule Visit
* Message

All must work.

---

# 119. CALL

Use authorized phone only.

Do not expose full phone before authorization.

---

# 120. SCHEDULE VISIT

Create actual Site Visit linked to:

* Lead,
* Listing,
* Buyer/requester,
* Broker/host or listing-side participant.

---

# 121. MESSAGE

Open/create actual Lead-linked thread.

Avoid duplicate thread creation.

---

# 122. SCREENS 12–14 — REUSED PATTERNS

The source explicitly reuses Owner Batch patterns.

Reuse means exact functional parity with Broker context.

---

# 123. SCREEN 12 — MESSAGES

Reuse Batch 6 Screens 6–7.

Required:

* thread list,
* unread counts,
* previews,
* chat detail,
* safety banner,
* sticky message input,
* timestamps,
* read state,
* participant authorization,
* loading,
* empty,
* error.

No Broker visual redesign beyond contextual identity/data.

---

# 124. MESSAGE PERFORMANCE

Remove/avoid N+1 query behavior.

Thread list must not make multiple sequential queries for every thread.

Batch:

* last messages,
* unread counts,
* counterpart names.

---

# 125. SCREEN 13 — SITE VISITS

Reuse Batch 6 Screens 8–9.

Broker-specific context:

* requester identity,
* listing associated with each visit.

Desktop calendar:

multi-listing calendar color-codes by Property.

---

# 126. SITE VISIT CALENDAR COLOR

Color assignment must be:

* deterministic,
* tied to Listing identity,
* consistent within calendar.

Do not create random colors on every render.

Preserve accessibility with label/text, not color alone.

---

# 127. SITE VISIT ACTIONS

Required:

* Accept,
* Reschedule,
* Reject,
* Detail,
* Directions,
* calendar view.

All use real visit records.

---

# 128. SCREEN 14 — SAVED ITEMS / SEARCHES

Reuse Batch 6 Screens 10–11.

Required:

* Saved Properties/Projects,
* remove heart,
* open detail,
* unavailable item handling,
* Saved Searches,
* New Matches badge,
* alert frequency,
* empty states.

---

# 129. SAVED SEARCH NEW MATCH COUNT

Must use real Requirement/Search matching.

Do not hard-code badge counts.

---

# 130. SCREEN 15 — BROKER ANALYTICS

Broker Analytics has:

* 15A Conversion Funnel
* 15B Listing Performance Ranking

Data must be real.

Empty and Setup Required states follow Batch 6 Analytics states.

---

# 131. SCREEN 15A — CONVERSION FUNNEL

Reference range:

`Last 90 days · all listings`

Stages:

### Leads Received

`112`

### Contacted

`84 · 75%`

### Site Visits

`31 · 28%`

### Closed

`6 · 5.4%`

---

# 132. FUNNEL CALCULATION

Use real 90-day cohort/period logic.

Define denominator consistently.

The reference percentages use total Leads Received as base:

* Contacted / Leads,
* Site Visits / Leads,
* Closed / Leads.

Do not mix denominators without changing labels.

---

# 133. FUNNEL EVENT CONSISTENCY

Funnel must derive from actual:

* Leads,
* CRM stages,
* Site Visits,
* Closed outcomes.

Do not calculate Contacted from message count.

Do not calculate Site Visits from arbitrary calendar events unrelated to Leads.

---

# 134. SCREEN 15B — LISTING PERFORMANCE RANKING

Columns:

* #
* LISTING
* VIEWS
* LEADS
* VISITS

Reference:

### Rank 1

`3 BHK, Silver Heights ⚡`

Views:

`412`

Leads:

`21`

Visits:

`8`

### Rank 2

`Shop, Yogi Chowk`

Views:

`238`

Leads:

`11`

Visits:

`4`

### Rank 3

`2 BHK, Mavdi`

Views:

`96`

Leads:

`—`

Visits:

`—`

---

# 135. NO-DATA DISPLAY RULE

The Batch source explicitly says:

Use:

`—`

where no data exists.

Never zero-fill/fabricate missing tracking data.

Distinguish:

### Real zero

Tracking works and count is truly zero.

### No data

Provider/event data is unavailable/incomplete.

Display semantics must remain honest.

---

# 136. FEATURED LIGHTNING MARKER

The lightning marker on a listing must correspond to real Featured promotion state.

Do not decorate Rank 1 automatically.

---

# 137. ANALYTICS SETUP REQUIRED

If analytics tracking provider is absent:

use Batch 6 Setup Required state.

Do not display:

* sample funnel,
* sample ranking,
* random chart.

---

# 138. ANALYTICS EMPTY STATE

If tracking is active but data is insufficient:

use the honest not-enough-data state.

Do not confuse with provider-not-connected.

---

# 139. ANALYTICS QUERY PERFORMANCE

Do not fetch all raw analytics events into the client.

Use:

* aggregated DB queries,
* RPC,
* analytics backend aggregation.

---

# 140. SCREEN 16 — BROKER BILLING PLAN

Reference plan:

`Broker Pro`

Price:

`₹1,999/month`

Next billing:

`15 Jul 2026`

Status:

`Active`

Usage:

### Listings

`14 / 25`

### Proposals this month

`8 / 30`

### Featured slots

`2 / 3`

Included features:

* CRM + Kanban
* Requirement Feed
* Full analytics

Action:

`Manage plan`

---

# 141. BROKER PLAN DATA

All plan information must come from real billing catalog/subscription data.

Do not hard-code:

* ₹1,999,
* 25 listings,
* 30 Proposals,
* 3 Featured slots

if plan data is database authority.

The UI design remains exact while content is driven by real plan data.

---

# 142. LISTING USAGE

Use real entitlement-period semantics.

Do not reset daily unless plan defines it.

Do not count deleted/invalid listing states incorrectly.

---

# 143. PROPOSAL USAGE

`Proposals this month`

must count actual Proposal usage within billing/calendar period according to plan rule.

Submission limit must be enforced server-side.

Do not only disable the frontend after limit.

---

# 144. FEATURED SLOT USAGE

Use real active promotion slots.

Expired Featured campaigns must release slots according to product policy.

---

# 145. CRM/KANBAN ENTITLEMENT

If Broker plan does not include CRM/Kanban:

the backend and UI must apply correct plan gate.

Do not simply hide navigation while allowing direct route access.

---

# 146. REQUIREMENT FEED ENTITLEMENT

Apply plan entitlement if the plan system defines Feed access limits.

Do not expose paid data through unprotected endpoints.

---

# 147. MANAGE PLAN

Must:

* open actual subscription management,
* or honest Setup Required if provider portal is unavailable.

No dead button.

---

# 148. SCREEN 17 — INVOICES

Screen 17 reuses Batch 6 Invoice and Invoice Detail patterns.

Required:

* desktop Invoice table,
* mobile Invoice cards,
* View,
* Download,
* printable Invoice Detail,
* conditional GSTIN,
* empty state.

---

# 149. BROKER GST CERTIFICATE RELATION

Batch 7 Verification states:

GST certificate is optional but needed for GSTIN on invoices.

The invoice billing-profile flow must use the approved GST information.

Do not infer GSTIN merely because a GST certificate file exists.

Use verified billing data.

---

# 150. INVOICE SECURITY

Broker may access only own invoices.

Invoice Download URLs must not expose other users' invoices.

---

# 151. SCREEN 18 — BROKER VERIFICATION

Broker Verification extends Batch 6 Verification.

Broker verifies:

* Identity,
* optional RERA Agent Registration,
* optional GST Certificate.

---

# 152. IDENTITY DOCUMENT

Reference:

`Identity (Aadhaar)`

State:

`Approved 12 Jun`

Badge:

`Approved`

Use actual verification record.

Do not fake Approved.

---

# 153. RERA AGENT REGISTRATION

Reference:

`RERA agent registration (optional)`

Helper:

`Boosts trust badge on your listings`

Action:

`Upload`

Requirements:

* optional,
* private file,
* real review workflow,
* real approval,
* trust badge only after valid approved verification.

Uploading document alone must not activate a trust badge.

---

# 154. GST CERTIFICATE

Reference:

`GST certificate (optional)`

Helper:

`Needed for GSTIN on invoices`

Upload must:

* use private storage,
* create verification record,
* be reviewable,
* not become a public document.

---

# 155. BROKER VERIFICATION TIMELINE

Use Batch 6 timeline and rejected/resubmit patterns.

Support:

* Submitted,
* Under Review,
* Approved,
* Rejected,
* Re-submit.

Each document type can have its own status.

Do not collapse all Broker verification into one boolean.

---

# 156. VERIFICATION DOCUMENT SECURITY

Sensitive Broker documents must:

* be private,
* use authenticated upload,
* be accessible only to authorized staff,
* validate MIME type,
* validate size,
* preserve audit history.

---

# 157. SCREEN 19 — BROKER PROFILE EDIT

Reference identity:

`NM`

`Nilesh Mehta`

`Broker · verified ✓`

Fields:

* Agency name
* Service areas
* Years of experience
* Mobile
* Bio

Actions:

* Cancel
* Save changes

---

# 158. AGENCY NAME

Persist actual Broker agency name.

Do not allow unsafe privileged-profile updates through the same generic update.

Validate safe text length.

---

# 159. SERVICE AREAS

Reference chips:

* Rajkot
* Morbi
* Jamnagar

Action:

`+ Add city…`

The Requirement Feed is scoped to these cities.

Therefore Service Areas are not decorative profile text.

They directly affect Feed queries.

---

# 160. SERVICE-AREA UPDATE EFFECT

After Service Area update:

* save actual structured city IDs/names,
* invalidate/revalidate Requirement Feed,
* update matching count,
* update new-match notifications according to product behavior.

Do not require manual database change.

---

# 161. SERVICE-AREA DATA

Use the canonical Gujarat location system.

Do not store uncontrolled free-text duplicates such as:

* Rajkot,
* rajkot,
* Rajkot City

as separate areas.

Use structured location IDs where available.

---

# 162. YEARS OF EXPERIENCE

Store as:

* starting year,
* or validated experience value

according to final data model.

Avoid stale hard-coded years that never update.

---

# 163. MOBILE NUMBER

Reference:

`+91 98790 •••32`

Use the secure verified-mobile rule.

If mobile is verified/locked:

do not allow generic profile update to change it.

Use the secure number-change flow.

---

# 164. BIO

Reference:

`Helping families find homes across Rajkot and Saurashtra since 2014. Residential + commercial.`

Use real stored Bio.

Sanitize text.

Apply safe length.

---

# 165. SAVE CHANGES

Must:

* validate,
* persist,
* update Feed scope when service areas change,
* update public Broker profile where appropriate,
* protect privileged fields.

Show success only after persistence.

---

# 166. SCREEN 20 — NOTIFICATIONS CENTER

Reuse Batch 6 Notification Center.

Broker adds two notification types:

1. New matching requirement
2. Proposal status changed

Group by date.

Use real typed click-through targets.

---

# 167. NEW MATCHING REQUIREMENT NOTIFICATION

Must open:

exact Requirement Feed item/detail context.

The notification must be based on real service-area matching.

Do not notify Broker for unrelated city Requirement.

---

# 168. PROPOSAL STATUS CHANGED NOTIFICATION

Examples:

* Proposal Viewed
* Proposal Shortlisted
* Proposal Accepted
* Proposal Rejected

Click:

exact Proposal Detail.

Do not route to generic Proposal list only unless the target record no longer exists.

---

# 169. NOTIFICATION DEDUPLICATION

Avoid duplicate notifications for the same status transition event.

Use event identity/idempotency where appropriate.

---

# 170. SCREEN 21 — SUPPORT / HELP

Reuse Batch 6 Support architecture:

* FAQ accordion,
* Raise Ticket,
* Ticket status list.

Broker FAQ set must include:

* Proposal limits,
* Featured slot billing.

---

# 171. PROPOSAL LIMIT FAQ

FAQ content must accurately reflect current Broker plan behavior.

Do not hard-code obsolete limits if billing catalog changes.

Where possible, support dynamic plan-aware help copy or approved static content maintained with plan docs.

---

# 172. FEATURED SLOT BILLING FAQ

Must accurately explain:

* slot usage,
* campaign expiry,
* billing/plan behavior.

Do not promise automatic refund/renewal unless implemented.

---

# 173. SUPPORT TICKETS

Use actual ticket persistence.

Broker can view only own tickets.

Support categories/statuses follow Batch 6 pattern.

---

# 174. SCREEN 22 — SETTINGS

Reuse Batch 6 Settings:

* Notification preferences,
* Privacy,
* Appearance,
* Language,
* Danger Zone.

Broker adds:

`Requirement Feed alerts`

options:

* Instant
* Daily digest
* Off

---

# 175. REQUIREMENT FEED ALERT SETTING

Store actual Broker preference.

Do not only update UI toggle.

---

# 176. INSTANT ALERTS

If selected:

matching Requirement events may trigger notification according to configured channels/providers.

If providers are unavailable:

store preference but do not fake delivery.

---

# 177. DAILY DIGEST

Requires a real scheduled digest process.

Do not label Daily Digest as active if no scheduled job/provider exists.

Missing infrastructure must be recorded in the external setup file.

---

# 178. OFF

Must suppress Feed alert delivery according to product rules.

The Feed itself remains available unless plan/product rules say otherwise.

---

# 179. MESSAGES PROVIDER HONESTY

In-app Messages are database-backed.

If realtime is not configured:

do not fake realtime.

Use honest:

* refresh,
* polling,
* revalidation

until realtime is configured.

---

# 180. EMAIL/PUSH/SMS HONESTY

Batch 7 features that may reference:

* push,
* email,
* SMS

must distinguish:

* user preference,
* provider availability,
* actual send result.

Do not treat preference enabled as delivery success.

---

# 181. CURRENT REPOSITORY RECONCILIATION — OVERVIEW

The current Broker dashboard implementation uses a generic dashboard architecture with:

* Properties count,
* Requirements count,
* Leads count,
* Proposals count,
* Action Card grid,
* Account Status card.

This is not the Batch 7 Overview target.

Required:

* remove generic Overview presentation,
* implement Batch 7 stat cards,
* implement matching Requirement message,
* implement real recent activity feed,
* implement Broker-specific sidebar.

---

# 182. CURRENT REPOSITORY RECONCILIATION — NAVIGATION

The current Broker navigation does not exactly match Batch 7.

Batch 7 requires explicit Broker architecture including:

* Requirement Feed,
* Site Visits,
* Analytics,
* Settings

according to the source design.

Repair navigation and routes.

Do not keep Batch 7 modules inaccessible simply because current nav omitted them.

---

# 183. CURRENT REPOSITORY RECONCILIATION — REQUIREMENT FEED

The current Broker helper architecture that returns all open public Requirements is insufficient.

Batch 7 requires:

**service-area scoped matching Feed.**

Implement:

* service-area query,
* filters,
* matching count,
* Hide state,
* Proposal Sent state,
* View Proposal,
* new/read state.

---

# 184. CURRENT REPOSITORY RECONCILIATION — PROPOSAL LISTING LINK

Batch 7 Send Proposal requires selecting a Broker listing.

Therefore current Proposal storage/query must support a real linked proposed Property.

If missing:

extend schema and actions.

Do not represent selected Property only through title/message text.

---

# 185. CURRENT REPOSITORY RECONCILIATION — PROPOSAL ATOMICITY

Proposal submission currently depends on Lead creation for message/timeline anchoring.

Final Batch 7 behavior requires:

* Proposal,
* Lead,
* CRM timeline,
* notification

to remain consistent.

Do not allow Proposal with broken Lead anchor due to a silently failed dependency.

Use transaction/RPC or safe idempotent orchestration.

---

# 186. CURRENT REPOSITORY RECONCILIATION — CRM

Batch 7 requires:

* list filters,
* bulk actions,
* CSV export,
* Kanban,
* drag/drop,
* Move to Stage,
* Closed/Lost outcome distinction,
* follow-up scheduler,
* linked Proposal records.

Current simple Lead list is insufficient if those are absent.

Implement all Batch 7 CRM behavior.

---

# 187. CURRENT REPOSITORY RECONCILIATION — N+1

Explicitly inspect and remove N+1 query patterns from:

* Leads list,
* CRM enrichment,
* Message thread list,
* Proposal list enrichment,
* Requirement match counts,
* Analytics ranking.

Use:

* joins,
* batched queries,
* aggregate RPCs,
* database views.

---

# 188. CURRENT REPOSITORY RECONCILIATION — FOLLOW-UPS

Follow-up date input must be validated.

Do not accept arbitrary `dueAt` strings without:

* parsing,
* future-date check,
* timezone handling.

---

# 189. REFERENCE DATA REQUIREMENT

Create persistent development/reference records matching Batch 7 scenarios.

Do not hard-code the UI.

Do not delete reference data automatically after verification.

---

# 190. REFERENCE BROKER

Create:

`Nilesh Mehta`

Agency:

`Mehta Estates`

Service areas:

* Rajkot
* Morbi
* Jamnagar

---

# 191. REFERENCE PROPERTIES

Create actual records including:

### Silver Heights

`3 BHK Apartment, Silver Heights`

Location:

Kalawad Road, Rajkot

Price:

₹68 L

Live state.

Featured promotion state.

Reference lead relationships.

### Shop, Yogi Chowk

Price reference:

₹48 L

### Aakash Elegance

3 BHK

University Road

Price reference:

₹74 L

### 2 BHK, Mavdi

Use for draft, CRM and Proposal scenarios.

### Iscon Platinum

Use for Closed Lead reference.

---

# 192. REFERENCE REQUIREMENTS

Create Requirements needed for Feed:

### Rajesh P. Requirement

Buy 3 BHK Apartment
₹60L–₹90L
Kalawad Road / University Road
Rajkot
3–6 months.

### Sunita B. Requirement

Rent 2 BHK
150 Feet Ring Road
₹18k–₹25k/month
family
immediate move-in.

### Kartik T. Requirement

Buy commercial Shop
Yogi Chowk area
₹40L–₹60L.

---

# 193. REFERENCE PROPOSALS

Create actual Proposal relationships for:

* Viewed,
* Shortlisted,
* Rejected,
* Accepted where count testing requires.

Include:

* proposed Property,
* Requirement,
* recipient,
* message,
* status history.

---

# 194. REFERENCE LEADS

Create:

### Meera Purohit

Source:

Listing page

Stage:

New

Linked Silver Heights.

### Amit Shah

Source:

Proposal

Stage:

Contacted

Linked Shop, Yogi Chowk.

### Hetal Joshi

Source:

Saved search

Stage:

Site Visit

Linked Aakash Elegance.

### Jignesh Vora

New.

### Kartik Trivedi

Negotiation.

### Kiran Desai

Closed.

### Sunita Bhatt

Lost with reason:

budget mismatch.

---

# 195. REFERENCE CRM TIMELINE

For Amit Shah create real events:

* Lead received via Proposal,
* Called note,
* Follow-up reminder,
* Proposal shortlisted relationship.

Do not create display-only timeline JSON unrelated to real event tables.

---

# 196. REFERENCE SITE VISITS

Create actual Site Visit data needed for:

* CRM card,
* Overview activity,
* Site Visit list/calendar.

Use safe fixture dates appropriate to test environment.

Avoid stale test records contaminating production reporting.

---

# 197. REFERENCE BILLING

Use test-mode subscription/plan fixtures.

Do not create fake production payment success.

For visual testing:

Broker Pro plan can use test subscription data with:

* Listing limit,
* Proposal limit,
* Featured slots.

---

# 198. TEMPORARY DATA NON-DELETION

The user explicitly requires temporary design reference data to remain.

Do not automatically delete:

* profiles,
* listings,
* Requirements,
* Leads,
* Proposals,
* Site Visits,
* media

after verification.

Keep test financial data isolated from live production payment records.

---

# 199. RESPONSIVE VERIFICATION

Test at minimum:

* 360px mobile,
* 390px reference mobile,
* larger mobile,
* tablet portrait,
* tablet landscape,
* laptop,
* 1280px desktop,
* wide desktop.

---

# 200. OVERVIEW RESPONSIVE CHECK

Verify:

* sidebar,
* greeting,
* matching Requirement message,
* stats,
* activity feed,
* mobile compact layout,
* drawer,
* bottom nav.

---

# 201. REQUIREMENT FEED RESPONSIVE CHECK

Desktop:

* filter row,
* card content,
* chips,
* match indicator,
* action buttons.

Mobile:

* contextual header,
* stacked cards,
* filter sheet,
* no overflow.

---

# 202. PROPOSAL RESPONSIVE CHECK

Verify:

* Sent List,
* Detail,
* Send modal,
* mobile bottom sheet,
* long Requirement title wrapping,
* Proposal message wrapping.

---

# 203. CRM RESPONSIVE CHECK

Desktop:

* filters,
* table,
* bulk bar.

Mobile:

* cards,
* long-press selection,
* bulk action access.

Kanban:

* large desktop,
* no forced drag on mobile.

---

# 204. LEAD DETAIL RESPONSIVE CHECK

Desktop:

* drawer width,
* no clipping,
* follow-up chips,
* linked cards,
* timeline.

Mobile:

* full page,
* back button,
* actions,
* date picker,
* sticky behavior if defined.

---

# 205. BILLING/VERIFICATION/PROFILE RESPONSIVE CHECK

Verify:

* usage meters,
* feature chips,
* long plan names,
* verification document rows,
* service-area chips,
* Add City,
* masked mobile,
* Bio.

No clipping.

---

# 206. TEXT WRAPPING VERIFICATION

Explicitly inspect:

* Nilesh Mehta,
* Mehta Estates,
* Requirement titles,
* match descriptions,
* Proposal row titles,
* status timeline,
* CRM Listing names,
* source labels,
* follow-up text,
* Billing feature labels,
* verification document names,
* service-area chips.

Fix:

* clipping,
* accidental two-line buttons,
* badge overlap,
* icon collision,
* table truncation errors.

Do not randomly reduce font size.

---

# 207. LOADING STATES

Support real loading states for:

* Overview stats,
* Activity Feed,
* Properties,
* Requirements,
* Requirement Feed,
* Proposals,
* CRM List,
* CRM Kanban,
* Lead Detail,
* Messages,
* Site Visits,
* Saved,
* Analytics,
* Billing,
* Invoices,
* Verification,
* Notifications.

Use skeletons matching final shapes.

---

# 208. EMPTY STATES

Mandatory:

* Requirement Feed empty,
* Proposals empty,
* Leads empty,
* Messages empty,
* Saved empty,
* Saved Search empty,
* Analytics not enough data,
* Invoices empty.

Do not use generic one-line empty text everywhere.

---

# 209. ERROR STATES

Every server-backed screen needs recoverable errors.

Examples:

* Feed failed,
* Proposal send failed,
* CRM load failed,
* stage move failed,
* follow-up save failed,
* CSV export failed,
* Analytics load failed,
* verification upload failed.

Do not expose raw SQL/provider errors.

---

# 210. NO DEAD UI RULE

Every visible Batch 7 action must work.

This includes:

* Post Property,
* Requirement Feed,
* Proposal actions,
* Feed filters,
* Send Proposal,
* Hide,
* View Proposal,
* Proposal tabs,
* Withdraw,
* Message Owner,
* listing selection,
* CRM filters,
* Kanban View,
* bulk Change Status,
* Export CSV,
* Delete,
* Clear Selection,
* drag/drop,
* Move to Stage,
* Open Detail,
* Note,
* follow-up quick actions,
* Pick Date,
* Call,
* Schedule Visit,
* Message,
* Message send,
* Site Visit actions,
* Saved remove,
* Analytics state actions,
* Manage Plan,
* Invoice actions,
* verification upload,
* profile Add City,
* Save Changes,
* notifications,
* support FAQ,
* ticket submission,
* Settings toggles.

No:

`href="#"`

No empty action.

---

# 211. SECURITY VERIFICATION

Explicitly test:

* Broker A cannot read Broker B CRM.
* Broker A cannot update Broker B Lead.
* Broker cannot send Proposal using another Broker's Property.
* Feed does not expose unauthorized private Requirement data.
* hidden Requirement preference affects only current Broker.
* message thread is participant-only.
* Site Visit is participant-only.
* verification documents remain private.
* invoices remain owner-only.
* CSV export contains only authorized data.
* Profile update cannot change role/status/verification.

---

# 212. RLS VERIFICATION

Test real database operations for:

* Broker Property edit,
* pause/resume,
* Broker Requirement close/reopen,
* Proposal create,
* Proposal withdraw,
* CRM stage update,
* bulk stage update,
* CRM note,
* follow-up,
* message,
* Site Visit,
* Saved,
* verification upload metadata,
* profile update.

Do not mark PASS because UI appears to work optimistically.

---

# 213. TRANSACTION AND IDEMPOTENCY REQUIREMENTS

Critical flows:

### Send Proposal

Must not create duplicate Proposal/Lead.

### Kanban Move

Must not lose stage on retry.

### Bulk Status

Must not partially report success incorrectly.

### Site Visit

Must keep visit/notification/CRM events coherent.

### Billing

Must keep subscription/invoice/payment state coherent.

Use transaction, RPC or idempotent orchestration where appropriate.

---

# 214. PERFORMANCE REQUIREMENTS

Avoid:

* unbounded Feed query,
* unbounded Proposals,
* unbounded CRM,
* N+1 lead enrichment,
* N+1 Message threads,
* client-side analytics aggregation of all raw events,
* loading all service-area matching candidates unnecessarily.

Use pagination and aggregation.

---

# 215. EXTERNAL PROVIDER REQUIREMENTS

Potential Batch 7 dependencies:

* Push,
* Email,
* SMS,
* Analytics,
* realtime Messages,
* PDF/CSV delivery infrastructure,
* map/directions,
* media/storage.

Any missing external dependency must be recorded in:

`MISSING_API_PROVIDER_EXTERNAL_SETUP_REQUIREMENTS.md`

No fake provider success.

---

# 216. SCREEN 1 FINAL CHECKLIST

* [ ] current generic Broker Overview removed
* [ ] exact Broker shell
* [ ] exact Batch 7 nav
* [ ] real nav counts
* [ ] Nilesh-style reference profile through DB
* [ ] greeting timezone correct
* [ ] matching Requirement count real
* [ ] Post Property
* [ ] Active Listings
* [ ] Featured count
* [ ] Leads This Week
* [ ] Not Contacted count
* [ ] Proposals This Month
* [ ] Site Visit stats
* [ ] Recent Activity
* [ ] Feed event click-through
* [ ] Proposal event click-through
* [ ] Visit event click-through
* [ ] skeleton
* [ ] mobile Overview
* [ ] bottom nav
* [ ] Broker drawer

---

# 217. SCREENS 2–4 FINAL CHECKLIST

* [ ] My Properties exact reused pattern
* [ ] Featured chip
* [ ] featured expiry
* [ ] real promotion data
* [ ] Post Property entry card
* [ ] plan usage
* [ ] Start
* [ ] Continue Draft
* [ ] real canonical Batch 5 progress
* [ ] Discard confirmation
* [ ] My Requirements
* [ ] For Client tag
* [ ] structured For Client state
* [ ] View Proposals
* [ ] Edit
* [ ] Close
* [ ] Reopen

---

# 218. SCREEN 5 FINAL CHECKLIST

* [ ] Requirement Feed route
* [ ] service-area scope
* [ ] Rajkot/city filter
* [ ] Budget filter
* [ ] Type filter
* [ ] Buy/Rent filter
* [ ] match count
* [ ] listing match logic
* [ ] Send Proposal
* [ ] Hide persistence
* [ ] Proposal Sent badge
* [ ] View Proposal
* [ ] new Feed count
* [ ] read/seen state
* [ ] empty state
* [ ] Edit Service Areas
* [ ] mobile cards
* [ ] filter bottom sheet
* [ ] pagination

---

# 219. SCREENS 6–8 FINAL CHECKLIST

* [ ] Sent tabs
* [ ] Sent count
* [ ] Viewed count
* [ ] Shortlisted count
* [ ] Accepted count
* [ ] Rejected count
* [ ] proposed Listing shown
* [ ] Requirement shown
* [ ] recipient safe identity
* [ ] rejection reason real
* [ ] empty state
* [ ] Proposal Detail
* [ ] Their Requirement
* [ ] Proposed Listing
* [ ] Message
* [ ] Timeline
* [ ] Sent time
* [ ] Viewed time
* [ ] Withdraw
* [ ] Message Owner
* [ ] Send Proposal modal
* [ ] mobile bottom sheet
* [ ] choose owned Listing
* [ ] match explanation
* [ ] message field
* [ ] duplicate client protection
* [ ] duplicate server protection
* [ ] Lead anchor guaranteed
* [ ] notification
* [ ] CRM event

---

# 220. SCREEN 9 FINAL CHECKLIST

* [ ] CRM List
* [ ] Status filter
* [ ] Source filter
* [ ] Date Range
* [ ] Kanban View
* [ ] correct columns
* [ ] real Source
* [ ] real status
* [ ] real last activity
* [ ] multi-select
* [ ] 2 selected state
* [ ] Change Status
* [ ] Export CSV
* [ ] Delete confirmation
* [ ] Clear Selection
* [ ] mobile cards
* [ ] long-press selection
* [ ] loading
* [ ] empty
* [ ] error
* [ ] pagination
* [ ] N+1 removed

---

# 221. SCREEN 10 FINAL CHECKLIST

* [ ] New column
* [ ] Contacted column
* [ ] Site Visit column
* [ ] Negotiation column
* [ ] Closed/Lost column
* [ ] real counts
* [ ] card drag state
* [ ] drop target
* [ ] persisted move
* [ ] rollback on error
* [ ] Move to Stage menu
* [ ] Open Detail
* [ ] hover quick detail
* [ ] masked phone
* [ ] Note action
* [ ] Closed outcome
* [ ] Lost outcome
* [ ] Lost reason
* [ ] mobile fallback
* [ ] no drag-only mobile behavior
* [ ] accessibility alternative

---

# 222. SCREEN 11 FINAL CHECKLIST

* [ ] desktop drawer
* [ ] mobile full page
* [ ] real Lead identity
* [ ] source
* [ ] stage
* [ ] follow-up quick options
* [ ] Tomorrow 10 AM
* [ ] In 3 Days
* [ ] Next Week
* [ ] Pick Date
* [ ] future-date validation
* [ ] timezone handling
* [ ] provider honesty
* [ ] linked Listing
* [ ] linked Proposal
* [ ] Note timeline
* [ ] System timeline
* [ ] Call
* [ ] Schedule Visit
* [ ] Message

---

# 223. SCREENS 12–14 FINAL CHECKLIST

* [ ] Messages Batch 6 parity
* [ ] thread list
* [ ] unread
* [ ] chat
* [ ] safety banner
* [ ] sticky input
* [ ] no message N+1
* [ ] Site Visits Batch 6 parity
* [ ] listing context
* [ ] calendar
* [ ] deterministic listing color
* [ ] Accept
* [ ] Reschedule
* [ ] Reject
* [ ] Saved Items
* [ ] remove/open
* [ ] Saved Searches
* [ ] New Matches
* [ ] empty states

---

# 224. SCREEN 15 FINAL CHECKLIST

* [ ] Last 90 Days
* [ ] All Listings
* [ ] Leads Received
* [ ] Contacted
* [ ] Site Visits
* [ ] Closed
* [ ] correct percentages
* [ ] real event data
* [ ] listing ranking
* [ ] rank
* [ ] Listing
* [ ] Views
* [ ] Leads
* [ ] Visits
* [ ] Featured marker real
* [ ] em dash for unavailable data
* [ ] real zero distinguished
* [ ] not enough data
* [ ] Setup Required
* [ ] efficient aggregation

---

# 225. SCREENS 16–18 FINAL CHECKLIST

* [ ] Broker Pro
* [ ] real price
* [ ] next billing
* [ ] Active status
* [ ] Listing usage
* [ ] Proposal usage
* [ ] Featured slot usage
* [ ] CRM/Kanban entitlement
* [ ] Requirement Feed entitlement
* [ ] Analytics entitlement
* [ ] Manage Plan
* [ ] Invoice table
* [ ] mobile Invoice cards
* [ ] Invoice Detail
* [ ] GSTIN conditional
* [ ] PDF/Print
* [ ] Identity verification
* [ ] RERA Agent optional
* [ ] GST certificate optional
* [ ] private storage
* [ ] real review states
* [ ] trust badge only after approval
* [ ] rejected/resubmit

---

# 226. SCREENS 19–22 FINAL CHECKLIST

* [ ] Broker Profile exact fields
* [ ] Agency Name
* [ ] service areas
* [ ] Add City
* [ ] structured location
* [ ] Feed scope updates
* [ ] Years Experience
* [ ] Mobile safe/locked
* [ ] Bio
* [ ] Save
* [ ] Notifications Center
* [ ] New Matching Requirement type
* [ ] Proposal Status Changed type
* [ ] correct click-through
* [ ] Support
* [ ] Proposal Limit FAQ
* [ ] Featured Slot Billing FAQ
* [ ] Ticket persistence
* [ ] Settings
* [ ] Notification Preferences
* [ ] Privacy
* [ ] Theme
* [ ] Language state
* [ ] Danger Zone
* [ ] Requirement Feed Alerts
* [ ] Instant
* [ ] Daily Digest
* [ ] Off
* [ ] provider honesty

---

# 227. FULL CONNECTED BROKER FLOW TEST

Perform the following complete real flow:

Broker login
→ Dashboard Overview
→ verify real Feed match count
→ open Requirement Feed
→ filter city/budget/type
→ inspect match count
→ Hide one Feed item
→ verify only this Broker's Feed changes
→ open matching Requirement
→ Send Proposal
→ choose owned Listing
→ submit once
→ attempt duplicate submission
→ verify duplicate blocked
→ open Sent Proposals
→ Proposal Detail
→ verify status timeline
→ Message Owner
→ open CRM Lead
→ set follow-up
→ move Lead stage
→ open Kanban
→ drag Lead
→ refresh
→ verify persisted stage
→ add Note
→ Schedule Site Visit
→ Message Lead
→ Saved Items/Searches
→ Analytics
→ Billing
→ Invoice
→ Verification upload
→ Profile service-area update
→ return to Requirement Feed
→ verify Feed scope changed
→ Notifications
→ Support
→ Settings Feed Alerts.

Any broken connection means Batch 7 is incomplete.

---

# 228. LIVE PROJECT VERIFICATION STANDARD

After each implementation phase:

1. run build,
2. run typecheck,
3. run lint where configured,
4. start actual application,
5. sign in as Broker fixture account,
6. test actual routes,
7. test actual database reads/writes,
8. refresh,
9. verify persistence,
10. test desktop,
11. test tablet,
12. test mobile,
13. inspect console,
14. inspect failed network calls,
15. inspect Supabase/RLS failures.

No screen passes through static review alone.

---

# 229. COMPLETION BLOCKERS

Batch 7 must not be declared complete if any of these remain:

* generic old Broker dashboard still visible,
* generic Action Card grid remains as Overview,
* Requirement Feed missing,
* Requirement Feed shows all public Requirements instead of service-area scope,
* Feed filters dead,
* match counts fake,
* Hide not persistent,
* Proposal Sent card state fake,
* Proposal does not store selected listing,
* duplicate Proposal possible,
* Proposal created without required Lead/thread anchor,
* Proposal timeline fake,
* CRM Source fake,
* CRM filters local-only,
* bulk actions dead,
* CSV fake,
* Kanban drag visual-only,
* drag stage not persistent,
* mobile forced to use drag Kanban,
* Closed/Lost distinction missing,
* Follow-up accepts invalid dates,
* provider reminder delivery faked,
* Lead/Message N+1 patterns remain,
* analytics sample data displayed as real,
* no-data values zero-filled incorrectly,
* Featured marker fake,
* Broker plan limits not enforced server-side,
* verification trust badge activated by upload alone,
* service areas decorative only,
* Profile service-area change does not affect Feed,
* Requirement Feed alert preference not persistent,
* Daily Digest displayed active without scheduled infrastructure,
* old sidebar/navigation remains,
* missing mobile drawer,
* incorrect bottom nav,
* dead button,
* `href="#"`,
* text clipping,
* accidental wrapping,
* horizontal page overflow,
* modal/drawer clipping,
* console errors,
* RLS failures,
* no live browser verification.

---

# 230. FINAL ACCEPTANCE STATEMENT

**Design Batch 7 — Complete Broker Dashboard is complete only when the current conflicting Broker dashboard interface has been fully replaced and all Batch 7 screens, deltas, reused patterns and production functions work exactly according to the Batch 7 source design.**

Completion requires:

* exact Broker Overview,
* exact Broker navigation,
* exact mobile behavior,
* real matching Requirement count,
* service-area scoped Requirement Feed,
* real Feed filters,
* real listing matches,
* persistent Hide behavior,
* Proposal Sent state,
* complete Sent Proposal list,
* Proposal Detail,
* status timeline,
* listing-linked Send Proposal,
* duplicate Proposal protection,
* Lead/Proposal/Message consistency,
* complete CRM List,
* CRM bulk actions,
* real CSV export,
* complete 5-stage Kanban,
* drag/drop persistence,
* mobile non-drag fallback,
* Closed/Lost outcomes,
* complete CRM Lead Detail,
* real follow-up reminders,
* linked Listing and Proposal,
* real timeline,
* Batch 6 Messages parity,
* Batch 6 Site Visit parity,
* Batch 6 Saved parity,
* real conversion funnel,
* real listing ranking,
* honest missing-data display,
* honest Analytics Setup Required,
* real Broker billing limits,
* real Proposal usage,
* real Featured slot usage,
* Invoices,
* private Broker verification documents,
* optional RERA Agent flow,
* optional GST Certificate flow,
* service-area-driven Broker Profile,
* Broker Notification types,
* Broker Support FAQs,
* Requirement Feed alert settings,
* no fake data,
* no fake provider state,
* no dead UI,
* no old design remnants,
* no security leak,
* no RLS failure,
* no N+1 list architecture,
* complete desktop/mobile/tablet verification,
* complete live project verification.

Required implementation order:

**Screen 1 Overview → verify → Screens 2–4 Property/Requirement deltas → verify → Screen 5 Requirement Feed → verify → Screens 6–8 Proposals → verify → Screen 9 CRM List → verify → Screen 10 Kanban → verify → Screen 11 Lead Detail → verify → Screens 12–14 Reused Modules → verify → Screen 15 Analytics → verify → Screens 16–18 Billing/Invoices/Verification → verify → Screens 19–22 Profile/Notifications/Support/Settings → verify → complete Broker connected regression test.**

No screen passes merely because it visually renders.

**Exact Design + Real Data + Real Functionality + Database Persistence + Matching Logic + CRM Integrity + Security + RLS + Responsive Behavior + Live Verification must all pass.**
