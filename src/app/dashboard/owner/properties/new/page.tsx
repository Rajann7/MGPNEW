import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { canCreateProperty } from "@/lib/permissions/entity-permissions";
import { PropertyForm } from "@/components/forms/PropertyForm";
import { DraftResumeCard } from "@/components/forms/DraftResumeCard";
import { WizardShell } from "@/components/forms/WizardShell";
import { WizardMobileHeader } from "@/components/forms/wizard/WizardMobileHeader";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { getMyLatestPropertyDraft } from "@/lib/actions/properties";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Post Property",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ fresh?: string; draft?: string }>;
}

export default async function NewPropertyPage({ searchParams }: Props) {
  const profile = await requireRole("owner");
  const { fresh, draft: draftParam } = await searchParams;

  const shellProps = {
    title: "Post a Property",
    navItems: getOwnerNav("/dashboard/owner/properties"),
    mobileTabs: getMobileTabs("owner", "/dashboard/owner/properties/new"),
    userName: profile.display_name ?? profile.full_name,
    userRole: "Owner",
  };

  if (!canCreateProperty(profile)) {
    return (
      <WizardShell {...shellProps}>
        <WizardMobileHeader title="Post a Property" backHref="/dashboard/owner" />
        <Alert tone="danger">
          Your account is not permitted to post properties.
        </Alert>
        <div className="mt-4">
          <Button href="/dashboard/owner" variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </WizardShell>
    );
  }

  const draftResult = fresh ? null : await getMyLatestPropertyDraft();
  const draft =
    draftResult?.success && draftResult.data ? draftResult.data : null;

  // A real, unfinished draft exists and the user hasn't chosen Continue/Start
  // New yet — show only the re-entry card (design Batch 5 · draft re-entry),
  // not a confusing blank form underneath it.
  if (draft && !fresh && !draftParam) {
    return (
      <WizardShell {...shellProps}>
        <WizardMobileHeader title="Post a Property" backHref="/dashboard/owner" />
        <div className="mb-6 hidden lg:block">
          <h1 className="text-xl font-bold text-ink">Post a Property</h1>
          <p className="text-sm text-ink-soft">
            Complete all steps and submit for admin approval.
          </p>
        </div>
        <DraftResumeCard draft={draft} />
      </WizardShell>
    );
  }

  const existing = draftParam && draft?.id === draftParam ? draft : undefined;

  return (
    <WizardShell {...shellProps}>
      <div className="mb-6 hidden lg:block">
        <h1 className="text-xl font-bold text-ink">Post a Property</h1>
        <p className="text-sm text-ink-soft">
          Complete all steps and submit for admin approval.
        </p>
      </div>
      <PropertyForm
        mode={existing ? "edit" : "create"}
        existing={existing}
        dashboardHref="/dashboard/owner"
        profileMobile={profile.mobile}
        profileMobileVerified={profile.mobile_verified}
      />
    </WizardShell>
  );
}
