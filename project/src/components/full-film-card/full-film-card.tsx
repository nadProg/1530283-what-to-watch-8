import { useLocation, Redirect } from 'react-router-dom';
import type { CommentGet, Film, ValuesOf } from '../../types/types';
import { NavigationItem } from '../../const';
import FilmCardBackground from '../film-card-background/film-card-background';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import FilmCardButtons from '../film-card-buttons/film-card-buttons';
import FilmCardNavigation from '../film-card-navigation/film-card-navigation';
import FilmCardOverview from '../film-card-overfiew/film-card-overview';
import FilmCardDetails from '../film-card-details/film-card-details';
import FilmCardReviews from '../film-card-reviews/film-card-reviews';

type FullFilmCardProps = {
  film: Film,
  comments: CommentGet[];
}

function FullFilmCard({film, comments}: FullFilmCardProps): JSX.Element {
  const location = useLocation();

  const parsedNavigationItem = location.hash.slice(1);
  const isNavigationCorrect = Object.values(NavigationItem)
    .some((navigationItem) => navigationItem === parsedNavigationItem);

  if (!isNavigationCorrect) {
    return <Redirect to={`${location.pathname}#${NavigationItem.Overview}`} />;
  }

  const currentNavigationItem = parsedNavigationItem as ValuesOf<typeof NavigationItem>;

  const navigationItemToContent: {
    [key in ValuesOf<typeof NavigationItem>]: JSX.Element
  } = {
    [NavigationItem.Details]: <FilmCardDetails film={film} />,
    [NavigationItem.Overview]: <FilmCardOverview film={film} />,
    [NavigationItem.Reviews]: <FilmCardReviews comments={comments} />,
  };

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
            <FilmCardNavigation />
            { navigationItemToContent[currentNavigationItem] }
          </div>
        </div>
      </div>
    </section>
  );
}

export default FullFilmCard;
