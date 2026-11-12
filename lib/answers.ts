/**
 * Direct answers to questions travellers type into search engines and AI
 * assistants. Each is 45 to 55 words, makes sense with nothing around it,
 * and avoids prices and promises we cannot stand behind. The length rule is
 * checked when this file loads, so an edit that breaks it fails the build.
 */
export type Answer = { q: string; a: string };

export const CITY_ANSWERS: Record<string, Answer[]> = {
  delhi: [
    {
      q: "Is Delhi safe for a woman travelling alone?",
      a: "Many women visit Delhi alone without trouble, but it asks for more care than most capital cities. Use app-based cabs or the metro, where the first coach is reserved for women, avoid empty streets after dark and dress modestly in the old city. A licensed guide on day one helps you find your feet.",
    },
    {
      q: "How do you eat street food safely in Chandni Chowk?",
      a: "Choose stalls with a queue of local customers, where food is fried or grilled to order in front of you. Skip cut fruit, salads, chutneys left standing in the open and drinks with ice, and carry bottled water. Start with a small portion at each stop; mornings are cooler and less crowded.",
    },
  ],
  agra: [
    {
      q: "Is the Taj Mahal open on Fridays?",
      a: "No. The Taj Mahal is closed to visitors every Friday; only worshippers attending afternoon prayers at its mosque may enter. On other days it opens about thirty minutes before sunrise and closes about thirty minutes before sunset. Plan Agra Fort or Fatehpur Sikri for a Friday, since both of them stay open.",
    },
    {
      q: "How much does a private licensed guide cost in Agra?",
      a: "A private licensed guide in Agra is usually priced for the group, not per person, so the cost per head falls as your party grows. Expect three separate lines: the guide, the car or hotel pickup, and monument tickets, which for foreign visitors are the largest extra. Ask for the licence number before you pay.",
    },
  ],
};

export const SCAM_ANSWER: Answer = {
  q: "How do I avoid tourist scams in India?",
  a: "Book your guide and transport before you arrive, and ignore anyone who says your hotel, ticket office or station is closed. Agree the fare first or use an app-based cab, buy monument tickets only at the official counter or website, and decline unplanned shop stops. A licensed guide carries a government photo identity card.",
};

/** Questions that apply to the whole route, not one city. Shown on /before-you-go. */
export const TOPIC_ANSWERS: Record<string, Answer> = {
  worth: {
    q: "Is the Taj Mahal worth it?",
    a: "For most first-time visitors, yes. It is larger and more finely worked than photographs suggest, and the early-morning light is the reason to go. The cost is queues, security checks and heat, so book an opening-time visit, avoid Fridays when it is closed, and give it a morning rather than squeezing it between drives.",
  },
  days: {
    q: "How many days do you need for the Golden Triangle?",
    a: "Five days is a comfortable first trip: one in Delhi, two in Agra and one in Jaipur, with the long drives on separate days. Four days works but feels rushed, and three means most of your time is spent in a car. Add a rest day if you travel with children or are over seventy.",
  },
  drive: {
    q: "How long is the drive from Delhi to Agra?",
    a: "Plan on about four hours by car on the Yamuna Expressway, and allow up to six when traffic leaves Delhi slowly or roadworks begin. The expressway itself is quick; the first stretch out of the city is the unpredictable part, and leaving early usually avoids the worst of it.",
  },
  food: {
    q: "Can you eat street food in Agra and Jaipur?",
    a: "Yes, if you choose carefully. Eat where locals queue and the food is cooked hot in front of you, and skip salads, cut fruit, chutney left standing and drinks with ice. Drink only sealed bottled water. Start with small portions for the first two days, and ask your doctor about stomach medicine before you fly.",
  },
  wear: {
    q: "What should you wear to the Taj Mahal?",
    a: "Dress for heat and respect. Light, loose clothing that covers shoulders and knees is comfortable in the sun and suitable at mosques and temples, where shoes also come off, so wear slip-on shoes and carry socks. There is no strict dress code at the Taj Mahal itself, and comfortable walking shoes matter more than fashion.",
  },
  air: {
    q: "Is Delhi's air too polluted to visit in December?",
    a: "Delhi's air is often poor from late October to January, and some days are unhealthy even for fit adults. Check a live air-quality reading before outdoor plans, carry an N95 or FFP2 mask and keep indoor alternatives ready. People with asthma or heart conditions should ask their doctor, and may prefer February or March.",
  },
  guide: {
    q: "Do you need a guide at the Taj Mahal?",
    a: "You can visit without one, but a licensed guide makes the day easier. They handle the queue and security, explain the inlay work and history you would otherwise miss, and keep touts away. Only licensed guides may guide inside protected monuments, so ask to see the licence card before you agree to anything.",
  },
  costs: {
    q: "Are entrance fees included in Golden Triangle tours?",
    a: "It depends on the tour, and many listings do not say. Ask whether monument tickets, the extra mausoleum ticket, tolls, parking, the guide, water and meals are in the price. On this site every tour shows the tickets as a separate line, either included or with the amount you will pay at the gate.",
  },
};

const words = (s: string) => s.trim().split(/\s+/).length;
for (const a of [...Object.values(CITY_ANSWERS).flat(), SCAM_ANSWER, ...Object.values(TOPIC_ANSWERS)]) {
  const n = words(a.a);
  if (n < 45 || n > 55) throw new Error(`Answer must be 45 to 55 words, but is ${n}: "${a.q}"`);
}
