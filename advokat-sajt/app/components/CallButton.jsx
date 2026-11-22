import { PhoneSolidIcon } from "./icons";
import { PHONE_DISPLAY, PHONE_HREF } from "./site";

/**
 * Dugme za poziv na desnoj ivici ekrana (vidi se na svakom delu strane).
 * Na telefonu jedan dodir odmah zove; na računaru se na prelaz mišem otvori i broj.
 */
export default function CallButton() {
  return (
    <a
      href={PHONE_HREF}
      className="call-fab"
      aria-label={`Pozovite advokata Maju Mrđen: ${PHONE_DISPLAY}`}
      title={`Pozovite: ${PHONE_DISPLAY}`}
    >
      <span className="call-fab-label" aria-hidden="true">
        <span className="call-fab-small">Pozovite odmah</span>
        <span className="call-fab-num">{PHONE_DISPLAY}</span>
      </span>
      <span className="call-fab-icon">
        <PhoneSolidIcon />
      </span>
    </a>
  );
}
