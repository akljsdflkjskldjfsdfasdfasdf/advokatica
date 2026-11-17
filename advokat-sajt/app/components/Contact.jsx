"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SERVICES = [
  { title: "Krivično pravo" },
  { title: "Porodično pravo" },
  { title: "Privredno pravo" },
  { title: "Nekretnine" },
  { title: "Radno pravo" },
  { title: "Nasledno pravo" },
  { title: "Prekršajno pravo" },
  { title: "Naknada štete" },
  { title: "Upravno pravo" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    date: "",
    website: "", // zamka za botove — čovek je ne vidi
  });
  const [formState, setFormState] = useState("idle");
  const sectionRef = useRef(null);
  const dateRef = useRef(null);

  // najraniji termin = današnji datum po lokalnom vremenu; upisuje se u pregledaču (server ne zna
  // vremensku zonu posetioca, a UTC datum posle ponoći ne bi bio tačan)
  useEffect(() => {
    if (!dateRef.current) return;
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    dateRef.current.min = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, [formState]);

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
    }, sectionRef); // samo elementi ove sekcije

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
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
          website: "",
        });
      } else setFormState("error");
    } catch {
      setFormState("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "#17140f" }}
    >
      {/* Background photo — kancelarija u magli (samo desktop) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "url('/kancelarija.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 55%",
          opacity: 0.6,
          filter: "grayscale(20%)",
        }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse 110% 100% at 50% 45%, rgba(23,20,15,0.3) 0%, rgba(23,20,15,0.74) 100%)",
        }}
      />
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
              <em className="not-italic" style={{ color: "var(--gold-vivid)" }}>
                termin
              </em>
            </h2>
            <p
              className="text-lg leading-relaxed mb-12"
              style={{ color: "var(--cream-muted)" }}
            >
              Javite mi se i zajedno ćemo pronaći najbolje rešenje za Vaš
              slučaj.
            </p>

            <div className="space-y-0">
              {[
                {
                  label: "Telefon",
                  value: "062/153-68-12",
                  href: "tel:+381621536812",
                },
                {
                  label: "Email",
                  value: "advokatmajamrdjen@gmail.com",
                  href: "mailto:advokatmajamrdjen@gmail.com",
                },
                {
                  label: "Adresa",
                  value: "Nikole Tesle 88, Žabalj",
                  href: "https://www.google.com/maps/@45.3692773,20.0647766,3a,75y,254.79h,73.53t/data=!3m7!1e1!3m5!1sdzXIf-jsKy_CGElvhEBJdA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D16.474017837897037%26panoid%3DdzXIf-jsKy_CGElvhEBJdA%26yaw%3D254.78687162813785!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
                },
                {
                  label: "Radno vreme",
                  value: "Radnim danima 9–16h, vikendom po potrebi klijenata",
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="contact-detail">
                  <p>{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-body text-lg"
                      {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="contact-value font-body text-lg">{item.value}</span>
                  )}
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
                      className="mt-8 btn-primary"
                    >
                      <span>Pošalji novu poruku</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* zamka za botove: polje je van ekrana i preskače se tasterom Tab */}
                    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                      <label>
                        Vaš sajt
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />
                      </label>
                    </div>
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
                            setFormData({ ...formData, email: e.target.value })
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
                            setFormData({ ...formData, phone: e.target.value })
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
                              : "rgba(230,223,207,.5)",
                          }}
                        >
                          <option value="" disabled hidden>
                            Odaberite oblast
                          </option>
                          {SERVICES.map((s) => (
                            <option
                              key={s.title}
                              value={s.title}
                              style={{ background: "#1b1813" }}
                            >
                              {s.title}
                            </option>
                          ))}
                          <option
                            value="Ostalo"
                            style={{ background: "#1b1813" }}
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
                        ref={dateRef}
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
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    {formState === "error" && (
                      <p
                        className="font-ui text-sm tracking-wide"
                        style={{ color: "#f87171" }}
                      >
                        Greška pri slanju. Pokušajte ponovo ili nas
                        kontaktirajte telefonom.
                      </p>
                    )}

                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-between gap-5 pt-2">
                      <p
                        className="font-ui text-sm text-center sm:text-left"
                        style={{ color: "rgba(230,223,207,.65)" }}
                      >
                        * Obavezna polja
                      </p>
                      <div className="magnetic-wrap w-full sm:w-auto">
                        <button
                          type="submit"
                          disabled={formState === "loading"}
                          className="btn-primary w-full sm:w-auto text-center disabled:opacity-40 disabled:cursor-not-allowed"
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
  );
}
