/* ============ ART-THLÈTE : programme signature art + sport ============ */

import { asset } from "../lib/blog.js";

const WHATSAPP_ARTTHLETE =
  "https://wa.me/221787164646?text=Bonjour%20Xel%20i%20!%20Je%20souhaite%20des%20informations%20sur%20le%20programme%20Art-Thl%C3%A8te.";

export default function ArtThlete() {
  return (
    <section className="section artthlete" id="artthlete">
      <div className="container artthlete__grid">
        <div className="artthlete__content">
          <p className="section__label reveal">Programme signature</p>
          <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
            <span className="script accent">Art-Thlète</span>, quand l'artiste rencontre l'athlète
          </h2>
          <p className="reveal" style={{ "--d": ".16s" }}>
            La fusion d'<em>artiste</em> et d'<em>athlète</em> : un programme unique qui allie
            art et sport pour développer l'enfant — le corps et la créativité grandissent ensemble.
          </p>

          <ul className="artthlete__badges reveal" style={{ "--d": ".22s" }}>
            <li>
              <span className="chip" aria-hidden="true">🏝️</span>
              <div>
                <strong>Cet été sur l'île de Ngor</strong>
                <p>pour les 6 à 18 ans</p>
              </div>
            </li>
            <li>
              <span className="chip" aria-hidden="true">🏠</span>
              <div>
                <strong>À Mermoz</strong>
                <p>dès 2 ans et demi</p>
              </div>
            </li>
          </ul>

          <div className="hero__actions reveal" style={{ "--d": ".28s" }}>
            <a href={WHATSAPP_ARTTHLETE} className="btn btn--primary" target="_blank" rel="noopener">
              Inscrire mon enfant sur WhatsApp
            </a>
            <a href="#contact" className="btn btn--ghost">Poser une question</a>
          </div>
        </div>

        <div className="artthlete__visual reveal" style={{ "--d": ".15s" }}>
          <div className="artthlete__photo">
            <img
              src={asset("assets/photos/artthlete-fresque-plage.jpg")}
              alt="En plein air, un jeune élève peint une grande fresque de plage sénégalaise"
              width="1600" height="1066" loading="lazy"
            />
          </div>
          <p className="artthlete__sticker script" aria-hidden="true">art + sport&nbsp;!</p>
        </div>
      </div>
    </section>
  );
}
