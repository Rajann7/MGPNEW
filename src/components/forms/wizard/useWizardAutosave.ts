"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { WizardSaveStatus } from "./WizardFooter";

/**
 * Debounced autosave for the Batch 5 posting wizards (§34-37).
 *
 * - Fires `save` after a pause in meaningful changes (default 2.5s).
 * - Never overlaps saves: a save in flight defers the next one.
 * - Honest status: "saving" → "saved"/"error"; never claims saved before
 *   persistence succeeds. Failed autosaves keep local values and retry on
 *   the next change or manual Save Draft.
 */
export function useWizardAutosave({
  enabled,
  fingerprint,
  save,
  delayMs = 2500,
}: {
  /** Autosave only when the form is in a savable state (e.g. draft mode). */
  enabled: boolean;
  /** A serialized representation of the data to watch for changes. */
  fingerprint: string;
  /** Persist current data; resolves true on success. */
  save: () => Promise<boolean>;
  delayMs?: number;
}) {
  const [status, setStatus] = useState<WizardSaveStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inFlightRef = useRef(false);
  const lastSavedRef = useRef<string | null>(null);
  const saveRef = useRef(save);
  useEffect(() => {
    saveRef.current = save;
  }, [save]);

  const runSave = useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setStatus("saving");
    try {
      const ok = await saveRef.current();
      setStatus(ok ? "saved" : "error");
    } catch {
      setStatus("error");
    } finally {
      inFlightRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (lastSavedRef.current === null) {
      // First render: treat current state as baseline, don't save untouched data
      lastSavedRef.current = fingerprint;
      return;
    }
    if (fingerprint === lastSavedRef.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      lastSavedRef.current = fingerprint;
      await runSave();
    }, delayMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [fingerprint, enabled, delayMs, runSave]);

  /** Manual Save Draft — immediate, shares the same status channel. */
  const saveNow = useCallback(async () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    lastSavedRef.current = fingerprint;
    await runSave();
  }, [fingerprint, runSave]);

  return { status, saveNow, setStatus };
}
