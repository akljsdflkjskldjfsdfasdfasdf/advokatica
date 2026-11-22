"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { PhoneIcon } from "./icons";
import { reduceMotion } from "./reveal";
import { ADDRESS, HOURS_SHORT, MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from "./site";

const INFO = [
  { label: "Telefon", value: PHONE_DISPLAY, href: PHONE_HREF },
  { label: "Adresa", value: ADDRESS, href: MAPS_URL, external: true },
  { label: "Radno vreme", value: HOURS_SHORT },
];

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (reduceMotion()) return; // CSS tada odmah prikazuje sve
    const root = heroRef.current;
    if (!root) return;
    const q = (sel) => root.querySelectorAll(sel);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25, defaults: { ease: "power3.out" } });
      tl.fromTo(q(".hero-eyebrow-line"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut" })
        .fromTo(q(".hero-eyebrow-text"), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.9 }, "-=0.55")
        // y: 0 poništava pomeraj iz CSS-a (translateY 110%), inače bi red ostao skriven ispod maske
        .fromTo(
          q(".hero-line > span"),
          { yPercent: 110, y: 0 },
          { yPercent: 0, y: 0, duration: 1.35, stagger: 0.14, ease: "power4.out" },
          "-=0.6",
        )
        // zlatni odsjaj pređe preko „sigurnost."
        .add(() => root.querySelector(".text-gold-shine")?.classList.add("shine"), "-=0.75")
        .fromTo(q(".hero-sub"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.85")
        .fromTo(q(".hero-cta"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, "-=0.7")
        .fromTo(q(".hero-info-item"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, "-=0.6");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" aria-label="Uvod">
      {/* Pozadina: Temida (pravda) — neutralni grafitni ton, polako se približi pri otvaranju */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-pravda.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="hero-img"
        />
        <div className="hero-shade" />
        <div className="hero-vlines hidden md:block" />
      </div>

      <div className="relative z-[2] flex flex-1 items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 pt-32 pb-14 lg:pt-24 lg:pb-10">
          <div className="flex items-center gap-4 mb-8 lg:mb-10">
            <span className="hero-eyebrow-line anim-line block w-8 sm:w-12 h-px bg-gold-light shrink-0" aria-hidden="true" />
            <span className="hero-eyebrow-text anim-hide font-ui text-[0.64rem] tracking-[0.2em] sm:text-[0.72rem] sm:tracking-[0.32em] font-medium uppercase text-gold-light">
              Advokatska kancelarija · Žabalj
            </span>
          </div>

          <h1 className="hero-title mb-8 lg:mb-10">
            <span className="hero-line">
              <span>Vaša pravna</span>
            </span>
            <span className="hero-line">
              <span className="italic text-gold-shine">sigurnost.</span>
            </span>
            <span className="hero-line">
              <span>Naš prioritet.</span>
            </span>
          </h1>

          <p className="hero-sub anim-hide max-w-xl text-[1.08rem] md:text-[1.18rem] leading-relaxed text-on-dark-2 mb-9 lg:mb-8">
            Predani zaštiti Vaših prava i interesa u svakom predmetu.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <div className="hero-cta anim-hide">
              <a href="#kontakt" className="btn btn-gold w-full sm:w-auto">
                Zakažite konsultaciju
              </a>
            </div>
            <div className="hero-cta anim-hide">
              <a href={PHONE_HREF} className="btn btn-outline w-full sm:w-auto" aria-label={`Pozovite: ${PHONE_DISPLAY}`}>
                <PhoneIcon />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Traka sa osnovnim podacima na dnu (tablet i računar) */}
      <div className="relative z-[2] hidden md:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="hero-info grid grid-cols-3">
            {INFO.map((item) => (
              <div key={item.label} className="hero-info-item anim-hide">
                <span className="hero-info-label">{item.label}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="hero-info-value"
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="hero-info-value">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
