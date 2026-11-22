import { ADDRESS, EMAIL, NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "./site";

export default function Footer() {
  return (
    <footer className="sec-ink relative border-t border-white/10" style={{ backgroundColor: "#090b0e" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <a href="#" className="flex items-center gap-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- mali logo, već optimizovan PNG */}
              <img src="/logo-zlatni.png" alt="Logo Mrđen advokat" width={931} height={744} className="h-12 w-auto" />
              <span className="flex flex-col leading-none text-left">
                <span className="font-display text-[1.4rem] text-on-dark">Maja Mrđen</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold-light mt-1.5">Advokat · Žabalj</span>
              </span>
            </a>
            <address className="not-italic text-sm leading-7 text-on-dark-2 mt-6">
              {ADDRESS}
              <br />
              <a href={PHONE_HREF} className="hover:text-gold-light transition-colors">
                {PHONE_DISPLAY}
              </a>
              <br />
              <a href={`mailto:${EMAIL}`} className="hover:text-gold-light transition-colors">
                {EMAIL}
              </a>
            </address>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 lg:pt-3" aria-label="Podnožje">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-center lg:text-right leading-7 text-on-dark-3 lg:pt-2" suppressHydrationWarning>
            © {new Date().getFullYear()} Maja Mrđen Advokat
            <br />
            Sva prava zadržana
          </p>
        </div>

        <div className="mt-14 pt-10 border-t border-white/10 overflow-hidden" aria-hidden="true">
          <div className="footer-watermark">Maja Mrđen</div>
        </div>
      </div>
    </footer>
  );
}
