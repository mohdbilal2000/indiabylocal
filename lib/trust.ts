import type { TrustKey } from "@/lib/data";

/**
 * The four badges. Each one names a specific check we carry out, never a
 * general claim. A tour shows a badge only after that check has been done.
 */
export const TRUST: Record<TrustKey, { label: string; short: string; means: string; check: string }> = {
  licence: {
    label: "Government-licensed guide",
    short: "Licensed guide",
    means: "Your guide holds a current guide licence from the Ministry of Tourism or a state tourism department.",
    check: "We see the licence card and a government identity document, and show the licence number and issuing authority on the guide's profile.",
  },
  monument: {
    label: "Cleared for protected monuments",
    short: "Monument guide",
    means: "Your guide is allowed to guide inside monuments protected by the Archaeological Survey of India, such as the Taj Mahal, Agra Fort and Qutub Minar.",
    check: "Only certain licences permit this. We confirm the category on the card before a monument tour can be listed.",
  },
  women: {
    label: "Checked for women travelling alone",
    short: "Solo-woman checked",
    means: "The tour meets our rules for women travelling alone: identity shown before the day, no change of plan after dark without your agreement, and a woman guide on request where one is available.",
    check: "We interview the guide by video and review the route and timings. This is a set of checks, not a promise that nothing can go wrong.",
  },
  promise: {
    label: "No-shopping-stop Promise",
    short: "No shop stops",
    means: "If your guide does not turn up, or takes you to a shop you did not ask for, you get the full tour price back.",
    check: "Every operator signs this before listing. Two breaches and the listing is removed.",
  },
};
