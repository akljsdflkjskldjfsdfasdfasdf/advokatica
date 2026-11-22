"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";
import { useReveal } from "./reveal";
import { ADDRESS, EMAIL, HOURS_FULL, MAPS_URL, PHONE_DISPLAY, PHONE_HREF, SERVICE_PICK_EVENT } from "./site";

const SERVICES = [
  "Krivično pravo",
  "Porodično pravo",
  "Privredno pravo",
  "Nekretnine",
  "Radno pravo",
  "Nasledno pravo",
  "Prekršajno pravo",
  "Naknada štete",
  "Upravno pravo",
];

const DETAILS = [
  { label: "Telefon", value: PHONE_DISPLAY, href: PHONE_HREF, Icon: PhoneIcon },
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: MailIcon },
  { label: "Adresa", value: ADDRESS, href: MAPS_URL, Icon: PinIcon, external: true },
  { label: "Radno vreme", value: HOURS_FULL, href: null, Icon: ClockIcon },
];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  date: "",
  website: "", // zamka za botove — čovek je ne vidi
};

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY);
  const [formState, setFormState] = useState("idle");
  const sectionRef = useRef(null);
  const dateRef = useRef(null);

  useReveal(sectionRef);

  // najraniji termin = današnji datum po lokalnom vremenu; upisuje se u pregledaču (server ne zna
  // vremensku zonu posetioca, a UTC datum posle ponoći ne bi bio tačan)
  useEffect(() => {
    if (!dateRef.current) return;
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    dateRef.current.min = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, [formState]);

  // klik na „Zakažite konsultaciju" u kartici oblasti → ta oblast je već izabrana u formi
  useEffect(() => {
    const onPick = (e) => {
      if (SERVICES.includes(e.detail)) {
        setFormState("idle");
        setFormData((f) => ({ ...f, subject: e.detail }));
      }
    };
    window.addEventListener(SERVICE_PICK_EVENT, onPick);
    return () => window.removeEventListener(SERVICE_PICK_EVENT, onPick);
  }, []);

  const set = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

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
        setFormData(EMPTY);
      } else setFormState("error");
    } catch {
      setFormState("error");
    }
  };

  return (
    <section ref={sectionRef} id="kontakt" className="sec-ink relative py-24 lg:py-32 overflow-hidden">
      {/* pozadina: kancelarija, zatamnjena neutralnim grafitom */}
      <div className="contact-media absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image src="/kancelarija.jpg" alt="" fill sizes="100vw" />
        <div className="contact-shade" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20">
          {/* Levo: podaci */}
          <div className="lg:col-span-2 fade-left">
            <p className="eyebrow mb-6">Kontakt</p>
            <h2 className="h-section mb-6">
              Zakažite
              <br />
              <span className="accent">termin</span>
            </h2>
            <p className="lead text-on-dark-2 mb-10">
              Javite mi se i zajedno ćemo pronaći najbolje rešenje za Vaš slučaj.
            </p>

            <ul>
              {DETAILS.map(({ label, value, href, Icon, external }) => (
                <li key={label} className="contact-detail">
                  <span className="contact-icon">
                    <Icon />
                  </span>
                  <div className="min-w-0">
                    <p className="contact-detail-label">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="contact-detail-value"
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="contact-detail-value">{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Desno: forma */}
          <div className="lg:col-span-3 fade-right">
            <div className="form-card">
              {formState === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center" role="status">
                  <div className="success-checkmark mb-6" aria-hidden="true">
                    ✓
                  </div>
                  <h3 className="font-display text-[1.9rem] text-on-dark mb-3">Poruka primljena</h3>
                  <p className="text-on-dark-2">Javiću Vam se u roku od 24 časa. Hvala na poverenju.</p>
                  <button type="button" onClick={() => setFormState("idle")} className="btn btn-outline mt-8">
                    Pošalji novu poruku
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* zamka za botove: polje je van ekrana i preskače se tasterom Tab */}
                  <div
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
                  >
                    <label>
                      Vaš sajt
                      <input type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={set("website")} />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="form-label" htmlFor="k-ime">
                        Ime i prezime *
                      </label>
                      <input
                        id="k-ime"
                        type="text"
                        required
                        autoComplete="name"
                        className="input-field"
                        placeholder="Vaše ime i prezime"
                        value={formData.name}
                        onChange={set("name")}
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="k-email">
                        Email adresa *
                      </label>
                      <input
                        id="k-email"
                        type="email"
                        required
                        autoComplete="email"
                        className="input-field"
                        placeholder="vas@email.com"
                        value={formData.email}
                        onChange={set("email")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="form-label" htmlFor="k-tel">
                        Broj telefona
                      </label>
                      <input
                        id="k-tel"
                        type="tel"
                        autoComplete="tel"
                        className="input-field"
                        placeholder="+381 6x xxx xxxx"
                        value={formData.phone}
                        onChange={set("phone")}
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="k-oblast">
                        Oblast prava
                      </label>
                      <select
                        id="k-oblast"
                        className="input-field appearance-none cursor-pointer"
                        value={formData.subject}
                        onChange={set("subject")}
                        style={{ color: formData.subject ? "var(--on-dark)" : "rgba(201,204,210,.45)" }}
                      >
                        <option value="" disabled hidden>
                          Odaberite oblast
                        </option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                        <option value="Ostalo">Ostalo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="k-datum">
                      Željeni datum termina
                    </label>
                    <input
                      id="k-datum"
                      type="date"
                      className="input-field"
                      ref={dateRef}
                      value={formData.date}
                      onChange={set("date")}
                      style={{ colorScheme: "dark" }}
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="k-opis">
                      Kratki opis slučaja *
                    </label>
                    <textarea
                      id="k-opis"
                      required
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Opišite ukratko Vaš slučaj ili pitanje..."
                      value={formData.message}
                      onChange={set("message")}
                    />
                  </div>

                  {formState === "error" && (
                    <p className="text-sm tracking-wide" style={{ color: "#f4a3a3" }} role="alert">
                      Greška pri slanju. Pokušajte ponovo ili nas kontaktirajte telefonom.
                    </p>
                  )}

                  <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-between gap-5 pt-2">
                    <p className="text-sm text-center sm:text-left text-on-dark-3">* Obavezna polja</p>
                    <button type="submit" disabled={formState === "loading"} className="btn btn-gold w-full sm:w-auto">
                      {formState === "loading" ? "Šalje se..." : "Pošalji poruku"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
