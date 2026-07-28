/* ============ ADMIN — Éditeur d'article (avec aperçu en direct) ============ */

import { useMemo, useState } from "react";
import { asset, renderMarkdown } from "../../lib/blog.js";

const CATEGORIES = [
  "L'école", "Ateliers", "Art-Thlète", "Théâtre", "Événements", "Conseils aux parents",
];

const AUJOURDHUI = () => new Date().toISOString().slice(0, 10);

export default function Editeur({ article, onEnregistrer, onRetour }) {
  const [valeurs, setValeurs] = useState(() => ({
    titre: article?.titre || "",
    date: article?.date || AUJOURDHUI(),
    categorie: article?.categorie || "L'école",
    auteur: article?.auteur || "L'équipe Xel i",
    resume: article?.resume || "",
    contenu: article?.contenu || "",
    publie: article ? Boolean(article.publie) : true,
  }));
  const [image, setImage] = useState(null); // { base64, dataUrl, extension }
  const [apercuImage, setApercuImage] = useState(article?.image ? asset(article.image) : "");
  const [erreurs, setErreurs] = useState({});
  const [erreurImage, setErreurImage] = useState("");
  const [statut, setStatut] = useState("");
  const [enCours, setEnCours] = useState(false);

  const apercu = useMemo(() => renderMarkdown(valeurs.contenu), [valeurs.contenu]);

  const changer = (champ) => (e) => {
    const valeur = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValeurs((v) => ({ ...v, [champ]: valeur }));
    if (erreurs[champ] && String(valeur).trim()) {
      setErreurs((err) => ({ ...err, [champ]: "" }));
    }
  };

  function choisirImage(e) {
    const fichier = e.target.files?.[0];
    setErreurImage("");
    setImage(null);
    if (!fichier) return;

    if (fichier.size > 3 * 1024 * 1024) {
      setErreurImage("Image trop lourde (max 3 Mo). Réduisez-la avant de la téléverser.");
      e.target.value = "";
      return;
    }
    const lecteur = new FileReader();
    lecteur.onload = () => {
      const dataUrl = String(lecteur.result);
      setImage({
        base64: dataUrl.split(",")[1],
        dataUrl,
        extension: (fichier.name.split(".").pop() || "jpg").toLowerCase().replace("jpeg", "jpg"),
      });
      setApercuImage(dataUrl);
    };
    lecteur.readAsDataURL(fichier);
  }

  async function soumettre(e) {
    e.preventDefault();
    const requis = ["titre", "date", "categorie", "resume", "contenu"];
    const nouvelles = {};
    requis.forEach((champ) => {
      if (!String(valeurs[champ]).trim()) nouvelles[champ] = "Ce champ est requis.";
    });
    setErreurs(nouvelles);

    if (Object.keys(nouvelles).length) {
      setStatut("Merci de compléter les champs indiqués.");
      return;
    }

    setEnCours(true);
    setStatut("Enregistrement en cours…");
    try {
      const message = await onEnregistrer(
        {
          titre: valeurs.titre.trim(),
          date: valeurs.date,
          auteur: valeurs.auteur.trim() || "L'équipe Xel i",
          categorie: valeurs.categorie,
          resume: valeurs.resume.trim(),
          contenu: valeurs.contenu.trim(),
          publie: valeurs.publie,
        },
        image
      );
      setStatut(message);
      window.setTimeout(onRetour, 1500);
    } catch (err) {
      setStatut(err.status === 409
        ? "Conflit de version : quelqu'un a modifié le blog en même temps. Rechargez la page puis réessayez."
        : "Échec de l'enregistrement : " + err.message);
    } finally {
      setEnCours(false);
    }
  }

  const champ = (nom) => "form__field" + (erreurs[nom] ? " invalid" : "");

  return (
    <div className="admin-panel">
      <div className="admin-panel__head">
        <h2>{article ? "Modifier l'article" : "Nouvel article"}</h2>
        <button type="button" className="btn btn--ghost btn--petit" onClick={onRetour}>
          ← Retour à la liste
        </button>
      </div>

      <form className="admin-form" onSubmit={soumettre} noValidate>
        <div className="form__row">
          <div className={champ("titre")}>
            <label htmlFor="a-titre">Titre de l'article *</label>
            <input id="a-titre" type="text" placeholder="Ex. Portes ouvertes en septembre"
                   value={valeurs.titre} onChange={changer("titre")} />
            <span className="form__error" aria-live="polite">{erreurs.titre}</span>
          </div>
          <div className={champ("date")}>
            <label htmlFor="a-date">Date de publication *</label>
            <input id="a-date" type="date" value={valeurs.date} onChange={changer("date")} />
            <span className="form__error" aria-live="polite">{erreurs.date}</span>
          </div>
        </div>

        <div className="form__row">
          <div className={champ("categorie")}>
            <label htmlFor="a-categorie">Catégorie *</label>
            <select id="a-categorie" value={valeurs.categorie} onChange={changer("categorie")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <span className="form__error" aria-live="polite">{erreurs.categorie}</span>
          </div>
          <div className="form__field">
            <label htmlFor="a-auteur">Auteur</label>
            <input id="a-auteur" type="text" placeholder="L'équipe Xel i"
                   value={valeurs.auteur} onChange={changer("auteur")} />
          </div>
        </div>

        <div className={champ("resume")}>
          <label htmlFor="a-resume">Résumé (affiché sur la page du blog) *</label>
          <textarea id="a-resume" rows="2" placeholder="Deux ou trois phrases qui donnent envie de lire l'article."
                    value={valeurs.resume} onChange={changer("resume")} />
          <span className="form__error" aria-live="polite">{erreurs.resume}</span>
        </div>

        <div className="form__field">
          <label htmlFor="a-image-fichier">Image de couverture</label>
          <div className="admin-image">
            {apercuImage && <img src={apercuImage} alt="" />}
            <div className="admin-image__champ">
              <input id="a-image-fichier" type="file" accept="image/jpeg,image/png,image/webp" onChange={choisirImage} />
              <p className="form__group-note">
                JPEG, PNG ou WebP · idéalement 1600&nbsp;px de large · ou gardez l'image actuelle.
              </p>
            </div>
          </div>
          <span className="form__error" aria-live="polite">{erreurImage}</span>
        </div>

        <div className="admin-editeur">
          <div className={champ("contenu")}>
            <label htmlFor="a-contenu">Contenu de l'article *</label>
            <textarea id="a-contenu" rows="16" value={valeurs.contenu} onChange={changer("contenu")}
                      placeholder={"## Un sous-titre\n\nVotre texte… avec du **gras**, de l'*italique*, des listes :\n- premier point\n- deuxième point"} />
            <p className="form__group-note">
              Mise en forme : <code>## Sous-titre</code> · <code>**gras**</code> ·{" "}
              <code>*italique*</code> · <code>- élément de liste</code> ·{" "}
              <code>[texte](https://lien)</code>
            </p>
            <span className="form__error" aria-live="polite">{erreurs.contenu}</span>
          </div>

          <div className="admin-apercu">
            <p className="admin-apercu__label">Aperçu en direct</p>
            {apercu ? (
              <div className="article__prose" dangerouslySetInnerHTML={{ __html: apercu }} />
            ) : (
              <div className="article__prose">
                <p className="admin-apercu__vide">L'aperçu de votre article s'affichera ici.</p>
              </div>
            )}
          </div>
        </div>

        <label className="admin-souvenir">
          <input type="checkbox" checked={valeurs.publie} onChange={changer("publie")} />
          Publier l'article (décochez pour l'enregistrer comme brouillon)
        </label>

        <div className="admin-form__actions">
          <button type="submit" className="btn btn--primary" disabled={enCours}>
            Enregistrer &amp; mettre en ligne
          </button>
          <button type="button" className="btn btn--ghost" onClick={onRetour}>Annuler</button>
        </div>
        <p className="form__status" aria-live="polite">{statut}</p>
      </form>
    </div>
  );
}
