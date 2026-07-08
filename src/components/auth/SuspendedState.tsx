"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ShieldCheck, MessageCircle } from "lucide-react";

/**
 * Batch 2 · Screen 12 — Suspended account full-stop.
 * App-like contextual header with a back button (CLAUDE.md §3A), honest copy
 * (no fabricated suspension date/reason — we only state what we truly know),
 * Contact support (brand) + Read listing policy. No bypass, no re-login loop.
 */
export function SuspendedState() {
  const router = useRouter();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#fafafa]">
      {/* Contextual app header + back button */}
      <header className="flex h-14 flex-shrink-0 items-center border-b border-[#f4f4f5] bg-white px-2">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-[10px] text-[#18181b] hover:bg-[#f4f4f5]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="flex-1 text-center text-[15px] font-medium text-[#18181b]">
          Account status
        </span>
        <span className="w-11" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-10 text-center">
        <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#FEF2F2]">
          <ShieldCheck className="h-7 w-7" color="#DC2626" />
        </span>
        <div className="text-[18px] font-semibold text-[#18181b]">
          Account suspended
        </div>
        <p className="max-w-xs text-[13px] leading-[1.65] text-[#52525b]">
          Your account is currently suspended for a listing-policy review. Your
          listings are hidden while suspended. Please contact support to resolve
          this.
        </p>

        <Link
          href="/support"
          className="mt-2 flex w-full max-w-xs items-center justify-center gap-2 rounded-[10px] bg-[#0F6B5C] py-[13px] text-sm font-medium text-white transition-colors hover:bg-[#0C5648]"
        >
          <MessageCircle className="h-4 w-4" />
          Contact support
        </Link>
        <Link
          href="/legal/terms"
          className="w-full max-w-xs rounded-[10px] py-2.5 text-[13px] font-medium text-[#3f3f46] hover:bg-[#f4f4f5]"
        >
          Read listing policy
        </Link>
        <div className="text-[11px] text-[#a1a1aa]">
          No bypass or re-login loop is offered.
        </div>
      </div>
    </div>
  );
}
