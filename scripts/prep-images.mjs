// Usage (depuis site/) : node scripts/prep-images.mjs
// Options : node scripts/prep-images.mjs <dossierPhotos> <dossierSortie> <dossierSharp>
// Converts every photo of the folder to WebP (max 1600px wide) under a short name; fails on any unmapped file.
import { createRequire } from "node:module";
import path from "node:path";
import fs from "node:fs";

const [src = "..", out = "public/images/carte", sharpDir = "node_modules/sharp"] = process.argv.slice(2);
const sharp = createRequire(path.resolve(sharpDir, "package.json"))("sharp");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const map = [
  ["alfredo-burgos", "planche-grillades"],
  ["assorted-meat-kebab", "soya-grillades"],
  ["bottom-view-meat-soup", "soupe-pimentee"],
  ["Brochettes", "brochettes-gesiers"],
  ["Buffets", "buffet"],
  ["caucasian-shah-plove", "riz-fete-fruits-secs"],
  ["closeup-shot-homemade-rolls", "roules-pruneaux"],
  ["coconut flakes", "coco-caramelise"],
  ["cookies", "biscuits"],
  ["Cup Cakes", "cupcakes"],
  ["Cute Bear Candy", "bonbons-oursons"],
  ["Doughnuts", "beignets"],
  ["Fish roll pie", "fish-roll"],
  ["Fried rice", "riz-saute"],
  ["fried-chicken-with-grilled", "poulet-legumes-grilles"],
  ["front-view-delicious-cake-inside", "gateau-fraises"],
  ["front-view-delicious-cake-slices", "gateau-fruits-chocolat"],
  ["front-view-meat-sauce-soup", "ragout-boeuf"],
  ["front-view-sweet-cookies", "petits-fours"],
  ["front-view-tasty-sweet-pie", "tarte-orange"],
  ["gift-cake-biscuits-brown-plates-fruits-mixed-color-table (1)", "coffret-biscuits"],
  ["gift-cake-biscuits-brown-plates-fruits-mixed-color-table.", "coffret-gateaux"],
  ["Groundnut sweet", "caramel-arachides"],
  ["meatballs", "boulettes-boeuf"],
  ["Milk sweet", "bonbons-lait"],
  ["Ndolé et manioc", "ndole-manioc"],
  ["Ndolé raffiné", "ndole-crevettes"],
  ["nems", "nems"],
  ["Poisson braisé", "poisson-braise"],
  ["Poulet braisé", "poulet-braise"],
  ["Restaurant africain", "salle"],
  ["roasted-chicken", "poulet-roti-oignons"],
  ["samoma", "small-chops"],
  ["Samosas", "samoussas"],
  ["Sand Cakes", "sand-cake"],
  ["Scotch eggs", "scotch-eggs"],
  ["side-view-pilaf", "riz-boeuf-mijote"],
  ["solo-seafood", "bar-braise-riz-herbes"],
  ["sweet-plate", "mignardises"],
  ["top-close-view-meat-soup", "soupe-boeuf-herbes"],
  ["top-view-delicious-food-table", "table-a-partager"],
  ["top-view-vegetable-soup", "bouillon-legumes"],
  ["young-confident", "chef-tomates"],
  ["young-pleased", "chef-salade"],
];

const files = fs.readdirSync(src).filter((f) => /\.(jpe?g|png)$/i.test(f));
const used = new Set();
for (const f of files) {
  const hit = map.find(([k]) => f.startsWith(k));
  if (!hit) throw new Error(`Unmapped file: ${f}`);
  if (used.has(hit[1])) throw new Error(`Duplicate target ${hit[1]} for ${f}`);
  used.add(hit[1]);
  const info = await sharp(path.join(src, f)).rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 78 }).toFile(path.join(out, `${hit[1]}.webp`));
  console.log(`${hit[1]}\t${info.width}\t${info.height}`);
}
console.log(`${used.size} images`);
