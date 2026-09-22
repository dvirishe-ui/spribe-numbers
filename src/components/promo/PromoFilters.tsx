import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { COUNTRIES, GAMES, PROMO_STATUSES, PROMO_TYPES, REGIONS } from "@/lib/promos";
import { RotateCcw } from "lucide-react";

export interface FilterState {
  region: string;
  country: string;
  type: string;
  game: string;
  status: string;
}

export const emptyFilters: FilterState = {
  region: "all",
  country: "all",
  type: "all",
  game: "all",
  status: "all",
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
  fullWidth,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "w-full" : "min-w-0 flex-1"}>
      <div className="text-eyebrow mb-1.5">{label}</div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9 w-full border-border bg-surface-raised text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All {label.toLowerCase()}</SelectItem>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function PromoFilters({
  filters,
  onChange,
  layout = "row",
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  /** "row": the original horizontal bar. "column": stacked, for a sidebar. */
  layout?: "row" | "column";
}) {
  const set = (key: keyof FilterState) => (v: string) => onChange({ ...filters, [key]: v });
  const dirty = Object.values(filters).some((v) => v !== "all");

  if (layout === "column") {
    return (
      <div className="panel space-y-3 p-4">
        <p className="text-eyebrow">Filters</p>
        <FilterSelect label="Region" value={filters.region} options={REGIONS} onChange={set("region")} fullWidth />
        <FilterSelect label="Country" value={filters.country} options={COUNTRIES} onChange={set("country")} fullWidth />
        <FilterSelect label="Promo type" value={filters.type} options={PROMO_TYPES} onChange={set("type")} fullWidth />
        <FilterSelect label="Game" value={filters.game} options={GAMES} onChange={set("game")} fullWidth />
        <FilterSelect label="Status" value={filters.status} options={PROMO_STATUSES} onChange={set("status")} fullWidth />
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-muted-foreground hover:text-foreground"
          disabled={!dirty}
          onClick={() => onChange(emptyFilters)}
        >
          <RotateCcw className="mr-1.5 size-3.5" /> Reset
        </Button>
      </div>
    );
  }

  return (
    <div className="panel p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <FilterSelect label="Region" value={filters.region} options={REGIONS} onChange={set("region")} />
        <FilterSelect label="Country" value={filters.country} options={COUNTRIES} onChange={set("country")} />
        <FilterSelect label="Promo type" value={filters.type} options={PROMO_TYPES} onChange={set("type")} />
        <FilterSelect label="Game" value={filters.game} options={GAMES} onChange={set("game")} />
        <FilterSelect label="Status" value={filters.status} options={PROMO_STATUSES} onChange={set("status")} />
        <Button
          variant="ghost"
          size="sm"
          className="h-9 shrink-0 text-muted-foreground hover:text-foreground"
          disabled={!dirty}
          onClick={() => onChange(emptyFilters)}
        >
          <RotateCcw className="mr-1.5 size-3.5" /> Reset
        </Button>
      </div>
    </div>
  );
}
