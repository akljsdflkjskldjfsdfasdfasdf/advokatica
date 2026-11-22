"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useReveal } from "./reveal";

const STEPS = [
  {
    num: "I",
    title: "Konsultacija",
    desc: "Prvi razgovor u kome pažljivo analiziramo Vaš slučaj i procenjujemo sve pravne mogućnosti.",
  },
  {
    num: "II",
    title: "Strategija",
    desc: "Izrađujemo preciznu pravnu strategiju prilagođenu Vašim ciljevima, rokovima i okolnostima.",
  },
  {
    num: "III",
    title: "Zastupanje",
    desc: "Aktivno i posvećeno zastupamo Vaše interese pred svim nadležnim organima i sudovima.",
  },
  {
    num: "IV",
    title: "Ishod",
    desc: "Pratimo predmet do konačnog rešenja. Potpuna transparentnost i redovna komunikacija u svakom koraku.",
  },
];

export default function Process() {
  const sectionRef = useRef(null);

  useReveal(sectionRef, (root) => {
    // rombovi se pojave jedan za drugim, linije između njih se iscrtaju
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.querySelector(".process-row"), start: "top 80%", once: true },
    });
    tl.fromTo(
      root.querySelectorAll(".process-diamond"),
      { opacity: 0, scale: 0.4 },
      { opacity: 1, scale: 1, duration: 0.9, stagger: 0.18, ease: "back.out(1.7)" },
    )
      .fromTo(
        root.querySelectorAll(".process-text"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.18, ease: "power3.out" },
        0.15,
      )
      .fromTo(
        root.querySelectorAll(".step-connector"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, stagger: 0.18, ease: "power2.inOut" },
        0.45,
      );
  });

  return (
    <section ref={sectionRef} id="proces" className="sec-dark relative py-24 lg:py-32 overflow-hidden">
      {/* blago svetlo odozgo (neutralno, bez braon tona) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(255,255,255,.06) 0%, transparent 70%), radial-gradient(40% 40% at 100% 100%, rgba(201,162,76,.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 lg:mb-20">
          <p className="eyebrow centered fade-up mb-6">Kako radimo</p>
          <h2 className="h-section fade-up">
            Jednostavan proces,
            <br />
            <span className="accent">jasni rezultati</span>
          </h2>
        </div>

        <div className="process-row relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {/* linije između rombova (samo računar) — od ivice jednog romba do ivice sledećeg */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="step-connector hidden lg:block"
              aria-hidden="true"
              style={{
                left: `calc(${i} * (25% + 0.5rem) + 12.5% + 3.45rem)`,
                width: "calc(25% - 7.9rem)",
              }}
            />
          ))}

          {STEPS.map((step) => (
            <div key={step.num} className="process-step text-center">
              <div className="process-diamond anim-hide">
                <span className="step-num">{step.num}</span>
              </div>
              <div className="process-text anim-hide">
                <h3 className="font-display text-[1.5rem] leading-tight text-on-dark mb-3">
                  {step.title}
                </h3>
                <p className="text-[0.98rem] leading-relaxed text-on-dark-2 max-w-xs mx-auto">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
