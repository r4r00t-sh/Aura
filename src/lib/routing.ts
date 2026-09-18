import type { NavPayload } from "./nav";

export type AppRoute =
  | { page: "home" }
  | { page: "fleet" }
  | { page: "aircraft"; slug: string }
  | { page: "charter" }
  | { page: "empty-legs" }
  | { page: "destinations" }
  | { page: "about" }
  | { page: "contact" }
  | { page: "safety" }
  | { page: "faq" }
  | { page: "aircraft-for-sale" };

const PAGE_SET = new Set([
  "home",
  "fleet",
  "aircraft",
  "charter",
  "empty-legs",
  "destinations",
  "about",
  "contact",
  "safety",
  "faq",
  "aircraft-for-sale",
]);

/** Parse `#/fleet/gulfstream-g700` style hashes. */
export function parseHash(hash = window.location.hash): AppRoute {
  const raw = hash.replace(/^#\/?/, "").trim();
  if (!raw) return { page: "home" };
  const parts = raw.split("/").filter(Boolean);
  const page = parts[0];
  if (page === "fleet" && parts[1]) return { page: "aircraft", slug: parts[1] };
  if (page === "aircraft" && parts[1]) return { page: "aircraft", slug: parts[1] };
  if (PAGE_SET.has(page) && page !== "aircraft") {
    return { page: page as Exclude<AppRoute["page"], "aircraft"> };
  }
  return { page: "home" };
}

export function routeToHash(route: AppRoute): string {
  if (route.page === "home") return "#/";
  if (route.page === "aircraft") return `#/fleet/${route.slug}`;
  return `#/${route.page}`;
}

export function pageToRoute(page: string, payload?: NavPayload): AppRoute {
  if (page === "aircraft" && payload?.aircraftSlug) {
    return { page: "aircraft", slug: payload.aircraftSlug };
  }
  if (page.startsWith("fleet/") || page.startsWith("aircraft/")) {
    const slug = page.split("/")[1];
    return { page: "aircraft", slug };
  }
  if (PAGE_SET.has(page) && page !== "aircraft") {
    return { page: page as Exclude<AppRoute["page"], "aircraft"> };
  }
  return { page: "home" };
}

export function syncHash(route: AppRoute, replace = false): void {
  const next = routeToHash(route);
  if (replace) {
    window.history.replaceState(null, "", next);
  } else if (window.location.hash !== next) {
    window.location.hash = next;
  }
}
