/* ============ PAGE BLOG : liste des articles publiés ============ */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { asset, fetchArticles, formatDate } from "../lib/blog.js";
import { useScrollReveal, useDocumentMeta } from "../lib/hooks.js";

export default function Blog() {
  const [articles, setArticles] = useState(null); // null = chargement
  const [erreur, setErreur] = useState(false);

  useDocumentMeta(
    "Le blog — Xel i · École d'art à Dakar",
    "Les nouvelles de Xel i, école d'art à Dakar : la vie des ateliers, Art-Thlète, les ouvertures et les événements de l'école."
  );
  useScrollReveal(articles);

  useEffect(() => {
    fetchArticles()
      .then((liste) =>
        setArticles(
          liste.filter((a) => a.publie).sort((a, b) => (a.date < b.date ? 1 : -1))
        )
      )
      .catch(() => setErreur(true));
  }, []);

  return (
    <main>
      <section className="section blog-hero">
        <div className="container">
          <p className="section__label reveal">Le blog</p>
          <h1 className="section__title reveal" style={{ "--d": ".08s" }}>
            Les nouvelles <span className="script accent">de l'école</span>
          </h1>
          <p className="section__intro reveal" style={{ "--d": ".14s" }}>
            La vie des ateliers, les programmes, les ouvertures et les événements de Xel i.
          </p>
        </div>
      </section>

      <section className="section section--tinted blog-liste" aria-label="Articles du blog">
        <div className="container">
          <ul className="blog-grid">
            {erreur && (
              <li className="blog-vide">Impossible de charger les articles. Réessayez dans un instant.</li>
            )}
            {!erreur && articles === null && <li className="blog-vide">Chargement des articles…</li>}
            {!erreur && articles?.length === 0 && (
              <li className="blog-vide">Aucun article pour le moment — revenez bientôt !</li>
            )}
            {articles?.map((a, i) => (
              <li className="atelier-card blog-card reveal" style={{ "--d": (i % 3) * 0.1 + "s" }} key={a.slug}>
                <Link to={"/blog/" + a.slug}>
                  <div className="atelier-card__img blog-card__img">
                    {a.image ? (
                      <img src={asset(a.image)} alt="" width="1600" height="1066" loading="lazy" />
                    ) : (
                      <span className="blog-card__fleur" aria-hidden="true">✿</span>
                    )}
                  </div>
                  <div className="atelier-card__body">
                    <p className="blog-card__meta">
                      <span className="blog-card__cat">{a.categorie || "L'école"}</span> · {formatDate(a.date)}
                    </p>
                    <h2>{a.titre}</h2>
                    <p>{a.resume}</p>
                    <span className="link-arrow">Lire l'article</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
