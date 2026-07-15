import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getOwnerNav,
  getOwnerDrawerNav,
  getMobileTabs,
} from "@/components/dashboard/navConfig";
import { BillingDashboard } from "@/components/billing/BillingDashboard";
import {
  getCurrentBilling,
  getMyInvoices,
  getMyPayments,
  getMyTrial,
  getMyRefunds,
  getPendingPaymentOrder,
  getPublicAddOns,
  getMyAddOnPurchases,
} from "@/lib/actions/billing";

export const metadata: Metadata = {
  title: "Billing / Plan",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function OwnerBillingPage() {
  const profile = await requireRole("owner");
  const [billing, invoices, payments, trial, refunds, pendingOrder, addOns, addOnPurchases] =
    await Promise.all([
      getCurrentBilling("owner"),
      getMyInvoices(),
      getMyPayments(),
      getMyTrial(),
      getMyRefunds(),
      getPendingPaymentOrder(),
      getPublicAddOns("owner"),
      getMyAddOnPurchases(),
    ]);
  const setupRequired = !billing.success && billing.error === "SETUP_REQUIRED";

  return (
    <DashboardShellV2
      title="Billing / Plan"
      navItems={getOwnerNav("/dashboard/owner/billing")}
      mobileDrawerNav={getOwnerDrawerNav("/dashboard/owner/billing")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/billing")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <BillingDashboard
        setupRequired={setupRequired}
        subscription={billing.success ? billing.data.subscription : null}
        planName={billing.success ? billing.data.planName : null}
        active={billing.success ? billing.data.active : false}
        enforced={billing.success ? billing.data.enforced : false}
        usage={billing.success ? billing.data.usage : []}
        invoices={invoices.success ? invoices.data.items : []}
        payments={payments.success ? payments.data.items : []}
        trial={trial.success ? trial.data.trial : null}
        refunds={refunds.success ? refunds.data.items : []}
        pendingOrder={pendingOrder.success ? pendingOrder.data.order : null}
        addOns={addOns.success ? addOns.data.items : []}
        addOnPurchases={addOnPurchases.success ? addOnPurchases.data.items : []}
      />
    </DashboardShellV2>
  );
}
