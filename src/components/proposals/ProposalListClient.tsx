"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FileText } from "lucide-react";
import { updateProposalStatus } from "@/lib/actions/proposals";
import type { Proposal } from "@/types";

const STATUS_CLASS: Record<string, string> = {
  draft: "bg-zinc-100 text-zinc-500",
  sent: "bg-blue-50 text-blue-700",
  viewed: "bg-cyan-50 text-cyan-700",
  shortlisted: "bg-violet-50 text-violet-700",
  negotiation: "bg-pink-50 text-pink-700",
  accepted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-600",
  withdrawn: "bg-zinc-100 text-zinc-500",
  expired: "bg-zinc-100 text-zinc-500",
  archived: "bg-zinc-100 text-zinc-400",
};

export function ProposalListClient({
  items,
  direction,
}: {
  items: Proposal[];
  direction: "sent" | "received";
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function transition(id: string, status: string) {
    startTransition(async () => {
      const result = await updateProposalStatus(id, status);
      if (result.success) router.refresh();
    });
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title={`No ${direction} proposals`}
        description="Proposals will appear here once sent — no fake proposals are shown."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((p) => (
        <Card key={p.id}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Link href={`/dashboard/proposals/${p.id}`} className="min-w-0 hover:underline">
              <p className="text-sm font-semibold text-zinc-900 truncate">
                {p.title}
              </p>
              {p.message && (
                <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">
                  {p.message}
                </p>
              )}
              <p className="text-[11px] text-zinc-400 mt-1">
                {new Date(p.created_at).toLocaleDateString()}
              </p>
            </Link>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_CLASS[p.status] ?? ""}`}
              >
                {p.status}
              </span>
              {direction === "received" && p.status === "sent" && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => transition(p.id, "viewed")}
                >
                  Mark Viewed
                </Button>
              )}
              {direction === "received" &&
                ["sent", "viewed", "shortlisted"].includes(p.status) && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => transition(p.id, "shortlisted")}
                  >
                    Shortlist
                  </Button>
                )}
              {direction === "received" && p.status === "shortlisted" && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => transition(p.id, "negotiation")}
                >
                  Negotiate
                </Button>
              )}
              {direction === "received" && p.status === "negotiation" && (
                <>
                  <Button
                    size="sm"
                    disabled={isPending}
                    onClick={() => transition(p.id, "accepted")}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() => transition(p.id, "rejected")}
                  >
                    Reject
                  </Button>
                </>
              )}
              {direction === "sent" &&
                ["sent", "viewed", "shortlisted"].includes(p.status) && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => transition(p.id, "withdrawn")}
                  >
                    Withdraw
                  </Button>
                )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
