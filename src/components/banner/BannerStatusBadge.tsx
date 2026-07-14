import { STATUS_META, isExpired } from "@/lib/banner/config";

const TONE: Record<string, string> = {
  neutral: "bg-surface-muted text-ink-soft",
  info: "bg-brand/10 text-brand",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

/** Status pill. An active ad past its end date renders as "Expired". */
export function BannerStatusBadge({ status, endDate }: { status: string; endDate: string | null }) {
  const effective = status === "active" && isExpired(endDate) ? "expired" : status;
  const meta = STATUS_META[effective] ?? { label: effective, tone: "neutral" as const };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${TONE[meta.tone]}`}>
      {meta.label}
    </span>
  );
}
