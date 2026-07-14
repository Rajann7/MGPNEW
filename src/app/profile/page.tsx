import { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getOwnerNav,
  getBrokerNav,
  getBuilderNav,
  getMobileTabs,
} from "@/components/dashboard/navConfig";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "My Profile",
  robots: { index: false, follow: false },
};

const ROLE_LABEL_MAP: Record<string, string> = {
  owner: "Owner",
  broker: "Broker / Agent",
  builder: "Builder / Developer",
};

export default async function ProfilePage() {
  const profile = await requireAuth();
  const role = profile.public_role as "owner" | "broker" | "builder";
  const getNav =
    role === "owner"
      ? getOwnerNav
      : role === "broker"
        ? getBrokerNav
        : getBuilderNav;

  return (
    <DashboardShellV2
      title="My Profile"
      navItems={getNav("/profile")}
      mobileBackHref={`/dashboard/${role}`}
      mobileTabs={getMobileTabs(role, "/profile")}
      userName={profile.display_name ?? profile.full_name}
      userRole={ROLE_LABEL_MAP[profile.public_role] ?? profile.public_role}
    >
      <Card className="mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center flex-shrink-0 text-xl font-bold">
            {(profile.display_name ?? profile.full_name)
              .charAt(0)
              .toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-bold text-ink">
              {profile.display_name ?? profile.full_name}
            </p>
            <p className="text-sm text-ink-muted">
              {ROLE_LABEL_MAP[profile.public_role]}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ProfileField label="Full Name" value={profile.full_name} />
          <ProfileField
            label="Email"
            value={profile.email ? "•••@•••" : "Not set"}
            note="(hidden for privacy)"
          />
          <ProfileField
            label="Mobile"
            value={
              profile.mobile
                ? `+91 •••••${profile.mobile.slice(-5)}`
                : "Not set"
            }
            note="(masked for privacy)"
          />
          <ProfileField
            label="Mobile Verified"
            value={profile.mobile_verified ? "Yes" : "No"}
          />
          <ProfileField
            label="Account Status"
            value={
              profile.account_status.charAt(0).toUpperCase() +
              profile.account_status.slice(1)
            }
          />
          <ProfileField
            label="Verification"
            value={profile.verification_status.replace(/_/g, " ")}
          />
        </div>
      </Card>

      <Card muted>
        <p className="text-sm font-semibold text-ink mb-1">Edit Profile</p>
        <p className="text-xs text-ink-muted">
          Profile editing will be available in a later phase.
        </p>
        <span className="mt-2 inline-block text-xs bg-amber-500/10 text-amber-600 dark:text-amber-300 font-medium px-2 py-0.5 rounded-full">
          Coming Soon
        </span>
      </Card>
    </DashboardShellV2>
  );
}

function ProfileField({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="text-sm">
      <p className="text-xs text-ink-muted font-medium mb-0.5">{label}</p>
      <p className="text-ink font-medium">
        {value}
        {note && (
          <span className="text-xs text-ink-muted font-normal ml-1">
            {note}
          </span>
        )}
      </p>
    </div>
  );
}
