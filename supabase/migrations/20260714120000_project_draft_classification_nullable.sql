-- ============================================================
-- My Gujarat Property — Fix: Project wizard could not save a step-1 draft
-- Date: 2026-07-14
-- Root cause (BUG-2026-07-14-01): the Batch 5 draft migration
--   (20260710120000) relaxed properties.purpose/category/property_type to allow
--   partial drafts, but the SAME relaxation was never applied to `projects`.
--   projects.project_type/category/purpose stayed NOT NULL, yet the project
--   wizard collects project_type only on Step 2 — so the Step-1 draft insert
--   (createProjectDraft) always violated NOT NULL and the wizard could never
--   advance past Step 1 ("Something went wrong").
-- Fix: mirror the properties treatment exactly — allow these three columns to be
--   NULL while status='draft', but REQUIRE all three for every non-draft status
--   (enforced by a conditional CHECK, same shape as properties_classification_required).
-- Destructive: No — additive/relaxing only. Existing rows all satisfy the new
--   check (published/other projects already have the values set).
-- Rollback: see commented statements at bottom.
-- ============================================================

alter table public.projects alter column project_type drop not null;
alter table public.projects alter column category drop not null;
alter table public.projects alter column purpose drop not null;

alter table public.projects
  drop constraint if exists projects_classification_required;
alter table public.projects
  add constraint projects_classification_required
  check (
    status = 'draft'
    or (project_type is not null and category is not null and purpose is not null)
  );

-- ============================================================
-- ROLLBACK (manual — only safe if no draft rows have null classification):
-- alter table public.projects drop constraint if exists projects_classification_required;
-- alter table public.projects alter column purpose set not null;
-- alter table public.projects alter column category set not null;
-- alter table public.projects alter column project_type set not null;
-- ============================================================
