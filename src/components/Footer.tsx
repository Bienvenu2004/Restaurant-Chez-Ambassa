import Link from "next/link";
import { hours, restaurant, formatServices } from "@/data/restaurant";

/** Footer « mast » : les liens et l'adresse, puis le nom en grand. */
export default function Footer() {
  const { address } = restaurant;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <address className="footer-block">
            <span className="footer-label">Adresse</span>
            {address.street}
            <br />
            {address.postcode} {address.city}
            <br />
            <a href={`tel:${restaurant.phoneHref}`}>{restaurant.phone}</a>
          </address>
          <div className="footer-block">
            <span className="footer-label">Horaires</span>
            <ul>
              {hours.map((h) => (
                <li key={h.day}>
                  {h.label} : {formatServices(h.services).toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
          <nav className="footer-block" aria-label="Pied de page">
            <span className="footer-label">Le restaurant</span>
            <ul>
              <li><Link href="/carte">La carte</Link></li>
              <li><Link href="/#maison">La maison</Link></li>
              <li><Link href="/#reserver">Réserver une table</Link></li>
              <li><a href={`mailto:${restaurant.email}`}>{restaurant.email}</a></li>
              <li><a href={restaurant.instagram} rel="noopener">Instagram</a></li>
              <li><a href={restaurant.facebook} rel="noopener">Facebook</a></li>
            </ul>
          </nav>
        </div>
        <p className="footer-mast" aria-hidden="true">Chez Ambassa</p>
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} Chez Ambassa, restaurant africain contemporain, Paris</span>
          <span>Prix nets, service compris</span>
        </div>
      </div>
    </footer>
  );
}
