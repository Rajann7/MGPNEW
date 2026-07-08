# prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md

# My Gujarat Property — Prompt 05 Manual Verification: Public Search, Detail Pages, Profiles And SEO

> **DESIGN-MATCH CHECK (mandatory):** Verify built screens match `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 3 & 4** and all `docs/06`/`docs/11` "Design Add-Ons". Confirm: transliteration/typo-tolerant search, masked contact reveal, compare tray, requirement masked-until-proposal-accepted, gallery per-photo caption.

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
```

This prompt verifies the **Public Search, Detail Pages, Public Profiles and SEO Foundation** phase.

Do not skip this verification.

Do not start Prompt 06 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real public-safe data, hidden-contact, SEO, route, search, profile and responsive checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
Prompt Number: 05 Verification
Phase: Public Search, Detail Pages, Profiles And SEO
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
Previous Prompt: prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
Next Implementation Prompt: prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that the public discovery layer is safe, useful, SEO-safe and privacy-safe.

This verification checks:

* `/search` route
* search query parameters
* filters
* sort
* pagination
* empty state
* search cards
* property detail pages
* project detail pages
* requirement detail behavior
* broker public profile pages
* builder public profile pages
* public-safe data source
* public-safe views
* hidden contact protection
* private profile protection
* unpublished entity protection
* fake data prevention
* fake count prevention
* fake verified/RERA/review prevention
* SEO metadata
* canonical URLs
* noindex rules
* structured data/schema
* breadcrumbs
* sitemap foundation
* robots foundation
* slug behavior
* responsive search/detail/profile UI
* build/lint/typecheck/tests
* docs updates
* Prompt 06 readiness

This phase does not verify full dashboards, leads, contact reveal, billing, media storage, ads, notifications or admin modules. Those are later prompts.

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

Also inspect all changed implementation files from Prompt 05.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* public search
* search result cards
* public detail pages
* broker/builder public profiles
* public-safe views/projections
* slug routing
* SEO metadata
* canonical URLs
* schema
* breadcrumbs
* sitemap/robots foundation
* noindex behavior
* hidden contact safety
* fake data checks
* responsive search/detail/profile UI
* docs/checklist updates

This verification does not cover:

* full role dashboards
* full admin moderation
* full contact reveal
* lead creation
* CRM/messages/site visits
* payment/subscription
* media storage upload
* ads/promotions
* notification delivery
* CMS/blog/legal full system
* advanced analytics
* PWA

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 05 changed files
3. inspect search route
4. inspect detail routes
5. inspect public profile routes
6. inspect public-safe data queries/views
7. inspect filters/sort/pagination
8. inspect SEO helpers
9. inspect metadata functions
10. inspect sitemap/robots
11. inspect schema/JSON-LD
12. inspect slug handling
13. search for hidden contact leaks
14. search for fake data/counts/badges
15. run available automated checks
16. run manual route smoke checks
17. test responsive widths
18. test noindex/canonical/schema basics
19. update required docs
20. create bugs for failures
21. decide verification result
22. update `brain.md`
23. prepare Prompt 06 readiness note

Do not skip docs updates.

---

## 6. Required File Inspection

Inspect likely changed files:

```txt id="file-inspection"
src/app/search/page.*
app/search/page.*
src/app/property/[slug]/page.*
app/property/[slug]/page.*
src/app/properties/[slug]/page.*
app/properties/[slug]/page.*
src/app/project/[slug]/page.*
app/project/[slug]/page.*
src/app/projects/[slug]/page.*
app/projects/[slug]/page.*
src/app/requirement/[slug]/page.*
app/requirement/[slug]/page.*
src/app/requirements/[slug]/page.*
app/requirements/[slug]/page.*
src/app/broker/[slug]/page.*
app/broker/[slug]/page.*
src/app/builder/[slug]/page.*
app/builder/[slug]/page.*
src/app/sitemap.*
app/sitemap.*
src/app/robots.*
app/robots.*
src/components/search/
components/search/
src/components/detail/
components/detail/
src/components/property/
components/property/
src/components/project/
components/project/
src/components/requirement/
components/requirement/
src/components/profile/
components/profile/
src/components/seo/
components/seo/
src/lib/search/
lib/search/
src/lib/seo/
lib/seo/
src/lib/db/
lib/db/
src/lib/supabase/
lib/supabase/
src/lib/validators/search.*
lib/validators/search.*
src/types/search.*
types/search.*
supabase/migrations/
```

Also inspect:

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

Record exact files changed by Prompt 05.

---

## 7. Route Verification

Verify these routes depending on chosen route convention:

```txt id="route-checks"
/search
/property/[slug] or /properties/[slug]
/project/[slug] or /projects/[slug]
/requirement/[slug] or /requirements/[slug] if implemented
/broker/[slug]
/builder/[slug]
/sitemap.xml or app sitemap route if implemented
/robots.txt or app robots route if implemented
```

Rules:

* canonical route must be clear
* alternate duplicate route must redirect or noindex
* no broken route from search cards
* no detail route showing unpublished/private entity
* no public route exposes hidden contact
* no admin/dashboard route included in public search/navigation

If search cards link to missing detail route:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 8. Public Search Page Verification

Verify `/search`:

* loads without crash
* accepts empty query
* accepts query params
* shows filters
* shows sort if implemented
* shows pagination
* shows result cards only from public-safe data
* shows empty state when no data
* does not show fake results
* does not show fake result count
* does not expose hidden contact
* does not show draft/pending/rejected/deleted entities
* does not show public admin link
* handles invalid params safely
* no unbounded query
* mobile filter works

If `/search` crashes on invalid params:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 9. Search Query Param Verification

Test/inspect support for safe params:

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

Verify:

* invalid values are rejected/ignored safely
* numeric values are parsed safely
* negative/huge numbers handled safely
* sort values are allowlisted
* page size is limited
* unknown params do not crash
* no raw SQL/order injection
* query params persist in UI
* reset/clear filters works

If user-provided sort/filter is directly injected into SQL:

* create critical bug
* mark `FAIL`

---

## 10. Search Filter Verification

Verify filters are real or safely disabled.

Check filters:

* entity type
* purpose
* category
* property/project type
* city/locality
* price/rent range
* area range
* BHK
* posted by
* RERA registered where implemented
* possession status where implemented

Rules:

* no fake filter counts
* no filter that silently does nothing unless clearly disabled
* selected filters visible
* clear filters works
* mobile apply/clear works
* filters do not expose private fields
* filters do not query unpublished rows

If a filter is shown but not functional and not labeled:

* create bug
* mark `PARTIAL`

---

## 11. Sort Verification

Verify sort options:

```txt id="sort-options"
newest
price_low_to_high
price_high_to_low
rent_low_to_high
rent_high_to_low
area_high_to_low
relevance
```

Rules:

* only implemented sorts shown
* relevance shown only if real/simple documented logic exists
* sort is allowlisted
* invalid sort does not crash
* sort does not query private data
* sort works with pagination
* sort does not fake ranking

If fake relevance/ranking exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 12. Pagination Verification

Verify:

* search does not load unlimited rows
* page size limited
* page query works
* next/previous works if implemented
* invalid page values handled
* mobile pagination/infinite scroll safe
* `?page=2` compatible if infinite scroll
* total count is real if shown
* no fake count

If search loads all listings unbounded:

* create bug
* mark `PARTIAL` or `FAIL` depending scale/risk

---

## 13. Search Card Verification

Verify cards show only safe fields.

### Property Cards

Check:

* title safe
* category/type safe
* purpose safe
* price/rent safe
* area safe
* city/locality safe
* thumbnail real/public or generic placeholder
* detail link works
* contact/inquiry CTA does not reveal phone/email
* no fake views/leads/verified/RERA

### Project Cards

Check:

* project name safe
* project type/category safe
* price range safe
* city/locality safe
* builder public name safe
* RERA shown only if real field exists
* no fake RERA verified
* no fake inventory
* no hidden contact

### Requirement Cards

If shown:

* budget/location/category safe
* contact hidden
* no private identity
* no fake urgency
* visibility rules respected

If any card shows private phone/email:

* create critical bug
* mark `FAIL`

---

## 14. Empty Search State Verification

Verify empty state:

* no fake cards
* no fake popular results
* no fake counts
* clear filters action works
* broaden search suggestion safe
* post requirement CTA triggers auth/setup as applicable
* mobile readable
* no hidden contact

If fake results appear in empty state:

* create bug
* mark `FAIL`

---

## 15. Public Data Source Verification

Inspect data fetching.

Preferred:

* public-safe views
* safe server-side projections with explicit select fields

Verify code does not:

* `select *` from private entity tables for public UI
* return private fields then hide client-side
* fetch drafts/pending rows and filter on client
* expose owner private profile fields
* expose contact fields
* expose admin notes
* expose private media
* use service role in client

If public UI selects private table data broadly:

* create critical bug
* mark `FAIL`

---

## 16. Public-Safe View Verification

If these views exist, verify behavior:

```txt id="public-safe-views"
public_properties_view
public_projects_view
public_requirements_view
public_broker_profiles_view
public_builder_profiles_view
```

Views must exclude:

* contact phone
* contact email
* private exact address if hidden
* draft/pending/rejected/private rows
* admin review notes
* rejection/need-changes reasons
* private media
* verification proof
* billing data
* internal moderation fields
* private profile fields

Views must include only safe approved/published rows.

If public-safe view leaks private data:

* create critical bug
* mark `FAIL`

---

## 17. Property Detail Page Verification

Verify property detail page for published entity:

* loads by slug
* shows title
* shows safe location
* shows price/rent
* shows area/details
* shows purpose/category/type
* shows description safely
* shows amenities if available
* shows real public media or placeholder
* shows uploader public-safe label/profile link
* shows contact/inquiry CTA but not phone/email
* shows save/share/report CTA foundation safely
* shows legal/safety disclaimer
* has safe SEO metadata
* has canonical
* has breadcrumbs
* mobile layout works

Verify unpublished property:

* not publicly visible
* 404/unavailable/noindex
* no private data leak

If draft/pending property detail is public:

* create critical bug
* mark `FAIL`

---

## 18. Project Detail Page Verification

Verify project detail page for published entity:

* loads by slug
* shows project name
* shows builder public profile link
* shows safe location
* shows project type/category
* shows price range
* shows unit configurations if real
* shows towers/wings/floors/units if real
* shows possession/timeline if real
* shows construction status if real
* shows amenities/specifications
* shows RERA details only if real/safe
* shows RERA disclaimer
* shows media/gallery placeholder if media missing
* shows brochure/floor plan placeholder if not ready
* shows contact/inquiry CTA but not phone/email
* has safe SEO metadata
* has canonical
* has breadcrumbs
* mobile layout works

Verify unpublished project:

* not publicly visible
* 404/unavailable/noindex
* no private data leak

If fake RERA/inventory/availability appears:

* create bug
* mark `FAIL`

---

## 19. Requirement Detail Behavior Verification

If public requirement detail exists:

* only approved/public-safe requirement visible
* contact hidden
* buyer/renter identity protected
* budget/location/category safe
* no private exact address
* proposal/contact CTA auth/setup-required
* no fake urgency
* noindex if thin/private/scoped

If requirements are scoped/private:

* public route should not leak data
* unauthorized/unavailable/noindex
* matching access later only

If requirement contact leaks:

* create critical bug
* mark `FAIL`

---

## 20. Broker Public Profile Verification

Verify broker profile:

* route loads by slug
* public broker/agency name safe
* role label safe
* city/locality safe
* bio public-safe
* avatar/logo public-safe
* verified badge only if real verified
* approved/published property listings only
* no fake listing count
* contact CTA does not reveal phone/email
* no private documents
* no internal notes
* no rejected/draft listings
* SEO metadata safe
* noindex if thin/unapproved
* mobile responsive

If broker profile leaks mobile/email/private docs:

* create critical bug
* mark `FAIL`

---

## 21. Builder Public Profile Verification

Verify builder profile:

* route loads by slug
* builder/company public name safe
* public logo/avatar safe
* city/locality safe
* public bio safe
* real verification/RERA status only
* approved/published projects only
* no fake project count
* no fake RERA verified badge
* contact CTA does not reveal phone/email
* no private RERA proof docs
* no internal notes
* SEO metadata safe
* noindex if thin/unapproved
* mobile responsive

If builder profile leaks private contact/docs:

* create critical bug
* mark `FAIL`

---

## 22. Owner Public Profile Privacy Verification

Verify owner privacy:

* no public owner profile route unless explicitly approved
* owner uploader info on property detail is minimal/safe
* owner phone/email hidden
* owner private profile not linked publicly unless product allows
* contact via CTA/auth flow only

If owner public page exposes private data:

* create critical bug
* mark `FAIL`

---

## 23. Contact / Inquiry CTA Verification

Test/inspect CTAs:

* Contact
* Request Contact
* Send Inquiry
* Save
* Share
* Report

Expected:

* guest contact/inquiry triggers auth/setup-required
* logged-in contact/inquiry does not reveal phone/email in this phase unless contact reveal implemented/verified later
* no fake lead created
* no fake inquiry success
* no phone/email in client payload
* share uses public URL only
* save/report setup-required/no fake success if not implemented

If contact CTA reveals hidden contact:

* create critical bug
* mark `FAIL`

---

## 24. Media Display Verification

Verify media behavior:

If real public media exists:

* shows only public media
* lazy-loaded
* no private signed URLs exposed incorrectly
* no hidden contact in alt text/metadata
* no broken images

If media not implemented:

* clean placeholder shown
* no fake photos
* no fake brochure
* no fake video
* no fake “10 photos”
* R2/CDN setup-required documented

If fake media appears as real:

* create bug
* mark `FAIL`

---

## 25. SEO Metadata Verification

Check metadata for:

* search page
* property detail
* project detail
* broker profile
* builder profile
* unavailable/private pages

Verify metadata includes:

* safe title
* safe description
* canonical where implemented
* noindex where needed
* safe Open Graph/Twitter values if implemented

Verify metadata excludes:

* phone/email
* hidden address
* private docs
* fake verified claims
* fake RERA verification
* fake reviews/ratings
* unapproved entity data

If hidden contact appears in metadata:

* create critical bug
* mark `FAIL`

---

## 26. Canonical Verification

Verify canonical URLs:

* detail pages point to canonical slug
* profile pages point to canonical slug
* alternate singular/plural routes redirect or canonical correctly
* search canonical safe/normalized or noindex as strategy
* no canonical to local/dev URL in production
* no canonical to private/admin/dashboard pages
* no duplicate canonical conflicts

If canonical is wrong but not leaking data:

* create bug
* mark `PARTIAL`

---

## 27. Noindex Verification

Verify noindex for:

* draft/pending/rejected/deleted/unavailable entities
* placeholder pages
* empty/thin search pages
* private/scoped requirement pages
* admin pages
* dashboard pages
* auth/internal pages
* setup-required pages

Verify indexable only:

* approved/published public-safe pages
* useful public profiles
* useful search pages with real data if strategy allows

If private/unapproved page is indexable:

* create bug
* mark `FAIL` if data leak risk

---

## 28. Structured Data / Schema Verification

If JSON-LD/schema exists, verify:

* valid JSON
* safe values only
* no hidden contact
* no private address if hidden
* no fake reviews
* no fake ratings
* no fake aggregateRating
* no fake availability
* no fake RERA
* no private docs
* no unpublished data
* breadcrumb schema safe

If schema includes fake reviews/ratings:

* create bug
* mark `FAIL`

If unsure, recommend minimal BreadcrumbList only.

---

## 29. Breadcrumb Verification

Verify breadcrumbs:

* Home link works
* Search link works
* entity/profile label safe
* no hidden contact
* no private address
* no layout overflow on mobile
* schema matches visible breadcrumbs if implemented

If breadcrumbs leak private location/address:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 30. Sitemap Verification

If sitemap implemented, verify:

* includes only approved/published public-safe entity pages
* includes only useful public broker/builder profiles
* excludes draft/pending/rejected/private/deleted
* excludes admin
* excludes dashboard
* excludes auth private pages
* excludes placeholder/thin/noindex pages
* excludes hidden contact/private data
* uses canonical URLs
* does not generate fake URLs
* handles no rows safely

If sitemap includes private/unapproved URLs:

* create critical bug
* mark `FAIL`

If sitemap not implemented, mark `PARTIAL` if intended later.

---

## 31. Robots Verification

If robots implemented, verify:

* disallows admin/dashboard/private routes where appropriate
* allows public routes
* references sitemap if available
* does not rely on robots as security
* does not expose sensitive routes as only protection
* no private data in robots comments

If robots missing, mark `PARTIAL` if sitemap/SEO foundation expected.

---

## 32. Slug Verification

Verify slugs:

* detail pages fetch by slug
* slug safe characters
* slug unique per entity type
* no phone/email/private address in slug
* collision handled
* deleted/unavailable slug safe
* alternate routes redirect/noindex
* changing slug future redirect documented

If slug includes hidden contact/private data:

* create bug
* mark `FAIL`

---

## 33. Public Unavailable State Verification

For unavailable/private/deleted/unpublished detail route, verify:

* 404 or safe unavailable message
* no private entity data
* no moderation reason
* no owner private info
* no hidden contact
* noindex
* no sitemap inclusion
* no fake fallback listing

Safe message example:

```txt id="safe-unavailable-message"
This listing is not available right now.
```

If unavailable page leaks internal status/reason:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 34. Fake Data Verification

Search for and inspect fake public data.

Not allowed as real:

* fake result cards
* fake property/project/requirement data
* fake listing count
* fake project count
* fake views
* fake leads
* fake inquiry count
* fake reviews
* fake ratings
* fake verified badges
* fake RERA
* fake availability
* fake sponsored label
* fake media
* fake profile stats

If demo data exists:

* must be dev-only or clearly placeholder
* not used for production PASS
* not in sitemap/schema

If fake data appears real:

* create bug
* mark `FAIL`

---

## 35. Hidden Contact Deep Check

Search page source/code for:

* phone fields
* email fields
* mobile fields
* WhatsApp numbers
* contact JSON
* private address
* hidden_contact
* contact_visibility
* profile email/mobile
* private profile joins

Check places:

* result cards
* detail pages
* profile pages
* metadata
* schema
* sitemap
* share text
* API/server responses
* client data props
* logs

If hidden contact leak found:

* create critical bug
* mark `FAIL`

---

## 36. Search Security Verification

Verify:

* no SQL injection risk
* no unsafe dynamic sort
* query sanitized
* invalid filters safe
* page size limited
* search uses public-safe data
* no private table raw data sent to client
* no service role in client
* no private fields returned then hidden client-side
* no unbounded broad query
* no heavy wildcard without index/limit

If dangerous query exists:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 37. Direct URL Private Entity Verification

Test/inspect direct slugs for private statuses:

* draft
* submitted
* under_review
* need_changes
* rejected
* paused
* expired
* deleted

Expected:

* not public
* unavailable/404
* noindex
* no private payload
* no hidden contact
* no moderation reason

If direct URL reveals private entity:

* create critical bug
* mark `FAIL`

---

## 38. Public Profile Private Data Verification

Verify public broker/builder profiles do not expose:

* private mobile/email
* personal identity documents
* verification proof
* RERA proof docs
* billing info
* internal staff notes
* approval notes
* private address
* provider status
* support tickets

If private profile data appears:

* create critical bug
* mark `FAIL`

---

## 39. Responsive Verification

Test these widths:

```txt id="responsive-widths"
320px
360px
390px
430px
768px
1024px
1366px
```

Check search page:

* filters usable
* filter sheet/drawer fits
* result cards fit
* sort works
* pagination visible
* no horizontal scroll

Check detail pages:

* title/price readable
* gallery/placeholder fits
* CTA bar not covering content
* detail sections readable
* breadcrumbs do not overflow

Check profile pages:

* profile header fits
* listing/project cards fit
* tabs/sections usable
* no horizontal scroll

If responsive not fully tested, mark `PARTIAL`.

Do not mark responsive PASS without checks.

---

## 40. Mobile Filter Verification

If mobile filter sheet exists, verify:

* opens
* closes
* clear filters works
* apply works
* selected chips update
* body scroll behavior acceptable
* sticky apply button does not cover fields
* no clipped dropdowns
* no horizontal scroll
* keyboard/touch works

If mobile filter is broken:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 41. Detail Mobile CTA Verification

If sticky CTA exists:

* contact CTA visible
* save/share/report accessible
* CTA does not cover content
* CTA requires auth/setup
* no phone/email reveal
* no double click fake success
* safe on 320px

If sticky CTA blocks content badly:

* create bug
* mark `PARTIAL`

---

## 42. Accessibility Verification

Check search/detail/profile accessibility:

* semantic headings
* labels for filters
* buttons have text/aria labels
* cards have meaningful links
* images have alt text
* focus visible
* keyboard navigation possible
* modal/filter sheet focus behavior safe
* breadcrumbs accessible
* status not color-only
* errors readable
* tap targets large

If severe accessibility blocker exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 43. Performance Verification

Verify:

* search paginated
* indexed columns used where possible
* no unbounded fetch
* no N+1 heavy query
* no unnecessary maps/payment/media provider script
* images lazy-loaded
* public pages cache/revalidate safely
* private/unavailable pages not cached with private data
* build passes
* no huge client bundle from search filters if avoidable

If unbounded search query exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 44. Caching Verification

Verify caching does not leak private data.

Allowed:

* published public-safe detail pages
* public-safe search results
* public profiles
* static SEO helpers

Not allowed:

* draft/private rows cached publicly
* hidden contact cached
* private profile fields cached
* signed private media cached
* auth-specific payload cached in public page

If caching private data risk exists:

* create critical bug
* mark `FAIL`

---

## 45. Build / Lint / Typecheck Verification

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

## 46. Migration Apply/Test Verification

If Prompt 05 created migration:

* apply migration in safe local/staging environment
* verify views exist
* verify indexes exist
* verify RLS unchanged/safe
* verify public-safe views exclude private fields
* verify rollback notes

If migration cannot be applied due to missing DB environment:

* record `SETUP_REQUIRED`
* do not mark DB runtime PASS

---

## 47. Route Smoke Test Matrix

Test these route patterns:

```txt id="route-smoke-matrix"
/search
/search?q=2bhk
/search?entity=property&purpose=sell
/search?entity=project&city=rajkot
/search?sort=price_low_to_high
/search?page=2
/property/[published-slug]
/property/[draft-or-rejected-slug]
/project/[published-slug]
/project/[draft-or-rejected-slug]
/broker/[public-slug]
/builder/[public-slug]
/sitemap.xml
/robots.txt
```

If no real seed/published data exists, inspect code and use safe test data only in local/dev with clear documentation.

Do not add fake production data to pass tests.

---

## 48. SEO Smoke Test Matrix

Check:

* title/meta for `/search`
* title/meta for property detail
* title/meta for project detail
* title/meta for broker profile
* title/meta for builder profile
* noindex for empty/thin/search placeholder
* noindex for private/unavailable detail
* canonical for detail/profile
* schema safe
* sitemap excludes private
* robots present/safe if implemented

Document exact result.

---

## 49. Documentation Update Verification

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

## 50. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

* public search page
* search query params
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

Future features must not be marked done.

---

## 51. Changelog Verification

Check `CHANGELOG.md` includes Prompt 05 entry with:

* date
* summary
* changed files
* new routes
* migration files
* public-safe view/index changes
* SEO changes
* provider status changes
* docs updated
* tests/checks run
* verification status
* known issues
* rollback notes

If missing, update changelog.

---

## 52. Bugs And Fixes Verification

If issues are found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

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

## 53. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 05 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* routes checked
* search tests
* detail page tests
* profile tests
* SEO tests
* public-safe data tests
* hidden contact tests
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

## 54. Security Checklist Verification

Update/verify `SECURITY_RLS_CHECKLIST.md`.

Include Prompt 05 results for:

* public search data source
* public-safe views
* hidden contact checks
* unpublished entity denial
* public profile privacy
* metadata/schema privacy
* sitemap privacy
* contact CTA auth requirement
* direct URL private slug checks
* RLS status
* service role client exposure check
* known issues

If hidden contact/metadata/sitemap leak exists, result cannot be PASS.

---

## 55. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

Include Prompt 05 results for:

* search pagination
* search indexes
* query limits
* no unbounded reads
* no fake total counts
* detail query efficiency
* profile query efficiency
* image lazy-load
* no maps/payment heavy scripts
* cache/revalidation strategy
* private no-store rule
* build status
* mobile filter performance
* known performance issues

---

## 56. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

Include:

* Prompt 05 route changes
* component changes
* SEO changes
* sitemap/robots changes
* migration path if any
* view/index rollback notes
* cache purge/revalidation notes
* data risk
* rollback plan
* post-deploy verification checklist

If sitemap/robots/metadata changed, include cache/revalidation notes.

---

## 57. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md` if statuses changed.

Relevant statuses:

* Supabase Database/RLS
* Media/R2
* CDN
* Maps
* Analytics/Search Console
* Contact/Lead provider
* CMS/legal

Rules:

* no provider active without test
* missing media/maps/analytics are setup-required/not-started
* UI must not fake provider-backed behavior

---

## 58. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 05 implementation summary
* Prompt 05 verification result
* changed files
* routes checked
* migrations/views/indexes
* search/detail/profile status
* SEO status
* hidden contact result
* fake data result
* responsive result
* setup-required providers
* bugs/blockers
* commands run
* next prompt:

  * `prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md`
* instruction not to proceed if Prompt 05 failed/blocked

---

## 59. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* `/search` loads and handles params safely
* search uses public-safe data
* pagination/limits exist
* property detail shows only published safe entity
* project detail shows only published safe entity
* requirement detail behavior is safe
* broker profile safe
* builder profile safe
* hidden contact absent from UI/source/metadata/schema/sitemap
* unpublished/draft/pending/rejected/deleted entities not public
* no fake listings/counts/badges/reviews
* SEO metadata safe
* noindex rules safe
* canonical safe
* sitemap/robots safe if implemented
* responsive checks completed
* docs updated
* no blocking bugs

### PARTIAL

Use `PARTIAL` if:

* search works with limited filters
* sitemap not implemented yet but no private sitemap leak exists
* schema minimal only
* requirement public behavior deferred/scoped safely
* media placeholders only
* analytics/Search Console setup-required
* some responsive/cross-browser checks pending
* RLS runtime tests unavailable but public-safe code reviewed
* some profile pages noindex due to thin content

Prompt 06 can start only if user/Super Admin accepts partial and no critical privacy/security issue exists.

### FAIL

Use `FAIL` if:

* build fails
* hidden contact leaks
* public draft/pending/rejected row visible
* fake data appears real
* fake counts shown
* fake verified/RERA/reviews shown
* search route crashes
* unsafe query/sort injection risk
* unbounded search query
* public-safe view leaks private data
* sitemap includes private/unapproved URLs
* metadata/schema includes private data
* DB changes missing migration
* service role/provider secret exposed

Do not start Prompt 06.

### BLOCKED

Use `BLOCKED` if:

* Prompt 04 entity foundation failed
* public-safe views unavailable and cannot be safely created
* cannot inspect required files
* package/build baseline broken
* database unavailable blocks all meaningful verification
* architecture conflict needs owner decision
* required Prompt 05 files missing

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* Supabase database/RLS runtime missing
* media provider missing
* analytics/Search Console missing
* CMS/legal missing
* maps/nearby missing
* contact/lead provider missing

Setup-required can coexist with `PARTIAL`.

---

## 60. Prompt 06 Readiness Checklist

Prompt 06 can start only if:

* Prompt 05 implementation completed
* Prompt 05 verification completed
* no critical public-safe/privacy bug open
* no hidden contact leak
* no public draft/private leak
* no fake data shown as real
* public search/detail/profile routes safe
* SEO/noindex/sitemap safe or safely partial
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md`

If Prompt 06 file is missing, stop and ask/generate it.

---

## 61. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 05 Verification — Public Search, Detail Pages, Profiles And SEO

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Routes Checked:
- /search:
- property detail:
- project detail:
- requirement detail:
- broker profile:
- builder profile:
- sitemap:
- robots:

Search Checks:
- query params:
- filters:
- sort:
- pagination:
- empty state:
- public-safe data source:

Detail Page Checks:
- property:
- project:
- requirement:
- contact CTA:
- media placeholder:
- unavailable/private entity:

Profile Checks:
- broker:
- builder:
- owner privacy:

SEO Checks:
- metadata:
- canonical:
- noindex:
- schema:
- breadcrumbs:
- sitemap:
- robots:

Security/Public Safety:
- hidden contact:
- private profile data:
- public draft/private leak:
- fake data/counts:
- fake verified/RERA/reviews:
- service role/provider secrets:

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
- Public search/detail/profile/SEO foundation is safe and ready for Prompt 06.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 06:
- Yes/No

Next Step:
- prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md or fix blockers first.
```

---

## 62. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 05 Public Search/Detail/Profile/SEO verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Routes checked:
- /search:
- property detail:
- project detail:
- requirement detail:
- broker profile:
- builder profile:
- sitemap/robots:

Search:
- query params:
- filters:
- sort:
- pagination:
- empty state:
- public-safe data source:

Detail pages:
- property:
- project:
- requirement:
- unavailable/private entity:
- contact CTA:

Profiles:
- broker:
- builder:
- owner privacy:

SEO:
- metadata:
- canonical:
- noindex:
- schema:
- breadcrumbs:
- sitemap:
- robots:

Security/public safety:
- hidden contact:
- private profile data:
- public draft/private leak:
- fake data/counts:
- fake verified/RERA/reviews:
- service role/provider secrets:

Responsive:
- widths tested:
- mobile filters:
- detail CTA:
- horizontal scroll:

Performance:
- pagination:
- indexes:
- unbounded queries:
- caching:
- heavy scripts:

Provider/setup-required:
- Supabase:
- media/R2:
- maps:
- analytics/Search Console:
- contact/leads:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 06:
- Yes/No
- reason

Next step:
- prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
```

Do not write vague “verified”.

---

## 63. If Verification Fails

If verification fails:

1. do not start Prompt 06
2. create/update bug entries
3. update `MANUAL_VERIFICATION.md`
4. update `SECURITY_RLS_CHECKLIST.md`
5. update `PERFORMANCE_CHECKLIST.md`
6. update `DEPLOYMENT_ROLLBACK.md`
7. update `brain.md`
8. state exact blocker
9. fix if safe and in scope
10. rerun verification
11. only then proceed

Critical privacy/security/SEO leaks block progress.

---

## 64. If Verification Is Partial

If verification is partial:

* document exact partial items
* list setup-required providers
* list untested responsive/browser checks
* list missing SEO pieces
* list deferred filters/schema/sitemap items
* confirm no hidden contact leak
* confirm no public draft/private leak
* confirm no fake data as real
* update docs
* ask/require owner acceptance before Prompt 06 if risk is significant

Acceptable partial examples:

* limited filters
* sitemap deferred
* schema minimal only
* requirement public detail scoped/noindex
* media placeholder only
* Search Console/analytics setup-required
* some browser tests not done

Not acceptable partial without fix:

* hidden contact leak
* public draft leak
* fake listings/counts as real
* fake verified/RERA/reviews
* search route crash
* sitemap private URL
* metadata private data
* build fail

---

## 65. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `DEPLOYMENT_ROLLBACK.md`
* update `brain.md`
* final response should say Prompt 06 can start

Do not start Prompt 06 automatically unless user asked to continue.

---

## 66. What Not To Do In This Verification

Do not:

* implement full dashboards
* implement leads/contact reveal
* implement payment
* implement media upload/R2
* implement full admin
* add fake listings for search
* add fake counts
* add fake verified badges
* add fake RERA
* add fake reviews/ratings
* add fake schema
* expose hidden contact
* expose private profile data
* index private/placeholder pages
* include private URLs in sitemap
* bypass RLS/public-safe views
* ignore unbounded query
* ignore build failure
* start Prompt 06 after FAIL/BLOCKED

---

## 67. Quality Bar

This verification is successful when future phases can trust that:

* public search is safe
* public detail pages show only published safe data
* broker/builder profiles are public-safe
* owner privacy is protected
* hidden contact is protected everywhere
* no draft/private entity is public
* SEO metadata is safe
* schema has no fake/private data
* sitemap excludes private/unapproved pages
* search is paginated/limited
* mobile search/detail/profile UX is usable
* docs reflect reality
* Prompt 06 dashboards can build on safe public data and entity foundations

---

## 68. Final Rule For Prompt 05 Verification

Verify public search honestly.

Verify detail pages honestly.

Verify public profiles honestly.

Verify SEO honestly.

Verify sitemap/robots honestly.

Verify public-safe data honestly.

Verify hidden contact honestly.

Verify no fake data honestly.

Verify noindex/canonical/schema honestly.

Do not fake search results.

Do not fake counts.

Do not fake verified badges.

Do not fake RERA.

Do not fake reviews.

Do not expose private profile data.

Do not expose hidden contact.

Do not expose drafts/pending/rejected entities.

Do not include private URLs in sitemap.

Do not mark PASS without responsive and security checks.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
