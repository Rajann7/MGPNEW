"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  getMediaUploadTarget,
  registerMedia,
  listMedia,
  deleteMedia,
  reorderMedia,
  setCoverMedia,
  type MediaItem,
  type MediaOwnerType,
} from "@/lib/actions/media";
import {
  ImageIcon,
  X,
  Star,
  ChevronUp,
  ChevronDown,
  FileText,
  RotateCw,
} from "lucide-react";

const ERR: Record<string, string> = {
  AUTH_REQUIRED: "Please log in to continue.",
  FORBIDDEN: "You don't have access to this listing.",
  ENTITY_NOT_FOUND: "Save this listing as a draft first, then add photos.",
  UNSUPPORTED_FILE_TYPE: "That file type isn't supported.",
  VALIDATION_ERROR: "That file couldn't be uploaded.",
  FILE_TOO_LARGE: "That file is larger than the allowed size.",
  UNKNOWN_ERROR: "Upload failed. Please try again.",
};

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MIN_PHOTOS = 3;

interface PendingUpload {
  key: string;
  file: File;
  kind: "image" | "pdf";
  status: "uploading" | "failed";
  errorText?: string;
  isCover: boolean;
}

/**
 * Design Batch 5 media step — real Supabase-Storage-backed upload (client
 * uploads bytes directly to Storage under a folder scoped to its own auth
 * uid, then registers the row server-side with a fresh ownership check).
 * Reused identically by Property (photos only) and Project (photos +
 * optional brochure PDF) wizards, per the design's "reused identically
 * across all media steps" rule. Failed uploads keep their file reference so
 * Retry re-attempts the exact same upload instead of forcing a re-pick
 * (Batch 5 §97).
 */
export function MediaUploadStep({
  ownerType,
  ownerId,
  allowBrochure,
}: {
  ownerType: MediaOwnerType;
  ownerId: string | null;
  allowBrochure?: boolean;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [pending, setPending] = useState<PendingUpload[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const brochureInputRef = useRef<HTMLInputElement>(null);
  // Tracks whether a cover photo has been claimed, updated synchronously at
  // selection time (not read from `items` inside the async upload) — a real
  // bug caught live: selecting several photos in one batch let every one of
  // them see `items.length === 0` and all register as cover simultaneously.
  const coverClaimedRef = useRef(false);

  async function refresh() {
    if (!ownerId) return;
    const res = await listMedia(ownerType, ownerId);
    if (res.success) {
      setItems(res.data);
      coverClaimedRef.current = res.data.some((m) => m.is_cover);
    }
  }

  // Initial load belongs in an effect, not the render body — calling a
  // server action + setState directly during render (the previous
  // `if (!loaded) refresh()`) corrupted sibling state updates elsewhere in
  // the wizard (a real bug caught live: "Cannot update a component while
  // rendering a different component", which was silently breaking the
  // Media→Contact step transition). The setState calls live inside a
  // `.then()` callback (not the effect body itself) — the standard escape
  // for a one-shot async load-on-mount.
  useEffect(() => {
    if (!ownerId) return;
    let cancelled = false;
    listMedia(ownerType, ownerId).then((res) => {
      if (cancelled) return;
      if (res.success) {
        setItems(res.data);
        coverClaimedRef.current = res.data.some((m) => m.is_cover);
      }
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerId]);

  if (!ownerId) {
    return (
      <div className="rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
        <p className="text-sm font-medium text-zinc-700">
          Save this listing first
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          Complete the previous steps — a draft is created automatically — then
          come back here to add photos.
        </p>
      </div>
    );
  }

  async function runUpload(entry: PendingUpload) {
    if (!ownerId) return;
    setPending((prev) =>
      prev.map((p) =>
        p.key === entry.key
          ? { ...p, status: "uploading", errorText: undefined }
          : p
      )
    );
    const supabase = createClient();
    const file = entry.file;

    const target = await getMediaUploadTarget(
      ownerType,
      ownerId,
      file.name,
      file.type
    );
    if (!target.success) {
      if (entry.isCover) coverClaimedRef.current = false;
      failEntry(entry.key, ERR[target.error] ?? target.error);
      return;
    }

    const { error: uploadErr } = await supabase.storage
      .from(target.data.bucket)
      .upload(target.data.path, file, {
        contentType: file.type,
        upsert: false,
      });
    if (uploadErr) {
      if (entry.isCover) coverClaimedRef.current = false;
      failEntry(entry.key, "Upload failed — check your connection.");
      return;
    }

    const reg = await registerMedia({
      ownerType,
      ownerId,
      bucket: target.data.bucket,
      storagePath: target.data.path,
      mimeType: file.type,
      fileSizeBytes: file.size,
      isCover: entry.isCover,
    });
    if (!reg.success) {
      if (entry.isCover) coverClaimedRef.current = false;
      await supabase.storage
        .from(target.data.bucket)
        .remove([target.data.path]);
      failEntry(entry.key, ERR[reg.error] ?? reg.error);
      return;
    }
    setItems((prev) => [...prev, reg.data]);
    setPending((prev) => prev.filter((p) => p.key !== entry.key));
  }

  function failEntry(key: string, text: string) {
    setPending((prev) =>
      prev.map((p) =>
        p.key === key ? { ...p, status: "failed", errorText: text } : p
      )
    );
  }

  function selectFiles(fileList: FileList | null, kind: "image" | "pdf") {
    if (!fileList || fileList.length === 0) return;
    setError(null);
    const maxBytes = kind === "image" ? MAX_IMAGE_BYTES : 25 * 1024 * 1024;
    const accepted: PendingUpload[] = [];
    for (const file of Array.from(fileList)) {
      if (file.size > maxBytes) {
        setError(
          `${file.name} is larger than ${kind === "image" ? "10MB" : "25MB"}.`
        );
        continue;
      }
      // Claim the cover slot for at most one file per selection, decided
      // synchronously here (not inside the async upload) so a multi-file
      // batch can never race and register several covers.
      const claimsCover = kind === "image" && !coverClaimedRef.current;
      if (claimsCover) coverClaimedRef.current = true;
      accepted.push({
        key: crypto.randomUUID(),
        file,
        kind,
        status: "uploading",
        isCover: claimsCover,
      });
    }
    if (accepted.length === 0) return;
    setPending((prev) => [...prev, ...accepted]);
    accepted.forEach((entry) => runUpload(entry));
  }

  function retryEntry(key: string) {
    const entry = pending.find((p) => p.key === key);
    if (entry) runUpload(entry);
  }

  function removePending(key: string) {
    setPending((prev) => {
      const entry = prev.find((p) => p.key === key);
      if (entry?.isCover) coverClaimedRef.current = false;
      return prev.filter((p) => p.key !== key);
    });
  }

  async function handleDelete(id: string) {
    if (!ownerId) return;
    const deleted = items.find((m) => m.id === id);
    if (deleted?.is_cover) coverClaimedRef.current = false;
    setItems((prev) => prev.filter((m) => m.id !== id));
    const res = await deleteMedia(ownerType, ownerId, id);
    if (!res.success) {
      setError(ERR[res.error] ?? res.error);
      refresh();
    }
  }

  async function handleMove(index: number, dir: -1 | 1) {
    if (!ownerId) return;
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    await reorderMedia(
      ownerType,
      ownerId,
      next.map((m) => m.id)
    );
  }

  async function handleSetCover(id: string) {
    if (!ownerId || ownerType === "project_unit") return;
    setItems((prev) => prev.map((m) => ({ ...m, is_cover: m.id === id })));
    await setCoverMedia(ownerType, ownerId, id);
  }

  const photos = items.filter((m) => m.kind === "image" || m.kind === "video");
  const brochure = items.find((m) => m.kind === "pdf");
  const pendingPhotos = pending.filter((p) => p.kind === "image");
  const pendingBrochure = pending.find((p) => p.kind === "pdf");

  return (
    <div className="space-y-4">
      <div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 px-6 py-8 text-center hover:border-brand/40"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft">
            <ImageIcon className="h-5 w-5 text-brand" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium text-zinc-700">
            Tap to add photos
          </span>
          <span className="text-xs text-zinc-400">
            JPG/PNG · max 10 MB each · min {MIN_PHOTOS} photos required
          </span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => {
            selectFiles(e.target.files, "image");
            e.target.value = "";
          }}
        />
      </div>

      {pendingPhotos.length > 0 && (
        <div className="space-y-1">
          {pendingPhotos.map((p) => (
            <div
              key={p.key}
              className={
                p.status === "failed"
                  ? "flex items-center justify-between gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700"
                  : "flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2 text-xs text-zinc-500"
              }
            >
              {p.status === "uploading" ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                  Uploading {p.file.name}…
                </>
              ) : (
                <>
                  <span className="truncate">
                    {p.file.name} — {p.errorText ?? "failed"}
                  </span>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => retryEntry(p.key)}
                      className="inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-hover"
                    >
                      <RotateCw className="h-3 w-3" /> Retry
                    </button>
                    <button
                      type="button"
                      onClick={() => removePending(p.key)}
                      aria-label="Remove"
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((m, i) => (
            <div
              key={m.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100"
            >
              {m.kind === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={publicMediaUrl(m.storage_path)}
                  alt=""
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                  Video
                </div>
              )}
              {m.is_cover && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-white">
                  Cover
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex gap-0.5">
                  <button
                    type="button"
                    onClick={() => handleMove(i, -1)}
                    aria-label="Move earlier"
                    className="flex h-6 w-6 items-center justify-center rounded bg-white/90 text-zinc-700 hover:bg-white"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(i, 1)}
                    aria-label="Move later"
                    className="flex h-6 w-6 items-center justify-center rounded bg-white/90 text-zinc-700 hover:bg-white"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex gap-0.5">
                  {!m.is_cover && ownerType !== "project_unit" && (
                    <button
                      type="button"
                      onClick={() => handleSetCover(m.id)}
                      aria-label="Set as cover"
                      className="flex h-6 w-6 items-center justify-center rounded bg-white/90 text-zinc-700 hover:bg-white"
                    >
                      <Star className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id)}
                    aria-label="Remove photo"
                    className="flex h-6 w-6 items-center justify-center rounded bg-white/90 text-red-500 hover:bg-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {photos.length > 0 && photos.length < MIN_PHOTOS && (
        <p className="text-xs text-amber-600">
          {MIN_PHOTOS - photos.length} more photo
          {MIN_PHOTOS - photos.length > 1 ? "s" : ""} needed — at least{" "}
          {MIN_PHOTOS} photos are required to submit.
        </p>
      )}

      {allowBrochure && (
        <div className="border-t border-zinc-100 pt-4">
          <p className="mb-2 text-sm font-medium text-zinc-700">
            Brochure (PDF)
          </p>
          {brochure ? (
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2">
              <span className="flex items-center gap-2 text-xs text-zinc-600">
                <FileText className="h-4 w-4 text-zinc-400" />
                Brochure uploaded — stored privately, never converted to an
                image.
              </span>
              <button
                type="button"
                onClick={() => handleDelete(brochure.id)}
                aria-label="Remove brochure"
                className="text-red-500 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : pendingBrochure ? (
            <div
              className={
                pendingBrochure.status === "failed"
                  ? "flex items-center justify-between gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700"
                  : "flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2 text-xs text-zinc-500"
              }
            >
              {pendingBrochure.status === "uploading" ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                  Uploading {pendingBrochure.file.name}…
                </>
              ) : (
                <>
                  <span className="truncate">
                    {pendingBrochure.file.name} —{" "}
                    {pendingBrochure.errorText ?? "failed"}
                  </span>
                  <button
                    type="button"
                    onClick={() => retryEntry(pendingBrochure.key)}
                    className="inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-hover"
                  >
                    <RotateCw className="h-3 w-3" /> Retry
                  </button>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => brochureInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-200 px-4 py-3 text-xs font-medium text-zinc-600 hover:border-brand/40"
            >
              <FileText className="h-4 w-4" /> Upload brochure PDF
            </button>
          )}
          <input
            ref={brochureInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              selectFiles(e.target.files, "pdf");
              e.target.value = "";
            }}
          />
        </div>
      )}
    </div>
  );
}

/** media-public is a public Storage bucket — direct public URL, no signing needed. */
function publicMediaUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/media-public/${path}`;
}
