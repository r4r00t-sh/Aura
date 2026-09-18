import { useState, useEffect, type CSSProperties } from "react";
import { LOGO_ALT, LOGO_SRC } from "../data/brand";
import type { NavigateFn } from "../lib/nav";

interface NavProps {
  currentPage: string;
  onNavigate: NavigateFn;
}

const NAV_LINKS = [
  { id: "charter", label: "Charter" },
  { id: "fleet", label: "Fleet" },
  { id: "aircraft-for-sale", label: "For Sale" },
  { id: "destinations", label: "Destinations" },
  { id: "empty-legs", label: "Empty Legs" },
  { id: "safety", label: "Safety" },
  { id: "faq", label: "FAQ" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export default function Navigation({ currentPage, onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  const elevated = scrolled || menuOpen || currentPage !== "home";
  const linkIdle = elevated ? "rgba(247,248,250,0.72)" : "rgba(247,248,250,0.85)";
  const linkActive = "var(--color-champagne)";
  const ctaStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "10px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--color-royal)",
    background: "var(--color-gold)",
    border: "none",
    cursor: "pointer",
    padding: "10px 18px",
    fontWeight: 600,
    borderRadius: "999px",
    transition: "background 0.3s ease, color 0.3s ease",
  };

  return (
    <div
      className="fixed z-50 left-0 right-0 pointer-events-none"
      style={{ top: "0.85rem", paddingLeft: "0.85rem", paddingRight: "0.85rem" }}
    >
      <nav
        className="pointer-events-auto mx-auto max-w-screen-xl transition-all duration-500 overflow-hidden"
        style={{
          borderRadius: "1.25rem",
          background: elevated
            ? "rgba(1, 31, 112, 0.92)"
            : "rgba(1, 15, 61, 0.28)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: elevated
            ? "1px solid rgba(214,185,108,0.28)"
            : "1px solid rgba(255,255,255,0.14)",
          boxShadow: elevated
            ? "0 12px 40px rgba(1,15,61,0.35)"
            : "0 8px 28px rgba(1,15,61,0.18)",
        }}
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-4 px-4 md:px-5 h-[3.75rem] md:h-[4.25rem]">
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 group shrink-0"
            aria-label="Aura Air Charters — Home"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <img
              src={LOGO_SRC}
              alt={LOGO_ALT}
              className="h-9 md:h-10 w-auto object-contain"
              style={{
                borderRadius: "0.65rem",
                boxShadow: "0 4px 14px rgba(0,0,0,0.22)",
              }}
            />
          </button>

          <div className="hidden lg:flex items-center gap-5 xl:gap-6 min-w-0">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.id)}
                className="underline-hover"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: currentPage === link.id ? linkActive : linkIdle,
                  fontWeight: currentPage === link.id ? 600 : 400,
                  transition: "color 0.3s ease",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center shrink-0">
            <button
              type="button"
              onClick={() => handleNav("charter")}
              style={ctaStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-champagne)";
                e.currentTarget.style.color = "var(--color-royal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-gold)";
                e.currentTarget.style.color = "var(--color-royal)";
              }}
            >
              Request Charter
            </button>
          </div>

          <button
            type="button"
            className="lg:hidden flex flex-col gap-1.5 p-2 shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{
                background: "var(--color-white)",
                transform: menuOpen ? "rotate(45deg) translate(3.5px, 3.5px)" : "none",
              }}
            />
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{
                background: "var(--color-white)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{
                background: "var(--color-white)",
                transform: menuOpen ? "rotate(-45deg) translate(3.5px, -3.5px)" : "none",
              }}
            />
          </button>
        </div>

        <div
          className="lg:hidden transition-all duration-500 overflow-hidden"
          style={{
            maxHeight: menuOpen ? "480px" : "0",
            borderTop: menuOpen ? "1px solid rgba(214,185,108,0.2)" : "none",
          }}
        >
          <div className="px-5 py-5 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.id)}
                className="text-left"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color:
                    currentPage === link.id
                      ? "var(--color-champagne)"
                      : "rgba(247,248,250,0.75)",
                  fontWeight: currentPage === link.id ? 600 : 400,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNav("charter")}
              style={{ ...ctaStyle, padding: "12px 20px", marginTop: "4px", width: "100%" }}
            >
              Request Charter
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
