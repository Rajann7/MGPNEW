"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CityOption {
  slug: string;
  name: string;
}

// Static Gujarat city list — will be replaced with DB-backed list when available
export const GUJARAT_CITIES: CityOption[] = [
  { slug: "ahmedabad", name: "Ahmedabad" },
  { slug: "surat", name: "Surat" },
  { slug: "vadodara", name: "Vadodara" },
  { slug: "rajkot", name: "Rajkot" },
  { slug: "gandhinagar", name: "Gandhinagar" },
  { slug: "bhavnagar", name: "Bhavnagar" },
  { slug: "jamnagar", name: "Jamnagar" },
  { slug: "junagadh", name: "Junagadh" },
  { slug: "anand", name: "Anand" },
  { slug: "mehsana", name: "Mehsana" },
  { slug: "morbi", name: "Morbi" },
  { slug: "surendranagar", name: "Surendranagar" },
  { slug: "bharuch", name: "Bharuch" },
  { slug: "navsari", name: "Navsari" },
  { slug: "valsad", name: "Valsad" },
  { slug: "porbandar", name: "Porbandar" },
  { slug: "dwarka", name: "Dwarka" },
  { slug: "kutch", name: "Kutch / Bhuj" },
  { slug: "amreli", name: "Amreli" },
  { slug: "botad", name: "Botad" },
];

interface CityContextValue {
  city: CityOption | null;
  cities: CityOption[];
  setCity: (city: CityOption | null) => void;
}

const SLUG_KEY = "mgp.city";
const NAME_KEY = "mgp.cityName";

const CityContext = createContext<CityContextValue | null>(null);

export function CityProvider({ children }: { children: React.ReactNode }) {
  const cities = GUJARAT_CITIES;
  const [city, setCityState] = useState<CityOption | null>(null);

  useEffect(() => {
    try {
      const slug = window.localStorage.getItem(SLUG_KEY);
      if (!slug) return;
      const match = cities.find((c) => c.slug === slug);
      if (match) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCityState(match);
      } else {
        // Stale/legacy value — clear it
        window.localStorage.removeItem(SLUG_KEY);
        window.localStorage.removeItem(NAME_KEY);
      }
    } catch {
      /* localStorage unavailable */
    }
  }, [cities]);

  const setCity = useCallback((next: CityOption | null) => {
    setCityState(next);
    try {
      if (next) {
        window.localStorage.setItem(SLUG_KEY, next.slug);
        window.localStorage.setItem(NAME_KEY, next.name);
      } else {
        window.localStorage.removeItem(SLUG_KEY);
        window.localStorage.removeItem(NAME_KEY);
      }
    } catch {
      /* localStorage unavailable — selection still works for this session */
    }
  }, []);

  const value = useMemo<CityContextValue>(
    () => ({ city, cities, setCity }),
    [city, cities, setCity]
  );

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

export function useCity(): CityContextValue {
  const ctx = useContext(CityContext);
  if (!ctx) return { city: null, cities: GUJARAT_CITIES, setCity: () => {} };
  return ctx;
}
