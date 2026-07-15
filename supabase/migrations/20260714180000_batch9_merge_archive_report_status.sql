-- ============================================================
-- Migration: Batch 9 follow-up — Duplicate-Lead Merge (real
-- transactional RPC), Message Thread Archive, Report status
-- lookup support.
-- Phase: Phase 4 (Batch 9) — fixes the 3 pending gaps called out
--        in MANUAL_VERIFICATION.md's 2026-07-14 Batch 9 entry.
-- Tables altered: lead_duplicate_flags (status 'merged'),
--                 message_threads (participant_a_archived,
--                 participant_b_archived)
-- Functions created: mgp_merge_leads(uuid, uuid, uuid)
-- RLS: no new tables; message_threads archive columns are
--      written only via server actions (service-role client)
--      with the existing participant check — no new policy
--      needed since the existing "participant reads own" select
--      policy already covers the new columns.
-- Destructive: The merge function reassigns/deletes rows as part
--              of a single atomic Postgres function — if any
--              step fails the whole merge rolls back (plpgsql
--              functions are transactional by default). Only
--              runs when explicitly invoked by a lead participant
--              via the app; never runs automatically.
-- Backup required: No (additive schema; merge itself only acts
--                  on data the calling participant already owns)
-- Rollback: see commented statements at bottom
-- ============================================================

-- ============================================================
-- lead_duplicate_flags: allow 'merged' as a terminal status
-- ============================================================

alter table public.lead_duplicate_flags drop constraint if exists lead_duplicate_flags_status_check;
alter table public.lead_duplicate_flags add constraint lead_duplicate_flags_status_check
  check (status in ('open', 'dismissed', 'merged'));

-- ============================================================
-- message_threads: per-participant archive flag
-- ============================================================

alter table public.message_threads
  add column if not exists participant_a_archived boolean not null default false,
  add column if not exists participant_b_archived boolean not null default false;

-- ============================================================
-- FUNCTION: mgp_merge_leads
-- Merges p_duplicate_lead_id INTO p_keep_lead_id. Safety: both
-- leads must share the same requester+receiver pair (enforced
-- here, not just trusted from the caller) — this is exactly the
-- pairing getPossibleDuplicateLeads() flags, so a legitimate
-- merge call always satisfies it. Runs as SECURITY DEFINER so it
-- can touch the several dependent tables in one atomic step; the
-- calling server action is responsible for verifying the caller
-- is a participant on both leads before invoking this.
-- ============================================================

create or replace function public.mgp_merge_leads(
  p_keep_lead_id uuid,
  p_duplicate_lead_id uuid,
  p_actor_profile_id uuid
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_keep record;
  v_dup record;
  v_thread record;
  v_keep_thread_id uuid;
begin
  if p_keep_lead_id = p_duplicate_lead_id then
    raise exception 'CANNOT_MERGE_SAME_LEAD';
  end if;

  select * into v_keep from public.leads where id = p_keep_lead_id for update;
  select * into v_dup  from public.leads where id = p_duplicate_lead_id for update;

  if v_keep.id is null or v_dup.id is null then
    raise exception 'LEAD_NOT_FOUND';
  end if;
  if v_keep.requester_profile_id <> v_dup.requester_profile_id
     or v_keep.receiver_profile_id <> v_dup.receiver_profile_id then
    raise exception 'NOT_SAME_PAIR';
  end if;

  -- Notes, followups, contact requests, proposals, site visits: reassign wholesale.
  update public.lead_notes      set lead_id = p_keep_lead_id where lead_id = p_duplicate_lead_id;
  update public.lead_followups  set lead_id = p_keep_lead_id where lead_id = p_duplicate_lead_id;
  update public.contact_requests set lead_id = p_keep_lead_id where lead_id = p_duplicate_lead_id;
  update public.proposals       set lead_id = p_keep_lead_id where lead_id = p_duplicate_lead_id;
  update public.site_visits     set lead_id = p_keep_lead_id where lead_id = p_duplicate_lead_id;

  -- crm_events: reassign entity_id for lead-scoped events, then add a merge marker.
  update public.crm_events
    set entity_id = p_keep_lead_id
    where entity_type = 'lead' and entity_id = p_duplicate_lead_id;

  -- message_threads: at most one thread per (pair, lead). If the duplicate lead has
  -- a thread and the keep lead doesn't, just re-point it. If both have threads,
  -- move the duplicate thread's messages into the keep thread and drop the empty one
  -- (unique constraint on (participant_a, participant_b, lead_id) forbids two threads
  -- pointing at the same keep lead).
  select * into v_thread from public.message_threads where lead_id = p_duplicate_lead_id;
  if v_thread.id is not null then
    select id into v_keep_thread_id from public.message_threads where lead_id = p_keep_lead_id;
    if v_keep_thread_id is null then
      update public.message_threads set lead_id = p_keep_lead_id where id = v_thread.id;
    else
      update public.messages set thread_id = v_keep_thread_id where thread_id = v_thread.id;
      update public.message_threads
        set last_message_at = greatest(coalesce(last_message_at, 'epoch'::timestamptz),
                                        coalesce(v_thread.last_message_at, 'epoch'::timestamptz))
        where id = v_keep_thread_id;
      delete from public.message_threads where id = v_thread.id;
    end if;
  end if;

  -- The duplicate lead is archived, not deleted — full audit trail preserved.
  update public.leads
    set status = 'archived',
        close_reason = 'duplicate',
        close_reason_detail = 'Merged into another lead',
        last_activity_at = now()
    where id = p_duplicate_lead_id;

  update public.lead_duplicate_flags
    set status = 'merged'
    where (lead_id = p_keep_lead_id and duplicate_of_lead_id = p_duplicate_lead_id)
       or (lead_id = p_duplicate_lead_id and duplicate_of_lead_id = p_keep_lead_id);

  insert into public.crm_events (entity_type, entity_id, event_type, actor_profile_id, metadata_safe)
  values ('lead', p_keep_lead_id, 'lead_merged', p_actor_profile_id,
          jsonb_build_object('merged_from', p_duplicate_lead_id));
end;
$$;

-- ============================================================
-- ROLLBACK NOTES
-- ============================================================

-- drop function if exists public.mgp_merge_leads(uuid, uuid, uuid);
-- alter table public.message_threads
--   drop column if exists participant_a_archived,
--   drop column if exists participant_b_archived;
