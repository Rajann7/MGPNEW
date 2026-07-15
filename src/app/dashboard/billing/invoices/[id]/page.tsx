import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getNavForRole,
  getMobileTabsForRole,
  getRoleLabel,
} from "@/lib/dashboard/navForRole";
import { InvoiceDetailClient } from "@/components/billing/InvoiceDetailClient";
import { getInvoiceDetail } from "@/lib/actions/billing";

export const metadata: Metadata = {
  title: "Invoice",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await requireAuth();

  const result = await getInvoiceDetail(id);
  if (!result.success) {
    if (result.error === "FORBIDDEN")
      redirect("/unauthorized?reason=not_participant");
    notFound();
  }

  const activeHref = `/dashboard/${profile.public_role}/billing`;

  return (
    <DashboardShellV2
      title="Invoice"
      navItems={getNavForRole(profile.public_role, activeHref)}
      mobileBackHref={activeHref}
      hideMobileTabBar
      mobileTabs={getMobileTabsForRole(profile.public_role, activeHref)}
      userName={profile.display_name ?? profile.full_name}
      userRole={getRoleLabel(profile.public_role)}
    >
      <InvoiceDetailClient
        invoice={result.data.invoice}
        lineItems={result.data.lineItems}
      />
    </DashboardShellV2>
  );
}
