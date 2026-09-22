import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROMO_TYPES, type Funding, type Promo, type PromoType } from "@/lib/promos";
import { addCustomPromo, buildCustomPromo, findOverlappingPromo } from "@/lib/customPromos";

const FUNDING_OPTIONS: Funding[] = ["Operator funded", "Shared funding", "TBD"];

const inputClass =
  "w-full rounded-md border border-border bg-surface-raised px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-eyebrow">
        {label}
      </label>
      {children}
    </div>
  );
}

export function AddPromotionDialog({
  existingPromos,
  onCreated,
}: {
  existingPromos: Promo[];
  onCreated: (promo: Promo) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<PromoType>("Network Tournament");
  const [region, setRegion] = useState("");
  const [countries, setCountries] = useState("");
  const [games, setGames] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [funding, setFunding] = useState<Funding>("TBD");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setType("Network Tournament");
    setRegion("");
    setCountries("");
    setGames("");
    setStart("");
    setEnd("");
    setPrizePool("");
    setFunding("TBD");
    setSummary("");
    setError("");
  };

  const submit = () => {
    if (!name.trim() || !region.trim() || !start || !end) {
      setError("Name, region, start date and end date are required.");
      return;
    }
    if (end < start) {
      setError("End date can't be before the start date.");
      return;
    }
    const clash = findOverlappingPromo(start, end, existingPromos);
    if (clash) {
      setError(
        `That overlaps with "${clash.name}" (${clash.start} → ${clash.end}). Only one promotion per day is allowed — pick a different window.`,
      );
      return;
    }
    const promo = buildCustomPromo({
      name: name.trim(),
      type,
      region: region.trim(),
      countries: countries
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      games: games
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      start,
      end,
      prizePool: prizePool.trim(),
      funding,
      summary: summary.trim(),
    });
    addCustomPromo(promo);
    onCreated(promo);
    toast.success(`${promo.name} added to the calendar`, {
      description: "Fill in the remaining details from its promotion page any time.",
    });
    setOpen(false);
    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-1.5 size-4" /> Add Promotion
      </Button>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a promotion</DialogTitle>
          <DialogDescription>
            Publish a new campaign to the calendar. Anything left blank shows as TBD until you fill
            it in from the promotion page.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Field label="Name *" htmlFor="promo-name">
            <input
              id="promo-name"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aviator Summer Sprint"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Promo type" htmlFor="promo-type">
              <Select value={type} onValueChange={(v) => setType(v as PromoType)}>
                <SelectTrigger id="promo-type" className="border-border bg-surface-raised text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROMO_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Funding model" htmlFor="promo-funding">
              <Select value={funding} onValueChange={(v) => setFunding(v as Funding)}>
                <SelectTrigger id="promo-funding" className="border-border bg-surface-raised text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FUNDING_OPTIONS.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Starts *" htmlFor="promo-start">
              <input
                id="promo-start"
                type="date"
                className={inputClass}
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </Field>
            <Field label="Ends *" htmlFor="promo-end">
              <input
                id="promo-end"
                type="date"
                className={inputClass}
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Region *" htmlFor="promo-region">
              <input
                id="promo-region"
                className={inputClass}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. LATAM"
              />
            </Field>
            <Field label="Prize pool" htmlFor="promo-prize">
              <input
                id="promo-prize"
                className={inputClass}
                value={prizePool}
                onChange={(e) => setPrizePool(e.target.value)}
                placeholder="e.g. $50,000"
              />
            </Field>
          </div>

          <Field label="Countries (comma-separated)" htmlFor="promo-countries">
            <input
              id="promo-countries"
              className={inputClass}
              value={countries}
              onChange={(e) => setCountries(e.target.value)}
              placeholder="e.g. Brazil, Mexico, Peru"
            />
          </Field>

          <Field label="Games (comma-separated)" htmlFor="promo-games">
            <input
              id="promo-games"
              className={inputClass}
              value={games}
              onChange={(e) => setGames(e.target.value)}
              placeholder="e.g. Aviator, Mines"
            />
          </Field>

          <Field label="Summary" htmlFor="promo-summary">
            <textarea
              id="promo-summary"
              rows={3}
              className={`${inputClass} resize-none`}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="One or two sentences describing the campaign."
            />
          </Field>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button className="w-full" onClick={submit}>
            <Plus className="mr-1.5 size-4" /> Add to calendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
