import { useMemo, useState } from "react";
import { Target } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MARKET_INSIGHTS } from "@/lib/marketInsights";

export function MarketSuggestions() {
  const [market, setMarket] = useState("all");

  const rows = useMemo(
    () => (market === "all" ? MARKET_INSIGHTS : MARKET_INSIGHTS.filter((m) => m.market === market)),
    [market],
  );

  return (
    <div className="space-y-5">
      <section className="panel space-y-3.5 p-4">
        <div className="flex items-start gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
            <Target className="size-4" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">Best game &amp; timing by market</h2>
            <p className="mt-0.5 max-w-3xl text-xs text-muted-foreground">
              Aviator leads in almost every market here. Most used promotion is left TBD where the
              evidence wasn't strong enough to call one mechanic dominant.
            </p>
          </div>
        </div>

        <div className="max-w-xs">
          <div className="text-eyebrow mb-1.5">Market</div>
          <Select value={market} onValueChange={setMarket}>
            <SelectTrigger className="h-9 w-full border-border bg-surface-raised text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All markets</SelectItem>
              {MARKET_INSIGHTS.map((m) => (
                <SelectItem key={m.market} value={m.market}>
                  {m.flag} {m.market}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Market</th>
                <th className="py-2 pr-4 font-medium">Best game</th>
                <th className="py-2 pr-4 font-medium">2nd game suggested</th>
                <th className="py-2 pr-4 font-medium">Most used promotion</th>
                <th className="py-2 font-medium">Best window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((m) => (
                <tr key={m.market}>
                  <td className="whitespace-nowrap py-2.5 pr-4 font-medium">
                    {m.flag} {m.market}
                  </td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{m.heroGame}</td>
                  <td className="whitespace-nowrap py-2.5 pr-4 text-muted-foreground">{m.secondGame ?? "—"}</td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{m.mostUsedPromo}</td>
                  <td className="py-2.5 text-muted-foreground">{m.bestWindow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="rounded-lg border border-border bg-surface-raised/60 px-3 py-2 text-xs text-muted-foreground">
        Based on Blask's current top-20 markets by Blask Index (iGaming attention/demand, not revenue)
        cross-checked against SPRIBE's own game rankings.
      </p>
    </div>
  );
}
