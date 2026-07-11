"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

export interface CompareItem {
  id: string;
  kind: "property" | "project";
  slug: string;
  title: string;
  price: string;
  location: string;
  facts: string[];
}

const MAX = 4;
const KEY = "mgp:compare";

interface CompareContextValue {
  items: CompareItem[];
  has: (id: string) => boolean;
  toggle: (item: CompareItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  atLimit: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}

/**
 * Compare tray state — persisted to localStorage so the /compare page and the
 * sticky tray share the same selection across navigations. Holds only public-safe
 * summary fields (no contact) and caps at 4 items (design compare tray).
 */
export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client-only; not available during SSR
  // render, so this must run in an effect).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage full / disabled — non-fatal */
    }
  }, [items, hydrated]);

  const has = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  const toggle = useCallback((item: CompareItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id))
        return prev.filter((i) => i.id !== item.id);
      if (prev.length >= MAX) return prev; // silently ignore beyond the cap
      return [...prev, item];
    });
  }, []);

  const remove = useCallback(
    (id: string) => setItems((prev) => prev.filter((i) => i.id !== id)),
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, has, toggle, remove, clear, atLimit: items.length >= MAX }),
    [items, has, toggle, remove, clear]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}
