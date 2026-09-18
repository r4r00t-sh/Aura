import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AURA_SERVICES } from "../data/services";
import type { NavigateFn } from "../lib/nav";
import { scrollToTop } from "./SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

interface ServicesScrollProps {
  onNavigate?: NavigateFn;
}

const STACK_OFFSET_X = 16;
const STACK_OFFSET_Y = 14;
const VISIBLE_STACK = 5;

export default function ServicesScroll({ onNavigate }: ServicesScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLButtonElement[];
    if (!cards.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      cards.forEach((card, i) => {
        gsap.set(card, {
          clearProps: "transform",
          position: "relative",
          left: "auto",
          top: "auto",
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          zIndex: 1,
        });
        card.style.marginBottom = i < cards.length - 1 ? "12px" : "0";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const measure = () => {
        const w = stage.offsetWidth;
        const h = stage.offsetHeight;
        const cardW = Math.min(380, Math.max(280, w * 0.4));
        const sampleH = cards[0]?.offsetHeight || 200;
        return {
          leftX: Math.max(12, w * 0.06),
          rightX: w - cardW - Math.max(12, w * 0.06),
          baseY: Math.max(8, h / 2 - sampleH / 2),
          cardW,
        };
      };

      /** stackIndex 0 = front of the pile (fully visible on top). */
      const applyLeft = (card: HTMLElement, stackIndex: number) => {
        const { leftX, baseY, cardW } = measure();
        const d = Math.min(stackIndex, VISIBLE_STACK);
        return {
          x: leftX + d * STACK_OFFSET_X,
          y: baseY + d * STACK_OFFSET_Y,
          rotation: -3.5 + d * 0.5,
          scale: 1 - d * 0.032,
          opacity: stackIndex > VISIBLE_STACK ? 0 : 1,
          zIndex: 200 - stackIndex,
          width: cardW,
        };
      };

      const applyRight = (card: HTMLElement, stackIndex: number) => {
        const { rightX, baseY, cardW } = measure();
        const d = Math.min(stackIndex, VISIBLE_STACK);
        return {
          x: rightX - d * STACK_OFFSET_X,
          y: baseY + d * STACK_OFFSET_Y,
          rotation: 2.5 - d * 0.4,
          scale: 1 - d * 0.028,
          opacity: stackIndex > VISIBLE_STACK ? 0.2 : 1,
          zIndex: 50 - stackIndex,
          width: cardW,
        };
      };

      cards.forEach((card, i) => {
        gsap.set(card, {
          position: "absolute",
          left: 0,
          top: 0,
          transformOrigin: "50% 50%",
          ...applyLeft(card, i),
        });
      });

      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
      if (indexRef.current) indexRef.current.textContent = "01";

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${cards.length * 90}%`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              cards.length,
              Math.max(1, Math.ceil(self.progress * cards.length || 1))
            );
            if (indexRef.current) {
              indexRef.current.textContent = String(idx).padStart(2, "0");
            }
          },
        },
      });

      for (let step = 0; step < cards.length; step++) {
        const moving = cards[step];

        // Deal front-of-left card across to front-of-right
        tl.to(
          moving,
          {
            x: () => applyRight(moving, 0).x,
            y: () => applyRight(moving, 0).y,
            rotation: () => applyRight(moving, 0).rotation,
            scale: () => applyRight(moving, 0).scale,
            opacity: 1,
            zIndex: 300,
            width: () => applyRight(moving, 0).width,
            duration: 1,
          },
          step
        );

        // Push older right-stack cards deeper
        for (let r = 0; r < step; r++) {
          const deeper = step - r;
          const target = cards[r];
          tl.to(
            target,
            {
              x: () => applyRight(target, deeper).x,
              y: () => applyRight(target, deeper).y,
              rotation: () => applyRight(target, deeper).rotation,
              scale: () => applyRight(target, deeper).scale,
              opacity: () => applyRight(target, deeper).opacity,
              zIndex: 50 - deeper,
              duration: 1,
            },
            step
          );
        }

        // Advance remaining left stack toward the front
        for (let l = step + 1; l < cards.length; l++) {
          const leftIndex = l - (step + 1);
          const target = cards[l];
          tl.to(
            target,
            {
              x: () => applyLeft(target, leftIndex).x,
              y: () => applyLeft(target, leftIndex).y,
              rotation: () => applyLeft(target, leftIndex).rotation,
              scale: () => applyLeft(target, leftIndex).scale,
              opacity: () => applyLeft(target, leftIndex).opacity,
              zIndex: 200 - leftIndex,
              duration: 1,
            },
            step
          );
        }

        // Settle dealt card as top of right stack
        tl.set(moving, { zIndex: 50 }, step + 0.99);

        tl.to(
          progressRef.current,
          {
            scaleX: (step + 1) / cards.length,
            duration: 1,
            ease: "none",
          },
          step
        );
      }
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const handleClick = (service: (typeof AURA_SERVICES)[number]) => {
    if (!onNavigate) return;
    onNavigate(service.page ?? "contact");
    scrollToTop();
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--color-offwhite)", minHeight: "100vh" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <div
              className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              <span className="block w-6 h-px" style={{ background: "var(--color-gold)" }} />
              What We Do
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold uppercase leading-tight"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
            >
              Charter Services.
              <br />
              <span style={{ color: "var(--color-blue)" }}>Arranged.</span>
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed max-w-md"
            style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
          >
            A stacked deck on the left — scroll to deal each service across to the right.
          </p>
        </div>

        <div className="flex items-center justify-between gap-6 mb-3">
          <div className="flex items-baseline gap-2">
            <span
              ref={indexRef}
              className="text-2xl font-bold tabular-nums"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
            >
              01
            </span>
            <span
              className="text-sm"
              style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
            >
              / {String(AURA_SERVICES.length).padStart(2, "0")}
            </span>
          </div>
          <div
            className="flex-1 h-px max-w-xs ml-auto overflow-hidden"
            style={{ background: "rgba(1,40,153,0.12)" }}
          >
            <div
              ref={progressRef}
              className="h-full origin-left"
              style={{ background: "var(--color-gold)", transform: "scaleX(0)" }}
            />
          </div>
        </div>

        <div
          className="relative hidden md:flex items-center justify-between text-[10px] tracking-[0.28em] uppercase"
          style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
        >
          <span>Stack</span>
          <span>Dealt</span>
        </div>
      </div>

      <div
        ref={stageRef}
        className="relative mx-auto px-6 md:px-10"
        style={{ height: "min(58vh, 500px)", maxWidth: "1280px" }}
      >
        <div
          className="pointer-events-none absolute inset-y-4 left-6 md:left-10 w-[42%] rounded-sm"
          style={{ background: "rgba(1,40,153,0.03)", border: "1px dashed rgba(1,40,153,0.1)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-4 right-6 md:right-10 w-[42%] rounded-sm"
          style={{ background: "rgba(214,185,108,0.04)", border: "1px dashed rgba(214,185,108,0.18)" }}
          aria-hidden
        />

        {AURA_SERVICES.map((service, i) => (
          <button
            key={service.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            type="button"
            onClick={() => handleClick(service)}
            className="text-left p-6 md:p-7"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              opacity: 1,
              background: "var(--color-white)",
              border: "1px solid rgba(1,40,153,0.1)",
              borderRadius: "16px",
              boxShadow:
                "0 2px 4px rgba(7,20,38,0.04), 0 12px 28px rgba(7,20,38,0.1), 0 28px 56px rgba(7,20,38,0.08)",
              cursor: onNavigate ? "pointer" : "default",
              willChange: "transform",
            }}
          >
            <div
              className="text-[10px] tracking-[0.28em] uppercase mb-3 flex items-center justify-between gap-3"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              <span>Aura</span>
              <span style={{ color: "var(--color-gray)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3
              className="text-base md:text-lg font-bold uppercase mb-2 leading-snug"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.04em",
                color: "var(--color-ink)",
              }}
            >
              {service.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
            >
              {service.desc}
            </p>
          </button>
        ))}
      </div>

      <p
        className="text-center text-[10px] tracking-[0.3em] uppercase pb-10 pt-4"
        style={{ color: "var(--color-gray)", fontFamily: "var(--font-display)" }}
      >
        Scroll to deal
      </p>
    </section>
  );
}
