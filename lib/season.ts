import { destinationBySlug } from "@/lib/destinations";

/**
 * A plain warning about the weather for the month a traveller has picked.
 * General climate only: it says what is usual, not what will happen.
 */
export function seasonNote(citySlug: string, month: number): string | null {
  const region = destinationBySlug(citySlug)?.region;
  if (!region || region === "islands") return null;
  if (region === "himalaya") {
    if (month === 12 || month <= 2) return "December to February is deep winter in the mountains. Snow can close roads and passes at short notice.";
    if (month >= 7 && month <= 8) return "July and August bring monsoon rain to most of the Himalaya, with a risk of landslides on mountain roads.";
    return null;
  }
  if (region === "north") {
    if (month >= 4 && month <= 6) return "April to June is the hottest time of year here, often above 40°C by midday. Early starts are far more comfortable.";
    if (month >= 7 && month <= 9) return "July to September is the monsoon. Expect heavy showers and humidity. Tours still run, and the monuments are quieter.";
    if (month >= 11 || month === 1) return "From November to January, Delhi's air is often poor and morning fog is common. Check a live air-quality reading, carry an N95 or FFP2 mask, and expect hazy sunrise views and late trains and flights.";
    return null;
  }
  if (month >= 6 && month <= 9) return "June to September is the monsoon across most of India. Heavy rain is likely on some days, so keep your plans flexible.";
  return null;
}
