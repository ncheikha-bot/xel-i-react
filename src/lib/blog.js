/* ==========================================================================
   XEL I — Utilitaires du blog
   Chargement des articles, rendu markdown sécurisé, dates, slugs.
   ========================================================================== */

/** Préfixe public (dépend de la `base` Vite) : "/xel-i-site/" ou "/" */
export const BASE = import.meta.env.BASE_URL;

/** Chemin d'un fichier du dossier public (images, JSON…) */
export function asset(chemin) {
  if (!chemin) return "";
  // data: URL (aperçu local en mode démo) ou URL absolue → inchangé
  if (/^(data:|https?:\/\/)/i.test(chemin)) return chemin;
  return BASE + String(chemin).replace(/^\/+/, "");
}

/* ---------- Chargement des articles ---------- */
export function fetchArticles() {
  return fetch(asset("blog/articles.json") + "?t=" + Date.now())
    .then((r) => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then((data) => data.articles || []);
}

/* ---------- Dates ---------- */
const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

export function formatDate(iso) {
  const parts = String(iso || "").split("-");
  if (parts.length !== 3) return iso || "";
  const jour = parseInt(parts[2], 10);
  const mois = MOIS[parseInt(parts[1], 10) - 1] || "";
  return (jour === 1 ? "1ᵉʳ" : jour) + " " + mois + " " + parts[0];
}

/* ---------- Échappement HTML ---------- */
export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------- Mini-Markdown (sûr : tout est échappé d'abord) ----------
   Supporté : ## titre · ### sous-titre · - liste · **gras** · *italique*
   · [texte](https://lien) · paragraphes séparés par une ligne vide       */
function inline(s) {
  return s
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, texte, url) => {
      // uniquement http(s), liens internes ou ancres
      if (!/^(https?:\/\/|#|\/|[a-z0-9_.-]+(\/[\w./-]*)?(#[\w-]+)?$)/i.test(url)) return texte;
      const externe = /^https?:\/\//i.test(url);
      return (
        '<a href="' + url + '"' +
        (externe ? ' target="_blank" rel="noopener"' : "") + ">" + texte + "</a>"
      );
    });
}

export function renderMarkdown(src) {
  const lines = escapeHtml(src || "").split(/\r?\n/);
  const html = [];
  let liste = false;
  let paragraphe = [];

  const fermerListe = () => { if (liste) { html.push("</ul>"); liste = false; } };
  const fermerParagraphe = () => {
    if (paragraphe.length) {
      html.push("<p>" + inline(paragraphe.join(" ")) + "</p>");
      paragraphe = [];
    }
  };

  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) { fermerParagraphe(); fermerListe(); return; }

    if (line.startsWith("### ")) {
      fermerParagraphe(); fermerListe();
      html.push("<h3>" + inline(line.slice(4)) + "</h3>");
    } else if (line.startsWith("## ")) {
      fermerParagraphe(); fermerListe();
      html.push("<h2>" + inline(line.slice(3)) + "</h2>");
    } else if (line.startsWith("- ")) {
      fermerParagraphe();
      if (!liste) { html.push("<ul>"); liste = true; }
      html.push("<li>" + inline(line.slice(2)) + "</li>");
    } else {
      fermerListe();
      paragraphe.push(line);
    }
  });
  fermerParagraphe();
  fermerListe();
  return html.join("\n");
}

/* ---------- Slug ---------- */
export function slugify(titre) {
  return (
    String(titre)
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // retire les accents
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "article"
  );
}
