"use client";

import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { Building2, X, Check } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { submitProfileClaim } from "@/lib/actions/claims";

const CLAIM_ROLES = [
  { value: "owner_director", label: "Director / Partner" },
  { value: "authorized_signatory", label: "Authorized signatory" },
  { value: "marketing_head", label: "Marketing head" },
  { value: "other", label: "Other" },
];

const ERR: Record<string, string> = {
  AUTH_REQUIRED: "Please log in to claim this profile.",
  OWN_PROFILE: "This is already your own profile.",
  ALREADY_REQUESTED: "You already have a pending claim request for this profile.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
};

/**
 * "Is this your business?" claim CTA (design Batch 4 · Screen 7). Real
 * submission -> profile_claim_requests moderation queue (never a fake
 * "approved" state). Document upload is honestly deferred — Cloudflare R2
 * isn't wired yet (API_PROVIDER_STATUS.md) — so this collects a free-text
 * note instead of pretending to accept a file.
 */
export function ClaimProfileCard({
  targetType,
  targetProfileId,
  companyName,
  isLoggedIn,
  currentPath,
  isOwnProfile,
}: {
  targetType: "broker_profile" | "builder_profile";
  targetProfileId: string;
  companyName: string;
  isLoggedIn: boolean;
  currentPath: string;
  isOwnProfile: boolean;
}) {
  const { openAuth } = useAuthModal();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(CLAIM_ROLES[0].value);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (isOwnProfile) return null;

  function close() {
    setOpen(false);
    setError(null);
    setDone(false);
    setNote("");
  }

  function submit() {
    setError(null);
    startTransition(async () => {
      const r = await submitProfileClaim({
        targetType,
        targetProfileId,
        claimedRole: role,
        proofNote: note,
      });
      if (!r.success) {
        setError(ERR[r.error] ?? r.error);
        return;
      }
      setDone(true);
    });
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-5 py-6 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-400">
        <Building2 className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="text-sm font-semibold text-zinc-900">Is this your business?</p>
      <p className="max-w-xs text-xs text-zinc-500">
        If you run this company and this profile isn&apos;t yours yet, you can
        request a claim review from our team.
      </p>
      <button
        type="button"
        onClick={() => {
          if (!isLoggedIn) {
            openAuth(currentPath);
            return;
          }
          setOpen(true);
        }}
        className="mt-1 rounded-lg border border-brand/30 bg-brand-soft px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/10"
      >
        Claim this profile
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label={`Claim ${companyName}`}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <div className="relative z-10 flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-xl sm:max-h-[90vh] sm:max-w-md sm:rounded-2xl">
              <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
                <span className="h-1 w-9 rounded-full bg-zinc-200" />
              </div>
              <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
                <h2 className="text-base font-semibold text-zinc-900">
                  Claim &quot;{companyName}&quot;
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {done ? (
                <div className="flex flex-col items-center gap-2.5 px-5 py-8 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft">
                    <Check className="h-6 w-6 text-brand" />
                  </span>
                  <div className="text-[15px] font-semibold text-zinc-900">
                    Claim request submitted
                  </div>
                  <p className="text-[13px] leading-[1.55] text-zinc-500">
                    Our verification team will review this within 2 business
                    days.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-2 rounded-[10px] border border-zinc-200 px-4 py-2.5 text-[13px] font-medium text-zinc-700 hover:border-zinc-300"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="claim-role"
                        className="mb-1 block text-xs font-medium text-zinc-600"
                      >
                        Your role at the company
                      </label>
                      <select
                        id="claim-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
                      >
                        {CLAIM_ROLES.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-[1.5] text-amber-800">
                      Document upload (RERA certificate / GST proof) isn&apos;t
                      available yet — describe your proof of ownership below
                      and our team will contact you to verify.
                    </div>

                    <div>
                      <label
                        htmlFor="claim-note"
                        className="mb-1 block text-xs font-medium text-zinc-600"
                      >
                        Proof of ownership — details
                      </label>
                      <textarea
                        id="claim-note"
                        rows={4}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        maxLength={1000}
                        placeholder="E.g. RERA registration number, GST number, or how our team can verify you run this company"
                        className="w-full resize-y rounded-lg border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-500" role="alert">
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={close}
                      className="flex-1 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={submit}
                      disabled={isPending}
                      className="flex-1 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60"
                    >
                      {isPending ? "Submitting…" : "Submit claim for review"}
                    </button>
                  </div>
                  <p className="mt-3 text-[11px] text-zinc-400">
                    Reviewed by our verification team within 2 business days.
                  </p>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
