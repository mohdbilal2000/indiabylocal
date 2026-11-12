/**
 * PLANNING GUIDE FOR EACH DESTINATION.
 * Four short answers per place: how long to stay, how to get there, what a
 * local guide adds, and the one thing to know before you go.
 *
 * Written from general knowledge in November 2026, not checked on site.
 * No prices and no opening hours on purpose: those change. Closing days and
 * permit rules can change too, so every page tells the reader to confirm.
 * Review each entry with a local operator before setting SITE_LIVE=1.
 */

export type Guide = { days: string; reach: string; local: string; know: string };

export const GUIDES_REVIEWED = "November 2026";

const g = (days: string, reach: string, local: string, know: string): Guide => ({ days, reach, local, know });

export const guides: Record<string, Guide> = {
  // North
  agra: g(
    "One full day. Two if you add Fatehpur Sikri.",
    "Two to three hours from Delhi by express train, or about three and a half hours by road on the Yamuna Expressway.",
    "Only licensed guides may work inside the monuments. A good one times the gates for sunrise and keeps touts and workshop detours away.",
    "The Taj Mahal is closed on Fridays. Large bags, tripods and food are not allowed inside.",
  ),
  delhi: g(
    "Two to three days.",
    "Delhi's international airport has direct flights from most of the world. The Airport Express metro reaches the centre in about 20 minutes.",
    "Old Delhi's lanes are hard to read alone. A guide knows which food stalls are safe, which gates to use and how to cross the city without losing half a day to traffic.",
    "Several major sights, the Red Fort among them, close on Mondays. Air quality is at its worst from November to January.",
  ),
  jaipur: g(
    "Two days.",
    "About four and a half hours from Delhi by road or train. Jaipur also has its own airport.",
    "Amber Fort and the walled city are a short drive apart. A guide gets you up to the fort before the coaches, and through the bazaars without the commission shops.",
    "Amber Fort sits outside the city, so start there early. The walled city is best on foot or by cycle rickshaw.",
  ),
  varanasi: g(
    "Two days, so that you see both a dawn and an evening on the river.",
    "Fly to Varanasi airport, or take a day train from Delhi in about eight hours.",
    "The old city is a maze of lanes with no signs. A guide arranges an honest boat, explains what you are seeing at the ghats and keeps you clear of self-appointed helpers.",
    "The lanes behind the ghats are for walking only. Photography is not permitted at the cremation ghats.",
  ),
  lucknow: g(
    "One to two days.",
    "About an hour by air from Delhi, or six to seven hours by express train.",
    "The monuments are easy to find. The food is not: a guide who knows Chowk and Aminabad takes you to the kebab and biryani kitchens locals actually use.",
    "The main monuments stand close together in the old city. Plan them for the morning and keep the evening for eating.",
  ),
  udaipur: g(
    "Two days.",
    "Fly to Udaipur airport, about 45 minutes from the city, or take an overnight train from Delhi or Jaipur.",
    "A guide times the City Palace before the crowds and the lake for the last light, and knows the workshops where miniature painters really work.",
    "The lakes depend on the monsoon. They are fullest from September to February.",
  ),
  jodhpur: g(
    "One to two days.",
    "Five to six hours from Jaipur by road or train. Jodhpur has an airport with flights from Delhi and Mumbai.",
    "The fort is well signed. The blue lanes below it are not, and a local guide turns an hour of getting lost into a walk through homes, step-wells and spice sellers.",
    "The fort is on a steep rock. Go early or late in the day, and carry water.",
  ),
  jaisalmer: g(
    "Two days, with one evening in the dunes.",
    "An overnight train from Jaipur or Delhi, or about five hours by road from Jodhpur. Flights are seasonal.",
    "Desert camps vary from quiet to crowded and noisy. A local guide knows which dunes are still empty at sunset and which camps are worth the night.",
    "People still live inside the fort, and its drains are under strain. Many visitors choose to stay outside the walls.",
  ),
  pushkar: g(
    "One day.",
    "Half an hour over the hill from Ajmer, the nearest railway station, which is about two hours from Jaipur.",
    "A guide explains the rituals at the lake and steps in when someone presses flowers into your hand and asks for a donation.",
    "Pushkar is a holy town. Meat, eggs and alcohol are not sold here, and shoes come off at the ghats.",
  ),
  ranthambore: g(
    "Two days, which gives you three safaris.",
    "Sawai Madhopur station is on the main Delhi to Mumbai line, about two hours by train from Jaipur.",
    "Safari seats and zones are allocated by the forest department. A local operator books the right zone ahead and pairs you with a naturalist who reads tracks and alarm calls.",
    "The main zones close during the monsoon, roughly July to September. A tiger sighting is never certain.",
  ),
  amritsar: g(
    "One to two days.",
    "About an hour by air from Delhi, or six hours by express train.",
    "A guide walks you through the Golden Temple's kitchen and its customs, and gets you to the border ceremony early enough for a seat.",
    "Cover your head and remove your shoes at the Golden Temple. Scarves are handed out free at the entrance.",
  ),
  chandigarh: g(
    "One day.",
    "About three and a half hours from Delhi by express train. Chandigarh also has an airport.",
    "The city is spread out by design. A guide with a car links Le Corbusier's buildings, the Rock Garden and the lake in one unhurried day.",
    "The Capitol Complex is visited on a guided tour arranged through the tourist office. Carry your passport.",
  ),
  // Himalaya
  shimla: g(
    "Two days.",
    "Take the mountain railway from Kalka, about five hours, or drive up from Chandigarh in about four.",
    "A guide who knows the ridge walks you through the colonial town's back paths and out to the forest viewpoints most visitors miss.",
    "The Mall and the Ridge are closed to vehicles. Expect to walk, and some of it is uphill.",
  ),
  manali: g(
    "Two to three days.",
    "An overnight bus from Delhi, or a flight to Kullu airport about 50 kilometres away.",
    "Mountain roads open and close with the weather. A local driver-guide knows that morning's conditions and where the snow is.",
    "The Rohtang Pass needs a permit and closes in winter. The Atal Tunnel keeps the road to Lahaul open for most of the year.",
  ),
  dharamshala: g(
    "Two days.",
    "Fly to Kangra airport, about 15 kilometres away, or take an overnight bus from Delhi.",
    "A guide from the Tibetan community explains the temple, the monasteries and the life of the town in a way no signboard does.",
    "McLeod Ganj, the upper town, is where the Dalai Lama's temple stands. Public teachings are announced in advance and fill the town.",
  ),
  spiti: g(
    "Five to seven days at least, including the road.",
    "By road from Shimla through Kinnaur, open for most of the year, or from Manali over the Kunzum Pass in summer only.",
    "This is a remote high-altitude desert with few services. A local operator supplies a driver who knows the road, the homestays and what to do if the weather turns.",
    "Kaza is at about 3,800 metres. Climb gradually and rest when you arrive. Foreign visitors need a permit for the Kinnaur route.",
  ),
  rishikesh: g(
    "Two days.",
    "Fly to Dehradun airport, about 20 kilometres away, or drive from Delhi in five to six hours.",
    "A guide finds the quieter ghats and ashrams, and books rafting with an operator whose safety kit is real.",
    "The town is vegetarian and alcohol-free. Rafting stops during the monsoon.",
  ),
  haridwar: g(
    "One day.",
    "Four to five hours from Delhi by train. Rishikesh is 45 minutes further.",
    "The evening ceremony at the main ghat draws thousands. A guide gets you a place early and explains what is happening.",
    "Men with receipt books asking for donations at the ghats are not official. A polite no is enough.",
  ),
  nainital: g(
    "Two days.",
    "Train to Kathgodam, then about an hour and a half by road. Around seven hours in all from Delhi.",
    "A guide takes you past the lake to the ridge-top viewpoints and the quieter lakes nearby.",
    "May and June weekends are very crowded. Come midweek or in autumn if you can.",
  ),
  "jim-corbett": g(
    "Two days.",
    "Five to six hours by road from Delhi, or a train to Ramnagar on the park's edge.",
    "Safari permits are issued by zone and sell out. A local operator books ahead and pairs you with a naturalist who knows that season's sightings.",
    "Most of the park closes for the monsoon and reopens in mid-November. Morning safaris in winter are cold in an open jeep.",
  ),
  srinagar: g(
    "Two to three days.",
    "Fly to Srinagar from Delhi in about an hour and a half.",
    "A local guide arranges an honest houseboat and shikara, and leads you through the old city's mosques and markets.",
    "Several governments advise against travel to parts of Jammu and Kashmir. Check your own government's advice and your insurance before you book.",
  ),
  gulmarg: g(
    "One to two days.",
    "About an hour and a half by road from Srinagar.",
    "A guide books the gondola ahead, hires proper winter gear and knows how far up is safe that day.",
    "The gondola sells out; book it online in advance. The same government travel advice applies as for Srinagar.",
  ),
  leh: g(
    "Four to five days.",
    "Flights from Delhi run all year. The roads from Manali and Srinagar open in summer only.",
    "Monasteries, high passes and lakes are hours apart on mountain roads. A local driver-guide handles permits, altitude and the day's road conditions.",
    "Leh is at 3,500 metres. Rest for the first day or two. Permits are needed for Nubra and Pangong.",
  ),
  // West
  mumbai: g(
    "Two days.",
    "Mumbai's international airport has direct flights from most of the world.",
    "A guide takes you by local train, on foot and by ferry, which is how the city actually moves, and into markets and neighbourhoods you would not enter alone.",
    "The Elephanta Caves are closed on Mondays, and ferries stop in rough monsoon seas.",
  ),
  "ajanta-ellora": g(
    "Two days: one for each set of caves.",
    "Base yourself in Aurangabad, which has an airport and a railway station. Ellora is 30 kilometres away and Ajanta about 100.",
    "The caves hold fifteen centuries of painting and sculpture with little explanation on site. A licensed guide tells you which caves matter and why.",
    "Ajanta is closed on Mondays and Ellora on Tuesdays. Plan the two days around that.",
  ),
  goa: g(
    "Three days.",
    "Goa has two airports, one in the north and one in the south. Check which is nearer your stay.",
    "Beyond the beaches are Portuguese-era churches, spice farms and river villages. A local guide links them without the tourist-trap stops.",
    "The monsoon, June to September, closes most beach shacks and water sports.",
  ),
  ahmedabad: g(
    "One to two days.",
    "Ahmedabad has an international airport and fast trains from Mumbai.",
    "The old city is a web of gated neighbourhoods called pols. The morning heritage walk with a local guide is the way in.",
    "Gujarat is a dry state. Visitors can drink only with a permit.",
  ),
  kutch: g(
    "Two to three days.",
    "Base yourself in Bhuj, which has an airport and a railway station. The white salt desert is about 80 kilometres north.",
    "The craft villages are scattered and unsigned. A local guide knows the weavers, block printers and embroiderers, and takes you to their homes, not to showrooms.",
    "The salt desert is under water during the monsoon. Go between November and February. A permit is needed and is issued on the way.",
  ),
  gir: g(
    "Two days.",
    "The nearest railway stations are Junagadh and Veraval. The nearest airports are Rajkot and Diu.",
    "Safari permits are limited and booked online. A local operator secures them and a naturalist who knows where the prides are moving.",
    "This is the only home of the Asiatic lion. The park closes from mid-June to mid-October.",
  ),
  // Central
  khajuraho: g(
    "One to two days.",
    "Khajuraho has a small airport and a railway station. Many visitors come by road from Orchha or Jhansi.",
    "The carvings are famous for one subject and are about many more. A licensed guide reads the temple walls for you.",
    "The western group is the main ticketed site. Go at opening time for the light and the quiet.",
  ),
  gwalior: g(
    "One day.",
    "About three and a half hours from Delhi and an hour and a half from Agra by express train.",
    "The fort covers a whole hilltop with palaces, temples and rock-cut statues far apart. A guide with a car makes one day enough.",
    "The fort is large and steep. You need a vehicle between its parts.",
  ),
  sanchi: g(
    "Half a day to one day.",
    "About an hour by road from Bhopal, which has an airport and a main-line station.",
    "The gateways tell the Buddha's life in stone without ever showing him. A guide makes the carvings legible.",
    "The site museum is closed on Fridays.",
  ),
  orchha: g(
    "One day.",
    "About half an hour by road from Jhansi station, on the main Delhi to Bhopal line.",
    "A guide opens up the palaces' painted rooms and walks you to the riverside cenotaphs at sunset.",
    "Orchha is small and quiet, and one ticket covers several monuments. Keep it with you.",
  ),
  kanha: g(
    "Two to three days.",
    "The nearest airports are Jabalpur, Raipur and Nagpur, each a drive of three to five hours.",
    "Safari permits are booked by zone months ahead. A local operator secures them and a naturalist who has followed the park's tigers for years.",
    "The park closes from July to mid-October. Winter mornings are close to freezing in an open jeep.",
  ),
  chitrakote: g(
    "One to two days.",
    "Base yourself in Jagdalpur, about 40 kilometres away. Raipur, the nearest large airport, is a long day's drive.",
    "Bastar's weekly tribal markets move from village to village. A local guide knows which day is where, and how to visit respectfully.",
    "The falls are at their widest during and just after the monsoon. Check current local advice for the Bastar region before you travel.",
  ),
  // South
  bengaluru: g(
    "One day.",
    "Bengaluru's international airport is about 35 kilometres from the centre. Allow well over an hour.",
    "A guide strings together the old pete markets, the palace and the gardens in an order that beats the traffic.",
    "Traffic is the city's defining feature. Start early and keep the day to one side of town.",
  ),
  mysuru: g(
    "One to two days.",
    "Two to three hours from Bengaluru by train or expressway.",
    "A guide takes you through the palace, then into the flower and spice market and the workshops for silk, sandalwood and inlay.",
    "The palace is lit up on Sunday evenings and public holidays. The Dasara festival in September or October fills the city.",
  ),
  hampi: g(
    "Two days.",
    "Overnight train from Bengaluru or Goa to Hosapete, 13 kilometres away.",
    "The ruins are spread across a boulder landscape of more than 25 square kilometres. A guide plans a route by cycle or auto-rickshaw and tells the story of the city.",
    "It is very hot by midday. Start at sunrise, rest in the afternoon and go out again for sunset.",
  ),
  coorg: g(
    "Two days.",
    "No railway or airport. Five to six hours by road from Bengaluru, or about three from Mysuru.",
    "A local guide walks you through working coffee and pepper estates and to waterfalls reached by forest paths.",
    "Rain is heavy from June to September, and forest trails have leeches then.",
  ),
  hyderabad: g(
    "Two days.",
    "Hyderabad has an international airport with direct flights from the Gulf, Europe and South-East Asia.",
    "A guide leads you through the old city's bazaars around the Charminar and to the biryani and Irani tea houses the city argues about.",
    "Climb Golconda Fort early, before the heat. Some palaces and museums close on Fridays.",
  ),
  chennai: g(
    "One day.",
    "Chennai has an international airport and is the main gateway to Tamil Nadu.",
    "A guide explains the temple rituals at Mylapore, the colonial fort and the food, from filter coffee to a banana-leaf meal.",
    "Most temples close from about midday until late afternoon. Plan temples for the morning or evening.",
  ),
  mahabalipuram: g(
    "One day.",
    "About an hour and a half south of Chennai by the coast road.",
    "The rock carvings tell whole epics on a single cliff face. A licensed guide reads them panel by panel.",
    "One ticket covers the Shore Temple and the Five Rathas. Go early, because there is little shade.",
  ),
  madurai: g(
    "One day.",
    "Madurai has an airport, and trains from Chennai take six to eight hours.",
    "The Meenakshi temple is a city within a city. A guide explains its halls and ceremonies, and takes you to the evening procession.",
    "Phones and cameras are not allowed inside the temple, and shoulders and knees must be covered. The temple closes at midday.",
  ),
  ooty: g(
    "Two days.",
    "The mountain railway climbs from Mettupalayam in about five hours and must be booked well ahead. The nearest airport is Coimbatore.",
    "A guide takes you off the crowded lake road to tea estates, Toda villages and the quieter viewpoints.",
    "Check whether the vehicle pass for the Nilgiris is in force when you travel. Weekends in April and May are crowded.",
  ),
  pondicherry: g(
    "One to two days.",
    "About three hours from Chennai by the coast road.",
    "A guide walks you through the French and Tamil quarters and explains how the two halves of the town fit together.",
    "The inner chamber at Auroville needs a booking made in person, days ahead. The outside viewing point needs only a free pass.",
  ),
  kochi: g(
    "One to two days.",
    "Kochi's international airport is about 45 kilometres from Fort Kochi. Allow an hour and a half.",
    "A guide links the Chinese fishing nets, the spice warehouses and the old Jewish quarter, and books a Kathakali performance worth seeing.",
    "Mattancherry Palace is closed on Fridays, and the synagogue on Fridays and Saturdays.",
  ),
  munnar: g(
    "Two days.",
    "About four hours by road from Kochi. There is no railway.",
    "A local guide walks you through working tea estates and up to viewpoints above the cloud line.",
    "The national park closes for a few weeks early in the year for the calving season. The roads are winding; allow time.",
  ),
  alleppey: g(
    "One to two days.",
    "About two hours by road from Kochi. Alleppey also has a railway station.",
    "A local guide puts you in a small boat or canoe that reaches the narrow canals houseboats cannot enter, and into village life along them.",
    "Houseboats vary a great deal in quality. Book one that is licensed, and ask where it moors at night.",
  ),
  thekkady: g(
    "One to two days.",
    "About four hours by road from Kochi or from Madurai.",
    "A guide books the lake boat ahead and arranges walks with the forest department's own trackers.",
    "Boat tickets on Periyar Lake sell out. Elephants and bison are common sightings; tigers are rare.",
  ),
  varkala: g(
    "One to two days.",
    "About an hour by road from Thiruvananthapuram airport. Varkala has its own railway station.",
    "A local guide shows you the temple, the fishing villages and the quieter beaches beyond the cliff.",
    "Currents are strong. Swim only where the lifeguards have put out flags.",
  ),
  tirupati: g(
    "One day.",
    "Tirupati has an airport, and it is three to four hours from Chennai by road or train.",
    "The temple runs on a booking system that is hard to follow from abroad. A local operator arranges entry and explains the customs.",
    "Entry tickets are booked online well ahead, a dress code is enforced and phones are not allowed inside. Waiting times can run to many hours.",
  ),
  araku: g(
    "One to two days.",
    "Three to four hours from Visakhapatnam by road, or by the morning train through the hill tunnels.",
    "A guide stops at the Borra Caves on the way and takes you to coffee growers and tribal villages in the valley.",
    "Seats in the train's glass-roofed coach sell out. Book as early as you can.",
  ),
  // East
  kolkata: g(
    "Two days.",
    "Kolkata has an international airport and is the main gateway to eastern India.",
    "A guide walks you through the flower market at dawn, the potters' quarter and the old merchant mansions of the north.",
    "The Victoria Memorial museum and the Indian Museum are closed on Mondays. Durga Puja, in September or October, transforms the city; book early.",
  ),
  darjeeling: g(
    "Two to three days.",
    "Fly to Bagdogra or take a train to New Jalpaiguri, then drive up for about three hours.",
    "A guide takes you onto a working tea estate and to the viewpoints at the right hour.",
    "The mountain views are clearest from October to December and in March and April. The sunrise viewpoint means leaving at about four in the morning.",
  ),
  sundarbans: g(
    "Two days, with a night on or beside the water.",
    "About three hours by road from Kolkata to the jetty, then by boat.",
    "All travel here is by boat, with a permit and a forest guide. A local operator arranges both and knows the tides.",
    "Tigers are rarely seen. Go for the mangrove forest, the birds and the crocodiles.",
  ),
  konark: g(
    "Half a day to one day.",
    "About an hour by road from Puri and an hour and a half from Bhubaneswar, which has an airport.",
    "The temple is a stone chariot covered in carving. A licensed guide explains the wheels, which work as sundials, and the stories on the walls.",
    "The main tower fell long ago and the interior is sealed. A dance festival is held here in December.",
  ),
  bhubaneswar: g(
    "One day.",
    "Bhubaneswar has an airport and is on the main east-coast railway line.",
    "The old town holds hundreds of temples. A guide chooses the handful that show how the style developed.",
    "The largest temple admits Hindus only. Others can see it from a viewing platform outside the wall.",
  ),
  "bodh-gaya": g(
    "One day.",
    "Gaya airport and Gaya railway station are both within 15 kilometres. Patna is about three hours away by road.",
    "A guide explains the temple and the tree, and takes you round the monasteries built by Buddhist countries from Japan to Bhutan.",
    "Phones are not allowed inside the main temple complex. December and January are busiest.",
  ),
  // Northeast
  gangtok: g(
    "Two to three days.",
    "Fly to Bagdogra, then drive for four to five hours.",
    "Permits are needed for the high lakes and passes. A registered local operator arranges them and a driver used to mountain roads.",
    "Foreign visitors need a permit to enter Sikkim, issued at the state border. Carry your passport, visa and photographs.",
  ),
  kaziranga: g(
    "Two days.",
    "Four to five hours by road from Guwahati airport, or about two from Jorhat.",
    "A local operator books jeep safaris in the right ranges and a naturalist who can find rhinos, elephants and birds.",
    "The park is open from about November to April and closes when the river floods in the monsoon.",
  ),
  guwahati: g(
    "One day.",
    "Guwahati's airport is the main gateway to the Northeast.",
    "A guide takes you to the hilltop temple early, out onto the river, and to a silk-weaving village nearby.",
    "The main temple has long queues, and closes for a few days each June during its annual festival.",
  ),
  cherrapunji: g(
    "Two days.",
    "About three hours by road from Guwahati to Shillong, then up to two hours further.",
    "A local guide leads the walk to the living root bridges and knows which paths are safe after rain.",
    "The double-decker root bridge is about 3,500 steps down, and the same back up. It can rain at any time of year.",
  ),
  tawang: g(
    "Four to five days, including the road.",
    "Two days by road from Guwahati or Tezpur, over a pass above 4,000 metres.",
    "This is a border region with long mountain drives. A registered operator supplies the permit, the driver and the stops along the way.",
    "Foreign visitors need a permit arranged in advance through a registered operator. Tawang is at about 3,000 metres.",
  ),
  kohima: g(
    "Two days.",
    "Fly or take a train to Dimapur, then drive up for about three hours.",
    "A local guide takes you to the war cemetery, a Naga village and the market, and explains the customs of each tribe.",
    "The Hornbill Festival runs in early December and rooms sell out months ahead. Permit rules for foreign visitors changed in late 2024; check before you book.",
  ),
  loktak: g(
    "One to two days.",
    "Fly to Imphal, then drive for about an hour and a half.",
    "A local guide takes you by boat among the floating islands and to the national park that floats on the lake.",
    "Check your government's travel advice for Manipur before planning. Permit rules for foreign visitors changed in late 2024.",
  ),
  // Islands
  andaman: g(
    "Four to five days.",
    "Fly to Port Blair from Chennai, Kolkata or Delhi, then take a ferry to the outer islands.",
    "A local operator books the ferries, which sell out, and dive or snorkel boats with proper equipment.",
    "Tribal reserves are strictly off limits. The sea is calmest from November to April.",
  ),
  lakshadweep: g(
    "Four to five days.",
    "Fly from Kochi to Agatti, or go by ship from Kochi.",
    "Every visit runs through a registered operator or resort, which arranges the entry permit and the boats between islands.",
    "Every visitor needs an entry permit arranged before travel. Only a few islands are open to foreign visitors.",
  ),
};

export function guideFor(slug: string): Guide | undefined {
  return guides[slug];
}
