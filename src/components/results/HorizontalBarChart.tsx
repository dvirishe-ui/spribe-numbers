import { useMemo, useRef, useState } from "react";
import { niceMax, ticksFor } from "@/lib/chartScale";
import { ChartTooltip } from "@/components/results/ChartTooltip";

export interface BarSeries {
  key: string;
  label: string;
  colorVar: string;
}

export interface BarCategoryDatum {
  category: string;
  values: Record<string, number>;
}

interface HorizontalBarChartProps {
  data: BarCategoryDatum[];
  series: BarSeries[];
  formatValue: (value: number) => string;
  ariaLabel: string;
  /** px, per individual bar; total row thickness is barThickness * series.length + gaps. */
  barThickness?: number;
  tickCount?: number;
}

const GAP = 2;

export function HorizontalBarChart({
  data,
  series,
  formatValue,
  ariaLabel,
  barThickness = 9,
  tickCount = 4,
}: HorizontalBarChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ category: string; x: number; y: number } | null>(null);

  const maxValue = useMemo(() => {
    const raw = Math.max(0, ...data.flatMap((d) => series.map((s) => d.values[s.key] ?? 0)));
    return niceMax(raw || 1);
  }, [data, series]);

  const ticks = useMemo(() => ticksFor(maxValue, tickCount), [maxValue, tickCount]);
  const rowThickness = barThickness * series.length + GAP * (series.length - 1);
  const gridBackground = {
    backgroundImage: "linear-gradient(to right, var(--color-border) 1px, transparent 1px)",
    backgroundSize: `${100 / tickCount}% 100%`,
    backgroundRepeat: "repeat-x",
  } as const;

  const hoveredRow = hover ? data.find((d) => d.category === hover.category) : undefined;

  return (
    <div ref={rootRef} role="img" aria-label={ariaLabel} className="relative">
      {series.length > 1 && (
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {series.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full" style={{ backgroundColor: `var(${s.colorVar})` }} />
              {s.label}
            </div>
          ))}
        </div>
      )}

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
              {formatValue(t)}
            </span>
          ))}
        </div>

        {data.map((row) => (
          <div key={row.category} className="contents">
            <div className="flex items-center truncate py-0.5 text-xs text-foreground" title={row.category}>
              {row.category}
            </div>
            <div
              className="relative flex flex-col justify-center gap-0.5 rounded-sm py-1"
              style={{ minHeight: rowThickness + 8, ...gridBackground }}
              onMouseMove={(e) => {
                const rootRect = rootRef.current?.getBoundingClientRect();
                const barRect = e.currentTarget.getBoundingClientRect();
                if (!rootRect) return;
                setHover({
                  category: row.category,
                  x: barRect.left - rootRect.left + barRect.width / 2,
                  y: barRect.top - rootRect.top,
                });
              }}
              onMouseLeave={() => setHover(null)}
            >
              {series.map((s) => {
                const value = row.values[s.key] ?? 0;
                const widthPct = Math.min(100, (value / maxValue) * 100);
                return (
                  <div
                    key={s.key}
                    className="h-[var(--bar-h)] rounded-r-[4px] transition-[filter]"
                    style={{
                      // @ts-expect-error -- CSS custom property, not a known style key
                      "--bar-h": `${barThickness}px`,
                      width: `${widthPct}%`,
                      minWidth: value > 0 ? "2px" : 0,
                      backgroundColor: `var(${s.colorVar})`,
                      filter: hover?.category === row.category ? "brightness(1.15)" : undefined,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {hover && hoveredRow && (
        <ChartTooltip
          title={hover.category}
          x={hover.x}
          y={hover.y}
          rows={series.map((s) => ({
            label: s.label,
            value: formatValue(hoveredRow.values[s.key] ?? 0),
            color: `var(${s.colorVar})`,
          }))}
        />
      )}
    </div>
  );
}
