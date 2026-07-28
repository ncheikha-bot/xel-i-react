/* ==========================================================================
   XEL I — En-tête : logo + navigation sticky + menu burger animé
   ========================================================================== */

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { asset } from "../lib/blog.js";
import { useHeaderScrolled } from "../lib/hooks.js";

/* Sur l'accueil les liens sont des ancres ; ailleurs ils ramènent à l'accueil */
const LIENS = [
  { ancre: "#ecole", libelle: "L'école" },
  { ancre: "#ateliers", libelle: "Ateliers" },
  { ancre: "#artthlete", libelle: "Art-Thlète" },
  { ancre: "#galerie", libelle: "Galerie" },
  { route: "/blog", libelle: "Blog" },
];

export default function Header() {
  const [ouvert, setOuvert] = useState(false);
  const scrolled = useHeaderScrolled();
  const { pathname } = useLocation();
  const surAccueil = pathname === "/";

  /* Bloque le défilement quand le menu plein écran est ouvert */
  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [ouvert]);

  /* Échap ferme le menu */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOuvert(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const fermer = () => setOuvert(false);

  return (
    <header className={"header" + (scrolled || !surAccueil ? " scrolled" : "")}>
      <div className="header__inner">
        <Link to="/" className="header__logo" aria-label="Xel i — retour à l'accueil" onClick={fermer}>
          <img src={asset("assets/logo/xel-i-logo.png")} alt="Xel i — école d'art" width="884" height="349" />
        </Link>

        <button
          className="burger"
          aria-expanded={ouvert}
          aria-controls="nav"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOuvert((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={"nav" + (ouvert ? " open" : "")} id="nav" aria-label="Navigation principale">
          <ul className="nav__list">
            {LIENS.map((lien) => (
              <li key={lien.libelle}>
                {lien.route ? (
                  <Link
                    to={lien.route}
                    className="nav__link"
                    aria-current={pathname === lien.route ? "page" : undefined}
                    onClick={fermer}
                  >
                    {lien.libelle}
                  </Link>
                ) : surAccueil ? (
                  <a href={lien.ancre} className="nav__link" onClick={fermer}>{lien.libelle}</a>
                ) : (
                  <Link to={"/" + lien.ancre} className="nav__link" onClick={fermer}>{lien.libelle}</Link>
                )}
              </li>
            ))}
            <li>
              {surAccueil ? (
                <a href="#inscription" className="nav__link nav__link--cta" onClick={fermer}>S'inscrire</a>
              ) : (
                <Link to="/#inscription" className="nav__link nav__link--cta" onClick={fermer}>S'inscrire</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
