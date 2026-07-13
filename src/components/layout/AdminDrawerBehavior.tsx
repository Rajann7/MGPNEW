"use client";

import { useEffect } from "react";

/**
 * Client enhancer for the pure-CSS admin mobile drawer (AdminMobileDrawer).
 * The drawer itself stays a Server Component (checkbox `#admin-drawer` +
 * `peer-checked` CSS) so Lucide icons can be passed without a client boundary.
 * This tiny companion adds the overlay-foundation behaviors the CSS toggle
 * cannot: Escape-to-close, body scroll lock while open, and focus restoration
 * to the trigger on close. Renders nothing.
 */
export function AdminDrawerBehavior() {
  useEffect(() => {
    const cb = document.getElementById("admin-drawer") as HTMLInputElement | null;
    if (!cb) return;

    function trigger(): HTMLElement | null {
      return document.querySelector<HTMLElement>('label[for="admin-drawer"][aria-label="Open menu"]');
    }

    function syncScrollLock() {
      document.body.style.overflow = cb!.checked ? "hidden" : "";
    }

    function close() {
      if (!cb!.checked) return;
      cb!.checked = false;
      cb!.dispatchEvent(new Event("change", { bubbles: true }));
      trigger()?.focus({ preventScroll: true });
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    cb.addEventListener("change", syncScrollLock);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cb.removeEventListener("change", syncScrollLock);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
