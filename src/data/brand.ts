/** Public brand assets and trust / contact constants */
export const LOGO_SRC = "/images/logo.png";
export const LOGO_ALT = "Aura Air Charters";

export const CHARTER_EMAIL = "charter@aura-aviation.ae";
export const CHARTER_PHONE = "+971 4 447 8800";
export const CHARTER_PHONE_TEL = "+97144478800";
/** Digits only for wa.me (UAE desk). */
export const CHARTER_WHATSAPP = "97144478800";
export const CHARTER_OFFICE = "Dubai World Central · Dubai, UAE";

/**
 * Lead delivery: set `VITE_LEADS_ENDPOINT` to a Formspree / webhook URL
 * (e.g. https://formspree.io/f/xxxxxxxx) so submits leave the browser.
 */
export const LEADS_ENDPOINT = import.meta.env.VITE_LEADS_ENDPOINT ?? "";

export const TRUST_REVIEW = {
  score: "4.9",
  count: "180+",
  label: "Client satisfaction",
};

export const TRUST_STATS = [
  { value: "1,840+", label: "Missions arranged" },
  { value: "87+", label: "Countries served" },
  { value: "12", label: "Years in Dubai" },
  { value: "24/7", label: "Charter desk" },
];

export type CertBadge = {
  id: string;
  name: string;
  detail: string;
};

export const CERT_BADGES: CertBadge[] = [
  { id: "argus", name: "ARGUS Platinum", detail: "Broker safety rating" },
  { id: "wyvern", name: "Wyvern Wingman", detail: "Operator due diligence" },
  { id: "isbao", name: "IS-BAO Stage III", detail: "International safety audit" },
  { id: "iosa", name: "IOSA Aligned", detail: "Operational standards" },
  { id: "dcaa", name: "DCAA Aware", detail: "UAE regulatory compliance" },
  { id: "aoc", name: "Approved Operators", detail: "Vetted AOC partners only" },
];

export const PROOF_POINTS = [
  {
    title: "Approved-operator network",
    text: "Every aircraft is sourced through safety-vetted operators — never anonymous market scrapes.",
  },
  {
    title: "Dubai desk, global reach",
    text: "A dedicated Aura advisor handles permits, slots, and ground logistics end to end.",
  },
  {
    title: "Transparent next steps",
    text: "Receive availability and indicative pricing within 30 minutes of a complete request.",
  },
];
