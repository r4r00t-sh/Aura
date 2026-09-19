import { AURA_SERVICES } from "../data/services";
import { CERT_BADGES } from "../data/brand";

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
      desc: "Operational excellence grounded in decades of commercial aviation and market experience — ready when you need to move.",
    },
  ];

  const leadership = [
    {
      title: "Founder",
      eyebrow: "Commercial vision",
      bio: "A visionary leader with over three decades of extensive experience in the global travel and tourism industry. Having spent more than 30 years navigating complex commercial operations across Asia, the Middle East, and Africa, the founder brought strategic expertise, market insight, and operational excellence to establish this premium charter service.",
    },
    {
      title: "Captain",
      eyebrow: "Aviation leadership",
      bio: "Our company is managed by a highly experienced captain with an impressive aviation background — decades of professional flying with one of the world's leading international airlines. This expert leadership ensures every charter operation upholds the highest standards of safety, professionalism, and service excellence.",
    },
  ];

  const story = [
    "Aura Air Charter was founded by a visionary leader with over three decades of extensive experience in the global travel and tourism industry. Having spent more than 30 years navigating complex commercial operations across multiple international markets—including Asia, the Middle East, and Africa—the founder brought a wealth of strategic expertise, market insights, and operational excellence to establish this premium charter service.",
    "Our company is managed by a highly experienced captain with an impressive aviation background, having accumulated decades of professional flying experience with one of the world's leading international airlines. This expert leadership ensures that every charter operation upholds the highest standards of safety, professionalism, and service excellence.",
    "The synergy between our founder's deep commercial acumen and our captain's exceptional aviation expertise creates a unique foundation for Aura Air Charter. We combine industry-leading business practices with world-class flight operations to deliver bespoke charter solutions tailored to our clients' most exacting requirements.",
    "At Aura Air Charter, we are committed to redefining the charter experience through a blend of operational excellence, strategic insight, and unwavering dedication to client satisfaction. Our leadership's combined experience spanning both commercial aviation and global market dynamics positions us to exceed expectations on every flight.",
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
              About<br />
              Aura Air<br />
              <span style={{ color: "var(--color-blue)" }}>Charter.</span>
            </h1>
          </div>
          <div>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
            >
              Premium charter rooted in three decades of global travel experience and
              world-class flight operations — arranged with precision from Dubai.
            </p>
          </div>
        </div>
      </div>

      {/* Our story */}
      <div className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-6 flex items-center gap-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            <span className="block w-6 h-px" style={{ background: "var(--color-gold)" }} />
            Our story
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold uppercase mb-10 max-w-3xl"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
          >
            Commercial insight.<br />
            <span style={{ color: "var(--color-blue)" }}>Aviation excellence.</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {story.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-base leading-relaxed"
                style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-24" style={{ background: "var(--color-midnight)" }}>
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
                  background: "var(--color-offwhite)",
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
          alt="Private jet cabin"
          className="w-full h-full object-cover"
          loading="lazy"
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
              maxWidth: "720px",
            }}
          >
            "We combine industry-leading business practices with world-class flight operations."
          </blockquote>
        </div>
      </div>

      {/* Leadership */}
      <div className="py-24" style={{ background: "var(--color-offwhite)" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            <span className="block w-6 h-px" style={{ background: "var(--color-gold)" }} />
            Leadership
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold uppercase mb-12 max-w-2xl"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
          >
            The foundation of<br />
            <span style={{ color: "var(--color-blue)" }}>Aura Air Charter</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadership.map((member) => (
              <div
                key={member.title}
                className="p-8 md:p-10"
                style={{
                  background: "var(--color-white)",
                  border: "1px solid rgba(200,169,107,0.25)",
                }}
              >
                <div
                  className="text-[10px] tracking-[0.25em] uppercase mb-3"
                  style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
                >
                  {member.eyebrow}
                </div>
                <h3
                  className="text-2xl font-bold uppercase mb-5"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "0.06em" }}
                >
                  {member.title}
                </h3>
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

      {/* Services */}
      <div className="py-24" style={{ background: "var(--color-midnight)" }}>
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
            Bespoke charter<br />
            <span style={{ color: "var(--color-blue)" }}>solutions</span>
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
