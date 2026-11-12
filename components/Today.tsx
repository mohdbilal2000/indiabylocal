"use client";

import { useEffect, useState } from "react";

const AGRA = { lat: 27.1751, lon: 78.0421 };

/** Sunrise in India time for a calendar day, from the standard solar-position approximation. Accurate to about two minutes. */
export function sunriseIST(year: number, month: number, day: number, lat = AGRA.lat, lon = AGRA.lon): string {
  const rad = Math.PI / 180;
  const n = Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 0)) / 86400000);
  const lngHour = lon / 15;
  const t = n + (6 - lngHour) / 24;
  const M = 0.9856 * t - 3.289;
  let L = M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634;
  L = ((L % 360) + 360) % 360;
  let RA = Math.atan(0.91764 * Math.tan(L * rad)) / rad;
  RA = ((RA % 360) + 360) % 360;
  RA = (RA + Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90) / 15;
  const sinDec = 0.39782 * Math.sin(L * rad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(90.833 * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
  const H = (360 - Math.acos(cosH) / rad) / 15;
  const T = H + RA - 0.06571 * t - 6.622;
  const ist = (((T - lngHour + 5.5) % 24) + 24) % 24;
  const mins = Math.round(ist * 60);
  return `${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, "0")}`;
}

/** One live line under the hero: tomorrow's sunrise at the Taj, and whether it is open. */
export function Today() {
  const [line, setLine] = useState<{ sunrise: string; day: string; friday: boolean } | null>(null);
  useEffect(() => {
    // Tomorrow's date in India, whatever the visitor's own time zone.
    const now = new Date(Date.now() + 24 * 3600 * 1000);
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", year: "numeric", month: "numeric", day: "numeric", weekday: "long" }).formatToParts(now);
    const get = (k: string) => parts.find((p) => p.type === k)?.value ?? "";
    const y = Number(get("year"));
    const m = Number(get("month"));
    const d = Number(get("day"));
    setLine({ sunrise: sunriseIST(y, m, d), day: get("weekday"), friday: get("weekday") === "Friday" });
  }, []);
  return (
    <p className="nums mt-5 flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1 text-small" aria-live="polite">
      <span className="inline-flex items-center gap-2 font-semibold">
        <span aria-hidden="true" className="today-dot" />
        Agra tomorrow
      </span>
      {line ? (
        <>
          <span>Sunrise at the Taj {line.sunrise} India time</span>
          <span className="opacity-90">{line.friday ? "Friday: the Taj Mahal is closed" : `${line.day}: open`}</span>
        </>
      ) : (
        <span className="opacity-90">The Taj Mahal is closed on Fridays</span>
      )}
    </p>
  );
}
