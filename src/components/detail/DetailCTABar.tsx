"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import {
  createInquiry,
  type InquiryFormInput,
  type MyInquiryStatus,
} from "@/lib/actions/leads";
import { saveItem, unsaveItem } from "@/lib/actions/saved";
import { CrmStageBadge } from "@/components/leads/CrmStageBadge";
import { INTEREST_TYPES } from "@/lib/leads/inquiry-config";
import type {
  LeadTargetType,
  LeadSource,
  SavedItemType,
  CrmStage,
} from "@/types";

export interface DetailViewer {
  isLoggedIn: boolean;
  publicRole: "owner" | "broker" | "builder" | null;
  fullName: string | null;
  /** Partially masked profile mobile for display only — never the full number. */
  mobileMasked: string | null;
}

interface Props {
  viewer: DetailViewer;
  entityLabel: string; // e.g. "property", "project"
  currentPath: string;
  targetType: LeadTargetType;
  targetId: string;
  initiallySaved?: boolean;
  /** The viewer's existing inquiry on this listing (server-fetched), if any. */
  existingInquiry?: MyInquiryStatus | null;
}

/** Ported enquiry flow from the previous project: "Send Enquiry" opens a form
 * modal (name, contact number choice, interest, message). After sending, the
 * inquiry status is shown here and a second enquiry on the same listing is
 * blocked. Only Owner accounts can enquire — brokers/builders are restricted
 * (also enforced server-side). No fake sent states, no phone leak. */
export function DetailCTABar({
  viewer,
  entityLabel,
  currentPath,
  targetType,
  targetId,
  initiallySaved = false,
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
  const [saved, setSaved] = useState(initiallySaved);
  const [isPending, startTransition] = useTransition();

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

  function handleSaveClick() {
    // Guest → open the login popup in place (returns to this page after auth).
    if (!viewer.isLoggedIn) {
      openAuth(currentPath);
      return;
    }
    startTransition(async () => {
      const itemType = targetType as SavedItemType;
      const result = saved
        ? await unsaveItem(itemType, targetId)
        : await saveItem(itemType, targetId);
      if (result.success) setSaved(!saved);
    });
  }

  return (
    <div className="sticky bottom-0 z-20 -mx-4 sm:mx-0 mt-6 border-t border-zinc-100 bg-white/95 backdrop-blur px-4 py-3 sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:mt-8">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Primary enquiry zone */}
        {!viewer.isLoggedIn ? (
          <button
            type="button"
            onClick={() => openAuth(currentPath)}
            aria-label={`Send an enquiry about this ${entityLabel}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-brand text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:bg-brand-hover transition-colors"
          >
            Send Enquiry
          </button>
        ) : isRestrictedRole ? (
          <div className="flex-1 sm:flex-none rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5">
            <p className="text-xs text-zinc-500">
              Enquiries can be sent from{" "}
              <span className="font-medium text-zinc-700">Owner</span> accounts
              only. Broker and builder accounts cannot send enquiries.
            </p>
          </div>
        ) : inquiry ? (
          <div className="flex-1 sm:flex-none flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5">
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
            <span className="text-sm font-medium text-emerald-800">
              Enquiry sent
            </span>
            <CrmStageBadge stage={inquiry.crmStage} />
            <Link
              href={`/dashboard/leads/${inquiry.leadId}`}
              className="text-xs font-medium text-brand hover:underline ml-auto"
            >
              View
            </Link>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            aria-label={`Send an enquiry about this ${entityLabel}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-brand text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:bg-brand-hover transition-colors"
          >
            Send Enquiry
          </button>
        )}

        {/* Save / shortlist */}
        {viewer.isLoggedIn ? (
          <button
            type="button"
            onClick={handleSaveClick}
            disabled={isPending}
            aria-label={saved ? "Unsave" : "Save"}
            className={`inline-flex items-center justify-center w-11 h-11 rounded-lg border transition-colors ${
              saved
                ? "border-brand bg-brand/10 text-brand"
                : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            <BookmarkIcon filled={saved} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => openAuth(currentPath)}
            aria-label="Save"
            className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <BookmarkIcon filled={false} />
          </button>
        )}
      </div>

      {notice && (
        <p
          className={`mt-2 text-[11px] text-center sm:text-left ${notice.ok ? "text-emerald-600" : "text-red-500"}`}
        >
          {notice.text}
        </p>
      )}
      {!viewer.isLoggedIn && (
        <p className="mt-2 text-[11px] text-zinc-400 text-center sm:text-left">
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
    </div>
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

  return (
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
        className="relative z-10 w-full max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-md sm:rounded-2xl"
      >
        <h2 className="text-base font-semibold text-zinc-900">Send enquiry</h2>

        <div className="mt-4 space-y-3">
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
          By sending this enquiry you agree to share your name and the selected
          contact number with the{" "}
          {entityLabel === "project" ? "builder" : "listing owner"}, as per our
          Terms &amp; Privacy Policy.
        </p>

        {err && (
          <p className="mt-2 text-sm text-red-500" role="alert">
            {err}
          </p>
        )}

        <div className="mt-4 flex gap-2">
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
    </div>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className="w-5 h-5"
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
}
