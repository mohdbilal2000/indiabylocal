import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/OperatorForms";
import { currentOperator } from "@/lib/auth";

export const metadata: Metadata = { title: "Create an operator account", robots: { index: false } };

export default async function Signup() {
  if (await currentOperator()) redirect("/operators/dashboard");
  return (
    <div className="shell grid gap-10 py-12 lg:grid-cols-[1fr_1.2fr] lg:py-16">
      <div>
        <h1 className="text-h2">Create an operator account</h1>
        <p className="mt-3 max-w-md text-muted">
          For tour operators and licensed guides in India. Once you are in, you can add tours as drafts and submit
          them for review.
        </p>
        <ul className="mt-6 space-y-2 text-small">
          {["Free to list", "Commission fixed in writing", "You set your own rupee price"].map((t) => (
            <li key={t} className="flex gap-2">
              <span aria-hidden="true" className="text-success">
                ✓
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-hair bg-card p-6 md:p-8">
        <SignupForm />
      </div>
    </div>
  );
}
