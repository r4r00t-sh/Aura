export type AuraService = {
  id: string;
  title: string;
  desc: string;
  page?: string;
};

/** Core offerings — arranging & providing private/chartered aircraft. */
export const AURA_SERVICES: AuraService[] = [
  {
    id: "private-jet",
    title: "Private Jet Charter",
    desc: "On-demand private jet arrangements tailored to your schedule, route, and aircraft preference.",
    page: "charter",
  },
  {
    id: "corporate",
    title: "Business & Corporate Charter",
    desc: "Efficient corporate aviation for executives, board travel, and time-critical business missions.",
    page: "charter",
  },
  {
    id: "passenger",
    title: "Passenger Aircraft Charter",
    desc: "Chartered passenger aircraft for larger parties, special events, and custom itineraries.",
    page: "charter",
  },
  {
    id: "cargo",
    title: "Cargo & Air Freight Charter",
    desc: "Dedicated freighter and cargo charter solutions for urgent, oversized, or sensitive shipments.",
    page: "charter",
  },
  {
    id: "groups",
    title: "Group & Tour Operator Charter",
    desc: "Aircraft charter for groups, incentives, sports teams, and tour operators at scale.",
    page: "charter",
  },
  {
    id: "vip",
    title: "VIP & Executive Travel",
    desc: "Discreet VIP and executive travel with elevated ground handling, privacy, and personalisation.",
    page: "charter",
  },
  {
    id: "leasing",
    title: "Aircraft Leasing & ACMI",
    desc: "Aircraft leasing, ACMI, and wet-lease solutions through vetted operators and partners.",
  },
  {
    id: "empty-legs",
    title: "Empty-Leg Arrangements",
    desc: "Access opportunistic empty-leg and one-way private aircraft at exceptional value.",
    page: "empty-legs",
  },
  {
    id: "planning",
    title: "Flight Planning & Coordination",
    desc: "End-to-end charter planning — permits, slots, ground logistics, and multi-leg coordination.",
    page: "charter",
  },
  {
    id: "sourcing",
    title: "Aircraft Sourcing",
    desc: "Sourcing the right aircraft through approved operators to match mission, comfort, and budget.",
    page: "fleet",
  },
  {
    id: "sales",
    title: "Aircraft Buying & Selling",
    desc: "Advisory and brokerage support for acquiring or disposing of private and commercial aircraft.",
    page: "aircraft-for-sale",
  },
];
