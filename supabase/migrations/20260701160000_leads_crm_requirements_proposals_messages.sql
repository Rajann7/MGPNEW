-- ============================================================
-- Migration: Leads, CRM, Requirements, Proposals And Messages
-- Phase: Prompt 08
-- Purpose: Communication and conversion foundation — inquiries,
--          leads, CRM stages, contact request/reveal, proposals,
--          message threads, site visits, saved items/searches,
--          recently viewed, in-app notifications, blocks/reports.
-- Tables created: leads, lead_notes, lead_followups, crm_events,
--                 contact_requests, proposals, message_threads,
--                 messages, site_visits, saved_items,
--                 saved_searches, recently_viewed_items,
--                 notifications, user_blocks, user_reports
-- Views: none
-- RLS: enabled on all new tables. Public denied everywhere.
--      Participant-scoped reads (requester/receiver, sender/
--      recipient, proposer/recipient) via helper functions.
--      Own-user-only for saved/recent/notifications/blocks/reports.
--      Staff/service-role access goes through server actions only
--      (same pattern as Prompt 04/07 private tables) — no direct
--      staff RLS policies added here to avoid duplicating the
--      staff_permissions-driven authorization logic in SQL.
-- Indexes: see bottom section
-- Destructive: No (new tables only)
-- Backup required: No (new tables, no existing data affected)
-- Rollback: see commented DROP statements at bottom
--
-- Consolidation decisions (documented per phase spec §8, which
-- allows "use existing tables if present... actual paths may
-- differ"):
--   - `lead_participants` folded into `leads.requester_profile_id`
--     / `leads.receiver_profile_id` (2-party model — this
--     product's leads are always requester <-> receiver, never
--     N-party, so a separate participants table would add RLS
--     surface without adding real capability).
--   - `lead_events` + `proposal_events` merged into one generic
--     `crm_events` table (entity_type + entity_id), since both are
--     the same conceptual "timeline entry" shape.
--   - `contact_requests` + `contact_reveals` merged into one
--     `contact_requests` table (status covers the request
--     lifecycle, reveal_status/revealed_at cover the reveal
--     outcome) — a request and its reveal are 1:1 in this product,
--     never independent.
--   - `message_participants` folded into `message_threads.
--     participant_a_profile_id` / `participant_b_profile_id` (2-
--     party threads only this phase, matching the "requester <->
--     receiver" model everywhere else in this migration).
--   - `message_attachments` NOT created this phase — no media
--     storage exists yet (Prompt 10/12). The UI shows an honest
--     disabled/setup-required attachment button; there is nothing
--     to persist yet, so no empty table.
--   - `notification_events` implemented as `notifications` (same
--     shape, shorter name, consistent with the rest of this file).
-- ============================================================

-- ============================================================
-- TABLE: leads
-- Core inquiry/lead record. One row per (requester, target
-- entity) — duplicate clicks reuse the existing active row.
-- ============================================================

create table if not exists public.leads (
  id                     uuid primary key default gen_random_uuid(),
  target_type            text not null check (target_type in ('property', 'project', 'requirement')),
  target_id              uuid not null,
  requester_profile_id   uuid not null references public.profiles(id) on delete cascade,
  receiver_profile_id    uuid not null references public.profiles(id) on delete cascade,
  source                 text not null
                           check (source in (
                             'property_detail_contact', 'property_detail_inquiry',
                             'project_detail_contact', 'project_detail_inquiry',
                             'requirement_detail_proposal', 'requirement_match',
                             'search_card_contact', 'profile_contact',
                             'dashboard_manual', 'admin_manual', 'support_escalation'
                           )),
  status                 text not null default 'new'
                           check (status in (
                             'new', 'open', 'contact_requested', 'contact_shared', 'contact_denied',
                             'contacted', 'interested', 'follow_up', 'site_visit_requested',
                             'site_visit_scheduled', 'proposal_sent', 'negotiation', 'converted',
                             'lost', 'closed', 'spam', 'blocked', 'archived'
                           )),
  crm_stage              text not null default 'new'
                           check (crm_stage in (
                             'new', 'contacted', 'interested', 'follow_up', 'site_visit',
                             'proposal', 'negotiation', 'converted', 'lost', 'closed'
                           )),
  requester_message      text,
  last_activity_at       timestamptz not null default now(),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  unique (requester_profile_id, target_type, target_id)
);

create trigger leads_updated_at
  before update on public.leads
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: lead_notes
-- Private notes on a lead. Visibility scopes who can read it.
-- ============================================================

create table if not exists public.lead_notes (
  id               uuid primary key default gen_random_uuid(),
  lead_id          uuid not null references public.leads(id) on delete cascade,
  author_profile_id uuid references public.profiles(id) on delete set null,
  author_staff_id  uuid references public.staff_profiles(id) on delete set null,
  visibility       text not null default 'private'
                     check (visibility in ('private', 'shared', 'admin')),
  note             text not null check (char_length(note) between 1 and 2000),
  created_at       timestamptz not null default now()
);

-- ============================================================
-- TABLE: lead_followups
-- ============================================================

create table if not exists public.lead_followups (
  id               uuid primary key default gen_random_uuid(),
  lead_id          uuid not null references public.leads(id) on delete cascade,
  profile_id       uuid not null references public.profiles(id) on delete cascade,
  due_at           timestamptz not null,
  title            text not null check (char_length(title) between 1 and 200),
  note             text,
  status           text not null default 'pending'
                     check (status in ('pending', 'completed', 'missed', 'cancelled', 'rescheduled')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger lead_followups_updated_at
  before update on public.lead_followups
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: crm_events
-- Generic timeline for leads, proposals and site visits.
-- ============================================================

create table if not exists public.crm_events (
  id               uuid primary key default gen_random_uuid(),
  entity_type      text not null check (entity_type in ('lead', 'proposal', 'site_visit')),
  entity_id        uuid not null,
  event_type       text not null,
  actor_profile_id uuid references public.profiles(id) on delete set null,
  metadata_safe    jsonb,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- TABLE: contact_requests
-- Merges "contact request" and "contact reveal" — 1:1 in this
-- product. Default not revealed; reveal requires receiver
-- approval (or an explicitly documented auto-reveal rule).
-- ============================================================

create table if not exists public.contact_requests (
  id                   uuid primary key default gen_random_uuid(),
  lead_id              uuid not null references public.leads(id) on delete cascade,
  requester_profile_id uuid not null references public.profiles(id) on delete cascade,
  receiver_profile_id  uuid not null references public.profiles(id) on delete cascade,
  status               text not null default 'requested'
                         check (status in (
                           'requested', 'pending_owner_response', 'approved',
                           'rejected', 'expired', 'cancelled', 'blocked'
                         )),
  reveal_status        text not null default 'not_revealed'
                         check (reveal_status in (
                           'not_revealed', 'pending', 'revealed_to_requester',
                           'revealed_to_owner', 'revealed_to_both', 'denied',
                           'expired', 'revoked'
                         )),
  revealed_at          timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create trigger contact_requests_updated_at
  before update on public.contact_requests
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: proposals
-- ============================================================

create table if not exists public.proposals (
  id                     uuid primary key default gen_random_uuid(),
  proposer_profile_id    uuid not null references public.profiles(id) on delete cascade,
  recipient_profile_id   uuid not null references public.profiles(id) on delete cascade,
  target_type            text not null check (target_type in ('requirement', 'property', 'project')),
  requirement_id         uuid,
  property_id            uuid,
  project_id             uuid,
  lead_id                uuid references public.leads(id) on delete set null,
  title                  text not null check (char_length(title) between 3 and 200),
  message                text,
  price_offer            numeric(14, 2),
  terms_summary          text,
  availability_note      text,
  valid_until            timestamptz,
  status                 text not null default 'draft'
                           check (status in (
                             'draft', 'sent', 'viewed', 'shortlisted', 'accepted',
                             'rejected', 'negotiation', 'withdrawn', 'expired', 'archived'
                           )),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create trigger proposals_updated_at
  before update on public.proposals
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: message_threads
-- 2-party threads (participant_a / participant_b) tied to a
-- lead or proposal for context.
-- ============================================================

create table if not exists public.message_threads (
  id                            uuid primary key default gen_random_uuid(),
  thread_type                   text not null default 'lead'
                                  check (thread_type in ('lead', 'proposal', 'requirement', 'site_visit', 'support_placeholder')),
  lead_id                       uuid references public.leads(id) on delete cascade,
  proposal_id                   uuid references public.proposals(id) on delete cascade,
  participant_a_profile_id      uuid not null references public.profiles(id) on delete cascade,
  participant_b_profile_id      uuid not null references public.profiles(id) on delete cascade,
  participant_a_last_read_at    timestamptz,
  participant_b_last_read_at    timestamptz,
  is_blocked                    boolean not null default false,
  last_message_at               timestamptz,
  created_at                    timestamptz not null default now(),
  updated_at                    timestamptz not null default now(),
  unique (participant_a_profile_id, participant_b_profile_id, lead_id)
);

create trigger message_threads_updated_at
  before update on public.message_threads
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: messages
-- ============================================================

create table if not exists public.messages (
  id                uuid primary key default gen_random_uuid(),
  thread_id         uuid not null references public.message_threads(id) on delete cascade,
  sender_profile_id uuid not null references public.profiles(id) on delete cascade,
  body              text not null check (char_length(body) between 1 and 4000),
  status            text not null default 'sent'
                      check (status in ('sent', 'delivered', 'read', 'failed', 'deleted', 'hidden_by_moderation')),
  created_at        timestamptz not null default now()
);

-- ============================================================
-- TABLE: site_visits
-- ============================================================

create table if not exists public.site_visits (
  id                     uuid primary key default gen_random_uuid(),
  lead_id                uuid not null references public.leads(id) on delete cascade,
  property_id            uuid,
  project_id             uuid,
  requester_profile_id   uuid not null references public.profiles(id) on delete cascade,
  host_profile_id        uuid not null references public.profiles(id) on delete cascade,
  scheduled_at           timestamptz,
  meeting_location_type  text default 'at_property' check (meeting_location_type in ('at_property', 'office', 'other')),
  meeting_note           text,
  status                 text not null default 'requested'
                           check (status in (
                             'requested', 'accepted', 'scheduled', 'rescheduled',
                             'cancelled', 'completed', 'no_show', 'rejected', 'expired'
                           )),
  cancel_reason          text,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create trigger site_visits_updated_at
  before update on public.site_visits
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: saved_items
-- ============================================================

create table if not exists public.saved_items (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid not null references public.profiles(id) on delete cascade,
  item_type     text not null check (item_type in ('property', 'project', 'requirement', 'broker_profile', 'builder_profile')),
  item_id       uuid not null,
  created_at    timestamptz not null default now(),
  unique (profile_id, item_type, item_id)
);

-- ============================================================
-- TABLE: saved_searches
-- ============================================================

create table if not exists public.saved_searches (
  id             uuid primary key default gen_random_uuid(),
  profile_id     uuid not null references public.profiles(id) on delete cascade,
  title          text not null check (char_length(title) between 1 and 120),
  query_params   jsonb not null default '{}'::jsonb,
  alert_enabled  boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger saved_searches_updated_at
  before update on public.saved_searches
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: recently_viewed_items
-- ============================================================

create table if not exists public.recently_viewed_items (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  item_type   text not null check (item_type in ('property', 'project', 'requirement')),
  item_id     uuid not null,
  viewed_at   timestamptz not null default now(),
  unique (profile_id, item_type, item_id)
);

-- ============================================================
-- TABLE: notifications
-- In-app notification events. Provider delivery (email/SMS/
-- WhatsApp/push) is a later phase — this is the real DB-backed
-- foundation only.
-- ============================================================

create table if not exists public.notifications (
  id                  uuid primary key default gen_random_uuid(),
  recipient_profile_id uuid not null references public.profiles(id) on delete cascade,
  notification_type   text not null
                        check (notification_type in (
                          'new_lead', 'contact_requested', 'contact_approved', 'contact_rejected',
                          'new_message', 'proposal_sent', 'proposal_viewed', 'proposal_accepted',
                          'proposal_rejected', 'site_visit_requested', 'site_visit_scheduled',
                          'site_visit_rescheduled', 'site_visit_cancelled', 'followup_due'
                        )),
  target_type         text,
  target_id           uuid,
  title               text not null,
  body                text,
  read_at             timestamptz,
  created_at          timestamptz not null default now()
);

-- ============================================================
-- TABLE: user_blocks
-- ============================================================

create table if not exists public.user_blocks (
  id                  uuid primary key default gen_random_uuid(),
  blocker_profile_id  uuid not null references public.profiles(id) on delete cascade,
  blocked_profile_id  uuid not null references public.profiles(id) on delete cascade,
  created_at          timestamptz not null default now(),
  unique (blocker_profile_id, blocked_profile_id)
);

-- ============================================================
-- TABLE: user_reports
-- ============================================================

create table if not exists public.user_reports (
  id                 uuid primary key default gen_random_uuid(),
  reporter_profile_id uuid not null references public.profiles(id) on delete cascade,
  target_type        text not null check (target_type in ('message', 'thread', 'user', 'property', 'project', 'requirement')),
  target_id          uuid not null,
  category           text not null
                       check (category in (
                         'spam', 'fraud', 'abuse', 'wrong_information', 'duplicate',
                         'illegal_content', 'contact_abuse', 'payment_abuse', 'harassment', 'other'
                       )),
  description        text,
  status             text not null default 'pending' check (status in ('pending', 'reviewed', 'dismissed', 'actioned')),
  created_at         timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_leads_requester       on public.leads(requester_profile_id);
create index if not exists idx_leads_receiver         on public.leads(receiver_profile_id);
create index if not exists idx_leads_target           on public.leads(target_type, target_id);
create index if not exists idx_leads_status           on public.leads(status);
create index if not exists idx_leads_crm_stage        on public.leads(crm_stage);
create index if not exists idx_leads_source           on public.leads(source);
create index if not exists idx_leads_created_at       on public.leads(created_at desc);
create index if not exists idx_leads_updated_at       on public.leads(updated_at desc);

create index if not exists idx_lead_notes_lead        on public.lead_notes(lead_id);
create index if not exists idx_lead_followups_lead     on public.lead_followups(lead_id);
create index if not exists idx_lead_followups_profile  on public.lead_followups(profile_id);
create index if not exists idx_lead_followups_due      on public.lead_followups(due_at);

create index if not exists idx_crm_events_entity       on public.crm_events(entity_type, entity_id);
create index if not exists idx_crm_events_created_at   on public.crm_events(created_at desc);

create index if not exists idx_contact_requests_lead     on public.contact_requests(lead_id);
create index if not exists idx_contact_requests_requester on public.contact_requests(requester_profile_id);
create index if not exists idx_contact_requests_receiver  on public.contact_requests(receiver_profile_id);
create index if not exists idx_contact_requests_status    on public.contact_requests(status);

create index if not exists idx_proposals_proposer      on public.proposals(proposer_profile_id);
create index if not exists idx_proposals_recipient     on public.proposals(recipient_profile_id);
create index if not exists idx_proposals_requirement   on public.proposals(requirement_id);
create index if not exists idx_proposals_property      on public.proposals(property_id);
create index if not exists idx_proposals_project       on public.proposals(project_id);
create index if not exists idx_proposals_status        on public.proposals(status);
create index if not exists idx_proposals_created_at    on public.proposals(created_at desc);

create index if not exists idx_message_threads_a       on public.message_threads(participant_a_profile_id);
create index if not exists idx_message_threads_b       on public.message_threads(participant_b_profile_id);
create index if not exists idx_message_threads_lead    on public.message_threads(lead_id);
create index if not exists idx_message_threads_last    on public.message_threads(last_message_at desc);

create index if not exists idx_messages_thread         on public.messages(thread_id);
create index if not exists idx_messages_sender         on public.messages(sender_profile_id);
create index if not exists idx_messages_created_at     on public.messages(created_at desc);
create index if not exists idx_messages_status         on public.messages(status);

create index if not exists idx_site_visits_lead        on public.site_visits(lead_id);
create index if not exists idx_site_visits_requester   on public.site_visits(requester_profile_id);
create index if not exists idx_site_visits_host        on public.site_visits(host_profile_id);
create index if not exists idx_site_visits_scheduled   on public.site_visits(scheduled_at);
create index if not exists idx_site_visits_status      on public.site_visits(status);

create index if not exists idx_saved_items_profile     on public.saved_items(profile_id, item_type, created_at desc);
create index if not exists idx_saved_searches_profile  on public.saved_searches(profile_id, created_at desc);
create index if not exists idx_recently_viewed_profile on public.recently_viewed_items(profile_id, viewed_at desc);

create index if not exists idx_notifications_recipient on public.notifications(recipient_profile_id, created_at desc);
create index if not exists idx_notifications_type      on public.notifications(notification_type);
create index if not exists idx_notifications_read_at   on public.notifications(read_at);

create index if not exists idx_user_blocks_blocker     on public.user_blocks(blocker_profile_id);
create index if not exists idx_user_blocks_blocked     on public.user_blocks(blocked_profile_id);

create index if not exists idx_user_reports_reporter   on public.user_reports(reporter_profile_id);
create index if not exists idx_user_reports_target     on public.user_reports(target_type, target_id);
create index if not exists idx_user_reports_status     on public.user_reports(status);

-- ============================================================
-- RLS: enable on all new tables
-- ============================================================

alter table public.leads                  enable row level security;
alter table public.lead_notes             enable row level security;
alter table public.lead_followups         enable row level security;
alter table public.crm_events             enable row level security;
alter table public.contact_requests       enable row level security;
alter table public.proposals              enable row level security;
alter table public.message_threads        enable row level security;
alter table public.messages               enable row level security;
alter table public.site_visits            enable row level security;
alter table public.saved_items            enable row level security;
alter table public.saved_searches         enable row level security;
alter table public.recently_viewed_items  enable row level security;
alter table public.notifications          enable row level security;
alter table public.user_blocks            enable row level security;
alter table public.user_reports           enable row level security;

-- ============================================================
-- RLS POLICIES: leads — participant-only (requester or receiver)
-- ============================================================

create policy "leads: participant reads own"
  on public.leads for select
  using (
    requester_profile_id = mgp_get_my_profile_id()
    or receiver_profile_id = mgp_get_my_profile_id()
  );

-- Writes go through server actions using the service-role client
-- (mirrors the Prompt 04/07 pattern for entity_status_events /
-- admin_audit_logs) — no direct client insert/update policy.

-- ============================================================
-- RLS POLICIES: lead_notes — participant-only, visibility-scoped
-- ============================================================

create policy "lead_notes: participant reads visible notes"
  on public.lead_notes for select
  using (
    visibility = 'shared'
    and exists (
      select 1 from public.leads l
      where l.id = lead_notes.lead_id
        and (l.requester_profile_id = mgp_get_my_profile_id() or l.receiver_profile_id = mgp_get_my_profile_id())
    )
  );

-- Private/admin notes are never selectable via the anon-key client at all —
-- only through server actions with the service-role client, which apply the
-- author-only / staff-permission check in application code.

-- ============================================================
-- RLS POLICIES: lead_followups — owner-participant only
-- ============================================================

create policy "lead_followups: assigned profile reads own"
  on public.lead_followups for select
  using (profile_id = mgp_get_my_profile_id());

-- ============================================================
-- RLS POLICIES: crm_events — participant-only, entity-scoped
-- ============================================================

create policy "crm_events: lead participant reads own lead events"
  on public.crm_events for select
  using (
    entity_type = 'lead'
    and exists (
      select 1 from public.leads l
      where l.id = crm_events.entity_id
        and (l.requester_profile_id = mgp_get_my_profile_id() or l.receiver_profile_id = mgp_get_my_profile_id())
    )
  );

create policy "crm_events: proposal participant reads own proposal events"
  on public.crm_events for select
  using (
    entity_type = 'proposal'
    and exists (
      select 1 from public.proposals p
      where p.id = crm_events.entity_id
        and (p.proposer_profile_id = mgp_get_my_profile_id() or p.recipient_profile_id = mgp_get_my_profile_id())
    )
  );

create policy "crm_events: site visit participant reads own events"
  on public.crm_events for select
  using (
    entity_type = 'site_visit'
    and exists (
      select 1 from public.site_visits sv
      where sv.id = crm_events.entity_id
        and (sv.requester_profile_id = mgp_get_my_profile_id() or sv.host_profile_id = mgp_get_my_profile_id())
    )
  );

-- ============================================================
-- RLS POLICIES: contact_requests — participant-only
-- ============================================================

create policy "contact_requests: participant reads own"
  on public.contact_requests for select
  using (
    requester_profile_id = mgp_get_my_profile_id()
    or receiver_profile_id = mgp_get_my_profile_id()
  );

-- ============================================================
-- RLS POLICIES: proposals — participant-only
-- ============================================================

create policy "proposals: participant reads own"
  on public.proposals for select
  using (
    proposer_profile_id = mgp_get_my_profile_id()
    or recipient_profile_id = mgp_get_my_profile_id()
  );

-- ============================================================
-- RLS POLICIES: message_threads / messages — 2-party participant-only
-- ============================================================

create policy "message_threads: participant reads own"
  on public.message_threads for select
  using (
    participant_a_profile_id = mgp_get_my_profile_id()
    or participant_b_profile_id = mgp_get_my_profile_id()
  );

create policy "messages: thread participant reads own"
  on public.messages for select
  using (
    exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and (t.participant_a_profile_id = mgp_get_my_profile_id() or t.participant_b_profile_id = mgp_get_my_profile_id())
    )
  );

-- ============================================================
-- RLS POLICIES: site_visits — participant-only
-- ============================================================

create policy "site_visits: participant reads own"
  on public.site_visits for select
  using (
    requester_profile_id = mgp_get_my_profile_id()
    or host_profile_id = mgp_get_my_profile_id()
  );

-- ============================================================
-- RLS POLICIES: saved_items / saved_searches / recently_viewed_items
-- — own-user only, full CRUD via RLS (safe: no cross-user data)
-- ============================================================

create policy "saved_items: own read"
  on public.saved_items for select
  using (profile_id = mgp_get_my_profile_id());

create policy "saved_items: own insert"
  on public.saved_items for insert
  with check (profile_id = mgp_get_my_profile_id());

create policy "saved_items: own delete"
  on public.saved_items for delete
  using (profile_id = mgp_get_my_profile_id());

create policy "saved_searches: own read"
  on public.saved_searches for select
  using (profile_id = mgp_get_my_profile_id());

create policy "saved_searches: own insert"
  on public.saved_searches for insert
  with check (profile_id = mgp_get_my_profile_id());

create policy "saved_searches: own update"
  on public.saved_searches for update
  using (profile_id = mgp_get_my_profile_id())
  with check (profile_id = mgp_get_my_profile_id());

create policy "saved_searches: own delete"
  on public.saved_searches for delete
  using (profile_id = mgp_get_my_profile_id());

create policy "recently_viewed_items: own read"
  on public.recently_viewed_items for select
  using (profile_id = mgp_get_my_profile_id());

create policy "recently_viewed_items: own insert"
  on public.recently_viewed_items for insert
  with check (profile_id = mgp_get_my_profile_id());

create policy "recently_viewed_items: own update"
  on public.recently_viewed_items for update
  using (profile_id = mgp_get_my_profile_id())
  with check (profile_id = mgp_get_my_profile_id());

-- ============================================================
-- RLS POLICIES: notifications — own recipient only
-- ============================================================

create policy "notifications: own read"
  on public.notifications for select
  using (recipient_profile_id = mgp_get_my_profile_id());

create policy "notifications: own mark read"
  on public.notifications for update
  using (recipient_profile_id = mgp_get_my_profile_id())
  with check (recipient_profile_id = mgp_get_my_profile_id());

-- ============================================================
-- RLS POLICIES: user_blocks — own blocker only
-- ============================================================

create policy "user_blocks: own read"
  on public.user_blocks for select
  using (blocker_profile_id = mgp_get_my_profile_id());

create policy "user_blocks: own insert"
  on public.user_blocks for insert
  with check (blocker_profile_id = mgp_get_my_profile_id());

create policy "user_blocks: own delete"
  on public.user_blocks for delete
  using (blocker_profile_id = mgp_get_my_profile_id());

-- ============================================================
-- RLS POLICIES: user_reports — reporter-only read (private), staff via service role
-- ============================================================

create policy "user_reports: reporter reads own"
  on public.user_reports for select
  using (reporter_profile_id = mgp_get_my_profile_id());

create policy "user_reports: own insert"
  on public.user_reports for insert
  with check (reporter_profile_id = mgp_get_my_profile_id());

-- ============================================================
-- ROLLBACK NOTES
-- Destructive: No. All changes are additive new tables. Safe to
-- leave in place if rolled back at the application layer. If a
-- full DB rollback is ever required, run the statements below in
-- order (children before parents).
-- ============================================================

-- drop table if exists public.user_reports cascade;
-- drop table if exists public.user_blocks cascade;
-- drop table if exists public.notifications cascade;
-- drop table if exists public.recently_viewed_items cascade;
-- drop table if exists public.saved_searches cascade;
-- drop table if exists public.saved_items cascade;
-- drop table if exists public.site_visits cascade;
-- drop table if exists public.messages cascade;
-- drop table if exists public.message_threads cascade;
-- drop table if exists public.proposals cascade;
-- drop table if exists public.contact_requests cascade;
-- drop table if exists public.crm_events cascade;
-- drop table if exists public.lead_followups cascade;
-- drop table if exists public.lead_notes cascade;
-- drop table if exists public.leads cascade;
