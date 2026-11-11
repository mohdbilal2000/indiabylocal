# IndiaByLocal

A marketplace where travellers from the US, UK, EU, Canada and Australia book licence-verified local guides and tours in India, at one all-in price.

**Status: front-end preview.** The traveller-facing pages are built and deployed. The catalogue is sample data, booking is not wired, and the site tells search engines not to index it until `SITE_LIVE=1` is set.

## Run it

```bash
npm install
npm run dev
```

| Path | What it is |
|---|---|
| `app/` | Pages: home, city hubs, tour pages, Taj Mahal fact page, guide sign-up pitch, sitemap and robots |
| `components/` | Header and footer, tour card, booking box with two-time-zone display, illustrations, structured data |
| `lib/data.ts` | The sample catalogue and the rules a listing must pass to build |
| `lib/site.ts` | Site address and the `SITE_LIVE` switch |

## Going live

Replace `lib/data.ts` with real listings, verify the figures on the fact page, then set `SITE_LIVE=1` and `NEXT_PUBLIC_SITE_URL` in the Vercel project. That one switch removes the preview banner, opens `robots.txt` and drops the noindex tag.

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
