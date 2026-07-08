import Link from "next/link";
import { MapPin, ChevronRight, Search } from "lucide-react";
import type { PublicPropertyCard } from "@/lib/actions/public-search";
import {
  formatPropertyPrice,
  formatArea,
  labelize,
  locationLabel,
} from "@/lib/search/format";

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d <= 0) {
    const h = Math.floor(diff / 3600000);
    return h <= 0 ? "just now" : `${h} hr${h === 1 ? "" : "s"} ago`;
  }
  if (d < 7) return `${d} day${d === 1 ? "" : "s"} ago`;
  const w = Math.floor(d / 7);
  return `${w} week${w === 1 ? "" : "s"} ago`;
}

/**
 * Batch 3 · "Featured properties" grid. REAL published rows only (public view).
 * Empty → honest actionable state, never fake cards. Photos are honest
 * placeholders until Cloudflare R2 media lands (Prompt 10).
 */
export function HomeFeaturedProperties({
  items,
}: {
  items: PublicPropertyCard[];
}) {
  return (
    <section className="mx-auto max-w-[1120px] px-4 pt-10 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[22px] font-semibold text-ink">Featured properties</h2>
        <Link
          href="/search?entity=property"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-brand hover:text-brand-hover"
        >
          View all <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-surface-subtle px-6 py-12 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft">
            <Search className="h-5 w-5 text-brand" />
          </span>
          <div className="text-sm font-semibold text-ink">
            No featured listings yet
          </div>
          <p className="max-w-xs text-[13px] text-ink-soft">
            Approved property listings will appear here. Be the first — post your
            property after logging in.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => {
            const href = p.slug ? `/property/${p.slug}` : "/search?entity=property";
            const chips = [
              p.bedrooms ? `${p.bedrooms} BHK` : null,
              formatArea(p.area_value, p.area_unit),
              labelize(p.property_type),
            ].filter(Boolean) as string[];
            return (
              <Link
                key={p.id}
                href={href}
                className="group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]"
              >
                <div className="relative flex h-[150px] items-center justify-center bg-[repeating-linear-gradient(45deg,#f4f4f5,#f4f4f5_10px,#e9e9ec_10px,#e9e9ec_20px)]">
                  <span className="rounded-full bg-white/85 px-2.5 py-1 font-mono text-[11px] text-ink-muted">
                    photo coming soon
                  </span>
                  {/* No "Verified" badge here: the public property card carries no
                      verification field, so showing it would be a fake badge
                      (CLAUDE.md rule #8). Re-add gated on a real field later. */}
                </div>
                <div className="flex flex-col gap-[7px] p-3.5">
                  <div className="text-[17px] font-semibold text-ink">
                    {formatPropertyPrice(p)}
                  </div>
                  <div className="line-clamp-1 text-[13px] font-medium text-ink">
                    {p.title}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-ink-muted">
                    <MapPin className="h-3 w-3" />
                    {locationLabel(p.city_text, p.locality_text)}
                  </div>
                  {chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {chips.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-surface-muted px-2.5 py-[3px] text-[11px] font-medium text-ink-soft"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="border-t border-surface-muted pt-2 text-[11px] text-ink-muted">
                    Posted by {labelize(p.poster_role)} · {timeAgo(p.published_at)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
