"use client";

import { useRef } from "react";
import { useReveal } from "./reveal";
import { SERVICE_PICK_EVENT } from "./site";

const icon = (children) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const SERVICES = [
  {
    num: "01",
    title: "Krivično pravo",
    desc: "Zastupanje u krivičnim postupcima, odbrana optuženih, žalbe na presude i zaštita prava okrivljenih kroz sve instance.",
    icon: icon(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />),
  },
  {
    num: "02",
    title: "Porodično pravo",
    desc: "Razvodi, starateljstvo, alimentacija, podela imovine i zaštita prava dece u svim porodičnopravnim sporovima.",
    icon: icon(
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>,
    ),
  },
  {
    num: "03",
    title: "Privredno pravo",
    desc: "Zastupanje u privrednim prestupima, sastavljanje raznih ugovora iz oblasti privrede.",
    icon: icon(
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </>,
    ),
  },
  {
    num: "04",
    title: "Nekretnine",
    desc: "Kupoprodajni ugovori, uknjižba, legalizacija, hipoteke i sveobuhvatna pravna zaštita u prometu nepokretnosti.",
    icon: icon(
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>,
    ),
  },
  {
    num: "05",
    title: "Radno pravo",
    desc: "Naplate neisplaćenih zarada i zaštita prava zaposlenih.",
    icon: icon(
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </>,
    ),
  },
  {
    num: "06",
    title: "Nasledno pravo",
    desc: "Ostavinski postupci, testamenti, sporovi između naslednika i zaštita naslednih prava kroz sve faze postupka.",
    icon: icon(
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    ),
  },
  {
    num: "07",
    title: "Prekršajno pravo",
    desc: "Zastupanje i savetovanje fizičkih i pravnih lica u prekršajnim postupcima i sastavljanje pravnih lekova u istim.",
    icon: icon(
      <>
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>,
    ),
  },
  {
    num: "08",
    title: "Naknada štete",
    desc: "Zastupanje u sporovima za naknadu materijalne i nematerijalne štete.",
    icon: icon(
      <>
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="M7 6h1v4" />
        <path d="m16.71 13.88.7.71-2.82 2.82" />
      </>,
    ),
  },
  {
    num: "09",
    title: "Upravno pravo",
    desc: "Zastupanje u upravnim postupcima pred organima državne uprave, lokalne samouprave i imaocima javnih ovlašćenja. Podnošenje tužbi, žalbi i prigovora.",
    icon: icon(
      <>
        <line x1="3" y1="22" x2="21" y2="22" />
        <line x1="6" y1="18" x2="6" y2="11" />
        <line x1="10" y1="18" x2="10" y2="11" />
        <line x1="14" y1="18" x2="14" y2="11" />
        <line x1="18" y1="18" x2="18" y2="11" />
        <polygon points="12 2 20 7 4 7" />
      </>,
    ),
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} id="usluge" className="sec-paper relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <p className="eyebrow fade-up mb-6">Oblasti prakse</p>
            <h2 className="h-section fade-up">
              Šta mogu
              <br />
              <span className="accent">uraditi za Vas</span>
            </h2>
          </div>
          <p className="lead fade-up max-w-sm lg:text-right">
            Sveobuhvatna pravna zaštita u svim ključnim oblastima srpskog prava.
          </p>
        </div>

        <div className="svc-grid stagger-group">
          {SERVICES.map((s) => (
            <article key={s.num} className="svc-card stagger-child">
              <div className="flex items-start justify-between">
                <span className="svc-icon">{s.icon}</span>
                <span className="svc-num">{s.num}</span>
              </div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <a
                href="#kontakt"
                className="svc-link"
                onClick={() => window.dispatchEvent(new CustomEvent(SERVICE_PICK_EVENT, { detail: s.title }))}
                aria-label={`Zakažite konsultaciju — ${s.title}`}
              >
                Zakažite konsultaciju
                <span className="svc-link-line" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
