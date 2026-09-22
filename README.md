# SPRIBE Partner Promo Hub

A B2B promo calendar prototype for SPRIBE operators: network tournaments, cross-game
challenges, missions and regional campaigns in one place, with an Account-Manager-mediated
participation flow instead of a one-click "join".

## Stack

- Vite + React 19 + TypeScript
- TanStack Router (code-based routes in `src/router.tsx`)
- Tailwind CSS v4 + Radix UI primitives (`src/components/ui`)
- All data is mocked in `src/lib/promos.ts`; participation state persists to `localStorage`
  via `src/lib/participation.tsx`

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
```

## Key flows

- `/` — Promo Calendar dashboard: live stats, filters, Month/Week/List calendar, Action
  Required feed, and a campaign grid.
- `/promo/:promoId` — full promotion detail: eligibility, scoring, prizes, operator
  requirements, tiered Terms & Conditions (general + market-specific), marketing assets,
  and the Request Participation flow.
- `/help` — FAQ and Account Manager contact.

Participation never completes with a single click: **Request Participation** explains the
requirement to go through an Account Manager, then opens a contact panel that sends the
request and moves the promo through `Not Requested → Request Sent → Under Review →
Confirmed`.
