/** "How it works" — 3 numbered cards per the finished design. */
const STEPS = [
  {
    n: "1",
    title: "Search or post",
    desc: "Filter by city, locality, budget and type — or post your own property or requirement in minutes.",
  },
  {
    n: "2",
    title: "Connect directly",
    desc: "Send inquiries and chat with owners, brokers or builders. Schedule site visits that suit you.",
  },
  {
    n: "3",
    title: "Close with confidence",
    desc: "Verification badges, RERA details and document checklists help you move forward safely.",
  },
] as const;

export function HomeHowItWorks() {
  return (
    <section className="mx-auto max-w-[1120px] px-4 pt-14 sm:px-6">
      <h2 className="mb-8 text-center text-[28px] font-semibold tracking-[-0.01em] text-ink">
        How it works
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {STEPS.map(({ n, title, desc }) => (
          <div
            key={n}
            className="rounded-2xl border border-border bg-white p-7"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-brand-soft text-[13px] font-bold text-brand">
              {n}
            </span>
            <div className="mt-4 text-[17px] font-semibold text-ink">{title}</div>
            <p className="mt-2 text-[14px] leading-[1.6] text-ink-soft">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
