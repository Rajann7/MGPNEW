"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { MoreVertical, Share2, Bookmark, Flag } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { saveItem, unsaveItem } from "@/lib/actions/saved";
import { ReportModal } from "@/components/detail/ReportModal";
import type { SavedItemType } from "@/types";

interface Props {
  title: string;
  currentPath: string;
  targetType: SavedItemType;
  targetId: string;
  isLoggedIn: boolean;
  initiallySaved?: boolean;
  entityNoun?: string;
}

/**
 * Overflow "⋮" menu (design Batch 4 · d-prop): Share, Save, divider, Report.
 * Folds the previously-standalone ShareButton + Save toggle into one menu,
 * matching the design. Report reuses the real, auth-gated ReportModal in its
 * controlled mode instead of duplicating that flow.
 */
export function DetailOverflowMenu({
  title,
  currentPath,
  targetType,
  targetId,
  isLoggedIn,
  initiallySaved = false,
  entityNoun = "listing",
}: Props) {
  const { openAuth } = useAuthModal();
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(initiallySaved);
  const [copied, setCopied] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        setOpen(false);
        return;
      }
    } catch {
      // user cancelled — fall through to copy
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleSave() {
    if (!isLoggedIn) {
      setOpen(false);
      openAuth(currentPath);
      return;
    }
    startTransition(async () => {
      const result = saved
        ? await unsaveItem(targetType, targetId)
        : await saveItem(targetType, targetId);
      if (result.success) setSaved(!saved);
    });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100"
      >
        <MoreVertical className="h-4.5 w-4.5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-11 z-20 w-48 overflow-hidden rounded-xl border border-zinc-100 bg-white py-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleShare}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            <Share2 className="h-4 w-4 text-zinc-400" />
            {copied ? "Link copied" : "Share"}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleSave}
            disabled={isPending}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            <Bookmark
              className="h-4 w-4 text-zinc-400"
              fill={saved ? "currentColor" : "none"}
            />
            {saved ? "Saved" : "Save"}
          </button>
          <div className="my-1 border-t border-zinc-100" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              setReportOpen(true);
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-600 hover:bg-red-50"
          >
            <Flag className="h-4 w-4" />
            Report {entityNoun}
          </button>
        </div>
      )}

      <ReportModal
        targetType={targetType as "property" | "project" | "requirement" | "user"}
        targetId={targetId}
        isLoggedIn={isLoggedIn}
        currentPath={currentPath}
        entityNoun={entityNoun}
        open={reportOpen}
        onOpenChange={setReportOpen}
      />
    </div>
  );
}
