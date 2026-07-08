# Contract — T07-11 · Broker CRM Kanban (desktop-only)

**STATUS: IMPLEMENTED — FINAL: NOT COMPLETE (auth runtime gates UNVERIFIED-AUTH)** · Started+built 2026-07-04 · Evidence: verification/T07-11_VERIFY.md
**Design source:** Batch 7 · "Leads / CRM — Kanban view (desktop 1280px+)" (decoded workspace).
**Route:** `/dashboard/broker/leads` (+ builder `/dashboard/builder/leads` reuses).
**Class:** ROUTE_SCREEN variant (desktop) of the Leads/CRM screen. Mobile keeps the existing list (design: Kanban desktop-only).

## Design source (4.1)
Batch 7 shows a horizontal pipeline board of lead cards in stage columns (New · Contacted · Site Visit · Proposal … observed), desktop 1280px+ only; mobile falls back to list.

## Exact visual structure (4.2, top→bottom)
1. Dashboard shell (broker nav) — existing.
2. Screen header "Leads / CRM" — existing.
3. **Desktop (`lg+`): Kanban board** — horizontal scroll row of stage columns; each column = header (stage label + count) + vertical stack of draggable lead cards; empty column shows a dashed drop target.
4. **Mobile (`<lg`): existing `LeadListClient`** (received + my inquiries).

## Legacy UI to remove (4.3)
- The desktop plain vertical list under "Leads Received" is replaced by the Kanban on `lg+` (list retained for mobile only).

## Existing functionality to preserve (4.4)
- `getMyLeadsAsReceiver()` data load (real leads only, no fakes).
- `updateLeadStage(leadId, newStage)` server action (receiver-only; persists `crm_stage`, logs `stage_changed` event; sets terminal status for converted/lost/closed).
- Lead detail navigation (`/dashboard/leads/[id]`), `CrmStageBadge`.

## New functionality (4.5)
- Kanban board with **real drag/drop** → stage mutation → `updateLeadStage` → DB persistence → optimistic move with **revert on failure**.
- Columns derived from real `CrmStage` enum (data authority §1.2): new · contacted · interested · follow_up · site_visit · proposal · negotiation · converted, plus terminal lost · closed.

## Data completeness (4.6)
Design shows sample stages; product's full `CrmStage` set is rendered (all 10 stages).

## Interaction matrix (4.7)
| Element | Action | Expected | Data source | Backend | Persist | Permission | Error | Status |
|---|---|---|---|---|---|---|---|---|
| Lead card | click | → `/dashboard/leads/[id]` | LeadRow | — | — | receiver | — | wired |
| Lead card | drag → column | card moves to stage, badge updates | LeadRow | `updateLeadStage` | yes | receiver-only (RLS+action) | revert + toast on fail | wired |
| Column | drop target | accepts card, calls mutation | — | `updateLeadStage` | yes | receiver | reject non-owner | wired |

## Responsive (4.8)
- `lg+`: Kanban (horizontal scroll, columns ~280px). `<lg`: list fallback (no Kanban) — matches design "desktop-only".
- No page horizontal overflow (board scrolls inside its own container).

## Verification plan
- Code/build/lint/type: performable now.
- Authenticated runtime (drag persistence, RLS): **BLOCKED/UNVERIFIED** — broker session needed; OTP automation unavailable (BASELINE_STATUS). Requirement recorded: manual broker login (mobile 9000000012, dev OTP 123456) → drag a card → refresh → stage persists; verify non-receiver cannot mutate.
