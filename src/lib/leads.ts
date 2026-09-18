import { CHARTER_EMAIL, LEADS_ENDPOINT } from "../data/brand";
import {
  makeReference,
  saveInquiry,
  type InquiryKind,
  type InquiryRecord,
} from "./inquiries";

const QUEUE_KEY = "aura_lead_queue";

export type LeadResult = {
  record: InquiryRecord;
  /** `sent` = remote endpoint accepted; `queued` = local API stub; `stored` = local only */
  delivered: "queued" | "stored" | "sent";
  reference: string;
};

/**
 * Primary lead capture: durable local queue + session inquiry log.
 * Posts to `VITE_LEADS_ENDPOINT` (Formspree / webhook) when configured,
 * else attempts `/api/leads`. Always keeps a local fallback.
 */
export async function submitLead(
  kind: InquiryKind,
  data: Record<string, string | number | boolean | null | undefined>
): Promise<LeadResult> {
  const reference =
    (typeof data.reference === "string" && data.reference) ||
    makeReference(kind === "charter" ? "CHR" : kind === "contact" ? "CNT" : "ALT");

  const payload = { ...data, reference };
  const record = saveInquiry(kind, payload);

  try {
    const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]") as InquiryRecord[];
    queue.push(record);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-100)));
  } catch {
    /* ignore */
  }

  let delivered: LeadResult["delivered"] = "stored";

  const body = {
    kind,
    emailTo: CHARTER_EMAIL,
    _subject: `Aura ${kind} · ${reference}`,
    ...payload,
  };

  const endpoints = [LEADS_ENDPOINT, "/api/leads"].filter(Boolean) as string[];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        delivered = url === "/api/leads" ? "queued" : "sent";
        break;
      }
    } catch {
      /* try next */
    }
  }

  return { record, delivered, reference };
}

export function getLeadQueue(): InquiryRecord[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]") as InquiryRecord[];
  } catch {
    return [];
  }
}
