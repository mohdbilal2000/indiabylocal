# Architecture

Versions were read from the npm registry on 11 Nov 2026. Pricing came from third-party pages and should be re-checked at sign-up. See [06-evidence.md](06-evidence.md).

## 1. Stack

| Layer | Choice | Why | Exit path |
|---|---|---|---|
| Framework | Next.js 16.4.6, React 19.3.1 | Static shell with live price streamed in; one framework for all three surfaces | OpenNext build on Cloudflare, run in CI each quarter |
| Language | TypeScript 7.0.2 | Current | Fall back to the last 5.x or 6.x if tooling breaks |
| Hosting | Vercel Pro (about $20/month) | Patches framework flaws at the platform first | As above |
| Database | Neon Postgres, Frankfurt | Point-in-time recovery; branches for drills and sandboxes | Standard Postgres dump restores anywhere |
| Data access | Drizzle 0.45.4, hand-written SQL migrations | Constraints stay explicit | Plain SQL |
| API | One service layer, exposed with oRPC 1.16.2 | Typed for the app, OpenAPI for agents | — |
| Auth | Better Auth 1.7.20, data in our database | Phone code, email link, Google, roles; no per-user fee | Data is ours |
| Jobs | Inngest 4.26.2, fed from an outbox table | Retries and schedules without running a queue | Outbox is provider-neutral |
| Images | Cloudflare R2 for originals; Cloudflare Images for variants | No egress charge; four fixed widths cap the bill | One loader file switches provider; Bunny Optimizer if transforms pass about $30/month |
| Search | Postgres full-text and trigram | Under 10,000 tours needs no search service | Typesense later |
| Maps | Google Maps (autocomplete, static, embed) | Best place data in India for meeting points | MapLibre with open tiles |
| Email | Resend | Free tier covers launch | Amazon SES |
| Supplier messages | WhatsApp Cloud API, direct from Meta | No reseller markup | — |
| Supplier codes | MSG91 SMS | Needs sender registration in India; allow days | Twilio |
| Styling | Tailwind CSS 4.3.5 | Tokens as CSS variables | — |
| Components | shadcn 4.23.0 on Base UI 1.9.0 | Unstyled primitives we style ourselves | — |
| Calendar | react-day-picker 10.0.2 | Switch to React Aria if locale needs grow | — |
| Gallery | embla-carousel-react 8.6.0 | Stable | — |
| Forms | react-hook-form 7.92, Zod 4.6.7 | — | — |
| Motion | CSS first; Motion 14.12 for components | — | — |
| Lint and format | Biome 2.6.6 | One tool | — |
| Tests | Vitest 5.1, Playwright 1.65, axe 4.14, Lighthouse CI | — | — |
| Errors and analytics | Sentry; PostHog with EU hosting and consent-gated replay | Consent rules not yet verified | — |

**One app, no monorepo.** Route groups for `(marketing)`, `(checkout)` and `(supplier)`. A `[locale]` segment exists from day one, with English only.

**Launch running cost:** about $30–55 a month.

### Security posture for the framework

Next.js had denial-of-service flaws in January and April 2026, a 13-advisory release in May, a critical image flaw in August, and two unauthenticated remote-code-execution flaws on 14 October, fixed in 16.4.1.

- Automatic patch updates with auto-merge from the first commit.
- Subscribe to the repository's security advisories; `npm audit` reportedly missed the October ones.
- Never pass an untrusted SVG to the image optimiser.
- A spend cap on hosting, and tour photos served from the image provider, not the host.

## 2. Rendering by page

| Page | Strategy |
|---|---|
| Home | Static shell, cached, revalidated by tag |
| City and category | Top pages prebuilt, the rest built on demand; revalidated when a supplier edits |
| Tour | Cached shell (content, reviews, structured data, "from" price); live price and availability streamed in |
| Search and filters | Rendered per request, not indexed; indexable combinations are category pages |
| Checkout | Never cached; server-side validation |
| Supplier dashboard | Per request, behind login, not indexed |
| Guides and articles | Static |

Price and availability never enter the cache. A CI check fails the build if an SEO route becomes dynamic by accident.

## 3. Data model

```
SupplierAccount (individual | agency; verification and payout live here)
  ├─ User (owner | manager | guide)
  ├─ GuideProfile (licences, languages, monument_eligible)
  ├─ Vehicle, Driver
  └─ Listing
       ├─ ListingOption (private | shared, with or without tickets)
       ├─ PricingRule (season range, per-person tiers, per-group flat)
       ├─ Departure (fixed-date capacity)  or  availability rules (private)
       └─ Media (original, focal point, alt text, quality flags)

Traveller ─ Booking ─ Assignment (guide, vehicle)
              ├─ Hold (expires_at)
              ├─ price and exchange-rate snapshot
              └─ Review (verified booking only; attaches to listing and guide)

LedgerEntry (immutable, double-entry, minor units + currency)
PaymentEvent (raw provider payload, unique on provider event id)
Outbox (written in the same transaction as the change it announces)
AuditLog (append-only; actor is human | agent | system; before and after)
PendingApproval (refund, payout, delete, bulk edit)
```

Both individual guides and agencies are modelled from day one; only the solo-guide interface ships first.

## 4. "Data never lost"

The provider losing data is the least likely failure. A bad migration, a leaked credential, or a mistake by a person or an agent is far likelier, so the design guards those.

1. Point-in-time recovery at the plan maximum; the production branch is protected.
2. Nightly encrypted dump to Cloudflare R2 with object lock, copied to Backblaze B2. Neither the app nor any agent holds delete credentials for either.
3. Monthly restore drill into a database branch: row counts match and the ledger sums to zero. An alert fires if the latest backup is older than 26 hours.
4. Soft deletes only. The app's database role has no delete, truncate or schema rights; migrations run under a separate role.
5. Append-only audit log with update and delete revoked.
6. Double-entry ledger; corrections are reversals, never edits.
7. Idempotency keys, enforced by a unique constraint, on every changing endpoint and payment call.
8. Raw payment events are stored before they are processed.
9. An outbox row is written in the same transaction as the booking; the job runner delivers and retries.

**Not covered:** a single-region provider outage stops bookings for its duration. There is no failover at launch; that is an accepted risk at this size.

## 5. Booking integrity

- **Fixed departures:** one conditional update — add to `held` only where `held + n <= capacity`. No row returned means sold out.
- **Private tours:** a database exclusion constraint on guide and time range across active bookings, so two bookings cannot overlap whatever the application does.
- **Holds** last 15 minutes, are swept by a job, and become a booking inside the transaction that processes the payment event.
- **Time:** stored as a timestamp with the tour's zone (`Asia/Kolkata`) and its local date and time. Displayed tour-local first, traveller-local second.
- **Price:** computed from rules, then snapshotted onto the booking with the exchange rate used.
- **Supplier price is in rupees, fixed.** The traveller price is derived from it; we carry the currency risk and price a 2–3% buffer into the margin.

## 6. Payments in code

The provider sits behind one interface with four operations: create a charge, receive an event, refund, and pay a supplier. Which provider fills it, and whether supplier payment is a split or a separate transfer, depends on decision D2 in [00-blueprint.md](00-blueprint.md). Nothing else in the system knows.

- Supplier funds are released only after the tour is marked complete and the card payment has settled.
- A refund writes the reversing ledger entries first, then calls the provider.
- Evidence is kept for disputes: check-in confirmation, messages, the confirmation email.

## 7. Supplier upload pipeline

1. Supplier opens a WhatsApp link and verifies by code.
2. They send the itinerary (PDF, Word, pasted text or a voice note in Hindi or English) and photos, by WhatsApp or the "Upload everything" picker.
3. In the browser, each photo is resized to 2560 px, converted from HEIC, stripped of location data, and uploaded straight to storage with per-file retry. The draft and queue are kept on the device, so a dropped connection loses nothing.
4. Instant checks for resolution, blur and exposure give each photo a green, amber or red badge with a one-line tip.
5. On the server, voice is transcribed; a Claude model extracts the listing into a fixed schema using structured outputs.
6. **Every extracted field carries the source text it came from, and code confirms that text really appears in the source.** Unsupported fields are left empty. Price, cancellation policy and meeting point are always confirmed by the supplier.
7. A small, fast model writes alt text, a caption and a focal point per photo and proposes three hero images.
8. The supplier reviews the original beside the English draft, with amber "please confirm" fields and a map pin.
9. Submit; admin spot-check; publish; WhatsApp confirmation.

Budget about $0.30 of model cost per listing (an estimate).

**Photo rules**

- **Blocked:** long edge under 1280 px; unsafe content; duplicates within a listing or across suppliers; watermarks, text overlays, collages, screenshots, logos.
- **Warned:** under 2048 px; blurry; too dark or blown out; fewer than six photos; none of the actual activity or guide; stock-looking.
- **Hero:** landscape, survives 4:3 and 16:9 crops, people doing the experience, no text.
- **Consent:** a tick when identifiable faces appear; identifiable children need consent.
- WhatsApp compresses photos, so suppliers are coached to send them as documents or use the picker.

## 8. AI agents in the system

- Agents never receive a database connection. They use a scoped interface over the same service layer as the app.
- Each agent has its own expiring key with the narrowest scope; row-level security is a second layer.
- Agent imports land as drafts.
- Refunds, payouts, deletions and bulk edits create a pending-approval record that a person approves.
- Every agent action is in the audit log with before and after.
- Experiments run on a database branch, never production.

## 9. Building with Claude Code without generic output

Tooling to adopt, each read in full and vendored at a pinned commit before use:

| Tool | Use |
|---|---|
| Anthropic `frontend-design` skill | Design plan before build; explicit list of generated-page tells |
| `impeccable` | Design commands and a rule-based detector that runs without a model |
| shadcn skill | Component and registry context |
| Vercel `web-design-guidelines`, `react-best-practices` | Review rules |
| `humanizer` | Strips generated-writing patterns from copy |
| Selected `marketingskills` (`ai-seo`, `schema`, `programmatic-seo`, `copywriting`) | Content and structured-data work |
| Next.js devtools and Chrome DevTools servers; Playwright | Runtime errors, traces, screenshots |

Trial after a code audit: Context7, an accessibility agent set, a Search Console server (read-only). The larger SEO skill bundles install scripts and hooks and need the closest reading.

**Project rules**

- Brand tokens and banned patterns in the project instructions.
- "Screenshot at 375 px and 1280 px before calling a screen done."
- No fabricated reviews, guide biographies or statistics, anywhere, ever.
- After each edit: format, lint and type-check the changed files. Before finishing: affected tests and the design detector.
- Edits to environment files and unpinned installs are blocked.

**Caution:** skills and plugins are instructions and scripts that run with our permissions. Star counts are not an audit. Output from documentation and SEO tools is untrusted text and never triggers an action.

## 10. Not yet verified

Neon's Mumbai region and recovery window per plan · next-intl's support for the current caching model (one-day spike before committing) · TypeScript 7 compatibility across the toolchain · analytics consent requirements · Cloudflare smart-crop and HEIC features · whether Google's India map pricing needs an Indian billing account.
