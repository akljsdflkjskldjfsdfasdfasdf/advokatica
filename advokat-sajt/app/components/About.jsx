"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CheckIcon, PhoneIcon } from "./icons";
import { useReveal } from "./reveal";
import { PHONE_DISPLAY, PHONE_HREF } from "./site";

const CREDENTIALS = [
  "Član Advokatske komore Vojvodine",
  "Pravni fakultet u Novom Sadu",
  "Zastupanje fizičkih, pravnih lica i maloletnika u krivičnim i svim drugim postupcima",
  "Višegodišnje iskustvo pred svim srpskim sudovima",
];

export default function About() {
  const sectionRef = useRef(null);

  useReveal(sectionRef, (root) => {
    // portret se „otkrije" odozgo nadole i blago se smanji na pravu veličinu, zatim ram i oznaka
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.querySelector(".about-media"), start: "top 78%", once: true },
    });
    tl.fromTo(
      root.querySelector(".reveal-photo"),
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" },
    )
      .fromTo(root.querySelector(".about-photo-inner"), { scale: 1.28 }, { scale: 1, duration: 2, ease: "power3.out" }, 0)
      .fromTo(
        root.querySelector(".about-frame"),
        { opacity: 0, x: -20, y: -20 },
        { opacity: 1, x: 0, y: 0, duration: 1.3, ease: "power3.out" },
        0.55,
      )
      .fromTo(root.querySelector(".about-badge"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0.95);
  });

  return (
    <section ref={sectionRef} id="o-meni" className="sec-light relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Portret — na laptopu sada zauzima celu levu kolonu (ranije najviše 360 px) */}
          <div className="about-media">
            <div className="about-frame anim-hide" aria-hidden="true" />
            <div className="about-photo reveal-photo">
              <div className="about-photo-inner">
                <Image
                  src="/maja-mrden-portret.jpg"
                  alt="Advokat Maja Mrđen"
                  fill
                  sizes="(min-width: 1024px) 560px, 92vw"
                />
              </div>
            </div>
            <div className="about-badge anim-hide">
              <div className="about-badge-label">Član</div>
              <div className="about-badge-title">Advokatske komore Vojvodine</div>
            </div>
          </div>

          {/* Tekst */}
          <div>
            <p className="eyebrow fade-up mb-6">O meni</p>
            <h2 className="h-section fade-up mb-8">
              Predanost, <span className="accent">znanje</span>
              <br />i iskustvo.
            </h2>

            <p className="lead fade-up mb-8">
              Advokat Maja Mrđen pruža pravnu zaštitu fizičkim i pravnim licima, zastupajući njihove interese
              pred sudovima i drugim nadležnim organima. Posebnu oblast rada čine krivično i prekršajno pravo,
              dok iskustvo obuhvata i parnične, izvršne, vanparnične i druge postupke. Svakom klijentu
              pristupam profesionalno, sa ciljem da kroz pravovremene savete i kvalitetno zastupanje obezbedim
              efikasnu zaštitu njegovih prava i interesa.
            </p>

            <div className="fade-up flex items-end gap-5 mb-10">
              <span className="anim-line block w-12 h-px bg-gold mb-3" aria-hidden="true" />
              <div>
                <div className="signature">Maja Mrđen</div>
                <div className="signature-role mt-2">Advokat</div>
              </div>
            </div>

            <ul className="stagger-group grid gap-4 mb-11">
              {CREDENTIALS.map((item) => (
                <li key={item} className="check-item stagger-child">
                  <span className="check-icon">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="fade-up flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-7 gap-y-5">
              <a href="#kontakt" className="btn btn-gold">
                Razgovarajmo o Vašem slučaju
              </a>
              <a href={PHONE_HREF} className="about-call group" aria-label={`Pozovite: ${PHONE_DISPLAY}`}>
                <span className="check-icon about-call-icon">
                  <PhoneIcon />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[0.62rem] font-medium tracking-[0.24em] uppercase text-mute">Ili pozovite</span>
                  <span className="font-display text-[1.15rem] text-heading transition-colors duration-300 group-hover:text-gold-deep">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
