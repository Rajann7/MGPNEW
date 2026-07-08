"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, X, Check } from "lucide-react";
import { MobileOtpForm } from "@/components/auth/MobileOtpForm";
import { RegisterRoleForm } from "@/components/auth/RegisterRoleForm";
import type { AuthStep } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  step: AuthStep;
  mobile: string;
  redirectTo?: string;
  onStepChange: (step: AuthStep) => void;
  onMobileChange: (mobile: string) => void;
}

export function AuthModal({
  isOpen,
  onClose,
  step,
  mobile,
  redirectTo,
  onStepChange,
  onMobileChange,
}: Props) {
  const router = useRouter();
  const [success, setSuccess] = useState<{ name: string; to: string } | null>(
    null
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Escape is disabled while the success redirect is in flight.
      if (e.key === "Escape" && !success) onClose();
    },
    [onClose, success]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  // ── Success interstitial (design screen 13): "You're in, {name}" then redirect ──
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => {
      onClose();
      setSuccess(null);
      router.push(success.to);
      router.refresh();
    }, 1200);
    return () => clearTimeout(t);
  }, [success, onClose, router]);

  function handleSuccess(destination: string, firstName?: string) {
    setSuccess({ name: firstName?.trim() || "", to: destination });
  }

  function handleRegistrationNeeded(mob: string) {
    onMobileChange(mob);
    onStepChange("registration_form");
  }

  if (!isOpen) return null;

  const isRegister =
    step === "registration_form" || step === "otp_verify_register";

  return (
    <>
      {/* Backdrop rgba(24,24,27,.45) — click outside closes */}
      <div
        className="fixed inset-0 z-40 bg-[rgba(24,24,27,0.45)]"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel — mobile bottom sheet (r20) / desktop centered modal (r16) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isRegister ? "Create account" : "Login or register"}
        onClick={(e) => e.stopPropagation()}
        className={[
          "fixed z-50 w-full bg-white",
          // Mobile bottom sheet
          "bottom-0 left-0 right-0 rounded-t-[20px] max-h-[92dvh] overflow-y-auto shadow-[0_-8px_32px_rgba(0,0,0,0.15)]",
          // Desktop centered
          "sm:bottom-auto sm:left-1/2 sm:right-auto sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
          "sm:rounded-[16px] sm:max-h-[92vh] sm:shadow-[0_12px_32px_rgba(0,0,0,0.2)]",
          isRegister ? "sm:max-w-[460px]" : "sm:max-w-[400px]",
        ].join(" ")}
      >
        {/* Drag handle (mobile only) */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <span className="h-1 w-9 rounded-full bg-[#d4d4d8]" />
        </div>

        {/* Header: brand logo (left) + close (right) */}
        <div className="flex items-center justify-between px-5 pt-3 sm:px-6 sm:pt-[18px]">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F6B5C] text-white">
            <Building2 className="h-[17px] w-[17px]" />
          </span>
          {!success && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71717a] transition-colors hover:bg-[#f4f4f5]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="px-5 pb-6 pt-3 sm:px-6 sm:pt-3">
          {success ? (
            <div
              className="flex flex-col items-center gap-3 py-6 text-center"
              role="status"
              aria-live="polite"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F2EF] shadow-[0_4px_12px_rgba(15,107,92,0.2)]">
                <Check className="h-[30px] w-[30px]" color="#0F6B5C" />
              </span>
              <div className="text-[17px] font-semibold text-[#18181b]">
                {success.name ? `You're in, ${success.name}` : "You're in"}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#52525b]">
                <span className="inline-block h-[13px] w-[13px] animate-spin rounded-full border-2 border-[#d4d4d8] border-t-[#0F6B5C]" />
                Redirecting to your dashboard…
              </div>
            </div>
          ) : !isRegister ? (
            <MobileOtpForm
              onRegistrationNeeded={handleRegistrationNeeded}
              onSuccess={handleSuccess}
              redirectTo={redirectTo}
            />
          ) : (
            <RegisterRoleForm
              mobile={mobile}
              onSuccess={handleSuccess}
              onBack={() => onStepChange("mobile_entry")}
              redirectTo={redirectTo}
            />
          )}
        </div>
      </div>
    </>
  );
}
