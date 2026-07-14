/**
 * Banner ad queries. Public reads apply EVERY display condition explicitly
 * (mirrors the RLS policy) so an unapproved/unpaid/expired/paused ad can never
 * leak. Each public banner also requires its linked project to be PUBLIC
 * (present in public_projects_view → status='published').
 */
import "server-only";
import { createServiceClient } from "@/lib/supabase/service";
import { priceRangeLabel, bhkLabel } from "./config";
import type { BannerAd, PublicBanner } from "./types";

type Admin = ReturnType<typeof createServiceClient>;

const today = () => new Date().toISOString().slice(0, 10);

async function attachTargets<T extends { id: string; targets?: { city_slug: string; city_name: string }[] }>(
  admin: Admin,
  rows: T[]
): Promise<T[]> {
  if (!rows.length) return rows;
  const ids = rows.map((r) => r.id);
  const { data } = await admin.from("banner_ad_targets").select("ad_id,city_slug,city_name").in("ad_id", ids);
  const byAd = new Map<string, { city_slug: string; city_name: string }[]>();
  for (const t of (data ?? []) as { ad_id: string; city_slug: string; city_name: string }[]) {
    const list = byAd.get(t.ad_id) ?? [];
    list.push({ city_slug: t.city_slug, city_name: t.city_name });
    byAd.set(t.ad_id, list);
  }
  for (const r of rows) r.targets = byAd.get(r.id) ?? [];
  return rows;
}

interface ProjectCardData {
  title: string; city_text: string | null; slug: string | null; locality_text: string | null; price_min: number | null; price_max: number | null;
}

/** Build per-project card data (price range + BHK from units when present). Only
 *  PUBLIC projects qualify (public_projects_view filters status='published'). */
async function loadProjects(
  admin: Admin,
  projectIds: string[]
): Promise<Map<string, { card: ProjectCardData; priceLabel: string | null; bhk: string | null }>> {
  const out = new Map<string, { card: ProjectCardData; priceLabel: string | null; bhk: string | null }>();
  if (!projectIds.length) return out;
  const { data: projects } = await admin.from("public_projects_view")
    .select("id,title:project_name,slug,city_text,locality_text,price_min,price_max")
    .in("id", projectIds);
  if (!projects?.length) return out;
  const okIds = (projects as { id: string }[]).map((p) => p.id);
  const { data: units } = await admin.from("project_units").select("project_id,bhk,price").in("project_id", okIds);
  const byProject = new Map<string, { bhks: number[]; prices: number[] }>();
  for (const u of (units ?? []) as { project_id: string; bhk: number | null; price: number | null }[]) {
    const e = byProject.get(u.project_id) ?? { bhks: [], prices: [] };
    if (u.bhk) e.bhks.push(u.bhk);
    if (u.price) e.prices.push(u.price);
    byProject.set(u.project_id, e);
  }
  for (const p of projects as (ProjectCardData & { id: string })[]) {
    const u = byProject.get(p.id);
    const prices = u?.prices ?? [];
    const priceLabel = prices.length
      ? priceRangeLabel(Math.min(...prices), Math.max(...prices), p.price_min)
      : priceRangeLabel(p.price_min, p.price_max, p.price_min);
    const bhk = bhkLabel(u?.bhks ?? []);
    out.set(p.id, { card: p, priceLabel, bhk });
  }
  return out;
}

/** Public homepage "Top picks" banners — only displayable ads with a public project. */
export async function getPublicBanners(): Promise<PublicBanner[]> {
  const admin = createServiceClient();
  try {
    const d = today();
    const { data, error } = await admin
      .from("banner_ads")
      .select("id,cta_label,destination_url,desktop_image_url,mobile_image_url,advertiser_name,gujarat_wide,project_id")
      .eq("approval_status", "approved").eq("status", "active").eq("is_paused", false)
      .in("payment_status", ["not_required", "success"])
      .lte("start_date", d).gte("end_date", d)
      .not("project_id", "is", null)
      .limit(12);
    if (error || !data) return [];
    const rows = data as (PublicBanner & { project_id: string })[];
    const projects = await loadProjects(admin, rows.map((r) => r.project_id));
    const withTargets = await attachTargets(admin, rows.map((r) => ({ ...r })) as never[]) as unknown as (PublicBanner & { project_id: string; targets?: { city_name: string }[] })[];
    const result: PublicBanner[] = [];
    for (const r of withTargets) {
      const proj = projects.get(r.project_id);
      if (!proj) continue; // project not public → hide banner
      const dest = proj.card.slug ? `/project/${proj.card.slug}` : `/project/${r.project_id}`;
      result.push({
        id: r.id,
        cta_label: r.cta_label || "Contact",
        destination_url: dest,
        desktop_image_url: r.desktop_image_url,
        mobile_image_url: r.mobile_image_url,
        gujarat_wide: r.gujarat_wide,
        cities: (r.targets ?? []).map((t) => t.city_name),
        advertiser_name: r.advertiser_name,
        project_title: proj.card.title,
        project_city: proj.card.city_text,
        project_locality: proj.card.locality_text,
        price_label: proj.priceLabel,
        bhk_label: proj.bhk,
        city_slug: proj.card.slug,
      });
    }
    return result;
  } catch {
    return [];
  }
}

/** Advertiser's PUBLISHED projects available to advertise. */
export async function getAdvertisableProjects(profileId: string): Promise<{ id: string; title: string; city_name: string | null; city_slug: string | null }[]> {
  const admin = createServiceClient();
  try {
    const { data } = await admin.from("projects")
      .select("id,project_name,city_text,slug")
      .eq("builder_profile_id", profileId).eq("status", "published")
      .order("created_at", { ascending: false }).limit(50);
    return ((data ?? []) as { id: string; project_name: string; city_text: string | null; slug: string | null }[]).map((p) => ({
      id: p.id,
      title: p.project_name,
      city_name: p.city_text,
      city_slug: p.city_text ? p.city_text.toLowerCase().trim().replace(/\s+/g, "-") : null,
    }));
  } catch { return []; }
}

async function attachProjects(admin: Admin, rows: BannerAd[]): Promise<BannerAd[]> {
  const ids = [...new Set(rows.map((r) => r.project_id).filter(Boolean))] as string[];
  if (ids.length) {
    const { data } = await admin.from("projects").select("id,project_name,city_text,status").in("id", ids);
    const byId = new Map(((data ?? []) as { id: string; project_name: string; city_text: string | null; status: string }[]).map((p) => [p.id, { id: p.id, title: p.project_name, city_text: p.city_text, status: p.status }]));
    for (const r of rows) r.project = r.project_id ? byId.get(r.project_id) ?? null : null;
  }
  return rows;
}

/** All of an advertiser's own ads (any status) for the dashboard. */
export async function getMyBanners(profileId: string): Promise<BannerAd[]> {
  const admin = createServiceClient();
  try {
    const { data, error } = await admin.from("banner_ads").select("*")
      .eq("advertiser_profile_id", profileId).order("created_at", { ascending: false }).limit(100);
    if (error || !data) return [];
    return attachProjects(admin, await attachTargets(admin, data as BannerAd[]));
  } catch { return []; }
}

/** A single ad owned by the user (for edit). */
export async function getMyBanner(profileId: string, id: string): Promise<BannerAd | null> {
  const admin = createServiceClient();
  try {
    const { data } = await admin.from("banner_ads").select("*").eq("id", id).eq("advertiser_profile_id", profileId).maybeSingle();
    if (!data) return null;
    const [one] = await attachProjects(admin, await attachTargets(admin, [data as BannerAd]));
    return one;
  } catch { return null; }
}

/** Admin: ads by status bucket. */
export async function getAdminBanners(filter: "pending" | "active" | "rejected" | "all" = "pending"): Promise<BannerAd[]> {
  const admin = createServiceClient();
  try {
    let q = admin.from("banner_ads").select("*").order("created_at", { ascending: false }).limit(100);
    if (filter === "pending") q = q.eq("status", "pending");
    else if (filter === "active") q = q.eq("status", "active");
    else if (filter === "rejected") q = q.eq("status", "rejected");
    const { data, error } = await q;
    if (error || !data) return [];
    return attachProjects(admin, await attachTargets(admin, data as BannerAd[]));
  } catch { return []; }
}

/** Admin dashboard count of pending banner ads. */
export async function countPendingBanners(): Promise<number | null> {
  const admin = createServiceClient();
  try {
    const { count, error } = await admin.from("banner_ads").select("id", { count: "exact", head: true }).eq("status", "pending");
    return error ? null : count ?? 0;
  } catch { return null; }
}
