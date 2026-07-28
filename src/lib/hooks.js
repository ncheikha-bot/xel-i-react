/* ==========================================================================
   XEL I — Hooks partagés
   ========================================================================== */

import { useEffect, useRef, useState } from "react";

/** true si l'utilisateur préfère les animations réduites */
export function useReducedMotion() {
  const [reduit, setReduit] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduit(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduit;
}

/**
 * Révélation au scroll : ajoute la classe `in` aux éléments `.reveal`
 * du conteneur dès qu'ils entrent dans le viewport.
 * Passer une dépendance qui change quand du contenu est ajouté.
 */
export function useScrollReveal(dependance) {
  const reduit = useReducedMotion();

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal:not(.in)");
    if (reduit || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("in"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dependance, reduit]);
}

/** Ajoute la classe `scrolled` au header au-delà de 24 px de défilement */
export function useHeaderScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

/** Compteur animé (de 0 à `cible`) déclenché à l'entrée dans le viewport */
export function useCounter(cible) {
  const ref = useRef(null);
  const [valeur, setValeur] = useState(cible);
  const reduit = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduit || !("IntersectionObserver" in window)) return undefined;

    setValeur(0);
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.unobserve(el);
        const duree = 900;
        let debut = null;
        const etape = (ts) => {
          if (!debut) debut = ts;
          const p = Math.min((ts - debut) / duree, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValeur(Math.round(eased * cible));
          if (p < 1) requestAnimationFrame(etape);
        };
        requestAnimationFrame(etape);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [cible, reduit]);

  return [ref, valeur];
}

/** Met à jour le <title> et la meta description de la page */
export function useDocumentMeta(titre, description) {
  useEffect(() => {
    if (titre) document.title = titre;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [titre, description]);
}
