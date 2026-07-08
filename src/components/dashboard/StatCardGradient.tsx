import { cn } from "@/lib/cn";

export interface StatCardItem {
  label: string;
  value: string;
  note?: string;
}

export function StatCardGradientGrid({ stats }: { stats: StatCardItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {stats.map((stat, i) => (
        <StatCardGradient
          key={stat.label}
          {...stat}
          tone={i % 2 === 0 ? "primary" : "neutral"}
        />
      ))}
    </div>
  );
}

function StatCardGradient({
  label,
  value,
  note,
  tone,
}: StatCardItem & { tone: "primary" | "neutral" }) {
  return (
    <div
      className={cn(
        "rounded-3xl p-4 sm:p-5 flex flex-col gap-2",
        tone === "primary"
          ? "bg-gradient-to-b from-white/10 to-white/0 bg-brand text-white"
          : "bg-surface-subtle text-ink border border-border"
      )}
    >
      <p
        className={cn(
          "text-sm",
          tone === "primary" ? "text-white/90" : "text-ink-soft"
        )}
      >
        {label}
      </p>
      <p className="text-2xl sm:text-3xl font-semibold">{value}</p>
      {note && (
        <p
          className={cn(
            "text-xs",
            tone === "primary" ? "text-white/70" : "text-ink-muted"
          )}
        >
          {note}
        </p>
      )}
    </div>
  );
}
