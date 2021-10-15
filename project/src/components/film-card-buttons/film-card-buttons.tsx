import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../constants';

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

  const handleFavoriteButtonClick = () => {
    // Обработка добавления в избранное
  };

  const handleAddReviewButtonClick = () => {
    history.push(AppRoute.AddReview(filmId));
  };

  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button" onClick={handlePlayButtonClick}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button" onClick={handleFavoriteButtonClick}>
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref={isFilmFavorite ? '#in-list' : '#add'}></use>
        </svg>
        <span>My list</span>
      </button>
      {
        withAddReview &&
        <button className="btn film-card__button" type="button" onClick={handleAddReviewButtonClick}>
          <span>Add review</span>
        </button>
      }
    </div>
  );
}

export default FilmCardButtons;
