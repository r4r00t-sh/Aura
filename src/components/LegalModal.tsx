import { useEffect, useState } from "react";

/** Simple in-app legal / info modal. */
export default function LegalModal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(7,20,38,0.72)" }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 md:p-8"
        style={{
          background: "var(--color-white)",
          borderRadius: "16px",
          boxShadow: "0 24px 60px rgba(7,20,38,0.35)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <h2
            className="text-xl font-bold uppercase"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em", color: "var(--color-ink)" }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "22px",
              lineHeight: 1,
              color: "var(--color-gray)",
            }}
          >
            ×
          </button>
        </div>
        <div
          className="text-sm leading-relaxed space-y-3"
          style={{ color: "var(--color-gray)", fontFamily: "var(--font-body)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function useLegalModal() {
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);
  return {
    legal,
    openPrivacy: () => setLegal("privacy"),
    openTerms: () => setLegal("terms"),
    close: () => setLegal(null),
  };
}
