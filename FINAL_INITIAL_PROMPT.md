# FINAL INITIAL PROMPT

Read and execute `MGP_FULL_DESIGN_MIGRATION_MASTER.md` completely.

The master file is the authoritative migration process for this task.

For this migration, do not execute legacy phase prompts as visual migration authority.

If an older prompt, CLAUDE.md visual instruction, historical document, or previous UI rule conflicts with this migration master or the exact mapped MGP DESIGN target, follow the precedence rules defined in MGP_FULL_DESIGN_MIGRATION_MASTER.md.

Before making broad implementation changes:

1. Scan the complete current codebase.
2. Scan every MGP DESIGN batch file and every distinct screen/state from the authoritative design source directory:

   C:\Users\RAJAN\Documents\MGP DESIGN

   Verify that all 17 design batch HTML files are discovered and create:
   docs/design-migration/DESIGN_SOURCE_INDEX.md

   Do not substitute design-prompts, screenshots, summaries, or legacy UI for the actual MGP DESIGN HTML source.
3. Create:
   `docs/design-migration/SCREEN_MANIFEST.md`
4. Create:
   `docs/design-migration/CHROME_MATRIX.md`
5. Map each design target to its real route, component, existing functionality, backend dependencies, canonical target, and current implementation status.
6. Verify that no design screen, desktop variant, mobile variant, tablet/responsive variant, modal, drawer, sheet, wizard step, loading state, empty state, populated state, success state, failure state, error state, unauthorized state, not-found state, or other materially distinct design target is missing from the manifest.
7. Perform the deterministic coverage audit required by the master file.
8. Reconcile all design-source totals.
9. Ensure `TOTAL_UNMAPPED_TARGETS = 0` before screen implementation begins.

While building `SCREEN_MANIFEST`, classify every discovered target as one of:

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
- design-system showcase boards
- shared specimen pages
- targets explicitly inheriting from another canonical target

For every duplicate/reference target record:

- CANONICAL_TARGET_ID
- INHERITS_FROM
- REUSE_SCOPE
- classification reason

Every discovered target must be accounted for in the manifest.

Never silently omit a design target.

The MGP Design System batch is primarily a source for:

- tokens
- typography
- spacing
- color
- component anatomy
- interaction patterns
- shared visual behavior

Do not automatically treat design-system showcase boards or component specimen pages as application routes unless the real product explicitly contains corresponding routes.

Do not begin screen implementation until:

- the complete design inventory exists;
- route mapping is complete;
- canonical/reference mapping is complete;
- coverage reconciliation is complete;
- `TOTAL_UNMAPPED_TARGETS = 0`.
- BASELINE_STATUS.md has been created;
- executable baseline checks have been recorded;
- pre-existing failures are separated from migration-introduced failures;

After the inventory is complete and checked, start implementation screen-by-screen in manifest order.
Before implementing the first target, establish and record the repository baseline according to the BASELINE ENVIRONMENT AND REGRESSION RULE in the master file.

For every target:

- inspect the exact mapped MGP Design source;
- inspect the current route and implementation;
- identify whether planned changes touch shared components and record all affected manifest target IDs before modifying shared code;
- create or update its screen contract;
- mark the target `IN_PROGRESS` before modifying it;
- record the current implementation step, files being modified, completed substeps, remaining substeps, blockers, and exact resume point;
- follow the exact target MGP Design structure from top to bottom;
- use the specific design target mapped in SCREEN_MANIFEST;
- do not carry over legacy visual sections that are absent from that target design;
- do not assume a global header, footer, sidebar, bottom navigation, sticky CTA, banner, navigation row, or section belongs on the target;
- render the visual structure shown by that specific design target;
- use complete real website data and product requirements, not only sample values shown in the design;
- reconnect all existing functionality to the new UI;
- implement genuinely new functionality end-to-end;
- do not leave actual or implied interactive controls blank, fake, placeholder-only, hardcoded-fake, disconnected, or dead;
- do not invent interactions for purely informational elements; apply the INTERACTION INTENT RULE from the master file;- verify every visible interactive element individually;
- if shared components changed, reverify all affected previously COMPLETE targets according to the master file;
- verify the implementation against its exact mapped MGP Design/wireframe source;
- compare the mapped design and actual route at matching viewports where tooling is available;
- verify desktop, tablet, and mobile/responsive behavior;
- verify real data, queries, backend actions, persistence, permissions, security, validation, loading, empty, populated, success, and error behavior;
- perform regression verification;
- record verification evidence;
- update tracking before moving to the next target.

## Important distinction

Absence of an old visual block from the MGP DESIGN means the old visual block or layout must not be preserved.

It does not mean that required product functionality, required database fields, or relevant real content should be deleted.

If required functionality or relevant product content exists in application requirements but the MGP Design shows only a shortened or sample representation:

1. preserve the product capability;
2. remove the legacy presentation;
3. integrate the complete functionality or content using the nearest matching MGP design pattern and visual language;
4. place it at the logically correct location;
5. document the integration in the screen contract.

Prefer integrating missing required content inside an existing relevant MGP section or component pattern.

Do not resurrect the old layout to display missing functionality.

Do not invent a new large top-level page section merely because the old UI had one.

Create a new top-level section only when the product genuinely requires a distinct surface and no existing MGP section can logically contain it. Document such additions in the screen contract.

Preserve the product capability, not the legacy presentation.

## Functionality ambiguity rule

If a new design feature has no clearly defined behavior:

1. inspect existing code;
2. inspect database schema;
3. inspect product documentation;
4. inspect feature registry;
5. inspect related routes and workflows;
6. inspect role and permission rules;
7. inspect similar existing functionality.

If the intended behavior can be reliably derived, document the functional contract and implement it end-to-end.

If it still cannot be reliably determined, create a FUNCTIONALITY_GAP record containing:

- target ID
- visible feature
- expected user intent
- available infrastructure
- missing business rule
- proposed implementation contract
- data implications
- security implications
- dependencies
- blocker status

Do not silently invent arbitrary business behavior.
Do not leave a fake control.
Do not mark FUNCTIONAL PASS until the feature has a defined and working contract.

## Provider-gated functionality rule

For provider-gated functionality, apply the PROVIDER-GATED FUNCTIONALITY RULE from `MGP_FULL_DESIGN_MIGRATION_MASTER.md`.

Do not fabricate provider success.

A correctly implemented and verified approved state such as:

- SETUP_REQUIRED
- FALLBACK_ACTIVE
- DISABLED_BY_FLAG
- DEV_ONLY
- PROVIDER_UNAVAILABLE

must be evaluated according to the master rule and must not automatically be treated as a migration failure.

Keep provider implementation status and real provider activation/verification status separate.

## Required gates

For every canonical implementation target require:

1. VISUAL PASS
2. FUNCTIONAL PASS
3. RESPONSIVE PASS
4. REGRESSION PASS

A target must not be marked COMPLETE unless all four gates PASS.

If any required gate is:

- FAIL
- PARTIAL
- BLOCKED
- UNVERIFIED

then:

`FINAL: NOT COMPLETE`

Do not treat any of these as completion by themselves:

- build success
- lint success
- type-check success
- unit tests alone
- page rendering
- visual similarity

Do not claim manual verification based only on code inspection.

A verification PASS requires actual runtime evidence where the required tooling and environment are available, including relevant:

- tested route
- tested viewport width
- exact mapped design source
- rendered design-vs-implementation comparison
- interaction execution
- expected result
- actual result
- navigation result
- form behavior
- backend result
- data result
- persistence check after refresh
- responsive inspection
- console/runtime error inspection

A status label without evidence is not sufficient for PASS.

If a required verification cannot actually be performed because the necessary environment, data, credentials, service, browser automation, rendering tooling, or external dependency is unavailable, mark that check:

- BLOCKED, or
- UNVERIFIED

Never fabricate a PASS.

## Required tracking

Keep these synchronized after every target:

- `docs/design-migration/SCREEN_MANIFEST.md`
- `docs/design-migration/CHROME_MATRIX.md`
- `docs/design-migration/contracts/<SCREEN_ID>.md`
- `docs/design-migration/verification/<SCREEN_ID>_VERIFY.md`
- current implementation code

If execution stops, context compacts, the session ends, or the account changes:

- leave unfinished work as `IN_PROGRESS`;
- record the exact resume point;
- record completed and remaining substeps;
- do not mark COMPLETE in advance.

This tracking must remain sufficient for continuation after:

- context compaction
- session limits
- logout/login
- switching to another Claude account using the same current repository

## Repository safety

Treat the current working tree as potentially containing valid migration work.

Before modifying a target:

- inspect git status;
- inspect relevant diffs;
- inspect tracking files;
- identify unfinished target work;
- identify the recorded resume point.

Do not blindly use destructive Git operations such as reset, checkout, restore, clean, or revert to remove work.

Do not overwrite or revert unrelated valid work from previous sessions or accounts.

## Source-of-truth rule

Use:

- MGP DESIGN as the source of truth for visual structure, composition, presentation, responsive structure, and screen-specific chrome.
- Existing application code, database, product requirements, configuration, security rules, role rules, and business logic as the source of truth for complete data and functionality.

Now begin with the full deterministic inventory, mapping, canonical/reference classification, CHROME_MATRIX, and coverage reconciliation.

After inventory is complete and `TOTAL_UNMAPPED_TARGETS = 0`, continue sequentially with implementation and verification according to `MGP_FULL_DESIGN_MIGRATION_MASTER.md`.

Do not stop after planning or inventory unless execution is genuinely blocked.

Keep progressing target-by-target while preserving accurate checkpoint state and evidence.
