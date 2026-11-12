import { type Tour, durationLabel, fromPrice } from "@/lib/data";
import type { Destination } from "@/lib/destinations";
import { CITY_ATTRACTIONS, CITY_ENTITY, type Entity, KNOWS_ABOUT, entitiesIn } from "@/lib/entities";
import { SITE_DESCRIPTION, SITE_LIVE, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * One connected graph per page. Every node has a stable @id, so the
 * organisation, a trip, its offer and its questions point at each other
 * instead of being four unrelated blocks.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

type Node = Record<string, unknown>;

export const graph = (...nodes: (Node | null | undefined | false)[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes.filter(Boolean),
});

const thing = (x: Entity): Node => ({ "@type": x.type, name: x.name, sameAs: x.sameAs });

export function organizationNode(): Node {
  return {
    "@type": ["TravelAgency", "OnlineBusiness"],
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    areaServed: { "@type": "Country", name: "India", sameAs: "https://en.wikipedia.org/wiki/India" },
    knowsAbout: KNOWS_ABOUT.map(thing),
  };
}

export function websiteNode(): Node {
  return { "@type": "WebSite", "@id": SITE_ID, url: SITE_URL, name: SITE_NAME, inLanguage: "en", publisher: { "@id": ORG_ID } };
}

export function breadcrumbNode(pageUrl: string, items: { name: string; href?: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.href ? { item: `${SITE_URL}${it.href}` } : {}),
    })),
  };
}

export function faqNode(pageUrl: string, items: { q: string; a: string }[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };
}

export function destinationNode(place: Destination): Node {
  const url = `${SITE_URL}/india/${place.slug}`;
  const city = CITY_ENTITY[place.slug];
  const sights = CITY_ATTRACTIONS[place.slug] ?? [];
  return {
    "@type": "TouristDestination",
    "@id": `${url}#destination`,
    name: place.name,
    url,
    description: place.blurb,
    ...(city ? { sameAs: city.sameAs } : {}),
    containedInPlace: { "@type": "AdministrativeArea", name: place.state },
    ...(sights.length ? { includesAttraction: sights.map(thing) } : {}),
  };
}

/** Questions a tour page can answer from its own data, so the answers can never drift from the listing. */
export function tourFaq(tour: Tour, cityName: string): { q: string; a: string }[] {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const last = tour.itinerary[tour.itinerary.length - 1];
  const tickets = tour.options.find((o) => o.ticketsIncluded && tour.ticketsUsd);
  const rows = [
    {
      q: "What time does the tour start and finish?",
      a: `It starts at ${tour.startTime} India time and ends at about ${last.time}, ${durationLabel(tour.durationHours)} in all. ${tour.pickup}. When you pick a date, the start is also shown in your own time zone.`,
    },
    {
      q: "What is included in the price?",
      a: `${tour.included.join(", ")}. ${
        tour.ticketsUsd
          ? tickets
            ? `Monument tickets are included if you choose "${tickets.name}"; otherwise they cost about $${tour.ticketsUsd} per person at the gate.`
            : `Monument tickets are not included and cost about $${tour.ticketsUsd} per person at the gate.`
          : "There is nothing else to pay on the route."
      } Tips are your choice.`,
    },
    {
      q: "Is this a private tour?",
      a: `Yes. Only your own party is on the tour, with one guide, for up to eight people. The price per person falls as your group grows, and it is shown for your exact group size before you send a request.`,
    },
    {
      q: "Can I cancel?",
      a: "Yes, free of charge until 24 hours before the start time. The exact deadline is shown in India time beside the date you pick.",
    },
  ];
  for (const c of tour.closedWeekdays ?? []) {
    rows.push({ q: `Does this tour run on ${days[c.day]}s?`, a: `No. ${c.reason} The calendar does not let you pick a ${days[c.day]}, so you cannot book a closed day by mistake.` });
  }
  if (cityName) rows.push({ q: "Will the guide take us to shops?", a: `No. There is no shop, workshop or showroom on this route in ${cityName}. If your guide takes you to one you did not ask for, tell us and we refund the tour.` });
  return rows;
}

export function tourGraph(tour: Tour, city: Destination, crumbs: { name: string; href?: string }[], photos: { url: string; width: number; height: number }[]) {
  const url = `${SITE_URL}/tours/${tour.slug}`;
  const offerId = `${url}#offer`;
  const from = fromPrice(tour);
  const prices = tour.options.flatMap((o) => o.tiers);
  const offer: Node = {
    "@type": "AggregateOffer",
    "@id": offerId,
    url,
    lowPrice: from,
    highPrice: Math.max(...prices),
    offerCount: tour.options.length,
    priceCurrency: "USD",
    seller: { "@id": ORG_ID },
    ...(SITE_LIVE ? { availability: "https://schema.org/InStock" } : {}),
  };
  const cityRef = CITY_ENTITY[tour.city];
  return graph(
    organizationNode(),
    breadcrumbNode(url, crumbs),
    {
      "@type": ["TouristTrip", "Product"],
      "@id": `${url}#trip`,
      name: tour.title,
      description: tour.summary,
      url,
      image: photos.map((p) => (p.url.startsWith("/") ? `${SITE_URL}${p.url}` : p.url)),
      brand: { "@type": "Brand", name: SITE_NAME },
      provider: { "@id": ORG_ID },
      touristType: ["Cultural tourism", "Private tour"],
      inLanguage: "en",
      offers: offer,
      itinerary: {
        "@type": "ItemList",
        numberOfItems: tour.itinerary.length,
        itemListElement: tour.itinerary.map((s, i) => {
          const known = entitiesIn(tour.city, `${s.title} ${s.text}`)[0];
          return {
            "@type": "ListItem",
            position: i + 1,
            item: known
              ? { "@type": known.type, name: known.name, sameAs: known.sameAs, description: s.text }
              : { "@type": "Place", name: s.title, description: s.text },
          };
        }),
      },
      subjectOf: { "@id": `${url}#faq` },
      ...(cityRef ? { about: thing(cityRef) } : {}),
    },
    faqNode(url, tourFaq(tour, city.name)),
  );
}
