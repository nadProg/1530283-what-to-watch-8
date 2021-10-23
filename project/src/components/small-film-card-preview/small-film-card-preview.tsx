type SmallFilmCardPreviewProps = {
  src: string,
  alt: string,
}

function SmallFilmCardPreview({src, alt = ''}: SmallFilmCardPreviewProps): JSX.Element {
  return (
    <div className="small-film-card__image">
      <img src={src} alt={alt} width="280" height="175" />
    </div>
  );
}

export default SmallFilmCardPreview;
