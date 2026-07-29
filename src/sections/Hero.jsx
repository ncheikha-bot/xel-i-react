/* ============ HERO : titre révélé mot à mot, photo en arche ============ */

import { asset } from "../lib/blog.js";

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      {/* taches organiques décoratives */}
      <svg className="hero__blob hero__blob--pink" viewBox="0 0 200 200" aria-hidden="true">
        <path fill="currentColor" d="M45.7,-59.2C58.9,-49.5,69.1,-35.5,73.3,-19.7C77.6,-3.9,75.9,13.7,68.2,27.8C60.5,41.9,46.7,52.5,31.8,59.7C16.9,66.9,0.8,70.6,-15.5,68.3C-31.8,66,-48.3,57.7,-58.6,44.5C-68.9,31.3,-73,13.2,-71.6,-4.3C-70.2,-21.8,-63.3,-38.6,-51.3,-48.6C-39.3,-58.6,-22.2,-61.8,-4.1,-57.1C14,-52.4,32.5,-68.9,45.7,-59.2Z" transform="translate(100 100)" />
      </svg>
      <svg className="hero__blob hero__blob--yellow" viewBox="0 0 200 200" aria-hidden="true">
        <path fill="currentColor" d="M39.9,-51.9C54.3,-42.4,69.5,-32.2,74.6,-18.2C79.7,-4.2,74.7,13.7,66.1,28.9C57.5,44.1,45.2,56.7,30.5,62.8C15.8,68.9,-1.4,69.6,-17.6,64.9C-33.8,60.2,-49,50.1,-59.3,36.1C-69.6,22.1,-75,4.1,-71.8,-11.9C-68.6,-27.9,-56.8,-41.9,-43,-51.6C-29.2,-61.3,-14.6,-66.7,-0.2,-66.4C14.1,-66.2,25.5,-61.4,39.9,-51.9Z" transform="translate(100 100)" />
      </svg>

      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__badge reveal-load" style={{ "--d": ".1s" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="10" r="2.5" fill="currentColor" />
            </svg>
            Mermoz &amp; île de Ngor&nbsp;·&nbsp;enfants &amp; adultes
          </p>

          <h1 className="hero__title" aria-label="Un lieu qui relie. Un lieu qui élève. Un lieu qui construit l'humain.">
            <span className="line">
              <span className="word">Un&nbsp;lieu&nbsp;qui</span>{" "}
              <span className="word accent-underline">relie</span>
              <span className="word">.</span>
            </span>
            <span className="line">
              <span className="word">Un&nbsp;lieu&nbsp;qui</span>{" "}
              <span className="word accent-underline accent-underline--pink">élève</span>
              <span className="word">.</span>
            </span>
            <span className="line">
              <span className="word">Un</span> <span className="word">lieu</span>{" "}
              <span className="word">qui</span> <span className="word">construit</span>
            </span>
            <span className="line"><span className="word script">l'humain.</span></span>
          </h1>

          <p className="hero__text reveal-load" style={{ "--d": ".9s" }}>
            <strong>Xel-i</strong> est la première école d'art extrascolaire de Dakar,{" "}
            <strong>ouverte toute l'année</strong>, pour enfants et adultes. Dans un monde plein
            d'images, nous apprenons aux enfants à créer les leurs — libres et fiers de ce
            qu'ils font.
          </p>

          <div className="hero__actions reveal-load" style={{ "--d": "1.05s" }}>
            <a href="#ecole" className="btn btn--primary">Découvrir l'école</a>
            <a href="#inscription" className="btn btn--ghost">S'inscrire</a>
          </div>
        </div>

        <div className="hero__visual reveal-load" style={{ "--d": ".5s" }}>
          <div className="hero__arch">
            <img
              src={asset("assets/photos/atelier-peinture-fillette.jpg")}
              alt="Une petite élève de Xel i, entourée de pinceaux, concentrée sur sa peinture"
              width="1600" height="1067" fetchpriority="high"
              style={{ objectPosition: "62% center" }}
            />
          </div>
          <svg className="hero__scribble" viewBox="0 0 120 40" aria-hidden="true">
            <path d="M4 30 C 25 8, 45 8, 60 22 S 95 38, 116 12" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
