import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { getCurrentProfile } from "@/lib/auth/session";
import { getTeamInviteByToken } from "@/lib/actions/team";
import { TEAM_PERMISSIONS } from "@/lib/team/permissions";
import { TeamInviteAccept } from "@/components/dashboard/TeamInviteAccept";

export const metadata: Metadata = {
  title: "Team Invite",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/** B8-S13 — Builder team invite acceptance (pre-auth safe preview + accept). */
export default async function TeamInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const profile = await getCurrentProfile();

  const res = token
    ? await getTeamInviteByToken(token)
    : ({ success: false, error: "ENTITY_NOT_FOUND" } as const);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-2xl border border-border bg-surface p-6">
        {!res.success ? (
          <div className="text-center">
            <h1 className="text-lg font-bold text-ink">Invite not found</h1>
            <p className="mt-1 text-sm text-muted">
              This invite link is invalid or has been revoked.
            </p>
            <Link href="/" className="mt-4 inline-block text-sm font-medium text-brand hover:underline">
              Go home
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand" aria-hidden="true" />
              <h1 className="text-lg font-bold text-ink">Team invitation</h1>
            </div>
            <p className="text-sm text-ink">
              <span className="font-semibold">{res.data.builderName}</span> invited
              you to join their team{res.data.title ? ` as ${res.data.title}` : ""}.
            </p>

            <div className="mt-4 rounded-xl border border-border bg-bg p-3">
              <p className="mb-1.5 text-xs font-medium text-ink">You&apos;ll be able to:</p>
              <ul className="space-y-1">
                {TEAM_PERMISSIONS.filter((p) => res.data.permissions[p.key]).map((p) => (
                  <li key={p.key} className="text-xs text-muted">• {p.label}</li>
                ))}
                {TEAM_PERMISSIONS.every((p) => !res.data.permissions[p.key]) && (
                  <li className="text-xs text-muted">• Basic access (no extra permissions yet)</li>
                )}
              </ul>
            </div>

            {res.data.status === "removed" ? (
              <p className="mt-4 text-sm text-red-600">This invite has been revoked.</p>
            ) : !profile ? (
              <div className="mt-4">
                <p className="text-sm text-muted">Log in or register to accept this invite.</p>
                <Link
                  href={`/login?next=${encodeURIComponent(`/team/invite?token=${token}`)}`}
                  className="mt-3 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
                >
                  Log in to accept
                </Link>
              </div>
            ) : (
              <TeamInviteAccept token={token!} alreadyMember={res.data.alreadyMember} />
            )}
          </>
        )}
      </div>
    </main>
  );
}
