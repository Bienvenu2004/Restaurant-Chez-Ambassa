// La carte. Intitulés et prix d'exemple, à remplacer par la vraie carte.

export type Dish = { name: string; detail: string; origin: string; price: number; signature?: boolean };
export type MenuPart = { id: string; title: string; dishes: Dish[] };

export const menu: MenuPart[] = [
  {
    id: "entrees",
    title: "Entrées",
    dishes: [
      { name: "Samoussas au bœuf", detail: "Chutney de coriandre, piment doux", origin: "Afrique de l'Ouest", price: 12, signature: true },
      { name: "Brochettes gésiers-plantain", detail: "Marinade soya, oignon rouge", origin: "Cameroun", price: 13 },
      { name: "Akara", detail: "Beignets de niébé, sauce pili-pili", origin: "Nigeria", price: 10 },
      { name: "Avocat et crevettes", detail: "Mangue verte, citron vert", origin: "Cameroun", price: 14 },
      { name: "Kelewele", detail: "Plantain épicé au gingembre", origin: "Ghana", price: 9 },
    ],
  },
  {
    id: "plats",
    title: "Plats",
    dishes: [
      { name: "Ndolé aux crevettes", detail: "Feuilles amères, arachide, miondo", origin: "Cameroun", price: 26, signature: true },
      { name: "Poulet braisé", detail: "Riz épicé, plantains mûrs, poivrons", origin: "Cameroun", price: 24, signature: true },
      { name: "Poisson braisé", detail: "Bar entier, attiéké, sauce tomate pimentée", origin: "Côte d'Ivoire", price: 28, signature: true },
      { name: "Poulet yassa", detail: "Oignons confits, citron, riz parfumé", origin: "Sénégal", price: 23 },
      { name: "Thiéboudienne", detail: "Daurade, riz rouge, légumes du marché", origin: "Sénégal", price: 29 },
      { name: "Mafé d'agneau", detail: "Sauce arachide grillée, riz blanc", origin: "Mali", price: 25 },
      { name: "Saka-saka", detail: "Feuilles de manioc, poisson fumé, chikwangue", origin: "Congo", price: 22 },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    dishes: [
      { name: "Beignets soufflés", detail: "Sucre vanillé, sauce chocolat", origin: "Cameroun", price: 9 },
      { name: "Caramel d'arachides", detail: "Glace vanille de Madagascar", origin: "Cameroun", price: 10 },
      { name: "Ananas rôti", detail: "Poivre de Penja, sorbet citron vert", origin: "Cameroun", price: 11 },
      { name: "Gâteau coco", detail: "Crème légère au bissap", origin: "Côte d'Ivoire", price: 10 },
    ],
  },
  {
    id: "boissons",
    title: "Boissons",
    dishes: [
      { name: "Foléré", detail: "Infusion d'hibiscus, menthe fraîche", origin: "Maison", price: 6 },
      { name: "Gingembre pressé", detail: "Citron vert, ananas", origin: "Maison", price: 6 },
      { name: "Bière blonde", detail: "Brassée au Cameroun, 33 cl", origin: "Cameroun", price: 7 },
      { name: "Verre de vin", detail: "Sélection de la semaine", origin: "France", price: 8 },
    ],
  },
];

export const signatures = menu.flatMap((p) => p.dishes).filter((d) => d.signature);
