/** Informative Dubai-hub sample bands — not binding quotes. */
export const SAMPLE_ROUTES = [
  {
    id: "dxb-lhr",
    from: "Dubai",
    to: "London",
    codes: "DXB → LHR",
    duration: "7h 30m",
    category: "Ultra Long Range",
    band: "USD 85,000 – 120,000",
    note: "One-way · indicative all-in band",
  },
  {
    id: "dxb-cdg",
    from: "Dubai",
    to: "Paris",
    codes: "DXB → CDG / LBG",
    duration: "7h 45m",
    category: "Long Range",
    band: "USD 72,000 – 98,000",
    note: "One-way · operator & timing dependent",
  },
  {
    id: "dxb-jfk",
    from: "Dubai",
    to: "New York",
    codes: "DXB → TEB / JFK",
    duration: "14h 20m",
    category: "Ultra Long Range",
    band: "USD 145,000 – 195,000",
    note: "One-way · flagship cabin preferred",
  },
  {
    id: "dxb-mle",
    from: "Dubai",
    to: "Maldives",
    codes: "DXB → MLE",
    duration: "4h 10m",
    category: "Super Midsize",
    band: "USD 28,000 – 42,000",
    note: "One-way · leisure & group friendly",
  },
];

export function nextEmptyLegDates(count = 6): string[] {
  const out: string[] = [];
  const start = new Date();
  start.setDate(start.getDate() + 3);
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i * 2);
    out.push(
      d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  }
  return out;
}
