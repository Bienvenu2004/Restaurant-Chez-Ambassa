import { hours, type Service } from "@/data/restaurant";

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const fmt = (t: string) => t.replace(":00", " h").replace(":", " h ");

/** Heure et jour actuels à Paris, quel que soit le fuseau du visiteur. */
export function parisNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export const servicesFor = (day: number): Service[] => hours.find((h) => h.day === day)?.services ?? [];

export type Status = { open: boolean; title: string; detail: string };

export function openStatus(date = new Date()): Status {
  const { day, minutes } = parisNow(date);
  const today = servicesFor(day);
  const current = today.find((s) => minutes >= toMin(s.open) && minutes < toMin(s.close));
  if (current) return { open: true, title: "Ouvert maintenant", detail: `service jusqu'à ${fmt(current.close)}` };

  const later = today.find((s) => minutes < toMin(s.open));
  if (later) return { open: false, title: "Fermé pour le moment", detail: `réouverture aujourd'hui à ${fmt(later.open)}` };

  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const s = servicesFor(d)[0];
    if (s) {
      const label = i === 1 ? "demain" : hours.find((h) => h.day === d)!.label.toLowerCase();
      return { open: false, title: "Fermé pour le moment", detail: `réouverture ${label} à ${fmt(s.open)}` };
    }
  }
  return { open: false, title: "Fermé", detail: "" };
}

/** Créneaux de réservation (toutes les 15 min, jusqu'à 45 min avant la fermeture). */
export function slotsFor(day: number) {
  return servicesFor(day).flatMap((s) => {
    const out: string[] = [];
    for (let m = toMin(s.open); m <= toMin(s.close) - 45; m += 15) {
      out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
    }
    return out;
  });
}
