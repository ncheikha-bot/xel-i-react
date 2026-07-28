/* ============ FAMILLES : alliance éducative + photo en parallaxe ============ */

import { useEffect, useRef } from "react";
import { asset } from "../lib/blog.js";
import { useReducedMotion } from "../lib/hooks.js";

const ENGAGEMENTS = [
  "Un dialogue régulier après chaque cours",
  "Partager les évolutions de l'enfant, sans notation",
  "Respecter les choix familiaux et la diversité culturelle",
  "Être accessibles et à l'écoute à tout moment",
  "Soutenir la parentalité, sans jamais s'y substituer",
];

export default function Familles() {
  const imgRef = useRef(null);
  const reduit = useReducedMotion();

  /* Parallaxe légère (transform uniquement, via rAF) */
  useEffect(() => {
    if (reduit || window.innerWidth <= 860) return undefined;
    const img = imgRef.current;
    if (!img) return undefined;

    let enAttente = false;
    const maj = () => {
      const rect = img.parentElement.getBoundingClientRect();
      const decalage = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.08;
      img.style.transform = `translateY(${(-decalage).toFixed(1)}px)`;
      enAttente = false;
    };
    const onScroll = () => {
      if (!enAttente) { requestAnimationFrame(maj); enAttente = true; }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    maj();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduit]);

  return (
    <section className="section section--tinted familles" id="familles">
      <div className="container familles__grid">
        <div className="familles__content">
          <p className="section__label reveal">L'alliance avec les familles</p>
          <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
            Grandir, <span className="script accent">ensemble</span>
          </h2>
          <p className="reveal" style={{ "--d": ".14s" }}>
            Les parents sont les premiers éducateurs de leurs enfants. Xel i reconnaît pleinement ce
            rôle et s'engage à construire avec eux une véritable alliance éducative, fondée sur la
            confiance, le dialogue et le respect mutuel. Les parents connaissent leur enfant de
            l'extérieur&nbsp;; nous l'accompagnons de l'intérieur.
          </p>
          <ul className="checklist reveal" style={{ "--d": ".2s" }}>
            {ENGAGEMENTS.map((e) => <li key={e}>{e}</li>)}
          </ul>
          <blockquote className="familles__quote reveal" style={{ "--d": ".26s" }}>
            « Nous ne promettons pas que votre enfant deviendra artiste. Nous nous engageons à
            accompagner son épanouissement, à soutenir sa confiance et à favoriser le développement
            d'un regard unique sur le monde. »
          </blockquote>
        </div>

        <div className="familles__visual reveal" style={{ "--d": ".15s" }}>
          <div className="familles__photo">
            <img
              ref={imgRef}
              src={asset("assets/photos/atelier-crochet-groupe.jpg")}
              alt="Petits et grands réunis autour de la table pour un atelier de crochet"
              width="1600" height="1066" loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
