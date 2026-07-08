import { Metadata } from "next";
import { Globe } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { DashboardPlaceholderPanel } from "@/components/dashboard/DashboardPlaceholderPanel";
import { getPublicBuilderLinkByProfileId } from "@/lib/actions/public-search";

export const metadata: Metadata = {
  title: "Public Profile",
  robots: { index: false, follow: false },
};

export default async function BuilderPublicProfilePage() {
  const profile = await requireRole("builder");
  const published = await getPublicBuilderLinkByProfileId(profile.id);

  return (
    <DashboardShellV2
      title="Public Profile"
      navItems={getBuilderNav("/dashboard/builder/public-profile")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/public-profile")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
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
            ? "Buyers can view your published projects on your public builder profile."
            : "Publishing a shareable public builder profile page will be available from this dashboard in a later phase."
        }
        linkHref={
          published?.public_slug
            ? `/builder/${published.public_slug}`
            : undefined
        }
        linkLabel={published?.public_slug ? "View Public Profile" : undefined}
      />
    </DashboardShellV2>
  );
}
