import { Metadata } from "next";
import { UnauthorizedState } from "@/components/auth/UnauthorizedState";
import { SuspendedState } from "@/components/auth/SuspendedState";

export const metadata: Metadata = {
  title: "Access Denied",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ reason?: string }>;
}

export default async function UnauthorizedPage({ searchParams }: Props) {
  const params = await searchParams;
  const reason = params.reason;

  // Suspended/banned users get the Batch 2 screen-12 full-stop, not the generic card.
  if (reason === "account_restricted") {
    return <SuspendedState />;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-sm">
        <UnauthorizedState
          reason={reason}
          showHomeLink={true}
          showLoginLink={reason === "login_required"}
        />
      </div>
    </main>
  );
}
