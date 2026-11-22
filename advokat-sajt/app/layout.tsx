import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

// Fontovi se služe sa samog sajta (next/font). Ranije su se učitavali preko @import sa Google-a,
// ali build je taj red izbacivao — sajt je zato prikazivao običan Times i Segoe UI.
// (Cormorant Garamond je odbačen: pogrešno postavlja kvačicu na malim „č" i „š".)
const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dmsans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0c0e12",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://advokat-maja-mrdjen.com"),
  title: "Advokat Maja Mrđen | Žabalj",
  description:
    "Advokat Maja Mrđen — advokatska kancelarija u Žablju, Nikole Tesle 88. Krivično, prekršajno, porodično, nasledno i privredno pravo. Zastupanje pred sudovima i pravno savetovanje. Tel: 062/153-68-12.",
  keywords:
    "advokat Žabalj, advokat Maja Mrđen, advokat Mrđen, advokatska kancelarija Žabalj, krivično pravo, prekršajno pravo, porodično pravo, nasledno pravo, privredno pravo, pravne usluge, Žabalj, Srbija",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Advokat Maja Mrđen | Žabalj",
    description:
      "Advokatska kancelarija Maja Mrđen — Nikole Tesle 88, Žabalj. Krivično, prekršajno, porodično, nasledno i privredno pravo.",
    url: "/",
    siteName: "Advokat Maja Mrđen",
    locale: "sr_RS",
    type: "website",
    images: [
      {
        url: "/maja-mrden-portret.jpg",
        width: 1200,
        height: 1804,
        alt: "Advokat Maja Mrđen",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Advokat Maja Mrđen",
  image: "https://advokat-maja-mrdjen.com/maja-mrden-portret.jpg",
  logo: "https://advokat-maja-mrdjen.com/Maja_Mrdjen_LOGO_GOLD_Transparent-01.png",
  url: "https://advokat-maja-mrdjen.com",
  telephone: "+381621536812",
  email: "advokatmajamrdjen@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nikole Tesle 88",
    addressLocality: "Žabalj",
    postalCode: "21230",
    addressCountry: "RS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.3692773,
    longitude: 20.0647766,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "16:00",
  },
  areaServed: ["Žabalj", "Novi Sad", "Vojvodina", "Srbija"],
  founder: {
    "@type": "Person",
    name: "Maja Mrđen",
    jobTitle: "Advokat",
  },
  knowsAbout: [
    "Krivično pravo",
    "Prekršajno pravo",
    "Porodično pravo",
    "Nasledno pravo",
    "Privredno pravo",
    "Radno pravo",
    "Nekretnine",
    "Naknada štete",
    "Upravno pravo",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        {/* bez JavaScript-a nema animacija ulaska — sadržaj mora odmah da se vidi */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>.fade-up,.fade-left,.fade-right,.stagger-child,.anim-hide,.hero-line>span,.anim-line,.step-connector{opacity:1!important;transform:none!important}.reveal-photo{clip-path:none!important}</style>",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
