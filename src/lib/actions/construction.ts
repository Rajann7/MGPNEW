"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getCurrentProfile } from "@/lib/auth/session";
import type { ActionResult } from "@/types";
import {
  CONSTRUCTION_STAGES,
  type ConstructionStage,
} from "@/lib/projects/construction";

export interface ConstructionUpdate {
  id: string;
  project_id: string;
  stage: ConstructionStage;
  progress_percent: number | null;
  title: string;
  note: string | null;
  update_date: string;
  created_at: string;
}

async function assertProjectOwner(projectId: string, profileId: string) {
  const admin = createServiceClient();
  const { data } = await admin
    .from("projects")
    .select("id, builder_profile_id")
    .eq("id", projectId)
    .maybeSingle();
  return Boolean(data && data.builder_profile_id === profileId);
}

/** Builder-owned timeline read (RLS also allows public read for published projects). */
export async function listConstructionUpdates(
  projectId: string
): Promise<ActionResult<{ items: ConstructionUpdate[] }>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_construction_updates")
    .select("id, project_id, stage, progress_percent, title, note, update_date, created_at")
    .eq("project_id", projectId)
    .order("update_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { items: (data ?? []) as ConstructionUpdate[] } };
}

export async function addConstructionUpdate(
  projectId: string,
  input: {
    stage: string;
    progressPercent?: number | null;
    title: string;
    note?: string;
    updateDate?: string;
  }
): Promise<ActionResult<{ id: string }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (!(await assertProjectOwner(projectId, profile.id)))
    return { success: false, error: "FORBIDDEN" };

  const stage = input.stage as ConstructionStage;
  if (!CONSTRUCTION_STAGES.some((s) => s.value === stage))
    return { success: false, error: "VALIDATION_ERROR" };

  const title = input.title?.trim();
  if (!title || title.length > 160)
    return { success: false, error: "VALIDATION_ERROR" };

  let progress = input.progressPercent;
  if (progress != null) {
    progress = Math.round(progress);
    if (progress < 0 || progress > 100)
      return { success: false, error: "VALIDATION_ERROR" };
  }

  const admin = createServiceClient();
  const { data, error } = await admin
    .from("project_construction_updates")
    .insert({
      project_id: projectId,
      stage,
      progress_percent: progress ?? null,
      title,
      note: input.note?.trim().slice(0, 1000) || null,
      update_date: input.updateDate || new Date().toISOString().slice(0, 10),
      created_by: profile.id,
    })
    .select("id")
    .single();

  if (error || !data) return { success: false, error: "UNKNOWN_ERROR" };

  // Keep the project's headline construction_status in sync with the latest stage.
  await admin
    .from("projects")
    .update({ construction_status: stage })
    .eq("id", projectId);

  revalidatePath(`/dashboard/builder/projects/${projectId}/construction`);
  return { success: true, data: { id: data.id } };
}

export async function deleteConstructionUpdate(
  updateId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: row } = await admin
    .from("project_construction_updates")
    .select("id, project_id")
    .eq("id", updateId)
    .maybeSingle();
  if (!row) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (!(await assertProjectOwner(row.project_id, profile.id)))
    return { success: false, error: "FORBIDDEN" };

  const { error } = await admin
    .from("project_construction_updates")
    .delete()
    .eq("id", updateId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  revalidatePath(`/dashboard/builder/projects/${row.project_id}/construction`);
  return { success: true, data: null };
}
