/**
 * The ten things US and European visitors most often worry about on this
 * route. "Happens" is a plain account, "helps" is what a traveller can do
 * with or without us, and "we" is limited to commitments the site already
 * makes elsewhere. Nothing here is a statistic.
 *
 * Source links go to official or established pages and are checked by hand
 * before launch (see docs/11-rebuild-audit.md): they could not be opened from
 * the build environment.
 */
export type Source = { label: string; href: string };

export type Worry = {
  id: string;
  title: string;
  happens: string;
  helps: string[];
  we: string;
  sources?: Source[];
  plan?: boolean;
};

export const SOURCES = {
  fcdo: { label: "UK government travel advice for India", href: "https://www.gov.uk/foreign-travel-advice/india" },
  state: { label: "US State Department advisory for India", href: "https://travel.state.gov/en/international-travel/travel-advisories/destination.ind.html" },
  smart: { label: "Australian Smartraveller advice for India", href: "https://www.smartraveller.gov.au/destinations/asia/india" },
  cdc: { label: "CDC health advice for India", href: "https://www.cdc.gov/yellow-book/hcp/asia/india.html" },
  food: { label: "TravelHealthPro: food and water hygiene", href: "https://travelhealthpro.org.uk/factsheets/food-and-water-hygiene" },
  taj: { label: "Taj Mahal visiting hours (Archaeological Survey of India)", href: "https://tajmahal.gov.in/visiting-hours.aspx" },
  aqi: { label: "Live Delhi air quality (IQAir)", href: "https://www.iqair.com/india/delhi" },
} satisfies Record<string, Source>;

export const worries: Worry[] = [
  {
    id: "scams",
    title: "Touts, scams and surprise charges",
    happens: "Near gates and stations, people may tell you a place is closed, offer a cheap tour, or steer you to a shop where your driver earns a commission. It is a nuisance more than a danger, but it wears people down.",
    helps: ["Book your guide and car before you arrive", "Buy monument tickets only at the official counter or website", "Agree any fare before you get in, or use an app-based cab", "Say no once, politely, and keep walking"],
    we: "No shop stops unless you ask. If your guide takes you to one you did not choose, we refund the tour. Your guide's name and licence are shown before the day.",
    sources: [SOURCES.fcdo, SOURCES.state],
  },
  {
    id: "traffic",
    title: "Traffic and drive times",
    happens: "Delhi to Agra is about four hours on a good day and can reach six. Agra to Jaipur is longer, with a stop at Fatehpur Sikri on the way. A plan that assumes the best case will fail on the first bad day.",
    helps: ["Put only one long drive in a day", "Leave early", "Never plan a flight or a sunrise visit on the same day as a long drive"],
    we: "Every day in our plans shows its road time, with a range, and tour start times are shown in India time and your own.",
    plan: true,
  },
  {
    id: "pace",
    title: "Itineraries that try to do too much",
    happens: "A two or three day Golden Triangle means most of your time is in a vehicle, with minutes at each place. People come home having seen the inside of a car.",
    helps: ["Allow at least four days; five is more comfortable", "Keep the first day free after a long flight", "Add a rest day if you are over seventy or travelling with children"],
    we: "Our three plans have a stated pace for every day, and the five and seven day plans leave room to rest.",
    plan: true,
  },
  {
    id: "crowds",
    title: "Crowds, queues and heat",
    happens: "The Taj Mahal opens near sunrise and is busiest from mid-morning. From April to June midday temperatures are often above 40°C. It is closed on Fridays.",
    helps: ["Go at opening time", "Finish outdoors by mid-morning in the hot months", "Carry water and a hat, and rest at the hotel in the middle of the day"],
    we: "The calendar will not let you pick a closed day, and you can choose the option where we buy your tickets in advance.",
    sources: [SOURCES.taj],
  },
  {
    id: "hygiene",
    title: "Hygiene and food safety",
    happens: "Most travellers' stomach upsets come from water, ice, cut fruit and food left standing. Washrooms at busy sites vary in quality.",
    helps: ["Drink sealed bottled water", "Eat food cooked hot in front of you", "Carry hand sanitiser and tissues", "Ask your doctor about stomach medicine before you fly"],
    we: "Each tour says exactly what food is included, and lunch stops are at menu price at a place you choose.",
    sources: [SOURCES.food, SOURCES.cdc],
  },
  {
    id: "safety",
    title: "Personal safety, and travelling alone",
    happens: "Most visitors are not harmed. Pickpocketing in crowds, unwanted attention and unfamiliar transport are the usual concerns, and women travelling alone carry more of them.",
    helps: ["Use app-based cabs or the metro after dark", "Keep valuables out of sight", "Share your plans with someone at home", "Read your own government's advice before you go"],
    we: "Guides are identified before the day. We show a badge for women travelling alone only on tours where we have done the checks behind it, and that badge is a set of checks, not a promise.",
    sources: [SOURCES.fcdo, SOURCES.state, SOURCES.smart],
  },
  {
    id: "costs",
    title: "Unclear inclusions and hidden costs",
    happens: "A low price often leaves out monument tickets, the extra ticket for the Taj Mahal's main mausoleum, tolls, parking or the guide. The difference shows up at the gate.",
    helps: ["Ask what is in the price, line by line", "Ask whether tickets are included", "Ask whether any stop is a shop"],
    we: "One total for your group. Monument tickets are a separate line, either included or with the amount you will pay at the gate. There is no booking fee.",
  },
  {
    id: "support",
    title: "Help when something goes wrong",
    happens: "A driver who does not turn up, a change of plan or a missed connection is stressful mostly because nobody answers. India has a 24-hour tourist helpline run by the Ministry of Tourism (1363).",
    helps: ["Save the helpline and your hotel's number", "Keep your booking reference where you can find it", "Message early if you are delayed"],
    we: "If your guide has not arrived 20 minutes after the start, we send another or refund you in full. During the preview a person answers requests by email, and we will publish our support hours before we take bookings.",
  },
  {
    id: "air",
    title: "Delhi's air in winter",
    happens: "From late October to January the air in Delhi is often poor, and some days are unhealthy. Smog can also hide the Taj Mahal in the morning.",
    helps: ["Check a live air-quality reading before outdoor plans", "Carry an N95 or FFP2 mask", "Keep indoor alternatives for bad days", "Consider February or March if you have asthma or a heart condition, and ask your doctor"],
    we: "The seven day plan is built with spare days so one bad day does not break the trip.",
    sources: [SOURCES.aqi],
    plan: true,
  },
  {
    id: "culture",
    title: "Dress, shoes and customs",
    happens: "Mosques and temples ask for covered shoulders and knees, and shoes come off at the door. Bargaining is normal in markets and not in fixed-price shops. Tipping is expected but not fixed.",
    helps: ["Wear light, loose clothing that covers shoulders and knees", "Wear slip-on shoes and carry socks", "Ask before photographing people", "Ask your guide what a fair tip is"],
    we: "Where it matters, each stop in a tour carries notes on what to wear and where photographs are not allowed.",
  },
];
