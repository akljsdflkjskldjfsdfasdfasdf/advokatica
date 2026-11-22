"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useReveal } from "./reveal";

const QUOTE_WORDS = "Pravda nije samo cilj — to je put kojim zajedno hodamo.".split(" ");

export default function Quote() {
  const sectionRef = useRef(null);

  useReveal(sectionRef, (root) => {
    // reč po reč
    gsap.fromTo(
      root.querySelectorAll(".quote-word"),
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 72%", once: true },
      },
    );
  });

  return (
    <section ref={sectionRef} className="sec-light relative py-24 lg:py-32 overflow-hidden">
      {/* paragraf — simbol prava, jedva vidljiv u pozadini */}
      <div className="paragraph-watermark hidden md:block" aria-hidden="true">
        §
      </div>

      <figure className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <div className="quote-glyph fade-up" aria-hidden="true">
          &ldquo;
        </div>
        <blockquote className="quote-text mb-10">
          <p>
            {QUOTE_WORDS.map((word, i) => (
              <span key={i} className="quote-word anim-hide inline-block mr-[0.26em]">
                {word}
              </span>
            ))}
          </p>
        </blockquote>
        <figcaption className="fade-up flex items-center justify-center gap-4">
          <span className="w-10 h-px bg-gold" aria-hidden="true" />
          <span className="font-ui text-[0.72rem] font-medium tracking-[0.3em] uppercase text-gold-deep">Maja Mrđen</span>
          <span className="w-10 h-px bg-gold" aria-hidden="true" />
        </figcaption>
      </figure>
    </section>
  );
}
