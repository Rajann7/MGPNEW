# Implementation Progress Ledger

Anti-skipping tracker. Update after every batch. Do not mark a batch complete without real verification evidence in the batch report.

## ⚠️ Correction applied 2026-07-14 (read before continuing)
The mobile-header rule used through Batches 1B–1D was **wrong** and has been corrected — see [UX_DECISION_LOG.md](UX_DECISION_LOG.md) "Root vs. child mobile header" and [UX_ISSUE_REGISTER.md](UX_ISSUE_REGISTER.md) ISS-0020. Summary: **root/sidebar-listed pages get the hamburger drawer** (like Home), **only true child pages** (create/edit wizards, single-entity detail, sub-resource forms) **get a Back button + hidden bottom nav**. All ~50 Owner/Broker/Builder/shared dashboard pages were re-audited and fixed against this corrected rule in one pass (not per-batch) — so Batches 1B/1C/1D's individual "DONE" statuses below remain accurate for their functional/content findings, but their header classification is now governed by this later correction, not by what was written at the time. **Any future batch (1E Admin, 1G Public, new pages) must follow the corrected rule from the start.**

## Totals (as of the header-rule correction, 2026-07-14)

| Metric | Count |
|---|---|
| Total routes discovered | 98 |
| Total non-route experiences discovered | 0 (not yet enumerated — starts in Batch 2/3) |
| Owner routes live-audited | **17 of 17 — all VERIFIED** (header classification corrected) |
| Shared routes live-audited | **5 of 5 — SHR-01 NOT_APPLICABLE (redirect-only), SHR-02..05 VERIFIED** (header classification corrected) |
| Broker routes live-audited | **18 of 18 — 16 VERIFIED, 2 BLOCKED_WITH_REASON** (header classification corrected) |
| Builder routes live-audited | **19 of 19 — all VERIFIED** (header classification corrected) |
| Total issues found this session | 20 (ISS-0001 .. ISS-0020) |
| Total issues fixed + verified | 15 (ISS-0005, 0007, 0009*, 0010*, 0011*, 0012, 0013, 0014, 0015, 0016, 0017, 0020, plus ISS-0004/ISS-0006 resolved as "no defect found") — *0009/0010/0011 superseded by ISS-0020's corrected implementation |
| Total issues still open | 5 (ISS-0001 legal pages, ISS-0002 modal primitive, ISS-0003 no test infra, ISS-0012's NotificationBell-dropdown sub-gap, ISS-0018 billing usage-counter gap, ISS-0019 public-slug DB investigation) |
| Failures remaining | 0 known among audited routes |
| Blocked items | 1 (ISS-0003, no test infra) + 2 route-level BLOCKED_WITH_REASON (no test data, not defects) + 2 deliberately-deferred (ISS-0018 billing, ISS-0019 DB-layer) |

## Batches

| Batch | Scope | Status | Notes |
|---|---|---|---|
| 0 | Repo/product discovery, registry + control docs created | DONE | |
| 1A | P0/P1 critical failures — static sweep | DONE (accepted as discovery-only, not a substitute for live verification) | See [UX_ISSUE_REGISTER.md](UX_ISSUE_REGISTER.md) "Batch 1 findings" |
| 1B | Owner role — complete live audit, fix, verify | **DONE** | All 17 Owner routes + all 5 shared routes live-verified. 6 real bugs found+fixed. 1 false-positive caught and corrected (ISS-0006) — audit methodology hardened. |
| 1C | Broker role — complete live audit, fix, verify | **DONE** | All 18 Broker routes live-verified. Found ISS-0013 (shared `DashboardPageHeader` title truncation, fixed for 6 pages at once). 1 more false alarm caught and dismissed (stale console errors). |
| 1D | Builder role — complete live audit, fix, verify | **DONE** | All 19 Builder routes live-verified. Found and fixed a **P0 navigation trap** (ISS-0014: `ProjectForm` had zero mobile header, combined with `WizardShell` hiding both topbar and bottom nav — builders had no way off the project-edit screen on mobile except browser Back), self-caught a regression while fixing it (ISS-0015, duplicate header), fixed a misleading empty-state message (ISS-0016) and a clipped dropdown (ISS-0017). Logged but deliberately deferred 2 items touching billing/DB-migration layers (ISS-0018, ISS-0019) rather than patching blind. |
| **Header-rule correction** | Re-audit + fix mobile header classification (root=drawer vs. child=back) across all ~50 dashboard pages | **DONE** | User caught that the ISS-0009 rule ("every non-home page gets Back") was wrong — see ISS-0020. Reclassified every page against real sidebar-nav membership; verified live at 320px/375px/1024px across all 3 roles + shared pages. Full build passed. |
| 1E | Admin complete live audit, fix, verify | **NEXT** | Apply the corrected header rule from the start — Admin shell has no bottom nav at all (per CLAUDE.md §3A), so this batch's header question is really just "does this admin screen need a Back or a drawer," not the Owner/Broker/Builder pattern. |
| 1F | Cross-role flows (already covered SHR-01..05 in 1B; keep for any gaps found) | NOT_STARTED | |
| 1G | Public, authentication, legal/compliance routes | NOT_STARTED | ISS-0001 (8 missing legal pages) lives here |
| 1H | Cross-role regression + full responsive/keyboard pass | NOT_STARTED | Folds in the tablet/keyboard/session-expiry items deferred from 1B |

## Continuation pointer
**Last completed:** Header-rule correction — all Owner/Broker/Builder/shared dashboard pages reclassified and verified.
**Next unprocessed:** Batch 1E (Admin), starting with the admin dashboard home. Do not re-ask the user which module — continue in this order automatically per the auto-continuation plan.

## Honest scope note
This audit prompt describes a multi-week, whole-application initiative (98 routes × full navigation/interaction/responsive/a11y/state audit + fix + live-browser verification each, per role). It cannot be completed truthfully in one pass. This ledger exists specifically so no batch is silently skipped across sessions — every future session should read this file first before starting new work, including the correction note at the top of this file.
