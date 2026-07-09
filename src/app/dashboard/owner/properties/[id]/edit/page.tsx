import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/auth/session";
import { canEditProperty } from "@/lib/permissions/entity-permissions";
import { getMyPropertyById } from "@/lib/actions/properties";
import { PropertyForm } from "@/components/forms/PropertyForm";
import { WizardShell } from "@/components/forms/WizardShell";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Edit Property",
  robots: { index: false, follow: false },
};

const LOCKED_REASON: Record<string, string> = {
  under_review: "This property is currently under review and can't be edited until that finishes.",
  expired: "This listing has expired. Use Relist from My Properties to send it back for approval.",
  deleted: "This listing has been deleted.",
};

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("owner");
  const { id } = await params;

  const result = await getMyPropertyById(id);
  if (!result.success) {
    if (result.error === "FORBIDDEN")
      redirect("/unauthorized?reason=not_owner");
    notFound();
  }

  const property = result.data;

  if (
    !canEditProperty(profile, {
      owner_profile_id: property.owner_profile_id!,
      status: property.status!,
      deleted_at: property.deleted_at ?? null,
    })
  ) {
    return (
      <WizardShell
        title="Edit Property"
        dashboardHref="/dashboard/owner/properties"
        dashboardLabel="My Properties"
      >
        <Alert tone="info">
          {LOCKED_REASON[property.status ?? ""] ??
            "This listing can't be edited right now."}
        </Alert>
        <div className="mt-4">
          <Button href="/dashboard/owner/properties" variant="outline">
            ← My Properties
          </Button>
        </div>
      </WizardShell>
    );
  }

  return (
    <WizardShell
      title="Edit Property"
      dashboardHref="/dashboard/owner/properties"
      dashboardLabel="My Properties"
    >
      <div className="mb-6 hidden sm:block">
        <h1 className="text-xl font-bold text-ink">Edit Property</h1>
        <p className="text-sm text-ink-soft">
          {["published", "paused", "rejected"].includes(property.status ?? "")
            ? "Saving changes will send this listing back for admin approval."
            : "Complete all steps and submit for admin approval."}
        </p>
      </div>
      <PropertyForm
        mode="edit"
        existing={property}
        dashboardHref="/dashboard/owner/properties"
      />
    </WizardShell>
  );
}
