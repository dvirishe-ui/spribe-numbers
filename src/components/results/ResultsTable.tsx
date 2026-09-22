import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, TableProperties } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PERIODS, resultsForPeriod, type Period, type Segment } from "@/lib/operatorResults";
import { formatInt, formatPct } from "@/lib/format";

type SortKey = "operator" | "totalWager" | "totalWin" | "ggr" | "activePlayers" | "rtpPct";

const COLUMNS: { key: SortKey; label: string; align?: "right" }[] = [
  { key: "operator", label: "Operator" },
  { key: "totalWager", label: "Total wager", align: "right" },
  { key: "totalWin", label: "Total win", align: "right" },
  { key: "ggr", label: "GGR", align: "right" },
  { key: "activePlayers", label: "Active players", align: "right" },
  { key: "rtpPct", label: "RTP", align: "right" },
];

export function ResultsTable({ segment }: { segment: Segment }) {
  const [period, setPeriod] = useState<Period | "All">("During");
  const [sortKey, setSortKey] = useState<SortKey>("ggr");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const rows = useMemo(() => {
    const base = period === "All" ? PERIODS.flatMap((p) => resultsForPeriod(p)) : resultsForPeriod(period);
    const shaped = base.map((r) => ({
      operator: r.operator,
      period: r.period,
      ...r[segment],
    }));
    const dir = sortDir === "asc" ? 1 : -1;
    return [...shaped].sort((a, b) => {
      if (sortKey === "operator") return a.operator.localeCompare(b.operator) * dir;
      return (a[sortKey] - b[sortKey]) * dir;
    });
  }, [period, segment, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <section className="panel p-4 lg:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <TableProperties className="size-4 text-primary" />
          <h2 className="font-display text-lg font-semibold">Full results table</h2>
        </div>
        <div className="w-40">
          <Select value={period} onValueChange={(v) => setPeriod(v as Period | "All")}>
            <SelectTrigger className="h-9 border-border bg-surface-raised text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All periods</SelectItem>
              {PERIODS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              {period === "All" && <th className="py-2 pr-4 font-medium">Period</th>}
              {COLUMNS.map((col) => (
                <th key={col.key} className={col.align === "right" ? "text-right" : "text-left"}>
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className={`inline-flex items-center gap-1 py-2 font-medium transition-colors hover:text-foreground ${
                      col.align === "right" ? "flex-row-reverse pl-4" : "pr-4"
                    }`}
                  >
                    {col.label}
                    {sortKey === col.key ? (
                      sortDir === "asc" ? (
                        <ArrowUp className="size-3" />
                      ) : (
                        <ArrowDown className="size-3" />
                      )
                    ) : (
                      <ArrowUpDown className="size-3 opacity-40" />
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border tabular-nums">
            {rows.map((r, i) => (
              <tr key={`${r.period}-${r.operator}-${i}`}>
                {period === "All" && (
                  <td className="whitespace-nowrap py-2.5 pr-4 text-muted-foreground">{r.period}</td>
                )}
                <td className="whitespace-nowrap py-2.5 pr-4 font-medium">{r.operator}</td>
                <td className="py-2.5 pr-4 text-right text-muted-foreground">{formatInt(r.totalWager)}</td>
                <td className="py-2.5 pr-4 text-right text-muted-foreground">{formatInt(r.totalWin)}</td>
                <td className="py-2.5 pr-4 text-right font-medium">{formatInt(r.ggr)}</td>
                <td className="py-2.5 pr-4 text-right text-muted-foreground">{formatInt(r.activePlayers)}</td>
                <td className="py-2.5 text-right text-muted-foreground">{formatPct(r.rtpPct)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
