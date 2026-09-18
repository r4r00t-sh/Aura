import { useEffect, useState } from "react";
import type { NavPayload, NavigateFn } from "../lib/nav";
import {
  formatContactMailto,
  isValidEmail,
  makeReference,
} from "../lib/inquiries";
import { submitLead } from "../lib/leads";
import {
  CHARTER_EMAIL,
  CHARTER_OFFICE,
  CHARTER_PHONE,
  CHARTER_PHONE_TEL,
} from "../data/brand";

interface ContactProps {
  initial?: NavPayload | null;
  onConsumed?: () => void;
  onNavigate?: NavigateFn;
}

export default function Contact({ initial, onConsumed, onNavigate }: ContactProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!initial) return;
    setForm((prev) => ({
      name: initial.name ?? prev.name,
      email: initial.email ?? prev.email,
      phone: initial.phone ?? prev.phone,
      subject: initial.subject ?? prev.subject,
      message: initial.message ?? prev.message,
    }));
    onConsumed?.();
  }, [initial, onConsumed]);

  const inputStyle: React.CSSProperties = {
    background: "rgba(250,248,244,0.95)",
    border: "1px solid rgba(200,169,107,0.3)",
    color: "var(--color-ink)",
    fontFamily: "var(--font-body)",
    fontSize: "14px",
    padding: "13px 16px",
    outline: "none",
    width: "100%",
    colorScheme: "light" as const,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "var(--color-gray)",
    display: "block",
    marginBottom: "8px",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.message.trim()) {
      setError("Please fill in your name and message.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.subject) {
      setError("Please select a subject.");
      return;
    }

    const ref = makeReference("CNT");
    await submitLead("contact", { ...form, reference: ref });
    setReference(ref);
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setSubmitted(false);
    setReference("");
    setError("");
  };

  return (
    <div style={{ background: "var(--color-navy)", minHeight: "100vh" }}>
      <div className="relative pt-36 pb-20 overflow-hidden" style={{ background: "var(--color-midnight)" }}>
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "url(/images/stock/hero-sky.jpg)",
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
            Get in Touch
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold uppercase mb-5"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em", color: "var(--color-white)" }}
          >
            Contact
          </h1>
          <p
            className="text-base max-w-xl leading-relaxed"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            Our charter desk operates around the clock — private jets, cargo, empty legs,
            leasing, sourcing, or aircraft sales. Tell us what you need.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {[
              {
                icon: "📞",
                label: "24/7 Charter Desk",
                primary: CHARTER_PHONE,
                secondary: "Always available",
                href: `tel:${CHARTER_PHONE_TEL}`,
              },
              {
                icon: "✉",
                label: "Email",
                primary: CHARTER_EMAIL,
                secondary: "Response within the hour",
                href: `mailto:${CHARTER_EMAIL}`,
              },
              {
                icon: "📍",
                label: "Office",
                primary: CHARTER_OFFICE,
                secondary: "Private aviation hub",
                href: undefined,
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-lg"
                  style={{ background: "var(--color-midnight)", border: "1px solid rgba(200,169,107,0.25)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    className="text-xs tracking-[0.2em] uppercase mb-1"
                    style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-base font-medium block"
                      style={{
                        color: "var(--color-ink)",
                        fontFamily: "var(--font-body)",
                        textDecoration: "none",
                      }}
                    >
                      {item.primary}
                    </a>
                  ) : (
                    <div
                      className="text-base font-medium"
                      style={{ color: "var(--color-ink)", fontFamily: "var(--font-body)" }}
                    >
                      {item.primary}
                    </div>
                  )}
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                  >
                    {item.secondary}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="p-12 text-center"
                style={{
                  background: "var(--color-midnight)",
                  border: "1px solid rgba(200,169,107,0.25)",
                }}
              >
                <div
                  className="text-5xl font-bold mb-6"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
                >
                  ✓
                </div>
                <h3
                  className="text-2xl font-bold uppercase mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Message Received
                </h3>
                <p
                  className="text-sm leading-relaxed mb-2"
                  style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                >
                  Thank you, {form.name || "guest"}. A member of our team will be in touch
                  within the hour.
                </p>
                <p
                  className="text-xs mb-6"
                  style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                >
                  Reference: {reference}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
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
                      padding: "12px 24px",
                    }}
                  >
                    Send Another
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      formatContactMailto({
                        reference,
                        name: form.name,
                        email: form.email,
                        phone: form.phone,
                        subject: form.subject,
                        message: form.message,
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
                      border: "1px solid rgba(200,169,107,0.45)",
                      cursor: "pointer",
                      padding: "12px 24px",
                    }}
                  >
                    Open Email Draft
                  </button>
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate("charter")}
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
                        padding: "12px 24px",
                      }}
                    >
                      Request Charter
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10 flex flex-col gap-5"
                style={{
                  background: "var(--color-midnight)",
                  border: "1px solid rgba(200,169,107,0.25)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+971 50 000 0000"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="" disabled>
                        Select topic
                      </option>
                      <option value="private-jet">Private Jet Charter</option>
                      <option value="corporate">Business / Corporate Charter</option>
                      <option value="passenger">Passenger Aircraft Charter</option>
                      <option value="cargo">Cargo / Air Freight Charter</option>
                      <option value="groups">Group / Tour Operator Charter</option>
                      <option value="vip">VIP & Executive Travel</option>
                      <option value="leasing">Aircraft Leasing / ACMI</option>
                      <option value="empty-leg">Empty-Leg Arrangements</option>
                      <option value="planning">Flight Planning & Coordination</option>
                      <option value="sourcing">Aircraft Sourcing</option>
                      <option value="sales">Aircraft Buying & Selling</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you?"
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                {error && (
                  <p className="text-sm" style={{ color: "#b42318", fontFamily: "var(--font-body)" }} role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="self-start"
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
                    padding: "14px 32px",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--color-gold)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--color-blue)";
                  }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
