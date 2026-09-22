import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { type ParticipationStatus, promos } from "@/lib/promos";

const STORAGE_KEY = "spribe-promo-participation";

function loadInitial(): Record<string, ParticipationStatus> {
  const base: Record<string, ParticipationStatus> = {};
  for (const p of promos) base[p.id] = p.defaultParticipation;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...base, ...JSON.parse(raw) };
  } catch {
    // localStorage unavailable — fall back to defaults
  }
  return base;
}

interface ParticipationContextValue {
  statusFor: (promoId: string) => ParticipationStatus;
  requestParticipation: (promoId: string) => void;
}

const ParticipationContext = createContext<ParticipationContextValue | null>(null);

export function ParticipationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Record<string, ParticipationStatus>>(loadInitial);

  const value = useMemo<ParticipationContextValue>(
    () => ({
      statusFor: (promoId) => state[promoId] ?? "Not Requested",
      requestParticipation: (promoId) => {
        setState((prev) => {
          const next = { ...prev, [promoId]: "Request Sent" as ParticipationStatus };
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {
            // best-effort persistence only
          }
          return next;
        });
      },
    }),
    [state],
  );

  return <ParticipationContext.Provider value={value}>{children}</ParticipationContext.Provider>;
}

export function useParticipation() {
  const ctx = useContext(ParticipationContext);
  if (!ctx) throw new Error("useParticipation must be used within ParticipationProvider");
  return ctx;
}
