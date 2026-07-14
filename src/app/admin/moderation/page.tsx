import { Metadata } from "next";
import Link from "next/link";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card } from "@/components/ui/Card";
import { getModerationCounts } from "@/lib/actions/admin/moderation";
import { countPendingBanners } from "@/lib/banner/queries";

export const metadata: Metadata = {
  title: "Moderation — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ModerationIndexPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);
  const counts = await getModerationCounts();
  const pendingBanners = await countPendingBanners();

  const queues = [
    {
      label: "Properties",
      href: "/admin/moderation/properties",
      count: counts.success ? counts.data.properties : 0,
    },
    {
      label: "Projects",
      href: "/admin/moderation/projects",
      count: counts.success ? counts.data.projects : 0,
    },
    {
      label: "Requirements",
      href: "/admin/moderation/requirements",
      count: counts.success ? counts.data.requirements : 0,
    },
    {
      label: "Banner Ads",
      href: "/admin/moderation/banner-ads",
      count: pendingBanners ?? 0,
    },
  ];

  return (
    <AdminShell
      title="Moderation"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/moderation")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {queues.map((q) => (
          <Link key={q.href} href={q.href}>
            <Card interactive className="text-center">
              <p className="text-xs font-medium text-zinc-500">{q.label}</p>
              <p className="text-3xl font-bold text-zinc-900 mt-2">{q.count}</p>
              <p className="text-xs text-zinc-400 mt-1">pending review</p>
            </Card>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
