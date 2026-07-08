# prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md

# My Gujarat Property — Prompt 04 Manual Verification: Property, Project And Requirement System

> **DESIGN-MATCH CHECK (mandatory):** Verify built screens match `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 4, 5, 8** and all `docs/06` "Design Add-Ons". Confirm: Post Property = 9 steps, Post Project = 10 (RERA gate), **requirements show Pending (approval before public)**, On-Hold unit status, override base price, featured-slot chip, unavailable-listing variant.

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
```

This prompt verifies the **Property, Project and Requirement System** phase.

Do not skip this verification.

Do not start Prompt 05 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real role, RLS, form, status, public-safe and security checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
Prompt Number: 04 Verification
Phase: Property, Project And Requirement System
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
Previous Prompt: prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
Next Implementation Prompt: prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that the core marketplace entity foundation is safe and role-correct.

This verification checks:

* property schema/foundation
* project schema/foundation
* requirement schema/foundation
* role-gated creation
* dynamic form behavior
* server-side validation
* dashboard management foundation
* draft/save/submit workflow
* approval status workflow
* pause/resume workflow
* soft delete workflow
* public-safe views
* RLS policies
* wrong-user denial
* wrong-role denial
* guest denial
* hidden contact protection
* no public draft/pending/rejected leak
* no fake data
* no fake approval
* no fake RERA
* no fake media upload
* migration quality
* docs updates
* build/lint/typecheck/tests
* responsive form usability
* Prompt 05 readiness

This verification does not require full public search/detail pages, leads, billing, media upload, admin moderation UI or payment. Those are later prompts.

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
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md
docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md
docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md
docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md
docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md
docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect all changed implementation files from Prompt 04.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* property creation foundation
* project creation foundation
* requirement creation foundation
* role gates
* forms and validations
* entity status transitions
* approval workflow foundation
* location fields foundation
* media placeholder safety
* contact visibility foundation
* dashboard management foundation
* public-safe views
* RLS policies
* SQL migrations
* docs/checklist updates

This verification does not cover:

* full public search engine
* public detail page UX
* contact reveal
* inquiries/leads
* CRM/messages
* payment/subscription activation
* media storage/R2/CDN upload
* full admin moderation UI
* ad promotion
* notifications
* SEO programmatic pages
* analytics
* PWA

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 04 changed files
3. inspect SQL migration
4. inspect schema/tables/views
5. inspect RLS policies
6. inspect role permission helpers
7. inspect forms/components
8. inspect server actions/API routes
9. inspect dashboard routes
10. inspect validation schemas
11. inspect public-safe views
12. search for fake data
13. search for hidden contact leaks
14. run available automated checks
15. run manual smoke checks if app runs
16. run RLS/direct URL checks if DB available
17. test responsive form behavior where possible
18. update required docs
19. create bugs for failures
20. decide final verification result
21. update `brain.md`
22. prepare Prompt 05 readiness note

Do not skip docs updates.

---

## 6. Required File Inspection

Inspect likely changed files:

```txt id="entity-file-inspection"
src/app/dashboard/properties/
src/app/dashboard/projects/
src/app/dashboard/requirements/
src/app/dashboard/owner/properties/
src/app/dashboard/broker/properties/
src/app/dashboard/builder/projects/
app/dashboard/properties/
app/dashboard/projects/
app/dashboard/requirements/
src/components/forms/
components/forms/
src/components/property/
components/property/
src/components/project/
components/project/
src/components/requirement/
components/requirement/
src/lib/actions/properties.*
src/lib/actions/projects.*
src/lib/actions/requirements.*
src/lib/validators/property.*
src/lib/validators/project.*
src/lib/validators/requirement.*
src/lib/permissions/entity-permissions.*
src/types/entities.*
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

Record exact changed files.

---

## 7. Migration Verification

If Prompt 04 changed database schema, verify migration exists.

Expected pattern:

```txt id="expected-migration"
supabase/migrations/*_property_project_requirement_system.sql
```

Verify migration includes:

* purpose comment
* phase comment: Prompt 04
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* functions/triggers if any
* destructive changes yes/no
* backup required yes/no
* rollback notes

If DB changed without migration:

* create critical bug
* mark verification `FAIL`
* do not start Prompt 05

If migration exists but no rollback notes:

* create bug
* mark `PARTIAL` or `FAIL` depending risk

If DB not changed because Supabase unavailable:

* mark DB/RLS runtime checks `SETUP_REQUIRED`
* do not claim RLS PASS

---

## 8. Expected Table Verification

If schema exists, check for entity tables or equivalent.

Expected/possible tables:

```txt id="expected-entity-tables"
properties
projects
project_units
requirements
entity_media_links
entity_status_events
entity_moderation_notes
```

Minimum expected for this phase:

* property entity storage
* project entity storage
* requirement entity storage
* ownership/profile link fields
* status/approval/visibility fields
* location fields foundation
* contact visibility foundation
* created/updated timestamps
* soft delete field
* RLS enabled

If implementation claims entity system is complete but tables are missing:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 9. Property Schema Verification

Verify property schema supports:

* creator/owner profile
* public role
* title
* slug
* purpose
* category
* property type
* description
* pricing fields
* area fields
* relevant dynamic attributes
* location hierarchy foundation
* contact visibility
* status
* approval status
* visibility status
* review/rejection/need-changes fields
* timestamps
* soft delete

Verify property categories/types cover:

* residential
* commercial
* industrial
* land/plot
* PG/hostel/room
* business

If important categories are missing without documentation:

* create bug/task
* mark `PARTIAL`

---

## 10. Property Role Gate Verification

Verify:

| User        | Property Create                            |
| ----------- | ------------------------------------------ |
| Guest       | Denied                                     |
| Owner       | Allowed                                    |
| Broker      | Allowed                                    |
| Builder     | Denied                                     |
| Admin/Staff | Not public-user creation; moderation later |

Test/inspect:

* UI hides/blocks wrong role
* server action rejects wrong role
* RLS rejects wrong role if possible
* direct URL cannot bypass
* error is safe

If builder can create property:

* create critical bug
* mark `FAIL`

If guest can create property:

* create critical bug
* mark `FAIL`

---

## 11. Property Form Verification

Verify property form:

* loads for owner/broker
* denied for guest/builder
* has purpose selector
* has category/type selector
* shows dynamic fields based on category/type
* hides irrelevant fields
* validates required fields
* validates numeric ranges
* validates enum values
* validates location fields
* validates contact visibility
* has loading/error states
* has draft/submit behavior if implemented
* does not fake media upload
* does not show fake approval
* mobile usable

Test examples:

* flat/apartment fields appear correctly
* plot/land fields appear correctly
* shop/office fields appear correctly
* industrial fields appear correctly
* PG/hostel fields appear correctly
* business fields appear correctly

If all dynamic categories are not complete, document `PARTIAL` and exact missing types.

---

## 12. Project Schema Verification

Verify project schema supports:

* builder profile
* project name
* slug
* project category
* project type
* purpose
* description
* price range
* total towers/wings/floors/units
* construction status
* possession/launch timeline
* RERA fields
* amenities/specifications
* location hierarchy foundation
* status
* approval status
* visibility status
* review/rejection/need-changes fields
* timestamps
* soft delete

Verify forbidden project types are absent:

* PG
* hostel
* room
* paying guest
* single room
* shared room

If PG/hostel/room is allowed as project type:

* create bug
* mark `FAIL` if role/category rule is violated

---

## 13. Project Role Gate Verification

Verify:

| User        | Project Create                             |
| ----------- | ------------------------------------------ |
| Guest       | Denied                                     |
| Owner       | Denied                                     |
| Broker      | Denied                                     |
| Builder     | Allowed                                    |
| Admin/Staff | Moderation later, not public-user creation |

Test/inspect:

* owner denied project form
* broker denied project form
* builder allowed project form
* guest denied project form
* server action rejects wrong role
* RLS rejects wrong role if possible
* direct URL cannot bypass

If owner/broker can create project:

* create critical bug
* mark `FAIL`

If builder cannot create project due to broken gate:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 14. Project Form Verification

Verify project form:

* loads for builder
* denied for guest/owner/broker
* has project type/category selector
* excludes PG/hostel/room
* captures location
* captures project details
* captures towers/wings/floors/units foundation
* captures RERA fields
* captures possession/timeline fields
* has media placeholder
* one-video rule foundation exists if video metadata exists
* validates required fields
* validates numeric ranges
* has loading/error states
* has draft/submit behavior if implemented
* mobile usable

If unit inventory is partial, record exact status.

---

## 15. Project Unit Inventory Verification

If `project_units` or equivalent exists, verify:

* units link to project
* builder owns project/units
* wrong builder denied
* unit type/area/price/status fields exist
* availability status is enum-safe
* no fake sold/booked/available claims
* public display is not enabled before project publish
* RLS protects units

Availability statuses should be safe:

```txt id="availability-statuses"
available
booked
sold
on_hold
not_released
hidden
```

If inventory not implemented, ensure it is documented `PARTIAL` or `NOT_STARTED`.

---

## 16. Requirement Schema Verification

Verify requirement schema supports:

* creator profile
* public role
* title
* slug
* purpose
* category
* requirement type
* budget/rent range
* area range
* location preferences
* property preferences
* contact visibility
* status
* approval status
* visibility status
* review/rejection/need-changes fields
* timestamps
* soft delete

Requirement categories should cover:

* residential
* commercial
* industrial
* land/plot
* PG/hostel/room
* business
* project if scoped

---

## 17. Requirement Role Gate Verification

Verify:

| User        | Requirement Create                         |
| ----------- | ------------------------------------------ |
| Guest       | Denied                                     |
| Owner       | Allowed                                    |
| Broker      | Allowed                                    |
| Builder     | Denied unless explicitly approved later    |
| Admin/Staff | Moderation later, not public-user creation |

Test/inspect:

* owner allowed requirement form
* broker allowed requirement form
* builder denied requirement form
* guest denied requirement form
* server action rejects wrong role
* RLS rejects wrong role if possible
* direct URL cannot bypass

If builder can create requirement without explicit product approval:

* create bug
* mark `FAIL` or `PARTIAL` depending implementation state

---

## 18. Requirement Form Verification

Verify requirement form:

* loads for owner/broker
* denied for guest/builder
* has purpose/category/type selector
* captures preferred location
* captures budget/rent
* captures area range
* captures key preferences
* validates ranges
* validates enum values
* hides irrelevant fields
* has loading/error states
* has draft/submit behavior if implemented
* does not expose contact publicly
* mobile usable

If requirement matching is not implemented, this is fine. Matching comes later.

---

## 19. Dynamic Field Verification

Verify dynamic forms hide irrelevant fields.

Examples:

* Rent-only fields hidden for sale-only property.
* Sale price hidden for pure rental where appropriate.
* PG rules appear only for PG/hostel/room.
* Business fields appear only for business type.
* Plot dimensions appear for land/plot.
* BHK fields not required for pure plot/land.
* Floor fields not required for agricultural land.
* Project tower/unit fields appear for project.
* PG/hostel/room not shown as project type.

If irrelevant fields are required incorrectly:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 20. Validation Verification

Verify server-side validation exists for:

* role
* ownership
* title length
* slug safety
* purpose enum
* category enum
* type enum
* numeric ranges
* location fields
* contact visibility
* status transitions
* media count placeholders if any
* project one-video max if video metadata exists
* RERA fields if provided
* no unsafe HTML/scripts
* no invalid role override
* no hidden contact in public-safe fields where enforceable

Client-side validation alone is not enough.

If server action accepts invalid data:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 21. Status Workflow Verification

Verify status transitions.

Expected flow:

```txt id="expected-status-flow"
draft → submitted
submitted → under_review
under_review → need_changes
under_review → approved
under_review → rejected
need_changes → submitted
approved → published
published → paused
paused → published
published → expired
published → deleted
draft → deleted
rejected → deleted
```

Check:

* user can save draft
* user can submit own draft
* user cannot approve own entity
* edit after published/approved creates review-needed state or documented status
* pause/resume allowed by owner/uploader
* pause/resume does not require reapproval
* soft delete works
* deleted item hidden
* invalid transition rejected

If any status transition is fake/hardcoded:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 22. Approval Workflow Verification

Verify approval foundation:

* new submitted entity is not public
* approval status exists
* review fields exist
* rejection/need-changes reason exists
* admin/staff approval not faked
* user cannot self-approve
* approved/published timestamp fields exist or documented
* public-safe views include only published/approved
* full admin moderation UI deferred to Prompt 07 if not implemented

If entity becomes public immediately without approval:

* create bug
* mark `FAIL` unless product explicitly approved auto-publish with docs updated

---

## 23. Pause / Resume Verification

Verify:

* owner/broker can pause own property/requirement
* builder can pause own project
* wrong user cannot pause/resume
* guest cannot pause/resume
* paused entity is hidden or unavailable as defined
* resume returns to published/approved safe state
* pause/resume does not require reapproval
* status event/audit updated if implemented

If wrong user can pause/resume:

* create critical bug
* mark `FAIL`

---

## 24. Soft Delete Verification

Verify:

* user can soft delete own draft/rejected/published entity as allowed
* wrong user denied
* guest denied
* deleted_at/status updated
* deleted entity not public
* hard delete not available to normal user
* audit/status event updated if implemented
* restore/hard delete deferred if not in scope

If normal user can hard delete data unexpectedly:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 25. Dashboard Management Verification

Verify management pages show own data only.

Check:

* owner sees own properties/requirements
* broker sees own properties/requirements
* builder sees own projects
* empty state if none
* no fake records
* statuses shown accurately
* edit/submit/pause/resume/delete actions available only where allowed
* wrong-role links hidden/denied
* list pagination foundation if many items
* table becomes mobile cards if needed
* no hidden contact leak

If wrong user items appear:

* create critical bug
* mark `FAIL`

---

## 26. Public-Safe View Verification

If public-safe views exist, verify:

```txt id="public-safe-views"
public_properties_view
public_projects_view
public_requirements_view
```

Check public views include only:

* approved/published entities
* public-safe fields
* safe location
* safe price/area/category/type
* safe media placeholders/public media only
* safe uploader public profile fields only

Public views must exclude:

* contact phone
* contact email
* private address if hidden
* draft/submitted/pending/under_review entities
* rejected/need_changes entities
* paused/deleted/expired entities unless explicitly public-unavailable
* admin review notes
* rejection reasons
* private media
* billing/plan data
* internal moderation fields
* private owner profile fields

If public-safe view leaks private data:

* create critical bug
* mark `FAIL`

---

## 27. RLS Enabled Verification

For every private table created/changed, verify RLS is enabled.

Check:

```txt id="rls-table-checks"
properties
projects
project_units
requirements
entity_media_links
entity_status_events
entity_moderation_notes
```

If RLS missing on private table:

* create critical bug
* mark `FAIL`

If DB unavailable:

* mark RLS runtime verification `SETUP_REQUIRED`
* do not mark RLS PASS

---

## 28. RLS Policy Verification

Verify RLS behavior.

### Properties

* guest cannot insert property
* owner can insert own property
* broker can insert own property
* builder cannot insert property
* user can read own property
* user can update own draft/property
* wrong user cannot update
* user cannot self-approve
* public cannot read private table
* public can read only public-safe view if approved/published

### Projects

* guest cannot insert project
* builder can insert own project
* owner cannot insert project
* broker cannot insert project
* builder can update own project
* wrong builder/user cannot update
* public cannot read private table
* public can read only public-safe view if approved/published

### Requirements

* guest cannot insert requirement
* owner can insert own requirement
* broker can insert own requirement
* builder cannot insert unless explicitly allowed later
* user can update own requirement
* wrong user cannot update
* public cannot read private contact/private fields
* public/scoped view safe only

If any wrong-role/wrong-user access passes:

* create critical bug
* mark `FAIL`

---

## 29. RLS SQL Test Suggestions

If Supabase SQL test environment is available, run equivalent tests.

Suggested scenarios:

```txt id="rls-test-scenarios"
1. Anonymous insert property → denied.
2. Owner insert property → allowed.
3. Broker insert property → allowed.
4. Builder insert property → denied.
5. Owner insert project → denied.
6. Broker insert project → denied.
7. Builder insert project → allowed.
8. Anonymous insert requirement → denied.
9. Owner insert requirement → allowed.
10. Broker insert requirement → allowed.
11. Builder insert requirement → denied unless documented future behavior.
12. User A update User B property → denied.
13. User A update User B project → denied.
14. User A update User B requirement → denied.
15. Public select private properties table → denied.
16. Public select public_properties_view → only published safe rows.
17. Public select draft/pending rows via view → no rows.
18. Public-safe view excludes contact phone/email.
```

Record exact results.

Do not mark RLS PASS without tests.

---

## 30. Direct URL Bypass Verification

Manually test or inspect direct URLs.

Examples:

```txt id="direct-url-checks"
/dashboard/properties/new
/dashboard/projects/new
/dashboard/requirements/new
/dashboard/owner/properties/new
/dashboard/broker/properties/new
/dashboard/builder/projects/new
/dashboard/properties/[id]/edit
/dashboard/projects/[id]/edit
/dashboard/requirements/[id]/edit
```

Expected:

* guest denied
* wrong role denied
* wrong owner denied
* private data not rendered before redirect
* safe unauthorized state
* no client-only protection

If direct URL bypass allows forbidden action:

* create critical bug
* mark `FAIL`

---

## 31. Hidden Contact Verification

Check entity fields, views, UI and payloads.

Hidden contact must not appear in:

* public-safe views
* public placeholder pages
* search placeholder
* cards/lists
* metadata/schema
* logs
* status events
* admin notes shown publicly
* public API response
* media metadata
* slug
* title automatically generated from phone/email

If phone/email can be put in description/title and product disallows it, validation/moderation should flag or document pending.

If hidden contact leaks directly from private fields:

* create critical bug
* mark `FAIL`

---

## 32. Fake Data Verification

Search and inspect for fake production data.

Not allowed as real:

* fake property cards
* fake project cards
* fake requirements
* fake views
* fake leads
* fake inquiries
* fake approval
* fake verified badge
* fake RERA
* fake media upload
* fake images as real listings
* fake public counts
* fake analytics

If placeholder/demo data exists:

* must be clearly dev-only or labeled
* must not be treated as production real
* must not be used to mark PASS

If fake data appears real:

* create bug
* mark `FAIL`

---

## 33. Media Placeholder Verification

Since full media storage is later, verify:

* media upload is disabled/setup-required if storage not ready
* no fake upload success
* no fake R2/CDN URL
* no fake brochure link
* no fake video upload
* project one-video max rule documented/enforced if video metadata exists
* private media not public
* media status setup-required documented
* `API_PROVIDER_STATUS.md` marks R2/CDN appropriately

If fake media upload exists:

* create bug
* mark `FAIL`

---

## 34. Location Foundation Verification

Verify location fields:

* country/state/district/taluka/city/village/area/locality foundation exists or documented
* basic location required fields validated
* selected city/locality saved safely if implemented
* no fake map
* no fake nearby
* no fake IP location
* maps provider not loaded
* missing location system marked `PARTIAL`/`SETUP_REQUIRED`

If form requires impossible/unavailable location data:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 35. RERA Foundation Verification

For projects, verify:

* RERA registered field
* RERA number field if registered
* RERA status field or placeholder
* RERA disclaimer foundation
* no fake RERA verified badge
* no fake approval
* no public private RERA proof
* RERA proof media deferred/private
* promotion/ads RERA gate deferred to ads phase

If fake RERA verification appears:

* create critical bug
* mark `FAIL`

---

## 36. Subscription/Billing Gate Placeholder Verification

Posting plan gate may be placeholder until billing phase.

Verify:

* no fake active plan
* no fake payment success
* no Razorpay script loaded unless billing implemented
* posting gate status documented
* if posting allowed before billing phase, docs clearly state temporary foundation behavior
* if posting blocked due to subscription setup-required, UI explains safely

If fake subscription/payment gate exists:

* create bug
* mark `FAIL`

---

## 37. Audit / Status Event Verification

If audit/status events implemented, verify events for:

* create
* update
* submit
* pause
* resume
* soft delete
* status transition

Verify events do not store:

* hidden contact
* secrets
* OTP
* raw provider errors
* private docs
* full private address if not needed

If audit is not implemented, ensure status is documented `PARTIAL`/`NOT_STARTED`.

---

## 38. Error Handling Verification

Verify errors are safe:

* auth required
* role not allowed
* forbidden
* validation error
* entity not found
* invalid status transition
* approval required
* setup required
* media provider setup required
* location data setup required
* subscription gate setup required

Errors must not expose:

* SQL
* stack trace
* service role
* provider secrets
* hidden contact
* private profile data

If raw errors visible:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 39. Responsive Verification

Test forms and management pages at:

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

* no horizontal scroll
* form fields stack
* labels readable
* validation errors readable
* dropdowns not clipped
* buttons tappable
* stepper usable
* sticky buttons not covering content
* tables become cards
* status badges readable
* destructive actions separated
* modal/bottom sheet fits
* mobile keyboard does not hide submit area badly

If not all widths tested, mark responsive verification `PARTIAL`.

Do not mark responsive PASS without real checks.

---

## 40. Accessibility Verification

Check forms and lists:

* labels for inputs
* required indicators
* helper text
* error text linked/visible
* focus visible
* keyboard navigation
* select/dropdown accessible
* icon buttons have labels
* destructive action confirmation
* status badges not color-only
* contrast readable
* tap targets large enough

If severe accessibility blocker exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 41. Build / Lint / Typecheck Verification

Run available checks using detected package manager.

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

## 42. Migration Apply/Test Verification

If local/staging Supabase is available:

* apply migration
* verify tables exist
* verify views exist
* verify RLS enabled
* verify policies exist
* verify indexes created
* run role/RLS tests
* verify rollback notes

If migration cannot be applied because environment missing:

* record `SETUP_REQUIRED`
* do not mark DB/RLS runtime PASS

---

## 43. Server Action / API Verification

Inspect/test server actions/API routes.

Verify each:

* requires auth
* checks role
* checks ownership
* validates input
* checks status transitions
* uses server-side DB access
* returns safe typed errors
* does not leak private data
* does not allow wrong role
* does not allow wrong owner
* does not trust client-only fields

Critical actions:

* create property
* update property
* submit property
* pause/resume property
* delete property
* create project
* update project
* submit project
* pause/resume project
* delete project
* create requirement
* update requirement
* submit requirement
* pause/resume requirement
* delete requirement

If server action trusts client role blindly:

* create critical bug
* mark `FAIL`

---

## 44. Slug Verification

Verify slug logic:

* safe characters
* unique per entity type
* no phone/email/private address
* collision handled
* draft/published behavior documented
* stable after publish if implemented
* no route conflict

If slug leaks phone/email/private data:

* create bug
* mark `FAIL`

---

## 45. Public Search/Detail Deferral Check

Since full public search/detail comes next, verify:

* `/search` still safe
* public detail pages not fake
* public views ready for Prompt 05
* unpublished rows not public
* no fake public cards
* no hidden contact public
* statuses support published filter

If public search/detail pages already show fake listings:

* create bug
* mark `FAIL`

---

## 46. Documentation Update Verification

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

If DB/RLS changed but security/deployment docs missing:

* update them
* mark verification `PARTIAL` until fixed

---

## 47. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

* property schema
* property form
* property role gate
* property draft
* property submit approval
* property pause/resume
* property soft delete
* project schema
* project form
* builder-only project gate
* project unit inventory foundation
* project RERA foundation
* project media placeholder
* project one-video rule foundation
* requirement schema
* requirement form
* requirement role gate
* requirement draft
* requirement submit approval
* location fields foundation
* contact visibility foundation
* public-safe property view
* public-safe project view
* requirement public/scoped view
* RLS entity policies
* status transitions
* dashboard management foundation
* moderation foundation
* validation schemas
* setup-required media/location states

Future features must not be marked done.

---

## 48. Changelog Verification

Check `CHANGELOG.md` includes Prompt 04 entry with:

* date
* summary
* changed files
* migration files
* RLS/security changes
* new routes/forms
* provider status changes
* docs updated
* tests/checks run
* verification status
* known issues
* rollback notes

If missing, update changelog.

---

## 49. Bugs And Fixes Verification

If issues are found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

* `BUG-ENTITY-GUEST-CREATE`
* `BUG-ENTITY-BUILDER-CREATE-PROPERTY`
* `BUG-ENTITY-OWNER-CREATE-PROJECT`
* `BUG-ENTITY-BROKER-CREATE-PROJECT`
* `BUG-ENTITY-WRONG-USER-EDIT`
* `BUG-ENTITY-PUBLIC-DRAFT-LEAK`
* `BUG-ENTITY-HIDDEN-CONTACT-LEAK`
* `BUG-ENTITY-FAKE-APPROVAL`
* `BUG-ENTITY-FAKE-RERA`
* `BUG-ENTITY-FAKE-MEDIA-UPLOAD`
* `BUG-ENTITY-INVALID-STATUS-TRANSITION`
* `BUG-ENTITY-FORM-VALIDATION-MISSING`
* `BUG-ENTITY-MOBILE-FORM-BROKEN`
* `BUG-ENTITY-RLS-MISSING`
* `BUG-ENTITY-MIGRATION-MISSING`
* `BUG-ENTITY-PUBLIC-SAFE-VIEW-LEAK`
* `BUG-ENTITY-BUILD-FAIL`
* `BUG-ENTITY-DUPLICATE-TABLES`
* `BUG-ENTITY-ROLLBACK-MISSING`

Use existing bug ID convention if available.

---

## 50. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 04 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* routes/forms tested
* roles tested
* RLS tests
* public-safe view tests
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

## 51. Security Checklist Verification

Update/verify `SECURITY_RLS_CHECKLIST.md`.

Include Prompt 04 results for:

* property RLS
* project RLS
* requirement RLS
* project units RLS
* public-safe views
* role-gated creation
* wrong-user denial
* wrong-role denial
* guest denial
* draft/pending public denial
* hidden contact protection
* media placeholder safety
* RERA no-fake rule
* direct URL tests
* known issues

If RLS was not runtime-tested, status cannot be full PASS.

---

## 52. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

Include Prompt 04 results for:

* entity indexes
* dashboard list pagination foundation
* no unbounded reads
* public-safe view performance
* form bundle/performance notes
* no maps/media/payment provider scripts loaded
* build status
* future load test notes

---

## 53. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

Include:

* Prompt 04 migration list
* affected tables
* affected views
* affected RLS policies
* indexes created
* backup requirement
* rollback notes
* data risk
* route/component rollback
* feature flag/setup-required notes
* post-deploy verification checklist

If migration exists without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 54. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md`.

Relevant statuses:

* Supabase Database
* Supabase RLS
* Media Storage/R2
* CDN
* Location Provider/Maps
* Billing/Razorpay
* Notifications

Rules:

* media provider should be `SETUP_REQUIRED`/`NOT_STARTED` unless real tested
* maps should not be active if not used
* billing should not be active if not implemented
* provider status must not be fake

---

## 55. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 04 implementation summary
* Prompt 04 verification result
* changed files
* migration files
* tables/views/policies
* role gate results
* form results
* RLS test results
* setup-required providers
* bugs/blockers
* commands run
* next prompt:

  * `prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`
* instruction not to proceed if Prompt 04 failed/blocked

---

## 56. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* migrations exist for DB changes
* RLS enabled and tested for private tables
* property role gates pass
* project role gates pass
* requirement role gates pass
* guest denied creation
* wrong user denied editing
* public-safe views exclude private data
* draft/submitted/pending/rejected rows not public
* hidden contact does not leak
* forms validate server-side
* status transitions safe
* fake data absent
* fake approval absent
* fake media upload absent
* fake RERA absent
* responsive checks completed
* docs updated
* no blocking bugs

### PARTIAL

Use `PARTIAL` if:

* media/location/billing providers are setup-required but safely disabled
* dynamic fields foundation exists but some rare types deferred
* unit inventory foundation partial
* audit/status events partial
* RLS migration written but runtime DB tests unavailable
* responsive checks incomplete
* tests not configured but build passes
* admin moderation UI deferred properly
* public search/detail deferred to Prompt 05

Prompt 05 can start only if user/Super Admin accepts partial and no critical security leak exists.

### FAIL

Use `FAIL` if:

* build fails
* DB changes have no migration
* RLS missing on private tables
* guest can create entity
* builder can create property
* owner/broker can create project
* wrong user can edit/delete
* public can see draft/private rows
* hidden contact leaks
* fake data appears as real
* fake approval/RERA/upload exists
* service role/provider secret exposed

Do not start Prompt 05.

### BLOCKED

Use `BLOCKED` if:

* Prompt 02 auth/RLS foundation failed
* Supabase/DB unavailable and implementation cannot be verified at all
* cannot inspect required files
* package/build baseline broken
* architecture conflict needs owner decision
* missing required Prompt 04 files

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* Supabase env missing
* migration apply environment missing
* media storage/R2 missing
* location data/maps missing
* billing/provider gate missing
* notification provider missing

Setup-required can coexist with `PARTIAL`.

---

## 57. Prompt 05 Readiness Checklist

Prompt 05 can start only if:

* Prompt 04 implementation completed
* Prompt 04 verification completed
* no critical role/RLS/security bug open
* no public draft/private leak
* no hidden contact leak
* no fake data shown as real
* public-safe views exist or safe foundation exists
* status workflows are safe
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`

If Prompt 05 file is missing, stop and ask/generate it.

---

## 58. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 04 Verification — Property, Project And Requirement System

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Routes/Forms Checked:
- Property:
- Project:
- Requirement:
- Dashboard management:

Roles Tested:
- Guest:
- Owner:
- Broker:
- Builder:
- Admin/Staff:

Entity Workflow Checks:
- Draft:
- Submit:
- Approval status:
- Pause/resume:
- Soft delete:
- Wrong user edit:
- Direct URL bypass:

Database/RLS Checks:
- Migrations:
- Tables:
- Public-safe views:
- RLS policies:
- RLS test result:

Security/Public Safety:
- hidden contact:
- public draft leak:
- fake data:
- fake approval:
- fake RERA:
- fake media upload:

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
- Property/Project/Requirement foundation is safe and ready for Prompt 05.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 05:
- Yes/No

Next Step:
- prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md or fix blockers first.
```

---

## 59. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 04 Property/Project/Requirement verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Routes/forms checked:
- property:
- project:
- requirement:
- dashboard management:

Roles tested:
- guest:
- owner:
- broker:
- builder:
- admin/staff:

Entity workflows:
- draft:
- submit for approval:
- pause/resume:
- soft delete:
- edit/update:
- invalid transitions:

Database/RLS:
- migrations:
- tables:
- indexes:
- public-safe views:
- RLS policies:
- RLS test result:

Security/public safety:
- hidden contact:
- public draft/private leak:
- wrong user edit:
- wrong role create:
- fake data:
- fake approval/RERA/media:

Responsive:
- widths tested:
- horizontal scroll:
- form usability:

Provider/setup-required:
- Supabase:
- media/R2:
- location/maps:
- billing:
- notifications:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 05:
- Yes/No
- reason

Next step:
- prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
```

Do not write vague “verified”.

---

## 60. If Verification Fails

If verification fails:

1. do not start Prompt 05
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

Critical failures block progress.

---

## 61. If Verification Is Partial

If verification is partial:

* document exact partial items
* list setup-required providers
* list untested RLS checks
* list deferred dynamic fields
* list deferred media/location/admin moderation items
* confirm no critical role/RLS/contact leak exists
* update docs
* ask/require owner acceptance before Prompt 05 if risk is significant

Acceptable partial examples:

* media upload setup-required
* location hierarchy partial
* project unit inventory partial
* audit events partial
* admin moderation UI deferred
* full public search/detail deferred
* RLS runtime tests unavailable but policies/migration present

Not acceptable partial without fix:

* guest creation allowed
* wrong role creation allowed
* wrong user edit allowed
* public draft leak
* hidden contact leak
* fake data as real
* DB change without migration
* build fail

---

## 62. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `DEPLOYMENT_ROLLBACK.md`
* update `brain.md`
* final response should say Prompt 05 can start

Do not start Prompt 05 automatically unless user asked to continue.

---

## 63. What Not To Do In This Verification

Do not:

* implement full public search/detail SEO
* implement full leads/inquiries
* implement payment
* implement media storage
* implement full admin moderation
* add fake listings for testing
* add fake projects
* add fake requirements
* add fake approval
* add fake RERA
* bypass RLS to test
* disable RLS
* loosen role gates without approval
* expose service role
* print secrets
* ignore direct URL bypass
* ignore hidden contact leak
* mark PASS without RLS/security checks
* start Prompt 05 after FAIL/BLOCKED

---

## 64. Quality Bar

This verification is successful when future phases can trust that:

* properties are role-gated and secure
* projects are builder-only
* requirements are owner/broker-only
* guests cannot create entities
* wrong users cannot edit entities
* statuses support approval workflow
* public-safe views expose only safe approved data
* draft/pending/private data is protected
* hidden contact is protected
* RLS is enabled and tested or honestly setup-required
* forms validate server-side
* no fake data/approval/RERA/media exists
* docs accurately reflect implementation
* Prompt 05 can safely build public search/detail/profile/SEO on top

---

## 65. Final Rule For Prompt 04 Verification

Verify property system honestly.

Verify project system honestly.

Verify requirement system honestly.

Verify role gates honestly.

Verify RLS honestly.

Verify public-safe views honestly.

Verify hidden contact honestly.

Verify status workflow honestly.

Verify forms honestly.

Do not fake entity data.

Do not fake approval.

Do not fake media upload.

Do not fake RERA.

Do not expose drafts publicly.

Do not allow wrong-role creation.

Do not allow wrong-user edit.

Do not mark RLS PASS without tests.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
