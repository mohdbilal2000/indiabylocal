# Evidence, limits and sources

Research ran on 11 Nov 2026 as 13 parallel tracks, followed by direct checks of AsiaByLocals and Razorpay's documentation.

## 1. How far to trust each part

| Area | Verified directly | Rests on search summaries or third-party pages | From prior knowledge, not re-checked |
|---|---|---|---|
| Package versions | npm registry | — | — |
| AsiaByLocals | Homepage, Agra hub, one tour page, supplier page, robots.txt, read and screenshotted | Commission, cancellation and vetting claims | — |
| Razorpay | Route eligibility, Route and international payments, settlement currency and cycle, payment methods (official docs) | International card fee (3%), chargeback handling | — |
| Framework security history | — | Advisory dates and counts | — |
| Database, hosting, auth pricing | — | All pricing | Some AWS figures |
| Tax | GST notification text | Rates, thresholds, the March 2026 change | — |
| Guide licensing | — | Parliamentary replies and press via search | — |
| UX research | NN/g, Arival, Stripe, regulators | Most Baymard figures | Some Baymard checkout numbers |
| Browser support | MDN release notes | caniuse figures | WCAG criteria, Core Web Vitals thresholds |
| Search and AI visibility | Ahrefs studies, the GEO paper | Google documentation | — |
| Market data | — | Tourism ministry figures via press | Company formation costs and times |
| Trademarks | US and Canadian register entries for TOURSBYLOCALS | — | — |

## 2. Known gaps

- **Not researched:** Indian competitors (Tripoto, MakeMyTrip experiences, India Someday); supplier forums and Reddit threads; Crunchy Bridge, Xata, Trigger.dev, Temporal; imgix, UploadThing, Supabase Storage; Netlify and AWS hosting.
- **Not found:** published A/B results from GetYourGuide, Viator, Klook or Airbnb; a tours-specific conversion benchmark; arrivals from Germany, France, Italy, the Netherlands and Spain; the size of the inbound tours market; published prices from identity-verification providers.
- **Unresolved:** whether Route's alternative (settle, then pay suppliers) is permitted for a marketplace; whether Cashfree or PayGlocal split international payments; whether a basic-level certified guide may work inside protected monuments; analytics consent requirements; whether the accessibility law's micro-enterprise exemption covers a seller outside the EU.
- **AsiaByLocals:** the booking and checkout flow and the supplier sign-up form were not walked through. Their images did not load in our test because their image host is blocked here.
- **Keyword difficulty** is estimated; the keyword-data tool did not connect.

## 3. Where the tracks disagreed

| Topic | Positions | Ruling |
|---|---|---|
| Supplier payout | "24–48 hours after the tour" vs international settlement in about seven working days | Promise is conditional on settlement |
| Payment split | Research plan: Razorpay Route | Overturned by Razorpay's documentation: no international payments on Route |
| Mobile navigation | Bottom tab bar vs top bar | Top bar; a tab bar would collide with the sticky booking bar |
| Monument tickets | Default included vs default paid at the gate | Included option offered and default where possible; exclusion shown with amount |
| Guide phone number | 48 hours before vs at booking | In-platform chat at booking; number 48 hours before |
| Card image ratio | 3:2 vs 4:3 | 4:3 |
| Breakpoints | 360/600/900/1200/1440 vs 640/768/1024/1280 | Framework defaults plus container queries |
| Year-one take | $22k (card costs only) vs 11.5% contribution on a rebuilt forecast | About $11k |
| Entry tickets and commission | Not raised in round one | Open: whether tickets passed through at cost carry the 20% |
| Accessibility exemption | Exempt as a micro-enterprise vs in scope | Build to WCAG 2.2 AA regardless |

## 4. The second pass (12 Nov 2026)

The founder judged the first blueprint not good enough: no life in the experience, and not everything asked for was delivered. Five more tracks ran: emotional design, per-market search, traveller voice and guarantees, supplier experience, and an independent audit that read every document against the original request.

### The audit's scores for the first version

| Area | Score | What changed in response |
|---|---|---|
| Emotional appeal | 2 | [08-experience.md](08-experience.md): concept, moments map, five signature interactions, voice, ornament, two accent colours |
| Tier-1 market targeting | 3 | [10-markets.md](10-markets.md): eight markets, language roadmap, localisation per market |
| Competitor dominance | 3 | Indian and specialist competitors researched; competitor screens viewed; still the weakest area (below) |
| Brick-by-brick breakdown | 4 | [09-inventory.md](09-inventory.md): about 200 bricks with IDs and phases |
| UI/UX psychology | 5 | Traveller fears and delights from reviews; lead emotion per segment |
| Legal readiness | 5 | Promise wording with legal cautions; registration costs remain estimates |
| AEO/GEO | 6 | 30-prompt panel, monthly procedure, entity plan |
| Use of existing tooling | 6 | Unchanged: tools are shortlisted, not yet read and pinned |
| Tech stack | 7 | Region stated; recovery targets added |
| Supplier ease | 7 | Supplier app screens, Hindi copy, motivation rules |
| Pricing and commission | 7 | Arithmetic corrected; loss-making channels removed |
| SEO | 7 | Page templates; corrected facts |
| Data durability | 8 | Recovery targets, photo backup, erasure handling |
| **Overall** | **5.5** | — |

These are the auditor's scores for the first version. The revised version has not been re-scored.

### Errors the audit found, now fixed

- The refund line in the unit economics did not follow from its inputs (0.22; correct is 0.28). Contribution is 11.5%, not 11.6%.
- A currency buffer was "priced in" in one document and absent from the price in another.
- Channels were recommended that cost more than a booking earns (10% hotel referral, travel advisers, reselling on large platforms).
- The forecast put fast growth in May to July, when demand halves, and was built from a traffic guess. It is rebuilt from bookings by channel: about 670 bookings, not 980.
- A February 2027 soft launch did not fit 7–11 weeks of registration plus the build. It is now a small pilot.
- An example date named the wrong weekday, and a cancellation example fell after the tour started.
- Photos: five in one place, six in another. Now six to publish, eight to aim for.
- "Soft deletes only" conflicted with the duty to erase personal data on request.
- The first version said every claim traced to this file. It does not: this file grades areas, not individual claims.

### Still short of 10 out of 10

- **Competitor screens.** GetYourGuide and Klook refused automated access; Viator, ToursByLocals and Withlocals were not viewed. No competitor's checkout was walked through.
- **Search volumes.** The keyword tool did not connect, so no volume or difficulty figure is measured.
- **Traveller voice.** Built from search snippets; few first-person quotes; nothing found for families, diaspora or backpackers.
- **Legal costs and steps in Agra.** Still estimates from general knowledge; no office-by-office checklist.
- **Data model.** Entities and state machines are named; columns and indexes are written when Phase 1 starts.
- **Tooling.** The recommended skills and repositories have not been read line by line or pinned.
- **No visual design exists yet.** One prototype screen shows the direction; it is not a design system.

### What the tracks were

Round one: frontend framework; backend and durability; payments and tax; media, search and messaging; UI stack and Claude tooling; competitor teardown; visual identity; discovery pages; tour page and checkout; responsive, motion and performance; SEO/AEO/GEO; supplier side; market and legal.
Round two: emotional design; per-market SEO/AEO/GEO; traveller voice and guarantees; supplier experience; independent audit.

## 5. Myths this plan ignores

- "Blue means trust; orange means buy."
- "Serifs are more trustworthy" or "more readable".
- "Users decide in exactly 50 milliseconds."
- "Germans need formal copy; Americans need hype."
- "Urgency timers always lift conversion."
- "45–75 characters per line is scientifically proven."
- "`llms.txt` gets you cited."

## 6. Sources

### Competitors and commissions
- https://www.asiabylocals.com/ · /india/agra · /india/agra/taj-mahal-agra-private-day-tour-with-lunch · /supplier (read directly)
- https://au.trustpilot.com/review/asiabylocals.com
- https://arival.travel/article/getyourguide-commission-increasing-for-some-operators
- https://getyourguide.supply/join/how-much-does-getyourguide-charge
- https://operatorresources.viator.com/updated-supplier-agreement-august-2026/
- https://www.toursbylocals.com/travel-blog/how-toursbylocals-selects-guides
- https://helpcenter.withlocals.com/en/articles/633891
- https://www.airbnb.com/help/article/384

### Payments, tax, regulation
- https://razorpay.com/docs/payments/route.md (read directly)
- https://razorpay.com/docs/payments/route/faqs.md (read directly)
- https://razorpay.com/docs/payments/international-payments.md (read directly)
- https://razorpay.com/docs/payments/international-payments/faqs.md (read directly)
- https://razorpay.com/docs/payments/route/transfer-fees-example.md (read directly)
- https://support.stripe.com/questions/stripe-accounts-are-invite-only-in-india
- https://www.cyrilshroff.com/wp-content/uploads/2025/10/Client-Alert-RBI-Introduces-Consolidated-Framework-for-Payment-Aggregators-3.pdf
- https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=56662
- https://gstcouncil.gov.in/sites/default/files/2024-05/notfctn-65-central-tax-english.pdf
- https://cleartax.in/s/gst-on-tours-travels
- https://cleartax.in/s/tcs-under-goods-and-services-tax
- https://www.grantthornton.in/insights/articles/gst-on-intermediary-services/
- https://blog.tdsman.com/2026/07/tds-on-e-commerce-transactions-section-3931-194o/

### Consumer law
- https://www.linklaters.com/en/insights/blogs/linkingcompetition/2025/june/consumer-deep-dive_understanding-drip-pricing-under-the-dmcc
- https://competitionandmarkets.blog.gov.uk/2026/04/17/direct-consumer-enforcement-one-year-on/
- https://www.federalregister.gov/documents/2024/08/22/2024-18519/trade-regulation-rule-on-the-use-of-consumer-reviews-and-testimonials
- https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions
- https://commission.europa.eu/news-and-media/news/package-travel-stronger-rights-travellers-and-simpler-rules-travel-industry-2026-05-28_en
- https://www.which.co.uk/news/article/booking-com-still-misleading-holidaymakers-with-1-room-left-claims-aSNln2j8gkGl
- https://www.gov.uk/government/news/hotel-booking-sites-to-make-major-changes-after-cma-probe
- https://www.barandbench.com/view-point/meity-notifies-final-digital-personal-data-protection-rules-2025

### Trademarks
- https://trademarks.justia.com/884/43/toursbylocals-88443035.html
- https://ised-isde.canada.ca/cipo/trademark-search/1735098

### Guides and licensing
- https://tourism.gov.in/sites/default/files/2020-04/usq%202713%20for%2017032020.pdf
- https://tourism.gov.in/sites/default/files/2024-02/IITFC%20modified%20guideline%2011012021.pdf
- https://iitf.gov.in/IITF-Booklet.pdf
- https://www.iato.in/pages/view/25

### UX and behaviour
- https://baymard.com/blog/homepage-carousel
- https://baymard.com/blog/product-listing-information
- https://baymard.com/blog/promoting-product-filters
- https://baymard.com/blog/no-results-page
- https://baymard.com/blog/explain-phone-number-field
- https://baymard.com/blog/line-length-readability
- https://baymard.com/research/travel-tours-experience-booking
- https://www.nngroup.com/articles/hamburger-menus/
- https://www.nngroup.com/articles/scrolling-and-attention/
- https://www.nngroup.com/articles/photos-as-web-content/
- https://stripe.com/blog/testing-the-conversion-impact-of-50-plus-global-payment-methods
- https://tobin.yale.edu/research/price-salience-and-product-choice
- https://spiegel.medill.northwestern.edu/How-Online-Reviews-Influence-Sales
- https://papers.ssrn.com/abstract=2624181 (host photos and trust)
- https://abcwest.cogs.indiana.edu/pmwiki/pdf/scheibehenne.options.2010.pdf (choice overload)
- https://research.adobe.com/publication/towards-individuated-reading-experiences-different-fonts-increase-reading-speed-for-different-individuals
- https://pmc.ncbi.nlm.nih.gov/articles/PMC4383146 (colour psychology review)
- https://pubsonline.informs.org/doi/fpi/10.1287/mnsc.2021.4175 (photo quality and bookings)
- https://arival.travel/mobile-bookers-spend-more-leave-more-reviews/
- https://go2.advertising.expedia.com/rs/185-EIA-216/images/Expedia_Group-Path2Purchase-2023.pdf

### Performance, motion, accessibility
- https://web.dev/case-studies/milliseconds-make-millions
- https://almanac.httparchive.org/en/2025/performance
- https://developer.mozilla.org/en-US/Firefox/Releases/159
- https://web.dev/blog/web-platform-10-2026
- https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
- https://thoughtworks.com/radar/languages-and-frameworks/lenis
- https://www.levelaccess.com/blog/eaa-compliance-in-2026-how-enforcement-has-evolved-and-what-to-expect-next/
- https://www.deque.com/blog/en-301-549-v4-1-1-is-final-what-changed-what-it-means-and-what-you-should-do/
- https://info.usablenet.com/2025-year-end-report-on-web-accessibility-lawsuits

### Search and AI visibility
- https://ahrefs.com/blog/how-long-does-it-take-to-rank/
- https://ahrefs.com/blog/ai-overviews-reduce-clicks/
- https://ahrefs.com/blog/llm-search
- https://arxiv.org/abs/2311.09735
- https://searchengineland.com/google-says-normal-seo-works-for-ranking-in-ai-overviews-and-llms-txt-wont-be-used-459422
- https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/
- https://ppc.land/google-kills-faq-rich-results-what-seos-saw-coming-since-2019/
- https://developers.google.com/actions-center/verticals/things-to-do/overview
- https://www.phocuswire.com/otas-google-things-to-do-shake-up
- https://skift.com/2026/07/06/chatgpt-apps-claude-connectors-travel-hands-on-test/

### Stack
- npm registry, queried 11 Nov 2026 (all versions)
- https://nextjs.org/blog/next-16-4 (summary only)
- https://netlify.com/changelog/2026-10-14-nextjs-react-security-vulnerabilities
- https://vercel.com/changelog/next-js-may-2026-security-release
- https://neon.com/pricing · https://neon.com/blog/postmortem-delayed-start-compute-operations
- https://supabase.com/blog/supabase-incident-on-february-12-2026
- https://developers.cloudflare.com/r2/pricing
- https://bunny.net/pricing/optimizer/
- https://developers.google.com/maps/billing-and-pricing/pricing-india
- https://getyourguide.supply/articles/your-first-photo-can-make-or-break-your-bookings

### Claude Code tooling
- https://github.com/anthropics/skills
- https://github.com/pbakaus/impeccable
- https://github.com/shadcn-ui/ui
- https://github.com/vercel-labs/agent-skills
- https://github.com/vercel/next-devtools-mcp
- https://github.com/ChromeDevTools/chrome-devtools-mcp
- https://github.com/coreyhaines31/marketingskills
- https://github.com/blader/humanizer
- https://github.com/upstash/context7

### Second pass
- https://link.springer.com/content/pdf/10.1007/s11482-009-9091-9.pdf (anticipation and holiday happiness)
- https://ideas.repec.org/a/eee/jobhdp/v170y2022ics0749597822000334.html (peak-end meta-analysis)
- https://baymard.com/blog/perceived-security-of-payment-form
- https://caniuse.com/vibration · https://caniuse.com/cross-document-view-transitions
- https://www.gov.uk/government/publications/using-urgency-and-price-reduction-claims-online
- https://www.asa.org.uk/rulings/emaan-travel-ltd-a15-302323.html
- https://www.airbnb.co.uk/aircover
- https://www.toursbylocals.com/policy/toursbylocals-cancellation-policy
- https://www.reviews.io/company-reviews/store/thrillophilia-com/Y5
- https://www.mylittleadventure.com/best-things/new-delhi/tours/non-shopping-agra-day-tour-from-delhi-NWITpZ2icg
- https://thinkwithgoogle.com/_qs/documents/13326/App_and_website_localization_for_Indian_users.pdf
- https://design.google/library/connectivity-culture-and-credit
- https://journals.sagepub.com/doi/full/10.1177/14614448221079028 (gamification in gig work)
- https://fair.work/india-report-2021-accessible
- https://skift.com/2026/03/05/openai-chatgpt-checkout-walkback/
- https://searchengineland.com/ai-citation-data-no-universal-top-source-brands-471285
- https://www.seroundtable.com/google-ai-mode-expands-40232.html
- https://services.google.com/fh/files/helpcenter/tours_and_attractions_gbp_best_practices_playbook_2026.pdf
- https://www.evaneos.fr/inde/ · https://www.civitatis.com/es/delhi/excursion-taj-mahal · https://www.dertour.de/rundreise/das-goldene-dreieck-indiens-7Z1C2L
- https://www.unzer.com/en/knowledge/articles/preferred-payment-methods-germany-2026/
- Competitor screens viewed directly: asiabylocals.com, headout.com, airbnb.com (12 Nov 2026)

### Market
- https://skift.com/2026/01/07/how-india-traveled-in-2025-what-the-data-shows/
- https://tourism.gov.in/sites/default/files/2026-06/Annual%20Tourism%20Snapshot%202025.pdf
- https://www.icra.in/Research/ViewResearchReport/foreign-tourist-arrivals-the-lagging-growth-lever/7052
- https://www.theweek.in/news/biz-tech/2026/04/16/middle-east-conflict-india-tourism.html
- https://theprint.in/feature/taj-mahal-foreign-visitors-top-spot-2024/2753599
- https://www.phocuswire.com/news/distribution/tours-activities-distribution-phocuswright-research-2026
