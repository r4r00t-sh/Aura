export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  city: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "Aura secured a G700 for a board trip DXB–TEB with less than a day’s notice. Clear pricing, calm coordination.",
    name: "James Whitfield",
    role: "Chief of Staff",
    city: "London",
  },
  {
    id: "2",
    quote:
      "We needed cargo and passenger legs in the same week. One advisor, vetted operators, no drama.",
    name: "Layla Al Falasi",
    role: "Family Office",
    city: "Dubai",
  },
  {
    id: "3",
    quote:
      "Empty-leg option to Maldives saved us meaningfully without compromising the cabin or schedule.",
    name: "Priya Mehta",
    role: "Travel Lead",
    city: "Mumbai",
  },
  {
    id: "4",
    quote:
      "Transparent next steps and a proper operator packet — rare among brokers we’ve tried.",
    name: "Marc Duval",
    role: "Managing Director",
    city: "Geneva",
  },
];

export type PressLogo = {
  id: string;
  name: string;
};

/** Text-mark placeholders until real press assets are supplied. */
export const PRESS_LOGOS: PressLogo[] = [
  { id: "arabian", name: "Arabian Business" },
  { id: "gulf", name: "Gulf Business" },
  { id: "aviation", name: "Aviation Week" },
  { id: "bloomberg", name: "Bloomberg" },
  { id: "ft", name: "Financial Times" },
  { id: "cnbc", name: "CNBC Arabia" },
];
