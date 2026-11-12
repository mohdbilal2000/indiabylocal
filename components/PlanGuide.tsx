import { CITY_ANSWERS } from "@/lib/answers";
import type { Destination } from "@/lib/destinations";
import { GUIDES_REVIEWED, type Guide } from "@/lib/guides";

/** The planning guide on a destination page: five plain answers, each readable on its own. */
export function PlanGuide({ place, guide }: { place: Destination; guide: Guide }) {
  const rows = planRows(place, guide);
  return (
    <section id="plan" aria-labelledby="plan-h" className="scroll-mt-24 pt-14">
      <h2 id="plan-h" className="text-h2">
        Plan your visit to {place.name}
      </h2>
      <dl className="reveal mt-6 divide-y divide-hair rounded-2xl border border-hair bg-card">
        {rows.map((r) => (
          <div key={r.q} className="grid gap-1 p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-8 md:p-6">
            <dt className="font-semibold">{r.q}</dt>
            <dd className="text-muted">{r.a}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-caption text-muted">
        Reviewed {GUIDES_REVIEWED}. Closing days and permit rules change, so confirm them before you travel.
      </p>
    </section>
  );
}

/** The same answers as question-and-answer pairs, for the page and for structured data. */
export function planRows(place: Destination, guide: Guide) {
  return [
    { q: `When is the best time to visit ${place.name}?`, a: `${place.best}.` },
    { q: `How many days do you need in ${place.name}?`, a: guide.days },
    { q: `How do you get to ${place.name}?`, a: guide.reach },
    { q: `Is a local guide worth it in ${place.name}?`, a: guide.local },
    { q: `What should you know before you go to ${place.name}?`, a: guide.know },
    ...(CITY_ANSWERS[place.slug] ?? []),
  ];
}
