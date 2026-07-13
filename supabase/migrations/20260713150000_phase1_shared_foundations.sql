-- ============================================================
-- Phase 1 shared foundations (design-replacement master plan)
--   1. Canonical Location hierarchy  (spec 02 §36 — Location foundation)
--   2. Provider registry             (spec 02 §136–139 — provider foundation)
--   3. Notification delivery attempts (spec 02 §78)
--   4. Background jobs + DLQ         (spec 02 §145–146)
--
-- Additive only — no drops, no data rewrites. Idempotent.
-- Rollback: drop table public.background_jobs, public.notification_deliveries,
--           public.provider_configs, public.locations (children first).
-- Secrets are NEVER stored here: provider_configs holds only the env-var
-- reference name and safe status metadata.
-- ============================================================

-- ------------------------------------------------------------
-- 1. LOCATIONS — one canonical Gujarat hierarchy
-- ------------------------------------------------------------
create table if not exists public.locations (
  id             uuid primary key default gen_random_uuid(),
  location_type  text not null check (location_type in (
                   'country','state','district','taluka','city','village',
                   'area','locality','society'
                 )),
  parent_id      uuid references public.locations(id) on delete restrict,
  name           text not null,
  name_gu        text,
  name_hi        text,
  slug           text not null,
  aliases        text[] not null default '{}',
  latitude       numeric(9,6),
  longitude      numeric(9,6),
  pin_code       text,
  is_active      boolean not null default true,
  is_selectable  boolean not null default true,
  display_order  integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  -- one slug per type (e.g. city 'rajkot' unique among cities)
  constraint locations_type_slug_unique unique (location_type, slug)
);

create index if not exists idx_locations_parent_type
  on public.locations (parent_id, location_type);
create index if not exists idx_locations_name_lower
  on public.locations (lower(name));
create index if not exists idx_locations_aliases
  on public.locations using gin (aliases);

alter table public.locations enable row level security;

-- Public read of active rows only; writes go through service role
-- (Admin location management screens arrive in Phase 5).
drop policy if exists locations_public_read on public.locations;
create policy locations_public_read
  on public.locations for select
  using (is_active = true);

-- Seed: India → Gujarat → the canonical city list already used by the app
-- (same slugs as src/components/location/CityProvider.tsx GUJARAT_CITIES).
do $$
declare
  v_country uuid;
  v_state   uuid;
begin
  insert into public.locations (location_type, name, slug, display_order)
  values ('country', 'India', 'india', 0)
  on conflict (location_type, slug) do update set updated_at = now()
  returning id into v_country;

  insert into public.locations (location_type, parent_id, name, name_gu, slug, display_order)
  values ('state', v_country, 'Gujarat', 'ગુજરાત', 'gujarat', 0)
  on conflict (location_type, slug) do update set updated_at = now()
  returning id into v_state;

  insert into public.locations (location_type, parent_id, name, name_gu, slug, aliases, display_order)
  values
    ('city', v_state, 'Ahmedabad',     'અમદાવાદ',      'ahmedabad',     array['amdavad','ahemdabad','ahmadabad'], 1),
    ('city', v_state, 'Surat',         'સુરત',          'surat',         array['surrat'], 2),
    ('city', v_state, 'Vadodara',      'વડોદરા',        'vadodara',      array['baroda','vadodra'], 3),
    ('city', v_state, 'Rajkot',        'રાજકોટ',        'rajkot',        array['rajkott'], 4),
    ('city', v_state, 'Gandhinagar',   'ગાંધીનગર',      'gandhinagar',   array[]::text[], 5),
    ('city', v_state, 'Bhavnagar',     'ભાવનગર',        'bhavnagar',     array[]::text[], 6),
    ('city', v_state, 'Jamnagar',      'જામનગર',        'jamnagar',      array[]::text[], 7),
    ('city', v_state, 'Junagadh',      'જુનાગઢ',        'junagadh',      array['junagad'], 8),
    ('city', v_state, 'Anand',         'આણંદ',          'anand',         array[]::text[], 9),
    ('city', v_state, 'Mehsana',       'મહેસાણા',       'mehsana',       array['mahesana'], 10),
    ('city', v_state, 'Morbi',         'મોરબી',         'morbi',         array['morvi'], 11),
    ('city', v_state, 'Surendranagar', 'સુરેન્દ્રનગર',   'surendranagar', array[]::text[], 12),
    ('city', v_state, 'Bharuch',       'ભરૂચ',          'bharuch',       array['broach'], 13),
    ('city', v_state, 'Navsari',       'નવસારી',        'navsari',       array[]::text[], 14),
    ('city', v_state, 'Valsad',        'વલસાડ',         'valsad',        array[]::text[], 15),
    ('city', v_state, 'Porbandar',     'પોરબંદર',       'porbandar',     array[]::text[], 16),
    ('city', v_state, 'Dwarka',        'દ્વારકા',        'dwarka',        array[]::text[], 17),
    ('city', v_state, 'Kutch / Bhuj',  'કચ્છ / ભુજ',    'kutch',         array['bhuj','kachchh'], 18),
    ('city', v_state, 'Amreli',        'અમરેલી',        'amreli',        array[]::text[], 19),
    ('city', v_state, 'Botad',         'બોટાદ',         'botad',         array[]::text[], 20)
  on conflict (location_type, slug) do nothing;
end $$;

-- ------------------------------------------------------------
-- 2. PROVIDER REGISTRY — safe status only, secrets stay in env
-- ------------------------------------------------------------
create table if not exists public.provider_configs (
  id               uuid primary key default gen_random_uuid(),
  provider_key     text not null unique,
  display_name     text not null,
  category         text not null check (category in (
                     'otp_sms','email','whatsapp','maps','payment',
                     'storage_cdn','analytics','error_tracking','push',
                     'security','jobs','platform'
                   )),
  mode             text,
  enabled          boolean not null default false,
  status           text not null default 'setup_required' check (status in (
                     'setup_required','configured_untested','active','error',
                     'disabled','test_mode','degraded','pending_verification'
                   )),
  -- Name of the server env var holding the credential. NEVER the secret.
  secret_env_ref   text,
  last_test_at     timestamptz,
  last_success_at  timestamptz,
  last_error_safe  text,
  updated_by_staff uuid references public.staff_profiles(id),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table public.provider_configs enable row level security;
-- No public/user policies: only trusted server (service role) and Phase 4
-- admin actions may read/write. RLS-on with zero policies denies all others.

insert into public.provider_configs (provider_key, display_name, category, secret_env_ref, mode, status)
values
  ('supabase',        'Supabase (Database + Auth + RLS)', 'platform',      'NEXT_PUBLIC_SUPABASE_URL',        'live',     'configured_untested'),
  ('otp',             'OTP Provider',                     'otp_sms',       'OTP_API_KEY',                     'dev_mock', 'setup_required'),
  ('sms',             'SMS Provider',                     'otp_sms',       'SMS_API_KEY',                     null,       'setup_required'),
  ('email',           'Email Provider',                   'email',         'EMAIL_PROVIDER',                  null,       'setup_required'),
  ('whatsapp',        'WhatsApp',                         'whatsapp',      'WHATSAPP_BUSINESS_TOKEN',         null,       'setup_required'),
  ('razorpay',        'Razorpay Payments',                'payment',       'RAZORPAY_KEY_ID',                 'test',     'test_mode'),
  ('google_maps',     'Google Maps',                      'maps',          'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY', null,       'setup_required'),
  ('cloudflare_r2',   'Cloudflare R2 / CDN',              'storage_cdn',   'CLOUDFLARE_API_TOKEN',            null,       'setup_required'),
  ('turnstile',       'Cloudflare Turnstile',             'security',      'TURNSTILE_SECRET_KEY',            null,       'setup_required'),
  ('analytics',       'Analytics',                        'analytics',     'ANALYTICS_PROVIDER',              null,       'setup_required'),
  ('error_tracking',  'Error Tracking',                   'error_tracking','ERROR_TRACKING_DSN',              null,       'setup_required'),
  ('web_push',        'Web Push',                         'push',          'WEB_PUSH_PRIVATE_KEY',            null,       'setup_required'),
  ('cron',            'Cron Jobs',                        'jobs',          'CRON_SECRET',                     null,       'setup_required')
on conflict (provider_key) do nothing;

-- ------------------------------------------------------------
-- 3. NOTIFICATION DELIVERY ATTEMPTS — external channel truth
-- ------------------------------------------------------------
create table if not exists public.notification_deliveries (
  id               uuid primary key default gen_random_uuid(),
  notification_id  uuid not null references public.notifications(id) on delete cascade,
  channel          text not null check (channel in (
                     'in_app','email','sms','whatsapp','push'
                   )),
  status           text not null default 'queued' check (status in (
                     'queued','processing','sent','delivered','failed',
                     'skipped_provider_missing','skipped_preference',
                     'rate_limited','dead_lettered'
                   )),
  provider_key     text,
  attempt_count    integer not null default 0,
  last_error_safe  text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists idx_notification_deliveries_notification
  on public.notification_deliveries (notification_id);
create index if not exists idx_notification_deliveries_status
  on public.notification_deliveries (status) where status in ('queued','processing','failed');

alter table public.notification_deliveries enable row level security;

-- Recipient may read delivery state of their own notifications.
drop policy if exists notification_deliveries_recipient_read on public.notification_deliveries;
create policy notification_deliveries_recipient_read
  on public.notification_deliveries for select
  using (
    exists (
      select 1 from public.notifications n
      join public.profiles p on p.id = n.recipient_profile_id
      where n.id = notification_deliveries.notification_id
        and p.auth_user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------
-- 4. BACKGROUND JOBS + DEAD-LETTER QUEUE
-- ------------------------------------------------------------
create table if not exists public.background_jobs (
  id               uuid primary key default gen_random_uuid(),
  job_type         text not null,
  payload          jsonb not null default '{}'::jsonb,
  priority         integer not null default 0,
  status           text not null default 'queued' check (status in (
                     'queued','processing','completed','failed',
                     'dead_lettered','dismissed'
                   )),
  attempt_count    integer not null default 0,
  max_attempts     integer not null default 5,
  idempotency_key  text,
  scheduled_at     timestamptz not null default now(),
  started_at       timestamptz,
  completed_at     timestamptz,
  locked_by        text,
  last_error_safe  text,
  -- financial/critical jobs need governance before dismissal (spec 02 §146)
  risk_level       text not null default 'normal' check (risk_level in ('normal','critical')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Duplicate protection: one live job per idempotency key.
create unique index if not exists idx_background_jobs_idempotency
  on public.background_jobs (idempotency_key)
  where idempotency_key is not null
    and status in ('queued','processing');

create index if not exists idx_background_jobs_due
  on public.background_jobs (status, scheduled_at);
create index if not exists idx_background_jobs_type
  on public.background_jobs (job_type);

alter table public.background_jobs enable row level security;
-- Service-role only (RLS-on, zero policies). Admin DLQ screens land in Phase 4.
