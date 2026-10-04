"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight scroll-reveal. Adds `.is-in` when the element enters the
 * viewport (CSS in globals.css does the transition). No library needed, and
 * it degrades to fully visible with reduced motion.
 */
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    el.style.transitionDelay = `${delay}s`;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      /* Fires EARLIER than it used to. The old settings waited for 15% of the
         element to be inside a root shortened by 8%, so a tall section only
         began fading in once a good part of it was already being read. The
         root now extends 15% BELOW the viewport and any intersection at all
         counts, so the transition is finished by the time the content is in
         comfortable reading position. */
      { threshold: 0, rootMargin: "0px 0px 15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
