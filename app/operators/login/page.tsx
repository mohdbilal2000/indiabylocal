import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/OperatorForms";
import { currentOperator } from "@/lib/auth";

export const metadata: Metadata = { title: "Operator log in", robots: { index: false } };

export default async function Login() {
  if (await currentOperator()) redirect("/operators/dashboard");
  return (
    <div className="shell py-12 lg:py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-hair bg-card p-6 md:p-8">
        <h1 className="text-h3">Operator log in</h1>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
