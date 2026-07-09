"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

/**
 * Fullscreen photo gallery overlay (design Batch 4 · d-gallery).
 * Real media/R2 CDN is not connected yet (Prompt 10), so this operates over
 * honest placeholder tiles — one per real media_count slot, never a fake photo.
 * Wired: keyboard (←/→/Esc), click nav, desktop thumbnail strip, mobile
 * swipe + dot indicators.
 */
export function FullscreenGallery({
  count,
  initialIndex = 0,
  onClose,
}: {
  count: number;
  initialIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const go = (delta: number) => {
    setIndex((i) => (i + delta + count) % count);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      className="fixed inset-0 z-[400] flex flex-col bg-[#18181b]"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <span className="text-sm font-medium text-white/90">
          {index + 1} / {count} · caption coming soon
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 text-xs text-white/50 sm:flex">
            <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-sans">←</kbd>
            <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-sans">→</kbd>
            <span>navigate</span>
            <kbd className="ml-2 rounded border border-white/20 px-1.5 py-0.5 font-sans">Esc</kbd>
            <span>close</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div
        className="relative flex flex-1 items-center justify-center px-4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-3 z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <div className="flex h-[55vh] w-full max-w-3xl flex-col items-center justify-center gap-2 rounded-xl bg-white/5 text-white/40">
          <ImageIcon className="h-12 w-12" aria-hidden="true" />
          <p className="text-xs font-medium">Photos coming soon</p>
        </div>
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-3 z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Desktop thumbnail strip */}
      {count > 1 && (
        <div className="hidden items-center justify-center gap-2 overflow-x-auto px-6 py-4 sm:flex">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-10 w-14 flex-shrink-0 rounded-md bg-white/10 transition-opacity ${
                i === index
                  ? "opacity-100 outline outline-2 outline-offset-1 outline-white"
                  : "opacity-50 hover:opacity-75"
              }`}
            />
          ))}
        </div>
      )}

      {/* Mobile dot indicators */}
      {count > 1 && (
        <div className="flex items-center justify-center gap-1.5 pb-6 sm:hidden">
          {Array.from({ length: Math.min(count, 10) }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
