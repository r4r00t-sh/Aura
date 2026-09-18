import { CERT_BADGES, PROOF_POINTS, CHARTER_EMAIL, CHARTER_PHONE, CHARTER_PHONE_TEL } from "../data/brand";
import type { NavigateFn } from "../lib/nav";

export default function Safety({ onNavigate }: { onNavigate: NavigateFn }) {
  return (
    <div style={{ background: "var(--color-navy)", minHeight: "100vh" }}>
      <div className="relative pt-36 pb-20" style={{ background: "var(--color-premium)" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
            Safety
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold uppercase mb-5"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-white)", letterSpacing: "0.04em" }}
          >
            Standards before
            <br />
            every mission
          </h1>
          <p
            className="text-base max-w-2xl leading-relaxed"
            style={{ color: "rgba(247,248,250,0.65)", fontFamily: "var(--font-body)" }}
          >
            Aura arranges charters exclusively through approved operators. Diligence, documentation,
            and advisor accountability are part of every quote — not an afterthought.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {CERT_BADGES.map((c) => (
            <div
              key={c.id}
              className="p-6"
              style={{
                background: "var(--color-white)",
                border: "1px solid rgba(1,40,153,0.12)",
              }}
            >
              <div
                className="text-xs tracking-[0.2em] uppercase mb-2 font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
              >
                {c.name}
              </div>
              <p className="text-sm" style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}>
                {c.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {PROOF_POINTS.map((p) => (
            <div key={p.title}>
              <h2
                className="text-sm font-bold uppercase mb-2"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.06em" }}
              >
                {p.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>

        <div
          className="p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{ background: "var(--color-midnight)", border: "1px solid rgba(200,169,107,0.25)" }}
        >
          <div>
            <div
              className="text-xs tracking-[0.25em] uppercase mb-2"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              Charter desk
            </div>
            <a
              href={`tel:${CHARTER_PHONE_TEL}`}
              className="text-xl font-bold block"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", textDecoration: "none" }}
            >
              {CHARTER_PHONE}
            </a>
            <a
              href={`mailto:${CHARTER_EMAIL}`}
              className="text-sm"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-gray)" }}
            >
              {CHARTER_EMAIL}
            </a>
          </div>
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
        </div>
      </div>
    </div>
  );
}
