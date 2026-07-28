/* ==========================================================================
   XEL I — Routage de l'application
   ========================================================================== */

import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer, { WhatsappFab } from "./components/Footer.jsx";
import Accueil from "./pages/Accueil.jsx";
import Blog from "./pages/Blog.jsx";
import Article from "./pages/Article.jsx";
import Admin from "./pages/Admin.jsx";
import NonTrouvee from "./pages/NonTrouvee.jsx";

export default function App() {
  const { pathname } = useLocation();
  /* L'espace de gestion a sa propre mise en page (pas d'en-tête public) */
  const estAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!estAdmin && <Header />}

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Article />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NonTrouvee />} />
      </Routes>

      {!estAdmin && (
        <>
          <Footer />
          <WhatsappFab />
        </>
      )}
    </>
  );
}
