import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Configuration Vite — Xel i
 *
 * `base` doit correspondre au chemin où le site est servi :
 *  - GitHub Pages sur un sous-dossier : "/xel-i-site/"
 *  - domaine propre (xel-i.sn, Netlify, Vercel…) : "/"
 * Réglable sans toucher au code via la variable d'environnement VITE_BASE.
 */
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || "/xel-i-site/",
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    open: false,
  },
});
