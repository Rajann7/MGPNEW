"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { requireStaffPermission } from "@/lib/auth/session";
import {
  isRazorpayConfigured,
  isWebhookConfigured,
} from "@/lib/razorpay/client";
import { gatesEnforced } from "@/lib/billing/gates";
import type { ActionResult, Plan } from "@/types";

function isMissingTable(code?: string): boolean {
  return code === "42P01" || code === "PGRST205";
}

export interface AdminBillingOverview {
  schemaReady: boolean;
  provider: {
    razorpayConfigured: boolean;
    webhookConfigured: boolean;
    mode: string;
    gatesEnforced: boolean;
  };
  counts: {
    plans: number;
    activeSubscriptions: number;
    trialingSubscriptions: number;
    payments: number;
    invoices: number;
    refundsPending: number;
  };
  plans: Plan[];
  recentPayments: {
    id: string;
    amount: number;
    status: string;
    reconciliation_status: string;
    provider_payment_id_masked: string | null;
    created_at: string;
  }[];
}

// ============================================================
// getAdminBillingOverview — permission-gated ("billing" module, can_read).
// Sensitive provider payment ids are masked; no secrets ever returned.
// Uses real counts only — never fabricated revenue/counts.
// ============================================================

export async function getAdminBillingOverview(): Promise<
  ActionResult<AdminBillingOverview>
> {
  await requireStaffPermission("billing", "can_read");

  const admin = createServiceClient();

  // Probe schema with the plans table.
  const { error: probeErr } = await admin
    .from("plans")
    .select("id", { head: true, count: "exact" });
  if (probeErr && isMissingTable(probeErr.code)) {
    return {
      success: true,
      data: {
        schemaReady: false,
        provider: {
          razorpayConfigured: isRazorpayConfigured(),
          webhookConfigured: isWebhookConfigured(),
          mode: process.env.RAZORPAY_MODE ?? "test",
          gatesEnforced: gatesEnforced(),
        },
        counts: {
          plans: 0,
          activeSubscriptions: 0,
          trialingSubscriptions: 0,
          payments: 0,
          invoices: 0,
          refundsPending: 0,
        },
        plans: [],
        recentPayments: [],
      },
    };
  }

  const [
    plansRes,
    activeSubs,
    trialSubs,
    paymentsCount,
    invoicesCount,
    refundsPending,
    plansList,
    recentPaymentsRes,
  ] = await Promise.all([
    admin.from("plans").select("id", { count: "exact", head: true }),
    admin
      .from("subscriptions")
      .select("id", { count: "exact", head: true })
      .in("status", ["active", "grace", "admin_granted"]),
    admin
      .from("subscriptions")
      .select("id", { count: "exact", head: true })
      .eq("status", "trialing"),
    admin.from("payments").select("id", { count: "exact", head: true }),
    admin.from("invoices").select("id", { count: "exact", head: true }),
    admin
      .from("refunds")
      .select("id", { count: "exact", head: true })
      .eq("status", "requested"),
    admin.from("plans").select("*").order("role").order("display_order"),
    admin
      .from("payments")
      .select(
        "id, amount, status, reconciliation_status, provider_payment_id, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const recentPayments = (recentPaymentsRes.data ?? []).map((p) => ({
    id: p.id,
    amount: p.amount,
    status: p.status,
    reconciliation_status: p.reconciliation_status,
    // Mask provider payment id — show last 4 only.
    provider_payment_id_masked: p.provider_payment_id
      ? `••••${String(p.provider_payment_id).slice(-4)}`
      : null,
    created_at: p.created_at,
  }));

  return {
    success: true,
    data: {
      schemaReady: true,
      provider: {
        razorpayConfigured: isRazorpayConfigured(),
        webhookConfigured: isWebhookConfigured(),
        mode: process.env.RAZORPAY_MODE ?? "test",
        gatesEnforced: gatesEnforced(),
      },
      counts: {
        plans: plansRes.count ?? 0,
        activeSubscriptions: activeSubs.count ?? 0,
        trialingSubscriptions: trialSubs.count ?? 0,
        payments: paymentsCount.count ?? 0,
        invoices: invoicesCount.count ?? 0,
        refundsPending: refundsPending.count ?? 0,
      },
      plans: (plansList.data ?? []) as Plan[],
      recentPayments,
    },
  };
}
