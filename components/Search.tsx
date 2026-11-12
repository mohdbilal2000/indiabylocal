"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";

type Item = { slug: string; name: string; state: string; known: string[] };

/** Completes only to destinations that exist, so a search can never dead-end. */
export function Search({ items }: { items: Item[] }) {
  const router = useRouter();
  const listId = useId();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    const score = (i: Item) =>
      i.name.toLowerCase().startsWith(t) ? 0
      : i.name.toLowerCase().includes(t) ? 1
      : i.state.toLowerCase().includes(t) ? 2
      : i.known.some((k) => k.toLowerCase().includes(t)) ? 3
      : 9;
    return items
      .map((i) => ({ i, s: score(i) }))
      .filter((x) => x.s < 9)
      .sort((a, b) => a.s - b.s)
      .slice(0, 6)
      .map((x) => x.i);
  }, [q, items]);

  const go = (slug: string) => router.push(`/india/${slug}`);
  const show = open && q.trim().length > 0;

  return (
    <form
      role="search"
      className="relative"
      onSubmit={(e) => {
        e.preventDefault();
        if (matches[active]) go(matches[active].slug);
        else router.push("/destinations");
      }}
    >
      <div className="flex gap-2 rounded-2xl bg-card p-2 shadow-xl shadow-black/20 focus-within:ring-4 focus-within:ring-action">
        <label className="sr-only" htmlFor={`${listId}-in`}>
          Where in India?
        </label>
        <input
          id={`${listId}-in`}
          type="text"
          role="combobox"
          aria-expanded={show}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder="Where in India? Try Jaipur, Kerala, Taj Mahal"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, matches.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Escape") setOpen(false);
          }}
          className="h-12 min-w-0 flex-1 rounded-xl px-4 text-base text-ink placeholder:text-muted focus-visible:outline-none"
        />
        <button type="submit" className="btn shrink-0">
          Search
        </button>
      </div>
      {show && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-hair bg-card text-left text-ink shadow-xl"
        >
          {matches.length === 0 && (
            <li className="px-4 py-3 text-small text-muted">
              No destination matches that yet. Press Search to see all of them.
            </li>
          )}
          {matches.map((m, i) => (
            <li
              key={m.slug}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                go(m.slug);
              }}
              onMouseEnter={() => setActive(i)}
              className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 px-4 py-2 ${i === active ? "bg-surface-alt" : ""}`}
            >
              <span className="font-semibold">{m.name}</span>
              <span className="text-caption text-muted">{m.state}</span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
