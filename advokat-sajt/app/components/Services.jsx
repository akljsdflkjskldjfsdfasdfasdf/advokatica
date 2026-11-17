"use client";

import { useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SERVICES = [
  {
    num: "01",
    title: "Krivično pravo",
    desc: "Zastupanje u krivičnim postupcima, odbrana optuženih, žalbe na presude i zaštita prava okrivljenih kroz sve instance.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Porodično pravo",
    desc: "Razvodi, starateljstvo, alimentacija, podela imovine i zaštita prava dece u svim porodičnopravnim sporovima.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Privredno pravo",
    desc: "Zastupanje u privrednim prestupima, sastavljanje raznih ugovora iz oblasti privrede.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Nekretnine",
    desc: "Kupoprodajni ugovori, uknjižba, legalizacija, hipoteke i sveobuhvatna pravna zaštita u prometu nepokretnosti.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Radno pravo",
    desc: "Naplate neisplaćenih zarada i zaštita prava zaposlenih.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Nasledno pravo",
    desc: "Ostavinski postupci, testamenti, sporovi između naslednika i zaštita naslednih prava kroz sve faze postupka.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    num: "07",
    title: "Prekršajno pravo",
    desc: "Zastupanje i savetovanje fizičkih i pravnih lica u prekršajnim postupcima i sastavljanje pravnih lekova u istim.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    num: "08",
    title: "Naknada štete",
    desc: "Zastupanje u sporovima za naknadu materijalne i nematerijalne štete.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="M7 6h1v4" />
        <path d="m16.71 13.88.7.71-2.82 2.82" />
      </svg>
    ),
  },
  {
    num: "09",
    title: "Upravno pravo",
    desc: "Zastupanje u upravnim postupcima pred organima državne uprave, lokalne samouprave i imaocima javnih ovlašćenja. Podnošenje tužbi, žalbi i prigovora.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="22" x2="21" y2="22" />
        <line x1="6" y1="18" x2="6" y2="11" />
        <line x1="10" y1="18" x2="10" y2="11" />
        <line x1="14" y1="18" x2="14" y2="11" />
        <line x1="18" y1="18" x2="18" y2="11" />
        <polygon points="12 2 20 7 4 7" />
      </svg>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      gsap.utils.toArray(".section-glow").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.88 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
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
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.utils.toArray(".service-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 44, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.88,
            delay: (i % 3) * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 89%" },
          },
        );
      });
    }, sectionRef); // samo elementi ove sekcije (ranije su se hvatali naslovi sa cele strane)

    return () => ctx.revert();
  }, []);

  const handleCardTilt = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(e.currentTarget, {
      rotationY: x * 8,
      rotationX: -y * 8,
      transformPerspective: 900,
      duration: 0.45,
      ease: "power2.out",
    });
  }, []);

  const handleCardTiltReset = useCallback((e) => {
    gsap.to(e.currentTarget, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "elastic.out(1,0.5)",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="usluge"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "#f4efe6" }}
    >
      {/* Suptilni zlatni glow odozgo */}
      <div
        className="section-glow absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 70% 35% at 50% 0%, rgba(201,168,76,0.14) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 20% at 10% 100%, rgba(201,168,76,0.07) 0%, transparent 55%)",
            "radial-gradient(ellipse 40% 20% at 90% 100%, rgba(201,168,76,0.07) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      {/* Suptilna mrežica */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,140,40,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(180,140,40,.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Gornja zlatna linija */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,.5) 30%, rgba(212,168,50,.85) 50%, rgba(201,168,76,.5) 70%, transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <p
              className="fade-up mb-4"
              style={{
                fontSize: ".8rem",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "#8a6418",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 500,
              }}
            >
              Oblasti prakse
            </p>
            <h2
              className="section-heading fade-up"
              style={{
                fontSize: "clamp(2.2rem,4.2vw,3.4rem)",
                color: "#1a1208",
                fontWeight: 600,
                lineHeight: 1.15,
              }}
            >
              Šta mogu
              <br />
              <em className="not-italic" style={{ color: "#a87820" }}>
                uraditi za Vas
              </em>
            </h2>
          </div>
          <p
            className="fade-up max-w-sm lg:text-right leading-relaxed"
            style={{ color: "rgba(48,36,12,.82)", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1.05rem" }}
          >
            Sveobuhvatna pravna zaštita u svim ključnim oblastima srpskog prava.
          </p>
        </div>

        {/* Grid kartica */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="service-card group cursor-default relative overflow-hidden rounded-4xl"
              style={{
                background: "#1f190f",
                transition: "background .35s",
              }}
              onMouseMove={handleCardTilt}
              onMouseLeave={(e) => {
                handleCardTiltReset(e);
                e.currentTarget.style.background = "#1f190f";
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2a2214";
              }}
            >
              {/* Hover — zlatna linija na vrhu */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(201,168,76,.8) 50%, transparent)",
                }}
              />

              {/* Hover — zlatni glow u uglu */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle, rgba(201,168,76,.1) 0%, transparent 70%)",
                }}
              />

              <div className="p-8 lg:p-10 h-full flex flex-col">
                {/* Broj + ikona */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    style={{
                      fontSize: ".85rem",
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: "rgba(226,196,122,.9)",
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    style={{
                      color: "rgba(226,196,122,.85)",
                      transition: "color .35s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#f0d060")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(226,196,122,.85)")
                    }
                  >
                    {s.icon}
                  </span>
                </div>

                {/* Zlatna separator linija */}
                <div
                  className="mb-6 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(201,168,76,.45), transparent)",
                  }}
                />

                {/* Naslov — zlatni */}
                <h3
                  className="font-display text-2xl mb-4"
                  style={{
                    color: "#e2c47a",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    transition: "color .3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f0cc6a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#e2c47a")
                  }
                >
                  {s.title}
                </h3>

                {/* Opis — beli sa blagim opacitetom */}
                <p
                  className="leading-relaxed flex-1"
                  style={{
                    color: "rgba(255,248,230,.9)",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "1.02rem",
                    lineHeight: "1.7",
                  }}
                >
                  {s.desc}
                </p>

                {/* Dekorativna linija na hover */}
                <div
                  className="mt-7 h-px group-hover:w-14 transition-all duration-500"
                  style={{
                    width: "0px",
                    background:
                      "linear-gradient(to right, rgba(201,168,76,.75), transparent)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
