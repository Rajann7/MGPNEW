# prompts/01_PROJECT_SETUP_BASELINE.md

# My Gujarat Property — Prompt 01: Project Setup Baseline

This prompt is for Claude Code.

Use this prompt to establish the safe technical baseline for **My Gujarat Property** before implementing major features.

This phase must prepare the project for future phases without skipping documentation, security, provider status, environment setup, build checks or rollback discipline.

Do not implement full auth, full listing system, full payment, full media upload, full admin panel or full provider integrations in this phase unless they already exist and only need baseline documentation/fixes.

Do not fake completion.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/01_PROJECT_SETUP_BASELINE.md
Prompt Number: 01
Phase: Project Setup Baseline
Type: Implementation Prompt
Matching Verification Prompt: prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md
```

---

## 2. Phase Purpose

The purpose of this phase is to create or verify a clean project baseline.

This includes:

* project structure inspection
* framework/config baseline
* package/script baseline
* TypeScript/lint/build baseline
* environment variable baseline
* Supabase baseline placeholders
* provider setup-required placeholders
* docs update baseline
* feature registry baseline
* changelog baseline
* bug tracking baseline
* manual verification baseline
* security/performance/deployment checklist baseline
* Claude Code workflow readiness
* folder conventions
* migration conventions
* safe provider status documentation
* no fake data policy enforcement
* no dead route/link baseline checks
* no secret exposure baseline checks
* final phase summary format

This phase prepares the project for all later implementation prompts.

---

## 3. Required Docs To Read First

Before editing, read these files:

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
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Read only additional docs if the current project already contains related implemented features that need baseline verification.

Do not paste large docs into the final response.

Use file paths and concise summaries.

---

## 4. Current Project Inspection Required

Before making changes, inspect:

```txt id="inspect-required"
package.json
package-lock.json / pnpm-lock.yaml / yarn.lock / bun.lockb
next.config.*
tsconfig.json
eslint.config.* / .eslintrc.*
tailwind.config.* / postcss.config.*
src/ or app/
components/
lib/
utils/
supabase/
middleware.*
.env.example
README.md
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
```

Also inspect if present:

```txt id="inspect-optional"
src/app/
src/components/
src/lib/
src/server/
src/types/
src/config/
src/features/
src/styles/
src/middleware.ts
supabase/migrations/
supabase/seed.sql
docs/
prompts/
scripts/
tests/
e2e/
playwright.config.*
vitest.config.*
jest.config.*
.env.local
```

Do not assume blank project.

Do not overwrite working code blindly.

---

## 5. Approved Technical Direction

Use the documented technical direction unless existing project architecture requires safe compatibility:

* Next.js app architecture
* React
* TypeScript
* Supabase Auth/Database/RLS
* server-side security first
* no service role key on client
* mobile-first UI
* public-safe views for public pages
* environment-driven providers
* feature flags for risky/incomplete modules
* SQL migrations for DB changes
* docs updated after every phase
* no fake provider/payment/upload/analytics/status

If current project differs, document the difference and do not rewrite architecture without approval.

---

## 6. Baseline Implementation Scope

This phase may include:

### 6.1 Project Structure

* ensure clear folder structure
* create missing baseline folders if safe
* avoid duplicate structures
* align with current Next.js app structure
* keep root docs in place
* ensure `docs/` and `prompts/` folders exist
* ensure `supabase/migrations/` exists if Supabase is used/planned
* ensure reusable `lib/`, `components/`, `types/`, `config/` structure where appropriate

### 6.2 Package Scripts

Verify or add scripts for:

* dev
* build
* start
* lint
* typecheck if available
* test if test setup exists
* format if formatter exists
* db/migration commands if already used
* verification helper scripts if present

Do not add unnecessary dependencies without reason.

### 6.3 Environment Baseline

Ensure `.env.example` exists and contains placeholders only.

Include placeholders for expected providers without real secrets.

### 6.4 Supabase Baseline

Prepare baseline Supabase conventions:

* client/server helper location
* migration folder convention
* RLS reminder comments/docs
* env placeholders
* no service role client exposure
* setup-required provider status

Do not implement full auth/RLS foundation in this phase unless already partially present and needs safe repair.

### 6.5 Docs Baseline

Update project memory docs after changes:

* `brain.md`
* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`
* `BUGS_AND_FIXES.md` if issues found
* `MANUAL_VERIFICATION.md`
* `API_PROVIDER_STATUS.md`
* `DEPLOYMENT_ROLLBACK.md`
* `SECURITY_RLS_CHECKLIST.md`
* `PERFORMANCE_CHECKLIST.md`

### 6.6 Build/Quality Baseline

Run available checks:

* package install status
* lint
* typecheck
* build
* tests if available

If commands fail, fix safe baseline errors where in scope.

If not fixable in scope, document exact failure.

---

## 7. Out Of Scope For This Phase

Do not implement these full features in Prompt 01:

* full mobile OTP auth
* full Owner/Broker/Builder registration
* full admin/staff login
* complete RLS policy set
* property posting system
* project posting system
* requirement posting system
* lead/CRM system
* payment/Razorpay
* subscription billing
* media upload/R2/CDN
* ads/promotions
* notification delivery
* Google Maps integration
* WhatsApp API
* CMS/blog/legal full system
* advanced analytics
* PWA
* full admin dashboard
* full public search/detail/profile SEO

Only prepare baseline foundation and documentation for later phases.

If any of these already exist, inspect and document current status, but do not expand them beyond baseline stabilization.

---

## 8. Preservation Rules

Preserve working existing features.

Especially preserve:

* existing guest homepage
* existing owner homepage
* existing header
* existing city selector
* existing approved UI
* existing working routes
* existing components
* existing docs
* existing migrations

Do not remove working code without explicit approval.

Do not replace the existing homepage/header/city selector unless fixing a clear bug.

Old homepage hero copy, if present, must only be placed later into the Hero Search Section under existing header during the relevant public UI phase.

---

## 9. Recommended Folder Conventions

Use or align with existing structure.

Recommended shape:

```txt id="recommended-folder-structure"
src/
  app/
  components/
    ui/
    layout/
    public/
    dashboard/
    admin/
    forms/
    media/
    search/
    notifications/
    billing/
    support/
  lib/
    supabase/
    auth/
    db/
    validators/
    providers/
    security/
    permissions/
    feature-flags/
    seo/
    utils/
  config/
  types/
  styles/
supabase/
  migrations/
  seed.sql
docs/
prompts/
scripts/
tests/
```

Do not create all folders if unnecessary.

Create only useful baseline folders.

Avoid duplicate folders like both `lib/supabase` and `src/lib/supabase` unless the project already uses them intentionally.

---

## 10. Environment Variables Baseline

Ensure `.env.example` uses placeholder names only.

Potential placeholders:

```txt id="env-example-baseline"
# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=My Gujarat Property
NODE_ENV=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OTP / SMS
OTP_PROVIDER=
OTP_API_KEY=
SMS_PROVIDER=
SMS_API_KEY=

# Email
EMAIL_PROVIDER=
RESEND_API_KEY=
SENDGRID_API_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# WhatsApp
WHATSAPP_MODE=
WHATSAPP_BUSINESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=

# Payments
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
RAZORPAY_MODE=

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
GOOGLE_MAPS_SERVER_KEY=

# Storage / CDN
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_PUBLIC_BUCKET_NAME=
R2_PRIVATE_BUCKET_NAME=
R2_PUBLIC_BASE_URL=
R2_ENDPOINT=
CDN_PUBLIC_BASE_URL=
CLOUDFLARE_ZONE_ID=
CLOUDFLARE_API_TOKEN=

# Security
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Analytics / Monitoring
ANALYTICS_PROVIDER=
ERROR_TRACKING_DSN=

# Jobs / Cron
CRON_SECRET=

# Push
WEB_PUSH_PUBLIC_KEY=
WEB_PUSH_PRIVATE_KEY=
WEB_PUSH_SUBJECT=
```

Rules:

* `.env.example` must not contain real secrets.
* Do not print real `.env.local` values.
* Do not commit secrets.
* If `SUPABASE_SERVICE_ROLE_KEY` exists, ensure docs say server-only.
* Client-exposed keys must start with `NEXT_PUBLIC_` only when intentionally public.

---

## 11. Provider Status Baseline

Update `API_PROVIDER_STATUS.md` with baseline statuses.

Providers likely start as:

| Provider              | Baseline Status                         |
| --------------------- | --------------------------------------- |
| Supabase Auth         | `SETUP_REQUIRED` or current real status |
| Supabase Database     | `SETUP_REQUIRED` or current real status |
| Supabase RLS          | `NOT_STARTED` or current status         |
| OTP Provider          | `SETUP_REQUIRED`                        |
| SMS Provider          | `SETUP_REQUIRED`                        |
| Email Provider        | `SETUP_REQUIRED`                        |
| WhatsApp Free Link    | `NOT_STARTED`                           |
| WhatsApp Business API | `SETUP_REQUIRED`                        |
| Razorpay              | `SETUP_REQUIRED`                        |
| Google Maps           | `SETUP_REQUIRED`                        |
| Cloudflare R2         | `SETUP_REQUIRED`                        |
| Cloudflare CDN        | `SETUP_REQUIRED`                        |
| Turnstile             | `SETUP_REQUIRED`                        |
| Analytics             | `SETUP_REQUIRED`                        |
| Error Tracking        | `SETUP_REQUIRED`                        |
| Cron/Jobs             | `SETUP_REQUIRED`                        |
| PDF Generation        | `SETUP_REQUIRED`                        |
| Push Notifications    | `SETUP_REQUIRED`                        |

If any provider is already configured and tested, record accurate current status.

Never mark provider `ACTIVE` without actual test evidence.

---

## 12. Baseline Feature Registry Updates

Update `FEATURE_REGISTRY.md` for Prompt 01.

Feature items should include at minimum:

* project setup baseline
* project structure
* package scripts
* env example
* Supabase env placeholders
* migration folder convention
* provider status baseline
* docs update workflow
* build/lint/typecheck baseline
* security checklist baseline
* performance checklist baseline
* deployment/rollback baseline
* no fake data rule
* no secret exposure rule
* prompt pack usage rule
* brain resume workflow

Use accurate statuses:

* `DONE`
* `PARTIAL`
* `BLOCKED`
* `SETUP_REQUIRED`
* `NOT_STARTED`

Do not mark future features done.

---

## 13. Changelog Entry Required

Add a `CHANGELOG.md` entry for Prompt 01.

Entry must include:

* date
* prompt name
* summary
* changed files
* migration files if any
* provider status changes
* docs updated
* tests/checks run
* verification status
* known issues
* rollback notes

---

## 14. Bugs And Fixes Rule

If inspection finds issues, add to `BUGS_AND_FIXES.md`.

Possible baseline bugs:

* missing `.env.example`
* real secret in `.env.example`
* build fails
* typecheck fails
* lint fails
* duplicate route
* broken import
* missing required root doc
* provider status fake active
* public admin link
* hardcoded fake data
* service role usage in client code
* missing migration folder
* dead homepage link
* horizontal overflow in existing approved UI
* package script missing

Use bug IDs with date.

Example:

```txt id="baseline-bug-id-example"
BUG-20260629-SETUP-001
```

---

## 15. Manual Verification Baseline Entry

Update `MANUAL_VERIFICATION.md` with Prompt 01 initial verification state.

Do not mark PASS yet unless matching manual verification prompt is run and passes.

For this implementation prompt, mark:

* implementation status
* checks run
* verification pending
* matching prompt to run next

Expected status after implementation:

```txt id="baseline-verification-pending"
Prompt 01 implementation complete; manual verification pending via prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md
```

---

## 16. Security Checklist Baseline

Update `SECURITY_RLS_CHECKLIST.md` for baseline.

At minimum include:

* service role client exposure check
* `.env.example` secrets check
* public/private route baseline
* RLS not fully implemented yet
* provider secrets setup-required
* admin not implemented yet
* hidden contact not implemented yet
* payment not implemented yet
* media not implemented yet
* direct URL tests pending
* future phase dependency notes

Do not mark RLS final PASS in Prompt 01.

---

## 17. Performance Checklist Baseline

Update `PERFORMANCE_CHECKLIST.md` for baseline.

At minimum include:

* build baseline
* package scripts
* pagination rules documented
* indexes future phase
* image optimization future phase
* caching rules documented
* private no-store rule documented
* load testing not started
* provider timeouts future phase
* Core Web Vitals not measured yet

Use honest status.

---

## 18. Deployment Rollback Baseline

Update `DEPLOYMENT_ROLLBACK.md`.

Baseline should include:

* current environment
* backup requirement before DB changes
* migration convention
* rollback approach
* feature flag future requirement
* deployment checks
* build/lint/typecheck status
* no production launch yet
* manual verification pending

If code changed, include rollback notes.

---

## 19. Brain Update Required

Update `brain.md` at the end.

Include:

* Prompt 01 status
* files changed
* checks run
* blockers
* setup-required providers
* bugs found
* next prompt to run:

  * `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md`
* exact resume instruction

Example:

```txt id="brain-resume-example"
Next step: Run prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md to verify the Project Setup Baseline before starting Prompt 02.
```

---

## 20. SQL Migration Rule For This Phase

Prompt 01 should avoid database schema changes unless required for baseline.

If DB changes are needed:

* create migration under `supabase/migrations/`
* include purpose comments
* include rollback notes
* do not create full auth/listing/payment schema in this phase
* update docs
* update security checklist
* update deployment rollback

Allowed baseline DB work:

* create migrations folder
* add README/convention
* inspect existing migrations
* fix obviously broken migration naming if safe
* document current schema status

Full tables/RLS should be in later phases.

---

## 21. Dependency Rule

Do not add dependencies casually.

Add dependency only if:

* needed for baseline
* aligned with docs
* does not create large bundle risk
* does not conflict with existing stack
* install/build tested
* documented in changelog

Avoid adding provider SDKs in Prompt 01 unless current code already requires them.

Provider SDKs should be added in relevant provider phases.

---

## 22. Package Manager Rule

Detect and use existing package manager.

Use:

* npm if `package-lock.json`
* pnpm if `pnpm-lock.yaml`
* yarn if `yarn.lock`
* bun if `bun.lockb`

Do not create multiple lockfiles.

If multiple lockfiles already exist, document as bug and ask/choose safely based on project convention.

---

## 23. README Baseline

If `README.md` exists, update only if necessary.

README may include:

* project name
* setup command
* env setup
* dev command
* build command
* docs reference
* prompt usage reference
* provider setup-required note
* security note

Do not paste huge documentation into README.

Point to docs.

---

## 24. No Fake Data Baseline

Search for and document obvious fake/demo data.

Fake data can include:

* hardcoded leads
* fake views
* fake analytics
* fake payments
* fake invoices
* fake verified badges
* fake RERA status
* fake users
* fake properties/projects
* fake provider active state
* fake notifications

If demo data is used for development UI, ensure:

* it is clearly dev-only
* not shown as production real
* not indexed
* not used for final PASS
* documented as cleanup requirement

---

## 25. Secret Exposure Baseline

Check for obvious secret exposure:

* `.env.example` real values
* committed `.env`
* hardcoded API keys
* service role in client files
* provider secrets in code
* webhook secrets in code
* storage keys in public config
* raw tokens in docs

If found:

* do not print secret in final response
* redact in docs
* create critical bug
* recommend rotation
* remove from tracked files where safe
* update security checklist

---

## 26. Existing UI Baseline Check

If existing homepage/header/city selector is present:

Check briefly:

* page loads
* no obvious import error
* brand visible
* city selector present
* no public admin link
* no fake provider success
* no obvious dead links
* no obvious horizontal overflow at baseline if easy to inspect

Do not fully redesign.

UI implementation is Prompt 03.

---

## 27. Baseline Routes

Document current route structure.

Expected future route areas:

```txt id="future-routes"
/
 /search
 /property/[slug]
 /project/[slug]
 /broker/[slug]
 /builder/[slug]
 /dashboard
 /dashboard/owner
 /dashboard/broker
 /dashboard/builder
 /admin
 /admin/login
 /pricing
 /support
 /blog
 /legal/*
```

Prompt 01 does not need to create all routes.

It should document existing routes and gaps.

---

## 28. Baseline Supabase Client Rule

If Supabase client helpers exist, inspect for:

* browser client uses anon key only
* server client uses secure cookies/session where relevant
* service role not exported to client
* env variable names correct
* errors safe
* no broad direct public queries leaking data

If helpers do not exist, you may create minimal safe placeholders only if needed by existing app.

Full auth foundation belongs to Prompt 02.

---

## 29. Baseline Middleware Rule

If middleware exists, inspect for:

* no broken route handling
* no public admin access if admin already exists
* no redirect loops
* no hardcoded fake role
* no service role usage
* safe public route handling

Do not implement full auth middleware in Prompt 01 unless needed to fix broken baseline.

Prompt 02 handles auth/role guards.

---

## 30. Baseline Type System Rule

Add or verify central types only if useful.

Possible baseline types:

* `FeatureStatus`
* `ProviderStatus`
* `UserRole`
* `PublicRole`
* `InternalRole`
* `VerificationStatus`
* `ApprovalStatus`

Do not overbuild full domain model in Prompt 01.

Full property/project/requirement matrices come later.

---

## 31. Baseline Constants Rule

Create safe constants only if useful.

Possible constants:

* app name
* app URL env helper
* role labels
* status labels
* provider status labels
* responsive widths reference
* setup-required message

Do not hardcode fake business data.

---

## 32. Baseline Feature Flag Rule

If feature flag system already exists, inspect and document.

If not, Prompt 01 may define convention only.

Do not implement full feature flag admin in this phase.

Feature flags must later be backend-enforced for sensitive features.

---

## 33. Baseline Error Handling Rule

Ensure baseline error handling does not expose:

* SQL errors
* stack traces in production UI
* provider secrets
* service role
* hidden contact
* private docs

If obvious raw error UI exists, document or fix if safe.

---

## 34. Baseline Security Headers Rule

If config supports headers, inspect existing security headers.

Do not overcomplicate unless already in project.

Document future setup for:

* CSP
* Referrer-Policy
* X-Content-Type-Options
* frame-ancestors/X-Frame-Options
* Permissions-Policy
* HSTS production

Full security hardening is Prompt 13/14.

---

## 35. Baseline SEO Rule

Prompt 01 may verify basic metadata only.

Do not implement full SEO system here.

Baseline checks:

* app title not generic if easy
* no admin/dashboard sitemap if already exists
* no private metadata in public pages
* no fake schema
* no fake review/rating

Full SEO is Prompt 05 and Prompt 11.

---

## 36. Baseline Accessibility Rule

Prompt 01 may document baseline accessibility expectations.

Do not fully audit all UI here.

If obvious severe issue in existing baseline UI appears, document bug.

Full UI/accessibility verification is later prompts.

---

## 37. Baseline Tests To Run

Run available commands based on package manager.

Examples:

```txt id="baseline-test-commands-npm"
npm run lint
npm run typecheck
npm run build
npm test
```

Or:

```txt id="baseline-test-commands-pnpm"
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

If scripts do not exist, document:

* script missing
* whether added
* whether test setup deferred

Do not claim tests passed if command was not run.

---

## 38. Baseline Build Failure Handling

If build fails:

1. read error
2. identify if caused by baseline issue
3. fix if safe and in scope
4. rerun build
5. if still failing, document exact error summary
6. create bug
7. mark phase `PARTIAL` or `FAIL`
8. do not mark PASS

Do not hide build failure.

---

## 39. Baseline Lint Failure Handling

If lint fails:

* fix safe lint errors in touched files
* avoid massive unrelated rewrite
* document existing lint debt if out of scope
* create bug if blocking
* do not mark lint PASS if failing

---

## 40. Baseline Typecheck Failure Handling

If typecheck fails:

* fix safe type errors in scope
* do not use `any` to silence important errors unless documented
* do not ignore typecheck globally
* document existing type debt
* create bug if blocking

---

## 41. Baseline Final Implementation Checklist

Before final response, verify:

* relevant docs read
* project inspected
* package manager identified
* structure documented
* `.env.example` reviewed/updated
* provider statuses documented
* root docs updated
* feature registry updated
* changelog updated
* bugs documented if found
* manual verification entry updated
* security checklist updated
* performance checklist updated
* deployment rollback updated
* brain updated
* checks run or documented
* next prompt identified

---

## 42. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
.env.example
README.md
package.json
tsconfig.json
next.config.*
eslint.config.*
src/lib/*
src/config/*
supabase/migrations/.gitkeep
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

Only change files that are actually needed.

Do not modify every file just to show activity.

---

## 43. Expected Output Files From This Phase

This phase should leave the project with:

* clear baseline docs
* accurate provider statuses
* accurate feature statuses
* package scripts understood
* env placeholders documented
* migration convention ready
* build/check status known
* blockers documented
* next verification prompt ready

---

## 44. Forbidden In This Phase

Do not:

* implement fake auth
* implement fake OTP
* implement fake payment
* implement fake media upload
* implement fake analytics
* implement fake provider status
* add hardcoded fake listings
* add fake admin user
* expose service role
* disable RLS
* bypass future security
* create full schema prematurely
* break existing homepage/header/city selector
* remove working routes
* add AI features
* mark production ready
* mark RLS final pass
* mark payment pass
* mark provider active without testing

---

## 45. Phase Completion Status Rules

After running this prompt, status can be:

### `PASS`

Only if:

* baseline setup completed
* docs updated
* checks pass
* no blocking build/type/lint issues
* provider statuses honest
* no secret exposure
* no fake data introduced
* manual verification prompt later confirms

Usually implementation prompt alone should not final PASS until matching verification prompt runs.

### `PARTIAL`

Use if:

* baseline mostly prepared
* some checks fail
* docs updated
* blockers documented
* manual verification pending

### `BLOCKED`

Use if:

* project cannot install/build due to missing critical dependency
* files missing/corrupt
* permissions/tooling unavailable
* unclear architecture requires owner decision

### `SETUP_REQUIRED`

Use for:

* missing Supabase env
* missing providers
* missing R2/Razorpay/OTP/etc.

---

## 46. Final Response Required Format

Return final response in this format:

```txt id="prompt-01-final-response-format"
Summary:
- baseline work completed

Project inspection:
- package manager:
- framework:
- important existing routes/components:
- existing provider setup:

Changed files:
- path list

SQL migrations:
- path list or none

Docs updated:
- path list

Provider status:
- provider/status summary

Security/RLS:
- baseline checks and status

Performance:
- baseline checks and status

Tests/checks run:
- command: result

Bugs/issues found:
- bug IDs or none

Setup-required:
- provider/config list

Rollback notes:
- how to revert this baseline change

Manual verification:
- pending prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md

Next step:
- run prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md
```

Do not use vague “done”.

---

## 47. Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md
```

Do not start Prompt 02 until Prompt 01 manual verification is completed or the user/Super Admin explicitly accepts a documented PARTIAL/BLOCKED state.

---

## 48. Common Baseline Bugs To Watch For

Create/track bugs for:

* missing `.env.example`
* real secrets in `.env.example`
* service role key in client code
* broken build
* missing lint script
* missing typecheck script
* multiple lockfiles
* provider marked active without config/test
* fake demo data in public UI
* public admin link
* broken homepage import
* dead link in header/footer
* missing docs update
* missing migration folder
* RLS disabled
* raw SQL/provider error displayed
* package install failure
* TypeScript config broken
* path alias broken
* tailwind not loading
* old generated files inconsistent with docs
* `brain.md` not updated

---

## 49. Quality Bar

This phase is successful when a future Claude Code session can start from the project and clearly know:

* what the project is
* what stack it uses
* where docs are
* how to run it
* what providers are setup-required
* what is implemented
* what is not implemented
* what checks pass/fail
* what migration convention exists
* what security rules must never be skipped
* what prompt to run next

---

## 50. Final Rule For Prompt 01

Set up the baseline.

Inspect before editing.

Preserve working code.

Do not overbuild future phases.

Do not fake provider status.

Do not fake payment.

Do not fake auth.

Do not fake analytics.

Do not fake upload.

Do not expose secrets.

Do not disable RLS.

Do not skip docs.

Do not skip checks.

Do not skip `brain.md`.

Do not mark PASS without verification.

No fake completion.
