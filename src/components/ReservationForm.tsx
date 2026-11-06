"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { hours, restaurant } from "@/data/restaurant";
import { slotsFor } from "@/lib/hours";

type State = "idle" | "sending" | "done" | "error";

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const dayOf = (iso: string) => new Date(`${iso}T12:00:00`).getDay();

const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

export default function ReservationForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [couverts, setCouverts] = useState("2");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  // Un créneau choisi dans le premier écran (HeroBooking) pré-remplit le formulaire.
  useEffect(() => {
    const onPick = (e: Event) => {
      const d = (e as CustomEvent<{ date: string; time: string; couverts: string }>).detail;
      setDate(d.date);
      setTime(d.time);
      setCouverts(d.couverts);
      setTimeout(() => document.getElementById("r-nom")?.focus({ preventScroll: true }), 0);
    };
    window.addEventListener("ambassa:pick", onPick);
    return () => window.removeEventListener("ambassa:pick", onPick);
  }, []);

  const slots = useMemo(() => (date ? slotsFor(dayOf(date)) : []), [date]);
  const closedDay = date !== "" && slots.length === 0;
  const lunch = slots.filter((s) => s < "17:00");
  const dinner = slots.filter((s) => s >= "17:00");
  const closedLabels = hours.filter((h) => h.services.length === 0).map((h) => h.label.toLowerCase());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    if (closedDay) return;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (!restaurant.formspreeId) {
      const body = [
        `Nom : ${data.nom}`,
        `Téléphone : ${data.telephone}`,
        `Email : ${data.email}`,
        `Date : ${longDate(data.date)} à ${data.heure.replace(":", " h ")}`,
        `Couverts : ${data.couverts}`,
        data.message ? `Message : ${data.message}` : "",
      ].filter(Boolean).join("\n");
      const subject = `Réservation : ${data.couverts} couverts, ${longDate(data.date)}`;
      window.location.href = `mailto:${restaurant.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setState("sending");
    setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${restaurant.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _subject: `Réservation : ${data.couverts} couverts, ${longDate(data.date)}` }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
      setError(`L'envoi n'a pas abouti. Réessayez, ou appelez-nous au ${restaurant.phone}.`);
    }
  }

  if (state === "done") {
    return (
      <div className="form-done" role="status">
        <p className="done-title">Merci, c’est noté</p>
        <p className="lead">
          Votre demande pour le {longDate(date)} à {time.replace(":", " h ")} est bien partie. Nous vous confirmons la table par email ou par téléphone dans la journée.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false} aria-label="Demande de réservation">
      <div className="field half">
        <label htmlFor="r-date">Date</label>
        <input
          id="r-date" name="date" type="date" required min={todayISO()} value={date}
          onChange={(e) => { setDate(e.target.value); setTime(""); }}
          aria-describedby="r-date-hint"
        />
        <span id="r-date-hint" className="hint" data-warn={closedDay}>
          {closedDay
            ? `Nous sommes fermés ce jour-là (${closedLabels.join(", ")}). Choisissez une autre date.`
            : date
              ? `${longDate(date)} : ${slots.length} créneaux disponibles`
              : "Midi et soir, du mardi au dimanche"}
        </span>
      </div>

      <div className="field half">
        <label htmlFor="r-heure">Heure</label>
        <select
          id="r-heure" name="heure" required value={time} disabled={!date || closedDay}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">{date ? "Choisir un créneau" : "Choisissez d'abord la date"}</option>
          {lunch.length > 0 && (
            <optgroup label="Déjeuner">
              {lunch.map((s) => <option key={s} value={s}>{s.replace(":", " h ")}</option>)}
            </optgroup>
          )}
          {dinner.length > 0 && (
            <optgroup label="Dîner">
              {dinner.map((s) => <option key={s} value={s}>{s.replace(":", " h ")}</option>)}
            </optgroup>
          )}
        </select>
      </div>

      <div className="field third">
        <label htmlFor="r-couverts">Couverts</label>
        <select id="r-couverts" name="couverts" required value={couverts} onChange={(e) => setCouverts(e.target.value)} aria-describedby="r-couverts-hint">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "personne" : "personnes"}</option>
          ))}
        </select>
        <span id="r-couverts-hint" className="hint">Au-delà de 10, appelez-nous.</span>
      </div>

      <div className="field third">
        <label htmlFor="r-nom">Nom</label>
        <input id="r-nom" name="nom" type="text" required autoComplete="name" />
      </div>

      <div className="field third">
        <label htmlFor="r-tel">Téléphone</label>
        <input id="r-tel" name="telephone" type="tel" required autoComplete="tel" inputMode="tel" />
      </div>

      <div className="field">
        <label htmlFor="r-email">Email</label>
        <input id="r-email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="r-message">Une occasion, une allergie, une préférence de table ?</label>
        <textarea id="r-message" name="message" rows={3} />
      </div>

      <div className="form-foot">
        <button className="btn btn--primary" type="submit" disabled={state === "sending" || closedDay} aria-busy={state === "sending"}>
          {state === "sending" ? "Envoi en cours…" : "Demander la table"}
        </button>
        {error && <p className="form-msg" data-kind="error" role="alert">{error}</p>}
      </div>
    </form>
  );
}
