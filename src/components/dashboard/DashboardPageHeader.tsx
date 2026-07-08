import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DashboardPageHeader({
  title,
  count,
  itemLabel,
  itemLabelPlural,
  actionLabel,
  actionHref,
}: {
  title: string;
  count: number;
  itemLabel: string;
  itemLabelPlural?: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <div className="flex items-center justify-between mb-6 gap-3">
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-zinc-900 truncate">{title}</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          {count}{" "}
          {count === 1 ? itemLabel : (itemLabelPlural ?? `${itemLabel}s`)}
        </p>
      </div>
      <Button href={actionHref} className="shrink-0">
        <Plus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
        {actionLabel}
      </Button>
    </div>
  );
}
