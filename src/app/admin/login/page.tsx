"use client";

import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  AlertTriangle,
  Lock,
  Check,
} from "lucide-react";
import { adminLogin } from "@/lib/auth/actions";

const MAX_ATTEMPTS = 3;
const LOCKOUT_MINUTES = 30;

/** Batch 2 branded wordmark: "MGP Staff Portal" (graphite). */
function StaffMark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#3f3f46] text-white">
        <ShieldCheck className="h-[15px] w-[15px]" />
      </span>
      <span className="text-[13px] font-semibold text-white">
        MGP <span className="font-medium text-[#a1a1aa]">Staff Portal</span>
      </span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.4 17.7 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"
      />
      <path
        fill="#FBBC05"
        d="M10.4 28.7a14.5 14.5 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6l7.8-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.2 0 11.4-2 15.4-5.5l-7.5-5.8c-2.1 1.4-4.8 2.3-7.9 2.3-6.3 0-11.7-3.9-13.6-9.3l-7.8 6.1C6.5 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/admin";
  const justInvited = searchParams.get("invited") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failedCount, setFailedCount] = useState(0);
  const [lockedUntil, setLockedUntil] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const attemptsLeft = MAX_ATTEMPTS - failedCount;
  const locked = failedCount >= MAX_ATTEMPTS;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (locked) return;
    setErrors({});
    setNotice(null);

    if (!email) {
      setErrors({ email: "Enter your work email" });
      return;
    }
    if (!password) {
      setErrors({ password: "Enter your password" });
      return;
    }

    startTransition(async () => {
      const result = await adminLogin(email, password, redirectTo);
      if (!result.success) {
        if (result.fieldErrors) {
          const errs: Record<string, string> = {};
          Object.entries(result.fieldErrors).forEach(([k, v]) => {
            errs[k] = v[0] ?? "Invalid";
          });
          setErrors(errs);
          return;
        }
        const next = failedCount + 1;
        setFailedCount(next);
        if (next >= MAX_ATTEMPTS) {
          // Client-side lockout display time (design screen 15). Real
          // server-side lockout enforcement lands in Prompt 13.
          setLockedUntil(
            new Date(
              Date.now() + LOCKOUT_MINUTES * 60 * 1000
            ).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "Asia/Kolkata",
            })
          );
        }
        setErrors({ form: result.error });
        return;
      }
      router.push(result.data.redirectTo);
      router.refresh();
    });
  }

  const hasCredError = !!errors.form;

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#18181b] px-4 py-10">
      {/* Portal wordmark (top-left on desktop, stacked on mobile) */}
      <div className="mb-6 w-full max-w-[360px] sm:absolute sm:left-6 sm:top-6 sm:mb-0 sm:w-auto sm:max-w-none">
        <StaffMark />
      </div>

      {locked ? (
        // ── Screen 15: Account locked ──
        <div className="flex w-full max-w-[360px] flex-col items-center gap-2.5 rounded-2xl bg-white p-7 text-center shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF2F2]">
            <Lock className="h-[22px] w-[22px]" color="#DC2626" />
          </span>
          <div className="text-base font-semibold text-[#18181b]">
            Account locked
          </div>
          <p className="text-[13px] leading-[1.6] text-[#52525b]">
            Too many failed attempts. Locked until{" "}
            <strong className="font-semibold text-[#18181b]">
              {lockedUntil} IST
            </strong>
            . Your admin was notified.
          </p>
          <a
            href="/support"
            className="mt-1.5 rounded-[10px] border border-[#d4d4d8] px-4 py-2.5 text-[13px] font-medium text-[#3f3f46] hover:border-[#a1a1aa]"
          >
            Contact your admin
          </a>
          <div className="mt-1 text-[11px] text-[#a1a1aa]">
            Client-side guard · server-side lockout is enforced in a later phase.
          </div>
        </div>
      ) : (
        // ── Screens 14 (login) + 15 (invalid credentials banner) ──
        <div className="w-full max-w-[360px] rounded-2xl bg-white p-7 shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
          <div className="mb-4">
            <div className="text-[19px] font-semibold text-[#18181b]">
              Staff sign in
            </div>
            <div className="mt-1 text-[13px] leading-[1.55] text-[#52525b]">
              Use your work account.
            </div>
          </div>

          {justInvited && !hasCredError && (
            <div className="mb-4 flex gap-2 rounded-[10px] border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-2.5">
              <Check className="mt-px h-[15px] w-[15px] flex-shrink-0" color="#16A34A" />
              <span className="text-xs leading-[1.5] text-[#166534]">
                Your staff account is ready. Sign in with your work email and the
                password you just set.
              </span>
            </div>
          )}

          {hasCredError && (
            <div className="mb-4 flex gap-2 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-3 py-2.5">
              <AlertTriangle
                className="mt-px h-[15px] w-[15px] flex-shrink-0"
                color="#DC2626"
              />
              <span className="text-xs leading-[1.5] text-[#7F1D1D]">
                Invalid email or password.{" "}
                {attemptsLeft} attempt{attemptsLeft === 1 ? "" : "s"} remaining
                before a 30-minute lockout.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="admin-email"
                className="text-[13px] font-medium text-[#3f3f46]"
              >
                Work email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({ ...p, email: "", form: "" }));
                }}
                placeholder="you@mygujaratproperty.com"
                disabled={isPending}
                className={[
                  "w-full rounded-[10px] px-3 py-[11px] text-sm text-[#18181b] outline-none placeholder-[#a1a1aa] disabled:opacity-60",
                  hasCredError
                    ? "border-[1.5px] border-[#DC2626]"
                    : "border border-[#d4d4d8] focus:border-[1.5px] focus:border-[#18181b]",
                ].join(" ")}
              />
              {errors.email && (
                <p className="text-xs text-[#DC2626]" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="admin-password"
                className="text-[13px] font-medium text-[#3f3f46]"
              >
                Password
              </label>
              <div
                className={[
                  "flex items-center rounded-[10px] pr-2.5",
                  hasCredError
                    ? "border-[1.5px] border-[#DC2626]"
                    : "border border-[#d4d4d8] focus-within:border-[1.5px] focus-within:border-[#18181b]",
                ].join(" ")}
              >
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((p) => ({ ...p, password: "", form: "" }));
                  }}
                  placeholder="Your password"
                  disabled={isPending}
                  className="min-w-0 flex-1 rounded-[10px] bg-transparent px-3 py-[11px] text-sm text-[#18181b] outline-none placeholder-[#a1a1aa] disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-[#a1a1aa] hover:text-[#3f3f46]"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-[#DC2626]" role="alert">
                  {errors.password}
                </p>
              )}
              <button
                type="button"
                onClick={() =>
                  setNotice(
                    "Password reset isn't enabled yet (email provider not configured). Contact your Super Admin to reset your password."
                  )
                }
                className="self-end text-xs font-medium text-[#3f3f46] hover:text-[#18181b]"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isPending}
              aria-busy={isPending}
              className="rounded-[10px] bg-[#18181b] py-3 text-sm font-medium text-white transition-colors hover:bg-[#3f3f46] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-2.5">
            <span className="h-px flex-1 bg-[#e4e4e7]" />
            <span className="text-[11px] text-[#a1a1aa]">or</span>
            <span className="h-px flex-1 bg-[#e4e4e7]" />
          </div>

          <button
            type="button"
            onClick={() =>
              setNotice(
                "Google sign-in for staff isn't enabled yet (SETUP_REQUIRED). Use your work email and password, or contact your Super Admin."
              )
            }
            className="flex w-full items-center justify-center gap-2.5 rounded-[10px] border border-[#d4d4d8] py-[11px] text-sm font-medium text-[#3f3f46] hover:border-[#a1a1aa]"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {notice && (
            <p
              className="mt-3 rounded-[10px] border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-2 text-xs leading-[1.5] text-[#1E3A8A]"
              role="status"
            >
              {notice}
            </p>
          )}

          <div className="mt-4 text-center text-[11px] text-[#a1a1aa]">
            No public registration. Access is invite-only.
          </div>
        </div>
      )}

      <p className="mt-5 text-center text-[11px] text-[#71717a]">
        <Link href="/" className="hover:text-[#a1a1aa]">
          ← Back to public site
        </Link>
      </p>
      <p className="mt-2 font-mono text-[10px] text-[#3f3f46]">
        meta robots: noindex, nofollow · internal use only
      </p>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
