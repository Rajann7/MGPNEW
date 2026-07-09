import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Posting-wizard progress header (design Batch 5 · 5A/5B/5C shell): compact
 * stepped header on desktop (numbered circles + connector + current label),
 * "Step X of N" + slim progress bar on mobile. Distinct from the generic
 * `Stepper` (used by other, unrelated forms) so this wizard's shell can
 * evolve independently.
 */
export function WizardProgress({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  const total = steps.length;
  const percent = Math.round((current / total) * 100);

  return (
    <div className="mb-6">
      {/* Mobile: Step X of N + progress bar */}
      <div className="sm:hidden">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-zinc-700">
            Step {current} of {total}
          </span>
          <span className="text-zinc-400">{steps[current - 1]}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Desktop: compact stepped header */}
      <div className="hidden items-center gap-0 sm:flex">
        {steps.map((label, i) => {
          const n = i + 1;
          const isActive = current === n;
          const isDone = current > n;
          return (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                    isDone || isActive
                      ? "bg-brand text-white"
                      : "bg-zinc-100 text-zinc-400"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isDone ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  ) : (
                    n
                  )}
                </div>
                <span
                  className={cn(
                    "mt-1 hidden text-center text-[10px] leading-tight lg:block",
                    isActive ? "font-medium text-brand" : "text-zinc-400"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-1 h-px flex-1",
                    isDone ? "bg-brand" : "bg-zinc-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
