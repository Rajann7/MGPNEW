import type { Metadata } from "next";
import { getCurrentProfile } from "@/lib/auth/session";
import { DetailShell } from "@/components/detail/DetailShell";
import { UnavailableEntityState } from "@/components/detail/UnavailableEntityState";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function PropertyNotFound() {
  const profile = await getCurrentProfile();
  return (
    <DetailShell profile={profile} title="Property">
      <UnavailableEntityState />
    </DetailShell>
  );
}
