"use client";

import { useTransition } from "react";
import { logout } from "@/lib/auth/actions";

interface Props {
  redirectTo?: string;
  className?: string;
  children?: React.ReactNode;
}

export function LogoutButton({ redirectTo, className, children }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logout(redirectTo);
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      aria-busy={isPending}
      className={
        className ??
        "text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      }
    >
      {isPending ? "Signing out…" : (children ?? "Sign Out")}
    </button>
  );
}
