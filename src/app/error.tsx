"use client";

import { useEffect } from "react";
import { ErrorStateCard } from "@/components/ui/ErrorState";

/**
 * Global route error boundary — shows the shared safe error card (Batch 1
 * error-state pattern). Never exposes stack traces, SQL or provider details.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Server logs carry the technical detail; the client log keeps only a digest.
    console.error("Route error", error.digest ?? error.message);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-md items-center px-4">
      <ErrorStateCard
        actionLabel="Try again"
        onAction={reset}
        className="w-full"
      />
    </div>
  );
}
