# Brick inventory

Every screen, component, message, job and admin function, with an ID and the phase that builds it. Phases are defined in [00-blueprint.md](00-blueprint.md). A brick is done when it meets the **common acceptance** below plus its own note.

**Common acceptance for any screen:** renders at 375, 768 and 1280 px; loading, empty, error and offline states exist; keyboard and screen-reader pass; meets its performance budget in [01](01-product-ux.md); copy reviewed against the voice rules in [08](08-experience.md); analytics events fire; no layout shift from late content.

## A. Foundations (Phase 0)

| ID | Brick | Note |
|---|---|---|
| F-01 | Repository scaffold, CI, automatic security updates | CI green on an empty app |
| F-02 | Design tokens as code: colour, type, space, radii, motion durations | One source; no hard-coded values elsewhere |
| F-03 | Fonts self-hosted, subset, with fallback metrics | No layout shift on font load |
| F-04 | Ornament set: jaali tile, city stamps (Agra, Delhi, Jaipur), guarantee seal, day-arc glyphs | SVG, each under 2 KB |
| F-05 | Agent guardrails: project rules, vendored skills at pinned commits, hooks | Edits to secrets blocked |
| F-06 | Locale routing with English; string catalogue; Hindi catalogue for supplier app | No hard-coded strings |
| F-07 | Consent manager with equal-weight Reject | No analytics before consent in EU/UK |
| F-08 | Error tracking, logging, uptime check, status page | Alert reaches the founder's phone |
| F-09 | Feature flags and experiment assignment | — |
| F-10 | Rate limiting and bot rules | Checkout and login protected |

## B. Component library (Phase 0–3)

| ID | Component | States to build |
|---|---|---|
| C-01 | Button (primary, secondary, quiet, destructive) | rest, hover, focus, pressed, loading, disabled |
| C-02 | Text input, phone input with country, select, textarea | empty, filled, focus, error, disabled |
| C-03 | Checkbox, radio, toggle, stepper | — |
| C-04 | Date picker (inline month, price per day, typed entry) | available, sold out, closed day, selected, today |
| C-05 | Bottom sheet / dialog / popover (one component, three presentations) | focus trap, return focus |
| C-06 | Toast and inline alert | info, success, warning, error |
| C-07 | Tour card | default, new (no rating), sold out on date, saved |
| C-08 | Day-arc (dawn-to-dusk stop line) | static, drawing, reduced motion |
| C-09 | Gallery with counter and story mode | swipe, buttons, keyboard |
| C-10 | Price box and sticky booking bar | per person, per group, tiered, with add-ons |
| C-11 | "What you'll pay" table | included, paid on the day |
| C-12 | Itinerary timeline | validates time order |
| C-13 | Guide card and licence badge | verified, monument-eligible, new |
| C-14 | Guarantee seal and summary | collapsed, open |
| C-15 | Dual-time display (India time and traveller time) | same day, different day |
| C-16 | Rating and review item, with critical-first filter | with supplier reply |
| C-17 | Trust bar, "Today in Agra" strip | live, stale (shows date) |
| C-18 | Skeletons matching each final layout | — |
| C-19 | Map: static image that becomes interactive on tap | — |
| C-20 | Header, city menu, currency and language switch, footer | signed in, guest |
| C-21 | Progress checklist (traveller pre-trip; supplier onboarding) | — |
| C-22 | Booking stamp celebration | once per booking; reduced motion |
| C-23 | Audio greeting player with captions | idle, playing, error |
| C-24 | Photo uploader with quality badges | queued, uploading, retry, green/amber/red |
| C-25 | Empty state and error state templates | — |

## C. Traveller screens

| ID | Screen | Phase |
|---|---|---|
| T-01 | Home | 3 |
| T-02 | City hub | 3 |
| T-03 | Category page | 3 |
| T-04 | Search and filter results, including no-results | 3 |
| T-05 | Tour page | 3 |
| T-06 | Guide profile ("my page") | 3 |
| T-07 | Fact / answer page (tickets, timings, scams) | 3, content in 7 |
| T-08 | Article page and article index | 7 |
| T-09 | Date and participants (sheet on phone, card on desktop) | 4 |
| T-10 | Checkout | 4 |
| T-11 | Payment failed / bank check failed recovery | 4 |
| T-12 | Confirmation (works offline) | 5 |
| T-13 | Trip page: countdown, checklist, unlocks, guide contact | 5 |
| T-14 | Manage booking by emailed link: change date, change travellers, cancel | 5 |
| T-15 | Cancel flow with refund amount and timing | 5 |
| T-16 | Chat with guide (contact masking) | 5 |
| T-17 | Day-of screen: guide on the way, match word, share my day | 5 |
| T-18 | Report a problem / emergency | 5 |
| T-19 | Review submission (two taps, then optional text and photos) | 5 |
| T-20 | Day card (shareable) and passport of stamps | 5 |
| T-21 | Sign in by email link or Google; account: bookings, saved, details | 5 |
| T-22 | Saved tours | 5 |
| T-23 | Receipt and tax invoice download | 5 |
| T-24 | The Promise (guarantee) page | 3 |
| T-25 | Safety page, including women travellers | 3 |
| T-26 | How it works; About and founder; Contact | 3 |
| T-27 | Help centre: questions by topic, search, WhatsApp handoff | 5 |
| T-28 | Legal: terms, privacy, cookies, cancellation and refund, review policy, how results are ranked, accessibility statement, company details | 7 |
| T-29 | 404, 500, offline, maintenance | 3 |
| T-30 | Free planning tool (itinerary, closures, arrival-card checklist) with email capture | 7 |
| T-31 | Referral: give and get credit | Later |
| T-32 | Promo code and gift | Later |

## D. Supplier app (installable web app, Hindi and English)

| ID | Screen | Phase |
|---|---|---|
| S-01 | Landing for guides: what you earn, how it works | 2 |
| S-02 | Sign up by phone code; language choice | 2 |
| S-03 | Earnings calculator ("you receive ₹X") — shown before the profile | 2 |
| S-04 | Profile: selfie, city, languages, years, guide or agency | 2 |
| S-05 | Upload everything: itinerary by file, text or voice; photos | 2 |
| S-06 | Draft review: original beside English, confirm card by card | 2 |
| S-07 | Photo coach: eight-shot checklist, example pairs, camera overlay | 2 |
| S-08 | Price and options: per person or group, tiers, tickets included or not | 2 |
| S-09 | Availability calendar: tap to block | 2 |
| S-10 | Listing score: three things that get more bookings | 2 |
| S-11 | Public page preview and share (link, QR, share card) | 2 |
| S-12 | Today: next tour, one pending action, money line | 5 |
| S-13 | New booking alert: accept or decline | 5 |
| S-14 | Bookings list and booking detail | 5 |
| S-15 | Chat with traveller | 5 |
| S-16 | Mark tour complete; report an issue | 5 |
| S-17 | Earnings: paid, on the way with date, upcoming; statement download | 5 |
| S-18 | Verification: licence, identity, bank or UPI; status of each | 2 |
| S-19 | Reviews and reply, with translation | 5 |
| S-20 | Tier and standing: criteria, strikes, how to appeal | 6 |
| S-21 | Agreement and electronic signature | 2 |
| S-22 | Help: WhatsApp, hours, voice note | 2 |
| S-23 | Agency: team members, guides, vehicles, assignment | Later |

## E. Admin console

| ID | Function | Phase |
|---|---|---|
| A-01 | Sign in with second factor; roles | 1 |
| A-02 | Verification queue: documents, licence check, monument-eligible flag | 2 |
| A-03 | Listing moderation: diff view, approve, send back with reason | 2 |
| A-04 | Photo moderation overrides | 2 |
| A-05 | Bookings: search, view, timeline of events | 4 |
| A-06 | Approval queue: refunds, payouts, deletions, bulk edits | 6 |
| A-07 | Payout run and reconciliation against bank and gateway | 4 |
| A-08 | Ledger viewer and trial balance | 4 |
| A-09 | Dispute and chargeback evidence pack | 5 |
| A-10 | Incident console: severity, suspend supplier, refund first | 5 |
| A-11 | Review moderation and reported reviews | 5 |
| A-12 | Promise claims: no-show, shopping stop, mismatch | 5 |
| A-13 | Content: fact pages with "verified on" date, articles, city facts | 7 |
| A-14 | Supplier management: tier, strikes, notes | 6 |
| A-15 | Traveller management: data export and erasure requests | 6 |
| A-16 | Audit log viewer | 6 |
| A-17 | Agent activity: what each agent proposed and did | 6 |
| A-18 | Flags, experiments, currency rates, monument closures and ticket prices | 3 |
| A-19 | Dashboards: funnel, supply health, money, search and AI visibility | 6 |

## F. Messages

Each has an English traveller version or an English and Hindi supplier version. WhatsApp templates need Meta's approval, so they are submitted in Phase 2.

| ID | Message | Channel | To |
|---|---|---|---|
| M-01 | Sign-in link | Email | Traveller |
| M-02 | Booking confirmed, with calendar file | Email, WhatsApp | Traveller |
| M-03 | Request received / accepted / declined | Email, WhatsApp | Traveller |
| M-04 | Payment failed, try again | Email | Traveller |
| M-05 | Seven days before: what to bring | Email | Traveller |
| M-06 | Two days before: meet your guide, exact meeting photo, scam warning | Email, WhatsApp | Traveller |
| M-07 | Evening before: time, driver name and plate, sunrise time | WhatsApp | Traveller |
| M-08 | Guide on the way | WhatsApp | Traveller |
| M-09 | Change or cancellation confirmed; refund issued | Email | Traveller |
| M-10 | How was your day? | Email, WhatsApp | Traveller |
| M-11 | Your day card | Email | Traveller |
| M-12 | Abandoned checkout, one reminder, where lawful | Email | Traveller |
| M-13 | Phone code | SMS | Supplier |
| M-14 | Finish your listing (deep link to the card) | WhatsApp | Supplier |
| M-15 | Listing live / sent back with reason | WhatsApp | Supplier |
| M-16 | New booking: accept or decline | WhatsApp | Supplier |
| M-17 | Tour tomorrow | WhatsApp | Supplier |
| M-18 | Payout on the way / paid / returned by bank | WhatsApp | Supplier |
| M-19 | New review | WhatsApp | Supplier |
| M-20 | Document needed, and why | WhatsApp | Supplier |
| M-21 | Incident, failed payout, stale backup, failed job | WhatsApp, email | Founder |

## G. Background jobs

| ID | Job | Schedule |
|---|---|---|
| J-01 | Release expired holds | Every minute |
| J-02 | Deliver outbox events with retry | Continuous |
| J-03 | Process stored payment events once | On arrival |
| J-04 | Request-to-book expiry and card release | Every 5 minutes |
| J-05 | Pre-trip and review messages | Scheduled per booking |
| J-06 | Mark tours complete; open payout eligibility after settlement | Hourly |
| J-07 | Payout run, after approval | Daily |
| J-08 | Reconcile gateway settlements against the ledger | Daily |
| J-09 | Exchange-rate refresh | Hourly |
| J-10 | Sunrise, weather and closure data for the "Today" strip | Daily |
| J-11 | Sitemaps and search-engine pings | On publish |
| J-12 | Image variants, alt text, quality flags | On upload |
| J-13 | Listing import: transcribe, extract, verify quotes | On upload |
| J-14 | Nightly backup to two providers; backup-age alert | Nightly |
| J-15 | Monthly restore drill | Monthly |
| J-16 | Erasure requests: remove or anonymise personal data | Daily |
| J-17 | Search index refresh | On change |
| J-18 | AI-visibility prompt panel and crawler-hit report | Monthly |

## H. Data and services (Phase 1 and 4)

| ID | Brick |
|---|---|
| D-01 | Schema and migrations for every entity in [02](02-architecture.md), with status enums |
| D-02 | Booking state machine: held → pending payment → requested → confirmed → completed → reviewed; cancelled, expired, refunded, disputed |
| D-03 | Payout state machine: not due → eligible → approved → sent → paid; returned, held |
| D-04 | Listing state machine: draft → submitted → live; sent back, paused, removed |
| D-05 | Database roles and row-level rules |
| D-06 | Ledger service with reversal-only corrections |
| D-07 | Pricing service: rules, tiers, add-ons, currency, rounding per currency |
| D-08 | Availability service: holds, exclusion constraint, cut-offs |
| D-09 | Payment provider interface: charge, event, refund, pay supplier |
| D-10 | Identity: travellers, suppliers, admins, agent keys |
| D-11 | Media service: presigned upload, variants, focal point |
| D-12 | Search service |
| D-13 | Notification service with template catalogue |
| D-14 | Ranking service, with the published explanation of how results are ordered |
| D-15 | Listing quality score, with every point explained |
| D-16 | Agent interface: scoped tools, drafts only, approval records |

## I. Search and structured data (Phase 3)

| ID | Brick |
|---|---|
| X-01 | Title, description and heading templates per page type |
| X-02 | Structured data per page type, validated in CI |
| X-03 | Canonical, pagination and filter-indexing rules |
| X-04 | Sitemaps: pages, images |
| X-05 | Crawler policy file |
| X-06 | Language and region tags, ready for more languages |
| X-07 | Internal-link modules: hub to category to tour, article to tour, guide to tours |
| X-08 | Social share images per tour, guide and day card |
| X-09 | Search Console and Bing Webmaster verification; log-based crawler report |

## J. Quality gates (every phase)

| ID | Gate |
|---|---|
| Q-01 | Unit and integration tests; concurrency tests for booking and payout |
| Q-02 | End-to-end tests on phone, tablet and desktop viewports |
| Q-03 | Visual regression screenshots |
| Q-04 | Accessibility checks, automated and manual |
| Q-05 | Performance budgets |
| Q-06 | Design review: detector for generic patterns, plus a human pass |
| Q-07 | Copy review against the voice rules |
| Q-08 | Security review before launch |
| Q-09 | Restore drill |
