# prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md

# My Gujarat Property — Prompt 05: Public Search, Detail Pages, Profiles And SEO

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 3 (search) & 4 (detail/profiles)**, `design-prompts/DESIGN_ADDONS_MASTER.md`, deltas `report-batch-03/04.md`, and `docs/06`+`docs/11` "Design Add-Ons". Locked: transliteration/typo-tolerant search, masked contact reveal, unavailable-listing variant, compare tray, requirement masked-until-proposal-accepted.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
```

This phase implements the public discovery layer for **My Gujarat Property**:

* public search page
* search filters
* search result cards
* property detail pages
* project detail pages
* requirement public/scoped detail behavior
* broker public profiles
* builder public profiles
* public-safe data rendering
* contact privacy-safe CTAs
* SEO metadata
* canonical URLs
* slugs
* sitemap foundation
* noindex rules
* schema foundation
* pagination
* mobile-first search UX
* no fake results
* no hidden contact leak
* no fake SEO data
* no fake counts
* no fake verified/RERA badges

Do not skip public-safe data checks.

Do not expose hidden contact.

Do not show draft/pending/rejected/deleted entities publicly.

Do not fake listings.

Do not fake SEO.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
Prompt Number: 05
Phase: Public Search, Detail Pages, Profiles And SEO
Type: Implementation Prompt
Matching Verification Prompt: prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
Previous Verification Prompt: prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
```

---

## 2. Phase Purpose

The purpose of this phase is to make approved marketplace data discoverable to the public without leaking private data.

This phase should implement:

* public search route
* query params
* filters
* sort
* pagination
* search result cards
* empty states
* property detail pages
* project detail pages
* requirement public/scoped pages if allowed
* broker profile pages
* builder profile pages
* public-safe profile cards
* SEO metadata
* canonical URLs
* noindex for thin/private/unapproved pages
* basic sitemap foundation
* breadcrumb structure
* safe structured data foundation
* contact/inquiry CTAs that require auth later
* public media rendering if media exists
* no fake data
* no hidden contact leak
* docs updates
* checks/tests
* handoff to manual verification

This phase builds on the public-safe views and entity schema from Prompt 04.

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
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md
docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md
docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md
docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md
docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect all existing search/detail/profile/SEO code before editing.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
src/app/search/
app/search/
src/app/property/
app/property/
src/app/properties/
app/properties/
src/app/project/
app/project/
src/app/projects/
app/projects/
src/app/requirement/
app/requirement/
src/app/requirements/
app/requirements/
src/app/broker/
app/broker/
src/app/builder/
app/builder/
src/app/sitemap.*
app/sitemap.*
src/app/robots.*
app/robots.*
src/components/search/
components/search/
src/components/property/
components/property/
src/components/project/
components/project/
src/components/profile/
components/profile/
src/components/public/
components/public/
src/lib/seo/
lib/seo/
src/lib/search/
lib/search/
src/lib/db/
lib/db/
src/lib/supabase/
lib/supabase/
src/lib/validators/
lib/validators/
src/types/
types/
supabase/migrations/
```

Search for existing:

* `/search` route
* result cards
* filters
* detail pages
* slug routing
* public profiles
* SEO helpers
* metadata functions
* sitemap
* robots
* structured data
* public-safe views
* fake listings
* fake counts
* hidden contact exposure
* direct private table queries

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement:

### 5.1 Public Search

* `/search` page
* query parameter parsing
* filters
* sort
* pagination
* result cards
* empty states
* mobile filter bottom sheet/drawer
* public-safe data fetching
* no fake result count
* no fake listings

### 5.2 Detail Pages

* property detail page
* project detail page
* requirement detail behavior if public/scoped
* public-safe content only
* image/gallery placeholder if media not ready
* contact/inquiry CTA requiring auth later
* report/share/save CTA foundation
* uploader public profile link
* no hidden contact leak
* no unpublished entity display

### 5.3 Public Profiles

* broker public profile page
* builder public profile page
* safe profile cards
* listings/projects from approved published entities only
* no private owner profile exposure unless product allows
* claim/report placeholders later
* no fake verified badge

### 5.4 SEO

* title/meta/H1
* canonical URLs
* noindex rules
* basic schema safe foundation
* breadcrumbs
* sitemap foundation
* robots baseline
* slug handling
* empty/thin page noindex
* no fake reviews/ratings
* no hidden contact in metadata/schema

### 5.5 Docs

Update all required memory docs.

---

## 6. Out Of Scope For This Phase

Do not implement full:

* property/project/requirement creation
* dashboard modules
* admin moderation
* lead/CRM system
* contact reveal backend
* messaging
* site visits
* payment/subscription
* media storage/R2/CDN
* ads/promotions
* notifications delivery
* CMS/blog/legal full system
* advanced analytics
* PWA
* AI recommendations/search
* maps/nearby API
* WhatsApp API

This phase may create safe CTA placeholders for later phases.

---

## 7. Hard Public-Safe Data Rules

Public pages can only show approved/published safe data.

Public pages must not show:

* drafts
* submitted/pending items
* under review items
* need changes items
* rejected items
* paused items unless explicitly shown unavailable/noindex
* deleted items
* expired items unless explicitly noindex/unavailable
* private profile fields
* hidden contact phone/email
* private address if hidden
* admin notes
* rejection reasons
* moderation notes
* private media
* verification proof
* billing/subscription data
* private documents
* internal IDs where unnecessary
* provider secrets

Public data must come from public-safe views or safe server-side projections.

---

## 8. No Hidden Contact Rule

Hidden contact must never appear in:

* search cards
* detail pages
* profile pages
* metadata
* Open Graph
* Twitter cards
* schema JSON-LD
* sitemap
* robots
* share text
* static params payload
* client-side JSON
* page source
* logs
* public API responses
* image alt text
* slug
* breadcrumbs

Contact/inquiry button should require auth and later create lead/contact reveal flow.

Do not show phone/email until contact reveal phase is implemented and verified.

---

## 9. Public Search Route Requirements

Route:

```txt id="search-route"
/search
```

The search page should support query params where applicable:

```txt id="search-query-params"
q
purpose
entity
category
type
city
district
taluka
area
locality
budget_min
budget_max
price_min
price_max
rent_min
rent_max
area_min
area_max
bedrooms
posted_by
sort
page
```

Entity values:

```txt id="search-entity-values"
property
project
requirement
all
```

Purpose examples:

```txt id="search-purpose-values"
buy
sell
rent
lease
pg
business
```

Rules:

* invalid params ignored or safely corrected
* no SQL injection
* no unsafe dynamic order by
* no unbounded search
* no fake counts
* query params preserved
* mobile filters usable
* search result page can render with no data

---

## 10. Search Result Types

Search may show:

* property cards
* project cards
* requirement cards if public/scoped
* broker/builder profile cards if profile search included later

This phase should focus on:

* property
* project
* requirement if allowed

If requirement visibility is private/scoped, do not show full public requirements.

---

## 11. Search Card Requirements

Each card should show only public-safe data.

### Property Card

May show:

* title
* slug link
* purpose
* category/type
* safe price/rent
* area
* BHK where applicable
* city/locality safe label
* thumbnail if public media exists
* status label only if public-safe
* posted by role label
* approved/published status only indirectly by presence
* save/share/contact CTA placeholders

Must not show:

* phone
* email
* exact hidden address
* admin notes
* rejection reason
* fake verified badge
* fake views
* fake leads
* fake image if not real/placeholder clearly generic

### Project Card

May show:

* project name
* project type
* price range
* city/locality
* possession date
* RERA number/status if provided and safe
* builder public name
* thumbnail if public media exists
* contact/inquiry CTA

Must not show:

* private RERA proof
* fake RERA verified
* fake availability
* fake sold/booked counts
* hidden contact
* private builder data

### Requirement Card

If public/scoped:

* title
* purpose
* category
* budget range
* city/locality preference
* requirement type
* posted role label

Must not show:

* buyer/renter phone/email
* private identity
* private exact address
* hidden contact
* fake urgency
* fake budget if not entered

---

## 12. Search Empty State

Search empty state should show:

* no results message
* clear filters button
* broaden search suggestion
* post requirement CTA for logged-in owner/broker/guest auth trigger
* support/help link if exists

Do not show fake results.

Do not show fake “popular” items unless real data exists.

---

## 13. Search Pagination Requirements

Search must use pagination.

Allowed:

* page-based pagination
* cursor pagination
* mobile infinite scroll with `?page=2` compatibility

Rules:

* no unbounded reads
* page size limited
* sort indexed where possible
* total count only if real and performant
* if exact count expensive, show “results” without fake count
* no fake total result number

---

## 14. Search Sort Requirements

Allowed sorts:

```txt id="search-sort-values"
newest
price_low_to_high
price_high_to_low
rent_low_to_high
rent_high_to_low
area_high_to_low
relevance
```

Rules:

* relevance must be real/simple documented logic
* if relevance not implemented, do not show it
* do not use unsafe raw user input for sort
* sort unavailable fields handled safely

---

## 15. Search Filter UX

Desktop:

* sidebar or top filters
* clear all
* selected chips
* sort selector

Mobile:

* filter button
* bottom sheet/drawer
* sticky apply button
* clear filters
* no horizontal scroll
* no clipped dropdowns

Filters must be real or disabled.

No dead filters.

---

## 16. Property Detail Page Requirements

Possible route:

```txt id="property-detail-routes"
/property/[slug]
/properties/[slug]
```

Use existing convention.

Property detail page should show:

* title
* safe location
* price/rent
* area
* purpose
* category/type
* property details
* amenities
* description
* public media/gallery if available
* image placeholder if media missing
* uploader public-safe profile link
* inquiry/contact CTA requiring auth
* save/share/report CTA foundation
* safety disclaimer
* similar items placeholder only if real or disabled
* SEO metadata

Must not show:

* phone/email if hidden
* private address if hidden
* admin notes
* rejection/need-change reason
* private media
* unapproved listing
* fake views
* fake verified
* fake owner guarantee

---

## 17. Project Detail Page Requirements

Possible route:

```txt id="project-detail-routes"
/project/[slug]
/projects/[slug]
```

Project detail page should show:

* project name
* builder public profile link
* safe location
* project type/category
* price range
* unit configurations
* towers/wings/floors/units if real
* possession/timeline
* construction status
* amenities/specifications
* RERA details if provided and public-safe
* RERA disclaimer
* media/gallery placeholder
* brochure/floor plan placeholder if not ready
* virtual tour placeholder if setup-required
* inquiry/contact CTA requiring auth
* report/share/save CTA foundation
* SEO metadata

Must not show:

* private RERA proof
* fake RERA verification
* fake sold/booked inventory
* hidden contact
* private builder data
* unapproved project
* fake availability
* fake analytics

---

## 18. Requirement Detail Page Rules

Requirement public behavior must be careful.

Possible route:

```txt id="requirement-detail-routes"
/requirement/[slug]
/requirements/[slug]
```

If requirements are public:

* show approved public-safe requirement only
* hide contact
* show budget/location/category preferences
* show inquiry/proposal CTA requiring auth
* no private identity/contact
* no exact private address
* no fake urgency

If requirements are scoped/private:

* do not create public detail page
* show unauthorized/noindex where appropriate
* only owner/broker/admin/scoped matching users later

Do not leak buyer/renter private contact.

---

## 19. Published Entity Visibility Rules

Detail page must return:

* public page for published/approved entity only
* 404 or unavailable for draft/pending/rejected/deleted
* noindex unavailable pages
* no private data in 404
* owner dashboard edit route handles private draft, not public route

Do not show “pending preview” publicly.

Owner preview can be private/protected if implemented.

---

## 20. Broker Public Profile Requirements

Possible route:

```txt id="broker-profile-route"
/broker/[slug]
```

Broker public profile may show:

* agency/broker public name
* public role label
* city/area
* public bio if available
* verified badge only if real verified
* public avatar/logo if available
* approved published property listings
* public contact CTA requiring auth/contact reveal later
* report/claim placeholder later
* SEO metadata
* noindex if too thin/unapproved

Must not show:

* private mobile/email
* private documents
* internal notes
* rejected listings
* fake verified badge
* fake listing count
* fake reviews
* private address

---

## 21. Builder Public Profile Requirements

Possible route:

```txt id="builder-profile-route"
/builder/[slug]
```

Builder profile may show:

* builder/company public name
* public logo/avatar
* city/area
* public bio
* RERA/company verification status only if real
* approved published projects
* project cards
* contact CTA requiring auth/contact reveal later
* report/claim placeholder later
* SEO metadata
* noindex if too thin/unapproved

Must not show:

* private mobile/email
* private RERA proof docs
* internal notes
* rejected projects
* fake verified badge
* fake project count
* fake reviews
* private company documents

---

## 22. Owner Public Profile Rule

Owner profile privacy is stricter.

Do not create public owner profile pages unless product explicitly allows.

If uploader is owner:

* card/detail may show “Owner” label or safe display name
* do not expose mobile/email
* do not expose private address/profile
* contact through auth/inquiry flow later

If owner profile page is created accidentally:

* create bug
* mark feature `PARTIAL` or `FAIL` depending exposure

---

## 23. Contact / Inquiry CTA Foundation

Contact/inquiry CTAs should:

* require auth for guests
* open auth popup or route to login
* preserve intent
* show setup-required if leads/contact reveal not implemented
* not show phone/email
* not create fake lead
* not show fake success
* not expose hidden contact in client payload

Full contact reveal/leads are Prompt 08.

This phase may implement CTA placeholder only.

---

## 24. Save / Share / Report CTA Foundation

Allowed:

* save CTA opens auth for guest or setup/no-data state
* share uses current public URL if route exists
* report CTA opens auth/setup-required placeholder
* no fake saved state
* no fake report submitted
* no fake share count

Full saved items/report flows later.

---

## 25. Media Display Rules

If media is available and public:

* show public-safe image gallery
* lazy-load images
* no distortion
* alt text safe
* no private media
* no hidden contact in image metadata/alt text
* video only if real and public
* brochure/floor plan only if public and allowed

If media not implemented:

* show clean placeholder
* do not fake uploaded images
* do not show fake brochure/video links
* mark media provider setup-required

Full media upload/storage is Prompt 10.

---

## 26. SEO Metadata Requirements

Generate safe metadata for:

* homepage if touched
* search page
* property detail
* project detail
* broker profile
* builder profile
* noindex unavailable/private pages

Metadata may include:

* title
* description
* canonical
* Open Graph title/description
* Open Graph image if public-safe
* Twitter card if used
* robots noindex where needed

Must not include:

* phone/email
* hidden address
* private docs
* fake reviews
* fake counts
* fake verified claims
* fake RERA verification
* unapproved entity data

---

## 27. Title / Meta Rules

Examples:

```txt id="seo-title-examples"
2 BHK Flat for Sale in Rajkot | My Gujarat Property
Commercial Shop for Rent in Ahmedabad | My Gujarat Property
Residential Project in Surat | My Gujarat Property
Broker Profile in Vadodara | My Gujarat Property
Builder Projects in Rajkot | My Gujarat Property
```

Rules:

* title reflects real data
* description concise
* no keyword stuffing
* no fake claims
* no hidden contact
* no fake “verified” unless real
* no legal guarantee

---

## 28. Canonical URL Rules

Canonical should:

* use production/base app URL from env/config
* point to stable slug URL
* avoid duplicate query variants for detail pages
* search pages can canonical to normalized query or base search depending SEO strategy
* no canonical to private/dashboard/admin pages
* no raw local/dev URL in production

If app URL missing, use safe fallback and mark setup-required if needed.

---

## 29. Robots / Noindex Rules

Noindex:

* admin pages
* dashboard pages
* login/auth private pages if needed
* draft/pending/rejected/deleted entities
* search pages with no real data or thin content
* requirement pages if private/scoped
* placeholder pages
* setup-required pages
* internal preview pages

Index only:

* approved/published public-safe entity pages
* sufficiently useful public profile pages
* useful public search/location pages if real data exists
* CMS/legal/blog later when implemented

Do not index fake/thin pages.

---

## 30. Structured Data / Schema Rules

Schema may be added carefully.

Allowed:

* BreadcrumbList
* Organization/WebSite basic safe schema
* RealEstateListing-like schema only if safe and accurate
* Product/Offer only if semantically correct and not misleading

Do not include:

* fake reviews
* fake ratings
* fake aggregateRating
* hidden contact
* private address if hidden
* fake availability
* fake verified/RERA status
* fake price if not real
* unapproved data

If unsure, use minimal BreadcrumbList only.

---

## 31. Breadcrumb Requirements

Detail/profile pages should include breadcrumbs:

Property example:

```txt id="property-breadcrumb"
Home > Search > Property > 2 BHK Flat in Rajkot
```

Project example:

```txt id="project-breadcrumb"
Home > Search > Projects > Project Name
```

Broker example:

```txt id="broker-breadcrumb"
Home > Brokers > Broker Name
```

Builder example:

```txt id="builder-breadcrumb"
Home > Builders > Builder Name
```

Breadcrumbs must not include hidden contact/private address.

---

## 32. Sitemap Foundation

If implementing sitemap:

* include only public-safe published pages
* exclude draft/pending/rejected/paused/deleted/private
* exclude admin/dashboard/auth private pages
* exclude placeholder/thin/noindex pages
* include canonical detail URLs
* include public profile URLs if useful and published
* no fake URLs
* handle pagination/splitting later if large

If sitemap is not implemented yet, document `PARTIAL`.

---

## 33. Robots Foundation

If implementing robots:

* disallow private/admin/dashboard where appropriate
* allow public pages
* reference sitemap if sitemap exists
* do not expose private routes through robots as security mechanism only
* route protection still required

Robots is SEO guidance, not access control.

---

## 34. Slug Handling Requirements

Slug pages must:

* fetch by slug
* only show published safe entity
* handle not found
* handle deleted/expired
* avoid leaking whether private draft exists where sensitive
* avoid duplicate slugs
* support future redirect if slug changes
* avoid phone/email/private address in slug

If slug missing, redirect or 404 safely.

---

## 35. Search Query Security

Search implementation must:

* validate query params
* limit page size
* safely map sort fields
* avoid raw SQL injection
* avoid unbounded wildcard scans where possible
* use indexes
* avoid exposing private table rows
* use public-safe views/projections
* avoid server errors for invalid params

---

## 36. Public Search Data Source

Preferred:

* public-safe views
* server-side query with explicit safe select fields

Avoid:

* selecting `*` from private entity tables
* filtering private table client-side
* returning private fields to browser
* relying on frontend to hide contact
* exposing draft/pending rows

If public-safe views do not exist, create or update them with migration.

---

## 37. Filters To Implement

Implement practical filters based on schema availability:

* entity type
* purpose
* category
* property/project type
* city
* locality/area if available
* price/rent range
* area range
* BHK where applicable
* posted by
* RERA registered for projects if safe
* possession status if safe

Do not implement filter that cannot query real data.

Do not show fake filter counts.

---

## 38. Search Card Actions

Card actions:

* view details
* save
* contact/inquiry
* share

Rules:

* view details routes to slug page
* save requires auth/setup later
* contact/inquiry requires auth/setup later
* share uses public URL
* no fake save state
* no fake inquiry
* no phone/email reveal

---

## 39. Detail Page Actions

Detail CTAs:

* Contact / Request Contact
* Send Inquiry
* Save
* Share
* Report
* View Uploader Profile

Rules:

* contact/inquiry triggers auth/setup-required
* save triggers auth/setup-required
* report triggers auth/setup-required
* share copies/shares public URL
* uploader profile link public-safe
* no fake lead created
* no fake report submitted

---

## 40. Detail Page Mobile UX

Detail pages must be mobile-first.

Required:

* sticky bottom CTA bar if implemented
* gallery scroll safe
* readable price/title
* sections collapsed/organized
* no horizontal scroll
* buttons large
* contact CTA not covering content
* share/report accessible
* breadcrumbs not overflowing

---

## 41. Gallery Placeholder UX

If media unavailable:

* show neutral placeholder
* do not show fake property/project photo
* do not show fake “10 photos”
* do not show broken image
* do not stretch image area badly
* use safe alt text

If public media exists:

* show real media only
* lazy-load
* public URL only
* no private signed URL exposed unless intended public-safe

---

## 42. Public Profile Listing Sections

Broker profile listing section:

* only approved/published properties from that broker
* no fake property count
* no hidden contact
* no draft/pending/rejected items

Builder profile project section:

* only approved/published projects from that builder
* no fake project count
* no fake RERA
* no private documents

If no data:

* show empty state
* do not generate fake cards

---

## 43. Empty / Unavailable Detail States

If entity not found/private/deleted:

Show safe state:

```txt id="unavailable-state-copy"
This listing is not available right now.
```

Do not reveal:

* “This draft exists”
* “Rejected by admin”
* owner private info
* moderation reason
* hidden contact
* internal status

Use 404/noindex where appropriate.

---

## 44. Legal/Safety Disclaimer

Detail pages should show marketplace disclaimer:

```txt id="detail-disclaimer"
My Gujarat Property is a marketplace. Please independently verify ownership, documents, RERA details, pricing and legal information before making any transaction.
```

Project detail should include RERA disclaimer where applicable.

Do not claim legal guarantee.

---

## 45. Report Listing Placeholder

Report CTA foundation may include:

* opens auth for guest
* shows setup-required/coming later
* no fake report success
* no hidden contact
* full report system later Prompt 08/13

If report form implemented, validate and store safely.

---

## 46. Public Profile Claim Placeholder

Broker/builder claim/report may be placeholder.

Rules:

* no fake claim approval
* no public private docs
* requires auth later
* admin review later
* no hidden contact
* show setup-required if not implemented

---

## 47. SEO Thin Content Rules

Noindex pages if:

* no real entity data
* no real profile content
* empty search result
* placeholder route
* no approved listings/projects
* content is too thin
* private/scoped requirement
* unavailable/deleted/expired
* setup-required only

Do not create mass SEO pages with no real data.

---

## 48. Future Location SEO Page Boundary

This phase can prepare search query SEO.

Full city/locality SEO pages come in Prompt 11.

Do not generate thousands of location pages now.

Allowed:

* `/search?city=rajkot`
* title/meta generated from query
* noindex if empty/thin

Deferred:

* `/gujarat/rajkot/flats-for-sale`
* locality landing pages
* district/taluka pages
* sitemap split for location pages

---

## 49. Multi-Language Boundary

This phase may keep English-only.

Do not fake Gujarati/Hindi pages.

If localization foundation exists:

* support labels safely
* no legal translation fake
* no hreflang unless pages exist

Full localization is later advanced/docs phase.

---

## 50. Performance Requirements

Search/detail/profile pages must:

* use pagination
* use indexes
* avoid unbounded queries
* avoid loading all listings
* avoid N+1 profile queries
* lazy-load images
* avoid heavy map scripts
* avoid payment scripts
* avoid analytics SDK unless configured
* use server components where suitable
* cache public-safe pages carefully
* not cache private data

Private/dashboard pages must not be publicly cached.

---

## 51. Caching Requirements

Allowed caching:

* published public-safe detail pages
* public-safe search results with revalidation
* public profile pages with revalidation
* static SEO helpers

Do not cache:

* private profiles
* draft/pending listings
* dashboard data
* admin data
* hidden contact
* auth-specific CTA payloads
* signed URLs/private media

If unsure, use no-store for sensitive pages.

---

## 52. RLS / Security Requirements

Verify and maintain:

* public pages use public-safe views
* private tables protected
* public cannot read private rows
* wrong user cannot access draft through detail slug
* contact hidden
* profile private fields hidden
* admin/staff private fields hidden
* no direct URL bypass for private preview
* no service role client usage
* no provider secrets

If new views are needed, add migration and RLS/security docs.

---

## 53. SQL Migration Rule

This phase may require DB migration for:

* public-safe views
* search indexes
* slug indexes
* profile public views
* sitemap helper views
* SEO status fields if missing

If DB changes are made, create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_public_search_detail_profile_seo.sql
```

Migration must include:

* purpose
* phase: Prompt 05
* views/tables/indexes changed
* RLS changes
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 54. Suggested Indexes

Add/verify indexes for:

### Properties

* slug
* status/visibility/approval
* city/locality
* category/type
* purpose
* price/rent
* area
* published_at
* owner/created_by

### Projects

* slug
* status/visibility/approval
* city/locality
* category/type
* purpose
* price range
* possession date
* RERA status
* published_at
* builder profile

### Requirements

* slug
* status/visibility/approval
* city/locality
* category/type
* purpose
* budget/rent range
* published_at
* created_by profile

### Public Profiles

* broker slug
* builder slug
* verification status
* city
* public visibility

---

## 55. Components To Implement Or Update

Possible components:

```txt id="search-detail-components"
SearchPage
SearchFilters
SearchFilterSheet
SearchResultList
SearchResultCard
PropertyCard
ProjectCard
RequirementCard
SearchEmptyState
Pagination
SortSelect
SelectedFilterChips
PropertyDetailPage
ProjectDetailPage
RequirementDetailPage
PublicProfileHeader
BrokerProfilePage
BuilderProfilePage
DetailGallery
DetailCTABar
Breadcrumbs
SeoJsonLd
UnavailableEntityState
```

Use existing components if available.

Avoid duplicates.

---

## 56. Routes To Implement Or Update

Possible routes:

```txt id="routes"
src/app/search/page.tsx
src/app/property/[slug]/page.tsx
src/app/project/[slug]/page.tsx
src/app/requirement/[slug]/page.tsx
src/app/broker/[slug]/page.tsx
src/app/builder/[slug]/page.tsx
src/app/sitemap.ts
src/app/robots.ts
```

Use existing routing convention.

If current project uses plural routes, preserve it.

Do not create both singular and plural duplicates unless redirect strategy is documented.

---

## 57. Redirect Rules

If old/alternate routes exist:

* choose canonical
* redirect alternate routes
* avoid duplicate SEO
* avoid broken links
* update header/search cards to canonical route
* document redirect behavior

Do not create duplicate pages for same entity without canonical/noindex.

---

## 58. Testing Requirements

Run available:

```txt id="checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

* route tests
* search query tests
* RLS tests
* SEO metadata tests
* public-safe view tests

If command missing, document `NOT_CONFIGURED`.

Do not claim tests passed if not run.

---

## 59. Manual Smoke Checks If App Runs

Check:

* `/search` loads
* search filters work
* invalid params do not crash
* empty search shows no fake results
* result cards show public-safe data
* property detail loads for published item
* project detail loads for published item
* unpublished item not public
* broker profile loads if public data exists
* builder profile loads if public data exists
* contact CTA does not show phone/email
* guest contact CTA opens auth/setup-required
* no public admin link
* no hidden contact
* no fake counts
* responsive mobile layouts work

Record results.

Full verification in matching manual prompt.

---

## 60. SEO Smoke Checks

Check:

* homepage/search/detail metadata safe
* canonical URLs safe
* no hidden contact in metadata
* no fake schema
* no fake ratings
* unavailable/private pages noindex
* search placeholder/empty pages noindex
* sitemap excludes private/unapproved pages
* robots does not expose private access assumption

---

## 61. API Provider Status Updates

Update `API_PROVIDER_STATUS.md` if relevant.

Potential statuses:

* Supabase Database/RLS: updated if views/indexes added
* Media/R2: `SETUP_REQUIRED` or current status
* Maps: `NOT_STARTED`/`SETUP_REQUIRED`
* Analytics/Search Console: `SETUP_REQUIRED`
* Notifications/contact: `NOT_STARTED`
* CMS/legal: `NOT_STARTED`/later

Do not mark providers active without real tests.

---

## 62. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

* public search page
* query params
* search filters
* search sort
* pagination
* property result cards
* project result cards
* requirement result behavior
* search empty state
* property detail page
* project detail page
* requirement detail behavior
* broker public profile
* builder public profile
* public-safe profile cards
* contact CTA auth/setup state
* save/share/report CTA foundation
* public-safe views
* SEO metadata
* canonical URLs
* noindex rules
* schema foundation
* breadcrumbs
* sitemap foundation
* robots foundation
* slug handling
* no hidden contact public check
* no fake data public check
* responsive search/detail/profile baseline

Use accurate statuses.

---

## 63. Changelog Update

Update `CHANGELOG.md`.

Include:

* date
* Prompt 05
* summary
* changed files
* new routes
* migration files
* public-safe view changes
* SEO changes
* provider status changes
* docs updated
* tests/checks run
* known issues
* rollback notes
* manual verification pending

---

## 64. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* public draft leak
* hidden contact leak
* fake result count
* fake listing card
* unpublished detail visible
* search param crash
* SQL injection risk
* unbounded search
* wrong profile data public
* fake verified badge
* fake RERA badge
* fake reviews/schema
* sitemap includes private page
* noindex missing
* canonical wrong
* mobile filter broken
* detail page horizontal scroll
* missing migration
* RLS/public-safe view leak
* build/typecheck failure

---

## 65. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 05 implementation status
* manual verification pending:

  * `prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`
* routes needing verification
* search filters needing verification
* public-safe/hidden contact checks pending
* SEO checks pending
* responsive checks pending
* setup-required providers
* known bugs

Do not mark manual verification PASS from implementation prompt alone.

---

## 66. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md`.

Include:

* public search data source
* public-safe views
* hidden contact checks
* unpublished entity denial
* profile privacy
* metadata/schema privacy
* sitemap privacy
* contact CTA auth requirement
* direct URL private slug checks
* RLS status
* known issues

---

## 67. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md`.

Include:

* search pagination
* search indexes
* no unbounded reads
* no fake total counts
* detail page query efficiency
* profile page query efficiency
* image lazy-load status
* no maps/payment heavy scripts
* public cache strategy
* private no-store rule
* build status
* Core Web Vitals not measured/measured

---

## 68. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

Include:

* route changes
* component changes
* SEO changes
* sitemap/robots changes
* migration path if any
* view/index rollback notes
* cache purge/revalidation notes
* data risk
* rollback plan
* post-deploy verification checklist

---

## 69. Brain Update

Update `brain.md`.

Include:

* Prompt 05 implementation summary
* changed files
* routes added/changed
* migration files
* public-safe views/indexes
* search/detail/profile status
* SEO status
* hidden contact status
* setup-required providers
* bugs/blockers
* checks run
* next prompt:

  * `prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`
* exact resume instruction

---

## 70. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
src/app/search/page.tsx
src/app/property/[slug]/page.tsx
src/app/project/[slug]/page.tsx
src/app/requirement/[slug]/page.tsx
src/app/broker/[slug]/page.tsx
src/app/builder/[slug]/page.tsx
src/app/sitemap.ts
src/app/robots.ts
src/components/search/*
src/components/property/PropertyCard.tsx
src/components/project/ProjectCard.tsx
src/components/requirement/RequirementCard.tsx
src/components/detail/*
src/components/profile/*
src/components/seo/*
src/lib/search/*
src/lib/seo/*
src/lib/validators/search.ts
src/types/search.ts
supabase/migrations/*_public_search_detail_profile_seo.sql
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

## 71. Expected Output From This Phase

At the end of Prompt 05 implementation, project should have:

* public search page
* safe filters/sort/pagination
* public-safe result cards
* property detail page foundation
* project detail page foundation
* requirement detail behavior safe
* broker profile page foundation
* builder profile page foundation
* contact CTA auth/setup state
* safe metadata/canonical/noindex foundation
* sitemap/robots foundation if implemented
* no hidden contact leak
* no fake data
* docs updated
* checks run
* manual verification pending

---

## 72. Forbidden Outcomes

This phase must not leave:

* public draft/pending/rejected rows
* hidden contact in public UI/source/metadata
* phone/email in schema/sitemap
* fake listings
* fake counts
* fake verified badge
* fake RERA verification
* fake reviews/ratings
* fake search results
* public admin link
* unbounded search queries
* direct private table `select *` exposed to browser
* sitemap with private URLs
* noindex missing on placeholders
* duplicate canonical pages
* search crash on bad query params
* DB changes without migration
* docs outdated
* manual verification skipped

---

## 73. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* search works with limited filters
* profile pages foundation exists but claim/report deferred
* requirement public behavior scoped/deferred
* sitemap partial
* schema minimal only
* media placeholders only
* analytics/Search Console setup-required
* responsive verification pending
* RLS runtime test pending

### `FAIL`

Use if:

* build fails
* hidden contact leaks
* public draft/pending rows visible
* fake data appears real
* fake counts shown
* fake verified/RERA/reviews shown
* search route crashes
* public-safe view leaks private data
* sitemap includes private URLs
* DB changes missing migration
* service role/provider secret exposed

### `BLOCKED`

Use if:

* Prompt 04 entity foundation failed
* public-safe views unavailable and cannot be safely created
* Supabase/database unavailable blocks implementation
* architecture conflict needs owner decision
* cannot inspect current code
* build baseline broken

### `SETUP_REQUIRED`

Use for:

* Supabase database/RLS not configured
* media provider missing
* analytics/Search Console missing
* CMS/legal pages missing
* maps/nearby missing
* contact/lead provider missing

---

## 74. Final Response Required Format

Return final response in this structure:

```txt id="prompt-05-final-response-format"
Summary:
- what public search/detail/profile/SEO foundation was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Routes:
- search:
- property detail:
- project detail:
- requirement detail:
- broker profile:
- builder profile:
- sitemap/robots:

Search:
- filters:
- sort:
- pagination:
- empty state:
- public-safe data source:

Detail pages:
- property:
- project:
- requirement:
- CTAs:
- media placeholders:

Profiles:
- broker:
- builder:
- owner privacy:

SEO:
- metadata:
- canonical:
- noindex:
- schema:
- sitemap:
- robots:

Security/privacy:
- hidden contact:
- public draft leak:
- private profile data:
- metadata/schema privacy:
- fake data/counts:

Performance:
- pagination:
- indexes:
- caching:
- heavy scripts:

Provider/setup-required:
- media:
- maps:
- analytics:
- contact/leads:

Docs updated:
- path list

Tests/checks run:
- command: result

Bugs/issues found:
- bug IDs or none

Rollback notes:
- code:
- database/views/indexes:
- SEO/cache:

Manual verification:
- pending prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md

Next step:
- run prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
```

Do not say only “done”.

---

## 75. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
```

Do not start Prompt 06 until Prompt 05 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 76. Common Bugs To Watch For

Create/track bugs for:

* `BUG-SEARCH-PUBLIC-DRAFT-LEAK`
* `BUG-SEARCH-HIDDEN-CONTACT-LEAK`
* `BUG-SEARCH-FAKE-COUNT`
* `BUG-SEARCH-FAKE-RESULT`
* `BUG-SEARCH-QUERY-CRASH`
* `BUG-SEARCH-UNBOUNDED-QUERY`
* `BUG-SEARCH-SQL-INJECTION-RISK`
* `BUG-DETAIL-UNPUBLISHED-VISIBLE`
* `BUG-DETAIL-HIDDEN-CONTACT-LEAK`
* `BUG-DETAIL-FAKE-RERA`
* `BUG-DETAIL-FAKE-VERIFIED`
* `BUG-PROFILE-PRIVATE-DATA-LEAK`
* `BUG-PROFILE-FAKE-COUNT`
* `BUG-SEO-PRIVATE-METADATA`
* `BUG-SEO-FAKE-SCHEMA`
* `BUG-SEO-SITEMAP-PRIVATE-URL`
* `BUG-SEO-NOINDEX-MISSING`
* `BUG-SEO-CANONICAL-WRONG`
* `BUG-UI-MOBILE-FILTER-BROKEN`
* `BUG-UI-DETAIL-HORIZONTAL-SCROLL`
* `BUG-RLS-PUBLIC-SAFE-VIEW-LEAK`
* `BUG-MIGRATION-MISSING`
* `BUG-BUILD-FAIL`

Use existing bug ID convention if available.

---

## 77. Quality Bar

This phase is successful when future phases can rely on:

* public search using only safe data
* detail pages showing only published safe entities
* public profiles showing only safe profile fields
* hidden contact protected everywhere
* no fake search results/counts
* SEO metadata safe
* noindex rules safe
* sitemap excludes private/unapproved pages
* search is paginated
* mobile search/detail/profile UI usable
* docs updated
* verification prompt ready

---

## 78. Final Rule For Prompt 05

Implement public discovery safely.

Use public-safe views or safe server projections.

Show only approved/published public data.

Do not expose hidden contact.

Do not expose private profile data.

Do not expose drafts or pending items.

Do not fake listings.

Do not fake counts.

Do not fake verified badges.

Do not fake RERA.

Do not fake reviews or schema.

Do not create thin SEO pages as indexable.

Do not include private URLs in sitemap.

Do not run unbounded search queries.

Do not skip migrations for DB changes.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
