import { useState } from "react";
import { FLEET } from "../data/fleet";
import type { NavigateFn } from "../lib/nav";

interface FleetProps {
  onNavigate: NavigateFn;
}

const categories = ["All", "Ultra Long Range", "Long Range", "Super Midsize"];

export default function Fleet({ onNavigate }: FleetProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filtered =
    activeCategory === "All" ? FLEET : FLEET.filter((ac) => ac.category === activeCategory);

  return (
    <div style={{ background: "var(--color-navy)", minHeight: "100vh" }}>
      <div className="relative pt-36 pb-20 overflow-hidden" style={{ background: "var(--color-midnight)" }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(/images/stock/jet-exterior-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(26,21,16,0.72)" }} />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
            Aura Fleet
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold uppercase mb-4"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em", color: "var(--color-white)" }}
          >
            Aircraft as product
          </h1>
          <p
            className="text-base max-w-xl leading-relaxed"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            Browse categories, open a detail page for cabin and specs, then inquire for that
            specific type through Aura’s approved-operator network.
          </p>
        </div>
      </div>

      <div
        className="sticky top-20 z-40 py-4"
        style={{
          background: "rgba(250,248,244,0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(200,169,107,0.2)",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex gap-6 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: activeCategory === c ? "var(--color-ink)" : "var(--color-gray)",
                background: "none",
                border: "none",
                borderBottom:
                  activeCategory === c ? "1px solid var(--color-blue)" : "1px solid transparent",
                paddingBottom: "6px",
                cursor: "pointer",
                fontWeight: activeCategory === c ? 600 : 400,
                whiteSpace: "nowrap",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((ac, i) => (
            <div
              key={ac.slug}
              className="overflow-hidden"
              style={{
                background: "var(--color-midnight)",
                border: "1px solid rgba(200,169,107,0.25)",
                borderColor: hoveredIdx === i ? "rgba(200,169,107,0.45)" : "rgba(200,169,107,0.25)",
                transition: "border-color 0.4s ease",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <button
                type="button"
                className="relative h-56 w-full overflow-hidden bg-gray-900 block text-left"
                onClick={() => onNavigate(`fleet/${ac.slug}`)}
                style={{ border: "none", padding: 0, cursor: "pointer" }}
              >
                <img
                  src={ac.image}
                  alt={ac.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: hoveredIdx === i ? "scale(1.06)" : "scale(1)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(26,21,16,0.85) 0%, transparent 55%)",
                  }}
                />
                <div
                  className="absolute top-4 left-4 text-xs tracking-[0.2em] uppercase px-3 py-1.5"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: ac.tagColor,
                    color: ac.tag === "Available"
                      ? "var(--color-gray)"
                      : ac.tag === "Most Popular"
                        ? "var(--color-white)"
                        : "var(--color-ink)",
                    fontSize: "9px",
                  }}
                >
                  {ac.tag}
                </div>
              </button>

              <div className="p-7">
                <div
                  className="text-xs tracking-[0.25em] uppercase mb-2"
                  style={{ color: "var(--color-blue)", fontFamily: "var(--font-display)" }}
                >
                  {ac.category}
                </div>
                <h2
                  className="text-2xl font-bold uppercase mb-2"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
                >
                  {ac.name}
                </h2>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                >
                  {ac.description}
                </p>
                <div className="flex flex-wrap gap-4 text-xs mb-2" style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}>
                  <span>{ac.passengers} pax</span>
                  <span>{ac.range}</span>
                  <span>{ac.speed}</span>
                </div>
                <div
                  className="text-sm font-bold mb-5"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                >
                  {ac.hourlyFrom}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate(`fleet/${ac.slug}`)}
                    className="flex-1 py-3 text-xs tracking-[0.2em] uppercase font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-ink)",
                      background: "transparent",
                      border: "1px solid rgba(200,169,107,0.4)",
                      cursor: "pointer",
                    }}
                  >
                    View details
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate("charter", { aircraft: ac.name, aircraftSlug: ac.slug })
                    }
                    className="flex-1 py-3 text-xs tracking-[0.2em] uppercase font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color:
                        hoveredIdx === i ? "var(--color-royal)" : "var(--color-white)",
                      background: hoveredIdx === i ? "var(--color-gold)" : "var(--color-blue)",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.3s ease, color 0.3s ease",
                    }}
                  >
                    Charter this aircraft
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
