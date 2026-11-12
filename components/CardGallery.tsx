"use client";

import { useCallback, useRef, useState } from "react";

/**
 * A swipeable strip of photographs. Scrolling is native (CSS scroll snap), so
 * it works before any script loads; the script only adds the arrows and dots.
 * Slides are rendered on the server and passed in as children.
 */
export function CardGallery({ count, label, children }: { count: number; label: string; children: React.ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const go = (to: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: to * el.clientWidth, behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-20 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/95 text-ink opacity-0 shadow transition-opacity group-hover:opacity-100 focus-visible:opacity-100 disabled:hidden [@media(hover:hover)]:flex";

  return (
    <div className="relative z-10">
      <ul
        ref={track}
        onScroll={onScroll}
        aria-label={label}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      {count > 1 && (
        <>
          <button type="button" aria-label="Previous photo" disabled={index === 0} onClick={() => go(index - 1)} className={`${arrow} left-2`}>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.5 4.5L7 10l5.5 5.5" />
            </svg>
          </button>
          <button type="button" aria-label="Next photo" disabled={index === count - 1} onClick={() => go(index + 1)} className={`${arrow} right-2`}>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7.5 4.5L13 10l-5.5 5.5" />
            </svg>
          </button>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-2.5 z-20 flex justify-center gap-1.5">
            {Array.from({ length: count }, (_, i) => (
              <span key={i} className={`size-1.5 rounded-full bg-white shadow transition-opacity ${i === index ? "opacity-100" : "opacity-50"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
