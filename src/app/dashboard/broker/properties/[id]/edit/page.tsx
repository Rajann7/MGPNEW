import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/auth/session";
import { canEditProperty } from "@/lib/permissions/entity-permissions";
import { getMyPropertyById } from "@/lib/actions/properties";
import { PropertyForm } from "@/components/forms/PropertyForm";
import { WizardShell } from "@/components/forms/WizardShell";
import { EditReapprovalGate } from "@/components/forms/wizard/EditReapprovalGate";
import { WizardMobileHeader } from "@/components/forms/wizard/WizardMobileHeader";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Edit Property",
  robots: { index: false, follow: false },
};

const LOCKED_REASON: Record<string, string> = {
  under_review: "This property is currently under review and can't be edited until that finishes.",
  expired: "This listing has expired. Use Relist from My Listings to send it back for approval.",
  deleted: "This listing has been deleted.",
};

const REQUIRES_REAPPROVAL_CONFIRM = ["published", "paused", "rejected"];

export default async function EditBrokerPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("broker");
  const { id } = await params;

  const result = await getMyPropertyById(id);
  if (!result.success) {
    if (result.error === "FORBIDDEN")
      redirect("/unauthorized?reason=not_owner");
    notFound();
  }

  const property = result.data;

  const shellProps = {
    title: "Edit Property",
    navItems: getBrokerNav("/dashboard/broker/properties"),
    mobileTabs: getMobileTabs("broker", "/dashboard/broker/properties"),
    userName: profile.display_name ?? profile.full_name,
    userRole: "Broker / Agent",
  };

  if (
    !canEditProperty(profile, {
      owner_profile_id: property.owner_profile_id!,
      status: property.status!,
      deleted_at: property.deleted_at ?? null,
    })
  ) {
    return (
      <WizardShell {...shellProps}>
        <WizardMobileHeader title="Edit Property" backHref="/dashboard/broker/properties" />
        <Alert tone="info">
          {LOCKED_REASON[property.status ?? ""] ??
            "This listing can't be edited right now."}
        </Alert>
        <div className="mt-4">
          <Button href="/dashboard/broker/properties" variant="outline">
            ← My Listings
          </Button>
        </div>
      </WizardShell>
    );
  }

  const needsConfirm = REQUIRES_REAPPROVAL_CONFIRM.includes(
    property.status ?? ""
  );

  return (
    <WizardShell {...shellProps}>
      <EditReapprovalGate
        requiresConfirmation={needsConfirm}
        backHref="/dashboard/broker/properties"
      >
        <div className="mb-6 hidden lg:block">
          <h1 className="text-xl font-bold text-ink">Edit Property</h1>
          <p className="text-sm text-ink-soft">
            {needsConfirm
              ? "Saving changes will send this listing back for admin approval."
              : "Submit for admin approval to publish."}
          </p>
        </div>
        <PropertyForm
          mode="edit"
          existing={property}
          dashboardHref="/dashboard/broker/properties"
          profileMobile={profile.mobile}
          profileMobileVerified={profile.mobile_verified}
        />
      </EditReapprovalGate>
    </WizardShell>
  );
}
