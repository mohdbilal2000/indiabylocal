// Writes lib/blur.json: a 12-pixel-wide preview of every photograph, shown
// while the full image loads. Run again after adding photographs:
//   node scripts/blur.mjs
import { readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const dir = new URL("../public/photos/", import.meta.url);
const out = {};
for (const file of readdirSync(dir).filter((f) => f.endsWith(".jpg")).sort()) {
  const buf = await sharp(fileURLToPath(new URL(file, dir))).resize(12).webp({ quality: 30 }).toBuffer();
  out[file.replace(/\.jpg$/, "")] = `data:image/webp;base64,${buf.toString("base64")}`;
}
writeFileSync(new URL("../lib/blur.json", import.meta.url), `${JSON.stringify(out, null, 1)}\n`);
console.log(`Wrote ${Object.keys(out).length} previews.`);
