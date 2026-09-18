export type FleetAircraft = {
  slug: string;
  name: string;
  category: "Ultra Long Range" | "Long Range" | "Super Midsize";
  range: string;
  passengers: number;
  speed: string;
  ceiling: string;
  crew: number;
  image: string;
  interior: string;
  tag: string;
  tagColor: string;
  description: string;
  cabin: string;
  hourlyFrom: string;
  routes: string[];
};

/** Curated local stock photography (exterior + cabin) for broker catalog. */
export const FLEET: FleetAircraft[] = [
  {
    slug: "gulfstream-g700",
    name: "Gulfstream G700",
    category: "Ultra Long Range",
    range: "7,500 nm",
    passengers: 19,
    speed: "956 km/h",
    ceiling: "51,000 ft",
    crew: 4,
    image: "/images/stock/jet-exterior-1.jpg",
    interior: "/images/stock/jet-cabin-1.jpg",
    tag: "Flagship",
    tagColor: "var(--color-gold)",
    description:
      "The pinnacle of ultra-long-range aviation. Tall cabin, intercontinental range, and a boardroom-ready interior for Dubai–US and Asia missions.",
    cabin:
      "Up to five living areas, full berthing, and a dedicated crew rest — ideal for overnight ultra-long-haul with executives or family groups.",
    hourlyFrom: "From USD 12,500 / hr",
    routes: ["Dubai–New York", "Dubai–Los Angeles", "Dubai–Tokyo"],
  },
  {
    slug: "bombardier-global-7500",
    name: "Bombardier Global 7500",
    category: "Ultra Long Range",
    range: "7,700 nm",
    passengers: 19,
    speed: "956 km/h",
    ceiling: "51,000 ft",
    crew: 4,
    image: "/images/stock/jet-exterior-2.jpg",
    interior: "/images/stock/jet-cabin-2.jpg",
    tag: "Most Popular",
    tagColor: "var(--color-blue)",
    description:
      "Four living spaces and an onboard kitchen. The Global 7500 is Aura’s most requested ultra-long-range option from Dubai.",
    cabin:
      "True four-zone cabin with full galley — suited to mixed work and rest on the longest non-stops.",
    hourlyFrom: "From USD 11,800 / hr",
    routes: ["Dubai–London", "Dubai–New York", "Dubai–Sydney"],
  },
  {
    slug: "dassault-falcon-8x",
    name: "Dassault Falcon 8X",
    category: "Long Range",
    range: "6,450 nm",
    passengers: 14,
    speed: "900 km/h",
    ceiling: "51,000 ft",
    crew: 3,
    image: "/images/stock/jet-exterior-3.jpg",
    interior: "/images/stock/jet-cabin-1.jpg",
    tag: "Available",
    tagColor: "rgba(156,167,179,0.6)",
    description:
      "French engineering with exceptional range and one of the quietest cabins in class — favoured for Europe and CIS routes.",
    cabin:
      "Three-lounge layout with low cabin altitude for less fatigue on medium- and long-haul legs.",
    hourlyFrom: "From USD 9,200 / hr",
    routes: ["Dubai–Paris", "Dubai–Geneva", "Dubai–Moscow"],
  },
  {
    slug: "gulfstream-g550",
    name: "Gulfstream G550",
    category: "Long Range",
    range: "6,750 nm",
    passengers: 16,
    speed: "885 km/h",
    ceiling: "51,000 ft",
    crew: 4,
    image: "/images/stock/jet-exterior-4.jpg",
    interior: "/images/stock/jet-cabin-2.jpg",
    tag: "Available",
    tagColor: "rgba(156,167,179,0.6)",
    description:
      "A proven long-range workhorse — reliable, comfortable, and widely available across the Aura operator network.",
    cabin:
      "Spacious forward and aft cabins with conference grouping for corporate teams.",
    hourlyFrom: "From USD 8,400 / hr",
    routes: ["Dubai–London", "Dubai–Mumbai", "Dubai–Singapore"],
  },
  {
    slug: "embraer-praetor-600",
    name: "Embraer Praetor 600",
    category: "Super Midsize",
    range: "4,018 nm",
    passengers: 12,
    speed: "863 km/h",
    ceiling: "45,000 ft",
    crew: 3,
    image: "/images/stock/jet-exterior-5.jpg",
    interior: "/images/stock/jet-cabin-1.jpg",
    tag: "Available",
    tagColor: "rgba(156,167,179,0.6)",
    description:
      "Best-in-class super-midsize range — efficient for Maldives, Gulf, and South Asia missions without ultra-long-range cost.",
    cabin:
      "Full stand-up cabin with flat-floor comfort and strong baggage volume for leisure groups.",
    hourlyFrom: "From USD 6,500 / hr",
    routes: ["Dubai–Maldives", "Dubai–Riyadh", "Dubai–Colombo"],
  },
  {
    slug: "cessna-citation-longitude",
    name: "Cessna Citation Longitude",
    category: "Super Midsize",
    range: "3,500 nm",
    passengers: 12,
    speed: "850 km/h",
    ceiling: "47,000 ft",
    crew: 2,
    image: "/images/stock/jet-exterior-2.jpg",
    interior: "/images/stock/jet-cabin-2.jpg",
    tag: "Available",
    tagColor: "rgba(156,167,179,0.6)",
    description:
      "Quiet and capable for regional Gulf and Middle East itineraries — a smart choice when schedule flexibility matters.",
    cabin:
      "Wide cabin cross-section with Garmin connectivity and a calm ride for short- to mid-haul.",
    hourlyFrom: "From USD 5,800 / hr",
    routes: ["Dubai–Abu Dhabi", "Dubai–Doha", "Dubai–Cairo"],
  },
];

export function getAircraftBySlug(slug: string): FleetAircraft | undefined {
  return FLEET.find((a) => a.slug === slug);
}

export function aircraftSlugFromName(name: string): string | undefined {
  return FLEET.find((a) => a.name === name)?.slug;
}
