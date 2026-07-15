"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { MessageSquare } from "lucide-react";
import { listThreads, archiveThread } from "@/lib/actions/messages";
import type { ThreadRow } from "@/lib/actions/messages";

type FilterTab = "all" | "unread" | "archived";
const PAGE_SIZE = 20;

export function ThreadListClient({
  initialItems,
  initialTotal,
}: {
  initialItems: ThreadRow[];
  initialTotal: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const didMount = useRef(false);

  function fetchThreads(nextTab: FilterTab, nextSearch: string, nextPage: number) {
    startTransition(async () => {
      const result = await listThreads(nextTab, nextSearch, nextPage, PAGE_SIZE);
      if (result.success) {
        setItems(result.data.items);
        setTotal(result.data.total);
      }
    });
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    setPage(1);
    fetchThreads(tab, search, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  useEffect(() => {
    if (!didMount.current) return;
    const timeout = setTimeout(() => {
      setPage(1);
      fetchThreads(tab, search, 1);
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function goToPage(p: number) {
    setPage(p);
    fetchThreads(tab, search, p);
  }

  function handleArchiveToggle(threadId: string, archived: boolean) {
    startTransition(async () => {
      const result = await archiveThread(threadId, archived);
      if (result.success) fetchThreads(tab, search, page);
    });
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1 bg-zinc-100 rounded-lg p-1">
          {(["all", "unread", "archived"] as FilterTab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize ${
                tab === t ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search conversations…"
          className="flex-1 min-w-[160px] px-3 py-2 rounded-lg border border-zinc-300 text-sm"
        />
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title={
            tab === "archived"
              ? "No archived conversations"
              : tab === "unread"
                ? "No unread conversations"
                : "No messages yet"
          }
          description="Conversations with interested users will appear here."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((thread) => (
            <Card key={thread.id}>
              <div className="flex items-center justify-between gap-2">
                <Link
                  href={
                    thread.lead_id
                      ? `/dashboard/leads/${thread.lead_id}`
                      : "/dashboard/messages"
                  }
                  className="min-w-0 flex-1"
                >
                  <p className="text-sm font-semibold text-zinc-900 truncate">
                    {thread.counterpartName}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate">
                    {thread.lastMessagePreview ?? "No messages yet"}
                  </p>
                </Link>
                <div className="flex items-center gap-2 shrink-0">
                  {thread.unreadCount > 0 && (
                    <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-brand text-white text-[11px] font-semibold flex items-center justify-center">
                      {thread.unreadCount}
                    </span>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => handleArchiveToggle(thread.id, !thread.isArchivedByMe)}
                  >
                    {thread.isArchivedByMe ? "Unarchive" : "Archive"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-1">
          <Button
            size="sm"
            variant="outline"
            disabled={isPending || page <= 1}
            onClick={() => goToPage(page - 1)}
          >
            Previous
          </Button>
          <span className="text-xs text-zinc-500">
            Page {page} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={isPending || page >= totalPages}
            onClick={() => goToPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
