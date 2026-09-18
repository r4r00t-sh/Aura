import { SAMPLE_ROUTES } from "../data/pricing";
import type { NavigateFn } from "../lib/nav";

export default function SamplePricing({ onNavigate }: { onNavigate: NavigateFn }) {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--color-white)" }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div
              className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
              style={{ color: "var(--color-aqua)", fontFamily: "var(--font-display)" }}
            >
              <span className="block w-6 h-px" style={{ background: "var(--color-aqua)" }} />
              Sample pricing
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold uppercase leading-tight"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
            >
              Dubai route bands
            </h2>
          </div>
          <p
            className="text-sm max-w-md leading-relaxed"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            Indicative one-way bands for planning — final quotes depend on aircraft, timing,
            airports, and market. Empty legs can price meaningfully lower.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_ROUTES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() =>
                onNavigate("charter", {
                  from: `Dubai (DXB)`,
                  to: `${r.to}`,
                  tripType: "One Way",
                })
              }
              className="text-left p-6 transition-colors"
              style={{
                border: "1px solid rgba(1,40,153,0.12)",
                background: "var(--color-offwhite)",
                cursor: "pointer",
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div
                    className="text-lg font-bold uppercase"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
                  >
                    {r.from} — {r.to}
                  </div>
                  <div
                    className="text-xs mt-1 tracking-[0.15em] uppercase"
                    style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
                  >
                    {r.codes} · {r.duration}
                  </div>
                </div>
                <div
                  className="text-[10px] tracking-[0.15em] uppercase px-2 py-1 flex-shrink-0"
                  style={{
                    color: "var(--color-blue)",
                    border: "1px solid rgba(1,40,153,0.2)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {r.category}
                </div>
              </div>
              <div
                className="text-xl font-bold mb-1"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-aqua)" }}
              >
                {r.band}
              </div>
              <div className="text-xs" style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}>
                {r.note} · Request a firm quote →
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
