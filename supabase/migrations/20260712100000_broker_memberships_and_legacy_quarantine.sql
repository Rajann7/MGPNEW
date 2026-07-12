-- ============================================================
-- Phase 4: Broker Agent memberships (invitation-only) and
--          legacy quarantine structure.
-- Canonical: Files 09/30; REM-005 (Builder Agent stays removed —
-- memberships attach ONLY to broker workspaces).
-- Rollback: drop table public.broker_agent_invitations,
--           drop table public.broker_team_members,
--           drop schema legacy_quarantine cascade.
-- ============================================================

-- ---------- Broker Agent invitations ----------
-- An invitation is the ONLY path to Broker Agent membership.
create table if not exists public.broker_agent_invitations (
  id                       uuid primary key default gen_random_uuid(),
  workspace_broker_profile_id uuid not null references public.broker_profiles(id) on delete cascade,
  invited_by_profile_id    uuid not null references public.profiles(id),
  invitee_mobile           text not null,
  invitee_name             text,
  token_hash               text not null unique,
  status                   text not null default 'pending'
                             check (status in ('pending','accepted','declined','revoked','expired')),
  expires_at               timestamptz not null,
  accepted_by_profile_id   uuid references public.profiles(id),
  accepted_at              timestamptz,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists idx_broker_invites_workspace
  on public.broker_agent_invitations(workspace_broker_profile_id);
create index if not exists idx_broker_invites_status
  on public.broker_agent_invitations(status);

-- ---------- Broker team memberships ----------
-- invitation_id is NOT NULL: membership cannot exist without an invitation
-- (Broker Agent is invitation-only by construction).
create table if not exists public.broker_team_members (
  id                       uuid primary key default gen_random_uuid(),
  workspace_broker_profile_id uuid not null references public.broker_profiles(id) on delete cascade,
  member_profile_id        uuid not null references public.profiles(id) on delete cascade,
  invitation_id            uuid not null references public.broker_agent_invitations(id),
  status                   text not null default 'active'
                             check (status in ('active','paused','removed')),
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now(),
  unique (workspace_broker_profile_id, member_profile_id)
);

create index if not exists idx_broker_members_workspace
  on public.broker_team_members(workspace_broker_profile_id);
create index if not exists idx_broker_members_member
  on public.broker_team_members(member_profile_id);

-- updated_at triggers (reuses existing helper)
create trigger trg_broker_invites_updated_at
  before update on public.broker_agent_invitations
  for each row execute function mgp_set_updated_at();
create trigger trg_broker_members_updated_at
  before update on public.broker_team_members
  for each row execute function mgp_set_updated_at();

-- ---------- RLS ----------
alter table public.broker_agent_invitations enable row level security;
alter table public.broker_team_members enable row level security;

-- Workspace broker principal manages their own invitations.
create policy broker_invites_select_own on public.broker_agent_invitations
  for select using (
    workspace_broker_profile_id in (
      select bp.id from public.broker_profiles bp
      where bp.profile_id = mgp_get_my_profile_id()
    )
  );
create policy broker_invites_insert_own on public.broker_agent_invitations
  for insert with check (
    invited_by_profile_id = mgp_get_my_profile_id()
    and workspace_broker_profile_id in (
      select bp.id from public.broker_profiles bp
      where bp.profile_id = mgp_get_my_profile_id()
    )
  );
create policy broker_invites_update_own on public.broker_agent_invitations
  for update using (
    workspace_broker_profile_id in (
      select bp.id from public.broker_profiles bp
      where bp.profile_id = mgp_get_my_profile_id()
    )
  );

-- Memberships: readable by the workspace principal and the member;
-- NO direct insert/update policy for regular users — rows are created
-- exclusively by the security-definer acceptance function below.
create policy broker_members_select_scope on public.broker_team_members
  for select using (
    member_profile_id = mgp_get_my_profile_id()
    or workspace_broker_profile_id in (
      select bp.id from public.broker_profiles bp
      where bp.profile_id = mgp_get_my_profile_id()
    )
  );

-- ---------- Invitation acceptance (the only membership write path) ----------
create or replace function public.mgp_accept_broker_invitation(p_token_hash text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invite public.broker_agent_invitations%rowtype;
  v_profile_id uuid;
  v_membership_id uuid;
begin
  v_profile_id := mgp_get_my_profile_id();
  if v_profile_id is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  select * into v_invite
  from public.broker_agent_invitations
  where token_hash = p_token_hash
    and status = 'pending'
    and expires_at > now()
  for update;

  if not found then
    raise exception 'INVITATION_INVALID_OR_EXPIRED';
  end if;

  update public.broker_agent_invitations
  set status = 'accepted',
      accepted_by_profile_id = v_profile_id,
      accepted_at = now()
  where id = v_invite.id;

  insert into public.broker_team_members
    (workspace_broker_profile_id, member_profile_id, invitation_id)
  values
    (v_invite.workspace_broker_profile_id, v_profile_id, v_invite.id)
  on conflict (workspace_broker_profile_id, member_profile_id)
  do update set status = 'active', invitation_id = v_invite.id
  returning id into v_membership_id;

  return v_membership_id;
end;
$$;

-- ---------- Legacy quarantine ----------
-- Ambiguous legacy records (unknown roles, ownerless rows, removed-feature
-- data encountered during imports) are parked here VERBATIM for manual
-- review. Nothing is auto-converted (Phase 4 rule 10: do not guess
-- ownership or role conversion).
create schema if not exists legacy_quarantine;

create table if not exists legacy_quarantine.records (
  id             uuid primary key default gen_random_uuid(),
  source_table   text not null,
  source_pk      text,
  reason         text not null,
  payload        jsonb not null,
  quarantined_at timestamptz not null default now(),
  reviewed       boolean not null default false,
  review_note    text,
  reviewed_by    uuid,
  reviewed_at    timestamptz
);

comment on table legacy_quarantine.records is
  'Ambiguous legacy rows parked for manual review. No automatic role/ownership conversion is permitted.';

-- Quarantine is service-role/internal only: RLS enabled with no policies
-- means no anon/authenticated access.
alter table legacy_quarantine.records enable row level security;
