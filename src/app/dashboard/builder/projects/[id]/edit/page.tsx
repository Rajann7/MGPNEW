import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Edit Project",
  robots: { index: false, follow: false },
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("builder");
  const { id } = await params;

  return (
    <DashboardShellV2
      title="Edit Project"
      navItems={getBuilderNav("/dashboard/builder/projects")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/projects")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <h1 className="text-xl font-bold text-ink mb-2">Edit Project</h1>
      <p className="text-sm text-ink-soft mb-4">Project ID: {id}</p>
      <Alert tone="info">Edit form coming in next phase.</Alert>
      <div className="mt-4">
        <Button href="/dashboard/builder/projects" variant="outline">
          ← My Projects
        </Button>
      </div>
    </DashboardShellV2>
  );
}
