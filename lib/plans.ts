/**
 * Planning guides for the Delhi, Agra and Jaipur route. These are suggestions
 * for how to pace a trip, not packages we sell: each day is booked on its
 * own as a day tour, which is also why they are labelled that way.
 *
 * Drive times are typical figures for a good day. Delhi traffic, roadworks and
 * weather can add an hour or more, and every plan leaves room for that.
 */
export type PlanDay = {
  title: string;
  city: "delhi" | "agra" | "jaipur";
  photo: string;
  summary: string;
  /** Road time on this day, in words. Absent on days with no long drive. */
  drive?: string;
  /** How full the day is. */
  pace: "easy" | "steady" | "full";
  highlights: string[];
  /** A sample tour on this site that fits the day. */
  tour?: string;
  /** Plain advice for the day. */
  tip: string;
};

export type Plan = {
  slug: string;
  title: string;
  days: number;
  nights: string;
  line: string;
  suits: string;
  recommended?: boolean;
  /** The worries this plan was built to avoid. */
  avoids: string[];
  plan: PlanDay[];
};

export const PACE_LABEL = { easy: "Easy day", steady: "Steady day", full: "Full day" } as const;

export const plans: Plan[] = [
  {
    slug: "golden-triangle-4-days",
    title: "Golden Triangle in 4 days",
    days: 4,
    nights: "3 nights: Delhi, Agra, Jaipur",
    line: "The shortest route we would suggest. It works, but the second and third days are long ones.",
    suits: "Short trips and repeat visitors who already know Delhi.",
    avoids: ["Backtracking: the route runs one way, Delhi to Agra to Jaipur", "A Taj Mahal visit squeezed into a drive day"],
    plan: [
      {
        title: "Delhi: the old city and a garden tomb",
        city: "delhi",
        photo: "x-jama-masjid",
        summary: "Start in Old Delhi before the heat, then spend the afternoon in the quieter southern half of the city.",
        pace: "steady",
        highlights: ["Jama Masjid and the lanes around it", "Humayun's Tomb, the garden tomb that came before the Taj", "Lunch where you choose, at menu price"],
        tour: "delhi-in-a-day-private-car-and-guide-d2",
        tip: "If you land the same morning after a long flight, keep this day half as long and do the old city on day 4's evening instead.",
      },
      {
        title: "Drive to Agra, Agra Fort at sunset",
        city: "agra",
        photo: "x-agra-fort",
        summary: "Leave Delhi after breakfast and reach Agra by early afternoon. The fort catches the late light.",
        drive: "About 4 hours; allow up to 6 on a bad traffic day",
        pace: "steady",
        highlights: ["The expressway, with one rest stop", "Agra Fort and its view across the river to the Taj"],
        tour: "taj-mahal-agra-fort-day-trip-from-delhi-a2",
        tip: "Agree where you will stop on the way before you leave, so the driver does not choose a shop for you.",
      },
      {
        title: "Taj Mahal at sunrise, then on to Jaipur",
        city: "agra",
        photo: "agra",
        summary: "Be at the gate when it opens, finish by mid-morning, then drive on to Jaipur with a stop at Fatehpur Sikri.",
        drive: "About 5 hours to Jaipur, plus the stop; allow up to 7",
        pace: "full",
        highlights: ["The Taj Mahal before the day-trip crowds", "Fatehpur Sikri, the abandoned red sandstone city"],
        tour: "taj-mahal-sunrise-private-tour-a1",
        tip: "The Taj Mahal is closed on Fridays. If your Agra day is a Friday, swap it for Agra Fort and Fatehpur Sikri and move the Taj to another day.",
      },
      {
        title: "Jaipur: Amber Fort and the Pink City",
        city: "jaipur",
        photo: "x-amber-fort",
        summary: "Amber Fort in the morning light, then the walled city and its bazaars on foot.",
        pace: "steady",
        highlights: ["Amber Fort, reached by jeep rather than elephant", "Jantar Mantar, the stone observatory", "The bazaars, with no shop stops unless you ask"],
        tour: "amber-fort-and-pink-city-private-tour-j1",
        tip: "A late flight home from Delhi means a five to six hour drive back the same day. Allow a full extra day, or fly out of Jaipur.",
      },
    ],
  },
  {
    slug: "golden-triangle-5-days",
    title: "Golden Triangle in 5 days",
    days: 5,
    nights: "4 nights: 1 Delhi, 2 Agra, 1 Jaipur",
    line: "Our usual recommendation for a first visit: a rest on arrival, the Taj on its own morning, and no day with two long jobs.",
    suits: "First visits, couples and families, and anyone who does not want to spend the trip in a car.",
    recommended: true,
    avoids: ["Jet-lag on day one", "Driving and sightseeing on the same morning", "Midday heat at the Taj Mahal"],
    plan: [
      {
        title: "Arrive in Delhi and take it slowly",
        city: "delhi",
        photo: "x-india-gate",
        summary: "Flights from the US and Europe often land late at night. Leave the day free, with an easy walk and an early dinner if you feel up to it.",
        pace: "easy",
        highlights: ["Rest, shower, eat", "Optional: India Gate and the government avenue in the evening light"],
        tip: "Ask your hotel for a pickup from the airport so the first half hour is not a negotiation.",
      },
      {
        title: "Old Delhi food walk, then Humayun's Tomb",
        city: "delhi",
        photo: "x-chandni-chowk",
        summary: "Eat in the lanes at breakfast time, when they are busiest and the air is cooler, then see the garden tomb in the afternoon.",
        pace: "steady",
        highlights: ["Chandni Chowk and the spice market from the roof", "Humayun's Tomb"],
        tour: "old-delhi-food-and-lanes-walk-d1",
        tip: "Choose stalls with a queue of local customers and food cooked to order. Skip ice and cut fruit.",
      },
      {
        title: "Drive to Agra, then Agra Fort",
        city: "agra",
        photo: "x-agra-fort",
        summary: "A morning drive on the expressway, a late lunch, and the fort at the end of the day. Nothing else is planned.",
        drive: "About 4 hours; allow up to 6 on a bad traffic day",
        pace: "steady",
        highlights: ["The expressway", "Agra Fort", "An early night before the sunrise start"],
        tour: "taj-mahal-agra-fort-day-trip-from-delhi-a2",
        tip: "Book a hotel within a short drive of the East Gate: the Taj opens near sunrise.",
      },
      {
        title: "Taj Mahal at sunrise, the old city at dusk",
        city: "agra",
        photo: "agra",
        summary: "The Taj Mahal first thing, back to the hotel for breakfast and a rest through the midday heat, and a food walk in the evening.",
        pace: "steady",
        highlights: ["The Taj Mahal when it opens", "A rest in the middle of the day", "Agra's old-city food walk in the evening"],
        tour: "taj-mahal-sunrise-private-tour-a1",
        tip: "The Taj Mahal is closed on Fridays. Count back from your flight and check the day before you book hotels.",
      },
      {
        title: "Fatehpur Sikri on the way to Jaipur, Amber Fort the next morning",
        city: "jaipur",
        photo: "x-fatehpur",
        summary: "A stop at the abandoned city on the road, and a Jaipur evening that is left free. Amber Fort follows the next morning if you add a day.",
        drive: "About 5 hours including the stop; allow up to 7",
        pace: "full",
        highlights: ["Fatehpur Sikri", "Arrive in Jaipur with the evening free"],
        tour: "amber-fort-and-pink-city-private-tour-j1",
        tip: "If your flight home is from Delhi, plan a sixth day for Jaipur and the drive back rather than rushing both.",
      },
    ],
  },
  {
    slug: "golden-triangle-7-days",
    title: "Golden Triangle in 7 days",
    days: 7,
    nights: "6 nights: 2 Delhi, 2 Agra, 2 Jaipur",
    line: "A rest day in each city, so the trip feels like a holiday and not a schedule.",
    suits: "Older travellers, families with children, anyone sensitive to heat or air quality, and photographers.",
    avoids: ["Back-to-back long days", "Winter smog days in Delhi forcing a missed plan", "Rushing the Taj Mahal and Amber Fort"],
    plan: [
      {
        title: "Arrive in Delhi and rest",
        city: "delhi",
        photo: "delhi",
        summary: "A free day to land, sleep and find your feet.",
        pace: "easy",
        highlights: ["Rest", "A short evening walk near the hotel"],
        tip: "In winter, check the air-quality reading before planning anything outdoors, and carry an N95 or FFP2 mask.",
      },
      {
        title: "Old Delhi on foot",
        city: "delhi",
        photo: "x-chandni-chowk",
        summary: "The old city in the morning, a long lunch and a quiet afternoon.",
        pace: "steady",
        highlights: ["Chandni Chowk", "Jama Masjid", "The spice market"],
        tour: "old-delhi-food-and-lanes-walk-d1",
        tip: "Shoulders and knees covered at the mosque; shoes come off at the door.",
      },
      {
        title: "New Delhi: tombs, towers and a garden",
        city: "delhi",
        photo: "x-qutub",
        summary: "Humayun's Tomb, Qutub Minar and the government avenue by car, with a long lunch between.",
        pace: "steady",
        highlights: ["Humayun's Tomb", "Qutub Minar", "India Gate"],
        tour: "delhi-in-a-day-private-car-and-guide-d2",
        tip: "If the air is poor, swap this for indoor museums and move the outdoor sights to a clearer day.",
      },
      {
        title: "Drive to Agra, Agra Fort",
        city: "agra",
        photo: "x-agra-fort",
        summary: "A morning drive, lunch in Agra, and the fort in the late afternoon.",
        drive: "About 4 hours; allow up to 6",
        pace: "steady",
        highlights: ["Agra Fort", "An early night"],
        tour: "taj-mahal-agra-fort-day-trip-from-delhi-a2",
        tip: "Ask the driver to confirm the plan the evening before: the car, the driver's name and the pickup time.",
      },
      {
        title: "Taj Mahal at sunrise, then a rest day",
        city: "agra",
        photo: "agra",
        summary: "The Taj Mahal at opening, the heat of the day by the pool, and Mehtab Bagh for a view across the river at sunset.",
        pace: "easy",
        highlights: ["The Taj Mahal", "Mehtab Bagh at sunset"],
        tour: "taj-mahal-sunrise-private-tour-a1",
        tip: "Closed on Fridays. In April to June, finish outdoors by 10:00.",
      },
      {
        title: "Fatehpur Sikri, then Jaipur",
        city: "jaipur",
        photo: "x-fatehpur",
        summary: "A morning at the abandoned city, then the road to Jaipur and a free evening.",
        drive: "About 5 hours including the stop; allow up to 7",
        pace: "full",
        highlights: ["Fatehpur Sikri", "Arrive in time for dinner"],
        tip: "Keep the evening empty; this is the longest day of the trip.",
      },
      {
        title: "Amber Fort and the Pink City",
        city: "jaipur",
        photo: "x-amber-fort",
        summary: "Amber Fort in the morning, the observatory and the bazaars on foot, and the afternoon is yours.",
        pace: "steady",
        highlights: ["Amber Fort", "Jantar Mantar", "The old-city bazaars"],
        tour: "amber-fort-and-pink-city-private-tour-j1",
        tip: "Your guide will not take you into shops unless you ask. If you want to buy something, ask for a fair price first.",
      },
    ],
  },
];

export const planBySlug = (slug: string) => plans.find((p) => p.slug === slug);

function validate() {
  for (const p of plans) {
    if (p.plan.length !== p.days) throw new Error(`Plan ${p.slug} says ${p.days} days but lists ${p.plan.length}`);
  }
}
validate();
