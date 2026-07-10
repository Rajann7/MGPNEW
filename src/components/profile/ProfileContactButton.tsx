"use client";

import { useState, useTransition } from "react";
import { Phone } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import {
  revealListingContact,
  type ListingContactState,
  type RevealTargetType,
} from "@/lib/actions/contact";

/**
 * Contact CTA for public broker/builder profiles (design Batch 4 · Screens 4–5).
 * Contact is auth-gated and a full phone number is NEVER in the initial
 * render — it only arrives from the explicit server-authorised Reveal action
 * (spec §7-8, §124, §132, §139).
 * - Guest → opens the auth modal (returns here after login).
 * - Logged-in → explicit reveal → real `tel:` call link (no fake number).
 * - Reveal not permitted → honest guidance: contact via listing enquiry.
 */
export function ProfileContactButton({
  label,
  currentPath,
  isLoggedIn,
  targetType,
  targetId,
  contact,
}: {
  label: string;
  currentPath: string;
  isLoggedIn: boolean;
  targetType: RevealTargetType;
  targetId: string;
  /** Masked-until-reveal contact state resolved server-side. */
  contact: ListingContactState;
}) {
  const { openAuth } = useAuthModal();
  const [revealedPhone, setRevealedPhone] = useState<string | null>(
    contact.revealedPhone
  );
  const [note, setNote] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (revealedPhone) {
    return (
      <a
        href={`tel:${revealedPhone}`}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover"
      >
        <Phone className="h-4 w-4" />
        {revealedPhone}
      </a>
    );
  }

  function handleClick() {
    if (!isLoggedIn) {
      openAuth(currentPath);
      return;
    }
    if (pending) return;
    if (contact.policy === "hidden" || !contact.masked) {
      setNote(
        "No direct number is shared. Send an enquiry on any listing below — your details go straight to them."
      );
      document
        .getElementById("profile-listings")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    startTransition(async () => {
      const result = await revealListingContact(targetType, targetId);
      if (result.success) {
        setRevealedPhone(result.data.phone);
        setNote(null);
        return;
      }
      switch (result.error) {
        case "SELF_ACTION":
          setNote("This is your own profile.");
          break;
        case "VERIFICATION_REQUIRED":
          setNote("This number is shared with verified members only.");
          break;
        default:
          setNote(
            "No direct number is available right now. Send an enquiry on a listing instead — numbers are never shown publicly."
          );
      }
    });
  }

  return (
    <div className="flex flex-col items-start gap-1.5">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover disabled:opacity-60"
      >
        <Phone className="h-4 w-4" />
        {pending ? "Revealing…" : label}
      </button>
      {note && <p className="text-xs text-zinc-500">{note}</p>}
    </div>
  );
}
