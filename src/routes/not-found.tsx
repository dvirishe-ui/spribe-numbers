import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="text-eyebrow">404</p>
      <h1 className="font-display text-2xl font-semibold">Promotion not found</h1>
      <p className="text-sm text-muted-foreground">
        This promotion may have ended or the link is incorrect.
      </p>
      <Button asChild>
        <Link to="/">Back to Promo Calendar</Link>
      </Button>
    </div>
  );
}
