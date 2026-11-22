"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useReveal } from "./reveal";

const STATS = [
  { num: 500, suffix: "+", label: "Rešenih predmeta" },
  { num: 98, suffix: "%", label: "Procenat uspeha" },
];

export default function Stats() {
  const barRef = useRef(null);

  useReveal(barRef, (root) => {
    // brojevi odbrojavaju od nule kada traka uđe u ekran (u HTML-u su odmah pravi brojevi)
    root.querySelectorAll(".stat-num").forEach((el) => {
      const target = Number(el.dataset.target || 0);
      gsap.fromTo(
        el,
        { textContent: 0 },
        {
          textContent: target,
          duration: 2.4,
          ease: "power1.out",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: root, start: "top 90%", once: true },
        },
      );
    });
  });

  return (
    <div ref={barRef} className="sec-ink relative border-t border-white/10">
      <div className="fade-up max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-value">
                <span className="stat-num" data-target={stat.num}>
                  {stat.num}
                </span>
                <span>{stat.suffix}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
