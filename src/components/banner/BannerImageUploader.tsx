"use client";

import { useRef, useState } from "react";
import { validateBannerImage, readDimensions, uploadBannerImage } from "@/lib/banner/media";
import { IMAGE_RULES, type DeviceRule } from "@/lib/banner/config";

export interface DeviceImage {
  url: string | null;
  path: string | null;
}

/**
 * One device-specific banner image slot (desktop / mobile) with recommended
 * size + ratio guidance, live preview, dimension warning, replace, remove.
 * Real upload to the public bucket — never fakes an upload.
 */
export function BannerImageUploader({
  rule, value, onChange, authUid, adKey,
}: {
  rule: DeviceRule;
  value: DeviceImage;
  onChange: (v: DeviceImage) => void;
  authUid: string;
  adKey: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [warn, setWarn] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value.url);

  async function handleFile(file?: File) {
    if (!file) return;
    setError(null); setWarn(null);
    const vErr = validateBannerImage(file);
    if (vErr) { setError(vErr); return; }
    try {
      const { width, previewUrl } = await readDimensions(file);
      setPreview(previewUrl);
      if (width < rule.minWidth) setWarn(`Image is narrow (${width}px). Recommended ${rule.recommended}.`);
      setBusy(true);
      const res = await uploadBannerImage(file, authUid, adKey, rule.key);
      setBusy(false);
      if (!res.ok) { setError(res.message); return; }
      onChange({ url: res.url, path: res.path });
    } catch {
      setBusy(false);
      setError("Could not read the image.");
    }
  }

  function remove() {
    setPreview(null); setWarn(null); setError(null);
    onChange({ url: null, path: null });
  }

  return (
    <div className="rounded-card border border-border bg-surface p-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink">
          {rule.label} banner {rule.required ? <span className="text-danger">*</span> : <span className="text-ink-muted">(optional)</span>}
        </p>
        {preview && (
          <button type="button" onClick={remove} className="text-xs font-medium text-danger hover:underline">Remove</button>
        )}
      </div>
      <p className="mt-0.5 text-[11px] text-ink-muted">Recommended {rule.recommended} · ratio {rule.ratio} · {IMAGE_RULES.acceptedLabel} · max {IMAGE_RULES.maxSizeLabel}</p>

      {preview ? (
        <div className="mt-2 overflow-hidden rounded-lg border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt={`${rule.label} preview`} className="h-24 w-full object-cover" />
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()}
          className="mt-2 flex w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border py-6 text-xs text-ink-soft hover:border-brand/50">
          <span className="font-medium text-ink">{busy ? "Uploading…" : `Upload ${rule.label.toLowerCase()} image`}</span>
        </button>
      )}

      {preview && (
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-2 text-xs font-medium text-brand hover:underline">
          {busy ? "Uploading…" : "Replace image"}
        </button>
      )}

      <input ref={inputRef} type="file" accept={IMAGE_RULES.accepted.join(",")} className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)} />

      {warn && <p className="mt-1 text-[11px] text-warning">{warn}</p>}
      {error && <p className="mt-1 text-[11px] text-danger">{error}</p>}
    </div>
  );
}
