import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

/** Public-safe breadcrumb trail. Never include hidden contact/private address in labels. */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 overflow-x-auto whitespace-nowrap"
    >
      <ol className="flex items-center gap-1.5 text-xs text-zinc-500">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-brand transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-zinc-700 font-medium truncate max-w-[220px]">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
