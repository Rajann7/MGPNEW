-- ============================================================
-- Phase 3 · B8-S24 Construction Progress
-- Real builder-posted construction milestones/updates for a project.
-- Shows on the builder dashboard AND (for published projects) on the public
-- project detail construction timeline. Idempotent + RLS-enforced.
-- ============================================================

create table if not exists public.project_construction_updates (
  id                uuid primary key default gen_random_uuid(),
  project_id        uuid not null references public.projects(id) on delete cascade,
  stage             text not null check (stage in (
                       'pre_launch', 'under_construction', 'nearing_possession',
                       'ready_to_move', 'completed'
                     )),
  progress_percent  smallint check (progress_percent between 0 and 100),
  title             text not null check (char_length(title) between 1 and 160),
  note              text check (char_length(note) <= 1000),
  update_date       date not null default current_date,
  created_by        uuid references public.profiles(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists idx_pcu_project on public.project_construction_updates(project_id, update_date desc);

drop trigger if exists project_construction_updates_updated_at on public.project_construction_updates;
create trigger project_construction_updates_updated_at
  before update on public.project_construction_updates
  for each row execute function mgp_set_updated_at();

alter table public.project_construction_updates enable row level security;

-- Builder (project owner) full control over their own project's updates.
drop policy if exists "pcu: owner manages own" on public.project_construction_updates;
create policy "pcu: owner manages own"
  on public.project_construction_updates for all
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_construction_updates.project_id
        and p.builder_profile_id = mgp_get_my_profile_id()
    )
  )
  with check (
    exists (
      select 1 from public.projects p
      where p.id = project_construction_updates.project_id
        and p.builder_profile_id = mgp_get_my_profile_id()
    )
  );

-- Public read for updates that belong to a PUBLISHED project (powers the
-- public project-detail construction timeline). No private data is exposed.
drop policy if exists "pcu: public reads published" on public.project_construction_updates;
create policy "pcu: public reads published"
  on public.project_construction_updates for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_construction_updates.project_id
        and p.status = 'published'
    )
  );

-- Rollback (manual):
-- drop table if exists public.project_construction_updates cascade;
