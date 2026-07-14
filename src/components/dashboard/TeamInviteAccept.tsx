"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/Alert";
import { acceptTeamInvite } from "@/lib/actions/team";

const ERR: Record<string, string> = {
  AUTH_REQUIRED: "Please log in again.",
  ENTITY_NOT_FOUND: "This invite no longer exists.",
  INVITE_REVOKED: "This invite has been revoked.",
  ALREADY_CLAIMED: "This invite was already accepted by someone else.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
};

export function TeamInviteAccept({
  token,
  alreadyMember,
}: {
  token: string;
  alreadyMember: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function accept() {
    setError(null);
    startTransition(async () => {
      const res = await acceptTeamInvite(token);
      if (!res.success) {
        setError(ERR[res.error ?? "UNKNOWN_ERROR"] ?? "Error");
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/dashboard/builder"), 1200);
    });
  }

  if (done) {
    return (
      <p className="mt-4 text-sm font-medium text-emerald-600">
        You&apos;ve joined the team. Redirecting…
      </p>
    );
  }

  return (
    <div className="mt-4">
      {error && <Alert tone="danger" className="mb-3">{error}</Alert>}
      <button
        type="button"
        disabled={isPending}
        onClick={accept}
        className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60"
      >
        {isPending ? "Accepting…" : alreadyMember ? "Confirm membership" : "Accept invitation"}
      </button>
    </div>
  );
}
