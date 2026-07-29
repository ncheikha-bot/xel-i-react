/* ============ ART-THLÈTE : les 3 programmes, l'île de Ngor, les offres ============ */

import { asset } from "../lib/blog.js";
import { NGOR, OFFRES, PROGRAMMES, WHATSAPP_NGOR, whatsapp, CONTACTS } from "../lib/contenu.js";

const WHATSAPP_ARTTHLETE = whatsapp(
  CONTACTS.mermoz.telInternational,
  "Bonjour Xel i ! Je souhaite des informations sur le programme ART'thlète."
);

export default function ArtThlete() {
  return (
    <section className="section artthlete" id="artthlete">
      <div className="container">
        {/* ---- Introduction + les 3 programmes ---- */}
        <div className="artthlete__grid">
          <div className="artthlete__content">
            <p className="section__label reveal">Programme signature</p>
            <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
              <span className="script accent">ART'thlète</span>, quand l'artiste rencontre l'athlète
            </h2>
            <p className="reveal" style={{ "--d": ".16s" }}>
              Le sport n'est jamais une récréation chez Xel-i : c'est un <strong>outil structurant
              de développement personnel, cognitif et social</strong>, au même titre que l'art.
              ART'thlète combine les deux — à l'Olympic Club (Mermoz) et sur l'île de Ngor.
            </p>

            <div className="hero__actions reveal" style={{ "--d": ".24s" }}>
              <a href={WHATSAPP_ARTTHLETE} className="btn btn--primary" target="_blank" rel="noopener">
                Inscrire mon enfant sur WhatsApp
              </a>
              <a href="#emploi-du-temps" className="btn btn--ghost">Voir l'emploi du temps</a>
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

        {/* ---- Les 3 formules ---- */}
        <ul className="cards cards--3 programmes">
          {PROGRAMMES.map((p, i) => (
            <li className="card card--line reveal" style={{ "--d": i * 0.1 + "s" }} key={p.cle}>
              <span className="card__icon" aria-hidden="true">{p.icone}</span>
              <h3>{p.titre}</h3>
              <p>{p.resume}</p>
              <p className="programmes__detail">{p.detail}</p>
              <p className="programmes__lieu">
                <span aria-hidden="true">📍</span> {p.lieu}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* ---- L'île de Ngor : ouvert, avec tous les détails ---- */}
      <div className="ngor" id="ngor">
        <div className="container">
          <div className="ngor__head">
            <p className="section__label section__label--light reveal">
              <span className="ngor__ouvert">Ouvert</span> Xel-i Île de Ngor
            </p>
            <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
              Une école d'art <span className="script accent-yellow">les pieds dans l'eau</span>
            </h2>
            <p className="section__intro reveal" style={{ "--d": ".14s" }}>
              Xel-i Île de Ngor accueille les 6 à 18 ans de <strong>8h à 19h</strong> : un condensé
              d'art, de sport et d'activités sociales et cognitives, dans un cadre unique.
            </p>
          </div>

          <ul className="cards cards--on-dark ngor__grid">
            {NGOR.map((n, i) => (
              <li className="card reveal" style={{ "--d": i * 0.08 + "s" }} key={n.titre}>
                <span className="card__icon" aria-hidden="true">{n.icone}</span>
                <h3>{n.titre}</h3>
                <p>{n.texte}</p>
              </li>
            ))}
          </ul>

          {/* ---- Offres de lancement ---- */}
          <div className="offres reveal">
            <h3 className="offres__titre">
              Offres de <span className="script accent-yellow">lancement</span>
            </h3>
            <ul className="offres__liste">
              {OFFRES.map((o) => (
                <li className="offre" key={o.badge}>
                  <span className="offre__badge">{o.badge}</span>
                  <div>
                    <strong>{o.titre}</strong>
                    <p>{o.texte}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hero__actions">
              <a href={WHATSAPP_NGOR} className="btn btn--yellow" target="_blank" rel="noopener">
                Réserver ma place à Ngor — {CONTACTS.ngor.tel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
