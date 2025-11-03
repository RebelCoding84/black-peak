"use client";

import { useEffect, useRef } from "react";

export default function AboutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Sulje Escillä
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
      className="fixed inset-0 z-[60] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Taustahuntu */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Itse modal */}
      <div
        ref={ref}
        className="relative z-[61] w-[92vw] max-w-xl rounded-2xl bg-zinc-900/95 text-zinc-50 shadow-2xl border border-white/10 p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="about-title" className="text-xl font-bold tracking-wide">
            About Black Peak
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Sulje"
            className="rounded-md px-2 py-1 bg-white/10 hover:bg-white/20"
          >
            ✕
          </button>
        </div>

        {/* SISÄLTÖ */}
        <div className="mt-4 space-y-3 text-sm/6">
          <p>
            Hei, valmistan käsityönä kuningas kaula sekä ranne ketjuja hopeasta.
          </p>

          <ul className="space-y-1">
            <li>
              <span className="opacity-70">Sivusto:</span>{" "}
              <a
                href="https://blackpeak.fi"
                target="_blank"
                rel="noreferrer"
                className="underline hover:opacity-80"
              >
                blackpeak.fi
              </a>
            </li>
            <li>
              <span className="opacity-70">Sähköposti:</span>{" "}
              <a
                href="mailto:gmail@blackpeakoutlaws.com"
                className="underline hover:opacity-80"
              >
                gmail@blackpeakoutlaws.com
              </a>
            </li>
            <li>
              <span className="opacity-70">Nimi:</span> Valtteri Tilli
            </li>
            <li>
              <span className="opacity-70">Instagram:</span>{" "}
              <span className="opacity-50 italic">tulossa</span>
            </li>
            <li>
              <span className="opacity-70">Facebook:</span>{" "}
              <span className="opacity-50 italic">tulossa</span>
            </li>
          </ul>

          <p className="opacity-80">
            Klikkaa mitä tahansa taustaa tai ✕ sulkeaksesi ikkunan.
          </p>
        </div>
      </div>
    </div>
  );
}
