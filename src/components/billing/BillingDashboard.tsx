"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { formatINR, featureKeyLabel } from "@/lib/billing/format";
import { startTrial, cancelSubscription } from "@/lib/actions/billing";
import type { Subscription, Invoice, Payment, Trial } from "@/types";

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
}

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

  return (
    <div className="flex flex-col gap-6">
      {msg && (
        <div className="rounded-lg bg-zinc-50 border border-zinc-200 px-4 py-3 text-sm text-zinc-700">
          {msg}
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
                      {inv.invoice_number ?? "—"}
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
            <p className="mt-3 text-[11px] text-zinc-400">
              Invoice PDF download is set up in a later phase.
            </p>
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
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {props.payments.map((p) => (
                  <tr key={p.id} className="border-t border-zinc-100">
                    <td className="py-2 pr-4 text-zinc-600">
                      {new Date(p.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-2 pr-4">{formatINR(p.amount)}</td>
                    <td className="py-2 capitalize text-zinc-600">
                      {p.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
