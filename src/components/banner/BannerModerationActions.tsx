"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { moderateBanner } from "@/lib/banner/actions";

/** Admin moderation controls for a banner ad. Reason required for reject /
 *  request-changes; an inline "This action will be logged." note is shown. */
export function BannerModerationActions({ id, status, isPaused }: { id: string; status: string; isPaused: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [mode, setMode] = useState<null | "reject" | "request_changes">(null);
  const [reason, setReason] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function call(action: "approve" | "reject" | "request_changes" | "pause" | "resume", r?: string) {
    setMsg(null);
    start(async () => {
      const res = await moderateBanner({ id, action, reason: r });
      setMsg({ ok: res.ok, text: res.message });
      if (res.ok) { setMode(null); setReason(""); router.refresh(); }
    });
  }

  return (
    <div className="mt-3 border-t border-border pt-3">
      {!mode ? (
        <div className="flex flex-wrap gap-2">
          {status === "pending" && (
            <button type="button" disabled={pending} onClick={() => call("approve")} className="rounded-lg bg-success/10 px-3 py-1.5 text-xs font-semibold text-success hover:bg-success/20 disabled:opacity-50">Approve &amp; schedule</button>
          )}
          {status === "pending" && (
            <button type="button" disabled={pending} onClick={() => setMode("request_changes")} className="rounded-lg bg-warning/10 px-3 py-1.5 text-xs font-semibold text-warning hover:bg-warning/20 disabled:opacity-50">Request changes</button>
          )}
          {status !== "rejected" && (
            <button type="button" disabled={pending} onClick={() => setMode("reject")} className="rounded-lg px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/5 disabled:opacity-50">Reject</button>
          )}
          {status === "active" && !isPaused && (
            <button type="button" disabled={pending} onClick={() => call("pause")} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-ink hover:bg-surface-muted disabled:opacity-50">Pause</button>
          )}
          {status === "active" && isPaused && (
            <button type="button" disabled={pending} onClick={() => call("resume")} className="rounded-lg bg-success/10 px-3 py-1.5 text-xs font-semibold text-success hover:bg-success/20 disabled:opacity-50">Resume</button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={2}
            placeholder={mode === "reject" ? "Reason for rejection (shown to advertiser)" : "What needs to change?"}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand" />
          <div className="flex gap-2">
            <button type="button" disabled={pending || !reason.trim()} onClick={() => call(mode, reason)} className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-hover disabled:opacity-50">
              {pending ? "…" : mode === "reject" ? "Confirm reject" : "Send change request"}
            </button>
            <button type="button" onClick={() => { setMode(null); setReason(""); }} className="rounded-lg border border-border px-3 py-1.5 text-xs text-ink hover:bg-surface-muted">Cancel</button>
          </div>
        </div>
      )}
      <p className="mt-2 text-[11px] text-ink-muted">This action will be logged.</p>
      {msg && <p className={`mt-1 text-xs ${msg.ok ? "text-success" : "text-danger"}`}>{msg.text}</p>}
    </div>
  );
}
