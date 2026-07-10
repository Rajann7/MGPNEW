-- ============================================================
-- My Gujarat Property — Design Batch 5: Posting Wizards
-- Date: 2026-07-10
-- Scope:
--   1. Partial first-step property drafts (classification nullable while draft)
--   2. Wizard step persistence (current_step) on all 3 entities
--   3. Structured preferred contact time (properties, projects)
--   4. Requirement: human display id (REQ-NNNN), loan_preapproved,
--      broker_contact_preference, bedroom_options
--   5. project_wings structured wing model (feeds unit generation)
--   6. project_units: wing FK, version (stale-write protection),
--      unit-number idempotency index
--   7. project_unit_events audit/history table
--   8. mgp_increment_usage RPC (atomic quota accounting)
-- Destructive: No (relaxes 3 NOT NULLs on properties, guarded by a
--   status-scoped CHECK; everything else additive)
-- Rollback: see commented DROPs at bottom
-- ============================================================

-- ------------------------------------------------------------
-- 1. Partial property drafts: purpose/category/property_type may be
--    empty while status='draft'; required for every other status.
-- ------------------------------------------------------------
alter table public.properties alter column purpose drop not null;
alter table public.properties alter column category drop not null;
alter table public.properties alter column property_type drop not null;

alter table public.properties
  drop constraint if exists properties_classification_required;
alter table public.properties
  add constraint properties_classification_required
  check (
    status = 'draft'
    or (purpose is not null and category is not null and property_type is not null)
  );

-- ------------------------------------------------------------
-- 2. Wizard step persistence (resume exact step, "X of N steps done")
-- ------------------------------------------------------------
alter table public.properties
  add column if not exists current_step smallint not null default 1
  check (current_step between 1 and 20);
alter table public.projects
  add column if not exists current_step smallint not null default 1
  check (current_step between 1 and 20);
alter table public.requirements
  add column if not exists current_step smallint not null default 1
  check (current_step between 1 and 20);

-- ------------------------------------------------------------
-- 3. Structured preferred contact time (Batch 5 Contact step)
-- ------------------------------------------------------------
alter table public.properties
  add column if not exists preferred_contact_time text
  check (preferred_contact_time in ('anytime', 'morning_9_1', 'evening_5_9'));
alter table public.projects
  add column if not exists preferred_contact_time text
  check (preferred_contact_time in ('anytime', 'morning_9_1', 'evening_5_9'));
alter table public.requirements
  add column if not exists preferred_contact_time text
  check (preferred_contact_time in ('anytime', 'morning_9_1', 'evening_5_9'));

-- Project video URL — separate from the existing virtual_tour_url
-- (Batch 5 §175-176: Video and 360 Tour are distinct fields)
alter table public.projects
  add column if not exists video_url text check (char_length(video_url) <= 500);

-- ------------------------------------------------------------
-- 4. Requirement structured fields + human display id
-- ------------------------------------------------------------
alter table public.requirements
  add column if not exists loan_preapproved boolean not null default false;
alter table public.requirements
  add column if not exists broker_contact_preference text not null default 'in_app_only'
  check (broker_contact_preference in ('in_app_only', 'calls_ok'));
-- Multi-select BHK preferences, e.g. [2,3] ("4" means 4+; see app semantics)
alter table public.requirements
  add column if not exists bedroom_options jsonb not null default '[]'::jsonb;

create sequence if not exists public.requirement_display_seq start 2001;

alter table public.requirements
  add column if not exists display_id text unique;

create or replace function public.mgp_set_requirement_display_id()
returns trigger
language plpgsql
as $$
begin
  if new.display_id is null then
    new.display_id := 'REQ-' || nextval('public.requirement_display_seq')::text;
  end if;
  return new;
end;
$$;

drop trigger if exists requirements_display_id on public.requirements;
create trigger requirements_display_id
  before insert on public.requirements
  for each row execute function public.mgp_set_requirement_display_id();

-- Backfill existing rows
update public.requirements
set display_id = 'REQ-' || nextval('public.requirement_display_seq')::text
where display_id is null;

-- ------------------------------------------------------------
-- 5. Structured wing model (Project → Wing → Floor → Unit)
-- ------------------------------------------------------------
create table if not exists public.project_wings (
  id               uuid primary key default gen_random_uuid(),
  project_id       uuid not null references public.projects(id) on delete cascade,
  wing_name        text not null check (char_length(wing_name) between 1 and 50),
  floors           smallint not null check (floors between 1 and 200),
  units_per_floor  smallint not null check (units_per_floor between 1 and 50),
  sort_order       smallint not null default 0,
  units_generated  boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (project_id, wing_name)
);

create trigger project_wings_updated_at
  before update on public.project_wings
  for each row execute function mgp_set_updated_at();

create index if not exists idx_project_wings_project_id
  on public.project_wings(project_id);

alter table public.project_wings enable row level security;

create policy "project_wings_builder_read"
  on public.project_wings
  for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id
        and p.builder_profile_id = mgp_get_my_profile_id()
    )
  );

create policy "project_wings_builder_insert"
  on public.project_wings
  for insert
  with check (
    mgp_get_my_public_role() = 'builder'
    and exists (
      select 1 from public.projects p
      where p.id = project_id
        and p.builder_profile_id = mgp_get_my_profile_id()
    )
  );

create policy "project_wings_builder_update"
  on public.project_wings
  for update
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id
        and p.builder_profile_id = mgp_get_my_profile_id()
    )
  );

create policy "project_wings_builder_delete"
  on public.project_wings
  for delete
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id
        and p.builder_profile_id = mgp_get_my_profile_id()
    )
  );

-- ------------------------------------------------------------
-- 6. project_units: wing FK + optimistic-concurrency version +
--    idempotent generation (unique unit number per project)
-- ------------------------------------------------------------
alter table public.project_units
  add column if not exists wing_id uuid references public.project_wings(id) on delete set null;
alter table public.project_units
  add column if not exists version integer not null default 1;

create or replace function public.mgp_bump_unit_version()
returns trigger
language plpgsql
as $$
begin
  new.version := old.version + 1;
  return new;
end;
$$;

drop trigger if exists project_units_bump_version on public.project_units;
create trigger project_units_bump_version
  before update on public.project_units
  for each row execute function public.mgp_bump_unit_version();

-- Idempotent generation: a unit number exists once per project
create unique index if not exists uq_project_units_project_unit_number
  on public.project_units(project_id, unit_number)
  where unit_number is not null;

create index if not exists idx_project_units_wing_id
  on public.project_units(wing_id);
create index if not exists idx_project_units_project_status
  on public.project_units(project_id, availability_status);

-- ------------------------------------------------------------
-- 7. Unit status/price history (audit)
-- ------------------------------------------------------------
create table if not exists public.project_unit_events (
  id                 uuid primary key default gen_random_uuid(),
  unit_id            uuid not null references public.project_units(id) on delete cascade,
  project_id         uuid not null references public.projects(id) on delete cascade,
  actor_profile_id   uuid references public.profiles(id) on delete set null,
  action             text not null check (action in (
                       'status_change', 'price_change', 'generated', 'edited'
                     )),
  old_status         text,
  new_status         text,
  old_price          numeric(14,2),
  new_price          numeric(14,2),
  source             text not null default 'single'
                       check (source in ('single', 'bulk', 'generation')),
  created_at         timestamptz not null default now()
);

create index if not exists idx_project_unit_events_unit_id
  on public.project_unit_events(unit_id);
create index if not exists idx_project_unit_events_project_id
  on public.project_unit_events(project_id);

alter table public.project_unit_events enable row level security;

create policy "project_unit_events_builder_read"
  on public.project_unit_events
  for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id
        and p.builder_profile_id = mgp_get_my_profile_id()
    )
  );

create policy "project_unit_events_builder_insert"
  on public.project_unit_events
  for insert
  with check (
    mgp_get_my_public_role() = 'builder'
    and exists (
      select 1 from public.projects p
      where p.id = project_id
        and p.builder_profile_id = mgp_get_my_profile_id()
    )
  );

-- No update/delete policies: audit rows are immutable to users.

-- ------------------------------------------------------------
-- 8. Atomic usage accounting (replaces racy read-then-write)
--    SECURITY DEFINER so it can be called from trusted server
--    actions via service or user client; single upsert statement.
-- ------------------------------------------------------------
create or replace function public.mgp_increment_usage(
  p_profile_id uuid,
  p_role text,
  p_feature_key text,
  p_period_start date default current_date
)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.usage_counters (profile_id, role, feature_key, period_start, used_count)
  values (p_profile_id, p_role, p_feature_key, p_period_start, 1)
  on conflict (profile_id, feature_key, period_start)
  do update set used_count = public.usage_counters.used_count + 1;
$$;

-- Only server-side roles may execute (never anon/authenticated directly)
revoke all on function public.mgp_increment_usage(uuid, text, text, date) from public;
revoke all on function public.mgp_increment_usage(uuid, text, text, date) from anon;
revoke all on function public.mgp_increment_usage(uuid, text, text, date) from authenticated;
grant execute on function public.mgp_increment_usage(uuid, text, text, date) to service_role;

-- ============================================================
-- ROLLBACK (manual)
-- drop function if exists public.mgp_increment_usage(uuid, text, text, date);
-- drop table if exists public.project_unit_events;
-- drop trigger if exists project_units_bump_version on public.project_units;
-- drop function if exists public.mgp_bump_unit_version();
-- drop index if exists uq_project_units_project_unit_number;
-- alter table public.project_units drop column if exists version, drop column if exists wing_id;
-- drop table if exists public.project_wings;
-- drop trigger if exists requirements_display_id on public.requirements;
-- drop function if exists public.mgp_set_requirement_display_id();
-- alter table public.requirements drop column if exists display_id, drop column if exists bedroom_options,
--   drop column if exists broker_contact_preference, drop column if exists loan_preapproved;
-- drop sequence if exists public.requirement_display_seq;
-- alter table public.properties drop constraint if exists properties_classification_required;
-- (re-adding NOT NULLs requires data cleanup first)
-- ============================================================
