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

const words = (s: string) => s.trim().split(/\s+/).length;
for (const a of [...Object.values(CITY_ANSWERS).flat(), SCAM_ANSWER]) {
  const n = words(a.a);
  if (n < 45 || n > 55) throw new Error(`Answer must be 45 to 55 words, but is ${n}: "${a.q}"`);
}
