// app/components/Hero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const [showTip, setShowTip] = useState(false);

  return (
    <section
      className="
        relative w-screen h-dvh overflow-hidden bg-black
      "
      aria-label="Black Peak - etusivu"
    >
      {/* Taustakuva: koko kuva näkyy, ei leikkausta */}
      <div className="absolute inset-0">
        <Image
          src="/images/black-peak-hero.webp"
          alt="Black Peak - vuori sumupilvien yläpuolella"
          fill
          priority
          // object-contain: kuva mahtuu ruutuun kokonaan (letterbox-sivupalkit ovat ok)
          className="object-contain object-center select-none"
          sizes="100vw"
        />

        {/* Tumma vinjetti +  hienovarainen blur, jotta UI erottuu */}
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      {/* Pieni “menu”-placeholder vasempaan yläkulmaan (jos käytät omaa menua, voit poistaa) */}
      <div className="absolute left-4 top-4 z-20">
        <a
          href="#menu"
          className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-white/15"
        >
          <span aria-hidden>≡</span>
          <span className="sr-only">Avaa valikko</span>
          <span className="hidden sm:inline">Menu</span>
        </a>
      </div>

      {/* Timantti keskellä vuorta */}
      <div className="absolute inset-0 z-20 grid place-items-center">
        <div
          className="relative"
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onFocus={() => setShowTip(true)}
          onBlur={() => setShowTip(false)}
        >
          {/* Tooltip puhekupla */}
          {showTip && (
            <div
              role="tooltip"
              className="
                absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                rounded-full bg-white/10 px-4 py-2 text-xs text-white
                ring-1 ring-white/20 backdrop-blur-md
              "
            >
              HEY I’M HERE • HEI OLEN TÄÄLLÄ
            </div>
          )}

          {/* Timanttipainike (pulsing) – vie About-ankkuriin (vaihda href tarpeesi mukaan) */}
          <motion.a
            href="#about"
            aria-label="Avaa esittely"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="
              relative grid h-10 w-10 place-items-center rounded-full
              bg-cyan-400/80 text-black shadow-[0_0_40px_#22d3ee]
              ring-2 ring-cyan-300/70
              hover:bg-cyan-300 focus:outline-none
            "
          >
            {/* yksinkertainen timantti-SVG */}
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l4-5h10l4 5-9 12-9-12z" />
              <path d="M3 9h18" />
              <path d="M7 4l5 17L17 4" />
            </svg>

            {/* pehmeä hehku timantin taakse */}
            <span className="pointer-events-none absolute inset-0 rounded-full blur-xl bg-cyan-400/40" />
          </motion.a>
        </div>
      </div>

      {/* Alas-osoitin → Outlaw-osioon */}
      <a
        href="#outlaw"
        aria-label="Siirry Outlaw-osioon"
        className="
          group absolute bottom-6 left-1/2 z-20 -translate-x-1/2
          rounded-full bg-white/10 px-3 py-2 text-white
          ring-1 ring-white/20 backdrop-blur-md hover:bg-white/15
        "
      >
        <svg
          className="h-5 w-5 transition-transform group-hover:translate-y-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
