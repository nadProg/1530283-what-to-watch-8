import { Link } from 'react-router-dom';
import type { FilmCardProps, Film } from '../../types/types';

type SmallFilmCardProps = FilmCardProps & {
  setActiveFilm: (film: Film | null) => void,
}

function SmallFilmCard({film, setActiveFilm}: SmallFilmCardProps): JSX.Element {
  const handleMouseEnter = () => {
    setActiveFilm(film);
  };

  const handleMouseLeave = () => {
    setActiveFilm(null);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
