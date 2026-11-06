"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * DESIGN.md, « Motion » : les grands titres apparaissent mot à mot au scroll
 * (montée de 115 %, 0,9 s, power3.out, 0,045 s entre les mots).
 * Le texte reste visible sans JavaScript : l'état caché n'existe que sous html.js (globals.css).
 */
export default function WordReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const heads = Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2:not(.booking-title)")).filter(
      (h) => !h.dataset.words && Array.from(h.childNodes).every((n) => n.nodeType === Node.TEXT_NODE),
    );

    heads.forEach((h) => {
      const words = (h.textContent ?? "").trim().split(/\s+/);
      h.setAttribute("aria-label", words.join(" "));
      h.textContent = "";
      words.forEach((word, i) => {
        const outer = document.createElement("span");
        outer.className = "w";
        outer.setAttribute("aria-hidden", "true");
        const inner = document.createElement("span");
        inner.textContent = word;
        inner.style.setProperty("--wi", String(i));
        outer.appendChild(inner);
        h.appendChild(outer);
        if (i < words.length - 1) h.appendChild(document.createTextNode(" "));
      });
      h.dataset.words = "true";
    });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-words]:not(.is-in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
