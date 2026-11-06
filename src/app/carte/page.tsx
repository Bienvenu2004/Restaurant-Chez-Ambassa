import type { Metadata } from "next";
import Link from "next/link";
import Lineup from "@/components/Lineup";
import OpenStatus from "@/components/OpenStatus";
import { menu } from "@/data/menu";

export const metadata: Metadata = {
  title: "La carte",
  description: "Entrées, plats, desserts et boissons de Chez Ambassa : ndolé, poulet braisé, poisson braisé, yassa, mafé, saka-saka.",
};

export default function Carte() {
  return (
    <main>
      {/* ————— Banner : le titre, les parties, la réservation ————— */}
      <section className="carte-hero" aria-labelledby="carte-h1">
        <div className="container carte-hero-grid">
          <div>
            <h1 id="carte-h1">La carte</h1>
            <p className="lead">Cameroun, Sénégal, Côte d&apos;Ivoire, Mali, Congo, Ghana, Nigeria : cuisiné chaque jour, à table ou en traiteur.</p>
            <OpenStatus className="hero-status" />
          </div>
          <div className="carte-side">
            <nav className="carte-jump" aria-label="Parties de la carte">
              <ul>
                {menu.map((p) => (
                  <li key={p.id}><a href={`#${p.id}`} className="link">{p.title}</a></li>
                ))}
              </ul>
            </nav>
            <Link href="/#reserver" className="btn btn--primary">Réserver une table</Link>
          </div>
        </div>
      </section>

      {/* ————— La brigade, deux photos ————— */}
      <section className="carte-chefs" aria-label="En cuisine">
        <div className="container carte-chefs-grid">
          <figure>
            <img src="/images/carte/chef-tomates.webp" width={1600} height={1139} alt="Un cuisinier en veste noire tient des tomates fraîches" loading="lazy" />
            <figcaption>Tomates, piments, feuilles : tout arrive frais chaque matin.</figcaption>
          </figure>
          <figure>
            <img src="/images/carte/chef-salade.webp" width={1600} height={1139} alt="Un cuisinier souriant présente une salade de poivrons" loading="lazy" />
            <figcaption>Touchez une photo pour voir le plat en grand.</figcaption>
          </figure>
        </div>
      </section>

      {/* ————— Les parties de la carte ————— */}
      <div className="carte-body">
        <div className="container">
          {menu.map((m) => (
            <Lineup key={m.id} part={m} as="h2" />
          ))}

          <p className="carte-note">
            Prix nets, service compris. Certains plats contiennent de l&apos;arachide, des crustacés ou du poisson : signalez-nous toute allergie à la réservation, la cuisine adapte volontiers.
          </p>
        </div>
      </div>

      {/* ————— Une table ce soir ————— */}
      <section className="band-ink carte-cta" aria-labelledby="carte-cta-title">
        <div className="container carte-cta-grid">
          <div>
            <h2 id="carte-cta-title">Une table ce soir ?</h2>
            <p className="lead">Réservez en ligne en une minute, nous confirmons dans la journée.</p>
            <Link href="/#reserver" className="btn btn--light">Réserver une table</Link>
          </div>
          <figure>
            <img src="/images/carte/salle.webp" width={1672} height={941} alt="Poisson braisé, plantains mûrs et sauce tomate pimentée" loading="lazy" />
          </figure>
        </div>
      </section>
    </main>
  );
}
