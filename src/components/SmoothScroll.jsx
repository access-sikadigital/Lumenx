"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * App-wide smooth scrolling with Lenis, synced to GSAP ScrollTrigger so
 * scroll-driven animations stay in step. Respects prefers-reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let stAdded = false;
    // Lazily sync with ScrollTrigger if GSAP is loaded on the page.
    import("gsap/ScrollTrigger")
      .then(({ ScrollTrigger }) => {
        lenis.on("scroll", ScrollTrigger.update);
        stAdded = true;
      })
      .catch(() => {});

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
