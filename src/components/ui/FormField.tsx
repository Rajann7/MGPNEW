export function FormField({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-1.5">
        {label}
        {required && (
          <span className="text-red-500 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div
        className={
          error
            ? "[&_.form-input]:border-red-400 [&_.form-select]:border-red-400 [&_.form-input]:focus:border-red-500 [&_.form-select]:focus:border-red-500"
            : undefined
        }
      >
        {children}
      </div>
      {hint && !error && <p className="mt-1 text-xs text-zinc-400">{hint}</p>}
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-500">{label}</span>
      <span className="font-medium text-zinc-900 text-right max-w-[60%]">
        {value}
      </span>
    </div>
  );
}
