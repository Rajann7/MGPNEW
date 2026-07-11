-- Batch 5 · Section 2 follow-up: the previous migration
-- (20260710160000_project_wizard_progress_gap.sql) was edited after already
-- being applied once via `supabase db push`, so its added project_type
-- statements never reached the remote database (CLI only diffs by
-- filename/checksum against already-applied migrations). Re-issued here as
-- its own migration so the reviewed `supabase db push` path applies it.
--
-- First-step draft problem (§16-19), same fix already applied to
-- properties.property_type in 20260710120000: project_type is chosen on
-- Step 2, not Step 1, so the draft-level DB must not force it just to
-- create a Step-1 draft. Still required for every non-draft status via a
-- guarded CHECK.

alter table public.projects alter column project_type drop not null;

alter table public.projects
  drop constraint if exists projects_classification_required;
alter table public.projects
  add constraint projects_classification_required
  check (status = 'draft' or project_type is not null);

-- Rollback:
-- alter table public.projects drop constraint if exists projects_classification_required;
-- alter table public.projects alter column project_type set not null;
