# Backend and server: state on 13 Nov 2026

## What exists

| Part | How it works | Checked |
|---|---|---|
| Hosting | Next.js on Vercel; pages are static and cached, forms use server actions | Built and run locally; the live project could not be seen from the build environment |
| Database | Neon Postgres through the serverless driver; every query is parameterised | SQL run against a real Postgres engine (PGlite) on 13 Nov, including the schema run twice |
| Operator accounts | Passwords hashed with scrypt; the session cookie holds a random token and the database holds only its hash; cookie is HttpOnly, SameSite=Lax, Secure in production | Code read |
| Ownership | Every listing change is scoped to the logged-in operator; admin screens re-check the admin flag on every action; admin actions are logged | Code read |
| Traveller requests | Stored in `booking_requests`, listed in `/admin`; limits per mailbox (5 a day), per network address (10 an hour) and overall (200 an hour) | SQL tested; limits tested on the mailbox rule only |
| Sign-in and sign-up | Six failed sign-ins per email and twenty per network address in 15 minutes are refused; five sign-ups per address per hour | SQL tested; not exercised end to end (no database here) |
| Headers | `nosniff`, no framing, strict referrer policy, camera/microphone/location off, same-origin opener policy, HSTS | Seen in a local response |
| Data export | `npm run backup` writes one file per table plus a manifest of row counts and checksums; `npm run backup -- --verify <folder>` re-checks them | Verification tested on a hand-made folder; export not run against a live database |

## Run once after this change

```bash
npm run db:migrate
```

This creates the `auth_attempts` table, adds the `mailbox` column to existing booking requests and adds two indexes. Until it is run the rate limits for sign-in, sign-up and per-address booking do nothing (they fail open so a database problem never locks a person out), and the mailbox limit will not work.

## What only you can check (the build environment cannot see these)

1. **The project exists and has `DATABASE_URL`.** In Vercel: Settings, Environment Variables. The Vercel account visible to this session had no project called IndiaByLocal in either team, so I could not look.
2. **Neon region.** Blueprint choice is Frankfurt for EU visitors. Check it in the Neon console.
3. **Neon restore window.** This depends on your plan (free plans keep hours of history, paid plans days to weeks). Note the number; it is your real safety net.
4. **Which branch Vercel deploys as Production.** `main` and the working branch now hold the same code. Pick one in Settings, Git.
5. **Vercel Firewall rate limit** on `/operators/login`, `/operators/signup` and the booking endpoint. The database limits above are a second layer, not a replacement.

## "Data never lost": what is true today

- The database provider keeps point-in-time history for its plan's window. That is protection against our mistakes and against deletion, but it sits at one provider.
- `npm run backup` gives an independent copy. A copy nobody makes is no protection, so schedule it (weekly while there is little data, daily once bookings exist) and keep the files in a private location that is not the same provider. The files hold password hashes and traveller emails: encrypt the disk or bucket and never commit them (`/backups/` is git-ignored).
- **Not built:** automatic scheduled backups to a second provider (needs your storage account and a scheduler), a restore drill that rebuilds a fresh database and checks it, a database role that cannot delete, and an append-only booking and payment ledger. All are in the Phase 1 plan in `00-blueprint.md` and become necessary the day payments start.

## Known gaps, in order

1. **No email.** Nobody is told when a traveller request or operator sign-up arrives; check `/admin` daily. Adding a transactional email service is the next backend job.
2. **No password reset or email verification** for operators. Anyone can register with any address; admin verification is the gate before a tour shows.
3. **No automated tests or CI.** Type-check and build are run by hand. A GitHub Actions workflow running `tsc` and `next build` is a small change but alters the pipeline, so it is left for you to approve.
4. **No error tracking or uptime check.** Failures appear only in Vercel logs. A free uptime monitor on the home page and an error tracker are cheap.
5. **No Content Security Policy.** The page uses small inline scripts (theme, structured data); a policy needs per-request nonces, which would stop pages being cached. Deferred.
6. **Schema changes are one file re-run.** Fine at this size. Move to numbered migrations before there are several developers or live bookings.
7. **Booking and payment.** Requests only. Decision D2 (how money reaches guides) still controls the design.
8. **Personal data.** Requests hold names, emails and phone numbers with no retention rule or deletion route. Publish a privacy policy naming the company, and add a way to delete a request on a traveller's written request, before launch.
9. **Account enumeration.** Sign-up says when an email is already registered. Common trade-off; acceptable while accounts are admin-verified.
