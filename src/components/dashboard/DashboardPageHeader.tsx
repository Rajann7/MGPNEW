import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DashboardPageHeader({
  title,
  count,
  itemLabel,
  itemLabelPlural,
  actionLabel,
  actionHref,
  /** Hide the button below `sm` — used when a compact "+" already sits in the mobile back header. */
  hideActionOnMobile,
  /** Tighter bottom margin at `sm+` — used inside a wrapping bordered panel. */
  dense,
}: {
  title: string;
  count: number;
  itemLabel: string;
  itemLabelPlural?: string;
  actionLabel: string;
  actionHref: string;
  hideActionOnMobile?: boolean;
  dense?: boolean;
}) {
  return (
    <div
      className={
        dense
          ? "flex items-center justify-between mb-6 sm:mb-3 gap-3"
          : "flex items-center justify-between mb-6 gap-3"
      }
    >
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-zinc-900 truncate">{title}</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          {count}{" "}
          {count === 1 ? itemLabel : (itemLabelPlural ?? `${itemLabel}s`)}
        </p>
      </div>
      <div
        className={hideActionOnMobile ? "hidden sm:block shrink-0" : "shrink-0"}
      >
        <Button href={actionHref}>
          <Plus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
