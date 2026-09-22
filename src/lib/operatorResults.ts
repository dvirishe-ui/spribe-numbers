import { RAW_OPERATOR_ROWS, type RawOperatorRow } from "@/lib/operatorResults.data";

export type Period = "Before" | "During" | "After";
export const PERIODS: Period[] = ["Before", "During", "After"];

export type Segment = "all" | "reg" | "act";

export const SEGMENTS: { key: Segment; shortLabel: string; label: string; hint: string }[] = [
  { key: "all", shortLabel: "All", label: "All players", hint: "Every player active on the operator" },
  {
    key: "reg",
    shortLabel: "Registered",
    label: "Registered participants",
    hint: "Players registered for this promotion",
  },
  { key: "act", shortLabel: "Active", label: "Active participants", hint: "Registered players who placed a bet" },
];

export interface SegmentMetrics {
  totalWager: number;
  totalWin: number;
  ggr: number;
  numberOfBets: number;
  avgBet: number;
  activePlayers: number;
  rtpPct: number;
}

export interface OperatorPeriodResult {
  period: Period;
  operator: string;
  all: SegmentMetrics;
  reg: SegmentMetrics;
  act: SegmentMetrics;
  /** Only populated on During rows — cumulative promo-tracking progress at the time of export. */
  progress: {
    betsCount: number;
    betsAmountEur: number;
    winsAmountEur: number;
    ggrEur: number;
  };
  /** Only populated on During rows — this promo's registration/participation funnel. */
  participants: {
    registered: number;
    active: number;
    total: number;
    participationRatePct: number;
  };
}

function allMetrics(row: RawOperatorRow): SegmentMetrics {
  return {
    totalWager: row.all_total_wager,
    totalWin: row.all_total_win,
    ggr: row.all_ggr,
    numberOfBets: row.all_number_of_bets,
    avgBet: row.all_avg_bet,
    activePlayers: row.all_active_players,
    rtpPct: row.all_rtp_pct,
  };
}

function regMetrics(row: RawOperatorRow): SegmentMetrics {
  return {
    totalWager: row.reg_total_wager,
    totalWin: row.reg_total_win,
    ggr: row.reg_ggr,
    numberOfBets: row.reg_number_of_bets,
    avgBet: row.reg_avg_bet,
    activePlayers: row.reg_active_players,
    rtpPct: row.reg_rtp_pct,
  };
}

function actMetrics(row: RawOperatorRow): SegmentMetrics {
  return {
    totalWager: row.act_total_wager,
    totalWin: row.act_total_win,
    ggr: row.act_ggr,
    numberOfBets: row.act_number_of_bets,
    avgBet: row.act_avg_bet,
    activePlayers: row.act_active_players,
    rtpPct: row.act_rtp_pct,
  };
}

export const OPERATOR_RESULTS: OperatorPeriodResult[] = RAW_OPERATOR_ROWS.map((row) => ({
  period: row.period,
  operator: row.operator,
  all: allMetrics(row),
  reg: regMetrics(row),
  act: actMetrics(row),
  progress: {
    betsCount: row.bets_count_progress,
    betsAmountEur: row.bets_amount_progress_eur,
    winsAmountEur: row.wins_amount_progress_eur,
    ggrEur: row.ggr_progress_eur,
  },
  participants: {
    registered: row.registered_participants,
    active: row.active_participants,
    total: row.players_total,
    participationRatePct: row.participation_rate_pct,
  },
}));

export const OPERATORS: string[] = Array.from(new Set(OPERATOR_RESULTS.map((r) => r.operator))).sort();

export function segmentOf(result: OperatorPeriodResult, segment: Segment): SegmentMetrics {
  return result[segment];
}

export function resultsForPeriod(period: Period): OperatorPeriodResult[] {
  return OPERATOR_RESULTS.filter((r) => r.period === period);
}

export function getResult(operator: string, period: Period): OperatorPeriodResult | undefined {
  return OPERATOR_RESULTS.find((r) => r.operator === operator && r.period === period);
}

/** Sums additive fields across all operators for a period/segment; rates are recomputed, never averaged. */
export function aggregate(period: Period, segment: Segment): SegmentMetrics {
  const rows = resultsForPeriod(period).map((r) => r[segment]);
  const totalWager = rows.reduce((s, r) => s + r.totalWager, 0);
  const totalWin = rows.reduce((s, r) => s + r.totalWin, 0);
  const ggr = rows.reduce((s, r) => s + r.ggr, 0);
  const numberOfBets = rows.reduce((s, r) => s + r.numberOfBets, 0);
  const activePlayers = rows.reduce((s, r) => s + r.activePlayers, 0);
  return {
    totalWager,
    totalWin,
    ggr,
    numberOfBets,
    activePlayers,
    avgBet: numberOfBets > 0 ? totalWager / numberOfBets : 0,
    rtpPct: totalWager > 0 ? (totalWin / totalWager) * 100 : 0,
  };
}

export function aggregateParticipation(period: Period) {
  const rows = resultsForPeriod(period);
  return {
    registered: rows.reduce((s, r) => s + r.participants.registered, 0),
    active: rows.reduce((s, r) => s + r.participants.active, 0),
    total: rows.reduce((s, r) => s + r.participants.total, 0),
    betsAmountEur: rows.reduce((s, r) => s + r.progress.betsAmountEur, 0),
    ggrEur: rows.reduce((s, r) => s + r.progress.ggrEur, 0),
  };
}
