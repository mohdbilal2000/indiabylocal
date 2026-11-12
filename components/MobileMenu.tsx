"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type MenuLink = { href: string; label: string; note?: string };

/** Phone and tablet menu: one clearly labelled button that opens a short list of large links. */
export function MobileMenu({ links }: { links: MenuLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wrap = useRef<HTMLDivElement>(null);

  // Close after moving to another page, on Escape, and on a tap outside.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const tap = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", tap);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", tap);
    };
  }, [open]);

  return (
    <div ref={wrap} className="shrink-0 lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-line bg-card px-3 font-semibold"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
        </svg>
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="site-menu"
        aria-label="Main"
        hidden={!open}
        className="menu-panel absolute inset-x-0 top-full border-b border-line bg-card shadow-lg shadow-black/10"
      >
        <ul className="shell divide-y divide-hair py-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="flex min-h-14 flex-col justify-center py-2 no-underline">
                <span className="font-semibold">{l.label}</span>
                {l.note && <span className="text-small text-muted">{l.note}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
