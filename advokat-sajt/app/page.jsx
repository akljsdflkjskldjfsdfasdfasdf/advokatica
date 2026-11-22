"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Quote from "./components/Quote";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import CallButton from "./components/CallButton";
import { reduceMotion } from "./components/reveal";

const SECTIONS = ["o-meni", "usluge", "proces", "recenzije", "kontakt"];

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Aktivna sekcija u meniju = ona koja prelazi sredinu ekrana (radi i za sekcije više od ekrana)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    // iznad prve sekcije (hero) ništa nije označeno
    const hero = document.querySelector(".hero");
    const heroObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActiveSection(""),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    if (hero) heroObserver.observe(hero);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  // Kada se fontovi učitaju, raspored se malo pomeri — ScrollTrigger ponovo izmeri tačke
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let alive = true;
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());
    return () => {
      alive = false;
    };
  }, []);

  // Kursor (samo računar sa mišem)
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot || reduceMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    // quickTo: jedna animacija koja se samo pomera (ranije nova animacija na svaki pokret miša)
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });
    const dxTo = gsap.quickTo(dot, "x", { duration: 0.08 });
    const dyTo = gsap.quickTo(dot, "y", { duration: 0.08 });
    // kursor je skriven dok se miš prvi put ne pomeri (ranije je krug stajao u gornjem levom uglu)
    let shown = false;
    const move = (e) => {
      if (!shown) {
        shown = true;
        gsap.set([cursor, dot], { x: e.clientX, y: e.clientY });
        gsap.to([cursor, dot], { opacity: 1, duration: 0.3 });
        return;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      dxTo(e.clientX);
      dyTo(e.clientY);
    };
    const grow = () => gsap.to(cursor, { scale: 2.4, duration: 0.3 });
    const shrink = () => gsap.to(cursor, { scale: 1, duration: 0.3 });
    const targets = document.querySelectorAll("a, button, .svc-card, .testimonial-card");
    window.addEventListener("mousemove", move, { passive: true });
    targets.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  // Skrol: traka napretka, izgled zaglavlja, dugme „Zakaži termin" na telefonu
  useEffect(() => {
    // jednom po kadru; traka napretka se pomera direktno (bez React-a), a stanje se menja samo kad
    // se stvarno promeni — ranije se CELA strana ponovo iscrtavala na svaki pomak skrola
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const scrollY = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const bar = document.querySelector(".scroll-progress");
        if (bar) bar.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
        setScrolled(scrollY > 40);
        setShowMobileCta(scrollY > window.innerHeight * 0.6);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const ctaVisible = showMobileCta && activeSection !== "kontakt";

  return (
    <>
      {/* Kursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-gold pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />

      <div className="scroll-progress" aria-hidden="true" />

      <Navbar scrolled={scrolled} activeSection={activeSection} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Process />
        <Quote />
        <Testimonials />
        <Contact />
        <Stats />
      </main>
      <Footer />

      <CallButton />

      {/* „Zakaži termin" na telefonu: posle prvog ekrana, a sakriva se kod same forme (tamo bi je samo zaklanjao) */}
      <div className={`mobile-cta md:hidden ${ctaVisible ? "" : "hidden-cta"}`}>
        <a href="#kontakt" className="btn btn-gold" tabIndex={ctaVisible ? 0 : -1}>
          Zakaži termin
        </a>
      </div>
    </>
  );
}
