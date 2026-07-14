import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { getMyProjectById } from "@/lib/actions/projects";
import { listConstructionUpdates } from "@/lib/actions/construction";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { ConstructionProgressClient } from "@/components/dashboard/ConstructionProgressClient";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = {
  title: "Construction Progress",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/**
 * B8-S24 — Construction Progress. Real builder-posted milestones from
 * project_construction_updates (RLS: owner manages own). The latest stage also
 * syncs projects.construction_status, which drives the public project timeline.
 */
export default async function ProjectConstructionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("builder");
  const { id } = await params;

  const projectRes = await getMyProjectById(id);
  if (!projectRes.success) {
    if (projectRes.error === "FORBIDDEN")
      redirect("/unauthorized?reason=not_owner");
    notFound();
  }
  const project = projectRes.data;
  const updatesRes = await listConstructionUpdates(id);

  return (
    <DashboardShellV2
      title="Construction Progress"
      navItems={getBuilderNav("/dashboard/builder/projects")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/projects")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <div className="mb-6">
        <Link
          href="/dashboard/builder/projects"
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          My Projects
        </Link>
        <h1 className="truncate text-xl font-bold text-ink">
          Construction Progress — {project.project_name ?? "Project"}
        </h1>
        <p className="mt-0.5 text-sm text-muted">
          Post real construction milestones. The latest stage shows on your
          public project page&rsquo;s timeline — nothing is auto-generated.
        </p>
      </div>

      {!updatesRes.success ? (
        <Alert tone="danger">Failed to load construction updates. Please refresh.</Alert>
      ) : (
        <ConstructionProgressClient
          projectId={id}
          currentStage={project.construction_status ?? null}
          initialUpdates={updatesRes.data.items}
        />
      )}
    </DashboardShellV2>
  );
}
