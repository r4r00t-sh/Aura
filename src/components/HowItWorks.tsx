import type { NavigateFn } from "../lib/nav";

const STEPS = [
  {
    n: "01",
    title: "Tell us the mission",
    text: "Route, timing, passengers or cargo — or pick an aircraft / empty leg. We qualify the brief in minutes.",
  },
  {
    n: "02",
    title: "We source & vet",
    text: "Aura arranges aircraft through approved operators — safety checks, slots, permits, and ground handling.",
  },
  {
    n: "03",
    title: "Confirm & fly",
    text: "Indicative pricing within 30 minutes. Once confirmed, your advisor stays with you until arrival.",
  },
];

export default function HowItWorks({ onNavigate }: { onNavigate?: NavigateFn }) {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--color-offwhite)" }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div
          className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
          style={{ color: "var(--color-aqua)", fontFamily: "var(--font-display)" }}
        >
          <span className="block w-6 h-px" style={{ background: "var(--color-aqua)" }} />
          How it works
        </div>
        <h2
          className="text-3xl md:text-5xl font-bold uppercase mb-4 leading-tight max-w-2xl"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
        >
          Arranged for you.
          <br />
          <span style={{ color: "var(--color-aqua)" }}>Not a marketplace.</span>
        </h2>
        <p
          className="text-sm max-w-xl mb-12 leading-relaxed"
          style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
        >
          Aura is a Dubai charter broker and coordinator — we arrange and provide private or
          chartered aircraft for passenger and cargo transportation through vetted operators.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {STEPS.map((step) => (
            <div key={step.n}>
              <div
                className="text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: "var(--color-aqua)", fontFamily: "var(--font-display)" }}
              >
                {step.n}
              </div>
              <h3
                className="text-lg font-bold uppercase mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.04em",
                  color: "var(--color-ink)",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
              >
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate("charter")}
            className="mt-12"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--color-white)",
              background: "var(--color-royal)",
              border: "none",
              cursor: "pointer",
              padding: "14px 28px",
            }}
          >
            Start a request
          </button>
        )}
      </div>
    </section>
  );
}
