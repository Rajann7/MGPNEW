import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { RequirementProposeClient } from "@/components/proposals/RequirementProposeClient";
import { getMatchingRequirements } from "@/lib/actions/proposals";

export const metadata: Metadata = {
  title: "Matching Requirements",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BuilderMatchingRequirementsPage() {
  const profile = await requireRole("builder");
  const result = await getMatchingRequirements();

  return (
    <DashboardShellV2
      title="Matching Requirements"
      navItems={getBuilderNav("/dashboard/builder/requirements")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/requirements")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <RequirementProposeClient
        items={result.success ? result.data.items : []}
        emptyMessage="Publish a project first — matches are based on your published projects' city and category. No fake matches are ever shown."
      />
    </DashboardShellV2>
  );
}
