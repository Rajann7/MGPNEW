import "server-only";
import { createServiceClient } from "@/lib/supabase/service";
import { listMySiteVisits } from "@/lib/actions/site-visits";
import type { SiteVisitRow } from "@/components/dashboard/SiteVisitsClient";

/**
 * Loads the current user's site visits (RLS: rows where they are requester OR
 * host) and enriches each with the REAL property/project title + counterpart
 * display name — no fabricated fields. Shared by the Owner, Broker and Builder
 * Site Visits screens (B6-S08 / B7-S13 / B8-S11), which are identical lists
 * differing only in their role shell.
 */
export async function buildSiteVisitRows(
  profileId: string
): Promise<{ ok: boolean; rows: SiteVisitRow[] }> {
  const res = await listMySiteVisits();
  if (!res.success) return { ok: false, rows: [] };
  const visits = res.data.items;
  if (visits.length === 0) return { ok: true, rows: [] };

  const admin = createServiceClient();
  const propertyIds = [
    ...new Set(visits.map((v) => v.property_id).filter(Boolean)),
  ] as string[];
  const projectIds = [
    ...new Set(visits.map((v) => v.project_id).filter(Boolean)),
  ] as string[];
  const counterpartIds = [
    ...new Set(
      visits.map((v) =>
        v.requester_profile_id === profileId
          ? v.host_profile_id
          : v.requester_profile_id
      )
    ),
  ];

  const [props, projs, people] = await Promise.all([
    propertyIds.length
      ? admin.from("properties").select("id, title, slug").in("id", propertyIds)
      : Promise.resolve({ data: [] }),
    projectIds.length
      ? admin.from("projects").select("id, project_name, slug").in("id", projectIds)
      : Promise.resolve({ data: [] }),
    counterpartIds.length
      ? admin
          .from("profiles")
          .select("id, display_name, full_name")
          .in("id", counterpartIds)
      : Promise.resolve({ data: [] }),
  ]);

  const propMap = new Map(
    (props.data ?? []).map(
      (p: { id: string; title: string; slug: string | null }) => [p.id, p]
    )
  );
  const projMap = new Map(
    (projs.data ?? []).map(
      (p: { id: string; project_name: string; slug: string | null }) => [p.id, p]
    )
  );
  const peopleMap = new Map(
    (people.data ?? []).map(
      (p: { id: string; display_name: string | null; full_name: string | null }) => [
        p.id,
        p.display_name ?? p.full_name ?? null,
      ]
    )
  );

  const rows: SiteVisitRow[] = visits.map((v) => {
    const prop = v.property_id ? propMap.get(v.property_id) : null;
    const proj = v.project_id ? projMap.get(v.project_id) : null;
    const counterpartId =
      v.requester_profile_id === profileId
        ? v.host_profile_id
        : v.requester_profile_id;
    return {
      ...v,
      entityTitle: prop?.title ?? proj?.project_name ?? null,
      entityHref: prop?.slug
        ? `/property/${prop.slug}`
        : proj?.slug
          ? `/project/${proj.slug}`
          : null,
      counterpartName: peopleMap.get(counterpartId) ?? null,
      isHost: v.host_profile_id === profileId,
    };
  });

  return { ok: true, rows };
}
