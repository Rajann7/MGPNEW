import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { canCreateProject } from "@/lib/permissions/entity-permissions";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { ProjectDraftResumeCard } from "@/components/forms/ProjectDraftResumeCard";
import { WizardShell } from "@/components/forms/WizardShell";
import { WizardMobileHeader } from "@/components/forms/wizard/WizardMobileHeader";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { getMyLatestProjectDraft } from "@/lib/actions/projects";
import { createClient } from "@/lib/supabase/server";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Post Project",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ fresh?: string; draft?: string }>;
}

export default async function NewProjectPage({ searchParams }: Props) {
  const profile = await requireRole("builder");
  const { fresh, draft: draftParam } = await searchParams;

  const shellProps = {
    title: "Post a Project",
    navItems: getBuilderNav("/dashboard/builder/projects"),
    mobileTabs: getMobileTabs("builder", "/dashboard/builder/projects"),
    userName: profile.display_name ?? profile.full_name,
    userRole: "Builder / Developer",
  };

  if (!canCreateProject(profile)) {
    return (
      <WizardShell {...shellProps}>
        <WizardMobileHeader
          title="Post a Project"
          backHref="/dashboard/builder"
        />
        <Alert tone="danger">Only Builder accounts can post projects.</Alert>
        <div className="mt-4">
          <Button href="/dashboard/builder" variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </WizardShell>
    );
  }

  // Developer field (Batch 5 §136-138) — real, verified Builder Profile,
  // never a free-typed name.
  const supabase = await createClient();
  const { data: builderProfile } = await supabase
    .from("builder_profiles")
    .select("company_name, verification_status")
    .eq("profile_id", profile.id)
    .maybeSingle();

  const draftResult = fresh ? null : await getMyLatestProjectDraft();
  const draft =
    draftResult?.success && draftResult.data ? draftResult.data : null;

  if (draft && !fresh && !draftParam) {
    return (
      <WizardShell {...shellProps}>
        <WizardMobileHeader
          title="Post a Project"
          backHref="/dashboard/builder"
        />
        <div className="mb-6 hidden lg:block">
          <h1 className="text-xl font-bold text-ink">Post a Project</h1>
          <p className="text-sm text-ink-soft">
            Complete all steps and submit for admin review. RERA is verified
            before approval.
          </p>
        </div>
        <ProjectDraftResumeCard draft={draft} />
      </WizardShell>
    );
  }

  const existing = draftParam && draft?.id === draftParam ? draft : undefined;

  return (
    <WizardShell {...shellProps}>
      <div className="mb-6 hidden lg:block">
        <h1 className="text-xl font-bold text-ink">Post a Project</h1>
        <p className="text-sm text-ink-soft">
          Complete all steps and submit for admin review. RERA is verified
          before approval.
        </p>
      </div>
      <ProjectForm
        mode={existing ? "edit" : "create"}
        existing={existing}
        dashboardHref="/dashboard/builder"
        developerName={builderProfile?.company_name ?? profile.display_name}
        developerVerificationStatus={
          builderProfile?.verification_status ?? null
        }
      />
    </WizardShell>
  );
}
