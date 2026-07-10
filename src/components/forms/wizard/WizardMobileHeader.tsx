import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Minimal compact mobile/tablet header (back + title) for wizard-entry
 * screens that don't render the full form (e.g. the Draft Resume
 * interstitial) — those have no chrome of their own below `lg`, since
 * WizardShell hides its topbar there in favor of the form's own header
 * (§12-14). A real gap caught live at 768px: this screen showed nothing
 * at all above the resume card between 640-1023px.
 */
export function WizardMobileHeader({
  title,
  backHref,
}: {
  title: string;
  backHref: string;
}) {
  return (
    <div className="-mx-4 mb-4 flex h-14 items-center gap-3 border-b border-zinc-100 bg-white px-4 lg:hidden">
      <Link
        href={backHref}
        aria-label="Back"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <span className="truncate text-sm font-semibold text-zinc-900">
        {title}
      </span>
    </div>
  );
}
