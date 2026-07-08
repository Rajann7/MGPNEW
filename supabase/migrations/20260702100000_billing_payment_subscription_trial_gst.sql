-- ============================================================
-- Migration: Billing, Payment, Subscription, Trial And GST
-- Phase: Prompt 09
-- Purpose: Commercial foundation — role-wise plan catalog, subscriptions,
--          usage counters, Razorpay payment orders + verified-webhook
--          payments, sequential GST invoices, trials, coupons, add-ons,
--          refunds/credit-notes foundation, billing audit logs.
--
-- Tables created:
--   plans, subscriptions, subscription_events, usage_counters,
--   payment_orders, payment_webhook_events, payments,
--   invoices, invoice_line_items, invoice_number_sequences,
--   gst_profiles, coupons, coupon_redemptions, trials,
--   add_ons, add_on_purchases, refunds, credit_notes,
--   billing_audit_logs
-- Functions: mgp_next_invoice_number(text) — FY-based, concurrency-safe
-- Views: none
-- RLS: enabled on ALL new tables.
--   - plans / add_ons: PUBLIC read of ACTIVE + PUBLIC rows only (pricing page).
--     Internal cost/admin fields are not stored here (kept minimal + safe).
--   - coupons: NOT publicly readable (validation is server-side only) —
--     prevents scraping of discount rules.
--   - subscriptions / usage_counters / payments / payment_orders / invoices /
--     invoice_line_items / gst_profiles / coupon_redemptions / trials /
--     add_on_purchases / refunds / credit_notes: OWN-USER read only.
--   - subscription_events / payment_webhook_events / billing_audit_logs:
--     NO anon-key policy at all — service-role server paths only.
--   - ALL writes to money/subscription tables go through server actions +
--     the Razorpay webhook using the service-role client. No client insert/
--     update policy on money tables — client can never mark a payment paid or
--     activate a subscription (hard payment rule).
-- Indexes: see INDEXES section.
-- Destructive: No (new tables only; seed rows use ON CONFLICT DO NOTHING).
-- Backup required: No (additive).
-- Rollback: see commented DROP statements at bottom (children before parents).
--
-- Consolidation decisions (§8 allows "use only needed tables"):
--   - plan_features / plan_limits folded into plans.features (jsonb) +
--     plans.limits (jsonb) — plan feature/limit sets are small, read together,
--     and never queried independently. Keeps enforcement in one typed place.
--   - trial_redemptions folded into trials (one row per profile+role trial).
--   - payment_attempts folded into payment_orders (status lifecycle column
--     covers created -> checkout_started -> ... ; a separate attempts table
--     adds no capability for one-time orders this phase).
--   - gst breakdown stored on invoices (taxable/cgst/sgst/igst/total) rather
--     than a separate tax table — 1:1 with invoice this phase.
-- ============================================================

-- ============================================================
-- TABLE: plans — role-wise plan catalog (public pricing source)
-- ============================================================

create table if not exists public.plans (
  id                    uuid primary key default gen_random_uuid(),
  plan_code             text not null unique,
  role                  text not null check (role in ('owner', 'broker', 'builder')),
  name                  text not null,
  description           text,
  billing_cycle         text not null check (billing_cycle in ('monthly', 'quarterly', 'yearly', 'one_time', 'trial', 'free')),
  price_amount          numeric(12, 2) not null default 0,       -- in INR (major units)
  currency              text not null default 'INR' check (currency = 'INR'),
  gst_inclusive         boolean not null default false,
  gst_rate_percent      numeric(5, 2) not null default 18.00,
  is_placeholder_pricing boolean not null default false,          -- true => UI shows "indicative pricing"
  features              jsonb not null default '{}'::jsonb,
  limits                jsonb not null default '{}'::jsonb,
  is_active             boolean not null default true,
  is_public             boolean not null default true,
  display_order         integer not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create trigger plans_updated_at
  before update on public.plans
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: subscriptions — one current subscription per profile+role
-- ============================================================

create table if not exists public.subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  profile_id             uuid not null references public.profiles(id) on delete cascade,
  role                   text not null check (role in ('owner', 'broker', 'builder')),
  plan_id                uuid references public.plans(id) on delete set null,
  status                 text not null default 'none'
                           check (status in (
                             'none', 'trialing', 'active', 'past_due', 'grace',
                             'cancelled', 'expired', 'paused', 'downgraded',
                             'payment_failed', 'pending_activation', 'admin_granted'
                           )),
  source                 text not null default 'system'
                           check (source in ('system', 'payment', 'trial', 'admin_grant')),
  current_period_start   timestamptz,
  current_period_end     timestamptz,
  trial_end_at           timestamptz,
  grace_start_at         timestamptz,
  grace_end_at           timestamptz,
  cancel_at_period_end   boolean not null default false,
  cancelled_at           timestamptz,
  activated_payment_id   uuid,
  granted_by_staff_id    uuid references public.staff_profiles(id) on delete set null,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function mgp_set_updated_at();

-- Only one non-terminal subscription per (profile, role).
create unique index if not exists uq_subscription_active_per_role
  on public.subscriptions(profile_id, role)
  where status in ('trialing', 'active', 'grace', 'past_due', 'pending_activation', 'admin_granted');

-- ============================================================
-- TABLE: subscription_events — audited lifecycle timeline
-- ============================================================

create table if not exists public.subscription_events (
  id               uuid primary key default gen_random_uuid(),
  subscription_id  uuid not null references public.subscriptions(id) on delete cascade,
  event_type       text not null,
  from_status      text,
  to_status        text,
  actor_type       text not null default 'system' check (actor_type in ('system', 'user', 'staff', 'webhook')),
  actor_id         uuid,
  metadata_safe    jsonb,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- TABLE: usage_counters — real per-period usage (server-updated)
-- ============================================================

create table if not exists public.usage_counters (
  id               uuid primary key default gen_random_uuid(),
  profile_id       uuid not null references public.profiles(id) on delete cascade,
  role             text not null,
  feature_key      text not null,
  period_start     date not null default (now() at time zone 'utc')::date,
  used_count       integer not null default 0 check (used_count >= 0),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (profile_id, feature_key, period_start)
);

create trigger usage_counters_updated_at
  before update on public.usage_counters
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: payment_orders — checkout order + attempt lifecycle
-- ============================================================

create table if not exists public.payment_orders (
  id                     uuid primary key default gen_random_uuid(),
  profile_id             uuid not null references public.profiles(id) on delete cascade,
  role                   text not null,
  purpose                text not null default 'subscription'
                           check (purpose in ('subscription', 'add_on', 'renewal')),
  plan_id                uuid references public.plans(id) on delete set null,
  add_on_id              uuid,
  coupon_id              uuid,
  amount_gross           numeric(12, 2) not null,     -- before discount
  discount_amount        numeric(12, 2) not null default 0,
  amount_payable         numeric(12, 2) not null,     -- server-computed source of truth (INR major)
  amount_payable_paise   bigint not null,             -- what we send to Razorpay
  currency               text not null default 'INR' check (currency = 'INR'),
  provider               text not null default 'razorpay',
  provider_order_id      text,                        -- Razorpay order id
  status                 text not null default 'created'
                           check (status in (
                             'created', 'checkout_started', 'payment_authorized',
                             'payment_captured', 'payment_failed', 'webhook_verified',
                             'reconciled', 'expired', 'cancelled'
                           )),
  idempotency_key        text not null unique,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create trigger payment_orders_updated_at
  before update on public.payment_orders
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: payment_webhook_events — idempotent webhook ledger
-- provider_event_id is UNIQUE => duplicate webhook is a no-op insert.
-- ============================================================

create table if not exists public.payment_webhook_events (
  id                 uuid primary key default gen_random_uuid(),
  provider           text not null default 'razorpay',
  provider_event_id  text not null,
  event_type         text not null,
  signature_valid    boolean not null,
  processed          boolean not null default false,
  process_result     text,
  payment_order_id   uuid references public.payment_orders(id) on delete set null,
  received_at        timestamptz not null default now(),
  processed_at       timestamptz,
  unique (provider, provider_event_id)
);

-- ============================================================
-- TABLE: payments — verified payment records (webhook/provider only)
-- ============================================================

create table if not exists public.payments (
  id                     uuid primary key default gen_random_uuid(),
  profile_id             uuid not null references public.profiles(id) on delete cascade,
  payment_order_id       uuid references public.payment_orders(id) on delete set null,
  provider               text not null default 'razorpay',
  provider_payment_id    text,
  provider_order_id      text,
  amount                 numeric(12, 2) not null,
  currency               text not null default 'INR',
  status                 text not null default 'pending'
                           check (status in (
                             'pending', 'authorized', 'captured', 'failed', 'refunded',
                             'partially_refunded', 'disputed', 'chargeback',
                             'cancelled', 'verified', 'reconciled'
                           )),
  method                 text,
  webhook_event_id       uuid references public.payment_webhook_events(id) on delete set null,
  reconciliation_status  text not null default 'pending'
                           check (reconciliation_status in (
                             'pending', 'matched', 'amount_mismatch', 'currency_mismatch',
                             'missing_webhook', 'manual_review', 'resolved'
                           )),
  captured_at            timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  unique (provider, provider_payment_id)
);

create trigger payments_updated_at
  before update on public.payments
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: invoice_number_sequences — FY-based counter (concurrency-safe)
-- ============================================================

create table if not exists public.invoice_number_sequences (
  financial_year   text primary key,   -- e.g. '26-27'
  last_number      integer not null default 0
);

-- Concurrency-safe next invoice number. Uses INSERT .. ON CONFLICT DO UPDATE
-- with RETURNING so the row is locked and incremented atomically.
create or replace function mgp_next_invoice_number(p_fy text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_seq integer;
begin
  insert into public.invoice_number_sequences (financial_year, last_number)
  values (p_fy, 1)
  on conflict (financial_year)
  do update set last_number = public.invoice_number_sequences.last_number + 1
  returning last_number into v_seq;

  return 'MGP-' || p_fy || '-' || lpad(v_seq::text, 4, '0');
end;
$$;

-- ============================================================
-- TABLE: invoices — issued after verified payment / approved manual event
-- ============================================================

create table if not exists public.invoices (
  id                    uuid primary key default gen_random_uuid(),
  invoice_number        text unique,                 -- null while draft; set at issue
  profile_id            uuid not null references public.profiles(id) on delete cascade,
  payment_id            uuid references public.payments(id) on delete set null,
  subscription_id       uuid references public.subscriptions(id) on delete set null,
  financial_year        text,
  status                text not null default 'draft'
                          check (status in (
                            'draft', 'issued', 'paid', 'cancelled', 'refunded',
                            'partially_refunded', 'credit_note_issued', 'void'
                          )),
  -- snapshot of buyer billing profile at issue time
  buyer_legal_name      text,
  buyer_gstin           text,
  buyer_address         text,
  buyer_state_code      text,
  place_of_supply       text,
  is_b2b                boolean not null default false,
  -- GST breakdown
  taxable_amount        numeric(12, 2) not null default 0,
  cgst_amount           numeric(12, 2) not null default 0,
  sgst_amount           numeric(12, 2) not null default 0,
  igst_amount           numeric(12, 2) not null default 0,
  total_amount          numeric(12, 2) not null default 0,
  currency              text not null default 'INR',
  notes                 text,
  issued_at             timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create trigger invoices_updated_at
  before update on public.invoices
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: invoice_line_items
-- ============================================================

create table if not exists public.invoice_line_items (
  id            uuid primary key default gen_random_uuid(),
  invoice_id    uuid not null references public.invoices(id) on delete cascade,
  description   text not null,
  quantity      integer not null default 1,
  unit_amount   numeric(12, 2) not null,
  taxable_amount numeric(12, 2) not null,
  gst_rate_percent numeric(5, 2) not null default 18.00,
  line_total    numeric(12, 2) not null,
  created_at    timestamptz not null default now()
);

-- ============================================================
-- TABLE: gst_profiles — buyer billing profile (own-user)
-- ============================================================

create table if not exists public.gst_profiles (
  id             uuid primary key default gen_random_uuid(),
  profile_id     uuid not null references public.profiles(id) on delete cascade unique,
  legal_name     text,
  gstin          text,
  address        text,
  city           text,
  state_code     text,
  pin_code       text,
  is_b2b         boolean not null default false,
  invoice_email  text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger gst_profiles_updated_at
  before update on public.gst_profiles
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: coupons (server-validated; NOT public-readable)
-- ============================================================

create table if not exists public.coupons (
  id                 uuid primary key default gen_random_uuid(),
  code               text not null unique,
  discount_type      text not null check (discount_type in ('percentage', 'fixed_amount')),
  discount_value     numeric(12, 2) not null check (discount_value >= 0),
  max_discount       numeric(12, 2),
  applies_role       text check (applies_role in ('owner', 'broker', 'builder')),
  applies_plan_id    uuid references public.plans(id) on delete cascade,
  min_amount         numeric(12, 2) not null default 0,
  usage_limit        integer,
  per_user_limit     integer not null default 1,
  used_count         integer not null default 0,
  is_active          boolean not null default true,
  expires_at         timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create trigger coupons_updated_at
  before update on public.coupons
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: coupon_redemptions
-- ============================================================

create table if not exists public.coupon_redemptions (
  id               uuid primary key default gen_random_uuid(),
  coupon_id        uuid not null references public.coupons(id) on delete cascade,
  profile_id       uuid not null references public.profiles(id) on delete cascade,
  payment_order_id uuid references public.payment_orders(id) on delete set null,
  discount_amount  numeric(12, 2) not null,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- TABLE: trials — one per profile+role
-- ============================================================

create table if not exists public.trials (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid not null references public.profiles(id) on delete cascade,
  role          text not null check (role in ('owner', 'broker', 'builder')),
  plan_id       uuid references public.plans(id) on delete set null,
  status        text not null default 'active'
                  check (status in ('eligible', 'active', 'used', 'expired', 'revoked', 'not_eligible')),
  started_at    timestamptz not null default now(),
  ends_at       timestamptz not null,
  granted_by_staff_id uuid references public.staff_profiles(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (profile_id, role)
);

create trigger trials_updated_at
  before update on public.trials
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: add_ons (catalog) + add_on_purchases
-- ============================================================

create table if not exists public.add_ons (
  id             uuid primary key default gen_random_uuid(),
  add_on_code    text not null unique,
  role           text check (role in ('owner', 'broker', 'builder')),
  name           text not null,
  description    text,
  price_amount   numeric(12, 2) not null default 0,
  currency       text not null default 'INR',
  quantity_grant integer not null default 1,
  feature_key    text not null,
  is_active      boolean not null default true,
  is_public      boolean not null default true,
  is_placeholder_pricing boolean not null default false,
  display_order  integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger add_ons_updated_at
  before update on public.add_ons
  for each row execute function mgp_set_updated_at();

create table if not exists public.add_on_purchases (
  id             uuid primary key default gen_random_uuid(),
  profile_id     uuid not null references public.profiles(id) on delete cascade,
  add_on_id      uuid not null references public.add_ons(id) on delete cascade,
  payment_id     uuid references public.payments(id) on delete set null,
  quantity       integer not null default 1,
  status         text not null default 'pending_activation'
                   check (status in ('pending_activation', 'active', 'consumed', 'expired', 'cancelled')),
  expires_at     timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger add_on_purchases_updated_at
  before update on public.add_on_purchases
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: refunds + credit_notes (foundation)
-- ============================================================

create table if not exists public.refunds (
  id                 uuid primary key default gen_random_uuid(),
  payment_id         uuid not null references public.payments(id) on delete cascade,
  profile_id         uuid not null references public.profiles(id) on delete cascade,
  amount             numeric(12, 2) not null,
  reason             text,
  status             text not null default 'requested'
                       check (status in ('requested', 'approved', 'processing', 'processed', 'failed', 'rejected', 'cancelled')),
  provider_refund_id text,
  requested_by       uuid,
  approved_by_staff_id uuid references public.staff_profiles(id) on delete set null,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create trigger refunds_updated_at
  before update on public.refunds
  for each row execute function mgp_set_updated_at();

create table if not exists public.credit_notes (
  id                 uuid primary key default gen_random_uuid(),
  credit_note_number text unique,
  invoice_id         uuid not null references public.invoices(id) on delete cascade,
  refund_id          uuid references public.refunds(id) on delete set null,
  profile_id         uuid not null references public.profiles(id) on delete cascade,
  amount             numeric(12, 2) not null,
  tax_reversal       numeric(12, 2) not null default 0,
  reason             text,
  status             text not null default 'issued' check (status in ('draft', 'issued', 'cancelled')),
  issued_at          timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create trigger credit_notes_updated_at
  before update on public.credit_notes
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: billing_audit_logs — high-risk billing actions
-- ============================================================

create table if not exists public.billing_audit_logs (
  id            uuid primary key default gen_random_uuid(),
  actor_type    text not null default 'system' check (actor_type in ('system', 'user', 'staff', 'webhook')),
  actor_id      uuid,
  action        text not null,
  entity_type   text,
  entity_id     uuid,
  reason        text,
  metadata_safe jsonb,
  created_at    timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_plans_role_active     on public.plans(role, is_active, is_public, display_order);
create index if not exists idx_plans_code            on public.plans(plan_code);

create index if not exists idx_subs_profile          on public.subscriptions(profile_id);
create index if not exists idx_subs_profile_role     on public.subscriptions(profile_id, role);
create index if not exists idx_subs_plan             on public.subscriptions(plan_id);
create index if not exists idx_subs_status           on public.subscriptions(status);
create index if not exists idx_subs_period_end       on public.subscriptions(current_period_end);

create index if not exists idx_sub_events_sub        on public.subscription_events(subscription_id, created_at desc);

create index if not exists idx_usage_profile_feature on public.usage_counters(profile_id, feature_key, period_start);

create index if not exists idx_porders_profile       on public.payment_orders(profile_id, created_at desc);
create index if not exists idx_porders_provider_oid  on public.payment_orders(provider_order_id);
create index if not exists idx_porders_status        on public.payment_orders(status);

create index if not exists idx_webhook_event_type    on public.payment_webhook_events(event_type);
create index if not exists idx_webhook_processed     on public.payment_webhook_events(processed_at);

create index if not exists idx_payments_profile      on public.payments(profile_id, created_at desc);
create index if not exists idx_payments_provider_pid on public.payments(provider_payment_id);
create index if not exists idx_payments_provider_oid on public.payments(provider_order_id);
create index if not exists idx_payments_status       on public.payments(status);

create index if not exists idx_invoices_profile      on public.invoices(profile_id, created_at desc);
create index if not exists idx_invoices_number       on public.invoices(invoice_number);
create index if not exists idx_invoices_fy           on public.invoices(financial_year);
create index if not exists idx_invoices_status       on public.invoices(status);
create index if not exists idx_invoice_lines_invoice on public.invoice_line_items(invoice_id);

create index if not exists idx_gst_profiles_profile  on public.gst_profiles(profile_id);

create index if not exists idx_coupons_code          on public.coupons(code);
create index if not exists idx_coupons_active        on public.coupons(is_active, expires_at);
create index if not exists idx_coupon_redemptions    on public.coupon_redemptions(coupon_id, profile_id);

create index if not exists idx_trials_profile_role   on public.trials(profile_id, role);

create index if not exists idx_add_ons_role_active   on public.add_ons(role, is_active, is_public, display_order);
create index if not exists idx_add_on_purchases_prof on public.add_on_purchases(profile_id, created_at desc);

create index if not exists idx_refunds_payment       on public.refunds(payment_id);
create index if not exists idx_refunds_profile       on public.refunds(profile_id);
create index if not exists idx_refunds_status        on public.refunds(status);
create index if not exists idx_credit_notes_invoice  on public.credit_notes(invoice_id);
create index if not exists idx_credit_notes_profile  on public.credit_notes(profile_id);

create index if not exists idx_billing_audit_entity  on public.billing_audit_logs(entity_type, entity_id, created_at desc);

-- ============================================================
-- RLS: enable on all new tables
-- ============================================================

alter table public.plans                    enable row level security;
alter table public.subscriptions            enable row level security;
alter table public.subscription_events      enable row level security;
alter table public.usage_counters           enable row level security;
alter table public.payment_orders           enable row level security;
alter table public.payment_webhook_events   enable row level security;
alter table public.payments                 enable row level security;
alter table public.invoices                 enable row level security;
alter table public.invoice_line_items       enable row level security;
alter table public.invoice_number_sequences enable row level security;
alter table public.gst_profiles             enable row level security;
alter table public.coupons                  enable row level security;
alter table public.coupon_redemptions       enable row level security;
alter table public.trials                   enable row level security;
alter table public.add_ons                  enable row level security;
alter table public.add_on_purchases         enable row level security;
alter table public.refunds                  enable row level security;
alter table public.credit_notes             enable row level security;
alter table public.billing_audit_logs       enable row level security;

-- ------------------------------------------------------------
-- Public catalog reads: plans + add_ons (active + public only).
-- Internal/inactive plans are invisible to the anon key.
-- ------------------------------------------------------------

create policy "plans: public reads active public"
  on public.plans for select
  using (is_active = true and is_public = true);

create policy "add_ons: public reads active public"
  on public.add_ons for select
  using (is_active = true and is_public = true);

-- coupons: NO select policy => not readable via anon key. Validation is
-- server-side only (service role), so discount rules cannot be scraped.
-- invoice_number_sequences: NO policy => service-role only.
-- subscription_events / payment_webhook_events / billing_audit_logs:
--   NO policy => service-role server paths only.

-- ------------------------------------------------------------
-- Own-user read policies (private billing data)
-- ------------------------------------------------------------

create policy "subscriptions: own read"
  on public.subscriptions for select
  using (profile_id = mgp_get_my_profile_id());

create policy "usage_counters: own read"
  on public.usage_counters for select
  using (profile_id = mgp_get_my_profile_id());

create policy "payment_orders: own read"
  on public.payment_orders for select
  using (profile_id = mgp_get_my_profile_id());

create policy "payments: own read"
  on public.payments for select
  using (profile_id = mgp_get_my_profile_id());

create policy "invoices: own read"
  on public.invoices for select
  using (profile_id = mgp_get_my_profile_id());

create policy "invoice_line_items: own read via invoice"
  on public.invoice_line_items for select
  using (
    exists (
      select 1 from public.invoices i
      where i.id = invoice_line_items.invoice_id
        and i.profile_id = mgp_get_my_profile_id()
    )
  );

create policy "gst_profiles: own read"
  on public.gst_profiles for select
  using (profile_id = mgp_get_my_profile_id());

create policy "gst_profiles: own upsert"
  on public.gst_profiles for insert
  with check (profile_id = mgp_get_my_profile_id());

create policy "gst_profiles: own update"
  on public.gst_profiles for update
  using (profile_id = mgp_get_my_profile_id())
  with check (profile_id = mgp_get_my_profile_id());

create policy "coupon_redemptions: own read"
  on public.coupon_redemptions for select
  using (profile_id = mgp_get_my_profile_id());

create policy "trials: own read"
  on public.trials for select
  using (profile_id = mgp_get_my_profile_id());

create policy "add_on_purchases: own read"
  on public.add_on_purchases for select
  using (profile_id = mgp_get_my_profile_id());

create policy "refunds: own read"
  on public.refunds for select
  using (profile_id = mgp_get_my_profile_id());

create policy "credit_notes: own read"
  on public.credit_notes for select
  using (profile_id = mgp_get_my_profile_id());

-- NOTE: no client INSERT/UPDATE policies on subscriptions, payments,
-- payment_orders, invoices, etc. — all money/subscription writes go through
-- server actions + the webhook using the service-role client. A logged-in
-- user therefore CANNOT mark a payment paid or activate a subscription from
-- the client (enforces the hard payment rule at the database layer).

-- ============================================================
-- SEED: real Free plans (active, public) + indicative paid plans
-- (paid plans flagged is_placeholder_pricing = true so the UI labels them
--  "indicative pricing" — no fake final price is presented as final).
-- ON CONFLICT DO NOTHING keeps this idempotent.
-- ============================================================

insert into public.plans (plan_code, role, name, description, billing_cycle, price_amount, gst_rate_percent, is_placeholder_pricing, features, limits, is_active, is_public, display_order)
values
  -- Free plans (real, price 0)
  ('owner_free', 'owner', 'Owner Free', 'Get started — post a couple of listings free.', 'free', 0, 18, false,
    '{"analytics_access": false, "public_profile_allowed": false}'::jsonb,
    '{"property_posts_limit": 2, "requirement_posts_limit": 1, "active_listing_limit": 2, "contact_unlock_limit": 5}'::jsonb,
    true, true, 10),
  ('broker_free', 'broker', 'Broker Free', 'Start listing and receiving leads.', 'free', 0, 18, false,
    '{"analytics_access": false, "public_profile_allowed": true}'::jsonb,
    '{"property_posts_limit": 3, "requirement_posts_limit": 2, "active_listing_limit": 3, "contact_unlock_limit": 10}'::jsonb,
    true, true, 10),
  ('builder_free', 'builder', 'Builder Free', 'Publish your first project.', 'free', 0, 18, false,
    '{"analytics_access": false, "ads_allowed": false}'::jsonb,
    '{"project_posts_limit": 1, "active_listing_limit": 1, "agent_limit": 1}'::jsonb,
    true, true, 10),
  -- Paid plans (indicative test pricing — is_placeholder_pricing = true)
  ('owner_pro', 'owner', 'Owner Pro', 'More listings, analytics and priority visibility.', 'monthly', 499, 18, true,
    '{"analytics_access": true, "public_profile_allowed": true, "featured_listing_allowed": true}'::jsonb,
    '{"property_posts_limit": 20, "requirement_posts_limit": 10, "active_listing_limit": 20, "contact_unlock_limit": 100}'::jsonb,
    true, true, 20),
  ('broker_pro', 'broker', 'Broker Pro', 'CRM, higher limits and public profile.', 'monthly', 999, 18, true,
    '{"analytics_access": true, "public_profile_allowed": true, "featured_listing_allowed": true}'::jsonb,
    '{"property_posts_limit": 50, "requirement_posts_limit": 25, "active_listing_limit": 50, "contact_unlock_limit": 300}'::jsonb,
    true, true, 20),
  ('builder_pro', 'builder', 'Builder Pro', 'Multiple projects, agents and promotions eligibility.', 'monthly', 2999, 18, true,
    '{"analytics_access": true, "ads_allowed": true, "public_profile_allowed": true}'::jsonb,
    '{"project_posts_limit": 10, "active_listing_limit": 10, "agent_limit": 10}'::jsonb,
    true, true, 20)
on conflict (plan_code) do nothing;

-- ============================================================
-- ROLLBACK NOTES
-- Destructive: No. All additive. To fully roll back at the DB layer, run the
-- statements below in order (children before parents). Application-layer
-- rollback (revert code) is safe to do without dropping tables.
-- ============================================================

-- drop function if exists mgp_next_invoice_number(text);
-- drop table if exists public.billing_audit_logs cascade;
-- drop table if exists public.credit_notes cascade;
-- drop table if exists public.refunds cascade;
-- drop table if exists public.add_on_purchases cascade;
-- drop table if exists public.add_ons cascade;
-- drop table if exists public.trials cascade;
-- drop table if exists public.coupon_redemptions cascade;
-- drop table if exists public.coupons cascade;
-- drop table if exists public.gst_profiles cascade;
-- drop table if exists public.invoice_line_items cascade;
-- drop table if exists public.invoices cascade;
-- drop table if exists public.invoice_number_sequences cascade;
-- drop table if exists public.payments cascade;
-- drop table if exists public.payment_webhook_events cascade;
-- drop table if exists public.payment_orders cascade;
-- drop table if exists public.usage_counters cascade;
-- drop table if exists public.subscription_events cascade;
-- drop table if exists public.subscriptions cascade;
-- drop table if exists public.plans cascade;
