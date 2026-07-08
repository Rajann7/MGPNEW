# docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md

# My Gujarat Property — Location, Search, SEO, CMS, Blog, Legal And Support System

This document defines the complete **Location, Search, SEO, CMS, Blog, Legal, Help and Support Content System** for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — build to match)

> Source of truth: finished design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batches 3, 14, 16). Replicate 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`.

**Location & search**
* **Transliteration / typo-tolerant search** (server-side): resolves "amdavad" → Ahmedabad, "રાજકોટ" → Rajkot, "barodra" → Vadodara (via "Baroda" alias + typo), "gandhi nagar" → Gandhinagar. Backed by per-location **alias tables** (English/Gujarati/Hindi names + common spellings) editable in the location admin.
* Location hierarchy admin: India→Gujarat→District→City→Zone→Area→Locality→Society tree with per-node "Add child", locality **listing counts** in-tree, rule "taluka collapses when identical to city", and **pending children fed from the Missing-Location queue** (doc 08). Location create/edit form has English/Gujarati/Hindi name fields + aliases chip input.

**SEO / CMS / Blog (admin, Batch 14)**
* CMS/Blog/Legal share one editor chrome; type differences are additive blocks. CMS editor has **autosave** ("autosaved 2 min ago"), live **SEO char counters** (title 54/60, desc 143/160), and a **live Google search-snippet preview**. Publish is never silent (Draft chips, "Publish…" ellipsis).
* **Legal pages are versioned with sign-off** ("v7 awaiting sign-off, requested from legal@ on 2 Jul"); Publish disabled until legal-review sign-off.
* Per-page SEO metadata table with inline quick-edit (Enter saves / Esc cancels) + indexed/noindex toggle. Redirect manager with **loop detection** (disabled Save + not-allowed cursor on loop) + hit counts. Sitemap view shows an **exclusion transparency list** (thin/parameterized/expired pages). Translation tracker lists missing Gujarati/Hindi strings with inline edit.

**Public content (Batch 16)**
* One shared legal-document layout across Terms/Privacy/Refund/Cancellation/Advertising/Verification/Payment (+ Grievance) — sticky desktop TOC / collapsible mobile TOC, "Last updated" date. Listing Policy adds a do's/don'ts strip; Disclaimer has the marketplace callout; Grievance page has an officer block + SLA pill ("48h ack / 15-day resolve").
* Contact page **Map Setup-Required shows the address instead**. Blog post: reading-progress bar %, channel-specific share (WhatsApp-first / Copy / Email), related-posts strip. Guest support form rate-limited (3/hour) + login nudge; logged-in ticket tracker with status dots + read-only thread (reply only while open). Cookie preference manager modal (Essential disabled/on, Analytics, Marketing). Sample legal copy must model honest claims ("reduces but cannot eliminate inaccurate information") — no "No.1"/"100%"/"guaranteed".

Claude must read this file before implementing location hierarchy, Gujarat cities/districts/talukas, search filters, public search page, SEO city/locality/type pages, sitemap, canonical/noindex logic, CMS pages, blog, legal pages, policy pages, help/support pages, redirects, multilingual content, Gujarati/Hindi/English/transliteration, admin SEO controls, location admin or SEO-related SQL migrations.

No fake location data is allowed.

No fake search count is allowed.

No hidden contact leak is allowed.

No private data can appear in SEO, sitemap, metadata, schema, CMS or blog.

No empty/thin public SEO page should be indexed.

---

## 1. Purpose

This file defines:

* Gujarat location hierarchy
* country/state/district/taluka/city/village/area/locality/society/building system
* missing location request flow
* location admin
* city selector
* manual city selection
* IP/GeoIP fallback
* nearby fallback
* search page
* public listing search
* project search
* requirement search/feed where scoped
* filters
* sort
* query params
* pagination
* mobile search UI
* SEO city pages
* SEO locality pages
* SEO type pages
* canonical URLs
* noindex rules
* sitemap rules
* robots rules
* schema markup rules
* public-safe data rules
* CMS pages
* legal pages
* blog system
* support/help content
* redirect manager
* multilingual and transliteration support
* Gujarati font/formatting rules
* admin SEO/CMS/legal controls
* RLS/security expectations
* manual verification requirements

This file is the master search, location, SEO and content reference.

---

## 2. Core Principles

The location, search and SEO system must follow these principles:

1. Location data must be real.
2. Gujarat location hierarchy must be structured.
3. Search results must use approved public-safe data only.
4. Search result counts must be real.
5. No fake city/locality/listing count.
6. No hidden contact in search payload.
7. No private data in SEO metadata.
8. No private data in sitemap.
9. Empty/thin pages must be noindex or hidden.
10. Public pages must have unique title/meta where meaningful.
11. Canonical URLs must prevent duplicate SEO issues.
12. Admin/staff/dashboard pages must be noindex.
13. CMS/legal content must not make false guarantees.
14. Blog content must not expose private data or fake advice.
15. Legal pages must clearly explain platform limits.
16. Search filters must be URL/query-param based where useful.
17. Mobile filters must use bottom sheet/drawer.
18. Infinite scroll must preserve pagination URLs.
19. Gujarati/Hindi/English support must be architecture-ready.
20. No fake SEO PASS is allowed.

---

## 3. Location Hierarchy

The platform must support a location hierarchy suitable for Gujarat real estate.

Required hierarchy:

1. Country
2. State
3. District
4. Taluka
5. City / Village
6. Area
7. Locality
8. Society
9. Building
10. Landmark
11. Address
12. Pin code
13. Map pin / coordinates

Recommended hierarchy model:

```txt id="location-hierarchy"
India
  Gujarat
    District
      Taluka
        City / Village
          Area
            Locality
              Society
                Building
```

Address, landmark, pin code and map pin attach to listing/project/requirement level.

---

## 4. Location Entity Rules

## 4.1 Country

Country scope:

* India by default
* future support for NRI browsing possible
* default country should not block Gujarat-first UI

Fields:

* name
* slug
* ISO code
* active status

---

## 4.2 State

Primary state:

* Gujarat

Fields:

* country ID
* name
* slug
* code
* active status

Rules:

* Gujarat must be active.
* Other states may be future/deferred.
* Search should be Gujarat-first.

---

## 4.3 District

District must belong to state.

Fields:

* state ID
* district name
* slug
* active status
* display order
* SEO metadata where needed

Rules:

* district names real.
* duplicate names handled by parent context.
* inactive district hidden from public create/search unless legacy data.

---

## 4.4 Taluka

Taluka must belong to district.

Fields:

* district ID
* taluka name
* slug
* active status
* display order

Rules:

* cascading dropdown must filter talukas by district.
* taluka must not belong to wrong district.
* public display should be readable.

---

## 4.5 City / Village

City/village must belong to taluka and district.

Fields:

* taluka ID
* district ID
* name
* slug
* type:

  * city
  * town
  * village
  * municipality
  * corporation
  * metro area where applicable
* active status
* population/priority optional
* SEO metadata where useful

Rules:

* city selector should use active city/village entries.
* city/village slug must be unique within context.
* public city pages only if enough useful real data.
* no fake city counts.

---

## 4.6 Area

Area belongs to city/village.

Fields:

* city/village ID
* area name
* slug
* active status
* display order

Rules:

* area dropdown filtered by city.
* area should not be guessed/faked.
* missing area request supported.

---

## 4.7 Locality

Locality belongs to area or city/village.

Fields:

* area ID
* city/village ID
* name
* slug
* active status
* display order

Rules:

* locality pages can support SEO if real content/listings exist.
* locality name must be public-safe.
* no empty/thin locality page indexed.

---

## 4.8 Society / Building

Society/building records may include:

* society name
* building name
* complex name
* tower name where relevant
* type:

  * society
  * building
  * complex
  * commercial complex
  * industrial estate
  * project
  * township
* locality ID
* active status
* slug

Rules:

* society/building can be used in listing forms.
* exact unit/flat number should be private by default.
* public display must respect privacy.
* no fake society/building entries.

---

## 4.9 Landmark

Landmark can be entered as text or linked to approved landmark table.

Rules:

* landmark must be optional.
* landmark must not expose private home/flat details unnecessarily.
* public display should be safe.
* map provider not required.

---

## 4.10 Address

Address belongs to a listing/project/profile.

Rules:

* address can be private/public-safe depending entity and user setting.
* public pages may show area/locality/city rather than full exact address.
* exact flat/unit number should not be public unless user explicitly allows and policy permits.
* hidden address details must not appear in public API/SEO.

---

## 4.11 Pin Code

Pin code rules:

* Indian pin code format.
* must match or reasonably align with selected city/locality where possible.
* mismatch should show warning.
* pin code public display depends on privacy.
* search may use pin code if indexed.

---

## 4.12 Map Pin / Coordinates

Coordinates:

* optional unless product requires.
* map provider setup-required if map picker needed.
* manual location must work without map provider.
* coordinates validated.
* exact coordinates may be hidden or blurred for privacy where needed.

Map pin must not leak private exact location when user chose privacy.

---

## 5. Missing Location Request System

Users may request missing location.

Request types:

* missing district
* missing taluka
* missing city/village
* missing area
* missing locality
* missing society
* missing building
* missing landmark

Request flow:

1. user cannot find location
2. user clicks “Request missing location”
3. user selects parent location
4. user enters requested name
5. user adds notes/address proof optional
6. request submitted
7. admin/city manager reviews
8. approve/reject/request changes
9. approved location becomes available
10. user notified

Rules:

* request must not instantly create public SEO page.
* duplicate detection required.
* admin approval required.
* city manager permission required.
* audit log required.
* no fake location added.
* pending location can be used as custom text only if product allows and marked pending.

---

## 6. Location Admin Rules

Location admin must support:

* create location
* edit location
* activate/inactivate location
* merge duplicates
* approve missing location request
* reject request
* parent-child validation
* bulk import if permitted
* transliteration fields
* SEO fields
* slug management
* redirects on slug change
* audit log
* public cache revalidation

Location admin must prevent:

* wrong parent-child hierarchy
* duplicate confusing location
* slug collision
* deleting active location with listings
* SEO indexing of empty locations
* private address exposure

---

## 7. City Selector

City selector must support:

* manual city selection
* selected city persistence
* public header integration
* homepage/search/ad targeting
* mobile-friendly UI
* loading state
* empty/error state
* fallback when provider missing
* no horizontal overflow

City source priority:

1. user manually selected city
2. saved profile city where applicable
3. IP/GeoIP city if provider configured
4. all Gujarat fallback
5. nearby fallback if configured

Rules:

* manual selection must override IP.
* if GeoIP provider missing, do not fake city detection.
* if city unavailable, show manual selector.
* selected city must not break SEO canonical unless route/query intended.
* no fake city ad/listing count.

---

## 8. Search System Overview

Search must allow users to find:

* properties
* projects
* profiles where allowed
* city/locality pages
* requirements where scoped
* blog/help/legal content where appropriate

Primary search entities:

* property listings
* builder projects

Secondary/role-scoped search:

* requirements
* proposals
* leads/CRM inside dashboards
* admin search
* blog/content search
* locations

Public search uses approved public-safe data only.

---

## 9. Public Search Page

Recommended route:

```txt id="search-route"
/search
```

Search page must support:

* keyword search
* city selector
* location filters
* purpose filter
* entity type:

  * property
  * project
  * both
* property/project category
* price/budget range
* area range
* BHK/unit type
* possession/status
* verified/RERA filters if real
* amenities
* sort
* map toggle optional/provider-dependent
* pagination/infinite scroll
* save search
* sponsored placements
* empty state
* loading state
* error state
* mobile filters bottom sheet

Search must not show:

* draft listings
* pending listings
* rejected listings
* deleted listings
* private requirements
* hidden contacts
* private docs
* fake counts
* fake verified/RERA badges
* fake sponsored listings

---

## 10. Search Query Params

Search should use query params where useful.

Example:

```txt id="search-query-example"
/search?city=rajkot&type=apartment&purpose=sell&budget_max=5000000&page=2
```

Possible params:

* `q`
* `city`
* `district`
* `taluka`
* `area`
* `locality`
* `purpose`
* `entity`
* `category`
* `type`
* `bhk`
* `budget_min`
* `budget_max`
* `area_min`
* `area_max`
* `area_unit`
* `possession`
* `verified`
* `rera`
* `sort`
* `page`
* `view`
* `amenities`
* `posted_by`
* `ad`
* `featured`

Rules:

* query params validated.
* invalid params ignored or corrected safely.
* canonical handles duplicate params.
* no private data in URL.
* page state shareable.
* mobile filters update query params.

Using a typed query state library is allowed if implemented safely.

---

## 11. Search Filters

Public filters may include:

## 11.1 Common Filters

* city
* locality
* property/project type
* purpose
* price range
* area range
* posted by
* verified status
* new/old
* possession
* sort
* amenities

## 11.2 Residential Filters

* BHK
* bathrooms
* furnishing
* floor
* parking
* property age
* society/building
* amenities

## 11.3 Commercial Filters

* shop/office/showroom
* area
* floor
* frontage
* road width
* parking
* power load
* lease/rent/sell
* business suitability

## 11.4 Industrial Filters

* shed/warehouse/factory/industrial land
* power load
* shed height
* road width
* loading/unloading
* industrial estate
* plot area

## 11.5 Land/Plot Filters

* land type
* area
* road width
* facing
* NA status
* boundary wall
* agriculture/non-agri
* zoning

## 11.6 Project Filters

* project type
* unit type/BHK
* possession date
* RERA status
* construction status
* amenities
* builder
* price range
* location
* inventory availability if real

No irrelevant filters should appear for selected entity/type.

---

## 12. Search Sort Options

Allowed sort options:

* relevance
* newest
* price low to high
* price high to low
* area low to high
* area high to low
* recently updated
* possession soon
* verified first if real
* sponsored/featured with disclosure
* popularity only if real analytics exists

Sort rules:

* no fake popularity.
* sponsored ranking must be labeled.
* sort must be stable.
* invalid sort fallback safe.
* search must not expose private data.

---

## 13. Search Result Cards

Property card should show:

* cover image
* title
* type
* purpose
* price/rent
* city/locality
* key specs
* verified badge if real
* contact/inquiry CTA
* save/share
* sponsored label where ad
* public-safe uploader/profile summary

Project card should show:

* cover image
* project name
* builder name
* project type
* location
* price range if real
* unit types
* possession
* RERA status if real
* contact/inquiry CTA
* save/share
* sponsored label where ad

Cards must not show:

* hidden contact
* private exact address if hidden
* private docs
* fake view count
* fake lead count
* fake verified/RERA
* fake availability
* fake review/rating

---

## 14. Search Pagination And Infinite Scroll

Search must support pagination.

Rules:

* normal pages support `?page=2`.
* mobile infinite scroll may be used, but page URL/state should remain shareable.
* search result pages must not load unbounded data.
* SEO pages should have paginated canonical/noindex strategy.
* infinite scroll must not create duplicate content SEO issue.
* load more state must show loading/error/end state.
* no fake total count.

---

## 15. Search Empty State

Empty state must be honest.

Empty state may show:

* “No matching properties found”
* “Try changing filters”
* “Request missing location”
* “Save this search for alerts”
* “Browse nearby areas” if real
* “Post your requirement” if user role allowed/auth flow

Empty state must not:

* show fake listings
* show fake nearby results
* show fake counts
* auto-create fake SEO content

---

## 16. Search Map Toggle

Map toggle is optional and provider-dependent.

Rules:

* map provider setup-required until configured.
* text/list search must work without map.
* map key restrictions required.
* exact private location hidden/blurry if privacy requires.
* no fake nearby places.
* map markers only for public-safe listings/projects.
* map cannot expose hidden contact/private address.
* map must lazy-load.
* map must not block search page.

---

## 17. Public SEO Page Types

SEO pages may include:

* homepage
* city property pages
* city project pages
* city + type pages
* locality pages
* district pages
* taluka pages
* property type pages
* project type pages
* broker profile pages
* builder profile pages
* listing detail pages
* project detail pages
* blog posts
* CMS/legal/help pages

Examples:

```txt id="seo-page-examples"
/city/rajkot
/city/rajkot/flats-for-sale
/city/ahmedabad/commercial-shops-for-rent
/locality/rajkot/kalawad-road
/project/green-valley-residency-rajkot
/property/2bhk-flat-rajkot-kalawad-road
/builder/company-name
/broker/agency-name
```

Actual route structure may vary but must be documented and consistent.

---

## 18. SEO Page Eligibility Rules

An SEO page can be indexable only if:

* it has real public-safe content
* it has enough real listings/projects or useful evergreen content
* title/meta/H1 are unique
* canonical is correct
* no private data
* no fake counts
* no empty/thin content
* no duplicate doorway spam
* no hidden contact
* no unapproved listings
* page is useful to users

SEO page must be noindex or hidden if:

* no results and no useful content
* duplicate/near-duplicate page
* parameter-only thin page
* private/dashboard/admin
* draft/pending/rejected listing
* expired/deleted content where policy says hide
* unsupported location/type combination

---

## 19. Title, Meta And H1 Rules

Each indexable page should have:

* unique title
* unique meta description
* one clear H1
* canonical URL
* public-safe intro where useful
* breadcrumbs where useful
* structured data where safe
* no fake claims

Examples:

```txt id="seo-title-examples"
Flats for Sale in Rajkot | My Gujarat Property
Projects in Ahmedabad | My Gujarat Property
Commercial Shops for Rent in Surat | My Gujarat Property
```

Rules:

* no fake “best/no.1” claim unless legally verified and approved.
* no fake listing count.
* no private phone/email in meta.
* no hidden contact.
* no keyword stuffing.
* no duplicate generated nonsense.

---

## 20. Canonical Rules

Canonical URLs must:

* point to preferred clean URL
* avoid duplicate query param pages
* handle page 2+ carefully
* handle filtered pages according to SEO strategy
* handle city/locality route variations
* handle slug changes with redirects
* avoid canonical to private/noindex pages
* avoid canonical loops

Examples:

* `/search?city=rajkot&type=flat&page=1` canonical may be clean SEO route if mapped.
* `/property/old-slug` redirects to `/property/new-slug`.
* empty filtered pages noindex.

---

## 21. Noindex Rules

Noindex required for:

* dashboard pages
* admin/staff pages
* login/register fallback pages if popup-first and not useful
* checkout/billing pages
* private profiles
* draft listings
* pending listings
* rejected listings
* deleted listings
* private requirements
* empty search/filter pages
* thin city/locality pages
* duplicate filtered pages
* unsupported location/type combinations
* internal support ticket pages
* notification pages
* message/lead/proposal/site visit pages
* invoice pages
* private docs
* provider/admin pages
* test/preview pages

Noindex pages must not be included in sitemap.

---

## 22. Sitemap Rules

Sitemap may include:

* homepage
* indexable city pages
* indexable locality pages
* indexable type pages
* approved public property detail pages
* approved public project detail pages
* public broker profiles if enabled
* public builder profiles
* published blog posts
* published CMS/legal/help pages

Sitemap must exclude:

* private pages
* dashboard/admin pages
* login/register private flows
* search param spam
* noindex pages
* draft/pending/rejected/deleted listings
* private requirements
* empty/thin SEO pages
* invoice/private docs
* messages/leads/proposals/site visits
* support tickets
* provider/admin routes

Sitemap must be updated/revalidated after content changes.

Large sitemap should be split by type/date where needed.

---

## 23. Robots Rules

Robots rules should:

* allow public indexable pages
* disallow admin/staff paths
* disallow dashboard/private paths
* disallow internal API paths where appropriate
* disallow checkout/billing/private docs
* include sitemap URL
* not accidentally block public SEO pages
* not expose sensitive route names more than necessary

Robots must align with noindex/sitemap strategy.

---

## 24. Schema Markup Rules

Schema may include:

* Organization
* WebSite
* BreadcrumbList
* RealEstateListing where safe/valid
* Product/Offer only if accurate and compliant
* Article/BlogPosting
* FAQPage where real FAQs
* LocalBusiness for public broker/builder only if accurate
* SiteNavigationElement where useful

Schema must not include:

* fake reviews
* fake ratings
* fake aggregateRating
* fake price
* hidden contact
* private phone/email
* private address
* unverified RERA claims
* fake availability
* fake organization guarantee
* fake legal status

Schema must be public-safe and truthful.

---

## 25. SEO For Sold / Rented / Expired / Deleted Listings

Listing status SEO rules:

| Status      | SEO Behavior                                                                   |
| ----------- | ------------------------------------------------------------------------------ |
| published   | indexable if public-safe                                                       |
| paused      | noindex or unavailable depending policy                                        |
| expired     | noindex or show expired unavailable page                                       |
| sold/rented | show sold/rented status if real; may keep page with noindex/canonical strategy |
| deleted     | 404/410 or unavailable, noindex                                                |
| rejected    | not public                                                                     |
| pending     | not public                                                                     |
| draft       | not public                                                                     |
| blocked     | not public                                                                     |

Rules:

* no hidden contact.
* similar listings real only.
* avoid soft 404 spam.
* canonical/redirect strategy documented.
* public cache revalidated after status change.

---

## 26. Redirect Manager

Redirect manager should support:

* old slug to new slug
* deleted/moved page redirect
* city/locality slug changes
* CMS/blog slug changes
* project/property slug changes
* 301/302 status
* active/inactive
* admin management
* redirect loop detection
* open redirect prevention
* audit log

Rules:

* from_path must be internal path.
* to_path must be safe internal or approved external where explicitly allowed.
* no open redirects.
* redirects tested.
* SEO manager permission required.
* changes audited.

---

## 27. CMS System Overview

CMS manages non-listing pages.

CMS pages include:

* About
* Contact
* FAQ
* Help
* Safety
* Terms
* Privacy
* Cookie Policy
* Refund Policy
* Cancellation Policy
* Listing Policy
* Advertising Policy
* Verification Policy
* Payment Policy
* Disclaimer
* Grievance
* Support
* Pricing explanatory pages
* User guide pages
* Broker guide
* Builder guide
* Owner guide

CMS must support:

* draft
* preview
* publish
* unpublish
* slug
* title
* meta title
* meta description
* canonical
* noindex
* content
* revision/history where implemented
* author
* reviewer
* publish date
* update date
* role permissions
* audit logs

---

## 28. CMS Content Rules

CMS content must:

* be truthful
* be public-safe
* avoid fake guarantees
* avoid legal/financial advice unless reviewed
* include disclaimers where needed
* link to related legal pages
* be sanitized
* support Gujarati/Hindi/English future structure
* be mobile-readable
* have headings
* have accessible links
* avoid broken links
* avoid private data

CMS content must not:

* expose private user data
* expose hidden contact
* promise legal title guarantee
* promise investment return
* claim platform guarantees owner/project authenticity beyond verification disclaimer
* include raw secrets/provider data
* include fake numbers/testimonials

---

## 29. Legal Pages Required

Required legal/policy pages:

1. Terms & Conditions
2. Privacy Policy
3. Cookie Policy
4. Refund Policy
5. Cancellation Policy
6. Listing Policy
7. Advertising Policy
8. Verification Policy
9. Payment Policy
10. Disclaimer
11. Grievance / Contact Officer
12. Safety Guidelines
13. User Content Policy
14. Contact Sharing Policy
15. Data Deletion / Export Policy
16. Support Policy
17. RERA / Project Disclaimer
18. Broker/Builder/Owner Verification Disclaimer
19. Trial/Coupon Policy where applicable
20. Ads/Sponsored Content Policy

Legal pages may need final lawyer review.

---

## 30. Legal Disclaimer Rules

Platform must clearly state:

* My Gujarat Property is a marketplace platform.
* Platform does not guarantee title/ownership/legal validity.
* Users must do their own due diligence.
* Verification badge is not legal guarantee.
* RERA status shown based on submitted/reviewed data where applicable, not final legal advice.
* Payment for platform services does not guarantee property deal.
* Ads are sponsored/promoted content where labeled.
* Property/project data is provided by users/builders/brokers.
* Users should verify documents independently.
* Platform can moderate/remove suspicious content.
* Refund/cancellation governed by policy.
* Data use governed by privacy policy.
* Contact sharing requires user consent where applicable.

Do not claim:

* guaranteed legal title
* guaranteed safe deal
* government approval
* investment return guarantee
* verified ownership guarantee
* fraud-free platform guarantee

---

## 31. Privacy Policy Scope

Privacy policy should cover:

* account data
* mobile OTP data
* email/mobile
* role/profile data
* listings/projects/requirements
* leads/inquiries/contact reveal
* messages/site visits
* billing/payment data
* GST/billing profile
* verification documents
* support/report data
* cookies/analytics
* location/city preference
* provider data sharing
* retention
* deletion/export requests
* marketing preferences
* legal requests
* security logs
* children/minor restrictions if relevant
* contact sharing consent
* private document access

Privacy policy must align with actual implementation.

---

## 32. Terms And Conditions Scope

Terms should cover:

* user eligibility
* account responsibility
* role selection
* listing rules
* project rules
* requirement rules
* payment rules
* subscription rules
* trial/coupon rules
* ads/promotions
* prohibited content
* moderation rights
* verification disclaimers
* RERA disclaimers
* contact sharing
* user communication
* fraud/reporting
* suspension/termination
* limitation of liability
* governing law
* grievance/contact

Terms must not conflict with actual product behavior.

---

## 33. Listing Policy Scope

Listing policy should cover:

* allowed listing categories
* owner/broker property rules
* builder project rules
* PG/hostel/room only as property, not project
* no fake property/project
* no duplicate spam
* no misleading price
* no hidden illegal charges
* no fake RERA/verified claim
* media rules
* approval rules
* edit/reapproval
* pause/expiry/delete
* user responsibility
* report/removal policy

---

## 34. Advertising Policy Scope

Advertising policy should cover:

* sponsored label
* builder project ad eligibility
* payment requirement
* approval requirement
* active/not expired requirement
* city targeting
* RERA disclosure
* prohibited claims
* media requirements
* refund/cancellation
* fraud clicks/impressions
* moderation/removal
* ad performance disclaimer
* no guaranteed leads/sales unless explicitly contracted

---

## 35. Verification Policy Scope

Verification policy should cover:

* verification document submission
* private document handling
* staff review
* call/check process
* approval/rejection
* need changes
* expiry/recheck
* revocation
* badge meaning
* badge limitations
* RERA/project proof
* broker/builder verification
* owner/authority proof
* privacy of documents
* fraud consequences

Badge disclaimer must be clear.

---

## 36. Payment / Refund / Cancellation Policy Scope

Payment-related legal pages should cover:

* plans
* subscription
* payment provider
* checkout
* failed/pending payments
* invoice
* GST
* refund conditions
* cancellation
* trials
* coupons
* add-ons
* ads billing
* manual payments if any
* support process
* timelines

No hidden auto-charge.

No fake refund promise.

---

## 37. Cookie Policy And Preferences

Cookie policy should cover:

* necessary cookies
* auth/session cookies
* analytics cookies
* marketing cookies
* preferences
* third-party cookies
* consent management
* opt-in/out
* cookie duration
* how to change preference

Cookie preferences UI should support:

* accept necessary
* accept all
* reject non-essential
* manage preferences
* update preference later

Cookie consent must align with analytics provider use.

---

## 38. Grievance / Support Legal Page

Grievance/support page should include:

* contact method
* support ticket process
* categories
* response expectations
* escalation
* legal notice/contact where required
* abuse/report process
* takedown/copyright process where implemented
* law enforcement/legal request process where needed
* user privacy note

Final legal contact details must be provided by business owner.

---

## 39. Blog System

Blog supports public content.

Blog must include:

* posts
* categories
* tags
* slug
* title
* excerpt
* content
* featured image
* author
* publish date
* update date
* meta title
* meta description
* canonical
* noindex
* status
* related posts
* sitemap inclusion
* admin editor

Blog statuses:

* draft
* pending review
* published
* scheduled
* archived
* deleted

---

## 40. Blog Content Rules

Blog content must:

* be helpful and real
* avoid fake legal/financial advice
* include disclaimers for property/legal/finance topics
* not promise investment returns
* not expose private data
* not include hidden contacts
* not include fake reviews
* not scrape/copy copyrighted content
* be sanitized
* include accurate public information
* support Gujarati/Hindi/English future localization
* use public-safe images

Sensitive topics like legal/tax/loan/RERA should say users should consult professionals.

---

## 41. Blog SEO Rules

Blog post should have:

* unique title
* meta description
* canonical
* slug
* H1
* author/date
* image alt text
* Article schema where safe
* breadcrumbs
* sitemap entry if published/indexable

Blog must not include:

* fake author credentials
* fake ratings
* fake comments
* private contact
* unsupported claims
* duplicate content spam

---

## 42. Help / FAQ System

Help system may include:

* FAQ
* user guides
* owner guide
* broker guide
* builder guide
* posting guide
* project guide
* requirement guide
* verification guide
* payment guide
* ads guide
* safety guide
* support guide
* glossary

FAQ should support:

* categories
* search
* helpful/not helpful feedback
* related support link
* schema only for real FAQs

No fake FAQ schema.

---

## 43. Support Page Scope

Public support page should include:

* contact/support form
* support categories
* help center links
* grievance links
* report fraud link
* ticket creation for logged-in users
* guest support option if allowed
* attachment support if configured
* status tracking for logged-in users

Support form must validate and rate-limit.

Support attachments must be private.

---

## 44. CMS/Admin Permissions

CMS, blog, SEO and legal admin require permissions.

Permissions:

* `can_read`
* `can_create`
* `can_update`
* `can_publish`
* `can_delete`
* `can_manage_legal`
* `can_manage_seo`
* `can_export`

Rules:

* legal page edit requires legal permission.
* publish requires publish permission.
* SEO changes require SEO permission.
* redirects require SEO permission.
* drafts private.
* publish actions audited.
* legal changes audited.
* no public user access.

---

## 45. SEO Admin Controls

SEO admin should support:

* page metadata
* canonical URL
* noindex toggle
* sitemap inclusion
* schema enable/disable
* city/locality intro text
* FAQ content
* redirects
* slug changes
* robots/sitemap status
* broken link review where implemented
* empty/thin page warnings
* duplicate metadata warnings
* preview snippet

Rules:

* no private data.
* no fake count.
* no fake reviews.
* no indexing unsupported pages.
* changes audited.

---

## 46. Location SEO Pages

Location SEO pages may be generated for:

* city
* locality
* district
* taluka
* area
* property type in city
* project type in city
* rent/sell combinations

Page content may include:

* title
* intro
* public-safe listings
* public-safe projects
* filters
* breadcrumbs
* FAQ if real
* nearby locations
* related searches
* canonical
* noindex if thin
* sitemap if indexable

Rules:

* listing/project counts real.
* nearby links real.
* no fake demand/supply claims.
* no private contact.
* no fake reviews.

---

## 47. Public Search SEO Vs App Search

Two search modes:

## 47.1 SEO-Friendly Location Pages

* clean route
* indexable if useful
* curated filters
* stable content
* no private data
* unique metadata

## 47.2 App Search With Query Params

* `/search?...`
* interactive filters
* usually noindex for complex parameter combinations
* shareable
* dynamic
* public-safe

Rules:

* avoid indexing infinite combinations.
* map important combos to clean SEO pages.
* noindex low-value filtered pages.
* canonical carefully.

---

## 48. Multilingual And Transliteration Support

Languages:

* English
* Hindi
* Gujarati

Architecture should support:

* UI labels
* CMS content
* blog content
* legal pages
* location names
* search aliases
* transliteration
* SEO metadata
* fallback language

Transliteration examples:

* Rajkot
* રાજકોટ
* राजकोट

Rules:

* location table can store aliases/transliterations.
* search should match common spelling variants.
* Gujarati font support required where Gujarati text used.
* no broken font rendering.
* language routes/metadata planned if implemented.
* do not auto-translate legal pages without review.

---

## 49. Gujarati Font And Formatting Rules

Use suitable Gujarati font where Gujarati content appears.

Recommended:

* Noto Sans Gujarati or equivalent

Formatting rules:

* Indian currency
* Indian number formatting
* IST timezone
* Indian date format
* Gujarat-local terms where appropriate
* readable mixed Hindi/Gujarati/English content
* no broken glyphs
* no font layout shift where possible

---

## 50. Currency, Date And Unit Formatting

Use:

* INR currency
* Indian number separators
* IST timezone
* dd MMM yyyy or India-friendly date format
* sq ft / sq yd / sq meter / acre / guntha where supported
* local units with clear conversion where implemented

Rules:

* no inconsistent currency.
* no UTC dates shown to users without conversion.
* no misleading unit conversion.
* price display must match listing data.

---

## 51. Search And SEO Public-Safe Data

Public-safe search/SEO data may include:

* listing title
* public slug
* public location
* price/rent if public
* type/purpose/category
* public specs
* public images
* public amenities
* public profile display name
* real verification/RERA badge
* public description
* public status

Must exclude:

* hidden phone
* hidden email
* private address
* exact unit/flat number if hidden
* private docs
* leads
* messages
* proposals
* invoices
* payment data
* admin notes
* moderation notes
* private verification proof
* support/report data
* raw user metadata
* provider settings

---

## 52. RLS And Security Rules

RLS must enforce:

* public reads only approved public-safe listings/projects/profiles/CMS/blog/legal
* private dashboard data not public
* draft/pending/rejected/deleted not public
* hidden contact excluded
* SEO views exclude private data
* CMS drafts admin-only
* blog drafts admin-only
* legal drafts admin-only
* location admin writes permission-scoped
* missing location requests user-owned/admin review
* redirects/SEO settings admin-only
* support tickets user-owned/support permission
* private attachments protected
* sitemap uses public-safe views only

---

## 53. Direct URL Bypass Tests

Test unauthorized access for:

* draft CMS page
* draft blog post
* noindex preview page
* admin SEO route
* admin redirect route
* location admin route
* private support ticket
* private legal draft
* pending listing SEO URL
* rejected project URL
* deleted listing URL
* hidden contact via SEO metadata/API
* private requirement URL
* internal sitemap endpoint if restricted
* invoice/private doc URLs through sitemap

Unauthorized must be denied or noindex/unavailable as appropriate.

---

## 54. Search Performance Rules

Search performance requires:

* indexes for status/location/type/price
* pagination
* no unbounded reads
* public-safe views
* no N+1 media/profile queries
* cached location lists
* cached public SEO pages
* targeted revalidation
* efficient count strategy
* background sitemap generation if large
* lazy filters where needed
* mobile optimized cards
* lazy images
* no heavy map initial load

---

## 55. Search Index Expectations

Indexes needed for:

* property status/approval/published
* property city/locality
* property purpose
* property category/type
* property price/rent
* property area
* property slug
* property published_at
* project status/approval/published
* project city/locality
* project type/purpose
* project RERA status
* project slug
* project published_at
* locations parent-child IDs
* location slug/name
* CMS/blog slug/status
* redirects from_path
* support ticket user/status
* SEO page slug/type/status

---

## 56. Recommended Tables

Tables may include:

* `countries`
* `states`
* `districts`
* `talukas`
* `cities_villages`
* `areas`
* `localities`
* `societies_buildings`
* `location_aliases`
* `missing_location_requests`
* `seo_pages`
* `seo_page_content`
* `sitemaps`
* `redirects`
* `cms_pages`
* `cms_revisions`
* `blog_posts`
* `blog_categories`
* `blog_tags`
* `blog_post_tags`
* `legal_pages`
* `help_articles`
* `faqs`
* `support_tickets`
* `support_messages`
* `support_attachments`
* `cookie_preferences`
* `legal_consents`
* `public_search_events`
* `search_saved_queries`
* `audit_logs`

Actual schema may vary, but behavior must exist.

---

## 57. Suggested Table Fields

## 57.1 `cities_villages`

Fields:

* `id`
* `district_id`
* `taluka_id`
* `name`
* `slug`
* `type`
* `is_active`
* `display_order`
* `created_at`
* `updated_at`

---

## 57.2 `location_aliases`

Fields:

* `id`
* `entity_type`
* `entity_id`
* `language`
* `alias`
* `script`
* `created_at`

Used for:

* English
* Gujarati
* Hindi
* common spelling variants
* transliteration

---

## 57.3 `missing_location_requests`

Fields:

* `id`
* `requested_by_profile_id`
* `location_level`
* `parent_entity_type`
* `parent_entity_id`
* `requested_name`
* `requested_aliases`
* `notes`
* `status`
* `reviewed_by_staff_id`
* `reviewed_at`
* `review_note`
* `created_at`

---

## 57.4 `seo_pages`

Fields:

* `id`
* `page_type`
* `slug`
* `entity_type`
* `entity_id`
* `city_id`
* `locality_id`
* `property_type`
* `purpose`
* `title`
* `meta_title`
* `meta_description`
* `h1`
* `intro`
* `canonical_url`
* `noindex`
* `sitemap_include`
* `status`
* `published_at`
* `created_at`
* `updated_at`

---

## 57.5 `redirects`

Fields:

* `id`
* `from_path`
* `to_path`
* `status_code`
* `is_active`
* `created_by_staff_id`
* `created_at`
* `updated_at`

---

## 57.6 `cms_pages`

Fields:

* `id`
* `slug`
* `title`
* `content`
* `status`
* `meta_title`
* `meta_description`
* `canonical_url`
* `noindex`
* `sitemap_include`
* `published_at`
* `created_by_staff_id`
* `updated_by_staff_id`
* `created_at`
* `updated_at`

---

## 57.7 `blog_posts`

Fields:

* `id`
* `slug`
* `title`
* `excerpt`
* `content`
* `category_id`
* `featured_media_id`
* `status`
* `meta_title`
* `meta_description`
* `canonical_url`
* `noindex`
* `published_at`
* `author_staff_id`
* `created_at`
* `updated_at`

---

## 57.8 `help_articles`

Fields:

* `id`
* `slug`
* `category`
* `title`
* `content`
* `status`
* `meta_title`
* `meta_description`
* `published_at`
* `created_at`
* `updated_at`

---

## 57.9 `support_tickets`

Fields:

* `id`
* `profile_id`
* `guest_email`
* `category`
* `priority`
* `subject`
* `status`
* `assigned_staff_id`
* `created_at`
* `updated_at`

---

## 57.10 `legal_consents`

Fields:

* `id`
* `profile_id`
* `consent_type`
* `policy_version`
* `accepted_at`
* `ip_hash`
* `user_agent_hash`
* `created_at`

---

## 58. Migration Expectations

Implementation requires migrations for:

* location hierarchy tables
* location aliases
* missing location requests
* SEO pages
* redirects
* CMS pages
* CMS revisions
* blog tables
* help/FAQ tables
* support ticket tables
* legal consent/cookie preference tables
* indexes
* RLS policies
* public-safe views
* sitemap metadata

Migration must include:

* header
* purpose
* phase
* tables changed
* RLS changed yes/no
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 59. CMS / SEO / Legal Status Values

CMS statuses:

* `draft`
* `pending_review`
* `published`
* `scheduled`
* `archived`
* `deleted`

SEO page statuses:

* `draft`
* `active`
* `noindex`
* `inactive`
* `redirected`
* `deleted`

Support statuses:

* `open`
* `assigned`
* `waiting_user`
* `waiting_internal`
* `resolved`
* `closed`
* `reopened`
* `escalated`

Missing location statuses:

* `pending`
* `under_review`
* `approved`
* `rejected`
* `duplicate`
* `need_more_info`

---

## 60. Caching And Revalidation

Cacheable public-safe data:

* published CMS pages
* published blog posts
* published legal pages
* public SEO pages
* location lists
* public search where safe
* sitemap
* redirects
* public help/FAQ

Do not publicly cache:

* support tickets
* admin CMS editor
* drafts
* private preview pages
* dashboard search
* private requirements
* hidden contact data
* user-specific saved searches
* cookie preferences
* legal consents
* admin SEO settings

Revalidate after:

* listing status change
* project status change
* location update
* SEO page update
* CMS/legal publish
* blog publish
* redirect change
* sitemap generation
* noindex toggle
* slug change

---

## 61. Search Analytics

Search analytics may track:

* search query
* filters
* city/locality
* result count
* clicked result
* saved search
* no result searches
* device type
* session hash
* timestamp

Rules:

* no hidden contact
* no private user data in public analytics
* respect cookie/privacy rules
* no fake search analytics
* aggregate for admin reports
* rate-limit abusive search
* do not expose raw user-sensitive search terms publicly

---

## 62. Saved Search Alerts

Saved search alerts overlap with notifications.

Rules:

* logged-in user can save search.
* guest local saved search optional.
* alert provider setup-required if external notification missing.
* in-app alerts DB-backed.
* alerts must use real matching listings/projects.
* no fake alert.
* user can pause/delete alerts.
* frequency respected.
* no private data in alert.

---

## 63. Support And Grievance Workflow

Support workflow:

1. user opens help/support
2. searches FAQ/help
3. creates support ticket if needed
4. selects category/priority
5. adds description
6. uploads attachment if provider configured
7. ticket created
8. notification created
9. support staff assigned
10. staff replies
11. user responds
12. resolved/closed/reopened

Rules:

* support ticket user-scoped.
* staff permission required.
* attachments private.
* guest support allowed only with abuse/rate-limit controls.
* no fake support response.
* SLA real only.

---

## 64. Support Categories

Support categories may include:

* account/login
* OTP issue
* listing issue
* project issue
* requirement issue
* payment/billing
* invoice/GST
* verification
* ads/promotions
* leads/messages
* reports/fraud
* technical issue
* location missing/wrong
* legal/grievance
* other

Priority values:

* low
* medium
* high
* urgent

---

## 65. Content Sanitization Rules

All user/admin content must be sanitized.

Applies to:

* CMS content
* blog content
* help articles
* listing descriptions
* project descriptions
* requirement descriptions
* support messages
* profile bios
* ad content
* FAQ content

Rules:

* prevent XSS
* block unsafe HTML/scripts
* sanitize rich text
* validate URLs
* prevent open redirects
* no raw iframes unless allowlisted
* no unsafe embed
* no hidden script in CMS/blog
* no inline event handlers

---

## 66. Public Links And Dead Link Rules

Public website must not include dead links.

Rules:

* no `href="#"`
* no placeholder social links
* no non-existent legal page links
* no broken footer links
* no broken SEO links
* no broken city/locality links
* disabled/setup-required state for incomplete features
* link checker/manual verification required
* redirects for changed slugs

Dead public links are bugs.

---

## 67. Admin Manual Verification Checklist

Manual verification must check:

### Location

* country/state/district/taluka/city hierarchy works
* cascading dropdown works
* city selector works
* manual city selection persists
* GeoIP missing fallback works
* missing location request works
* admin approves/rejects missing location
* duplicate location handled
* invalid parent-child relation blocked
* Gujarati/Hindi/English aliases stored/displayed if implemented

### Search

* `/search` works
* search by city works
* search by locality works
* property/project filter works
* purpose filter works
* price range works
* type filter works
* mobile filters bottom sheet works
* pagination works
* `?page=2` works
* no fake result count
* no hidden contact in card/API
* pending/rejected/deleted listings excluded
* empty state honest
* map missing setup-required/fallback works

### SEO

* title/meta/H1 unique
* canonical correct
* noindex for empty/thin pages
* sitemap includes only public indexable pages
* dashboard/admin noindex
* schema has no fake reviews/ratings
* hidden contact not in metadata
* slug redirects safe
* sold/rented/expired/deleted behavior correct

### CMS / Blog / Legal

* CMS draft not public
* published page public
* legal pages accessible
* footer legal links work
* blog draft not public
* blog published/indexable
* rich text sanitized
* legal disclaimers visible
* no fake guarantee claims

### Support

* support page works
* ticket create works or setup-required if attachment provider missing
* user sees own tickets
* wrong user denied
* staff permission works
* attachments private
* support notifications real/setup-required

### Security/RLS

* public views exclude private data
* admin SEO route protected
* CMS editor protected
* location admin protected
* support tickets user-scoped
* sitemap no private URLs
* direct URL bypass denied

### Responsive

* homepage/search mobile
* city selector mobile
* filters bottom sheet mobile
* SEO page mobile
* CMS/legal page mobile
* blog page mobile
* support page mobile
* admin location/SEO/CMS mobile

Widths:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

---

## 68. Feature Registry Items Required

`FEATURE_REGISTRY.md` must track:

* location hierarchy
* district/taluka/city data
* area/locality/society/building data
* location aliases/transliteration
* missing location request
* location admin
* city selector
* manual city selection
* GeoIP fallback
* public search page
* search query params
* search filters
* search sort
* search pagination
* mobile filter bottom sheet
* map toggle setup-required
* public-safe search views
* city SEO pages
* locality SEO pages
* type SEO pages
* canonical rules
* noindex rules
* sitemap generation
* robots rules
* schema markup
* redirect manager
* CMS pages
* legal pages
* blog system
* help/FAQ
* support pages/tickets
* cookie preferences
* legal consents
* multilingual support
* Gujarati font support
* search analytics
* saved search alerts
* SEO/CMS admin
* location RLS
* CMS/blog RLS
* support RLS
* manual verification

Each item must have real status.

---

## 69. Common Bugs To Track

Create bug if:

* fake city/listing count shown
* hidden contact appears in search API
* hidden contact appears in SEO metadata
* private draft CMS page public
* pending listing indexed
* rejected listing indexed
* deleted listing in sitemap
* dashboard/admin page indexed
* empty locality page indexed
* fake review schema added
* fake rating added
* sitemap includes private invoice/doc/support URL
* city selector breaks mobile
* search filters dead
* query params not working
* pagination missing/unbounded search
* map required even provider missing
* missing location request creates public location without review
* admin SEO route accessible by public user
* support ticket visible to wrong user
* legal link broken
* footer link `href="#"`
* redirect open redirect vulnerability
* CMS rich text XSS
* unsupported language text broken
* noindex page included in sitemap
* public search uses private table directly

---

## 70. Current Location/Search/SEO/CMS/Legal Status

As of this documentation generation stage:

| Area                             | Status                   |
| -------------------------------- | ------------------------ |
| Location hierarchy               | `NOT_STARTED`            |
| Gujarat location data            | `NOT_STARTED`            |
| Location aliases/transliteration | `NOT_STARTED`            |
| Missing location requests        | `NOT_STARTED`            |
| Location admin                   | `NOT_STARTED`            |
| City selector                    | `DOCUMENTED_REQUIREMENT` |
| GeoIP provider                   | `SETUP_REQUIRED`         |
| Public search page               | `NOT_STARTED`            |
| Search filters                   | `NOT_STARTED`            |
| Search sort                      | `NOT_STARTED`            |
| Search pagination                | `NOT_STARTED`            |
| Mobile filters                   | `NOT_STARTED`            |
| Map toggle                       | `SETUP_REQUIRED`         |
| Public-safe search views         | `NOT_STARTED`            |
| City SEO pages                   | `NOT_STARTED`            |
| Locality SEO pages               | `NOT_STARTED`            |
| Type SEO pages                   | `NOT_STARTED`            |
| Canonical/noindex                | `NOT_STARTED`            |
| Sitemap                          | `NOT_STARTED`            |
| Robots                           | `NOT_STARTED`            |
| Schema markup                    | `NOT_STARTED`            |
| Redirect manager                 | `NOT_STARTED`            |
| CMS pages                        | `NOT_STARTED`            |
| Legal pages                      | `NOT_STARTED`            |
| Blog system                      | `NOT_STARTED`            |
| Help/FAQ                         | `NOT_STARTED`            |
| Support pages/tickets            | `NOT_STARTED`            |
| Cookie preferences               | `NOT_STARTED`            |
| Legal consents                   | `NOT_STARTED`            |
| Multilingual support             | `NOT_STARTED`            |
| Gujarati font support            | `NOT_STARTED`            |
| Search analytics                 | `SETUP_REQUIRED`         |
| Saved search alerts              | `SETUP_REQUIRED`         |
| RLS/security                     | `NOT_STARTED`            |
| Manual verification              | `NOT_STARTED`            |

---

## 71. Documentation Generation Progress

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
|       18 | `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`              | Created |
|       19 | `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`       | Created |
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`    | Created |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Created |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Created |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Pending |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Pending |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 72. Related Documents

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
* `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`
* `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`
* `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`
* `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
* `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
* `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`
* `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
* `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`
* implementation prompts
* manual verification prompts
* SQL migrations
* RLS policies

---

## 73. Final Location/Search/SEO/CMS/Legal Rule

Location data must be real.

Search results must be real.

Search counts must be real.

SEO pages must be useful and public-safe.

Empty/thin pages must not be indexed.

Hidden contact must never appear in search, metadata, schema, sitemap or CMS.

Private data must never appear in public content.

CMS/legal/blog content must not make fake guarantees.

Legal pages must explain marketplace limitations.

Support tickets and attachments must be private/scoped.

Admin SEO/CMS/location controls must be permission-protected.

No fake location.

No fake search result.

No fake SEO count.

No fake schema.

No fake legal guarantee.

No fake PASS.
