"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getCurrentProfile } from "@/lib/auth/session";
import { isThreadParticipant } from "@/lib/permissions/communication-permissions";
import { createNotification } from "@/lib/notifications/create";
import type { ActionResult, Lead, MessageThread, Message } from "@/types";

async function getProfileSafeName(profileId: string): Promise<string> {
  const admin = createServiceClient();
  const { data } = await admin
    .from("profiles")
    .select("display_name, full_name")
    .eq("id", profileId)
    .maybeSingle();
  return data?.display_name ?? data?.full_name ?? "User";
}

// ============================================================
// createOrGetThreadForLead — idempotent, participants derived from lead
// ============================================================

export async function createOrGetThreadForLead(
  leadId: string
): Promise<ActionResult<{ threadId: string }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: lead } = await admin
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();
  if (!lead) return { success: false, error: "LEAD_NOT_FOUND" };

  const l = lead as Lead;
  if (
    l.requester_profile_id !== profile.id &&
    l.receiver_profile_id !== profile.id
  ) {
    return { success: false, error: "NOT_PARTICIPANT" };
  }

  const { data: existing } = await admin
    .from("message_threads")
    .select("id")
    .eq("lead_id", leadId)
    .maybeSingle();
  if (existing) return { success: true, data: { threadId: existing.id } };

  const { data: thread, error } = await admin
    .from("message_threads")
    .insert({
      thread_type: "lead",
      lead_id: leadId,
      participant_a_profile_id: l.requester_profile_id,
      participant_b_profile_id: l.receiver_profile_id,
    })
    .select("id")
    .single();

  if (error || !thread) {
    if (error?.code === "23505") {
      const { data: race } = await admin
        .from("message_threads")
        .select("id")
        .eq("lead_id", leadId)
        .single();
      if (race) return { success: true, data: { threadId: race.id } };
    }
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: { threadId: thread.id } };
}

// ============================================================
// sendMessage
// ============================================================

export async function sendMessage(
  threadId: string,
  body: string
): Promise<ActionResult<{ messageId: string }>> {
  if (!body || body.trim().length < 1)
    return { success: false, error: "VALIDATION_ERROR" };
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: thread } = await admin
    .from("message_threads")
    .select("*")
    .eq("id", threadId)
    .maybeSingle();
  if (!thread) return { success: false, error: "THREAD_NOT_FOUND" };
  if (!isThreadParticipant(profile, thread as MessageThread))
    return { success: false, error: "NOT_PARTICIPANT" };
  if ((thread as MessageThread).is_blocked)
    return { success: false, error: "FORBIDDEN" };

  const sanitized = body.trim().slice(0, 4000);

  const { data: message, error } = await admin
    .from("messages")
    .insert({
      thread_id: threadId,
      sender_profile_id: profile.id,
      body: sanitized,
      status: "sent",
    })
    .select("id")
    .single();

  if (error || !message) return { success: false, error: "UNKNOWN_ERROR" };

  const now = new Date().toISOString();
  const isParticipantA =
    (thread as MessageThread).participant_a_profile_id === profile.id;
  await admin
    .from("message_threads")
    .update({
      last_message_at: now,
      ...(isParticipantA
        ? { participant_a_last_read_at: now }
        : { participant_b_last_read_at: now }),
    })
    .eq("id", threadId);

  const recipientId = isParticipantA
    ? (thread as MessageThread).participant_b_profile_id
    : (thread as MessageThread).participant_a_profile_id;

  await createNotification({
    recipientProfileId: recipientId,
    type: "new_message",
    title: "New message",
    body: `${profile.display_name ?? profile.full_name} sent you a message.`,
    targetType: "message_thread",
    targetId: threadId,
  });

  return { success: true, data: { messageId: message.id } };
}

// ============================================================
// markThreadRead
// ============================================================

export async function markThreadRead(
  threadId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: thread } = await admin
    .from("message_threads")
    .select("*")
    .eq("id", threadId)
    .maybeSingle();
  if (!thread) return { success: false, error: "THREAD_NOT_FOUND" };
  if (!isThreadParticipant(profile, thread as MessageThread))
    return { success: false, error: "NOT_PARTICIPANT" };

  const isParticipantA =
    (thread as MessageThread).participant_a_profile_id === profile.id;
  const { error } = await admin
    .from("message_threads")
    .update(
      isParticipantA
        ? { participant_a_last_read_at: new Date().toISOString() }
        : { participant_b_last_read_at: new Date().toISOString() }
    )
    .eq("id", threadId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

// ============================================================
// listThreads — with counterpart name + real unread count.
// Supports All/Unread/Archived filtering and search (client
// receives all matching rows; filtering by counterpart name/
// preview text happens here since neither is a plain column).
// ============================================================

export interface ThreadRow extends MessageThread {
  counterpartName: string;
  unreadCount: number;
  lastMessagePreview: string | null;
  isArchivedByMe: boolean;
}

export async function listThreads(
  filter: "all" | "unread" | "archived" = "all",
  search?: string,
  page = 1,
  limit = 20
): Promise<ActionResult<{ items: ThreadRow[]; total: number }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("message_threads")
    .select("*")
    .or(
      `participant_a_profile_id.eq.${profile.id},participant_b_profile_id.eq.${profile.id}`
    )
    .order("last_message_at", { ascending: false, nullsFirst: false });

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  const admin = createServiceClient();
  let items: ThreadRow[] = await Promise.all(
    (data as MessageThread[]).map(async (thread) => {
      const isParticipantA = thread.participant_a_profile_id === profile.id;
      const counterpartId = isParticipantA
        ? thread.participant_b_profile_id
        : thread.participant_a_profile_id;
      const myLastRead = isParticipantA
        ? thread.participant_a_last_read_at
        : thread.participant_b_last_read_at;
      const isArchivedByMe = isParticipantA
        ? thread.participant_a_archived
        : thread.participant_b_archived;

      let unreadQuery = admin
        .from("messages")
        .select("id", { count: "exact", head: true })
        .eq("thread_id", thread.id)
        .neq("sender_profile_id", profile.id);
      if (myLastRead) unreadQuery = unreadQuery.gt("created_at", myLastRead);
      const { count: unreadCount } = await unreadQuery;

      const { data: lastMsg } = await admin
        .from("messages")
        .select("body")
        .eq("thread_id", thread.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      return {
        ...thread,
        counterpartName: await getProfileSafeName(counterpartId),
        unreadCount: unreadCount ?? 0,
        lastMessagePreview: lastMsg?.body?.slice(0, 100) ?? null,
        isArchivedByMe: isArchivedByMe ?? false,
      };
    })
  );

  if (filter === "unread") items = items.filter((t) => t.unreadCount > 0 && !t.isArchivedByMe);
  else if (filter === "archived") items = items.filter((t) => t.isArchivedByMe);
  else items = items.filter((t) => !t.isArchivedByMe);

  if (search && search.trim().length > 0) {
    const q = search.trim().toLowerCase();
    items = items.filter(
      (t) =>
        t.counterpartName.toLowerCase().includes(q) ||
        (t.lastMessagePreview ?? "").toLowerCase().includes(q)
    );
  }

  const total = items.length;
  const offset = (page - 1) * limit;
  const paged = items.slice(offset, offset + limit);

  return { success: true, data: { items: paged, total } };
}

// ============================================================
// archiveThread / unarchiveThread — per-participant, own side only
// ============================================================

export async function archiveThread(
  threadId: string,
  archived: boolean
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: thread } = await admin
    .from("message_threads")
    .select("*")
    .eq("id", threadId)
    .maybeSingle();
  if (!thread) return { success: false, error: "THREAD_NOT_FOUND" };
  if (!isThreadParticipant(profile, thread as MessageThread))
    return { success: false, error: "NOT_PARTICIPANT" };

  const isParticipantA =
    (thread as MessageThread).participant_a_profile_id === profile.id;
  const { error } = await admin
    .from("message_threads")
    .update(
      isParticipantA
        ? { participant_a_archived: archived }
        : { participant_b_archived: archived }
    )
    .eq("id", threadId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

// ============================================================
// listMessages
// ============================================================

export async function listMessages(
  threadId: string,
  page = 1,
  limit = 50
): Promise<ActionResult<{ items: Message[]; total: number }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: thread } = await supabase
    .from("message_threads")
    .select("*")
    .eq("id", threadId)
    .maybeSingle();
  if (!thread) return { success: false, error: "THREAD_NOT_FOUND" };
  if (!isThreadParticipant(profile, thread as MessageThread))
    return { success: false, error: "NOT_PARTICIPANT" };

  const offset = (page - 1) * limit;
  const { data, error, count } = await supabase
    .from("messages")
    .select("*", { count: "exact" })
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true })
    .range(offset, offset + limit - 1);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return {
    success: true,
    data: { items: (data ?? []) as Message[], total: count ?? 0 },
  };
}

// ============================================================
// reportThread — participant-only, reuses user_reports
// (target_type='thread'). Rate-limited to one open report per
// reporter per thread — matches the property/project report
// duplicate-guard pattern elsewhere in the app.
// ============================================================

const REPORT_CATEGORIES = [
  "spam",
  "fraud",
  "abuse",
  "harassment",
  "contact_abuse",
  "other",
] as const;

export async function reportThread(
  threadId: string,
  category: string,
  description?: string
): Promise<ActionResult<null>> {
  if (!(REPORT_CATEGORIES as readonly string[]).includes(category))
    return { success: false, error: "VALIDATION_ERROR" };
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: thread } = await admin
    .from("message_threads")
    .select("*")
    .eq("id", threadId)
    .maybeSingle();
  if (!thread) return { success: false, error: "THREAD_NOT_FOUND" };
  if (!isThreadParticipant(profile, thread as MessageThread))
    return { success: false, error: "NOT_PARTICIPANT" };

  const { data: existing } = await admin
    .from("user_reports")
    .select("id")
    .eq("reporter_profile_id", profile.id)
    .eq("target_type", "thread")
    .eq("target_id", threadId)
    .eq("status", "pending")
    .maybeSingle();
  if (existing) return { success: false, error: "ALREADY_REPORTED" };

  const { error } = await admin.from("user_reports").insert({
    reporter_profile_id: profile.id,
    target_type: "thread",
    target_id: threadId,
    category,
    description: description?.trim().slice(0, 1000) || null,
  });
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  return { success: true, data: null };
}

export async function getThreadReportStatus(
  threadId: string
): Promise<ActionResult<{ reported: boolean }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data } = await admin
    .from("user_reports")
    .select("id")
    .eq("reporter_profile_id", profile.id)
    .eq("target_type", "thread")
    .eq("target_id", threadId)
    .eq("status", "pending")
    .maybeSingle();

  return { success: true, data: { reported: !!data } };
}

// ============================================================
// getTotalUnreadCount — for topbar notification/message badge
// ============================================================

export async function getTotalUnreadMessageCount(): Promise<
  ActionResult<{ count: number }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: threads } = await admin
    .from("message_threads")
    .select(
      "id, participant_a_profile_id, participant_a_last_read_at, participant_b_last_read_at"
    )
    .or(
      `participant_a_profile_id.eq.${profile.id},participant_b_profile_id.eq.${profile.id}`
    );

  if (!threads || threads.length === 0)
    return { success: true, data: { count: 0 } };

  const threadIds = threads.map((t) => t.id);
  const { data: unreadMessages } = await admin
    .from("messages")
    .select("thread_id, created_at")
    .in("thread_id", threadIds)
    .neq("sender_profile_id", profile.id);

  const lastReadByThread = new Map<string, string | null>();
  for (const thread of threads) {
    const isParticipantA = thread.participant_a_profile_id === profile.id;
    lastReadByThread.set(
      thread.id,
      isParticipantA
        ? thread.participant_a_last_read_at
        : thread.participant_b_last_read_at
    );
  }

  let total = 0;
  for (const msg of unreadMessages ?? []) {
    const myLastRead = lastReadByThread.get(msg.thread_id);
    if (!myLastRead || msg.created_at > myLastRead) total += 1;
  }

  return { success: true, data: { count: total } };
}
