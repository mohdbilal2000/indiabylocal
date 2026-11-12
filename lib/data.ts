/**
 * SAMPLE CATALOGUE.
 * Every tour, price and time below is placeholder content written to
 * exercise the layout. None of it is a real, bookable product. Replace it
 * with supplier data before setting SITE_LIVE=1.
 */

/** Per-person price in whole US dollars for a group of 1, 2, 3–4 and 5+. */
export type Tiers = [number, number, number, number];

export type TourOption = {
  id: string;
  name: string;
  detail: string;
  ticketsIncluded: boolean;
  tiers: Tiers;
};

export type StopTip = { kind: "dress" | "photo" | "know"; text: string };

export type Stop = {
  time: string;
  title: string;
  text: string;
  /** Shown when the stop is opened. */
  detail?: string;
  /** How far you walk at this stop, in plain words. */
  walk?: string;
  tips?: StopTip[];
};

/** Keys into lib/trust.ts. A badge is listed only when the check behind it has been done. */
export type TrustKey = "licence" | "monument" | "women" | "promise";

export type Tour = {
  slug: string;
  /** Destination slug from lib/destinations. */
  city: string;
  title: string;
  summary: string;
  /** Photo keys from lib/photos.json; the first is the lead image. */
  photos: string[];
  durationHours: number;
  /** Local start time in India, 24-hour HH:MM. */
  startTime: string;
  pickup: string;
  languages: string[];
  trust: TrustKey[];
  /** Time on the road, for tours that include a long drive. */
  road?: string;
  /** 0 = Sunday. Days the tour cannot run, with the reason shown to the traveller. */
  closedWeekdays?: { day: number; reason: string }[];
  /** Per-person monument ticket cost when it is not in the price, in US dollars. */
  ticketsUsd?: number;
  ticketsNote?: string;
  highlights: string[];
  included: string[];
  paidOnDay: { item: string; amount: string }[];
  itinerary: Stop[];
  meeting: string;
  options: TourOption[];
};

export const TIER_LABELS = ["1 person", "2 people", "3–4 people", "5 or more"] as const;
export const MAX_GROUP = 8;

export function tierIndex(people: number): 0 | 1 | 2 | 3 {
  if (people <= 1) return 0;
  if (people === 2) return 1;
  if (people <= 4) return 2;
  return 3;
}

export const tours: Tour[] = [
  {
    slug: "taj-mahal-sunrise-private-tour-a1",
    city: "agra",
    title: "Taj Mahal at sunrise with a licensed guide",
    summary:
      "Be at the East Gate when it opens. Your guide handles the queue, the security check and the two hours inside, then walks you out before the day-trip coaches arrive.",
    photos: ["agra"],
    durationHours: 3,
    startTime: "05:30",
    pickup: "Hotel pickup in Agra",
    languages: ["English"],
    trust: ["licence", "monument", "women", "promise"],
    closedWeekdays: [{ day: 5, reason: "The Taj Mahal is closed on Fridays." }],
    ticketsUsd: 16,
    ticketsNote: "Foreign-visitor entry plus the main mausoleum.",
    highlights: [
      "Inside the gate within minutes of opening",
      "A guide licensed to work inside the monument",
      "The main mausoleum, the mosque and the river terrace",
      "No shop, workshop or showroom on the route",
    ],
    included: ["Private licensed guide", "Hotel pickup and drop in Agra", "Bottled water and shoe covers"],
    paidOnDay: [{ item: "Tips", amount: "Your choice" }],
    itinerary: [
      { time: "05:30", title: "Pickup", text: "Your guide meets you in your hotel lobby.", detail: "Your guide messages you the evening before with their name, photograph and the car's number plate, so you know who to look for.", tips: [{ kind: "know", text: "Bring your passport or a copy. Tickets are checked against it at the gate." }] },
      { time: "05:50", title: "East Gate", text: "Ticket check and security. Large bags and tripods are not allowed in.", detail: "Cars stop at the parking area. From there it is a short walk or a ride on an electric cart to the gate, where there are separate security lines for men and women.", walk: "About 1 km from the car park to the gate, on foot or by electric cart", tips: [{ kind: "know", text: "Leave food, tobacco, lighters, drones and tripods at the hotel. They are taken at security." }, { kind: "know", text: "A small bag with a phone, camera and water bottle is fine." }] },
      { time: "06:15", title: "Gardens and main mausoleum", text: "The approach, the platform and the tomb chamber.", detail: "You walk the length of the water channel to the marble platform, put on shoe covers and go inside the tomb chamber. Your guide explains the inlay work and the optical tricks in the calligraphy before you go in, because guiding is not allowed inside the chamber.", walk: "About 600 m, level, with one flight of steps up to the platform", tips: [{ kind: "photo", text: "Photography is not allowed inside the main mausoleum. Everywhere outside is fine." }, { kind: "dress", text: "There is no dress code, but covered shoulders and knees are respectful and cooler in the sun." }] },
      { time: "07:30", title: "Mosque and river terrace", text: "The quieter side, with the Yamuna behind it.", detail: "Most visitors turn back after the tomb. The red sandstone mosque on the west side and the terrace over the river are where the morning light is best.", walk: "About 400 m", tips: [{ kind: "photo", text: "The mosque arches frame the dome. Your guide knows where to stand." }] },
      { time: "08:30", title: "Back at your hotel", text: "In time for breakfast.", detail: "Your guide walks you out through the same gate and the car takes you to your hotel." },
    ],
    meeting: "Your hotel lobby in Agra. Staying elsewhere? Meet at the East Gate ticket office.",
    options: [
      {
        id: "tickets",
        name: "Guide and monument tickets",
        detail: "We buy your tickets in advance. Nothing to pay at the gate.",
        ticketsIncluded: true,
        tiers: [61, 44, 38, 34],
      },
      {
        id: "guide",
        name: "Guide only",
        detail: "You buy your own ticket at the gate or online.",
        ticketsIncluded: false,
        tiers: [45, 28, 22, 18],
      },
    ],
  },
  {
    slug: "taj-mahal-agra-fort-day-trip-from-delhi-a2",
    city: "agra",
    title: "Taj Mahal and Agra Fort from Delhi, private car",
    summary:
      "One car, one driver and one Agra guide for the whole day. Leave Delhi at 06:00, be inside the Taj by mid-morning and back in Delhi for dinner.",
    photos: ["x-agra-fort", "agra", "x-fatehpur"],
    durationHours: 13,
    startTime: "06:00",
    pickup: "Hotel pickup in Delhi, Gurugram or Noida",
    languages: ["English"],
    trust: ["licence", "monument", "promise"],
    road: "About 8 hours on the road in all",
    closedWeekdays: [{ day: 5, reason: "The Taj Mahal is closed on Fridays." }],
    ticketsUsd: 24,
    ticketsNote: "Foreign-visitor entry to the Taj Mahal, the main mausoleum and Agra Fort.",
    highlights: [
      "Air-conditioned private car with tolls, fuel and parking paid",
      "The same guide at both monuments",
      "Lunch stop where you choose, at menu price",
      "Return to Delhi the same evening",
    ],
    included: [
      "Private car and driver, Delhi to Agra and back",
      "Private licensed guide in Agra",
      "Tolls, fuel, parking and state taxes",
      "Bottled water",
    ],
    paidOnDay: [
      { item: "Lunch", amount: "About $8–15 per person" },
      { item: "Tips", amount: "Your choice" },
    ],
    itinerary: [
      { time: "06:00", title: "Leave Delhi", text: "Pickup from your hotel. About four hours on the expressway; traffic can add more.", detail: "The driver takes the Yamuna Expressway. There is one rest stop at a clean service area about half-way.", tips: [{ kind: "know", text: "Carry your passport. It is needed for monument tickets." }] },
      { time: "10:00", title: "Meet your guide in Agra", text: "Your guide joins the car near the East Gate.", detail: "From here your guide stays with you until you leave Agra." },
      { time: "10:15", title: "Taj Mahal", text: "Two hours inside.", detail: "Security, the gardens, the marble platform and the tomb chamber, then the mosque side. Mid-morning is busier than sunrise, and your guide picks the order to suit the queues.", walk: "About 2 km in all, level", tips: [{ kind: "photo", text: "No photography inside the main mausoleum." }, { kind: "know", text: "Food, tobacco, tripods and large bags are not allowed in." }] },
      { time: "12:30", title: "Lunch", text: "A restaurant you pick from three we suggest, or your own choice.", detail: "You pay the restaurant directly at menu price. Your guide does not choose for you and takes no commission." },
      { time: "14:00", title: "Agra Fort", text: "Ninety minutes in the palaces and audience halls.", detail: "The fort where Shah Jahan spent his last years, with a view of the Taj across the river from the palace balconies.", walk: "About 1.5 km, with ramps and uneven stone", tips: [{ kind: "know", text: "Wear shoes with a grip. The entrance ramp is steep." }] },
      { time: "15:45", title: "Leave Agra", text: "Straight back. No stops unless you ask for one.", detail: "Your guide leaves you at the car. If anyone suggests a marble or carpet showroom, the answer is no unless you asked for it." },
      { time: "19:45", title: "Back in Delhi", text: "Drop at your hotel. Evening traffic can add up to an hour, so do not book a late flight the same night." },
    ],
    meeting: "Your hotel or home in Delhi, Gurugram or Noida.",
    options: [
      {
        id: "tickets",
        name: "Car, guide and monument tickets",
        detail: "Both monuments pre-booked. Nothing to pay at the gates.",
        ticketsIncluded: true,
        tiers: [213, 133, 109, 93],
      },
      {
        id: "car-guide",
        name: "Car and guide",
        detail: "You buy your own monument tickets.",
        ticketsIncluded: false,
        tiers: [189, 109, 85, 69],
      },
    ],
  },
  {
    slug: "agra-old-city-food-walk-a3",
    city: "agra",
    title: "Agra old city food walk",
    summary:
      "The lanes behind the Jama Masjid in the early evening: eight tastings at stalls your guide eats at, and the city most day-trippers never see.",
    photos: ["x-petha", "x-chaat"],
    durationHours: 3,
    startTime: "17:00",
    pickup: "Meet in the old city",
    languages: ["English"],
    trust: ["licence", "women", "promise"],
    highlights: [
      "Eight tastings, enough to count as dinner",
      "Vegetarian throughout; vegan on request",
      "Stalls chosen for how they cook, not for a commission",
      "Small enough lanes that it has to be on foot",
    ],
    included: ["Private guide", "All food and drink on the route", "Bottled water and hand sanitiser"],
    paidOnDay: [{ item: "Tips", amount: "Your choice" }],
    itinerary: [
      { time: "17:00", title: "Meet", text: "Outside the main entrance of Agra Fort railway station.", detail: "Your guide is waiting at the entrance and will have sent a photograph of themselves that afternoon." },
      { time: "17:15", title: "Kinari Bazaar", text: "Chaat and the first sweet shop.", detail: "The bazaar that runs behind the Jama Masjid. You eat standing at the counter, the way everyone else does.", walk: "About 500 m through narrow lanes", tips: [{ kind: "know", text: "Everything is cooked to order in front of you. Say if you want it mild." }, { kind: "dress", text: "Closed shoes are better than sandals in the lanes." }] },
      { time: "18:15", title: "Spice lane", text: "The wholesale market, and what goes into what you just ate.", detail: "Sacks of chilli, turmeric and dried mango, sold by weight to restaurants and households.", walk: "About 300 m", tips: [{ kind: "photo", text: "Ask before photographing shopkeepers. Most say yes." }] },
      { time: "19:00", title: "Petha and chai", text: "Agra's own sweet, at a maker's counter.", detail: "Petha is made from ash gourd and sugar. You see it cut and soaked, then taste three kinds.", walk: "About 400 m" },
      { time: "20:00", title: "Finish", text: "Your guide puts you in a prepaid auto-rickshaw to your hotel.", detail: "The fare is fixed and paid before you get in." },
    ],
    meeting: "Main entrance, Agra Fort railway station.",
    options: [
      {
        id: "walk",
        name: "Private food walk",
        detail: "All tastings included.",
        ticketsIncluded: true,
        tiers: [49, 35, 32, 29],
      },
    ],
  },
  {
    slug: "old-delhi-food-and-lanes-walk-d1",
    city: "delhi",
    title: "Old Delhi food and back-lanes walk",
    summary:
      "Chandni Chowk with someone who knows which door to push. Four hours, ten tastings, one cycle-rickshaw ride and a rooftop over the spice market.",
    photos: ["x-chandni-chowk", "x-khari-baoli", "x-jama-masjid"],
    durationHours: 4,
    startTime: "09:30",
    pickup: "Meet at the metro",
    languages: ["English"],
    trust: ["licence", "women", "promise"],
    closedWeekdays: [{ day: 0, reason: "Most Old Delhi markets are shut on Sundays." }],
    highlights: [
      "Ten tastings across six stops",
      "The spice market from the roof",
      "A cycle-rickshaw through the wedding market",
      "Metro meeting point, so no traffic at the start",
    ],
    included: ["Private guide", "All food and drink on the route", "Cycle-rickshaw ride", "Bottled water"],
    paidOnDay: [{ item: "Tips", amount: "Your choice" }],
    itinerary: [
      { time: "09:30", title: "Meet", text: "Gate 5 of Chandni Chowk metro station.", detail: "The metro is the quickest way into Old Delhi. Your guide stands at the top of the Gate 5 escalator.", tips: [{ kind: "know", text: "The first coach of every Delhi Metro train is reserved for women." }] },
      { time: "09:45", title: "Breakfast lane", text: "Fried breads and the first chai.", detail: "A lane where every shop makes one thing. You try stuffed breads fried to order, then spiced tea from a stall that has stood in the same place for decades.", walk: "About 600 m through lanes too narrow for cars", tips: [{ kind: "know", text: "Stalls are chosen because the food is cooked hot in front of you." }, { kind: "know", text: "Bottled water is provided. Skip ice and cut fruit elsewhere." }] },
      { time: "11:00", title: "Wedding market by rickshaw", text: "Fifteen minutes on wheels.", detail: "The lane of wedding trimmings, by cycle-rickshaw, two to a rickshaw.", tips: [{ kind: "photo", text: "Hold your phone on the inside. Lanes are tight and traffic passes close." }] },
      { time: "11:45", title: "Spice market and rooftop", text: "Asia's largest wholesale spice market, from above.", detail: "You climb a staircase inside the market to a roof that looks over the courtyard and across to the Fatehpuri mosque.", walk: "About 500 m and four flights of stairs", tips: [{ kind: "know", text: "The chilli dust in the air makes most people sneeze. A scarf or mask helps." }] },
      { time: "13:30", title: "Finish", text: "Back at the metro, or your guide books you a cab." },
    ],
    meeting: "Gate 5, Chandni Chowk metro station (Yellow Line).",
    options: [
      {
        id: "walk",
        name: "Private food walk",
        detail: "All tastings and the rickshaw included.",
        ticketsIncluded: true,
        tiers: [55, 39, 35, 32],
      },
    ],
  },
  {
    slug: "delhi-in-a-day-private-car-and-guide-d2",
    city: "delhi",
    title: "Delhi in a day by private car",
    summary:
      "Old and New Delhi in eight hours, in an order that follows the traffic. Five sites properly rather than ten through a window.",
    photos: ["x-qutub", "x-india-gate", "x-jama-masjid"],
    durationHours: 8,
    startTime: "09:00",
    pickup: "Hotel pickup in Delhi",
    languages: ["English"],
    trust: ["licence", "monument", "promise"],
    ticketsUsd: 14,
    ticketsNote: "Foreign-visitor entry to Humayun's Tomb and Qutub Minar.",
    highlights: [
      "Humayun's Tomb and Qutub Minar with a licensed guide",
      "Jama Masjid and a short walk in Old Delhi",
      "India Gate and the government avenue by car",
      "Lunch where you choose, at menu price",
    ],
    included: ["Private car and driver for eight hours", "Private licensed guide", "Fuel and parking", "Bottled water"],
    paidOnDay: [
      { item: "Lunch", amount: "About $8–15 per person" },
      { item: "Tips", amount: "Your choice" },
    ],
    itinerary: [
      { time: "09:00", title: "Pickup", text: "Your guide and driver meet you at your hotel.", detail: "The order below can change on the day if a road is closed, and your guide will tell you why." },
      { time: "09:45", title: "Jama Masjid and Old Delhi", text: "The mosque courtyard and a short walk in the lanes.", detail: "The largest mosque in India, then ten minutes on foot in the lanes beside it.", walk: "About 700 m, with a broad flight of steps up to the mosque", tips: [{ kind: "dress", text: "Shoulders and legs must be covered. Robes are lent at the gate if needed." }, { kind: "know", text: "Shoes come off at the entrance. Socks are fine and useful on hot stone." }, { kind: "know", text: "Visitors are not admitted during prayer times." }] },
      { time: "11:30", title: "Humayun's Tomb", text: "The garden tomb that came before the Taj.", detail: "Built in the 1560s, and the model for the Taj Mahal a century later. The gardens are the quietest place on the route.", walk: "About 1 km, level", tips: [{ kind: "photo", text: "A tripod needs a permit. Hand-held photography is free." }] },
      { time: "13:00", title: "Lunch", text: "Your choice, with suggestions.", detail: "You pay the restaurant directly at menu price." },
      { time: "14:15", title: "India Gate and the avenue", text: "By car, with a stop for photographs.", detail: "The ceremonial avenue from India Gate to the President's house, built when the capital moved here in 1911." },
      { time: "15:15", title: "Qutub Minar", text: "The tower and the ruins around it.", detail: "A 73-metre victory tower begun in 1199, an iron pillar that has not rusted in 1,600 years, and the ruins of the mosque around them.", walk: "About 800 m, level", tips: [{ kind: "photo", text: "Late afternoon light is best on the tower's red stone." }] },
      { time: "17:00", title: "Back at your hotel", text: "Evening traffic can add half an hour." },
    ],
    meeting: "Your hotel in Delhi.",
    options: [
      {
        id: "tickets",
        name: "Car, guide and monument tickets",
        detail: "Both ticketed sites pre-booked.",
        ticketsIncluded: true,
        tiers: [143, 89, 73, 63],
      },
      {
        id: "car-guide",
        name: "Car and guide",
        detail: "You buy your own monument tickets.",
        ticketsIncluded: false,
        tiers: [129, 75, 59, 49],
      },
    ],
  },
  {
    slug: "amber-fort-and-pink-city-private-tour-j1",
    city: "jaipur",
    title: "Amber Fort and the Pink City, private tour",
    summary:
      "Up to Amber Fort before the coaches, then down into the walled city: the palace of winds from the street, the observatory, and the bazaars on foot.",
    photos: ["x-amber-fort", "jaipur", "x-jantar-mantar"],
    durationHours: 6,
    startTime: "08:30",
    pickup: "Hotel pickup in Jaipur",
    languages: ["English"],
    trust: ["licence", "monument", "promise"],
    ticketsUsd: 12,
    ticketsNote: "Foreign-visitor entry to Amber Fort and the observatory.",
    highlights: [
      "Amber Fort at opening time",
      "Jeep up to the fort gate; no elephant rides",
      "The observatory, explained by someone who can read it",
      "A walk through the bazaars with no shop stops",
    ],
    included: ["Private car and driver", "Private licensed guide", "Jeep up to Amber Fort", "Bottled water"],
    paidOnDay: [
      { item: "Lunch", amount: "About $6–12 per person" },
      { item: "Tips", amount: "Your choice" },
    ],
    itinerary: [
      { time: "08:30", title: "Pickup", text: "From your hotel in Jaipur." },
      { time: "09:00", title: "Amber Fort", text: "Two hours in the courtyards, the mirror hall and the ramparts.", detail: "A jeep takes you up the hill to the gate. Inside are four courtyards on four levels, ending at the mirror hall.", walk: "About 1.5 km, with ramps and stairs", tips: [{ kind: "know", text: "We do not offer elephant rides. The jeep is quicker and kinder." }, { kind: "dress", text: "Wear a hat. Most of the fort is open to the sun." }] },
      { time: "11:30", title: "Water palace viewpoint", text: "A ten-minute stop on the way back down.", detail: "The palace in the middle of the lake is seen from the shore. It is not open to visitors.", tips: [{ kind: "photo", text: "The best angle is from the promenade, with the hills behind." }] },
      { time: "12:15", title: "Observatory", text: "The stone instruments, and how they were used.", detail: "Nineteen instruments built in the 1730s, among them a sundial 27 metres tall that is accurate to about two seconds.", walk: "About 400 m, with almost no shade", tips: [{ kind: "know", text: "Carry water. The stone holds the heat by midday." }] },
      { time: "13:15", title: "Bazaars on foot", text: "Past the palace of winds and into the old market streets.", detail: "The street side of the palace of winds, then the lanes where bangles, textiles and spices are sold.", walk: "About 1 km", tips: [{ kind: "know", text: "Your guide will not take you into a shop unless you ask. If you want to buy, they will tell you a fair price." }] },
      { time: "14:30", title: "Back at your hotel", text: "Or stay in the old city for lunch." },
    ],
    meeting: "Your hotel in Jaipur.",
    options: [
      {
        id: "tickets",
        name: "Car, guide and monument tickets",
        detail: "Both ticketed sites pre-booked.",
        ticketsIncluded: true,
        tiers: [111, 71, 57, 51],
      },
      {
        id: "car-guide",
        name: "Car and guide",
        detail: "You buy your own monument tickets.",
        ticketsIncluded: false,
        tiers: [99, 59, 45, 39],
      },
    ],
  },
];

/** The cheapest price any option can actually be booked at. */
export function fromPrice(tour: Tour): number {
  return Math.min(...tour.options.flatMap((o) => o.tiers));
}

/** The option that the "from" price belongs to. */
export function cheapestOption(tour: Tour): TourOption {
  const from = fromPrice(tour);
  return tour.options.find((o) => o.tiers.includes(from)) as TourOption;
}

export function toursIn(city: string): Tour[] {
  return tours.filter((t) => t.city === city);
}

export function tourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function durationLabel(hours: number): string {
  return hours === 1 ? "1 hour" : `${hours} hours`;
}

/**
 * Catalogue rules, checked when the module loads so that a broken listing
 * fails the build instead of reaching a traveller.
 */
function validate() {
  const slugs = new Set<string>();
  for (const t of tours) {
    if (slugs.has(t.slug)) throw new Error(`Duplicate tour slug: ${t.slug}`);
    slugs.add(t.slug);
    if (t.title.length > 60) throw new Error(`Title over 60 characters: ${t.slug}`);
    if (t.options.length === 0) throw new Error(`No options: ${t.slug}`);
    let last = "";
    for (const s of t.itinerary) {
      if (!/^\d{2}:\d{2}$/.test(s.time)) throw new Error(`Bad time "${s.time}" in ${t.slug}`);
      if (s.time <= last) throw new Error(`Itinerary out of order at ${s.time} in ${t.slug}`);
      last = s.time;
    }
    if (t.itinerary[0]?.time !== t.startTime) {
      throw new Error(`Start time does not match the first itinerary step: ${t.slug}`);
    }
    for (const o of t.options) {
      for (let i = 1; i < o.tiers.length; i++) {
        if (o.tiers[i] > o.tiers[i - 1]) {
          throw new Error(`Per-person price rises with group size: ${t.slug} / ${o.id}`);
        }
      }
    }
  }
}
validate();
