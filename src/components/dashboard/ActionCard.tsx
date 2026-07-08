import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export interface ActionCardItem {
  title: string;
  description: string;
  href: string;
  status: "active" | "coming_soon" | "setup_required";
}

const STATUS_LABEL: Record<
  Exclude<ActionCardItem["status"], "active">,
  string
> = {
  coming_soon: "Soon",
  setup_required: "Setup",
};

const STATUS_CLASS: Record<
  Exclude<ActionCardItem["status"], "active">,
  string
> = {
  coming_soon: "bg-amber-50 text-amber-600",
  setup_required: "bg-red-50 text-red-500",
};

export function ActionCardGrid({ items }: { items: ActionCardItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {items.map((item) => (
        <ActionCard key={item.title} {...item} />
      ))}
    </div>
  );
}

function ActionCard({ title, description, href, status }: ActionCardItem) {
  const isActive = status === "active";
  return (
    <Card
      interactive={isActive}
      muted={!isActive}
      className={cn(!isActive && "opacity-75")}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900">{title}</p>
          <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
        </div>
        {!isActive && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0",
              STATUS_CLASS[status]
            )}
          >
            {STATUS_LABEL[status]}
          </span>
        )}
      </div>
      {isActive && (
        <a
          href={href}
          className="mt-3 text-xs text-brand font-medium hover:underline inline-block"
        >
          Open →
        </a>
      )}
    </Card>
  );
}
