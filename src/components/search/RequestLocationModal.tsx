"use client";

import { useState, useTransition } from "react";
import { X, Check } from "lucide-react";
import { requestLocation } from "@/lib/actions/location-request";

/**
 * Batch 3 · §4 "Request a location" modal (desktop dialog + mobile bottom-sheet
 * share the same content). Real submission → public.location_requests.
 */
export function RequestLocationModal({
  open,
  defaultLocation,
  onClose,
}: {
  open: boolean;
  defaultLocation?: string;
  onClose: () => void;
}) {
  const [location, setLocation] = useState(defaultLocation ?? "");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!open) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    startTransition(async () => {
      const r = await requestLocation(location, contact);
      if (!r.success) {
        if (r.fieldErrors) {
          const errs: Record<string, string> = {};
          Object.entries(r.fieldErrors).forEach(([k, v]) => {
            errs[k] = v[0] ?? "Invalid";
          });
          setErrors(errs);
        } else {
          setErrors({ form: "Something went wrong. Please try again." });
        }
        return;
      }
      setDone(true);
    });
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-[rgba(24,24,27,0.45)]"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request a location"
        onClick={(e) => e.stopPropagation()}
        className={[
          "fixed z-50 w-full bg-white",
          "bottom-0 left-0 right-0 rounded-t-[20px] shadow-[0_-8px_32px_rgba(0,0,0,0.15)]",
          "sm:bottom-auto sm:left-1/2 sm:right-auto sm:top-1/2 sm:max-w-[400px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[16px] sm:shadow-[0_12px_32px_rgba(0,0,0,0.2)]",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-[#f4f4f5] px-5 py-4">
          <span className="text-[15px] font-semibold text-ink">
            {done ? "Request received" : "Request a location"}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center gap-2.5 px-6 py-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft">
              <Check className="h-7 w-7 text-brand" />
            </span>
            <p className="text-[13px] leading-[1.6] text-ink-soft">
              Thanks — we&rsquo;ll notify you at{" "}
              <strong className="text-ink">{contact}</strong> when listings open
              up in <strong className="text-ink">{location}</strong>.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-[10px] bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-col gap-3.5 p-5">
            <p className="text-[13px] leading-[1.6] text-ink-soft">
              Tell us where you&rsquo;re looking. We&rsquo;ll notify you when
              listings open up in this area.
            </p>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rl-loc" className="text-[13px] font-medium text-[#3f3f46]">
                Location
              </label>
              <input
                id="rl-loc"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Jasdan, Rajkot district"
                maxLength={200}
                className="rounded-[10px] border border-[#d4d4d8] px-3 py-2.5 text-sm text-ink outline-none focus:border-brand"
              />
              {errors.location && (
                <p className="text-xs text-[#DC2626]">{errors.location}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rl-contact" className="text-[13px] font-medium text-[#3f3f46]">
                Notify me at (email or mobile)
              </label>
              <input
                id="rl-contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="you@example.com or 98250 12345"
                maxLength={200}
                className="rounded-[10px] border border-[#d4d4d8] px-3 py-2.5 text-sm text-ink outline-none focus:border-brand"
              />
              {errors.contact && (
                <p className="text-xs text-[#DC2626]">{errors.contact}</p>
              )}
            </div>
            {errors.form && (
              <p className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-xs text-[#7F1D1D]">
                {errors.form}
              </p>
            )}
            <div className="mt-1 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-[10px] px-4 py-2.5 text-[13px] font-medium text-[#3f3f46] hover:bg-surface-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-[10px] bg-brand px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-brand-hover disabled:opacity-60"
              >
                {isPending ? "Submitting…" : "Submit request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
