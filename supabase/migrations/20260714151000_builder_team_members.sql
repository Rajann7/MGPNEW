-- ============================================================
-- Phase 3 · B8-S12/S13/S14 Builder Team / Invite / Permissions
-- Real builder team roster: invite agents, assign permission flags, manage
-- status. Invite acceptance links an existing/registered agent profile.
-- Idempotent + RLS-enforced.
-- ============================================================

create table if not exists public.builder_team_members (
  id                  uuid primary key default gen_random_uuid(),
  builder_profile_id  uuid not null references public.profiles(id) on delete cascade,
  member_profile_id   uuid references public.profiles(id) on delete set null,
  invited_name        text check (char_length(invited_name) <= 120),
  invited_email       text check (char_length(invited_email) <= 200),
  invited_mobile      text check (char_length(invited_mobile) <= 20),
  title               text check (char_length(title) <= 80),
  status              text not null default 'invited'
                        check (status in ('invited', 'active', 'suspended', 'removed')),
  permissions         jsonb not null default '{}'::jsonb,
  invite_token        text unique,
  invited_at          timestamptz not null default now(),
  accepted_at         timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists idx_btm_builder on public.builder_team_members(builder_profile_id, status);
create index if not exists idx_btm_member  on public.builder_team_members(member_profile_id);
create unique index if not exists uq_btm_builder_email
  on public.builder_team_members(builder_profile_id, lower(invited_email))
  where invited_email is not null and status <> 'removed';

drop trigger if exists builder_team_members_updated_at on public.builder_team_members;
create trigger builder_team_members_updated_at
  before update on public.builder_team_members
  for each row execute function mgp_set_updated_at();

alter table public.builder_team_members enable row level security;

-- Builder (owner) full control over their own roster.
drop policy if exists "btm: owner manages own" on public.builder_team_members;
create policy "btm: owner manages own"
  on public.builder_team_members for all
  using (builder_profile_id = mgp_get_my_profile_id())
  with check (builder_profile_id = mgp_get_my_profile_id());

-- A linked member can read their own membership row.
drop policy if exists "btm: member reads own" on public.builder_team_members;
create policy "btm: member reads own"
  on public.builder_team_members for select
  using (member_profile_id = mgp_get_my_profile_id());

-- Rollback (manual):
-- drop table if exists public.builder_team_members cascade;
