function ImageCard({ image, selectedLanguage }) {
  const { imageUrl, title, titles, description } = image;
  const displayTitle = titles?.[selectedLanguage] || title;
  const droplets = [
    { id: 1, left: "8%", delay: "0s", duration: "2.1s" },
    { id: 2, left: "26%", delay: "0.6s", duration: "2.6s" },
    { id: 3, left: "48%", delay: "1.1s", duration: "2.3s" },
    { id: 4, left: "67%", delay: "0.3s", duration: "2.8s" },
    { id: 5, left: "86%", delay: "0.9s", duration: "2.2s" },
  ];

  return (
    <div className="image-card-shell">
      <div className="image-droplets" aria-hidden="true">
        {droplets.map((drop) => (
          <span
            key={drop.id}
            className="image-droplet"
            style={{
              left: drop.left,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
            }}
          />
        ))}
      </div>
      <article className="image-card">
        <div className="image-frame">
          <img src={imageUrl} alt={displayTitle} className="gallery-image" />
        </div>
        <div className="card-content">
          <h2>{displayTitle}</h2>
          <p>{description}</p>
        </div>
      </article>
    </div>
  );
}

export default ImageCard;
