/* ==========================================================================
   XEL I — Page d'accueil : hero, marquee, vision, valeurs, pédagogie,
   cours d'art, Art-Thlète, théâtre, équipe, galerie, familles,
   inscription, contact.
   ========================================================================== */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { asset } from "../lib/blog.js";
import { useScrollReveal, useDocumentMeta } from "../lib/hooks.js";
import Hero from "../sections/Hero.jsx";
import Marquee from "../sections/Marquee.jsx";
import Vision from "../sections/Vision.jsx";
import Valeurs from "../sections/Valeurs.jsx";
import Pedagogie from "../sections/Pedagogie.jsx";
import Ateliers from "../sections/Ateliers.jsx";
import ArtThlete from "../sections/ArtThlete.jsx";
import EmploiDuTemps from "../sections/EmploiDuTemps.jsx";
import Theatre from "../sections/Theatre.jsx";
import Equipe from "../sections/Equipe.jsx";
import Galerie from "../sections/Galerie.jsx";
import Familles from "../sections/Familles.jsx";
import Inscription from "../sections/Inscription.jsx";
import Contact from "../sections/Contact.jsx";

export default function Accueil() {
  const { hash } = useLocation();
  useScrollReveal("accueil");
  useDocumentMeta(
    "Xel-i — École d'art à Dakar · Peinture, théâtre, calligraphie, dessin, modelage, perlage",
    "Xel-i, première école d'art extrascolaire de Dakar, ouverte toute l'année pour enfants et adultes. 7 disciplines, matériel fourni, et ART'thlète (art + sport) à Mermoz et sur l'île de Ngor. Almadies en octobre 2026."
  );

  /* Défilement vers l'ancre après le rendu (navigation depuis une autre page) */
  useEffect(() => {
    if (!hash) return;
    const cible = document.querySelector(hash);
    if (cible) {
      window.requestAnimationFrame(() => {
        cible.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [hash]);

  return (
    <main id="top">
      <Hero />
      <Marquee />
      <Vision />
      <Valeurs />
      <Pedagogie />
      <Ateliers />
      <ArtThlete />
      <EmploiDuTemps />
      <Theatre />
      <Equipe />
      <Galerie />
      <Familles />
      <Inscription />
      <Contact />
    </main>
  );
}

/* Réexport pratique pour les sections (chemins d'images) */
export { asset };
