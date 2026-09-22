import { Link, useLoaderData } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PromoDetail } from "@/components/promo/PromoDetail";

export function PromoPage() {
  const { promo } = useLoaderData({ from: "/promo/$promoId" });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to promo calendar
      </Link>
      <PromoDetail promo={promo} />
    </div>
  );
}
