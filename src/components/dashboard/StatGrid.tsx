import { Card } from "@/components/ui/Card";

export interface StatItem {
  label: string;
  value: string;
  note?: string;
}

export function StatGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} muted>
          <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
          <p className="text-sm font-medium text-zinc-700 mt-0.5">
            {stat.label}
          </p>
          {stat.note && (
            <p className="text-xs text-zinc-400 mt-0.5">{stat.note}</p>
          )}
        </Card>
      ))}
    </div>
  );
}
