import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/auth/session";
import { getMyProjectById } from "@/lib/actions/projects";
import { getProjectWings, listProjectUnits } from "@/lib/actions/units";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { UnitInventoryClient } from "@/components/dashboard/UnitInventoryClient";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = {
  title: "Unit Inventory",
  robots: { index: false, follow: false },
};

export default async function ProjectUnitsPage({
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

  const [wingsRes, unitsRes] = await Promise.all([
    getProjectWings(id),
    listProjectUnits(id, { page: 1, limit: 50 }),
  ]);

  return (
    <DashboardShellV2
      title="Unit Inventory"
      navItems={getBuilderNav("/dashboard/builder/projects")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/projects")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <div className="mb-6">
        <Link
          href="/dashboard/builder/projects"
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          My Projects
        </Link>
        <h1 className="text-xl font-bold text-zinc-900 truncate">
          Unit Inventory — {project.project_name ?? "Project"}
        </h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Wings, floors and units for this project. Changes here update the
          public project card&rsquo;s Available count live.
        </p>
      </div>

      {(!wingsRes.success || !unitsRes.success) && (
        <Alert tone="danger">
          Failed to load unit inventory. Please refresh.
        </Alert>
      )}

      {wingsRes.success && unitsRes.success && (
        <UnitInventoryClient
          projectId={id}
          initialWings={wingsRes.data}
          initialUnits={unitsRes.data.items}
          initialTotal={unitsRes.data.total}
          initialStatusCounts={unitsRes.data.statusCounts}
        />
      )}
    </DashboardShellV2>
  );
}
