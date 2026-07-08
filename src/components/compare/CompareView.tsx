"use client";

import Link from "next/link";
import { Scale, X, ArrowLeft } from "lucide-react";
import { useCompare } from "@/components/compare/CompareProvider";

/** Side-by-side comparison of the selected properties/projects (public-safe fields only). */
export function CompareView() {
  const { items, remove, clear } = useCompare();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-20 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft">
          <Scale className="h-6 w-6 text-brand" />
        </span>
        <h1 className="text-lg font-bold text-ink">Nothing to compare yet</h1>
        <p className="text-sm text-ink-soft">
          Add up to 4 properties or projects from search using the compare button
          on each card, then review them side by side here.
        </p>
        <Link
          href="/search"
          className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
        >
          <ArrowLeft className="h-4 w-4" /> Back to search
        </Link>
      </div>
    );
  }

  const rows: { label: string; get: (i: (typeof items)[number]) => string }[] = [
    { label: "Price", get: (i) => i.price },
    { label: "Location", get: (i) => i.location },
    { label: "Type", get: (i) => i.kind },
    { label: "Details", get: (i) => i.facts.join(" · ") || "—" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-28 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold text-ink">
          <Scale className="h-5 w-5 text-brand" /> Compare ({items.length})
        </h1>
        <button
          type="button"
          onClick={clear}
          className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-surface-muted"
        >
          Clear all
        </button>
      </div>

      <div className="overflow-x-auto rounded-card border border-border">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-28 border-b border-border bg-surface-subtle p-3 text-left align-bottom text-xs font-semibold uppercase tracking-wide text-ink-muted">
                &nbsp;
              </th>
              {items.map((i) => (
                <th
                  key={i.id}
                  className="border-b border-l border-border bg-surface-subtle p-3 text-left align-top"
                >
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/${i.kind}/${i.slug}`}
                      className="line-clamp-2 font-semibold text-ink hover:text-brand"
                    >
                      {i.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(i.id)}
                      aria-label={`Remove ${i.title}`}
                      className="flex-shrink-0 text-ink-muted hover:text-ink"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="border-b border-border p-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {row.label}
                </td>
                {items.map((i) => (
                  <td
                    key={i.id}
                    className="border-b border-l border-border p-3 capitalize text-ink"
                  >
                    {row.get(i)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-3" />
              {items.map((i) => (
                <td key={i.id} className="border-l border-border p-3">
                  <Link
                    href={`/${i.kind}/${i.slug}`}
                    className="inline-flex rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-hover"
                  >
                    View details
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
