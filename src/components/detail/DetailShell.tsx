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
  showCityPill = true,
  hideCompareTray = false,
  children,
}: {
  profile: Profile | null;
  title: string;
  headerActions?: React.ReactNode;
  showCityPill?: boolean;
  /** Property/project detail screens already dropped the per-card compare
   * icon (it doesn't make sense while viewing a single listing) — the tray
   * itself is also suppressed there so a leftover compare selection can
   * never sit on top of / behind this screen's own sticky Call/Enquire bar. */
  hideCompareTray?: boolean;
  children: React.ReactNode;
}) {
  return (
    <CityProvider>
      <AuthModalProvider>
        <CompareProvider>
          <div className="flex min-h-full flex-col">
            <DetailHeader
              profile={profile}
              title={title}
              actions={headerActions}
              showCityPill={showCityPill}
            />
            <main id="main-content" className="flex-1 bg-white">
              {children}
            </main>
            {/* No footer — Batch 4 detail screens do not show one. */}
          </div>
          {!hideCompareTray && <CompareTray />}
        </CompareProvider>
      </AuthModalProvider>
    </CityProvider>
  );
}
