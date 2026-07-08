import { Metadata } from "next";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { getAdminBillingOverview } from "@/lib/actions/admin/billing";
import { formatINR } from "@/lib/billing/format";

export const metadata: Metadata = {
  title: "Billing — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${ok ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
    >
      {label}
    </span>
  );
}

export default async function AdminBillingPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);
  const result = await getAdminBillingOverview();

  return (
    <AdminShell
      title="Billing / Payments / Plans"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/billing")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      {!result.success ? (
        <p className="text-sm text-zinc-500">
          You do not have permission to view billing.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Provider status */}
          <section className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-zinc-900 mb-3">
              Provider status
            </h2>
            <div className="flex flex-wrap gap-2">
              <StatusPill
                ok={result.data.provider.razorpayConfigured}
                label={`Razorpay ${result.data.provider.razorpayConfigured ? `configured (${result.data.provider.mode})` : "setup required"}`}
              />
              <StatusPill
                ok={result.data.provider.webhookConfigured}
                label={`Webhook ${result.data.provider.webhookConfigured ? "configured" : "setup required"}`}
              />
              <StatusPill
                ok={result.data.provider.gatesEnforced}
                label={`Posting gates ${result.data.provider.gatesEnforced ? "enforced" : "soft-launch (off)"}`}
              />
              <StatusPill
                ok={result.data.schemaReady}
                label={`Schema ${result.data.schemaReady ? "applied" : "not applied"}`}
              />
            </div>
            {!result.data.schemaReady && (
              <p className="mt-3 text-xs text-amber-700">
                Apply migration{" "}
                <code>
                  20260702100000_billing_payment_subscription_trial_gst.sql
                </code>{" "}
                to enable billing tables.
              </p>
            )}
          </section>

          {/* Counts (real) */}
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Plans", value: result.data.counts.plans },
              {
                label: "Active subs",
                value: result.data.counts.activeSubscriptions,
              },
              {
                label: "Trialing",
                value: result.data.counts.trialingSubscriptions,
              },
              { label: "Payments", value: result.data.counts.payments },
              { label: "Invoices", value: result.data.counts.invoices },
              {
                label: "Refunds pending",
                value: result.data.counts.refundsPending,
              },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-xl border border-zinc-200 bg-white p-4"
              >
                <p className="text-xs text-zinc-400">{c.label}</p>
                <p className="mt-1 text-xl font-bold text-zinc-900">
                  {c.value}
                </p>
              </div>
            ))}
          </section>

          {/* Plans */}
          <section className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-zinc-900 mb-3">Plans</h2>
            {result.data.plans.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No plans. Apply the billing migration to seed plans.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-zinc-400">
                      <th className="py-2 pr-4">Plan</th>
                      <th className="py-2 pr-4">Role</th>
                      <th className="py-2 pr-4">Cycle</th>
                      <th className="py-2 pr-4">Price</th>
                      <th className="py-2">Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.data.plans.map((p) => (
                      <tr key={p.id} className="border-t border-zinc-100">
                        <td className="py-2 pr-4 font-medium text-zinc-800">
                          {p.name}
                          {p.is_placeholder_pricing ? " *" : ""}
                        </td>
                        <td className="py-2 pr-4 capitalize text-zinc-600">
                          {p.role}
                        </td>
                        <td className="py-2 pr-4 text-zinc-600">
                          {p.billing_cycle}
                        </td>
                        <td className="py-2 pr-4">
                          {p.price_amount > 0
                            ? formatINR(p.price_amount)
                            : "Free"}
                        </td>
                        <td className="py-2 text-zinc-600">
                          {p.is_active ? "Yes" : "No"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-2 text-[11px] text-zinc-400">
                  * Indicative pricing. Plan create/edit UI is a later admin
                  sub-phase.
                </p>
              </div>
            )}
          </section>

          {/* Recent payments (masked) */}
          <section className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-zinc-900 mb-3">
              Recent payments
            </h2>
            {result.data.recentPayments.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No payments yet. Payments appear only after a verified webhook.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-zinc-400">
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2 pr-4">Payment ref</th>
                      <th className="py-2 pr-4">Amount</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2">Reconciliation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.data.recentPayments.map((p) => (
                      <tr key={p.id} className="border-t border-zinc-100">
                        <td className="py-2 pr-4 text-zinc-600">
                          {new Date(p.created_at).toLocaleDateString("en-IN")}
                        </td>
                        <td className="py-2 pr-4 font-mono text-xs">
                          {p.provider_payment_id_masked ?? "—"}
                        </td>
                        <td className="py-2 pr-4">{formatINR(p.amount)}</td>
                        <td className="py-2 pr-4 capitalize text-zinc-600">
                          {p.status}
                        </td>
                        <td className="py-2 capitalize text-zinc-600">
                          {p.reconciliation_status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}
    </AdminShell>
  );
}
