"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero – Black Peak (Vercel build fix)
 * - useReducedMotion() -> boolean coercion (!!) to avoid boolean|null TS error
 */

export default function Hero() {
  // Vercel/SSR: coerce to boolean to avoid boolean|null
  const reduce = !!useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <motion.section
      className="relative h-[100svh] w-full overflow-hidden bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
    >
      {/* 🏔️ Taustakuva */}
      <img
        src="/images/black-peak-hero.webp"
        alt="Lumihuippuinen Black Peak -vuori sumun keskellä"
        className="absolute inset-0 h-full w-full object-cover scale-125 md:scale-110 opacity-95 bg-black"
        style={{ objectPosition: "center 18%" }}
        fetchPriority="high"
      />

      {/* 🌫️ Sumu (kevyt efekti) */}
      <FogLayer speed={50} opacity={0.55} />
      <FogLayer speed={70} opacity={0.45} invert />

      {/* ☰ Valikkopainike */}
      <button
        aria-label="Avaa valikko"
        className="absolute left-4 top-4 z-30 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
        onClick={() =>
          document.getElementById("site-menu")?.classList.toggle("hidden")
        }
      >
        ☰ Menu
      </button>

      {/* 💎 Timantti */}
      <motion.button
        aria-label="Näytä tietoja yrityksestä"
        onClick={() => setOpen(true)}
        className="absolute left-1/2 top-[38%] z-20 -translate-x-1/2"
        whileHover={{ scale: 1.08 }}
      >
        {!reduce && (
          <motion.span
            className="absolute -inset-6 rounded-full bg-cyan-300/20 blur-2xl"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <DiamondPulsing
          className="h-8 w-8 drop-shadow-[0_0_14px_rgba(147,255,255,0.85)]"
          reduce={reduce}
        />
      </motion.button>

      {/* 💬 Puhekupla */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute left-1/2 top-[31%] z-20 -translate-x-1/2"
      >
        <div className="rounded-2xl bg-white/90 px-2.5 py-0.5 text-[10px] md:text-xs font-semibold text-black shadow">
          HEY I’M HERE • HEI OLEN TÄÄLLÄ
        </div>
      </motion.div>

      {/* 🥾 Reissaajat */}
      <motion.div
        className="absolute bottom-8 left-6 z-10"
        animate={reduce ? {} : { x: [0, 40] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <HikersSVG className="h-10 w-24 opacity-80" />
      </motion.div>

      {/* 📋 Valikko */}
      <nav
        id="site-menu"
        className="hidden absolute left-4 top-16 z-30 w-72 rounded-2xl bg-white/95 p-4 text-black shadow-xl"
      >
        <h3 className="mb-2 text-lg font-bold">Valikko</h3>
        <ul className="space-y-2">
          <li>
            <a className="hover:underline" href="#bracelets">
              Hopea rannekorut
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#necklaces">
              Hopea kaulakorut
            </a>
          </li>
          <li>
            <label className="block text-sm font-medium">Hinta</label>
            <input
              type="range"
              min={50}
              max={1500}
              defaultValue={300}
              className="w-full"
              aria-label="Hinta suodatin"
            />
          </li>
        </ul>
      </nav>

      {/* 🪟 Popup – yritystiedot */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="absolute inset-0 z-40 grid place-items-center bg-black/70 p-4"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 text-black shadow-2xl">
            <h2 className="mb-2 text-2xl font-bold">
              BLACK PEAK — käsintehdyt hopeakorut
            </h2>
            <p className="mb-4 text-sm">
              Tässä voi olla yrityksen kuvaus, valmistusmenetelmät (esim. punottu
              kuningasketju), materiaalit, toimitustiedot ja yhteys.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl bg-black px-4 py-2 font-semibold text-white hover:bg-black/80"
            >
              Sulje
            </button>
          </div>
        </div>
      )}
    </motion.section>
  );
}

/* --- 🌫️ Sumu --- */
function FogLayer({
  speed = 50,
  opacity = 0.6,
  invert = false,
}: {
  speed?: number;
  opacity?: number;
  invert?: boolean;
}) {
  // Coerce to boolean (avoid boolean|null)
  const reduce = !!useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-screen"
      style={{ opacity }}
      animate={
        reduce
          ? {}
          : {
              x: invert ? ["0%", "-2%", "1%", "0%"] : ["0%", "2%", "-1%", "0%"],
            }
      }
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves={3}
            seed={7}
            result="turb"
          />
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" fill="white" />
      </svg>
    </motion.div>
  );
}

/* --- 💎 Timantti --- */
function DiamondPulsing({
  className = "",
  reduce,
}: {
  className?: string;
  reduce: boolean; // always boolean now
}) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Timantti"
      animate={
        reduce
          ? {}
          : {
              scale: [1, 1.12, 1],
              filter: [
                "drop-shadow(0 0 6px rgba(147,255,255,0.7))",
                "drop-shadow(0 0 16px rgba(147,255,255,1))",
                "drop-shadow(0 0 6px rgba(147,255,255,0.7))",
              ],
            }
      }
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id="g" cx="50%" cy="35%">
          <stop offset="0" stopColor="#e8ffff" />
          <stop offset="1" stopColor="#00a3a3" />
        </radialGradient>
      </defs>
      <path
        d="M8 22 L24 8 H40 L56 22 L32 56 Z"
        fill="url(#g)"
        stroke="white"
        strokeWidth="2"
      />
      <line x1="24" y1="8" x2="32" y2="56" stroke="white" strokeWidth="1" />
      <line x1="40" y1="8" x2="32" y2="56" stroke="white" strokeWidth="1" />
    </motion.svg>
  );
}

/* --- 🥾 Reissaajat --- */
function HikersSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 80"
      fill="currentColor"
      aria-hidden="true"
    >
      <g opacity="0.9">
        <circle cx="25" cy="55" r="6" />
        <rect x="22" y="30" width="6" height="26" />
        <rect x="18" y="35" width="14" height="4" />
        <rect x="28" y="36" width="24" height="2" />
      </g>
      <g opacity="0.8" transform="translate(60,0)">
        <circle cx="25" cy="55" r="6" />
        <rect x="22" y="30" width="6" height="26" />
        <rect x="18" y="35" width="14" height="4" />
        <rect x="28" y="36" width="24" height="2" />
      </g>
      <g opacity="0.7" transform="translate(120,0)">
        <circle cx="25" cy="55" r="6" />
        <rect x="22" y="30" width="6" height="26" />
        <rect x="18" y="35" width="14" height="4" />
        <rect x="28" y="36" width="24" height="2" />
      </g>
    </svg>
  );
}
