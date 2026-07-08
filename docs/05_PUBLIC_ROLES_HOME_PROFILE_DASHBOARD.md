# docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md

# My Gujarat Property — Public Website, Roles, Homepage, Profiles And Dashboards

This document defines the public website experience, role-aware homepage/header/footer behavior, public profiles, user dashboards and role-specific user flows for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — build to match)

> Source of truth: the finished design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batches 1, 3, 4, 6, 7). Replicate these 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`. Build these features/behaviors even where older sections below don't mention them.

**Shell & navigation**
* Dashboard mobile bottom nav is LOCKED to 5 items: **Home · Search · Post (raised center teal FAB) · Leads · Profile**. The hamburger **drawer holds the FULL module list** (adds Recently Viewed, Verification, Support, Log out) — drawer ≠ the 5-item bottom nav.
* Sidebar/drawer nav items carry numeric **count badges** (e.g. My Properties [4] teal, Leads [3] red).
* Desktop lead detail = right drawer (480px); mobile = full page. Overflow (⋮) menus replace desktop button rows on mobile cards.

**Home & search (public)**
* Typo/transliteration-tolerant location autosuggest ("raj" → "Rajkot", grouped Cities/Localities); 6 popular-city chips incl. Bhavnagar; price-pin map markers; map fallback banner is dismissible AND the map toggle stays visible-but-disabled with tooltip "Map is not available yet".
* Recently-viewed strip has "Clear history" and is hidden entirely when logged out (never an empty shell). Save Search auto-saves after post-login (intent preservation). Missing-location form captures "Notify me at (email or mobile)".

**Owner/Broker/Builder dashboards**
* Personalized greeting ("Good morning, Rajesh") + insight sub-lines on stat cards; one card uses the gradient StatCardGradient. Honest empty metrics show "—" (e.g. "No visits scheduled yet"); plan-usage meter turns amber at 80%.
* Property cards show **listing expiry countdown** ("expires in 41 days") + per-listing lead count. Status-contextual row actions: Pending loses Pause; Paused gets Resume + "hidden from search while paused". Delete dialog names the listing AND warns its leads are removed.
* **Broker "For client" tag** — brokers can post requirements on behalf of a client (card shows a "For client" tag). Broker overview surfaces "N new requirements match your service areas"; service areas scope the Requirement Feed.
* Requirements integrate proposals: "5 proposals received", View proposals / Close / Reopen lifecycle.
* Profile: mobile number **locked** ("contact support to change"); **"Show my name on listings" privacy toggle** (Off shows "Owner"). Account deletion double-guard: type-to-confirm "DELETE" + OTP re-verify + 30-day grace. Data export SLA 48h; deletion cancel window 30 days; identity-confirm via OTP on masked number.
* Role-change request has a Withdraw button + "plan may change after approval". Support tickets carry IDs + status chips + category dropdown. Notifications center documents each item's deep-link target and groups Today/Earlier.
* Verification rejected state shows the reviewer's reason as a quoted message + Re-submit.
* Settings: per-channel notification matrix (Push/SMS/Email per event), theme Light/Dark/System, language English + "ગુજરાતી — Coming soon" (disabled).

Claude must read this file before implementing homepage, public UI, header, footer, login/register entry points, role-aware navigation, public profiles, owner dashboard, broker dashboard, builder dashboard, dashboard shell, notification UI, profile pages or dashboard module layouts.

No fake dashboard data is allowed.

No hidden contact leak is allowed.

No dead dashboard module is allowed.

No horizontal scroll is allowed.

---

## 1. Purpose

This file defines:

* public website structure
* guest user experience
* logged-in public user experience
* role-aware homepage behavior
* header behavior
* footer behavior
* city selector behavior
* public search entry behavior
* profile menu behavior
* public profile pages
* owner privacy rules
* broker public profile rules
* builder public microsite rules
* owner dashboard
* broker dashboard
* builder dashboard
* dashboard shell
* dashboard cards
* dashboard navigation
* dashboard notification rules
* dashboard billing/verification/analytics rules
* responsive layout rules
* profile management rules
* no fake data rules
* protected action rules
* SEO/privacy rules
* manual verification requirements

This file connects public UX and role-based dashboards.

---

## 2. Core Public UX Principles

The public website must follow these principles:

1. Public pages must be fast, clean and mobile-first.
2. Guest users can browse/search public-safe content.
3. Guest users cannot reveal hidden contact.
4. Protected actions must open login/register popup.
5. Logged-in users must see role-aware navigation.
6. Owner, Broker and Builder must each see relevant dashboard links.
7. Admin/staff links must not appear in the public header.
8. Public footer appears on public pages only.
9. Dashboard pages must not show the public footer unless explicitly needed.
10. Header must not break or wrap badly.
11. Brand text **My Gujarat Property** must not wrap awkwardly.
12. Public data must be real.
13. No fake counts.
14. No fake property/project/lead/analytics data.
15. No fake verified badge.
16. No hidden phone/contact leak.
17. Public pages must be SEO-safe.
18. Private dashboard pages must be noindex.
19. Every dashboard module must be clickable or safely disabled/setup-required with reason.
20. Responsive checks are mandatory at required widths.

---

## 3. Public Website Areas

The public website includes:

* homepage
* search page
* property detail pages
* project detail pages
* public broker profiles
* public builder profiles/microsites
* safe public owner profile where allowed
* city/locality/type SEO pages
* blog
* CMS pages
* legal pages
* help/support pages
* contact page
* pricing page if public
* login/register popup
* inquiry/contact popup
* report form
* public ads/promotions
* public notification/deep-link fallback pages where needed

Public pages must never expose:

* dashboard private data
* leads
* messages
* private profile fields
* hidden contact numbers
* private documents
* payment/invoice data
* admin/staff details
* audit logs
* provider config
* service role information

---

## 4. Public Website Route Scope

Recommended public route examples:

```txt id="public-route-scope"
/
 /search
 /property/[slug]
 /project/[slug]
 /profile/[slug]
 /broker/[slug]
 /builder/[slug]
 /city/[citySlug]
 /city/[citySlug]/[typeSlug]
 /locality/[citySlug]/[localitySlug]
 /blog
 /blog/[slug]
 /about
 /contact
 /help
 /support
 /faq
 /pricing
 /terms
 /privacy
 /cookie-policy
 /refund-policy
 /cancellation-policy
 /listing-policy
 /advertising-policy
 /verification-policy
 /payment-policy
 /disclaimer
 /grievance
```

Actual route names may change during implementation, but behavior must remain consistent.

---

## 5. Homepage Scope

Homepage is the main public entry point.

Homepage must include:

* role-aware header
* city selector
* public search section
* hero/search area
* public-safe marketplace sections
* approved active ads where implemented
* real property/project sections where implemented
* legal/trust/safety hints
* public footer
* login/register entry for guests
* dashboard/profile entry for logged-in users
* responsive mobile layout

Homepage must not include:

* fake listing count
* fake city count
* fake lead count
* fake testimonials
* fake verified users
* fake “No.1” claim
* hidden contact numbers
* private dashboard data
* admin/staff links
* dead CTA
* `href="#"`
* fake provider-dependent widgets

---

## 6. Existing Homepage Design Preservation Rule

Existing project context says:

* guest + owner homepage header/city selector are already considered ready
* old homepage hero copy/section should be used only as **Hero Search Section**
* old hero/search section should appear below existing header
* preserve existing design if user says existing design is ready
* do not replace working header/city selector unnecessarily
* do not introduce AI/API/maps/WhatsApp/OTP/payment/Cloudflare before relevant phase/provider setup
* do not remove working homepage elements without approval

Claude must inspect current implementation before changing homepage.

---

## 7. Homepage Hero / Search Section

Hero/search section must:

* communicate real estate marketplace purpose
* focus on Gujarat property search
* allow search by city/locality/type/purpose
* route search to `/search`
* work on mobile
* use readable text
* avoid huge layout shift
* use optimized media if any
* avoid fake suggestions unless real/configured
* show setup-required/fallback for provider-backed features
* not block page render on maps/GeoIP/provider
* preserve existing approved design

Search fields may include:

* location
* purpose
* property/project type
* budget
* keyword
* BHK/unit type where relevant
* search button

Search button must be real and route to `/search`.

No dead search.

---

## 8. City Selector Scope

City selector must:

* be visible in public header/homepage where required
* allow user to select city
* support Gujarat cities
* preserve manual selection
* not require GeoIP
* use GeoIP/IP fallback only if provider configured
* show nearby fallback where implemented
* update homepage/search/ad context
* not break layout on mobile
* not wrap brand/header badly
* not show fake unsupported city data
* allow missing city request where implemented

City selector states:

* loading
* selected city
* no city selected
* city list unavailable
* provider fallback/manual mode
* setup-required if GeoIP provider is required but missing
* missing city request success/pending where implemented

---

## 9. Public Header Scope

Public header must be role-aware.

Header must include, as applicable:

* brand/logo text: **My Gujarat Property**
* city selector
* search entry
* navigation links
* login/register for guest
* profile/avatar menu for logged-in user
* dashboard link for logged-in user
* notification bell for logged-in user
* role-aware CTA
* theme toggle where implemented
* mobile menu
* logout in profile menu

Header must not include:

* admin/staff links for public users
* hidden contact numbers
* fake notification counts
* broken dropdowns
* dead links
* `href="#"`
* wrapping brand text
* horizontal overflow
* too-small tap targets

---

## 10. Header Behavior By Role

## 10.1 Guest Header

Guest header should show:

* brand
* city selector
* search/navigation
* login/register
* public post/list CTA may open auth popup
* mobile menu

Guest header protected CTAs:

| CTA              | Behavior                                                |
| ---------------- | ------------------------------------------------------- |
| Post Property    | open auth/register popup                                |
| Post Requirement | open auth/register popup                                |
| Post Project     | open auth/register popup, explain builder role required |
| Inquiry          | open auth/register popup                                |
| Save             | open auth/register popup or local save if implemented   |
| Dashboard        | open auth/login popup                                   |

Guest header must not show:

* dashboard direct access
* notification bell with fake count
* profile menu
* admin/staff link

---

## 10.2 Owner Header

Owner header should show:

* brand
* city selector
* search/navigation
* owner dashboard link
* post property CTA
* post requirement CTA
* notification bell
* profile/avatar menu
* logout
* theme option

Owner header must not show:

* post project CTA as primary allowed action
* admin/staff link
* broker-only module link
* builder ads/agents link

If owner clicks post project:

* show role restriction
* explain builder role required
* allow role change request if feature exists

---

## 10.3 Broker Header

Broker header should show:

* brand
* city selector
* search/navigation
* broker dashboard link
* post property CTA
* post requirement CTA
* requirement feed/proposals where appropriate
* notification bell
* profile/avatar menu
* logout
* theme option

Broker header must not show:

* builder project CTA as allowed primary action
* builder agents/ads primary link
* admin/staff link

If broker clicks post project:

* show role restriction
* explain builder role required
* allow role change request if feature exists

---

## 10.4 Builder Header

Builder header should show:

* brand
* city selector
* search/navigation
* builder dashboard link
* post project CTA
* project leads link where appropriate
* ads/promotions link where appropriate
* notification bell
* profile/avatar menu
* logout
* theme option

Builder header must not show:

* post normal property CTA as allowed primary action
* owner/broker property posting as primary allowed action
* admin/staff link

If builder clicks post property:

* show role restriction
* explain owner/broker role required
* allow role change request if feature exists

---

## 10.5 Admin/Staff Public Header Rule

Admin/staff users should not operate through public marketplace role header unless explicitly designed.

Rules:

* admin/staff should use internal admin/staff panel
* public header should not expose admin modules
* admin/staff login separate
* admin/staff routes noindex
* public session and internal session boundaries must be clear

If internal user opens public page:

* show public website normally
* do not leak admin controls publicly
* admin quick link may be shown only if safe and role-authenticated, but public SEO/users must never see it
* avoid mixing public user role actions with internal admin identity

---

## 11. Mobile Header Rules

Mobile header must:

* fit 320px width
* no horizontal scroll
* brand does not wrap badly
* city selector does not break layout
* menu button large enough
* login/profile button usable
* sticky header does not cover content
* menu drawer/bottom sheet scrolls safely
* body scroll locks when menu open
* outside tap closes menu
* back closes menu first where implemented
* dropdowns do not overflow
* role CTAs visible but not cramped
* no accidental clicks during scroll

Mobile menu must show role-aware links only.

---

## 12. Public Footer Scope

Public footer must appear on public pages such as:

* homepage
* search
* public detail pages
* public profile pages
* blog
* CMS pages
* legal pages
* help/contact pages
* pricing page

Public footer should include:

* brand
* short marketplace disclaimer
* public navigation links
* city/location links where real
* property/project category links where real
* help/support links
* legal links
* social/contact links where configured
* copyright
* grievance/support info where required

Public footer must include legal links:

* Terms & Conditions
* Privacy Policy
* Cookie Policy
* Refund Policy
* Cancellation Policy
* Listing Policy
* Advertising Policy
* Verification Policy
* Payment Policy
* Disclaimer
* Grievance/Support Policy

Footer must not show:

* fake city/listing counts
* hidden contacts
* private dashboard links
* admin/staff links
* broken links
* pages that do not exist without disabled/setup-required state
* fake social links

---

## 13. Footer Hidden Rules

Footer should be hidden or replaced with dashboard shell footer on:

* owner dashboard pages
* broker dashboard pages
* builder dashboard pages
* admin/staff pages
* full-screen forms where dashboard shell handles layout
* private feature pages where public footer would distract or create layout issues

Dashboard pages need role navigation, not public footer.

---

## 14. Public Search Entry Points

Search can start from:

* homepage hero
* header search
* city selector
* category card
* property type card
* project type card
* SEO location link
* public CTA
* saved search deep link
* ad/sponsored module where safe

All public search entry points must route to `/search` with query params.

Search links must not be dead.

No `href="#"`.

---

## 15. Public Protected Actions

Protected actions must require login/register.

Protected actions include:

* contact reveal
* inquiry
* save to account
* post property
* post requirement
* post project
* send proposal
* request site visit
* message user
* claim profile
* submit verification
* subscribe/checkout
* access dashboard
* report with account where required
* support ticket where account required

Behavior:

1. guest clicks protected action
2. auth popup opens
3. original intent saved
4. after auth, continue action if role allowed
5. if role not allowed, show role restriction
6. no private data revealed before auth
7. no hidden contact fetched in public payload

---

## 16. Public Profile Types

Public profile pages may include:

* owner public-safe profile
* broker public profile
* builder public profile/microsite
* agent profile where implemented
* verified business profile
* claimed profile state where implemented

Public profile must be SEO-safe and privacy-aware.

---

## 17. Owner Public Profile Rules

Owner profile privacy is stricter.

Owner public profile may show:

* display name or masked name
* profile photo if user allows
* public listed properties where allowed
* verification badge only if real
* general city/service area if allowed
* contact/inquiry CTA without exposing hidden contact

Owner public profile must not show by default:

* private mobile
* private email
* full address
* private documents
* private leads
* private verification details
* owner dashboard data
* hidden contact
* internal notes

Owner may choose privacy settings where implemented.

If owner profile is not public:

* uploader profile link may show safe limited profile or contact through listing only
* detail page must not leak owner private info

---

## 18. Broker Public Profile Rules

Broker public profile may show:

* broker name
* agency name
* profile photo/logo
* public slug
* city/service areas
* office location public-safe
* experience years
* bio
* languages
* specialties
* verification badge if real
* public active property listings
* public requirements only if intended
* contact/inquiry CTA
* report profile CTA
* claim profile CTA where relevant
* reviews only if real and implemented
* legal disclaimer

Broker public profile must not show:

* private phone if hidden
* private email if hidden
* private documents
* private leads
* CRM data
* payment/subscription status
* unapproved listings
* fake verified badge
* fake reviews/counts

Broker profile SEO:

* title/meta/canonical safe
* no hidden contact
* no fake review schema
* no fake rating
* no fake listing count

---

## 19. Builder Public Profile / Microsite Rules

Builder public profile/microsite may show:

* company name
* logo
* public slug
* company overview
* office/service areas
* active approved projects
* completed projects where real
* project gallery
* RERA/developer info where real
* verification badge if real
* contact/inquiry CTA
* report profile CTA
* claim profile CTA where relevant
* project filters
* legal/RERA disclaimer
* public social/website links if configured and safe

Builder public profile must not show:

* private documents
* private RERA proof files
* private payment/subscription status
* private leads
* private project drafts
* unapproved projects
* fake completed projects
* fake RERA/verified badge
* fake analytics
* hidden contact to guest if contact is protected
* internal admin notes

Builder microsite should be SEO-safe and real-data only.

---

## 20. Profile Image Rules

Profile image system must support:

* upload
* crop
* preview
* remove
* replace
* fallback initials/avatar
* optimized versions
* no distortion
* safe file type validation
* upload progress
* upload failure state
* setup-required state if storage missing
* public/private visibility rules

Supported image formats should follow media upload docs.

Profile image must not:

* use broken image
* stretch faces/logos
* upload unsafe file
* show fake upload success
* expose private storage URL
* cause layout shift

---

## 21. Profile Management Rules

Public users can manage their own profile.

Common profile fields:

* full name
* email
* mobile
* profile photo
* role
* preferred language
* city/location
* contact preferences
* notification preferences
* theme preference
* privacy settings
* verification status
* account status

Role-specific profile fields:

Owner:

* display name
* privacy level
* preferred city
* contact preference

Broker:

* agency name
* office address
* service areas
* experience
* specialties
* bio
* verification docs/status

Builder:

* company name
* company logo
* office address
* website
* RERA/developer details
* business verification
* team/agents

Profile update rules:

* user can edit own profile
* role changes require request/approval
* mobile change requires OTP verification
* email change requires verification where implemented
* public slug uniqueness enforced
* public fields validated
* private fields not exposed publicly
* verification-impacting changes may require review
* profile changes logged where sensitive

---

## 22. Role Change Request From Profile

User can request role change where implemented.

Role change flow:

1. user opens profile/settings
2. clicks role change request
3. warning shown
4. user selects desired role
5. user enters reason
6. plan/listing impact shown
7. verification impact shown
8. user submits request
9. admin reviews
10. approve/reject/need changes
11. user notified
12. dashboard access changes after approval

Role change must not:

* happen instantly without approval unless future rule allows
* delete existing data silently
* expose old role data after change
* bypass plan/payment rules
* create duplicate role profiles incorrectly

---

## 23. Dashboard Shell Principles

All public user dashboards must share a consistent shell.

Dashboard shell includes:

* role-aware sidebar/bottom nav
* top bar
* notification bell
* profile menu
* search/filter where relevant
* quick action button
* help/support access
* breadcrumb/page title
* content area
* mobile bottom navigation or drawer
* loading/empty/error states
* no public footer
* theme toggle
* logout

Dashboard shell must be:

* mobile-first
* responsive
* no horizontal scroll
* no overlap
* cards instead of tables on mobile
* accessible
* fast
* role-aware
* secure
* no fake data

---

## 24. Dashboard Global Rules

Every dashboard must:

* require login
* require correct role
* block direct URL bypass
* use RLS-safe data
* show own data only
* show real counts only
* show empty state when no data
* show setup-required when provider missing
* show subscription-required when plan missing
* show verification-required when verification required
* show approval-pending where content pending
* prevent duplicate submits
* provide loading states
* provide error states
* provide disabled reasons
* support search/filter
* support pagination/lazy loading
* support edit/update/delete/draft/pause/schedule where applicable
* provide help/support
* provide logout
* provide light/dark/system theme where implemented

Dashboard must not:

* show fake analytics
* show fake leads
* show fake views
* show fake payments
* show fake notifications
* show fake verified badge
* show other user’s private data
* expose hidden contact unauthorized
* use public footer
* have dead modules
* have dead buttons
* use `href="#"`
* show admin links

---

## 25. Dashboard Responsive Rules

Dashboard must work at:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

Dashboard responsive behavior:

* sidebar collapses to bottom nav/drawer on mobile
* table becomes cards
* filters become bottom sheet
* actions become dropdown/bottom sheet
* cards stack cleanly
* no horizontal scroll
* no overlapping sticky buttons
* top bar stays readable
* notification dropdown becomes bottom sheet
* forms use full width on mobile
* modals become bottom sheets where appropriate
* large analytics charts lazy-load or stack
* tap targets large enough
* brand/dashboard title no bad wrapping

---

## 26. Dashboard UI State Requirements

Every dashboard module must include:

### Loading State

* skeleton or spinner
* no blank screen
* no layout jump
* no infinite loading without fallback

### Empty State

* clear message
* role-specific next action
* no fake data
* no fake count

### Error State

* safe error
* retry action
* no raw SQL/provider error
* support link where relevant

### Unauthorized State

* safe forbidden page/message
* redirect if guest
* no private data in response

### Setup-Required State

* provider missing message
* feature disabled or limited
* no fake success

### Disabled State

* reason shown
* link to plan/verification/profile/support where relevant

---

## 27. Owner Dashboard Scope

Owner dashboard is for property owners.

Recommended owner dashboard modules:

1. Overview
2. My Properties
3. Post Property
4. My Requirements
5. Post Requirement
6. Leads / Inquiries
7. Messages
8. Site Visits
9. Saved Properties / Projects
10. Saved Searches
11. Recently Viewed
12. Analytics
13. Billing / Subscription
14. Invoices
15. Verification
16. Profile
17. Notifications
18. Support / Help
19. Settings
20. Logout

All modules must be clickable or disabled with reason.

---

## 28. Owner Dashboard Overview

Owner overview may show:

* active properties count
* pending approval properties count
* paused properties count
* active requirements count
* new leads count
* upcoming site visits
* unread messages
* unread notifications
* current plan status
* profile completion
* verification status
* quick actions:

  * post property
  * post requirement
  * view leads
  * complete profile
  * subscribe/upgrade

Rules:

* counts must be real
* no fake analytics
* if no data, show empty state
* if plan missing, show subscription-required
* if provider missing, show setup-required
* owner only sees own data

---

## 29. Owner My Properties

Owner property list must support:

* list own properties
* status filter
* search
* sort
* edit
* preview
* pause
* resume
* delete/soft delete
* duplicate/repost where implemented
* view leads
* view analytics
* approval status
* need changes reason
* rejected reason
* expiry status
* payment/plan limitation

Owner property actions:

| Action     | Rule                                                |
| ---------- | --------------------------------------------------- |
| Edit       | own property only, may require reapproval           |
| Pause      | own property only, no approval if no content change |
| Resume     | own property only                                   |
| Delete     | soft delete                                         |
| Preview    | public-safe preview                                 |
| View Leads | own leads only                                      |
| Analytics  | real only                                           |

No owner can edit another user’s property.

---

## 30. Owner Requirements

Owner requirements module must support:

* create requirement
* save draft
* submit for approval
* list own requirements
* edit/update
* pause/resume
* delete/soft delete
* view proposals where allowed
* view matches where implemented
* status filter
* expiry/renewal
* privacy/contact settings

Owner requirement data must be private/scoped.

---

## 31. Owner Leads And CRM

Owner leads module must show:

* leads generated from owner properties/requirements
* inquiry source
* contact reveal source
* proposal source
* site visit source
* status/stage
* contact consent/reveal status
* follow-up
* notes
* messages
* site visits
* duplicate prevention

Owner must not see:

* other owner leads
* broker/private CRM data
* builder project leads unless related
* hidden contact data outside allowed reveal

---

## 32. Broker Dashboard Scope

Broker dashboard is for brokers/agents.

Recommended broker dashboard modules:

1. Overview
2. My Properties
3. Post Property
4. My Requirements
5. Post Requirement
6. Requirement Feed
7. Proposals
8. Leads / CRM
9. Messages
10. Site Visits
11. Saved Items
12. Saved Searches
13. Analytics
14. Billing / Subscription
15. Invoices
16. Verification
17. Profile
18. Notifications
19. Support / Help
20. Settings
21. Logout

All modules must be clickable or disabled with reason.

---

## 33. Broker Dashboard Overview

Broker overview may show:

* active listings
* pending approval listings
* active requirements
* proposals sent
* new leads
* follow-ups due
* upcoming site visits
* unread messages
* unread notifications
* plan status
* verification status
* profile completion
* quick actions:

  * post property
  * post requirement
  * view requirement feed
  * view CRM
  * upgrade plan

Rules:

* real data only
* no fake leads/proposals
* no fake analytics
* broker sees own/scoped data only
* requirement feed must be permission-scoped

---

## 34. Broker My Properties

Broker property management is similar to owner but broker-specific.

Broker can:

* list own properties
* create property
* edit own property
* pause/resume
* delete/soft delete
* upload allowed media
* manage inquiries
* view listing analytics
* view approval status
* handle need-changes/rejected reason

Broker cannot:

* edit owner’s listing unless owned/authorized
* post builder project
* fake property owner status
* bypass plan/verification gates

---

## 35. Broker Requirement Feed

Requirement feed must show only allowed requirements.

Requirement feed should support:

* filters
* search
* location
* budget
* type
* urgency
* proposal action
* save/shortlist
* contact/proposal privacy rules
* empty state
* pagination

Requirement feed must not:

* show unauthorized private requirements
* show hidden contact unless allowed
* show fake match score
* show fake count
* allow duplicate proposals
* load unbounded data

---

## 36. Broker Proposals

Broker proposals module must support:

* sent proposals
* viewed proposals
* shortlisted
* accepted
* rejected
* negotiation
* withdrawn
* expired
* duplicate prevention
* messages
* follow-ups
* status filters

Proposal statuses must be real.

No fake viewed/accepted status.

---

## 37. Broker Leads / CRM

Broker CRM must support:

* lead list
* Kanban/list where implemented
* stages:

  * New
  * Contacted
  * Interested
  * Follow-up
  * Site Visit
  * Converted
  * Lost
  * Closed
* notes
* tags
* source
* follow-up date
* duplicate detection
* site visit
* messages
* assignment where implemented
* filters/search
* real analytics

Broker must see only own/scoped leads.

---

## 38. Builder Dashboard Scope

Builder dashboard is for builders/developers.

Recommended builder dashboard modules:

1. Overview
2. My Projects
3. Post Project
4. Unit Inventory
5. Project Leads
6. Matching Requirements
7. Proposals
8. Messages
9. Site Visits
10. Agents / Team
11. Agent Permissions
12. Ads / Promotions
13. Analytics
14. Billing / Subscription
15. Invoices
16. Verification
17. RERA / Project Proof
18. Profile / Microsite
19. Notifications
20. Support / Help
21. Settings
22. Logout

All modules must be clickable or disabled with reason.

---

## 39. Builder Dashboard Overview

Builder overview may show:

* active projects
* pending approval projects
* need changes projects
* active units
* new project leads
* matching buying requirements
* active ads
* ad approval/payment status
* unread messages
* unread notifications
* plan status
* verification status
* RERA status summary
* profile/microsite completion
* quick actions:

  * post project
  * view project leads
  * manage units
  * create promotion
  * add agent
  * upgrade plan

Rules:

* real data only
* no fake project leads
* no fake unit counts
* no fake ad analytics
* no fake RERA/verified status
* builder sees own project data only
* agents see assigned data only

---

## 40. Builder My Projects

Builder project list must support:

* list own projects
* create project
* draft
* preview
* submit for approval
* edit/update
* reapproval after edit
* pause/resume
* delete/soft delete
* manage units/inventory
* manage media
* manage brochure/floor plans
* manage progress updates
* manage leads
* manage ads
* approval status
* need changes reason
* rejected reason
* RERA status
* possession/phase status
* filters/search

Builder cannot edit another builder’s project.

---

## 41. Builder Unit Inventory

Unit inventory must support:

* project selection
* wing/tower selection
* floor selection
* unit list
* unit type/BHK
* area
* price
* status
* available/booked/sold/hold/not released
* bulk update where permitted
* audit logs
* public-safe availability summary
* private internal notes hidden from public

Unit inventory must be lazy-loaded and paginated/batched where needed.

---

## 42. Builder Matching Requirements

Builder may see matching buying requirements where allowed.

Rules:

* only allowed/scoped requirements
* no private unauthorized data
* no hidden contact unless reveal/permission allows
* match score must be explainable if shown
* no fake AI recommendation
* proposal/contact actions must follow auth/role/privacy rules
* filters/pagination required

---

## 43. Builder Agents / Team

Builder agents module must support:

* invite agent
* list agents
* assign permissions
* assign projects/leads
* pause/remove agent
* seat limits by plan
* audit permission changes
* expiry of invites
* agent dashboard access where implemented

Agent permissions may include:

* view assigned projects
* view assigned leads
* respond to messages
* update lead status
* schedule site visits
* view limited analytics
* upload/update content only if permitted
* no billing/provider/admin access

Agent must not see unassigned builder data.

---

## 44. Builder Ads / Promotions

Builder ads dashboard must support:

* select own approved/published project
* upload desktop banner
* upload tablet banner
* upload mobile banner
* choose target all Gujarat or selected cities
* preview ad
* submit for approval
* view approval status
* view need-changes/rejected reason
* pause/resume
* edit/update/delete
* payment status
* active/not expired status
* real impressions/clicks
* fraud/click notes where implemented
* RERA/policy disclosure

Ad module must show setup-required if:

* payment provider missing
* media provider missing
* city targeting provider missing where required
* analytics/impression tracking not implemented

No fake active paid ad.

---

## 45. Dashboard Notifications

All logged-in public roles may have notification bell.

Notification UI must show:

* real unread count
* latest notifications
* mark read
* mark all read
* notification center link
* deep links
* empty state
* mobile bottom sheet
* loading state
* error state

Notification examples:

Owner:

* property approved/rejected/need changes
* requirement approved/rejected/need changes
* new inquiry
* contact reveal
* proposal received
* site visit update
* plan expiry
* verification status

Broker:

* property approval updates
* requirement approval updates
* requirement match
* proposal viewed/accepted/rejected
* new lead
* follow-up due
* site visit update
* plan expiry
* verification status

Builder:

* project approval updates
* new project lead
* matching buying requirement
* ad approval/payment/expiry
* RERA/verification update
* agent invite/status
* plan expiry
* site visit update

No fake unread count.

External delivery must depend on provider status.

---

## 46. Dashboard Analytics Rules

Analytics may include:

* listing views
* project views
* leads
* inquiries
* contact reveals
* proposal status
* conversion
* ad impressions/clicks
* saved items
* search exposure
* profile views
* city/locality performance

Rules:

* analytics must be real only
* empty state if no data
* setup-required if tracking not implemented
* no fake charts
* no fake views
* no fake leads
* date filters
* role-scoped access
* no other user analytics
* analytics events must respect privacy
* dashboard cards must not invent counts

---

## 47. Dashboard Billing Rules

Dashboard billing module must show:

* current plan
* plan status
* expiry/grace
* usage limits
* upgrade/downgrade CTA
* invoices
* payment history
* failed/pending payment state
* subscription-required state
* trial state
* coupon/add-on where implemented

Rules:

* real subscription only
* no fake active plan
* payment success only after verified payment
* invoice only after verified payment
* role-specific plan limits
* setup-required if Razorpay missing
* billing data scoped to user

---

## 48. Dashboard Verification Rules

Verification module must show:

* current verification status
* required documents
* upload status
* submitted/under review/need changes/rejected/approved/revoked/expired
* review note
* resubmit action
* legal disclaimer
* privacy notice
* access logs where appropriate
* role-specific verification fields

Rules:

* verified badge only after real approval
* no fake badge
* private documents private
* upload provider setup-required if missing
* verification changes audited
* edit/delete rules according to status
* badge not legal guarantee

---

## 49. Dashboard Support / Help

Dashboard support module must support:

* create support ticket
* category
* priority
* description
* attachments where safe
* ticket status
* replies
* notifications
* reopen where allowed
* satisfaction feedback where implemented
* help articles/FAQ links

Support ticket access:

* user sees own tickets
* support staff/admin sees assigned/scoped tickets
* attachments private where needed

---

## 50. Dashboard Settings

Settings may include:

* profile settings
* account settings
* privacy settings
* notification preferences
* language preference
* theme:

  * light
  * dark
  * system
* saved searches
* login/session settings
* role change request
* data export/delete request where implemented
* logout

Settings must be role-safe.

Critical settings changes may require re-auth/OTP where implemented.

---

## 51. Dashboard List Actions

List modules must support relevant actions:

* view
* edit
* preview
* duplicate where allowed
* pause
* resume
* delete/soft delete
* restore where allowed
* submit for approval
* withdraw
* archive
* mark read
* assign where allowed
* export where allowed
* filter
* sort
* search

Each action must:

* be authorized server-side
* be ownership/role checked
* show loading state
* prevent duplicate submit
* show success/error
* update data/revalidate
* audit if sensitive
* not expose private data

---

## 52. Dashboard Search And Filters

Dashboard search/filter must support:

* keyword search
* status filter
* date filter
* type filter
* location filter where relevant
* lead stage filter
* payment status filter
* approval status filter
* assigned agent filter where relevant
* sort
* pagination

Rules:

* no unbounded reads
* filters indexed where needed
* mobile filters in bottom sheet
* clear filters button
* query params where useful
* real counts only
* no fake result count

---

## 53. Profile Menu

Profile/avatar menu must include:

* user name
* role badge
* profile link
* dashboard link
* notifications
* billing
* settings
* support
* theme option
* logout

Profile menu must not include:

* admin/staff link for public users
* provider status
* secret/internal settings
* fake role badge
* hidden contact values

Mobile profile menu should be easy to tap.

---

## 54. Logout Rules

Logout must:

* clear session
* redirect to homepage or previous safe public page
* hide dashboard/profile UI
* show login/register again
* not leave private data cached visually
* clear sensitive local state
* not break guest public page
* work from dashboard/profile menu

Admin/staff logout separate where internal session exists.

---

## 55. Saved Items, Saved Searches And Recently Viewed

Saved items may include:

* saved properties
* saved projects
* saved profiles
* saved requirements where allowed
* saved searches
* recently viewed

Rules:

* guest may store local-only saved/recent state where implemented
* after login, local saved state may sync with consent/confirmation
* user sees own saved items only
* no private data in saved item card
* deleted/unpublished items hidden or show unavailable
* saved search alerts depend on notification providers
* no fake alert delivery

---

## 56. Public Ads In Home/Profile/Dashboard Context

Public pages may show ads/promotions if:

* ad approved
* paid where required
* active
* not expired
* project approved/published
* city targeting matches
* sponsored label shown
* RERA disclosure where applicable
* media exists
* no fraud block

Dashboards may show:

* builder ad status
* ad performance real only
* payment/setup-required state
* approval status
* active/expired state

No fake impressions/clicks.

---

## 57. SEO Rules For Public And Dashboard Pages

Public pages:

* title/meta/canonical
* schema safe
* public-safe data only
* no hidden contact
* no fake count
* no fake review/rating
* no private data
* sitemap inclusion only if useful

Dashboard/private pages:

* noindex
* not in sitemap
* private
* not publicly cached

Admin/staff pages:

* noindex
* robots disallow
* not in sitemap
* protected

---

## 58. Accessibility Rules

Public and dashboard UI must support:

* keyboard focus
* accessible labels
* focus visible
* modal focus behavior
* readable form errors
* good contrast
* alt text for images
* button names
* large tap targets
* no mouse-only critical actions
* logical heading hierarchy
* mobile screen reader-friendly structure where practical

Accessibility issues must be tracked as bugs if blocking.

---

## 59. Performance Rules For Public And Dashboards

Public pages:

* optimized images
* lazy media
* cached public-safe data
* no heavy provider blocking render
* no unbounded queries
* no fake counts

Dashboards:

* summary first
* modules lazy-loaded
* paginated lists
* no full dashboard reload for small updates
* real analytics lazy
* notifications indexed
* charts lazy-loaded
* mobile smooth

Admin/staff links must not load in public header.

---

## 60. Security Rules For Public And Dashboards

Security requirements:

* server-side auth checks
* RLS
* role checks
* ownership checks
* direct URL protection
* hidden contact protection
* private document protection
* provider secrets never exposed
* dashboard data not cached publicly
* safe errors
* log redaction
* audit logs for sensitive actions
* rate limits for abuse-sensitive actions

Security bugs block PASS.

---

## 61. Public And Dashboard Manual Verification Checklist

Manual verification must check:

### Public

* homepage loads
* header role-aware
* city selector works
* search routes to `/search`
* public footer appears
* legal links work
* guest protected action opens auth popup
* no hidden contact leak
* no fake counts
* no dead CTA
* responsive at required widths

### Guest

* can browse/search
* cannot reveal contact
* cannot access dashboard
* cannot access admin
* auth popup preserves intent

### Owner

* header shows owner actions
* owner dashboard accessible
* owner cannot post project
* owner sees own data only
* owner modules clickable/safe

### Broker

* header shows broker actions
* broker dashboard accessible
* broker cannot post project
* broker sees own/scoped data only
* broker modules clickable/safe

### Builder

* header shows builder actions
* builder dashboard accessible
* builder can post project
* builder cannot post normal property
* builder sees own project data only
* builder modules clickable/safe

### Dashboard

* no public footer
* no fake data
* loading/empty/error/setup-required states
* notifications real
* billing real/setup-required
* analytics real/setup-required
* mobile layout works
* direct URL bypass blocked

### Public Profiles

* broker profile public-safe
* builder profile public-safe
* owner privacy safe
* no hidden contact leak
* no fake verified badge
* SEO safe

---

## 62. Required Dashboard Feature Registry Items

`FEATURE_REGISTRY.md` must track:

* public homepage
* role-aware header
* city selector
* public footer
* public search entry
* protected action auth popup
* guest public browsing
* owner header behavior
* broker header behavior
* builder header behavior
* profile menu
* logout
* public broker profile
* public builder profile/microsite
* owner privacy profile
* owner dashboard shell
* owner overview
* owner properties module
* owner requirements module
* owner leads module
* owner billing module
* owner verification module
* broker dashboard shell
* broker overview
* broker properties module
* broker requirements module
* broker requirement feed
* broker proposals
* broker CRM
* builder dashboard shell
* builder overview
* builder projects module
* builder unit inventory
* builder matching requirements
* builder agents/team
* builder ads/promotions
* dashboard notifications
* dashboard analytics
* dashboard support
* dashboard settings
* responsive dashboard layout
* no footer dashboard rule

Each item must have real status.

---

## 63. Common Bugs To Track

Create bugs if:

* brand wraps badly
* header overflows
* city selector breaks mobile
* login/register still visible after login
* wrong role CTA shown
* owner can access builder dashboard
* broker can access builder project posting
* builder can access property posting
* guest accesses dashboard
* admin link visible publicly
* public footer appears in dashboard causing layout issue
* dashboard module dead
* dashboard shows fake count
* dashboard shows fake analytics
* notification unread count fake
* hidden contact appears
* public profile leaks private email/phone
* verified badge appears without approval
* mobile horizontal scroll
* cards overlap
* table not responsive
* popup not closable
* drawer background scrolls
* profile image upload fakes success
* setup-required provider action shows success
* public profile SEO includes private data
* dashboard private data cached publicly
* direct URL bypass works

---

## 64. Implementation Order For Public/Profile/Dashboard Phase

Recommended order:

1. inspect existing public layout/header/footer
2. preserve existing approved homepage/header/city selector
3. define role-aware navigation config
4. create/adjust public layout
5. create protected action auth intent helper
6. create profile menu shell
7. create public footer with legal links
8. create public profile route structure
9. create public-safe profile data mapping
10. create dashboard shell
11. create owner dashboard shell/modules
12. create broker dashboard shell/modules
13. create builder dashboard shell/modules
14. create notification bell UI state
15. create billing/analytics/verification setup-required/empty states
16. add responsive mobile nav/bottom nav/drawers
17. add route guards
18. add noindex for dashboards
19. add loading/error/empty states
20. update docs
21. run manual verification

---

## 65. Data And RLS Expectations

Public/profile/dashboard phase may require:

* public-safe profile views
* dashboard role queries
* notification queries
* saved items queries
* dashboard summary queries
* ownership filters
* role guards
* RLS policies
* noindex metadata
* public-safe search/profile data

Rules:

* public views exclude private fields
* dashboards query private data only for owner
* dashboard queries not globally cached
* direct URL denied
* RLS tested where DB exists
* no hidden contact in public payload

---

## 66. Provider Setup-Required Expectations

This phase may expose provider-dependent UI.

Provider-dependent UI must show setup-required/fallback for:

* OTP auth if not configured
* notifications external delivery
* profile image upload if storage missing
* analytics if tracking missing
* billing/payment if Razorpay missing
* maps/GeoIP if provider missing
* media/CDN if R2 missing
* email/SMS/WhatsApp if missing

No fake provider success.

---

## 67. Current Public/Profile/Dashboard Status

As of this documentation generation stage:

| Area                                       | Status                   |
| ------------------------------------------ | ------------------------ |
| Public homepage                            | `NOT_STARTED`            |
| Existing header/city selector preservation | `DOCUMENTED_REQUIREMENT` |
| Hero/search section                        | `NOT_STARTED`            |
| Public header role-aware behavior          | `NOT_STARTED`            |
| Public footer                              | `NOT_STARTED`            |
| Guest browsing                             | `NOT_STARTED`            |
| Protected action auth popup                | `NOT_STARTED`            |
| Public broker profile                      | `NOT_STARTED`            |
| Public builder profile/microsite           | `NOT_STARTED`            |
| Owner privacy profile                      | `NOT_STARTED`            |
| Owner dashboard                            | `NOT_STARTED`            |
| Broker dashboard                           | `NOT_STARTED`            |
| Builder dashboard                          | `NOT_STARTED`            |
| Dashboard notifications                    | `NOT_STARTED`            |
| Dashboard analytics                        | `SETUP_REQUIRED`         |
| Dashboard billing                          | `SETUP_REQUIRED`         |
| Dashboard verification                     | `NOT_STARTED`            |
| Profile image upload                       | `SETUP_REQUIRED`         |
| Dashboard responsive checks                | `NOT_STARTED`            |
| Dashboard route guards                     | `NOT_STARTED`            |
| Dashboard noindex                          | `NOT_STARTED`            |
| Manual verification                        | `NOT_STARTED`            |

---

## 68. Documentation Generation Progress

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
|       16 | `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`     | Pending |
|       17 | `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`     | Pending |
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

## 69. Related Documents

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
* `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`
* `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`
* `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`
* `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`
* `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
* `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`
* `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
* `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`
* implementation prompts
* manual verification prompts
* SQL migrations
* RLS policies

---

## 70. Final Public/Profile/Dashboard Rule

Public website must be clean, real, mobile-first and SEO-safe.

Guest can browse but cannot reveal hidden contact.

Logged-in users must see role-aware navigation.

Owner, Broker and Builder dashboards must show only real, scoped data.

Every dashboard module must be clickable or safely disabled with reason.

No fake dashboard data.

No fake analytics.

No fake notifications.

No fake verified badge.

No admin links in public user header.

No hidden contact leak.

No direct URL bypass.

No public footer inside dashboard pages unless explicitly designed.

No horizontal scroll.

No fake PASS.
