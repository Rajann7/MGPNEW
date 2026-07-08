"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import type { ActionResult, AppNotification } from "@/types";

export async function listNotifications(
  limit = 20
): Promise<ActionResult<{ items: AppNotification[]; unreadCount: number }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const [{ data, error }, { count }] = await Promise.all([
    supabase
      .from("notifications")
      .select("*")
      .eq("recipient_profile_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("recipient_profile_id", profile.id)
      .is("read_at", null),
  ]);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return {
    success: true,
    data: { items: (data ?? []) as AppNotification[], unreadCount: count ?? 0 },
  };
}

export async function markNotificationRead(
  id: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", id)
    .eq("recipient_profile_id", profile.id);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

export async function markAllNotificationsRead(): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_profile_id", profile.id)
    .is("read_at", null);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

export async function getUnreadNotificationCount(): Promise<
  ActionResult<{ count: number }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: true, data: { count: 0 } };

  const supabase = await createClient();
  const { count } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("recipient_profile_id", profile.id)
    .is("read_at", null);

  return { success: true, data: { count: count ?? 0 } };
}
