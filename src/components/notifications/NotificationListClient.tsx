"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Bell } from "lucide-react";
import {
  markNotificationRead,
  markAllNotificationsRead,
} from "@/lib/actions/notifications";
import type { AppNotification } from "@/types";

export function NotificationListClient({
  items,
  unreadCount,
}: {
  items: AppNotification[];
  unreadCount: number;
}) {
  const router = useRouter();
  const [list, setList] = useState(items);
  const [isPending, startTransition] = useTransition();

  function handleClick(n: AppNotification) {
    startTransition(async () => {
      if (!n.read_at) {
        await markNotificationRead(n.id);
        setList((prev) =>
          prev.map((x) =>
            x.id === n.id ? { ...x, read_at: new Date().toISOString() } : x
          )
        );
      }
      if (n.target_type === "lead" || n.target_type === "message_thread") {
        router.push(`/dashboard/leads/${n.target_id}`);
      }
    });
  }

  function handleMarkAll() {
    startTransition(async () => {
      const result = await markAllNotificationsRead();
      if (result.success) {
        setList((prev) =>
          prev.map((n) => ({
            ...n,
            read_at: n.read_at ?? new Date().toISOString(),
          }))
        );
        router.refresh();
      }
    });
  }

  if (list.length === 0) {
    return (
      <EmptyState
        icon={Bell}
        title="No notifications yet"
        description="Notifications for leads, messages, proposals and site visits will appear here — never a fake count."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={handleMarkAll}
          >
            Mark all read
          </Button>
        </div>
      )}
      {list.map((n) => (
        <Card
          key={n.id}
          interactive
          className={!n.read_at ? "border-brand/40" : undefined}
        >
          <button
            type="button"
            onClick={() => handleClick(n)}
            className="w-full text-left"
          >
            <p className="text-sm font-medium text-zinc-900">{n.title}</p>
            {n.body && <p className="text-xs text-zinc-500 mt-0.5">{n.body}</p>}
            <p className="text-[11px] text-zinc-400 mt-1">
              {new Date(n.created_at).toLocaleString()}
            </p>
          </button>
        </Card>
      ))}
    </div>
  );
}
