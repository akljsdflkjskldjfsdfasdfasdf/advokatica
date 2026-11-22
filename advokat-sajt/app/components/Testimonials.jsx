"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./icons";
import { useReveal } from "./reveal";

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

export default function Testimonials() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  /** Položaji na koje karusel može da stane (početak svake kartice, poslednji = kraj) */
  const [stops, setStops] = useState([0]);
  const [active, setActive] = useState(0);

  // animacije ulaska — samo unutar ove sekcije (kartice se ne pomeraju same, da bi prelaz mišem radio)
  useReveal(sectionRef);

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
    <section ref={sectionRef} id="recenzije" className="sec-paper relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <p className="eyebrow fade-up mb-6">Recenzije klijenata</p>
            <h2 className="h-section fade-up">
              Reči onih koji
              <br />
              <span className="accent">su nam verovali</span>
            </h2>
          </div>
          <div className="fade-right flex items-center gap-5 lg:flex-col lg:items-end lg:gap-1">
            <div className="font-display text-[3rem] leading-none text-heading">5.0</div>
            <div>
              <div className="flex lg:justify-end gap-1 mb-1.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-[0.68rem] font-medium tracking-[0.22em] uppercase text-mute">Prosečna ocena</p>
            </div>
          </div>
        </div>

        {/* strelice levo-desno iznad kartica — na telefonu ih ne prekriva plutajuće dugme „Zakaži termin" */}
        <div className="fade-up mb-2 flex items-center justify-between gap-4">
          <p className="text-[0.7rem] font-medium tracking-[0.18em] uppercase text-gold-deep">
            <span className="hidden sm:inline">Prevucite ili koristite strelice</span>
            <span className="sm:hidden">Prevucite za više</span>
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="carousel-arrow"
              onClick={() => goTo(active - 1)}
              disabled={atStart}
              aria-label="Prethodna recenzija"
            >
              <ArrowIcon dir="left" width={20} height={20} />
            </button>
            <button
              type="button"
              className="carousel-arrow"
              onClick={() => goTo(active + 1)}
              disabled={atEnd}
              aria-label="Sledeća recenzija"
            >
              <ArrowIcon dir="right" width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="fade-up">
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
              >
                <div className="t-mark" aria-hidden="true">
                  &ldquo;
                </div>
                <p className="t-quote mb-8">{t.quote}</p>
                <div className="mt-auto pt-6 border-t border-sand flex items-center justify-between gap-4">
                  <div>
                    <div className="t-author">{t.author}</div>
                    <div className="t-detail">{t.detail}</div>
                  </div>
                  <div className="flex gap-0.5 shrink-0" role="img" aria-label={`Ocena ${t.stars} od 5`}>
                    {[...Array(t.stars)].map((_, j) => (
                      <span key={j} className="star" aria-hidden="true">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* tačkice: gde se karusel nalazi (klik vodi na taj položaj) */}
        <div className="carousel-dots mt-2">
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
