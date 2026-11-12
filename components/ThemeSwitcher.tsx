"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "ibl-theme";
type Choice = "auto" | "light" | "dark";

const prefersDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

function apply(choice: Choice) {
  const root = document.documentElement;
  if (choice === "auto") delete root.dataset.theme;
  else root.dataset.theme = choice;
  try {
    if (choice === "auto") window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, choice);
  } catch {
    // The choice still holds for this visit.
  }
}

function useTheme() {
  const [choice, setChoice] = useState<Choice>("auto");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const read = () => {
      const t = document.documentElement.dataset.theme;
      const c: Choice = t === "dark" || t === "light" ? t : "auto";
      setChoice(c);
      setDark(c === "dark" || (c === "auto" && mq.matches));
    };
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  const set = useCallback((c: Choice) => {
    apply(c);
    setChoice(c);
    setDark(c === "dark" || (c === "auto" && prefersDark()));
  }, []);

  return { choice, dark, set };
}

const Icon = ({ d }: { d: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const SUN = "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4";
const MOON = "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z";

/** One round button for the header. Before the page is interactive it shows a half-filled circle that is right in both themes. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { dark, set } = useTheme();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <button
      type="button"
      onClick={() => set(dark ? "light" : "dark")}
      aria-label={ready ? (dark ? "Switch to light mode" : "Switch to dark mode") : "Change between light and dark mode"}
      className={`flex size-11 items-center justify-center rounded-lg border border-line bg-card ${className}`}
    >
      {ready ? (
        <Icon d={dark ? SUN : MOON} />
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}

/** Three plain choices for the phone menu. */
export function ThemeChoice() {
  const { choice, set } = useTheme();
  const options: { value: Choice; label: string }[] = [
    { value: "auto", label: "Auto" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];
  return (
    <div className="flex min-h-14 items-center justify-between gap-4 py-2">
      <span id="theme-label" className="font-semibold">
        Appearance
      </span>
      <div role="group" aria-labelledby="theme-label" className="flex overflow-hidden rounded-lg border border-line">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={choice === o.value}
            onClick={() => set(o.value)}
            className={`min-h-11 px-3 text-small font-semibold ${choice === o.value ? "bg-strong text-on-strong" : "bg-card"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
