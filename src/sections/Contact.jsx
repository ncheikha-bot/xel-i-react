/* ============ CONTACT : coordonnées + formulaire (prêt pour Formspree) ============ */

import { useState } from "react";
import { WHATSAPP } from "../components/Footer.jsx";

/* Remplacer VOTRE_ID par l'identifiant Formspree pour activer l'envoi (voir README) */
const FORMSPREE = "https://formspree.io/f/VOTRE_ID";

const VIDE = { nom: "", telephone: "", email: "", message: "" };

export default function Contact() {
  const [valeurs, setValeurs] = useState(VIDE);
  const [erreurs, setErreurs] = useState({});
  const [statut, setStatut] = useState("");

  function valider(champ, valeur) {
    const v = String(valeur).trim();
    if (["nom", "email", "message"].includes(champ) && !v) return "Ce champ est requis.";
    if (champ === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      return "Merci d'indiquer un email valide.";
    }
    if (champ === "telephone" && v && !/^[+\d][\d\s().-]{6,}$/.test(v)) {
      return "Merci d'indiquer un numéro valide (ex. +221 78 716 46 46).";
    }
    return "";
  }

  const changer = (champ) => (e) => {
    const valeur = e.target.value;
    setValeurs((v) => ({ ...v, [champ]: valeur }));
    if (erreurs[champ]) setErreurs((err) => ({ ...err, [champ]: valider(champ, valeur) }));
  };

  function envoyer(e) {
    const nouvelles = {};
    Object.keys(VIDE).forEach((champ) => {
      const message = valider(champ, valeurs[champ]);
      if (message) nouvelles[champ] = message;
    });
    setErreurs(nouvelles);

    if (Object.keys(nouvelles).length) {
      e.preventDefault();
      setStatut("Merci de corriger les champs indiqués.");
      return;
    }
    /* Tant que Formspree n'est pas configuré, on évite un envoi vers une URL invalide */
    if (FORMSPREE.includes("VOTRE_ID")) {
      e.preventDefault();
      setStatut("Formulaire de démonstration — contactez-nous au +221 78 716 46 46 ou xeliecoldart@gmail.com.");
    }
  }

  const champ = (nom) => "form__field" + (erreurs[nom] ? " invalid" : "");

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="section__label reveal">Contact &amp; inscription</p>
          <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
            Venez <span className="script accent">créer</span> avec nous
          </h2>
          <p className="reveal" style={{ "--d": ".14s" }}>
            Une question, une visite, une inscription ou un projet pour votre établissement&nbsp;?
            Contactez-nous pour une rencontre sans engagement.
          </p>

          <ul className="contact__list reveal" style={{ "--d": ".2s" }}>
            <li>
              <span className="chip" aria-hidden="true">📍</span>
              <div><strong>Adresse</strong><p>Dakar-Mermoz, Sénégal</p></div>
            </li>
            <li>
              <span className="chip" aria-hidden="true">📞</span>
              <div>
                <strong>Téléphone / WhatsApp — 24h/24</strong>
                <p>
                  <a href="tel:+221787164646">+221 78 716 46 46</a> ·{" "}
                  <a href={WHATSAPP} target="_blank" rel="noopener">écrire sur WhatsApp</a>
                </p>
              </div>
            </li>
            <li>
              <span className="chip" aria-hidden="true">✉️</span>
              <div><strong>Email</strong><p><a href="mailto:xeliecoldart@gmail.com">xeliecoldart@gmail.com</a></p></div>
            </li>
            <li>
              <span className="chip" aria-hidden="true">📸</span>
              <div>
                <strong>Instagram</strong>
                <p><a href="https://instagram.com/ecolexeli" target="_blank" rel="noopener">@ecolexeli</a></p>
              </div>
            </li>
          </ul>
        </div>

        <form className="form reveal" style={{ "--d": ".15s" }} action={FORMSPREE} method="POST" onSubmit={envoyer} noValidate>
          <div className="form__row">
            <div className={champ("nom")}>
              <label htmlFor="f-nom">Nom complet *</label>
              <input id="f-nom" name="nom" type="text" autoComplete="name" placeholder="Votre nom"
                     value={valeurs.nom} onChange={changer("nom")}
                     onBlur={() => setErreurs((e) => ({ ...e, nom: valider("nom", valeurs.nom) }))} />
              <span className="form__error" aria-live="polite">{erreurs.nom}</span>
            </div>
            <div className={champ("telephone")}>
              <label htmlFor="f-tel">Téléphone</label>
              <input id="f-tel" name="telephone" type="tel" autoComplete="tel" placeholder="+221 ..."
                     value={valeurs.telephone} onChange={changer("telephone")}
                     onBlur={() => setErreurs((e) => ({ ...e, telephone: valider("telephone", valeurs.telephone) }))} />
              <span className="form__error" aria-live="polite">{erreurs.telephone}</span>
            </div>
          </div>

          <div className={champ("email")}>
            <label htmlFor="f-email">Email *</label>
            <input id="f-email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.com"
                   value={valeurs.email} onChange={changer("email")}
                   onBlur={() => setErreurs((e) => ({ ...e, email: valider("email", valeurs.email) }))} />
            <span className="form__error" aria-live="polite">{erreurs.email}</span>
          </div>

          <div className={champ("message")}>
            <label htmlFor="f-message">Message *</label>
            <textarea id="f-message" name="message" rows="5"
                      placeholder="Parlez-nous de votre enfant, de votre projet ou de votre établissement…"
                      value={valeurs.message} onChange={changer("message")}
                      onBlur={() => setErreurs((e) => ({ ...e, message: valider("message", valeurs.message) }))} />
            <span className="form__error" aria-live="polite">{erreurs.message}</span>
          </div>

          <button type="submit" className="btn btn--primary btn--full">Envoyer le message</button>
          <p className="form__status" aria-live="polite">{statut}</p>
        </form>
      </div>
    </section>
  );
}
