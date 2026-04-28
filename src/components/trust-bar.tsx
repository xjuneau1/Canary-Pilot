"use client";

import { useScrollReveal } from "../hooks/use-scroll-reveal";

const pills = [
  { icon: "🤖", label: "AI-Powered Analysis" },
  { icon: "📱", label: "Real Device Matrix" },
  { icon: "🚫", label: "Zero False Positives" },
  { icon: "📸", label: "Screenshot Evidence" },
  { icon: "⚡", label: "Results in Minutes" },
  { icon: "🔧", label: "No Setup Required" },
];

export default function TrustBar() {
  const ref = useScrollReveal({ variant: "up", delay: 0, threshold: 0.1 });
  return (
    <section className="px-6 pb-16">
      <div ref={ref} className="flex flex-wrap gap-2 items-center">
        {pills.map((pill) => (
          <span
            key={pill.label}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
          >
            <span aria-hidden="true">{pill.icon}</span>
            {pill.label}
          </span>
        ))}
      </div>
    </section>
  );
}
