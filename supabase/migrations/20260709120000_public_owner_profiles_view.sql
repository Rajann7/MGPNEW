-- ============================================================
-- Migration: public_owner_profiles_view
-- Public-safe owner profile (design Batch 4 · Screen 6 — "minimal by
-- default"). owner_profiles.privacy_level already exists and defaults to
-- 'private' (no public row = 404 on /owner/[id]) — this view just exposes
-- the real opt-in rows (semi_public/public) with zero private fields.
-- Destructive: No (additive view only).
-- Rollback: drop view if exists public.public_owner_profiles_view;
-- ============================================================

create or replace view public.public_owner_profiles_view as
  select
    op.profile_id,
    coalesce(op.public_display_name, p.display_name) as display_name,
    p.avatar_media_id,
    p.city_id,
    p.verification_status,
    p.created_at
  from public.owner_profiles op
  join public.profiles p on p.id = op.profile_id
  where
    op.privacy_level in ('semi_public', 'public')
    and p.account_status = 'active'
    and p.deleted_at is null;
