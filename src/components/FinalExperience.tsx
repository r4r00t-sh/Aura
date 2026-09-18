import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LOGO_ALT,
  LOGO_SRC,
  CHARTER_EMAIL,
  CHARTER_PHONE,
  CHARTER_PHONE_TEL,
} from "../data/brand";
import type { NavigateFn } from "../lib/nav";
import LegalModal from "./LegalModal";

gsap.registerPlugin(ScrollTrigger);

interface FinalExperienceProps {
  onNavigate: NavigateFn;
  /** Pull footer up into the last section (Home blend only). */
  softOverlap?: boolean;
}

const NAV_LINKS = [
  { label: "About", page: "about" },
  { label: "Fleet", page: "fleet" },
  { label: "For Sale", page: "aircraft-for-sale" },
  { label: "Destinations", page: "destinations" },
  { label: "Empty Legs", page: "empty-legs" },
  { label: "Safety", page: "safety" },
  { label: "FAQ", page: "faq" },
  { label: "Contact", page: "contact" },
] as const;

/** Rise distance kept inside the stage so letters never leave the footer. */
function brandStartY(stage: HTMLElement | null) {
  const stageH = stage?.offsetHeight ?? 220;
  return Math.round(stageH * 0.3);
}

export default function FinalExperience({
  onNavigate,
  softOverlap = false,
}: FinalExperienceProps) {
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(brandRef.current, { y: 0, opacity: 0.78 });
      gsap.set(
        [ctaRef.current, contactRef.current, navRef.current, dividerRef.current, bottomRef.current],
        { clearProps: "all", opacity: 1, y: 0, scaleX: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(brandRef.current, {
        y: () => brandStartY(stageRef.current),
        opacity: 0.28,
      });
      gsap.set([ctaRef.current, contactRef.current], { opacity: 0, y: 36 });
      gsap.set(navRef.current, { opacity: 0, y: 20 });
      gsap.set(dividerRef.current, { scaleX: 0 });
      gsap.set(bottomRef.current, { opacity: 0 });

      gsap.to(brandRef.current, {
        y: 0,
        opacity: 0.78,
        ease: "none",
        scrollTrigger: {
          // Wait until the footer is well into view — not as soon as it peeks in
          trigger: section,
          start: "top 42%",
          end: "top 8%",
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      });

      const revealTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 38%",
          toggleActions: "play none none reverse",
        },
      });

      revealTl
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.85 }, 0.12)
        .to(contactRef.current, { opacity: 1, y: 0, duration: 0.85 }, 0.2)
        .to(navRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.35)
        .to(
          dividerRef.current,
          { scaleX: 1, duration: 0.75, transformOrigin: "left center" },
          0.45
        )
        .to(bottomRef.current, { opacity: 1, duration: 0.5 }, 0.55);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
  };

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-x-clip overflow-y-hidden"
      style={{
        background: `
          linear-gradient(
            180deg,
            var(--color-offwhite) 0%,
            rgba(247, 248, 250, 0.92) 8%,
            rgba(2, 172, 186, 0.12) 22%,
            rgba(1, 40, 153, 0.28) 42%,
            rgba(1, 31, 112, 0.82) 62%,
            var(--color-deep) 78%,
            var(--color-premium) 100%
          )
        `,
        marginTop: softOverlap ? "clamp(-3rem, -5vw, -2rem)" : 0,
        borderTop: softOverlap ? "none" : "1px solid rgba(1, 40, 153, 0.08)",
        paddingTop: softOverlap
          ? "clamp(7rem, 14vw, 10rem)"
          : "clamp(3.5rem, 7vw, 5.5rem)",
      }}
      aria-label="Aura final experience"
    >
      <div
        className="absolute left-0 right-0 top-0 pointer-events-none z-[1]"
        style={{
          height: "clamp(10rem, 28vw, 18rem)",
          background:
            "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(247,248,250,0.55) 0%, rgba(2,172,186,0.14) 35%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[3]">
        {/* Hero-scale AURA — big & wide, clipped, GSAP scrub + Lenis */}
        <div
          ref={stageRef}
          className="relative mx-auto mb-12 md:mb-16"
          style={{
            width: "min(99vw, 100rem)",
            ["--aura-size" as string]: "clamp(7.75rem, 22vw, 18rem)",
            height: "calc(var(--aura-size) * 1.55)",
          }}
          aria-hidden="true"
        >
          <div
            ref={brandRef}
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            style={{ zIndex: 2 }}
          >
            <span
              className="uppercase select-none pointer-events-none whitespace-nowrap"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--aura-size)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "0.32em",
                color: "#011B62",
                display: "inline-block",
                paddingLeft: "0.32em",
                transform: "scaleX(1.28)",
                transformOrigin: "center center",
              }}
            >
              AURA
            </span>
          </div>

          {/* Back clouds */}
          <div className="aura-clouds aura-clouds--back" aria-hidden="true">
            <span className="css-cloud css-cloud--xl css-cloud--back-1" />
            <span className="css-cloud css-cloud--lg css-cloud--back-2" />
            <span className="css-cloud css-cloud--md css-cloud--back-3" />
            <span className="css-cloud css-cloud--sm css-cloud--back-4" />
            <span className="css-cloud css-cloud--lg css-cloud--back-5" />
            <span className="css-cloud css-cloud--md css-cloud--back-6" />
          </div>

          {/* Front clouds */}
          <div className="aura-clouds aura-clouds--front" aria-hidden="true">
            <span className="css-cloud css-cloud--lg css-cloud--front-1" />
            <span className="css-cloud css-cloud--md css-cloud--front-2" />
            <span className="css-cloud css-cloud--sm css-cloud--front-3" />
            <span className="css-cloud css-cloud--xs css-cloud--front-4" />
            <span className="css-cloud css-cloud--md css-cloud--front-5" />
            <span className="css-cloud css-cloud--sm css-cloud--front-6" />
            <span className="css-cloud css-cloud--xs css-cloud--front-7" />
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 md:px-10 pb-10 md:pb-14 relative z-[4]">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_auto_1fr] gap-10 md:gap-8 items-end mb-16 md:mb-20">
          <div ref={ctaRef} className="text-center md:text-left">
            <div
              className="text-[10px] tracking-[0.4em] uppercase mb-4"
              style={{
                color: "var(--color-gold)",
                fontFamily: "var(--font-display)",
              }}
            >
              Private Aviation
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-[0.95] mb-7"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-white)",
                letterSpacing: "0.04em",
              }}
            >
              Without
              <br />
              Limits.
            </h2>
            <button
              type="button"
              onClick={() => handleNav("charter")}
              className="inline-flex items-center gap-3"
              style={{
                background: "var(--color-royal)",
                color: "var(--color-white)",
                fontFamily: "var(--font-display)",
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                border: "none",
                borderRadius: "9999px",
                padding: "14px 18px 14px 26px",
                cursor: "pointer",
                transition: "transform 0.35s ease, background 0.35s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "var(--color-aqua)";
                e.currentTarget.style.color = "var(--color-white)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "var(--color-royal)";
                e.currentTarget.style.color = "var(--color-white)";
              }}
            >
              Request a Charter
              <span
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  background: "var(--color-aqua)",
                  color: "var(--color-white)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h12M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          <div className="hidden md:block" aria-hidden="true" />

          <div ref={contactRef} className="text-center md:text-right">
            <img
              src={LOGO_SRC}
              alt={LOGO_ALT}
              className="h-16 w-auto object-contain mx-auto md:ml-auto md:mr-0 mb-5"
              style={{ borderRadius: "12px" }}
            />
            <div
              className="text-[10px] tracking-[0.35em] uppercase mb-4"
              style={{
                color: "rgba(247,248,250,0.55)",
                fontFamily: "var(--font-display)",
              }}
            >
              Charter Inquiries
            </div>
            <a
              href={`mailto:${CHARTER_EMAIL}`}
              className="block text-sm sm:text-base mb-2"
              style={{
                color: "var(--color-white)",
                fontFamily: "var(--font-body)",
                textDecoration: "none",
              }}
            >
              {CHARTER_EMAIL}
            </a>
            <a
              href={`tel:${CHARTER_PHONE_TEL}`}
              className="block text-sm sm:text-base mb-6"
              style={{
                color: "rgba(247,248,250,0.85)",
                fontFamily: "var(--font-body)",
                textDecoration: "none",
              }}
            >
              {CHARTER_PHONE}
            </a>
            <div
              className="text-[10px] tracking-[0.35em] uppercase leading-relaxed"
              style={{
                color: "rgba(247,248,250,0.55)",
                fontFamily: "var(--font-display)",
              }}
            >
              Dubai
              <br />
              UAE
            </div>
          </div>
        </div>

        <nav
          ref={navRef}
          className="flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-4 mb-10 md:mb-12"
          aria-label="Footer"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => handleNav(link.page)}
              className="final-nav-link"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(247,248,250,0.7)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="mb-6 md:mb-7 overflow-hidden" aria-hidden="true">
          <div
            ref={dividerRef}
            style={{
              height: 1,
              background: "rgba(2,172,186,0.45)",
              transformOrigin: "left center",
            }}
          />
        </div>

        <div
          ref={bottomRef}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2"
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
            <img
              src={LOGO_SRC}
              alt=""
              className="h-8 w-auto object-contain"
              style={{ borderRadius: "6px", opacity: 0.92 }}
              aria-hidden="true"
            />
            <span
              className="text-[9px] tracking-[0.28em] uppercase"
              style={{
                color: "rgba(247,248,250,0.5)",
                fontFamily: "var(--font-display)",
              }}
            >
              © 2026 Aura Air Charters
            </span>
            <button
              type="button"
              className="final-nav-link text-[9px] tracking-[0.28em] uppercase"
              onClick={() => setLegal("privacy")}
              style={{
                color: "rgba(247,248,250,0.5)",
                fontFamily: "var(--font-display)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="final-nav-link text-[9px] tracking-[0.28em] uppercase"
              onClick={() => setLegal("terms")}
              style={{
                color: "rgba(247,248,250,0.5)",
                fontFamily: "var(--font-display)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Terms & Conditions
            </button>
          </div>
          <div
            className="text-[9px] tracking-[0.28em] uppercase text-center sm:text-right"
            style={{
              color: "rgba(247,248,250,0.45)",
              fontFamily: "var(--font-display)",
            }}
          >
            Designed / Developed by Aura Studio
          </div>
        </div>
        </div>
      </div>

      <style>{`
        .final-nav-link {
          position: relative;
          transition: color 0.35s ease, opacity 0.35s ease, transform 0.35s ease;
        }
        .final-nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: var(--color-aqua);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.35s ease;
        }
        .final-nav-link:hover {
          color: var(--color-aqua) !important;
          transform: translateX(2px);
        }
        .final-nav-link:hover::after {
          transform: scaleX(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .final-nav-link,
          .final-nav-link::after {
            transition: none !important;
          }
        }
      `}</style>

      <LegalModal
        open={legal === "privacy"}
        title="Privacy Policy"
        onClose={() => setLegal(null)}
      >
        <p>
          Aura Air Charters collects only the information you provide through charter requests
          and contact forms — typically your name, email, phone, and travel details — to respond
          to your enquiry and arrange services.
        </p>
        <p>
          We do not sell personal data. Information is shared only with approved operators and
          partners as needed to fulfil your request. You may ask us to update or remove your
          details by emailing charter@aura-aviation.ae.
        </p>
        <p>
          This site stores recent enquiry copies in your browser session for continuity; clearing
          site data removes them.
        </p>
      </LegalModal>

      <LegalModal
        open={legal === "terms"}
        title="Terms & Conditions"
        onClose={() => setLegal(null)}
      >
        <p>
          Quotes and availability are subject to change until confirmed in writing. Aircraft are
          arranged through approved operators; Aura acts as your charter broker and coordinator
          unless otherwise agreed.
        </p>
        <p>
          Passengers are responsible for valid travel documents, visas, and compliance with
          destination regulations. Cancellation and payment terms are set out in each individual
          charter agreement.
        </p>
        <p>
          Submitting a request does not create a binding contract until both parties confirm
          aircraft, schedule, and commercial terms.
        </p>
      </LegalModal>
    </footer>
  );
}
