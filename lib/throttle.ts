import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export type Kind = "login" | "signup" | "booking";

/** Keys are hashed, so the table holds no addresses or email addresses. */
export const keyOf = (value: string) => createHash("sha256").update(value).digest("hex").slice(0, 32);

/** The visitor's network address as set by the hosting platform, which overwrites anything the visitor sends. */
export async function clientIp(): Promise<string> {
  const h = await headers();
  const raw = h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0] ?? "";
  return raw.trim().slice(0, 64) || "unknown";
}

/**
 * True when `key` already has `max` or more recorded attempts of this kind in
 * the last `minutes`. If the table cannot be read (for example before the
 * migration has been run) it answers false, so a database problem never locks
 * a real person out; the other protections still apply.
 */
export async function isThrottled(kind: Kind, key: string, max: number, minutes: number): Promise<boolean> {
  try {
    const rows = await db()`
      select count(*)::int as n from auth_attempts
      where kind = ${kind} and key = ${key} and created_at > now() - make_interval(mins => ${minutes})`;
    return (rows[0].n as number) >= max;
  } catch {
    return false;
  }
}

export async function recordAttempt(kind: Kind, key: string): Promise<void> {
  try {
    const sql = db();
    await sql`insert into auth_attempts (kind, key) values (${kind}, ${key})`;
    // Old rows are of no use to anyone; clearing them here keeps the table small without a scheduled job.
    await sql`delete from auth_attempts where created_at < now() - interval '2 days'`;
  } catch {
    // Not being able to record an attempt must not break signing in.
  }
}
