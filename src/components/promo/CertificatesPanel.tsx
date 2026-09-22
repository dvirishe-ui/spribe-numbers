import { useState } from "react";
import { Award, ChevronDown, Mail, ScrollText, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CERTIFICATES, type CertificateItem } from "@/lib/certificates";

const AM_EMAIL = "mkoridze@spribe.co";
const AM_NAME = "Mariam Koridze";

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

interface CertRequest {
  item: CertificateItem;
  jurisdiction: string;
}

function CertRequestDialog({ request, onClose }: { request: CertRequest | null; onClose: () => void }) {
  const [casinoName, setCasinoName] = useState("");
  const [country, setCountry] = useState("");
  const [reason, setReason] = useState("");

  const reset = () => {
    setCasinoName("");
    setCountry("");
    setReason("");
  };

  const mailtoHref = request
    ? `mailto:${AM_EMAIL}?subject=${encodeURIComponent(
        `Certificate request: ${request.item.type} (${request.jurisdiction})`,
      )}&body=${encodeURIComponent(
        `Casino name: ${casinoName || "—"}\nCountry: ${country || "—"}\nLicense country: ${request.jurisdiction}\nCertificate/License: ${request.item.type}\n\nWhy do you need it:\n${reason || "—"}`,
      )}`
    : undefined;

  const handleSend = () => {
    toast.info("Opening your email client…", {
      description: `Addressed to ${AM_NAME} (${AM_EMAIL}) — hit send once it opens.`,
    });
    reset();
    onClose();
  };

  return (
    <Dialog
      open={!!request}
      onOpenChange={(o) => {
        if (!o) {
          reset();
          onClose();
        }
      }}
    >
      {request && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request a copy</DialogTitle>
            <DialogDescription>
              {request.item.type} — {request.jurisdiction}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="rounded-md border border-border bg-surface-raised/60 px-3 py-2 text-xs text-muted-foreground">
              This document isn't available to open here. Fill this in and it goes straight to your Account
              Manager, {AM_NAME} ({AM_EMAIL}).
            </p>

            <Field label="Casino name" htmlFor="cert-casino">
              <input
                id="cert-casino"
                className={inputClass}
                value={casinoName}
                onChange={(e) => setCasinoName(e.target.value)}
                placeholder="e.g. BetGalaxy BR"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Country" htmlFor="cert-country">
                <input
                  id="cert-country"
                  className={inputClass}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Where you operate"
                />
              </Field>
              <Field label="License country" htmlFor="cert-license-country">
                <input id="cert-license-country" className={inputClass} value={request.jurisdiction} disabled readOnly />
              </Field>
            </div>

            <Field label="Why do you need it?" htmlFor="cert-reason">
              <textarea
                id="cert-reason"
                rows={3}
                className={`${inputClass} resize-none`}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Needed for our regulator submission in this market."
              />
            </Field>

            <Button className="w-full" asChild onClick={handleSend}>
              <a href={mailtoHref} target="_blank" rel="noreferrer">
                <Mail className="mr-1.5 size-4" /> Send to Account Manager
              </a>
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

function CertChip({
  item,
  tone,
  onRequest,
}: {
  item: CertificateItem;
  tone: "certificate" | "license";
  onRequest: (item: CertificateItem) => void;
}) {
  return (
    <button
      onClick={() => onRequest(item)}
      title={item.file}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
        tone === "certificate"
          ? "border-primary/25 bg-primary/8 text-foreground hover:border-primary/60 hover:bg-primary/15 hover:text-primary"
          : "border-accent/25 bg-accent/8 text-foreground hover:border-accent/60 hover:bg-accent/15 hover:text-accent"
      }`}
    >
      {item.type}
    </button>
  );
}

function JurisdictionCard({
  jurisdiction,
  flag,
  certificates,
  licenses,
  onRequest,
}: {
  jurisdiction: string;
  flag: string;
  certificates: CertificateItem[];
  licenses: CertificateItem[];
  onRequest: (jurisdiction: string, item: CertificateItem) => void;
}) {
  const [open, setOpen] = useState(false);
  const total = certificates.length + licenses.length;

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-surface-raised transition-colors ${
        open ? "border-primary/40" : "border-border"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={total === 0}
        className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left disabled:cursor-default"
      >
        <span className="flex items-center gap-2.5 text-sm font-medium">
          <span className="text-lg leading-none">{flag}</span> {jurisdiction}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              total === 0
                ? "bg-surface text-muted-foreground"
                : "bg-primary/15 text-primary"
            }`}
          >
            {total === 0 ? "None found" : total}
          </span>
          {total > 0 && (
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
            />
          )}
        </span>
      </button>
      {open && total > 0 && (
        <div className="space-y-3 border-t border-border bg-surface/60 px-3.5 py-3">
          {certificates.length > 0 && (
            <div>
              <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-primary">
                <Award className="size-3" /> Certificates
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {certificates.map((c) => (
                  <CertChip key={c.type} item={c} tone="certificate" onRequest={(item) => onRequest(jurisdiction, item)} />
                ))}
              </div>
            </div>
          )}
          {licenses.length > 0 && (
            <div>
              <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-accent">
                <ScrollText className="size-3" /> Licenses
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {licenses.map((l) => (
                  <CertChip key={l.type} item={l} tone="license" onRequest={(item) => onRequest(jurisdiction, item)} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function CertificatesPanel() {
  const [request, setRequest] = useState<CertRequest | null>(null);

  return (
    <section className="panel space-y-4 p-5">
      <div className="flex items-start gap-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <ShieldCheck className="size-4" />
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold">Certificates &amp; licenses</h2>
          <p className="mt-0.5 max-w-3xl text-xs text-muted-foreground">
            What Spribe holds per jurisdiction. These are internal documents — click one to request a copy from
            your Account Manager.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {CERTIFICATES.map((j) => (
          <JurisdictionCard
            key={j.jurisdiction}
            jurisdiction={j.jurisdiction}
            flag={j.flag}
            certificates={j.certificates}
            licenses={j.licenses}
            onRequest={(jurisdiction, item) => setRequest({ jurisdiction, item })}
          />
        ))}
      </div>

      <CertRequestDialog request={request} onClose={() => setRequest(null)} />
    </section>
  );
}
