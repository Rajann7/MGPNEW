import { PublicHeaderClient } from "@/components/layout/PublicHeaderClient";
import type { Profile } from "@/types";

interface Props {
  profile: Profile | null;
}

export function PublicHeader({ profile }: Props) {
  return <PublicHeaderClient profile={profile} />;
}
