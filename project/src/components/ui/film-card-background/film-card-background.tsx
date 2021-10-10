type FilmCardBackgroundProps = {
  src: string,
  alt: string,
}

function FilmCardBackground({src, alt}: FilmCardBackgroundProps): JSX.Element {
  return (
    <div className="film-card__bg">
      <img src={src} alt={alt} />
    </div>
  );
}

export default FilmCardBackground;
