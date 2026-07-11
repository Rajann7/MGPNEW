"use client";

import { useState, useTransition, useEffect } from "react";
import { Home, Briefcase, Building2, ChevronLeft } from "lucide-react";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { OtpInput } from "@/components/auth/OtpInput";
import { requestOtp, verifyOtpAndRegister } from "@/lib/auth/actions";
import type { RegistrationData } from "@/types";

type Role = "owner" | "broker" | "builder";
type Step = "role" | "form" | "otp" | "provider_down";

const RESEND_COOLDOWN = 30;

const ROLE_META: Record<Role, { label: string; Icon: typeof Home }> = {
  owner: { label: "Owner", Icon: Home },
  broker: { label: "Broker / Agent", Icon: Briefcase },
  builder: { label: "Builder / Developer", Icon: Building2 },
};

function maskMobile(m: string): string {
  if (m.length !== 10) return m;
  return `${m[0]}XXXX XX${m.slice(7)}`;
}

const BTN_PRIMARY =
  "w-full rounded-[10px] py-[13px] text-sm font-medium text-white bg-[#0F6B5C] hover:bg-[#0C5648] transition-colors disabled:bg-[#e4e4e7] disabled:text-[#a1a1aa] disabled:cursor-not-allowed";
const FIELD =
  "w-full rounded-[10px] border border-[#d4d4d8] px-3 py-3 text-[15px] text-[#18181b] placeholder-[#a1a1aa] outline-none focus:border-[1.5px] focus:border-[#0F6B5C] focus:shadow-[0_0_0_3px_#E7F2EF]";

interface Props {
  mobile: string;
  onSuccess: (redirectTo: string, firstName?: string) => void;
  onBack: () => void;
  redirectTo?: string;
}

export function RegisterRoleForm({
  mobile,
  onSuccess,
  onBack,
  redirectTo,
}: Props) {
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cooldown, setCooldown] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function buildData(): RegistrationData {
    // role is guaranteed non-null here: this is only reachable from the
    // "form"/"otp" steps, which require an explicit role selection first.
    return {
      fullName,
      email,
      mobile,
      role: role as Role,
      termsAccepted: consent,
      privacyAccepted: consent,
      marketingOptIn: false,
    };
  }

  function validateForm(): boolean {
    const errs: Record<string, string> = {};
    if (!fullName || fullName.trim().length < 2)
      errs.fullName = "Enter your full name (minimum 2 characters)";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email address";
    if (!consent) errs.consent = "Please accept the Terms & Privacy Policy";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function sendOtp() {
    startTransition(async () => {
      const r = await requestOtp(mobile, "register");
      if (!r.success) {
        if (r.error === "OTP_PROVIDER_SETUP_REQUIRED") {
          setStep("provider_down");
          return;
        }
        setErrors({ form: r.error });
        return;
      }
      setStep("otp");
      setCooldown(RESEND_COOLDOWN);
    });
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    sendOtp();
  }

  function submitOtp(code: string) {
    if (code.length < 6 || isPending) return;
    startTransition(async () => {
      const result = await verifyOtpAndRegister(code, buildData(), redirectTo);
      if (!result.success) {
        if (result.error === "OTP_PROVIDER_SETUP_REQUIRED") {
          setStep("provider_down");
          return;
        }
        setOtp("");
        if (result.fieldErrors) {
          const errs: Record<string, string> = {};
          Object.entries(result.fieldErrors).forEach(([k, v]) => {
            errs[k] = v[0] ?? "Invalid";
          });
          setErrors(errs);
        } else {
          setErrors({ otp: result.error });
        }
        return;
      }
      onSuccess(result.data.redirectTo, result.data.firstName);
    });
  }

  // ── Role selector (design screen 8) ──
  if (step === "role") {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to login"
            className="-ml-1.5 mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[#3f3f46] hover:bg-[#f4f4f5]"
          >
            <ChevronLeft className="h-[18px] w-[18px]" />
          </button>
          <div>
            <div className="text-[20px] font-semibold leading-[1.35] text-[#18181b]">
              Who are you?
            </div>
            <div className="mt-1 text-[13px] leading-[1.55] text-[#52525b]">
              This decides your dashboard and what you can post.
            </div>
          </div>
        </div>
        <RoleSelector value={role} onChange={setRole} />
        <button
          type="button"
          onClick={() => setStep("form")}
          disabled={!role}
          className={BTN_PRIMARY}
        >
          {role
            ? `Continue as ${ROLE_META[role].label.split(" / ")[0]}`
            : "Select a role to continue"}
        </button>
      </div>
    );
  }

  // ── Provider unavailable ──
  if (step === "provider_down") {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-[18px] font-semibold text-[#18181b]">
          SMS OTP temporarily unavailable
        </div>
        <p className="text-[13px] leading-[1.6] text-[#52525b]">
          We couldn&rsquo;t send your code right now. Please try again in a few
          minutes.
        </p>
        <button
          type="button"
          onClick={() => setStep("form")}
          className="rounded-[10px] border border-[#d4d4d8] py-3 text-sm font-medium text-[#3f3f46] hover:border-[#a1a1aa]"
        >
          Try again
        </button>
      </div>
    );
  }

  // ── OTP verify (design screen 10) ──
  if (step === "otp") {
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
          <div className="text-[18px] font-semibold leading-[1.35] text-[#18181b]">
            Verify your number
          </div>
          <div className="mt-1 text-[13px] leading-[1.55] text-[#52525b]">
            Last step — OTP sent to{" "}
            <strong className="font-semibold text-[#18181b]">
              +91 {maskMobile(mobile)}
            </strong>
          </div>
        </div>
        <OtpInput
          value={otp}
          onChange={(v) => {
            setOtp(v);
            setErrors((p) => {
              const n = { ...p };
              delete n.otp;
              return n;
            });
          }}
          onComplete={submitOtp}
          disabled={isPending}
          error={!!errors.otp}
        />
        {errors.otp && (
          <p className="text-center text-xs text-[#DC2626]" role="alert">
            {errors.otp}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending || otp.length < 6}
          className={BTN_PRIMARY}
        >
          {isPending ? "Creating account…" : "Verify & create account"}
        </button>
        <div className="text-center text-[13px] text-[#52525b]">
          {cooldown > 0 ? (
            <span className="text-[#a1a1aa]">
              Resend OTP in{" "}
              <strong className="font-semibold tabular-nums">
                0:{String(cooldown).padStart(2, "0")}
              </strong>
            </span>
          ) : (
            <>
              Didn&rsquo;t get it?{" "}
              <button
                type="button"
                onClick={sendOtp}
                disabled={isPending}
                className="font-medium text-[#0F6B5C] disabled:opacity-50"
              >
                Resend OTP
              </button>
            </>
          )}
        </div>
      </form>
    );
  }

  // ── Registration form (design screen 9) ──
  // role is guaranteed non-null: only reachable after explicit selection above.
  const activeRole = role as Role;
  const RoleIcon = ROLE_META[activeRole].Icon;
  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className="flex flex-col gap-3.5"
    >
      {/* Role chip */}
      <div className="flex items-center gap-2.5 rounded-xl bg-[#E7F2EF] px-3.5 py-2.5">
        <RoleIcon className="h-4 w-4 flex-shrink-0" color="#0F6B5C" />
        <span className="flex-1 text-[13px] font-medium text-[#0F6B5C]">
          Registering as {ROLE_META[activeRole].label}
        </span>
        <button
          type="button"
          onClick={() => setStep("role")}
          className="text-xs font-medium text-[#0F6B5C] underline"
        >
          Change
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="mgp-fullname"
          className="text-[13px] font-medium text-[#3f3f46]"
        >
          Full name *
        </label>
        <input
          id="mgp-fullname"
          type="text"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
          maxLength={100}
          className={FIELD}
        />
        {errors.fullName && (
          <p className="text-xs text-[#DC2626]" role="alert">
            {errors.fullName}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="mgp-email"
          className="text-[13px] font-medium text-[#3f3f46]"
        >
          Email <span className="font-normal text-[#a1a1aa]">(optional)</span>
        </label>
        <input
          id="mgp-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          maxLength={200}
          className={FIELD}
        />
        <span className="text-xs text-[#71717a]">
          Used for receipts and account recovery.
        </span>
        {errors.email && (
          <p className="text-xs text-[#DC2626]" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#a1a1aa]">
          Mobile number
        </label>
        <div className="flex overflow-hidden rounded-[10px] border border-[#e4e4e7] bg-[#fafafa]">
          <span className="flex-shrink-0 border-r border-[#e4e4e7] px-3 py-3 text-sm font-medium text-[#a1a1aa]">
            🇮🇳 +91
          </span>
          <input
            value={`+91 ${mobile}`.replace("+91 ", "")}
            disabled
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[15px] text-[#a1a1aa] outline-none"
          />
        </div>
        <span className="text-xs text-[#71717a]">
          Prefilled from the previous step.
        </span>
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
          <a
            href="/legal/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#0F6B5C]"
          >
            Terms of Use
          </a>{" "}
          and{" "}
          <a
            href="/legal/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#0F6B5C]"
          >
            Privacy Policy
          </a>
          . <strong className="font-medium text-[#3f3f46]">(mandatory)</strong>
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-[#DC2626]" role="alert">
          {errors.consent}
        </p>
      )}
      {errors.form && (
        <p
          className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-xs text-[#7F1D1D]"
          role="alert"
        >
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={`${BTN_PRIMARY} mt-1`}
      >
        {isPending ? "Sending OTP…" : "Send OTP to verify"}
      </button>
    </form>
  );
}
