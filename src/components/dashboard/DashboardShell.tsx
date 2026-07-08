import { LogoutButton } from "@/components/auth/LogoutButton";

export function DashboardShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-surface-subtle">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-zinc-900 truncate">
              {title}
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">{subtitle}</p>
          </div>
          <LogoutButton redirectTo="/" />
        </div>
        {children}
      </div>
    </main>
  );
}

export function DashboardPageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-surface-subtle">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}
