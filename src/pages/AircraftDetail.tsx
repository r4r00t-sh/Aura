import { getAircraftBySlug } from "../data/fleet";
import type { NavigateFn } from "../lib/nav";

interface AircraftDetailProps {
  slug: string;
  onNavigate: NavigateFn;
}

export default function AircraftDetail({ slug, onNavigate }: AircraftDetailProps) {
  const ac = getAircraftBySlug(slug);

  if (!ac) {
    return (
      <div style={{ background: "var(--color-navy)", minHeight: "100vh" }} className="pt-36 px-6">
        <div className="max-w-screen-xl mx-auto text-center py-24">
          <h1
            className="text-3xl font-bold uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Aircraft not found
          </h1>
          <button
            type="button"
            onClick={() => onNavigate("fleet")}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-white)",
              background: "var(--color-royal)",
              border: "none",
              cursor: "pointer",
              padding: "12px 24px",
            }}
          >
            Back to fleet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--color-navy)", minHeight: "100vh" }}>
      <div className="relative pt-28 md:pt-32">
        <div className="relative h-[42vh] md:h-[52vh] overflow-hidden bg-gray-900">
          <img src={ac.image} alt={ac.name} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(7,20,38,0.92) 0%, rgba(7,20,38,0.35) 45%, transparent 70%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 max-w-screen-xl mx-auto px-6 md:px-10 pb-8">
            <button
              type="button"
              onClick={() => onNavigate("fleet")}
              className="text-[10px] tracking-[0.28em] uppercase mb-4"
              style={{
                color: "rgba(247,248,250,0.7)",
                fontFamily: "var(--font-display)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              ← Fleet
            </button>
            <div
              className="text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              {ac.category} · {ac.tag}
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold uppercase"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.04em",
                color: "var(--color-white)",
              }}
            >
              {ac.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            {ac.description}
          </p>
          <h2
            className="text-sm tracking-[0.25em] uppercase mb-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            Cabin
          </h2>
          <p
            className="text-sm leading-relaxed mb-10"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            {ac.cabin}
          </p>
          <div className="relative h-64 md:h-80 overflow-hidden mb-10">
            <img src={ac.interior} alt={`${ac.name} cabin`} className="w-full h-full object-cover" />
          </div>
          <h2
            className="text-sm tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            Typical Dubai routes
          </h2>
          <div className="flex flex-wrap gap-2">
            {ac.routes.map((route) => (
              <span
                key={route}
                className="text-xs px-3 py-1.5"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.1em",
                  color: "var(--color-gray)",
                  border: "1px solid rgba(200,169,107,0.3)",
                }}
              >
                {route}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div
            className="p-6 sticky top-28"
            style={{
              background: "var(--color-white)",
              border: "1px solid rgba(1,40,153,0.12)",
              borderRadius: "12px",
              boxShadow: "0 16px 40px rgba(7,20,38,0.08)",
            }}
          >
            <div
              className="text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              Specifications
            </div>
            {[
              ["Passengers", String(ac.passengers)],
              ["Range", ac.range],
              ["Speed", ac.speed],
              ["Ceiling", ac.ceiling],
              ["Crew", String(ac.crew)],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between py-3"
                style={{ borderBottom: "1px solid rgba(1,40,153,0.08)" }}
              >
                <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}>
                  {k}
                </span>
                <span className="text-sm font-medium" style={{ color: "var(--color-ink)", fontFamily: "var(--font-body)" }}>
                  {v}
                </span>
              </div>
            ))}
            <div className="mt-6 mb-2 text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
              {ac.hourlyFrom}
            </div>
            <p className="text-xs mb-6" style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}>
              Indicative broker rate band — confirm with Aura for your mission.
            </p>
            <button
              type="button"
              onClick={() =>
                onNavigate("charter", {
                  aircraft: ac.name,
                  aircraftSlug: ac.slug,
                })
              }
              className="w-full py-4 text-xs tracking-[0.25em] uppercase font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-white)",
                background: "var(--color-royal)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Charter this aircraft
            </button>
            <button
              type="button"
              onClick={() =>
                onNavigate("contact", {
                  subject: "sourcing",
                  message: `Inquiry about ${ac.name} availability and alternatives.`,
                  aircraft: ac.name,
                })
              }
              className="w-full mt-3 py-3 text-xs tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink)",
                background: "transparent",
                border: "1px solid rgba(1,40,153,0.2)",
                cursor: "pointer",
              }}
            >
              Ask an advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
