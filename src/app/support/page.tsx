import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth/session";
import { PublicLayout } from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help and support for My Gujarat Property.",
};

export default async function SupportPage() {
  const profile = await getCurrentProfile();

  return (
    <PublicLayout profile={profile}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">
          Support
        </h1>
        <p className="text-sm text-zinc-500 mb-8">
          Need help? Reach out to the My Gujarat Property support team.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-2">
              Email Support
            </h2>
            <p className="text-sm text-zinc-500 mb-3">
              For platform queries, listing issues, or account help:
            </p>
            <p className="text-sm font-medium text-blue-600">
              support@mygujaratproperty.com
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-2">
              Grievance
            </h2>
            <p className="text-sm text-zinc-500">
              For legal or compliance matters, write to the same support email
              with subject &ldquo;Grievance&rdquo;. We aim to respond within 7
              business days.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-2">
              Response Time
            </h2>
            <p className="text-sm text-zinc-500">
              General queries: 1–3 business days. Listing or account issues: 2–5
              business days.
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-zinc-400">
          My Gujarat Property is a listing marketplace and does not provide
          legal or financial advice.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
