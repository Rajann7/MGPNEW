"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { HardHat, Trash2, Plus, CheckCircle2 } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import {
  addConstructionUpdate,
  deleteConstructionUpdate,
  type ConstructionUpdate,
} from "@/lib/actions/construction";
import {
  CONSTRUCTION_STAGES,
  constructionStageLabel,
} from "@/lib/projects/construction";

const ERR: Record<string, string> = {
  AUTH_REQUIRED: "Please log in again.",
  FORBIDDEN: "You can only update your own project.",
  VALIDATION_ERROR: "Please check the fields and try again.",
  ENTITY_NOT_FOUND: "That update no longer exists.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
};

export function ConstructionProgressClient({
  projectId,
  currentStage,
  initialUpdates,
}: {
  projectId: string;
  currentStage: string | null;
  initialUpdates: ConstructionUpdate[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [stage, setStage] = useState<string>(
    currentStage ?? CONSTRUCTION_STAGES[1].value
  );
  const [percent, setPercent] = useState<string>("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const stageIndex = CONSTRUCTION_STAGES.findIndex((s) => s.value === (currentStage ?? stage));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Add a short title for this milestone.");
      return;
    }
    startTransition(async () => {
      const res = await addConstructionUpdate(projectId, {
        stage,
        progressPercent: percent === "" ? null : Number(percent),
        title,
        note,
        updateDate: date,
      });
      if (!res.success) {
        setError(ERR[res.error ?? "UNKNOWN_ERROR"] ?? "Error");
        return;
      }
      setTitle("");
      setNote("");
      setPercent("");
      router.refresh();
    });
  }

  function remove(id: string) {
    setError(null);
    setBusyId(id);
    startTransition(async () => {
      const res = await deleteConstructionUpdate(id);
      setBusyId(null);
      if (!res.success) {
        setError(ERR[res.error ?? "UNKNOWN_ERROR"] ?? "Error");
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* Timeline */}
      <div>
        {/* Stage stepper (honest — reflects the real current construction_status) */}
        <div className="mb-5 rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <h3 className="mb-3 text-sm font-semibold text-ink">Current stage</h3>
          <ol className="flex flex-wrap gap-2">
            {CONSTRUCTION_STAGES.map((s, i) => {
              const done = stageIndex >= 0 && i <= stageIndex;
              const isCurrent = i === stageIndex;
              return (
                <li
                  key={s.value}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                    isCurrent
                      ? "border-brand bg-brand text-white"
                      : done
                        ? "border-brand/30 bg-brand-soft text-brand"
                        : "border-border bg-bg text-muted"
                  }`}
                >
                  {done && <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />}
                  {s.label}
                </li>
              );
            })}
          </ol>
          {stageIndex < 0 && (
            <p className="mt-2 text-xs text-muted">
              No stage set yet — post your first milestone below.
            </p>
          )}
        </div>

        {error && (
          <Alert tone="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <h3 className="mb-3 text-sm font-semibold text-ink">Milestone history</h3>
        {initialUpdates.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
            <HardHat className="mb-3 h-9 w-9 text-muted" aria-hidden="true" />
            <p className="text-sm font-semibold text-ink">No updates posted yet</p>
            <p className="mt-1 max-w-xs text-xs text-muted">
              Post construction milestones so buyers can see genuine progress on
              your public project page.
            </p>
          </div>
        ) : (
          <ol className="relative space-y-4 border-l border-border pl-5">
            {initialUpdates.map((u) => (
              <li key={u.id} className="relative">
                <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-brand bg-surface" />
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-brand/30 bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand">
                        {constructionStageLabel(u.stage)}
                      </span>
                      {u.progress_percent != null && (
                        <span className="text-xs font-semibold text-ink">
                          {u.progress_percent}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted">
                        {new Date(u.update_date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <button
                        type="button"
                        disabled={isPending && busyId === u.id}
                        onClick={() => remove(u.id)}
                        aria-label="Delete update"
                        className="rounded-md p-1 text-muted hover:bg-red-500/10 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-ink">{u.title}</p>
                  {u.note && <p className="mt-1 text-xs text-muted">{u.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Add-update form */}
      <form
        onSubmit={submit}
        className="h-fit rounded-2xl border border-border bg-surface p-4 sm:p-5 lg:sticky lg:top-4"
      >
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
          <Plus className="h-4 w-4 text-brand" aria-hidden="true" /> Post a milestone
        </h3>
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink">Stage</span>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="form-input w-full"
            >
              {CONSTRUCTION_STAGES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink">Title</span>
            <input
              type="text"
              value={title}
              maxLength={160}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 5th floor slab completed"
              className="form-input w-full"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-ink">
                Progress %{" "}
                <span className="font-normal text-muted">(optional)</span>
              </span>
              <input
                type="number"
                min={0}
                max={100}
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
                placeholder="—"
                className="form-input w-full"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-ink">Date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input w-full"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink">
              Note <span className="font-normal text-muted">(optional)</span>
            </span>
            <textarea
              rows={3}
              value={note}
              maxLength={1000}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add context buyers would find useful…"
              className="form-input w-full resize-y"
            />
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60"
          >
            {isPending ? "Posting…" : "Post milestone"}
          </button>
          <p className="text-[11px] leading-relaxed text-muted">
            Milestones are real and buyer-visible on published projects. Keep them
            accurate — nothing is simulated.
          </p>
        </div>
      </form>
    </div>
  );
}
