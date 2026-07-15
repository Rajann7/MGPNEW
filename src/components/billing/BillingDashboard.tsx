"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { formatINR, featureKeyLabel } from "@/lib/billing/format";
import {
  startTrial,
  cancelSubscription,
  requestRefund,
} from "@/lib/actions/billing";
import { createAddOnCheckoutOrder, recordCheckoutStarted, recordClientCallback } from "@/lib/actions/payments";
import type {
  Subscription,
  Invoice,
  Payment,
  Trial,
  Refund,
  PaymentOrder,
  AddOn,
  AddOnPurchase,
} from "@/types";

interface UsageRow {
  featureKey: string;
  used: number;
  limit: number | null;
}

interface Props {
  setupRequired: boolean;
  subscription: Subscription | null;
  planName: string | null;
  active: boolean;
  enforced: boolean;
  usage: UsageRow[];
  invoices: Invoice[];
  payments: Payment[];
  trial: Trial | null;
  refunds: Refund[];
  pendingOrder: PaymentOrder | null;
  addOns: AddOn[];
  addOnPurchases: (AddOnPurchase & { addOnName: string })[];
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

const REFUND_STATUS_LABEL: Record<string, string> = {
  requested: "Requested — awaiting review",
  approved: "Approved",
  processing: "Processing",
  processed: "Refunded",
  failed: "Failed",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

const STATUS_LABEL: Record<string, string> = {
  none: "No plan",
  trialing: "Trial",
  active: "Active",
  grace: "Grace period",
  past_due: "Past due",
  cancelled: "Cancelled",
  expired: "Expired",
  pending_activation: "Pending activation",
  admin_granted: "Granted",
};

export function BillingDashboard(props: Props) {
  const router = useRouter();
  const [pending, startAction] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [refundPaymentId, setRefundPaymentId] = useState<string | null>(null);
  const [refundReason, setRefundReason] = useState("");
  const [refundPartial, setRefundPartial] = useState("");
  const [busyAddOn, setBusyAddOn] = useState<string | null>(null);

  if (props.setupRequired) {
    return (
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-8 text-center">
        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 mb-3">
          SETUP REQUIRED
        </span>
        <h2 className="text-base font-semibold text-zinc-800 mb-2">
          Billing schema not applied yet
        </h2>
        <p className="text-sm text-zinc-500 max-w-sm mx-auto">
          The billing database migration has not been applied. No subscription
          is charged. Once billing is set up, your plan, usage and invoices will
          appear here.
        </p>
        <Link
          href="/pricing"
          className="mt-5 inline-block text-sm font-medium text-brand hover:underline"
        >
          View pricing
        </Link>
      </div>
    );
  }

  const sub = props.subscription;
  const status = sub?.status ?? "none";

  function handleStartTrial() {
    setMsg(null);
    startAction(async () => {
      const res = await startTrial();
      if (res.success) {
        setMsg("Trial started — no card charged.");
        router.refresh();
      } else
        setMsg(
          res.error === "TRIAL_NOT_ELIGIBLE"
            ? "You're not eligible for a trial."
            : "Could not start trial."
        );
    });
  }
  function handleCancel() {
    setMsg(null);
    startAction(async () => {
      const res = await cancelSubscription();
      if (res.success) {
        setMsg("Your plan will not renew at the end of the period.");
        router.refresh();
      } else setMsg("Could not cancel.");
    });
  }

  // --- Refund request ---
  const refundedPaymentIds = new Set(
    props.refunds
      .filter((r) => !["rejected", "cancelled", "failed"].includes(r.status))
      .map((r) => r.payment_id)
  );

  function handleSubmitRefund(paymentId: string) {
    if (refundReason.trim().length < 5) {
      setMsg("Describe the reason (minimum 5 characters).");
      return;
    }
    startAction(async () => {
      const amount = refundPartial.trim() ? Number(refundPartial) : undefined;
      const res = await requestRefund(paymentId, refundReason.trim(), amount);
      if (res.success) {
        setMsg("Refund request submitted — our billing team will review it.");
        setRefundPaymentId(null);
        setRefundReason("");
        setRefundPartial("");
        router.refresh();
      } else {
        setMsg(
          res.error === "REFUND_WINDOW_EXPIRED"
            ? "This payment is outside the 30-day refund window."
            : res.error === "REFUND_ALREADY_REQUESTED"
              ? "A refund request is already open for this payment."
              : "Could not submit the refund request."
        );
      }
    });
  }

  // --- Add-on purchase ---
  async function handleBuyAddOn(addOnId: string) {
    setMsg(null);
    setBusyAddOn(addOnId);
    const orderRes = await createAddOnCheckoutOrder(addOnId, 1);
    if (!orderRes.success) {
      setMsg(
        orderRes.error === "PAYMENT_PROVIDER_SETUP_REQUIRED"
          ? "Online payment is not set up yet."
          : "Could not start checkout."
      );
      setBusyAddOn(null);
      return;
    }
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setMsg("Could not load the payment window.");
      setBusyAddOn(null);
      return;
    }
    await recordCheckoutStarted(orderRes.data.paymentOrderId);
    const rzp = new window.Razorpay!({
      key: orderRes.data.razorpayKeyId,
      order_id: orderRes.data.razorpayOrderId,
      amount: orderRes.data.amountPaise,
      currency: orderRes.data.currency,
      name: "My Gujarat Property",
      description: orderRes.data.planName,
      handler: async (resp: RazorpayResponse) => {
        await recordClientCallback(
          orderRes.data.paymentOrderId,
          resp.razorpay_payment_id,
          resp.razorpay_signature
        );
        setMsg("Payment submitted — your add-on will activate once verified.");
        router.refresh();
      },
      modal: { ondismiss: () => setBusyAddOn(null) },
      theme: { color: "#0d9488" },
    });
    rzp.open();
    setBusyAddOn(null);
  }

  return (
    <div className="flex flex-col gap-6">
      {msg && (
        <div className="rounded-lg bg-zinc-50 border border-zinc-200 px-4 py-3 text-sm text-zinc-700">
          {msg}
        </div>
      )}

      {props.pendingOrder && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
          A payment is awaiting confirmation ({formatINR(props.pendingOrder.amount_payable)}
          , status: {props.pendingOrder.status.replace(/_/g, " ")}). It will
          activate automatically once verified — no action needed. Refresh
          this page in a minute if it doesn&apos;t update.
        </div>
      )}

      {/* Current plan */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-400">
              Current plan
            </p>
            <h2 className="mt-1 text-lg font-semibold text-zinc-900">
              {props.planName ?? "Free"}
            </h2>
            <span
              className={`mt-2 inline-block text-xs font-medium px-2 py-0.5 rounded-full ${props.active ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"}`}
            >
              {STATUS_LABEL[status] ?? status}
            </span>
            {sub?.current_period_end && (
              <p className="mt-2 text-xs text-zinc-500">
                {sub.cancel_at_period_end ? "Ends" : "Renews / expires"} on{" "}
                {new Date(sub.current_period_end).toLocaleDateString("en-IN")}
              </p>
            )}
            {!props.enforced && (
              <p className="mt-2 text-[11px] text-amber-700">
                Plan limits are not yet enforced (soft-launch). Posting is
                currently open.
              </p>
            )}
          </div>
          <Link
            href="/pricing"
            className="shrink-0 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
          >
            {props.active ? "Change plan" : "Upgrade"}
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {!props.trial && !props.active && (
            <button
              onClick={handleStartTrial}
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:opacity-60"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />} Start
              14-day free trial
            </button>
          )}
          {props.active && sub && !sub.cancel_at_period_end && (
            <button
              onClick={handleCancel}
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />} Cancel
              at period end
            </button>
          )}
        </div>
      </section>

      {/* Usage */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-4">
          Usage &amp; limits
        </h3>
        {props.usage.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No limits defined for the current plan.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {props.usage.map((row) => {
              const pct =
                row.limit && row.limit > 0
                  ? Math.min(100, Math.round((row.used / row.limit) * 100))
                  : 0;
              return (
                <li key={row.featureKey}>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-700">
                      {featureKeyLabel(row.featureKey)}
                    </span>
                    <span className="text-zinc-500">
                      {row.used}
                      {row.limit !== null ? ` / ${row.limit}` : ""}
                    </span>
                  </div>
                  {row.limit !== null && (
                    <div className="mt-1 h-1.5 w-full rounded-full bg-zinc-100">
                      <div
                        className="h-1.5 rounded-full bg-brand"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Invoices */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-zinc-900">Invoices</h3>
          <Link
            href="/dashboard/billing/gst"
            className="text-xs font-medium text-brand hover:underline"
          >
            Billing / GST details
          </Link>
        </div>
        {props.invoices.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No invoices yet. An invoice is generated after a verified payment.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-zinc-400">
                  <th className="py-2 pr-4">Invoice</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {props.invoices.map((inv) => (
                  <tr key={inv.id} className="border-t border-zinc-100">
                    <td className="py-2 pr-4 font-mono text-xs">
                      <Link
                        href={`/dashboard/billing/invoices/${inv.id}`}
                        className="text-brand hover:underline"
                      >
                        {inv.invoice_number ?? "View"}
                      </Link>
                    </td>
                    <td className="py-2 pr-4 text-zinc-600">
                      {inv.issued_at
                        ? new Date(inv.issued_at).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td className="py-2 pr-4">{formatINR(inv.total_amount)}</td>
                    <td className="py-2 capitalize text-zinc-600">
                      {inv.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Payments */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-4">
          Payment history
        </h3>
        {props.payments.length === 0 ? (
          <p className="text-sm text-zinc-500">No payments yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-zinc-400">
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2">Refund</th>
                </tr>
              </thead>
              <tbody>
                {props.payments.map((p) => {
                  const eligible =
                    ["captured", "verified"].includes(p.status) &&
                    !refundedPaymentIds.has(p.id);
                  return (
                    <tr key={p.id} className="border-t border-zinc-100">
                      <td className="py-2 pr-4 text-zinc-600">
                        {new Date(p.created_at).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-2 pr-4">{formatINR(p.amount)}</td>
                      <td className="py-2 pr-4 capitalize text-zinc-600">
                        {p.status}
                      </td>
                      <td className="py-2">
                        {refundedPaymentIds.has(p.id) ? (
                          <span className="text-xs text-zinc-400">Requested</span>
                        ) : eligible ? (
                          <button
                            onClick={() =>
                              setRefundPaymentId(
                                refundPaymentId === p.id ? null : p.id
                              )
                            }
                            className="text-xs font-medium text-brand hover:underline"
                          >
                            Request refund
                          </button>
                        ) : (
                          <span className="text-xs text-zinc-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {refundPaymentId && (
              <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 flex flex-col gap-2">
                <p className="text-xs font-semibold text-zinc-600">
                  Request refund — reviewed by our billing team, not automatic
                </p>
                <textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="Reason for refund (required)"
                  className="px-3 py-2 rounded-lg border border-zinc-300 text-sm"
                  rows={2}
                />
                <input
                  type="number"
                  value={refundPartial}
                  onChange={(e) => setRefundPartial(e.target.value)}
                  placeholder="Partial amount in ₹ (leave blank for full refund)"
                  className="px-3 py-2 rounded-lg border border-zinc-300 text-sm"
                  min={1}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSubmitRefund(refundPaymentId)}
                    disabled={pending}
                    className="px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-hover disabled:opacity-60"
                  >
                    Submit request
                  </button>
                  <button
                    onClick={() => setRefundPaymentId(null)}
                    className="px-4 py-2 rounded-lg border border-zinc-300 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Refund tracker */}
      {props.refunds.length > 0 && (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-sm font-semibold text-zinc-900 mb-4">
            Refund requests
          </h3>
          <div className="flex flex-col gap-3">
            {props.refunds.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between text-sm bg-zinc-50 rounded-lg px-3 py-2"
              >
                <div>
                  <p className="text-zinc-800">{formatINR(r.amount)}</p>
                  <p className="text-[11px] text-zinc-500">{r.reason}</p>
                </div>
                <span className="text-xs font-medium text-zinc-600">
                  {REFUND_STATUS_LABEL[r.status] ?? r.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Add-ons */}
      {props.addOns.length > 0 && (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-sm font-semibold text-zinc-900 mb-4">
            Add-ons
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {props.addOns.map((a) => (
              <div
                key={a.id}
                className="rounded-lg border border-zinc-200 p-4 flex flex-col gap-1"
              >
                <p className="text-sm font-semibold text-zinc-900">{a.name}</p>
                {a.description && (
                  <p className="text-xs text-zinc-500">{a.description}</p>
                )}
                <p className="text-sm font-medium text-zinc-800 mt-1">
                  {formatINR(a.price_amount)}
                </p>
                <button
                  onClick={() => handleBuyAddOn(a.id)}
                  disabled={busyAddOn === a.id}
                  className="mt-2 self-start px-3 py-1.5 rounded-lg border border-zinc-300 text-xs font-medium text-zinc-800 hover:bg-zinc-50 disabled:opacity-60"
                >
                  {busyAddOn === a.id ? "…" : "Buy"}
                </button>
              </div>
            ))}
          </div>
          {props.addOnPurchases.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {props.addOnPurchases.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-sm bg-zinc-50 rounded-lg px-3 py-2"
                >
                  <span>
                    {p.addOnName} x{p.quantity}
                  </span>
                  <span className="text-xs capitalize text-zinc-500">
                    {p.status.replace(/_/g, " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
