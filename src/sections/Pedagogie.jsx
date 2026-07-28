/* ============ PÉDAGOGIE : progression, adaptation, valorisation + compétences ============ */

const PILIERS = [
  {
    num: "01",
    titre: "Progression",
    texte: "Chaque programme est structuré sur 6 mois, du geste libre à la création autonome. Chaque étape a du sens et s'appuie sur la précédente.",
  },
  {
    num: "02",
    titre: "Adaptation",
    texte: "Les activités sont ajustées à l'âge, au niveau et aux besoins de chaque enfant. L'erreur est valorisée comme étape normale du cheminement créatif.",
  },
  {
    num: "03",
    titre: "Valorisation",
    texte: "Chaque enfant repart avec ses créations. Le processus prime sur le résultat. Chaque progrès, même petit, est reconnu, nommé et célébré.",
  },
];

const COMPETENCES = [
  { icone: "🧠", titre: "Cognitives", texte: "Concentration, attention, pensée critique, autonomie, mémoire, motricité fine." },
  { icone: "❤️", titre: "Émotionnelles", texte: "Gestion des émotions, conscience de soi, confiance en soi et dans les autres." },
  { icone: "🤝", titre: "Sociales", texte: "Travail en groupe, écoute, respect de l'autre, compréhension de soi et du groupe." },
  { icone: "🌍", titre: "Culturelles", texte: "Ancrage identitaire, ouverture au monde, sens esthétique, histoire de l'art." },
];

export default function Pedagogie() {
  return (
    <section className="section pedagogie" id="pedagogie">
      <div className="container">
        <div className="pedagogie__head">
          <div>
            <p className="section__label reveal">Notre approche pédagogique</p>
            <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
              La liberté dans un{" "}
              <span className="accent-underline accent-underline--pink">cadre sécurisant</span>
            </h2>
          </div>
          <p className="section__intro reveal" style={{ "--d": ".14s" }}>
            Chaque atelier Xel i est pensé comme un espace d'exploration, de liberté et de
            bienveillance. Nous ne cherchons pas à produire des artistes : nous accompagnons
            des enfants qui grandissent.
          </p>
        </div>

        <ul className="cards cards--3">
          {PILIERS.map((p, i) => (
            <li className="card card--line reveal" style={{ "--d": i * 0.12 + "s" }} key={p.num}>
              <span className="card__num" aria-hidden="true">{p.num}</span>
              <h3>{p.titre}</h3>
              <p>{p.texte}</p>
            </li>
          ))}
        </ul>

        <div className="competences reveal">
          <h3 className="competences__title">
            Ce que l'art développe <span className="script accent">concrètement</span>
          </h3>
          <ul className="competences__list">
            {COMPETENCES.map((c, i) => (
              <li className="reveal" style={{ "--d": i * 0.08 + "s" }} key={c.titre}>
                <span className="chip" aria-hidden="true">{c.icone}</span>
                <div>
                  <strong>{c.titre}</strong>
                  <p>{c.texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
