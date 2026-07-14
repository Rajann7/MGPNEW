-- =============================================================================
-- My Gujarat Property — Migration: Homepage Banner Ads (city-targeted)
-- Tables: banner_ads, banner_ad_targets
-- Storage: banner-ads (public bucket)
--
-- Replaces the earlier ad_campaigns concept. Banner ads promote one of the
-- advertiser's PUBLISHED projects (Housing.com "Top picks" style): the card
-- (name, price, BHK, location) is built by the platform from the linked project
-- and the advertiser only uploads the creative image(s).
--
-- Payment/billing is provider-gated (Razorpay for ads not wired) → payment_status
-- defaults to 'not_required' and ads go live via admin approval. We NEVER fake a
-- successful payment or an active/approved status. Idempotent + RLS-safe.
--
-- Depends on: profiles (20260630120000), projects (20260630130000),
--             mgp_set_updated_at() (20260630120000).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Remove the superseded ad_campaigns system (replaced by banner_ads).
-- ---------------------------------------------------------------------------
drop table if exists public.ad_campaigns cascade;

-- ---------------------------------------------------------------------------
-- banner_ads — one row per advertiser campaign (homepage carousel placement).
-- Public display REQUIRES, all together:
--   approval_status = 'approved'
--   status          = 'active'
--   payment_status in ('not_required','success')
--   is_paused       = false
--   start_date <= current_date <= end_date
-- ---------------------------------------------------------------------------
create table if not exists public.banner_ads (
  id                    uuid primary key default gen_random_uuid(),
  advertiser_profile_id uuid not null references public.profiles(id) on delete cascade,
  advertiser_role       text not null,                     -- public role slug at creation
  advertiser_name       text,                              -- display brand (builder)

  -- Promoted project (card + link are derived from this listing)
  project_id            uuid references public.projects(id) on delete set null,

  -- Creative
  title                 text not null,
  cta_label             text not null default 'Contact',
  destination_url       text not null default '/search',   -- INTERNAL path only (validated server-side)
  placement             text not null default 'homepage',

  -- Device images (public bucket URLs + storage paths for cleanup)
  desktop_image_url     text,
  desktop_image_path    text,
  mobile_image_url      text,
  mobile_image_path     text,

  -- Targeting
  gujarat_wide          boolean not null default false,

  -- Scheduling
  duration_days         int not null default 7,
  start_date            date,
  end_date              date,

  -- Lifecycle / moderation
  status                text not null default 'draft'
    check (status in ('draft','pending','active','rejected','needs_changes','paused','expired','archived')),
  approval_status       text not null default 'pending'
    check (approval_status in ('pending','approved','rejected','needs_changes')),
  payment_status        text not null default 'not_required'
    check (payment_status in ('not_required','pending','success','failed','cancelled','refunded')),
  is_paused             boolean not null default false,
  rejection_reason      text,

  approved_at           timestamptz,
  approved_by           uuid,                              -- staff_profiles.id (moderator)
  submitted_at          timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

drop trigger if exists banner_ads_updated_at on public.banner_ads;
create trigger banner_ads_updated_at before update on public.banner_ads
  for each row execute function public.mgp_set_updated_at();

create index if not exists idx_banner_ads_advertiser on public.banner_ads(advertiser_profile_id);
create index if not exists idx_banner_ads_public on public.banner_ads(approval_status, status, is_paused);
create index if not exists idx_banner_ads_dates on public.banner_ads(start_date, end_date);
create index if not exists idx_banner_ads_project on public.banner_ads(project_id);

-- ---------------------------------------------------------------------------
-- banner_ad_targets — target cities for an ad (multi-city). Gujarat-wide ads use
-- banner_ads.gujarat_wide instead and may have zero target rows.
-- ---------------------------------------------------------------------------
create table if not exists public.banner_ad_targets (
  id        uuid primary key default gen_random_uuid(),
  ad_id     uuid not null references public.banner_ads(id) on delete cascade,
  city_slug text not null,
  city_name text not null
);
create index if not exists idx_banner_ad_targets_ad on public.banner_ad_targets(ad_id);
create index if not exists idx_banner_ad_targets_city on public.banner_ad_targets(city_slug);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.banner_ads enable row level security;
alter table public.banner_ad_targets enable row level security;

-- Public (anon) can read ONLY publicly-displayable ads. The full predicate is
-- encoded in the policy so an unapproved/unpaid/expired/paused/draft ad can
-- never leak to guests.
drop policy if exists banner_ads_public_read on public.banner_ads;
create policy banner_ads_public_read on public.banner_ads
  for select using (
    approval_status = 'approved'
    and status = 'active'
    and is_paused = false
    and payment_status in ('not_required','success')
    and start_date is not null and end_date is not null
    and start_date <= current_date and end_date >= current_date
  );

-- Advertiser can read ALL of their own ads (any status) for the dashboard.
drop policy if exists banner_ads_select_own on public.banner_ads;
create policy banner_ads_select_own on public.banner_ads
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = advertiser_profile_id and p.auth_user_id = auth.uid()
    )
  );

-- targets: readable when the parent ad is publicly displayable, or owned by the reader.
drop policy if exists banner_ad_targets_public_read on public.banner_ad_targets;
create policy banner_ad_targets_public_read on public.banner_ad_targets
  for select using (
    exists (
      select 1 from public.banner_ads a
      where a.id = ad_id
        and a.approval_status = 'approved' and a.status = 'active' and a.is_paused = false
        and a.payment_status in ('not_required','success')
        and a.start_date is not null and a.end_date is not null
        and a.start_date <= current_date and a.end_date >= current_date
    )
  );

drop policy if exists banner_ad_targets_select_own on public.banner_ad_targets;
create policy banner_ad_targets_select_own on public.banner_ad_targets
  for select using (
    exists (
      select 1 from public.banner_ads a
      join public.profiles p on p.id = a.advertiser_profile_id
      where a.id = ad_id and p.auth_user_id = auth.uid()
    )
  );

-- NOTE: No client INSERT/UPDATE/DELETE policy. All writes go through server
-- actions using the service-role client AFTER a server-side role/eligibility
-- check, so a client can never forge approval_status='approved' /
-- payment_status='success' / status='active'.

-- ---------------------------------------------------------------------------
-- Storage bucket: banner-ads (PUBLIC). Authenticated users write into a folder
-- named after their auth uid (e.g. `<auth_uid>/<adKey>/<device>-<file>`).
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
  values ('banner-ads', 'banner-ads', true)
  on conflict (id) do nothing;

drop policy if exists banner_ads_media_read on storage.objects;
create policy banner_ads_media_read on storage.objects
  for select using (bucket_id = 'banner-ads');

drop policy if exists banner_ads_media_write_own on storage.objects;
create policy banner_ads_media_write_own on storage.objects
  for insert to authenticated with check (
    bucket_id = 'banner-ads' and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists banner_ads_media_delete_own on storage.objects;
create policy banner_ads_media_delete_own on storage.objects
  for delete to authenticated using (
    bucket_id = 'banner-ads' and (storage.foldername(name))[1] = auth.uid()::text
  );

-- =============================================================================
-- End of migration
-- =============================================================================
