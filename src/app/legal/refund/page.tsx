import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth/session";
import { PublicLayout } from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  robots: { index: false, follow: false }, // noindex until legally reviewed
};

export default async function RefundPolicyPage() {
  const profile = await getCurrentProfile();

  return (
    <PublicLayout profile={profile}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">
          Refund &amp; Cancellation Policy
        </h1>
        <p className="text-sm text-zinc-500 mb-8">
          Full Refund &amp; Cancellation Policy will be published before the
          platform&apos;s public launch and must be reviewed by a lawyer.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-3">
              Subscription Cancellation
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              You can cancel a paid subscription at any time from your billing
              dashboard. Cancellation takes effect at the end of your current
              billing period — you keep access until then and are not charged
              again. Cancelling does not delete your listings or account data.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-3">
              Refund Requests
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Refund requests for a verified payment can be raised from your
              billing dashboard against that payment. Requests are reviewed
              manually by our team; approved refunds are processed to the
              original payment method through Razorpay. Processing time depends
              on your bank/card issuer.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-3">
              Free Trials
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Free trials are offered without any upfront charge and do not
              auto-charge your card at expiry. No refund applies to a trial
              since no payment is taken during it.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold text-zinc-800 mb-3">
              Credit Notes
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Where an approved refund relates to a GST invoice, a corresponding
              credit note is issued against that invoice.
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
