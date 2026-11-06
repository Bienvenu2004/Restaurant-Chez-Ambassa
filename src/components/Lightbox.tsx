"use client";

import { useEffect, useRef, useState } from "react";

/** Agrandit la photo d'un plat : tout bouton [data-zoom-src] ouvre cette fenêtre. */
export default function Lightbox() {
  const ref = useRef<HTMLDialogElement>(null);
  const [photo, setPhoto] = useState<{ src: string; alt: string; caption: string } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-zoom-src]");
      if (!btn) return;
      setPhoto({
        src: btn.dataset.zoomSrc!,
        alt: btn.dataset.zoomAlt ?? "",
        caption: btn.dataset.zoomCaption ?? "",
      });
      ref.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={photo?.caption ?? "Photo du plat"}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      {photo && (
        <figure>
          <img src={photo.src} alt={photo.alt} />
          <figcaption>
            <span>{photo.caption}</span>
            <button type="button" className="btn" onClick={() => ref.current?.close()}>Fermer</button>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}
