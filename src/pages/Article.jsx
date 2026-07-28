/* ============ PAGE ARTICLE : lecture d'un article (/blog/:slug) ============ */

import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { asset, fetchArticles, formatDate, renderMarkdown } from "../lib/blog.js";
import { useDocumentMeta } from "../lib/hooks.js";

export default function Article() {
  const { slug } = useParams();
  const [etat, setEtat] = useState({ chargement: true, article: null, erreur: false });

  useEffect(() => {
    setEtat({ chargement: true, article: null, erreur: false });
    fetchArticles()
      .then((liste) => {
        const article = liste.find((a) => a.slug === slug && a.publie) || null;
        setEtat({ chargement: false, article, erreur: false });
      })
      .catch(() => setEtat({ chargement: false, article: null, erreur: true }));
  }, [slug]);

  useDocumentMeta(
    etat.article ? etat.article.titre + " — Xel i · École d'art, Dakar" : "Article — Xel i · École d'art à Dakar",
    etat.article?.resume || "Un article du blog de Xel i, école d'art à Dakar."
  );

  /* Remonter en haut à chaque changement d'article */
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const contenuHtml = useMemo(
    () => (etat.article ? renderMarkdown(etat.article.contenu) : ""),
    [etat.article]
  );

  return (
    <main>
      <article className="section article">
        <div className="container article__container">
          <p className="article__retour">
            <Link to="/blog" className="link-arrow-retour">← Tous les articles</Link>
          </p>

          {etat.chargement && <p className="blog-vide">Chargement de l'article…</p>}

          {etat.erreur && (
            <p className="blog-vide">Impossible de charger l'article. Réessayez dans un instant.</p>
          )}

          {!etat.chargement && !etat.erreur && !etat.article && (
            <p className="blog-vide">
              Article introuvable. <Link to="/blog">Retour au blog</Link>.
            </p>
          )}

          {etat.article && (
            <>
              <p className="blog-card__meta">
                <span className="blog-card__cat">{etat.article.categorie || "L'école"}</span> ·{" "}
                {formatDate(etat.article.date)}
                {etat.article.auteur ? " · " + etat.article.auteur : ""}
              </p>
              <h1>{etat.article.titre}</h1>
              {etat.article.image && (
                <div className="article__cover">
                  <img src={asset(etat.article.image)} alt="" width="1600" height="1066" />
                </div>
              )}
              <div className="article__prose" dangerouslySetInnerHTML={{ __html: contenuHtml }} />
              <p className="article__fin" aria-hidden="true">✿</p>
            </>
          )}
        </div>
      </article>
    </main>
  );
}
