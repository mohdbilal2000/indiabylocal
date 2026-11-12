"use client";

import { m } from "motion/react";
import { useId, useState } from "react";
import { Motion } from "@/components/Motion";
import type { Stop, StopTip } from "@/lib/data";

const TIP_LABEL: Record<StopTip["kind"], string> = { dress: "What to wear", photo: "Photographs", know: "Good to know" };

function TipIcon({ kind }: { kind: StopTip["kind"] }) {
  const d = {
    dress: "M8 4l4 2 4-2 4 4-3 2v10H7V10L4 8z",
    photo: "M4 8h3l1.5-2h7L17 8h3v11H4zM12 16.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    know: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 7.6v.2",
  }[kind];
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const hasMore = (s: Stop) => Boolean(s.detail || s.walk || s.tips?.length);

/**
 * The day, stop by stop. Each stop with more to say opens on tap. The extra
 * text is always in the page, only folded away, so search engines and
 * screen readers get the whole itinerary.
 */
export function ItineraryTimeline({ stops }: { stops: Stop[] }) {
  const base = useId();
  const expandable = stops.map(hasMore);
  const [open, setOpen] = useState<boolean[]>(() => expandable.map((can, i) => can && i === expandable.indexOf(true)));
  const allOpen = open.every((o, i) => o || !expandable[i]);

  const toggle = (i: number) => setOpen((prev) => prev.map((o, j) => (j === i ? !o : o)));

  return (
    <Motion>
      <div className="prose-col">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-small text-muted">All times are India time. Tap a stop for details.</p>
          <button
            type="button"
            onClick={() => setOpen(expandable.map((can) => can && !allOpen))}
            className="min-h-11 rounded-lg px-2 text-small font-semibold text-brand underline"
          >
            {allOpen ? "Close all stops" : "Open all stops"}
          </button>
        </div>
        <ol className="mt-3 border-l-2 border-brand">
          {stops.map((s, i) => {
            const panel = `${base}-p${i}`;
            const head = (
              <>
                <span className="nums block text-small font-semibold text-brand">{s.time}</span>
                <span className="block font-semibold">{s.title}</span>
                <span className="block text-small text-muted">{s.text}</span>
              </>
            );
            return (
              <li key={s.time} className="relative pb-5 pl-6 last:pb-0">
                <span aria-hidden="true" className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-brand bg-surface" />
                {expandable[i] ? (
                  <>
                    <h3 className="font-sans text-body font-normal tracking-normal">
                      <button
                        type="button"
                        aria-expanded={open[i]}
                        aria-controls={panel}
                        onClick={() => toggle(i)}
                        className="-my-1 flex w-full items-start justify-between gap-3 rounded-lg py-1 text-left"
                      >
                        <span>{head}</span>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          className={`mt-1 size-5 shrink-0 text-brand transition-transform duration-200 ${open[i] ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 7.5l5 5 5-5" />
                        </svg>
                      </button>
                    </h3>
                    <m.div
                      id={panel}
                      initial={false}
                      animate={
                        open[i]
                          ? { height: "auto", opacity: 1, visibility: "visible" }
                          : { height: 0, opacity: 0, transitionEnd: { visibility: "hidden" } }
                      }
                      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 rounded-xl bg-surface-alt p-4 text-small">
                        {s.detail && <p>{s.detail}</p>}
                        {s.walk && (
                          <p className="mt-3 flex gap-2 font-semibold">
                            <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M13 4.5a1.5 1.5 0 1 0 0 .01M9 21l2-6-2.5-2.5 1-5 3 2 3 1.5M6.5 12l1-4.5 3-1.5M14 21l-1-5" />
                            </svg>
                            <span>
                              <span className="sr-only">Walking: </span>
                              {s.walk}
                            </span>
                          </p>
                        )}
                        {s.tips && s.tips.length > 0 && (
                          <ul className="mt-3 space-y-2">
                            {s.tips.map((t) => (
                              <li key={t.text} className="flex gap-2">
                                <TipIcon kind={t.kind} />
                                <span>
                                  <strong>{TIP_LABEL[t.kind]}:</strong> {t.text}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </m.div>
                  </>
                ) : (
                  <h3 className="font-sans text-body font-normal tracking-normal">{head}</h3>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </Motion>
  );
}
