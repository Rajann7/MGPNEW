import "server-only";
import { createServiceClient } from "@/lib/supabase/service";
import { computeGst, financialYear } from "@/lib/billing/gst";
import type { Subscription, Plan, PaymentOrder } from "@/types";

/**
 * Subscription + activation core. All functions here run server-side with the
 * service-role client and are called only from trusted paths (server actions,
 * the verified webhook). None of this is reachable from the client.
 */

const ACTIVE_STATUSES = ["trialing", "active", "grace", "admin_granted"];

/** Current non-terminal subscription for a profile+role, or null. */
export async function getActiveSubscription(
  profileId: string,
  role: string
): Promise<Subscription | null> {
  const admin = createServiceClient();
  const { data } = await admin
    .from("subscriptions")
    .select("*")
    .eq("profile_id", profileId)
    .eq("role", role)
    .in("status", [...ACTIVE_STATUSES, "past_due", "pending_activation"])
    .order("created_at", { ascending: false })
    .maybeSingle();
  return (data as Subscription) ?? null;
}

export function isSubscriptionActive(sub: Subscription | null): boolean {
  if (!sub) return false;
  if (!ACTIVE_STATUSES.includes(sub.status)) return false;
  if (sub.current_period_end && new Date(sub.current_period_end) < new Date()) {
    return sub.status === "grace"; // grace still counts as limited-active
  }
  return true;
}

function periodEndFor(
  cycle: Plan["billing_cycle"],
  from = new Date()
): Date | null {
  const d = new Date(from);
  switch (cycle) {
    case "monthly":
      d.setMonth(d.getMonth() + 1);
      return d;
    case "quarterly":
      d.setMonth(d.getMonth() + 3);
      return d;
    case "yearly":
      d.setFullYear(d.getFullYear() + 1);
      return d;
    case "one_time":
      d.setFullYear(d.getFullYear() + 1);
      return d;
    default:
      return null; // free / trial handled elsewhere
  }
}

async function logSubscriptionEvent(
  subscriptionId: string,
  eventType: string,
  from: string | null,
  to: string,
  actorType: string,
  actorId?: string
) {
  const admin = createServiceClient();
  await admin.from("subscription_events").insert({
    subscription_id: subscriptionId,
    event_type: eventType,
    from_status: from,
    to_status: to,
    actor_type: actorType,
    actor_id: actorId ?? null,
  });
}

async function logBillingAudit(
  action: string,
  entityType: string,
  entityId: string,
  actorType: string,
  actorId?: string,
  metadata?: Record<string, unknown>
) {
  const admin = createServiceClient();
  await admin.from("billing_audit_logs").insert({
    actor_type: actorType,
    actor_id: actorId ?? null,
    action,
    entity_type: entityType,
    entity_id: entityId,
    metadata_safe: metadata ?? null,
  });
}

/**
 * Activate (or renew) a subscription from a VERIFIED payment. Idempotent per
 * payment: if an invoice already exists for this payment, do nothing.
 * Called only from the webhook after signature + amount verification.
 */
export async function activateSubscriptionFromPayment(
  paymentId: string
): Promise<{ ok: boolean; invoiceId?: string }> {
  const admin = createServiceClient();

  const { data: payment } = await admin
    .from("payments")
    .select("*")
    .eq("id", paymentId)
    .maybeSingle();
  if (
    !payment ||
    (payment.status !== "captured" && payment.status !== "verified")
  )
    return { ok: false };

  // Idempotency: one invoice per payment.
  const { data: existingInvoice } = await admin
    .from("invoices")
    .select("id")
    .eq("payment_id", paymentId)
    .maybeSingle();
  if (existingInvoice) return { ok: true, invoiceId: existingInvoice.id };

  const { data: order } = await admin
    .from("payment_orders")
    .select("*")
    .eq("id", payment.payment_order_id)
    .maybeSingle();
  if (!order) return { ok: false };
  const o = order as PaymentOrder;
  if (o.purpose !== "subscription") return { ok: true }; // add-on activation handled separately (foundation)

  const { data: plan } = await admin
    .from("plans")
    .select("*")
    .eq("id", o.plan_id)
    .maybeSingle();
  if (!plan) return { ok: false };
  const p = plan as Plan;

  const now = new Date();
  const periodEnd = periodEndFor(p.billing_cycle, now);

  // Upsert the single active subscription for this profile+role.
  const existing = await getActiveSubscription(o.profile_id, o.role);
  let subscriptionId: string;
  if (existing) {
    await admin
      .from("subscriptions")
      .update({
        plan_id: p.id,
        status: "active",
        source: "payment",
        current_period_start: now.toISOString(),
        current_period_end: periodEnd?.toISOString() ?? null,
        activated_payment_id: paymentId,
        cancel_at_period_end: false,
      })
      .eq("id", existing.id);
    subscriptionId = existing.id;
    await logSubscriptionEvent(
      subscriptionId,
      "activated_payment",
      existing.status,
      "active",
      "webhook"
    );
  } else {
    const { data: created } = await admin
      .from("subscriptions")
      .insert({
        profile_id: o.profile_id,
        role: o.role,
        plan_id: p.id,
        status: "active",
        source: "payment",
        current_period_start: now.toISOString(),
        current_period_end: periodEnd?.toISOString() ?? null,
        activated_payment_id: paymentId,
      })
      .select("id")
      .single();
    subscriptionId = created!.id;
    await logSubscriptionEvent(
      subscriptionId,
      "activated_payment",
      null,
      "active",
      "webhook"
    );
  }

  // Generate the invoice (only now — after verified payment).
  const invoiceId = await generateInvoiceForPayment(
    paymentId,
    o,
    p,
    subscriptionId
  );

  await logBillingAudit(
    "subscription_activated",
    "subscription",
    subscriptionId,
    "webhook",
    undefined,
    { paymentId }
  );
  return { ok: true, invoiceId: invoiceId ?? undefined };
}

/**
 * Generate a GST invoice with a sequential FY-based number for a verified
 * payment. Snapshots the buyer GST profile. Idempotent (checked by caller).
 */
export async function generateInvoiceForPayment(
  paymentId: string,
  order: PaymentOrder,
  plan: Plan,
  subscriptionId: string
): Promise<string | null> {
  const admin = createServiceClient();

  const { data: gst } = await admin
    .from("gst_profiles")
    .select("*")
    .eq("profile_id", order.profile_id)
    .maybeSingle();
  const breakdown = computeGst(
    order.amount_payable,
    plan.gst_rate_percent,
    plan.gst_inclusive,
    gst?.state_code ?? null
  );
  const fy = financialYear();

  // Concurrency-safe sequential invoice number via DB function.
  const { data: numRes, error: numErr } = await admin.rpc(
    "mgp_next_invoice_number",
    { p_fy: fy }
  );
  if (numErr || !numRes) {
    console.error("[invoice] number generation failed:", numErr?.code);
    return null;
  }
  const invoiceNumber = numRes as string;

  const { data: invoice, error } = await admin
    .from("invoices")
    .insert({
      invoice_number: invoiceNumber,
      profile_id: order.profile_id,
      payment_id: paymentId,
      subscription_id: subscriptionId,
      financial_year: fy,
      status: "paid",
      buyer_legal_name: gst?.legal_name ?? null,
      buyer_gstin: gst?.gstin ?? null,
      buyer_address: gst?.address ?? null,
      buyer_state_code: gst?.state_code ?? null,
      place_of_supply: gst?.state_code ?? null,
      is_b2b: Boolean(gst?.is_b2b && gst?.gstin),
      taxable_amount: breakdown.taxableAmount,
      cgst_amount: breakdown.cgst,
      sgst_amount: breakdown.sgst,
      igst_amount: breakdown.igst,
      total_amount: breakdown.total,
      issued_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error || !invoice) {
    console.error("[invoice] insert failed:", error?.code);
    return null;
  }

  await admin.from("invoice_line_items").insert({
    invoice_id: invoice.id,
    description: `${plan.name} (${plan.billing_cycle})`,
    quantity: 1,
    unit_amount: order.amount_payable,
    taxable_amount: breakdown.taxableAmount,
    gst_rate_percent: plan.gst_rate_percent,
    line_total: breakdown.total,
  });

  await logBillingAudit(
    "invoice_issued",
    "invoice",
    invoice.id,
    "webhook",
    undefined,
    { invoiceNumber }
  );
  return invoice.id;
}
