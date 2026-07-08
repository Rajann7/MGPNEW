-- ============================================================
-- Migration: leads inquiry form fields (Phase: inquiry flow port, 2026-07-02)
-- Adds the enquiry-form snapshot fields used by the property/project
-- "Send Enquiry" modal (ported behavior from previous project).
--
-- Privacy: profile_phone / lead_phone are snapshots the requester
-- explicitly consented to share when submitting the enquiry form.
-- They are visible only to lead participants and staff (existing
-- leads RLS policies apply to these columns automatically; no policy
-- changes needed). They must NEVER be selected in public queries.
--
-- Idempotent: safe to re-run. Non-destructive. Rollback: drop the
-- added columns/constraints (no data loss risk for pre-existing cols).
-- ============================================================

alter table public.leads add column if not exists sender_name text;
alter table public.leads add column if not exists profile_phone text;
alter table public.leads add column if not exists lead_phone text;
alter table public.leads add column if not exists phone_source text not null default 'profile';
alter table public.leads add column if not exists alternate_phone_used boolean not null default false;
alter table public.leads add column if not exists interest_type text not null default 'general';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'leads_phone_source_check') then
    alter table public.leads
      add constraint leads_phone_source_check
      check (phone_source in ('profile', 'alternate'));
  end if;

  if not exists (select 1 from pg_constraint where conname = 'leads_interest_type_check') then
    alter table public.leads
      add constraint leads_interest_type_check
      check (interest_type in ('call_me', 'site_visit', 'price', 'photos', 'location', 'general'));
  end if;
end$$;

comment on column public.leads.sender_name is 'Name entered on the enquiry form (defaults to profile full name). Participant/staff visibility only.';
comment on column public.leads.profile_phone is 'Snapshot of requester profile mobile at enquiry time. Never overwritten onto profile. Participant/staff visibility only.';
comment on column public.leads.lead_phone is 'Number the requester chose to be contacted on (profile or alternate). Participant/staff visibility only.';
comment on column public.leads.phone_source is 'Which number the requester chose: profile | alternate.';
comment on column public.leads.alternate_phone_used is 'True when the requester supplied an alternate contact number.';
comment on column public.leads.interest_type is 'What the requester wants: call_me | site_visit | price | photos | location | general.';
