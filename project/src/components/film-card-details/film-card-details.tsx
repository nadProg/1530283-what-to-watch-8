import { Fragment } from 'react';
import type { Film } from '../../types/types';
import { formatRuntime } from '../../utils/date';

type FilmDetailsProps = {
  film: Film,
}

function FilmCardDetails({film}: FilmDetailsProps): JSX.Element {
  const formattedActors = film.actors.map((actor, index, array) => {
    const key = `${actor}-${index}`;
    const isNotLast = index < array.length - 1;
    return (
      <Fragment key={key}>
        {actor}{isNotLast && <br/>}
      </Fragment>
    );
  });

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value" data-testid="film-card-director">{film.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {formattedActors}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value" data-testid="film-card-run-time">{formatRuntime(film.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value" data-testid="film-card-genre">{film.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value" data-testid="film-card-year">{film.released}</span>
        </p>
      </div>
    </div>
  );
}

export default FilmCardDetails;
