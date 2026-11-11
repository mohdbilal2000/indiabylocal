# How to brief Claude on this project

A brief that covers these six lines gets the right thing built the first time. Anything you leave out, Claude decides and reports back.

1. **Outcome.** What should exist when the work is done, in one sentence. "A tour page a traveller can book from" beats "work on the tour page".
2. **Scope.** Which phase or page from [00-blueprint.md](00-blueprint.md). Say what is out of scope too.
3. **Fixed.** What must not change: the repository, the Vercel project, the stack, a design decision.
4. **Free.** What Claude may decide alone, and what it must ask about first (anything that spends money, sends a message, or publishes).
5. **Done means.** How you will check it: a URL, a passing test, a screenshot at 375 px and 1280 px.
6. **Unknowns.** End with: "List what I have not thought of, ranked by how badly it could hurt, and say which ones you checked and which you are guessing."

Line 6 is the one that finds the things you have never heard of. Ask for it every time.

## Example

> Build Phase 4 checkout for the Taj sunrise tour. Same repository, same Vercel project. Do not change the design tokens. Use Razorpay test mode; ask before anything touches live keys. Done means a test booking completes on the preview address on a phone. Then list what I have not thought of.

## Facts only you can supply

Claude cannot find these out, and the site stays in preview until they exist:

- Real guides: names, licence numbers, photographs, rupee prices.
- Company name after the trademark check (decision D1), registered address, support number.
- The payment route (D2) and the accountant's tax ruling (D3).
- Ticket prices and timings checked on site, with the date.
