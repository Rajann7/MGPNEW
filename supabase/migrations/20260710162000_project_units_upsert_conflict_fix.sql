-- Batch 5 · Section 2 — live-verified bug: generateWingUnits()
-- (src/lib/actions/units.ts) upserts with
-- `onConflict: "project_id,unit_number"`, but the existing unique index
-- (20260710120000) is partial (`where unit_number is not null`). Postgres
-- rejects ON CONFLICT against a partial index unless the predicate is
-- restated verbatim by the client — the Supabase JS client's `onConflict`
-- string can't do that, so every "Generate units" click failed with
-- 42P10 (no unique/exclusion constraint matching the ON CONFLICT spec).
-- unit_number is always populated at generation time, so the predicate was
-- never actually needed — replace with a plain full unique index.

drop index if exists public.uq_project_units_project_unit_number;
create unique index if not exists uq_project_units_project_unit_number
  on public.project_units(project_id, unit_number);

-- Rollback:
-- drop index if exists public.uq_project_units_project_unit_number;
-- create unique index uq_project_units_project_unit_number on public.project_units(project_id, unit_number) where unit_number is not null;
