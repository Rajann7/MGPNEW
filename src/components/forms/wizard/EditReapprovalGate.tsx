"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Batch 5 §45-49 — explicit confirmation before editing an already-reviewed
 * listing. The design's exact copy; only after "Edit anyway" does the real
 * form render, so no field can be touched (and no autosave can fire) before
 * the user has acknowledged the re-approval consequence.
 */
export function EditReapprovalGate({
  requiresConfirmation,
  backHref,
  children,
}: {
  requiresConfirmation: boolean;
  backHref: string;
  children: React.ReactNode;
}) {
  const [confirmed, setConfirmed] = useState(false);

  if (!requiresConfirmation || confirmed) return <>{children}</>;

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
      <h2 className="text-lg font-bold text-zinc-900">
        Editing will require re-approval
      </h2>
      <p className="mt-2 text-sm text-zinc-600">
        This listing is live. Saving changes sends it back to review; it
        stays hidden until approved again.
      </p>
      <div className="mt-5 flex items-center gap-3">
        <Button href={backHref} variant="outline">
          Cancel
        </Button>
        <Button type="button" onClick={() => setConfirmed(true)}>
          Edit anyway
        </Button>
      </div>
    </div>
  );
}
