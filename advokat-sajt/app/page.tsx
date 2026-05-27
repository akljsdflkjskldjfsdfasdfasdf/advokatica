"use client";

import { useEffect, useRef, useState, useCallback, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "O meni", href: "#o-meni" },
  { label: "Usluge", href: "#usluge" },
  { label: "Proces", href: "#proces" },
  { label: "Recenzije", href: "#recenzije" },
  { label: "Kontakt", href: "#kontakt" },
];

const SERVICES = [
  {
    num: "01",
    title: "Krivično pravo",
    desc: "Zastupanje u krivičnim postupcima, odbrana optuženih, žalbe na presude i zaštita prava okrivljenih kroz sve instance.",
    icon: "⚖",
  },
  {
    num: "02",
    title: "Porodično pravo",
    desc: "Razvodi, starateljstvo, alimentacija, podela imovine i zaštita prava dece u svim porodičnopravnim sporovima.",
    icon: "◈",
  },
  {
    num: "03",
    title: "Privredno pravo",
    desc: "Osnivanje društava, ugovori, radni sporovi, zaštita intelektualne svojine i kompleksni privredni sporovi.",
    icon: "◆",
  },
  {
    num: "04",
    title: "Nekretnine",
    desc: "Kupoprodajni ugovori, uknjižba, legalizacija, hipoteke i sveobuhvatna pravna zaštita u prometu nepokretnosti.",
    icon: "◉",
  },
  {
    num: "05",
    title: "Radno pravo",
    desc: "Otkazi, mobing, naknade štete, radni sporovi i zaštita prava zaposlenih pred sudom i inspekcijom rada.",
    icon: "◎",
  },
  {
    num: "06",
    title: "Nasledno pravo",
    desc: "Ostavinski postupci, testamenti, sporovi između naslednika i zaštita naslednih prava kroz sve faze postupka.",
    icon: "◇",
  },
];

const STEPS = [
  {
    num: "I",
    title: "Konsultacija",
    desc: "Besplatan prvi razgovor u kome pažljivo analiziramo Vaš slučaj i procenjujemo sve pravne mogućnosti.",
  },
  {
    num: "II",
    title: "Strategija",
    desc: "Izrađujemo preciznu pravnu strategiju prilagođenu Vašim ciljevima, rokovima i okolnostima.",
  },
  {
    num: "III",
    title: "Zastupanje",
    desc: "Aktivno i posvećeno zastupamo Vaše interese pred svim nadležnim organima i sudovima.",
  },
  {
    num: "IV",
    title: "Ishod",
    desc: "Pratimo predmet do konačnog rešenja. Potpuna transparentnost i redovna komunikacija u svakom koraku.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Profesionalizam i posvećenost advokatice Mrdjen prevazišli su sva moja očekivanja. Krivični postupak koji je trajao godinama rešen je u naše korist. Beskrajno zahvalan.",
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
      "Nezakonit otkaz, mobing, sve je rešeno povoljno za mene uz minimalan stres. Advokatica Mrdjen je uvek dostupna i izuzetno jasno objašnjava svaki korak.",
    author: "Jelena R.",
    detail: "Radno pravo · 2024",
    stars: 5,
  },
];

const MARQUEE_ITEMS = [
  "Krivično pravo",
  "Porodično pravo",
  "Nekretnine",
  "Privredno pravo",
  "Radno pravo",
  "Nasledno pravo",
];

// ─── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      op: number;
      size: number;
      life: number;
      maxLife: number;
    };
    const particles: Particle[] = [];

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.4 + 0.1),
      op: 0,
      size: Math.random() * 1.8 + 0.4,
      life: 0,
      maxLife: 200 + Math.random() * 300,
    });

    for (let i = 0; i < 70; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife;
      p.op = Math.sin((p.life / p.maxLife) * Math.PI) * 0.55;
      particles.push(p);
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.life++;
        if (p.life > p.maxLife) {
          particles[i] = spawn();
          return;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.op = Math.sin((p.life / p.maxLife) * Math.PI) * 0.55;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.op})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-particle-canvas"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState("o-meni");
  const [activeDot, setActiveDot] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    date: "",
  });
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const heroRef = useRef<HTMLElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // ── Active section detection ───────────────────────────────────────────────
  useEffect(() => {
    const sections = ["o-meni", "usluge", "proces", "recenzije", "kontakt"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ── GSAP ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    try {
      gsap.registerPlugin(SplitText);
    } catch {}

    const ctx = gsap.context(() => {
      // ── Hero entrance ─────────────────────────────────────────────────────
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
          ".hero-trust",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-stats-bar",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.1",
        );

      // ── Parallax hero bg text ──────────────────────────────────────────────
      gsap.to(".hero-bg-text", {
        y: -180,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, scrub: 2 },
      });

      // ── Section headings parallax ──────────────────────────────────────────
      gsap.utils.toArray<Element>(".section-heading").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 20 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });

      // ── Section glows ──────────────────────────────────────────────────────
      gsap.utils.toArray<Element>(".section-glow").forEach((el) => {
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

      // ── Generic fades ──────────────────────────────────────────────────────
      const fadeAnimations: { cls: string; fromVars: gsap.TweenVars }[] = [
        { cls: ".fade-up", fromVars: { opacity: 0, y: 54 } },
        { cls: ".fade-left", fromVars: { opacity: 0, x: -40 } },
        { cls: ".fade-right", fromVars: { opacity: 0, x: 40 } },
      ];
      fadeAnimations.forEach(({ cls, fromVars }) => {
        gsap.utils.toArray<Element>(cls).forEach((el) => {
          gsap.fromTo(el, fromVars, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });
      });

      // ── Stagger groups ────────────────────────────────────────────────────
      gsap.utils.toArray<Element>(".stagger-group").forEach((group) => {
        const children = group.querySelectorAll(".stagger-child");
        gsap.fromTo(
          children,
          { opacity: 0, y: 38 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.14,
            duration: 0.95,
            ease: "power2.out",
            scrollTrigger: { trigger: group, start: "top 82%" },
          },
        );
      });

      // ── Stats counter ─────────────────────────────────────────────────────
      gsap.utils.toArray<Element>(".stat-num").forEach((el) => {
        const target = parseInt((el as HTMLElement).dataset.target || "0");
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2.6,
            ease: "power1.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el, start: "top 82%" },
          },
        );
      });

      // ── Section line draws ────────────────────────────────────────────────
      gsap.utils.toArray<Element>(".draw-line").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 90%" },
          },
        );
      });

      // ── Process connector lines ───────────────────────────────────────────
      document.querySelectorAll(".step-connector").forEach((line, i) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            delay: i * 0.25,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".process-steps-row", start: "top 76%" },
          },
        );
      });

      // ── Service cards — clip-path cascade ────────────────────────────────
      gsap.utils.toArray<Element>(".service-card").forEach((card, i) => {
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

      // ── Contact split reveal ──────────────────────────────────────────────
      gsap.fromTo(
        ".contact-left",
        { opacity: 0, x: -54 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-left", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".contact-right",
        { opacity: 0, x: 54 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-right", start: "top 82%" },
        },
      );

      // ── Quote section word stagger ────────────────────────────────────────
      gsap.fromTo(
        ".quote-word",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".quote-section", start: "top 75%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  // ── Magnetic buttons ──────────────────────────────────────────────────────
  useEffect(() => {
    const handlers: Array<{
      el: Element;
      move: EventListener;
      leave: EventListener;
    }> = [];
    document.querySelectorAll(".magnetic-wrap").forEach((wrap) => {
      const btn = wrap.querySelector("a, button") as HTMLElement;
      if (!btn) return;
      const move = (e: Event) => {
        const me = e as MouseEvent;
        const rect = wrap.getBoundingClientRect();
        const x = (me.clientX - rect.left - rect.width / 2) * 0.28;
        const y = (me.clientY - rect.top - rect.height / 2) * 0.28;
        gsap.to(btn, { x, y, duration: 0.5, ease: "power2.out" });
      };
      const leave = () =>
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "elastic.out(1,0.5)",
        });
      wrap.addEventListener("mousemove", move);
      wrap.addEventListener("mouseleave", leave);
      handlers.push({ el: wrap, move, leave });
    });
    return () =>
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
  }, []);

  // ── Custom cursor ─────────────────────────────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;
    const move = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.65,
        ease: "power2.out",
      });
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08 });
    };
    const grow = () => gsap.to(cursor, { scale: 2.6, duration: 0.3 });
    const shrink = () => gsap.to(cursor, { scale: 1, duration: 0.3 });
    window.addEventListener("mousemove", move);
    document
      .querySelectorAll("a, button, .service-card, .testimonial-card")
      .forEach((el) => {
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
    return () => {
      window.removeEventListener("mousemove", move);
      document
        .querySelectorAll("a, button, .service-card, .testimonial-card")
        .forEach((el) => {
          el.removeEventListener("mouseenter", grow);
          el.removeEventListener("mouseleave", shrink);
        });
    };
  }, []);

  // ── Scroll events ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 60);
      setScrollPct((scrollY / total) * 100);
      setShowMobileCta(scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Drag-scroll testimonials carousel ────────────────────────────────────
  useEffect(() => {
    const wrap = carouselRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let targetX = 0;
    let velX = 0;
    let lastX = 0;
    let rafId = 0;

    const cardWidth = 436; // card width + gap
    let numDots = TESTIMONIALS.length;

    const clampX = (x: number) => {
      const maxScroll = -(track.scrollWidth - wrap.clientWidth);
      return Math.max(maxScroll, Math.min(0, x));
    };

    const updateDot = (x: number) => {
      const idx = Math.round(Math.abs(x) / cardWidth);
      setActiveDot(Math.min(idx, numDots - 1));
    };

    const loop = () => {
      velX *= 0.88;
      if (!isDragging) targetX += velX;
      targetX = clampX(targetX);
      currentX += (targetX - currentX) * 0.12;
      track.style.transform = `translateX(${currentX}px)`;
      updateDot(currentX);
      if (Math.abs(velX) > 0.05 || Math.abs(targetX - currentX) > 0.1) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      cancelAnimationFrame(rafId);
      wrap.classList.add("is-dragging");
      startX = "touches" in e ? e.touches[0].clientX : e.clientX;
      lastX = startX;
      velX = 0;
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const dx = x - lastX;
      velX = dx;
      lastX = x;
      targetX += dx;
      currentX += dx * 0.85;
      currentX = clampX(currentX);
      targetX = clampX(targetX);
      track.style.transform = `translateX(${currentX}px)`;
      updateDot(currentX);
    };
    const onUp = () => {
      isDragging = false;
      wrap.classList.remove("is-dragging");
      rafId = requestAnimationFrame(loop);
    };

    wrap.addEventListener("mousedown", onDown as EventListener);
    window.addEventListener("mousemove", onMove as EventListener);
    window.addEventListener("mouseup", onUp);
    wrap.addEventListener("touchstart", onDown as EventListener, {
      passive: true,
    });
    wrap.addEventListener("touchmove", onMove as EventListener, {
      passive: true,
    });
    wrap.addEventListener("touchend", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      wrap.removeEventListener("mousedown", onDown as EventListener);
      window.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("mouseup", onUp);
      wrap.removeEventListener("touchstart", onDown as EventListener);
      wrap.removeEventListener("touchmove", onMove as EventListener);
      wrap.removeEventListener("touchend", onUp);
    };
  }, []);

  // ── 3D card tilt ──────────────────────────────────────────────────────────
  const handleCardTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(e.currentTarget, {
      rotationY: x * 10,
      rotationX: -y * 10,
      transformPerspective: 900,
      duration: 0.45,
      ease: "power2.out",
    });
  }, []);

  const handleCardTiltReset = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      gsap.to(e.currentTarget, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "elastic.out(1,0.5)",
      });
    },
    [],
  );

  // ── Form ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setFormState("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          date: "",
        });
      } else setFormState("error");
    } catch {
      setFormState("error");
    }
  };

  // ── Quote words split helper ──────────────────────────────────────────────
  const quoteWords =
    "Pravda nije samo cilj — to je put kojim zajedno hodamo.".split(" ");

  // ─────────────────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-gold pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />

      {/* Floating Side CTA (desktop) */}
      <div className="float-side-cta">
        <a href="#kontakt">Zakaži termin</a>
      </div>

      {/* Mobile Floating CTA */}
      <div
        className={`mobile-cta md:hidden ${showMobileCta ? "" : "hidden-cta"}`}
      >
        <a href="#kontakt" className="btn-primary shadow-xl">
          <span>Zakaži termin</span>
        </a>
      </div>

      {/* ═══════ FULLSCREEN MOBILE MENU ═══════ */}
      <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}>
        {/* Close button */}
        <button
          className="absolute top-6 right-6 p-3 text-cream-muted hover:text-gold-light transition-colors duration-300"
          onClick={() => setMenuOpen(false)}
          aria-label="Zatvori meni"
        >
          <span className="block w-6 h-px bg-current rotate-45 translate-y-px" />
          <span className="block w-6 h-px bg-current -rotate-45 -translate-y-px" />
        </button>

        <nav className="flex flex-col items-center gap-8 mb-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="menu-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="menu-cta-wrap">
          <a
            href="#kontakt"
            className="btn-primary text-[10px]"
            onClick={() => setMenuOpen(false)}
          >
            <span>Zakaži besplatnu konsultaciju</span>
          </a>
        </div>

        {/* Decorative gold line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(201,168,76,.3) 30%, rgba(240,208,96,.5) 50%, rgba(201,168,76,.3) 70%, transparent)",
          }}
        />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-ui text-[0.6rem] tracking-[0.24em] uppercase text-gold opacity-40">
          Maja Mrdjen · Advokat
        </div>
      </div>

      {/* ═══════ HEADER ═══════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-charcoal/97 backdrop-blur-md border-b border-charcoal-400"
            : "bg-transparent"
        }`}
        style={scrolled ? { boxShadow: "0 4px 40px rgba(0,0,0,0.75)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[4.5rem]">
          <a href="#" className="flex flex-col leading-none group">
            <span className="font-display text-lg text-cream tracking-wide group-hover:text-gold-light transition-colors duration-300">
              Maja Mrdjen
            </span>
            <span className="font-ui text-[9px] tracking-[0.25em] uppercase text-gold mt-0.5">
              Advokat · Novi Sad
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
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

          <div className="hidden md:block magnetic-wrap">
            <a href="#kontakt" className="btn-primary text-[10px] py-3 px-6">
              <span>Zakaži termin</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 z-[210] relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Meni"
          >
            <span
              className={`block w-6 h-px transition-all duration-400 origin-center ${menuOpen ? "rotate-45 translate-y-[7px] bg-gold" : "bg-cream"}`}
            />
            <span
              className={`block h-px transition-all duration-400 ${menuOpen ? "opacity-0 w-6 bg-gold" : "w-4 bg-gold"}`}
            />
            <span
              className={`block w-6 h-px transition-all duration-400 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px] bg-gold" : "bg-cream"}`}
            />
          </button>
        </div>
      </header>

      {/* ═══════ HERO ═══════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "#030201" }}
      >
        {/* Particle canvas */}
        <div className="absolute inset-0 z-[1]">
          <ParticleCanvas />
        </div>

        {/* Background large text */}
        <div className="hero-bg-text absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-[2]">
          <span
            className="font-display font-bold uppercase leading-none"
            style={{
              fontSize: "clamp(8rem,22vw,27rem)",
              color: "rgba(201,168,76,.04)",
              whiteSpace: "nowrap",
              letterSpacing: "-0.04em",
            }}
          >
            ADVOKAT
          </span>
        </div>

        {/* Center glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[2]"
          style={{
            width: "72vw",
            height: "72vw",
            background:
              "radial-gradient(circle, rgba(201,168,76,.08) 0%, rgba(201,168,76,.025) 40%, transparent 70%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background:
              "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 38%, rgba(3,2,1,.80) 100%)",
          }}
        />

        {/* Vertical grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
          {[1, 3].map((col) => (
            <div
              key={col}
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: `${col * 25}%`,
                background:
                  "linear-gradient(to bottom, transparent, rgba(201,168,76,.10) 25%, rgba(201,168,76,.10) 75%, transparent)",
              }}
            />
          ))}
        </div>

        <div className="relative z-[4] max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-36 w-full">
          {/* Label */}
          <div
            className="hero-label flex items-center gap-4 mb-10"
            style={{ opacity: 0 }}
          >
            <div className="w-10 h-px bg-gold-vivid" />
            <span
              className="font-ui text-[0.65rem] tracking-[0.26em] uppercase"
              style={{ color: "var(--gold-vivid)" }}
            >
              Pravna kancelarija · Novi Sad
            </span>
          </div>

          {/* Headline */}
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

          {/* Sub */}
          <p
            ref={heroSubRef}
            className="font-body text-xl md:text-2xl max-w-lg leading-relaxed mb-10"
            style={{ opacity: 0, color: "var(--cream-muted)" }}
          >
            Stručna pravna pomoć sa više od 15 godina iskustva. Predani zaštiti
            Vaših prava i interesa u svakom predmetu.
          </p>

          {/* CTAs */}
          <div
            ref={heroCtaRef}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10"
            style={{ opacity: 0 }}
          >
            <div className="magnetic-wrap">
              <a href="#kontakt" className="btn-primary btn-primary-pulse">
                <span>Zakaži besplatnu konsultaciju</span>
              </a>
            </div>
            <a href="#usluge" className="btn-ghost">
              <span className="btn-line" />
              <span>Pogledaj usluge</span>
            </a>
          </div>

          {/* Trust strip */}
          <div className="hero-trust trust-strip" style={{ opacity: 0 }}>
            {[
              { icon: "⚖", label: "15+ godina iskustva" },
              { icon: "✓", label: "500+ predmeta" },
              { icon: "★", label: "Besplatna konsultacija" },
            ].map((t) => (
              <div key={t.label} className="trust-item">
                <span className="trust-item-icon">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="hero-stats-bar absolute bottom-0 left-0 right-0 border-t border-charcoal-300"
          style={{
            background: "linear-gradient(to right, #0d0b07, #141108, #0d0b07)",
            opacity: 0,
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-3">
              {[
                { num: 15, suffix: "+", label: "Godina iskustva" },
                { num: 500, suffix: "+", label: "Rešenih predmeta" },
                { num: 98, suffix: "%", label: "Zadovoljnih klijenata" },
              ].map((stat) => (
                <div key={stat.label} className="stat-item text-center py-5">
                  <div
                    className="font-display text-2xl md:text-3xl tracking-tight"
                    style={{ color: "var(--gold-vivid)" }}
                  >
                    <span className="stat-num" data-target={stat.num}>
                      0
                    </span>
                    <span>{stat.suffix}</span>
                  </div>
                  <div
                    className="font-ui mt-1"
                    style={{
                      fontSize: ".625rem",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "var(--cream-muted)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-scroll-indicator absolute bottom-24 right-8 lg:right-14 flex flex-col items-center gap-3"
          style={{ opacity: 0 }}
        >
          <span
            className="font-ui text-[.6rem] tracking-[.22em] uppercase text-cream-muted"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <div className="w-px h-14 bg-gradient-to-b from-gold-vivid/60 to-transparent" />
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <div
        className="overflow-hidden border-y py-4"
        style={{
          background: "linear-gradient(to right, #1c1608, #231c0e, #1c1608)",
          borderColor: "rgba(201,168,76,.18)",
          boxShadow:
            "inset 0 1px 0 rgba(201,168,76,.14), inset 0 -1px 0 rgba(201,168,76,.08)",
        }}
      >
        <div className="marquee-track">
          {[
            ...MARQUEE_ITEMS,
            ...MARQUEE_ITEMS,
            ...MARQUEE_ITEMS,
            ...MARQUEE_ITEMS,
          ].map((item, i) => (
            <span
              key={i}
              className="font-display italic text-lg px-8 flex-shrink-0"
              style={{
                color: i % 2 === 0 ? "var(--gold-vivid)" : "var(--cream-muted)",
              }}
            >
              {item}
              <span
                className="ml-8 not-italic text-sm"
                style={{ color: "var(--charcoal-500)" }}
              >
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════ O MENI ═══════ */}
      <section
        id="o-meni"
        className="relative py-32 lg:py-44 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0e0c08 0%, #0a0805 100%)",
        }}
      >
        <div
          className="section-glow absolute top-0 left-0 bottom-0 w-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 10% 50%, rgba(201,168,76,.09) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(201,168,76,.22) 30%, rgba(201,168,76,.22) 70%, transparent)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            {/* Visual */}
            <div className="fade-left relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] max-w-[360px] mx-auto lg:mx-0">
                <div className="photo-frame-inner" />
                <div className="photo-frame-outer" />

                <div
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(160deg, #1f1b12 0%, #282117 100%)",
                  }}
                >
                  <div className="text-center px-6">
                    <div
                      className="font-display mb-3"
                      style={{
                        fontSize: "6rem",
                        color: "rgba(201,168,76,.18)",
                        lineHeight: 1,
                      }}
                    >
                      MM
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                      alt="Advokatica Maja Mrdjen"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Photo decorations */}
                <div className="photo-gold-dot" />
                <div className="photo-gold-ring" />
              </div>

              {/* Floating badge */}
              <div className="floating-badge absolute top-6 -right-6 lg:-right-12 hidden lg:block">
                <div className="floating-badge-num">15+</div>
                <div className="floating-badge-label">Godina prakse</div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <p className="section-label fade-up mb-6">O meni</p>
              <h2 className="section-heading fade-up mb-8">
                Predanost,
                <br />
                <em
                  className="not-italic"
                  style={{ color: "var(--gold-vivid)" }}
                >
                  znanje
                </em>{" "}
                i iskustvo.
              </h2>

              <div
                className="fade-up space-y-5 leading-relaxed mb-10"
                style={{ color: "var(--cream-muted)", fontSize: "1.15rem" }}
              >
                <p>
                  Advokatica sa više od 15 godina aktivne prakse u svim
                  oblastima prava. Diplomirala sam na Pravnom fakultetu u Novom
                  Sadu, gde sam stekla i zvanje magistra pravnih nauka.
                </p>
                <p>
                  Kroz stotine uspešno rešenih predmeta, izgradila sam
                  reputaciju advokata koji se bori do poslednje instance i
                  nikada ne odustaje od interesa svojih klijenata.
                </p>
              </div>

              <div className="fade-up space-y-3 mb-10">
                {[
                  "Član Advokatske komore Vojvodine",
                  "Magistar pravnih nauka – Pravni fakultet Novi Sad",
                  "Specijalizacija iz krivičnog i porodičnog prava",
                  "Višegodišnje iskustvo pred svim srpskim sudovima",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="credential-dot mt-2" />
                    <span className="credential-text">{item}</span>
                  </div>
                ))}
              </div>

              <div className="fade-up magnetic-wrap">
                <a href="#kontakt" className="btn-primary">
                  <span>Razgovarajmo o Vašem slučaju</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ USLUGE ═══════ */}
      <section
        id="usluge"
        className="relative py-32 lg:py-44 overflow-hidden"
        style={{ background: "#050302" }}
      >
        <div
          className="section-glow absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "80vw",
            height: "50vw",
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,.10) 0%, transparent 65%)",
          }}
        />
        {/* Fine grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,.022) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(201,168,76,.38) 30%, rgba(240,208,96,.55) 50%, rgba(201,168,76,.38) 70%, transparent)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div>
              <p className="section-label fade-up mb-6">Oblasti prakse</p>
              <h2 className="section-heading fade-up max-w-xl">
                Šta mogu
                <br />
                <em
                  className="not-italic"
                  style={{ color: "var(--gold-vivid)" }}
                >
                  uraditi za Vas
                </em>
              </h2>
            </div>
            <p
              className="fade-up text-lg max-w-xs lg:text-right leading-relaxed"
              style={{ color: "var(--cream-muted)" }}
            >
              Sveobuhvatna pravna zaštita u svim ključnim oblastima srpskog
              prava.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal-400">
            {SERVICES.map((s) => (
              <div
                key={s.num}
                className="service-card group cursor-default"
                style={{ background: "#080604" }}
                onMouseMove={handleCardTilt}
                onMouseLeave={handleCardTiltReset}
              >
                <div className="card-shimmer" />
                <div
                  className="p-8 lg:p-10 h-full flex flex-col relative z-10"
                  style={{ transition: "background .4s" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#171108")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div className="flex items-start justify-between mb-7">
                    <span
                      className="font-ui"
                      style={{
                        fontSize: ".625rem",
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "var(--gold-vivid)",
                        opacity: 0.9,
                      }}
                    >
                      {s.num}
                    </span>
                    <span
                      className="text-2xl transition-all duration-400 group-hover:scale-115"
                      style={{
                        color: "rgba(201,168,76,.30)",
                        transition: "color .4s, transform .4s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "rgba(240,208,96,.65)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(201,168,76,.30)")
                      }
                    >
                      {s.icon}
                    </span>
                  </div>
                  <h3
                    className="font-display text-2xl mb-4 group-hover:text-gold-light transition-colors duration-400"
                    style={{ color: "var(--cream-strong)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="font-body text-base leading-relaxed flex-1"
                    style={{ color: "var(--cream-muted)" }}
                  >
                    {s.desc}
                  </p>
                  <div
                    className="mt-6 h-px bg-gold group-hover:w-12 transition-all duration-500"
                    style={{ width: "0px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROCES ═══════ */}
      <section
        id="proces"
        className="relative py-32 lg:py-44 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #141109 0%, #0e0c07 50%, #120f08 100%)",
        }}
      >
        <div
          className="section-glow absolute top-1/3 right-0 pointer-events-none"
          style={{
            width: "45vw",
            height: "45vw",
            background:
              "radial-gradient(ellipse at 100% 50%, rgba(201,168,76,.08) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <p className="section-label fade-up mb-6 justify-center">
              Kako radimo
            </p>
            <h2 className="section-heading fade-up">
              Jednostavan proces,
              <br />
              <em className="not-italic" style={{ color: "var(--gold-vivid)" }}>
                jasni rezultati
              </em>
            </h2>
          </div>

          <div className="process-steps-row stagger-group relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Desktop connector lines */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="step-connector hidden lg:block absolute top-10"
                style={{
                  left: `calc(${(i + 1) * 25}% - 0px)`,
                  width: "calc(25% - 6rem)",
                  height: "1px",
                  background:
                    "linear-gradient(to right, rgba(201,168,76,.45), rgba(201,168,76,.12))",
                  transformOrigin: "left center",
                }}
              />
            ))}

            {STEPS.map((step) => (
              <div
                key={step.num}
                className="stagger-child process-step text-center group"
              >
                <div className="process-step-diamond mx-auto mb-7">
                  <span className="step-num-text">{step.num}</span>
                </div>
                <h3
                  className="font-display text-2xl mb-3 group-hover:text-gold-light transition-colors duration-300"
                  style={{ color: "var(--cream)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body text-base leading-relaxed"
                  style={{ color: "var(--cream-muted)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE ═══════ */}
      <section
        className="quote-section py-24 overflow-hidden relative border-y"
        style={{ background: "#040302", borderColor: "rgba(201,168,76,.22)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 90% at 50% 50%, rgba(201,168,76,.10) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div
            className="font-display absolute -top-4 left-4 lg:left-0"
            style={{
              fontSize: "8rem",
              lineHeight: 1,
              color: "rgba(201,168,76,.14)",
            }}
            aria-hidden
          >
            "
          </div>
          <blockquote
            className="font-display italic leading-snug mb-8"
            style={{
              fontSize: "clamp(1.7rem, 3.5vw, 3.4rem)",
              color: "var(--cream-strong)",
            }}
          >
            {quoteWords.map((word, i) => (
              <span
                key={i}
                className="quote-word inline-block mr-[.28em]"
                style={{ opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-gold" />
            <span
              className="font-ui uppercase"
              style={{
                fontSize: ".6875rem",
                letterSpacing: ".2em",
                color: "var(--gold-vivid)",
              }}
            >
              Maja Mrdjen
            </span>
            <div className="w-8 h-px bg-gold" />
          </div>
        </div>
      </section>

      {/* ═══════ RECENZIJE ═══════ */}
      <section
        id="recenzije"
        className="relative py-32 lg:py-44 overflow-hidden"
        style={{
          background:
            "linear-gradient(175deg, #1d1810 0%, #151009 50%, #1b1509 100%)",
        }}
      >
        <div
          className="section-glow absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "60vw",
            height: "40vw",
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,.11) 0%, transparent 65%)",
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
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
            <div>
              <p className="section-label fade-up mb-6">Recenzije klijenata</p>
              <h2 className="section-heading fade-up">
                Reči onih koji
                <br />
                <em
                  className="not-italic"
                  style={{ color: "var(--gold-vivid)" }}
                >
                  su nam verovali
                </em>
              </h2>
            </div>
            <div className="fade-right text-right hidden lg:block">
              <div
                className="font-display text-5xl"
                style={{ color: "var(--gold-vivid)" }}
              >
                5.0
              </div>
              <div className="flex justify-end gap-0.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">
                    ★
                  </span>
                ))}
              </div>
              <p
                className="font-ui"
                style={{
                  fontSize: ".625rem",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "var(--cream-muted)",
                }}
              >
                Prosečna ocena
              </p>
            </div>
          </div>

          {/* Drag hint */}
          <div className="flex items-center gap-3 mb-6 fade-up">
            <span
              className="font-ui text-[.6rem] tracking-[.2em] uppercase"
              style={{ color: "rgba(201,168,76,.5)" }}
            >
              ← Prevuci za više →
            </span>
          </div>

          {/* Drag scroll carousel */}
          <div ref={carouselRef} className="testimonials-carousel-wrap">
            <div ref={trackRef} className="testimonials-carousel-track">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div
                  key={i}
                  className="testimonial-card"
                  style={{
                    background:
                      "linear-gradient(145deg, #211b12 0%, #181108 100%)",
                  }}
                >
                  <div className="quote-mark mb-2">"</div>
                  <p
                    className="font-body text-lg leading-relaxed mb-6 italic"
                    style={{ color: "var(--cream)" }}
                  >
                    {t.quote}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className="font-ui text-sm font-medium"
                        style={{ color: "var(--cream-strong)" }}
                      >
                        {t.author}
                      </div>
                      <div
                        className="font-ui mt-0.5"
                        style={{
                          fontSize: ".6rem",
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                          color: "var(--gold-vivid)",
                          opacity: 0.85,
                        }}
                      >
                        {t.detail}
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(t.stars)].map((_, j) => (
                        <span key={j} className="star">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="corner-accent-tl" />
                  <div className="corner-accent-br" />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="carousel-dots mt-8">
            {TESTIMONIALS.map((_, i) => (
              <div
                key={i}
                className={`carousel-dot ${activeDot === i ? "active" : ""}`}
                onClick={() => {
                  if (trackRef.current) {
                    const cardW = 436;
                    const targetX = -(i * cardW);
                    gsap.to(trackRef.current, {
                      x: targetX,
                      duration: 0.6,
                      ease: "power2.inOut",
                    });
                    setActiveDot(i);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ KONTAKT ═══════ */}
      <section
        id="kontakt"
        className="relative py-32 lg:py-44 overflow-hidden"
        style={{ background: "#070503" }}
      >
        <div
          className="section-glow absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: "50vw",
            height: "50vw",
            background:
              "radial-gradient(ellipse at 100% 100%, rgba(201,168,76,.08) 0%, transparent 60%)",
          }}
        />
        <div
          className="section-glow absolute top-0 left-0 pointer-events-none"
          style={{
            width: "40vw",
            height: "40vw",
            background:
              "radial-gradient(ellipse at 0% 0%, rgba(201,168,76,.05) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
            {/* Left */}
            <div className="lg:col-span-2 contact-left">
              <p className="section-label mb-6">Kontakt</p>
              <h2 className="section-heading mb-6">
                Zakažite
                <br />
                <em
                  className="not-italic"
                  style={{ color: "var(--gold-vivid)" }}
                >
                  termin
                </em>
              </h2>
              <p
                className="text-lg leading-relaxed mb-12"
                style={{ color: "var(--cream-muted)" }}
              >
                Prva konsultacija je{" "}
                <strong
                  className="font-normal"
                  style={{ color: "var(--gold-vivid)" }}
                >
                  besplatna
                </strong>
                . Javite mi se i zajedno ćemo pronaći najbolje rešenje za Vaš
                slučaj.
              </p>

              <div className="space-y-0">
                {[
                  {
                    label: "Telefon",
                    value: "+381 21 123 4567",
                    href: "tel:+381211234567",
                  },
                  {
                    label: "Email",
                    value: "maja@mrdjen-advokat.rs",
                    href: "mailto:maja@mrdjen-advokat.rs",
                  },
                  {
                    label: "Adresa",
                    value: "Bulevar Oslobođenja 10, Novi Sad",
                    href: "#",
                  },
                  {
                    label: "Radno vreme",
                    value: "Pon–Pet: 09:00–18:00",
                    href: "#",
                  },
                ].map((item) => (
                  <div key={item.label} className="contact-detail">
                    <p>{item.label}</p>
                    <a href={item.href} className="font-body text-lg">
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 contact-right">
              <div className="form-card-wrap">
                <div className="corner-accent-tl" style={{ zIndex: 10 }} />
                <div className="corner-accent-br" style={{ zIndex: 10 }} />
                <div
                  className="form-card-inner relative p-8 lg:p-12"
                  style={{ boxShadow: "0 32px 80px rgba(0,0,0,.75)" }}
                >
                  {formState === "success" ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="success-checkmark mb-6">✓</div>
                      <h3
                        className="font-display text-3xl mb-3"
                        style={{ color: "var(--cream)" }}
                      >
                        Poruka primljena
                      </h3>
                      <p
                        className="text-lg"
                        style={{ color: "var(--cream-muted)" }}
                      >
                        Javiću Vam se u roku od 24 časa. Hvala na poverenju.
                      </p>
                      <button
                        onClick={() => setFormState("idle")}
                        className="mt-8 btn-primary text-[10px]"
                      >
                        <span>Pošalji novu poruku</span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <label className="form-label">Ime i prezime *</label>
                          <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="Vaše ime i prezime"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="form-label">Email adresa *</label>
                          <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="vas@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <label className="form-label">Broj telefona</label>
                          <input
                            type="tel"
                            className="input-field"
                            placeholder="+381 6x xxx xxxx"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="form-label">Oblast prava</label>
                          <select
                            className="input-field bg-transparent appearance-none cursor-pointer"
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value,
                              })
                            }
                            style={{
                              color: formData.subject
                                ? "var(--cream)"
                                : "rgba(208,198,176,.32)",
                            }}
                          >
                            <option value="" disabled hidden>
                              Odaberite oblast
                            </option>
                            {SERVICES.map((s) => (
                              <option
                                key={s.title}
                                value={s.title}
                                style={{ background: "#0d0b08" }}
                              >
                                {s.title}
                              </option>
                            ))}
                            <option
                              value="Ostalo"
                              style={{ background: "#0d0b08" }}
                            >
                              Ostalo
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="form-label">
                          Željeni datum termina
                        </label>
                        <input
                          type="date"
                          className="input-field"
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          style={{ colorScheme: "dark" }}
                        />
                      </div>

                      <div>
                        <label className="form-label">
                          Kratki opis slučaja *
                        </label>
                        <textarea
                          required
                          rows={4}
                          className="input-field resize-none"
                          placeholder="Opišite ukratko Vaš slučaj ili pitanje..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                        />
                      </div>

                      {formState === "error" && (
                        <p
                          className="font-ui text-xs tracking-wide"
                          style={{ color: "#f87171" }}
                        >
                          Greška pri slanju. Pokušajte ponovo ili nas
                          kontaktirajte telefonom.
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <p
                          className="font-ui text-xs"
                          style={{ color: "rgba(208,198,176,.4)" }}
                        >
                          * Obavezna polja
                        </p>
                        <div className="magnetic-wrap">
                          <button
                            type="submit"
                            disabled={formState === "loading"}
                            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ fontSize: ".6875rem" }}
                          >
                            <span>
                              {formState === "loading"
                                ? "Šalje se..."
                                : "Pošalji poruku"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer
        className="border-t"
        style={{
          background: "linear-gradient(to bottom, #0a0806, #050302)",
          borderColor: "rgba(201,168,76,.16)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
            <div className="text-center lg:text-left">
              <div
                className="font-display text-xl"
                style={{ color: "var(--cream)" }}
              >
                Maja Mrdjen
              </div>
              <div
                className="font-ui mt-0.5"
                style={{
                  fontSize: ".6rem",
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                  color: "var(--gold-vivid)",
                }}
              >
                Advokat · Novi Sad
              </div>
              <p
                className="font-ui text-xs mt-4 max-w-xs"
                style={{
                  color: "var(--cream-muted)",
                  opacity: 0.5,
                  lineHeight: 1.7,
                }}
              >
                Bulevar Oslobođenja 10, Novi Sad
                <br />
                +381 21 123 4567
              </p>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </nav>

            <p
              className="font-ui text-xs text-center lg:text-right"
              style={{ color: "rgba(208,198,176,.35)", lineHeight: 1.8 }}
            >
              © {new Date().getFullYear()} Maja Mrdjen Advokat
              <br />
              Sva prava zadržana
            </p>
          </div>

          {/* Bottom watermark */}
          <div
            className="mt-12 pt-8 overflow-hidden"
            style={{ borderTop: "1px solid rgba(201,168,76,.10)" }}
          >
            <div
              className="footer-watermark font-bold uppercase text-center"
              style={{
                fontSize: "clamp(3rem,8vw,8rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              Maja Mrdjen
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
