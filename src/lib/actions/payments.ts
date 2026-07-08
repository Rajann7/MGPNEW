"use server";

import { randomUUID } from "node:crypto";
import { createServiceClient } from "@/lib/supabase/service";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  createRazorpayOrder,
  getPublicKeyId,
  isRazorpayConfigured,
  verifyPaymentSignature,
} from "@/lib/razorpay/client";
import type { ActionResult, Plan, Coupon } from "@/types";

function isMissingTable(code?: string): boolean {
  return code === "42P01" || code === "PGRST205";
}

// ============================================================
// apply_coupon — server-side validation only (never trusts client price)
// ============================================================

export interface CouponResult {
  couponId: string;
  code: string;
  discountAmount: number;
  finalAmount: number;
}

async function validateCoupon(
  code: string,
  profileId: string,
  role: string,
  planId: string,
  grossAmount: number
): Promise<
  { ok: true; coupon: Coupon; discount: number } | { ok: false; error: string }
> {
  const admin = createServiceClient();
  const { data, error } = await admin
    .from("coupons")
    .select("*")
    .eq("code", code.trim().toUpperCase())
    .maybeSingle();
  if (error && isMissingTable(error.code))
    return { ok: false, error: "SETUP_REQUIRED" };
  const coupon = data as Coupon | null;
  if (!coupon || !coupon.is_active)
    return { ok: false, error: "COUPON_INVALID" };
  if (coupon.expires_at && new Date(coupon.expires_at) < new Date())
    return { ok: false, error: "COUPON_EXPIRED" };
  if (coupon.applies_role && coupon.applies_role !== role)
    return { ok: false, error: "COUPON_INVALID" };
  if (coupon.applies_plan_id && coupon.applies_plan_id !== planId)
    return { ok: false, error: "COUPON_INVALID" };
  if (grossAmount < coupon.min_amount)
    return { ok: false, error: "COUPON_INVALID" };
  if (coupon.usage_limit !== null && coupon.used_count >= coupon.usage_limit)
    return { ok: false, error: "COUPON_LIMIT_EXCEEDED" };

  const { count } = await admin
    .from("coupon_redemptions")
    .select("id", { count: "exact", head: true })
    .eq("coupon_id", coupon.id)
    .eq("profile_id", profileId);
  if ((count ?? 0) >= coupon.per_user_limit)
    return { ok: false, error: "COUPON_LIMIT_EXCEEDED" };

  let discount =
    coupon.discount_type === "percentage"
      ? (grossAmount * coupon.discount_value) / 100
      : coupon.discount_value;
  if (coupon.max_discount !== null)
    discount = Math.min(discount, coupon.max_discount);
  discount = Math.min(discount, grossAmount); // never below zero
  discount = Math.round((discount + Number.EPSILON) * 100) / 100;
  return { ok: true, coupon, discount };
}

export async function applyCoupon(
  code: string,
  planId: string
): Promise<ActionResult<CouponResult>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: plan, error } = await admin
    .from("plans")
    .select("*")
    .eq("id", planId)
    .eq("is_active", true)
    .maybeSingle();
  if (error && isMissingTable(error.code))
    return { success: false, error: "SETUP_REQUIRED" };
  if (!plan) return { success: false, error: "PLAN_NOT_FOUND" };
  const p = plan as Plan;

  const result = await validateCoupon(
    code,
    profile.id,
    p.role,
    planId,
    p.price_amount
  );
  if (!result.ok) return { success: false, error: result.error };

  return {
    success: true,
    data: {
      couponId: result.coupon.id,
      code: result.coupon.code,
      discountAmount: result.discount,
      finalAmount:
        Math.round((p.price_amount - result.discount + Number.EPSILON) * 100) /
        100,
    },
  };
}

// ============================================================
// create_checkout_order
// - price comes from DB (server-side source of truth), never the client
// - creates a payment_order + a Razorpay order
// - returns what the client checkout needs; NO activation happens here
// ============================================================

export interface CheckoutOrder {
  paymentOrderId: string;
  razorpayOrderId: string;
  razorpayKeyId: string;
  amountPaise: number;
  currency: string;
  planName: string;
}

export async function createCheckoutOrder(
  planId: string,
  couponCode?: string
): Promise<ActionResult<CheckoutOrder>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (
    profile.account_status === "suspended" ||
    profile.account_status === "banned"
  )
    return { success: false, error: "FORBIDDEN" };

  if (!isRazorpayConfigured())
    return { success: false, error: "PAYMENT_PROVIDER_SETUP_REQUIRED" };

  const admin = createServiceClient();
  const { data: plan, error: planErr } = await admin
    .from("plans")
    .select("*")
    .eq("id", planId)
    .maybeSingle();
  if (planErr && isMissingTable(planErr.code))
    return { success: false, error: "SETUP_REQUIRED" };
  if (!plan) return { success: false, error: "PLAN_NOT_FOUND" };
  const p = plan as Plan;
  if (!p.is_active) return { success: false, error: "PLAN_NOT_ACTIVE" };

  // Role gate: a user can only buy plans for their own role.
  if (p.role !== profile.public_role)
    return { success: false, error: "ROLE_NOT_ALLOWED" };
  // Free plans are not purchasable.
  if (p.billing_cycle === "free" || p.price_amount <= 0)
    return { success: false, error: "PLAN_NOT_ACTIVE" };

  // Server-side price + optional coupon.
  let discount = 0;
  let couponId: string | null = null;
  if (couponCode && couponCode.trim()) {
    const c = await validateCoupon(
      couponCode,
      profile.id,
      p.role,
      p.id,
      p.price_amount
    );
    if (!c.ok) return { success: false, error: c.error };
    discount = c.discount;
    couponId = c.coupon.id;
  }
  const payable =
    Math.round((p.price_amount - discount + Number.EPSILON) * 100) / 100;
  const amountPaise = Math.round(payable * 100);
  if (amountPaise < 100)
    return { success: false, error: "PAYMENT_ORDER_FAILED" }; // Razorpay min ₹1

  const idempotencyKey = randomUUID();

  // Create local order first (source of truth for amount).
  const { data: order, error: orderErr } = await admin
    .from("payment_orders")
    .insert({
      profile_id: profile.id,
      role: p.role,
      purpose: "subscription",
      plan_id: p.id,
      coupon_id: couponId,
      amount_gross: p.price_amount,
      discount_amount: discount,
      amount_payable: payable,
      amount_payable_paise: amountPaise,
      status: "created",
      idempotency_key: idempotencyKey,
    })
    .select("id")
    .single();
  if (orderErr || !order) {
    if (isMissingTable(orderErr?.code))
      return { success: false, error: "SETUP_REQUIRED" };
    return { success: false, error: "PAYMENT_ORDER_FAILED" };
  }

  const rzpOrder = await createRazorpayOrder({
    amountPaise,
    receipt: order.id,
    notes: {
      profile_id: profile.id,
      plan_code: p.plan_code,
      payment_order_id: order.id,
    },
  });
  if (!rzpOrder) {
    await admin
      .from("payment_orders")
      .update({ status: "payment_failed" })
      .eq("id", order.id);
    return { success: false, error: "PAYMENT_ORDER_FAILED" };
  }

  await admin
    .from("payment_orders")
    .update({ provider_order_id: rzpOrder.id })
    .eq("id", order.id);
  await admin.from("billing_audit_logs").insert({
    actor_type: "user",
    actor_id: profile.id,
    action: "checkout_order_created",
    entity_type: "payment_order",
    entity_id: order.id,
    metadata_safe: { plan_code: p.plan_code, amount: payable },
  });

  return {
    success: true,
    data: {
      paymentOrderId: order.id,
      razorpayOrderId: rzpOrder.id,
      razorpayKeyId: getPublicKeyId()!,
      amountPaise,
      currency: "INR",
      planName: p.name,
    },
  };
}

// ============================================================
// record_checkout_started — mark attempt started (no activation)
// ============================================================

export async function recordCheckoutStarted(
  paymentOrderId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  const admin = createServiceClient();
  const { data: order } = await admin
    .from("payment_orders")
    .select("id, profile_id, status")
    .eq("id", paymentOrderId)
    .maybeSingle();
  if (!order || order.profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (order.status === "created") {
    await admin
      .from("payment_orders")
      .update({ status: "checkout_started" })
      .eq("id", paymentOrderId);
  }
  return { success: true, data: null };
}

// ============================================================
// recordClientCallback — records the client checkout result ONLY.
// Verifies the client signature for attempt integrity, but DOES NOT
// activate any subscription. Activation is webhook-only.
// ============================================================

export async function recordClientCallback(
  paymentOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): Promise<ActionResult<{ activated: false }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: order } = await admin
    .from("payment_orders")
    .select("*")
    .eq("id", paymentOrderId)
    .maybeSingle();
  if (!order || order.profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (!order.provider_order_id)
    return { success: false, error: "PAYMENT_ORDER_FAILED" };

  const sigValid = verifyPaymentSignature(
    order.provider_order_id,
    razorpayPaymentId,
    razorpaySignature
  );

  // Record attempt status only. Never mark payment captured/verified here —
  // that is done exclusively by the verified webhook.
  await admin
    .from("payment_orders")
    .update({ status: sigValid ? "payment_authorized" : "payment_failed" })
    .eq("id", paymentOrderId);
  await admin.from("billing_audit_logs").insert({
    actor_type: "user",
    actor_id: profile.id,
    action: "client_callback_recorded",
    entity_type: "payment_order",
    entity_id: paymentOrderId,
    metadata_safe: { signature_valid: sigValid },
  });

  // Always report NOT activated — the dashboard reflects real state after webhook.
  return { success: true, data: { activated: false } };
}
