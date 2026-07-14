"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BannerImageUploader, type DeviceImage } from "./BannerImageUploader";
import { SponsoredLabel } from "./SponsoredLabel";
import { saveBannerDraft, submitBanner } from "@/lib/banner/actions";
import { DURATION_OPTIONS, DEVICE_RULES, bannerFeatures } from "@/lib/banner/config";
import type { BannerAd } from "@/lib/banner/types";

interface CityOpt { slug: string; name: string }
interface ProjectOpt { id: string; title: string; city_name: string | null; city_slug: string | null }

/** Advertiser create/edit form — promote a listed project (Housing "Top picks" style). */
export function BannerAdForm({ authUid, projects, cities, initial }: { authUid: string; projects: ProjectOpt[]; cities: CityOpt[]; initial?: BannerAd | null }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [projectId, setProjectId] = useState(initial?.project_id ?? projects[0]?.id ?? "");
  const [adKey] = useState(() => initial?.id ?? `draft-${Math.random().toString(36).slice(2, 9)}`);
  const project = projects.find((p) => p.id === projectId) ?? null;

  const [duration, setDuration] = useState<number>(initial?.duration_days ?? 7);
  const [gujaratWide, setGujaratWide] = useState(initial?.gujarat_wide ?? false);
  const [selected, setSelected] = useState<CityOpt[]>(initial?.targets?.map((t) => ({ slug: t.city_slug, name: t.city_name })) ?? []);
  const [citySearch, setCitySearch] = useState("");

  const [desktop, setDesktop] = useState<DeviceImage>({ url: initial?.desktop_image_url ?? null, path: initial?.desktop_image_path ?? null });
  const [mobile, setMobile] = useState<DeviceImage>({ url: initial?.mobile_image_url ?? null, path: initial?.mobile_image_path ?? null });
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const slots: Record<string, [DeviceImage, (v: DeviceImage) => void]> = { desktop: [desktop, setDesktop], mobile: [mobile, setMobile] };

  function chooseProject(id: string) {
    setProjectId(id);
    const p = projects.find((x) => x.id === id);
    if (p?.city_slug && p.city_name && selected.length === 0 && !gujaratWide) {
      setSelected([{ slug: p.city_slug, name: p.city_name }]);
    }
  }

  const filteredCities = cities.filter((c) => c.name.toLowerCase().includes(citySearch.toLowerCase())).slice(0, 40);
  function toggleCity(c: CityOpt) {
    setSelected((cur) => cur.some((x) => x.slug === c.slug) ? cur.filter((x) => x.slug !== c.slug) : [...cur, c]);
  }

  function payload() {
    return {
      id: initial?.id, project_id: projectId, duration_days: duration,
      gujarat_wide: gujaratWide, cities: gujaratWide ? [] : selected.map((c) => ({ slug: c.slug, name: c.name })),
      desktop_image_url: desktop.url, desktop_image_path: desktop.path,
      mobile_image_url: mobile.url, mobile_image_path: mobile.path,
    };
  }
  function run(kind: "draft" | "submit") {
    setMsg(null);
    start(async () => {
      const res = kind === "draft" ? await saveBannerDraft(payload()) : await submitBanner(payload());
      setMsg({ ok: res.ok, text: res.message });
      if (res.ok) { router.push("/dashboard/builder/ads"); router.refresh(); }
    });
  }

  if (projects.length === 0) {
    return (
      <div className="max-w-md rounded-card border border-border bg-surface p-5 shadow-soft">
        <p className="text-sm font-semibold text-ink">No live projects to advertise</p>
        <p className="mt-1 text-sm text-ink-muted">Banner ads promote one of your <b>published projects</b>. Post a project and get it approved &amp; published first, then create a banner for it.</p>
        <Link href="/dashboard/builder/projects/new" className="mt-4 inline-flex rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover">Add a project</Link>
      </div>
    );
  }

  const previewImg = desktop.url || mobile.url;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <div className="space-y-5">
        {/* Project */}
        <section className="rounded-card border border-border bg-surface p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-ink">Which project are you promoting?</h2>
          <p className="mt-0.5 text-xs text-ink-muted">Card details (name, price, BHK, location) come from this listing and the banner links to it.</p>
          <select value={projectId} onChange={(e) => chooseProject(e.target.value)}
            className="mt-3 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand">
            {projects.map((p) => <option key={p.id} value={p.id}>{p.title}{p.city_name ? ` — ${p.city_name}` : ""}</option>)}
          </select>
        </section>

        {/* Targeting */}
        {bannerFeatures.cityTargeting && (
          <section className="rounded-card border border-border bg-surface p-4 shadow-soft">
            <h2 className="text-sm font-semibold text-ink">City targeting</h2>
            {bannerFeatures.gujaratWide && (
              <label className="mt-2 flex items-center gap-2 text-sm text-ink">
                <input type="checkbox" checked={gujaratWide} onChange={(e) => setGujaratWide(e.target.checked)} />
                Show across all of Gujarat (Gujarat-wide)
              </label>
            )}
            {!gujaratWide && (
              <div className="mt-3">
                {selected.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {selected.map((c) => (
                      <button key={c.slug} type="button" onClick={() => toggleCity(c)} className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">{c.name} ×</button>
                    ))}
                  </div>
                )}
                <input value={citySearch} onChange={(e) => setCitySearch(e.target.value)} placeholder="Search city"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand" />
                <div className="mt-2 max-h-44 overflow-y-auto rounded-lg border border-border">
                  {filteredCities.map((c) => {
                    const on = selected.some((x) => x.slug === c.slug);
                    return (
                      <button key={c.slug} type="button" onClick={() => toggleCity(c)}
                        className={`flex w-full items-center justify-between px-3 py-1.5 text-sm hover:bg-surface-muted ${on ? "text-brand" : "text-ink"}`}>
                        {c.name}{on ? <span>✓</span> : null}
                      </button>
                    );
                  })}
                  {filteredCities.length === 0 && <p className="px-3 py-3 text-xs text-ink-muted">No matching city.</p>}
                </div>
                <p className="mt-1 text-[11px] text-ink-muted">Your selected city shows these ads first on the homepage.</p>
              </div>
            )}
          </section>
        )}

        {/* Images + duration */}
        <section className="rounded-card border border-border bg-surface p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-ink">Banner creative</h2>
          <p className="mt-0.5 text-xs text-ink-muted">One creative image, with a separate version for desktop and mobile.</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {DEVICE_RULES.map((rule) => {
              const [val, setVal] = slots[rule.key];
              return <BannerImageUploader key={rule.key} rule={rule} value={val} onChange={setVal} authUid={authUid} adKey={adKey} />;
            })}
          </div>
          <div className="mt-3 max-w-[200px]">
            <label className="block text-xs font-medium text-ink-soft">Duration</label>
            <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand">
              {DURATION_OPTIONS.map((dd) => <option key={dd} value={dd}>{dd} days</option>)}
            </select>
          </div>
        </section>

        {!bannerFeatures.paymentRequired && (
          <p className="rounded-lg border border-border bg-surface-muted p-3 text-xs text-ink-muted">
            Paid banner packages arrive with billing. For now, submitted ads go to admin review and run free once approved — no payment is taken or faked.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" disabled={pending} onClick={() => run("draft")} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-muted disabled:opacity-50">{pending ? "Saving…" : "Save draft"}</button>
          <button type="button" disabled={pending} onClick={() => run("submit")} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-50">{pending ? "Submitting…" : bannerFeatures.approvalRequired ? "Submit for review" : "Publish"}</button>
          {msg && <span className={`text-sm ${msg.ok ? "text-success" : "text-danger"}`}>{msg.text}</span>}
        </div>
      </div>

      {/* Live "Top picks" preview */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <p className="mb-2 text-xs font-medium text-ink-soft">Homepage preview</p>
        <div className="overflow-hidden rounded-card border border-border bg-surface shadow-soft">
          <div className="grid grid-cols-[40%_60%]">
            <div className="flex flex-col justify-between gap-2 p-3">
              <div>
                <p className="text-[11px] font-semibold text-ink-muted">{initial?.advertiser_name || "Your brand"}</p>
                <p className="mt-1 line-clamp-2 text-sm font-semibold text-ink">{project?.title || "Project name"}</p>
                <p className="mt-0.5 text-[11px] text-ink-muted">{project?.city_name || "City"}</p>
              </div>
              <span className="inline-flex justify-center rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white">Contact</span>
            </div>
            <div className="relative bg-surface-muted">
              {previewImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewImg} alt="Banner preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full min-h-[120px] items-center justify-center text-[11px] text-ink-muted">Upload an image</div>
              )}
              <SponsoredLabel className="absolute left-2 top-2" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-ink-muted">{gujaratWide ? "Targeting: Gujarat-wide" : selected.length ? `Targeting: ${selected.map((c) => c.name).join(", ")}` : "No city selected yet"}</p>
      </aside>
    </div>
  );
}
