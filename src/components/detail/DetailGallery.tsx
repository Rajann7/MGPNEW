"use client";

import { useState } from "react";
import { Images } from "lucide-react";
import { FullscreenGallery } from "@/components/detail/FullscreenGallery";

/**
 * Media upload/storage (Cloudflare R2/CDN) is not connected yet (Prompt 10).
 * cover_media_id/media_count exist on public-safe views but there is no public
 * media URL resolver yet, so every tile is a neutral placeholder — never a
 * fake photo or broken <img>. Layout matches design Batch 4 (d-prop):
 * desktop 2fr/1fr/1fr x 150/150 grid with a "View all N photos" pill on the
 * last tile; mobile a swipeable placeholder strip with a counter + dots.
 */
export function DetailGallery({ mediaCount }: { mediaCount: number }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const count = Math.max(0, mediaCount);

  if (count === 0) {
    return (
      <div className="relative flex aspect-[16/10] flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50 text-zinc-400">
        <PlaceholderIcon className="mb-2 h-10 w-10" />
        <p className="text-xs font-medium">Photos not added yet</p>
      </div>
    );
  }

  const tileCount = Math.min(count, 5);
  const tiles = Array.from({ length: tileCount }, (_, i) => i);

  return (
    <>
      {/* Desktop grid (md+) */}
      <div
        className="relative hidden gap-1.5 overflow-hidden rounded-2xl md:grid"
        style={{
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "150px 150px",
        }}
      >
        <button
          type="button"
          onClick={() => setGalleryOpen(true)}
          aria-label="Open photo 1"
          className="row-span-2 flex items-center justify-center border border-zinc-100 bg-zinc-50 text-zinc-400 hover:bg-zinc-100"
        >
          <PlaceholderIcon className="h-9 w-9" />
        </button>
        {tiles.slice(1).map((i) => {
          const isLast = i === tiles.length - 1 && count > tileCount;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setGalleryOpen(true)}
              aria-label={isLast ? `View all ${count} photos` : `Open photo ${i + 1}`}
              className="relative flex items-center justify-center border border-zinc-100 bg-zinc-50 text-zinc-400 hover:bg-zinc-100"
            >
              <PlaceholderIcon className="h-6 w-6" />
              {isLast && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm">
                    <Images className="h-3.5 w-3.5" />
                    View all {count} photos
                  </span>
                </span>
              )}
            </button>
          );
        })}
        {/* Fill remaining grid slots if fewer than 5 placeholder photos exist */}
        {Array.from({ length: Math.max(0, 5 - tileCount) }).map((_, i) => (
          <div
            key={`fill-${i}`}
            className="flex items-center justify-center border border-zinc-100 bg-zinc-50 text-zinc-300"
          >
            <PlaceholderIcon className="h-6 w-6" />
          </div>
        ))}
      </div>

      {/* Mobile carousel (<md) */}
      <div className="relative h-[220px] overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 md:hidden">
        <button
          type="button"
          onClick={() => setGalleryOpen(true)}
          aria-label={`Open photo ${mobileIndex + 1} of ${count}`}
          className="flex h-full w-full items-center justify-center text-zinc-400"
        >
          <PlaceholderIcon className="h-9 w-9" />
        </button>
        <span className="absolute right-2.5 top-2.5 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
          {mobileIndex + 1}/{count}
        </span>
        {count > 1 && (
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1">
            {Array.from({ length: Math.min(count, 8) }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => setMobileIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === mobileIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {galleryOpen && (
        <FullscreenGallery
          count={count}
          initialIndex={0}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
}

function PlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}
