import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/auth/session";
import { canEditProject } from "@/lib/permissions/entity-permissions";
import { getMyProjectById } from "@/lib/actions/projects";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { WizardShell } from "@/components/forms/WizardShell";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Edit Project",
  robots: { index: false, follow: false },
};

const LOCKED_REASON: Record<string, string> = {
  under_review:
    "This project is currently under review and can't be edited until that finishes.",
  expired:
    "This listing has expired. Use Relist from My Projects to send it back for approval.",
  deleted: "This project has been deleted.",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("builder");
  const { id } = await params;

  const result = await getMyProjectById(id);
  if (!result.success) {
    if (result.error === "FORBIDDEN")
      redirect("/unauthorized?reason=not_owner");
    notFound();
  }

  const project = result.data;

  const shellProps = {
    title: "Edit Project",
    navItems: getBuilderNav("/dashboard/builder/projects"),
    mobileTabs: getMobileTabs("builder", "/dashboard/builder/projects"),
    userName: profile.display_name ?? profile.full_name,
    userRole: "Builder / Developer",
  };

  if (
    !canEditProject(profile, {
      builder_profile_id: project.builder_profile_id!,
      status: project.status!,
      deleted_at: project.deleted_at ?? null,
    })
  ) {
    return (
      <WizardShell {...shellProps}>
        <Alert tone="info">
          {LOCKED_REASON[project.status ?? ""] ??
            "This project can't be edited right now."}
        </Alert>
        <div className="mt-4">
          <Button href="/dashboard/builder/projects" variant="outline">
            ← My Projects
          </Button>
        </div>
      </WizardShell>
    );
  }

  return (
    <WizardShell {...shellProps}>
      <div className="mb-6 hidden sm:block">
        <h1 className="text-xl font-bold text-ink">Edit Project</h1>
        <p className="text-sm text-ink-soft">
          {["published", "paused", "rejected"].includes(project.status ?? "")
            ? "Saving changes will send this project back for admin approval."
            : "Complete all steps and submit for admin approval."}
        </p>
      </div>
      <ProjectForm mode="edit" existing={project} />
    </WizardShell>
  );
}
