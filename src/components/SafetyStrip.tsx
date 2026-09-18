import { CERT_BADGES, PROOF_POINTS } from "../data/brand";
import type { NavigateFn } from "../lib/nav";

export default function SafetyStrip({ onNavigate }: { onNavigate?: NavigateFn }) {
  return (
    <section className="py-20 md:py-24" style={{ background: "var(--color-premium)" }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div
              className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
              style={{ color: "var(--color-aqua)", fontFamily: "var(--font-display)" }}
            >
              <span className="block w-6 h-px" style={{ background: "var(--color-aqua)" }} />
              Safety & standards
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold uppercase mb-5 leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.04em",
                color: "var(--color-white)",
              }}
            >
              Vetted operators.
              <br />
              Documented diligence.
            </h2>
            <p
              className="text-sm leading-relaxed mb-8 max-w-md"
              style={{ color: "rgba(247,248,250,0.65)", fontFamily: "var(--font-body)" }}
            >
              We only source through approved operators and apply ARGUS / Wyvern-aligned due
              diligence before a mission is offered. Ask your advisor for the operator packet on
              any quote.
            </p>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("safety")}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "var(--color-white)",
                  background: "var(--color-aqua)",
                  border: "none",
                  cursor: "pointer",
                  padding: "12px 24px",
                }}
              >
                Safety overview
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CERT_BADGES.map((c) => (
              <div
                key={c.id}
                className="p-5"
                style={{
                  border: "1px solid rgba(214,185,108,0.28)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div
                  className="text-xs tracking-[0.2em] uppercase mb-2 font-semibold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-gold)" }}
                >
                  {c.name}
                </div>
                <p className="text-sm" style={{ color: "rgba(247,248,250,0.6)", fontFamily: "var(--font-body)" }}>
                  {c.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROOF_POINTS.map((p) => (
            <div key={p.title}>
              <h3
                className="text-sm font-bold uppercase mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.06em",
                  color: "var(--color-white)",
                }}
              >
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(247,248,250,0.55)", fontFamily: "var(--font-body)" }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
