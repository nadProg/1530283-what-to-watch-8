import type { Film } from '../../types/types';
import { getRatingDescription, formatRating, formatOverviewActors } from '../../utils/films';

type FilmOverviewProps = {
  film: Film,
}

function FilmCardOverview({film}: FilmOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score" data-testid="film-overview-rating">{formatRating(film.rating)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingDescription(film.rating)}</span>
          <span className="film-rating__count" data-testid="film-overview-scores-count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p data-testid="film-overview-description">{film.description}</p>
        <p className="film-card__director" data-testid="film-overview-director"><strong>Director: {film.director}</strong></p>
        <p className="film-card__starring" data-testid="film-overview-actors"><strong>Starring: {formatOverviewActors(film.actors)}</strong></p>
      </div>
    </>
  );
}

export default FilmCardOverview;
