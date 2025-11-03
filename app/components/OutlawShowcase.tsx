"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function OutlawShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="outlaw"
      className="relative w-screen h-dvh overflow-hidden bg-black"
    >
      {/* Taustan blurrattu täyte tummaan teemaan */}
      <Image
        src="/images/black-peak-outlaw.webp"
        alt="Black Peak Outlaw Poster"
        fill
        priority
        className="object-cover blur-2xl opacity-40 scale-110"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      {/* Varsinainen juliste – näkyy kokonaan */}
      <div className="relative z-0 flex h-full w-full items-center justify-center">
        <Image
          src="/images/black-peak-outlaw.webp"
          alt="Black Peak Outlaw Poster"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Hampurilainen vasempaan yläkulmaan */}
      <button
        onClick={() => setOpen(false)}
        className="absolute left-4 top-4 z-20 rounded-xl bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md ring-1 ring-white/15 hover:bg-white/15"
      >
        ☰ Menu
      </button>

      {/* 📿 KUNINGASKETJU-PAINIKE */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Avaa tuotteet"
        className="absolute z-10"
        style={{
          left: "50%",   // säädä, että ketju osuu miehen kaulalle
          top: "48%",    // hienosäätö eri kuvasuhteilla
          transform: "translate(-50%, -50%)",
        }}
        initial={{ scale: 0.96, opacity: 0.95 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Hopeinen “kuningasketju” */}
        <motion.div
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="drop-shadow-[0_0_12px_rgba(200,200,255,0.5)]"
        >
          <ChainSVG className="w-[240px] h-[120px] text-slate-200/95" />
        </motion.div>
      </motion.button>

      {/* Tuotevalikko (popover) */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute z-20 left-1/2 top-[60%] -translate-x-1/2 w-[min(92vw,520px)] rounded-2xl bg-black/75 p-4 text-white ring-1 ring-white/10 backdrop-blur-md"
          >
            <h3 className="mb-2 text-lg font-semibold tracking-wide">Tuotteet</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <MenuLink href="/products?cat=kaulakorut">Hopeiset kaulakorut</MenuLink>
              <MenuLink href="/products?cat=rannekorut">Hopeiset rannekorut</MenuLink>
              <MenuLink href="/products?cat=kuningasketju">Kuningasketjut</MenuLink>
              <MenuLink href="/products?cat=custom">Custom-tilaukset</MenuLink>
              <MenuLink href="/products?filter=price-asc">Hinta-suodatin</MenuLink>
              <MenuLink href="/about">About / Yhteystiedot</MenuLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </section>
  );
}

/* Pieni linkkikomponentti valikolle */
function MenuLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-lg px-3 py-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
    >
      {children}
    </a>
  );
}

/* Yksinkertainen “kuningasketju”-SVG */
function ChainSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 150"
      className={className}
      fill="none"
      stroke="currentColor"
      role="img"
      aria-hidden="true"
    >
      {/* kaulakaari */}
      <path
        d="M20,20 C80,120 220,120 280,20"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* yksittäisiä lenkkejä */}
      {Array.from({ length: 13 }).map((_, i) => {
        const x = 30 + i * 20;
        const y = 35 + Math.sin(i / 2) * 6;
        return <ellipse key={i} cx={x} cy={y} rx="10" ry="6" strokeWidth="4" />;
      })}
      {/* kiiltopiste */}
      <circle cx="150" cy="28" r="3" fill="white" opacity="0.9" />
    </svg>
  );
}
