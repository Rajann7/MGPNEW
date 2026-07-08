"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { requireStaffPermission } from "@/lib/auth/session";
// "use server" files may only export async functions — stage filter values
// live in @/lib/leads/inquiry-config (CRM_STAGE_FILTERS).
import { CRM_STAGE_FILTERS } from "@/lib/leads/inquiry-config";
import type { ActionResult, Lead, LeadTargetType, CrmStage } from "@/types";

const TARGET_TABLE: Record<LeadTargetType, string> = {
  property: "properties",
  project: "projects",
  requirement: "requirements",
};

const TARGET_TITLE_COL: Record<LeadTargetType, string> = {
  property: "title",
  project: "project_name",
  requirement: "title",
};

export interface AdminLeadRow {
  id: string;
  target_type: LeadTargetType;
  target_title: string;
  target_city: string | null;
  requester_name: string;
  receiver_name: string;
  source: string;
  status: string;
  crm_stage: CrmStage;
  interest_type: string | null;
  created_at: string;
}

// ============================================================
// getAdminLeads — all platform inquiries, stage-filterable,
// bounded reads, staff permission-gated ("leads" module)
// ============================================================

export async function getAdminLeads(
  stage?: string,
  page = 1,
  limit = 30
): Promise<ActionResult<{ items: AdminLeadRow[]; total: number }>> {
  await requireStaffPermission("leads", "can_read");

  const admin = createServiceClient();
  const offset = (page - 1) * limit;

  let query = admin
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (stage && CRM_STAGE_FILTERS.includes(stage)) {
    query = query.eq("crm_stage", stage);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error("[getAdminLeads] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  const leads = (data ?? []) as Lead[];

  // Batch-load target titles/cities per target type (no N+1).
  const idsByType: Record<LeadTargetType, string[]> = {
    property: [],
    project: [],
    requirement: [],
  };
  for (const lead of leads) idsByType[lead.target_type].push(lead.target_id);

  const targetById = new Map<string, { title: string; city: string | null }>();
  await Promise.all(
    (Object.keys(idsByType) as LeadTargetType[]).map(async (type) => {
      const ids = Array.from(new Set(idsByType[type]));
      if (ids.length === 0) return;
      const titleCol = TARGET_TITLE_COL[type];
      const { data: rows } = await admin
        .from(TARGET_TABLE[type])
        .select(`id, ${titleCol}, city_text`)
        .in("id", ids);
      for (const row of (rows ?? []) as unknown as Record<string, unknown>[]) {
        targetById.set(row.id as string, {
          title: (row[titleCol] as string) ?? "Untitled",
          city: (row.city_text as string) ?? null,
        });
      }
    })
  );

  // Batch-load participant names.
  const profileIds = Array.from(
    new Set(
      leads.flatMap((lead) => [
        lead.requester_profile_id,
        lead.receiver_profile_id,
      ])
    )
  );
  const nameById = new Map<string, string>();
  if (profileIds.length > 0) {
    const { data: profiles } = await admin
      .from("profiles")
      .select("id, display_name, full_name")
      .in("id", profileIds);
    for (const p of profiles ?? []) {
      nameById.set(p.id, p.display_name ?? p.full_name ?? "User");
    }
  }

  const items: AdminLeadRow[] = leads.map((lead) => {
    const target = targetById.get(lead.target_id);
    return {
      id: lead.id,
      target_type: lead.target_type,
      target_title: target?.title ?? "Listing unavailable",
      target_city: target?.city ?? null,
      requester_name: nameById.get(lead.requester_profile_id) ?? "User",
      receiver_name: nameById.get(lead.receiver_profile_id) ?? "User",
      source: lead.source,
      status: lead.status,
      crm_stage: lead.crm_stage,
      interest_type: lead.interest_type ?? null,
      created_at: lead.created_at,
    };
  });

  return { success: true, data: { items, total: count ?? 0 } };
}
