import { manager, promos as builtInPromos, type Promo, type PromoType, type Funding } from "./promos";

const STORAGE_KEY = "spribe-promo-custom-promos";

// One-time cleanup: names of custom promos to strip out wherever they're
// found, regardless of when they were added. Add a name here rather than
// deleting from a database, since custom promos live in each operator's own
// browser storage rather than in shared app data.
const RETIRED_CUSTOM_PROMO_NAMES = ["dvir motkin gelfand"];

export function loadCustomPromos(): Promo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as Promo[];
    const cleaned = list.filter((p) => !RETIRED_CUSTOM_PROMO_NAMES.includes(p.name.trim().toLowerCase()));
    if (cleaned.length !== list.length) saveCustomPromos(cleaned);
    return cleaned;
  } catch {
    return [];
  }
}

function saveCustomPromos(list: Promo[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // best-effort persistence only
  }
}

/**
 * Built-in promos plus anything added through "Add Promotion", read fresh
 * from localStorage each call. Cheap enough at this list size, and it means
 * a route loader (which runs outside React) can look up a just-added promo
 * by id right after creation without needing shared React state.
 */
export function getAllPromos(): Promo[] {
  return [...builtInPromos, ...loadCustomPromos()];
}

export function getPromoById(id: string): Promo | undefined {
  return getAllPromos().find((p) => p.id === id);
}

/**
 * Finds the first existing promo whose date range shares a day with
 * [start, end], so the calendar never has to show more than one promotion
 * on the same day. String comparison is safe here since dates are always
 * ISO "YYYY-MM-DD".
 */
export function findOverlappingPromo(
  start: string,
  end: string,
  existing: Promo[],
): Promo | undefined {
  return existing.find((p) => start <= p.end && end >= p.start);
}

export interface NewPromoInput {
  name: string;
  type: PromoType;
  region: string;
  countries: string[];
  games: string[];
  start: string;
  end: string;
  prizePool: string;
  funding: Funding;
  summary: string;
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y!, (m ?? 1) - 1, d ?? 1);
  date.setDate(date.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Fills in the deep-detail fields a quick "Add Promotion" form doesn't ask for. */
export function buildCustomPromo(input: NewPromoInput): Promo {
  const id = `custom-${slugify(input.name)}-${Date.now().toString(36)}`;
  const games = input.games.length > 0 ? input.games : ["TBD"];
  const countries = input.countries.length > 0 ? input.countries : [input.region];

  return {
    id,
    name: input.name,
    type: input.type,
    start: input.start,
    end: input.end,
    optInDeadline: addDays(input.start, -7),
    announceDate: addDays(input.start, -21),
    region: input.region,
    countries,
    restrictedCountries: [],
    games,
    prizePool: input.prizePool || "TBD",
    funding: input.funding,
    operators: 0,
    summary: input.summary || `${input.name} — added manually. Full mechanics and terms to be confirmed.`,
    qualification: "Player qualification rules to be confirmed.",
    minBet: "TBD",
    scoringFormula: "TBD — scoring formula to be confirmed.",
    scoringExample: "A worked example will be published once this campaign's mechanics are confirmed.",
    prizeDistribution: [{ place: "TBD", prize: input.prizePool || "TBD" }],
    tieBreak: "TBD",
    creditingTiming: "TBD",
    technical: ["Requirements to be confirmed."],
    assets: [{ label: "Marketing kit", detail: "To be provided ahead of launch" }],
    localization: ["TBD"],
    manager,
    defaultParticipation: "Not Requested",
  };
}

export function addCustomPromo(promo: Promo) {
  const list = loadCustomPromos();
  list.push(promo);
  saveCustomPromos(list);
}

export function removeCustomPromo(id: string) {
  saveCustomPromos(loadCustomPromos().filter((p) => p.id !== id));
}
