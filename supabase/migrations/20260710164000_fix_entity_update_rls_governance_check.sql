-- Batch 5 · Section 2 — live-verified bug (manual verification pass):
-- the `projects_builder_update` / `properties_owner_update` /
-- `requirements_owner_update` RLS `with check` clauses whitelist a fixed
-- set of status/approval_status/visibility_status VALUES on the resulting
-- row — but Postgres re-evaluates `with check` against the entire NEW row
-- on every UPDATE, regardless of which columns actually changed. Once a
-- project/property is genuinely published (approval_status='approved',
-- status='published'), those values are outside the whitelist
-- ('approval_status in (draft,pending)', 'status not in (...published...)')
-- — so ANY subsequent authenticated update to that row (a plain content
-- edit via updateProjectDraft, or the app's own pauseResumeProject) is
-- rejected by Postgres with 42501 (insufficient_privilege), even though
-- the row's governance columns were never touched by that update.
--
-- This silently broke the entire "edit a live listing" flow (Batch 5
-- §45-49, exactly the EditReapprovalGate this section wires up) and
-- pause/resume for every already-approved project/property — caught live
-- while manually verifying this section by clicking "Edit anyway" on a
-- freshly-approved test project and hitting a generic "Something went
-- wrong" on Save.
--
-- Fix: replace the fixed-value whitelist with a trigger that only
-- constrains governance columns when they actually change (comparing
-- OLD vs NEW), allowing exactly the transitions the app's own authenticated
-- (non-service-role) actions perform — draft/need_changes/rejected/
-- published/paused -> submitted (submit for approval), published <-> paused
-- (pause/resume), any -> deleted (soft delete) — and otherwise requiring the
-- (status, visibility_status) pair to already be one of the known-consistent
-- combinations the app produces. Staff/admin actions run under the service
-- role (`createServiceClient()` in src/lib/actions/admin/moderation.ts) and
-- are unaffected by this trigger (it only guards non-service-role writes).

create or replace function public.mgp_guard_entity_governance_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  is_service boolean;
  status_ok boolean := false;
begin
  -- auth.role() is Supabase's JWT-derived role; service-role callers
  -- (staff/admin moderation actions) are never constrained by this guard.
  is_service := (select auth.role()) = 'service_role';
  if is_service then
    return new;
  end if;

  -- Governance columns unchanged: ordinary content-only edit, always allowed
  -- (this is the common case this migration fixes).
  if new.status is not distinct from old.status
     and new.approval_status is not distinct from old.approval_status
     and new.visibility_status is not distinct from old.visibility_status then
    return new;
  end if;

  -- Explicit transitions the app performs via an authenticated (non-service)
  -- client: submit-for-approval, pause/resume, soft delete.
  if new.status = 'submitted'
     and old.status in ('draft', 'need_changes', 'rejected', 'published', 'paused')
     and new.approval_status = 'pending'
     and new.visibility_status = 'private' then
    status_ok := true;
  elsif old.status = 'published' and new.status = 'paused'
     and new.approval_status is not distinct from old.approval_status
     and new.visibility_status = 'paused' then
    status_ok := true;
  elsif old.status = 'paused' and new.status = 'published'
     and new.approval_status is not distinct from old.approval_status
     and new.visibility_status = 'public' then
    status_ok := true;
  elsif new.status = 'deleted' and new.visibility_status = 'deleted' then
    status_ok := true;
  end if;

  if not status_ok then
    raise exception 'FORBIDDEN: this status/approval/visibility change requires staff action (got status=%, approval_status=%, visibility_status=%)',
      new.status, new.approval_status, new.visibility_status
      using errcode = '42501';
  end if;

  return new;
end;
$$;

-- ------------------------------------------------------------
-- projects
-- ------------------------------------------------------------
drop trigger if exists projects_guard_governance on public.projects;
create trigger projects_guard_governance
  before update on public.projects
  for each row execute function public.mgp_guard_entity_governance_fields();

drop policy if exists "projects_builder_update" on public.projects;
create policy "projects_builder_update"
  on public.projects
  for update
  using (
    builder_profile_id = mgp_get_my_profile_id()
    and deleted_at is null
  )
  with check (
    builder_profile_id = mgp_get_my_profile_id()
  );

-- ------------------------------------------------------------
-- properties
-- ------------------------------------------------------------
drop trigger if exists properties_guard_governance on public.properties;
create trigger properties_guard_governance
  before update on public.properties
  for each row execute function public.mgp_guard_entity_governance_fields();

drop policy if exists "properties_owner_update" on public.properties;
create policy "properties_owner_update"
  on public.properties
  for update
  using (
    owner_profile_id = mgp_get_my_profile_id()
    and deleted_at is null
  )
  with check (
    owner_profile_id = mgp_get_my_profile_id()
  );

-- ------------------------------------------------------------
-- requirements (same pre-existing bug pattern; fixed alongside so the
-- upcoming Batch 5 · Section 3 Requirement Wizard verification doesn't hit
-- the identical issue)
-- ------------------------------------------------------------
drop trigger if exists requirements_guard_governance on public.requirements;
create trigger requirements_guard_governance
  before update on public.requirements
  for each row execute function public.mgp_guard_entity_governance_fields();

drop policy if exists "requirements_owner_update" on public.requirements;
create policy "requirements_owner_update"
  on public.requirements
  for update
  using (
    created_by_profile_id = mgp_get_my_profile_id()
    and deleted_at is null
  )
  with check (
    created_by_profile_id = mgp_get_my_profile_id()
  );

-- Rollback:
-- drop trigger if exists projects_guard_governance on public.projects;
-- drop trigger if exists properties_guard_governance on public.properties;
-- drop trigger if exists requirements_guard_governance on public.requirements;
-- drop function if exists public.mgp_guard_entity_governance_fields();
-- (then recreate the three original with-check policies from
--  20260630130000_property_project_requirement_system.sql)
