/* ============ L'ÉQUIPE : professeurs reconnus, diplômés des Beaux-Arts ============ */

import { asset } from "../lib/blog.js";
import { WHATSAPP_MERMOZ } from "../lib/contenu.js";

const METIERS = [
  "Réalisateurs", "Comédiens", "Sculpteurs",
  "Peintres", "Percussionnistes", "Calligraphes",
];

export default function Equipe() {
  return (
    <section className="section section--tinted equipe" id="equipe">
      <div className="container equipe__grid">
        <div className="equipe__visual reveal">
          <div className="equipe__photo-main">
            <img
              src={asset("assets/photos/theatre-seance-groupe.jpg")}
              alt="Un professeur guide une élève devant le groupe assis sur la natte, à l'extérieur de l'école"
              width="1066" height="1600" loading="lazy"
              style={{ objectPosition: "center 38%" }}
            />
          </div>
          <div className="equipe__photo-small reveal" style={{ "--d": ".2s" }}>
            <img
              src={asset("assets/photos/equipe-accompagnement-peinture.jpg")}
              alt="Un professeur guide le pinceau d'un jeune élève devant sa toile"
              width="1066" height="1600" loading="lazy"
            />
          </div>
        </div>

        <div className="equipe__content">
          <p className="section__label reveal">L'équipe</p>
          <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
            Des professeurs <span className="script accent">reconnus</span>, venus de tous horizons
          </h2>
          <p className="reveal" style={{ "--d": ".16s" }}>
            Une équipe passionnée d'art : des professeurs reconnus de différents horizons, et des
            assistants pédagogiques professionnels <strong>diplômés des Beaux-Arts</strong>.
            Plus qu'une école, Xel-i est un lieu de vie où les enfants grandissent ensemble.
          </p>

          <ul className="tags tags--clair reveal" style={{ "--d": ".22s" }}>
            {METIERS.map((m) => <li key={m}>{m}</li>)}
          </ul>

          <p className="reveal" style={{ "--d": ".26s" }}>
            Un lien fort avec les familles : <strong>disponibilité constante et communication
            régulière</strong> avec les parents tout au long du programme — par appel et sur
            WhatsApp, à toute heure.
          </p>

          <div className="hero__actions reveal" style={{ "--d": ".3s" }}>
            <a href={WHATSAPP_MERMOZ} className="btn btn--primary" target="_blank" rel="noopener">
              Écrire sur WhatsApp — 24h/24
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
