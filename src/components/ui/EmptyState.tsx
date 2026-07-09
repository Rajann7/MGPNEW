import type { LucideIcon } from "lucide-react";
import { Inbox, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  actionHref,
  tone = "neutral",
  dashed = false,
  compact = false,
  hideActionIcon = false,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  /** "brand" renders a green icon circle instead of the default neutral gray. */
  tone?: "neutral" | "brand";
  /** Pixel-matches Batch 6 · 2D: dashed border, tighter padding, radius-10 button. */
  dashed?: boolean;
  /** Pixel-matches Batch 6 · 3B (smaller variant): 48px icon, 14px title, 12px description, 32px padding. */
  compact?: boolean;
  /** Omit the leading "+" in the action button (3B has no icon; 2D does). */
  hideActionIcon?: boolean;
}) {
  return (
    <div
      className={cn(
        "text-center bg-white rounded-2xl border border-zinc-200",
        dashed ? (compact ? "border-dashed py-8 px-6" : "border-dashed py-9 px-6") : "py-16"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center mx-auto",
          dashed
            ? compact
              ? "w-12 h-12 rounded-full"
              : "w-[52px] h-[52px] rounded-full"
            : "w-14 h-14 rounded-xl mb-4",
          tone === "brand" ? "bg-brand-soft" : "bg-zinc-100"
        )}
      >
        <Icon
          className={cn(
            dashed ? (compact ? "w-[22px] h-[22px]" : "w-6 h-6") : "w-7 h-7",
            tone === "brand" ? "text-brand" : "text-zinc-400"
          )}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <h2
        className={cn(
          "font-semibold text-zinc-900",
          dashed ? (compact ? "text-sm mt-3" : "text-[15px] mt-3.5") : "text-base mb-1"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "text-zinc-500",
          dashed
            ? compact
              ? "text-xs leading-[1.5] mt-1"
              : "text-[13px] leading-[1.5] mt-1"
            : "text-sm mb-5"
        )}
      >
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className={cn(
            "inline-flex items-center gap-2 font-medium text-white bg-brand hover:bg-brand-hover transition-colors",
            dashed
              ? "text-[13px] rounded-[10px] px-[18px] py-2.5 mt-4"
              : "text-sm rounded-lg px-4 py-2.5"
          )}
        >
          {dashed && !hideActionIcon && (
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
          )}
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
