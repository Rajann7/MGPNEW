"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { CrmStageBadge } from "./CrmStageBadge";
import { Inbox } from "lucide-react";
import type { LeadRow } from "@/lib/actions/leads";

export function LeadListClient({
  items,
  basePath,
}: {
  items: LeadRow[];
  basePath: string;
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No leads yet"
        description="Inquiries from interested users will appear here — no fake leads are ever shown."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((lead) => (
        <Link key={lead.id} href={`${basePath}/${lead.id}`}>
          <Card interactive>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900 truncate">
                  {lead.targetSummary?.title ?? "Listing unavailable"}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {lead.counterpartName} · {lead.targetSummary?.cityText ?? "—"}{" "}
                  · {new Date(lead.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <CrmStageBadge stage={lead.crm_stage} />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
