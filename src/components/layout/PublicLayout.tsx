import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { CityProvider } from "@/components/location/CityProvider";
import { AuthModalProvider } from "@/components/auth/AuthModalProvider";
import { CompareProvider } from "@/components/compare/CompareProvider";
import { CompareTray } from "@/components/compare/CompareTray";
import type { Profile } from "@/types";

interface Props {
  profile: Profile | null;
  children: React.ReactNode;
}

/**
 * Wraps public-facing pages with the sticky header and footer.
 * Dashboard, admin, and auth pages do NOT use this wrapper.
 * Profile is fetched once per page in the server component and passed down.
 */
export function PublicLayout({ profile, children }: Props) {
  return (
    <CityProvider>
      <AuthModalProvider>
        <CompareProvider>
          <div className="flex flex-col min-h-full">
            <PublicHeader profile={profile} />
            <main id="main-content" className="flex-1 bg-white">
              {children}
            </main>
            <PublicFooter />
          </div>
          <CompareTray />
        </CompareProvider>
      </AuthModalProvider>
    </CityProvider>
  );
}
