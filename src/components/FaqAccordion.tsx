import { useState } from "react";
import { FAQ_ITEMS, type FaqItem } from "../data/faq";
import type { NavigateFn } from "../lib/nav";

export function FaqAccordion({
  items = FAQ_ITEMS,
  limit,
  onNavigate,
}: {
  items?: FaqItem[];
  limit?: number;
  onNavigate?: NavigateFn;
}) {
  const list = limit ? items.slice(0, limit) : items;
  const [openId, setOpenId] = useState<string | null>(list[0]?.id ?? null);

  return (
    <div className="flex flex-col">
      {list.map((item) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            style={{ borderBottom: "1px solid rgba(1,40,153,0.12)" }}
          >
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              className="w-full text-left py-5 flex items-start justify-between gap-4"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-expanded={open}
            >
              <span
                className="text-sm md:text-base font-bold uppercase"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.04em",
                  color: "var(--color-ink)",
                }}
              >
                {item.question}
              </span>
              <span
                className="text-lg flex-shrink-0 tabular-nums"
                style={{ color: "var(--color-aqua)", fontFamily: "var(--font-display)" }}
              >
                {open ? "−" : "+"}
              </span>
            </button>
            {open && (
              <div className="pb-5 pr-8">
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
                >
                  {item.answer}
                </p>
                {item.link && onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate(item.link!.page)}
                    className="mt-3 text-xs tracking-[0.2em] uppercase"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-royal)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {item.link.label} →
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function FaqTeaser({ onNavigate }: { onNavigate: NavigateFn }) {
  return (
    <section className="py-20 md:py-24" style={{ background: "var(--color-white)" }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div
              className="text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
              style={{ color: "var(--color-aqua)", fontFamily: "var(--font-display)" }}
            >
              <span className="block w-6 h-px" style={{ background: "var(--color-aqua)" }} />
              FAQ
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold uppercase"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
            >
              Straight answers
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("faq")}
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
            View all FAQ →
          </button>
        </div>
        <FaqAccordion items={FAQ_ITEMS} limit={5} onNavigate={onNavigate} />
      </div>
    </section>
  );
}
