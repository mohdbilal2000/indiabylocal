# Growth, search and AI-answer visibility

Keyword difficulty below is an estimate; the keyword-data tool was unavailable during research. Timelines are judgement, not measurement. See [06-evidence.md](06-evidence.md).

## 1. What is realistic

- Only 1.74% of new pages reach the top 10 within a year; the average first-ranked page is five years old.
- AI summaries cut clicks on the queries they appear for by 38–61%, depending on the study. Plan around citations and bookings, not sessions.
- Spam updates in June and August 2026 hit scaled, template-assembled pages, including location pages.

| Horizon | Expect |
|---|---|
| 6 months | Brand indexed; long-tail and question queries for Agra ranking; first AI citations on fresh-data questions |
| 12 months | Top 5 for Agra long-tail and local-expert queries; some Delhi and Jaipur long-tail |
| 24 months | Page 1 for mid-tail such as "Taj Mahal sunrise tour from Delhi" |
| Not within 24 months | "Taj Mahal tour", "India tours", "things to do in Delhi" |

**The edge:** first-hand, dated data collected in Agra that no large platform has.

## 2. Site structure

- `/india/agra/` (hub) → `/india/agra/taj-mahal-tours/` (category) → `/tours/{slug}-{id}` (flat and stable), plus `/guides/{name}` and fact pages such as `/india/agra/taj-mahal/tickets-timings/`.
- A category is published only with four or more live tours and its own data: founder-verified prices and timings with a "last verified" date, our own photos, guide quotes, a seasonal table, review excerpts. Otherwise it is not indexed.
- Only whitelisted filter combinations become indexable pages. Everything else is a query parameter with a canonical to its parent and no crawlable link.
- Pagination uses real links and self-referencing canonicals.
- One `.com`, one English version. No separate US, UK and Australian clones. Other languages only when human-edited.
- Currency switches by cookie on the same address. One default currency is rendered on the server and matches the structured data.

## 3. Structured data

| Page | Types | Rich result today? |
|---|---|---|
| Tour | Product, Offer, AggregateRating and Review from verified bookings only; TouristTrip optional | Product snippet: yes |
| All | BreadcrumbList | Yes |
| Home | Organization | Knowledge-panel signals |
| Guide | ProfilePage, Person with languages and credentials | Profile support |
| Articles | Article with named author and modified date | Limited |
| Media | ImageObject with licence and creator | Yes |
| Questions | FAQPage | No — rich results ended in May 2026; the markup is harmless |

- Reviews from other sites are never marked up as ours.
- Structured data is for rich results. One test found no lift in AI citations from it.
- Keep it lean. A competitor ships 454 KB of structured data on one hub page.

## 4. Being cited by AI answers

**What has evidence**

- Brand mentions across the web correlate with AI visibility at about 0.66–0.71, against about 0.3 for backlink strength; YouTube mentions are highest. Correlation only.
- Original statistics, quotations and cited sources lifted visibility by up to about 40% in one lab study, not independently replicated.
- Google says optimising for AI answers is still ordinary search optimisation.

**What we do**

- Original, dated numbers on every fact page.
- Answer-first passages of 40–60 words under each question heading.
- Named authors and a visible "verified on" date.
- One consistent description of who we are, everywhere.
- Everything rendered on the server; AI crawlers do not run scripts.
- Search, user-triggered and training crawlers are all allowed in `robots.txt`.

**What we skip**

- `llms.txt` as a priority: Google does not use it, and one study found 97% of such files receive no AI requests. Ten minutes of work; expect nothing.

**Measuring cheaply:** Bing Webmaster's AI report; a fixed 30-prompt panel run monthly across the main assistants; referrers; crawler hits in logs.

**Agents booking directly:** the large platforms have assistant apps that are invoked unreliably, and agent-checkout protocols are live for retail, not tours. We build a clean availability and price interface now and add an agent-facing server later. Early-mover benefit is speculative.

## 5. Content engine

**Standards:** every page has a named reviewer, at least one first-hand asset (photo, receipt, timed observation) and a change log. AI drafts only from the founder's notes. No city-swapped templates. About three pages a week.

**90 days:** weeks 1–4 Agra fact pages and scam guides; weeks 5–8 comparisons, costs and guide profiles; weeks 9–12 Delhi and Jaipur, plus one data study for the press.

| # | Target | Intent | Difficulty (est.) |
|---|---|---|---|
| 1 | Taj Mahal ticket price 2027, foreigners | Info | Med |
| 2 | Taj Mahal opening hours; closed Fridays | Info | Med |
| 3 | Taj Mahal sunrise vs sunset (own data) | Info | Low–Med |
| 4 | Taj Mahal scams | Info | Low |
| 5 | Is a guide worth it at the Taj Mahal | Commercial | Low |
| 6 | Licensed guide in Agra: cost | Commercial | Low |
| 7 | Is the mausoleum ticket worth it | Info | Low |
| 8 | Which gate, East or West | Info | Low |
| 9 | What not to bring | Info | Low |
| 10 | Mehtab Bagh sunset view | Info | Low |
| 11 | Agra Fort tickets and timings | Info | Med |
| 12 | Fatehpur Sikri touts and guides | Info | Low |
| 13 | Delhi to Agra: train or car | Info | Med |
| 14 | Gatimaan Express day trip | Info | Low–Med |
| 15 | Agra in one day | Info | Med |
| 16 | Full-moon night viewing | Info | Low–Med |
| 17 | Agra day trip cost breakdown | Info | Low |
| 18 | Taj Mahal sunrise tour from Delhi | Transactional | High |
| 19 | Private Taj Mahal tour, female guide | Transactional | Low |
| 20 | Agra food walk | Transactional | Low–Med |
| 21 | Taj Mahal photography tour | Transactional | Low–Med |
| 22 | Wheelchair-accessible Taj Mahal | Both | Low |
| 23 | Golden Triangle in 5 days: cost | Info | High |
| 24 | Is Agra safe for solo women | Info | Med |
| 25 | Tipping guides in India | Info | Low |
| 26 | Amber Fort guide price | Info | Low–Med |
| 27 | Old Delhi food tour with a local | Transactional | Med |
| 28 | Delhi airport to Agra direct | Info | Low–Med |
| 29 | Taj Mahal crowd calendar by month | Info | Low |
| 30 | A large platform vs a local guide in Agra | Commercial | Low |

## 6. Channels, ranked

Customer acquisition costs are assumptions.

| # | Channel | Note |
|---|---|---|
| 1 | Search plus a free planning tool (itinerary, closures, arrival-card checklist) with email capture | $5–15; 6–9 months to rank |
| 2 | Reddit, Tripadvisor forums, Facebook groups, as the named founder, answers first | Near zero |
| 3 | Homestays and boutique hotels in Agra, Delhi, Jaipur: QR code and a 10% referral | About $10–15 |
| 4 | Two or three products listed on the large platforms, for volume and reviews | 20–30% commission; signature products stay direct |
| 5 | YouTube and short videos per monument; small creators paid in tours | Also the strongest AI-citation source |
| 6 | Google Things to do free listings | Needs instant confirmation and accurate prices |
| 7 | Diaspora WhatsApp groups and associations | — |
| 8 | Travel advisers at 10–12% | Later |
| 9 | Paid search | Multi-day only; exact-match long-tail at $15–30 a day as a bridge |

Reviews are requested on Trustpilot and Google from the first booking, with no incentive.

Google's operator booking module ties to the operator's own business profile, so each guide gets a profile with a booking link to us.

## 7. Funnel model

Assumptions: $140 average booking; conversion rising from 0.5% to 0.9%.

| Months | Sessions | Bookings | Booking value |
|---|---|---|---|
| 1–3 | 6k | 30 | $4k |
| 4–6 | 20k | 140 | $20k |
| 7–12 (peak) | 90k | 810 | $113k |
| **Year 1** | **116k** | **about 980** | **about $137k** |

At the 11.6% contribution in [03](03-payments-tax-legal.md), that is roughly $16k before marketing and support. A downside case is about 40% of this. This is a planning model, not a forecast.

## 8. Calendar

| When | What |
|---|---|
| Nov–Dec 2026 | Name clearance, incorporation, Phases 0–1 |
| By Feb 2027 | Soft launch: 15–25 Agra and Delhi products; 30–50 reviews before the season ends in March |
| Apr–Aug 2027 | Off-season: 50+ pages, Jaipur and beyond, planning tool, hotel partners |
| By 1 Jul 2027 | Fully live for the October 2027 – March 2028 season |

## 9. Demand facts

| Fact | Value |
|---|---|
| Foreign arrivals, 2025 | About 9.0–9.15 million; 2019 peak 10.9 million |
| By source, 2025 | US 1.81m, UK 1.07m, Australia 0.54m, Canada 0.53m |
| 2026 shock | Conflict in West Asia from February: leisure inbound down 15–20%, new bookings down 20–25% |
| Seasonality | December is the peak; April is about half of January |
| Taj Mahal foreign visitors | 645k in 2024–25 |
| Experiences booked online | 33% globally |
| Lead time | 70% of US and 61% of European tour-takers book under 7 days ahead |
| Device | About 2 in 5 operator online bookings are on mobile |
| Reseller prices | Delhi–Taj private day $73–127 per person; guided Taj entry $22–47 |

German, French, Italian, Dutch and Spanish arrival figures were not found.
