import { useHistory, Link, useLocation, Redirect } from 'react-router-dom';
import type { Film } from '../../types/types';
import { NavigationItem } from '../../const';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import FilmNavigation from './film-navigation';
import FilmOverview from './film-overview';
import FilmDetails from './film-details';
import FilmReviews from './film-reviews';

type FullFilmCardProps = {
  film: Film,
}

function FullFilmCard({film}: FullFilmCardProps): JSX.Element {
  const history = useHistory();
  const location = useLocation();

  const currentNavigationItem = location.hash.slice(1);
  const isNavigationCorrect = Object.values(NavigationItem)
    .some((navigationItem) => navigationItem === currentNavigationItem);

  if (!isNavigationCorrect) {
    return <Redirect to={`${location.pathname}#${NavigationItem.Overview}`} />;
  }

  const handlePlayButtonClick = () => {
    history.push(`/player/${film.id}`);
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__hero">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

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

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button" onClick={handlePlayButtonClick}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref={film.isFavorite ? '#in-list' : '#add'}></use>
                </svg>
                <span>My list</span>
              </button>
              <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
          <div className="film-card__poster film-card__poster--big">
            <img src={film.posterImage} alt={film.name} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <FilmNavigation />

            {
              {
                overview: <FilmOverview film={film} />,
                details: <FilmDetails />,
                reviews: <FilmReviews />,
              }[location.hash.slice(1)]
            }

          </div>
        </div>
      </div>
    </section>
  );
}

export default FullFilmCard;
