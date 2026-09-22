/**
 * Game × market intelligence, built from Blask's current top-20 markets by
 * Blask Index (a ranking of iGaming attention/demand, not revenue) plus the
 * operator's own priority-market research. Aviator is SPRIBE's #1 game in
 * almost every one of these markets. "Most used promotion" is the operator's
 * own read of which SPRIBE mechanic (Aviator Freebets, Rain Promo Free Bets,
 * Aviator Challenges, Cross Game Challenges, generic Freebet Promo) has the
 * strongest public evidence per market — left TBD where evidence wasn't
 * strong enough to call one mechanic dominant, rather than guessed.
 */
export interface MarketInsight {
  market: string;
  flag: string;
  heroGame: string;
  secondGame?: string;
  mostUsedPromo: string;
  bestWindow: string;
}

export const MARKET_INSIGHTS: MarketInsight[] = [
  {
    market: "Brazil",
    flag: "🇧🇷",
    heroGame: "Aviator",
    secondGame: "Mines",
    mostUsedPromo: "Aviator Challenges → Freebet reward",
    bestWindow: "Oct + Dec, Jul secondary",
  },
  {
    market: "Philippines",
    flag: "🇵🇭",
    heroGame: "Aviator",
    secondGame: "Mines",
    mostUsedPromo: "Aviator Freebets",
    bestWindow: "3–4 weeks in Dec; smaller 2–3 week tests in Aug/Oct",
  },
  {
    market: "South Africa",
    flag: "🇿🇦",
    heroGame: "Aviator",
    secondGame: "Trader",
    mostUsedPromo: "Rain Promo Free Bets",
    bestWindow: "October regional signal",
  },
  {
    market: "Vietnam",
    flag: "🇻🇳",
    heroGame: "Aviator",
    secondGame: "Hi-Lo",
    mostUsedPromo: "TBD",
    bestWindow: "TBD",
  },
  {
    market: "United Kingdom",
    flag: "🇬🇧",
    heroGame: "Aviator",
    secondGame: "Plinko",
    mostUsedPromo: "TBD",
    bestWindow: "December signal",
  },
  {
    market: "Nigeria",
    flag: "🇳🇬",
    heroGame: "Aviator",
    secondGame: "Mines",
    mostUsedPromo: "Rain Promo Free Bets",
    bestWindow: "October regional signal",
  },
  {
    market: "Tanzania",
    flag: "🇹🇿",
    heroGame: "Aviator",
    secondGame: "Mines",
    mostUsedPromo: "Rain Promo Free Bets",
    bestWindow: "October regional signal",
  },
  {
    market: "Italy",
    flag: "🇮🇹",
    heroGame: "Aviator",
    secondGame: "Goal",
    mostUsedPromo: "Rain Promo Free Bets",
    bestWindow: "October",
  },
  {
    market: "Bangladesh",
    flag: "🇧🇩",
    heroGame: "Aviator",
    secondGame: "Dice",
    mostUsedPromo: "TBD",
    bestWindow: "December",
  },
  {
    market: "Kenya",
    flag: "🇰🇪",
    heroGame: "Aviator",
    secondGame: "Plinko",
    mostUsedPromo: "Rain Promo Free Bets",
    bestWindow: "October regional signal",
  },
  {
    market: "Congo (DRC)",
    flag: "🇨🇩",
    heroGame: "Aviator",
    secondGame: "Goal",
    mostUsedPromo: "TBD",
    bestWindow: "October regional signal",
  },
  {
    market: "India",
    flag: "🇮🇳",
    heroGame: "Aviator",
    secondGame: "Mines",
    mostUsedPromo: "Aviator Freebets",
    bestWindow: "Late Mar–May, April strongest",
  },
  {
    market: "Peru",
    flag: "🇵🇪",
    heroGame: "Aviator",
    secondGame: "Hotline",
    mostUsedPromo: "TBD",
    bestWindow: "Sep–Oct baseline (4–6 wks) + 2–4 wks around major football events",
  },
  {
    market: "Germany",
    flag: "🇩🇪",
    heroGame: "Aviator",
    secondGame: "Plinko",
    mostUsedPromo: "TBD",
    bestWindow: "Mar–Apr (3–5 wks), April strongest; June only in Euro/World Cup years",
  },
  {
    market: "Mozambique",
    flag: "🇲🇿",
    heroGame: "Aviator",
    secondGame: "Plinko",
    mostUsedPromo: "Rain Promo Free Bets",
    bestWindow: "October regional signal",
  },
  {
    market: "Uganda",
    flag: "🇺🇬",
    heroGame: "Aviator",
    secondGame: "Keno",
    mostUsedPromo: "Rain Promo Free Bets",
    bestWindow: "October regional signal",
  },
  {
    market: "Bulgaria",
    flag: "🇧🇬",
    heroGame: "Aviator",
    secondGame: "Dice",
    mostUsedPromo: "TBD",
    bestWindow: "TBD",
  },
  {
    market: "Indonesia",
    flag: "🇮🇩",
    heroGame: "Aviator",
    secondGame: "Mines",
    mostUsedPromo: "Rain Promo Free Bets",
    bestWindow: "April",
  },
  {
    market: "Argentina",
    flag: "🇦🇷",
    heroGame: "Aviator",
    secondGame: "Mines",
    mostUsedPromo: "Aviator Freebets",
    bestWindow: "Start 7–14 days before a major tournament, run 2–4 weeks — spend early rather than wait for the final",
  },
  {
    market: "Romania",
    flag: "🇷🇴",
    heroGame: "Aviator",
    secondGame: "Mines",
    mostUsedPromo: "Aviator Challenges — tentative",
    bestWindow: "Mid-Nov through Dec, 4–5 weeks",
  },
  {
    market: "Colombia",
    flag: "🇨🇴",
    heroGame: "Aviator",
    secondGame: "Mines",
    mostUsedPromo: "TBD",
    bestWindow: "April (2–3 wks) + Oct–Nov (3–4 wks)",
  },
  {
    market: "Chile",
    flag: "🇨🇱",
    heroGame: "Aviator",
    secondGame: "Mines",
    mostUsedPromo: "Aviator Freebets",
    bestWindow: "Sep–Nov, 2–3 week tests",
  },
  {
    market: "Mexico",
    flag: "🇲🇽",
    heroGame: "Aviator",
    secondGame: "Mines",
    mostUsedPromo: "Rain Promo Free Bets",
    bestWindow: "October (3–4 wks) + December (2–3 wks)",
  },
];
