/** Stat tiles for public profiles (design Batch 4 · Screens 4–5).
 * "Reviews: Coming soon" is an honest never-faked state — pass it as a plain tile. */
export function StatTiles({
  tiles,
}: {
  tiles: { value: string; label: string; muted?: boolean }[];
}) {
  if (tiles.length === 0) return null;
  return (
    <div className="mt-5 grid grid-cols-3 gap-2.5">
      {tiles.map((t) => (
        <div
          key={t.label}
          className="rounded-2xl border border-zinc-100 bg-white p-3.5 text-center"
        >
          <p
            className={`text-lg font-bold ${t.muted ? "text-zinc-400" : "text-zinc-900"}`}
          >
            {t.value}
          </p>
          <p className="mt-0.5 text-[11px] leading-tight text-zinc-500">
            {t.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Privacy notice for the minimal owner public profile (design Batch 4 ·
 * Screen 6) — states plainly that no phone/email is exposed publicly. */
export function PrivacyNoticeBanner({ message }: { message: string }) {
  return (
    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-xs leading-relaxed text-amber-800">
      {message}
    </div>
  );
}

/** Service-area chips derived from the profile's real listings — never fabricated. */
export function AreaChips({ areas }: { areas: string[] }) {
  const list = areas.filter(Boolean);
  if (list.length === 0) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {list.map((a) => (
        <span
          key={a}
          className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700"
        >
          <svg
            className="h-3.5 w-3.5 text-brand"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          {a}
        </span>
      ))}
    </div>
  );
}
