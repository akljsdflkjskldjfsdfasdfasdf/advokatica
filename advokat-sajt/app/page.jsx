"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [activeSection, setActiveSection] = useState("o-meni");

  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Active section detection
  useEffect(() => {
    const sections = ["o-meni", "usluge", "proces", "recenzije", "kontakt"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;
    // quickTo: jedna animacija koja se samo pomera (ranije nova animacija na svaki pokret miša)
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });
    const dxTo = gsap.quickTo(dot, "x", { duration: 0.08 });
    const dyTo = gsap.quickTo(dot, "y", { duration: 0.08 });
    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dxTo(e.clientX);
      dyTo(e.clientY);
    };
    const grow = () => gsap.to(cursor, { scale: 2.6, duration: 0.3 });
    const shrink = () => gsap.to(cursor, { scale: 1, duration: 0.3 });
    window.addEventListener("mousemove", move, { passive: true });
    document.querySelectorAll("a, button, .service-card, .testimonial-card").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, .service-card, .testimonial-card").forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  // Scroll events
  useEffect(() => {
    // jednom po kadru; traka napretka se pomera direktno (bez React-a), a stanje se menja samo kad
    // se stvarno promeni — ranije se CELA strana ponovo iscrtavala na svaki pomak skrola
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const scrollY = window.scrollY;
        const total = document.body.scrollHeight - window.innerHeight;
        const bar = document.querySelector(".scroll-progress");
        if (bar) bar.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
        setScrolled(scrollY > 60);
        setShowMobileCta(scrollY > window.innerHeight * 0.5);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-gold pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />

      <Navbar scrolled={scrolled} activeSection={activeSection} />
      <Hero showMobileCta={showMobileCta} />
      <Marquee />
      <About />
      <Services />
      <Process />
      <Quote />
      <Testimonials />
      <Contact />
      <Stats />
      <Footer />
    </>
  );
}