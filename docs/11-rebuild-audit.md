# Rebuild and audit, 12 Nov 2026

What was built in the product rebuild, what was deliberately left out, and where the result still falls short of GetYourGuide and Airbnb Experiences.

## 1. What changed

| Area | What is in the site now | Where |
|---|---|---|
| Colour | Terracotta and saffron on slate and sand; emerald only for things we have checked. Every text pairing meets WCAG AA | `app/globals.css` |
| Currency | USD, EUR, GBP, AUD and INR. First guess from the browser's language, then the visitor's choice. European Central Bank rates, refreshed twice a day | `lib/currency.ts`, `lib/rates.ts`, `components/Currency.tsx` |
| Trust badges | Four badges, each tied to a named check, with a public explanation of how the check is done | `lib/trust.ts`, `components/TrustBadges.tsx`, `/how-it-works#badges` |
| Tour card | Swipeable photographs, badge, heart to save, price in the visitor's currency | `components/TourCard.tsx`, `CardGallery.tsx`, `SaveButton.tsx` |
| Itinerary | Each stop opens for detail, walking distance and tips on dress and photography. The text is always in the page | `components/ItineraryTimeline.tsx` |
| Booking | Sticky bar on phones that opens a bottom sheet; the same panel beside the page on a wide screen. Two steps: the day, then your details. Sends a request; takes no payment | `components/StickyBookingBar.tsx`, `BookingPanel.tsx`, `app/booking/actions.ts` |
| Requests | Stored in `booking_requests` and listed in `/admin` with a reply link | `db/schema.sql`, `app/admin/page.tsx` |
| Operator profile | Public page for each verified operator: what was checked, and their tours | `/hosts/[id]` |
| Saved tours | Kept in a first-party cookie, shown at `/saved` | `lib/saved.ts` |
| Metadata | Canonical, hreflang (`en` and `x-default`), Open Graph and Twitter cards with the route photograph, robots rules | tour, listing and destination pages |
| Structured data | One connected graph per page: organisation, trip, offer, itinerary stops linked to their Wikipedia entries, questions | `lib/schema.ts`, `lib/entities.ts` |
| Answer blocks | Five questions with answers of 45 to 55 words; the length is enforced at build time | `lib/answers.ts` |
| Comparison tables | "Arranging a guide yourself, or booking one here" and "Six classic routes at a glance" | `/how-it-works`, `/guides` |
| Images | AVIF then WebP, a month of caching, a blurred preview for every photograph | `next.config.ts`, `scripts/blur.mjs` |
| Season warnings | Heat, monsoon and fog notes appear when a date is picked | `lib/season.ts` |

## 2. What was asked for and not built, and why

| Asked for | Decision | Reason |
|---|---|---|
| "100% Scam-Free Guarantee" badge | Replaced by the no-shopping-stop Promise | Nobody can guarantee that. A refund promise for named events is something we can keep, and consumer regulators in the US, UK and EU test absolute claims |
| "ASI Certified" badge | "Government-licensed guide" and "Cleared for protected monuments" | The licence category on a guide's card is what matters. The badge states what we checked and shows the issuing authority from the card |
| "Likely to sell out" | Not built | We have no booking data. Invented urgency is a banned practice under EU and UK consumer law |
| Live review ticker, ratings on cards | Not built | There are no reviews yet. Showing invented ones is unlawful under the FTC's 2024 rule and the UK's 2024 Act. The operator page says reviews appear after completed tours |
| Guide audio and video | Not built | No guide has recorded one yet |
| Free-text "interests and dates" search | Kept the destination search | With six sample tours a free-text search returns nothing most of the time |
| hreflang for German, French, Spanish | Only `en` and `x-default` | Pointing hreflang at pages that do not exist is an error search engines penalise |
| Costs in the routes table | Left out | We have no verified prices. Wrong figures quoted by an AI assistant would be worse than none |
| Payment in the booking flow | Request only | Decision D2 in the blueprint is still open |

## 3. Against GetYourGuide and Airbnb Experiences

| | They have | We have | Gap |
|---|---|---|---|
| Inventory | Tens of thousands of products | Six samples and whatever operators list | The whole business. Nothing in the interface closes it |
| Reviews | Millions | None | Needs the pilot |
| Payment | Cards, wallets, pay later | A request form | D2 |
| Instant confirmation | Yes | No; a person replies | Needs calendars and payment |
| Apps | Native apps | Mobile web | Not needed at this size |
| Price clarity | "From" prices that often exclude tickets | Total for your group, tickets as a named line | Ours is better |
| Guide identity | Usually an operator name | Licence number and issuing authority | Ours is better, once real guides are on |
| Time zones | Local time only | India time and the visitor's own | Ours is better |
| Closed days | Often bookable by mistake | Struck out in the calendar | Ours is better |

## 4. Edge cases and what handles them

| Case | Handling | Still open |
|---|---|---|
| Taj Mahal closed on Fridays | Fridays cannot be picked; the reason is printed under the calendar and answered in the page's questions | Closures for state visits are announced at short notice and need a manual block |
| Old Delhi markets shut on Sundays | Same mechanism, per tour | — |
| Monsoon, heat, fog | A note appears for the month picked | General climate only, not a forecast |
| Traveller in another time zone | Start shown in India time and theirs; cancellation deadline in India time | — |
| Converted prices not adding up | The per-person figure is rounded, then multiplied | The card is charged in the tour's own currency, and the panel says so |
| Rate source unreachable | Built-in approximate table, labelled as approximate | Review the table every few months |
| Database unreachable | Listings show as empty; a request shows "try again in a minute" | — |
| Spam requests | Hidden field, five requests per email per day, server-side checks on every value | Add a proper rate limit before launch |
| Foreign cards | Not handled: no payment yet | Razorpay Route does not support international payments. Stripe has been invite-only in India. Ask Razorpay and Cashfree in writing (D2) |
| Personal data from EU and UK visitors | The form says what the details are used for | A privacy policy naming the company is required before launch |

## 5. Not measured

- Page speed on a real phone network. The pages are static and images are sized and lazy-loaded, but no Core Web Vitals figure has been measured in the field.
- Whether any AI assistant cites the site. It is closed to crawlers until `SITE_LIVE=1`.
- The Wikipedia links in `lib/entities.ts` were written from memory and not fetched.
