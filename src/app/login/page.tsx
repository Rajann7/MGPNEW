"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import type { AuthStep } from "@/types";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const [step, setStep] = useState<AuthStep>("mobile_entry");
  const [mobile, setMobile] = useState("");

  return (
    <>
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F6B5C]">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-xl font-semibold text-[#18181b]">My Gujarat Property</h1>
        <p className="mt-1 text-sm text-[#52525b]">
          Gujarat&apos;s trusted real estate marketplace
        </p>
      </div>

      <AuthModal
        isOpen={true}
        onClose={() => router.push("/")}
        step={step}
        mobile={mobile}
        redirectTo={redirectTo}
        onStepChange={setStep}
        onMobileChange={setMobile}
      />
    </>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Suspense fallback={null}>
        <LoginContent />
      </Suspense>
    </main>
  );
}
