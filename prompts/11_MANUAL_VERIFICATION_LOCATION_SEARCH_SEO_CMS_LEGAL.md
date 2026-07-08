# prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md

# My Gujarat Property — Prompt 11 Manual Verification: Location, Search, SEO, CMS And Legal

> **DESIGN-MATCH CHECK (mandatory):** Verify built screens match `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 3, 14, 16** and all `docs/11` "Design Add-Ons". Confirm: transliteration/alias search, shared legal-doc layout + TOC, legal versioning+sign-off, redirect loop guard, sitemap exclusion transparency, SEO counters + snippet preview, guest support rate-limit.

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md
```

This prompt verifies the **Location, Search, SEO, CMS And Legal** phase.

Do not skip this verification.

Do not start Prompt 12 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real location, search, SEO, sitemap, CMS, legal, privacy, RLS, noindex, fake-data, responsive and docs checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md
Prompt Number: 11 Verification
Phase: Location, Search, SEO, CMS And Legal
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md
Previous Prompt: prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md
Next Implementation Prompt: prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that the location, search, SEO, CMS and legal system is safe, useful, public-private separated, SEO-compliant, privacy-safe and honest.

This verification checks:

* Gujarat location hierarchy
* active/canonical location data
* location aliases
* translations/transliteration
* cascading dropdowns
* missing location request flow
* admin location review
* location merge/deprecation foundation
* search parameter normalization
* search filters
* search sort and pagination
* search empty/thin noindex handling
* SEO landing pages
* canonical rules
* metadata rules
* schema safety
* sitemap generation
* sitemap private URL exclusion
* robots rules
* redirect manager
* sold/rented/expired listing SEO handling
* CMS page foundation
* blog foundation
* legal/policy page foundation
* legal placeholder/final-status safety
* consent record foundation
* cookie/privacy preference foundation
* grievance/takedown/privacy request foundation
* admin SEO/CMS/legal/location controls
* CMS sanitizer and unsafe HTML prevention
* public footer legal/help link consistency
* RLS policies
* admin direct URL denial
* hidden contact metadata/schema/sitemap protection
* no fake SEO counts
* no fake review/rating schema
* no mass thin indexed pages
* responsive search/location/CMS/legal UI
* docs updates
* Prompt 12 readiness

This phase does not verify full ads/promotions, external notification providers, final lawyer-approved policy signoff, Google Search Console production submission, final SEO traffic performance, final analytics provider setup, or full support ticket system. Those are later prompts or operational checks.

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
prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md
prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md
prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md
docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md
docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md
docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md
docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md
docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md
docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect all changed implementation files from Prompt 11.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* location master data foundation
* location request workflow
* admin location moderation
* search filtering/refinement
* canonical/noindex logic
* sitemap/robots logic
* schema safety
* redirect manager
* CMS/blog/legal foundations
* legal placeholder safety
* consent/cookie/privacy foundation
* grievance/takedown foundation
* admin controls and permissions
* RLS/private content protection
* public footer/link integration
* docs/checklist updates

This verification does not cover:

* final lawyer-approved legal text
* final tax/legal compliance signoff
* paid ads/promotions
* notification provider delivery
* external Google Search Console submission
* production analytics validation
* full support ticket workflow
* external map/geocoding provider if not configured
* full multilingual translation review workflow
* final SEO ranking/traffic result

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 11 changed files
3. inspect location migration/tables
4. inspect RLS policies
5. inspect location hierarchy/data model
6. inspect cascading dropdowns
7. inspect missing location request flow
8. inspect admin location review flow
9. inspect search param normalization
10. inspect search filters/sort/pagination
11. inspect public search data source
12. inspect SEO landing pages
13. inspect canonical/noindex logic
14. inspect metadata/schema helpers
15. inspect sitemap generation
16. inspect robots rules
17. inspect redirect manager
18. inspect CMS/blog/legal page behavior
19. inspect legal placeholder/final status
20. inspect consent/cookie/grievance/privacy foundation
21. inspect admin SEO/CMS/legal/location permission checks
22. inspect CMS sanitizer/HTML safety
23. search for hidden contact in metadata/schema/sitemap
24. search for fake counts/reviews/schema
25. run available automated checks
26. run manual smoke checks where possible
27. test responsive widths
28. update required docs
29. create bugs for failures
30. decide final verification result
31. update `brain.md`
32. prepare Prompt 12 readiness note

Do not skip docs updates.

---

## 6. Required File Inspection

Inspect likely changed files:

```txt id="file-inspection"
src/app/search/
app/search/
src/app/locations/
app/locations/
src/app/gujarat/
app/gujarat/
src/app/sitemap.*
app/sitemap.*
src/app/robots.*
app/robots.*
src/app/blog/
app/blog/
src/app/help/
app/help/
src/app/support/
app/support/
src/app/about/
app/about/
src/app/contact/
app/contact/
src/app/faq/
app/faq/
src/app/privacy/
app/privacy/
src/app/terms/
app/terms/
src/app/refund/
app/refund/
src/app/cancellation/
app/cancellation/
src/app/cookie-policy/
app/cookie-policy/
src/app/safety/
app/safety/
src/app/disclaimer/
app/disclaimer/
src/app/grievance/
app/grievance/
src/app/admin/locations/
app/admin/locations/
src/app/admin/seo/
app/admin/seo/
src/app/admin/cms/
app/admin/cms/
src/app/admin/blog/
app/admin/blog/
src/app/admin/legal/
app/admin/legal/
src/app/admin/redirects/
app/admin/redirects/
src/components/location/
components/location/
src/components/search/
components/search/
src/components/seo/
components/seo/
src/components/cms/
components/cms/
src/components/legal/
components/legal/
src/components/blog/
components/blog/
src/lib/location/
lib/location/
src/lib/search/
lib/search/
src/lib/seo/
lib/seo/
src/lib/sitemap/
lib/sitemap/
src/lib/cms/
lib/cms/
src/lib/legal/
lib/legal/
src/lib/actions/location.*
lib/actions/location.*
src/lib/actions/cms.*
lib/actions/cms.*
src/lib/actions/seo.*
lib/actions/seo.*
src/lib/validators/location.*
lib/validators/location.*
src/lib/validators/seo.*
lib/validators/seo.*
src/lib/validators/cms.*
lib/validators/cms.*
src/types/location.*
types/location.*
src/types/seo.*
types/seo.*
src/types/cms.*
types/cms.*
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

If Prompt 11 changed database schema, verify migration exists.

Expected pattern:

```txt id="expected-migration"
supabase/migrations/*_location_search_seo_cms_legal.sql
```

Verify migration includes:

* purpose
* phase: Prompt 11
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* functions/triggers if any
* slug uniqueness constraints
* redirect uniqueness/loop prevention if implemented
* destructive changes yes/no
* backup required yes/no
* rollback notes

If DB changed without migration:

* create critical bug
* mark verification `FAIL`
* do not start Prompt 12

If migration exists without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL` depending data/SEO risk

If DB not changed because Supabase/env unavailable:

* mark DB/RLS runtime checks `SETUP_REQUIRED`
* do not claim RLS PASS

---

## 8. Expected Table Verification

If schema exists, check for implemented or reused tables.

Possible tables:

```txt id="expected-tables"
locations
location_aliases
location_translations
missing_location_requests
location_audit_logs
seo_pages
seo_metadata_overrides
redirects
sitemap_entries
cms_pages
cms_revisions
blog_posts
blog_categories
blog_tags
blog_post_tags
legal_pages
legal_versions
consent_records
cookie_preferences
support_content_pages
grievance_requests
privacy_requests
content_audit_logs
```

Minimum safe foundation should include:

* location model or safe location config
* missing location request storage if flow is surfaced
* CMS/legal/blog storage or safe static implementation
* SEO/canonical helpers
* sitemap/robots implementation
* RLS for private/admin-user tables
* status fields for draft/published/deleted content
* audit/permission foundation for admin content changes

If implementation claims feature complete but storage/status/RLS is missing:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 9. Location Hierarchy Verification

Verify location hierarchy supports:

```txt id="location-hierarchy"
country
state
district
taluka
city_or_village
area
locality
society
building
landmark
address_line
pin_code
map_pin_lat_lng_optional
```

Check:

* India/Gujarat default supported
* district supported
* taluka supported
* city/village supported
* area/locality/society/building foundation exists or documented partial
* PIN code foundation exists or documented partial
* landmark/address fields safe
* map pin optional/setup-required if map provider missing
* exact private address not exposed publicly unless intended
* no hidden contact in location labels
* no fake location records marked active

If fake location data is marked canonical/active without source/review:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 10. Gujarat Location Data Verification

Verify Gujarat data status:

* districts available or setup-required
* talukas available or setup-required
* major cities available or setup-required
* city/village distinction possible
* aliases for common names if implemented
* transliteration support if implemented
* incomplete data clearly documented
* no fake full Gujarat coverage claim if incomplete

If UI claims “all Gujarat locations covered” but data is partial:

* create bug
* mark `PARTIAL`

---

## 11. Location Status Verification

Verify statuses:

```txt id="location-statuses"
draft
active
inactive
pending_review
rejected
merged
deprecated
deleted
```

Check:

* only active/canonical locations public
* draft/pending/rejected/deleted not public
* merged/deprecated canonicalize or redirect
* status changes permission-scoped
* status changes audited where implemented
* public dropdown excludes inactive/deleted
* stale selection handled safely

If deleted/rejected location appears public:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 12. Location Alias / Translation Verification

Verify:

* aliases map to canonical location
* slug aliases redirect/canonicalize
* Gujarati labels safe
* Hindi labels safe if implemented
* English labels safe
* transliteration search works or setup-required
* fallback to English when translation missing
* no fake translations marked reviewed
* no private/hidden contact in labels
* alias conflicts handled

If alias creates duplicate indexed page instead of canonical/redirect:

* create bug
* mark `PARTIAL`

---

## 13. Cascading Dropdown Verification

Verify cascading dropdowns:

* country → state
* state → district
* district → taluka
* taluka → city/village
* city/village → area
* area → locality
* locality → society
* society → building
* optional landmark/PIN
* request missing option

Check:

* data-driven
* searchable for large lists
* no unbounded loading
* mobile usable
* selected values persist in forms/drafts
* invalid stale location handled
* missing location request CTA works/setup-required
* no hidden contact in dropdown options

If dropdown loads all location data unbounded and blocks UI:

* create bug
* mark `PARTIAL`

---

## 14. Missing Location Request Verification

Verify missing location request statuses:

```txt id="missing-location-request-statuses"
submitted
under_review
approved
rejected
merged
need_more_info
spam
closed
```

Check:

* auth required where request tied to posting
* input sanitized
* duplicate request handling
* rate limit/spam foundation documented
* requester can see own request status
* wrong user cannot see another user's request
* public cannot read requests
* admin approval required before canonical
* rejection reason safe
* no fake approval

If missing location requests are public:

* create critical bug
* mark `FAIL`

---

## 15. Admin Location Management Verification

Verify admin location tools:

* permission-scoped
* guest/public denied
* staff without location permission denied
* approve request works or setup-required
* reject request requires reason
* merge duplicate location safe
* deactivate/deprecate safe
* aliases/translations editable by permission
* audit log created if implemented
* no hard delete by normal admin
* no fake bulk import success
* direct URL denied to unauthorized staff

If public user can approve location:

* create critical bug
* mark `FAIL`

---

## 16. Search Parameter Normalization Verification

Verify search params are allowlisted:

```txt id="search-params"
q
purpose
entity
category
type
state
district
taluka
city
village
area
locality
society
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
status
sort
page
```

Check:

* invalid params ignored/corrected safely
* canonical removes junk params
* page validated
* sort allowlisted
* numeric ranges validated
* SQL injection protected
* no crash from invalid params
* no hidden contact in query/result metadata
* no private data in query serialization

If invalid param crashes `/search`:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 17. Search Filter Verification

Verify search filters:

* purpose
* entity
* category
* type
* location hierarchy
* budget/price/rent
* area
* bedrooms where relevant
* posted_by where safe
* sort
* page

Check:

* filters map to real DB fields
* filters use approved/published public-safe data only
* filter chips update URL
* mobile filters usable
* invalid filters do not crash
* no fake result counts
* no fake map pins
* no fake sponsored ordering before ads phase

If search shows private/pending listings:

* create critical bug
* mark `FAIL`

---

## 18. Search Sort Verification

Allowed sorts:

```txt id="allowed-sorts"
newest
price_low
price_high
rent_low
rent_high
area_low
area_high
relevant
```

Check:

* sort allowlisted
* invalid sort safely defaults
* raw SQL not used
* stable ordering
* no fake relevance claim if search engine not configured
* no sponsored/boosted order without label and ads implementation
* no private rows in sorting

If sort param causes SQL injection risk:

* create critical bug
* mark `FAIL`

---

## 19. Search Pagination Verification

Verify:

* `page` param validated
* `page=1` canonical omits page where expected
* page 2+ canonical/pagination rules documented
* invalid page handled safely
* high empty pages noindex or 404 as documented
* infinite scroll uses page URLs if implemented
* no duplicate results
* no unbounded result load
* mobile pagination/infinite scroll safe

If arbitrary high empty pages are indexable:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 20. Public Search Data Source Verification

Public search must show only:

* approved/published properties
* approved/published projects
* public-safe profiles
* approved/scoped public requirements if product allows
* public-ready media only
* public-safe location labels

Public search must exclude:

* drafts
* pending
* under_review
* need_changes
* rejected
* paused/private
* deleted
* private media
* hidden contact
* private notes
* private requirement contact
* admin data

If public search uses private tables directly without safe filters/RLS:

* create critical bug
* mark `FAIL`

---

## 21. SEO Landing Page Verification

Verify SEO page types if implemented:

```txt id="seo-page-types"
city_property_page
city_project_page
city_type_page
locality_property_page
locality_project_page
district_page
taluka_page
property_type_page
project_type_page
broker_profile_page
builder_profile_page
blog_article
cms_page
legal_page
```

Check:

* only useful pages indexable
* empty/thin pages noindex
* duplicate aliases redirect/canonicalize
* pending/private data excluded
* title/H1/meta safe
* no fake counts
* no fake reviews
* no hidden contact
* no keyword stuffing
* no mass doorway pages

If empty SEO page is indexable:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 22. SEO Metadata Verification

Verify metadata:

* title
* description
* canonical
* robots
* OG title
* OG description
* OG image public-safe
* H1
* intro copy if content exists
* breadcrumbs
* schema where safe

Check:

* metadata matches visible content
* no phone/email/hidden contact
* no fake count
* no fake review/rating
* no private address unless intended public
* no pending/draft data
* no fake verified/RERA/legal guarantee
* no private media URL
* no provider secrets

If hidden contact appears in metadata:

* create critical bug
* mark `FAIL`

---

## 23. Canonical URL Verification

Verify canonical rules for:

* `/search`
* query param order
* tracking params
* page 1
* page 2+
* city/locality slugs
* category/type slugs
* aliases
* merged/deprecated locations
* property/project detail slugs
* profile slugs
* blog/CMS/legal slugs
* trailing slash policy
* uppercase/lowercase normalization

Check:

* canonical never points to private URL
* canonical removes junk params
* alias redirects/canonicalizes
* invalid pages noindex/404
* no canonical loops
* no duplicate indexed aliases

If canonical points to private/dashboard URL:

* create critical bug
* mark `FAIL`

---

## 24. Robots Verification

Verify robots rules block/noindex:

* admin routes
* dashboard routes
* auth routes if private
* leads/messages/proposals/site visits
* billing pages
* private media pages
* upload routes
* API routes
* preview routes
* draft CMS/blog/legal pages
* thin/empty search pages
* internal setup/provider pages

Verify robots allow where appropriate:

* home
* useful public SEO pages
* public search pages that pass quality
* approved/published property/project pages
* public broker/builder profiles
* published CMS/blog/legal pages
* sitemap files

Noindex is not security; private routes must still be protected.

If robots allows private pages and sitemap includes them:

* create bug
* mark `FAIL`

---

## 25. Sitemap Verification

Verify sitemap includes only public indexable URLs:

* home
* approved stable public search/SEO pages
* approved/published property pages
* approved/published project pages
* public broker/builder profiles
* published CMS pages
* published blog posts
* published legal pages
* public active location pages that pass quality

Verify sitemap excludes:

* admin
* dashboard
* auth private pages
* private media
* leads/messages/proposals/site visits
* billing
* upload/API routes
* drafts
* pending/rejected/deleted listings
* thin/empty pages
* internal setup pages
* hidden contact URLs
* private preview URLs

If private URL appears in sitemap:

* create critical bug
* mark `FAIL`

---

## 26. Sitemap Splitting Verification

If sitemap splitting implemented, verify:

```txt id="sitemap-files"
sitemap.xml
sitemap-static.xml
sitemap-properties.xml
sitemap-projects.xml
sitemap-locations.xml
sitemap-profiles.xml
sitemap-blog.xml
sitemap-cms.xml
```

Check:

* root sitemap links child sitemaps
* each child sitemap public-safe
* no huge unbounded query
* pagination/batching safe
* stale/deleted entries excluded
* lastmod real or omitted
* invalid URLs excluded
* no private media URLs

If not implemented, ensure foundation/status documented.

---

## 27. Structured Data / Schema Verification

Allowed schema types where safe:

```txt id="schema-types"
Organization
WebSite
BreadcrumbList
RealEstateListing if suitable and safe
Residence / Apartment / LocalBusiness only if safe
Article
FAQPage
ContactPage
AboutPage
WebPage
```

Check:

* schema matches visible content
* no fake reviews
* no fake aggregateRating
* no hidden phone/email
* no fake availability
* no fake price
* no fake RERA/verified guarantee
* no private address unless intended public
* no pending/draft listing schema
* no private media URL
* conservative schema used if uncertain

If fake review/rating schema exists:

* create critical bug
* mark `FAIL`

---

## 28. Hidden Contact SEO Deep Check

Search metadata/schema/sitemap/public HTML for:

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
tel:
mailto:
wa.me
```

Check:

* no hidden contact in metadata
* no hidden contact in schema
* no hidden contact in sitemap
* no hidden contact in canonical
* no hidden contact in OG tags
* no hidden contact in public JSON payloads
* no hidden contact in CMS auto content
* no hidden contact in public location/profile SEO content

If hidden contact leaks:

* create critical bug
* mark `FAIL`

---

## 29. Fake SEO Data Verification

Search for fake SEO claims:

```txt id="fake-seo-patterns"
1000+
top rated
best property
trusted by
reviews
rating
aggregateRating
5.0
verified listings
RERA approved
hot deals
popular count
resultCount fake
dummy count
mock count
sample SEO
```

Context matters: sample/test fixtures may exist only in tests/dev.

Verify no public page shows fake:

* listing count
* project count
* profile count
* reviews
* ratings
* ranking
* availability
* RERA
* verified badge
* “top/best” claims
* sponsored ranking before ads phase

If fake SEO data appears public:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 30. Sold / Rented / Expired SEO Verification

If listing status handling exists, verify:

* sold/rented status clear if public
* expired noindex/redirect/404 as documented
* paused not public
* deleted 404/410/redirect as documented
* sitemap excludes non-indexable statuses
* schema availability updated/removed
* no fake availability
* canonical safe

If paused/deleted listing remains indexed as available:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 31. Redirect Manager Verification

Verify redirect manager:

* admin permission required
* source path unique
* destination safe
* no open redirect
* no `javascript:` redirect
* no external redirect unless explicitly allowlisted
* loop detection
* chain minimization
* active/inactive status
* audit actions
* alias/slug redirects work
* no fake redirect success

Redirect statuses:

```txt id="redirect-statuses"
active
inactive
expired
deleted
pending_review
```

If open redirect exists:

* create critical bug
* mark `FAIL`

If redirect loop exists:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 32. 404 / 410 Verification

Verify public URL handling:

* invalid location slug safe 404
* invalid CMS/blog/legal slug safe 404
* deleted permanent content 410 if chosen
* moved content redirects if configured
* private content does not leak through 404
* raw errors not shown
* canonical/noindex safe
* custom 404 mobile-safe

If invalid public URL throws raw error:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 33. CMS Page Verification

Verify CMS page statuses:

```txt id="cms-statuses"
draft
review
published
archived
deleted
```

Check:

* published pages public
* draft/review/archived/deleted not public
* draft preview admin-only/noindex
* body sanitized
* slug unique
* metadata safe
* version/revision foundation if implemented
* no hidden contact
* no unsafe script/iframe
* no fake published content
* public pages mobile-safe

If draft CMS page is publicly accessible/indexable:

* create critical bug
* mark `FAIL`

---

## 34. CMS HTML Sanitizer Verification

Verify CMS/blog/legal body rendering:

* no arbitrary script
* no inline event handlers
* no unsafe iframe
* no external script embed
* no `javascript:` URLs
* no `data:` scripts
* links sanitized
* rich editor content sanitized server-side
* media references resolved through media system
* draft preview auth-protected/noindex

If unsafe CMS HTML executes publicly:

* create critical bug
* mark `FAIL`

---

## 35. Blog Verification

Verify blog statuses:

```txt id="blog-statuses"
draft
review
scheduled
published
archived
deleted
```

Check:

* blog listing public-safe
* article detail public only when published
* draft/scheduled/review admin-only/noindex
* categories/tags safe
* author real/safe
* featured image public-safe
* metadata/canonical safe
* Article schema only for published real content
* no fake author expertise
* no fake legal/financial advice
* no hidden contact
* no AI content generation claim unless real and approved

If scheduled/draft post appears in sitemap:

* create bug
* mark `FAIL`

---

## 36. Legal Page Verification

Verify legal pages foundation:

* Terms of Use
* Privacy Policy
* Cookie Policy
* Refund Policy
* Cancellation Policy
* Listing Policy
* Ads Policy
* Verification Policy
* Payment Disclaimer
* Platform Disclaimer
* Grievance Redressal
* Takedown/Copyright
* Safety Guidelines

Check:

* page exists or clear setup-required/hide state
* final/legal-reviewed status accurate
* versioning foundation exists or documented
* draft/review not public final
* no internal notes public
* no fake lawyer-approved status
* no private data
* no provider secrets
* public footer links work or hidden if not ready
* content avoids overpromising

If placeholder legal page is marked final/legal approved:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 37. Platform Disclaimer Verification

Verify disclaimer copy/foundation states:

* platform marketplace
* not legal advisor
* not property owner guarantee
* not RERA/legal verification guarantee unless explicitly verified
* users independently verify ownership/RERA/payment details
* verified badge not legal guarantee
* payments outside trusted verified processes risky
* site visit safety guidance
* no overpromise
* no fake verification guarantee

If site claims platform guarantees property legality without actual process/legal approval:

* create bug
* mark `FAIL`

---

## 38. Consent Record Verification

Verify consent records/foundation:

* terms accepted
* privacy accepted
* cookie preference
* contact sharing consent
* marketing opt-in optional
* payment/trial terms
* ads terms later
* verification terms later

Check:

* consent explicit
* policy version captured if implemented
* timestamp captured
* IP/user agent hashed if stored
* marketing opt-in not prechecked
* user can manage optional preferences if implemented
* consent records private/RLS protected
* no fake consent

If consent records are publicly readable:

* create critical bug
* mark `FAIL`

---

## 39. Cookie / Privacy Preference Verification

Verify cookie/privacy preference foundation:

* necessary cookies always on
* analytics optional/setup-required
* marketing optional/setup-required
* personalization optional/setup-required
* preferences saved if implemented
* analytics provider status honest
* no fake preferences
* preference UI accessible
* policy links available

If analytics cookies active while UI says disabled:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 40. Grievance / Takedown Verification

Verify grievance/takedown foundation:

* grievance page exists or setup-required
* takedown/copyright page exists or setup-required
* complaint categories safe
* official officer details not invented
* submission requires safe validation
* no fake submission success if ticket system missing
* submissions private
* admin/staff permission-scoped
* response timeline disclaimer safe
* no private data public

If grievance form claims submitted but stores nowhere and no setup state:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 41. Privacy Request Verification

If privacy/data request foundation exists, verify:

* export request
* delete request
* correction request
* consent withdrawal request
* authenticated where needed
* private/RLS protected
* admin permission-scoped
* no fake completed request
* retention/legal hold placeholder honest
* no automatic deletion without rules

If not implemented, setup-required is acceptable.

---

## 42. Support / Help Page Verification

Verify help/support pages:

* FAQ loads
* help center loads or setup-required
* safety page loads
* report fraud page loads or setup-required
* support form setup-required if ticket system missing
* no fake ticket success
* support contact official/configured only
* no hidden contact/private user contact
* footer links safe
* mobile readable

If support page uses private broker/owner contact as support contact:

* create critical bug
* mark `FAIL`

---

## 43. Public Footer / Link Verification

Verify public footer links:

* About
* Contact
* FAQ/Help
* Safety
* Privacy
* Terms
* Cookie Policy
* Refund Policy
* Cancellation Policy
* Listing Policy
* Ads Policy
* Verification Policy
* Payment Disclaimer
* Platform Disclaimer
* Grievance

Check:

* no dead links
* missing pages hidden or setup-required
* dashboard/admin footer hidden
* no admin links
* footer responsive
* no horizontal scroll
* legal pages public-safe/no private data

If public footer has dead legal links:

* create bug
* mark `PARTIAL`

---

## 44. Admin SEO / CMS / Legal / Location Verification

Verify admin modules:

* `/admin/locations`
* `/admin/seo`
* `/admin/cms`
* `/admin/blog`
* `/admin/legal`
* `/admin/redirects`
* sitemap/admin status if implemented

Check:

* permission-scoped
* public users denied
* staff without permission denied
* draft preview noindex
* publish requires permission
* legal publish restricted
* redirects audited
* changes audited
* unsafe HTML sanitized
* no provider secrets
* no fake publish/approval

If staff without permission can publish legal page:

* create critical bug
* mark `FAIL`

---

## 45. Admin Permission Verification

Suggested permissions:

```txt id="admin-permissions"
locations.read
locations.manage
locations.approve
seo.read
seo.manage
redirects.manage
sitemap.manage
cms.read
cms.manage
cms.publish
blog.read
blog.manage
blog.publish
legal.read
legal.manage
legal.publish
consent.manage
support_content.manage
exports.content
view_sensitive_legal
```

Check:

* server-side permission checks
* UI hiding not enough
* direct URL denied
* actions denied without permission
* legal publishing restricted
* redirects high-risk/audited
* bulk import/export permission-scoped

If direct API/action bypasses permission:

* create critical bug
* mark `FAIL`

---

## 46. Admin Direct URL Verification

Test or inspect:

```txt id="admin-direct-url-checks"
/admin/locations
/admin/seo
/admin/cms
/admin/blog
/admin/legal
/admin/redirects
/admin/sitemap
```

Expected:

* guest denied
* owner/broker/builder denied
* staff without permission denied
* private data not rendered before redirect
* safe forbidden message
* admin pages noindex/no-store

If public user can access admin CMS/legal:

* create critical bug
* mark `FAIL`

---

## 47. Public Direct URL Verification

Test or inspect:

* active location page
* alias location page
* inactive/deleted location page
* invalid location slug
* published CMS page
* draft CMS page
* published blog post
* scheduled blog post
* legal page
* redirect source URL
* invalid redirect URL
* old slug redirect

Expected:

* valid active public pages load
* alias redirects/canonicalizes
* draft/private pages denied/noindex
* invalid slugs safe 404
* redirect loops prevented
* no raw errors
* no hidden contact

If draft page is public via direct URL:

* create critical bug
* mark `FAIL`

---

## 48. RLS Enabled Verification

Verify RLS enabled for private/admin-user tables:

```txt id="rls-tables"
missing_location_requests
location_audit_logs
seo_metadata_overrides
redirects
sitemap_entries
cms_pages
cms_revisions
blog_posts
legal_pages
legal_versions
consent_records
cookie_preferences
grievance_requests
privacy_requests
content_audit_logs
```

Published/public views may expose safe public fields only.

If private CMS/legal/location request table lacks RLS:

* create critical bug
* mark `FAIL`

If database unavailable:

* mark RLS runtime verification `SETUP_REQUIRED`
* do not mark RLS PASS

---

## 49. RLS Policy Verification

Verify:

* public can read active locations
* public cannot read missing location requests
* requester can read own missing location requests if implemented
* wrong user cannot read another user's request
* public can read published CMS/blog/legal pages
* public cannot read draft/review/deleted CMS/blog/legal pages
* public cannot read consent records
* user can read/manage own cookie preferences if implemented
* user can submit/read own grievance/privacy request where intended
* wrong user denied grievance/privacy request
* admin/staff access permission-scoped
* public-safe SEO views expose only safe fields

If public can read private consent/grievance records:

* create critical bug
* mark `FAIL`

---

## 50. RLS Test Suggestions

If Supabase test environment is available, run equivalent tests:

```txt id="rls-test-scenarios"
1. Anonymous select active public locations → allowed if intended.
2. Anonymous select missing_location_requests → denied.
3. User A select own missing_location_requests → allowed if implemented.
4. User A select User B missing_location_requests → denied.
5. Anonymous select published cms_pages safe view → allowed.
6. Anonymous select draft cms_pages → denied.
7. Anonymous select draft blog_posts → denied.
8. Anonymous select draft legal_pages → denied.
9. Anonymous select consent_records → denied.
10. User A select own consent_records → allowed if policy supports.
11. User B select User A consent_records → denied.
12. Anonymous select grievance_requests → denied.
13. Staff without legal.publish publish legal page → denied.
14. Staff with cms.publish publish CMS page → allowed.
15. Public select seo_metadata_overrides internal notes → denied.
```

Record exact results.

Do not mark RLS PASS without tests.

---

## 51. Private Noindex / Cache Verification

Verify private pages noindex/no-store:

* admin location/SEO/CMS/blog/legal pages
* draft preview pages
* missing location request status if private
* consent preference pages
* grievance/privacy request pages
* support ticket/request pages if private
* private requirement/search pages
* preview routes
* internal setup/provider pages

Public CMS/legal/SEO pages can be cached only if public-safe.

If private draft/admin page is indexed/cached publicly:

* create critical bug
* mark `FAIL`

---

## 52. CMS / Blog / Legal Cache Verification

Verify:

* published public CMS/legal pages cache safely
* draft/review pages no-store/private
* admin pages no-store/private
* content updates revalidate or cache-bust correctly
* published/unpublished changes reflected
* deleted/archived pages removed from sitemap
* no stale draft content public

If unpublished page remains cached publicly:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 53. Search SQL Injection / Unsafe Query Verification

Inspect search query building.

Check:

* no raw unescaped SQL from params
* sort allowlisted
* numeric filters parsed/validated
* location slug validated
* array filters allowlisted
* full-text search safe
* no arbitrary column/order injection
* no raw admin filters public
* safe errors on invalid input

If raw SQL injection risk exists:

* create critical bug
* mark `FAIL`

---

## 54. SEO Spam / Thin Page Verification

Check for:

* mass generated pages with no real content
* city/locality/type pages with zero results and indexable
* duplicate pages with same metadata
* keyword stuffing
* hidden text
* fake intro copy
* fake counts
* fake “best/top” language
* arbitrary filter combinations indexable
* page 1000 indexable
* poor canonicalization

If mass thin pages are indexed:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 55. Legal Placeholder Verification

Check legal pages/content fields for:

```txt id="legal-placeholder-patterns"
TODO
placeholder
lorem ipsum
draft
setup required
legal review pending
replace this
TBD
final
approved
lawyer approved
```

Expected:

* placeholder pages are hidden, noindex or clearly marked as setup-required.
* final/legal-approved status only if genuinely reviewed/provided.
* public pages should not display unprofessional placeholders.
* policy version status accurate.

If placeholder legal text is public and marked final:

* create bug
* mark `FAIL`

---

## 56. No Fake Legal / Verification Claims

Verify site does not claim:

* platform guarantees ownership
* platform guarantees RERA/legal status
* verified badge is legal guarantee
* payment outside platform is safe
* listing is legally verified if not verified
* broker/builder is officially certified without proof
* reviews/ratings if not implemented
* admin approval equals legal approval

If such overclaim appears:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 57. Provider Setup Status Verification

Update/verify provider statuses:

* Google Maps / map provider
* Search provider/external search
* Analytics/GSC
* Email provider for support/grievance
* CMS rich text editor/sanitizer
* Translation provider
* Sitemap automation/ping
* Supabase Database/RLS

Check:

* no provider marked active without real test
* setup-required states visible where needed
* no fake map/geocoding/search analytics success
* no provider secrets shown

If map/geocoding provider is missing but fake maps/pins appear:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 58. Responsive Verification

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

* location dropdowns usable
* missing location request form fits
* search filter drawer/bottom sheet works
* filter chips wrap safely
* search result pages no horizontal scroll
* SEO landing page readable
* CMS/legal pages readable
* blog listing/detail responsive
* admin location/CMS tables become cards
* footer legal links wrap safely
* no overlapping buttons/modals
* tap targets large

If not all widths tested, mark responsive check `PARTIAL`.

Do not mark responsive PASS without testing.

---

## 59. Accessibility Verification

Check:

* location combobox labels
* search input labels
* filter controls keyboard accessible
* mobile filter drawer focus behavior
* CMS/legal semantic headings
* footer links keyboard accessible
* admin tables/cards labelled
* buttons have text/aria labels
* status badges not color-only
* errors readable
* focus visible
* large mobile tap targets

If severe accessibility blocker exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 60. Performance Verification

Verify:

* location dropdown queries limited
* location search indexed
* search results paginated
* count queries efficient or omitted
* sitemap generation bounded/split
* public CMS/legal cached safely
* private draft/admin no-store
* no N+1 listing/location/media queries
* no mass SEO page generation at request time
* no unbounded admin location tables
* build passes

If sitemap generation loads all private rows or times out risk:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 61. Build / Lint / Typecheck Verification

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

## 62. Automated Test Suggestions

If test framework exists, add/run tests for:

* location hierarchy lookup
* missing location request validation
* search param normalization
* invalid search param handling
* sort allowlist
* canonical URL generation
* robots rules
* sitemap private URL exclusion
* noindex rules
* schema no fake reviews/contact
* redirect open redirect prevention
* redirect loop prevention
* CMS sanitizer
* draft CMS no public access
* legal placeholder status
* RLS private content tables

Document results.

---

## 63. Manual Smoke Test Matrix

If app can run, test:

```txt id="manual-smoke-matrix"
Location:
- district/taluka/city dropdown loads
- missing location request submits or setup-required
- requester sees own request only
- admin review permission-scoped

Search:
- /search loads
- city filter works
- locality/type/category filters work
- invalid params safe
- sort works
- pagination works
- empty page noindex

SEO:
- canonical correct
- metadata safe
- schema safe
- no fake count/review
- hidden contact absent
- sitemap excludes private URLs
- robots blocks private routes

CMS/Blog/Legal:
- published CMS page loads
- draft CMS page denied/noindex
- published blog loads
- draft/scheduled blog denied/noindex
- legal pages status accurate
- footer links work

Redirects:
- alias redirects/canonicalizes
- open redirect blocked
- redirect loop blocked

Admin:
- public denied admin SEO/CMS/legal/location
- staff permission enforced
```

If safe test environment unavailable:

* inspect code
* mark runtime tests `SETUP_REQUIRED` or `PARTIAL`
* do not fake runtime PASS

---

## 64. Documentation Update Verification

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

## 65. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

* location hierarchy
* Gujarat location master data
* location aliases
* location translations
* cascading dropdowns
* missing location request
* admin location review
* location merge/deprecate
* search param normalization
* location search filters
* SEO landing pages
* canonical rules
* noindex rules
* robots rules
* sitemap generation
* sitemap splitting foundation
* structured data safety
* redirect manager
* CMS pages
* CMS revisions
* CMS sanitizer
* blog foundation
* legal pages
* legal versions
* consent records
* cookie preferences
* grievance/takedown foundation
* privacy request foundation
* admin SEO controls
* admin CMS controls
* admin legal controls
* admin redirect controls
* no fake SEO counts
* no fake review schema
* hidden contact SEO protection
* responsive search/CMS/legal UI

Future features must not be marked done.

---

## 66. Changelog Verification

Check `CHANGELOG.md` includes Prompt 11 entry with:

* date
* summary
* changed files
* new routes/API routes
* migration files if any
* RLS/security changes
* SEO/sitemap/robots changes
* CMS/legal changes
* provider status changes
* tests/checks run
* docs updated
* verification status
* known issues
* rollback notes

If missing, update changelog.

---

## 67. Bugs And Fixes Verification

If issues are found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

* `BUG-LOCATION-FAKE-DATA`
* `BUG-LOCATION-REQUEST-PUBLIC-LEAK`
* `BUG-LOCATION-WRONG-USER-REQUEST`
* `BUG-LOCATION-ADMIN-PERMISSION-BYPASS`
* `BUG-SEO-HIDDEN-CONTACT-METADATA`
* `BUG-SEO-FAKE-COUNT`
* `BUG-SEO-FAKE-REVIEW-SCHEMA`
* `BUG-SEO-THIN-PAGE-INDEXED`
* `BUG-SEO-PRIVATE-SITEMAP`
* `BUG-SEO-ADMIN-SITEMAP`
* `BUG-SEO-CANONICAL-WRONG`
* `BUG-SEO-ROBOTS-MISSING`
* `BUG-REDIRECT-OPEN-REDIRECT`
* `BUG-REDIRECT-LOOP`
* `BUG-CMS-DRAFT-PUBLIC`
* `BUG-CMS-UNSAFE-HTML`
* `BUG-CMS-LEGAL-PLACEHOLDER-FINAL`
* `BUG-CMS-PUBLISH-PERMISSION-BYPASS`
* `BUG-CONSENT-FAKE-CONSENT`
* `BUG-LEGAL-PRIVATE-DATA-LEAK`
* `BUG-SEARCH-INVALID-PARAM-CRASH`
* `BUG-SEARCH-SQL-INJECTION-RISK`
* `BUG-SEARCH-PRIVATE-DATA`
* `BUG-LOCATION-RLS-MISSING`
* `BUG-CMS-RLS-MISSING`
* `BUG-LOCATION-MIGRATION-MISSING`
* `BUG-LOCATION-BUILD-FAIL`
* `BUG-LOCATION-MOBILE-FILTER-BROKEN`

Use existing bug ID convention if available.

---

## 68. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 11 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* routes/features checked
* location tests
* search tests
* SEO/canonical tests
* sitemap/robots tests
* schema tests
* CMS/blog/legal tests
* redirect tests
* consent/privacy tests
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

## 69. Security Checklist Verification

Update/verify `SECURITY_RLS_CHECKLIST.md`.

Include Prompt 11 results for:

* location request RLS
* CMS/blog/legal draft RLS
* consent record RLS
* grievance/privacy request RLS
* admin SEO/CMS/legal permission checks
* CMS sanitizer status
* hidden contact metadata/schema protection
* private pages noindex/no-store
* sitemap private exclusion
* robots private route rules
* redirect open redirect protection
* public search approved-only data
* service role/provider secret checks
* known issues

If hidden contact/private sitemap/draft-public issue exists, result cannot be PASS.

---

## 70. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

Include Prompt 11 results for:

* location dropdown query limits
* location indexes
* search filter indexes
* search query pagination
* sitemap generation strategy
* sitemap split status
* public CMS/legal cache strategy
* private draft/admin no-store
* no expensive fake counts
* canonical/noindex performance
* mobile filter performance
* build status
* future SEO/load test notes

---

## 71. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

Include:

* Prompt 11 route/component changes
* migration path if any
* location/search route changes
* CMS/legal route changes
* sitemap/robots changes
* redirect manager changes
* canonical URL changes
* RLS policies
* cache/revalidation risk
* SEO rollback risk
* legal content rollback risk
* post-deploy smoke checks
* verification status

If SEO routing/sitemap/redirect changes exist without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 72. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md`.

Relevant statuses:

* Google Maps / map provider
* Search provider/external search
* Analytics/GSC
* Email provider for support/grievance
* CMS rich text editor/sanitizer
* Translation provider
* Sitemap automation/ping
* Supabase Database/RLS

Rules:

* no provider active without real test
* missing provider setup-required/not-started
* no fake maps/geocoding/analytics/search provider success
* no provider secrets shown

---

## 73. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 11 implementation summary
* Prompt 11 verification result
* changed files
* routes/API routes checked
* migrations/tables/RLS
* location hierarchy status
* search status
* SEO/canonical/sitemap/robots status
* CMS/blog/legal status
* consent/privacy status
* hidden contact SEO result
* fake SEO data result
* responsive result
* setup-required providers
* bugs/blockers
* commands run
* next prompt:

  * `prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`
* instruction not to proceed if Prompt 11 failed/blocked

---

## 74. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* location hierarchy works or honest setup-required with no fake coverage
* active/canonical public locations only are public
* missing location requests private/RLS-protected
* admin location actions permission-scoped
* search params normalized and safe
* invalid params do not crash
* public search uses approved/published public-safe data only
* no fake counts
* SEO pages noindex empty/thin/private pages
* canonical rules safe
* robots private routes safe
* sitemap excludes private/admin/dashboard/draft/pending/deleted URLs
* schema has no fake reviews/ratings/contact
* hidden contact absent from metadata/schema/sitemap/public SEO payloads
* CMS/blog/legal draft pages not public/indexed
* CMS HTML sanitized
* legal placeholder/final status honest
* redirects protected from open redirect/loops
* consent/grievance/privacy records private
* admin SEO/CMS/legal permissions enforced
* RLS enabled/tested or honestly setup-required with no unsafe claim
* responsive checks completed
* docs updated
* no blocking bugs

### PARTIAL

Use `PARTIAL` if:

* location hierarchy foundation exists but full Gujarat master data incomplete
* missing location review partial
* SEO pages foundation exists but only selected pages enabled
* sitemap splitting partial
* CMS/legal pages exist but final legal text setup-required
* blog foundation partial
* cookie/privacy preferences partial
* grievance/takedown setup-required
* map provider setup-required
* GSC/analytics setup-required
* RLS runtime tests unavailable but policies/migration reviewed
* responsive/browser checks incomplete
* no fake/unsafe indexed content and no private/hidden contact leak exists

Prompt 12 can start only if user/Super Admin accepts partial and no critical SEO/privacy/legal/security issue exists.

### FAIL

Use `FAIL` if:

* build fails
* private/admin/dashboard pages appear in sitemap
* hidden contact leaks in metadata/schema/sitemap
* fake listing counts/reviews/schema appear
* draft CMS/blog/legal pages public/indexed
* legal placeholder marked final without review
* public search shows private/pending/deleted data
* open redirect exists
* unsafe CMS HTML executes
* empty/thin SEO pages indexed
* invalid search param creates SQL injection risk
* RLS missing on private content/request tables
* DB changes missing migration

Do not start Prompt 12.

### BLOCKED

Use `BLOCKED` if:

* Prompt 05 public search/detail SEO foundation failed
* Prompt 10 media integration failed and CMS/blog media depends on it
* Supabase/RLS unavailable blocks secure content/location verification
* location data source unresolved
* final legal content requirement blocks public legal publish
* cannot inspect required files
* package/build baseline broken
* architecture conflict needs owner decision

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* map/geocoding provider missing
* analytics/GSC missing
* email provider missing for support/grievance
* CMS rich text editor/sanitizer missing
* translation provider missing
* sitemap ping/automation missing
* full Gujarat master location data missing
* final legal text/review missing
* Supabase env missing
* test users/admin permissions unavailable

Setup-required is acceptable only when no fake/unsafe public content appears.

---

## 75. Prompt 12 Readiness Checklist

Prompt 12 can start only if:

* Prompt 11 implementation completed
* Prompt 11 verification completed
* no critical SEO/privacy/security/legal bug open
* no private URLs in sitemap
* no admin/dashboard URLs in sitemap
* no hidden contact in metadata/schema/sitemap
* no fake counts/reviews/schema
* no public draft CMS/blog/legal pages
* no legal placeholder marked final
* no open redirect
* no unsafe CMS HTML
* public search uses public-safe data only
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`

If Prompt 12 file is missing, stop and ask/generate it.

---

## 76. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 11 Verification — Location, Search, SEO, CMS And Legal

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Routes/Features Checked:
- search:
- location pages:
- sitemap:
- robots:
- CMS:
- blog:
- legal:
- admin locations:
- admin SEO:
- admin CMS/blog/legal:
- redirects:

Location Checks:
- hierarchy:
- Gujarat data:
- aliases/translations:
- cascading dropdowns:
- missing location requests:
- admin review:

Search Checks:
- param normalization:
- filters:
- sort:
- pagination:
- public-safe data:
- invalid params:
- fake counts:

SEO Checks:
- metadata:
- canonical:
- noindex:
- schema:
- sitemap:
- robots:
- empty/thin pages:
- hidden contact:

CMS/Blog Checks:
- published pages:
- draft/review pages:
- sanitizer:
- blog status:
- media:
- sitemap/noindex:

Legal/Privacy Checks:
- legal pages:
- placeholder/final status:
- consent records:
- cookie preferences:
- grievance/takedown:
- privacy requests:

Redirect Checks:
- alias redirects:
- open redirect:
- loop prevention:
- deleted/moved pages:

Admin/Permission Checks:
- location admin:
- SEO admin:
- CMS admin:
- legal admin:
- redirects admin:
- staff permission checks:

Database/RLS Checks:
- migrations:
- tables:
- indexes:
- RLS policies:
- RLS test result:

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
- Location/search/SEO/CMS/legal foundation is safe and ready for Prompt 12.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 12:
- Yes/No

Next Step:
- prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md or fix blockers first.
```

---

## 77. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 11 Location/Search/SEO/CMS/Legal verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Routes/features checked:
- search:
- locations:
- sitemap:
- robots:
- CMS:
- blog:
- legal:
- admin location/SEO/CMS/legal:
- redirects:

Location:
- hierarchy:
- Gujarat data:
- aliases/translations:
- cascading dropdowns:
- missing location requests:
- admin review:
- RLS:

Search:
- param normalization:
- filters:
- sort:
- pagination:
- approved-only data:
- invalid params:
- no fake counts:

SEO:
- metadata:
- canonical:
- noindex:
- schema:
- sitemap:
- robots:
- thin/empty pages:
- hidden contact:

CMS/blog:
- published pages:
- draft/review noindex:
- sanitizer:
- blog status:
- media integration:

Legal/privacy:
- legal pages:
- placeholder/final status:
- consent:
- cookie preferences:
- grievance/takedown:
- privacy requests:

Redirects:
- open redirect:
- loop prevention:
- alias/moved pages:
- deleted/expired handling:

Admin/permissions:
- location:
- SEO:
- CMS:
- blog:
- legal:
- redirects:
- audit:

Security/privacy:
- private sitemap exclusion:
- admin/dashboard sitemap exclusion:
- hidden contact metadata/schema:
- fake count/review/schema:
- unsafe HTML:
- private noindex/cache:
- service role/provider secrets:

Database/RLS:
- migrations:
- tables:
- indexes:
- public views:
- RLS policies:
- RLS test result:

Responsive:
- widths tested:
- search filters:
- location dropdowns:
- CMS/legal pages:
- admin tables:
- horizontal scroll:

Provider/setup-required:
- maps/geocoding:
- analytics/GSC:
- email/support:
- rich editor/sanitizer:
- translation:
- sitemap automation:
- final legal review:
- Supabase/test data:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 12:
- Yes/No
- reason

Next step:
- prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
```

Do not write vague “verified”.

---

## 78. If Verification Fails

If verification fails:

1. do not start Prompt 12
2. create/update bug entries
3. update `MANUAL_VERIFICATION.md`
4. update `SECURITY_RLS_CHECKLIST.md`
5. update `PERFORMANCE_CHECKLIST.md`
6. update `DEPLOYMENT_ROLLBACK.md`
7. update `API_PROVIDER_STATUS.md` if provider/SEO/legal issue found
8. update `brain.md`
9. state exact blocker
10. fix if safe and in scope
11. rerun verification
12. only then proceed

Critical SEO/privacy/legal/security failures block progress.

---

## 79. If Verification Is Partial

If verification is partial:

* document exact partial items
* list setup-required providers
* list incomplete location data
* list final legal review gaps
* list sitemap/canonical/SEO gaps
* list RLS runtime gaps
* list responsive/browser gaps
* confirm no hidden contact leak
* confirm no private URLs in sitemap
* confirm no fake counts/reviews/schema
* confirm no public draft CMS/blog/legal pages
* confirm no legal placeholder marked final
* confirm no unsafe CMS HTML/open redirect
* update docs
* ask/require owner acceptance before Prompt 12 if risk is significant

Acceptable partial examples:

* full Gujarat master data incomplete but no fake coverage claim
* map provider setup-required
* GSC/analytics setup-required
* final legal text/review setup-required
* blog foundation partial
* sitemap splitting foundation partial
* CMS editor partial but sanitizer safe
* RLS runtime tests unavailable but policies reviewed

Not acceptable partial without fix:

* hidden contact in metadata/schema/sitemap
* private/admin/dashboard URLs in sitemap
* draft legal/CMS/blog public
* fake reviews/schema/counts
* open redirect
* unsafe CMS HTML
* public search private data leak
* build fail

---

## 80. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `DEPLOYMENT_ROLLBACK.md`
* update `API_PROVIDER_STATUS.md` if relevant
* update `brain.md`
* final response should say Prompt 12 can start

Do not start Prompt 12 automatically unless user asked to continue.

---

## 81. What Not To Do In This Verification

Do not:

* create fake location data to pass tests
* index empty pages to increase SEO footprint
* add fake listing counts
* add fake reviews/ratings schema
* hide private sitemap URLs instead of fixing source
* expose hidden contact in metadata/schema/sitemap
* publish legal placeholders as final
* expose draft CMS/blog/legal pages
* allow unsafe CMS HTML
* ignore open redirect
* ignore redirect loops
* bypass RLS
* start Prompt 12 after FAIL/BLOCKED

---

## 82. Quality Bar

This verification is successful when future phases can trust that:

* location hierarchy is safe and honest
* missing location requests are private and reviewable
* search filters are safe and public-data-only
* SEO pages are useful and not thin/spammy
* empty/private/draft pages are noindex/excluded
* sitemap includes only public indexable URLs
* metadata/schema contain no fake reviews/counts/contact
* CMS/blog/legal pages are status-aware and sanitized
* legal placeholder status is honest
* consent/grievance/privacy foundations are protected
* redirects are safe
* admin controls are permission-scoped
* docs reflect reality
* Prompt 12 can build ads/promotions/notifications/providers on a clean public SEO/legal foundation

---

## 83. Final Rule For Prompt 11 Verification

Verify locations honestly.

Verify search honestly.

Verify SEO honestly.

Verify CMS honestly.

Verify legal pages honestly.

Verify sitemap honestly.

Verify robots honestly.

Verify canonical rules honestly.

Verify schema honestly.

Verify redirects honestly.

Verify RLS honestly.

Do not fake location coverage.

Do not fake counts.

Do not fake reviews.

Do not index empty/thin pages.

Do not put private/admin/dashboard URLs in sitemap.

Do not leak hidden contact in metadata/schema/sitemap.

Do not expose draft CMS/blog/legal pages.

Do not mark legal placeholders final.

Do not allow unsafe CMS HTML.

Do not allow open redirects.

Do not mark PASS without SEO/privacy/RLS checks.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
