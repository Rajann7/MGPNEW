import { Metadata } from "next";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";
import { listPendingVerifications } from "@/lib/actions/admin/verification";

export const metadata: Metadata = {
  title: "Verification — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminVerificationPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);
  const result = await listPendingVerifications();
  const items = result.success ? result.data.items : [];

  return (
    <AdminShell
      title="Verification"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/verification")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <Alert tone="info" className="mb-4">
        This shows real pending/under-review verification status only. Document
        upload and full approval workflow (with RERA proof review) are{" "}
        <strong>SETUP_REQUIRED</strong> — coming in a later phase. No fake
        verified badges are shown.
      </Alert>

      {items.length === 0 ? (
        <EmptyState
          title="No pending verifications"
          description="No user is currently pending or under verification review."
        />
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="flex flex-col divide-y divide-zinc-100">
            {items.map((v) => (
              <div
                key={v.profileId}
                className="px-4 py-3 flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">
                    {v.fullName}
                  </p>
                  <p className="text-xs text-zinc-500 capitalize">
                    {v.publicRole}
                  </p>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-amber-50 text-amber-700 border-amber-100 capitalize">
                  {v.verificationStatus.replace(/_/g, " ")}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </AdminShell>
  );
}
