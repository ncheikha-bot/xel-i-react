/* ============ THÉÂTRE À L'ÉCOLE : bénéfices, programme, offre établissements ============ */

const BENEFICES = [
  { icone: "🗣️", titre: "Expression orale & confiance", texte: "Prendre la parole, projeter sa voix, structurer ses idées — des compétences qui se transfèrent dans toutes les matières et dans la vie." },
  { icone: "❤️", titre: "Intelligence émotionnelle", texte: "Identifier, nommer et incarner des émotions : l'enfant développe une conscience fine de lui-même et de l'autre." },
  { icone: "🤝", titre: "Esprit d'équipe & écoute", texte: "Le jeu théâtral est collectif : écoute, respect du rythme de l'autre et co-construction — un vrai laboratoire du vivre-ensemble." },
  { icone: "🧠", titre: "Concentration & mémoire", texte: "Apprendre un texte, tenir un rôle, réagir à l'imprévu : des ressources cognitives profondes mobilisées de façon ludique." },
];

const PROGRAMME = [
  "🏃 Corps en mouvement", "😊 Jeux d'émotions", "🎤 La voix & l'intonation",
  "🦁 Imitation & personnages", "📖 Histoires jouées", "🤲 Improvisation guidée",
  "🌟 Travail collectif", "🎭 Mini-spectacle final",
];

export default function Theatre() {
  return (
    <section className="section section--dark theatre" id="theatre">
      <div className="container">
        <div className="theatre__head">
          <p className="section__label section__label--light reveal">🎭 Le théâtre à l'école</p>
          <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
            « Sur scène comme dans la vie — <span className="script accent-yellow">l'enfant qui ose</span> est l'enfant qui grandit. »
          </h2>
          <p className="section__intro reveal" style={{ "--d": ".14s" }}>
            Le théâtre est l'une des disciplines les plus complètes pour le développement de l'enfant.
            Pratiqué régulièrement, il ne lui apprend pas à jouer un rôle — il lui apprend à se
            connaître, à s'exprimer et à habiter le monde avec confiance et présence.
          </p>
        </div>

        <ul className="cards cards--4 cards--on-dark">
          {BENEFICES.map((b, i) => (
            <li className="card reveal" style={{ "--d": i * 0.1 + "s" }} key={b.titre}>
              <span className="card__icon" aria-hidden="true">{b.icone}</span>
              <h3>{b.titre}</h3>
              <p>{b.texte}</p>
            </li>
          ))}
        </ul>

        <div className="theatre__programme reveal">
          <h3>Un programme de <span className="script accent-yellow">6 mois</span> qui couvre :</h3>
          <ul className="tags">
            {PROGRAMME.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>

        <div className="theatre__offer reveal">
          <div className="theatre__offer-text">
            <h3>Vous dirigez un établissement scolaire&nbsp;?</h3>
            <p>
              Xel i intègre des ateliers hebdomadaires de théâtre à votre programme et prend tout en
              charge : <strong>intervenant qualifié, conception des séances, matériel et suivi
              pédagogique</strong>. Vous fournissez simplement un espace disponible. Chaque programme
              se clôt sur une représentation devant les familles — un moment de fierté partagée.
            </p>
            <a href="#contact" className="btn btn--yellow">Demander une rencontre sans engagement</a>
          </div>
        </div>
      </div>
    </section>
  );
}
