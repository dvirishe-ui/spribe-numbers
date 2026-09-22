import { useMemo, useState } from "react";
import { BarChart3, Percent, Target, TrendingUp, Users, Wallet } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatTile } from "@/components/results/StatTile";
import { HorizontalBarChart, type BarSeries } from "@/components/results/HorizontalBarChart";
import { DivergingBarChart } from "@/components/results/DivergingBarChart";
import { ResultsTable } from "@/components/results/ResultsTable";
import {
  OPERATORS,
  PERIODS,
  SEGMENTS,
  aggregate,
  aggregateParticipation,
  getResult,
  type Period,
  type Segment,
} from "@/lib/operatorResults";
import { formatCompact, formatInt, formatMoney, formatPct, pctChange } from "@/lib/format";

// OPERATORS and PERIODS are both derived from the same fixed dataset, so every
// (operator, period) pair here is guaranteed to resolve.
function getResultSafe(operator: string, period: Period) {
  return getResult(operator, period)!;
}

const PERIOD_SERIES: BarSeries[] = [
  { key: "Before", label: "Before", colorVar: "--color-period-before" },
  { key: "During", label: "During", colorVar: "--color-period-during" },
  { key: "After", label: "After", colorVar: "--color-period-after" },
];

export function ResultsDashboard() {
  const [segment, setSegment] = useState<Segment>("all");

  const before = aggregate("Before", segment);
  const during = aggregate("During", segment);
  const after = aggregate("After", segment);
  const participation = aggregateParticipation("During");

  const ggrByOperator = useMemo(() => {
    const rows = OPERATORS.map((operator) => ({
      category: operator,
      values: Object.fromEntries(
        PERIODS.map((period) => [period, getResultSafe(operator, period)[segment].ggr]),
      ),
    }));
    return rows.sort((a, b) => b.values.During - a.values.During);
  }, [segment]);

  const wagerByOperator = useMemo(() => {
    const rows = OPERATORS.map((operator) => ({
      category: operator,
      values: Object.fromEntries(
        PERIODS.map((period) => [period, getResultSafe(operator, period)[segment].totalWager]),
      ),
    }));
    return rows.sort((a, b) => b.values.During - a.values.During);
  }, [segment]);

  const upliftByOperator = useMemo(() => {
    const rows = OPERATORS.map((operator) => ({
      category: operator,
      value: pctChange(getResultSafe(operator, "Before")[segment].ggr, getResultSafe(operator, "During")[segment].ggr),
    }));
    return rows.sort((a, b) => b.value - a.value);
  }, [segment]);

  const participationByOperator = useMemo(() => {
    const rows = OPERATORS.map((operator) => ({
      category: operator,
      values: { During: getResultSafe(operator, "During").participants.participationRatePct },
    }));
    return rows.filter((r) => r.values.During > 0).sort((a, b) => b.values.During - a.values.During);
  }, []);

  const segmentMeta = SEGMENTS.find((s) => s.key === segment)!;

  return (
    <div className="space-y-6">
      <section className="brand-surface rounded-2xl p-5 lg:p-6">
        <p className="text-eyebrow">Promo Results</p>
        <h1 className="mt-1 font-display text-2xl font-bold lg:text-3xl">
          Operator performance — Before / During / After
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          How each of the 15 operators traded across the promotion window, split by which players you look at.
          Charts and the KPI row below react to the segment you pick.
        </p>
        <div className="mt-4 max-w-md">
          <Tabs value={segment} onValueChange={(v) => setSegment(v as Segment)}>
            <TabsList className="w-full">
              {SEGMENTS.map((s) => (
                <TabsTrigger key={s.key} value={s.key}>
                  {s.shortLabel}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <p className="mt-1.5 text-xs text-muted-foreground">{segmentMeta.hint}</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile
          icon={Wallet}
          label="GGR — During"
          value={formatCompact(during.ggr)}
          hint={`vs ${formatCompact(before.ggr)} before`}
          deltaPct={pctChange(before.ggr, during.ggr)}
        />
        <StatTile
          icon={BarChart3}
          label="Total wager — During"
          value={formatCompact(during.totalWager)}
          hint={`vs ${formatCompact(before.totalWager)} before`}
          deltaPct={pctChange(before.totalWager, during.totalWager)}
        />
        <StatTile
          icon={Users}
          label="Active players — During"
          value={formatCompact(during.activePlayers)}
          hint={`vs ${formatCompact(before.activePlayers)} before`}
          deltaPct={pctChange(before.activePlayers, during.activePlayers)}
        />
        <StatTile
          icon={Percent}
          label="Blended RTP — During"
          value={formatPct(during.rtpPct)}
          hint={`vs ${formatPct(before.rtpPct)} before, ${formatPct(after.rtpPct)} after`}
        />
      </section>

      <section className="panel p-4 lg:p-5">
        <div className="mb-1 flex items-center gap-2">
          <Wallet className="size-4 text-primary" />
          <h2 className="font-display text-lg font-semibold">GGR by operator</h2>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          Sorted by During GGR, {segmentMeta.label.toLowerCase()}. Hover a bar for the exact figure.
        </p>
        <HorizontalBarChart
          data={ggrByOperator}
          series={PERIOD_SERIES}
          formatValue={formatCompact}
          ariaLabel="GGR by operator across Before, During and After"
        />
      </section>

      <section className="panel p-4 lg:p-5">
        <div className="mb-1 flex items-center gap-2">
          <TrendingUp className="size-4 text-primary" />
          <h2 className="font-display text-lg font-semibold">GGR uplift during the promo</h2>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          Percent change in GGR from Before to During, {segmentMeta.label.toLowerCase()}. Sorted by biggest gain first.
        </p>
        <DivergingBarChart data={upliftByOperator} ariaLabel="Percent change in GGR from Before to During, by operator" />
      </section>

      <section className="panel p-4 lg:p-5">
        <div className="mb-1 flex items-center gap-2">
          <BarChart3 className="size-4 text-primary" />
          <h2 className="font-display text-lg font-semibold">Total wager by operator</h2>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          Sorted by During wager, {segmentMeta.label.toLowerCase()}.
        </p>
        <HorizontalBarChart
          data={wagerByOperator}
          series={PERIOD_SERIES}
          formatValue={formatCompact}
          ariaLabel="Total wager by operator across Before, During and After"
        />
      </section>

      <section className="panel p-4 lg:p-5">
        <div className="mb-1 flex items-center gap-2">
          <Target className="size-4 text-primary" />
          <h2 className="font-display text-lg font-semibold">Promo participation</h2>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          Registration &amp; engagement funnel captured during the promo window — independent of the segment toggle above.
        </p>

        <div className="mb-5 grid grid-cols-3 gap-3">
          <StatTile
            icon={Users}
            label="Registered"
            value={formatInt(participation.registered)}
            hint="Opted in to the promo"
          />
          <StatTile
            icon={Users}
            label="Active participants"
            value={formatInt(participation.active)}
            hint={`${formatPct((participation.active / participation.registered) * 100)} of registered placed a bet`}
          />
          <StatTile
            icon={Wallet}
            label="GGR vs. payout, EUR"
            value={formatMoney(participation.ggrEur)}
            hint={
              participation.ggrEur < 0
                ? "Negative: prize payouts exceeded promo GGR generated"
                : "Promo GGR generated exceeded prize payouts"
            }
            tone={participation.ggrEur < 0 ? "bad" : "good"}
          />
        </div>

        <HorizontalBarChart
          data={participationByOperator}
          series={[{ key: "During", label: "Participation rate", colorVar: "--color-period-during" }]}
          formatValue={(v) => formatPct(v, 0)}
          ariaLabel="Participation rate by operator during the promo"
          barThickness={14}
        />
      </section>

      <ResultsTable segment={segment} />
    </div>
  );
}
