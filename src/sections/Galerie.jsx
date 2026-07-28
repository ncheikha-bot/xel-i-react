/* ============ GALERIE : slider horizontal + lightbox clavier ============ */

import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "../lib/blog.js";
import { useReducedMotion } from "../lib/hooks.js";

const PHOTOS = [
  { src: "assets/photos/equipe-sculpture-prof.jpg", alt: "Professeur de Xel i sculptant une tête en argile dans l'atelier", w: 1600, h: 1066 },
  { src: "assets/photos/oeuvres-eleves.jpg", alt: "Trois portraits créés par les élèves en sequins, perles et boutons", w: 1066, h: 1600 },
  { src: "assets/photos/atelier-peinture-toile.jpg", alt: "Élève aux longues tresses peignant une sirène sur toile bleue", w: 1600, h: 1066 },
  { src: "assets/photos/atelier-groupe-natte.jpg", alt: "Professeur et enfants réunis sur la natte pour une séance de dessin", w: 1066, h: 1600 },
  { src: "assets/photos/artthlete-fresque-plage.jpg", alt: "Jeune élève peignant une fresque de plage en plein air", w: 1600, h: 1066 },
  { src: "assets/photos/atelier-sculpture-artiste.jpg", alt: "Artiste encadrant de Xel i concentré sur une sculpture en argile", w: 1600, h: 1066 },
  { src: "assets/photos/atelier-crochet-mains.jpg", alt: "Mains d'une élève réalisant une chaînette au crochet", w: 1066, h: 1600 },
  { src: "assets/photos/atelier-collage-fleur.jpg", alt: "Enfant réalisant le collage d'une fleur peinte en papier découpé", w: 1600, h: 1066 },
  { src: "assets/photos/atelier-poterie-pots.jpg", alt: "Pots fraîchement peints en rose, rouge et violet séchant au soleil", w: 1066, h: 1600 },
  { src: "assets/photos/atelier-peinture-petite-enfance.jpg", alt: "Encadrante peignant un ciel étoilé avec une toute petite élève", w: 1600, h: 1066 },
  { src: "assets/photos/atelier-modelage-mains.jpg", alt: "Mains d'un enfant façonnant l'argile sur la table de l'atelier", w: 1600, h: 1066 },
  { src: "assets/photos/atelier-sequins-artiste.jpg", alt: "Un artiste rehausse de sequins le portrait d'une femme au chapeau", w: 1600, h: 1066 },
  { src: "assets/photos/equipe-dessin-sol.jpg", alt: "Professeur au bonnet traditionnel dessinant au sol avec les enfants", w: 1066, h: 1600 },
  { src: "assets/photos/atelier-crochet-groupe.jpg", alt: "Atelier de crochet en groupe autour de la table colorée", w: 1600, h: 1066 },
];

export default function Galerie() {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const [lightbox, setLightbox] = useState(-1); // -1 = fermée
  const reduit = useReducedMotion();

  /* --- Défilement animé (le smooth natif est annulé par scroll-snap) --- */
  const scrollVers = useCallback((left) => {
    const track = trackRef.current;
    if (!track) return;
    if (reduit) { track.scrollLeft = left; return; }
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const depart = track.scrollLeft;
    const distance = left - depart;
    const duree = 550;
    let t0 = null;
    track.style.scrollSnapType = "none";

    const etape = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duree, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      track.scrollLeft = depart + distance * eased;
      if (p < 1) {
        animRef.current = requestAnimationFrame(etape);
      } else {
        animRef.current = null;
        track.style.scrollSnapType = "";
      }
    };
    animRef.current = requestAnimationFrame(etape);
  }, [reduit]);

  const glisser = useCallback((direction) => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.querySelectorAll(".slider__item"));
    if (!items.length) return;

    /* item actuellement centré */
    const centre = track.scrollLeft + track.clientWidth / 2;
    let index = 0;
    let meilleure = Infinity;
    items.forEach((item, i) => {
      const d = Math.abs(item.offsetLeft + item.offsetWidth / 2 - centre);
      if (d < meilleure) { meilleure = d; index = i; }
    });

    let cible = index + direction * 2;
    if (cible > items.length - 1) cible = 0;      // boucle
    if (cible < 0) cible = items.length - 1;

    const item = items[cible];
    const left = Math.max(
      0,
      Math.min(
        item.offsetLeft + item.offsetWidth / 2 - track.clientWidth / 2,
        track.scrollWidth - track.clientWidth
      )
    );
    scrollVers(left);
  }, [scrollVers]);

  /* --- Défilement automatique, en pause hors écran / survol / lightbox --- */
  useEffect(() => {
    if (reduit) return undefined;
    const track = trackRef.current;
    if (!track) return undefined;

    let enPause = false;
    let visible = false;

    const pause = () => { enPause = true; };
    const reprise = () => { enPause = false; };
    const repriseDifferee = () => { window.setTimeout(reprise, 6000); };

    ["mouseenter", "focusin", "touchstart", "pointerdown"].forEach((evt) =>
      track.addEventListener(evt, pause, { passive: true })
    );
    ["mouseleave", "focusout"].forEach((evt) => track.addEventListener(evt, reprise));
    ["touchend", "pointerup"].forEach((evt) =>
      track.addEventListener(evt, repriseDifferee, { passive: true })
    );

    const io = new IntersectionObserver(
      (entries) => { visible = entries[0].isIntersecting; },
      { threshold: 0.6 }
    );
    io.observe(track);

    const timer = window.setInterval(() => {
      if (visible && !enPause && !document.hidden && lightbox === -1) glisser(1);
    }, 5000);

    return () => {
      window.clearInterval(timer);
      io.disconnect();
      ["mouseenter", "focusin", "touchstart", "pointerdown"].forEach((evt) =>
        track.removeEventListener(evt, pause)
      );
      ["mouseleave", "focusout"].forEach((evt) => track.removeEventListener(evt, reprise));
      ["touchend", "pointerup"].forEach((evt) => track.removeEventListener(evt, repriseDifferee));
    };
  }, [glisser, lightbox, reduit]);

  /* --- Lightbox : clavier + blocage du défilement --- */
  useEffect(() => {
    if (lightbox === -1) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(-1);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % PHOTOS.length);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <section className="section galerie" id="galerie">
      <div className="container">
        <p className="section__label reveal">La vie de l'école</p>
        <div className="galerie__head">
          <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
            Dans nos ateliers, <span className="script accent">en images</span>
          </h2>
          <div className="slider__controls reveal" style={{ "--d": ".16s" }}>
            <button type="button" className="slider__btn" aria-label="Photos précédentes" onClick={() => glisser(-1)}>←</button>
            <button type="button" className="slider__btn" aria-label="Photos suivantes" onClick={() => glisser(1)}>→</button>
          </div>
        </div>
      </div>

      <div className="slider reveal" style={{ "--d": ".2s" }}>
        <ul
          className="slider__track"
          ref={trackRef}
          tabIndex={0}
          aria-label="Galerie photos de l'école — utilisez les flèches pour faire défiler"
        >
          {PHOTOS.map((photo, i) => (
            <li className="slider__item" key={photo.src}>
              <button
                type="button"
                className="galerie__btn"
                aria-label={"Agrandir : " + photo.alt}
                onClick={() => setLightbox(i)}
              >
                <img src={asset(photo.src)} alt={photo.alt} width={photo.w} height={photo.h} loading="lazy" />
              </button>
            </li>
          ))}
          <li className="slider__item slider__item--cta">
            <a className="galerie__insta" href="https://instagram.com/ecolexeli" target="_blank" rel="noopener">
              <span className="galerie__insta-icon" aria-hidden="true">✿</span>
              <span>
                Suivez la vie de l'école<br />
                <strong>@ecolexeli</strong>
              </span>
            </a>
          </li>
        </ul>
      </div>

      {lightbox !== -1 && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo agrandie"
          onClick={(e) => { if (e.target === e.currentTarget) setLightbox(-1); }}
        >
          <button className="lightbox__close" aria-label="Fermer" onClick={() => setLightbox(-1)}>×</button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Photo précédente"
            onClick={() => setLightbox((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)}
          >←</button>
          <img className="lightbox__img" src={asset(PHOTOS[lightbox].src)} alt={PHOTOS[lightbox].alt} />
          <button
            className="lightbox__nav lightbox__nav--next"
            aria-label="Photo suivante"
            onClick={() => setLightbox((i) => (i + 1) % PHOTOS.length)}
          >→</button>
        </div>
      )}
    </section>
  );
}
