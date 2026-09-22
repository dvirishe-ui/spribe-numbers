import {
  Boxes,
  Crown,
  Gift,
  ListChecks,
  Map as MapIcon,
  Rocket,
  Sparkles,
  Trophy,
} from "lucide-react";
import { statusColorVar, typeColorVar, type PromoStatus, type PromoType } from "@/lib/promos";

export const TYPE_ICON: Record<PromoType, typeof Trophy> = {
  "Network Tournament": Trophy,
  "Cross-Game Challenge": Boxes,
  Missions: ListChecks,
  Leaderboard: Crown,
  "Collection Campaign": Gift,
  "Regional Promotion": MapIcon,
  "Seasonal Promotion": Sparkles,
  "New Game Launch": Rocket,
};

export function TypeBadge({ type, className = "" }: { type: PromoType; className?: string }) {
  const Icon = TYPE_ICON[type];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${className}`}
      style={{
        color: typeColorVar[type],
        borderColor: `color-mix(in oklch, ${typeColorVar[type]} 45%, transparent)`,
        backgroundColor: `color-mix(in oklch, ${typeColorVar[type]} 14%, transparent)`,
      }}
    >
      <Icon className="size-3" />
      {type}
    </span>
  );
}

export function StatusBadge({ status, className = "" }: { status: PromoStatus; className?: string }) {
  const color = statusColorVar[status];
  const pulse = status === "Live";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${className}`}
      style={{
        color,
        borderColor: `color-mix(in oklch, ${color} 45%, transparent)`,
        backgroundColor: `color-mix(in oklch, ${color} 14%, transparent)`,
      }}
    >
      <span
        className={`size-1.5 rounded-full ${pulse ? "animate-pulse" : ""}`}
        style={{ backgroundColor: color }}
      />
      {status}
    </span>
  );
}
