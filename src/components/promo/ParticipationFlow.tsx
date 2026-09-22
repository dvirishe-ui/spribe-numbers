import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParticipation } from "@/lib/participation";
import { participationColorVar, type ParticipationStatus, type Promo } from "@/lib/promos";
import { Check, Mail, MessageCircleQuestion, ShieldCheck } from "lucide-react";

export function ParticipationStatusBadge({
  status,
  className = "",
}: {
  status: ParticipationStatus;
  className?: string;
}) {
  const color = participationColorVar[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${className}`}
      style={{
        color,
        borderColor: `color-mix(in oklch, ${color} 45%, transparent)`,
        backgroundColor: `color-mix(in oklch, ${color} 14%, transparent)`,
      }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
      {status}
    </span>
  );
}

const STEPS: ParticipationStatus[] = ["Not Requested", "Request Sent", "Under Review", "Confirmed"];

export function ParticipationStepper({ status }: { status: ParticipationStatus }) {
  const activeIndex = STEPS.indexOf(status);
  return (
    <div className="flex items-center gap-1.5">
      {STEPS.map((step, i) => {
        const reached = i <= activeIndex;
        const color = participationColorVar[step];
        return (
          <div key={step} className="flex flex-1 items-center gap-1.5">
            <div className="flex flex-col items-center gap-1">
              <div
                className="grid size-6 place-items-center rounded-full border text-[10px] font-semibold transition-colors"
                style={{
                  borderColor: reached ? color : "var(--color-border)",
                  backgroundColor: reached ? `color-mix(in oklch, ${color} 22%, transparent)` : "transparent",
                  color: reached ? color : "var(--color-muted-foreground)",
                }}
              >
                {reached ? <Check className="size-3" /> : i + 1}
              </div>
              <span
                className="max-w-[72px] text-center text-[10px] leading-tight"
                style={{ color: reached ? color : "var(--color-muted-foreground)" }}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="h-px flex-1"
                style={{
                  backgroundColor: i < activeIndex ? participationColorVar[STEPS[i + 1]!] : "var(--color-border)",
                  opacity: i < activeIndex ? 0.6 : 1,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Reusable "Talk to Account Manager" contact panel. Not tied to the participation flow — usable anywhere on the site. */
export function TalkToAMButton({
  promo,
  subject,
  variant = "outline",
  size = "default",
  label = "Talk to Account Manager",
  className,
}: {
  promo?: Promo;
  subject?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const manager = promo?.manager ?? {
    name: "SPRIBE Partner Support",
    role: "Partner Account Management",
    email: "partners@spribe-partners.example",
  };
  const effectiveSubject = subject ?? (promo ? `Question about ${promo.name}` : "General inquiry");

  const send = () => {
    toast.success("Message sent to your Account Manager", {
      description: `${manager.name} will follow up by email shortly.`,
    });
    setMessage("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        <MessageCircleQuestion className="mr-1.5 size-4" /> {label}
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Talk to your Account Manager</DialogTitle>
          <DialogDescription>{effectiveSubject}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-lg bg-surface-raised px-3 py-2.5">
            <div>
              <p className="text-sm font-medium">{manager.name}</p>
              <p className="text-xs text-muted-foreground">{manager.role}</p>
            </div>
            <a
              href={`mailto:${manager.email}`}
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <Mail className="size-3.5" /> {manager.email}
            </a>
          </div>
          <div className="space-y-1.5">
            <label className="text-eyebrow" htmlFor="am-message">
              Message (optional)
            </label>
            <textarea
              id="am-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Add any details for your Account Manager..."
              className="w-full resize-none rounded-md border border-border bg-surface-raised px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button className="w-full" onClick={send}>
            <Mail className="mr-1.5 size-4" /> Send Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Replaces the old one-click "Join Promotion" button with a Pragmatic-style AM-mediated request flow. */
export function RequestParticipationButton({ promo }: { promo: Promo }) {
  const { statusFor, requestParticipation } = useParticipation();
  const status = statusFor(promo.id);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"explain" | "contact">("explain");

  if (status !== "Not Requested") {
    return <ParticipationStatusBadge status={status} className="px-3 py-1.5 text-xs" />;
  }

  const send = () => {
    requestParticipation(promo.id);
    toast.success(`Participation request sent for ${promo.name}`, {
      description: `${promo.manager.name} will review your eligibility and follow up.`,
    });
    setOpen(false);
    setStep("explain");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setStep("explain");
      }}
    >
      <Button onClick={() => setOpen(true)}>
        <ShieldCheck className="mr-1.5 size-4" /> Request Participation
      </Button>
      <DialogContent>
        {step === "explain" ? (
          <>
            <DialogHeader>
              <DialogTitle>Request participation</DialogTitle>
              <DialogDescription>{promo.name}</DialogDescription>
            </DialogHeader>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              To participate in this promotion, please contact your dedicated Account Manager and
              complete the required participation requirements. Your Account Manager will confirm
              eligibility, timelines and any technical steps before you go live.
            </p>
            <Button className="w-full" onClick={() => setStep("contact")}>
              <MessageCircleQuestion className="mr-1.5 size-4" /> Talk to Account Manager
            </Button>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Talk to your Account Manager</DialogTitle>
              <DialogDescription>Participation request — {promo.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-lg bg-surface-raised px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium">{promo.manager.name}</p>
                  <p className="text-xs text-muted-foreground">{promo.manager.role}</p>
                </div>
                <a
                  href={`mailto:${promo.manager.email}`}
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                >
                  <Mail className="size-3.5" /> {promo.manager.email}
                </a>
              </div>
              <p className="rounded-md border border-border bg-surface-raised/60 px-3 py-2 text-xs text-muted-foreground">
                Promotion: <span className="text-foreground">{promo.name}</span> will be included
                automatically with your request.
              </p>
              <Button className="w-full" onClick={send}>
                <Mail className="mr-1.5 size-4" /> Send Request
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
