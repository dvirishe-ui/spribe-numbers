import { Lightbulb } from "lucide-react";
import { MarketSuggestions } from "@/components/promo/MarketSuggestions";

export function SuggestionsPage() {
  return (
    <main className="mx-auto max-w-[1400px] space-y-5 px-4 py-5 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
          <Lightbulb className="size-4" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold">Suggestions</h1>
          <p className="text-sm text-muted-foreground">Best game, format and timing per market.</p>
        </div>
      </div>

      <MarketSuggestions />
    </main>
  );
}
