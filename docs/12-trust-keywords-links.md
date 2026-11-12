# Trust, keywords and links: what the research found, 12 Nov 2026

Two research passes produced this. Both were limited, and the limits matter more than the findings, so they come first.

## 1. Limits of the evidence

- **No government site could be opened** from the research environment (US State Department, UK government, German Foreign Office, French Diplomatie, Smartraveller, CDC, Wikivoyage). Every official URL on the site (`lib/worries.ts`) came from a search result and was **not fetched**. Open each one by hand before `SITE_LIVE=1` and replace any that has moved.
- **No keyword tool and no search volumes.** The search tool was US-only and returned no "people also ask" or autocomplete. All query wording below was constructed by us; a few are close matches to real forum thread titles seen in results (marked [S]). Volumes are unmeasured. "Winnable" is a judgement from the result lists seen, not from a difficulty score.
- **Reddit was blocked**, so no thread there was read.
- The air-quality, Taj Mahal ticket price and advisory-level statements found in the news were **not used on the site** because sources disagree or the figures change.

## 2. What US and European visitors worry about

The ten worries are on `/before-you-go` (data in `lib/worries.ts`). The wording is ours. No statistic from the Perplexity summary is used: it quotes a survey ("only 38% of travel problems resolved within an hour") with no link we could check.

## 3. Writing rules we follow

- Original wording only. We do not paraphrase other sites; rewording someone else's page is still copying and search engines detect it.
- Every claim is either our own commitment already made on the site, advice any traveller can follow, or a link to an official source.
- No invented urgency, no invented reviews, no figures we cannot source.
- The word "safe" is never used about a place or a tour. We describe checks.

## 4. Pages and the queries they target

| Page | Targets | Notes |
|---|---|---|
| `/before-you-go` | The ten worries; the eight route-wide answer blocks | Answers are 45 to 55 words and checked at build time |
| `/plans`, `/plans/golden-triangle-{4,5,7}-days` | "how many days Golden Triangle", "Golden Triangle 5 days", "is 3 days too rushed" | Several operators and TripAdvisor threads rank; the angle that is thin is pacing and drive times |
| `/india/agra` and `/india/delhi` answer blocks | "is the Taj Mahal closed on Fridays", "private guide cost Agra", "Delhi solo women", "Chandni Chowk street food" | Closing day is a single-fact query that blogs answer; we answer it and link the ASI page |
| `/how-it-works` | Scam avoidance; comparison with arranging it yourself | |

**Not built, on purpose**
- German and French pages. Search shows the informational queries ("Abzocke Agra", "arnaques Agra Jaipur", "Indien alleinreisende Frau") are winnable, but the transactional ones are held by large operators, and a page that promises a German- or French-speaking guide cannot be honoured until we have one. Publish only after a native speaker writes or edits the page, not machine translation, and only for informational pages first.
- Pages for each of the 30 English queries. One strong page per theme beats thirty thin ones, and the 2026 spam updates went after templated pages.

## 5. Queries to write for next, in order

Based on thin or forum-led results seen, all unmeasured:

1. Is my Agra guide licensed? (how to check a licence card)
2. The driver took us to a marble factory (what to do, what is normal)
3. Taj Mahal in the heat: April to June (hours that work)
4. What if my driver doesn't turn up? (and the 1363 helpline)
5. Tipping a driver and a guide in India
6. What to wear at Amber Fort and Jaipur temples
7. Delhi to Agra: train or car

## 6. Links we cite

Citing official sources is good for readers and signals care, but it is not a ranking trick, and we do not expect a lift from it. Linked: UK and US government travel advice, Smartraveller, CDC, TravelHealthPro (food and water), the Archaeological Survey of India's Taj Mahal page, and IQAir for live air quality.

**Not linked, because nothing reliable was found:** an official source for itinerary pacing, hidden costs, or support response times. We win those by being specific, not by citing.

## 7. Earning mentions and links without buying them

What the research supports, in order of realistic return:

1. **Publish something others will cite.** A dated, first-hand dataset (measured drive times Delhi to Agra on 30 days, queue times at the Taj Mahal gates by hour) is something a journalist can quote and no big platform has. Highest effort, best odds, and it needs real data from the pilot.
2. **Journalist-request services.** HARO's old service closed in December 2024 and the brand moved to Featured.com. Source of Sources is free and has a travel category. Expect weeks to months and low odds; answer only questions we can answer first-hand.
3. **Forums and Reddit.** Answer questions with no link, disclose who you are, never post the site address unprompted. These communities delete self-promotion. Their value is learning real wording, not links.
4. **Wikivoyage.** Its rules forbid touting. Neutral edits (for example, a verifiable fact about how to check a guide's licence) are allowed; adding our own listing is not and would be removed. Skip.
5. **Partners.** Boutique hotels and homestays in Agra, Delhi and Jaipur linking to their guide partner page, in return for a real working relationship.

**Not doing:** paid links, link exchanges, guest-post networks, fake reviews, rewording competitor pages, or using AI tools to mass-produce pages. Each risks a manual action that would remove the site from search.

## 8. Books on the "before you go" page

*City of Djinns* (William Dalrymple), *Nine Lives* (William Dalrymple) and *In Spite of the Gods* (Edward Luce) were found on reading lists in search results. The years were not confirmed in research, so none is shown. No search returned a Taj Mahal or Jaipur title we could vouch for, so we list none. No publisher or retailer pays for the placement and there are no affiliate links.

## 9. To check by hand before launch

- [ ] Open every external link in `lib/worries.ts`.
- [ ] Confirm the 1363 helpline number on the Ministry of Tourism site.
- [ ] Time the Delhi to Agra drive and the Agra to Jaipur drive on several days and update the ranges in `lib/plans.ts` and `lib/answers.ts`.
- [ ] Have a local guide read the plans for pace and closing days.

## 10. Code audit, second pass (12 Nov 2026)

A separate reviewer read the whole repository looking for defects. 31 findings; none critical.

**Fixed**
- A booking made less than 24 hours before the start no longer says "free cancellation until" a time already past; it says it cannot be cancelled free.
- A damaged saved-tours cookie no longer crashes pages.
- Impossible dates such as 30 February are rejected with a clear message instead of a generic save error.
- The request limit is now one database statement (five per mailbox per day, 200 per hour overall), counts `name+tag@` and Gmail dot variants once, and has an index.
- Calendar: one tab stop, arrow keys move between days, unavailable days are announced as unavailable.
- Booking form: errors name the field, are tied to it with `aria-describedby`, and focus moves to it.
- "Back to the tour" closes the sheet on phones. Focus returns to the "Check dates" button.
- Animation code: the booking sheet loads the larger engine only when opened; the itinerary uses the small one. Reduced-motion now also stops the itinerary and photo-strip movement.
- Save button label is constant ("Save …") with `aria-pressed`, so screen readers say "pressed", not "Remove … pressed".
- Delhi–Agra sample tour times corrected to match the stated four-hour drive; "time on the road" added to the facts.
- Structured data: absolute image URLs, a price range (`AggregateOffer`) instead of one price, an image on operator listings.
- Open Graph metadata no longer drops title and description on the home and destination pages.
- Destination pages with no tour on them are titled and described as travel guides, not "tours with local guides".
- Search box has a visible focus ring; small touch targets enlarged; logo "By" and shadows corrected for contrast and dark mode.
- `robots.txt` disallows admin, operator, saved and booking paths; the build refuses `SITE_LIVE=1` without a site address.
- Air-quality note added to the date picker for November to January.
- Drive times, hygiene, dress, air quality and scams now have pages (`/before-you-go`, `/plans`) and are linked from every tour and the Delhi, Agra and Jaipur pages.

**Not fixed, and why**
- **Limits by network address.** Needs the hosting provider's firewall or a rate-limit service; set one up before launch. Until then, someone can still send 200 requests an hour from many addresses, and someone who knows a traveller's email can use up that address's five a day.
- **Notification of new requests.** Requests are stored and shown in `/admin`, but nobody is emailed. Check `/admin` daily during the preview, or add email.
- **Price flash.** Every visitor first sees dollars, then their currency. Reading it on the server would make every page uncacheable, so we accept a brief swap.
- **Company address, logo and contact point** in structured data: needs the registered company details.
- **FAQ markup** no longer earns rich results on a commercial site. It is kept because AI assistants read it, not for search appearance.
- **Sitemap** lists catalogue pages only, not operator listings and profiles.
- **Search box** does not yet announce the highlighted suggestion to screen readers.
