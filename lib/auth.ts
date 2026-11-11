import "server-only";
import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type Operator, db } from "@/lib/db";

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>;
const COOKIE = "ibl_session";
const DAYS = 30;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltHex, keyHex] = stored.split("$");
  if (scheme !== "scrypt" || !saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, "hex");
  const actual = await scrypt(password, Buffer.from(saltHex, "hex"), expected.length);
  return timingSafeEqual(expected, actual);
}

const digest = (token: string) => createHash("sha256").update(token).digest("hex");

/** The cookie holds a random token; the database holds only its hash. */
export async function startSession(operatorId: string) {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + DAYS * 86_400_000);
  await db()`insert into sessions (token_hash, operator_id, expires_at)
             values (${digest(token)}, ${operatorId}, ${expires.toISOString()})`;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function endSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) await db()`delete from sessions where token_hash = ${digest(token)}`;
  jar.delete(COOKIE);
}

export async function currentOperator(): Promise<Operator | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const rows = await db()`
    select o.id, o.email, o.business_name, o.contact_name, o.phone, o.base_city, o.licence_no, o.status
    from sessions s join operators o on o.id = s.operator_id
    where s.token_hash = ${digest(token)} and s.expires_at > now() and o.status <> 'suspended'`;
  return (rows[0] as Operator | undefined) ?? null;
}

export async function requireOperator(): Promise<Operator> {
  const op = await currentOperator();
  if (!op) redirect("/operators/login");
  return op;
}
