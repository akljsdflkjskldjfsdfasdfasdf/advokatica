"use client";

import { useEffect, useState } from "react";
import { PhoneIcon } from "./icons";
import { ADDRESS, NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "./site";

export default function Navbar({ scrolled, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // otvoren meni: strana iza se ne skroluje, Esc zatvara
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ═══════ MENI NA TELEFONU ═══════ */}
      <div
        id="mobilni-meni"
        className={`mobile-menu-overlay lg:hidden ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col items-center gap-5" aria-label="Meni">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="menu-link"
              onClick={close}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-4 text-center">
          <a href={PHONE_HREF} className="btn btn-gold" onClick={close} tabIndex={menuOpen ? 0 : -1}>
            <PhoneIcon />
            {PHONE_DISPLAY}
          </a>
          <p className="text-sm tracking-wide text-on-dark-3">{ADDRESS}</p>
        </div>
      </div>

      {/* ═══════ ZAGLAVLJE ═══════ */}
      <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
        <div className="header-inner max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-3.5 group" onClick={close}>
            {/* eslint-disable-next-line @next/next/no-img-element -- mali logo, već optimizovan PNG */}
            <img
              src="/logo-zlatni.png"
              alt="Logo Mrđen advokat"
              width={931}
              height={744}
              className="header-logo"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.35rem] md:text-[1.5rem] text-on-dark tracking-wide transition-colors duration-300 group-hover:text-gold-light">
                Maja Mrđen
              </span>
              <span className="font-ui text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-gold-light mt-1.5">
                Advokat · Žabalj
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Glavni meni">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeSection === link.href.slice(1) ? "active" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href={PHONE_HREF} className="header-phone hidden xl:inline-flex" aria-label={`Pozovite: ${PHONE_DISPLAY}`}>
            <PhoneIcon />
            {PHONE_DISPLAY}
          </a>

          {/* ☰ / ✕ */}
          <button
            type="button"
            className="lg:hidden flex flex-col justify-center gap-[6px] w-11 h-11 -mr-2 p-2.5"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={menuOpen}
            aria-controls="mobilni-meni"
          >
            <span
              className={`block h-px w-6 transition-all duration-500 origin-center ${menuOpen ? "translate-y-[7px] rotate-45 bg-gold-light" : "bg-on-dark"}`}
            />
            <span
              className={`block h-px transition-all duration-500 ${menuOpen ? "w-6 opacity-0" : "w-4 bg-gold-light"}`}
            />
            <span
              className={`block h-px w-6 transition-all duration-500 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45 bg-gold-light" : "bg-on-dark"}`}
            />
          </button>
        </div>
      </header>
    </>
  );
}
