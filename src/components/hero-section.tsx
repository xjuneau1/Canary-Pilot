"use client";

import { useScrollReveal } from "../hooks/use-scroll-reveal";
import WaitlistButton from "./waitlist-button";

export default function HeroSection() {
  const badgeRef = useScrollReveal({ variant: "up", delay: 0 });
  const headingRef = useScrollReveal({ variant: "up", delay: 80 });
  const subRef = useScrollReveal({ variant: "up", delay: 160 });
  const ctaRef = useScrollReveal({ variant: "up", delay: 240 });

  return (
    <section className="relative px-6 pt-16 pb-20">
      {/* Ambient glow orb */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-[700px] h-[600px] rounded-full opacity-50 dark:opacity-30"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.4) 0%, rgba(234,88,12,0.18) 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-3xl">
        {/* Eyebrow badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-8">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider sm:tracking-widest uppercase whitespace-nowrap">
            Pilot Launch — Early Access Now Open
          </span>
        </div>

        {/* Headline */}
        <h1 ref={headingRef} className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white leading-[1.05] mb-6 tracking-tight">
          Find bugs before
          <br />
          your <span className="text-amber-500">users</span> do.
        </h1>

        {/* Sub-headline */}
        <div ref={subRef}>
          <p className="text-lg font-light text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mb-4">
            CanaryBox crawls your live app, simulates a first-time user across real devices and browsers,
            and delivers plain-English bug reports with screenshots — automatically.
          </p>
          <p className="text-base font-light text-slate-400 dark:text-slate-500 leading-relaxed max-w-xl mb-10">
            No scripts. No setup. No noise.
          </p>
        </div>

        {/* CTA row */}
        <div ref={ctaRef} className="flex items-center gap-4 flex-wrap">
          <WaitlistButton
            label="Get Early Access →"
            className="px-7 py-3.5 rounded-lg bg-amber-500 text-white font-bold text-sm hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/30"
          />
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Free during pilot &nbsp;·&nbsp; No credit card required
          </span>
        </div>
      </div>
    </section>
  );
}
