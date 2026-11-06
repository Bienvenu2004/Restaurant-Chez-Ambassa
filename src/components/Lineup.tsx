import { formatPrice, type MenuPart } from "@/data/menu";

/** La carte imprimée : photo de chaque plat, une seule taille de texte, colonnes fixes, aucun trait. */
export default function Lineup({
  part,
  as: Tag = "h3",
  showTitle = true,
}: {
  part: MenuPart;
  as?: "h2" | "h3";
  showTitle?: boolean;
}) {
  const feature = part.feature ? part.dishes.find((d) => d.name === part.feature) : undefined;
  return (
    <div className="lineup-part" id={showTitle ? part.id : undefined}>
      {showTitle && <Tag className="lineup-title">{part.title}</Tag>}
      {showTitle && part.intro && <p className="lineup-intro">{part.intro}</p>}
      {showTitle && feature?.photo && (
        <figure className="lineup-feature">
          <button
            type="button"
            className="feature-btn"
            data-zoom-src={feature.photo.src}
            data-zoom-alt={feature.name}
            data-zoom-caption={`${feature.name}, ${formatPrice(feature.price)}`}
            aria-label={`Agrandir la photo : ${feature.name}`}
          >
            <img src={feature.photo.src} width={feature.photo.width} height={feature.photo.height} alt={feature.name} loading="lazy" />
          </button>
          <figcaption>{feature.name}, {feature.detail.toLowerCase()}. {formatPrice(feature.price)}</figcaption>
        </figure>
      )}
      <ul>
        {part.dishes.map((d) => (
          <li
            key={d.name}
            className={`lineup-row${d.signature ? " is-signature" : ""}`}
          >
            {d.photo ? (
              <button
                type="button"
                className="thumb"
                data-zoom-src={d.photo.src}
                data-zoom-alt={d.name}
                data-zoom-caption={`${d.name}, ${formatPrice(d.price)}`}
                aria-label={`Agrandir la photo : ${d.name}`}
              >
                <img src={d.photo.src} width={d.photo.width} height={d.photo.height} alt="" loading="lazy" />
              </button>
            ) : (
              <span className="thumb is-empty" aria-hidden="true" />
            )}
            <span className="name">{d.name}</span>
            <span className="detail">{d.detail}</span>
            <span className="origin">{d.origin}</span>
            <span className="price">{formatPrice(d.price)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
