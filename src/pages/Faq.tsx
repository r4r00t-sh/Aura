import { FAQ_ITEMS } from "../data/faq";
import { FaqAccordion } from "../components/FaqAccordion";
import type { NavigateFn } from "../lib/nav";

export default function Faq({ onNavigate }: { onNavigate: NavigateFn }) {
  return (
    <div style={{ background: "var(--color-navy)", minHeight: "100vh" }}>
      <div className="relative pt-36 pb-16" style={{ background: "var(--color-premium)" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
            Help
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold uppercase mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-white)",
              letterSpacing: "0.04em",
            }}
          >
            Frequently asked
            <br />
            questions
          </h1>
          <p
            className="text-base max-w-xl leading-relaxed"
            style={{ color: "rgba(247,248,250,0.65)", fontFamily: "var(--font-body)" }}
          >
            Clear answers on pricing, process, safety, and empty legs — before you speak with the desk.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--color-white)" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-14">
          <FaqAccordion items={FAQ_ITEMS} onNavigate={onNavigate} />
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onNavigate("charter")}
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
              Request a charter
            </button>
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--color-ink)",
                background: "transparent",
                border: "1px solid rgba(1,40,153,0.2)",
                cursor: "pointer",
                padding: "14px 28px",
              }}
            >
              Contact the desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
