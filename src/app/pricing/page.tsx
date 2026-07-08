import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth/session";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { getPublicPlans } from "@/lib/actions/billing";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import type { PublicRole } from "@/types";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Subscription plans and pricing for My Gujarat Property.",
  robots: { index: false, follow: false }, // noindex until billing is fully live
};

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const profile = await getCurrentProfile();
  const result = await getPublicPlans();

  // Honest setup-required state if the billing schema isn't applied yet.
  if (!result.success) {
    return (
      <PublicLayout profile={profile}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-3">Pricing</h1>
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-10">
            <h2 className="text-base font-semibold text-zinc-700 mb-2">
              Plans Coming Soon
            </h2>
            <p className="text-sm text-zinc-500 max-w-xs mx-auto">
              The plan catalog is being set up. Pricing will appear here once
              billing is configured.
            </p>
          </div>
          <Link
            href="/"
            className="mt-8 inline-block text-sm font-medium text-brand hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const currentRole: PublicRole | null =
    profile && ["owner", "broker", "builder"].includes(profile.public_role)
      ? (profile.public_role as PublicRole)
      : null;

  return (
    <PublicLayout profile={profile}>
      <PricingPlans
        plans={result.data.plans}
        isLoggedIn={Boolean(profile)}
        currentRole={currentRole}
        razorpayConfigured={result.data.razorpayConfigured}
      />
    </PublicLayout>
  );
}
