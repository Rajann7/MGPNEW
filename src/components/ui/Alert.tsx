import { cn } from "@/lib/cn";

type Tone = "info" | "success" | "warning" | "danger";

const TONE_CLASSES: Record<Tone, string> = {
  info: "bg-blue-50 border-blue-100 text-blue-700",
  success: "bg-emerald-50 border-emerald-100 text-emerald-700",
  warning: "bg-amber-50 border-amber-100 text-amber-700",
  danger: "bg-red-50 border-red-100 text-red-700",
};

export function Alert({
  tone = "info",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === "danger" ? "alert" : undefined}
      className={cn(
        "p-3 border rounded-lg text-xs sm:text-sm",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </div>
  );
}
