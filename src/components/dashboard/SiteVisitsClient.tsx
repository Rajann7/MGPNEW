"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CalendarClock, MapPin, Check, X, Clock3 } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { useOverlay } from "@/components/ui/useOverlay";
import {
  respondSiteVisit,
  rescheduleSiteVisit,
  cancelSiteVisit,
} from "@/lib/actions/site-visits";
import type { SiteVisit, SiteVisitStatus } from "@/types";

export interface SiteVisitRow extends SiteVisit {
  /** Enriched, real display data resolved server-side. */
  entityTitle: string | null;
  entityHref: string | null;
  counterpartName: string | null;
  /** True when the current user is the host (owner/broker/builder side). */
  isHost: boolean;
}

const STATUS_META: Record<SiteVisitStatus, { label: string; cls: string }> = {
  requested: { label: "Requested", cls: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  accepted: { label: "Accepted", cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  scheduled: { label: "Scheduled", cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  rescheduled: { label: "Rescheduled", cls: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  cancelled: { label: "Cancelled", cls: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20" },
  completed: { label: "Completed", cls: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20" },
  no_show: { label: "No Show", cls: "bg-red-500/10 text-red-600 border-red-500/20" },
  rejected: { label: "Rejected", cls: "bg-red-500/10 text-red-600 border-red-500/20" },
  expired: { label: "Expired", cls: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20" },
};

const LOCATION_LABEL: Record<SiteVisit["meeting_location_type"], string> = {
  at_property: "At the property",
  office: "At the office",
  other: "Other location",
};

const UPCOMING: SiteVisitStatus[] = ["requested", "accepted", "scheduled", "rescheduled"];

const ERR: Record<string, string> = {
  AUTH_REQUIRED: "Please log in again.",
  FORBIDDEN: "You can't act on this visit.",
  NOT_PARTICIPANT: "You can't act on this visit.",
  ENTITY_NOT_FOUND: "This visit no longer exists.",
  INVALID_STATUS_TRANSITION: "That action isn't allowed from the current status.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
};

type ActionType = "reject" | "reschedule" | "cancel";

function StatusBadge({ status }: { status: SiteVisitStatus }) {
  const m = STATUS_META[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${m.cls}`}>
      {m.label}
    </span>
  );
}

function formatWhen(iso: string | null): string {
  if (!iso) return "Time to be confirmed";
  return new Date(iso).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function SiteVisitsClient({
  items,
  emptyHint,
}: {
  items: SiteVisitRow[];
  emptyHint?: string;
}) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [modal, setModal] = useState<{ type: ActionType; visit: SiteVisitRow } | null>(null);

  const upcoming = items.filter((v) => UPCOMING.includes(v.status));
  const past = items.filter((v) => !UPCOMING.includes(v.status));
  const shown = tab === "upcoming" ? upcoming : past;

  function run(id: string, fn: () => Promise<{ success: boolean; error?: string }>) {
    setError(null);
    setBusyId(id);
    startTransition(async () => {
      const res = await fn();
      setBusyId(null);
      if (!res.success) {
        setError(ERR[res.error ?? "UNKNOWN_ERROR"] ?? res.error ?? "Error");
        return;
      }
      setModal(null);
      router.refresh();
    });
  }

  return (
    <div>
      {/* Tabs */}
      <div className="mb-4 flex w-fit items-center gap-1 rounded-xl border border-border bg-surface p-1">
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-brand text-white" : "text-muted hover:text-ink"
            }`}
          >
            {t} ({t === "upcoming" ? upcoming.length : past.length})
          </button>
        ))}
      </div>

      {error && (
        <Alert tone="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {shown.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
          <CalendarClock className="mb-3 h-9 w-9 text-muted" aria-hidden="true" />
          <p className="text-sm font-semibold text-ink">No {tab} site visits</p>
          <p className="mt-1 max-w-xs text-xs text-muted">
            {emptyHint ??
              "When a visit is requested on one of your listings, it appears here."}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {shown.map((v) => (
            <li key={v.id} className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={v.status} />
                    <span className="text-xs text-muted">
                      {v.isHost ? "Requested by" : "Hosted by"}{" "}
                      {v.counterpartName ?? "a member"}
                    </span>
                  </div>
                  {v.entityTitle ? (
                    v.entityHref ? (
                      <Link
                        href={v.entityHref}
                        className="mt-1.5 block truncate text-[15px] font-semibold text-ink hover:text-brand"
                      >
                        {v.entityTitle}
                      </Link>
                    ) : (
                      <p className="mt-1.5 truncate text-[15px] font-semibold text-ink">
                        {v.entityTitle}
                      </p>
                    )
                  ) : (
                    <p className="mt-1.5 text-[15px] font-semibold text-muted">Listing unavailable</p>
                  )}
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" />
                      {formatWhen(v.scheduled_at)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {LOCATION_LABEL[v.meeting_location_type]}
                    </span>
                  </div>
                  {v.meeting_note && (
                    <p className="mt-2 rounded-lg bg-bg px-2.5 py-1.5 text-xs text-muted">
                      “{v.meeting_note}”
                    </p>
                  )}
                  {v.status === "cancelled" && v.cancel_reason && (
                    <p className="mt-2 text-xs text-red-600">Cancelled: {v.cancel_reason}</p>
                  )}
                </div>

                {UPCOMING.includes(v.status) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {v.isHost && v.status === "requested" && (
                      <>
                        <button
                          type="button"
                          disabled={isPending && busyId === v.id}
                          onClick={() => run(v.id, () => respondSiteVisit(v.id, "accept"))}
                          className="inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-hover disabled:opacity-60"
                        >
                          <Check className="h-3.5 w-3.5" /> Accept
                        </button>
                        <button
                          type="button"
                          disabled={isPending && busyId === v.id}
                          onClick={() => setModal({ type: "reject", visit: v })}
                          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-500/5 disabled:opacity-60"
                        >
                          <X className="h-3.5 w-3.5" /> Reject
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      disabled={isPending && busyId === v.id}
                      onClick={() => setModal({ type: "reschedule", visit: v })}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-ink hover:bg-bg disabled:opacity-60"
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      disabled={isPending && busyId === v.id}
                      onClick={() => setModal({ type: "cancel", visit: v })}
                      className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted hover:text-ink disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {modal && (
        <ActionModal
          type={modal.type}
          visit={modal.visit}
          pending={isPending}
          onClose={() => setModal(null)}
          onReject={(id) => run(id, () => respondSiteVisit(id, "reject"))}
          onReschedule={(id, whenIso) => run(id, () => rescheduleSiteVisit(id, whenIso))}
          onCancel={(id, reason) => run(id, () => cancelSiteVisit(id, reason))}
        />
      )}
    </div>
  );
}

/**
 * Desktop modal / mobile bottom-sheet for the temporary reject + reschedule +
 * cancel confirmations (design B6-S09). Reject is a clean confirm (the backend
 * records the decline; no reason field is shown because none is stored — no
 * fake capture). Reschedule takes a real datetime. Cancel captures a reason
 * that is genuinely stored in site_visits.cancel_reason.
 */
function ActionModal({
  type,
  visit,
  pending,
  onClose,
  onReject,
  onReschedule,
  onCancel,
}: {
  type: ActionType;
  visit: SiteVisitRow;
  pending: boolean;
  onClose: () => void;
  onReject: (id: string) => void;
  onReschedule: (id: string, whenIso: string) => void;
  onCancel: (id: string, reason?: string) => void;
}) {
  const [when, setWhen] = useState("");
  const [reason, setReason] = useState("");
  const [localErr, setLocalErr] = useState<string | null>(null);
  const contentRef = useOverlay({ open: true, onClose, closeOnEscape: !pending });

  const title =
    type === "reject"
      ? "Decline this visit request?"
      : type === "reschedule"
        ? "Propose a new time"
        : "Cancel this site visit?";

  function submit() {
    if (type === "reject") return onReject(visit.id);
    if (type === "reschedule") {
      if (!when) {
        setLocalErr("Pick a new date & time.");
        return;
      }
      const d = new Date(when);
      if (Number.isNaN(d.getTime())) {
        setLocalErr("That date/time isn't valid.");
        return;
      }
      if (d.getTime() < Date.now()) {
        setLocalErr("Pick a time in the future.");
        return;
      }
      return onReschedule(visit.id, d.toISOString());
    }
    return onCancel(visit.id, reason.trim() || undefined);
  }

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-[rgba(24,24,27,0.45)]" aria-hidden="true" onClick={onClose} />
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative z-10 w-full rounded-t-[20px] bg-surface shadow-[0_12px_32px_rgba(0,0,0,0.2)] sm:w-full sm:max-w-[420px] sm:rounded-[16px]"
      >
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <span className="h-1 w-9 rounded-full bg-border" />
        </div>
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
          {visit.entityTitle && (
            <p className="mt-0.5 text-xs text-muted">{visit.entityTitle}</p>
          )}
        </div>

        <div className="px-5 py-4">
          {type === "reject" && (
            <p className="text-[13px] leading-relaxed text-muted">
              The requester will be notified that this visit was declined. This
              can&apos;t be undone.
            </p>
          )}
          {type === "reschedule" && (
            <label className="block">
              <span className="mb-1 block text-[13px] font-medium text-ink">New date &amp; time</span>
              <input
                type="datetime-local"
                value={when}
                onChange={(e) => {
                  setWhen(e.target.value);
                  setLocalErr(null);
                }}
                className="form-input w-full"
              />
            </label>
          )}
          {type === "cancel" && (
            <label className="block">
              <span className="mb-1 block text-[13px] font-medium text-ink">
                Reason <span className="font-normal text-muted">(optional)</span>
              </span>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                maxLength={300}
                placeholder="Let the other person know why…"
                className="form-input w-full resize-y"
              />
            </label>
          )}
          {localErr && <p className="mt-2 text-xs text-red-600">{localErr}</p>}
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-3.5">
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-muted hover:text-ink disabled:opacity-60"
          >
            Keep it
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={pending}
            className={`rounded-lg px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-60 ${
              type === "reschedule" ? "bg-brand hover:bg-brand-hover" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {pending
              ? "Working…"
              : type === "reject"
                ? "Decline visit"
                : type === "reschedule"
                  ? "Propose new time"
                  : "Cancel visit"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
