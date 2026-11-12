/**
 * The places and ideas our pages are about, tied to their Wikipedia entries.
 * Search engines and AI assistants use these links to be sure which "Agra
 * Fort" or "Jantar Mantar" a page means. Only entries we are certain of are
 * listed; a name with no entry here is simply published without a link.
 */
const W = "https://en.wikipedia.org/wiki/";

export type Entity = { name: string; type: "TouristAttraction" | "LandmarksOrHistoricalBuildings" | "City" | "Thing"; sameAs: string };

const e = (name: string, article: string, type: Entity["type"] = "LandmarksOrHistoricalBuildings"): Entity => ({ name, type, sameAs: W + article });

export const CITY_ENTITY: Record<string, Entity> = {
  agra: e("Agra", "Agra", "City"),
  delhi: e("Delhi", "Delhi", "City"),
  jaipur: e("Jaipur", "Jaipur", "City"),
  varanasi: e("Varanasi", "Varanasi", "City"),
  udaipur: e("Udaipur", "Udaipur", "City"),
  jodhpur: e("Jodhpur", "Jodhpur", "City"),
  amritsar: e("Amritsar", "Amritsar", "City"),
  rishikesh: e("Rishikesh", "Rishikesh", "City"),
  mumbai: e("Mumbai", "Mumbai", "City"),
  kochi: e("Kochi", "Kochi", "City"),
  madurai: e("Madurai", "Madurai", "City"),
  hampi: e("Hampi", "Hampi", "City"),
  khajuraho: e("Khajuraho", "Khajuraho", "City"),
  kolkata: e("Kolkata", "Kolkata", "City"),
};

/** What each city page is about, beyond the city itself. */
export const CITY_ATTRACTIONS: Record<string, Entity[]> = {
  agra: [e("Taj Mahal", "Taj_Mahal"), e("Agra Fort", "Agra_Fort"), e("Fatehpur Sikri", "Fatehpur_Sikri"), e("Mehtab Bagh", "Mehtab_Bagh", "TouristAttraction")],
  delhi: [e("Red Fort", "Red_Fort"), e("Humayun's Tomb", "Humayun%27s_Tomb"), e("Qutb Minar", "Qutb_Minar"), e("Jama Masjid", "Jama_Masjid,_Delhi"), e("Chandni Chowk", "Chandni_Chowk", "TouristAttraction"), e("Old Delhi (Shahjahanabad)", "Old_Delhi", "TouristAttraction"), e("India Gate", "India_Gate")],
  jaipur: [e("Amber Fort", "Amer_Fort"), e("Hawa Mahal", "Hawa_Mahal"), e("Jantar Mantar", "Jantar_Mantar,_Jaipur"), e("City Palace", "City_Palace,_Jaipur"), e("Jal Mahal", "Jal_Mahal")],
  varanasi: [e("Ghats of Varanasi", "Ghats_in_Varanasi", "TouristAttraction"), e("Dashashwamedh Ghat", "Dashashwamedh_Ghat", "TouristAttraction"), e("Sarnath", "Sarnath"), e("Kashi Vishwanath Temple", "Kashi_Vishwanath_Temple")],
  udaipur: [e("City Palace", "City_Palace,_Udaipur"), e("Lake Pichola", "Lake_Pichola", "TouristAttraction")],
  jodhpur: [e("Mehrangarh", "Mehrangarh")],
  amritsar: [e("Golden Temple", "Golden_Temple"), e("Jallianwala Bagh", "Jallianwala_Bagh")],
  mumbai: [e("Gateway of India", "Gateway_of_India"), e("Chhatrapati Shivaji Terminus", "Chhatrapati_Shivaji_Terminus"), e("Elephanta Caves", "Elephanta_Caves")],
  madurai: [e("Meenakshi Temple", "Meenakshi_Temple")],
  khajuraho: [e("Khajuraho Group of Monuments", "Khajuraho_Group_of_Monuments")],
  kolkata: [e("Victoria Memorial", "Victoria_Memorial,_Kolkata"), e("Howrah Bridge", "Howrah_Bridge")],
};

/** Ideas the whole site is about. Used on the organisation record. */
export const KNOWS_ABOUT: Entity[] = [
  e("Tourism in India", "Tourism_in_India", "Thing"),
  e("Golden Triangle (India)", "Golden_Triangle_(India)", "Thing"),
  e("Mughal architecture", "Mughal_architecture", "Thing"),
  e("Tour guide", "Tour_guide", "Thing"),
  e("Archaeological Survey of India", "Archaeological_Survey_of_India", "Thing"),
  e("World Heritage Sites in India", "List_of_World_Heritage_Sites_in_India", "Thing"),
  e("Indian cuisine", "Indian_cuisine", "Thing"),
];

/** Attractions named in a piece of text, for linking an itinerary stop to its entity. */
export function entitiesIn(citySlug: string, text: string): Entity[] {
  const hay = text.toLowerCase();
  return (CITY_ATTRACTIONS[citySlug] ?? []).filter((a) => {
    const key = a.name.toLowerCase().replace(/ \(.*\)$/, "");
    return hay.includes(key) || (key === "qutb minar" && hay.includes("qutub minar"));
  });
}
