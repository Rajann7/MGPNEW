import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { canCreateProject } from "@/lib/permissions/entity-permissions";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { WizardShell } from "@/components/forms/WizardShell";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Post Project",
  robots: { index: false, follow: false },
};

export default async function NewProjectPage() {
  const profile = await requireRole("builder");
  const shellProps = {
    navItems: getBuilderNav("/dashboard/builder/projects"),
    mobileTabs: getMobileTabs("builder", "/dashboard/builder/projects"),
    userName: profile.display_name ?? profile.full_name,
    userRole: "Builder / Developer",
  };

  if (!canCreateProject(profile)) {
    return (
      <WizardShell title="Post a Project" {...shellProps}>
        <Alert tone="danger">Only Builder accounts can post projects.</Alert>
        <div className="mt-4">
          <Button href="/dashboard/builder" variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </WizardShell>
    );
  }

  return (
    <WizardShell title="Post a Project" {...shellProps}>
      <div className="mb-6 hidden lg:block">
        <h1 className="text-xl font-bold text-ink">Post a Project</h1>
        <p className="text-sm text-ink-soft">
          Submit for admin review before going public. RERA disclaimer will be
          shown.
        </p>
      </div>
      <ProjectForm mode="create" />
    </WizardShell>
  );
}
