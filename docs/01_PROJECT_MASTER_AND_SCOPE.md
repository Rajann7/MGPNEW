# docs/01_PROJECT_MASTER_AND_SCOPE.md

# My Gujarat Property — Project Master, Scope, Roles, Modules And Non-Negotiable Rules

This document is the detailed master scope for **My Gujarat Property**.

It defines what the website is, who it serves, what must be built, what must not be faked, what must be protected, what must be verified and how the full project must stay consistent across documentation, prompts, code, database, RLS, providers, deployment and production launch.

This file must be read before implementing any major project feature.

---

## 1. Project Name

**My Gujarat Property**

---

## 2. Project Type

My Gujarat Property is a **Gujarat-focused real estate marketplace platform** for:

* property owners
* brokers / agents
* builders / developers
* buyers
* tenants
* investors
* requirement posters
* admin team
* staff team
* Super Admin

The website must be mobile-first, SEO-friendly, role-aware, scalable, secure and production-ready.

---

## 3. Project Vision

The vision is to build a complete real estate marketplace for Gujarat where users can:

* search real property listings
* search real builder projects
* post properties
* post projects
* post buying/renting requirements
* receive and manage leads
* send proposals
* schedule site visits
* manage real estate CRM flows
* contact verified or listed users safely
* use role-specific dashboards
* use city/locality-based discovery
* view real public profile pages
* view safe SEO pages
* use billing/subscription/payment flows
* use ads/promotions
* receive notifications
* contact support
* report fraud or wrong listings
* access legal/privacy/safety information

The platform must feel premium, simple, trustworthy and suitable for Indian/Gujarat real estate users.

---

## 4. Core Product Principles

The project must follow these principles at all times.

### 4.1 Real Data Only

The website must not show fake:

* properties
* projects
* requirements
* leads
* views
* inquiries
* analytics
* payments
* subscriptions
* invoices
* verified badges
* RERA status
* reviews
* ratings
* city counts
* listing counts
* ad impressions
* ad clicks
* provider health
* notification delivery
* user activity
* success messages

If real data does not exist, show:

* empty state
* setup-required state
* pending state
* blocked state
* disabled state
* explanatory state

Never fake success.

---

### 4.2 No Hidden Contact Leak

Hidden contact numbers must never leak to unauthorized users.

Hidden/private contact must not appear in:

* public card
* detail page
* public profile
* page source
* API response
* server component payload
* metadata
* Open Graph
* schema markup
* sitemap
* share text
* notification
* logs
* analytics
* error tracking
* export file
* unauthorized dashboard
* unauthorized admin panel

Contact reveal must be authenticated, consent-aware, logged and rate-limited where required.

---

### 4.3 No Frontend-Only Security

Security must be enforced at:

* database level through RLS where applicable
* server action/API level
* route middleware/guards
* role and permission checks
* backend validation
* storage bucket policy
* provider webhook verification

UI hiding is helpful but never enough.

---

### 4.4 Mobile First

Every public page, dashboard, admin page and popup must work properly on mobile.

Required widths:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px
* ultra-wide where relevant

The website must avoid:

* horizontal scroll
* overlapping content
* unreadable text
* broken cards
* broken modals
* broken bottom sheets
* tiny tap targets
* tables that do not convert to mobile cards
* sticky buttons covering content
* brand wrapping

The brand text **My Gujarat Property** must not break/wrap badly in header.

---

### 4.5 Role-Aware Experience

The website must change experience based on:

* guest
* owner
* broker/agent
* builder/developer
* Super Admin
* admin
* staff role
* suspended/banned user
* unverified user
* verified user
* expired subscription user
* setup-required provider state

Each user must see only what they are allowed to see.

---

### 4.6 Approval-First Marketplace

User-generated public marketplace content must be controlled by approval where required.

Approval applies to:

* property create
* property edit/update
* project create
* project edit/update
* requirement create
* requirement edit/update
* ads/promotions
* verification documents
* role change requests
* location missing requests
* CMS/legal/SEO publish where staff permissions apply

Pause/resume may not require approval if no public content changes, but must still be permission-controlled.

---

### 4.7 Provider Safe Mode

External providers must not be assumed working.

If provider is missing, the website must show safe state.

Provider-backed features include:

* OTP
* SMS
* email
* WhatsApp
* Razorpay
* Google Maps
* Cloudflare R2
* Cloudflare CDN
* Turnstile
* analytics
* error tracking
* cron/background jobs
* media processing
* file scanning
* PDF generation
* web push
* GeoIP
* Search Console

Missing provider state must be:

* `SETUP_REQUIRED`
* `DISABLED_BY_FLAG`
* `BLOCKED`
* `FALLBACK_ACTIVE`
* `NOT_STARTED`

Never fake provider success.

---

### 4.8 Documentation Is Source Of Truth

The generated documentation pack must stay aligned with implementation.

Important root docs:

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

Every phase must update relevant docs.

No feature should silently disappear between:

* docs
* prompts
* code
* SQL migrations
* RLS policies
* verification
* deployment
* production launch

---

## 5. Primary Users And Roles

## 5.1 Guest

Guest means not logged in.

Guest can:

* view homepage
* search approved public property listings
* search approved public projects
* view approved public detail pages
* view public profile pages where allowed
* view CMS/legal/blog/help pages
* use public search filters
* use city selector
* open login/register popup
* view public-safe SEO pages
* view public-safe ads/promotions
* report public content where allowed and abuse-protected

Guest cannot:

* see hidden contact numbers
* submit inquiry without login/register
* reveal contact without login/register
* post property
* post project
* post requirement
* access dashboard
* access admin/staff panel
* access private documents
* access private leads/messages
* access payment/billing data
* access private profile fields
* access drafts/pending/rejected listings
* access private API responses

Guest protected action must trigger login/register popup.

---

## 5.2 Owner

Owner means a property owner.

Owner can:

* register/login through public mobile OTP flow
* manage own profile
* access owner dashboard
* post property
* post requirement
* manage own properties
* manage own requirements
* pause/resume own listings where allowed
* edit/update own listings with approval rules
* delete own listings through soft delete where allowed
* view own leads
* manage own inquiries
* view own analytics
* view own billing/subscription
* access support/help
* receive notifications
* save properties/projects/searches where implemented
* request verification where enabled
* request role change with approval

Owner cannot:

* post builder project
* access broker-only module
* access builder-only module
* access admin/staff module
* edit another user’s property
* view another user’s private leads
* view another user’s private documents
* bypass subscription/approval/verification gates
* fake verified badge
* fake lead/payment/analytics

---

## 5.3 Broker / Agent

Broker or agent can:

* register/login through public mobile OTP flow
* access broker dashboard
* manage own broker profile
* post property
* post requirement
* view allowed requirement feed
* send proposals where allowed
* manage own listings
* manage own requirements
* manage leads
* use CRM
* manage follow-ups
* schedule site visits where implemented
* view analytics
* manage billing/subscription
* submit verification
* receive notifications
* use support/help
* save searches/properties/projects where implemented

Broker cannot:

* post builder project
* access builder-only project management
* access admin/staff modules
* edit another user’s listing
* view another user’s private leads
* access private documents without permission
* bypass approval/plan/verification gates
* fake proposal/contact/lead status

---

## 5.4 Builder / Developer

Builder or developer can:

* register/login through public mobile OTP flow
* access builder dashboard
* manage builder profile/public microsite
* post projects
* manage own projects
* manage project units/inventory
* manage project leads
* view matching buying requirements where allowed
* assign agents
* manage agent permissions
* manage project analytics
* manage ads/promotions
* manage billing/subscription
* submit builder/business verification
* submit RERA/project proof where required
* receive notifications
* use support/help

Builder cannot:

* post normal property unless future approved rule changes
* post PG/hostel/room as project
* access owner/broker-only modules unless explicitly assigned by rule
* access admin/staff modules
* edit another builder’s project
* bypass RERA/approval/payment gates
* fake project/RERA/verified/lead/analytics/payment status

Important rule:

* Builder is the only public role allowed to post projects.
* Project contact should be visible to logged-in users according to project contact rules.
* RERA/ad compliance must be enforced where applicable.

---

## 5.5 Super Admin

Super Admin is the highest internal role.

Super Admin can:

* access all admin modules
* manage all users
* manage all roles
* manage staff
* manage staff permissions
* manage properties
* manage projects
* manage requirements
* manage leads
* manage support tickets
* manage verification
* manage billing/plans/payments/invoices
* manage provider settings
* manage feature flags
* manage ads/promotions
* manage CMS/legal/SEO/blog
* manage locations
* manage reports
* manage audit logs
* manage security settings
* manage deployment/maintenance settings
* view system/provider health
* perform high-risk actions with audit

Super Admin must:

* login through separate admin/staff login
* not use public mobile OTP login
* be protected by strict auth/session rules
* have all high-risk actions audited
* never expose secrets
* approve sensitive changes where required

---

## 5.6 Admin

Admin handles daily operation modules.

Admin can:

* access assigned admin modules
* moderate content if permitted
* review users/listings/projects/requirements if permitted
* manage support if permitted
* manage billing/payment if permitted
* manage reports if permitted
* manage ads if permitted
* manage locations if permitted
* manage CMS/SEO if permitted

Admin cannot automatically:

* manage provider secrets
* manage feature flags
* manage Super Admin settings
* change staff permissions
* bypass sensitive permissions
* access private docs without permission
* perform high-risk actions without audit

---

## 5.7 Staff Roles

Staff roles must be granular.

Supported staff role types:

* Verification Manager
* Support Manager
* Content Manager
* SEO Manager
* Ads Manager
* Billing Manager
* Payment Manager
* City Manager
* User Manager
* Notification Manager
* System Manager
* Security Manager
* Reports Manager
* Audit Manager

Staff permissions must include scoped actions such as:

* read
* write
* approve
* reject
* need changes
* export
* bulk action
* sensitive data access
* private document access
* payment access
* refund access
* provider status access
* provider setting access
* audit access
* delete/restore
* hard delete where allowed
* feature flag access

Staff must not bypass permissions by direct URL.

---

## 6. Main Marketplace Entities

## 6.1 Property

Property means normal listing posted by owner or broker.

Property purposes:

* sell
* rent
* buy-related where applicable through requirements
* lease where future rule allows

Property categories/types include:

* residential
* commercial
* industrial
* land/plot
* PG
* hostel
* room
* business
* agricultural land
* warehouse
* industrial shed
* shop
* office
* showroom
* flat/apartment
* tenament
* bungalow
* villa
* row house
* farmhouse where allowed
* open plot
* NA plot
* residential plot
* commercial plot

Property posting must show type-based fields only.

Irrelevant fields must be hidden.

Required fields must be enforced.

---

## 6.2 Project

Project means builder/developer project.

Project purposes:

* sell
* rent

Project categories/types include:

* residential project
* commercial project
* industrial project
* land/plotting project
* apartment project
* villa project
* row house project
* township
* mixed-use project
* society project
* industrial zone
* commercial complex
* plotting scheme

Project must not include:

* PG
* hostel
* single room listing

Project posting must include builder-specific fields such as:

* project name
* project type
* project purpose
* location hierarchy
* RERA status/number where applicable
* possession timeline
* phase timeline
* total wings/towers
* total floors
* units per floor
* BHK/unit configuration
* unit inventory
* amenities
* construction progress
* brochure PDF
* floor plans
* images
* one video max
* 360°/Matterport/iframe URL where allowed
* contact details
* approval status

---

## 6.3 Requirement

Requirement means a user’s buying/renting need.

Requirement can be posted by:

* owner
* broker

Requirement may include:

* purpose
* property/project interest
* budget
* location preference
* property type
* BHK/unit/size preference
* possession preference
* lead/contact preference
* urgency
* note/message
* contact privacy
* expiry/renewal
* approval status

Requirement feed and proposals must be role-aware.

Builder may see matching buying requirements where allowed.

Broker may send proposals where allowed.

No fake matching scores.

---

## 6.4 Lead

Lead can be created through:

* inquiry
* contact reveal
* proposal
* requirement match
* project inquiry
* site visit request
* support/contact action
* saved search alert interaction where implemented
* ad click/inquiry where implemented

Lead must track:

* source
* sender
* receiver
* related property/project/requirement/proposal
* status/stage
* consent
* duplicate status
* assigned agent/staff where applicable
* notes
* follow-up
* site visit
* audit/timeline
* notifications

Leads must be scoped by role/ownership/assignment.

No fake lead count.

---

## 6.5 Proposal

Proposal is a response to a requirement.

Proposal statuses may include:

* sent
* viewed
* shortlisted
* accepted
* rejected
* negotiation
* withdrawn
* expired

Proposal must respect:

* sender permission
* receiver permission
* duplicate prevention
* privacy
* contact reveal rules
* matching transparency
* notifications
* CRM integration

---

## 6.6 Message / Thread

Messaging must be tied to:

* lead
* proposal
* requirement
* property/project inquiry
* site visit
* support flow where applicable

Messaging must support:

* thread participants only
* unread count
* notifications
* attachments where safe
* report/block
* archive
* retry/failure state
* mobile-friendly UI

No unauthorized user can read messages.

---

## 6.7 Site Visit

Site visit must support:

* request
* accept
* reject
* reschedule
* cancel with reason
* reminders
* calendar view
* feedback
* no-show
* completion proof where implemented
* safe meeting notice
* CRM stage update
* notifications

Site visit does not guarantee property/project authenticity or deal success.

---

## 6.8 Ad / Promotion

Ads/promotions are paid or approved promotional placements.

Builder ads must support:

* select own published approved project
* upload desktop banner
* upload tablet banner
* upload mobile banner
* target all Gujarat or selected cities
* approval workflow
* admin reject/need-changes
* pause/resume
* edit/update/delete
* sponsored label
* paid/active/not expired check
* RERA compliance where applicable
* impressions/clicks real only
* fraud tracking
* city/IP/manual city targeting
* nearby fallback where implemented

No unapproved/unpaid/expired ad should show publicly.

---

## 7. Core Website Areas

The website must include these major areas.

## 7.1 Public Website

Public website includes:

* homepage
* search page
* property search results
* project search results
* detail pages
* public profile pages
* broker/builder microsites
* city/locality/type SEO pages
* blog
* CMS pages
* legal pages
* support/help pages
* contact page
* pricing page where public
* login/register popup
* inquiry/contact popup
* report form
* saved/recent UI where applicable

Public website must be:

* mobile-first
* SEO-safe
* fast
* real-data based
* no fake counts
* no hidden contact leak
* no private data leak
* no admin link exposure
* no broken CTAs

---

## 7.2 Homepage

Homepage must include:

* role-aware header
* city selector
* public search entry
* premium hero/search section
* public sections with real data only
* approved ads only
* public footer
* legal/footer links
* login/register CTA for guest
* dashboard/profile CTA for logged-in user
* responsive layout

Important existing design note:

* Guest + Owner homepage header/city selector are already considered ready in existing project context.
* Old homepage hero copy/section should be used only as required: “Hero Search Section” from old/live link below existing header.
* Preserve existing design where user explicitly says existing design is ready.
* Do not introduce AI/API/maps/WhatsApp/OTP/payment/Cloudflare now until corresponding phase/provider setup.

---

## 7.3 Search

Search must:

* route to `/search`
* use query params
* support filters
* support sorting
* support mobile filter bottom sheet
* support pagination/infinite scroll with `?page=2`
* show real results only
* show no fake count
* show empty state
* separate sponsored from organic
* protect private data
* support city/locality/type SEO strategy
* support Gujarati/Hindi/English/transliteration where implemented
* avoid unbounded reads
* avoid private field fetches

---

## 7.4 Detail Pages

Property/project detail pages must include:

* gallery
* fullscreen gallery
* video where allowed
* PDF brochure/floor plan where allowed
* location details
* all public-safe fields
* inquiry/contact CTA
* report CTA
* save/share CTA
* uploader profile link in new tab/window behavior where required
* similar listings/projects from real data only
* legal disclaimers
* RERA disclaimers for projects where applicable
* sticky mobile contact/inquiry/save/share bars
* no hidden contact leak
* no fake verification/RERA badges

---

## 7.5 Public Profiles

Profiles must support:

* owner privacy
* broker public profile
* builder public profile/microsite
* profile image crop/remove/change
* role-specific fields
* verification status
* listings/projects where allowed
* claim/report profile
* SEO-safe metadata
* no private data leak
* no hidden contact leak
* no fake verified badge

---

## 7.6 Dashboards

Dashboards must exist for:

* Owner
* Broker/Agent
* Builder/Developer

All dashboard modules must be clickable and functional or safely disabled/setup-required.

Dashboard modules must include relevant combinations of:

* overview
* profile
* properties
* projects
* requirements
* leads
* CRM
* proposals
* messages
* site visits
* saved items/searches
* analytics
* billing/subscription
* invoices
* verification
* ads/promotions
* agents/permissions for builder
* notifications
* support/help
* settings
* logout
* light/dark/system theme

Dashboard must show real data only.

No fake analytics.

No dead module.

No direct URL bypass.

---

## 7.7 Admin / Staff Panel

Admin/staff panel must include:

* separate login
* noindex
* Super Admin dashboard
* admin/staff dashboards
* user management
* role/permission management
* staff invite/management
* property moderation
* project moderation
* requirement moderation
* verification queue
* reports/fraud queue
* support tickets
* leads overview where allowed
* billing/payment/invoice management
* plan/trial/coupon management
* ads approval
* notification templates/logs
* provider status/settings
* SEO/CMS/legal/blog management
* location management
* audit logs
* system health
* feature flags
* maintenance mode
* exports where permitted
* dashboards/reports

Admin UI must be mobile usable.

Tables must become cards on mobile.

Every row/detail must be clickable where required.

Sensitive action must be audited.

---

## 8. Auth And Registration Scope

## 8.1 Public Login/Register

Public user login/register flow:

1. Guest clicks login/register or protected action.
2. Mobile OTP popup opens.
3. User enters mobile number.
4. If mobile exists, show OTP login.
5. If mobile does not exist, prompt registration.
6. Registration role selector:

   * Owner
   * Broker/Agent
   * Builder/Developer
7. Show role details clearly.
8. Collect:

   * full name
   * email
   * mobile
   * role
   * Terms/Privacy consent
9. Send OTP.
10. Verify OTP.
11. Create/authenticate user.
12. Redirect to:

* home
* dashboard
* original protected action
* original inquiry/contact action

13. Hide login/register after login.

Rules:

* Non-registered mobile must ask to register.
* Guest can view/search but not reveal contact.
* Inquiry triggers auth popup.
* OTP provider missing must show setup-required/fallback, not fake sent.

---

## 8.2 Admin/Staff Login

Admin/staff login must be separate.

Rules:

* email/Google only
* no mobile OTP public login
* no public create account
* invite-only staff
* admin URLs noindex
* route protected
* session timeout
* login attempt limit
* suspicious alerts where implemented
* 2FA where implemented/setup-required
* staff permissions enforced
* direct URL bypass blocked

---

## 9. Property Scope

Property system must support:

* create
* draft
* preview
* submit for approval
* edit/update
* reapproval after edit
* pause/resume
* schedule publish where implemented
* delete/soft delete
* media upload
* contact show/hide/request
* leads/inquiries
* analytics
* admin moderation
* rejection/need-changes
* public detail page
* SEO page
* duplicate/report handling

Property fields must be type-based.

Examples of property attributes:

* title
* purpose
* category/type
* subtype
* price
* negotiable
* rent/deposit/maintenance
* brokerage
* token amount where relevant
* area
* unit
* BHK
* bedrooms
* bathrooms
* balcony
* floor
* total floors
* wing
* building
* society
* age/new-old
* furnishing
* parking
* amenities
* ownership
* facing
* road width
* plot dimensions
* construction status
* possession
* location hierarchy
* map pin
* landmark
* address
* pin code
* images
* cover image
* brochure PDF where allowed
* contact preference
* legal warnings
* preview

Irrelevant fields must hide.

Required fields must enforce.

---

## 10. Project Scope

Project system must support:

* builder-only create
* draft
* preview
* submit for approval
* edit/update
* reapproval after edit
* pause/resume
* delete/soft delete
* unit inventory
* wings/towers
* floor plans
* brochure
* project gallery
* one video max
* 360/virtual tour URL/embed
* construction progress
* possession timeline
* phase timeline
* RERA status/number
* RERA disclaimer
* project contact rule
* leads
* matching requirements
* analytics
* ads/promotions
* admin moderation
* public detail page
* SEO page

Project must not allow:

* PG
* hostel
* room listing as project

RERA/ads:

* valid RERA should be mandatory before promotion/ads where applicable.
* RERA badge/status must not be fake.
* RERA/legal disclaimers must be clear.

---

## 11. Requirement Scope

Requirement system must support:

* owner/broker post
* draft
* preview
* submit for approval
* edit/update
* reapproval
* pause/resume
* delete/soft delete
* expiry/renewal
* privacy/contact rules
* matching
* proposal receiving
* CRM integration
* notifications
* admin moderation
* feed visibility rules
* duplicate/spam protection

Requirement matching must be transparent.

No fake match score.

---

## 12. Leads, CRM, Proposals And Messages Scope

## 12.1 Leads

Leads must support:

* inquiry source
* contact reveal source
* proposal source
* requirement match source
* site visit source
* ad source
* duplicate prevention
* lead stages:

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
* follow-up reminders
* assignment
* builder agents
* timeline/events
* consent logs
* notifications
* analytics

## 12.2 CRM

CRM must support:

* Kanban where implemented
* list view
* filters
* search
* follow-up date
* notes
* source
* tags
* duplicate handling
* assignment
* conversion tracking
* loss reason
* no fake analytics

## 12.3 Proposals

Proposals must support:

* send proposal
* view proposal
* shortlist
* accept
* reject
* negotiate
* withdraw
* expire
* duplicate prevention
* messages
* notifications

## 12.4 Messaging

Messaging must support:

* lead threads
* proposal threads
* requirement threads
* unread count
* attachments where safe
* report/block
* archive
* retry/failure
* mobile UI
* participant-only access

---

## 13. Billing, Subscription, Payment, GST And Trial Scope

Billing system must support:

* role-specific plans
* plan required before posting where defined
* plan limit gates
* subscription status
* upgrade/downgrade
* expiry/grace
* add-ons
* trial system
* coupons
* billing dashboard
* invoices
* payment history
* email invoice where provider configured
* GST handling
* Razorpay integration
* webhook verification
* manual activation with audit
* refunds/credit notes where implemented
* payment reconciliation

Important rules:

* active plan required before posting property/project/requirement if defined.
* payment success only after verified webhook or safe verified process.
* client callback alone cannot activate plan.
* failed payment cannot activate plan.
* pending payment cannot activate plan.
* invoice number generated only after verified payment.
* sequential invoice format example: `MGP-26-27-0001`.
* GST optional but B2B/B2C split must be supported.
* free trial must not auto-charge unless clearly disclosed.
* no fake active subscription.

---

## 14. Ads, Promotion And Notification Scope

## 14.1 Ads/Promotions

Builder dashboard must support:

* select approved published project
* upload desktop/tablet/mobile banners
* select target cities or all Gujarat
* submit for approval
* admin approve/reject/need changes
* active/paid/not expired display
* sponsored label
* city/IP/manual city targeting
* nearby fallback
* impressions/clicks real only
* fraud/click protection
* RERA disclosure

## 14.2 Notifications

Notifications must support:

* bell icon
* real unread badge
* dropdown/latest list
* mobile bottom sheet
* notification center
* mark read
* mark all read
* deep links
* empty state
* preferences
* templates
* logs
* retry
* digest
* quiet hours
* grouping
* in-app notifications
* external providers where configured:

  * email
  * SMS
  * WhatsApp
  * push

No fake delivery.

---

## 15. Location, Search, SEO, CMS, Blog And Legal Scope

## 15.1 Location

Location hierarchy:

* country
* state
* district
* taluka
* city/village
* area
* locality
* society
* building
* landmark
* address
* pin
* map

Location must support:

* all Gujarat districts/talukas/cities where implemented
* cascading dropdown
* missing location request
* admin approval
* nearby fallback
* manual city selector
* GeoIP/IP fallback where provider configured
* pin/city/taluka validation
* SEO slugs
* Gujarati/Hindi/English/transliteration

## 15.2 Search And SEO

SEO must include:

* title
* meta description
* H1
* intro text
* canonical
* noindex rules
* sitemap
* schema
* city/locality/type pages
* detail pages
* blog pages
* CMS/legal pages
* no fake counts
* no fake reviews
* no hidden contact/private data
* empty/thin pages noindex/hidden
* admin/staff pages noindex

## 15.3 CMS And Legal

Required pages include:

* About
* Contact
* FAQ
* Help
* Safety
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

Legal principles:

* platform is marketplace, not legal/financial/ownership advisor
* verification badge is not legal guarantee
* RERA/project disclaimers required
* contact sharing consent required
* document privacy notice required
* payment/refund/trial notices required
* DPDP/privacy consent principles followed
* legal text may require human/lawyer review

---

## 16. Media, Upload, Storage And CDN Scope

Media system must support:

* multiple images
* cover/front image
* reorder
* crop where implemented
* no distortion
* drag-safe behavior
* optimized sizes
* WebP/AVIF where configured
* original backup
* metadata management
* PDF brochure
* private documents
* project video one max
* floor plans
* 360/virtual tour embed
* Cloudflare R2
* CDN
* signed URLs
* upload progress
* retry
* safe failure
* orphan cleanup
* lifecycle rules
* EXIF stripping
* SVG safety
* HEIC/HEIF fallback
* malware/file scan where implemented/setup-required

Safe formats may include:

* JPG/JPEG
* PNG
* WebP
* AVIF
* GIF
* HEIC/HEIF where supported
* SVG only if sanitized/safe
* PDF where allowed
* video formats where allowed

Even if business does not impose user-facing min/max image count, system must enforce safe technical limits to protect infra and prevent abuse.

---

## 17. UI / UX / Design System Scope

The UI must be:

* mobile-first
* premium
* clean
* Apple-style simplicity
* white-first
* light border
* soft shadows
* marketplace-style
* responsive
* readable
* role-aware
* accessible
* fast

Inspiration allowed:

* TailAdmin
* Dribbble dashboards
* Uiverse
* Untitled UI
* Creative Tim
* Ahmed UI

Do not copy exact protected designs.

UI rules:

* no horizontal scroll
* no overlap
* no dead href
* no dead button
* no fake module
* loading states
* empty states
* error states
* unauthorized states
* setup-required states
* disabled reason
* large tap targets
* forms clear
* tables to cards on mobile
* modals responsive
* drawers/bottom sheets safe
* body scroll lock
* outside tap close
* back closes popup first where implemented
* text does not auto-copy
* copy only through copy button
* card click does not fire while scrolling
* nested button click does not trigger parent
* upload reorder by handle
* draggable images disabled where needed
* no critical text wrapping

---

## 18. Security, Privacy, Consent And Fraud Scope

Security scope includes:

* Supabase Auth
* RLS
* server-side authorization
* role checks
* staff permission checks
* private data protection
* hidden contact protection
* private document protection
* input validation
* safe errors
* log redaction
* provider secret safety
* OTP rate limits
* contact reveal rate limits
* search scraping protection
* payment webhook verification
* CSRF/XSS/SSRF protections
* CORS/security headers
* Turnstile where implemented
* fraud/report system
* audit logs
* soft delete
* retention
* export/delete privacy requests
* legal hold
* suspicious activity detection

Consent scope includes:

* Terms consent
* Privacy consent
* OTP notice
* contact sharing consent
* lead sharing notice
* document privacy notice
* payment/refund/trial notice
* cookie preferences
* marketing opt-in/out
* unsubscribe
* grievance contact

---

## 19. Performance And Scalability Scope

Performance scope includes:

* 1 lakh live users target
* optimized DB queries
* indexes
* pagination
* no unbounded reads
* no N+1 queries
* safe RLS performance
* search optimization
* admin table optimization
* dashboard lazy modules
* image optimization
* video/PDF lazy loading
* Cloudflare R2/CDN
* cache and targeted revalidation
* Next.js 15 / React 19 best practices
* server/client split
* loading boundaries
* bundle size control
* provider timeouts
* background jobs
* cron
* monitoring
* load testing
* Core Web Vitals:

  * LCP <= 2.5s
  * INP <= 200ms
  * CLS <= 0.1

Performance must not weaken security.

---

## 20. Deployment, Rollback And Production Scope

Deployment scope includes:

* local/dev/staging/prod separation
* environment variables
* `.env.example`
* no secrets in code/docs
* SQL migrations
* migration rollback notes
* backup before production update
* backup before destructive migration
* feature flags
* maintenance mode
* smoke tests
* production provider mode check
* dev/test/mock disable
* rollback plan
* incident handling
* monitoring
* post-launch checks
* Super Admin/user signoff

Production launch requires:

* build pass
* lint/typecheck pass
* relevant tests pass or documented
* manual verification
* RLS final pass
* contact privacy final pass
* provider status check
* payment safety check
* backup
* rollback
* legal pages
* responsive checks
* no critical bugs
* no fake data
* no fake payment/provider/verified status

---

## 21. Non-Goals And Explicitly Disallowed Items

The project must not implement or claim:

* AI API
* AI search
* AI recommendations
* fake recommendations
* fake property/project data
* fake leads
* fake views
* fake analytics
* fake payment success
* fake provider health
* fake verified badge
* fake RERA verification
* fake reviews/ratings
* fake city/listing counts
* public admin registration
* admin login through public mobile OTP
* client-side service role key
* frontend-only protection
* direct URL bypass
* private document public bucket
* hidden contact leak
* payment activation without verified webhook/safe verification
* production dev OTP
* production test payment
* production mock providers
* production demo data publicly visible
* feature removal without approval
* destructive DB change without backup/approval
* deployment without rollback plan
* production launch without manual verification
* legal/ownership guarantee claims
* “100% verified” guarantee
* “No.1” claim unless legally/provably approved
* investment/financial/legal advice claim

---

## 22. Feature Status System

All features must be tracked with clear status.

Allowed feature statuses:

| Status             | Meaning                                  |
| ------------------ | ---------------------------------------- |
| `NOT_STARTED`      | Not implemented                          |
| `IN_PROGRESS`      | Work started                             |
| `DONE`             | Implemented and verified                 |
| `PARTIAL`          | Partly done or partly verified           |
| `BLOCKED`          | Cannot continue due to dependency        |
| `SETUP_REQUIRED`   | Requires provider/env/config             |
| `NEEDS_REVIEW`     | Needs human/security/legal/design review |
| `DEFERRED_TRACKED` | Deferred but tracked                     |
| `DISABLED_BY_FLAG` | Disabled using feature flag              |
| `FAILED_QA`        | Failed verification                      |
| `ROLLED_BACK`      | Rolled back                              |

Never remove or skip feature status.

---

## 23. Development Phase Map

The project must be implemented using phase prompts.

### Phase 00 — Prompt Usage Rules

Purpose:

* explain how to use prompts
* enforce doc reading
* enforce token-light workflow
* enforce verification

### Phase 01 — Project Setup Baseline

Purpose:

* project setup
* folder structure
* baseline config
* env example
* app shell
* docs integration
* build/lint/type baseline

### Phase 02 — Auth Roles RLS Foundation

Purpose:

* Supabase Auth
* public user roles
* admin/staff auth
* RBAC
* base RLS
* protected routes
* direct URL blocking

### Phase 03 — Public UI Home Header Footer Hero

Purpose:

* homepage
* header
* footer
* hero/search
* city selector
* public layout
* mobile-first responsive shell

### Phase 04 — Property Project Requirement System

Purpose:

* property posting
* project posting
* requirement posting
* approval workflows
* type-based forms
* media setup states
* listing status lifecycle

### Phase 05 — Public Search Detail Profile SEO

Purpose:

* public search
* detail pages
* public profiles
* SEO metadata
* city/locality/type pages
* no hidden contact leak

### Phase 06 — Owner Broker Builder Dashboards

Purpose:

* owner dashboard
* broker dashboard
* builder dashboard
* role modules
* analytics placeholders/real states
* notifications
* billing links

### Phase 07 — Admin Staff Super Admin System

Purpose:

* admin/staff panel
* Super Admin modules
* staff permissions
* moderation queues
* audit logs
* sensitive action controls

### Phase 08 — Leads CRM Requirements Proposals Messages

Purpose:

* leads
* CRM
* proposals
* messages
* site visits
* follow-ups
* duplicate prevention
* notifications

### Phase 09 — Billing Payment Subscription Trial GST

Purpose:

* plans
* subscriptions
* Razorpay
* webhooks
* invoices
* GST
* trials
* coupons
* billing dashboards

### Phase 10 — Media Storage Uploads R2 CDN

Purpose:

* Cloudflare R2
* CDN
* image upload
* PDF upload
* video
* floor plans
* private documents
* signed URLs
* media processing

### Phase 11 — Location Search SEO CMS Legal

Purpose:

* Gujarat location hierarchy
* missing location requests
* SEO/CMS/blog/legal
* sitemap/robots
* consent/legal pages

### Phase 12 — Ads Promotion Notifications Providers

Purpose:

* ads/promotions
* notification center
* external providers
* provider status admin
* setup-required states

### Phase 13 — Security Privacy Fraud Rate Limits

Purpose:

* final security strengthening
* fraud/report
* rate limits
* audit logs
* privacy/data requests
* Turnstile feature flag

### Phase 14 — Performance Caching Deployment Launch

Purpose:

* performance
* caching
* indexes
* load readiness
* deployment
* backup
* rollback
* launch prep

### Phase 15 — Final Production API Testing And Signoff

Purpose:

* real provider checks
* final RLS pass
* final payment/provider/media checks
* final responsive
* final production signoff

---

## 24. Documentation Pack Scope

The full documentation pack contains:

### Root Docs

1. `CLAUDE.md`
2. `brain.md`
3. `FEATURE_REGISTRY.md`
4. `CHANGELOG.md`
5. `BUGS_AND_FIXES.md`
6. `MANUAL_VERIFICATION.md`
7. `API_PROVIDER_STATUS.md`
8. `DEPLOYMENT_ROLLBACK.md`
9. `SECURITY_RLS_CHECKLIST.md`
10. `PERFORMANCE_CHECKLIST.md`

### Detailed Docs

11. `docs/01_PROJECT_MASTER_AND_SCOPE.md`
12. `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`
13. `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`
14. `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`
15. `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`
16. `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`
17. `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`
18. `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`
19. `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`
20. `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
21. `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`
22. `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
23. `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`
24. `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
25. `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`
26. `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md`

### Prompt Files

27. `prompts/00_PROMPT_USAGE_RULES.md`
28. `prompts/01_PROJECT_SETUP_BASELINE.md`
29. `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md`
30. `prompts/02_AUTH_ROLES_RLS_FOUNDATION.md`
31. `prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md`
32. `prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`
33. `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`
34. `prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`
35. `prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`
36. `prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`
37. `prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`
38. `prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md`
39. `prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md`
40. `prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`
41. `prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`
42. `prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`
43. `prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`
44. `prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`
45. `prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`
46. `prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md`
47. `prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md`
48. `prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md`
49. `prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md`
50. `prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`
51. `prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`
52. `prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`
53. `prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`
54. `prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`
55. `prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`
56. `prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`
57. `prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`

---

## 25. Acceptance Rules

A feature is accepted only when:

* implemented according to docs
* code exists
* database/migrations exist if needed
* RLS/security exists if needed
* provider configured or setup-required
* UI states exist
* responsive checked
* tests run or blocked reason documented
* manual verification updated
* bugs tracked/fixed
* Feature Registry updated
* Changelog updated
* brain.md updated
* no fake success
* no hidden contact leak
* no private document leak
* no direct URL bypass
* no production unsafe state

---

## 26. Phase PASS Rules

A phase can be marked `PASS` only if:

* phase scope completed
* no blocking bugs remain
* lint/typecheck/build run or documented
* relevant tests run or documented
* manual verification passed
* role checks passed
* RLS/security checks passed where relevant
* responsive checks passed where relevant
* provider states verified/setup-required
* payment safety verified where relevant
* docs updated
* rollback notes updated where needed
* next phase clearly listed

If not fully passed, mark:

* `PARTIAL`
* `BLOCKED`
* or `FAIL`

Do not fake PASS.

---

## 27. Current Implementation Status

As of this documentation generation stage:

| Area                         | Status           |
| ---------------------------- | ---------------- |
| Documentation pack           | `IN_PROGRESS`    |
| Root docs 1–10               | `CREATED`        |
| Detailed docs                | `IN_PROGRESS`    |
| Prompt files                 | `NOT_STARTED`    |
| Website implementation       | `NOT_STARTED`    |
| Database migrations          | `NOT_STARTED`    |
| RLS                          | `NOT_STARTED`    |
| Supabase provider            | `NOT_STARTED`    |
| OTP provider                 | `SETUP_REQUIRED` |
| SMS/email/WhatsApp providers | `SETUP_REQUIRED` |
| Razorpay                     | `SETUP_REQUIRED` |
| Cloudflare R2/CDN            | `SETUP_REQUIRED` |
| Google Maps                  | `SETUP_REQUIRED` |
| Analytics/error tracking     | `SETUP_REQUIRED` |
| Manual verification          | `NOT_STARTED`    |
| Deployment                   | `NOT_STARTED`    |
| Production launch            | `NOT_STARTED`    |

---

## 28. Current Documentation Generation Progress

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
|       12 | `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`        | Pending |
|       13 | `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`         | Pending |
|       14 | `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`        | Pending |
|       15 | `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`          | Pending |
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

## 29. Related Documents

This document must stay aligned with:

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
* all later detailed docs
* all prompt files
* all SQL migration files
* all verification results

---

## 30. Final Master Rule

My Gujarat Property must be built as a real, secure, scalable and role-aware real estate marketplace.

Do not skip requirements.

Do not remove features silently.

Do not fake data.

Do not fake payments.

Do not fake providers.

Do not fake verification.

Do not leak hidden contacts.

Do not leak private documents.

Do not expose service role keys.

Do not bypass RLS.

Do not mark PASS without verification.

Do not launch without backup, rollback, security pass, provider status and manual verification.

Every feature must be documented, implemented, verified and tracked.
