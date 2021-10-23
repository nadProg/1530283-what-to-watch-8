import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { State } from '../../types/types';

const mapStateToProps = ({authorization}: State) => ({
  authorization,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


type FilmCardButtonsProps = PropsFromRedux & {
  filmId: number,
  isFilmFavorite: boolean,
  withAddReview?: boolean
}

function FilmCardButtons({filmId, isFilmFavorite, withAddReview, authorization}: FilmCardButtonsProps): JSX.Element {
  const handleFavoriteButtonClick = () => {
    // Обработка добавления в избранное
  };

  return (
    <div className="film-card__buttons">
      <Link to={AppRoute.Player(filmId)} className="btn btn--play film-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </Link>
      {
        authorization.status === AuthorizationStatus.Auth && (
          <button className="btn btn--list film-card__button" type="button" onClick={handleFavoriteButtonClick}>
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref={isFilmFavorite ? '#in-list' : '#add'}></use>
            </svg>
            <span>My list</span>
          </button>
        )
      }
      {
        withAddReview && authorization.status === AuthorizationStatus.Auth &&
        <Link to={AppRoute.AddReview(filmId)} className="btn film-card__button" type="button">
          <span>Add review</span>
        </Link>
      }
    </div>
  );
}

export {FilmCardButtons};
export default connector(FilmCardButtons);
