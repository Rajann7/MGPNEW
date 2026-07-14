"use client";

import Link from "next/link";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { setBannerPaused, renewBanner } from "@/lib/banner/actions";
import { isExpired } from "@/lib/banner/config";

/** Advertiser actions on a banner row: edit / pause / resume / renew. */
export function BannerListActions({ id, status, endDate, isPaused }: { id: string; status: string; endDate: string | null; isPaused: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const expired = status === "active" && isExpired(endDate);
  const editable = ["draft", "needs_changes", "rejected"].includes(status);

  function pause(next: boolean) {
    setErr(null);
    start(async () => { const r = await setBannerPaused({ id, paused: next }); if (r.ok) router.refresh(); else setErr(r.message); });
  }
  function renew() {
    setErr(null);
    start(async () => { const r = await renewBanner({ id }); if (r.ok) router.refresh(); else setErr(r.message); });
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
      {editable && (
        <Link href={`/dashboard/builder/ads/${id}/edit`} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-ink hover:bg-surface-muted">Edit</Link>
      )}
      {status === "active" && !expired && !isPaused && (
        <button type="button" disabled={pending} onClick={() => pause(true)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-ink hover:bg-surface-muted disabled:opacity-50">Pause</button>
      )}
      {status === "active" && !expired && isPaused && (
        <button type="button" disabled={pending} onClick={() => pause(false)} className="rounded-lg bg-success/10 px-3 py-1.5 text-xs font-semibold text-success hover:bg-success/20 disabled:opacity-50">Resume</button>
      )}
      {expired && (
        <button type="button" disabled={pending} onClick={renew} className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-hover disabled:opacity-50">Renew</button>
      )}
      {err && <span className="text-[11px] text-danger">{err}</span>}
    </div>
  );
}
