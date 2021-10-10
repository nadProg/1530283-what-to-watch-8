import type { Film } from '../../types/types';
import { getRatingDescription, formatRating, formatOverviewActors } from '../../utils/films';

type FilmOverviewProps = {
  film: Film,
}

function FilmOverview({film}: FilmOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{formatRating(film.rating)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingDescription(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {formatOverviewActors(film.actors)}</strong></p>
      </div>
    </>
  );
}

export default FilmOverview;
