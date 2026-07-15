-- ============================================================
-- Migration: Batch 10 Billing & Payments extensions
-- Phase: Phase 4 (Batch 10)
-- Purpose: Link payment_orders to the specific add_on_purchases
--          row it should activate (unambiguous, idempotent
--          webhook activation for add-on checkout).
-- Tables altered: payment_orders (add_on_purchase_id)
-- RLS: no change — existing "payment_orders: own read" policy
--      already covers the new column.
-- Destructive: No (additive column only)
-- Backup required: No
-- Rollback: see commented statement at bottom
-- ============================================================

alter table public.payment_orders
  add column if not exists add_on_purchase_id uuid references public.add_on_purchases(id) on delete set null;

create index if not exists idx_payment_orders_addon_purchase on public.payment_orders(add_on_purchase_id);

-- ============================================================
-- add_ons: GST rate columns (mirrors plans.gst_rate_percent /
-- .gst_inclusive) — add-on invoices reuse the same computeGst()
-- helper as plan invoices, so they need the same inputs instead
-- of a hardcoded rate.
-- ============================================================

alter table public.add_ons
  add column if not exists gst_rate_percent numeric(5, 2) not null default 18,
  add column if not exists gst_inclusive boolean not null default false;

-- ============================================================
-- ROLLBACK NOTES
-- ============================================================

-- alter table public.payment_orders drop column if exists add_on_purchase_id;
