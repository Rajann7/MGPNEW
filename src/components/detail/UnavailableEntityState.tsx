import { Button } from "@/components/ui/Button";

/**
 * Shown for any slug that does not resolve to a published/approved public row.
 * Deliberately generic — never reveals whether a draft/rejected/deleted row
 * exists behind the slug (that would leak moderation state to the public).
 */
export function UnavailableEntityState() {
  return (
    <div className="max-w-md mx-auto text-center py-20 px-4">
      <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-7 h-7 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-base font-semibold text-zinc-900 mb-1">
        This listing is not available right now
      </h1>
      <p className="text-sm text-zinc-500 mb-6">
        It may have been removed, paused, or the link may be incorrect.
      </p>
      <Button href="/search" variant="outline">
        Back to Search
      </Button>
    </div>
  );
}
