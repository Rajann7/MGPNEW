import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { MessageSquare } from "lucide-react";
import type { ThreadRow } from "@/lib/actions/messages";

export function ThreadListClient({ items }: { items: ThreadRow[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No messages yet"
        description="Conversations with interested users will appear here."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((thread) => (
        <Link
          key={thread.id}
          href={
            thread.lead_id
              ? `/dashboard/leads/${thread.lead_id}`
              : "/dashboard/messages"
          }
        >
          <Card interactive>
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900 truncate">
                  {thread.counterpartName}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5 truncate">
                  {thread.lastMessagePreview ?? "No messages yet"}
                </p>
              </div>
              {thread.unreadCount > 0 && (
                <span className="shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-brand text-white text-[11px] font-semibold flex items-center justify-center">
                  {thread.unreadCount}
                </span>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
