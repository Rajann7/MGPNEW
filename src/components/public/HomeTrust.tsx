import { ShieldCheck, Phone, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Trust section — Batch 3 · Screen 1 "Why My Gujarat Property" (3 qualitative cards, no fake stats). */
const PILLARS: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: ShieldCheck,
    title: "Verified listings",
    desc: "Every listing goes through our review process before it appears in search — flagged listings are removed.",
  },
  {
    Icon: Phone,
    title: "Direct owner contact",
    desc: "Talk to the person who posted the property. No forced brokerage, no hidden intermediaries.",
  },
  {
    Icon: MapPin,
    title: "Local Gujarat expertise",
    desc: "Built for Gujarat's localities, societies and pricing norms — not a generic pan-India template.",
  },
];

export function HomeTrust() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8">
      <h2 className="mb-5 text-center text-[22px] font-semibold text-ink">
        Why My Gujarat Property
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PILLARS.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-soft">
              <Icon className="h-[19px] w-[19px] text-brand" />
            </span>
            <div className="text-[15px] font-semibold text-ink">{title}</div>
            <div className="text-[13px] leading-[1.55] text-ink-soft">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
