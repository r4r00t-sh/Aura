import { CHARTER_EMAIL } from "./nav";

export type InquiryKind = "charter" | "contact" | "empty-leg-alert";

export type InquiryRecord = {
  id: string;
  kind: InquiryKind;
  createdAt: string;
  data: Record<string, string | number | boolean | null | undefined>;
};

const STORAGE_KEY = "aura_inquiries";
const ALERTS_KEY = "aura_empty_leg_alerts";

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function makeReference(prefix = "AURA"): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-4);
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${stamp}${rand}`;
}

export function saveInquiry(
  kind: InquiryKind,
  data: InquiryRecord["data"]
): InquiryRecord {
  const record: InquiryRecord = {
    id: makeReference(kind === "charter" ? "CHR" : kind === "contact" ? "CNT" : "ALT"),
    kind,
    createdAt: new Date().toISOString(),
    data,
  };

  try {
    const prev = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]") as InquiryRecord[];
    prev.push(record);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
  } catch {
    /* ignore quota / private mode */
  }

  return record;
}

export function saveAlertEmail(email: string): void {
  try {
    const prev = JSON.parse(sessionStorage.getItem(ALERTS_KEY) || "[]") as string[];
    const next = Array.from(new Set([...prev, email.trim().toLowerCase()]));
    sessionStorage.setItem(ALERTS_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

/** Opens a prefilled mailto as a no-backend delivery path. */
export function openInquiryMailto(
  subject: string,
  bodyLines: string[],
  to = CHARTER_EMAIL
): void {
  const body = bodyLines.filter(Boolean).join("\n");
  const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const link = document.createElement("a");
  link.href = href;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function formatCharterMailto(data: {
  reference: string;
  tripType: string;
  from: string;
  to: string;
  date: string;
  returnDate?: string;
  time: string;
  passengers: number;
  bags: number;
  aircraft: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}): void {
  openInquiryMailto(`Charter Request ${data.reference}`, [
    `Reference: ${data.reference}`,
    `Trip: ${data.tripType}`,
    `Route: ${data.from} → ${data.to}`,
    `Date: ${data.date}${data.returnDate ? ` · Return: ${data.returnDate}` : ""}`,
    `Time: ${data.time}`,
    `Passengers: ${data.passengers} · Bags: ${data.bags}`,
    `Aircraft: ${data.aircraft}`,
    ``,
    `Contact: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    data.notes ? `Notes: ${data.notes}` : "",
  ]);
}

export function formatContactMailto(data: {
  reference: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): void {
  openInquiryMailto(`Enquiry ${data.reference} — ${data.subject}`, [
    `Reference: ${data.reference}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : "",
    `Subject: ${data.subject}`,
    ``,
    data.message,
  ]);
}
