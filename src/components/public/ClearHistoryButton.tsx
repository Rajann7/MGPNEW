"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { clearRecentlyViewed } from "@/lib/actions/saved";

/** "Clear history" link for the home Recently-viewed strip (Batch 3). */
export function ClearHistoryButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await clearRecentlyViewed();
          router.refresh();
        })
      }
      className="text-[13px] font-medium text-[#0F6B5C] hover:text-[#0C5648] disabled:opacity-50"
    >
      {isPending ? "Clearing…" : "Clear history"}
    </button>
  );
}
