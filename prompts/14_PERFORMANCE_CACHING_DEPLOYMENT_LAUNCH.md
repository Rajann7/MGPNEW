# prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md

# My Gujarat Property — Prompt 14: Performance, Caching, Deployment And Launch

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batch 17 (advanced/PWA/localization/tools)**, `design-prompts/DESIGN_ADDONS_MASTER.md`, delta `report-batch-17.md`, and `docs/16` "Design Add-Ons". Locked: PWA install/offline/update logic, token-swap dark mode, transliteration search, Gujarat calculators (EMI/stamp-duty/units), accessibility quick-settings, Batch-17 final QA checklist.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
```

This phase implements and hardens the performance, caching, deployment and launch-readiness foundation for **My Gujarat Property**:

* Core Web Vitals optimization
* mobile-first performance
* public search performance
* public detail page performance
* dashboard performance
* admin performance
* database query optimization
* Supabase/RLS performance
* indexes review
* pagination limits
* no unbounded reads
* caching strategy
* public page caching
* private page no-store
* Next.js cache/revalidation foundation
* CDN/media optimization
* R2/CDN cache strategy
* image optimization
* bundle optimization
* server action optimization
* route-level performance review
* slow query foundation
* build/lint/type/test gates
* environment validation
* staging/production separation
* migration/deployment safety
* feature flags
* maintenance mode foundation
* rollback readiness
* monitoring foundation
* logging/error tracking foundation
* backup/restore readiness review
* launch freeze checklist
* post-deploy smoke checks
* Super Admin launch readiness handoff
* no fake performance
* no fake deployment
* no fake monitoring
* no fake rollback
* no fake PASS

Do not cache private data publicly.

Do not serve stale private pages.

Do not fake performance results.

Do not fake build/deployment success.

Do not fake monitoring.

Do not fake rollback readiness.

Do not fake launch readiness.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
Prompt Number: 14
Phase: Performance, Caching, Deployment And Launch
Type: Implementation Prompt
Matching Verification Prompt: prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
Previous Verification Prompt: prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
```

---

## 2. Phase Purpose

The purpose of this phase is to prepare the platform for safe launch by improving performance, hardening caching, validating deployment readiness and documenting rollback.

This phase should implement or strengthen:

* Core Web Vitals foundation
* mobile-first page speed
* public page caching
* private page no-store
* safe Next.js caching
* cache invalidation/revalidation
* database indexes
* query optimization
* pagination
* lazy loading
* code splitting
* image optimization
* media/CDN performance
* search performance
* detail page performance
* dashboard/admin performance
* notification/ad query performance
* provider webhook processing performance
* build/lint/type/test gates
* environment validation
* deployment checklist
* staging/prod separation
* migration safety
* feature flags
* maintenance mode
* rollback playbook
* post-deploy smoke tests
* monitoring/error tracking foundation
* performance docs updates
* launch readiness docs updates
* manual verification handoff

This phase must not weaken security/RLS/privacy to improve performance.

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
prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md
prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
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

Also inspect current performance/caching/deployment configuration before editing.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
next.config.*
middleware.*
src/middleware.*
package.json
pnpm-lock.yaml
package-lock.json
yarn.lock
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
src/types/
types/
supabase/migrations/
supabase/seed*
public/
.env.example
```

Search for:

* unbounded queries
* `select *`
* missing pagination
* client-heavy components
* large client bundles
* unnecessary client components
* expensive server actions
* N+1 queries
* public pages using private no-store incorrectly
* private pages cached publicly
* dashboard/admin pages cached
* public detail pages using huge original images
* search cards using full images
* duplicate API calls
* repeated auth/profile fetches
* missing indexes
* slow joins
* RLS policy performance issues
* unnecessary realtime subscriptions
* fake performance numbers
* fake analytics
* fake monitoring
* fake deployment checklist
* missing rollback notes

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement or harden:

### 5.1 Performance

* Core Web Vitals improvements
* LCP image optimization
* INP interaction improvements
* CLS layout stability
* bundle splitting
* server/client component boundary review
* lazy loading
* skeleton/empty/error states
* pagination
* query limits
* expensive component reduction
* dashboard/admin table/card optimization

### 5.2 Caching

* public cache strategy
* private no-store strategy
* route cache configuration
* `revalidateTag` / `revalidatePath` foundation if Next.js supports
* cache tags for listings/projects/profiles/CMS/SEO/ads
* CDN cache strategy
* media cache strategy
* sitemap/robots caching
* stale data safety
* cache invalidation after mutations

### 5.3 Database

* indexes review
* query performance
* RLS policy performance
* public views optimization
* search query optimization
* dashboard count/query optimization
* notification unread count optimization
* ad serving query optimization
* billing/invoice query optimization
* media query optimization
* admin queue pagination

### 5.4 Deployment

* environment validation
* staging/prod separation
* build gates
* migration safety
* seed/dev data separation
* feature flags
* maintenance mode
* provider status validation
* deployment checklist
* rollback plan

### 5.5 Launch Readiness

* launch freeze checklist
* post-deploy smoke checks
* monitoring/error tracking foundation
* uptime/health endpoint foundation
* backup/restore readiness review
* Super Admin launch handoff
* final prompt readiness

### 5.6 Docs

Update all memory docs.

---

## 6. Out Of Scope For This Phase

Do not fully implement:

* final production launch signoff
* final production API test signoff
* final Super Admin legal/payment/security signoff
* full load test with real 1 lakh concurrent users
* external APM vendor setup if provider missing
* external uptime monitoring if provider missing
* full synthetic monitoring suite
* full chaos testing
* full disaster recovery drill
* final WAF/CDN production rule tuning
* final data migration from legacy/live site unless explicitly provided
* final SEO traffic launch
* final marketing launch
* final PWA/offline rollout unless already started

This phase prepares launch readiness. Final signoff is Prompt 15.

---

## 7. Hard Performance And Deployment Rules

Claude must enforce:

```txt id="hard-performance-deployment-rules"
No private data in public cache.
No dashboard/admin caching as public.
No stale private signed URLs in cache.
No service role in client for performance.
No disabling RLS for performance.
No removing security checks for speed.
No fake Core Web Vitals.
No fake build pass.
No fake deployment.
No fake monitoring.
No fake rollback readiness.
No fake launch readiness.
```

Forbidden:

* caching personalized pages with public cache
* caching notification/billing/leads/messages pages publicly
* using `select *` on large/private tables
* unbounded public APIs
* full original images on search cards
* hiding build/test failures
* marking provider active without test
* marking rollback tested without test
* deleting features to make build pass without approval
* disabling validations/RLS to improve speed

---

## 8. Performance Targets

Target Core Web Vitals:

```txt id="core-web-vitals-targets"
LCP: <= 2.5s
INP: <= 200ms
CLS: <= 0.1
TTFB: as low as practical for hosting/database setup
```

Target behavior:

* mobile-first
* fast first load on public pages
* no layout shift in image galleries/cards
* search results usable quickly
* dashboard lists paginated
* admin queues paginated
* upload/media UI responsive
* notification bell lightweight
* no N+1 loops
* no unbounded data fetches

If exact measurement tools are unavailable, implement foundations and mark runtime measurement `SETUP_REQUIRED` or `PARTIAL`.

Do not invent measured numbers.

---

## 9. 1 Lakh Users Readiness Foundation

The product requirement expects readiness for high traffic.

This phase should prepare for scale by:

* paginating all large lists
* indexing common filters
* caching public pages safely
* avoiding expensive counts
* using CDN for media
* avoiding client bundle bloat
* protecting public APIs with rate limits
* avoiding N+1 queries
* using public-safe materialized/views where appropriate
* separating read-heavy public pages from private dashboards
* monitoring query errors/latency foundation
* documenting load test status

Do not claim verified for 1 lakh live users without real load test.

Use `FOUNDATION_READY`, `PARTIAL`, or `LOAD_TEST_REQUIRED`.

---

## 10. Public Page Performance Requirements

Public pages include:

* home
* search
* property detail
* project detail
* broker/builder public profile
* city/locality SEO pages
* CMS/legal/blog pages
* public ads placements
* sitemap/robots

Requirements:

* public-safe data only
* appropriate caching
* no hidden contact
* no private media
* optimized images
* pagination/infinite scroll with limits
* stable layout
* lazy loading below fold
* no huge client bundle
* no fake counts
* no unbounded queries
* no private no-store unless needed

---

## 11. Private Page Performance Requirements

Private pages include:

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

Requirements:

* no public cache
* `no-store` or equivalent private cache control
* auth/role checked server-side
* paginated lists
* indexed queries
* table-to-card mobile optimization
* no private data in metadata/cache
* loading/empty/error/forbidden states
* no unbounded counts
* no N+1 row fetches

---

## 12. Next.js Caching Strategy

If using Next.js App Router, define safe usage for:

```txt id="next-cache-tools"
dynamic = "force-dynamic"
dynamic = "force-static"
revalidate
fetch cache options
unstable_cache if used
revalidatePath
revalidateTag
cache tags
headers/cookies based dynamic rendering
server actions after mutation
```

Rules:

* public static/CMS/SEO pages can use safe revalidation.
* public listing pages can use short/controlled revalidation if data safe.
* private dashboard/admin/billing/messages/notifications must be dynamic/no-store.
* mutation must revalidate affected public pages.
* signed URLs must not be cached publicly.
* user-specific fetches must not use shared cache.
* provider/admin pages no-store.

---

## 13. Cache Tag Strategy

Recommended cache tags:

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

Rules:

* cache tag invalidation after create/update/approve/reject/delete/publish.
* listing approval should invalidate search/location/home/detail if public.
* media update should invalidate affected detail/search/profile.
* ad approval/pause should invalidate ad placement cache.
* CMS/legal/blog publish should invalidate public page/sitemap.
* private data should not be cached by shared tag.

If cache tags are not implemented, document route-level fallback.

---

## 14. Private Cache Control Requirements

Private pages/routes must use:

* `no-store`
* private cache headers
* no public CDN caching
* no sitemap inclusion
* no static generation
* no public metadata with private info
* no signed URL caching
* no auth data in shared cache

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

If a private route is statically generated or publicly cached, fix or mark `FAIL`.

---

## 15. Public Cache Control Requirements

Public pages may use safe caching when:

* data is public-safe
* hidden contact excluded
* private fields excluded
* stale data acceptable within configured revalidate
* mutation invalidation exists
* no personalized content
* no draft/pending data
* no signed/private media

Public cache examples:

* homepage public sections
* SEO landing pages with approved listings
* published CMS/legal/blog pages
* public property/project detail after approval
* public profiles
* public active ads view with short TTL
* sitemap/robots

Rules:

* active ads cache TTL must not serve expired/paused ads too long.
* public listing cache must invalidate after approval/status change.
* no user-specific city selection in shared cache unless handled safely.

---

## 16. CDN / Media Performance Requirements

Use Prompt 10 media foundation.

Requirements:

* search cards use thumbnails
* detail gallery uses responsive variants
* public profile uses optimized avatar/logo
* public ads use appropriate banner variant
* images include width/height
* lazy loading below fold
* priority only for above-fold LCP image
* avoid serving originals publicly
* CDN cache headers safe
* private media no public CDN
* deleted media cache-busted/purged/versioned
* no broken images
* no layout shift

If media provider/CDN is setup-required, public UI must use safe placeholders and document status.

---

## 17. Image And Gallery Optimization

For property/project galleries:

* cover image first
* LCP image optimized
* thumbnails for strips/cards
* fullscreen gallery lazy loads
* no distortion
* width/height/aspect ratio set
* `draggable=false` for public images
* mobile touch scroll smooth
* no huge image preloads
* no all-gallery eager load
* no private image URLs

---

## 18. Search Performance Requirements

Search must:

* use indexed filters
* paginate results
* avoid expensive full counts when not needed
* limit page size
* validate search params
* avoid N+1 media/profile/location queries
* fetch public-safe fields only
* use public view/query if available
* cache safe SEO/search pages only
* no private/pending rows
* no fake count
* mobile filters lightweight

If count query expensive, show no count or real approximate only if clearly labelled and safe.

---

## 19. Detail Page Performance Requirements

Property/project detail pages must:

* fetch one public-safe entity
* fetch media variants efficiently
* fetch uploader public profile efficiently
* fetch related/similar only with limits or setup-required
* not fetch private leads/messages/billing
* not fetch hidden contact publicly
* use metadata generation without duplicate heavy queries if possible
* handle not found/status safely
* cache only if public-safe

---

## 20. Dashboard Performance Requirements

Dashboards must:

* paginate lists
* use summary cards from efficient queries
* avoid fake analytics
* avoid loading all leads/messages/proposals/media
* use server-side filtering
* lazy-load heavy modules
* use no-store/private caching
* provide loading/empty/error states
* avoid repeated profile/auth queries
* avoid dashboard-wide heavy counts on every page

If real analytics are expensive/unavailable, show no-data/setup-required instead of fake counts.

---

## 21. Admin Performance Requirements

Admin modules must:

* paginate all queues
* filter/sort server-side
* avoid loading all rows
* avoid loading private docs/media until opened
* use drawers/detail pages for heavy data
* avoid bulk exports without permission and background/setup-required
* use no-store/private cache
* index status/date/assignment fields
* show real counts or no count
* avoid fake metrics

---

## 22. Notification Performance Requirements

Notification bell must:

* fetch unread count efficiently
* fetch latest few notifications only
* avoid full notification list on every page
* avoid realtime subscription unless efficient/setup
* no fake unread count
* no private cache
* mark read should update count and revalidate private state
* notification center paginated

---

## 23. Ads Performance Requirements

Public ad serving must:

* query only eligible ads
* use indexes for placement/status/schedule/target
* avoid private campaign data
* use short safe cache if needed
* avoid stale expired/paused ads
* lazy-load ad creatives
* record impressions/clicks safely/rate-limited
* no fake metrics
* no blocking public page if ad query fails

If ad service fails, hide ad slot safely.

---

## 24. Billing Performance Requirements

Billing pages must:

* be private/no-store
* paginate invoices/payments
* avoid recalculating heavy totals repeatedly
* use indexes for profile/status/date
* no wrong-user data
* no fake balances
* checkout/order creation not duplicated
* webhook processing idempotent and efficient
* invoice PDF/email setup-required if provider missing

---

## 25. Media Upload Performance Requirements

Upload manager must:

* avoid huge client memory use
* validate before upload for UX
* server-side validation remains source of truth
* show progress honestly
* retry/cancel safely
* upload concurrency limited
* variants/processing async or setup-required
* no blocking whole dashboard on media processing
* no fake processing
* no orphan growth untracked

---

## 26. Provider / Webhook Performance Requirements

Provider delivery/webhook flows must:

* avoid blocking user actions on slow provider when queued
* use retry/backoff foundation
* process webhooks idempotently
* avoid unbounded logs
* paginate provider logs
* rate-limit provider test sends
* no fake delivery
* no secrets in logs
* provider failure degrades gracefully

---

## 27. Database Index Review

Review indexes for all major filters:

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

Add missing indexes through migration only.

---

## 28. RLS Performance Review

Review RLS policies for:

* expensive subqueries
* repeated function calls
* missing indexes supporting policy predicates
* policies that block query planner unnecessarily
* broad policies on large tables
* policies relying on non-indexed profile/role fields
* public views with safe fields to avoid private RLS overhead where appropriate

Rules:

* do not weaken RLS for speed.
* add indexes/helpers instead.
* use security definer functions only if safe and documented.
* public-safe views should not leak private fields.
* test policy behavior after optimization.

---

## 29. Query Optimization Requirements

Optimize:

* repeated auth/profile fetch
* repeated role fetch
* repeated location joins
* repeated media joins
* search result queries
* detail page queries
* dashboard summary queries
* admin queue queries
* notification count queries
* ad serving queries
* sitemap generation queries

Rules:

* no `select *` on large/private tables.
* select only needed columns.
* use limits.
* use pagination.
* batch queries where safe.
* avoid per-row extra queries.
* avoid expensive counts if not needed.
* do not fetch private fields for public pages.

---

## 30. Bundle Optimization Requirements

Review:

* unnecessary client components
* large libraries in client bundle
* admin/dashboard code in public bundle
* charts loaded on first page
* editors loaded on public pages
* maps loaded before needed
* payment SDK loaded globally
* provider SDK loaded client-side unnecessarily
* icon libraries imported fully
* date/formatting libraries heavy usage
* image gallery bundle size

Rules:

* use dynamic import for heavy UI.
* keep admin/dashboard modules separate.
* load payment/maps/editor only where needed.
* avoid provider secrets/client SDKs unless public-safe.
* do not remove required features without approval.

---

## 31. Server / Client Component Boundary

If Next.js App Router is used:

* keep data fetching server-side where safe.
* mark client components only when interactivity required.
* avoid passing private fields to client.
* avoid huge serialized props.
* avoid client fetching private data without server checks.
* use server actions with validation.
* use optimistic UI only where real mutation exists.
* avoid client bundle bloat.

---

## 32. Loading / Empty / Error States

Every key page should have:

* loading state
* empty state
* error state
* unauthorized state
* setup-required state where provider missing
* rate-limited state where applicable
* no fake data state

Pages:

* search
* detail
* dashboards
* admin queues
* media upload
* billing
* notifications
* ads
* providers
* CMS/legal/admin pages

---

## 33. Mobile Performance Requirements

Mobile-first performance:

* no horizontal scroll
* no huge fixed tables
* tables become cards
* filters bottom sheet/drawer
* touch targets large
* gallery optimized
* forms not laggy
* modals not over-rendered
* dropdowns paginated/searchable
* no full-page blocking spinners if partial data can load
* no large initial JS for dashboard/admin

Test widths later in verification:

```txt id="responsive-widths"
320px
360px
390px
430px
768px
1024px
1366px
```

---

## 34. SEO Performance Requirements

SEO pages must:

* avoid mass runtime generation
* use safe sitemap batching
* cache public-safe content
* noindex thin/empty pages
* not fetch private data
* avoid heavy schema generation
* avoid fake counts
* use canonical URLs consistently
* revalidate after content/listing changes
* sitemap generation bounded

---

## 35. Sitemap / Robots Performance

Sitemap generation must:

* be bounded
* split when large
* include only public indexable URLs
* avoid private rows
* avoid loading all fields
* use pagination/batching if needed
* use lastmod only if real
* cache/revalidate safely
* fail safely if DB/provider unavailable

Robots should be simple, safe and not dynamically expensive.

---

## 36. Environment Validation Requirements

Implement or verify env validation for:

* Supabase URL/anon key
* service role key server-only if needed
* Razorpay keys/webhook secret
* R2/CDN vars
* email/SMS/WhatsApp vars
* maps vars
* captcha vars
* analytics/GSC vars
* error monitoring vars
* site URL
* app environment
* public/private key boundaries

Rules:

* missing required env gives clear setup-required/build/runtime error.
* optional providers marked setup-required.
* secrets not exposed to client.
* `.env.example` placeholders updated.
* staging/prod env separated.

---

## 37. Provider Status Pre-Launch Review

Review `API_PROVIDER_STATUS.md` for:

* Supabase Auth
* Supabase Database/RLS
* Supabase Storage/R2/CDN
* Razorpay
* OTP
* email
* SMS
* WhatsApp
* maps/geocoding
* analytics/GSC
* error monitoring
* captcha/WAF
* cron/jobs
* malware scanning
* backup

Rules:

* no active status without real setup/test.
* setup-required providers clearly listed.
* production blockers identified.
* no fake provider readiness.

---

## 38. Feature Flag Requirements

Create or verify feature flags for risky/incomplete features:

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

Rules:

* flags server-side where security-sensitive.
* public env flags safe only for UI hints.
* incomplete provider features off by default.
* feature flag changes audited if admin-controlled.
* docs updated.

---

## 39. Maintenance Mode Foundation

Maintenance mode may include:

* global flag
* public maintenance page
* admin bypass for Super Admin/staff
* private/dashboard access rules
* API behavior
* provider/webhook behavior
* noindex maintenance page
* clear message
* scheduled maintenance notice foundation

Rules:

* payment webhooks should still be processed if possible.
* provider webhooks should not be broken silently.
* admin can recover.
* no fake maintenance toggle.
* docs/rollback updated.

---

## 40. Deployment Environment Separation

Verify separation:

* local
* development
* staging
* production

Rules:

* dev/test data not shown in production.
* test payment not active in production.
* dev OTP not active in production.
* mock providers not active in production.
* public URLs correct per environment.
* storage buckets separated or namespaced.
* database separated.
* seed scripts not run in production accidentally.
* logs not too verbose in production.

---

## 41. Seed / Demo Data Rules

Seed/demo data allowed only for dev/test.

Rules:

* production must not show demo users/listings/payments/ads/notifications.
* fake counts not allowed.
* test provider status labelled.
* demo media not treated as user-uploaded production media.
* seed scripts guarded by environment.
* cleanup documented.

If demo data remains public production, mark launch blocker.

---

## 42. Build Gate Requirements

Before claiming ready, run:

```txt id="build-gates"
lint
typecheck
build
tests where available
migration check if available
security checks where available
```

Do not mark PASS if build fails.

If scripts are missing, document `NOT_CONFIGURED`.

If build fails, fix safe issues or mark `FAIL`.

---

## 43. Deployment Checklist Requirements

Create/update deployment checklist in `DEPLOYMENT_ROLLBACK.md`.

Checklist must include:

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

---

## 44. Migration Deployment Safety

For migrations:

* review all SQL
* confirm destructive changes
* confirm backup requirement
* run on staging first if available
* check rollback notes
* avoid long locks
* add indexes safely
* avoid dropping columns/tables without approval
* verify RLS after migration
* verify seed/dev data separation
* document applied migrations

No DB change without migration.

No destructive migration without backup/owner approval.

---

## 45. Zero-Downtime Considerations

For deployment:

* additive schema changes first
* deploy code compatible with old/new schema where possible
* backfill separately if needed
* avoid long blocking migrations
* feature flags for new behavior
* rollback code compatibility
* avoid cache poisoning during deploy
* avoid public broken states
* monitor errors after deploy

If zero-downtime cannot be guaranteed, document maintenance window/setup-required.

---

## 46. Rollback Requirements

Update rollback playbook for:

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

* rollback must not delete data accidentally.
* destructive migrations require special rollback notes.
* provider/webhook rollback must not lose payment events.
* cache purge/revalidation considered.
* rollback status honest.

---

## 47. Cache Purge / Revalidation Requirements

Implement/document cache purge for:

* listing/project approval/change/delete
* media update/delete
* profile update
* CMS/blog/legal publish/unpublish
* location/SEO changes
* ad approval/pause/expire
* sitemap changes
* provider status public pages if any

Rules:

* no stale private data.
* no stale active ads too long.
* no stale legal pages after publish/unpublish.
* no stale deleted listing in sitemap.
* if purge not implemented, use versioned keys/short TTL and document.

---

## 48. Monitoring Foundation

Monitoring may include:

* error tracking provider
* request error logs
* server action errors
* webhook failures
* payment failures
* provider delivery failures
* DB query failures
* RLS denial anomalies
* upload processing failures
* cache/revalidation failures
* ad event spikes
* suspicious activity events
* uptime/health endpoint

Rules:

* no secrets in logs.
* no hidden contact in logs.
* provider setup-required if monitoring vendor missing.
* no fake monitoring active.
* docs updated.

---

## 49. Health Endpoint Foundation

A health endpoint/page may check:

* app boot
* database connectivity
* Supabase Auth status
* storage provider status
* payment provider status if safe
* notification provider setup status
* build/version
* migration version if available

Rules:

* public health endpoint must not expose secrets.
* detailed health admin-only.
* provider details masked.
* no fake green status.
* no expensive checks on every request.
* status accurate/setup-required.

---

## 50. Logging Requirements

Production logs should include:

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

---

## 51. Error Boundary Requirements

Add/verify error boundaries for:

* public search/detail
* dashboards
* admin
* billing
* media upload
* notifications
* ads
* provider/admin pages
* CMS/blog/legal pages

Rules:

* user-friendly message
* no stack trace
* retry/back link
* setup-required state where applicable
* error logging safe
* private pages remain private

---

## 52. Analytics Boundary

Analytics/GSC may be setup-required.

Rules:

* do not mark analytics active without provider.
* no private dashboard/admin pages tracked with sensitive data.
* no hidden contact in analytics events.
* cookie consent respected where required.
* public page analytics only if configured.
* performance analytics status documented.
* no fake traffic metrics.

---

## 53. Accessibility Launch Check Foundation

Prepare for verification:

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

Do not mark final accessibility pass unless checked.

---

## 54. Browser / Device Compatibility Foundation

Prepare for smoke checks:

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

Document untested browsers as `SETUP_REQUIRED` or `PARTIAL`.

---

## 55. Launch Freeze Checklist

Add/update launch freeze checklist:

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

Prompt 14 prepares this checklist. Prompt 15 completes final signoff.

---

## 56. Post-Deploy Smoke Check Foundation

Define post-deploy smoke checks:

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

Document exact commands/routes.

---

## 57. Core Public Routes To Smoke

Smoke these routes if present:

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

Use actual route names in project.

---

## 58. Core Private Routes To Smoke

Smoke these routes if present:

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

Rules:

* guest denied.
* wrong role denied.
* authorized user allowed.
* no private public cache.

---

## 59. API Smoke Check Foundation

Smoke APIs/actions where safe:

* public search API
* public detail API/view
* login/auth status
* media public URL
* signed private URL denied for wrong user
* notification unread count
* mark read
* ad public placement
* ad click redirect safe
* payment webhook test if available
* provider webhook test if available
* health endpoint if implemented

Do not call real paid/provider production APIs unless configured for test and approved.

---

## 60. Performance Checklist Update Requirements

`PERFORMANCE_CHECKLIST.md` is the main document for this phase.

Update with:

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

---

## 61. Security Checklist Re-Check

Do not weaken Prompt 13.

Update/verify `SECURITY_RLS_CHECKLIST.md` for:

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

If performance optimization creates security issue, revert or mark `FAIL`.

---

## 62. API Provider Status Updates

Update `API_PROVIDER_STATUS.md` for launch status:

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

Use accurate statuses:

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

Do not mark active without real test.

---

## 63. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

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

Use accurate statuses.

---

## 64. Changelog Update

Update `CHANGELOG.md`.

Include:

* date
* Prompt 14
* summary
* changed files
* new routes/API routes
* migration files if any
* performance changes
* caching changes
* deployment/rollback changes
* provider status changes
* tests/checks run
* docs updated
* known issues
* manual verification pending

---

## 65. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* private page publicly cached
* dashboard/admin static generated
* signed URL cached
* search unbounded query
* search full original images
* detail N+1 query
* dashboard unbounded list
* admin unbounded list
* missing index
* slow query
* fake performance number
* fake build pass
* fake deployment status
* fake monitoring status
* fake rollback readiness
* stale ad cache
* stale sitemap deleted URL
* private URL in sitemap
* build failure
* typecheck failure
* lint failure
* feature flag unsafe
* maintenance mode blocks webhooks
* rollback docs missing

---

## 66. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 14 implementation status
* manual verification pending:

  * `prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`
* performance routes needing verification
* caching checks pending
* private no-store checks pending
* build/lint/typecheck/test pending
* deployment checklist pending
* rollback checks pending
* launch readiness checks pending
* known bugs

Do not mark manual verification PASS from implementation prompt alone.

---

## 67. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

This is a main document for this phase.

Include:

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

---

## 68. Brain Update

Update `brain.md`.

Include:

* Prompt 14 implementation summary
* changed files
* routes/API/performance areas changed
* migration files if any
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
* next prompt:

  * `prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`
* exact resume instruction

---

## 69. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
next.config.ts
middleware.ts
src/app/**/*
src/app/sitemap.ts
src/app/robots.ts
src/app/api/health/route.ts
src/components/**/*
src/components/performance/*
src/lib/cache/*
src/lib/performance/*
src/lib/db/*
src/lib/supabase/*
src/lib/search/*
src/lib/media/*
src/lib/seo/*
src/lib/monitoring/*
src/lib/deployment/*
src/lib/feature-flags/*
src/lib/maintenance/*
src/lib/actions/**/*
src/types/performance.ts
src/types/deployment.ts
supabase/migrations/*_performance_caching_deployment_launch.sql
.env.example
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

## 70. SQL Migration Rule

If DB changes are needed, create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_performance_caching_deployment_launch.sql
```

Migration may include:

* indexes
* materialized/public-safe views if needed
* health/deployment metadata table if needed
* feature flag table if needed
* maintenance mode table if needed
* monitoring event table if needed
* performance metrics table if needed

Migration must include:

* purpose
* phase: Prompt 14
* tables/views/indexes created/changed
* RLS policies created/changed
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

Do not add indexes blindly. Add only useful indexes based on query patterns.

---

## 71. Feature Flag Table Foundation

If feature flags are stored in DB, possible fields:

* key
* enabled
* environment
* description
* changed_by
* changed_at
* rollout_notes
* created_at
* updated_at

Rules:

* admin/Super Admin permission.
* public can read only safe public flags if needed.
* security-sensitive flags server-only.
* changes audited.
* no client can enable risky provider/payment features.

If feature flags are env-only, document.

---

## 72. Maintenance Mode Table Foundation

If maintenance mode stored in DB, possible fields:

* enabled
* scope
* message
* starts_at
* ends_at
* allow_admin_bypass
* changed_by
* changed_at

Rules:

* Super Admin permission.
* public page noindex.
* payment/provider webhooks handled safely.
* admin recovery route available.
* changes audited.
* no fake toggle.

If maintenance mode is env-only, document.

---

## 73. Health Status Table/Foundation

If health status is stored, possible fields:

* service_key
* status
* checked_at
* last_success_at
* last_failure_at
* safe_message
* internal_details_private

Rules:

* public endpoint exposes only safe status.
* detailed health admin-only.
* no secrets.
* no fake green status.
* status setup-required if not tested.

---

## 74. Monitoring Event Foundation

If monitoring events stored, possible fields:

* event_type
* severity
* route
* component
* safe_message
* fingerprint
* occurred_at
* resolved_at
* environment

Rules:

* no secrets.
* no hidden contact.
* no raw private payload.
* admin permission-scoped.
* external vendor setup-required if missing.

---

## 75. Final Pre-Launch Blockers

Prompt 14 must identify blockers but final signoff happens in Prompt 15.

Blocker examples:

* build fails
* typecheck fails
* critical security bug open
* hidden contact leak
* private cache leak
* payment webhook unsafe
* provider secret exposed
* RLS missing
* public admin
* private sitemap URL
* no rollback plan
* no backup plan
* production provider statuses fake
* critical route broken
* mobile public UI broken
* search unusable
* detail pages broken
* admin unusable

Document blockers clearly.

---

## 76. Tests / Checks To Run

Run available:

```txt id="checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

```txt id="optional-checks"
npm run test:e2e
npm run test:performance
npm run test:security
npm run test:rls
npm run analyze
npm run lighthouse
npm audit
pnpm audit
```

If scripts missing, document `NOT_CONFIGURED`.

Do not claim tests passed if not run.

---

## 77. Manual Smoke Checks If App Runs

If app can run, check:

* home page loads
* search page loads with filters
* property detail loads
* project detail loads
* gallery/images optimized
* login/register popup works
* owner dashboard loads
* broker dashboard loads
* builder dashboard loads
* admin login loads
* admin dashboard loads
* notification bell loads
* builder ads page loads or setup-required
* billing page loads or setup-required
* provider status accurate
* private route guest denied
* wrong role denied
* sitemap excludes private
* robots blocks private
* no hidden contact public
* private pages no-store
* build passes

Record results.

Full verification in matching manual prompt.

---

## 78. Launch Readiness Status Values

Use these statuses:

```txt id="launch-readiness-statuses"
NOT_READY
FOUNDATION_READY
PARTIAL
BLOCKED
SETUP_REQUIRED
READY_FOR_FINAL_SIGNOFF
```

Prompt 14 should usually end with:

* `FOUNDATION_READY` if implementation complete and verification pending.
* `PARTIAL` if some setup providers/load tests/monitoring remain.
* `BLOCKED` if critical issues remain.

Only Prompt 15 should issue final production signoff.

---

## 79. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* Lighthouse/Core Web Vitals runtime measurement unavailable
* load test not performed
* monitoring provider setup-required
* error tracking setup-required
* durable cache/purge provider setup-required
* backup restore test setup-required
* CDN purge partial
* feature flags partial
* maintenance mode partial
* staging environment unavailable
* browser/device checks pending
* some provider statuses setup-required but core app safe

### `FAIL`

Use if:

* build fails
* typecheck fails
* lint has blocking errors
* private page publicly cached
* dashboard/admin static/public cached
* private signed URL cached
* search/detail broken
* critical route broken
* private data in sitemap/cache
* hidden contact public
* RLS/security weakened for performance
* deployment rollback docs missing for migration
* DB changes missing migration
* fake performance/deployment/monitoring claimed

### `BLOCKED`

Use if:

* Prompt 13 security verification failed
* critical security bug open
* Supabase/RLS unavailable blocks deployment readiness
* provider/env architecture unresolved
* hosting/deployment target unknown and required
* migration strategy unresolved
* package/build baseline broken
* cannot inspect required files

### `SETUP_REQUIRED`

Use for:

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

Setup-required is acceptable only if no fake launch readiness is claimed and no critical blocker remains.

---

## 80. Final Response Required Format

Return final response in this structure:

```txt id="prompt-14-final-response-format"
Summary:
- what performance/caching/deployment/launch readiness foundation was implemented

Changed files:
- path list

SQL migrations:
- path list or none

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

Caching:
- public cache:
- private no-store:
- cache tags:
- revalidation:
- CDN/media cache:
- sitemap/robots cache:
- stale data handling:

Database/query:
- indexes:
- RLS performance:
- search queries:
- detail queries:
- dashboard/admin queries:
- notification/ad queries:
- unbounded query fixes:

Deployment:
- env validation:
- provider status:
- feature flags:
- maintenance mode:
- staging/prod separation:
- migration safety:
- build gates:

Monitoring/launch:
- health endpoint:
- logging/error boundaries:
- monitoring/error tracking:
- backup/restore:
- incident/rollback:
- launch freeze checklist:
- post-deploy smoke checks:

Security retained:
- private cache:
- hidden contact:
- RLS:
- provider secrets:
- no private sitemap:
- no weakened checks:

Provider/setup-required:
- monitoring:
- analytics/GSC:
- CDN purge:
- backup:
- staging:
- load test:
- Lighthouse:
- cron/jobs:

Docs updated:
- path list

Tests/checks run:
- command: result

Bugs/issues found:
- bug IDs or none

Rollback notes:
- code:
- database:
- cache/CDN:
- feature flags:
- provider/env:
- migrations:
- monitoring:

Launch readiness:
- NOT_READY / FOUNDATION_READY / PARTIAL / BLOCKED / SETUP_REQUIRED / READY_FOR_FINAL_SIGNOFF
- reason:

Manual verification:
- pending prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md

Next step:
- run prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
```

Do not say only “done”.

---

## 81. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
```

Do not start Prompt 15 until Prompt 14 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 82. Common Bugs To Watch For

Create/track bugs for:

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

## 83. Quality Bar

This phase is successful when future phases can rely on:

* public pages are optimized and safely cached
* private pages are not publicly cached
* search/detail/dashboard/admin queries are bounded
* images/media use optimized variants
* bundle bloat is reduced or documented
* DB indexes support major filters
* RLS performance is reviewed without weakening security
* deployment checklist exists
* rollback playbook is current
* feature flags and maintenance mode foundation exist or status documented
* provider/env status is honest
* monitoring/health foundation exists or setup-required
* launch freeze/post-deploy smoke checklist is ready
* no fake performance/deployment/launch claims exist
* manual verification is ready

---

## 84. Final Rule For Prompt 14

Optimize performance honestly.

Cache public pages safely.

Never cache private pages publicly.

Never weaken RLS/security for speed.

Use real build/check results.

Use real provider statuses.

Use real deployment readiness.

Use setup-required where infrastructure is missing.

Do not fake Core Web Vitals.

Do not fake load test.

Do not fake monitoring.

Do not fake rollback.

Do not fake launch readiness.

Do not hide build failures.

Do not cache signed URLs publicly.

Do not put private URLs in sitemap.

Do not skip migrations for DB changes.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
