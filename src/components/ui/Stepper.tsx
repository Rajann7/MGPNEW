import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function Stepper({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-0">
        {steps.map((label, i) => {
          const n = i + 1;
          const isActive = current === n;
          const isDone = current > n;
          return (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                    isDone || isActive
                      ? "bg-brand text-white"
                      : "bg-zinc-100 text-zinc-400"
                  )}
                >
                  {isDone ? (
                    <Check
                      className="w-4 h-4"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  ) : (
                    n
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-1 hidden sm:block text-center",
                    isActive ? "text-brand font-medium" : "text-zinc-400"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1 mx-1",
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
