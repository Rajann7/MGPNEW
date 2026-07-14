import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { SavedItemsClient } from "@/components/saved/SavedItemsClient";
import { listSavedItems } from "@/lib/actions/saved";

export const metadata: Metadata = {
  title: "Saved Items",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function OwnerSavedPage() {
  const profile = await requireRole("owner");
  const result = await listSavedItems();

  return (
    <DashboardShellV2
      title="Saved Items"
      navItems={getOwnerNav("/dashboard/owner/saved")}
      mobileBackHref="/dashboard/owner"
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/saved")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <SavedItemsClient items={result.success ? result.data.items : []} />
    </DashboardShellV2>
  );
}
