"use client";

import { useRouter } from "next/navigation";

interface Props {
  /** Destination when user is already logged in */
  href: string;
  /** Redirect used in login URL when guest (defaults to /login?redirectTo=href) */
  loginHref?: string;
  isLoggedIn: boolean;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

/**
 * Wrapper for CTAs that require authentication.
 * - Guest: redirects to login with redirectTo param
 * - Logged-in: navigates to href
 */
export function AuthTrigger({
  href,
  loginHref,
  isLoggedIn,
  children,
  className,
  "aria-label": ariaLabel,
}: Props) {
  const router = useRouter();

  function handleClick() {
    if (isLoggedIn) {
      router.push(href);
    } else {
      router.push(loginHref ?? `/login?redirectTo=${encodeURIComponent(href)}`);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
