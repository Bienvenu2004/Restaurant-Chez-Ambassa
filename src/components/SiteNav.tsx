"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/carte", label: "La carte" },
  { href: "/#maison", label: "La maison" },
  { href: "/#brigade", label: "La brigade" },
];

/** Masthead : liens à gauche, le nom au centre, la réservation à droite, une règle épaisse dessous. */
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="masthead">
      <div className="container masthead-row">
        <nav className="masthead-links" aria-label="Navigation principale">
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Fermer" : "Menu"}
          </button>
          <ul id="nav-links" data-open={open}>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="navlink"
                  aria-current={pathname === l.href || pathname === `${l.href}/` ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/" className="wordmark">Chez Ambassa</Link>
        <Link href="/#reserver" className="btn btn--primary masthead-action">Réserver</Link>
      </div>
    </header>
  );
}
