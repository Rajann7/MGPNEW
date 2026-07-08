import { Metadata } from "next";
import { Building2 } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { getMyProjects } from "@/lib/actions/projects";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { EntityListCard } from "@/components/dashboard/EntityListCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";
import type { EntityStatus } from "@/types";

export const metadata: Metadata = {
  title: "My Projects",
  robots: { index: false, follow: false },
};

export default async function BuilderProjectsPage() {
  const profile = await requireRole("builder");
  const result = await getMyProjects(1, 20);
  const items = result.success ? result.data.items : [];
  const total = result.success ? result.data.total : 0;

  return (
    <DashboardShellV2
      title="My Projects"
      navItems={getBuilderNav("/dashboard/builder/projects")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/projects")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <DashboardPageHeader
        title="My Projects"
        count={total}
        itemLabel="project"
        actionLabel="Post Project"
        actionHref="/dashboard/builder/projects/new"
      />

      {!result.success && (
        <Alert tone="danger">Failed to load projects. Please refresh.</Alert>
      )}

      {result.success && items.length === 0 && (
        <EmptyState
          icon={Building2}
          title="No projects yet"
          description="Post your first real estate project."
          actionLabel="Post Project"
          actionHref="/dashboard/builder/projects/new"
        />
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((project) => (
            <EntityListCard
              key={project.id}
              status={(project.status ?? "draft") as EntityStatus}
              purpose={project.purpose ?? undefined}
              badges={
                project.rera_registered && (
                  <span className="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium">
                    RERA
                  </span>
                )
              }
              title={project.project_name ?? "Untitled"}
              subtitle={project.city_text ?? undefined}
              meta={
                project.construction_status
                  ? project.construction_status.replace(/_/g, " ")
                  : undefined
              }
              createdAt={project.created_at!}
              editHref={`/dashboard/builder/projects/${project.id}/edit`}
            />
          ))}
        </div>
      )}
    </DashboardShellV2>
  );
}
