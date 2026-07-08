-- Server-side rate-limit ledger for OTP verify, admin password login, and
-- mobile-existence checks. Replaces client-only attempt counters that could
-- be reset by refreshing the page / calling the action directly.
create table if not exists auth_login_attempts (
  id uuid primary key default gen_random_uuid(),
  identifier text not null, -- normalized mobile or lowercased email
  attempt_type text not null check (
    attempt_type in ('otp_verify', 'admin_password', 'mobile_check')
  ),
  succeeded boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_auth_login_attempts_lookup
  on auth_login_attempts (identifier, attempt_type, created_at desc);

-- Service-role only table (no anon/authenticated policies).
alter table auth_login_attempts enable row level security;

-- Best-effort cleanup: rows older than 24h are useless for rate-limiting.
-- No pg_cron dependency assumed; a scheduled job can call this later.
create or replace function prune_auth_login_attempts() returns void as $$
  delete from auth_login_attempts where created_at < now() - interval '24 hours';
$$ language sql;
