import "server-only";
import crypto from "node:crypto";

/**
 * Razorpay server-side helper.
 *
 * Security:
 *  - RAZORPAY_KEY_SECRET and RAZORPAY_WEBHOOK_SECRET are read ONLY here
 *    (server-only module). They are never returned to callers, logged, or
 *    sent to the client. Only RAZORPAY_KEY_ID is safe for the browser
 *    (exposed separately via NEXT_PUBLIC_RAZORPAY_KEY_ID for checkout).
 *  - No Razorpay SDK dependency — we call the REST API with fetch + HTTP
 *    Basic auth, and verify signatures with Node crypto HMAC-SHA256.
 */

export interface RazorpayConfig {
  keyId: string;
  keySecret: string;
  mode: "test" | "live";
}

/** Returns config if key id + secret are present, else null (SETUP_REQUIRED). */
export function getRazorpayConfig(): RazorpayConfig | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  const mode = process.env.RAZORPAY_MODE === "live" ? "live" : "test";
  return { keyId, keySecret, mode };
}

export function isRazorpayConfigured(): boolean {
  return getRazorpayConfig() !== null;
}

export function isWebhookConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_WEBHOOK_SECRET);
}

/** "test" | "live" | null (not configured) — safe to expose to the client. */
export function getRazorpayMode(): "test" | "live" | null {
  return getRazorpayConfig()?.mode ?? null;
}

/** Public key id for the browser checkout (safe to expose). */
export function getPublicKeyId(): string | null {
  return process.env.RAZORPAY_KEY_ID ?? null;
}

export interface CreateOrderInput {
  amountPaise: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

/**
 * Create a Razorpay order via REST. Returns null on any provider/config error
 * (caller maps to a safe error). Never throws provider internals to the caller.
 */
export async function createRazorpayOrder(
  input: CreateOrderInput
): Promise<RazorpayOrder | null> {
  const config = getRazorpayConfig();
  if (!config) return null;

  const auth = Buffer.from(`${config.keyId}:${config.keySecret}`).toString(
    "base64"
  );

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: input.amountPaise,
        currency: input.currency ?? "INR",
        receipt: input.receipt,
        notes: input.notes ?? {},
        payment_capture: 1,
      }),
    });

    if (!res.ok) {
      // Do not surface provider error body (may contain sensitive detail).
      console.error("[razorpay] create order failed:", res.status);
      return null;
    }
    const data = (await res.json()) as RazorpayOrder;
    return data;
  } catch (err) {
    console.error(
      "[razorpay] create order exception:",
      err instanceof Error ? err.message : "unknown"
    );
    return null;
  }
}

/**
 * Verify a Razorpay WEBHOOK signature (X-Razorpay-Signature header) over the
 * RAW request body using the webhook secret. Constant-time compare.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string | null
): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  try {
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(signature, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Verify the CLIENT checkout callback signature
 * (razorpay_order_id + '|' + razorpay_payment_id, HMAC with key secret).
 * NOTE: passing this check records the attempt only — it never activates a
 * subscription. Activation happens exclusively via the verified webhook.
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const config = getRazorpayConfig();
  if (!config) return false;
  const expected = crypto
    .createHmac("sha256", config.keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  try {
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(signature, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
