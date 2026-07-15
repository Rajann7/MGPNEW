import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const admin = createClient(url, key);
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

const orderId = process.argv[2];
const { data: order } = await admin
  .from("payment_orders")
  .select("*")
  .eq("id", orderId)
  .maybeSingle();

const fixedPaymentId = `pay_test_dup_fixed_001`;
const fixedEventId = `evt_test_dup_fixed_001`;
const payload = {
  event: "payment.captured",
  payload: {
    payment: {
      entity: {
        id: fixedPaymentId,
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

async function fire() {
  const res = await fetch("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Razorpay-Signature": signature,
      "X-Razorpay-Event-Id": fixedEventId,
    },
    body: rawBody,
  });
  return { status: res.status, body: await res.text() };
}

const first = await fire();
console.log("First delivery:", JSON.stringify(first));
const second = await fire();
console.log("Second (duplicate) delivery:", JSON.stringify(second));

const { count: paymentCount } = await admin
  .from("payments")
  .select("id", { count: "exact", head: true })
  .eq("provider_payment_id", fixedPaymentId);
console.log("Payment rows with this provider_payment_id:", paymentCount);

const { count: webhookCount } = await admin
  .from("payment_webhook_events")
  .select("id", { count: "exact", head: true })
  .eq("provider_event_id", fixedEventId);
console.log("Webhook event rows with this event id:", webhookCount);

const { data: payment } = await admin
  .from("payments")
  .select("id")
  .eq("provider_payment_id", fixedPaymentId)
  .maybeSingle();
const { count: invoiceCount } = await admin
  .from("invoices")
  .select("id", { count: "exact", head: true })
  .eq("payment_id", payment?.id);
console.log("Invoice rows for this payment:", invoiceCount);
