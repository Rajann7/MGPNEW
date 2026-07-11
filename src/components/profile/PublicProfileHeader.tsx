interface Props {
  name: string;
  roleLabel: string;
  isVerified: boolean;
  subtitle?: string | null;
}

/**
 * Public-safe profile header (broker/builder/owner). Never render
 * mobile/email/private docs here — only what public-safe views expose
 * (name, role, real verification status). No cover-photo band — there's
 * no cover-photo pipeline wired yet, and a placeholder band there read as
 * a broken/empty image rather than a deliberate design choice, so it was
 * dropped in favor of this simple avatar + name layout everywhere.
 */
export function PublicProfileHeader({
  name,
  roleLabel,
  isVerified,
  subtitle,
}: Props) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const verifiedBadge = isVerified && (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium">
      <svg
        className="w-3 h-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
          clipRule="evenodd"
        />
      </svg>
      Verified
    </span>
  );

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center text-lg font-semibold shrink-0">
        {initials || "?"}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="truncate text-lg sm:text-xl font-bold text-zinc-900">
            {name}
          </h1>
          {verifiedBadge}
        </div>
        <p className="text-sm text-zinc-500 capitalize">{roleLabel}</p>
        {subtitle && <p className="mt-0.5 text-xs text-zinc-400">{subtitle}</p>}
      </div>
    </div>
  );
}
