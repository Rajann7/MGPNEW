# BASELINE_STATUS

**Purpose:** Repository baseline before migration screen-implementation, per MGP_FULL_DESIGN_MIGRATION_MASTER §3.6. Distinguishes pre-existing state from migration-introduced regressions.

**Baseline checkpoint:** 2026-07-04
**Environment:** Windows 10; Node/Next.js 16.2.9 (Turbopack); package manager npm (package-lock.json present); Supabase cloud project `cekpewpegltqpbmlofmc`.
**VCS:** Not a git repository (`git status` empty; environment reports `Is a git repository: false`). → §18 destructive-git rules are N/A; rollback = file-level revert. Recommend `git init` before large migration work for safe checkpoints.

## Baseline checks executed this session (with current working tree)
| Check | Command | Result | Evidence |
|-------|---------|--------|----------|
| Lint | `npx eslint src` | **PASS** (exit 0) | run 2026-07-04 |
| Typecheck | `npx tsc --noEmit` | **PASS** (exit 0) | run 2026-07-04 |
| Build | `npm run build` | **PASS** (exit 0, 40/40 routes) | run 2026-07-04 |
| Unit/integration/E2E tests | — | **NOT_CONFIGURED** | no `test` script wired |

## Runtime / tooling availability for verification
- Dev server: `preview_start` (Next dev on :3000). **Constraint:** Next locks `next dev` per project dir — only one instance at a time.
- Browser rendering/interaction: preview MCP (resize/screenshot/snapshot/eval) available for **guest/public** routes.
- **Authenticated routes (dashboards/admin):** **UNBLOCKED as of 2026-07-08.** The split 6-box OTP widget *is* driveable — set each box via `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(box, digit)` then dispatch `input`/`change` (React registers the value); the widget auto-submits on the 6th digit. Admin `/admin/login` email/password also works with the same native-setter + `input` dispatch (the earlier `invalid_credentials` was a synthetic-`.value` artifact, not a credential issue). Owner session: mobile `9000000011`, dev-OTP `123456`. Admin: testsuperadmin@mgptest.dev. Dashboard/admin VISUAL+FUNCTIONAL+RESPONSIVE runtime gates are now runnable via automation.
- Design-vs-route rendering comparison: design bundles render from decoded workspace copies; route rendering via preview MCP where guest-accessible.

## Pre-existing failures (must NOT be attributed to migration)
- None in lint/typecheck/build.
- Known non-defect gaps recorded before migration start: `BUG-20260704-UI-002` (global font Geist vs locked Inter — cosmetic, open); dashboard design add-ons not yet built (Kanban / ad-wallet / seats / notification-matrix / account-deletion double-guard — see brain.md Prompt 06 note).

## Regression rule
Post-change checks compare against this baseline. A new lint/tsc/build failure after a target change = migration regression. A missing-dependency or environment issue is not a source regression.
