import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { canCreateProperty } from "@/lib/permissions/entity-permissions";
import { PropertyForm } from "@/components/forms/PropertyForm";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Post Property",
  robots: { index: false, follow: false },
};

export default async function NewPropertyPage() {
  const profile = await requireRole("owner");
  const shellProps = {
    navItems: getOwnerNav("/dashboard/owner/properties"),
    mobileTabs: getMobileTabs("owner", "/dashboard/owner/properties"),
    userName: profile.display_name ?? profile.full_name,
    userRole: "Owner",
  };

  if (!canCreateProperty(profile)) {
    return (
      <DashboardShellV2 title="Post a Property" {...shellProps}>
        <Alert tone="danger">
          Your account is not permitted to post properties.
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
    <DashboardShellV2 title="Post a Property" {...shellProps}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-ink">Post a Property</h1>
        <p className="text-sm text-ink-soft">
          Complete all steps and submit for admin approval.
        </p>
      </div>
      <PropertyForm mode="create" />
    </DashboardShellV2>
  );
}
