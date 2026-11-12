# Markets, languages and AI-answer operations

Extends [05-growth-seo.md](05-growth-seo.md). The first plan was one English strategy. This document says how each Tier-1 market is entered, what is localised, and how search and AI-answer work is run month to month.

Labels: **[V]** corroborated in search results (primary pages could not be opened), **[E]** estimate, **[O]** judgement. No keyword tool was available, so no search volumes are given.

## 1. Market priority

| Order | Market | Arrivals to India | How they travel and book | Who we meet in results | What we localise |
|---|---|---|---|---|---|
| 1 | United States | 1.81m (2025) [V] | Independent, short lead, day tours [E] | Viator, GetYourGuide, ToursByLocals | USD, month/day dates, Apple Pay, Trustpilot and Google reviews |
| 2 | United Kingdom | 1.07m [V] | 54% of all holidays are packages [V] | The same, plus UK operators | GBP, day/month dates, UK spelling |
| 3 | Australia, Canada | 0.54m, 0.53m | Long trips, independent [E] | The same | AUD and CAD display |
| 4 | Germany, Austria, Switzerland | 256k (Germany, 2024) [V] | About half of trips are packages. The product shape is a round trip with a German-speaking guide [V] | Dertour, Gebeco, Exoticca | EUR, PayPal and pay-by-invoice, legal imprint page, withdrawal notice, the Trusted Shops seal [O: recognition not verified] |
| 5 | France | 207k (2024) [V] | A circuit with a French-speaking guide, usually through an operator [V] | Evaneos, Jet Tours, Havas | EUR, cards, legal notice page |
| 6 | Spain, then Latin America | about 73k [E] | An excursion with a Spanish-speaking guide [V] | Civitatis | EUR; Spain first |
| 7 | Italy | about 116k [E] | Not researched | Not researched | Deferred |
| 8 | Netherlands | about 123k [E] | High English ability [O] | Not researched | Served in English; add iDEAL/Wero, about 70% of Dutch online payments [V] |

**Arrivals are not demand.** They include diaspora visits. The US, UK and Canada skew diaspora; continental Europe skews leisure [E]. This is why diaspora families are a first segment for the English markets and independent leisure travellers for Europe.

**Europe is entered through guides, not translation.** The German, French and Spanish queries are all "guide who speaks my language". A translated page with no such guide cannot satisfy the search.

## 2. Language roadmap

| Language | When | Gate |
|---|---|---|
| English | Launch | — |
| German | Month 6–9 | Three vetted German-speaking guides in a city |
| French | Month 9–12 | Three vetted French-speaking guides |
| Spanish | Month 12–15 | Three vetted Spanish-speaking guides |
| Italian | After 20 bookings from Italian speakers | — |
| Dutch | Not planned | — |

**Quality bar**

- A native travel writer rewrites each page for the market; no machine translation on pages that sell.
- A second native speaker reviews.
- Keywords are researched in that language from its own results.
- Reviews stay in their original language.

**Addresses and tags**

- `/de/indien/agra/`, `/fr/inde/agra/`, `/es/india/agra/`, with translated slugs.
- Language tags for `en`, `de`, `fr`, `es` and a default pointing to English, self-referencing and reciprocal, delivered in the sitemap. Canonicals stay within a language.
- One English page for all English markets, with currency by cookie. No US, UK or Australian clones.

**Not translated:** profiles of guides who do not speak that language; thin fact pages; anything we cannot re-verify each quarter.

**From day one, at no translation cost:** currency, date format and spelling by market; guide languages as a filter and on every card; payment methods by country.

## 3. Page templates

Every page opens with an **answer block**: a question as the heading, then 40–60 words that stand alone, with a number, a unit, a date and a source, followed by "Verified {date} by {name}". Everything is rendered on the server.

| Page | Title / main heading | Description | Outline | Links out | Structured data |
|---|---|---|---|---|---|
| City hub | "{City} tours with licensed local guides ({year})" / "{City} with a local guide" | Tour count, from-price, one proof point | Answer block; top tours; categories; fact table; guides; seasonal table; questions | Categories, fact pages, guides, neighbouring cities | CollectionPage, ItemList, BreadcrumbList, TouristDestination |
| Category | "{Monument} tours: {n} private options from {price}" | What differs, plus cancellation terms | Answer block ("which tour suits whom"); comparison table; tours; price data; questions | Parent hub, sibling categories, two fact pages | ItemList of Product, BreadcrumbList |
| Tour | "{Tour}: {duration}, {guide language}, from {price}" | Inclusions, pickup, cancellation | Summary; timed itinerary; included and excluded with amounts; guide; meeting point; reviews; questions | Guide, category, related facts | Product, Offer, AggregateRating and Review from our bookings only, TouristTrip itinerary |
| Fact page | "{Question}? ({month year})"; the heading is the question | The answer in one sentence | Answer block; data table; how we verified; change log; related tours | Two tours, the hub, three sibling facts | Article with author, modified date and citation; FAQPage; ImageObject |
| Guide profile | "{Name}, licensed guide in {City}: {languages}" | Licence, years, specialism | Biography in the guide's words; credentials; tours; reviews; video | Their tours, the city hub | ProfilePage with a Person: languages, credential, role, employer, own profiles |

Titles are checked for length in CI. A competitor's tour title is cut off mid-phrase and its description is the first line of body text.

## 4. Running AI-answer visibility

### The prompt panel

Thirty prompts, run monthly on ChatGPT, Google AI Mode, Perplexity, Gemini and Copilot, from US, UK and German locations.

**US**
1. Is a guide worth it at the Taj Mahal?
2. Best private Taj Mahal sunrise tour from Delhi
3. How to avoid scams in Agra
4. Taj Mahal ticket price for foreigners 2027
5. Licensed vs unlicensed guides in India
6. Delhi to Agra: train or car
7. Best alternatives to Viator for India guides
8. Safe solo female tour in Jaipur

**UK**
9. Golden Triangle itinerary, 6 days, what does it cost?
10. Is the Taj Mahal closed on Fridays?
11. Best Old Delhi food tour with a local
12. How much to tip a guide in India
13. Wheelchair-accessible Taj Mahal visit
14. Which Taj Mahal gate is best?

**Canada and Australia**
15. Book a local guide in Agra directly
16. Gatimaan Express day-trip plan
17. Amber Fort guide price
18. Best month for Rajasthan

**German**
19. Taj Mahal Führung auf Deutsch buchen
20. Lohnt sich ein Guide in Agra?
21. Indien Rundreise individuell oder Gruppe?
22. Deutschsprachiger Reiseleiter Jaipur

**French**
23. Guide francophone Taj Mahal prix
24. Circuit Rajasthan avec guide local ou agence ?
25. Arnaques à Agra

**Spanish**
26. Guía en español Taj Mahal
27. Excursión a Agra desde Delhi: ¿merece la pena?

**Brand and in-destination**
28. Is IndiaByLocal legit?
29. Guide near Taj Mahal east gate now
30. IndiaByLocal vs GetYourGuide

New prompts come from Bing's grounding queries, Search Console questions, forum thread titles and questions guides report hearing.

### What gets cited

- Original dated numbers, quotations and cited sources (one lab study) [V].
- Comparison tables and "X or Y" pages.
- A line saying how the fact was checked.
- One fixed description of who we are, used everywhere [O].

Our own pages will be a minority of citations. In one travel dataset, brand-owned pages were about 16.5% of what Perplexity cited; Reddit and Wikipedia lead on ChatGPT, YouTube on AI Mode and Perplexity [V].

### Where to be present

| Market | Places |
|---|---|
| All | A Wikidata entry; a YouTube video per monument with transcript; Tripadvisor forums; Trustpilot. Wikipedia only after press coverage, and never written by us. |
| US | r/india, r/travel, r/solotravel; podcasts |
| UK | National newspaper travel sections, on the back of one data study |
| Germany | German travel blogs and forums |
| France | The Routard forum |
| Spain | The Los Viajeros forum; Spanish-language YouTube |

### Monthly rhythm

| Week | Work |
|---|---|
| 1 | Run the panel |
| 2 | Fix or refresh the five worst pages |
| 3 | Two off-site contributions per market |
| 4 | Log and compare |

**Measured:** how often we are cited and mentioned; our share against Viator and GetYourGuide; whether what the assistants say about us is accurate; sessions and bookings referred by assistants; crawler hits.

Bing's AI report covers only Copilot and Bing and has no click data. It is useful for the queries it reveals, not as a headline number.

## 5. Being a known entity

- **Company:** legal name, registration numbers and address on the site; one 25-word description used everywhere; links to its Wikidata, LinkedIn, Trustpilot and YouTube identities.
- **Founder:** a profile page; a byline on every fact page; one data study a quarter pitched to the press; real-name presence on LinkedIn and Reddit.
- **Guides:** each a person with a licence number and issuing body, a video introduction and links to their own profiles.
- **Mentions to earn:** tourism-association listings, partner hotel pages, links from universities or museums to our data.

## 6. Travellers already in India

Seventy percent of US tour-takers book less than a week ahead, so this is the nearest revenue.

- One Google Business Profile per city where we have a real office. Never a virtual address.
- Guides who are genuine businesses own their own service-area profiles. We do not create profiles for them: mass-created profiles risk suspension.
- A QR code at the end of each tour for a Google review.
- Google Things to do, which requires instant confirmation.
- A "today or tomorrow" page per monument gate with one-tap WhatsApp.
- Apple Business Connect and Bing Places.
- QR codes in partner hotels and homestays.

## 7. Search surfaces beyond the ten links

- **Google Discover** had its own update in February 2026. Large cards need images at least 1200 px wide and the large-preview setting [V].
- **Image search:** our own photographs, with creator and licence marked.
- **Video:** one short video per monument, with a transcript on the page.

## 8. The ten highest-leverage actions

| # | Action | Time to effect | How we will know |
|---|---|---|---|
| 1 | 25 Agra fact pages on the answer-block template | 2–4 months | Citations on prompts 1–6; impressions |
| 2 | Prompt panel and baseline | Immediate | A trend line exists |
| 3 | Things to do feed, city profile, review QR | 1–3 months | Map actions; 50 reviews |
| 4 | Founder active on Reddit and Tripadvisor forums | 1–3 months | Brand mentions; referred bookings |
| 5 | A YouTube video per monument | 3–6 months | AI Mode and Perplexity citations |
| 6 | One data study for US and UK press | 3–5 months | Ten referring sites; brand searches |
| 7 | Company and person entities; Wikidata | 3–9 months | A knowledge panel; accurate AI descriptions |
| 8 | Guide profiles with credentials and video | 2–4 months | Profile-to-booking rate |
| 9 | German launch, gated on supply | 9–14 months | Bookings in German; prompts 19–22 |
| 10 | Rebuild the forecast from bookings by channel | Immediate | Forecast error under 30% |

## 9. Not verified

Recognition of Trusted Shops in Germany; competitor sets in Italy and the Netherlands; seasonality of search by market; 2026 changes to Things to do; the diaspora share of arrivals; all search volumes.
