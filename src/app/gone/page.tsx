import Link from "next/link";
import { Archive } from "lucide-react";

export const metadata = {
  title: "Content removed",
  robots: { index: false, follow: false },
};

// SYS route (Phase 4): permanently removed content (HTTP 410 semantics) —
// e.g. deleted listing whose URL is still shared/indexed.
export default function GonePage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <Archive className="h-12 w-12 text-gray-400" aria-hidden />
      <h1 className="text-2xl font-semibold">
        This content is no longer available
      </h1>
      <p className="max-w-md text-sm text-gray-600">
        The listing or page you&apos;re looking for was removed and won&apos;t
        be coming back. You can search for similar properties instead.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/search"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Search properties
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
        >
          Go to homepage
        </Link>
      </div>
    </main>
  );
}
