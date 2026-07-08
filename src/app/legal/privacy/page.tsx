import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth/session";
import { PublicLayout } from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: false }, // noindex until legally reviewed
};

export default async function PrivacyPage() {
  const profile = await getCurrentProfile();

  return (
    <PublicLayout profile={profile}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-500 mb-8">
          Full Privacy Policy will be published before the platform&apos;s
          public launch and must be reviewed by a lawyer.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-3">
              What We Collect
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              During registration, My Gujarat Property collects your mobile
              number, name, and optionally your email address to create and
              verify your account.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-3">
              How We Protect Your Data
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Contact details including mobile numbers and email addresses are
              not shown publicly. They are revealed only after an authorized
              inquiry or contact reveal by a verified logged-in user.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-3">
              Your Rights
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              You may request access to, correction of, or deletion of your
              personal data by contacting support@mygujaratproperty.com. Full
              data rights will be documented in the final Privacy Policy.
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-zinc-400">
          Final privacy policy will be reviewed by a lawyer before production
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
