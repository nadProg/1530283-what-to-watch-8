import { useLocation, Redirect } from 'react-router-dom';
import type { CommentGet, Film, ValuesOf } from '../../types/types';
import { FilmCardTab } from '../../constants';
import FilmCardBackground from '../film-card-background/film-card-background';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import FilmCardButtons from '../film-card-buttons/film-card-buttons';
import FilmCardTabs from '../film-card-tabs/film-card-tabs';
import FilmCardOverview from '../film-card-overfiew/film-card-overview';
import FilmCardDetails from '../film-card-details/film-card-details';
import FilmCardReviews from '../film-card-reviews/film-card-reviews';
import PageTitle from '../page-title/page-title';
import PageHeader from '../page-header/page-header';

type FullFilmCardProps = {
  film: Film,
  comments: CommentGet[];
}

function FullFilmCard({film, comments}: FullFilmCardProps): JSX.Element {
  const location = useLocation();

  const parsedTab = location.hash.slice(1);
  const isTabCorrect = Object.values(FilmCardTab)
    .some((tab) => tab === parsedTab);

  if (!isTabCorrect) {
    return <Redirect to={`${location.pathname}#${FilmCardTab.Overview}`} />;
  }

  const currentTab = parsedTab as ValuesOf<typeof FilmCardTab>;

  const filmCardTabToContent: {
    [key in ValuesOf<typeof FilmCardTab>]: JSX.Element
  } = {
    [FilmCardTab.Details]: <FilmCardDetails film={film} />,
    [FilmCardTab.Overview]: <FilmCardOverview film={film} />,
    [FilmCardTab.Reviews]: <FilmCardReviews comments={comments} />,
  };

  return (
    <section className="film-card film-card--full" style={{backgroundColor: film.backgroundColor}}>
      <div className="film-card__hero">
        <FilmCardBackground src={film.backgroundImage} alt={film.name} />
        <PageTitle hidden>WTW</PageTitle>
        <PageHeader className="film-card__head">
          <Logo />
          <UserBlock />
        </PageHeader>
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
            <FilmCardTabs className="film-card__nav" />
            { filmCardTabToContent[currentTab] }
          </div>
        </div>
      </div>
    </section>
  );
}

export default FullFilmCard;
