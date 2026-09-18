import { useState, useEffect, useRef, useMemo } from "react";
import worldMapSvgRaw from "../assets/world-map.svg?raw";
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  destinations,
  getWorldMapInnerMarkup,
  getMapTransform,
} from "../utils/worldMap";
import ServicesScroll from "../components/ServicesScroll";
import TrustBar from "../components/TrustBar";
import HowItWorks from "../components/HowItWorks";
import SafetyStrip from "../components/SafetyStrip";
import SamplePricing from "../components/SamplePricing";
import Testimonials from "../components/Testimonials";
import FaqTeaser from "../components/FaqAccordion";
import { FLEET } from "../data/fleet";
import { EMPTY_LEGS } from "../data/emptyLegs";
import { LOGO_ALT } from "../data/brand";
import { buildEstimate, type EstimateResult } from "../lib/estimate";
import type { NavigateFn } from "../lib/nav";

interface HomeProps {
  onNavigate: NavigateFn;
}

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const aircraft = FLEET.slice(0, 3).map((a) => ({
  name: a.name,
  slug: a.slug,
  category: a.category,
  range: a.range,
  passengers: String(a.passengers),
  speed: a.speed,
  image: a.image,
  tag: a.tag,
}));

export default function Home({ onNavigate }: HomeProps) {
  const [tripType, setTripType] = useState("One Way");
  const [from, setFrom] = useState("Dubai (DXB)");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredDest, setHoveredDest] = useState<string | null>(null);
  const [mapScale, setMapScale] = useState(1);
  const [mapPan, setMapPan] = useState({ x: 0, y: 0 });
  const [isMapDragging, setIsMapDragging] = useState(false);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [estimateError, setEstimateError] = useState("");
  const mapViewportRef = useRef<HTMLDivElement>(null);
  const mapSvgRef = useRef<SVGSVGElement>(null);
  const mapDragStateRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
  });

  const fleetRef = useInView(0.1);
  const destRef = useInView(0.1);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getMapUnitScale = () => {
    const svg = mapSvgRef.current;
    if (!svg) return 1;
    const rect = svg.getBoundingClientRect();
    return Math.min(rect.width / MAP_WIDTH, rect.height / MAP_HEIGHT);
  };

  const clampMapPan = (x: number, y: number, scale: number) => {
    if (scale <= 1) return { x: 0, y: 0 };
    const maxX = ((scale - 1) * MAP_WIDTH) / 2;
    const maxY = ((scale - 1) * MAP_HEIGHT) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const onMapWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const svg = mapSvgRef.current;
    if (!svg) return;

    const zoomStep = e.deltaY < 0 ? 1.12 : 0.89;
    const unitScale = getMapUnitScale();
    const rect = svg.getBoundingClientRect();
    const focalX = ((e.clientX - rect.left) / unitScale - MAP_WIDTH / 2 - mapPan.x) / mapScale + MAP_WIDTH / 2;
    const focalY = ((e.clientY - rect.top) / unitScale - MAP_HEIGHT / 2 - mapPan.y) / mapScale + MAP_HEIGHT / 2;

    setMapScale((prevScale) => {
      const nextScale = Math.max(1, Math.min(4, prevScale * zoomStep));
      if (nextScale === prevScale) return prevScale;

      setMapPan((prevPan) => {
        const nextPanX = focalX - (focalX - MAP_WIDTH / 2 - prevPan.x) * (nextScale / prevScale) - MAP_WIDTH / 2;
        const nextPanY = focalY - (focalY - MAP_HEIGHT / 2 - prevPan.y) * (nextScale / prevScale) - MAP_HEIGHT / 2;
        return clampMapPan(nextPanX, nextPanY, nextScale);
      });

      return nextScale;
    });
  };

  const onMapMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (mapScale <= 1) return;
    e.preventDefault();
    mapDragStateRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPanX: mapPan.x,
      startPanY: mapPan.y,
    };
    setIsMapDragging(true);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!mapDragStateRef.current.dragging) return;
      const unitScale = getMapUnitScale();
      const deltaX = (e.clientX - mapDragStateRef.current.startX) / unitScale / mapScale;
      const deltaY = (e.clientY - mapDragStateRef.current.startY) / unitScale / mapScale;
      const nextPan = clampMapPan(
        mapDragStateRef.current.startPanX + deltaX,
        mapDragStateRef.current.startPanY + deltaY,
        mapScale
      );
      setMapPan(nextPan);
    };

    const onMouseUp = () => {
      if (!mapDragStateRef.current.dragging) return;
      mapDragStateRef.current.dragging = false;
      setIsMapDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [mapScale]);

  const resetMapView = () => {
    mapDragStateRef.current.dragging = false;
    setIsMapDragging(false);
    setMapScale(1);
    setMapPan({ x: 0, y: 0 });
  };

  const worldMapInner = useMemo(
    () => getWorldMapInnerMarkup(worldMapSvgRaw),
    []
  );

  const handleSearch = () => {
    setEstimateError("");
    if (!to.trim()) {
      setEstimateError("Add a destination to see an indicative estimate.");
      setEstimate(null);
      return;
    }
    const result = buildEstimate({ from, to, passengers, tripType });
    setEstimate(result);
  };

  const confirmEstimate = () => {
    onNavigate("charter", {
      tripType,
      from,
      to: to || undefined,
      date: date || undefined,
      passengers,
    });
  };

  return (
    <div style={{ background: "var(--color-navy)" }}>
      {/* HERO — slim */}
      <section className="relative min-h-[78vh] md:min-h-[82vh] flex flex-col justify-start overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/stock/jet-exterior-1.jpg"
            alt="Private jet on the tarmac"
            className="w-full h-full object-cover transition-transform duration-[8000ms]"
            style={{ transform: heroLoaded ? "scale(1.04)" : "scale(1)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(7,20,38,0.92) 0%, rgba(7,20,38,0.5) 42%, rgba(7,20,38,0.25) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-28 md:pb-36 w-full">
          <div
            className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-12 items-center transition-all duration-1000"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="max-w-2xl">
              <div
                className="text-xs tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
                style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
              >
                <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
                Dubai charter broker
              </div>
              <h1
                className="text-5xl md:text-7xl font-bold uppercase mb-5 leading-[0.95]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.04em",
                  color: "var(--color-white)",
                }}
              >
                Aura Air
                <br />
                <span style={{ color: "var(--color-aqua)" }}>Charters</span>
              </h1>
              <p
                className="text-base md:text-lg max-w-lg mb-9 leading-relaxed"
                style={{ color: "rgba(247,248,250,0.78)", fontFamily: "var(--font-body)" }}
              >
                Aura arranges private and chartered aircraft for passenger and cargo —
                through approved operators, from Dubai to anywhere.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("charter")}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "var(--color-white)",
                  background: "var(--color-royal)",
                  border: "none",
                  cursor: "pointer",
                  padding: "16px 32px",
                }}
              >
                Request a charter
              </button>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                src="/images/logo_1.png"
                alt={LOGO_ALT}
                className="w-[min(100%,16rem)] md:w-[min(100%,20rem)] lg:w-[min(100%,24rem)] h-auto object-contain"
                style={{ background: "transparent" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Plan a flight — straddles hero edge, floating card */}
      <div
        className="relative z-20 max-w-screen-xl mx-auto px-6 md:px-10"
        style={{
          marginTop: "-5.5rem",
          marginBottom: "1.5rem",
        }}
      >
          <div
            className="glass p-6 md:p-8"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.55)",
              boxShadow:
                "0 4px 12px rgba(7,20,38,0.06), 0 18px 48px rgba(7,20,38,0.14)",
              transition: "all 0.8s ease",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "0.3s",
            }}
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div
                className="text-[10px] tracking-[0.28em] uppercase leading-none"
                style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
              >
                Plan a flight
              </div>
              <div className="flex items-center gap-5">
                {["One Way", "Round Trip", "Multi-Leg"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTripType(t)}
                    className="leading-none"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: tripType === t ? "var(--color-blue)" : "var(--color-gray)",
                      background: "none",
                      border: "none",
                      borderBottom:
                        tripType === t ? "1px solid var(--color-blue)" : "1px solid transparent",
                      padding: "0 0 4px",
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-0 md:divide-x items-stretch"
              style={{ borderColor: "rgba(1,40,153,0.12)" }}
            >
              {[
                { label: "From", value: from, setter: setFrom, placeholder: "Dubai (DXB)" },
                { label: "To", value: to, setter: setTo, placeholder: "Destination" },
                { label: "Departure", value: date, setter: setDate, placeholder: "dd/mm/yyyy", type: "date" },
                { label: "Passengers", value: passengers, setter: setPassengers, placeholder: "2", type: "number" },
              ].map((field, i) => (
                <div
                  key={field.label}
                  className={`flex flex-col h-full ${
                    i === 0 ? "md:pr-5" : "md:px-5"
                  }`}
                >
                  <label
                    className="block text-[10px] tracking-[0.2em] uppercase mb-2 leading-none"
                    style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent text-sm outline-none leading-none"
                    style={{
                      color: "var(--color-ink)",
                      fontFamily: "var(--font-body)",
                      border: "none",
                      borderBottom: "1px solid rgba(1,40,153,0.18)",
                      padding: "0 0 10px",
                      height: "32px",
                      colorScheme: "light",
                    }}
                  />
                </div>
              ))}
              <div className="col-span-2 md:col-span-1 flex md:pl-5">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="w-full self-end"
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
                    padding: "0 24px",
                    height: "44px",
                    borderRadius: "8px",
                    lineHeight: 1,
                  }}
                >
                  Get estimate
                </button>
              </div>
            </div>
            {tripType === "Multi-Leg" && (
              <p
                className="text-xs mt-4"
                style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
              >
                Multi-leg itineraries are refined on the charter form — add extra stops after estimating the primary sector.
              </p>
            )}
            {estimateError && (
              <p
                className="text-xs mt-4"
                style={{ color: "#b45309", fontFamily: "var(--font-body)" }}
              >
                {estimateError}
              </p>
            )}
            {estimate && (
              <div
                className="mt-6 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                style={{
                  background: "rgba(1,40,153,0.04)",
                  border: "1px solid rgba(1,40,153,0.12)",
                  borderRadius: "12px",
                }}
              >
                <div>
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase mb-2"
                    style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
                  >
                    Indicative estimate
                  </div>
                  <p
                    className="text-sm font-bold uppercase mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                  >
                    {estimate.fromLabel} → {estimate.toLabel}
                    {estimate.duration ? ` · ${estimate.duration}` : ""}
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-royal)" }}
                  >
                    {estimate.band}
                  </p>
                  <p
                    className="text-xs mt-2"
                    style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                  >
                    {estimate.category} · {estimate.aircraftHint}. {estimate.note}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={confirmEstimate}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "var(--color-white)",
                    background: "var(--color-deep)",
                    border: "none",
                    cursor: "pointer",
                    padding: "14px 24px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Confirm with desk →
                </button>
              </div>
            )}
          </div>
      </div>

      <TrustBar />

      <HowItWorks onNavigate={onNavigate} />

      {/* EDITORIAL MARQUEE */}
      <div
        className="overflow-hidden py-4 border-b"
        style={{ borderColor: "rgba(200,169,107,0.15)" }}
      >
        <div
          className="flex gap-16 animate-marquee whitespace-nowrap"
          style={{
            animation: "marquee 25s linear infinite",
          }}
        >
          {Array.from({ length: 3 }, (_, i) =>
            ["Dubai · London", "Dubai · Paris", "Dubai · New York", "Dubai · Singapore", "Dubai · Geneva", "Dubai · Maldives", "Dubai · Mumbai", "Dubai · Tokyo"].map((r) => (
              <span
                key={`${r}-${i}`}
                className="text-xs tracking-[0.35em] uppercase"
                style={{ color: "rgba(122,116,108,0.45)", fontFamily: "var(--font-display)" }}
              >
                {r}
                <span className="mx-8" style={{ color: "var(--color-aqua)" }}>·</span>
              </span>
            ))
          )}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `}</style>
      </div>

      {/* FLEET PREVIEW */}
      <section ref={fleetRef.ref} className="py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div
                className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
                style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
              >
                <span className="block w-6 h-px" style={{ background: "var(--color-gold)" }} />
                Our Aircraft
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold uppercase leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                World-Class<br />
                <span style={{ color: "var(--color-aqua)" }}>Fleet</span>
              </h2>
            </div>
            <button
              onClick={() => { onNavigate("fleet"); }}
              className="underline-hover self-start md:self-auto"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-gray)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              View Full Fleet →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aircraft.map((ac, i) => (
              <div
                key={ac.name}
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  background: "var(--color-midnight)",
                  border: "1px solid rgba(200,169,107,0.25)",
                  transition: "transform 0.4s ease, border-color 0.4s ease",
                  transform: hoveredCard === i ? "translateY(-4px)" : "translateY(0)",
                  borderColor: hoveredCard === i ? "rgba(200,169,107,0.45)" : "rgba(200,169,107,0.25)",
                  opacity: fleetRef.inView ? 1 : 0,
                  transitionDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => { onNavigate("fleet/" + ac.slug); }}
              >
                <div
                  className="absolute top-4 left-4 z-10 text-xs tracking-[0.2em] uppercase px-3 py-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: ac.tag === "Flagship" ? "var(--color-gold)" : ac.tag === "Most Popular" ? "var(--color-aqua)" : "rgba(250,248,244,0.95)",
                    color: ac.tag === "Available" ? "var(--color-gray)" : "var(--color-ink)",
                  }}
                >
                  {ac.tag}
                </div>

                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-900">
                  <img
                    src={ac.image}
                    alt={ac.name}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{ transform: hoveredCard === i ? "scale(1.08)" : "scale(1)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(26,21,16,0.85) 0%, transparent 60%)" }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div
                    className="text-xs tracking-[0.25em] uppercase mb-2"
                    style={{ color: "var(--color-blue)", fontFamily: "var(--font-display)" }}
                  >
                    {ac.category}
                  </div>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                  >
                    {ac.name}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Range", value: ac.range },
                      { label: "Seats", value: ac.passengers },
                      { label: "Speed", value: ac.speed },
                    ].map((spec) => (
                      <div key={spec.label}>
                        <div
                          className="text-xs tracking-[0.15em] uppercase mb-1"
                          style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
                        >
                          {spec.label}
                        </div>
                        <div
                          className="text-sm font-medium"
                          style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)" }}
                        >
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-5 pt-5 flex items-center justify-between"
                    style={{ borderTop: "1px solid rgba(200,169,107,0.25)" }}
                  >
                    <span
                      className="text-xs tracking-[0.2em] uppercase"
                      style={{
                        color: hoveredCard === i ? "var(--color-aqua)" : "var(--color-gray)",
                        fontFamily: "var(--font-display)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      Charter Now →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section
        ref={destRef.ref}
        className="py-24 md:py-32"
        style={{ background: "var(--color-midnight)" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div
                className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
                style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
              >
                <span className="block w-6 h-px" style={{ background: "var(--color-gold)" }} />
                Global Reach
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold uppercase leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Fly Anywhere.<br />
                <span style={{ color: "var(--color-aqua)" }}>On Your Terms.</span>
              </h2>
            </div>
            <button
              onClick={() => { onNavigate("destinations"); }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-gray)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              All Destinations →
            </button>
          </div>

          {/* Map */}
          <div
            className="relative rounded-none overflow-hidden"
            ref={mapViewportRef}
            onWheel={onMapWheel}
            onMouseDown={onMapMouseDown}
            onDoubleClick={resetMapView}
            style={{
              background: "#F7F3EB",
              border: "1px solid rgba(200,169,107,0.25)",
              height: "420px",
              cursor: mapScale > 1 ? (isMapDragging ? "grabbing" : "grab") : "zoom-in",
              userSelect: "none",
            }}
          >
            <svg
              ref={mapSvgRef}
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              className="aura-world-map absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="mapOverlay" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="rgba(250,248,244,0.35)" />
                  <stop offset="35%" stopColor="rgba(250,248,244,0.05)" />
                  <stop offset="100%" stopColor="rgba(243,238,228,0.4)" />
                </linearGradient>
              </defs>
              <g transform={getMapTransform(mapScale, mapPan.x, mapPan.y)}>
              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#F7F3EB" />
              <g dangerouslySetInnerHTML={{ __html: worldMapInner }} />
              <rect
                width={MAP_WIDTH}
                height={MAP_HEIGHT}
                fill="url(#mapOverlay)"
                pointerEvents="none"
              />

              {destinations.map((dest) => {
                const active = hoveredDest === dest.city || dest.isHub;
                const pinFill = dest.isHub
                  ? "var(--color-aqua)"
                  : active
                    ? "var(--color-royal)"
                    : "var(--color-royal)";
                const scale = dest.isHub ? 1.15 : active ? 1.1 : 1;
                return (
                  <g
                    key={dest.city}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredDest(dest.city)}
                    onMouseLeave={() => setHoveredDest(null)}
                    onClick={() => onNavigate("destinations")}
                    transform={`translate(${dest.x} ${dest.y}) scale(${scale})`}
                  >
                    {/* Location pin */}
                    <g transform="translate(-8, -22)">
                      <path
                        d="M8 0C3.58 0 0 3.58 0 8c0 5.25 8 14 8 14s8-8.75 8-14c0-4.42-3.58-8-8-8z"
                        fill={pinFill}
                        style={{ transition: "fill 0.25s ease" }}
                      />
                      <circle cx={8} cy={8} r={3.2} fill="#FFFFFF" />
                    </g>
                    <text
                      x={0}
                      y={8}
                      textAnchor="middle"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: dest.isHub ? 9 : 7.5,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        fill: dest.isHub
                          ? "var(--color-aqua)"
                          : active
                            ? "var(--color-royal)"
                            : "var(--color-ink)",
                        transition: "fill 0.25s ease",
                      }}
                    >
                      {dest.city.toUpperCase()}
                    </text>
                  </g>
                );
              })}
              </g>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-6 left-6">
              <div
                className="text-xs tracking-[0.3em] uppercase flex items-center gap-4"
                style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ background: "var(--color-aqua)" }}
                  />
                  Dubai hub
                </span>
                <span className="inline-flex items-center gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ background: "var(--color-royal)" }}
                  />
                  Key locations
                </span>
              </div>
            </div>
          </div>

          {/* Popular routes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
            {destinations.filter(d => !d.isHub).slice(0, 6).map((dest) => (
              <button
                key={dest.city}
                onClick={() => { onNavigate("destinations"); }}
                className="text-left p-4"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  border: "1px solid rgba(200,169,107,0.25)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,169,107,0.55)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,169,107,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,169,107,0.25)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.9)";
                }}
              >
                <div
                  className="text-xs tracking-[0.2em] uppercase mb-1"
                  style={{ color: "var(--color-blue)", fontFamily: "var(--font-display)" }}
                >
                  DXB → {dest.code}
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                >
                  {dest.city}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                >
                  {dest.time}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL QUOTE */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/images/stock/jet-cabin-1.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(26,21,16,0.78)" }}
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 text-center">
          <div
            className="text-xs tracking-[0.5em] uppercase mb-8"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            The Aura Standard
          </div>
          <blockquote
            className="text-3xl md:text-5xl lg:text-6xl leading-tight max-w-4xl mx-auto mb-8"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              color: "var(--color-white)",
            }}
          >
            "Every detail considered.<br />Every journey, flawless."
          </blockquote>
          <p
            className="text-sm tracking-[0.2em] uppercase"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
          >
            — A. Al Rashid, Chief Executive Officer
          </p>
        </div>
      </section>

      <SamplePricing onNavigate={onNavigate} />

      <Testimonials />

      <SafetyStrip onNavigate={onNavigate} />

      <ServicesScroll onNavigate={onNavigate} />

      <FaqTeaser onNavigate={onNavigate} />

      {/* EMPTY LEGS TEASER */}
      <section
        className="py-20"
        style={{ background: "var(--color-midnight)" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div
                className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
                style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
              >
                <span className="block w-6 h-px" style={{ background: "var(--color-gold)" }} />
                Available Now
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold uppercase mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Empty Leg <span style={{ color: "var(--color-aqua)" }}>Flights</span>
              </h2>
              <p
                className="text-sm leading-relaxed max-w-md"
                style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
              >
                Access premium private jets at exceptional rates. Empty leg flights offer
                the same luxury experience at significantly reduced prices.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full md:min-w-[340px] md:max-w-md">
              {EMPTY_LEGS.slice(0, 3).map((flight) => (
                <div
                  key={`${flight.fromCode}-${flight.toCode}-${flight.date}`}
                  className="flex items-center gap-4 p-4"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid rgba(200,169,107,0.25)",
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-sm font-bold"
                      style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                    >
                      {flight.fromCode} → {flight.toCode}
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                    >
                      {flight.date} · {flight.aircraft} · {flight.seats} seats
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { onNavigate("empty-legs"); }}
                    className="shrink-0"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--color-blue)",
                      background: "none",
                      border: "1px solid rgba(200,169,107,0.35)",
                      cursor: "pointer",
                      padding: "6px 12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    View →
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => { onNavigate("empty-legs"); }}
                className="text-right"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-gray)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                View All Empty Legs →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
