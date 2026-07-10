"use client";

import { useRouter } from "next/navigation";
import { User, Handshake, Building2 } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import type { Profile } from "@/types";
import type { LucideIcon } from "lucide-react";

/** Role CTA band — Batch 3 · Screen 1 "List with us — it's free" (brand band, 3 role cards). */
const ROLES: { Icon: LucideIcon; title: string; desc: string; cta: string }[] = [
  {
    Icon: User,
    title: "Owner",
    desc: "Sell or rent your property without paying brokerage.",
    cta: "Post Property for Free",
  },
  {
    Icon: Handshake,
    title: "Broker",
    desc: "Manage all your listings and leads from one dashboard.",
    cta: "Post Listings for Free",
  },
  {
    Icon: Building2,
    title: "Builder",
    desc: "Showcase RERA-registered projects to serious buyers.",
    cta: "Post Project for Free",
  },
];

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
    <section className="mt-12 bg-brand">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-center text-[24px] font-semibold text-white">
          List with us — it&rsquo;s free
        </h2>
        <p className="mb-7 mt-1.5 text-center text-[14px] leading-[1.6] text-white/75">
          Reach genuine buyers and tenants across Gujarat directly.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ROLES.map(({ Icon, title, desc, cta }) => (
            <div
              key={title}
              className="flex flex-col gap-2.5 rounded-2xl border border-white/[0.14] bg-white/[0.06] p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.12]">
                <Icon className="h-5 w-5 text-white" />
              </span>
              <div className="text-[16px] font-semibold text-white">{title}</div>
              <div className="text-[13px] leading-[1.5] text-white/75">{desc}</div>
              <button
                type="button"
                onClick={handlePost}
                className="mt-auto self-start rounded-[10px] bg-white px-4 py-2.5 text-[13px] font-medium text-brand transition-colors hover:bg-brand-soft"
              >
                {cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
