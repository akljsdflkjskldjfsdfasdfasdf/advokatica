"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero({ showMobileCta, scrollPct }) {
  const heroRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCtaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Hero intro animacija ──
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .fromTo(
          ".hero-label",
          { opacity: 0, x: -28 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        )
        .to(
          ".hero-line > span",
          { y: 0, stagger: 0.14, duration: 1.3, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          heroSubRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          "-=0.5",
        )
        .fromTo(
          heroCtaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.1",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* Mobile Floating CTA */}
      <div
        className={`mobile-cta md:hidden ${showMobileCta ? "" : "hidden-cta"}`}
      >
        <a
          href="#kontakt"
          className="btn-primary shadow-xl"
          style={{ background: "#000" }}
        >
          <span>Zakaži termin</span>
        </a>
      </div>

      {/* ═══════ HERO — min-h-screen, slika i sadržaj ═══════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "#030201" }}
      >
        {/* Background photo */}
        <div
          className="absolute inset-0 z-[0]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1800&q=80&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: 0.78,
          }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 110% 100% at 60% 50%, rgba(3,2,1,0.55) 0%, rgba(3,2,1,0.88) 70%)",
          }}
        />

        {/* Zlatni glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[3]"
          style={{
            width: "72vw",
            height: "72vw",
            background:
              "radial-gradient(circle, rgba(201,168,76,.07) 0%, rgba(201,168,76,.02) 40%, transparent 70%)",
          }}
        />

        {/* Edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[4]"
          style={{
            background:
              "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 38%, rgba(3,2,1,.85) 100%)",
          }}
        />

        {/* Vertikalne linije */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
          {[1, 3].map((col) => (
            <div
              key={col}
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: `${col * 25}%`,
                background:
                  "linear-gradient(to bottom, transparent, rgba(201,168,76,.08) 25%, rgba(201,168,76,.08) 75%, transparent)",
              }}
            />
          ))}
        </div>

        {/* Sadržaj */}
        <div className="relative z-[5] max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16 w-full">
          <div
            className="hero-label flex items-center gap-4 mb-10"
            style={{ opacity: 0 }}
          >
            <div className="w-10 h-px bg-gold-vivid" />
            <span
              className="font-ui text-[0.65rem] tracking-[0.26em] uppercase"
              style={{ color: "var(--gold-vivid)" }}
            >
              Pravna kancelarija · Žabalj
            </span>
          </div>

          <div className="mb-8">
            {[
              { text: "Vaša pravna", italic: false },
              { text: "sigurnost.", italic: true },
              { text: "Naš prioritet.", italic: false },
            ].map((line, i) => (
              <div key={i} className="hero-line overflow-hidden">
                <span
                  className={`block font-display leading-[1.04] ${line.italic ? "italic" : ""}`}
                  style={{
                    fontSize: "clamp(2.9rem, 7.2vw, 7.8rem)",
                    color: line.italic ? "var(--gold-vivid)" : "var(--cream)",
                    transform: "translateY(110%)",
                    letterSpacing: "-0.022em",
                  }}
                >
                  {line.text}
                </span>
              </div>
            ))}
          </div>

          <p
            ref={heroSubRef}
            className="font-body text-xl md:text-2xl max-w-lg leading-relaxed mb-10"
            style={{ opacity: 0, color: "var(--cream-muted)" }}
          >
            Predani zaštiti Vaših prava i interesa u svakom predmetu.
          </p>

          <div
            ref={heroCtaRef}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10"
            style={{ opacity: 0 }}
          >
            <div className="magnetic-wrap">
              <a href="#kontakt" className="btn-primary btn-primary-pulse">
                <span>Zakaži konsultaciju</span>
              </a>
            </div>
            <a href="#usluge" className="btn-ghost">
              <span className="btn-line" />
              <span>Pogledaj usluge</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
      </section>
    </>
  );
}
