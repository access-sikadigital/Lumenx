"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * App-wide smooth scrolling with Lenis, synced to GSAP ScrollTrigger so
 * scroll-driven animations stay in step. Respects prefers-reduced-motion.
 *
 * Three things here exist because of a real failure: whole sections rendering
 * as invisible ghosts and never appearing.
 *
 * Almost every section animates in with `gsap.from(..., { opacity: 0 })` gated
 * on a ScrollTrigger. `.from()` paints the start state IMMEDIATELY, so those
 * elements begin at opacity 0 and only become visible when their trigger
 * fires. If ScrollTrigger's measurements are stale, the trigger never fires
 * and the content stays invisible permanently. There are 108 such tweens
 * across 23 components, so this is not a per-component problem to patch.
 *
 *   1. ScrollTrigger was synced through a dynamic import(), so for the first
 *      frames after mount Lenis was scrolling with nothing listening. It is
 *      now imported statically and wired before Lenis starts.
 *
 *   2. Lenis ran on its own requestAnimationFrame while GSAP ran on its
 *      ticker. Two loops, no guaranteed order. They now share GSAP's ticker,
 *      which is the canonical integration.
 *
 *   3. Nothing ever called ScrollTrigger.refresh(). Start positions were
 *      computed once, before lazy images and webfonts had settled, and then
 *      never corrected. This is what actually stranded the cards: making the
 *      service images larger pushed their decode past the point where the
 *      positions had already been measured.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Even with motion reduced, positions still need to be correct: the
    // components skip their tweens, but anything else driven by scroll does
    // not, and a stale measurement is still a bug.
    const refresh = () => ScrollTrigger.refresh();

    // Late-settling layout: webfonts swapping metrics, and images that decode
    // after first paint. Both change document height after the first measure.
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    // Catch-all for anything that changes the page height afterwards, such as
    // a below-the-fold image finishing decode. Debounced, because a refresh is
    // a full re-measure of every trigger on the page.

    /* ------------------------------------------------------------------
       Safety net.

       Everything above makes the measurements correct, but correctness here
       is load-order dependent and this is content, not decoration: if a
       trigger misses, a visitor reads a blank section and leaves.

       A one-shot sweep is the wrong shape for that, because it can only
       rescue what is already at the fold. This watches instead: any element
       GSAP has parked at opacity 0 is observed, and if it is still invisible
       a beat after it enters the viewport, it is revealed outright.

       The delay is what keeps this from fighting the real animation. When
       ScrollTrigger is working the tween has already started by then, opacity
       is above zero, and this does nothing at all. It only acts when the
       reveal genuinely failed.
    ------------------------------------------------------------------ */
    const hidden = (el) => parseFloat(getComputedStyle(el).opacity) < 0.01;

    const force = (el) => {
      gsap.killTweensOf(el);
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, clearProps: "transform" });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          setTimeout(() => {
            if (document.contains(el) && hidden(el)) force(el);
          }, 260);
        });
      },
      { rootMargin: "0px 0px -5% 0px" }
    );

    // Re-scan after each settle point, since sections mount and animate in at
    // different times and new hidden elements appear as the page fills out.
    const watch = () => {
      document.querySelectorAll('[style*="opacity"]').forEach((el) => {
        if (hidden(el)) io.observe(el);
      });
    };
    // The same debounce drives both: whenever the page changes height, the
    // measurements are re-taken AND any newly hidden element is picked up.
    // This effect runs once for the whole app, so without the second call a
    // route change would render content the observer had never seen.
    let t;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => {
        refresh();
        watch();
      }, 180);
    });
    ro.observe(document.body);

    const w1 = setTimeout(watch, 400);
    const w2 = setTimeout(watch, 1500);
    const w3 = setTimeout(watch, 3500);
    window.addEventListener("load", watch);

    if (reduce) {
      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("load", watch);
        [t, w1, w2, w3].forEach(clearTimeout);
        io.disconnect();
        ro.disconnect();
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (n) => Math.min(1, 1.001 - Math.pow(2, -10 * n)),
      smoothWheel: true,
    });

    // Wired before the first frame, not after a promise resolves.
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // One loop for both. GSAP's ticker passes seconds, Lenis wants ms.
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      window.removeEventListener("load", refresh);
      window.removeEventListener("load", watch);
      [t, w1, w2, w3].forEach(clearTimeout);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return null;
}
