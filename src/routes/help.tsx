import { useState } from "react";
import { ChevronDown, LifeBuoy } from "lucide-react";
import { TalkToAMButton } from "@/components/promo/ParticipationFlow";
import { FAQ_ITEMS } from "@/lib/promos";

function FaqRow({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="panel overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-sm font-medium">{question}</span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border px-4 py-3.5 text-sm leading-relaxed text-muted-foreground">
          {answer}
        </div>
      )}
    </div>
  );
}

export function HelpPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
          <LifeBuoy className="size-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold">Help &amp; Support</h1>
          <p className="text-sm text-muted-foreground">
            Answers to the questions we hear most from operators.
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {FAQ_ITEMS.map((item) => (
          <FaqRow key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>

      <div className="panel flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold">Still need help?</p>
          <p className="text-sm text-muted-foreground">Talk to your Account Manager directly.</p>
        </div>
        <TalkToAMButton subject="General support question" />
      </div>
    </main>
  );
}
