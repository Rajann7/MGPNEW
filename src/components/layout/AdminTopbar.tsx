import { LogoutButton } from "@/components/auth/LogoutButton";

export function AdminTopbar({
  title,
  leading,
}: {
  title: string;
  leading?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 h-16 px-4 sm:px-6 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="flex items-center gap-1 min-w-0">
        {leading}
        <h1 className="text-sm font-semibold text-zinc-900 truncate">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="hidden sm:inline-flex items-center text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
          Internal — noindex
        </span>
        <LogoutButton
          redirectTo="/admin/login"
          className="text-xs font-medium text-zinc-600 hover:text-zinc-900 px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
        />
      </div>
    </header>
  );
}
