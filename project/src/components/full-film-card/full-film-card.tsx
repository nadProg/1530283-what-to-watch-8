import { useLocation, Redirect } from 'react-router-dom';
import type { CommentGet, Film } from '../../types/types';
import { NavigationItem } from '../../const';
import FilmCardBackground from '../ui/film-card-background/film-card-background';
import FilmCardPoster from '../ui/film-card-poster/film-card-poster';
import Logo from '../ui/logo/logo';
import UserBlock from '../user-block/user-block';
import FilmCardButtons from '../film-card-buttons/film-card-buttons';
import FilmNavigation from './film-navigation';
import FilmOverview from './film-overview';
import FilmDetails from './film-details';
import FilmReviews from './film-reviews';

type FullFilmCardProps = {
  film: Film,
  comments: CommentGet[];
}

function FullFilmCard({film, comments}: FullFilmCardProps): JSX.Element {
  const location = useLocation();

  const currentNavigationItem = location.hash.slice(1);
  const isNavigationCorrect = Object.values(NavigationItem)
    .some((navigationItem) => navigationItem === currentNavigationItem);

  if (!isNavigationCorrect) {
    return <Redirect to={`${location.pathname}#${NavigationItem.Overview}`} />;
  }

  return (
    <section className="film-card film-card--full" style={{backgroundColor: film.backgroundColor}}>
      <div className="film-card__hero">
        <FilmCardBackground src={film.backgroundImage} alt={film.name} />

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__desc">
            <h2 className="film-card__title">{film.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.released}</span>
            </p>

            <FilmCardButtons filmId={film.id} isFilmFavorite={film.isFavorite} withAddReview />
          </div>
        </div>
      </div>

      <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
          <FilmCardPoster src={film.posterImage} alt={`${film.name} poster`} big />

          <div className="film-card__desc">
            <FilmNavigation />
            {
              {
                details: <FilmDetails film={film} />,
                overview: <FilmOverview film={film} />,
                reviews: <FilmReviews comments={comments} />,
              }[location.hash.slice(1)]
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default FullFilmCard;
