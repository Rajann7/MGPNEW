import Link from "next/link";
import { ShieldX } from "lucide-react";

export const metadata = {
  title: "Access denied",
  robots: { index: false, follow: false },
};

// SYS route (Phase 4): permission denied with safe next steps —
// never a dead end (MGP-CONST-027).
export default function ForbiddenPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <ShieldX className="h-12 w-12 text-red-500" aria-hidden />
      <h1 className="text-2xl font-semibold">
        You don&apos;t have access to this page
      </h1>
      <p className="max-w-md text-sm text-gray-600">
        Your account doesn&apos;t have permission for this area. If you think
        this is a mistake, contact support and mention what you were trying to
        do.
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
