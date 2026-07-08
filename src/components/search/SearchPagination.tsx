import Link from "next/link";

interface Props {
  page: number;
  hasMore: boolean;
  searchParams: Record<string, string | undefined>;
}

function buildHref(
  searchParams: Record<string, string | undefined>,
  page: number
) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (v && k !== "page") params.set(k, v);
  }
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

/** Simple, bounded page-based pagination — no unbounded total-count computation. */
export function SearchPagination({ page, hasMore, searchParams }: Props) {
  if (page === 1 && !hasMore) return null;

  return (
    <div className="flex items-center justify-between mt-8">
      {page > 1 ? (
        <Link
          href={buildHref(searchParams, page - 1)}
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-ink hover:bg-surface-muted"
        >
          ← Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-xs text-ink-muted">Page {page}</span>
      {hasMore ? (
        <Link
          href={buildHref(searchParams, page + 1)}
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-ink hover:bg-surface-muted"
        >
          Next →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
