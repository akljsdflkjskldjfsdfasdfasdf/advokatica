"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TESTIMONIALS = [
  {
    quote:
      "Profesionalizam i posvećenost advokatice Mrđen prevazišli su sva moja očekivanja. Krivični postupak koji je trajao godinama rešen je u naše korist. Beskrajno zahvalan.",
    author: "Marko S.",
    detail: "Krivično pravo · 2023",
    stars: 5,
  },
  {
    quote:
      "Razvod je bio izuzetno težak period, ali uz stručnu i humanu podršku, uspeli smo da zaštitimo interese naše dece. Toplo preporučujem svima koji prolaze kroz sličnu situaciju.",
    author: "Milica V.",
    detail: "Porodično pravo · 2024",
    stars: 5,
  },
  {
    quote:
      "Kupovina stana prošla je savršeno zahvaljujući detaljnoj pravnoj proveri. Sve zamke u ugovoru su otkrivene na vreme. Profesionalnost na najvišem nivou.",
    author: "Dragan M.",
    detail: "Nekretnine · 2023",
    stars: 5,
  },
  {
    quote:
      "Nezakonit otkaz, mobing, sve je rešeno povoljno za mene uz minimalan stres. Advokatica Mrđen je uvek dostupna i izuzetno jasno objašnjava svaki korak.",
    author: "Jelena R.",
    detail: "Radno pravo · 2024",
    stars: 5,
  },
];

const Arrow = ({ dir }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </svg>
);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  /** Položaji na koje karusel može da stane (početak svake kartice, poslednji = kraj) */
  const [stops, setStops] = useState([0]);
  const [active, setActive] = useState(0);

  // Animacije ulaska — samo unutar ove sekcije (ranije su hvatale elemente sa cele strane)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".section-glow").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.88 },
          { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } },
        );
      });
      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 54 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          },
        );
      });
      gsap.utils.toArray(".fade-right").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.05,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /** Izmeri gde karusel može da stane (zavisi od širine ekrana) i koja je tačkica aktivna */
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const base = track.firstElementChild?.offsetLeft ?? 0;
    const next = [];
    for (const card of track.children) {
      const left = Math.min(card.offsetLeft - base, max);
      if (!next.length || left - next[next.length - 1] > 8) next.push(left);
      if (left >= max) break;
    }
    setStops((prev) => (prev.length === next.length && prev.every((v, i) => Math.abs(v - next[i]) < 1) ? prev : next));
    let nearest = 0;
    next.forEach((v, i) => {
      if (Math.abs(v - track.scrollLeft) < Math.abs(next[nearest] - track.scrollLeft)) nearest = i;
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    track.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    // prevlačenje mišem na računaru (prst i točkić rade sami)
    let drag = null;
    const onDown = (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, moved: false };
    };
    const onMove = (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 4) {
        drag.moved = true;
        track.classList.add("is-dragging");
      }
      if (drag.moved) track.scrollLeft = drag.left - dx;
    };
    const onUp = () => {
      if (!drag) return;
      const moved = drag.moved;
      drag = null;
      track.classList.remove("is-dragging");
      if (moved) {
        // posle prevlačenja: zakači se za najbližu karticu
        const max = track.scrollWidth - track.clientWidth;
        const cards = [...track.children].map((c) => Math.min(c.offsetLeft - track.firstElementChild.offsetLeft, max));
        const target = cards.reduce((a, b) => (Math.abs(b - track.scrollLeft) < Math.abs(a - track.scrollLeft) ? b : a), 0);
        track.scrollTo({ left: target, behavior: "smooth" });
      }
    };
    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      track.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [measure]);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const idx = Math.max(0, Math.min(stops.length - 1, i));
    track.scrollTo({ left: stops[idx], behavior: "smooth" });
  };

  const atStart = active === 0;
  const atEnd = active >= stops.length - 1;

  return (
    <section
      ref={sectionRef}
      id="recenzije"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(175deg, #2a2317 0%, #211b12 50%, #282015 100%)",
      }}
    >
      <div
        className="section-glow absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "60vw",
          height: "40vw",
          background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,.14) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,.30) 25%, rgba(240,208,96,.48) 50%, rgba(201,168,76,.30) 75%, transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-8">
          <div>
            <p className="section-label fade-up mb-6">Recenzije klijenata</p>
            <h2 className="section-heading fade-up">
              Reči onih koji
              <br />
              <em className="not-italic" style={{ color: "var(--gold-vivid)" }}>
                su nam verovali
              </em>
            </h2>
          </div>
          <div className="fade-right flex items-end gap-6 lg:flex-col lg:items-end lg:gap-0">
            <div className="text-left lg:text-right">
              <div className="font-display text-5xl" style={{ color: "var(--gold-vivid)" }}>
                5.0
              </div>
              <div className="flex lg:justify-end gap-0.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">
                    ★
                  </span>
                ))}
              </div>
              <p
                className="font-ui"
                style={{ fontSize: ".75rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--cream-muted)" }}
              >
                Prosečna ocena
              </p>
            </div>
          </div>
        </div>

        {/* strelice levo-desno iznad kartica — na telefonu ih ne prekriva plutajuće dugme „Zakaži termin" */}
        <div className="fade-up mb-4 flex items-center justify-between gap-4">
          <p
            className="font-ui"
            style={{ fontSize: ".75rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(226,196,122,.85)", margin: 0 }}
          >
            <span className="hidden sm:inline">Prevucite ili koristite strelice</span>
            <span className="sm:hidden">Prevucite za više</span>
          </p>
          <div className="flex items-center gap-3">
            <button type="button" className="carousel-arrow" onClick={() => goTo(active - 1)} disabled={atStart} aria-label="Prethodna recenzija">
              <Arrow dir="left" />
            </button>
            <button type="button" className="carousel-arrow" onClick={() => goTo(active + 1)} disabled={atEnd} aria-label="Sledeća recenzija">
              <Arrow dir="right" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="testimonials-carousel-track"
          role="region"
          aria-roledescription="karusel"
          aria-label="Recenzije klijenata"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              goTo(active + 1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              goTo(active - 1);
            }
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.author}
              className="testimonial-card"
              aria-label={`Recenzija ${i + 1} od ${TESTIMONIALS.length}`}
              style={{ background: "linear-gradient(145deg, #1e1910 0%, #2b2418 100%)" }}
            >
              <div className="quote-mark mb-2" aria-hidden>
                &ldquo;
              </div>
              <p className="font-body leading-relaxed mb-6 italic" style={{ color: "var(--cream)" }}>
                {t.quote}
              </p>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-ui font-medium" style={{ color: "var(--cream-strong)", fontSize: "1rem" }}>
                    {t.author}
                  </div>
                  <div
                    className="font-ui mt-0.5"
                    style={{ fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold-vivid)" }}
                  >
                    {t.detail}
                  </div>
                </div>
                <div className="flex gap-0.5" aria-label={`Ocena ${t.stars} od 5`}>
                  {[...Array(t.stars)].map((_, j) => (
                    <span key={j} className="star" aria-hidden>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="corner-accent-tl" />
              <div className="corner-accent-br" />
            </article>
          ))}
        </div>

        {/* tačkice: gde se karusel nalazi (klik vodi na taj položaj) */}
        <div className="carousel-dots !mt-4">
          {stops.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Recenzije, položaj ${i + 1}`}
              aria-current={active === i ? "true" : undefined}
              className={`carousel-dot ${active === i ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
