"use client";

import { useEffect, useMemo, useState } from "react";
import { hours } from "@/data/restaurant";
import { parisNow, slotsFor } from "@/lib/hours";

type Day = { iso: string; day: number; label: string };

const iso = (d: Date) => {
  const c = new Date(d);
  c.setMinutes(c.getMinutes() - c.getTimezoneOffset());
  return c.toISOString().slice(0, 10);
};

/** Les trois prochains jours ouverts, à partir d'aujourd'hui. */
function nextOpenDays(count = 3): Day[] {
  const out: Day[] = [];
  const base = new Date();
  for (let i = 0; out.length < count && i < 14; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const day = d.getDay();
    if (!hours.find((h) => h.day === day)?.services.length) continue;
    const label =
      i === 0 ? "Aujourd’hui" : i === 1 ? "Demain" : d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric" });
    out.push({ iso: iso(d), day, label: label.charAt(0).toUpperCase() + label.slice(1) });
  }
  return out;
}

/** Le premier écran : les prochaines tables libres, en boutons. Un clic pré-remplit le formulaire de réservation. */
export default function HeroBooking() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [active, setActive] = useState(0);
  const [couverts, setCouverts] = useState("2");

  useEffect(() => setDays(nextOpenDays()), []);

  const times = useMemo(() => {
    if (!days) return [];
    const d = days[active];
    const all = slotsFor(d.day).filter((t) => t.endsWith(":00") || t.endsWith(":30"));
    if (active !== 0 || d.label !== "Aujourd’hui") return all;
    const now = parisNow().minutes + 30;
    return all.filter((t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3)) >= now);
  }, [days, active]);

  const pick = (time: string) => {
    if (!days) return;
    window.dispatchEvent(new CustomEvent("ambassa:pick", { detail: { date: days[active].iso, time, couverts } }));
    document.getElementById("reserver")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="booking" aria-labelledby="booking-title">
      <h2 id="booking-title" className="booking-title">Réserver une table</h2>

      {!days ? (
        <p className="booking-fallback">
          <a className="btn btn--primary" href="#reserver">Choisir une heure</a>
        </p>
      ) : (
        <>
          <div className="booking-row">
            <fieldset className="seg">
              <legend className="visually-hidden">Jour</legend>
              {days.map((d, i) => (
                <span key={d.iso}>
                  <input type="radio" name="hero-jour" id={`hj-${i}`} checked={active === i} onChange={() => setActive(i)} />
                  <label htmlFor={`hj-${i}`}>{d.label}</label>
                </span>
              ))}
            </fieldset>
            <label className="booking-party">
              <span className="visually-hidden">Couverts</span>
              <select value={couverts} onChange={(e) => setCouverts(e.target.value)}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "personne" : "personnes"}</option>
                ))}
              </select>
            </label>
          </div>

          {times.length > 0 ? (
            <ul className="times" aria-label={`Heures libres, ${days[active].label.toLowerCase()}`}>
              {times.map((t) => (
                <li key={t}>
                  <button type="button" className="time" onClick={() => pick(t)}>
                    {t.replace(":", " h ").replace(" h 00", " h")}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="booking-empty">Le service de ce jour est terminé. Choisissez un autre jour.</p>
          )}
        </>
      )}
    </div>
  );
}
