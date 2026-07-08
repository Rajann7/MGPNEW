"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import type { AuthStep } from "@/types";

interface AuthModalContextValue {
  /**
   * Open the login/register popup in place.
   * @param next Internal path to return to after auth. Omit for the header
   *   Login/Register intent (defaults to the role dashboard server-side).
   *   Pass the current page path for inquiry/save/contact actions so the user
   *   stays on the same page after logging in (CLAUDE.md §13).
   */
  openAuth: (next?: string) => void;
  closeAuth: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function useAuthModal(): AuthModalContextValue {
  const ctx = useContext(AuthModalContext);
  if (!ctx)
    throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}

/**
 * App-wide login/register popup. Any public component can call
 * `useAuthModal().openAuth(next)` to show the auth modal in place — no full-page
 * redirect to /login. Mirrors the previous project's AuthModalProvider so guest
 * inquiry/save/contact actions open a popup and return to the same page.
 */
export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<AuthStep>("mobile_entry");
  const [mobile, setMobile] = useState("");
  const [next, setNext] = useState<string | undefined>(undefined);

  const openAuth = useCallback((n?: string) => {
    setStep("mobile_entry");
    setMobile("");
    setNext(n);
    setOpen(true);
  }, []);

  const closeAuth = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openAuth, closeAuth }), [openAuth, closeAuth]);

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal
        isOpen={open}
        onClose={closeAuth}
        step={step}
        mobile={mobile}
        redirectTo={next}
        onStepChange={setStep}
        onMobileChange={setMobile}
      />
    </AuthModalContext.Provider>
  );
}
