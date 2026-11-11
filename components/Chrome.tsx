import Link from "next/link";
import { regions } from "@/lib/destinations";
import { SITE_LIVE, SITE_NAME } from "@/lib/site";

export function PreviewBanner() {
  if (SITE_LIVE) return null;
  return (
    <p className="bg-brand px-4 py-2 text-center text-caption text-white">
      Preview. Tours marked Sample are placeholders, and traveller booking is not open yet. Operators can sign up now.
    </p>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`font-display text-h4 font-semibold tracking-tight no-underline ${light ? "text-white" : "text-brand"}`}>
      India<span className="text-action">By</span>Local
    </Link>
  );
}

export function Header() {
  const item = "min-h-12 items-center rounded-lg px-3 font-medium hover:bg-surface-alt";
  return (
    <header className="sticky top-0 z-30 border-b border-hair bg-surface/95 backdrop-blur">
      <div className="shell flex min-h-16 items-center gap-2 py-1">
        <Logo />
        <nav aria-label="Main" className="ml-2 flex flex-1 items-center text-small sm:ml-6">
          <Link href="/destinations" className={`${item} inline-flex`}>
            Destinations
          </Link>
          <Link href="/for-operators" className={`${item} hidden sm:inline-flex`}>
            For operators
          </Link>
          <Link href="/operators/login" className={`${item} ml-auto hidden md:inline-flex`}>
            Operator log in
          </Link>
          <Link href="/operators/signup" className="btn ml-auto min-h-11 whitespace-nowrap px-4 text-small md:ml-2">
            List your tours
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const a = "inline-flex min-h-8 items-center opacity-85 hover:underline hover:opacity-100";
  return (
    <footer className="mt-24 bg-brand text-white">
      <div className="shell grid gap-10 py-14 text-small sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-3 max-w-xs opacity-85">
            Day tours across India, run by local operators and licensed guides, at one all-in price.
          </p>
          {!SITE_LIVE && (
            <p className="mt-4 max-w-xs text-caption opacity-70">
              Preview. Company and contact details will be published here before the first booking is taken.
            </p>
          )}
        </div>
        <nav aria-label="Regions">
          <p className="font-semibold">Regions</p>
          <ul className="mt-2">
            {regions.map((r) => (
              <li key={r.slug}>
                <Link className={a} href={`/destinations#${r.slug}`}>
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Travellers">
          <p className="font-semibold">Travellers</p>
          <ul className="mt-2">
            <li>
              <Link className={a} href="/destinations">
                All destinations
              </Link>
            </li>
            <li>
              <Link className={a} href="/india/agra/taj-mahal/tickets-timings">
                Taj Mahal tickets and timings
              </Link>
            </li>
            <li>
              <Link className={a} href="/credits">
                Photo credits
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Operators">
          <p className="font-semibold">Tour operators</p>
          <ul className="mt-2">
            <li>
              <Link className={a} href="/for-operators">
                Why list with us
              </Link>
            </li>
            <li>
              <Link className={a} href="/operators/signup">
                Create an operator account
              </Link>
            </li>
            <li>
              <Link className={a} href="/operators/login">
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="shell border-t border-white/15 py-5 text-caption opacity-70">
        © {new Date().getFullYear()} {SITE_NAME}
      </p>
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
