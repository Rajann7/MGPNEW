# FRESH BATCH REBUILD RULES

## Purpose

This file defines the mandatory execution method for fresh MGP DESIGN migration work.

This is NOT:

- a restyle;
- a theme change;
- a legacy page cleanup;
- a gap-fill exercise;
- an old-page enhancement exercise;
- a process of inserting selected MGP components into existing legacy layouts.

This IS:

> A COMPLETE DESIGN-FIRST VISUAL REBUILD using the exact MGP DESIGN as the visual authority, while preserving and reconnecting complete real product capability, backend behavior, security, data, and business logic.

Authoritative design source:

`C:\Users\RAJAN\Documents\MGP DESIGN`

For the active session:

- process the explicitly requested batch only;
- do not start the next batch;
- follow `MGP_FULL_DESIGN_MIGRATION_MASTER.md`;
- follow current migration tracking files;
- use fresh evidence only.

---

# 0. ABSOLUTE DESIGN-FIRST EXECUTION RULE

THIS RULE OVERRIDES EVERY OTHER VISUAL IMPLEMENTATION METHOD.

The legacy/current page must NEVER be used as the visual starting point.

For every screen target, implementation must happen in this exact order:

1. inspect the exact MGP DESIGN target first;
2. extract the complete design structure;
3. freeze the screen-specific chrome;
4. build a design blueprint;
5. define required design blocks;
6. define allowed visual blocks;
7. define legacy visual blocks that must be removed;
8. only then inspect the old application for functionality and data;
9. create the new MGP presentation tree;
10. integrate complete real product data;
11. reconnect existing working functionality;
12. implement new design features end-to-end;
13. cut the route over to the new presentation tree;
14. remove all legacy visual remnants;
15. perform fresh full-page design-vs-route verification.

Required implementation sequence:

```text
MGP DESIGN
→ DESIGN BLUEPRINT
→ NEW MGP PAGE STRUCTURE
→ COMPLETE REAL DATA
→ EXISTING FUNCTIONALITY RECONNECTION
→ NEW FEATURE IMPLEMENTATION
→ LIVE VERIFICATION

Forbidden implementation sequence:

OLD PAGE
→ PATCH
→ RESTYLE
→ ADD SOME MGP FEATURES
→ KEEP OLD STRUCTURE
→ CALL IT MIGRATED

Do not begin a target by editing the old page section-by-section.

1. FRESH REBUILD STATUS RULE

This is a fresh rebuild.

Do NOT trust historical:

COMPLETE;
IMPL;
IMPL✓;
VERIFIED;
PASS;
runtime-verified;
old prompt completion;
old screenshots;
old browser checks;
old responsive results;
old interaction testing;
old verification reports.

Historical information may be read only for context.

It may NOT establish fresh migration completion.

Every processed target must receive fresh inspection and fresh verification evidence.

Required rule:

FRESH PASS REQUIRES FRESH EVIDENCE
2. PHASE A — DESIGN EXTRACTION BEFORE LEGACY CODE INSPECTION

Before inspecting old page composition, old JSX structure, or old route layout:

Open the exact MGP DESIGN target.

Create a short:

SCREEN DESIGN BLUEPRINT

Record:

A. Screen identity
target ID;
batch;
canonical target;
route;
variant/state relationship.
B. Exact chrome

Record whether the target has:

public header;
condensed header;
contextual header;
dashboard topbar;
admin topbar;
sidebar;
mobile drawer;
bottom navigation;
sticky CTA;
floating action;
banner;
breadcrumb;
tabs;
footer.

Record explicitly:

HEADER: PRESENT / ABSENT
FOOTER: PRESENT / ABSENT
SIDEBAR: PRESENT / ABSENT
BOTTOM_NAV: PRESENT / ABSENT
STICKY_CTA: PRESENT / ABSENT
C. Exact top-to-bottom structure

Record:

first visible element;
header/topbar state;
breadcrumb or no breadcrumb;
hero/gallery/primary content;
title/summary area;
section sequence;
section grouping;
cards/modules;
tabs/navigation;
related actions;
modal/drawer/sheet relationships;
sticky/fixed UI;
footer state;
final visible element;
exact page ending.
D. Responsive structure

Record separately:

desktop structure;
tablet structure;
mobile structure;
sections that move;
sections that disappear;
sections that become sheets/drawers;
mobile-only sticky CTA;
desktop-only panels;
different navigation behavior;
different gallery behavior;
different modal/sheet behavior.
E. UI states

Record all applicable:

loading;
empty;
populated;
partial data;
unavailable;
success;
failure;
error;
unauthorized;
forbidden;
setup-required;
provider unavailable;
suspended;
rate-limited;
not-found.

Do not inspect or copy legacy page composition during this phase.

3. DESIGN REQUIRED BLOCK LIST

For each target, create:

DESIGN_REQUIRED_BLOCKS

Every visible structural block shown in the mapped MGP DESIGN must be accounted for.

Examples:

header;
breadcrumb;
gallery;
title block;
facts row;
description;
amenities;
location;
contact card;
related content;
sticky CTA;
action menu;
tabs;
progress state;
modal;
sheet;
footer.

Before VISUAL PASS:

MISSING_DESIGN_BLOCKS = 0

A route cannot pass because only selected MGP components were added.

The full target composition must be present.

4. DESIGN BLOCK ALLOWLIST

Create:

DESIGN_BLOCK_ALLOWLIST

The final route may contain only:

visual blocks shown in the exact mapped MGP DESIGN target;
responsive transformations shown or implied by the design system;
required complete product content integrated inside the nearest matching MGP pattern;
new feature UI implemented inside the MGP design language.

Do not preserve unrelated old sections.

Do not append legacy blocks below the MGP page.

Do not add global chrome automatically.

5. ABSOLUTE VISUAL REPLACEMENT RULE

The old visual design must NOT be preserved.

Do NOT:

modify the old page and call it migration;
restyle the old page;
change only colors;
change only typography;
change only spacing;
replace only some cards;
add new design sections into old page structure;
wrap new MGP body with old header/footer;
leave old sections below new MGP sections;
use old dashboard shell around new modules;
combine old navigation and new navigation;
retain old section order for implementation convenience.

The required result is:

EXACT MGP DESIGN PRESENTATION
+
COMPLETE REAL PRODUCT CAPABILITY
+
REAL WORKING FUNCTIONALITY
+
NEW DESIGN FEATURES IMPLEMENTED END-TO-END

Not:

OLD PAGE
+
SOME MGP COMPONENTS
6. SCREEN-SPECIFIC CHROME RULE

The exact mapped target controls visual chrome.

If the exact target has no header:

DO NOT RENDER A HEADER

If the exact target has no footer:

DO NOT RENDER A FOOTER

Same rule applies to:

sidebar;
bottom navigation;
sticky CTA;
topbar;
banner;
breadcrumb;
tabs;
navigation row;
floating action;
shell.

Do not inherit visual chrome because:

the route previously used a shared layout;
another route has that shell;
a parent layout injects it;
old JSX contains it;
removing it is inconvenient.

If shared layout code injects incorrect chrome:

bypass the layout for that route;
split the layout;
make chrome conditional by explicit screen contract;
refactor the shell safely.

Implementation convenience must not override the exact target design.

7. NO HYBRID OLD + NEW PAGE

Hybrid visual composition is prohibited.

Forbidden examples:

old header + new body;
new hero + old detail sections;
old dashboard shell + new Kanban;
new gallery + old information sections;
new cards inside old page composition;
MGP content followed by legacy sections;
old footer where design has none;
old sidebar where design has none;
duplicate old/new feature surfaces.

Required:

ONE COHERENT VISUAL SYSTEM
=
THE EXACT MGP DESIGN STRUCTURE

Before completion:

OLD_VISUAL_STRUCTURE_USED = 0
HYBRID_OLD_NEW_LAYOUT = 0
OLD_UI_REMNANTS = 0
8. PHASE B — LEGACY FUNCTIONALITY EXTRACTION ONLY

After the DESIGN BLUEPRINT is complete, inspect the existing application.

Use old code only to recover:

backend logic;
APIs;
server actions;
data loaders;
database schema;
complete real fields;
complete options;
complete statuses;
business rules;
validation;
authentication;
authorization;
permissions;
RLS/security;
routing;
redirects;
query parameters;
persistence;
domain logic;
workflows;
useful product capability.

Do NOT treat these as visual authority:

old page JSX;
old shell;
old header/footer;
old cards;
old sections;
old section order;
old responsive layout;
old navigation composition;
old visual wrappers.

Existing code is authoritative for functionality.

It is NOT authoritative for visual composition.

9. PRESERVE CAPABILITY, NOT PRESENTATION

When the old application contains useful functionality that the MGP screen does not show as an old-style visual block:

Do NOT preserve the legacy visual section.

Instead:

preserve the underlying capability;
remove its legacy presentation;
locate the nearest relevant MGP pattern;
integrate complete real functionality/data inside that MGP pattern;
preserve MGP hierarchy and visual language.

Example:

Old site:

Large legacy Property Features section

MGP DESIGN:

Structured details / feature cards / compact data group

Correct:

Remove old Property Features section.
Use complete real features.
Render them in the MGP details pattern.

Wrong:

Keep old Property Features section because it has more data.

This applies globally to:

screens;
forms;
modules;
dashboards;
tables;
filters;
detail pages;
profiles;
billing;
CRM;
admin;
CMS;
analytics;
notifications;
ads;
workflows.
10. GLOBAL PRODUCT COMPLETENESS RULE

This rule applies globally.

It is NOT limited to property types.

The MGP DESIGN may show:

sample values;
shorter lists;
illustrative data;
partial options;
limited cards;
limited filters;
limited statuses.

Do not reduce real product capability to match sample counts.

For every:

screen;
component;
section;
module;
form;
table;
card group;
dashboard;
workflow;
filter;
dropdown;
select;
tab set;
status set;
data list;
configuration list;
permission set;
role option set;
content block;
analytics module;
billing module;
CRM module;
admin module;
location hierarchy;
ads module;
notification module;
project module;
property module;

preserve complete relevant real:

data;
fields;
options;
records;
statuses;
types;
categories;
configurations;
features;
amenities;
modules;
sections;
workflows;
actions;
permissions;
business rules.

Present the complete capability using the nearest matching MGP DESIGN component/pattern.

Do NOT:

hardcode only design sample values;
remove valid product capability;
restore the old layout;
append legacy sections for additional data.

Governing formula:

EXACT MGP DESIGN PRESENTATION
+
COMPLETE REAL PRODUCT DATA
+
COMPLETE REAL PRODUCT CAPABILITY
+
REAL WORKING FUNCTIONALITY
11. PHASE C — NEW MGP PRESENTATION TREE

Construct the route from the DESIGN BLUEPRINT.

The new presentation tree must become the actual visual route implementation.

Allowed reuse:

server actions;
hooks;
state logic;
handlers;
data loaders;
validation;
domain utilities;
backend integrations.

Visual reuse is allowed only when the reused visual component independently matches the required MGP pattern.

Do not reuse legacy page-level composition merely because it works.

Where needed:

replace page JSX;
create new MGP components;
restructure route composition;
split shared shells;
move existing handlers into new components;
preserve backend logic without preserving old visual tree.
12. NEW DESIGN FEATURE AUTO-IMPLEMENTATION RULE

If the MGP DESIGN shows a new feature absent from the old application:

DO NOT ASK ME WHETHER TO IMPLEMENT IT.

The default answer is:

YES — IMPLEMENT IT END-TO-END

Before implementation inspect:

existing code;
database schema;
current backend;
product documentation;
feature registry;
related workflows;
similar features;
role rules;
permissions;
RLS/security.

When behavior can be reliably derived, implement automatically.

Where applicable, implementation includes:

UI;
frontend state;
interaction behavior;
validation;
server action/API;
backend logic;
database changes;
migration files;
persistence;
permissions;
role checks;
RLS/security;
loading;
empty;
populated;
success;
failure;
retry/recovery;
duplicate submission prevention;
optimistic update;
rollback;
refresh persistence;
navigation;
desktop behavior;
tablet behavior;
mobile behavior;
tests;
verification.

Do not leave designed features:

decorative-only;
fake;
hardcoded;
disconnected;
Coming Soon;
placeholder-only;
visually clickable but dead;
simulated with fake success.

Ask the user only when a genuine business/product ambiguity remains after exhausting:

code;
database;
schema;
documentation;
related workflows;
roles;
permissions;
security rules;
similar functionality.
13. BATCH COVERAGE RULE

Process every actual target in the active batch.

Include:

route screens;
desktop variants;
tablet variants;
mobile variants;
responsive variants;
loading states;
empty states;
populated states;
partial-data states;
success states;
failure states;
errors;
unauthorized states;
forbidden states;
not-found states;
unavailable states;
setup-required states;
modals;
dialogs;
drawers;
bottom sheets;
popovers;
dropdowns;
wizard steps;
shared interactive components;
sticky/fixed UI;
valid inherited relationships.

Do not silently skip targets.

For genuine:

REFERENCE_ONLY;
DESIGN_SYSTEM_REFERENCE;
INHERITS_FROM_CANONICAL_SCREEN;

record the relationship explicitly.

Do not create duplicate routes for true inherited or reference-only targets.

14. SCREEN-BY-SCREEN EXECUTION LOOP

For every implementation target:

inspect exact MGP target;
create DESIGN BLUEPRINT;
freeze chrome;
create DESIGN_REQUIRED_BLOCKS;
create DESIGN_BLOCK_ALLOWLIST;
create LEGACY_UI_TO_REMOVE;
identify complete product capability;
identify functionality to reconnect;
identify new features;
identify backend/data dependencies;
identify shared-component impact;
create/update contract;
mark IN_PROGRESS;
record exact resume point;
build new MGP presentation tree;
remove legacy visual composition;
integrate complete real data;
reconnect working functionality;
implement new features end-to-end;
verify interactions;
verify forms;
verify states;
verify persistence;
verify permissions/security;
verify responsive behavior;
compare exact design vs actual route;
run regression checks;
record fresh evidence;
update tracking;
determine four gates.

Do not mark COMPLETE before this loop is complete.

15. INTERACTION VERIFICATION RULE

Test every actual interactive or action-implying control.

Where present, test:

buttons;
icon buttons;
links;
tabs;
dropdowns;
selects;
filters;
chips;
checkboxes;
radio buttons;
switches;
text inputs;
search;
date pickers;
sliders;
uploads;
forms;
CTAs;
clickable cards;
pagination;
accordions;
menus;
modals;
dialogs;
drawers;
sheets;
close;
back;
share;
download;
call;
enquiry;
save;
favorite;
compare;
edit;
delete;
status change;
drag/drop;
wizard next/back;
submit;
retry;
cancel;
confirmation flows.

Do not invent interactions for informational-only UI.

Labels, badges, metrics, captions, illustrations, and static explanatory content should remain non-interactive where design intent is informational.

16. FORM VERIFICATION RULE

For applicable forms test:

empty submit;
required validation;
invalid input;
valid input;
minimum length;
maximum length;
long text;
special characters where applicable;
loading state;
duplicate submission prevention;
server failure;
network failure where testable;
success;
error feedback;
persistence;
refresh;
permissions.

For wizards test:

next;
back;
step validation;
progress state;
state retention;
refresh behavior;
save draft;
final submit;
failure recovery;
duplicate submission prevention.
17. LIVE VISUAL VERIFICATION RULE

Do not approve visuals from source-code inspection alone.

Where tools are available:

render the exact MGP DESIGN target;
render the actual route;
use matching viewport sizes;
compare full page top-to-bottom.

Compare:

first visible element;
chrome;
header;
footer;
sidebar;
topbar;
breadcrumb;
hero/gallery;
section presence;
section absence;
section order;
section grouping;
container widths;
columns;
card dimensions;
image ratios;
typography hierarchy;
spacing rhythm;
tabs;
dialog sizing;
drawer/sheet behavior;
sticky/fixed UI;
content density;
final page ending.

A route screenshot alone is not enough.

Structural DOM similarity alone is not enough.

Required:

EXACT DESIGN TARGET
VS
ACTUAL ROUTE
AT MATCHING VIEWPORT
18. VISUAL PASS REJECTION RULE

VISUAL PASS is automatically FAIL if any of these is true:

legacy page composition is still the base;
only styling changed;
MGP modules were inserted into legacy layout;
old sections remain absent from design;
design blocks are missing;
design section order differs;
header/footer/sidebar/chrome differs;
old and new visual systems are mixed;
final page ending differs materially;
route does not match full mapped target composition.

Required before VISUAL PASS:

MISSING_DESIGN_BLOCKS = 0
EXTRA_VISUAL_BLOCKS = 0
LEGACY_VISUAL_COMPONENTS_RENDERED = 0
CHROME_MISMATCHES = 0
HYBRID_OLD_NEW_LAYOUT = 0
OLD_UI_REMNANTS = 0
19. RESPONSIVE VERIFICATION RULE

Follow the exact responsive viewport matrix from MGP_FULL_DESIGN_MIGRATION_MASTER.md.

Also test explicit design viewport sizes.

Verify:

desktop structure;
tablet structure;
mobile structure;
breakpoint shell changes;
content order;
sidebar collapse;
drawer behavior;
bottom navigation;
sticky CTA;
card stacking;
column collapse;
modal width;
bottom-sheet behavior;
tab scroll/wrap;
image cropping;
keyboard-sensitive layout where testable;
touch usability;
footer behavior.

Do not blindly shrink desktop design.

Use actual mobile/tablet design variants when present.

20. UI DEFECT AUDIT RULE

Explicitly detect and fix:

text overflow;
text clipping;
unintended ellipsis;
dropdown text clipping;
select text clipping;
insufficient component width;
squeezed input fields;
zero-width controls;
button overflow;
long-label overflow;
horizontal page overflow;
card overflow;
modal overflow;
drawer overflow;
content behind sticky UI;
fixed-element overlap;
sticky-element overlap;
mobile navigation overlap;
broken wrapping;
font-width collisions;
breakpoint collisions.

Use real browser/computed-layout auditing where possible.

Intentional horizontal scroll or truncation is allowed only when:

design supports it;
interaction remains usable;
it is documented as intentional.
21. DATA AND PERSISTENCE VERIFICATION

Where applicable verify:

real data source;
queries;
filters;
sorting;
pagination;
saved data;
create;
update;
delete;
persistence after refresh;
role-specific data;
unauthorized access;
privacy masking;
counts;
empty state;
error state;
mutation failure;
optimistic rollback;
cross-page workflow.

Do not use fake data to simulate product behavior.

22. SECURITY AND RLS RULE

For applicable functionality verify:

authentication;
authorization;
role permissions;
route guards;
RLS/security;
unauthorized data protection;
mutation restrictions;
ownership rules;
privacy masking.

If a real RLS/database defect blocks the designed functionality:

fix it safely;
create migration if needed;
preserve security;
apply only through approved safe workflow;
verify the fix;
record evidence.

Do not hide backend defects behind UI-only workarounds.

23. PROVIDER-GATED FEATURE RULE

For provider-gated functionality:

Do not:

fake success;
fake provider data;
mark external success without real verification.

Respect approved states:

SETUP_REQUIRED;
FALLBACK_ACTIVE;
DISABLED_BY_FLAG;
DEV_ONLY;
PROVIDER_UNAVAILABLE;
documented equivalent states.

Verify the approved fallback/setup-required behavior.

Keep separate:

implementation status;
provider activation status;
real provider verification status.

A correct approved fallback must not automatically block unrelated migration completion.

24. SHARED COMPONENT IMPACT RULE

Before changing any shared:

shell;
header;
footer;
sidebar;
bottom navigation;
token;
UI primitive;
form component;
card;
table;
modal;
drawer;
detail component;
responsive utility;

identify all affected targets.

After the change:

re-check affected completed targets;
rerun relevant visual checks;
rerun responsive checks;
rerun interaction checks;
rerun regression checks;
update affected verification records.

A new target cannot be marked COMPLETE if its shared-component change breaks a previous target.

25. ENGINEERING CHECKS

Run all relevant available:

eslint;
typecheck;
build;
configured tests;
runtime route checks;
live interaction checks;
responsive browser checks;
persistence checks;
permission/security checks;
affected shared-component regression checks.

Use safe isolated build output only when necessary to avoid interfering with another live process.

Restore temporary configuration afterward.

Do not corrupt another active session.

26. FRESH EVIDENCE RULE

Previous verification must NOT be reused as current proof.

Do not use as fresh evidence:

old screenshots;
old PASS labels;
old verification reports;
old responsive results;
old interaction results;
old runtime recordings;
old prompt completion claims.

Old evidence may be historical context only.

Every current PASS must have evidence generated during the current fresh batch cycle.

Do not fabricate PASS.

When a specific required check cannot run:

mark that exact check UNVERIFIED;
or UNVERIFIED-AUTH;
or BLOCKED;

as appropriate.

Record the exact missing requirement.

Continue every other possible implementation and verification step.

27. FOUR GATE RULE

Each target requires:

VISUAL
FUNCTIONAL
RESPONSIVE
REGRESSION

Do not use code inspection as substitute for required runtime evidence.

Scoped subchecks may PASS.

But overall gate wording must not hide required unavailable checks.

Example:

Guest functional checks: PASS
Authenticated persistence check: UNVERIFIED-AUTH
Overall FUNCTIONAL: UNVERIFIED-AUTH
FINAL: NOT COMPLETE

Do not write unconditional PASS when required evidence is missing.

28. TRACKING RULE

Keep synchronized:

SCREEN_MANIFEST.md
TARGET_REGISTRY.md
CHROME_MATRIX.md
contracts
verification reports
provider status
security/RLS checklist where applicable
checkpoint tracking
exact resume point

Clearly separate:

HISTORICAL STATUS

from:

FRESH REBUILD STATUS

Only fresh evidence may establish fresh completion.

29. CHECKPOINT RULE

For active work record:

STATUS: IN_PROGRESS
TARGET:
CURRENT STEP:
FILES CHANGED:
COMPLETED:
REMAINING:
BLOCKERS:
EXACT RESUME POINT:
VERIFICATION STATUS:

Do not start another target while an earlier active target is IN_PROGRESS unless it is genuinely blocked and explicitly documented.

30. BATCH SESSION SCOPE

For every run, the user will specify:

PROCESS TXX / Batch X ONLY.
DO NOT START TYY / Batch Y.

Process the active batch only.

Continue until:

every batch target is accounted for;
every target classification is confirmed;
every implementation target is freshly inspected;
complete MGP visual reconstruction is done;
old visual composition is removed;
complete real product data is integrated;
existing functionality is reconnected;
new design features are implemented end-to-end;
all possible fresh verification is complete;
tracking is synchronized.

Do not stop to ask whether a clearly designed new feature should be implemented.

Implement it.

Ask only when a genuine unresolved business/product rule remains after exhausting:

code;
database;
schema;
documentation;
workflows;
roles;
permissions;
security;
similar features.
31. TOKEN-EFFICIENT EXECUTION RULE

Execute directly.

Do not narrate:

every file read;
every grep/search;
every small implementation step;
routine reasoning;
repeated summaries.

Progress updates should be short.

Use the existing Master and this file instead of repeating rules in chat.

Do not repeat already-established context unless necessary for correctness.

Final report must be concise.

32. FINAL BATCH REPORT

At the end report only:

batch targets processed / total;
screens reconstructed;
screens corrected;
legacy UI removed;
mismatches fixed;
complete data/fields/options integrated;
new functionality implemented;
VISUAL gate;
FUNCTIONAL gate;
RESPONSIVE gate;
REGRESSION gate;
blockers;
UNVERIFIED / UNVERIFIED-AUTH checks;
important files changed;
exact next-batch starting point.

Do not start the next batch.

FINAL GOVERNING FORMULA

For every target:

EXACT NEW MGP DESIGN PRESENTATION
+
COMPLETE REAL PRODUCT DATA
+
COMPLETE REAL PRODUCT CAPABILITY
+
PRESERVED WORKING BACKEND AND SECURITY
+
EXISTING FUNCTIONALITY RECONNECTED
+
NEW DESIGN FEATURES IMPLEMENTED END-TO-END
+
FRESH LIVE VERIFICATION

Never:

OLD PAGE DESIGN
+
SOME NEW MGP FEATURES
+
MINOR RESTYLING

Required final counters:

MISSING_DESIGN_BLOCKS = 0
EXTRA_VISUAL_BLOCKS = 0
LEGACY_VISUAL_COMPONENTS_RENDERED = 0
CHROME_MISMATCHES = 0
HYBRID_OLD_NEW_LAYOUT = 0
OLD_UI_REMNANTS = 0
DEAD_CONTROLS = 0
PLACEHOLDER_FEATURES = 0
UNVERIFIED_INTERACTIONS = 0

A target is not visually complete until the exact mapped MGP DESIGN is the real visual page structure.

