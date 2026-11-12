# Product and UX specification

Each rule carries its evidence grade: **[E]** published research or regulation, **[C]** industry convention, **[J]** our judgement, to be tested. Sources are in [06-evidence.md](06-evidence.md).

## 1. Principles

1. **The price shown is the price paid.** No fee appears after the first card. [E: UK drip-pricing ban; unexpected cost is the leading cause of checkout abandonment]
2. **Never make the traveller calculate.** Totals, time zones and ticket costs are worked out for them. [J]
3. **Small inventory is curated, not hidden.** With about 100 tours, we recommend; we do not make people search. [E: choice overload appears under preference uncertainty, which describes first-time visitors]
4. **Claims are provable on the page.** Licence numbers, real counts, dated facts. [E: fake-review and pressure-selling rules in the US, UK and EU]
5. **Motion and decoration must earn their place.** Five named signature interactions; everything else is feedback. [J]
6. **Every screen opens a little more of one real day.** The emotional layer is specified in [08-experience.md](08-experience.md) and is part of this spec, not an extra. [J]

## 2. Design tokens

Most colour psychology is weakly supported; no rigorous public evidence shows one hue converting better than another, and call-to-action performance comes from contrast. The palette is chosen for legibility and to stand apart from the category (GetYourGuide and Klook orange, Viator green, Airbnb pink, AsiaByLocals green with a blue button).

### Colour — "Neel and Genda" (indigo and marigold)

| Role | Hex | OKLCH | Contrast on surface |
|---|---|---|---|
| Brand | `#2B2F77` | `oklch(34.7% .121 276)` | 11.2:1 |
| Action (button fill) | `#F2A900` | `oklch(78.5% .164 78)` | ink text on it: 8.7:1 |
| Ink (text) | `#1D1B22` | — | 16.1:1 |
| Muted text | `#5C5866` | — | 6.5:1 |
| Surface | `#FBF8F2` | — | — |
| Surface alt | `#F2ECE0` | — | — |
| Control border | `#8A8594` | — | 3.4:1 |
| Success | `#186A3B` | `oklch(46.4% .108 153)` | ≥4.9:1 |
| Warning text | `#8A5A00` | `oklch(50.8% .108 73)` | ≥4.9:1 |
| Error | `#B3261E` | `oklch(50.1% .178 29)` | ≥4.9:1 |

- The marigold fill is only 1.9:1 against the surface, so every button carries a 1 px ink border. Button text is ink, never white.
- Status is never carried by colour alone; each has an icon.
- Dark mode: surface `#14131A`, card `#1E1D27`, text `#ECE9F2`, muted `#A9A5B5`, brand `#A9B0FF`, action unchanged.

**Locked.** Two accents join the palette, each with one job: gulal rose `#C2255C` for celebration, and peacock teal `#0F766E` only for things we have verified. A design-quality checker flags "Inter everywhere" as a mark of generated design; here Inter is the quiet partner, and character comes from Fraunces, the ornament set and real photography. See [08](08-experience.md).

### Type

- **Headings:** Fraunces (variable). **Body and interface:** Inter (variable). Both free, self-hosted, Latin subset, one file preloaded.
- Devanagari loads only where a place or guide name needs it, never as decoration.
- Prices use tabular lining numerals.
- No single font is "most readable"; serif-versus-sans trust claims are folklore. [E]
- Text column is capped at 65 characters. [C]

| Token | Value | Range |
|---|---|---|
| display | `clamp(2.25rem, 1.565rem + 3.043vw, 4rem)` | 36→64 px |
| h2 | `clamp(1.75rem, 1.359rem + 1.739vw, 2.75rem)` | 28→44 |
| h3 | `clamp(1.375rem, 1.179rem + 0.870vw, 1.875rem)` | 22→30 |
| h4 | `clamp(1.1875rem, 1.114rem + 0.326vw, 1.375rem)` | 19→22 |
| body | `clamp(1rem, 0.951rem + 0.217vw, 1.125rem)` | 16→18 |
| price | `clamp(1.25rem, 1.152rem + 0.435vw, 1.5rem)`, weight 600 | 20→24 |
| small | `clamp(0.875rem, 0.851rem + 0.109vw, 0.9375rem)` | 14→15 |
| caption | `0.8125rem` | 13 |

Body text never drops below 16 px, which also stops iOS zooming on input focus. Line height is 1.55 for body, 1.15 for display and h2, 1.25 for h3 and h4. Weights: 400 body, 600 emphasis and prices, Fraunces 500–600 for headings.

### Space, shape, depth

- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Controls are 48 px tall with 8 px gaps (the legal floor is 24 px). [E]
- Radii: 4, 8, 16, pill. Two shadow levels at most; borders preferred.
- Maximum content width 1280 px.

### Imagery

- Real guides at work, face visible, natural light, with name and licence badge. [E: informative photos of real people are studied; generic stock is ignored]
- The hero is a still image. No auto-rotating carousel anywhere. [E]
- Ratios: 4:3 cards and gallery, 1:1 guide portraits, 16:9 desktop hero, 4:5 mobile hero.
- No poverty as scenery; contemporary India; guides shown as experts. [J: brand and ethics]

### Voice

Specific, verifiable, no superlatives. No "best", "100% safe" or countdowns. Spelling, currency and dates localise; tone does not, because no solid evidence supports country-specific tone.

- "£84 total for 2 people. No booking fees."
- "Free cancellation until 05:30 India time on 12 March."
- "Licensed by India's Ministry of Tourism. ID checked by us."

## 3. Layout and responsive behaviour

- **Phone (360–430 px):** single column; sticky bottom booking bar on tour pages; bottom sheets for filters and for date and guests.
- **Tablet (768 px up):** two panes — content beside a sticky booking card. Never a stretched phone layout.
- **Desktop (1024 px up):** top navigation listing cities directly; sticky booking card on the right; popovers in place of sheets.
- Full-height sections use the small viewport unit; overlays use the dynamic one; plain `100vh` is banned.
- Fixed bars are padded for device safe areas and never cover a focused element or another control.
- Social traffic arrives in in-app browsers with no saved logins or autofill, so login is by email link and checkout never requires an account. [E]

### Scroll

- Tour pages are one long page with a sticky section menu. Accordions only for questions and policies.
- Listing grids use a "Load more" control that is a real link to `?page=2`, with the address updating so Back works. [E: outperforms pagination and infinite scroll; search engines need crawlable pages]
- Scroll position is restored on Back.
- Galleries use native scroll snapping with visible buttons and a counter.
- No smooth-scroll library and no scroll hijacking. [E]

### Motion

| Use | Duration |
|---|---|
| Press and hover feedback | 100–150 ms |
| Popover, toast, accordion | 200–250 ms |
| Sheet, dialog, page transition | 300–400 ms at most |

- Enter with ease-out `cubic-bezier(.2,.8,.2,1)`; exit about 25% faster.
- Only transform, opacity and clip-path animate.
- Card-to-tour image morphs use same-document view transitions; scroll-linked effects use CSS scroll-driven animations. Both are enhancements that degrade to nothing.
- Reduced-motion preference replaces movement with a short fade or nothing.
- The five signature interactions are specified in [08](08-experience.md): booking stamp, Promise seal, card-to-page morph, day-arc draw, guide hello.

### Performance budgets

Measured compressed, on a mid-range Android phone over 4G. These are our targets, stricter than the public "good" thresholds (largest paint ≤2.5 s, interaction ≤200 ms, layout shift ≤0.1).

| Page | Script | Styles | Above-fold images | Largest paint | Interaction | Layout shift |
|---|---|---|---|---|---|---|
| Home | ≤170 KB | ≤30 KB | ≤200 KB | ≤2.0 s | ≤150 ms | ≤0.05 |
| Listing | ≤200 KB | ≤30 KB | ≤250 KB | ≤2.0 s | ≤150 ms | ≤0.05 |
| Tour | ≤220 KB | ≤35 KB | ≤250 KB | ≤2.2 s | ≤150 ms | ≤0.05 |
| Checkout | ≤250 KB incl. payment | ≤25 KB | ≤50 KB | ≤2.0 s | ≤100 ms | ≤0.02 |
| Confirmation | ≤120 KB | ≤20 KB | ≤50 KB | ≤1.5 s | — | 0 |

- Maps are a static image until tapped; chat loads on click; no third-party script loads without an owner and a budget.
- A 0.1-second mobile speed gain lifted travel conversions about 10% in one 37-brand study. [E]

### Accessibility

Target WCAG 2.2 AA. The EU's accessibility law has applied since June 2025, and the US saw about 5,000 web-accessibility suits in 2025.

- Date picker works by keyboard, accepts a typed date, and announces unavailable dates.
- Galleries have buttons, no autoplay, and no swipe-only control.
- Focus is trapped in sheets and dialogs and returned on close.
- Login needs no memory test: email link, paste allowed.
- Errors are in text and tied to their field; nothing already entered is asked for twice.
- Automated checks in CI, plus manual passes with screen readers, keyboard only, and 400% zoom. No overlay widgets.

## 4. Page specifications

### 4.1 Homepage

**Traveller's questions:** Is this legitimate? Do they cover my city? Will I be overcharged?

1. **Hero.** Heading: "See the Taj, not the marble shop." Sub-line: "Licence-checked local guides in Agra, Delhi and Jaipur. One price. Your money back if it isn't what we showed you." Beside it, the live "Today in Agra" line. Below, 4–6 city tiles ("Agra · 12 tours from $29"). On a phone the heading, the live line and two tiles are visible without scrolling.
2. **Trust bar, four items.** Government-licensed guides · Price shown is price paid · Free cancellation to 24 hours · Support on WhatsApp. Each must be true and linked to its proof.
3. **Most booked.** Six cards at most per city.
4. **Guides.** Faces with licence numbers. [E: a trustworthy host photo raises the chance of being chosen]
5. **How it works**, three steps: pick a day and see it unfold; pay one price, covered by the Promise; meet your guide, whose name, face and licence you already know.
6. **Founder and registered address.**
7. **Questions:** scams, safety, hygiene, tickets.

Not on the homepage: carousels, entry pop-ups, newsletter modals, a cookie wall (the banner offers Reject with equal weight).

### 4.2 Navigation and search

- City and optional date picker, not a free-text box. If text search exists, it completes only to cities, monuments and tours that exist.
- Destination first; date optional, because requiring a date hides tours when inventory is thin.
- Currency from location, with a visible switch, stored in a cookie and never in the address.
- "Starting from Delhi / Agra / Jaipur" toggle; "I'm in India now" chip showing what runs today or tomorrow.
- Recently viewed, stored on the device.

### 4.3 City hub and category pages

1. Heading with tour count and lowest price; two or three promoted filter chips (Private, Sunrise, Same-day from Delhi).
2. **Our pick:** one tour, with the reason.
3. Every tour in the city (10–30), "Load more" if needed.
4. Three dated facts ("Taj Mahal is closed on Fridays").
5. Guides for this city; reviews; questions.

A category page exists only with four or more tours and its own data. Filters that would return fewer than three results are not offered. An empty state always offers nearest dates, the private version, nearby cities and a WhatsApp link.

### 4.4 Tour card

Top to bottom, identical on every card:

1. Photo, 4:3, real, two or three swipeable; small guide portrait.
2. Duration · private or group size · pickup.
3. Title, 60 characters at most, two lines.
4. Rating as "4.8 (37)" once there are five reviews; before that, "New · Licensed guide". [E: purchase likelihood rises sharply by five reviews]
5. "Free cancellation".
6. "From $49 per person" — all-in, equal to the cheapest bookable option — and "Monument tickets included" or "not included".
7. One badge at most.

### 4.5 Tour page

**Phone order**

1. Gallery with counter. First image is the experience; one image is the meeting point.
2. Title, rating with count, "Licensed guide" badge.
3. Key facts: duration, private or shared, pickup, language, cancellation deadline.
4. Price box.
5. Three to five highlights.
6. **What you'll pay** table: what is included, and what is paid on the day with the amount.
7. Itinerary as a timeline, validated so times run in order.
8. Meeting point or pickup, with map.
9. Guide: photo, licence number and issuer, languages.
10. Reviews, with a "most critical" filter.
11. Questions, full cancellation policy, similar tours.

**Desktop:** the same order on the left; the price box is a sticky card on the right.

- **Sticky bar (phone):** "From $X per person · Check availability", shown once the price box scrolls away, hidden while the keyboard is open.
- **Time:** "Starts 05:30 India time, Sat 13 Mar. That's 19:00 Fri in New York."
- **Tickets:** if excluded, the price box says so with the amount, taken from the official source and dated.
- **Fridays** are blocked for Taj Mahal tours.
- About 60 words above the fold; the rest is scannable.

### 4.6 Availability and price

- Inline month calendar with a price on each date; sold-out dates greyed; first available date selected.
- Plus and minus steppers for adults and children, with age ranges.
- Private tours show the group total and "= $X per person"; tiers as a small table (1 / 2 / 3–4 / 5+).
- Add-ons are unticked boxes. Pre-ticked paid extras are unlawful in the EU. [E]
- A live total with "No booking fees."
- Launch tours confirm instantly. Inside the booking cut-off a tour becomes request-to-book: the card is authorised, not charged, and the page states when the hold lapses.
- Children: each option states its child age band and price. Shared departures show seats left only from live inventory.

### 4.7 Checkout

One page. No account. Six or seven fields.

1. Lead traveller name.
2. Email.
3. Phone with country code, with the reason shown ("so your guide can reach you"). [E: 14% abandon when a phone number is demanded unexplained]
4. "This number is on WhatsApp" tick.
5. Pickup hotel, which can be added later.
6. Payment: wallet buttons first, then card.

- A promo code is a collapsed "Have a code?" link.
- "You pay $148.00 USD. Your bank may add a foreign transaction fee. Your statement will show IndiaByLocal, India."
- On a failed bank security check, the reservation and the form are kept for 10–15 minutes, the cause is named plainly, and one tap retries with another method.
- By the pay button: secure-payment line, card logos, cancellation deadline, support link.
- The order summary stays visible: tour, date, both time zones, travellers, inclusions, total.
- Launch policy: pay now, free cancellation to 24 hours before. "Reserve now, pay later" is tested later, on orders above about $300.

### 4.8 After booking

- **Confirmation page** works offline: reference, both time zones, calendar file, meeting-point photo and map pin, inclusions, cancel link, support number, a scannable code.
- **Messages:** on booking; seven days before (dress, bags, ID); two days before (guide introduction, exact meeting photo, "ignore anyone who says your tour is cancelled or the monument is closed"); the evening before (pickup time, driver name and plate).
- **Review request** 2–24 hours after the tour, one tap. Any incentive goes to every reviewer whatever the rating and is disclosed. [E]
- **When it goes wrong:** if the guide has not arrived 15 minutes after the start, a replacement or a full refund begins that day.

## 5. What we will not do

Fake scarcity or countdown timers · strike-through prices without a real earlier price · fees added at checkout · pre-ticked extras · "from" prices no option matches · duplicate listings of one tour · imported reviews blended into our own rating · forced accounts · auto-rotating carousels · entry pop-ups.

## 6. Measurement

**Events:** view tour, gallery swipe, open calendar, select date, set participants, toggle add-on, click book, checkout start, contact complete, payment method chosen, payment submitted, bank check started, bank check failed (with reason), payment success, confirmation viewed, calendar added, WhatsApp opt-in, cancel, review submitted, refund, chargeback. Segmented by device, country, currency and lead time.

**First five tests, once traffic allows**

1. Wallet buttons above versus below the card form.
2. Tickets included by default versus excluded with disclosure, measured on conversion and review score.
3. Pay now versus reserve-now-pay-later above $300.
4. Two time zones versus India time only.
5. Sticky bar wording.

No tours-specific conversion benchmark was found; plan on 1–3% of sessions.
