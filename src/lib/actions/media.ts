"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import type { ActionResult } from "@/types";
import { z } from "zod";

// ============================================================
// Design Batch 5 — real Supabase-Storage-backed media (user-approved
// deviation from CLAUDE.md's default Cloudflare R2 — R2 isn't connected
// yet, Supabase Storage is live). Client uploads the file bytes directly
// to Storage (respecting storage.objects RLS: folder scoped to the
// uploader's own auth uid); these actions only ever register/manage the
// `media` row, and always re-verify real listing ownership server-side
// before touching it — the storage path is never trusted alone.
// ============================================================

export type MediaOwnerType = "property" | "project" | "project_unit";
export type MediaKind = "image" | "video" | "pdf";

export interface MediaItem {
  id: string;
  owner_type: MediaOwnerType;
  owner_id: string;
  kind: MediaKind;
  bucket: "media-public" | "media-private";
  storage_path: string;
  mime_type: string;
  file_size_bytes: number;
  sort_order: number;
  is_cover: boolean;
  created_at: string;
}

const ALLOWED_IMAGE_MIME = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_VIDEO_MIME = ["video/mp4"];
const ALLOWED_PDF_MIME = ["application/pdf"];
// Public photos/video: 10MB (Batch 5 §95). Private brochure PDFs: 25MB.
const MAX_PUBLIC_BYTES = 10 * 1024 * 1024;
const MAX_PRIVATE_BYTES = 25 * 1024 * 1024;
const MAX_BYTES = MAX_PRIVATE_BYTES;

async function requireEntityOwnership(
  ownerType: MediaOwnerType,
  ownerId: string
): Promise<
  | { error: "AUTH_REQUIRED" | "ENTITY_NOT_FOUND" | "FORBIDDEN" }
  | { profileId: string; supabase: Awaited<ReturnType<typeof createClient>> }
> {
  const profile = await getCurrentProfile();
  if (!profile) return { error: "AUTH_REQUIRED" };
  const supabase = await createClient();

  if (ownerType === "property") {
    const { data } = await supabase
      .from("properties")
      .select("id, owner_profile_id, deleted_at")
      .eq("id", ownerId)
      .maybeSingle();
    if (!data || data.deleted_at) return { error: "ENTITY_NOT_FOUND" };
    if (data.owner_profile_id !== profile.id) return { error: "FORBIDDEN" };
  } else if (ownerType === "project") {
    const { data } = await supabase
      .from("projects")
      .select("id, builder_profile_id, deleted_at")
      .eq("id", ownerId)
      .maybeSingle();
    if (!data || data.deleted_at) return { error: "ENTITY_NOT_FOUND" };
    if (data.builder_profile_id !== profile.id) return { error: "FORBIDDEN" };
  } else {
    const { data } = await supabase
      .from("project_units")
      .select("id, project_id")
      .eq("id", ownerId)
      .maybeSingle();
    if (!data) return { error: "ENTITY_NOT_FOUND" };
    const { data: project } = await supabase
      .from("projects")
      .select("builder_profile_id")
      .eq("id", data.project_id)
      .maybeSingle();
    if (!project || project.builder_profile_id !== profile.id)
      return { error: "FORBIDDEN" };
  }

  return { profileId: profile.id, supabase };
}

/**
 * Build the storage path the client must upload to: folder-scoped to the
 * caller's own auth uid so storage.objects RLS grants the write, keyed by
 * entity so files group together. Called before the client uploads.
 */
export async function getMediaUploadTarget(
  ownerType: MediaOwnerType,
  ownerId: string,
  filename: string,
  mimeType: string
): Promise<
  ActionResult<{ bucket: string; path: string; authUid: string }>
> {
  const ctx = await requireEntityOwnership(ownerType, ownerId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  const isPdf = ALLOWED_PDF_MIME.includes(mimeType);
  const isImage = ALLOWED_IMAGE_MIME.includes(mimeType);
  const isVideo = ALLOWED_VIDEO_MIME.includes(mimeType);
  if (!isPdf && !isImage && !isVideo) {
    return { success: false, error: "UNSUPPORTED_FILE_TYPE" };
  }

  const {
    data: { user },
  } = await ctx.supabase.auth.getUser();
  if (!user) return { success: false, error: "AUTH_REQUIRED" };

  const bucket = isPdf ? "media-private" : "media-public";
  const safeName = filename
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(-100);
  const path = `${user.id}/${ownerType}/${ownerId}/${crypto.randomUUID()}-${safeName}`;

  return { success: true, data: { bucket, path, authUid: user.id } };
}

const RegisterMediaSchema = z.object({
  ownerType: z.enum(["property", "project", "project_unit"]),
  ownerId: z.string().uuid(),
  bucket: z.enum(["media-public", "media-private"]),
  storagePath: z.string().min(1).max(500),
  mimeType: z.string().min(1).max(100),
  fileSizeBytes: z.number().int().positive().max(MAX_BYTES),
  isCover: z.boolean().optional(),
});

/** Registers an already-uploaded file (client uploaded bytes to Storage first). */
export async function registerMedia(
  input: unknown
): Promise<ActionResult<MediaItem>> {
  const parsed = RegisterMediaSchema.safeParse(input);
  if (!parsed.success)
    return { success: false, error: "VALIDATION_ERROR" };
  const {
    ownerType,
    ownerId,
    bucket,
    storagePath,
    mimeType,
    fileSizeBytes,
    isCover,
  } = parsed.data;

  const ctx = await requireEntityOwnership(ownerType, ownerId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  // Defense in depth: the path's first segment must be the caller's own
  // auth uid — matches what getMediaUploadTarget issued.
  const {
    data: { user },
  } = await ctx.supabase.auth.getUser();
  if (!user || !storagePath.startsWith(`${user.id}/`)) {
    return { success: false, error: "FORBIDDEN" };
  }
  if (bucket === "media-private" && mimeType !== "application/pdf") {
    return { success: false, error: "VALIDATION_ERROR" };
  }
  if (
    bucket === "media-public" &&
    !ALLOWED_IMAGE_MIME.includes(mimeType) &&
    !ALLOWED_VIDEO_MIME.includes(mimeType)
  ) {
    return { success: false, error: "VALIDATION_ERROR" };
  }
  const sizeCap = bucket === "media-public" ? MAX_PUBLIC_BYTES : MAX_PRIVATE_BYTES;
  if (fileSizeBytes > sizeCap) {
    return {
      success: false,
      error: "FILE_TOO_LARGE",
      meta: { maxBytes: sizeCap },
    };
  }

  const kind: MediaKind = mimeType === "application/pdf"
    ? "pdf"
    : ALLOWED_VIDEO_MIME.includes(mimeType)
      ? "video"
      : "image";

  const { count } = await ctx.supabase
    .from("media")
    .select("id", { count: "exact", head: true })
    .eq("owner_type", ownerType)
    .eq("owner_id", ownerId);

  const { data, error } = await ctx.supabase
    .from("media")
    .insert({
      owner_type: ownerType,
      owner_id: ownerId,
      uploader_profile_id: ctx.profileId,
      kind,
      bucket,
      storage_path: storagePath,
      mime_type: mimeType,
      file_size_bytes: fileSizeBytes,
      sort_order: count ?? 0,
      is_cover: !!isCover,
    })
    .select("*")
    .single();

  if (error) {
    console.error("[registerMedia] DB error:", error.code);
    // Best-effort cleanup of the orphaned storage object.
    await ctx.supabase.storage.from(bucket).remove([storagePath]);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  if (isCover && ownerType !== "project_unit") {
    await ctx.supabase
      .from("media")
      .update({ is_cover: false })
      .eq("owner_type", ownerType)
      .eq("owner_id", ownerId)
      .neq("id", data.id);
    const table = ownerType === "property" ? "properties" : "projects";
    await ctx.supabase
      .from(table)
      .update({ cover_media_id: data.id })
      .eq("id", ownerId);
  }

  await syncMediaCount(ctx.supabase, ownerType, ownerId);

  return { success: true, data: data as MediaItem };
}

export async function listMedia(
  ownerType: MediaOwnerType,
  ownerId: string
): Promise<ActionResult<MediaItem[]>> {
  const ctx = await requireEntityOwnership(ownerType, ownerId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  const { data, error } = await ctx.supabase
    .from("media")
    .select("*")
    .eq("owner_type", ownerType)
    .eq("owner_id", ownerId)
    .order("sort_order");

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: (data ?? []) as MediaItem[] };
}

export async function deleteMedia(
  ownerType: MediaOwnerType,
  ownerId: string,
  mediaId: string
): Promise<ActionResult<null>> {
  const ctx = await requireEntityOwnership(ownerType, ownerId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  const { data: row } = await ctx.supabase
    .from("media")
    .select("bucket, storage_path")
    .eq("id", mediaId)
    .eq("owner_type", ownerType)
    .eq("owner_id", ownerId)
    .maybeSingle();
  if (!row) return { success: false, error: "ENTITY_NOT_FOUND" };

  await ctx.supabase.storage.from(row.bucket).remove([row.storage_path]);
  const { error } = await ctx.supabase
    .from("media")
    .delete()
    .eq("id", mediaId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await syncMediaCount(ctx.supabase, ownerType, ownerId);
  return { success: true, data: null };
}

export async function reorderMedia(
  ownerType: MediaOwnerType,
  ownerId: string,
  orderedIds: string[]
): Promise<ActionResult<null>> {
  const ctx = await requireEntityOwnership(ownerType, ownerId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  for (let i = 0; i < orderedIds.length; i++) {
    await ctx.supabase
      .from("media")
      .update({ sort_order: i })
      .eq("id", orderedIds[i])
      .eq("owner_type", ownerType)
      .eq("owner_id", ownerId);
  }
  return { success: true, data: null };
}

export async function setCoverMedia(
  ownerType: "property" | "project",
  ownerId: string,
  mediaId: string
): Promise<ActionResult<null>> {
  const ctx = await requireEntityOwnership(ownerType, ownerId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  await ctx.supabase
    .from("media")
    .update({ is_cover: false })
    .eq("owner_type", ownerType)
    .eq("owner_id", ownerId);
  const { error } = await ctx.supabase
    .from("media")
    .update({ is_cover: true })
    .eq("id", mediaId)
    .eq("owner_type", ownerType)
    .eq("owner_id", ownerId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  const table = ownerType === "property" ? "properties" : "projects";
  await ctx.supabase
    .from(table)
    .update({ cover_media_id: mediaId })
    .eq("id", ownerId);

  return { success: true, data: null };
}

/** Returns a short-lived signed URL for a private-bucket file (brochure PDF). */
export async function getSignedMediaUrl(
  ownerType: MediaOwnerType,
  ownerId: string,
  mediaId: string
): Promise<ActionResult<{ url: string }>> {
  const ctx = await requireEntityOwnership(ownerType, ownerId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  const { data: row } = await ctx.supabase
    .from("media")
    .select("bucket, storage_path")
    .eq("id", mediaId)
    .eq("owner_type", ownerType)
    .eq("owner_id", ownerId)
    .maybeSingle();
  if (!row) return { success: false, error: "ENTITY_NOT_FOUND" };

  const { data, error } = await ctx.supabase.storage
    .from(row.bucket)
    .createSignedUrl(row.storage_path, 300);
  if (error || !data) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { url: data.signedUrl } };
}

async function syncMediaCount(
  supabase: Awaited<ReturnType<typeof createClient>>,
  ownerType: MediaOwnerType,
  ownerId: string
) {
  if (ownerType === "project_unit") return;
  const { count } = await supabase
    .from("media")
    .select("id", { count: "exact", head: true })
    .eq("owner_type", ownerType)
    .eq("owner_id", ownerId);
  const table = ownerType === "property" ? "properties" : "projects";
  await supabase
    .from(table)
    .update({
      media_count: count ?? 0,
      ...(ownerType === "property"
        ? { media_status: (count ?? 0) > 0 ? "ready" : "no_media" }
        : {}),
    })
    .eq("id", ownerId);
}
