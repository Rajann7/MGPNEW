-- ============================================================
-- My Gujarat Property — Public Search, Detail Pages, Profiles And SEO
-- Phase: Prompt 05
-- Date: 2026-07-01
-- Purpose: fix public_properties_view (missing `description` column —
--          property detail page requires it per docs/06 + Prompt 05 spec).
--          Description is public-safe (already user-authored listing copy,
--          shown after approval) — no privacy concern.
-- Views changed: public_properties_view (add description column only)
-- RLS changes: none (view definition only, same WHERE clause)
-- Destructive: No (CREATE OR REPLACE VIEW, additive column only)
-- Backup required: No
-- Rollback: re-run the previous CREATE OR REPLACE VIEW from
--           20260630130000_property_project_requirement_system.sql
--           (without the description column) to revert.
-- ============================================================

create or replace view public.public_properties_view as
  select
    p.id,
    p.title,
    p.slug,
    p.purpose,
    p.category,
    p.property_type,
    p.price,
    p.rent_amount,
    p.deposit_amount,
    p.price_negotiable,
    p.area_value,
    p.area_unit,
    p.built_up_area,
    p.carpet_area,
    p.plot_area,
    p.bedrooms,
    p.bathrooms,
    p.balconies,
    p.floor_number,
    p.total_floors,
    p.furnishing_status,
    p.property_age,
    p.possession_status,
    p.available_from,
    p.facing,
    p.parking,
    p.amenities,
    p.city_id,
    p.locality_id,
    p.society_id,
    p.building_name,
    p.landmark,
    p.city_text,
    p.locality_text,
    p.pin_code,
    case when p.map_visibility = 'exact' then p.latitude else null end as latitude,
    case when p.map_visibility = 'exact' then p.longitude else null end as longitude,
    case when p.map_visibility in ('approximate', 'exact') then round(p.latitude::numeric, 2) else null end as approx_latitude,
    case when p.map_visibility in ('approximate', 'exact') then round(p.longitude::numeric, 2) else null end as approx_longitude,
    p.cover_media_id,
    p.media_count,
    p.contact_visibility,
    p.status,
    p.visibility_status,
    p.published_at,
    p.expires_at,
    p.created_at,
    p.updated_at,
    p.public_role as poster_role,
    p.owner_profile_id,
    p.description
    -- EXCLUDED: admin_review_note, rejection_reason, need_changes_reason,
    --           address_line (full), mobile, email, exact private location
  from public.properties p
  where p.visibility_status = 'public'
    and p.approval_status = 'approved'
    and p.status = 'published'
    and p.deleted_at is null;

-- Rollback (manual): re-create the view without `p.description` if needed.
