# BATCH_05_FULL_DESIGN_FUNCTIONALITY_VERIFICATION_SPEC.md

# My Gujarat Property

## Design Batch 5

## Complete Posting Wizards, Drafts, Media, RERA Gate and Unit Inventory Specification

---

# 1. DOCUMENT PURPOSE

This document is the complete design, functionality, data-model, validation, draft, autosave, resume, media-upload, Location, contact-preference, preview, moderation, RERA, Subscription-gate, Unit Inventory, bulk-action, responsive, security, transaction-safety and live-verification specification for:

**My Gujarat Property · Design Batch 5 — Posting Wizards**

Batch 5 contains four complete posting systems:

1. **5A — Post Property Wizard**
2. **5B — Post Project Wizard**
3. **5C — Post Requirement Wizard**
4. **5D — Builder Unit Inventory**

The exact wizard counts are:

* Property: 9 steps
* Project: 10 steps
* Requirement: 7 steps

Batch 5 also contains:

* shared desktop wizard shell,
* shared mobile wizard shell,
* shared progress behavior,
* shared sticky footer,
* shared Back behavior,
* Save Draft,
* autosave,
* Draft Resume,
* validation summary,
* Media upload,
* Preview,
* Submitted states,
* edit-after-approval reapproval,
* Builder Unit Inventory,
* bulk unit actions,
* mobile Unit cards,
* Unit Edit modal/sheet.

Every design target and state is mandatory.

Nothing may be skipped.

---

# 2. ABSOLUTE DESIGN AUTHORITY

Use the actual Batch 5 design source:

`Batch 5 - Posting Wizards (Standalone).html`

The source design controls:

* desktop shell structure,
* mobile shell structure,
* progress indicator,
* sticky footer,
* button hierarchy,
* form-panel layout,
* validation summary,
* input presentation,
* Media uploader appearance,
* Draft Resume card,
* Edit/Reapproval warning,
* Preview frame,
* Submitted state,
* Unit Inventory Table,
* mobile Unit accordion/card,
* Unit Edit modal/sheet.

Do not implement from:

* current wizard appearance,
* generic Stepper UI,
* legacy Dashboard forms,
* old screenshots,
* assumptions.

---

# 3. MIGRATION RULE

The final implementation must:

**preserve correct functionality but replace conflicting presentation.**

Preserve when correct:

* Server Actions,
* validation schemas,
* database tables,
* ownership checks,
* role checks,
* RLS,
* draft records,
* moderation state transitions,
* Subscription gates,
* existing entity lifecycle.

Replace when conflicting:

* wizard shell,
* progress presentation,
* footer structure,
* form grouping,
* mobile layout,
* inconsistent Stepper components,
* incomplete Media placeholders,
* simplistic Preview panels,
* incomplete Project Unit step,
* incomplete Contact step,
* missing Unit Inventory UI.

---

# 4. COMPLETE BATCH 5 DESIGN TARGET INVENTORY

The required implementation targets are:

## T05-01

Post Property Wizard — 9 steps.

## T05-02

Post Project Wizard — 10 steps.

## T05-03

Post Requirement Wizard — 7 steps.

## T05-04

Builder Unit Inventory Management.

## T05-05

Desktop Wizard Shell with Step 3 validation state.

## T05-06

Mobile Wizard Shell with Step 6 Media Upload state.

## T05-07

All Property Wizard step panels.

## T05-08

Unit Inventory desktop grid/table with bulk actions.

## T05-09

Unit Inventory mobile accordion cards.

## T05-10

Unit Edit:

* mobile bottom sheet,
* desktop centered modal.

All ten targets must be implemented and verified.

---

# 5. GLOBAL BATCH 5 WIZARD RULE

The Batch 5 source explicitly locks the following rule:

**Every wizard uses the same progress indicator, the same sticky footer, the same Back behavior and the same responsive shell.**

This applies to:

* Property Wizard,
* Project Wizard,
* Requirement Wizard.

The only thing that changes is:

**the content of the active form panel.**

---

# 6. CURRENT SHARED-SHELL MISMATCH

The current repository uses different wizard architectures:

### Property

Uses:

* `WizardShell`
* `WizardProgress`
* custom mobile header.

### Project

Uses:

* `DashboardShellV2`
* generic `Stepper`
* inline bottom Navigation.

### Requirement

Uses:

* generic `Stepper`
* inline bottom Navigation.

This violates the Batch 5 shared-shell rule.

The final implementation must use one canonical Batch 5 Wizard system.

---

# 7. CANONICAL SHARED WIZARD COMPONENTS

Create or consolidate a shared architecture such as:

* `PostingWizardShell`
* `PostingWizardProgress`
* `PostingWizardFooter`
* `PostingWizardMobileHeader`
* `PostingWizardValidationSummary`
* `PostingWizardDraftState`
* `PostingWizardPreviewFrame`
* `PostingWizardSuccessState`

Names may differ, but behavior must be shared.

Do not copy/paste three independent versions.

---

# 8. DESKTOP WIZARD SHELL

The exact Batch 5 desktop design includes:

* Dashboard Sidebar context,
* wizard page context,
* Step progress,
* central form panel,
* sticky action footer.

The wizard should visually exist within the role-specific posting context shown by Batch 5.

Do not replace the exact design with only:

* a plain full-screen form,
* a centered narrow card with Logout button,
* an unrelated generic Dashboard form.

---

# 9. CURRENT PROPERTY WIZARDSHELL CONFLICT

The current `WizardShell` explicitly removes:

* Sidebar,
* Dashboard navigation

and renders:

* simple breadcrumb bar,
* Logout button,
* centered main panel.

That architecture conflicts with the actual Batch 5 desktop source.

Rebuild the Property Wizard shell accordingly.

---

# 10. ROLE-AWARE DESKTOP SIDEBAR

The shell must respect posting Role.

## Owner Property Wizard

Use applicable Owner navigation context.

## Broker Property Wizard

Use applicable Broker navigation context.

## Builder Project Wizard

Use applicable Builder navigation context.

## Owner Requirement Wizard

Use applicable Owner context.

## Broker Requirement Wizard

Use applicable Broker context.

Do not display Builder modules inside Owner posting.

---

# 11. SHARED SHELL DOES NOT MEAN SHARED WRONG NAVIGATION

The wizard presentation pattern is shared.

The Role-specific navigation context remains correct.

---

# 12. MOBILE WIZARD SHELL

Mobile source uses a compact contextual Header.

Example:

* Back
* Post Property
* Save Draft

Then:

* `Step 6 of 9`
* linear progress bar
* current step title/content.

No full Dashboard Sidebar is squeezed onto mobile.

---

# 13. MOBILE BOTTOM NAVIGATION RULE

Do not add Dashboard mobile bottom navigation if the exact Batch 5 wizard screen does not show it.

The posting flow uses its own wizard navigation.

---

# 14. MOBILE HEADER TITLE

Dynamic according to wizard:

* Post Property
* Post Project
* Post Requirement.

---

# 15. MOBILE SAVE DRAFT

`Save Draft`

must remain available according to source.

It must not disappear merely because the first server Draft row has not yet been created.

The architecture must support creating a Draft on Save Draft when sufficient minimum draft data exists.

---

# 16. CURRENT FIRST-STEP DRAFT PROBLEM

Current Property flow cannot save Step 1 because the Draft schema requires `property_type`, which belongs to Step 2.

The code works around this by advancing Step 1 locally without server persistence.

This means:

a User can type Step 1
→ close page before Step 2
→ lose content.

This is not complete Draft/Autosave behavior.

---

# 17. DRAFT SCHEMA REQUIREMENT

Draft validation must be intentionally less strict than final Submission validation.

Required architecture:

## Draft Schema

Accept partially completed Wizard data.

## Submit Schema

Require all publication-critical fields.

Do not force future-step fields merely to create a Draft.

---

# 18. SERVER DRAFT CREATION

A Draft should be creatable after meaningful first-step interaction.

At minimum:

* authenticated User,
* authorised Role,
* valid target type,
* partial safe payload.

---

# 19. TEMPORARY CLIENT BUFFER

Before the server Draft ID exists:

keep current Step input safely in Client state.

Autosave creates the server Draft at the earliest valid point.

---

# 20. SHARED PROGRESS COMPONENT

All three wizards must use the same visual component.

Current:

* Property uses `WizardProgress`
* Project/Requirement use generic `Stepper`.

Replace this inconsistency.

---

# 21. DESKTOP PROGRESS

Use numbered connected progress.

Required states:

* completed,
* current,
* upcoming.

Use Batch 1/Bath 5 tokens.

---

# 22. MOBILE PROGRESS

Exact pattern:

`Step X of N`

with:

* current step label,
* linear progress bar.

Examples:

* Step 6 of 9
* Step 4 of 10
* Step 3 of 7.

---

# 23. COMPLETE STEP COUNT RULE

The Wizard must represent the full designed count:

### Property

9.

### Project

10.

### Requirement

7.

---

# 24. CURRENT PROPERTY COUNT MISMATCH

Current Property `WizardProgress` receives only:

steps 1–8

because Submitted is treated outside progress.

Batch 5 source defines:

**9 steps.**

The final progress architecture must represent the complete flow correctly.

---

# 25. CURRENT PROJECT COUNT MISMATCH

Current Project Form contains:

9 interactive Step values.

The source defines:

10 steps including Submitted.

Correct the flow representation.

---

# 26. SUCCESS STATE DESIGN

The Submitted state may technically render after a successful mutation, but it must remain part of the designed Wizard progression.

Do not leave the user in a generic Success component unrelated to the Wizard design.

---

# 27. SHARED STICKY FOOTER

Exact global footer hierarchy:

* Back — ghost
* Save Draft — secondary
* Continue — primary

Final Preview step changes primary action to:

* Submit for Review
* Submit Project
* Submit Requirement

according to actual state.

---

# 28. FOOTER POSITION

Desktop:

sticky/fixed within the intended Wizard content context.

Mobile:

sticky bottom action bar.

It must not cover form content.

Add sufficient bottom content spacing.

---

# 29. FOOTER SAFE AREA

Mobile footer must respect:

`env(safe-area-inset-bottom)`.

---

# 30. CURRENT PROJECT/REQUIREMENT FOOTER MISMATCH

Current forms use:

* Back outline
* Next

inside the form card.

No consistent:

* Save Draft secondary action,
* shared sticky footer.

Replace with the canonical Batch 5 footer.

---

# 31. BACK BEHAVIOR

Within a wizard:

Back returns to the previous Step.

From Step 1:

Back exits to the correct Role-specific listing/dashboard context.

Do not unexpectedly discard Draft.

---

# 32. UNSAVED CHANGE PROTECTION

When local changes have not yet persisted and User tries to leave:

attempt immediate save or show an appropriate leave-warning flow.

Do not silently lose entered values.

---

# 33. SAVE DRAFT BEHAVIOR

`Save Draft` must:

1. validate only Draft-level constraints
2. create/update current Draft
3. preserve current Step
4. persist current data
5. update `updated_at`
6. return success/failure
7. display safe confirmation.

---

# 34. AUTOSAVE

Implement debounced autosave.

Recommended behavior:

* save after meaningful change pause,
* save on Step Continue,
* save before route exit where practical.

Do not call the database on every keystroke.

---

# 35. AUTOSAVE STATUS

Wizard should support honest states such as:

* Saving…
* Saved
* Couldn't save.

Do not show `Draft saved` before persistence succeeds.

---

# 36. AUTOSAVE FAILURE

If autosave fails:

* preserve local form values,
* show non-destructive retry state,
* do not advance Step if required server persistence failed.

---

# 37. DRAFT CONCURRENCY

Prevent older autosave requests from overwriting newer data.

Use:

* updated version,
* mutation sequence,
* optimistic concurrency

where necessary.

---

# 38. DRAFT LAST STEP

Persist current Wizard Step.

Do not derive Resume step only from whether a few fields are populated.

---

# 39. CURRENT DRAFT PROGRESS GAP

The current Property Draft Resume card derives:

`X of 6 sections filled`

from six field checks.

Source requires:

`6 of 9 steps done`.

Persist or reliably derive the actual Wizard progression.

---

# 40. DRAFT RE-ENTRY CARD

Exact source concept:

`DRAFT SAVED — RE-ENTRY CARD`

Example:

`3 BHK Apartment, Shrinand Res…`

`Draft · 6 of 9 steps done · saved 2 hrs ago`

Action:

`Continue`

Helper:

`Continue where you left off.`

---

# 41. DRAFT CARD LOCATION

Source rule:

Draft Resume card appears at the top of:

`My Listings`

for Property.

The current repository shows the resume card at the New Property wizard entry before the form.

Final implementation should:

* preserve useful wizard-entry Resume behavior where appropriate,
* also implement the source-required dashboard/list Resume card.

Do not force User to discover Draft only by clicking Post Property again.

---

# 42. START NEW

Where `Start New` is provided:

do not delete existing Draft.

Create a separate fresh Draft according to allowed draft-count policy.

---

# 43. MULTIPLE DRAFT POLICY

Define:

* whether multiple Drafts are allowed,
* maximum active Draft count,
* selection/resume behavior.

Do not let `get latest draft` make older Drafts unreachable.

---

# 44. DRAFT OWNERSHIP

Only Draft owner/team-authorised editor can:

* read,
* edit,
* submit.

RLS and Server Action checks required.

---

# 45. EDIT-AFTER-APPROVAL WARNING

Exact source:

`Editing will require re-approval`

`This listing is live. Saving changes sends it back to review; it stays hidden until approved again.`

Actions:

* Cancel
* Edit anyway

This confirmation is mandatory.

---

# 46. CURRENT PROPERTY EDIT WARNING GAP

Current Edit Property route only shows explanatory copy above the form.

It enters editing directly.

Add the explicit confirmation flow before editing an active Listing.

---

# 47. EDIT REAPPROVAL STATE

For an active approved Listing:

Edit Anyway
→ editable draft/revision
→ Submit changes
→ Pending Review
→ public visibility follows approved policy.

The source copy states it remains hidden until approved again.

Implement consistently.

---

# 48. REVISION SAFETY

For production-grade editing, prefer:

* active Published revision,
* pending Draft revision

rather than destructively overwriting the live record before reapproval.

If the existing model hides the entire current row during re-review, ensure behavior matches approved product policy.

---

# 49. NO ACCIDENTAL LIVE CHANGE

A user editing:

* price,
* title,
* Location,
* Property type,
* Project RERA data

must not alter the public live entity before the correct moderation transition.

---

# 50. VALIDATION ARCHITECTURE

Use:

* Client immediate validation for UX,
* Server schema validation for authority,
* database constraints for integrity where appropriate.

Do not trust Client validation alone.

---

# 51. VALIDATION SUMMARY

Exact Batch 5 source includes:

`2 fields need attention — Expected price, Carpet area.`

Required behavior:

* count invalid fields,
* list understandable field labels,
* mark fields,
* focus first invalid field when appropriate.

---

# 52. INLINE FIELD ERRORS

Show error directly under the input.

Do not only display a generic top banner.

---

# 53. STEP TRANSITION VALIDATION

Continue validates the active Step.

Final Submit validates:

the full entire entity payload.

---

# 54. CROSS-FIELD VALIDATION

Examples:

* min Price ≤ max Price,
* min Budget ≤ max Budget,
* min Area ≤ max Area,
* floor ≤ total floors,
* possession date ≥ appropriate launch date where applicable,
* RERA required condition,
* Property purpose-specific pricing,
* Wing/Floor/Unit consistency.

---

# 55. NUMBER INPUT FORMATTING

User-facing monetary fields should support Indian-readable formatting/help.

Store numeric values safely.

Do not parse invalid comma formatting incorrectly.

---

# 56. CONDITIONAL FIELD RULE

The design shows samples.

The real product supports a larger Gujarat/India Property model.

Use the design pattern while retaining relevant conditional fields.

Do not delete valid product capabilities merely because the sample screen shows Apartment fields.

---

# 57. 5A — PROPERTY WIZARD OVERVIEW

The Property Wizard is available to:

* Owner
* Broker

according to canonical permissions.

Builder cannot post normal Property unless a future approved Role rule explicitly allows it.

---

# 58. PROPERTY WIZARD EXACT STEPS

1. Basic Details
2. Type & Purpose
3. Price & Area
4. Location
5. Amenities
6. Media
7. Contact Details
8. Preview
9. Submitted

---

# 59. PROPERTY STEP 1 — BASIC DETAILS

Exact fields:

* Listing Title *
* Description *

Helper:

`Shown in search results — keep it specific.`

---

# 60. PROPERTY TITLE

Required.

Server length validation.

Current implementation minimum:

5 characters.

Use final approved validation constraints.

---

# 61. DESCRIPTION

Source helper:

`Min 30 characters`

Reference counter:

`132/2000`

Reconcile current max length, currently larger, with the final product-approved constraint.

The UI must use the actual server limit.

Do not display 2000 while accepting 5000 silently unless intentionally approved.

---

# 62. DESCRIPTION COUNTER

Live counter.

Accessible.

Do not count HTML markup.

---

# 63. PROPERTY STEP 2 — TYPE & PURPOSE

Source examples:

### Purpose

* Sale
* Rent

### Category

* Residential
* Commercial
* Plot / Land

### Type examples

* Apartment
* Independent House
* Villa / Bungalow
* Penthouse

---

# 64. COMPLETE PROPERTY PURPOSES

Preserve complete canonical values supported by the real platform, including applicable:

* Sell
* Rent
* Lease
* PG/Hostel
* Business Sale

when relevant to category/business rules.

Use Batch 5 control patterns.

---

# 65. COMPLETE PROPERTY CATEGORIES

Preserve full product categories:

* Residential
* Commercial
* Industrial
* Land / Plot
* PG / Hostel / Room
* Business

where approved.

---

# 66. TYPE DEPENDENCY

Property Type options change according to Category.

Changing Category must:

* clear incompatible Type,
* clear or hide irrelevant fields safely.

---

# 67. TYPE-AWARE DATA PRESERVATION

If User temporarily changes Category and returns:

define whether previous values restore or reset.

Do not silently persist incompatible hidden fields to final public data.

---

# 68. PROPERTY STEP 3 — PRICE & AREA

Exact source desktop reference:

* Expected price *
* Price negotiable?
* Carpet area *
* Area unit selector
* Additional charges

---

# 69. EXPECTED PRICE

Helper:

`Enter numbers only, e.g. 8500000`

Use correct field depending Purpose:

* Price for Sale
* Monthly Rent for Rent
* Lease amount according to approved model.

---

# 70. PRICE NEGOTIABLE

Exact concept:

`Yes, open to offers`

Persist real boolean.

---

# 71. CARPET AREA

Required where applicable.

Not applicable to every:

* Land,
* Business,
* special Property subtype.

Use type-aware validation.

---

# 72. AREA UNIT

Use canonical allowed units.

Do not store display text as arbitrary units.

---

# 73. ADDITIONAL CHARGES

Exact source helper:

`Maintenance, parking, society deposit…`

Model charges structurally where possible.

Do not put every charge into one unsearchable text field if billing/search requires structured values.

---

# 74. CURRENT STEP 3 FOUNDATION

Current form already supports:

* Sale Price,
* Rent,
* Deposit,
* Negotiable,
* Area,
* Built-up Area,
* Carpet Area,
* Plot Area,
* Maintenance.

Preserve these capabilities using the exact design pattern.

---

# 75. PROPERTY STEP 3 ERROR STATE

Exact source example:

* Expected Price invalid
* Carpet Area required

Top summary count:

2 fields.

Inline red borders and errors.

---

# 76. PROPERTY STEP 4 — LOCATION

Exact source:

* Locality *
* autosuggest
* map pin
* current-location mobile action.

---

# 77. AUTOSUGGEST EXAMPLES

Reference:

* Satellite, Ahmedabad
* Satellite Road, Rajkot

Use canonical Batch 14 Location hierarchy and aliases.

---

# 78. LOCATION DATA MODEL

Use structured identifiers where available:

* State
* District
* Taluka
* City/Village
* Area
* Locality
* Society
* Building.

Do not make free-text City/Locality the final authority.

---

# 79. CURRENT LOCATION GAP

Current Property form uses:

* static Gujarat City selector,
* free-text Locality,
* free-text Building,
* free-text address,
* Landmark,
* PIN.

It explicitly says full hierarchy and Map Pin are future work.

Batch 5 completion requires the actual Location experience.

---

# 80. MISSING LOCATION REQUEST

If Locality is absent:

connect to Batch 14 Missing Location workflow.

Do not force invalid free text into canonical Location ID.

---

# 81. MAP PIN

User can drag pin to exact Location according to source.

Respect:

* Map Provider status,
* Map Visibility selection,
* privacy model.

---

# 82. MAP PROVIDER MISSING

Do not show broken Map.

Show:

Setup Required or approved address-only fallback.

User can still complete valid non-map Location fields.

---

# 83. USE CURRENT LOCATION

Mobile action:

`Use current location`

Requirements:

* explicit permission request,
* denied state,
* timeout/error state,
* reverse geocoding where provider supports it.

Do not claim current Location detected if geolocation fails.

---

# 84. PIN CODE VALIDATION

Validate 6-digit Indian PIN format.

Where Location hierarchy is authoritative:

detect mismatch when practical.

---

# 85. EXACT ADDRESS PRIVACY

Exact private address must not automatically become public.

Public display follows Map/Location visibility rule.

---

# 86. PROPERTY STEP 5 — AMENITIES

Exact source groups:

## Basic

* Parking
* Lift
* Power Backup

## Safety

* 24×7 Security
* CCTV
* Fire Safety

## Lifestyle

* Garden
* Gym
* Kids Play Area

---

# 87. COMPLETE AMENITY REGISTRY

The real product may support additional approved Amenities.

Use the same categorized chip pattern.

Do not reduce valid functionality to only source samples.

---

# 88. AMENITY KEYS

Store canonical keys.

Render localized labels.

---

# 89. PROPERTY TYPE-SPECIFIC AMENITIES

Do not show irrelevant Amenities.

Example:

Apartment and Industrial Land may need different relevant options.

---

# 90. PROPERTY STEP 6 — MEDIA

This is a full functional Media uploader.

The final screen must not remain `SETUP_REQUIRED`.

---

# 91. MEDIA MOBILE SOURCE

Exact:

`Tap to add photos`

`JPG/PNG · max 10 MB each · min 3 photos required`

---

# 92. MEDIA MINIMUM

Final Submit requires at least:

3 valid photos

for Property types where the design/business rule applies.

Draft can remain incomplete.

---

# 93. PHOTO RECOMMENDATION

Source helper:

`1 more photo needed — listings with 5+ photos get 2× more views.`

Only use the `2× more views` claim if it is supported by actual evidence and approved marketing/legal copy.

Otherwise preserve the design helper position but use truthful approved copy.

---

# 94. FILE TYPES

Source explicitly mentions:

* JPG
* PNG.

The broader media platform supports additional formats.

Use only formats the production upload pipeline can safely process.

---

# 95. FILE SIZE

Maximum:

10 MB each

according to source.

Enforce:

* Client for UX,
* server/storage upload authorization for security.

---

# 96. UPLOAD PROGRESS

Show per-file progress.

Reference:

`62%`

Use actual upload progress.

---

# 97. UPLOAD FAILURE

Each file needs:

* failed state,
* Retry,
* Remove.

Do not mark failed upload as complete.

---

# 98. COVER PHOTO

First photo is Cover according to source.

Display:

`Cover`

badge.

---

# 99. REORDER

Source:

`Long-press to reorder`

Mobile.

Desktop may support drag/reorder.

Persist sort index.

---

# 100. REORDER SCROLL SAFETY

Long-press/reorder must not interfere with normal page scroll.

---

# 101. CROP

Source refers to:

`tap ✂ to crop`

Implement actual crop flow.

Store:

* crop metadata,
* or processed variant.

Do not destructively lose original image.

---

# 102. IMAGE PROCESSING

Production media pipeline should support:

* original storage,
* safe optimized variants,
* WebP/AVIF where configured,
* multiple responsive sizes,
* EXIF removal,
* orientation normalization,
* safe crop.

---

# 103. UPLOAD CLEANUP

Handle:

* abandoned upload,
* failed multipart upload,
* replaced image,
* deleted Draft,
* orphan file cleanup.

---

# 104. CURRENT PROPERTY MEDIA GAP

Current Property Media Step is only:

`Photo upload coming soon`

and permits Submit without source-required media.

This is a completion blocker.

---

# 105. PROPERTY STEP 7 — CONTACT DETAILS

Exact source:

* Confirm Contact Number
* `+91 ...`
* Verified
* Preferred Contact Time
* Anytime
* 9 AM – 1 PM
* 5 – 9 PM
* hidden-until-reveal helper.

---

# 106. CONFIRM CONTACT NUMBER

Use User's verified Profile mobile.

Do not let arbitrary full mobile appear public.

---

# 107. VERIFIED CONTACT INDICATOR

Display `Verified` only when actual Profile mobile verification is valid.

---

# 108. ALTERNATE NUMBER

If the broader product permits alternate Lead contact number:

implement explicit verification/consent rules.

Do not silently treat unverified alternate number as verified.

---

# 109. PREFERRED CONTACT TIME

Persist structured preference:

* Anytime
* 9 AM – 1 PM
* 5 PM – 9 PM

or approved canonical time windows.

---

# 110. CONTACT PRIVACY COPY

Exact intent:

`Your number stays hidden until you approve a reveal request.`

The actual public Detail Contact Reveal system must follow the same rule.

Do not show copy that contradicts Batch 4.

---

# 111. CURRENT PROPERTY CONTACT MISMATCH

Current form exposes a generic Contact Visibility selector with multiple modes and Map Visibility.

The final Step 7 must visually follow the Batch 5 source.

Required product-level Contact Visibility options may remain in an appropriate advanced control only if they do not conflict with locked privacy rules.

---

# 112. CONTACT RULE AUTHORITY

Do not allow a user-facing setting to bypass platform safety.

Public search/detail must never leak full phone in initial payload.

---

# 113. PROPERTY STEP 8 — PREVIEW

Exact source:

`PREVIEW — not yet live`

Preview must resemble the actual Batch 4 Property Detail.

---

# 114. PREVIEW DATA SOURCE

Preview uses current unsaved Wizard state merged with saved Draft Media.

Do not require publication.

---

# 115. PREVIEW SAFETY

Preview is private to the authorised creator/editor.

No public indexable route.

---

# 116. PREVIEW BLOCK EDIT LINKS

Exact examples:

* Edit Photos
* Edit Price
* Edit Basics
* Edit Location

Each action jumps to the correct Wizard Step.

---

# 117. CURRENT PREVIEW GAP

Current Property Preview uses a simplified summary panel.

Batch 5 source requires:

the exact Batch 4 Detail layout inside the preview frame.

Rebuild Preview using the reusable public Detail presentation components in Preview mode.

---

# 118. PREVIEW COMPONENT REUSE

Do not create a visually different fake preview.

Reuse safe presentational components with Draft data adapters.

---

# 119. PREVIEW CONTACT SAFETY

Preview may show creator's own contact confirmation context but must not expose private data through a public URL.

---

# 120. PROPERTY FINAL SUBMIT

Primary action:

Submit for Review.

Required sequence:

1. full server validation
2. ownership check
3. current status check
4. Posting Plan gate
5. Media requirement check
6. duplicate-submit protection
7. transition to Pending
8. private visibility during review
9. moderation queue
10. usage/quota accounting
11. Notification event
12. success response.

---

# 121. PROPERTY STEP 9 — SUBMITTED

Exact source:

`Submitted for review`

`Typically approved within 24 hours. We'll notify you on WhatsApp and in-app.`

Badge:

`Pending`

Actions:

* View Listing
* Go to My Listings

---

# 122. SUBMITTED NOTIFICATION HONESTY

If WhatsApp Provider is unavailable:

do not promise successful WhatsApp delivery.

Use approved copy or show channel availability honestly.

Database/in-app Notification can still work.

---

# 123. VIEW LISTING WHILE PENDING

If Listing is not public:

`View Listing`

must open:

* owner private Preview/detail,
* not public SEO Detail.

Do not expose Pending Listing publicly.

---

# 124. PROPERTY ROLE ROUTES

Owner and Broker must use the same Batch 5 Property Wizard presentation.

Current Owner route exists.

Ensure Broker route:

* uses same canonical Wizard,
* correct Broker Dashboard context,
* same validation and persistence.

---

# 125. PROPERTY BILLING GATE

Posting gate uses real Plan/Subscription data when enabled.

Do not fake access.

---

# 126. DRAFT BEFORE SUBSCRIPTION CHECK

It is reasonable to allow User to Draft before final Submit.

However:

show Plan/usage context early enough that the User is not surprised at final Submit.

---

# 127. LIMIT EXCEEDED STATE

If Property posting limit reached:

show real:

* used,
* limit,
* current Plan,
* Upgrade action.

Do not simply show generic `Something went wrong`.

---

# 128. PROPERTY SUBMIT TRANSACTION SAFETY

Current architecture:

entity state update
then usage increment

as separate operations.

This can produce inconsistent quota usage.

Move to:

* transaction/RPC,
* or idempotent durable reconciliation.

---

# 129. DUPLICATE SUBMIT CONCURRENCY

Two rapid Submit requests must not:

* submit twice,
* increment usage twice,
* create duplicate moderation events.

Use conditional transition/idempotency.

---

# 130. 5A PROPERTY FINAL CHECKLIST

* [ ] 9-step Wizard
* [ ] shared Batch 5 shell
* [ ] Owner route
* [ ] Broker route
* [ ] desktop Dashboard context
* [ ] mobile contextual Header
* [ ] Step X of 9
* [ ] shared sticky footer
* [ ] Back
* [ ] Save Draft
* [ ] Continue
* [ ] true partial Draft schema
* [ ] autosave
* [ ] save status
* [ ] Resume exact Step
* [ ] Listing Title
* [ ] Description
* [ ] character counter
* [ ] Purpose
* [ ] Category
* [ ] conditional Property Type
* [ ] complete product types
* [ ] Expected Price
* [ ] Rent/Lease-specific values
* [ ] Negotiable
* [ ] Carpet Area
* [ ] correct area unit
* [ ] Additional Charges
* [ ] validation summary
* [ ] inline errors
* [ ] canonical Location
* [ ] autosuggest
* [ ] Map Pin
* [ ] Use Current Location
* [ ] Provider fallback
* [ ] Missing Location request
* [ ] Amenity groups
* [ ] real Media upload
* [ ] min 3 photo gate
* [ ] max 10 MB
* [ ] progress
* [ ] retry
* [ ] reorder
* [ ] Cover
* [ ] crop
* [ ] verified contact
* [ ] preferred time
* [ ] privacy copy
* [ ] exact Detail Preview
* [ ] Edit-section links
* [ ] full Submit validation
* [ ] billing gate
* [ ] idempotent submit
* [ ] Pending moderation state
* [ ] Submitted screen
* [ ] View Listing/private preview
* [ ] My Listings
* [ ] Draft Resume in My Listings
* [ ] Edit/reapproval confirmation
* [ ] complete mobile verification
* [ ] complete tablet verification
* [ ] complete desktop verification

---

# 131. 5B — PROJECT WIZARD OVERVIEW

Project Wizard is for:

**Builder / Developer**

according to canonical Role permissions.

---

# 132. PROJECT EXACT STEP COUNT

The source defines 10 steps:

1. Project Basics
2. Type & RERA
3. Location
4. Wings / Towers / Units
5. Amenities
6. Timelines & Progress
7. Media
8. Contact
9. Preview
10. Submitted

---

# 133. CURRENT PROJECT STEP COUNT GAP

Current Project Form uses 9 Step values and handles Submitted outside progress.

Rebuild as the exact 10-step design flow.

---

# 134. PROJECT SHARED SHELL

Use the same Batch 5 Wizard infrastructure as Property and Requirement.

Do not keep generic Stepper only for Project.

---

# 135. PROJECT STEP 1 — PROJECT BASICS

Exact fields:

* Project Name *
* Developer
* Description *

---

# 136. DEVELOPER FIELD

Source:

`Prefilled from your verified builder profile.`

Use actual Builder Profile.

---

# 137. DEVELOPER FIELD LOCK

The User must not impersonate a different Builder by typing arbitrary Developer name.

Use:

* authenticated Builder relationship,
* verified Company data.

---

# 138. BUILDER VERIFICATION STATE

If Builder verification is required before Project posting:

show actual gate.

Do not label Developer verified unless actual status is approved.

---

# 139. PROJECT DESCRIPTION

Use actual validation.

Support:

* short marketing description,
* full description

if the product model contains both.

Use the design pattern without losing required fields.

---

# 140. PROJECT STEP 2 — TYPE & RERA

Exact top-level type examples:

* Residential
* Commercial
* Mixed Use

Use complete real Project type/category registry.

---

# 141. RERA REGISTRATION NUMBER

Required according to Project applicability and policy.

Source format:

`PR/GJ/CITY/YYYY/NNNN`

The current code uses a similar validation pattern.

---

# 142. RERA FORMAT CHECK

Format validation is not RERA verification.

Displaying:

`Format valid`

means syntax only.

Do not convert syntax validity into Verified badge.

---

# 143. RERA PENDING STATE

Exact source:

`RERA registration pending`

with honest:

`no fake number`

state.

Support Project lifecycle where registration is pending according to approved policy.

---

# 144. RERA PUBLICATION GATE

Critical source rule:

**Project cannot go Live without RERA verification or an explicit Admin-flagged exception.**

This is mandatory.

---

# 145. RERA GATE AUTHORITY

Enforce at server/database moderation transition.

Do not rely on:

* disabled button,
* Builder checkbox,
* Client-side validation.

---

# 146. RERA EXCEPTION

Admin exception must include:

* explicit permission,
* reason,
* Staff actor,
* timestamp,
* Audit Log.

Do not infer exception automatically.

---

# 147. CURRENT RERA GATE RECONCILIATION

Current Project submit flow:

* accepts RERA fields,
* submits Pending,
* states team checks RERA.

Verify and enforce the actual Admin approval gate so a Project cannot become Published with:

* unverified RERA,
* unless explicit exception exists.

---

# 148. PROJECT STEP 3 — LOCATION

Reuse the same canonical Location widget as Property.

---

# 149. PROJECT LOCATION FEATURES

Required:

* autosuggest
* canonical Location hierarchy
* Map Pin
* address
* Landmark.

---

# 150. NEARBY LANDMARKS

Exact source:

chip input.

Example:

`VR Mall — 1.2 km`

Store structured landmark relation where possible:

* label,
* distance,
* optional coordinates/reference.

---

# 151. CURRENT PROJECT LOCATION GAP

Current form uses:

* free-text City,
* free-text Locality,
* Landmark,
* PIN.

Replace with shared Batch 5 Location system.

---

# 152. PROJECT STEP 4 — WINGS / TOWERS / UNITS

This is not merely four total-number fields.

The source requires repeatable structure.

---

# 153. WING CONFIGURATION

Required columns/fields:

* Wing Name
* Floors
* Units / Floor

Action:

`Add wing`

---

# 154. SOURCE EXAMPLE

Summary:

`2 wings · 112 units total`

This structure feeds 5D Unit Inventory.

---

# 155. CURRENT PROJECT UNIT STEP GAP

Current Project form only collects:

* Total Towers
* Total Wings
* Total Floors
* Total Units

and `unit_configurations` is sent as an empty array.

This does not implement the Batch 5 unit-generation model.

---

# 156. STRUCTURED WING MODEL

Create data relationships supporting:

Project
→ Tower/Wing
→ Floor
→ Unit.

Do not store the entire production Unit Inventory only as one JSON summary.

---

# 157. UNIT GENERATION PREVIEW

Before generating:

show:

* Wings,
* Floors,
* Units per floor,
* total generated count.

---

# 158. UNIT GENERATION IDEMPOTENCY

Repeated Generate action must not duplicate every Unit.

---

# 159. UNIT NUMBERING

Support deterministic naming such as:

* A-101
* A-102
* B-701

according to Project configuration.

Allow controlled exceptions.

---

# 160. STRUCTURE EDIT AFTER INVENTORY

If Builder changes:

* floors,
* Units per Floor,
* Wing Name

after Units already contain:

* Booked,
* Sold,
* Leads/Visits links,

do not silently delete or regenerate.

Require impact Preview and safe migration.

---

# 161. UNIT PLAN LIMIT

If Plan limits number of Units:

check real entitlement.

Do not generate beyond allowed limit silently.

---

# 162. PROJECT STEP 5 — AMENITIES

Use the same categorized chip language as Property, with Project-scale options.

---

# 163. SOURCE PROJECT AMENITIES

Include source options:

* Clubhouse
* Pool
* Gym
* Jogging Track
* Banquet Hall
* Indoor Games
* EV Charging
* Solar

along with other approved Project Amenities.

---

# 164. CURRENT AMENITY GAP

Current Project list lacks some source items such as:

* Jogging Track
* Banquet Hall
* EV Charging
* Solar.

Add them to canonical Project amenity registry.

---

# 165. PROJECT STEP 6 — TIMELINES & PROGRESS

Exact source:

* Launch Date
* Possession Date *
* Current Construction
* 64%

---

# 166. POSSESSION DATE

Required according to Project status.

Validate consistency.

---

# 167. CURRENT CONSTRUCTION

Do not derive a fake exact 64% merely from broad status.

Store real progress.

---

# 168. PROJECT PROGRESS MODEL

Support:

* current percentage,
* milestone records,
* last update,
* supporting media where applicable.

Batch 8 Construction Progress updates must use the same data.

---

# 169. CURRENT PROJECT PROGRESS GAP

Current Wizard only collects broad:

`construction_status`

and the current Detail screen elsewhere maps broad states to synthetic percentages.

Batch 5 must create a truthful progress foundation.

---

# 170. PROJECT STEP 7 — MEDIA

Exact source supports:

* Brochure PDF
* Floor Plan images
* Project Video URL
* 360° Tour link.

---

# 171. BROCHURE PDF

Reference:

`brochure-grand-vista.pdf`

`4.2 MB`

`stored as PDF, never converted to image`

This is a strict rule.

---

# 172. PDF STORAGE

Store original PDF.

Generate safe preview only as an additional representation if needed.

Do not replace original PDF with image files.

---

# 173. BROCHURE SECURITY

Validate:

* MIME,
* size,
* PDF structure,
* malware scan where supported.

---

# 174. FLOOR PLAN IMAGES

Use the shared Media uploader pattern.

Support:

* upload,
* progress,
* retry,
* reorder,
* configuration association.

---

# 175. PROJECT VIDEO

Source:

`Project video URL (optional)`

Validate allowed URL/provider rules.

If product supports actual uploaded video later:

connect to canonical Media architecture.

---

# 176. 360 TOUR LINK

Separate from Project Video.

Validate URL/allowed providers.

---

# 177. EMPTY PUBLIC MEDIA STATE

Exact rule:

If empty, the public Project Detail shows honest:

`Setup Required`

or not-uploaded state.

Never:

* broken embed,
* fake Tour,
* fake video thumbnail.

---

# 178. CURRENT PROJECT MEDIA GAP

Current Project Media Step:

* is Setup Required,
* only has one generic Virtual Tour URL.

Batch 5 completion requires the complete Media system.

---

# 179. PROJECT STEP 8 — CONTACT

Exact source says it is identical to Property Step 7.

Required:

* confirmed verified number
* Verified state
* preferred contact time
* contact privacy helper.

---

# 180. CURRENT PROJECT CONTACT GAP

Current Step 8 only shows:

* information Alert,
* Map Visibility selector.

This is incomplete.

---

# 181. PROJECT CONTACT RULE

The final public Contact flow must remain privacy-safe and consistent with Batch 4.

Do not pass full number into initial Client payload merely because Project contact is visible after login.

Use final explicit Reveal policy.

---

# 182. PROJECT STEP 9 — PREVIEW

Render exact Batch 4 Project Detail in:

`PREVIEW — not yet live`

frame.

---

# 183. PROJECT PREVIEW EDIT LINKS

Every major block must link to its Step.

Examples:

* Basics
* RERA
* Location
* Units
* Amenities
* Timeline
* Media
* Contact.

---

# 184. CURRENT PROJECT PREVIEW GAP

Current Project Preview uses simple Summary rows.

Replace with real design preview.

---

# 185. PROJECT FINAL SUBMISSION

On Submit:

1. verify Builder ownership
2. full validation
3. Plan gate
4. media/required document rules
5. RERA workflow state
6. duplicate-submit protection
7. transition Pending
8. moderation queue
9. quota accounting
10. Notification.

---

# 186. PROJECT STEP 10 — SUBMITTED

Exact source:

`Project submitted for review`

`Our team will verify your RERA registration before approval — typically 1–2 business days.`

Badge:

`Pending · RERA check`

---

# 187. PROJECT SLA HONESTY

Only use the 1–2 business day statement if operationally approved.

---

# 188. PROJECT EDIT-AFTER-PUBLISH

The product memory requires:

edit/reapproval behavior.

Current `canEditProject` only allows:

* Draft
* Submitted
* Need Changes.

It blocks Published/Paused Project editing.

Reconcile this intentionally.

---

# 189. CURRENT PROJECT PERMISSION INCONSISTENCY

Generic `canSubmitForApproval` accepts:

* Published
* Paused

while `canEditProject` blocks them.

The Project edit and resubmit rules must be internally consistent.

---

# 190. PROJECT REVISIONING

Recommended:

Published revision stays public
while edited revision goes to review,

or follow the approved hide-during-review policy consistently.

Do not mutate live Project fields unpredictably.

---

# 191. PROJECT QUOTA SAFETY

Same atomic/idempotent gate rules as Property.

Current:

state update and usage increment are separate.

Correct this.

---

# 192. 5B PROJECT FINAL CHECKLIST

* [ ] 10-step Wizard
* [ ] shared Batch 5 shell
* [ ] shared progress
* [ ] Step X of 10
* [ ] shared sticky footer
* [ ] Save Draft
* [ ] autosave
* [ ] Resume exact Step
* [ ] Project Name
* [ ] Developer from real Builder Profile
* [ ] Builder verification truth
* [ ] Description
* [ ] Project Type
* [ ] RERA Number
* [ ] syntax validation
* [ ] Pending Registration state
* [ ] RERA publication gate
* [ ] Admin exception
* [ ] exception Audit
* [ ] canonical Location widget
* [ ] Map Pin
* [ ] Nearby Landmark chips
* [ ] Wing Name
* [ ] Floors
* [ ] Units/Floor
* [ ] Add Wing
* [ ] total Units calculation
* [ ] Inventory generation
* [ ] generation idempotency
* [ ] Project Amenity registry
* [ ] Launch Date
* [ ] Possession Date
* [ ] real progress percent
* [ ] milestone foundation
* [ ] Brochure PDF
* [ ] PDF preserved as PDF
* [ ] Floor Plan images
* [ ] Project Video
* [ ] 360 Tour
* [ ] honest empty media states
* [ ] verified contact confirmation
* [ ] preferred contact time
* [ ] privacy helper
* [ ] exact Batch 4 Project Preview
* [ ] per-block Edit links
* [ ] Plan gate
* [ ] idempotent Submit
* [ ] Pending/RERA Check state
* [ ] Project reapproval consistency
* [ ] complete mobile verification
* [ ] tablet verification
* [ ] desktop verification

---

# 193. 5C — REQUIREMENT WIZARD OVERVIEW

The Requirement Wizard is available according to current canonical posting rules to:

* Owner
* Broker

Builder does not create ordinary Requirements unless a later approved Role policy changes this.

---

# 194. REQUIREMENT EXACT STEPS

1. Looking For
2. Location Preference
3. Budget Range
4. Specifications
5. Timeline
6. Contact Preference
7. Preview + Submit / resulting state

---

# 195. REQUIREMENT SHARED SHELL

Use the exact same Batch 5:

* progress,
* Footer,
* Back behavior,
* Save Draft,
* responsive shell.

Current generic Stepper must be replaced.

---

# 196. REQUIREMENT STEP 1 — LOOKING FOR

Source intent options include:

* Buy
* Rent
* Project

Property categories include:

* Apartment
* House / Villa
* Plot
* Commercial.

---

# 197. COMPLETE REQUIREMENT MODEL

Preserve complete canonical purposes/categories.

Use design patterns for all valid real options.

---

# 198. REQUIREMENT TITLE

The current form includes Title.

Preserve as a relevant product capability within the nearest source pattern.

Do not remove it merely because the visual sample focuses on selection cards.

---

# 199. REQUIREMENT STEP 2 — LOCATION PREFERENCE

Source examples:

* Satellite, Ahmedabad
* Bodakdev, Ahmedabad

Rule:

`Up to 5 localities across cities.`

---

# 200. STRUCTURED MULTI-LOCATION MODEL

Store selected canonical Location IDs.

Do not rely only on:

* one City text field,
* comma-separated Locality string.

---

# 201. CURRENT REQUIREMENT LOCATION GAP

Current form stores:

* one `city_text`
* one comma-separated `preferred_localities_text`.

This does not correctly model:

multiple Localities across multiple Cities.

Implement structured selection.

---

# 202. MAXIMUM LOCATION COUNT

Maximum:

5 Locality selections

according to source.

Enforce server-side.

---

# 203. DUPLICATE LOCATION

Do not allow same Locality twice.

---

# 204. LOCATION CHIP REMOVE

Each selected Location chip must be removable.

---

# 205. MISSING LOCATION

Connect to Batch 14 Missing Location request.

---

# 206. REQUIREMENT STEP 3 — BUDGET RANGE

Exact:

* Min
* Max
* Loan Pre-approved.

---

# 207. PURPOSE-AWARE PRICING

Buy:

Budget Min/Max.

Rent/Lease:

Rent Min/Max.

Do not mix inactive hidden values into search matching.

---

# 208. RANGE VALIDATION

Min ≤ Max.

Server-side.

---

# 209. LOAN PRE-APPROVED

Persist structured boolean/preference.

The current implementation stores this as a namespaced Amenity tag.

That works as a compatibility workaround but is not an ideal long-term model.

Use a dedicated field when the final schema supports it.

---

# 210. REQUIREMENT STEP 4 — SPECIFICATIONS

Exact source:

* 2 BHK
* 3 BHK
* 4+ BHK
* Min Area
* Max Area
* Covered Parking must-have
* Lift.

---

# 211. BHK SELECTION SEMANTICS

Determine final approved behavior from the exact design control:

if multi-select is intended, support multiple BHK preferences.

The current form allows only one BHK and stores:

`bedrooms_min = bedrooms_max`.

Do not silently restrict a multi-choice design to one value.

---

# 212. 4+ BHK SEMANTICS

Do not store:

5 exact

when the User selected:

4+.

Represent range semantics accurately.

---

# 213. AREA RANGE

Use:

* min,
* max,
* unit.

Validate range.

---

# 214. MUST-HAVE AMENITIES

Differentiate:

must-have preference

from ordinary nice-to-have preference if the matching algorithm uses the distinction.

---

# 215. REQUIREMENT MATCHING

The Requirement fields created here must feed the same matching engine used by:

* Broker Requirement Feed,
* Builder Matching Requirements,
* saved matching/alerts.

Do not create display-only preferences.

---

# 216. REQUIREMENT STEP 5 — TIMELINE

Exact source:

* Immediate
* 1–3 months
* 3–6 months
* Flexible

---

# 217. CURRENT TIMELINE EXTRA OPTION

Current form also supports:

`Within 1 month`

This may remain as real product capability if approved.

Use the same design pattern.

---

# 218. TIMELINE ENUM

Store canonical enum values.

Display localized labels.

---

# 219. REQUIREMENT STEP 6 — CONTACT PREFERENCE

Use shared Contact confirmation presentation.

Required:

* verified number context,
* preferred Contact Time,
* contact privacy.

---

# 220. BROKER CONTACT METHOD

Exact additional control:

`How should brokers reach you?`

Options:

* In-app proposals only
* Calls OK

---

# 221. CONTACT METHOD PERSISTENCE

Persist structurally.

Current implementation encodes choice inside `preferred_amenities` tags.

Move to a dedicated preference field when feasible.

---

# 222. IN-APP ONLY RULE

When selected:

public/eligible Requirement viewers must not bypass it by direct phone reveal.

---

# 223. CALLS OK RULE

`Calls OK`

does not mean full phone is public to Guests.

It remains subject to:

* eligible Role,
* authentication,
* Contact Reveal/privacy policy.

---

# 224. REQUIREMENT STEP 7 — PREVIEW

Show the exact Requirement presentation using the Batch 4 Requirement Detail design language.

---

# 225. REQUIREMENT PREVIEW PRIVACY

Preview must demonstrate masked requester identity as applicable.

Do not expose full contact.

---

# 226. REQUIREMENT SUBMIT STATE CONFLICT

The source design shows:

`Requirement posted`

`REQ-2841 is live for matching.`

The current application flow sends Requirements to:

* Submitted
* Approval Pending
* Private visibility.

Do not falsely display `Live` immediately if moderation is still required.

---

# 227. HONEST REQUIREMENT STATE RESOLUTION

Use:

## Immediately after Submit

Pending Review

when moderation is required.

## After Admin Approval

`Requirement posted`

`REQ-2841 is live for matching.`

Visible only to eligible verified audiences.

---

# 228. REQUIREMENT DISPLAY ID

Generate stable human-readable reference such as:

`REQ-2841`.

Do not use raw UUID in user-facing success state.

---

# 229. REQUIREMENT AUDIENCE

Source Batch 5 states:

`Visible to verified Brokers & Builders only — never public, never to guests.`

Apply this audience rule consistently with Requirement Feed/Detail architecture.

---

# 230. REQUIREMENT SEARCH ENGINE SAFETY

Do not include restricted Requirements in:

* public Sitemap,
* public SEO indexes,
* Guest Search payload.

---

# 231. REQUIREMENT DUPLICATE DETECTION

Before/after Submit:

detect highly similar active Requirement from the same User according to approved rule.

Do not create endless spam duplicates.

---

# 232. REQUIREMENT SPAM PROTECTION

Apply:

* post limits,
* rate limits,
* duplicate rules,
* moderation.

---

# 233. REQUIREMENT EXPIRY

Persist lifecycle:

* published/live
* expired
* renewed/reposted according to product policy.

Wizard success should not imply permanent visibility.

---

# 234. REQUIREMENT MATCH NOTIFICATION

After approval/new matching entity:

Notification workflow may alert eligible User according to preferences.

Do not fake matching count.

---

# 235. REQUIREMENT SUBMIT PLAN GATE

Use real:

* Plan,
* Requirement post limit.

Show specific error state.

---

# 236. REQUIREMENT QUOTA SAFETY

Same transactional/idempotent requirements as Property and Project.

---

# 237. 5C REQUIREMENT FINAL CHECKLIST

* [ ] 7-step Wizard
* [ ] shared Batch 5 shell
* [ ] same progress
* [ ] Step X of 7
* [ ] same sticky Footer
* [ ] Back
* [ ] Save Draft
* [ ] Continue
* [ ] autosave
* [ ] Resume exact Step
* [ ] Buy
* [ ] Rent
* [ ] Project option where applicable
* [ ] complete categories
* [ ] structured multi-Location selection
* [ ] max 5 Localities
* [ ] cross-City support
* [ ] canonical Location IDs
* [ ] Budget Min/Max
* [ ] Rent Range
* [ ] Loan Pre-approved
* [ ] BHK choice semantics
* [ ] 4+ range semantics
* [ ] Area Range
* [ ] Must-have Amenities
* [ ] Timeline
* [ ] verified contact presentation
* [ ] preferred Contact Time
* [ ] In-app proposals only
* [ ] Calls OK
* [ ] privacy enforcement
* [ ] Requirement Preview
* [ ] human-readable REQ ID
* [ ] Pending honesty before Approval
* [ ] Live matching state after Approval
* [ ] restricted audience
* [ ] duplicate detection
* [ ] spam protection
* [ ] Plan gate
* [ ] idempotent Submit
* [ ] mobile verification
* [ ] tablet verification
* [ ] desktop verification

---

# 238. 5D — UNIT INVENTORY MANAGEMENT

Unit Inventory is a real Builder operational module.

It is not a static extension of the Project Wizard.

It manages generated individual Project Units.

---

# 239. UNIT INVENTORY RELATIONSHIP

Architecture:

Builder
→ Project
→ Tower/Wing
→ Floor
→ Unit.

---

# 240. CURRENT UNIT INVENTORY STATUS

The current migration manifest explicitly identifies:

* desktop bulk grid as GAP,
* mobile accordion as GAP,
* Unit Edit modal/sheet as GAP.

These are mandatory Batch 5 targets.

---

# 241. UNIT INVENTORY DESKTOP HEADER

Reference:

`Unit Inventory`

Context:

`Tower A · Floors 1–14`

`56 units`

Tabs:

* Tower A
* Tower B

Use actual Project hierarchy.

---

# 242. TOWER/WING TABS

Tabs filter real Units by selected Wing/Tower.

Counts must be real.

---

# 243. DESKTOP TABLE COLUMNS

Exact:

* selection checkbox
* UNIT
* TYPE
* AREA
* PRICE
* STATUS.

---

# 244. SOURCE UNIT ROW 1

A-701
3 BHK
1,540 sq ft
₹89 L
Available

Development fixture only.

Do not hard-code production row.

---

# 245. SOURCE UNIT ROW 2

A-702
3 BHK
1,540 sq ft
₹89 L
Available.

---

# 246. SOURCE UNIT ROW 3

A-703
2 BHK
1,120 sq ft
₹64 L
Booked.

---

# 247. SOURCE UNIT ROW 4

A-704
2 BHK
1,120 sq ft
₹64 L
Sold.

---

# 248. UNIT STATUS ENUM

At minimum source statuses:

* Available
* Booked
* Sold.

Use canonical values.

---

# 249. STATUS SEMANTICS

### Available

May accept availability enquiries according to project workflow.

### Booked

Temporarily/contractually unavailable according to business rule.

### Sold

No longer available.

Do not treat UI badge change as legal sale confirmation.

---

# 250. UNIT STATUS TRANSITION RULES

Define allowed transitions.

Examples:

Available → Booked
Available → Sold
Booked → Available
Booked → Sold

Sold reversal should require stricter confirmation/permission if allowed.

---

# 251. UNIT TABLE PAGINATION

Large Project can contain hundreds/thousands of Units.

Use:

* pagination,
* virtualisation where necessary,
* bounded queries.

Do not fetch entire inventory unbounded.

---

# 252. UNIT FILTERS

Architecture should support relevant filtering such as:

* Wing/Tower
* Floor
* Type
* Status.

Do not add unsourced visible controls unless required, but backend architecture must scale.

---

# 253. BULK SELECTION

Desktop supports checkbox selection.

Source state:

`2 units selected`

Selection must track actual Unit IDs.

---

# 254. SELECT ALL SEMANTICS

Clearly distinguish:

* select current page,
* select current filtered result set

if supported.

Do not silently act on unseen records.

---

# 255. BULK ACTION BAR

Exact source actions:

* Mark Booked
* Mark Sold
* Update Price…

---

# 256. BULK MARK BOOKED

Flow:

1. selected IDs
2. ownership/Project permission check
3. current status validation
4. confirmation where needed
5. conditional bulk update
6. result summary
7. Audit.

---

# 257. BULK MARK SOLD

Higher-impact action.

Require:

* confirmation,
* clear count,
* safe transition validation.

---

# 258. BULK UPDATE PRICE

Action:

`Update price…`

opens modal/sheet.

Support:

* set exact Price,
* other approved price operation if product defines it.

Do not accidentally apply arithmetic not shown/approved.

---

# 259. BULK PARTIAL FAILURE

If some selected Units become stale/ineligible:

do not silently claim all succeeded.

Return:

* succeeded count,
* excluded/failed count,
* reasons.

---

# 260. BULK TRANSACTION STRATEGY

For manageable batch:

database transaction/RPC.

For large batch:

durable job with per-record state.

---

# 261. BULK IDEMPOTENCY

Double-click must not duplicate:

* status history,
* Audit entries,
* Notifications.

---

# 262. UNIT STATUS HISTORY

Preserve history:

* old status,
* new status,
* actor,
* timestamp,
* source/action.

---

# 263. UNIT PRICE HISTORY

Recommended for operational integrity:

store significant Price changes or Audit diff.

---

# 264. UNIT INVENTORY MOBILE

Exact source transforms table to stacked accordion/cards.

---

# 265. MOBILE UNIT CARD

Reference:

`A-701 · 3 BHK`

`1,540 sq ft · ₹89 L`

Badge:

`Available`

---

# 266. MOBILE BOOKED CARD

Reference:

`A-703 · 2 BHK`

`1,120 sq ft · ₹64 L`

Badge:

`Booked`

---

# 267. MOBILE SELECTION

Source state:

`1 selected`

Actions:

* Status…
* Edit

---

# 268. MOBILE CARD EXPANSION

If accordion behavior exposes additional fields:

use one intentional expand/collapse interaction.

Do not make nested buttons trigger card expansion accidentally.

---

# 269. MOBILE BULK ACTION

The action must apply to selected Units only.

Show selected count.

---

# 270. UNIT EDIT — DESKTOP

Centered modal.

Title:

`Edit unit A-701`

Fields:

* Price
* Status

Status options:

* Available
* Booked
* Sold

Actions:

* Cancel
* Save Changes.

---

# 271. UNIT EDIT — MOBILE

Same fields and behavior.

Presentation:

Bottom sheet.

Do not create a separate inconsistent form.

---

# 272. UNIT EDIT AUTHORIZATION

Before save:

* current authenticated Builder/team member
* Project ownership/team scope
* Unit belongs to Project
* permission allows inventory editing.

---

# 273. UNIT EDIT STALE VERSION

If another team member updates Unit while edit sheet is open:

use version check or updated timestamp condition.

Do not overwrite newer state unknowingly.

---

# 274. UNIT PRICE VALIDATION

Price:

* numeric,
* non-negative,
* sensible maximum,
* Indian currency display.

---

# 275. UNIT SAVE

Server-side mutation.

On success:

* update row/card,
* close modal/sheet,
* Audit history.

On failure:

keep inputs and show error.

---

# 276. UNIT INVENTORY EMPTY STATE

If no Units generated:

show actionable empty state connected to:

* configure Project structure,
* Generate Units.

Do not show an empty table with no explanation.

---

# 277. UNIT GENERATION STATE

If generation processing is asynchronous:

show honest:

* Processing,
* Ready,
* Failed.

---

# 278. INVENTORY PUBLIC DETAIL CONNECTION

Available Unit configurations displayed on Batch 4 Project Detail must derive from current Inventory aggregates.

Do not maintain a permanently separate stale `unit_configurations` summary.

---

# 279. AVAILABLE UNIT COUNT

Project public Available count must be real.

When Unit moves:

Available → Booked

aggregate availability updates safely.

---

# 280. SOLD UNIT PRIVACY

Do not expose buyer identity or transaction Price publicly.

Public Project Detail only needs safe availability summary.

---

# 281. 5D UNIT INVENTORY FINAL CHECKLIST

* [ ] Project relationship
* [ ] Tower/Wing relationship
* [ ] Floor relationship
* [ ] Unit records
* [ ] Tower A/B tabs
* [ ] real Unit count
* [ ] desktop table
* [ ] UNIT column
* [ ] TYPE
* [ ] AREA
* [ ] PRICE
* [ ] STATUS
* [ ] Available
* [ ] Booked
* [ ] Sold
* [ ] row selection
* [ ] selected count
* [ ] Mark Booked
* [ ] Mark Sold
* [ ] Update Price
* [ ] confirmations
* [ ] stale-state validation
* [ ] bulk result summary
* [ ] pagination
* [ ] bounded queries
* [ ] mobile cards
* [ ] mobile selection
* [ ] Status action
* [ ] Edit action
* [ ] desktop modal
* [ ] mobile bottom sheet
* [ ] Price validation
* [ ] Status validation
* [ ] Cancel
* [ ] Save Changes
* [ ] concurrency safety
* [ ] Audit
* [ ] public availability aggregate
* [ ] empty state
* [ ] responsive verification

---

# 282. SHARED MEDIA UPLOADER ARCHITECTURE

Batch 5 source states that the uploader pattern is shared.

Build one canonical Media uploader with configurable mode:

* Property Photos
* Project Renders
* Floor Plans
* Brochure PDF
* Project Video where upload mode exists.

---

# 283. FILE VALIDATION

Validate:

* MIME
* extension
* size
* actual decoded media validity where possible.

---

# 284. STORAGE ARCHITECTURE

Current project target architecture:

* Cloudflare R2
* Cloudflare CDN
* original files
* optimized public variants
* private signed documents.

Batch 5 media implementation must use the final configured provider.

---

# 285. PROVIDER SETUP REQUIRED

Until Storage provider is configured:

show honest Setup Required.

However:

Batch 5 cannot be considered functionally complete while source-required upload features remain unavailable.

---

# 286. MEDIA DATABASE RECORD

Store:

* entity type
* entity ID
* Media ID
* storage key
* MIME
* size
* width/height
* sort index
* Cover flag
* crop metadata
* upload status
* created by.

---

# 287. DIRECT UPLOAD SECURITY

Use short-lived signed upload authorization.

Do not expose master Storage credentials.

---

# 288. FILE OWNERSHIP

After upload, server confirms the User can attach Media to target Draft.

---

# 289. ORPHAN PROTECTION

A User must not attach another User's uploaded file to their Listing.

---

# 290. FAILED UPLOAD CLEANUP

Remove incomplete multipart uploads and orphan files according to cleanup policy.

---

# 291. MEDIA LIMITS BY PLAN

Plan may limit:

* image count,
* Video,
* Brochure access.

Server must enforce.

Do not only disable Client uploader.

---

# 292. MEDIA LIMIT UX

Show real usage:

for example:

`8 of 20 photos`

only when backed by actual Plan limits.

---

# 293. PHOTO REORDER PERSISTENCE

Persist order atomically or safely.

---

# 294. COVER CHANGE

Changing Cover should not duplicate Media or lose order.

---

# 295. FILE DELETE

Deleting Media:

* update relation,
* choose new Cover if needed,
* cleanup storage according to retention policy.

---

# 296. LOCATION SYSTEM SHARING

Property and Project must use one canonical Location component.

Requirement uses a multi-location variant of the same canonical source.

---

# 297. LOCATION PROVIDER FALLBACK

Map Provider availability must not block:

* Property Draft,
* Project Draft,
* Requirement Draft.

Canonical textual Location must remain usable.

---

# 298. CONTACT PREFERENCE SHARING

Property, Project and Requirement use one Contact Preference presentation foundation.

Configure extra Requirement-specific:

`How should brokers reach you?`

---

# 299. CONTACT VERIFICATION

Verified number comes from Auth/Profile authority.

Do not allow a locally typed number to appear as Verified.

---

# 300. CONTACT TIME DATA MODEL

Use structured enum/time-window values.

Do not store localized display string as authority.

---

# 301. PREVIEW ARCHITECTURE SHARING

Preview must use public-detail presentational components in private Preview mode.

Required adapters:

* Property Draft → Property Detail Preview
* Project Draft → Project Detail Preview
* Requirement Draft → Requirement Detail Preview.

---

# 302. PREVIEW DESIGN AUTHORITY

Batch 4 Detail layouts are authority for Preview body.

Batch 5 dashed frame/Not Yet Live state wraps them.

---

# 303. PREVIEW MEDIA

Use uploaded Draft media.

Do not show public CDN URL if Media should remain private before publication unless signed Preview access is used.

---

# 304. PREVIEW SEO

Noindex.

Not in Sitemap.

---

# 305. ROLE PERMISSIONS

Final Role matrix:

## Owner

Can post:

* Property
* Requirement.

Cannot post:

* Project.

## Broker

Can post:

* Property
* Requirement.

Cannot post Project unless future explicitly approved multi-role architecture allows it.

## Builder

Can post:

* Project.

Cannot post normal Property/Requirement unless explicit approved Role model changes it.

---

# 306. ROUTE PERMISSION

Enforce server-side.

Direct URL access by wrong Role:

Forbidden/redirect according to approved pattern.

---

# 307. ACCOUNT STATUS GATE

Suspended/Banned User cannot create or submit.

Do not rely on hiding Post button.

---

# 308. SUBSCRIPTION AND PLAN GATES

Posting entitlement can be governed by:

* free Plan,
* paid Plan,
* Trial,
* Admin grant.

Use real active entitlement.

---

# 309. CURRENT GATE FOUNDATION

Current billing gates:

* Property → `property_posts_limit`
* Project → `project_posts_limit`
* Requirement → `requirement_posts_limit`.

This is a useful foundation.

---

# 310. CURRENT USAGE COUNTER ISSUE

Current `incrementUsage` uses:

`period_start = today's date`

and performs:

read count
→ update count + 1

which is vulnerable to:

* wrong billing-period semantics,
* race conditions.

Correct this before treating posting quotas as production-safe.

---

# 311. POST LIMIT SEMANTICS

Define whether a Plan limit means:

* posts created per billing cycle,
* active Listings,
* total published entities,
* monthly submissions.

Do not use one generic counter without clear semantics.

---

# 312. ACTIVE LISTING LIMIT

If Plan says:

25 active Listings

derive from active public entity state.

Do not increment a lifetime counter on every resubmission.

---

# 313. RESUBMIT QUOTA

Editing/reapproval of an existing entity must not necessarily consume a new-post entitlement.

Define explicit policy.

Prevent double charging usage counter on retries/resubmission.

---

# 314. ATOMIC POST GATE

Final Submit should atomically coordinate:

* entitlement check,
* entity transition,
* usage accounting.

---

# 315. GATE DISABLED STATE

Current environment can intentionally return:

`gates_not_enforced`.

This must remain an internal soft-launch setting.

Do not show fake Plan usage to User.

---

# 316. PLAN REQUIRED UI

When gate denies:

show:

* actual reason,
* actual Plan,
* actual usage/limit where relevant,
* Pricing/Upgrade action.

---

# 317. MODERATION STATE MODEL

Posting lifecycle must distinguish:

* Draft
* Submitted
* Pending/Under Review
* Need Changes
* Approved/Published
* Rejected
* Paused
* Expired
* Archived
* Deleted

according to final canonical status model.

---

# 318. STATE CONSISTENCY

Do not mix different combinations such as:

`status=published`

but:

`visibility=private`

unless the state model explicitly permits it.

---

# 319. SUBMIT TIMESTAMP

Set once per real submission/resubmission attempt as intended.

---

# 320. MODERATION REVISION

Admin reviews the exact submitted revision.

User autosave must not mutate the reviewed payload after Submit.

---

# 321. EDIT WHILE UNDER REVIEW

Source/business rule:

lock or create a separate new Draft revision according to approved product model.

Do not mutate submission currently being reviewed.

---

# 322. NEED CHANGES FLOW

Admin requests changes:

User opens Wizard with:

* reason/banner,
* preserved fields,
* relevant Step links.

Resubmit:

back to Pending.

---

# 323. REJECTION FLOW

Rejected entity may be edited/resubmitted only according to permission/policy.

Show rejection reason safely.

---

# 324. NOTIFICATION INTEGRATION

Events:

* Draft saved does not need external Notification.
* Submitted
* Approved
* Need Changes
* Rejected
* Expiring/Expired

connect to Notification system.

---

# 325. WHATSAPP DELIVERY HONESTY

Database Notification created does not mean WhatsApp sent.

Use Delivery Log.

---

# 326. RLS — PROPERTY

Owner/Broker creator can access own Draft according to ownership.

Other Users cannot.

---

# 327. RLS — PROJECT

Builder owner/team-authorised member can access Draft.

Other Builders cannot.

---

# 328. RLS — REQUIREMENT

Creator can edit Draft.

Published restricted Requirement visibility follows final Audience policy.

---

# 329. RLS — UNITS

Only authorised Builder/team scope can mutate Project Units.

---

# 330. TEAM PERMISSIONS

For Builder Team:

define separate permissions such as:

* View Inventory
* Edit Unit
* Bulk Update
* Post Project
* Edit Project.

Do not give every invited Agent all capabilities.

---

# 331. RLS AND SERVER ACTION ALIGNMENT

Application permission helper and database policy must agree.

A button allowed by app but denied by RLS is not complete.

---

# 332. CURRENT PROJECT EDIT PERMISSION AUDIT

Explicitly reconcile:

`canEditProject`

with:

* Project edit route,
* Published Project reapproval requirement,
* RLS update policies.

---

# 333. TRANSACTION SAFETY — DRAFT CREATE

Draft create must not create duplicates under double request.

Use:

* idempotency key,
* session Draft identifier,
* or equivalent protection.

---

# 334. TRANSACTION SAFETY — SUBMIT

Entity submit + moderation queue + usage accounting + required event record should be atomic or durably recoverable.

---

# 335. TRANSACTION SAFETY — UNIT GENERATION

Wing setup → Unit generation must not partially create half of one floor without visible recovery state.

---

# 336. TRANSACTION SAFETY — BULK UNIT UPDATE

Use conditional update based on:

* ownership,
* current state,
* selected IDs.

---

# 337. AUDIT REQUIREMENTS

Audit important posting events:

* Submit
* Resubmit
* active Listing edit decision
* Project RERA exception
* Unit bulk status change
* Unit bulk Price update
* destructive Media changes where operationally required.

Do not audit every keystroke.

---

# 338. FORM ACCESSIBILITY

All controls require:

* labels,
* descriptions,
* errors linked with `aria-describedby`,
* required state,
* keyboard operation,
* visible focus.

---

# 339. CHIP ACCESSIBILITY

Selection chips must expose:

`aria-pressed`

or appropriate radio/checkbox semantics.

---

# 340. STEPPER ACCESSIBILITY

Current Step:

`aria-current="step"`.

Progress information available to screen readers.

---

# 341. DRAG-REORDER ACCESSIBILITY

Provide keyboard-accessible reorder alternative.

Do not make drag the only method.

---

# 342. MEDIA ALT/CAPTION

Uploader should support useful caption/alt metadata where product design requires it.

---

# 343. RESPONSIVE TEST MATRIX

Test:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1280px
* 1366px
* wide desktop.

---

# 344. DESKTOP PROPERTY WIZARD CHECK

Verify exact:

* Sidebar
* wizard context
* progress
* form panel
* validation banner
* sticky Footer.

---

# 345. MOBILE PROPERTY MEDIA CHECK

At 390px verify exact:

* Post Property Header
* Save Draft
* Step 6 of 9
* Media title
* uploader
* thumbnails
* Cover badge
* upload progress
* helper
* Back
* Continue.

---

# 346. PROJECT RESPONSIVE CHECK

All 10 Steps use same shell.

No generic Stepper mismatch.

Wing editor and Media uploader work without overflow.

---

# 347. REQUIREMENT RESPONSIVE CHECK

Multi-location chips wrap intentionally.

Budget two-column fields stack where needed.

Contact controls remain readable.

---

# 348. UNIT TABLE RESPONSIVE RULE

Desktop:

Table/Grid.

Mobile:

cards/accordion.

Do not squeeze six columns into 390px.

---

# 349. MOBILE KEYBOARD CHECK

Test:

* Title
* Description
* Price
* Location search
* Contact preferences
* Unit Edit.

Keyboard must not cover sticky action bar.

---

# 350. NO ACCIDENTAL HORIZONTAL SCROLL

Test:

* steppers,
* chip groups,
* media rows,
* unit tables,
* modal/sheets.

Only intentional internal scrollers allowed.

---

# 351. TEXT WRAPPING CHECK

Inspect:

* long Property title
* Project name
* RERA number
* Location suggestions
* upload error
* validation summary
* Unit status.

No clipping.

---

# 352. LONG-WIZARD PERFORMANCE

Avoid re-rendering every heavy Preview/Media component on every simple keystroke unnecessarily.

---

# 353. MEDIA PERFORMANCE

Use:

* thumbnail variants,
* lazy loading,
* cancellation,
* bounded concurrent uploads.

---

# 354. UNIT INVENTORY QUERY PERFORMANCE

Use indexed:

* Project ID
* Wing/Tower ID
* Status
* Floor

queries.

No N+1 fetching for every Unit row.

---

# 355. DRAFT QUERY PERFORMANCE

Latest Draft query must be bounded and indexed.

Do not scan all entities.

---

# 356. NO DEAD UI RULE

Every visible action must work.

Includes:

* Back
* Save Draft
* Continue
* all Purpose controls
* all Category controls
* Property Type
* Location suggestions
* Current Location
* Map Pin
* Amenity chips
* Upload
* Retry Upload
* Remove photo
* Reorder
* Crop
* Cover
* Preferred Contact Time
* Preview Edit links
* Submit
* View Listing
* Go to My Listings
* Continue Draft
* Start New
* Edit Anyway
* Project Add Wing
* RERA controls
* Nearby Landmark chips
* Brochure upload
* Floor Plan upload
* Video URL
* 360 URL
* Requirement multi-location
* Loan Pre-approved
* Broker Contact Preference
* Unit Tower tabs
* Unit checkboxes
* Mark Booked
* Mark Sold
* Update Price
* Unit Edit
* Save Changes.

No:

`href="#"`

No empty handlers.

---

# 357. PROPERTY DEVELOPMENT FIXTURE

Create a persistent development Property Draft matching source:

* 3 BHK Apartment
* Shrinand Residency
* Satellite
* Ahmedabad
* ₹85 L
* relevant Areas/Amenities
* multiple Media fixtures when Storage is available.

Do not hard-code in component.

---

# 358. PROJECT DEVELOPMENT FIXTURE

Create source-style Development Project:

* Sankalp Grand Vista
* Vesu, Surat
* Builder relation
* RERA test fixture
* Wing configuration
* Unit Inventory
* timeline/progress
* Media references.

---

# 359. REQUIREMENT DEVELOPMENT FIXTURE

Create:

* REQ-style display ID
* 3 BHK
* Ahmedabad Localities
* Budget Range
* Timeline
* privacy settings.

---

# 360. UNIT INVENTORY FIXTURES

Create test Units:

* A-701
* A-702
* A-703
* A-704

with safe Development-only data.

---

# 361. FULL PROPERTY WIZARD LIVE TEST

Login as Owner
→ open Post Property
→ type Title
→ wait for autosave
→ refresh Browser
→ verify data preserved
→ resume exact Step
→ select Purpose
→ Category
→ Type
→ enter Price
→ leave Carpet Area empty
→ Continue
→ verify validation summary
→ fill Area
→ select canonical Location
→ drag Map Pin
→ deny current Location permission in separate test
→ verify error
→ add Amenities
→ upload three Photos
→ verify progress
→ force one upload failure
→ Retry
→ reorder
→ change Cover
→ crop
→ verify persistence after refresh
→ confirm verified number
→ select Contact Time
→ open Preview
→ verify exact Batch 4 layout
→ click Edit Price
→ return Step 3
→ update Price
→ return Preview
→ double-click Submit
→ verify one submission
→ inspect status
→ inspect quota usage
→ inspect moderation queue
→ inspect Notification.

---

# 362. PROPERTY DRAFT RESUME TEST

Start Draft
→ complete 6 Steps
→ save
→ leave Wizard
→ My Listings
→ verify Resume card
→ exact progress count
→ relative saved time
→ Continue
→ return to persisted Step and data.

---

# 363. PROPERTY EDIT REAPPROVAL TEST

Use Published Property.

Tap Edit
→ explicit warning:

`Editing will require re-approval`

Cancel
→ no mutation.

Edit Again
→ Edit Anyway
→ modify Price
→ Submit
→ verify Pending/private behavior according to policy
→ old/public revision behavior according to approved revision architecture
→ Admin approve
→ public Detail shows new Price.

---

# 364. BROKER PROPERTY TEST

Login as Broker
→ Post Property
→ verify same Batch 5 Wizard
→ Broker Sidebar context
→ same progress/footer
→ submit
→ ownership and Plan gate correct.

---

# 365. PROJECT WIZARD LIVE TEST

Login Builder
→ Post Project
→ Step 1 Developer prefilled
→ verify cannot impersonate another Builder
→ enter Project basics
→ RERA format invalid
→ verify validation
→ valid syntax
→ verify not auto-Verified
→ test RERA Pending state
→ choose Location
→ Map Pin
→ add Nearby Landmark
→ configure Wing A
→ configure Wing B
→ verify total 112 fixture Units
→ generate Inventory
→ retry generation
→ verify no duplicates
→ select Amenities
→ enter Launch/Possession dates
→ set real progress
→ upload Brochure PDF
→ verify file stays PDF
→ upload Floor Plans
→ set Video URL
→ set Tour URL
→ Contact Step
→ Preview exact Batch 4 Project layout
→ Submit twice rapidly
→ one Pending Project
→ one usage event
→ verify RERA Check state
→ attempt Admin approval without RERA verification/exception
→ denied
→ verify RERA
→ approve
→ Project becomes public.

---

# 366. PROJECT RERA EXCEPTION TEST

Create applicable exception test Project.

Admin without permission:

cannot override.

Authorised Staff:

creates explicit exception with reason.

Audit exists.

Project approval succeeds only after valid exception.

---

# 367. REQUIREMENT WIZARD LIVE TEST

Login Owner
→ Post Requirement
→ choose Buy
→ choose Apartment
→ add Satellite Ahmedabad
→ add Bodakdev Ahmedabad
→ add Locality from another City
→ verify max 5
→ attempt sixth
→ blocked
→ Budget range
→ Loan Pre-approved
→ select BHK preferences
→ Area Range
→ must-have Amenities
→ Timeline
→ Contact Time
→ choose In-app Proposals only
→ Preview
→ Submit
→ verify honest Pending state
→ approve through moderation
→ verify REQ display ID
→ verify restricted Feed visibility
→ verify Guest cannot access full data
→ verify eligible Broker/Builder matching flow.

---

# 368. UNIT INVENTORY DESKTOP TEST

Open approved Project Inventory
→ Tower A
→ verify actual Unit count
→ select A-701 and A-702
→ action bar says 2 selected
→ Mark Booked
→ confirm
→ both change once
→ Audit/history exists
→ bulk Update Price
→ verify only selected Units change
→ reload
→ persistence.

---

# 369. UNIT INVENTORY MOBILE TEST

At 390px:

open Inventory
→ cards render
→ expand A-701
→ select
→ 1 selected
→ Status action
→ Edit
→ bottom sheet
→ change Price
→ Save
→ card updates
→ no page overflow.

---

# 370. UNIT CONCURRENCY TEST

Staff/User A opens A-701.

Team User B updates A-701.

User A attempts stale Save.

Expected:

safe conflict/reload state.

No silent overwrite.

---

# 371. BILLING QUOTA CONCURRENCY TEST

Set remaining Post limit = 1.

Open two sessions.

Submit two separate new Properties concurrently.

Expected:

only one consumes final entitlement according to policy.

No quota overrun.

---

# 372. AUTOSAVE RACE TEST

Type:

Version A
→ autosave slow

then:

Version B
→ autosave fast.

Expected final Draft:

Version B.

Older response must not overwrite newer state.

---

# 373. MEDIA SECURITY TEST

Attempt:

* executable renamed `.jpg`
* oversized >10 MB photo
* corrupt image
* foreign User Media ID
* unsupported brochure file.

Expected:

server rejection.

---

# 374. RLS DIRECT ACCESS TEST

User A attempts direct update of:

* User B Property Draft
* another Builder Project
* another Requirement
* another Builder Unit.

Expected:

Denied.

---

# 375. ROLE TEST MATRIX

## Guest

Cannot open posting Wizard directly.

Auth flow preserves posting intent.

## Owner

Property: allowed.
Requirement: allowed.
Project: denied.

## Broker

Property: allowed.
Requirement: allowed.
Project: denied.

## Builder

Project: allowed.
Normal Property: denied under current canonical rule.
Requirement: denied under current canonical rule.

## Staff/Admin

Posting as normal public User is not implied by Staff permission.

Admin moderation remains separate.

---

# 376. CURRENT REPOSITORY RECONCILIATION — PROPERTY FORM

Preserve:

* type-aware conditional fields,
* real Draft actions,
* current field model,
* Amenities,
* Additional Details,
* validation foundation,
* Preview concept.

Correct:

* shell,
* shared progress,
* full 9-step count,
* first-step Draft persistence,
* autosave,
* exact Location system,
* Media upload,
* exact Contact Step,
* exact Batch 4 Preview,
* source Submitted screen,
* Draft Resume location,
* edit warning confirmation.

---

# 377. CURRENT REPOSITORY RECONCILIATION — PROPERTY ACTIONS

Preserve:

* Auth checks,
* Role checks,
* ownership,
* Draft state,
* full Submit schema,
* Subscription gate,
* private Pending state,
* pause/resume,
* relist foundation.

Correct:

* atomic quota accounting,
* duplicate Submit concurrency,
* Media requirement,
* revision behavior as approved,
* specific user-facing gate errors.

---

# 378. CURRENT REPOSITORY RECONCILIATION — PROJECT FORM

Preserve:

* real Draft actions,
* Project field model,
* RERA syntax helper,
* Amenities foundation,
* timeline dates,
* Preview concept.

Correct:

* 10-step count,
* shared shell/progress/footer,
* verified Developer field,
* RERA gate,
* shared Location widget,
* Wing generator,
* real Unit configuration,
* missing Project Amenities,
* real progress percentage/milestones,
* Brochure,
* Floor Plans,
* Video,
* 360 Tour,
* Contact Step,
* exact Preview.

---

# 379. CURRENT REPOSITORY RECONCILIATION — PROJECT ACTIONS

Preserve:

* Builder-only creation,
* ownership checks,
* Plan gate,
* moderation transition,
* pause/resume,
* soft delete.

Correct:

* Project published edit/reapproval consistency,
* RERA approval gate,
* transactional quota accounting,
* Unit-generation integration.

---

# 380. CURRENT REPOSITORY RECONCILIATION — REQUIREMENT FORM

Preserve:

* seven-step domain coverage,
* purpose/category model,
* Budget/Rent branching,
* Loan preference,
* Amenities,
* Timeline,
* Broker contact preference,
* Draft/Submit.

Correct:

* shared shell/progress/footer,
* structured multi-City Location preferences,
* BHK selection semantics,
* verified Contact/Preferred Time presentation,
* exact Preview,
* honest Pending vs Live success state.

---

# 381. CURRENT REPOSITORY RECONCILIATION — REQUIREMENT ACTIONS

Preserve:

* Owner/Broker creation,
* ownership,
* Draft state,
* full Submit validation,
* Plan gate,
* moderation Pending state,
* pause/resume,
* soft delete.

Correct:

* atomic usage accounting,
* duplicate Requirement prevention,
* matching integration,
* expiry/renewal integration.

---

# 382. CURRENT REPOSITORY RECONCILIATION — WIZARD SHELL

The current three posting experiences must stop using incompatible shell systems.

Final:

one canonical Batch 5 Wizard architecture.

---

# 383. CURRENT REPOSITORY RECONCILIATION — UNIT INVENTORY

Current migration manifest marks the critical exact target surfaces as gaps.

Build:

* desktop Inventory
* bulk selection
* bulk status actions
* bulk Price update
* mobile cards/accordion
* Unit Edit desktop modal
* Unit Edit mobile bottom sheet
* real backend mutations.

---

# 384. LOADING STATES

Required:

* Wizard initial Draft load
* Draft Resume load
* Save Draft
* autosave
* Media upload
* Preview media
* Unit Inventory
* bulk action
* Unit Edit.

Use design-appropriate skeleton/progress.

---

# 385. EMPTY STATES

Required:

* no Draft
* no Media
* no Locations found
* no Units generated
* no Units matching filter.

---

# 386. ERROR STATES

Required:

* Draft load failed
* Draft save failed
* Validation failed
* Subscription required
* Limit exceeded
* Upload failed
* Provider unavailable
* Location lookup failed
* Submit failed
* RERA gate failed
* Unit generation failed
* Unit bulk partial failure
* Unit save conflict.

No raw database errors.

---

# 387. PROVIDER DEPENDENCY LIST

Batch 5 requires external/provider setup for:

* Cloudflare R2 or final media storage
* CDN delivery
* image optimization pipeline
* Maps/geocoding
* optional Video processing/provider
* 360 Tour provider allow-list/embed support
* WhatsApp notification delivery.

Track these in:

`MISSING_API_PROVIDER_EXTERNAL_SETUP_REQUIREMENTS.md`

---

# 388. LIVE VERIFICATION STANDARD

After each implementation phase:

1. run TypeScript check
2. run Lint
3. run Build
4. start live dev server
5. login as Owner
6. login as Broker
7. login as Builder
8. test wrong Role direct URLs
9. test Draft persistence
10. test refresh
11. test autosave
12. inspect database rows
13. inspect entity status
14. inspect quota state
15. inspect moderation state
16. inspect Media records
17. inspect Unit records
18. inspect RLS
19. test 390px
20. test tablet
21. test desktop
22. inspect Console
23. inspect Network
24. inspect duplicate requests
25. inspect failed provider state.

Build PASS alone is not completion.

---

# 389. MANUAL VISUAL VERIFICATION

Compare directly beside actual Batch 5 source.

Verify:

## Global

* same progress indicator,
* same footer,
* same Back behavior,
* same visual shell across all three Wizards.

## Property

* Step 3 desktop validation
* Step 6 mobile Media
* all 9 panels
* Draft Resume
* Edit/Reapproval warning.

## Project

* all 10 Steps
* RERA state
* Wing rows
* Media rows
* Contact
* Preview
* Submitted.

## Requirement

* all 7 Steps
* Location chips
* Budget
* Specifications
* Timeline
* Contact Preference
* final state.

## Unit Inventory

* desktop table
* bulk action bar
* mobile cards
* edit modal/sheet.

`Almost the same` is not PASS.

---

# 390. COMPLETION BLOCKERS

Batch 5 must not be marked complete while any of these remain:

* Property/Project/Requirement use different wizard shell systems,
* Project uses generic Stepper while Property uses WizardProgress,
* Requirement uses different Footer,
* desktop Wizard Sidebar missing where source requires it,
* sticky Footer missing,
* Save Draft missing from Project or Requirement,
* Property first Step cannot persist,
* autosave is only manual Continue-save,
* Draft Resume progress says 6 sections instead of actual Wizard Step progress,
* Draft Resume is missing from My Listings,
* edit-after-approval confirmation missing,
* Property progress shows only 8 of 9,
* Project progress shows only 9 of 10,
* Media remains Setup Required as final implementation,
* minimum Property photo rule not enforced,
* upload progress fake,
* reorder not persisted,
* Cover not persisted,
* crop control dead,
* Property Location remains static City + free-text only,
* Map Pin missing,
* Current Location action missing,
* Missing Location workflow disconnected,
* Contact Step lacks verified number confirmation,
* Preferred Contact Time missing,
* Contact privacy copy conflicts with actual reveal behavior,
* Preview is simple SummaryRows instead of Batch 4 Detail Preview,
* Property Submitted screen incomplete,
* Project Developer field not sourced from authenticated Builder Profile,
* RERA syntax-valid value shown as verified,
* Project can go Live without verified RERA or explicit exception,
* Project Location widget differs from Property widget,
* Project Step 4 only collects total counts,
* Add Wing missing,
* Unit generation missing,
* `unit_configurations` remains empty placeholder,
* Project Amenities missing source options,
* progress percent synthetic/fake,
* Brochure upload missing,
* Brochure PDF converted to image,
* Floor Plan upload missing,
* Video and Tour not separate,
* Project Contact Step incomplete,
* Project exact Preview missing,
* Project published edit/reapproval rules inconsistent,
* Requirement Location remains one City + CSV-only Localities,
* sixth Locality not server-blocked,
* BHK control semantics wrong,
* Contact Time missing,
* Requirement success says Live while database state is Pending,
* Requirement duplicate/spam handling missing,
* Unit Inventory desktop table missing,
* bulk selection missing,
* Mark Booked missing,
* Mark Sold missing,
* Update Price missing,
* Unit mobile cards missing,
* Unit Edit modal missing,
* Unit Edit bottom sheet missing,
* stale Unit overwrite possible,
* Posting gate generic error only,
* quota counter races,
* resubmit can double-count usage,
* entity Submit and usage accounting inconsistent,
* duplicate Submit creates multiple side effects,
* RLS ownership mismatch,
* dead button,
* fake progress,
* fake upload,
* fake Provider success,
* accidental horizontal scroll,
* keyboard-covered mobile Footer,
* no authenticated live verification.

---

# 391. FINAL ACCEPTANCE STATEMENT

**Design Batch 5 — Posting Wizards is complete only when Property, Project and Requirement posting use one exact shared Batch 5 Wizard system and Builder Unit Inventory is fully functional on desktop and mobile.**

Completion requires:

* exact 9-step Property Wizard,
* exact 10-step Project Wizard,
* exact 7-step Requirement Wizard,
* one canonical shared Wizard shell,
* Role-aware desktop context,
* mobile contextual Header,
* Step X of N,
* shared progress,
* shared sticky Footer,
* Back ghost action,
* Save Draft secondary action,
* Continue primary action,
* partial Draft schema,
* true autosave,
* honest save status,
* exact Step persistence,
* refresh recovery,
* Resume card,
* My Listings Draft entry,
* Start New behavior,
* validation summary,
* inline errors,
* full final Submit validation,
* conditional type-based Property fields,
* complete Property categories/types,
* Property Price/Area flow,
* canonical Location system,
* autosuggest,
* Map Pin,
* Current Location,
* Missing Location request,
* Amenities,
* real Media uploader,
* max file validation,
* minimum photo requirement,
* progress,
* retry,
* reorder,
* Cover image,
* crop,
* verified contact confirmation,
* Preferred Contact Time,
* Contact privacy,
* exact Batch 4 Preview,
* Edit links,
* Pending moderation state,
* Property Submitted state,
* Edit/Reapproval confirmation,
* verified Builder Developer identity,
* real RERA workflow,
* RERA syntax validation,
* RERA Pending state,
* RERA verification gate,
* explicit audited Admin exception,
* Project Location,
* Nearby Landmarks,
* Wing configuration,
* Floors,
* Units/Floor,
* Add Wing,
* calculated Unit total,
* idempotent Unit generation,
* Project Amenities,
* Launch Date,
* Possession Date,
* real construction progress,
* milestones,
* Brochure PDF,
* PDF preserved as PDF,
* Floor Plan images,
* Project Video,
* 360 Tour,
* honest unavailable media states,
* Project Contact confirmation,
* exact Project Preview,
* Pending RERA Check Submitted state,
* Requirement Looking For,
* structured multi-City Location preferences,
* maximum five Localities,
* Budget/Range,
* Loan Pre-approved,
* BHK semantics,
* Area Range,
* Must-have Amenities,
* Timeline,
* Contact Preferences,
* In-app Proposals only,
* Calls OK,
* exact Requirement Preview,
* Pending/Live honesty,
* human-readable Requirement ID,
* restricted Requirement visibility,
* duplicate/spam protection,
* Unit Inventory desktop table,
* Tower/Wing tabs,
* real Unit counts,
* bulk selection,
* Mark Booked,
* Mark Sold,
* Update Price,
* mobile Unit cards,
* mobile selection,
* desktop Unit Edit modal,
* mobile Unit Edit bottom sheet,
* Unit transition rules,
* stale-state protection,
* Unit history/Audit,
* Inventory-to-Public-Project aggregate connection,
* real Subscription gates,
* correct posting-limit semantics,
* concurrency-safe quota accounting,
* idempotent submission,
* complete ownership/RLS enforcement,
* complete provider fallback honesty,
* complete desktop visual verification,
* complete tablet verification,
* complete 390px mobile verification,
* complete Owner/Broker/Builder regression.

Required implementation sequence:

**Shared Wizard Infrastructure → Property Wizard → Property Draft/Autosave/Resume → Property Media/Location/Contact → Property Preview/Submit → Edit Reapproval → Project Wizard → RERA Gate → Wing/Unit Generation → Project Media → Project Preview/Submit → Requirement Wizard → Requirement Matching/Privacy → Unit Inventory Desktop → Unit Bulk Actions → Unit Mobile Cards → Unit Edit Modal/Sheet → Billing/Quota Concurrency → RLS/Transaction Audit → complete authenticated responsive regression.**

No Batch 5 screen passes merely because the form renders.

**Exact Design + Shared Wizard Consistency + Draft Integrity + Autosave Integrity + Media Functionality + Location Integrity + Contact Privacy + Preview Fidelity + Moderation Integrity + RERA Integrity + Unit Inventory Integrity + Billing Gate Integrity + Transaction Safety + RLS + Responsive Behavior + Live Multi-Role Verification must all pass.**
