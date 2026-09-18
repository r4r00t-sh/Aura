export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  link?: { label: string; page: string };
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "cost",
    question: "How much does a private jet charter from Dubai cost?",
    answer:
      "Indicative one-way bands for popular routes typically range from roughly USD 28,000 for shorter leisure legs to USD 145,000+ for ultra-long-haul. Final quotes depend on aircraft category, timing, airports, and market. Use Plan a flight for an indicative estimate, then confirm with our desk.",
    link: { label: "See sample pricing", page: "home" },
  },
  {
    id: "how",
    question: "How does booking with Aura work?",
    answer:
      "Tell us the mission (route, timing, passengers or cargo). We source through approved operators, check safety and logistics, then return availability and indicative pricing — usually within 30 minutes of a complete brief.",
    link: { label: "Start a charter request", page: "charter" },
  },
  {
    id: "broker",
    question: "Do you own the aircraft?",
    answer:
      "Aura is a charter broker and coordinator. We arrange and provide private or chartered aircraft through vetted operators — we do not operate as an anonymous marketplace.",
  },
  {
    id: "safety",
    question: "How do you vet operators and aircraft?",
    answer:
      "We only source through approved operators and apply ARGUS / Wyvern-aligned due diligence before a mission is offered. Ask your advisor for the operator packet on any quote.",
    link: { label: "Safety overview", page: "safety" },
  },
  {
    id: "empty",
    question: "What is an empty leg?",
    answer:
      "An empty leg is a repositioning flight offered at a lower all-in price when an aircraft must move without passengers. Routes and timings are fixed and availability changes quickly.",
    link: { label: "View empty legs", page: "empty-legs" },
  },
  {
    id: "lead-time",
    question: "How far in advance should I book?",
    answer:
      "Same-day and next-day missions are often possible from Dubai, but 48–72 hours notice improves aircraft choice and pricing. Peak events and ultra-long-haul benefit from earlier notice.",
  },
  {
    id: "passengers",
    question: "Can you arrange group, VIP, or cargo charters?",
    answer:
      "Yes. We arrange passenger, VIP/executive, group/tour, and cargo/air-freight charters, plus leasing/ACMI and aircraft sourcing through approved operators.",
  },
  {
    id: "pets",
    question: "Can I travel with pets?",
    answer:
      "Often yes, subject to operator policy, cabin configuration, and destination rules. Tell us breed, weight, and crate needs when you request — we coordinate the operator and documentation.",
  },
  {
    id: "airports",
    question: "Which airports can you use?",
    answer:
      "We arrange flights to private and commercial airports worldwide, including Dubai DXB/DWC and preferred FBOs at destinations such as Farnborough, Le Bourget, Teterboro, and Seletar where suitable.",
    link: { label: "Browse destinations", page: "destinations" },
  },
  {
    id: "payment",
    question: "When is a charter confirmed?",
    answer:
      "Submitting a request is not a binding contract. Confirmation follows written agreement on aircraft, schedule, and commercial terms. Payment schedules are set out in each charter agreement.",
  },
];
