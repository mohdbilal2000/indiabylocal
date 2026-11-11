import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-24">
      <h1 className="text-h2">That page does not exist.</h1>
      <p className="prose-col mt-3 text-muted">The address may be mistyped, or the tour may have been withdrawn.</p>
      <Link href="/destinations" className="btn mt-6">
        Browse destinations
      </Link>
    </div>
  );
}
