"use client";

import { useScrollReveal } from "../hooks/use-scroll-reveal";
import WaitlistButton from "./waitlist-button";

const cards = [
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-amber-500"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 10l2.5 2.5L14 8" strokeWidth="1.5" />
      </svg>
    ),
    stat: "Real-world coverage",
    heading: "Tests the browsers & devices your users actually use",
    detail:
      "Desktop, mobile, tablet — Chrome, Safari, Firefox. If your users see it, Canary will test it.",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-amber-500"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 13h6M9 17h4" />
        <circle
          cx="17"
          cy="17"
          r="3"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
        />
        <path d="M16 17l.75.75L18.5 16" strokeWidth="1.5" />
      </svg>
    ),
    stat: "Fix-ready findings",
    heading: "Every bug ships with a screenshot, URL, and plain-English cause",
    detail:
      "No cryptic error codes. Just clear, actionable reports your whole team can understand.",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-amber-500"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    stat: "Signal, not noise",
    heading: "AI-verified alerts — only real issues, zero phantom warnings",
    detail:
      "Our AI cross-validates every finding before it reaches you. If Canary reports a bug, it's real.",
  },
];

export default function FeaturesSection() {
  const headingRef = useScrollReveal({ variant: "up" });
  const card0 = useScrollReveal({ variant: "up", delay: 0 });
  const card1 = useScrollReveal({ variant: "up", delay: 100 });
  const card2 = useScrollReveal({ variant: "up", delay: 200 });
  const ctaRowRef = useScrollReveal({ variant: "up", delay: 80 });

  const cardRefs = [card0, card1, card2];

  return (
    <section className="w-full mb-20 px-6">
      <div ref={headingRef} className="text-center mb-10">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
          Why teams choose CanaryBox
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Built to catch what others miss
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            ref={cardRefs[i]}
            key={card.heading}
            className="group relative bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden hover:border-amber-500/40 dark:hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-default select-none"
            tabIndex={-1}
          >
            {/* Card-wide radial glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            >
              <div className="w-full h-full bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,rgba(245,158,11,0.13),transparent)] dark:bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,rgba(245,158,11,0.10),transparent)] rounded-2xl" />
            </div>
            {/* Top accent line on hover */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            {/* Icon hero zone */}
            <div className="relative flex justify-center items-center pt-14 pb-12 overflow-visible z-10">
              <div className="absolute h-44 w-44 rounded-full border border-amber-500/10 pointer-events-none" />
              <div className="absolute h-32 w-32 rounded-full border border-amber-500/15 bg-amber-500/[0.03] pointer-events-none" />
              <div className="relative z-10 h-[80px] w-[80px] rounded-2xl bg-gradient-to-br from-amber-500/25 to-orange-500/10 border border-amber-500/30 dark:border-amber-500/25 flex items-center justify-center shadow-xl shadow-amber-500/15 group-hover:shadow-amber-500/30 group-hover:border-amber-500/50 group-hover:scale-105 transition-all duration-300">
                {card.icon}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 px-7 pb-8">
              <h3 className="text-[13px] font-bold text-amber-600 dark:text-amber-400/80 uppercase tracking-widest">
                {card.stat}
              </h3>
              <p className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                {card.heading}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                {card.detail}
              </p>
            </div>
          </div>
        ))}

        {/* Bottom CTA row */}
        <div ref={ctaRowRef} className="md:col-span-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              Ready to launch with confidence?
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Let CanaryBox be your QA team. No code, no setup — just results.
            </p>
          </div>
          <WaitlistButton
            label="Get Early Access →"
            className="shrink-0 px-6 py-2.5 rounded-lg bg-amber-500 text-white font-bold text-sm hover:bg-amber-400 transition whitespace-nowrap shadow-lg shadow-amber-500/20"
          />
        </div>
      </div>
    </section>
  );
}
