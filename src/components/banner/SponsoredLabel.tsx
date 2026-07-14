/** Visible "Sponsored" disclosure required on every paid/promoted banner. */
export function SponsoredLabel({ className = "" }: { className?: string }) {
  return (
    <span className={`pointer-events-none rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm ${className}`}>
      Sponsored
    </span>
  );
}
