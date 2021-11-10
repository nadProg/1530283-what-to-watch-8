import { memo } from 'react';
import type { Film } from '../../types/types';
import Logo from '../logo/logo';
import FilmCardBackground from '../film-card-background/film-card-background';
import UserBlock from '../user-block/user-block';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import FilmCardButtons from '../film-card-buttons/film-card-buttons';
import PageTitle from '../page-title/page-title';
import PageHeader from '../page-header/page-header';

type PromoFilmCardProps = {
  film: Film,
}

function PromoFilmCard({film}: PromoFilmCardProps): JSX.Element {
  return (
    <section className="film-card">
      <FilmCardBackground src={film.backgroundImage} alt={film.name} />
      <PageTitle hidden>WTW</PageTitle>
      <PageHeader className="film-card__head">
        <Logo />
        <UserBlock />
      </PageHeader>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <FilmCardPoster src={film.posterImage} alt={`${film.name} poster`} />
          <div className="film-card__desc">
            <h2 className="film-card__title" data-testid="film-card-title">{film.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre" data-testid="film-card-genre">{film.genre}</span>
              <span className="film-card__year" data-testid="film-card-year">{film.released}</span>
            </p>
            <FilmCardButtons filmId={film.id} isFilmFavorite={film.isFavorite} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(PromoFilmCard);
