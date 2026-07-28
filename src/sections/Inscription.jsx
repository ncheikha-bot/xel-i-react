/* ============ INSCRIPTION : formulaire complet → message WhatsApp ============ */

import { useState } from "react";

const PROGRAMMES = [
  {
    groupe: "Cours d'art (enfants)",
    options: ["Peinture", "Dessin", "Poterie & sculpture", "Calligraphie", "Crochet & arts textiles", "Théâtre"],
  },
  {
    groupe: "Art-Thlète (art + sport)",
    options: ["Art-Thlète — été sur l'île de Ngor (6-18 ans)", "Art-Thlète — Mermoz (dès 2 ans ½)"],
  },
  {
    groupe: "Cours adultes",
    options: ["Dessin (adultes)", "Peinture (adultes)"],
  },
];

const VIDE = { eleve: "", age: "", programme: "", parent: "", telephone: "", email: "", message: "" };

/** Aide contextuelle selon le programme choisi */
function aideProgramme(valeur) {
  if (!valeur) return "";
  if (valeur.includes("Ngor")) return "☀️ Cet été sur l'île de Ngor — pour les 6 à 18 ans.";
  if (valeur.includes("Art-Thlète — Mermoz")) return "🏠 À Mermoz — accessible dès 2 ans et demi.";
  if (valeur.includes("adultes")) return "🎨 Cours adultes à Mermoz — dessin et peinture pour l'instant.";
  return "📍 À Dakar-Mermoz — programme structuré sur 6 mois.";
}

export default function Inscription() {
  const [valeurs, setValeurs] = useState(VIDE);
  const [erreurs, setErreurs] = useState({});
  const [statut, setStatut] = useState("");

  const changer = (champ) => (e) => {
    const valeur = e.target.value;
    setValeurs((v) => ({ ...v, [champ]: valeur }));
    if (erreurs[champ]) setErreurs((err) => ({ ...err, [champ]: valider(champ, valeur) }));
  };

  function valider(champ, valeur) {
    const v = String(valeur).trim();
    const requis = ["eleve", "age", "programme", "parent", "telephone"];
    if (requis.includes(champ) && !v) {
      return champ === "programme" ? "Merci de choisir un programme." : "Ce champ est requis.";
    }
    if (champ === "age" && v) {
      const n = parseFloat(v);
      if (Number.isNaN(n) || n < 2 || n > 99) return "Merci d'indiquer un âge entre 2 et 99 ans.";
    }
    if (champ === "telephone" && v && !/^[+\d][\d\s().-]{6,}$/.test(v)) {
      return "Merci d'indiquer un numéro valide (ex. +221 78 716 46 46).";
    }
    if (champ === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      return "Merci d'indiquer un email valide.";
    }
    return "";
  }

  function envoyer(e) {
    e.preventDefault();
    const nouvelles = {};
    Object.keys(VIDE).forEach((champ) => {
      const message = valider(champ, valeurs[champ]);
      if (message) nouvelles[champ] = message;
    });
    setErreurs(nouvelles);

    if (Object.keys(nouvelles).length) {
      setStatut("Merci de corriger les champs indiqués.");
      const premier = document.querySelector(".form__field.invalid input, .form__field.invalid select");
      if (premier) premier.focus();
      return;
    }

    const lignes = [
      "Bonjour Xel i ! Je souhaite faire une inscription :",
      `• Élève : ${valeurs.eleve.trim()} (${valeurs.age} ans)`,
      `• Programme : ${valeurs.programme}`,
      `• Parent / tuteur : ${valeurs.parent.trim()}`,
      `• Téléphone : ${valeurs.telephone.trim()}`,
    ];
    if (valeurs.email.trim()) lignes.push(`• Email : ${valeurs.email.trim()}`);
    if (valeurs.message.trim()) lignes.push(`• Précisions : ${valeurs.message.trim()}`);

    window.open(
      "https://wa.me/221787164646?text=" + encodeURIComponent(lignes.join("\n")),
      "_blank",
      "noopener"
    );
    setStatut("WhatsApp s'ouvre avec votre demande — appuyez sur « Envoyer » pour la transmettre à l'école.");
  }

  const champ = (nom) => "form__field" + (erreurs[nom] ? " invalid" : "");

  return (
    <section className="section inscription" id="inscription">
      <div className="container">
        <div className="inscription__head">
          <p className="section__label reveal">Inscription</p>
          <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
            Réservez votre place <span className="script accent">en 2 minutes</span>
          </h2>
          <p className="section__intro reveal" style={{ "--d": ".14s" }}>
            Remplissez le formulaire : votre demande part directement sur le WhatsApp de
            l'école, et l'équipe vous répond à toute heure pour confirmer la place et les
            horaires. Les cours ont lieu à Dakar-Mermoz.
          </p>
        </div>

        <form className="form form--inscription reveal" style={{ "--d": ".2s" }} onSubmit={envoyer} noValidate>
          <fieldset className="form__group">
            <legend>L'élève</legend>
            <div className="form__row">
              <div className={champ("eleve")}>
                <label htmlFor="i-eleve">Prénom &amp; nom de l'élève *</label>
                <input id="i-eleve" type="text" autoComplete="name" placeholder="Prénom et nom"
                       value={valeurs.eleve} onChange={changer("eleve")}
                       onBlur={() => setErreurs((e) => ({ ...e, eleve: valider("eleve", valeurs.eleve) }))} />
                <span className="form__error" aria-live="polite">{erreurs.eleve}</span>
              </div>
              <div className={champ("age")}>
                <label htmlFor="i-age">Âge de l'élève *</label>
                <input id="i-age" type="number" min="2" max="99" inputMode="numeric" placeholder="Ex. 7"
                       value={valeurs.age} onChange={changer("age")}
                       onBlur={() => setErreurs((e) => ({ ...e, age: valider("age", valeurs.age) }))} />
                <span className="form__error" aria-live="polite">{erreurs.age}</span>
              </div>
            </div>
          </fieldset>

          <fieldset className="form__group">
            <legend>Le programme</legend>
            <div className={champ("programme")}>
              <label htmlFor="i-programme">Choisissez un cours ou un programme *</label>
              <select id="i-programme" value={valeurs.programme} onChange={changer("programme")}>
                <option value="" disabled>— Sélectionner —</option>
                {PROGRAMMES.map((g) => (
                  <optgroup label={g.groupe} key={g.groupe}>
                    {g.options.map((o) => <option key={o}>{o}</option>)}
                  </optgroup>
                ))}
              </select>
              <span className="form__hint" aria-live="polite">{aideProgramme(valeurs.programme)}</span>
              <span className="form__error" aria-live="polite">{erreurs.programme}</span>
            </div>
          </fieldset>

          <fieldset className="form__group">
            <legend>Le parent / tuteur</legend>
            <p className="form__group-note">Ou vous-même, pour un cours adulte.</p>
            <div className="form__row">
              <div className={champ("parent")}>
                <label htmlFor="i-parent">Nom complet *</label>
                <input id="i-parent" type="text" autoComplete="name" placeholder="Votre nom"
                       value={valeurs.parent} onChange={changer("parent")}
                       onBlur={() => setErreurs((e) => ({ ...e, parent: valider("parent", valeurs.parent) }))} />
                <span className="form__error" aria-live="polite">{erreurs.parent}</span>
              </div>
              <div className={champ("telephone")}>
                <label htmlFor="i-tel">Téléphone (WhatsApp) *</label>
                <input id="i-tel" type="tel" autoComplete="tel" placeholder="+221 ..."
                       value={valeurs.telephone} onChange={changer("telephone")}
                       onBlur={() => setErreurs((e) => ({ ...e, telephone: valider("telephone", valeurs.telephone) }))} />
                <span className="form__error" aria-live="polite">{erreurs.telephone}</span>
              </div>
            </div>
            <div className={champ("email")}>
              <label htmlFor="i-email">Email <small>(facultatif)</small></label>
              <input id="i-email" type="email" autoComplete="email" placeholder="vous@exemple.com"
                     value={valeurs.email} onChange={changer("email")}
                     onBlur={() => setErreurs((e) => ({ ...e, email: valider("email", valeurs.email) }))} />
              <span className="form__error" aria-live="polite">{erreurs.email}</span>
            </div>
          </fieldset>

          <div className="form__field">
            <label htmlFor="i-message">Questions ou précisions <small>(facultatif)</small></label>
            <textarea id="i-message" rows="3" placeholder="Disponibilités, allergies, besoins particuliers, fratrie…"
                      value={valeurs.message} onChange={changer("message")} />
          </div>

          <button type="submit" className="btn btn--primary btn--full">
            Envoyer l'inscription sur WhatsApp
          </button>
          <p className="form__note">
            En envoyant, WhatsApp s'ouvre avec votre demande pré-remplie — il ne reste
            qu'à appuyer sur « Envoyer ». Vous pouvez aussi appeler le{" "}
            <a href="tel:+221787164646">+221 78 716 46 46</a> (24h/24).
          </p>
          <p className="form__status" aria-live="polite">{statut}</p>
        </form>
      </div>
    </section>
  );
}
