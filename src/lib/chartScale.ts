/** Rounds a raw axis max up to a "nice" number (1/2/5 x 10^n) so ticks land on clean values. */
export function niceMax(rawMax: number): number {
  if (rawMax <= 0) return 1;
  const exponent = Math.floor(Math.log10(rawMax));
  const magnitude = 10 ** exponent;
  const fraction = rawMax / magnitude;
  const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return niceFraction * magnitude;
}

/** Evenly spaced ticks from 0 to `max` (inclusive), count is a target, not a guarantee. */
export function ticksFor(max: number, count = 4): number[] {
  const step = max / count;
  return Array.from({ length: count + 1 }, (_, i) => i * step);
}
