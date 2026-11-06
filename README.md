# Restaurant Chez Ambassa

Site du restaurant **Chez Ambassa**, cuisine africaine contemporaine à Paris : les cuisines d'Afrique centrale et de l'Ouest servies avec les standards de la table française.

Next.js 15 (App Router, TypeScript), exporté en site statique.

## Lancer le site

```bash
npm install
npm run dev -- -p 3005   # http://localhost:3005
```

## Compiler pour la mise en ligne

```bash
npm run build            # produit le dossier out/, à déposer chez n'importe quel hébergeur
```

## Où modifier quoi

- `src/data/restaurant.ts` : adresse, téléphone, email, réseaux sociaux, horaires, identifiant Formspree du formulaire de réservation
- `src/data/menu.ts` : la carte (plats, descriptions, origines, prix, photos)
- `src/app/tokens.css` : couleurs, polices, arrondis et espacements du design
- `public/images/` : les photos du site
