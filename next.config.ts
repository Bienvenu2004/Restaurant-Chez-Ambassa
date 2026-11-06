import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100 % statique : `npm run build` produit le dossier out/, à déposer chez n'importe quel hébergeur.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
