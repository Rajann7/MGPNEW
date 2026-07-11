"use client";

import { useRef, useState, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Bookmark, BookmarkCheck, Check } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { saveSearch } from "@/lib/actions/saved";
import type { Profile } from "@/types";

/**
 * T03-17 · Save Search prompt (design Batch 3).
 * Persists the current /search query for the signed-in user via the existing
 * `saveSearch` action → `saved_searches` (RLS-scoped). Guest → auth modal
 * (login intent), never a fake save. Signed-in → title + optional new-match
 * email alert. Honest states: pending · Saved ✓ · error.
 */
export function SaveSearchButton({ profile }: { profile: Profile | null }) {
  const sp = useSearchParams();
  const { openAuth } = useAuthModal();
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  // Default title from the current query (tab · city · q)
  const defaultTitle = (() => {
    const tab = sp.get("tab") ?? "buy";
    const city = sp.get("city");
    const q = sp.get("q");
    const base = tab.charAt(0).toUpperCase() + tab.slice(1);
    if (city) return `${base} in ${city}`;
    if (q) return `${base}: ${q}`;
    return `${base} — all Gujarat`;
  })();

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function handleClick() {
    setError(null);
    if (!profile) {
      openAuth(); // login intent — never fake a save for guests
      return;
    }
    setTitle(defaultTitle);
    setOpen((v) => !v);
  }

  function handleSave() {
    setError(null);
    const queryParams: Record<string, string> = {};
    sp.forEach((value, key) => {
      queryParams[key] = value;
    });
    startTransition(async () => {
      const res = await saveSearch(
        title.trim() || defaultTitle,
        queryParams,
        alertEnabled
      );
      if (!res.success) {
        setError(
          res.error === "AUTH_REQUIRED"
            ? "Please log in to save searches."
            : "Could not save. Please try again."
        );
        return;
      }
      setSaved(true);
      setOpen(false);
    });
  }

  if (saved) {
    return (
      <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-[10px] border border-brand/30 bg-brand-soft px-3 py-2 text-[13px] font-medium text-brand">
        <BookmarkCheck className="h-4 w-4" />
        Search saved
      </span>
    );
  }

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-1.5 rounded-[10px] border border-border bg-white px-3 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:border-brand/40 hover:text-brand"
      >
        <Bookmark className="h-4 w-4" />
        <span className="hidden sm:inline">Save search</span>
      </button>

      {open && profile && (
        <div
          role="dialog"
          aria-label="Save this search"
          className="absolute right-0 top-[calc(100%+8px)] z-30 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-white p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
        >
          <div className="mb-2 text-[13px] font-semibold text-ink">
            Save this search
          </div>
          <label className="block text-[12px] font-medium text-ink-soft">
            Name
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              placeholder={defaultTitle}
              className="mt-1 w-full rounded-[10px] border border-border px-3 py-2 text-sm text-ink outline-none focus:border-brand"
            />
          </label>
          <label className="mt-3 flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={alertEnabled}
              onChange={(e) => setAlertEnabled(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-brand"
            />
            <span className="text-[12.5px] leading-snug text-ink-soft">
              Email me when new matching listings are posted
              <span className="mt-0.5 block text-[11px] text-ink-muted">
                Alerts send only when the email provider is configured.
              </span>
            </span>
          </label>

          {error && (
            <p role="alert" className="mt-2 text-[12px] text-rose-600">
              {error}
            </p>
          )}

          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-[10px] px-3 py-2 text-[13px] font-medium text-ink-soft hover:bg-surface-muted"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-brand px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand-hover disabled:opacity-60"
            >
              <Check className="h-3.5 w-3.5" />
              {isPending ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
