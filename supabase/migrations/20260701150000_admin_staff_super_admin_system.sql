-- ============================================================
-- Migration: Admin, Staff And Super Admin System
-- Phase: Prompt 07
-- Purpose: Extend staff_permissions with high-risk permission
--          dimensions; add admin_audit_logs (broad internal audit
--          trail), admin_action_requests/admin_action_approvals
--          (maker-checker foundation), and admin_internal_notes
--          (user-level internal notes — entity-level notes already
--          exist as entity_moderation_notes from Prompt 04).
-- Tables created: admin_audit_logs, admin_action_requests,
--                 admin_action_approvals, admin_internal_notes
-- Tables altered: staff_permissions (6 new permission columns)
-- Views: none
-- RLS: enabled on all new tables, deny-all-direct-client
--      (service-role only, same pattern as entity_moderation_notes
--      / entity_status_events from Prompt 04)
-- Indexes: see bottom section
-- Destructive: No (additive only)
-- Backup required: No (new tables + additive columns, no data loss)
-- Rollback: see commented DROP statements at bottom
-- ============================================================

-- ============================================================
-- ALTER: staff_permissions — add high-risk permission dimensions
-- ============================================================

alter table public.staff_permissions
  add column if not exists can_manage_provider      boolean not null default false,
  add column if not exists can_manage_security       boolean not null default false,
  add column if not exists can_manage_payment        boolean not null default false,
  add column if not exists can_manage_staff          boolean not null default false,
  add column if not exists can_manage_feature_flags  boolean not null default false,
  add column if not exists can_manage_system          boolean not null default false,
  add column if not exists created_by_staff_id       uuid references public.staff_profiles(id) on delete set null;

-- ============================================================
-- TABLE: admin_audit_logs
-- Broad, append-only internal action audit trail.
-- Distinct from auth_audit_events (Prompt 02), which only covers
-- auth/login events with a narrow event_type enum. This table
-- covers every internal moderation/staff/user/provider/export
-- action with before/after snapshots and actor context.
-- Insert via service role only. No update/delete allowed from
-- the application layer (append-only by convention).
-- ============================================================

create table if not exists public.admin_audit_logs (
  id                     uuid primary key default gen_random_uuid(),
  actor_staff_profile_id uuid references public.staff_profiles(id) on delete set null,
  actor_internal_role    text,
  action                 text not null,
  module                 text not null,
  target_type            text,
  target_id              uuid,
  target_profile_id      uuid references public.profiles(id) on delete set null,
  before_snapshot_safe   jsonb,
  after_snapshot_safe    jsonb,
  metadata_safe          jsonb,
  ip_hash                text,
  user_agent_hash        text,
  request_id             text,
  created_at             timestamptz not null default now()
);

-- ============================================================
-- TABLE: admin_action_requests / admin_action_approvals
-- Maker-checker foundation for high-risk actions (staff
-- permission changes, provider settings, refunds, bans, bulk
-- actions, private doc export, secret rotation, feature flag
-- production changes, maintenance mode, security setting
-- changes). Foundation only — full workflow wiring for every
-- action type is a future phase; the tables + status lifecycle
-- exist now so high-risk actions can be routed through it.
-- ============================================================

create table if not exists public.admin_action_requests (
  id                     uuid primary key default gen_random_uuid(),
  action_type            text not null,
  module                 text not null,
  target_type            text,
  target_id              uuid,
  requested_by_staff_id  uuid not null references public.staff_profiles(id) on delete cascade,
  payload_safe           jsonb,
  reason                 text,
  status                 text not null default 'pending_approval'
                           check (status in (
                             'draft', 'pending_approval', 'approved',
                             'rejected', 'cancelled', 'executed', 'expired'
                           )),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create trigger admin_action_requests_updated_at
  before update on public.admin_action_requests
  for each row execute function mgp_set_updated_at();

create table if not exists public.admin_action_approvals (
  id                     uuid primary key default gen_random_uuid(),
  request_id             uuid not null references public.admin_action_requests(id) on delete cascade,
  approved_by_staff_id   uuid references public.staff_profiles(id) on delete set null,
  decision               text not null check (decision in ('approved', 'rejected')),
  note                   text,
  created_at             timestamptz not null default now()
);

-- ============================================================
-- TABLE: admin_internal_notes
-- Internal staff notes on users (profiles). Entity-level notes
-- (property/project/requirement) already exist as
-- entity_moderation_notes from Prompt 04 — this table covers the
-- user-management side only, using the same private pattern.
-- ============================================================

create table if not exists public.admin_internal_notes (
  id               uuid primary key default gen_random_uuid(),
  target_profile_id uuid not null references public.profiles(id) on delete cascade,
  staff_profile_id uuid references public.staff_profiles(id) on delete set null,
  note             text not null,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_admin_audit_logs_actor       on public.admin_audit_logs(actor_staff_profile_id);
create index if not exists idx_admin_audit_logs_module      on public.admin_audit_logs(module);
create index if not exists idx_admin_audit_logs_action      on public.admin_audit_logs(action);
create index if not exists idx_admin_audit_logs_target      on public.admin_audit_logs(target_type, target_id);
create index if not exists idx_admin_audit_logs_created_at  on public.admin_audit_logs(created_at desc);

create index if not exists idx_admin_action_requests_status on public.admin_action_requests(status);
create index if not exists idx_admin_action_requests_type   on public.admin_action_requests(action_type);
create index if not exists idx_admin_action_approvals_req   on public.admin_action_approvals(request_id);

create index if not exists idx_admin_internal_notes_profile on public.admin_internal_notes(target_profile_id);

-- ============================================================
-- RLS: enable + deny-all-direct-client (service role only)
-- Same pattern as entity_moderation_notes / entity_status_events:
-- all admin reads/writes happen server-side via requireStaffPermission
-- + the service-role client, never via the anon-key client.
-- ============================================================

alter table public.admin_audit_logs       enable row level security;
alter table public.admin_action_requests  enable row level security;
alter table public.admin_action_approvals enable row level security;
alter table public.admin_internal_notes   enable row level security;

create policy "admin_audit_logs_private"
  on public.admin_audit_logs
  for select
  using (false);

create policy "admin_action_requests_private"
  on public.admin_action_requests
  for select
  using (false);

create policy "admin_action_approvals_private"
  on public.admin_action_approvals
  for select
  using (false);

create policy "admin_internal_notes_private"
  on public.admin_internal_notes
  for select
  using (false);

-- ============================================================
-- ROLLBACK NOTES
-- Destructive: No. All changes are additive (new tables + new
-- nullable/defaulted columns). Safe to leave in place if rolled
-- back at the application layer. If a full DB rollback is ever
-- required, run the commented statements below in order.
-- ============================================================

-- drop policy if exists "admin_internal_notes_private" on public.admin_internal_notes;
-- drop policy if exists "admin_action_approvals_private" on public.admin_action_approvals;
-- drop policy if exists "admin_action_requests_private" on public.admin_action_requests;
-- drop policy if exists "admin_audit_logs_private" on public.admin_audit_logs;
-- drop table if exists public.admin_internal_notes cascade;
-- drop table if exists public.admin_action_approvals cascade;
-- drop table if exists public.admin_action_requests cascade;
-- drop table if exists public.admin_audit_logs cascade;
-- alter table public.staff_permissions
--   drop column if exists can_manage_provider,
--   drop column if exists can_manage_security,
--   drop column if exists can_manage_payment,
--   drop column if exists can_manage_staff,
--   drop column if exists can_manage_feature_flags,
--   drop column if exists can_manage_system,
--   drop column if exists created_by_staff_id;
