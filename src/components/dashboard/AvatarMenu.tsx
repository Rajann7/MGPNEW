"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Moon, Sun, UserCircle } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

export function AvatarMenu({ userName }: { userName: string }) {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  const ref = useRef<HTMLDivElement>(null);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("mgp-theme", next ? "dark" : "light");
  }

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Account menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center text-xs font-semibold shrink-0"
      >
        {initials(userName) || "U"}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-surface shadow-lg z-30 overflow-hidden py-1">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-ink-soft hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
          >
            <UserCircle className="w-4 h-4" aria-hidden="true" />
            Profile
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-ink-soft hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
          >
            {isDark ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
            {isDark ? "Light mode" : "Dark mode"}
          </button>
          <div className="my-1 h-px bg-border" role="separator" />
          <LogoutButton
            redirectTo="/"
            className="w-full text-left px-3.5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-500/10 transition-colors"
          >
            Sign out
          </LogoutButton>
        </div>
      )}
    </div>
  );
}
