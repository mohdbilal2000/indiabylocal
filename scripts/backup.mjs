// Exports the database to files you can keep somewhere else, and checks them.
//   npm run backup                          writes backups/<date-time>/ with one file per table and a manifest
//   npm run backup -- --verify backups/<d>  re-reads the files and checks every count and checksum
// The files contain password hashes and traveller email addresses. They are ignored by git: store them
// somewhere private (an encrypted disk or a locked bucket), never in the repository.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TABLES = ["operators", "listings", "booking_requests", "admin_actions"];
const sha = (text) => createHash("sha256").update(text).digest("hex");

const args = process.argv.slice(2);
const verifyAt = args[0] === "--verify" ? args[1] : null;

if (verifyAt) {
  const manifest = JSON.parse(readFileSync(join(verifyAt, "manifest.json"), "utf8"));
  let bad = 0;
  for (const [table, info] of Object.entries(manifest.tables)) {
    if (info.absent) {
      console.log(`${table}: not in the database when the backup was made`);
      continue;
    }
    const file = join(verifyAt, info.file);
    if (!existsSync(file)) {
      console.log(`${table}: FILE MISSING`);
      bad++;
      continue;
    }
    const text = readFileSync(file, "utf8");
    const rows = text.split("\n").filter(Boolean).length;
    const ok = sha(text) === info.sha256 && rows === info.rows;
    if (!ok) bad++;
    console.log(`${table}: ${rows} rows, ${ok ? "ok" : "DOES NOT MATCH THE MANIFEST"}`);
  }
  process.exit(bad ? 1 : 0);
}

const { neon } = await import("@neondatabase/serverless");
const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set. Run `vercel env pull .env.local` first.");
const sql = neon(url);

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const dir = join("backups", stamp);
mkdirSync(dir, { recursive: true });

const manifest = { created: new Date().toISOString(), tables: {} };
for (const table of TABLES) {
  try {
    // Table names come from the fixed list above, never from input.
    const rows = await sql.query(`select * from ${table} order by 1`);
    const text = rows.map((r) => JSON.stringify(r)).join("\n") + (rows.length ? "\n" : "");
    writeFileSync(join(dir, `${table}.ndjson`), text);
    manifest.tables[table] = { file: `${table}.ndjson`, rows: rows.length, sha256: sha(text) };
    console.log(`${table}: ${rows.length} rows`);
  } catch (e) {
    if (e?.code !== "42P01") throw e;
    manifest.tables[table] = { absent: true };
    console.log(`${table}: table does not exist yet`);
  }
}
writeFileSync(join(dir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\nSaved to ${dir}. Check it with: npm run backup -- --verify ${dir}`);
