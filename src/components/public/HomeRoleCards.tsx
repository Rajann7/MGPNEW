"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import type { Profile } from "@/types";

/** Role CTA band — dark-green (#0E3B2E) per the finished design. */
export function HomeRoleCards({ profile }: { profile: Profile | null }) {
  const router = useRouter();
  const { openAuth } = useAuthModal();

  function handlePost() {
    // Guest → register popup (returns to home). Logged-in → their dashboard hub
    // (the post CTA lives there — no dead-end, no cross-role posting).
    if (!profile) openAuth();
    else router.push(`/dashboard/${profile.public_role}`);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 rounded-[20px] bg-[#0E3B2E] p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:items-center lg:gap-8">
        <div>
          <h2 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.01em]">
            Post your property.
            <br />
            Reach real buyers.
          </h2>
          <p className="mt-3 text-[14px] leading-[1.6] text-white/65">
            Free to start. Verified listings get priority placement.
          </p>
        </div>

        <div className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6">
          <div className="text-[15px] font-semibold">Owners</div>
          <p className="mb-4 mt-1.5 text-[13px] leading-[1.5] text-white/60">
            Sell or rent your own property, no middlemen.
          </p>
          <button
            type="button"
            onClick={handlePost}
            className="mt-auto w-full rounded-[10px] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0E3B2E] transition-colors hover:bg-brand-soft"
          >
            Post free listing
          </button>
        </div>

        <div className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6">
          <div className="text-[15px] font-semibold">Brokers</div>
          <p className="mb-4 mt-1.5 text-[13px] leading-[1.5] text-white/60">
            Manage listings, leads and site visits in one CRM.
          </p>
          <Link
            href="/pricing"
            className="mt-auto w-full rounded-[10px] border border-white/35 px-4 py-2.5 text-center text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            Explore broker plans
          </Link>
        </div>

        <div className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6">
          <div className="text-[15px] font-semibold">Builders</div>
          <p className="mb-4 mt-1.5 text-[13px] leading-[1.5] text-white/60">
            Showcase RERA projects with inventory &amp; leads.
          </p>
          <button
            type="button"
            onClick={handlePost}
            className="mt-auto w-full rounded-[10px] border border-white/35 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            List your project
          </button>
        </div>
      </div>
    </section>
  );
}
