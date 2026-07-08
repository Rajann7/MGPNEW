import { CityProvider } from "@/components/location/CityProvider";
import { AuthModalProvider } from "@/components/auth/AuthModalProvider";
import { CompareProvider } from "@/components/compare/CompareProvider";
import { CompareTray } from "@/components/compare/CompareTray";
import { DetailHeader } from "@/components/detail/DetailHeader";
import type { Profile } from "@/types";

/**
 * Chrome shell for Batch 4 detail/profile/compare screens.
 * Matches the MGP DESIGN exactly: condensed desktop header + mobile contextual
 * back-header, and NO site footer (the design has none on these screens).
 * Providers (city/auth-modal/compare) are kept — they are behaviour, not visual
 * chrome, and the detail interactions depend on them.
 */
export function DetailShell({
  profile,
  title,
  headerActions,
  children,
}: {
  profile: Profile | null;
  title: string;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <CityProvider>
      <AuthModalProvider>
        <CompareProvider>
          <div className="flex min-h-full flex-col">
            <DetailHeader profile={profile} title={title} actions={headerActions} />
            <main id="main-content" className="flex-1 bg-white">
              {children}
            </main>
            {/* No footer — Batch 4 detail screens do not show one. */}
          </div>
          <CompareTray />
        </CompareProvider>
      </AuthModalProvider>
    </CityProvider>
  );
}
