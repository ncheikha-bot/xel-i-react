/* ============ PAGE 404 ============ */

import { Link } from "react-router-dom";
import { useDocumentMeta } from "../lib/hooks.js";

export default function NonTrouvee() {
  useDocumentMeta("Page introuvable — Xel i", "Cette page n'existe pas ou a été déplacée.");

  return (
    <main>
      <section className="section article">
        <div className="container article__container" style={{ textAlign: "center" }}>
          <p className="article__fin" aria-hidden="true">✿</p>
          <h1>Cette page n'existe pas</h1>
          <p style={{ marginBottom: "2rem" }}>
            Le lien est peut-être ancien ou mal recopié. Revenez à l'accueil ou parcourez le blog.
          </p>
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <Link to="/" className="btn btn--primary">Retour à l'accueil</Link>
            <Link to="/blog" className="btn btn--ghost">Voir le blog</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
