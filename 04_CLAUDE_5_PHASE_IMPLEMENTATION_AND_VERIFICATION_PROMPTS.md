# `04_CLAUDE_5_PHASE_IMPLEMENTATION_AND_VERIFICATION_PROMPTS.md`

# MY GUJARAT PROPERTY

## FINAL FIVE-PHASE CLAUDE IMPLEMENTATION AND SEPARATE MANUAL VERIFICATION PROMPT SYSTEM

**File status:** FINAL EXECUTION AUTHORITY
**Project root:** `C:\mgpweb`
**Approved design directory:** `C:\mgpweb\newdesign`
**Total authority files:** 5
**Total user-executed implementation phases:** 5
**Total user-executed verification phases:** 5
**Workflow:** Master Start → Phase Implementation → Implementation Report → Separate Verification → Fix/Retest → PASS → Next Phase
**Primary design rule:** Every current application screen must follow the mapped HTML design from its actual top boundary through its actual bottom boundary.

---

# 1. DOCUMENT PURPOSE

This file contains the exact prompts that must be sent to Claude to implement and manually verify the complete My Gujarat Property application.

This file replaces the earlier system that required:

* many separate Batch specification files;
* separate prompts for every screen;
* separate prompts for every small section;
* repeated global rules;
* and a very large number of user messages.

The final system contains only five authority files:

1. `00_MASTER_PROJECT_AND_DESIGN_AUTHORITY.md`
2. `01_MASTER_SCREEN_ROUTE_DESIGN_REGISTRY.md`
3. `02_COMPLETE_FUNCTIONAL_BACKEND_AND_DATA_SPEC.md`
4. `03_MASTER_MANUAL_VERIFICATION_AND_RELEASE_CHECKLIST.md`
5. `04_CLAUDE_5_PHASE_IMPLEMENTATION_AND_VERIFICATION_PROMPTS.md`

These five files and the exact HTML designs inside:

`C:\mgpweb\newdesign`

form the complete authority system.

Old Batch Markdown specifications may remain temporarily as historical evidence, but Claude must not require them for the new five-file workflow.

The consolidated authority is:

* File 1 for global design, security and implementation rules;
* File 2 for every screen, route, shell and responsive state;
* File 3 for complete functionality, backend and data behavior;
* File 4 for manual verification and release standards;
* File 5 for execution prompts.

---

# 2. HOW TO USE THIS FILE

Use this exact order.

## Step 1 — Send the Master Start Prompt

Send:

`PROMPT 0 — MASTER START AND AUTHORITY LOCK`

Send it only once at the beginning of the Claude project session.

Wait for the Master Readiness Report.

Do not allow Claude to begin implementation before the authority and repository audit is complete.

## Step 2 — Send Phase 1 Implementation Prompt

Send only:

`PROMPT 1A — PHASE 1 IMPLEMENTATION`

Wait for the Phase 1 Implementation Report.

## Step 3 — Send Phase 1 Verification Prompt

Send only:

`PROMPT 1B — PHASE 1 MANUAL VERIFICATION`

Claude must manually verify, fix every internal defect, retest and return PASS, FAIL or BLOCKED.

Do not send Phase 2 until Phase 1 is PASS.

## Step 4 — Continue the same pattern

Use:

* Phase 2 Implementation;
* Phase 2 Verification;
* Phase 3 Implementation;
* Phase 3 Verification;
* Phase 4 Implementation;
* Phase 4 Verification;
* Phase 5 Implementation;
* Phase 5 Verification.

## Step 5 — Final release

Phase 5 Verification includes:

* complete cross-phase regression;
* complete production readiness verification;
* and the Final Production Release Report.

---

# 3. USER MESSAGE COUNT

The normal execution requires exactly these user messages:

1. Master Start
2. Phase 1 Implementation
3. Phase 1 Verification
4. Phase 2 Implementation
5. Phase 2 Verification
6. Phase 3 Implementation
7. Phase 3 Verification
8. Phase 4 Implementation
9. Phase 4 Verification
10. Phase 5 Implementation
11. Phase 5 Verification

No separate prompt is required for every individual screen.

Claude must complete internal screen groups autonomously inside the named Phase.

---

# 4. SEPARATE IMPLEMENTATION AND VERIFICATION LOCK

Never send one Phase Implementation Prompt and its Manual Verification Prompt together.

The correct sequence is:

**Phase Implementation Prompt
→ Claude implements
→ Claude returns Implementation Report
→ Claude stops
→ User sends separate Manual Verification Prompt
→ Claude manually verifies the running application
→ Claude fixes defects
→ Claude retests
→ Claude returns PASS, FAIL or BLOCKED
→ Claude stops
→ Next Phase begins only after PASS.**

Claude must not mark a Phase PASS in the Implementation Report.

Implementation status may only be:

* `IMPLEMENTED`
* `PARTIAL`
* `BLOCKED`

Final Phase status is decided only by the separate Verification Prompt.

---

# 5. INTERNAL PHASE CHECKPOINT RULE

Each Phase contains multiple screens and modules.

Claude must internally complete them in the specified order.

Claude may internally:

* inspect;
* implement;
* test;
* fix;
* and checkpoint

each screen group.

However, Claude must not require the user to paste dozens of additional section prompts.

Claude must continue autonomously until:

* the complete Phase scope is implemented;
* or a genuine blocker prevents further progress.

Claude must not stop after implementing only the first screen in the Phase.

Claude must not return a Phase Implementation Report while mandatory registry IDs remain unimplemented unless the report honestly states `PARTIAL` or `BLOCKED`.

---

# 6. CONTEXT-LIMIT AND RESUME RULE

If Claude genuinely approaches a context or execution limit before completing a Phase:

1. preserve all completed code;
2. do not undo working changes;
3. run focused tests for completed work;
4. return `PARTIAL`;
5. list every completed Registry ID;
6. list every remaining Registry ID;
7. list the exact next implementation point;
8. list current server/database state;
9. stop without declaring PASS.

The same Phase Implementation Prompt must then be sent again.

When it is sent again, Claude must:

* inspect the previous Phase report;
* inspect current repository changes;
* resume from the first incomplete Registry ID;
* not rebuild completed work unnecessarily;
* and complete the same Phase.

This does not create an additional official Phase.

---

# 7. ONLY FIVE AUTHORITY FILES RULE

Claude must not generate another large prompt-document system.

Do not create:

* new Batch authority Markdown files;
* one prompt file per screen;
* one verification file per screen;
* duplicate Master Registry;
* duplicate Functional Specification;
* duplicate manual checklist;
* or a second phase system.

Implementation source files, components, tests, migrations and application code may be created as required.

Reports must be returned in chat unless the user explicitly asks to save them.

---

# 8. DESIGN FILE AUTHORITY

The exact HTML files inside:

`C:\mgpweb\newdesign`

are the final visible authority.

For every screen:

* open the full HTML file;
* find the exact internal screen;
* identify its product boundary;
* inspect every state;
* inspect its desktop representation;
* inspect its tablet behavior;
* inspect its mobile representation;
* implement from the exact screen top through the exact screen bottom.

Do not implement only the first viewport.

Do not copy:

* screen labels;
* design notes;
* viewport frames;
* documentation wrappers;
* arrows;
* measurements;
* explanatory text;
* or prototype-only presentation elements.

---

# 9. CURRENT SCREEN REPLACEMENT LOCK

Where the current application conflicts with the approved design:

* preserve secure compatible backend functionality;
* replace conflicting presentation;
* rebuild missing or incorrect behavior;
* remove old conflicting visual code.

Do not:

* add the new screen inside the old page;
* place the new card below an old card;
* retain the old header;
* retain the old sidebar;
* retain duplicate CTA systems;
* hide old UI only through CSS;
* keep a direct old route with old design;
* or combine two design generations.

---

# 10. AUTOMATIC PROJECT SKILL RULE

Before beginning each Phase, Claude must inspect the project for installed instruction and skill files, including applicable:

* root `CLAUDE.md`;
* project-level Claude instructions;
* `.claude/skills/**/SKILL.md`;
* `.github/skills/**/SKILL.md`;
* repository workflow instructions;
* testing skills;
* frontend/browser skills;
* Supabase/database skills;
* security skills;
* accessibility skills;
* and deployment skills.

Claude must automatically use relevant skills that actually exist.

Claude must not:

* invent a skill;
* claim a missing skill ran;
* use an unrelated skill;
* allow a skill to override these five authority files;
* or use a skill as proof that manual verification passed.

The Phase report must state:

* skills discovered;
* skills used;
* skills unavailable;
* and results produced.

If no relevant skill exists, continue using the project’s real commands and architecture.

---

# 11. GIT AND REPOSITORY SAFETY

Before each implementation Phase:

1. inspect Git status;
2. inspect active branch;
3. inspect existing uncommitted work;
4. identify user-created changes;
5. avoid destructive reset;
6. avoid overwriting unrelated work;
7. avoid deleting files without evidence;
8. preserve repository history.

Do not run:

* destructive hard reset;
* forced checkout over user changes;
* full database reset;
* mass file deletion;
* or force push

without explicit user instruction.

Do not create commits or push changes unless explicitly instructed.

---

# 12. SERVER EXECUTION RULE

Do not stop the development server unnecessarily.

Use the project’s actual package manager and scripts.

Before running commands:

* inspect `package.json`;
* inspect repository instructions;
* identify lint command;
* identify typecheck command;
* identify test command;
* identify production build command;
* identify development command.

If the application is already running:

* preserve it where possible;
* use its current port;
* verify the actual application URL.

Restart only when necessary.

Do not repeatedly restart the server to hide state defects.

---

# 13. GLOBAL IMPLEMENTATION RULES

Every implementation Phase must follow all rules in Files 1–3.

At minimum:

1. Read all relevant authority sections completely.
2. Inspect every mapped HTML screen completely.
3. Inspect current routes, components, actions, database, RLS and providers.
4. Create an internal Preserve / Replace / Rebuild map.
5. Implement actual code; do not stop at a plan.
6. Use real data.
7. Use real persistence.
8. Use server-side authorization.
9. Use RLS.
10. Use private storage for private files.
11. Keep contact and secrets private.
12. Use transactions or durable recovery.
13. Add idempotency.
14. Reject stale state.
15. use real pagination and counts.
16. remove material N+1 behavior.
17. implement loading, empty, filtered-empty, error, forbidden and Setup Required states.
18. implement exact responsive transformation.
19. implement accessibility.
20. run focused tests.
21. run lint.
22. run typecheck.
23. run production build.
24. return the required report.
25. stop.

---

# 14. GLOBAL MANUAL VERIFICATION RULES

Every Verification Prompt must follow File 4 completely.

Claude must:

1. not trust the Implementation Report;
2. open the running application;
3. compare directly with the exact HTML;
4. test complete screen top-to-bottom;
5. test `390px` first;
6. test edge mobile widths;
7. test tablet;
8. test desktop;
9. test real actions;
10. inspect database writes;
11. inspect Network payloads;
12. inspect Console;
13. test wrong role;
14. test wrong owner;
15. test wrong participant;
16. test direct route;
17. test direct Server Action/API;
18. test duplicate actions;
19. test concurrency;
20. test stale state;
21. test provider states;
22. fix defects;
23. rerun focused verification;
24. rerun impacted shared regressions;
25. rerun lint;
26. rerun typecheck;
27. rerun production build;
28. return PASS, FAIL or BLOCKED;
29. stop.

---

# 15. NO BUILD-ONLY PASS

The following do not prove completion:

* build success;
* lint success;
* typecheck success;
* unit-test success;
* route rendering;
* screenshot;
* code inspection;
* skill execution;
* automated browser report;
* or Implementation Report.

A Phase may pass only after real manual browser and database verification.

---

# 16. GLOBAL PHASE IMPLEMENTATION REPORT FORMAT

Every Phase Implementation Prompt must end with this report.

```md
# PHASE IMPLEMENTATION REPORT

- Phase:
- Date:
- Project root:
- Active branch:
- Existing uncommitted changes preserved:
- Authority files read:
- Exact HTML files inspected:
- Skills discovered:
- Skills used:
- Skills unavailable:
- Registry IDs completed:
- Registry IDs remaining:
- Current routes inspected:
- Current components inspected:
- Current actions/APIs inspected:
- Current schema/migrations inspected:
- Current RLS inspected:
- Current providers inspected:
- Preserve items:
- Replace items:
- Rebuild/new items:
- Files created:
- Files changed:
- Files removed:
- Old conflicting UI removed:
- Routes completed:
- Redirects added:
- Shared components completed:
- Database migrations:
- Backfills:
- Constraints:
- Indexes:
- RLS/policy changes:
- Server Actions/APIs:
- Background jobs:
- Transactions/recovery:
- Idempotency:
- Stale-state protection:
- Pagination/count work:
- N+1/performance work:
- Provider behavior:
- Honest fallback states:
- Security/privacy work:
- Contact/private-file protection:
- Accessibility work:
- Responsive work:
- Automated tests:
- Focused browser checks:
- Database checks:
- Lint result:
- Typecheck result:
- Production build result:
- Running application URL:
- Known internal issues:
- External blockers:
- Exact next action if partial:
- Phase implementation status: IMPLEMENTED / PARTIAL / BLOCKED
```

After this report, Claude must stop.

---

# 17. GLOBAL PHASE MANUAL VERIFICATION REPORT FORMAT

Every Phase Verification Prompt must end with this report.

```md
# PHASE MANUAL VERIFICATION REPORT

- Phase:
- Verification date:
- Application URL:
- Browser:
- Authority files checked:
- Exact HTML files compared:
- Registry IDs verified:
- Registry IDs not verified:
- Guest result:
- Owner result:
- Broker result:
- Builder result:
- Staff/Admin result:
- Super Admin result:
- 320px result:
- 360px result:
- 390px result:
- 430px result:
- 768px result:
- 1024px result:
- 1280px result:
- 1366px result:
- 1440px result:
- Complete top-to-bottom design result:
- Shell/header/sidebar/footer result:
- Loading/skeleton result:
- Empty result:
- Filtered-empty result:
- Error/Retry result:
- Unauthorized result:
- Forbidden result:
- Setup Required/provider result:
- Functional actions tested:
- Forms tested:
- Database writes inspected:
- Database state result:
- Network payloads inspected:
- Console inspected:
- Direct route/action tests:
- RLS result:
- Ownership result:
- Participant scope result:
- Staff capability result:
- Contact privacy result:
- Private-file result:
- Provider secret result:
- Financial truth result:
- Pagination/count result:
- N+1/performance result:
- Idempotency result:
- Concurrency/stale-state result:
- Accessibility/keyboard result:
- Localization/theme result:
- Consent/PWA result:
- SEO/Sitemap result:
- Bugs found:
- Critical defects:
- High defects:
- Medium defects:
- Low defects:
- Fixes applied:
- Focused retest:
- Shared regression:
- Lint after fixes:
- Typecheck after fixes:
- Production build after fixes:
- External blockers:
- Remaining internal defects:
- Final phase status: PASS / FAIL / BLOCKED
```

Final status may be `PASS` only when every mandatory item passes.

---

# 18. MASTER READINESS REPORT FORMAT

The Master Start Prompt must return:

```md
# MASTER READINESS REPORT

- Project root found:
- Authority files found:
- Missing authority files:
- HTML design files discovered:
- Expected HTML design files found:
- Additional HTML files found:
- Duplicate design files found:
- Exact authority selected for duplicates:
- Total internal screen groups discovered:
- File 2 registry compared:
- Unmapped design screens:
- Missing registered screens:
- Current application routes discovered:
- Duplicate current routes:
- Current framework:
- Package manager:
- Development command:
- Test command:
- Lint command:
- Typecheck command:
- Production build command:
- Existing server URL:
- Database connection state:
- Migration state:
- RLS state:
- Provider state:
- Skills discovered:
- Repository risks:
- Old UI conflicts:
- Critical security risks:
- Phase 1 prerequisites:
- Readiness status: READY / INCOMPLETE / BLOCKED
```

---

# 19. PROMPT 0 — MASTER START AND AUTHORITY LOCK

Copy and send the prompt below once.

---

## PROMPT — MASTER START AND AUTHORITY LOCK

You are working on the existing My Gujarat Property application located at:

`C:\mgpweb`

The final approved design HTML files are located at:

`C:\mgpweb\newdesign`

This project now uses only these five authority files:

1. `00_MASTER_PROJECT_AND_DESIGN_AUTHORITY.md`
2. `01_MASTER_SCREEN_ROUTE_DESIGN_REGISTRY.md`
3. `02_COMPLETE_FUNCTIONAL_BACKEND_AND_DATA_SPEC.md`
4. `03_MASTER_MANUAL_VERIFICATION_AND_RELEASE_CHECKLIST.md`
5. `04_CLAUDE_5_PHASE_IMPLEMENTATION_AND_VERIFICATION_PROMPTS.md`

Read all five files completely from beginning to end.

Do not rely only on summaries, headings or partial file reads.

The old separate Batch Markdown files are no longer required as the active authority because their complete requirements have been consolidated into Files 1–4. They may be inspected only as historical evidence when necessary, but they must not override the five final files or the approved HTML designs.

Do not begin Phase implementation yet.

Perform the complete readiness audit below.

### A. Authority audit

1. Verify all five files exist.
2. Verify their exact filenames.
3. Verify no similarly named old file is being substituted.
4. Read all five files completely.
5. Identify all non-negotiable design, functionality, security and verification rules.

### B. HTML design audit

Scan every `.html` file inside:

`C:\mgpweb\newdesign`

For every file:

1. read it from beginning to end;
2. identify every actual product screen;
3. identify desktop references;
4. identify tablet references;
5. identify mobile references;
6. identify modals;
7. identify drawers;
8. identify bottom sheets;
9. identify full-screen overlays;
10. identify loading states;
11. identify empty states;
12. identify error states;
13. identify Setup Required states;
14. exclude presentation-only wrappers;
15. compare with File 2.

Do not skip a file because it is long.

Do not inspect only the first screen.

If additional Batch 0–3, Homepage, Search, Auth or shared-design HTML files exist, include them in the audit.

### C. Repository audit

Inspect:

* Git status;
* active branch;
* existing user changes;
* package manager;
* framework and versions;
* `package.json`;
* routing;
* layouts;
* components;
* authentication;
* Server Actions;
* API routes;
* Supabase clients;
* database schema;
* migrations;
* RLS;
* storage;
* providers;
* background jobs;
* tests;
* lint;
* typecheck;
* build;
* deployment configuration;
* PWA;
* SEO;
* and existing design systems.

Identify:

* secure compatible foundations;
* conflicting old UI;
* duplicate routes;
* duplicate domain systems;
* placeholder screens;
* dead actions;
* fake data;
* fake providers;
* first-100 data assumptions;
* N+1 risks;
* private-data risks;
* and production blockers.

### D. Project skill audit

Inspect applicable:

* `CLAUDE.md`;
* `.claude/skills/**/SKILL.md`;
* `.github/skills/**/SKILL.md`;
* testing skills;
* browser skills;
* Supabase skills;
* security skills;
* accessibility skills;
* deployment skills.

Report only skills that actually exist.

Do not claim that a missing skill was used.

### E. Server and environment audit

Determine:

* current development command;
* current running port;
* current running URL;
* database environment;
* provider modes;
* missing providers;
* development-only bypasses;
* and whether the server can remain running.

Do not stop the current server unnecessarily.

### F. No implementation yet

Do not change application code in this Master Start step.

Do not create replacement design.

Do not generate new authority documents.

Return exactly the `MASTER READINESS REPORT` format from File 5.

Set readiness to:

* `READY` only when all five files and design sources are usable;
* `INCOMPLETE` when mapping or repository information remains incomplete;
* `BLOCKED` when a required authority or design file is missing.

After the report, stop and wait for the Phase 1 Implementation Prompt.

---

# 20. PHASE 1 OVERVIEW

## Phase title

**Audit Reconciliation, Screen Mapping, Shared Foundations and Design-System Infrastructure**

## Phase purpose

Phase 1 prepares the application so all later design screens can be implemented consistently without Claude inventing UI or duplicating systems.

## Phase 1 must cover

* complete design discovery reconciliation;
* complete route and screen mapping;
* duplicate current-route audit;
* old shared-shell audit;
* final design tokens;
* public shell foundation;
* Owner shell foundation;
* Broker shell foundation;
* Builder shell foundation;
* Admin shell foundation;
* contextual mobile headers;
* mobile drawers;
* role bottom navigation;
* overlay foundation;
* modal;
* bottom sheet;
* right drawer;
* full-screen overlay;
* loading, empty, error and Setup Required states;
* responsive utilities;
* accessibility foundation;
* authentication modal/sheet foundation;
* return-intent foundation;
* role/permission guards;
* public-safe query foundation;
* RLS baseline;
* private-file foundation;
* media foundation;
* Location foundation;
* provider registry/fallback foundation;
* Notifications foundation;
* Audit foundation;
* background-job foundation;
* testing fixtures;
* and baseline build stability.

Phase 1 must not invent later feature screens.

---

# 21. PROMPT 1A — PHASE 1 IMPLEMENTATION

Copy and send only this prompt after the Master Readiness Report is READY.

---

## IMPLEMENTATION PROMPT — PHASE 1

Implement Phase 1 only:

**Audit Reconciliation, Screen Mapping, Shared Foundations and Design-System Infrastructure**

Read these files completely before changing code:

1. `00_MASTER_PROJECT_AND_DESIGN_AUTHORITY.md`
2. `01_MASTER_SCREEN_ROUTE_DESIGN_REGISTRY.md`
3. `02_COMPLETE_FUNCTIONAL_BACKEND_AND_DATA_SPEC.md`
4. `03_MASTER_MANUAL_VERIFICATION_AND_RELEASE_CHECKLIST.md`
5. `04_CLAUDE_5_PHASE_IMPLEMENTATION_AND_VERIFICATION_PROMPTS.md`

Use the Master Readiness Report as evidence, but independently inspect the repository before changing it.

Do not stop at a plan.

Implement actual shared foundations.

## A. Complete design-registry reconciliation

1. Re-scan all HTML files in `C:\mgpweb\newdesign`.
2. Compare every internal screen with File 2.
3. Identify any unregistered screen.
4. Identify any incorrect route mapping.
5. Identify desktop/mobile state pairings.
6. Identify presentation-only wrappers.
7. Identify exact screen top and bottom boundaries.
8. Resolve duplicate design files using latest approved authority.
9. Do not create a second registry file.
10. Report discrepancies in the Phase report.

## B. Current route and old UI audit

Inspect every current route and classify it as:

* preserve;
* replace;
* rebuild;
* redirect;
* remove;
* or later Phase.

Identify:

* duplicate Property/Project Detail routes;
* duplicate dashboards;
* duplicate Lead pages;
* duplicate Message systems;
* duplicate Billing;
* duplicate Support;
* old Legal pages;
* old Comparison;
* old preference storage;
* old shells;
* old headers;
* old sidebars;
* old bottom navigation;
* and placeholder Admin modules.

Do not remove later feature routes blindly.

Remove or replace only unavoidable conflicting shared presentation in this Phase.

## C. Final shared design tokens

Extract from the actual approved HTML:

* typography;
* spacing;
* radius;
* borders;
* shadows;
* surfaces;
* backgrounds;
* text hierarchy;
* action hierarchy;
* semantic statuses;
* focus states;
* disabled states;
* layout widths;
* shell dimensions;
* responsive breakpoints;
* and safe-area values.

Do not independently recolor the product.

Do not create a generic SaaS theme.

## D. Shared shells

Implement or correct the exact shared foundations for:

1. Public desktop shell
2. Public contextual mobile shell
3. Owner dashboard shell
4. Broker dashboard shell
5. Builder dashboard shell
6. Admin shell
7. Full-screen shell suppression
8. Global layer/overlay host

Implement:

* correct header presence;
* correct sidebar presence;
* correct footer control;
* role-specific navigation;
* permission-aware Admin navigation;
* mobile drawer;
* correct bottom navigation;
* correct active state;
* real badge interfaces;
* safe-area behavior;
* collapsed/expanded states;
* and shell suppression per route.

Do not fill feature pages with invented placeholder content.

## E. Shared interaction foundations

Implement or repair:

* modal;
* bottom sheet;
* desktop side drawer;
* mobile full-page transformation;
* popover/dropdown;
* confirmation;
* action menu;
* Fullscreen Overlay;
* focus trap;
* Escape;
* outside click;
* scroll lock;
* focus restoration;
* mobile keyboard handling;
* and safe-area offsets.

Temporary actions must preserve the current page in the background.

## F. Shared screen states

Implement exact shared patterns for:

* loading;
* skeleton;
* populated;
* empty;
* filtered empty;
* no results;
* validation error;
* safe server error;
* Retry;
* unauthorized;
* forbidden;
* unavailable;
* Setup Required;
* provider failure;
* offline;
* stale state;
* submitting;
* success;
* and archived/expired.

Do not show zero or empty when a query failed.

## G. Authentication foundation

Inspect and repair:

* login modal;
* registration modal;
* mobile authentication sheet;
* direct `/login` background behavior;
* protected-action auth;
* OTP;
* development OTP guard;
* production OTP safety;
* return route;
* intended action;
* selected entity;
* selected Plan;
* open-redirect protection;
* session refresh;
* logout;
* suspended account handling;
* and host/role redirect behavior.

Do not implement fake OTP success.

## H. Role and permission foundation

Implement or repair:

* Owner guard;
* Broker guard;
* Builder guard;
* team scope;
* Staff capability scope;
* Super Admin scope;
* wrong-role forbidden state;
* direct route denial;
* direct action denial;
* and permission-aware navigation.

Do not trust Client role values.

## I. Database and RLS baseline

Inspect current schema and implement only required shared corrections for:

* Profiles;
* roles;
* businesses;
* team membership;
* Staff permission;
* public-safe access;
* ownership;
* participant scope;
* private files;
* Notifications;
* Audit;
* provider registry;
* and shared preferences.

Use migrations.

Add required indexes and constraints.

Do not reset the database.

Do not create duplicate domain systems.

## J. Public-safe query foundation

Implement explicit public-safe projections.

Verify that public foundations cannot return:

* full phone;
* alternate phone;
* private email;
* private documents;
* internal moderation reason;
* Staff notes;
* provider secrets;
* or Payment data.

## K. Media and private-file foundation

Implement or repair:

* canonical media record;
* private Draft media;
* public approved media;
* private document storage;
* signed/protected access;
* MIME validation;
* owner/entity attachment authorization;
* processing status;
* orphan cleanup foundation;
* and honest storage Setup Required state.

## L. Location foundation

Implement or repair one canonical Location system for:

* State;
* District;
* Taluka;
* City;
* Village;
* Area;
* Locality;
* Society;
* aliases;
* translations;
* Missing Location;
* and textual fallback.

Do not create separate Location lists per form.

## M. Provider foundation

Implement or repair:

* provider registry;
* safe status;
* Setup Required;
* Configured/Untested;
* Active;
* Error;
* Disabled;
* Test Mode;
* safe fallback;
* write-only secrets;
* last test;
* and safe provider error classification.

Do not fake provider Active state.

## N. Notification, Audit and jobs foundations

Implement or repair canonical foundations for:

* in-app Notifications;
* typed deep links;
* read state;
* external delivery attempts;
* Audit;
* background jobs;
* retries;
* idempotency key;
* and DLQ foundation.

Do not complete later feature-specific screens yet.

## O. Development fixtures

Create or repair safe development fixtures for:

* Guest;
* two Owners;
* two Brokers;
* Broker team member where supported;
* two Builders;
* Builder team member;
* permission-scoped Staff;
* unauthorized Staff;
* Super Admin;
* empty account;
* populated account;
* provider Active;
* provider missing;
* and long/Gujarati content.

Fixtures must not become production hard-coded data.

## P. Testing and baseline

Run:

* relevant automated tests;
* auth tests;
* permission tests;
* RLS tests;
* shell tests;
* overlay tests;
* responsive focused checks;
* lint;
* typecheck;
* production build.

Keep the server running where possible.

Return exactly the global `PHASE IMPLEMENTATION REPORT`.

Phase implementation status may be `IMPLEMENTED` only when the complete Phase 1 scope is implemented.

After the report, stop.

---

# 22. PROMPT 1B — PHASE 1 MANUAL VERIFICATION

Send only after Phase 1 Implementation Report.

---

## MANUAL VERIFICATION PROMPT — PHASE 1

Do not trust the Phase 1 Implementation Report as proof.

Manually verify Phase 1 using:

* the running application;
* all five authority files;
* every HTML design source in `C:\mgpweb\newdesign`;
* actual database state;
* Browser Network;
* Browser Console;
* direct routes;
* direct actions;
* and real development fixtures.

Fix every internal defect found.

Retest after every fix.

## A. Registry and design-source verification

1. Confirm every HTML file was discovered.
2. Confirm every actual screen is represented in File 2.
3. Confirm presentation wrappers are excluded.
4. Confirm duplicate HTML authority was resolved.
5. Confirm no long file was only partially inspected.
6. Confirm screen top/bottom boundaries.
7. Confirm no unregistered screen remains.

## B. Shared shell verification

Verify Public, Owner, Broker, Builder and Admin shells at:

* `320px`;
* `360px`;
* `390px`;
* `430px`;
* `768px`;
* `1024px`;
* `1280px`;
* `1366px`;
* `1440px`.

Check:

* header;
* contextual header;
* sidebar;
* collapsed rail;
* top bar;
* mobile drawer;
* bottom navigation;
* active state;
* real badge interface;
* footer control;
* shell suppression;
* no overlap;
* no unwanted shell.

## C. Overlay verification

Test:

* modal;
* sheet;
* side drawer;
* dropdown;
* confirmation;
* Fullscreen Overlay.

Verify:

* focus;
* focus trap;
* Escape;
* outside click;
* scroll lock;
* safe-area;
* keyboard;
* focus restoration;
* background preservation.

## D. Authentication verification

Test:

* Guest login;
* registration;
* desktop modal;
* mobile sheet;
* direct `/login`;
* invalid OTP;
* expired OTP;
* resend;
* rate limit;
* development mode;
* production guard;
* logout;
* session refresh;
* return intent;
* open redirect;
* suspended user.

## E. Role and permission verification

Test:

* Owner route;
* Broker route;
* Builder route;
* unauthorized Staff;
* authorized Staff;
* Super Admin;
* wrong host;
* changed Client role;
* changed entity ID;
* direct Server Action/API.

Verify server-side denial.

## F. RLS and privacy verification

Using two users per role, verify cross-user denial.

Inspect initial Browser payload for:

* contact;
* private email;
* private documents;
* secrets;
* Staff notes;
* internal moderation data.

Verify private-file access as:

* owner;
* authorized Staff;
* unrelated user;
* Guest;
* expired URL.

## G. Provider verification

Test:

* missing;
* configured;
* successful test;
* failed test;
* write-only secret;
* Network payload;
* Audit;
* fallback.

Do not accept fake green state.

## H. Shared-state verification

Force:

* loading;
* empty;
* filtered empty;
* query failure;
* Retry;
* unauthorized;
* forbidden;
* provider missing;
* stale state;
* offline state where implemented.

Verify errors do not become zero/empty.

## I. Accessibility verification

Use keyboard only.

Verify:

* focus;
* headings;
* labels;
* dialog semantics;
* drawer semantics;
* visible focus;
* reduced motion foundation;
* text scaling foundation;
* Gujarati rendering.

## J. Old UI audit

Open old and duplicate routes directly.

Verify:

* no old shared header;
* no old conflicting sidebar;
* no duplicate bottom navigation;
* no old route with conflicting screen;
* no hidden conflicting markup.

## K. Build verification

After fixes:

* rerun focused tests;
* rerun RLS tests;
* rerun lint;
* rerun typecheck;
* rerun production build;
* recheck the running application.

Return exactly the global `PHASE MANUAL VERIFICATION REPORT`.

Phase 1 may be PASS only when:

* registry is complete;
* shared foundations pass;
* no critical shared design conflict remains;
* auth/role/RLS/private-file foundations pass;
* and there is no internal blocker.

After the report, stop.

---

# 23. PHASE 2 OVERVIEW

## Phase title

**Public Experience, Authentication Integration, Search, Posting Wizards, Detail Pages and Public Profiles**

## Locked internal order

1. Discovered Batch 0–3 public/auth/search foundations
2. Batch 5 Posting Wizards and Unit Inventory
3. Batch 4 Detail Pages and Public Profiles
4. Public cross-module integration
5. Phase verification

This preserves the original dependency order where posting records and inventory are completed before their final public Detail views.

---

# 24. PHASE 2 COMPLETE SCREEN INVENTORY

Phase 2 includes every discovered Homepage/Auth/Search screen plus:

## Batch 5

* B5-S01 Post Property Wizard
* B5-S02 Post Project Wizard
* B5-S03 Post Requirement Wizard
* B5-S04 Builder Unit Inventory

## Batch 4

* B4-S01 Property Detail
* B4-S01-U Unavailable Property
* B4-S02 Project Detail
* B4-S03 Requirement Detail
* B4-S04 Broker Public Profile
* B4-S05 Builder Microsite
* B4-S06 Owner Public-Safe Profile
* B4-S07 Claim Profile
* B4-S08 Report Content
* B4-S09 Fullscreen Gallery
* B4-S10 Comparison

No item in this inventory may be skipped.

---

# 25. PROMPT 2A — PHASE 2 IMPLEMENTATION

---

## IMPLEMENTATION PROMPT — PHASE 2

Implement Phase 2 only:

**Public Experience, Authentication Integration, Search, Posting Wizards, Detail Pages and Public Profiles**

Read all five authority files completely.

Inspect the complete matching HTML design files.

At minimum inspect:

* every discovered Batch 0–3/Homepage/Auth/Search HTML;
* `Batch 5 - Posting Wizards (Standalone).html`;
* `Batch 4 - Detail Pages (Standalone).html`.

Do not implement from memory.

Do not stop at a plan.

## A. Homepage, public shell and Search

Implement every discovered approved Homepage, public navigation, authentication and Search design.

Include applicable:

* Homepage;
* header;
* City selection exactly where shown;
* hero;
* primary search;
* autocomplete;
* grouped suggestions;
* Property/Project results;
* filters;
* mobile filters;
* sorting;
* pagination/load more;
* no results;
* loading;
* error;
* Saved action;
* Comparison action;
* auth return;
* canonical City/Locality routes;
* and responsive behavior.

Do not invent a Homepage if no approved design exists.

Do not retain an old public screen that conflicts with the approved HTML.

Search must use canonical real data and must not search only loaded rows.

## B. B5-S01 — Post Property Wizard

Implement the exact nine-step Owner/Broker Property Wizard.

Mandatory:

* exact shell;
* exact step labels/order;
* Step X of 9;
* progress;
* Back;
* Save Draft;
* Continue;
* sticky footer;
* real partial Draft;
* debounced autosave;
* save state;
* autosave race protection;
* exact resume step;
* multiple Drafts;
* Draft Resume card;
* Start New;
* purpose/category/type-aware fields;
* price;
* area;
* validation summary;
* canonical Location;
* Map/fallback behavior;
* amenities;
* contact preference;
* verified contact;
* preferred contact time;
* real media upload;
* minimum photo rule;
* progress;
* retry;
* reorder;
* Cover;
* crop;
* private Preview;
* Plan gate;
* idempotent Submit;
* moderation handoff;
* Submitted state;
* edit-after-approval/reapproval.

Owner and Broker access must be server-enforced.

Preview must use the Batch 4 Property Detail presentation.

## C. B5-S02 — Post Project Wizard

Implement the exact ten-step Builder Project Wizard.

Mandatory:

* exact shared Wizard shell;
* Step X of 10;
* Builder identity;
* Project type;
* RERA syntax;
* registered/verified distinction;
* pending RERA;
* publication gate;
* Admin exception foundation;
* canonical Location;
* landmarks;
* Tower;
* Wing;
* Floor;
* Units;
* deterministic Unit generation;
* amenities;
* launch;
* possession;
* construction milestones;
* gallery media;
* Brochure PDF;
* Floor Plans;
* Video;
* 360 Tour;
* contact;
* Preview;
* Plan gate;
* idempotent Submit;
* Pending RERA Check;
* revision/reapproval.

Preview must use Batch 4 Project Detail presentation.

## D. B5-S03 — Post Requirement Wizard

Implement the exact seven-step Requirement Wizard.

Mandatory:

* exact shell;
* Draft;
* autosave;
* resume;
* purpose/category;
* Property type;
* budget;
* BHK;
* area;
* amenities;
* timeline;
* contact preference;
* multi-location;
* maximum approved Location count;
* duplicate Location prevention;
* Missing Location request;
* Preview;
* visibility;
* Plan/quota;
* spam/duplicate handling;
* Submit;
* moderation handoff;
* final state.

## E. B5-S04 — Unit Inventory

Implement complete Builder Unit Inventory.

Mandatory:

* Project context;
* desktop inventory table;
* Tower/Wing tabs;
* sticky header/columns where designed;
* filters;
* pagination/virtualization where needed;
* selection;
* bulk bar;
* mobile Tower/Floor accordions;
* mobile Unit cards;
* Unit Edit modal;
* Unit Edit sheet;
* available/booked/sold states;
* valid transitions;
* stale protection;
* transactional bulk action;
* deterministic generation;
* ownership/team scope;
* exact counts.

## F. B4-S01 — Property Detail

Implement complete Property Detail.

Mandatory:

* exact public shell;
* canonical breadcrumb;
* real gallery;
* real image count;
* price;
* actual verification;
* title;
* location;
* published date;
* facts;
* description;
* mobile Read More;
* amenities;
* Location;
* provider/fallback state;
* similar Properties;
* public-safe poster card;
* masked contact;
* explicit Reveal;
* no initial full phone;
* Enquire;
* self-action prevention;
* duplicate enquiry prevention;
* Save;
* Share;
* Report;
* mobile Carousel;
* sticky CTA;
* SEO;
* structured data.

## G. B4-S01-U — Unavailable Property

Implement the same canonical route with an unavailable tombstone.

Include:

* safe reason;
* safe unavailable date;
* no active contact CTA;
* similar alternatives;
* Browse All;
* correct SEO behavior.

Do not return an incorrect generic 404 when the approved tombstone applies.

## H. B4-S02 — Project Detail

Implement:

* Project hero;
* Builder identity;
* real RERA registered/verified distinction;
* price;
* possession;
* tabs;
* available Units;
* Floor Plans;
* amenities;
* Location;
* gallery;
* Video;
* 360 Tour;
* actual milestones;
* brochure PDF;
* similar Projects;
* enquiry configuration;
* Site Visit entry where defined;
* Builder mini card;
* masked contact;
* mobile sticky actions;
* SEO.

Do not show synthetic Project progress as real.

## I. B4-S03 — Requirement Detail

Implement:

* Guest teaser;
* eligible full view;
* authenticated unauthorized state;
* display ID;
* status;
* title;
* date;
* budget;
* locations;
* timeline;
* description;
* masked requester;
* Proposal entry;
* duplicate protection;
* Noindex;
* Sitemap exclusion.

## J. B4-S04 — Broker Public Profile

Implement:

* stable slug;
* Broker identity;
* business name;
* years active;
* member since;
* verification;
* service areas;
* exact Listing count;
* paginated public Listings;
* Reviews Coming Soon only;
* contact privacy;
* Contact Broker;
* Report overflow;
* mobile;
* SEO.

## K. B4-S05 — Builder Microsite

Implement:

* stable slug;
* company identity;
* RERA;
* founded year;
* headquarters;
* delivered count;
* exact Active/Completed counts;
* Active Projects;
* Completed Projects;
* About;
* contact privacy;
* Contact Builder;
* claimable state;
* mobile;
* SEO.

## L. B4-S06 — Owner Public-Safe Profile

Implement:

* stable safe route;
* minimal approved layout;
* safe name;
* Owner label;
* exact active count;
* member since;
* allowed public Listings;
* privacy gate;
* no direct phone;
* no email;
* no exact private address;
* safe private-profile behavior;
* SEO/privacy behavior.

## M. B4-S07 — Claim Profile

Implement:

* eligible CTA;
* auth return;
* desktop modal;
* mobile sheet;
* relationship;
* real private proof upload;
* PDF/JPG validation;
* maximum approved size;
* duplicate pending prevention;
* queue;
* Notification;
* Audit;
* concurrent Claim safety;
* final ownership assignment foundation.

## N. B4-S08 — Report Content

Implement one canonical Report overlay.

Include:

* correct target noun;
* exact reasons;
* Details;
* Guest policy;
* rate limit;
* duplicate pending protection;
* safe evidence;
* queue;
* success;
* mobile sheet;
* desktop modal.

## O. B4-S09 — Fullscreen Gallery

Implement:

* Property and Project media;
* selected initial media;
* order;
* count;
* next/previous;
* keyboard;
* swipe;
* thumbnails;
* caption;
* media error;
* full-screen shell;
* close/Back;
* focus restoration;
* authorization.

## P. B4-S10 — Comparison

Implement one canonical Comparison system.

Include:

* persistent tray;
* eligible Properties;
* add/remove;
* clear;
* maximum approved capacity;
* full Comparison;
* image;
* price;
* facts;
* amenities;
* Location;
* unavailable item;
* mobile horizontal behavior;
* pinned label column;
* persistence;
* Noindex.

Do not create a second Batch 17 comparison system later.

## Q. Cross-module integration

Verify implementation connections:

* Search → Detail;
* Wizard → Preview;
* Wizard → moderation;
* published record → Search;
* Detail → Save;
* Detail → Reveal;
* Detail → Enquiry;
* Requirement → Proposal entry;
* Project → Unit Inventory;
* Profile → Claim;
* entity → Report;
* entity → Gallery;
* entity → Compare;
* auth → return intent.

## R. Security and performance

Implement:

* public-safe queries;
* private Drafts;
* private media;
* explicit contact projection;
* RLS;
* idempotency;
* pagination;
* aggregate counts;
* N+1 corrections;
* provider fallback;
* SEO cache invalidation;
* and structured data.

## S. Tests

Run:

* Wizard tests;
* autosave race tests;
* media tests;
* Unit idempotency;
* public privacy;
* contact payload tests;
* auth return tests;
* Proposal-entry tests;
* Claim tests;
* Report rate-limit tests;
* Gallery authorization;
* Comparison persistence;
* SEO tests;
* lint;
* typecheck;
* production build.

Return exactly the global `PHASE IMPLEMENTATION REPORT`.

After the report, stop.

---

# 26. PROMPT 2B — PHASE 2 MANUAL VERIFICATION

---

## MANUAL VERIFICATION PROMPT — PHASE 2

Do not trust the Phase 2 Implementation Report.

Open the running application and manually verify every Phase 2 Registry ID.

Compare every screen directly with its exact HTML design from top to bottom.

Fix every internal defect and retest.

## A. Homepage/Auth/Search

Verify every discovered Batch 0–3/Homepage/Auth/Search target:

* desktop;
* tablet;
* mobile;
* search suggestions;
* filters;
* no results;
* pagination;
* City/Location behavior;
* auth return;
* Save;
* Compare;
* direct URL;
* SEO.

## B. Property Wizard

Run the complete nine-step flow as Owner and Broker.

Test:

* exact labels;
* progress;
* Draft;
* refresh;
* resume;
* autosave race;
* save failure;
* multiple Drafts;
* invalid fields;
* Location;
* provider missing;
* upload failure;
* invalid file;
* photo minimum;
* reorder;
* Cover;
* crop;
* Preview;
* Plan limit;
* double Submit;
* moderation state;
* approved edit;
* reapproval;
* cross-user Draft denial.

## C. Project Wizard

Run all ten steps.

Test:

* Builder identity;
* invalid RERA;
* registered vs verified;
* pending RERA;
* Unit generation twice;
* structure change;
* brochure;
* Floor Plan;
* invalid Video/Tour URL;
* provider missing;
* Preview;
* quota;
* double Submit;
* reapproval;
* wrong-role denial.

## D. Requirement Wizard

Run all seven steps.

Test:

* Draft;
* resume;
* multi-location;
* limit;
* duplicate Location;
* Missing Location;
* budget;
* specifications;
* timeline;
* Preview;
* privacy;
* duplicate/spam;
* Submit;
* wrong role.

## E. Unit Inventory

Verify:

* desktop table;
* mobile cards;
* Tower/Floor;
* Unit Edit;
* available/booked/sold;
* invalid transition;
* concurrent edit;
* bulk preview/action;
* stale Unit;
* exact counts;
* Project ownership;
* team scope.

## F. Property Detail

Verify:

* entire screen;
* gallery;
* image count;
* facts;
* description;
* amenities;
* Location;
* similar cards;
* seller card;
* masked phone;
* initial payload;
* Reveal;
* repeat Reveal;
* quota;
* self-action;
* enquiry;
* duplicate enquiry;
* Save;
* Share;
* Report;
* mobile Carousel;
* sticky CTA;
* unavailable tombstone;
* SEO.

## G. Project Detail

Verify:

* Project identity;
* tabs;
* RERA truth;
* Units;
* Floor Plans;
* milestones;
* Video;
* Tour;
* Brochure;
* enquiry configuration;
* Site Visit entry;
* Builder card;
* contact privacy;
* mobile;
* SEO.

## H. Requirement Detail

Verify:

* Guest teaser;
* Owner eligibility;
* Broker eligibility;
* Builder eligibility;
* unauthorized authenticated state;
* requester privacy;
* Proposal entry;
* duplicate Proposal;
* Noindex;
* Sitemap exclusion.

## I. Profiles

Verify Broker, Builder and Owner:

* exact design;
* exact counts;
* paginated content;
* safe public fields;
* contact privacy;
* Claim CTA eligibility;
* private Profile behavior;
* SEO.

## J. Claim and Report

Verify:

* modal/sheet;
* background preservation;
* valid upload;
* invalid upload;
* private access;
* duplicate Claim;
* competing Claim;
* Report categories;
* Guest limit;
* duplicate Report;
* queue;
* Audit.

## K. Gallery and Comparison

Verify:

* selected image;
* keyboard;
* swipe;
* media authorization;
* close;
* focus;
* add 1–4;
* fifth-item behavior;
* remove;
* clear;
* refresh;
* unavailable record;
* Search/Saved/Detail integration;
* mobile table.

## L. Responsive widths

Verify every major screen at:

* `320px`;
* `360px`;
* `390px`;
* `430px`;
* `768px`;
* `1024px`;
* `1280px`;
* `1366px`;
* `1440px`.

Check:

* no page horizontal scroll;
* no clipping;
* sticky overlap;
* bottom navigation;
* mobile keyboard;
* modal/sheet;
* safe area.

## M. Privacy and RLS

Inspect initial HTML, RSC, API responses and Client state.

Verify no unauthorized:

* full phone;
* email;
* private documents;
* Draft data;
* private media;
* Claim proof;
* or internal moderation reason.

Test direct route/action access.

## N. Performance and persistence

Verify:

* pagination;
* aggregate counts;
* no first-100 totals;
* query performance;
* no material N+1;
* refresh persistence;
* correct database rows;
* no duplicate effects.

After fixes:

* rerun focused tests;
* rerun Phase 1 shared regression;
* rerun lint;
* rerun typecheck;
* rerun production build.

Return exactly the global `PHASE MANUAL VERIFICATION REPORT`.

Phase 2 may pass only when every listed Registry ID is verified and no internal defect remains.

After the report, stop.

---

# 27. PHASE 3 OVERVIEW

## Phase title

**Owner, Broker and Builder Dashboards**

## Locked internal order

1. Batch 6 Owner Dashboard
2. Batch 7 Broker Dashboard
3. Batch 8 Builder Dashboard
4. Shared role-shell regression
5. Phase verification

---

# 28. PHASE 3 COMPLETE SCREEN INVENTORY

## Batch 6 — Owner

1. B6-S01 Overview
2. B6-S02 My Properties
3. B6-S03 My Requirements
4. B6-S04 Leads List
5. B6-S05 Quick Lead Detail
6. B6-S06 Message List
7. B6-S07 Message Thread
8. B6-S08 Site Visits List
9. B6-S09 Site Visit Detail/Reject
10. B6-S10 Saved Properties
11. B6-S11 Saved Searches
12. B6-S12 Recently Viewed
13. B6-S13 Analytics
14. B6-S14 Subscription
15. B6-S15 Invoice List
16. B6-S16 Invoice Detail
17. B6-S17 Pricing/Upgrade
18. B6-S18 Verification
19. B6-S19 Profile Edit
20. B6-S20 Notifications
21. B6-S21 Support
22. B6-S22 Settings
23. B6-S23 Role Change
24. B6-S24 Export and Deletion

## Batch 7 — Broker

1. B7-S01 Overview
2. B7-S02 My Properties
3. B7-S03 Wizard Entry/Draft Resume
4. B7-S04 My Requirements
5. B7-S05 Requirement Feed
6. B7-S06 Proposals List
7. B7-S07 Proposal Detail
8. B7-S08 Send Proposal
9. B7-S09 CRM List
10. B7-S10 CRM Kanban
11. B7-S11 Quick Lead Detail
12. B7-S12 Messages
13. B7-S13 Site Visits
14. B7-S14 Saved
15. B7-S15 Analytics
16. B7-S16 Billing
17. B7-S17 Invoices
18. B7-S18 Verification
19. B7-S19 Profile
20. B7-S20 Notifications
21. B7-S21 Support
22. B7-S22 Settings

## Batch 8 — Builder

1. B8-S01 Overview
2. B8-S02 Projects
3. B8-S03 Project Entry/Reapproval
4. B8-S04 Unit Inventory
5. B8-S05 Unit Edit
6. B8-S06 Project Leads
7. B8-S07 Lead Detail
8. B8-S08 Requirement Feed
9. B8-S09 Proposals
10. B8-S10 Messages
11. B8-S11 Site Visits
12. B8-S12 Team
13. B8-S13 Invite
14. B8-S14 Permissions
15. B8-S15 Ad Campaign List
16. B8-S16 Ad Create
17. B8-S17 Ad Detail
18. B8-S18 Ad Analytics
19. B8-S19 Project Analytics
20. B8-S20 Billing/Wallet
21. B8-S21 Invoices
22. B8-S22 RERA/Verification
23. B8-S23 Company Microsite
24. B8-S24 Construction Progress
25. B8-S25 Notifications
26. B8-S26 Support
27. B8-S27 Settings

---

# 29. PROMPT 3A — PHASE 3 IMPLEMENTATION

---

## IMPLEMENTATION PROMPT — PHASE 3

Implement Phase 3 only:

**Owner, Broker and Builder Dashboards**

Read all five authority files completely.

Inspect these HTML files completely:

* `Batch 6 - Owner Dashboard (Standalone).html`
* `Batch 7 - Broker Dashboard (Standalone).html`
* `Batch 8 - Builder Dashboard (Standalone).html`

Do not use a generic dashboard template.

Do not stop after Overview.

Implement all 73 registered screen groups in the Phase 3 inventory.

## A. Owner dashboard — B6-S01 through B6-S24

Implement the complete Owner dashboard.

### Overview

Implement:

* exact shell;
* correct desktop sidebar;
* mobile root;
* mobile drawer;
* mobile bottom navigation;
* greeting;
* real counts;
* recent Leads;
* quick actions;
* Plan usage;
* skeleton;
* empty;
* partial-error states.

### My Properties

Implement:

* status tabs;
* real counts;
* Property rows/cards;
* Draft Resume;
* View;
* Edit;
* Pause;
* Resume;
* Delete/archive;
* confirmation;
* mobile overflow;
* empty;
* pagination.

### My Requirements

Implement:

* status;
* proposal count;
* Draft;
* View;
* Edit;
* Close;
* Reopen;
* View Proposals;
* mobile;
* pagination.

### Leads and quick detail

Implement:

* desktop table;
* mobile cards;
* search;
* filters;
* pagination;
* real stage;
* Property context;
* quick 480px drawer;
* mobile full page;
* masked/revealed contact;
* notes;
* follow-up;
* timeline;
* Message;
* Site Visit;
* Open Full Detail.

### Messages

Implement:

* Thread list;
* search;
* unread;
* archived;
* latest Message;
* desktop split view;
* mobile Thread page;
* pagination;
* composer;
* send;
* retry;
* attachments;
* participant privacy.

### Site Visits

Implement:

* Upcoming;
* Past;
* calendar where designed;
* statuses;
* Detail;
* private address;
* Directions/fallback;
* Accept;
* Reschedule;
* Reject;
* reject reason;
* mobile.

### Saved

Implement:

* Saved Properties;
* Saved Searches;
* Recently Viewed;
* alerts;
* match count;
* unavailable item;
* remove;
* clear;
* pagination.

### Analytics

Implement:

* real data;
* date range;
* Lead source;
* insufficient data;
* Setup Required;
* no fake chart.

### Billing

Implement Owner:

* Subscription;
* Trial;
* usage;
* Invoices;
* Invoice Detail;
* Pricing/Upgrade;
* GST state;
* PDF/Print;
* provider fallback.

Use canonical Batch 10 foundations rather than duplicate financial logic.

### Verification/Profile/Notifications/Support/Settings

Implement:

* verification upload;
* status;
* rejection;
* resubmit;
* Profile Edit;
* avatar/crop;
* verified mobile handling;
* Notifications;
* deep links;
* Support/Tickets;
* Settings;
* preferences;
* privacy;
* Theme;
* language;
* Role Change;
* Data Export;
* deletion request;
* OTP;
* grace period;
* cancel.

## B. Broker dashboard — B7-S01 through B7-S22

Implement complete Broker functionality.

### Overview

Use Broker-specific real data:

* Feed matches;
* Properties;
* Requirements;
* Proposals;
* CRM;
* Featured usage;
* Plan usage;
* recent activity;
* mobile shell.

Do not rename Owner metrics and call them Broker metrics.

### Properties and Requirements

Implement:

* Broker Properties;
* Featured state;
* promotion expiry;
* Wizard entry;
* Draft Resume;
* My Requirements;
* client indicator;
* status;
* actions;
* pagination.

### Requirement Feed

Implement:

* canonical eligibility;
* service-area scope;
* location;
* budget;
* type;
* matching;
* filters;
* alerts;
* Hide;
* persisted per Broker;
* open Detail;
* Proposal;
* verification/Plan gates;
* no fake match count.

### Proposals

Implement:

* Sent list;
* exact status/timestamps;
* filters;
* pagination;
* Detail;
* Requirement context;
* proposed Listing;
* embedded Thread;
* Send Proposal modal/sheet;
* eligible Listing selector;
* duplicate prevention;
* quota;
* withdrawal where allowed.

### CRM

Implement:

* list;
* mobile cards;
* filters;
* search;
* pagination;
* stages;
* assignee;
* follow-up;
* export where designed;
* Kanban;
* drag/drop;
* touch fallback;
* stale movement rejection;
* timeline;
* quick detail;
* full Lead connection.

### Messages, Visits and Saved

Use canonical systems with Broker shell.

Do not create duplicate records.

### Analytics

Implement:

* conversion funnel;
* Listing ranking;
* real events;
* insufficient data;
* Setup Required.

### Billing and verification

Implement:

* Broker Plan;
* Listing usage;
* Proposal usage;
* Featured slots;
* CRM entitlement;
* Feed entitlement;
* Invoices;
* Invoice Detail;
* Broker verification;
* private proof;
* approval truth.

### Profile, Notifications, Support and Settings

Implement:

* business name;
* service areas;
* Add City;
* structured Location;
* experience;
* public About;
* public Profile integration;
* Notifications;
* Feed/Proposal events;
* Support;
* Settings;
* Feed alert modes;
* provider honesty.

## C. Builder dashboard — B8-S01 through B8-S27

Implement complete Builder functionality.

### Overview and Projects

Implement:

* Builder metrics;
* Projects;
* Units;
* Leads;
* Visits;
* team;
* campaigns;
* Project list;
* status;
* actions;
* Draft Resume;
* edit;
* reapproval warning;
* public approved version preservation.

### Units

Use the canonical Batch 5 Unit system.

Implement Builder dashboard integration, mobile and exact permissions.

### Leads and Requirement Feed

Implement:

* Project Leads;
* Project/configuration interest;
* stage;
* Agent assignment;
* filters;
* pagination;
* Lead quick/full Detail;
* matching Requirements;
* real explainable matching;
* Proposal.

### Proposals, Messages and Visits

Use canonical shared systems.

Preserve Builder Project/Unit context.

### Team

Implement:

* Agent list;
* status;
* seat usage;
* invite;
* provider missing state;
* duplicate prevention;
* invite expiry;
* permission editor;
* Project scope;
* Lead scope;
* Visit scope;
* backend enforcement;
* activity/Audit.

### Ads

Implement Builder-facing:

* Campaign list;
* Draft;
* creative variants;
* City/locality targeting;
* schedule;
* pricing/wallet;
* Submit;
* moderation state;
* active;
* paused;
* rejected;
* expired;
* Detail;
* performance;
* insufficient data;
* Setup Required.

Admin review is completed in Phase 4.

### Analytics

Implement:

* Project analytics;
* Ad analytics;
* actual events;
* insufficient data;
* provider missing;
* consent behavior.

### Billing and wallet

Implement:

* Subscription;
* Project limits;
* team limits;
* wallet;
* immutable wallet ledger;
* recharge entry;
* Invoices;
* Invoice Detail;
* trusted financial state.

### RERA, Company and Progress

Implement:

* RERA proof;
* company verification;
* status;
* rejection;
* resubmit;
* Microsite editor;
* About;
* founded year;
* headquarters;
* service areas;
* public Preview;
* construction milestones;
* dates;
* status;
* evidence;
* update history.

### Notifications, Support and Settings

Implement the complete Builder versions using canonical systems.

## D. Shared role-shell integration

Verify implementation consistency for:

* role-aware Leads;
* Messages;
* Site Visits;
* Billing;
* verification;
* Notifications;
* Support;
* Settings;
* mobile bottom navigation;
* mobile drawers;
* role access;
* team scope.

## E. Counts, pagination and performance

All dashboard counts must be authoritative.

Implement:

* dedicated counts;
* pagination;
* stable ordering;
* bounded previews;
* View All;
* no first-100 totals;
* no material N+1;
* independent failure states.

## F. Security

Enforce:

* role;
* ownership;
* business scope;
* team assignment;
* participant scope;
* private Invoices;
* private documents;
* private Threads;
* protected exports;
* provider honesty.

## G. Tests

Run:

* each role Overview;
* wrong-role routes;
* cross-user routes;
* team permission tests;
* Lead/Message/Visit integration;
* Draft Resume;
* CRM stages;
* Kanban;
* proposal duplicate;
* Unit ownership;
* Ads flow foundation;
* Billing access;
* Notification deep links;
* Export/deletion foundations;
* responsive checks;
* lint;
* typecheck;
* production build.

Return exactly the global `PHASE IMPLEMENTATION REPORT`.

After the report, stop.

---

# 30. PROMPT 3B — PHASE 3 MANUAL VERIFICATION

---

## MANUAL VERIFICATION PROMPT — PHASE 3

Do not trust the Phase 3 Implementation Report.

Manually verify every Owner, Broker and Builder Registry ID.

Do not sample only Overview pages.

Fix every internal defect and retest.

## A. Owner complete flow

Run:

Owner login
→ Overview
→ Properties
→ Draft Resume
→ Property actions
→ Requirements
→ Leads
→ quick Lead drawer
→ full Lead entry
→ Message list
→ Thread
→ Site Visit
→ Saved Property
→ Saved Search
→ Recently Viewed
→ Analytics
→ Subscription
→ Invoice
→ Invoice Detail
→ Upgrade
→ Verification
→ Profile Edit
→ Notifications
→ Support
→ Settings
→ Role Change
→ Export request
→ deletion request
→ cancel deletion.

Verify real database state and refresh persistence.

## B. Broker complete flow

Run:

Broker login
→ Overview
→ Properties
→ Wizard entry
→ Draft Resume
→ Requirements
→ Requirement Feed
→ filter
→ Hide
→ open Requirement
→ Send Proposal
→ attempt duplicate
→ Proposal list
→ Proposal Detail
→ Message
→ CRM list
→ follow-up
→ stage change
→ Kanban
→ refresh
→ quick Lead Detail
→ Visit
→ Saved
→ Analytics
→ Billing
→ Invoice
→ Verification
→ Profile service-area update
→ return to Feed
→ verify changed scope
→ Notifications
→ Support
→ Settings/Feed Alerts.

## C. Builder complete flow

Run:

Builder login
→ Overview
→ Projects
→ Project Draft
→ Project edit/reapproval
→ Units
→ Unit Edit
→ Leads
→ assign Agent
→ Requirement Feed
→ Proposal
→ Message
→ Visit
→ Team
→ invite
→ permissions
→ direct permission test
→ Ads list
→ Ad Create
→ Ad Detail
→ Ad Analytics
→ Project Analytics
→ Billing/wallet
→ Invoice
→ RERA
→ Company Microsite
→ construction progress
→ Notifications
→ Support
→ Settings.

## D. Role-shell verification

At every required width, verify:

* correct sidebar;
* correct drawer;
* correct bottom navigation;
* correct Post action;
* correct active state;
* no Admin bottom navigation;
* no wrong-role module;
* no overlap;
* no clipped content.

## E. Counts and pagination

Create data beyond first page.

Verify:

* exact tab counts;
* exact dashboard counts;
* pagination;
* filters;
* stable ordering;
* mobile load behavior;
* no duplicate/skipped rows;
* no count from bounded preview.

## F. Role and ownership security

Using two users of each role:

* change every dynamic ID;
* open another user’s Property;
* Project;
* Unit;
* Lead;
* Thread;
* Visit;
* Invoice;
* verification;
* Ticket;
* export;
* Profile edit.

Verify direct route and direct action denial.

## G. Team permissions

Test:

* active Agent;
* invited Agent;
* suspended Agent;
* Project-scoped Agent;
* Lead-scoped Agent;
* permission removed;
* seat limit;
* unauthorized direct URL/action.

Backend access must change immediately or according to documented safe cache invalidation.

## H. CRM and shared operations

Test:

* list;
* Kanban;
* mobile fallback;
* stale stage;
* duplicate Lead;
* Note;
* Reminder;
* Message;
* Visit;
* assignee;
* timeline.

## I. Billing entry points

Verify all dashboard Billing screens use canonical real records.

Do not accept fake amount or disconnected invoice data.

## J. Responsive and accessibility

Verify every representative screen at:

* `320px`;
* `360px`;
* `390px`;
* `430px`;
* `768px`;
* `1024px`;
* `1280px`;
* `1366px`;
* `1440px`.

Test:

* tables to cards;
* Kanban;
* Units;
* drawers;
* modals;
* sheets;
* Message keyboard;
* sticky actions;
* bottom nav;
* focus;
* text wrapping;
* Gujarati.

## K. Performance

Audit:

* Owner Properties;
* Leads;
* Threads;
* Broker Feed;
* CRM;
* Builder Projects;
* Units;
* Team;
* Ads;
* Notifications.

Verify pagination, aggregate counts and no material N+1.

After fixes:

* rerun Phase 1 and Phase 2 shared regressions;
* rerun role tests;
* rerun lint;
* rerun typecheck;
* rerun production build.

Return exactly the global `PHASE MANUAL VERIFICATION REPORT`.

Phase 3 may pass only when every Owner, Broker and Builder Registry ID passes.

After the report, stop.

---

# 31. PHASE 4 OVERVIEW

## Phase title

**Shared Lead Operations, Billing, Payments, Admin Management, Moderation, Ads, Notifications and Platform System Controls**

## Locked internal order

1. Batch 9 Shared Detail Views
2. Batch 10 Billing and Payments
3. Batch 11 Admin Management and Moderation
4. Batch 12 Admin Billing
5. Batch 13 Ads, Notifications and System
6. Cross-module regression

---

# 32. PHASE 4 COMPLETE SCREEN INVENTORY

## Batch 9 — Shared Operations

1. B9-S01 Lead Full Detail
2. B9-S02 Lead Notes
3. B9-S03 Follow-Up
4. B9-S04 Close/Lost Reason
5. B9-S05 Duplicate Lead
6. B9-S06 Contact Reveal
7. B9-S07 Proposal Full Detail
8. B9-S08 Message List
9. B9-S09 Message Thread
10. B9-S10 Report Thread
11. B9-S11 Visit Request
12. B9-S12 Visit Response
13. B9-S13 Visit Reminder
14. B9-S14 Feedback
15. B9-S15 Dispute

## Batch 10 — Billing

1. B10-S01 Public Pricing
2. B10-S02 Subscription Overview
3. B10-S03 Trial Banner
4. B10-S04 Change Plan
5. B10-S05 Checkout
6. B10-S06 Provider Checkout
7. B10-S07 Payment Processing
8. B10-S08 Verified Success
9. B10-S09 Failure
10. B10-S10 Pending/Duplicate Payment
11. B10-S11 Invoice List
12. B10-S12 Invoice Detail
13. B10-S13 Refund
14. B10-S14 GST/Billing
15. B10-S15 Manual Activation State

## Batch 11 — Admin Management

1. B11-S01 Admin Overview
2. B11-S02 Forbidden Module
3. B11-S03 Users
4. B11-S04 User Detail
5. B11-S05 Suspend/Ban
6. B11-S06 Role Change Queue
7. B11-S07 Role Change Detail
8. B11-S08 Staff List
9. B11-S09 Staff Invite
10. B11-S10 Staff Permissions
11. B11-S11 Staff Activity
12. B11-S12 Property Queue
13. B11-S13 Property Review
14. B11-S14 Project Review
15. B11-S15 Requirement Review
16. B11-S16 Missing Location
17. B11-S17 Duplicate Listing
18. B11-S18 Claim Review
19. B11-S19 Verification Queue
20. B11-S20 Verification Detail
21. B11-S21 Support Queue
22. B11-S22 Support Detail

## Batch 12 — Admin Billing

1. B12-S01 Subscriptions
2. B12-S02 Subscription Detail
3. B12-S03 Payments
4. B12-S04 Payment Detail
5. B12-S05 Webhooks
6. B12-S06 Refund Queue
7. B12-S07 Refund Detail
8. B12-S08 Credit Notes
9. B12-S09 Manual Activation
10. B12-S10 Admin Invoices/Export
11. B12-S11 Invoice Correction
12. B12-S12 Plans
13. B12-S13 Plan Editor
14. B12-S14 Coupons
15. B12-S15 Coupon Editor
16. B12-S16 Trial Campaigns
17. B12-S17 Trial Grant/Revoke

## Batch 13 — Platform Controls

1. B13-S01 Ads Queue
2. B13-S02 Ad Review
3. B13-S03 Ad Management
4. B13-S04 Ad Fraud
5. B13-S05 Notification Templates
6. B13-S06 Template Editor
7. B13-S07 Delivery Logs
8. B13-S08 Preference Defaults
9. B13-S09 Provider Dashboard
10. B13-S10 Provider Detail/Test
11. B13-S11 Feature Flags
12. B13-S12 Flag Confirmation
13. B13-S13 Maintenance Control
14. B13-S14 Public Maintenance
15. B13-S15 System Health
16. B13-S16 DLQ

---

# 33. PROMPT 4A — PHASE 4 IMPLEMENTATION

---

## IMPLEMENTATION PROMPT — PHASE 4

Implement Phase 4 only:

**Shared Lead Operations, Billing, Payments, Admin Management, Moderation, Ads, Notifications and Platform System Controls**

Read all five authority files completely.

Inspect these exact HTML files completely:

* `Batch 9 - Shared Detail Views (Standalone) (1).html`
* `Batch 10 - Billing & Payments (Standalone).html`
* `Batch 11 - Admin Management (Standalone).html`
* `Batch 12 - Admin Billing (Standalone).html`
* `Batch 13 - Admin Ads Notifications System (Standalone).html`

Implement every Phase 4 Registry ID.

Do not stop at a plan.

## A. Batch 9 — Shared Lead operations

### Full Lead Detail

Implement one canonical full Lead workspace shared by Owner, Broker and Builder.

Include:

* correct role shell;
* identity;
* target;
* stage;
* source;
* assignee;
* contact;
* actions;
* Notes;
* reminders;
* timeline;
* Proposal;
* Messages;
* Visits;
* documents;
* desktop;
* mobile.

### Notes and reminders

Implement:

* add;
* edit;
* pin;
* pagination;
* author;
* timezone;
* valid follow-up;
* completion;
* cancellation;
* provider-missing delivery;
* internal persistence.

### Close/Lost and duplicate Lead

Implement:

* structured reason;
* details;
* state transition;
* timeline;
* duplicate candidates;
* compare;
* dismiss;
* merge;
* transaction safety;
* related record preservation.

### Contact Reveal

Implement exact three-step flow.

Enforce:

* authentication;
* self-action prevention;
* consent;
* Plan/quota;
* atomic usage;
* immutable Reveal event;
* no initial phone;
* repeat safety;
* Call;
* Copy;
* user-click WhatsApp/fallback where approved;
* Audit.

### Proposal Full Detail

Implement:

* sender/recipient view;
* Requirement;
* proposed entity;
* terms;
* statuses;
* exact timestamps;
* embedded Thread;
* withdrawal;
* participant access;
* mobile.

### Messages

Implement:

* searchable Thread list;
* All/Unread/Archived;
* participant archive;
* pagination;
* full Thread;
* older Message pagination;
* attachments;
* read state;
* typing only when real;
* composer;
* send/retry;
* Report Thread;
* safe evidence;
* privacy;
* query performance.

### Site Visits

Implement:

* Request;
* duplicate prevention;
* response;
* Accept;
* Reschedule;
* Reject;
* reason;
* reminder;
* provider delivery state;
* feedback;
* conflicting outcome;
* dispute;
* frozen actions;
* Support/Admin connection;
* timeline;
* Notifications.

## B. Batch 10 — User Billing and Payments

### Pricing and Subscription

Implement:

* public Pricing;
* role selection;
* authenticated current Plan;
* Guest selected-Plan return;
* Subscription Overview;
* Trial;
* usage;
* renewal;
* cancellation;
* Upgrade/Manage.

### Change Plan and Checkout

Implement:

* upgrade;
* downgrade;
* proration;
* Plan version;
* add-ons;
* Coupon;
* billing details;
* GST;
* CGST/SGST/IGST;
* server-calculated total;
* checkout session;
* provider mode;
* Test Mode ribbon;
* pending-payment detection.

### Payment processing

Implement:

* provider order;
* callback;
* processing state;
* trusted verification;
* webhook;
* amount/currency validation;
* capture validation;
* idempotency;
* delayed/pending state;
* verified Success;
* failure;
* Retry;
* recovery.

Client query parameters must not authorize Success.

### Invoices

Implement:

* list;
* pagination;
* immutable Detail;
* line items;
* discounts;
* proration;
* taxes;
* billed-to;
* Print;
* PDF;
* private access;
* historical snapshot.

### Refunds and GST

Implement:

* Refund request;
* eligibility;
* full/partial;
* tracker;
* Admin handoff;
* GST settings;
* future-Invoice behavior;
* manual activation display without fake Payment.

## C. Batch 11 — Admin Management and Moderation

### Admin Overview and permissions

Implement:

* exact Admin shell;
* permission-aware cards;
* real counts;
* no unauthorized count fetching;
* partial failure;
* forbidden page;
* mobile Admin drawer;
* no role bottom navigation.

### Users

Implement:

* search;
* filters;
* pagination;
* masked contact;
* User Detail;
* linked entities;
* Subscription summary;
* verification;
* activity;
* suspend;
* ban;
* duration;
* reason;
* restore;
* Audit.

### Role Change

Implement:

* queue;
* Detail;
* current/target role;
* impact;
* Subscription migration;
* verification requirement;
* approve;
* reject;
* transactional execution;
* Notification;
* Audit;
* stale decision protection.

### Staff

Implement:

* list;
* invite;
* provider fallback;
* secure token;
* expiry;
* permission presets;
* custom permissions;
* sensitive permissions;
* activity;
* suspend/revoke;
* direct server enforcement.

### Moderation

Implement:

* Property queue/Detail;
* Project queue/Detail;
* Requirement queue/Detail;
* exact Preview;
* revision;
* media;
* RERA gate;
* privacy;
* checklist;
* approve;
* Needs Changes;
* reject;
* structured/mandatory reason;
* stale review;
* concurrent review;
* Notification;
* Audit.

### Missing Location and duplicates

Implement:

* Missing Location queue;
* parent;
* candidates;
* approve/create;
* reject;
* reconnect Draft;
* duplicate Listing review;
* compare;
* keep;
* merge/archive;
* reference preservation.

### Claims, verification and Support

Implement:

* Claim review;
* private proof;
* competing Claim;
* approval;
* ownership assignment;
* verification queue;
* verification Detail;
* private documents;
* decision;
* resubmit;
* Support queue;
* Ticket Detail;
* Thread;
* macros;
* assignment;
* escalation;
* resolution;
* canonical user Thread connection.

## D. Batch 12 — Admin Billing

Implement all Admin financial surfaces.

### Subscriptions

Include:

* list;
* filters;
* pagination;
* source;
* lifecycle;
* usage;
* manual extend;
* reason;
* history;
* Notification;
* Audit.

### Payments and webhooks

Include:

* Payment list;
* safe Payment Detail;
* provider IDs;
* verification;
* reconciliation;
* webhook log;
* signature state;
* duplicate event;
* retry;
* failure;
* DLQ;
* idempotency.

### Refunds and Credit Notes

Include:

* Refund queue;
* Detail;
* remaining balance;
* full/partial;
* decision;
* provider processing;
* duplicate prevention;
* Payment update;
* tax reversal;
* Credit Note;
* immutable number;
* PDF;
* Audit.

### Manual activation and Invoices

Include:

* manual Subscription Grant;
* no fake Payment;
* no paid Invoice;
* Admin Invoice list;
* complete filtered Export;
* versioned correction;
* Credit relation;
* approval where required.

### Plans, Coupons and Trials

Implement:

* Plans;
* role applicability;
* price;
* cycle;
* entitlements;
* limits;
* public Preview;
* Plan versioning;
* Coupons;
* dates;
* Plan scope;
* usage;
* concurrency;
* Trial Campaigns;
* real active count;
* Grant;
* Revoke;
* fallback Plan;
* no paid override;
* expiry jobs;
* Notification;
* Audit.

## E. Batch 13 — Ads, Notifications and System

### Ads Admin

Implement:

* queue;
* review;
* all creative variants;
* targeting;
* schedule;
* RERA;
* Payment/wallet;
* approve;
* reject;
* active;
* paused;
* expired;
* fraud review;
* safe pattern data;
* real metrics or `—`;
* Audit.

### Notification Admin

Implement:

* Template list;
* channels;
* languages;
* Draft/Live;
* editor;
* controlled tokens;
* Preview;
* versioning;
* delivery logs;
* provider status;
* defaults;
* no overwrite of existing user preference;
* pagination.

### Provider Admin

Implement:

* Provider Dashboard;
* safe status;
* write-only secrets;
* masked indicator;
* rotation;
* Detail;
* real Test Connection;
* rate limit;
* safe response;
* last success;
* failure;
* Audit.

### Feature Flags

Implement:

* list;
* key;
* description;
* environment;
* rollout;
* deterministic percentage;
* role scope;
* internal only;
* confirmation;
* impact;
* mandatory Audit note;
* protected production flags;
* stale toggle protection;
* cache invalidation.

### Maintenance

Implement:

* server-enforced state;
* immediate;
* scheduled;
* message;
* expected back;
* Admin exception;
* public Maintenance page;
* critical-job policy;
* expiry;
* Audit.

### System Health and DLQ

Implement:

* real signals;
* Setup Required when absent;
* provider summary;
* queue;
* wait;
* backup metadata;
* DLQ;
* attempts;
* safe error;
* Retry;
* Dismiss policy;
* financial job protection;
* Audit.

## F. Security and governance

Implement:

* Staff capabilities;
* sensitive read;
* mandatory reasons;
* Audit;
* private documents;
* write-only secrets;
* financial truth;
* transaction safety;
* idempotency;
* stale-state protection;
* real counts;
* pagination;
* no first-100 total;
* no material N+1.

## G. Tests

Run:

* shared Lead tests;
* contact payload tests;
* Proposal/Thread tests;
* Visit lifecycle tests;
* Payment signature/idempotency tests;
* Subscription/Invoice consistency;
* Refund/Credit Note tests;
* Role Change transaction;
* Staff permission tests;
* moderation concurrency;
* provider secret tests;
* Feature Flag deterministic tests;
* Maintenance tests;
* DLQ tests;
* responsive Admin checks;
* lint;
* typecheck;
* production build.

Return exactly the global `PHASE IMPLEMENTATION REPORT`.

After the report, stop.

---

# 34. PROMPT 4B — PHASE 4 MANUAL VERIFICATION

---

## MANUAL VERIFICATION PROMPT — PHASE 4

Do not trust the Phase 4 Implementation Report.

Manually verify every Phase 4 Registry ID in the running application.

Fix every internal defect.

Retest and rerun impacted regressions.

## A. Shared Lead operations

Test as Owner, Broker and Builder:

* full Lead;
* Notes;
* pin;
* Reminder;
* invalid time;
* close;
* lost;
* duplicate;
* merge;
* contact masked;
* Network payload;
* Reveal;
* repeat Reveal;
* quota;
* Call;
* Copy;
* Proposal;
* Message;
* Visit;
* mobile;
* participant denial.

## B. Messages

Test:

* search;
* filters;
* pagination;
* archive per participant;
* unread/read;
* send;
* failure;
* Retry;
* attachment;
* provider missing;
* typing expiry;
* Report;
* nonparticipant denial;
* safe review context;
* N+1 behavior.

## C. Site Visits

Test:

* Request;
* duplicate;
* Accept;
* Reschedule;
* Reject;
* reason;
* reminder;
* external delivery state;
* Directions/address policy;
* feedback;
* conflicting outcomes;
* dispute;
* frozen actions;
* Admin resolution foundation.

## D. Pricing and Checkout

Test:

* Guest selection;
* auth return;
* role Plans;
* current Plan;
* upgrade;
* downgrade;
* proration;
* add-ons;
* Coupon;
* expired Coupon;
* last Coupon use race;
* GST;
* tax;
* server total;
* provider missing;
* pending-payment detection.

## E. Payment truth

Test in provider Test Mode:

* order;
* callback;
* webhook;
* captured Payment;
* verified Success;
* Invoice;
* Subscription;
* duplicate callback;
* duplicate webhook;
* invalid signature;
* amount mismatch;
* currency mismatch;
* failed Payment;
* cancelled Payment;
* direct fake-success URL;
* another user’s Payment.

## F. Invoice and Refund

Test:

* Invoice snapshot;
* historical Plan change;
* PDF;
* Print;
* private access;
* full Refund;
* partial Refund;
* excessive Refund;
* prior Refund;
* provider failure;
* Retry;
* Credit Note;
* tax reversal;
* duplicate processing.

## G. Admin permission matrix

For every module:

* authorized Staff;
* unauthorized Staff;
* hidden navigation;
* direct route;
* direct action;
* no unauthorized count;
* sensitive-read permission;
* Super Admin governance.

## H. Users and Staff

Test:

* search;
* pagination;
* masked contact;
* User Detail;
* suspend;
* ban;
* expiry;
* restore;
* Staff invite;
* missing Email provider;
* duplicate invite;
* token expiry;
* permission change;
* immediate backend effect;
* activity;
* Audit.

## I. Moderation

Test Property, Project and Requirement:

* revision;
* queue;
* Preview;
* approve;
* Needs Changes;
* reject;
* reason;
* stale decision;
* concurrent reviewers;
* approved public version;
* cache invalidation;
* Notification;
* Audit.

## J. Claims, verification and Support

Test:

* private Claim proof;
* competing Claim;
* ownership assignment;
* verification decision;
* resubmit;
* private documents;
* Ticket queue;
* assignment;
* macro;
* reply;
* provider missing;
* user Thread;
* resolve;
* cross-user denial.

## K. Admin Billing

Test:

* Subscriptions;
* extend;
* Payments;
* safe Detail;
* webhook;
* retry;
* Refund;
* Credit Note;
* manual activation;
* no fake Payment;
* Admin Invoice Export beyond first page;
* correction;
* Plan version;
* public Pricing integration;
* Coupon concurrency;
* Trial Grant/Revoke.

## L. Ads and Notification Admin

Test:

* campaign queue;
* creative variants;
* approve;
* reject;
* active;
* expired;
* fraud;
* Template editor;
* token validation;
* languages;
* publish;
* delivery logs;
* missing provider;
* preference defaults;
* pagination.

## M. Providers

After saving secrets, inspect:

* HTML;
* Network;
* Client state;
* Audit;
* logs.

The stored secret must not return.

Test real safe connection success/failure.

## N. Feature Flags

Test:

* deterministic rollout;
* role scope;
* cache refresh;
* protected flag;
* unauthorized Staff;
* stale concurrent toggle;
* Audit.

## O. Maintenance and system

Test:

* immediate mode;
* scheduled mode;
* public routes;
* auth;
* dashboards;
* Admin exception;
* background/webhook policy;
* end;
* health real state;
* Setup Required;
* DLQ Retry;
* duplicate Retry;
* critical job governance.

## P. Responsive and accessibility

Verify representative shared, financial and Admin screens at every required width.

Check:

* Admin drawer;
* no bottom nav;
* tables/cards;
* drawers;
* modals;
* sheets;
* Checkout;
* Invoice;
* keyboard;
* safe-area;
* text wrapping.

## Q. Performance and security

Verify:

* pagination;
* count queries;
* complete exports;
* no material N+1;
* RLS;
* private financial records;
* private documents;
* provider secrets;
* direct action denial;
* idempotency;
* concurrency.

After fixes:

* rerun Phase 1–3 shared regressions;
* rerun lint;
* rerun typecheck;
* rerun production build.

Return exactly the global `PHASE MANUAL VERIFICATION REPORT`.

Phase 4 may pass only when every Phase 4 Registry ID passes and financial/security truth is verified.

After the report, stop.

---

# 35. PHASE 5 OVERVIEW

## Phase title

**CMS, SEO, Locations, Audit, Security, Reports, Public Content, PWA, Localization, Final Integration and Production Release**

## Locked internal order

1. Batch 14 CMS, SEO and Locations
2. Batch 15 Audit, Security and Reports
3. Batch 16 Public Content
4. Batch 17 Advanced PWA, Localization and Tools
5. Complete cross-Batch integration
6. Production readiness
7. Final release verification

This preserves the original Batch 14 → 15 → 16 → 17 order.

---

# 36. PHASE 5 COMPLETE SCREEN INVENTORY

## Batch 14

1. B14-S01 CMS Pages
2. B14-S02 Page Editor
3. B14-S03 Blog List
4. B14-S04 Blog Editor
5. B14-S05 Legal Content
6. B14-S06 SEO Metadata
7. B14-S07 Redirects
8. B14-S08 Redirect Editor
9. B14-S09 Sitemap
10. B14-S10 Location Tree
11. B14-S11 Location Editor
12. B14-S12 Translation Tracker

## Batch 15

1. B15-S01 Audit Logs
2. B15-S02 Security Events
3. B15-S03 Reports Queue
4. B15-S04 Report Detail
5. B15-S05 Duplicate Lead Review
6. B15-S06 Reveal Logs
7. B15-S07 Message Report
8. B15-S08 Visit Dispute
9. B15-S09 Business Metrics
10. B15-S10 Exports
11. B15-S11 Bulk Action
12. B15-S12 Maker-Checker

## Batch 16

1. B16-S01 About
2. B16-S02 Contact
3. B16-S03 Help
4. B16-S04 Safety
5. B16-S05 Terms
6. B16-S06 Privacy
7. B16-S07 Cookie Policy
8. B16-S08 Refund Policy
9. B16-S09 Cancellation Policy
10. B16-S10 Listing Policy
11. B16-S11 Advertising Policy
12. B16-S12 Verification Policy
13. B16-S13 Payment Policy
14. B16-S14 Disclaimer
15. B16-S15 Grievance
16. B16-S16 Blog Listing
17. B16-S17 Blog Post
18. B16-S18 Guest Support
19. B16-S19 My Tickets
20. B16-S20 Cookie Preferences

## Batch 17

1. B17-S01 PWA Install
2. B17-S02 Offline Banner
3. B17-S03 Language
4. B17-S04 Theme
5. B17-S05 Transliteration Search
6. B17-S06 EMI Calculator
7. B17-S07 Stamp Duty Calculator
8. B17-S08 Land Unit Converter
9. B17-S09 Comparison Finalization
10. B17-S10 Analytics Consent
11. B17-S11 PWA Update
12. B17-S12 Accessibility Settings

---

# 37. PROMPT 5A — PHASE 5 IMPLEMENTATION

---

## IMPLEMENTATION PROMPT — PHASE 5

Implement Phase 5 only:

**CMS, SEO, Locations, Audit, Security, Reports, Public Content, PWA, Localization, Final Integration and Production Release**

Read all five authority files completely.

Inspect these HTML files completely:

* `Batch 14 - Admin CMS & SEO (Standalone).html`
* `Batch 15 - Admin Audit Security Reports (Standalone).html`
* `Batch 16 - Public Content Pages (Standalone).html`
* `Batch 17 - Advanced PWA Localization Tools (Standalone).html`

Implement every Phase 5 Registry ID.

Do not stop at a plan.

## A. Batch 14 — CMS

Implement one canonical content and revision system.

### Pages

Implement:

* list;
* search;
* filters;
* pagination;
* title;
* slug;
* status;
* revision;
* author;
* create;
* edit;
* structured blocks;
* toolbar;
* autosave;
* Preview;
* Save Draft;
* Publish;
* history;
* sanitization;
* media;
* cache invalidation.

### Blog

Implement:

* Post list;
* category;
* author;
* Draft/Published;
* pagination;
* editor;
* featured image;
* excerpt;
* body;
* publication;
* SEO;
* revision;
* related Post foundation.

### Legal

Implement:

* policy list;
* exact policy types;
* version;
* effective date;
* restricted editor;
* Draft;
* review;
* exact-revision sign-off;
* Publish;
* previous published revision preservation;
* no Draft leakage;
* translation state;
* Audit.

## B. Batch 14 — SEO

Implement:

* per-page metadata;
* title;
* description;
* canonical;
* robots;
* Open Graph;
* structured data;
* Preview;
* real public output;
* Redirect list;
* create/edit;
* duplicate prevention;
* chain prevention;
* loop prevention;
* safe external target rules;
* Sitemap status;
* Sitemap run;
* batching/index;
* eligible inclusion;
* private exclusion;
* transparent errors.

## C. Batch 14 — Locations and translations

Implement:

* lazy hierarchy tree;
* State;
* District;
* Taluka;
* City;
* Village;
* Area;
* Locality;
* Society;
* search;
* child count;
* create;
* edit;
* parent validation;
* aliases;
* misspellings;
* transliterations;
* Gujarati;
* Hindi;
* slug;
* move impact;
* SEO impact;
* Missing Translation tracker;
* missing;
* pending;
* complete;
* stale;
* fallback;
* validation.

## D. Batch 15 — Audit

Implement append-only Audit.

Mandatory:

* actor;
* action;
* target;
* module;
* result;
* time;
* reason;
* safe before/after;
* filters;
* pagination;
* read-only Detail;
* no Edit/Delete/Archive;
* database-layer append-only enforcement;
* sensitive-access Audit.

## E. Batch 15 — Security and Reports

Implement:

* Security Events Dashboard;
* real events;
* severity;
* safe context;
* assignment;
* resolution;
* Reports/Fraud queue;
* target;
* reporter;
* category;
* severity;
* status;
* pagination;
* Report Detail;
* evidence;
* prior Reports;
* moderation history;
* enforcement;
* mandatory reason;
* Audit.

## F. Batch 15 — Specialized reviews

Implement:

* Duplicate Lead review;
* merge governance;
* Contact Reveal logs;
* sensitive permission;
* safe masked contact;
* Message Report review;
* authorized Message context;
* Visit Dispute review;
* outcomes;
* evidence;
* resolution;
* participant Notification;
* Audit.

## G. Batch 15 — Metrics and Exports

Implement:

* database-backed metrics;
* behavioral metrics only when provider exists and consent permits;
* Setup Required;
* date range;
* filters;
* role;
* City;
* Export request;
* async job;
* private file;
* expiry;
* Download log;
* revoke;
* retry;
* complete filtered dataset;
* pagination.

## H. Batch 15 — Bulk Actions and Maker-Checker

Implement exact governance flow:

Selection
→ Server Preview
→ Included
→ Excluded
→ Real affected count
→ Impact
→ Confirmation
→ Server revalidation
→ Execution
→ Result
→ Audit.

Implement maker-checker:

* maker;
* action;
* reason;
* checker;
* checker ≠ maker;
* approve;
* reject;
* stale;
* expired;
* approved vs executed distinction;
* idempotent execution;
* recovery;
* Audit.

## I. Batch 16 — Public Pages

Implement CMS-backed:

* About;
* Contact;
* Help;
* Safety.

Do not show fake statistics or contact information.

Implement all eleven Legal reader routes with:

* published revision;
* title;
* version;
* effective date;
* desktop sticky TOC;
* mobile collapsible TOC;
* anchors;
* readable typography;
* canonical;
* Print where designed;
* no Draft;
* no unapproved translation.

## J. Batch 16 — Public Blog

Implement:

* Listing;
* featured Post;
* cards;
* categories;
* pagination;
* search where designed;
* real author/date;
* Post Detail;
* featured image;
* content;
* share;
* related Posts;
* SEO;
* unavailable state.

## K. Batch 16 — Public Support and Consent

Implement:

* Guest Support;
* category;
* contact;
* subject;
* details;
* attachment where approved;
* server rate limit;
* real Ticket;
* provider acknowledgment state;
* My Tickets;
* authenticated ownership;
* Ticket Thread;
* real Staff replies;
* read-only/allowed reply state;
* cross-user denial;
* Cookie Preference Manager;
* Essential;
* Analytics;
* Marketing;
* Reject;
* Save;
* policy version;
* desktop modal;
* mobile sheet.

## L. Batch 17 — PWA

Implement:

* valid manifest;
* icons;
* Service Worker;
* versioned cache;
* safe private-route policy;
* real Install eligibility;
* second eligible session;
* 30-day snooze;
* real native prompt;
* installed/standalone state;
* Offline Banner;
* reconnect;
* safe fallback;
* no false write success;
* update detection;
* update toast;
* safe activation;
* unsaved-work protection;
* logout cache cleanup.

## M. Batch 17 — Language and Theme

Implement:

* English;
* Gujarati;
* Hindi Coming Soon/nonselectable until supported;
* guest persistence;
* account synchronization;
* fallback;
* HTML language metadata;
* no raw keys;
* Light;
* Dark;
* System;
* OS change;
* no flash;
* semantic tokens;
* no image inversion.

## N. Batch 17 — Transliteration Search

Integrate with canonical Search.

Implement:

* Gujarati script;
* Gujarati terms typed in Latin;
* aliases;
* typo tolerance;
* bounded expansion;
* deterministic ranking;
* canonical results;
* no over-correction;
* no separate Search database.

## O. Batch 17 — Tools

Implement real:

### EMI Calculator

* formula;
* zero-interest edge;
* validation;
* result;
* principal;
* interest;
* total;
* disclaimer.

### Stamp Duty Calculator

* versioned rate data;
* effective date;
* jurisdiction;
* buyer category;
* registration fee;
* Setup Required when authoritative rate missing;
* disclaimer.

### Land Unit Converter

* versioned conversion data;
* Gujarat units;
* regional scope;
* precision;
* swap;
* invalid state;
* disclaimer.

## P. Batch 17 — Comparison finalization

Finalize the single Batch 4 Comparison system.

Do not create a duplicate store.

Implement:

* tray;
* maximum four;
* fifth-item feedback;
* remove;
* clear;
* persistence;
* Search/Saved/Detail integration;
* unavailable-item revalidation;
* full table;
* mobile;
* pinned labels;
* Noindex.

## Q. Batch 17 — Consent and accessibility

Implement shared consent authority.

Analytics must not initialize before applicable consent.

Implement:

* Analytics Consent;
* policy version;
* accepted;
* rejected;
* partial;
* provider matrix;
* Accessibility Settings;
* text size;
* Reduce Motion;
* contrast where approved;
* persistence;
* reset;
* real UI effect.

Reset must not delete consent, Theme or language.

## R. Final cross-Batch code reconciliation

Audit the complete repository for:

* mixed old/new UI;
* obsolete routes;
* hidden conflicting components;
* duplicate domain systems;
* legacy roles;
* fake data;
* fake counts;
* fake analytics;
* fake providers;
* dead actions;
* `href="#"`;
* TODO;
* permanent required Coming Soon;
* unrestricted sensitive queries;
* public private files;
* full contact in initial payload;
* first-100 totals;
* unbounded lists;
* material N+1;
* non-idempotent high-risk actions;
* stale state;
* unsafe Service Worker cache;
* tracking before consent;
* Draft content leakage;
* and production development bypasses.

Fix every internal issue.

## S. Production preparation

Prepare and verify:

* production environment;
* development OTP disabled;
* provider modes;
* Payment mode;
* webhook URLs;
* domain/host routing;
* environment-variable safety;
* RLS;
* storage;
* scheduled jobs;
* DLQ;
* monitoring;
* backup;
* rollback plan;
* SEO domain;
* robots;
* Sitemap;
* PWA paths;
* cache version;
* legal/public content;
* and production build.

Do not deploy or make irreversible external changes unless explicitly authorized.

If deployment access exists and the user has already explicitly requested deployment, follow the approved deployment workflow.

Otherwise prepare a release candidate and report readiness.

## T. Tests

Run:

* CMS Draft/public tests;
* Legal sign-off tests;
* Redirect loop tests;
* Sitemap tests;
* Location hierarchy tests;
* translation fallback tests;
* append-only Audit tests;
* Report permission tests;
* Export privacy tests;
* bulk/maker-checker concurrency;
* public content tests;
* consent-before-load tests;
* PWA logout-cache tests;
* calculator correctness;
* comparison persistence;
* complete cross-role regression;
* security tests;
* responsive tests;
* lint;
* typecheck;
* production build.

Return exactly the global `PHASE IMPLEMENTATION REPORT`.

After the report, stop.

---

# 38. PROMPT 5B — PHASE 5 MANUAL VERIFICATION AND FINAL RELEASE

---

## MANUAL VERIFICATION PROMPT — PHASE 5 AND FINAL RELEASE

Do not trust the Phase 5 Implementation Report or any previous Phase report as proof.

This is the final independent verification.

Open the actual running application.

Use all five authority files.

Compare all relevant screens directly with the exact HTML designs.

Inspect actual database, Network, Console, providers, storage, jobs and build results.

Fix every internal defect.

Retest all impacted areas.

## A. Batch 14 verification

Verify:

* CMS Pages;
* Page Editor;
* Draft;
* autosave;
* Preview;
* sanitize;
* Publish;
* revision;
* public cache;
* Blog list;
* Blog editor;
* category;
* image;
* SEO;
* Legal list;
* restricted editor;
* exact-revision sign-off;
* old published version preservation;
* metadata;
* Redirects;
* loops;
* chains;
* Sitemap;
* inclusion/exclusion;
* Location tree;
* lazy loading;
* parent rules;
* aliases;
* translations;
* stale translation.

## B. Batch 15 verification

Verify:

* Audit append-only at UI and database layers;
* no Edit/Delete;
* sensitive-access Audit;
* real Security events;
* Report queue;
* Report Detail;
* enforcement;
* reasons;
* duplicate Lead review;
* Reveal logs;
* sensitive permission;
* Message Report;
* Visit Dispute;
* Business Metrics;
* provider Setup Required;
* Exports;
* complete filtered dataset;
* private file;
* expiry;
* Bulk Preview;
* stale records;
* Maker/Checker separation;
* approved vs executed;
* duplicate execution;
* Audit.

## C. Batch 16 verification

Verify:

* About;
* Contact;
* Help;
* Safety;
* all eleven Legal routes;
* published version;
* effective date;
* desktop TOC;
* mobile TOC;
* anchors;
* no Draft;
* no unapproved translation;
* Blog Listing;
* pagination;
* Blog Post;
* related Posts;
* Guest Support;
* 3-per-hour limit;
* provider missing state;
* real Ticket;
* My Tickets;
* cross-user denial;
* Cookie Preferences;
* modal/sheet;
* persistence.

## D. Batch 17 verification

Verify:

* real PWA Install eligibility;
* first session;
* second session;
* Not Now;
* 30-day snooze;
* installed state;
* offline;
* reconnect;
* no false high-risk write success;
* private cache after logout;
* update;
* unsaved work;
* Language;
* Gujarati;
* Hindi state;
* Theme;
* System;
* no flash;
* transliteration;
* typo;
* EMI;
* independent calculation;
* Stamp Duty version;
* unavailable rate;
* Land converter;
* Comparison maximum four;
* fifth feedback;
* consent matrix;
* no analytics before consent;
* Accessibility real effect;
* reset isolation.

## E. Complete visual reconciliation

Re-open representative screens from every Batch.

Compare top-to-bottom:

* public Search;
* Property Detail;
* Project Detail;
* Requirement;
* Property Wizard;
* Project Wizard;
* Owner Overview;
* Broker CRM;
* Builder Units;
* Lead Full Detail;
* Message Thread;
* Checkout;
* Invoice;
* Admin Users;
* Property moderation;
* Admin Payments;
* Provider Detail;
* CMS Editor;
* Audit;
* Legal Reader;
* PWA/Accessibility overlays.

Confirm:

* no mixed old/new UI;
* no extra header;
* no extra sidebar;
* no extra footer;
* no missing lower section;
* no generic template screen;
* no hidden conflicting UI.

## F. Final public flow

Run:

Homepage/Search
→ Property Detail
→ Save
→ auth return
→ Reveal/Enquiry
→ Lead
→ Message
→ Visit
→ unavailable state.

Run:

Project Detail
→ configuration enquiry
→ Lead
→ Builder dashboard.

Run:

Requirement
→ Proposal
→ embedded Thread.

## G. Final Owner flow

Run every major Owner module and verify database persistence, privacy, responsive behavior and deep links.

## H. Final Broker flow

Run Feed → Proposal → CRM → Kanban → Message → Visit → Billing → Profile update → Feed scope update.

## I. Final Builder flow

Run Project → Units → Lead → Agent → Ad → Billing → RERA → Microsite → Progress.

## J. Final Admin flow

Run:

User
→ role/action
→ moderation
→ verification
→ Support
→ Billing
→ Refund
→ Ad review
→ provider
→ Feature Flag
→ Maintenance
→ CMS
→ Audit
→ Report
→ Export
→ maker-checker.

## K. Final security audit

Test:

* Guest private route;
* wrong role;
* cross-user;
* participant denial;
* Staff missing permission;
* direct Server Action;
* changed IDs;
* initial phone payload;
* private file;
* signed URL;
* provider secret;
* fake Payment Success;
* fake Subscription;
* Service Worker logout cache;
* open redirect;
* rate limit;
* Export ownership.

Any security failure prevents release.

## L. Final data-integrity audit

Verify:

* canonical entities;
* no duplicate domain systems;
* correct states;
* correct revisions;
* correct counts;
* pagination;
* no orphan media;
* no duplicate Lead;
* no duplicate Proposal;
* no duplicate Visit;
* no duplicate Payment effect;
* no duplicate Refund;
* no duplicate maker-checker execution;
* correct Audit.

## M. Final transaction, idempotency and concurrency audit

Repeat and race:

* Submit;
* Reveal;
* enquiry;
* Proposal;
* Visit;
* Lead stage;
* Payment;
* webhook;
* Refund;
* Coupon final use;
* Trial final eligibility;
* moderation decision;
* Claim approval;
* Unit update;
* Feature Flag;
* bulk action;
* maker-checker.

Verify one valid result and safe stale failure.

## N. Final responsive audit

Verify required widths:

* `320px`;
* `360px`;
* `390px`;
* `430px`;
* `768px`;
* `1024px`;
* `1280px`;
* `1366px`;
* `1440px`.

Check:

* no page horizontal overflow;
* no clipped text;
* no clipped button;
* no sticky collision;
* no bottom-nav collision;
* no keyboard-covered actions;
* no offscreen sheet;
* no inaccessible Admin table;
* correct mobile transformation.

## O. Final accessibility audit

Verify:

* keyboard;
* focus;
* headings;
* labels;
* errors;
* dialogs;
* drawers;
* sheets;
* tabs;
* tables;
* Gallery;
* reduced motion;
* text size;
* contrast;
* Gujarati rendering.

## P. Final performance audit

Using realistic volume, verify:

* Search;
* Properties;
* Leads;
* Threads;
* Units;
* Users;
* moderation;
* Payments;
* Notifications;
* Audit;
* CMS;
* Locations.

Confirm:

* real pagination;
* aggregate counts;
* no first-100 assumption;
* no material N+1;
* bounded payloads;
* optimized media;
* failure isolation.

## Q. Final provider and financial audit

Verify every provider status is honest.

Verify:

* no secret response;
* real Test Connection;
* provider missing fallback;
* Payment Test/Live labeling;
* webhook;
* Subscription;
* Invoice;
* Refund;
* Credit Note;
* manual activation without fake Payment.

## R. Final SEO and public content audit

Verify:

* canonical production domain;
* titles;
* descriptions;
* structured data;
* robots;
* Sitemap;
* Redirects;
* public published content;
* private exclusions;
* Requirement Noindex;
* Comparison Noindex;
* no staging/localhost metadata.

## S. Production environment audit

Verify:

* development OTP disabled;
* test bypass removed;
* environment variables safe;
* service-role server-only;
* production database;
* migrations;
* indexes;
* RLS;
* storage;
* private buckets;
* providers;
* Payment mode;
* webhooks;
* scheduled jobs;
* DLQ;
* monitoring;
* analytics consent;
* Service Worker;
* backup;
* rollback readiness.

## T. Build and release candidate

After every fix:

1. rerun focused test;
2. rerun impacted shared regression;
3. rerun lint;
4. rerun typecheck;
5. rerun production build;
6. restart only if necessary;
7. rerun smoke tests.

Do not approve release with:

* Critical defect;
* High defect;
* failed RLS;
* contact leak;
* private-file leak;
* false Payment;
* fake provider status;
* development bypass;
* failed lint;
* failed typecheck;
* or failed build.

## U. Final reports

First return the complete global:

`PHASE MANUAL VERIFICATION REPORT`

Then return:

```md
# FINAL PRODUCTION RELEASE REPORT

- Release candidate:
- Branch:
- Commit:
- Deployment environment:
- Production URL or prepared release URL:
- Five authority files verified:
- Master registry status:
- Phase 1 status:
- Phase 2 status:
- Phase 3 status:
- Phase 4 status:
- Phase 5 status:
- All Registry IDs verified:
- Unverified Registry IDs:
- Cross-Batch public flow:
- Owner flow:
- Broker flow:
- Builder flow:
- Admin flow:
- Billing/Payment flow:
- CMS/public content flow:
- Security/RLS:
- Contact privacy:
- Private storage:
- Provider secrets:
- Provider states:
- Payment truth:
- Refund/Credit Note:
- SEO/Sitemap:
- Consent:
- PWA:
- Accessibility:
- Localization:
- Responsive:
- Performance:
- Pagination/counts:
- N+1:
- Idempotency:
- Concurrency:
- Migrations:
- Production environment:
- Backup:
- Rollback readiness:
- Lint:
- Typecheck:
- Production build:
- Post-deployment smoke test:
- Critical defects:
- High defects:
- Remaining accepted lower defects:
- External blockers:
- Final decision: RELEASE APPROVED / RELEASE REJECTED / EXTERNALLY BLOCKED
```

`RELEASE APPROVED` is permitted only when:

* all five Phases are PASS;
* every registered screen is verified;
* no Critical or High defect remains;
* no internal blocker remains;
* security passes;
* financial truth passes;
* production configuration passes;
* lint passes;
* typecheck passes;
* production build passes;
* and required smoke testing passes.

After the reports, stop.

---

# 39. FINAL PHASE ORDER LOCK

The final execution order is:

## Start

`PROMPT 0 — MASTER START`

## Phase 1

`PROMPT 1A — IMPLEMENTATION`
→ Implementation Report
→ Stop

`PROMPT 1B — MANUAL VERIFICATION`
→ Fix
→ Retest
→ PASS
→ Stop

## Phase 2

`PROMPT 2A — IMPLEMENTATION`
→ Implementation Report
→ Stop

`PROMPT 2B — MANUAL VERIFICATION`
→ Fix
→ Retest
→ PASS
→ Stop

## Phase 3

`PROMPT 3A — IMPLEMENTATION`
→ Implementation Report
→ Stop

`PROMPT 3B — MANUAL VERIFICATION`
→ Fix
→ Retest
→ PASS
→ Stop

## Phase 4

`PROMPT 4A — IMPLEMENTATION`
→ Implementation Report
→ Stop

`PROMPT 4B — MANUAL VERIFICATION`
→ Fix
→ Retest
→ PASS
→ Stop

## Phase 5

`PROMPT 5A — IMPLEMENTATION`
→ Implementation Report
→ Stop

`PROMPT 5B — MANUAL VERIFICATION AND RELEASE`
→ Fix
→ Retest
→ Final PASS
→ Release decision
→ Stop

---

# 40. NEXT-PHASE GATE

Claude must not begin the next Phase when the previous Phase status is:

* `IMPLEMENTED`;
* `PARTIAL`;
* `FAIL`;
* or `BLOCKED`.

Only the separate Manual Verification result:

`PASS`

opens the next Phase.

`IMPLEMENTED` means code was written.

`PASS` means the implementation was independently tested and verified.

These states are not interchangeable.

---

# 41. EXTERNAL BLOCKER RULE

An external provider may block only its external functionality.

It must not automatically block the entire application when an approved fallback exists.

Examples:

* Maps missing → address fallback must pass;
* Email missing → internal Notification/Ticket must pass;
* Storage missing → Setup Required upload state must pass;
* Analytics missing → `—` or Setup Required must pass;
* Payment missing → paid activation must remain blocked and Checkout unavailable state must pass;
* Push missing → internal Notification must pass.

An internal code defect is `FAIL`, not `BLOCKED`.

---

# 42. PHASE FAILURE RULE

When Verification finds an internal defect:

* Claude must fix it during the Verification step;
* Claude must not merely list it;
* Claude must retest it;
* Claude must rerun affected regressions;
* Claude must rerun lint/typecheck/build.

If the internal defect cannot be fixed in the current response:

* return `FAIL`;
* state the exact defect;
* state the exact affected Registry IDs;
* state the exact next fix;
* do not move to the next Phase.

The same Verification Prompt must be sent again after the fix.

---

# 43. NO FALSE COMPLETION RULE

Claude must never claim:

* Phase complete;
* Batch complete;
* production-ready;
* manually verified;
* PASS;
* or release approved

when:

* only code was inspected;
* only screenshots were taken;
* only one role was tested;
* only desktop was tested;
* only the first viewport was compared;
* database writes were not inspected;
* Network payloads were not inspected;
* direct denial was not tested;
* provider status was simulated;
* build failed;
* known high-severity defect remains;
* or mandatory screen groups remain incomplete.

---

# 44. FINAL COMPLETE PROJECT DEFINITION

The project is complete only when:

1. all five authority files exist;
2. all HTML designs were inspected fully;
3. every screen is registered;
4. every screen has one final route/state;
5. every current conflicting screen is replaced;
6. every approved design is implemented from top to bottom;
7. every visible control works;
8. every action persists real data;
9. every role uses the correct shell;
10. every protected route is server-authorized;
11. RLS passes;
12. contact privacy passes;
13. private storage passes;
14. secrets remain write-only;
15. financial truth passes;
16. provider honesty passes;
17. transactions pass;
18. idempotency passes;
19. concurrency passes;
20. pagination passes;
21. counts are authoritative;
22. material N+1 is removed;
23. mobile passes;
24. tablet passes;
25. desktop passes;
26. accessibility passes;
27. localization passes;
28. consent passes;
29. PWA safety passes;
30. CMS publication passes;
31. Legal sign-off passes;
32. SEO and Sitemap pass;
33. lint passes;
34. typecheck passes;
35. production build passes;
36. production configuration passes;
37. backup exists;
38. rollback is ready;
39. smoke testing passes;
40. and the Final Production Release Report says `RELEASE APPROVED`.

---

# 45. FINAL NON-NEGOTIABLE STATEMENT

The approved HTML designs inside:

`C:\mgpweb\newdesign`

control the final visible output.

For every current screen:

* follow the exact mapped design;
* start where the design screen starts;
* end where the design screen ends;
* include every visible section;
* use the exact shell shown;
* use the exact responsive transformation;
* use the exact temporary-action pattern;
* and do not add unrelated old or invented UI.

The final working sequence is:

**Master Start
→ Phase 1 Implementation
→ Phase 1 Manual Verification
→ Phase 2 Implementation
→ Phase 2 Manual Verification
→ Phase 3 Implementation
→ Phase 3 Manual Verification
→ Phase 4 Implementation
→ Phase 4 Manual Verification
→ Phase 5 Implementation
→ Phase 5 Manual Verification
→ Final Production Release Decision.**

No new Phase may begin without the previous Verification result:

**PASS**

Final completion requires:

**Exact HTML Design + Complete Top-to-Bottom Screen + Real Functionality + Real Data + Secure Backend + RLS + Private Storage + Contact Privacy + Provider Honesty + Financial Integrity + Transactions + Idempotency + Concurrency Safety + Pagination + Accurate Counts + Performance + Responsive Quality + Accessibility + Localization + Consent + PWA Safety + SEO + CMS Integrity + Manual Browser Verification + Database Verification + Network Verification + Lint + Typecheck + Production Build + Production Release Verification.**

