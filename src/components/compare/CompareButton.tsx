"use client";

import { Scale, Check } from "lucide-react";
import { useCompare, type CompareItem } from "@/components/compare/CompareProvider";

/**
 * "Add to compare" toggle used inside result cards. Because cards are <Link>
 * wrappers, this stops propagation/default so tapping it never navigates.
 */
export function CompareButton({ item }: { item: CompareItem }) {
  const { has, toggle, atLimit } = useCompare();
  const active = has(item.id);
  const disabled = !active && atLimit;

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from compare" : "Add to compare"}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      className={[
        "absolute right-2.5 top-2.5 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-colors",
        active
          ? "border-brand bg-brand text-white"
          : "border-border bg-white/92 text-ink-soft hover:border-brand/40 hover:text-brand",
        disabled ? "cursor-not-allowed opacity-40" : "",
      ].join(" ")}
      title={
        disabled
          ? "Compare holds up to 4 items"
          : active
            ? "Remove from compare"
            : "Add to compare"
      }
    >
      {active ? <Check className="h-4 w-4" /> : <Scale className="h-4 w-4" />}
    </button>
  );
}
