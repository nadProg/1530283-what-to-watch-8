import classNames from 'classnames';

type FilmCardBackgroundProps = {
  src: string,
  alt: string,
  small?: boolean,
  big?: boolean
}

const BASE_CLASSNAME = 'film-card__poster';

function FilmCardPoster({src, alt, small, big}: FilmCardBackgroundProps): JSX.Element {
  const fullClassName = classNames(
    BASE_CLASSNAME,
    { [`${BASE_CLASSNAME}--small`]: small },
    { [`${BASE_CLASSNAME}--big`]: big },
  );

  return (
    <div className={fullClassName} data-testid="film-card-poster-container">
      <img src={src} alt={alt} width="218" height="327" data-testid="film-card-poster" />
    </div>
  );
}

export default FilmCardPoster;
