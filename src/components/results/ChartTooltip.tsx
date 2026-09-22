interface TooltipRow {
  label: string;
  value: string;
  color: string;
}

interface ChartTooltipProps {
  title: string;
  rows: TooltipRow[];
  /** Position in pixels, relative to the chart's own positioning container. */
  x: number;
  y: number;
}

/**
 * Fixed at the pointer's last position rather than following the raw event stream,
 * so it doesn't jitter between adjacent bars. Positioned via translate so it never
 * clips at the container's right/bottom edge.
 */
export function ChartTooltip({ title, rows, x, y }: ChartTooltipProps) {
  return (
    <div
      className="pointer-events-none absolute z-10 min-w-36 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-panel"
      style={{ left: x, top: y - 10 }}
      role="tooltip"
    >
      <p className="mb-1 font-medium text-popover-foreground">{title}</p>
      <dl className="space-y-0.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-1.5 text-muted-foreground">
              <span className="h-0.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: row.color }} />
              {row.label}
            </dt>
            <dd className="font-semibold tabular-nums text-popover-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
