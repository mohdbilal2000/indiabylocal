# Payments, tax and legal

Nothing here is legal or tax advice. Items marked **[CA]** need a chartered accountant or lawyer before they are relied on. Verification status is in [06-evidence.md](06-evidence.md).

## 1. The pricing model

The supplier names what they want to earn in rupees. We add our share on top. The traveller sees one all-in price in their own currency.

- Supplier wants the equivalent of $100 → traveller pays $125 → our share is $25, which is 20% of what the traveller pays (a 25% mark-up on the supplier price).
- The supplier's rupee amount is fixed at booking, whatever the exchange rate does.
- No fee is added at checkout. This is required in the UK and the safe default everywhere.

## 2. What we keep

Worked example on a $125 booking. Lines marked (a) are assumptions.

| Item | USD |
|---|---|
| Our share | 25.00 |
| GST at 18% inside the commission | −3.81 |
| Card fee, 3% of 125 (a: rate from third-party pages) | −3.75 |
| Currency spread, 1.5% (a) | −1.88 |
| Supplier payout fee (a) | −0.25 |
| Chargeback reserve, 0.5% (a) | −0.63 |
| Fees lost on refunds at a 5% refund rate (a) | −0.22 |
| **Left before marketing and support** | **14.46 (11.6% of booking)** |

- If the commission is treated as an export, or GST is charged on top to registered suppliers, the figure is about $18.27 (14.6%). **[CA]**
- Tax withheld from suppliers is their cost, not ours.
- **20% works only while winning a booking costs under about $8–10.** Paid search at $30–60 per booking loses money on a day tour.

For comparison: GetYourGuide takes 20–30%, Airbnb Experiences 20%, Viator a net rate with tiers to 30%, AsiaByLocals claims 20%.

## 3. Money flow

### What Razorpay's own documentation says (read 11 Nov 2026)

- International card payments are supported on the payment gateway, in 100+ currencies, with 3-D Secure 2.0. Settlement is always in rupees, at the exchange rate when the payment is created.
- The default settlement for international payments is about seven working days after payment; earlier settlement is available at extra charge.
- PayPal is an available method for registered businesses.
- **Route, the product that splits a payment to a supplier, does not support international payments.** Transfers cannot be created on international-currency orders.
- Route also requires turnover above ₹40 lakh domestic or ₹5 lakh export in the current or previous year. A first-year business may submit a self-declaration.
- Razorpay's stated alternative: payments settle in full to our account and we transfer to suppliers ourselves.

### What that means

Reserve Bank rules (Payment Aggregator Directions, September 2025) require authorisation to aggregate payments for others, and hold funds in the aggregator's escrow. A marketplace that receives the full amount and then pays guides is doing something close to that. Razorpay documents this as the alternative, which suggests it is tolerated for merchants, but our agent-for-the-guide position makes it a real question. **[CA]**

### Plan

1. **This week:** ask Razorpay in writing whether a marketplace selling tours to foreign cardholders may settle to its own account and pay Indian suppliers by bank transfer, and what they require. Ask Cashfree and PayGlocal whether they offer a split on international payments.
2. Take the answers to the accountant with the tax questions below.
3. **Launch default, if cleared:** Razorpay checkout for cards, wallets and PayPal; settle to our current account; pay suppliers by bank transfer after the tour.
4. **At scale:** a foreign entity with Stripe Connect as merchant of record, for better card acceptance. Stripe in India is still invite-only.

### Payout timing

Most travellers book less than a week ahead, and international payments settle in about a week. Paying a guide 48 hours after a tour therefore often means paying before we have the money.

- **Promise to suppliers:** "within 48 hours of the tour, once the card payment has settled."
- Paying faster needs our own float or the paid early-settlement option. Decide after the first month of real data.
- An advance of 20–30% on vehicle-heavy tours, for trusted suppliers only.

### Chargebacks and refunds

- US cards rarely trigger the bank security check, so fraud liability stays with us.
- Refunds go to the original card only.
- Keep check-in evidence, messages and the confirmation email for every booking.
- The supplier agreement allows recovery from the next payout.
- Free cancellation to 24 hours before; no refund for a traveller no-show.
- Taj Mahal tickets cannot be refunded once issued; say so wherever tickets are included.

## 4. Tax **[CA throughout]**

| Question | What the research found |
|---|---|
| Agent or principal? | As agent we pay 18% GST on our commission. As tour operator we would owe 5% on the whole booking with no input credit, and carry liability for the tour. Everything here assumes agent. |
| Is a tour for a foreign visitor an export? | Probably not; the service is performed in India. Sources conflict. |
| Is our commission an export? | A provision treating intermediary services as taxable in India was removed from 30 March 2026, so a fee charged to a foreign traveller may qualify. Unconfirmed. |
| GST registration | Required for an e-commerce operator whatever the turnover. |
| Tax collected at source (section 52) | 0.5% on supplies by registered suppliers through us. |
| Small guides | Service suppliers under ₹20 lakh selling through an operator are exempt from compulsory registration (Notification 65/2017); current validity unconfirmed. |
| Income-tax withholding on payouts | 0.1% on e-commerce payouts; individuals under ₹5 lakh a year exempt (secondary sources). |

## 5. Registration sequence

Costs and times are estimates from general knowledge, not quotes.

| # | Step | Time | Cost |
|---|---|---|---|
| 1 | **Name clearance search**, with a fallback name | 1–2 weeks | ₹5–15k |
| 2 | Accountant's ruling on section 4 and the money flow | 1 week | — |
| 3 | Private Limited company (two directors needed) | 10–15 days | ₹10–20k |
| 4 | PAN, TAN, current account, Udyam, UP Shops & Establishment | 1–2 weeks | low |
| 5 | GST registration as an e-commerce operator | — | — |
| 6 | DPIIT start-up recognition | 1–3 weeks | free |
| 7 | Import Export Code | 1–2 days | about ₹500 |
| 8 | Trademarks: India classes 39, 41, 35; then US, EU, UK | — | about ₹4,500 per class in India; roughly ₹1.5–2.5 lakh abroad |
| 9 | Payment gateway with international cards (site must have terms, refund, privacy and contact pages) | 2–4 weeks | — |
| 10 | Contracts: traveller terms, privacy and cookie policy, cancellation policy, supplier agreement | — | ₹40k–1.5 lakh |
| 11 | Insurance: professional indemnity and public liability, with worldwide jurisdiction | — | about ₹20–60k a year |

A Private Limited company is preferred over an LLP or one-person company for gateway onboarding and later investment.

**Tourism recognition is optional.** Recognition as an online travel aggregator needs three years of operation, ₹1 crore capital and an office, so it is not available yet. Check UP Tourism registration locally.

## 6. Consumer law in the target markets

| Area | What applies | What we do |
|---|---|---|
| EU and UK data protection | Applies because we target those markets; India has no EU adequacy decision | Database in Frankfurt; EU and UK representatives (about €500–1,500 a year); cookie consent with equal-weight Reject; processor agreements **[CA]** |
| India data protection | Rules notified November 2025; main duties from about May 2027 | Build consent and deletion handling now |
| EU package travel | Day tours under 24 hours with no overnight are outside it. Transport plus accommodation is a package. Revised rules from March 2029 widen it | Day tours only at launch; multi-day after legal sign-off **[CA]** |
| EU platform rules | Small platforms are exempt from trader-traceability duties; notice-and-action still applies | Verify suppliers anyway; publish how reviews are verified and how results are ranked |
| Right of withdrawal | Dated leisure services are exempt from the 14-day right in the EU and UK | State it in the terms |
| UK consumer law | Drip pricing and fake reviews are fined, up to 10% of turnover | All-in prices; verified reviews only |
| US | The federal fees rule covers event tickets and lodging only; the reviews rule bans fake or sentiment-conditioned reviews; California requires all-in pricing; some states register sellers of travel | All-in prices; no review gating; check seller-of-travel rules **[CA]** |
| Accessibility | EU law in force since June 2025; high US lawsuit volume | WCAG 2.2 AA from the first screen |

## 7. Supplier-side law

See [04-supply-ops.md](04-supply-ops.md) for the checklist. The points with legal weight:

- New Regional Level Guide licences stopped in March 2020; existing ones remain valid. The successor is the IITFC certification.
- Reporting consistently says only licensed guides may work inside the Taj Mahal and other protected monuments. Whether a basic-level IITFC holder may do so is unconfirmed. **[CA]** Each guide carries a "monument-eligible" flag set only on evidence.
- Terms position us as a marketplace and agent, with the supplier as the service provider. Indian consumer law still puts duties on marketplaces. **[CA]**
