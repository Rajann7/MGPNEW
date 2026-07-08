import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import type { VerificationStatus } from "@/types";

const STATUS_COPY: Record<
  VerificationStatus,
  { label: string; tone: "info" | "success" | "warning" | "danger" }
> = {
  not_started: { label: "Not Started", tone: "info" },
  pending: { label: "Pending Review", tone: "warning" },
  under_review: { label: "Under Review", tone: "warning" },
  need_changes: { label: "Needs Changes", tone: "warning" },
  verified: { label: "Verified", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
  expired: { label: "Expired", tone: "warning" },
  revoked: { label: "Revoked", tone: "danger" },
};

/**
 * Shows the account's REAL verification_status from the database only.
 * No fake badge is ever rendered — "Verified" only appears when the DB
 * value is literally "verified". Request-verification workflow is not
 * implemented yet (admin approval flow is a later phase), so the CTA is
 * a disabled/coming-soon note, not a working submit button.
 */
export function VerificationStatusPanel({
  status,
  roleNote,
}: {
  status: VerificationStatus;
  roleNote?: string;
}) {
  const copy = STATUS_COPY[status] ?? STATUS_COPY.not_started;

  return (
    <Card className="py-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-surface-subtle flex items-center justify-center mx-auto mb-4">
        <ShieldCheck
          className="w-7 h-7 text-ink-muted"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-1">
        Current Status
      </p>
      <h2 className="text-lg font-semibold text-ink mb-4">{copy.label}</h2>

      <Alert tone={copy.tone} className="max-w-md mx-auto text-left">
        {status === "verified"
          ? "This account is verified by My Gujarat Property's trust process. This is a platform trust signal, not a legal certification of ownership, RERA registration, or document authenticity."
          : "Verification submission is not open yet — the request-and-review workflow will be enabled in a later phase. Verification, once available, is a platform trust process, not a legal guarantee."}
      </Alert>

      {roleNote && (
        <p className="text-xs text-ink-muted mt-4 max-w-md mx-auto">
          {roleNote}
        </p>
      )}
    </Card>
  );
}
