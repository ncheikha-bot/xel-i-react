# Xel i — Site & blog (React + Vite)

Version React du site vitrine et du blog de **Xel i**, première école d'art
extrascolaire du Sénégal (Dakar-Mermoz, bientôt Almadies & Ngor).

Stack : **React 18 + Vite 6 + React Router 6**. Aucune dépendance UI :
la feuille de style d'origine est conservée telle quelle.

## Démarrage

```bash
npm install
npm run dev      # développement (http://localhost:5173/xel-i-site/)
npm run build    # build de production → dist/
npm run preview  # prévisualiser le build
```

## Structure

```
index.html                    ← page hôte + script de restauration de route
public/
  assets/logo, assets/photos  ← images du site
  assets/blog/                ← couvertures d'articles téléversées
  blog/articles.json          ← contenu du blog
  404.html                    ← redirection des routes (hébergement statique)
src/
  main.jsx                    ← point d'entrée + BrowserRouter
  App.jsx                     ← routes (/ · /blog · /blog/:slug · /admin)
  components/
    Header.jsx, Footer.jsx    ← en-tête, pied de page, bouton WhatsApp
    admin/Connexion.jsx       ← identifiant + mot de passe, démo, configuration
    admin/Editeur.jsx         ← éditeur d'article avec aperçu en direct
  sections/                   ← les 13 sections de la page d'accueil
  pages/                      ← Accueil, Blog, Article, Admin, NonTrouvee
  lib/
    blog.js                   ← articles, markdown, dates, slugs, chemins
    github.js                 ← API GitHub + chiffrement des comptes
    hooks.js                  ← reveal au scroll, compteurs, méta, header
  styles/style.css, admin.css ← styles (identiques à la version d'origine)
```

## Déploiement

**Le site en ligne est https://ncheikha-bot.github.io/xel-i-site/** — c'est le lien
partagé au client. Ce dépôt-ci (`xel-i-react`) contient le **code source** ; le
dépôt `xel-i-site` contient le **build servi**.

### Mettre le site à jour

```bash
# 1. Récupérer les articles publiés depuis l'admin (sinon ils seraient écrasés)
curl -s https://ncheikha-bot.github.io/xel-i-site/blog/articles.json \
  -o public/blog/articles.json

# 2. Construire pour le lien client
VITE_BASE=/xel-i-site/ VITE_GH_REPO=xel-i-site npm run build

# 3. Copier dist/ dans le clone du dépôt xel-i-site, puis commit + push
```

⚠️ **L'étape 1 est importante** : les articles publiés via `/admin` sont écrits
directement dans le dépôt `xel-i-site`. Sans cette récupération, un nouveau build
les remplacerait par le contenu local de `public/blog/articles.json`.

### Autres hébergements

Le chemin de base est réglable **sans toucher au code** :

| Hébergement | Commande |
|---|---|
| GitHub Pages (sous-dossier) | `VITE_BASE=/xel-i-site/ npm run build` |
| Domaine propre, Netlify, Vercel | `VITE_BASE=/ npm run build` |

Autres variables (optionnelles, pour pointer un autre dépôt) :
`VITE_GH_OWNER`, `VITE_GH_REPO`, `VITE_GH_BRANCH`, `VITE_REPO_BLOG_DIR`
(chemin du dossier blog *dans le dépôt* — `blog` si le dépôt sert les fichiers
à la racine, `public/blog` pour un dépôt source Vite).

### Netlify / Vercel

Build : `VITE_BASE=/ npm run build` · Dossier publié : `dist`.
Ajouter une règle de réécriture SPA (`/* → /index.html`, code 200) :
- **Netlify** : fichier `public/_redirects` contenant `/*  /index.html  200`
- **Vercel** : `vercel.json` avec `{"rewrites":[{"source":"/(.*)","destination":"/index.html"}]}`

Sur GitHub Pages, `public/404.html` joue déjà ce rôle : aucune configuration
supplémentaire n'est nécessaire.

## Blog & espace de gestion

Le blog fonctionne **sans serveur** (« CMS Git ») : les articles vivent dans
`public/blog/articles.json`, poussé dans le dépôt GitHub ; l'espace `/admin`
écrit directement dans le dépôt via l'API GitHub. Chaque publication déclenche
la reconstruction du site (~1 minute).

**Connexion** : identifiant + mot de passe. La clé GitHub est chiffrée
(AES-GCM 256, clé dérivée par PBKDF2 150 000 itérations) et stockée dans
`blog/acces.json` ; le bon mot de passe la déchiffre localement. Le mot de
passe n'est jamais stocké ni transmis.

**Configuration initiale** (une fois) — dépliant en bas de l'écran de connexion :
1. github.com → *Settings → Developer settings → Personal access tokens →
   Fine-grained tokens* → jeton limité au dépôt, permission
   **Contents : Read and write**.
2. Coller ce jeton, choisir identifiant et mot de passe (≥ 8 caractères).

⚠️ `blog/acces.json` est public (chiffré) : choisissez un mot de passe solide.

**Mode démo** : bouton « Découvrir en mode démo », sans identifiants —
toute l'interface fonctionne, mais rien n'est écrit dans le dépôt.

## Contenu

Tout le contenu provient des documents de l'école (« La Vision Xel i »,
« Xel I Théâtre », texte de positionnement) et la palette est celle de la
charte graphique : vert `#3E4E3E` · jaune `#EBBE36` · rose `#DFB0CD` ·
noir `#2B2B2A`.
