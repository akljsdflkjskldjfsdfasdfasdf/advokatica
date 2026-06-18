"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Stats() {
  const statsBarRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Bar — fade in kada dođe u viewport ──
      gsap.fromTo(
        statsBarRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsBarRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );

      // ── Brojevi — animiraju se kada bar uđe u viewport ──
      gsap.utils.toArray(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.target || "0");
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2.4,
            ease: "power1.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: statsBarRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    }, statsBarRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={statsBarRef}
      className="relative z-10 w-full border-t border-charcoal-300"
      style={{
        background: "black",
        opacity: 0,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 divide-x divide-charcoal-300">
          {[
            { num: 500, suffix: "+", label: "Rešenih predmeta" },
            { num: 98, suffix: "%", label: "Procenat uspeha" },
          ].map((stat) => (
            <div key={stat.label} className="stat-item text-center py-10">
              <div
                className="font-display text-3xl md:text-4xl tracking-tight"
                style={{ color: "var(--gold-vivid)" }}
              >
                <span className="stat-num" data-target={stat.num}>
                  0
                </span>
                <span>{stat.suffix}</span>
              </div>
              <div
                className="font-ui mt-2"
                style={{
                  fontSize: ".625rem",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "var(--cream-muted)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
