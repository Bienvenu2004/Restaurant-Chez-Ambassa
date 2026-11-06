import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import BgCanvas from "@/components/BgCanvas";
import WordReveal from "@/components/WordReveal";
import SiteNav from "@/components/SiteNav";
import { restaurant } from "@/data/restaurant";

// DESIGN.md : Inter pour les titres et le texte, JetBrains Mono pour les étiquettes.
const display = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const body = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://chezambassa.fr"),
  title: { default: "Chez Ambassa, restaurant africain contemporain à Paris", template: "%s, Chez Ambassa" },
  description:
    "Ndolé, poulet braisé, poisson braisé, yassa, mafé : les cuisines d'Afrique centrale et de l'Ouest, servies avec l'exigence de la table française. Réservation en ligne.",
  openGraph: {
    title: "Chez Ambassa, restaurant africain contemporain",
    description: "Les recettes de nos familles, de Douala à Dakar, servies comme dans une grande maison parisienne.",
    images: ["/images/carte/salle.webp"],
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#f5efe6" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.name,
  servesCuisine: ["Africaine", "Camerounaise", "Ouest-africaine"],
  priceRange: "€€€",
  telephone: restaurant.phone,
  email: restaurant.email,
  image: "https://chezambassa.fr/images/carte/salle.webp",
  acceptsReservations: true,
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.address.street,
    postalCode: restaurant.address.postcode,
    addressLocality: restaurant.address.city,
    addressCountry: "FR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <BgCanvas />
        <SiteNav />
        {children}
        <Footer />
        <Lightbox />
        <WordReveal />
      </body>
    </html>
  );
}
