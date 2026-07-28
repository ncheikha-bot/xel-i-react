/* ============ VALEURS FONDATRICES ============ */

const VALEURS = [
  {
    icone: "🎨",
    titre: "Accessibilité",
    texte: "L'art pour tous, dès 3 ans, partout au Sénégal. L'art n'est pas réservé à une élite : c'est une discipline à part entière, un outil de construction personnelle et collective.",
  },
  {
    icone: "🤝",
    titre: "Collaboration profonde",
    texte: "Nous ne sommes pas un prestataire. Nous sommes un partenaire engagé, convaincu que l'art transforme l'enfant de l'intérieur.",
  },
  {
    icone: "🌱",
    titre: "Impact réel & durable",
    texte: "Créativité, confiance en soi, concentration, bien-être émotionnel — l'art agit profondément sur le développement global de l'enfant.",
  },
  {
    icone: "🕊️",
    titre: "Expression libre",
    texte: "Valoriser la création, le regard et la parole de chaque enfant. Nous n'imposons pas un modèle à reproduire : nous accompagnons un cheminement singulier.",
  },
];

export default function Valeurs() {
  return (
    <section className="section section--tinted valeurs" id="valeurs">
      <div className="container">
        <p className="section__label reveal">Nos valeurs fondatrices</p>
        <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
          Révéler, accompagner, <span className="script accent">soutenir</span>
        </h2>
        <p className="section__intro reveal" style={{ "--d": ".14s" }}>
          Chez Xel i, nous croyons que chaque enfant porte en lui une intelligence créative, une
          sensibilité unique et un potentiel d'expression profond. Notre rôle n'est pas de formater.
        </p>

        <ul className="cards cards--4">
          {VALEURS.map((v, i) => (
            <li className="card reveal" style={{ "--d": i * 0.1 + "s" }} key={v.titre}>
              <span className="card__icon" aria-hidden="true">{v.icone}</span>
              <h3>{v.titre}</h3>
              <p>{v.texte}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
