import Link from "next/link";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Account restricted",
  robots: { index: false, follow: false },
};

// SYS route (Phase 4): account-level restriction (suspended/limited) —
// distinct from per-page permission denial (/forbidden).
export default function RestrictedPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <Lock className="h-12 w-12 text-amber-500" aria-hidden />
      <h1 className="text-2xl font-semibold">Your account is restricted</h1>
      <p className="max-w-md text-sm text-gray-600">
        Some actions are currently unavailable on your account. This can happen
        after a policy review or while verification is pending. Contact support
        to resolve it.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/support"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Contact support
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
