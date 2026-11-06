// La carte. Intitulés, descriptions et prix d'exemple, à remplacer par la vraie carte.
// Chaque photo du dossier du restaurant est rattachée à un plat (public/images/carte/).

export type Photo = { src: string; width: number; height: number };
export type Dish = {
  name: string;
  detail: string;
  origin: string;
  price: number | string;
  signature?: boolean;
  photo?: Photo;
};
export type MenuPart = { id: string; title: string; intro?: string; feature?: string; dishes: Dish[] };

const p = (name: string, width: number, height: number): Photo => ({ src: `/images/carte/${name}.webp`, width, height });

export const menu: MenuPart[] = [
  {
    id: "entrees",
    feature: "Samoussas au bœuf",
    title: "Entrées",
    dishes: [
      { name: "Samoussas au bœuf", detail: "Chutney de coriandre, piment doux", origin: "Afrique de l'Ouest", price: 12, signature: true, photo: p("samoussas", 1254, 1254) },
      { name: "Nems croustillants", detail: "Bœuf, vermicelles, légumes croquants", origin: "Cameroun", price: 10, photo: p("nems", 736, 920) },
      { name: "Brochettes gésiers-plantain", detail: "Marinade soya, poivron, oignon rouge", origin: "Cameroun", price: 13, photo: p("brochettes-gesiers", 735, 936) },
      { name: "Scotch eggs", detail: "Œuf enrobé de viande épicée, panure dorée", origin: "Nigeria", price: 9, photo: p("scotch-eggs", 736, 981) },
      { name: "Fish roll", detail: "Feuilleté au poisson pimenté", origin: "Ghana", price: 8, photo: p("fish-roll", 736, 552) },
      { name: "Bouillon de légumes au bœuf", detail: "Légumes du marché, herbes fraîches", origin: "Cameroun", price: 12, photo: p("bouillon-legumes", 1600, 1068) },
      { name: "Soupe pimentée", detail: "Viande tendre, épices, tomate, citron", origin: "Nigeria", price: 13, photo: p("soupe-pimentee", 1600, 1067) },
      { name: "Soupe de bœuf aux herbes", detail: "Pommes de terre, persil, aneth", origin: "Cameroun", price: 12, photo: p("soupe-boeuf-herbes", 1600, 1067) },
      { name: "Akara", detail: "Beignets de niébé, sauce pili-pili", origin: "Nigeria", price: 10 },
      { name: "Kelewele", detail: "Plantain épicé au gingembre", origin: "Ghana", price: 9 },
    ],
  },
  {
    id: "plats",
    feature: "Planche de grillades",
    title: "Plats",
    dishes: [
      { name: "Ndolé aux crevettes", detail: "Feuilles amères, arachide, miondo", origin: "Cameroun", price: 26, signature: true, photo: p("ndole-crevettes", 1536, 1024) },
      { name: "Ndolé et manioc", detail: "Ndolé à la viande, bâtons de manioc", origin: "Cameroun", price: 24, photo: p("ndole-manioc", 1600, 900) },
      { name: "Poulet braisé", detail: "Riz épicé, plantains mûrs, poivrons", origin: "Cameroun", price: 24, signature: true, photo: p("poulet-braise", 1600, 900) },
      { name: "Poisson braisé", detail: "Bar entier, attiéké, sauce tomate pimentée", origin: "Côte d'Ivoire", price: 28, signature: true, photo: p("poisson-braise", 1600, 900) },
      { name: "Bar braisé, riz aux herbes", detail: "Plantain frit, achards de légumes", origin: "Côte d'Ivoire", price: 29, photo: p("bar-braise-riz-herbes", 1600, 2181) },
      { name: "Planche de grillades", detail: "Poulet, crevettes, saucisse, manioc et plantains frits. Pour deux", origin: "Cameroun", price: 48, photo: p("planche-grillades", 1600, 1188) },
      { name: "Soya", detail: "Grillades mixtes, oignons, herbes, légumes grillés", origin: "Cameroun", price: 24, photo: p("soya-grillades", 1600, 1178) },
      { name: "Poulet rôti aux oignons", detail: "Pommes de terre fondantes", origin: "Cameroun", price: 22, photo: p("poulet-roti-oignons", 1600, 1067) },
      { name: "Poulet et légumes grillés", detail: "Pommes de terre, aubergine, tomate, poivron", origin: "Cameroun", price: 22, photo: p("poulet-legumes-grilles", 1600, 2000) },
      { name: "Riz sauté poulet-bœuf", detail: "Légumes croquants, épices douces", origin: "Nigeria", price: 19, photo: p("riz-saute", 675, 1200) },
      { name: "Riz de fête aux fruits secs", detail: "Grenade, raisins, amandes grillées", origin: "Maison", price: 21, photo: p("riz-fete-fruits-secs", 1600, 1076) },
      { name: "Riz au bœuf mijoté", detail: "Bœuf fondant, sauce aux épices", origin: "Mali", price: 22, photo: p("riz-boeuf-mijote", 1600, 1067) },
      { name: "Boulettes de bœuf", detail: "Sauce tomate, légumes mijotés", origin: "Sénégal", price: 21, photo: p("boulettes-boeuf", 1600, 1067) },
      { name: "Ragoût de bœuf", detail: "Pommes de terre, herbes fraîches", origin: "Cameroun", price: 22, photo: p("ragout-boeuf", 1600, 2400) },
      { name: "Poulet yassa", detail: "Oignons confits, citron, riz parfumé", origin: "Sénégal", price: 23 },
      { name: "Thiéboudienne", detail: "Daurade, riz rouge, légumes du marché", origin: "Sénégal", price: 29 },
      { name: "Mafé d'agneau", detail: "Sauce arachide grillée, riz blanc", origin: "Mali", price: 25 },
      { name: "Saka-saka", detail: "Feuilles de manioc, poisson fumé, chikwangue", origin: "Congo", price: 22 },
    ],
  },
  {
    id: "desserts",
    feature: "Assiette de mignardises",
    title: "Desserts et douceurs",
    dishes: [
      { name: "Beignets soufflés", detail: "Sucre vanillé, sauce chocolat", origin: "Cameroun", price: 9, photo: p("beignets", 675, 1200) },
      { name: "Caramel d'arachides", detail: "Arachides grillées, caramel blond", origin: "Cameroun", price: 6, photo: p("caramel-arachides", 720, 1280) },
      { name: "Coco caramélisé", detail: "Copeaux de coco, sucre roux", origin: "Cameroun", price: 6, photo: p("coco-caramelise", 680, 1017) },
      { name: "Bonbons au lait", detail: "Lait concentré, vanille", origin: "Cameroun", price: 6, photo: p("bonbons-lait", 736, 736) },
      { name: "Sand cake", detail: "Gâteau sablé au beurre", origin: "Ghana", price: 8, photo: p("sand-cake", 600, 780) },
      { name: "Tarte à l'orange", detail: "Pâte sablée, oranges fraîches", origin: "Maison", price: 10, photo: p("tarte-orange", 1600, 1068) },
      { name: "Gâteau aux fraises", detail: "Génoise, crème légère, fraises", origin: "Maison", price: 10, photo: p("gateau-fraises", 1600, 1067) },
      { name: "Gâteau fruits et chocolat", detail: "Fruits confits, ganache", origin: "Maison", price: 10, photo: p("gateau-fruits-chocolat", 1600, 1067) },
      { name: "Roulés aux pruneaux", detail: "Pâte fine, fruits secs", origin: "Maison", price: 8, photo: p("roules-pruneaux", 1600, 1067) },
      { name: "Assiette de mignardises", detail: "Sélection de douceurs maison", origin: "Maison", price: 12, photo: p("mignardises", 1600, 1067) },
      { name: "Petits fours sucrés", detail: "Biscuits et sucres colorés", origin: "Maison", price: 9, photo: p("petits-fours", 1600, 1068) },
      { name: "Cupcakes", detail: "Glaçage vanille", origin: "Maison", price: 5, photo: p("cupcakes", 600, 630) },
      { name: "Biscuits maison", detail: "Beurre, vanille", origin: "Maison", price: 5, photo: p("biscuits", 720, 720) },
      { name: "Bonbons oursons", detail: "Gélifiés aux fruits", origin: "Maison", price: 4, photo: p("bonbons-oursons", 736, 981) },
      { name: "Ananas rôti", detail: "Poivre de Penja, sorbet citron vert", origin: "Cameroun", price: 11 },
    ],
  },
  {
    id: "traiteur",
    feature: "Table à partager",
    title: "Traiteur et buffets",
    intro: "Pour vos fêtes, mariages et réunions : à emporter ou servi sur place. Commande 72 h à l'avance.",
    dishes: [
      { name: "Buffet traiteur", detail: "Entrées, plats et douceurs, dès 20 personnes", origin: "Maison", price: "Sur devis", photo: p("buffet", 736, 868) },
      { name: "Plateau small chops", detail: "Samoussas, nems, beignets, poulet épicé. 50 pièces", origin: "Nigeria", price: 65, photo: p("small-chops", 736, 920) },
      { name: "Table à partager", detail: "Assortiment de plats pour 6 à 8 personnes", origin: "Maison", price: 180, photo: p("table-a-partager", 1600, 1066) },
      { name: "Coffret gâteaux", detail: "Gâteaux, biscuits et fruits frais", origin: "Maison", price: 35, photo: p("coffret-gateaux", 1600, 1067) },
      { name: "Coffret biscuits et fruits", detail: "Biscuits maison, fruits de saison", origin: "Maison", price: 30, photo: p("coffret-biscuits", 1600, 1066) },
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

export const formatPrice = (price: number | string) => (typeof price === "number" ? `${price} €` : price);
