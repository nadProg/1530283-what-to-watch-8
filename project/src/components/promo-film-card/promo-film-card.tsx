import type { Film } from '../../types/types';
import FilmCardBackground from '../ui/film-card-background/film-card-background';
import Logo from '../ui/logo/logo';
import UserBlock from '../user-block/user-block';
import FilmCardPoster from '../ui/film-card-poster/film-card-poster';
import FilmCardButtons from '../film-card-buttons/film-card-buttons';

type PromoFilmCardProps = {
  film: Film,
}

function PromoFilmCard({film}: PromoFilmCardProps): JSX.Element {
  return (
    <section className="film-card">
      <FilmCardBackground src={film.backgroundImage} alt={film.name} />

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo />
        <UserBlock />
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <FilmCardPoster src={film.posterImage} alt={`${film.name} poster`} />

          <div className="film-card__desc">
            <h2 className="film-card__title">{film.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.released}</span>
            </p>

            <FilmCardButtons filmId={film.id} isFilmFavorite={film.isFavorite} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoFilmCard;
