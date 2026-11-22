const MARQUEE_ITEMS = [
  "Krivično pravo",
  "Porodično pravo",
  "Nekretnine",
  "Privredno pravo",
  "Radno pravo",
  "Nasledno pravo",
  "Prekršajno pravo",
  "Naknada štete",
  "Upravno pravo",
];

// 4 kopije: traka se pomera za pola dužine pa se neprimetno ponavlja i na širokim ekranima
const ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export default function Marquee() {
  // samo ukras — iste oblasti su ispod u „Oblasti prakse", pa ih čitač ekrana ne čita 36 puta
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {ITEMS.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep" />
          </span>
        ))}
      </div>
    </div>
  );
}
