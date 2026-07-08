# docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md

# My Gujarat Property — Claude Workflow, Token-Light Rules, Context Discipline And Phase Execution Guide

This document defines how Claude Code must work on **My Gujarat Property**.

The goal is to build the full project with high quality, strong security, good performance and complete documentation while keeping prompts token-light and avoiding repeated large context pastes.

Claude must follow this document before starting any implementation phase.

---

## 1. Purpose

This document exists to make Claude Code work safely and efficiently.

It explains:

* how Claude should read docs
* how to keep prompts token-light
* how to avoid repeating huge documents
* how to preserve context across chats
* how two Claude accounts can continue the same project
* how to start each phase
* how to finish each phase
* how to update memory docs
* how to update feature registry
* how to update changelog
* how to update bugs/fixes
* how to update manual verification
* how to handle SQL migrations
* how to handle RLS/security
* how to handle providers
* how to handle deployment/rollback
* how to handle incomplete work
* how to avoid fake completion
* how to produce final answers
* how to save tokens without skipping quality

This file is workflow-level documentation, not product feature documentation.

---

## 2. Main Workflow Principle

Claude must not depend on chat memory.

Claude must use project files as the source of truth.

Before making changes, Claude should read the relevant files from the repo.

After making changes, Claude must update the relevant memory and tracking files.

The project must be resumable by another Claude account using only repo files.

---

## 3. Token-Light Rule

Prompts must stay short and reference files instead of pasting large docs again.

Do not paste all docs into every prompt.

Instead, tell Claude:

* which files to read
* which phase prompt to follow
* which verification prompt to run
* which docs to update
* which final response format to use

Example token-light instruction:

```md id="token-light-example"
Read:
- CLAUDE.md
- brain.md
- FEATURE_REGISTRY.md
- CHANGELOG.md
- BUGS_AND_FIXES.md
- MANUAL_VERIFICATION.md
- docs/01_PROJECT_MASTER_AND_SCOPE.md
- prompts/02_AUTH_ROLES_RLS_FOUNDATION.md

Then implement Phase 02.
Update all required docs.
Run verification using prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md.
Do not mark PASS unless verification passes.
```

This is preferred over pasting the full project specification repeatedly.

---

## 4. Quality Must Not Be Reduced To Save Tokens

Token-light does not mean low quality.

Claude must never save tokens by skipping:

* security
* RLS
* server-side authorization
* provider safety
* payment verification
* hidden contact privacy
* private document privacy
* SQL migrations
* rollback notes
* manual verification
* responsive checks
* docs updates
* bug tracking
* performance checks
* final summary

Token-light means: reference stable docs by path and write concise prompts.

It does not mean: ignore requirements.

---

## 5. Files Claude Must Know

Claude must know this root documentation structure.

### 5.1 Root Memory And Control Files

Claude must frequently read/update:

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

### 5.2 Detailed Docs

Claude must read the relevant detailed docs for the phase:

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
* `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`
* `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md`

### 5.3 Prompt Files

Claude must implement using the phase prompt files:

* `prompts/00_PROMPT_USAGE_RULES.md`
* `prompts/01_PROJECT_SETUP_BASELINE.md`
* `prompts/02_AUTH_ROLES_RLS_FOUNDATION.md`
* `prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`
* `prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`
* `prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`
* `prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md`
* `prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`
* `prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`
* `prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`
* `prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md`
* `prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md`
* `prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`
* `prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`
* `prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`
* `prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`

### 5.4 Manual Verification Prompt Files

Claude must verify using the matching manual verification prompt:

* `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md`
* `prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md`
* `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`
* `prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`
* `prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`
* `prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md`
* `prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`
* `prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`
* `prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`
* `prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md`
* `prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md`
* `prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`
* `prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`
* `prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`
* `prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`

---

## 6. Recommended Claude Code Session Start

At the beginning of a new Claude Code session, use a short prompt like:

```md id="session-start-template"
You are working on My Gujarat Property.

Read first:
- CLAUDE.md
- brain.md
- FEATURE_REGISTRY.md
- CHANGELOG.md
- BUGS_AND_FIXES.md
- MANUAL_VERIFICATION.md
- API_PROVIDER_STATUS.md
- DEPLOYMENT_ROLLBACK.md
- SECURITY_RLS_CHECKLIST.md
- PERFORMANCE_CHECKLIST.md

Then read the relevant docs and prompt files for the phase I give you.

Do not depend on chat memory.
Do not skip docs updates.
Do not fake PASS.
```

Then provide the specific phase prompt file.

---

## 7. Claude Must Inspect Existing Project Before Changing

Before making code changes, Claude must inspect:

* current routes
* current components
* current server actions
* current API routes
* current database schema
* current SQL migrations
* current RLS policies
* current env/config files
* current providers
* current package dependencies
* current styles/design system
* current docs
* current verification status
* current bug list
* current feature registry status

Claude must not assume a file does not exist.

Claude must not create duplicates without checking.

Claude must not replace working features unless explicitly required.

---

## 8. No Duplicate Implementation Rule

Before implementing any feature, Claude must search for existing:

* route
* component
* hook
* server action
* API route
* database table
* migration
* utility
* validation schema
* type
* permission helper
* RLS policy
* provider adapter
* UI pattern
* admin module
* dashboard module

If an existing feature is found, Claude should:

1. preserve working behavior
2. extend it safely
3. refactor only if needed
4. document the change
5. avoid duplicate routes/components/tables

If duplicate exists, resolve carefully and update docs.

---

## 9. Do Not Remove Working Features Without Approval

Claude must ask before removing or disabling:

* working route
* working component
* working auth flow
* working dashboard module
* working admin module
* working SQL table
* working RLS policy
* working provider integration
* working payment flow
* working media flow
* working SEO/legal page
* existing approved design
* existing homepage/header/footer behavior

Allowed without asking:

* removing dead/unused code clearly created in same phase and not used
* fixing a bug that does not remove intended feature
* disabling unsafe feature by feature flag during security emergency
* removing fake/demo production behavior that violates project rules

Even then, document the change.

---

## 10. Ask User Approval Before High-Risk Changes

Claude must ask user approval before:

* changing core architecture
* changing auth provider
* changing database provider
* deleting tables
* dropping columns
* destructive migrations
* disabling RLS
* weakening RLS
* changing public role rules
* making admin/staff login public
* bypassing payment webhook verification
* changing payment provider
* hard deleting sensitive data
* removing existing working feature
* changing final legal claim/disclaimer meaning
* exposing private data
* making hidden contact public
* changing builder/owner/broker permission model
* changing plan/billing rules
* changing production provider mode
* skipping manual verification
* launching with critical bugs

If user says “fast” or “quick”, security rules still apply.

---

## 11. When To Use `/clear`

Use `/clear` when:

* starting a new unrelated task
* old chat context is confusing
* task is complete and next task is unrelated
* Claude starts mixing requirements
* chat becomes too long and repo docs have been updated

Before `/clear`, ensure:

* `brain.md` updated
* `FEATURE_REGISTRY.md` updated
* `CHANGELOG.md` updated
* `BUGS_AND_FIXES.md` updated if needed
* `MANUAL_VERIFICATION.md` updated
* current phase status recorded
* pending work recorded
* next step recorded

Do not use `/clear` before saving project memory.

---

## 12. When To Use `/compact`

Use `/compact` when:

* conversation is long
* same phase continues
* Claude still needs current context
* too many logs have been shared
* the task is not unrelated enough for `/clear`

Before `/compact`, make sure the latest status is in:

* `brain.md`
* `CHANGELOG.md`
* `FEATURE_REGISTRY.md`
* `BUGS_AND_FIXES.md`
* `MANUAL_VERIFICATION.md`

The compacted summary should include:

* current phase
* files changed
* SQL migrations
* tests run
* bugs
* verification result
* pending issues
* next action

---

## 13. When To Use `/context`

Use `/context` or equivalent context check when:

* Claude may be losing track
* token usage is high
* a phase has many files
* large docs were read
* output quality seems to degrade
* Claude starts missing constraints

If context is low, prioritize:

1. finish current safe checkpoint
2. update docs
3. stop with clear pending list
4. continue in new/compacted context

Do not continue risky security/payment/RLS changes if context is unreliable.

---

## 14. When To Use `/cost`

Use `/cost` or equivalent cost check when:

* long phase
* many docs
* large diff
* heavy debugging
* many tests/logs
* multiple failed attempts
* user asks about token/cost

Cost optimization must not skip verification or security.

---

## 15. Model Selection Guidance For Claude Code

Use suitable Claude models depending on work type.

### 15.1 Sonnet

Use for most coding work:

* normal feature implementation
* UI creation
* component refactor
* server actions
* docs updates
* tests
* moderate debugging
* phase implementation

### 15.2 Opus

Use for hard work:

* architecture decisions
* difficult bugs
* security/RLS design
* payment/webhook design
* database schema planning
* complex refactor
* performance bottleneck analysis
* production incident
* final production signoff review

### 15.3 Haiku

Use for small quick tasks:

* lookup within repo
* small edits
* formatting
* small docs update
* quick file search
* simple typo/rename

Model choice must not change project rules.

---

## 16. Phase-Based Workflow

Every implementation phase must follow this order.

### Step 1 — Read Required Docs

Claude must read:

* root docs
* relevant detailed docs
* relevant phase prompt
* relevant manual verification prompt
* existing code/files for that phase

### Step 2 — Inspect Existing Implementation

Claude must inspect current:

* routes
* components
* DB
* migrations
* RLS
* providers
* docs
* tests

### Step 3 — Plan

Claude should produce a short implementation plan before large changes.

Plan must include:

* files likely to touch
* SQL/migration needed or not
* provider needed or setup-required
* RLS/security impact
* UI/responsive impact
* docs to update
* verification to run

### Step 4 — Implement

Claude must implement:

* code
* types
* validation
* server checks
* RLS/migrations
* UI states
* provider setup-required states
* loading/empty/error states
* responsive behavior
* audit logs where relevant
* tests where feasible

### Step 5 — Run Checks

Claude must run or document:

* lint
* typecheck
* build
* tests
* SQL/migration validation
* RLS checks
* manual verification

### Step 6 — Fix Bugs

If errors are found:

* fix errors first
* create bug entry if needed
* retest
* do not move next with unresolved blocker

### Step 7 — Update Docs

Update:

* `brain.md`
* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`
* `BUGS_AND_FIXES.md` if bugs/workarounds
* `MANUAL_VERIFICATION.md`
* `API_PROVIDER_STATUS.md` if provider
* `SECURITY_RLS_CHECKLIST.md` if security/RLS
* `PERFORMANCE_CHECKLIST.md` if performance
* `DEPLOYMENT_ROLLBACK.md` if deployment/migration/rollback
* detailed docs if behavior changed

### Step 8 — Final Response

Claude final response must include:

* changed files
* SQL/migration files
* tests run
* verification result
* docs updated
* pending issues
* next phase

---

## 17. Required Phase Final Response Format

Claude must use this final response structure after implementation work:

```md id="phase-final-response"
## Phase Result
PASS / PARTIAL / BLOCKED / FAIL

## Summary
- What was implemented:

## Changed Files
- `path/to/file`

## SQL / Migration Files
- `path/to/migration.sql`
- or `None`

## RLS / Security
- What changed:
- Allowed/denied checks:
- Contact privacy:
- Private data:
- Provider secrets:

## Provider / API Status
- Provider:
- Status:
- Setup-required:
- Fake success blocked:

## Tests Run
- Lint:
- Typecheck:
- Build:
- Unit tests:
- E2E tests:
- SQL/migration checks:
- RLS/security checks:

## Manual Verification
- Prompt used:
- Result:
- Notes:

## Bugs / Fixes
- Bug IDs:
- Fixes:
- Remaining:

## Docs Updated
- `brain.md`
- `FEATURE_REGISTRY.md`
- `CHANGELOG.md`
- `BUGS_AND_FIXES.md`
- `MANUAL_VERIFICATION.md`
- others:

## Pending Issues
- issue or None

## Next Phase
-
```

Do not write only “done”.

---

## 18. Required Quick Final Response Format For Small Docs-Only Work

For small documentation-only updates:

```md id="short-doc-final-response"
## Result
PASS / PARTIAL / BLOCKED / FAIL

## File Updated
- `path/to/file.md`

## Summary
-

## Docs Updated
-

## Pending
-

## Next
-
```

Even documentation-only work must not fake status.

---

## 19. Feature Registry Update Rules

Claude must update `FEATURE_REGISTRY.md` whenever:

* feature starts
* feature is completed
* feature is partially completed
* feature is blocked
* feature requires provider setup
* feature is deferred
* feature fails QA
* feature is rolled back
* feature changes scope
* feature is removed with approval
* bug affects feature status
* manual verification changes status

Feature Registry status must match actual implementation.

Allowed values:

* `NOT_STARTED`
* `IN_PROGRESS`
* `DONE`
* `PARTIAL`
* `BLOCKED`
* `SETUP_REQUIRED`
* `NEEDS_REVIEW`
* `DEFERRED_TRACKED`
* `DISABLED_BY_FLAG`
* `FAILED_QA`
* `ROLLED_BACK`

Do not mark `DONE` unless verified.

---

## 20. Changelog Update Rules

Claude must update `CHANGELOG.md` after every meaningful change.

Changelog entry must mention:

* date
* phase
* summary
* changed files
* SQL/migration files
* provider impact
* RLS/security impact
* manual verification result
* bugs/fixes
* pending issues

Do not write vague changelog entries.

Bad:

```md id="bad-changelog"
Fixed stuff.
```

Good:

```md id="good-changelog"
Updated public search filters with query params, mobile bottom sheet and paginated Supabase query. Added index migration for properties city/status/purpose. Manual verification PARTIAL because map provider remains SETUP_REQUIRED.
```

---

## 21. Bugs And Fixes Update Rules

Claude must update `BUGS_AND_FIXES.md` when:

* bug found
* QA fails
* build/lint/typecheck fails
* RLS/security issue found
* hidden contact leak found
* provider issue found
* payment issue found
* responsive issue found
* performance regression found
* workaround added
* workaround removed
* bug fixed
* bug retested
* regression found

A bug is not closed until retest passes.

Critical issues must block phase PASS.

---

## 22. Manual Verification Update Rules

Claude must update `MANUAL_VERIFICATION.md` after every phase verification.

Manual verification must include:

* date
* phase
* changed files
* tests run
* role checks
* security/RLS checks
* responsive checks
* provider checks
* UI state checks
* bugs found
* fixes done
* docs updated
* final result

Allowed results:

* `PASS`
* `PARTIAL`
* `BLOCKED`
* `FAIL`

Do not mark `PASS` if verification was not run.

---

## 23. brain.md Update Rules

`brain.md` is the project memory.

Claude must update `brain.md` after:

* every phase
* every major decision
* every provider status change
* every bug/workaround that affects future work
* every architecture decision
* every incomplete feature
* every setup-required item
* every rollback
* every production launch decision
* every important user instruction

`brain.md` must include:

* current phase
* latest completed file/phase
* implementation status
* provider status
* pending work
* known blockers
* resume instructions
* what next Claude should do

This is essential for two Claude accounts.

---

## 24. SQL / Migration Workflow Rules

Any database change must create/update SQL migration files.

DB changes include:

* table create
* table alter
* column change
* enum change
* index change
* RLS policy change
* function change
* trigger change
* public-safe view change
* seed data change
* storage bucket policy change
* cron/job function change

Migration file naming:

```txt id="migration-name-rule"
supabase/migrations/YYYYMMDDHHMMSS_phase_XX_short_description.sql
```

Every migration must include:

* header
* purpose
* phase
* related docs
* tables changed
* RLS changed yes/no
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration file.

---

## 25. SQL Migration Header Template

Use this header:

```sql id="migration-header-template"
-- Migration: YYYYMMDDHHMMSS_phase_XX_short_description.sql
-- Project: My Gujarat Property
-- Purpose:
-- Phase:
-- Related docs:
-- Tables changed:
-- RLS changed: Yes/No
-- Destructive changes: Yes/No
-- Backup required: Yes/No
-- Rollback notes:
-- Created by:
```

---

## 26. Destructive Migration Rules

Destructive changes require user approval.

Destructive changes include:

* drop table
* drop column
* delete data
* hard delete records
* type change with data loss risk
* enum removal/breaking change
* publicizing private field
* removing RLS protection
* moving private files to public bucket
* changing payment/invoice records
* changing user roles/ownership in destructive way

Before destructive migration:

1. ask user approval
2. create backup plan
3. create rollback plan
4. update `DEPLOYMENT_ROLLBACK.md`
5. update `CHANGELOG.md`
6. update `BUGS_AND_FIXES.md` if risk/bug
7. test in staging
8. verify RLS/security
9. only then production

---

## 27. RLS / Security Workflow Rules

For auth/RLS/security features, Claude must:

1. read `SECURITY_RLS_CHECKLIST.md`
2. inspect current RLS policies
3. inspect server actions/API routes
4. inspect role helpers
5. inspect current DB schema
6. implement server-side checks
7. implement RLS policies
8. create migration
9. test allowed cases
10. test denied cases
11. test direct URL bypass
12. test hidden contact privacy
13. test private document privacy if relevant
14. update docs
15. mark verification honestly

Never solve security only by hiding UI.

---

## 28. Provider Workflow Rules

For provider-backed features, Claude must:

1. read `API_PROVIDER_STATUS.md`
2. check current provider config
3. update `.env.example` if env changes
4. never expose real secrets
5. implement provider adapter safely
6. implement setup-required state
7. implement failure fallback
8. implement provider status admin UI where relevant
9. test success if provider configured
10. test failure
11. test no fake success
12. update provider status
13. update manual verification
14. update feature registry

If provider credentials are missing, mark `SETUP_REQUIRED`.

Do not fake success.

---

## 29. Payment Workflow Rules

For payment/billing work, Claude must:

1. read billing docs
2. read `API_PROVIDER_STATUS.md`
3. read `SECURITY_RLS_CHECKLIST.md`
4. read `DEPLOYMENT_ROLLBACK.md`
5. implement server-side order creation
6. never trust client amount
7. verify Razorpay signature/webhook
8. implement idempotency
9. keep failed payment inactive
10. keep pending payment inactive
11. activate subscription only after verified success
12. generate invoice only after verified success
13. avoid wasting invoice number on failed payment
14. audit manual activation
15. update docs
16. verify failed/pending/success/duplicate flows

Payment phase cannot be `PASS` with fake webhook/payment.

---

## 30. Media / Upload Workflow Rules

For upload/media work, Claude must:

1. read media docs
2. read provider status
3. read security checklist
4. check storage bucket rules
5. implement server-side validation
6. validate file type and MIME
7. validate size for infra safety
8. protect private docs
9. use signed URLs where required
10. implement upload progress/failure state
11. implement setup-required state if R2/CDN missing
12. ensure no fake upload success
13. optimize images
14. lazy-load media
15. update docs

Private docs must never be stored publicly.

---

## 31. UI Workflow Rules

For UI work, Claude must:

1. inspect existing design
2. preserve existing working design unless instructed
3. follow mobile-first
4. check 320/360/390/430/768/1024/1366
5. avoid horizontal scroll
6. avoid overlap
7. avoid bad wrapping
8. keep brand no-wrap
9. provide loading states
10. provide empty states
11. provide error states
12. provide disabled/setup-required states
13. make buttons real or disabled with reason
14. avoid `href="#"`
15. avoid dead UI
16. ensure modals/drawers/bottom sheets work
17. use accessible labels
18. ensure nested click behavior is safe
19. disable image drag where needed
20. update manual verification

No fake dashboard cards.

No fake analytics.

---

## 32. Performance Workflow Rules

For performance work, Claude must:

1. read `PERFORMANCE_CHECKLIST.md`
2. inspect query patterns
3. avoid unbounded reads
4. avoid N+1 queries
5. add indexes where needed
6. paginate lists
7. lazy-load heavy modules
8. optimize images
9. separate public/private cache
10. use targeted revalidation
11. avoid caching private data globally
12. add provider timeouts/fallbacks
13. run build/performance checks where possible
14. update docs

Do not optimize by weakening security.

---

## 33. Deployment Workflow Rules

For deployment or production work, Claude must:

1. read `DEPLOYMENT_ROLLBACK.md`
2. read `API_PROVIDER_STATUS.md`
3. read `SECURITY_RLS_CHECKLIST.md`
4. read `PERFORMANCE_CHECKLIST.md`
5. confirm changed files
6. confirm SQL/migration impact
7. confirm backup
8. confirm rollback
9. confirm provider mode
10. confirm dev/test/mock disabled
11. run smoke test
12. update docs
13. list pending issues
14. never fake production PASS

Production deploy requires user/Super Admin signoff.

---

## 34. Testing Rules

Claude should run or document:

* install/dependency check
* lint
* typecheck
* build
* unit tests
* E2E tests
* SQL/migration validation
* RLS tests
* manual verification
* responsive checks
* provider checks
* payment checks
* performance checks

If test cannot run, Claude must state:

* command
* reason
* risk
* fallback
* result as `PARTIAL` or `BLOCKED`

Do not mark `PASS` if required tests did not run and no valid reason exists.

---

## 35. Logs Rule

When sharing logs:

* paste only relevant lines
* usually 20–30 lines max
* redact secrets
* redact OTPs
* redact tokens
* redact hidden contact
* redact private URLs
* redact payment secrets
* redact private user data

Do not paste:

* full `.env`
* API keys
* service role key
* payment secret
* webhook secret
* private document URL
* OTP
* password
* long irrelevant logs

---

## 36. Error Handling Rule

User-facing errors must be safe.

Do not expose:

* SQL error
* stack trace
* internal file path
* RLS internals
* provider raw payload
* payment raw payload
* secret/env value
* private user existence when unauthorized

Use typed errors such as:

* `UNAUTHORIZED`
* `FORBIDDEN`
* `NOT_FOUND`
* `VALIDATION_ERROR`
* `SETUP_REQUIRED`
* `PAYMENT_PENDING`
* `PAYMENT_FAILED`
* `PROVIDER_UNAVAILABLE`
* `RATE_LIMITED`
* `SERVER_ERROR`

---

## 37. Setup-Required Rule

If a feature depends on a missing provider/config, use setup-required state.

Examples:

* OTP provider missing → show OTP setup-required/auth unavailable state
* Razorpay missing → checkout disabled/setup-required
* Maps missing → text address/manual location fallback
* R2 missing → upload disabled/setup-required
* Email missing → email delivery setup-required
* WhatsApp API missing → free link fallback or disabled
* Analytics missing → empty/setup-required analytics dashboard
* Error tracking missing → monitoring setup-required
* Cron missing → manual/admin warning/setup-required

Never fake provider success.

---

## 38. Incomplete Feature Rule

If a feature cannot be fully finished in current phase:

1. implement safe partial only if useful
2. mark feature `PARTIAL`, `BLOCKED`, `SETUP_REQUIRED` or `DEFERRED_TRACKED`
3. add pending task to `brain.md`
4. update `FEATURE_REGISTRY.md`
5. update `MANUAL_VERIFICATION.md`
6. add bug if broken behavior exists
7. show disabled/setup-required UI if exposed
8. do not mark `DONE`

Incomplete is acceptable if honestly tracked.

Silent skip is not acceptable.

---

## 39. Workaround Rule

Temporary workaround must be documented.

If workaround added:

* add entry in `BUGS_AND_FIXES.md`
* add note in `brain.md`
* add changelog entry
* add removal condition
* add risk
* add retest requirement
* do not forget cleanup

Workaround must not become permanent silently.

---

## 40. Feature Flag Rule

Use feature flags for risky/incomplete features.

Feature flags should be used for:

* new dashboard module
* new admin module
* new payment feature
* new provider integration
* ads/promotions
* Turnstile
* maps API
* WhatsApp API
* media processing
* caching change
* experimental search behavior
* high-risk security change

Feature flag must be enforced backend-side where relevant.

Frontend-only flag is not enough for sensitive actions.

---

## 41. Conflict Resolution Rule

If docs conflict with code:

1. do not guess silently
2. check `brain.md`
3. check latest changelog
4. check feature registry
5. check detailed docs
6. check user’s latest instruction
7. choose safest behavior if urgent
8. document conflict
9. update docs after approved resolution

If user instruction conflicts with safety/security, do not weaken safety.

---

## 42. “No AI” Rule

The project must not include AI API/search/recommendation features.

Do not add:

* AI property recommendation
* AI search
* AI chatbot
* AI content generation
* AI valuation
* AI pricing advice
* AI legal advice
* AI investment advice

If future user asks, it must be separately approved and documented.

Current scope: no AI.

---

## 43. “No Fake Data” Rule

Do not create fake production data.

Allowed in development/staging only:

* clearly marked seed data
* test accounts
* test listings
* test payment states
* test provider mocks

Production must not show fake:

* listings
* users
* leads
* views
* analytics
* payments
* ads
* verification
* RERA
* reviews
* counts

Seed/demo data must be hidden/removed from public production unless explicitly approved for staging/demo environment.

---

## 44. Two-Claude-Account Continuity Rules

The project may be worked on by two Claude accounts.

To support this:

1. never rely on chat history
2. keep `brain.md` updated
3. keep `FEATURE_REGISTRY.md` updated
4. keep `CHANGELOG.md` updated
5. keep `BUGS_AND_FIXES.md` updated
6. keep `MANUAL_VERIFICATION.md` updated
7. keep provider status updated
8. keep deployment/rollback status updated
9. keep security/performance checklists updated
10. write clear final responses
11. mention next phase
12. avoid hidden decisions

At the end of each phase, `brain.md` must include a resume guide.

---

## 45. Resume Guide Format For brain.md

Use this format inside `brain.md` after a phase:

```md id="brain-resume-guide"
## Resume Guide — After Phase XX

### Current Phase
-

### Completed
-

### Changed Files
-

### SQL / Migration Files
-

### Provider Status
-

### Verification Result
PASS / PARTIAL / BLOCKED / FAIL

### Bugs / Workarounds
-

### Pending
-

### Next Step
-

### Important Notes For Next Claude
-
```

---

## 46. Phase Prompt Creation Rules

Each implementation prompt must include:

* phase name
* docs to read
* exact implementation scope
* out-of-scope items
* files likely to touch
* SQL/migration expectations
* RLS/security expectations
* provider expectations
* UI/responsive expectations
* docs to update
* tests to run
* manual verification prompt to run
* final response format

Prompt must not be vague.

---

## 47. Manual Verification Prompt Creation Rules

Each manual verification prompt must include:

* phase name
* docs to read
* exact routes to check
* roles to test
* direct URL checks
* RLS/security checks
* responsive widths
* UI state checks
* provider checks
* payment checks if relevant
* media checks if relevant
* admin/staff checks if relevant
* docs update checks
* PASS/PARTIAL/BLOCKED/FAIL rules
* bug creation rules
* final verification output format

---

## 48. Required Phase Order

Implementation should follow this order unless user explicitly changes:

1. Project setup baseline
2. Auth roles RLS foundation
3. Public UI home/header/footer/hero
4. Property/project/requirement system
5. Public search/detail/profile/SEO
6. Owner/broker/builder dashboards
7. Admin/staff/Super Admin system
8. Leads/CRM/proposals/messages
9. Billing/payment/subscription/trial/GST
10. Media/storage/uploads/R2/CDN
11. Location/search/SEO/CMS/legal
12. Ads/promotions/notifications/providers
13. Security/privacy/fraud/rate limits
14. Performance/caching/deployment/launch
15. Final production API testing/signoff

Reason:

* foundation first
* public shell next
* core marketplace after auth/RLS
* dashboards after core data
* admin after core moderation objects
* billing/providers after core flows
* media and provider integration after structure
* final security/performance/launch at end

---

## 49. Development Should Not Start Before Docs And Prompts Are Ready

Recommended order:

1. generate root docs
2. generate detailed docs
3. generate prompt files
4. run Phase 00 usage rules
5. start Phase 01 implementation

Reason:

* prevents missing scope
* prevents conflicting prompts
* enables two-Claude continuity
* reduces token waste
* gives complete manual verification plan

If user insists to start early, Claude must still use existing docs and mark missing docs as risk.

---

## 50. Current Documentation Generation Status

Current status at this file:

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

## 51. Current Implementation Status

As of this document:

| Area                               | Status           |
| ---------------------------------- | ---------------- |
| Website code implementation        | `NOT_STARTED`    |
| Database schema                    | `NOT_STARTED`    |
| SQL migrations                     | `NOT_STARTED`    |
| RLS policies                       | `NOT_STARTED`    |
| Supabase provider setup            | `NOT_STARTED`    |
| OTP provider                       | `SETUP_REQUIRED` |
| SMS/email/WhatsApp providers       | `SETUP_REQUIRED` |
| Razorpay                           | `SETUP_REQUIRED` |
| Maps                               | `SETUP_REQUIRED` |
| Cloudflare R2/CDN                  | `SETUP_REQUIRED` |
| Analytics/error tracking           | `SETUP_REQUIRED` |
| Manual implementation verification | `NOT_STARTED`    |
| Deployment                         | `NOT_STARTED`    |
| Production launch                  | `NOT_STARTED`    |

---

## 52. Prompt To Continue Documentation Generation

Use this prompt to continue documentation generation:

```md id="continue-doc-generation"
Generate the next file in the agreed 57-file My Gujarat Property documentation/prompt pack.

Write the full file content without skipping anything.

Current completed file:
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md

Next file:
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
```

---

## 53. Prompt To Start A Future Implementation Phase

Use this style after docs/prompts are ready:

```md id="start-phase-template"
Read these files first:
- CLAUDE.md
- brain.md
- FEATURE_REGISTRY.md
- CHANGELOG.md
- BUGS_AND_FIXES.md
- MANUAL_VERIFICATION.md
- API_PROVIDER_STATUS.md
- DEPLOYMENT_ROLLBACK.md
- SECURITY_RLS_CHECKLIST.md
- PERFORMANCE_CHECKLIST.md
- docs/01_PROJECT_MASTER_AND_SCOPE.md
- docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
- [relevant detailed docs]
- prompts/XX_PHASE_NAME.md
- prompts/XX_MANUAL_VERIFICATION_PHASE_NAME.md

Then implement Phase XX.

Do not skip requirements.
Do not fake data/provider/payment/verification.
Create SQL migrations for DB changes.
Update all relevant docs.
Run verification.
Final response must include changed files, SQL files, tests, verification result, bugs, docs updated and pending issues.
```

---

## 54. Final Claude Self-Check Before Every Response

Before final response, Claude must check:

* Did I complete the requested scope?
* Did I inspect existing files?
* Did I avoid duplicate implementation?
* Did I avoid removing working features?
* Did I create/update SQL migration if DB changed?
* Did I enforce RLS/security if needed?
* Did I preserve hidden contact privacy?
* Did I preserve private document privacy?
* Did I handle providers honestly?
* Did I avoid fake success?
* Did I run or document tests?
* Did I update docs?
* Did I update feature registry?
* Did I update changelog?
* Did I update bugs/fixes if needed?
* Did I update manual verification?
* Did I update brain.md?
* Did I list pending issues?
* Did I give honest final result?
* Did I avoid exposing secrets?
* Did I mention next phase?

If any answer is “no”, do not mark `PASS`.

---

## 55. Common Bad Claude Behaviors To Avoid

Claude must avoid:

* saying “done” without tests
* marking feature complete without verification
* skipping RLS because UI is hidden
* adding fake data to make UI look full
* hiding missing provider behind fake success
* using client callback to activate payment
* leaking hidden phone in API response
* fetching private fields and hiding in CSS
* creating duplicate route/component
* deleting working feature silently
* forgetting `.env.example`
* forgetting SQL migration
* forgetting rollback notes
* forgetting docs update
* forgetting manual verification
* forgetting responsive mobile check
* leaving `href="#"`
* leaving dead buttons
* leaving raw errors
* logging secrets
* using service role in client
* caching dashboard data publicly
* writing huge repeated prompts
* relying on chat memory instead of docs

---

## 56. Good Claude Behavior Checklist

Claude should:

* read relevant docs first
* inspect existing code
* make concise plan
* implement safely
* keep UI premium and responsive
* add loading/empty/error/setup-required states
* enforce backend authorization
* create SQL migrations
* write RLS policies
* run tests
* fix errors
* update docs
* update memory
* track bugs
* verify manually
* clearly report status
* keep prompts short
* reference file paths
* preserve user instructions
* preserve working features
* avoid fake success
* ask before risky changes
* mark partial/blocker honestly
* make next Claude able to continue

---

## 57. Final Rule

Claude must work like a careful senior engineer and documentation keeper.

Use token-light prompts, but do not skip quality.

Use project files as memory, not chat.

Update docs after every meaningful change.

Create SQL migrations for DB changes.

Verify security, RLS, roles, contact privacy, providers, payment, responsive UI and performance where relevant.

Do not fake data.

Do not fake provider success.

Do not fake payment success.

Do not fake verified badges.

Do not fake PASS.

If incomplete, say incomplete and track it.

If blocked, say blocked and track it.

If setup is required, say setup-required and track it.

Every phase must be safe, documented, verifiable and resumable.
