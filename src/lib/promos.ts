import worldCupBanner from "@/assets/banner-worldcup-aviator.jpg";

export type PromoType =
  | "Network Tournament"
  | "Cross-Game Challenge"
  | "Missions"
  | "Leaderboard"
  | "Collection Campaign"
  | "Regional Promotion"
  | "Seasonal Promotion"
  | "New Game Launch";

export type PromoStatus =
  | "Upcoming"
  | "Registration Open"
  | "Live"
  | "Ending Soon"
  | "Completed";

export type Funding = "Operator funded" | "Shared funding" | "TBD";

export type ParticipationStatus = "Not Requested" | "Request Sent" | "Under Review" | "Confirmed";

export interface Promo {
  id: string;
  name: string;
  type: PromoType;
  start: string; // ISO date
  end: string; // ISO date
  optInDeadline: string;
  announceDate: string;
  region: string;
  countries: string[];
  restrictedCountries: string[];
  games: string[];
  prizePool: string;
  funding: Funding;
  operators: number;
  summary: string;
  qualification: string;
  minBet: string;
  scoringFormula: string;
  scoringExample: string;
  prizeDistribution: { place: string; prize: string }[];
  tieBreak: string;
  creditingTiming: string;
  technical: string[];
  assets: { label: string; detail: string }[];
  localization: string[];
  manager: { name: string; role: string; email: string };
  /** Default/demo participation state for this operator. Mutable client-side via ParticipationProvider. */
  defaultParticipation: ParticipationStatus;
  /** Hero marketing banner for this campaign, shown on the detail page and in Marketing assets. */
  bannerImage?: string;
  /**
   * Set on placeholder slots (specifics not yet defined) rather than
   * fully-specified campaigns. "confirmed" = the recurring format itself is
   * locked in; "flexible" = slot can move to fit the year; "scheduled" = the
   * promo window is locked to a verified external event (sporting fixture,
   * festival, holiday) but game/prize/operator specifics are still TBD.
   */
  planningStage?: "confirmed" | "flexible" | "scheduled";
  /** True when start/end/optInDeadline are indicative placeholders, not fixed dates. */
  datesIndicative?: boolean;
  /** Short marketing tagline shown under the campaign name. */
  tagline?: string;
  /** Extra terms specific to this campaign, appended after the general campaign terms. */
  campaignTerms?: string[];
  /** Per-day task breakdown for multi-day cross-game mission campaigns. */
  dailyMissions?: { day: number; games: string[]; tasks: string[] }[];
}

export const PROMO_TYPES: PromoType[] = [
  "Network Tournament",
  "Cross-Game Challenge",
  "Missions",
  "Leaderboard",
  "Collection Campaign",
  "Regional Promotion",
  "Seasonal Promotion",
  "New Game Launch",
];

export const PROMO_STATUSES: PromoStatus[] = [
  "Upcoming",
  "Registration Open",
  "Live",
  "Ending Soon",
  "Completed",
];

export const PARTICIPATION_STATUSES: ParticipationStatus[] = [
  "Not Requested",
  "Request Sent",
  "Under Review",
  "Confirmed",
];

export const typeColorVar: Record<PromoType, string> = {
  "Network Tournament": "var(--type-tournament)",
  "Cross-Game Challenge": "var(--type-crossgame)",
  Missions: "var(--type-missions)",
  Leaderboard: "var(--type-leaderboard)",
  "Collection Campaign": "var(--type-collection)",
  "Regional Promotion": "var(--type-regional)",
  "Seasonal Promotion": "var(--type-seasonal)",
  "New Game Launch": "var(--type-launch)",
};

export const statusColorVar: Record<PromoStatus, string> = {
  Live: "var(--status-live)",
  "Registration Open": "var(--status-registration)",
  Upcoming: "var(--status-upcoming)",
  "Ending Soon": "var(--status-ending)",
  Completed: "var(--status-completed)",
};

export const participationColorVar: Record<ParticipationStatus, string> = {
  "Not Requested": "var(--participation-none)",
  "Request Sent": "var(--participation-sent)",
  "Under Review": "var(--participation-review)",
  Confirmed: "var(--participation-confirmed)",
};

export const manager = {
  name: "Mariam Koridze",
  role: "Partner Account Manager, LATAM & EU",
  email: "mkoridze@spribe.co",
};

const curatedPromos: Promo[] = [
  {
    id: "world-cup-aviator-kickoff",
    name: "Aviator World Cup Kickoff",
    type: "Seasonal Promotion",
    start: "2026-06-15",
    end: "2026-06-28",
    optInDeadline: "2026-06-08",
    announceDate: "2026-05-20",
    region: "LATAM",
    countries: ["Mexico", "Brazil", "Argentina", "Colombia"],
    restrictedCountries: [],
    games: ["Aviator"],
    prizePool: "$6,000",
    funding: "Shared funding",
    operators: 33,
    summary:
      "Kickoff-week activation timed to the FIFA World Cup, rewarding Aviator players across LATAM with a dedicated prize pool during the tournament's opening matches.",
    qualification: "All real-money Aviator rounds placed during the promotion window qualify automatically.",
    minBet: "Min bet $0.20",
    scoringFormula: "Score = highest single-round multiplier achieved during the window",
    scoringExample:
      "A player hitting a 60x cash-out during kickoff week ranks above one hitting 45x, regardless of stake size.",
    prizeDistribution: [
      { place: "1st", prize: "$2,000" },
      { place: "2nd – 5th", prize: "$500 each" },
      { place: "6th – 50th", prize: "$80 each" },
    ],
    tieBreak: "Earliest qualifying timestamp wins.",
    creditingTiming: "Completed — prizes credited 30 Jun 2026.",
    technical: ["Tournament API v3", "Kickoff-week lobby placement"],
    assets: [{ label: "Hero banner", detail: "World Cup theme, 1920×1080 + social crops" }],
    localization: ["EN", "ES-LATAM", "PT-BR"],
    manager,
    defaultParticipation: "Confirmed",
    bannerImage: worldCupBanner,
  },
  {
    id: "spribe-adventure-2026",
    name: "SPRIBE Adventure",
    type: "Cross-Game Challenge",
    start: "2026-09-21",
    end: "2026-09-27",
    optInDeadline: "2026-09-20",
    announceDate: "2026-09-20",
    region: "Global",
    countries: ["Global"],
    restrictedCountries: [],
    games: ["Aviator", "Mines", "Goal", "Plinko", "Pilot Chicken", "Keno", "Trader"],
    prizePool: "$15,000",
    funding: "Shared funding",
    operators: 0,
    tagline: "One Adventure. Multiple Games. Bigger Rewards",
    summary:
      "7 days of daily cross-game challenges — Aviator is the entry/anchor game every day, paired with 3 rotating SPRIBE titles and a progressive daily prize pool.",
    qualification:
      "Complete all 4 of the day's tasks across that day's featured games — Aviator plus 3 rotating titles — to qualify for that Daily Mission's reward pool.",
    minBet: "TBD",
    scoringFormula: "First 50 players to complete all 4 daily tasks share that day's reward pool",
    scoringExample:
      "The first 50 players to complete every task in a Daily Mission share that day's prize pool; finishing 51st earns nothing that day, but every day is a fresh chance to win.",
    prizeDistribution: [
      { place: "Day 1", prize: "$25 × 50 winners ($1,250)" },
      { place: "Day 2", prize: "$30 × 50 winners ($1,500)" },
      { place: "Day 3", prize: "$35 × 50 winners ($1,750)" },
      { place: "Day 4", prize: "$40 × 50 winners ($2,000)" },
      { place: "Day 5", prize: "$50 × 50 winners ($2,500)" },
      { place: "Day 6", prize: "$55 × 50 winners ($2,750)" },
      { place: "Day 7", prize: "$65 × 50 winners ($3,250)" },
    ],
    tieBreak: "First come, first served — the first 50 players to complete all daily tasks win.",
    creditingTiming: "Cash prizes credited automatically within 72 hours after each Daily Mission ends.",
    technical: ["Mission window live in-game", "Progress updates after every completed round"],
    assets: [{ label: "Hero banner", detail: "SPRIBE Adventure theme" }],
    localization: ["TBD"],
    manager,
    defaultParticipation: "Not Requested",
    dailyMissions: [
      {
        day: 1,
        games: ["Aviator", "Pilot Chicken", "Plinko", "Mines"],
        tasks: [
          "Aviator: catch a 30x+ multiplier 10 times",
          "Pilot Chicken: collect 100x in total",
          "Plinko: place 100 individual bets",
          "Mines: collect 100x in total",
        ],
      },
      {
        day: 2,
        games: ["Aviator", "Goal", "Keno", "Trader"],
        tasks: [
          "Aviator: catch a 30x+ multiplier 10 times",
          "Goal: collect 100x in total",
          "Keno: place 100 individual bets",
          "Trader: collect 100x in total",
        ],
      },
      {
        day: 3,
        games: ["Aviator", "Pilot Chicken", "Mines", "Plinko"],
        tasks: [
          "Aviator: catch a 30x+ multiplier 10 times",
          "Pilot Chicken: place 100 individual bets",
          "Mines: collect 100x in total",
          "Plinko: place 100 individual bets",
        ],
      },
      {
        day: 4,
        games: ["Aviator", "Trader", "Keno", "Goal"],
        tasks: [
          "Aviator: catch a 30x+ multiplier 10 times",
          "Trader: collect 100x in total",
          "Keno: place 100 individual bets",
          "Goal: collect 100x in total",
        ],
      },
      {
        day: 5,
        games: ["Aviator", "Pilot Chicken", "Trader", "Mines"],
        tasks: [
          "Aviator: catch a 30x+ multiplier 10 times",
          "Pilot Chicken: collect 100x in total",
          "Trader: place 100 individual bets",
          "Mines: collect 100x in total",
        ],
      },
      {
        day: 6,
        games: ["Aviator", "Plinko", "Keno", "Goal"],
        tasks: ["Tasks to be published in the Mission window before this Daily Mission opens"],
      },
      {
        day: 7,
        games: ["Aviator", "Pilot Chicken", "Plinko", "Mines"],
        tasks: ["Tasks to be published in the Mission window before this Daily Mission opens"],
      },
    ],
    campaignTerms: [
      "This promotion is available exclusively for the listed games in the game window.",
      "Players must click \"Join\" before participating.",
      "Each Daily Mission is independent.",
      "Progress resets at the end of each Daily Mission and does not carry over to the next day.",
      "Players must complete all tasks before the Daily Mission ends.",
      "Mission progress is updated after every completed round.",
      "The Mission window refreshes only when reopened or manually refreshed.",
      "Rewards are granted on a first come, first served basis.",
      "Winners will share a $15,000 total prize pool.",
      "The first 50 eligible players to complete all tasks will receive a cash prize.",
      "Day 1: 50 winners will share $1,250 prize pool ($25 x winner)",
      "Day 2: 50 winners will share $1,500 prize pool ($30 x winner)",
      "Day 3: 50 winners will share $1,750 prize pool ($35 x winner)",
      "Day 4: 50 winners will share $2,000 prize pool ($40 x winner)",
      "Day 5: 50 winners will share $2,500 prize pool ($50 x winner)",
      "Day 6: 50 winners will share $2,750 prize pool ($55 x winner)",
      "Day 7: 50 winners will share $3,250 prize pool ($65 x winner)",
      "Once all 50 daily rewards have been claimed, no additional prizes will be awarded for that Daily Mission.",
      "A player can receive one reward per Daily Mission.",
      "Tasks and required values may vary from one Daily Mission to another and will be displayed in the Mission window within the game before the start of each Daily Mission.",
      "Players remain eligible to participate in and win subsequent Daily Missions.",
      "Cash prizes will be awarded automatically within 72 hours after each Daily Mission ends.",
      "Only verified Casino Players are eligible to win the prizes.",
      "Cash prizes will be paid out in the currency the winning bet was placed with, according to currency conversion.",
      "This offer cannot be used in conjunction with any other offers.",
      "The company reserves the right not to pay out a cash prize where the win results from any obvious error, mistake or technical fault and where, in its opinion, the win results from cheating or collusion with other players.",
      "SPRIBE may change or terminate this promotion if required for legal, technical or regulatory reasons.",
    ],
  },
];

/**
 * SPRIBE's 2027 annual promotional roadmap: a recurring structure of Aviator
 * Network Tournaments, Cross-Game Network Missions and flexible Seasonal &
 * Event slots, built to keep promotional activity continuous year-round.
 * Markets, operators, exact dates and some prize pools are still to be
 * defined — these are placeholder slots for visibility and planning, not
 * confirmed campaigns. SPRIBE will publish full terms and swap each slot
 * for a fully-specified campaign once confirmed.
 */
export const ROADMAP_INTRO =
  "Recurring tournaments, cross-game missions, and flexible seasonal slots — a working draft, adjusted as the year goes.";

export interface RoadmapFormat {
  format: string;
  frequency: string;
  mechanic: string;
  games: string;
  duration: string;
  prizePool: string;
  status: "Confirmed format" | "Flexible format" | "As needed";
}

export const ROADMAP_FORMATS: RoadmapFormat[] = [
  {
    format: "Aviator Network Tournament",
    frequency: "4 per year",
    mechanic: "Tournament: Sum of Multipliers",
    games: "Aviator only",
    duration: "14 days",
    prizePool: "$10,000 guaranteed per edition",
    status: "Confirmed format",
  },
  {
    format: "Cross-Game Network Mission",
    frequency: "4 per year",
    mechanic: "Seven daily missions; all tasks required",
    games: "Aviator + rotating SPRIBE games",
    duration: "7 days",
    prizePool: "TBD before publication",
    status: "Confirmed format",
  },
  {
    format: "Seasonal & Event Promotion",
    frequency: "4 core slots + optional opportunities",
    mechanic: "Tournament or Mission",
    games: "Aviator or Cross-Game",
    duration: "7–14 days",
    prizePool: "TBD before publication",
    status: "Flexible format",
  },
  {
    format: "New Game / Slot Launch",
    frequency: "As needed, tied to the launch schedule",
    mechanic: "Launch tournament or mission",
    games: "The newly launched title",
    duration: "TBD",
    prizePool: "TBD",
    status: "As needed",
  },
];

export interface RoadmapScope {
  scope: string;
  whenToUse: string;
  overlapRule: string;
}

export const ROADMAP_SCOPE_OPTIONS: RoadmapScope[] = [
  {
    scope: "Regional network",
    whenToUse: "The event is relevant across several markets.",
    overlapRule: "Excludes operators already committed to a conflicting campaign.",
  },
  {
    scope: "Country exclusive",
    whenToUse: "The event is relevant to one national market.",
    overlapRule: "May include several operators in that country.",
  },
  {
    scope: "Operator exclusive",
    whenToUse: "A specific operator requests a dedicated campaign.",
    overlapRule: "Confirm availability and replace any conflicting campaign.",
  },
];

export const ROADMAP_PLANNING_RULES: string[] = [
  "The same operator and market cannot join overlapping campaigns within the same Client Area.",
  "Country- or operator-exclusive campaigns may replace a planned network campaign for the affected operator.",
  "Seasonal and event slots are reviewed quarterly and adapted to commercial opportunities.",
  "Additional exclusive campaigns may be added only after checking dates, eligibility, budget and technical capacity.",
];

function addDaysIso(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y!, (m ?? 1) - 1, d ?? 1);
  date.setDate(date.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * A couple of verified event-linked promotions kept on the calendar to
 * demonstrate the format — real dates researched against external calendars
 * (UEFA Champions League matchdays, a Christmas/New Year window), trimmed to
 * a focused promotional burst rather than the whole month/event range. Game,
 * prize pool and operator specifics are intentionally left TBD — only the
 * dates and target markets have been verified so far.
 */
function eventPromo(input: {
  id: string;
  name: string;
  type: PromoType;
  start: string;
  end: string;
  region: string;
  countries: string[];
  summary: string;
}): Promo {
  return {
    id: input.id,
    name: input.name,
    type: input.type,
    start: input.start,
    end: input.end,
    optInDeadline: addDaysIso(input.start, -7),
    announceDate: addDaysIso(input.start, -21),
    region: input.region,
    countries: input.countries,
    restrictedCountries: [],
    games: ["Aviator"],
    prizePool: "TBD",
    funding: "TBD",
    operators: 0,
    summary: input.summary,
    qualification:
      "Player qualification rules to be confirmed once game and prize mechanics are finalized.",
    minBet: "TBD",
    scoringFormula: "TBD — scoring formula to be confirmed.",
    scoringExample: "A worked example will be published once this campaign's mechanics are confirmed.",
    prizeDistribution: [{ place: "TBD", prize: "TBD" }],
    tieBreak: "TBD",
    creditingTiming: "TBD",
    technical: ["Requirements to be confirmed."],
    assets: [{ label: "Marketing kit", detail: "To be provided ahead of launch" }],
    localization: ["TBD"],
    manager,
    defaultParticipation: "Not Requested",
  };
}

const UCL_MARKETS = ["Germany", "Poland", "Romania", "Georgia", "Kazakhstan"];

const eventLinkedPromos: Promo[] = [
  eventPromo({
    id: "global-holiday-2026",
    name: "Global Holiday Tournament",
    type: "Seasonal Promotion",
    start: "2026-12-20",
    end: "2027-01-01",
    region: "Global",
    countries: ["Global"],
    summary:
      "The flagship Christmas / New Year cross-market network tournament, open to every eligible market — the one window kept close to full length given its scale.",
  }),
  eventPromo({
    id: "ucl-final-2027",
    name: "Champions League Tournament — Final",
    type: "Network Tournament",
    start: "2027-06-01",
    end: "2027-06-05",
    region: "Europe/CIS",
    countries: UCL_MARKETS,
    summary:
      "Covers the UEFA Champions League Final in Madrid (5 Jun 2027) — the highest global-visibility window of the season.",
  }),
];

export const promos: Promo[] = [...curatedPromos, ...eventLinkedPromos];

export const REGIONS = Array.from(new Set(promos.map((p) => p.region)));
export const COUNTRIES = Array.from(new Set(promos.flatMap((p) => p.countries))).sort();
export const GAMES = Array.from(new Set(promos.flatMap((p) => p.games))).sort();

export function getPromo(id: string) {
  return promos.find((p) => p.id === id);
}

export function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y!, (m ?? 1) - 1, d ?? 1);
}

export function formatDate(iso: string) {
  return parseDate(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function durationDays(promo: Promo) {
  const ms = parseDate(promo.end).getTime() - parseDate(promo.start).getTime();
  return Math.round(ms / 86400000) + 1;
}

/**
 * Derives the promo's lifecycle status from today's date instead of a stored field,
 * so the calendar moves Upcoming -> Registration Open -> Live -> Ending Soon -> Completed on its own.
 */
export function getPromoStatus(promo: Promo, now: Date = new Date()): PromoStatus {
  const start = parseDate(promo.start);
  const end = parseDate(promo.end);
  const endOfDay = new Date(end).setHours(23, 59, 59, 999);
  const optIn = new Date(parseDate(promo.optInDeadline)).setHours(23, 59, 59, 999);
  const endingSoonFrom = new Date(end);
  endingSoonFrom.setDate(endingSoonFrom.getDate() - 1);
  const t = now.getTime();

  if (t > endOfDay) return "Completed";
  if (t >= endingSoonFrom.getTime()) return "Ending Soon";
  if (t >= start.getTime()) return "Live";
  if (t <= optIn) return "Registration Open";
  return "Upcoming";
}


/** General terms shared by every campaign, shown alongside any campaign-specific terms. */
export const GENERAL_CAMPAIGN_TERMS: string[] = [
  "Only real-money qualifying rounds count toward promotion standings unless stated otherwise for that campaign.",
  "SPRIBE reserves the right to disqualify players or operators suspected of collusion, bonus abuse or unfair play.",
  "Operators must complete integration, certification and testing of the required promotion module before go-live.",
  "Prize crediting timelines are estimates and may be adjusted to allow for anti-fraud and compliance review.",
  "SPRIBE may amend campaign mechanics prior to launch; material changes are communicated to opted-in operators in advance.",
  "This document describes the general campaign structure. It does not override a market's local licensing requirements.",
];


export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do I request participation in a promotion?",
    answer:
      "Open the promotion page and select \"Request Participation\". This sends a request to your Account Manager, who will confirm eligibility and any remaining requirements. You'll see the status change from Not Requested to Request Sent, then Under Review, then Confirmed.",
  },
  {
    question: "Why can't I see a promotion?",
    answer:
      "The Promo Calendar only shows campaigns SPRIBE has published for your region and licence. If a promotion you've heard about isn't listed yet, it may not have been published to your market — ask your Account Manager.",
  },
  {
    question: "Can I participate in more than one promotion at a time?",
    answer:
      "Yes. Most operators run several SPRIBE campaigns in parallel — network tournaments, missions and regional promotions can all be live at once, as long as your platform meets each one's requirements.",
  },
  {
    question: "Where can I download the marketing assets?",
    answer:
      "Every promotion page has a Marketing Assets section with the banner pack for that campaign, once your participation is confirmed.",
  },
  {
    question: "Which markets are eligible for a given promotion?",
    answer:
      "Check the Eligible Markets section on the promotion page. It lists the countries a campaign is available in, and any explicitly restricted markets.",
  },
  {
    question: "When are prizes credited?",
    answer:
      "Crediting timing is listed per promotion in the Prizes section — most campaigns credit within 24–72 hours of close, and this page always shows the specific window for that campaign.",
  },
  {
    question: "How is leaderboard scoring calculated?",
    answer:
      "Each promotion publishes its own scoring formula and a worked example under the Scoring section, so you can see exactly how a qualifying round converts into points or a prize.",
  },
  {
    question: "Who should I contact if something looks wrong?",
    answer:
      "Use the \"Talk to Account Manager\" option on the promotion page, or from Help & Support, and describe the issue. Your Account Manager will investigate and follow up directly.",
  },
];

export type NotificationKind =
  | "new_promo"
  | "deadline"
  | "confirmed"
  | "terms_updated"
  | "assets_available"
  | "starting_tomorrow"
  | "results_available";

export interface NotificationItem {
  id: string;
  kind: NotificationKind;
  title: string;
  detail: string;
  promoId?: string;
  timestamp: string;
  read: boolean;
}

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    kind: "results_available",
    title: "Promotion results available",
    detail: "Aviator World Cup Kickoff — final standings and performance report published.",
    promoId: "world-cup-aviator-kickoff",
    timestamp: "2026-06-30T12:00:00",
    read: false,
  },
];
