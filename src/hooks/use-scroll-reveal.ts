"use client";

import { useEffect, useRef } from "react";

type RevealVariant = "up" | "left" | "right" | "scale";

interface ScrollRevealOptions {
  variant?: RevealVariant;
  delay?: number;   // ms
  threshold?: number; // 0–1, fraction of element visible before triggering
}

/**
 * Attaches a scroll-reveal animation to the returned ref.
 * The element starts hidden (via the `reveal` CSS class) and gains
 * `animate-{variant}` once it crosses the viewport threshold.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  variant = "up",
  delay = 0,
  threshold = 0.3,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reveal");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const run = () => el.classList.add(`animate-${variant}`);
          if (delay > 0) {
            const t = setTimeout(run, delay);
            observer.disconnect();
            return () => clearTimeout(t);
          }
          run();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [variant, delay, threshold]);

  return ref;
}
