// Informations pratiques. Les valeurs marquées « À CONFIRMER » sont des exemples à remplacer avant la mise en ligne.

export const restaurant = {
  name: "Chez Ambassa",
  tagline: "Cuisine d'Afrique centrale et de l'Ouest, servie à la française.",
  // À CONFIRMER
  address: { street: "18 rue de la Folie-Méricourt", postcode: "75011", city: "Paris" },
  phone: "01 43 00 00 00", // À CONFIRMER
  phoneHref: "+33143000000", // À CONFIRMER
  email: "reservation@chezambassa.fr", // À CONFIRMER
  instagram: "https://www.instagram.com/", // À CONFIRMER
  facebook: "https://www.facebook.com/", // À CONFIRMER
  // Créer un formulaire gratuit sur formspree.io et coller son identifiant ici (ex. "xyzabcd").
  // Tant qu'il est vide, le formulaire ouvre un email pré-rempli.
  formspreeId: "",
};

// Horaires (heure de Paris). jour : 0 = dimanche … 6 = samedi. À CONFIRMER
export type Service = { open: string; close: string };
export const hours: { day: number; label: string; services: Service[] }[] = [
  { day: 1, label: "Lundi", services: [] },
  { day: 2, label: "Mardi", services: [{ open: "12:00", close: "14:30" }, { open: "19:00", close: "23:00" }] },
  { day: 3, label: "Mercredi", services: [{ open: "12:00", close: "14:30" }, { open: "19:00", close: "23:00" }] },
  { day: 4, label: "Jeudi", services: [{ open: "12:00", close: "14:30" }, { open: "19:00", close: "23:00" }] },
  { day: 5, label: "Vendredi", services: [{ open: "12:00", close: "14:30" }, { open: "19:00", close: "23:30" }] },
  { day: 6, label: "Samedi", services: [{ open: "12:00", close: "15:00" }, { open: "19:00", close: "23:30" }] },
  { day: 0, label: "Dimanche", services: [{ open: "12:00", close: "16:00" }] },
];

export function formatServices(services: Service[]) {
  if (services.length === 0) return "Fermé";
  return services.map((s) => `${s.open.replace(":", " h ")} à ${s.close.replace(":", " h ")}`.replace(/ h 00/g, " h")).join(" et ");
}
