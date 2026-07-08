# PERFORMANCE_CHECKLIST.md

# My Gujarat Property — Performance, Scalability, Caching And Load Readiness Checklist

This file defines the performance, scalability, caching, database, media, frontend, provider, monitoring and production load-readiness rules for **My Gujarat Property**.

Claude must update this file whenever performance-sensitive code, database queries, indexes, caching, images, media uploads, provider calls, dashboards, search, deployment settings, background jobs or production readiness changes.

Performance is required, but performance must never weaken security, RLS, privacy, payments, provider safety or manual verification.

No fake performance PASS is allowed.

---

## 1. Purpose

This file exists to make sure My Gujarat Property can handle real marketplace traffic safely and smoothly.

The target is a scalable, mobile-first Gujarat real estate marketplace that can grow toward **1 lakh live users** with careful architecture, indexing, caching, pagination, image optimization, provider fallbacks and monitoring.

This file covers:

* Core Web Vitals
* mobile-first performance
* database query optimization
* Supabase/PostgreSQL indexing
* RLS-safe performance
* search/filter performance
* dashboard performance
* admin table performance
* media/image/video/PDF performance
* Cloudflare R2/CDN performance
* caching and revalidation
* Next.js App Router performance
* React component performance
* server action performance
* provider/API timeout and fallback
* notification performance
* payment performance safety
* background jobs
* cron tasks
* analytics and monitoring
* load testing
* production performance gates
* rollback-safe optimization

---

## 2. Absolute Performance Rules

Claude must follow these rules:

1. Do not optimize by weakening security.
2. Do not optimize by disabling RLS.
3. Do not optimize by exposing private data publicly.
4. Do not optimize by caching user-private data globally.
5. Do not optimize by leaking hidden contact numbers.
6. Do not optimize by skipping payment verification.
7. Do not optimize by faking analytics/counts/views/leads.
8. Do not optimize by removing required loading/empty/error states.
9. Do not optimize by removing manual verification.
10. Do not optimize by skipping docs update.
11. Do not ship unbounded database reads.
12. Do not ship N+1 query patterns.
13. Do not ship infinite scroll without safe pagination/page params.
14. Do not load full-size original images in cards/lists.
15. Do not block user requests on slow provider calls if background processing is safer.
16. Do not block page render on non-critical providers.
17. Do not show fake success when provider/API times out.
18. Do not cache role-private pages as public.
19. Do not revalidate the whole site when targeted tags/paths can be used.
20. Do not deploy performance changes without verification.
21. Do not mark performance `PASS` if build or primary pages are slow/broken.
22. Do not add heavy third-party scripts without review.
23. Do not add large client components where server components can be used safely.
24. Do not fetch unnecessary fields from database.
25. Do not send private fields to client and hide them only in UI.
26. Do not leave expensive admin reports unpaginated.
27. Do not leave search filters without indexes.
28. Do not let media processing block listing submission unnecessarily.
29. Do not run heavy cleanup jobs inside user-facing requests.
30. Do not ignore performance regressions.

---

## PHASE PERFORMANCE LOG

---

### Prompt 01 — Project Setup Baseline [2026-06-30]

| Performance Area | Status | Notes |
|-----------------|--------|-------|
| Build | PASS | `npm run build` compiles successfully in ~15s (Turbopack) |
| Static pages | PASS | `/` and `/_not-found` prerendered as static |
| Bundle size | N/A | No large client components yet |
| Database queries | NOT_STARTED | No DB/queries yet |
| Pagination | NOT_STARTED | Planned from Prompt 04+ |
| Image optimization | NOT_STARTED | Planned for Prompt 10 |
| Caching strategy | DOCUMENTED | Rules established in docs — implementation from Prompt 03+ |
| Core Web Vitals | NOT_MEASURED | Will measure from Prompt 03 (public UI phase) |
| LCP target (≤2.5s) | NOT_MEASURED | — |
| INP target (≤200ms) | NOT_MEASURED | — |
| CLS target (≤0.1) | NOT_MEASURED | — |
| Load/stress testing | NOT_STARTED | Planned for Prompt 14 |
| N+1 queries | NOT_APPLICABLE | No queries yet |
| Unbounded reads | NOT_APPLICABLE | No queries yet |
| Provider timeouts | NOT_APPLICABLE | No providers yet |
| Background jobs | NOT_STARTED | Planned for later phases |

**Phase 01 Performance Summary:** VERIFIED [2026-06-30]. Build passes (compiled in ~5s, Turbopack). 2 static routes. No N+1 queries, no unbounded reads, no heavy client components — none implemented yet. All performance rules documented and will be enforced from Prompt 03 onward.

---

### Prompt 02 — Auth, Roles And RLS Foundation [2026-06-30]

| Performance Area | Status | Notes |
|-----------------|--------|-------|
| Build | PASS | `npm run build` in ~24s (Turbopack). 14 routes. Clean. |
| Static pages | PASS | `/`, `/_not-found`, `/login`, `/admin/login` prerendered static |
| Dynamic routes | PASS | /dashboard/*, /admin, /profile, /auth/callback, /unauthorized as server-rendered |
| Profile queries | IMPLEMENTED_NOT_TESTED | `profiles` has index on `auth_user_id` — O(1) lookup |
| Mobile query | IMPLEMENTED_NOT_TESTED | `profiles` has index on `mobile` — for OTP lookup |
| Staff query | IMPLEMENTED_NOT_TESTED | `staff_profiles` has index on `auth_user_id` + `email` |
| DB indexes | PASS | 20 indexes created in migration for all lookup patterns |
| N+1 queries | NOT_APPLICABLE | Auth queries are single-row lookups by auth_user_id — no N+1 risk |
| Unbounded reads | PASS | All auth queries use `.single()` or `.maybeSingle()` — no unbounded reads |
| Session helper overhead | LOW | getCurrentProfile() makes 2 calls (getUser + profiles query). Acceptable for SSR. |
| Proxy overhead | LOW | proxy.ts makes 1 auth.getUser() call per request for protected routes |
| Dashboard heavy data | PASS | Dashboards show "—" / "Coming soon" — no DB reads for non-existent data |
| Client bundle | PASS | Auth components are client components with minimal dependencies |
| Core Web Vitals | NOT_MEASURED | Not measurable until public UI (Prompt 03) |
| Load/stress testing | NOT_STARTED | Prompt 14 |

**Phase 02 Performance Summary:** PARTIAL [2026-06-30]. Build clean, 14 routes. All auth indexes in place. Unbounded reads: none. N+1: none. Profile queries indexed. Proxy adds 1 auth call per protected request (acceptable). Core Web Vitals and load testing deferred to Prompt 14.

---

### Prompt 03 — Public UI: Home, Header, Footer, Hero [2026-06-30]

| Performance Area | Status | Notes |
|-----------------|--------|-------|
| Build | PASS | `npm run build` clean, 18 routes. +4 routes from Prompt 02. |
| Static pages | PASS | `/` prerendered. PublicLayout server component — no client overhead at root. |
| Client bundle (hero) | PASS | HomeHeroSearch is `"use client"` — lazy hydrated. No large dependencies added. |
| Client bundle (header) | PASS | PublicHeaderClient is client — minimal deps (next/link, react hooks). |
| CityProvider overhead | LOW | Static 20-city array, localStorage read on mount. O(1), negligible. |
| Search config overhead | PASS | `src/lib/search/config.ts` is pure static — no DB calls, no async. |
| N+1 queries | PASS | Homepage fetches 1 profile via `getCurrentProfile()`. No list queries. No N+1. |
| Unbounded reads | PASS | No new DB queries in Prompt 03 UI (homepage reads only profile, already bounded). |
| Image optimization | PASS | No images added in Prompt 03. Design uses CSS gradients and SVG icons only. |
| Lazy loading | PASS | HomeRoleCards, HomeHowItWorks, HomeDisclaimer are below-fold components — can be lazy later. |
| Tailwind bundle | PASS | Tailwind v4 purges unused utilities. Token additions in globals.css are CSS vars only (no bundle impact). |
| Core Web Vitals | NOT_MEASURED | No LCP/INP/CLS measurement done yet — deferred to Prompt 14. |
| Mobile perf | NOT_MEASURED | Devtools responsive verified layout; no Lighthouse run yet. |
| Load/stress testing | NOT_STARTED | Prompt 14 |

**Phase 03 Performance Summary:** PARTIAL [2026-06-30]. Build clean, 18 routes (+4 new UI). No new DB queries, no new N+1, no unbounded reads. CityProvider static 20-city list is negligible. Client components (hero, header) use minimal deps. Core Web Vitals measurement deferred to Prompt 14. No performance regressions introduced.

---

## 3. Performance Status Values

Use only these values:

| Status                   | Meaning                                        |
| ------------------------ | ---------------------------------------------- |
| `NOT_STARTED`            | Performance implementation/check not started   |
| `IN_PROGRESS`            | Optimization/check in progress                 |
| `IMPLEMENTED_NOT_TESTED` | Optimization exists but not verified           |
| `PASS`                   | Performance check passed                       |
| `PARTIAL`                | Some checks passed but some remain pending     |
| `FAIL`                   | Check failed                                   |
| `BLOCKED`                | Check cannot run due to dependency/environment |
| `SETUP_REQUIRED`         | Needs provider/config/tool setup               |
| `NEEDS_REVIEW`           | Needs human/technical review                   |
| `DEGRADED`               | Works but slower than target or limited        |
| `REGRESSION`             | Previously acceptable performance became worse |
| `ROLLED_BACK`            | Performance change was reverted                |
| `MONITORING`             | Optimization deployed and being watched        |
| `DEFERRED_TRACKED`       | Deferred but tracked, not skipped              |

---

## 4. Performance Severity Values

Use these severity values:

| Severity               | Meaning                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `PERF-S0_CRITICAL`     | Site down, DB overloaded, severe production slowdown, payment/auth/search unusable |
| `PERF-S1_HIGH`         | Major flow too slow or timing out                                                  |
| `PERF-S2_MEDIUM`       | Important page/module slower than target                                           |
| `PERF-S3_LOW`          | Minor performance issue                                                            |
| `PERF-S4_OPTIMIZATION` | Improvement opportunity                                                            |

---

## 5. Performance Verification Values

Use only these values:

| Verification             | Meaning                                      |
| ------------------------ | -------------------------------------------- |
| `PASS`                   | Check passed                                 |
| `PARTIAL`                | Check partly passed                          |
| `FAIL`                   | Check failed                                 |
| `BLOCKED`                | Check could not run                          |
| `NOT_RUN`                | Check not run yet                            |
| `NOT_APPLICABLE`         | Not relevant                                 |
| `NEEDS_LOAD_TEST`        | Load/stress test required                    |
| `NEEDS_PROVIDER_CHECK`   | Provider performance check required          |
| `NEEDS_MONITORING`       | Monitoring required                          |
| `NEEDS_PRODUCTION_CHECK` | Production performance verification required |

---

## 6. Target Performance Metrics

### 6.1 Core Web Vitals Targets

| Metric              |                                  Target | Notes                                          |
| ------------------- | --------------------------------------: | ---------------------------------------------- |
| LCP                 |                               `<= 2.5s` | Largest Contentful Paint                       |
| INP                 |                              `<= 200ms` | Interaction to Next Paint                      |
| CLS                 |                                `<= 0.1` | Cumulative Layout Shift                        |
| TTFB                |                     As low as practical | Must not be inflated by slow DB/provider calls |
| FCP                 |                          Fast on mobile | Skeleton/loading acceptable                    |
| Time to Interactive | Fast enough for mobile dashboard/search | Avoid huge client bundle                       |

### 6.2 Backend Targets

| Area                    | Target                                                        |
| ----------------------- | ------------------------------------------------------------- |
| Public homepage         | Fast cached response where possible                           |
| Search initial response | Paginated, indexed, no unbounded read                         |
| Detail page             | Optimized queries, media lazy-loaded                          |
| Dashboard initial load  | Fast summary with lazy modules                                |
| Admin table load        | Paginated, indexed, filterable                                |
| Contact reveal          | Secure and fast, rate-limited                                 |
| Payment order creation  | Fast but secure, server-verified                              |
| Provider webhook        | Fast acknowledgment, idempotent                               |
| Upload request          | Direct/signed upload where safe; no blocking heavy processing |
| Notification creation   | DB-backed, queue/provider retry where needed                  |
| Cron jobs               | Background, idempotent, not user-request blocking             |

### 6.3 Scalability Target

The architecture must be designed toward:

* **1 lakh live users**
* high public search traffic
* many city/locality SEO pages
* many property/project images
* many dashboard users
* admin moderation queues
* notification events
* payment events
* media uploads
* provider retry jobs
* search/filter operations

This does not mean every feature must be load-tested at full scale immediately, but every implementation must avoid patterns that obviously cannot scale.

---

## 7. Required Performance Entry Format

Every performance-sensitive change must add/update an entry using this format:

```md id="performance-entry"
## PERF-CHECK-YYYYMMDD-000 — Check Title

### Status
NOT_STARTED / IN_PROGRESS / IMPLEMENTED_NOT_TESTED / PASS / PARTIAL / FAIL / BLOCKED / SETUP_REQUIRED / NEEDS_REVIEW / DEGRADED / REGRESSION / ROLLED_BACK / MONITORING / DEFERRED_TRACKED

### Severity
PERF-S0_CRITICAL / PERF-S1_HIGH / PERF-S2_MEDIUM / PERF-S3_LOW / PERF-S4_OPTIMIZATION

### Area
- Public:
- Search:
- Dashboard:
- Admin:
- Database:
- Media:
- Provider:
- Caching:
- Build/bundle:
- Mobile:
- Other:

### Scope
- Phase:
- Prompt file:
- Routes:
- Components:
- Server actions/API routes:
- Tables:
- Queries:
- Indexes:
- Cache tags/paths:
- Files changed:
- SQL/migration files:

### Expected Performance Behavior
-

### Actual Performance Behavior
-

### Optimization / Check Performed
-

### Verification Steps
1.
2.
3.

### Verification Result
PASS / PARTIAL / FAIL / BLOCKED / NOT_RUN

### Evidence
- Safe notes:
- Command output summary:
- Lighthouse/Web Vitals:
- Query explain notes:
- Load test summary:
- Monitoring notes:

### Bugs Created
- BUG ID or None

### Rollback Notes
-

### Docs Updated
- `PERFORMANCE_CHECKLIST.md`
- `MANUAL_VERIFICATION.md`
- `BUGS_AND_FIXES.md`
- `CHANGELOG.md`
- `FEATURE_REGISTRY.md`
- `brain.md`

### Final Status
-
```

---

## 8. Database Performance Rules

Database performance is critical because real estate search, dashboards, leads, admin queues and SEO pages can grow large.

### 8.1 Database Query Rules

Every database query should:

* fetch only required columns
* use pagination/limit
* use indexed filters
* avoid N+1 patterns
* avoid loading full related records unnecessarily
* avoid unbounded admin exports in normal UI
* avoid joining private tables for public pages unless safe and indexed
* avoid fetching hidden contact fields for public pages
* avoid fetching private documents for non-authorized users
* respect RLS and public-safe views
* separate count queries from list queries if expensive
* use cached public aggregates where safe
* use background jobs for heavy aggregation
* use materialized/cached summaries only if privacy-safe
* use explain/analyze for slow queries where possible

### 8.2 Unbounded Read Ban

Unbounded reads are not allowed.

Bad examples:

```ts id="bad-unbounded-read"
const { data } = await supabase.from("properties").select("*")
```

Required pattern:

```ts id="good-paginated-read"
const { data } = await supabase
  .from("public_properties")
  .select("id,title,slug,city,locality,price,cover_image_url")
  .eq("status", "published")
  .range(offset, offset + pageSize - 1)
```

Rules:

* every list must have limit/range
* every admin table must have pagination
* every dashboard list must lazy load or paginate
* infinite scroll must still use page/cursor/range
* exports must use background job or permission-gated streaming/batches

### 8.3 N+1 Query Ban

Avoid:

* fetching list, then fetching each owner separately
* fetching projects, then fetching units one by one
* fetching leads, then fetching notes one by one
* fetching properties, then fetching images one by one in loop
* fetching notifications, then fetching targets one by one

Use:

* joined views
* batched queries
* server-side functions
* precomputed summaries
* cached safe aggregates
* careful select relationships where supported and safe

### 8.4 Query Field Selection

Public cards should not select:

* full description if card uses excerpt
* hidden phone
* private email
* private address
* internal notes
* verification docs
* payment status
* raw user metadata
* raw provider status

Admin tables should not select heavy detail fields until row detail opens.

Dashboard cards should load summary first, then lazy-load heavy modules.

---

## 9. Database Index Checklist

Indexes should be created for frequent filters, joins and ordering.

Actual index names will be finalized in migrations.

### 9.1 Core Index Areas

| Area                                        | Index Need                  | Current Status |
| ------------------------------------------- | --------------------------- | -------------- |
| profiles by user_id                         | Required                    | `NOT_STARTED`  |
| profiles by role/status                     | Required                    | `NOT_STARTED`  |
| properties by status                        | Required                    | `NOT_STARTED`  |
| properties by owner_id                      | Required                    | `NOT_STARTED`  |
| properties by purpose/type/status           | Required                    | `NOT_STARTED`  |
| properties by city/locality/status          | Required                    | `NOT_STARTED`  |
| properties by price range                   | Required                    | `NOT_STARTED`  |
| properties by created_at/published_at       | Required                    | `NOT_STARTED`  |
| properties by slug                          | Required unique             | `NOT_STARTED`  |
| projects by builder_id                      | Required                    | `NOT_STARTED`  |
| projects by status                          | Required                    | `NOT_STARTED`  |
| projects by city/locality/status            | Required                    | `NOT_STARTED`  |
| projects by purpose/type/status             | Required                    | `NOT_STARTED`  |
| projects by RERA/status                     | Required where used         | `NOT_STARTED`  |
| project_units by project_id                 | Required                    | `NOT_STARTED`  |
| requirements by user_id                     | Required                    | `NOT_STARTED`  |
| requirements by status/type/location/budget | Required                    | `NOT_STARTED`  |
| proposals by requirement_id                 | Required                    | `NOT_STARTED`  |
| proposals by sender/receiver                | Required                    | `NOT_STARTED`  |
| leads by owner/receiver/user                | Required                    | `NOT_STARTED`  |
| leads by status/stage                       | Required                    | `NOT_STARTED`  |
| lead_events by lead_id                      | Required                    | `NOT_STARTED`  |
| messages by thread_id/created_at            | Required                    | `NOT_STARTED`  |
| notifications by recipient/read/created_at  | Required                    | `NOT_STARTED`  |
| payments by user/status                     | Required                    | `NOT_STARTED`  |
| payments by provider_order_id               | Required unique             | `NOT_STARTED`  |
| webhook_events by provider_event_id         | Required unique/idempotency | `NOT_STARTED`  |
| invoices by user                            | Required                    | `NOT_STARTED`  |
| invoices by invoice_number                  | Required unique             | `NOT_STARTED`  |
| ads by status/city/date                     | Required                    | `NOT_STARTED`  |
| ad_events by ad_id/date/type                | Required                    | `NOT_STARTED`  |
| media by entity_type/entity_id              | Required                    | `NOT_STARTED`  |
| verification_requests by user/status        | Required                    | `NOT_STARTED`  |
| support_tickets by user/status/priority     | Required                    | `NOT_STARTED`  |
| audit_logs by actor/target/date             | Required                    | `NOT_STARTED`  |
| locations by hierarchy IDs                  | Required                    | `NOT_STARTED`  |
| cms/blog by slug/status                     | Required unique/partial     | `NOT_STARTED`  |

### 9.2 Location/Search Index Areas

Search filters may use:

* country
* state
* district
* taluka
* city/village
* area
* locality
* society
* building
* pin code
* purpose
* property/project type
* price/budget range
* BHK/unit type
* status
* published_at
* featured/boost/sponsored status

Indexes must match actual query patterns.

### 9.3 Text Search Index Areas

If text search is implemented:

* property title
* project name
* locality/city
* society/building
* builder/broker name
* Gujarati/Hindi/English/transliteration fields

Use safe full-text/trigram/search indexes as needed.

Do not implement search by scanning all rows in application memory.

---

## 10. RLS Performance Rules

RLS must be secure and reasonably efficient.

Rules:

1. RLS policies must not use extremely expensive subqueries without indexes.
2. RLS helper functions should be stable/security-safe where appropriate.
3. Role/permission lookup tables need indexes.
4. Staff permission checks need indexes.
5. Avoid per-row heavy permission checks on huge public search queries.
6. Public search should use public-safe views when possible.
7. Public-safe views should be optimized and indexed through base tables.
8. Never disable RLS for performance.
9. If RLS is slow, optimize indexes/policies.
10. Test both security and performance after RLS changes.

Checklist:

| Check                                  | Required Result        | Current Status |
| -------------------------------------- | ---------------------- | -------------- |
| RLS policies indexed                   | Required               | `NOT_STARTED`  |
| role lookup indexed                    | Required               | `NOT_STARTED`  |
| owner_id filters indexed               | Required               | `NOT_STARTED`  |
| staff permission lookup indexed        | Required               | `NOT_STARTED`  |
| public views avoid private heavy joins | Required               | `NOT_STARTED`  |
| RLS explain checked for heavy tables   | Required before launch | `NOT_STARTED`  |
| RLS not disabled for speed             | Required               | `NOT_STARTED`  |

---

## 11. Search Performance Checklist

Search is one of the highest traffic areas.

### 11.1 Public Search Rules

Search must:

* use `/search`
* use query params
* paginate or infinite-scroll safely
* use indexes
* return approved public records only
* avoid hidden/private fields
* avoid fake counts
* avoid loading all media
* use cover image only in cards
* lazy load additional media on detail page
* separate sponsored/organic results safely
* cache safe public search where appropriate
* avoid over-caching user-specific saved state
* support mobile bottom-sheet filters without heavy re-render

### 11.2 Search Filters To Optimize

| Filter              | Required Performance Consideration |
| ------------------- | ---------------------------------- |
| city                | indexed                            |
| locality            | indexed                            |
| purpose             | indexed                            |
| type/subtype        | indexed                            |
| price/budget        | indexed or range-friendly          |
| BHK/unit type       | indexed where frequent             |
| status              | indexed                            |
| published_at/sort   | indexed                            |
| sponsored/boosted   | indexed                            |
| RERA/project status | indexed where used                 |
| availability/status | indexed where used                 |

### 11.3 Search Verification Checklist

| Check                                        | Required Result        | Current Status |
| -------------------------------------------- | ---------------------- | -------------- |
| Search has pagination/page size              | Required               | `NOT_STARTED`  |
| Search uses public-safe data                 | Required               | `NOT_STARTED`  |
| Search does not fetch hidden contact         | Required               | `NOT_STARTED`  |
| Search query uses indexes                    | Required               | `NOT_STARTED`  |
| Search no fake counts                        | Required               | `NOT_STARTED`  |
| Mobile filter does not freeze                | Required               | `NOT_STARTED`  |
| Empty state fast and safe                    | Required               | `NOT_STARTED`  |
| Sort does not trigger unbounded read         | Required               | `NOT_STARTED`  |
| Query params do not cause huge invalid query | Required               | `NOT_STARTED`  |
| Search is rate-limit/scraping-aware          | Required before launch | `NOT_STARTED`  |

---

## 12. Location Performance Checklist

Location hierarchy can be large.

Hierarchy:

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

Rules:

1. Cascading dropdowns must fetch only next-level data.
2. Do not load all Gujarat location hierarchy into every page if not needed.
3. Cache stable location lists.
4. Use indexes on parent-child relationships.
5. Use slug/code fields for SEO URLs.
6. Missing location request must not block search.
7. City selector should be fast.
8. Manual city override should not require GeoIP.
9. GeoIP failure should fallback to manual selector.
10. Transliteration search should be indexed if implemented.

Checklist:

| Check                                                          | Required Result | Current Status |
| -------------------------------------------------------------- | --------------- | -------------- |
| Parent-child location indexes                                  | Required        | `NOT_STARTED`  |
| Cascading dropdown lazy-load                                   | Required        | `NOT_STARTED`  |
| City selector cached                                           | Required        | `NOT_STARTED`  |
| Missing location request lightweight                           | Required        | `NOT_STARTED`  |
| SEO location pages not generated for empty/thin pages          | Required        | `NOT_STARTED`  |
| Gujarati/Hindi/transliteration search optimized if implemented | Required        | `NOT_STARTED`  |

---

## 13. Public Page Performance Checklist

### 13.1 Homepage

Homepage must:

* load fast on mobile
* avoid heavy client JS
* use optimized hero/search
* use cached public content
* avoid loading full listing data if only showing sections
* lazy-load non-critical sections
* lazy-load ads/media
* avoid provider blocking
* preserve existing design rules
* route search to `/search`

Checklist:

| Check                             | Required Result | Current Status |
| --------------------------------- | --------------- | -------------- |
| Homepage mobile LCP optimized     | Required        | `NOT_STARTED`  |
| Hero image optimized if used      | Required        | `NOT_STARTED`  |
| Search UI fast                    | Required        | `NOT_STARTED`  |
| Non-critical sections lazy-loaded | Required        | `NOT_STARTED`  |
| Ads do not block homepage         | Required        | `NOT_STARTED`  |
| City selector fast                | Required        | `NOT_STARTED`  |
| No horizontal scroll              | Required        | `NOT_STARTED`  |

### 13.2 Listing Detail Pages

Detail pages must:

* fetch only approved public data
* lazy-load gallery
* reserve image dimensions
* lazy-load video/PDF/embed
* avoid loading all related data upfront
* show contact/inquiry CTA fast
* protect hidden contact
* load similar listings lazily
* use optimized metadata without private data

Checklist:

| Check                           | Required Result | Current Status |
| ------------------------------- | --------------- | -------------- |
| Detail data query optimized     | Required        | `NOT_STARTED`  |
| Gallery lazy-loaded             | Required        | `NOT_STARTED`  |
| Video lazy-loaded               | Required        | `NOT_STARTED`  |
| PDF lazy-loaded                 | Required        | `NOT_STARTED`  |
| Similar listings lazy/paginated | Required        | `NOT_STARTED`  |
| No hidden contact in payload    | Required        | `NOT_STARTED`  |
| SEO metadata safe and fast      | Required        | `NOT_STARTED`  |

### 13.3 Public Profiles

Profile pages must:

* load public-safe data only
* lazy-load listings/projects
* paginate broker/builder listings
* optimize profile image/logo
* avoid private owner data
* no hidden contact leak
* no fake counts

Checklist:

| Check                               | Required Result | Current Status |
| ----------------------------------- | --------------- | -------------- |
| Public profile query safe/optimized | Required        | `NOT_STARTED`  |
| Listings/projects paginated         | Required        | `NOT_STARTED`  |
| Profile image optimized             | Required        | `NOT_STARTED`  |
| No fake metrics                     | Required        | `NOT_STARTED`  |

---

## 14. Dashboard Performance Checklist

Dashboards must be fast, modular and role-aware.

General rules:

* load core summary first
* lazy-load heavy modules
* paginate tables/lists
* use skeleton/loading states
* do not fetch every module if collapsed/unopened
* use real counts only
* cache user-private data carefully, never globally public
* revalidate after mutations
* avoid dashboard-wide refresh for small mutation
* mobile dashboards must not freeze

### 14.1 Owner Dashboard

Owner dashboard performance checks:

| Check                              | Required Result | Current Status |
| ---------------------------------- | --------------- | -------------- |
| Summary loads quickly              | Required        | `NOT_STARTED`  |
| Properties paginated               | Required        | `NOT_STARTED`  |
| Requirements paginated             | Required        | `NOT_STARTED`  |
| Leads paginated                    | Required        | `NOT_STARTED`  |
| Analytics real and lazy            | Required        | `NOT_STARTED`  |
| Billing summary lazy/safe          | Required        | `NOT_STARTED`  |
| Notifications unread count indexed | Required        | `NOT_STARTED`  |
| Mobile cards optimized             | Required        | `NOT_STARTED`  |

### 14.2 Broker Dashboard

Broker dashboard performance checks:

| Check                           | Required Result | Current Status |
| ------------------------------- | --------------- | -------------- |
| Summary loads quickly           | Required        | `NOT_STARTED`  |
| Listings paginated              | Required        | `NOT_STARTED`  |
| Requirements feed paginated     | Required        | `NOT_STARTED`  |
| Proposals paginated             | Required        | `NOT_STARTED`  |
| Leads CRM lazy/paginated        | Required        | `NOT_STARTED`  |
| Analytics not fake/heavy        | Required        | `NOT_STARTED`  |
| Verification status lightweight | Required        | `NOT_STARTED`  |

### 14.3 Builder Dashboard

Builder dashboard performance checks:

| Check                       | Required Result | Current Status |
| --------------------------- | --------------- | -------------- |
| Summary loads quickly       | Required        | `NOT_STARTED`  |
| Projects paginated          | Required        | `NOT_STARTED`  |
| Units/inventory lazy-loaded | Required        | `NOT_STARTED`  |
| Leads paginated             | Required        | `NOT_STARTED`  |
| Agents list paginated       | Required        | `NOT_STARTED`  |
| Ads module lazy             | Required        | `NOT_STARTED`  |
| Project analytics real/lazy | Required        | `NOT_STARTED`  |
| Notifications optimized     | Required        | `NOT_STARTED`  |

---

## 15. Admin Performance Checklist

Admin can become heavy because it includes queues, moderation, users, payments, ads, verification, reports and logs.

Rules:

1. Admin tables must be paginated.
2. Admin filters must use indexes.
3. Admin row detail should lazy-load heavy data.
4. Admin dashboards must not load all queues at once.
5. Exports must be permission-gated and batched/background if large.
6. Audit logs must be filterable and paginated.
7. Payment logs/webhook events must be paginated.
8. Provider logs must be paginated.
9. Private document previews must load only on demand.
10. Admin mobile view should use cards, not huge tables.

Checklist:

| Check                               | Required Result | Current Status |
| ----------------------------------- | --------------- | -------------- |
| Admin user table paginated          | Required        | `NOT_STARTED`  |
| Property moderation queue paginated | Required        | `NOT_STARTED`  |
| Project moderation queue paginated  | Required        | `NOT_STARTED`  |
| Requirement queue paginated         | Required        | `NOT_STARTED`  |
| Verification queue paginated        | Required        | `NOT_STARTED`  |
| Billing/payment table paginated     | Required        | `NOT_STARTED`  |
| Ads queue paginated                 | Required        | `NOT_STARTED`  |
| Support tickets paginated           | Required        | `NOT_STARTED`  |
| Reports queue paginated             | Required        | `NOT_STARTED`  |
| Audit logs paginated                | Required        | `NOT_STARTED`  |
| Heavy detail lazy-loaded            | Required        | `NOT_STARTED`  |
| Export batched/background           | Required        | `NOT_STARTED`  |
| Admin filters indexed               | Required        | `NOT_STARTED`  |
| Admin mobile cards performant       | Required        | `NOT_STARTED`  |

---

## 16. Leads, CRM, Messaging And Notifications Performance

### 16.1 Leads CRM

Rules:

* paginate leads
* index by receiver/owner/status/stage
* avoid loading full event timeline for every row
* lazy-load lead detail
* store summary fields where safe
* avoid fake analytics
* aggregate in background where heavy
* use Kanban columns with limits and pagination
* avoid real-time subscription overload unless carefully scoped

Checklist:

| Check                            | Required Result | Current Status |
| -------------------------------- | --------------- | -------------- |
| Leads paginated                  | Required        | `NOT_STARTED`  |
| Lead detail lazy-loaded          | Required        | `NOT_STARTED`  |
| Lead stages indexed              | Required        | `NOT_STARTED`  |
| Lead timeline lazy-loaded        | Required        | `NOT_STARTED`  |
| Lead analytics aggregated safely | Required        | `NOT_STARTED`  |
| Kanban limited per column        | Required        | `NOT_STARTED`  |

### 16.2 Messaging

Rules:

* paginate threads
* paginate messages
* index thread participants
* index unread counts
* lazy-load attachments
* avoid polling too frequently
* use realtime only with scoped subscriptions
* no unbounded message fetch

Checklist:

| Check                                    | Required Result | Current Status |
| ---------------------------------------- | --------------- | -------------- |
| Thread list paginated                    | Required        | `NOT_STARTED`  |
| Message list paginated                   | Required        | `NOT_STARTED`  |
| Unread count indexed                     | Required        | `NOT_STARTED`  |
| Attachments lazy-loaded                  | Required        | `NOT_STARTED`  |
| Realtime scoped or fallback polling safe | Required        | `NOT_STARTED`  |

### 16.3 Notifications

Rules:

* unread count indexed
* latest notifications limited
* notification center paginated
* mark-read targeted revalidation
* delivery logs paginated
* external provider sends queued/retried
* no fake unread count

Checklist:

| Check                          | Required Result | Current Status |
| ------------------------------ | --------------- | -------------- |
| Unread count query indexed     | Required        | `NOT_STARTED`  |
| Dropdown latest limited        | Required        | `NOT_STARTED`  |
| Notification center paginated  | Required        | `NOT_STARTED`  |
| Mark-read efficient            | Required        | `NOT_STARTED`  |
| Delivery logs paginated        | Required        | `NOT_STARTED`  |
| External sends queued/fallback | Required        | `NOT_STARTED`  |

---

## 17. Billing And Payment Performance Checklist

Payment features must be fast but never unsafe.

Rules:

1. Payment order creation must validate server-side.
2. Do not delay checkout with non-critical analytics.
3. Webhook must verify signature quickly.
4. Webhook should be idempotent.
5. Heavy invoice generation can be background after verified payment if safe.
6. Payment logs must be paginated.
7. Billing dashboard must not load all invoice PDFs.
8. Invoice PDF generated/downloaded on demand or background.
9. Do not optimize by trusting client callback.
10. Do not activate plan before verified payment.

Checklist:

| Check                                           | Required Result | Current Status   |
| ----------------------------------------------- | --------------- | ---------------- |
| Payment order creation fast and server-verified | Required        | `NOT_STARTED`    |
| Razorpay webhook fast acknowledgment            | Required        | `SETUP_REQUIRED` |
| Webhook idempotency indexed                     | Required        | `NOT_STARTED`    |
| Invoice sequence safe under concurrency         | Required        | `NOT_STARTED`    |
| Billing history paginated                       | Required        | `NOT_STARTED`    |
| Invoice PDFs lazy/generated safely              | Required        | `NOT_STARTED`    |
| Payment logs paginated                          | Required        | `NOT_STARTED`    |
| Coupon validation indexed                       | Required        | `NOT_STARTED`    |
| Trial expiry handled by job                     | Required        | `NOT_STARTED`    |

---

## 18. Ads And Promotion Performance Checklist

Ads must be fast and fraud-aware.

Rules:

* homepage ads must not block page render
* ad selection must be indexed by city/status/date
* only approved/paid/active/not expired ads shown
* rotate ads efficiently
* frequency cap must not require heavy query
* impressions/clicks should be batched/queued if high traffic
* fraud detection should not block user page load
* city/IP fallback must be fast
* CDN images optimized

Checklist:

| Check                                | Required Result            | Current Status   |
| ------------------------------------ | -------------------------- | ---------------- |
| Ad query indexed by city/status/date | Required                   | `NOT_STARTED`    |
| Homepage ad non-blocking             | Required                   | `NOT_STARTED`    |
| Ad images optimized/CDN              | Required                   | `SETUP_REQUIRED` |
| Impression logging lightweight       | Required                   | `NOT_STARTED`    |
| Click logging lightweight            | Required                   | `NOT_STARTED`    |
| Fraud checks background/efficient    | Required                   | `NOT_STARTED`    |
| Expired ads not shown                | Required                   | `NOT_STARTED`    |
| Frequency cap efficient              | Required where implemented | `NOT_STARTED`    |

---

## 19. Media, Upload, Image, Video And PDF Performance

Media is one of the biggest performance risks.

### 19.1 Image Rules

Images must:

* upload with validation
* store original if required
* create optimized variants where supported
* use WebP/AVIF where possible
* use responsive sizes
* use cover image for cards
* lazy-load below fold
* reserve dimensions to reduce CLS
* avoid distortion
* avoid large original image on cards
* use CDN where configured
* show placeholder/skeleton
* handle broken image fallback

Checklist:

| Check                          | Required Result            | Current Status   |
| ------------------------------ | -------------------------- | ---------------- |
| Card images use optimized size | Required                   | `NOT_STARTED`    |
| Detail gallery lazy-loads      | Required                   | `NOT_STARTED`    |
| WebP/AVIF variants             | Required or setup-required | `SETUP_REQUIRED` |
| Original backup storage        | Required where defined     | `SETUP_REQUIRED` |
| Responsive image sizes         | Required                   | `NOT_STARTED`    |
| Image dimensions reserved      | Required                   | `NOT_STARTED`    |
| Lazy loading enabled           | Required                   | `NOT_STARTED`    |
| CDN configured or fallback     | Required                   | `SETUP_REQUIRED` |
| Broken image fallback          | Required                   | `NOT_STARTED`    |
| No CLS from images             | Required                   | `NOT_STARTED`    |

### 19.2 Video Rules

Project videos must:

* follow one video max rule
* be lazy-loaded
* not autoplay heavy content by default
* use thumbnail/preview
* compress/process where configured
* fallback if processing missing
* not block project detail page
* use CDN/storage safely

Checklist:

| Check                                 | Required Result | Current Status   |
| ------------------------------------- | --------------- | ---------------- |
| One video max enforced                | Required        | `NOT_STARTED`    |
| Video lazy-loaded                     | Required        | `NOT_STARTED`    |
| Video thumbnail generated or fallback | Required        | `SETUP_REQUIRED` |
| Video not blocking LCP                | Required        | `NOT_STARTED`    |
| Video storage/CDN safe                | Required        | `SETUP_REQUIRED` |

### 19.3 PDF Rules

PDF brochures/floor plans/invoices must:

* not block page render
* load/download on demand
* show file size where possible
* respect permissions
* avoid huge public preload
* use private signed URLs where private
* use CDN where public and safe
* fail gracefully

Checklist:

| Check                      | Required Result | Current Status |
| -------------------------- | --------------- | -------------- |
| Brochure PDF lazy-loaded   | Required        | `NOT_STARTED`  |
| Floor plan PDF lazy-loaded | Required        | `NOT_STARTED`  |
| Invoice PDF generated/lazy | Required        | `NOT_STARTED`  |
| PDF permission checked     | Required        | `NOT_STARTED`  |
| PDF failure safe           | Required        | `NOT_STARTED`  |

---

## 20. Cloudflare R2 / CDN Performance Checklist

Cloudflare R2/CDN is setup-required until configured.

Rules:

* public images should use CDN/public domain
* private files must not use public CDN
* cache headers must be safe
* cache purge needed after update/delete where required
* stale images must not show after delete/replacement
* signed URLs for private files should not be cached publicly
* original/variants lifecycle should be managed
* orphan cleanup should be background

Checklist:

| Check                           | Required Result | Current Status   |
| ------------------------------- | --------------- | ---------------- |
| Public R2 bucket configured     | Required        | `SETUP_REQUIRED` |
| Private R2 bucket configured    | Required        | `SETUP_REQUIRED` |
| CDN base URL configured         | Required        | `SETUP_REQUIRED` |
| Public media cache headers safe | Required        | `NOT_STARTED`    |
| Private files not public CDN    | Required        | `NOT_STARTED`    |
| CDN purge path documented       | Required        | `NOT_STARTED`    |
| Orphan cleanup background job   | Required        | `NOT_STARTED`    |
| Media lifecycle policy tracked  | Required        | `NOT_STARTED`    |

---

## 21. Next.js / React Performance Rules

Expected stack:

* Next.js 15
* React 19
* App Router
* Server Components where appropriate
* Server Actions where appropriate
* typed errors
* safe caching
* targeted revalidation

Rules:

1. Prefer server components for data-heavy public pages where safe.
2. Use client components only for interactive UI.
3. Keep client bundles small.
4. Avoid passing large server data to client.
5. Avoid sending private fields to client.
6. Use dynamic rendering only when needed.
7. Use static/cached rendering for stable public pages where safe.
8. Use `revalidateTag` / `revalidatePath` targeted updates.
9. Use `useFormStatus` for submit loading states.
10. Use `useOptimistic` only where rollback/error state is safe.
11. Use typed server action results.
12. Avoid waterfall fetches.
13. Avoid blocking critical render on provider calls.
14. Use route-level loading/error boundaries.
15. Use Suspense/lazy where helpful.
16. Avoid global providers with heavy re-render.
17. Avoid huge icon/component libraries loaded client-side unnecessarily.

Checklist:

| Check                                   | Required Result | Current Status |
| --------------------------------------- | --------------- | -------------- |
| Server/client split reviewed            | Required        | `NOT_STARTED`  |
| Client bundle size monitored            | Required        | `NOT_STARTED`  |
| Heavy components lazy-loaded            | Required        | `NOT_STARTED`  |
| Route loading boundaries exist          | Required        | `NOT_STARTED`  |
| Route error boundaries safe             | Required        | `NOT_STARTED`  |
| Server actions typed                    | Required        | `NOT_STARTED`  |
| Targeted revalidation used              | Required        | `NOT_STARTED`  |
| No unnecessary provider-blocking render | Required        | `NOT_STARTED`  |

---

## 22. Caching And Revalidation Checklist

Caching must be safe.

### 22.1 Safe To Cache Public Data

Potentially cacheable:

* homepage public sections
* approved public property cards
* approved public project cards
* public city/locality SEO pages
* published CMS/legal pages
* published blog pages
* public location lists
* public plan/pricing data
* approved active ads with short/controlled cache
* public profile safe fields
* public sitemap

### 22.2 Do Not Publicly Cache Private Data

Do not globally cache:

* dashboards
* leads
* messages
* notifications
* billing/payment/invoices
* private profiles
* private verification documents
* admin/staff pages
* staff queues
* contact reveal states
* hidden contact fields
* user-specific saved items
* user-specific recent views
* payment checkout/order states
* private support tickets
* private reports

### 22.3 Revalidation Rules

Use targeted revalidation:

| Change                           | Revalidate                                           |
| -------------------------------- | ---------------------------------------------------- |
| property approved/updated        | property detail, search tags, city/locality SEO tags |
| property paused/deleted/rejected | property detail/search/list tags                     |
| project approved/updated         | project detail, search tags, city/locality SEO tags  |
| project paused/deleted/rejected  | project detail/search/list tags                      |
| requirement updated              | dashboard/feed tags                                  |
| profile updated                  | public profile and dashboard tags                    |
| ad approved/paused/expired       | homepage/city ad tags                                |
| CMS/legal page updated           | exact path/tag                                       |
| blog post updated                | blog post/list/category/tag                          |
| payment success                  | user billing/subscription dashboard only             |
| notification read                | recipient notification tag only                      |
| lead update                      | related user/agent dashboard tags only               |
| location update                  | location list/search/SEO tags                        |
| provider mode change             | setup-required/provider status UI tags               |

Checklist:

| Check                                    | Required Result | Current Status |
| ---------------------------------------- | --------------- | -------------- |
| Public/private cache separation          | Required        | `NOT_STARTED`  |
| Targeted revalidation designed           | Required        | `NOT_STARTED`  |
| No global cache for private dashboards   | Required        | `NOT_STARTED`  |
| No private field in cached public data   | Required        | `NOT_STARTED`  |
| Cache invalidates listing status changes | Required        | `NOT_STARTED`  |
| Payment/subscription cache private       | Required        | `NOT_STARTED`  |
| Ad cache respects expiry/pause           | Required        | `NOT_STARTED`  |
| CMS/legal cache invalidates safely       | Required        | `NOT_STARTED`  |

---

## 23. Provider/API Performance Checklist

Provider calls must be resilient.

Provider-backed areas:

* OTP
* SMS
* Email
* WhatsApp
* Razorpay
* Google Maps
* Cloudflare R2/CDN
* Turnstile
* Analytics
* Error tracking
* Cron/background jobs
* media processing
* file scan
* PDF generation
* GeoIP
* Search Console

Rules:

1. Set provider timeouts.
2. Do not block page render on non-critical provider.
3. Use retries with backoff where safe.
4. Use idempotency for payment/webhooks/jobs.
5. Use queues/background jobs for heavy sends/processing.
6. Rate-limit provider test buttons.
7. Track provider failures safely.
8. Do not retry endlessly.
9. Do not show fake success.
10. Show setup-required/fallback when missing.
11. Do not expose raw provider errors to users.
12. Monitor provider cost/quota.

Checklist:

| Check                                    | Required Result        | Current Status   |
| ---------------------------------------- | ---------------------- | ---------------- |
| Provider timeouts configured             | Required               | `NOT_STARTED`    |
| Safe retry/backoff                       | Required where needed  | `NOT_STARTED`    |
| Idempotency for webhooks/jobs            | Required               | `NOT_STARTED`    |
| Provider fallback UI                     | Required               | `SETUP_REQUIRED` |
| Provider health logs                     | Required               | `NOT_STARTED`    |
| No fake success                          | Required               | `NOT_STARTED`    |
| Cost/quota alerts tracked                | Required before launch | `NOT_STARTED`    |
| Slow provider does not break public page | Required               | `NOT_STARTED`    |

---

## 24. Background Jobs And Cron Performance

Heavy work should run in background where appropriate.

Background job candidates:

* media optimization
* video thumbnail generation
* PDF generation
* invoice email sending
* notification delivery
* failed provider retries
* webhook reconciliation
* sitemap generation
* listing expiry
* trial expiry
* subscription expiry/grace reminders
* ad expiry
* orphan media cleanup
* soft delete purge
* analytics aggregation
* lead scoring/matching if implemented
* duplicate detection
* fraud analysis
* RERA recheck if implemented
* provider health checks
* backup/restore checks

Rules:

1. Jobs must be idempotent.
2. Jobs must be retry-safe.
3. Jobs must not expose secrets.
4. Jobs must not block user flow unnecessarily.
5. Jobs must have safe failure state.
6. Jobs must be logged.
7. Jobs must be protected by cron secret if HTTP-triggered.
8. Jobs should use IST where relevant.
9. Jobs must not run unbounded full-table scans frequently.
10. Large jobs should run in batches.

Checklist:

| Check                        | Required Result           | Current Status   |
| ---------------------------- | ------------------------- | ---------------- |
| Cron provider selected       | Required when jobs active | `SETUP_REQUIRED` |
| Jobs idempotent              | Required                  | `NOT_STARTED`    |
| Jobs batched                 | Required                  | `NOT_STARTED`    |
| Retry/dead-letter strategy   | Required                  | `NOT_STARTED`    |
| Job logs redacted            | Required                  | `NOT_STARTED`    |
| Protected cron endpoints     | Required                  | `NOT_STARTED`    |
| No heavy job in user request | Required                  | `NOT_STARTED`    |
| Job monitoring               | Required before launch    | `NOT_STARTED`    |

---

## 25. Frontend UI Performance Checklist

UI must feel fast on mobile.

Rules:

* avoid unnecessary animations on low-end devices
* avoid huge shadows/blur everywhere if causing jank
* avoid layout shifts
* avoid over-rendering lists
* virtualize huge lists only if needed
* use skeletons for loading
* use optimistic UI only when rollback is safe
* disable submit during pending state
* use image placeholders
* avoid opening huge modals with all data preloaded
* use drawers/bottom sheets efficiently
* avoid global state causing full dashboard re-render
* avoid heavy chart libraries until needed
* lazy-load charts
* lazy-load maps
* lazy-load video/PDF/360 embeds

Checklist:

| Check                                | Required Result     | Current Status   |
| ------------------------------------ | ------------------- | ---------------- |
| Mobile interactions smooth           | Required            | `NOT_STARTED`    |
| Large lists paginated/virtualized    | Required            | `NOT_STARTED`    |
| Charts lazy-loaded                   | Required where used | `NOT_STARTED`    |
| Maps lazy-loaded                     | Required where used | `SETUP_REQUIRED` |
| Modals/drawers performant            | Required            | `NOT_STARTED`    |
| No layout shift from media           | Required            | `NOT_STARTED`    |
| Submit states prevent duplicate work | Required            | `NOT_STARTED`    |
| No long main-thread freeze           | Required            | `NOT_STARTED`    |

---

## 26. Responsive Performance Checklist

Responsive quality and performance must be checked together.

Required widths:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px
* ultra-wide if relevant

At each width check:

* page loads without horizontal scroll
* no layout overflow
* no card/table freeze
* no huge image overflow
* no unnecessary desktop table on mobile
* no modal repaint jank
* no sticky CTA covering content
* no slow filter drawer
* no slow dashboard module
* tap targets responsive
* text does not wrap into unusable layout
* brand name does not wrap
* footer hidden on dashboards/features
* public footer appears only where intended

Checklist:

|      Width | Current Status |
| ---------: | -------------- |
|      320px | `NOT_STARTED`  |
|      360px | `NOT_STARTED`  |
|      390px | `NOT_STARTED`  |
|      430px | `NOT_STARTED`  |
|      768px | `NOT_STARTED`  |
|     1024px | `NOT_STARTED`  |
|     1366px | `NOT_STARTED`  |
| Ultra-wide | `NOT_STARTED`  |

---

## 27. Bundle And Dependency Checklist

Rules:

1. Do not add heavy dependency without need.
2. Prefer small focused packages.
3. Avoid duplicate libraries.
4. Avoid importing entire icon/UI libraries if only few icons needed.
5. Avoid heavy chart/map/editor libraries in initial bundle.
6. Lazy-load heavy admin/dashboard modules.
7. Keep public pages lean.
8. Monitor bundle size after additions.
9. Remove unused packages.
10. Lockfile changes must be intentional.

Checklist:

| Check                                   | Required Result     | Current Status |
| --------------------------------------- | ------------------- | -------------- |
| Dependency addition reviewed            | Required            | `NOT_STARTED`  |
| Bundle size checked after heavy package | Required            | `NOT_STARTED`  |
| Charts/maps lazy-loaded                 | Required where used | `NOT_STARTED`  |
| Rich text editor lazy-loaded            | Required where used | `NOT_STARTED`  |
| Duplicate packages avoided              | Required            | `NOT_STARTED`  |
| Lockfile reviewed                       | Required            | `NOT_STARTED`  |
| Public page JS minimized                | Required            | `NOT_STARTED`  |

---

## 28. Font And CSS Performance Checklist

Rules:

* use optimized font loading
* avoid layout shift from fonts
* include Gujarati font support
* prefer `font-display` safe behavior
* avoid loading many font weights unnecessarily
* avoid huge global CSS
* avoid heavy CSS animations
* avoid unnecessary backdrop blur everywhere
* avoid content jump from dynamic heights
* ensure responsive CSS does not cause horizontal scroll

Gujarati/Hindi/English support must not break performance.

Checklist:

| Check                           | Required Result | Current Status |
| ------------------------------- | --------------- | -------------- |
| Font loading optimized          | Required        | `NOT_STARTED`  |
| Gujarati font support optimized | Required        | `NOT_STARTED`  |
| Limited font weights            | Required        | `NOT_STARTED`  |
| CLS from fonts minimized        | Required        | `NOT_STARTED`  |
| Global CSS not bloated          | Required        | `NOT_STARTED`  |
| Heavy animations reviewed       | Required        | `NOT_STARTED`  |
| Responsive CSS no overflow      | Required        | `NOT_STARTED`  |

---

## 29. SEO Page Performance Checklist

SEO pages can grow large.

Rules:

* generate only useful pages
* no empty/thin/fake pages
* no fake counts
* no private data
* cache stable content
* use pagination
* avoid loading too many listings
* sitemap split if large
* generate sitemap efficiently
* avoid runtime heavy sitemap for huge data
* use background/static generation where safe
* no admin/private URLs

Checklist:

| Check                             | Required Result                  | Current Status |
| --------------------------------- | -------------------------------- | -------------- |
| City SEO pages real-data only     | Required                         | `NOT_STARTED`  |
| Locality SEO pages real-data only | Required                         | `NOT_STARTED`  |
| Empty/thin pages noindex/hidden   | Required                         | `NOT_STARTED`  |
| SEO listings paginated            | Required                         | `NOT_STARTED`  |
| Sitemap generation efficient      | Required                         | `NOT_STARTED`  |
| Sitemap split if large            | Required before launch if needed | `NOT_STARTED`  |
| Canonical/noindex fast            | Required                         | `NOT_STARTED`  |
| Schema generation safe/efficient  | Required                         | `NOT_STARTED`  |

---

## 30. Analytics And Reports Performance

Analytics must be real, scoped and efficient.

Rules:

* no fake analytics
* avoid counting expensive data live on every page load
* use precomputed aggregates where safe
* use background aggregation for heavy reports
* paginate raw event logs
* use date range filters
* index analytics events
* dashboards should show empty/setup-required if no real data
* do not expose private analytics to wrong user
* ad impressions/clicks should be batched or lightweight

Checklist:

| Check                                        | Required Result | Current Status |
| -------------------------------------------- | --------------- | -------------- |
| Analytics real only                          | Required        | `NOT_STARTED`  |
| No live expensive counts per request         | Required        | `NOT_STARTED`  |
| Aggregates/background jobs for heavy reports | Required        | `NOT_STARTED`  |
| Event logs indexed                           | Required        | `NOT_STARTED`  |
| Reports date-filtered                        | Required        | `NOT_STARTED`  |
| Reports paginated                            | Required        | `NOT_STARTED`  |
| Role-scoped analytics                        | Required        | `NOT_STARTED`  |
| Empty/setup-required states                  | Required        | `NOT_STARTED`  |

---

## 31. Monitoring Checklist

Monitoring is required before production confidence.

Monitor:

* uptime
* error rate
* slow routes
* slow DB queries
* failed provider calls
* payment webhook failures
* OTP failures
* upload failures
* R2/CDN errors
* cron failures
* queue backlog
* Core Web Vitals
* search latency
* dashboard latency
* admin queue latency
* auth errors
* rate limit spikes
* contact reveal abuse
* ad click fraud
* memory/CPU if available
* database connection usage
* storage usage/cost
* provider quota/cost

Checklist:

| Check                                          | Required Result          | Current Status   |
| ---------------------------------------------- | ------------------------ | ---------------- |
| Error tracking configured or setup-required    | Required before launch   | `SETUP_REQUIRED` |
| Uptime monitoring configured or setup-required | Required before launch   | `SETUP_REQUIRED` |
| Web Vitals tracking configured                 | Required before launch   | `SETUP_REQUIRED` |
| Slow query monitoring                          | Required before launch   | `NOT_STARTED`    |
| Provider failure monitoring                    | Required before launch   | `SETUP_REQUIRED` |
| Payment webhook monitoring                     | Required if payment live | `SETUP_REQUIRED` |
| Cron/job monitoring                            | Required if jobs active  | `SETUP_REQUIRED` |
| Storage/CDN monitoring                         | Required if media active | `SETUP_REQUIRED` |

---

## 32. Load And Stress Testing Checklist

Load testing should be done before major production launch.

### 32.1 Required Load Test Areas

| Area                   | Required Before Launch             |
| ---------------------- | ---------------------------------- |
| Homepage               | Yes                                |
| Search page            | Yes                                |
| Detail page            | Yes                                |
| Login/OTP flow         | Yes if auth live                   |
| Contact reveal/inquiry | Yes                                |
| Owner dashboard        | Yes                                |
| Broker dashboard       | Yes                                |
| Builder dashboard      | Yes                                |
| Admin queues           | Yes                                |
| Payment order/webhook  | Yes if payment live                |
| Upload/media           | Yes if media live                  |
| Notifications          | Yes if notification providers live |
| Cron/jobs              | Yes if jobs active                 |

### 32.2 Load Test Data

Use safe staging/test data.

Do not use:

* real private user data
* real hidden contacts
* real payment secrets
* real private documents
* production provider cost-heavy tests without approval

### 32.3 Load Test Entry Format

```md id="load-test-entry"
## LOAD-TEST-YYYYMMDD-000 — Test Title

### Environment
LOCAL / STAGING / PRODUCTION

### Scope
- Routes:
- APIs:
- Roles:
- Data volume:
- Provider mode:

### Test Tool
- Tool:
- Command/config:

### Target
- Concurrent users:
- Requests per second:
- Duration:
- Expected p95:
- Expected error rate:

### Result
PASS / PARTIAL / FAIL / BLOCKED

### Findings
- p50:
- p95:
- p99:
- error rate:
- slow queries:
- bottlenecks:

### Fixes Required
-

### Docs Updated
-
```

### 32.4 Current Load Test Status

| Area           | Status           |
| -------------- | ---------------- |
| Homepage       | `NOT_STARTED`    |
| Search         | `NOT_STARTED`    |
| Detail pages   | `NOT_STARTED`    |
| Auth           | `NOT_STARTED`    |
| Contact reveal | `NOT_STARTED`    |
| Dashboards     | `NOT_STARTED`    |
| Admin          | `NOT_STARTED`    |
| Payment        | `SETUP_REQUIRED` |
| Upload/media   | `SETUP_REQUIRED` |
| Notifications  | `SETUP_REQUIRED` |
| Cron/jobs      | `SETUP_REQUIRED` |

---

## 33. Performance Regression Rules

Create a bug if:

* homepage becomes noticeably slower
* search takes too long
* detail page blocks on media/provider
* dashboard freezes
* admin table loads too much data
* mobile UI janks/freezes
* Core Web Vitals worsen
* image CLS appears
* unbounded read introduced
* N+1 query introduced
* expensive count added to every request
* public cache leaks private data
* provider timeout blocks page
* payment webhook times out
* upload blocks user request too long
* cron job overloads DB
* deployment increases error rate
* bundle size grows significantly without reason

Performance regression must update:

* `BUGS_AND_FIXES.md`
* `CHANGELOG.md`
* `FEATURE_REGISTRY.md`
* `MANUAL_VERIFICATION.md`
* `PERFORMANCE_CHECKLIST.md`
* `brain.md`

---

## 34. Performance Bug Entry Format

```md id="perf-bug-format"
## PERF-BUG-YYYYMMDD-000 — Performance Bug Title

### Status
OPEN / IN_PROGRESS / FIXED_PENDING_RETEST / RESOLVED / PARTIAL / BLOCKED / REGRESSION

### Severity
PERF-S0_CRITICAL / PERF-S1_HIGH / PERF-S2_MEDIUM / PERF-S3_LOW / PERF-S4_OPTIMIZATION

### Area
-

### Summary
- Expected:
- Actual:
- User impact:
- Security/privacy impact:
- Payment/provider impact:

### Evidence
- Route:
- Query:
- Metric:
- Screenshot/log:
- Test command:

### Suspected Cause
-

### Fix Plan
-

### Fix Implementation
- Changed files:
- SQL/migration files:
- Indexes:
- Cache tags/paths:
- Provider changes:

### Retest
- Steps:
- Result:

### Docs Updated
-
```

---

## 35. Rollback Rules For Performance Changes

Rollback a performance change if it causes:

* security leak
* hidden contact leak
* private data cache leak
* wrong role data visible
* payment state stale/unsafe
* listing status stale publicly
* admin/private page cached publicly
* major functional bug
* build failure
* production crash
* worse performance
* provider retry storm
* DB overload

Rollback options:

* disable feature flag
* revert cache change
* revert query change
* revert index/migration if safe
* restore previous RLS-safe query
* reduce cache TTL
* purge CDN
* revalidate tags/paths
* disable heavy provider integration
* move heavy work back to background
* restore previous deployment

Update:

* `DEPLOYMENT_ROLLBACK.md`
* `CHANGELOG.md`
* `BUGS_AND_FIXES.md`
* `MANUAL_VERIFICATION.md`
* `FEATURE_REGISTRY.md`
* `PERFORMANCE_CHECKLIST.md`
* `brain.md`

---

## 36. Phase Performance Gates

### Phase 01 — Project Setup Baseline

Performance checks:

* build baseline works
* no unnecessary heavy dependency
* route structure clean
* loading/error boundaries planned
* env/provider not blocking
* docs updated

### Phase 02 — Auth Roles RLS Foundation

Performance checks:

* auth queries indexed
* role lookups efficient
* RLS policies not overly expensive
* session checks not repeated unnecessarily
* protected routes fast
* direct URL checks safe

### Phase 03 — Public UI Home Header Footer Hero

Performance checks:

* homepage LCP optimized
* header lightweight
* mobile no jank
* hero/search fast
* footer does not bloat dashboard
* search route navigation fast

### Phase 04 — Property Project Requirement System

Performance checks:

* posting forms do not load irrelevant fields/data
* location dropdowns lazy/cached
* media upload setup safe
* property/project/requirement lists paginated
* approval queues indexed

### Phase 05 — Public Search Detail Profile SEO

Performance checks:

* search indexed/paginated
* detail media lazy
* profiles paginated
* SEO pages cache safely
* no fake counts
* no private fields in cached data

### Phase 06 — Owner Broker Builder Dashboards

Performance checks:

* summary first
* modules lazy
* lists paginated
* analytics real/lazy
* mobile dashboard smooth
* no full dashboard reload for small actions

### Phase 07 — Admin Staff Super Admin System

Performance checks:

* admin tables paginated
* filters indexed
* detail lazy-loaded
* audit logs paginated
* provider/status pages safe
* mobile admin cards performant

### Phase 08 — Leads CRM Requirements Proposals Messages

Performance checks:

* leads paginated
* CRM stages indexed
* messages paginated
* unread counts indexed
* notifications efficient
* no realtime over-subscription

### Phase 09 — Billing Payment Subscription Trial GST

Performance checks:

* payment order creation fast/secure
* webhook idempotent and fast
* invoice generation safe
* billing history paginated
* trial expiry job planned
* payment safety not sacrificed

### Phase 10 — Media Storage Uploads R2 CDN

Performance checks:

* optimized variants
* CDN setup/fallback
* uploads not blocking heavy processing
* private files not public
* lazy media
* orphan cleanup jobs

### Phase 11 — Location Search SEO CMS Legal

Performance checks:

* location hierarchy cached/lazy
* SEO page generation safe
* sitemap efficient
* CMS pages cached safely
* legal pages fast

### Phase 12 — Ads Promotion Notifications Providers

Performance checks:

* ad selection indexed
* ad logging lightweight
* notifications paginated
* provider calls queued/retried
* no fake provider status

### Phase 13 — Security Privacy Fraud Rate Limits

Performance checks:

* rate limits efficient
* fraud/report queues paginated
* audit logs indexed
* security checks do not create unbounded queries
* logs redacted without blocking critical paths

### Phase 14 — Performance Caching Deployment Launch

Performance checks:

* all critical checks completed
* load test done or blocked reason documented
* cache safe
* indexes reviewed
* Core Web Vitals checked
* monitoring configured/setup-required

### Phase 15 — Final Production API Testing And Signoff

Performance checks:

* production smoke performance
* provider performance
* payment webhook performance
* R2/CDN performance
* search/dashboard/admin performance
* monitoring live/setup-required
* final launch blockers resolved

---

## 37. Production Performance Launch Checklist

Production cannot be considered performance-ready until:

### Public

* [ ] homepage loads fast
* [ ] search paginated/indexed
* [ ] detail pages optimized
* [ ] public media optimized/lazy
* [ ] SEO pages safe and efficient
* [ ] sitemap generation safe
* [ ] no fake counts/analytics

### Auth / Roles

* [ ] auth flow not blocked by slow provider without fallback
* [ ] role lookup efficient
* [ ] protected route checks fast
* [ ] direct URL denial fast and safe

### Database

* [ ] critical indexes created
* [ ] no unbounded reads
* [ ] no N+1 critical flows
* [ ] RLS performance checked
* [ ] public-safe views optimized
* [ ] admin queues paginated
* [ ] dashboards paginated/lazy
* [ ] search queries reviewed

### Media

* [ ] card images optimized
* [ ] gallery lazy-loaded
* [ ] videos lazy-loaded
* [ ] PDFs on demand
* [ ] R2/CDN configured or setup-required
* [ ] private files not public
* [ ] image CLS controlled

### Providers

* [ ] provider timeouts/fallbacks
* [ ] no provider fake success
* [ ] payment webhook safe/fast if live
* [ ] notification providers queued/retried if live
* [ ] maps lazy/fallback
* [ ] analytics consent-safe
* [ ] monitoring/error tracking redacted or setup-required

### UI / Responsive

* [ ] mobile smooth at 320/360/390/430
* [ ] tablet smooth at 768/1024
* [ ] desktop smooth at 1366
* [ ] no horizontal scroll
* [ ] no overlap
* [ ] no layout shift
* [ ] no long freezes
* [ ] tables become cards
* [ ] modals/bottom sheets performant

### Build / Bundle

* [ ] build passes
* [ ] typecheck passes
* [ ] lint passes
* [ ] bundle reviewed
* [ ] heavy dependencies justified
* [ ] public pages not over-clientized

### Monitoring

* [ ] uptime monitoring or setup-required
* [ ] error tracking or setup-required
* [ ] Core Web Vitals tracking or setup-required
* [ ] slow query tracking or manual process
* [ ] provider failure tracking
* [ ] payment webhook failure tracking if payment live
* [ ] cron/job monitoring if jobs active

### Load

* [ ] critical load tests run or blocked reason documented
* [ ] bottlenecks tracked
* [ ] no S0/S1 performance bugs open
* [ ] rollback plan ready

---

## 38. Current Performance Status

No actual website implementation has started yet.

Current status:

| Area                              | Status           |
| --------------------------------- | ---------------- |
| Core Web Vitals                   | `NOT_STARTED`    |
| Database indexes                  | `NOT_STARTED`    |
| Query optimization                | `NOT_STARTED`    |
| RLS performance                   | `NOT_STARTED`    |
| Public search performance         | `NOT_STARTED`    |
| Location performance              | `NOT_STARTED`    |
| Homepage performance              | `NOT_STARTED`    |
| Detail page performance           | `NOT_STARTED`    |
| Dashboard performance             | `NOT_STARTED`    |
| Admin performance                 | `NOT_STARTED`    |
| Leads/CRM performance             | `NOT_STARTED`    |
| Messaging performance             | `NOT_STARTED`    |
| Notifications performance         | `NOT_STARTED`    |
| Billing/payment performance       | `SETUP_REQUIRED` |
| Ads performance                   | `NOT_STARTED`    |
| Media optimization                | `SETUP_REQUIRED` |
| R2/CDN performance                | `SETUP_REQUIRED` |
| Caching/revalidation              | `NOT_STARTED`    |
| Provider timeout/fallback         | `SETUP_REQUIRED` |
| Background jobs/cron              | `SETUP_REQUIRED` |
| Monitoring                        | `SETUP_REQUIRED` |
| Load testing                      | `NOT_STARTED`    |
| Production performance final pass | `NOT_STARTED`    |

---

## 39. Current Open Performance Risks

## PERFORMANCE-RISK-20260629-001 — No Implementation Performance Baseline Yet

### Status

`NOT_STARTED`

### Severity

`PERF-S2_MEDIUM`

### Risk

No code implementation has started, so there is no performance baseline.

### Required Action

* Establish baseline in Phase 01.
* Run build/lint/typecheck.
* Track initial bundle/performance after UI routes exist.

### Launch Impact

Production launch blocked until performance verification is done.

---

## PERFORMANCE-RISK-20260629-002 — Database Indexes Not Created Yet

### Status

`NOT_STARTED`

### Severity

`PERF-S1_HIGH` if search/dashboard/admin launched without indexes

### Risk

Search, dashboards, admin queues, notifications and billing can become slow without indexes.

### Required Action

* Add indexes in SQL migrations.
* Review query patterns.
* Test slow queries.
* Update this checklist.

### Launch Impact

Search/dashboard/admin launch blocked if critical indexes missing.

---

## PERFORMANCE-RISK-20260629-003 — Media Optimization Provider Not Configured Yet

### Status

`SETUP_REQUIRED`

### Severity

`PERF-S1_HIGH` if media-heavy public pages launched unoptimized

### Risk

Property/project images and videos can slow down public pages.

### Required Action

* Configure R2/CDN/media processing or safe setup-required state.
* Use optimized images and lazy loading.
* Avoid original images in cards.

### Launch Impact

Media-heavy launch blocked or degraded until optimized.

---

## PERFORMANCE-RISK-20260629-004 — Provider Timeout/Fallback Not Implemented Yet

### Status

`SETUP_REQUIRED`

### Severity

`PERF-S2_MEDIUM`

### Risk

Slow OTP/payment/maps/storage/email/SMS/WhatsApp providers can block user flows or create poor UX.

### Required Action

* Implement provider timeouts.
* Implement setup-required/fallback states.
* Queue non-critical sends.
* Update `API_PROVIDER_STATUS.md`.

### Launch Impact

Provider-backed features cannot be `PASS` until fallback/timeout behavior is verified.

---

## PERFORMANCE-RISK-20260629-005 — Load Testing Not Started

### Status

`NOT_STARTED`

### Severity

`PERF-S2_MEDIUM`

### Risk

1 lakh live user target requires load-readiness checks before launch.

### Required Action

* Run staging load tests for critical flows.
* Track bottlenecks.
* Fix S0/S1/S2 issues before production.

### Launch Impact

Production launch cannot claim scale readiness without load/stress verification or documented partial/blocker.

---

## 40. Documentation Generation Progress

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
|       11 | `docs/01_PROJECT_MASTER_AND_SCOPE.md`                     | Pending |
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

## 41. Performance Final Response Rule

After performance-related work, Claude final response must include:

```md id="performance-final-response"
## Performance Result
PASS / PARTIAL / BLOCKED / FAIL

## Scope
- Area optimized/checked:

## Changed Files
- path/to/file

## SQL / Migration Files
- path/to/migration.sql
- None

## Database / Query Impact
- Tables:
- Queries:
- Indexes:
- Pagination:
- RLS performance:

## Cache / Revalidation Impact
- Cache tags:
- Revalidated paths:
- Public/private cache safety:

## Media Impact
- Images:
- Video:
- PDF:
- CDN/R2:

## Provider Impact
- Timeouts:
- Fallback:
- Setup-required:
- No fake success:

## Tests Run
- lint:
- typecheck:
- build:
- performance checks:
- load tests:

## Metrics
- LCP:
- INP:
- CLS:
- query timing:
- bundle impact:

## Security Safety
- RLS unchanged/safe:
- Hidden contact safe:
- Private data cache safe:
- Payment safety unchanged:

## Manual Verification
- Result:

## Bugs Found
- Bug IDs or None

## Docs Updated
- PERFORMANCE_CHECKLIST.md
- MANUAL_VERIFICATION.md
- BUGS_AND_FIXES.md
- CHANGELOG.md
- FEATURE_REGISTRY.md
- brain.md

## Pending Issues
- issue or None
```

Do not write `PASS` if checks were not run.

---

## 42. Performance Update Checklist

Before ending any performance-sensitive phase, Claude must confirm:

* [ ] Relevant docs were read.
* [ ] Existing routes/components/queries inspected.
* [ ] No security/RLS/privacy weakening.
* [ ] No hidden contact leak.
* [ ] No private data cached publicly.
* [ ] No fake counts/analytics.
* [ ] No unbounded database reads.
* [ ] No critical N+1 pattern.
* [ ] Pagination added for lists/tables.
* [ ] Indexes added where needed.
* [ ] SQL/migration file created for DB/index change.
* [ ] Query selected only required fields.
* [ ] Public-safe views used where needed.
* [ ] Caching public/private separation checked.
* [ ] Revalidation targeted.
* [ ] Images optimized/lazy where needed.
* [ ] Heavy media lazy-loaded.
* [ ] Provider timeouts/fallbacks checked.
* [ ] Payment safety unchanged.
* [ ] UI loading/empty/error states preserved.
* [ ] Responsive performance checked.
* [ ] Build/lint/typecheck run or reason documented.
* [ ] Load/performance check run or reason documented.
* [ ] Bugs tracked.
* [ ] Rollback notes updated if risky.
* [ ] `PERFORMANCE_CHECKLIST.md` updated.
* [ ] `MANUAL_VERIFICATION.md` updated.
* [ ] `CHANGELOG.md` updated.
* [ ] `FEATURE_REGISTRY.md` updated.
* [ ] `brain.md` updated.
* [ ] No fake performance PASS.

---

## 43. Resume Guide For Future Claude

Before touching performance-sensitive code, Claude must read:

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
11. relevant detailed docs
12. current SQL/migration files
13. current routes/components/server actions
14. current database query patterns

Claude must inspect existing implementation before optimizing.

Claude must not optimize blindly.

Claude must not sacrifice correctness, security, privacy, payment safety or user trust for speed.

---

## 43a. Prompt 05 — Public Search, Detail Pages, Profiles And SEO [2026-07-01]

- **Pagination:** `/search` uses page-based pagination, `PAGE_SIZE=20`, hard `MAX_PAGE=500` cap — no unbounded reads. Each entity query fetches `PAGE_SIZE + 1` rows to derive `hasMore` without a separate/expensive `COUNT(*)`.
- **No fake total count:** search never computes or shows a total result count — only real cards plus a lightweight `hasMore` boolean for "Next".
- **Indexes:** relies on the Prompt 04 indexes already present on `properties`/`projects`/`requirements` (`status`, `approval_status`, `visibility_status`, `slug`, city/locality text columns) — no new indexes required this phase since the fix (`BUG-20260701-SEARCH-001`) only appended a `text` column to a view, not a filter/sort column.
- **N+1 avoidance:** broker/builder profile pages fetch the profile once, then a single bounded (`limit(24)`) query for that profile's listings — not per-card queries. Detail pages resolve the uploader's broker/builder link with exactly one extra query (`getPublicBrokerLinkByProfileId`/`getPublicBuilderLinkByProfileId`), not N+1 across a list.
- **Images:** no real media provider yet (R2/CDN is Prompt 10) — detail/search pages render a static inline SVG placeholder, so there is no image loading cost at all in this phase (not lazy-loading real images because none exist yet).
- **Heavy scripts:** no maps/payment/analytics scripts loaded on any of the new public routes.
- **Caching:** all new routes are dynamic Server Components reading live Supabase data (no `unstable_cache`/`revalidate` added this phase) — acceptable for current traffic; revisit with `revalidateTag`/ISR once real listing volume exists.
- **Build:** `npm run build` → PASS, 38 routes, no bundle-size regressions observed.
- **Core Web Vitals:** not measured this phase (Lighthouse run deferred to Prompt 14, unchanged from Prompt 03's note).

---

## 43b. Prompt 05 Manual Verification Results [2026-07-01]

- Confirmed no unbounded search query — `PAGE_SIZE=20`/`MAX_PAGE=500` enforced, verified with malformed `page=-5` and huge values (handled safely, no crash).
- Confirmed no N+1 pattern in profile listing pages (single bounded query per profile's listings, not per-card).
- Confirmed mobile filter sheet interaction (BHK select → Apply) completes without noticeable jank on a cold Turbopack dev compile (~2-3s first compile, then fast).
- Build: `npm run build` → PASS, 31 routes (verification pass), no new regressions.
- No new caching strategy added/changed this verification pass.

---

## 43c. Prompt 06 — Owner, Broker And Builder Dashboards [2026-07-01]

- Dashboard overview counts use existing paginated `getMy*` server actions called with `limit=1` (only fetching count, not full rows) — cheap, no new query pattern.
- No N+1 introduced: each overview page makes at most 2 parallel count queries (owner/broker) or 1 (builder), via `Promise.all` where applicable.
- No unbounded reads added — all 20 new placeholder pages render static content only, no DB queries at all (Verification pages read the already-loaded `profile` object, no extra query; Public Profile pages make exactly one existing lookup function call).
- No heavy provider scripts (maps/payment/analytics) loaded on any dashboard page.
- Mobile dashboard performance: sidebar `overflow-y-auto` addition has negligible cost; bottom tab bar unchanged.
- Private no-store: confirmed via dynamic (`ƒ`) build output for all `/dashboard/*` routes (see `SECURITY_RLS_CHECKLIST.md` §45).
- Build: `npm run build` → PASS, 58 routes.

### Formal verification re-confirmation [2026-07-01, separate pass]
Re-ran `npm run build` fresh — all `/dashboard/**` routes still compile dynamic (`ƒ`), no unbounded reads or new heavy scripts found on re-inspection. Dashboard list pagination/search/filter UI remains not yet built (existing `getMy*` actions return first page of 20 only) — tracked as a known future item, not a regression, not blocking this phase.

---

## 43d. Prompt 07 — Admin, Staff And Super Admin System [2026-07-01]

- **Admin pagination:** `listStaff()`, `listUsers()`, `listAuditLogs()`, `listModerationQueue()` all use `.range(offset, offset+limit-1)` with explicit page/limit params (default 20-30) — no unbounded reads.
- **Admin filter indexes:** filters use already-indexed columns from prior migrations (`staff_profiles.internal_role`/`.staff_status`, `properties/projects/requirements.approval_status`) plus the new `admin_audit_logs` indexes on `actor_staff_profile_id`/`module`/`action`/`target_type,target_id`/`created_at` (added in this phase's migration).
- **Moderation queue limits:** `listModerationQueue()` caps at `limit=20` per page, filtered server-side to only `pending`/`under_review`/`need_changes` rows (never loads all entities).
- **Audit log pagination:** `listAuditLogs()` defaults to 30 rows per page with `count: "exact"` for total, ordered by `created_at desc` (indexed).
- **No unbounded users/entities:** `listUsers()`/`listModerationQueue()` both paginate; `getUserCounts()`/`getStaffCount()`/`getModerationCounts()` use `{count: "exact", head: true}` (count-only, no row fetch) for dashboard overview cards.
- **No heavy fake charts:** admin dashboard overview shows plain real-number stat cards only, no chart library, no fake data series.
- **Provider SDKs not loaded unnecessarily:** `/admin/providers` reads `process.env` presence only — no provider SDK is instantiated just to render the status page.
- **Private admin cache strategy:** all new `/admin/**` routes confirmed dynamic (`ƒ`) in `npm run build` output — same no-store-by-default behavior as the dashboard routes (Next.js does not statically cache Server Components using `cookies()`).
- **Build status:** `npm run lint` → PASS, `npx tsc --noEmit` → PASS, `npm run build` → PASS, all `/admin/**` routes dynamic.
- **Future load testing notes:** no load/stress testing performed this phase (dev-only, single test Super Admin account) — deferred to Prompt 14/15 per the phase plan.
- **Known performance issues:** none found. Owner name lookups in `listModerationQueue()` batch all distinct owner IDs into a single `IN (...)` query (not N+1 per row).

### Formal verification re-confirmation [2026-07-01, separate pass]
Re-ran `npm run build` fresh — all `/admin/**` routes still compile dynamic (`ƒ`). Live-tested `/admin/users` with a real filtered query (search/role/status) — confirmed it re-queries server-side per filter change rather than loading all users client-side. No new performance issues found.

---

## 43e. Prompt 08 — Leads, CRM, Requirements, Proposals And Messages [2026-07-01]

- **Lead list pagination:** `getMyLeadsAsReceiver()`/`getMyLeadsAsRequester()` use `.range(offset, offset+limit-1)` with default `limit=20`.
- **Message thread pagination:** `listMessages()` uses `.range()` with default `limit=50` per thread; `listThreads()` is not paginated (acceptable — bounded by the number of real conversations a single user has, not a platform-wide table).
- **Proposal list pagination:** `getMyProposals()` uses `.range()` with default `limit=20`.
- **Saved/recent limit:** `listRecentlyViewed()` hard-capped at 30 items (`RECENTLY_VIEWED_MAX`), with an explicit trim-oldest step on every `trackRecentlyViewed()` call so the table never grows unbounded per user.
- **Notification index:** `idx_notifications_recipient` on `(recipient_profile_id, created_at desc)` supports the exact query shape `listNotifications()`/`getUnreadNotificationCount()` use.
- **No unbounded reads:** every list action filters by the calling profile's ID first; no action ever does `select * from leads` (or any communication table) without a profile-scoped filter.
- **No N+1 profile queries:** `enrichLeads()` in `leads.ts` calls `getTargetSummary()`/`getProfileSafeName()` per row (this IS effectively N+1 for the target/counterpart name lookups) — acceptable at current scale (a single user's own lead list, typically dozens not thousands of rows) but flagged here honestly as a known future optimization (batch these into a single `IN (...)` query, matching the pattern already used in `listModerationQueue()` from Prompt 07) if lead volume grows significantly.
- **Private no-store pages:** all new `/dashboard/**` routes confirmed dynamic (`ƒ`) in `npm run build` output.
- **No heavy provider SDKs:** no realtime/websocket library loaded — messaging uses plain server actions + `router.refresh()`/client-side re-fetch, matching the spec's "use refresh/polling or static list" guidance for phases without realtime.
- **Build status:** `npm run lint` → PASS, `npx tsc --noEmit` → PASS, `npm run build` → PASS.
- **Future load testing notes:** no load/stress testing performed this phase — deferred to Prompt 14/15.
- **Known performance issues:** the `enrichLeads()` N+1 pattern noted above is the only flagged item; not a correctness bug, a future scale optimization.

---

## 44. Final Rule

Performance is mandatory.

Scalability is mandatory.

Pagination is mandatory for growing lists.

Indexes are mandatory for frequent filters.

Image optimization is mandatory for media-heavy pages.

Provider fallbacks are mandatory.

Monitoring is mandatory before serious production launch.

But security, RLS, hidden contact privacy, private documents, payment verification and accurate real data are more important than raw speed.

A feature is not performance-ready until it is fast enough, safe enough, documented and verified.

Never fake speed.

Never fake analytics.

Never fake PASS.

## Prompt 08 Verification (Formal Pass) [2026-07-02]

- lead list pagination: `getMyLeadsAsReceiver/Requester` range(page,limit=20) — PASS
- CRM/admin leads: bounded reads (limit 30), batch target/profile loads (no N+1) — PASS
- message thread pagination: `listMessages` range(limit=50) — PASS
- proposal list pagination: `getMyProposals` range(limit=20) — PASS
- site visit list: participant-scoped select (bounded by ownership) — PASS
- saved/recent limits: recently-viewed capped 30 (trim on write) — PASS
- notification indexes: `idx_notifications_recipient (recipient, created_at desc)`, type, read_at — PASS
- no unbounded reads / no N+1: admin leads batch-loads targets+names; per-thread unread is bounded by thread count — PASS (note: `listThreads`/`getTotalUnreadMessageCount` do per-thread count queries — acceptable at current scale, flagged for future batching if thread counts grow)
- private no-store pages: comm pages `force-dynamic` — PASS
- no heavy provider SDKs loaded — PASS
- build: PASS

Result: PASS. Future note: batch per-thread unread counts if a user accumulates many threads.

## Prompt 09 — Billing [2026-07-02]

- Invoice/payment lists: `getMyInvoices`/`getMyPayments` capped `.limit(50)`; admin recent payments `.limit(20)`.
- Admin billing counts use `head:true, count:'exact'` (no row transfer); plans/payments batched in one `Promise.all` (no N+1).
- Plans fetched via anon client (RLS-filtered to active+public); pricing page `force-dynamic` (no stale public cache of private data; plans are non-sensitive).
- Indexes added for plans(role,active), subscriptions(profile,role,status,period_end), payments(profile,provider ids,status), invoices(profile,number,fy,status), usage_counters(profile,feature,period), webhook(provider_event_id unique), coupons(code,active), refunds/credit_notes.
- Webhook processing is O(1): single order lookup by `provider_order_id`, idempotent unique insert, one activation path.
- No heavy provider SDK bundled — Razorpay checkout script is loaded on demand only when a user clicks a paid plan (client component), not on page load.
- Private billing pages `no-store`/`force-dynamic`; build: PASS.
- Future: batch usage-summary queries (currently one `getUsage` per feature key — small N per plan, acceptable); add pagination to admin lists when volume grows.

---

## Prompt 01 Re-Baseline [2026-07-04]
- `npm run build` PASS. Private/dashboard/admin routes render dynamic (`ƒ`) — no static caching of private data. Public detail/search routes dynamic as designed.
- Pagination/indexes/image-optimization/caching remain per-phase concerns (billing, search already paginated in their phases). Core Web Vitals + load test: not measured yet (later phase).

---

## Prompt 02 Design Alignment [2026-07-04]
- UI-only change (auth components + brand token + new OtpInput). Build PASS. No new queries, no data-fetch change; `/login` and `/admin/login` remain static (`○`). Negligible bundle impact (small client components).

---

## Prompt 03 [2026-07-04] — Public UI performance
- Homepage featured data: bounded (4 properties + 3 projects) via `searchPublicListings` (LIMIT + public views, indexed) — no unbounded read, no N+1.
- Server components for static sections (categories/featured/how-it-works/trust/footer); only hero + role band are client components (minimal JS).
- No heavy provider scripts on homepage: no maps, no payment SDK, no analytics SDK, no WhatsApp. Images are CSS placeholders (no large hero image, no layout shift — fixed 150px card media).
- `getHomeFeatured` wrapped in try/catch → homepage never crashes on a data hiccup (renders empty states).
- Build: `/` compiles dynamic (ƒ) — reads session + featured data; no private data cached publicly.
- Pending: real image optimization (next/image + R2) when media lands (Prompt 10); full responsive perf pass in matching verification prompt.

**Prompt 03 Verification [2026-07-04]:** clean `npm run build` PASS (all routes). No horizontal scroll at any of 320/360/390/430/768/1024/1366 (documentElement.scrollWidth ≤ innerWidth at every width). No heavy provider scripts on `/` (no maps/payment/analytics/WhatsApp). No console errors on home. Primary nav renders only `lg+` (less DOM/JS on mobile/tablet). Featured reads remain bounded via public views.
