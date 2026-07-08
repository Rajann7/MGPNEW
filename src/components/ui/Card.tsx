import { cn } from "@/lib/cn";

export function Card({
  className,
  interactive,
  muted,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-surface rounded-xl border border-border p-4 shadow-sm text-ink",
        muted && "bg-surface-subtle",
        interactive && "hover:border-brand/40 transition-colors",
        className
      )}
      {...rest}
    />
  );
}
