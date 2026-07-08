"use client";

import { useEffect, useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Eye, EyeOff, Check, X, AlertTriangle } from "lucide-react";
import {
  getInviteByToken,
  acceptStaffInvite,
  type InvitePreview,
} from "@/lib/actions/staff-invite";

const ERROR_COPY: Record<string, string> = {
  INVITE_INVALID: "This invite link is invalid or has already been used.",
  INVITE_EXPIRED: "This invite has expired. Ask your admin to send a new one.",
  INVITE_ACCEPTED: "This invite has already been accepted.",
  INVITE_REVOKED: "This invite was revoked by an admin.",
  INVITE_ALREADY_STAFF: "A staff account already exists for this email.",
  INVITE_ACCOUNT_EXISTS:
    "An account already exists for this email. Contact your Super Admin.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
};

function StaffMark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#18181b] text-white">
        <ShieldCheck className="h-[15px] w-[15px]" />
      </span>
      <span className="text-[13px] font-semibold text-[#18181b]">
        MGP <span className="font-medium text-[#71717a]">Staff Portal</span>
      </span>
    </div>
  );
}

function InviteCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<InvitePreview | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!token) return; // no-token is handled in render below (no sync setState here)
    let active = true;
    getInviteByToken(token).then((r) => {
      if (!active) return;
      if (r.success) setInvite(r.data);
      else setLoadError(r.error);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [token]);

  function handleAccept(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    startTransition(async () => {
      const r = await acceptStaffInvite(token, fullName, password);
      if (!r.success) {
        if (r.fieldErrors) {
          const errs: Record<string, string> = {};
          Object.entries(r.fieldErrors).forEach(([k, v]) => {
            errs[k] = v[0] ?? "Invalid";
          });
          setErrors(errs);
        } else {
          setErrors({ form: ERROR_COPY[r.error] ?? r.error });
        }
        return;
      }
      router.push(r.data.redirectTo);
      router.refresh();
    });
  }

  const cardShell =
    "w-full max-w-[440px] rounded-2xl border border-[#e4e4e7] bg-white p-7 shadow-[0_4px_12px_rgba(0,0,0,0.08)]";

  // No token in the URL → invalid invite (handled here, not via setState-in-effect).
  const effectiveError = !token ? "INVITE_INVALID" : loadError;

  if (token && loading) {
    return (
      <div className={`${cardShell} flex flex-col items-center gap-3 py-12`}>
        <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#e4e4e7] border-t-[#18181b]" />
        <span className="text-[13px] text-[#71717a]">Checking your invite…</span>
      </div>
    );
  }

  if (effectiveError || !invite) {
    return (
      <div className={`${cardShell} flex flex-col items-center gap-3 text-center`}>
        <StaffMark />
        <span className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF2F2]">
          <AlertTriangle className="h-[22px] w-[22px]" color="#DC2626" />
        </span>
        <div className="text-base font-semibold text-[#18181b]">
          Invite unavailable
        </div>
        <p className="text-[13px] leading-[1.6] text-[#52525b]">
          {ERROR_COPY[effectiveError ?? "INVITE_INVALID"]}
        </p>
        <Link
          href="/admin/login"
          className="mt-1 rounded-[10px] border border-[#d4d4d8] px-4 py-2.5 text-[13px] font-medium text-[#3f3f46] hover:border-[#a1a1aa]"
        >
          Go to staff portal
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleAccept} noValidate className={`${cardShell} flex flex-col gap-4`}>
      <StaffMark />

      <div>
        <div className="text-[19px] font-semibold text-[#18181b]">
          You&rsquo;ve been invited
        </div>
        <div className="mt-1 text-[13px] leading-[1.55] text-[#52525b]">
          {invite.inviterName ? (
            <>
              <strong className="font-semibold text-[#18181b]">
                {invite.inviterName}
              </strong>
              {invite.inviterRole ? ` (${labelFor(invite.inviterRole)})` : ""} invited
              you to join as{" "}
            </>
          ) : (
            "You have been invited to join as "
          )}
          <strong className="font-semibold text-[#18181b]">
            {invite.roleLabel}
          </strong>
          .
        </div>
      </div>

      {/* Invited email (read-only) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#a1a1aa]">
          Invited email
        </label>
        <input
          value={invite.email}
          disabled
          className="w-full rounded-[10px] border border-[#e4e4e7] bg-[#fafafa] px-3 py-[11px] text-sm text-[#a1a1aa]"
        />
      </div>

      {/* Full name (required for the staff profile) */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="inv-name" className="text-[13px] font-medium text-[#3f3f46]">
          Your name
        </label>
        <input
          id="inv-name"
          type="text"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full name"
          maxLength={100}
          disabled={isPending}
          className="w-full rounded-[10px] border border-[#d4d4d8] px-3 py-[11px] text-sm text-[#18181b] outline-none placeholder-[#a1a1aa] focus:border-[1.5px] focus:border-[#18181b] disabled:opacity-60"
        />
        {errors.fullName && (
          <p className="text-xs text-[#DC2626]" role="alert">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Set password */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="inv-pw" className="text-[13px] font-medium text-[#3f3f46]">
          Set password
        </label>
        <div className="flex items-center rounded-[10px] border border-[#d4d4d8] pr-2.5 focus-within:border-[1.5px] focus-within:border-[#18181b]">
          <input
            id="inv-pw"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            disabled={isPending}
            className="min-w-0 flex-1 rounded-[10px] bg-transparent px-3 py-[11px] text-sm text-[#18181b] outline-none placeholder-[#a1a1aa] disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="text-[#a1a1aa] hover:text-[#3f3f46]"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <span className="text-xs text-[#71717a]">
          Min 12 characters, 1 number, 1 symbol.
        </span>
        {errors.password && (
          <p className="text-xs text-[#DC2626]" role="alert">
            {errors.password}
          </p>
        )}
      </div>

      {/* Permissions preview (read-only) */}
      <div className="flex flex-col gap-2 rounded-xl border border-[#f4f4f5] bg-[#fafafa] p-3.5">
        <div className="text-[11px] font-semibold tracking-[0.05em] text-[#71717a]">
          YOU&rsquo;LL HAVE ACCESS TO (read-only preview)
        </div>
        {invite.preview.map((p) => (
          <div
            key={p.label}
            className={[
              "flex items-center gap-2 text-[13px]",
              p.granted ? "text-[#18181b]" : "text-[#a1a1aa]",
            ].join(" ")}
          >
            {p.granted ? (
              <Check className="h-[14px] w-[14px] flex-shrink-0" color="#16A34A" />
            ) : (
              <X className="h-[14px] w-[14px] flex-shrink-0" color="#a1a1aa" />
            )}
            {p.label}
          </div>
        ))}
      </div>

      {errors.form && (
        <p
          className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-xs text-[#7F1D1D]"
          role="alert"
        >
          {errors.form}
        </p>
      )}

      <div className="flex gap-2">
        <Link
          href="/"
          className="flex flex-1 items-center justify-center rounded-[10px] border border-[#d4d4d8] py-3 text-[13px] font-medium text-[#3f3f46] hover:border-[#a1a1aa]"
        >
          Decline
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="flex-[2] rounded-[10px] bg-[#18181b] py-3 text-[13px] font-medium text-white transition-colors hover:bg-[#3f3f46] disabled:opacity-50"
        >
          {isPending ? "Joining…" : "Accept invite & join"}
        </button>
      </div>

      <div className="text-center text-[11px] text-[#a1a1aa]">
        Single use · this invite expires on{" "}
        {new Date(invite.expiresAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
        .
      </div>
    </form>
  );
}

// Local label helper to avoid importing the whole config map name twice.
function labelFor(role: string): string {
  return role
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function AdminInvitePage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#fafafa] px-4 py-10">
      <Suspense fallback={null}>
        <InviteCard />
      </Suspense>
    </main>
  );
}
