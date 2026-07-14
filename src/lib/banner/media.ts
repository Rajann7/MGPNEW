"use client";

/**
 * Client-side banner image upload. Validates type/size, reads dimensions,
 * uploads to the PUBLIC `banner-ads` bucket under `<authUid>/<adKey>/...`.
 * Degrades with a clear message if storage isn't set up — never fakes an upload.
 */
import { createClient } from "@/lib/supabase/client";
import { IMAGE_RULES } from "./config";

export function validateBannerImage(file: File): string | null {
  if (!IMAGE_RULES.accepted.includes(file.type)) return `Unsupported format. Use ${IMAGE_RULES.acceptedLabel}.`;
  if (file.size > IMAGE_RULES.maxBytes) return `File is too large. Maximum is ${IMAGE_RULES.maxSizeLabel}.`;
  return null;
}

export function readDimensions(file: File): Promise<{ width: number; height: number; previewUrl: string }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight, previewUrl: url });
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Could not read image.")); };
    img.src = url;
  });
}

export async function uploadBannerImage(
  file: File, authUid: string, adKey: string, device: string
): Promise<{ ok: true; path: string; url: string } | { ok: false; message: string }> {
  const supabase = createClient();
  if (!supabase) return { ok: false, message: "Uploads are unavailable right now." };
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safe = `${device}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const path = `${authUid}/${adKey}/${safe}`;
  const { error } = await supabase.storage.from("banner-ads").upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
  if (error) {
    if (/Bucket not found|not found|does not exist/i.test(error.message)) {
      return { ok: false, message: "Banner storage isn't set up yet (run the banner_ads migration)." };
    }
    return { ok: false, message: "Upload failed. Please try again." };
  }
  const { data } = supabase.storage.from("banner-ads").getPublicUrl(path);
  return { ok: true, path, url: data.publicUrl };
}
