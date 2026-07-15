"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  MessageSquare,
  Home,
  ClipboardList,
  FileText,
  CalendarClock,
} from "lucide-react";
import { listThreads, archiveThread } from "@/lib/actions/messages";
import type { ThreadRow, ThreadSource } from "@/lib/actions/messages";
import { updateLeadStage } from "@/lib/actions/leads";

type FilterTab = "all" | "unread" | "archived";
type SourceTab = "all" | ThreadSource;
const PAGE_SIZE = 20;

const SOURCE_META: Record<
  ThreadSource,
  { label: string; icon: typeof Home }
> = {
  lead: { label: "Lead", icon: Home },
  requirement: { label: "Requirement", icon: ClipboardList },
  proposal: { label: "Proposal", icon: FileText },
  site_visit: { label: "Site Visit", icon: CalendarClock },
  message: { label: "Message", icon: MessageSquare },
};

const SOURCE_TABS: SourceTab[] = [
  "all",
  "lead",
  "requirement",
  "proposal",
  "site_visit",
  "message",
];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  open: "bg-blue-50 text-blue-700",
  contacted: "bg-amber-50 text-amber-700",
  interested: "bg-amber-50 text-amber-700",
  negotiation: "bg-amber-50 text-amber-700",
  requested: "bg-amber-50 text-amber-700",
  accepted: "bg-brand-soft text-brand",
  scheduled: "bg-brand-soft text-brand",
  rescheduled: "bg-brand-soft text-brand",
  sent: "bg-blue-50 text-blue-700",
  viewed: "bg-amber-50 text-amber-700",
  converted: "bg-brand-soft text-brand",
  closed: "bg-zinc-100 text-zinc-500",
  lost: "bg-zinc-100 text-zinc-500",
  rejected: "bg-red-50 text-red-600",
  cancelled: "bg-zinc-100 text-zinc-500",
};

const QUICK_STAGES: { label: string; stage: string }[] = [
  { label: "Contacted", stage: "contacted" },
  { label: "In Process", stage: "negotiation" },
  { label: "Closed", stage: "closed" },
];

function statusLabel(status: string | null): string {
  if (!status) return "";
  return status
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export function ThreadListClient({
  initialItems,
  initialTotal,
}: {
  initialItems: ThreadRow[];
  initialTotal: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<FilterTab>("all");
  const [sourceTab, setSourceTab] = useState<SourceTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [statusMenuThreadId, setStatusMenuThreadId] = useState<string | null>(
    null
  );
  const didMount = useRef(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function fetchThreads(
    nextTab: FilterTab,
    nextSourceTab: SourceTab,
    nextSearch: string,
    nextPage: number
  ) {
    startTransition(async () => {
      const result = await listThreads(
        nextTab,
        nextSearch,
        nextPage,
        PAGE_SIZE,
        nextSourceTab === "all" ? undefined : nextSourceTab
      );
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
    fetchThreads(tab, sourceTab, search, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, sourceTab]);

  useEffect(() => {
    if (!didMount.current) return;
    const timeout = setTimeout(() => {
      setPage(1);
      fetchThreads(tab, sourceTab, search, 1);
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function goToPage(p: number) {
    setPage(p);
    fetchThreads(tab, sourceTab, search, p);
  }

  function handleArchiveToggle(threadId: string, archived: boolean) {
    startTransition(async () => {
      const result = await archiveThread(threadId, archived);
      if (result.success) fetchThreads(tab, sourceTab, search, page);
    });
  }

  function handleQuickStage(leadId: string, stage: string) {
    startTransition(async () => {
      await updateLeadStage(leadId, stage);
      setStatusMenuThreadId(null);
      fetchThreads(tab, sourceTab, search, page);
    });
  }

  function startLongPress(threadId: string, hasLead: boolean) {
    if (!hasLead) return;
    longPressTimer.current = setTimeout(() => {
      setStatusMenuThreadId(threadId);
    }, 500);
  }

  function cancelLongPress() {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
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

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {SOURCE_TABS.map((s) => {
          const meta = s === "all" ? null : SOURCE_META[s];
          const Icon = meta?.icon;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setSourceTab(s)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
                sourceTab === s
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-zinc-600 border-zinc-200"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {s === "all" ? "All" : meta!.label}
              {s !== "all" && meta!.label !== "Requirement" ? "s" : ""}
            </button>
          );
        })}
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
          {items.map((thread) => {
            const meta = SOURCE_META[thread.source];
            const Icon = meta.icon;
            const canQuickStage =
              !!thread.lead_id &&
              (thread.source === "lead" || thread.source === "requirement");
            return (
              <Card
                key={thread.id}
                className={
                  thread.isUrgent
                    ? "border-brand/40 bg-brand-soft/40"
                    : undefined
                }
              >
                <div
                  className="flex items-center justify-between gap-2"
                  onContextMenu={(e) => {
                    if (!canQuickStage) return;
                    e.preventDefault();
                    setStatusMenuThreadId(thread.id);
                  }}
                  onTouchStart={() => startLongPress(thread.id, canQuickStage)}
                  onTouchEnd={cancelLongPress}
                  onTouchMove={cancelLongPress}
                >
                  <Link
                    href={
                      thread.lead_id
                        ? `/dashboard/leads/${thread.lead_id}`
                        : "/dashboard/messages"
                    }
                    className="min-w-0 flex-1 flex items-start gap-3"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-full bg-brand-soft text-brand flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-zinc-900 truncate">
                          {thread.counterpartName}
                        </span>
                        {thread.contextStatus && (
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                              STATUS_COLORS[thread.contextStatus] ??
                              "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            {statusLabel(thread.contextStatus)}
                          </span>
                        )}
                        {thread.isUrgent && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-brand text-white">
                            Reply soon
                          </span>
                        )}
                      </span>
                      {thread.contextTitle && (
                        <span className="block text-xs text-zinc-500 truncate">
                          {meta.label} · {thread.contextTitle}
                        </span>
                      )}
                      <span className="block text-xs text-zinc-500 mt-0.5 truncate">
                        {thread.lastMessagePreview ?? "No messages yet"}
                      </span>
                    </span>
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
                      onClick={() =>
                        handleArchiveToggle(thread.id, !thread.isArchivedByMe)
                      }
                    >
                      {thread.isArchivedByMe ? "Unarchive" : "Archive"}
                    </Button>
                  </div>
                </div>

                {statusMenuThreadId === thread.id && canQuickStage && (
                  <div className="mt-2 pt-2 border-t border-zinc-100 flex flex-wrap gap-2">
                    {QUICK_STAGES.map((q) => (
                      <button
                        key={q.stage}
                        type="button"
                        disabled={isPending}
                        onClick={() =>
                          handleQuickStage(thread.lead_id as string, q.stage)
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                      >
                        {q.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setStatusMenuThreadId(null)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </Card>
            );
          })}
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
