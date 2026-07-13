"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Shared overlay behavior (Batch 1 overlay patterns): Escape close, body
 * scroll lock, focus trap inside the overlay, initial focus, and focus
 * restoration to the trigger on close. Attach the returned ref to the
 * overlay's content container.
 */
export function useOverlay({
  open,
  onClose,
  closeOnEscape = true,
}: {
  open: boolean;
  onClose?: () => void;
  /** Set false while irreversible processing runs. */
  closeOnEscape?: boolean;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Initial focus + focus restoration
  useEffect(() => {
    if (!open) return;
    restoreRef.current = (document.activeElement as HTMLElement) ?? null;
    const el = contentRef.current;
    if (el) {
      const first = el.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? el).focus({ preventScroll: true });
    }
    return () => {
      restoreRef.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  // Escape + focus trap
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && closeOnEscape && onClose) {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const el = contentRef.current;
        if (!el) return;
        const focusables = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (n) => n.offsetParent !== null || n === document.activeElement
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !el.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last || !el.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, onClose, closeOnEscape]);

  return contentRef;
}
