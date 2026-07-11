-- Batch 5 · Section 2 — manual-verification-found bug:
-- public_projects_view is defined with an explicit column list that
-- predates construction_percentage/progress_note/video_url (all added in
-- 20260710160000). Postgres views do not auto-inherit new base-table
-- columns, so the public Project Detail page could never read the real
-- values the Step 6/7 wizard copy promises are "shown to buyers" — it
-- silently fell back to a synthetic per-status percentage (exactly the
-- §167 anti-pattern this section exists to remove) and could never surface
-- a real Project Video URL. Recreated with the missing columns appended at
-- the end (`CREATE OR REPLACE VIEW` cannot reorder/insert existing output
-- columns, only append new ones — mid-list placement was tried first and
-- rejected by Postgres with 42P16).

create or replace view public.public_projects_view as
  select
    p.id,
    p.project_name,
    p.slug,
    p.short_description,
    p.project_type,
    p.category,
    p.purpose,
    p.price_min,
    p.price_max,
    p.price_visible,
    p.total_area_value,
    p.total_area_unit,
    p.total_towers,
    p.total_wings,
    p.total_floors,
    p.total_units,
    p.available_units,
    p.unit_configurations,
    p.construction_status,
    p.possession_date,
    p.launch_date,
    p.phase_name,
    p.rera_registered,
    p.rera_number,
    p.rera_status,
    p.rera_disclaimer_required,
    p.amenities,
    p.city_id,
    p.locality_id,
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
    p.virtual_tour_url,
    p.status,
    p.visibility_status,
    p.published_at,
    p.builder_profile_id,
    p.construction_percentage,
    p.progress_note,
    p.video_url
    -- EXCLUDED: admin_review_note, rejection_reason, brochure_media_id (private),
    --           floor_plan_media_ids if private, exact private location
  from public.projects p
  where p.visibility_status = 'public';

-- Rollback: recreate the view without construction_percentage/progress_note/video_url
-- (see 20260630130000_property_project_requirement_system.sql for the original definition).
