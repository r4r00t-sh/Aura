import { TESTIMONIALS, PRESS_LOGOS } from "../data/testimonials";

export function PressStrip() {
  return (
    <div className="py-10" style={{ borderTop: "1px solid rgba(1,40,153,0.08)", borderBottom: "1px solid rgba(1,40,153,0.08)" }}>
      <p
        className="text-center text-[10px] tracking-[0.35em] uppercase mb-6"
        style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)" }}
      >
        As featured in
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6">
        {PRESS_LOGOS.map((logo) => (
          <span
            key={logo.id}
            className="text-xs md:text-sm tracking-[0.12em] uppercase"
            style={{
              fontFamily: "var(--font-display)",
              color: "rgba(1,31,112,0.35)",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            {logo.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 md:py-24" style={{ background: "var(--color-navy)" }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div
          className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
          style={{ color: "var(--color-aqua)", fontFamily: "var(--font-display)" }}
        >
          <span className="block w-6 h-px" style={{ background: "var(--color-aqua)" }} />
          Clients
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold uppercase mb-12 max-w-lg"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
        >
          Named trust, not anonymous stars
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.id} className="flex flex-col gap-5">
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "var(--color-ink)", fontFamily: "var(--font-body)" }}
              >
                “{t.quote}”
              </p>
              <footer>
                <cite
                  className="not-italic text-sm font-bold uppercase block"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "0.06em", color: "var(--color-deep)" }}
                >
                  {t.name}
                </cite>
                <span
                  className="text-xs mt-1 block"
                  style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                >
                  {t.role} · {t.city}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <PressStrip />
      </div>
    </section>
  );
}
