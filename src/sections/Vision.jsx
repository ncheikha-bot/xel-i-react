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
            Xel-i est née d'une conviction profonde : les compétences artistiques doivent être
            accessibles dès le plus jeune âge. Dans un monde plein d'images, Xel-i apprend aux
            enfants à <strong>expérimenter leurs créations</strong>, à développer leur confiance
            en étant libres et fiers de ce qu'ils créent, et à prendre goût au processus qui
            donne vie à une création.
          </p>
          <p className="reveal" style={{ "--d": ".22s" }}>
            Xel-i facilite aussi la vie des parents, qui manquent de temps, tout en assurant le
            développement global et le bien-être de leur enfant. L'école est{" "}
            <strong>ouverte toute l'année</strong>, pour les enfants comme pour les adultes.
          </p>

          <ul className="lieux reveal" style={{ "--d": ".26s" }}>
            <li className="lieu lieu--ouvert">
              <span className="lieu__etat">Ouvert</span>
              <div>
                <strong>Olympic Club — Mermoz</strong>
                <p>Cours d'art à l'année &amp; ART'thlète Tennis</p>
              </div>
            </li>
            <li className="lieu lieu--ouvert">
              <span className="lieu__etat">Ouvert</span>
              <div>
                <strong>Île de Ngor</strong>
                <p>Camp ART'thlète — art, sport et mer</p>
              </div>
            </li>
            <li className="lieu lieu--bientot">
              <span className="lieu__etat">Octobre 2026</span>
              <div>
                <strong>Almadies</strong>
                <p>Un espace quatre fois plus grand que le site actuel</p>
              </div>
            </li>
          </ul>

          <ul className="stats reveal" style={{ "--d": ".3s" }}>
            <Stat cible={1} exposant="ʳᵉ" libelle="école d'art extrascolaire de Dakar, enfants & adultes" />
            <Stat cible={7} suffixe=" disciplines" libelle="de la peinture au perlage — tout le matériel est fourni" />
            <Stat cible={3} suffixe=" lieux" libelle="Mermoz, île de Ngor, et les Almadies à la rentrée" />
          </ul>
        </div>
      </div>
    </section>
  );
}
