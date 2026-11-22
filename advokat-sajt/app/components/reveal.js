"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Da li je u sistemu uključeno „smanji animacije" (tada CSS odmah prikazuje sve) */
export function reduceMotion() {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

const once = (trigger, start = "top 88%") => ({ trigger, start, once: true });

/**
 * Zajedničke animacije ulaska za jednu sekciju — hvataju SAMO elemente unutar `scopeRef`:
 * .fade-up / .fade-left / .fade-right, .stagger-child (redom, kako ulaze u ekran), .anim-line (linija se iscrta).
 * `extra(root)` dodaje posebne animacije te sekcije (u istom GSAP kontekstu, pa se sve uredno poništi).
 */
export function useReveal(scopeRef, extra) {
  useEffect(() => {
    if (reduceMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const root = scopeRef.current;
    if (!root) return;
    const all = (sel) => Array.from(root.querySelectorAll(sel));
    const ease = "power3.out";

    const ctx = gsap.context(() => {
      all(".fade-up").forEach((el) =>
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease, scrollTrigger: once(el) }),
      );
      all(".fade-left").forEach((el) =>
        gsap.fromTo(el, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1.1, ease, scrollTrigger: once(el) }),
      );
      all(".fade-right").forEach((el) =>
        gsap.fromTo(el, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1.1, ease, scrollTrigger: once(el) }),
      );
      all(".anim-line").forEach((el) =>
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "power3.inOut", scrollTrigger: once(el, "top 92%") }),
      );
      // kartice ulaze red po red, tek kada stvarno dođu na ekran
      const kids = all(".stagger-child");
      if (kids.length) {
        ScrollTrigger.batch(kids, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(batch, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.95, stagger: 0.12, ease, overwrite: true }),
        });
      }
      extra?.(root);
    }, root);

    return () => ctx.revert();
    // animacije se postavljaju jednom, pri prvom prikazu sekcije
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
