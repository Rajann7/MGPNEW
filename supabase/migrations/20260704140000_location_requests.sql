-- ============================================================
-- My Gujarat Property — Missing-location request capture
-- Phase: Prompt 05 (search empty-state "Request this location" modal, Batch 3 §4)
-- A visitor with no results can ask to be notified when listings open in an
-- area. Real capture (no fake success). Minimal PII: a free-text contact
-- (email or mobile) + the requested location. INSERT-only for the public;
-- reads are staff/service-role only (no public SELECT policy).
-- Destructive: No · Backup required: No
-- Rollback: drop policy + table at bottom.
-- ============================================================

create table if not exists public.location_requests (
  id                     uuid primary key default gen_random_uuid(),
  location_text          text not null,
  contact_text           text not null,
  requester_profile_id   uuid references public.profiles(id) on delete set null,
  source                 text default 'search_empty_state',
  status                 text not null default 'new'
                           check (status in ('new', 'notified', 'closed')),
  created_at             timestamptz not null default now()
);

create index if not exists idx_location_requests_created_at
  on public.location_requests(created_at desc);
create index if not exists idx_location_requests_status
  on public.location_requests(status);

alter table public.location_requests enable row level security;

-- Anyone (guest or logged-in) may submit a request. No read policy → the public
-- can never SELECT these rows; staff read via service role only.
drop policy if exists "location_requests_public_insert" on public.location_requests;
create policy "location_requests_public_insert"
  on public.location_requests
  for insert
  with check (true);

-- ============================================================
-- ROLLBACK:
-- drop policy if exists "location_requests_public_insert" on public.location_requests;
-- drop table if exists public.location_requests cascade;
-- ============================================================
