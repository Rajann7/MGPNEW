import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import {
  verifyWebhookSignature,
  isWebhookConfigured,
} from "@/lib/razorpay/client";
import { activateSubscriptionFromPayment } from "@/lib/billing/subscription";

// Node runtime required: raw body + node:crypto HMAC.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Razorpay webhook — the ONLY path that marks a payment captured/verified and
 * activates a subscription + issues an invoice.
 *
 * Security:
 *  - Reads the RAW body for signature verification (no JSON parse before verify).
 *  - Verifies X-Razorpay-Signature (HMAC-SHA256) with RAZORPAY_WEBHOOK_SECRET.
 *  - Idempotent: provider event id is UNIQUE in payment_webhook_events; a
 *    duplicate delivery is recorded but not re-processed (no duplicate invoice).
 *  - Validates order reference + amount + currency before activation.
 *  - Never exposes secrets or internal errors in the response body.
 */
export async function POST(request: NextRequest) {
  if (!isWebhookConfigured()) {
    // Honest setup-required — do not pretend to accept payments.
    return NextResponse.json(
      { error: "RAZORPAY_WEBHOOK_SETUP_REQUIRED" },
      { status: 503 }
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  const valid = verifyWebhookSignature(rawBody, signature);

  let event: {
    event?: string;
    payload?: {
      payment?: {
        entity?: {
          id?: string;
          order_id?: string;
          amount?: number;
          currency?: string;
          method?: string;
          status?: string;
        };
      };
    };
    id?: string;
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  const admin = createServiceClient();
  // Prefer Razorpay's per-event id header; fall back to payment id.
  const eventId =
    request.headers.get("x-razorpay-event-id") ||
    event.payload?.payment?.entity?.id ||
    event.id ||
    "";
  const eventType = event.event ?? "unknown";

  // Record the webhook attempt (idempotent on provider_event_id).
  const { data: inserted, error: insErr } = await admin
    .from("payment_webhook_events")
    .insert({
      provider: "razorpay",
      provider_event_id: eventId || `noid_${Date.now()}`,
      event_type: eventType,
      signature_valid: valid,
    })
    .select("id")
    .maybeSingle();

  if (insErr) {
    // Unique violation => duplicate event already recorded. Idempotent no-op.
    if (insErr.code === "23505") {
      return NextResponse.json(
        { status: "duplicate_ignored" },
        { status: 200 }
      );
    }
    console.error("[razorpay-webhook] record error:", insErr.code);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }

  const webhookRowId = inserted!.id;

  if (!valid) {
    await admin
      .from("payment_webhook_events")
      .update({
        processed: true,
        process_result: "signature_invalid",
        processed_at: new Date().toISOString(),
      })
      .eq("id", webhookRowId);
    return NextResponse.json(
      { error: "WEBHOOK_SIGNATURE_INVALID" },
      { status: 400 }
    );
  }

  // Only act on capture-type events for one-time orders this phase.
  const handled = ["payment.captured", "order.paid", "payment.authorized"];
  if (!handled.includes(eventType)) {
    await admin
      .from("payment_webhook_events")
      .update({
        processed: true,
        process_result: "unsupported_event",
        processed_at: new Date().toISOString(),
      })
      .eq("id", webhookRowId);
    return NextResponse.json(
      { status: "ignored_unsupported_event" },
      { status: 200 }
    );
  }

  const entity = event.payload?.payment?.entity;
  const providerPaymentId = entity?.id;
  const providerOrderId = entity?.order_id;
  const amountPaise = entity?.amount;
  const currency = entity?.currency ?? "INR";

  if (!providerOrderId || !providerPaymentId || amountPaise === undefined) {
    await admin
      .from("payment_webhook_events")
      .update({
        processed: true,
        process_result: "missing_fields",
        processed_at: new Date().toISOString(),
      })
      .eq("id", webhookRowId);
    return NextResponse.json({ error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  // Match local order + verify amount/currency.
  const { data: order } = await admin
    .from("payment_orders")
    .select("*")
    .eq("provider_order_id", providerOrderId)
    .maybeSingle();
  if (!order) {
    await admin
      .from("payment_webhook_events")
      .update({
        processed: true,
        process_result: "unknown_order",
        processed_at: new Date().toISOString(),
      })
      .eq("id", webhookRowId);
    return NextResponse.json({ status: "unknown_order" }, { status: 200 });
  }

  let reconciliation = "matched";
  if (amountPaise !== order.amount_payable_paise)
    reconciliation = "amount_mismatch";
  else if (currency !== "INR") reconciliation = "currency_mismatch";

  // Upsert the verified payment (idempotent on provider_payment_id).
  const { data: existingPayment } = await admin
    .from("payments")
    .select("id")
    .eq("provider_payment_id", providerPaymentId)
    .maybeSingle();

  let paymentId: string;
  if (existingPayment) {
    paymentId = existingPayment.id;
  } else {
    const captured = reconciliation === "matched";
    const { data: payment, error: payErr } = await admin
      .from("payments")
      .insert({
        profile_id: order.profile_id,
        payment_order_id: order.id,
        provider: "razorpay",
        provider_payment_id: providerPaymentId,
        provider_order_id: providerOrderId,
        amount: order.amount_payable,
        currency: "INR",
        status: captured ? "captured" : "disputed",
        method: entity?.method ?? null,
        webhook_event_id: webhookRowId,
        reconciliation_status:
          reconciliation === "matched" ? "matched" : reconciliation,
        captured_at: captured ? new Date().toISOString() : null,
      })
      .select("id")
      .single();
    if (payErr || !payment) {
      await admin
        .from("payment_webhook_events")
        .update({
          processed: true,
          process_result: "payment_insert_failed",
          processed_at: new Date().toISOString(),
        })
        .eq("id", webhookRowId);
      return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
    }
    paymentId = payment.id;
  }

  // Amount/currency mismatch => do NOT activate. Flag for manual review.
  if (reconciliation !== "matched") {
    await admin
      .from("payment_orders")
      .update({ status: "payment_failed" })
      .eq("id", order.id);
    await admin
      .from("payment_webhook_events")
      .update({
        processed: true,
        process_result: reconciliation,
        payment_order_id: order.id,
        processed_at: new Date().toISOString(),
      })
      .eq("id", webhookRowId);
    await admin.from("billing_audit_logs").insert({
      actor_type: "webhook",
      action: "payment_reconciliation_mismatch",
      entity_type: "payment",
      entity_id: paymentId,
      reason: reconciliation,
    });
    return NextResponse.json({ status: "recorded_mismatch" }, { status: 200 });
  }

  // Verified + matched → activate subscription + issue invoice (idempotent).
  await admin
    .from("payment_orders")
    .update({ status: "webhook_verified" })
    .eq("id", order.id);
  const result = await activateSubscriptionFromPayment(paymentId);

  await admin
    .from("payment_webhook_events")
    .update({
      processed: true,
      process_result: result.ok ? "activated" : "activation_failed",
      payment_order_id: order.id,
      processed_at: new Date().toISOString(),
    })
    .eq("id", webhookRowId);

  return NextResponse.json({ status: "ok" }, { status: 200 });
}
