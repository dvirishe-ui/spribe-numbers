import { useMemo, useRef, useState } from "react";
import { niceMax } from "@/lib/chartScale";
import { ChartTooltip } from "@/components/results/ChartTooltip";
import { formatSignedPct } from "@/lib/format";

export interface DivergingDatum {
  category: string;
  value: number;
}

interface DivergingBarChartProps {
  data: DivergingDatum[];
  ariaLabel: string;
  positiveLabel?: string;
  negativeLabel?: string;
  barThickness?: number;
}

export function DivergingBarChart({
  data,
  ariaLabel,
  positiveLabel = "Grew during the promo",
  negativeLabel = "Declined during the promo",
  barThickness = 14,
}: DivergingBarChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ category: string; value: number; x: number; y: number } | null>(null);

  // Scale off the second-largest magnitude, not the single largest: a promo can 5x a tiny-base
  // operator's GGR, and letting one such outlier set the domain flattens every other bar to a
  // sliver. The outlier itself still renders — clipped to the edge with its real value labeled.
  const maxAbs = useMemo(() => {
    const sorted = data.map((d) => Math.abs(d.value)).sort((a, b) => b - a);
    const domainBasis = sorted.length > 1 ? sorted[1] : (sorted[0] ?? 1);
    return niceMax(Math.max(1, domainBasis));
  }, [data]);
  const ticks = [-maxAbs, -maxAbs / 2, 0, maxAbs / 2, maxAbs];

  return (
    <div ref={rootRef} role="img" aria-label={ariaLabel} className="relative">
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full" style={{ backgroundColor: "var(--color-uplift-positive)" }} />
          {positiveLabel}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full" style={{ backgroundColor: "var(--color-uplift-negative)" }} />
          {negativeLabel}
        </div>
      </div>

      <div className="grid grid-cols-[8.5rem_1fr] gap-x-3">
        <div />
        <div className="relative h-4 text-[10px] text-muted-foreground">
          {ticks.map((t, i) => (
            <span
              key={t}
              className="absolute top-0"
              style={{
                left: `${(i / (ticks.length - 1)) * 100}%`,
                transform: i === 0 ? "translateX(0)" : i === ticks.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
              }}
            >
              {formatSignedPct(t, 0)}
            </span>
          ))}
        </div>

        {data.map((row) => {
          const rawWidthPct = (Math.abs(row.value) / maxAbs) * 50;
          const clipped = rawWidthPct > 50;
          const widthPct = Math.min(50, rawWidthPct);
          const positive = row.value >= 0;
          return (
            <div key={row.category} className="contents">
              <div className="flex items-center truncate py-0.5 text-xs text-foreground" title={row.category}>
                {row.category}
              </div>
              <div
                className="relative flex items-center rounded-sm"
                style={{
                  minHeight: barThickness + 8,
                  backgroundImage:
                    "linear-gradient(to right, transparent calc(50% - 1px), var(--color-border) calc(50% - 1px), var(--color-border) 50%, transparent 50%)",
                }}
                onMouseMove={(e) => {
                  const rootRect = rootRef.current?.getBoundingClientRect();
                  const cellRect = e.currentTarget.getBoundingClientRect();
                  if (!rootRect) return;
                  setHover({
                    category: row.category,
                    value: row.value,
                    x: cellRect.left - rootRect.left + cellRect.width / 2,
                    y: cellRect.top - rootRect.top,
                  });
                }}
                onMouseLeave={() => setHover(null)}
              >
                <div
                  className={`absolute flex items-center rounded-[4px] ${
                    positive ? "justify-end pr-1" : "justify-start pl-1"
                  }`}
                  style={{
                    height: barThickness,
                    width: `${widthPct}%`,
                    left: positive ? "50%" : undefined,
                    right: positive ? undefined : "50%",
                    backgroundColor: positive ? "var(--color-uplift-positive)" : "var(--color-uplift-negative)",
                    filter: hover?.category === row.category ? "brightness(1.15)" : undefined,
                  }}
                >
                  {clipped && (
                    <span className="whitespace-nowrap text-[10px] font-semibold text-white">
                      {formatSignedPct(row.value, 0)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hover && (
        <ChartTooltip
          title={hover.category}
          x={hover.x}
          y={hover.y}
          rows={[
            {
              label: hover.value >= 0 ? positiveLabel : negativeLabel,
              value: formatSignedPct(hover.value),
              color: hover.value >= 0 ? "var(--color-uplift-positive)" : "var(--color-uplift-negative)",
            },
          ]}
        />
      )}
    </div>
  );
}
