import { ArrowRight } from "lucide-react";
import {
  formatDate,
  getPromoStatus,
  parseDate,
  typeColorVar,
  type Promo,
} from "@/lib/promos";
import { StatusBadge, TYPE_ICON, TypeBadge } from "./PromoBadges";
import { PromoBanner } from "./PromoBanner";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startOfWeek(date: Date) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, n: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function isInPromo(promo: Promo, day: Date) {
  const t = new Date(day).setHours(12, 0, 0, 0);
  return t >= parseDate(promo.start).getTime() && t <= parseDate(promo.end).setHours(23, 59, 59, 0);
}

function PromoChip({
  promo,
  day,
  onSelect,
  compact = false,
}: {
  promo: Promo;
  day: Date;
  onSelect: (p: Promo) => void;
  compact?: boolean;
}) {
  const color = typeColorVar[promo.type];
  const Icon = TYPE_ICON[promo.type];
  const isStart = sameDay(day, parseDate(promo.start));
  const isRoadmap = Boolean(promo.planningStage);
  return (
    <button
      onClick={() => onSelect(promo)}
      className={`group w-full rounded-md border px-1.5 py-1 text-left transition-colors hover:brightness-125 ${
        isRoadmap ? "border-dashed" : ""
      }`}
      style={{
        borderColor: `color-mix(in oklch, ${color} 40%, transparent)`,
        backgroundColor: `color-mix(in oklch, ${color} ${isRoadmap ? 8 : 16}%, transparent)`,
        borderLeftWidth: isStart ? 3 : 1,
      }}
      title={`${promo.name} · ${promo.type}${
        promo.planningStage === "scheduled"
          ? " · Event-linked slot, specifics TBD"
          : isRoadmap
            ? " · Roadmap slot, dates indicative"
            : ""
      }`}
    >
      <span className="flex items-center gap-1 truncate text-[11px] font-medium leading-tight" style={{ color }}>
        <Icon className="size-2.5 shrink-0" />
        <span className="truncate">{promo.name}</span>
      </span>
      {!compact && (
        <span className="block truncate text-[10px] text-muted-foreground">
          {promo.planningStage === "scheduled"
            ? "Event-linked · specifics TBD"
            : isRoadmap
              ? "Planned · dates indicative"
              : promo.prizePool}
        </span>
      )}
    </button>
  );
}

export function MonthView({
  month,
  promos,
  onSelect,
}: {
  month: Date;
  promos: Promo[];
  onSelect: (p: Promo) => void;
}) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const gridStart = startOfWeek(first);
  const days = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  const today = new Date();

  return (
    <div className="panel overflow-hidden">
      <div className="grid grid-cols-7 border-b border-border bg-surface-raised">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-eyebrow px-2 py-2 text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const dayPromos = promos.filter((p) => isInPromo(p, day));
          const inMonth = day.getMonth() === month.getMonth();
          return (
            <div
              key={i}
              className={`min-h-[104px] space-y-1 border-b border-r border-border p-1.5 ${
                inMonth ? "" : "opacity-40"
              } ${sameDay(day, today) ? "bg-primary/5" : ""}`}
            >
              <div className="mb-1 flex items-center justify-between px-0.5">
                <span
                  className={`text-xs font-semibold ${
                    sameDay(day, today) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {day.getDate()}
                </span>
                {dayPromos.length > 1 && (
                  <span className="text-[10px] text-muted-foreground">+{dayPromos.length - 1}</span>
                )}
              </div>
              {dayPromos.slice(0, 1).map((p) => (
                <PromoChip key={p.id} promo={p} day={day} onSelect={onSelect} compact />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WeekView({
  anchor,
  promos,
  onSelect,
}: {
  anchor: Date;
  promos: Promo[];
  onSelect: (p: Promo) => void;
}) {
  const start = startOfWeek(anchor);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const today = new Date();

  return (
    <div className="panel grid grid-cols-1 overflow-hidden md:grid-cols-7">
      {days.map((day, i) => {
        const dayPromos = promos.filter((p) => isInPromo(p, day));
        return (
          <div key={i} className="min-h-[300px] border-b border-r border-border p-2">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-eyebrow">{WEEKDAYS[i]}</span>
              <span
                className={`font-display text-lg font-semibold ${
                  sameDay(day, today) ? "text-primary" : "text-foreground"
                }`}
              >
                {day.getDate()}
              </span>
            </div>
            <div className="space-y-1.5">
              {dayPromos.length === 0 && (
                <p className="px-0.5 text-[11px] text-muted-foreground">No promotions</p>
              )}
              {dayPromos.slice(0, 1).map((p) => (
                <div key={p.id} className="space-y-1">
                  <PromoChip promo={p} day={day} onSelect={onSelect} />
                  <div className="px-0.5">
                    <StatusBadge status={getPromoStatus(p)} />
                  </div>
                </div>
              ))}
              {dayPromos.length > 1 && (
                <p className="px-0.5 text-[10px] text-muted-foreground">
                  +{dayPromos.length - 1} more
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ListView({
  promos,
  onSelect,
}: {
  promos: Promo[];
  onSelect: (p: Promo) => void;
}) {
  const sorted = [...promos].sort(
    (a, b) => parseDate(a.start).getTime() - parseDate(b.start).getTime(),
  );

  if (sorted.length === 0) {
    return (
      <div className="panel p-8 text-center text-sm text-muted-foreground">
        No promotions match the current filters.
      </div>
    );
  }

  return (
    <div className="panel divide-y divide-border overflow-hidden">
      {sorted.map((p) => {
        const color = typeColorVar[p.type];
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className="flex w-full flex-col gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-raised sm:flex-row sm:items-center sm:justify-between"
            style={{ borderLeft: `3px solid color-mix(in oklch, ${color} 55%, transparent)` }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <PromoBanner promo={p} compact className="h-10 w-16 shrink-0 rounded-lg" />
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold">{p.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <TypeBadge type={p.type} />
                  <span className="text-xs text-muted-foreground">{p.region}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 pl-12 sm:pl-0">
              <div className="text-xs text-muted-foreground">
                {p.datesIndicative
                  ? `${formatDate(p.start)} → ${formatDate(p.end)} (indicative)`
                  : `${formatDate(p.start)} → ${formatDate(p.end)}`}
              </div>
              <span className="font-medium text-sm">{p.prizePool}</span>
              {p.planningStage ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                  {p.planningStage === "scheduled" ? "Event window" : "Roadmap slot"}
                </span>
              ) : (
                <StatusBadge status={getPromoStatus(p)} />
              )}
              <ArrowRight className="size-4 text-muted-foreground" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
