/* ==========================================================================
   XEL I — Espace de gestion du blog
   Connexion par identifiant + mot de passe (la clé GitHub est chiffrée dans
   blog/acces.json et déchiffrée localement), ou mode démo sans identifiants.
   ========================================================================== */

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { asset, fetchArticles, formatDate, slugify } from "../lib/blog.js";
import { useDocumentMeta } from "../lib/hooks.js";
import {
  chargerComptes, dechiffrerTexte, ecrireArticlesDepot, enregistrerCompte,
  lireArticlesDepot, televerserImage, verifierToken,
} from "../lib/github.js";
import Connexion from "../components/admin/Connexion.jsx";
import Editeur from "../components/admin/Editeur.jsx";

const CLE_STOCKAGE = "xeli_admin_token";

export default function Admin() {
  const [session, setSession] = useState({ token: null, demo: false, ouverte: false });
  const [articles, setArticles] = useState([]);
  const [sha, setSha] = useState(null);
  const [statutListe, setStatutListe] = useState("");
  const [editionSlug, setEditionSlug] = useState(undefined); // undefined = liste, null = nouveau

  useDocumentMeta("Gestion du blog — Xel i", "Espace de gestion du blog de Xel i.");

  /* La page d'admin ne doit pas être indexée */
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  /* ---------- Chargement des articles ---------- */
  const rechargerListe = useCallback(async (etat) => {
    setStatutListe("Chargement…");
    try {
      if (etat.demo) {
        setArticles(await fetchArticles());
        setStatutListe("Mode démo : essayez tout, rien ne sera publié sur le site.");
      } else {
        const { articles: liste, sha: nouveauSha } = await lireArticlesDepot(etat.token);
        setArticles(liste);
        setSha(nouveauSha);
        setStatutListe("");
      }
    } catch (err) {
      setStatutListe("Impossible de charger les articles : " + err.message);
    }
  }, []);

  /* ---------- Reconnexion automatique ---------- */
  useEffect(() => {
    const memorise = localStorage.getItem(CLE_STOCKAGE) || sessionStorage.getItem(CLE_STOCKAGE);
    if (!memorise) return;
    verifierToken(memorise)
      .then(() => {
        const etat = { token: memorise, demo: false, ouverte: true };
        setSession(etat);
        rechargerListe(etat);
      })
      .catch(() => {
        localStorage.removeItem(CLE_STOCKAGE);
        sessionStorage.removeItem(CLE_STOCKAGE);
      });
  }, [rechargerListe]);

  /* ---------- Connexion ---------- */
  async function connecter({ identifiant, motDePasse, souvenir }) {
    const comptes = await chargerComptes();
    if (comptes === null || !comptes.length) {
      const e = new Error("Aucun compte n'est encore configuré — utilisez la configuration initiale ci-dessous, ou le mode démo.");
      e.aucunCompte = true;
      throw e;
    }
    const compte = comptes.find((c) => String(c.id).toLowerCase() === identifiant.toLowerCase());
    if (!compte) { const e = new Error("Identifiant ou mot de passe incorrect."); e.identifiants = true; throw e; }

    let token;
    try {
      token = await dechiffrerTexte(compte, motDePasse);
    } catch {
      const e = new Error("Identifiant ou mot de passe incorrect."); e.identifiants = true; throw e;
    }

    try {
      await verifierToken(token);
    } catch {
      throw new Error("La clé enregistrée semble expirée ou révoquée — refaites la configuration initiale.");
    }

    if (souvenir) localStorage.setItem(CLE_STOCKAGE, token);
    else sessionStorage.setItem(CLE_STOCKAGE, token);

    const etat = { token, demo: false, ouverte: true };
    setSession(etat);
    rechargerListe(etat);
  }

  function entrerEnDemo() {
    const etat = { token: null, demo: true, ouverte: true };
    setSession(etat);
    rechargerListe(etat);
  }

  function deconnecter() {
    localStorage.removeItem(CLE_STOCKAGE);
    sessionStorage.removeItem(CLE_STOCKAGE);
    setSession({ token: null, demo: false, ouverte: false });
    setArticles([]);
    setEditionSlug(undefined);
  }

  /* ---------- Enregistrement d'un article ---------- */
  async function enregistrerArticle(donnees, image) {
    const existant = editionSlug ? articles.find((a) => a.slug === editionSlug) : null;

    let slug = existant ? existant.slug : slugify(donnees.titre);
    if (!existant) {
      const base = slug;
      let n = 2;
      while (articles.some((a) => a.slug === slug)) slug = base + "-" + n++;
    }

    /* Image : téléversée dans le dépôt, ou aperçu local en démo */
    let cheminImage = existant ? existant.image : "";
    if (image?.base64) {
      if (session.demo) {
        cheminImage = image.dataUrl;
      } else {
        cheminImage = `assets/blog/${slug}-${Date.now()}.${image.extension}`;
        await televerserImage(
          cheminImage, image.base64,
          `Blog : image de couverture pour « ${donnees.titre} »`, session.token
        );
      }
    }

    const article = { ...donnees, slug, image: cheminImage };
    const nouveaux = existant
      ? articles.map((a) => (a.slug === slug ? article : a))
      : [article, ...articles];

    if (!session.demo) {
      const nouveauSha = await ecrireArticlesDepot(
        nouveaux, sha,
        `Blog : ${existant ? "mise à jour" : "ajout"} de « ${donnees.titre} »`,
        session.token
      );
      setSha(nouveauSha);
    }
    setArticles(nouveaux);

    return session.demo
      ? "Mode démo : article enregistré localement — rien n'est publié sur le site."
      : "Enregistré ! Le site se met à jour d'ici ~1 minute.";
  }

  /* ---------- Suppression ---------- */
  async function supprimerArticle(slug) {
    const article = articles.find((a) => a.slug === slug);
    if (!article) return;
    if (!window.confirm(`Supprimer définitivement « ${article.titre} » ?`)) return;

    setStatutListe("Suppression en cours…");
    const restants = articles.filter((a) => a.slug !== slug);
    try {
      if (!session.demo) {
        const nouveauSha = await ecrireArticlesDepot(
          restants, sha, `Blog : suppression de « ${article.titre} »`, session.token
        );
        setSha(nouveauSha);
      }
      setArticles(restants);
      setStatutListe(session.demo
        ? "Mode démo : article supprimé localement (rien n'est publié)."
        : "Article supprimé. Le site se met à jour d'ici ~1 minute.");
    } catch (err) {
      setStatutListe("Échec de la suppression : " + err.message + " — rechargez la page.");
    }
  }

  /* ---------- Rendu ---------- */
  if (!session.ouverte) {
    return (
      <Connexion
        onConnexion={connecter}
        onDemo={entrerEnDemo}
        onConfiguration={enregistrerCompte}
      />
    );
  }

  const tries = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="admin-app">
      <header className="admin-bar">
        <Link to="/" className="admin-bar__logo">
          <img src={asset("assets/logo/xel-i-logo.png")} alt="Xel i" width="884" height="349" />
        </Link>
        <p className="admin-bar__titre">Gestion du blog</p>
        {session.demo && (
          <span className="admin-badge admin-badge--demo">Mode démo — rien n'est publié</span>
        )}
        <div className="admin-bar__actions">
          <Link to="/blog" target="_blank" rel="noopener" className="admin-bar__lien">Voir le blog ↗</Link>
          <button type="button" className="btn btn--ghost btn--petit" onClick={deconnecter}>
            Se déconnecter
          </button>
        </div>
      </header>

      <div className="admin-main">
        {editionSlug === undefined ? (
          <div className="admin-panel">
            <div className="admin-panel__head">
              <h2>Articles <span className="admin-compte">({articles.length})</span></h2>
              <button type="button" className="btn btn--primary" onClick={() => setEditionSlug(null)}>
                + Nouvel article
              </button>
            </div>
            <p className="form__status">{statutListe}</p>

            <ul className="admin-liste">
              {!tries.length && (
                <li className="admin-liste__vide">Aucun article pour le moment — créez le premier !</li>
              )}
              {tries.map((a) => (
                <li className="admin-liste__item" key={a.slug}>
                  <div className="admin-liste__infos">
                    <span className={"admin-badge " + (a.publie ? "admin-badge--publie" : "admin-badge--brouillon")}>
                      {a.publie ? "Publié" : "Brouillon"}
                    </span>
                    <strong>{a.titre}</strong>
                    <span className="admin-liste__meta">
                      {a.categorie} · {formatDate(a.date)}
                    </span>
                  </div>
                  <div className="admin-liste__boutons">
                    <Link className="btn btn--ghost btn--petit" target="_blank" rel="noopener" to={"/blog/" + a.slug}>
                      Voir
                    </Link>
                    <button type="button" className="btn btn--ghost btn--petit" onClick={() => setEditionSlug(a.slug)}>
                      Modifier
                    </button>
                    <button type="button" className="btn btn--danger btn--petit" onClick={() => supprimerArticle(a.slug)}>
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Editeur
            article={editionSlug ? articles.find((a) => a.slug === editionSlug) : null}
            onEnregistrer={enregistrerArticle}
            onRetour={() => setEditionSlug(undefined)}
          />
        )}
      </div>
    </section>
  );
}
