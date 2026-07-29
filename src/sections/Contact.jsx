/* ============ CONTACT : coordonnées + formulaire (prêt pour Formspree) ============ */

import { useState } from "react";
import { CONTACTS, WHATSAPP_MERMOZ, WHATSAPP_NGOR } from "../lib/contenu.js";

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

          {/* Les deux sites, chacun avec son numéro */}
          <ul className="contact__sites reveal" style={{ "--d": ".2s" }}>
            <li className="contact__site">
              <p className="contact__site-nom">{CONTACTS.mermoz.nom}</p>
              <p className="contact__site-lieu">{CONTACTS.mermoz.lieu}</p>
              <p className="contact__site-tel">
                <a href={"tel:" + CONTACTS.mermoz.telInternational}>{CONTACTS.mermoz.tel}</a>
              </p>
              <a href={WHATSAPP_MERMOZ} className="btn btn--ghost btn--petit" target="_blank" rel="noopener">
                WhatsApp Mermoz
              </a>
            </li>
            <li className="contact__site">
              <p className="contact__site-nom">{CONTACTS.ngor.nom}</p>
              <p className="contact__site-lieu">{CONTACTS.ngor.lieu}</p>
              <p className="contact__site-tel">
                <a href={"tel:" + CONTACTS.ngor.telInternational}>{CONTACTS.ngor.tel}</a>
              </p>
              <a href={WHATSAPP_NGOR} className="btn btn--ghost btn--petit" target="_blank" rel="noopener">
                WhatsApp Ngor
              </a>
            </li>
          </ul>

          <ul className="contact__list reveal" style={{ "--d": ".26s" }}>
            <li>
              <span className="chip" aria-hidden="true">✉️</span>
              <div><strong>Email</strong><p><a href={"mailto:" + CONTACTS.email}>{CONTACTS.email}</a></p></div>
            </li>
            <li>
              <span className="chip" aria-hidden="true">📸</span>
              <div>
                <strong>Instagram</strong>
                <p>
                  <a href={"https://instagram.com/" + CONTACTS.instagram} target="_blank" rel="noopener">
                    @{CONTACTS.instagram}
                  </a>
                </p>
              </div>
            </li>
            <li>
              <span className="chip" aria-hidden="true">🏫</span>
              <div>
                <strong>Bientôt aux Almadies</strong>
                <p>Ouverture à la rentrée, en octobre 2026</p>
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
