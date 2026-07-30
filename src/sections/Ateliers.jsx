/* ============ LES 7 DISCIPLINES + tout le matériel fourni ============ */

import { asset } from "../lib/blog.js";

/* Les 7 domaines d'activité de Xel-i — chacun illustré par une vraie photo d'atelier */
const COURS = [
  {
    titre: "Peinture",
    texte: "Liberté de création : choix des couleurs, des formes, de l'interprétation et de l'expérimentation — le geste libre avant tout.",
    image: "assets/photos/peinture-plein-air-sol.jpg",
    alt: "Une élève en tablier peint une grande planche de bois, assise au sol en plein air",
    w: 1600, h: 1066,
  },
  {
    titre: "Théâtre",
    texte: "Corps, voix et présence : l'enfant découvre qu'il a quelque chose à dire au monde.",
    image: "assets/photos/theatre-seance-groupe.jpg",
    alt: "Un professeur guide une élève devant le groupe assis sur la natte, en extérieur",
    w: 1066, h: 1600, position: "center 40%",
    lien: { href: "#theatre", libelle: "Voir le programme théâtre" },
  },
  {
    titre: "Calligraphie",
    texte: "L'élégance du trait : rythme, précision et concentration — l'écriture devient un art à part entière.",
    image: "assets/photos/calligraphie-listes-plume.jpg",
    alt: "Des élèves écrivent des listes de pays à la plume, en pleine page calligraphiée",
    w: 960, h: 1280, position: "center 55%",
  },
  {
    titre: "Dessin",
    texte: "Le regard avant le trait : graphisme, observation et précision — les fondations de toutes les autres disciplines.",
    image: "assets/photos/graphisme-pointilles.jpg",
    alt: "Une élève repasse au feutre un motif de graphisme tracé en pointillés",
    w: 1600, h: 900,
  },
  {
    titre: "Activité manuelle",
    texte: "Découper, coller, assembler : la main apprend en fabriquant, et l'objet fini devient une fierté.",
    image: "assets/photos/manuel-fleurs-papier.jpg",
    alt: "Des fleurs en papier de couleur assemblées sur la table, pistolet à colle à côté",
    w: 1600, h: 1034,
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
    texte: "Perles, sequins et fils composent des œuvres éclatantes — minutie, patience et sens de la couleur.",
    image: "assets/photos/perlage-couronne-perles.jpg",
    alt: "Une couronne de perles jaunes et blanches au milieu des pelotes de laine colorées",
    w: 960, h: 1280, position: "center 50%",
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
              <div className="atelier-card__img">
                <img
                  src={asset(c.image)} alt={c.alt}
                  width={c.w} height={c.h} loading="lazy"
                  style={c.position ? { objectPosition: c.position } : undefined}
                />
              </div>
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
