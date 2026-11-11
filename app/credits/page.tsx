import type { Metadata } from "next";
import { Crumbs } from "@/components/Chrome";
import { photoCredits } from "@/components/Photo";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Photographers and licences for the destination photographs used on this site.",
  alternates: { canonical: "/credits" },
};

export default function Credits() {
  const rows = Object.entries(photoCredits).sort((a, b) => a[1].subject.localeCompare(b[1].subject));
  return (
    <div className="shell pt-6">
      <Crumbs items={[{ name: "Home", href: "/" }, { name: "Photo credits" }]} />
      <h1 className="mt-4 text-h2">Photo credits</h1>
      <p className="prose-col mt-3 text-muted">
        Destination photographs come from Wikimedia Commons under free licences. Each is credited to its author
        below, with a link to the original file and its licence terms. Photographs on operator listings belong to
        the operator.
      </p>
      <ul className="mt-8 divide-y divide-hair border-y border-hair text-small">
        {rows.map(([key, c]) => (
          <li key={key} className="grid gap-x-6 gap-y-0.5 py-2.5 sm:grid-cols-[1.2fr_1.5fr_auto]">
            <a href={c.source} rel="noopener nofollow" className="link font-medium">
              {c.subject}
            </a>
            <span className="text-muted">{c.artist}</span>
            <span className="text-muted">{c.license}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
