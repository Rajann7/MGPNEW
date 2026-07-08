import "server-only";
import { createServiceClient } from "@/lib/supabase/service";
import type { CrmEventEntityType } from "@/types";

/** Shared CRM timeline writer for leads/proposals/site visits. Real events only. */
export async function logCrmEvent(params: {
  entityType: CrmEventEntityType;
  entityId: string;
  eventType: string;
  actorProfileId?: string | null;
  metadataSafe?: Record<string, unknown> | null;
}): Promise<void> {
  try {
    const admin = createServiceClient();
    await admin.from("crm_events").insert({
      entity_type: params.entityType,
      entity_id: params.entityId,
      event_type: params.eventType,
      actor_profile_id: params.actorProfileId ?? null,
      metadata_safe: params.metadataSafe ?? null,
    });
  } catch (err) {
    console.error("[logCrmEvent] failed:", err);
  }
}
