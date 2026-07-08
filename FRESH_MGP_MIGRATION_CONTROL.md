# FRESH MGP MIGRATION CONTROL

## 0. PURPOSE

This file controls the fresh visual rebuild of the full MGP project from Batch 1 through Batch 17.

The migration goal is:

**EXACT MGP DESIGN PRESENTATION  
+ COMPLETE REAL PRODUCT DATA  
+ COMPLETE REAL PRODUCT CAPABILITY  
+ EXISTING WORKING FUNCTIONALITY RECONNECTED  
+ NEW DESIGN FEATURES IMPLEMENTED END-TO-END  
+ FRESH LIVE VERIFICATION**

This is **not** a restyle, patch, gap-fill, or legacy-page enhancement exercise.

Authoritative design source:

`C:\Users\RAJAN\Documents\MGP DESIGN`

Also read and follow:

- `MGP_FULL_DESIGN_MIGRATION_MASTER.md`
- current `docs/design-migration/` tracking files
- current repository state

Where this file conflicts with historical visual implementation instructions, historical visual status, or old visual verification claims, this file controls the fresh rebuild process.

---

# 1. ABSOLUTE DESIGN-FIRST RULE

For every screen target, the exact mapped MGP DESIGN target must be inspected **before** the current route/page composition is used for implementation planning.

Required order:

1. Open the exact MGP DESIGN target.
2. Render it where possible.
3. Extract and freeze the exact screen blueprint.
4. Freeze screen-specific chrome.
5. Freeze required blocks and section order.
6. Freeze responsive/mobile/tablet variants and states.
7. Only then inspect the old application for functionality, data, backend, validation, security, permissions, routing, and persistence.
8. Build a new MGP presentation tree from the frozen blueprint.
9. Reconnect complete real product capability into that new structure.
10. Implement new design features end-to-end.
11. Cut the real route over to the new MGP presentation tree.
12. Remove legacy visual remnants.
13. Perform fresh live verification.

Required implementation flow:

`MGP DESIGN → BLUEPRINT → NEW PRESENTATION TREE → REAL DATA → EXISTING FUNCTIONALITY → NEW FEATURES → LIVE VERIFICATION`

Forbidden flow:

`OLD PAGE → PATCH → RESTYLE → INSERT SOME MGP SECTIONS → KEEP OLD STRUCTURE`

Do not begin by editing the old page section-by-section.

---

# 2. HISTORICAL STATUS DOES NOT CONTROL FRESH VISUAL WORK

Do not use any historical status to skip fresh visual reconstruction or fresh verification.

The following are historical context only:

- COMPLETE
- IMPL
- IMPL✓
- VERIFIED
- PASS
- runtime-verified
- old screenshots
- old verification reports
- old responsive checks
- old interaction checks
- old prompt completion claims

Tracking must clearly separate:

`HISTORICAL_VISUAL_STATUS`

from:

`FRESH_REBUILD_STATUS`

And separately:

`HISTORICAL_FUNCTIONAL_STATUS`

from:

`FUNCTIONALITY_REUSE_STATUS`

A target may have a working backend and still require a fresh visual rebuild.

A target may be historically verified and still require fresh evidence.

Fresh PASS requires fresh evidence generated during the current batch cycle.

---

# 3. PER-SCREEN DESIGN SOURCE BINDING

Every canonical implementation target must record:

- `DESIGN_SOURCE_FILE`
- `DESIGN_TARGET_ID`
- `DESIGN_TARGET_TITLE`
- `DESIGN_VIEWPORT`
- `CHROME_SOURCE`
- `HEADER_SOURCE`
- `FOOTER_SOURCE`
- `SIDEBAR_SOURCE`
- `BOTTOM_NAV_SOURCE`
- `STICKY_CTA_SOURCE`
- `MOBILE_CHROME_SOURCE`
- `DESIGN_REQUIRED_BLOCKS`
- `DESIGN_BLOCK_ALLOWLIST`
- `LEGACY_UI_TO_REMOVE`
- `LEGACY_VISUAL_REUSE_ALLOWED: NO`

Do not use a previously modified shared header, footer, shell, sidebar, card, or layout merely because it was historically marked complete.

Each screen must use the exact chrome shown by its own mapped design target.

If a screen shows no header, render no header.

If a screen shows no footer, render no footer.

If a screen shows no sidebar, render no sidebar.

If a screen has a contextual header, do not substitute a full public header.

If a mobile target uses a bottom sheet, do not substitute a desktop modal.

If an existing parent layout injects wrong chrome:

- bypass it,
- split it,
- make chrome target-specific,
- or refactor safely.

Implementation convenience never overrides the exact screen design.

---

# 4. SCREEN BLUEPRINT — REQUIRED BEFORE CODING

Before changing implementation code for a target, create a concise screen blueprint from the exact design.

Record:

## Screen identity

- target ID
- batch
- route
- canonical relationship
- responsive/state relationship

## Exact chrome

- header present/absent and exact type
- footer present/absent and exact type
- sidebar present/absent
- topbar present/absent
- bottom navigation present/absent
- sticky CTA present/absent
- breadcrumb present/absent
- tabs present/absent
- floating actions present/absent

## Top-to-bottom structure

Record the exact visible order from first visible element to final page ending.

Include:

- hero/gallery
- title/summary area
- facts/metrics
- sections
- cards/modules
- tabs
- side panels
- related content
- actions
- contact blocks
- forms
- modal/drawer/sheet relationships
- footer/page ending

## Responsive structure

Record separately:

- desktop
- tablet
- mobile
- sections that move
- sections that collapse
- desktop-only structures
- mobile-only structures
- drawer/sheet transformations
- sticky CTA changes
- gallery changes
- navigation changes

## UI states

Account for all applicable:

- default
- loading
- empty
- populated
- partial data
- unavailable
- success
- error
- failure
- forbidden
- unauthorized
- not found
- setup required
- provider unavailable
- suspended
- rate limited

Do not inspect the legacy page composition until this blueprint is frozen.

---

# 5. NEW MGP PRESENTATION TREE IS THE VISUAL BASE

The new MGP presentation tree must become the actual route composition.

The legacy visual page must not be used as the visual base.

Allowed reuse from old code:

- backend logic
- APIs
- server actions
- data loaders
- hooks
- state logic
- validation
- business rules
- auth
- permissions
- RLS/security
- routing
- redirects
- query params
- persistence
- domain logic
- useful workflows

Visual reuse is allowed only if the reused visual component independently matches the exact required MGP pattern for the current target.

Do not reuse:

- legacy page composition
- legacy section order
- legacy shell
- legacy header/footer
- legacy sidebar
- legacy page wrappers
- legacy responsive composition
- old cards/modules merely because they already work

Where needed:

- replace route JSX
- create new MGP components
- rebuild page structure
- split shared shells
- bypass inherited chrome
- move existing handlers into new components
- reconnect existing actions/data loaders to the new UI

---

# 6. NO HYBRID OLD + NEW PAGE

Hybrid visual pages are prohibited.

Do not create:

- old header + new body
- new hero + old sections
- old dashboard shell + new module
- new cards inside old page composition
- MGP sections followed by legacy sections
- old footer where the design has none
- old sidebar where the design has none
- duplicate old and new action surfaces
- old navigation combined with new navigation

The final route must be one coherent MGP visual composition.

Required before VISUAL PASS:

- `MISSING_DESIGN_BLOCKS = 0`
- `EXTRA_VISUAL_BLOCKS = 0`
- `LEGACY_VISUAL_COMPONENTS_RENDERED = 0`
- `CHROME_MISMATCHES = 0`
- `HYBRID_OLD_NEW_LAYOUT = 0`
- `OLD_UI_REMNANTS = 0`

If any value is non-zero, VISUAL cannot PASS.

---

# 7. GLOBAL COMPLETE PRODUCT CAPABILITY RULE

This rule applies globally to every batch and every product surface.

It is not limited to property types or any single example.

If the MGP DESIGN shows only sample, shortened, illustrative, or partial content, do not reduce the real product capability to match the sample count.

For every:

- screen
- component
- section
- module
- form
- table
- card group
- dashboard
- workflow
- filter
- dropdown
- select
- tab set
- status set
- list
- configuration
- role option set
- permission set
- content block
- analytics module
- billing module
- CRM module
- admin module
- property module
- project module
- ads module
- notification module
- location hierarchy
- wizard

preserve the complete relevant real:

- data
- fields
- options
- records
- statuses
- types
- categories
- configurations
- features
- amenities
- modules
- sections
- workflows
- actions
- permissions
- business rules

Present complete real capability using the nearest matching MGP DESIGN pattern.

Do not:

- hardcode only the sample values shown in the design
- remove real product capability because the design example is shorter
- restore the old layout to show additional data
- append legacy sections below the MGP screen
- preserve old visual modules merely because they contain more fields

Correct:

`NEW MGP DESIGN STRUCTURE + COMPLETE REAL PRODUCT CAPABILITY`

Wrong:

`NEW MGP SCREEN + OLD LEGACY SECTION APPENDED FOR MISSING DATA`

---

# 8. PRESERVE FUNCTIONALITY WITHOUT PRESERVING OLD PRESENTATION

When an old visual section is absent from the MGP DESIGN but its product capability is still required:

1. preserve the underlying functionality/data;
2. remove the old visual section;
3. find the nearest logical MGP section/component pattern;
4. integrate complete real capability inside that pattern;
5. preserve MGP hierarchy and page structure.

Do not retain the old section simply because it contains more fields or working buttons.

The old app is a source of capability, not a source of visual composition.

---

# 9. NEW DESIGN FEATURES MUST BE IMPLEMENTED AUTOMATICALLY

If the MGP DESIGN shows a new feature that does not exist in the old application:

Do not ask whether it should be implemented.

Default behavior:

`YES — IMPLEMENT IT END-TO-END`

Before implementation inspect:

- existing code
- database schema
- backend infrastructure
- product docs
- feature registry
- related workflows
- similar features
- roles
- permissions
- security/RLS rules

When intended behavior can be reliably derived, implement automatically.

Where applicable this includes:

- frontend UI
- frontend state
- interactions
- validation
- API/server action
- backend logic
- database changes
- migrations
- persistence
- authorization
- role checks
- RLS/security
- loading
- empty
- populated
- success
- failure
- retry/recovery
- duplicate-submit prevention
- optimistic update
- rollback
- refresh persistence
- navigation
- desktop behavior
- tablet behavior
- mobile behavior
- tests
- verification

Do not leave design features:

- fake
- hardcoded
- decorative-only
- disconnected
- placeholder-only
- Coming Soon
- visually clickable but dead
- simulated with fake success

Ask only when a genuine business/product ambiguity remains after exhausting code, schema, DB, docs, workflows, roles, permissions, security, and similar functionality.

---

# 10. BATCH COVERAGE RULE

Process every actual target in the active batch.

Include all applicable:

- route screens
- desktop variants
- tablet variants
- mobile variants
- responsive variants
- states
- modals
- dialogs
- drawers
- bottom sheets
- popovers
- dropdowns
- wizard steps
- shared interactive components
- sticky/fixed UI
- loading/empty/error states
- unavailable states
- unauthorized/forbidden states
- setup-required/provider states
- valid inherited relationships

Do not silently skip any target.

For genuine reference-only or inherited targets, record that explicitly.

Do not create duplicate routes for true inherited/reference-only targets.

---

# 11. SCREEN-BY-SCREEN EXECUTION LOOP

For each implementation target:

1. inspect exact MGP target;
2. create/freeze SCREEN BLUEPRINT;
3. bind exact per-screen design source;
4. freeze chrome;
5. create `DESIGN_REQUIRED_BLOCKS`;
6. create `DESIGN_BLOCK_ALLOWLIST`;
7. create `LEGACY_UI_TO_REMOVE`;
8. identify complete product capability;
9. identify functionality to reconnect;
10. identify new design features;
11. identify backend/data/security dependencies;
12. identify shared-component impact;
13. create/update contract;
14. mark `IN_PROGRESS`;
15. record exact resume point;
16. build the new MGP presentation tree;
17. remove legacy visual composition;
18. integrate complete real data;
19. reconnect existing working functionality;
20. implement new features end-to-end;
21. test interactions;
22. test forms;
23. test states;
24. test persistence;
25. test permissions/security;
26. test responsive behavior;
27. perform fresh rendered design-vs-route comparison;
28. run regression checks;
29. record fresh evidence;
30. update tracking;
31. determine gates.

Do not mark COMPLETE before the loop is finished.

---

# 12. INTERACTION VERIFICATION

Test every action-implying control where present:

- buttons
- icon buttons
- links
- tabs
- dropdowns
- selects
- filters
- chips
- checkboxes
- radios
- switches
- inputs
- search
- date pickers
- sliders
- uploads
- forms
- CTAs
- clickable cards
- pagination
- accordions
- menus
- modals
- dialogs
- drawers
- sheets
- close
- back
- share
- download
- call
- enquiry
- save
- favorite
- compare
- edit
- delete
- status change
- drag/drop
- wizard next/back
- submit
- retry
- cancel
- confirmation flows

Do not invent interactions for informational-only elements.

Labels, badges, metrics, captions, illustrations, and static explanatory content remain non-interactive when design intent is informational.

---

# 13. FORM AND WORKFLOW VERIFICATION

For forms where applicable test:

- empty submit
- required validation
- invalid input
- valid input
- min/max length
- long text
- special characters
- loading state
- duplicate submit
- server error
- network failure where testable
- success
- error feedback
- persistence
- refresh behavior
- permissions

For wizards test:

- next
- back
- step validation
- progress
- state retention
- refresh
- save draft where applicable
- final submit
- failure recovery
- duplicate-submit prevention

---

# 14. LIVE VISUAL VERIFICATION

Do not approve visual quality from source inspection alone.

Where tools are available:

1. render the exact MGP DESIGN target;
2. render the actual route;
3. use matching viewport sizes;
4. compare full page top-to-bottom.

Compare:

- first visible element
- header/topbar/sidebar/footer
- breadcrumb
- hero/gallery
- title hierarchy
- section presence
- section absence
- section order
- grouping
- widths
- columns
- card proportions
- image ratios
- typography hierarchy
- spacing rhythm
- tabs
- modal sizing
- drawer/sheet behavior
- sticky/fixed UI
- content density
- final page ending

A route screenshot alone is not enough.

DOM similarity alone is not enough.

Required:

`EXACT DESIGN TARGET vs ACTUAL ROUTE at MATCHING VIEWPORT`

---

# 15. RESPONSIVE AND UI DEFECT VERIFICATION

Follow the viewport matrix in `MGP_FULL_DESIGN_MIGRATION_MASTER.md`.

Also test exact design-defined viewports.

Verify:

- desktop structure
- tablet structure
- mobile structure
- shell changes
- content ordering
- sidebar collapse
- drawer behavior
- bottom navigation
- sticky CTA
- card stacking
- column collapse
- modal width
- bottom sheet behavior
- tab scroll/wrap
- image cropping
- touch usability
- footer behavior

Explicitly detect and fix:

- text overflow
- text clipping
- unintended ellipsis
- dropdown text clipping
- select text clipping
- insufficient component width
- squeezed fields
- zero-width controls
- button overflow
- long-label overflow
- horizontal page overflow
- card overflow
- modal overflow
- drawer overflow
- content behind sticky UI
- fixed overlap
- sticky overlap
- mobile-nav overlap
- broken wrapping
- font-width collisions
- breakpoint collisions

Use real browser/computed-layout auditing where possible.

Intentional horizontal scrolling/truncation is allowed only when design-supported, usable, and documented as intentional.

---

# 16. DATA, PERSISTENCE, SECURITY, AND RLS

Where applicable verify:

- real data source
- queries
- filters
- sorting
- pagination
- saved data
- create/update/delete
- refresh persistence
- role-specific data
- unauthorized access
- privacy masking
- counts
- empty state
- error state
- mutation failure
- optimistic rollback
- route guards
- auth
- redirects
- query params
- permissions
- RLS/security
- cross-page workflows

If a real DB/RLS/backend defect blocks required functionality:

- fix it safely
- create migration if needed
- preserve security
- apply only through approved workflow
- verify the fix
- record evidence

Do not hide backend defects behind UI-only workarounds.

---

# 17. PROVIDER-GATED FEATURES

Do not fabricate provider success.

Respect approved states such as:

- SETUP_REQUIRED
- FALLBACK_ACTIVE
- DISABLED_BY_FLAG
- DEV_ONLY
- PROVIDER_UNAVAILABLE

Verify approved fallback/setup-required behavior.

Keep separate:

- implementation status
- provider activation status
- real provider verification status

A correct approved fallback must not block unrelated migration progress.

---

# 18. SHARED COMPONENT IMPACT

Before changing shared:

- shell
- header
- footer
- sidebar
- bottom navigation
- token
- primitive
- form component
- card
- table
- modal
- drawer
- detail component
- responsive utility

identify all affected targets.

After the change:

1. re-check affected targets;
2. rerun relevant visual checks;
3. rerun responsive checks;
4. rerun interactions;
5. rerun regression;
6. update affected verification records.

A new target cannot be marked complete if its shared change breaks another target.

Do not reuse a shared visual component when the exact screen target requires different chrome or composition.

---

# 19. ENGINEERING CHECKS

Run relevant available:

- eslint
- typecheck
- build
- configured tests
- runtime route checks
- live interaction checks
- responsive browser checks
- persistence checks
- permission/security checks
- affected shared-component regression checks

Use a safe isolated build output only when needed to avoid interfering with another live process.

Restore temporary configuration afterward.

---

# 20. FRESH EVIDENCE RULE

Previous verification must not be reused as fresh proof.

Do not use old:

- screenshots
- PASS labels
- verification reports
- responsive results
- interaction results
- runtime recordings
- prompt completion claims

as fresh evidence.

Old evidence is historical context only.

Every current PASS requires evidence generated during the current batch cycle.

If a required check cannot run:

- mark exact check `UNVERIFIED`, `UNVERIFIED-AUTH`, or `BLOCKED`
- record exact missing requirement
- continue all other possible work

Do not fabricate PASS.

---

# 21. FOUR GATES

Every target requires:

- VISUAL
- FUNCTIONAL
- RESPONSIVE
- REGRESSION

Scoped subchecks may PASS.

Overall gate wording must not hide required unavailable checks.

Example:

`Guest functional checks: PASS`

`Authenticated persistence: UNVERIFIED-AUTH`

`Overall FUNCTIONAL: UNVERIFIED-AUTH`

`FINAL: NOT COMPLETE`

---

# 22. TRACKING RESET AND EXECUTION STATUS

Fresh rebuild execution order is controlled only by:

`FRESH_REBUILD_STATUS`

Historical status must not skip targets.

Use statuses such as:

- NOT_STARTED_FRESH_REBUILD
- NEEDS_FRESH_REBUILD
- IN_PROGRESS
- COMPLETE
- BLOCKED
- UNVERIFIED
- UNVERIFIED-AUTH

Keep synchronized:

- `SCREEN_MANIFEST.md`
- `TARGET_REGISTRY.md`
- `CHROME_MATRIX.md`
- target contracts
- target verification reports
- provider status
- security/RLS tracking where applicable
- exact checkpoint/resume state

Do not destroy historical evidence.

Separate historical and fresh status clearly.

---

# 23. CHECKPOINT FORMAT

For active work record:

- STATUS
- TARGET
- CURRENT STEP
- FILES CHANGED
- COMPLETED
- REMAINING
- BLOCKERS
- EXACT RESUME POINT
- VERIFICATION STATUS

Resume active fresh-rebuild targets first.

Do not skip a target because of old COMPLETE/VERIFIED status.

---

# 24. BATCH SESSION CONTROL

Each run must specify:

`PROCESS TXX / Batch X ONLY`

`DO NOT START TYY / Batch Y`

Process only the selected batch.

Continue until:

- every target is accounted for
- classifications are confirmed
- every implementation target is freshly inspected
- exact MGP reconstruction/correction is complete
- wrong legacy composition is removed
- complete real data is integrated
- existing functionality is reconnected
- new design functionality is implemented end-to-end
- all possible fresh verification is done
- tracking is synchronized

Do not stop to ask whether a clearly designed new feature should be implemented.

Implement it.

Ask only for a genuine unresolved product/business-rule ambiguity after exhausting the repository, DB, schema, docs, workflows, roles, permissions, security, and similar functionality.

---

# 25. TOKEN-EFFICIENT EXECUTION

Execute directly.

Do not narrate:

- every file read
- every search command
- every small edit
- routine reasoning
- repeated rule summaries

Keep progress updates short.

Use this file and the Master instead of restating rules in chat.

Final reports must be concise.

---

# 26. FINAL BATCH REPORT

At the end report only:

- batch targets processed / total
- screens reconstructed
- screens corrected
- legacy visual composition removed
- mismatches fixed
- complete data/fields/options integrated
- existing functionality reconnected
- new functionality implemented
- VISUAL gate
- FUNCTIONAL gate
- RESPONSIVE gate
- REGRESSION gate
- blockers
- UNVERIFIED / UNVERIFIED-AUTH checks
- important files changed
- exact next-batch starting point

Do not start the next batch.

---

# FINAL GOVERNING FORMULA

For every target:

`EXACT NEW MGP DESIGN PRESENTATION`

`+ COMPLETE REAL PRODUCT DATA`

`+ COMPLETE REAL PRODUCT CAPABILITY`

`+ WORKING BACKEND / SECURITY / VALIDATION PRESERVED`

`+ EXISTING FUNCTIONALITY RECONNECTED`

`+ NEW DESIGN FEATURES IMPLEMENTED END-TO-END`

`+ FRESH LIVE VERIFICATION`

Never:

`OLD PAGE DESIGN + SOME MGP FEATURES + MINOR RESTYLING`

Required before visual completion:

- `MISSING_DESIGN_BLOCKS = 0`
- `EXTRA_VISUAL_BLOCKS = 0`
- `LEGACY_VISUAL_COMPONENTS_RENDERED = 0`
- `CHROME_MISMATCHES = 0`
- `HYBRID_OLD_NEW_LAYOUT = 0`
- `OLD_UI_REMNANTS = 0`
- `DEAD_CONTROLS = 0`
- `PLACEHOLDER_FEATURES = 0`
- `UNVERIFIED_INTERACTIONS = 0`

A target is not visually complete until the exact mapped MGP DESIGN is the real visual page structure.
