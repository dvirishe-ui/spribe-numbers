import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListView, MonthView, WeekView } from "@/components/promo/CalendarViews";
import { PromoFilters, emptyFilters, type FilterState } from "@/components/promo/PromoFilters";
import { PromoDetail } from "@/components/promo/PromoDetail";
import { AddPromotionDialog } from "@/components/promo/AddPromotionDialog";
import { RoadmapInfoDialog } from "@/components/promo/RoadmapInfoDialog";
import { useParticipation } from "@/lib/participation";
import { loadCustomPromos } from "@/lib/customPromos";
import {
  ROADMAP_FORMATS,
  ROADMAP_INTRO,
  formatDate,
  getPromoStatus,
  promos as builtInPromos,
  type Promo,
} from "@/lib/promos";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Globe2,
  Radio,
} from "lucide-react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Radio;
  label: string;
  value: string | number;
  hint: string;
}) {
  return (
    <div className="panel p-3.5">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-primary" />
        <span className="text-eyebrow">{label}</span>
      </div>
      <p className="mt-1.5 font-display text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

export function PromoHub() {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  // Defaults to List so everything that's happening is visible on load,
  // without having to navigate months to find where the content is.
  const [view, setView] = useState<"month" | "week" | "list">("list");
  const [cursor, setCursor] = useState(() => new Date(2026, 8, 17));
  const [selected, setSelected] = useState<Promo | null>(null);
  const [customPromos, setCustomPromos] = useState<Promo[]>(() => loadCustomPromos());
  const { statusFor } = useParticipation();

  // Roadmap ("recurring format, dates TBD") and event-linked ("dates real,
  // everything else TBD") slots are reference material, not real bookable
  // campaigns — they were crowding out the actual promotions in the
  // calendar, so they're summarized in their own panels below instead and
  // left out of the main calendar and stat counts entirely.
  const allPromos = useMemo(
    () => [...builtInPromos.filter((p) => !p.planningStage), ...customPromos],
    [customPromos],
  );

  const filtered = useMemo(
    () =>
      allPromos.filter(
        (p) =>
          (filters.region === "all" || p.region === filters.region) &&
          (filters.country === "all" || p.countries.includes(filters.country)) &&
          (filters.type === "all" || p.type === filters.type) &&
          (filters.game === "all" || p.games.includes(filters.game)) &&
          (filters.status === "all" || getPromoStatus(p) === filters.status),
      ),
    [allPromos, filters],
  );

  const stats = useMemo(() => {
    const live = filtered.filter((p) => {
      const s = getPromoStatus(p);
      return s === "Live" || s === "Ending Soon";
    });
    const upcoming = filtered.filter((p) => {
      const s = getPromoStatus(p);
      return s === "Upcoming" || s === "Registration Open";
    });
    const requests = filtered.filter((p) => {
      const s = statusFor(p.id);
      return s === "Request Sent" || s === "Under Review";
    });
    const confirmed = filtered.filter((p) => statusFor(p.id) === "Confirmed");
    const regions = new Set(filtered.map((p) => p.region));
    return {
      live: live.length,
      upcoming: upcoming.length,
      requests: requests.length,
      confirmed: confirmed.length,
      regions: regions.size,
    };
  }, [filtered, statusFor]);

  const shift = (dir: number) => {
    const d = new Date(cursor);
    if (view === "month") d.setMonth(d.getMonth() + dir);
    else d.setDate(d.getDate() + dir * 7);
    setCursor(d);
  };

  return (
    <>
      <main className="mx-auto max-w-[1400px] space-y-4 px-4 py-5 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              <span className="brand-gradient-text">Promo Calendar</span>
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
              What's live, what's next, and what needs your action.
            </p>
          </div>
          <AddPromotionDialog
            existingPromos={allPromos}
            onCreated={(promo) => {
              setCustomPromos((prev) => [...prev, promo]);
              setSelected(promo);
            }}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[260px_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-20">
            <PromoFilters filters={filters} onChange={setFilters} layout="column" />
          </aside>

          <div className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {view !== "list" && (
                  <>
                    <Button variant="outline" size="icon" className="size-9" onClick={() => shift(-1)}>
                      <ChevronLeft className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="size-9" onClick={() => shift(1)}>
                      <ChevronRight className="size-4" />
                    </Button>
                  </>
                )}
                <h2 className="ml-1 font-display text-xl font-semibold">
                  {view === "month"
                    ? `${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`
                    : view === "week"
                      ? `Week of ${formatDate(
                          `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(
                            cursor.getDate(),
                          ).padStart(2, "0")}`,
                        )}`
                      : "All promotions"}
                </h2>
                <span className="text-xs text-muted-foreground">{filtered.length} promotions shown</span>
              </div>
              <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week" | "list")}>
                <TabsList>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {view === "month" && <MonthView month={cursor} promos={filtered} onSelect={setSelected} />}
            {view === "week" && <WeekView anchor={cursor} promos={filtered} onSelect={setSelected} />}
            {view === "list" && <ListView promos={filtered} onSelect={setSelected} />}

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
              <StatCard icon={Radio} label="Live now" value={stats.live} hint="Running promotions" />
              <StatCard icon={CalendarClock} label="Upcoming" value={stats.upcoming} hint="Opening or announced" />
              <StatCard
                icon={ClipboardList}
                label="Participation requests"
                value={stats.requests}
                hint="Sent / under review"
              />
              <StatCard icon={CheckCircle2} label="Confirmed campaigns" value={stats.confirmed} hint="You're in" />
              <StatCard icon={Globe2} label="Active regions" value={stats.regions} hint="In current filter" />
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-border bg-surface-raised px-5 py-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <ClipboardList className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-semibold">2027 Promotional Roadmap</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{ROADMAP_INTRO}</p>
              </div>
              <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                {ROADMAP_FORMATS.length} formats
              </span>
              <RoadmapInfoDialog />
            </div>
          </div>
        </div>
      </main>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto border-border bg-surface sm:max-w-2xl">
          <SheetTitle className="sr-only">{selected?.name ?? "Promotion"}</SheetTitle>
          {selected && (
            <div className="px-5 pt-4">
              <PromoDetail promo={selected} />
              <div className="pb-8">
                <Button variant="ghost" asChild>
                  <Link to="/promo/$promoId" params={{ promoId: selected.id }}>
                    Open full promotion page <ArrowRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
