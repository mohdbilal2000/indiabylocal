import Link from "next/link";
import { Photo } from "@/components/Photo";
import { PACE_LABEL, type Plan, type PlanDay } from "@/lib/plans";
import { destinationBySlug } from "@/lib/destinations";
import { tourBySlug } from "@/lib/data";

const PACE_DOTS = { easy: 1, steady: 2, full: 3 } as const;

/** Three dots and a word: how full the day is. Never colour alone. */
function Pace({ pace }: { pace: PlanDay["pace"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-caption font-semibold">
      <span aria-hidden="true" className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`size-2 rounded-full ${i <= PACE_DOTS[pace] ? "bg-brand" : "bg-hair"}`} />
        ))}
      </span>
      {PACE_LABEL[pace]}
    </span>
  );
}

/** One day as a card: a photograph, the day number, what happens and the one piece of advice that matters. */
export function DayCard({ day, n, sample }: { day: PlanDay; n: number; sample: boolean }) {
  const city = destinationBySlug(day.city);
  const tour = day.tour && sample ? tourBySlug(day.tour) : undefined;
  return (
    <li className="reveal flex flex-col overflow-hidden rounded-2xl border border-hair bg-card">
      <div className="relative aspect-[16/9]">
        <Photo name={day.photo} alt="" sizes="(min-width: 1024px) 40vw, 100vw" />
        <span className="scrim absolute inset-0" aria-hidden="true" />
        <p className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 text-white">
          <span aria-hidden="true" className="nums font-display text-display leading-none">
            {n}
          </span>
          <span>
            <span className="block text-caption uppercase tracking-wider opacity-90">
              <span className="sr-only">Day {n}: </span>
              {city?.name}
            </span>
            <span className="block font-display text-h4 font-semibold leading-tight">{day.title}</span>
          </span>
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Pace pace={day.pace} />
          {day.drive && (
            <span className="inline-flex items-center gap-1.5 text-caption font-semibold">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 16V11l2-5h10l2 5v5M3 16h18M7.5 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              </svg>
              <span className="sr-only">Road time: </span>
              {day.drive}
            </span>
          )}
        </div>
        <p>{day.summary}</p>
        <ul className="space-y-1.5 text-small">
          {day.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span aria-hidden="true" className="text-brand">
                ●
              </span>
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-auto rounded-xl bg-surface-alt p-3 text-small">
          <strong>Good to know:</strong> {day.tip}
        </p>
        {tour && (
          <Link href={`/tours/${tour.slug}`} className="link text-small font-semibold">
            See a sample tour for this day: {tour.title}
          </Link>
        )}
      </div>
    </li>
  );
}

/** A plan in a list of plans. The whole card is one link. */
export function PlanCard({ plan }: { plan: Plan }) {
  const lead = plan.plan[Math.min(2, plan.plan.length - 1)];
  return (
    <article className="group lift relative flex flex-col overflow-hidden rounded-2xl border border-hair bg-card">
      <div className="zoom relative aspect-[16/9]">
        <Photo name={lead.photo} alt="" sizes="(min-width: 1024px) 33vw, 100vw" />
        <span className="scrim absolute inset-0" aria-hidden="true" />
        <p className="absolute inset-x-0 bottom-0 p-4 text-white">
          <span className="nums font-display text-display leading-none">{plan.days}</span>
          <span className="ml-2 text-body">days</span>
        </p>
        {plan.recommended && (
          <p className="absolute top-3 left-3 rounded-full bg-action px-3 py-1 text-caption font-semibold text-on-action">
            Our usual recommendation
          </p>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h2 className="font-sans text-h4 font-semibold tracking-normal">
          <Link href={`/plans/${plan.slug}`} className="no-underline after:absolute after:inset-0">
            {plan.title}
          </Link>
        </h2>
        <p className="text-caption text-muted">{plan.nights}</p>
        <p className="text-small">{plan.line}</p>
        <p className="mt-auto pt-2 text-small text-muted">
          <strong className="text-ink">Suits:</strong> {plan.suits}
        </p>
      </div>
    </article>
  );
}
