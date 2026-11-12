"use client";

import { useEffect, useState } from "react";
import { SAVED_COOKIE, SAVED_MAX, parseSaved } from "@/lib/saved";

const EVENT = "ibl-saved-change";

function read(): string[] {
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${SAVED_COOKIE}=`));
  return parseSaved(hit?.slice(SAVED_COOKIE.length + 1));
}

function write(ids: string[]) {
  const value = encodeURIComponent(ids.slice(-SAVED_MAX).join(","));
  document.cookie = `${SAVED_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 180}; samesite=lax`;
  window.dispatchEvent(new Event(EVENT));
}

/** A heart that keeps a tour on this device's Saved list. No account needed. */
export function SaveButton({ id, title, className = "" }: { id: string; title: string; className?: string }) {
  const [saved, setSaved] = useState(false);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(read().includes(id));
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, [id]);

  const toggle = () => {
    const ids = read();
    write(saved ? ids.filter((x) => x !== id) : [...ids.filter((x) => x !== id), id]);
    setPop(!saved);
  };

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`Save ${title}`}
      onClick={toggle}
      onAnimationEnd={() => setPop(false)}
      className={`flex size-11 items-center justify-center rounded-full bg-card/95 shadow ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`size-5 ${pop ? "heart-pop" : ""} ${saved ? "fill-celebrate stroke-celebrate" : "fill-none stroke-ink"}`}
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
      </svg>
    </button>
  );
}
