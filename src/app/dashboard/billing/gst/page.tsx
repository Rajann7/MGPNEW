import { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getNavForRole,
  getMobileTabsForRole,
  getRoleLabel,
} from "@/lib/dashboard/navForRole";
import { GstProfileForm } from "@/components/billing/GstProfileForm";
import { getGstProfile } from "@/lib/actions/billing";

export const metadata: Metadata = {
  title: "Billing / GST Details",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function GstProfilePage() {
  const profile = await requireAuth();
  const result = await getGstProfile();
  const setupRequired = !result.success && result.error === "SETUP_REQUIRED";

  return (
    <DashboardShellV2
      title="Billing / GST Details"
      navItems={getNavForRole(profile.public_role, "/dashboard/billing/gst")}
      mobileBackHref={`/dashboard/${profile.public_role}`}
      mobileTabs={getMobileTabsForRole(
        profile.public_role,
        "/dashboard/billing/gst"
      )}
      userName={profile.display_name ?? profile.full_name}
      userRole={getRoleLabel(profile.public_role)}
    >
      <div className="max-w-lg">
        <p className="text-sm text-zinc-500 mb-6">
          These details are snapshotted onto your invoice at the time a verified
          payment is made. GSTIN is required only for B2B (GST) invoices.
        </p>
        {setupRequired ? (
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-6 text-sm text-amber-800">
            Billing is not set up yet. GST details can be saved once billing is
            configured.
          </div>
        ) : (
          <GstProfileForm
            initial={result.success ? result.data.profile : null}
          />
        )}
      </div>
    </DashboardShellV2>
  );
}
