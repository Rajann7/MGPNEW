"use client";

import { useRef, useEffect } from "react";

interface Props {
  value: string;
  onChange: (otp: string) => void;
  /** Fires when all 6 digits are filled — used for auto-submit on the 6th digit. */
  onComplete?: (otp: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  idPrefix?: string;
}

const LENGTH = 6;

/**
 * 6-box OTP input — ported 1:1 from the finished Batch 2 design (48×54 boxes,
 * font 600 20px, radius 10px, first/active box brand border + #E7F2EF focus ring,
 * error boxes in #DC2626). Boxes flex to stay overflow-safe down to 320px.
 * Behavior: first box auto-focused, auto-advance, backspace-back, paste-fill,
 * onComplete fires on the 6th digit (auto-submit).
 */
export function OtpInput({
  value,
  onChange,
  onComplete,
  disabled = false,
  error = false,
  autoFocus = true,
  idPrefix = "otp",
}: Props) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  const digits = Array.from({ length: LENGTH }, (_, i) => value[i] ?? "");

  function setDigit(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    const joined = next.join("").slice(0, LENGTH);
    onChange(joined);
    if (joined.length === LENGTH && onComplete) onComplete(joined);
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    setDigit(index, digit);
    if (index < LENGTH - 1) refs.current[index + 1]?.focus();
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        setDigit(index, "");
      } else if (index > 0) {
        refs.current[index - 1]?.focus();
        setDigit(index - 1, "");
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, LENGTH);
    if (!pasted) return;
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, LENGTH - 1);
    refs.current[focusIndex]?.focus();
    if (pasted.length === LENGTH && onComplete) onComplete(pasted);
  }

  return (
    <div
      className="flex gap-2 justify-center"
      role="group"
      aria-label="6-digit OTP"
    >
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          id={`${idPrefix}-${i}`}
          type="tel"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={[
            "min-w-0 flex-1 max-w-[48px] h-[52px] sm:h-[54px] rounded-[10px] text-center",
            "font-semibold text-[20px] leading-none outline-none bg-white transition-shadow",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            error
              ? "border-[1.5px] border-[#DC2626] text-[#DC2626]"
              : "border border-[#d4d4d8] text-[#18181b] focus:border-[1.5px] focus:border-[#0F6B5C] focus:shadow-[0_0_0_3px_#E7F2EF]",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
