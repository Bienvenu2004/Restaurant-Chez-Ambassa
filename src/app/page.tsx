import Link from "next/link";
import OpenStatus from "@/components/OpenStatus";
import HeroBooking from "@/components/HeroBooking";
import MenuSwitcher from "@/components/MenuSwitcher";
import ReservationForm from "@/components/ReservationForm";
import { menu } from "@/data/menu";
import { hours, restaurant, formatServices } from "@/data/restaurant";

const homeParts = menu.filter((p) => ["entrees", "plats", "desserts"].includes(p.id));

export default function Home() {
  const { address } = restaurant;

  return (
    <main>
      {/* ————— Premier écran : bande pleine largeur, texte à gauche, image qui déborde à droite ————— */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-text">
          <p className="label hero-label">Restaurant africain contemporain, Paris 11e</p>
          <h1 id="hero-title" className="hero-title">Douala, Dakar, Paris</h1>
          <p className="lead hero-lead">La cuisine de nos familles, servie avec l&apos;exigence de la table française.</p>
          <div className="hero-actions">
            <a href="#reserver" className="btn btn--primary">Réserver une table</a>
            <Link href="/carte" className="btn btn--outline">Voir la carte</Link>
          </div>
        </div>
        <figure className="hero-visual">
          {/* Image fournie par le client, servie telle quelle (sans recompression ni filtre). */}
          <img
            src="/images/hero-chez-ambassa.webp"
            width={1586}
            height={992}
            alt="Logo Chez Ambassa sur une ardoise, entouré de tomates, basilic, ail, poivre et d’une fourchette ancienne"
            fetchPriority="high"
            decoding="async"
          />
        </figure>
        <ul className="hero-social" aria-label="Nous suivre et nous contacter">
          <li>
            <a href={restaurant.instagram} rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" className="fill" /></svg>
            </a>
          </li>
          <li>
            <a href={restaurant.facebook} rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4.5h-3a4 4 0 0 0-4 4V11H7.5v3.5H10V20h3.5v-5.5h3l.5-3.5h-3.5V8.8c0-.5.3-.8.5-.8Z" className="fill" /></svg>
            </a>
          </li>
          <li>
            <a href={`tel:${restaurant.phoneHref}`} aria-label={`Appeler le ${restaurant.phone}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5h2.6l1.4 4.2-2 1.3a11 11 0 0 0 6.4 6.4l1.3-2 4.2 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" /></svg>
            </a>
          </li>
          <li>
            <a href={`mailto:${restaurant.email}`} aria-label={`Écrire à ${restaurant.email}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="m4.5 7.5 7.5 5.5 7.5-5.5" /></svg>
            </a>
          </li>
        </ul>
      </section>

      {/* ————— Les prochaines tables libres ————— */}
      <section className="next-tables" aria-label="Prochaines tables libres">
        <div className="container hero-booking">
          <HeroBooking />
          <OpenStatus className="hero-status" />
        </div>
      </section>

      {/* ————— Grande photo, sans titre (fichier salle.webp, remplacé par le client) ————— */}
      <figure className="room">
        <img
          src="/images/carte/salle.webp"
          width={1672}
          height={941}
          alt="Poisson braisé entier sur assiette blanche, riz, plantains mûrs, sauce tomate pimentée et cuillère en bois"
          loading="lazy"
        />
        <figcaption className="container">Poisson braisé, plantains mûrs et sauce tomate pimentée.</figcaption>
      </figure>

      {/* ————— La maison ————— */}
      <section id="maison" className="section maison" aria-labelledby="maison-title">
        <div className="container">
          <div className="opens">
            <h2 id="maison-title">La maison</h2>
            <p className="standfirst">
              Nous cuisinons les recettes de nos familles, de Douala à Dakar, avec la rigueur d&apos;une brigade parisienne. Rien n&apos;est simplifié, tout est dressé.
            </p>
          </div>
          <dl className="values">
            <div className="value">
              <dt>L&apos;héritage</dt>
              <dd>Les recettes de nos familles : ndolé du Littoral, yassa de Casamance, mafé de Bamako, poisson braisé d&apos;Abidjan.</dd>
            </div>
            <div className="value">
              <dt>L&apos;hospitalité</dt>
              <dd>On vous reçoit comme à une table de fête, et chaque plat se raconte.</dd>
            </div>
            <div className="value">
              <dt>L&apos;exigence</dt>
              <dd>Produits frais chaque matin, cuissons à la minute, assiettes dressées une à une.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ————— Le ndolé ————— */}
      <section className="section ndole" aria-labelledby="ndole-title">
        <div className="container">
          <div className="head-split">
            <h2 id="ndole-title">Le ndolé de nos mères</h2>
            <p className="lead">Feuilles amères lavées trois fois, pâte d’arachide fraîche, crevettes saisies au dernier moment.</p>
          </div>
          <figure className="showcase">
            <img src="/images/carte/ndole-crevettes.webp" width={1536} height={1024} alt="Ndolé aux crevettes dans un plat en terre cuite, posé sur un set tressé" loading="lazy" />
            <figcaption>Servi avec miondo, manioc ou plantain mûr.</figcaption>
          </figure>
        </div>
      </section>

      {/* ————— La carte ————— */}
      <section id="carte" className="section carte-home" aria-labelledby="carte-title">
        <div className="container">
          <div className="opens head-split">
            <h2 id="carte-title">La carte</h2>
            <p className="lead">
              Chaque plat en photo ; en brun acajou, les signatures de la maison. <Link href="/carte" className="link">Voir toute la carte</Link>
            </p>
          </div>
          <MenuSwitcher parts={homeParts} />
        </div>
      </section>

      {/* ————— La brigade ————— */}
      <section id="brigade" className="band-ink brigade" aria-labelledby="brigade-title">
        <div className="container brigade-grid">
          <figure className="brigade-photo">
            <img src="/images/carte/chef-tomates.webp" width={1600} height={1139} alt="Un cuisinier en veste noire tient des tomates fraîches dans ses mains" loading="lazy" />
          </figure>
          <div>
            <h2 id="brigade-title">La brigade</h2>
            <dl className="brigade-rows">
              <div>
                <dt>En cuisine</dt>
                <dd>Une brigade formée aux maisons parisiennes, qui cuisine les plats de son enfance. Le pili-pili est pilé chaque matin.</dd>
              </div>
              <div>
                <dt>En salle</dt>
                <dd>Service à l&apos;assiette, accords de vins et de jus maison. Pour les tablées de fête, un menu à partager.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ————— Réserver ————— */}
      <section id="reserver" className="section reserve" aria-labelledby="reserver-title">
        <div className="container">
          <div className="well reserve-grid">
            <div className="reserve-facts">
              <h2 id="reserver-title">Réserver une table</h2>
              <p className="lead">Choisissez votre soir, nous vous confirmons la table dans la journée.</p>
              <OpenStatus />
              <table className="hours">
                <caption className="visually-hidden">Horaires d&apos;ouverture</caption>
                <tbody>
                  {hours.map((h) => (
                    <tr key={h.day}>
                      <th scope="row">{h.label}</th>
                      <td className="num">{formatServices(h.services)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <address>
                {address.street}, {address.postcode} {address.city}
                <br />
                <a className="link" href={`tel:${restaurant.phoneHref}`}>{restaurant.phone}</a>
              </address>
              <p className="reserve-groups">
                Groupes, privatisation et traiteur : <a className="link" href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
              </p>
            </div>
            <ReservationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
