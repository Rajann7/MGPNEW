"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import {
  formatINR,
  billingCycleSuffix,
  featureKeyLabel,
} from "@/lib/billing/format";
import {
  createCheckoutOrder,
  recordCheckoutStarted,
  recordClientCallback,
} from "@/lib/actions/payments";
import { previewCheckoutTotal } from "@/lib/actions/billing";
import type { CheckoutPreview } from "@/lib/actions/billing";
import { applyCoupon } from "@/lib/actions/payments";
import type { Plan, PublicRole } from "@/types";

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

interface Props {
  plans: Plan[];
  isLoggedIn: boolean;
  currentRole: PublicRole | null;
  razorpayConfigured: boolean;
  razorpayMode: "test" | "live" | null;
  pendingOrderPlanName: string | null;
}

const ROLES: { key: PublicRole; label: string }[] = [
  { key: "owner", label: "Owner" },
  { key: "broker", label: "Broker / Agent" },
  { key: "builder", label: "Builder / Developer" },
];

export function PricingPlans({
  plans,
  isLoggedIn,
  currentRole,
  razorpayConfigured,
  razorpayMode,
  pendingOrderPlanName,
}: Props) {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState<PublicRole>(
    currentRole ?? "owner"
  );
  const [busyPlan, setBusyPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // --- Review/checkout panel state (coupon + GST preview before paying) ---
  const [reviewPlan, setReviewPlan] = useState<Plan | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [preview, setPreview] = useState<CheckoutPreview | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [couponBusy, setCouponBusy] = useState(false);

  const rolePlans = plans.filter((p) => p.role === activeRole);

  async function loadPreview(plan: Plan, discount: number) {
    setPreviewLoading(true);
    const res = await previewCheckoutTotal(plan.id, discount);
    if (res.success) setPreview(res.data);
    setPreviewLoading(false);
  }

  function openReview(plan: Plan) {
    setReviewPlan(plan);
    setCouponCode("");
    setCouponError(null);
    setDiscountAmount(0);
    setPreview(null);
    loadPreview(plan, 0);
  }

  async function handleApplyCoupon() {
    if (!reviewPlan || !couponCode.trim()) return;
    setCouponBusy(true);
    setCouponError(null);
    const res = await applyCoupon(couponCode.trim(), reviewPlan.id);
    setCouponBusy(false);
    if (!res.success) {
      setCouponError(
        res.error === "COUPON_EXPIRED"
          ? "This coupon has expired."
          : res.error === "COUPON_LIMIT_EXCEEDED"
            ? "This coupon's usage limit has been reached."
            : "Invalid coupon code."
      );
      return;
    }
    setDiscountAmount(res.data.discountAmount);
    loadPreview(reviewPlan, res.data.discountAmount);
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

  function handleSelect(plan: Plan) {
    setError(null);
    if (!isLoggedIn) {
      router.push(`/login?redirectTo=${encodeURIComponent("/pricing")}`);
      return;
    }
    if (plan.billing_cycle === "free" || plan.price_amount <= 0) {
      // Free plan needs no checkout — direct users to their dashboard billing.
      router.push("/dashboard");
      return;
    }
    if (!razorpayConfigured) {
      setError("Online payment is not set up yet. Please try again later.");
      return;
    }
    // Open the review panel (coupon + GST breakdown) instead of paying immediately.
    openReview(plan);
  }

  async function handleConfirmPay(plan: Plan) {
    setError(null);
    setBusyPlan(plan.id);
    const orderRes = await createCheckoutOrder(
      plan.id,
      discountAmount > 0 ? couponCode.trim() : undefined
    );
    if (!orderRes.success) {
      setError(
        orderRes.error === "PAYMENT_PROVIDER_SETUP_REQUIRED"
          ? "Online payment is not set up yet."
          : "Could not start checkout. Please try again."
      );
      setBusyPlan(null);
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setError("Could not load the payment window. Check your connection.");
      setBusyPlan(null);
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
        // Records the attempt only. Subscription activates via the verified
        // webhook — never from this callback.
        await recordClientCallback(
          orderRes.data.paymentOrderId,
          resp.razorpay_payment_id,
          resp.razorpay_signature
        );
        setReviewPlan(null);
        router.push("/dashboard?checkout=submitted");
      },
      modal: { ondismiss: () => setBusyPlan(null) },
      theme: { color: "#0d9488" },
    });
    rzp.open();
    setBusyPlan(null);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {razorpayMode === "test" && (
        <div className="mb-6 rounded-lg bg-amber-100 border border-amber-300 px-4 py-2 text-center text-xs font-semibold text-amber-800 uppercase tracking-wide">
          Test Mode — no real money is charged on this environment
        </div>
      )}

      {pendingOrderPlanName && (
        <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
          You have a payment for <strong>{pendingOrderPlanName}</strong>{" "}
          awaiting confirmation. It will activate automatically once verified —
          check your{" "}
          <Link
            href={`/dashboard/${currentRole ?? "owner"}/billing`}
            className="underline"
          >
            billing dashboard
          </Link>{" "}
          for the latest status.
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-2">
          Plans &amp; Pricing
        </h1>
        <p className="text-sm text-zinc-500 max-w-lg mx-auto">
          Choose a plan for your role. Prices are in INR and exclusive of GST
          (18%) unless stated. Paid plans show indicative launch pricing.
        </p>
      </div>

      {/* Role tabs */}
      <div
        className="flex justify-center gap-1 mb-8"
        role="tablist"
        aria-label="Plan role"
      >
        {ROLES.map((r) => (
          <button
            key={r.key}
            role="tab"
            aria-selected={activeRole === r.key}
            onClick={() => setActiveRole(r.key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeRole === r.key
                ? "bg-brand text-white"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="max-w-md mx-auto mb-6 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {rolePlans.length === 0 ? (
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-10 text-center text-sm text-zinc-500">
          Plans for this role are being finalized. Please check back soon.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rolePlans.map((plan) => {
            const isFree =
              plan.billing_cycle === "free" || plan.price_amount <= 0;
            const limits = Object.entries(plan.limits ?? {});
            return (
              <div
                key={plan.id}
                className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-zinc-900">
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="mt-1 text-xs text-zinc-500">
                    {plan.description}
                  </p>
                )}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-zinc-900">
                    {isFree ? "Free" : formatINR(plan.price_amount)}
                  </span>
                  {!isFree && (
                    <span className="text-sm text-zinc-500">
                      {billingCycleSuffix(plan.billing_cycle)}
                    </span>
                  )}
                </div>
                {plan.is_placeholder_pricing && !isFree && (
                  <span className="mt-1 inline-block text-[11px] font-medium text-amber-700 bg-amber-50 rounded px-1.5 py-0.5 w-fit">
                    Indicative pricing
                  </span>
                )}

                <ul className="mt-5 flex flex-col gap-2 flex-1">
                  {limits.map(([key, val]) => (
                    <li
                      key={key}
                      className="flex items-center gap-2 text-sm text-zinc-700"
                    >
                      <Check
                        className="h-4 w-4 text-brand shrink-0"
                        aria-hidden
                      />
                      <span>
                        {featureKeyLabel(key)}: <strong>{val}</strong>
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelect(plan)}
                  disabled={busyPlan === plan.id}
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 ${
                    isFree
                      ? "border border-zinc-300 text-zinc-800 hover:bg-zinc-50"
                      : "bg-brand text-white hover:bg-brand-hover"
                  }`}
                >
                  {busyPlan === plan.id && (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  )}
                  {isFree
                    ? "Get started"
                    : isLoggedIn
                      ? "Choose plan"
                      : "Login to subscribe"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {reviewPlan && (
        <div className="max-w-md mx-auto mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-900">
              Review &amp; Pay — {reviewPlan.name}
            </h3>
            <button
              onClick={() => setReviewPlan(null)}
              className="text-xs text-zinc-400 hover:text-zinc-600"
            >
              Cancel
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Coupon code (optional)"
              className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 text-sm"
              disabled={discountAmount > 0}
            />
            <button
              onClick={handleApplyCoupon}
              disabled={couponBusy || !couponCode.trim() || discountAmount > 0}
              className="px-3 py-2 rounded-lg border border-zinc-300 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
            >
              {discountAmount > 0 ? "Applied" : couponBusy ? "…" : "Apply"}
            </button>
          </div>
          {couponError && (
            <p className="text-xs text-red-600 mb-4">{couponError}</p>
          )}

          {previewLoading ? (
            <p className="text-sm text-zinc-500 mb-4">Calculating total…</p>
          ) : preview ? (
            <div className="text-sm text-zinc-700 mb-4 flex flex-col gap-1.5">
              <div className="flex justify-between">
                <span>Plan price</span>
                <span>{formatINR(preview.grossAmount)}</span>
              </div>
              {preview.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon discount</span>
                  <span>−{formatINR(preview.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxable amount</span>
                <span>{formatINR(preview.taxableAmount)}</span>
              </div>
              {preview.intraState ? (
                <>
                  <div className="flex justify-between text-zinc-500 text-xs">
                    <span>CGST ({(preview.gstRatePercent / 2).toFixed(1)}%)</span>
                    <span>{formatINR(preview.cgst)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 text-xs">
                    <span>SGST ({(preview.gstRatePercent / 2).toFixed(1)}%)</span>
                    <span>{formatINR(preview.sgst)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-zinc-500 text-xs">
                  <span>IGST ({preview.gstRatePercent}%)</span>
                  <span>{formatINR(preview.igst)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-zinc-900 border-t border-zinc-100 pt-1.5 mt-1">
                <span>Total payable</span>
                <span>{formatINR(preview.totalWithGst)}</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                GST is calculated from your{" "}
                <Link href="/dashboard/billing/gst" className="underline">
                  billing / GST details
                </Link>
                . Update them before paying if they&apos;re incorrect.
              </p>
            </div>
          ) : null}

          <button
            onClick={() => handleConfirmPay(reviewPlan)}
            disabled={busyPlan === reviewPlan.id || previewLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60"
          >
            {busyPlan === reviewPlan.id && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            )}
            Pay {preview ? formatINR(preview.totalWithGst) : ""}
          </button>
        </div>
      )}

      <p className="mt-8 text-center text-xs text-zinc-400">
        GST is applied as per Indian tax rules. See our{" "}
        <a href="/legal/refund" className="underline hover:text-zinc-600">
          Refund &amp; Cancellation Policy
        </a>
        .
        {!razorpayConfigured &&
          " Online payment is currently in setup — checkout will be enabled once the payment provider is live."}
      </p>
    </div>
  );
}
