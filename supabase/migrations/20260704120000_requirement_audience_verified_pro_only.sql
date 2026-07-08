-- ============================================================
-- My Gujarat Property — Requirement audience: verified Brokers/Builders only
-- Phase: Prompt 04 Verification fix (BUG-20260704-ENTITY-REQ-AUDIENCE)
-- Locked rule (CLAUDE.md §3A conflict #1 + Batch-5 submit copy):
--   Requirements are visible to VERIFIED Brokers & Builders only —
--   never public, never to guests. (Owners still see their OWN via
--   requirements_owner_read; admin/staff via service role.)
-- Change:
--   1. Replace anon-public read policy `requirements_public_read` with
--      `requirements_verified_pro_read` (verified broker/builder only).
--   2. Recreate `public_requirements_view` WITH (security_invoker = true) so
--      the view respects the caller's RLS instead of the (postgres) owner's —
--      a definer view would otherwise bypass the new restriction.
-- Destructive: No (policy swap + view redefine, no data change)
-- Backup required: No
-- Rollback: notes at bottom
-- ============================================================

-- 1. Base-table read policy: verified Broker/Builder only ---------------------
drop policy if exists "requirements_public_read" on public.requirements;

create policy "requirements_verified_pro_read"
  on public.requirements
  for select
  using (
    visibility_status = 'public'
    and approval_status = 'approved'
    and status = 'published'
    and deleted_at is null
    and exists (
      select 1
      from public.profiles pr
      where pr.auth_user_id = auth.uid()
        and pr.public_role in ('broker', 'builder')
        and pr.verification_status = 'verified'
        and pr.account_status = 'active'
    )
  );

-- 2. Public requirements view → security_invoker (respects caller RLS) --------
--    Column list preserved EXACTLY from the original (still excludes
--    description / exact preferred_locations / admin notes). Only the
--    security_invoker flag is added so the caller's RLS applies.
create or replace view public.public_requirements_view
  with (security_invoker = true) as
  select
    r.id,
    r.title,
    r.slug,
    r.purpose,
    r.category,
    r.requirement_type,
    r.budget_min,
    r.budget_max,
    r.rent_min,
    r.rent_max,
    r.area_min,
    r.area_max,
    r.area_unit,
    r.bedrooms_min,
    r.bedrooms_max,
    r.furnishing_preference,
    r.possession_timeline,
    r.preferred_amenities,
    r.city_id,
    r.locality_id,
    r.city_text,
    r.preferred_localities_text,
    r.contact_visibility,
    r.status,
    r.published_at,
    r.created_at,
    r.public_role as poster_role,
    r.created_by_profile_id
  from public.requirements r
  where r.visibility_status = 'public'
    and r.approval_status = 'approved'
    and r.status = 'published'
    and r.deleted_at is null;

-- ============================================================
-- ROLLBACK (run only to revert):
-- drop policy if exists "requirements_verified_pro_read" on public.requirements;
-- create policy "requirements_public_read" on public.requirements for select
--   using (visibility_status='public' and approval_status='approved'
--          and status='published' and deleted_at is null);
-- create or replace view public.public_requirements_view as ( ... original ... );
-- (Original view had NO security_invoker; same column list.)
-- ============================================================
