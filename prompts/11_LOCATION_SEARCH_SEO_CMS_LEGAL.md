# prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md

# My Gujarat Property — Prompt 11: Location, Search, SEO, CMS And Legal

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 3 (search), 14 (CMS/SEO/location admin), 16 (public legal/blog/help)**, `design-prompts/DESIGN_ADDONS_MASTER.md`, deltas `report-batch-03/14/16.md`, and `docs/11` "Design Add-Ons". Locked: transliteration/alias search, shared legal-doc layout + TOC, legal versioning+sign-off, redirect loop guard, sitemap exclusion transparency, SEO counters + snippet preview.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md
```

This phase implements and hardens the location, search, SEO, CMS and legal foundation for **My Gujarat Property**:

* Gujarat location hierarchy
* country/state/district/taluka/city/village/area/locality/society/building/landmark/address/PIN/map foundation
* cascading location dropdowns
* location aliases and transliteration
* Gujarati/Hindi/English labels
* missing location request workflow
* admin location approval foundation
* search filter refinement
* SEO-safe city/locality/type/category pages
* canonical URLs
* robots/noindex rules
* sitemap generation
* sitemap splitting foundation
* redirect manager foundation
* SEO metadata controls
* schema markup safety
* CMS pages
* blog foundation
* legal pages
* policy pages
* consent notices
* cookie/privacy foundation
* support/help pages
* grievance/takedown/legal foundation
* admin CMS/SEO/legal/location controls
* RLS/security
* no fake location data
* no fake SEO counts
* no thin indexed pages
* no fake reviews/schema
* no hidden contact leak
* no fake PASS

Do not create mass thin SEO pages.

Do not index empty/thin pages.

Do not fake listing counts.

Do not fake reviews/ratings/schema.

Do not expose hidden contact through SEO metadata/schema/sitemap.

Do not publish legal pages without clear placeholder/setup status when final legal text is missing.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md
Prompt Number: 11
Phase: Location, Search, SEO, CMS And Legal
Type: Implementation Prompt
Matching Verification Prompt: prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md
Previous Verification Prompt: prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md
```

---

## 2. Phase Purpose

The purpose of this phase is to make the location, search, SEO, CMS and legal foundation safe, scalable and production-ready.

This phase should implement:

* Gujarat-first location hierarchy
* location master data foundation
* location aliases
* transliteration support foundation
* missing location request workflow
* admin location management foundation
* search parameter normalization
* search filters tied to location hierarchy
* public location landing pages
* SEO-safe listing pages
* locality/category/type SEO pages
* canonical URL rules
* noindex rules
* robots rules
* sitemap generation
* sitemap splitting foundation
* redirect manager foundation
* structured data/schema safety
* CMS content pages
* legal/policy pages
* support/help pages
* blog foundation
* consent text foundation
* cookie/privacy preference foundation
* grievance/takedown foundation
* admin CMS/SEO controls
* RLS policies
* docs updates
* checks/tests
* handoff to manual verification prompt

This phase must protect the product from SEO spam, fake data, thin pages, private data leaks and legal-content ambiguity.

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

Also inspect existing location, search, SEO, CMS, blog, legal and sitemap code before editing.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
src/app/search/
app/search/
src/app/locations/
app/locations/
src/app/gujarat/
app/gujarat/
src/app/properties/
app/properties/
src/app/projects/
app/projects/
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
src/app/sitemap.ts
app/sitemap.ts
src/app/robots.ts
app/robots.ts
src/components/search/
components/search/
src/components/location/
components/location/
src/components/seo/
components/seo/
src/components/cms/
components/cms/
src/components/legal/
components/legal/
src/components/blog/
components/blog/
src/lib/search/
lib/search/
src/lib/location/
lib/location/
src/lib/seo/
lib/seo/
src/lib/sitemap/
lib/sitemap/
src/lib/cms/
lib/cms/
src/lib/legal/
lib/legal/
src/lib/actions/location*
lib/actions/location*
src/lib/actions/cms*
lib/actions/cms*
src/lib/actions/seo*
lib/actions/seo*
src/lib/validators/location*
lib/validators/location*
src/lib/validators/seo*
lib/validators/seo*
src/lib/validators/cms*
lib/validators/cms*
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
src/types/location.*
types/location.*
src/types/seo.*
types/seo.*
src/types/cms.*
types/cms.*
supabase/migrations/
```

Search for existing:

* location tables
* city/location dropdown data
* Gujarat district/taluka/city data
* missing location requests
* search params
* search filters
* search canonical rules
* SEO pages
* sitemap
* robots
* metadata helpers
* schema helpers
* CMS pages
* legal pages
* blog pages
* redirect manager
* fake location data
* fake listing counts
* fake reviews/ratings
* hidden contact in metadata/schema
* private pages in sitemap
* admin SEO controls
* RLS policies

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement:

### 5.1 Location Foundation

* location master tables
* Gujarat location hierarchy
* country/state/district/taluka/city/village/area/locality/society/building foundation
* PIN code foundation
* landmarks
* aliases
* transliteration
* active/inactive status
* missing location request flow
* admin location review foundation
* cascading dropdowns
* nearby fallback foundation

### 5.2 Search Refinement

* normalized search query params
* location filters
* purpose/category/type filters
* price/rent/budget filters
* area filters
* bedroom filters
* posted-by filters
* sort
* pagination
* filter chips
* mobile filter drawer
* empty/noindex handling
* no fake counts

### 5.3 SEO Foundation

* canonical rules
* title/meta/H1/intro generation
* city/locality/type/category SEO pages
* listing/project detail metadata
* public profile metadata
* noindex thin/empty pages
* sitemap generation
* sitemap splitting foundation
* robots rules
* schema markup safety
* redirects
* sold/rented/expired handling foundation
* GSC/analytics setup-required placeholders

### 5.4 CMS Foundation

* CMS page table/foundation
* about/contact/help/FAQ/safety pages
* blog foundation
* category/tag/slug
* draft/published states
* admin CMS editor foundation
* preview/noindex
* no fake legal approval

### 5.5 Legal Foundation

* privacy policy page
* terms page
* cookie policy page
* refund policy page
* cancellation policy page
* listing policy
* ads policy
* verification policy
* payment disclaimer
* platform disclaimer
* grievance page
* takedown/copyright foundation
* law enforcement/legal hold placeholder
* consent notices foundation
* DPDP/privacy foundation
* cookie preference placeholder

### 5.6 Admin Integration

* location admin
* SEO admin
* CMS admin
* blog admin
* legal admin
* redirect manager admin
* permission checks
* audit logs
* no provider secrets

### 5.7 Docs

Update all memory docs.

---

## 6. Out Of Scope For This Phase

Do not fully implement:

* final lawyer-approved legal text
* final tax/legal compliance signoff
* automated GST/legal filings
* full SEO content generation at scale
* AI SEO writer
* AI recommendations
* external Google Search Console API
* external sitemap ping automation
* full multilingual CMS translation workflow
* full legal hold/takedown workflow
* full support ticket system if not already implemented
* final analytics/marketing automation
* map API/geocoding provider unless already configured
* WhatsApp/SMS/email provider delivery
* paid ads lifecycle

This phase can create safe foundations and setup-required states.

---

## 7. Hard SEO And Legal Rules

Claude must enforce:

```txt id="hard-seo-legal-rules"
No mass thin indexed pages.
No empty pages indexed.
No fake listing counts.
No fake reviews or ratings.
No fake RERA/legal guarantee.
No hidden contact in metadata/schema/sitemap.
No private dashboard/admin/lead/media/billing pages in sitemap.
No legal page marked final if text is placeholder.
No raw user iframe or unsafe CMS HTML.
No public indexing of draft CMS/blog/legal pages.
No fake redirect success.
```

Forbidden:

* indexing empty search pages
* fake “1000+ properties”
* fake reviews/ratings schema
* hidden phone/email in structured data
* draft blog page indexed
* admin routes in sitemap
* private media URLs in sitemap
* AI-generated legal text marked final
* public legal page with unresolved placeholder but no status
* unsafe CMS HTML/script injection

---

## 8. Location Hierarchy Requirements

Location hierarchy should support:

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

For My Gujarat Property:

* default country: India
* default state: Gujarat
* Gujarat districts/talukas/cities should be supported through data/config.
* city/village distinction should be possible.
* area/locality/society/building can be requested if missing.
* exact address should remain private when not appropriate.
* public search can show safe location labels only.

Rules:

* cascading dropdowns should be data-driven.
* missing location can be requested by user.
* admin approves missing location before it becomes canonical.
* no fake location data.
* no hidden contact in location labels.
* map pin optional/setup-required if map provider missing.

---

## 9. Location Status Values

Location statuses:

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

Missing location request statuses:

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

Rules:

* only active canonical locations are used in public dropdowns.
* pending requests visible to requester/admin only.
* rejected/deleted locations not public.
* merged locations redirect or map to canonical.
* location changes audited.
* no public fake approved locations.

---

## 10. Location Tables

Use existing tables if present.

Possible tables:

```txt id="location-tables"
countries
states
districts
talukas
cities
villages
areas
localities
societies
buildings
landmarks
pin_codes
location_aliases
location_translations
missing_location_requests
location_merge_history
location_audit_logs
```

Alternative normalized model:

```txt id="normalized-location-model"
locations
location_edges
location_aliases
location_translations
missing_location_requests
location_audit_logs
```

Either approach is acceptable if secure, queryable and documented.

Do not duplicate if existing model works.

---

## 11. Location Fields

Suggested common location fields:

* id
* parent_id
* type
* name
* slug
* display_name
* gujarati_name
* hindi_name
* english_name
* aliases
* transliteration
* pin_code
* district_id
* taluka_id
* state_id
* country_id
* latitude
* longitude
* status
* source
* approved_by_staff_id
* created_by_profile_id
* created_at
* updated_at
* deleted_at

Rules:

* slug unique within relevant scope
* names sanitized
* coordinates optional
* source tracked
* user-submitted locations not canonical until approved

---

## 12. Gujarati / Hindi / English Support

Location and SEO should support:

* English labels
* Gujarati labels
* Hindi labels if available
* transliteration aliases
* common spelling variants
* Rajkot / રાજકોટ style lookup
* Ahmedabad / Amdavad / અમદાવાદ aliases
* Vadodara / Baroda / વડોદરા aliases
* Surat / સુરત aliases

Rules:

* do not machine-translate legal text as final unless reviewed.
* do not create fake translations.
* fallback to English when translation missing.
* store language status if content is translated/reviewed.
* use Noto Sans Gujarati or existing font stack if configured.

---

## 13. Cascading Dropdown Requirements

Cascading dropdowns should support:

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

Rules:

* no unbounded location loading.
* searchable dropdowns for large lists.
* mobile-friendly combobox/bottom sheet.
* missing option opens request flow.
* selected values persist in draft forms.
* stale/deleted location handling safe.
* no hidden contact in dropdown values.

---

## 14. Missing Location Request Requirements

Users should be able to request missing:

* city/village
* area
* locality
* society
* building
* landmark
* PIN code correction

Request fields:

* location type
* parent location
* requested name
* alternate spellings
* address hint
* PIN code
* notes
* requester profile
* status

Rules:

* auth required if request tied to posting.
* sanitize input.
* rate limit/spam foundation.
* admin approval required.
* request status visible to requester.
* approved location becomes active canonical location.
* rejected request reason visible safely.
* no fake approval.

---

## 15. Admin Location Management

Admin/staff with permission can:

* list location requests
* approve request
* reject request with reason
* merge duplicate location
* deactivate location
* edit aliases/translations
* manage PIN codes
* view audit log
* bulk import foundation if safe

Rules:

* permission-scoped.
* actions audited.
* duplicate detection foundation.
* no normal hard delete.
* merged/deprecated locations redirect/canonicalize.
* public pages update after location changes.
* no fake import success.

---

## 16. Search Parameter Normalization

Search query params should be normalized.

Supported examples:

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

Rules:

* allowlist params.
* invalid params ignored or corrected safely.
* canonical URL removes junk params.
* page number validated.
* sorting allowlisted.
* SQL injection protected.
* public search only shows approved/published data.
* no fake result counts.

---

## 17. Search Filter Requirements

Search filters should include:

* purpose: buy/sell/rent
* entity: property/project/requirement as public-safe
* category
* property/project type
* city/district/taluka/locality
* budget/price/rent
* area
* bedrooms where relevant
* posted_by role where safe
* sort:

  * newest
  * price_low
  * price_high
  * relevant
  * area_low
  * area_high

Rules:

* filters map to real DB fields.
* invalid filters do not crash.
* chips update URL.
* mobile filters in drawer/bottom sheet.
* pagination SEO-safe.
* no fake counts or fake map pins.

---

## 18. Search Page SEO Rules

For `/search` and filter pages:

* canonical URL generated.
* noindex pages with no results or thin results.
* noindex pages with too many arbitrary filters.
* noindex internal/private filters.
* noindex page beyond safe pagination threshold if needed.
* index only useful stable pages.
* page 2+ canonical/pagination rules documented.
* no fake intro text based on no data.
* no hidden contact in metadata.
* no private media URLs in metadata.

Rules:

* real result count only or omit.
* no “best/top” claims unless curated and real.
* no fake “verified” claims.
* no fake reviews.

---

## 19. SEO Landing Page Types

Possible SEO landing pages:

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

Rules:

* index only pages with real value/content.
* empty/thin pages noindex.
* pages with private/pending data noindex.
* pages with duplicate intent canonicalize.
* no mass auto-generated spam pages.
* sitemap includes only indexable pages.

---

## 20. SEO Metadata Requirements

SEO metadata should include:

* title
* description
* canonical
* robots
* open graph title
* open graph description
* open graph image if public-safe
* H1
* intro copy if content exists
* breadcrumbs
* structured data where safe

Rules:

* no hidden phone/email.
* no fake count.
* no fake review/rating.
* no private address unless intended public.
* no provider secrets.
* no draft content.
* no pending listing data.
* no fake RERA/legal guarantee.

---

## 21. Canonical Rules

Canonical rules should cover:

* `/search` normalized query order
* city/locality slugs
* category/type slugs
* pagination
* trailing slash policy
* uppercase/lowercase
* alias redirects
* merged/deprecated locations
* sold/rented/expired listings
* duplicate property/project URLs
* broker/builder profile slug changes
* blog slug changes
* CMS/legal slug changes

Rules:

* canonical URL must be absolute if framework expects it.
* unknown/invalid pages noindex or 404.
* alias pages redirect to canonical.
* no canonical to private URL.
* no canonical with tracking params.

---

## 22. Robots Rules

Robots should block/noindex:

* admin routes
* dashboard routes
* auth routes if private
* lead/message/proposal/site visit pages
* billing pages
* private media pages
* upload routes
* API routes
* preview routes
* draft CMS/blog/legal pages
* thin/empty search pages
* internal provider/setup pages

Robots may allow:

* home
* public search landing pages that pass quality
* public property/project details
* public broker/builder profiles
* CMS public pages
* blog public pages
* legal pages
* sitemap files

Noindex is not security. Private routes must still be protected.

---

## 23. Sitemap Requirements

Sitemap should include only public indexable URLs:

* home
* stable public search/SEO pages
* approved/published property pages
* approved/published project pages
* public broker/builder profiles
* CMS published pages
* blog published pages
* legal pages
* public location pages that pass quality

Sitemap must exclude:

* admin
* dashboard
* auth
* private media
* leads/messages/proposals/site visits
* billing
* upload/API
* drafts
* pending/rejected/deleted listings
* thin/empty pages
* internal setup pages
* hidden contact URLs
* private preview URLs

Sitemap splitting foundation:

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

Use actual framework route conventions.

---

## 24. Structured Data / Schema Rules

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

Rules:

* no fake reviews.
* no fake aggregateRating.
* no hidden phone/email.
* no fake availability.
* no fake price if not real.
* no fake RERA/verified claim.
* no private address unless intended public.
* no pending/draft listing schema.
* schema must match visible content.
* legal disclaimers must not be contradicted.

If uncertain, use conservative WebPage/Breadcrumb schema.

---

## 25. Redirect Manager Foundation

Redirect manager may support:

* old slug to new slug
* merged location redirect
* changed profile slug redirect
* changed blog/CMS slug redirect
* expired listing handling
* deleted page handling
* 301/302 choice
* admin-managed redirects
* redirect hit count if real

Redirect statuses:

```txt id="redirect-statuses"
active
inactive
expired
deleted
pending_review
```

Rules:

* no open redirect.
* destination allowlisted/internal unless explicitly external safe.
* redirect loops prevented.
* redirect chains minimized.
* admin permission required.
* actions audited.
* no fake redirect success.

---

## 26. Sold / Rented / Expired Listing SEO

If listing status becomes:

* sold
* rented
* expired
* paused
* deleted

Rules:

* sold/rented can remain public if product allows and clearly marked, or noindex.
* expired can noindex or redirect depending product rule.
* paused should not be public.
* deleted should 404/410 or redirect based on rule.
* sitemap excludes non-indexable statuses.
* schema availability updated/removed.
* no fake availability.

If status fields do not exist yet, document foundation.

---

## 27. CMS Page Requirements

CMS pages may include:

```txt id="cms-pages"
About
Contact
FAQ
Help
Safety
Privacy
Terms
Cookie Policy
Refund Policy
Cancellation Policy
Listing Policy
Ads Policy
Verification Policy
Payment Disclaimer
Platform Disclaimer
Grievance
Takedown / Copyright
```

CMS page fields:

* title
* slug
* summary
* body
* status
* language
* meta title
* meta description
* canonical
* robots
* version
* reviewed_by
* published_at
* updated_at

Statuses:

```txt id="cms-statuses"
draft
review
published
archived
deleted
```

Rules:

* only published pages public.
* draft/review noindex and admin-only.
* legal placeholder pages must clearly show setup/review status or not be public final.
* unsafe HTML sanitized.
* no scripts in CMS body.
* no hidden contact.
* no fake policy finalization.

---

## 28. Legal Page Requirements

Legal pages should include safe foundation for:

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

Rules:

* If final lawyer-approved text is not provided, mark content as draft/setup-required or use clear placeholder status.
* Do not present placeholder legal text as final legal advice.
* Legal pages must be versioned.
* User consent should reference current published versions.
* Legal changes should be audited.
* Public legal pages must not contain internal notes.
* Legal pages should not expose provider secrets or private data.

---

## 29. Consent Foundation

Consent records may include:

* terms accepted
* privacy accepted
* cookie preference
* contact sharing consent
* marketing opt-in
* WhatsApp/SMS/email communication opt-in later
* payment/trial terms accepted
* ads terms accepted
* verification terms accepted

Rules:

* required consent explicit.
* policy version captured.
* timestamp captured.
* IP/user agent may be hashed if stored.
* marketing opt-in not prechecked.
* user can manage optional preferences where implemented.
* consent records private/RLS protected.
* no fake consent.

---

## 30. Cookie / Privacy Preference Foundation

Cookie/privacy preference can include:

* necessary cookies
* analytics cookies
* marketing cookies
* personalization cookies

Rules:

* necessary cookies always on.
* analytics/marketing optional if implemented.
* no fake preferences.
* preferences saved for user/session if implemented.
* no analytics provider marked active without setup.
* preference UI accessible.
* legal page links available.

If analytics/cookie tooling not implemented, show setup-required/foundation.

---

## 31. Blog Foundation

Blog may include:

* blog listing
* article detail
* categories
* tags
* author
* featured image
* status
* publish date
* updated date
* SEO metadata
* canonical
* noindex draft
* sitemap inclusion for published only

Statuses:

```txt id="blog-statuses"
draft
review
scheduled
published
archived
deleted
```

Rules:

* no fake author expertise.
* no fake legal/financial advice.
* no hidden contact.
* no AI content generation.
* draft/scheduled/review pages noindex/admin-only.
* public article schema only for published real content.
* images public-safe only.

---

## 32. Support / Help Foundation

Help/support pages may include:

* FAQ
* Help Center
* Contact Support
* Safety Center
* Report Fraud
* Listing Help
* Billing Help
* Verification Help
* Ads Help
* Account Help

Rules:

* support ticket system can remain setup-required if not implemented.
* no fake ticket success.
* support contact only official approved contact.
* safety/legal disclaimers included where relevant.
* no hidden contact/private user data.

---

## 33. Grievance / Takedown Foundation

Grievance/takedown pages may include:

* grievance officer placeholder/config
* complaint category
* takedown request
* copyright complaint
* illegal content report
* fraud report
* law enforcement request placeholder
* response timeline disclaimer
* ticket/support integration later

Rules:

* if official officer details missing, show setup-required/internal config needed.
* do not invent legal officer details.
* no fake submission success if ticket system missing.
* submissions private.
* admin/staff permission-scoped.

---

## 34. Admin SEO / CMS / Legal Requirements

Admin modules may include:

* location management
* missing location requests
* SEO page settings
* metadata overrides
* redirect manager
* sitemap controls/status
* CMS pages
* blog articles
* legal pages
* consent policy versions
* support/help content
* audit logs

Rules:

* admin permission required.
* public users denied.
* changes audited.
* draft preview noindex.
* unsafe HTML sanitized.
* publish requires permission.
* legal publish may require Super Admin/legal permission.
* no provider secrets.
* no fake publish/approval.

---

## 35. Admin Permission Requirements

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

Rules:

* checks server-side.
* UI hiding not enough.
* staff without permission denied by direct URL/action.
* legal publishing should be restricted.
* redirects high risk, audit required.
* bulk import/export permission-scoped.

---

## 36. CMS HTML Safety

CMS/blog/legal body content must be safe.

Rules:

* sanitize HTML.
* no arbitrary script.
* no inline event handlers.
* no unsafe iframe.
* no external script embeds.
* if rich editor used, sanitize on server.
* links rel/safety handled.
* image/media IDs resolved through media system.
* draft preview auth-protected/noindex.
* no hidden contact leakage.

If raw HTML rendering exists, verify sanitizer before public use.

---

## 37. SEO Content Quality Rules

For generated/dynamic SEO content:

* use templates conservatively.
* avoid repetitive thin text.
* include real location/category context.
* include real listing/project presence.
* no fake counts.
* no fake “best/top”.
* no fake reviews.
* no fake verified guarantees.
* no keyword stuffing.
* no hidden text.
* no doorway pages.
* no indexed pages without useful content.

If page has no real listings/content, noindex.

---

## 38. Location SEO Page Rules

Location pages should be indexable only if:

* location active/canonical
* real public listings/projects or useful editorial content exists
* no duplicate canonical conflict
* page has useful title/H1/intro
* public-safe media available or safe placeholder
* no hidden contact
* no private/pending data
* sitemap inclusion allowed

Noindex if:

* zero results and no useful content
* duplicate alias page
* pending/rejected location
* thin content
* arbitrary filter combination
* private/scoped requirement-only page

---

## 39. Search Result Count Rules

Counts must be:

* real
* public-safe
* based only on approved/published data
* omitted if expensive/unavailable
* cached only if public-safe

Do not show:

* fake result count
* total platform count from private rows
* pending/draft/deleted rows
* hidden/private requirement rows
* inflated marketing number

If count query too expensive, show no count or approximate only if clearly labeled and real.

---

## 40. Search Sorting Rules

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

Rules:

* sort allowlisted.
* invalid sort defaults safely.
* no raw SQL injection.
* relevance deterministic unless search engine configured.
* no fake sponsored ordering unless ads phase implemented.
* sponsored/boosted order later must be labelled.

---

## 41. Search Pagination Rules

Pagination:

* page query param validated.
* page 1 canonical omits `page=1`.
* page 2+ canonical handled.
* invalid page redirects/noindex.
* infinite scroll may use page URLs.
* mobile infinite scroll safe.
* no duplicate results.
* no empty high page indexed.

---

## 42. Map / Nearby Boundary

Map/nearby features may be setup-required unless provider configured.

Rules:

* no fake map pins.
* no fake nearby distance.
* no Google Maps API usage without setup.
* embed map allowed only if configured/safe.
* map pin private if address hidden.
* exact private address not public unless listing owner chose/show allowed.
* nearby fallback can be text-based if real.

---

## 43. CMS / Blog Media Integration

Use Prompt 10 media system.

Rules:

* blog/CMS images must be public-safe media.
* draft images private until publish.
* no direct external unsafe image hotlink unless allowed.
* alt text sanitized.
* no hidden contact in image metadata.
* image in sitemap/schema only if public-safe.
* media deletion updates content or shows fallback.

---

## 44. Public Legal Footer / Header Integration

Public footer should link to:

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

Rules:

* dashboard/admin footer hidden as previous prompts require.
* no dead links.
* pages missing content show setup-required or are hidden until ready.
* public legal pages mobile-safe.
* no admin links.

---

## 45. Footer / Sitemap Consistency

Verify/footer update:

* public footer links only to public pages.
* missing legal pages not dead.
* sitemap includes published public pages only.
* draft/setup pages either noindex or hidden.
* admin/dashboard/private pages excluded.
* footer does not appear in dashboards/admin where hidden.

---

## 46. Support Contact Rules

If contact/support info is shown:

* use official configured support contact only.
* do not invent phone/email.
* do not use private owner/broker/builder contact.
* support forms setup-required if ticket system missing.
* no fake submission success.
* no hidden contact leak.

---

## 47. Data Privacy / DPDP Foundation

Privacy/legal foundation should address:

* data collection categories
* account data
* listing data
* media data
* payment data
* communication data
* consent
* retention
* deletion/export request placeholder
* grievance/contact point
* third-party providers
* cookies/analytics
* marketing opt-in/out
* user rights foundation

Rules:

* no legal advice claim.
* placeholders clearly marked if final legal content missing.
* policy versions tracked.
* consent version references published pages.

---

## 48. Platform Disclaimer Rules

Platform disclaimer should state foundation:

* marketplace platform
* not legal advisor
* not property owner guarantee
* not RERA/legal verification guarantee unless explicitly verified
* users should independently verify property/project/ownership/RERA/payment details
* verified badge not legal guarantee
* payments outside platform risk
* site visit safety guidance

Do not overpromise.

---

## 49. Redirect / 404 / 410 Rules

Implement or prepare:

* custom 404
* safe 410 for deleted permanent content if product chooses
* redirects for moved slugs
* canonical for aliases
* no open redirect
* no redirect loop
* old sitemap URLs handled

Rules:

* private URLs do not redirect to public with data leak.
* deleted private pages stay protected.
* moved public pages redirect safely.

---

## 50. Error Handling Rules

Use safe errors:

```txt id="safe-errors"
LOCATION_NOT_FOUND
LOCATION_NOT_ACTIVE
LOCATION_REQUEST_REQUIRED
LOCATION_REQUEST_SUBMITTED
LOCATION_REQUEST_DUPLICATE
SEO_PAGE_NOT_FOUND
SEO_PAGE_NOINDEX
CMS_PAGE_NOT_FOUND
CMS_PAGE_DRAFT
LEGAL_CONTENT_SETUP_REQUIRED
REDIRECT_NOT_FOUND
REDIRECT_LOOP_DETECTED
INVALID_SEARCH_PARAM
INVALID_LOCATION_SLUG
INVALID_CANONICAL
SITEMAP_SETUP_REQUIRED
PERMISSION_DENIED
SETUP_REQUIRED
UNKNOWN_ERROR
```

Do not expose:

* SQL errors
* stack traces
* provider secrets
* private listing data
* hidden contact
* admin notes
* draft content to public

---

## 51. Input Validation Rules

Validate:

* location name
* location slug
* parent location
* location type
* PIN code
* latitude/longitude
* search params
* sort
* page
* canonical URL
* redirect source/destination
* CMS slug
* CMS status
* blog slug
* legal page type
* HTML body
* meta title/description
* schema fields
* language code
* consent type
* policy version

Invalid data must not become public indexed content.

---

## 52. RLS Requirements

RLS must protect:

* location requests
* location audit logs
* draft CMS/blog/legal content
* consent records
* redirect admin data if private
* SEO admin overrides
* support/grievance submissions
* user privacy requests
* unpublished content

Public can read:

* active public locations
* published CMS pages
* published blog articles
* published legal pages
* public-safe SEO metadata/views

Public cannot read:

* draft/review/deleted content
* missing location requests
* admin notes
* private consent records
* support/grievance submissions
* unpublished redirects if private
* internal SEO notes

---

## 53. Suggested Tables

Use existing tables if present.

Possible tables:

```txt id="tables"
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

Only create needed tables.

Do not duplicate existing equivalents.

---

## 54. RLS Table Expectations

Enable RLS for private/admin-user tables:

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

Published/public views may expose only safe fields.

If private CMS/legal/location request table lacks RLS:

* do not mark complete
* create bug
* mark result `FAIL`

---

## 55. SQL Migration Rule

If DB changes are needed, create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_location_search_seo_cms_legal.sql
```

Migration must include:

* purpose
* phase: Prompt 11
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* functions/triggers if any
* slug uniqueness constraints
* redirect loop prevention if implemented
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 56. Suggested Indexes

Add/verify indexes for:

### Locations

* type
* parent_id
* slug
* status
* name search/trigram if configured
* district/taluka/city references

### Aliases / Translations

* location_id
* alias_slug
* language
* normalized_name

### Missing Requests

* requester_profile_id
* status
* location_type
* parent_id
* created_at

### Search Support

* public properties/projects location IDs
* purpose/category/type/status
* published_at
* price/rent
* area
* bedrooms

### SEO/CMS

* slug
* status
* language
* published_at
* canonical
* updated_at

### Redirects

* source_path unique
* destination_path
* status

### Consent

* profile_id
* consent_type
* policy_version
* created_at

---

## 57. Server Action / API Requirements

Implement safe actions/routes for:

```txt id="server-actions"
get_location_children
search_locations
request_missing_location
admin_review_missing_location
admin_approve_location_request
admin_reject_location_request
admin_merge_locations
admin_update_location_aliases
normalize_search_params
get_search_results
get_seo_page_metadata
generate_canonical_url
generate_sitemap
get_robots_rules
admin_update_seo_metadata
admin_create_redirect
admin_update_redirect
admin_delete_redirect
get_cms_page
admin_create_cms_page
admin_update_cms_page
admin_publish_cms_page
admin_archive_cms_page
get_blog_posts
admin_create_blog_post
admin_publish_blog_post
get_legal_page
admin_update_legal_page
admin_publish_legal_page
record_consent
update_cookie_preferences
submit_grievance_request
submit_privacy_request
```

Only implement what is safe and in scope.

Each action must:

* validate input
* require auth where needed
* check admin permission where needed
* sanitize text/HTML
* enforce RLS
* avoid private data leaks
* return safe typed errors
* audit admin/publish/legal changes
* avoid fake success

---

## 58. Public Search / SEO Integration With Existing Work

This phase must not break Prompt 05.

Verify and preserve:

* `/search`
* property detail pages
* project detail pages
* public broker/builder profiles
* public-safe views
* hidden contact protection
* published/approved-only public data
* no fake counts
* no private media
* no broken canonical/sitemap

Enhance search/SEO safely without removing working behavior.

---

## 59. Public Requirement SEO Boundary

Requirements may have limited public/scoped visibility.

Rules:

* requirement pages should not leak buyer/renter contact.
* private/scoped requirements noindex.
* empty/thin requirement pages noindex.
* matching requirements for builder may be private dashboard only.
* do not include private requirement URLs in sitemap.
* no hidden contact in schema.

---

## 60. Admin Direct URL Protection

Direct URLs must be protected:

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
* public user denied
* staff without permission denied
* private data not rendered before redirect
* safe forbidden message
* admin pages noindex/no-store

---

## 61. Public Direct URL Handling

Public URL handling:

* valid active location page loads or noindex if thin
* alias redirects to canonical
* inactive/deleted location 404/410/redirect as documented
* draft CMS/blog/legal page denied/noindex
* published CMS/blog/legal page loads
* invalid slugs safe 404
* redirect loops prevented
* no raw errors

---

## 62. Private Cache / Noindex Rules

Private pages must be noindex/no-store:

* admin location/SEO/CMS/legal pages
* CMS/blog/legal draft preview
* missing location request status if private
* consent preferences
* grievance/privacy requests
* support ticket/request pages if private
* dashboard saved/private search pages
* private requirement pages

Public pages can be cached only if public-safe.

---

## 63. Performance Requirements

Implementation must:

* avoid loading all locations at once
* use paginated/searchable dropdowns
* index location/search fields
* avoid unbounded sitemap generation
* split sitemap if large
* cache public-safe CMS/legal/SEO pages
* no-cache private admin/drafts
* avoid expensive count queries
* avoid mass SEO page generation at request time
* use ISR/revalidation or equivalent safely if framework supports
* keep `/search` responsive
* avoid N+1 listing/location/media queries

---

## 64. Accessibility Requirements

Location/search/CMS/legal UI must have:

* semantic headings
* proper labels
* accessible combobox/dropdowns
* keyboard navigation
* focus visible
* clear errors
* status badges not color-only
* mobile filter drawer accessible
* CMS/legal content readable
* table/card labels in admin
* large mobile tap targets
* no horizontal scroll

---

## 65. Responsive Requirements

Check at least:

```txt id="responsive-widths"
320px
360px
390px
430px
768px
1024px
1366px
```

Required:

* location dropdowns usable
* missing location form fits
* search filters usable
* filter chips wrap safely
* mobile filter drawer/bottom sheet works
* SEO landing pages readable
* CMS/legal pages readable
* blog listing/detail responsive
* admin CMS/location tables become cards
* no horizontal scroll
* footer links wrap safely

---

## 66. Tests / Checks To Run

Run available:

```txt id="checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

* location lookup tests
* search param normalization tests
* canonical URL tests
* noindex rules tests
* sitemap generation tests
* robots tests
* redirect loop tests
* CMS sanitizer tests
* RLS tests
* route guard tests
* responsive smoke checks

If script missing, document `NOT_CONFIGURED`.

Do not claim tests passed if not run.

---

## 67. Manual Smoke Checks If App Runs

If app can run, check:

* location dropdown loads district/taluka/city hierarchy
* missing location request submits or setup-required
* admin location review permission-scoped
* `/search` works with city/locality/type filters
* invalid search params do not crash
* empty search pages noindex
* public SEO page canonical correct
* sitemap excludes private pages
* robots excludes admin/dashboard/private pages
* published CMS/legal pages load
* draft CMS/blog/legal pages not public
* redirect manager prevents open redirect
* schema does not include fake reviews/contact
* footer legal/help links work
* mobile search/filter/legal pages work

Record results.

Full verification in matching manual prompt.

---

## 68. API Provider Status Updates

Update `API_PROVIDER_STATUS.md` if relevant.

Potential statuses:

* Google Maps / map provider: `NOT_STARTED`/`SETUP_REQUIRED`
* Search provider/external search: `NOT_STARTED`
* Analytics/GSC: `SETUP_REQUIRED`
* Email provider for support/grievance: `SETUP_REQUIRED`
* CMS rich text editor/sanitizer: `CONFIGURED`/`SETUP_REQUIRED`
* Translation provider: `NOT_STARTED`
* Sitemap automation/ping: `NOT_STARTED`
* Supabase Database/RLS: updated if migrations applied

Do not mark provider active without real test.

---

## 69. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

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

Use accurate statuses.

---

## 70. Changelog Update

Update `CHANGELOG.md`.

Include:

* date
* Prompt 11
* summary
* changed files
* new routes/API routes
* migration files if any
* RLS/security changes
* SEO/sitemap changes
* provider status changes
* tests/checks run
* docs updated
* known issues
* rollback notes
* manual verification pending

---

## 71. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* fake location data
* missing location request public leak
* wrong-user location request access
* admin SEO/CMS permission bypass
* draft CMS/blog/legal public
* legal placeholder marked final
* hidden contact in metadata/schema
* fake listing count
* fake review/rating schema
* empty/thin page indexed
* private page in sitemap
* admin/dashboard in sitemap
* redirect open redirect
* redirect loop
* unsafe CMS HTML/script
* invalid search param crash
* search SQL injection risk
* sitemap unbounded generation
* canonical wrong
* robots missing private blocks
* RLS missing
* migration missing
* build failure
* mobile filter broken

---

## 72. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 11 implementation status
* manual verification pending:

  * `prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md`
* routes/features needing verification
* SEO/sitemap tests pending
* RLS tests pending
* legal placeholder review pending
* provider setup-required states
* responsive checks pending
* known bugs

Do not mark manual verification PASS from implementation prompt alone.

---

## 73. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md`.

Include:

* location request RLS
* CMS/blog/legal draft RLS
* consent record RLS
* grievance/privacy request RLS
* admin SEO/CMS/legal permission checks
* CMS sanitizer status
* hidden contact metadata/schema protection
* private pages noindex/no-store
* sitemap private exclusion
* redirect open redirect protection
* public search approved-only data
* service role/provider secret checks
* known issues

---

## 74. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md`.

Include:

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

## 75. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

Include:

* location/search/SEO route changes
* CMS/legal route changes
* migration path if any
* sitemap/robots changes
* redirect manager changes
* canonical URL changes
* RLS policies
* cache/revalidation risk
* SEO rollback risk
* legal content rollback risk
* post-deploy smoke checks

If migration/SEO routing changes exist, rollback notes are mandatory.

---

## 76. Brain Update

Update `brain.md`.

Include:

* Prompt 11 implementation summary
* changed files
* routes/API routes added/changed
* migration files if any
* location/search status
* SEO/sitemap/robots/canonical status
* CMS/blog/legal status
* consent/privacy status
* RLS status
* provider setup-required states
* bugs/blockers
* tests/checks run
* next prompt:

  * `prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md`
* exact resume instruction

---

## 77. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
src/app/search/page.tsx
src/app/locations/*
src/app/gujarat/*
src/app/sitemap.ts
src/app/robots.ts
src/app/blog/*
src/app/help/*
src/app/support/*
src/app/about/page.tsx
src/app/contact/page.tsx
src/app/faq/page.tsx
src/app/privacy/page.tsx
src/app/terms/page.tsx
src/app/refund/page.tsx
src/app/cancellation/page.tsx
src/app/cookie-policy/page.tsx
src/app/safety/page.tsx
src/app/disclaimer/page.tsx
src/app/grievance/page.tsx
src/app/admin/locations/*
src/app/admin/seo/*
src/app/admin/cms/*
src/app/admin/blog/*
src/app/admin/legal/*
src/app/admin/redirects/*
src/components/location/*
src/components/search/*
src/components/seo/*
src/components/cms/*
src/components/legal/*
src/components/blog/*
src/lib/location/*
src/lib/search/*
src/lib/seo/*
src/lib/sitemap/*
src/lib/cms/*
src/lib/legal/*
src/lib/actions/location.ts
src/lib/actions/cms.ts
src/lib/actions/seo.ts
src/lib/validators/location.ts
src/lib/validators/seo.ts
src/lib/validators/cms.ts
src/types/location.ts
src/types/seo.ts
src/types/cms.ts
supabase/migrations/*_location_search_seo_cms_legal.sql
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

## 78. Expected Output From This Phase

At the end of Prompt 11 implementation, project should have:

* location hierarchy foundation
* cascading dropdowns
* missing location request foundation
* admin location review foundation
* search normalization/refinement
* SEO landing page foundation
* canonical/noindex rules
* robots rules
* sitemap generation foundation
* redirect manager foundation
* safe structured data helpers
* CMS page foundation
* blog foundation
* legal/policy page foundation
* consent/cookie/privacy foundation
* grievance/takedown foundation
* admin SEO/CMS/legal controls
* RLS policies
* no fake SEO/location/legal data
* docs updated
* checks run
* manual verification pending

---

## 79. Forbidden Outcomes

This phase must not leave:

* fake location data marked canonical
* missing location requests public
* wrong-user request access
* public draft CMS/blog/legal pages
* legal placeholder marked final
* hidden contact in metadata/schema/sitemap
* fake listing counts
* fake review/rating schema
* empty/thin pages indexed
* private pages in sitemap
* admin/dashboard/auth/private URLs in sitemap
* unsafe CMS HTML/script
* open redirect
* redirect loop
* invalid search param crash
* public search showing private/pending data
* RLS missing on private content tables
* DB changes without migration
* docs outdated
* manual verification skipped

---

## 80. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* location hierarchy foundation exists but full Gujarat master data incomplete
* missing location admin review partial
* SEO pages foundation exists but only key pages enabled
* sitemap split foundation partial
* CMS/legal pages exist but final legal text setup-required
* blog foundation partial
* cookie/privacy preferences partial
* grievance/takedown setup-required
* map provider setup-required
* GSC/analytics setup-required
* RLS runtime tests pending
* responsive/browser checks pending

### `FAIL`

Use if:

* build fails
* private/admin/dashboard pages appear in sitemap
* hidden contact leaks in metadata/schema/sitemap
* fake listing counts/reviews/schema appear
* draft CMS/blog/legal pages public/indexed
* legal placeholder marked final without review
* public search shows private/pending data
* open redirect exists
* unsafe CMS HTML executes
* RLS missing on private content/request tables
* DB changes missing migration
* empty/thin pages indexed as SEO pages

### `BLOCKED`

Use if:

* Prompt 05 public search/detail SEO foundation failed
* Prompt 10 media integration failed and CMS/blog media depends on it
* Supabase/RLS unavailable blocks content/location tables
* location data source unresolved
* final legal content requirement blocks public legal publish
* package/build baseline broken
* architecture conflict needs owner decision

### `SETUP_REQUIRED`

Use for:

* map/geocoding provider missing
* analytics/GSC missing
* email provider missing for support/grievance
* CMS rich text editor/sanitizer missing
* translation provider missing
* sitemap ping/automation missing
* full Gujarat master location data missing
* final legal text/review missing
* Supabase env missing

Setup-required is acceptable only if no fake/unsafe public content appears.

---

## 81. Final Response Required Format

Return final response in this structure:

```txt id="prompt-11-final-response-format"
Summary:
- what location/search/SEO/CMS/legal foundation was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Location:
- hierarchy:
- Gujarat data:
- aliases/translations:
- cascading dropdowns:
- missing location requests:
- admin review:

Search:
- params:
- filters:
- sort/pagination:
- canonical:
- noindex:
- no fake counts:

SEO:
- landing pages:
- metadata:
- schema:
- sitemap:
- robots:
- redirects:
- empty/thin handling:

CMS/blog:
- CMS pages:
- blog:
- admin editor:
- sanitizer:
- draft/preview:

Legal/privacy:
- legal pages:
- consent:
- cookie preferences:
- grievance/takedown:
- final legal text status:

Admin:
- locations:
- SEO:
- CMS:
- blog:
- legal:
- redirects:
- permissions/audit:

RLS/security:
- private tables:
- public views:
- hidden contact:
- draft/private noindex:
- unsafe HTML:
- open redirect:

Provider/setup-required:
- maps:
- analytics/GSC:
- email/support:
- rich editor/sanitizer:
- translation:
- sitemap automation:
- legal review:

Docs updated:
- path list

Tests/checks run:
- command: result

Bugs/issues found:
- bug IDs or none

Rollback notes:
- code:
- database:
- sitemap/robots:
- redirects:
- cache/revalidation:
- legal content:

Manual verification:
- pending prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md

Next step:
- run prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md
```

Do not say only “done”.

---

## 82. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md
```

Do not start Prompt 12 until Prompt 11 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 83. Common Bugs To Watch For

Create/track bugs for:

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

## 84. Quality Bar

This phase is successful when future phases can rely on:

* locations are canonical and admin-reviewable
* search params are normalized and safe
* SEO pages are useful and not spammy
* empty/thin/private pages are noindex/excluded
* sitemap includes only public indexable URLs
* schema contains no fake reviews/contact/counts
* CMS/legal pages are status-aware and sanitized
* legal placeholders are not represented as final review
* consent/privacy foundations are private/RLS-protected
* redirects are safe from open redirect/loops
* admin controls are permission-scoped
* no hidden contact leaks through SEO/CMS/legal
* docs reflect reality
* manual verification is ready

---

## 85. Final Rule For Prompt 11

Implement location/search/SEO/CMS/legal safely.

Use real location data or honest setup-required states.

Protect private location requests.

Protect hidden contact.

Use useful SEO pages only.

No fake counts.

No fake reviews.

No mass thin indexed pages.

No empty pages indexed.

No private pages in sitemap.

No admin/dashboard pages in sitemap.

No draft CMS/blog/legal public pages.

No unsafe CMS HTML.

No open redirects.

No legal placeholder marked final.

Use RLS.

Use server-side permissions.

Do not skip migrations for DB changes.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
