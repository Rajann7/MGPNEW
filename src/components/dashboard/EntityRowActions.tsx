"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MoreVertical,
  Eye,
  Pencil,
  Pause,
  Play,
  Trash2,
  FileText,
} from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";
import { pauseResumeProperty, softDeleteProperty } from "@/lib/actions/properties";
import {
  pauseResumeRequirement,
  softDeleteRequirement,
} from "@/lib/actions/requirements";
import { cn } from "@/lib/cn";

type EntityKind = "property" | "requirement";

const PAUSE_RESUME_ACTION: Record<
  EntityKind,
  (id: string, action: "pause" | "resume") => Promise<{ success: boolean }>
> = {
  property: pauseResumeProperty,
  requirement: pauseResumeRequirement,
};

const DELETE_ACTION: Record<
  EntityKind,
  (id: string) => Promise<{ success: boolean }>
> = {
  property: softDeleteProperty,
  requirement: softDeleteRequirement,
};

/**
 * Real row/card actions (View/Edit/Pause/Resume/Delete) — inline button row
 * on desktop (Batch 6 · 2A), collapses to an overflow "⋮" menu on mobile
 * (2C). Destructive delete always confirms first (2B) before calling the
 * real server action; no client-only optimistic delete. Pause/resume/delete
 * call the real server actions directly (imported "use server" functions
 * are safe to call from a client component — no data prop drilling needed).
 */
export function EntityRowActions({
  kind,
  entityId,
  entityTitle,
  relatedCount,
  viewHref,
  editHref,
  proposalsHref,
  showPauseResume,
  isPaused,
  showDelete,
  entityLabel = "listing",
  /** "Close"/"Reopen" instead of "Pause"/"Resume" wording (requirements). */
  pauseLabel = "Pause",
  resumeLabel = "Resume",
}: {
  kind: EntityKind;
  entityId: string;
  /** Used in the delete-confirmation copy ("<title>" and its N leads…). */
  entityTitle?: string;
  /** Real lead/proposal count shown in the delete-confirmation copy. */
  relatedCount?: number;
  viewHref?: string;
  editHref?: string;
  /** Requirements only — "View proposals" action. */
  proposalsHref?: string;
  showPauseResume: boolean;
  isPaused: boolean;
  showDelete: boolean;
  entityLabel?: string;
  pauseLabel?: string;
  resumeLabel?: string;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  function handlePauseResume() {
    setMenuOpen(false);
    setErrorMsg(null);
    startTransition(async () => {
      const result = await PAUSE_RESUME_ACTION[kind](
        entityId,
        isPaused ? "resume" : "pause"
      );
      if (!result.success) {
        setErrorMsg("Couldn't update status. Please try again.");
        return;
      }
      router.refresh();
    });
  }

  function confirmDelete() {
    setErrorMsg(null);
    startTransition(async () => {
      const result = await DELETE_ACTION[kind](entityId);
      if (!result.success) {
        setErrorMsg("Couldn't delete right now. Please try again.");
        return;
      }
      setConfirmOpen(false);
      router.refresh();
    });
  }

  const items: {
    key: string;
    label: string;
    href?: string;
    danger?: boolean;
    /** Solid filled button (e.g. "Resume") instead of the default outline. */
    filled?: boolean;
    onClick?: () => void;
    icon: typeof Eye;
  }[] = [
    ...(proposalsHref
      ? [
          {
            key: "proposals",
            label: "View proposals",
            href: proposalsHref,
            icon: FileText,
          },
        ]
      : []),
    ...(viewHref
      ? [{ key: "view", label: "View", href: viewHref, icon: Eye }]
      : []),
    ...(editHref
      ? [{ key: "edit", label: "Edit", href: editHref, icon: Pencil }]
      : []),
    ...(showPauseResume
      ? [
          {
            key: "pauseresume",
            label: isPaused ? resumeLabel : pauseLabel,
            onClick: handlePauseResume,
            icon: isPaused ? Play : Pause,
            filled: isPaused,
          },
        ]
      : []),
    ...(showDelete
      ? [
          {
            key: "delete",
            label: "Delete",
            danger: true,
            onClick: () => {
              setMenuOpen(false);
              setConfirmOpen(true);
            },
            icon: Trash2,
          },
        ]
      : []),
  ];

  return (
    <div className="flex items-center justify-end gap-2 w-full sm:w-auto sm:shrink-0">
      {errorMsg && (
        <p className="text-xs text-red-600 hidden sm:block" role="alert">
          {errorMsg}
        </p>
      )}

      {/* Desktop: inline pill buttons */}
      <div className="hidden sm:flex items-center gap-1.5">
        {items.map((item) =>
          item.href ? (
            <Link
              key={item.key}
              href={item.href}
              className="px-3.5 py-1.5 text-xs font-medium text-ink-soft border border-border rounded-full hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.key}
              type="button"
              disabled={isPending}
              onClick={item.onClick}
              className={cn(
                "px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors disabled:opacity-60",
                item.filled
                  ? "bg-brand text-white hover:bg-brand-hover"
                  : item.danger
                    ? "text-red-600 border border-red-200 hover:bg-red-50 dark:hover:bg-red-500/10"
                    : "text-ink-soft border border-border hover:bg-ink/5 dark:hover:bg-white/10"
              )}
            >
              {item.label}
            </button>
          )
        )}
      </div>

      {/* Mobile: overflow menu */}
      <div className="relative sm:hidden" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="More actions"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-muted hover:bg-ink/5 dark:hover:bg-white/10"
        >
          <MoreVertical className="w-4 h-4" aria-hidden="true" />
        </button>
        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 mt-1 w-44 rounded-xl border border-border bg-surface shadow-lg z-30 overflow-hidden py-1"
          >
            {items.map((item) => {
              const Icon = item.icon;
              return item.href ? (
                <Link
                  key={item.key}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-ink-soft hover:bg-ink/5 dark:hover:bg-white/10"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.key}
                  type="button"
                  role="menuitem"
                  disabled={isPending}
                  onClick={item.onClick}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm hover:bg-ink/5 dark:hover:bg-white/10 disabled:opacity-60",
                    item.danger ? "text-red-600" : "text-ink-soft"
                  )}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {showDelete && (
        <ConfirmDialog
          open={confirmOpen}
          title={`Delete this ${entityLabel}?`}
          description={
            entityTitle
              ? `"${entityTitle}"${
                  relatedCount
                    ? ` and its ${relatedCount} ${
                        kind === "property"
                          ? relatedCount === 1
                            ? "lead"
                            : "leads"
                          : relatedCount === 1
                            ? "proposal"
                            : "proposals"
                      }`
                    : ""
                } will be permanently removed. This cannot be undone.`
              : `This will remove the ${entityLabel} from search and your dashboard. This can't be undone from here.`
          }
          confirmLabel={`Delete ${entityLabel}`}
          isPending={isPending}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
}
