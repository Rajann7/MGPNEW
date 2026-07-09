import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/auth/session";
import { canEditRequirement } from "@/lib/permissions/entity-permissions";
import { getMyRequirementById } from "@/lib/actions/requirements";
import { RequirementForm } from "@/components/forms/RequirementForm";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Edit Requirement",
  robots: { index: false, follow: false },
};

const LOCKED_REASON: Record<string, string> = {
  under_review: "This requirement is currently under review and can't be edited until that finishes.",
  deleted: "This requirement has been deleted.",
};

export default async function EditRequirementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("owner");
  const { id } = await params;
  const shellProps = {
    navItems: getOwnerNav("/dashboard/owner/requirements"),
    mobileTabs: getMobileTabs("owner", "/dashboard/owner/requirements"),
    userName: profile.display_name ?? profile.full_name,
    userRole: "Owner",
  };

  const result = await getMyRequirementById(id);
  if (!result.success) {
    if (result.error === "FORBIDDEN")
      redirect("/unauthorized?reason=not_owner");
    notFound();
  }

  const requirement = result.data;

  if (
    !canEditRequirement(profile, {
      created_by_profile_id: requirement.created_by_profile_id!,
      status: requirement.status!,
      deleted_at: requirement.deleted_at ?? null,
    })
  ) {
    return (
      <DashboardShellV2 title="Edit Requirement" {...shellProps}>
        <Alert tone="info">
          {LOCKED_REASON[requirement.status ?? ""] ??
            "This requirement can't be edited right now."}
        </Alert>
        <div className="mt-4">
          <Button href="/dashboard/owner/requirements" variant="outline">
            ← My Requirements
          </Button>
        </div>
      </DashboardShellV2>
    );
  }

  return (
    <DashboardShellV2 title="Edit Requirement" {...shellProps}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-ink">Edit Requirement</h1>
        <p className="text-sm text-ink-soft">
          {["published", "paused", "rejected"].includes(
            requirement.status ?? ""
          )
            ? "Saving changes will send this requirement back for admin approval."
            : "Update the details and submit for admin approval."}
        </p>
      </div>
      <RequirementForm mode="edit" existing={requirement} dashboardRole="owner" />
    </DashboardShellV2>
  );
}
