-- ============================================================
-- Migration: profile_claim_requests
-- "Is this your business?" claim flow (design Batch 4 · Screen 7) for
-- broker/builder public profiles. Real submission -> real moderation
-- queue row. Document upload isn't wired (Cloudflare R2 not configured
-- yet, per API_PROVIDER_STATUS.md) so proof_note is a free-text
-- placeholder until Prompt 12 storage lands — never a fake upload.
-- ============================================================

create table if not exists public.profile_claim_requests (
  id                    uuid primary key default gen_random_uuid(),
  requester_profile_id  uuid not null references public.profiles(id) on delete cascade,
  target_type           text not null check (target_type in ('broker_profile', 'builder_profile')),
  target_profile_id     uuid not null,
  claimed_role          text not null
                          check (claimed_role in ('owner_director', 'authorized_signatory', 'marketing_head', 'other')),
  proof_note            text,
  status                text not null default 'pending'
                          check (status in ('pending', 'approved', 'rejected')),
  reviewed_by_profile_id uuid references public.profiles(id) on delete set null,
  review_note           text,
  created_at            timestamptz not null default now(),
  reviewed_at           timestamptz
);

create index if not exists idx_profile_claim_requests_target
  on public.profile_claim_requests(target_type, target_profile_id);
create index if not exists idx_profile_claim_requests_requester
  on public.profile_claim_requests(requester_profile_id);
create index if not exists idx_profile_claim_requests_status
  on public.profile_claim_requests(status);

alter table public.profile_claim_requests enable row level security;

-- Requester can read their own claim requests (to show request status).
drop policy if exists "profile_claim_requests: requester reads own" on public.profile_claim_requests;
create policy "profile_claim_requests: requester reads own"
  on public.profile_claim_requests for select
  using (requester_profile_id = mgp_get_my_profile_id());

-- Any logged-in user can submit a claim request for themselves.
drop policy if exists "profile_claim_requests: own insert" on public.profile_claim_requests;
create policy "profile_claim_requests: own insert"
  on public.profile_claim_requests for insert
  with check (requester_profile_id = mgp_get_my_profile_id());

-- No public update/delete policy — status changes go through the
-- service-role admin review action only.

-- ============================================================
-- ROLLBACK NOTES
-- Destructive: No. Additive new table only. Safe to leave in place if
-- rolled back at the application layer.
-- drop table if exists public.profile_claim_requests cascade;
-- ============================================================
