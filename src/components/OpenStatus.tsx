"use client";

import { useEffect, useState } from "react";
import { openStatus, type Status } from "@/lib/hours";

/** « Ouvert maintenant · service jusqu'à 23 h », calculé à l'heure de Paris et mis à jour chaque minute. */
export default function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const tick = () => setStatus(openStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    return (
      <p className={`status ${className}`}>
        <span>Midi et soir, du mardi au dimanche</span>
      </p>
    );
  }

  return (
    <p className={`status ${className}`} data-open={status.open} aria-live="polite">
      <span>
        <strong>{status.title}</strong>
        {status.detail && `, ${status.detail}`}
      </span>
    </p>
  );
}
