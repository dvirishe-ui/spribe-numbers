const compactNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const plainNumber = new Intl.NumberFormat("en-US");

export function formatCompact(value: number): string {
  return compactNumber.format(value);
}

export function formatInt(value: number): string {
  return plainNumber.format(Math.round(value));
}

export function formatMoney(value: number): string {
  const sign = value < 0 ? "-" : "";
  return `${sign}€${compactNumber.format(Math.abs(value))}`;
}

export function formatPct(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}

export function formatSignedPct(value: number, digits = 1): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

export function pctChange(from: number, to: number): number {
  if (from === 0) return to === 0 ? 0 : 100;
  return ((to - from) / from) * 100;
}
