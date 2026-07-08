import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { canManageProvider } from "@/lib/permissions";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { getProviderStatusList } from "@/lib/admin/providerStatus";

export const metadata: Metadata = {
  title: "Providers — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProvidersPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);

  if (!canManageProvider(staff, permissionsByModule["providers"] ?? null)) {
    redirect("/unauthorized?reason=permission_denied");
  }

  const providers = getProviderStatusList();

  return (
    <AdminShell
      title="Provider Status"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/providers")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <Alert tone="warning" className="mb-4">
        This page never shows secret values — only whether credentials exist,
        and whether they have been verified working (none are auto-marked
        &quot;Active&quot; without a real test).
      </Alert>
      <Card className="p-0 overflow-hidden">
        <div className="flex flex-col divide-y divide-zinc-100">
          {providers.map((p) => (
            <div
              key={p.name}
              className="px-4 py-3 flex items-center justify-between gap-2"
            >
              <div>
                <p className="text-sm font-medium text-zinc-900">{p.name}</p>
                <p className="text-xs text-zinc-400">
                  env: {p.envVarName} (name only, value never shown)
                </p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                  p.configured
                    ? "bg-blue-50 text-blue-700 border-blue-100"
                    : "bg-zinc-100 text-zinc-500 border-zinc-200"
                }`}
              >
                {p.configured ? "CONFIGURED (untested)" : "SETUP_REQUIRED"}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </AdminShell>
  );
}
