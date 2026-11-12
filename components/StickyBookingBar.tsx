"use client";

import { m, useDragControls } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BookingPanel } from "@/components/BookingPanel";
import { Money } from "@/components/Currency";
import { Motion } from "@/components/Motion";
import { type Bookable, fromAmount } from "@/lib/booking";

const CLOSE_MS = 220;

/**
 * Phones and tablets: a bar fixed to the bottom of the tour page with the
 * price and one button. The button opens the booking panel as a sheet that
 * slides up, and that can be dragged down by its handle to close.
 *
 * The sheet is a native <dialog>, so the browser handles focus, the Escape
 * key and making the page behind it inert.
 */
export function StickyBookingBar({ item, whatsapp }: { item: Bookable; whatsapp: string | null }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const drag = useDragControls();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const open = () => {
    clearTimeout(timer.current);
    setMounted(true);
    setShown(true);
  };

  const close = useCallback(() => {
    setShown(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      dialog.current?.close();
      setMounted(false);
    }, CLOSE_MS);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = dialog.current;
    if (el && !el.open) el.showModal();
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = before;
    };
  }, [mounted]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-hair bg-card/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-6px_24px_var(--shadow-ink)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
          <p className="nums min-w-0 text-small leading-tight">
            <span className="text-muted">From </span>
            <strong className="text-price">
              <Money amount={fromAmount(item)} currency={item.currency} />
            </strong>
            <span className="text-muted"> per person</span>
            <span className="block text-caption text-verified">Free cancellation</span>
          </p>
          <button type="button" onClick={open} aria-haspopup="dialog" className="btn shrink-0 whitespace-nowrap">
            Check dates
          </button>
        </div>
      </div>

      {mounted && (
        <Motion drag>
        <m.dialog
          ref={dialog}
          aria-label={`Book: ${item.title}`}
          onCancel={(e) => {
            e.preventDefault();
            close();
          }}
          onClick={(e) => {
            if (e.target === dialog.current) close();
          }}
          initial={{ y: "100%" }}
          animate={{ y: shown ? 0 : "100%" }}
          transition={{ duration: CLOSE_MS / 1000, ease: [0.2, 0.8, 0.2, 1] }}
          drag="y"
          dragControls={drag}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.6 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 110 || info.velocity.y > 600) close();
          }}
          className="sheet fixed inset-x-0 top-auto bottom-0 m-0 flex max-h-[92dvh] w-full max-w-none flex-col rounded-t-3xl bg-card p-0 text-ink"
        >
          <div className="shrink-0 px-4 pt-2">
            <div
              onPointerDown={(e) => drag.start(e)}
              className="mx-auto flex h-6 w-24 cursor-grab touch-none items-center justify-center"
              aria-hidden="true"
            >
              <span className="h-1.5 w-12 rounded-full bg-hair" />
            </div>
            <div className="flex items-center justify-between gap-3 pb-2">
              <p className="min-w-0 truncate text-small font-semibold">{item.title}</p>
              <button type="button" onClick={close} className="-mr-2 flex min-h-11 shrink-0 items-center gap-1 rounded-lg px-2 text-small font-semibold">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
                Close
              </button>
            </div>
          </div>
          <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-hair px-4 pt-4 pb-[max(20px,env(safe-area-inset-bottom))]">
            <div className="mx-auto max-w-md">
              <BookingPanel item={item} whatsapp={whatsapp} onDone={close} />
            </div>
          </div>
        </m.dialog>
        </Motion>
      )}
    </>
  );
}
