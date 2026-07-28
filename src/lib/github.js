/* ==========================================================================
   XEL I — Accès au dépôt GitHub (CMS statique) + chiffrement des comptes

   Les articles vivent dans blog/articles.json sur GitHub ; l'admin lit et
   écrit via la Contents API. La clé GitHub est chiffrée (AES-GCM, clé dérivée
   du mot de passe par PBKDF2) et stockée dans blog/acces.json : le bon mot de
   passe la déchiffre dans le navigateur, un mauvais échoue au déchiffrement.
   ========================================================================== */

import { asset } from "./blog.js";

export const OWNER = import.meta.env.VITE_GH_OWNER || "ncheikha-bot";
export const REPO = import.meta.env.VITE_GH_REPO || "xel-i-site";
export const BRANCH = import.meta.env.VITE_GH_BRANCH || "main";

/* Chemin des fichiers DANS LE DÉPÔT (peut différer du chemin servi) :
   - dépôt qui sert les fichiers à la racine → "blog/…"
   - dépôt source Vite → "public/blog/…" (via VITE_REPO_BLOG_DIR) */
const DOSSIER_DEPOT = import.meta.env.VITE_REPO_BLOG_DIR || "blog";
export const FICHIER_ARTICLES = `${DOSSIER_DEPOT}/articles.json`;
export const FICHIER_ACCES = `${DOSSIER_DEPOT}/acces.json`;
const API = "https://api.github.com";

/* ---------- Requête API ---------- */
export async function gh(chemin, options = {}, token) {
  const config = { ...options };
  config.headers = {
    Authorization: "Bearer " + token,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (config.body) {
    config.headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(config.body);
  }
  const r = await fetch(API + chemin, config);
  if (!r.ok) {
    const data = await r.json().catch(() => ({}));
    const err = new Error(data.message || "Erreur " + r.status);
    err.status = r.status;
    throw err;
  }
  return r.status === 204 ? null : r.json();
}

/* ---------- base64 <-> UTF-8 (btoa/atob seuls cassent les accents) ---------- */
export function encoderBase64(texte) {
  const octets = new TextEncoder().encode(texte);
  let binaire = "";
  octets.forEach((o) => { binaire += String.fromCharCode(o); });
  return btoa(binaire);
}

export function decoderBase64(b64) {
  const binaire = atob(String(b64).replace(/\n/g, ""));
  const octets = new Uint8Array(binaire.length);
  for (let i = 0; i < binaire.length; i++) octets[i] = binaire.charCodeAt(i);
  return new TextDecoder().decode(octets);
}

/* ---------- Chiffrement (WebCrypto) ---------- */
function bufVersB64(buf) {
  const octets = new Uint8Array(buf);
  let binaire = "";
  octets.forEach((o) => { binaire += String.fromCharCode(o); });
  return btoa(binaire);
}

function b64VersBuf(b64) {
  const binaire = atob(b64);
  const octets = new Uint8Array(binaire.length);
  for (let i = 0; i < binaire.length; i++) octets[i] = binaire.charCodeAt(i);
  return octets;
}

async function deriverCle(motDePasse, sel) {
  const base = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(motDePasse), "PBKDF2", false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: sel, iterations: 150000, hash: "SHA-256" },
    base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
  );
}

export async function chiffrerTexte(texte, motDePasse) {
  const sel = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cle = await deriverCle(motDePasse, sel);
  const chiffre = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv }, cle, new TextEncoder().encode(texte)
  );
  return { sel: bufVersB64(sel), iv: bufVersB64(iv), donnees: bufVersB64(chiffre) };
}

export async function dechiffrerTexte(bloc, motDePasse) {
  const cle = await deriverCle(motDePasse, b64VersBuf(bloc.sel));
  const buf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: b64VersBuf(bloc.iv) }, cle, b64VersBuf(bloc.donnees)
  );
  return new TextDecoder().decode(buf);
}

/* ---------- Comptes (blog/acces.json — public mais chiffré) ---------- */
export async function chargerComptes() {
  try {
    /* Côté navigateur, le fichier est toujours servi sous blog/ */
    const r = await fetch(asset("blog/acces.json") + "?t=" + Date.now());
    if (r.status === 404) return null;
    if (!r.ok) throw new Error("HTTP " + r.status);
    const data = await r.json();
    return data.comptes || [];
  } catch {
    return null;
  }
}

/* ---------- Vérification d'une clé ---------- */
export async function verifierToken(token) {
  const repo = await gh(`/repos/${OWNER}/${REPO}`, {}, token);
  if (!repo.permissions || !repo.permissions.push) {
    throw new Error("Cette clé n'a pas le droit d'écriture sur le site.");
  }
  return true;
}

/* ---------- Articles ---------- */
export async function lireArticlesDepot(token) {
  const fichier = await gh(
    `/repos/${OWNER}/${REPO}/contents/${FICHIER_ARTICLES}?ref=${BRANCH}`, {}, token
  );
  return {
    articles: JSON.parse(decoderBase64(fichier.content)).articles || [],
    sha: fichier.sha,
  };
}

export async function ecrireArticlesDepot(articles, sha, message, token) {
  const reponse = await gh(`/repos/${OWNER}/${REPO}/contents/${FICHIER_ARTICLES}`, {
    method: "PUT",
    body: {
      message,
      content: encoderBase64(JSON.stringify({ articles }, null, 2)),
      sha,
      branch: BRANCH,
    },
  }, token);
  return reponse.content.sha;
}

export async function televerserImage(chemin, base64, message, token) {
  return gh(`/repos/${OWNER}/${REPO}/contents/${chemin}`, {
    method: "PUT",
    body: { message, content: base64, branch: BRANCH },
  }, token);
}

/* ---------- Enregistrement d'un compte (configuration initiale) ---------- */
export async function enregistrerCompte(identifiant, motDePasse, token) {
  const bloc = await chiffrerTexte(token, motDePasse);
  bloc.id = identifiant;

  let comptes = [bloc];
  let sha = null;
  try {
    const fichier = await gh(
      `/repos/${OWNER}/${REPO}/contents/${FICHIER_ACCES}?ref=${BRANCH}`, {}, token
    );
    const contenu = JSON.parse(decoderBase64(fichier.content));
    comptes = (contenu.comptes || []).filter(
      (c) => String(c.id).toLowerCase() !== identifiant.toLowerCase()
    );
    comptes.push(bloc);
    sha = fichier.sha;
  } catch (err) {
    if (err.status !== 404) throw err;
  }

  const corps = {
    message: `Blog : configuration du compte « ${identifiant} »`,
    content: encoderBase64(JSON.stringify({ comptes }, null, 2)),
    branch: BRANCH,
  };
  if (sha) corps.sha = sha;

  return gh(`/repos/${OWNER}/${REPO}/contents/${FICHIER_ACCES}`, {
    method: "PUT", body: corps,
  }, token);
}
