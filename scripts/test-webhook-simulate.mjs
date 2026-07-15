import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const admin = createClient(url, key);
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

const orderId = process.argv[2];
if (!orderId) {
  console.error("Usage: node test-webhook-simulate.mjs <payment_order_id>");
  process.exit(1);
}

const { data: order } = await admin
  .from("payment_orders")
  .select("*")
  .eq("id", orderId)
  .maybeSingle();
if (!order) {
  console.error("Order not found:", orderId);
  process.exit(1);
}
console.log("Order:", JSON.stringify(order));

const fakePaymentId = `pay_test_${crypto.randomBytes(8).toString("hex")}`;
const payload = {
  event: "payment.captured",
  payload: {
    payment: {
      entity: {
        id: fakePaymentId,
        order_id: order.provider_order_id,
        amount: order.amount_payable_paise,
        currency: "INR",
        method: "card",
        status: "captured",
      },
    },
  },
};
const rawBody = JSON.stringify(payload);
const signature = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");

const res = await fetch("http://localhost:3000/api/webhooks/razorpay", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Razorpay-Signature": signature,
    "X-Razorpay-Event-Id": `evt_test_${crypto.randomBytes(8).toString("hex")}`,
  },
  body: rawBody,
});
console.log("Webhook response status:", res.status);
console.log("Webhook response body:", await res.text());

// Verify DB state after
const { data: payment } = await admin
  .from("payments")
  .select("*")
  .eq("provider_payment_id", fakePaymentId)
  .maybeSingle();
console.log("Payment row:", JSON.stringify(payment));

if (order.purpose === "subscription") {
  const { data: sub } = await admin
    .from("subscriptions")
    .select("*")
    .eq("profile_id", order.profile_id)
    .eq("role", order.role)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  console.log("Subscription row:", JSON.stringify(sub));
} else if (order.purpose === "add_on") {
  const { data: purchase } = await admin
    .from("add_on_purchases")
    .select("*")
    .eq("id", order.add_on_purchase_id)
    .maybeSingle();
  console.log("Add-on purchase row:", JSON.stringify(purchase));
}

const { data: invoice } = await admin
  .from("invoices")
  .select("*")
  .eq("payment_id", payment?.id)
  .maybeSingle();
console.log("Invoice row:", JSON.stringify(invoice));
