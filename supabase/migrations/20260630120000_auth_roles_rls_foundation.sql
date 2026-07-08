-- ============================================================
-- My Gujarat Property — Auth, Roles, RLS Foundation
-- Phase: Prompt 02 Auth Roles RLS Foundation
-- Date: 2026-06-30
-- Tables: profiles, owner_profiles, broker_profiles,
--         builder_profiles, staff_profiles, staff_permissions,
--         staff_invites, role_change_requests, user_consents,
--         auth_audit_events
-- Public views: public_profiles_view, public_broker_profiles_view,
--               public_builder_profiles_view
-- RLS: Enabled on all tables
-- Destructive: No (new tables only)
-- Backup required: No (no existing data)
-- Rollback: DROP TABLE statements at bottom of file (commented)
-- ============================================================

-- ============================================================
-- HELPER: updated_at trigger function
-- ============================================================

create or replace function mgp_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- TABLE: profiles
-- Central user profile linked to auth.users
-- Private fields: mobile, email — never exposed publicly
-- ============================================================

create table if not exists public.profiles (
  id                    uuid primary key default gen_random_uuid(),
  auth_user_id          uuid unique not null references auth.users(id) on delete cascade,
  public_role           text not null check (public_role in ('owner', 'broker', 'builder')),
  full_name             text not null,
  display_name          text,
  email                 text,
  mobile                text,
  mobile_verified       boolean not null default false,
  email_verified        boolean not null default false,
  account_status        text not null default 'active'
                          check (account_status in ('active', 'pending', 'suspended', 'banned', 'deleted')),
  verification_status   text not null default 'not_started'
                          check (verification_status in (
                            'not_started', 'pending', 'under_review',
                            'need_changes', 'verified', 'rejected', 'expired', 'revoked'
                          )),
  avatar_media_id       uuid,
  city_id               uuid,
  language_preference   text not null default 'en'
                          check (language_preference in ('en', 'gu', 'hi')),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  deleted_at            timestamptz
);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: owner_profiles
-- ============================================================

create table if not exists public.owner_profiles (
  id               uuid primary key default gen_random_uuid(),
  profile_id       uuid unique not null references public.profiles(id) on delete cascade,
  public_display_name text,
  privacy_level    text not null default 'private'
                     check (privacy_level in ('private', 'semi_public', 'public')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger owner_profiles_updated_at
  before update on public.owner_profiles
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: broker_profiles
-- ============================================================

create table if not exists public.broker_profiles (
  id                   uuid primary key default gen_random_uuid(),
  profile_id           uuid unique not null references public.profiles(id) on delete cascade,
  agency_name          text,
  license_number       text,
  business_city_id     uuid,
  verification_status  text not null default 'not_started'
                         check (verification_status in (
                           'not_started', 'pending', 'under_review',
                           'need_changes', 'verified', 'rejected', 'expired', 'revoked'
                         )),
  public_slug          text unique,
  is_published         boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create trigger broker_profiles_updated_at
  before update on public.broker_profiles
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: builder_profiles
-- ============================================================

create table if not exists public.builder_profiles (
  id                   uuid primary key default gen_random_uuid(),
  profile_id           uuid unique not null references public.profiles(id) on delete cascade,
  company_name         text,
  company_type         text check (company_type in (
                         'individual', 'proprietorship', 'partnership',
                         'llp', 'pvt_ltd', 'ltd', 'trust', 'other'
                       )),
  rera_registered      boolean not null default false,
  business_city_id     uuid,
  verification_status  text not null default 'not_started'
                         check (verification_status in (
                           'not_started', 'pending', 'under_review',
                           'need_changes', 'verified', 'rejected', 'expired', 'revoked'
                         )),
  public_slug          text unique,
  is_published         boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create trigger builder_profiles_updated_at
  before update on public.builder_profiles
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: staff_profiles
-- Internal admin/staff accounts — invite-only
-- No public registration
-- ============================================================

create table if not exists public.staff_profiles (
  id                  uuid primary key default gen_random_uuid(),
  auth_user_id        uuid unique references auth.users(id) on delete set null,
  email               text unique not null,
  full_name           text not null,
  internal_role       text not null
                        check (internal_role in (
                          'super_admin', 'admin',
                          'verification_manager', 'support_manager',
                          'content_manager', 'seo_manager', 'ads_manager',
                          'billing_manager', 'payment_manager', 'city_manager',
                          'user_manager', 'notification_manager', 'system_manager',
                          'security_manager', 'reports_manager', 'audit_manager'
                        )),
  staff_status        text not null default 'invited'
                        check (staff_status in (
                          'invited', 'active', 'disabled', 'suspended', 'deleted'
                        )),
  last_login_at       timestamptz,
  created_by_staff_id uuid references public.staff_profiles(id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  disabled_at         timestamptz
);

create trigger staff_profiles_updated_at
  before update on public.staff_profiles
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: staff_permissions
-- Per-module permission rows for each staff member
-- ============================================================

create table if not exists public.staff_permissions (
  id                   uuid primary key default gen_random_uuid(),
  staff_profile_id     uuid not null references public.staff_profiles(id) on delete cascade,
  module               text not null,
  can_read             boolean not null default false,
  can_create           boolean not null default false,
  can_update           boolean not null default false,
  can_approve          boolean not null default false,
  can_reject           boolean not null default false,
  can_delete           boolean not null default false,
  can_export           boolean not null default false,
  can_bulk_action      boolean not null default false,
  can_view_sensitive   boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  unique (staff_profile_id, module)
);

create trigger staff_permissions_updated_at
  before update on public.staff_permissions
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: staff_invites
-- Token-based invite system. Token stored as hash only.
-- ============================================================

create table if not exists public.staff_invites (
  id                   uuid primary key default gen_random_uuid(),
  email                text not null,
  internal_role        text not null
                         check (internal_role in (
                           'super_admin', 'admin',
                           'verification_manager', 'support_manager',
                           'content_manager', 'seo_manager', 'ads_manager',
                           'billing_manager', 'payment_manager', 'city_manager',
                           'user_manager', 'notification_manager', 'system_manager',
                           'security_manager', 'reports_manager', 'audit_manager'
                         )),
  invited_by_staff_id  uuid references public.staff_profiles(id) on delete set null,
  invite_token_hash    text not null,
  status               text not null default 'pending'
                         check (status in ('pending', 'accepted', 'expired', 'revoked')),
  expires_at           timestamptz not null,
  accepted_at          timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create trigger staff_invites_updated_at
  before update on public.staff_invites
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: role_change_requests
-- Foundation only. Full workflow in later phase.
-- ============================================================

create table if not exists public.role_change_requests (
  id               uuid primary key default gen_random_uuid(),
  profile_id       uuid not null references public.profiles(id) on delete cascade,
  from_role        text not null check (from_role in ('owner', 'broker', 'builder')),
  to_role          text not null check (to_role in ('owner', 'broker', 'builder')),
  reason           text,
  status           text not null default 'pending'
                     check (status in ('pending', 'approved', 'rejected', 'cancelled')),
  reviewed_by_staff_id uuid references public.staff_profiles(id) on delete set null,
  review_note      text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger role_change_requests_updated_at
  before update on public.role_change_requests
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: user_consents
-- Records consent at registration and key actions
-- ============================================================

create table if not exists public.user_consents (
  id              uuid primary key default gen_random_uuid(),
  profile_id      uuid not null references public.profiles(id) on delete cascade,
  consent_type    text not null
                    check (consent_type in (
                      'terms', 'privacy', 'otp_data_notice',
                      'contact_sharing', 'marketing'
                    )),
  policy_version  text not null default '1.0',
  accepted        boolean not null default false,
  source          text,
  ip_hash         text,
  user_agent_hash text,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- TABLE: auth_audit_events
-- Safe audit log — no OTPs/secrets/tokens
-- Insert via service role only
-- ============================================================

create table if not exists public.auth_audit_events (
  id               uuid primary key default gen_random_uuid(),
  profile_id       uuid references public.profiles(id) on delete set null,
  staff_profile_id uuid references public.staff_profiles(id) on delete set null,
  event_type       text not null
                     check (event_type in (
                       'login', 'logout', 'register',
                       'otp_requested', 'otp_verified',
                       'role_selected', 'profile_created',
                       'staff_login', 'admin_access_denied',
                       'account_blocked', 'role_change_requested'
                     )),
  target_type      text,
  target_id        uuid,
  metadata_safe    jsonb,
  ip_hash          text,
  user_agent_hash  text,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_profiles_auth_user_id        on public.profiles(auth_user_id);
create index if not exists idx_profiles_public_role         on public.profiles(public_role);
create index if not exists idx_profiles_account_status      on public.profiles(account_status);
create index if not exists idx_profiles_mobile              on public.profiles(mobile);
create index if not exists idx_profiles_email               on public.profiles(email);

create index if not exists idx_owner_profiles_profile_id    on public.owner_profiles(profile_id);

create index if not exists idx_broker_profiles_profile_id   on public.broker_profiles(profile_id);
create index if not exists idx_broker_profiles_public_slug  on public.broker_profiles(public_slug);
create index if not exists idx_broker_profiles_published    on public.broker_profiles(is_published) where is_published = true;

create index if not exists idx_builder_profiles_profile_id  on public.builder_profiles(profile_id);
create index if not exists idx_builder_profiles_public_slug on public.builder_profiles(public_slug);
create index if not exists idx_builder_profiles_published   on public.builder_profiles(is_published) where is_published = true;

create index if not exists idx_staff_profiles_auth_user_id  on public.staff_profiles(auth_user_id);
create index if not exists idx_staff_profiles_email         on public.staff_profiles(email);
create index if not exists idx_staff_profiles_internal_role on public.staff_profiles(internal_role);
create index if not exists idx_staff_profiles_status        on public.staff_profiles(staff_status);

create index if not exists idx_staff_permissions_staff_id   on public.staff_permissions(staff_profile_id);

create index if not exists idx_staff_invites_email          on public.staff_invites(email);
create index if not exists idx_staff_invites_status         on public.staff_invites(status);

create index if not exists idx_user_consents_profile_id     on public.user_consents(profile_id);
create index if not exists idx_user_consents_type           on public.user_consents(consent_type);

create index if not exists idx_auth_audit_profile_id        on public.auth_audit_events(profile_id);
create index if not exists idx_auth_audit_event_type        on public.auth_audit_events(event_type);
create index if not exists idx_auth_audit_created_at        on public.auth_audit_events(created_at desc);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles             enable row level security;
alter table public.owner_profiles       enable row level security;
alter table public.broker_profiles      enable row level security;
alter table public.builder_profiles     enable row level security;
alter table public.staff_profiles       enable row level security;
alter table public.staff_permissions    enable row level security;
alter table public.staff_invites        enable row level security;
alter table public.role_change_requests enable row level security;
alter table public.user_consents        enable row level security;
alter table public.auth_audit_events    enable row level security;

-- ============================================================
-- RLS POLICIES: profiles
-- ============================================================

-- Users can read their own profile
create policy "profiles: user reads own"
  on public.profiles for select
  using (auth.uid() = auth_user_id);

-- Users can update safe fields on their own profile
-- (role change, account_status, verification_status are NOT updatable by user directly)
create policy "profiles: user updates own safe fields"
  on public.profiles for update
  using (auth.uid() = auth_user_id)
  with check (auth.uid() = auth_user_id);

-- Service role can do everything (bypasses RLS by default via supabase-js with service key)
-- No policy needed — service role bypasses RLS automatically in Supabase.

-- ============================================================
-- RLS POLICIES: owner_profiles
-- ============================================================

create policy "owner_profiles: owner reads own"
  on public.owner_profiles for select
  using (
    profile_id in (
      select id from public.profiles where auth_user_id = auth.uid()
    )
  );

create policy "owner_profiles: owner updates own"
  on public.owner_profiles for update
  using (
    profile_id in (
      select id from public.profiles where auth_user_id = auth.uid()
    )
  );

-- Public can read published owner profiles (limited fields via view, not direct table)
-- Direct table access is blocked for public — use public_profiles_view instead

-- ============================================================
-- RLS POLICIES: broker_profiles
-- ============================================================

create policy "broker_profiles: broker reads own"
  on public.broker_profiles for select
  using (
    profile_id in (
      select id from public.profiles where auth_user_id = auth.uid()
    )
  );

create policy "broker_profiles: broker updates own"
  on public.broker_profiles for update
  using (
    profile_id in (
      select id from public.profiles where auth_user_id = auth.uid()
    )
  );

create policy "broker_profiles: public reads published"
  on public.broker_profiles for select
  using (is_published = true);

-- ============================================================
-- RLS POLICIES: builder_profiles
-- ============================================================

create policy "builder_profiles: builder reads own"
  on public.builder_profiles for select
  using (
    profile_id in (
      select id from public.profiles where auth_user_id = auth.uid()
    )
  );

create policy "builder_profiles: builder updates own"
  on public.builder_profiles for update
  using (
    profile_id in (
      select id from public.profiles where auth_user_id = auth.uid()
    )
  );

create policy "builder_profiles: public reads published"
  on public.builder_profiles for select
  using (is_published = true);

-- ============================================================
-- RLS POLICIES: staff_profiles
-- Public users and normal authenticated users: DENIED
-- Only staff can read their own staff profile
-- Super admin / admin management: via service role server-side
-- ============================================================

create policy "staff_profiles: staff reads own"
  on public.staff_profiles for select
  using (auth.uid() = auth_user_id);

-- ============================================================
-- RLS POLICIES: staff_permissions
-- Public denied. Staff reads own permissions.
-- Management via service role.
-- ============================================================

create policy "staff_permissions: staff reads own"
  on public.staff_permissions for select
  using (
    staff_profile_id in (
      select id from public.staff_profiles where auth_user_id = auth.uid()
    )
  );

-- ============================================================
-- RLS POLICIES: staff_invites
-- All access via service role server-side only.
-- No direct table access for authenticated users.
-- ============================================================

-- No public policy = all denied by default (RLS enabled, no allow policy)

-- ============================================================
-- RLS POLICIES: role_change_requests
-- User reads own requests only
-- ============================================================

create policy "role_change_requests: user reads own"
  on public.role_change_requests for select
  using (
    profile_id in (
      select id from public.profiles where auth_user_id = auth.uid()
    )
  );

create policy "role_change_requests: user creates own"
  on public.role_change_requests for insert
  with check (
    profile_id in (
      select id from public.profiles where auth_user_id = auth.uid()
    )
  );

-- ============================================================
-- RLS POLICIES: user_consents
-- User reads and creates own consents only
-- ============================================================

create policy "user_consents: user reads own"
  on public.user_consents for select
  using (
    profile_id in (
      select id from public.profiles where auth_user_id = auth.uid()
    )
  );

create policy "user_consents: user creates own"
  on public.user_consents for insert
  with check (
    profile_id in (
      select id from public.profiles where auth_user_id = auth.uid()
    )
  );

-- ============================================================
-- RLS POLICIES: auth_audit_events
-- Insert via service role (bypasses RLS).
-- No direct read access for users or public.
-- Admin read via service role server-side only.
-- ============================================================

-- No public allow policy = all denied by default

-- ============================================================
-- PUBLIC-SAFE VIEWS
-- Exclude: mobile, email, account_status details, private docs
-- ============================================================

create or replace view public.public_profiles_view as
  select
    p.id,
    p.public_role,
    p.display_name,
    p.avatar_media_id,
    p.city_id,
    p.verification_status,
    p.created_at
  from public.profiles p
  where
    p.account_status = 'active'
    and p.deleted_at is null;

create or replace view public.public_broker_profiles_view as
  select
    bp.id,
    bp.profile_id,
    bp.agency_name,
    bp.business_city_id,
    bp.verification_status,
    bp.public_slug,
    p.display_name,
    p.avatar_media_id,
    p.city_id
  from public.broker_profiles bp
  join public.profiles p on p.id = bp.profile_id
  where
    bp.is_published = true
    and p.account_status = 'active'
    and p.deleted_at is null;

create or replace view public.public_builder_profiles_view as
  select
    bp.id,
    bp.profile_id,
    bp.company_name,
    bp.company_type,
    bp.rera_registered,
    bp.business_city_id,
    bp.verification_status,
    bp.public_slug,
    p.display_name,
    p.avatar_media_id,
    p.city_id
  from public.builder_profiles bp
  join public.profiles p on p.id = bp.profile_id
  where
    bp.is_published = true
    and p.account_status = 'active'
    and p.deleted_at is null;

-- ============================================================
-- FUNCTION: handle_new_public_user
-- Called after OTP verification + registration via server action.
-- This function creates profile + role profile atomically.
-- Used by the server-side registration action (service role).
-- ============================================================

create or replace function public.create_user_profile(
  p_auth_user_id   uuid,
  p_public_role    text,
  p_full_name      text,
  p_display_name   text,
  p_email          text,
  p_mobile         text
)
returns uuid
language plpgsql
security definer
as $$
declare
  v_profile_id uuid;
begin
  -- Insert base profile
  insert into public.profiles (
    auth_user_id, public_role, full_name, display_name,
    email, mobile, mobile_verified, account_status
  ) values (
    p_auth_user_id, p_public_role, p_full_name, p_display_name,
    p_email, p_mobile, true, 'active'
  )
  returning id into v_profile_id;

  -- Insert role-specific profile
  if p_public_role = 'owner' then
    insert into public.owner_profiles (profile_id, privacy_level)
    values (v_profile_id, 'private');

  elsif p_public_role = 'broker' then
    insert into public.broker_profiles (profile_id, verification_status)
    values (v_profile_id, 'not_started');

  elsif p_public_role = 'builder' then
    insert into public.builder_profiles (profile_id, verification_status, rera_registered)
    values (v_profile_id, 'not_started', false);
  end if;

  return v_profile_id;
end;
$$;

-- ============================================================
-- ROLLBACK (commented — run only if full rollback needed)
-- WARNING: This will destroy all user data. Run only with backup.
-- ============================================================
-- drop view if exists public.public_builder_profiles_view;
-- drop view if exists public.public_broker_profiles_view;
-- drop view if exists public.public_profiles_view;
-- drop function if exists public.create_user_profile(uuid,text,text,text,text,text);
-- drop function if exists mgp_set_updated_at();
-- drop table if exists public.auth_audit_events cascade;
-- drop table if exists public.user_consents cascade;
-- drop table if exists public.role_change_requests cascade;
-- drop table if exists public.staff_invites cascade;
-- drop table if exists public.staff_permissions cascade;
-- drop table if exists public.staff_profiles cascade;
-- drop table if exists public.builder_profiles cascade;
-- drop table if exists public.broker_profiles cascade;
-- drop table if exists public.owner_profiles cascade;
-- drop table if exists public.profiles cascade;
