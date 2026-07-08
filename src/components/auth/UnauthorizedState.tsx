"use client";

import Link from "next/link";

type Reason =
  | "login_required"
  | "wrong_role"
  | "account_restricted"
  | "account_deleted"
  | "admin_denied"
  | "staff_disabled"
  | "staff_inactive"
  | "permission_denied"
  | string;

const MESSAGES: Record<string, { title: string; body: string }> = {
  login_required: {
    title: "Login Required",
    body: "Please log in to access this page.",
  },
  wrong_role: {
    title: "Access Not Available",
    body: "This dashboard is not available for your role.",
  },
  account_restricted: {
    title: "Account Restricted",
    body: "Your account is currently restricted. Please contact support.",
  },
  account_deleted: {
    title: "Account Unavailable",
    body: "This account is no longer active.",
  },
  admin_denied: {
    title: "Admin Access Denied",
    body: "You do not have permission to access the admin panel.",
  },
  staff_disabled: {
    title: "Staff Account Disabled",
    body: "Your staff account has been disabled. Please contact a Super Admin.",
  },
  staff_inactive: {
    title: "Staff Account Inactive",
    body: "Your staff account is not yet active.",
  },
  permission_denied: {
    title: "Permission Denied",
    body: "You do not have permission to access this admin module.",
  },
};

const DEFAULT_MESSAGE = {
  title: "Access Denied",
  body: "You do not have permission to access this page.",
};

interface Props {
  reason?: Reason;
  showHomeLink?: boolean;
  showLoginLink?: boolean;
}

export function UnauthorizedState({
  reason,
  showHomeLink = true,
  showLoginLink = false,
}: Props) {
  const msg = (reason ? MESSAGES[reason] : undefined) ?? DEFAULT_MESSAGE;

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      </div>
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{msg.title}</h1>
        <p className="text-sm text-gray-500 mt-1 max-w-xs">{msg.body}</p>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        {showLoginLink && (
          <Link
            href="/login"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline"
          >
            Log In
          </Link>
        )}
        {showHomeLink && (
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 underline-offset-2 hover:underline"
          >
            Go to Home
          </Link>
        )}
      </div>
    </div>
  );
}
