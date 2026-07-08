import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { listRecentlyViewed } from "@/lib/actions/saved";
import { ClearHistoryButton } from "@/components/public/ClearHistoryButton";

/**
 * Batch 3 · Homepage "Recently viewed" strip.
 * Logged-in only: for a guest (AUTH_REQUIRED) or a user with no history the whole
 * section is removed — never an empty shell (design annotation). Real data only.
 */
const HREF: Record<string, (slug: string) => string | null> = {
  property: (s) => `/property/${s}`,
  project: (s) => `/project/${s}`,
  requirement: () => null, // no public requirement detail route
};

export async function HomeRecentlyViewed() {
  const res = await listRecentlyViewed();
  if (!res.success) return null; // guest / not authed → section removed
  const items = res.data.items.slice(0, 6);
  if (items.length === 0) return null; // no history → section removed

  return (
    <section className="mx-auto max-w-[1120px] px-6 pb-2 pt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[22px] font-semibold text-[#18181b]">Recently viewed</h2>
        <ClearHistoryButton />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => {
          const href = it.available && it.slug ? HREF[it.item_type]?.(it.slug) : null;
          const inner = (
            <>
              <span className="h-[52px] w-16 flex-shrink-0 rounded-[10px] bg-[repeating-linear-gradient(45deg,#f4f4f5,#f4f4f5_8px,#e9e9ec_8px,#e9e9ec_16px)]" />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-[#18181b]">
                  {it.title}
                </div>
                <div className="truncate text-xs text-[#71717a]">
                  {it.cityText ?? (it.available ? "" : "No longer available")}
                </div>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0 text-[#a1a1aa]" />
            </>
          );
          const cls =
            "flex items-center gap-3 rounded-2xl border border-[#e4e4e7] bg-white p-3 transition-colors";
          return href ? (
            <Link key={it.id} href={href} className={`${cls} hover:bg-[#fafafa]`}>
              {inner}
            </Link>
          ) : (
            <div key={it.id} className={`${cls} cursor-default opacity-70`}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
