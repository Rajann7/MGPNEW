"use client";

import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { Phone, ShieldCheck, X } from "lucide-react";
import {
  createInquiry,
  type InquiryFormInput,
  type MyInquiryStatus,
} from "@/lib/actions/leads";
import {
  revealListingContact,
  type ListingContactState,
  type RevealTargetType,
} from "@/lib/actions/contact";
import { CrmStageBadge } from "@/components/leads/CrmStageBadge";
import { INTEREST_TYPES } from "@/lib/leads/inquiry-config";
import type { LeadTargetType, LeadSource, CrmStage } from "@/types";

export interface DetailViewer {
  isLoggedIn: boolean;
  publicRole: "owner" | "broker" | "builder" | null;
  fullName: string | null;
  /** Partially masked profile mobile for display only — never the full number. */
  mobileMasked: string | null;
}

/** Real, public-safe info about who posted this listing. Name/verified are
 * omitted (never faked) when the underlying data isn't available. */
export interface PosterInfo {
  name: string | null;
  roleLabel: string; // "Owner" | "Broker" | "Builder"
  verified: boolean;
}

interface Props {
  viewer: DetailViewer;
  entityLabel: string; // e.g. "property", "project"
  currentPath: string;
  targetType: LeadTargetType;
  targetId: string;
  poster: PosterInfo;
  /** Masked-until-reveal contact state (Batch 4 §7/§44-46). The full number
   * is present only when this viewer already completed an explicit reveal;
   * otherwise only the masked display value reaches the client. */
  contact: ListingContactState;
  /** Target the explicit Reveal action is authorised against. */
  revealTargetType: RevealTargetType;
  /** The viewer's existing inquiry on this listing (server-fetched), if any. */
  existingInquiry?: MyInquiryStatus | null;
}

/** Ported enquiry flow from the previous project: "Send Enquiry" opens a form
 * modal (name, contact number choice, interest, message). After sending, the
 * inquiry status is shown here and a second enquiry on the same listing is
 * blocked. Only Owner accounts can enquire — brokers/builders are restricted
 * (also enforced server-side). No fake sent states, no phone leak: the full
 * number only arrives from the explicit server-authorised Reveal action. */
export function DetailCTABar({
  viewer,
  entityLabel,
  currentPath,
  targetType,
  targetId,
  poster,
  contact,
  revealTargetType,
  existingInquiry = null,
}: Props) {
  const router = useRouter();
  const { openAuth } = useAuthModal();
  const [formOpen, setFormOpen] = useState(false);
  const [sent, setSent] = useState<{
    leadId: string;
    crmStage: CrmStage;
  } | null>(null);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(
    null
  );
  const [revealedPhone, setRevealedPhone] = useState<string | null>(
    contact.revealedPhone
  );
  const [revealNote, setRevealNote] = useState<string | null>(null);
  const [revealPending, startReveal] = useTransition();

  const inquiry =
    existingInquiry ??
    (sent
      ? {
          leadId: sent.leadId,
          crmStage: sent.crmStage,
          status: "new",
          createdAt: "",
        }
      : null);
  const isRestrictedRole = viewer.isLoggedIn && viewer.publicRole !== "owner";
  const initial = (
    poster.name?.charAt(0) ?? poster.roleLabel.charAt(0)
  ).toUpperCase();

  function handleRevealClick(thenCall = false) {
    if (!viewer.isLoggedIn) {
      openAuth(currentPath);
      return;
    }
    if (revealedPhone || revealPending) return;
    if (contact.policy === "hidden") {
      setRevealNote(
        "This poster shares their number only through an enquiry. Use Enquire Now instead."
      );
      return;
    }
    if (contact.policy === "needs_enquiry_approval") {
      setRevealNote(
        "This poster shares their number only after approving your enquiry. Send an enquiry to request it."
      );
      return;
    }
    if (contact.policy === "needs_verified") {
      setRevealNote(
        "This poster shares their number with verified members only."
      );
      return;
    }
    startReveal(async () => {
      const result = await revealListingContact(revealTargetType, targetId);
      if (result.success) {
        setRevealedPhone(result.data.phone);
        setRevealNote(null);
        if (thenCall) window.location.href = `tel:${result.data.phone}`;
        return;
      }
      switch (result.error) {
        case "SELF_ACTION":
          setRevealNote("This is your own listing.");
          break;
        case "NEEDS_ENQUIRY_APPROVAL":
          setRevealNote(
            "This poster shares their number only after approving your enquiry. Send an enquiry to request it."
          );
          break;
        case "VERIFICATION_REQUIRED":
          setRevealNote(
            "This poster shares their number with verified members only."
          );
          break;
        case "CONTACT_HIDDEN":
        case "CONTACT_UNAVAILABLE":
          setRevealNote(
            "No direct number is available. Use Enquire Now instead."
          );
          break;
        default:
          setRevealNote("Could not reveal the number. Please try again.");
      }
    });
  }

  function openEnquireOrGate() {
    if (!viewer.isLoggedIn) {
      openAuth(currentPath);
      return;
    }
    if (!isRestrictedRole && !inquiry) setFormOpen(true);
  }

  const enquireButton = (extraClass: string) => (
    <button
      type="button"
      onClick={openEnquireOrGate}
      aria-label={`Send an enquiry about this ${entityLabel}`}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover ${extraClass}`}
    >
      Enquire Now
    </button>
  );

  const inquiryStatus = inquiry ? (
    <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5">
      <svg
        className="w-4 h-4 text-emerald-600 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
      <span className="text-sm font-medium text-emerald-800">Enquiry sent</span>
      <CrmStageBadge stage={inquiry.crmStage} />
      <Link
        href={`/dashboard/leads/${inquiry.leadId}`}
        className="text-xs font-medium text-brand hover:underline ml-auto"
      >
        View
      </Link>
    </div>
  ) : null;

  return (
    <>
      {/* ── Desktop sidebar contact card (lg+) ── */}
      <div className="hidden rounded-2xl border border-zinc-100 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] lg:block">
        <div className="flex items-center gap-3">
          <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
            {initial}
            {poster.verified && (
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
                <ShieldCheck className="h-2.5 w-2.5 text-white" />
              </span>
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-900">
              {poster.name ?? poster.roleLabel}
            </p>
            <span className="mt-0.5 inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600">
              {poster.roleLabel}
            </span>
          </div>
        </div>

        {revealedPhone ? (
          // Explicit reveal completed — the real number, never a placeholder.
          <a
            href={`tel:${revealedPhone}`}
            className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <Phone className="h-4 w-4" />
            {revealedPhone}
          </a>
        ) : (
          <>
            {contact.masked && (
              <p className="mt-3.5 text-center text-sm font-medium tracking-wide text-zinc-500">
                {contact.masked}
              </p>
            )}
            <button
              type="button"
              onClick={() => handleRevealClick()}
              disabled={revealPending}
              className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
            >
              {revealPending ? "Revealing…" : "Reveal number"}
            </button>
            {revealNote && (
              <p className="mt-1.5 text-[11px] text-zinc-400">{revealNote}</p>
            )}
          </>
        )}

        <div className="mt-3">
          {inquiryStatus ?? (isRestrictedRole ? null : enquireButton("w-full"))}
        </div>
        {isRestrictedRole && !inquiry && (
          <p className="mt-2 text-[11px] text-zinc-500">
            Enquiries can be sent from Owner accounts only.
          </p>
        )}
        {!viewer.isLoggedIn && (
          <p className="mt-2 text-[11px] text-zinc-400">
            Login required to send an enquiry or view contact details.
          </p>
        )}
      </div>

      {/* ── Mobile sticky bottom bar (<lg) — pinned to viewport bottom ──
          z-50: must sit above CompareTray (z-40, DetailShell-mounted) so a
          leftover "compare" selection never blocks the primary Call/Enquire
          actions on this screen (real bug: tray intercepted all clicks on
          this bar when any items were in the visitor's compare list). */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-100 bg-white/95 px-4 py-3 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] backdrop-blur lg:hidden">
        {inquiryStatus ?? (
          <div className="flex items-center gap-2.5">
            {revealedPhone ? (
              <a
                href={`tel:${revealedPhone}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            ) : (
              // Not yet revealed: Call triggers the reveal/auth flow first —
              // no tel: URI ever sits in the initial DOM (spec §60).
              <button
                type="button"
                onClick={() => handleRevealClick(true)}
                disabled={revealPending}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
              >
                <Phone className="h-4 w-4" />
                {revealPending ? "…" : "Call"}
              </button>
            )}
            {isRestrictedRole ? (
              <div className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-center">
                <p className="text-xs text-zinc-500">Owner accounts only</p>
              </div>
            ) : (
              enquireButton("flex-1")
            )}
          </div>
        )}
        {!revealedPhone && revealNote && (
          <p className="mt-1.5 text-center text-[11px] text-zinc-400">
            {revealNote}
          </p>
        )}
      </div>
      {/* Spacer so page content isn't hidden behind the fixed mobile bar. */}
      <div className="h-[68px] lg:hidden" aria-hidden="true" />

      {notice && (
        <p
          className={`mt-2 text-[11px] text-center lg:text-left ${notice.ok ? "text-emerald-600" : "text-red-500"}`}
        >
          {notice.text}
        </p>
      )}
      {!viewer.isLoggedIn && (
        <p className="mt-2 text-[11px] text-zinc-400 text-center lg:text-left lg:hidden">
          Login required to send an enquiry or view contact details.
        </p>
      )}

      {formOpen && (
        <EnquiryFormModal
          entityLabel={entityLabel}
          targetType={targetType}
          targetId={targetId}
          viewer={viewer}
          onClose={() => setFormOpen(false)}
          onSent={(leadId) => {
            setSent({ leadId, crmStage: "new" });
            setNotice({
              ok: true,
              text: "Enquiry sent. The owner will contact you.",
            });
            setFormOpen(false);
            router.refresh();
          }}
          onDuplicate={() => {
            setNotice({
              ok: false,
              text: `You have already sent an enquiry for this ${entityLabel}.`,
            });
            setFormOpen(false);
            router.refresh();
          }}
        />
      )}
    </>
  );
}

// ============================================================
// Enquiry form modal (ported from previous project LeadForm)
// ============================================================

function EnquiryFormModal({
  entityLabel,
  targetType,
  targetId,
  viewer,
  onClose,
  onSent,
  onDuplicate,
}: {
  entityLabel: string;
  targetType: LeadTargetType;
  targetId: string;
  viewer: DetailViewer;
  onClose: () => void;
  onSent: (leadId: string) => void;
  onDuplicate: () => void;
}) {
  const [name, setName] = useState(viewer.fullName ?? "");
  const [phoneSource, setPhoneSource] = useState<"profile" | "alternate">(
    viewer.mobileMasked ? "profile" : "alternate"
  );
  const [altPhone, setAltPhone] = useState("");
  const [interest, setInterest] = useState<string>(INTEREST_TYPES[0].value);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Lock background scroll while the modal is open — without this the page
  // behind the overlay stays scrollable too, which is what made the sheet
  // look cut off / cramped against the viewport edge.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const source: LeadSource = `${targetType}_detail_inquiry` as LeadSource;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return; // double-submit guard
    setErr(null);
    startTransition(async () => {
      const form: InquiryFormInput = {
        name,
        phoneSource,
        altPhone,
        interestType: interest,
      };
      const result = await createInquiry(
        targetType,
        targetId,
        source,
        message,
        form
      );
      if (result.success) {
        onSent(result.data.leadId);
        return;
      }
      switch (result.error) {
        case "DUPLICATE_INQUIRY":
          onDuplicate();
          break;
        case "ROLE_RESTRICTED":
          setErr("Only Owner accounts can send enquiries.");
          break;
        case "SETUP_REQUIRED":
          setErr("Enquiries aren't fully set up yet. Please try again later.");
          break;
        case "VALIDATION_ERROR":
          setErr(
            result.fieldErrors
              ? Object.values(result.fieldErrors).flat()[0]
              : "Please check the form and try again."
          );
          break;
        case "ENTITY_NOT_FOUND":
          setErr(`This ${entityLabel} is no longer available.`);
          break;
        default:
          setErr("Could not send your enquiry. Please try again.");
      }
    });
  }

  // Portaled to document.body: this modal must always cover the true
  // viewport (fixed inset-0), never a nested ancestor's box. Rendering it in
  // place inside the deep sidebar/grid tree let an ancestor's stacking
  // context override its coordinates, cropping the modal's own header row
  // under the sticky site header (real bug).
  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Send enquiry"
    >
      {/* Overlay click closes; clicks inside the form must not close. */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <form
        onSubmit={submit}
        className="relative z-10 flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-xl sm:max-h-[90vh] sm:max-w-md sm:rounded-2xl"
      >
        {/* mobile grab handle */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <span className="h-1 w-9 rounded-full bg-zinc-200" />
        </div>
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
          <h2 className="text-base font-semibold text-zinc-900">
            Send enquiry
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="enquiry-name"
                className="mb-1 block text-xs font-medium text-zinc-600"
              >
                Your name
              </label>
              <input
                id="enquiry-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <span className="mb-1 block text-xs font-medium text-zinc-600">
                Contact number
              </span>
              <div className="space-y-2">
                {viewer.mobileMasked && (
                  <label className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="phoneSource"
                      checked={phoneSource === "profile"}
                      onChange={() => setPhoneSource("profile")}
                    />
                    <span>
                      Use my number{" "}
                      <span className="text-zinc-400">
                        ({viewer.mobileMasked})
                      </span>
                    </span>
                  </label>
                )}
                <label className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="phoneSource"
                    checked={phoneSource === "alternate"}
                    onChange={() => setPhoneSource("alternate")}
                  />
                  <span>Use a different number</span>
                </label>
                {phoneSource === "alternate" && (
                  <input
                    value={altPhone}
                    onChange={(e) => setAltPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    aria-label="Alternate mobile number"
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
                  />
                )}
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                Your profile number is never changed by sending an enquiry.
              </p>
            </div>

            <div>
              <label
                htmlFor="enquiry-interest"
                className="mb-1 block text-xs font-medium text-zinc-600"
              >
                I want to
              </label>
              <select
                id="enquiry-interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-brand bg-white"
              >
                {INTEREST_TYPES.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="enquiry-message"
                className="mb-1 block text-xs font-medium text-zinc-600"
              >
                Message (optional)
              </label>
              <textarea
                id="enquiry-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
              />
            </div>
          </div>

          <p className="mt-3 text-[11px] text-zinc-400">
            By sending this enquiry you agree to share your name and the
            selected contact number with the{" "}
            {entityLabel === "project" ? "builder" : "listing owner"}, as per
            our Terms &amp; Privacy Policy.
          </p>

          {err && (
            <p className="mt-2 text-sm text-red-500" role="alert">
              {err}
            </p>
          )}
        </div>

        <div className="flex flex-shrink-0 gap-2 border-t border-zinc-100 bg-white px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="flex-1 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60"
          >
            {pending ? "Sending…" : "Send enquiry"}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}
