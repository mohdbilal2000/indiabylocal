# The experience layer

[01-product-ux.md](01-product-ux.md) makes the product clear and fast. This document makes it alive. It was added after the first blueprint was judged correct but flat: no fun, no excitement, and safety and the guarantee stated instead of felt.

Evidence grades: **S** strong, **M** moderate, **W** weak, **O** our judgement. Sizes are compressed estimates. Sources are in [06-evidence.md](06-evidence.md).

## 1. The idea

**"The day unfolds."** Every screen opens a little more of one real day with one named, licence-checked person. Excitement and safety arrive as the same thing: the more of the day you can see, the more you want it and the less there is to fear.

This is what the product sells, in order:

1. **Excitement** — you can already picture the morning.
2. **Safety** — you know exactly who is meeting you, and where.
3. **The Promise** — if it is not what we showed you, you get your money back.

### What travellers actually say

From reviews and forums (search snippets, not full pages):

| They fear | They love |
|---|---|
| Being taken to a shop "under the guise of" a marble demonstration | Sunrise at the Taj before the crowds: it "really does live up to the hype" |
| Fake or unlicensed guides | The guide's stories |
| "The Taj is closed today" touts | The guide keeping vendors away |
| Surprise entry fees and tip pressure | Old Delhi being "dramatically less overwhelming" with a guide |
| Being "rushed through sites" | Being asked what pace they want |
| Feeling "on edge"; staring | A female guide, for women travelling alone |
| Whether refunds are ever really paid | Pickups that arrive on time, even at 2:30 am |

"No shopping" and "government approved guide" are already common listing claims in Agra. The claim will not set us apart. A refund that is actually paid will.

### Lead emotion by traveller

| Traveller | Lead with |
|---|---|
| Couples 45–65, first trip | Relief: looked after, nothing to negotiate |
| Women travelling alone | Control: choose your guide, share your day |
| Families | Ease: your pace, breaks, no pressure |
| Diaspora showing India to family | Pride: seeing it done properly |
| Backpackers | Fairness: an honest price |

The last three are our inference; no first-person evidence was found.

## 2. Personality

| Trait | Do | Do not |
|---|---|---|
| Host-warm | The guide's name, face and voice come first | "Our partners"; stock smiles |
| Sure-footed | State the Promise in one plain sentence | Walls of shields; legalese |
| Playful, never cute | One wink per screen | Jokes about religion, poverty or "chaos" |
| Specific | "Sunrise 6:41. Gates open 6:00." | "Magical", "mystical", "hidden gem" |
| Unhurried | An honest countdown to your own trip | Timers; "3 people are looking" |

## 3. Colour, ornament and sound

### Two accents join the palette

Indigo and marigold stay. Two accents give the system energy and give safety a colour of its own. Contrast is against the surface `#FBF8F2`.

| Name | Hex | Contrast | Used only for |
|---|---|---|---|
| Gulal rose | `#C2255C` | 5.3:1 | Celebration, saved hearts, the booking stamp |
| Peacock teal | `#0F766E` | 5.2:1 | "Checked by us" and "covered by the Promise" |

Teal never appears on anything that is not verified. That scarcity is what makes it mean something.

### Ornament drawn from the places themselves

| Source | Use | Risk |
|---|---|---|
| **Jaali** lattice geometry | Section dividers, loading skeletons, the border of the Promise seal | Low |
| **Pietra dura** inlay flowers, drawn from the Taj | City marks and stamp art for Agra | Low |
| **Block print** ink texture | Slight mis-registration on stamps | Medium: a living craft; credit a real printer if a pattern is copied |
| **Marigold petals** | The one celebration, at booking | Low |

Each city gets its own stamp: Agra an inlay flower, Delhi a jaali star, Jaipur a block-print motif.

**Not used:** truck-art lettering, rangoli, auto-rickshaws, chai cups, elephants, folded hands, "spice" palettes. They read as souvenir kitsch or borrow from ritual.

### Sound and touch

- No interface sounds. The only audio is the guide's greeting, started by the traveller.
- A single short vibration at booking on Android. iOS browsers do not support it, so it is feature-detected and never relied on.

## 4. Moments map

One built moment per step. Nothing here adds a step or delays a tap.

| Step | The moment | How it works | Basis | Size | Reduced motion |
|---|---|---|---|---|---|
| Landing | **Today in Agra** | A live line beside the hero: sunrise time, weather, gate hours, "closed Fridays" | Specificity, curiosity (W) | 1 KB | Text only |
| Browsing | **Day-arc cards** | Each card carries a dawn-to-dusk line of 3–5 stops; it draws on hover or tap | Curiosity gap (W) | 2 KB | Line already drawn |
| Tour page | **The day in 30 seconds** | Five or six tap-through frames ending on the guide's 10-second spoken hello | Person-level trust (O) | 40 KB poster; clips only on tap | Still frames and transcript |
| Choosing a date | **Sunrise on the calendar** | Picking a date shows that day's sunrise, typical weather and "Ravi is free" | Concreteness feeds anticipation (M) | 3 KB | Text only |
| Paying | **The Promise beside the button** | One sentence, the guide's photo and licence number, enclosing the card fields | Enclosed, reassured card areas read as more secure (M) | 0 KB | — |
| Confirmation | **The stamp** | An inked city stamp lands; marigold petals fall once | Peak-end effect (S for short episodes) | 4 KB | Stamp appears, no petals |
| The wait | **Countdown and unlocks** | Days to go; a checklist as progress; small reveals (the guide's breakfast tip a week out, the meeting-point photo the day before) | Anticipation is where holiday happiness shows up (M) | 5 KB | — |
| The day | **Your guide is on the way** | Photo, licence, a match word both sides say, a link to share your day | Ride-hailing safety pattern (O) | 3 KB | — |
| After | **The day card** | A shareable card of the route and stamp; a thank-you from the guide; the stamp joins a passport | End effect (S/M); ownership (M) | 6 KB | — |

Reassurance peaks twice: at the pay button, and the evening before the tour.

## 5. Five signature interactions

Ranked by impact for effort. These replace the earlier rule of "one signature moment".

1. **Booking stamp.** On payment success an SVG city stamp scales from 1.4 to 1 and rotates from −8° to −3° in 320 ms with a slight overshoot; 24 marigold petals fall for 900 ms, once. Announced to screen readers.
2. **Promise seal.** When the payment section enters view, the seal's outline draws in 400 ms, once. Tapping it opens three plain lines.
3. **Card-to-page morph.** Tapping a tour card morphs its photo and title into the tour page hero in 250 ms, using cross-document view transitions. Browsers without support navigate normally.
4. **Day-arc draw.** The path draws in 600 ms; stops appear 80 ms apart.
5. **Guide hello.** On tap, a 10-second greeting plays with captions shown and waveform bars moving. About 40 KB, loaded on tap.

All five are CSS and SVG, about 11 KB together, inside the performance budgets. No animation runtime, no custom cursor, no autoplay.

## 6. Voice in practice

| Where | Line |
|---|---|
| Button | "See the day" |
| Button | "Meet Ravi" |
| Button | "Hold my date" (only where cancellation is free) |
| Pay | "Pay £42. Free to cancel until 12 Mar, 5:30 am India time." |
| Promise | "If your guide doesn't show, you get every rupee back. That's the whole policy." |
| Loading | "Checking Ravi's calendar…" |
| Loading | "Fetching tomorrow's sunrise…" |
| No results | "Nothing on that date. The Taj is closed on Fridays. Try Saturday?" |
| Nothing saved | "No days saved yet. Start with a sunrise." |
| Confirmation | "You're going. Ravi has your date." |
| Countdown | "23 sleeps to Agra." |
| Evening before | "Tomorrow, 5:40 am, East Gate. Ravi will be in a blue scarf." |
| Card declined | "Your bank said no. Nothing was charged. Try another card?" |
| Offline | "You're offline. Your booking is safe; this page will catch up." |
| Review | "How was your day with Ravi? Two taps." |

**Never:** "Only 2 spots left!" · "Hurry, price goes up in 09:59" · "Experience the magic of mystical India" · "100% safe, guaranteed!" · "Oops! Something went wrong :("

## 7. The Promise

Called a promise, with terms one tap away. Regulators in the UK have ruled against "money-back guarantee" claims whose terms were unclear, and "safe" is an absolute claim we could not prove.

**Funding:** the guide's payout is held until after the tour. A refund caused by the guide comes from that payout; we lose our commission and the card fees. Claim rates and costs below are assumptions on a $90 order.

| Promise | What the traveller reads | How a claim is checked | Assumed rate and cost |
|---|---|---|---|
| **No shopping stops** | "Your guide will not take you to any shop or workshop unless you ask in the chat. If it happens, we refund the full tour price." | Reported within 48 hours; checked against the itinerary, the chat and the guide's account | 2–4% early, under 1% once offenders are removed; about $18 each |
| **Your guide shows up** | "If your guide isn't there within 20 minutes, we send another or refund everything, plus 20% credit." | Check-in and call log | 0.5–1%; about $25 |
| **Licence checked** | "We check every guide's government licence and ID before they are listed. The licence number is on their profile." | Document check, repeated yearly | Our time |
| **The price is the price** | "The total at checkout is all you pay us. Monument tickets and tips are listed before you pay." | Itemised checkout | Near zero |
| **Closures** | "If the monument is closed or fog cancels sunrise, you reschedule free or get a full refund." | Official notice | 1–2% in December and January; we bear it |
| **For women travelling alone** | "Ask for a female guide where one is available. Share your live itinerary. Our WhatsApp line is answered 6 am to 10 pm India time." | — | Our time |

**Where it appears:** a teal line on every tour card; the seal in the tour page price box; in full beside the pay button; on the confirmation; on its own page (T-24) with the terms and "this is in addition to your legal rights".

**What we do not promise:** "safe" or "100% safe"; "insured" or "protected" (no policy exists yet); "24/7 support" (one founder); "lowest price"; "no touts" (we do not control the monument gates); "verified reviews" without saying how.

**Open:** a lawyer reviews the wording for the UK, EU, US and India before launch.

## 8. Safety you can see

- **Before booking:** guide's face, name, licence number and issuer; "checked by us" in teal.
- **At booking:** the Promise beside the pay button.
- **Evening before:** guide's name and photo, driver's name and number plate, exact meeting-point photo, and the line "ignore anyone who says your tour is cancelled or the monument is closed".
- **On the day:** a match word that guide and traveller both say; a link that lets someone at home follow the day; one button to reach us.
- **Women travelling alone:** a female-guide filter; no itinerary change after dark without agreement in the chat.

## 9. Life on the supplier side

The supplier app is a product in its own right, in Hindi, English or a mix, switchable on any screen.

**What the research says about this user**

- People want spoken Hindi mixed with English, not literary Hindi. "Booking", "payment", "OTP" and "photo" stay as they are, written in Devanagari.
- One script per screen; never an English error on a Hindi screen; voice before typing.
- New users learn from family and peers, so a helper can complete sign-up with them.
- No primary data on partner-app drop-off was found. Likely points are documents, typing and unclear money terms.

**Changes to onboarding** (updates [04-supply-ops.md](04-supply-ops.md))

1. Show the money first: the "you receive ₹X" calculator comes before the profile.
2. Move most of the 12 minutes into WhatsApp: voice note and photos in chat; the app is for review and confirm.
3. Progress is visible and resumable: "2 of 7 done" after phone and language, with a WhatsApp nudge that opens the exact card.
4. Replace "five photos minimum" with the eight-shot checklist below; six are needed to publish.
5. The founder photographs and onboards the first 20 Agra guides in person.
6. Show the guide their public page before showing a score.
7. Reframe the score as "three things that get you more bookings".
8. Defer every document not needed to publish, and say when each will be asked for and why.

**Eight shots every tour needs**

1. Guests enjoying the main sight
2. The guide's face, smiling
3. Guide with guests
4. A detail close-up
5. Food or craft
6. The vehicle, or the walking route
7. The meeting point as the traveller will see it
8. A quiet or unexpected angle

Each is taught with a weak and a good example of the same spot, shot on an ordinary phone.

**Motivation without manipulation**

| Use | Avoid |
|---|---|
| One-time milestones: first booking, first review, tenth tour | Streaks and time-pressured quests |
| Tier criteria published in advance | Public leaderboards |
| A score that explains every point lost | Punishing a declined booking |
| Rupees before percentages, with a payout date | Surprise rewards |
| "My page": their name, face, licence and guests' words, with a QR code and share cards | Our branding over theirs |

Research on ride-hailing and delivery apps documents drivers resenting streaks, opaque ratings and incentives lost after one declined job.

**Key screens**

| Screen | Its one job | Example line (English / Hindi) |
|---|---|---|
| Today | What do I do today? | "Today's tour" / "आज का टूर" |
| New booking | Accept with confidence | "You receive ₹8,500" · "Accept" / "बुकिंग स्वीकार करें" |
| Calendar | Block days quickly | "Tap a date to close it" / "छुट्टी के लिए तारीख़ दबाएँ" |
| Earnings | Where is my money? | "Reaching your bank by 14 Nov" / "14 नवंबर तक आपके बैंक में" |
| Photo coach | Get eight good shots | "Too dark. Move near light." / "फ़ोटो अंधेरी है। रोशनी के पास जाएँ।" |

The Hindi is a draft and needs a native speaker's review.

## 10. What we saw on competitors' screens

Viewed directly on a phone-sized screen on 12 Nov 2026. GetYourGuide and Klook refused automated access, so they were not seen.

| Site | What it does | What we take |
|---|---|---|
| AsiaByLocals | Tour page opens with a promo banner, then the title; the gallery comes later. Price appears three times in the booking card. Six tag pills sit above the date field. Cards are small photo left, text right. | Our gallery is first. One price. Nothing between the traveller and the date. |
| AsiaByLocals | Agra cards show ratings such as 4.9 (3800) and 4.9 (3096), while its Trustpilot page showed none | We show only reviews from our own completed bookings, and say so |
| AsiaByLocals | "Book Now" scrolls to a date field, a traveller count and "Check availability" | Same number of steps as ours; our advantage is the price per date, the sunrise line and the Promise at that point |
| Headout | Opens on "The world's best experiences curated just for you", a rotating hero and a search box; bottom tab bar | Generic. Ours opens on a specific day in a specific city. |
| Airbnb | Agra experiences as large image cards with rating and count, e.g. 4.92 (158), and a one-line description | The closest to our card. We add the day-arc and the all-in price. |

Their checkout pages and AsiaByLocals' supplier sign-up form were not walked through.

## 11. What is already in the site

Built into the preview on 12 Nov 2026:

- The live line under the home hero: tomorrow's sunrise at the Taj in India time, and whether it is open. Computed in the browser; accurate to about two minutes.
- The day-arc on every sample tour card and above each itinerary. It redraws on hover.
- The Promise seal beside the booking button, in the teal reserved for verified things.

Not yet built: the guide's spoken hello, sunrise on the calendar, the booking stamp, the countdown and trip page, the day card, city stamps and the jaali ornament set. The stamp and everything after it depend on booking, which is not open yet.

## 12. Things that feel fun and hurt

- Fake urgency or scarcity: treated as misleading by the UK regulator, with fining powers.
- Streaks for travellers: a visitor books one to three tours; there is nothing honest to count. A passport of completed days instead.
- Auto-rotating carousels and autoplay video: people miss the content and read them as adverts.
- Confetti everywhere: one celebration, once.
- Walls of badges: people cannot tell seals apart; one plain statement works better.
- Spin-to-win and surprise rewards: no good evidence in considered travel purchases; reads as a trick.

Delighters decay into expectations. None of this replaces speed and a clear price.
