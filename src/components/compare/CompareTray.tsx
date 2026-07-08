"use client";

import Link from "next/link";
import { Scale, X } from "lucide-react";
import { useCompare } from "@/components/compare/CompareProvider";

/** Sticky bottom "compare tray" — appears once ≥1 item is added (design add-on). */
export function CompareTray() {
  const { items, remove, clear } = useCompare();
  if (items.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <span className="hidden flex-shrink-0 items-center gap-1.5 text-sm font-semibold text-ink sm:inline-flex">
          <Scale className="h-4 w-4 text-brand" />
          Compare
        </span>
        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it) => (
            <span
              key={it.id}
              className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface-subtle px-3 py-1 text-xs font-medium text-ink"
            >
              <span className="max-w-[120px] truncate">{it.title}</span>
              <button
                type="button"
                onClick={() => remove(it.id)}
                aria-label={`Remove ${it.title} from compare`}
                className="text-ink-muted hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={clear}
          className="flex-shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-ink-soft hover:bg-surface-muted"
        >
          Clear
        </button>
        <Link
          href="/compare"
          aria-disabled={items.length < 2}
          className={[
            "flex-shrink-0 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors",
            items.length < 2
              ? "pointer-events-none bg-ink-muted/40"
              : "bg-brand hover:bg-brand-hover",
          ].join(" ")}
        >
          Compare {items.length}
        </Link>
      </div>
    </div>
  );
}
