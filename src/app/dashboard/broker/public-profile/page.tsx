import { Metadata } from "next";
import { Globe } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { DashboardPlaceholderPanel } from "@/components/dashboard/DashboardPlaceholderPanel";
import { getPublicBrokerLinkByProfileId } from "@/lib/actions/public-search";

export const metadata: Metadata = {
  title: "Public Profile",
  robots: { index: false, follow: false },
};

export default async function BrokerPublicProfilePage() {
  const profile = await requireRole("broker");
  const published = await getPublicBrokerLinkByProfileId(profile.id);

  return (
    <DashboardShellV2
      title="Public Profile"
      navItems={getBrokerNav("/dashboard/broker/public-profile")}
      mobileDrawerNav={getBrokerNav("/dashboard/broker/public-profile")}
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/public-profile")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <DashboardPlaceholderPanel
        icon={Globe}
        status={published?.public_slug ? "no_data" : "setup_required"}
        title={
          published?.public_slug
            ? "Your Public Profile Is Live"
            : "Public Profile Not Published Yet"
        }
        description={
          published?.public_slug
            ? "Buyers and renters can view your published listings on your public broker profile."
            : "Publishing a shareable public broker profile page will be available from this dashboard in a later phase."
        }
        linkHref={
          published?.public_slug
            ? `/broker/${published.public_slug}`
            : undefined
        }
        linkLabel={published?.public_slug ? "View Public Profile" : undefined}
      />
    </DashboardShellV2>
  );
}
