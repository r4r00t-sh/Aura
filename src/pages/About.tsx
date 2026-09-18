import { AURA_SERVICES } from "../data/services";
import { CERT_BADGES, TRUST_REVIEW } from "../data/brand";

export default function About() {
  const values = [
    {
      title: "Discretion",
      desc: "Every journey and every passenger remains entirely private. Our team operates under strict non-disclosure at all times.",
    },
    {
      title: "Precision",
      desc: "Meticulous preparation before every flight. From weather analysis to ground logistics, nothing is left to chance.",
    },
    {
      title: "Excellence",
      desc: "World-class crew, curated catering, and an obsessive attention to detail that defines the Aura standard.",
    },
    {
      title: "Reliability",
      desc: "A 99.6% on-time departure record across 1,840+ missions. When you need to move, we are ready.",
    },
  ];

  const team = [
    {
      name: "Ahmed Al Rashid",
      title: "Chief Executive Officer",
      bio: "Former GCAA official with 20 years in Gulf aviation. Architect of Aura's founding vision.",
    },
    {
      name: "Sarah Mathews",
      title: "Director of Operations",
      bio: "RAF trained. Previously with VistaJet and NetJets. Oversees all flight operations from Dubai.",
    },
    {
      name: "Khalid Al Mansoori",
      title: "Head of Charter Sales",
      bio: "12 years in luxury hospitality and private aviation. Fluent in Arabic, English, and French.",
    },
  ];

  const certs = CERT_BADGES.map((c) => c.name);

  return (
    <div style={{ background: "var(--color-navy)", minHeight: "100vh" }}>
      {/* Hero */}
      <div className="relative pt-36 pb-24 overflow-hidden" style={{ background: "var(--color-midnight)" }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(/images/stock/jet-cabin-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(26,21,16,0.72)" }} />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="text-xs tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
              About Aura
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold uppercase mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em", color: "var(--color-white)" }}
            >
              Built for<br />
              Those Who<br />
              <span style={{ color: "var(--color-blue)" }}>Expect More.</span>
            </h1>
          </div>
          <div>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
            >
              Founded in Dubai in 2012, Aura Private Aviation was built on a single premise:
              that discerning travellers and operators deserve a partner who can arrange and
              provide the right private or chartered aircraft — for passengers or cargo —
              to the highest standard. Rated {TRUST_REVIEW.score} across {TRUST_REVIEW.count} client
              engagements.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
            >
              From private jet and VIP travel to cargo, group charter, empty legs, leasing,
              flight coordination, and aircraft sales — Aura sources through approved operators
              and delivers end-to-end coordination.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-12 flex items-center gap-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            <span className="block w-6 h-px" style={{ background: "var(--color-gold)" }} />
            Our Values
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="flex gap-6 p-8"
                style={{
                  background: "var(--color-midnight)",
                  border: "1px solid rgba(200,169,107,0.25)",
                }}
              >
                <div
                  className="text-3xl font-bold flex-shrink-0"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "rgba(200,169,107,0.35)",
                    lineHeight: 1,
                  }}
                >
                  0{i + 1}
                </div>
                <div>
                  <h3
                    className="text-lg font-bold uppercase mb-3"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                  >
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial image break */}
      <div className="relative h-80 overflow-hidden">
        <img
          src="/images/stock/jet-cabin-2.jpg"
          alt="Aura fleet on Dubai tarmac"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(26,21,16,0.65)" }}
        >
          <blockquote
            className="text-3xl md:text-4xl text-center px-6"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              color: "var(--color-white)",
              maxWidth: "700px",
            }}
          >
            "We don't just fly people. We move what matters most."
          </blockquote>
        </div>
      </div>

      {/* Services */}
      <div className="py-24" style={{ background: "var(--color-offwhite)" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            <span className="block w-6 h-px" style={{ background: "var(--color-gold)" }} />
            Our Services
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold uppercase mb-4"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
          >
            Arranging & Providing<br />
            <span style={{ color: "var(--color-blue)" }}>Chartered Aircraft</span>
          </h2>
          <p
            className="text-sm leading-relaxed max-w-2xl mb-12"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            Aura provides passenger and cargo air charter solutions — private jets, corporate
            missions, group travel, freight, empty legs, ACMI/leasing, planning, sourcing, and
            aircraft transactions.
          </p>
          <div className="flex flex-col">
            {AURA_SERVICES.map((service, i) => (
              <div
                key={service.id}
                className="grid grid-cols-[3rem_1fr] gap-4 md:gap-8 py-5"
                style={{
                  borderTop: i === 0 ? "1px solid rgba(1,40,153,0.12)" : undefined,
                  borderBottom: "1px solid rgba(1,40,153,0.12)",
                }}
              >
                <span
                  className="text-sm tabular-nums pt-0.5"
                  style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="text-sm md:text-base font-bold uppercase mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.06em",
                      color: "var(--color-ink)",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-2xl"
                    style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                  >
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-24" style={{ background: "var(--color-midnight)" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-12 flex items-center gap-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            <span className="block w-6 h-px" style={{ background: "var(--color-gold)" }} />
            Leadership
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-8"
                style={{
                  background: "#F3EEE4",
                  border: "1px solid rgba(200,169,107,0.25)",
                }}
              >
                <div
                  className="w-12 h-12 mb-6 flex items-center justify-center text-lg font-bold"
                  style={{
                    background: "rgba(200,169,107,0.12)",
                    border: "1px solid rgba(200,169,107,0.3)",
                    fontFamily: "var(--font-display)",
                    color: "var(--color-blue)",
                  }}
                >
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
                >
                  {member.name}
                </h3>
                <div
                  className="text-xs tracking-[0.15em] uppercase mb-4"
                  style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
                >
                  {member.title}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="py-16" style={{ borderTop: "1px solid rgba(200,169,107,0.2)" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-10 text-center"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
          >
            Certifications & Safety Standards
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {certs.map((cert) => (
              <div
                key={cert}
                className="px-6 py-3"
                style={{
                  border: "1px solid rgba(200,169,107,0.3)",
                  fontFamily: "var(--font-display)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-gray)",
                }}
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
