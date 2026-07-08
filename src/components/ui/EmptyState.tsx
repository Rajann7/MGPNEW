import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { Button } from "./Button";

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-zinc-200">
      <div className="w-14 h-14 bg-zinc-100 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon
          className="w-7 h-7 text-zinc-400"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <h2 className="text-base font-semibold text-zinc-900 mb-1">{title}</h2>
      <p className="text-sm text-zinc-500 mb-5">{description}</p>
      {actionLabel && actionHref && (
        <Button href={actionHref}>{actionLabel}</Button>
      )}
    </div>
  );
}
