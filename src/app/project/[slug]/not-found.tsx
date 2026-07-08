import type { Metadata } from "next";
import { getCurrentProfile } from "@/lib/auth/session";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { UnavailableEntityState } from "@/components/detail/UnavailableEntityState";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ProjectNotFound() {
  const profile = await getCurrentProfile();
  return (
    <PublicLayout profile={profile}>
      <UnavailableEntityState />
    </PublicLayout>
  );
}
