import { useState } from "react";
import type { NavigateFn } from "../lib/nav";
import { isValidEmail, saveAlertEmail, saveInquiry } from "../lib/inquiries";
import { EMPTY_LEGS } from "../data/emptyLegs";

export default function EmptyLegs({ onNavigate }: { onNavigate: NavigateFn }) {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertStatus, setAlertStatus] = useState<"idle" | "ok" | "error">("idle");

  const categories = ["All", "Ultra Long Range", "Long Range", "Super Midsize"];
  const emptyLegs = EMPTY_LEGS;
  const filtered = filter === "All" ? emptyLegs : emptyLegs.filter((f) => f.category === filter);

  const inquire = (flight: (typeof emptyLegs)[number]) => {
    onNavigate("contact", {
      subject: "empty-leg",
      message: `Empty leg inquiry:\n${flight.from} (${flight.fromCode}) → ${flight.to} (${flight.toCode})\nDate: ${flight.date} · Departs ${flight.departs}\nAircraft: ${flight.aircraft}\n${flight.price}`,
      aircraft: flight.aircraft,
      from: `${flight.from} (${flight.fromCode})`,
      to: `${flight.to} (${flight.toCode})`,
      date: flight.date,
    });
  };

  const subscribeAlerts = () => {
    if (!isValidEmail(alertEmail)) {
      setAlertStatus("error");
      return;
    }
    saveAlertEmail(alertEmail);
    saveInquiry("empty-leg-alert", { email: alertEmail });
    setAlertStatus("ok");
    setAlertEmail("");
  };

  return (
    <div style={{ background: "var(--color-navy)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: "var(--color-midnight)" }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url(/images/stock/hero-tarmac.jpg)",
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
            Available Now · Live feed
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold uppercase mb-5"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em", color: "var(--color-white)" }}
          >
            Empty Leg<br />
            <span style={{ color: "var(--color-blue)" }}>Flights</span>
          </h1>
          <p
            className="text-base max-w-xl leading-relaxed"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            Perishable repositioning flights refreshed for the current week — inquire quickly;
            availability changes as legs are taken.
          </p>
        </div>
      </div>

      {/* What is an empty leg */}
      <div
        className="py-8"
        style={{ borderBottom: "1px solid rgba(200,169,107,0.2)" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "✈", title: "Same Luxury", desc: "Identical aircraft, crew, and service as a full charter." },
              { icon: "◎", title: "Fixed Route", desc: "Routes are set — departure and destination are pre-defined." },
              { icon: "⬡", title: "Exceptional Value", desc: "Savings of up to 75% compared to standard charter rates." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5"
                style={{
                  background: "#F3EEE4",
                  border: "1px solid rgba(200,169,107,0.25)",
                }}
              >
                <div
                  className="text-2xl"
                  style={{ color: "var(--color-gold)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    className="text-sm font-bold mb-1"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex gap-6 overflow-x-auto items-center justify-between">
          <div className="flex gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: filter === cat ? "var(--color-ink)" : "var(--color-gray)",
                  background: "none",
                  border: "none",
                  borderBottom: filter === cat ? "1px solid var(--color-blue)" : "1px solid transparent",
                  paddingBottom: "6px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontWeight: filter === cat ? 600 : 400,
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div
            className="text-xs tracking-widest"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}
          >
            {filtered.length} flights available
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col gap-4">
          {filtered.map((flight, i) => (
            <div
              key={i}
              className="group"
              style={{
                background: "var(--color-midnight)",
                border: "1px solid rgba(200,169,107,0.25)",
                transition: "border-color 0.3s ease, transform 0.3s ease",
                borderColor: hovered === i ? "rgba(200,169,107,0.5)" : "rgba(200,169,107,0.25)",
                transform: hovered === i ? "translateY(-2px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-6">
                {/* Route */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    {flight.tag && (
                      <span
                        className="text-xs px-3 py-1 tracking-[0.15em] uppercase"
                        style={{
                          fontFamily: "var(--font-display)",
                          background: flight.tag === "Featured"
                            ? "rgba(200,169,107,0.15)"
                            : flight.tag === "Last Seats"
                            ? "rgba(220,50,50,0.15)"
                            : "rgba(200,169,107,0.12)",
                          color: flight.tag === "Featured"
                            ? "var(--color-gold)"
                            : flight.tag === "Last Seats"
                            ? "#e05050"
                            : "var(--color-blue)",
                          border: `1px solid ${flight.tag === "Featured"
                            ? "rgba(200,169,107,0.3)"
                            : flight.tag === "Last Seats"
                            ? "rgba(220,50,50,0.25)"
                            : "rgba(200,169,107,0.3)"}`,
                        }}
                      >
                        {flight.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-5 mb-3">
                    <div>
                      <div
                        className="text-3xl font-bold"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                      >
                        {flight.fromCode}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                      >
                        {flight.from}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className="text-xs tracking-widest"
                        style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
                      >
                        {flight.duration}
                      </div>
                      <div className="flex items-center gap-2 w-full">
                        <div className="h-px flex-1" style={{ background: "rgba(200,169,107,0.4)" }} />
                        <div style={{ color: "var(--color-blue)", fontSize: "12px" }}>✈</div>
                        <div className="h-px flex-1" style={{ background: "rgba(200,169,107,0.4)" }} />
                      </div>
                      <div
                        className="text-xs tracking-widest"
                        style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
                      >
                        Non-stop
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-3xl font-bold"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                      >
                        {flight.toCode}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                      >
                        {flight.to}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-row md:flex-col gap-6 md:gap-4 md:min-w-[180px] md:border-l md:pl-7" style={{ borderColor: "rgba(200,169,107,0.25)" }}>
                  <div>
                    <div style={{ ...{} as React.CSSProperties, fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--color-gray)", marginBottom: "4px" }}>Date</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--color-ink)" }}>{flight.date}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--color-gray)" }}>{flight.departs} departure</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--color-gray)", marginBottom: "4px" }}>Aircraft</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--color-ink)" }}>{flight.aircraft}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--color-gray)" }}>{flight.seats} seats avail.</div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex flex-col gap-3 md:min-w-[180px] md:items-end">
                  <div
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                  >
                    {flight.price}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                  >
                    Price for entire aircraft · {flight.updated}
                  </div>
                  <button
                    type="button"
                    onClick={() => inquire(flight)}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: hovered === i ? "var(--color-royal)" : "var(--color-white)",
                      background: hovered === i ? "var(--color-gold)" : "var(--color-royal)",
                      border: "none",
                      cursor: "pointer",
                      padding: "12px 24px",
                      transition: "background 0.3s ease, color 0.3s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Inquire →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alert signup */}
        <div
          className="mt-12 p-8 text-center"
          style={{
            background: "var(--color-midnight)",
            border: "1px solid rgba(200,169,107,0.25)",
          }}
        >
          <div
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            Stay Updated
          </div>
          <h3
            className="text-2xl font-bold uppercase mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Empty Leg Alerts
          </h3>
          <p
            className="text-sm max-w-md mx-auto mb-6 leading-relaxed"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            Be first to know when new empty legs match your preferred routes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={alertEmail}
              onChange={(e) => {
                setAlertEmail(e.target.value);
                setAlertStatus("idle");
              }}
              placeholder="Your email address"
              className="flex-1"
              style={{
                background: "rgba(250,248,244,0.95)",
                border: "1px solid rgba(200,169,107,0.3)",
                color: "var(--color-ink)",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                padding: "13px 16px",
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={subscribeAlerts}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--color-white)",
                background: "var(--color-blue)",
                border: "none",
                cursor: "pointer",
                padding: "13px 24px",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </div>
          {alertStatus === "ok" && (
            <p className="text-xs mt-4" style={{ color: "var(--color-gold)", fontFamily: "var(--font-body)" }}>
              You're on the list — we'll alert you when matching empty legs open.
            </p>
          )}
          {alertStatus === "error" && (
            <p className="text-xs mt-4" style={{ color: "#b42318", fontFamily: "var(--font-body)" }}>
              Please enter a valid email address.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
