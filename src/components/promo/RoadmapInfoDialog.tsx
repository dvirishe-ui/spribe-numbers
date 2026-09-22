import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ROADMAP_FORMATS, ROADMAP_INTRO, ROADMAP_PLANNING_RULES, ROADMAP_SCOPE_OPTIONS } from "@/lib/promos";

export function RoadmapInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="shrink-0">
          <Info className="mr-1.5 size-3.5" /> More info
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>2027 Promotional Roadmap</DialogTitle>
          <DialogDescription>{ROADMAP_INTRO}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Format</th>
                  <th className="py-2 pr-4 font-medium">Frequency</th>
                  <th className="py-2 pr-4 font-medium">Mechanic</th>
                  <th className="py-2 pr-4 font-medium">Games</th>
                  <th className="py-2 pr-4 font-medium">Duration</th>
                  <th className="py-2 pr-4 font-medium">Prize pool</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ROADMAP_FORMATS.map((f) => (
                  <tr key={f.format}>
                    <td className="py-2.5 pr-4 font-medium">{f.format}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{f.frequency}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{f.mechanic}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{f.games}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{f.duration}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{f.prizePool}</td>
                    <td className="py-2.5">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                          f.status === "Confirmed format"
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : f.status === "Flexible format"
                              ? "border-accent/40 bg-accent/10 text-accent"
                              : "border-border bg-surface-raised text-muted-foreground"
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <p className="text-eyebrow mb-2">Scope options for Seasonal &amp; Event slots</p>
              <div className="space-y-2">
                {ROADMAP_SCOPE_OPTIONS.map((s) => (
                  <div key={s.scope} className="rounded-lg bg-surface-raised px-3 py-2 text-sm">
                    <p className="font-medium">{s.scope}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.whenToUse}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className="text-foreground">Overlap rule:</span> {s.overlapRule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-eyebrow mb-2">Planning rules</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {ROADMAP_PLANNING_RULES.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="text-primary">—</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="rounded-lg border border-border bg-surface-raised/60 px-3 py-2 text-xs text-muted-foreground">
            Working draft — full terms are published once each edition is confirmed.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
