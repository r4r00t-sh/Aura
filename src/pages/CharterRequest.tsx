import { useEffect, useMemo, useRef, useState } from "react";
import type { NavPayload, NavigateFn } from "../lib/nav";
import {
  formatCharterMailto,
  isValidEmail,
  makeReference,
} from "../lib/inquiries";
import { submitLead } from "../lib/leads";
import { buildEstimate } from "../lib/estimate";
import { CHARTER_EMAIL, CHARTER_PHONE, CHARTER_PHONE_TEL } from "../data/brand";

const steps = [
  "Mission",
  "Aircraft",
  "Contact",
  "Review",
];

type ExtraLeg = { to: string; date: string };

const aircraft = [
  { name: "Gulfstream G700", category: "Ultra Long Range", seats: 19 },
  { name: "Bombardier Global 7500", category: "Ultra Long Range", seats: 19 },
  { name: "Dassault Falcon 8X", category: "Long Range", seats: 14 },
  { name: "Gulfstream G550", category: "Long Range", seats: 16 },
  { name: "Embraer Praetor 600", category: "Super Midsize", seats: 12 },
  { name: "Cessna Citation Longitude", category: "Super Midsize", seats: 12 },
  { name: "No Preference", category: "Best Available", seats: 0 },
];

interface CharterRequestProps {
  initial?: NavPayload | null;
  onConsumed?: () => void;
  onNavigate?: NavigateFn;
}

export default function CharterRequest({
  initial,
  onConsumed,
  onNavigate,
}: CharterRequestProps) {
  const [step, setStep] = useState(0);
  const formTopRef = useRef<HTMLDivElement>(null);
  const [tripType, setTripType] = useState("One Way");
  const [from, setFrom] = useState("Dubai (DXB)");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [extraLegs, setExtraLegs] = useState<ExtraLeg[]>([{ to: "", date: "" }]);
  const [time, setTime] = useState("10:00");
  const [passengers, setPassengers] = useState(2);
  const [bags, setBags] = useState(2);
  const [aircraft_pref, setAircraft] = useState("No Preference");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  const estimate = useMemo(
    () => (from.trim() && to.trim() ? buildEstimate({ from, to, passengers, tripType }) : null),
    [from, to, passengers, tripType]
  );

  const multiLegSummary = extraLegs
    .filter((l) => l.to.trim())
    .map((l) => `${l.to}${l.date ? ` (${l.date})` : ""}`)
    .join(" → ");

  useEffect(() => {
    if (!initial) return;
    if (initial.tripType) setTripType(initial.tripType);
    if (initial.from) setFrom(initial.from);
    if (initial.to) setTo(initial.to);
    if (initial.date) setDate(initial.date);
    if (initial.returnDate) setReturnDate(initial.returnDate);
    if (initial.time) setTime(initial.time);
    if (initial.passengers != null && initial.passengers !== "") {
      const n = Number(initial.passengers);
      if (!Number.isNaN(n) && n > 0) setPassengers(n);
    }
    if (initial.aircraft) setAircraft(initial.aircraft);
    if (initial.name) setName(initial.name);
    if (initial.email) setEmail(initial.email);
    if (initial.phone) setPhone(initial.phone);
    if (initial.message) setNotes(initial.message);
    if (initial.aircraft) setStep(1);
    else if (initial.to || initial.date) setStep(0);
    onConsumed?.();
  }, [initial, onConsumed]);

  useEffect(() => {
    const el = formTopRef.current;
    if (!el) return;
    // Keep the next step at the top of the viewport (floating nav offset via scroll-margin).
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, submitted]);

  const multiLegOk =
    tripType !== "Multi-Leg" ||
    (extraLegs.length > 0 && extraLegs.every((l) => l.to.trim() && l.date));

  const canProceed = [
    Boolean(
      tripType &&
        from &&
        to &&
        date &&
        time &&
        passengers > 0 &&
        (tripType !== "Round Trip" || returnDate) &&
        multiLegOk
    ),
    aircraft_pref !== "",
    Boolean(name && email && phone && isValidEmail(email)),
    true,
  ][step];

  const submitCharter = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      setStep(2);
      return;
    }
    if (tripType === "Round Trip" && !returnDate) {
      setError("Please add a return date.");
      setStep(0);
      return;
    }
    if (tripType === "Multi-Leg" && !multiLegOk) {
      setError("Please complete each additional leg (city and date).");
      setStep(0);
      return;
    }

    const ref = makeReference("CHR");
    const legsNote =
      tripType === "Multi-Leg" && multiLegSummary
        ? `Extra legs after ${to}: ${multiLegSummary}`
        : "";
    const payload = {
      tripType,
      from,
      to,
      date,
      returnDate,
      extraLegs: multiLegSummary || "",
      time,
      passengers,
      bags,
      aircraft: aircraft_pref,
      name,
      email,
      phone,
      notes: [notes, legsNote].filter(Boolean).join("\n"),
      estimateBand: estimate?.band ?? "",
      estimateCategory: estimate?.category ?? "",
    };

    const result = await submitLead("charter", { ...payload, reference: ref });
    setReference(result.reference);
    setSubmitted(true);
    setError("");
  };

  const handleNext = async () => {
    setError("");
    if (!canProceed) {
      if (step === 2 && email && !isValidEmail(email)) {
        setError("Please enter a valid email address.");
      } else {
        setError("Please complete the required fields before continuing.");
      }
      return;
    }
    if (step < steps.length - 1) setStep(step + 1);
    else await submitCharter();
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(0);
    setReference("");
    setError("");
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(250,248,244,0.95)",
    border: "1px solid rgba(200,169,107,0.3)",
    color: "var(--color-ink)",
    fontFamily: "var(--font-body)",
    fontSize: "14px",
    padding: "14px 16px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "8px",
    colorScheme: "light",
    transition: "border-color 0.2s ease",
    minWidth: 0,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "var(--color-gray)",
    display: "block",
    margin: "0 0 10px",
    padding: 0,
    lineHeight: 1.4,
  };

  const fieldGroupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    minWidth: 0,
  };

  const stepperBtnStyle: React.CSSProperties = {
    width: 48,
    height: 48,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(250,248,244,0.95)",
    border: "1px solid rgba(200,169,107,0.3)",
    color: "var(--color-ink)",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "20px",
    lineHeight: 1,
    padding: 0,
    flexShrink: 0,
  };

  if (submitted) {
    return (
      <div style={{ background: "var(--color-navy)", minHeight: "100vh" }} className="flex items-center justify-center">
        <div className="text-center max-w-lg px-6 pt-20">
          <div
            className="text-6xl md:text-7xl font-bold uppercase mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
          >
            ✓
          </div>
          <div
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            Request Received
          </div>
          <h2
            className="text-4xl font-bold uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your Charter Request
            <br />
            Is Confirmed
          </h2>
          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            Our charter desk will contact you within 30 minutes to confirm availability
            and pricing for your journey from <strong style={{ color: "var(--color-ink)" }}>{from}</strong> to{" "}
            <strong style={{ color: "var(--color-ink)" }}>{to}</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetForm}
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
                padding: "14px 28px",
              }}
            >
              New Request
            </button>
            {onNavigate && (
              <button
                onClick={() => onNavigate("home")}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "var(--color-ink)",
                  background: "transparent",
                  border: "1px solid rgba(200,169,107,0.45)",
                  cursor: "pointer",
                  padding: "14px 28px",
                }}
              >
                Back Home
              </button>
            )}
          </div>
          <p
            className="mt-8 text-xs"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            Reference: {reference}
          </p>
          <button
            type="button"
            className="mt-4 text-xs underline"
            style={{
              color: "var(--color-gold)",
              fontFamily: "var(--font-body)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() =>
              formatCharterMailto({
                reference,
                tripType,
                from,
                to,
                date,
                returnDate,
                time,
                passengers,
                bags,
                aircraft: aircraft_pref,
                name,
                email,
                phone,
                notes,
              })
            }
          >
            Open email draft to charter desk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--color-navy)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        ref={formTopRef}
        className="pt-32 pb-12"
        style={{
          background: "var(--color-midnight)",
          borderBottom: "1px solid rgba(200,169,107,0.2)",
          scrollMarginTop: "1rem",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
          >
            <span className="block w-6 h-px" style={{ background: "var(--color-gold)" }} />
            Charter Request
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Request a <span style={{ color: "var(--color-blue)" }}>Charter</span>
          </h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Step indicator */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="flex flex-col gap-0">
                {steps.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => i < step && setStep(i)}
                    className="flex items-start gap-4 py-3 text-left group"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: i <= step ? "pointer" : "default",
                    }}
                  >
                    <div
                      className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{
                        fontFamily: "var(--font-display)",
                        background: i === step
                          ? "var(--color-blue)"
                          : i < step
                          ? "var(--color-gold)"
                          : "transparent",
                        border: i === step
                          ? "none"
                          : i < step
                          ? "none"
                          : "1px solid rgba(200,169,107,0.35)",
                        color: i === step
                          ? "var(--color-white)"
                          : i < step
                          ? "var(--color-royal)"
                          : "var(--color-gray)",
                        fontSize: "9px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {i < step ? "✓" : i + 1}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "10px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: i === step
                            ? "var(--color-ink)"
                            : i < step
                            ? "var(--color-gold)"
                            : "var(--color-gray)",
                          fontWeight: i === step ? 600 : 400,
                        }}
                      >
                        {s}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* 24/7 contact */}
              <div
                className="mt-10 p-5"
                style={{
                  background: "var(--color-midnight)",
                  border: "1px solid rgba(200,169,107,0.25)",
                }}
              >
                <div
                  className="text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
                >
                  Charter Desk 24/7
                </div>
                <div
                  className="text-lg font-bold mb-1"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                >
                  <a href={`tel:${CHARTER_PHONE_TEL}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {CHARTER_PHONE}
                  </a>
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                >
                  <a href={`mailto:${CHARTER_EMAIL}`} style={{ color: "inherit" }}>
                    {CHARTER_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Step content */}
          <div className="lg:col-span-2">
            <div
              className="p-8 md:p-10"
              style={{
                background: "var(--color-midnight)",
                border: "1px solid rgba(200,169,107,0.25)",
              }}
            >
              <div
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
              >
                Step {step + 1} of {steps.length}
              </div>
              <h2
                className="text-2xl font-bold uppercase mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {steps[step]}
              </h2>

              {/* STEP 0: Mission details */}
              {step === 0 && (
                <div className="flex flex-col gap-8">
                {/* Trip type */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["One Way", "Round Trip", "Multi-Leg"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setTripType(type);
                        if (type === "Multi-Leg" && extraLegs.length === 0) {
                          setExtraLegs([{ to: "", date: "" }]);
                        }
                      }}
                      className="p-6 text-center"
                      style={{
                        background: tripType === type ? "rgba(200,169,107,0.12)" : "#F3EEE4",
                        border: tripType === type
                          ? "1px solid rgba(200,169,107,0.55)"
                          : "1px solid rgba(200,169,107,0.25)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        className="text-3xl mb-3"
                        style={{ color: tripType === type ? "var(--color-blue)" : "var(--color-gray)" }}
                      >
                        {type === "One Way" ? "\u2192" : type === "Round Trip" ? "\u21C4" : "\u25C8"}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "11px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: tripType === type ? "var(--color-ink)" : "var(--color-gray)",
                          fontWeight: tripType === type ? 600 : 400,
                        }}
                      >
                        {type}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Route */}
                <div className="flex flex-col gap-6">
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Departure City / Airport</label>
                    <input
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Dubai (DXB)"
                      style={inputStyle}
                    />
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Destination City / Airport</label>
                    <input
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="e.g. London (LHR)"
                      style={inputStyle}
                    />
                  </div>
                  {tripType === "Round Trip" && (
                    <div
                      className="text-xs p-3 flex items-center gap-2"
                      style={{
                        color: "var(--color-gray)",
                        fontFamily: "var(--font-body)",
                        background: "rgba(200,169,107,0.08)",
                        border: "1px solid rgba(200,169,107,0.25)",
                      }}
                    >
                      <span style={{ color: "var(--color-blue)" }}>ℹ</span>
                      Return leg will be added in the next step.
                    </div>
                  )}
                  {tripType === "Multi-Leg" && (
                    <div className="flex flex-col gap-4 mt-2">
                      <div
                        className="text-xs tracking-[0.2em] uppercase"
                        style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
                      >
                        Additional legs
                      </div>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                      >
                        Primary sector is {from || "origin"} → {to || "first stop"}. Add onward cities below.
                      </p>
                      {extraLegs.map((leg, idx) => (
                        <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                          <div style={fieldGroupStyle}>
                            <label style={labelStyle}>Leg {idx + 2} destination</label>
                            <input
                              value={leg.to}
                              onChange={(e) => {
                                const next = [...extraLegs];
                                next[idx] = { ...next[idx], to: e.target.value };
                                setExtraLegs(next);
                              }}
                              placeholder="e.g. Geneva (GVA)"
                              style={inputStyle}
                            />
                          </div>
                          <div className="flex gap-2 items-end">
                            <div className="flex-1" style={fieldGroupStyle}>
                              <label style={labelStyle}>Date</label>
                              <input
                                type="date"
                                value={leg.date}
                                onChange={(e) => {
                                  const next = [...extraLegs];
                                  next[idx] = { ...next[idx], date: e.target.value };
                                  setExtraLegs(next);
                                }}
                                style={inputStyle}
                              />
                            </div>
                            {extraLegs.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setExtraLegs(extraLegs.filter((_, i) => i !== idx))}
                                style={{
                                  fontFamily: "var(--font-display)",
                                  fontSize: "10px",
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  color: "var(--color-gray)",
                                  background: "none",
                                  border: "1px solid rgba(200,169,107,0.35)",
                                  cursor: "pointer",
                                  padding: "14px 12px",
                                  marginBottom: 0,
                                }}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      {extraLegs.length < 4 && (
                        <button
                          type="button"
                          onClick={() => setExtraLegs([...extraLegs, { to: "", date: "" }])}
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "10px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--color-royal)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            textAlign: "left",
                          }}
                        >
                          + Add another leg
                        </button>
                      )}
                    </div>
                  )}
                  {estimate && (
                    <div
                      className="p-4 mt-2"
                      style={{
                        background: "rgba(1,40,153,0.05)",
                        border: "1px solid rgba(1,40,153,0.12)",
                      }}
                    >
                      <div
                        className="text-[10px] tracking-[0.25em] uppercase mb-2"
                        style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
                      >
                        Indicative estimate (primary sector)
                      </div>
                      <p
                        className="text-base font-bold"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-royal)" }}
                      >
                        {estimate.band}
                      </p>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                      >
                        {estimate.category}
                        {estimate.duration ? ` Â· ${estimate.duration}` : ""}. {estimate.note}
                      </p>
                    </div>
                  )}
                </div>

                {/* Date & Time */}
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div style={fieldGroupStyle}>
                      <label htmlFor="charter-depart-date" style={labelStyle}>
                        Departure Date
                      </label>
                      <input
                        id="charter-depart-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div style={fieldGroupStyle}>
                      <label htmlFor="charter-depart-time" style={labelStyle}>
                        Departure Time
                      </label>
                      <input
                        id="charter-depart-time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  {tripType === "Round Trip" && (
                    <div style={fieldGroupStyle}>
                      <label htmlFor="charter-return-date" style={labelStyle}>
                        Return Date
                      </label>
                      <input
                        id="charter-return-date"
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  )}
                  <div
                    className="text-xs flex items-start gap-2"
                    style={{
                      color: "var(--color-gray)",
                      fontFamily: "var(--font-body)",
                      background: "rgba(200,169,107,0.05)",
                      border: "1px solid rgba(200,169,107,0.15)",
                      borderRadius: "8px",
                      padding: "12px 14px",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: "var(--color-gold)", flexShrink: 0 }}>✦</span>
                    <span>
                      Aircraft can typically be prepared within 4–8 hours of your requested time.
                    </span>
                  </div>
                </div>

                {/* Passengers */}
                <div className="flex flex-col gap-6">
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Number of Passengers</label>
                    <div className="inline-flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        style={stepperBtnStyle}
                        aria-label="Decrease passengers"
                      >
                        −
                      </button>
                      <span
                        className="tabular-nums font-bold"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "2rem",
                          lineHeight: 1,
                          width: "3rem",
                          height: 48,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--color-ink)",
                        }}
                      >
                        {passengers}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPassengers(Math.min(19, passengers + 1))}
                        style={stepperBtnStyle}
                        aria-label="Increase passengers"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Checked Bags</label>
                    <div className="inline-flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setBags(Math.max(0, bags - 1))}
                        style={stepperBtnStyle}
                        aria-label="Decrease bags"
                      >
                        −
                      </button>
                      <span
                        className="tabular-nums font-bold"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "2rem",
                          lineHeight: 1,
                          width: "3rem",
                          height: 48,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--color-ink)",
                        }}
                      >
                        {bags}
                      </span>
                      <button
                        type="button"
                        onClick={() => setBags(Math.min(30, bags + 1))}
                        style={stepperBtnStyle}
                        aria-label="Increase bags"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      color: "var(--color-gray)",
                      fontFamily: "var(--font-body)",
                      background: "#F3EEE4",
                      border: "1px solid rgba(200,169,107,0.25)",
                      borderRadius: "8px",
                      padding: "12px 14px",
                      lineHeight: 1.5,
                    }}
                  >
                    Infants under 2 years travel free. Special requirements or catering preferences
                    can be noted in the final step.
                  </div>
                </div>
                </div>
              )}


              {/* STEP 4: Aircraft */}
              {step === 1 && (
                <div className="flex flex-col gap-3">
                  {aircraft.map((ac) => (
                    <button
                      key={ac.name}
                      onClick={() => setAircraft(ac.name)}
                      className="flex items-center justify-between p-5 text-left"
                      style={{
                        background: aircraft_pref === ac.name ? "rgba(200,169,107,0.1)" : "#F3EEE4",
                        border: aircraft_pref === ac.name
                          ? "1px solid rgba(200,169,107,0.5)"
                          : "1px solid rgba(200,169,107,0.25)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "13px",
                            letterSpacing: "0.05em",
                            color: aircraft_pref === ac.name ? "var(--color-ink)" : "var(--color-gray)",
                            fontWeight: aircraft_pref === ac.name ? 600 : 400,
                          }}
                        >
                          {ac.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "12px",
                            color: "var(--color-gray)",
                            marginTop: "2px",
                          }}
                        >
                          {ac.category}
                          {ac.seats > 0 && ` Â· Up to ${ac.seats} passengers`}
                        </div>
                      </div>
                      <div
                        className="w-5 h-5 flex items-center justify-center"
                        style={{
                          border: aircraft_pref === ac.name ? "none" : "1px solid rgba(200,169,107,0.35)",
                          background: aircraft_pref === ac.name ? "var(--color-blue)" : "transparent",
                          borderRadius: "50%",
                          fontSize: "10px",
                          color: aircraft_pref === ac.name ? "var(--color-white)" : "var(--color-ink)",
                        }}
                      >
                        {aircraft_pref === ac.name && "✓"}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 5: Contact */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      style={inputStyle}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone (with country code)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+971 50 000 0000"
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Special Requests or Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Catering preferences, ground transportation, customs requirements…"
                      rows={4}
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>
                </div>
              )}

              {/* STEP 6: Review */}
              {step === 3 && (
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Trip Type", value: tripType },
                    {
                      label: "Route",
                      value:
                        tripType === "Multi-Leg" && multiLegSummary
                          ? `${from} → ${to} → ${multiLegSummary}`
                          : `${from} → ${to}`,
                    },
                    { label: "Departure", value: `${date || "—"} at ${time}` },
                    {
                      label: tripType === "Round Trip" ? "Return" : "Extra legs",
                      value:
                        tripType === "Round Trip"
                          ? returnDate || "N/A"
                          : tripType === "Multi-Leg"
                            ? multiLegSummary || "—"
                            : "N/A",
                    },
                    {
                      label: "Indicative band",
                      value: estimate?.band ?? "Request quote",
                    },
                    { label: "Passengers", value: `${passengers} passenger${passengers > 1 ? "s" : ""}` },
                    { label: "Bags", value: bags },
                    { label: "Aircraft", value: aircraft_pref },
                    { label: "Contact", value: name || "—" },
                    { label: "Email", value: email || "—" },
                    { label: "Phone", value: phone || "—" },
                    { label: "Notes", value: notes || "None" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between py-3"
                      style={{ borderBottom: "1px solid rgba(200,169,107,0.2)" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "10px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--color-gray)",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          color: "var(--color-ink)",
                          textAlign: "right",
                          maxWidth: "60%",
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                  <div
                    className="mt-4 p-4 text-xs"
                    style={{
                      color: "var(--color-gray)",
                      fontFamily: "var(--font-body)",
                      background: "rgba(200,169,107,0.06)",
                      border: "1px solid rgba(200,169,107,0.2)",
                      lineHeight: "1.7",
                    }}
                  >
                    <span style={{ color: "var(--color-gold)" }}>✦</span>{" "}
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                    Our charter desk will respond within 30 minutes with pricing and confirmation.
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              {error && (
                <p
                  className="mt-6 text-sm"
                  style={{ color: "#b42318", fontFamily: "var(--font-body)" }}
                  role="alert"
                >
                  {error}
                </p>
              )}
              <div className="flex items-center justify-between mt-10">
                {step > 0 ? (
                  <button
                    onClick={() => { setError(""); setStep(step - 1); }}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--color-gray)",
                      background: "none",
                      border: "1px solid rgba(200,169,107,0.35)",
                      cursor: "pointer",
                      padding: "12px 24px",
                    }}
                  >
                    {"\u2190"} Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={handleNext}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "var(--color-white)",
                    background: canProceed ? "var(--color-blue)" : "rgba(1,40,153,0.45)",
                    border: "none",
                    cursor: "pointer",
                    padding: "14px 32px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {step === steps.length - 1 ? "Submit Request" : "Continue \u2192"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
