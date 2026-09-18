import { CERT_BADGES, TRUST_REVIEW, TRUST_STATS } from "../data/brand";

/** Compact trust strip — reviews, stats, cert names. */
export default function TrustBar({ variant = "light" }: { variant?: "light" | "dark" }) {
  const muted = variant === "dark" ? "rgba(247,248,250,0.55)" : "var(--color-gray)";
  const ink = variant === "dark" ? "var(--color-white)" : "var(--color-ink)";
  const border =
    variant === "dark" ? "rgba(214,185,108,0.22)" : "rgba(1,40,153,0.12)";

  const cells = [
    {
      id: "rating",
      value: TRUST_REVIEW.score,
      accent: true as const,
      meta: "★★★★★",
      label: `${TRUST_REVIEW.count} ${TRUST_REVIEW.label}`,
    },
    ...TRUST_STATS.map((s) => ({
      id: s.label,
      value: s.value,
      accent: false as const,
      meta: "",
      label: s.label,
    })),
  ];

  return (
    <section
      className="py-8 md:py-10"
      style={{
        background: variant === "dark" ? "var(--color-premium)" : "var(--color-white)",
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x items-stretch"
          style={{ borderColor: border }}
        >
          {cells.map((cell, i) => (
            <div
              key={cell.id}
              className={`flex flex-col h-full ${
                i === 0 ? "lg:pr-8" : i === cells.length - 1 ? "lg:pl-8" : "lg:px-8"
              }`}
            >
              <div
                className="text-3xl md:text-4xl font-bold tabular-nums leading-none flex items-end"
                style={{
                  fontFamily: "var(--font-display)",
                  color: cell.accent ? "var(--color-aqua)" : ink,
                  minHeight: "2.5rem",
                }}
              >
                {cell.value}
              </div>
              <div
                className="text-[10px] tracking-[0.28em] mt-2 leading-none flex items-center"
                style={{
                  color: cell.accent ? "var(--color-aqua)" : "transparent",
                  fontFamily: "var(--font-display)",
                  minHeight: "0.875rem",
                }}
                aria-hidden={!cell.meta}
                aria-label={cell.meta ? "5 out of 5 stars" : undefined}
              >
                {cell.meta || "\u00A0"}
              </div>
              <div
                className="text-[10px] tracking-[0.2em] uppercase mt-1.5 leading-snug"
                style={{ color: muted, fontFamily: "var(--font-display)" }}
              >
                {cell.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {CERT_BADGES.map((c) => (
            <div
              key={c.id}
              className="px-3 py-3 flex flex-col justify-center min-h-[4.25rem]"
              style={{
                border: `1px solid ${border}`,
                background: variant === "dark" ? "rgba(255,255,255,0.04)" : "var(--color-offwhite)",
              }}
              aria-label={`${c.name}: ${c.detail}`}
            >
              <div
                className="text-[10px] tracking-[0.18em] uppercase font-semibold leading-tight"
                style={{ fontFamily: "var(--font-display)", color: ink }}
              >
                {c.name}
              </div>
              <div
                className="text-[10px] mt-1 leading-snug"
                style={{ color: muted, fontFamily: "var(--font-body)" }}
              >
                {c.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
