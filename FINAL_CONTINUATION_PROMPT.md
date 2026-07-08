# FINAL CONTINUATION PROMPT

Read `MGP_FULL_DESIGN_MIGRATION_MASTER.md` completely and inspect the current repository state before making any changes.

Review:

- `docs/design-migration/SCREEN_MANIFEST.md`
- `docs/design-migration/CHROME_MATRIX.md`
- `docs/design-migration/contracts/`
- `docs/design-migration/verification/`
- `docs/design-migration/DESIGN_SOURCE_INDEX.md`
- `docs/design-migration/BASELINE_STATUS.md`
- authoritative design source:
  `C:\Users\RAJAN\Documents\MGP DESIGN`

- current code implementation
- git status
- relevant current diffs
- recent relevant git changes or commits, if available

First establish the actual migration checkpoint.

Apply the migration precedence rules from MGP_FULL_DESIGN_MIGRATION_MASTER.md before relying on legacy phase prompts or historical visual instructions.

Do not trust COMPLETE/PASS labels blindly.

Verify that:

1. tracking files are consistent with the current code;
2. manifest coverage reconciliation is still valid;
3. `TOTAL_UNMAPPED_TARGETS = 0`, or any new mismatch is explicitly corrected before continuing;
4. the immediately previous completed target has corresponding implementation;
5. its required verification report exists;
6. claimed verification evidence is consistent with the actual implementation;
7. no partially implemented or IN_PROGRESS target exists before the next manifest target;
8. no unfinished valid work from a previous session/account is about to be overwritten.

## Resume rule

If an `IN_PROGRESS` target exists, resume that target before selecting a new target.

Inspect:

- its screen contract;
- current code diff;
- verification report;
- completed substeps;
- remaining substeps;
- known blockers;
- exact recorded resume point.

Do not start another target while an earlier manifest target remains IN_PROGRESS unless that target is explicitly BLOCKED and the blocker is documented.

If no IN_PROGRESS target exists, determine the first target in manifest order that is not fully COMPLETE with all four required gates passed:

1. VISUAL PASS
2. FUNCTIONAL PASS
3. RESPONSIVE PASS
4. REGRESSION PASS

Continue from that exact target.

Do not redo completed targets unless:

- verification evidence shows a real failure;
- current implementation contradicts the recorded status;
- regression testing reveals breakage;
- manifest inconsistency shows the target was incorrectly classified;
- a canonical/inheritance mapping error requires correction.

Do not skip ahead.

## For the active target

1. inspect the exact mapped MGP Design source;
2. inspect the current route and implementation;
3. inspect related backend dependencies;
4. identify shared component dependencies and all affected completed manifest targets before changing shared code;
5. update or create its screen contract;
6. mark or keep the target `IN_PROGRESS`;
7. update the exact resume point;
8. follow the exact MGP Design structure from top to bottom;
9. remove legacy visual blocks absent from the target design;
10. do not add a global header, footer, sidebar, bottom navigation, sticky CTA, banner, navigation row, or other section unless the mapped target actually includes it;
11. preserve and reconnect existing functionality;
12. implement genuinely new design functionality end-to-end;
13. use complete real application data and product rules rather than only design sample data;
14. integrate required missing content using the nearest relevant MGP design pattern instead of resurrecting legacy presentation;
15. verify every visible interactive element individually;
16. perform actual design-vs-route wireframe comparison at matching viewports where tooling is available;
17. verify desktop, tablet, and mobile/responsive behavior;
18. verify real backend behavior, queries, validation, permissions, security, data loading, mutations, and persistence;
19. verify loading, empty, populated, success, failure, unauthorized, not-found, and other applicable states;
20. perform regression verification;
21. record concrete verification evidence;
22. update manifest, contract, CHROME_MATRIX if needed, verification report, and code checkpoint before moving to another target.
23.- distinguish real interactive controls from intentionally informational UI according to the INTERACTION INTENT RULE; do not leave real    controls dead and do not invent unnecessary click behavior for static information;

## Important distinction

Absence of a legacy visual block from the MGP DESIGN means the legacy block/layout must not be preserved.

It does not mean required product functionality, database fields, or relevant real content should be deleted.

Where the design uses sample or shortened content:

- preserve complete relevant product capability and data;
- use the nearest matching MGP component pattern;
- place the content at the logically correct location;
- document the integration in the screen contract;
- do not resurrect the old layout.

Prefer integration inside an existing relevant MGP section.

Create a new large top-level section only when the product truly requires a separate surface and no existing MGP section can logically contain it. Document the reason.

## Functionality ambiguity rule

If a new design feature has unclear behavior:

1. inspect existing code;
2. inspect database schema;
3. inspect product documentation;
4. inspect feature registry;
5. inspect related workflows;
6. inspect role and permission rules;
7. inspect similar existing functionality.

If behavior can be reliably derived, document and implement it end-to-end.

If behavior remains genuinely unclear, record a FUNCTIONALITY_GAP with:

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

For provider-gated functionality, apply the PROVIDER-GATED FUNCTIONALITY RULE from the master file.

Do not fabricate provider success.

A correctly implemented and verified approved SETUP_REQUIRED, FALLBACK_ACTIVE, DISABLED_BY_FLAG, or equivalent documented provider state must be evaluated according to the master rule instead of being automatically treated as a migration failure.

## Verification truth rule

Do not claim manual verification based only on code inspection.

A PASS requires actual runtime evidence where the required tools and environment are available.

Evidence should include, where applicable:

- tested route
- tested viewport width
- exact mapped design source
- design-vs-implementation visual comparison
- interaction performed
- expected result
- actual result
- navigation result
- backend/data result
- form result
- refresh persistence result
- console/runtime error result

A status label without evidence is not sufficient for PASS.

If a required verification cannot actually be executed because of missing:

- tooling
- environment
- credentials
- data
- external service
- browser automation
- rendering capability

mark the affected check:

- BLOCKED, or
- UNVERIFIED

Never fabricate a PASS.

## Repository safety rule

Treat the current working tree as potentially containing valid migration work from previous sessions or accounts.

Before changing the active target:

- inspect git status;
- inspect relevant diffs;
- identify unfinished active-target work;
- compare code with tracking files;
- continue from the current implementation state.

Do not blindly use destructive Git reset, checkout, restore, clean, or revert operations to remove changes.

Do not overwrite or revert unrelated valid work from previous sessions or accounts.

Keep code and tracking documents synchronized.


## Required gate rule

A target is COMPLETE only when:

- VISUAL: PASS
- FUNCTIONAL: PASS
- RESPONSIVE: PASS
- REGRESSION: PASS
- FINAL: COMPLETE

If any required gate is:

- FAIL
- PARTIAL
- BLOCKED
- UNVERIFIED

then:

`FINAL: NOT COMPLETE`

Continue sequentially according to `MGP_FULL_DESIGN_MIGRATION_MASTER.md`.

Resume the current IN_PROGRESS target if one exists; otherwise continue from the first incomplete canonical target in manifest order.

Do not skip verification.
Do not skip responsive checks.
Do not skip evidence.
Do not skip tracking updates.
Do not silently omit design targets.
