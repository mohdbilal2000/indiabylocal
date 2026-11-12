import Link from "next/link";
import type { TrustKey } from "@/lib/data";
import { TRUST } from "@/lib/trust";

const ICONS: Record<TrustKey, React.ReactNode> = {
  licence: <path d="M4 5h16v14H4zM8 10h3M8 14h8M15.5 9.5a1.5 1.5 0 1 0 0 .01" />,
  monument: <path d="M4 20h16M6 20v-7M18 20v-7M10 20v-5h4v5M5 13c0-5 3-6 7-9 4 3 7 4 7 9z" />,
  women: <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6zM9 12l2 2 4-4" />,
  promise: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12.5l2.8 2.8L16 9.5" />,
};

export function TrustIcon({ kind, className = "size-5" }: { kind: TrustKey; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[kind]}
    </svg>
  );
}

/** Small pills for cards and page headers. */
export function TrustPills({ keys, max = keys.length }: { keys: TrustKey[]; max?: number }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {keys.slice(0, max).map((k) => (
        <li
          key={k}
          className="inline-flex items-center gap-1 rounded-full bg-verified-soft px-2.5 py-1 text-caption font-semibold text-verified"
        >
          <TrustIcon kind={k} className="size-4" />
          {TRUST[k].short}
        </li>
      ))}
    </ul>
  );
}

/** The full explanation: what each badge means on this tour. */
export function TrustPanel({ keys, sample = false }: { keys: TrustKey[]; sample?: boolean }) {
  return (
    <section aria-labelledby="trust-h" className="mt-12">
      <h2 id="trust-h" className="text-h3">
        What we have checked
      </h2>
      {sample && (
        <p className="prose-col mt-2 text-small text-muted">
          This is a sample listing, so these badges show what a real tour will carry once its guide has passed each
          check.
        </p>
      )}
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {keys.map((k) => (
          <li key={k} className="flex gap-3 rounded-xl border border-hair bg-card p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-verified-soft text-verified">
              <TrustIcon kind={k} />
            </span>
            <span>
              <span className="block font-semibold">{TRUST[k].label}</span>
              <span className="mt-0.5 block text-small text-muted">{TRUST[k].means}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-small">
        <Link href="/how-it-works#badges" className="link">
          How each check is done
        </Link>
      </p>
    </section>
  );
}
