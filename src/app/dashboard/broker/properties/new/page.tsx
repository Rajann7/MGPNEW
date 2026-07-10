import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { PropertyForm } from "@/components/forms/PropertyForm";
import { DraftResumeCard } from "@/components/forms/DraftResumeCard";
import { WizardShell } from "@/components/forms/WizardShell";
import { WizardMobileHeader } from "@/components/forms/wizard/WizardMobileHeader";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { getMyLatestPropertyDraft } from "@/lib/actions/properties";

export const metadata: Metadata = {
  title: "Post Property — Broker",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ fresh?: string; draft?: string }>;
}

export default async function BrokerNewPropertyPage({ searchParams }: Props) {
  const profile = await requireRole("broker");
  const { fresh, draft: draftParam } = await searchParams;

  const shellProps = {
    title: "Post a Property",
    navItems: getBrokerNav("/dashboard/broker/properties"),
    mobileTabs: getMobileTabs("broker", "/dashboard/broker/properties/new"),
    userName: profile.display_name ?? profile.full_name,
    userRole: "Broker / Agent",
  };

  const draftResult = fresh ? null : await getMyLatestPropertyDraft();
  const draft =
    draftResult?.success && draftResult.data ? draftResult.data : null;

  if (draft && !fresh && !draftParam) {
    return (
      <WizardShell {...shellProps}>
        <WizardMobileHeader title="Post a Property" backHref="/dashboard/broker" />
        <div className="mb-6 hidden lg:block">
          <h1 className="text-xl font-bold text-ink">Post a Property</h1>
          <p className="text-sm text-ink-soft">
            Submit for admin approval to publish.
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
          Submit for admin approval to publish.
        </p>
      </div>
      <PropertyForm
        mode={existing ? "edit" : "create"}
        existing={existing}
        dashboardHref="/dashboard/broker"
        profileMobile={profile.mobile}
        profileMobileVerified={profile.mobile_verified}
      />
    </WizardShell>
  );
}
