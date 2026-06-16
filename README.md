# LuxeRealty

Real estate listings site built with React + Vite. Pulls live sale listings
from RentCast and has an AI advisor section powered by Claude for property
recommendations.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and drop in your own keys:

```
VITE_RENTCAST_KEY=your_rentcast_key
VITE_ANTHROPIC_KEY=your_anthropic_key
```

## Running locally

```bash
npm run dev
```

Opens on `http://localhost:5173`.

## Build

```bash
npm run build
```

Outputs to `dist/`.

## Notes

- Listings come from RentCast's `/listings/sale` endpoint via the axios
  instance in `src/lib/rentcast.js`, currently pulling from LA, NYC, Miami,
  and Austin on initial load. Update `STARTER_CITIES` in
  `src/hooks/useListings.js` if we want different markets.
- Hero search re-queries RentCast directly for whatever city/state the user
  types in (format: "City, ST").
- Team bios, reviews, and the three hero spotlight cards are still
  placeholder content — swap those out once we have real agent photos/bios
  and actual client testimonials.
- Property photos are randomly pulled from a small Unsplash pool by property
  type since RentCast's basic listing data doesn't reliably include photos.
- The AI advisor hits the Anthropic API directly from the browser, which
  means the API key is exposed client-side. Fine for a demo/prototype, but
  before shipping this for real we should proxy that call through a small
  backend so the key isn't sitting in the bundle.
