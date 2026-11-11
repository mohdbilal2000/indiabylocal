// Review queue from the command line, until there is an admin screen.
//   npm run admin -- queue
//   npm run admin -- verify <operator-email>
//   npm run admin -- publish <listing-id>
//   npm run admin -- reject <listing-id>
//   npm run admin -- grant <operator-email>     (gives that account the /admin screen)
//   npm run admin -- revoke <operator-email>
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL);
const [cmd, arg] = process.argv.slice(2);

if (cmd === "queue") {
  const rows = await sql`
    select l.id, l.title, l.destination, l.price_inr, o.business_name, o.email, o.licence_no, o.status as operator
    from listings l join operators o on o.id = l.operator_id
    where l.status = 'submitted' order by l.updated_at`;
  console.table(rows);
} else if (cmd === "verify" && arg) {
  console.table(await sql`update operators set status = 'verified' where email = ${arg.toLowerCase()} returning email, business_name, status`);
} else if (cmd === "publish" && arg) {
  console.table(await sql`update listings set status = 'published', updated_at = now() where id = ${arg} and status = 'submitted' returning id, title, status`);
  console.log("Shown only if the operator is verified. The destination page refreshes within five minutes.");
} else if (cmd === "reject" && arg) {
  console.table(await sql`update listings set status = 'draft', updated_at = now() where id = ${arg} returning id, title, status`);
} else if ((cmd === "grant" || cmd === "revoke") && arg) {
  const rows = await sql`update operators set is_admin = ${cmd === "grant"} where email = ${arg.toLowerCase()} returning email, is_admin`;
  if (rows.length) console.table(rows);
  else console.log("No account with that email. Create one at /operators/signup first.");
} else {
  console.log("Usage: npm run admin -- queue | verify <email> | publish <id> | reject <id> | grant <email> | revoke <email>");
}
