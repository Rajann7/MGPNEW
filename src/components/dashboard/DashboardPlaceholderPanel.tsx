import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type PanelStatus = "coming_soon" | "setup_required" | "no_data";

const STATUS_LABEL: Record<PanelStatus, string> = {
  coming_soon: "Coming Soon",
  setup_required: "Setup Required",
  no_data: "No Data Yet",
};

const STATUS_CLASS: Record<PanelStatus, string> = {
  coming_soon: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  setup_required: "bg-red-500/10 text-red-500 dark:text-red-300",
  no_data: "bg-zinc-500/10 text-ink-muted",
};

/**
 * Shared panel for dashboard modules that are real but not fully built yet
 * (leads/CRM, billing, notifications, ads, agents, etc.). Never shows fake
 * data/counts — always an honest status pill + explanation + optional safe
 * secondary link (e.g. to the public pricing/support page).
 */
export function DashboardPlaceholderPanel({
  icon: Icon = Inbox,
  status,
  title,
  description,
  linkHref,
  linkLabel,
}: {
  icon?: LucideIcon;
  status: PanelStatus;
  title: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <Card className="text-center py-12">
      <div className="w-14 h-14 rounded-2xl bg-surface-subtle flex items-center justify-center mx-auto mb-4">
        <Icon
          className="w-7 h-7 text-ink-muted"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <span
        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${STATUS_CLASS[status]}`}
      >
        {STATUS_LABEL[status]}
      </span>
      <h2 className="text-base font-semibold text-ink mb-1">{title}</h2>
      <p className="text-sm text-ink-muted max-w-md mx-auto">{description}</p>
      {linkHref && linkLabel && (
        <Button href={linkHref} variant="outline" size="sm" className="mt-4">
          {linkLabel}
        </Button>
      )}
    </Card>
  );
}
