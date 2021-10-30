import { useLocation, Redirect } from 'react-router-dom';
import type { CommentGet, Film, ValuesOf } from '../../types/types';
import { FilmCardTab } from '../../constants';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import FilmCardTabs from '../film-card-tabs/film-card-tabs';
import FilmCardOverview from '../film-card-overfiew/film-card-overview';
import FilmCardDetails from '../film-card-details/film-card-details';
import FilmCardReviews from '../film-card-reviews/film-card-reviews';
import FilmCardHero from '../film-card-hero/film-card-hero';

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
      <FilmCardHero film={film} />

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
