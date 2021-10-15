type FilmCardBackgroundProps = {
  src: string,
  alt: string,
  small?: boolean,
  big?: boolean
}

const BASE_CLASSNAME = 'film-card__poster';

function FilmCardBackground({src, alt, small, big}: FilmCardBackgroundProps): JSX.Element {
  let sizedClassName = '';

  if (small) {
    sizedClassName = `${BASE_CLASSNAME}--small`;
  }

  if (big) {
    sizedClassName = `${BASE_CLASSNAME}--big`;
  }

  const fullClassName = `${BASE_CLASSNAME} ${sizedClassName}`;

  return (
    <div className={fullClassName}>
      <img src={src} alt={alt} width="218" height="327" />
    </div>
  );
}

export default FilmCardBackground;
