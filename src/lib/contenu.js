/* ==========================================================================
   XEL I — Données de contenu partagées
   Source : document « Xel-i × Cheikh Ndaw Apps » (infos à jour de l'école).
   Centralisées ici pour être modifiables sans toucher aux composants.
   ========================================================================== */

/* ---------- Contacts ---------- */
export const CONTACTS = {
  mermoz: {
    nom: "Xel-i Olympic Club",
    lieu: "Mermoz, Dakar",
    tel: "78 716 46 46",
    telInternational: "+221787164646",
  },
  ngor: {
    nom: "Xel-i Île de Ngor",
    lieu: "Île de Ngor, Dakar",
    tel: "78 878 71 71",
    telInternational: "+221788787171",
  },
  email: "xeliecoldart@gmail.com",
  instagram: "ecolexeli",
};

/** Lien WhatsApp avec message pré-rempli */
export function whatsapp(numero = CONTACTS.mermoz.telInternational, message = "Bonjour Xel i !") {
  return `https://wa.me/${numero.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MERMOZ = whatsapp();
export const WHATSAPP_NGOR = whatsapp(
  CONTACTS.ngor.telInternational,
  "Bonjour Xel i ! Je souhaite des informations sur Xel-i Île de Ngor."
);

/* ---------- Les 7 disciplines ---------- */
export const DISCIPLINES = [
  "Peinture", "Théâtre", "Calligraphie", "Dessin",
  "Activité manuelle", "Modelage", "Perlage",
];

/* ---------- Les 3 programmes ---------- */
export const PROGRAMMES = [
  {
    cle: "annee",
    titre: "Cours d'Art à l'année",
    icone: "🎨",
    resume: "Le parcours régulier, toute l'année, dans les 7 disciplines.",
    detail: "Tout le matériel est fourni. Chaque fin d'année, une exposition montre l'évolution de chaque artiste.",
    lieu: "Olympic Club (Mermoz)",
  },
  {
    cle: "camp",
    titre: "Camp ART'thlète",
    icone: "🏝️",
    resume: "Pendant les vacances : un condensé d'art, de sport et d'activités sociales.",
    detail: "Accueil de 8h à 19h sur l'île de Ngor — art, sport, siestes, jeux et arbre à palabres.",
    lieu: "Île de Ngor",
  },
  {
    cle: "tennis",
    titre: "Programme ART'thlète Tennis",
    icone: "🎾",
    resume: "L'art et le tennis dans un même parcours structurant.",
    detail: "Le sport n'est jamais une récréation chez Xel-i : c'est un outil de développement personnel, cognitif et social, au même titre que l'art.",
    lieu: "Olympic Club (Mermoz)",
  },
];

/* ---------- Nouveautés de l'île de Ngor ---------- */
export const NGOR = [
  { icone: "🍲", titre: "Atelier cuisine", texte: "Une cuisinière qualifiée et des repas frais tous les jours : déjeuner, dessert et goûter." },
  { icone: "🌊", titre: "Aqua gym & bateau", texte: "Aqua gym dans la mer et balades en bateau autour de l'île." },
  { icone: "🏠", titre: "Une maison à deux étages", texte: "L'atelier créatif s'installe dans une maison de deux étages, avec une vue à couper le souffle." },
  { icone: "🎖️", titre: "Partenariat avec les militaires", texte: "Avec les militaires basés à Ngor : ateliers discipline, observation et respect de la différence." },
  { icone: "🌳", titre: "Arbre à palabres", texte: "Accueil de 8h à 19h : art, sport, activités sociales et cognitives, siestes, jeux et arbre à palabres." },
];

/* ---------- Écoles partenaires ---------- */
export const ECOLES = [
  { nom: "École franco-sénégalaise", projet: "Réalisation d'une mosaïque" },
  { nom: "École nationale de Haram (Fouta)", projet: "Fresque de 2,6 m × 3 m avec les enfants" },
  { nom: "École Malaika", projet: "Cours de théâtre pendant un an" },
];

/* ---------- Offres de lancement ---------- */
export const OFFRES = [
  {
    badge: "-15 %",
    titre: "sur ART'thlète Île de Ngor",
    texte: "Jusqu'au 10 août, avec un tarif dégressif pour les familles.",
  },
  {
    badge: "1 jour offert",
    titre: "à Xel-i Ngor",
    texte: "Tout enfant inscrit à Xel-i Mermoz reçoit une journée offerte à Ngor dans son forfait semaine.",
  },
];

/* ---------- Emploi du temps ----------
   Mettre à jour ces créneaux au fil des saisons — ils s'affichent
   directement dans la section « Emploi du temps » du site.            */
export const EMPLOI_DU_TEMPS = {
  miseAJour: "2026-07-29",
  formules: [
    {
      titre: "Cours d'Art à l'année",
      lieu: "Olympic Club — Mermoz",
      creneaux: [
        { jour: "Mercredi", horaire: "10h00 – 12h00", public: "3 à 6 ans" },
        { jour: "Mercredi", horaire: "15h00 – 17h00", public: "7 à 12 ans" },
        { jour: "Samedi", horaire: "10h00 – 12h00", public: "3 à 6 ans" },
        { jour: "Samedi", horaire: "15h00 – 17h00", public: "7 à 17 ans" },
        { jour: "Samedi", horaire: "17h30 – 19h30", public: "Adultes" },
      ],
    },
    {
      titre: "Camp ART'thlète — vacances",
      lieu: "Île de Ngor",
      creneaux: [
        { jour: "Du lundi au vendredi", horaire: "8h00 – 19h00", public: "6 à 18 ans" },
      ],
    },
    {
      titre: "Programme ART'thlète Tennis",
      lieu: "Olympic Club — Mermoz",
      creneaux: [
        { jour: "Mercredi", horaire: "9h00 – 12h00", public: "6 à 12 ans" },
        { jour: "Samedi", horaire: "9h00 – 12h00", public: "6 à 12 ans" },
      ],
    },
  ],
};
