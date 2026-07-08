import { Card } from "@/components/ui/Card";

export function AccountStatusCard({
  role,
  accountStatus,
  verificationStatus,
}: {
  role: string;
  accountStatus: string;
  verificationStatus: string;
}) {
  return (
    <Card muted>
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
        Account
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <span className="text-zinc-600">
          Role: <span className="font-medium text-zinc-900">{role}</span>
        </span>
        <span className="text-zinc-600">
          Status:{" "}
          <span className="font-medium text-emerald-600 capitalize">
            {accountStatus}
          </span>
        </span>
        <span className="text-zinc-600">
          Verification:{" "}
          <span className="font-medium text-zinc-900 capitalize">
            {verificationStatus.replace(/_/g, " ")}
          </span>
        </span>
      </div>
    </Card>
  );
}
