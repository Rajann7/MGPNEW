import { Search, MessageCircle, KeyRound, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** "How it works" — Batch 3 · Screen 1 (3 circular icon steps joined by chevrons). */
const STEPS: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Search,
    title: "1 · Search",
    desc: "Filter verified listings by locality, budget and type.",
  },
  {
    Icon: MessageCircle,
    title: "2 · Connect",
    desc: "Contact owners, brokers or builders directly — no middlemen.",
  },
  {
    Icon: KeyRound,
    title: "3 · Close",
    desc: "Visit, negotiate and close the deal on your terms.",
  },
] as const;

export function HomeHowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-center text-[22px] font-semibold text-ink">
        How it works
      </h2>
      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-4">
        {STEPS.map(({ Icon, title, desc }, i) => (
          <div key={title} className="contents">
            {i > 0 && (
              <ChevronRight
                className="mt-[18px] hidden h-5 w-5 text-zinc-300 sm:block"
                aria-hidden="true"
              />
            )}
            <div className="flex flex-col items-center gap-2.5 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft">
                <Icon className="h-6 w-6 text-brand" />
              </span>
              <div className="text-[15px] font-semibold text-ink">{title}</div>
              <div className="max-w-[240px] text-[13px] leading-[1.5] text-ink-soft">
                {desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
