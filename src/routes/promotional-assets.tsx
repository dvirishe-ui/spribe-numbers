import { ArrowRight, ClipboardList, ExternalLink, FileText, ImagePlus, Rocket } from "lucide-react";
import { CertificatesPanel } from "@/components/promo/CertificatesPanel";
import { GamesShowcase } from "@/components/promo/GamesShowcase";
import { SlotsShowcase } from "@/components/promo/SlotsShowcase";
import { PROMOTIONAL_ASSET_LINKS } from "@/lib/promotionalAssets";

export function PromotionalAssetsPage() {
  return (
    <main className="mx-auto max-w-[1400px] space-y-5 px-4 py-5 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-xl bg-accent/15 text-accent">
          <ClipboardList className="size-4" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold">Promotional Assets</h1>
          <p className="text-sm text-muted-foreground">The SPRIBE games &amp; slots lineup, reference documents, and partner resources.</p>
        </div>
      </div>

      <GamesShowcase />
      <SlotsShowcase />

      <a
        href="https://drive.google.com/drive/folders/1H5TVQxRTxMqR18zyIzw1DWxIldnCap2k"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 rounded-xl border border-border bg-surface-raised p-3.5 transition-colors hover:border-primary/50"
      >
        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <ImagePlus className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium">Need more marketing assets for the games?</p>
          <p className="text-xs text-muted-foreground">Browse the shared marketing assets folder ↗</p>
        </div>
      </a>

      <section className="panel space-y-4 p-5">
        <div>
          <h2 className="font-display text-lg font-semibold">Reference documents</h2>
          <p className="text-sm text-muted-foreground">Guides shared by the SPRIBE team.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {PROMOTIONAL_ASSET_LINKS.map((doc) => (
            <a
              key={doc.url}
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 rounded-xl border border-border bg-surface-raised p-3.5 transition-colors hover:border-primary/50"
            >
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <FileText className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-medium">
                  {doc.title} <ExternalLink className="size-3 shrink-0 text-muted-foreground" />
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">{doc.type}</p>
                <p className="mt-1 text-xs text-muted-foreground">{doc.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <CertificatesPanel />

      <a
        href="https://broadwayplatform.com/"
        target="_blank"
        rel="noreferrer"
        className="brand-surface flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 transition-colors hover:border-primary/50"
      >
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <Rocket className="size-5" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold">Want to improve your casino?</p>
            <p className="text-sm text-muted-foreground">Check out Broadway Platform.</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
          broadwayplatform.com <ArrowRight className="size-4" />
        </span>
      </a>
    </main>
  );
}
