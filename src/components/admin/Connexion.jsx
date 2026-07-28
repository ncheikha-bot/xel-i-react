/* ============ ADMIN — Écran de connexion, mode démo, configuration ============ */

import { useState } from "react";
import { Link } from "react-router-dom";
import { asset } from "../../lib/blog.js";
import { verifierToken } from "../../lib/github.js";

export default function Connexion({ onConnexion, onDemo, onConfiguration }) {
  /* --- connexion --- */
  const [identifiant, setIdentifiant] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [souvenir, setSouvenir] = useState(false);
  const [statut, setStatut] = useState("");
  const [enCours, setEnCours] = useState(false);

  /* --- configuration initiale --- */
  const [config, setConfig] = useState({ token: "", id: "", mdp: "", mdp2: "" });
  const [statutConfig, setStatutConfig] = useState("");
  const [configEnCours, setConfigEnCours] = useState(false);

  async function seConnecter(e) {
    e.preventDefault();
    if (!identifiant.trim() || !motDePasse) {
      setStatut("Merci de saisir votre identifiant et votre mot de passe.");
      return;
    }
    setEnCours(true);
    setStatut("Connexion en cours…");
    try {
      await onConnexion({ identifiant: identifiant.trim(), motDePasse, souvenir });
    } catch (err) {
      setStatut(err.message);
    } finally {
      setEnCours(false);
    }
  }

  async function configurer(e) {
    e.preventDefault();
    const { token, id, mdp, mdp2 } = config;
    if (!token.trim() || !id.trim()) { setStatutConfig("Clé GitHub et identifiant requis."); return; }
    if (mdp.length < 8) { setStatutConfig("Le mot de passe doit faire au moins 8 caractères."); return; }
    if (mdp !== mdp2) { setStatutConfig("Les deux mots de passe ne correspondent pas."); return; }

    setConfigEnCours(true);
    setStatutConfig("Vérification de la clé…");
    try {
      await verifierToken(token.trim());
      setStatutConfig("Chiffrement et enregistrement…");
      await onConfiguration(id.trim(), mdp, token.trim());
      setConfig({ token: "", id: id.trim(), mdp: "", mdp2: "" });
      setStatutConfig(`Compte « ${id.trim()} » enregistré ! Connexion possible d'ici ~1 minute (mise à jour du site).`);
    } catch (err) {
      setStatutConfig(err.status === 401
        ? "Clé GitHub invalide ou expirée."
        : "Échec : " + (err.message || "erreur inconnue"));
    } finally {
      setConfigEnCours(false);
    }
  }

  const majConfig = (champ) => (e) => setConfig((c) => ({ ...c, [champ]: e.target.value }));

  return (
    <section className="admin-login">
      <div className="admin-login__card">
        <img src={asset("assets/logo/xel-i-logo.png")} alt="Xel i" className="admin-login__logo" width="884" height="349" />
        <h1>Gestion du blog</h1>
        <p className="admin-login__sub">Espace réservé à l'équipe de l'école.</p>

        <form onSubmit={seConnecter} noValidate>
          <div className="form__field">
            <label htmlFor="c-id">Identifiant</label>
            <input id="c-id" type="text" autoComplete="username" autoCapitalize="none"
                   placeholder="Votre identifiant" value={identifiant}
                   onChange={(e) => setIdentifiant(e.target.value)} />
          </div>
          <div className="form__field">
            <label htmlFor="c-mdp">Mot de passe</label>
            <input id="c-mdp" type="password" autoComplete="current-password"
                   placeholder="Votre mot de passe" value={motDePasse}
                   onChange={(e) => setMotDePasse(e.target.value)} />
          </div>
          <label className="admin-souvenir">
            <input type="checkbox" checked={souvenir} onChange={(e) => setSouvenir(e.target.checked)} />
            Rester connecté sur cet appareil
          </label>
          <button type="submit" className="btn btn--primary btn--full" disabled={enCours}>
            Se connecter
          </button>
          <p className="form__status" aria-live="polite">{statut}</p>
        </form>

        <div className="admin-separateur" aria-hidden="true"><span>ou</span></div>

        <div className="admin-demo">
          <button type="button" className="btn btn--yellow btn--full" onClick={onDemo}>
            Découvrir en mode démo
          </button>
          <p className="form__group-note">
            Aucun identifiant requis. Vous pouvez tout essayer :
            les modifications ne sont pas publiées sur le site.
          </p>
        </div>

        <details className="admin-aide">
          <summary>Configuration initiale (équipe technique)</summary>
          <p className="form__group-note">
            À faire une seule fois : ce formulaire chiffre la clé GitHub avec le mot de passe
            choisi et l'enregistre dans le dépôt. Ensuite, l'équipe se connecte simplement
            avec l'identifiant et le mot de passe.
          </p>
          <form onSubmit={configurer} id="form-config" noValidate>
            <div className="form__field">
              <label htmlFor="s-token">
                Clé GitHub (fine-grained, permission « Contents : Read &amp; write » sur le dépôt)
              </label>
              <input id="s-token" type="password" autoComplete="off"
                     placeholder="github_pat_… ou gho_…" value={config.token} onChange={majConfig("token")} />
            </div>
            <div className="form__field">
              <label htmlFor="s-id">Identifiant à créer</label>
              <input id="s-id" type="text" autoComplete="off" autoCapitalize="none"
                     placeholder="Ex. xeli" value={config.id} onChange={majConfig("id")} />
            </div>
            <div className="form__row">
              <div className="form__field">
                <label htmlFor="s-mdp">Mot de passe (8 caractères min.)</label>
                <input id="s-mdp" type="password" autoComplete="new-password"
                       placeholder="Mot de passe" value={config.mdp} onChange={majConfig("mdp")} />
              </div>
              <div className="form__field">
                <label htmlFor="s-mdp2">Confirmation</label>
                <input id="s-mdp2" type="password" autoComplete="new-password"
                       placeholder="Encore une fois" value={config.mdp2} onChange={majConfig("mdp2")} />
              </div>
            </div>
            <button type="submit" className="btn btn--ghost btn--full" disabled={configEnCours}>
              Créer / mettre à jour le compte
            </button>
            <p className="form__status" aria-live="polite">{statutConfig}</p>
          </form>
        </details>

        <p className="admin-login__retour"><Link to="/">← Retour au site</Link></p>
      </div>
    </section>
  );
}
