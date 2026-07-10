-- ============================================================
-- My Gujarat Property — Batch 4 (Detail Pages): explicit contact reveal
-- Phase: Design Batch 4 / BATCH_04_FULL_DESIGN_FUNCTIONALITY_VERIFICATION_SPEC §7-8, §44-46, §244, §251-252
-- Date: 2026-07-10
-- Purpose:
--   1. contact_reveal_events — immutable per-viewer reveal ledger so a full
--      phone number is only returned AFTER an explicit, server-authorised
--      Reveal action (masked-until-reveal design). Idempotent via unique key.
--   2. public_properties_view — add public-safe poster identity columns
--      (display name / member-since / verified) so the contact card shows
--      real data instead of a generic role label (spec §43). No private
--      columns (mobile/email) are exposed.
--   3. notifications.notification_type — allow 'contact_revealed'.
-- RLS: contact_reveal_events enabled; requester may SELECT own rows only;
--      INSERT/UPDATE/DELETE are service-role-only (no policies) and the
--      table is treated as append-only by application code.
-- Destructive: No (new table, additive view columns, widened check).
-- Rollback: drop table public.contact_reveal_events;
--           re-run previous public_properties_view definition
--           (20260701140000) ; restore previous notifications check.
-- ============================================================

-- 1. Immutable reveal-event ledger --------------------------------

create table if not exists public.contact_reveal_events (
  id                        uuid primary key default gen_random_uuid(),
  requester_profile_id      uuid not null references public.profiles(id) on delete cascade,
  contact_owner_profile_id  uuid not null references public.profiles(id) on delete cascade,
  target_type               text not null check (target_type in
                              ('property', 'project', 'broker_profile', 'builder_profile')),
  target_id                 uuid not null,
  policy_basis              text not null check (policy_basis in
                              ('public', 'show_after_login', 'show_to_verified_users',
                               'approved_contact_request')),
  revealed_at               timestamptz not null default now(),
  -- one reveal event per viewer+target — repeat reveals return the existing
  -- authorised result without a duplicate event/quota charge (spec §252)
  unique (requester_profile_id, target_type, target_id)
);

create index if not exists idx_contact_reveal_events_owner
  on public.contact_reveal_events(contact_owner_profile_id);
create index if not exists idx_contact_reveal_events_target
  on public.contact_reveal_events(target_type, target_id);

alter table public.contact_reveal_events enable row level security;

-- Requester may read their own reveal history (used to re-show an already
-- revealed number after refresh). No insert/update/delete policies: writes
-- happen only through the trusted server action via the service role.
drop policy if exists contact_reveal_events_own_read on public.contact_reveal_events;
create policy contact_reveal_events_own_read
  on public.contact_reveal_events for select
  using (requester_profile_id = (select p.id from public.profiles p where p.auth_user_id = auth.uid()));

-- 2. Poster public-safe identity on the property view -------------

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
    p.description,
    -- Batch 4 §43: public-safe poster identity (never phone/email)
    pr.display_name as poster_display_name,
    pr.created_at   as poster_member_since,
    (pr.verification_status = 'verified') as poster_verified
    -- EXCLUDED: admin_review_note, rejection_reason, need_changes_reason,
    --           address_line (full), mobile, email, exact private location
  from public.properties p
  left join public.profiles pr on pr.id = p.owner_profile_id
  where p.visibility_status = 'public'
    and p.approval_status = 'approved'
    and p.status = 'published'
    and p.deleted_at is null;

-- 3. Allow 'contact_revealed' notifications ------------------------

alter table public.notifications
  drop constraint if exists notifications_notification_type_check;
alter table public.notifications
  add constraint notifications_notification_type_check
  check (notification_type in (
    'new_lead', 'contact_requested', 'contact_approved', 'contact_rejected',
    'contact_revealed',
    'new_message', 'proposal_sent', 'proposal_viewed', 'proposal_accepted',
    'proposal_rejected', 'site_visit_requested', 'site_visit_scheduled',
    'site_visit_rescheduled', 'site_visit_cancelled', 'followup_due'
  ));
