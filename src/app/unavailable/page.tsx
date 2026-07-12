import Link from "next/link";
import { CloudOff } from "lucide-react";

export const metadata = {
  title: "Temporarily unavailable",
  robots: { index: false, follow: false },
};

// SYS route (Phase 4): feature/provider temporarily unavailable
// (Setup Required / provider outage) — honest state, never fake success.
export default function UnavailablePage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <CloudOff className="h-12 w-12 text-gray-400" aria-hidden />
      <h1 className="text-2xl font-semibold">
        This feature is temporarily unavailable
      </h1>
      <p className="max-w-md text-sm text-gray-600">
        The service needed for this feature isn&apos;t available right now. It
        may be under setup or maintenance. Please try again later.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Go to homepage
        </Link>
        <Link
          href="/support"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
        >
          Contact support
        </Link>
      </div>
    </main>
  );
}
