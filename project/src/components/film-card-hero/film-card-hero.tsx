import { memo } from 'react';
import { Film } from '../../types/types';
import FilmCardBackground from '../film-card-background/film-card-background';
import FilmCardButtons from '../film-card-buttons/film-card-buttons';
import Logo from '../logo/logo';
import PageHeader from '../page-header/page-header';
import PageTitle from '../page-title/page-title';
import UserBlock from '../user-block/user-block';

type FilmCardHeroProps = {
  film: Film,
}

function FilmCardHero({film}: FilmCardHeroProps): JSX.Element {
  return (
    <div className="film-card__hero">
      <FilmCardBackground src={film.backgroundImage} alt={film.name} />
      <PageTitle hidden>WTW</PageTitle>
      <PageHeader className="film-card__head">
        <Logo />
        <UserBlock />
      </PageHeader>
      <div className="film-card__wrap">
        <div className="film-card__desc">
          <h2 className="film-card__title" data-testid="film-card-title">{film.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre" data-testid="film-card-genre">{film.genre}</span>
            <span className="film-card__year" data-testid="film-card-year">{film.released}</span>
          </p>
          <FilmCardButtons filmId={film.id} isFilmFavorite={film.isFavorite} withAddReview />
        </div>
      </div>
    </div>
  );
}

export default memo(FilmCardHero);
