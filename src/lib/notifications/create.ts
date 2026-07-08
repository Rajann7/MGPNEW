import "server-only";
import { createServiceClient } from "@/lib/supabase/service";
import type { NotificationType } from "@/types";

/**
 * Shared notification-event writer. Every lead/message/proposal/site-visit
 * action that should notify a participant calls this — never insert into
 * `notifications` directly, so "no fake notification" stays enforced in one
 * place. Real DB-backed event only; external provider delivery is a later
 * phase (SETUP_REQUIRED), this never claims an email/SMS/WhatsApp was sent.
 */
export async function createNotification(params: {
  recipientProfileId: string;
  type: NotificationType;
  title: string;
  body?: string;
  targetType?: string;
  targetId?: string;
}): Promise<void> {
  try {
    const admin = createServiceClient();
    await admin.from("notifications").insert({
      recipient_profile_id: params.recipientProfileId,
      notification_type: params.type,
      title: params.title,
      body: params.body ?? null,
      target_type: params.targetType ?? null,
      target_id: params.targetId ?? null,
    });
  } catch (err) {
    console.error("[createNotification] failed:", err);
  }
}
