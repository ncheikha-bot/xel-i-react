/* ==========================================================================
   XEL I — Pied de page + bouton WhatsApp flottant
   ========================================================================== */

import { Link } from "react-router-dom";

export const WHATSAPP = "https://wa.me/221787164646?text=Bonjour%20Xel%20i%20!";

export function WhatsappFab() {
  return (
    <a
      href={WHATSAPP}
      className="whatsapp-fab"
      target="_blank"
      rel="noopener"
      aria-label="Nous écrire sur WhatsApp — l'équipe répond 24h/24"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C9.4 3 4 8.36 4 14.95c0 2.1.56 4.16 1.62 5.97L4 29l8.28-2.16a12.1 12.1 0 0 0 3.76.6c6.63 0 12.03-5.36 12.03-11.95C28.07 8.36 22.67 3 16.04 3Zm0 21.85c-1.2 0-2.38-.2-3.5-.57l-.63-.21-4.16 1.09 1.11-4.03-.27-.42a9.7 9.7 0 0 1-1.53-5.26c0-5.38 4.42-9.77 9.98-9.77 5.55 0 9.97 4.39 9.97 9.77 0 5.39-4.42 9.4-9.97 9.4Zm5.47-7.11c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.07-.8.37-.28.3-1.06 1.03-1.06 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.24 5.17 4.54.72.31 1.29.5 1.73.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
      <span className="whatsapp-fab__label">WhatsApp · 24h/24</span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__logo script">xel-i</p>
          <p className="footer__tagline">
            « Un lieu qui relie. Un lieu qui élève.<br />Un lieu qui construit l'humain. »
          </p>
        </div>

        <nav className="footer__nav" aria-label="Liens rapides">
          <h3>Explorer</h3>
          <ul>
            <li><Link to="/#ecole">L'école</Link></li>
            <li><Link to="/#ateliers">Les cours d'art</Link></li>
            <li><Link to="/#artthlete">Art-Thlète</Link></li>
            <li><Link to="/#theatre">Théâtre à l'école</Link></li>
            <li><Link to="/#equipe">L'équipe</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/#inscription">Inscription</Link></li>
            <li><Link to="/#contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="footer__contact">
          <h3>Nous joindre</h3>
          <ul>
            <li><a href="mailto:xeliecoldart@gmail.com">xeliecoldart@gmail.com</a></li>
            <li><a href="tel:+221787164646">+221 78 716 46 46</a></li>
            <li><a href={WHATSAPP} target="_blank" rel="noopener">WhatsApp — 24h/24</a></li>
            <li><a href="https://instagram.com/ecolexeli" target="_blank" rel="noopener">Instagram — @ecolexeli</a></li>
            <li>Dakar-Mermoz, Sénégal</li>
            <li>Bientôt : Almadies &amp; Ngor</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © 2026 Xel i — École d'art · Dakar. Tous droits réservés. ·{" "}
          <Link to="/admin" className="footer__admin">Gestion</Link>
        </p>
      </div>
    </footer>
  );
}
