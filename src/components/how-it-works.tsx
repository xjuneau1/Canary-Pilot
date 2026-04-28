"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";

// ─── Canary sprite ────────────────────────────────────────────────────────────
// Spritesheet: 1536×1024, 5 cols × 2 rows → each source frame ~307×512px
const SPRITE_COLS = 5;
const SPRITE_ROWS = 2;
const SPRITE_FRAMES = SPRITE_COLS; // 5 frames — first row only (no Y shift)
const SPRITE_FPS = 8;
const SPRITE_W = 48;
const SPRITE_H = 80;

function frameBgPos(frame: number): string {
  const col = frame % SPRITE_COLS;
  const x = (col / (SPRITE_COLS - 1)) * 100;
  return `${x}% 0%`;
}

function CanarySprite() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setFrame((f) => (f + 1) % SPRITE_FRAMES),
      1000 / SPRITE_FPS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="img"
      aria-label="Canary bird flapping wings"
      style={{
        width: SPRITE_W,
        height: SPRITE_H,
        backgroundImage: "url('/canary_spritesheet_hd.png')",
        backgroundSize: `${SPRITE_COLS * 100}% ${SPRITE_ROWS * 100}%`,
        backgroundPosition: frameBgPos(frame),
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

// ─── Step data ────────────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Paste your URL", sub: "Any live web app — no access needed" },
  { num: "02", title: "Canary crawls & simulates", sub: "Across devices, browsers, viewports" },
  { num: "03", title: "AI generates the report", sub: "Plain-language bugs with screenshots" },
  { num: "04", title: "Ship with confidence", sub: "From idea to production, no surprises" },
];

const SLIDE_DURATION = 600;
const STEP_REVEAL_DELAY = 250;
const STEP_HOLD = 900;
const FLIP_DURATION = 350;

export default function HowItWorks() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [logoIndex, setLogoIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [facingRight, setFacingRight] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const delay = (ms: number) =>
      new Promise<void>((res) => setTimeout(res, ms));

    async function run() {
      await delay(400);
      if (cancelled) return;
      setVisibleCount(1);
      await delay(STEP_HOLD);

      for (let i = 1; i < steps.length; i++) {
        if (cancelled) return;
        setIsSliding(true);
        setLogoIndex(i);
        await delay(SLIDE_DURATION);
        if (cancelled) return;
        setIsSliding(false);
        await delay(STEP_REVEAL_DELAY);
        if (cancelled) return;
        setVisibleCount(i + 1);
        await delay(STEP_HOLD);
      }

      if (cancelled) return;
      setFacingRight(false);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const sectionLabelRef = useScrollReveal({ variant: "up", threshold: 0.1 });
  const logoLeftPct = logoIndex * 25 + 12.5;

  return (
    <section className="px-6 mb-20">
      <p ref={sectionLabelRef} className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-5">
        How it works
      </p>

      <div className="relative mb-10">
        {/* Canary track */}
        <div
          className="relative h-24 mb-2 select-none pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute bottom-2 left-[12.5%] right-[12.5%] h-px bg-amber-500/20" />

          <div
            className="absolute bottom-2 -translate-x-1/2"
            style={{
              left: `${logoLeftPct}%`,
              transition: isSliding
                ? `left ${SLIDE_DURATION}ms ease-in-out`
                : "none",
            }}
          >
            <div
              style={{
                transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
                transition: `transform ${FLIP_DURATION}ms ease-in-out`,
              }}
            >
              <CanarySprite />
            </div>
          </div>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`relative bg-white dark:bg-[#0b1120] px-6 py-6 border-r border-b md:border-b-0 border-slate-200 dark:border-slate-800 last:border-r-0 transition-opacity duration-500 ${
                i < visibleCount ? "opacity-100" : "opacity-0"
              }`}
            >
              {i < steps.length - 1 && (
                <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 text-amber-500 text-xs font-bold bg-white dark:bg-[#0b1120] px-1">
                  →
                </span>
              )}
              <p className="font-mono text-xs text-slate-400 dark:text-slate-500 mb-2">
                {s.num} /
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                {s.title}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
