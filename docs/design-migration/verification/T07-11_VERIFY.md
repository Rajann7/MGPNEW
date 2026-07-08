# Verification — T07-11 · Broker/Builder CRM Kanban

**Design source:** Batch 7 "Leads / CRM — Kanban view (desktop 1280px+)" (+ Batch 8 builder leads reuse).
**Route/component:** `/dashboard/broker/leads`, `/dashboard/builder/leads` · `src/components/leads/LeadKanbanBoard.tsx`.
**Date:** 2026-07-04.

## Top-to-bottom structure
| Design block | Expected | Implemented | Match |
|---|---|---|---|
| Dashboard shell (broker/builder nav) | present | DashboardShellV2 | ✓ |
| Screen header "Leads / CRM" | present | h2 | ✓ |
| Kanban board (desktop lg+) | horizontal stage columns + draggable cards + counts | `LeadKanbanBoard` (10 CrmStage columns, count chip, dashed empty drop target) | ✓ |
| Mobile fallback | list (Kanban desktop-only) | `LeadListClient` under `lg:hidden` | ✓ |

## Old UI removed
- Desktop plain vertical list → replaced by Kanban (`hidden lg:block`); list retained for mobile only. `OLD_UI_REMNANTS = 0` (list is the intended mobile variant).

## Functionality preserved
- Real data via `getMyLeadsAsReceiver()` (no fakes; empty column shows honest "Drop leads here").
- Card click → `/dashboard/leads/[id]` (existing detail).
- `updateLeadStage` (receiver-only, RLS + `isLeadReceiver` guard; persists `crm_stage`, logs `stage_changed`, sets terminal status for converted/lost/closed) — reused unchanged.

## New functionality implemented
- Native HTML5 drag/drop → optimistic stage move → `updateLeadStage` → `router.refresh()` reconcile; **revert + error banner on failure** (FORBIDDEN → "Only the lead owner…"). Pending card dimmed. Full `CrmStage` set rendered (data authority, not design sample).

## Interaction-by-interaction (code-level; runtime auth-blocked)
| Element | Test | Expected | Actual (code) | PASS/BLOCKED |
|---|---|---|---|---|
| Card click | navigate | detail route | router.push wired | PASS (code) |
| Card drag→column | stage mutation+persist | optimistic + server + refresh | wired to updateLeadStage | BLOCKED-AUTH (needs broker session) |
| Non-receiver drag | denied | FORBIDDEN → revert | action returns FORBIDDEN, UI reverts+banner | PASS (code) / runtime BLOCKED-AUTH |
| Empty column | drop target | accepts card | onDrop wired | BLOCKED-AUTH |

## Gates (authenticated runtime evidence unavailable → not full PASS)
- **VISUAL: UNVERIFIED-AUTH** — code-structural match recorded (columns/cards/counts/empty per Batch 7) as supporting evidence only; rendered design-vs-route comparison at desktop viewport not performed (board is behind broker auth; cannot render logged-in via automation).
- **FUNCTIONAL: UNVERIFIED-AUTH** — code-level wiring recorded (data, optimistic+revert, receiver-only action + RLS) as supporting evidence only; live drag persistence + RLS enforcement not executed (no broker session).
- **RESPONSIVE: UNVERIFIED-AUTH** — code-level structure recorded (Kanban `lg+`, list `<lg`, board scrolls in own `overflow-x-auto`) as supporting evidence only; live viewport sweep behind auth not performed.
- **REGRESSION: PASS** — `npm run build` 40/40, `eslint`/`tsc` clean; guest `/dashboard/{broker,builder}/leads` → **307** (route guards intact); `updateLeadStage`/lead data unchanged.

## Missing verification requirement (exact)
Broker session (mobile `9000000012`, dev OTP `123456`) at `/dashboard/broker/leads` on desktop ≥1280px → drag a card between columns → **refresh → stage persists**; confirm a non-receiver session gets FORBIDDEN. Blocked because the split-OTP login widget cannot be driven by available automation (BASELINE_STATUS).

## FINAL
`VISUAL: UNVERIFIED-AUTH` · `FUNCTIONAL: UNVERIFIED-AUTH` · `RESPONSIVE: UNVERIFIED-AUTH` · `REGRESSION: PASS`
→ **FINAL: NOT COMPLETE** (authenticated runtime evidence unavailable — honest per master §16). Implementation is DONE; code-level/build/guard checks recorded as supporting evidence only. Remains IMPLEMENTED; do not reimplement.
