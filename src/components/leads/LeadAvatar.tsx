import { cn } from "@/lib/cn";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

/** Brand-colored only for "new" leads — dimmed zinc otherwise (matches reference design exactly). */
export function LeadAvatar({
  name,
  isNew,
  size = "sm",
}: {
  name: string;
  isNew: boolean;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "rounded-full flex items-center justify-center font-semibold shrink-0",
        size === "sm" ? "w-8 h-8 text-[11px]" : "w-10 h-10 text-sm",
        isNew
          ? "bg-brand-soft text-brand"
          : "bg-ink/5 dark:bg-white/10 text-ink-soft"
      )}
    >
      {initials(name) || "?"}
    </span>
  );
}
