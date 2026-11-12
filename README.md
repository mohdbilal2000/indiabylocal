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

The review screen is at `/admin`. It answers 404 to anyone who is not an admin. To make an account an admin, create it at `/operators/signup`, then:

```bash
npm run admin -- grant you@example.com
```

From `/admin` you verify or suspend operators, publish submitted tours, send a tour back with a reason the operator sees, and take a live tour down. Every action is recorded. A tour is shown to travellers only when it is published and its operator is verified.

## Going live

Verify the figures on the Taj Mahal fact page, then set `SITE_LIVE=1` and `NEXT_PUBLIC_SITE_URL` in the Vercel project. That removes the preview banner and the sample tours, opens `robots.txt` and drops the noindex tag.

## Blueprint

The documents in `docs/` were produced from 13 parallel research tracks on 11 Nov 2026, then audited and extended by 5 more on 12 Nov. They decide what gets built and in what order.

| Doc | What it decides |
|---|---|
| [docs/00-blueprint.md](docs/00-blueprint.md) | Positioning, the open decisions that block work, and the build order from first brick to last |
| [docs/01-product-ux.md](docs/01-product-ux.md) | Design tokens and the page-by-page spec for travellers |
| [docs/02-architecture.md](docs/02-architecture.md) | Stack, data model, durability, booking integrity, AI-agent access |
| [docs/03-payments-tax-legal.md](docs/03-payments-tax-legal.md) | Money flow, unit economics, registration checklist, consumer law |
| [docs/04-supply-ops.md](docs/04-supply-ops.md) | Supplier onboarding, verification, quality and safety operations |
| [docs/05-growth-seo.md](docs/05-growth-seo.md) | SEO, AI-answer visibility, content calendar, channels, funnel |
| [docs/06-evidence.md](docs/06-evidence.md) | What was verified, what was not, the audit, and the sources |
| [docs/07-how-to-brief.md](docs/07-how-to-brief.md) | How to ask Claude for work on this project |
| [docs/08-experience.md](docs/08-experience.md) | The life of the product: moments, signature interactions, voice, the Promise, safety, supplier experience |
| [docs/09-inventory.md](docs/09-inventory.md) | Every brick: components, screens, messages, jobs, admin functions |
| [docs/10-markets.md](docs/10-markets.md) | Market-by-market entry, languages, page templates, AI-answer operations |

A clickable prototype of the tour page is in `docs/prototype/day-unfolds.html`. It shows the direction with example content; it is not a design system.

Read `00-blueprint.md` first. Three decisions in it need an answer before any money is spent.
