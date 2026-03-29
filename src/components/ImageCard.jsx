function ImageCard({ image, selectedLanguage }) {
  const { imageUrl, title, titles, description } = image;
  const displayTitle = titles?.[selectedLanguage] || title;

  return (
    <article className="image-card">
      <div className="image-frame">
        <img src={imageUrl} alt={displayTitle} className="gallery-image" />
      </div>
      <div className="card-content">
        <h2>{displayTitle}</h2>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default ImageCard;
