# docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md

# My Gujarat Property — Performance, Deployment, Rollback, QA And Production Launch System

This document defines the complete **Performance, Scalability, Caching, Deployment, Rollback, QA, Testing, Monitoring and Production Launch System** for **My Gujarat Property**.

Claude must read this file before implementing performance optimization, database indexes, caching, deployment workflows, staging/production setup, SQL migrations, rollback plans, production release gates, smoke tests, load tests, monitoring, incident response, launch checklist or final QA signoff.

No performance claim can be fake.

No deployment can skip backup.

No production migration can skip rollback notes.

No RLS/security-sensitive deployment can be marked PASS without verification.

No payment/provider production release can be marked PASS without real provider testing.

No fake QA PASS is allowed.

---

## 1. Purpose

This file defines:

* performance principles
* scalability target
* database performance
* query optimization
* indexing requirements
* pagination requirements
* caching strategy
* frontend performance
* Core Web Vitals
* image/media optimization
* API/provider performance
* rate limits
* background jobs
* monitoring
* alerting
* logging
* staging deployment
* production deployment
* environment separation
* backup rules
* SQL migration rules
* rollback strategy
* feature flags
* maintenance mode
* QA process
* manual verification process
* smoke tests
* regression tests
* load tests
* security tests
* RLS tests
* payment/provider tests
* production launch checklist
* post-launch monitoring
* incident response
* RPO/RTO
* signoff rules

This is the master production readiness reference.

---

## 2. Core Production Principles

The platform must follow these principles:

1. Performance must be real and measured.
2. Public pages must be fast.
3. Dashboard pages must be efficient.
4. Admin pages must be paginated.
5. No unbounded database reads.
6. No fake counts.
7. No fake analytics.
8. No fake provider status.
9. No fake payment status.
10. No public cache of private data.
11. No private data in SEO/cache.
12. No production deployment without backup.
13. No risky migration without rollback notes.
14. No destructive migration without approval and backup.
15. No production release without manual verification.
16. No launch without RLS/security PASS.
17. No payment release without webhook verification.
18. No provider release without setup/test status.
19. Feature flags must protect incomplete/risky features.
20. Rollback path must be documented.
21. Incident response must be ready.
22. Super Admin signoff required for final production launch.
23. No fake PASS.

---

## 3. Scalability Target

Target business expectation:

```txt id="scalability-target"
My Gujarat Property should be designed to support 1 lakh live users with safe scaling practices.
```

This target does not mean every feature is instantly load-tested for 100,000 concurrent users on day one.

It means architecture must avoid obvious bottlenecks:

* unbounded reads
* missing indexes
* huge client bundles
* unoptimized images
* public pages blocked by providers
* database N+1 queries
* no caching strategy
* no pagination
* no queue/retry for provider sends
* no rate limits
* no monitoring
* no rollback plan

Performance target must be implemented progressively and verified honestly.

---

## 4. Performance Status Values

Use these statuses:

| Status             | Meaning                                 |
| ------------------ | --------------------------------------- |
| `NOT_STARTED`      | not implemented                         |
| `IN_PROGRESS`      | being implemented                       |
| `PARTIAL`          | partly implemented, not fully verified  |
| `PASS`             | verified and acceptable                 |
| `FAIL`             | tested and failed                       |
| `BLOCKED`          | cannot proceed due to dependency        |
| `SETUP_REQUIRED`   | provider/config missing                 |
| `NEEDS_LOAD_TEST`  | functionally okay but load not verified |
| `REGRESSION_FOUND` | previous working performance broke      |
| `ROLLED_BACK`      | optimization/deployment rolled back     |

Do not mark `PASS` without evidence.

---

## 5. Core Web Vitals Targets

Public pages should target:

| Metric |  Target |
| ------ | ------: |
| LCP    |  ≤ 2.5s |
| INP    | ≤ 200ms |
| CLS    |   ≤ 0.1 |

Additional targets:

| Area                      | Target                           |
| ------------------------- | -------------------------------- |
| Public page TTFB          | optimized through server/caching |
| Search result interaction | responsive on mobile             |
| Dashboard navigation      | no long blank screens            |
| Admin tables              | paginated and responsive         |
| Image loading             | optimized/lazy below fold        |
| Gallery                   | no huge original images in cards |
| Form submit               | visible loading/error            |
| Provider calls            | timeout-safe                     |

If target cannot be verified yet, mark `PARTIAL` or `NEEDS_LOAD_TEST`.

---

## 6. Page Performance Priority

High-priority public pages:

1. Homepage
2. Search page
3. Property detail page
4. Project detail page
5. City/locality SEO pages
6. Public broker/builder profiles
7. Pricing page
8. CMS/legal pages
9. Blog pages

High-priority private pages:

1. Owner dashboard
2. Broker dashboard
3. Builder dashboard
4. Admin dashboard
5. Lead/CRM pages
6. Billing dashboard
7. Media upload flows
8. Admin moderation queues
9. Payment/admin provider pages

High-priority flows:

1. Auth/login/register
2. Search/filter
3. Property posting
4. Project posting
5. Requirement posting
6. Inquiry/contact reveal
7. Payment checkout
8. Media upload
9. Admin approval
10. Rollback/deployment

---

## 7. Database Performance Principles

Database rules:

1. Every large list must be paginated.
2. Every search/filter needs indexes.
3. Every public page must use public-safe views or scoped queries.
4. Avoid N+1 queries.
5. Avoid selecting unused columns.
6. Avoid client-side filtering of huge data.
7. Avoid returning hidden contact to public.
8. Avoid unbounded joins on public pages.
9. Use proper foreign keys.
10. Use indexed status fields.
11. Use materialized/summary tables where needed.
12. Use background aggregation for heavy analytics.
13. Use query plans for slow queries.
14. Use migration-driven indexes.
15. Use RLS but test performance impact.

---

## 8. Mandatory Pagination

Pagination required for:

* public search results
* property lists
* project lists
* requirement feeds
* dashboard listings
* dashboard projects
* dashboard requirements
* leads
* messages
* site visits
* notifications
* saved items
* invoices
* payments
* support tickets
* admin users
* admin properties
* admin projects
* admin requirements
* admin verification queue
* admin reports
* admin ads
* admin audit logs
* admin security events
* media lists
* exports
* provider logs
* webhook events

No admin/public list should load all records at once.

---

## 9. Query Safety Rules

Every query must answer:

* who is the user?
* what role?
* what permission?
* what entity ownership?
* what status?
* what visibility?
* what columns are needed?
* what limit?
* what offset/cursor?
* what indexes support it?
* is it public-safe?
* can it leak hidden contact?
* can it be cached?

No query should use broad unrestricted reads in production.

---

## 10. Index Strategy

Indexes must support common filters.

## 10.1 Property Indexes

Required index areas:

* status
* approval status
* owner profile ID
* city/village ID
* locality ID
* purpose
* category
* property type
* price/rent
* area
* published date
* slug
* deleted_at
* featured/sponsored where applicable

---

## 10.2 Project Indexes

Required index areas:

* status
* approval status
* builder profile ID
* city/village ID
* locality ID
* project type
* purpose
* RERA status
* construction status
* possession date
* published date
* slug
* deleted_at
* sponsored/featured where applicable

---

## 10.3 Requirement Indexes

Required index areas:

* status
* approval status
* profile ID
* role
* city/village ID
* locality ID
* purpose
* requirement type
* budget min/max
* created date
* expiry date
* visibility

---

## 10.4 Lead / CRM Indexes

Required index areas:

* receiver profile ID
* sender profile ID
* assigned agent ID
* related entity type/ID
* source
* status
* stage
* last activity
* created date
* follow-up due date

---

## 10.5 Message Indexes

Required index areas:

* thread ID
* participant profile ID
* participant staff ID
* created date
* read/unread state
* archived state

---

## 10.6 Billing / Payment Indexes

Required index areas:

* profile ID
* subscription status
* payment provider order ID
* payment provider payment ID
* webhook event ID
* invoice number
* invoice financial year
* payment status
* created date

---

## 10.7 Admin / Audit Indexes

Required index areas:

* module
* actor
* target type/ID
* created date
* severity
* status
* assigned staff
* queue status
* permission/module

---

## 11. Search Performance Rules

Public search must:

* use indexed columns
* use public-safe views
* paginate results
* avoid hidden contact
* avoid huge joins
* lazy-load media
* use optimized cover image
* debounce filter changes if needed
* keep mobile responsive
* no fake count
* no unbounded result count query if expensive
* use approximate count only if clearly acceptable and not fake

Search filters must not cause full table scans at scale.

---

## 12. Location Performance Rules

Location system must:

* cache stable location lists
* load child dropdowns by parent
* avoid loading all societies/buildings at once
* support search/autocomplete for large lists
* index parent IDs and slugs
* support alias/transliteration search efficiently
* avoid blocking homepage on full hierarchy load
* update cache after admin location changes

Missing location requests must not slow public forms.

---

## 13. Media Performance Rules

Media must:

* use optimized variants
* avoid original huge files in cards
* lazy-load below fold
* use width/height to reduce CLS
* use CDN for public media where configured
* lazy-load gallery images
* lazy-load video
* lazy-load PDF
* compress/convert images where configured
* strip EXIF where configured
* avoid heavy videos on public page load
* use placeholders/skeletons
* not block LCP with offscreen media

Private media must not be public CDN cached.

---

## 14. Frontend Bundle Performance

Frontend rules:

* avoid huge client bundles
* use server components where suitable
* use client components only when interactivity needed
* dynamically import heavy components
* lazy-load maps
* lazy-load charts
* lazy-load video/PDF viewers
* lazy-load admin-only components
* avoid loading admin code on public pages
* avoid loading dashboard code on public pages
* avoid loading payment provider JS until checkout needed
* avoid loading map provider JS until map opened
* avoid loading rich editor except CMS/admin page

---

## 15. Caching Strategy

Caching types:

* static/public cache
* dynamic public cache
* private no-store
* provider cache
* CDN cache
* database materialized summary
* revalidation tag/path
* browser cache for assets

Caching must never leak private data.

---

## 16. Public Cache Rules

Can be cached if public-safe:

* homepage sections with public data
* published public listings
* published public projects
* city/locality SEO pages
* public CMS/legal pages
* blog posts
* public location lists
* public ads if cache handles active/expiry correctly
* public images/media

Must revalidate on:

* listing publish/pause/delete
* project publish/pause/delete
* ad activation/expiry/pause
* CMS/legal/blog publish
* SEO page update
* location slug update
* media update/delete
* RERA/verification status change if public

---

## 17. Private No-Store Rules

Must not be publicly cached:

* dashboard pages
* admin pages
* billing pages
* invoices
* payment history
* private profile settings
* leads
* messages
* site visits
* saved items
* notifications
* support tickets
* private documents
* signed URLs
* provider settings
* audit logs
* security events
* exports
* checkout/payment status

Use `no-store` or equivalent for private data.

---

## 18. Cache Invalidation Rules

Cache must be revalidated after:

* property approved
* property rejected
* property paused/resumed
* property deleted
* property media changed
* project approved
* project rejected
* project paused/resumed
* project deleted
* project media changed
* RERA status changed
* profile public fields changed
* ad approved/activated/expired
* city/location slug changed
* CMS/blog/legal page published
* SEO metadata changed
* redirect changed

Stale public page showing hidden/deleted/private data is a critical bug.

---

## 19. Provider Timeout Rules

Provider calls must be timeout-safe.

Providers:

* OTP/SMS
* email
* WhatsApp
* Razorpay
* maps
* R2/storage
* CDN purge
* Turnstile
* analytics
* error tracking
* PDF generation
* media processing
* file scanning

Rules:

* no provider can hang entire page indefinitely
* provider failures show setup-required/degraded/failure
* retries controlled
* user gets safe error
* background jobs for non-critical sends
* no fake success on timeout

---

## 20. Background Job Rules

Background jobs may handle:

* notification delivery
* email/SMS/WhatsApp sends
* payment reconciliation
* invoice PDF generation
* media processing
* image variants
* malware scanning
* ad expiry
* subscription expiry
* trial expiry
* reminders
* saved search alerts
* sitemap generation
* orphan media cleanup
* provider health checks
* analytics aggregation
* report exports

Jobs must be:

* idempotent
* retry-safe
* limited attempts
* logged safely
* monitored
* dead-lettered after repeated failure
* not duplicate-send users
* not duplicate-generate invoices
* not duplicate-activate payment

Cron/job provider is `SETUP_REQUIRED` until configured.

---

## 21. Rate Limit Performance And Abuse Protection

Rate limits improve both security and performance.

Rate limit areas:

* OTP
* login
* search
* inquiry
* contact reveal
* message send
* proposal send
* site visit request
* support ticket
* report abuse
* upload
* signed URL generation
* checkout/order creation
* coupon apply
* provider test
* ad event tracking
* admin export
* bulk actions

Rate limit failures must be safe and not create fake success.

---

## 22. Realtime / Polling Rules

Realtime may be used for:

* notifications
* messages
* lead updates
* admin queues
* payment status

Rules:

* scope subscriptions to current user/module
* avoid global realtime channels
* avoid excessive polling
* fallback to refresh/pagination
* no private data broadcast
* unsubscribe on unmount
* rate-limit backend updates
* consider cost/performance

If realtime not implemented, use normal fetch with honest state.

---

## 23. Analytics Performance Rules

Analytics must be real and efficient.

Rules:

* heavy analytics aggregated
* dashboard summaries cached/private-scoped
* date filters indexed
* no fake charts
* no expensive raw event scans per page load
* background aggregation where needed
* analytics setup-required if event tracking missing
* ad analytics real only
* user analytics user-scoped
* admin reports permission-scoped

---

## 24. Monitoring Requirements

Monitoring should cover:

* uptime
* error rate
* slow pages
* slow API routes
* slow queries
* failed jobs
* webhook failures
* payment failures
* provider failures
* upload failures
* high rate limit hits
* hidden contact access attempts
* RLS/security errors
* ad event anomalies
* login/OTP abuse
* storage/CDN failures
* deployment failures

Monitoring provider may be setup-required until configured.

---

## 25. Alerting Rules

Alerts should be created for:

* site down
* high 5xx rate
* payment webhook failure
* invalid webhook spike
* provider outage
* upload failure spike
* database slow query spike
* RLS/security issue
* private document access anomaly
* hidden contact leak suspicion
* high OTP abuse
* high error rate after deployment
* failed background jobs
* backup failure
* migration failure
* ad/payment mismatch
* invoice generation failure

Critical alerts should notify Super Admin/system owner where provider configured.

---

## 26. Logging Rules For Performance

Logs must include safe info:

* route/action
* duration
* status
* safe error code
* user/profile ID internal where needed
* provider name
* job ID
* payment ID
* request ID
* query/action name
* retry count

Logs must not include:

* secrets
* OTP
* hidden contact
* raw private messages
* private document URLs
* signed URLs
* raw provider payload with secrets
* service role key
* full billing address
* private invoice URL

---

## 27. Error Tracking Rules

Error tracking must:

* capture frontend errors
* capture backend errors
* capture job failures
* capture provider failures
* tag environment
* tag release version
* redact secrets/private data
* avoid noisy duplicate alerts
* link to deployment version
* support rollback decisions

Error tracking provider is setup-required until configured.

---

## 28. Environment Strategy

Environments:

* local development
* preview
* staging
* production

Rules:

* separate environment variables
* separate Supabase projects or safe schemas where possible
* separate Razorpay test/live mode
* separate provider modes
* separate R2 buckets or prefixes
* production secrets never used locally casually
* test/mock providers never used as production success
* staging mirrors production behavior where possible
* `.env.example` kept updated with placeholder names only

---

## 29. Environment Status Rules

| Environment | Purpose                 |
| ----------- | ----------------------- |
| Local       | development only        |
| Preview     | branch/PR preview       |
| Staging     | production-like test    |
| Production  | real users/data/payment |

Production must not use:

* mock OTP
* test payment as real
* fake provider status
* local storage
* dev demo data
* RLS disabled
* service role client-side
* fake analytics
* fake verified badges

---

## 30. Deployment Principles

Deployment must:

1. use versioned code
2. use migrations
3. run checks before production
4. backup before risky production DB changes
5. document changed files
6. document SQL migrations
7. document provider changes
8. document feature flags
9. document tests run
10. document manual verification
11. have rollback plan
12. update changelog/docs
13. monitor after deploy

No silent production changes.

---

## 31. Pre-Deployment Checklist

Before deployment:

* code committed
* docs updated
* feature registry updated
* changelog updated
* bugs/fixes updated if relevant
* API provider status updated if relevant
* SQL migrations reviewed
* RLS reviewed
* destructive changes identified
* backup plan ready
* rollback plan ready
* feature flags set
* `.env.example` updated
* secrets configured
* lint run
* typecheck run
* build run
* relevant tests run
* manual verification plan ready
* affected routes listed
* affected tables listed
* affected providers listed
* expected user impact noted

---

## 32. Build Gates

Build gates should include:

* install dependencies
* lint
* typecheck
* unit tests where available
* integration tests where available
* build
* route compile check
* migration validation
* RLS tests where applicable
* payment webhook tests where applicable
* provider setup checks where applicable
* bundle size review where needed
* accessibility smoke where possible

If any required gate fails:

* do not mark PASS
* fix or mark BLOCKED/PARTIAL
* document failure

---

## 33. Database Migration Rules

Every DB change must have SQL migration.

Migration file must include:

* timestamped filename
* clear name
* purpose
* phase
* affected tables
* affected policies
* affected indexes
* affected functions/triggers
* destructive change yes/no
* backup required yes/no
* rollback notes
* verification query notes where useful

No undocumented production DB changes.

---

## 34. Migration Naming Rule

Recommended format:

```txt id="migration-name-format"
supabase/migrations/YYYYMMDDHHMMSS_descriptive_name.sql
```

Examples:

```txt id="migration-examples"
supabase/migrations/20260629120000_create_property_tables.sql
supabase/migrations/20260629123000_add_property_public_indexes.sql
supabase/migrations/20260629130000_add_contact_reveal_rls.sql
```

---

## 35. Destructive Migration Rules

Destructive changes include:

* drop table
* drop column
* rename column without compatibility
* data deletion
* hard delete
* changing enum/check in incompatible way
* changing RLS to be more restrictive without migration plan
* changing RLS to be less restrictive
* changing public-safe views exposing new data
* changing payment/invoice schema
* changing auth/profile core schema

Destructive changes require:

* explicit approval
* backup
* rollback plan
* staging test
* data impact notes
* downtime/maintenance plan if needed
* post-migration verification

---

## 36. Zero-Downtime Migration Strategy

Prefer safe sequence:

1. add new nullable column/table
2. deploy code that writes both old and new if needed
3. backfill safely
4. verify
5. switch reads
6. verify
7. remove old only after backup/approval/final deploy

Avoid:

* immediate drop
* incompatible rename
* blocking long locks
* untested data migration
* production manual edits

---

## 37. Backup Rules

Backup required before:

* production migration
* destructive change
* RLS major change
* payment/invoice schema change
* user/profile/auth schema change
* media cleanup/hard delete
* bulk data update
* location hierarchy bulk import
* plan/pricing bulk change
* major launch release
* rollback-sensitive deploy

Backup must include:

* database backup
* storage/media backup or lifecycle awareness where relevant
* environment/version reference
* migration version
* rollback instructions

No risky production update without backup.

---

## 38. Restore Test Rules

Backups are only useful if restore is tested.

Restore testing should verify:

* backup can be restored
* RLS/policies intact
* core tables present
* critical data present
* media references intact
* invoice/payment records intact
* admin/staff access recoverable
* public site can run against restored DB in safe environment

Production launch should have at least one restore test documented.

---

## 39. RPO / RTO Targets

Recommended targets:

| Metric | Meaning                          | Initial Target           |
| ------ | -------------------------------- | ------------------------ |
| RPO    | maximum acceptable data loss     | define before production |
| RTO    | maximum acceptable recovery time | define before production |

Business owner/Super Admin must approve final RPO/RTO.

Until defined, production status should be `PARTIAL`.

---

## 40. Rollback Strategy

Rollback may include:

* code rollback
* feature flag rollback
* database rollback
* provider mode rollback
* cache rollback/purge
* CDN rollback/purge
* migration rollback
* data correction
* maintenance mode
* disabling affected feature

Rollback must be chosen based on incident type.

---

## 41. Code Rollback

Code rollback steps:

1. identify bad release/version
2. confirm incident scope
3. disable feature flag if available
4. rollback to previous stable deploy
5. run smoke tests
6. monitor errors
7. update changelog/incident log
8. create bug/root cause task

Code rollback must consider DB compatibility.

---

## 42. Feature Flag Rollback

Feature flag rollback is fastest for risky features.

Use feature flags for:

* contact reveal
* payment checkout
* ads display
* media upload
* messaging
* provider sends
* maps
* analytics
* admin exports
* bulk actions
* new UI
* advanced search
* public SEO pages

Flag rollback rules:

* backend-enforced
* audit changes
* user-safe disabled state
* no fake success
* docs updated

---

## 43. Database Rollback

Database rollback is risky.

Options:

* reverse migration if safe
* restore backup
* add compatibility patch
* data correction script
* feature flag disable
* hotfix code to support new schema

Rules:

* do not run destructive rollback blindly
* backup before rollback if data changed since migration
* document data loss risk
* test in staging when possible
* Super Admin approval for high-risk rollback

---

## 44. Provider Rollback

Provider rollback may be needed for:

* OTP provider failure
* payment webhook failure
* email/SMS/WhatsApp failure
* R2/CDN failure
* maps failure
* Turnstile false positives
* analytics errors
* error tracking noise

Provider rollback options:

* disable feature flag
* fallback mode
* switch provider mode
* pause sends
* queue retries
* show setup-required/degraded state
* manual processing

No fake provider success.

---

## 45. Cache / CDN Rollback

Cache rollback actions:

* purge CDN for affected paths/assets
* revalidate tags/paths
* disable caching temporarily
* fix public-safe view
* remove leaked asset
* rotate signed URL if needed
* verify sitemap/SEO cache
* verify deleted/paused listing no longer public

If private data cached publicly:

* treat as security incident
* purge immediately
* rotate affected secrets/URLs if needed
* audit exposure
* document incident

---

## 46. Maintenance Mode

Maintenance mode may be used for:

* database migration
* emergency security fix
* payment outage
* provider outage
* data correction
* deployment incident
* storage/CDN issue

Maintenance mode must:

* show safe public message
* protect private data
* noindex if needed
* allow internal bypass if safe
* disable affected actions
* audit enable/disable
* notify users if long outage where provider configured

---

## 47. QA Strategy

QA includes:

* automated tests
* manual verification
* responsive testing
* role testing
* RLS testing
* provider testing
* payment testing
* performance testing
* accessibility testing
* SEO testing
* security testing
* regression testing
* smoke testing
* post-deploy testing

No feature can be marked complete only because code compiled.

---

## 48. Test Types

## 48.1 Unit Tests

Use for:

* validation logic
* formatting helpers
* plan limit calculations
* GST/invoice calculations
* role permission helpers
* status transitions
* matching logic
* utility functions

## 48.2 Integration Tests

Use for:

* server actions
* API routes
* database queries
* RLS behavior
* provider adapters
* payment webhook flow
* media upload flow
* notification flow

## 48.3 E2E Tests

Use for:

* auth flow
* posting flow
* search flow
* contact reveal
* inquiry
* checkout
* admin approval
* dashboard role access
* media upload
* support ticket

## 48.4 Manual Tests

Required for:

* responsive design
* cross-browser UI
* provider setup
* legal/consent flow
* payment sandbox/live readiness
* hidden contact inspection
* SEO metadata
* admin permission review

---

## 49. Manual Verification Status Values

Manual verification status:

| Status           | Meaning                                        |
| ---------------- | ---------------------------------------------- |
| `PASS`           | verified and working                           |
| `PARTIAL`        | partly working or not all devices/roles tested |
| `FAIL`           | tested and failed                              |
| `BLOCKED`        | dependency prevents test                       |
| `SETUP_REQUIRED` | provider/config missing                        |
| `NOT_TESTED`     | not tested yet                                 |
| `NEEDS_RETEST`   | fix made, retest needed                        |

No vague “done”.

Use exact notes.

---

## 50. Manual Verification Format

Every manual verification entry should include:

```txt id="manual-verification-format"
Feature:
Environment:
Date:
Tester:
Roles Tested:
Devices/Widths Tested:
Browsers Tested:
Data Used:
Expected:
Actual:
Result: PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED
Issues Found:
Screenshots/Notes:
Follow-up:
```

---

## 51. Smoke Test Checklist

Smoke tests after deployment:

### Public

* homepage loads
* search loads
* property detail public page loads
* project detail public page loads
* city selector works
* footer/legal links work
* no hidden contact visible
* no console crash

### Auth

* login/register popup opens
* OTP provider state honest
* logout works
* protected action triggers auth

### Roles

* owner dashboard access
* broker dashboard access
* builder dashboard access
* wrong role denied
* guest denied private dashboard

### Admin

* admin login route protected
* staff permission works
* admin dashboard loads
* admin noindex

### Core Marketplace

* property list/search public-safe
* project list/search public-safe
* inquiry flow works or setup-required
* contact reveal protected
* media loads optimized

### Billing

* pricing page loads
* checkout setup-required or real
* billing dashboard protected
* invoice protected

### Providers

* provider status honest
* no fake provider success
* no raw secrets visible

### Security

* RLS/direct URL quick checks
* private pages noindex
* sitemap public-safe
* hidden contact absent

---

## 52. Regression Test Areas

Always retest when related code changes:

* auth
* role redirects
* hidden contact
* RLS policies
* public-safe views
* search
* property posting
* project posting
* requirement posting
* media upload
* payment checkout
* Razorpay webhook
* invoice generation
* admin permissions
* provider settings
* notifications
* ads display
* SEO sitemap/noindex
* mobile header/footer
* dashboard no-footer rule
* public/private caching

---

## 53. RLS Test Matrix

RLS tests must cover:

| Actor                    | Expected                     |
| ------------------------ | ---------------------------- |
| Guest                    | public-safe only             |
| Owner                    | own owner data only          |
| Broker                   | own/scoped broker data       |
| Builder                  | own/scoped builder data      |
| Builder Agent            | assigned data only           |
| Staff without permission | denied                       |
| Staff with permission    | allowed scoped               |
| Admin                    | allowed based on permissions |
| Super Admin              | broad internal access        |
| Wrong owner              | denied                       |
| Wrong builder            | denied                       |

Tables to test:

* profiles
* properties
* projects
* requirements
* leads
* proposals
* messages
* media
* verification docs
* payments
* invoices
* notifications
* ads
* support tickets
* reports
* audit logs
* provider settings

---

## 54. Hidden Contact Test Matrix

Check hidden contact in:

* public HTML source
* API responses
* search results
* detail pages
* cards
* meta tags
* schema
* sitemap
* share previews
* notifications
* logs
* media metadata
* saved items
* public profile
* SEO pages
* ad pages
* cached pages

No hidden contact before authorized reveal.

---

## 55. Payment Test Matrix

Payment tests:

* plan amount calculated server-side
* wrong role plan blocked
* inactive plan blocked
* coupon valid
* coupon invalid
* coupon expired
* order created server-side
* client callback pending only
* invalid webhook signature rejected
* valid webhook activates
* duplicate webhook idempotent
* failed payment inactive
* pending payment inactive
* invoice after verified success
* invoice own-only
* refund permission-gated
* manual activation audited
* provider setup-required if missing

---

## 56. Provider Test Matrix

Provider tests:

* OTP setup/test/live
* SMS setup/test/live
* email setup/test/live
* WhatsApp free/API distinction
* Razorpay test/live
* maps fallback/API
* R2 upload/download/delete
* CDN public media/purge
* Turnstile verify
* analytics event
* error tracking event
* cron job run
* PDF generation
* push notification

Each provider must be:

* real active
* setup-required
* disabled
* degraded
* failed

Never fake active.

---

## 57. Media Test Matrix

Media tests:

* property images
* project images
* project one video max
* brochure PDF
* floor plans
* profile image crop/remove
* ad banners
* verification docs private
* RERA proof private
* message attachments private
* support/report attachments private
* invoice PDF own-only
* signed URL expiry
* invalid file rejection
* oversized file rejection
* SVG safety
* EXIF stripping/setup-required
* CDN public only
* private docs not CDN

---

## 58. SEO QA Checklist

SEO QA:

* homepage title/meta
* search noindex/canonical strategy
* city pages title/meta/canonical
* locality pages noindex if thin
* listing detail public-safe metadata
* project detail public-safe metadata
* no fake review/rating schema
* no hidden contact in schema
* sitemap public-safe
* no private URLs in sitemap
* robots excludes admin/private
* deleted/pending/rejected noindex/not public
* redirects safe
* no open redirects
* legal/footer links work

---

## 59. Responsive QA Checklist

Test widths:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

Check:

* no horizontal scroll
* no overlap
* header brand not wrapping badly
* city selector usable
* mobile menu works
* filters bottom sheet works
* cards readable
* tables become cards
* modals/bottom sheets close
* upload UI usable
* gallery swipe works
* sticky CTA not covering content
* dashboard nav usable
* admin tables usable
* legal pages readable
* forms not cramped

---

## 60. Accessibility QA Checklist

Check:

* keyboard navigation
* focus visible
* labels on inputs
* aria labels for icon buttons
* modal focus trap
* dropdown keyboard use
* color contrast
* alt text
* status not color-only
* errors readable
* screen-reader-friendly structure where possible
* reduced motion honored
* tap targets large

Accessibility blockers must be tracked.

---

## 61. Load Testing Strategy

Load testing should cover:

* homepage
* search
* property detail
* project detail
* auth OTP rate-limited flow
* public media delivery
* dashboard summary
* admin queue
* lead creation
* contact reveal
* payment webhook processing
* notification creation
* ad event tracking

Load tests must not:

* spam real OTP/SMS/email users
* create fake production payments
* corrupt production data
* bypass rate limits without test plan
* run against production without approval

Use staging or controlled test environment.

---

## 62. Load Test Metrics

Track:

* requests per second
* average response time
* p95 response time
* p99 response time
* error rate
* database CPU/load
* slow queries
* memory usage
* cache hit rate
* CDN hit rate
* provider latency
* job queue delay
* rate limit hit rate
* frontend Web Vitals
* upload throughput
* webhook processing time

Results must be documented honestly.

---

## 63. Staging Deployment Checklist

Before production:

* staging environment updated
* staging env vars configured
* staging DB migrated
* staging RLS verified
* staging seed/test data safe
* staging providers test mode
* payment sandbox tested
* media storage staging tested
* admin/staff tested
* public search tested
* deployment smoke passed
* manual verification recorded
* bugs fixed or documented
* rollback plan ready

---

## 64. Production Deployment Checklist

Production deployment requires:

* Super Admin approval if major release
* backup completed
* migration reviewed
* rollback plan documented
* env vars verified
* provider live/test mode verified
* feature flags set
* maintenance mode decision
* build/lint/typecheck pass
* smoke test plan
* monitoring ready
* incident contact ready
* changelog updated
* API provider status updated
* manual verification plan ready

---

## 65. Production Launch Freeze

Before final launch, freeze high-risk changes.

Freeze includes:

* no unnecessary dependency upgrades
* no major UI rewrites
* no schema rewrites
* no payment changes without full test
* no RLS relaxation
* no provider secret changes without test
* no unreviewed legal changes
* no untested SEO mass generation
* no unapproved migration
* no fake/demo data in production

Only critical fixes allowed during freeze.

---

## 66. Launch Readiness Checklist

Launch readiness requires PASS or accepted exception for:

### Product

* homepage
* search
* property detail
* project detail
* auth/register
* role dashboards
* posting flows
* inquiry/contact reveal
* admin approval
* billing/payment if enabled
* media upload if enabled
* support/legal pages

### Security

* RLS final pass
* hidden contact pass
* private docs pass
* admin/staff protection pass
* payment webhook pass
* provider secret safety pass
* direct URL pass

### Performance

* public pages acceptable
* search indexed/paginated
* media optimized
* no unbounded admin tables
* no major Web Vitals blockers

### Legal

* Terms
* Privacy
* Refund/Cancellation
* Listing Policy
* Ads Policy
* Verification Policy
* Payment Policy
* Disclaimer
* Grievance/Support

### Operations

* backup ready
* rollback ready
* monitoring ready
* provider statuses real
* incident plan ready
* Super Admin signoff

---

## 67. Post-Deploy Verification

After deploy:

1. run smoke tests
2. check logs/errors
3. check monitoring
4. check payment webhook if payment changed
5. check provider status
6. check public homepage/search/detail
7. check hidden contact
8. check admin access
9. check RLS-sensitive pages
10. check media
11. check sitemap/noindex if SEO changed
12. document result

If critical issue found:

* use feature flag rollback
* rollback deploy
* enable maintenance mode
* patch quickly
* record incident

---

## 68. Post-Launch Monitoring

For first launch window monitor:

* uptime
* server errors
* slow routes
* database load
* auth failures
* OTP failures
* payment failures
* webhook failures
* upload failures
* hidden contact reports
* private doc access errors
* provider errors
* admin approval queue
* support tickets
* SEO crawl issues
* ad display issues
* user registration issues
* dashboard errors

Monitoring notes should be added to changelog/incident docs where needed.

---

## 69. Incident Severity Levels

Use severity levels:

| Severity | Meaning                                    |
| -------- | ------------------------------------------ |
| `SEV-1`  | critical security/payment/outage/data leak |
| `SEV-2`  | major core feature broken                  |
| `SEV-3`  | important feature degraded                 |
| `SEV-4`  | minor bug/UI issue                         |

SEV-1 examples:

* hidden contact leak
* private document leak
* service role leak
* payment activation bypass
* production site down
* admin public access
* RLS bypass
* invoice/billing data leak

---

## 70. Incident Response Process

Incident response:

1. detect
2. classify severity
3. assign owner
4. contain
5. disable flag/feature if needed
6. rollback if needed
7. fix root cause
8. verify
9. communicate internally
10. notify users/regulators if legally required
11. document timeline
12. add tests
13. update docs
14. monitor after fix

No hidden production incident.

---

## 71. Incident Report Format

Use format:

```txt id="incident-report-format"
Incident ID:
Severity:
Detected At:
Detected By:
Affected Environment:
Affected Features:
User Impact:
Security/Privacy Impact:
Payment Impact:
Root Cause:
Containment:
Fix:
Rollback Used:
Verification:
Follow-up Actions:
Docs Updated:
Status:
```

---

## 72. Hotfix Rules

Hotfix allowed for:

* security leak
* payment issue
* site outage
* RLS bug
* hidden contact leak
* private doc leak
* provider critical issue
* severe UI blocker
* broken deployment

Hotfix rules:

* minimal change
* backup if DB change
* rollback notes
* test focused area
* smoke test after deploy
* docs/changelog updated
* post-hotfix root cause review

---

## 73. Dependency Management

Dependency changes must:

* be reviewed
* avoid unnecessary major upgrades near launch
* check security advisories
* run build/tests
* check bundle size impact
* check provider SDK compatibility
* update lockfile intentionally
* document major dependency changes

Do not upgrade production dependencies blindly.

---

## 74. Security Scanning

Security scanning should include:

* dependency vulnerabilities
* secret scanning
* static analysis where available
* upload/file validation tests
* CSP review
* public bundle secret check
* environment variable review
* RLS policy review
* open redirect check
* XSS sanitization check

Secret leak blocks production.

---

## 75. Seed / Demo Data Rules

Seed data allowed only in dev/staging.

Production rules:

* no demo users unless clearly internal/test and hidden
* no fake listings
* no fake projects
* no fake leads
* no fake payments
* no fake invoices
* no fake verified badges
* no fake ads
* no fake analytics
* no dummy provider status
* no test OTP/payment mode as real

If demo data needed in production for onboarding, it must be explicitly labeled and not public/SEO if fake.

---

## 76. Data Cleanup Rules

Cleanup may include:

* expired temp uploads
* orphan media
* expired signed URL records
* old provider logs
* old failed jobs
* expired trials
* expired ads
* deleted listings after retention
* private docs after retention/legal approval
* old exports
* dead-letter review
* cache purge

Cleanup jobs must be safe, idempotent and audited where sensitive.

---

## 77. Export Performance And Safety

Large exports must:

* run in background
* be permission-gated
* be audited
* use private signed download
* expire
* paginate internally
* redact sensitive fields unless permitted
* not overload DB
* notify when ready
* not expose raw secrets/private docs accidentally

---

## 78. Admin Performance Rules

Admin modules must:

* paginate
* index filters
* lazy-load details
* avoid loading private docs until requested
* avoid loading raw media in tables
* use thumbnails
* use detail drawer/page
* cache safe lookup data
* avoid global counts if expensive
* use background jobs for exports
* no unbounded audit log reads

Admin performance bugs can affect operations.

---

## 79. Dashboard Performance Rules

Dashboards must:

* show summary quickly
* lazy-load secondary modules
* paginate lists
* use cards on mobile
* avoid heavy charts initially
* use real counts only
* show setup-required for analytics if missing
* no fake stat placeholders
* no public cache of private data
* handle empty state efficiently

---

## 80. Public UI Performance Rules

Public UI must:

* avoid huge hero images
* use optimized fonts
* avoid layout shift
* lazy-load below fold sections
* avoid blocking on ad/provider data
* avoid blocking on maps
* use fast search/cards
* use responsive images
* defer non-critical JS
* minimize third-party scripts
* load legal/CMS pages fast

---

## 81. QA Documentation Updates

After every major phase/change, update:

* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`
* `BUGS_AND_FIXES.md`
* `MANUAL_VERIFICATION.md`
* `API_PROVIDER_STATUS.md` if providers changed
* `DEPLOYMENT_ROLLBACK.md` if deployment/rollback changed
* `SECURITY_RLS_CHECKLIST.md` if security/RLS changed
* `PERFORMANCE_CHECKLIST.md` if performance changed
* `brain.md` with resume notes

Claude final response after implementation must mention:

* changed files
* SQL migrations
* tests run
* verification result
* pending items
* setup-required providers
* rollback notes if relevant

---

## 82. Release Notes Format

Use release notes format:

```txt id="release-notes-format"
Release:
Date:
Environment:
Summary:
Changed Features:
Changed Files:
SQL Migrations:
Provider Changes:
Feature Flags:
Security/RLS Changes:
Performance Changes:
Tests Run:
Manual Verification:
Known Issues:
Rollback Plan:
Status:
```

---

## 83. Rollback Notes Format

Use rollback notes format:

```txt id="rollback-notes-format"
Change:
Risk:
Rollback Type:
Code Rollback:
Database Rollback:
Feature Flag Rollback:
Provider Rollback:
Cache/CDN Purge:
Data Risk:
Verification After Rollback:
Owner:
```

---

## 84. Production Signoff Format

Use production signoff format:

```txt id="production-signoff-format"
Production Launch Signoff
Date:
Version/Commit:
Super Admin:
Product Status:
Security/RLS Status:
Payment Status:
Provider Status:
Performance Status:
Backup Status:
Rollback Status:
Manual Verification Status:
Known Exceptions:
Approved: Yes/No
Notes:
```

No production launch without approval.

---

## 85. Feature Registry Items Required

`FEATURE_REGISTRY.md` must track:

* performance baseline
* Core Web Vitals
* database indexes
* pagination
* search performance
* media optimization
* caching strategy
* private no-store rules
* cache revalidation
* background jobs
* provider timeouts
* monitoring
* alerting
* error tracking
* staging environment
* production environment
* deployment checklist
* build gates
* SQL migration rules
* destructive migration rules
* backup strategy
* restore testing
* RPO/RTO
* rollback strategy
* feature flag rollback
* maintenance mode
* QA process
* smoke tests
* regression tests
* RLS tests
* payment tests
* provider tests
* media tests
* SEO tests
* responsive QA
* accessibility QA
* load testing
* production launch checklist
* post-launch monitoring
* incident response
* hotfix process
* dependency scanning
* seed/demo cleanup
* release notes
* production signoff

Each item must have real status.

---

## 86. Common Bugs To Track

Create bug if:

* unbounded database read
* missing pagination
* search slow
* public page loads private data
* private data cached publicly
* hidden contact cached/public
* stale deleted listing public
* stale paused ad public
* no index on common search filter
* huge original image used in card
* video blocks LCP
* admin table loads all rows
* dashboard fake stats shown
* provider call hangs page
* checkout activates on client callback
* webhook duplicate double-activates
* invalid webhook accepted
* deployment without backup
* migration without rollback notes
* destructive migration without approval
* production uses test payment as live
* production uses mock OTP
* provider status fake active
* no RLS test before PASS
* direct URL bypass works
* sitemap includes private URL
* feature flag frontend-only for sensitive feature
* rollback untested
* smoke test skipped
* manual verification vague
* launch signoff missing
* secret exposed in bundle/logs
* error tracking logs private data

---

## 87. Current Performance/Deployment/QA Status

As of this documentation generation stage:

| Area                        | Status                |
| --------------------------- | --------------------- |
| Performance baseline        | `NOT_STARTED`         |
| Core Web Vitals measurement | `NOT_STARTED`         |
| Database index audit        | `NOT_STARTED`         |
| Pagination enforcement      | `NOT_STARTED`         |
| Search performance          | `NOT_STARTED`         |
| Media optimization          | `SETUP_REQUIRED`      |
| Caching strategy            | `DOCUMENTED_BASELINE` |
| Private no-store rules      | `DOCUMENTED_BASELINE` |
| Cache revalidation          | `NOT_STARTED`         |
| Background jobs             | `SETUP_REQUIRED`      |
| Provider timeouts           | `NOT_STARTED`         |
| Monitoring                  | `SETUP_REQUIRED`      |
| Alerting                    | `SETUP_REQUIRED`      |
| Error tracking              | `SETUP_REQUIRED`      |
| Staging environment         | `NOT_STARTED`         |
| Production environment      | `NOT_STARTED`         |
| Build gates                 | `NOT_STARTED`         |
| SQL migration rules         | `DOCUMENTED_BASELINE` |
| Destructive migration rules | `DOCUMENTED_BASELINE` |
| Backup strategy             | `DOCUMENTED_BASELINE` |
| Restore testing             | `NOT_STARTED`         |
| RPO/RTO                     | `NOT_STARTED`         |
| Rollback strategy           | `DOCUMENTED_BASELINE` |
| Feature flags               | `NOT_STARTED`         |
| Maintenance mode            | `NOT_STARTED`         |
| QA process                  | `DOCUMENTED_BASELINE` |
| Smoke tests                 | `NOT_STARTED`         |
| Regression tests            | `NOT_STARTED`         |
| RLS tests                   | `NOT_STARTED`         |
| Payment tests               | `SETUP_REQUIRED`      |
| Provider tests              | `SETUP_REQUIRED`      |
| Media tests                 | `SETUP_REQUIRED`      |
| SEO tests                   | `NOT_STARTED`         |
| Responsive QA               | `NOT_STARTED`         |
| Accessibility QA            | `NOT_STARTED`         |
| Load testing                | `NEEDS_LOAD_TEST`     |
| Production launch checklist | `DOCUMENTED_BASELINE` |
| Post-launch monitoring      | `SETUP_REQUIRED`      |
| Incident response           | `DOCUMENTED_BASELINE` |
| Hotfix process              | `DOCUMENTED_BASELINE` |
| Dependency scanning         | `NOT_STARTED`         |
| Seed/demo cleanup           | `NOT_STARTED`         |
| Production signoff          | `NOT_STARTED`         |

---

## 88. Documentation Generation Progress

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
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Created |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Created |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Created |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 89. Related Documents

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
* `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`
* `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
* `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`
* `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
* `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md`
* implementation prompts
* manual verification prompts
* SQL migrations
* RLS policies

---

## 90. Final Performance/Deployment/QA Rule

Performance must be measured.

Search must be paginated and indexed.

Admin tables must be paginated.

Private data must not be cached publicly.

Public pages must use public-safe data.

Media must be optimized.

Provider failures must be timeout-safe.

Production deployment requires backup.

SQL migrations require rollback notes.

Destructive changes require approval and backup.

RLS/security checks must pass before production.

Payment webhook verification must pass before payment launch.

Provider status must be honest.

Smoke tests must run after deployment.

Manual verification must be specific.

Rollback plan must exist.

Production launch requires Super Admin signoff.

No fake performance.

No fake deployment PASS.

No fake rollback readiness.

No fake QA.

No fake launch signoff.

No fake PASS.
