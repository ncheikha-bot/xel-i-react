/* ============ VISION : texte fondateur, ouvertures, chiffres clés ============ */

import { asset } from "../lib/blog.js";
import { useCounter } from "../lib/hooks.js";

function Stat({ cible, prefixe, suffixe, exposant, libelle }) {
  const [ref, valeur] = useCounter(cible);
  return (
    <li className="stat">
      <span className="stat__num">
        {prefixe}
        <span ref={ref}>{valeur}</span>
        {exposant ? <sup>{exposant}</sup> : null}
        {suffixe}
      </span>
      <span className="stat__label">{libelle}</span>
    </li>
  );
}

export default function Vision() {
  return (
    <section className="section vision" id="ecole">
      <div className="container vision__grid">
        <div className="vision__visual reveal">
          <div className="vision__photo">
            <img
              src={asset("assets/photos/atelier-crochet-mains.jpg")}
              alt="Gros plan sur les mains d'une élève apprenant le crochet à l'atelier"
              width="1066" height="1600" loading="lazy"
            />
          </div>
          <figure className="vision__quote-card reveal" style={{ "--d": ".25s" }}>
            <blockquote>
              « L'art est le <em>troisième œil</em> d'un peuple : sa conscience, son reflet, sa puissance. »
            </blockquote>
          </figure>
        </div>

        <div className="vision__content">
          <p className="section__label reveal">La vision</p>
          <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
            L'art pour tous, <span className="script accent">dès le plus jeune âge</span>
          </h2>
          <p className="reveal" style={{ "--d": ".16s" }}>
            Xel i est née d'une conviction profonde : les compétences artistiques doivent être
            accessibles à tous les enfants sénégalais, dès le plus jeune âge. Xel i n'est pas un
            simple lieu d'activités — c'est un espace de construction intérieure, de construction
            sociale et de découverte de soi, ancré dans les valeurs humanistes et la richesse
            culturelle de l'Afrique de l'Ouest.
          </p>
          <p className="reveal" style={{ "--d": ".22s" }}>
            L'ambition est aujourd'hui plus large : devenir un espace artistique multiculturel et
            multigénérationnel, avec des cours adaptés à chaque âge et des ateliers qui rassemblent
            les familles autour de la création. Et pour être au plus proche des familles, Xel i
            veut ouvrir des écoles partout au Sénégal.
          </p>

          <p className="ouvertures reveal" style={{ "--d": ".26s" }}>
            <span className="ouvertures__pin" aria-hidden="true">📍</span>
            <span>
              <strong>Bientôt près de chez vous :</strong> prochaines ouvertures aux{" "}
              <strong>Almadies</strong> et à <strong>Ngor</strong>.
            </span>
          </p>

          <ul className="stats reveal" style={{ "--d": ".3s" }}>
            <Stat cible={1} exposant="ʳᵉ" libelle="école d'art extrascolaire du Sénégal, enfants & adultes" />
            <Stat cible={7} suffixe=" disciplines" libelle="de la peinture au théâtre, en passant par la calligraphie" />
            <Stat cible={2} prefixe="dès " suffixe=" ans ½" libelle="avec Art-Thlète à Mermoz — et des cours pour adultes" />
          </ul>
        </div>
      </div>
    </section>
  );
}
