import { useState } from "react";
import { AIRCRAFT_FOR_SALE } from "../data/aircraftForSale";
import type { NavigateFn } from "../lib/nav";

interface AircraftForSaleProps {
  onNavigate: NavigateFn;
}

export default function AircraftForSale({ onNavigate }: AircraftForSaleProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const openSpec = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ background: "var(--color-navy)", minHeight: "100vh" }}>
      <div className="relative pt-36 pb-20 overflow-hidden" style={{ background: "var(--color-premium)" }}>
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "url(/images/stock/hero-tarmac.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(7,20,38,0.78)" }} />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
            Brokerage
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold uppercase mb-4"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.04em",
              color: "var(--color-white)",
            }}
          >
            Aircraft for sale
          </h1>
          <p
            className="text-base max-w-xl leading-relaxed"
            style={{ color: "rgba(247,248,250,0.7)", fontFamily: "var(--font-body)" }}
          >
            Curated pre-owned inventory. Each listing shows make, year, and expected amount —
            open the full specification sheet to review avionics, times, and cabin detail.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AIRCRAFT_FOR_SALE.map((ac) => {
            const active = hovered === ac.id;
            return (
              <article
                key={ac.id}
                className="overflow-hidden flex flex-col"
                style={{
                  background: "var(--color-midnight)",
                  border: active
                    ? "1px solid rgba(200,169,107,0.45)"
                    : "1px solid rgba(200,169,107,0.25)",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={() => setHovered(ac.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={ac.image}
                    alt={ac.make}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{ transform: active ? "scale(1.05)" : "scale(1)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(7,20,38,0.55) 0%, transparent 55%)",
                    }}
                  />
                  <span
                    className="absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase px-3 py-1.5"
                    style={{
                      fontFamily: "var(--font-display)",
                      background:
                        ac.status === "Available"
                          ? "var(--color-royal)"
                          : ac.status === "Under offer"
                            ? "var(--color-gold)"
                            : "rgba(7,20,38,0.75)",
                      color:
                        ac.status === "Under offer" ? "var(--color-deep)" : "var(--color-white)",
                    }}
                  >
                    {ac.status}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1 gap-5">
                  <div>
                    <p
                      className="text-[10px] tracking-[0.25em] uppercase mb-2"
                      style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
                    >
                      {ac.category} · {ac.seats} seats
                    </p>
                    <h2
                      className="text-xl md:text-2xl font-bold uppercase mb-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        letterSpacing: "0.03em",
                        color: "var(--color-ink)",
                      }}
                    >
                      {ac.make}
                    </h2>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                    >
                      {ac.summary}
                    </p>
                  </div>

                  <dl
                    className="grid grid-cols-3 gap-3 py-4"
                    style={{ borderTop: "1px solid rgba(1,40,153,0.1)", borderBottom: "1px solid rgba(1,40,153,0.1)" }}
                  >
                    <div>
                      <dt
                        className="text-[9px] tracking-[0.2em] uppercase mb-1"
                        style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)" }}
                      >
                        Make
                      </dt>
                      <dd
                        className="text-sm font-semibold leading-snug"
                        style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)" }}
                      >
                        {ac.make}
                      </dd>
                    </div>
                    <div>
                      <dt
                        className="text-[9px] tracking-[0.2em] uppercase mb-1"
                        style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)" }}
                      >
                        Year
                      </dt>
                      <dd
                        className="text-sm font-semibold"
                        style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)" }}
                      >
                        {ac.year}
                      </dd>
                    </div>
                    <div>
                      <dt
                        className="text-[9px] tracking-[0.2em] uppercase mb-1"
                        style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)" }}
                      >
                        Expected
                      </dt>
                      <dd
                        className="text-sm font-semibold"
                        style={{ fontFamily: "var(--font-body)", color: "var(--color-royal)" }}
                      >
                        {ac.expectedAmount}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => openSpec(ac.pdfUrl)}
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
                        padding: "14px 24px",
                        flex: 1,
                      }}
                    >
                      Know more
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate("contact", {
                          subject: `Aircraft sale inquiry — ${ac.make} (${ac.year})`,
                          message: `I am interested in the ${ac.make} (${ac.year}), listed at ${ac.expectedAmount}. Please share next steps.`,
                        })
                      }
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        color: "var(--color-ink)",
                        background: "transparent",
                        border: "1px solid rgba(1,40,153,0.25)",
                        cursor: "pointer",
                        padding: "14px 24px",
                      }}
                    >
                      Contact desk
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p
          className="mt-12 text-xs leading-relaxed max-w-2xl"
          style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
        >
          Specifications are subject to verification by purchaser with no representations or
          warranties implied. Aircraft may be subject to prior sale or withdrawal. Spec PDFs are
          served from{" "}
          <code style={{ color: "var(--color-royal)" }}>public/aircraft-specs/</code> — replace
          each file when you upload updated sheets.
        </p>
      </div>
    </div>
  );
}
