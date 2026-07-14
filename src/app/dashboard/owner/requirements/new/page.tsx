import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { canCreateRequirement } from "@/lib/permissions/entity-permissions";
import { RequirementForm } from "@/components/forms/RequirementForm";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Post Requirement",
  robots: { index: false, follow: false },
};

export default async function NewRequirementPage() {
  const profile = await requireRole("owner");
  const shellProps = {
    navItems: getOwnerNav("/dashboard/owner/requirements"),
    mobileBackHref: "/dashboard/owner/requirements",
    mobileTabs: getMobileTabs("owner", "/dashboard/owner/requirements"),
    userName: profile.display_name ?? profile.full_name,
    userRole: "Owner",
  };

  if (!canCreateRequirement(profile)) {
    return (
      <DashboardShellV2 title="Post a Requirement" {...shellProps}>
        <Alert tone="danger">
          Your account is not permitted to post requirements.
        </Alert>
        <div className="mt-4">
          <Button href="/dashboard/owner" variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </DashboardShellV2>
    );
  }

  return (
    <DashboardShellV2 title="Post a Requirement" {...shellProps}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-ink">Post a Requirement</h1>
        <p className="text-sm text-ink-soft">
          Tell brokers what you are looking for.
        </p>
      </div>
      <RequirementForm mode="create" dashboardRole="owner" />
    </DashboardShellV2>
  );
}
