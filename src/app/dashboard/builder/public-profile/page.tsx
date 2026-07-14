import { Metadata } from "next";
import Link from "next/link";
import { Globe, Building2, ExternalLink, CheckCircle2 } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { getPublicBuilderLinkByProfileId } from "@/lib/actions/public-search";
import { getMyProjects } from "@/lib/actions/projects";

export const metadata: Metadata = {
  title: "Company Microsite",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/**
 * B8-S23 — Company Microsite. Real management screen for the builder's public
 * company page (/builder/[slug]). Shows the live public URL + a real count of
 * published projects that appear on it. Honest not-published state; nothing is
 * fabricated. The public page becomes live automatically once a project is
 * published.
 */
export default async function BuilderPublicProfilePage() {
  const profile = await requireRole("builder");
  const [published, projectsRes] = await Promise.all([
    getPublicBuilderLinkByProfileId(profile.id),
    getMyProjects(1, 200),
  ]);
  const publishedProjects = (projectsRes.success ? projectsRes.data.items : [])
    .filter((p) => p.status === "published");
  const isLive = Boolean(published?.public_slug);
  const publicPath = published?.public_slug ? `/builder/${published.public_slug}` : null;

  return (
    <DashboardShellV2
      title="Company Microsite"
      navItems={getBuilderNav("/dashboard/builder/public-profile")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/public-profile")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <div className="max-w-2xl space-y-5">
        {/* Status card */}
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isLive ? "bg-emerald-500/10 text-emerald-600" : "bg-bg text-muted"}`}>
              <Globe className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-semibold text-ink">
                  {published?.company_name ?? published?.display_name ?? (profile.display_name ?? profile.full_name)}
                </h2>
                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${isLive ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600" : "border-amber-500/20 bg-amber-500/10 text-amber-600"}`}>
                  {isLive && <CheckCircle2 className="h-3 w-3" />}
                  {isLive ? "Live" : "Not published yet"}
                </span>
              </div>
              {isLive && publicPath ? (
                <>
                  <p className="mt-1 text-xs text-muted">
                    Your public company page is live and shows your published
                    projects to buyers.
                  </p>
                  <div className="mt-3 rounded-lg border border-border bg-bg px-3 py-2">
                    <p className="text-[11px] font-medium text-muted">Public URL</p>
                    <p className="truncate text-sm font-medium text-brand">{publicPath}</p>
                  </div>
                  <Link
                    href={publicPath}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-hover"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> View public profile
                  </Link>
                </>
              ) : (
                <p className="mt-1 text-xs text-muted">
                  Your public microsite goes live automatically once you have at
                  least one published project. Publish a project to activate it —
                  nothing is shown publicly until then.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Published projects on the microsite */}
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-ink">
              <Building2 className="h-4 w-4 text-brand" /> Projects shown ({publishedProjects.length})
            </h3>
            <Link href="/dashboard/builder/projects" className="text-xs font-medium text-brand hover:underline">
              Manage projects
            </Link>
          </div>
          {publishedProjects.length === 0 ? (
            <p className="text-xs text-muted">
              No published projects yet. Published projects will appear on your
              public microsite here.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {publishedProjects.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-2 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{p.project_name}</p>
                    <p className="truncate text-xs text-muted">{p.city_text ?? "—"}</p>
                  </div>
                  {p.slug && (
                    <Link href={`/project/${p.slug}`} className="shrink-0 text-xs font-medium text-brand hover:underline">
                      View
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardShellV2>
  );
}
