import Link from "next/link";
import { cities } from "@/lib/data";
import { SITE_LIVE, SITE_NAME } from "@/lib/site";

export function PreviewBanner() {
  if (SITE_LIVE) return null;
  return (
    <p className="bg-brand px-4 py-2 text-center text-caption text-surface">
      Preview build. The tours and prices shown are samples, and booking is not open yet.
    </p>
  );
}

export function Header() {
  return (
    <header className="border-b border-hair bg-surface">
      <div className="shell flex min-h-16 flex-wrap items-center gap-x-6 gap-y-1 py-2">
        <Link href="/" className="font-display text-h4 font-semibold tracking-tight text-brand no-underline">
          India<span className="text-ink">By</span>Local
        </Link>
        <nav aria-label="Cities" className="flex flex-1 items-center gap-1 text-small">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/india/${c.slug}`}
              className="inline-flex min-h-12 items-center rounded-lg px-3 font-medium hover:bg-surface-alt"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/for-guides"
            className="ml-auto inline-flex min-h-12 items-center rounded-lg px-3 font-medium text-muted hover:bg-surface-alt"
          >
            For guides
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-hair bg-surface-alt">
      <div className="shell grid gap-8 py-12 text-small md:grid-cols-[2fr_1fr_1fr]">
        <div className="prose-col">
          <p className="font-display text-h4 font-semibold text-brand">{SITE_NAME}</p>
          <p className="mt-2 text-muted">
            Private day tours in India with a named, licence-verified local guide, at one all-in price.
          </p>
          {!SITE_LIVE && (
            <p className="mt-4 text-muted">
              This is a preview. Listings, prices and times are samples. Company and contact details will be published
              here before the first booking is taken.
            </p>
          )}
        </div>
        <nav aria-label="Destinations">
          <p className="font-semibold">Destinations</p>
          <ul className="mt-2 space-y-1">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link className="inline-flex min-h-8 items-center hover:underline" href={`/india/${c.slug}`}>
                  Tours in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="More">
          <p className="font-semibold">More</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                className="inline-flex min-h-8 items-center hover:underline"
                href="/india/agra/taj-mahal/tickets-timings"
              >
                Taj Mahal tickets and timings
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-8 items-center hover:underline" href="/for-guides">
                List your tour
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-small text-muted">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-x-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {it.href ? (
              <Link href={it.href} className="inline-flex min-h-8 items-center hover:underline">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
