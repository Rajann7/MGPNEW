"use client";

import { useState } from "react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";

/**
 * Contact CTA for public broker/builder profiles (design Batch 4 · Screens 4–5).
 * Contact is auth-gated and a phone number is NEVER in the initial public render.
 * - Guest → opens the auth modal (returns here after login).
 * - Logged-in → honest guidance: contact happens through a listing/project enquiry
 *   (no private number is exposed on the public profile). Full contact-reveal is
 *   the Batch 9 flow; this never fabricates a number or a fake "sent" state.
 */
export function ProfileContactButton({
  label,
  currentPath,
  isLoggedIn,
}: {
  label: string;
  currentPath: string;
  isLoggedIn: boolean;
}) {
  const { openAuth } = useAuthModal();
  const [showNote, setShowNote] = useState(false);

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
