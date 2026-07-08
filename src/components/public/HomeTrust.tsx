import { ShieldCheck, BadgeCheck, MessageCircle, Clock } from "lucide-react";

/** "Built for trust" split panel per the finished design (left copy · right 2×2 features). */
const FEATURES = [
  {
    Icon: ShieldCheck,
    title: "Poster verification",
    desc: "ID-checked owners, brokers and builders",
  },
  {
    Icon: BadgeCheck,
    title: "RERA references",
    desc: "Project registration shown where applicable",
  },
  {
    Icon: MessageCircle,
    title: "Direct contact",
    desc: "Talk to the poster, not a call centre",
  },
  {
    Icon: Clock,
    title: "Fresh listings",
    desc: "Expired posts are cycled out automatically",
  },
] as const;

export function HomeTrust() {
  return (
    <section className="mx-auto max-w-[1120px] px-4 pb-14 pt-12 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-10 rounded-[20px] border border-border bg-white p-7 sm:p-12 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="text-[26px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink">
            Built for trust, from Gujarat, for Gujarat.
          </h2>
          <p className="mt-3.5 text-[15px] leading-[1.7] text-ink-soft">
            We are a listing marketplace — we connect people, we don&rsquo;t
            broker deals. Every poster identity check, RERA reference and
            verification badge exists to keep the marketplace honest.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div key={title} className="flex gap-3">
              <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
              <div>
                <div className="text-[14px] font-semibold text-ink">{title}</div>
                <div className="mt-0.5 text-[13px] leading-[1.5] text-ink-soft">
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
