import { createHashHistory, createRootRoute, createRoute, createRouter, notFound } from "@tanstack/react-router";
import { RootLayout } from "@/routes/root";
import { PromoHub } from "@/routes/home";
import { PromoPage } from "@/routes/promo-detail";
import { HelpPage } from "@/routes/help";
import { SuggestionsPage } from "@/routes/suggestions";
import { PromotionalAssetsPage } from "@/routes/promotional-assets";
import { ResultsPage } from "@/routes/results";
import { NotFoundPage } from "@/routes/not-found";
import { getPromoById } from "@/lib/customPromos";

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: PromoHub,
});

const promoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/promo/$promoId",
  loader: ({ params }) => {
    const promo = getPromoById(params.promoId);
    if (!promo) throw notFound();
    return { promo };
  },
  component: PromoPage,
});

const helpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/help",
  component: HelpPage,
});

const suggestionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/suggestions",
  component: SuggestionsPage,
});

const promotionalAssetsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/promotional-assets",
  component: PromotionalAssetsPage,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results",
  component: ResultsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  promoRoute,
  helpRoute,
  suggestionsRoute,
  promotionalAssetsRoute,
  resultsRoute,
]);

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
  // Hash-based history keeps every route resolvable from a single static
  // file, so deep links work on plain static hosting without server rewrites.
  history: createHashHistory(),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
