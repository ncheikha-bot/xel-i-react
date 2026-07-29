/* ============ MARQUEE : bandeau défilant des disciplines ============ */

import { DISCIPLINES as SEPT } from "../lib/contenu.js";

const DISCIPLINES = [...SEPT, "Enfants & adultes"];

function Groupe() {
  return (
    <span className="marquee__group">
      {DISCIPLINES.map((d) => (
        <span key={d}>
          {d} <i className="fleur">✿</i>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <Groupe />
        <Groupe />
      </div>
    </div>
  );
}
