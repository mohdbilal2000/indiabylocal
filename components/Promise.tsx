import Link from "next/link";

/** The Promise beside the booking button: one sentence, with the terms one tap away. See docs/08-experience.md §7. */
export function PromiseSeal() {
  return (
    <div className="promise mt-4 grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3 rounded-xl border border-verified bg-card p-3">
      <svg viewBox="0 0 56 56" aria-hidden="true" className="size-11">
        <circle cx="28" cy="28" r="25" pathLength={1} className="promise-ring" />
        <path d="M18 29l7 7 14-15" className="promise-tick" />
      </svg>
      <p className="text-small">
        <strong>The Promise.</strong> If your guide doesn&apos;t show, or takes you to a shop you didn&apos;t ask for, you get the full tour price back.{" "}
        <Link href="/how-it-works#promise" className="font-semibold text-verified underline">
          What it covers
        </Link>
      </p>
    </div>
  );
}
