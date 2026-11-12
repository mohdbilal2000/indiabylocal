import Link from "next/link";
import { CurrencySwitcher } from "@/components/Currency";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeChoice, ThemeToggle } from "@/components/ThemeSwitcher";
import { regions } from "@/lib/destinations";
import { SITE_LIVE, SITE_NAME } from "@/lib/site";

export function PreviewBanner() {
  if (SITE_LIVE) return null;
  return (
    <p className="bg-night px-4 py-2 text-center text-caption text-white">
      Preview. Tours marked Sample are placeholders, and traveller booking is not open yet. Operators can sign up now.
    </p>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`min-w-0 truncate font-display text-h4 font-semibold tracking-tight no-underline ${light ? "text-white" : "text-ink"}`}>
      India<span className={light ? "text-action" : "text-brand"}>By</span>Local
    </Link>
  );
}

const MENU = [
  { href: "/destinations", label: "Destinations", note: "All 67 places, by region" },
  { href: "/plans", label: "Trip plans", note: "4, 5 or 7 days, paced properly" },
  { href: "/before-you-go", label: "Before you go", note: "Ten worries, answered" },
  { href: "/guides", label: "City guides", note: "When to go, how long, what to see" },
  { href: "/how-it-works", label: "How it works", note: "Booking, price and our Promise" },
  { href: "/saved", label: "Saved tours", note: "Tours you marked with a heart" },
  { href: "/for-operators", label: "For tour operators", note: "List your tours" },
  { href: "/operators/login", label: "Operator log in" },
];

export function Header() {
  const item = "inline-flex min-h-12 items-center rounded-lg px-3 font-medium hover:bg-surface-alt";
  return (
    <header className="sticky top-0 z-30 border-b border-hair bg-surface/95 backdrop-blur">
      <div className="shell relative flex min-h-16 items-center justify-between gap-3 py-1">
        <Logo />
        <nav aria-label="Main" className="hidden flex-1 items-center pl-6 text-small lg:flex">
          <Link href="/destinations" className={item}>
            Destinations
          </Link>
          <Link href="/plans" className={item}>
            Trip plans
          </Link>
          <Link href="/before-you-go" className={item}>
            Before you go
          </Link>
          <Link href="/how-it-works" className={item}>
            How it works
          </Link>
          <Link href="/for-operators" className={`${item} ml-auto`}>
            For tour operators
          </Link>
          <Link href="/saved" className={item}>
            Saved
          </Link>
          <CurrencySwitcher className="ml-1" />
          <ThemeToggle className="ml-1" />
          <Link href="/destinations" className="btn ml-2 min-h-11 whitespace-nowrap px-4 text-small">
            Find a tour
          </Link>
        </nav>
        <MobileMenu links={MENU}>
          <div className="flex min-h-14 items-center justify-between gap-4 py-2">
            <span className="font-semibold">Show prices in</span>
            <CurrencySwitcher />
          </div>
          <ThemeChoice />
        </MobileMenu>
      </div>
    </header>
  );
}

export function Footer() {
  const a = "inline-flex min-h-11 items-center opacity-85 hover:underline hover:opacity-100";
  return (
    <footer className="mt-24 border-t border-white/10 bg-night text-white">
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
              <Link className={a} href="/plans">
                Trip plans: 4, 5 or 7 days
              </Link>
            </li>
            <li>
              <Link className={a} href="/before-you-go">
                Before you go: ten worries
              </Link>
            </li>
            <li>
              <Link className={a} href="/guides">
                City guides
              </Link>
            </li>
            <li>
              <Link className={a} href="/how-it-works">
                How it works and our Promise
              </Link>
            </li>
            <li>
              <Link className={a} href="/india/agra/taj-mahal/tickets-timings">
                Taj Mahal tickets and timings
              </Link>
            </li>
            <li>
              <Link className={a} href="/saved">
                Saved tours
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
              <Link href={it.href} className="inline-flex min-h-11 items-center hover:underline">
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
