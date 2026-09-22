import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  GENERAL_CAMPAIGN_TERMS,
  durationDays,
  formatDate,
  getPromoStatus,
  typeColorVar,
  type Promo,
} from "@/lib/promos";
import { useParticipation } from "@/lib/participation";
import { StatusBadge, TYPE_ICON, TypeBadge } from "./PromoBadges";
import { PromoBanner } from "./PromoBanner";
import { ParticipationStatusBadge, ParticipationStepper, RequestParticipationButton, TalkToAMButton } from "./ParticipationFlow";
import { BellPlus, ChevronDown, ClipboardList, Download, FileText, Trophy, Users } from "lucide-react";

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2 text-sm last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function DailyMissionRow({ mission }: { mission: { day: number; games: string[]; tasks: string[] } }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm"
      >
        <span className="font-medium">Day {mission.day}</span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border px-3 py-2.5">
          <p className="text-xs font-medium text-foreground">{mission.games.join(", ")}</p>
          <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
            {mission.tasks.map((t) => (
              <li key={t}>— {t}</li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export function PromoDetail({ promo }: { promo: Promo }) {
  const color = typeColorVar[promo.type];
  const Icon = TYPE_ICON[promo.type];
  const status = getPromoStatus(promo);
  const { statusFor } = useParticipation();
  const participation = statusFor(promo.id);
  const [subscribed, setSubscribed] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <div className="space-y-6 pb-10">
      <header className="space-y-4">
        <div className="overflow-hidden rounded-2xl border border-border">
          <PromoBanner promo={promo} className="aspect-[2/1] w-full" />
        </div>
        <div
          className="brand-surface flex flex-col gap-4 rounded-2xl p-5"
          style={{
            backgroundImage: `linear-gradient(135deg, color-mix(in oklch, ${color} 18%, transparent), transparent 60%)`,
          }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={promo.type} />
            <StatusBadge status={status} />
            <ParticipationStatusBadge status={participation} />
          </div>
          <div className="flex items-start gap-3">
            <div
              className="grid size-11 shrink-0 place-items-center rounded-xl"
              style={{ backgroundColor: `color-mix(in oklch, ${color} 20%, transparent)`, color }}
            >
              <Icon className="size-5" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold sm:text-3xl" style={{ color }}>
                {promo.name}
              </h1>
              {promo.tagline && (
                <p className="mt-0.5 text-sm font-medium text-primary">{promo.tagline}</p>
              )}
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">{promo.summary}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <RequestParticipationButton promo={promo} />
          <TalkToAMButton promo={promo} />
          <Button
            variant={subscribed ? "secondary" : "outline"}
            onClick={() => {
              setSubscribed(true);
              toast.success("Subscribed to the SPRIBE Promo Calendar feed", {
                description: "New campaigns will appear automatically in your connected calendar.",
              });
            }}
          >
            <BellPlus className="mr-1.5 size-4" /> {subscribed ? "Subscribed" : "Subscribe to SPRIBE Calendar"}
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-surface-raised/60 px-4 py-3">
          <p className="mb-2 text-[11px] font-medium text-muted-foreground">Your participation status</p>
          <ParticipationStepper status={participation} />
        </div>
      </header>

      <Separator />

      <div className="grid gap-7 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          {promo.dailyMissions && (
            <section className="space-y-3">
              <h3 className="text-eyebrow text-primary">Daily missions</h3>
              <div className="overflow-hidden rounded-lg bg-surface-raised">
                <ul className="divide-y divide-border">
                  {promo.dailyMissions.map((d) => (
                    <DailyMissionRow key={d.day} mission={d} />
                  ))}
                </ul>
              </div>
            </section>
          )}

          <section className="space-y-3">
            <h3 className="text-eyebrow text-primary">Prizes</h3>
            <div className="overflow-hidden rounded-lg bg-surface-raised">
              <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                <span>Tier</span>
                <span>Prize</span>
              </div>
              <ul className="divide-y divide-border">
                {promo.prizeDistribution.map((p) => (
                  <li key={p.place} className="flex items-center justify-between px-3 py-2 text-sm">
                    <span className="text-muted-foreground">{p.place}</span>
                    <span className="font-medium">{p.prize}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-muted-foreground">
              {promo.tieBreak} · {promo.creditingTiming}
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-eyebrow text-primary">Marketing assets</h3>
            <ul className="space-y-2">
              {promo.assets.map((a) => {
                const isBannerRow = /banner/i.test(a.label);
                return (
                  <li
                    key={a.label}
                    className="flex items-center justify-between gap-3 rounded-lg bg-surface-raised px-3 py-2"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      {isBannerRow && (
                        <PromoBanner promo={promo} compact className="h-10 w-16 shrink-0 rounded" />
                      )}
                      <span>
                        {a.label}
                        <span className="block text-[11px] text-muted-foreground">{a.detail}</span>
                      </span>
                    </span>
                    <Button size="sm" variant="ghost" onClick={() => toast.info(`${a.label} download started`)}>
                      <Download className="size-4" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <aside className="panel h-fit space-y-1 p-4">
          <h3 className="text-eyebrow mb-2 text-primary">Promotion details</h3>
          <InfoRow label="Status" value={<StatusBadge status={status} />} />
          <InfoRow
            label="Starts"
            value={promo.datesIndicative ? `${formatDate(promo.start)} (indicative)` : formatDate(promo.start)}
          />
          <InfoRow
            label="Ends"
            value={promo.datesIndicative ? `${formatDate(promo.end)} (indicative)` : formatDate(promo.end)}
          />
          <InfoRow label="Duration" value={`${durationDays(promo)} days`} />
          <InfoRow
            label="Opt-in deadline"
            value={promo.datesIndicative ? "TBD" : <span className="text-accent">{formatDate(promo.optInDeadline)}</span>}
          />
          <InfoRow label="Games" value={promo.games.join(", ")} />
          <InfoRow label="Mechanic" value={promo.scoringFormula} />
          <InfoRow label="Prize pool" value={promo.prizePool} />
          <InfoRow label="Reward" value={promo.funding} />
          <InfoRow label="Region" value={promo.region} />
          {promo.countries.length > 0 && !promo.countries.includes("Global") && (
            <InfoRow label="Countries" value={promo.countries.join(", ")} />
          )}
          <InfoRow label="Account Manager" value={promo.manager.name} />
        </aside>
      </div>

      <Separator />

      <section className="space-y-3">
        <h3 className="text-eyebrow text-primary">Terms &amp; Conditions</h3>
        <div className="rounded-lg bg-surface-raised px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              General campaign terms plus this campaign's own conditions.
            </p>
            <Button size="sm" variant="secondary" onClick={() => setTermsOpen((o) => !o)}>
              <FileText className="mr-1.5 size-4" /> {termsOpen ? "Hide" : "View"}
            </Button>
          </div>
          {termsOpen && (
            <div className="mt-3 max-h-96 space-y-4 overflow-y-auto rounded-lg border border-border bg-surface p-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  General Campaign Terms
                </p>
                <ol className="list-decimal space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:font-medium marker:text-primary">
                  {GENERAL_CAMPAIGN_TERMS.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              </div>
              {promo.campaignTerms && (
                <div className="border-t border-border pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {promo.name} — Campaign Terms
                  </p>
                  <ol className="list-decimal space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:font-medium marker:text-primary">
                    {promo.campaignTerms.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <TalkToAMButton
            promo={promo}
            subject={`Terms & Conditions question — ${promo.name}`}
            variant="ghost"
            size="sm"
            label="Question about the Terms and Conditions? Talk to AM"
          />
        </div>
      </section>

      <Separator />

      <section className="space-y-3">
        <h3 className="text-eyebrow text-primary">Your account manager</h3>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-surface-raised px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary">
              <Users className="size-4" />
            </div>
            <div>
              <p className="font-medium">{promo.manager.name}</p>
              <p className="text-xs text-muted-foreground">{promo.manager.role}</p>
            </div>
          </div>
          <TalkToAMButton promo={promo} label="Contact" />
        </div>
      </section>

      {promo.planningStage && (
        <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent/20 text-accent">
            <ClipboardList className="size-4" />
          </div>
          <div className="text-sm">
            <p className="font-medium">
              {promo.planningStage === "confirmed"
                ? "Roadmap slot — format confirmed"
                : promo.planningStage === "flexible"
                  ? "Roadmap slot — flexible"
                  : "Event-linked slot — window confirmed"}
            </p>
            <p className="mt-0.5 text-muted-foreground">
              Your Account Manager will share full terms once this edition is confirmed.
            </p>
          </div>
        </div>
      )}

      {status === "Completed" && (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-muted-foreground">
          <Trophy className="size-4 text-primary" /> This campaign has ended — final standings and
          the performance report are available in Marketing assets above.
        </div>
      )}
    </div>
  );
}
