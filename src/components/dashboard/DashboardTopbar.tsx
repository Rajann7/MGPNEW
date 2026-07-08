import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { NotificationBell } from "./NotificationBell";

export function DashboardTopbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 h-16 px-4 sm:px-6 border-b border-border bg-surface/90 backdrop-blur">
      <h1 className="text-sm font-semibold text-ink truncate">{title}</h1>

      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-xl bg-ink/5 dark:bg-white/10 text-ink-muted text-sm w-48">
          <Search className="w-4 h-4" aria-hidden="true" />
          <span className="truncate">Search…</span>
        </div>
        <ThemeToggle />
        <NotificationBell />
        <LogoutButton
          redirectTo="/"
          className="text-xs font-medium text-ink-soft hover:text-ink px-3 py-1.5 rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
        />
      </div>
    </header>
  );
}
