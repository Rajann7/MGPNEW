-- Batch 5 · Section 2 (Post Project Wizard, 10 steps) — remaining gap:
-- truthful construction-progress foundation. Timelines & Progress (step 6)
-- must store a real builder-entered percentage, never a synthetic value
-- derived from `construction_status` (Batch 5 §167-169). This is the
-- foundation column; Batch 8 Construction Progress updates read/write the
-- same column and `progress_updated_at` (no duplicate progress system).

alter table public.projects
  add column if not exists construction_percentage smallint,
  add column if not exists progress_note text,
  add column if not exists progress_updated_at timestamptz;

alter table public.projects
  drop constraint if exists projects_construction_percentage_range;
alter table public.projects
  add constraint projects_construction_percentage_range
  check (
    construction_percentage is null
    or (construction_percentage >= 0 and construction_percentage <= 100)
  );

comment on column public.projects.construction_percentage is
  'Real builder-entered progress % (0-100). Never derived/faked from construction_status.';

-- Rollback:
-- alter table public.projects drop constraint if exists projects_construction_percentage_range;
-- alter table public.projects drop column if exists construction_percentage, drop column if exists progress_note, drop column if exists progress_updated_at;
