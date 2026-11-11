export type RegionSlug = "north" | "himalaya" | "west" | "central" | "south" | "east" | "northeast" | "islands";

export const regions: { slug: RegionSlug; name: string; line: string }[] = [
  { slug: "north", name: "North India", line: "Mughal monuments, desert forts and the Ganges" },
  { slug: "himalaya", name: "The Himalaya", line: "Hill stations, monasteries and high passes" },
  { slug: "west", name: "West India", line: "Mumbai, the Konkan coast and the salt desert" },
  { slug: "central", name: "Central India", line: "Tiger reserves and temple towns" },
  { slug: "south", name: "South India", line: "Backwaters, temple cities and tea country" },
  { slug: "east", name: "East India", line: "Kolkata, the Buddhist circuit and the Bay of Bengal" },
  { slug: "northeast", name: "The Northeast", line: "Rhinos, root bridges and mountain monasteries" },
  { slug: "islands", name: "Islands", line: "Coral reefs and empty beaches" },
];

export type Destination = {
  slug: string;
  name: string;
  state: string;
  region: RegionSlug;
  blurb: string;
  known: string[];
  best: string;
};

const d = (
  slug: string,
  name: string,
  state: string,
  region: RegionSlug,
  blurb: string,
  known: string[],
  best: string,
): Destination => ({ slug, name, state, region, blurb, known, best });

export const destinations: Destination[] = [
  // North
  d("agra", "Agra", "Uttar Pradesh", "north", "The Taj Mahal, Agra Fort and the old city behind them, with a guide licensed to work inside the monuments.", ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"], "October to March"),
  d("delhi", "Delhi", "Delhi", "north", "Old Delhi on foot, New Delhi by car, and seven cities' worth of tombs, forts and food in between.", ["Red Fort", "Humayun's Tomb", "Chandni Chowk"], "October to March"),
  d("jaipur", "Jaipur", "Rajasthan", "north", "Amber Fort before the coaches arrive, then the walled Pink City: the palace of winds, the observatory and the bazaars.", ["Amber Fort", "Hawa Mahal", "City Palace"], "October to March"),
  d("varanasi", "Varanasi", "Uttar Pradesh", "north", "Dawn on the Ganges by rowing boat, the evening fire ceremony at the ghats, and lanes too narrow for a car.", ["Ganges ghats", "Evening aarti", "Sarnath"], "October to March"),
  d("lucknow", "Lucknow", "Uttar Pradesh", "north", "The city of the nawabs: vast imambaras, a labyrinth built into a roof, and the kebabs the rest of India copies.", ["Bara Imambara", "Rumi Darwaza", "Awadhi food"], "October to March"),
  d("udaipur", "Udaipur", "Rajasthan", "north", "A palace city on a lake. Boat rides at dusk, the City Palace museum and the Aravalli hills all around.", ["Lake Pichola", "City Palace", "Sajjangarh"], "September to March"),
  d("jodhpur", "Jodhpur", "Rajasthan", "north", "Mehrangarh Fort on its rock above a city painted blue, and the clock-tower market at its foot.", ["Mehrangarh Fort", "Blue City lanes", "Jaswant Thada"], "October to March"),
  d("jaisalmer", "Jaisalmer", "Rajasthan", "north", "A sandstone fort people still live in, carved merchant houses, and the Thar desert dunes an hour away.", ["Jaisalmer Fort", "Sam dunes", "Patwon ki Haveli"], "October to March"),
  d("pushkar", "Pushkar", "Rajasthan", "north", "A small holy lake ringed by ghats and temples, with a camel fair every autumn.", ["Pushkar Lake", "Brahma Temple", "Camel fair"], "October to March"),
  d("ranthambore", "Ranthambore", "Rajasthan", "north", "Tiger safaris among the ruins of a hill fort. One of the better places in India to see a tiger in daylight.", ["Tiger safaris", "Ranthambore Fort", "Lake Padam"], "October to June"),
  d("amritsar", "Amritsar", "Punjab", "north", "The Golden Temple at night, its kitchen that feeds anyone who walks in, and the border ceremony at Wagah.", ["Golden Temple", "Wagah border", "Jallianwala Bagh"], "October to March"),
  d("chandigarh", "Chandigarh", "Chandigarh", "north", "Le Corbusier's planned city, a sculpture garden built from scrap, and the gateway to the Himachal hills.", ["Rock Garden", "Capitol Complex", "Sukhna Lake"], "October to March"),
  // Himalaya
  d("shimla", "Shimla", "Himachal Pradesh", "himalaya", "The old summer capital on a ridge: colonial buildings, cedar forest and a mountain railway up from the plains.", ["The Ridge", "Toy train", "Jakhoo Temple"], "March to June, December to January"),
  d("manali", "Manali", "Himachal Pradesh", "himalaya", "A valley town under snow peaks, the base for Solang, the Rohtang Pass and the road to Ladakh.", ["Rohtang Pass", "Solang Valley", "Old Manali"], "March to June, October"),
  d("dharamshala", "Dharamshala", "Himachal Pradesh", "himalaya", "Home of the Dalai Lama and the Tibetan community in exile, with day hikes into the Dhauladhar range.", ["McLeod Ganj", "Tsuglagkhang", "Triund trek"], "March to June, September to November"),
  d("spiti", "Spiti Valley", "Himachal Pradesh", "himalaya", "A cold desert valley of cliff-top monasteries and villages above 4,000 metres. Remote, and worth a local driver.", ["Key Monastery", "Chandratal", "Kibber"], "June to September"),
  d("rishikesh", "Rishikesh", "Uttarakhand", "himalaya", "Where the Ganges leaves the mountains: yoga schools, suspension bridges, river rafting and the evening aarti.", ["Ganga aarti", "River rafting", "Yoga ashrams"], "September to April"),
  d("haridwar", "Haridwar", "Uttarakhand", "himalaya", "One of Hinduism's holiest cities, where thousands gather on the riverbank every evening.", ["Har Ki Pauri", "Ganga aarti", "Mansa Devi"], "October to March"),
  d("nainital", "Nainital", "Uttarakhand", "himalaya", "A hill station wrapped around a lake, with viewpoints towards the snow line.", ["Naini Lake", "Snow View", "Boat rides"], "March to June, October to November"),
  d("jim-corbett", "Jim Corbett", "Uttarakhand", "himalaya", "India's oldest national park. Jeep safaris for tigers, elephants and hundreds of bird species.", ["Jeep safaris", "Dhikala zone", "Birdwatching"], "November to June"),
  d("srinagar", "Srinagar", "Jammu and Kashmir", "himalaya", "Houseboats and shikara rides on Dal Lake, Mughal gardens, and the old city's wooden mosques.", ["Dal Lake", "Mughal gardens", "Old city"], "April to October"),
  d("gulmarg", "Gulmarg", "Jammu and Kashmir", "himalaya", "A high meadow with one of the world's highest cable cars. Skiing in winter, wildflowers in summer.", ["Gondola", "Skiing", "Meadow walks"], "December to March, May to September"),
  d("leh", "Leh", "Ladakh", "himalaya", "A high-altitude town of monasteries and passes. Allow two days to acclimatise before going anywhere.", ["Thiksey Monastery", "Pangong Lake", "Khardung La"], "May to September"),
  // West
  d("mumbai", "Mumbai", "Maharashtra", "west", "The Gateway of India, Victorian and Art Deco streets, the island caves of Elephanta and street food at every corner.", ["Gateway of India", "Elephanta Caves", "Street food"], "November to February"),
  d("ajanta-ellora", "Ajanta and Ellora", "Maharashtra", "west", "Rock-cut cave temples and painted monasteries, including a temple carved downward from a single cliff.", ["Kailasa Temple", "Ajanta murals", "Daulatabad Fort"], "October to March"),
  d("goa", "Goa", "Goa", "west", "Beaches north and south, Portuguese-era churches in Old Goa, spice farms and the Latin quarter of Panaji.", ["Beaches", "Old Goa churches", "Fontainhas"], "November to February"),
  d("ahmedabad", "Ahmedabad", "Gujarat", "west", "A walled old city of carved wooden houses, stepwells, and the ashram Gandhi marched from.", ["Adalaj Stepwell", "Old city walk", "Sabarmati Ashram"], "November to February"),
  d("kutch", "Rann of Kutch", "Gujarat", "west", "A white salt desert to the horizon, craft villages, and a winter festival under the full moon.", ["White Rann", "Craft villages", "Rann Utsav"], "November to February"),
  d("gir", "Gir", "Gujarat", "west", "The only place in the world to see Asiatic lions in the wild, by jeep safari.", ["Asiatic lions", "Jeep safaris", "Devalia"], "December to March"),
  // Central
  d("khajuraho", "Khajuraho", "Madhya Pradesh", "central", "Thousand-year-old temples covered in some of the finest stone carving in India.", ["Western temples", "Sound and light show", "Panna nearby"], "October to March"),
  d("gwalior", "Gwalior", "Madhya Pradesh", "central", "A hilltop fort with tiled palaces and rock-cut Jain colossi, a few hours south of Agra.", ["Gwalior Fort", "Man Mandir", "Jai Vilas Palace"], "October to March"),
  d("sanchi", "Sanchi", "Madhya Pradesh", "central", "The great Buddhist stupa, begun in the third century BC, with its carved gateways intact.", ["Great Stupa", "Udayagiri Caves", "Bhimbetka"], "October to March"),
  d("orchha", "Orchha", "Madhya Pradesh", "central", "A quiet riverside town of palaces, temples and royal cenotaphs that the crowds mostly skip.", ["Jahangir Mahal", "Cenotaphs", "Betwa River"], "October to March"),
  d("kanha", "Kanha", "Madhya Pradesh", "central", "Sal forest and meadows, tigers and swamp deer. The landscape that inspired The Jungle Book.", ["Tiger safaris", "Barasingha", "Meadows"], "October to June"),
  d("chitrakote", "Chitrakote Falls", "Chhattisgarh", "central", "India's widest waterfall, in the forested Bastar region, known for its tribal markets.", ["Chitrakote Falls", "Tirathgarh", "Bastar markets"], "July to February"),
  // South
  d("bengaluru", "Bengaluru", "Karnataka", "south", "Garden city and tech capital: a palace, a botanical garden, old markets and a serious food and coffee scene.", ["Bangalore Palace", "Lalbagh", "Food walks"], "October to February"),
  d("mysuru", "Mysuru", "Karnataka", "south", "A royal city: the palace lit by thousands of bulbs, a flower market and sandalwood and silk workshops.", ["Mysore Palace", "Devaraja Market", "Chamundi Hill"], "October to February"),
  d("hampi", "Hampi", "Karnataka", "south", "The ruins of the Vijayanagara capital scattered across a landscape of giant boulders.", ["Virupaksha Temple", "Vittala Temple", "Boulder landscape"], "October to February"),
  d("coorg", "Coorg", "Karnataka", "south", "Coffee and spice estates in the Western Ghats, with waterfalls and forest walks.", ["Coffee estates", "Abbey Falls", "Dubare"], "October to March"),
  d("hyderabad", "Hyderabad", "Telangana", "south", "The Charminar and its bazaars, Golconda Fort, and the biryani the city is named for.", ["Charminar", "Golconda Fort", "Biryani"], "October to February"),
  d("chennai", "Chennai", "Tamil Nadu", "south", "Temple neighbourhoods, a long city beach, classical music and dance, and filter coffee.", ["Kapaleeshwarar Temple", "Marina Beach", "Fort St George"], "November to February"),
  d("mahabalipuram", "Mahabalipuram", "Tamil Nadu", "south", "Seventh-century shore temples and rock reliefs carved by the Pallavas, on the Bay of Bengal.", ["Shore Temple", "Arjuna's Penance", "Five Rathas"], "November to February"),
  d("madurai", "Madurai", "Tamil Nadu", "south", "One of India's oldest cities, built around a temple with towers covered in thousands of painted figures.", ["Meenakshi Temple", "Night ceremony", "Banana market"], "October to March"),
  d("ooty", "Ooty", "Tamil Nadu", "south", "A Nilgiri hill station reached by a rack railway through tea estates.", ["Nilgiri Mountain Railway", "Tea estates", "Doddabetta"], "October to June"),
  d("pondicherry", "Pondicherry", "Puducherry", "south", "A former French town with a seafront promenade, mustard-yellow villas and Auroville nearby.", ["French Quarter", "Promenade", "Auroville"], "October to March"),
  d("kochi", "Kochi", "Kerala", "south", "A port city of Chinese fishing nets, a synagogue, spice warehouses and Kathakali performances.", ["Fort Kochi", "Chinese fishing nets", "Mattancherry"], "October to March"),
  d("munnar", "Munnar", "Kerala", "south", "Tea estates rolling over the Western Ghats at 1,600 metres, with a national park above them.", ["Tea estates", "Eravikulam", "Top Station"], "September to March"),
  d("alleppey", "Alleppey", "Kerala", "south", "The Kerala backwaters by houseboat, canoe or kayak, through canals lined with coconut palms.", ["Houseboats", "Village canoe trips", "Vembanad Lake"], "October to March"),
  d("thekkady", "Thekkady", "Kerala", "south", "Periyar's lake and forest: boat safaris, guided walks with former poachers, and spice plantations.", ["Periyar boat safari", "Spice plantations", "Forest walks"], "October to March"),
  d("varkala", "Varkala", "Kerala", "south", "A beach below red cliffs, with a path of cafes along the top.", ["Cliff beach", "Janardanaswamy Temple", "Surfing"], "November to March"),
  d("tirupati", "Tirupati", "Andhra Pradesh", "south", "The hill temple of Venkateswara, one of the most visited places of worship in the world.", ["Tirumala temple", "Hill walk", "Chandragiri Fort"], "September to February"),
  d("araku", "Araku Valley", "Andhra Pradesh", "south", "A hill valley of coffee plantations and tribal villages, reached by a scenic train from Visakhapatnam.", ["Scenic railway", "Borra Caves", "Coffee"], "October to February"),
  // East
  d("kolkata", "Kolkata", "West Bengal", "east", "Colonial avenues, the flower market under Howrah Bridge, trams, bookshops and Bengali sweets.", ["Victoria Memorial", "Howrah flower market", "College Street"], "October to February"),
  d("darjeeling", "Darjeeling", "West Bengal", "east", "Tea gardens, a narrow-gauge steam railway, and sunrise on Kanchenjunga from Tiger Hill.", ["Toy train", "Tiger Hill", "Tea estates"], "March to May, October to December"),
  d("sundarbans", "Sundarbans", "West Bengal", "east", "The world's largest mangrove forest, explored by boat. Tigers live here; seeing one takes luck.", ["Boat safaris", "Mangrove creeks", "Village stays"], "November to February"),
  d("konark", "Puri and Konark", "Odisha", "east", "The Sun Temple, built as a stone chariot, and the temple town and beach of Puri.", ["Konark Sun Temple", "Jagannath Temple", "Puri beach"], "October to February"),
  d("bhubaneswar", "Bhubaneswar", "Odisha", "east", "A city of hundreds of temples in the Kalinga style, with rock-cut Jain caves on its edge.", ["Lingaraja Temple", "Mukteshvara", "Udayagiri Caves"], "October to February"),
  d("bodh-gaya", "Bodh Gaya", "Bihar", "east", "Where the Buddha attained enlightenment. The Mahabodhi Temple and monasteries built by a dozen countries.", ["Mahabodhi Temple", "Bodhi tree", "Nalanda nearby"], "October to March"),
  // Northeast
  d("gangtok", "Gangtok", "Sikkim", "northeast", "Sikkim's hillside capital: Buddhist monasteries, Kanchenjunga views and a high-altitude lake.", ["Rumtek Monastery", "Tsomgo Lake", "MG Marg"], "March to May, October to December"),
  d("kaziranga", "Kaziranga", "Assam", "northeast", "Grassland on the Brahmaputra, home to most of the world's one-horned rhinoceroses.", ["One-horned rhinos", "Jeep safaris", "Birdlife"], "November to April"),
  d("guwahati", "Guwahati", "Assam", "northeast", "The gateway to the Northeast, with a hilltop temple and sunset cruises on the Brahmaputra.", ["Kamakhya Temple", "Brahmaputra cruise", "Umananda"], "October to April"),
  d("cherrapunji", "Shillong and Cherrapunji", "Meghalaya", "northeast", "Bridges grown from living tree roots, waterfalls off the plateau edge, and some of the wettest hills on earth.", ["Living root bridges", "Nohkalikai Falls", "Dawki"], "October to May"),
  d("tawang", "Tawang", "Arunachal Pradesh", "northeast", "India's largest Buddhist monastery, across the Sela Pass at 4,170 metres. A permit is required.", ["Tawang Monastery", "Sela Pass", "Madhuri Lake"], "March to June, September to October"),
  d("kohima", "Kohima", "Nagaland", "northeast", "Naga hill country: a Second World War cemetery, village walks and the Hornbill Festival each December.", ["Hornbill Festival", "War Cemetery", "Dzukou Valley"], "October to May"),
  d("loktak", "Loktak Lake", "Manipur", "northeast", "A lake of floating islands, with fishermen's huts on them and a national park that floats too.", ["Floating islands", "Keibul Lamjao", "Imphal markets"], "October to March"),
  // Islands
  d("andaman", "Andaman Islands", "Andaman and Nicobar Islands", "islands", "White-sand beaches, clear water for diving and snorkelling, and the Cellular Jail at Port Blair.", ["Radhanagar Beach", "Scuba diving", "Cellular Jail"], "November to April"),
  d("lakshadweep", "Lakshadweep", "Lakshadweep", "islands", "Coral atolls off the Kerala coast with shallow lagoons. Visits need a permit arranged in advance.", ["Lagoons", "Snorkelling", "Agatti"], "October to May"),
];

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function destinationBySlug(slug: string) {
  return destinations.find((x) => x.slug === slug);
}

export function inRegion(region: RegionSlug) {
  return destinations.filter((x) => x.region === region);
}

export const states = [...new Set(destinations.map((x) => x.state))].sort().map((name) => ({
  name,
  slug: slugify(name),
  destinations: destinations.filter((x) => x.state === name),
}));

export function stateBySlug(slug: string) {
  return states.find((s) => s.slug === slug);
}

/** Shown first on the homepage. */
export const popular = ["agra", "jaipur", "delhi", "varanasi", "goa", "alleppey", "udaipur", "leh"];
