import { Link } from 'react-router-dom';
import type { FilmCardProps } from '../../types/types';

function SmallFilmCard({film}: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={film.posterImage} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${film.id}`} className="small-film-card__link" href="film-page.html">{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
