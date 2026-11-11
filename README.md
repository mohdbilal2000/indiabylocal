# IndiaByLocal

A marketplace where travellers from the US, UK, EU, Canada and Australia book licence-verified local guides and tours in India, at one all-in price.

**Status: preview.** Travellers can browse 67 destinations across India. Tour operators can create an account, add tours and submit them for review. Traveller booking and payment are not built. The site tells search engines not to index it until `SITE_LIVE=1` is set.

## Run it

```bash
npm install
vercel env pull .env.local
npm run db:migrate
npm run dev
```

| Path | What it is |
|---|---|
| `app/` | Home, destinations, state and destination pages, sample tour pages, operator sign-up, login and dashboard |
| `app/operators/actions.ts` | Sign-up, login and listing actions, with all input checked on the server |
| `lib/destinations.ts` | The destination catalogue by region and state |
| `lib/data.ts` | Six sample tours that show the listing format; hidden once the site is live |
| `lib/auth.ts`, `lib/db.ts` | Sessions, password hashing and database access (Neon Postgres) |
| `db/schema.sql` | Tables: operators, sessions, listings |
| `public/photos/`, `lib/photos.json` | Destination photographs from Wikimedia Commons and their credits, shown at `/credits` |
| `scripts/fetch_photos.py` | Re-fetches photographs listed in `scripts/places.json` |

## Reviewing operators

There is no admin screen yet. Until there is:

```bash
npm run admin -- queue
npm run admin -- verify operator@example.com
npm run admin -- publish <listing-id>
```

A tour is shown to travellers only when the listing is published and its operator is verified.

## Going live

Verify the figures on the Taj Mahal fact page, then set `SITE_LIVE=1` and `NEXT_PUBLIC_SITE_URL` in the Vercel project. That removes the preview banner and the sample tours, opens `robots.txt` and drops the noindex tag.

## Blueprint

The documents in `docs/` were produced from 13 parallel research tracks on 11 Nov 2026 and decide what gets built and in what order.

| Doc | What it decides |
|---|---|
| [docs/00-blueprint.md](docs/00-blueprint.md) | Positioning, the open decisions that block work, and the build order from first brick to last |
| [docs/01-product-ux.md](docs/01-product-ux.md) | Design tokens and the page-by-page spec for travellers |
| [docs/02-architecture.md](docs/02-architecture.md) | Stack, data model, durability, booking integrity, AI-agent access |
| [docs/03-payments-tax-legal.md](docs/03-payments-tax-legal.md) | Money flow, unit economics, registration checklist, consumer law |
| [docs/04-supply-ops.md](docs/04-supply-ops.md) | Supplier onboarding, verification, quality and safety operations |
| [docs/05-growth-seo.md](docs/05-growth-seo.md) | SEO, AI-answer visibility, content calendar, channels, funnel |
| [docs/06-evidence.md](docs/06-evidence.md) | What was verified, what was not, and the sources |
| [docs/07-how-to-brief.md](docs/07-how-to-brief.md) | How to ask Claude for work on this project |

Read `00-blueprint.md` first. Three decisions in it need an answer before any money is spent.
