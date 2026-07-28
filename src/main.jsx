/* ==========================================================================
   XEL I — Point d'entrée de l'application React
   ========================================================================== */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./styles/style.css";
import "./styles/admin.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* basename : le site peut être servi depuis un sous-dossier (GitHub Pages) */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
