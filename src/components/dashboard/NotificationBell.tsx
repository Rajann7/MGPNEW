"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import {
  listNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/lib/actions/notifications";
import type { AppNotification } from "@/types";

/**
 * Real DB-backed notification dropdown (Prompt 08). Unread count and list
 * are always real — no fake badge, no fake events. External provider
 * delivery (email/SMS/WhatsApp/push) is a later phase; this is the in-app
 * foundation only.
 */
export function NotificationBell() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  useEffect(() => {
    listNotifications().then((result) => {
      if (result.success) {
        setItems(result.data.items);
        setUnreadCount(result.data.unreadCount);
      }
      setLoaded(true);
    });
  }, []);

  function handleToggle() {
    setOpen((v) => !v);
  }

  function handleNotificationClick(notification: AppNotification) {
    startTransition(async () => {
      if (!notification.read_at) {
        await markNotificationRead(notification.id);
        setUnreadCount((c) => Math.max(0, c - 1));
        setItems((prev) =>
          prev.map((n) =>
            n.id === notification.id
              ? { ...n, read_at: new Date().toISOString() }
              : n
          )
        );
      }
      setOpen(false);
      if (
        notification.target_type === "lead" ||
        notification.target_type === "message_thread"
      ) {
        router.push(`/dashboard/leads/${notification.target_id}`);
      } else if (notification.target_type === "proposal") {
        router.push(`/dashboard/messages`);
      }
    });
  }

  function handleMarkAllRead() {
    startTransition(async () => {
      const result = await markAllNotificationsRead();
      if (result.success) {
        setUnreadCount(0);
        setItems((prev) =>
          prev.map((n) => ({
            ...n,
            read_at: n.read_at ?? new Date().toISOString(),
          }))
        );
      }
    });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={handleToggle}
        className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-ink/5 dark:hover:bg-white/10 text-ink-soft transition-colors"
      >
        <Bell className="w-4 h-4" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-4 top-16 sm:absolute sm:inset-x-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-80 rounded-xl border border-border bg-surface shadow-lg z-30 overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Notifications</p>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                disabled={isPending}
                className="text-xs text-brand hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          {!loaded ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-ink-muted">Loading…</p>
            </div>
          ) : items.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-ink-muted">No notifications yet.</p>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {items.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => handleNotificationClick(n)}
                  className={`w-full text-left px-4 py-3 border-b border-border last:border-0 hover:bg-ink/5 dark:hover:bg-white/10 transition-colors ${!n.read_at ? "bg-brand-soft/40" : ""}`}
                >
                  <p className="text-sm text-ink font-medium">{n.title}</p>
                  {n.body && (
                    <p className="text-xs text-ink-muted mt-0.5 line-clamp-2">
                      {n.body}
                    </p>
                  )}
                  <p className="text-[11px] text-ink-muted mt-1">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
