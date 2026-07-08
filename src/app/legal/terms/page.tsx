import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth/session";
import { PublicLayout } from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false, follow: false }, // noindex until legally reviewed
};

export default async function TermsPage() {
  const profile = await getCurrentProfile();

  return (
    <PublicLayout profile={profile}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">
          Terms of Service
        </h1>
        <p className="text-sm text-zinc-500 mb-8">
          Full Terms of Service will be published before the platform&apos;s
          public launch and must be reviewed by a lawyer.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-3">
              Platform Purpose
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              My Gujarat Property is a real estate listing marketplace. By using
              this platform, users agree to use it only for lawful purposes
              related to property search, listing, and inquiry.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-3">
              User Responsibilities
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Users are responsible for independently verifying all property
              documents, RERA details, and legal title before any transaction.
              My Gujarat Property is not a legal advisor, financial advisor, or
              property owner.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-3">
              Contact Details
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Contact details of listed owners, brokers, and builders are
              protected and revealed only after an authorized inquiry or contact
              reveal by a logged-in user.
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-zinc-400">
          Final legal content will be reviewed by a lawyer before production
          launch. This is a preliminary placeholder.
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
