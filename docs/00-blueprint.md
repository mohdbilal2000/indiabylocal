# Blueprint

Written 11 Nov 2026, revised 12 Nov after an independent audit scored the first version 5.5 out of 10. Sources, and how well each area was verified, are in [06-evidence.md](06-evidence.md).

## 1. What we are building

**Positioning:** private India tours with a named, licence-verified guide and a no-shopping-stop guarantee, at one all-in price.

**Who it is for first**

1. US, UK, Canadian and Australian couples aged 45–65 on a first Golden Triangle trip. They pre-book, care about safety and vetting, and buy private car-plus-guide days worth $150–250.
2. Diaspora families visiting with foreign-born children. Cheap to reach through community groups, and they travel in Dec–Jan and Jun–Aug.

Verified women guides for solo female travellers run across both as a trust layer.

Continental Europe is entered later and through guides who speak the language, not through translation. See [10-markets.md](10-markets.md).

**What we sell, in order:** excitement (you can already picture the morning), safety (you know who is meeting you), and the Promise (your money back if it is not what we showed). See [08-experience.md](08-experience.md).

**Where it starts:** the site's catalogue covers 67 destinations across India, as built in the preview. Supply, first-hand content and reviews start in Agra and Delhi, then Jaipur; a destination page with no vetted guide says so plainly. Day tours only at launch (see the package-travel rule in [03](03-payments-tax-legal.md)).

**Five things we do that the incumbents do not**

| # | Differentiator | Why it is defensible |
|---|---|---|
| 1 | Licence number and photo on every guide profile, checked by us | Everyone claims "licensed guides"; nobody shows the number |
| 2 | Refund if a tour includes an undisclosed commission shopping stop | The most documented complaint about Agra tours |
| 3 | One all-in price, with monument tickets as an explicit line | The foreigner ticket is where most "hidden cost" reviews come from |
| 4 | Tour time shown in India time and the traveller's time, everywhere | Nobody does it; a 05:30 pickup is booked from New York |
| 5 | Supplier commission fixed in writing, rupee amount guaranteed | GetYourGuide raised some operators from 20% to 30% in 2025 |

**What does not differentiate us:** price. AsiaByLocals also claims a 20% take and an Agra-guide founder story. We win on depth in India, honesty of the listing, and execution.

## 2. What AsiaByLocals actually looks like

Read directly from their site on 11 Nov 2026.

| Observation | Consequence for us |
|---|---|
| Built on Next.js, like our plan | Our stack is not an advantage by itself; craft and data are |
| Agra hub page is 1.9 MB of HTML, of which 454 KB is structured data | A fast, lean hub page is an easy visible win |
| Agra hub shows filters such as "Cherry blossom & seasons 63" and "Elephants & wildlife 30", and a count of 560 | Their categories leak across countries; ours are scoped per city |
| A tour headed "from $32" lists options at $15, $32 and $55 | "From" price must equal the cheapest bookable option, enforced in code |
| That tour's itinerary shows a 5:00 PM step between 5:00 AM and 5:30 AM, says pickup is in Agra and the return is to Delhi, and spells it "Tai Mahal" | Itinerary times are validated as a sequence; copy is reviewed |
| Page title is cut off ("…Private Day Tour With 5*") and the meta description is the first line of body text | Titles and descriptions are written per page, with length checks |
| On mobile the gallery is below a promo banner, title and rating; the WhatsApp bubble covers the Search button on the homepage | Gallery first on mobile; floating elements never cover controls |
| No hreflang tags; about 40 cities across Asia and the Gulf on the homepage | Thin spread; we go deep in three cities |
| Supplier page claims "35,000+ suppliers" and "40 million+ global monthly platform users"; Trustpilot showed zero reviews | We publish only numbers we can prove |
| More than a dozen near-identical "From Delhi: Taj Mahal & Agra…" listings on the Agra hub | One canonical listing per real product, with options inside it |

Their images did not load in our test because their image host is blocked in this environment; that is our limitation, not their bug.

## 3. Decisions that block work

These three need an answer before money is spent. Each has a recommendation.

### D1. The name

TOURSBYLOCALS is a registered trademark in the US (Reg. 6040623) and Canada (TMA957954) for arranging tours. "IndiaByLocal" uses the same construction for the same service and is one word away from AsiaByLocals, which already sells India tours. Two independent research tracks flagged this.

- **Risk:** opposition or a confusion claim in exactly the markets we target; weak protection because the name is geographically descriptive.
- **Recommendation:** commission a clearance search (US, UK, EU, Canada, Australia, India) before incorporating, and choose a fallback name now. The repository name can stay.
- **Sequence:** build work in Phases 0 and 1 does not depend on the name, so it starts now. Incorporation does, so the search comes before it.

### D2. How traveller money reaches guides

The research plan was Razorpay Route, which splits a payment between the platform and the supplier. Razorpay's own documentation rules that out:

- International payments are **not supported** on Route.
- Route also requires prior turnover (over ₹40 lakh domestic or ₹5 lakh export), with a self-declaration path in the first year.
- Razorpay's stated alternative is that payments settle in full to our account and we then transfer to suppliers.

That alternative means traveller money sits in our account before guides are paid. Whether a marketplace may do that without its own payment-aggregator authorisation is a legal question, not an engineering one.

| Option | For | Against |
|---|---|---|
| **A. Razorpay checkout, settle to us, pay guides by bank transfer** (recommended to investigate first) | Works with foreign cards today; documented by Razorpay | Needs written confirmation from Razorpay and a lawyer that it is permitted for our model |
| B. Another aggregator with an international split product (Cashfree, PayGlocal) | Keeps money out of our account | Not verified that either supports it |
| C. Foreign entity with Stripe Connect as merchant of record | Best card acceptance and wallets | Second company, transfer pricing, foreign-exchange rules; not for launch |

**Recommendation:** ask Razorpay and Cashfree the question in writing this week, and take the answers to a chartered accountant with the tax questions in D3. The code isolates the payment provider behind one interface so the answer does not change the rest of the build.

### D3. Tax position

Take these to a chartered accountant before registering:

1. Are we an agent earning commission (18% GST on our share), or the tour operator (5% GST on the whole booking with no input credit)? The agent model is what the whole plan assumes.
2. Is our commission on a foreign traveller's booking an export of services?
3. How are guides below the ₹20 lakh registration threshold treated, and what do we withhold (GST TCS under section 52, income-tax TDS on e-commerce payouts)?

The answers move what we keep from roughly 11.5% to 14.6% of the booking value. See [03](03-payments-tax-legal.md).

## 4. Decisions already made

Where the research tracks disagreed, this is the ruling.

| Topic | Ruling | Reason |
|---|---|---|
| Framework | Next.js 16.4.6, React 19.3.1, one app | One framework covers SEO pages, dashboard and checkout |
| Hosting | Vercel Pro, built so it can move | Platform patches security flaws first; free tier bans commercial use |
| Database | Neon Postgres, Frankfurt | Recovery to a point in time, cheap branching for restore drills; EU location for EU travellers |
| Mobile navigation | Top bar with city links; no bottom tab bar at launch | A bottom tab bar would collide with the sticky booking bar |
| Homepage hero | City tiles, not a free-text search box | With about 100 tours, free text dead-ends |
| Monument tickets | Every monument tour offers a "tickets included" option, selected by default where the supplier can pre-buy; an exclusion is shown in the price box with the amount | Resolves the two tracks that disagreed; either way the traveller sees the real total |
| Guide contact | Name, photo and licence at booking; in-platform chat at once; phone number 48 hours before | Reassures the traveller without inviting off-platform deals |
| Supplier payout promise | "Within 48 hours of the tour, once the card payment has settled" | International cards settle about seven working days after payment and most bookings are made less than a week ahead, so an unconditional 48-hour promise would need our own cash float |
| Card image ratio | 4:3 everywhere | Matches what suppliers already shoot for other platforms |
| Breakpoints | 640 / 768 / 1024 / 1280 for the page shell; container queries for components | Framework defaults; fewer custom rules |
| Multi-day tours | Not at launch | Bundled transport plus accommodation can make us a package organiser under EU and UK law |
| Languages | Traveller site in English at launch; supplier app in Hindi and English. German, French, Spanish follow, each gated on three vetted guides who speak it | The European search is "guide who speaks my language" |
| Video | No hosted long video at launch. Tap-through stills and a 10-second spoken hello from the guide | Gives the page a voice at about 40 KB, loaded only on tap |
| Motion | Five named signature interactions, about 11 KB together, replacing the earlier "one signature moment" | The first spec was flat; see [08](08-experience.md) |
| Palette and fonts | Locked: indigo and marigold, plus gulal rose for celebration and peacock teal for anything verified. Fraunces and Inter | Teal used only on verified things gives safety its own colour |
| Confirmation | Launch suppliers are hand-vetted and confirm instantly from their calendar. Request-to-book applies only inside the booking cut-off | Most travellers book under a week ahead; Google's listings need instant confirmation |
| The guarantee | Called "the Promise", six plain commitments with terms one tap away | "Guarantee" and "safe" are claims regulators test |

## 5. Expectations to hold

- **Search:** head terms such as "Taj Mahal tour" are not winnable within 24 months. Year one is long-tail and question queries. See [05](05-growth-seo.md).
- **Margin:** a 20% take leaves about 11.5% of booking value before marketing and support. Paid search at $30–60 per booking loses money on a day tour.
- **Year one:** the planning model in [05](05-growth-seo.md) gives about 670 bookings and $94k in bookings, which leaves roughly $11k. It is a model, not a forecast. Year one buys reviews, rankings and supply, not income.
- **Market:** arrivals to India in 2025 were about 9 million, still below 2019, and a conflict in West Asia cut 2026 leisure bookings by 15–25%. Foreign visitors to the Taj Mahal number about 645,000 a year.
- **Season:** peak is October to March. Registration and gateway approval take roughly 7–11 weeks and one person is building, so the full product will not be live this season. A small pilot in February and March 2027, with 5–10 guides and payment by gateway link, earns the first reviews. The full product must be live by July 2027 to catch 2027–28.

## 6. Build order

Each phase ends with something that can be checked. Nothing in a later phase starts until the check passes. Every individual brick — 25 components, 32 traveller screens, 23 supplier screens, 19 admin functions, 21 messages, 18 jobs — is listed with an ID and its phase in [09-inventory.md](09-inventory.md).

### Phase 0 — Ground (now; no code depends on D1–D3)

- Clearance search on the name; fallback chosen.
- Written answers from Razorpay and Cashfree on D2; accountant's ruling on D3.
- Repository scaffold: Next.js app, lint and type checks, test runner, CI, automatic security updates.
- Agent guardrails: project instructions, design skills vendored at pinned commits, hooks. See [02](02-architecture.md).
- Design tokens committed as code from [01](01-product-ux.md).

**Done when:** CI is green on an empty app that renders the type scale and palette at 375 px and 1280 px, and the three decisions have owners and dates.

### Phase 1 — Data that cannot be lost

- Schema: accounts, guides, listings, options, pricing rules, availability, bookings, ledger, audit log, outbox, raw payment events.
- Database roles: the app cannot delete or alter; migrations use a separate role.
- Nightly backups to two providers with no delete rights; restore drill script.
- Authentication: email link and Google for travellers, phone code for suppliers, roles for admin.

**Done when:** a restore drill rebuilds the database from last night's backup and the ledger sums to zero, automatically, in CI.

### Phase 2 — Supply

- Supplier sign-up by phone, Hindi and English.
- "Upload everything": itinerary by file, text or voice note; photos with on-device checks; AI draft with source quotes; review screen.
- Price calculator ("you receive ₹X, traveller pays $Y"), availability calendar, quality score.
- Verification: licence, identity, bank account; admin review queue.

**Done when:** five real Agra guides each publish a listing from their phone in under 15 minutes without help.

### Phase 3 — Catalogue and discovery

- Homepage, city hub, category pages, tour cards, tour page, guide profile.
- Structured data, sitemaps, canonical rules, crawler policy.
- Performance budgets enforced in CI.

**Done when:** every page type passes its budget on a mid-range Android profile and validates in a structured-data test.

### Phase 4 — Booking and payment

- Date and participant selection, holds with expiry, option and add-on pricing.
- One-page guest checkout; wallets first; failed-payment recovery.
- Payment events stored raw, processed once; refunds; payout schedule per D2.

**Done when:** a test suite proves no double booking under concurrent requests, no double payout under repeated payment events, and a refund reverses the ledger exactly.

### Phase 5 — After booking

- Confirmation page that works offline; calendar file; pre-trip messages.
- Chat with contact masking; guide acceptance by WhatsApp.
- Reviews from verified bookings only; incident form and refund flow.

**Done when:** a full booking can be made, changed, cancelled, completed and reviewed end to end on a phone.

### Phase 6 — Operations and agents

- Admin console: approval queue for refunds, payouts, deletions and bulk edits.
- Agent access through a scoped interface; every action logged.
- Monitoring, error tracking, alerts on stale backups and failed payouts.

**Done when:** an agent can draft a listing and propose a refund, and neither takes effect without approval.

### Phase 7 — Content and launch

- First 30 pages from the content plan, each with first-hand data and a "verified on" date.
- Legal pages; cookie consent; accessibility audit; security review.
- Soft launch with 15–25 Agra and Delhi products.

**Done when:** the first 30 paid bookings are completed with reviews and no unresolved incident.

### Later

Jaipur, then Varanasi and Rishikesh; German, French and Spanish with human editing; Google Things to do feed; wallet passes; multi-day tours after legal sign-off; an interface for outside AI agents to book.

## 7. Risks, in order

1. Name conflict (D1).
2. Payment structure not permitted as planned (D2).
3. Tax characterisation wrong (D3).
4. A safety incident, or an unlicensed guide inside a monument.
5. Thin margin if customer acquisition cost passes about $8–10 per booking.
6. Chargebacks on US cards after the guide has been paid.
7. Framework security flaws left unpatched.
8. One founder covering support around the clock.
