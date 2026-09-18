import { useState } from "react";
import type { NavigateFn } from "../lib/nav";

const destinations = [
  {
    city: "London",
    country: "United Kingdom",
    code: "LHR",
    region: "Europe",
    duration: "7h 30m",
    distance: "5,490 km",
    image: "/images/stock/dest-london.jpg",
    highlight: "Farnborough, Biggin Hill, or Luton for privacy",
  },
  {
    city: "Paris",
    country: "France",
    code: "CDG",
    region: "Europe",
    duration: "7h 45m",
    distance: "5,840 km",
    image: "/images/stock/dest-paris.jpg",
    highlight: "Le Bourget — Paris's dedicated private terminal",
  },
  {
    city: "Geneva",
    country: "Switzerland",
    code: "GVA",
    region: "Europe",
    duration: "7h 10m",
    distance: "5,100 km",
    image: "/images/stock/dest-geneva.jpg",
    highlight: "Direct access to Swiss Alps, Davos, and Verbier",
  },
  {
    city: "New York",
    country: "United States",
    code: "JFK",
    region: "Americas",
    duration: "14h 20m",
    distance: "11,000 km",
    image: "/images/stock/dest-nyc.jpg",
    highlight: "Teterboro or Atlantic Aviation for true VIP entry",
  },
  {
    city: "Singapore",
    country: "Singapore",
    code: "SIN",
    region: "Asia Pacific",
    duration: "7h 05m",
    distance: "5,740 km",
    image: "/images/stock/dest-singapore.jpg",
    highlight: "Seletar Airport for private aviation excellence",
  },
  {
    city: "Maldives",
    country: "Republic of Maldives",
    code: "MLE",
    region: "Asia Pacific",
    duration: "4h 10m",
    distance: "3,060 km",
    image: "/images/stock/dest-maldives.jpg",
    highlight: "Velana International — seamless resort connections",
  },
  {
    city: "Mumbai",
    country: "India",
    code: "BOM",
    region: "Asia Pacific",
    duration: "3h 05m",
    distance: "1,930 km",
    image: "/images/stock/dest-mumbai.jpg",
    highlight: "CSIA private terminal for rapid city access",
  },
  {
    city: "Moscow",
    country: "Russia",
    code: "SVO",
    region: "Europe",
    duration: "5h 30m",
    distance: "3,670 km",
    image: "/images/stock/dest-moscow.jpg",
    highlight: "Vnukovo-3, Russia's premier private terminal",
  },
];

const regions = ["All", "Europe", "Asia Pacific", "Americas"];

export default function Destinations({ onNavigate }: { onNavigate: NavigateFn }) {
  const [activeRegion, setActiveRegion] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = activeRegion === "All"
    ? destinations
    : destinations.filter(d => d.region === activeRegion);

  const charterRoute = (dest: (typeof destinations)[number]) => {
    onNavigate("charter", {
      from: "Dubai (DXB)",
      to: `${dest.city} (${dest.code})`,
      tripType: "One Way",
    });
  };

  return (
    <div style={{ background: "var(--color-navy)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: "var(--color-midnight)" }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "url(/images/stock/hero-sky.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(26,21,16,0.9) 40%, rgba(26,21,16,0.5) 100%)" }}
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
            Global Network
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold uppercase mb-5"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em", color: "var(--color-white)" }}
          >
            Destinations
          </h1>
          <p
            className="text-base max-w-xl leading-relaxed"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            From Dubai, the world is within reach. Our network spans 87 countries
            across every continent — every destination handled with the same precision.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div
        className="sticky top-20 z-40 py-4"
        style={{
          background: "rgba(250,248,244,0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(200,169,107,0.2)",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex gap-6">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: activeRegion === r ? "var(--color-ink)" : "var(--color-gray)",
                background: "none",
                border: "none",
                borderBottom: activeRegion === r ? "1px solid var(--color-blue)" : "1px solid transparent",
                paddingBottom: "6px",
                cursor: "pointer",
                fontWeight: activeRegion === r ? 600 : 400,
                transition: "all 0.2s ease",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((dest, i) => (
            <div
              key={dest.city}
              className="group cursor-pointer overflow-hidden relative"
              style={{
                background: "var(--color-midnight)",
                border: "1px solid rgba(200,169,107,0.25)",
                transition: "border-color 0.4s ease, transform 0.4s ease",
                borderColor: hovered === i ? "rgba(200,169,107,0.45)" : "rgba(200,169,107,0.25)",
                transform: hovered === i ? "translateY(-3px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-900">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: hovered === i ? "scale(1.08)" : "scale(1)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(26,21,16,0.9) 0%, transparent 55%)" }}
                />
                <div
                  className="absolute top-3 right-3 text-xs px-2 py-1 tracking-widest"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "rgba(26,21,16,0.75)",
                    color: "var(--color-white)",
                    border: "1px solid rgba(200,169,107,0.35)",
                    fontSize: "9px",
                  }}
                >
                  {dest.region.toUpperCase()}
                </div>
                <div className="absolute bottom-3 left-4">
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "0.1em", color: "var(--color-white)" }}
                  >
                    {dest.code}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                    >
                      {dest.city}
                    </h3>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                    >
                      {dest.country}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-sm font-medium"
                      style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
                    >
                      {dest.duration}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                    >
                      {dest.distance}
                    </div>
                  </div>
                </div>

                <p
                  className="text-xs mt-3 mb-4 leading-relaxed"
                  style={{
                    color: "var(--color-gray)",
                    fontFamily: "var(--font-body)",
                    borderLeft: "2px solid rgba(200,169,107,0.4)",
                    paddingLeft: "10px",
                  }}
                >
                  {dest.highlight}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    charterRoute(dest);
                  }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: hovered === i ? "var(--color-white)" : "var(--color-gray)",
                    background: hovered === i ? "var(--color-blue)" : "transparent",
                    border: "1px solid rgba(200,169,107,0.35)",
                    cursor: "pointer",
                    padding: "9px 18px",
                    transition: "all 0.3s ease",
                    borderColor: hovered === i ? "var(--color-blue)" : "rgba(200,169,107,0.35)",
                  }}
                >
                  Charter This Route →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dubai hub callout */}
        <div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden"
          style={{ border: "1px solid rgba(200,169,107,0.25)" }}
        >
          <div
            className="relative h-72 bg-gray-900"
            style={{
              backgroundImage: "url(/images/stock/dest-dubai.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(26,21,16,0.45)" }}
            />
          </div>
          <div
            className="p-10 flex flex-col justify-center"
            style={{ background: "var(--color-midnight)" }}
          >
            <div
              className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              Home Base
            </div>
            <h3
              className="text-3xl font-bold uppercase mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Dubai<br />
              <span style={{ color: "var(--color-blue)" }}>DXB / DWC</span>
            </h3>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
            >
              Aura operates from Dubai's private terminals at DXB and DWC,
              providing unmatched access and turnaround times. Our team is on-site
              around the clock to ensure seamless departures.
            </p>
            <div className="flex gap-6">
              {[
                { label: "Terminals", value: "DXB T1 / DWC" },
                { label: "Response", value: "< 30 min" },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    className="text-xs tracking-[0.15em] uppercase mb-1"
                    style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
