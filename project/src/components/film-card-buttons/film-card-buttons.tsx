import { Link, useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';

type FilmCardButtonsProps = {
  filmId: number,
  isFilmFavorite: boolean,
  withAddReview?: boolean
}

function FilmCardButtons({filmId, isFilmFavorite, withAddReview}: FilmCardButtonsProps): JSX.Element {
  const history = useHistory();

  const handlePlayButtonClick = () => {
    history.push(AppRoute.Player(filmId));
  };

  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button" onClick={handlePlayButtonClick}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button">
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref={isFilmFavorite ? '#in-list' : '#add'}></use>
        </svg>
        <span>My list</span>
      </button>
      {withAddReview && <Link to={AppRoute.Review(filmId)} className="btn film-card__button">Add review</Link>}
    </div>
  );
}

export default FilmCardButtons;
