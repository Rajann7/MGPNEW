# prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md

# My Gujarat Property — Prompt 14 Manual Verification: Performance, Caching, Deployment And Launch

> **DESIGN-MATCH CHECK (mandatory):** Verify built screens match `C:\Users\RAJAN\Documents\MGP DESIGN` **Batch 17** and all `docs/16` "Design Add-Ons". Confirm: PWA install/offline/update logic, token-swap dark mode, transliteration search, Gujarat calculators (EMI/stamp-duty/units), accessibility quick-settings, Batch-17 final QA checklist.

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
```

This prompt verifies the **Performance, Caching, Deployment And Launch** phase.

Do not skip this verification.

Do not start Prompt 15 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real performance, caching, private no-store, database/index, build, deployment, rollback, provider, monitoring, smoke, security-retention and docs checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
Prompt Number: 14 Verification
Phase: Performance, Caching, Deployment And Launch
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
Previous Prompt: prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
Next Implementation Prompt: prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that the platform is performance-safe, cache-safe, deployable, rollback-ready and prepared for final production testing.

This verification checks:

* Core Web Vitals foundation
* mobile-first performance
* public page performance
* private page performance
* public cache strategy
* private no-store strategy
* Next.js cache and revalidation rules
* cache tag strategy
* CDN/media cache strategy
* stale data handling
* private data cache leak prevention
* signed URL cache prevention
* search query performance
* detail page query performance
* dashboard query performance
* admin query performance
* notification/ad/provider query performance
* billing query performance
* media upload performance
* database indexes
* RLS performance review
* unbounded query prevention
* bundle optimization
* server/client component boundary
* image and gallery optimization
* sitemap/robots performance
* environment validation
* provider launch status
* staging/production separation
* feature flags
* maintenance mode
* seed/demo data separation
* build/lint/type/test gates
* migration safety
* zero-downtime considerations
* rollback playbook
* cache purge/revalidation
* monitoring foundation
* health endpoint foundation
* safe logging
* error boundaries
* analytics boundary
* accessibility launch check foundation
* browser/device compatibility foundation
* launch freeze checklist
* post-deploy smoke checklist
* security retained from Prompt 13
* docs updates
* Prompt 15 readiness

This phase does not give final production signoff. Final signoff happens in Prompt 15.

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
prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
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
docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md
```

Also inspect all changed implementation files from Prompt 14.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* performance implementation correctness
* caching implementation correctness
* private cache safety
* public cache safety
* DB/index/query performance
* media/CDN performance
* bundle/client JS review
* deployment checklist
* rollback readiness
* env/provider status
* feature flags
* maintenance mode
* monitoring/health/logging foundation
* launch freeze checklist
* post-deploy smoke checklist
* build/lint/type/test gates
* docs/checklist updates

This verification does not cover:

* final production API testing
* final provider live transaction tests
* final Razorpay live payment signoff
* final SMS/WhatsApp/email live provider signoff
* final legal signoff
* full 1 lakh concurrent user load test
* final external security audit
* final WAF/CDN production tuning
* final Super Admin production signoff

Those are Prompt 15 or operational checks.

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 14 changed files
3. inspect performance/caching configuration
4. inspect route cache modes
5. inspect private no-store rules
6. inspect public cache rules
7. inspect revalidation/cache tags
8. inspect CDN/media cache rules
9. inspect database migrations/indexes
10. inspect query changes
11. inspect RLS performance changes
12. inspect public page performance
13. inspect private dashboard/admin performance
14. inspect search/detail/media performance
15. inspect notification/ad/provider performance
16. inspect bundle/client boundary changes
17. inspect env validation
18. inspect provider launch status
19. inspect feature flags
20. inspect maintenance mode
21. inspect staging/prod separation
22. inspect deployment checklist
23. inspect migration safety notes
24. inspect rollback playbook
25. inspect monitoring/health/logging/error boundary foundation
26. inspect launch freeze and smoke check docs
27. run build/lint/type/test gates
28. run performance/security-related checks where available
29. test app manually where possible
30. test responsive widths where possible
31. verify docs updates
32. create bugs for failures
33. decide final verification result
34. update `brain.md`
35. prepare Prompt 15 readiness note

Do not skip docs updates.

---

## 6. Required File Inspection

Inspect likely changed files:

```txt id="file-inspection"
next.config.*
middleware.*
src/middleware.*
package.json
tsconfig.json
eslint.config.*
src/app/
app/
src/app/search/
app/search/
src/app/properties/
app/properties/
src/app/projects/
app/projects/
src/app/dashboard/
app/dashboard/
src/app/admin/
app/admin/
src/app/api/
app/api/
src/app/api/health/
app/api/health/
src/app/sitemap.*
app/sitemap.*
src/app/robots.*
app/robots.*
src/components/
components/
src/components/search/
components/search/
src/components/property/
components/property/
src/components/project/
components/project/
src/components/dashboard/
components/dashboard/
src/components/admin/
components/admin/
src/components/media/
components/media/
src/components/performance/
components/performance/
src/lib/cache/
lib/cache/
src/lib/performance/
lib/performance/
src/lib/db/
lib/db/
src/lib/supabase/
lib/supabase/
src/lib/search/
lib/search/
src/lib/media/
lib/media/
src/lib/seo/
lib/seo/
src/lib/monitoring/
lib/monitoring/
src/lib/deployment/
lib/deployment/
src/lib/feature-flags/
lib/feature-flags/
src/lib/maintenance/
lib/maintenance/
src/lib/actions/
lib/actions/
src/types/performance.*
types/performance.*
src/types/deployment.*
types/deployment.*
supabase/migrations/
public/
.env.example
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

If Prompt 14 changed database schema, verify migration exists.

Expected pattern:

```txt id="expected-migration"
supabase/migrations/*_performance_caching_deployment_launch.sql
```

Verify migration includes:

* purpose
* phase: Prompt 14
* tables created/changed
* views created/changed
* indexes created
* RLS policies created/changed
* performance-related indexes
* feature flag table if any
* maintenance mode table if any
* health/deployment metadata table if any
* monitoring event table if any
* destructive changes yes/no
* backup required yes/no
* rollback notes

If DB changed without migration:

* create critical bug
* mark verification `FAIL`
* do not start Prompt 15

If migration exists without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL` depending deployment risk

If DB not changed:

* note migration `none`

Do not add or accept blind indexes without query reason.

---

## 8. Core Web Vitals Verification

Target values:

```txt id="core-web-vitals-targets"
LCP: <= 2.5s
INP: <= 200ms
CLS: <= 0.1
```

Verify:

* target values documented
* LCP image strategy implemented or documented
* INP-heavy interactions reviewed
* CLS image/layout stability reviewed
* public pages optimized
* mobile-first behavior reviewed
* runtime measurement status accurate
* no invented measurements

If Lighthouse/Web Vitals tooling not available:

* mark measurement `SETUP_REQUIRED` or `PARTIAL`
* do not invent scores

If code claims exact Web Vitals pass without measurement:

* create bug
* mark `PARTIAL`

---

## 9. 1 Lakh Users Readiness Verification

Verify foundation for high traffic:

* paginated public lists
* paginated dashboard/admin lists
* indexed common filters
* safe public caching
* CDN/media optimization
* no unbounded public APIs
* rate-limit foundation
* no N+1 loops in critical pages
* public views or optimized queries
* monitoring/query error foundation
* load test status documented

Expected honest status:

```txt id="scale-readiness-values"
FOUNDATION_READY
PARTIAL
LOAD_TEST_REQUIRED
SETUP_REQUIRED
BLOCKED
```

Do not claim verified 1 lakh live users without real load test.

If docs claim real 1 lakh load tested without test evidence:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 10. Public Page Performance Verification

Public pages:

* home
* search
* property detail
* project detail
* broker/builder profile
* city/locality SEO pages
* CMS/legal/blog pages
* public ads placements
* sitemap/robots

Check:

* public-safe data only
* cache-safe
* optimized images
* lazy loading below fold
* no huge client bundle
* no fake counts
* no unbounded queries
* no hidden contact
* no private media
* no personalized data in shared cache
* no broken fallback states

If public page fetches private fields for convenience:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 11. Private Page Performance Verification

Private pages:

* dashboards
* profile/settings
* leads/CRM/messages/proposals/site visits
* billing/invoices/payments
* media upload managers
* notification center
* saved items/searches
* builder ads dashboard
* admin modules
* provider settings/logs
* security/audit/fraud pages

Check:

* no public cache
* no-store/private cache control
* server-side auth/role guard
* paginated lists
* indexed queries
* table-to-card mobile optimization
* no private data in metadata/cache
* loading/empty/error/forbidden states
* no unbounded counts
* no N+1 fetches

If private dashboard/admin is statically generated or public-cached:

* create critical bug
* mark `FAIL`

---

## 12. Public Cache Strategy Verification

Verify public pages can be cached only when:

* data is public-safe
* hidden contact excluded
* private fields excluded
* no personalized content
* no draft/pending data
* no signed/private media
* stale data acceptable within TTL/revalidate
* mutation invalidation exists
* no auth cookies used in shared cache

Public cache examples:

* homepage public sections
* published property/project detail
* published public profiles
* published CMS/legal/blog pages
* safe SEO pages
* public active ads with short TTL
* sitemap/robots

If shared cache contains user-specific or private data:

* create critical bug
* mark `FAIL`

---

## 13. Private No-Store Verification

Private pages/routes must use:

* `no-store`
* private cache headers
* dynamic rendering where needed
* no static generation
* no public CDN cache
* no sitemap inclusion
* no private metadata
* no signed URL cache

Private areas:

```txt id="private-cache-areas"
dashboard
admin
leads
messages
proposals
site-visits
billing
payments
invoices
GST
notifications
provider logs
audit logs
security incidents
fraud reports
private media
private docs
CMS drafts
```

If private signed URL or private page is cached publicly:

* create critical bug
* mark `FAIL`

---

## 14. Next.js Cache Verification

If Next.js App Router is used, verify use of:

```txt id="next-cache-tools"
dynamic = "force-dynamic"
dynamic = "force-static"
revalidate
fetch cache options
unstable_cache if used
revalidatePath
revalidateTag
cache tags
headers/cookies dynamic rendering
server actions after mutation
```

Check:

* private pages dynamic/no-store
* public pages static/revalidate only when safe
* user-specific fetches not shared cached
* signed URLs not cached
* provider/admin routes no-store
* cache invalidation after mutations
* no private route uses `force-static`
* no public stale data risk ignored

If private route uses unsafe static cache:

* create critical bug
* mark `FAIL`

---

## 15. Cache Tag Verification

Verify cache tag strategy includes relevant tags:

```txt id="cache-tags"
home
search
properties
property:{id}
projects
project:{id}
profiles
profile:{id}
locations
location:{id}
seo
cms
cms:{slug}
blog
blog:{slug}
legal
ads
ads:{placement}
sitemap
media:{id}
```

Check:

* tags used only for public-safe data
* mutations revalidate affected tags/paths
* listing/project approval revalidates search/home/detail/location
* media update revalidates affected detail/search/profile
* ad approval/pause/expire revalidates ad placement
* CMS/legal/blog publish revalidates page/sitemap
* private data not cached by shared tag

If tags not implemented:

* verify documented fallback:

  * route-level short TTL
  * revalidatePath
  * manual purge
  * setup-required

If stale public data can remain dangerously long:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 16. Cache Purge / Revalidation Verification

Verify purge/revalidation for:

* property approval/update/delete/pause
* project approval/update/delete/pause
* requirement public/scoped state changes
* media update/delete
* profile update
* CMS/blog/legal publish/unpublish
* location/SEO changes
* ad approval/pause/expire
* sitemap changes
* robots changes if dynamic
* provider status public pages if any

Rules:

* deleted/private content removed from public pages
* stale active ads not served after pause/expiry beyond safe TTL
* legal page updates reflected
* sitemap removes deleted/private URLs
* cache purge provider setup-required if missing

If deleted/private listing remains in sitemap/cache with no TTL/purge strategy:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 17. CDN / Media Cache Verification

Verify:

* public media uses CDN/public-safe URLs
* private media not public CDN
* search cards use thumbnails
* detail pages use responsive variants
* ads use placement-specific banner variants
* profile avatars/logos optimized
* width/height/aspect ratio set
* lazy loading below fold
* LCP image priority only where needed
* originals not served publicly by default
* deleted media purge/version strategy
* CDN provider status honest
* no fake CDN active

If search cards serve large originals:

* create bug
* mark `PARTIAL`

If private media served through public CDN:

* create critical bug
* mark `FAIL`

---

## 18. Image And Gallery Verification

For property/project galleries, verify:

* cover image first
* LCP cover optimized
* thumbnails for cards/strips
* detail gallery responsive
* fullscreen viewer lazy loads
* no distortion
* dimensions/aspect ratio set
* `draggable=false` for public images
* mobile touch scroll smooth
* no all-gallery eager preload
* no private/pending media
* fallback for missing media
* no layout shift

If public gallery loads every original image eagerly:

* create bug
* mark `PARTIAL`

---

## 19. Search Performance Verification

Verify search:

* uses indexed filters
* validates params
* paginates results
* limits page size
* avoids expensive full counts if not needed
* avoids N+1 media/profile/location queries
* fetches public-safe fields only
* uses public-safe view/query if available
* no private/pending rows
* no fake count
* mobile filters lightweight
* invalid high page noindex/handled safely

If `/search` uses unbounded query:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 20. Detail Page Performance Verification

Verify property/project detail:

* fetches single public-safe entity
* media variants fetched efficiently
* uploader public profile fetched efficiently
* related/similar sections limited or setup-required
* private lead/message/billing not fetched
* hidden contact not fetched publicly
* metadata generation avoids duplicate heavy query where possible
* not-found/status safe
* cache public-safe only
* private/pending/rejected listing not publicly cached

If detail page has N+1 media/profile/location queries:

* create bug
* mark `PARTIAL`

---

## 21. Dashboard Performance Verification

Verify dashboards:

* lists paginated
* summary cards use efficient queries
* no fake analytics
* heavy modules lazy-loaded
* private no-store
* loading/empty/error states
* repeated profile/auth fetch minimized
* no dashboard-wide heavy counts on every route
* media/lead/message/proposal lists bounded
* filters server-side
* mobile tables become cards

If dashboard loads all user records without limit:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 22. Admin Performance Verification

Verify admin modules:

* queues paginated
* filters/sorts server-side
* no loading all rows
* private docs/media lazy-loaded only when opened
* drawer/detail pages for heavy data
* bulk export permission/setup-required
* no-store/private cache
* status/date/assignment indexes
* real counts or no count
* no fake metrics
* provider logs/DLQ paginated
* audit logs paginated

If admin list loads all database rows:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 23. Notification Performance Verification

Verify notification bell:

* unread count efficient/indexed
* latest few only in dropdown
* notification center paginated
* no full notification list on every page
* no fake unread count
* no public cache
* mark read updates count
* realtime subscription only if efficient/setup
* no private payload in shared cache

If notification bell performs unbounded query globally:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 24. Ads Performance Verification

Verify public ads:

* query eligible ads only
* indexes on placement/status/schedule/target
* no private campaign data
* short safe cache if used
* expired/paused ads not stale too long
* creative lazy-loaded
* impression/click rate-limited/foundation
* ad failure does not block page
* no fake metrics
* no layout shift
* Sponsored label visible

If stale ad cache serves paused/rejected ad:

* create bug
* mark `FAIL`

---

## 25. Billing Performance Verification

Verify billing pages:

* private no-store
* invoices/payments paginated
* wrong-user data denied
* profile/status/date indexes
* no fake balances
* checkout/order creation not duplicated
* webhook processing idempotent
* invoice list efficient
* payment provider status honest
* no public cache

If billing page uses public cache:

* create critical bug
* mark `FAIL`

---

## 26. Media Upload Performance Verification

Verify upload manager:

* avoids huge client memory use
* client pre-validation for UX
* server validation remains source of truth
* progress honest
* retry/cancel safe
* upload concurrency limited or documented
* processing async/setup-required
* dashboard not blocked by processing
* no fake processing
* orphan tracking/cleanup status
* rate-limit foundation
* mobile upload usable

If upload UI freezes or loads all media originals:

* create bug
* mark `PARTIAL`

---

## 27. Provider / Webhook Performance Verification

Verify provider/webhook flows:

* user action not blocked by slow external provider where queued
* retry/backoff foundation
* webhook processing idempotent
* provider logs bounded/paginated
* test sends rate-limited
* provider failure degrades gracefully
* no fake delivery
* no secrets in logs
* webhook endpoint avoids long blocking operations
* DLQ status honest/setup-required

If provider failure crashes main user action unnecessarily:

* create bug
* mark `PARTIAL`

---

## 28. Database Index Review Verification

Verify indexes exist or are documented for common filters.

### Public Listings

* status
* purpose
* category/type
* location IDs
* price/rent
* area
* bedrooms
* published_at
* owner/broker/builder profile
* slug

### Projects

* builder_profile_id
* status
* location IDs
* project_type
* purpose
* RERA status
* published_at
* slug

### Requirements

* requester_profile_id
* status
* purpose/type/location
* budget
* created_at

### Leads / Messages / Proposals / Site Visits

* participant/profile IDs
* entity IDs
* status/stage
* created_at/updated_at
* unread/read fields

### Billing

* profile ID
* status
* provider IDs
* invoice number
* created_at

### Media

* entity type/entity ID
* owner profile ID
* visibility/status
* sort order
* deleted_at

### Notifications

* recipient profile ID
* read_at
* status
* created_at

### Ads

* builder profile ID
* project ID
* status
* placement
* start/end
* target location

### CMS/SEO/Location

* slug
* status
* parent/location type
* language
* published_at

If missing critical index on a large/critical query:

* create bug
* mark `PARTIAL` unless severe

---

## 29. RLS Performance Verification

Verify RLS policies are not weakened.

Check:

* RLS still enabled
* security behavior unchanged
* expensive policies reviewed
* policy predicates supported by indexes
* no broad permissive policy added for speed
* no service role client bypass
* public-safe views do not leak private data
* security definer functions safe if used
* policy behavior tested or setup-required

If RLS was weakened for speed:

* create critical bug
* mark `FAIL`

---

## 30. Query Optimization Verification

Search for and inspect:

* `select *`
* unbounded `.select()`
* missing `.limit()`
* repeated auth/profile fetch
* repeated role fetch
* repeated location/media/profile joins
* per-row async fetch loops
* heavy counts
* duplicate metadata/page queries
* private fields fetched publicly

Rules:

* select only needed columns
* use limits
* use pagination
* batch where safe
* avoid per-row extra queries
* avoid expensive counts if not needed
* no private fields in public payloads

If query optimization missing in critical public route:

* create bug
* mark `PARTIAL`

---

## 31. Bundle Optimization Verification

Review bundle/client JS changes:

* admin/dashboard code not in public bundle
* payment SDK not loaded globally
* maps/editor/charts not loaded globally
* provider SDKs not in client unless public-safe
* heavy components dynamic imported
* icon imports not full library if avoidable
* public home/search initial JS reasonable
* unnecessary client components reduced
* no secrets in client bundle
* no feature removed without approval

If heavy SDK loads globally on every page:

* create bug
* mark `PARTIAL`

---

## 32. Server / Client Component Boundary Verification

Verify:

* data fetching server-side where safe
* client components only where interactivity required
* private fields not passed to client unnecessarily
* no huge serialized props
* client fetching private data has server checks
* server actions validate input
* optimistic UI only where real mutation exists
* provider secrets not imported into client
* service role not imported into client

If private fields are serialized into public client props:

* create critical bug
* mark `FAIL`

---

## 33. Loading / Empty / Error State Verification

Verify key pages include:

* loading state
* empty state
* error state
* unauthorized state
* setup-required state
* rate-limited state where applicable
* no fake data state

Pages/modules:

* search
* property/project detail
* dashboards
* admin queues
* media upload
* billing
* notifications
* builder ads
* providers
* CMS/legal/admin pages
* health/monitoring if implemented

If pages show fake data instead of empty/setup state:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 34. Mobile Performance Verification

Test or inspect:

* no horizontal scroll
* no huge fixed tables
* tables become cards
* filters bottom sheet/drawer
* tap targets large
* gallery optimized
* forms not laggy
* dropdowns paginated/searchable
* no dashboard/admin huge initial JS
* no full-page blocking where partial data works
* upload/media UI usable

Widths:

```txt id="responsive-widths"
320px
360px
390px
430px
768px
1024px
1366px
```

If not all widths tested, mark responsive `PARTIAL`.

---

## 35. SEO Performance Verification

Verify SEO pages:

* no mass runtime page generation
* sitemap batching/splitting safe
* public-safe cache
* no private data fetch
* no fake counts
* canonical stable
* noindex thin/empty
* schema generation not heavy
* sitemap generation bounded
* revalidates after content/listing changes
* robots simple/safe

If sitemap generation loads all private rows:

* create critical bug
* mark `FAIL`

---

## 36. Sitemap / Robots Performance Verification

Verify sitemap:

* bounded
* split when large or foundation documented
* public indexable URLs only
* no private/admin/dashboard/auth URLs
* no private media/signed URLs
* no draft/pending/deleted listings
* no hidden contact
* selects only needed fields
* lastmod real or omitted
* cached/revalidated safely
* fails safely if DB unavailable

Verify robots:

* safe
* not dynamically expensive
* blocks private routes
* links correct sitemap

If private URL in sitemap:

* create critical bug
* mark `FAIL`

---

## 37. Environment Validation Verification

Verify env validation for:

* Supabase URL/anon key
* service role key server-only if needed
* Razorpay keys/webhook secret
* R2/CDN vars
* email provider vars
* SMS provider vars
* WhatsApp provider vars
* maps vars
* captcha vars
* analytics/GSC vars
* error monitoring vars
* site URL
* app environment
* public/private key boundaries

Check:

* missing required env gives setup-required/build/runtime error
* optional providers setup-required
* secrets not exposed to client
* `.env.example` placeholders only
* staging/prod separated

If production build can silently run with fake provider active:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 38. Provider Status Launch Review

Verify `API_PROVIDER_STATUS.md` includes launch status for:

* Supabase Auth
* Supabase Database/RLS
* Supabase Storage/R2/CDN
* Razorpay
* OTP
* Email
* SMS
* WhatsApp
* Push
* Maps/geocoding
* Analytics/GSC
* Error monitoring
* Captcha/WAF
* Cron/jobs
* Malware scanner
* Backup
* Hosting/deployment
* CDN/cache purge

Statuses:

```txt id="provider-status-values"
NOT_STARTED
SETUP_REQUIRED
CONFIGURED
TEST_MODE
ACTIVE
PARTIAL
DEGRADED
FAILED
BLOCKED
```

Rules:

* no active without test/config
* setup-required states listed
* production blockers identified
* no fake readiness

If provider status is fake active:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 39. Feature Flag Verification

Verify feature flags exist or are documented for risky/incomplete features:

```txt id="feature-flags"
ENABLE_PUBLIC_ADS
ENABLE_AD_CLICK_TRACKING
ENABLE_EXTERNAL_EMAIL
ENABLE_EXTERNAL_SMS
ENABLE_EXTERNAL_WHATSAPP
ENABLE_PUSH_NOTIFICATIONS
ENABLE_PAYMENT_CHECKOUT
ENABLE_MEDIA_UPLOADS
ENABLE_PROJECT_VIDEO
ENABLE_PUBLIC_CMS_BLOG
ENABLE_LOCATION_REQUESTS
ENABLE_SUPPORT_FORMS
ENABLE_PROVIDER_TEST_SEND
ENABLE_RATE_LIMIT_STRICT_MODE
ENABLE_MAINTENANCE_MODE
```

Check:

* flags server-side where security-sensitive
* public flags only for UI hints
* incomplete provider features off by default
* flag changes audited if admin-controlled
* docs updated
* no client enables payment/provider/security features

If unsafe flag lets client enable paid/provider feature:

* create critical bug
* mark `FAIL`

---

## 40. Maintenance Mode Verification

If maintenance mode exists, verify:

* global flag
* public maintenance page
* noindex
* clear message
* Super Admin/staff bypass if intended
* payment webhooks still processed if possible
* provider webhooks not silently broken
* admin recovery route
* scheduled maintenance notice foundation
* changes audited
* no fake toggle

If maintenance mode blocks payment webhooks without documentation:

* create bug
* mark `PARTIAL` or `FAIL`

If not implemented, verify setup/status documented.

---

## 41. Deployment Environment Separation Verification

Verify separation:

* local
* development
* staging
* production

Rules:

* dev/test data not shown in production
* test payment not active in production
* dev OTP not active in production
* mock providers not active in production
* public URLs correct by environment
* storage buckets separated/namespaced
* database separated
* seed scripts guarded
* production logs not too verbose
* staging provider states distinct

If dev/mock provider can become production active silently:

* create bug
* mark `FAIL`

---

## 42. Seed / Demo Data Verification

Verify:

* seed/demo data dev/test only
* production has no demo users/listings/payments/ads/notifications
* fake counts not visible
* test provider status labelled
* demo media not treated as production uploads
* seed scripts guarded by environment
* cleanup documented

If demo data appears public production-like:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 43. Build Gate Verification

Run available build gates:

```txt id="build-gates"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

```txt id="optional-gates"
npm run test:e2e
npm run test:performance
npm run test:security
npm run test:rls
npm run analyze
npm run lighthouse
npm audit
pnpm audit
```

Rules:

* build failure blocks PASS
* typecheck failure blocks PASS unless script not configured
* lint blocking errors block PASS
* tests failing block PASS/PARTIAL depending severity
* missing scripts documented `NOT_CONFIGURED`
* do not fake pass

If build fails:

* create bug
* mark `FAIL`

---

## 44. Deployment Checklist Verification

Verify `DEPLOYMENT_ROLLBACK.md` includes deployment checklist:

* branch/version
* changelog updated
* feature registry updated
* brain updated
* migrations reviewed
* backup before migration
* env vars checked
* provider statuses checked
* feature flags checked
* build/lint/typecheck/tests run
* RLS/security checklist checked
* performance checklist checked
* smoke tests planned
* rollback owner/steps
* maintenance window if needed
* post-deploy monitoring plan

If deployment checklist missing:

* update docs
* mark `PARTIAL`

---

## 45. Migration Deployment Safety Verification

Verify migration safety:

* SQL reviewed
* destructive changes identified
* backup requirement documented
* staging run recommended/recorded
* rollback notes present
* long locks avoided or documented
* indexes added safely
* no dropping columns/tables without approval
* RLS verified after migration
* seed/dev data separation
* applied migrations documented

If destructive migration has no backup/rollback notes:

* create critical bug
* mark `FAIL`

---

## 46. Zero-Downtime Verification

Verify zero-downtime considerations:

* additive schema changes preferred
* code compatible with old/new schema where possible
* backfill separate if needed
* long blocking migrations avoided
* feature flags for new behavior
* rollback code compatibility
* cache poisoning avoided
* public broken states avoided
* maintenance window documented if needed

If zero-downtime cannot be guaranteed:

* document maintenance window/setup-required
* mark `PARTIAL` unless critical

---

## 47. Rollback Playbook Verification

Verify rollback playbook covers:

* code rollback
* DB rollback
* migration rollback
* feature flag rollback
* provider flag rollback
* cache purge
* CDN rollback
* R2/media rollback
* payment/provider webhook rollback
* sitemap/SEO rollback
* admin/provider/security rollback
* monitoring rollback
* data correction steps

Rules:

* rollback does not delete data accidentally
* destructive migrations have special notes
* provider/webhook rollback avoids lost payment events
* cache purge/revalidation considered
* status honest
* rollback tested only if actually tested

If rollback docs missing for changed DB/cache/provider behavior:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 48. Cache Purge / Revalidation Verification

Verify revalidation/purge exists or is documented for:

* listing/project approval/change/delete
* media update/delete
* profile update
* CMS/blog/legal publish/unpublish
* location/SEO changes
* ad approval/pause/expire
* sitemap changes
* provider public status if any

Check:

* no stale private data
* no stale active ad too long
* no stale deleted listing in sitemap
* legal page updates reflected
* CDN purge provider status honest
* short TTL fallback documented if purge missing

If stale private data can remain public:

* create critical bug
* mark `FAIL`

---

## 49. Monitoring Foundation Verification

Verify monitoring foundation includes:

* error tracking provider status
* request error logs
* server action errors
* webhook failures
* payment failures
* provider delivery failures
* DB query failures
* RLS denial anomalies if tracked
* upload processing failures
* cache/revalidation failures
* ad event spikes
* suspicious activity events
* uptime/health endpoint

Rules:

* no secrets in logs
* no hidden contact in logs
* provider setup-required if monitoring vendor missing
* no fake monitoring active
* docs updated

If monitoring marked active without provider/config:

* create bug
* mark `PARTIAL`

---

## 50. Health Endpoint Verification

If health endpoint/page exists, verify it checks or reports safely:

* app boot
* database connectivity
* Supabase Auth status
* storage provider status
* payment provider status if safe
* notification provider setup status
* build/version
* migration version if available

Rules:

* public health endpoint exposes safe summary only
* detailed health admin-only
* no secrets
* no fake green status
* no expensive checks on every request
* status accurate/setup-required

If health endpoint exposes provider secrets or DB internals publicly:

* create critical bug
* mark `FAIL`

---

## 51. Logging Verification

Verify production logging:

* safe request errors
* webhook failures
* provider failures
* payment failures
* security suspicious events
* migration/deploy notes
* cache invalidation failures

Logs must not include:

* provider secrets
* service role
* OTP
* auth tokens
* signed URL tokens
* hidden contact
* raw private message bodies
* private docs
* full payment secrets
* full webhook payloads with secrets

If logs expose secrets/private contact:

* create critical bug
* mark `FAIL`

---

## 52. Error Boundary Verification

Verify error boundaries for:

* public search/detail
* dashboards
* admin
* billing
* media upload
* notifications
* ads
* provider/admin pages
* CMS/blog/legal pages

Check:

* user-friendly message
* no stack trace
* retry/back link
* setup-required state where applicable
* safe error logging
* private pages remain private
* mobile-safe error UI

If public error page shows stack trace/secrets:

* create bug
* mark `FAIL`

---

## 53. Analytics Boundary Verification

Verify analytics/GSC status:

* provider status honest
* no fake traffic metrics
* private dashboard/admin pages not tracked with sensitive data
* hidden contact not in analytics events
* cookie consent respected
* public page analytics only if configured
* performance analytics status documented
* no provider secrets exposed

If analytics active without consent/provider setup:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 54. Accessibility Launch Check Verification

Verify accessibility foundation:

* semantic headings
* keyboard navigation
* focus visible
* modal focus lock
* bottom sheet accessibility
* form labels
* status labels not color-only
* large tap targets
* readable text
* no horizontal scroll
* image alt text safe
* error messages readable

If final accessibility tools not available:

* mark accessibility runtime check `PARTIAL`
* do not claim full accessibility pass

---

## 55. Browser / Device Compatibility Verification

Prepare or run smoke checks for:

* Chrome mobile
* Safari iOS if available
* Firefox
* Edge
* desktop Chrome
* responsive widths
* slow network
* low-end mobile consideration
* touch interactions
* file upload basics
* payment checkout if enabled
* maps/embed if enabled
* gallery/video/PDF if enabled

Untested browsers/devices should be marked:

```txt id="browser-status"
TESTED
PARTIAL
SETUP_REQUIRED
NOT_AVAILABLE
```

Do not claim cross-browser pass without checks.

---

## 56. Launch Freeze Checklist Verification

Verify launch freeze checklist includes:

* no high/critical bugs open
* no fake data visible
* no fake providers active
* no fake payments
* no hidden contact leak
* no public admin
* no direct URL private leaks
* no private sitemap URLs
* no build failures
* docs updated
* rollback ready
* providers status reviewed
* feature flags reviewed
* backup reviewed
* Super Admin signoff pending for Prompt 15

If launch freeze checklist missing:

* update docs
* mark `PARTIAL`

---

## 57. Post-Deploy Smoke Check Verification

Verify post-deploy smoke checklist includes:

* home loads
* search loads
* property detail loads
* project detail loads
* login/register popup works
* owner dashboard loads
* broker dashboard loads
* builder dashboard loads
* admin login loads
* admin dashboard loads
* private direct URL denied
* media public images load
* payment checkout disabled/setup/works based on status
* notifications load
* provider status accurate
* sitemap/robots correct
* no private pages in sitemap
* no hidden contact public
* build version correct

If smoke checklist missing:

* update docs
* mark `PARTIAL`

---

## 58. Public Route Smoke Verification

If app can run, smoke these routes if present:

```txt id="public-smoke-routes"
/ 
/search
/properties/[slug]
/projects/[slug]
/profiles/[slug]
/blog
/blog/[slug]
/about
/contact
/faq
/help
/safety
/privacy
/terms
/cookie-policy
/refund
/cancellation
/disclaimer
/grievance
/sitemap.xml
/robots.txt
```

Check:

* route loads
* no private data
* no hidden contact
* no broken images
* cache safe
* metadata safe
* mobile safe
* no raw errors

Use actual project route names.

If representative public routes fail:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 59. Private Route Smoke Verification

If app can run, smoke these routes if present:

```txt id="private-smoke-routes"
/dashboard
/dashboard/owner
/dashboard/broker
/dashboard/builder
/dashboard/profile
/dashboard/notifications
/dashboard/billing
/dashboard/messages
/dashboard/site-visits
/dashboard/saved
/dashboard/builder/ads
/admin
/admin/users
/admin/properties
/admin/projects
/admin/requirements
/admin/ads
/admin/providers
/admin/cms
/admin/security
```

Check:

* guest denied
* wrong role denied
* authorized user allowed
* no public cache
* no private metadata leak
* paginated/usable
* mobile safe

If private route is public or public-cached:

* create critical bug
* mark `FAIL`

---

## 60. API Smoke Verification

Smoke APIs/actions where safe:

* public search API
* public detail API/view
* auth status/login popup path
* media public URL
* signed private URL denied for wrong user
* notification unread count
* mark read
* public ad placement
* ad click redirect safe
* health endpoint if implemented
* payment webhook test only in safe test mode
* provider webhook test only in safe test mode

Do not call real paid/provider production APIs unless configured for test and approved.

If safe API checks cannot run:

* mark `SETUP_REQUIRED` or `PARTIAL`

---

## 61. Security Retained Verification

Prompt 14 must not weaken Prompt 13.

Verify:

* no private public cache
* hidden contact still protected
* RLS still enabled
* provider secrets still server-only
* service role still server-only
* no private sitemap URLs
* no direct URL bypass introduced
* no private signed URL cached
* no security checks removed for speed
* no validation removed
* no public admin
* no unsafe CSP/header weakening without reason

If performance changes weaken security:

* create critical bug
* mark `FAIL`

---

## 62. `PERFORMANCE_CHECKLIST.md` Verification

`PERFORMANCE_CHECKLIST.md` is the main document for this phase.

Verify it includes:

* Core Web Vitals target/status
* public route performance status
* private route performance status
* DB indexes
* query optimization
* pagination status
* cache strategy
* private no-store status
* media/CDN performance
* bundle optimization
* sitemap performance
* provider/webhook performance
* monitoring status
* load test status
* launch performance blockers
* remaining setup-required items

If missing, update before final response.

---

## 63. `SECURITY_RLS_CHECKLIST.md` Re-Check Verification

Verify security checklist updated for:

* private cache rules
* public cache rules
* deployment security
* provider env vars
* secret exposure after build
* sitemap/private route exclusion
* monitoring/log redaction
* rollback security
* maintenance mode security
* post-deploy security smoke

If security checklist not updated:

* update docs
* mark `PARTIAL`

---

## 64. `API_PROVIDER_STATUS.md` Verification

Verify provider launch status for:

* Supabase Auth
* Supabase Database/RLS
* Supabase Storage/R2/CDN
* Razorpay
* OTP
* Email
* SMS
* WhatsApp
* Push
* Maps
* Analytics/GSC
* Error monitoring
* Captcha/WAF
* Cron/jobs
* Malware scan
* Backup
* Hosting/deployment
* CDN/cache purge

Rules:

* no fake active
* setup-required accurate
* blockers clearly listed
* production providers distinguished from dev/test
* no secrets shown

If provider status inaccurate:

* update docs
* mark `PARTIAL` or `FAIL` depending risk

---

## 65. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

* Core Web Vitals foundation
* public page caching
* private no-store
* cache tag strategy
* revalidation foundation
* CDN/media performance
* image optimization
* search pagination
* search query optimization
* database index review
* RLS performance review
* dashboard pagination
* admin pagination
* notification count optimization
* ad serving optimization
* provider/webhook queue performance
* bundle optimization
* environment validation
* feature flags
* maintenance mode
* deployment checklist
* migration safety checklist
* rollback playbook
* cache purge/revalidation
* monitoring foundation
* health endpoint foundation
* logging/error boundary foundation
* backup/restore readiness
* launch freeze checklist
* post-deploy smoke checklist

Future/final production signoff must not be marked done.

---

## 66. Changelog Verification

Check `CHANGELOG.md` includes Prompt 14 entry with:

* date
* summary
* changed files
* new routes/API routes
* migration files if any
* performance changes
* caching changes
* deployment/rollback changes
* provider status changes
* build/check results
* docs updated
* verification status
* known issues
* manual verification status

If missing, update changelog.

---

## 67. Bugs And Fixes Verification

If issues are found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

* `BUG-PERF-PRIVATE-PUBLIC-CACHE`
* `BUG-PERF-DASHBOARD-STATIC-CACHE`
* `BUG-PERF-SIGNED-URL-CACHED`
* `BUG-PERF-SEARCH-UNBOUNDED`
* `BUG-PERF-SEARCH-ORIGINAL-IMAGE`
* `BUG-PERF-DETAIL-NPLUS1`
* `BUG-PERF-DASHBOARD-UNBOUNDED`
* `BUG-PERF-ADMIN-UNBOUNDED`
* `BUG-PERF-MISSING-INDEX`
* `BUG-PERF-SLOW-QUERY`
* `BUG-PERF-FAKE-METRICS`
* `BUG-DEPLOY-FAKE-BUILD-PASS`
* `BUG-DEPLOY-FAKE-STATUS`
* `BUG-DEPLOY-FAKE-MONITORING`
* `BUG-DEPLOY-FAKE-ROLLBACK`
* `BUG-CACHE-STALE-AD`
* `BUG-CACHE-STALE-SITEMAP`
* `BUG-CACHE-PRIVATE-SITEMAP`
* `BUG-DEPLOY-BUILD-FAIL`
* `BUG-DEPLOY-TYPECHECK-FAIL`
* `BUG-DEPLOY-LINT-FAIL`
* `BUG-FLAG-UNSAFE`
* `BUG-MAINTENANCE-WEBHOOK-BLOCK`
* `BUG-ROLLBACK-DOCS-MISSING`
* `BUG-PERF-MIGRATION-MISSING`

Use existing bug ID convention if available.

---

## 68. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 14 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* routes/features checked
* performance checks
* caching checks
* private no-store checks
* database/index checks
* build/lint/type/test checks
* deployment checklist checks
* rollback checks
* provider/env checks
* monitoring/health checks
* smoke checks
* responsive widths
* expected
* actual
* issues found
* result
* next step

Use exact status.

No vague “optimized”.

---

## 69. Deployment Rollback Verification

`DEPLOYMENT_ROLLBACK.md` is a main document for this phase.

Verify it includes:

* deployment checklist
* pre-deploy backup checklist
* migration checklist
* feature flag checklist
* env/provider checklist
* cache/CDN purge checklist
* rollback code steps
* rollback DB steps
* rollback provider steps
* rollback feature flag steps
* rollback cache steps
* maintenance mode steps
* post-deploy smoke checks
* monitoring plan
* known rollback limitations
* owner/Super Admin launch signoff pending

If missing or outdated:

* update docs
* mark `PARTIAL` or `FAIL` depending risk

---

## 70. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 14 implementation summary
* Prompt 14 verification result
* changed files
* routes/API/performance areas checked
* migrations/tables/indexes/RLS
* cache strategy status
* private no-store status
* public cache/revalidation status
* DB/index/query status
* media/CDN status
* build/lint/type/test status
* env/provider status
* deployment/rollback status
* monitoring/health status
* launch freeze status
* setup-required items
* bugs/blockers
* commands run
* next prompt:

  * `prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`
* instruction not to proceed if Prompt 14 failed/blocked

---

## 71. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* lint/typecheck pass or non-configured scripts documented
* public pages performance reviewed
* private pages no-store reviewed
* no private public cache
* no signed URL public cache
* public cache rules safe
* cache invalidation/revalidation strategy exists or safe TTL fallback documented
* DB indexes reviewed and critical missing indexes fixed/documented
* no critical unbounded public/private queries
* search/detail/dashboard/admin queries bounded
* media uses optimized variants or setup-required placeholders
* bundle/client boundary reviewed
* sitemap/robots bounded and safe
* env validation reviewed
* provider status honest
* feature flags reviewed
* maintenance mode status reviewed
* deployment checklist updated
* migration safety reviewed
* rollback playbook updated
* monitoring/health/logging foundation reviewed
* launch freeze checklist updated
* post-deploy smoke checklist updated
* Prompt 13 security retained
* docs updated
* no blocking bugs

### PARTIAL

Use `PARTIAL` if:

* runtime Lighthouse/Core Web Vitals measurement unavailable
* full load test not performed
* monitoring provider setup-required
* error tracking setup-required
* CDN purge API setup-required
* backup restore test setup-required
* staging environment unavailable
* browser/device checks incomplete
* feature flags partial
* maintenance mode partial
* some provider statuses setup-required but core app safe
* no private cache/security/build blocker exists

Prompt 15 can start only if user/Super Admin accepts partial and no critical launch blocker exists.

### FAIL

Use `FAIL` if:

* build fails
* typecheck fails
* blocking lint errors
* private page publicly cached
* dashboard/admin statically/public cached
* private signed URL cached
* search/detail broken
* critical route broken
* private data in sitemap/cache
* hidden contact public
* RLS/security weakened for performance
* public API unbounded with data leak risk
* deployment rollback docs missing for migration
* DB changes missing migration
* fake performance/deployment/monitoring/rollback claimed

Do not start Prompt 15.

### BLOCKED

Use `BLOCKED` if:

* Prompt 13 security verification failed
* critical security bug open
* Supabase/RLS unavailable blocks deployment readiness
* provider/env architecture unresolved
* hosting/deployment target unknown and required
* migration strategy unresolved
* package/build baseline broken
* cannot inspect required files
* performance changes conflict with security/privacy rules

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* monitoring provider missing
* error tracking missing
* analytics/GSC missing
* CDN purge API missing
* backup provider missing
* staging environment missing
* load test tooling missing
* Lighthouse tooling missing
* production env missing
* hosting config missing
* cron/jobs missing
* browser/device lab unavailable

Setup-required is acceptable only if no fake launch readiness is claimed and no critical blocker remains.

---

## 72. Prompt 15 Readiness Checklist

Prompt 15 can start only if:

* Prompt 14 implementation completed
* Prompt 14 verification completed
* no critical performance/cache/deployment/security bug open
* build does not fail
* no private public cache
* no signed URL public cache
* no dashboard/admin public cache
* no private URL in sitemap
* no hidden contact public
* no RLS/security weakening
* no fake provider/deployment/monitoring status
* rollback playbook updated
* deployment checklist updated
* launch freeze checklist updated
* post-deploy smoke checklist updated
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`

If Prompt 15 file is missing, stop and ask/generate it.

---

## 73. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 14 Verification — Performance, Caching, Deployment And Launch

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Performance Checks:
- Core Web Vitals foundation:
- public pages:
- search:
- detail pages:
- dashboards:
- admin:
- bundle/client JS:
- images/media:
- mobile performance:

Caching Checks:
- public cache:
- private no-store:
- signed URL cache:
- cache tags:
- revalidation:
- CDN/media cache:
- sitemap/robots cache:
- stale data handling:

Database/Query Checks:
- migrations:
- indexes:
- RLS performance:
- search queries:
- detail queries:
- dashboard/admin queries:
- notification/ad queries:
- unbounded query checks:

Deployment Checks:
- env validation:
- provider status:
- feature flags:
- maintenance mode:
- staging/prod separation:
- seed/demo data:
- migration safety:
- zero-downtime notes:

Rollback/Launch Checks:
- deployment checklist:
- rollback playbook:
- cache purge:
- monitoring:
- health endpoint:
- logging:
- error boundaries:
- launch freeze:
- post-deploy smoke:

Security Retained:
- private cache:
- hidden contact:
- RLS:
- provider secrets:
- private sitemap:
- service role:
- no weakened checks:

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
- Performance/caching/deployment foundation is safe and ready for Prompt 15.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Launch Readiness:
- NOT_READY / FOUNDATION_READY / PARTIAL / BLOCKED / SETUP_REQUIRED / READY_FOR_FINAL_SIGNOFF

Can Start Prompt 15:
- Yes/No

Next Step:
- prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md or fix blockers first.
```

---

## 74. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 14 Performance/Caching/Deployment/Launch verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Performance:
- Core Web Vitals foundation:
- public pages:
- search:
- detail pages:
- dashboards:
- admin:
- bundle/client JS:
- images/media:
- mobile performance:
- 1 lakh users readiness:

Caching:
- public cache:
- private no-store:
- signed URL cache:
- cache tags:
- revalidation:
- CDN/media cache:
- sitemap/robots cache:
- stale data handling:

Database/query:
- migrations:
- indexes:
- RLS performance:
- search queries:
- detail queries:
- dashboard/admin queries:
- notification/ad queries:
- unbounded query checks:

Deployment:
- env validation:
- provider status:
- feature flags:
- maintenance mode:
- staging/prod separation:
- seed/demo data:
- migration safety:
- zero-downtime:
- build gates:

Monitoring/launch:
- health endpoint:
- logging:
- error boundaries:
- monitoring/error tracking:
- analytics boundary:
- accessibility:
- browser/device:
- launch freeze:
- post-deploy smoke:

Security retained:
- private cache:
- hidden contact:
- RLS:
- provider secrets:
- service role:
- private sitemap:
- no weakened checks:

Provider/setup-required:
- monitoring:
- error tracking:
- analytics/GSC:
- CDN purge:
- backup:
- staging:
- load test:
- Lighthouse:
- cron/jobs:
- hosting/prod env:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Launch readiness:
- NOT_READY / FOUNDATION_READY / PARTIAL / BLOCKED / SETUP_REQUIRED / READY_FOR_FINAL_SIGNOFF
- reason

Can start Prompt 15:
- Yes/No
- reason

Next step:
- prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
```

Do not write vague “performance verified”.

---

## 75. If Verification Fails

If verification fails:

1. do not start Prompt 15
2. create/update bug entries
3. update `MANUAL_VERIFICATION.md`
4. update `PERFORMANCE_CHECKLIST.md`
5. update `SECURITY_RLS_CHECKLIST.md`
6. update `DEPLOYMENT_ROLLBACK.md`
7. update `API_PROVIDER_STATUS.md` if provider/deploy issue found
8. update `brain.md`
9. state exact blocker
10. fix if safe and in scope
11. rerun verification
12. only then proceed

Critical cache/deployment/security/performance failures block progress.

---

## 76. If Verification Is Partial

If verification is partial:

* document exact partial items
* list setup-required infrastructure
* list unmeasured performance checks
* list missing load tests
* list monitoring/error tracking gaps
* list browser/device gaps
* list feature flag/maintenance gaps
* list rollback gaps
* confirm no private public cache
* confirm no signed URL public cache
* confirm no dashboard/admin public cache
* confirm no private URL in sitemap
* confirm no hidden contact public
* confirm no security/RLS weakening
* confirm build does not fail
* update docs
* ask/require owner acceptance before Prompt 15 if risk is significant

Acceptable partial examples:

* Lighthouse unavailable
* load test not performed
* monitoring setup-required
* backup restore test setup-required
* staging environment unavailable
* CDN purge API setup-required
* browser matrix incomplete
* maintenance mode foundation only

Not acceptable partial without fix:

* build fail
* private public cache
* signed URL cached
* hidden contact public
* private URL in sitemap
* dashboard/admin static public cache
* RLS/security weakened
* search/detail critical route broken
* fake deployment/monitoring/rollback status
* migration without rollback notes

---

## 77. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `DEPLOYMENT_ROLLBACK.md`
* update `API_PROVIDER_STATUS.md` if relevant
* update `brain.md`
* final response should say Prompt 15 can start

Do not start Prompt 15 automatically unless user asked to continue.

---

## 78. What Not To Do In This Verification

Do not:

* fake Lighthouse/Core Web Vitals numbers
* fake load test results
* fake build success
* fake deployment success
* fake monitoring active
* fake rollback tested
* fake provider readiness
* cache private pages publicly
* cache signed URLs publicly
* weaken RLS/security for speed
* ignore private URLs in sitemap
* ignore stale deleted/private public pages
* ignore unbounded queries
* hide lint/type/build errors
* skip docs
* start Prompt 15 after FAIL/BLOCKED

---

## 79. Quality Bar

This verification is successful when future phases can trust that:

* public pages are optimized and safely cached
* private pages are no-store/private
* signed URLs are not publicly cached
* search/detail/dashboard/admin queries are bounded
* images/media use optimized variants
* DB indexes support major filters
* RLS performance was reviewed without weakening security
* build/lint/type gates are honest
* env/provider statuses are honest
* feature flags and maintenance mode are safe or documented
* deployment checklist is current
* rollback playbook is current
* monitoring/health/logging foundation exists or setup-required
* launch freeze checklist is ready
* post-deploy smoke checklist is ready
* no fake performance/deployment/launch claims exist
* Prompt 15 can perform final production API testing and signoff

---

## 80. Final Rule For Prompt 14 Verification

Verify performance honestly.

Verify caching honestly.

Verify public cache honestly.

Verify private no-store honestly.

Verify database queries honestly.

Verify indexes honestly.

Verify build gates honestly.

Verify deployment readiness honestly.

Verify rollback honestly.

Verify monitoring honestly.

Verify launch readiness honestly.

Do not fake Core Web Vitals.

Do not fake load tests.

Do not fake build pass.

Do not fake deployment.

Do not fake monitoring.

Do not fake rollback.

Do not cache private data publicly.

Do not cache signed URLs publicly.

Do not weaken RLS/security for speed.

Do not put private URLs in sitemap.

Do not mark PASS without performance/cache/deployment checks.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
