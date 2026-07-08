import Link from "next/link";

/**
 * Footer — rebuilt to match the finished design ("for header sidebar mobile"):
 * graphite #1C1C1E, brand block + Explore / Company / Legal columns, and a
 * marketplace disclaimer strip. Every link resolves to a REAL existing route —
 * routes not yet built point to /support so there are no dead links (full
 * CMS/legal pages arrive in Prompt 11).
 */
const EXPLORE = [
  { label: "Buy property", href: "/search?purpose=buy" },
  { label: "Rent property", href: "/search?purpose=rent" },
  { label: "New projects", href: "/search?entity=project" },
  { label: "Post requirement", href: "/dashboard" },
];

const COMPANY = [
  { label: "About us", href: "/support" },
  { label: "Plans & pricing", href: "/pricing" },
  { label: "Contact", href: "/support" },
  { label: "Help center", href: "/support" },
];

const LEGAL = [
  { label: "Terms of use", href: "/legal/terms" },
  { label: "Privacy policy", href: "/legal/privacy" },
  { label: "Refund policy", href: "/legal/refund" },
  { label: "Report a listing", href: "/support" },
];

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
        {title}
      </div>
      {links.map((l) => (
        <Link
          key={l.label}
          href={l.href}
          className="text-[13.5px] text-white/70 transition-colors hover:text-white"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}

export function PublicFooter() {
  return (
    <footer className="mt-auto bg-[#1C1C1E]" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-3.5 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-brand text-[13px] font-bold text-white">
                MG
              </span>
              <span className="text-[15px] font-semibold text-white">
                My Gujarat Property
              </span>
            </Link>
            <p className="max-w-[280px] text-[13px] leading-[1.65] text-white/55">
              Gujarat&rsquo;s property marketplace for owners, brokers and
              builders. Search, post and connect — directly.
            </p>
          </div>

          <Column title="Explore" links={EXPLORE} />
          <Column title="Company" links={COMPANY} />
          <Column title="Legal" links={LEGAL} />
        </div>

        <div className="mt-11 flex flex-col gap-2 border-t border-white/10 pt-6">
          <span className="text-xs leading-[1.6] text-white/45">
            My Gujarat Property is a listing marketplace. We are not a party to
            any transaction between users and do not act as a broker or agent.
            Please verify all property details and documents independently before
            transacting.
          </span>
          <span className="text-xs text-white/35">
            © {new Date().getFullYear()} My Gujarat Property. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
