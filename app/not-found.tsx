import Link from "next/link";
import { cities } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="shell py-20">
      <h1 className="text-h2">That page does not exist.</h1>
      <p className="prose-col mt-3 text-muted">The address may be mistyped, or the tour may have been withdrawn.</p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {cities.map((c) => (
          <li key={c.slug}>
            <Link href={`/india/${c.slug}`} className="btn">
              Tours in {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
