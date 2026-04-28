"use client";

import { useScrollReveal } from "../hooks/use-scroll-reveal";
import WaitlistButton from "./waitlist-button";

const perks = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Free while we're in pilot",
    desc: "Full access with no payment required. No hidden trials.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Founding member perks",
    desc: "Discounted pricing and direct access to our support team.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Shape what we build",
    desc: "Your feedback directly drives the roadmap — not a suggestion box.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Skip the waitlist at launch",
    desc: "Get early access before the public launch — no backfill queue.",
  },
];

export default function FinalCta() {
  const leftRef  = useScrollReveal({ variant: "left",  delay: 0 });
  const rightRef = useScrollReveal({ variant: "right", delay: 120 });

  return (
    <section className="px-6 mb-24">
      <div className="relative bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        {/* Amber top-edge glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"
          aria-hidden="true"
        />
        {/* Background glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 px-8 py-12 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: headline + CTA */}
            <div ref={leftRef}>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-widest uppercase">
                  Limited pilot spots
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
                Be first 
                <span className="text-amber-500"> in line.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8 max-w-md">
                Join the CanaryBox pilot for free access to AI-powered testing that surfaces real issues 
                before they reach production — no QA team needed.
              </p>
              <WaitlistButton
                label="Start for free →"
                className="inline-flex items-center px-8 py-4 rounded-lg bg-amber-500 text-white font-bold text-base hover:bg-amber-400 active:scale-95 transition-all shadow-xl shadow-amber-500/30"
              />
              <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                Free during pilot &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Cancel anytime
              </p>
            </div>

            {/* Right: perks list */}
            <div ref={rightRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                    {perk.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">
                      {perk.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
