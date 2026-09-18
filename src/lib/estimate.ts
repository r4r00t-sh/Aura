import { SAMPLE_ROUTES } from "../data/pricing";
import { FLEET } from "../data/fleet";

export type EstimateResult = {
  matchedRoute: boolean;
  fromLabel: string;
  toLabel: string;
  category: string;
  band: string;
  duration?: string;
  aircraftHint: string;
  note: string;
};

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
}

function cityKey(s: string): string {
  const n = normalize(s);
  if (n.includes("london") || n.includes("lhr")) return "london";
  if (n.includes("paris") || n.includes("cdg") || n.includes("lbg")) return "paris";
  if (n.includes("new york") || n.includes("jfk") || n.includes("teb")) return "new york";
  if (n.includes("maldives") || n.includes("mle")) return "maldives";
  if (n.includes("dubai") || n.includes("dxb") || n.includes("dwc")) return "dubai";
  if (n.includes("singapore") || n.includes("sin")) return "singapore";
  if (n.includes("geneva") || n.includes("gva")) return "geneva";
  if (n.includes("mumbai") || n.includes("bom")) return "mumbai";
  if (n.includes("moscow") || n.includes("svo")) return "moscow";
  return n.split(" ")[0] || n;
}

/** Lightweight indicative estimate from sample bands + fleet categories. */
export function buildEstimate(input: {
  from: string;
  to: string;
  passengers?: string | number;
  tripType?: string;
}): EstimateResult | null {
  const from = input.from?.trim();
  const to = input.to?.trim();
  if (!from || !to) return null;

  const fromKey = cityKey(from);
  const toKey = cityKey(to);
  const pax = Number(input.passengers) || 2;

  const sample = SAMPLE_ROUTES.find((r) => {
    const rf = cityKey(r.from);
    const rt = cityKey(r.to);
    return (rf === fromKey && rt === toKey) || (rf === toKey && rt === fromKey);
  });

  if (sample) {
    const fleetMatch = FLEET.find((a) => a.category === sample.category);
    return {
      matchedRoute: true,
      fromLabel: from,
      toLabel: to,
      category: sample.category,
      band: sample.band,
      duration: sample.duration,
      aircraftHint: fleetMatch?.name ?? sample.category,
      note:
        input.tripType === "Round Trip"
          ? "Round-trip typically ~1.8–2.0× one-way depending on positioning. Indicative only."
          : sample.note,
    };
  }

  // Fallback by passenger count → category
  let category = "Super Midsize";
  if (pax > 14) category = "Ultra Long Range";
  else if (pax > 10) category = "Long Range";

  const fleetMatch = FLEET.find((a) => a.category === category) ?? FLEET[0];
  return {
    matchedRoute: false,
    fromLabel: from,
    toLabel: to,
    category,
    band: `${fleetMatch.hourlyFrom.replace("From ", "")} · mission-dependent`,
    aircraftHint: fleetMatch.name,
    note: "No published sample band for this city pair — showing a category guide. Request a firm quote for your dates.",
  };
}
