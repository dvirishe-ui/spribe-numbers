import { Minus, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatSignedPct } from "@/lib/format";

interface StatTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
  /** Percent change vs. the named comparison period. Omit when there's nothing to compare against. */
  deltaPct?: number;
  /** Whether a rise in this metric is good news (colors the delta accordingly). Defaults to true. */
  upIsGood?: boolean;
  /** Tints the value itself, for a tile whose number is inherently good/bad rather than a delta. */
  tone?: "neutral" | "good" | "bad";
}

export function StatTile({ icon: Icon, label, value, hint, deltaPct, upIsGood = true, tone = "neutral" }: StatTileProps) {
  const hasDelta = deltaPct !== undefined && Number.isFinite(deltaPct);
  const isFlat = hasDelta && Math.abs(deltaPct) < 0.05;
  const isUp = hasDelta && deltaPct > 0;
  const good = hasDelta && !isFlat && (isUp === upIsGood);

  return (
    <div className="panel p-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-primary" />
          <span className="text-eyebrow">{label}</span>
        </div>
        {hasDelta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
              isFlat
                ? "text-muted-foreground"
                : good
                  ? "text-[var(--color-uplift-positive)]"
                  : "text-[var(--color-uplift-negative)]",
            )}
          >
            {isFlat ? <Minus className="size-3" /> : isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            {formatSignedPct(deltaPct)}
          </span>
        )}
      </div>
      <p
        className={cn(
          "mt-1.5 font-display text-2xl font-bold",
          tone === "good" && "text-[var(--color-uplift-positive)]",
          tone === "bad" && "text-[var(--color-uplift-negative)]",
        )}
      >
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
