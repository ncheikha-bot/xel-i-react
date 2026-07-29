/* ============ EMPLOI DU TEMPS : créneaux des cours et des programmes ============ */

import { EMPLOI_DU_TEMPS, WHATSAPP_MERMOZ } from "../lib/contenu.js";
import { formatDate } from "../lib/blog.js";

export default function EmploiDuTemps() {
  return (
    <section className="section emploi" id="emploi-du-temps">
      <div className="container">
        <p className="section__label reveal">Emploi du temps</p>
        <h2 className="section__title reveal" style={{ "--d": ".08s" }}>
          Les créneaux, <span className="script accent">toujours à jour</span>
        </h2>
        <p className="section__intro reveal" style={{ "--d": ".14s" }}>
          Les horaires des cours d'art à l'année et des programmes ART'thlète, préparés à
          l'avance pour que les familles puissent s'organiser.
        </p>

        <div className="emploi__grid">
          {EMPLOI_DU_TEMPS.formules.map((f, i) => (
            <article className="emploi__carte reveal" style={{ "--d": i * 0.1 + "s" }} key={f.titre}>
              <header className="emploi__carte-head">
                <h3>{f.titre}</h3>
                <p className="emploi__lieu">
                  <span aria-hidden="true">📍</span> {f.lieu}
                </p>
              </header>

              <table className="emploi__table">
                <caption className="sr-only">Créneaux de « {f.titre} »</caption>
                <thead>
                  <tr>
                    <th scope="col">Jour</th>
                    <th scope="col">Horaire</th>
                    <th scope="col">Public</th>
                  </tr>
                </thead>
                <tbody>
                  {f.creneaux.map((c) => (
                    <tr key={f.titre + c.jour + c.horaire + c.public}>
                      <td>{c.jour}</td>
                      <td className="emploi__horaire">{c.horaire}</td>
                      <td>{c.public}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          ))}
        </div>

        <p className="emploi__note reveal">
          <span aria-hidden="true">🗓️</span>
          <span>
            Mis à jour le {formatDate(EMPLOI_DU_TEMPS.miseAJour)}. Un créneau ne convient pas
            ou vous cherchez un horaire particulier&nbsp;?{" "}
            <a href={WHATSAPP_MERMOZ} target="_blank" rel="noopener">Écrivez-nous sur WhatsApp</a> —
            l'équipe répond à toute heure.
          </span>
        </p>
      </div>
    </section>
  );
}
