import type { Metadata } from "next";
import { getCurrentProfile } from "@/lib/auth/session";
import { DetailShell } from "@/components/detail/DetailShell";
import { CompareView } from "@/components/compare/CompareView";

export const metadata: Metadata = {
  title: "Compare Listings",
  // Compare is a personal, client-side selection — not indexable content.
  robots: { index: false, follow: false },
};

export default async function ComparePage() {
  const profile = await getCurrentProfile();
  return (
    <DetailShell profile={profile} title="Compare">
      <CompareView />
    </DetailShell>
  );
}
