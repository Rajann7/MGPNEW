"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import { AlertTriangle, Lock, Info, User } from "lucide-react";
import {
  checkMobileExists,
  requestOtp,
  verifyOtpAndLogin,
} from "@/lib/auth/actions";
import { OtpInput } from "@/components/auth/OtpInput";

type Step =
  | "mobile"
  | "unregistered"
  | "otp"
  | "rate_limited"
  | "provider_down";

const RESEND_COOLDOWN = 30;

interface Props {
  onRegistrationNeeded: (mobile: string) => void;
  onSuccess: (redirectTo: string, firstName?: string) => void;
  redirectTo?: string;
}

/** Mask a 10-digit mobile to the design format: 9XXXX XX210 */
function maskMobile(m: string): string {
  if (m.length !== 10) return m;
  return `${m[0]}XXXX XX${m.slice(7)}`;
}

const BTN_PRIMARY =
  "w-full rounded-[10px] py-[13px] text-sm font-medium text-white bg-[#0F6B5C] hover:bg-[#0C5648] transition-colors disabled:bg-[#e4e4e7] disabled:text-[#a1a1aa] disabled:cursor-not-allowed";

export function MobileOtpForm({
  onRegistrationNeeded,
  onSuccess,
  redirectTo,
}: Props) {
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [consent, setConsent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lockoutMessage, setLockoutMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const sendOtp = useCallback(() => {
    setError(null);
    startTransition(async () => {
      const r = await requestOtp(mobile, "login");
      if (!r.success) {
        if (r.error === "OTP_PROVIDER_SETUP_REQUIRED") {
          setStep("provider_down");
          return;
        }
        setError(r.error);
        return;
      }
      setStep("otp");
      setCooldown(RESEND_COOLDOWN);
    });
  }, [mobile]);

  function handleMobileSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mobile.length < 10 || !consent) return;
    setError(null);
    startTransition(async () => {
      const check = await checkMobileExists(mobile);
      if (!check.success) {
        setError(check.error);
        return;
      }
      if (!check.data.exists) {
        // Design screen 7 — intermediate confirm before registration.
        setStep("unregistered");
        return;
      }
      const r = await requestOtp(mobile, "login");
      if (!r.success) {
        if (r.error === "OTP_PROVIDER_SETUP_REQUIRED") {
          setStep("provider_down");
          return;
        }
        setError(r.error);
        return;
      }
      setStep("otp");
      setCooldown(RESEND_COOLDOWN);
    });
  }

  const submitOtp = useCallback(
    (code: string) => {
      if (code.length < 6 || isPending) return;
      setError(null);
      startTransition(async () => {
        const result = await verifyOtpAndLogin(mobile, code, redirectTo);
        if (!result.success) {
          if (result.error === "OTP_PROVIDER_SETUP_REQUIRED") {
            setStep("provider_down");
            return;
          }
          setOtp("");
          // The server is the only real gate (auth_login_attempts table).
          // We never guess a remaining-attempts count client-side — that
          // count is unknowable here (resets on reload, doesn't survive
          // navigation) and showing a fake one previously caused a fake
          // "locked for 15 min" screen to appear after only 3 tries even
          // though the server's actual cap is 5, so the "lock" wasn't real
          // and the same number could immediately retry. Only the server's
          // own lockout response ever switches to the lockout screen now.
          if (result.error.startsWith("Too many incorrect attempts")) {
            setLockoutMessage(result.error);
            setStep("rate_limited");
            return;
          }
          setError("Incorrect or expired OTP. Please try again.");
          return;
        }
        onSuccess(result.data.redirectTo, result.data.firstName);
      });
    },
    [mobile, redirectTo, isPending, onSuccess]
  );

  // ── Unregistered number → register prompt (design screen 7) ──
  if (step === "unregistered") {
    return (
      <div className="flex flex-col items-center gap-2.5 py-2 text-center">
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#E7F2EF]">
          <User className="h-6 w-6" color="#0F6B5C" />
        </span>
        <div className="text-[17px] font-semibold text-[#18181b]">
          This number isn&rsquo;t registered
        </div>
        <p className="text-[13px] leading-[1.6] text-[#52525b]">
          +91 {mobile} is new to us.
          <br />
          Create a free account to continue?
        </p>
        <button
          type="button"
          onClick={() => onRegistrationNeeded(mobile)}
          className="mt-2 w-full rounded-[10px] bg-[#0F6B5C] py-[13px] text-sm font-medium text-white transition-colors hover:bg-[#0C5648]"
        >
          Create account
        </button>
        <button
          type="button"
          onClick={() => {
            setStep("mobile");
            setMobile("");
            setConsent(false);
            setError(null);
          }}
          className="w-full rounded-[10px] py-2.5 text-[13px] font-medium text-[#3f3f46] hover:bg-[#f4f4f5]"
        >
          Use a different number
        </button>
      </div>
    );
  }

  // ── Honest full-stop: too many attempts (design screen 6). Server-enforced. ──
  if (step === "rate_limited") {
    return (
      <div className="flex flex-col items-center gap-2.5 py-2 text-center">
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FEF2F2]">
          <Lock className="h-6 w-6" color="#DC2626" />
        </span>
        <div className="text-[17px] font-semibold text-[#18181b]">Too many attempts</div>
        <p className="text-[13px] leading-[1.6] text-[#52525b]">
          {lockoutMessage ?? (
            <>
              For your security, OTP login for this number is paused.
              <br />
              Try again in <strong className="font-semibold text-[#18181b]">15 minutes</strong>.
            </>
          )}
        </p>
        <button
          type="button"
          onClick={() => {
            setStep("mobile");
            setOtp("");
            setError(null);
            // Not resetting lockoutMessage here on purpose: if the user
            // re-enters the same number and requests a fresh OTP, the next
            // verify attempt still re-checks the real server-side lockout —
            // this only clears the locally cached copy of that message.
            setLockoutMessage(null);
          }}
          className="mt-2 rounded-[10px] border border-[#d4d4d8] px-[18px] py-2.5 text-[13px] font-medium text-[#3f3f46] hover:border-[#a1a1aa]"
        >
          Back to browsing
        </button>
        <div className="text-[11px] text-[#a1a1aa]">No bypass, no alternate path shown.</div>
      </div>
    );
  }

  // ── OTP provider unavailable (design screen 11) — never fake success. ──
  if (step === "provider_down") {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-[18px] font-semibold leading-[1.35] text-[#18181b]">Login or register</div>
          <div className="mt-0.5 text-xs text-[#52525b]">+91 {mobile}</div>
        </div>
        <div className="flex gap-2.5 rounded-[10px] border border-[#BFDBFE] bg-[#EFF6FF] px-3.5 py-3">
          <Info className="mt-px h-4 w-4 flex-shrink-0" color="#2563EB" />
          <div>
            <div className="text-[13px] font-medium text-[#1E3A8A]">SMS OTP temporarily unavailable</div>
            <div className="mt-0.5 text-xs leading-[1.5] text-[#3f3f46]">
              We couldn&rsquo;t send your code right now. Please try again in a few minutes.
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setStep("mobile");
            setError(null);
          }}
          className="rounded-[10px] border border-[#d4d4d8] py-3 text-sm font-medium text-[#3f3f46] hover:border-[#a1a1aa]"
        >
          Try again
        </button>
      </div>
    );
  }

  // ── Mobile number entry (design screens 1–2) ──
  if (step === "mobile") {
    return (
      <form onSubmit={handleMobileSubmit} noValidate className="flex flex-col gap-4">
        <div>
          <div className="text-[20px] font-semibold leading-[1.35] text-[#18181b]">Login or register</div>
          <div className="mt-1 text-[13px] leading-[1.55] text-[#52525b]">
            We&rsquo;ll check your number and send an OTP.
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="mgp-mobile" className="text-[13px] font-medium text-[#3f3f46]">
            Mobile number
          </label>
          <div className="flex overflow-hidden rounded-[10px] border border-[#d4d4d8] focus-within:border-[1.5px] focus-within:border-[#0F6B5C] focus-within:shadow-[0_0_0_3px_#E7F2EF]">
            <span className="flex flex-shrink-0 items-center gap-1.5 border-r border-[#e4e4e7] bg-[#fafafa] px-3 py-3 text-sm font-medium text-[#3f3f46] select-none">
              🇮🇳 +91
            </span>
            <input
              id="mgp-mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
                setError(null);
              }}
              placeholder="10-digit mobile"
              maxLength={10}
              className="min-w-0 flex-1 px-3 py-3 text-[15px] text-[#18181b] placeholder-[#a1a1aa] outline-none"
            />
          </div>
          {error && (
            <p className="text-xs text-[#DC2626]" role="alert">
              {error}
            </p>
          )}
        </div>

        <label className="flex cursor-pointer gap-2.5 text-xs leading-[1.55] text-[#52525b]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-px h-[18px] w-[18px] flex-shrink-0 rounded-[5px] accent-[#0F6B5C]"
          />
          <span>
            I agree to the{" "}
            <a href="/legal/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-[#0F6B5C]">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-[#0F6B5C]">
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <button type="submit" disabled={isPending || mobile.length < 10 || !consent} className={BTN_PRIMARY}>
          {isPending ? "Checking…" : "Continue"}
        </button>
        {(mobile.length < 10 || !consent) && (
          <div className="-mt-1 text-center text-[11px] text-[#a1a1aa]">
            Continue stays disabled until consent is ticked + 10 digits entered.
          </div>
        )}
      </form>
    );
  }

  // ── OTP verify (design screens 3–5) ──
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitOtp(otp);
      }}
      noValidate
      className="flex flex-col gap-4"
    >
      <div>
        <div className="text-[20px] font-semibold leading-[1.35] text-[#18181b]">Welcome back</div>
        <div className="mt-1 text-[13px] leading-[1.55] text-[#52525b]">
          OTP sent to <strong className="font-semibold text-[#18181b]">+91 {maskMobile(mobile)}</strong> ·{" "}
          <button
            type="button"
            onClick={() => {
              setStep("mobile");
              setOtp("");
              setError(null);
            }}
            className="font-medium text-[#0F6B5C]"
          >
            Change
          </button>
        </div>
      </div>

      {error && (
        <div className="flex gap-2 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-3 py-2.5">
          <AlertTriangle className="mt-px h-[15px] w-[15px] flex-shrink-0" color="#DC2626" />
          <span className="text-xs leading-[1.5] text-[#7F1D1D]">{error}</span>
        </div>
      )}

      <OtpInput
        value={otp}
        onChange={(v) => {
          setOtp(v);
          setError(null);
        }}
        onComplete={submitOtp}
        disabled={isPending}
        error={!!error}
      />
      {!error && (
        <div className="text-center text-xs text-[#71717a]">
          First box auto-focused · auto-advance on entry · auto-submit on 6th digit.
        </div>
      )}

      <button type="submit" disabled={isPending || otp.length < 6} className={BTN_PRIMARY}>
        {isPending ? "Verifying…" : error ? "Try again" : "Verify & login"}
      </button>

      <div className="text-center text-[13px] text-[#52525b]">
        {cooldown > 0 ? (
          <span className="text-[#a1a1aa]">
            Resend OTP in{" "}
            <strong className="font-semibold tabular-nums">0:{String(cooldown).padStart(2, "0")}</strong>{" "}
            <span className="text-[11px]">· link disabled during cooldown</span>
          </span>
        ) : (
          <>
            Didn&rsquo;t get it?{" "}
            <button type="button" onClick={sendOtp} disabled={isPending} className="font-medium text-[#0F6B5C] disabled:opacity-50">
              Resend OTP
            </button>
          </>
        )}
      </div>
    </form>
  );
}
