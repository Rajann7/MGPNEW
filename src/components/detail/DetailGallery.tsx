/**
 * Media upload/storage (Cloudflare R2/CDN) is not connected yet (Prompt 10).
 * cover_media_id/media_count exist on public-safe views but there is no public
 * media URL resolver yet, so we always show a neutral placeholder — never a
 * fake photo count or broken <img>.
 */
export function DetailGallery({ mediaCount }: { mediaCount: number }) {
  return (
    <div className="relative aspect-[16/10] flex flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50 text-zinc-400">
      <svg
        className="w-10 h-10 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M4.5 6.75h15a.75.75 0 01.75.75v9a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75v-9a.75.75 0 01.75-.75z"
        />
      </svg>
      <p className="text-xs font-medium">
        {mediaCount > 0 ? "Photos coming soon" : "Photos not added yet"}
      </p>
      {/* Per-photo caption bar (design Batch 4). Honest until R2 media lands
          (Prompt 10) — shows the counter position + a "caption coming soon"
          note rather than a fabricated room label. */}
      {mediaCount > 0 && (
        <span className="absolute bottom-3 left-3 rounded-md bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white">
          1 / {mediaCount} · caption coming soon
        </span>
      )}
    </div>
  );
}
