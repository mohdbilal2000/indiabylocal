"use client";

import Link from "next/link";
import { useActionState } from "react";
import { type FormState, logIn, saveListing, signUp } from "@/app/operators/actions";

function ErrorNote({ state }: { state: FormState }) {
  if (!state.error) return null;
  return (
    <p role="alert" className="rounded-lg border border-error bg-card p-3 text-small text-error">
      <span aria-hidden="true">⚠ </span>
      {state.error}
    </p>
  );
}

function Field({
  label,
  name,
  hint,
  state,
  ...rest
}: { label: string; name: string; hint?: string; state: FormState } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-small font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${name}-hint`} className="text-caption text-muted">
          {hint}
        </p>
      )}
      <input
        id={name}
        name={name}
        aria-describedby={hint ? `${name}-hint` : undefined}
        className="field mt-1"
        {...rest}
        defaultValue={state.fields?.[name] ?? rest.defaultValue}
        key={state.fields?.[name]}
      />
    </div>
  );
}

export function SignupForm() {
  const [state, action, pending] = useActionState(signUp, {});
  return (
    <form action={action} className="grid gap-4">
      <ErrorNote state={state} />
      <Field state={state} label="Business or trading name" name="business_name" required maxLength={80} autoComplete="organization" />
      <Field state={state} label="Contact person" name="contact_name" required maxLength={80} autoComplete="name" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field state={state} label="Email" name="email" type="email" required autoComplete="email" />
        <Field state={state} label="Phone, with country code" name="phone" type="tel" required placeholder="+91 98765 43210" autoComplete="tel" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field state={state} label="City you operate from" name="base_city" required maxLength={60} />
        <Field state={state} label="Guide or operator licence number" name="licence_no" hint="Optional now. Needed before a tour goes live." maxLength={60} />
      </div>
      <Field state={state} label="Password" name="password" type="password" required minLength={10} hint="At least 10 characters." autoComplete="new-password" />
      <button type="submit" className="btn mt-2" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </button>
      <p className="text-small text-muted">
        Already have an account?{" "}
        <Link href="/operators/login" className="link">
          Log in
        </Link>
      </p>
    </form>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(logIn, {});
  return (
    <form action={action} className="grid gap-4">
      <ErrorNote state={state} />
      <Field state={state} label="Email" name="email" type="email" required autoComplete="email" />
      <Field state={state} label="Password" name="password" type="password" required autoComplete="current-password" />
      <button type="submit" className="btn mt-2" disabled={pending}>
        {pending ? "Logging in…" : "Log in"}
      </button>
      <p className="text-small text-muted">
        New here?{" "}
        <Link href="/operators/signup" className="link">
          Create an operator account
        </Link>
      </p>
    </form>
  );
}

type Option = { slug: string; name: string; state: string };

export function ListingForm({
  places,
  initial,
  id,
}: {
  places: Option[];
  initial?: Record<string, string>;
  id?: string;
}) {
  const [state, action, pending] = useActionState(saveListing, { fields: initial });
  const v = (name: string) => state.fields?.[name] ?? "";
  const byState = new Map<string, Option[]>();
  for (const p of places) byState.set(p.state, [...(byState.get(p.state) ?? []), p]);

  return (
    <form action={action} className="grid gap-5">
      {id && <input type="hidden" name="id" value={id} />}
      <ErrorNote state={state} />

      <div>
        <label htmlFor="destination" className="text-small font-semibold">
          Destination
        </label>
        <select id="destination" name="destination" required defaultValue={v("destination")} key={v("destination")} className="field mt-1">
          <option value="">Choose a destination</option>
          {[...byState.entries()].sort().map(([st, list]) => (
            <optgroup key={st} label={st}>
              {list.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <Field state={state} label="Tour title" name="title" required minLength={10} maxLength={60} hint="10 to 60 characters. Say what it is, not how good it is." />

      <div>
        <label htmlFor="summary" className="text-small font-semibold">
          What happens on the tour
        </label>
        <p className="text-caption text-muted">60 to 600 characters.</p>
        <textarea id="summary" name="summary" required minLength={60} maxLength={600} rows={5} defaultValue={v("summary")} className="field mt-1" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field state={state} label="Duration, hours" name="duration_hours" type="number" required min={0.5} max={16} step={0.5} inputMode="decimal" />
        <Field state={state} label="Start time, India" name="start_time" type="time" required />
        <Field state={state} label="Largest group" name="max_group" type="number" required min={1} max={30} defaultValue="8" inputMode="numeric" />
      </div>

      <Field state={state} label="You receive, per person, in rupees" name="price_inr" type="number" required min={100} step={1} inputMode="numeric" hint="The amount you want paid to you. The traveller's price is worked out from this." />
      <Field state={state} label="Meeting point or pickup" name="meeting_point" required maxLength={200} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="highlights" className="text-small font-semibold">
            Highlights
          </label>
          <p className="text-caption text-muted">One per line.</p>
          <textarea id="highlights" name="highlights" rows={4} maxLength={800} defaultValue={v("highlights")} className="field mt-1" />
        </div>
        <div>
          <label htmlFor="included" className="text-small font-semibold">
            Included in the price
          </label>
          <p className="text-caption text-muted">One per line.</p>
          <textarea id="included" name="included" rows={4} maxLength={800} defaultValue={v("included")} className="field mt-1" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-hair pt-5">
        <button type="submit" name="intent" value="submit" className="btn" disabled={pending}>
          Submit for review
        </button>
        <button type="submit" name="intent" value="draft" className="btn-ghost" disabled={pending}>
          Save as draft
        </button>
        <Link href="/operators/dashboard" className="inline-flex min-h-12 items-center px-3 text-small text-muted hover:underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
