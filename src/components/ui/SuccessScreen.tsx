import { Check } from "lucide-react";
import { Button } from "./Button";

export function SuccessScreen({
  title,
  description,
  actionLabel,
  actionHref,
  children,
}: {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-xl mx-auto py-12 text-center">
      <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check
          className="w-8 h-8 text-emerald-600"
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>
      <h2 className="text-xl font-bold text-zinc-900 mb-2">{title}</h2>
      <p className="text-sm text-zinc-500 mb-6">{description}</p>
      {children}
      <div className="mt-6">
        <Button href={actionHref}>{actionLabel}</Button>
      </div>
    </div>
  );
}
