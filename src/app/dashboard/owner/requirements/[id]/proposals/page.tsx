import { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/session";
import { getMyRequirementSummary } from "@/lib/actions/requirements";
import { getMyProposals } from "@/lib/actions/proposals";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { ProposalListClient } from "@/components/proposals/ProposalListClient";

export const metadata: Metadata = {
  title: "Proposals",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function RequirementProposalsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await requireRole("owner");

  const summary = await getMyRequirementSummary(id);
  if (!summary.success) {
    if (summary.error === "FORBIDDEN")
      redirect("/unauthorized?reason=not_participant");
    notFound();
  }

  const received = await getMyProposals("received");
  const items = received.success
    ? received.data.items.filter((p) => p.requirement_id === id)
    : [];

  return (
    <DashboardShellV2
      title="Proposals"
      breadcrumb={["Dashboard", "My Requirements", "Proposals"]}
      mobileBackHref="/dashboard/owner/requirements"
      navItems={getOwnerNav("/dashboard/owner/requirements")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/requirements")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-ink">
          Proposals for &ldquo;{summary.data.title}&rdquo;
        </h2>
        <p className="text-xs text-ink-muted mt-0.5">
          {items.length} {items.length === 1 ? "proposal" : "proposals"}{" "}
          received
        </p>
      </div>
      <ProposalListClient items={items} direction="received" />
    </DashboardShellV2>
  );
}
