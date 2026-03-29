import { Fragment } from "react";
import ImageCard from "./ImageCard";

function ImageGallery({ images, selectedLanguage }) {
  return (
    <Fragment>
      <section className="gallery-grid" aria-label="Image gallery">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            selectedLanguage={selectedLanguage}
          />
        ))}
      </section>
    </Fragment>
  );
}

export default ImageGallery;
