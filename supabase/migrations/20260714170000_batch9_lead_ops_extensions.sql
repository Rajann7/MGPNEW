-- ============================================================
-- Migration: Batch 9 Shared Lead Ops Extensions
-- Phase: Phase 4 (Batch 9)
-- Purpose: Close/Lost structured reason, duplicate-lead
--          detection+dismiss, site-visit reject reason +
--          feedback, duplicate-visit-request guard support.
-- Tables created: lead_duplicate_flags
-- Tables altered: leads (close_reason, close_reason_detail),
--                 site_visits (reject_reason, feedback_rating,
--                 feedback_comment, feedback_submitted_at)
-- Views: none
-- RLS: enabled on lead_duplicate_flags, participant-scoped read
--      via the same requester/receiver pattern as `leads`.
--      Writes go through server actions (service-role client),
--      matching the rest of this migration family.
-- Indexes: see bottom section
-- Destructive: No (additive columns + new table only)
-- Backup required: No
-- Rollback: see commented statements at bottom
-- ============================================================

-- ============================================================
-- leads: structured close/lost reason
-- ============================================================

alter table public.leads
  add column if not exists close_reason text
    check (close_reason is null or close_reason in (
      'not_interested', 'budget_mismatch', 'location_mismatch',
      'went_with_another', 'unreachable', 'invalid_requirement',
      'converted_offline', 'duplicate', 'spam', 'other'
    )),
  add column if not exists close_reason_detail text
    check (close_reason_detail is null or char_length(close_reason_detail) <= 1000);

-- ============================================================
-- site_visits: reject reason + structured feedback
-- ============================================================

alter table public.site_visits
  add column if not exists reject_reason text
    check (reject_reason is null or char_length(reject_reason) <= 500),
  add column if not exists feedback_rating smallint
    check (feedback_rating is null or feedback_rating between 1 and 5),
  add column if not exists feedback_comment text
    check (feedback_comment is null or char_length(feedback_comment) <= 1000),
  add column if not exists feedback_submitted_by uuid references public.profiles(id) on delete set null,
  add column if not exists feedback_submitted_at timestamptz,
  add column if not exists dispute_reason text
    check (dispute_reason is null or char_length(dispute_reason) <= 1000),
  add column if not exists disputed_by uuid references public.profiles(id) on delete set null,
  add column if not exists disputed_at timestamptz;

-- ============================================================
-- TABLE: lead_duplicate_flags
-- Detected possible-duplicate relationships between two leads
-- from the same requester/receiver pair. Dismiss-only this
-- phase — merge is deferred (see brain.md): combining timeline/
-- notes/proposals/site-visits across two lead rows safely needs
-- a transactional merge routine that is out of scope for this
-- pass; flagging + dismiss keeps the workflow honest without it.
-- ============================================================

create table if not exists public.lead_duplicate_flags (
  id                  uuid primary key default gen_random_uuid(),
  lead_id             uuid not null references public.leads(id) on delete cascade,
  duplicate_of_lead_id uuid not null references public.leads(id) on delete cascade,
  detected_reason     text not null,
  status              text not null default 'open'
                        check (status in ('open', 'dismissed')),
  dismissed_by        uuid references public.profiles(id) on delete set null,
  dismissed_at        timestamptz,
  created_at          timestamptz not null default now(),
  unique (lead_id, duplicate_of_lead_id)
);

create index if not exists idx_lead_dup_flags_lead      on public.lead_duplicate_flags(lead_id);
create index if not exists idx_lead_dup_flags_dup_of     on public.lead_duplicate_flags(duplicate_of_lead_id);
create index if not exists idx_lead_dup_flags_status     on public.lead_duplicate_flags(status);

alter table public.lead_duplicate_flags enable row level security;

drop policy if exists "lead_duplicate_flags: participant reads own" on public.lead_duplicate_flags;
create policy "lead_duplicate_flags: participant reads own"
  on public.lead_duplicate_flags for select
  using (
    exists (
      select 1 from public.leads l
      where l.id = lead_duplicate_flags.lead_id
        and (l.requester_profile_id = mgp_get_my_profile_id() or l.receiver_profile_id = mgp_get_my_profile_id())
    )
  );

-- ============================================================
-- notifications: widen notification_type for the new Batch 9
-- events (lead close/lost, site-visit dispute + feedback)
-- ============================================================

alter table public.notifications drop constraint if exists notifications_notification_type_check;
alter table public.notifications add constraint notifications_notification_type_check
  check (notification_type in (
    'new_lead', 'contact_requested', 'contact_approved', 'contact_rejected', 'contact_revealed',
    'new_message', 'proposal_sent', 'proposal_viewed', 'proposal_accepted',
    'proposal_rejected', 'site_visit_requested', 'site_visit_scheduled',
    'site_visit_rescheduled', 'site_visit_cancelled', 'followup_due',
    'lead_lost', 'lead_closed', 'site_visit_disputed', 'site_visit_feedback'
  ));

-- ============================================================
-- ROLLBACK NOTES
-- ============================================================

-- drop table if exists public.lead_duplicate_flags cascade;
-- alter table public.site_visits
--   drop column if exists reject_reason,
--   drop column if exists feedback_rating,
--   drop column if exists feedback_comment,
--   drop column if exists feedback_submitted_by,
--   drop column if exists feedback_submitted_at,
--   drop column if exists dispute_reason,
--   drop column if exists disputed_by,
--   drop column if exists disputed_at;
-- alter table public.leads
--   drop column if exists close_reason,
--   drop column if exists close_reason_detail;
