import { useCallback, useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import FinalExperience from "./components/FinalExperience";
import SmoothScroll, { scrollToTop } from "./components/SmoothScroll";
import Home from "./pages/Home";
import Fleet from "./pages/Fleet";
import AircraftDetail from "./pages/AircraftDetail";
import CharterRequest from "./pages/CharterRequest";
import EmptyLegs from "./pages/EmptyLegs";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Safety from "./pages/Safety";
import Faq from "./pages/Faq";
import AircraftForSale from "./pages/AircraftForSale";
import DeskCTA from "./components/DeskCTA";
import type { NavPayload } from "./lib/nav";
import {
  parseHash,
  pageToRoute,
  syncHash,
  type AppRoute,
} from "./lib/routing";

function routeKey(route: AppRoute): string {
  return route.page === "aircraft" ? `aircraft:${route.slug}` : route.page;
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseHash());
  const [navPayload, setNavPayload] = useState<NavPayload | null>(null);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) syncHash({ page: "home" }, true);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleNavigate = useCallback((page: string, payload?: NavPayload) => {
    const next = pageToRoute(page, payload);
    setNavPayload(payload ?? null);
    setRoute(next);
    syncHash(next);
    scrollToTop();
  }, []);

  const clearPayload = () => setNavPayload(null);

  const currentPage = route.page === "aircraft" ? "fleet" : route.page;

  const renderPage = () => {
    switch (route.page) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "fleet":
        return <Fleet onNavigate={handleNavigate} />;
      case "aircraft":
        return <AircraftDetail slug={route.slug} onNavigate={handleNavigate} />;
      case "charter":
        return (
          <CharterRequest
            initial={navPayload}
            onConsumed={clearPayload}
            onNavigate={handleNavigate}
          />
        );
      case "empty-legs":
        return <EmptyLegs onNavigate={handleNavigate} />;
      case "destinations":
        return <Destinations onNavigate={handleNavigate} />;
      case "about":
        return <About />;
      case "safety":
        return <Safety onNavigate={handleNavigate} />;
      case "faq":
        return <Faq onNavigate={handleNavigate} />;
      case "aircraft-for-sale":
        return <AircraftForSale onNavigate={handleNavigate} />;
      case "contact":
        return (
          <Contact
            initial={navPayload}
            onConsumed={clearPayload}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <SmoothScroll>
      <div style={{ background: "var(--color-navy)", minHeight: "100vh" }}>
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
        <main>{renderPage()}</main>
        <FinalExperience
          key={routeKey(route)}
          onNavigate={handleNavigate}
          softOverlap={route.page === "home"}
        />
        <DeskCTA />
      </div>
    </SmoothScroll>
  );
}
