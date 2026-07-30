/* ============ NOTRE TRAVAIL AVEC LES ÉCOLES (7 domaines) + le théâtre ============ */

import { asset } from "../lib/blog.js";
import { DISCIPLINES, ECOLES } from "../lib/contenu.js";

const BENEFICES = [
  { icone: "🗣️", titre: "Expression orale & confiance", texte: "Prendre la parole, projeter sa voix, structurer ses idées — des compétences qui se transfèrent dans toutes les matières et dans la vie." },
  { icone: "❤️", titre: "Intelligence émotionnelle", texte: "Identifier, nommer et incarner des émotions : l'enfant développe une conscience fine de lui-même et de l'autre." },
  { icone: "🤝", titre: "Esprit d'équipe & écoute", texte: "Le jeu théâtral est collectif : écoute, respect du rythme de l'autre et co-construction — un vrai laboratoire du vivre-ensemble." },
  { icone: "🧠", titre: "Concentration & mémoire", texte: "Apprendre un texte, tenir un rôle, réagir à l'imprévu : des ressources cognitives profondes mobilisées de façon ludique." },
];

export default function Theatre() {
  return (
    <section className="section section--dark theatre" id="theatre">
      <div className="container">
        <div className="theatre__head">
          <p className="section__label section__label--light reveal">Notre travail avec les écoles</p>
          <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
            Xel-i intervient dans <span className="script accent-yellow">votre établissement</span>
          </h2>
          <p className="section__intro reveal" style={{ "--d": ".14s" }}>
            Notre collaboration avec les écoles couvre nos <strong>7 domaines d'activité</strong> —
            pas seulement le théâtre. Xel-i apporte l'intervenant, le contenu pédagogique et le
            matériel ; vous fournissez un espace disponible.
          </p>

          <ul className="tags reveal" style={{ "--d": ".2s" }}>
            {DISCIPLINES.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>

        {/* ---- Réalisations concrètes ---- */}
        <div className="ecoles reveal">
          <h3 className="ecoles__titre">Ce que nous avons déjà réalisé</h3>
          <ul className="ecoles__liste">
            {ECOLES.map((e, i) => (
              <li className="ecole reveal" style={{ "--d": i * 0.1 + "s" }} key={e.nom}>
                <span className="ecole__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{e.nom}</strong>
                  <p>{e.projet}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="ecoles__photos">
            <figure className="ecoles__photo reveal">
              <img
                src={asset("assets/photos/manuel-poissons-papier.jpg")}
                alt="Des poissons en papier aux écailles colorées réalisés par un groupe d'enfants"
                width="960" height="1280" loading="lazy"
              />
              <figcaption>Activité manuelle en groupe</figcaption>
            </figure>
            <figure className="ecoles__photo reveal" style={{ "--d": ".1s" }}>
              <img
                src={asset("assets/photos/peinture-oeuvres-planches.jpg")}
                alt="Les œuvres peintes des élèves alignées à sécher sur les bâches"
                width="1600" height="1066" loading="lazy"
              />
              <figcaption>Les œuvres d'une séance de peinture</figcaption>
            </figure>
            <figure className="ecoles__photo reveal" style={{ "--d": ".2s" }}>
              <img
                src={asset("assets/photos/calligraphie-carte-merci.jpg")}
                alt="Une carte « Merci Maman » calligraphiée, ornée d'une feuille en relief"
                width="960" height="1280" loading="lazy"
              />
              <figcaption>Calligraphie &amp; carte de fête</figcaption>
            </figure>
          </div>
        </div>

        {/* ---- Focus théâtre ---- */}
        <div className="theatre__focus">
          <h3 className="theatre__focus-titre reveal">
            🎭 Focus : « Sur scène comme dans la vie —{" "}
            <span className="script accent-yellow">l'enfant qui ose</span> est l'enfant qui grandit. »
          </h3>
          <p className="section__intro reveal" style={{ "--d": ".1s" }}>
            Le théâtre est l'une des disciplines les plus complètes pour le développement de l'enfant.
            Pratiqué régulièrement, il ne lui apprend pas à jouer un rôle — il lui apprend à se
            connaître, à s'exprimer et à habiter le monde avec confiance et présence.
          </p>

          <ul className="cards cards--4 cards--on-dark">
            {BENEFICES.map((b, i) => (
              <li className="card reveal" style={{ "--d": i * 0.1 + "s" }} key={b.titre}>
                <span className="card__icon" aria-hidden="true">{b.icone}</span>
                <h3>{b.titre}</h3>
                <p>{b.texte}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="theatre__offer reveal">
          <div className="theatre__offer-text">
            <h3>Vous dirigez un établissement scolaire&nbsp;?</h3>
            <p>
              Xel-i intègre des ateliers hebdomadaires à votre programme, dans la discipline de
              votre choix, et prend tout en charge : <strong>intervenant qualifié, conception des
              séances, matériel et suivi pédagogique</strong>. Chaque programme se clôt sur une
              restitution devant les familles — un moment de fierté partagée.
            </p>
            <a href="#contact" className="btn btn--yellow">Demander une rencontre sans engagement</a>
          </div>
        </div>
      </div>
    </section>
  );
}
