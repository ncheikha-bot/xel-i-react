/* ============ L'ÉQUIPE : professeurs diplômés des Beaux-Arts ============ */

import { asset } from "../lib/blog.js";
import { WHATSAPP } from "../components/Footer.jsx";

export default function Equipe() {
  return (
    <section className="section section--tinted equipe" id="equipe">
      <div className="container equipe__grid">
        <div className="equipe__visual reveal">
          <div className="equipe__photo-main">
            <img
              src={asset("assets/photos/equipe-sculpture-prof.jpg")}
              alt="Un professeur de Xel i sculpte une tête en argile pendant qu'une élève travaille à ses côtés"
              width="1600" height="1066" loading="lazy"
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
            Jeune, passionnée, <span className="script accent">diplômée des Beaux-Arts</span>
          </h2>
          <p className="reveal" style={{ "--d": ".16s" }}>
            Nos professeurs sont diplômés des Beaux-Arts, jeunes et passionnés. Plus qu'une
            école, Xel i est un lieu de vie où les enfants grandissent ensemble — entourés
            d'adultes qui aiment profondément leur métier.
          </p>
          <p className="reveal" style={{ "--d": ".22s" }}>
            Une question, un doute, une inscription de dernière minute ? L'équipe est très
            réactive par appel et WhatsApp, à toute heure.
          </p>
          <div className="hero__actions reveal" style={{ "--d": ".28s" }}>
            <a href={WHATSAPP} className="btn btn--primary" target="_blank" rel="noopener">
              Écrire sur WhatsApp — 24h/24
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
