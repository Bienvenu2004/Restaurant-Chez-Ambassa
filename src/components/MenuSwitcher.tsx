"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Lineup from "@/components/Lineup";
import type { MenuPart } from "@/data/menu";

/** La carte de l'accueil : entrées, plats, desserts derrière trois onglets. Sans script, les trois parties s'affichent à la suite. */
export default function MenuSwitcher({ parts }: { parts: MenuPart[] }) {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => setReady(true), []);

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (active + (e.key === "ArrowRight" ? 1 : parts.length - 1)) % parts.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="switch">
      {ready && (
        <div className="tabs" role="tablist" aria-label="Parties de la carte" onKeyDown={onKey}>
          {parts.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`tab-${p.id}`}
              aria-controls={`panel-${p.id}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              className="tab"
              onClick={() => setActive(i)}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}
      {parts.map((p, i) => (
        <section
          key={p.id}
          id={`panel-${p.id}`}
          role={ready ? "tabpanel" : undefined}
          aria-labelledby={ready ? `tab-${p.id}` : undefined}
          hidden={ready && active !== i}
        >
          {!ready && <h3 className="part-title">{p.title}</h3>}
          <Lineup part={{ ...p, dishes: p.dishes.filter((d) => d.photo).slice(0, 6) }} showTitle={false} />
        </section>
      ))}
    </div>
  );
}
