/* ============ LES 7 DISCIPLINES + tout le matériel fourni ============ */

import { asset } from "../lib/blog.js";

/* Illustration SVG pour la calligraphie (aucune photo disponible) */
function IllustrationCalligraphie() {
  return (
    <svg viewBox="0 0 300 200" role="img" aria-label="Illustration d'un trait de calligraphie">
      <circle cx="240" cy="52" r="34" fill="#DFB0CD" opacity=".5" />
      <circle cx="55" cy="150" r="26" fill="#EBBE36" opacity=".45" />
      <path d="M40 130 C 80 40, 120 40, 150 95 S 215 165, 262 78" fill="none" stroke="#3E4E3E" strokeWidth="14" strokeLinecap="round" />
      <path d="M40 130 C 80 40, 120 40, 150 95" fill="none" stroke="#EBBE36" strokeWidth="5" strokeLinecap="round" opacity=".85" />
      <circle cx="268" cy="66" r="7" fill="#3E4E3E" />
    </svg>
  );
}

/* Illustration SVG pour le théâtre (masques) */
function IllustrationTheatre() {
  return (
    <svg viewBox="0 0 300 200" role="img" aria-label="Illustration de masques de théâtre">
      <circle cx="70" cy="55" r="38" fill="#DFB0CD" opacity=".55" />
      <circle cx="245" cy="150" r="30" fill="#EBBE36" opacity=".5" />
      <g transform="rotate(-8 120 100)">
        <ellipse cx="120" cy="100" rx="46" ry="56" fill="#EBBE36" />
        <circle cx="104" cy="88" r="6" fill="#3E4E3E" />
        <circle cx="136" cy="88" r="6" fill="#3E4E3E" />
        <path d="M100 118 Q120 138 140 118" stroke="#3E4E3E" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>
      <g transform="rotate(10 195 105)">
        <ellipse cx="195" cy="105" rx="42" ry="52" fill="#DFB0CD" />
        <circle cx="181" cy="94" r="5.5" fill="#3E4E3E" />
        <circle cx="209" cy="94" r="5.5" fill="#3E4E3E" />
        <path d="M179 132 Q195 118 211 132" stroke="#3E4E3E" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>
      <path d="M30 170 C 60 150, 90 185, 130 170" stroke="#3E4E3E" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* Les 7 domaines d'activité de Xel-i */
const COURS = [
  {
    titre: "Peinture",
    texte: "Liberté de création : choix des couleurs, des formes, de l'interprétation et de l'expérimentation — le geste libre avant tout.",
    image: "assets/photos/atelier-peinture-toile.jpg",
    alt: "Une élève aux longues tresses peint une sirène sur sa toile bleue",
    w: 1600, h: 1066,
  },
  {
    titre: "Théâtre",
    texte: "Corps, voix et présence : l'enfant découvre qu'il a quelque chose à dire au monde.",
    illustration: <IllustrationTheatre />,
    lien: { href: "#theatre", libelle: "Voir le programme théâtre" },
  },
  {
    titre: "Calligraphie",
    texte: "L'élégance du trait : rythme, précision et concentration — l'écriture devient un art à part entière.",
    illustration: <IllustrationCalligraphie />,
  },
  {
    titre: "Dessin",
    texte: "Le regard avant le trait : observation, repères et perspective — les fondations de toutes les autres disciplines.",
    image: "assets/photos/atelier-dessin-regle.jpg",
    alt: "Un élève trace ses repères à la règle avant de dessiner",
    w: 1066, h: 1600, position: "center 38%",
  },
  {
    titre: "Activité manuelle",
    texte: "Découper, coller, assembler, crocheter : la main apprend en fabriquant, et l'objet fini devient une fierté.",
    image: "assets/photos/atelier-collage-fleur.jpg",
    alt: "Un enfant réalise le collage d'une fleur peinte en papier découpé",
    w: 1600, h: 1066,
  },
  {
    titre: "Modelage",
    texte: "La matière prend forme entre les mains : volumes, motricité fine et patience du geste.",
    image: "assets/photos/atelier-modelage-mains.jpg",
    alt: "Les mains d'un enfant façonnent l'argile sur la table de l'atelier",
    w: 1600, h: 1066,
  },
  {
    titre: "Perlage",
    texte: "Perles, sequins et boutons composent des œuvres éclatantes — minutie, patience et sens de la couleur.",
    image: "assets/photos/oeuvres-eleves.jpg",
    alt: "Trois portraits créés par les élèves en sequins, perles et boutons",
    w: 1066, h: 1600, position: "center 45%",
  },
];

export default function Ateliers() {
  return (
    <section className="section section--tinted ateliers" id="ateliers">
      <div className="container">
        <p className="section__label reveal">Nos cours d'art</p>
        <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
          7 disciplines pour <span className="script accent">grandir en créant</span>
        </h2>
        <p className="section__intro reveal" style={{ "--d": ".14s" }}>
          Une formule accessible qui ouvre l'accès à de nombreuses disciplines — pour les enfants,
          et aussi pour les adultes. <strong>Tout le matériel est fourni.</strong>
        </p>

        <ul className="ateliers__grid">
          {COURS.map((c, i) => (
            <li className="atelier-card reveal" style={{ "--d": (i % 3) * 0.08 + "s" }} key={c.titre}>
              {c.illustration ? (
                <div className="atelier-card__img atelier-card__img--illu" aria-hidden="true">
                  {c.illustration}
                </div>
              ) : (
                <div className="atelier-card__img">
                  <img
                    src={asset(c.image)} alt={c.alt}
                    width={c.w} height={c.h} loading="lazy"
                    style={c.position ? { objectPosition: c.position } : undefined}
                  />
                </div>
              )}
              <div className="atelier-card__body">
                <h3>{c.titre}</h3>
                <p>
                  {c.texte}{" "}
                  {c.lien ? <a className="link-arrow" href={c.lien.href}>{c.lien.libelle}</a> : null}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="ateliers__bas">
          <p className="ateliers__adultes reveal">
            <span aria-hidden="true">🎨</span>
            <span>
              <strong>Et pour les adultes ?</strong> Des cours de dessin et de peinture sont ouverts —
              pour l'instant ! D'autres disciplines arrivent.
            </span>
          </p>
          <p className="ateliers__expo reveal" style={{ "--d": ".1s" }}>
            <span aria-hidden="true">🖼️</span>
            <span>
              <strong>L'exposition de fin d'année.</strong> Chaque année, Xel-i organise une
              exposition qui montre toute l'évolution de ses artistes — un moment de fierté
              pour les enfants et les familles.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
