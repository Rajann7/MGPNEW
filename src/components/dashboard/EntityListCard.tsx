import Link from "next/link";
import { EntityStatusBadge } from "@/components/ui/EntityStatusBadge";
import type { EntityStatus } from "@/types";

export function EntityListCard({
  status,
  purpose,
  badges,
  title,
  subtitle,
  meta,
  createdAt,
  editHref,
}: {
  status: EntityStatus;
  purpose?: string;
  badges?: React.ReactNode;
  title: string;
  subtitle?: string;
  meta?: string;
  createdAt: string;
  editHref: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-4 hover:border-zinc-300 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <EntityStatusBadge status={status} />
            {badges}
            {purpose && (
              <span className="text-xs text-zinc-400 capitalize">
                {purpose}
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 truncate">
            {title}
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            {subtitle || "Location not set"}
          </p>
          {meta && (
            <p className="text-xs font-medium text-zinc-700 mt-1">{meta}</p>
          )}
          <p className="text-xs text-zinc-400 mt-1">
            Created{" "}
            {new Date(createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={editHref}
            className="px-3 py-1.5 text-xs font-medium text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
