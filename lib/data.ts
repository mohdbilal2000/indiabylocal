/**
 * SAMPLE CATALOGUE.
 * Every tour, price and time below is placeholder content written to
 * exercise the layout. None of it is a real, bookable product. Replace it
 * with supplier data before setting SITE_LIVE=1.
 */

export type CitySlug = "agra" | "delhi" | "jaipur";
export type ArtKind = "taj" | "fort" | "palace" | "lanes" | "arch";

export type City = {
  slug: CitySlug;
  name: string;
  intro: string;
  art: ArtKind;
  facts: { text: string; href?: string }[];
};

/** Per-person price in whole US dollars for a group of 1, 2, 3–4 and 5+. */
export type Tiers = [number, number, number, number];

export type TourOption = {
  id: string;
  name: string;
  detail: string;
  ticketsIncluded: boolean;
  tiers: Tiers;
};

export type Stop = { time: string; title: string; text: string };

export type Tour = {
  slug: string;
  city: CitySlug;
  title: string;
  summary: string;
  art: ArtKind;
  durationHours: number;
  /** Local start time in India, 24-hour HH:MM. */
  startTime: string;
  pickup: string;
  languages: string[];
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

export const cities: City[] = [
  {
    slug: "agra",
    name: "Agra",
    intro:
      "The Taj Mahal, Agra Fort and the old city behind them, with a guide who is licensed to work inside the monuments.",
    art: "taj",
    facts: [
      {
        text: "The Taj Mahal is closed to visitors every Friday.",
        href: "/india/agra/taj-mahal/tickets-timings",
      },
      {
        text: "Foreign visitors pay a separate, higher ticket price at the Taj Mahal and Agra Fort.",
        href: "/india/agra/taj-mahal/tickets-timings",
      },
      { text: "Sunrise entry means a hotel pickup before 05:30 for most of the season." },
    ],
  },
  {
    slug: "delhi",
    name: "Delhi",
    intro:
      "Old Delhi on foot, New Delhi by car, and the food in between. Guides who live in the neighbourhoods they show.",
    art: "arch",
    facts: [
      { text: "Most Old Delhi markets are shut on Sundays; food walks run on the other six days." },
      { text: "Traffic decides the day. A private car tour covers four or five sites, not ten." },
      { text: "Agra is a same-day trip from Delhi by car or by the morning express train." },
    ],
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    intro: "Amber Fort in the morning before the coaches, then the walled Pink City with someone who grew up in it.",
    art: "palace",
    facts: [
      { text: "Amber Fort is 11 km outside the walled city; allow half a day for it." },
      { text: "The old city's bazaars are busiest after 17:00, when the heat drops." },
      { text: "We do not sell elephant rides." },
    ],
  },
];

export const tours: Tour[] = [
  {
    slug: "taj-mahal-sunrise-private-tour-a1",
    city: "agra",
    title: "Taj Mahal at sunrise with a licensed guide",
    summary:
      "Be at the East Gate when it opens. Your guide handles the queue, the security check and the two hours inside, then walks you out before the day-trip coaches arrive.",
    art: "taj",
    durationHours: 3,
    startTime: "05:30",
    pickup: "Hotel pickup in Agra",
    languages: ["English"],
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
      { time: "05:30", title: "Pickup", text: "Your guide meets you in your hotel lobby." },
      { time: "05:50", title: "East Gate", text: "Ticket check and security. Large bags and tripods are not allowed in." },
      { time: "06:15", title: "Gardens and main mausoleum", text: "The approach, the platform and the tomb chamber." },
      { time: "07:30", title: "Mosque and river terrace", text: "The quieter side, with the Yamuna behind it." },
      { time: "08:30", title: "Back at your hotel", text: "In time for breakfast." },
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
    art: "fort",
    durationHours: 13,
    startTime: "06:00",
    pickup: "Hotel pickup in Delhi, Gurugram or Noida",
    languages: ["English"],
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
      { time: "06:00", title: "Leave Delhi", text: "Pickup from your hotel. About three and a half hours on the expressway." },
      { time: "09:45", title: "Meet your guide in Agra", text: "Your guide joins the car near the East Gate." },
      { time: "10:00", title: "Taj Mahal", text: "Two hours inside." },
      { time: "12:30", title: "Lunch", text: "A restaurant you pick from three we suggest, or your own choice." },
      { time: "14:00", title: "Agra Fort", text: "Ninety minutes in the palaces and audience halls." },
      { time: "15:45", title: "Leave Agra", text: "Straight back. No stops unless you ask for one." },
      { time: "19:00", title: "Back in Delhi", text: "Drop at your hotel. Evening traffic can add up to an hour." },
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
    art: "lanes",
    durationHours: 3,
    startTime: "17:00",
    pickup: "Meet in the old city",
    languages: ["English"],
    highlights: [
      "Eight tastings, enough to count as dinner",
      "Vegetarian throughout; vegan on request",
      "Stalls chosen for how they cook, not for a commission",
      "Small enough lanes that it has to be on foot",
    ],
    included: ["Private guide", "All food and drink on the route", "Bottled water and hand sanitiser"],
    paidOnDay: [{ item: "Tips", amount: "Your choice" }],
    itinerary: [
      { time: "17:00", title: "Meet", text: "Outside the main entrance of Agra Fort railway station." },
      { time: "17:15", title: "Kinari Bazaar", text: "Chaat and the first sweet shop." },
      { time: "18:15", title: "Spice lane", text: "The wholesale market, and what goes into what you just ate." },
      { time: "19:00", title: "Petha and chai", text: "Agra's own sweet, at a maker's counter." },
      { time: "20:00", title: "Finish", text: "Your guide puts you in a prepaid auto-rickshaw to your hotel." },
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
    art: "lanes",
    durationHours: 4,
    startTime: "09:30",
    pickup: "Meet at the metro",
    languages: ["English"],
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
      { time: "09:30", title: "Meet", text: "Gate 5 of Chandni Chowk metro station." },
      { time: "09:45", title: "Breakfast lane", text: "Fried breads and the first chai." },
      { time: "11:00", title: "Wedding market by rickshaw", text: "Fifteen minutes on wheels." },
      { time: "11:45", title: "Spice market and rooftop", text: "Asia's largest wholesale spice market, from above." },
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
    art: "arch",
    durationHours: 8,
    startTime: "09:00",
    pickup: "Hotel pickup in Delhi",
    languages: ["English"],
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
      { time: "09:00", title: "Pickup", text: "Your guide and driver meet you at your hotel." },
      { time: "09:45", title: "Jama Masjid and Old Delhi", text: "The mosque courtyard and a short walk in the lanes." },
      { time: "11:30", title: "Humayun's Tomb", text: "The garden tomb that came before the Taj." },
      { time: "13:00", title: "Lunch", text: "Your choice, with suggestions." },
      { time: "14:15", title: "India Gate and the avenue", text: "By car, with a stop for photographs." },
      { time: "15:15", title: "Qutub Minar", text: "The tower and the ruins around it." },
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
    art: "palace",
    durationHours: 6,
    startTime: "08:30",
    pickup: "Hotel pickup in Jaipur",
    languages: ["English"],
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
      { time: "09:00", title: "Amber Fort", text: "Two hours in the courtyards, the mirror hall and the ramparts." },
      { time: "11:30", title: "Water palace viewpoint", text: "A ten-minute stop on the way back down." },
      { time: "12:15", title: "Observatory", text: "The stone instruments, and how they were used." },
      { time: "13:15", title: "Bazaars on foot", text: "Past the palace of winds and into the old market streets." },
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

export function toursIn(city: CitySlug): Tour[] {
  return tours.filter((t) => t.city === city);
}

export function cityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function tourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function cityFrom(city: CitySlug): number {
  return Math.min(...toursIn(city).map(fromPrice));
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
