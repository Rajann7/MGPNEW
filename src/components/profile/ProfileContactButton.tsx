"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";

/**
 * Contact CTA for public broker/builder profiles (design Batch 4 · Screens 4–5).
 * Contact is auth-gated and a phone number is NEVER in the initial public render.
 * - Guest → opens the auth modal (returns here after login).
 * - Logged-in + a real, server-resolved phone exists → real `tel:` call link
 *   (no fake/placeholder number, ever).
 * - Logged-in but no phone resolved yet → honest guidance: contact happens
 *   through a listing/project enquiry instead.
 */
export function ProfileContactButton({
  label,
  currentPath,
  isLoggedIn,
  phone = null,
}: {
  label: string;
  currentPath: string;
  isLoggedIn: boolean;
  /** Real, server-resolved phone number for this broker/builder, already
   * gated against the profile's own visibility rules. Null means no
   * direct-call reveal is available for this viewer — never a fake number. */
  phone?: string | null;
}) {
  const { openAuth } = useAuthModal();
  const [showNote, setShowNote] = useState(false);

  if (isLoggedIn && phone) {
    return (
      <a
        href={`tel:${phone}`}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover"
      >
        <Phone className="h-4 w-4" />
        {label}
      </a>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1.5">
      <button
        type="button"
        onClick={() => {
          if (!isLoggedIn) {
            openAuth(currentPath);
            return;
          }
          setShowNote(true);
          document
            .getElementById("profile-listings")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover"
      >
        {label}
      </button>
      {showNote && (
        <p className="text-xs text-zinc-500">
          Send an enquiry on any listing below — your details go straight to
          them. Numbers are never shown publicly.
        </p>
      )}
    </div>
  );
}
