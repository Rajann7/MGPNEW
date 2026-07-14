"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getCurrentProfile } from "@/lib/auth/session";
import type { ActionResult } from "@/types";
import { TEAM_PERMISSION_KEYS, type TeamPermissions } from "@/lib/team/permissions";

export interface TeamMember {
  id: string;
  builder_profile_id: string;
  member_profile_id: string | null;
  invited_name: string | null;
  invited_email: string | null;
  invited_mobile: string | null;
  title: string | null;
  status: "invited" | "active" | "suspended" | "removed";
  permissions: TeamPermissions;
  invite_token: string | null;
  invited_at: string;
  accepted_at: string | null;
}

function cleanPermissions(input: Partial<TeamPermissions> | undefined): TeamPermissions {
  const out = {} as TeamPermissions;
  for (const k of TEAM_PERMISSION_KEYS) out[k] = Boolean(input?.[k]);
  return out;
}

/** Builder's own team roster (excludes removed). */
export async function listTeamMembers(): Promise<
  ActionResult<{ items: TeamMember[] }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("builder_team_members")
    .select("*")
    .eq("builder_profile_id", profile.id)
    .neq("status", "removed")
    .order("created_at", { ascending: false });

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { items: (data ?? []) as TeamMember[] } };
}

export async function inviteTeamMember(input: {
  name?: string;
  email?: string;
  mobile?: string;
  title?: string;
  permissions?: Partial<TeamPermissions>;
}): Promise<ActionResult<{ id: string; inviteToken: string }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const email = input.email?.trim().toLowerCase() || null;
  const mobile = input.mobile?.trim() || null;
  if (!email && !mobile)
    return { success: false, error: "VALIDATION_ERROR" };

  const admin = createServiceClient();

  // Prevent duplicate active/invited entry for the same email.
  if (email) {
    const { data: dupe } = await admin
      .from("builder_team_members")
      .select("id")
      .eq("builder_profile_id", profile.id)
      .eq("invited_email", email)
      .neq("status", "removed")
      .maybeSingle();
    if (dupe) return { success: false, error: "DUPLICATE" };
  }

  // Best-effort link to an existing registered profile (by email or mobile).
  let memberProfileId: string | null = null;
  if (email || mobile) {
    const q = admin.from("profiles").select("id").limit(1);
    const { data: found } = email
      ? await q.eq("email", email)
      : await q.eq("mobile", mobile);
    if (found && found.length) memberProfileId = found[0].id;
  }

  const inviteToken = randomUUID();
  const { data, error } = await admin
    .from("builder_team_members")
    .insert({
      builder_profile_id: profile.id,
      member_profile_id: memberProfileId,
      invited_name: input.name?.trim().slice(0, 120) || null,
      invited_email: email,
      invited_mobile: mobile,
      title: input.title?.trim().slice(0, 80) || null,
      permissions: cleanPermissions(input.permissions),
      invite_token: inviteToken,
      status: "invited",
    })
    .select("id")
    .single();

  if (error || !data) {
    if (error?.code === "23505") return { success: false, error: "DUPLICATE" };
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  revalidatePath("/dashboard/builder/agents");
  return { success: true, data: { id: data.id, inviteToken } };
}

export interface TeamInvitePreview {
  builderName: string;
  title: string | null;
  permissions: TeamPermissions;
  status: TeamMember["status"];
  alreadyMember: boolean;
}

/** Pre-auth: resolve an invite token to a safe preview (no private data). */
export async function getTeamInviteByToken(
  token: string
): Promise<ActionResult<TeamInvitePreview>> {
  const admin = createServiceClient();
  const { data: invite } = await admin
    .from("builder_team_members")
    .select("id, builder_profile_id, title, permissions, status, member_profile_id")
    .eq("invite_token", token)
    .maybeSingle();
  if (!invite) return { success: false, error: "ENTITY_NOT_FOUND" };

  const { data: builder } = await admin
    .from("profiles")
    .select("display_name, full_name")
    .eq("id", invite.builder_profile_id)
    .maybeSingle();

  return {
    success: true,
    data: {
      builderName: builder?.display_name ?? builder?.full_name ?? "A builder",
      title: invite.title,
      permissions: cleanPermissions(invite.permissions as Partial<TeamPermissions>),
      status: invite.status as TeamMember["status"],
      alreadyMember: Boolean(invite.member_profile_id),
    },
  };
}

/** Signed-in user accepts an invite → links their profile + activates. */
export async function acceptTeamInvite(
  token: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: invite } = await admin
    .from("builder_team_members")
    .select("id, status, member_profile_id")
    .eq("invite_token", token)
    .maybeSingle();
  if (!invite) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (invite.status === "removed")
    return { success: false, error: "INVITE_REVOKED" };
  if (invite.member_profile_id && invite.member_profile_id !== profile.id)
    return { success: false, error: "ALREADY_CLAIMED" };

  const { error } = await admin
    .from("builder_team_members")
    .update({
      member_profile_id: profile.id,
      status: "active",
      accepted_at: new Date().toISOString(),
    })
    .eq("id", invite.id);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  revalidatePath("/dashboard/builder/agents");
  return { success: true, data: null };
}

export async function updateTeamMemberPermissions(
  memberId: string,
  permissions: Partial<TeamPermissions>
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: row } = await admin
    .from("builder_team_members")
    .select("id, builder_profile_id")
    .eq("id", memberId)
    .maybeSingle();
  if (!row) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (row.builder_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };

  const { error } = await admin
    .from("builder_team_members")
    .update({ permissions: cleanPermissions(permissions) })
    .eq("id", memberId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  revalidatePath("/dashboard/builder/agents");
  return { success: true, data: null };
}

export async function setTeamMemberStatus(
  memberId: string,
  status: "active" | "suspended" | "removed"
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: row } = await admin
    .from("builder_team_members")
    .select("id, builder_profile_id, member_profile_id")
    .eq("id", memberId)
    .maybeSingle();
  if (!row) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (row.builder_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  // Activating requires a linked member profile (someone who accepted).
  if (status === "active" && !row.member_profile_id)
    return { success: false, error: "NOT_ACCEPTED" };

  const { error } = await admin
    .from("builder_team_members")
    .update({ status })
    .eq("id", memberId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  revalidatePath("/dashboard/builder/agents");
  return { success: true, data: null };
}
