# MGP FULL WEBSITE DESIGN MIGRATION — MASTER EXECUTION PROMPT

## 0. PURPOSE

This document is the authoritative execution process for the full MGP website design migration.

The objective is to replace the visual presentation of the complete existing application with every applicable screen, responsive variant, state, component pattern, modal, drawer, wizard step, and interaction represented across the complete MGP DESIGN source files, while preserving existing working product behavior and implementing genuinely new design-introduced functionality end-to-end.

This is not a theme update.
This is not a partial restyle.
This is not a screenshot-only recreation.
This is not permission to preserve old UI simply because the old functionality already works.

The required outcome is:

- MGP DESIGN controls the visual structure and presentation.
- Existing application code, database, product requirements, configuration, security rules, and business rules control complete data and functional behavior.
- Existing useful functionality is preserved and rewired into the new design.
- New functionality shown by the design is implemented fully.
- No design target is silently skipped.
- No visible control is fake, blank, decorative-only, disconnected, or dead.
- No screen is marked COMPLETE without evidence for all required verification gates.

---

# 1. SOURCE-OF-TRUTH PRIORITY

Use the following authority order.

## 1.0 MIGRATION PRECEDENCE OVERRIDE

For this MGP design migration, use the following conflict-resolution order:

1. `MGP_FULL_DESIGN_MIGRATION_MASTER.md` controls the migration process.
2. The exact mapped MGP DESIGN target controls visual structure, presentation, responsive composition, and screen-specific chrome.
3. Current application code, database schema, canonical configuration, product requirements, security rules, role rules, and business logic control complete real data and functionality.
4. Legacy phase prompts, old implementation prompts, old verification prompts, historical documentation, changelogs, and previous UI instructions may be used only as functional or historical references when relevant.

If any legacy instruction conflicts with this migration master or the exact mapped MGP DESIGN target:

- follow this migration master for the process;
- follow the exact mapped MGP DESIGN target for visual implementation;
- follow current application/product/database/security rules for real functional behavior.

Do not execute old phase implementation prompts as migration instructions.

Do not preserve legacy UI because an older prompt or documentation file says to preserve an existing:

- header
- footer
- shell
- sidebar
- navigation
- section
- component
- layout
- responsive structure

Historical status records must not override current repository truth.

Current code and current migration verification evidence must be used to determine actual implementation status.

## 1.1 Visual structure authority

The exact mapped MGP DESIGN target is the source of truth for:

- screen composition
- screen-specific chrome
- header presence or absence
- footer presence or absence
- top bar presence or absence
- sidebar presence or absence
- bottom navigation presence or absence
- sticky CTA presence or absence
- banners
- page shell
- section order
- section hierarchy
- section grouping
- tabs
- card structure
- spacing rhythm
- visual hierarchy
- content density
- desktop structure
- tablet structure
- mobile structure
- modal appearance
- drawer appearance
- sheet appearance
- empty states
- loading states
- populated states
- success states
- failure states
- error states
- not-found states
- unauthorized states

For each target, reproduce the mapped design from top to bottom.

Do not add a global header, footer, sidebar, bottom navigation, sticky CTA, banner, navigation row, card group, or other page block merely because it existed in the legacy application or appears on another design screen.

A shared application shell may only be used where the mapped target actually uses that shell or explicitly inherits from a canonical target that uses it.

## 1.2 Functional and data authority

The existing application code, database, canonical configuration, product requirements, validation rules, role rules, permission model, RLS/security policies, and business logic are the source of truth for:

- complete data
- valid option lists
- required fields
- business workflows
- persistence
- permissions
- authorization
- validation
- backend behavior
- routing behavior
- security behavior
- role-specific behavior

The design may show sample, shortened, illustrative, or incomplete content.

Do not treat design sample content as the complete product data model.

Example:

If the design shows three BHK cards but the real project contains more valid configurations, display all relevant real configurations using the same MGP card pattern and visual language.

If the design shows only a short property-details sample but the product requires more relevant details, integrate the complete relevant product data inside the nearest appropriate MGP section or component pattern.

## 1.3 Critical distinction: remove legacy presentation, preserve product capability

Absence of an old visual block from the MGP DESIGN means the legacy visual block or layout must not be preserved.

It does not mean that required product functionality, required database fields, or relevant real content should be deleted.

If required functionality or relevant product content exists in the application requirements but the MGP DESIGN shows only a shortened or sample representation:

1. preserve the product capability;
2. remove the legacy presentation;
3. integrate the complete functionality or content using the nearest matching MGP design pattern;
4. place it at the logically correct location;
5. document the integration in the screen contract.

Prefer integrating missing required content inside an existing relevant MGP section or component pattern.

Do not invent a new large top-level page section merely because the old UI had one.

Create a new top-level section only when the product genuinely requires a distinct surface and no existing MGP section can logically contain it. Document the reason in the screen contract.

Core rule:

PRESERVE THE PRODUCT CAPABILITY.
DO NOT PRESERVE THE LEGACY PRESENTATION.

---

# 2. PRESERVE VS REPLACE

## 2.1 Preserve

Preserve and reconnect:

- working backend logic
- server actions
- APIs
- data loaders
- database integration
- database schema where still valid
- validation
- authorization
- authentication
- role permissions
- RLS/security
- routing behavior
- query parameter behavior
- business rules
- useful workflows
- real persistence
- cross-page navigation behavior
- domain logic
- existing product capabilities

## 2.2 Replace

Do not preserve merely because it already exists:

- legacy JSX structure
- old visual layout
- old section arrangement
- old page shell
- old header
- old footer
- old navigation
- old sidebar
- old cards
- old banners
- old tabs
- old responsive structure
- legacy visual wrappers
- duplicate legacy blocks

Rule:

PRESERVE FUNCTIONALITY.
REPLACE PRESENTATION.

---

# 3. COMPLETE DESIGN INVENTORY — MANDATORY FIRST PHASE

## 3.0 DESIGN SOURCE RESOLUTION RULE

The authoritative MGP DESIGN source directory for this migration is:

`C:\Users\RAJAN\Documents\MGP DESIGN`

Before inventory creation:

1. Verify that this directory is accessible.
2. Locate every MGP DESIGN standalone HTML batch file inside this directory.
3. Verify the complete design batch count.
4. Record every discovered design source file in:
   `docs/design-migration/DESIGN_SOURCE_INDEX.md`
5. Use these actual HTML design files as the authoritative visual source.
6. Do not substitute `design-prompts/*.md`, screenshots, old prompt descriptions, or legacy UI for the actual MGP DESIGN HTML source.

Required:

`TOTAL_DESIGN_BATCH_FILES = 17`

If the directory is temporarily inaccessible, do not fabricate inventory completion.

The standalone HTML files may be bundled artifacts.

Render the original HTML files directly for visual comparison.

If searchable extraction is required for analysis, create a non-destructive temporary or local extraction workspace.

Never modify, overwrite, rewrite, or delete the original files inside:

`C:\Users\RAJAN\Documents\MGP DESIGN`

All extracted/indexed analysis artifacts must remain separate from the original MGP DESIGN source directory.


Before mass implementation, inspect the complete current codebase and every MGP DESIGN source file.

Create:

`docs/design-migration/SCREEN_MANIFEST.md`

Create:

`docs/design-migration/CHROME_MATRIX.md`

Do not start screen implementation until the full design inventory, route mapping, canonical mapping, and coverage reconciliation are complete.

## 3.1 Target classifications

Every discovered design target must be classified as one of:

- ROUTE_SCREEN
- RESPONSIVE_VARIANT
- UI_STATE
- MODAL_OR_DRAWER
- WIZARD_STEP
- SHARED_COMPONENT
- DESIGN_SYSTEM_REFERENCE
- REFERENCE_ONLY
- INHERITS_FROM_CANONICAL_SCREEN

Do not create duplicate routes or duplicate implementations for:

- reference-only design cards
- repeated previews
- design-system showcases
- screens explicitly inheriting from another canonical target
- repeated illustrations of the same canonical screen
- shared component specimen boards

For duplicate or reference targets, record:

- `CANONICAL_TARGET_ID`
- `INHERITS_FROM`
- `REUSE_SCOPE`
- classification reason

Every discovered design target must be accounted for in the manifest, even if it does not require a separate implementation.

## 3.2 Design System batch rule

The MGP Design System batch is primarily a source for:

- visual tokens
- colors
- typography
- spacing
- radius
- elevation
- component anatomy
- interaction patterns
- reusable visual behavior

Do not automatically treat design-system showcase boards or component specimen pages as application routes.

Use them as shared implementation references unless the actual product explicitly contains a corresponding route.

## 3.3 SCREEN_MANIFEST required columns

At minimum include:

| Field |
|---|
| TARGET_ID |
| Batch |
| Source Filename |
| Exact Design Screen Title |
| Design Screen Identifier |
| Target Classification |
| Viewport / Variant |
| State |
| Route |
| Existing Component |
| Existing Functionality |
| Backend Dependencies |
| Canonical Target ID |
| Inherits From |
| Reuse Scope |
| Required Action |
| Visual Status |
| Functional Status |
| Responsive Status |
| Regression Status |
| Overall Status |
| Blocker |
| Resume Point |

Required Action values include:

- REPLACE
- CREATE
- RESPONSIVE_VARIANT
- STATE_REPLACEMENT
- FUNCTIONALITY_EXTENSION
- SHARED_COMPONENT_IMPLEMENTATION
- REFERENCE_ONLY
- INHERIT

## 3.4 Deterministic design coverage audit

Do not rely on memory or informal visual scanning alone.

Create a deterministic design-source inventory for every MGP DESIGN batch.

For each discovered target record:

- source batch filename
- exact screen title or label
- screen identifier if available
- viewport/type
- target classification
- canonical target mapping
- implementation route
- implementation component
- manifest target ID

After the manifest is created, reconcile:

- `TOTAL_DISCOVERED_DESIGN_TARGETS`
- `TOTAL_MANIFEST_ENTRIES`
- `TOTAL_CANONICAL_IMPLEMENTATION_TARGETS`
- `TOTAL_RESPONSIVE_VARIANTS`
- `TOTAL_UI_STATES`
- `TOTAL_REFERENCE_ONLY_TARGETS`
- `TOTAL_DESIGN_SYSTEM_REFERENCES`
- `TOTAL_UNMAPPED_TARGETS`

Requirement:

`TOTAL_UNMAPPED_TARGETS = 0`

Every discovered design target must either:

1. map to a canonical implementation target; or
2. be explicitly classified as REFERENCE_ONLY or DESIGN_SYSTEM_REFERENCE with documented reasoning.

Never silently omit a design target.

## 3.5 CHROME_MATRIX required fields

For every implementation target record:

| Screen ID | Header | Topbar | Sidebar | Bottom Nav | Sticky CTA | Footer | Shell | Notes |
|---|---|---|---|---|---|---|---|---|

The CHROME_MATRIX is screen-specific.

Never infer that a header, footer, sidebar, bottom navigation, or sticky CTA applies globally unless the mapped design target explicitly uses it.

---

## 3.6 BASELINE ENVIRONMENT AND REGRESSION RULE

Before screen migration implementation begins, establish the current repository baseline.

Inspect:

- package.json
- lockfile
- framework/runtime requirements
- environment variable requirements
- database configuration
- external provider configuration
- existing test configuration
- browser/E2E configuration if present

When required and allowed, install dependencies using the repository lockfile and repository-defined package manager workflow.

Run the available baseline checks where executable:

- typecheck
- lint
- build
- unit tests
- integration tests
- E2E tests
- existing verification scripts

Create:

`docs/design-migration/BASELINE_STATUS.md`

Record:

- environment readiness
- dependency installation status
- commands executed
- pre-existing failures
- unavailable checks
- environment blockers
- provider limitations
- baseline date/checkpoint
- relevant evidence

Do not attribute a documented pre-existing failure to migration work.

Do not ignore a new failure introduced after migration changes.

Regression verification must compare the post-change state against the recorded baseline where relevant.

A missing dependency installation must not be misreported as a source-code regression.

# 4. SCREEN CONTRACT — REQUIRED BEFORE IMPLEMENTATION

For every canonical implementation target, create or update:

`docs/design-migration/contracts/<SCREEN_ID>.md`

The contract must include all sections below.

## 4.1 Design source

Record:

- source batch
- source filename
- exact screen title
- screen identifier
- desktop/mobile/tablet designation
- related states
- canonical target
- inherited target, if any

## 4.2 Exact visual structure

Write the target from top to bottom.

Example structure:

1. local top app bar
2. hero image
3. identity overlay
4. tabs
5. main overview content
6. configuration cards
7. brochure module
8. details section
9. sticky bottom CTA

This list must reflect the actual target design.

## 4.3 Legacy UI to remove

Explicitly list every old visual block that must be removed or replaced.

Examples:

- legacy header
- duplicate navigation
- old sidebar
- old section
- old card group
- old banner
- old CTA area
- old footer
- duplicate mobile navigation

## 4.4 Existing functionality to preserve

List all existing working behavior that must remain available after migration.

## 4.5 New functionality to implement

List every design-introduced capability that does not already exist.

## 4.6 Data completeness rules

Document where the design contains sample or incomplete values but the production application must show complete real data.

## 4.7 Interaction matrix

Create:

| Element | User Action | Expected Result | Data Source | Backend Action | Persistence | Permission Rule | Error Behavior | Status |
|---|---|---|---|---|---|---|---|---|

Every visible interactive element must appear in this matrix.

## 4.8 Responsive behavior contract

Document:

- desktop behavior
- tablet behavior
- mobile behavior
- breakpoint-specific shell changes
- content order changes
- sticky/fixed behavior changes
- drawer/sidebar behavior
- mobile-only controls
- desktop-only controls

---

# 5. NEW FUNCTIONALITY RULE

No visible design feature may remain:

- blank
- fake
- decorative-only
- placeholder-only
- hardcoded fake when real data exists
- disconnected
- non-clickable when it represents an action
- visually present but functionally inert

## 5.0 INTERACTION INTENT RULE

The no-dead-control requirement applies to elements that visually or semantically represent user actions or interactive controls.

Only elements that represent actual interaction intent must be wired to behavior.

Examples include:

- buttons
- links
- tabs
- clickable cards
- inputs
- filters
- selects
- dropdowns
- toggles
- menus
- CTAs
- pagination
- drawers
- modals
- drag/drop surfaces
- wizard controls

Purely informational elements should remain non-interactive when the MGP Design intent is informational.

Examples include:

- labels
- status badges
- metrics
- static captions
- explanatory text
- illustrations
- decorative dividers
- non-action informational cards

Do not invent click behavior merely to make every visible element interactive.

Do not make informational UI misleadingly clickable.

The strict no-dead-control rule applies to actual or implied user actions.

If interaction intent is ambiguous, inspect:
- design context
- related screens
- existing product behavior
- product documentation
- accessibility semantics

before deciding whether behavior is required.

## 5.1 Case A — Functionality already exists

Connect the new MGP UI to the existing real functionality.

Example:

Legacy working filter logic
→ new MGP filter UI
→ real existing backend/query behavior.

## 5.2 Case B — New section, existing data

Render existing real data inside the new MGP section.

## 5.3 Case C — Completely new functionality

Implement it end-to-end.

Where applicable, this includes:

- frontend state
- interaction behavior
- validation
- API or server action
- database changes
- migrations
- persistence
- role checks
- permission checks
- RLS/security
- loading state
- empty state
- populated state
- success state
- failure state
- optimistic update behavior where appropriate
- refresh persistence
- navigation
- responsive/mobile behavior
- tests

Example:

If the design contains a new CRM Kanban, do not only render draggable-looking cards.

Implement:

- real stages
- drag/drop behavior
- stage mutation
- backend update
- database persistence
- role authorization
- loading behavior
- failure recovery
- refresh persistence
- responsive/mobile behavior

## 5.4 Functionality ambiguity rule

If a new design feature has no clearly defined behavior:

1. inspect existing code;
2. inspect database schema;
3. inspect product documentation;
4. inspect feature registry;
5. inspect related routes and workflows;
6. inspect role and permission rules;
7. inspect similar existing functionality.

If intended behavior can be reliably derived, document the functional contract and implement it end-to-end.

If intended behavior still cannot be reliably determined, record a `FUNCTIONALITY_GAP` containing:

- target ID
- visible feature
- expected user intent
- available existing infrastructure
- missing business rule
- proposed implementation contract
- data implications
- security implications
- dependencies
- blocker status

Do not silently invent arbitrary business behavior.

Do not leave a fake control.

Do not mark FUNCTIONAL PASS until the feature has a defined and working contract.

---

For provider-gated functionality, apply the PROVIDER-GATED FUNCTIONALITY RULE from the master file.

Do not fabricate provider success.

A correctly implemented and verified approved SETUP_REQUIRED, FALLBACK_ACTIVE, DISABLED_BY_FLAG, or equivalent documented provider state must be evaluated according to the master rule instead of being automatically treated as a migration failure.

## 5.5 PROVIDER-GATED FUNCTIONALITY RULE

External provider availability and UI migration completeness are separate concerns.

If the current application or product documentation explicitly defines an approved state such as:

- SETUP_REQUIRED
- FALLBACK_ACTIVE
- DISABLED_BY_FLAG
- DEV_ONLY
- PROVIDER_UNAVAILABLE
- another documented honest fallback state

then:

1. do not fabricate provider success;
2. do not create fake provider data;
3. do not automatically mark the entire screen BLOCKED merely because external credentials or provider activation are intentionally unavailable;
4. implement the complete approved setup-required, disabled, or fallback experience;
5. verify that the UI clearly and honestly represents the real provider state;
6. verify that unavailable provider actions fail safely and do not falsely claim success;
7. record provider activation status separately from migration implementation status.

A target may receive FUNCTIONAL PASS when:

- the approved fallback/setup-required contract is fully implemented;
- the fallback behavior is real and verified;
- the UI does not falsely claim external provider success;
- provider activation is intentionally outside the migration scope.

Real provider success may only be marked verified after actual provider integration is tested successfully.

Record separately:

- PROVIDER_IMPLEMENTATION_STATUS
- PROVIDER_ACTIVATION_STATUS
- FALLBACK_STATUS
- REAL_PROVIDER_VERIFICATION_STATUS

# 6. IMPLEMENTATION ORDER

Process canonical implementation targets sequentially in manifest order.

For each target:

1. inspect current route and implementation;
2. inspect exact mapped MGP DESIGN target;
3. create or update the screen contract;
4. mark the target `IN_PROGRESS`;
5. record current implementation step and resume point;
6. identify legacy UI to remove;
7. identify existing functionality to preserve;
8. identify new functionality to implement;
9. rebuild the target according to the MGP visual structure;
10. reconnect existing functionality;
11. implement missing/new functionality;
12. integrate complete real data;
13. verify interactions;
14. verify forms;
15. verify data behavior;
16. verify states;
17. verify responsive behavior;
18. verify the actual rendered route against the exact mapped design source;
19. run regression verification;
20. record evidence;
21. pass all four required gates;
22. update tracking files;
23. only then mark the target COMPLETE.

Do not mark an entire batch COMPLETE because only selected screens were implemented.

Every canonical target, responsive variant, and required state must be accounted for.

---

# 7. CHECKPOINT STATUS RULE

Before modifying a target, mark it:

`STATUS: IN_PROGRESS`

Record:

- active target ID
- current implementation step
- files being modified
- completed substeps
- remaining substeps
- known blockers
- exact resume point
- current verification status

Only change status to COMPLETE after all four gates PASS with evidence.

If a session stops, context compacts, account switches, or execution is interrupted:

- leave the target as IN_PROGRESS;
- record the exact resume point;
- keep code and tracking documents synchronized.

Never mark COMPLETE in advance.

Never mark COMPLETE based only on planned work.

If an IN_PROGRESS target exists, resume it before selecting a new target unless it is explicitly BLOCKED and the blocker is documented.

---

# 8. VISUAL AND WIREFRAME VERIFICATION

Visual verification is mandatory for every implementation target.

## 8.1 Top-to-bottom structure check

Compare the implementation against the exact mapped MGP DESIGN target.

Verify:

- first visible element
- screen chrome
- header presence or absence
- top bar presence or absence
- sidebar presence or absence
- section sequence
- section count
- section grouping
- card groups
- tabs
- labels
- CTA placement
- sticky areas
- footer presence or absence
- final visible element

Record:

| Design Block | Expected Position | Implemented | Match | Evidence | Notes |
|---|---|---|---|---|---|

## 8.2 Actual visual comparison rule

Where browser/rendering tools are available, VISUAL verification must compare:

1. the exact mapped MGP DESIGN source rendered at the target viewport; and
2. the actual implemented application route rendered at the same viewport.

Compare section by section from top to bottom.

Verify:

- screen chrome
- section presence/absence
- section order
- major dimensions
- container widths
- column structure
- spacing rhythm
- image aspect ratios
- typography hierarchy
- card structure
- tab structure
- fixed/sticky elements
- content density
- final page ending

Do not approve VISUAL PASS from source-code inspection alone.

A screenshot of only the implementation without comparison to the mapped design source is not sufficient evidence for VISUAL PASS.

## 8.3 Wireframe structure check

Do not compare only colors.

Check:

- hierarchy
- block sizes
- container width
- columns
- card proportions
- image proportions
- spacing rhythm
- alignment
- tab positioning
- navigation placement
- fixed/sticky positioning
- content density
- mobile stacking order

The implementation must follow the MGP wireframe structure, not merely use a similar theme.

## 8.4 Old UI remnant check

Manually inspect the complete rendered page from top to bottom.

Search for:

- duplicated sections
- old cards beneath new design
- extra navigation
- incorrect footer
- unnecessary sidebar
- legacy banners
- duplicate CTA
- duplicated forms
- old tabs
- unrelated dashboard modules
- legacy mobile navigation

Required result:

`OLD_UI_REMNANTS = 0`

---

# 9. MANUAL ELEMENT-BY-ELEMENT INTERACTION CHECK

For every target, inspect and test every visible interactive control.

This includes:

- buttons
- icon buttons
- tabs
- links
- dropdowns
- selects
- filters
- chips
- checkboxes
- radio buttons
- switches
- text inputs
- search inputs
- date pickers
- sliders
- file uploads
- forms
- CTAs
- clickable cards
- pagination
- accordions
- menus
- modals
- drawers
- sheets
- close buttons
- back buttons
- share buttons
- download actions
- view actions
- call actions
- enquiry actions
- save/favorite actions
- compare actions
- edit actions
- delete actions
- status changes
- drag/drop actions
- wizard next/back actions

Record:

| Element | Visible | Test Performed | Expected Result | Actual Result | Persistence Checked | Evidence | PASS/FAIL |
|---|---|---|---|---|---|---|---|

Do not mark a target COMPLETE merely because it renders.

---

# 10. FORM VERIFICATION

For every applicable form, manually test:

- empty submit
- required validation
- invalid values
- minimum length
- maximum length
- valid values
- special characters where applicable
- server error
- network error where testable
- success flow
- duplicate submission prevention
- loading state
- success feedback
- failure feedback
- persisted result
- page refresh result
- permission restrictions

For multi-step forms and wizards test:

- next
- back
- progress state
- data retention between steps
- validation per step
- refresh behavior
- final submission
- duplicate submission handling
- failure recovery

---

# 11. DATA AND PERSISTENCE VERIFICATION

Never accept a target because static content looks correct.

Verify where applicable:

- data loads from the correct real source
- filters modify actual results
- sorting changes actual order
- pagination changes records
- search changes real query results
- saved data survives refresh
- edit updates the real record
- delete follows actual product rules
- role-specific data is correct
- unauthorized data is not exposed
- counts match actual data
- empty state appears with actual empty data
- error state is handled
- mutation failures are surfaced
- optimistic UI reconciles correctly where used
- stale data does not falsely display success

---

# 12. RESPONSIVE VERIFICATION — MANDATORY

Responsive verification is a separate required gate for every applicable target.

At minimum, test all design-defined target viewports plus representative responsive boundary widths.

Mandatory global responsive verification widths:

- 320px
- 360px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1366px
- 1440px

Additionally test:

- 375px
- 414px

for critical mobile flows and any screen containing:

- sticky bottom CTA
- fixed navigation
- bottom navigation
- complex forms
- horizontal tabs
- modal/sheet behavior
- dense mobile cards
- keyboard-sensitive inputs

If an MGP Design target was created at another explicit viewport width, test that exact viewport as well.

The exact design viewport must be included in design-vs-route comparison whenever available.

Use actual MGP mobile/tablet targets wherever provided.

Do not simply shrink desktop layout when MGP DESIGN provides a distinct mobile structure.

Verify:

- header changes correctly
- local top bar behavior
- bottom navigation presence/absence
- sticky CTA presence/absence
- sidebar collapse behavior
- drawer behavior
- card stacking
- column collapse
- tabs scrolling or wrapping
- text clipping
- button overflow
- form width
- modal width
- image cropping
- fixed element overlap
- keyboard-safe form behavior where applicable
- horizontal scroll
- touch target usability
- footer behavior
- section ordering
- safe spacing around fixed/sticky UI

Required:

- no unintended horizontal page overflow
- no content hidden behind sticky navigation
- no overlapping fixed elements
- no desktop-only layout forced onto a distinct mobile design

For each tested viewport record:

| Viewport | Route | Main Checks | Result | Evidence |
|---|---|---|---|---|

---

# 13. STATE VERIFICATION

For every relevant target test:

- default
- loading
- empty
- populated
- partial data
- long text/content
- validation failure
- server failure
- permission denied
- unauthorized
- not found
- success
- destructive-action confirmation

Where MGP DESIGN provides a specific state target, use it as the visual source of truth.

Do not silently substitute a generic application-wide state when the design provides a screen-specific state.

---

# 14. REGRESSION VERIFICATION

After visual replacement, verify that existing working product behavior has not been broken.

Check where applicable:

- authentication
- login
- logout
- role-based access
- protected routes
- navigation
- deep links
- query parameters
- redirects
- server actions
- APIs
- database writes
- database reads
- validation
- RLS/security
- permissions
- saved user state
- cross-page workflows
- role-specific workflows
- responsive routing behavior

Visual migration must not remove working business functionality.

---

## 14.1 SHARED COMPONENT IMPACT RULE

Before changing any shared implementation unit, identify every manifest target that depends on it.

This includes shared:

- application shells
- public shells
- dashboard shells
- admin shells
- headers
- footers
- sidebars
- bottom navigation
- navigation components
- sticky CTA components
- design tokens
- typography rules
- spacing rules
- UI primitives
- form components
- card components
- listing components
- detail components
- modal/drawer components
- shared responsive utilities

Record affected target IDs before making the shared change.

After changing a shared dependency:

1. re-check every affected previously COMPLETE target;
2. rerun relevant visual checks;
3. rerun relevant responsive checks;
4. rerun relevant interaction checks;
5. rerun regression checks where behavior may have changed;
6. update affected verification reports;
7. change any broken COMPLETE target back to IN_PROGRESS or NOT COMPLETE until repaired and reverified.

A new target must not be marked COMPLETE when its shared-component change breaks a previously completed target.

Shared component reuse must not force the same chrome or layout onto targets whose mapped MGP designs differ.

# 15. VERIFICATION EVIDENCE RULE

Do not claim manual verification based only on code inspection.

A verification PASS requires actual runtime evidence where the required environment and tooling are available.

Evidence should include, where applicable:

- tested route
- tested viewport width
- exact mapped design source
- rendered screenshot or reference comparison
- interaction performed
- expected result
- actual result
- backend/data result
- persistence result after refresh
- navigation result
- console/runtime error result
- relevant test output

A status label without evidence is not sufficient for PASS.

If verification cannot actually be performed because of missing:

- environment
- data
- credentials
- service
- browser automation
- rendering tooling
- external dependency

mark the affected check:

- BLOCKED, or
- UNVERIFIED

Never fabricate a PASS.

---

# 16. FOUR MANDATORY PASS GATES

Every canonical target must receive four separate gate statuses.

## 16.1 VISUAL GATE

PASS only if:

- exact mapped design structure is followed
- correct screen chrome is used
- section order is correct
- no required design section is missing
- no unnecessary legacy visual block remains
- wireframe comparison was performed
- visual evidence is recorded

## 16.2 FUNCTIONAL GATE

PASS only if:

- every visible interaction is tested
- existing behavior is connected
- new functionality is implemented
- forms are validated
- real data is used
- persistence is verified where applicable
- states are handled
- no dead controls remain
- functionality evidence is recorded

## 16.3 RESPONSIVE GATE

PASS only if:

- required viewport widths are tested
- mapped mobile/tablet targets are followed where provided
- screen-specific chrome behaves correctly
- no unintended overflow exists
- no fixed/sticky overlap exists
- content order is correct
- responsive evidence is recorded

## 16.4 REGRESSION GATE

PASS only if:

- existing business functionality remains working
- auth/roles remain correct
- permissions remain correct
- security remains correct
- data behavior remains correct
- related routes/workflows remain working
- regression evidence is recorded

Required final status format:

- `VISUAL: PASS`
- `FUNCTIONAL: PASS`
- `RESPONSIVE: PASS`
- `REGRESSION: PASS`
- `FINAL: COMPLETE`

If any required gate is:

- FAIL
- PARTIAL
- BLOCKED
- UNVERIFIED

then:

`FINAL: NOT COMPLETE`

---

# 17. REQUIRED VERIFICATION REPORT

For every canonical target create or update:

`docs/design-migration/verification/<SCREEN_ID>_VERIFY.md`

Include:

1. target ID
2. design source
3. route/component
4. top-to-bottom structure comparison
5. old UI removed
6. functionality preserved
7. new functionality implemented
8. interaction-by-interaction check
9. form tests
10. state tests
11. data verification
12. persistence verification
13. responsive viewport verification
14. actual wireframe/design comparison
15. console/runtime verification
16. VISUAL gate result
17. FUNCTIONAL gate result
18. RESPONSIVE gate result
19. REGRESSION gate result
20. blockers
21. remaining issues
22. evidence summary
23. final status

---

# 18. REPOSITORY SAFETY RULE

Treat the current working tree as potentially containing valid migration work from previous sessions or accounts.

Do not use destructive Git operations to remove changes unless explicitly required and verified safe.

Do not blindly run destructive:

- reset
- checkout
- restore
- clean
- revert

against migration work.

Do not overwrite or revert unrelated valid work from previous sessions or accounts.

Before modifying the active target:

1. inspect git status;
2. inspect relevant diffs;
3. inspect tracking files;
4. identify unfinished work for the active target;
5. identify the recorded resume point;
6. continue from the current implementation state.

After completing a target, keep code and tracking documents synchronized.

---

# 19. CONTINUATION AND ACCOUNT-SWITCH SAFETY

The repository tracking files must be sufficient for continuation after:

- context compaction
- session limits
- logout/login
- switching Claude accounts
- restarting the assistant session

A continuation session must review:

- `MGP_FULL_DESIGN_MIGRATION_MASTER.md`
- `docs/design-migration/SCREEN_MANIFEST.md`
- `docs/design-migration/CHROME_MATRIX.md`
- `docs/design-migration/contracts/`
- `docs/design-migration/verification/`
- current code
- git status
- relevant diffs and recent changes where available

If an IN_PROGRESS target exists:

- resume that target first;
- inspect its contract;
- inspect its current code diff;
- inspect its verification report;
- inspect its recorded resume point.

Do not start a new target while an earlier manifest target is IN_PROGRESS unless the earlier target is explicitly BLOCKED and the blocker is documented.

Do not trust COMPLETE/PASS labels blindly.

Validate that claimed completion has implementation and evidence.

---

# 20. GLOBAL FINAL AUDIT

After all manifest targets are processed, perform a complete project audit.

Report:

- `TOTAL_DISCOVERED_DESIGN_TARGETS`
- `TOTAL_MANIFEST_ENTRIES`
- `TOTAL_CANONICAL_IMPLEMENTATION_TARGETS`
- `TOTAL_REFERENCE_ONLY_TARGETS`
- `TOTAL_UNMAPPED_TARGETS`
- `IMPLEMENTED`
- `VISUAL_PASS`
- `FUNCTIONAL_PASS`
- `RESPONSIVE_PASS`
- `REGRESSION_PASS`
- `IN_PROGRESS`
- `PARTIAL`
- `BLOCKED`
- `UNVERIFIED`
- `MISSING`
- `OLD_UI_REMNANTS`
- `DEAD_CONTROLS`
- `PLACEHOLDER_FEATURES`
- `RESPONSIVE_FAILURES`
- `UNVERIFIED_INTERACTIONS`
- `FUNCTIONALITY_GAPS_OPEN`

The migration is complete only when:

- `TOTAL_UNMAPPED_TARGETS = 0`
- `IN_PROGRESS = 0`
- `PARTIAL = 0`
- `BLOCKED = 0`
- `UNVERIFIED = 0`
- `MISSING = 0`
- `OLD_UI_REMNANTS = 0`
- `DEAD_CONTROLS = 0`
- `PLACEHOLDER_FEATURES = 0`
- `RESPONSIVE_FAILURES = 0`
- `UNVERIFIED_INTERACTIONS = 0`
- `FUNCTIONALITY_GAPS_OPEN = 0`

Do not claim completion based only on:

- build success
- lint success
- type-check success
- unit-test success alone
- page rendering
- visual similarity

These are useful signals, not sufficient completion proof.

---

# 21. PROHIBITED EXECUTION BEHAVIOR

Do not:

- blindly preserve old UI
- apply one global shell to every screen
- add a header/footer/sidebar because another screen has one
- skip design targets because a similar screen exists
- create duplicate routes for reference-only targets
- treat design-system specimen boards as routes without product evidence
- create static fake modules
- leave visible controls disconnected
- hardcode fake data when real data exists
- implement desktop and ignore mobile
- shrink desktop blindly when a distinct mobile design exists
- verify only through source-code reading
- claim manual testing without runtime evidence
- mark a batch complete after implementing only selected targets
- mark COMPLETE while any required gate is BLOCKED or UNVERIFIED
- overwrite unfinished valid work from another session/account
- silently invent unclear business behavior

---

# 22. REQUIRED EXECUTION BEHAVIOR

Do:

- inventory every design source deterministically
- map every target
- classify canonical vs reference targets
- reconcile coverage totals
- create screen contracts
- mark active work IN_PROGRESS
- record resume points
- migrate one target at a time
- preserve real functionality
- replace legacy presentation
- implement new functionality end-to-end
- use complete real product data
- manually verify screen structure
- compare actual design and actual route at matching viewports
- test every visible interaction
- verify forms
- verify data and persistence
- verify states
- verify responsive behavior
- verify regression behavior
- record concrete evidence
- mark blocked checks honestly
- keep code and tracking synchronized
- continue until the complete manifest is closed

---

# 23. FINAL CORE RULE

For every MGP DESIGN target:

SHOW THE SCREEN AS DESIGNED.

FOLLOW THE EXACT TARGET STRUCTURE FROM TOP TO BOTTOM.

DO NOT ADD LEGACY VISUAL SECTIONS THAT ARE ABSENT FROM THAT TARGET.

DO NOT DELETE REQUIRED PRODUCT CAPABILITY JUST BECAUSE THE DESIGN USES SAMPLE OR SHORTENED CONTENT.

USE COMPLETE REAL WEBSITE DATA AND PRODUCT REQUIREMENTS INSIDE THE MGP DESIGN SYSTEM.

PRESERVE AND RECONNECT EXISTING FUNCTIONALITY.

BUILD GENUINELY NEW DESIGN FUNCTIONALITY END-TO-END.

- do not leave actual or implied interactive controls blank, fake, placeholder-only, hardcoded-fake, disconnected, or dead;
- do not invent interactions for purely informational elements; apply the INTERACTION INTENT RULE from the master file;

VERIFY THE EXACT WIREFRAME AGAINST THE IMPLEMENTED ROUTE.

VERIFY EVERY VISIBLE INTERACTION.

VERIFY REAL DATA, BACKEND BEHAVIOR, PERSISTENCE, VALIDATION, PERMISSIONS, AND SECURITY.

VERIFY DESKTOP, TABLET, AND MOBILE BEHAVIOR.

RECORD EVIDENCE.

A TARGET IS NOT COMPLETE UNTIL:

- VISUAL = PASS
- FUNCTIONAL = PASS
- RESPONSIVE = PASS
- REGRESSION = PASS

AND THE EVIDENCE IS RECORDED.
